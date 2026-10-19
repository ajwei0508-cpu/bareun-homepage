const fs = require('fs');
const path = require('path');
const os = require('os');

function loadPuppeteer() {
  const candidates = [
    'puppeteer-core',
    path.join(__dirname, 'node_modules', 'puppeteer-core'),
    path.join(os.homedir(), '.gemini', 'antigravity', 'brain', 'dc8bc7cf-ae20-4c7f-ae8d-82394c2bbc64', 'scratch', 'node_modules', 'puppeteer-core'),
    path.join(os.homedir(), '.gemini', 'antigravity', 'brain', 'c3430dcf-0c08-41eb-8e46-6f7a8809cff3', 'scratch', 'node_modules', 'puppeteer-core')
  ];
  const brainDir = path.join(os.homedir(), '.gemini', 'antigravity', 'brain');
  if (fs.existsSync(brainDir)) {
    for (const sub of fs.readdirSync(brainDir)) {
      candidates.push(path.join(brainDir, sub, 'scratch', 'node_modules', 'puppeteer-core'));
    }
  }
  for (const c of candidates) {
    try { return require(c); } catch (e) {}
  }
  throw new Error('puppeteer-core not found');
}
const puppeteer = loadPuppeteer();

const PAGES_TO_DEPLOY = [
  { id: 46,  slug: '46-2',            title: '바른한의원 대전본점',             file: 'wordpress-main-home.html',       excerpt: '바른한의원 대전본점 — 안정위 대표원장의 15분 심층 진맥과 320종 무독성 안심 한약. 사상체질·추나 척추교정·소아 키성장·식욕ZERO 다이어트·두피열 탈모·황제공진단·전립선 1:1 맞춤 진료 클리닉' },
  { id: 125, slug: 'body-explorer',   title: '바른한의원 3D 질환 쇼룸',         file: 'wordpress-body-explorer.html',   excerpt: '360° 3D 인체모형으로 부위별 통증 원인과 맞춤 한약·추나·홈케어·추천 식단·SCI 논문을 한눈에 확인하세요.' },
  { id: 126, slug: 'director',        title: '안정위 대표원장',                 file: 'wordpress-director.html',        excerpt: '공장식 3분 진료를 넘어, 15분 심층 진맥과 320종 무독성 맞춤 한약으로 병의 뿌리를 다스립니다.' },
  { id: 127, slug: 'chuna',           title: '바른 추나 · 척추교정',            file: 'wordpress-chuna.html',           excerpt: '진통제로 통증만 가리지 않고, 원장 1:1 수기 추나로 틀어진 척추·골반 중심축을 바로잡습니다.' },
  { id: 105, slug: 'growth',          title: '바른 성장 · 성조숙증',            file: 'wordpress-growth.html',          excerpt: '성호르몬 조기 과항진을 안전하게 늦추고 성장판 연골 증식을 깨워 숨은 10cm를 찾아줍니다.' },
  { id: 66,  slug: 'diet-zero',       title: '바른 다이어트 · 식욕ZERO',        file: 'wordpress-diet.html',            excerpt: '무작정 굶는 요요를 끊어내고, 차갑게 꺼진 복부 대사 화로를 깨워 내장지방부터 태워냅니다.' },
  { id: 130, slug: 'hairloss',        title: '바른 탈모 · 모근재생',            file: 'wordpress-hairloss.html',        excerpt: '머리로 치솟은 42°C 두피열을 36.5°C로 식히고 모유두세포에 영양을 직달해 모근을 되살립니다.' },
  { id: 96,  slug: 'gongjindan-2',    title: '바른 황제공진단',                 file: 'wordpress-gongjindan.html',      excerpt: '식약처 CITES 인증 100% 정품 사향과 원장 수제 조제로 방전된 뇌·심장 원기를 즉각 복원합니다.' },
  { id: 133, slug: 'prostate',        title: '바른 전립선 · 남성활력',          file: 'wordpress-prostate.html',        excerpt: '골반 울혈로 부어오른 전립선을 감압하고 차가운 방광을 데워 통잠과 남성 활력을 되찾아 드립니다.' },
  { id: 134, slug: 'lifting-compare', title: '바른리프팅 시술 전후 윤곽진단',    file: 'wordpress-lifting-compare.html', excerpt: '바른한의원 대전본점 비수술 한방 리프팅 전후 3D 윤곽 비교 진단 시스템입니다.' }
];

(async () => {
  let browser;
  try {
    browser = await puppeteer.launch({
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-blink-features=AutomationControlled']
    });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36');

    console.log('1) Logging in to https://bareunhaniwon.com/wp-login.php ...');
    await page.goto('https://bareunhaniwon.com/wp-login.php', { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.type('#user_login', 'wealthywei0508');
    await page.type('#user_pass', 'A50tkf100djrA!');
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 20000 }).catch(() => {}),
      page.click('#wp-submit')
    ]);
    console.log('   Logged in ->', page.url());

    console.log('2) Fetching WP REST Nonce from Gutenberg editor ...');
    await page.goto('https://bareunhaniwon.com/wp-admin/post-new.php?post_type=page', { waitUntil: 'domcontentloaded', timeout: 20000 });
    const nonce = await page.evaluate(() => {
      if (window.wpApiSettings && window.wpApiSettings.nonce) return window.wpApiSettings.nonce;
      const html = document.documentElement.innerHTML;
      const m = html.match(/"nonce":"([a-f0-9]+)"/);
      return m ? m[1] : null;
    });
    if (!nonce) throw new Error('Failed to get WP REST Nonce');
    console.log('   REST Nonce ->', nonce);

    // 2.5) Upload official 512x512 Brand Icon PNG & set WordPress Site Icon + Tagline + Featured Image
    console.log('2.5) Configuring Official Brand Site Icon (Favicon) & SEO Tagline in WordPress ...');
    const brandConfigRes = await page.evaluate(async (wpNonce) => {
      // Check if bareun-brand-icon-512.png already exists in media library
      const mediaSearch = await (await fetch('/wp-json/wp/v2/media?search=bareun-brand-icon-512', {
        headers: { 'X-WP-Nonce': wpNonce }
      })).json();
      let iconMediaId = Array.isArray(mediaSearch) && mediaSearch.length > 0 ? mediaSearch[0].id : 0;

      if (!iconMediaId) {
        // Render 512x512 luxury brand emblem on canvas (Deep Green #2D5A43 + Warm Beige #F5F1E8 + Brown border)
        const c = document.createElement('canvas');
        c.width = 512;
        c.height = 512;
        const ctx = c.getContext('2d');
        // Background rounded rect
        ctx.fillStyle = '#2D5A43';
        ctx.beginPath();
        ctx.roundRect(0, 0, 512, 512, 112);
        ctx.fill();
        // Inner border
        ctx.strokeStyle = 'rgba(245, 241, 232, 0.55)';
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.roundRect(24, 24, 464, 464, 92);
        ctx.stroke();
        // Top seal dot
        ctx.fillStyle = '#F5F1E8';
        ctx.beginPath();
        ctx.arc(256, 118, 13, 0, Math.PI * 2);
        ctx.fill();
        // Main typography
        ctx.fillStyle = '#F5F1E8';
        ctx.textAlign = 'center';
        ctx.font = '900 162px serif';
        ctx.fillText('바른', 256, 294);
        ctx.fillStyle = '#E6DEC8';
        ctx.font = '700 44px sans-serif';
        ctx.fillText('바른한의원', 256, 392);

        const blob = await new Promise(res => c.toBlob(res, 'image/png'));
        const upRes = await fetch('/wp-json/wp/v2/media', {
          method: 'POST',
          headers: {
            'X-WP-Nonce': wpNonce,
            'Content-Type': 'image/png',
            'Content-Disposition': 'attachment; filename="bareun-brand-icon-512.png"'
          },
          body: blob
        });
        const upJson = await upRes.json();
        if (upJson && upJson.id) iconMediaId = upJson.id;
      }

      // Update WordPress General Settings (title, description, site_icon)
      const settingsBody = {
        title: '바른한의원 대전본점',
        description: '안정위 대표원장의 15분 심층 진맥과 320종 무독성 안심 한약 · 추나 · 성장 · 다이어트 · 탈모 · 공진단 · 전립선 1:1 맞춤 한의원'
      };
      if (iconMediaId) {
        settingsBody.site_icon = iconMediaId;
      }
      const setRes = await fetch('/wp-json/wp/v2/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-WP-Nonce': wpNonce
        },
        body: JSON.stringify(settingsBody)
      });
      const setJson = await setRes.json();
      return {
        iconMediaId,
        site_icon: setJson.site_icon,
        description: setJson.description
      };
    }, nonce);
    console.log('   Brand Icon & Tagline updated ->', brandConfigRes);

    // Get existing pages & reference meta from page 46
    const existingInfo = await page.evaluate(async (wpNonce) => {
      const r1 = await fetch('/wp-json/wp/v2/pages?per_page=100', { headers: { 'X-WP-Nonce': wpNonce } });
      const list = await r1.json();
      const ref46Res = await fetch('/wp-json/wp/v2/pages/46?context=edit', { headers: { 'X-WP-Nonce': wpNonce } });
      const ref46 = await ref46Res.json();
      return {
        pages: Array.isArray(list) ? list.map(p => ({ id: p.id, slug: p.slug, link: p.link })) : [],
        refMeta: ref46 && ref46.meta ? ref46.meta : {},
        refTemplate: ref46 && ref46.template ? ref46.template : ''
      };
    }, nonce);

    console.log('   Existing pages count:', existingInfo.pages.length);

    for (const item of PAGES_TO_DEPLOY) {
      const filePath = path.join(__dirname, item.file);
      if (!fs.existsSync(filePath)) {
        console.log('   [SKIP] Missing local file:', item.file);
        continue;
      }
      const rawHtml = fs.readFileSync(filePath, 'utf8');
      const blockContent = '<!-- wp:html -->\n' + rawHtml + '\n<!-- /wp:html -->';

      let targetId = item.id;
      if (!targetId) {
        const found = existingInfo.pages.find(p => p.slug === item.slug);
        if (found) targetId = found.id;
      }

      const res = await page.evaluate(async ({ wpNonce, id, slug, title, excerpt, featuredMedia, content, meta, template }) => {
        const endpoint = id ? ('/wp-json/wp/v2/pages/' + id) : '/wp-json/wp/v2/pages';
        const bodyObj = {
          title: title,
          slug: slug,
          status: 'publish',
          excerpt: excerpt || '',
          content: content,
          template: template || ''
        };
        if (featuredMedia) {
          bodyObj.featured_media = featuredMedia;
        }
        if (meta && Object.keys(meta).length > 0) {
          bodyObj.meta = meta;
        }
        const r = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-WP-Nonce': wpNonce
          },
          body: JSON.stringify(bodyObj)
        });
        const j = await r.json();
        return { status: r.status, id: j.id, slug: j.slug, link: j.link, err: j.message };
      }, {
        wpNonce: nonce,
        id: targetId,
        slug: item.slug,
        title: item.title,
        excerpt: item.excerpt,
        featuredMedia: 51, // ID 51 = doctor.png (대표원장 프로필/공식 대표 이미지)
        content: blockContent,
        meta: existingInfo.refMeta,
        template: existingInfo.refTemplate
      });

      console.log(`   [DEPLOYED] ${item.slug.padEnd(16)} -> status ${res.status} | ID: ${res.id} | URL: ${res.link || res.err}`);
    }

    // 3) Flush WP Super Cache safely via DOM evaluate
    console.log('3) Clearing WP Super Cache ...');
    await page.goto('https://bareunhaniwon.com/wp-admin/options-general.php?page=wpsupercache', { waitUntil: 'domcontentloaded', timeout: 15000 }).catch(() => {});
    await page.evaluate(() => {
      const btn = document.querySelector('input[name="wp_delete_cache"], button[name="wp_delete_cache"]');
      if (btn && btn.form) btn.form.submit();
    }).catch(() => {});
    await new Promise(r => setTimeout(r, 1500));

    console.log('✅ ALL PAGES DEPLOYED TO https://www.bareunhaniwon.com/ !');
  } catch (err) {
    console.error('[DEPLOY ERROR]', err);
    process.exitCode = 1;
  } finally {
    if (browser) {
      await browser.close().catch(() => {});
    }
    process.exit(process.exitCode || 0);
  }
})();
