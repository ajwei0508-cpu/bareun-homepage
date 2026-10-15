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
    .replace(/src:\s*'((?:life_|bareun_|card_|detail_|gongjindan_)[^']+)'/g, "src: '" + ghBase + "$1'")
    .replace(/url\('((?:life_|bareun_|card_|detail_|gongjindan_)[^']+)'\)/g, "url('" + ghBase + "$1')")
    .replace(/load\('((?:life_|bareun_|card_|detail_|gongjindan_)[^']+)'/g, "load('" + ghBase + "$1'")
    .replace(/src="((?:life_|bareun_|card_|detail_|gongjindan_)[^"]+)"/g, 'src="' + ghBase + '$1"')
    .replace(/this\.src='((?:life_|bareun_|card_|detail_|gongjindan_)[^']+)'/g, "this.src='" + ghBase + "$1'")
    .replace(/bgImg\.src\s*=\s*'((?:life_|bareun_|card_|detail_|gongjindan_)[^']+)'/g, "bgImg.src = '" + ghBase + "$1'");
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
  ['hairloss.html', 'wordpress-hairloss.html'],
  ['gongjindan.html', 'wordpress-gongjindan.html']
];

detailPages.forEach(([srcFile, outFile]) => {
  const fullSrc = path.join(dir, srcFile);
  if (fs.existsSync(fullSrc)) {
    const raw = fs.readFileSync(fullSrc, 'utf8');
    const wpOut = rewriteAssetsForWP(raw);
    fs.writeFileSync(path.join(dir, outFile), wpOut, 'utf8');
    console.log('Successfully generated ' + outFile + ' (' + wpOut.length + ' bytes)');
  }
});
