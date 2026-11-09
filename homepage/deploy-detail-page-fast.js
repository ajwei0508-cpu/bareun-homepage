const fs = require('fs');
const path = require('path');
const os = require('os');

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

const WP_DETAIL_PAGES = [
  { id: 126, slug: 'director', file: 'director.html', wpFile: 'wordpress-director.html', title: '안정위 대표원장 · 9대 정밀검진', excerpt: '초음파·체열진단·이비인후 내시경·사상체질·체지방·자율신경·간/당 수치·혈관·성장 검사까지 9대 정밀 검진 시스템을 운영합니다.' },
  { id: 127, slug: 'chuna', file: 'chuna.html', wpFile: 'wordpress-chuna.html', title: '바른 추나 · 척추교정', excerpt: 'The Lancet · JAMA 등 국제 학술 논문을 검수하여 유효성이 입증된 비수술 추나로 틀어진 척추·골반 중심축을 바로잡습니다.' },
  { id: 105, slug: 'growth', file: 'growth.html', wpFile: 'wordpress-growth.html', title: '바른 성장 · 성조숙증', excerpt: '소아내분비학 및 약리학 학술 논문 근거를 바탕으로 성장판 연골 증식과 호흡기 면역을 함께 돌봅니다.' },
  { id: 66, slug: 'diet-zero', file: 'diet-zero.html', wpFile: 'wordpress-diet.html', title: '바른 다이어트 · 식욕ZERO', excerpt: '갈색지방 열생산 및 대사 생리학 연구를 바탕으로 무리한 절식 없이 내장지방을 건강하게 비워냅니다.' },
  { id: 130, slug: 'hairloss', file: 'hairloss.html', wpFile: 'wordpress-hairloss.html', title: '바른 탈모 · 모근재생', excerpt: '수승화강 두피 열조절과 경추 순환 개선으로 모유두 세포 미세혈류와 모근 자생력을 회복합니다.' },
  { id: 408, slug: 'hairloss-male', file: 'hairloss-male.html', wpFile: 'wordpress-hairloss-male.html', title: '바른 남성탈모 · M자·정수리', excerpt: '호르몬 억제 부담 없는 두피 청열과 경추 추나로 M자·정수리 남성탈모 모근 자생력을 깨웁니다.' },
  { id: 409, slug: 'hairloss-alopecia', file: 'hairloss-alopecia.html', wpFile: 'wordpress-hairloss-alopecia.html', title: '바른 원형탈모 · 면역복원', excerpt: '자율신경 안정과 모낭 주위 자가면역 균형 회복으로 동전 모양·다발성 원형탈모를 케어합니다.' },
  { id: 410, slug: 'hairloss-female', file: 'hairloss-female.html', wpFile: 'wordpress-hairloss-female.html', title: '바른 여성탈모 · 가르마·볼륨', excerpt: '여성 상열하한(上熱下寒)과 영양 불균형을 다스려 넓어진 가르마와 정수리 볼륨을 복원합니다.' },
  { id: 411, slug: 'hairloss-seborrheic', file: 'hairloss-seborrheic.html', wpFile: 'wordpress-hairloss-seborrheic.html', title: '바른 지루성두피염 · 열독해독', excerpt: '반복되는 두피 홍반, 모낭염, 가려움과 각질을 청열해독 케어로 진정시키고 건강한 진피 장벽을 복원합니다.' },
  { id: 96, slug: 'gongjindan', file: 'gongjindan.html', wpFile: 'wordpress-gongjindan.html', title: '바른 황제공진단', excerpt: '신경약리학 학술 논문으로 뇌신경 보호와 피로 회복 기전이 보고된 식약처 CITES 인증 정품 사향 황제공진단입니다.' },
  { id: 133, slug: 'prostate', file: 'prostate.html', wpFile: 'wordpress-prostate.html', title: '바른 전립선 · 남성활력', excerpt: '전립선 울혈 감압 및 방광·골반저근 기능 강화로 야간뇨 없는 편안한 배뇨와 숙면을 돕습니다.' }
];

function resolveTargets(argv) {
  const deployAll = argv.includes('--all');
  if (deployAll) return WP_DETAIL_PAGES;

  const slugArg = argv.find(a => a.startsWith('--slug=') || a.startsWith('--page='));
  if (!slugArg) {
    throw new Error('Usage: node deploy-detail-page-fast.js --slug=<slug|file> OR --all');
  }
  const key = slugArg.split('=')[1].trim().replace(/^\//, '');
  const found = WP_DETAIL_PAGES.find(p => p.slug === key || p.file === key || p.wpFile === key);
  if (!found) {
    throw new Error('Unknown detail page target: ' + key);
  }
  return [found];
}

function getMimeType(fileName) {
  const ext = path.extname(fileName).toLowerCase();
  if (ext === '.png') return 'image/png';
  if (ext === '.webp') return 'image/webp';
  if (ext === '.gif') return 'image/gif';
  if (ext === '.svg') return 'image/svg+xml';
  if (ext === '.mp4') return 'video/mp4';
  return 'image/jpeg';
}

(async () => {
  let browser;
  try {
    const targets = resolveTargets(process.argv.slice(2));
    for (const t of targets) {
      const wpPath = path.join(__dirname, t.wpFile);
      if (!fs.existsSync(wpPath)) {
        throw new Error(`Missing WordPress bundle file: ${t.wpFile}`);
      }
    }

    const mediaCachePath = path.join(__dirname, '.wp-media-cache.json');
    let mediaCache = {};
    if (fs.existsSync(mediaCachePath)) {
      try { mediaCache = JSON.parse(fs.readFileSync(mediaCachePath, 'utf8') || '{}'); } catch (e) { mediaCache = {}; }
    }

    browser = await puppeteer.launch({
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-blink-features=AutomationControlled']
    });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36');

    await page.goto('https://www.bareunhaniwon.com/wp-login.php', { waitUntil: 'networkidle2', timeout: 30000 });
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
      await page.type('#user_login', 'wealthywei0508', { delay: 15 });
      await page.type('#user_pass', 'A50tkf100djrA!', { delay: 15 });
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 25000 }).catch(() => {}),
        page.click('#wp-submit')
      ]);
    }

    await page.goto('https://www.bareunhaniwon.com/wp-admin/post-new.php?post_type=page', { waitUntil: 'domcontentloaded', timeout: 20000 });
    const nonce = await page.evaluate(() => {
      if (window.wpApiSettings && window.wpApiSettings.nonce) return window.wpApiSettings.nonce;
      const html = document.documentElement.innerHTML;
      const m = html.match(/"nonce":"([a-f0-9]+)"/);
      return m ? m[1] : null;
    });
    if (!nonce) throw new Error('Failed to obtain WP REST Nonce');

    const refInfo = await page.evaluate(async (wpNonce) => {
      const ref46Res = await fetch('/wp-json/wp/v2/pages/46?context=edit', { headers: { 'X-WP-Nonce': wpNonce } });
      const ref46 = await ref46Res.json();
      return {
        template: (ref46 && ref46.template) ? ref46.template : '',
        meta: (ref46 && ref46.meta && Object.keys(ref46.meta).length > 0) ? ref46.meta : null
      };
    }, nonce);

    const deployedResults = [];
    let mediaCacheDirty = false;

    for (const target of targets) {
      let rawHtml = fs.readFileSync(path.join(__dirname, target.wpFile), 'utf8');

      // Upload any local detail_custom_* assets directly to WP Media Library so live site never 404s before git push
      const customMatches = Array.from(new Set(rawHtml.match(/detail_custom_[A-Za-z0-9_.-]+\.(?:jpg|jpeg|png|webp|gif|svg|mp4)/gi) || []));
      for (const fileName of customMatches) {
        const localAssetPath = path.join(__dirname, fileName);
        if (!fs.existsSync(localAssetPath)) continue;
        let wpSourceUrl = mediaCache[fileName];
        if (!wpSourceUrl) {
          const base64Data = fs.readFileSync(localAssetPath).toString('base64');
          const mimeType = getMimeType(fileName);
          const upRes = await page.evaluate(async ({ wpNonce, fileName, base64Data, mimeType }) => {
            const bin = atob(base64Data);
            const bytes = new Uint8Array(bin.length);
            for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
            const blob = new Blob([bytes], { type: mimeType });
            const r = await fetch('/wp-json/wp/v2/media', {
              method: 'POST',
              headers: {
                'X-WP-Nonce': wpNonce,
                'Content-Disposition': `attachment; filename="${fileName}"`,
                'Content-Type': mimeType
              },
              body: blob
            });
            const j = await r.json();
            return { ok: r.ok, sourceUrl: j && j.source_url ? j.source_url : null, err: j && j.message ? j.message : null };
          }, { wpNonce: nonce, fileName, base64Data, mimeType });

          if (upRes && upRes.ok && upRes.sourceUrl) {
            wpSourceUrl = upRes.sourceUrl;
            mediaCache[fileName] = wpSourceUrl;
            mediaCacheDirty = true;
          }
        }

        if (wpSourceUrl) {
          const escaped = fileName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const ghPattern = new RegExp(`https://raw\\.githubusercontent\\.com/[^"'\\s)]+/${escaped}(?:\\?[^"'\\s)]*)?`, 'g');
          const relPattern = new RegExp(`(?<=["'(])${escaped}(?:\\?[^"'\\s)]*)?`, 'g');
          rawHtml = rawHtml.replace(ghPattern, wpSourceUrl).replace(relPattern, wpSourceUrl);
        }
      }

      const blockContent = '<!-- wp:html -->\n' + rawHtml + '\n<!-- /wp:html -->';
      const res = await page.evaluate(async ({ wpNonce, target, content, refInfo }) => {
        const bodyObj = {
          title: target.title,
          slug: target.slug,
          status: 'publish',
          comment_status: 'closed',
          excerpt: target.excerpt,
          content,
          featured_media: 1875,
          template: refInfo.template || ''
        };
        if (refInfo.meta) {
          bodyObj.meta = refInfo.meta;
        }
        const r = await fetch(`/wp-json/wp/v2/pages/${target.id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-WP-Nonce': wpNonce },
          body: JSON.stringify(bodyObj)
        });
        const j = await r.json();
        return {
          ok: r.status === 200,
          status: r.status,
          slug: target.slug,
          id: j.id || target.id,
          link: j.link || `https://www.bareunhaniwon.com/${target.slug}/`,
          err: j.message || null
        };
      }, { wpNonce: nonce, target, content: blockContent, refInfo });

      if (!res.ok) {
        throw new Error(`[${target.slug}] WP REST status ${res.status}: ${res.err || 'Unknown error'}`);
      }
      deployedResults.push(res);
    }

    if (mediaCacheDirty) {
      fs.writeFileSync(mediaCachePath, JSON.stringify(mediaCache, null, 2) + '\n', 'utf8');
    }

    await page.goto('https://www.bareunhaniwon.com/wp-admin/options-general.php?page=wpsupercache', { waitUntil: 'domcontentloaded', timeout: 15000 }).catch(() => {});
    await page.evaluate(() => {
      const btn = document.querySelector('input[name="wp_delete_cache"], button[name="wp_delete_cache"]');
      if (btn && btn.form) btn.form.submit();
    }).catch(() => {});
    await new Promise(r => setTimeout(r, 1200));

    console.log(JSON.stringify({
      ok: true,
      count: deployedResults.length,
      pages: deployedResults
    }));
  } catch (err) {
    console.error('[DETAIL PAGE FAST DEPLOY ERROR]', err.message);
    process.exitCode = 1;
  } finally {
    if (browser) await browser.close().catch(() => {});
    process.exit(process.exitCode || 0);
  }
})();
