const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const styleCss = fs.readFileSync(path.join(__dirname, 'style.css'), 'utf8');
const termsJs = fs.readFileSync(path.join(__dirname, 'terms.js'), 'utf8');
const appJs = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');

const wpReset = `
/* WORDPRESS & ASTRA THEME CONTAINER RESET */
.entry-content, .ast-container, .site-content, article.page, .ast-plain-container,
.elementor, .elementor-section-wrap, .wp-block-group {
  padding: 0 !important;
  margin: 0 !important;
  max-width: 100% !important;
  width: 100% !important;
}
`;

let wpHtml = indexHtml;
wpHtml = wpHtml.replace(
  '<link rel="stylesheet" href="style.css">',
  '<style>\n' + wpReset + '\n' + styleCss + '\n</style>'
);

wpHtml = wpHtml.replace(
  '<script src="terms.js"></script>',
  '<script>\n' + termsJs + '\n</script>'
);

wpHtml = wpHtml.replace(
  '<script src="app.js"></script>',
  '<script>\n' + appJs + '\n</script>'
);

fs.writeFileSync(path.join(__dirname, 'wordpress-main-home.html'), wpHtml, 'utf8');
console.log('Successfully generated wordpress-main-home.html with size:', wpHtml.length, 'bytes');
