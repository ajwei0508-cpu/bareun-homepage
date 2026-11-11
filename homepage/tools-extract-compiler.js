const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, 'build-story-detail-pages.js');
const dstPath = path.join(__dirname, 'bareun-detail-compiler.js');
const clinicCfgPath = path.join(__dirname, 'clinic-template-config.js');
const visitTrkPath = path.join(__dirname, 'visit-tracker.js');

const content = fs.readFileSync(srcPath, 'utf8');
const startIdx = content.indexOf('const NAV_TABS = [');
const endIdx = content.indexOf('const outDir = __dirname;');

if (startIdx === -1 || endIdx === -1) {
  throw new Error(`Failed to locate markers: startIdx=${startIdx}, endIdx=${endIdx}`);
}

const core = content.slice(startIdx, endIdx).trim();

const clinicConfigCode = fs.existsSync(clinicCfgPath) ? fs.readFileSync(clinicCfgPath, 'utf8') : '';
const visitTrackerCode = fs.existsSync(visitTrkPath) ? fs.readFileSync(visitTrkPath, 'utf8') : '';

const wpToolsCode = `

// ============================================================================
// BAREUN WORDPRESS ALL-IN-ONE COMPILER & ASSET REWRITER
// ============================================================================
const WP_EMBEDDED_CLINIC_CONFIG = ${JSON.stringify(clinicConfigCode)};
const WP_EMBEDDED_VISIT_TRACKER = ${JSON.stringify(visitTrackerCode)};

const WP_RESET_CSS = [
  '',
  '/* WORDPRESS & ASTRA THEME CONTAINER RESET */',
  '.site-header, .site-footer, #masthead, #colophon, .entry-header, .ast-breadcrumbs-wrapper, .post-thumb, .post-thumb-img-content, .ast-single-post-order, #ast-scroll-top { display: none !important; }',
  '.entry-content a, .ast-container a, .site-content a { text-decoration: none !important; }',
  '#page, #content, #primary, #main, .entry-content, .ast-container, .site-content, article.page, .ast-plain-container,',
  '.elementor, .elementor-section-wrap, .wp-block-group {',
  '  padding: 0 !important;',
  '  margin: 0 !important;',
  '  max-width: 100vw !important;',
  '  width: 100% !important;',
  '  overflow-x: clip !important;',
  '  box-sizing: border-box !important;',
  '}',
  '.ast-page-builder-template .entry-content[data-ast-blocks-layout] > .inherit-container-width > *,',
  '.ast-page-builder-template .entry-content[data-ast-blocks-layout] > :not(.wp-block-group):where(:not(.uagb-is-root-container):not(.spectra-is-root-container)) > * {',
  '  margin-left: 0;',
  '  margin-right: 0;',
  '}',
  ''
].join('\\n');

const BAREUN_GH_BASE = 'https://raw.githubusercontent.com/ajwei0508-cpu/bareun-homepage/main/homepage/';

function toGhAssetUrl(relPath) {
  if (!relPath) return '';
  if (relPath.startsWith('http://') || relPath.startsWith('https://') || relPath.startsWith('data:')) {
    return relPath;
  }
  const clean = String(relPath).replace(/^\\/+/, '');
  return BAREUN_GH_BASE + clean;
}

function stripOuterDocumentForWP(fullHtml) {
  const headMatch = fullHtml.match(/<head[^>]*>([\\s\\S]*?)<\\/head>/i);
  const bodyMatch = fullHtml.match(/<body([^>]*)>([\\s\\S]*?)<\\/body>/i);
  if (!headMatch || !bodyMatch) {
    return fullHtml.replace('<style>', '<style>' + WP_RESET_CSS);
  }

  const headInner = headMatch[1];
  const bodyAttrs = bodyMatch[1] || '';
  const bodyInner = bodyMatch[2];

  const preservedHeadParts = [];
  const headLinks = headInner.match(/<link\\b[^>]*>/gi) || [];
  for (const lnk of headLinks) {
    if (/\\brel\\s*=\\s*["'](?:preconnect|stylesheet)["']/i.test(lnk)) {
      preservedHeadParts.push(lnk);
    }
  }

  const headScripts = headInner.match(/<script\\b[^>]*>[\\s\\S]*?<\\/script>/gi) || [];
  for (const scr of headScripts) {
    if (/type\\s*=\\s*["']application\\/ld\\+json["']/i.test(scr)) continue;
    preservedHeadParts.push(scr);
  }

  const headStyles = headInner.match(/<style\\b[^>]*>[\\s\\S]*?<\\/style>/gi) || [];
  let injectedReset = false;
  for (const st of headStyles) {
    if (!injectedReset) {
      injectedReset = true;
      preservedHeadParts.push(st.replace(/<style([^>]*)>/i, '<style$1>' + WP_RESET_CSS));
    } else {
      preservedHeadParts.push(st);
    }
  }
  if (!injectedReset) {
    preservedHeadParts.push(\`<style>\${WP_RESET_CSS}</style>\`);
  }

  const classMatch = bodyAttrs.match(/\\bclass\\s*=\\s*["']([^"']+)["']/i);
  if (classMatch && classMatch[1].trim()) {
    const classes = classMatch[1].trim().split(/\\s+/).filter(Boolean);
    preservedHeadParts.push(\`<script>document.body.classList.add(\${classes.map(c => JSON.stringify(c)).join(',')});</script>\`);
  }

  return preservedHeadParts.join('\\n') + '\\n' + bodyInner;
}

function rewriteAssetsForWP(html) {
  const assetPrefix = '(?:brochure\\\\/|ba_|illust_|prev_life_|life_|bareun_|card_|detail_|director_exam_|director_|diet_minimal_|chuna_minimal_|chuna-|chuna_|gongjindan|prostate_minimal_|prostate-|prostate_|growth-|growth_|empathy-|empathy_|efficacy-)';
  const pageSlugUnion = '(ask-doctor|body-explorer|director|chuna|growth|diet-zero|hairloss|hairloss-male|hairloss-alopecia|hairloss-female|hairloss-seborrheic|gongjindan|prostate|lifting-compare)';

  let out = html
    .replace(/<script\\s+src="clinic-template-config\\.js"><\\/script>/gi, () => WP_EMBEDDED_CLINIC_CONFIG ? \`<script>\\n\${WP_EMBEDDED_CLINIC_CONFIG}\\n</script>\` : '')
    .replace(/<script\\s+src="visit-tracker\\.js"><\\/script>/gi, () => WP_EMBEDDED_VISIT_TRACKER ? \`<script>\\n\${WP_EMBEDDED_VISIT_TRACKER}\\n</script>\` : '')
    .replace(new RegExp("(src|before|after|beforeImg|afterImg):\\\\s*'(" + assetPrefix + "[^']+)'", 'g'), (_, k, p) => \`\${k}: '\${toGhAssetUrl(p)}'\`)
    .replace(/"(illustration|illustImg|baBeforeImg|baAfterImg)":"((?:illust_|ba_)[^"]+)"/g, (_, k, p) => \`"\${k}":"\${toGhAssetUrl(p)}"\`)
    .replace(new RegExp('"(heroImg|subImg)":"(' + assetPrefix + '[^"]+)"', 'g'), (_, k, p) => \`"\${k}":"\${toGhAssetUrl(p)}"\`)
    .replace(new RegExp('src=\\\\\\\\("(' + assetPrefix + '[^\\\\\\\\"]+)\\\\\\\\)"', 'g'), (_, p) => 'src=\\\\"' + toGhAssetUrl(p) + '\\\\"')
    .replace(new RegExp("load\\\\('(" + assetPrefix + "[^']+)'\\\\)", 'g'), (_, p) => \`load('\${toGhAssetUrl(p)}')\`)
    .replace(new RegExp("url\\\\('(" + assetPrefix + "[^']+)'\\\\)", 'g'), (_, p) => \`url('\${toGhAssetUrl(p)}')\`)
    .replace(new RegExp('src="(' + assetPrefix + '[^"]*)"', 'g'), (_, p) => \`src="\${toGhAssetUrl(p)}"\`)
    .replace(new RegExp('data-img="(' + assetPrefix + '[^"]+)"', 'g'), (_, p) => \`data-img="\${toGhAssetUrl(p)}"\`)
    .replace(new RegExp('poster="(' + assetPrefix + '[^"]+)"', 'g'), (_, p) => \`poster="\${toGhAssetUrl(p)}"\`)
    .replace(/href="story-3d\\.html(\\?[^"]*)?"/g, 'href="/$1"')
    .replace(/href="index\\.html(\\?[^"]*)?"/g, 'href="/$1"')
    .replace(new RegExp('href="' + pageSlugUnion + '\\\\.html(\\\\?[^"]*)?"', 'g'), 'href="/$1/$2"')
    .replace(new RegExp('data-link="' + pageSlugUnion + '\\\\.html(\\\\?[^"]*)?"', 'g'), 'data-link="/$1/$2"')
    .replace(new RegExp('data-href="' + pageSlugUnion + '\\\\.html(\\\\?[^"]*)?"', 'g'), 'data-href="/$1/$2"')
    .replace(new RegExp("href:\\\\s*'" + pageSlugUnion + "\\\\.html(\\\\?[^']*)?'", 'g'), "href: '/$1/$2'")
    .replace(new RegExp('"href":"' + pageSlugUnion + '\\\\.html(\\\\?[^"]*)?"', 'g'), '"href":"/$1/$2"')
    .replace(/'body-explorer\\\\.html(\\\\?[^']*)?'/g, "'/body-explorer/$1'")
    .replace(/'ask-doctor\\\\.html(\\\\?[^']*)?'/g, "'/ask-doctor/$1'");

  out = stripOuterDocumentForWP(out);

  out = out.replace(/<script(?![^>]*\\bsrc=)(?![^>]*type=["'](?:importmap|application\\/ld\\+json)["'])([^>]*)>([\\s\\S]*?)<\\/script>/gi, (full, attrs, jsCode) => {
    const trimmed = jsCode.trim();
    if (!trimmed) return full;
    let b64 = '';
    if (typeof Buffer !== 'undefined') {
      b64 = Buffer.from(trimmed, 'utf8').toString('base64');
    } else {
      b64 = btoa(unescape(encodeURIComponent(trimmed)));
    }
    return \`<script>new Function(new TextDecoder().decode(Uint8Array.from(atob("\${b64}"),function(c){return c.charCodeAt(0)})))();</script>\`;
  });

  return out;
}

function buildWpBlockContent(fullHtml) {
  const converted = rewriteAssetsForWP(fullHtml);
  return '<!-- wp:html -->\\n' + converted + '\\n<!-- /wp:html -->';
}

function buildCompleteWpPage(pageConfig) {
  const fullHtml = buildPageHtml(pageConfig);
  return buildWpBlockContent(fullHtml);
}

// ============================================================================
// UMD / CommonJS / Browser Export
// ============================================================================
const exported = {
  NAV_TABS,
  buildPageHtml,
  rewriteAssetsForWP,
  stripOuterDocumentForWP,
  buildWpBlockContent,
  buildCompleteWpPage
};

if (typeof window !== 'undefined') {
  window.BareunCompiler = exported;
  window.NAV_TABS = NAV_TABS;
  window.buildPageHtml = buildPageHtml;
  window.buildWpBlockContent = buildWpBlockContent;
  window.buildCompleteWpPage = buildCompleteWpPage;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = exported;
}
`;

fs.writeFileSync(dstPath, core + wpToolsCode, 'utf8');
console.log('Successfully generated full bareun-detail-compiler.js, size:', (core + wpToolsCode).length);
