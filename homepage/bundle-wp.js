const fs = require('fs');
const path = require('path');

const dir = __dirname;
const indexHtml = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
const story3d = fs.readFileSync(path.join(dir, 'story-3d.html'), 'utf8');

const wpReset = [
  '',
  '/* WORDPRESS & ASTRA THEME CONTAINER RESET */',
  '.entry-content, .ast-container, .site-content, article.page, .ast-plain-container,',
  '.elementor, .elementor-section-wrap, .wp-block-group {',
  '  padding: 0 !important;',
  '  margin: 0 !important;',
  '  max-width: 100% !important;',
  '  width: 100% !important;',
  '  overflow: visible !important;',
  '}',
  ''
].join('\n');

const ghBase = 'https://raw.githubusercontent.com/ajwei0508-cpu/bareun-homepage/main/homepage/';

function rewriteAssetsForWP(html) {
  return html
    .replace(/src:\s*'((?:ba_|illust_|life_|bareun_|card_|detail_|gongjindan_|growth-|growth_|empathy-|empathy_|efficacy-)[^']+)'/g, "src: '" + ghBase + "$1'")
    .replace(/before:\s*'((?:ba_|illust_|life_|bareun_|card_|detail_)[^']+)'/g, "before: '" + ghBase + "$1'")
    .replace(/after:\s*'((?:ba_|illust_|life_|bareun_|card_|detail_)[^']+)'/g, "after: '" + ghBase + "$1'")
    .replace(/beforeImg:\s*'((?:ba_|illust_|life_|bareun_|card_|detail_)[^']+)'/g, "beforeImg: '" + ghBase + "$1'")
    .replace(/afterImg:\s*'((?:ba_|illust_|life_|bareun_|card_|detail_)[^']+)'/g, "afterImg: '" + ghBase + "$1'")
    .replace(/"illustration":"(illust_[^"]+)"/g, '"illustration":"' + ghBase + '$1"')
    .replace(/"baBeforeImg":"(ba_[^"]+)"/g, '"baBeforeImg":"' + ghBase + '$1"')
    .replace(/"baAfterImg":"(ba_[^"]+)"/g, '"baAfterImg":"' + ghBase + '$1"')
    .replace(/setDecoderPath\('draco\/'\)/g, "setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/')")
    .replace(/load\('((?:models\/|texture\/|ba_|illust_|life_|bareun_|card_|detail_|gongjindan_|growth-|growth_|empathy-|empathy_|efficacy-)[^']+)'/g, "load('" + ghBase + "$1'")
    .replace(/file:\s*'((?:models\/|texture\/)[^']+)'/g, "file: '" + ghBase + "$1'")
    .replace(/url\('((?:ba_|illust_|life_|bareun_|card_|detail_|gongjindan_|growth-|growth_|empathy-|empathy_|efficacy-)[^']+)'\)/g, "url('" + ghBase + "$1')")
    .replace(/loadLinearTex\('((?:ba_|illust_|life_|bareun_|card_|detail_|gongjindan_|growth-|growth_|empathy-|empathy_|efficacy-)[^']+)'\)/g, "loadLinearTex('" + ghBase + "$1'")
    .replace(/src="((?:ba_|illust_|life_|bareun_|card_|detail_|gongjindan_|growth-|growth_|empathy-|empathy_|efficacy-)[^"]+)"/g, 'src="' + ghBase + '$1"')
    .replace(/poster="((?:ba_|illust_|life_|bareun_|card_|detail_|gongjindan_|growth-|growth_|empathy-|empathy_|efficacy-)[^"]+)"/g, 'poster="' + ghBase + '$1"')
    .replace(/data-frames="([^"]+)"/g, (match, p1) => {
      const rewritten = p1.split('|').map(f => f.startsWith('http') ? f : ghBase + f).join('|');
      return 'data-frames="' + rewritten + '"';
    });
}

let wpMain = rewriteAssetsForWP(indexHtml).replace('<style>', '<style>' + wpReset);
fs.writeFileSync(path.join(dir, 'wordpress-main-home.html'), wpMain, 'utf8');
console.log('Successfully generated wordpress-main-home.html (' + wpMain.length + ' bytes)');

let wpStory3d = rewriteAssetsForWP(story3d).replace('<style>', '<style>' + wpReset);
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
  ['body-explorer.html', 'wordpress-body-explorer.html']
];

detailPages.forEach(([srcFile, outFile]) => {
  const fullSrc = path.join(dir, srcFile);
  if (fs.existsSync(fullSrc)) {
    const raw = fs.readFileSync(fullSrc, 'utf8');
    const wpOut = rewriteAssetsForWP(raw).replace('<style>', '<style>' + wpReset);
    fs.writeFileSync(path.join(dir, outFile), wpOut, 'utf8');
    console.log('Successfully generated ' + outFile + ' (' + wpOut.length + ' bytes)');
  }
});
