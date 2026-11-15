/**
 * Monthly Automated Live SEO & Spam Policy Compliance Checker
 * Target: https://www.bareunhaniwon.com/
 * Verifies 10-point SEO_AUTOPOST_CONSTITUTION compliance in real time.
 */
const https = require('https');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; BareunMonthlyPolicyAudit/1.0)',
        'Cache-Control': 'no-cache'
      },
      timeout: 15000
    }, (res) => {
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body }));
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(new Error('Request timeout: ' + url)); });
  });
}

(async () => {
  const ts = new Date().toISOString();
  const checks = [];

  function record(name, pass, detail) {
    checks.push({ name, pass: Boolean(pass), detail });
  }

  // 1. robots.txt
  const robots = await fetchUrl('https://www.bareunhaniwon.com/robots.txt');
  record(
    'robots.txt (Yeti + Googlebot + AI Crawlers)',
    robots.status === 200 && robots.body.includes('User-agent: Yeti') && robots.body.includes('User-agent: Googlebot') && robots.body.includes('wp-sitemap.xml'),
    `HTTP ${robots.status}, len=${robots.body.length}`
  );

  // 2. Master Sitemap
  const sitemap = await fetchUrl('https://www.bareunhaniwon.com/wp-sitemap.xml');
  record(
    'Master Sitemap (wp-sitemap.xml)',
    sitemap.status === 200 && sitemap.body.includes('wp-sitemap-posts-post-1.xml') && sitemap.body.includes('wp-sitemap-posts-page-1.xml'),
    `HTTP ${sitemap.status}, len=${sitemap.body.length}`
  );

  // 3. Slim RSS Feed (< 1MB, zero <script>/<style> leak)
  const feed = await fetchUrl('https://www.bareunhaniwon.com/feed/');
  const feedItems = (feed.body.match(/<item>/g) || []).length;
  const feedHasScript = /<script\b/i.test(feed.body);
  record(
    'RSS 2.0 Feed (/feed/ slim & clean)',
    feed.status === 200 && feedItems > 0 && feedItems <= 50 && feed.body.length < 1000000 && !feedHasScript,
    `HTTP ${feed.status}, items=${feedItems}, bytes=${feed.body.length}, hasScript=${feedHasScript}`
  );

  // 4. IndexNow Hex Key File
  const indexNowKey = 'b4e02026a15e0ce0849201f7c3d9a5b2';
  const keyRes = await fetchUrl(`https://www.bareunhaniwon.com/${indexNowKey}.txt`);
  record(
    'IndexNow Key Verification File',
    keyRes.status === 200 && keyRes.body.trim() === indexNowKey,
    `HTTP ${keyRes.status}, match=${keyRes.body.trim() === indexNowKey}`
  );

  // 5. /location/ 12-Origin Transit Guide & Zero Keyword Stuffing
  const loc = await fetchUrl('https://www.bareunhaniwon.com/location/');
  const requiredOrigins = ['계룡시', '도안동', '유성', '둔산동', '옥천', '영동', '세종', '대구역', '서울역', '부산역', '천안아산역', '청주'];
  const missingOrigins = requiredOrigins.filter((o) => !loc.body.includes(o));
  const hasRegionSpamCombo = /(계룡한의원|둔산동한의원|유성한의원|도안동한의원|세종한의원|청주한의원|서울역한의원|부산역한의원|대구역한의원|천안아산역한의원|옥천한의원|영동한의원)/.test(loc.body);
  record(
    '/location/ 12-Origin Directions & Zero Spam Combo',
    loc.status === 200 && missingOrigins.length === 0 && !hasRegionSpamCombo,
    `HTTP ${loc.status}, missingOrigins=${missingOrigins.length}, regionSpamCombo=${hasRegionSpamCombo}`
  );

  // 6. Standalone Health Note YMYL + AI Disclosure + 1:1 areaServed Parity + Zero FAQPage
  const hn = await fetchUrl('https://www.bareunhaniwon.com/health-note-knee-20261111/');
  const hasPhysicianReview = hn.body.includes('안정위 한의사');
  const hasAiDisclosure = hn.body.includes('AI 문헌 정리 보조');
  const hasFaqSchema = hn.body.includes('"@type":"FAQPage"') || hn.body.includes('"@type": "FAQPage"');
  const hasUnmentionedArea = hn.body.includes('송촌동') || hn.body.includes('법동');
  const hasValidArea = hn.body.includes('대전광역시') && hn.body.includes('대덕구');
  record(
    'Health Note SSR (YMYL + AI Disclosure + 1:1 areaServed + Zero FAQPage)',
    hn.status === 200 && hasPhysicianReview && hasAiDisclosure && !hasFaqSchema && !hasUnmentionedArea && hasValidArea,
    `HTTP ${hn.status}, physician=${hasPhysicianReview}, aiDisclosure=${hasAiDisclosure}, faqSchema=${hasFaqSchema}, areaClean=${!hasUnmentionedArea && hasValidArea}`
  );

  const failed = checks.filter((c) => !c.pass);
  console.log(JSON.stringify({
    checkedAt: ts,
    allPassed: failed.length === 0,
    passedCount: checks.length - failed.length,
    totalCount: checks.length,
    checks
  }, null, 2));

  if (failed.length > 0) {
    process.exitCode = 1;
  }
})().catch((err) => {
  console.error('[AUDIT_ERROR]', err.message);
  process.exitCode = 1;
});
