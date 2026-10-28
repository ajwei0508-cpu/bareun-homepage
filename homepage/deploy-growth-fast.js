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

(async () => {
  let browser;
  try {
    const wpFilePath = path.join(__dirname, 'wordpress-growth.html');
    if (!fs.existsSync(wpFilePath)) {
      throw new Error('wordpress-growth.html not found');
    }
    const rawHtml = fs.readFileSync(wpFilePath, 'utf8');
    const blockContent = '<!-- wp:html -->\n' + rawHtml + '\n<!-- /wp:html -->';

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
    if (!nonce) throw new Error('Failed to get WP REST Nonce');

    const res = await page.evaluate(async ({ wpNonce, content }) => {
      const ref46Res = await fetch('/wp-json/wp/v2/pages/46?context=edit', { headers: { 'X-WP-Nonce': wpNonce } });
      const ref46 = await ref46Res.json();
      const bodyObj = {
        title: '바른 성장 · 성조숙증',
        slug: 'growth',
        status: 'publish',
        comment_status: 'closed',
        excerpt: '소아내분비학 및 약리학 학술 논문 근거를 바탕으로 성장판 연골 증식과 호흡기 면역을 함께 돌봅니다.',
        content,
        featured_media: 1875,
        template: (ref46 && ref46.template) ? ref46.template : ''
      };
      if (ref46 && ref46.meta && Object.keys(ref46.meta).length > 0) {
        bodyObj.meta = ref46.meta;
      }
      const r = await fetch('/wp-json/wp/v2/pages/105', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-WP-Nonce': wpNonce },
        body: JSON.stringify(bodyObj)
      });
      const j = await r.json();
      return { status: r.status, id: j.id, link: j.link, err: j.message };
    }, { wpNonce: nonce, content: blockContent });

    await page.goto('https://www.bareunhaniwon.com/wp-admin/options-general.php?page=wpsupercache', { waitUntil: 'domcontentloaded', timeout: 15000 }).catch(() => {});
    await page.evaluate(() => {
      const btn = document.querySelector('input[name="wp_delete_cache"], button[name="wp_delete_cache"]');
      if (btn && btn.form) btn.form.submit();
    }).catch(() => {});
    await new Promise(r => setTimeout(r, 1200));

    console.log(JSON.stringify({ ok: res.status === 200, status: res.status, id: res.id, link: res.link || 'https://www.bareunhaniwon.com/growth/', err: res.err || null }));
  } catch (err) {
    console.error('[GROWTH FAST DEPLOY ERROR]', err.message);
    process.exitCode = 1;
  } finally {
    if (browser) await browser.close().catch(() => {});
    process.exit(process.exitCode || 0);
  }
})();
