/**
 * B2B 상세페이지(/b2b/) 및 작동 샘플(/sample/) 완전 독립 빌드·배포 스크립트
 * - 한의원 공식 홈페이지(www.bareunhaniwon.com)의 SEO/GEO/RSS/사이트맵/번들/배포와 100% 절단·격리됨
 * - 항상 <meta name="robots" content="noindex, nofollow"> 고정 (검색엔진 색인 및 RSS/사이트맵 절대 제외)
 * - 사용법: node b2b-standalone/bundle-and-deploy-b2b.js [--deploy]
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const homepageDir = path.resolve(__dirname, '..');
const ghBase = 'https://raw.githubusercontent.com/ajwei0508-cpu/bareun-homepage/main/homepage/';

const B2B_PAGES = [
  { src: 'b2b-landing.html', wpFile: 'wordpress-b2b-landing.html', slug: 'b2b', title: '한의원 하이엔드 홈페이지 솔루션 (스탠다드·프로·시그니처)' },
  { src: 'sample.html',      wpFile: 'wordpress-sample.html',      slug: 'sample', title: '바른한의원 실제 홈페이지 작동 샘플 (티어 마크)' }
];

function ensureNoindexHead(html) {
  let out = html.replace(/<meta\s+name=["']robots["'][^>]*>/gi, '');
  out = out.replace(/<script\s+type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, '');
  out = out.replace(/<section\s+id=["']bareun-geo-ssr-top-dossier["'][\s\S]*?<\/section>\s*/gi, '');
  return out.replace(/<head([^>]*)>/i, '<head$1>\n  <meta name="robots" content="noindex, nofollow">');
}

function bundleB2bPage(srcPath) {
  let html = fs.readFileSync(srcPath, 'utf8');
  html = ensureNoindexHead(html);
  fs.writeFileSync(srcPath, html, 'utf8');

  const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  const bodyMatch = html.match(/<body([^>]*)>([\s\S]*?)<\/body>/i);
  if (!headMatch || !bodyMatch) return html;

  const headInner = headMatch[1];
  const bodyInner = bodyMatch[2];
  const parts = [];
  for (const lnk of (headInner.match(/<link\b[^>]*>/gi) || [])) {
    if (/\brel\s*=\s*["'](?:preconnect|stylesheet)["']/i.test(lnk)) parts.push(lnk);
  }
  const wpReset = '.site-header,.site-footer,#masthead,#colophon,.entry-header,.ast-breadcrumbs-wrapper{display:none!important;}#page,#content,#primary,#main,.entry-content,.ast-container{padding:0!important;margin:0!important;max-width:100vw!important;width:100%!important;}';
  const styles = headInner.match(/<style\b[^>]*>[\s\S]*?<\/style>/gi) || [];
  if (styles.length) {
    parts.push(styles[0].replace(/<style([^>]*)>/i, `<style$1>${wpReset}\n`));
    parts.push(...styles.slice(1));
  } else {
    parts.push(`<style>${wpReset}</style>`);
  }

  let wpOut = parts.join('\n') + '\n' + bodyInner;
  wpOut = wpOut.replace(/(src|data-src|poster)="(b2b-assets\/[^"]+)"/g, (_, a, p) => `${a}="${ghBase}${p}"`);
  wpOut = wpOut.replace(/<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/gi, (full, attrs, jsCode) => {
    const trimmed = jsCode.trim();
    if (!trimmed) return full;
    new vm.Script(trimmed);
    const b64 = Buffer.from(trimmed, 'utf8').toString('base64');
    return `<script>(0,eval)(new TextDecoder().decode(Uint8Array.from(atob("${b64}"),function(c){return c.charCodeAt(0)})));</script>`;
  });
  return wpOut;
}

for (const item of B2B_PAGES) {
  const srcPath = path.join(homepageDir, item.src);
  if (!fs.existsSync(srcPath)) continue;
  const wpOut = bundleB2bPage(srcPath);
  fs.writeFileSync(path.join(homepageDir, item.wpFile), wpOut, 'utf8');
  console.log(`[B2B-STANDALONE] Bundled ${item.wpFile} (${wpOut.length} bytes, noindex/nofollow enforced)`);
}
