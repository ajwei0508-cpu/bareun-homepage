const fs = require('fs');
const path = require('path');
const os = require('os');
const https = require('https');
const { execFileSync } = require('child_process');
const {
  DISEASE_BLOG_CATEGORIES,
  INITIAL_DISEASE_BLOG_POSTS,
  FLAGSHIP_REPRESENTATIVE_POST,
  buildStandaloneWpPostHtml
} = require('./disease-blog-seed-data.js');
const {
  PART_SEO_CLINICAL_META,
  syncNineDiseaseAutoNotes,
  buildAllHealthNoteWpPayloads
} = require('./auto-blog-engine.js');

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
  { id: 46,   slug: 'home',                title: '바른한의원 대전본점',                                     file: 'wordpress-main-home.html',           excerpt: '내 가족에게 처방·시술한 치료만 하는 아빠 한의사, 바른한의원 대전본점(안정위 대표원장)입니다. 추나요법, 허리·목디스크, 소아 키성장, 성장판검사, 성조숙증, 비염, 축농증, 식욕ZERO 다이어트, 내장지방, 남성·여성·원형탈모, 지루성두피염, 담적, 위염, 난임, 산후보약, 황제공진단, 전립선, 리프팅 맞춤 한방 치료.' },
  { id: 125,  slug: 'body-explorer',       title: '3D 인체모형 · 바른한의원 진료 살펴보기',                   file: 'wordpress-body-explorer.html',       excerpt: '풀스크린 3D 인체모형으로 머리부터 발끝까지 근육·신경·관절·혈관 구조와 9대 부위별 오늘의 건강 글(72편), 전 질환 통합 1:1 질문(무엇이든 물어보세요)을 한눈에 살펴보는 건강 포털입니다.' },
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

    // 1.4) Rebuild & Upload Bareun WordPress Plugin ZIP via plugin-install.php?tab=upload
    const pluginZipPath = path.join(__dirname, 'wp-plugin', 'bareun-member-private-qna.zip');
    const pluginPhpSource = path.join(__dirname, 'wp-plugin', 'bareun-member-private-qna', 'bareun-member-private-qna.php');
    if (fs.existsSync(pluginPhpSource)) {
      try {
        const AdmZip = require(path.join(__dirname, '..', 'imagemaker', 'node_modules', 'adm-zip'));
        const zip = new AdmZip();
        zip.addFile('bareun-member-private-qna/bareun-member-private-qna.php', fs.readFileSync(pluginPhpSource));
        zip.writeZip(pluginZipPath);
        console.log('   Rebuilt clean POSIX plugin ZIP ->', pluginZipPath);
      } catch (zErr) {
        console.warn('   Plugin ZIP rebuild fallback:', zErr.message);
      }
    }
    if (fs.existsSync(pluginZipPath)) {
      console.log('1.4) Uploading & Activating Bareun Plugin ZIP via WordPress Plugin Installer ...');
      await page.goto(`${CANONICAL_ORIGIN}/wp-admin/plugin-install.php?tab=upload`, { waitUntil: 'networkidle2', timeout: 25000 }).catch(() => {});
      const zipInput = await page.$('input[type="file"][name="pluginzip"]');
      if (zipInput) {
        await zipInput.uploadFile(pluginZipPath);
        await page.evaluate(() => {
          const btn = document.getElementById('install-plugin-submit');
          if (btn) btn.disabled = false;
        });
        await Promise.all([
          page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 35000 }).catch(() => {}),
          page.click('#install-plugin-submit')
        ]);
        const overwriteBtn = await page.$('a.update-from-upload-overwrite, a[href*="overwrite=update-plugin"]');
        if (overwriteBtn) {
          await Promise.all([
            page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 35000 }).catch(() => {}),
            overwriteBtn.click()
          ]);
        }
        const activateBtn = await page.$('a[href*="action=activate"]');
        if (activateBtn) {
          await Promise.all([
            page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 25000 }).catch(() => {}),
            activateBtn.click()
          ]);
        }
        console.log('   WordPress Plugin ZIP uploaded & active!');
      }
    }

    // 1.5) Ensure duplicate WPCode snippets are disabled (Official plugin handles backend via Step 1.4)
    console.log('1.5) Ensuring duplicate WPCode snippets are disabled (Official plugin handles backend)...');
    try {
      await page.goto(`${CANONICAL_ORIGIN}/wp-admin/admin.php?page=wpcode`, { waitUntil: 'networkidle2', timeout: 25000 });
      const duplicateSnippetHrefs = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('table.wp-list-table tbody tr')).map(tr => {
          const editLink = tr.querySelector('a[href*="page=wpcode-snippet-manager&snippet_id="]');
          const text = tr.textContent;
          return {
            isMatch: text.includes('Bareun Member Auth') || text.includes('Private Disease QnA'),
            editHref: editLink ? editLink.href : ''
          };
        }).filter(r => r.isMatch && r.editHref).map(r => r.editHref);
      });
      for (const href of duplicateSnippetHrefs) {
        await page.goto(href, { waitUntil: 'networkidle2', timeout: 20000 });
        await page.evaluate(() => {
          const activeChk = document.querySelector('#wpcode_active, input[name="wpcode_active"]');
          if (activeChk && activeChk.checked) {
            activeChk.click();
            activeChk.dispatchEvent(new Event('change', { bubbles: true }));
          }
          const btn = document.querySelector('button[name="button"][value="publish"], button[name="submit"], #publish');
          if (btn) btn.click();
          else {
            const f = document.querySelector('form#wpcode-snippet-manager-form, form[action*="wpcode"]');
            if (f) f.submit();
          }
        });
        await new Promise(r => setTimeout(r, 1500));
      }
      console.log('   Duplicate WPCode snippets cleared/deactivated.');
    } catch (wpcodeErr) {
      console.warn('   WPCode cleanup note:', wpcodeErr.message);
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

    // 2.1) Sync 24/7 Online Custom Studio Engine Assets (HTML, Compiler JS, Card Prompts JS, Angle Samples & Config JSON) to WordPress Uploads
    console.log('2.1) Syncing 24/7 Online Custom Studio Engine Assets to Cafe24 WordPress ...');
    const studioHtml = fs.readFileSync(path.join(__dirname, 'detail-pages-editor.html'), 'utf8');
    const compilerJs = fs.readFileSync(path.join(__dirname, 'bareun-detail-compiler.js'), 'utf8');
    const cardPromptsPath = path.join(__dirname, 'card-image-prompts.js');
    const cardPromptsJs = fs.existsSync(cardPromptsPath) ? fs.readFileSync(cardPromptsPath, 'utf8') : '';
    const angleRefsDir = path.join(__dirname, 'director-angle-refs');
    const angleRefs = {};
    if (fs.existsSync(angleRefsDir)) {
      for (const fn of fs.readdirSync(angleRefsDir)) {
        if (/\.(jpg|jpeg|png|webp)$/i.test(fn)) {
          angleRefs[fn] = fs.readFileSync(path.join(angleRefsDir, fn)).toString('base64');
        }
      }
    }
    const masterCfgObj = JSON.parse(fs.readFileSync(path.join(__dirname, 'detail-pages-config.json'), 'utf8'));
    const hnCustomCfgPath = path.join(__dirname, 'health-notes-custom-config.json');
    const hnDefaultCfgPath = path.join(__dirname, 'health-notes-custom-config.default.json');
    const healthNotesCfgObj = fs.existsSync(hnCustomCfgPath) ? JSON.parse(fs.readFileSync(hnCustomCfgPath, 'utf8')) : null;
    const healthNotesDefCfgObj = fs.existsSync(hnDefaultCfgPath) ? JSON.parse(fs.readFileSync(hnDefaultCfgPath, 'utf8')) : null;
    const fullPluginPhp = fs.existsSync(pluginPhpSource) ? fs.readFileSync(pluginPhpSource, 'utf8') : '';
    let localStudioAiKeys = {};
    try {
      const localSettingsPath = path.join(__dirname, '..', 'imagemaker', 'data', 'settings.json');
      if (fs.existsSync(localSettingsPath)) {
        const rawSet = JSON.parse(fs.readFileSync(localSettingsPath, 'utf8')) || {};
        if (rawSet.geminiKey) localStudioAiKeys.geminiKey = String(rawSet.geminiKey).trim();
        if (rawSet.falKey) localStudioAiKeys.falKey = String(rawSet.falKey).trim();
      }
    } catch (e) {}

    const studioSyncRes = await page.evaluate(async ({ wpNonce, studioHtml, compilerJs, cardPromptsJs, angleRefs, masterCfgObj, healthNotesCfgObj, healthNotesDefCfgObj, fullPluginPhp, localStudioAiKeys }) => {
      const res = await fetch('/wp-json/bareun/v1/studio/sync-studio-assets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-WP-Nonce': wpNonce },
        body: JSON.stringify({
          studioHtml,
          compilerJs,
          cardPromptsJs,
          angleRefs,
          resetAngleSamples: true,
          studioAiKeys: localStudioAiKeys,
          pluginPhp: fullPluginPhp,
          config: masterCfgObj,
          healthNotesConfig: healthNotesCfgObj,
          healthNotesDefaultConfig: healthNotesDefCfgObj
        })
      });
      return await res.json();
    }, { wpNonce: nonce, studioHtml, compilerJs, cardPromptsJs, angleRefs, masterCfgObj, healthNotesCfgObj, healthNotesDefCfgObj, fullPluginPhp, localStudioAiKeys });
    console.log('   Studio Online Assets Synced:', studioSyncRes);

    // 2.2) Update Site Profile & Upload Official 1200x630 (<90KB) OG Card to Media Library
    const ogCardPath = path.join(__dirname, 'og-bareun-1200x630.jpg');
    const ogCardB64 = fs.existsSync(ogCardPath) ? fs.readFileSync(ogCardPath).toString('base64') : '';

    const mediaSetup = await page.evaluate(async ({ wpNonce, ogB64 }) => {
      await fetch('/wp-json/wp/v2/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-WP-Nonce': wpNonce },
        body: JSON.stringify({
          title: '바른한의원 대전본점',
          description: '내 가족에게 처방·시술한 치료만 하는 아빠 한의사, 바른한의원 대전본점(안정위 대표원장)입니다. 추나요법, 허리·목디스크, 소아 키성장, 성장판검사, 성조숙증, 비염, 축농증, 식욕ZERO 다이어트, 내장지방, 남성·여성·원형탈모, 지루성두피염, 담적, 위염, 난임, 산후보약, 황제공진단, 전립선, 리프팅 맞춤 한방 치료.',
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

      // Clean up duplicate gongjindan-3 (ID 132) or redundant ask-doctor page so /body-explorer/ is the sole 3D portal
      await fetch('/wp-json/wp/v2/pages/132?force=true', {
        method: 'DELETE',
        headers: { 'X-WP-Nonce': wpNonce }
      }).catch(() => {});
      const dupCheck = await (await fetch('/wp-json/wp/v2/pages?slug=gongjindan,gongjindan-2,gongjindan-3,ask-doctor&status=any,trash&per_page=20', {
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

    // 2.3) Upload / Sync 9 Part-Specific 1376x768 Medical Illustrations for Google Discover, OG Cards & Rich Results
    const partHeroSpecs = [];
    for (const [partId, pMeta] of Object.entries(PART_SEO_CLINICAL_META || {})) {
      const fPath = path.join(__dirname, pMeta.heroFile);
      if (fs.existsSync(fPath)) {
        const baseNoExt = path.basename(pMeta.heroFile, path.extname(pMeta.heroFile));
        partHeroSpecs.push({
          partId,
          filename: pMeta.heroFile,
          searchKey: baseNoExt,
          altText: pMeta.heroAlt || `바른한의원 대전본점 ${partId} 의학 일러스트`,
          title: `바른한의원 대전본점 [${partId}] 건강백과 대표 의학 일러스트`,
          b64: fs.readFileSync(fPath).toString('base64')
        });
      }
    }

    const partMediaSetup = await page.evaluate(async ({ wpNonce, specs }) => {
      const partMediaIdMap = {};
      const partMediaUrlMap = {};
      for (const sp of specs) {
        try {
          const sRes = await fetch(`/wp-json/wp/v2/media?search=${encodeURIComponent(sp.searchKey)}&per_page=10`, {
            headers: { 'X-WP-Nonce': wpNonce }
          });
          const sArr = await sRes.json();
          const normKey = sp.searchKey.toLowerCase().replace(/[^a-z0-9]/g, '');
          const found = Array.isArray(sArr)
            ? sArr.find(m => {
                const mSlug = String(m.slug || '').toLowerCase().replace(/[^a-z0-9]/g, '');
                const mSrc = String(m.source_url || '').toLowerCase().replace(/[^a-z0-9]/g, '');
                return mSlug.includes(normKey) || mSrc.includes(normKey);
              })
            : null;
          if (found && found.id) {
            partMediaIdMap[sp.partId] = found.id;
            partMediaUrlMap[sp.partId] = String(found.source_url || '').replace(/^https?:\/\/(www\.)?bareunhaniwon\.com/i, 'https://www.bareunhaniwon.com');
          } else if (sp.b64) {
            const bin = Uint8Array.from(atob(sp.b64), c => c.charCodeAt(0));
            const blob = new Blob([bin], { type: 'image/jpeg' });
            const upRes = await fetch('/wp-json/wp/v2/media', {
              method: 'POST',
              headers: {
                'X-WP-Nonce': wpNonce,
                'Content-Disposition': `attachment; filename="${sp.filename}"`,
                'Content-Type': 'image/jpeg'
              },
              body: blob
            });
            const upJson = await upRes.json();
            if (upJson && upJson.id) {
              partMediaIdMap[sp.partId] = upJson.id;
              partMediaUrlMap[sp.partId] = String(upJson.source_url || '').replace(/^https?:\/\/(www\.)?bareunhaniwon\.com/i, 'https://www.bareunhaniwon.com');
              await fetch('/wp-json/wp/v2/media/' + upJson.id, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-WP-Nonce': wpNonce },
                body: JSON.stringify({ alt_text: sp.altText, title: sp.title })
              }).catch(() => {});
            }
          }
        } catch (e) {}
      }
      return { partMediaIdMap, partMediaUrlMap };
    }, { wpNonce: nonce, specs: partHeroSpecs });
    console.log('2.3) 9 Part-Specific Medical Illustrations Synced:', partMediaSetup.partMediaIdMap);

    // 3) SYNC FLAGSHIP REVIEW + ALL 72 SEO/AEO/GEO HEALTH NOTE POSTS + /llms.txt
    syncNineDiseaseAutoNotes();
    console.log('3) Syncing Flagship Review + 72 Rich SEO/AEO/GEO Health Note Posts + /llms.txt ...');
    const flagshipPayload = {
      id: FLAGSHIP_REPRESENTATIVE_POST.id,
      slug: FLAGSHIP_REPRESENTATIVE_POST.slug,
      partId: FLAGSHIP_REPRESENTATIVE_POST.partId,
      categorySlug: 'blog-lumbar',
      title: FLAGSHIP_REPRESENTATIVE_POST.title,
      summary: FLAGSHIP_REPRESENTATIVE_POST.summary,
      standaloneHtml: buildStandaloneWpPostHtml(FLAGSHIP_REPRESENTATIVE_POST)
    };

    const allPostsToPublish = [flagshipPayload, ...buildAllHealthNoteWpPayloads(partMediaSetup.partMediaUrlMap)];

    const llmsTxtRaw = fs.existsSync(path.join(__dirname, 'llms.txt'))
      ? fs.readFileSync(path.join(__dirname, 'llms.txt'), 'utf8')
      : '';
    const llmsFullTxtRaw = fs.existsSync(path.join(__dirname, 'llms-full.txt'))
      ? fs.readFileSync(path.join(__dirname, 'llms-full.txt'), 'utf8')
      : '';

    const blogCleanupAndSync = await page.evaluate(async ({ wpNonce, categoriesList, postsToPublish, mediaId, partMediaIdMap, llmsTxt, llmsFullTxt }) => {
      if (llmsTxt || llmsFullTxt) {
        await fetch('/wp-json/bareun/v1/seo-verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-WP-Nonce': wpNonce },
          body: JSON.stringify({ llmsTxt, llmsFullTxt })
        }).catch(() => {});
      }

      const catIdMap = {};
      const catsRes = await fetch('/wp-json/wp/v2/categories?per_page=100', { headers: { 'X-WP-Nonce': wpNonce } });
      const cats = await catsRes.json();
      for (const catMeta of categoriesList) {
        const foundCat = Array.isArray(cats) ? cats.find(c => c.slug === catMeta.slug) : null;
        if (foundCat) {
          catIdMap[catMeta.slug] = foundCat.id;
        }
      }

      let allExistingPosts = [];
      for (let pg = 1; pg <= 5; pg++) {
        const r = await fetch(`/wp-json/wp/v2/posts?per_page=100&page=${pg}&status=any,trash`, {
          headers: { 'X-WP-Nonce': wpNonce }
        });
        if (!r.ok) break;
        const arr = await r.json();
        if (!Array.isArray(arr) || arr.length === 0) break;
        allExistingPosts = allExistingPosts.concat(arr);
        if (arr.length < 100) break;
      }

      const keepSlugs = new Set(postsToPublish.map(p => p.slug));
      const toDelete = allExistingPosts.filter(ep => ep && !keepSlugs.has(ep.slug));
      let deletedPostsCount = 0;
      const delBatch = 8;
      for (let i = 0; i < toDelete.length; i += delBatch) {
        const chunk = toDelete.slice(i, i + delBatch);
        await Promise.all(chunk.map(async (ep) => {
          const dr = await fetch(`/wp-json/wp/v2/posts/${ep.id}?force=true`, {
            method: 'DELETE',
            headers: { 'X-WP-Nonce': wpNonce }
          });
          if (dr.ok) deletedPostsCount++;
        }));
      }

      const existingBySlug = {};
      for (const ep of allExistingPosts) {
        if (ep && ep.slug && keepSlugs.has(ep.slug)) existingBySlug[ep.slug] = ep.id;
      }

      const publishedMap = {};
      let publishedCount = 0;
      const pubBatchSize = 6;

      for (let i = 0; i < postsToPublish.length; i += pubBatchSize) {
        const batch = postsToPublish.slice(i, i + pubBatchSize);
        await Promise.all(batch.map(async (postItem) => {
          const matchId = existingBySlug[postItem.slug] || null;
          const epUrl = matchId ? ('/wp-json/wp/v2/posts/' + matchId) : '/wp-json/wp/v2/posts';
          const cId = catIdMap[postItem.categorySlug] || Object.values(catIdMap)[0] || null;
          const resolvedMediaId = (postItem.slug !== 'integrative-autonomic-circadian-gut-spine-health-review' && postItem.partId && partMediaIdMap && partMediaIdMap[postItem.partId])
            ? partMediaIdMap[postItem.partId]
            : mediaId;
          const pubRes = await fetch(epUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-WP-Nonce': wpNonce },
            body: JSON.stringify({
              title: postItem.title,
              slug: postItem.slug,
              excerpt: postItem.summary,
              content: postItem.standaloneHtml,
              status: 'publish',
              comment_status: 'closed',
              ping_status: 'open',
              featured_media: resolvedMediaId,
              categories: cId ? [cId] : []
            })
          });
          const pubJson = await pubRes.json();
          if (pubJson && pubJson.id) {
            publishedCount++;
            publishedMap[postItem.id] = {
              wpPostId: pubJson.id,
              slug: pubJson.slug || postItem.slug,
              link: postItem.canonicalPath
                ? ('https://www.bareunhaniwon.com' + postItem.canonicalPath)
                : ('https://www.bareunhaniwon.com/' + (pubJson.slug || postItem.slug) + '/')
            };
          }
        }));
      }

      return {
        deletedPostsCount,
        publishedCount,
        publishedMap
      };
    }, {
      wpNonce: nonce,
      categoriesList: DISEASE_BLOG_CATEGORIES,
      postsToPublish: allPostsToPublish,
      mediaId: featuredMediaId,
      partMediaIdMap: partMediaSetup.partMediaIdMap,
      llmsTxt: llmsTxtRaw,
      llmsFullTxt: llmsFullTxtRaw
    });

    console.log('   [STANDALONE CONSOLIDATION & CLEANUP RESULT]:', {
      deletedExtraPostsCount: blogCleanupAndSync.deletedPostsCount,
      remainingFlagshipPosts: blogCleanupAndSync.publishedCount
    });

    fs.writeFileSync(
      path.join(__dirname, 'wp-published-posts-map.json'),
      JSON.stringify(blogCleanupAndSync.publishedMap, null, 2),
      'utf8'
    );
    execFileSync(process.execPath, [path.join(__dirname, 'build-body-explorer.js')], { stdio: 'inherit' });
    execFileSync(process.execPath, [path.join(__dirname, 'bundle-wp.js')], { stdio: 'inherit' });

    // 4) Deploy all 14 WordPress Pages
    console.log('4) Deploying all 14 WordPress Pages ...');
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

    // 5.5) Warm canonical HTTPS www URLs & Ping IndexNow for ALL 87+ Pages + Health Notes
    const publishedPostUrls = Object.values(blogCleanupAndSync.publishedMap || {})
      .map(v => v && v.link)
      .filter(Boolean);
    const urlsToWarm = Array.from(new Set([
      `${CANONICAL_ORIGIN}/`,
      ...deployedPageUrls.map(u => u.replace(/^https?:\/\/(www\.)?bareunhaniwon\.com/i, CANONICAL_ORIGIN)),
      `${CANONICAL_ORIGIN}/integrative-autonomic-circadian-gut-spine-health-review/`,
      `${CANONICAL_ORIGIN}/feed/`,
      `${CANONICAL_ORIGIN}/llms.txt`,
      ...publishedPostUrls.slice(-9)
    ]));
    console.log(`5.5) Warming ${urlsToWarm.length} core canonical HTTPS URLs in WP Super Cache ...`);
    for (const u of urlsToWarm) {
      const st = await warmUrlOnce(u);
      console.log(`   [WARMED] ${u.padEnd(85)} -> HTTP ${st}`);
    }

    // 6) Ping IndexNow for ALL Pages + Flagship Review + All 72 Health Notes (up to 100 URLs)
    const allIndexNowUrls = Array.from(new Set([
      `${CANONICAL_ORIGIN}/`,
      ...deployedPageUrls.map(u => u.replace(/^https?:\/\/(www\.)?bareunhaniwon\.com/i, CANONICAL_ORIGIN)),
      ...publishedPostUrls
    ]));
    const indexNowStatus = await pingIndexNow(allIndexNowUrls);
    console.log(`6) IndexNow Search Engine Ping sent for ${allIndexNowUrls.length} URLs (HTTP ${indexNowStatus})!`);

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
