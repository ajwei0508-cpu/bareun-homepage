const fs = require('fs');
const path = require('path');

const dir = __dirname;
const ghBase = 'https://raw.githubusercontent.com/ajwei0508-cpu/bareun-homepage/main/homepage/';

// 1. Create clean luxury SVG favicon (bareun-favicon.svg) in 5-color brand palette
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="116" fill="#2D5A43"/>
  <rect x="22" y="22" width="468" height="468" rx="96" fill="none" stroke="#F5F1E8" stroke-width="6" stroke-opacity="0.45"/>
  <circle cx="256" cy="128" r="14" fill="#F5F1E8"/>
  <text x="256" y="295" text-anchor="middle" fill="#F5F1E8" font-family="'Noto Serif KR', 'Batang', serif" font-size="168" font-weight="900" letter-spacing="-4">바른</text>
  <text x="256" y="392" text-anchor="middle" fill="#E6DEC8" font-family="'Pretendard', 'Malgun Gothic', sans-serif" font-size="44" font-weight="700" letter-spacing="6">바른한의원</text>
</svg>`;
fs.writeFileSync(path.join(dir, 'bareun-favicon.svg'), faviconSvg, 'utf8');

const seoMetaBlock = `  <meta name="description" content="바른한의원 대전본점 — 안정위 대표원장의 15분 심층 진맥과 320종 무독성 안심 한약. 사상체질·추나 척추교정·소아 키성장·식욕ZERO 다이어트·두피열 탈모·황제공진단·전립선 1:1 맞춤 진료 클리닉">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="바른한의원 대전본점">
  <meta property="og:title" content="바른한의원 대전본점 — 1:1 사상체질 · 추나 · 성장 · 다이어트 · 탈모 · 공진단">
  <meta property="og:description" content="안정위 대표원장의 15분 심층 진맥과 320종 무독성 안심 한약으로 병의 뿌리를 다스리는 바른한의원 대전본점입니다.">
  <meta property="og:image" content="${ghBase}card_1_director.jpg">
  <meta property="og:url" content="https://www.bareunhaniwon.com/">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="바른한의원 대전본점">
  <meta name="twitter:description" content="안정위 대표원장의 15분 심층 진맥과 320종 무독성 안심 한약. 추나·성장·다이어트·탈모·공진단·전립선 1:1 맞춤 진료">
  <meta name="twitter:image" content="${ghBase}card_1_director.jpg">
  <link rel="icon" type="image/svg+xml" href="${ghBase}bareun-favicon.svg">
  <link rel="apple-touch-icon" href="${ghBase}card_1_director.jpg">`;

// 2. Replace framerusercontent.com icon & "간절한 기다림" initial h1 across HTML files
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html') && !f.startsWith('wordpress-'));

for (const file of htmlFiles) {
  const fullPath = path.join(dir, file);
  let content = fs.readFileSync(fullPath, 'utf8');
  let changed = false;

  if (content.includes('framerusercontent.com/images/T9Y2v9h5BFE7g3Jmw9iWd4WngyQ.svg')) {
    content = content.replace(
      /<link\s+rel=["']icon["']\s+href=["']https:\/\/framerusercontent\.com\/images\/T9Y2v9h5BFE7g3Jmw9iWd4WngyQ\.svg["']\s*>/g,
      seoMetaBlock.trim()
    );
    changed = true;
  }

  if (content.includes('<h1 class="dialogue-main-quote" id="dialogue-main-quote">간절한 기다림</h1>')) {
    content = content.replace(
      '<h1 class="dialogue-main-quote" id="dialogue-main-quote">간절한 기다림</h1>',
      '<h1 class="dialogue-main-quote" id="dialogue-main-quote">바른한의원 대전본점</h1>'
    );
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log('Updated SEO & icon in:', file);
  }
}
