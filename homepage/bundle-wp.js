const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { SEO_PAGES, buildHeadSeoTagsHtml } = require('./seo-master-config.js');

const dir = __dirname;
const dimsPath = path.join(dir, 'image-dimensions.json');
const imageDims = fs.existsSync(dimsPath) ? JSON.parse(fs.readFileSync(dimsPath, 'utf8')) : {};

const visitTrackerCode = fs.existsSync(path.join(dir, 'visit-tracker.js'))
  ? fs.readFileSync(path.join(dir, 'visit-tracker.js'), 'utf8')
  : '';
const clinicConfigCode = fs.existsSync(path.join(dir, 'clinic-template-config.js'))
  ? fs.readFileSync(path.join(dir, 'clinic-template-config.js'), 'utf8')
  : '';

const wpReset = [
  '',
  '/* WORDPRESS & ASTRA THEME CONTAINER RESET */',
  '.site-header, .site-footer, #masthead, #colophon, .entry-header, .ast-breadcrumbs-wrapper, .post-thumb, .post-thumb-img-content, .ast-single-post-order, #ast-scroll-top { display: none !important; }',
  '.entry-content a, .ast-container a, .site-content a { text-decoration: none !important; }',
  '.entry-content, .ast-container, .site-content, article.page, .ast-plain-container,',
  '.elementor, .elementor-section-wrap, .wp-block-group {',
  '  padding: 0 !important;',
  '  margin: 0 !important;',
  '  max-width: 100% !important;',
  '  width: 100% !important;',
  '  overflow: visible !important;',
  '}',
  '.ast-page-builder-template .entry-content[data-ast-blocks-layout] > .inherit-container-width > *,',
  '.ast-page-builder-template .entry-content[data-ast-blocks-layout] > :not(.wp-block-group):where(:not(.uagb-is-root-container):not(.spectra-is-root-container)) > * {',
  '  margin-left: 0;',
  '  margin-right: 0;',
  '}',
  ''
].join('\n');

const ghBase = 'https://raw.githubusercontent.com/ajwei0508-cpu/bareun-homepage/main/homepage/';

function toGhWebpOrRaw(relPath) {
  const clean = String(relPath || '').replace(/^\/+/, '');
  if (imageDims[clean] && imageDims[clean].webp) {
    return ghBase + imageDims[clean].webp;
  }
  return ghBase + clean;
}

function lookupImgDimensions(rawSrc) {
  if (!rawSrc) return { w: 800, h: 600 };
  if (rawSrc.startsWith('data:image/')) return { w: 1, h: 1 };
  let rel = rawSrc;
  if (rel.startsWith(ghBase)) rel = rel.slice(ghBase.length);
  rel = rel.split('?')[0].replace(/^\/+/, '');
  if (imageDims[rel]) {
    return { w: imageDims[rel].w, h: imageDims[rel].h };
  }
  for (const [, info] of Object.entries(imageDims)) {
    if (info.webp === rel) {
      return { w: info.w, h: info.h };
    }
  }
  return { w: 800, h: 600 };
}

function enrichStandaloneHtml(rawHtml, seoKey, srcFile) {
  let html = rawHtml;
  if (srcFile === 'lifting-compare.html' && !html.includes('visit-tracker.js')) {
    html = html.replace('</body>', '  <script src="visit-tracker.js"></script>\r\n</body>');
  }

  // 1. Replace SEO tags in <head> with Single Source of Truth
  html = html.replace(/<head([^>]*)>([\s\S]*?)<\/head>/i, (full, headAttrs, headInner) => {
    let cleaned = headInner
      .replace(/^\s*<title>[\s\S]*?<\/title>\s*$/gim, '')
      .replace(/^\s*<meta\s+name=["'](?:description|keywords|robots|twitter:[^"']+)["'][^>]*>\s*$/gim, '')
      .replace(/^\s*<meta\s+property=["']og:[^"']+["'][^>]*>\s*$/gim, '')
      .replace(/^\s*<link\s+rel=["']canonical["'][^>]*>\s*$/gim, '')
      .replace(/^\s*<link\s+rel=["']alternate["'][^>]*hreflang=[^>]*>\s*$/gim, '')
      .replace(/^\s*<link\s+rel=["']preload["'][^>]*as=["']image["'][^>]*>\s*$/gim, '')
      .replace(/<script\s+type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/\n{3,}/g, '\n\n');

    const seoBlock = buildHeadSeoTagsHtml(seoKey);
    const viewportMatch = cleaned.match(/<meta\s+name=["']viewport["'][^>]*>/i);
    if (viewportMatch) {
      cleaned = cleaned.replace(viewportMatch[0], viewportMatch[0] + '\n' + seoBlock);
    } else {
      cleaned = '\n' + seoBlock + '\n' + cleaned;
    }
    return `<head${headAttrs}>${cleaned}</head>`;
  });

  // 2. Mask <script> and <style> blocks before enriching HTML <img> and <a> attributes
  const masks = [];
  let masked = html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, (m) => {
    const token = `__BAREUN_MASK_${masks.length}__`;
    masks.push(m);
    return token;
  });

  let markedFirstHeroImg = false;
  masked = masked.replace(/<img\b([^>]*)>/gi, (full, attrs) => {
    let newAttrs = attrs;
    const srcMatch = newAttrs.match(/\bsrc\s*=\s*["']([^"']*)["']/i);
    const dataImgMatch = newAttrs.match(/\bdata-img\s*=\s*["']([^"']*)["']/i);
    const effectiveSrc = (srcMatch && srcMatch[1] && !srcMatch[1].startsWith('data:'))
      ? srcMatch[1]
      : (dataImgMatch && dataImgMatch[1] ? dataImgMatch[1] : (srcMatch ? srcMatch[1] : ''));

    if (!/\balt\s*=/i.test(newAttrs)) {
      newAttrs += ' alt=""';
    }
    if (!/\bwidth\s*=/i.test(newAttrs) || !/\bheight\s*=/i.test(newAttrs)) {
      const { w, h } = lookupImgDimensions(effectiveSrc);
      if (!/\bwidth\s*=/i.test(newAttrs)) newAttrs += ` width="${w}"`;
      if (!/\bheight\s*=/i.test(newAttrs)) newAttrs += ` height="${h}"`;
    }
    const isRealPhoto = srcMatch && srcMatch[1] && !srcMatch[1].startsWith('data:');
    if (isRealPhoto && !markedFirstHeroImg) {
      markedFirstHeroImg = true;
      newAttrs = newAttrs.replace(/\s*\bloading\s*=\s*["']lazy["']/gi, '');
      if (!/\bfetchpriority\s*=/i.test(newAttrs)) {
        newAttrs += ' fetchpriority="high"';
      }
    }
    return `<img${newAttrs.replace(/\s*\/\s*$/, '')}>`;
  });

  // Ensure external target="_blank" anchors include rel="noopener noreferrer" (C30)
  masked = masked.replace(/<a\b([^>]*)>/gi, (full, attrs) => {
    if (!/\btarget\s*=\s*["']?_blank["']?/i.test(attrs)) return full;
    if (/\brel\s*=/i.test(attrs)) {
      return `<a${attrs.replace(/\brel\s*=\s*["']([^"']*)["']/i, (rm, rv) => {
        if (/noopener|noreferrer/i.test(rv)) return rm;
        return `rel="${(rv + ' noopener noreferrer').trim()}"`;
      })}>`;
    }
    return `<a${attrs} rel="noopener noreferrer">`;
  });

  html = masked.replace(/__BAREUN_MASK_(\d+)__/g, (_, i) => masks[Number(i)]);
  return html;
}

function stripOuterDocumentForWP(fullHtml) {
  const headMatch = fullHtml.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  const bodyMatch = fullHtml.match(/<body([^>]*)>([\s\S]*?)<\/body>/i);
  if (!headMatch || !bodyMatch) {
    return fullHtml.replace('<style>', '<style>' + wpReset);
  }

  const headInner = headMatch[1];
  const bodyAttrs = bodyMatch[1] || '';
  const bodyInner = bodyMatch[2];

  const preservedHeadParts = [];
  // Keep Google Fonts / stylesheet / preconnect links
  const headLinks = headInner.match(/<link\b[^>]*>/gi) || [];
  for (const lnk of headLinks) {
    if (/\brel\s*=\s*["'](?:preconnect|stylesheet)["']/i.test(lnk)) {
      preservedHeadParts.push(lnk);
    }
  }

  // Keep executable/external scripts in <head> (e.g. three.min.js, inlined clinic-template-config.js), skip ld+json
  const headScripts = headInner.match(/<script\b[^>]*>[\s\S]*?<\/script>/gi) || [];
  for (const scr of headScripts) {
    if (/type\s*=\s*["']application\/ld\+json["']/i.test(scr)) continue;
    preservedHeadParts.push(scr);
  }

  // Keep <style> blocks and inject wpReset into the first one
  const headStyles = headInner.match(/<style\b[^>]*>[\s\S]*?<\/style>/gi) || [];
  let injectedReset = false;
  for (const st of headStyles) {
    if (!injectedReset) {
      injectedReset = true;
      preservedHeadParts.push(st.replace(/<style([^>]*)>/i, '<style$1>' + wpReset));
    } else {
      preservedHeadParts.push(st);
    }
  }
  if (!injectedReset) {
    preservedHeadParts.push(`<style>${wpReset}</style>`);
  }

  // Preserve body class (e.g. theme-hanji) immediately on document.body
  const classMatch = bodyAttrs.match(/\bclass\s*=\s*["']([^"']+)["']/i);
  if (classMatch && classMatch[1].trim()) {
    const classes = classMatch[1].trim().split(/\s+/).filter(Boolean);
    preservedHeadParts.push(`<script>document.body.classList.add(${classes.map(c => JSON.stringify(c)).join(',')});</script>`);
  }

  return preservedHeadParts.join('\n') + '\n' + bodyInner;
}

function rewriteAssetsForWP(html, label) {
  const assetPrefix = '(?:brochure\\/|ba_|illust_|prev_life_|life_|bareun_|card_|detail_|director_exam_|director_|diet_minimal_|chuna_minimal_|chuna-|chuna_|gongjindan|prostate_minimal_|prostate-|prostate_|growth-|growth_|empathy-|empathy_|efficacy-)';
  const pageSlugUnion = '(ask-doctor|body-explorer|director|chuna|growth|diet-zero|hairloss|hairloss-male|hairloss-alopecia|hairloss-female|hairloss-seborrheic|gongjindan|prostate|lifting-compare)';

  let out = html
    // Inline local JS configs first so zero external raw.githubusercontent.com JS requests happen
    .replace(/<script\s+src="clinic-template-config\.js"><\/script>/gi, () => clinicConfigCode ? `<script>\n${clinicConfigCode}\n</script>` : '')
    .replace(/<script\s+src="visit-tracker\.js"><\/script>/gi, () => visitTrackerCode ? `<script>\n${visitTrackerCode}\n</script>` : '')
    // Rewrite image & asset paths to compressed <92KB WebP on GitHub Raw CDN
    .replace(new RegExp("(src|before|after|beforeImg|afterImg):\\s*'(" + assetPrefix + "[^']+)'", 'g'), (_, k, p) => `${k}: '${toGhWebpOrRaw(p)}'`)
    .replace(/"(illustration|illustImg|baBeforeImg|baAfterImg)":"((?:illust_|ba_)[^"]+)"/g, (_, k, p) => `"${k}":"${toGhWebpOrRaw(p)}"`)
    .replace(new RegExp('"(heroImg|subImg)":"(' + assetPrefix + '[^"]+)"', 'g'), (_, k, p) => `"${k}":"${toGhWebpOrRaw(p)}"`)
    .replace(new RegExp('src=\\\\"(' + assetPrefix + '[^\\\\"]+)\\\\"', 'g'), (_, p) => 'src=\\"' + toGhWebpOrRaw(p) + '\\"')
    .replace(/setDecoderPath\('draco\/'\)/g, "setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/')")
    .replace(/load\('((?:models\/|texture\/)[^']+)'\)/g, "load('" + ghBase + "$1')")
    .replace(new RegExp("load\\('(" + assetPrefix + "[^']+)'\\)", 'g'), (_, p) => `load('${toGhWebpOrRaw(p)}')`)
    .replace(/file:\s*'((?:models\/|texture\/)[^']+)'/g, "file: '" + ghBase + "$1'")
    .replace(new RegExp("url\\('(" + assetPrefix + "[^']+)'\\)", 'g'), (_, p) => `url('${toGhWebpOrRaw(p)}')`)
    .replace(new RegExp("loadLinearTex\\('(" + assetPrefix + "[^']+)'\\)", 'g'), "loadLinearTex('" + ghBase + "$1')")
    .replace(new RegExp("openCleanLightbox\\('(" + assetPrefix + "[^']+)'\\)", 'g'), (_, p) => `openCleanLightbox('${toGhWebpOrRaw(p)}')`)
    .replace(new RegExp("handleGjdSlideClick\\((\\d+),\\s*'(" + assetPrefix + "[^']+)'\\)", 'g'), (_, idx, p) => `handleGjdSlideClick(${idx}, '${toGhWebpOrRaw(p)}')`)
    .replace(new RegExp('src="(' + assetPrefix + '[^"]*)"', 'g'), (_, p) => `src="${toGhWebpOrRaw(p)}"`)
    .replace(new RegExp('data-img="(' + assetPrefix + '[^"]+)"', 'g'), (_, p) => `data-img="${toGhWebpOrRaw(p)}"`)
    .replace(new RegExp('poster="(' + assetPrefix + '[^"]+)"', 'g'), (_, p) => `poster="${toGhWebpOrRaw(p)}"`)
    // Rewrite internal navigation links to canonical slugs (including /gongjindan/)
    .replace(/href="story-3d\.html(\?[^"]*)?"/g, 'href="/$1"')
    .replace(/href="index\.html(\?[^"]*)?"/g, 'href="/$1"')
    .replace(new RegExp('href="' + pageSlugUnion + '\\.html(\\?[^"]*)?"', 'g'), 'href="/$1/$2"')
    .replace(new RegExp('data-link="' + pageSlugUnion + '\\.html(\\?[^"]*)?"', 'g'), 'data-link="/$1/$2"')
    .replace(new RegExp('data-href="' + pageSlugUnion + '\\.html(\\?[^"]*)?"', 'g'), 'data-href="/$1/$2"')
    .replace(new RegExp("href:\\s*'" + pageSlugUnion + "\\.html(\\?[^']*)?'", 'g'), "href: '/$1/$2'")
    .replace(new RegExp('"href":"' + pageSlugUnion + '\\.html(\\?[^"]*)?"', 'g'), '"href":"/$1/$2"')
    .replace(new RegExp("href\\s*=\\s*'" + pageSlugUnion + "\\.html(\\?[^']*)?'", 'g'), "href = '/$1/$2'")
    .replace(/'body-explorer\.html(\?[^']*)?'/g, "'/body-explorer/$1'")
    .replace(/'ask-doctor\.html(\?[^']*)?'/g, "'/ask-doctor/$1'")
    .replace(new RegExp('"clinicLink":"' + pageSlugUnion + '\\.html"', 'g'), '"clinicLink":"/$1/"')
    .replace(new RegExp('"ctaHref":"' + pageSlugUnion + '\\.html"', 'g'), '"ctaHref":"/$1/"')
    .replace(/data-frames="([^"]+)"/g, (match, p1) => {
      const rewritten = p1.split('|').map(f => f.startsWith('http') ? f : toGhWebpOrRaw(f)).join('|');
      return 'data-frames="' + rewritten + '"';
    });

  // Strip outer <!DOCTYPE html><html><head><body> wrapper so WP theme owns the sole valid <head> & <body>
  out = stripOuterDocumentForWP(out);

  // Protect inline executable <script> blocks against WordPress wptexturize / wpautop
  out = out.replace(/<script(?![^>]*\bsrc=)(?![^>]*type=["'](?:importmap|application\/ld\+json)["'])([^>]*)>([\s\S]*?)<\/script>/gi, (full, attrs, jsCode) => {
    const trimmed = jsCode.trim();
    if (!trimmed) return full;
    try {
      new vm.Script(trimmed);
    } catch (err) {
      console.error(`[SYNTAX ERROR in ${label}]:`, err.message);
      throw err;
    }
    const b64 = Buffer.from(trimmed, 'utf8').toString('base64');
    return `<script>new Function(new TextDecoder().decode(Uint8Array.from(atob("${b64}"),function(c){return c.charCodeAt(0)})))();</script>`;
  });

  return out;
}

const ALL_BUNDLES = [
  ['index.html', 'wordpress-main-home.html', 'home'],
  ['story-3d.html', 'wordpress-story-3d.html', 'story-3d'],
  ['director.html', 'wordpress-director.html', 'director'],
  ['chuna.html', 'wordpress-chuna.html', 'chuna'],
  ['growth.html', 'wordpress-growth.html', 'growth'],
  ['diet-zero.html', 'wordpress-diet.html', 'diet-zero'],
  ['hairloss.html', 'wordpress-hairloss.html', 'hairloss'],
  ['hairloss-male.html', 'wordpress-hairloss-male.html', 'hairloss-male'],
  ['hairloss-alopecia.html', 'wordpress-hairloss-alopecia.html', 'hairloss-alopecia'],
  ['hairloss-female.html', 'wordpress-hairloss-female.html', 'hairloss-female'],
  ['hairloss-seborrheic.html', 'wordpress-hairloss-seborrheic.html', 'hairloss-seborrheic'],
  ['gongjindan.html', 'wordpress-gongjindan.html', 'gongjindan'],
  ['prostate.html', 'wordpress-prostate.html', 'prostate'],
  ['body-explorer.html', 'wordpress-body-explorer.html', 'body-explorer'],
  ['ask-doctor.html', 'wordpress-ask-doctor.html', 'ask-doctor'],
  ['lifting-compare.html', 'wordpress-lifting-compare.html', 'lifting-compare']
];

for (const [srcFile, outFile, seoKey] of ALL_BUNDLES) {
  const fullSrc = path.join(dir, srcFile);
  if (!fs.existsSync(fullSrc)) continue;
  const raw = fs.readFileSync(fullSrc, 'utf8');
  const enriched = enrichStandaloneHtml(raw, seoKey, srcFile);
  fs.writeFileSync(fullSrc, enriched, 'utf8');

  const wpOut = rewriteAssetsForWP(enriched, outFile);
  fs.writeFileSync(path.join(dir, outFile), wpOut, 'utf8');
  console.log('Successfully generated ' + outFile.padEnd(32) + ' (' + wpOut.length + ' bytes)');
}
