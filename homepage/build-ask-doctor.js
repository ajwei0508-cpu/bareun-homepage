/**
 * 바른한의원 대전본점 · 『무엇이든 물어보세요』 (공식 의학백과 블로그 & 안정위 대표원장 Q&A 라운지) 빌더
 * - 생성 파일: ask-doctor.html (워드프레스 번들: wordpress-ask-doctor.html -> 실서버 /ask-doctor/)
 * - 핵심 역할:
 *   1) '3D 부위별 생활 꿀팁 창고(body-explorer.html)'와 100% 시각·기능 분리 (로얄 슬레이트 네이비 #0F172A + 15:1 고대비 순백 매거진)
 *   2) 9편의 '공식 의학백과 마스터 블로그' + 27편의 '질환별 심층 임상칼럼'(총 36편+) 및 매일 자동발행 글 실시간 통합
 *   3) 발행된 각 블로그 글 하단에서 회원가입·로그인 없이 즉시 '답글(댓글)로 질문 남기기' & 원장 공식 답변 스레드 지원
 *      (실서버: WordPress /wp-comments-post.php & /wp-json/wp/v2/comments, 로컬: /api/blog-comments)
 *   4) 국내(네이버·다음) + 해외·글로벌 AI 플랫폼(Google, Bing, ChatGPT, Perplexity) 검색 노출 최적화:
 *      정적 크롤러 디렉토리(<nav> 36개 고유 퍼머링크) + 한·영 메타데이터 + CollectionPage/Blog/ItemList JSON-LD
 */
const fs = require('fs');
const path = require('path');

const {
  DISEASE_BLOG_CATEGORIES,
  INITIAL_DISEASE_BLOG_POSTS
} = require('./disease-blog-seed-data.js');

const wpMapPath = path.join(__dirname, 'wp-published-posts-map.json');
const WP_PUBLISHED_MAP = fs.existsSync(wpMapPath)
  ? JSON.parse(fs.readFileSync(wpMapPath, 'utf8'))
  : {};

// Initial Seeded Q&A Conversations (9 Master Encyclopedia Posts) — shown immediately & also seeded to live WP
const INITIAL_QNA_SEED = {
  'daejeon-pediatric-growth-plate-obesity-immunity-encyclopedia': [
    {
      id: 'seed-q-knee-1',
      author: '둔산동 초3 보호자',
      date: '2026-10-25',
      isDoctor: false,
      content: '아이가 비염으로 잘 때 입을 벌리고 자고 또래보다 키가 작아 걱정입니다. 성장판 초음파 검사는 방사선 걱정 없이 바로 받아볼 수 있나요?',
      replies: [
        {
          id: 'seed-a-knee-1',
          author: '안정위 대표원장 · 바른한의원 대전본점',
          date: '2026-10-25',
          isDoctor: true,
          content: '안녕하세요, 바른한의원 대전본점 안정위 대표원장입니다. 구강호흡은 밤사이 깊은 서파수면과 성장호르몬 분비를 방해하는 대표적인 원인입니다. 원내 소아 성장판 검사는 방사선 노출이 없는 무통 초음파 방식과 체성분·코점막 내시경으로 안전하게 검사하며, 아이 체질에 맞춰 코호흡 회복과 숨은 키 성장을 함께 도움드립니다.'
        }
      ]
    }
  ],
  'daejeon-cervical-spine-scalp-heat-hairloss-encyclopedia': [
    {
      id: 'seed-q-cervical-1',
      author: '유성구 30대 직장인',
      date: '2026-10-25',
      isDoctor: false,
      content: '야근이 잦은 뒤로 정수리가 뜨겁고 머리카락이 급격히 얇아졌습니다. 호르몬 억제 탈모약 부작용이 걱정되는데 한방 치료로 두피열부터 내릴 수 있을까요?',
      replies: [
        {
          id: 'seed-a-cervical-1',
          author: '안정위 대표원장 · 바른한의원 대전본점',
          date: '2026-10-25',
          isDoctor: true,
          content: '안녕하세요, 안정위 대표원장입니다. 뒷목 거북목 긴장과 스트레스로 열이 정수리에 고이는 ‘두피 사막화’ 상태일 가능성이 높습니다. 적외선 체열진단기(DITI)와 자율신경(HRV) 검사로 상열하한 정도를 정밀하게 검사하고, 호르몬 부작용 부담 없는 수승화강 청열 한약과 상부 경추 추나·두피 약침으로 모근 자생력을 회복합니다.'
        }
      ]
    }
  ],
  'daejeon-lumbar-disc-pelvic-chuna-spine-encyclopedia': [
    {
      id: 'seed-q-lumbar-1',
      author: '서구 탄방동 40대 환자분',
      date: '2026-10-25',
      isDoctor: false,
      content: '허리디스크 주사를 맞아도 몇 달 뒤면 다시 엉덩이와 다리가 저립니다. 수술 없이 추나요법과 한방 치료로 근본 교정이 가능할까요?',
      replies: [
        {
          id: 'seed-a-lumbar-1',
          author: '안정위 대표원장 · 바른한의원 대전본점',
          date: '2026-10-25',
          isDoctor: true,
          content: '안녕하세요, 안정위 대표원장입니다. 기울어진 골반과 좁아진 추간판 간격이 그대로면 신경 염증이 쉽게 재발합니다. 근골격 초음파와 체열진단기로 눌린 신경 분절을 정확히 진단한 뒤, 원장 1:1 수기 감압 추나와 약침, 심부 자기장·극초단파 물리치료 및 강근골 한약을 병행해 비수술 회복을 세심하게 도움드립니다.'
        }
      ]
    }
  ],
  'daejeon-emperor-gongjindan-chronic-fatigue-brain-encyclopedia': [
    {
      id: 'seed-q-gongjindan-1',
      author: '세종시 수험생 학부모',
      date: '2026-10-25',
      isDoctor: false,
      content: '고3 자녀 체력과 집중력이 많이 떨어져 황제공진단을 알아보고 있습니다. 간 수치 검사도 원내에서 확인하고 처방받을 수 있나요?',
      replies: [
        {
          id: 'seed-a-gongjindan-1',
          author: '안정위 대표원장 · 바른한의원 대전본점',
          date: '2026-10-25',
          isDoctor: true,
          content: '안녕하세요, 안정위 대표원장입니다. 네, 원내 내분비·간(AST/ALT)·당 수치 혈액 검사 장비와 자율신경(HRV) 검사, 1:1 진맥을 통해 장부 안전성을 먼저 꼼꼼히 검사합니다. 식약처 CITES 인증 정품 사향과 최상급 녹용 분골을 원장이 직접 정량 수제 조제하여 맑은 두뇌 집중력과 체력 회복을 도움드립니다.'
        }
      ]
    }
  ],
  'daejeon-autonomic-nerve-headache-vertigo-syncope-encyclopedia': [
    {
      id: 'seed-q-syncope-1',
      author: '대덕구 20대 여성 질문자',
      date: '2026-10-25',
      isDoctor: false,
      content: '지하철이나 더운 곳에서 식은땀이 나며 쓰러진 적이 두 번 있는데 뇌 MRI는 정상이랍니다. 미주신경성 실신도 검사하고 치료할 수 있나요?',
      replies: [
        {
          id: 'seed-a-syncope-1',
          author: '안정위 대표원장 · 바른한의원 대전본점',
          date: '2026-10-25',
          isDoctor: true,
          content: '안녕하세요, 안정위 대표원장입니다. 뇌 구조가 정상이어도 자율신경 브레이크 오류로 혈관이 급격히 확장되면 뇌혈류가 일시 차단되어 실신이 반복됩니다. 심박변이도(HRV) 자율신경 검사와 말초혈관(APG) 검사로 원인을 진단하고, 미주신경 통로를 여는 상부 경추 추나와 혈관 탄력 한약으로 재발 예방과 회복을 도움드립니다.'
        }
      ]
    }
  ],
  'daejeon-damjeok-indigestion-reflux-ibs-digestive-encyclopedia': [
    {
      id: 'seed-q-digest-1',
      author: '유성구 봉명동 직장인',
      date: '2026-10-25',
      isDoctor: false,
      content: '위내시경은 신경성 위염 정도라는데 명치가 돌처럼 딱딱하고 목에 뭐가 걸린 듯 답답합니다. 담적병 검사는 어떻게 진행되나요?',
      replies: [
        {
          id: 'seed-a-digest-1',
          author: '안정위 대표원장 · 바른한의원 대전본점',
          date: '2026-10-25',
          isDoctor: true,
          content: '안녕하세요, 안정위 대표원장입니다. 내시경은 위 안쪽 점막만 확인하므로 위장 바깥 근육층이 굳은 담적은 복부 정밀 초음파, 적외선 체열진단(DITI), 인후두 내시경 및 원장 복진을 통해 검사하고 진단합니다. 복부 심부 극초단파 온열 치료와 담적 용해 한약으로 위장 연동운동을 부드럽게 회복합니다.'
        }
      ]
    }
  ],
  'daejeon-metabolic-detox-visceral-fat-diet-zero-encyclopedia': [
    {
      id: 'seed-q-gut-1',
      author: '둔산동 30대 직장인',
      date: '2026-10-25',
      isDoctor: false,
      content: '예전에 다른 다이어트 약을 먹고 손이 떨리고 잠을 설친 적이 있어 걱정됩니다. 바른한의원 다이어트 한약은 두근거림이나 간 부담이 없나요?',
      replies: [
        {
          id: 'seed-a-gut-1',
          author: '안정위 대표원장 · 바른한의원 대전본점',
          date: '2026-10-25',
          isDoctor: true,
          content: '안녕하세요, 안정위 대표원장입니다. 무리한 교감신경 흥분 방식이 아니라 사상체질과 HRV 검사를 바탕으로 자연스러운 포만감을 깨우는 처방입니다. 특히 복용 전후 원내 간(AST/ALT)·당 혈액 검사와 체성분(내장지방·골격근) 검사를 직접 시행하여 손 떨림 걱정 없이 건강하게 감량하도록 도움드립니다.'
        }
      ]
    }
  ],
  'daejeon-uterine-fertility-ivf-menstrual-postpartum-encyclopedia': [
    {
      id: 'seed-q-uterus-1',
      author: '서구 관저동 예비맘',
      date: '2026-10-25',
      isDoctor: false,
      content: '다음 달 시험관(IVF) 이식을 앞두고 있는데 자궁내막이 얇고 아랫배가 늘 차갑습니다. 이식 전 한방 착상 치료를 병행해도 괜찮을까요?',
      replies: [
        {
          id: 'seed-a-uterus-1',
          author: '안정위 대표원장 · 바른한의원 대전본점',
          date: '2026-10-25',
          isDoctor: true,
          content: '안녕하세요, 안정위 대표원장입니다. 시험관 시술 일정에 맞춰 이식 전에는 자궁 나선동맥 혈류와 내막 두께·수용성(LIF)을 높이고, 이식 후에는 자궁 수축을 줄이는 단계별 착상·안태 프로토콜로 안전하게 병행 가능합니다. DITI 하복부 체열 검사로 냉증 정도를 정확히 진단하여 따뜻한 착상 환경을 회복합니다.'
        }
      ]
    }
  ],
  'daejeon-prostate-urinary-incontinence-male-vitality-encyclopedia': [
    {
      id: 'seed-q-prostate-1',
      author: '중구 태평동 50대 환자분',
      date: '2026-10-25',
      isDoctor: false,
      content: '새벽마다 소변 때문에 2~3번씩 깨고 낮에도 잔뇨감이 심합니다. 진료나 자기장 치료 받을 때 옷을 벗어야 하는지 궁금합니다.',
      replies: [
        {
          id: 'seed-a-prostate-1',
          author: '안정위 대표원장 · 바른한의원 대전본점',
          date: '2026-10-25',
          isDoctor: true,
          content: '안녕하세요, 안정위 대표원장입니다. 1:1 독립 진료실에서 프라이빗하게 상담 및 방광·하복부 초음파 검사를 진행하며, 골반저근과 괄약근을 강화하는 심부 자기장 치료 역시 평상복을 입은 채 편안히 의자에 앉아 받으실 수 있습니다. 전립선 감압·방광 온양 한약과 골반 추나로 편안한 통잠을 회복하도록 도움드립니다.'
        }
      ]
    }
  ]
};

function esc(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildAskDoctorHtml() {
  const postsWithWpMeta = INITIAL_DISEASE_BLOG_POSTS.map((p) => {
    const wpInfo = WP_PUBLISHED_MAP[p.id] || {};
    return {
      ...p,
      wpPostId: wpInfo.wpPostId || null,
      canonicalUrl: wpInfo.link || (`https://www.bareunhaniwon.com/${p.slug}/`)
    };
  });

  // Hub-level JSON-LD for Google, Naver, Bing, ChatGPT Search & Perplexity
  const hubJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['CollectionPage', 'Blog', 'MedicalWebPage'],
        '@id': 'https://www.bareunhaniwon.com/ask-doctor/#blog',
        'url': 'https://www.bareunhaniwon.com/ask-doctor/',
        'name': '바른한의원 대전본점 · 무엇이든 물어보세요 (공식 의학백과 블로그 & 원장 Q&A)',
        'alternateName': 'Bareun Korean Medicine Clinic Daejeon — Official Medical Encyclopedia Blog & Doctor Q&A',
        'description': '대전 바른한의원 안정위 대표원장(아빠 한의사)이 직접 집필한 9대 질환 공식 의학백과 블로그 및 실시간 환자 질문·답변(Q&A) 허브. 소아성장·비만, 두피열·탈모, 허리디스크·골반추나, 황제공진단, 자율신경·실신·두통·불면, 담적·역류성식도염, 식욕ZERO 다이어트, 난임·생리통·산후풍, 전립선·요실금.',
        'inLanguage': ['ko-KR', 'en-US'],
        'author': {
          '@type': 'Physician',
          '@id': 'https://www.bareunhaniwon.com/director/#physician',
          'name': '안정위 대표원장 (Dr. Jung-Wi Ahn)',
          'url': 'https://www.bareunhaniwon.com/director/'
        },
        'publisher': {
          '@type': 'MedicalClinic',
          '@id': 'https://www.bareunhaniwon.com/#clinic',
          'name': '바른한의원 대전본점 (Bareun Korean Medicine Clinic Daejeon)',
          'url': 'https://www.bareunhaniwon.com/',
          'telephone': '+82-42-488-1075'
        }
      },
      {
        '@type': 'ItemList',
        'name': '바른한의원 대전본점 공식 의학백과 & 임상칼럼 전체 목록',
        'numberOfItems': postsWithWpMeta.length,
        'itemListElement': postsWithWpMeta.map((p, i) => ({
          '@type': 'ListItem',
          'position': i + 1,
          'name': p.title,
          'url': p.canonicalUrl
        }))
      }
    ]
  };

  // Static Crawlable Directory Links (Domestic Naver Yeti + Global Google/Bing/AI Bots)
  const staticDirectoryHtml = DISEASE_BLOG_CATEGORIES.map((cat) => {
    const catPosts = postsWithWpMeta.filter(p => p.partId === cat.partId);
    const items = catPosts.map(p =>
      `<li>` +
        `<a href="${esc(p.canonicalUrl)}" data-internal-slug="${esc(p.slug)}" onclick="if(!event.ctrlKey&&!event.metaKey){event.preventDefault();window.openArticleBySlug('${esc(p.slug)}');}">` +
          `${p.isEncyclopediaMaster ? '<strong>[📘 공식 의학백과]</strong> ' : '[임상칼럼] '}${esc(p.title)}` +
        `</a>` +
        `<span class="seo-dir-en" lang="en"> — ${esc(p.enTitle || '')}</span>` +
      `</li>`
    ).join('\n          ');
    return `
      <div class="seo-dir-group">
        <h3>${esc(cat.shortLabel)} · ${esc(cat.name)}</h3>
        <ul>
          ${items}
        </ul>
      </div>`;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
  <title>무엇이든 물어보세요 · 공식 의학백과 블로그 & 원장 Q&A | 바른한의원 대전본점</title>
  <meta name="description" content="바른한의원 대전본점 안정위 대표원장(아빠 한의사) 공식 의학백과 블로그 및 공개 문답(Q&A) 허브. 9대 질환(소아성장·비만, 탈모, 허리디스크 추나, 황제공진단, 자율신경·실신·두통, 담적·역류성식도염, 다이어트, 난임·생리통, 전립선·요실금) 백과와 블로그 답글 질문상담." />
  <meta name="keywords" content="바른한의원 대전본점, 안정위 원장, 무엇이든 물어보세요, 한의원 의학백과, 대전 소아성장, 대전 탈모한의원, 대전 추나 허리디스크, 대전 공진단, 미주신경성 실신, 담적병, 대전 다이어트한의원, 대전 난임한의원, 전립선 요실금, Bareun Korean Medicine Clinic Daejeon" />
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
  <link rel="canonical" href="https://www.bareunhaniwon.com/ask-doctor/" />
  <link rel="alternate" hreflang="ko-KR" href="https://www.bareunhaniwon.com/ask-doctor/" />
  <link rel="alternate" hreflang="x-default" href="https://www.bareunhaniwon.com/ask-doctor/" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="바른한의원 대전본점 (Bareun Korean Medicine Clinic)" />
  <meta property="og:title" content="무엇이든 물어보세요 · 공식 의학백과 블로그 & 안정위 원장 Q&A | 바른한의원 대전본점" />
  <meta property="og:description" content="9대 질환 공식 의학백과와 심층 임상칼럼을 한눈에 읽고, 발행된 블로그 글 아래 답글로 안정위 대표원장님께 바로 질문하세요." />
  <meta property="og:url" content="https://www.bareunhaniwon.com/ask-doctor/" />
  <meta property="og:image" content="https://raw.githubusercontent.com/ajwei0508-cpu/bareun-homepage/main/homepage/card_1_director.jpg" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@600;700;800&family=Pretendard:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <script type="application/ld+json">${JSON.stringify(hubJsonLd).replace(/<\//g, '<\\/')}</script>
  <style>
    :root {
      --navy-950: #090E1A;
      --navy-900: #0F172A;
      --navy-800: #1E293B;
      --slate-700: #334155;
      --slate-600: #475569;
      --slate-200: #E2E8F0;
      --slate-100: #F1F5F9;
      --slate-50: #F8FAFC;
      --emerald-700: #047857;
      --emerald-600: #059669;
      --emerald-500: #10B981;
      --emerald-100: #D1FAE5;
      --emerald-50: #ECFDF5;
      --amber-700: #B45309;
      --amber-100: #FEF3C7;
      --ink-900: #111827;
      --ink-800: #1F2937;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      width: 100%;
      min-height: 100%;
      background: var(--slate-50);
      color: var(--ink-900);
      font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
    }

    /* Hide standalone WP bar when rendered inside this integrated magazine reader */
    .bblog-wp-only-bar, .bblog-wp-only-bar-cta { display: none !important; }

    /* 1. STICKY TOP NAV */
    .ask-topbar {
      position: sticky;
      top: 0;
      z-index: 300;
      min-height: 64px;
      background: rgba(15, 23, 42, 0.96);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.12);
      padding: 10px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
    }
    .ask-brand {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      color: #FFFFFF;
    }
    .ask-brand-badge {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      background: linear-gradient(135deg, #10B981 0%, #059669 100%);
      color: #052E16;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.05rem;
      font-weight: 800;
    }
    .ask-brand-title {
      font-family: 'Noto Serif KR', serif;
      font-size: 1.02rem;
      font-weight: 800;
      color: #FFFFFF;
    }
    .ask-top-actions {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    .ask-top-btn {
      appearance: none;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 15px;
      border-radius: 999px;
      font-family: 'Pretendard', sans-serif;
      font-size: 0.82rem;
      font-weight: 800;
      text-decoration: none;
      cursor: pointer;
      border: 1.5px solid rgba(255, 255, 255, 0.24);
      background: rgba(255, 255, 255, 0.08);
      color: #FFFFFF;
      transition: all 0.2s ease;
    }
    .ask-top-btn:hover { background: rgba(255, 255, 255, 0.18); }
    .ask-top-btn.gold-tips {
      background: #FEF3C7;
      border-color: #F59E0B;
      color: #92400E;
    }
    .ask-top-btn.emerald-qna {
      background: #10B981;
      border-color: #34D399;
      color: #052E16;
    }

    /* 2. ROYAL SLATE NAVY HERO LOUNGE */
    .ask-hero {
      background: radial-gradient(circle at 80% 20%, #1E3A5F 0%, #0F172A 58%, #090E1A 100%);
      color: #FFFFFF;
      padding: 44px 24px 36px;
      border-bottom: 4px solid #10B981;
    }
    .ask-hero-inner {
      max-width: 1220px;
      margin: 0 auto;
    }
    .ask-hero-kicker {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      border-radius: 999px;
      background: rgba(16, 185, 129, 0.16);
      border: 1px solid rgba(52, 211, 153, 0.45);
      color: #6EE7B7;
      font-size: 0.8rem;
      font-weight: 800;
      margin-bottom: 14px;
    }
    .ask-hero-title {
      font-family: 'Noto Serif KR', serif;
      font-size: clamp(1.7rem, 2.8vw, 2.45rem);
      font-weight: 800;
      line-height: 1.32;
      margin-bottom: 10px;
      word-break: keep-all;
    }
    .ask-hero-sub {
      font-size: 1rem;
      color: #CBD5E1;
      line-height: 1.68;
      max-width: 880px;
      margin-bottom: 24px;
      word-break: keep-all;
    }

    /* Search + Quick Q&A Bar */
    .ask-search-row {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 12px;
      max-width: 920px;
      margin-bottom: 20px;
    }
    .ask-search-input {
      width: 100%;
      padding: 15px 20px;
      border-radius: 14px;
      border: 2px solid rgba(255, 255, 255, 0.25);
      background: #FFFFFF;
      color: #111827;
      font-family: 'Pretendard', sans-serif;
      font-size: 0.98rem;
      font-weight: 600;
      outline: none;
    }
    .ask-search-input:focus {
      border-color: #10B981;
      box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.25);
    }
    .ask-quick-question-btn {
      appearance: none;
      padding: 0 24px;
      border-radius: 14px;
      border: none;
      background: linear-gradient(135deg, #10B981 0%, #059669 100%);
      color: #052E16;
      font-family: 'Pretendard', sans-serif;
      font-size: 0.95rem;
      font-weight: 800;
      cursor: pointer;
      white-space: nowrap;
      box-shadow: 0 8px 20px rgba(16, 185, 129, 0.28);
      transition: transform 0.18s ease;
    }
    .ask-quick-question-btn:hover { transform: translateY(-2px); }

    /* Mode Tabs (All / Official Encyclopedia / Clinical Columns) */
    .ask-mode-tabs {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }
    .ask-mode-tab {
      appearance: none;
      padding: 10px 18px;
      border-radius: 999px;
      border: 1.5px solid rgba(255, 255, 255, 0.24);
      background: rgba(255, 255, 255, 0.08);
      color: #E2E8F0;
      font-family: 'Pretendard', sans-serif;
      font-size: 0.88rem;
      font-weight: 800;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .ask-mode-tab.active {
      background: #FFFFFF;
      border-color: #FFFFFF;
      color: #0F172A;
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.22);
    }

    /* 3. MAIN CONTAINER */
    .ask-main {
      max-width: 1220px;
      margin: 0 auto;
      padding: 26px 24px 64px;
    }

    /* 9-Disease Filter Chips */
    .ask-part-strip {
      display: flex;
      align-items: center;
      gap: 8px;
      overflow-x: auto;
      padding-bottom: 12px;
      margin-bottom: 22px;
      scrollbar-width: thin;
    }
    .ask-part-chip {
      appearance: none;
      padding: 9px 15px;
      border-radius: 999px;
      border: 1.5px solid #CBD5E1;
      background: #FFFFFF;
      color: #1E293B;
      font-family: 'Pretendard', sans-serif;
      font-size: 0.84rem;
      font-weight: 800;
      white-space: nowrap;
      cursor: pointer;
      transition: all 0.18s ease;
    }
    .ask-part-chip:hover {
      border-color: #0F172A;
      background: #F1F5F9;
    }
    .ask-part-chip.active {
      background: #0F172A;
      border-color: #0F172A;
      color: #FFFFFF;
      box-shadow: 0 4px 12px rgba(15, 23, 42, 0.18);
    }

    /* Cards Grid */
    .ask-cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(355px, 1fr));
      gap: 20px;
    }
    .ask-post-card {
      background: #FFFFFF;
      border: 1.5px solid #CBD5E1;
      border-radius: 20px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      cursor: pointer;
      transition: all 0.22s ease;
      box-shadow: 0 6px 18px rgba(15, 23, 42, 0.05);
    }
    .ask-post-card:hover {
      transform: translateY(-4px);
      border-color: #0F172A;
      box-shadow: 0 16px 34px rgba(15, 23, 42, 0.12);
    }
    .ask-post-card.is-master {
      border: 2px solid #059669;
      box-shadow: 0 8px 24px rgba(5, 150, 105, 0.1);
    }
    .apc-thumb-box {
      position: relative;
      height: 196px;
      background: #E2E8F0;
      overflow: hidden;
    }
    .apc-thumb-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.35s ease;
    }
    .ask-post-card:hover .apc-thumb-img { transform: scale(1.04); }
    .apc-type-ribbon {
      position: absolute;
      top: 12px;
      left: 12px;
      padding: 5px 12px;
      border-radius: 999px;
      font-size: 0.76rem;
      font-weight: 800;
      background: rgba(15, 23, 42, 0.9);
      color: #FFFFFF;
      backdrop-filter: blur(6px);
    }
    .ask-post-card.is-master .apc-type-ribbon {
      background: #065F46;
      color: #ECFDF5;
      border: 1px solid #6EE7B7;
    }
    .apc-body {
      padding: 20px 22px;
      display: flex;
      flex-direction: column;
      flex: 1;
    }
    .apc-title {
      font-family: 'Noto Serif KR', serif;
      font-size: 1.15rem;
      font-weight: 800;
      color: #111827;
      line-height: 1.44;
      margin-bottom: 9px;
      word-break: keep-all;
    }
    .apc-summary {
      font-size: 0.92rem;
      color: #374151;
      line-height: 1.65;
      margin-bottom: 14px;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      word-break: keep-all;
      flex: 1;
    }
    .apc-footer {
      padding-top: 12px;
      border-top: 1px dashed #CBD5E1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      font-size: 0.82rem;
      font-weight: 800;
    }
    .apc-qna-pill {
      padding: 5px 11px;
      border-radius: 999px;
      background: #ECFDF5;
      color: #065F46;
      border: 1px solid #A7F3D0;
    }
    .apc-read-cta {
      color: #0F172A;
    }

    /* 4. HIGH-CONTRAST 15:1 EDITORIAL READER + INTERACTIVE BLOG Q&A */
    .ask-reader-wrap {
      max-width: 920px;
      margin: 0 auto;
    }
    .ask-reader-card {
      background: #FFFFFF;
      border: 2px solid #CBD5E1;
      border-radius: 24px;
      padding: 34px 40px;
      box-shadow: 0 16px 42px rgba(15, 23, 42, 0.08);
      margin-bottom: 24px;
    }
    .ask-reader-nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 10px;
      padding-bottom: 18px;
      margin-bottom: 20px;
      border-bottom: 1.5px solid #E2E8F0;
    }
    .ask-back-list-btn {
      appearance: none;
      padding: 9px 18px;
      border-radius: 999px;
      border: 1.5px solid #0F172A;
      background: #F8FAFC;
      color: #0F172A;
      font-family: 'Pretendard', sans-serif;
      font-size: 0.86rem;
      font-weight: 800;
      cursor: pointer;
    }
    .ask-back-list-btn:hover {
      background: #0F172A;
      color: #FFFFFF;
    }
    .ask-permalink-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 7px 14px;
      border-radius: 999px;
      background: #F1F5F9;
      border: 1px solid #CBD5E1;
      color: #334155;
      font-size: 0.8rem;
      font-weight: 700;
      text-decoration: none;
    }
    .ask-permalink-pill:hover {
      background: #E2E8F0;
      color: #0F172A;
    }
    .ask-reader-h1 {
      font-family: 'Noto Serif KR', serif;
      font-size: clamp(1.48rem, 2.3vw, 1.95rem);
      font-weight: 800;
      color: #0F172A;
      line-height: 1.38;
      margin: 10px 0 14px;
      word-break: keep-all;
    }
    .ask-reader-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 10px;
      padding-bottom: 18px;
      margin-bottom: 24px;
      border-bottom: 1.5px solid #E2E8F0;
      font-size: 0.88rem;
      font-weight: 700;
      color: #475569;
    }

    /* Article Inner AI-SEO Styles (15:1 High Contrast) */
    .bblog-aiseo-tldr {
      margin: 0 0 18px;
      padding: 18px 22px;
      border-radius: 16px;
      background: #F0FDF4;
      border: 1.5px solid #86EFAC;
      border-left: 6px solid #15803D;
    }
    .bblog-aiseo-tldr-badge {
      font-size: 0.85rem;
      font-weight: 800;
      color: #14532D;
      margin-bottom: 8px;
    }
    .bblog-aiseo-tldr-list {
      margin: 0;
      padding-left: 18px;
      color: #111827;
      font-size: 0.97rem;
      font-weight: 600;
      line-height: 1.74;
    }
    .bblog-aiseo-tldr-list li { margin-bottom: 5px; }
    .bblog-aiseo-en-box {
      margin: 0 0 22px;
      padding: 16px 20px;
      border-radius: 14px;
      background: #F8FAFC;
      border: 1.5px solid #CBD5E1;
    }
    .bblog-aiseo-en-kicker {
      font-size: 0.73rem;
      font-weight: 800;
      letter-spacing: 0.05em;
      color: #334155;
      margin-bottom: 4px;
    }
    .bblog-aiseo-en-title {
      font-size: 0.98rem;
      font-weight: 800;
      color: #0F172A;
      margin-bottom: 5px;
    }
    .bblog-aiseo-en-desc {
      font-size: 0.88rem;
      color: #334155;
      line-height: 1.65;
    }
    .bblog-article-body {
      color: #111827;
      font-size: 1.04rem;
      line-height: 1.85;
      word-break: keep-all;
    }
    .bblog-article-body h3, .bblog-aiseo-table-sec h3, .bblog-aiseo-faq-sec h3 {
      font-family: 'Noto Serif KR', serif;
      font-size: 1.26rem;
      font-weight: 800;
      color: #0F172A;
      margin: 28px 0 12px;
      padding-left: 12px;
      border-left: 4px solid #059669;
      line-height: 1.4;
    }
    .bblog-article-body p {
      margin: 0 0 15px;
      color: #1F2937;
      line-height: 1.85;
    }
    .bblog-sublead { color: #065F46 !important; font-size: 1.06rem !important; }
    .bblog-hero-figure {
      margin: 0 0 22px;
      border-radius: 18px;
      overflow: hidden;
      border: 1.5px solid #CBD5E1;
      background: #F8FAFC;
    }
    .bblog-hero-img {
      width: 100%;
      max-height: 430px;
      object-fit: cover;
      display: block;
    }
    .bblog-hero-caption {
      padding: 11px 16px;
      font-size: 0.86rem;
      font-weight: 700;
      color: #334155;
      background: #F1F5F9;
    }
    .bblog-lead-box, .bblog-qa-box, .bblog-selfcheck-box, .bblog-essay-lead {
      margin: 0 0 20px;
      padding: 18px 22px;
      border-radius: 16px;
      background: #F8FAFC;
      border: 1.5px solid #CBD5E1;
    }
    .bblog-lead-badge {
      font-size: 0.8rem;
      font-weight: 800;
      color: #065F46;
      margin-bottom: 6px;
    }
    .bblog-qa-q {
      padding-bottom: 12px;
      margin-bottom: 12px;
      border-bottom: 1px dashed #CBD5E1;
    }
    .bblog-encyc-cards-grid, .bblog-mythfact-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 14px;
      margin: 16px 0 20px;
    }
    .bblog-encyc-card {
      padding: 16px 18px;
      border-radius: 14px;
      background: #FFFFFF;
      border: 1.5px solid #CBD5E1;
    }
    .bblog-encyc-card.tx {
      background: #F0FDF4;
      border-color: #86EFAC;
    }
    .bblog-encyc-card-tag {
      font-size: 0.76rem;
      font-weight: 800;
      color: #065F46;
      margin-bottom: 5px;
    }
    .bblog-encyc-card h4 {
      font-size: 1rem;
      font-weight: 800;
      color: #0F172A;
      margin-bottom: 6px;
    }
    .bblog-encyc-card p { font-size: 0.92rem !important; margin: 0 !important; line-height: 1.65 !important; }
    .bblog-myth-card { padding: 16px; border-radius: 14px; background: #FEF2F2; border: 1.5px solid #FECACA; }
    .bblog-fact-card { padding: 16px; border-radius: 14px; background: #ECFDF5; border: 1.5px solid #A7F3D0; }
    .bblog-visual-split-card {
      display: grid;
      grid-template-columns: 230px 1fr;
      gap: 18px;
      align-items: center;
      margin: 18px 0;
      padding: 18px;
      border-radius: 16px;
      background: #F8FAFC;
      border: 1.5px solid #CBD5E1;
    }
    .bblog-visual-split-img {
      width: 100%;
      height: 156px;
      object-fit: cover;
      border-radius: 12px;
      display: block;
    }
    .bblog-split-kicker, .bblog-physio-kicker {
      font-size: 0.78rem;
      font-weight: 800;
      color: #059669;
      margin-bottom: 4px;
    }
    .bblog-split-title, .bblog-physio-title {
      font-size: 1.06rem;
      font-weight: 800;
      color: #0F172A;
      margin-bottom: 8px;
    }
    .bblog-physio-card {
      margin: 18px 0;
      padding: 20px;
      border-radius: 16px;
      background: #F0FDF4;
      border: 1.5px solid #86EFAC;
    }
    .bblog-physio-highlight {
      margin-top: 10px;
      padding: 14px 16px;
      border-radius: 12px;
      background: #FFFFFF;
      border: 1px solid #BBF7D0;
      font-size: 0.95rem;
      color: #111827;
    }
    .bblog-sci-callout {
      margin: 18px 0;
      padding: 18px 20px;
      border-radius: 16px;
      background: #EFF6FF;
      border: 1.5px solid #BFDBFE;
      border-left: 5px solid #1D4ED8;
    }
    .bblog-sci-label { font-size: 0.8rem; font-weight: 800; color: #1E40AF; margin-bottom: 6px; }
    .bblog-sci-paper-title { font-size: 0.98rem; font-weight: 800; color: #0F172A; margin-bottom: 6px; }
    .bblog-sci-paper-list, .bblog-check-list { padding-left: 20px; line-height: 1.76; }
    .bblog-aiseo-table-wrap {
      overflow-x: auto;
      margin: 12px 0 20px;
      border-radius: 14px;
      border: 1.5px solid #CBD5E1;
    }
    .bblog-aiseo-table {
      width: 100%;
      border-collapse: collapse;
      background: #FFFFFF;
      font-size: 0.92rem;
    }
    .bblog-aiseo-table th {
      background: #0F172A;
      color: #FFFFFF;
      font-weight: 800;
      padding: 12px 14px;
      text-align: left;
    }
    .bblog-aiseo-table td {
      padding: 12px 14px;
      border-top: 1px solid #E2E8F0;
      color: #1E2937;
      vertical-align: top;
    }
    .bblog-faq-item {
      padding: 15px 18px;
      border-radius: 14px;
      background: #F8FAFC;
      border: 1.5px solid #E2E8F0;
      margin-bottom: 10px;
    }
    .bblog-faq-q { font-weight: 800; color: #0F172A; font-size: 0.98rem; margin-bottom: 6px; }
    .bblog-faq-a { color: #334155; font-size: 0.94rem; line-height: 1.72; }
    .bblog-doctor-sign {
      margin-top: 22px;
      padding: 18px 22px;
      border-radius: 16px;
      background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
      color: #F8FAFC;
      font-size: 0.94rem;
      line-height: 1.72;
    }
    .bblog-doctor-sign strong { color: #6EE7B7; }

    /* 5. INTERACTIVE BLOG REPLY Q&A BOARD */
    .qna-board-card {
      background: #FFFFFF;
      border: 2.5px solid #0F172A;
      border-radius: 24px;
      padding: 30px 34px;
      box-shadow: 0 18px 40px rgba(15, 23, 42, 0.1);
      margin-bottom: 28px;
    }
    .qna-board-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;
      padding-bottom: 18px;
      margin-bottom: 20px;
      border-bottom: 1.5px solid #E2E8F0;
    }
    .qna-thread-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-bottom: 24px;
    }
    .qna-question-item {
      border: 1.5px solid #CBD5E1;
      border-radius: 16px;
      padding: 18px 20px;
      background: #F8FAFC;
    }
    .qna-item-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 8px;
    }
    .qna-user-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.86rem;
      font-weight: 800;
      color: #0F172A;
    }
    .qna-doctor-reply-item {
      margin-top: 12px;
      margin-left: 16px;
      padding: 16px 18px;
      border-radius: 14px;
      background: #ECFDF5;
      border: 1.5px solid #10B981;
    }
    .qna-doctor-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 11px;
      border-radius: 999px;
      background: #0F172A;
      color: #6EE7B7;
      font-size: 0.78rem;
      font-weight: 800;
    }
    .qna-form-box {
      background: #F1F5F9;
      border: 1.5px solid #CBD5E1;
      border-radius: 18px;
      padding: 22px;
    }
    .qna-form-row {
      display: grid;
      grid-template-columns: 240px 1fr;
      gap: 12px;
      margin-bottom: 12px;
    }
    .qna-input, .qna-textarea {
      width: 100%;
      padding: 12px 15px;
      border-radius: 12px;
      border: 1.5px solid #94A3B8;
      background: #FFFFFF;
      color: #111827;
      font-family: 'Pretendard', sans-serif;
      font-size: 0.95rem;
      outline: none;
    }
    .qna-input:focus, .qna-textarea:focus {
      border-color: #0F172A;
      box-shadow: 0 0 0 3px rgba(15, 23, 42, 0.12);
    }
    .qna-submit-btn {
      appearance: none;
      padding: 13px 26px;
      border-radius: 999px;
      border: none;
      background: #0F172A;
      color: #FFFFFF;
      font-family: 'Pretendard', sans-serif;
      font-size: 0.94rem;
      font-weight: 800;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .qna-submit-btn:hover { background: #059669; }
    .qna-toast {
      margin-top: 12px;
      padding: 12px 16px;
      border-radius: 12px;
      background: #ECFDF5;
      border: 1.5px solid #10B981;
      color: #065F46;
      font-size: 0.9rem;
      font-weight: 700;
      display: none;
    }

    /* 6. CRAWLABLE SEO DIRECTORY */
    .seo-crawl-directory {
      margin-top: 48px;
      padding: 28px 30px;
      border-radius: 20px;
      background: #FFFFFF;
      border: 1.5px solid #CBD5E1;
    }
    .seo-dir-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 20px;
      margin-top: 16px;
    }
    .seo-dir-group h3 {
      font-size: 0.96rem;
      font-weight: 800;
      color: #0F172A;
      margin-bottom: 8px;
      padding-bottom: 6px;
      border-bottom: 1.5px solid #E2E8F0;
    }
    .seo-dir-group ul {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .seo-dir-group li {
      font-size: 0.83rem;
      line-height: 1.48;
      color: #475569;
    }
    .seo-dir-group a {
      color: #0F172A;
      font-weight: 700;
      text-decoration: none;
    }
    .seo-dir-group a:hover { color: #059669; text-decoration: underline; }
    .seo-dir-en { font-size: 0.76rem; color: #64748B; }

    @media (max-width: 820px) {
      .ask-topbar { padding: 10px 14px; }
      .ask-hero { padding: 30px 16px 26px; }
      .ask-search-row, .qna-form-row, .bblog-visual-split-card { grid-template-columns: 1fr; }
      .ask-quick-question-btn { padding: 14px 18px; }
      .ask-main { padding: 20px 14px 48px; }
      .ask-cards-grid { grid-template-columns: 1fr; }
      .ask-reader-card, .qna-board-card { padding: 22px 18px; }
    }
  </style>
  <link rel="icon" href="data:,">
</head>
<body>

  <!-- STICKY TOP HEADER -->
  <header class="ask-topbar">
    <a href="ask-doctor.html" class="ask-brand" onclick="if(window.closeArticleReader){event.preventDefault();window.closeArticleReader();}">
      <div class="ask-brand-badge">💬</div>
      <span class="ask-brand-title">바른한의원 대전본점 · 무엇이든 물어보세요 (의학백과 블로그 & 원장 Q&A)</span>
    </a>
    <div class="ask-top-actions">
      <a href="body-explorer.html?part=knee" class="ask-top-btn gold-tips" id="top-tips-bridge-btn">💡 3D 부위별 생활꿀팁 창고</a>
      <button type="button" class="ask-top-btn emerald-qna" onclick="window.jumpStraightToQuestion()">✍️ 원장님께 바로 질문하기</button>
      <a href="tel:042-488-1075" class="ask-top-btn">📞 042-488-1075</a>
      <a href="story-3d.html" class="ask-top-btn">← 메인 쇼룸</a>
    </div>
  </header>

  <!-- ROYAL SLATE NAVY HERO -->
  <section class="ask-hero">
    <div class="ask-hero-inner">
      <div class="ask-hero-kicker">
        <span>📘 공식 의학백과 블로그 정식 발행 · 실시간 답글 Q&A 연동</span>
      </div>
      <h1 class="ask-hero-title">무엇이든 물어보세요 — 안정위 대표원장 의학백과 & 공개 문답</h1>
      <p class="ask-hero-sub">
        ‘3D 생활꿀팁 창고’와 분리된 <strong>질환 심층 백과·문답 전용 공간</strong>입니다. 9대 질환 공식 의학백과와 임상 칼럼을 편하게 읽으시고, 궁금한 점은 각 발행글 하단 <strong>답글창에 로그인 없이 질문</strong>을 남겨주시면 안정위 대표원장실이 직접 답변해 도움드립니다.
      </p>

      <div class="ask-search-row">
        <input type="search" id="ask-search-input" class="ask-search-input" placeholder="🔍 궁금한 증상·질환 검색 (예: 성장판, 성조숙, 두피열, 허리디스크, 공진단, 실신, 담적, 다이어트, 난임, 야간뇨...)" />
        <button type="button" class="ask-quick-question-btn" onclick="window.jumpStraightToQuestion()">💬 내 증상 바로 질문하기 ↓</button>
      </div>

      <div class="ask-mode-tabs" role="tablist">
        <button type="button" class="ask-mode-tab active" data-mode="all" onclick="window.setAskMode('all')">📚 전체 발행글 (<span id="count-all">36</span>편)</button>
        <button type="button" class="ask-mode-tab" data-mode="encyclopedia" onclick="window.setAskMode('encyclopedia')">📘 공식 의학백과 마스터 (<span id="count-encyc">9</span>편)</button>
        <button type="button" class="ask-mode-tab" data-mode="column" onclick="window.setAskMode('column')">📰 심층 임상칼럼 (<span id="count-col">27</span>편)</button>
      </div>
    </div>
  </section>

  <!-- MAIN CONTENT -->
  <main class="ask-main">
    <div class="ask-part-strip" id="ask-part-strip"></div>
    <div id="ask-dynamic-stage"></div>

    <!-- CRAWLABLE FULL CANONICAL DIRECTORY (Domestic Naver/Daum + Global Google/Bing/ChatGPT/Perplexity) -->
    <nav class="seo-crawl-directory" aria-label="바른한의원 대전본점 공식 의학백과 및 임상칼럼 전체 색인 디렉토리">
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;">
        <h2 style="font-family:'Noto Serif KR',serif;font-size:1.18rem;font-weight:800;color:#0F172A;">🌐 바른한의원 대전본점 공식 발행 의학백과 · 칼럼 전체 색인 (KR / EN Global Index)</h2>
        <span style="font-size:0.8rem;font-weight:700;color:#059669;">국내·해외 검색엔진 및 AI 지식베이스 공식 연동</span>
      </div>
      <div class="seo-dir-grid">
        ${staticDirectoryHtml}
      </div>
    </nav>
  </main>

  <script>
  (function() {
    const CATEGORIES = ${JSON.stringify(DISEASE_BLOG_CATEGORIES)};
    const SEED_POSTS = ${JSON.stringify(postsWithWpMeta)};
    const SEED_QNA = ${JSON.stringify(INITIAL_QNA_SEED)};

    let allPosts = [];
    let currentPart = 'all';
    let currentMode = 'all'; // 'all' | 'encyclopedia' | 'column'
    let searchQuery = '';
    let activeSlug = null;
    let replyParentId = 0;
    let replyParentAuthor = '';

    const partStripEl = document.getElementById('ask-part-strip');
    const stageEl = document.getElementById('ask-dynamic-stage');
    const searchInput = document.getElementById('ask-search-input');
    const topTipsBridgeBtn = document.getElementById('top-tips-bridge-btn');

    function formatDateOffset(daysAgo) {
      const d = new Date(Date.now() - (daysAgo || 0) * 86400000);
      return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    }

    function escapeHtml(s) {
      return String(s || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }

    function stripHtml(s) {
      return String(s || '').replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
    }

    function initStore() {
      allPosts = SEED_POSTS.map((p, idx) => ({
        ...p,
        date: p.date || formatDateOffset(typeof p.dateOffsetDays === 'number' ? p.dateOffsetDays : (idx % 4))
      }));
      updateTabCounts();
    }

    function updateTabCounts() {
      const total = allPosts.length;
      const encyc = allPosts.filter(p => p.isEncyclopediaMaster).length;
      const col = total - encyc;
      const elAll = document.getElementById('count-all');
      const elEnc = document.getElementById('count-encyc');
      const elCol = document.getElementById('count-col');
      if (elAll) elAll.textContent = String(total);
      if (elEnc) elEnc.textContent = String(encyc);
      if (elCol) elCol.textContent = String(col);
    }

    function getCategoryByPart(partId) {
      return CATEGORIES.find(c => c.partId === partId) || CATEGORIES[0];
    }

    function renderPartChips() {
      const targetTipsPart = (currentPart && currentPart !== 'all') ? currentPart : 'knee';
      if (topTipsBridgeBtn) {
        topTipsBridgeBtn.setAttribute('href', 'body-explorer.html?part=' + targetTipsPart);
      }

      const chips = [
        '<button type="button" class="ask-part-chip' + (currentPart === 'all' ? ' active' : '') + '" onclick="window.setAskPart(\\'all\\')">전체 9대 질환 (' + allPosts.length + ')</button>'
      ];
      CATEGORIES.forEach((cat, idx) => {
        const cnt = allPosts.filter(p => p.partId === cat.partId).length;
        chips.push(
          '<button type="button" class="ask-part-chip' + (currentPart === cat.partId ? ' active' : '') + '" onclick="window.setAskPart(\\'' + cat.partId + '\\')">' +
            (idx + 1) + '. ' + escapeHtml(cat.shortLabel) + ' (' + cnt + ')' +
          '</button>'
        );
      });
      partStripEl.innerHTML = chips.join('');
    }

    function getFilteredPosts() {
      return allPosts.filter(p => {
        if (currentPart !== 'all' && p.partId !== currentPart) return false;
        if (currentMode === 'encyclopedia' && !p.isEncyclopediaMaster) return false;
        if (currentMode === 'column' && p.isEncyclopediaMaster) return false;
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          const hay = [
            p.title, p.summary, p.enTitle, p.enSummary,
            (p.tags || []).join(' '), (p.tldr || []).join(' ')
          ].join(' ').toLowerCase();
          if (!hay.includes(q)) return false;
        }
        return true;
      });
    }

    function syncUrlParams() {
      try {
        const url = new URL(window.location.href);
        if (currentPart && currentPart !== 'all') url.searchParams.set('part', currentPart);
        else url.searchParams.delete('part');
        if (activeSlug) url.searchParams.set('post', activeSlug);
        else url.searchParams.delete('post');
        window.history.replaceState({}, '', url.toString());
      } catch (e) {}
    }

    function renderStage() {
      renderPartChips();
      document.querySelectorAll('.ask-mode-tab').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-mode') === currentMode);
      });

      if (activeSlug) {
        const post = allPosts.find(p => p.slug === activeSlug || p.id === activeSlug);
        if (post) {
          renderArticleReader(post);
          return;
        }
      }

      const list = getFilteredPosts();
      if (!list.length) {
        stageEl.innerHTML =
          '<div style="padding:48px 24px;text-align:center;background:#FFFFFF;border-radius:20px;border:1.5px solid #CBD5E1;">' +
            '<div style="font-size:1.15rem;font-weight:800;color:#0F172A;margin-bottom:8px;">검색 조건에 맞는 의학백과·칼럼이 없습니다.</div>' +
            '<p style="color:#475569;margin-bottom:16px;">전체 질환 보기로 전환하시거나 대표 백과 글에 바로 질문을 남겨주세요.</p>' +
            '<button type="button" class="qna-submit-btn" onclick="window.resetAskFilters()">전체 발행글 다시 보기</button>' +
          '</div>';
        return;
      }

      const cardsHtml = list.map((post) => {
        const seedCount = (SEED_QNA[post.slug] || []).length;
        const ribbonText = post.isEncyclopediaMaster ? '📘 공식 의학백과 마스터' : ('📰 ' + (post.badge || '심층 임상칼럼'));
        return (
          '<article class="ask-post-card' + (post.isEncyclopediaMaster ? ' is-master' : '') + '" onclick="window.openArticleBySlug(\\'' + post.slug + '\\')">' +
            '<div class="apc-thumb-box">' +
              '<img src="' + escapeHtml(post.heroImg || 'card_1_director.jpg') + '" alt="' + escapeHtml(post.imageAlt || post.title) + '" class="apc-thumb-img" loading="lazy" />' +
              '<span class="apc-type-ribbon">' + escapeHtml(ribbonText) + '</span>' +
            '</div>' +
            '<div class="apc-body">' +
              '<div style="font-size:0.78rem;font-weight:700;color:#64748B;margin-bottom:6px;">📅 ' + escapeHtml(post.date) + ' · ⏱ ' + escapeHtml(post.readTime || '4분 칼럼') + '</div>' +
              '<h2 class="apc-title">' + escapeHtml(post.title) + '</h2>' +
              '<p class="apc-summary">' + escapeHtml(post.summary) + '</p>' +
              '<div class="apc-footer">' +
                '<span class="apc-qna-pill">💬 답글 질문 가능' + (seedCount ? ' · 문답 ' + seedCount + '+' : '') + '</span>' +
                '<span class="apc-read-cta">전문 읽기 & 질문 →</span>' +
              '</div>' +
            '</div>' +
          '</article>'
        );
      }).join('');

      stageEl.innerHTML = '<div class="ask-cards-grid">' + cardsHtml + '</div>';
    }

    function renderArticleReader(post) {
      const cat = getCategoryByPart(post.partId);
      const samePartOthers = allPosts.filter(p => p.partId === post.partId && p.slug !== post.slug).slice(0, 3);
      const relatedHtml = samePartOthers.map(rp =>
        '<div style="padding:12px 16px;border-radius:12px;background:#F8FAFC;border:1px solid #CBD5E1;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:10px;" onclick="window.openArticleBySlug(\\'' + rp.slug + '\\')">' +
          '<span style="font-size:0.92rem;font-weight:700;color:#0F172A;">' + (rp.isEncyclopediaMaster ? '📘 ' : '📰 ') + escapeHtml(rp.title) + '</span>' +
          '<span style="font-size:0.8rem;font-weight:800;color:#059669;flex-shrink:0;">읽기 →</span>' +
        '</div>'
      ).join('');

      const canonicalHref = post.canonicalUrl || ('https://www.bareunhaniwon.com/' + post.slug + '/');

      stageEl.innerHTML =
        '<div class="ask-reader-wrap">' +
          '<article class="ask-reader-card">' +
            '<div class="ask-reader-nav">' +
              '<button type="button" class="ask-back-list-btn" onclick="window.closeArticleReader()">← 의학백과 · 칼럼 목록으로</button>' +
              '<div style="display:flex;gap:8px;flex-wrap:wrap;">' +
                '<a href="body-explorer.html?part=' + escapeHtml(post.partId) + '" class="ask-permalink-pill" style="background:#FEF3C7;border-color:#F59E0B;color:#92400E;">💡 이 부위 3D 생활꿀팁 보기</a>' +
                '<a href="' + escapeHtml(canonicalHref) + '" target="_blank" rel="noopener" class="ask-permalink-pill">🔗 단독 발행 주소 열기 ↗</a>' +
              '</div>' +
            '</div>' +

            '<div style="display:inline-flex;align-items:center;gap:8px;padding:5px 13px;border-radius:999px;background:#ECFDF5;border:1px solid #6EE7B7;color:#065F46;font-size:0.8rem;font-weight:800;">' +
              escapeHtml(post.badge || cat.shortLabel) +
            '</div>' +
            '<h1 class="ask-reader-h1">' + escapeHtml(post.title) + '</h1>' +
            '<div class="ask-reader-meta">' +
              '<span>👨‍⚕️ 집필·감수: 바른한의원 대전본점 안정위 대표원장 (아빠 한의사) · 📅 ' + escapeHtml(post.date) + '</span>' +
              '<button type="button" class="ask-top-btn emerald-qna" onclick="document.getElementById(\\'qna-board-section\\').scrollIntoView({behavior:\\'smooth\\'})">💬 아래 답글로 질문하기 ↓</button>' +
            '</div>' +

            '<div class="ask-reader-body">' + post.contentHtml + '</div>' +

            '<div style="margin-top:24px;padding-top:18px;border-top:1.5px solid #E2E8F0;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">' +
              '<div style="display:flex;gap:6px;flex-wrap:wrap;">' +
                (post.tags || []).map(t => '<span style="padding:5px 11px;border-radius:999px;background:#F1F5F9;color:#334155;font-size:0.8rem;font-weight:700;">#' + escapeHtml(t) + '</span>').join('') +
              '</div>' +
              '<a href="' + escapeHtml(cat.clinicLink || 'director.html') + '" style="padding:10px 18px;border-radius:999px;background:#0F172A;color:#FFFFFF;font-size:0.86rem;font-weight:800;text-decoration:none;">🏥 ' + escapeHtml(cat.shortLabel) + ' 클리닉 상세보기 →</a>' +
            '</div>' +
          '</article>' +

          /* INTERACTIVE Q&A REPLY SECTION FOR THIS PUBLISHED BLOG POST */
          '<section class="qna-board-card" id="qna-board-section" aria-label="발행 블로그 답글 질문 및 원장 답변">' +
            '<div class="qna-board-header">' +
              '<div>' +
                '<div style="font-size:0.8rem;font-weight:800;color:#059669;margin-bottom:4px;">💬 발행 블로그 공개 문답 · Doctor Q&A</div>' +
                '<h2 style="font-family:\\'Noto Serif KR\\',serif;font-size:1.35rem;font-weight:800;color:#0F172A;">이 글에 답글로 원장님께 질문하기</h2>' +
                '<p style="font-size:0.9rem;color:#475569;margin-top:4px;">회원가입·로그인 없이 바로 질문을 남기실 수 있으며, 안정위 대표원장실이 확인 후 답글로 상세히 안내해 도움드립니다.</p>' +
              '</div>' +
              '<a href="tel:042-488-1075" style="padding:9px 16px;border-radius:999px;background:#F1F5F9;border:1px solid #CBD5E1;color:#0F172A;font-size:0.82rem;font-weight:800;text-decoration:none;">📞 급한 문의: 042-488-1075</a>' +
            '</div>' +

            '<div class="qna-thread-list" id="qna-thread-list">' +
              '<div style="padding:16px;color:#64748B;font-size:0.9rem;">문답 내역을 불러오는 중입니다...</div>' +
            '</div>' +

            '<form class="qna-form-box" id="qna-question-form">' +
              '<div id="qna-reply-target-bar" style="display:none;margin-bottom:10px;padding:8px 12px;border-radius:10px;background:#DBEAFE;color:#1E3A8A;font-size:0.84rem;font-weight:700;align-items:center;justify-content:space-between;">' +
                '<span id="qna-reply-target-label"></span>' +
                '<button type="button" onclick="window.cancelReplyTarget()" style="border:none;background:transparent;color:#1E3A8A;font-weight:800;cursor:pointer;">✕ 취소</button>' +
              '</div>' +
              '<div class="qna-form-row">' +
                '<input type="text" id="qna-author-input" class="qna-input" placeholder="작성자 닉네임 (예: 둔산동 보호자)" maxlength="40" />' +
                '<div style="display:flex;align-items:center;font-size:0.83rem;color:#475569;font-weight:600;">🔒 개인정보 보호를 위해 휴대폰 번호·실명 전체는 본문에 적지 마세요.</div>' +
              '</div>' +
              '<textarea id="qna-content-input" class="qna-textarea" rows="4" required placeholder="현재 겪고 계신 증상, 기간, 궁금하신 검사(초음파·체열·자율신경·성장판 등)나 한약·추나 치료 관련 질문을 편하게 적어주세요."></textarea>' +
              '<div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;margin-top:12px;">' +
                '<span style="font-size:0.8rem;color:#64748B;">※ 온라인 문답은 건강 이해를 돕기 위한 안내이며, 정확한 진단은 내원 진찰을 통해 이루어집니다.</span>' +
                '<button type="submit" class="qna-submit-btn" id="qna-submit-btn">💬 답글 질문 등록하기</button>' +
              '</div>' +
              '<div class="qna-toast" id="qna-toast"></div>' +
            '</form>' +
          '</section>' +

          (relatedHtml ? (
            '<div style="background:#FFFFFF;border:1.5px solid #CBD5E1;border-radius:20px;padding:22px 26px;">' +
              '<div style="font-size:1rem;font-weight:800;color:#0F172A;margin-bottom:12px;">📚 함께 읽으면 좋은 ' + escapeHtml(cat.shortLabel) + ' 연관 발행글</div>' +
              '<div style="display:flex;flex-direction:column;gap:8px;">' + relatedHtml + '</div>' +
            '</div>'
          ) : '') +
        '</div>';

      replyParentId = 0;
      replyParentAuthor = '';
      bindQuestionForm(post);
      loadCommentsForPost(post);
    }

    function renderCommentThreadNodes(threads) {
      const listEl = document.getElementById('qna-thread-list');
      if (!listEl) return;
      if (!threads || !threads.length) {
        listEl.innerHTML =
          '<div style="padding:18px 20px;border-radius:14px;background:#F8FAFC;border:1px dashed #CBD5E1;color:#475569;font-size:0.92rem;font-weight:600;">' +
            '아직 등록된 질문이 없습니다. 첫 번째 질문을 남겨주시면 안정위 대표원장실이 정성껏 답변해 도움드립니다!' +
          '</div>';
        return;
      }

      listEl.innerHTML = threads.map(item => {
        const repliesHtml = (item.replies || []).map(rep =>
          '<div class="qna-doctor-reply-item">' +
            '<div class="qna-item-head">' +
              (rep.isDoctor
                ? '<span class="qna-doctor-badge">👨‍⚕️ ' + escapeHtml(rep.author) + ' · 공식 답변</span>'
                : '<span class="qna-user-badge">↳ 💬 ' + escapeHtml(rep.author) + '</span>') +
              '<span style="font-size:0.78rem;color:#475569;font-weight:600;">' + escapeHtml(rep.date) + '</span>' +
            '</div>' +
            '<div style="font-size:0.94rem;color:#111827;line-height:1.72;white-space:pre-line;">' + escapeHtml(rep.content) + '</div>' +
          '</div>'
        ).join('');

        return (
          '<div class="qna-question-item">' +
            '<div class="qna-item-head">' +
              '<span class="qna-user-badge">' + (item.isDoctor ? '👨‍⚕️ ' : '🙋 질문 · ') + escapeHtml(item.author) + '</span>' +
              '<div style="display:flex;align-items:center;gap:10px;">' +
                '<span style="font-size:0.78rem;color:#64748B;font-weight:600;">' + escapeHtml(item.date) + '</span>' +
                (item.wpCommentId ? '<button type="button" onclick="window.setReplyTarget(' + Number(item.wpCommentId) + ', \\'' + escapeHtml(item.author).replace(/'/g, '') + '\\')" style="border:none;background:#E2E8F0;color:#0F172A;padding:3px 9px;border-radius:999px;font-size:0.75rem;font-weight:800;cursor:pointer;">↳ 답글 달기</button>' : '') +
              '</div>' +
            '</div>' +
            '<div style="font-size:0.96rem;color:#1F2937;line-height:1.72;white-space:pre-line;">' + escapeHtml(item.content) + '</div>' +
            repliesHtml +
          '</div>'
        );
      }).join('');
    }

    async function ensureWpPostId(post) {
      if (post.wpPostId) return post.wpPostId;
      try {
        const r = await fetch('/wp-json/wp/v2/posts?slug=' + encodeURIComponent(post.slug));
        if (r.ok) {
          const arr = await r.json();
          if (Array.isArray(arr) && arr[0] && arr[0].id) {
            post.wpPostId = arr[0].id;
            return post.wpPostId;
          }
        }
      } catch (e) {}
      return null;
    }

    async function loadCommentsForPost(post) {
      const isLocal = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:');
      const fallbackThreads = JSON.parse(JSON.stringify(SEED_QNA[post.slug] || []));

      if (isLocal) {
        try {
          const r = await fetch('/api/blog-comments?postSlug=' + encodeURIComponent(post.slug) + '&_t=' + Date.now());
          if (r.ok) {
            const data = await r.json();
            if (Array.isArray(data.threads) && data.threads.length) {
              renderCommentThreadNodes(data.threads);
              return;
            }
          }
        } catch (e) {}
        renderCommentThreadNodes(fallbackThreads);
        return;
      }

      // Live WordPress REST API (/wp-json/wp/v2/comments?post=<id>)
      try {
        const wpId = await ensureWpPostId(post);
        if (wpId) {
          const r = await fetch('/wp-json/wp/v2/comments?post=' + wpId + '&per_page=100&order=asc&_t=' + Date.now());
          if (r.ok) {
            const wpComments = await r.json();
            if (Array.isArray(wpComments) && wpComments.length > 0) {
              const byId = {};
              const roots = [];
              wpComments.forEach(c => {
                const authorName = c.author_name || '방문 질문자';
                const isDoc = /안정위|대표원장|바른한의원/.test(authorName) || (Number(c.author) > 0 && !/보호자|직장인|환자|질문자|학부모|예비맘|방문/.test(authorName));
                byId[c.id] = {
                  id: 'wp-c-' + c.id,
                  wpCommentId: c.id,
                  parent: Number(c.parent || 0),
                  author: authorName,
                  date: String(c.date || '').slice(0, 10),
                  isDoctor: isDoc,
                  content: stripHtml(c.content && c.content.rendered),
                  replies: []
                };
              });
              Object.values(byId).forEach(node => {
                if (node.parent && byId[node.parent]) {
                  byId[node.parent].replies.push(node);
                } else {
                  roots.push(node);
                }
              });
              renderCommentThreadNodes(roots);
              return;
            }
          }
        }
      } catch (e) {}

      renderCommentThreadNodes(fallbackThreads);
    }

    function bindQuestionForm(post) {
      const form = document.getElementById('qna-question-form');
      if (!form) return;

      form.addEventListener('submit', async function(ev) {
        ev.preventDefault();
        const authorEl = document.getElementById('qna-author-input');
        const contentEl = document.getElementById('qna-content-input');
        const btnEl = document.getElementById('qna-submit-btn');
        const toastEl = document.getElementById('qna-toast');

        const author = (authorEl.value || '').trim() || '방문 질문자';
        const content = (contentEl.value || '').trim();
        if (!content) return;

        btnEl.disabled = true;
        btnEl.textContent = '질문 등록 중...';

        const isLocal = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:');

        try {
          if (isLocal) {
            const resp = await fetch('/api/blog-comments', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                postSlug: post.slug,
                author,
                content,
                parentId: replyParentId || 0
              })
            });
            if (!resp.ok) throw new Error('local-post-failed');
          } else {
            const wpId = await ensureWpPostId(post);
            if (!wpId) throw new Error('missing-wp-post-id');
            const params = new URLSearchParams();
            params.set('comment', content);
            params.set('author', author);
            params.set('email', '');
            params.set('url', '');
            params.set('comment_post_ID', String(wpId));
            params.set('comment_parent', String(replyParentId || 0));

            await fetch('/wp-comments-post.php', {
              method: 'POST',
              credentials: 'same-origin',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              body: params.toString()
            });
          }

          contentEl.value = '';
          window.cancelReplyTarget();
          if (toastEl) {
            toastEl.style.display = 'block';
            toastEl.textContent = '✅ 질문이 성공적으로 등록되었습니다! 안정위 대표원장실이 확인 후 이 글의 답글로 정성껏 답변해 도움드립니다.';
          }
          await loadCommentsForPost(post);
        } catch (err) {
          if (toastEl) {
            toastEl.style.display = 'block';
            toastEl.textContent = '안내: 일시적 네트워크 지연이 발생했습니다. 단독 발행 주소를 새 창으로 열어 하단 답글창에 남겨주시면 즉시 접수됩니다.';
          }
        } finally {
          btnEl.disabled = false;
          btnEl.textContent = '💬 답글 질문 등록하기';
        }
      });
    }

    window.setReplyTarget = function(commentId, authorName) {
      replyParentId = Number(commentId) || 0;
      replyParentAuthor = authorName || '';
      const bar = document.getElementById('qna-reply-target-bar');
      const lbl = document.getElementById('qna-reply-target-label');
      if (bar && lbl) {
        bar.style.display = 'flex';
        lbl.textContent = '↳ [' + replyParentAuthor + '] 님의 글에 추가 답글 작성 중';
      }
      document.getElementById('qna-content-input')?.focus();
    };

    window.cancelReplyTarget = function() {
      replyParentId = 0;
      replyParentAuthor = '';
      const bar = document.getElementById('qna-reply-target-bar');
      if (bar) bar.style.display = 'none';
    };

    window.setAskMode = function(mode) {
      currentMode = mode;
      activeSlug = null;
      syncUrlParams();
      renderStage();
    };

    window.setAskPart = function(partId) {
      currentPart = partId;
      activeSlug = null;
      syncUrlParams();
      renderStage();
    };

    window.resetAskFilters = function() {
      currentPart = 'all';
      currentMode = 'all';
      searchQuery = '';
      if (searchInput) searchInput.value = '';
      activeSlug = null;
      syncUrlParams();
      renderStage();
    };

    window.openArticleBySlug = function(slug, scrollToQna = false) {
      activeSlug = slug;
      syncUrlParams();
      renderStage();
      if (scrollToQna) {
        setTimeout(() => {
          document.getElementById('qna-board-section')?.scrollIntoView({ behavior: 'smooth' });
          document.getElementById('qna-content-input')?.focus();
        }, 120);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.closeArticleReader = function() {
      activeSlug = null;
      syncUrlParams();
      renderStage();
    };

    window.jumpStraightToQuestion = function() {
      if (activeSlug) {
        document.getElementById('qna-board-section')?.scrollIntoView({ behavior: 'smooth' });
        document.getElementById('qna-content-input')?.focus();
        return;
      }
      const targetPart = (currentPart && currentPart !== 'all') ? currentPart : 'knee';
      const masterPost = allPosts.find(p => p.partId === targetPart && p.isEncyclopediaMaster) || allPosts[0];
      if (masterPost) {
        window.openArticleBySlug(masterPost.slug, true);
      }
    };

    if (searchInput) {
      searchInput.addEventListener('input', function() {
        searchQuery = this.value.trim();
        activeSlug = null;
        renderStage();
      });
    }

    // Sync any newly auto-published daily WordPress posts seamlessly
    async function syncLiveWpPosts() {
      const isLocal = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:');
      if (isLocal) return;
      try {
        const resp = await fetch('/wp-json/wp/v2/posts?_embed&per_page=100');
        if (!resp.ok) return;
        const wpPosts = await resp.json();
        if (!Array.isArray(wpPosts)) return;

        let changed = false;
        wpPosts.forEach(wp => {
          const wpSlug = wp.slug || ('wp-' + wp.id);
          const cleanTitle = stripHtml(wp.title && wp.title.rendered);
          const normTitle = cleanTitle.replace(/^\\[[^\\]]+\\]\\s*/, '').trim();

          const existing = allPosts.find(p =>
            p.slug === wpSlug ||
            p.title.replace(/^\\[[^\\]]+\\]\\s*/, '').trim() === normTitle
          );
          if (existing) {
            if (!existing.wpPostId) {
              existing.wpPostId = wp.id;
              existing.canonicalUrl = wp.link || existing.canonicalUrl;
              changed = true;
            }
            return;
          }

          // Newly published daily post (e.g. from Google Apps Script v4.0)!
          const terms = (wp._embedded && wp._embedded['wp:term']) ? wp._embedded['wp:term'].flat() : [];
          const catSlugs = terms.map(t => t && t.slug).filter(Boolean);
          const slugMap = {
            'blog-knee': 'knee', 'blog-cervical': 'cervical', 'blog-lumbar': 'lumbar',
            'blog-gongjindan': 'gongjindan', 'blog-syncope': 'syncope', 'blog-digest': 'digest',
            'blog-gut': 'gut', 'blog-uterus': 'uterus', 'blog-prostate': 'prostate'
          };
          let matchedPart = 'lumbar';
          for (const s of catSlugs) {
            if (slugMap[s]) { matchedPart = slugMap[s]; break; }
          }
          const rawHtml = (wp.content && wp.content.rendered) || '';
          const imgMatch = rawHtml.match(/<img[^>]+src="([^"]+)"/i);
          allPosts.unshift({
            id: 'wp-' + wp.id,
            wpPostId: wp.id,
            slug: wpSlug,
            partId: matchedPart,
            isEncyclopediaMaster: /^\\[공식 의학백과\\]/.test(cleanTitle),
            badge: '자동발행 임상칼럼',
            title: cleanTitle,
            summary: stripHtml(wp.excerpt && wp.excerpt.rendered).slice(0, 160) || cleanTitle,
            date: String(wp.date || '').slice(0, 10),
            readTime: '4분 칼럼',
            heroImg: (imgMatch && imgMatch[1]) || 'card_1_director.jpg',
            canonicalUrl: wp.link,
            tags: terms.map(t => t && t.name).filter(Boolean).slice(0, 4),
            contentHtml: rawHtml
          });
          changed = true;
        });

        if (changed) {
          updateTabCounts();
          renderStage();
        }
      } catch (e) {}
    }

    initStore();

    const params = new URLSearchParams(window.location.search);
    const qPart = params.get('part');
    const qPost = params.get('post');
    const qAsk = params.get('ask');
    if (qPart && CATEGORIES.some(c => c.partId === qPart)) {
      currentPart = qPart;
    }
    if (qPost) {
      activeSlug = qPost;
    }
    renderStage();
    if (qAsk === '1') {
      window.jumpStraightToQuestion();
    }
    syncLiveWpPosts();
  })();
  </script>
</body>
</html>`;
}

const outPath = path.join(__dirname, 'ask-doctor.html');
const html = buildAskDoctorHtml();
fs.writeFileSync(outPath, html, 'utf8');
console.log('✅ Generated Ask-Doctor Hub (ask-doctor.html):', outPath, '(' + html.length + ' bytes)');
