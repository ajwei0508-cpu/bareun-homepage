const fs = require('fs');
const path = require('path');
const os = require('os');
const https = require('https');
const { execFileSync } = require('child_process');
const {
  DISEASE_BLOG_CATEGORIES,
  FLAGSHIP_REPRESENTATIVE_POST,
  buildStandaloneWpPostHtml
} = require('./disease-blog-seed-data.js');

function loadPuppeteer() {
  const candidates = [
    path.join(__dirname, '..', '..', 'wealthywei', 'node_modules', 'puppeteer-core'),
    'puppeteer-core',
    path.join(__dirname, 'node_modules', 'puppeteer-core')
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

const CANONICAL_ORIGIN = 'https://www.bareunhaniwon.com';

const PAGES_TO_DEPLOY = [
  { id: 46,   slug: 'home',                title: '바른한의원 대전본점',                                     file: 'wordpress-main-home.html',           excerpt: '정수리여성남성원형탈모병원치료성장클리닉성장판검사두통탈모약비대면성조숙증키성장담적축농증리프팅다이어트뱃살내장지방위염난임산후보약공진단대전진맥피부' },
  { id: 125,  slug: 'body-explorer',       title: '3D 인체모형 · 바른한의원 진료 살펴보기',                   file: 'wordpress-body-explorer.html',       excerpt: '풀스크린 3D 인체모형으로 근육·신경·관절·혈관 구조와 9대 부위별 생활 건강 관리법, 해외 SCI 의학 논문 요약을 한눈에 탐색하는 인터랙티브 건강 포털입니다.' },
  { id: null, slug: 'ask-doctor',          title: '의학 인사이트 블로그 & 질환별 1:1 비공개 Q&A',              file: 'wordpress-ask-doctor.html',          excerpt: '해외 메이저 의학 학술지(Nature Medicine, NEJM, The Lancet, JAMA) 및 통합생리학 기반 대표 의학 칼럼과 회원 전용 질환별 1:1 비공개 Q&A 센터입니다.' },
  { id: 126,  slug: 'director',            title: '안정위 대표원장 · 9대 정밀검진',                           file: 'wordpress-director.html',            excerpt: '초음파·체열진단·이비인후 내시경·사상체질·체지방·자율신경·간/당 수치·혈관·성장 검사까지 9대 정밀 검진 시스템을 운영합니다.' },
  { id: 127,  slug: 'chuna',               title: '바른 추나 · 척추교정',                                    file: 'wordpress-chuna.html',               excerpt: 'The Lancet · JAMA 등 국제 학술 논문을 검수하여 유효성이 입증된 비수술 추나로 틀어진 척추·골반 중심축을 바로잡습니다.' },
  { id: 105,  slug: 'growth',              title: '바른 성장 · 성조숙증',                                    file: 'wordpress-growth.html',              excerpt: '소아내분비학 및 약리학 학술 논문 근거를 바탕으로 성장판 연골 증식과 호흡기 면역을 함께 돌봅니다.' },
  { id: 66,   slug: 'diet-zero',           title: '바른 다이어트 · 식욕ZERO',                                file: 'wordpress-diet.html',                excerpt: '갈색지방 열생산 및 대사 생리학 연구를 바탕으로 무리한 절식 없이 내장지방을 건강하게 비워냅니다.' },
  { id: 130,  slug: 'hairloss',            title: '바른 탈모 · 모근재생',                                    file: 'wordpress-hairloss.html',            excerpt: '수승화강 두피 열조절과 경추 순환 개선으로 모유두 세포 미세혈류와 모근 자생력을 회복합니다.' },
  { id: 408,  slug: 'hairloss-male',       title: '바른 남성탈모 · M자·정수리',                              file: 'wordpress-hairloss-male.html',       excerpt: '호르몬 억제 부담 없는 두피 청열과 경추 추나로 M자·정수리 남성탈모 모근 자생력을 깨웁니다.' },
  { id: 409,  slug: 'hairloss-alopecia',   title: '바른 원형탈모 · 면역복원',                                file: 'wordpress-hairloss-alopecia.html',   excerpt: '자율신경 안정과 모낭 주위 자가면역 균형 회복으로 동전 모양·다발성 원형탈모를 케어합니다.' },
  { id: 410,  slug: 'hairloss-female',     title: '바른 여성탈모 · 가르마·볼륨',                             file: 'wordpress-hairloss-female.html',     excerpt: '여성 상열하한(上熱下寒)과 영양 불균형을 다스려 넓어진 가르마와 정수리 볼륨을 복원합니다.' },
  { id: 411,  slug: 'hairloss-seborrheic', title: '바른 지루성두피염 · 열독해독',                            file: 'wordpress-hairloss-seborrheic.html', excerpt: '반복되는 두피 홍반, 모낭염, 가려움과 각질을 청열해독 케어로 진정시키고 건강한 진피 장벽을 복원합니다.' },
  { id: 96,   slug: 'gongjindan',          title: '바른 황제공진단',                                         file: 'wordpress-gongjindan.html',          excerpt: '신경약리학 학술 논문으로 뇌신경 보호와 피로 회복 기전이 보고된 식약처 CITES 인증 정품 사향 황제공진단입니다.' },
  { id: 133,  slug: 'prostate',            title: '바른 전립선 · 남성활력',                                  file: 'wordpress-prostate.html',            excerpt: '전립선 울혈 감압 및 방광·골반저근 기능 강화로 야간뇨 없는 편안한 배뇨와 숙면을 돕습니다.' },
  { id: 134,  slug: 'lifting-compare',     title: '바른리프팅 시술 전후 윤곽진단',                            file: 'wordpress-lifting-compare.html',     excerpt: '비수술 한방 리프팅 전후 윤곽 비교 진단 시스템입니다.' }
];

function pingIndexNow(urls) {
  return new Promise((resolve) => {
    try {
      const payload = JSON.stringify({
        host: 'www.bareunhaniwon.com',
        key: 'bareunhaniwon2026aiseokey849201',
        keyLocation: 'https://www.bareunhaniwon.com/bareunhaniwon2026aiseokey849201.txt',
        urlList: urls.slice(0, 100)
      });
      const req = https.request({
        hostname: 'api.indexnow.org',
        port: 443,
        path: '/indexnow',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Length': Buffer.byteLength(payload)
        }
      }, (res) => {
        res.resume();
        resolve(res.statusCode);
      });
      req.on('error', () => resolve(0));
      req.write(payload);
      req.end();
    } catch (e) {
      resolve(0);
    }
  });
}

function warmUrlOnce(url) {
  return new Promise((resolve) => {
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      },
      timeout: 15000
    }, (res) => {
      res.resume();
      res.on('end', () => resolve(res.statusCode));
    });
    req.on('error', () => resolve(0));
    req.on('timeout', () => { req.destroy(); resolve(0); });
  });
}

async function performWpLogin(page, loginUrl) {
  await page.goto(loginUrl, { waitUntil: 'networkidle2', timeout: 30000 });
  for (let attempt = 1; attempt <= 2; attempt++) {
    if (!page.url().includes('wp-login.php')) break;
    const confirmBtn = await page.$('#correct-admin-email');
    if (confirmBtn) {
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 20000 }).catch(() => {}),
        confirmBtn.click()
      ]);
      break;
    }
    await page.waitForSelector('#user_login', { timeout: 15000 });
    await page.evaluate(() => {
      const u = document.getElementById('user_login');
      const p = document.getElementById('user_pass');
      if (u) u.value = '';
      if (p) p.value = '';
    });
    await page.type('#user_login', 'wealthywei0508', { delay: 20 });
    await page.type('#user_pass', 'A50tkf100djrA!', { delay: 20 });
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 25000 }).catch(() => {}),
      page.click('#wp-submit')
    ]);
  }
}

(async () => {
  let browser;
  try {
    // Ensure plugin zip is freshly built
    const zipBuildScript = path.join(__dirname, 'wp-plugin', 'build-plugin-zip.js');
    if (fs.existsSync(zipBuildScript)) {
      execFileSync(process.execPath, [zipBuildScript], { stdio: 'inherit' });
    }

    browser = await puppeteer.launch({
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-blink-features=AutomationControlled']
    });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36');

    console.log('1) Logging in to WordPress Admin ...');
    await performWpLogin(page, `${CANONICAL_ORIGIN}/wp-login.php`);
    if (page.url().includes('wp-login.php')) {
      await performWpLogin(page, 'https://bareunhaniwon.com/wp-login.php');
    }
    console.log('   Initial login ->', page.url());

    // 1.2) Ensure WordPress General Settings siteurl & home are unified to https://www.bareunhaniwon.com + Asia/Seoul
    const currentOrigin = new URL(page.url()).origin;
    await page.goto(`${currentOrigin}/wp-admin/options-general.php`, { waitUntil: 'domcontentloaded', timeout: 25000 });
    const migratedUrls = await page.evaluate((targetOrigin) => {
      const siteurlEl = document.getElementById('siteurl');
      const homeEl = document.getElementById('home');
      const tzEl = document.getElementById('timezone_string');
      const blogPublicEl = document.getElementById('blog_public');
      let changed = false;
      if (siteurlEl && siteurlEl.value !== targetOrigin) {
        siteurlEl.value = targetOrigin;
        changed = true;
      }
      if (homeEl && homeEl.value !== targetOrigin) {
        homeEl.value = targetOrigin;
        changed = true;
      }
      if (tzEl && tzEl.value !== 'Asia/Seoul') {
        tzEl.value = 'Asia/Seoul';
        changed = true;
      }
      if (blogPublicEl && blogPublicEl.checked) {
        blogPublicEl.checked = false; // Ensure search engine indexing is NEVER discouraged
        changed = true;
      }
      return changed;
    }, CANONICAL_ORIGIN);

    if (migratedUrls) {
      console.log('1.2) Migrating WordPress siteurl & home -> https://www.bareunhaniwon.com (Asia/Seoul) ...');
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 25000 }).catch(() => {}),
        page.click('#submit')
      ]);
      await performWpLogin(page, `${CANONICAL_ORIGIN}/wp-login.php`);
      console.log('   Re-authenticated on canonical www ->', page.url());
    } else {
      console.log('1.2) WordPress siteurl & home already unified on https://www.bareunhaniwon.com');
    }

    // 1.5) Sync & Activate Bareun Member Auth, Private QnA & Master SEO Engine via WPCode PHP Snippet
    const phpBackendPath = path.join(__dirname, 'wp-plugin', 'bareun-member-private-qna', 'bareun-member-private-qna.php');
    if (fs.existsSync(phpBackendPath)) {
      console.log('1.5) Syncing & Activating Bareun Backend + Master SEO Engine via WPCode ...');
      const phpSnippetBody = fs.readFileSync(phpBackendPath, 'utf8').replace(/^<\?php\s*/, '').trim();
      await page.goto(`${CANONICAL_ORIGIN}/wp-admin/admin.php?page=wpcode`, { waitUntil: 'networkidle2', timeout: 25000 });
      const snippetRows = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('table.wp-list-table tbody tr')).map(tr => {
          const editLink = tr.querySelector('a[href*="page=wpcode-snippet-manager&snippet_id="]');
          const trashLink = tr.querySelector('a[href*="action=trash"]');
          return {
            title: editLink ? editLink.textContent.trim() : '',
            editHref: editLink ? editLink.getAttribute('href') : '',
            trashHref: trashLink ? trashLink.getAttribute('href') : ''
          };
        }).filter(r => r.title.includes('Bareun Member Auth') || r.title.includes('Private Disease QnA'));
      });
      // Trash older duplicate Bareun snippets if more than 1 exist
      if (snippetRows.length > 1) {
        for (const dup of snippetRows.slice(1)) {
          if (dup.trashHref) {
            const th = dup.trashHref.startsWith('http')
              ? dup.trashHref.replace(/^https?:\/\/(www\.)?bareunhaniwon\.com/i, CANONICAL_ORIGIN)
              : `${CANONICAL_ORIGIN}/wp-admin/` + dup.trashHref.replace(/^\//, '');
            await page.goto(th, { waitUntil: 'domcontentloaded', timeout: 15000 }).catch(() => {});
          }
        }
      }
      const existingMatch = snippetRows[0];
      const targetUrl = existingMatch && existingMatch.editHref
        ? (existingMatch.editHref.startsWith('http')
            ? existingMatch.editHref.replace(/^https?:\/\/(www\.)?bareunhaniwon\.com/i, CANONICAL_ORIGIN)
            : `${CANONICAL_ORIGIN}/wp-admin/` + existingMatch.editHref.replace(/^\//, ''))
        : `${CANONICAL_ORIGIN}/wp-admin/admin.php?page=wpcode-snippet-manager&custom=1`;
      await page.goto(targetUrl, { waitUntil: 'networkidle2', timeout: 30000 });
      await page.evaluate((codeStr) => {
        const titleInput = document.querySelector('#wpcode_snippet_title, input[name="wpcode_snippet_title"]');
        if (titleInput) titleInput.value = 'Bareun Member Auth & Private Disease QnA v5';
        const typeSelect = document.querySelector('#wpcode_snippet_type, select[name="wpcode_snippet_type"]');
        if (typeSelect) {
          typeSelect.value = 'php';
          typeSelect.dispatchEvent(new Event('change', { bubbles: true }));
        }
        const prioInput = document.querySelector('#wpcode_priority, input[name="wpcode_priority"]');
        if (prioInput) prioInput.value = '1';
        const codeTa = document.querySelector('#wpcode_snippet_code, textarea[name="wpcode_snippet_code"]');
        if (codeTa) codeTa.value = codeStr;
        const textTa = document.querySelector('#wpcode_snippet_text, textarea[name="wpcode_snippet_text"]');
        if (textTa) textTa.value = codeStr;
        document.querySelectorAll('.CodeMirror').forEach(cmEl => {
          if (cmEl.CodeMirror) {
            cmEl.CodeMirror.setValue(codeStr);
            cmEl.CodeMirror.save();
          }
        });
        if (window.wpcode_editor && window.wpcode_editor.codemirror) {
          window.wpcode_editor.codemirror.setValue(codeStr);
          window.wpcode_editor.codemirror.save();
        }
        const activeChk = document.querySelector('#wpcode_active, input[name="wpcode_active"]');
        if (activeChk && !activeChk.checked) {
          activeChk.checked = true;
          activeChk.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }, phpSnippetBody);
      await new Promise(r => setTimeout(r, 350));
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 30000 }).catch(() => {}),
        page.evaluate(() => {
          // IMPORTANT: Click ONLY the real Publish/Update button (name="button" value="publish"), NEVER #wpcode_execute_now!
          const btn = document.querySelector('button[name="button"][value="publish"], button[name="submit"], #publish');
          if (btn) btn.click();
          else {
            const f = document.querySelector('form#wpcode-snippet-manager-form, form[action*="wpcode"]');
            if (f) f.submit();
          }
        })
      ]);
      const isSnippetActive = await page.evaluate(() => {
        const activeChk = document.querySelector('#wpcode_active, input[name="wpcode_active"]');
        return activeChk ? !!activeChk.checked : true;
      });
      console.log('   WPCode PHP Backend Snippet synced! Active:', isSnippetActive);
    }

    // 2) Fetch WP REST Nonce
    console.log('2) Fetching WP REST Nonce ...');
    await page.goto(`${CANONICAL_ORIGIN}/wp-admin/post-new.php?post_type=page`, { waitUntil: 'domcontentloaded', timeout: 20000 });
    const nonce = await page.evaluate(() => {
      if (window.wpApiSettings && window.wpApiSettings.nonce) return window.wpApiSettings.nonce;
      const html = document.documentElement.innerHTML;
      const m = html.match(/"nonce":"([a-f0-9]+)"/);
      return m ? m[1] : null;
    });
    if (!nonce) throw new Error('Failed to get WP REST Nonce');
    console.log('   REST Nonce ->', nonce);

    // 2.2) Update Site Profile & Upload Official 1200x630 (<90KB) OG Card to Media Library
    const ogCardPath = path.join(__dirname, 'og-bareun-1200x630.jpg');
    const ogCardB64 = fs.existsSync(ogCardPath) ? fs.readFileSync(ogCardPath).toString('base64') : '';

    const mediaSetup = await page.evaluate(async ({ wpNonce, ogB64 }) => {
      await fetch('/wp-json/wp/v2/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-WP-Nonce': wpNonce },
        body: JSON.stringify({
          title: '바른한의원 대전본점',
          description: '정수리여성남성원형탈모병원치료성장클리닉성장판검사두통탈모약비대면성조숙증키성장담적축농증리프팅다이어트뱃살내장지방위염난임산후보약공진단대전진맥피부',
          default_comment_status: 'closed'
        })
      });
      await fetch('/wp-json/wp/v2/users/me', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-WP-Nonce': wpNonce },
        body: JSON.stringify({
          name: '바른 통합의학 리서치 에디토리얼',
          nickname: '바른 통합의학 저널',
          description: '해외 SCI 의학저널 및 통합생리학 연구 근거 기반 건강 인사이트 에디토리얼'
        })
      });

      let ogMediaId = 51;
      let ogMediaUrl = '';
      const searchRes = await fetch('/wp-json/wp/v2/media?search=og-bareun-1200x630&per_page=10', {
        headers: { 'X-WP-Nonce': wpNonce }
      });
      const existingMedia = await searchRes.json();
      const foundOg = Array.isArray(existingMedia)
        ? existingMedia.find(m => (m.slug && m.slug.includes('og-bareun-1200x630')) || (m.source_url && m.source_url.includes('og-bareun-1200x630')))
        : null;

      if (foundOg && foundOg.id) {
        ogMediaId = foundOg.id;
        ogMediaUrl = foundOg.source_url || '';
      } else if (ogB64) {
        const bin = Uint8Array.from(atob(ogB64), c => c.charCodeAt(0));
        const blob = new Blob([bin], { type: 'image/jpeg' });
        const upRes = await fetch('/wp-json/wp/v2/media', {
          method: 'POST',
          headers: {
            'X-WP-Nonce': wpNonce,
            'Content-Disposition': 'attachment; filename="og-bareun-1200x630.jpg"',
            'Content-Type': 'image/jpeg'
          },
          body: blob
        });
        const upJson = await upRes.json();
        if (upJson && upJson.id) {
          ogMediaId = upJson.id;
          ogMediaUrl = upJson.source_url || '';
          await fetch('/wp-json/wp/v2/media/' + ogMediaId, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-WP-Nonce': wpNonce },
            body: JSON.stringify({
              alt_text: '바른한의원 대전본점 공식 대표 카드 (010-5631-1275 · 대전 대덕구 비래동로7번길 1, 2층)',
              title: '바른한의원 대전본점 공식 오픈그래프 이미지'
            })
          });
        }
      }

      if (ogMediaUrl) {
        ogMediaUrl = ogMediaUrl.replace(/^https?:\/\/(www\.)?bareunhaniwon\.com/i, 'https://www.bareunhaniwon.com');
        await fetch('/wp-json/bareun/v1/seo-verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-WP-Nonce': wpNonce },
          body: JSON.stringify({ ogImageUrl: ogMediaUrl })
        }).catch(() => {});
      }

      // Free up 'gongjindan' slug if held by attachment media ID 50 (gongjindan.png)
      const mediaGong = await (await fetch('/wp-json/wp/v2/media?slug=gongjindan', {
        headers: { 'X-WP-Nonce': wpNonce }
      })).json();
      if (Array.isArray(mediaGong)) {
        for (const mg of mediaGong) {
          await fetch(`/wp-json/wp/v2/media/${mg.id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-WP-Nonce': wpNonce },
            body: JSON.stringify({ slug: 'gongjindan-media-asset' })
          }).catch(() => {});
        }
      }

      // Clean up duplicate gongjindan-3 (ID 132) or trashed gongjindan slugs so ID 96 takes /gongjindan/ cleanly
      await fetch('/wp-json/wp/v2/pages/132?force=true', {
        method: 'DELETE',
        headers: { 'X-WP-Nonce': wpNonce }
      }).catch(() => {});
      const dupCheck = await (await fetch('/wp-json/wp/v2/pages?slug=gongjindan,gongjindan-2,gongjindan-3&status=any,trash&per_page=20', {
        headers: { 'X-WP-Nonce': wpNonce }
      })).json();
      const deletedPages = [];
      if (Array.isArray(dupCheck)) {
        for (const dp of dupCheck) {
          if (dp.id !== 96) {
            const dr = await fetch(`/wp-json/wp/v2/pages/${dp.id}?force=true`, {
              method: 'DELETE',
              headers: { 'X-WP-Nonce': wpNonce }
            });
            if (dr.ok) deletedPages.push(dp.id + ':' + dp.slug);
          }
        }
      }

      return { ogMediaId, ogMediaUrl, deletedPages };
    }, { wpNonce: nonce, ogB64: ogCardB64 });
    console.log('2.2) Official OG Media & Duplicate Slug Cleanup:', mediaSetup);

    const featuredMediaId = mediaSetup.ogMediaId || 51;

    // 3) HIDE ALL PREVIOUSLY PUBLISHED POSTS -> draft & PUBLISH ONLY THE 1 FLAGSHIP ARTICLE
    console.log('3) Hiding all legacy posts -> draft and publishing ONLY 1 Flagship Article ...');
    const flagshipPayload = {
      id: FLAGSHIP_REPRESENTATIVE_POST.id,
      slug: FLAGSHIP_REPRESENTATIVE_POST.slug,
      partId: FLAGSHIP_REPRESENTATIVE_POST.partId,
      title: FLAGSHIP_REPRESENTATIVE_POST.title,
      summary: FLAGSHIP_REPRESENTATIVE_POST.summary,
      standaloneHtml: buildStandaloneWpPostHtml(FLAGSHIP_REPRESENTATIVE_POST)
    };

    const blogCleanupAndSync = await page.evaluate(async ({ wpNonce, categoriesList, flagship, mediaId }) => {
      let catId = null;
      const catsRes = await fetch('/wp-json/wp/v2/categories?per_page=100', { headers: { 'X-WP-Nonce': wpNonce } });
      const cats = await catsRes.json();
      const catMeta = categoriesList[0];
      const foundCat = Array.isArray(cats) ? cats.find(c => c.slug === catMeta.slug) : null;
      if (foundCat) {
        catId = foundCat.id;
      } else {
        const cr = await (await fetch('/wp-json/wp/v2/categories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-WP-Nonce': wpNonce },
          body: JSON.stringify({ name: catMeta.name, slug: catMeta.slug })
        })).json();
        if (cr && cr.id) catId = cr.id;
      }

      let allExistingPosts = [];
      for (let pg = 1; pg <= 3; pg++) {
        const r = await fetch(`/wp-json/wp/v2/posts?per_page=100&page=${pg}&status=any`, {
          headers: { 'X-WP-Nonce': wpNonce }
        });
        if (!r.ok) break;
        const arr = await r.json();
        if (!Array.isArray(arr) || arr.length === 0) break;
        allExistingPosts = allExistingPosts.concat(arr);
        if (arr.length < 100) break;
      }

      let hiddenCount = 0;
      let flagshipMatchId = null;

      for (const ep of allExistingPosts) {
        if (ep.slug === flagship.slug) {
          flagshipMatchId = ep.id;
          continue;
        }
        if (ep.status === 'publish' || ep.status === 'private' || ep.status === 'future') {
          const hideRes = await fetch('/wp-json/wp/v2/posts/' + ep.id, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-WP-Nonce': wpNonce },
            body: JSON.stringify({ status: 'draft', comment_status: 'closed' })
          });
          if (hideRes.ok) hiddenCount++;
        }
      }

      let deletedComments = 0;
      const cmRes = await fetch('/wp-json/wp/v2/comments?per_page=100&status=any', {
        headers: { 'X-WP-Nonce': wpNonce }
      });
      const cmList = await cmRes.json();
      if (Array.isArray(cmList)) {
        for (const c of cmList) {
          const dr = await fetch('/wp-json/wp/v2/comments/' + c.id + '?force=true', {
            method: 'DELETE',
            headers: { 'X-WP-Nonce': wpNonce }
          });
          if (dr.ok) deletedComments++;
        }
      }

      const epUrl = flagshipMatchId ? ('/wp-json/wp/v2/posts/' + flagshipMatchId) : '/wp-json/wp/v2/posts';
      const pubRes = await fetch(epUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-WP-Nonce': wpNonce },
        body: JSON.stringify({
          title: flagship.title,
          slug: flagship.slug,
          excerpt: flagship.summary,
          content: flagship.standaloneHtml,
          status: 'publish',
          comment_status: 'closed',
          ping_status: 'open',
          featured_media: mediaId,
          categories: catId ? [catId] : []
        })
      });
      const pubJson = await pubRes.json();
      const canonicalFlagshipLink = 'https://www.bareunhaniwon.com/' + (pubJson?.slug || flagship.slug) + '/';
      const publishedMap = {};
      if (pubJson && pubJson.id) {
        publishedMap[flagship.id] = {
          wpPostId: pubJson.id,
          slug: pubJson.slug || flagship.slug,
          link: canonicalFlagshipLink
        };
      }

      return { hiddenCount, deletedComments, flagshipPostId: pubJson?.id || null, flagshipLink: canonicalFlagshipLink, publishedMap };
    }, {
      wpNonce: nonce,
      categoriesList: DISEASE_BLOG_CATEGORIES,
      flagship: flagshipPayload,
      mediaId: featuredMediaId
    });

    console.log('   [BLOG CLEANUP & SINGLE FLAGSHIP SYNC]:', blogCleanupAndSync);

    fs.writeFileSync(
      path.join(__dirname, 'wp-published-posts-map.json'),
      JSON.stringify(blogCleanupAndSync.publishedMap, null, 2),
      'utf8'
    );
    execFileSync(process.execPath, [path.join(__dirname, 'build-ask-doctor.js')], { stdio: 'inherit' });
    execFileSync(process.execPath, [path.join(__dirname, 'bundle-wp.js')], { stdio: 'inherit' });

    // 4) Deploy all 15 WordPress Pages
    console.log('4) Deploying all 15 WordPress Pages ...');
    const existingInfo = await page.evaluate(async (wpNonce) => {
      const r1 = await fetch('/wp-json/wp/v2/pages?per_page=100&status=any', { headers: { 'X-WP-Nonce': wpNonce } });
      const list = await r1.json();
      const ref46Res = await fetch('/wp-json/wp/v2/pages/46?context=edit', { headers: { 'X-WP-Nonce': wpNonce } });
      const ref46 = await ref46Res.json();
      return {
        pages: Array.isArray(list) ? list.map(p => ({ id: p.id, slug: p.slug, link: p.link })) : [],
        refMeta: ref46 && ref46.meta ? ref46.meta : {},
        refTemplate: ref46 && ref46.template ? ref46.template : ''
      };
    }, nonce);

    const deployedPageUrls = [];
    for (const item of PAGES_TO_DEPLOY) {
      const filePath = path.join(__dirname, item.file);
      if (!fs.existsSync(filePath)) continue;
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
          title,
          slug,
          status: 'publish',
          comment_status: 'closed',
          excerpt: excerpt || '',
          content,
          template: template || ''
        };
        if (featuredMedia) bodyObj.featured_media = featuredMedia;
        if (meta && Object.keys(meta).length > 0) bodyObj.meta = meta;

        const r = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-WP-Nonce': wpNonce },
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
        featuredMedia: featuredMediaId,
        content: blockContent,
        meta: existingInfo.refMeta,
        template: existingInfo.refTemplate
      });

      if (res.link) deployedPageUrls.push(res.link);
      console.log(`   [PAGE DEPLOYED] ${item.slug.padEnd(20)} -> status ${res.status} | ID: ${res.id} | URL: ${res.link || res.err}`);
    }

    // 5) Flush Permalinks & Clear WP Super Cache
    console.log('5) Flushing Permalinks & Clearing WP Super Cache ...');
    await page.goto(`${CANONICAL_ORIGIN}/wp-admin/options-permalink.php`, { waitUntil: 'domcontentloaded', timeout: 15000 }).catch(() => {});
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 15000 }).catch(() => {}),
      page.click('#submit').catch(() => {})
    ]);

    await page.goto(`${CANONICAL_ORIGIN}/wp-admin/options-general.php?page=wpsupercache`, { waitUntil: 'domcontentloaded', timeout: 15000 }).catch(() => {});
    await page.evaluate(() => {
      const btn = document.querySelector('input[name="wp_delete_cache"], button[name="wp_delete_cache"]');
      if (btn && btn.form) btn.form.submit();
    }).catch(() => {});
    await new Promise(r => setTimeout(r, 2000));

    // 5.5) Warm all canonical HTTPS www URLs so WP Super Cache serves identical warm responses (C10 + ultra-fast TTFB)
    const allLiveUrls = Array.from(new Set([
      `${CANONICAL_ORIGIN}/`,
      ...deployedPageUrls.map(u => u.replace(/^https?:\/\/(www\.)?bareunhaniwon\.com/i, CANONICAL_ORIGIN)),
      ...(blogCleanupAndSync.flagshipLink ? [blogCleanupAndSync.flagshipLink] : [])
    ]));
    console.log(`5.5) Warming ${allLiveUrls.length} canonical HTTPS URLs in WP Super Cache ...`);
    for (const u of allLiveUrls) {
      const st = await warmUrlOnce(u);
      console.log(`   [WARMED] ${u.padEnd(85)} -> HTTP ${st}`);
    }

    // 6) Ping IndexNow
    const indexNowStatus = await pingIndexNow(allLiveUrls);
    console.log(`6) IndexNow Search Engine Ping sent for ${allLiveUrls.length} URLs (HTTP ${indexNowStatus})!`);

    console.log('✅ MASTER SEO + CANONICAL WWW DEPLOYMENT COMPLETE ON https://www.bareunhaniwon.com/ !');
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
