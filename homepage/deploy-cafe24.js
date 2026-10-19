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
  { id: 46,  slug: '46-2',            title: '바른한의원 대전본점',             file: 'wordpress-main-home.html',       excerpt: '바른한의원 대전본점 — 안정위 대표원장의 심층 맥진과 국가공인 무독성 안심 한약. 실제 학술 논문 검수를 거친 검증된 사상체질·추나·성장·다이어트·탈모·공진단·전립선 맞춤 진료 클리닉' },
  { id: 125, slug: 'body-explorer',   title: '바른한의원 인체 질환 쇼룸',       file: 'wordpress-body-explorer.html',   excerpt: '인체모형으로 부위별 질환 원인과 실제 SCI급 학술 논문으로 검증된 한약·추나·홈케어·추천 식단을 한눈에 확인하세요.' },
  { id: 126, slug: 'director',        title: '안정위 대표원장',                 file: 'wordpress-director.html',        excerpt: '깊이 있는 맥진과 국가공인 무독성 검수 한약으로 병의 뿌리를 다스립니다. 실제 학술 논문으로 안전성과 기전이 검증된 치료법만을 시행합니다.' },
  { id: 127, slug: 'chuna',           title: '바른 추나 · 척추교정',            file: 'wordpress-chuna.html',           excerpt: '미국의학협회지(JAMA) 등 실제 학술 논문을 검수하여 유효성이 입증된 대표원장 수기 추나로 틀어진 척추·골반 중심축을 바로잡습니다.' },
  { id: 105, slug: 'growth',          title: '바른 성장 · 성조숙증',            file: 'wordpress-growth.html',          excerpt: '소아과학 및 약리학 학술 논문 검수를 통해 검증된 안전한 한약 처방으로 성장판 연골 증식과 호흡기 면역을 함께 깨웁니다.' },
  { id: 66,  slug: 'diet-zero',       title: '바른 다이어트 · 식욕ZERO',        file: 'wordpress-diet.html',            excerpt: '국제 비만·약리 학술 논문으로 검증된 갈색지방 대사 활성화 처방으로 무리한 절식 없이 내장지방을 건강하게 비워냅니다.' },
  { id: 130, slug: 'hairloss',            title: '바른 탈모 · 모근재생',            file: 'wordpress-hairloss.html',            excerpt: '피부과학 및 약리학 학술 논문으로 입증된 수승화강 청열 치료와 경추 추나로 두피 열독을 식히고 모유두세포 자생력을 깨웁니다.' },
  { id: 408, slug: 'hairloss-male',       title: '바른 남성탈모 · M자·정수리',      file: 'wordpress-hairloss-male.html',       excerpt: '호르몬 억제 약물 부작용 걱정 없는 수승화강 두피 청열과 경추 추나로 M자·정수리 남성탈모 모근 자생력을 깨웁니다.' },
  { id: 409, slug: 'hairloss-alopecia',   title: '바른 원형탈모 · 면역복원',        file: 'wordpress-hairloss-alopecia.html',   excerpt: '스테로이드 재발과 두피 함몰 걱정 없이 자율신경 안정과 자가면역 재조율로 동전 모양·다발성 원형탈모를 근본 치료합니다.' },
  { id: 410, slug: 'hairloss-female',     title: '바른 여성탈모 · 가르마·볼륨',     file: 'wordpress-hairloss-female.html',     excerpt: '두피는 뜨겁고 손발·아랫배는 찬 여성 상열하한(上熱下寒)과 혈허를 다스려 넓어진 가르마와 정수리 볼륨을 복원합니다.' },
  { id: 411, slug: 'hairloss-seborrheic', title: '바른 지루성두피염 · 열독해독',    file: 'wordpress-hairloss-seborrheic.html', excerpt: '반복되는 두피 홍반, 화농성 모낭염, 가려움과 각질을 청열해독 치료로 잠재우고 건강한 진피 장벽을 복원합니다.' },
  { id: 96,  slug: 'gongjindan-2',        title: '바른 황제공진단',                 file: 'wordpress-gongjindan.html',          excerpt: '국제 신경약리학 학술 논문으로 뇌신경 보호와 피로 회복 기전이 검증된 식약처 CITES 인증 정품 사향 황제공진단입니다.' },
  { id: 133, slug: 'prostate',            title: '바른 전립선 · 남성활력',          file: 'wordpress-prostate.html',            excerpt: '비뇨의학 및 약리학 학술 논문 검수로 입증된 전립선 울혈 감압 및 신장·방광 온양 치료로 시원한 배뇨와 숙면을 되찾아 드립니다.' },
  { id: 134, slug: 'lifting-compare',     title: '바른리프팅 시술 전후 윤곽진단',    file: 'wordpress-lifting-compare.html',     excerpt: '바른한의원 대전본점 학술 검증 비수술 한방 리프팅 전후 윤곽 비교 진단 시스템입니다.' }
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
        description: '안정위 대표원장의 심층 맥진과 학술 논문 검증 안심 한약 · 추나 · 성장 · 다이어트 · 탈모 · 공진단 · 전립선 맞춤 한의원'
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
