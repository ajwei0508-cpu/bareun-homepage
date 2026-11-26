(function (globalScope) {
  'use strict';

  function escHtml(v) {
    return String(v == null ? '' : v)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function compileHomeDevCustom(devCustom, devItemId, collectedCss, collectedJs) {
    if (!devCustom || devCustom.enabled === false) {
      return { beforeHtml: '', afterHtml: '', cssVarsInline: '' };
    }
    const fields = Array.isArray(devCustom.customFields) ? devCustom.customFields : [];
    const fieldMap = {};
    const cssVarParts = [];
    fields.forEach(f => {
      if (!f || !f.id) return;
      fieldMap[f.id] = f.value != null ? f.value : '';
      if (f.slot === 'cssVar' || f.type === 'color') {
        cssVarParts.push(`--dev-${String(f.id).replace(/[^a-zA-Z0-9_-]/g, '')}:${String(f.value || '')}`);
      }
    });

    const interpolate = (tpl, ownVal) => {
      let out = String(tpl || '');
      if (ownVal !== undefined) out = out.replace(/\{\{\s*value\s*\}\}/g, String(ownVal));
      out = out.replace(/\{\{\s*SELF\s*\}\}/g, `[data-dev-item-id="${devItemId}"]`);
      out = out.replace(/\{\{\s*([a-zA-Z0-9_.-]+)\s*\}\}/g, (_, k) => (fieldMap[k] != null ? String(fieldMap[k]) : ''));
      return out;
    };

    const beforeChunks = [];
    const afterChunks = [];
    fields.forEach(f => {
      if (!f || !f.id) return;
      if (f.type === 'toggle' && !f.value && !f.htmlTemplate) return;
      const valStr = f.value != null ? String(f.value) : '';
      if (f.htmlTemplate && f.htmlTemplate.trim()) {
        const rendered = interpolate(f.htmlTemplate, valStr);
        if (f.slot === 'beforeTitle' || f.slot === 'before') beforeChunks.push(rendered);
        else afterChunks.push(rendered);
        return;
      }
      if (!valStr.trim()) return;
      const slot = f.slot || 'afterBody';
      if (slot === 'cta') {
        const href = escHtml(f.href || fieldMap[f.id + '_url'] || '#consult');
        afterChunks.push(`<div style="margin-top:6px;"><a class="skt-card-chip" href="${href}" onclick="event.stopPropagation();">${escHtml(valStr)}</a></div>`);
      } else if (slot === 'callout' || slot === 'afterBody') {
        afterChunks.push(`<div style="margin-top:6px;padding:6px 10px;border-radius:8px;background:rgba(212,175,55,0.14);border-left:2px solid #D4AF37;font-size:11.5px;color:#fff;"><strong>${escHtml(f.label || '')}</strong> ${escHtml(valStr)}</div>`);
      } else if (f.type === 'html' || slot === 'rawHtml') {
        afterChunks.push(interpolate(valStr, valStr));
      }
    });

    if (devCustom.customHtmlBefore && String(devCustom.customHtmlBefore).trim()) {
      beforeChunks.unshift(interpolate(devCustom.customHtmlBefore));
    }
    if (devCustom.customHtmlAfter && String(devCustom.customHtmlAfter).trim()) {
      afterChunks.push(interpolate(devCustom.customHtmlAfter));
    }
    if (devCustom.customCss && String(devCustom.customCss).trim()) {
      collectedCss.push(interpolate(devCustom.customCss));
    }
    if (devCustom.customJs && String(devCustom.customJs).trim()) {
      collectedJs.push(`(function(root, fields){ try { ${devCustom.customJs} } catch(e){ console.warn('HomeDevJS:', e); } })(document.querySelector('[data-dev-item-id="${devItemId}"]'), ${JSON.stringify(fieldMap)});`);
    }

    return {
      beforeHtml: beforeChunks.join('\n'),
      afterHtml: afterChunks.join('\n'),
      cssVarsInline: cssVarParts.join(';')
    };
  }

  const GOOGLE_FONT_MAP = {
    'Noto Serif KR': 'Noto+Serif+KR:wght@400;600;700;900',
    'Gowun Batang': 'Gowun+Batang:wght@400;700',
    'Gowun Dodum': 'Gowun+Dodum',
    'Nanum Myeongjo': 'Nanum+Myeongjo:wght@400;700;800',
    'Noto Sans KR': 'Noto+Sans+KR:wght@300;400;500;700;900',
    'Black Han Sans': 'Black+Han+Sans'
  };

  function hexToRgba(hex, alpha) {
    const clean = String(hex || '').replace('#', '').trim();
    if (!/^[0-9a-fA-F]{6}$/.test(clean)) return hex;
    const r = parseInt(clean.slice(0, 2), 16);
    const g = parseInt(clean.slice(2, 4), 16);
    const b = parseInt(clean.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  function buildVisualOverridesBundle(elementOverrides, pageThemeOverride) {
    const ovMap = (elementOverrides && typeof elementOverrides === 'object') ? elementOverrides : {};
    const pt = (pageThemeOverride && typeof pageThemeOverride === 'object') ? pageThemeOverride : {};
    const cssRules = [];
    const domOps = [];
    const usedFonts = new Set();

    const trackFont = (fam) => {
      if (!fam) return;
      Object.keys(GOOGLE_FONT_MAP).forEach(k => {
        if (String(fam).includes(k)) usedFonts.add(k);
      });
    };

    if (pt.headingFont) {
      trackFont(pt.headingFont);
      cssRules.push(`html:not(#_) body:not(#_) h1, html:not(#_) body:not(#_) h2, html:not(#_) body:not(#_) h3, html:not(#_) body:not(#_) .dialogue-main-quote, html:not(#_) body:not(#_) .dialogue-main-quote *, html:not(#_) body:not(#_) .skt-finale-main-title, html:not(#_) body:not(#_) .editorial-headline, html:not(#_) body:not(#_) #project-details-title, html:not(#_) body:not(#_) .greeting-title { font-family: ${pt.headingFont} !important; }`);
    }
    if (pt.bodyFont) {
      trackFont(pt.bodyFont);
      cssRules.push(`html:not(#_) body:not(#_), html:not(#_) body:not(#_) p, html:not(#_) body:not(#_) button, html:not(#_) body:not(#_) a, html:not(#_) body:not(#_) input, html:not(#_) body:not(#_) .editorial-body-copy, html:not(#_) body:not(#_) .dialogue-sub-whisper { font-family: ${pt.bodyFont} !important; }`);
    }
    if (pt.pageBg) {
      cssRules.push(`html:not(#_), html:not(#_) body:not(#_), html:not(#_) body.theme-hanji:not(#_) { background-color: ${pt.pageBg} !important; }`);
    }
    if (pt.accentColor) {
      cssRules.push(`:root:root { --accent: ${pt.accentColor} !important; --gold: ${pt.accentColor} !important; --green: ${pt.accentColor} !important; --brand-green: ${pt.accentColor} !important; --sa-hl-color: ${pt.accentColor} !important; }`);
    }

    const gradPresets = {
      gold: 'linear-gradient(135deg, #f3d280 0%, #b88428 100%)',
      emerald: 'linear-gradient(135deg, #10b981 0%, #065f46 100%)',
      espresso: 'linear-gradient(135deg, #27211b 0%, #14110e 100%)',
      ivory: 'linear-gradient(135deg, #fdfbf7 0%, #efe6d5 100%)',
      glass: 'rgba(20, 17, 14, 0.42)'
    };
    const shadowPresets = {
      none: 'none',
      soft: '0 4px 14px rgba(0, 0, 0, 0.12)',
      card: '0 14px 34px rgba(0, 0, 0, 0.24)',
      gold: '0 0 0 2px rgba(212, 175, 55, 0.35), 0 10px 28px rgba(181, 137, 58, 0.34)',
      strong: '0 22px 52px rgba(0, 0, 0, 0.42)'
    };
    const textShadowPresets = {
      none: 'none',
      soft: '0 2px 8px rgba(0, 0, 0, 0.38)',
      crisp: '0 2px 14px rgba(0, 0, 0, 0.78)',
      strong: '0 4px 22px rgba(0, 0, 0, 0.95), 0 2px 6px rgba(0, 0, 0, 0.9)'
    };

    const boostSel = (rawSel) => String(rawSel).split(',').map(part => {
      const t = part.trim();
      if (!t) return '';
      return /^(html|body)\b/i.test(t) ? t : `html:not(#_) body:not(#_) ${t}`;
    }).filter(Boolean).join(', ');

    Object.entries(ovMap).forEach(([sel, ov]) => {
      if (!sel || !ov || typeof ov !== 'object') return;
      const bSel = boostSel(sel);
      const decls = [];
      if (ov.hidden === true) decls.push('display: none !important');
      if (ov.fontFamily) {
        trackFont(ov.fontFamily);
        decls.push(`font-family: ${ov.fontFamily} !important`);
        cssRules.push(`${bSel}, ${bSel} * { font-family: ${ov.fontFamily} !important; }`);
      }
      if (ov.fontSize != null && ov.fontSize !== '') {
        decls.push(`font-size: ${Number(ov.fontSize)}px !important`);
        cssRules.push(`${bSel} .dialogue-char, ${bSel} > td, ${bSel} > th { font-size: ${Number(ov.fontSize)}px !important; }`);
      }
      if (ov.fontWeight) {
        decls.push(`font-weight: ${ov.fontWeight} !important`);
        cssRules.push(`${bSel} .dialogue-char, ${bSel} > td, ${bSel} > th { font-weight: ${ov.fontWeight} !important; }`);
      }
      if (ov.lineHeight != null && ov.lineHeight !== '') decls.push(`line-height: ${ov.lineHeight} !important`);
      if (ov.letterSpacing != null && ov.letterSpacing !== '') decls.push(`letter-spacing: ${ov.letterSpacing}em !important`);
      if (ov.textAlign) decls.push(`text-align: ${ov.textAlign} !important`);
      if (ov.textShadow && textShadowPresets[ov.textShadow]) {
        decls.push(`text-shadow: ${textShadowPresets[ov.textShadow]} !important`);
        cssRules.push(`${bSel} .dialogue-char, ${bSel} .dialogue-char.lit { text-shadow: ${textShadowPresets[ov.textShadow]} !important; }`);
      }
      if (ov.color) {
        decls.push(`color: ${ov.color} !important`);
        cssRules.push(`${bSel} .dialogue-char, ${bSel} .dialogue-char.lit, ${bSel} .dialogue-char.gold-accent, ${bSel} > p, ${bSel} > strong, ${bSel} > td, ${bSel} > td strong, ${bSel} > th, ${bSel} .skt-card-title, ${bSel} .skt-card-desc, ${bSel} > span:not(.hl-gold):not(.title-key-em):not(.logo-gem):not(.concept-dot):not(.tap-pill-arrow):not(.brand-logo-mark) { color: ${ov.color} !important; transition: none !important; }`);
      }
      if (ov.bgGradient && gradPresets[ov.bgGradient]) {
        decls.push(`background: ${gradPresets[ov.bgGradient]} !important`);
        if (ov.bgGradient === 'glass') decls.push('backdrop-filter: blur(12px) !important; -webkit-backdrop-filter: blur(12px) !important');
      } else if (ov.bgColor) {
        if (ov.bgColor === 'transparent') {
          decls.push('background: transparent !important; background-image: none !important; background-color: transparent !important');
        } else {
          const alpha = (ov.bgOpacity != null && ov.bgOpacity !== '') ? Math.max(0, Math.min(1, Number(ov.bgOpacity) / 100)) : 1;
          const colStr = alpha < 1 ? hexToRgba(ov.bgColor, alpha.toFixed(2)) : ov.bgColor;
          decls.push(`background-image: none !important; background-color: ${colStr} !important; background: ${colStr} !important`);
        }
      }
      if (ov.borderStyle === 'none') {
        decls.push('border: none !important');
      } else if ((ov.borderWidth != null && ov.borderWidth !== '') || ov.borderColor || ov.borderStyle) {
        const bw = (ov.borderWidth != null && ov.borderWidth !== '' && Number(ov.borderWidth) > 0) ? Number(ov.borderWidth) : 2;
        const bs = ov.borderStyle || 'solid';
        const bc = ov.borderColor || '#D4AF37';
        decls.push(`border: ${bw}px ${bs} ${bc} !important`);
      }
      if (ov.borderRadius != null && ov.borderRadius !== '') decls.push(`border-radius: ${Number(ov.borderRadius)}px !important`);
      if (ov.boxShadow && shadowPresets[ov.boxShadow]) decls.push(`box-shadow: ${shadowPresets[ov.boxShadow]} !important`);
      if ((ov.padY != null && ov.padY !== '') || (ov.padX != null && ov.padX !== '')) {
        const py = (ov.padY != null && ov.padY !== '') ? `${Number(ov.padY)}px` : 'inherit';
        const px = (ov.padX != null && ov.padX !== '') ? `${Number(ov.padX)}px` : 'inherit';
        decls.push(`padding: ${py} ${px} !important`);
      }
      if (ov.opacity != null && ov.opacity !== '' && Number(ov.opacity) < 100) {
        decls.push(`opacity: ${(Math.max(5, Math.min(100, Number(ov.opacity))) / 100).toFixed(2)} !important`);
      }
      if (decls.length > 0) {
        cssRules.push(`${bSel} { ${decls.join('; ')}; }`);
      }
      if (ov.text !== undefined || ov.icon !== undefined || ov.href !== undefined || ov.imgSrc !== undefined) {
        domOps.push({
          sel,
          text: ov.text,
          icon: ov.icon,
          href: ov.href,
          imgSrc: ov.imgSrc
        });
      }
    });

    const fontLinks = Array.from(usedFonts).map(f =>
      `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=${GOOGLE_FONT_MAP[f]}&display=swap" data-bareun-vo-font="1" />`
    ).join('\n  ');

    const headHtml = [
      fontLinks,
      cssRules.length ? `<style id="bareun-studio-vo-css">\n${cssRules.join('\n')}\n  </style>` : ''
    ].filter(Boolean).join('\n  ');

    const bodyHtml = domOps.length ? `<script id="bareun-studio-vo-js">
(function(){
  var ops = ${JSON.stringify(domOps)};
  function stripLeadingIcon(s){ return String(s||'').replace(/^[\\u{1F300}-\\u{1FAFF}\\u2600-\\u27BF✦❖★☆✓✔→↗➤•◆◇▶▷📍📞💬📅✨👑❤️🛡️🦴🧬🔥💡✅⭐🏆🏥⏰💳📋🔍🎯💎🌱☀️🌙📌🔔🎁]+\\s*/u, '').trim(); }
  function applyOps(){
    ops.forEach(function(op){
      try {
        var el = document.querySelector(op.sel);
        if (!el) return;
        if (op.href && el.tagName === 'A') el.setAttribute('href', op.href);
        if (op.imgSrc) {
          if (el.tagName === 'IMG') el.setAttribute('src', op.imgSrc);
          else el.style.backgroundImage = "url('" + op.imgSrc + "')";
        }
        var unsafe = ['TR','TABLE','TBODY','THEAD','SECTION','ARTICLE','HEADER','FOOTER','NAV','UL','OL'].indexOf(el.tagName) !== -1;
        if (!unsafe && (op.text !== undefined || op.icon !== undefined)) {
          var baseText = op.text !== undefined ? String(op.text) : stripLeadingIcon(el.textContent);
          var prefix = (op.icon && op.icon !== '__none__') ? (op.icon + ' ') : '';
          var combined = (prefix + baseText).trim();
          var leaf = (el.children.length === 1 && el.children[0].tagName === 'SPAN' && !el.children[0].children.length) ? el.children[0] : null;
          if (leaf) leaf.textContent = combined;
          else if (el.children.length === 0) el.textContent = combined;
          else {
            var spanTarget = el.querySelector(':scope > span:not(.logo-gem):not(.concept-dot):not(.tap-pill-arrow):not(.brand-logo-mark)');
            if (spanTarget) spanTarget.textContent = combined;
            else el.textContent = combined;
          }
        }
      } catch(e){}
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', applyOps);
  else applyOps();
  setTimeout(applyOps, 350);
})();
</script>` : '';

    return { headHtml, bodyHtml };
  }

  function compileHomeStoryHtml(homePageConfig, baseHtml) {
    if (!baseHtml || typeof baseHtml !== 'string') {
      throw new Error('Base story-3d.html template string is required.');
    }
    let out = baseHtml;
    const hs = homePageConfig.homeStory || {};
    const plates = Array.isArray(homePageConfig.plates) ? homePageConfig.plates : [];
    const collectedCss = [];
    const collectedJs = [];

    // Ensure .dialogue-sub-whisper is visible whenever non-empty even on older cached templates
    out = out.replace(
      /\.dialogue-meta-row,\s*\.dialogue-sub-whisper,\s*\.dialogue-phase-steps,\s*\.timeline-top-meta\s*\{\s*display:\s*none\s*!important;\s*\}/i,
      `.dialogue-meta-row, .dialogue-phase-steps, .timeline-top-meta { display: none !important; }\n    .dialogue-sub-whisper:empty { display: none !important; }\n    .dialogue-sub-whisper { display: block; width: fit-content; margin: -8px 0 18px; max-width: min(660px, 92vw); font-size: clamp(14.5px, 1.35vw, 18.5px); font-weight: 500; line-height: 1.6; color: rgba(253, 250, 243, 0.94); text-shadow: 0 2px 14px rgba(15, 13, 11, 0.92); background: rgba(20, 17, 14, 0.36); backdrop-filter: blur(8px); border-left: 3px solid rgba(212, 175, 55, 0.82); padding: 8px 14px; border-radius: 0 10px 10px 0; }`
    );

    // 1. SEO Overrides
    if (homePageConfig.seo) {
      const seo = homePageConfig.seo;
      if (seo.title) {
        out = out.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escHtml(seo.title)}</title>`);
        out = out.replace(/(<meta\s+property=["']og:title["']\s+content=["'])[^"']*(["'][^>]*>)/i, `$1${escHtml(seo.ogTitle || seo.title)}$2`);
      }
      if (seo.description) {
        out = out.replace(/(<meta\s+name=["']description["']\s+content=["'])[^"']*(["'][^>]*>)/i, `$1${escHtml(seo.description)}$2`);
        out = out.replace(/(<meta\s+property=["']og:description["']\s+content=["'])[^"']*(["'][^>]*>)/i, `$1${escHtml(seo.ogDescription || seo.description)}$2`);
      }
      if (seo.keywords) {
        if (/<meta\s+name=["']keywords["']/i.test(out)) {
          out = out.replace(/(<meta\s+name=["']keywords["']\s+content=["'])[^"']*(["'][^>]*>)/i, `$1${escHtml(seo.keywords)}$2`);
        } else {
          out = out.replace(/(<meta\s+name=["']description["'][^>]*>)/i, `$1\n  <meta name="keywords" content="${escHtml(seo.keywords)}">`);
        }
      }
    }

    // 2. Opening Slogan
    const sloganText = [hs.introLine1, hs.introLine2].filter(Boolean).join(' ').trim();
    if (sloganText) {
      out = out.replace(
        /(<h2 class="daddy-intro-slogan" id="daddy-intro-slogan" aria-label=")[^"]*(">\s*<span class="daddy-intro-quote-marks">[^<]*<\/span><span id="daddy-intro-chars">)[^<]*(<\/span>)/i,
        `$1${escHtml(sloganText)}$2${escHtml(sloganText)}$3`
      );
    }

    // 2.5 Concept Pill
    if (hs.conceptPill) {
      out = out.replace(
        /(<div class="dialogue-daddy-concept-pill" id="dialogue-daddy-concept-pill">\s*<span class="concept-dot"><\/span>\s*<span>)[^<]*(<\/span>)/i,
        `$1${escHtml(hs.conceptPill)}$2`
      );
    }

    // 3. Brand Title & Sub
    if (hs.brandTitle !== undefined || hs.brandSub !== undefined) {
      const bTitle = escHtml(hs.brandTitle || '바른한의원 대전본점');
      const bSub = escHtml(hs.brandSub || '');
      out = out.replace(
        /(<a href="index\.html" class="nav-brand-logo">\s*<span class="logo-gem"><\/span>\s*<span>)[^<]*(<\/span>)(?:\s*<span class="nav-brand-sub">[^<]*<\/span>)?/i,
        (_, p1, p2) => `${p1}${bTitle}${p2}${bSub ? '\n      <span class="nav-brand-sub">' + bSub + '</span>' : ''}`
      );
    }

    // 4. Finale Header
    if (hs.finaleHeadline) {
      out = out.replace(/(<span class="skt-headline-text">)[^<]*(<\/span>)/i, `$1${escHtml(hs.finaleHeadline)}$2`);
    }
    if (hs.finaleHeadlineSub) {
      out = out.replace(/(<span class="skt-headline-sub">)[^<]*(<\/span>)/i, `$1${escHtml(hs.finaleHeadlineSub)}$2`);
    }
    if (hs.finaleEyebrow) {
      out = out.replace(/(<span class="skt-finale-eyebrow">)[^<]*(<\/span>)/i, `$1${escHtml(hs.finaleEyebrow)}$2`);
    }
    if (hs.finaleMainTitle) {
      out = out.replace(/(<h2 class="skt-finale-main-title">)[^<]*(<\/h2>)/i, `$1${escHtml(hs.finaleMainTitle)}$2`);
    }

    // 5. Bento Cards (#skt-bento-grid)
    const bentoCards = plates.filter(p => p && p.type === 'home-bento-card' && p.enabled !== false);
    if (bentoCards.length > 0) {
      const bentoHtml = bentoCards.map((c, idx) => {
        const href = escHtml(c.linkHref || c.dataLink || '#');
        const isHairModal = Boolean(c.isHairlossModal || href === '#hairloss-select' || c.dataLink === 'hairloss-modal');
        const dev = compileHomeDevCustom(c.devCustom, `home-bento-${idx}`, collectedCss, collectedJs);
        const actionsHtml = isHairModal
          ? `<div class="skt-card-actions-row" style="flex-wrap:wrap;gap:5px;">
              <span class="skt-card-chip" data-action="hairloss-modal">${escHtml(c.chipLabel || '4가지 유형 선택 ⊞')}</span>
              <span class="skt-card-chip secondary" data-action="custom-link" data-href="hairloss-male.html">남성탈모</span>
              <span class="skt-card-chip secondary" data-action="custom-link" data-href="hairloss-alopecia.html">원형탈모</span>
              <span class="skt-card-chip secondary" data-action="custom-link" data-href="hairloss-female.html">여성탈모</span>
              <span class="skt-card-chip secondary" data-action="custom-link" data-href="hairloss-seborrheic.html">지루성두피염</span>
            </div>`
          : `<div class="skt-card-actions-row">
              <span class="skt-card-chip" data-action="link">${escHtml(c.chipLabel || '상세페이지 보기 →')}</span>
            </div>`;
        return `
      <a href="${isHairModal ? '#hairloss-select' : href}" class="skt-card-item" data-dev-item-id="home-bento-${idx}" data-card-idx="${idx}" data-rot="${c.rot != null ? c.rot : 0}" data-link="${escHtml(c.dataLink || href)}" data-reserve="${escHtml(c.reserveProg || c.title || '')}" data-chapter="${c.chapter || 2}"${dev.cssVarsInline ? ` style="${dev.cssVarsInline}"` : ''}>
        <div class="skt-img-box" style="background-image: url('${escHtml(c.imgSrc || '')}'); background-position: ${escHtml(c.bgPos || 'center center')};"></div>
        <div class="skt-card-box">
          <div class="skt-card-bottom-info" style="flex-direction:column;align-items:flex-start;gap:6px;">
            ${dev.beforeHtml}
            <p class="skt-card-title">${escHtml(c.title || '')}</p>
            <p class="skt-card-desc">${escHtml(c.sub || '')}</p>
            ${actionsHtml}
            ${dev.afterHtml}
          </div>
        </div>
      </a>`;
      }).join('\n');

      out = out.replace(
        /(<div class="skt-bento-grid" id="skt-bento-grid">)[\s\S]*?(<\/div>\s*<\/section>)/i,
        `$1\n${bentoHtml}\n    $2`
      );
    }

    // 6. DIALOGUE_CHAPTERS
    if (Array.isArray(hs.chapters) && hs.chapters.length > 0) {
      const chapLiteral = JSON.stringify(hs.chapters.map((ch, idx) => ({
        id: ch.id || (idx + 1),
        numLabel: ch.numLabel || `STORY 0${idx + 1} / 08`,
        quote: ch.quote || ''
      })), null, 8);
      out = out.replace(
        /const DIALOGUE_CHAPTERS = \[[\s\S]*?\];/,
        `const DIALOGUE_CHAPTERS = ${chapLiteral};`
      );
    }

    // 7. FRAMES
    const storyFrames = plates.filter(p => p && p.type === 'home-story-frame' && p.enabled !== false);
    if (storyFrames.length > 0) {
      const framesData = storyFrames.map(f => {
        const obj = {
          src: f.imgSrc || '',
          chapter: Number(f.chapter) || 1,
          quote: f.title || '',
          povBadge: f.povBadge || '',
          stepLabel: f.stepLabel || '',
          mode: Number(f.mode) || 0,
          warmth: f.warmth != null ? Number(f.warmth) : 1.06,
          focal: Array.isArray(f.focal) && f.focal.length === 2 ? f.focal : [0.5, 0.5],
          whisper: f.sub || ''
        };
        if (f.specialRole) obj.specialRole = f.specialRole;
        return obj;
      });
      out = out.replace(
        /const FRAMES = \[[\s\S]*?\];/,
        `const FRAMES = ${JSON.stringify(framesData, null, 8)};`
      );
    }

    // 8. Page-level & Global Developer Mode injections
    const pageDev = compileHomeDevCustom(homePageConfig.devCustom, 'home-page-root', collectedCss, collectedJs);
    const globalDev = compileHomeDevCustom(homePageConfig._globalDevCustom, 'global-root', collectedCss, collectedJs);

    // Strip any old injected home dev & visual override blocks before injecting fresh ones
    out = out.replace(/<!-- \[BAREUN_HOME_DEV_HEAD_START\] -->[\s\S]*?<!-- \[BAREUN_HOME_DEV_HEAD_END\] -->\s*/g, '');
    out = out.replace(/<!-- \[BAREUN_HOME_DEV_BODY_START\] -->[\s\S]*?<!-- \[BAREUN_HOME_DEV_BODY_END\] -->\s*/g, '');
    out = out.replace(/<link[^>]*data-bareun-vo-font="1"[^>]*>\s*/g, '');
    out = out.replace(/<style id="bareun-studio-vo-css">[\s\S]*?<\/style>\s*/g, '');
    out = out.replace(/<script id="bareun-studio-vo-js">[\s\S]*?<\/script>\s*/g, '');
    out = out.replace(/<style id="bareun-home-dev-css">[\s\S]*?<\/style>\s*/g, '');
    out = out.replace(/<script id="bareun-home-dev-js">[\s\S]*?<\/script>\s*/g, '');

    const voBundle = buildVisualOverridesBundle(homePageConfig.elementOverrides, homePageConfig.pageThemeOverride);

    const headChunks = [];
    if (voBundle.headHtml) headChunks.push(voBundle.headHtml);
    if (collectedCss.length > 0) {
      headChunks.push(`<style id="bareun-home-dev-css">\n${collectedCss.join('\n')}\n  </style>`);
    }
    if (homePageConfig.devCustom && homePageConfig.devCustom.customHeadHtml) {
      headChunks.push(homePageConfig.devCustom.customHeadHtml);
    }
    if (headChunks.length > 0) {
      out = out.replace('</head>', `  <!-- [BAREUN_HOME_DEV_HEAD_START] -->\n  ${headChunks.join('\n  ')}\n  <!-- [BAREUN_HOME_DEV_HEAD_END] -->\n</head>`);
    }
    if (voBundle.bodyHtml || pageDev.afterHtml || globalDev.afterHtml || collectedJs.length > 0) {
      const injectBody = [
        voBundle.bodyHtml,
        pageDev.afterHtml,
        globalDev.afterHtml,
        collectedJs.length ? `<script id="bareun-home-dev-js">\n${collectedJs.join('\n')}\n  </script>` : ''
      ].filter(Boolean).join('\n  ');
      out = out.replace('</body>', `  <!-- [BAREUN_HOME_DEV_BODY_START] -->\n  ${injectBody}\n  <!-- [BAREUN_HOME_DEV_BODY_END] -->\n</body>`);
    }

    return out;
  }

  const exported = { compileHomeStoryHtml, buildVisualOverridesBundle };
  if (typeof window !== 'undefined') {
    window.BareunHomeCompiler = exported;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = exported;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this);
