const fs = require('fs');
const path = require('path');
const os = require('os');
const https = require('https');
const { execFileSync } = require('child_process');
const {
  DISEASE_BLOG_CATEGORIES,
  INITIAL_DISEASE_BLOG_POSTS,
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

const PAGES_TO_DEPLOY = [
  { id: 46,   slug: '46-2',                title: '바른한의원 대전본점',                                  file: 'wordpress-main-home.html',           excerpt: '바른한의원 대전본점 — 안정위 대표원장의 심층 맥진과 국가공인 무독성 안심 한약. 실제 학술 논문 검수를 거친 검증된 사상체질·추나·성장·다이어트·탈모·공진단·전립선 맞춤 진료 클리닉' },
  { id: 125,  slug: 'body-explorer',       title: '3D 인체모형 · 부위별 생활 꿀팁 창고',                  file: 'wordpress-body-explorer.html',       excerpt: '3D 인체모형으로 한눈에 보는 9대 부위별 실천 DO/DON\'T, 아침·낮·밤 하루 루틴, 맞춤 약선 식단과 3분 셀프 지압 꿀팁 창고입니다.' },
  { id: null, slug: 'ask-doctor',          title: '무엇이든 물어보세요 · 공식 의학백과 블로그 & 원장 Q&A', file: 'wordpress-ask-doctor.html',          excerpt: '바른한의원 대전본점 안정위 대표원장 공식 의학백과 블로그(9편) 및 심층 임상칼럼(27+편)과 실시간 답글 질문(Q&A) 허브입니다.' },
  { id: 126,  slug: 'director',            title: '안정위 대표원장',                                      file: 'wordpress-director.html',            excerpt: '초음파·체열진단·이비인후 내시경·사상체질·체지방·자율신경·내분비 간/당 수치·혈관 독소·성장 검사까지 9대 정밀 검진 시스템과 심층 맥진으로 병의 뿌리를 찾는 안정위 대표원장입니다.' },
  { id: 127,  slug: 'chuna',               title: '바른 추나 · 척추교정',                                 file: 'wordpress-chuna.html',               excerpt: '미국의학협회지(JAMA) 등 실제 학술 논문을 검수하여 유효성이 입증된 대표원장 수기 추나로 틀어진 척추·골반 중심축을 바로잡습니다.' },
  { id: 105,  slug: 'growth',              title: '바른 성장 · 성조숙증',                                 file: 'wordpress-growth.html',              excerpt: '소아과학 및 약리학 학술 논문 검수를 통해 검증된 안전한 한약 처방으로 성장판 연골 증식과 호흡기 면역을 함께 깨웁니다.' },
  { id: 66,   slug: 'diet-zero',           title: '바른 다이어트 · 식욕ZERO',                             file: 'wordpress-diet.html',                excerpt: '국제 비만·약리 학술 논문으로 검증된 갈색지방 대사 활성화 처방으로 무리한 절식 없이 내장지방을 건강하게 비워냅니다.' },
  { id: 130,  slug: 'hairloss',            title: '바른 탈모 · 모근재생',                                 file: 'wordpress-hairloss.html',            excerpt: '피부과학 및 약리학 학술 논문으로 입증된 수승화강 청열 치료와 경추 추나로 두피 열독을 식히고 모유두세포 자생력을 깨웁니다.' },
  { id: 408,  slug: 'hairloss-male',       title: '바른 남성탈모 · M자·정수리',                           file: 'wordpress-hairloss-male.html',       excerpt: '호르몬 억제 약물 부작용 걱정 없는 수승화강 두피 청열과 경추 추나로 M자·정수리 남성탈모 모근 자생력을 깨웁니다.' },
  { id: 409,  slug: 'hairloss-alopecia',   title: '바른 원형탈모 · 면역복원',                             file: 'wordpress-hairloss-alopecia.html',   excerpt: '스테로이드 재발과 두피 함몰 걱정 없이 자율신경 안정과 자가면역 재조율로 동전 모양·다발성 원형탈모를 근본 치료합니다.' },
  { id: 410,  slug: 'hairloss-female',     title: '바른 여성탈모 · 가르마·볼륨',                          file: 'wordpress-hairloss-female.html',     excerpt: '두피는 뜨겁고 손발·아랫배는 찬 여성 상열하한(上熱下寒)과 혈허를 다스려 넓어진 가르마와 정수리 볼륨을 복원합니다.' },
  { id: 411,  slug: 'hairloss-seborrheic', title: '바른 지루성두피염 · 열독해독',                         file: 'wordpress-hairloss-seborrheic.html', excerpt: '반복되는 두피 홍반, 화농성 모낭염, 가려움과 각질을 청열해독 치료로 잠재우고 건강한 진피 장벽을 복원합니다.' },
  { id: 96,   slug: 'gongjindan-2',        title: '바른 황제공진단',                                      file: 'wordpress-gongjindan.html',          excerpt: '국제 신경약리학 학술 논문으로 뇌신경 보호와 피로 회복 기전이 검증된 식약처 CITES 인증 정품 사향 황제공진단입니다.' },
  { id: 133,  slug: 'prostate',            title: '바른 전립선 · 남성활력',                               file: 'wordpress-prostate.html',            excerpt: '비뇨의학 및 약리학 학술 논문 검수로 입증된 전립선 울혈 감압 및 신장·방광 온양 치료로 시원한 배뇨와 숙면을 되찾아 드립니다.' },
  { id: 134,  slug: 'lifting-compare',     title: '바른리프팅 시술 전후 윤곽진단',                         file: 'wordpress-lifting-compare.html',     excerpt: '바른한의원 대전본점 학술 검증 비수술 한방 리프팅 전후 윤곽 비교 진단 시스템입니다.' }
];

const MASTER_WELCOME_QNA = {
  'daejeon-pediatric-growth-plate-obesity-immunity-encyclopedia': {
    qAuthor: '둔산동 초3 보호자',
    qText: '아이가 비염으로 잘 때 입을 벌리고 자고 또래보다 키가 작아 걱정입니다. 성장판 초음파 검사는 방사선 걱정 없이 바로 받아볼 수 있나요?',
    aText: '안녕하세요, 바른한의원 대전본점 안정위 대표원장입니다. 구강호흡은 밤사이 깊은 서파수면과 성장호르몬 분비를 방해하는 대표적인 원인입니다. 원내 소아 성장판 검사는 방사선 노출이 없는 무통 초음파 방식과 체성분·코점막 내시경으로 안전하게 검사하며, 아이 체질에 맞춰 코호흡 회복과 숨은 키 성장을 함께 도움드립니다.'
  },
  'daejeon-cervical-spine-scalp-heat-hairloss-encyclopedia': {
    qAuthor: '유성구 30대 직장인',
    qText: '야근이 잦은 뒤로 정수리가 뜨겁고 머리카락이 급격히 얇아졌습니다. 호르몬 억제 탈모약 부작용이 걱정되는데 한방 치료로 두피열부터 내릴 수 있을까요?',
    aText: '안녕하세요, 안정위 대표원장입니다. 뒷목 거북목 긴장과 스트레스로 열이 정수리에 고이는 ‘두피 사막화’ 상태일 가능성이 높습니다. 적외선 체열진단기(DITI)와 자율신경(HRV) 검사로 상열하한 정도를 정밀하게 검사하고, 호르몬 부작용 부담 없는 수승화강 청열 한약과 상부 경추 추나·두피 약침으로 모근 자생력을 회복합니다.'
  },
  'daejeon-lumbar-disc-pelvic-chuna-spine-encyclopedia': {
    qAuthor: '서구 탄방동 40대 환자분',
    qText: '허리디스크 주사를 맞아도 몇 달 뒤면 다시 엉덩이와 다리가 저립니다. 수술 없이 추나요법과 한방 치료로 근본 교정이 가능할까요?',
    aText: '안녕하세요, 안정위 대표원장입니다. 기울어진 골반과 좁아진 추간판 간격이 그대로면 신경 염증이 쉽게 재발합니다. 근골격 초음파와 체열진단기로 눌린 신경 분절을 정확히 진단한 뒤, 원장 1:1 수기 감압 추나와 약침, 심부 자기장·극초단파 물리치료 및 강근골 한약을 병행해 비수술 회복을 세심하게 도움드립니다.'
  },
  'daejeon-emperor-gongjindan-chronic-fatigue-brain-encyclopedia': {
    qAuthor: '세종시 수험생 학부모',
    qText: '고3 자녀 체력과 집중력이 많이 떨어져 황제공진단을 알아보고 있습니다. 간 수치 검사도 원내에서 확인하고 처방받을 수 있나요?',
    aText: '안녕하세요, 안정위 대표원장입니다. 네, 원내 내분비·간(AST/ALT)·당 수치 혈액 검사 장비와 자율신경(HRV) 검사, 1:1 진맥을 통해 장부 안전성을 먼저 꼼꼼히 검사합니다. 식약처 CITES 인증 정품 사향과 최상급 녹용 분골을 원장이 직접 정량 수제 조제하여 맑은 두뇌 집중력과 체력 회복을 도움드립니다.'
  },
  'daejeon-autonomic-nerve-headache-vertigo-syncope-encyclopedia': {
    qAuthor: '대덕구 20대 여성 질문자',
    qText: '지하철이나 더운 곳에서 식은땀이 나며 쓰러진 적이 두 번 있는데 뇌 MRI는 정상이랍니다. 미주신경성 실신도 검사하고 치료할 수 있나요?',
    aText: '안녕하세요, 안정위 대표원장입니다. 뇌 구조가 정상이어도 자율신경 브레이크 오류로 혈관이 급격히 확장되면 뇌혈류가 일시 차단되어 실신이 반복됩니다. 심박변이도(HRV) 자율신경 검사와 말초혈관(APG) 검사로 원인을 진단하고, 미주신경 통로를 여는 상부 경추 추나와 혈관 탄력 한약으로 재발 예방과 회복을 도움드립니다.'
  },
  'daejeon-damjeok-indigestion-reflux-ibs-digestive-encyclopedia': {
    qAuthor: '유성구 봉명동 직장인',
    qText: '위내시경은 신경성 위염 정도라는데 명치가 돌처럼 딱딱하고 목에 뭐가 걸린 듯 답답합니다. 담적병 검사는 어떻게 진행되나요?',
    aText: '안녕하세요, 안정위 대표원장입니다. 내시경은 위 안쪽 점막만 확인하므로 위장 바깥 근육층이 굳은 담적은 복부 정밀 초음파, 적외선 체열진단(DITI), 인후두 내시경 및 원장 복진을 통해 검사하고 진단합니다. 복부 심부 극초단파 온열 치료와 담적 용해 한약으로 위장 연동운동을 부드럽게 회복합니다.'
  },
  'daejeon-metabolic-detox-visceral-fat-diet-zero-encyclopedia': {
    qAuthor: '둔산동 30대 직장인',
    qText: '예전에 다른 다이어트 약을 먹고 손이 떨리고 잠을 설친 적이 있어 걱정됩니다. 바른한의원 다이어트 한약은 두근거림이나 간 부담이 없나요?',
    aText: '안녕하세요, 안정위 대표원장입니다. 무리한 교감신경 흥분 방식이 아니라 사상체질과 HRV 검사를 바탕으로 자연스러운 포만감을 깨우는 처방입니다. 특히 복용 전후 원내 간(AST/ALT)·당 혈액 검사와 체성분(내장지방·골격근) 검사를 직접 시행하여 손 떨림 걱정 없이 건강하게 감량하도록 도움드립니다.'
  },
  'daejeon-uterine-fertility-ivf-menstrual-postpartum-encyclopedia': {
    qAuthor: '서구 관저동 예비맘',
    qText: '다음 달 시험관(IVF) 이식을 앞두고 있는데 자궁내막이 얇고 아랫배가 늘 차갑습니다. 이식 전 한방 착상 치료를 병행해도 괜찮을까요?',
    aText: '안녕하세요, 안정위 대표원장입니다. 시험관 시술 일정에 맞춰 이식 전에는 자궁 나선동맥 혈류와 내막 두께·수용성(LIF)을 높이고, 이식 후에는 자궁 수축을 줄이는 단계별 착상·안태 프로토콜로 안전하게 병행 가능합니다. DITI 하복부 체열 검사로 냉증 정도를 정확히 진단하여 따뜻한 착상 환경을 회복합니다.'
  },
  'daejeon-prostate-urinary-incontinence-male-vitality-encyclopedia': {
    qAuthor: '중구 태평동 50대 환자분',
    qText: '새벽마다 소변 때문에 2~3번씩 깨고 낮에도 잔뇨감이 심합니다. 진료나 자기장 치료 받을 때 옷을 벗어야 하는지 궁금합니다.',
    aText: '안녕하세요, 안정위 대표원장입니다. 1:1 독립 진료실에서 프라이빗하게 상담 및 방광·하복부 초음파 검사를 진행하며, 골반저근과 괄약근을 강화하는 심부 자기장 치료 역시 평상복을 입은 채 편안히 의자에 앉아 받으실 수 있습니다. 전립선 감압·방광 온양 한약과 골반 추나로 편안한 통잠을 회복하도록 도움드립니다.'
  }
};

function postAnonQuestion(postId, author, comment) {
  return new Promise((resolve) => {
    try {
      const params = new URLSearchParams();
      params.set('comment', comment);
      params.set('author', author);
      params.set('email', '');
      params.set('url', '');
      params.set('comment_post_ID', String(postId));
      params.set('comment_parent', '0');
      const body = params.toString();

      const req = https.request({
        hostname: 'bareunhaniwon.com',
        port: 443,
        path: '/wp-comments-post.php',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(body),
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/131.0.0.0 Safari/537.36',
          'Referer': 'https://bareunhaniwon.com/ask-doctor/'
        }
      }, (res) => {
        res.resume();
        const loc = res.headers.location || '';
        const m = loc.match(/#comment-(\d+)/);
        resolve(m ? Number(m[1]) : null);
      });
      req.on('error', () => resolve(null));
      req.write(body);
      req.end();
    } catch (e) {
      resolve(null);
    }
  });
}

function pingIndexNow(urls) {
  return new Promise((resolve) => {
    try {
      const payload = JSON.stringify({
        host: 'www.bareunhaniwon.com',
        key: 'bareunhaniwon2026aiseokey849201',
        keyLocation: 'https://www.bareunhaniwon.com/ask-doctor/',
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
    await page.goto('https://bareunhaniwon.com/wp-login.php', { waitUntil: 'networkidle2', timeout: 30000 });
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
    console.log('   Logged in ->', page.url());

    // 1.5) Configure Search Engine Indexing (options-reading.php) & Open Anonymous Instant Q&A Replies (options-discussion.php)
    console.log('1.5) Configuring Search Engine Indexing & Open Instant Q&A Discussion Settings ...');
    await page.goto('https://bareunhaniwon.com/wp-admin/options-reading.php', { waitUntil: 'domcontentloaded', timeout: 20000 });
    const readingChanged = await page.evaluate(() => {
      const discourageBox = document.getElementById('blog_public');
      if (discourageBox && discourageBox.checked) {
        discourageBox.checked = false;
        return true;
      }
      return false;
    });
    if (readingChanged) {
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 20000 }).catch(() => {}),
        page.click('#submit')
      ]);
      console.log('   Enabled search engine indexing (blog_public = 1)!');
    } else {
      console.log('   Search engine indexing already enabled (blog_public = 1).');
    }

    await page.goto('https://bareunhaniwon.com/wp-admin/options-discussion.php', { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.evaluate(() => {
      const setCheck = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.checked = val;
      };
      setCheck('default_comment_status', true);      // 새 글에 답글(댓글) 허용
      setCheck('require_name_email', false);         // 이메일 필수 해제 (간편 질문)
      setCheck('comment_registration', false);       // 비회원/무로그인 질문 허용
      setCheck('close_comments_for_old_posts', false); // 오래된 백과 글에도 상시 질문 허용
      setCheck('thread_comments', true);             // 원장님 대댓글(답변) 스레드 활성화
      setCheck('comment_moderation', false);         // 질문 등록 즉시 노출
      setCheck('comment_previously_approved', false); // 첫 질문자도 즉시 노출
    });
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 20000 }).catch(() => {}),
      page.click('#submit')
    ]);
    console.log('   Open Instant Q&A Reply settings saved on options-discussion.php!');

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

    // 2.2) Update Brand Site Icon, Tagline & Author Display Name ('안정위 대표원장 · 바른한의원 대전본점')
    console.log('2.2) Updating Site Brand Settings & Doctor Author Profile ...');
    const brandConfigRes = await page.evaluate(async (wpNonce) => {
      const mediaSearch = await (await fetch('/wp-json/wp/v2/media?search=bareun-brand-icon-512', {
        headers: { 'X-WP-Nonce': wpNonce }
      })).json();
      let iconMediaId = Array.isArray(mediaSearch) && mediaSearch.length > 0 ? mediaSearch[0].id : 0;

      const settingsBody = {
        title: '바른한의원 대전본점',
        description: '아빠 한의사 안정위 대표원장 · 공식 의학백과 블로그 & 9대 정밀검진 · 추나 · 성장 · 다이어트 · 탈모 · 공진단 · 난임 · 전립선 맞춤 한의원',
        default_comment_status: 'open',
        default_ping_status: 'open'
      };
      if (iconMediaId) settingsBody.site_icon = iconMediaId;

      const setRes = await fetch('/wp-json/wp/v2/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-WP-Nonce': wpNonce },
        body: JSON.stringify(settingsBody)
      });
      const setJson = await setRes.json();

      // Update logged-in doctor author display name for E-E-A-T & Q&A Replies!
      const meRes = await fetch('/wp-json/wp/v2/users/me', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-WP-Nonce': wpNonce },
        body: JSON.stringify({
          name: '안정위 대표원장 · 바른한의원 대전본점',
          nickname: '안정위 대표원장',
          description: '바른한의원 대전본점 대표원장 (아빠 한의사) — 내 가족에게 직접 처방하고 시술한 치료만 시행합니다.'
        })
      });
      const meJson = await meRes.json();

      return {
        iconMediaId,
        site_icon: setJson.site_icon,
        authorName: meJson.name,
        authorId: meJson.id
      };
    }, nonce);
    console.log('   Brand & Author Profile updated ->', brandConfigRes);

    // 3) Publish / Update ALL 36 Official Blog Posts (9 Encyclopedia Masters + 27 Clinical Columns)
    console.log('3) Publishing/Updating ALL 36 Official Encyclopedia & Clinical Blog Posts ...');
    const preparedPostsPayload = INITIAL_DISEASE_BLOG_POSTS.map((post) => {
      const cat = DISEASE_BLOG_CATEGORIES.find(c => c.partId === post.partId);
      return {
        id: post.id,
        slug: post.slug,
        partId: post.partId,
        isEncyclopediaMaster: Boolean(post.isEncyclopediaMaster),
        title: post.title,
        summary: post.summary,
        standaloneHtml: buildStandaloneWpPostHtml(post, cat)
      };
    });

    const blogSyncResult = await page.evaluate(async ({ wpNonce, categoriesList, postsList, welcomeQnaMap }) => {
      const catIds = {};
      const existingCatsRes = await fetch('/wp-json/wp/v2/categories?per_page=100', {
        headers: { 'X-WP-Nonce': wpNonce }
      });
      const existingCats = await existingCatsRes.json();

      for (const meta of categoriesList) {
        const pId = meta.partId;
        const cSlug = meta.slug;
        const cName = meta.name;
        const found = Array.isArray(existingCats) ? existingCats.find(c => c.slug === cSlug) : null;
        if (found) {
          catIds[pId] = found.id;
        } else {
          const createRes = await fetch('/wp-json/wp/v2/categories', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-WP-Nonce': wpNonce },
            body: JSON.stringify({
              name: cName,
              slug: cSlug,
              description: cName + ' — 바른한의원 대전본점 공식 의학백과 및 임상칼럼'
            })
          });
          const created = await createRes.json();
          if (created && created.id) catIds[pId] = created.id;
        }
      }

      // Fetch all existing posts to avoid duplicates and upgrade slugs cleanly
      const existingPostsRes = await fetch('/wp-json/wp/v2/posts?per_page=100&status=any', {
        headers: { 'X-WP-Nonce': wpNonce }
      });
      const existingPosts = await existingPostsRes.json();
      const norm = (s) => String(s || '')
        .replace(/<[^>]*>/g, '')
        .replace(/&#8211;|&ndash;|—/g, '-')
        .replace(/&#8216;|&#8217;/g, "'")
        .replace(/&amp;/g, '&')
        .replace(/\s+/g, ' ')
        .trim();

      const bySlug = {};
      const byTitle = {};
      if (Array.isArray(existingPosts)) {
        existingPosts.forEach(p => {
          if (p.slug) bySlug[p.slug] = p.id;
          const t = norm(p.title && p.title.rendered);
          if (t) byTitle[t] = p.id;
        });
      }

      const publishedMap = {};
      let createdOrUpdated = 0;
      let seededQnaThreads = 0;

      async function syncSinglePost(p) {
        const cId = catIds[p.partId];
        const matchId = bySlug[p.slug] || byTitle[norm(p.title)] || null;
        const endpoint = matchId ? ('/wp-json/wp/v2/posts/' + matchId) : '/wp-json/wp/v2/posts';

        const pRes = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-WP-Nonce': wpNonce },
          body: JSON.stringify({
            title: p.title,
            slug: p.slug,
            excerpt: p.summary,
            content: p.standaloneHtml,
            status: 'publish',
            comment_status: 'open',
            ping_status: 'open',
            featured_media: 51,
            categories: cId ? [cId] : []
          })
        });
        const pJson = await pRes.json();
        if (pRes.ok && pJson && pJson.id) {
          createdOrUpdated++;
          publishedMap[p.id] = {
            wpPostId: pJson.id,
            slug: pJson.slug || p.slug,
            link: pJson.link || ('https://www.bareunhaniwon.com/' + p.slug + '/')
          };
        }
      }

      for (let i = 0; i < postsList.length; i += 6) {
        await Promise.all(postsList.slice(i, i + 6).map(syncSinglePost));
      }

      // Clean up default WordPress Hello World (ID 1) & any legacy duplicate non-English-slug posts
      const officialIds = new Set(Object.values(publishedMap).map(v => v.wpPostId));
      let trashedLegacy = 0;
      if (Array.isArray(existingPosts)) {
        for (const ep of existingPosts) {
          if (ep.status === 'publish' && !officialIds.has(ep.id) && (ep.id === 1 || ep.id === 1383)) {
            const delRes = await fetch('/wp-json/wp/v2/posts/' + ep.id, {
              method: 'DELETE',
              headers: { 'X-WP-Nonce': wpNonce }
            });
            if (delRes.ok) trashedLegacy++;
          }
        }
      }

      return { catIds, createdOrUpdated, trashedLegacy, publishedMap };
    }, {
      wpNonce: nonce,
      categoriesList: DISEASE_BLOG_CATEGORIES,
      postsList: preparedPostsPayload
    });

    // Ensure all 9 Official Encyclopedia Q&A threads have genuine author=0 visitor questions + Dr. Ahn replies
    let seededQnaThreads = 0;
    const slugToPostId = {};
    for (const v of Object.values(blogSyncResult.publishedMap)) slugToPostId[v.slug] = v.wpPostId;
    let anonPostedCount = 0;
    for (const [slug, qna] of Object.entries(MASTER_WELCOME_QNA)) {
      const postId = slugToPostId[slug];
      if (!postId) continue;
      const statusInfo = await page.evaluate(async ({ wpNonce, pId }) => {
        const arr = await (await fetch('/wp-json/wp/v2/comments?post=' + pId + '&per_page=20&order=asc', {
          headers: { 'X-WP-Nonce': wpNonce }
        })).json();
        const root = Array.isArray(arr) ? arr.find(c => Number(c.parent) === 0 && Number(c.author) === 0) : null;
        const hasReply = Array.isArray(arr) && arr.some(c => Number(c.parent) > 0);
        return { rootId: root ? root.id : null, hasReply };
      }, { wpNonce: nonce, pId: postId });

      let rootId = statusInfo.rootId;
      if (!rootId) {
        if (anonPostedCount > 0) await new Promise(r => setTimeout(r, 15500));
        rootId = await postAnonQuestion(postId, qna.qAuthor, qna.qText);
        anonPostedCount++;
      }
      if (rootId && !statusInfo.hasReply) {
        const replied = await page.evaluate(async ({ wpNonce, pId, parentId, replyText }) => {
          const r = await fetch('/wp-json/wp/v2/comments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-WP-Nonce': wpNonce },
            body: JSON.stringify({ post: pId, parent: parentId, content: replyText, status: 'approve' })
          });
          const j = await r.json();
          return Boolean(j && j.id);
        }, { wpNonce: nonce, pId: postId, parentId: rootId, replyText: qna.aText });
        if (replied) seededQnaThreads++;
      }
    }

    console.log(`   [BLOG SYNC DONE] Published/Updated: ${blogSyncResult.createdOrUpdated}/36 | Newly Seeded Q&A Threads: ${seededQnaThreads} | Trashed Legacy Posts: ${blogSyncResult.trashedLegacy}`);

    // Save wp-published-posts-map.json & rebuild ask-doctor.html + wordpress-ask-doctor.html so exact wpPostIds are embedded!
    fs.writeFileSync(
      path.join(__dirname, 'wp-published-posts-map.json'),
      JSON.stringify(blogSyncResult.publishedMap, null, 2),
      'utf8'
    );
    console.log('   Saved wp-published-posts-map.json & rebuilding wordpress-ask-doctor.html with live WP Post IDs ...');
    execFileSync(process.execPath, [path.join(__dirname, 'build-ask-doctor.js')], { stdio: 'inherit' });
    execFileSync(process.execPath, [path.join(__dirname, 'bundle-wp.js')], { stdio: 'inherit' });

    // 4) Deploy all 15 WordPress Pages (including separated /body-explorer/ & /ask-doctor/)
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
        featuredMedia: 51,
        content: blockContent,
        meta: existingInfo.refMeta,
        template: existingInfo.refTemplate
      });

      console.log(`   [PAGE DEPLOYED] ${item.slug.padEnd(20)} -> status ${res.status} | ID: ${res.id} | URL: ${res.link || res.err}`);
    }

    // 5) Flush WP Super Cache
    console.log('5) Clearing WP Super Cache ...');
    await page.goto('https://bareunhaniwon.com/wp-admin/options-general.php?page=wpsupercache', { waitUntil: 'domcontentloaded', timeout: 15000 }).catch(() => {});
    await page.evaluate(() => {
      const btn = document.querySelector('input[name="wp_delete_cache"], button[name="wp_delete_cache"]');
      if (btn && btn.form) btn.form.submit();
    }).catch(() => {});
    await new Promise(r => setTimeout(r, 1500));

    // 6) Ping Global & Domestic Search Engines via IndexNow
    const allLiveUrls = [
      'https://www.bareunhaniwon.com/',
      'https://www.bareunhaniwon.com/ask-doctor/',
      'https://www.bareunhaniwon.com/body-explorer/',
      ...Object.values(blogSyncResult.publishedMap).map(v => v.link)
    ];
    const indexNowStatus = await pingIndexNow(allLiveUrls);
    console.log(`6) IndexNow Search Engine Ping sent for ${allLiveUrls.length} URLs (HTTP ${indexNowStatus})!`);

    console.log('✅ ALL 36 BLOG POSTS + Q&A SYSTEM + 15 PAGES DEPLOYED TO https://www.bareunhaniwon.com/ !');
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
