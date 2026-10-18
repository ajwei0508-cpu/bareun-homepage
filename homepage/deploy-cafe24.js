const fs = require('fs');
const path = require('path');
const puppeteer = require('C:\\Users\\0508a\\.gemini\\antigravity\\brain\\c3430dcf-0c08-41eb-8e46-6f7a8809cff3\\scratch\\node_modules\\puppeteer-core');

const PAGES_TO_DEPLOY = [
  { id: 46,  slug: '46-2',            title: '메인',                          file: 'wordpress-main-home.html' },
  { id: 125, slug: 'body-explorer',   title: '바른한의원 3D 질환 쇼룸',         file: 'wordpress-body-explorer.html' },
  { id: 126, slug: 'director',        title: '안정위 대표원장',                 file: 'wordpress-director.html' },
  { id: 127, slug: 'chuna',           title: '바른 추나 · 척추교정',            file: 'wordpress-chuna.html' },
  { id: 105, slug: 'growth',          title: '바른 성장 · 성조숙증',            file: 'wordpress-growth.html' },
  { id: 66,  slug: 'diet-zero',       title: '바른 다이어트 · 식욕ZERO',        file: 'wordpress-diet.html' },
  { id: 130, slug: 'hairloss',        title: '바른 탈모 · 모근재생',            file: 'wordpress-hairloss.html' },
  { id: 96,  slug: 'gongjindan-2',    title: '바른 황제공진단',                 file: 'wordpress-gongjindan.html' },
  { id: 133, slug: 'prostate',        title: '바른 전립선 · 남성활력',          file: 'wordpress-prostate.html' },
  { id: 134, slug: 'lifting-compare', title: '바른리프팅 시술 전후 윤곽진단',    file: 'wordpress-lifting-compare.html' }
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

      const res = await page.evaluate(async ({ wpNonce, id, slug, title, content, meta, template }) => {
        const endpoint = id ? ('/wp-json/wp/v2/pages/' + id) : '/wp-json/wp/v2/pages';
        const bodyObj = {
          title: title,
          slug: slug,
          status: 'publish',
          content: content,
          template: template || ''
        };
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
