/**
 * 바른한의원 대전본점 — 마스터 SEO · 로컬 스키마 · AI GEO 설정 (Single Source of Truth)
 * 기준 대표 도메인: https://www.bareunhaniwon.com
 */
const CANONICAL_ORIGIN = 'https://www.bareunhaniwon.com';
const GH_RAW_BASE = 'https://raw.githubusercontent.com/ajwei0508-cpu/bareun-homepage/main/homepage/';
const DEFAULT_OG_IMAGE = GH_RAW_BASE + 'og-bareun-1200x630.jpg';

const CLINIC_BASE_ORG = {
  '@type': ['MedicalClinic', 'MedicalOrganization', 'LocalBusiness'],
  '@id': CANONICAL_ORIGIN + '/#clinic',
  name: '바른한의원 대전본점',
  alternateName: ['Bareun Korean Medicine Clinic Daejeon', '대전 바른한의원'],
  url: CANONICAL_ORIGIN + '/',
  logo: GH_RAW_BASE + 'webp/card_1_director.webp',
  image: DEFAULT_OG_IMAGE,
  telephone: '+82-10-5631-1275',
  priceRange: '₩₩',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '비래동로7번길 1, 2층',
    addressLocality: '대덕구',
    addressRegion: '대전광역시',
    postalCode: '34417',
    addressCountry: 'KR'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 36.35536,
    longitude: 127.44778
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '19:00'
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday', 'PublicHolidays'],
      opens: '09:00',
      closes: '14:00'
    }
  ],
  sameAs: [
    'https://naver.me/5U1ELn8L',
    'https://blog.naver.com/wei0508',
    'https://pf.kakao.com/_ykxcLK'
  ],
  founder: {
    '@type': 'Person',
    '@id': CANONICAL_ORIGIN + '/director/#physician',
    name: '안정위',
    jobTitle: '대표원장 (한의사)'
  }
};

const WEBSITE_NODE = {
  '@type': 'WebSite',
  '@id': CANONICAL_ORIGIN + '/#website',
  name: '바른한의원 대전본점',
  url: CANONICAL_ORIGIN + '/',
  inLanguage: 'ko-KR',
  publisher: { '@id': CANONICAL_ORIGIN + '/#clinic' }
};

const SEO_PAGES = {
  home: {
    file: 'index.html',
    path: '/',
    title: '바른한의원 대전본점 | 대덕구 비래동 추나·성장·다이어트·탈모·공진단',
    description: '대전 대덕구 비래동로7번길 1, 2층 바른한의원 대전본점(010-5631-1275). 안정위 대표원장의 심층 맥진·9대 정밀검진과 학술 논문 검증 안심 한약으로 추나·키성장·다이어트·탈모·황제공진단·전립선을 맞춤 진료합니다.',
    preloadImg: GH_RAW_BASE + 'webp/card_1_director.webp',
    breadcrumbName: '홈'
  },
  'story-3d': {
    file: 'story-3d.html',
    path: '/',
    title: '바른한의원 대전본점 | 대덕구 비래동 추나·성장·다이어트·탈모·공진단',
    description: '대전 대덕구 비래동로7번길 1, 2층 바른한의원 대전본점(010-5631-1275). 안정위 대표원장의 심층 맥진·9대 정밀검진과 학술 논문 검증 안심 한약으로 추나·키성장·다이어트·탈모·황제공진단·전립선을 맞춤 진료합니다.',
    preloadImg: GH_RAW_BASE + 'webp/card_1_director.webp',
    breadcrumbName: '홈'
  },
  director: {
    file: 'director.html',
    path: '/director/',
    title: '안정위 대표원장 · 9대 정밀검진 | 바른한의원 대전본점 사상체질·초음파',
    description: '초음파·체열진단·이비인후 내시경·사상체질·자율신경(HRV)·간수치·성장판까지 9대 정밀검진과 원내 안심 탕전 시스템으로 질환의 뿌리를 찾는 바른한의원 대전본점 안정위 대표원장 진료 철학을 소개합니다.',
    preloadImg: GH_RAW_BASE + 'webp/card_1_director.webp',
    breadcrumbName: '안정위 대표원장 · 9대 정밀검진',
    isProfile: true
  },
  chuna: {
    file: 'chuna.html',
    path: '/chuna/',
    title: '대전 추나요법 · 허리디스크 · 체형교정 클리닉 | 바른한의원 대전본점',
    description: '진통제로 통증만 가리지 않고 대표원장 1:1 수기 추나와 약침으로 틀어진 척추·골반·거북목 중심축을 바로잡습니다. JAMA·Lancet 학술 논문 근거 기반 비수술 척추·관절 통증 치료 클리닉입니다.',
    preloadImg: GH_RAW_BASE + 'webp/chuna_minimal_card2_painkiller_limit.webp',
    breadcrumbName: '바른 추나 · 척추교정'
  },
  growth: {
    file: 'growth.html',
    path: '/growth/',
    title: '대전 소아 키성장 · 성조숙증 · 비염 성장클리닉 | 바른한의원 대전본점',
    description: '무방사선 초음파 성장판 정밀 검사와 국가공인 안심 한약으로 성호르몬 과항진 없이 성장판 연골 증식, 소아비만 대사 전환, 비염·구강호흡 면역을 함께 키우는 대전 소아 성장 클리닉입니다.',
    preloadImg: GH_RAW_BASE + 'webp/growth-director-son-comparison.webp',
    breadcrumbName: '바른 성장 · 성조숙증'
  },
  'diet-zero': {
    file: 'diet-zero.html',
    path: '/diet-zero/',
    title: '대전 다이어트 한의원 · 식욕ZERO 근육다이어트 | 바른한의원 대전본점',
    description: '무작정 굶는 요요 없이 기초대사와 갈색지방 연소를 깨워 근육은 지키고 내장지방·부종 독소만 비워내는 바른 식욕ZERO 다이어트 한약. 대표원장 1:1 진맥 및 비대면 상담을 지원합니다.',
    preloadImg: GH_RAW_BASE + 'webp/diet_minimal_card2_starvation_muscle_loss.webp',
    breadcrumbName: '바른 다이어트 · 식욕ZERO'
  },
  hairloss: {
    file: 'hairloss.html',
    path: '/hairloss/',
    title: '대전 탈모 한의원 · 두피열 모근재생 4대 클리닉 | 바른한의원 대전본점',
    description: '머리는 뜨겁고 손발은 찬 상열하한 두피 사막화를 수승화강 청열 한약·경추 추나·모낭 약침으로 다스립니다. 남성·여성·원형탈모·지루성두피염 4대 유형별 맞춤 모근재생 치료를 시행합니다.',
    preloadImg: GH_RAW_BASE + 'webp/detail_hair_story1_30cm_tension.webp',
    breadcrumbName: '바른 탈모 · 모근재생'
  },
  'hairloss-male': {
    file: 'hairloss-male.html',
    path: '/hairloss-male/',
    title: '대전 남성탈모 · M자 · 정수리 모근재생 | 바른한의원 대전본점 탈모',
    description: '호르몬 억제 부담을 덜고 수승화강 두피 청열 한약, 거북목 경추 추나, 정제 발모 약침으로 M자 이마와 정수리 가늘어진 모근의 자생력을 깨우는 대전 남성탈모 집중 클리닉입니다.',
    preloadImg: GH_RAW_BASE + 'webp/detail_hair_story1_30cm_tension.webp',
    breadcrumbName: '바른 남성탈모 · M자·정수리'
  },
  'hairloss-alopecia': {
    file: 'hairloss-alopecia.html',
    path: '/hairloss-alopecia/',
    title: '대전 원형탈모 · 자가면역 두피 복원 클리닉 | 바른한의원 대전본점',
    description: '스테로이드 의존과 재발 걱정 없이 자율신경(HRV) 안정과 모낭 주위 자가면역 균형 회복으로 동전 모양 단발성·다발성·사행성 원형탈모의 뿌리를 치료하는 면역 복원 클리닉입니다.',
    preloadImg: GH_RAW_BASE + 'webp/detail_hair_follicle_3d.webp',
    breadcrumbName: '바른 원형탈모 · 면역복원'
  },
  'hairloss-female': {
    file: 'hairloss-female.html',
    path: '/hairloss-female/',
    title: '대전 여성탈모 · 정수리 가르마 볼륨 클리닉 | 바른한의원 대전본점',
    description: '출산·갱년기·스트레스로 두피는 뜨겁고 아랫배는 찬 여성 상열하한과 혈허를 다스려 넓어진 가르마 밀도와 정수리 모발 볼륨을 건강하게 되살리는 여성 맞춤 탈모 클리닉입니다.',
    preloadImg: GH_RAW_BASE + 'webp/detail_hair_story1_date_bow.webp',
    breadcrumbName: '바른 여성탈모 · 가르마·볼륨'
  },
  'hairloss-seborrheic': {
    file: 'hairloss-seborrheic.html',
    path: '/hairloss-seborrheic/',
    title: '대전 지루성두피염 · 두피 홍반 · 모낭염 해독 | 바른한의원 대전본점',
    description: '샴푸·연고로도 반복되는 두피 열감, 붉은 홍반, 화농성 모낭염, 가려움과 비듬 각질을 심부 청열해독 한약과 두피 진피 장벽 케어로 진정시키는 지루성두피염 클리닉입니다.',
    preloadImg: GH_RAW_BASE + 'webp/detail_hair_thermography.webp',
    breadcrumbName: '바른 지루성두피염 · 열독해독'
  },
  gongjindan: {
    file: 'gongjindan.html',
    path: '/gongjindan/',
    title: '대전 공진단 · 식약처 정품 사향 황제공진단 | 바른한의원 대전본점',
    description: '식약처 CITES 인증 천연 사향(L-Muscone)과 러시아산 원용 분골 녹용을 대표원장이 정밀 계량·수제 조제합니다. 만성피로·뇌신경 보호·면역력·수험생·부모님 기력 회복 맞춤 처방.',
    preloadImg: GH_RAW_BASE + 'webp/gongjindan_minimal_card3_circulation_a.webp',
    breadcrumbName: '바른 황제공진단'
  },
  prostate: {
    file: 'prostate.html',
    path: '/prostate/',
    title: '대전 전립선염 · 전립선비대 · 야간뇨 클리닉 | 바른한의원 대전본점',
    description: '반복되는 잔뇨감, 새벽 야간뇨, 골반·회음부 통증을 전립선 울혈 감압 한약, 골반 교정 추나, 방광·신장 온양 약침으로 다스려 시원한 배뇨와 깊은 숙면을 되찾아 드립니다.',
    preloadImg: GH_RAW_BASE + 'webp/prostate_minimal_card2_antibiotic_limit.webp',
    breadcrumbName: '바른 전립선 · 남성활력'
  },
  'body-explorer': {
    file: 'body-explorer.html',
    path: '/body-explorer/',
    title: '3D 인체모형 해부학 가이드 & 진료 살펴보기 | 바른한의원 대전본점',
    description: '풀스크린 3D 인체모형으로 머리부터 발끝까지 근육·신경·관절·혈관 구조와 9대 부위별 생활 건강 관리법, 해외 SCI 의학 논문 요약을 한눈에 탐색하는 인터랙티브 건강 포털입니다.',
    preloadImg: DEFAULT_OG_IMAGE,
    breadcrumbName: '3D 인체모형 진료 살펴보기'
  },
  'ask-doctor': {
    file: 'ask-doctor.html',
    path: '/ask-doctor/',
    title: '통합의학 인사이트 저널 & 1:1 비공개 건강 Q&A | 바른한의원 대전본점',
    description: 'Nature Medicine·NEJM·Lancet·JAMA 등 해외 의학 저널 기반 건강 칼럼과 9대 질환 카테고리별 100% 비공개 1:1 의료진 건강 상담(소셜 간편 로그인) 공간입니다.',
    preloadImg: DEFAULT_OG_IMAGE,
    breadcrumbName: '의학 인사이트 & 1:1 비공개 Q&A',
    hasFaq: true
  },
  'lifting-compare': {
    file: 'lifting-compare.html',
    path: '/lifting-compare/',
    title: '대전 한방 리프팅 · 비수술 전후 윤곽진단 | 바른한의원 대전본점',
    description: '수술 없이 처진 턱선·팔자·안면 비대칭 탄력을 복원하는 바른한의원 대전본점 한방 매선·약침 리프팅 클리닉 및 3점 중심축 정밀 전후 윤곽 비교 진단 스튜디오입니다.',
    preloadImg: DEFAULT_OG_IMAGE,
    breadcrumbName: '바른리프팅 시술 전후 윤곽진단'
  },
  'integrative-autonomic-circadian-gut-spine-health-review': {
    file: null,
    path: '/integrative-autonomic-circadian-gut-spine-health-review/',
    title: '만성피로·소화장애·척추통증 통합생리학 가이드 | 바른 통합의학 저널',
    description: '만성 피로, 소화 불량, 척추 통증이 왜 동시에 나타나는지 해외 SCI 학술지(Nature Medicine, JAMA, Lancet) 근거로 자율신경·장-뇌 축·생체역학 연결고리를 분석한 의학 리뷰입니다.',
    preloadImg: DEFAULT_OG_IMAGE,
    breadcrumbName: '만성피로·소화장애·척추통증 통합생리학 가이드',
    isArticle: true,
    datePublished: '2026-10-26',
    dateModified: '2026-10-27'
  }
};

function buildJsonLdForKey(key, customOgImg) {
  const cfg = SEO_PAGES[key] || SEO_PAGES.home;
  const canonicalUrl = CANONICAL_ORIGIN + cfg.path;
  const ogImg = customOgImg || DEFAULT_OG_IMAGE;

  const orgNode = JSON.parse(JSON.stringify(CLINIC_BASE_ORG));
  orgNode.image = ogImg;

  const graph = [orgNode, WEBSITE_NODE];

  if (cfg.path !== '/') {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': canonicalUrl + '#breadcrumb',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '바른한의원 대전본점', item: CANONICAL_ORIGIN + '/' },
        { '@type': 'ListItem', position: 2, name: cfg.breadcrumbName || cfg.title, item: canonicalUrl }
      ]
    });
  }

  if (cfg.isProfile) {
    graph.push({
      '@type': 'ProfilePage',
      '@id': canonicalUrl + '#profile',
      url: canonicalUrl,
      name: cfg.title,
      mainEntity: {
        '@type': 'Person',
        '@id': CANONICAL_ORIGIN + '/director/#physician',
        name: '안정위',
        jobTitle: '바른한의원 대전본점 대표원장 (한의사)',
        worksFor: { '@id': CANONICAL_ORIGIN + '/#clinic' }
      }
    });
  }

  if (cfg.hasFaq) {
    graph.push({
      '@type': 'FAQPage',
      '@id': canonicalUrl + '#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: '혈액검사와 내시경·MRI 결과가 정상인데도 왜 몸은 계속 피곤하고 아픈가요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '일반 영상·혈액검사는 장기 조직의 구조적 손상을 찾는 데 최적화되어 있습니다. 자율신경 변이도 저하, 위 배출 지연, 저등급 만성염증, 골반·척추의 기능적 불균형은 구조 손상 이전의 기능적 조절 장애이므로 수면·식습관·생체역학 평가가 함께 이루어져야 원인을 파악할 수 있습니다.'
          }
        },
        {
          '@type': 'Question',
          name: '바른한의원 대전본점의 위치와 진료시간은 어떻게 되나요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '대전광역시 대덕구 비래동로7번길 1, 2층(비래동)에 위치하고 있으며 대표전화는 010-5631-1275입니다. 평일(월~금)은 오전 9시부터 저녁 7시까지, 토요일 및 공휴일은 오전 9시부터 오후 2시까지 진료하며 일요일은 휴진입니다.'
          }
        }
      ]
    });
  }

  if (cfg.isArticle) {
    graph.push({
      '@type': 'Article',
      '@id': canonicalUrl + '#article',
      headline: cfg.title,
      description: cfg.description,
      image: [ogImg],
      datePublished: cfg.datePublished || '2026-10-26',
      dateModified: cfg.dateModified || '2026-10-27',
      inLanguage: 'ko-KR',
      author: {
        '@type': 'Person',
        name: '바른 통합의학 리서치 에디토리얼 (감수: 안정위 한의사)',
        url: CANONICAL_ORIGIN + '/director/'
      },
      publisher: { '@id': CANONICAL_ORIGIN + '/#clinic' }
    });
    graph.push({
      '@type': 'FAQPage',
      '@id': canonicalUrl + '#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: '혈액검사와 내시경·MRI 결과가 정상인데도 왜 몸은 계속 피곤하고 아픈가요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '일반 영상·혈액검사는 장기 조직의 파괴나 종양·궤양 같은 구조적 병변을 찾아내는 데 최적화되어 있습니다. 반면 자율신경 변이도 저하, 위 배출 속도 지연, 저등급 만성염증, 근막·골반의 기능적 불균형은 구조적 손상 이전 단계인 기능적 조절 장애(Functional Dysregulation)에 해당하므로 수면·식습관·생체역학 평가가 함께 이루어져야 원인을 파악할 수 있습니다.'
          }
        },
        {
          '@type': 'Question',
          name: '만성 피로와 소화불량을 동시에 겪을 때 가장 먼저 바꾸어야 할 생활습관 한 가지는 무엇인가요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '취침 3시간 전 금식(야간 12시간 공복 유지)과 일정한 시각의 아침 자연광 노출입니다. 밤사이 위장관이 비워져야 미주신경 회복과 깊은 서파수면이 이루어지며, 다음 날 아침 코르티솔·세로토닌 일주기 리듬이 정상화되어 피로와 소화력이 함께 개선됩니다.'
          }
        }
      ]
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph
  };
}

function buildHeadSeoTagsHtml(key, customOgImg) {
  const cfg = SEO_PAGES[key] || SEO_PAGES.home;
  const canonicalUrl = CANONICAL_ORIGIN + cfg.path;
  const ogImg = customOgImg || DEFAULT_OG_IMAGE;
  const ogType = cfg.isArticle ? 'article' : 'website';
  const ldJson = JSON.stringify(buildJsonLdForKey(key, ogImg));
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const lines = [
    `  <title>${esc(cfg.title)}</title>`,
    `  <meta name="description" content="${esc(cfg.description)}">`,
    `  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">`,
    `  <link rel="canonical" href="${esc(canonicalUrl)}">`,
    `  <link rel="alternate" hreflang="ko-KR" href="${esc(canonicalUrl)}">`,
    `  <link rel="alternate" hreflang="x-default" href="${esc(canonicalUrl)}">`,
    `  <meta property="og:locale" content="ko_KR">`,
    `  <meta property="og:type" content="${ogType}">`,
    `  <meta property="og:site_name" content="바른한의원 대전본점">`,
    `  <meta property="og:title" content="${esc(cfg.title)}">`,
    `  <meta property="og:description" content="${esc(cfg.description)}">`,
    `  <meta property="og:url" content="${esc(canonicalUrl)}">`,
    `  <meta property="og:image" content="${esc(ogImg)}">`,
    `  <meta property="og:image:width" content="1200">`,
    `  <meta property="og:image:height" content="630">`,
    `  <meta name="twitter:card" content="summary_large_image">`,
    `  <meta name="twitter:title" content="${esc(cfg.title)}">`,
    `  <meta name="twitter:description" content="${esc(cfg.description)}">`,
    `  <meta name="twitter:image" content="${esc(ogImg)}">`
  ];
  if (cfg.preloadImg) {
    lines.push(`  <link rel="preload" as="image" href="${esc(cfg.preloadImg)}" fetchpriority="high">`);
  }
  lines.push(`  <script type="application/ld+json">${ldJson}</script>`);
  return lines.join('\n');
}

module.exports = {
  CANONICAL_ORIGIN,
  GH_RAW_BASE,
  DEFAULT_OG_IMAGE,
  CLINIC_BASE_ORG,
  WEBSITE_NODE,
  SEO_PAGES,
  buildJsonLdForKey,
  buildHeadSeoTagsHtml
};
