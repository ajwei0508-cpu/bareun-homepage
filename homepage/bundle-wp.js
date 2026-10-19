const fs = require('fs');
const path = require('path');
const vm = require('vm');

const dir = __dirname;
const indexHtml = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
const story3d = fs.readFileSync(path.join(dir, 'story-3d.html'), 'utf8');

const wpReset = [
  '',
  '/* WORDPRESS & ASTRA THEME CONTAINER RESET */',
  '.site-header, .site-footer, #masthead, #colophon, .entry-header, .ast-breadcrumbs-wrapper { display: none !important; }',
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

function rewriteAssetsForWP(html, label) {
  let out = html
    .replace(/src:\s*'((?:ba_|illust_|life_|bareun_|card_|detail_|gongjindan_|growth-|growth_|empathy-|empathy_|efficacy-)[^']+)'/g, "src: '" + ghBase + "$1'")
    .replace(/before:\s*'((?:ba_|illust_|life_|bareun_|card_|detail_)[^']+)'/g, "before: '" + ghBase + "$1'")
    .replace(/after:\s*'((?:ba_|illust_|life_|bareun_|card_|detail_)[^']+)'/g, "after: '" + ghBase + "$1'")
    .replace(/beforeImg:\s*'((?:ba_|illust_|life_|bareun_|card_|detail_)[^']+)'/g, "beforeImg: '" + ghBase + "$1'")
    .replace(/afterImg:\s*'((?:ba_|illust_|life_|bareun_|card_|detail_)[^']+)'/g, "afterImg: '" + ghBase + "$1'")
    .replace(/"illustration":"(illust_[^"]+)"/g, '"illustration":"' + ghBase + '$1"')
    .replace(/"illustImg":"(illust_[^"]+)"/g, '"illustImg":"' + ghBase + '$1"')
    .replace(/"baBeforeImg":"(ba_[^"]+)"/g, '"baBeforeImg":"' + ghBase + '$1"')
    .replace(/"baAfterImg":"(ba_[^"]+)"/g, '"baAfterImg":"' + ghBase + '$1"')
    .replace(/setDecoderPath\('draco\/'\)/g, "setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/')")
    .replace(/load\('((?:models\/|texture\/|ba_|illust_|life_|bareun_|card_|detail_|gongjindan_|growth-|growth_|empathy-|empathy_|efficacy-)[^']+)'/g, "load('" + ghBase + "$1'")
    .replace(/file:\s*'((?:models\/|texture\/)[^']+)'/g, "file: '" + ghBase + "$1'")
    .replace(/url\('((?:ba_|illust_|life_|bareun_|card_|detail_|gongjindan_|growth-|growth_|empathy-|empathy_|efficacy-)[^']+)'\)/g, "url('" + ghBase + "$1')")
    .replace(/loadLinearTex\('((?:ba_|illust_|life_|bareun_|card_|detail_|gongjindan_|growth-|growth_|empathy-|empathy_|efficacy-)[^']+)'\)/g, "loadLinearTex('" + ghBase + "$1')")
    .replace(/src="((?:clinic-template-config\.js|ba_|illust_|life_|bareun_|card_|detail_|gongjindan_|growth-|growth_|empathy-|empathy_|efficacy-)[^"]+)"/g, 'src="' + ghBase + '$1"')
    .replace(/poster="((?:ba_|illust_|life_|bareun_|card_|detail_|gongjindan_|growth-|growth_|empathy-|empathy_|efficacy-)[^"]+)"/g, 'poster="' + ghBase + '$1"')
    .replace(/href="story-3d\.html(\?[^"]*)?"/g, 'href="/$1"')
    .replace(/href="index\.html(\?[^"]*)?"/g, 'href="/$1"')
    .replace(/href="(body-explorer|director|chuna|growth|diet-zero|hairloss|prostate|lifting-compare)\.html(\?[^"]*)?"/g, 'href="/$1/$2"')
    .replace(/href="gongjindan\.html(\?[^"]*)?"/g, 'href="/gongjindan-2/$1"')
    .replace(/data-link="(body-explorer|director|chuna|growth|diet-zero|hairloss|prostate|lifting-compare)\.html(\?[^"]*)?"/g, 'data-link="/$1/$2"')
    .replace(/data-link="gongjindan\.html(\?[^"]*)?"/g, 'data-link="/gongjindan-2/$1"')
    .replace(/data-href="(body-explorer|director|chuna|growth|diet-zero|hairloss|prostate|lifting-compare)\.html(\?[^"]*)?"/g, 'data-href="/$1/$2"')
    .replace(/data-href="gongjindan\.html(\?[^"]*)?"/g, 'data-href="/gongjindan-2/$1"')
    .replace(/href:\s*'(body-explorer|director|chuna|growth|diet-zero|hairloss|prostate|lifting-compare)\.html(\?[^']*)?'/g, "href: '/$1/$2'")
    .replace(/href:\s*'gongjindan\.html(\?[^']*)?'/g, "href: '/gongjindan-2/$1'")
    .replace(/href\s*=\s*'(body-explorer|director|chuna|growth|diet-zero|hairloss|prostate|lifting-compare)\.html(\?[^']*)?'/g, "href = '/$1/$2'")
    .replace(/'body-explorer\.html\?part='/g, "'/body-explorer/?part='")
    .replace(/"clinicLink":"(director|chuna|growth|diet-zero|hairloss|prostate)\.html"/g, '"clinicLink":"/$1/"')
    .replace(/"clinicLink":"gongjindan\.html"/g, '"clinicLink":"/gongjindan-2/"')
    .replace(/"ctaHref":"(director|chuna|growth|diet-zero|hairloss|prostate)\.html"/g, '"ctaHref":"/$1/"')
    .replace(/"ctaHref":"gongjindan\.html"/g, '"ctaHref":"/gongjindan-2/"')
    .replace(/data-frames="([^"]+)"/g, (match, p1) => {
      const rewritten = p1.split('|').map(f => f.startsWith('http') ? f : ghBase + f).join('|');
      return 'data-frames="' + rewritten + '"';
    });

  // Protect inline executable <script> blocks against WordPress wptexturize / wpautop (which corrupts `< ... && ... >` into `&#038;&#038;`)
  out = out.replace(/<script(?![^>]*\bsrc=)(?![^>]*type=["']importmap["'])([^>]*)>([\s\S]*?)<\/script>/gi, (full, attrs, jsCode) => {
    const trimmed = jsCode.trim();
    if (!trimmed) return full;
    // Validate syntax at build time!
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

let wpMain = rewriteAssetsForWP(indexHtml, 'wordpress-main-home.html').replace('<style>', '<style>' + wpReset);
fs.writeFileSync(path.join(dir, 'wordpress-main-home.html'), wpMain, 'utf8');
console.log('Successfully generated wordpress-main-home.html (' + wpMain.length + ' bytes)');

let wpStory3d = rewriteAssetsForWP(story3d, 'wordpress-story-3d.html').replace('<style>', '<style>' + wpReset);
fs.writeFileSync(path.join(dir, 'wordpress-story-3d.html'), wpStory3d, 'utf8');
console.log('Successfully generated wordpress-story-3d.html (' + wpStory3d.length + ' bytes)');

const detailPages = [
  ['director.html', 'wordpress-director.html'],
  ['chuna.html', 'wordpress-chuna.html'],
  ['growth.html', 'wordpress-growth.html'],
  ['diet-zero.html', 'wordpress-diet.html'],
  ['hairloss.html', 'wordpress-hairloss.html'],
  ['gongjindan.html', 'wordpress-gongjindan.html'],
  ['prostate.html', 'wordpress-prostate.html'],
  ['body-explorer.html', 'wordpress-body-explorer.html'],
  ['lifting-compare.html', 'wordpress-lifting-compare.html']
];

detailPages.forEach(([srcFile, outFile]) => {
  const fullSrc = path.join(dir, srcFile);
  if (fs.existsSync(fullSrc)) {
    const raw = fs.readFileSync(fullSrc, 'utf8');
    const wpOut = rewriteAssetsForWP(raw, outFile).replace('<style>', '<style>' + wpReset);
    fs.writeFileSync(path.join(dir, outFile), wpOut, 'utf8');
    console.log('Successfully generated ' + outFile + ' (' + wpOut.length + ' bytes)');
  }
});
