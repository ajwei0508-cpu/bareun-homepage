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

let wpMain = indexHtml
  .replace(/src:\s*'((?:life_|bareun_)[^']+)'/g, "src: '" + ghBase + "$1'")
  .replace('<style>', '<style>' + wpReset);

fs.writeFileSync(path.join(dir, 'wordpress-main-home.html'), wpMain, 'utf8');
console.log('Successfully generated wordpress-main-home.html (' + wpMain.length + ' bytes)');

let wpStory3d = story3d
  .replace(/src:\s*'((?:life_|bareun_)[^']+)'/g, "src: '" + ghBase + "$1'")
  .replace('<style>', '<style>' + wpReset);

fs.writeFileSync(path.join(dir, 'wordpress-story-3d.html'), wpStory3d, 'utf8');
console.log('Successfully generated wordpress-story-3d.html (' + wpStory3d.length + ' bytes)');
