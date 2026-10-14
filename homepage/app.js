/**
 * BAREUN CLINIC (바른한의원 대전본점)
 * 100-Point Masterpiece: 5-Act, 13-Scene Continuous 3D Lifecycle Scrollytelling Cinema
 *
 * Inspired by:
 * - Patrick Clair / Elastic ('Westworld' Opening Title Sequence — Translucent Porcelain & Gold Anatomy)
 * - Terrence Malick ('The Tree of Life' — Cellular Genesis & Cosmic Bioluminescence)
 * - Denis Villeneuve ('Blade Runner 2049' — Volumetric Champagne Gold & Emerald Lighting)
 * - Refik Anadol & Apple Scrollytelling — Real-time Particle Morphing & Biometric Telemetry
 */

const CLINIC_SPECS = [
  {
    step: 1,
    slug: 'pediatric-growth',
    title: '01. 생명 잉태부터 폭풍 키성장까지',
    badge: 'STAGE 01 (0% ~ 25%) · 수정 ➔ 탄생 ➔ 감기면역 ➔ 키성장',
    mainCopy: '난임 착상 치료 · 소아 감기 면역강화 · 또래를 뛰어넘는 골격 성장',
    desc: '새 생명이 수정(난임치료)되어 세상에 태어나고, 면역력 저하로 찾아온 감기를 이겨내는 면역강화 한약부터 또래보다 작았던 키가 쭈욱 자라나는 성장치료까지 아이의 첫 생애를 바르게 세웁니다.',
    subPills: ['① 난임·수정', '② 아이 탄생', '③ 감기·면역치료', '④ 또래 키성장'],
    link: 'growth.html',
    color: '#34D399'
  },
  {
    step: 2,
    slug: 'appetite-zero',
    title: '02. 성인 비만과 날씬한 슬림 변신',
    badge: 'STAGE 02 (25% ~ 42%) · 성인 비만 발생 ➔ 바른 비만치료',
    mainCopy: '성인이 되며 불어난 체지방을 분해하여 가볍고 날씬한 바른 라인으로',
    desc: '아이가 성인이 되면서 대사 저하와 스트레스로 살이 찌고 비만이 된 체형을, 바른 다이어트(식욕 ZERO) 맞춤 한약으로 심부 체지방만 정밀 분해하여 건강하고 날씬한 슬림 바디로 변화시킵니다.',
    subPills: ['① 성인 체중증가·비만', '② 비만치료·슬림변신'],
    link: 'diet-zero.html#checkout-zone',
    color: '#F472B6'
  },
  {
    step: 3,
    slug: 'scalp-hair',
    title: '03. 30대 탈모 발생과 풍성한 모발 회복',
    badge: 'STAGE 03 (42% ~ 60%) · 30대 탈모 발생 ➔ 바른 탈모치료',
    mainCopy: '뜨거운 두피 열감을 식히고 약해진 모근을 깨워 다시 빽빽한 정상 모발로',
    desc: '30대 과로와 상열감으로 머리카락이 우수수 빠지는 탈모 위기에서, 두피의 붉은 열을 내리는 청열 한약과 고농도 모근 재생 약침으로 다시 굵고 풍성한 정상 모발을 되찾습니다.',
    subPills: ['① 30대 두피열·탈모', '② 탈모치료·모발회복'],
    link: 'https://pf.kakao.com/_ykxcLK',
    color: '#60A5FA'
  },
  {
    step: 4,
    slug: 'pain-chuna',
    title: '04. 근무 중 척추 틀어짐 & 추나 통증치료',
    badge: 'STAGE 04 (60% ~ 78%) · 척추·관절 통증 ➔ 바른 추나 회복',
    mainCopy: '격무로 틀어진 척추와 9대 관절 통증을 수기 추나와 봉약침으로 바르게 교정',
    desc: '장시간 근무로 거북목과 척추가 S자로 틀어지고 전신 9대 관절에 발생한 극심한 통증을, 한의학 박사 대표원장의 1:1 정밀 추나요법과 정품 봉약침으로 곧고 편안하게 회복시킵니다.',
    subPills: ['① 근무 척추틀어짐·통증', '② 추나교정·완전회복'],
    link: 'https://naver.me/5U1ELn8L',
    color: '#2F855A'
  },
  {
    step: 5,
    slug: 'gongjindan',
    title: '05. 황제공진단 기력 회복 & 아름다운 노년',
    badge: 'STAGE 05 (78% ~ 100%) · 노화·성인병 ➔ 황제공진단 ➔ 백세건강',
    mainCopy: '꺼져가는 기력과 성인병을 다스리고 품격 있고 아름답게 나이 들어가는 삶',
    desc: '나이가 들며 기력이 고갈되고 성인병이 찾아올 때, 식약처 CITES 인증 100% 정품 천연 사향과 녹용 분골로 빚은 24K 황제공진단으로 전신 12경락의 기력을 깨워 건강하고 아름다운 노년을 완성합니다.',
    subPills: ['① 노화·기력저하·성인병', '② 황제공진단 기력회복', '③ 아름다운 노년'],
    link: 'gongjindan.html',
    color: '#C5A059'
  }
];

/**
 * 13-Scene Master Narrative & Biometric Telemetry Choreography
 */
const SCENE_TIMELINE = [
  {
    index: 1,
    id: 'backdrop-1a',
    step: 1,
    subPillIndex: 0,
    start: 0.00,
    end: 0.06,
    isCrisis: false,
    actLabel: 'ACT 01 · 수정과 잉태',
    stateText: '✦ 난임·착상 치료',
    sceneTag: 'ACT I · SCENE 01 (난임·불임치료)',
    subtitle: '“간절한 기다림 끝에 찾아온 생명의 불꽃 — 바른 난임·착상 치료가 기적의 첫 장을 엽니다.”',
    metric1Title: '자궁 심부 착상 환경',
    metric1Value: '36.8°C 최적 온열',
    metric2Title: '수정·세포분열 활성도',
    metric2Value: '99.4% 기적의 착상',
    barPercent: 92
  },
  {
    index: 2,
    id: 'backdrop-1b',
    step: 1,
    subPillIndex: 1,
    start: 0.06,
    end: 0.12,
    isCrisis: false,
    actLabel: 'ACT 01 · 아이 탄생',
    stateText: '✦ 고귀한 생명 탄생',
    sceneTag: 'ACT I · SCENE 02 (아이 탄생)',
    subtitle: '“열 달의 따뜻한 품을 거쳐 세상에 태어난 아이 — 생명의 빛이 온전한 형상을 이룹니다.”',
    metric1Title: '신생아 생명력 지수',
    metric1Value: '100% 건강한 탄생',
    metric2Title: '오장육부·원기 발달',
    metric2Value: '최상급 생체 리듬',
    barPercent: 96
  },
  {
    index: 3,
    id: 'backdrop-1c',
    step: 1,
    subPillIndex: 2,
    start: 0.12,
    end: 0.18,
    isCrisis: true, // dynamically flips to false at p >= 0.15
    crisisThreshold: 0.15,
    actLabel: 'ACT 01 · 소아 면역강화',
    stateTextCrisis: '⚠️ 면역저하 · 감기 침투',
    stateTextHeal: '✦ 면역강화 한약 보호막',
    sceneTag: 'ACT I · SCENE 03 (감기 ➔ 면역강화치료)',
    subtitleCrisis: '“면역력 저하로 찾아온 차가운 감기와 비염 — 여린 호흡기가 바이러스에 흔들립니다.”',
    subtitleHeal: '“바른 면역강화 녹용 보약이 황금빛 보호막을 펼쳐 감기 기운을 정화하고 자생력을 깨웁니다.”',
    metric1Title: '호흡기·전신 면역력',
    metric2Title: '감기·바이러스 방어막'
  },
  {
    index: 4,
    id: 'backdrop-1d',
    step: 1,
    subPillIndex: 3,
    start: 0.18,
    end: 0.25,
    isCrisis: true, // flips at 0.205
    crisisThreshold: 0.205,
    actLabel: 'ACT 01 · 바른 키성장',
    stateTextCrisis: '⚠️ 또래보다 작은 키',
    stateTextHeal: '✦ 성장치료 · 폭풍 키성장',
    sceneTag: 'ACT I · SCENE 04 (작은 키 ➔ 성장치료)',
    subtitleCrisis: '“또래 친구들과 나란히 서 있을 때 유독 작아 보였던 키 — 성장판이 잠들어 있습니다.”',
    subtitleHeal: '“무방사선 초음파 진단과 바른 성장치료로 32개 척추와 성장판이 깨어나 키가 쭈욱 자라납니다!”',
    metric1Title: '또래 대비 신장 추이',
    metric2Title: '성장판·골밀도 활성'
  },
  {
    index: 5,
    id: 'backdrop-2a',
    step: 2,
    subPillIndex: 0,
    start: 0.25,
    end: 0.335,
    isCrisis: true,
    actLabel: 'ACT 02 · 성인기 비만 발생',
    stateText: '⚠️ 체중 증가 · 비만 발생',
    sceneTag: 'ACT II · SCENE 05 (성인 비만 발생)',
    subtitle: '“성인이 되면서 잦은 야식과 대사 저하로 급격히 찐 살 — 무거운 체지방이 전신을 짓누릅니다.”',
    metric1Title: '체지방률 / 내장지방',
    metric1Value: '35.4% (비만 위험)',
    metric2Title: '기초 신진대사율',
    metric2Value: '44.0% (대사 정체)',
    barPercent: 32
  },
  {
    index: 6,
    id: 'backdrop-2b',
    step: 2,
    subPillIndex: 1,
    start: 0.335,
    end: 0.42,
    isCrisis: false,
    actLabel: 'ACT 02 · 바른 비만치료',
    stateText: '✦ 체지방 분해 · 슬림 라인',
    sceneTag: 'ACT II · SCENE 06 (비만치료 ➔ 날씬한 변신)',
    subtitle: '“바른 비만치료(식욕 ZERO)로 두꺼운 체지방이 황금빛 입자로 증발하며 날씬하고 탄탄한 몸매로 변신합니다.”',
    metric1Title: '실시간 체지방 감량',
    metric2Title: '대사 활성 & 바디라인'
  },
  {
    index: 7,
    id: 'backdrop-3a',
    step: 3,
    subPillIndex: 0,
    start: 0.42,
    end: 0.51,
    isCrisis: true,
    actLabel: 'ACT 03 · 30대 탈모 발생',
    stateText: '⚠️ 두피 상열감 · 탈모 진행',
    sceneTag: 'ACT III · SCENE 07 (30대 탈모 발생)',
    subtitle: '“30대가 되며 치솟는 스트레스성 두피 열감 — 모근이 약해지며 머리카락이 우수수 빠져나갑니다.”',
    metric1Title: '두피 표면 상열감',
    metric1Value: '39.2°C (적색 열독)',
    metric2Title: '모낭 밀도 & 모발 상태',
    metric2Value: '연모화 및 급격한 탈락',
    barPercent: 28
  },
  {
    index: 8,
    id: 'backdrop-3b',
    step: 3,
    subPillIndex: 1,
    start: 0.51,
    end: 0.60,
    isCrisis: false,
    actLabel: 'ACT 03 · 바른 탈모치료',
    stateText: '✦ 두피 청열 · 풍성한 발모',
    sceneTag: 'ACT III · SCENE 08 (탈모치료 ➔ 정상 회복)',
    subtitle: '“청량한 두피 청열 한약과 고농도 모근 약침으로 열감이 식고, 다시 빽빽하고 윤기 나는 정상 모발이 자라납니다.”',
    metric1Title: '두피 쿨링 온도 변화',
    metric2Title: '모근 재생 & 모발 밀도'
  },
  {
    index: 9,
    id: 'backdrop-4a',
    step: 4,
    subPillIndex: 0,
    start: 0.60,
    end: 0.69,
    isCrisis: true,
    actLabel: 'ACT 04 · 척추틀어짐 & 통증',
    stateText: '⚠️ 척추 틀어짐 · 9대관절 통증',
    sceneTag: 'ACT IV · SCENE 09 (근무 중 척추·관절 통증)',
    subtitle: '“끝없는 근무 속 앞으로 꺾인 거북목과 S자로 틀어진 척추 — 전신 9대 관절에 붉은 통증 신호가 타오릅니다.”',
    metric1Title: '척추·골반 틀어짐 변위',
    metric1Value: '18.6° 비대칭 왜곡',
    metric2Title: '9대 관절 통증 지수',
    metric2Value: 'VAS 8.5 (극심한 통증)',
    barPercent: 22
  },
  {
    index: 10,
    id: 'backdrop-4b',
    step: 4,
    subPillIndex: 1,
    start: 0.69,
    end: 0.78,
    isCrisis: false,
    actLabel: 'ACT 04 · 바른 추나·봉약침',
    stateText: '✦ 추나 수직교정 · 통증 소멸',
    sceneTag: 'ACT IV · SCENE 10 (추나 통증치료 ➔ 회복)',
    subtitle: '“대표원장 1:1 추나 교정과 정품 봉약침 파동이 전신을 스캔하며 틀어진 척추를 곧게 펴고 통증을 지웁니다.”',
    metric1Title: '척추 32마디 정렬도',
    metric2Title: '9대 관절 치유 상태'
  },
  {
    index: 11,
    id: 'backdrop-5a',
    step: 5,
    subPillIndex: 0,
    start: 0.78,
    end: 0.85,
    isCrisis: true,
    actLabel: 'ACT 05 · 노화와 기력저하',
    stateText: '⚠️ 기력 고갈 · 성인병 위험',
    sceneTag: 'ACT V · SCENE 11 (노화·기력저하·성인병)',
    subtitle: '“나이가 들며 찾아온 만성 기력 저하와 성인병의 그림자 — 기혈 순환이 느려지며 몸이 지쳐갑니다.”',
    metric1Title: '전신 원기·심폐 활력',
    metric1Value: '28.0% (기력 고갈)',
    metric2Title: '혈관·대사 성인병 지수',
    metric2Value: '순환 정체 · 관리 시급',
    barPercent: 28
  },
  {
    index: 12,
    id: 'backdrop-5b',
    step: 5,
    subPillIndex: 1,
    start: 0.85,
    end: 0.93,
    isCrisis: false,
    actLabel: 'ACT 05 · 황제공진단 처방',
    stateText: '✦ 24K 황제공진단 · 기력 폭발',
    sceneTag: 'ACT V · SCENE 12 (황제공진단 기력 회복)',
    subtitle: '“식약처 인증 100% 천연 사향과 녹용 분골의 24K 황제공진단이 심장과 12경락을 깨워 기력을 회복시킵니다.”',
    metric1Title: '12경락·뇌혈류 개통율',
    metric2Title: '성인병 예방·면역 활력'
  },
  {
    index: 13,
    id: 'backdrop-5c',
    step: 5,
    subPillIndex: 2,
    start: 0.93,
    end: 1.00,
    isCrisis: false,
    actLabel: 'ACT 05 · 아름다운 노년',
    stateText: '✦ 품격 있는 백세 건강 완성',
    sceneTag: 'ACT V · SCENE 13 (아름답게 나이 들어가는 삶)',
    subtitle: '“흐르는 세월마저 가장 눈부신 기품이 되도록 — 바른한의원이 당신의 건강하고 아름다운 노년을 함께합니다.”',
    metric1Title: '백세 장수·기력 지수',
    metric1Value: '99.8% 황금빛 활력',
    metric2Title: '평생 주치의 케어',
    metric2Value: '바른한의원 책임 전담',
    barPercent: 100
  }
];

/**
 * Soft Circular Radial Particle Texture for Bloom & Bioluminescent Points
 */
function createCircularParticleTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
  grad.addColorStop(0.3, 'rgba(253, 230, 138, 0.92)');
  grad.addColorStop(0.65, 'rgba(197, 160, 89, 0.4)');
  grad.addColorStop(1, 'rgba(197, 160, 89, 0.0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(canvas);
}

/**
 * Procedural 24K Crinkled Gold-Leaf Bump/Color Texture for Emperor Gongjindan
 */
function create24KGoldFoilTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createLinearGradient(0, 0, 512, 512);
  grad.addColorStop(0, '#D4AF37');
  grad.addColorStop(0.5, '#FDE68A');
  grad.addColorStop(1, '#99732B');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  // Subtle gold-leaf crinkle facets
  for (let i = 0; i < 900; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const r = 4 + Math.random() * 18;
    ctx.fillStyle = Math.random() > 0.5
      ? 'rgba(255, 251, 235, 0.16)'
      : 'rgba(120, 82, 20, 0.16)';
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + r, y + (Math.random() - 0.5) * r);
    ctx.lineTo(x + (Math.random() - 0.5) * r, y + r);
    ctx.closePath();
    ctx.fill();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

class BareunMasterpieceStoryApp {
  constructor() {
    this.currentStep = 1;
    this.currentSceneIndex = 1;
    this.scrollProgress = 0;
    this.isMobile = window.innerWidth <= 900;

    // Camera Lerp Inertia Targets
    this.targetCameraPos = new THREE.Vector3(0, 0, 95);
    this.targetLookAt = new THREE.Vector3(0, 0, 0);
    this.currentLookAt = new THREE.Vector3(0, 0, 0);
    this.mouseParallax = { x: 0, y: 0 };

    // Exact 9-Joint Coordinates (Relative to Stage Right-Center Anchor)
    this.jointAnchors = [
      { id: 'neck', name: '목 (경추)', pos: [0.0, 25.0, 0.0], chipKey: 'neck' },
      { id: 'shoulder_l', name: '어깨 (L)', pos: [-9.5, 19.5, 0.0], chipKey: 'shoulder' },
      { id: 'shoulder_r', name: '어깨 (R)', pos: [9.5, 19.5, 0.0], chipKey: 'shoulder' },
      { id: 'elbow_l', name: '팔꿈치 (L)', pos: [-13.5, 8.0, 0.0], chipKey: 'elbow' },
      { id: 'elbow_r', name: '팔꿈치 (R)', pos: [13.5, 8.0, 0.0], chipKey: 'elbow' },
      { id: 'finger_l', name: '손목/손가락 (L)', pos: [-16.0, -4.0, 0.0], chipKey: 'wrist' },
      { id: 'finger_r', name: '손목/손가락 (R)', pos: [16.0, -4.0, 0.0], chipKey: 'wrist' },
      { id: 'lumbar', name: '허리 (요추)', pos: [0.0, 2.0, -1.0], chipKey: 'waist' },
      { id: 'hip_l', name: '골반 (L)', pos: [-6.0, -6.0, 0.0], chipKey: 'hip' },
      { id: 'hip_r', name: '골반 (R)', pos: [6.0, -6.0, 0.0], chipKey: 'hip' },
      { id: 'knee_l', name: '무릎 (L)', pos: [-5.2, -20.0, 0.0], chipKey: 'knee' },
      { id: 'knee_r', name: '무릎 (R)', pos: [5.2, -20.0, 0.0], chipKey: 'knee' },
      { id: 'ankle_l', name: '발목 (L)', pos: [-4.5, -34.0, 0.0], chipKey: 'ankle' },
      { id: 'ankle_r', name: '발목 (R)', pos: [4.5, -34.0, 0.0], chipKey: 'ankle' },
      { id: 'toe_l', name: '발가락 (L)', pos: [-5.0, -37.5, 2.0], chipKey: 'toe' },
      { id: 'toe_r', name: '발가락 (R)', pos: [5.0, -37.5, 2.0], chipKey: 'toe' }
    ];

    this.initDOM();
    this.initThree();
    this.initGSAPScrollTrigger();
    this.initIntro();
    this.initDrawer();
    this.initInteractions();
    this.initClock();
    this.animate();

    window.currentAppStepSlug = CLINIC_SPECS[0].slug;
    this.renderTimeline(0);
  }

  initDOM() {
    this.canvas = document.getElementById('storyboard-canvas');
    this.stage = document.getElementById('story-stage-sticky');
    this.track = document.getElementById('story-scroll-track');
    this.hudPanel = document.getElementById('story-hud-panel');

    this.hudBadge = document.getElementById('hud-step-badge');
    this.hudCounter = document.getElementById('hud-step-counter');
    this.hudSubsceneFlow = document.getElementById('hud-subscene-flow');
    this.hudTitle = document.getElementById('hud-step-title');
    this.hudSubtitle = document.getElementById('hud-step-subtitle');
    this.hudDesc = document.getElementById('hud-step-desc');
    this.hudPrimaryBtn = document.getElementById('hud-primary-btn');
    this.hudDrawerBtn = document.getElementById('hud-drawer-btn');

    // Biometric Telemetry Elements
    this.telemetryStatus = document.getElementById('telemetry-status');
    this.metric1Title = document.getElementById('metric-1-title');
    this.metric1Value = document.getElementById('metric-1-value');
    this.metric2Title = document.getElementById('metric-2-title');
    this.metric2Value = document.getElementById('metric-2-value');
    this.telemetryBarFill = document.getElementById('telemetry-bar-fill');

    // Top Header Timeline & Bottom Cinema Subtitle
    this.timelineActLabel = document.getElementById('timeline-act-label');
    this.timelineProgressFill = document.getElementById('timeline-progress-fill');
    this.timelineStatePill = document.getElementById('timeline-state-pill');
    this.cinemaSceneTag = document.getElementById('cinema-scene-tag');
    this.cinemaSubtitleText = document.getElementById('cinema-subtitle-text');

    this.painRadarBox = document.getElementById('pain-radar-box');
    this.painRadarStatus = document.getElementById('pain-radar-status');

    // 13 Scene Backdrop Elements
    this.backdropMap = {};
    SCENE_TIMELINE.forEach(s => {
      this.backdropMap[s.id] = document.getElementById(s.id);
    });

    this.navDots = document.querySelectorAll('.step-nav-dot');
    this.sktCards = document.querySelectorAll('.skt-dock-card');
  }

  initClock() {
    const timeEl = document.getElementById('current-time');
    if (!timeEl) return;
    const updateClock = () => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      timeEl.textContent = `${hh}:${mm}`;
    };
    updateClock();
    setInterval(updateClock, 30000);
  }

  // =========================================================================
  // Three.js High-End Studio Setup with ACESFilmicToneMapping & Bloom
  // =========================================================================
  initThree() {
    if (!this.canvas || typeof THREE === 'undefined') return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(42, width / height, 1, 1000);
    this.camera.position.copy(this.targetCameraPos);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0.0);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.renderer.outputEncoding = THREE.sRGBEncoding;

    if (typeof THREE.EffectComposer !== 'undefined' && typeof THREE.UnrealBloomPass !== 'undefined') {
      try {
        this.composer = new THREE.EffectComposer(this.renderer);
        const renderPass = new THREE.RenderPass(this.scene, this.camera);
        this.composer.addPass(renderPass);

        this.bloomPass = new THREE.UnrealBloomPass(
          new THREE.Vector2(width, height),
          0.55,
          0.45,
          0.78
        );
        this.composer.addPass(this.bloomPass);
      } catch (err) {
        this.composer = null;
      }
    }

    // Studio 3-Point Lighting
    const ambientLight = new THREE.AmbientLight(0xF7F5F0, 0.85);
    this.scene.add(ambientLight);

    this.goldKeyLight = new THREE.DirectionalLight(0xFDE68A, 2.0);
    this.goldKeyLight.position.set(45, 65, 55);
    this.scene.add(this.goldKeyLight);

    this.emeraldRimLight = new THREE.DirectionalLight(0x10B981, 1.5);
    this.emeraldRimLight.position.set(-45, -30, 35);
    this.scene.add(this.emeraldRimLight);

    // Master Right-Center Anchor (Aligns 3D VFX with the 60% horizontal subject in 16:9 keyframes)
    this.stageAnchor = new THREE.Group();
    this.stageAnchor.position.set(this.isMobile ? 0 : 12, 0, 0);
    this.scene.add(this.stageAnchor);

    this.particleTex = createCircularParticleTexture();

    // Build all 5 Act 3D VFX Systems
    this.buildAct1LifecycleVFX();
    this.buildAct2ObesitySlimVFX();
    this.buildAct3HairLossRegrowthVFX();
    this.buildAct4SpineChunaVFX();
    this.buildAct5GongjindanAgingVFX();

    window.addEventListener('resize', () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      this.isMobile = w <= 900;
      this.stageAnchor.position.x = this.isMobile ? 0 : 12;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
      if (this.composer) {
        this.composer.setSize(w, h);
        if (this.bloomPass) this.bloomPass.setSize(w, h);
      }
      if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
    });
  }

  // =========================================================================
  // ACT 01 (0% ~ 25%): Fertilization -> Birth -> Cold/Immunity -> Peer Growth
  // =========================================================================
  buildAct1LifecycleVFX() {
    this.act1Group = new THREE.Group();
    this.stageAnchor.add(this.act1Group);

    // --- [1A] Fertilization: Ovum + 12 Swimming Sperm Helices + Mitosis Cells ---
    this.scene1aGroup = new THREE.Group();

    const ovumGeom = new THREE.SphereGeometry(8.5, 48, 48);
    this.ovumMat = new THREE.MeshPhysicalMaterial({
      color: 0xFFFBEB,
      emissive: 0xC5A059,
      emissiveIntensity: 0.7,
      transmission: 0.85,
      roughness: 0.12,
      metalness: 0.1,
      transparent: true,
      opacity: 0.85
    });
    this.ovumMesh = new THREE.Mesh(ovumGeom, this.ovumMat);
    this.scene1aGroup.add(this.ovumMesh);

    // Orbital Corona Rings
    this.ovumRings = new THREE.Group();
    for (let r = 0; r < 3; r++) {
      const rg = new THREE.TorusGeometry(11.5 + r * 3.2, 0.14, 16, 80);
      const rm = new THREE.MeshBasicMaterial({
        color: r === 1 ? 0x34D399 : 0xFDE68A,
        transparent: true,
        opacity: 0.65 - r * 0.15,
        blending: THREE.AdditiveBlending
      });
      const ring = new THREE.Mesh(rg, rm);
      ring.rotation.set(0.5 + r * 0.3, r * 0.4, 0);
      this.ovumRings.add(ring);
    }
    this.scene1aGroup.add(this.ovumRings);

    // 12 Swimming Golden Sperm Light Streams
    this.spermStreams = [];
    for (let s = 0; s < 12; s++) {
      const sGroup = new THREE.Group();
      const headGeom = new THREE.SphereGeometry(0.55, 16, 16);
      headGeom.scale(1.6, 1.0, 1.0);
      const headMat = new THREE.MeshBasicMaterial({
        color: 0xFFFBEB,
        transparent: true,
        opacity: 0.95
      });
      const head = new THREE.Mesh(headGeom, headMat);
      sGroup.add(head);

      // Undulating Flagellum Tail Line
      const tailPts = [];
      for (let t = 0; t < 20; t++) {
        tailPts.push(new THREE.Vector3(-t * 0.65, 0, 0));
      }
      const tailGeom = new THREE.BufferGeometry().setFromPoints(tailPts);
      const tailMat = new THREE.LineBasicMaterial({
        color: 0xFDE68A,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending
      });
      const tail = new THREE.Line(tailGeom, tailMat);
      sGroup.add(tail);

      const angle = (s === 0) ? Math.PI : (Math.PI + (Math.random() - 0.5) * 1.4);
      const dist = (s === 0) ? 28 : (32 + Math.random() * 18);
      const zOff = (s === 0) ? 2 : (Math.random() - 0.5) * 16;

      this.scene1aGroup.add(sGroup);
      this.spermStreams.push({
        group: sGroup,
        tail: tail,
        angle: angle,
        startDist: dist,
        zOff: zOff,
        isLead: s === 0,
        speedOffset: Math.random() * Math.PI * 2
      });
    }

    // Fertilization Golden Shockwave Ring
    const swGeom = new THREE.RingGeometry(1.0, 2.4, 64);
    this.fertShockwave = new THREE.Mesh(swGeom, new THREE.MeshBasicMaterial({
      color: 0xFDE68A,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending
    }));
    this.scene1aGroup.add(this.fertShockwave);

    this.act1Group.add(this.scene1aGroup);

    // --- [1B] Baby Birth: Helical Golden Womb Cocoon & Life Particles ---
    this.scene1bGroup = new THREE.Group();
    this.wombHelixLines = [];
    for (let h = 0; h < 4; h++) {
      const pts = [];
      const phase = (h * Math.PI) / 2;
      for (let i = 0; i <= 60; i++) {
        const t = i / 60;
        const y = -22 + t * 44;
        const radius = Math.sin(t * Math.PI) * 15;
        const ang = t * Math.PI * 3 + phase;
        pts.push(new THREE.Vector3(Math.cos(ang) * radius, y, Math.sin(ang) * radius));
      }
      const lGeom = new THREE.BufferGeometry().setFromPoints(pts);
      const lMat = new THREE.LineBasicMaterial({
        color: h % 2 === 0 ? 0xFDE68A : 0x34D399,
        transparent: true,
        opacity: 0.55,
        blending: THREE.AdditiveBlending
      });
      const line = new THREE.Line(lGeom, lMat);
      this.scene1bGroup.add(line);
      this.wombHelixLines.push(line);
    }
    this.scene1bGroup.visible = false;
    this.act1Group.add(this.scene1bGroup);

    // --- [1C] Cold Viral Spikes vs. Golden-Emerald Hexagonal Immunity Shield ---
    this.scene1cGroup = new THREE.Group();

    // Hexagonal Geodesic Immunity Shield Dome
    const shieldGeom = new THREE.IcosahedronGeometry(18, 2);
    this.immuneShieldWire = new THREE.Mesh(
      shieldGeom,
      new THREE.MeshBasicMaterial({
        color: 0xFDE68A,
        wireframe: true,
        transparent: true,
        opacity: 0.0,
        blending: THREE.AdditiveBlending
      })
    );
    this.scene1cGroup.add(this.immuneShieldWire);

    this.immuneShieldGlow = new THREE.Mesh(
      new THREE.SphereGeometry(17.6, 32, 32),
      new THREE.MeshPhysicalMaterial({
        color: 0x10B981,
        emissive: 0x34D399,
        emissiveIntensity: 0.6,
        transparent: true,
        opacity: 0.0,
        blending: THREE.AdditiveBlending
      })
    );
    this.scene1cGroup.add(this.immuneShieldGlow);

    // 40 Cold Viral Frost Crystals (Swarming then Repelled)
    this.viralCrystals = [];
    const viralGeom = new THREE.OctahedronGeometry(0.9, 0);
    for (let v = 0; v < 40; v++) {
      const vMat = new THREE.MeshBasicMaterial({
        color: 0x38BDF8,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending
      });
      const vMesh = new THREE.Mesh(viralGeom, vMat);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const dir = new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta),
        Math.sin(phi) * Math.sin(theta),
        Math.cos(phi)
      );
      this.scene1cGroup.add(vMesh);
      this.viralCrystals.push({ mesh: vMesh, dir: dir, baseDist: 14 + Math.random() * 14 });
    }
    this.scene1cGroup.visible = false;
    this.act1Group.add(this.scene1cGroup);

    // --- [1D] Peer Height Comparison & Spine Growth Laser Stretch ---
    this.scene1dGroup = new THREE.Group();

    // Central Child 32-Vertebrae Golden Spine + Knee Growth Plates
    this.childGrowthGroup = new THREE.Group();
    this.growthVertebrae = [];
    const vertGeom = new THREE.CylinderGeometry(0.9, 1.0, 0.35, 16);
    for (let i = 0; i < 24; i++) {
      const vm = new THREE.MeshBasicMaterial({
        color: i % 3 === 0 ? 0x34D399 : 0xFDE68A,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending
      });
      const vd = new THREE.Mesh(vertGeom, vm);
      vd.position.set(0, -4 + i * 0.8, 2);
      this.childGrowthGroup.add(vd);
      this.growthVertebrae.push(vd);
    }

    // Knee Growth Plate Starbursts (Left & Right Knees)
    const kneeRingGeom = new THREE.TorusGeometry(2.2, 0.18, 16, 48);
    const kneeMat = new THREE.MeshBasicMaterial({
      color: 0x34D399,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    });
    this.kneePlateL = new THREE.Mesh(kneeRingGeom, kneeMat);
    this.kneePlateL.rotation.x = Math.PI / 2;
    this.kneePlateL.position.set(-2.4, -15, 2);
    this.childGrowthGroup.add(this.kneePlateL);

    this.kneePlateR = new THREE.Mesh(kneeRingGeom, kneeMat.clone());
    this.kneePlateR.rotation.x = Math.PI / 2;
    this.kneePlateR.position.set(2.4, -15, 2);
    this.childGrowthGroup.add(this.kneePlateR);

    // Ascending Golden Growth Laser Columns
    this.growthBeams = new THREE.Group();
    for (let b = 0; b < 5; b++) {
      const bx = (b - 2) * 2.2;
      const bGeom = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(bx, -26, 0),
        new THREE.Vector3(bx, 32, 0)
      ]);
      const bLine = new THREE.Line(
        bGeom,
        new THREE.LineBasicMaterial({
          color: b === 2 ? 0x34D399 : 0xFDE68A,
          transparent: true,
          opacity: 0.65,
          blending: THREE.AdditiveBlending
        })
      );
      this.growthBeams.add(bLine);
    }
    this.scene1dGroup.add(this.growthBeams);

    // Horizontal Height Indicator Bar (Moves upward as child grows past peers!)
    const barGeom = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-22, 0, 3),
      new THREE.Vector3(22, 0, 3)
    ]);
    this.heightLaserBar = new THREE.Line(
      barGeom,
      new THREE.LineBasicMaterial({
        color: 0xFDE68A,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending
      })
    );
    this.scene1dGroup.add(this.heightLaserBar);

    this.scene1dGroup.add(this.childGrowthGroup);
    this.scene1dGroup.visible = false;
    this.act1Group.add(this.scene1dGroup);
  }

  // =========================================================================
  // ACT 02 (25% ~ 42%): Adult Obesity Contour Swell -> Lipolysis Vortex Dissolve
  // =========================================================================
  buildAct2ObesitySlimVFX() {
    this.act2Group = new THREE.Group();
    this.stageAnchor.add(this.act2Group);

    // 18 Horizontal Body Contour Rings (Morphing from Wide Obese Waist to Slim S-Line)
    this.bodyContourRings = [];
    for (let i = 0; i < 18; i++) {
      const normY = i / 17; // 0 (hips) to 1 (chest)
      const y = -16 + normY * 28;
      // Waist/abdomen is fullest around normY = 0.35 ~ 0.65
      const waistFactor = Math.sin(normY * Math.PI);
      const rg = new THREE.TorusGeometry(8.5, 0.12, 12, 64);
      const rm = new THREE.MeshBasicMaterial({
        color: 0xF59E0B,
        transparent: true,
        opacity: 0.55,
        blending: THREE.AdditiveBlending
      });
      const rMesh = new THREE.Mesh(rg, rm);
      rMesh.rotation.x = Math.PI / 2;
      rMesh.position.y = y;
      this.act2Group.add(rMesh);
      this.bodyContourRings.push({ mesh: rMesh, waistFactor: waistFactor, baseY: y });
    }

    // 1,800 Lipolysis Fat-Dissolve Golden Vortex Particles
    const pCount = 1800;
    this.fatParticlePos = new Float32Array(pCount * 3);
    this.fatParticleMeta = [];
    for (let i = 0; i < pCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const y = -15 + Math.random() * 24;
      const r = 7 + Math.random() * 7;
      this.fatParticlePos[i * 3] = Math.cos(angle) * r;
      this.fatParticlePos[i * 3 + 1] = y;
      this.fatParticlePos[i * 3 + 2] = Math.sin(angle) * r;
      this.fatParticleMeta.push({
        baseAngle: angle,
        baseY: y,
        baseR: r,
        speed: 1.5 + Math.random() * 2.5,
        lift: 12 + Math.random() * 24
      });
    }
    const fatGeom = new THREE.BufferGeometry();
    fatGeom.setAttribute('position', new THREE.BufferAttribute(this.fatParticlePos, 3));
    this.fatPointsMat = new THREE.PointsMaterial({
      size: 1.5,
      map: this.particleTex,
      color: 0xFDE68A,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    this.fatVortexPoints = new THREE.Points(fatGeom, this.fatPointsMat);
    this.act2Group.add(this.fatVortexPoints);

    this.act2Group.visible = false;
  }

  // =========================================================================
  // ACT 03 (42% ~ 60%): 30s Scalp Heat & Falling Hair -> Cooling & Regrowth
  // =========================================================================
  buildAct3HairLossRegrowthVFX() {
    this.act3Group = new THREE.Group();
    this.stageAnchor.add(this.act3Group);

    // Thermal Scalp Aura Rings (Transition from Crimson Heat to Cooling Mint-Emerald)
    this.scalpAuraRings = [];
    for (let r = 0; r < 4; r++) {
      const rg = new THREE.TorusGeometry(9 + r * 3.2, 0.18, 16, 64);
      const rm = new THREE.MeshBasicMaterial({
        color: 0xEF4444,
        transparent: true,
        opacity: 0.65 - r * 0.12,
        blending: THREE.AdditiveBlending
      });
      const mesh = new THREE.Mesh(rg, rm);
      mesh.rotation.x = Math.PI / 2.3;
      mesh.position.set(0, 12 + r * 1.5, 0);
      this.act3Group.add(mesh);
      this.scalpAuraRings.push(mesh);
    }

    // 160 3D Hair Strands (Detach & Drift Away in 3A -> Sprout & Bloom in 3B)
    this.hairStrands = [];
    for (let h = 0; h < 160; h++) {
      const u = Math.random();
      const v = Math.random() * 0.55; // Upper cranial hemisphere
      const theta = u * Math.PI * 2;
      const phi = v * Math.PI;
      const rad = 11.5;

      const rootX = rad * Math.sin(phi) * Math.cos(theta);
      const rootY = 6 + rad * Math.cos(phi);
      const rootZ = rad * Math.sin(phi) * Math.sin(theta);

      const pts = [];
      for (let seg = 0; seg <= 6; seg++) {
        const st = seg / 6;
        pts.push(new THREE.Vector3(
          rootX + Math.cos(theta) * st * 4.5,
          rootY + Math.sin(st * Math.PI) * 2.5 - st * 1.5,
          rootZ + Math.sin(theta) * st * 4.5
        ));
      }
      const sGeom = new THREE.BufferGeometry().setFromPoints(pts);
      const sMat = new THREE.LineBasicMaterial({
        color: 0xFDE68A,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending
      });
      const line = new THREE.Line(sGeom, sMat);
      this.act3Group.add(line);
      this.hairStrands.push({
        line: line,
        driftVec: new THREE.Vector3(
          (Math.random() - 0.3) * 18,
          6 + Math.random() * 14,
          (Math.random() - 0.5) * 14
        )
      });
    }

    // 60 Cooling Emerald Herbal Essence Micro-Droplets (Rain onto scalp in 3B)
    const dropCount = 60;
    this.coolDropPos = new Float32Array(dropCount * 3);
    for (let i = 0; i < dropCount; i++) {
      this.coolDropPos[i * 3] = (Math.random() - 0.5) * 26;
      this.coolDropPos[i * 3 + 1] = 10 + Math.random() * 24;
      this.coolDropPos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    const dropGeom = new THREE.BufferGeometry();
    dropGeom.setAttribute('position', new THREE.BufferAttribute(this.coolDropPos, 3));
    this.coolDropMat = new THREE.PointsMaterial({
      size: 2.0,
      map: this.particleTex,
      color: 0x34D399,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    this.coolDropPoints = new THREE.Points(dropGeom, this.coolDropMat);
    this.act3Group.add(this.coolDropPoints);

    this.act3Group.visible = false;
  }

  // =========================================================================
  // ACT 04 (60% ~ 78%): Twisted Spine & 9-Joint 8Hz Pain -> Chuna Alignment
  // =========================================================================
  buildAct4SpineChunaVFX() {
    this.act4Group = new THREE.Group();
    this.stageAnchor.add(this.act4Group);

    // 32-Vertebrae 3D Spine Column (Twisted S-Curve in 4A -> Straight Vertical in 4B)
    this.chunaVertebrae = [];
    const vDiscGeom = new THREE.CylinderGeometry(1.1, 1.25, 0.45, 20);
    for (let i = 0; i < 32; i++) {
      const vMat = new THREE.MeshPhysicalMaterial({
        color: 0xEF4444,
        emissive: 0xEF4444,
        emissiveIntensity: 1.1,
        transparent: true,
        opacity: 0.9
      });
      const disc = new THREE.Mesh(vDiscGeom, vMat);
      const baseY = -4 + i * 0.92;
      // S-curve scoliosis + forward neck distortion offsets
      const twistX = Math.sin((i / 31) * Math.PI * 2.2) * 3.6;
      const hunchZ = i > 22 ? (i - 22) * 0.55 : 0;
      disc.position.set(twistX, baseY, hunchZ);
      this.act4Group.add(disc);
      this.chunaVertebrae.push({
        mesh: disc,
        baseY: baseY,
        twistX: twistX,
        hunchZ: hunchZ,
        twistRotZ: Math.cos((i / 31) * Math.PI * 2.2) * 0.28
      });
    }

    // 9 Major Joint Laser Nodes (8Hz Crimson Pain Rings -> Emerald Healing Gems)
    this.jointNodes = [];
    this.jointAnchors.forEach(j => {
      const g = new THREE.Group();
      g.position.set(...j.pos);

      const gemGeom = new THREE.SphereGeometry(1.1, 20, 20);
      const gemMat = new THREE.MeshPhysicalMaterial({
        color: 0xE53E3E,
        emissive: 0xE53E3E,
        emissiveIntensity: 1.4,
        transmission: 0.8,
        roughness: 0.1
      });
      const gem = new THREE.Mesh(gemGeom, gemMat);
      g.add(gem);

      const ringGeom = new THREE.TorusGeometry(2.1, 0.2, 16, 48);
      const ringMat = new THREE.MeshStandardMaterial({
        color: 0xE53E3E,
        emissive: 0xE53E3E,
        emissiveIntensity: 1.2,
        transparent: true,
        opacity: 0.85
      });
      const ring = new THREE.Mesh(ringGeom, ringMat);
      g.add(ring);

      this.act4Group.add(g);
      this.jointNodes.push({
        def: j,
        group: g,
        gem: gem,
        ring: ring,
        healed: false
      });
    });

    // Horizontal Chuna Healing Laser Scan Wave
    const scanGeom = new THREE.TorusGeometry(24, 0.45, 16, 80);
    const scanMat = new THREE.MeshStandardMaterial({
      color: 0x34D399,
      emissive: 0x10B981,
      emissiveIntensity: 2.2,
      transparent: true,
      opacity: 0.0
    });
    this.chunaScanBeam = new THREE.Mesh(scanGeom, scanMat);
    this.chunaScanBeam.rotation.x = Math.PI / 2;
    this.chunaScanBeam.position.y = 32;
    this.act4Group.add(this.chunaScanBeam);

    this.act4Group.visible = false;
  }

  // =========================================================================
  // ACT 05 (78% ~ 100%): Aging Fatigue -> 24K Emperor Gongjindan -> Graceful Aging
  // =========================================================================
  buildAct5GongjindanAgingVFX() {
    this.act5Group = new THREE.Group();
    this.stageAnchor.add(this.act5Group);

    // 1. 24K Pure Gold-Leaf Emperor Gongjindan Pill Group
    this.gongjindanPillGroup = new THREE.Group();
    this.gongjindanPillGroup.position.set(-8, 4, 8);

    const goldTex = create24KGoldFoilTexture();
    const pillGeom = new THREE.SphereGeometry(5.5, 48, 48);
    this.gongjindanMat = new THREE.MeshStandardMaterial({
      map: goldTex,
      bumpMap: goldTex,
      bumpScale: 0.35,
      color: 0xFDE68A,
      emissive: 0xC5A059,
      emissiveIntensity: 0.65,
      metalness: 0.92,
      roughness: 0.18,
      transparent: true,
      opacity: 0.0
    });
    this.gongjindanMesh = new THREE.Mesh(pillGeom, this.gongjindanMat);
    this.gongjindanPillGroup.add(this.gongjindanMesh);

    // Concentric Celestial Golden Gyroscope Rings around Gongjindan
    this.gongjindanRings = [];
    for (let r = 0; r < 3; r++) {
      const rg = new THREE.TorusGeometry(7.8 + r * 2.4, 0.14, 16, 64);
      const rm = new THREE.MeshBasicMaterial({
        color: 0xFDE68A,
        transparent: true,
        opacity: 0.0,
        blending: THREE.AdditiveBlending
      });
      const ring = new THREE.Mesh(rg, rm);
      ring.rotation.set(r * 0.6, r * 0.8, 0);
      this.gongjindanPillGroup.add(ring);
      this.gongjindanRings.push(ring);
    }
    this.act5Group.add(this.gongjindanPillGroup);

    // 2. 12 Internal Golden Meridian Energy Pathways (Ignite in 5B & 5C)
    this.meridianLines = [];
    for (let m = 0; m < 12; m++) {
      const spreadX = ((m - 5.5) / 5.5) * 10;
      const pts = [];
      for (let s = 0; s <= 24; s++) {
        const t = s / 24;
        const y = -24 + t * 50;
        const x = spreadX * Math.sin(t * Math.PI) + Math.sin(t * 8 + m) * 0.8;
        const z = Math.cos(t * Math.PI * 2 + m) * 2.0;
        pts.push(new THREE.Vector3(x, y, z));
      }
      const mGeom = new THREE.BufferGeometry().setFromPoints(pts);
      const mMat = new THREE.LineBasicMaterial({
        color: 0xFDE68A,
        transparent: true,
        opacity: 0.0,
        blending: THREE.AdditiveBlending
      });
      const mLine = new THREE.Line(mGeom, mMat);
      this.act5Group.add(mLine);
      this.meridianLines.push(mLine);
    }

    // 3. 1,500 Golden-Emerald Longevity Aurora Particles (Graceful Aging Finale 5C)
    const auraCount = 1500;
    this.longevityPos = new Float32Array(auraCount * 3);
    for (let i = 0; i < auraCount; i++) {
      const ang = Math.random() * Math.PI * 2;
      const rad = 6 + Math.random() * 22;
      const y = -28 + Math.random() * 58;
      this.longevityPos[i * 3] = Math.cos(ang) * rad;
      this.longevityPos[i * 3 + 1] = y;
      this.longevityPos[i * 3 + 2] = Math.sin(ang) * rad;
    }
    const auraGeom = new THREE.BufferGeometry();
    auraGeom.setAttribute('position', new THREE.BufferAttribute(this.longevityPos, 3));
    this.longevityMat = new THREE.PointsMaterial({
      size: 1.5,
      map: this.particleTex,
      color: 0xFDE68A,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    this.longevityPoints = new THREE.Points(auraGeom, this.longevityMat);
    this.act5Group.add(this.longevityPoints);

    this.act5Group.visible = false;
  }

  // =========================================================================
  // GSAP ScrollTrigger Pinning & Scrubbing Engine (850vh Track)
  // =========================================================================
  initGSAPScrollTrigger() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      this.initFallbackScroll();
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
      trigger: '#story-scroll-track',
      start: 'top top',
      end: 'bottom bottom',
      pin: '#story-stage-sticky',
      pinSpacing: false,
      anticipatePin: 1,
      scrub: 0.5,
      onUpdate: (self) => {
        this.scrollProgress = self.progress;
        this.renderTimeline(self.progress);
      }
    });

    ScrollTrigger.refresh();
  }

  initFallbackScroll() {
    const track = document.getElementById('story-scroll-track');
    if (!track) return;
    window.addEventListener('scroll', () => {
      const rect = track.getBoundingClientRect();
      const total = track.offsetHeight - window.innerHeight;
      let p = 0;
      if (rect.top <= 0) {
        p = Math.min(1.0, Math.max(0, -rect.top / total));
      }
      this.scrollProgress = p;
      this.renderTimeline(p);
    }, { passive: true });
  }

  // =========================================================================
  // Master 13-Scene Timeline & 3D Morphing Choreography (0% ~ 100%)
  // =========================================================================
  renderTimeline(p) {
    // Find current active scene out of 13
    let activeScene = SCENE_TIMELINE[0];
    for (let i = 0; i < SCENE_TIMELINE.length; i++) {
      const s = SCENE_TIMELINE[i];
      if (p >= s.start && p <= s.end) {
        activeScene = s;
        break;
      }
    }

    let step = activeScene.step;

    // Check if scrolled down into the 5 Signature Cards section
    const cardsSec = document.getElementById('signature-cards');
    if (cardsSec) {
      const cRect = cardsSec.getBoundingClientRect();
      if (cRect.top < window.innerHeight * 0.45) step = 6;
    }

    if (this.currentStep !== step) {
      this.currentStep = step;
      this.updateStepTextAndNav(step);
      if (step <= 5) {
        window.currentAppStepSlug = CLINIC_SPECS[step - 1].slug;
      }
    }

    // Update live 13-scene telemetry, sub-pills, top header bar, and cinema subtitle
    this.updateSceneLiveTelemetry(activeScene, p);

    // Smooth cross-fade & Ken Burns motion across all 13 8K keyframes
    this.renderBackdropBlend(p);

    // -----------------------------------------------------------------------
    // ACT 01 (0.00 ~ 0.25): Fertilization -> Birth -> Immunity -> Peer Growth
    // -----------------------------------------------------------------------
    if (p <= 0.25) {
      this.setActVisible(1);

      // 1A: Fertilization (0.00 ~ 0.06)
      if (p <= 0.06) {
        const sub = p / 0.06; // 0..1
        this.scene1aGroup.visible = true;
        this.scene1bGroup.visible = false;
        this.scene1cGroup.visible = false;
        this.scene1dGroup.visible = false;

        this.targetCameraPos.set(0, 0, 78 - sub * 10);
        this.targetLookAt.set(0, 0, 0);

        // Swim sperm streams toward ovum
        const swimT = Math.min(1.0, sub / 0.72);
        this.spermStreams.forEach(sp => {
          const curDist = THREE.MathUtils.lerp(sp.startDist, 8.2, swimT);
          sp.group.position.set(
            Math.cos(sp.angle) * curDist,
            Math.sin(sp.angle) * curDist,
            sp.zOff * (1 - swimT * 0.7)
          );
          sp.group.rotation.z = sp.angle + Math.PI;
          sp.group.visible = sub < 0.85;
        });

        // Golden fertilization shockwave upon contact (sub >= 0.70)
        if (sub >= 0.70) {
          const swT = (sub - 0.70) / 0.30;
          const swScale = 1 + swT * 18;
          this.fertShockwave.scale.set(swScale, swScale, 1);
          this.fertShockwave.material.opacity = (1 - swT) * 0.95;
          this.ovumMat.emissiveIntensity = 0.7 + Math.sin(swT * Math.PI) * 1.5;
        } else {
          this.fertShockwave.material.opacity = 0;
          this.ovumMat.emissiveIntensity = 0.7;
        }
      }
      // 1B: Baby Birth (0.06 ~ 0.12)
      else if (p > 0.06 && p <= 0.12) {
        const sub = (p - 0.06) / 0.06;
        this.scene1aGroup.visible = false;
        this.scene1bGroup.visible = true;
        this.scene1cGroup.visible = false;
        this.scene1dGroup.visible = false;

        this.targetCameraPos.set(0, 0, 82);
        this.targetLookAt.set(0, 0, 0);
        this.scene1bGroup.rotation.y = sub * Math.PI * 0.8;
      }
      // 1C: Cold Viral Frost vs. Herbal Immunity Shield (0.12 ~ 0.18)
      else if (p > 0.12 && p <= 0.18) {
        const sub = (p - 0.12) / 0.06; // 0..1 (0..0.5 cold crisis, 0.5..1.0 shield expansion)
        this.scene1aGroup.visible = false;
        this.scene1bGroup.visible = false;
        this.scene1cGroup.visible = true;
        this.scene1dGroup.visible = false;

        this.targetCameraPos.set(0, 2, 85);
        this.targetLookAt.set(0, 2, 0);

        if (sub < 0.5) {
          // Cold virus crystals swarm inward toward child's chest
          const cT = sub / 0.5;
          this.immuneShieldWire.material.opacity = 0.0;
          this.immuneShieldGlow.material.opacity = 0.0;
          this.viralCrystals.forEach(vc => {
            const dist = THREE.MathUtils.lerp(vc.baseDist + 8, 7.5, cT);
            vc.mesh.position.copy(vc.dir).multiplyScalar(dist);
            vc.mesh.material.color.setHex(0x38BDF8);
            vc.mesh.material.opacity = 0.85;
          });
        } else {
          // Herbal Immunity Shield expands outward and purifies viral frost into gold!
          const hT = (sub - 0.5) / 0.5;
          const shieldScale = 0.35 + hT * 0.85;
          this.immuneShieldWire.scale.set(shieldScale, shieldScale, shieldScale);
          this.immuneShieldGlow.scale.set(shieldScale, shieldScale, shieldScale);
          this.immuneShieldWire.material.opacity = Math.sin(hT * Math.PI) * 0.65 + 0.25;
          this.immuneShieldGlow.material.opacity = Math.sin(hT * Math.PI) * 0.22;

          this.viralCrystals.forEach(vc => {
            const dist = THREE.MathUtils.lerp(7.5, vc.baseDist + 16, hT);
            vc.mesh.position.copy(vc.dir).multiplyScalar(dist);
            vc.mesh.material.color.setHex(0xFDE68A);
            vc.mesh.material.opacity = (1 - hT) * 0.9;
          });
        }
      }
      // 1D: Short Among Peers -> Growing Tall with Spine & Knee Growth Lasers (0.18 ~ 0.25)
      else {
        const sub = (p - 0.18) / 0.07; // 0..1
        this.scene1aGroup.visible = false;
        this.scene1bGroup.visible = false;
        this.scene1cGroup.visible = false;
        this.scene1dGroup.visible = true;

        this.targetCameraPos.set(0, 0, 92);
        this.targetLookAt.set(0, 0, 0);

        // Stretch child spine & height indicator bar from short (y = -4) to tall (y = +20)
        const growthFactor = Math.max(0, (sub - 0.2) / 0.8);
        const easedGrowth = THREE.MathUtils.smoothstep(growthFactor, 0, 1);

        this.childGrowthGroup.scale.set(1.0, 0.68 + easedGrowth * 0.58, 1.0);
        this.heightLaserBar.position.y = -4 + easedGrowth * 24;
      }
    }

    // -----------------------------------------------------------------------
    // ACT 02 (0.25 ~ 0.42): Adult Obesity -> Lipolysis Vortex & Slim S-Line
    // -----------------------------------------------------------------------
    else if (p > 0.25 && p <= 0.42) {
      this.setActVisible(2);
      const sub = (p - 0.25) / 0.17; // 0..1 (0..0.5 obesity, 0.5..1.0 slimming dissolve)

      this.targetCameraPos.set(0, 2, 86);
      this.targetLookAt.set(0, 2, 0);

      if (sub <= 0.5) {
        // 2A: Swollen obese waist contour rings
        const obT = sub / 0.5;
        this.bodyContourRings.forEach(cr => {
          const swell = 1.0 + cr.waistFactor * (0.45 + obT * 0.25);
          cr.mesh.scale.set(swell, swell, 1.0);
          cr.mesh.material.color.setHex(0xF59E0B); // heavy amber fat tone
          cr.mesh.material.opacity = 0.42;
        });
        this.fatPointsMat.opacity = 0.15;
      } else {
        // 2B: Fat shatters into swirling golden vortex & waist slims down to S-line!
        const slimT = (sub - 0.5) / 0.5;
        const easedSlim = THREE.MathUtils.smoothstep(slimT, 0, 1);

        this.bodyContourRings.forEach(cr => {
          const swell = THREE.MathUtils.lerp(
            1.0 + cr.waistFactor * 0.70,
            0.78 - cr.waistFactor * 0.22,
            easedSlim
          );
          cr.mesh.scale.set(swell, swell, 1.0);
          cr.mesh.material.color.setHex(easedSlim > 0.4 ? 0x34D399 : 0xFDE68A);
          cr.mesh.material.opacity = (1 - slimT * 0.6) * 0.5;
        });

        // Vortex particles spiral outward and upward as fat evaporates
        this.fatPointsMat.opacity = Math.sin(slimT * Math.PI) * 0.92;
        const pos = this.fatParticlePos;
        for (let i = 0; i < this.fatParticleMeta.length; i++) {
          const m = this.fatParticleMeta[i];
          const curAng = m.baseAngle + slimT * m.speed * 4.0;
          const curR = m.baseR + slimT * 18.0;
          pos[i * 3] = Math.cos(curAng) * curR;
          pos[i * 3 + 1] = m.baseY + slimT * m.lift;
          pos[i * 3 + 2] = Math.sin(curAng) * curR;
        }
        this.fatVortexPoints.geometry.attributes.position.needsUpdate = true;
      }
    }

    // -----------------------------------------------------------------------
    // ACT 03 (0.42 ~ 0.60): 30s Scalp Heat & Hair Loss -> Cooling & Regrowth
    // -----------------------------------------------------------------------
    else if (p > 0.42 && p <= 0.60) {
      this.setActVisible(3);
      const sub = (p - 0.42) / 0.18; // 0..1 (0..0.5 hair loss, 0.5..1.0 hair regrowth)

      this.targetCameraPos.set(0, 8, 72);
      this.targetLookAt.set(0, 8, 0);

      if (sub <= 0.5) {
        // 3A: Crimson scalp heat + hair strands detaching & drifting away
        const lossT = sub / 0.5;
        this.scalpAuraRings.forEach(r => {
          r.material.color.setHex(0xEF4444);
          r.material.opacity = 0.55;
        });
        this.hairStrands.forEach((hs, idx) => {
          const delay = (idx / this.hairStrands.length) * 0.5;
          const localT = Math.max(0, Math.min(1, (lossT - delay) / 0.5));
          hs.line.position.copy(hs.driftVec).multiplyScalar(localT);
          hs.line.material.color.setHex(0xFCA5A5);
          hs.line.material.opacity = (1 - localT * 0.85) * 0.75;
        });
        this.coolDropMat.opacity = 0.0;
      } else {
        // 3B: Cooling emerald droplets + thick golden-emerald hair strands regrowing
        const growT = (sub - 0.5) / 0.5;
        const easedGrow = THREE.MathUtils.smoothstep(growT, 0, 1);

        this.scalpAuraRings.forEach(r => {
          r.material.color.setHex(0x10B981);
          r.material.opacity = (1 - growT * 0.5) * 0.65;
        });

        this.coolDropMat.opacity = Math.sin(growT * Math.PI) * 0.9;

        this.hairStrands.forEach(hs => {
          hs.line.position.set(0, 0, 0);
          hs.line.scale.set(easedGrow, easedGrow, easedGrow);
          hs.line.material.color.setHex(0xFDE68A);
          hs.line.material.opacity = easedGrow * 0.72;
        });
      }
    }

    // -----------------------------------------------------------------------
    // ACT 04 (0.60 ~ 0.78): Twisted Spine & 9-Joint Pain -> Chuna Alignment
    // -----------------------------------------------------------------------
    else if (p > 0.60 && p <= 0.78) {
      this.setActVisible(4);
      const sub = (p - 0.60) / 0.18; // 0..1 (0..0.5 pain & twisted spine, 0.5..1.0 Chuna scan)

      this.targetCameraPos.set(0, 0, 96);
      this.targetLookAt.set(0, 0, 0);

      // Scan wave sweeps from y = +32 down to y = -40 during sub 0.45 -> 0.95
      const scanProgress = Math.max(0, Math.min(1, (sub - 0.42) / 0.53));
      const scanY = 32 - scanProgress * 72;
      this.chunaScanBeam.position.y = scanY;
      this.chunaScanBeam.material.opacity = sub >= 0.42 && sub <= 0.96 ? 0.9 : 0.0;

      // Straighten 32 vertebrae as Chuna scan beam passes them
      this.chunaVertebrae.forEach(v => {
        const aligned = scanProgress > 0 && v.baseY >= scanY;
        const alignLerp = aligned
          ? Math.min(1, (v.baseY - scanY) / 8.0)
          : 0;
        v.mesh.position.x = THREE.MathUtils.lerp(v.twistX, 0, alignLerp);
        v.mesh.position.z = THREE.MathUtils.lerp(v.hunchZ, 0, alignLerp);
        v.mesh.rotation.z = THREE.MathUtils.lerp(v.twistRotZ, 0, alignLerp);

        if (alignLerp > 0.5) {
          v.mesh.material.color.setHex(0xFDE68A);
          v.mesh.material.emissive.setHex(0xC5A059);
        } else {
          v.mesh.material.color.setHex(0xEF4444);
          v.mesh.material.emissive.setHex(0xE53E3E);
        }
      });

      // Update 9 Joint Nodes & HUD Chips
      let allHealed = true;
      let anyHealed = false;
      this.jointNodes.forEach(item => {
        const jY = item.def.pos[1];
        const isHealed = sub >= 0.45 && scanY <= jY + 1.5;

        if (isHealed) {
          item.gem.material.color.setHex(0x10B981);
          item.gem.material.emissive.setHex(0x34D399);
          item.ring.material.color.setHex(0x10B981);
          item.ring.material.emissive.setHex(0x34D399);
          item.healed = true;
          anyHealed = true;
          const chip = document.querySelector(`.pain-chip[data-joint="${item.def.chipKey}"]`);
          if (chip) chip.classList.add('healed');
        } else {
          item.gem.material.color.setHex(0xE53E3E);
          item.gem.material.emissive.setHex(0xE53E3E);
          item.ring.material.color.setHex(0xE53E3E);
          item.ring.material.emissive.setHex(0xE53E3E);
          item.healed = false;
          allHealed = false;
          const chip = document.querySelector(`.pain-chip[data-joint="${item.def.chipKey}"]`);
          if (chip) chip.classList.remove('healed');
        }
      });

      if (this.painRadarStatus) {
        if (allHealed) {
          this.painRadarStatus.className = 'pain-radar-status healing';
          this.painRadarStatus.innerHTML = '<span class="pulse-dot">✓</span> <span>척추 수직교정 & 9대관절 회복 완료</span>';
        } else if (anyHealed) {
          this.painRadarStatus.className = 'pain-radar-status healing';
          this.painRadarStatus.innerHTML = '<span class="pulse-dot">✦</span> <span>추나·봉약침 치유 파동 스캔 중</span>';
        } else {
          this.painRadarStatus.className = 'pain-radar-status warning';
          this.painRadarStatus.innerHTML = '<span class="pulse-dot">●</span> <span>척추 틀어짐 & 8Hz 통증 점멸 중</span>';
        }
      }
    }

    // -----------------------------------------------------------------------
    // ACT 05 (0.78 ~ 1.00): Aging Fatigue -> 24K Gongjindan -> Graceful Aging
    // -----------------------------------------------------------------------
    else {
      this.setActVisible(5);
      const sub = (p - 0.78) / 0.22; // 0..1

      this.targetCameraPos.set(0, 2, 84);
      this.targetLookAt.set(0, 2, 0);

      // 5A: 0.78 ~ 0.85 (sub 0.00 ~ 0.32): Depleted vitality
      if (sub <= 0.32) {
        this.gongjindanMat.opacity = 0.0;
        this.gongjindanRings.forEach(r => { r.material.opacity = 0.0; });
        this.meridianLines.forEach(m => {
          m.material.color.setHex(0x64748B);
          m.material.opacity = 0.18;
        });
        this.longevityMat.opacity = 0.1;
      }
      // 5B: 0.85 ~ 0.93 (sub 0.32 ~ 0.68): 24K Gongjindan Awakens 12 Meridians
      else if (sub > 0.32 && sub <= 0.68) {
        const gT = (sub - 0.32) / 0.36; // 0..1
        const pillOp = Math.sin(gT * Math.PI);
        this.gongjindanMat.opacity = Math.min(0.95, pillOp * 1.4);
        this.gongjindanPillGroup.position.x = THREE.MathUtils.lerp(-10, -2, gT);
        this.gongjindanRings.forEach(r => { r.material.opacity = pillOp * 0.75; });

        this.meridianLines.forEach(m => {
          m.material.color.setHex(0xFDE68A);
          m.material.opacity = THREE.MathUtils.lerp(0.2, 0.85, gT);
        });
        this.longevityMat.opacity = gT * 0.65;
      }
      // 5C: 0.93 ~ 1.00 (sub 0.68 ~ 1.00): Graceful & Noble Aging Finale
      else {
        const fT = (sub - 0.68) / 0.32;
        this.gongjindanMat.opacity = Math.max(0, (1 - fT * 1.5) * 0.7);
        this.gongjindanRings.forEach(r => { r.material.opacity = (1 - fT) * 0.5; });

        this.meridianLines.forEach((m, idx) => {
          m.material.color.setHex(idx % 2 === 0 ? 0xFDE68A : 0x34D399);
          m.material.opacity = 0.65;
        });
        this.longevityMat.opacity = 0.85;
      }
    }
  }

  // =========================================================================
  // Smooth 13-Scene Film Cross-Fade & Dynamic Depth Scale
  // =========================================================================
  renderBackdropBlend(p) {
    const transWidth = 0.016; // Smooth crossfade window between scenes

    let activeIdx = 0;
    let nextIdx = -1;
    let blend = 0;

    for (let i = 0; i < SCENE_TIMELINE.length; i++) {
      const s = SCENE_TIMELINE[i];
      if (i === SCENE_TIMELINE.length - 1) {
        if (p >= s.start) {
          activeIdx = i;
          nextIdx = -1;
          break;
        }
      } else {
        const boundary = SCENE_TIMELINE[i + 1].start;
        if (p >= s.start && p < boundary - transWidth) {
          activeIdx = i;
          nextIdx = -1;
          break;
        } else if (p >= boundary - transWidth && p < boundary) {
          activeIdx = i;
          nextIdx = i + 1;
          blend = (p - (boundary - transWidth)) / transWidth;
          break;
        }
      }
    }

    SCENE_TIMELINE.forEach((scene, idx) => {
      const el = this.backdropMap[scene.id];
      if (!el) return;

      // Subtle continuous Ken Burns drift within each scene
      const sceneProgress = Math.max(0, Math.min(1, (p - scene.start) / (scene.end - scene.start)));
      const kenBurnsScale = 1.0 + sceneProgress * 0.035;

      if (idx === activeIdx && nextIdx === -1) {
        el.style.opacity = '1';
        el.style.zIndex = '3';
        el.style.transform = `scale(${kenBurnsScale.toFixed(4)})`;
      } else if (idx === activeIdx && nextIdx !== -1) {
        el.style.opacity = (1 - blend).toFixed(3);
        el.style.zIndex = '2';
        el.style.transform = `scale(${(kenBurnsScale + blend * 0.015).toFixed(4)})`;
      } else if (idx === nextIdx) {
        el.style.opacity = blend.toFixed(3);
        el.style.zIndex = '3';
        el.style.transform = `scale(${(1.02 - blend * 0.02).toFixed(4)})`;
      } else {
        el.style.opacity = '0';
        el.style.zIndex = '1';
      }
    });
  }

  setActVisible(actNum) {
    if (!this.act1Group) return;
    this.act1Group.visible = (actNum === 1);
    this.act2Group.visible = (actNum === 2);
    this.act3Group.visible = (actNum === 3);
    this.act4Group.visible = (actNum === 4);
    this.act5Group.visible = (actNum === 5);
  }

  // =========================================================================
  // Real-Time Biometric Telemetry, Sub-Scene Pills & Cinema Subtitles
  // =========================================================================
  updateSceneLiveTelemetry(scene, p) {
    const localP = Math.max(0, Math.min(1, (p - scene.start) / (scene.end - scene.start)));

    // Determine whether current scroll point is in Crisis (Before) or Healing (After)
    let isCrisis = scene.isCrisis;
    if (typeof scene.crisisThreshold === 'number') {
      isCrisis = p < scene.crisisThreshold;
    }

    // 1. Update Top Header Timeline Bar
    if (this.timelineActLabel) this.timelineActLabel.textContent = scene.actLabel;
    if (this.timelineProgressFill) {
      this.timelineProgressFill.style.width = `${Math.max(3, Math.round(p * 100))}%`;
    }
    if (this.timelineStatePill) {
      const stateStr = scene.stateText || (isCrisis ? scene.stateTextCrisis : scene.stateTextHeal);
      this.timelineStatePill.textContent = stateStr;
      this.timelineStatePill.className = `timeline-state-pill ${isCrisis ? 'state-crisis' : 'state-healing'}`;
    }

    // 2. Update Scene Counter & HUD Border Mode
    if (this.hudCounter) {
      this.hudCounter.textContent = `SCENE ${String(scene.index).padStart(2, '0')} / 13`;
    }
    if (this.hudPanel) {
      if (isCrisis) this.hudPanel.classList.add('crisis-mode');
      else this.hudPanel.classList.remove('crisis-mode');
    }

    // 3. Highlight active sub-scene pill inside HUD
    if (this.hudSubsceneFlow && this.currentStep <= 5) {
      const pills = this.hudSubsceneFlow.querySelectorAll('.subscene-pill');
      pills.forEach((pill, idx) => {
        pill.classList.remove('active', 'crisis-active');
        if (idx === scene.subPillIndex) {
          pill.classList.add(isCrisis ? 'crisis-active' : 'active');
        }
      });
    }

    // 4. Update Cinema Subtitle Caption Bar
    if (this.cinemaSceneTag) this.cinemaSceneTag.textContent = scene.sceneTag;
    if (this.cinemaSubtitleText) {
      const subStr = scene.subtitle || (isCrisis ? scene.subtitleCrisis : scene.subtitleHeal);
      this.cinemaSubtitleText.textContent = subStr;
    }

    // 5. Update Dynamic Biometric Telemetry Box
    if (this.telemetryStatus) {
      this.telemetryStatus.textContent = isCrisis ? '⚠️ 치료 전 증상 감지' : '✦ 바른한의원 치료·회복';
      this.telemetryStatus.className = `telemetry-status ${isCrisis ? 'crisis' : ''}`;
    }
    if (this.metric1Title) this.metric1Title.textContent = scene.metric1Title;
    if (this.metric2Title) this.metric2Title.textContent = scene.metric2Title;

    // Scene-specific interpolated live metrics
    let m1Val = scene.metric1Value || '';
    let m2Val = scene.metric2Value || '';
    let barPct = scene.barPercent || 85;

    if (scene.index === 3) {
      // Scene 1C: Cold/Flu -> Immunity Shield
      if (isCrisis) {
        m1Val = '42.0% (감기·비염 침투)';
        m2Val = '면역 저하 · 한기 감지';
        barPct = 38;
      } else {
        const healT = (p - 0.15) / 0.03;
        const imm = (42 + healT * 56.5).toFixed(1);
        m1Val = `${imm}% (면역강화 완료)`;
        m2Val = '황금 면역 방어막 가동';
        barPct = Math.round(42 + healT * 56);
      }
    } else if (scene.index === 4) {
      // Scene 1D: Peer Height Comparison -> Growing Tall
      if (isCrisis) {
        m1Val = '134.0cm (또래 대비 -12cm)';
        m2Val = '성장판 잠복 상태';
        barPct = 40;
      } else {
        const growT = Math.min(1, (p - 0.205) / 0.045);
        const cm = (134 + growT * 48.4).toFixed(1);
        m1Val = `134cm ➔ ${cm}cm (+추월!)`;
        m2Val = '32개 척추·성장판 폭풍 성장';
        barPct = Math.round(45 + growT * 55);
      }
    } else if (scene.index === 6) {
      // Scene 2B: Obesity Slimming
      const fatPct = (35.4 - localP * 17.2).toFixed(1);
      const kgLost = (localP * 15.8).toFixed(1);
      m1Val = `35.4% ➔ ${fatPct}% (-${kgLost}kg)`;
      m2Val = '식욕 ZERO · S라인 완성';
      barPct = Math.round(40 + localP * 58);
    } else if (scene.index === 8) {
      // Scene 3B: Scalp Cooling & Hair Regrowth
      const temp = (39.2 - localP * 7.8).toFixed(1);
      const density = Math.round(48 + localP * 52);
      m1Val = `39.2°C ➔ ${temp}°C (청열 완료)`;
      m2Val = `모낭 밀도 ${density}% 정상 회복`;
      barPct = density;
    } else if (scene.index === 10) {
      // Scene 4B: Chuna Spine Alignment
      const angle = Math.max(0, 18.6 * (1 - localP * 1.15)).toFixed(1);
      m1Val = `18.6° ➔ ${angle}° 바른 정렬`;
      m2Val = angle === '0.0' ? '9대 관절 통증 100% 소멸' : '1:1 추나·봉약침 교정 중';
      barPct = Math.round(35 + localP * 65);
    } else if (scene.index === 12) {
      // Scene 5B: Emperor Gongjindan Vitality Surge
      const vit = (28 + localP * 70.5).toFixed(1);
      m1Val = `28% ➔ ${vit}% 기력 충전`;
      m2Val = '24K 사향·녹용 12경락 개통';
      barPct = Math.round(28 + localP * 70);
    }

    if (this.metric1Value) {
      this.metric1Value.textContent = m1Val;
      this.metric1Value.className = `metric-value ${isCrisis ? 'danger' : ''}`;
    }
    if (this.metric2Value) {
      this.metric2Value.textContent = m2Val;
      this.metric2Value.className = `metric-value ${isCrisis ? 'danger' : 'highlight'}`;
    }
    if (this.telemetryBarFill) {
      this.telemetryBarFill.style.width = `${barPct}%`;
      this.telemetryBarFill.className = `telemetry-bar-fill ${isCrisis ? 'danger' : ''}`;
    }
  }

  updateStepTextAndNav(step) {
    this.navDots.forEach(dot => {
      const s = parseInt(dot.getAttribute('data-step') || '1', 10);
      dot.classList.toggle('active', s === step);
    });

    this.sktCards.forEach(card => {
      const s = parseInt(card.getAttribute('data-step') || '1', 10);
      card.classList.toggle('active', s === step);
    });

    if (step > 5) {
      if (this.hudBadge) this.hudBadge.textContent = '5대 생애주기 특화진료';
      if (this.hudTitle) this.hudTitle.textContent = '바른한의원 5대 시그니처';
      if (this.hudSubtitle) this.hudSubtitle.textContent = '아래 카드에서 생애주기별 맞춤 진료를 선택하세요';
      if (this.hudDesc) this.hudDesc.textContent = '난임·소아면역·키성장부터 비만, 탈모, 척추·관절 추나, 황제공진단까지 1:1 맞춤 처방';
      if (this.painRadarBox) this.painRadarBox.style.display = 'none';
      return;
    }

    const data = CLINIC_SPECS[step - 1];
    if (!data) return;

    if (this.hudBadge) this.hudBadge.textContent = data.badge;
    if (this.hudTitle) this.hudTitle.textContent = data.title;
    if (this.hudSubtitle) this.hudSubtitle.textContent = data.mainCopy;
    if (this.hudDesc) this.hudDesc.textContent = data.desc;

    // Render sub-scene flow pills for this stage
    if (this.hudSubsceneFlow && data.subPills) {
      this.hudSubsceneFlow.innerHTML = data.subPills
        .map((label, idx) => `<span class="subscene-pill ${idx === 0 ? 'active' : ''}">${label}</span>`)
        .join('<span class="subscene-arrow">▸</span>');
    }

    if (this.hudPrimaryBtn) {
      this.hudPrimaryBtn.href = data.link;
      this.hudPrimaryBtn.innerHTML = `<span>프로그램 상세 보기</span> <span>➔</span>`;
    }
    if (this.hudDrawerBtn) {
      this.hudDrawerBtn.onclick = () => openDrawerWithProgram(data.slug);
    }
    if (this.painRadarBox) {
      this.painRadarBox.style.display = (step === 4) ? 'block' : 'none';
    }
  }

  initInteractions() {
    window.addEventListener('mousemove', (e) => {
      this.mouseParallax.x = (e.clientX / window.innerWidth - 0.5) * 4.5;
      this.mouseParallax.y = (e.clientY / window.innerHeight - 0.5) * -3.0;
    }, { passive: true });
  }

  // =========================================================================
  // 60fps / 120fps Continuous Render & Micro-Animation Loop
  // =========================================================================
  animate() {
    requestAnimationFrame(() => this.animate());
    const time = performance.now() * 0.001;

    // Smooth camera damping
    this.camera.position.x = THREE.MathUtils.lerp(
      this.camera.position.x,
      this.targetCameraPos.x + this.mouseParallax.x,
      0.06
    );
    this.camera.position.y = THREE.MathUtils.lerp(
      this.camera.position.y,
      this.targetCameraPos.y + this.mouseParallax.y,
      0.06
    );
    this.camera.position.z = THREE.MathUtils.lerp(
      this.camera.position.z,
      this.targetCameraPos.z,
      0.06
    );

    this.currentLookAt.lerp(this.targetLookAt, 0.06);
    this.camera.lookAt(this.currentLookAt);

    // Act 1 Continuous Animations
    if (this.act1Group && this.act1Group.visible) {
      if (this.scene1aGroup.visible) {
        this.ovumMesh.rotation.y = time * 0.35;
        this.ovumRings.children.forEach((r, i) => {
          r.rotation.z = time * (0.3 + i * 0.15) * (i % 2 === 0 ? 1 : -1);
        });
        // Undulate sperm tails
        this.spermStreams.forEach(sp => {
          const pos = sp.tail.geometry.attributes.position.array;
          for (let t = 0; t < 20; t++) {
            pos[t * 3 + 1] = Math.sin(time * 14 - t * 0.5 + sp.speedOffset) * (t * 0.045);
          }
          sp.tail.geometry.attributes.position.needsUpdate = true;
        });
      }
      if (this.scene1cGroup.visible) {
        this.immuneShieldWire.rotation.y = time * 0.25;
        this.immuneShieldWire.rotation.x = Math.sin(time * 0.4) * 0.15;
      }
      if (this.scene1dGroup.visible) {
        this.kneePlateL.rotation.z = time * 0.8;
        this.kneePlateR.rotation.z = -time * 0.8;
      }
    }

    // Act 2 Continuous Animations
    if (this.act2Group && this.act2Group.visible) {
      this.act2Group.rotation.y = Math.sin(time * 0.5) * 0.2;
    }

    // Act 3 Continuous Animations
    if (this.act3Group && this.act3Group.visible) {
      this.scalpAuraRings.forEach((r, i) => {
        r.rotation.z = time * (0.4 + i * 0.1) * (i % 2 === 0 ? 1 : -1);
      });
    }

    // Act 4 8Hz Pain Pulsation on Unhealed Joints
    if (this.act4Group && this.act4Group.visible) {
      const pulse8Hz = Math.sin(time * 16 * Math.PI) * 0.5 + 0.5;
      this.jointNodes.forEach(item => {
        if (!item.healed) {
          const s = 1.0 + pulse8Hz * 0.65;
          item.ring.scale.set(s, s, s);
          item.ring.material.opacity = (1.0 - pulse8Hz * 0.5) * 0.9;
        } else {
          item.ring.scale.set(1.15, 1.15, 1.15);
          item.ring.material.opacity = 0.65;
        }
      });
    }

    // Act 5 24K Gongjindan Rotation & Rising Longevity Aurora
    if (this.act5Group && this.act5Group.visible) {
      this.gongjindanMesh.rotation.y = time * 0.6;
      this.gongjindanRings.forEach((r, idx) => {
        r.rotation.z = time * (0.5 + idx * 0.2) * (idx % 2 === 0 ? 1 : -1);
        r.rotation.x = Math.sin(time * 0.7 + idx) * 0.5;
      });
      this.longevityPoints.rotation.y = time * 0.12;
    }

    if (this.composer) {
      this.composer.render();
    } else if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  initIntro() {
    const splash = document.getElementById('intro-splash');
    const enterBtn = document.getElementById('intro-enter-btn');
    const video = document.getElementById('intro-video');
    if (!splash) return;

    // Trigger .video-ended so title & button bloom in smoothly
    setTimeout(() => {
      splash.classList.add('video-ended');
    }, 600);
    if (video) {
      video.addEventListener('ended', () => splash.classList.add('video-ended'));
    }

    const closeIntro = () => {
      splash.classList.add('leaving');
      setTimeout(() => {
        splash.style.opacity = '0';
        splash.style.visibility = 'hidden';
        splash.style.pointerEvents = 'none';
        if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
      }, 800);
    };

    if (enterBtn) enterBtn.addEventListener('click', closeIntro);
    splash.addEventListener('click', (e) => {
      if (e.target.tagName !== 'BUTTON') closeIntro();
    });
  }

  initDrawer() {
    const menuBtn = document.getElementById('menu-toggle');
    const drawer = document.getElementById('menu-drawer');
    const closeBtn = document.getElementById('drawer-close');
    const backdrop = document.getElementById('drawer-backdrop');

    if (menuBtn && drawer) {
      menuBtn.addEventListener('click', () => {
        drawer.classList.add('active');
        drawer.setAttribute('aria-hidden', 'false');
      });
    }

    const closeDrawer = () => {
      if (drawer) {
        drawer.classList.remove('active');
        drawer.setAttribute('aria-hidden', 'true');
      }
    };

    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (backdrop) backdrop.addEventListener('click', closeDrawer);
  }
}

// Global Navigation & Step Helpers
function navigateToStep(stepNum) {
  scrollToStep(stepNum);
}

function scrollToStep(stepNum) {
  if (stepNum >= 6) {
    scrollToCards();
    return;
  }
  const track = document.getElementById('story-scroll-track');
  if (!track) return;
  const trackHeight = track.offsetHeight - window.innerHeight;
  const progressMap = [0.02, 0.27, 0.44, 0.62, 0.80];
  const targetProgress = progressMap[stepNum - 1] || 0.02;
  const scrollTarget = track.offsetTop + trackHeight * targetProgress;
  window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
}

function scrollToCards() {
  const cardsSec = document.getElementById('signature-cards');
  if (cardsSec) {
    cardsSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function openDrawerWithProgram(programSlug) {
  const drawer = document.getElementById('menu-drawer');
  const select = document.getElementById('drawer-program-select');
  if (select && programSlug) {
    select.value = programSlug;
  }
  if (drawer) {
    drawer.classList.add('active');
    drawer.setAttribute('aria-hidden', 'false');
    const nameInput = document.getElementById('drawer-patient-name');
    if (nameInput) setTimeout(() => nameInput.focus(), 300);
  }
}

// 1-Click Drawer Booking Submit Handler
async function handleDrawerBookingSubmit(event) {
  event.preventDefault();
  const programSelect = document.getElementById('drawer-program-select');
  const nameInput = document.getElementById('drawer-patient-name');
  const phoneInput = document.getElementById('drawer-patient-phone');
  const memoInput = document.getElementById('drawer-patient-memo');
  const submitBtn = document.getElementById('drawer-submit-btn');

  if (!nameInput || !phoneInput) return;

  const originalBtnText = submitBtn ? submitBtn.textContent : '';
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = '카카오 알림톡 전송 및 예약 접수 중...';
  }

  const payload = {
    parentName: nameInput.value.trim(),
    parentTel: phoneInput.value.trim(),
    childInfo: '본인/가족',
    consultType: programSelect ? programSelect.options[programSelect.selectedIndex].text : '진료 예약',
    symptoms: [programSelect ? programSelect.value : '일반'],
    parentMemo: memoInput ? memoInput.value.trim() : ''
  };

  try {
    await fetch('/api/send-alimtalk', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    alert(`🎉 ${payload.parentName}님, 예약 신청이 성공적으로 접수되었습니다!\n원내 원장실에서 확인 후 카카오 알림톡과 안내 전화를 드립니다.`);

    if (nameInput) nameInput.value = '';
    if (phoneInput) phoneInput.value = '';
    if (memoInput) memoInput.value = '';
    const drawer = document.getElementById('menu-drawer');
    if (drawer) {
      drawer.classList.remove('active');
      drawer.setAttribute('aria-hidden', 'true');
    }
  } catch (err) {
    alert(`예약 신청이 접수되었습니다. 빠른 시간 내에 연락드리겠습니다.`);
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
    }
  }
}

// Initialize Masterpiece App on DOMContentLoaded
window.addEventListener('DOMContentLoaded', () => {
  window.bareunApp = new BareunMasterpieceStoryApp();
});
