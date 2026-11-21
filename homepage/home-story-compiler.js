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

  function compileHomeStoryHtml(homePageConfig, baseHtml) {
    if (!baseHtml || typeof baseHtml !== 'string') {
      throw new Error('Base story-3d.html template string is required.');
    }
    let out = baseHtml;
    const hs = homePageConfig.homeStory || {};
    const plates = Array.isArray(homePageConfig.plates) ? homePageConfig.plates : [];
    const collectedCss = [];
    const collectedJs = [];

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

    // Strip any old injected home dev blocks before injecting fresh ones
    out = out.replace(/<!-- \[BAREUN_HOME_DEV_HEAD_START\] -->[\s\S]*?<!-- \[BAREUN_HOME_DEV_HEAD_END\] -->\s*/g, '');
    out = out.replace(/<!-- \[BAREUN_HOME_DEV_BODY_START\] -->[\s\S]*?<!-- \[BAREUN_HOME_DEV_BODY_END\] -->\s*/g, '');
    out = out.replace(/<style id="bareun-home-dev-css">[\s\S]*?<\/style>\s*/g, '');
    out = out.replace(/<script id="bareun-home-dev-js">[\s\S]*?<\/script>\s*/g, '');

    const headChunks = [];
    if (collectedCss.length > 0) {
      headChunks.push(`<style id="bareun-home-dev-css">\n${collectedCss.join('\n')}\n  </style>`);
    }
    if (homePageConfig.devCustom && homePageConfig.devCustom.customHeadHtml) {
      headChunks.push(homePageConfig.devCustom.customHeadHtml);
    }
    if (headChunks.length > 0) {
      out = out.replace('</head>', `  <!-- [BAREUN_HOME_DEV_HEAD_START] -->\n  ${headChunks.join('\n  ')}\n  <!-- [BAREUN_HOME_DEV_HEAD_END] -->\n</head>`);
    }
    if (pageDev.afterHtml || globalDev.afterHtml || collectedJs.length > 0) {
      const injectBody = [
        pageDev.afterHtml,
        globalDev.afterHtml,
        collectedJs.length ? `<script id="bareun-home-dev-js">\n${collectedJs.join('\n')}\n  </script>` : ''
      ].filter(Boolean).join('\n  ');
      out = out.replace('</body>', `  <!-- [BAREUN_HOME_DEV_BODY_START] -->\n  ${injectBody}\n  <!-- [BAREUN_HOME_DEV_BODY_END] -->\n</body>`);
    }

    return out;
  }

  const exported = { compileHomeStoryHtml };
  if (typeof window !== 'undefined') {
    window.BareunHomeCompiler = exported;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = exported;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this);
