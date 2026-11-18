/**
 * 바른한의원 대전본점 — 마스터 SEO · 로컬 스키마 · AI GEO 설정 (Single Source of Truth)
 * 기준 대표 도메인: https://www.bareunhaniwon.com
 */
const CANONICAL_ORIGIN = 'https://www.bareunhaniwon.com';
const GH_RAW_BASE = 'https://raw.githubusercontent.com/ajwei0508-cpu/bareun-homepage/main/homepage/';
const DEFAULT_OG_IMAGE = 'https://www.bareunhaniwon.com/wp-content/uploads/2026/10/og-bareun-1200x630-1.jpg';
const NAVER_SITE_VERIFICATION = '4069e9810cb66fcbb9eb3955b54e627f5096ac30';
const GOOGLE_SITE_VERIFICATION = '-OtjjERbe9ctyW4q9rwaFiNj9OvxGvOE7Bd1MBjSsX4';

const CLINIC_BASE_ORG = {
  '@type': ['MedicalClinic', 'MedicalOrganization', 'LocalBusiness'],
  '@id': CANONICAL_ORIGIN + '/#clinic',
  name: '바른한의원 대전본점',
  alternateName: ['Bareun Korean Medicine Clinic Daejeon', '대전 바른한의원'],
  url: CANONICAL_ORIGIN + '/',
  logo: GH_RAW_BASE + 'webp/card_1_director.webp',
  image: DEFAULT_OG_IMAGE,
  telephone: '+82-10-5631-1275',
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+82-10-5631-1275',
      contactType: 'customer service',
      areaServed: 'KR',
      availableLanguage: ['Korean']
    }
  ],
  taxID: '211-91-10479',
  vatID: '211-91-10479',
  identifier: {
    '@type': 'PropertyValue',
    name: '사업자등록번호',
    value: '211-91-10479'
  },
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
    latitude: 36.354682,
    longitude: 127.4492455
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
  hasMap: 'https://map.naver.com/p/entry/place/70885113',
  areaServed: [
    { '@type': 'AdministrativeArea', name: '대전광역시' },
    { '@type': 'AdministrativeArea', name: '대덕구' },
    { '@type': 'AdministrativeArea', name: '비래동' },
    { '@type': 'AdministrativeArea', name: '동구' },
    { '@type': 'AdministrativeArea', name: '서구' },
    { '@type': 'AdministrativeArea', name: '유성구' },
    { '@type': 'AdministrativeArea', name: '중구' },
    { '@type': 'AdministrativeArea', name: '세종특별자치시' }
  ],
  availableService: [
    { '@type': 'MedicalTherapy', name: '바른 추나요법 · 비수술 척추·골반·디스크·교통사고 클리닉', url: CANONICAL_ORIGIN + '/chuna/' },
    { '@type': 'MedicalTherapy', name: '바른 소아 키성장 · 성조숙증 · 무방사선 초음파 성장판 클리닉', url: CANONICAL_ORIGIN + '/growth/' },
    { '@type': 'MedicalTherapy', name: '바른 식욕ZERO · 내장지방 · 산후 다이어트 클리닉', url: CANONICAL_ORIGIN + '/diet-zero/' },
    { '@type': 'MedicalTherapy', name: '바른 4대 유형 탈모(남성·원형·여성·지루성두피염) 모근재생 클리닉', url: CANONICAL_ORIGIN + '/hairloss/' },
    { '@type': 'MedicalTherapy', name: '식약처 CITES 인증 정품 사향 황제공진단 · 만성피로 클리닉', url: CANONICAL_ORIGIN + '/gongjindan/' },
    { '@type': 'MedicalTherapy', name: '만성 전립선염 · 전립선비대증 · 야간뇨 · 과민성방광 클리닉', url: CANONICAL_ORIGIN + '/prostate/' }
  ],
  sameAs: [
    'https://map.naver.com/p/entry/place/70885113',
    'https://m.place.naver.com/hospital/70885113/home',
    'https://naver.me/5U1ELn8L',
    'https://blog.naver.com/wei0508',
    'https://www.youtube.com/@bareunhaniwon',
    'https://www.threads.net/@bareun_oriental',
    'https://www.instagram.com/bareun_oriental/',
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
    title: '바른한의원 대전본점 | 대덕구 비래동 추나·성장·다이어트·탈모·공진단·전립선',
    description: '내 가족에게 처방·시술한 치료만 하는 아빠 한의사, 바른한의원 대전본점(안정위 대표원장)입니다. 추나요법, 허리·목디스크, 소아 키성장, 성장판검사, 성조숙증, 비염, 축농증, 식욕ZERO 다이어트, 내장지방, 남성·여성·원형탈모, 지루성두피염, 담적, 위염, 난임, 산후보약, 황제공진단, 전립선, 리프팅 맞춤 한방 치료.',
    preloadImg: GH_RAW_BASE + 'webp/card_1_director.webp',
    breadcrumbName: '홈'
  },
  'story-3d': {
    file: 'story-3d.html',
    path: '/',
    title: '바른한의원 대전본점 | 대덕구 비래동 추나·성장·다이어트·탈모·공진단·전립선',
    description: '내 가족에게 처방·시술한 치료만 하는 아빠 한의사, 바른한의원 대전본점(안정위 대표원장)입니다. 추나요법, 허리·목디스크, 소아 키성장, 성장판검사, 성조숙증, 비염, 축농증, 식욕ZERO 다이어트, 내장지방, 남성·여성·원형탈모, 지루성두피염, 담적, 위염, 난임, 산후보약, 황제공진단, 전립선, 리프팅 맞춤 한방 치료.',
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
    title: '3D 인체모형 진료 살펴보기 · 오늘의 건강 글 · 무엇이든 물어보세요 | 바른한의원 대전본점',
    description: '풀스크린 3D 인체모형으로 머리부터 발끝까지 근육·신경·관절·혈관 구조와 9대 부위별 오늘의 건강 글(72편), 전 질환 통합 1:1 질문(무엇이든 물어보세요)을 한눈에 살펴보는 건강 포털입니다.',
    preloadImg: DEFAULT_OG_IMAGE,
    breadcrumbName: '3D 인체모형 진료 살펴보기'
  },
  'ask-doctor': {
    file: 'ask-doctor.html',
    path: '/body-explorer/',
    title: '3D 인체모형 진료 살펴보기 · 오늘의 건강 글 · 무엇이든 물어보세요 | 바른한의원 대전본점',
    description: '풀스크린 3D 인체모형으로 머리부터 발끝까지 근육·신경·관절·혈관 구조와 9대 부위별 오늘의 건강 글(72편), 전 질환 통합 1:1 질문(무엇이든 물어보세요)을 한눈에 살펴보는 건강 포털입니다.',
    preloadImg: DEFAULT_OG_IMAGE,
    breadcrumbName: '3D 인체모형 진료 살펴보기',
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
  location: {
    file: 'location.html',
    path: '/location/',
    title: '오시는길 · 진료시간 · 주차 · 비급여 진료비 안내 | 바른한의원 대전본점',
    description: '대전 대덕구 비래동로7번길 1, 2층 바른한의원 대전본점 오시는길, 네이버·구글·티맵·카카오맵 원클릭 자동 길안내, 평일·토요일·공휴일 진료시간, 주차 안내 및 의료법 제45조 비급여 진료비용 안내표입니다.',
    preloadImg: DEFAULT_OG_IMAGE,
    breadcrumbName: '오시는길 · 진료시간 · 비급여 안내'
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
    dateModified: '2026-10-28'
  },
  sample: {
    file: 'sample.html',
    path: '/sample/',
    title: '바른한의원 실제 홈페이지 작동 샘플 · 기능별 티어 마크 안내 | 바른 메디테크',
    description: '실제 운영 중인 www.bareunhaniwon.com 화면에서 스토리보드, 3D 인체모형, 건강 칼럼, 자가진단 등 각 기능별 스탠다드(✕), 프로(△), 시그니처(○) 차이점을 직접 체험해 보세요.',
    preloadImg: DEFAULT_OG_IMAGE,
    breadcrumbName: '홈페이지 샘플',
    robots: 'noindex, nofollow'
  },
  'b2b-landing': {
    file: 'b2b-landing.html',
    path: '/b2b/',
    title: '한의원 하이엔드 홈페이지 솔루션 · 스탠다드·프로·시그니처 비교 | 바른 메디테크',
    description: '환자의 체류시간과 신환 전환율을 극대화하는 한의원 전용 하이엔드 반응형 홈페이지 솔루션. 실제 작동 샘플과 티어별 기능 비교를 확인하세요.',
    preloadImg: DEFAULT_OG_IMAGE,
    breadcrumbName: 'B2B 솔루션 안내',
    robots: 'noindex, nofollow'
  }
};

function resolveSeoPageCfg(key) {
  if (SEO_PAGES[key]) return SEO_PAGES[key];
  try {
    const fs = require('fs');
    const path = require('path');
    const cfgPath = path.join(__dirname, 'detail-pages-config.json');
    if (fs.existsSync(cfgPath)) {
      const parsed = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
      const found = (parsed.pages || []).find(p => p && (p.slug === key || p.file === key));
      if (found) {
        const cleanSlug = String(found.slug || key).replace(/\.html$/i, '');
        const korTitle = (found.meta && found.meta.title) || String(found.label || cleanSlug).replace(/^[^\w가-힣]+/, '').trim();
        const descArr = (found.meta && Array.isArray(found.meta.desc)) ? found.meta.desc : [];
        return {
          file: found.file || (cleanSlug + '.html'),
          path: '/' + cleanSlug + '/',
          title: `${korTitle} | 바른한의원 대전본점`,
          description: descArr.join(' ') || `바른한의원 대전본점 ${korTitle} 1:1 대표원장 맞춤 한방 치료 클리닉입니다.`,
          preloadImg: DEFAULT_OG_IMAGE,
          breadcrumbName: korTitle
        };
      }
    }
  } catch (e) {}
  return SEO_PAGES.home;
}

function buildJsonLdForKey(key, customOgImg) {
  const cfg = resolveSeoPageCfg(key);
  const canonicalUrl = CANONICAL_ORIGIN + cfg.path;
  const ogImg = customOgImg || DEFAULT_OG_IMAGE;

  const orgNode = JSON.parse(JSON.stringify(CLINIC_BASE_ORG));
  orgNode.image = ogImg;

  const webPageNode = {
    '@type': 'MedicalWebPage',
    '@id': canonicalUrl + '#webpage',
    url: canonicalUrl,
    name: cfg.title,
    description: cfg.description,
    inLanguage: 'ko-KR',
    isPartOf: { '@id': CANONICAL_ORIGIN + '/#website' },
    about: { '@id': CANONICAL_ORIGIN + '/#clinic' },
    reviewedBy: {
      '@type': 'Person',
      '@id': CANONICAL_ORIGIN + '/director/#physician',
      name: '안정위',
      jobTitle: '바른한의원 대전본점 대표원장 (한의사)'
    },
    lastReviewed: '2026-11-18',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.aeo-direct-answer', '.bareun-geo-ssr-summary', '.bareun-geo-ssr-table', '.geo-fact-table']
    }
  };

  const graph = [orgNode, WEBSITE_NODE, webPageNode];

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

  if (key === 'ask-doctor' || key === 'body-explorer') {
    webPageNode.speakable = {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.aeo-direct-answer', '.geo-fact-table', '.hip-question-title', '.seo-standalone-note-item']
    };
    try {
      const { BODY_3D_AUTO_NOTES } = require('./body-3d-auto-notes-data.js');
      const all72 = [];
      for (const [partId, eps] of Object.entries(BODY_3D_AUTO_NOTES || {})) {
        if (!Array.isArray(eps) || eps.length === 0) continue;
        eps.forEach(ep => {
          all72.push({
            id: ep.id,
            partId,
            partLabel: ep.partLabel,
            keyword: ep.keyword,
            title: ep.questionTitle
          });
        });
      }
      if (all72.length > 0) {
        graph.push({
          '@type': 'ItemList',
          '@id': canonicalUrl + '#health-notes-72',
          name: '바른한의원 3D 백과사전 오늘의 건강 글 72선 아카이브',
          numberOfItems: all72.length,
          itemListElement: all72.map((n, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            name: `[${n.partLabel} · ${n.keyword}] ${n.title}`,
            url: `${CANONICAL_ORIGIN}/health-note-${n.id}/`
          }))
        });
      }
    } catch (e) {}
  }

  if (cfg.isArticle) {
    graph.push({
      '@type': 'MedicalScholarlyArticle',
      '@id': canonicalUrl + '#article',
      headline: cfg.title,
      description: cfg.description,
      image: [ogImg],
      datePublished: cfg.datePublished || '2026-10-26',
      dateModified: cfg.dateModified || '2026-10-28',
      inLanguage: 'ko-KR',
      author: {
        '@type': 'Person',
        '@id': CANONICAL_ORIGIN + '/director/#physician',
        name: '안정위',
        url: CANONICAL_ORIGIN + '/director/'
      },
      publisher: { '@id': CANONICAL_ORIGIN + '/#clinic' }
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph
  };
}

function buildHeadSeoTagsHtml(key, customOgImg) {
  const cfg = resolveSeoPageCfg(key);
  const canonicalUrl = CANONICAL_ORIGIN + cfg.path;
  const ogImg = customOgImg || DEFAULT_OG_IMAGE;
  const ogType = cfg.isArticle ? 'article' : 'website';
  const ldJson = JSON.stringify(buildJsonLdForKey(key, ogImg));
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const lines = [
    `  <title>${esc(cfg.title)}</title>`,
    `  <meta name="description" content="${esc(cfg.description)}">`,
    `  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">`,
    `  <meta name="naver-site-verification" content="${esc(NAVER_SITE_VERIFICATION)}">`,
    `  <meta name="google-site-verification" content="${esc(GOOGLE_SITE_VERIFICATION)}">`,
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

const { buildGeoEntityDossierHtml } = require('./geo-entity-dossier.js');

module.exports = {
  CANONICAL_ORIGIN,
  GH_RAW_BASE,
  DEFAULT_OG_IMAGE,
  NAVER_SITE_VERIFICATION,
  GOOGLE_SITE_VERIFICATION,
  CLINIC_BASE_ORG,
  WEBSITE_NODE,
  SEO_PAGES,
  buildJsonLdForKey,
  buildHeadSeoTagsHtml,
  buildGeoEntityDossierHtml
};
