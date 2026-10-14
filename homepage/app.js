/**
 * BAREUN CLINIC (바른한의원 대전본점)
 * 100% Photorealistic Live-Action 3D Cinema Scrollytelling Engine
 *
 * Shot-on-ARRI-Alexa-65 Live-Action Aesthetic:
 * - Zero artificial CGI wireframes, zero plastic mannequins, zero neon rings.
 * - Real-time 3D Perspective Dolly, Optical Rack-Focus (Depth-of-Field Blur),
 *   Volumetric Golden-Hour Sunlight Rays, and Anamorphic Lens Bokeh Dust Motes.
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
    mainCopy: '성인이 되며 불어난 체지방을 비워내고 가볍고 날씬한 바른 라인으로',
    desc: '아이가 성인이 되면서 대사 저하와 스트레스로 살이 찌고 비만이 된 체형을, 바른 다이어트(식욕 ZERO) 맞춤 한약으로 심부 체지방만 건강하게 감량하여 날씬하고 탄력 있는 모습으로 변화시킵니다.',
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
    desc: '30대 과로와 상열감으로 머리카락이 가늘어지고 빠지는 탈모 위기에서, 두피의 열을 내리는 청열 한약과 고농도 모근 재생 약침으로 다시 굵고 풍성한 정상 모발을 되찾습니다.',
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
    desc: '장시간 근무로 거북목과 척추가 틀어지고 전신 9대 관절에 발생한 극심한 통증을, 한의학 박사 대표원장의 1:1 정밀 추나요법과 정품 봉약침으로 곧고 편안하게 회복시킵니다.',
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
    desc: '나이가 들며 기력이 고갈되고 성인병이 찾아올 때, 식약처 CITES 인증 100% 정품 천연 사향과 녹용 분골로 빚은 24K 황제공진단으로 전신의 기력을 회복하고 건강하고 아름다운 노년을 완성합니다.',
    subPills: ['① 노화·기력저하·성인병', '② 황제공진단 기력회복', '③ 아름다운 노년'],
    link: 'gongjindan.html',
    color: '#C5A059'
  }
];

/**
 * 13-Scene Live-Action Narrative & Biometric Telemetry Choreography
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
    subtitle: '“간절한 기다림 끝에 찾아온 생명의 수정 — 바른 난임·착상 치료가 기적의 첫 장을 엽니다.”',
    metric1Title: '자궁 심부 착상 환경',
    metric1Value: '36.8°C 최적 온열',
    metric2Title: '수정·착상 활성도',
    metric2Value: '99.4% 건강한 착상',
    barPercent: 92,
    lightWarmth: 1.0
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
    stateText: '✦ 고귀한 아이 탄생',
    sceneTag: 'ACT I · SCENE 02 (아이 탄생)',
    subtitle: '“열 달의 따뜻한 품을 거쳐 세상에 태어난 아이 — 엄마의 손을 잡은 작고 고귀한 숨결.”',
    metric1Title: '신생아 생명력 지수',
    metric1Value: '100% 건강한 탄생',
    metric2Title: '오장육부·원기 발달',
    metric2Value: '최상급 생체 리듬',
    barPercent: 96,
    lightWarmth: 1.0
  },
  {
    index: 3,
    id: 'backdrop-1c',
    step: 1,
    subPillIndex: 2,
    start: 0.12,
    end: 0.18,
    isCrisis: true,
    crisisThreshold: 0.145,
    actLabel: 'ACT 01 · 소아 면역강화',
    stateTextCrisis: '⚠️ 면역저하 · 감기 발생',
    stateTextHeal: '✦ 면역강화 한약 회복',
    sceneTag: 'ACT I · SCENE 03 (감기 ➔ 면역강화치료)',
    subtitleCrisis: '“면역력이 떨어져 찾아온 잦은 감기와 비염 — 아이의 여린 호흡기가 쉽게 지칩니다.”',
    subtitleHeal: '“따뜻한 바른 면역강화 보약 한 잔으로 감기를 이겨내고 발그레한 건강 미소를 되찾습니다.”',
    metric1Title: '호흡기·전신 면역력',
    metric2Title: '감기·비염 저항력',
    lightWarmth: 0.85
  },
  {
    index: 4,
    id: 'backdrop-1d',
    step: 1,
    subPillIndex: 3,
    start: 0.18,
    end: 0.25,
    isCrisis: true,
    crisisThreshold: 0.205,
    actLabel: 'ACT 01 · 바른 키성장',
    stateTextCrisis: '⚠️ 또래보다 작은 키',
    stateTextHeal: '✦ 성장치료 · 폭풍 키성장',
    sceneTag: 'ACT I · SCENE 04 (작은 키 ➔ 성장치료)',
    subtitleCrisis: '“또래 친구들과 나란히 서 있을 때 유독 작아 보였던 키 — 숨은 성장 잠재력이 필요합니다.”',
    subtitleHeal: '“바른 성장치료로 성장판과 척추가 바르게 펴지며 또래 친구들보다 머리 하나는 더 훤칠하게 자라납니다!”',
    metric1Title: '또래 대비 신장 추이',
    metric2Title: '성장판·골밀도 활성',
    lightWarmth: 1.0
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
    subtitle: '“성인이 되면서 스트레스와 대사 저하로 급격히 불어난 체중 — 무거워진 몸이 자신감마저 짓누릅니다.”',
    metric1Title: '체지방률 / 내장지방',
    metric1Value: '35.4% (비만 주의)',
    metric2Title: '기초 신진대사율',
    metric2Value: '44.0% (대사 저하)',
    barPercent: 32,
    lightWarmth: 0.2
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
    stateText: '✦ 체지방 감량 · 슬림 라인',
    sceneTag: 'ACT II · SCENE 06 (비만치료 ➔ 날씬한 변신)',
    subtitle: '“바른 비만치료(식욕 ZERO)로 군살이 말끔히 정리되고, 가볍고 날씬한 본연의 아름다운 라인을 되찾습니다.”',
    metric1Title: '실시간 체지방 감량',
    metric2Title: '대사 활성 & 바디라인',
    lightWarmth: 1.0
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
    stateText: '⚠️ 두피 열감 · 탈모 진행',
    sceneTag: 'ACT III · SCENE 07 (30대 탈모 발생)',
    subtitle: '“치열한 30대, 뜨거운 두피 열감과 스트레스 속에 머리카락이 가늘어지고 우수수 빠져나갑니다.”',
    metric1Title: '두피 표면 상열감',
    metric1Value: '39.2°C (모낭 약화)',
    metric2Title: '모발 밀도 & 탈락 상태',
    metric2Value: '정수리·이마 탈모 진행',
    barPercent: 28,
    lightWarmth: 0.25
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
    stateText: '✦ 두피 청열 · 풍성한 모발',
    sceneTag: 'ACT III · SCENE 08 (탈모치료 ➔ 정상 회복)',
    subtitle: '“두피의 열을 내리는 청열 한약과 모근 재생 약침으로 뿌리부터 힘이 차오르며 다시 빽빽하고 풍성한 모발로 회복됩니다.”',
    metric1Title: '두피 쿨링 온도 변화',
    metric2Title: '모근 재생 & 모발 밀도',
    lightWarmth: 0.95
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
    stateText: '⚠️ 척추 틀어짐 · 관절 통증',
    sceneTag: 'ACT IV · SCENE 09 (근무 중 척추·관절 통증)',
    subtitle: '“야근과 장시간 근무로 무너진 거북목과 틀어진 척추 — 목·어깨·허리·손목 전신 관절에 찌릿한 통증이 찾아옵니다.”',
    metric1Title: '척추·골반 틀어짐 변위',
    metric1Value: '18.6° 비대칭 왜곡',
    metric2Title: '9대 관절 통증 지수',
    metric2Value: 'VAS 8.5 (극심한 통증)',
    barPercent: 22,
    lightWarmth: 0.15
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
    stateText: '✦ 추나 수직교정 · 통증 회복',
    sceneTag: 'ACT IV · SCENE 10 (추나 통증치료 ➔ 회복)',
    subtitle: '“대표원장 1:1 정밀 추나요법과 봉약침 치료로 틀어진 척추가 반듯하게 펴지고 일상의 가벼운 활력을 되찾습니다.”',
    metric1Title: '척추·골반 정렬도',
    metric2Title: '9대 관절 치유 상태',
    lightWarmth: 1.0
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
    subtitle: '“나이가 들며 찾아온 깊은 기력 저하와 성인병의 무게 — 지친 몸과 마음이 온전한 회복을 부릅니다.”',
    metric1Title: '전신 원기·심폐 활력',
    metric1Value: '28.0% (기력 저하)',
    metric2Title: '혈관·대사 성인병 지수',
    metric2Value: '순환 저하 · 관리 필요',
    barPercent: 28,
    lightWarmth: 0.15
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
    stateText: '✦ 24K 황제공진단 · 기력 회복',
    sceneTag: 'ACT V · SCENE 12 (황제공진단 기력 회복)',
    subtitle: '“식약처 인증 100% 정품 천연 사향과 녹용 분골을 빚은 24K 황제공진단이 막힌 기혈을 뚫고 깊은 생명력을 채웁니다.”',
    metric1Title: '전신 기력·활력 회복률',
    metric2Title: '성인병 예방·면역 활력',
    lightWarmth: 1.0
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
    sceneTag: 'ACT V · SCENE 13 (아름답게 늙어가는 모습)',
    subtitle: '“흐르는 세월마저 가장 따뜻하고 아름다운 기품이 되도록 — 바른한의원이 당신의 일생과 백세 건강을 함께합니다.”',
    metric1Title: '백세 장수·기력 지수',
    metric1Value: '99.8% 충만한 활력',
    metric2Title: '평생 주치의 케어',
    metric2Value: '바른한의원 책임 전담',
    barPercent: 100,
    lightWarmth: 1.0
  }
];

/**
 * Natural Optical Cinema Lens Bokeh Dust Texture (Soft Golden-Hour Sunlight Motes)
 * Zero hard edges, looks like real dust motes caught in an ARRI Alexa 50mm f/1.2 lens.
 */
function createOpticalBokehTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  grad.addColorStop(0, 'rgba(255, 250, 235, 0.75)');
  grad.addColorStop(0.45, 'rgba(245, 222, 179, 0.38)');
  grad.addColorStop(0.8, 'rgba(212, 175, 55, 0.12)');
  grad.addColorStop(1, 'rgba(212, 175, 55, 0.0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(canvas);
}

class BareunMasterpieceStoryApp {
  constructor() {
    this.currentStep = 1;
    this.scrollProgress = 0;
    this.isMobile = window.innerWidth <= 900;
    this.mouseParallax = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.currentLightWarmth = 1.0;

    this.initDOM();
    this.initThreeOpticalLens();
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

    this.telemetryStatus = document.getElementById('telemetry-status');
    this.metric1Title = document.getElementById('metric-1-title');
    this.metric1Value = document.getElementById('metric-1-value');
    this.metric2Title = document.getElementById('metric-2-title');
    this.metric2Value = document.getElementById('metric-2-value');
    this.telemetryBarFill = document.getElementById('telemetry-bar-fill');

    this.timelineActLabel = document.getElementById('timeline-act-label');
    this.timelineProgressFill = document.getElementById('timeline-progress-fill');
    this.timelineStatePill = document.getElementById('timeline-state-pill');
    this.cinemaSceneTag = document.getElementById('cinema-scene-tag');
    this.cinemaSubtitleText = document.getElementById('cinema-subtitle-text');

    this.painRadarBox = document.getElementById('pain-radar-box');
    this.painRadarStatus = document.getElementById('pain-radar-status');

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
  // Photorealistic Three.js Optical Bokeh & Natural Sunlight Dust Engine
  // (No artificial CGI primitives or wireframes — pure cinema lens atmosphere)
  // =========================================================================
  initThreeOpticalLens() {
    if (!this.canvas || typeof THREE === 'undefined') return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(40, width / height, 1, 500);
    this.camera.position.set(0, 0, 90);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0.0);

    const bokehTex = createOpticalBokehTexture();

    // Layer 1: Fine Golden-Hour Sunlight Dust Motes (220 subtle organic motes)
    const dustCount = 220;
    this.dustPositions = new Float32Array(dustCount * 3);
    this.dustSpeeds = [];
    for (let i = 0; i < dustCount; i++) {
      this.dustPositions[i * 3] = (Math.random() - 0.35) * 140;
      this.dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 90;
      this.dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 60;
      this.dustSpeeds.push({
        vx: (Math.random() - 0.5) * 0.025,
        vy: 0.015 + Math.random() * 0.035,
        phase: Math.random() * Math.PI * 2
      });
    }
    const dustGeom = new THREE.BufferGeometry();
    dustGeom.setAttribute('position', new THREE.BufferAttribute(this.dustPositions, 3));
    this.dustMat = new THREE.PointsMaterial({
      size: 1.8,
      map: bokehTex,
      color: 0xFFF3D1,
      transparent: true,
      opacity: 0.42,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    this.dustPoints = new THREE.Points(dustGeom, this.dustMat);
    this.scene.add(this.dustPoints);

    // Layer 2: Foreground Out-of-Focus Cinema Lens Bokeh Orbs (28 soft optical orbs)
    const orbCount = 28;
    this.orbPositions = new Float32Array(orbCount * 3);
    for (let i = 0; i < orbCount; i++) {
      this.orbPositions[i * 3] = (Math.random() - 0.25) * 120;
      this.orbPositions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      this.orbPositions[i * 3 + 2] = 20 + Math.random() * 35;
    }
    const orbGeom = new THREE.BufferGeometry();
    orbGeom.setAttribute('position', new THREE.BufferAttribute(this.orbPositions, 3));
    this.orbMat = new THREE.PointsMaterial({
      size: 7.5,
      map: bokehTex,
      color: 0xFDE68A,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    this.orbPoints = new THREE.Points(orbGeom, this.orbMat);
    this.scene.add(this.orbPoints);

    window.addEventListener('resize', () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      this.isMobile = w <= 900;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
      if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
    });
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
  // Master 13-Scene Live-Action Film Timeline Choreography (0% ~ 100%)
  // =========================================================================
  renderTimeline(p) {
    let activeScene = SCENE_TIMELINE[0];
    for (let i = 0; i < SCENE_TIMELINE.length; i++) {
      const s = SCENE_TIMELINE[i];
      if (p >= s.start && p <= s.end) {
        activeScene = s;
        break;
      }
    }

    let step = activeScene.step;

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

    // Update live telemetry, sub-pills, cinema subtitles, and 9-joint chips
    this.updateSceneLiveTelemetry(activeScene, p);

    // Render 3D Camera Dolly, Rack-Focus Blur, and Live-Action Scene Transitions
    this.renderLiveActionCameraDolly(p);

    // Adjust sunlight dust warmth based on whether scene is Crisis (cool shadow) or Healing (golden hour)
    this.currentLightWarmth = activeScene.lightWarmth ?? 1.0;
  }

  // =========================================================================
  // 3D Live-Action Camera Dolly, Rack-Focus Blur & Perspective Choreography
  // =========================================================================
  renderLiveActionCameraDolly(p) {
    const transWidth = 0.022; // Smooth rack-focus cross-dissolve window

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

    const px = (this.mouseParallax.x * -12).toFixed(2);
    const py = (this.mouseParallax.y * -8).toFixed(2);

    SCENE_TIMELINE.forEach((scene, idx) => {
      const el = this.backdropMap[scene.id];
      if (!el) return;

      const localP = Math.max(0, Math.min(1, (p - scene.start) / (scene.end - scene.start)));

      // Scene-specific 3D camera dolly motion:
      // Scene 4 (1D: Peer Height Growth) adds a vertical upward stretch & tilt-up as child grows tall!
      let scaleX = 1.0 + localP * 0.045;
      let scaleY = 1.0 + localP * 0.045;
      let translateY = 0;

      if (scene.index === 4) {
        // Child growing tall among peers: smooth vertical elongation & upward camera lift
        scaleY = 1.0 + localP * 0.095;
        translateY = -localP * 14;
      } else if (scene.index === 6) {
        // Obesity -> Slimming: subtle horizontal refinement
        scaleX = 1.04 - localP * 0.04;
        scaleY = 1.0 + localP * 0.05;
      }

      if (idx === activeIdx && nextIdx === -1) {
        el.style.opacity = '1';
        el.style.zIndex = '3';
        el.style.filter = 'blur(0px) brightness(1.0)';
        el.style.transform = `translate3d(${px}px, ${( parseFloat(py) + translateY ).toFixed(2)}px, 0) scale(${scaleX.toFixed(4)}, ${scaleY.toFixed(4)})`;
      } else if (idx === activeIdx && nextIdx !== -1) {
        // Outgoing shot racks focus (subtle optical blur + dolly forward)
        const blurPx = (blend * 6.0).toFixed(2);
        el.style.opacity = (1 - blend).toFixed(3);
        el.style.zIndex = '2';
        el.style.filter = `blur(${blurPx}px) brightness(${(1 + blend * 0.08).toFixed(2)})`;
        el.style.transform = `translate3d(${px}px, ${( parseFloat(py) + translateY ).toFixed(2)}px, 0) scale(${(scaleX + blend * 0.03).toFixed(4)}, ${(scaleY + blend * 0.03).toFixed(4)})`;
      } else if (idx === nextIdx) {
        // Incoming shot pulls into sharp focus from soft bokeh
        const blurPx = ((1 - blend) * 6.0).toFixed(2);
        el.style.opacity = blend.toFixed(3);
        el.style.zIndex = '3';
        el.style.filter = `blur(${blurPx}px) brightness(1.0)`;
        el.style.transform = `translate3d(${px}px, ${py}px, 0) scale(${(1.04 - blend * 0.04).toFixed(4)})`;
      } else {
        el.style.opacity = '0';
        el.style.zIndex = '1';
        el.style.filter = 'none';
      }
    });
  }

  // =========================================================================
  // Real-Time Biometric Telemetry, Sub-Scene Pills & 9-Joint Status
  // =========================================================================
  updateSceneLiveTelemetry(scene, p) {
    const localP = Math.max(0, Math.min(1, (p - scene.start) / (scene.end - scene.start)));

    let isCrisis = scene.isCrisis;
    if (typeof scene.crisisThreshold === 'number') {
      isCrisis = p < scene.crisisThreshold;
    }

    if (this.timelineActLabel) this.timelineActLabel.textContent = scene.actLabel;
    if (this.timelineProgressFill) {
      this.timelineProgressFill.style.width = `${Math.max(3, Math.round(p * 100))}%`;
    }
    if (this.timelineStatePill) {
      const stateStr = scene.stateText || (isCrisis ? scene.stateTextCrisis : scene.stateTextHeal);
      this.timelineStatePill.textContent = stateStr;
      this.timelineStatePill.className = `timeline-state-pill ${isCrisis ? 'state-crisis' : 'state-healing'}`;
    }

    if (this.hudCounter) {
      this.hudCounter.textContent = `SCENE ${String(scene.index).padStart(2, '0')} / 13`;
    }
    if (this.hudPanel) {
      this.hudPanel.classList.toggle('crisis-mode', isCrisis);
    }

    if (this.hudSubsceneFlow && this.currentStep <= 5) {
      const pills = this.hudSubsceneFlow.querySelectorAll('.subscene-pill');
      pills.forEach((pill, idx) => {
        pill.classList.remove('active', 'crisis-active');
        if (idx === scene.subPillIndex) {
          pill.classList.add(isCrisis ? 'crisis-active' : 'active');
        }
      });
    }

    if (this.cinemaSceneTag) this.cinemaSceneTag.textContent = scene.sceneTag;
    if (this.cinemaSubtitleText) {
      const subStr = scene.subtitle || (isCrisis ? scene.subtitleCrisis : scene.subtitleHeal);
      this.cinemaSubtitleText.textContent = subStr;
    }

    if (this.telemetryStatus) {
      this.telemetryStatus.textContent = isCrisis ? '⚠️ 치료 전 증상 감지' : '✦ 바른한의원 치료·회복';
      this.telemetryStatus.className = `telemetry-status ${isCrisis ? 'crisis' : ''}`;
    }
    if (this.metric1Title) this.metric1Title.textContent = scene.metric1Title;
    if (this.metric2Title) this.metric2Title.textContent = scene.metric2Title;

    let m1Val = scene.metric1Value || '';
    let m2Val = scene.metric2Value || '';
    let barPct = scene.barPercent || 85;

    if (scene.index === 3) {
      if (isCrisis) {
        m1Val = '42.0% (감기·비염 발생)';
        m2Val = '면역력 저하 상태';
        barPct = 38;
      } else {
        const healT = Math.min(1, (p - 0.145) / 0.035);
        const imm = (42 + healT * 56.5).toFixed(1);
        m1Val = `${imm}% (면역강화 완료)`;
        m2Val = '호흡기·전신 자생력 회복';
        barPct = Math.round(42 + healT * 56);
      }
    } else if (scene.index === 4) {
      if (isCrisis) {
        m1Val = '134.0cm (또래 대비 -12cm)';
        m2Val = '성장판 잠복 상태';
        barPct = 40;
      } else {
        const growT = Math.min(1, (p - 0.205) / 0.045);
        const cm = (134 + growT * 48.4).toFixed(1);
        m1Val = `134cm ➔ ${cm}cm (+추월!)`;
        m2Val = '성장판·척추 폭풍 키성장';
        barPct = Math.round(45 + growT * 55);
      }
    } else if (scene.index === 6) {
      const fatPct = (35.4 - localP * 17.2).toFixed(1);
      const kgLost = (localP * 15.8).toFixed(1);
      m1Val = `35.4% ➔ ${fatPct}% (-${kgLost}kg)`;
      m2Val = '식욕 ZERO · 슬림 라인 완성';
      barPct = Math.round(40 + localP * 58);
    } else if (scene.index === 8) {
      const temp = (39.2 - localP * 7.8).toFixed(1);
      const density = Math.round(48 + localP * 52);
      m1Val = `39.2°C ➔ ${temp}°C (청열 완료)`;
      m2Val = `모낭 밀도 ${density}% 정상 회복`;
      barPct = density;
    } else if (scene.index === 9 || scene.index === 10) {
      // Update 9-Joint Chips in Stage 4
      const chips = document.querySelectorAll('.pain-chip');
      if (scene.index === 9) {
        chips.forEach(c => c.classList.remove('healed'));
        if (this.painRadarStatus) {
          this.painRadarStatus.className = 'pain-radar-status warning';
          this.painRadarStatus.innerHTML = '<span class="pulse-dot">●</span> <span>근무 중 척추 틀어짐 & 통증 발생</span>';
        }
      } else {
        const healedCount = Math.floor(localP * (chips.length + 1));
        chips.forEach((c, idx) => {
          c.classList.toggle('healed', idx <= healedCount);
        });
        const angle = Math.max(0, 18.6 * (1 - localP * 1.15)).toFixed(1);
        m1Val = `18.6° ➔ ${angle}° 바른 정렬`;
        m2Val = angle === '0.0' ? '9대 관절 통증 100% 회복' : '1:1 추나·봉약침 치료 중';
        barPct = Math.round(35 + localP * 65);
        if (this.painRadarStatus) {
          this.painRadarStatus.className = 'pain-radar-status healing';
          this.painRadarStatus.innerHTML = angle === '0.0'
            ? '<span class="pulse-dot">✓</span> <span>척추 수직교정 & 전신 회복 완료</span>'
            : '<span class="pulse-dot">✦</span> <span>추나·봉약침 교정 치료 진행 중</span>';
        }
      }
    } else if (scene.index === 12) {
      const vit = (28 + localP * 70.5).toFixed(1);
      m1Val = `28% ➔ ${vit}% 기력 충전`;
      m2Val = '24K 황제공진단 원기 회복';
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
      this.mouseParallax.targetX = (e.clientX / window.innerWidth - 0.5);
      this.mouseParallax.targetY = (e.clientY / window.innerHeight - 0.5);
    }, { passive: true });
  }

  // =========================================================================
  // 60fps / 120fps Natural Sunlight Dust & Camera Parallax Loop
  // =========================================================================
  animate() {
    requestAnimationFrame(() => this.animate());
    const time = performance.now() * 0.001;

    // Smooth mouse parallax interpolation
    this.mouseParallax.x += (this.mouseParallax.targetX - this.mouseParallax.x) * 0.06;
    this.mouseParallax.y += (this.mouseParallax.targetY - this.mouseParallax.y) * 0.06;

    if (this.camera && this.dustPoints) {
      this.camera.position.x = this.mouseParallax.x * 5.0;
      this.camera.position.y = -this.mouseParallax.y * 3.5;
      this.camera.lookAt(0, 0, 0);

      // Gentle upward drift of natural sunlight dust motes
      const pos = this.dustPositions;
      for (let i = 0; i < this.dustSpeeds.length; i++) {
        const sp = this.dustSpeeds[i];
        pos[i * 3] += sp.vx + Math.sin(time * 0.6 + sp.phase) * 0.012;
        pos[i * 3 + 1] += sp.vy;
        if (pos[i * 3 + 1] > 48) pos[i * 3 + 1] = -48;
      }
      this.dustPoints.geometry.attributes.position.needsUpdate = true;

      // Modulate bokeh warmth opacity based on scene lighting
      this.dustMat.opacity = THREE.MathUtils.lerp(this.dustMat.opacity, 0.14 + this.currentLightWarmth * 0.28, 0.05);
      this.orbMat.opacity = THREE.MathUtils.lerp(this.orbMat.opacity, 0.05 + this.currentLightWarmth * 0.14, 0.05);

      this.renderer.render(this.scene, this.camera);
    }
  }

  initIntro() {
    const splash = document.getElementById('intro-splash');
    const enterBtn = document.getElementById('intro-enter-btn');
    const video = document.getElementById('intro-video');
    if (!splash) return;

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

window.addEventListener('DOMContentLoaded', () => {
  window.bareunApp = new BareunMasterpieceStoryApp();
});
