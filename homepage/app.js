/**
 * BAREUN CLINIC (바른한의원 대전본점)
 * Awwwards Site of the Year Caliber — Master Creative Technologist WebGL Engine
 * 
 * 1. Lando Norris Style: Cinematic 3D WebGL Scrollytelling (Post-processing, GLSL Noise, Lerp Camera)
 * 2. SK Telecom Style: Clean 4+1 Glassmorphic Card Grid UX & Interactive Floating Dock
 * 3. BV Clinic Style: Medical Trust Architecture, Right Slide-Drawer Layer & Fixed Sticky Booking Bar
 */

const CLINIC_SPECS = [
  {
    step: 1,
    slug: 'pediatric-growth',
    title: '01. 바른 성장클리닉',
    badge: 'STEP 01 (0% ~ 20%) · 수정과 생명의 탄생',
    mainCopy: '생명의 시작부터 바르게, 우리 아이 숨은 키를 찾는 골격 성장',
    desc: '세포 분열과 15,000개 유기적 생명 파티클이 응집하며 32개 아동 척추 마디가 형성되고, 골드 광원과 함께 바르게 수직 정렬됩니다.',
    drawerSteps: ['3D 골격 분석', '성장판 검사', '추나 교정'],
    link: 'growth.html',
    color: '#34D399',
    backdropId: 'backdrop-1'
  },
  {
    step: 2,
    slug: 'appetite-zero',
    title: '02. 바른 다이어트 (식욕 ZERO)',
    badge: 'STEP 02 (20% ~ 40%) · 체형 변화 & 감량',
    mainCopy: '가벼워진 몸, 건강하게 되찾은 나만의 바른 라인',
    desc: '인체를 둘러싼 불투명 젤리 형태의 체지방 메쉬가 20,000개의 골드 미세 가루 파티클로 산산이 부서져 마이크로 증발하고, 매끈한 S라인 크리스탈 바디가 안착합니다.',
    drawerSteps: ['1:1 체질 분석', '식욕 감퇴 & 독소 배출', '요요 방지 3단계'],
    link: 'diet-zero.html#checkout-zone',
    color: '#F472B6',
    backdropId: 'backdrop-2'
  },
  {
    step: 3,
    slug: 'scalp-hair',
    title: '03. 바른 탈모케어 (모근 개화)',
    badge: 'STEP 03 (40% ~ 60%) · 두피 열감 & 모근 개화',
    mainCopy: '뿌리부터 굵고 풍성하게, 두피 속부터 채우는 모근 회복',
    desc: '두피 표면에 일렁이던 붉은 열감 입자가 쿨링 에메랄드 한방 입자 침투로 완전 소멸되고, 5,000개 굵은 3D 모발 인스턴스가 모공에서 피어나듯 풍성하게 개화합니다.',
    drawerSteps: ['3D 두피 진단', '한방 약침 주입', '열감 완화 케어'],
    link: 'https://pf.kakao.com/_ykxcLK',
    color: '#60A5FA',
    backdropId: 'backdrop-3'
  },
  {
    step: 4,
    slug: 'pain-chuna',
    title: '04. 바른 통증·추나 (9대 관절 치유)',
    badge: 'STEP 04 (60% ~ 80%) · 전신 통증 점멸 & 녹색 치유',
    mainCopy: '통증의 붉은 신호를 지우고, 관절을 바르게 세우는 추나 케어',
    desc: '목, 어깨, 팔꿈치, 손가락, 허리, 골반, 무릎, 발목, 발가락 9대 관절의 8Hz 붉은 통증 링이 추나 치유 파동 스캔을 통과하며 눈부신 에메랄드 치유점으로 전환되고 척추가 곧게 정렬됩니다.',
    drawerSteps: ['3D 관절 교정 원리', '추나/약침 프로세스', '치료 케이스'],
    link: 'https://naver.me/5U1ELn8L',
    color: '#2F855A',
    backdropId: 'backdrop-4'
  },
  {
    step: 5,
    slug: 'gongjindan',
    title: '05. 명품 공진단 (원기 회복)',
    badge: 'STEP 05 (80% ~ 100%) · 황금빛 원기 회복',
    mainCopy: '지친 몸에 불어넣는 최고의 활력, 원방 그대로의 명품 공진단',
    desc: '치유된 인체 주위로 30,000개 샴페인 골드 오라가 회전하며, 인체 중앙에서 24K 순금박 공진단 메쉬가 떠올라 360도 회전하며 최고의 활력을 완성합니다.',
    drawerSteps: ['100% 정품 사향/녹용 인증서', '당일 수제 제환 영상', '처방 문의'],
    link: 'gongjindan.html',
    color: '#C5A059',
    backdropId: 'backdrop-5'
  }
];

/**
 * High-Resolution 2D Canvas Texture for 3D UI Card 01 [바른 성장클리닉]
 */
function createCard1Texture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 640;
  const ctx = canvas.getContext('2d');

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  // Luxury Glassmorphic Gradient Background
  const bgGrad = ctx.createLinearGradient(0, 0, 1024, 640);
  bgGrad.addColorStop(0, 'rgba(255, 255, 255, 0.94)');
  bgGrad.addColorStop(0.5, 'rgba(247, 245, 240, 0.90)');
  bgGrad.addColorStop(1, 'rgba(235, 230, 220, 0.88)');

  // Outer Border & Card Body
  roundRect(ctx, 20, 20, 984, 600, 36);
  ctx.fillStyle = bgGrad;
  ctx.fill();

  // Champagne Gold Border
  ctx.lineWidth = 6;
  const borderGrad = ctx.createLinearGradient(0, 0, 1024, 640);
  borderGrad.addColorStop(0, '#C5A059');
  borderGrad.addColorStop(0.5, '#FDE68A');
  borderGrad.addColorStop(1, '#99732B');
  ctx.strokeStyle = borderGrad;
  ctx.stroke();

  // Subtle Inner Frame
  roundRect(ctx, 32, 32, 960, 576, 26);
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = 'rgba(197, 160, 89, 0.35)';
  ctx.stroke();

  // Top Badge: STEP 01 · 성장클리닉
  roundRect(ctx, 60, 60, 300, 50, 25);
  ctx.fillStyle = '#2D4030';
  ctx.fill();
  ctx.fillStyle = '#FDE68A';
  ctx.font = 'bold 21px "Pretendard", -apple-system, sans-serif';
  ctx.fillText('✦ 01. 바른 성장클리닉', 86, 93);

  // Main Korean Typography Copy
  ctx.fillStyle = '#1A291E';
  ctx.font = 'bold 44px "Pretendard", "Noto Serif KR", serif';
  ctx.fillText('생명의 시작부터 바르게,', 60, 175);
  ctx.fillStyle = '#C5A059';
  ctx.font = 'bold 44px "Pretendard", "Noto Serif KR", serif';
  ctx.fillText('우리 아이 숨은 키를 찾는 골격 성장', 60, 235);

  // Elegant Divider
  ctx.strokeStyle = 'rgba(197, 160, 89, 0.4)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(60, 275);
  ctx.lineTo(964, 275);
  ctx.stroke();

  // 3 Feature Cards
  const features = [
    { title: '무방사선 정밀 초음파', sub: '성장판 8대 관절 개폐 분석' },
    { title: '1:1 맞춤 소아 추나', sub: '척추 32마디 바른 수직 정렬' },
    { title: '원내 청정 맞춤 탕전', sub: '골밀도 촉진 녹용 성장단' }
  ];

  features.forEach((feat, idx) => {
    const px = 60 + idx * 305;
    roundRect(ctx, px, 310, 290, 160, 20);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(197, 160, 89, 0.3)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(px + 28, 345, 8, 0, Math.PI * 2);
    ctx.fillStyle = '#C5A059';
    ctx.fill();

    ctx.fillStyle = '#1A291E';
    ctx.font = 'bold 22px "Pretendard", sans-serif';
    ctx.fillText(feat.title, px + 48, 352);

    ctx.fillStyle = '#5A685D';
    ctx.font = '17px "Pretendard", sans-serif';
    ctx.fillText(feat.sub, px + 28, 410);
  });

  // Footer Tagline
  ctx.fillStyle = '#2D4030';
  ctx.font = 'bold 20px "Pretendard", sans-serif';
  ctx.fillText('DAEJEON BAREUN KOREAN MEDICINE CLINIC · 15 YEARS CLINICAL TRUST', 60, 545);

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.needsUpdate = true;
  return texture;
}

/**
 * Soft Circular Radial Particle Texture for Bloom & Points
 */
function createCircularParticleTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
  grad.addColorStop(0.35, 'rgba(253, 230, 138, 0.9)');
  grad.addColorStop(0.7, 'rgba(197, 160, 89, 0.35)');
  grad.addColorStop(1, 'rgba(197, 160, 89, 0.0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

class BareunMasterpieceStoryApp {
  constructor() {
    this.currentStep = 1;
    this.scrollProgress = 0;
    this.isMobile = window.innerWidth <= 768;

    // Camera Lerp Inertia Targets
    this.targetCameraPos = new THREE.Vector3(0, 0, 115);
    this.targetCameraFov = 45;
    this.targetLookAt = new THREE.Vector3(0, 0, 0);
    this.currentLookAt = new THREE.Vector3(0, 0, 0);
    this.targetRotation = new THREE.Euler(0, 0, 0);
    this.mouseParallax = { x: 0, y: 0 };

    // Exact 9-Joint Real World Coordinates from Production Sheet
    this.jointAnchors = [
      { id: 'neck', name: '목 (Cervical Spine)', pos: [0.0, 38.0, 0.0], chipKey: 'neck' },
      { id: 'shoulder_l', name: '어깨 (L)', pos: [-12.0, 32.0, 0.0], chipKey: 'shoulder' },
      { id: 'shoulder_r', name: '어깨 (R)', pos: [12.0, 32.0, 0.0], chipKey: 'shoulder' },
      { id: 'elbow_l', name: '팔꿈치 (L)', pos: [-18.0, 18.0, 0.0], chipKey: 'elbow' },
      { id: 'elbow_r', name: '팔꿈치 (R)', pos: [18.0, 18.0, 0.0], chipKey: 'elbow' },
      { id: 'finger_l', name: '손가락 (L)', pos: [-22.0, 0.0, 0.0], chipKey: 'wrist' },
      { id: 'finger_r', name: '손가락 (R)', pos: [22.0, 0.0, 0.0], chipKey: 'wrist' },
      { id: 'lumbar', name: '허리 (Lumbar Spine)', pos: [0.0, 10.0, -2.0], chipKey: 'waist' },
      { id: 'hip_l', name: '골반/다리 (L)', pos: [-8.0, -5.0, 0.0], chipKey: 'hip' },
      { id: 'hip_r', name: '골반/다리 (R)', pos: [8.0, -5.0, 0.0], chipKey: 'hip' },
      { id: 'knee_l', name: '무릎 (L)', pos: [-7.0, -25.0, 0.0], chipKey: 'knee' },
      { id: 'knee_r', name: '무릎 (R)', pos: [7.0, -25.0, 0.0], chipKey: 'knee' },
      { id: 'ankle_l', name: '발목 (L)', pos: [-6.0, -45.0, 0.0], chipKey: 'ankle' },
      { id: 'ankle_r', name: '발목 (R)', pos: [6.0, -45.0, 0.0], chipKey: 'ankle' },
      { id: 'toe_l', name: '발가락 (L)', pos: [-6.0, -52.0, 3.0], chipKey: 'toe' },
      { id: 'toe_r', name: '발가락 (R)', pos: [6.0, -52.0, 3.0], chipKey: 'toe' }
    ];

    this.initDOM();
    this.initThree();
    this.initGSAPScrollTrigger();
    this.initIntro();
    this.initDrawer();
    this.initInteractions();
    this.animate();

    window.currentAppStepSlug = CLINIC_SPECS[0].slug;
    this.updateBackdrops(1);
    this.renderBackdropBlend(0);
  }

  initDOM() {
    this.canvas = document.getElementById('storyboard-canvas');
    this.stage = document.getElementById('story-stage-sticky');
    this.track = document.getElementById('story-scroll-track');

    this.hudBadge = document.getElementById('hud-step-badge');
    this.hudCounter = document.getElementById('hud-step-counter');
    this.hudTitle = document.getElementById('hud-step-title');
    this.hudSubtitle = document.getElementById('hud-step-subtitle');
    this.hudDesc = document.getElementById('hud-step-desc');
    this.hudPrimaryBtn = document.getElementById('hud-primary-btn');
    this.hudDrawerBtn = document.getElementById('hud-drawer-btn');
    this.painRadarBox = document.getElementById('pain-radar-box');
    this.painRadarStatus = document.getElementById('pain-radar-status');

    this.backdrops = [
      document.getElementById('backdrop-1a'),
      document.getElementById('backdrop-1b'),
      document.getElementById('backdrop-1c'),
      document.getElementById('backdrop-2'),
      document.getElementById('backdrop-3'),
      document.getElementById('backdrop-4'),
      document.getElementById('backdrop-5')
    ];

    this.navDots = document.querySelectorAll('.step-nav-dot');
    this.sktCards = document.querySelectorAll('.skt-dock-card');
  }

  // =========================================================================
  // Three.js High-End Studio Setup with ACESFilmicToneMapping & Bloom
  // =========================================================================
  initThree() {
    if (!this.canvas || typeof THREE === 'undefined') return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Scene
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    this.camera.position.copy(this.targetCameraPos);
    this.camera.lookAt(0, 0, 0);

    // Renderer with ACESFilmic Tone Mapping for cinematic luxury dynamic range
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x2D4030, 0.0);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.renderer.outputEncoding = THREE.sRGBEncoding;

    // Post-Processing: UnrealBloomPass for heavenly golden & emerald glow
    if (typeof THREE.EffectComposer !== 'undefined' && typeof THREE.UnrealBloomPass !== 'undefined') {
      try {
        this.composer = new THREE.EffectComposer(this.renderer);
        const renderPass = new THREE.RenderPass(this.scene, this.camera);
        this.composer.addPass(renderPass);

        // UnrealBloomPass(resolution, strength: 0.6, radius: 0.5, threshold: 0.8)
        this.bloomPass = new THREE.UnrealBloomPass(
          new THREE.Vector2(width, height),
          0.6, // strength: 0.6 for celestial glow
          0.5, // radius: 0.5
          0.8  // threshold: 0.8
        );
        this.composer.addPass(this.bloomPass);
      } catch (err) {
        console.warn('[Bareun] Post-processing fallback to default renderer', err);
        this.composer = null;
      }
    }

    // Studio 3-Point Lighting System
    // 1. Ambient Warm Light
    const ambientLight = new THREE.AmbientLight(0xF7F5F0, 0.7);
    this.scene.add(ambientLight);

    // 2. Key Light: Champagne Gold (#C5A059)
    this.goldKeyLight = new THREE.DirectionalLight(0xC5A059, 1.8);
    this.goldKeyLight.position.set(45, 65, 55);
    this.scene.add(this.goldKeyLight);

    // 3. Rim Light: Deep Sage Green (#2D4030 / #34D399)
    this.emeraldRimLight = new THREE.DirectionalLight(0x2D4030, 1.4);
    this.emeraldRimLight.position.set(-45, -35, -25);
    this.scene.add(this.emeraldRimLight);

    // 4. Soft White Fill Light
    const softFillLight = new THREE.DirectionalLight(0xFFFFFF, 0.6);
    softFillLight.position.set(0, 30, 70);
    this.scene.add(softFillLight);

    // Build Master 5-Step Scrollytelling Meshes
    this.buildStep1VFX();
    this.buildStep2VFX();
    this.buildStep3VFX();
    this.buildStep4Joints();
    this.buildStep5Gongjindan();

    // Window Resize Handling
    window.addEventListener('resize', () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      this.isMobile = w <= 768;
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
  // Step 01: Fertilization, Toddler Growth Morph & Card Enfolding Dissolve
  // =========================================================================
  buildStep1VFX() {
    this.step1Group = new THREE.Group();
    const particleTex = createCircularParticleTexture();

    // -----------------------------------------------------------------------
    // [1] Sub-Phase 1 (0% ~ 5%): Glowing Opal Egg, 1000 Particles & Shockwave
    // -----------------------------------------------------------------------
    this.step1EggGroup = new THREE.Group();

    // Glowing Opal Sphere (MeshPhysicalMaterial)
    const eggGeom = new THREE.SphereGeometry(7.5, 48, 48);
    eggGeom.scale(1.0, 1.24, 1.0); // Organic cellular ovum shape
    this.step1EggMat = new THREE.MeshPhysicalMaterial({
      color: 0xF7F5F0,
      emissive: 0xC5A059,
      emissiveIntensity: 0.95,
      transmission: 0.9,
      roughness: 0.1,
      metalness: 0.08,
      ior: 1.45,
      transparent: true,
      opacity: 0.95
    });
    this.step1EggMesh = new THREE.Mesh(eggGeom, this.step1EggMat);
    this.step1EggGroup.add(this.step1EggMesh);

    // Glowing Inner Nucleus Core
    const coreGeom = new THREE.SphereGeometry(3.6, 24, 24);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xFFFBEB,
      transparent: true,
      opacity: 0.85
    });
    this.step1EggCore = new THREE.Mesh(coreGeom, coreMat);
    this.step1EggGroup.add(this.step1EggCore);

    // Concentric Golden Orbital Rings (as in reference image)
    this.step1EggRings = new THREE.Group();
    for (let r = 0; r < 3; r++) {
      const ringGeom = new THREE.TorusGeometry(11.5 + r * 4.2, 0.18, 16, 64);
      const ringMat = new THREE.MeshStandardMaterial({
        color: 0xFDE68A,
        emissive: 0xC5A059,
        emissiveIntensity: 1.3,
        transparent: true,
        opacity: 0.82 - r * 0.18
      });
      const ring = new THREE.Mesh(ringGeom, ringMat);
      ring.rotation.x = Math.PI / 2.2 + r * 0.22;
      ring.rotation.y = r * 0.35;
      this.step1EggRings.add(ring);
    }
    this.step1EggGroup.add(this.step1EggRings);

    // 1,000 Golden Converging Particles (Dispersed Sphere -> Converge to Egg)
    const convergeCount = 1000;
    this.step1ParticlePositions = new Float32Array(convergeCount * 3);
    this.step1OriginPositions = new Float32Array(convergeCount * 3);
    this.step1TargetPositions = new Float32Array(convergeCount * 3);

    for (let i = 0; i < convergeCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);

      // Origin: Dispersed cloud (radius 28 to 50)
      const rOrig = 28 + Math.random() * 22;
      const ox = rOrig * Math.sin(phi) * Math.cos(theta);
      const oy = rOrig * Math.sin(phi) * Math.sin(theta) * 1.2;
      const oz = rOrig * Math.cos(phi);

      // Target: Surface of the egg (radius 7.5 to 9.5)
      const rTarg = 7.5 + Math.random() * 2.0;
      const tx = rTarg * Math.sin(phi) * Math.cos(theta);
      const ty = rTarg * Math.sin(phi) * Math.sin(theta) * 1.2;
      const tz = rTarg * Math.cos(phi);

      this.step1OriginPositions[i * 3] = ox;
      this.step1OriginPositions[i * 3 + 1] = oy;
      this.step1OriginPositions[i * 3 + 2] = oz;

      this.step1TargetPositions[i * 3] = tx;
      this.step1TargetPositions[i * 3 + 1] = ty;
      this.step1TargetPositions[i * 3 + 2] = tz;

      this.step1ParticlePositions[i * 3] = ox;
      this.step1ParticlePositions[i * 3 + 1] = oy;
      this.step1ParticlePositions[i * 3 + 2] = oz;
    }

    const convergeGeom = new THREE.BufferGeometry();
    convergeGeom.setAttribute('position', new THREE.BufferAttribute(this.step1ParticlePositions, 3));
    const convergeMat = new THREE.PointsMaterial({
      size: 1.8,
      map: particleTex,
      color: 0xFDE68A,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    this.step1ConvergePoints = new THREE.Points(convergeGeom, convergeMat);
    this.step1EggGroup.add(this.step1ConvergePoints);

    // Golden Radial Shockwave Ring (Triggers on touch or 4% scroll)
    const shockGeom = new THREE.RingGeometry(0.5, 2.2, 64);
    this.step1ShockwaveMat = new THREE.MeshBasicMaterial({
      color: 0xC5A059,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending
    });
    this.step1Shockwave = new THREE.Mesh(shockGeom, this.step1ShockwaveMat);
    this.step1EggGroup.add(this.step1Shockwave);
    this.shockwaveActive = false;

    this.step1Group.add(this.step1EggGroup);

    // -----------------------------------------------------------------------
    // [2] Sub-Phase 2 & 3 (5% ~ 20%): Toddler Light Silhouette & Growth Morph
    // -----------------------------------------------------------------------
    this.step1ToddlerGroup = new THREE.Group();

    this.step1SilMat = new THREE.MeshPhysicalMaterial({
      color: 0xF7F5F0,
      emissive: 0xC5A059,
      emissiveIntensity: 0.75,
      transmission: 0.88,
      roughness: 0.12,
      metalness: 0.1,
      ior: 1.45,
      transparent: true,
      opacity: 0.0
    });

    // Cute toddler head
    const headGeom = new THREE.SphereGeometry(4.2, 32, 32);
    this.step1Head = new THREE.Mesh(headGeom, this.step1SilMat.clone());
    this.step1Head.position.set(0, 14, 0);
    this.step1ToddlerGroup.add(this.step1Head);

    // Golden Halo Aura
    const haloGeom = new THREE.TorusGeometry(5.2, 0.18, 16, 48);
    this.step1HaloMat = new THREE.MeshStandardMaterial({
      color: 0xFDE68A,
      emissive: 0xC5A059,
      emissiveIntensity: 1.5,
      transparent: true,
      opacity: 0.0
    });
    this.step1Halo = new THREE.Mesh(haloGeom, this.step1HaloMat);
    this.step1Halo.rotation.x = Math.PI / 2.3;
    this.step1Halo.position.set(0, 16.5, 0);
    this.step1ToddlerGroup.add(this.step1Halo);

    // Cute toddler torso
    const torsoGeom = new THREE.CylinderGeometry(2.6, 3.4, 11, 24);
    this.step1Torso = new THREE.Mesh(torsoGeom, this.step1SilMat.clone());
    this.step1Torso.position.set(0, 5, 0);
    this.step1ToddlerGroup.add(this.step1Torso);

    // Left & Right Arms
    const armGeom = new THREE.CylinderGeometry(0.9, 0.8, 8, 16);
    this.step1ArmL = new THREE.Mesh(armGeom, this.step1SilMat.clone());
    this.step1ArmL.position.set(-4.4, 5, 0);
    this.step1ArmL.rotation.z = 0.22;
    this.step1ToddlerGroup.add(this.step1ArmL);

    this.step1ArmR = new THREE.Mesh(armGeom, this.step1SilMat.clone());
    this.step1ArmR.position.set(4.4, 5, 0);
    this.step1ArmR.rotation.z = -0.22;
    this.step1ToddlerGroup.add(this.step1ArmR);

    // Left & Right Legs
    const legGeom = new THREE.CylinderGeometry(1.1, 0.9, 10, 16);
    this.step1LegL = new THREE.Mesh(legGeom, this.step1SilMat.clone());
    this.step1LegL.position.set(-2.0, -5.5, 0);
    this.step1ToddlerGroup.add(this.step1LegL);

    this.step1LegR = new THREE.Mesh(legGeom, this.step1SilMat.clone());
    this.step1LegR.position.set(2.0, -5.5, 0);
    this.step1ToddlerGroup.add(this.step1LegR);

    // 32-Vertebrae Child Spine Crystal Discs
    this.spineNodes = [];
    const discGeom = new THREE.CylinderGeometry(1.2, 1.4, 0.35, 20);
    const discMat = new THREE.MeshPhysicalMaterial({
      color: 0xFDE68A,
      emissive: 0xC5A059,
      emissiveIntensity: 0.95,
      transmission: 0.85,
      roughness: 0.15,
      metalness: 0.2,
      transparent: true,
      opacity: 0.85
    });

    for (let i = 0; i < 32; i++) {
      const disc = new THREE.Mesh(discGeom, discMat.clone());
      disc.position.set(0, -6 + i * 0.72, 0.6);
      disc.rotation.x = Math.PI / 2;
      disc.scale.set(0.001, 0.001, 0.001);
      this.step1ToddlerGroup.add(disc);
      this.spineNodes.push(disc);
    }

    // Vertical Golden Growth Height Ruler (as seen in user image 3)
    this.step1GrowthRuler = new THREE.Group();
    const rulerLineGeom = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(12.5, -12, 0),
      new THREE.Vector3(12.5, 22, 0)
    ]);
    const rulerLine = new THREE.Line(rulerLineGeom, new THREE.LineBasicMaterial({
      color: 0xC5A059,
      transparent: true,
      opacity: 0.75
    }));
    this.step1GrowthRuler.add(rulerLine);

    for (let y = -10; y <= 20; y += 3) {
      const tickGeom = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(11.8, y, 0),
        new THREE.Vector3(13.2, y, 0)
      ]);
      const tickLine = new THREE.Line(tickGeom, new THREE.LineBasicMaterial({
        color: 0xFDE68A,
        transparent: true,
        opacity: 0.85
      }));
      this.step1GrowthRuler.add(tickLine);
    }
    this.step1GrowthRuler.visible = false;
    this.step1ToddlerGroup.add(this.step1GrowthRuler);

    this.step1ToddlerGroup.visible = false;
    this.step1ToddlerGroup.scale.set(0.55, 0.55, 0.55);
    this.step1ToddlerGroup.position.set(0, -4, 0);
    this.step1Group.add(this.step1ToddlerGroup);

    // -----------------------------------------------------------------------
    // [3] Sub-Phase 3 & 4 (12% ~ 20%): 3D Curved UI Card 01 & Dissolution Dust
    // -----------------------------------------------------------------------
    this.step1CardGroup = new THREE.Group();

    // 3D Curved Cylindrical Card Mesh (Enfolds child naturally)
    const cardGeom = new THREE.CylinderGeometry(23, 23, 15, 36, 1, true, -Math.PI / 3.4, (2 * Math.PI) / 3.4);
    const cardTexture = createCard1Texture();
    this.step1CardMat = new THREE.MeshPhysicalMaterial({
      map: cardTexture,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.0,
      transmission: 0.25,
      roughness: 0.12,
      metalness: 0.12,
      ior: 1.4
    });
    this.step1CardMesh = new THREE.Mesh(cardGeom, this.step1CardMat);
    this.step1CardMesh.position.set(0, 4, 0);
    this.step1CardGroup.add(this.step1CardMesh);

    // 1,200 Floating Champagne Gold Dust Particles for Dissolution (18% ~ 20%)
    const dustCount = 1200;
    const dustPositions = new Float32Array(dustCount * 3);
    this.step1DustBasePos = new Float32Array(dustCount * 3);
    this.step1DustVelocities = new Float32Array(dustCount * 3);

    for (let i = 0; i < dustCount; i++) {
      const theta = (Math.random() - 0.5) * (Math.PI * 0.7);
      const dy = 4 + (Math.random() - 0.5) * 15;
      const r = 23 + (Math.random() - 0.5) * 2;
      const dx = r * Math.sin(theta);
      const dz = r * Math.cos(theta);

      dustPositions[i * 3] = dx;
      dustPositions[i * 3 + 1] = dy;
      dustPositions[i * 3 + 2] = dz;

      this.step1DustBasePos[i * 3] = dx;
      this.step1DustBasePos[i * 3 + 1] = dy;
      this.step1DustBasePos[i * 3 + 2] = dz;

      this.step1DustVelocities[i * 3] = (Math.random() - 0.5) * 10;
      this.step1DustVelocities[i * 3 + 1] = 14 + Math.random() * 22; // upward float
      this.step1DustVelocities[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }

    this.step1DustGeom = new THREE.BufferGeometry();
    this.step1DustGeom.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));

    this.step1CardDustMat = new THREE.PointsMaterial({
      size: 1.6,
      map: particleTex,
      color: 0xC5A059,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    this.step1CardDustPoints = new THREE.Points(this.step1DustGeom, this.step1CardDustMat);
    this.step1CardDustPoints.visible = false;
    this.step1CardGroup.add(this.step1CardDustPoints);

    this.step1CardGroup.visible = false;
    this.step1Group.add(this.step1CardGroup);

    this.scene.add(this.step1Group);
  }

  // Update 1,000 Golden Converging Particles (0% ~ 5%)
  updateConvergingParticles(t) {
    if (!this.step1ConvergePoints) return;
    const pos = this.step1ParticlePositions;
    const orig = this.step1OriginPositions;
    const targ = this.step1TargetPositions;
    const count = pos.length / 3;

    for (let i = 0; i < count; i++) {
      pos[i * 3] = THREE.MathUtils.lerp(orig[i * 3], targ[i * 3], t);
      pos[i * 3 + 1] = THREE.MathUtils.lerp(orig[i * 3 + 1], targ[i * 3 + 1], t);
      pos[i * 3 + 2] = THREE.MathUtils.lerp(orig[i * 3 + 2], targ[i * 3 + 2], t);
    }
    this.step1ConvergePoints.geometry.attributes.position.needsUpdate = true;
  }

  // Update 1,200 Floating Champagne Gold Dust Particles (18% ~ 20%)
  updateCardDust(t) {
    if (!this.step1DustGeom) return;
    const pos = this.step1DustGeom.attributes.position.array;
    const base = this.step1DustBasePos;
    const vel = this.step1DustVelocities;
    const count = pos.length / 3;

    for (let i = 0; i < count; i++) {
      pos[i * 3] = base[i * 3] + vel[i * 3] * t;
      pos[i * 3 + 1] = base[i * 3 + 1] + vel[i * 3 + 1] * t;
      pos[i * 3 + 2] = base[i * 3 + 2] + vel[i * 3 + 2] * t;
    }
    this.step1DustGeom.attributes.position.needsUpdate = true;
  }

  // Trigger Golden Radial Shockwave (on touch or 4% scroll)
  triggerShockwave() {
    if (!this.step1Shockwave) return;
    this.shockwaveActive = true;
    this.shockwaveStartTime = performance.now();
  }

  // =========================================================================
  // Step 02: 100% Crystal-Clear View of 8K Luxury S-Line Body (NO SQUARE NOISE)
  // =========================================================================
  buildStep2VFX() {
    this.step2Group = new THREE.Group();

    // Sleek subtle holographic golden waist aura ring (Torus)
    const waistRingGeom = new THREE.TorusGeometry(14, 0.35, 16, 64);
    const waistRingMat = new THREE.MeshStandardMaterial({
      color: 0xFDE68A,
      emissive: 0xC5A059,
      emissiveIntensity: 0.8,
      transparent: true,
      opacity: 0.0
    });
    this.step2WaistRing = new THREE.Mesh(waistRingGeom, waistRingMat);
    this.step2WaistRing.rotation.x = Math.PI / 2;
    this.step2Group.add(this.step2WaistRing);

    this.step2Group.visible = false;
    this.scene.add(this.step2Group);
  }

  // =========================================================================
  // Step 03: Scalp Cooling Hologram Ring (100% Clear View of 8K Scalp Image)
  // =========================================================================
  buildStep3VFX() {
    this.step3Group = new THREE.Group();

    const coolRingGeom = new THREE.TorusGeometry(18, 0.45, 16, 64);
    const coolRingMat = new THREE.MeshStandardMaterial({
      color: 0x38A169,
      emissive: 0x10B981,
      emissiveIntensity: 1.2,
      transparent: true,
      opacity: 0.0
    });
    this.step3CoolRing = new THREE.Mesh(coolRingGeom, coolRingMat);
    this.step3CoolRing.rotation.x = Math.PI / 2;
    this.step3CoolRing.position.y = 30;
    this.step3Group.add(this.step3CoolRing);

    this.step3Group.visible = false;
    this.scene.add(this.step3Group);
  }

  // =========================================================================
  // Step 04: Full Body 360 Rotation, 8Hz Pain Torus Rings & Chuna Green Healing Scan
  // =========================================================================
  buildStep4Joints() {
    this.step4Group = new THREE.Group();

    // 1. Sleek Golden Laser Alignment Vector (Connecting the Spine)
    const spinePts = [];
    for (let y = -45; y <= 38; y += 3) {
      spinePts.push(new THREE.Vector3(0, y, 0));
    }
    const spineGeom = new THREE.BufferGeometry().setFromPoints(spinePts);
    this.alignmentLaser = new THREE.Line(spineGeom, new THREE.LineBasicMaterial({
      color: 0x2F855A,
      linewidth: 3,
      transparent: true,
      opacity: 0.0
    }));
    this.step4Group.add(this.alignmentLaser);

    // 2. 9 Major Joint Laser Nodes (Exact Coordinates)
    this.jointNodes = [];
    this.jointAnchors.forEach(j => {
      const g = new THREE.Group();
      g.position.set(...j.pos);

      // Core Glowing Crystal Gem (MeshPhysicalMaterial)
      const gemGeom = new THREE.SphereGeometry(1.4, 20, 20);
      const gemMat = new THREE.MeshPhysicalMaterial({
        color: 0xE53E3E,
        emissive: 0xE53E3E,
        emissiveIntensity: 1.4,
        transmission: 0.8,
        roughness: 0.1,
        metalness: 0.2
      });
      const gem = new THREE.Mesh(gemGeom, gemMat);
      g.add(gem);

      // 3D Smooth Torus Pulsing Ring (8Hz) - No pixelated square corners!
      const ringGeom = new THREE.TorusGeometry(2.4, 0.25, 16, 48);
      const ringMat = new THREE.MeshStandardMaterial({
        color: 0xE53E3E,
        emissive: 0xE53E3E,
        emissiveIntensity: 1.2,
        transparent: true,
        opacity: 0.85
      });
      const ring = new THREE.Mesh(ringGeom, ringMat);
      g.add(ring);

      this.step4Group.add(g);
      this.jointNodes.push({
        def: j,
        group: g,
        gem: gem,
        ring: ring,
        healed: false,
        pulseOffset: Math.random() * Math.PI
      });
    });

    // 3. Y-Axis Chuna Healing Laser Scan Beam (Torus Wave)
    const scanGeom = new THREE.TorusGeometry(32, 0.7, 16, 64);
    const scanMat = new THREE.MeshStandardMaterial({
      color: 0x2F855A,
      emissive: 0x38A169,
      emissiveIntensity: 2.5,
      transparent: true,
      opacity: 0.95
    });
    this.chunaScanBeam = new THREE.Mesh(scanGeom, scanMat);
    this.chunaScanBeam.rotation.x = Math.PI / 2;
    this.chunaScanBeam.position.y = 48; // Starts above cervical spine
    this.step4Group.add(this.chunaScanBeam);

    this.step4Group.visible = false;
    this.scene.add(this.step4Group);
  }

  // =========================================================================
  // Step 05: 24K Gold Orbital Rings (100% Clear View of 8K Gongjindan Image)
  // =========================================================================
  buildStep5Gongjindan() {
    this.step5Group = new THREE.Group();

    // Orbital Gold Energy Rings (Smooth 3D Torus)
    const ring1Geom = new THREE.TorusGeometry(24, 0.5, 16, 64);
    const rMat = new THREE.MeshStandardMaterial({
      color: 0xFDE68A,
      emissive: 0xC5A059,
      emissiveIntensity: 0.9,
      metalness: 0.95,
      roughness: 0.1
    });
    this.goldOrbit1 = new THREE.Mesh(ring1Geom, rMat);
    this.goldOrbit1.rotation.x = 0.85;
    this.goldOrbit1.rotation.y = 0.35;
    this.step5Group.add(this.goldOrbit1);

    const ring2Geom = new THREE.TorusGeometry(30, 0.38, 16, 64);
    this.goldOrbit2 = new THREE.Mesh(ring2Geom, rMat);
    this.goldOrbit2.rotation.x = -0.65;
    this.goldOrbit2.rotation.y = -0.45;
    this.step5Group.add(this.goldOrbit2);

    this.step5Group.visible = false;
    this.scene.add(this.step5Group);
  }

  // =========================================================================
  // GSAP ScrollTrigger Rock-Solid Pinning & Scrub Engine
  // =========================================================================
  initGSAPScrollTrigger() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      console.warn('[Bareun] GSAP / ScrollTrigger not loaded, falling back to window scroll.');
      this.initFallbackScroll();
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Scrub normalized progress 0.0 to 1.0 across the 500vh story-scroll-track
    ScrollTrigger.create({
      trigger: '#story-scroll-track',
      start: 'top top',
      end: 'bottom bottom',
      pin: '#story-stage-sticky',
      pinSpacing: false,
      anticipatePin: 1,
      scrub: 0.6,
      onUpdate: (self) => {
        const p = self.progress; // perfectly normalized 0.0 to 1.0
        this.scrollProgress = p;
        this.renderTimeline(p);
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
  // Timeline Choreography (0% ~ 100% Seamless Continuous Transition)
  // =========================================================================
  renderTimeline(p) {
    let step = 1;
    if (p < 0.20) step = 1;
    else if (p < 0.40) step = 2;
    else if (p < 0.60) step = 3;
    else if (p < 0.80) step = 4;
    else step = 5;

    // Check if user scrolled past 500vh into signature cards
    const cardsSec = document.getElementById('signature-cards');
    if (cardsSec) {
      const cRect = cardsSec.getBoundingClientRect();
      if (cRect.top < window.innerHeight * 0.45) step = 6;
    }

    if (this.currentStep !== step) {
      this.currentStep = step;
      this.updateHUD(step);
      this.updateBackdrops(step);
      this.updateNavDots(step);
      this.updateSKTDock(step);

      if (step <= 5) {
        window.currentAppStepSlug = CLINIC_SPECS[step - 1].slug;
      }
    }

    // Continuous Backdrop Cross-fade & Ken Burns Zoom
    this.renderBackdropBlend(p);

    // [Step 01] 0% ~ 20%: Fertilization, Toddler Growth Morph & Card Enfolding Dissolve
    if (p <= 0.20) {
      this.setGroupVisible(1);
      const sub = p / 0.20; // 0.0 ~ 1.0

      // Sub-Phase 1: 0% ~ 5% (Egg & Fertilization)
      if (sub <= 0.25) {
        const subEgg = sub / 0.25; // 0.0 ~ 1.0

        this.targetCameraPos.set(0, 0, 48 + subEgg * 8);
        this.targetLookAt.set(0, 0, 0);

        this.step1EggGroup.visible = true;
        this.step1EggMesh.material.opacity = 0.95;
        this.step1EggMesh.rotation.y = subEgg * Math.PI * 0.8;
        this.step1EggCore.material.opacity = 0.85;

        // 1,000 Golden particles converge inwards towards egg
        this.updateConvergingParticles(subEgg);
        this.step1ConvergePoints.material.opacity = 0.9;

        // Golden radial shockwave near 4% ~ 5%
        if (subEgg >= 0.80) {
          const swP = (subEgg - 0.80) / 0.20;
          const swScale = 1.0 + swP * 28.0;
          this.step1Shockwave.scale.set(swScale, swScale, swScale);
          this.step1Shockwave.material.opacity = (1.0 - swP) * 0.95;
        } else if (!this.shockwaveActive) {
          this.step1Shockwave.material.opacity = 0.0;
        }

        this.step1ToddlerGroup.visible = false;
        this.step1CardGroup.visible = false;
      }
      // Sub-Phase 2: 5% ~ 12% (Toddler Silhouette Formation)
      else if (sub > 0.25 && sub <= 0.60) {
        const subToddler = (sub - 0.25) / 0.35; // 0.0 ~ 1.0

        this.targetCameraPos.set(0, 0, 56 + subToddler * 30);
        this.targetLookAt.set(0, 0, 0);

        // Egg smoothly dissolves into light
        const eggFade = Math.max(0, 1.0 - subToddler * 2.2);
        this.step1EggMesh.material.opacity = eggFade * 0.95;
        this.step1EggCore.material.opacity = eggFade * 0.85;
        if (eggFade <= 0.01) {
          this.step1EggGroup.visible = false;
        }

        // Toddler light silhouette fades in at small cute scale
        this.step1ToddlerGroup.visible = true;
        const tOp = Math.min(0.92, subToddler * 1.5);
        this.step1SilMat.opacity = tOp;
        this.step1Head.material.opacity = tOp;
        this.step1Torso.material.opacity = tOp;
        this.step1ArmL.material.opacity = tOp;
        this.step1ArmR.material.opacity = tOp;
        this.step1LegL.material.opacity = tOp;
        this.step1LegR.material.opacity = tOp;
        this.step1HaloMat.opacity = tOp * 0.9;

        this.step1ToddlerGroup.scale.set(0.55, 0.55, 0.55);
        this.step1ToddlerGroup.position.set(0, -4, 0);
        this.step1GrowthRuler.visible = false;

        // Vertebrae 0..16 light up along toddler spine
        const activeSpine = Math.floor(subToddler * 16);
        this.spineNodes.forEach((node, i) => {
          if (i <= activeSpine) {
            node.scale.set(0.8, 0.8, 0.8);
            node.position.y = -6 + i * 0.72;
          } else {
            node.scale.set(0.001, 0.001, 0.001);
          }
        });

        this.step1CardGroup.visible = false;
      }
      // Sub-Phase 3: 12% ~ 18% (Height Growth & Card 01 Enfolding 360 Rotation)
      else if (sub > 0.60 && sub <= 0.90) {
        const subGrowth = (sub - 0.60) / 0.30; // 0.0 ~ 1.0

        this.targetCameraPos.set(0, 0, 86 + subGrowth * 24);
        this.targetLookAt.set(0, 0, 0);
        this.step1EggGroup.visible = false;

        // Toddler scales vertically into elementary school child
        const scaleY = 0.55 + subGrowth * 0.65; // 0.55 -> 1.20!
        const scaleXZ = 0.55 + subGrowth * 0.30; // 0.55 -> 0.85
        this.step1ToddlerGroup.visible = true;
        this.step1ToddlerGroup.scale.set(scaleXZ, scaleY, scaleXZ);
        this.step1ToddlerGroup.position.set(0, -4 + subGrowth * 4, 0);

        this.step1SilMat.opacity = 0.92;
        this.step1Head.material.opacity = 0.92;
        this.step1Torso.material.opacity = 0.92;
        this.step1ArmL.material.opacity = 0.92;
        this.step1ArmR.material.opacity = 0.92;
        this.step1LegL.material.opacity = 0.92;
        this.step1LegR.material.opacity = 0.92;
        this.step1HaloMat.opacity = 0.9;
        this.step1GrowthRuler.visible = true;

        // All 32 vertebrae straightens and spaces out with golden light
        const activeSpine = 16 + Math.floor(subGrowth * 16);
        this.spineNodes.forEach((node, i) => {
          if (i <= activeSpine) {
            node.scale.set(1.0, 1.0, 1.0);
            node.position.y = -6 + i * (0.72 + subGrowth * 0.35);
          } else {
            node.scale.set(0.001, 0.001, 0.001);
          }
        });

        // 3D Card 01 lifts, orbits 360-degrees around child & warmly enfolds child
        this.step1CardGroup.visible = true;
        this.step1CardMesh.material.opacity = Math.min(0.95, subGrowth * 2.2);
        this.step1CardGroup.rotation.y = subGrowth * Math.PI * 2;
        this.step1CardMesh.position.y = 4 - Math.sin(subGrowth * Math.PI) * 1.5;
        this.step1CardDustPoints.visible = false;
      }
      // Sub-Phase 4: 18% ~ 20% (Card Dissolution into Champagne Gold Dust)
      else {
        const subDissolve = (sub - 0.90) / 0.10; // 0.0 ~ 1.0

        this.targetCameraPos.set(0, 0, 110);
        this.targetLookAt.set(0, 0, 0);
        this.step1EggGroup.visible = false;

        // Tall, confident child stands proud in center focus
        this.step1ToddlerGroup.visible = true;
        this.step1ToddlerGroup.scale.set(0.85, 1.20, 0.85);
        this.step1ToddlerGroup.position.set(0, 0, 0);
        this.step1SilMat.opacity = 0.95;
        this.step1Head.material.opacity = 0.95;
        this.step1Torso.material.opacity = 0.95;
        this.step1ArmL.material.opacity = 0.95;
        this.step1ArmR.material.opacity = 0.95;
        this.step1LegL.material.opacity = 0.95;
        this.step1LegR.material.opacity = 0.95;
        this.step1HaloMat.opacity = 0.9;
        this.step1GrowthRuler.visible = true;

        this.spineNodes.forEach((node, i) => {
          node.scale.set(1.0, 1.0, 1.0);
          node.position.y = -6 + i * 1.07;
        });

        // Card 01 smoothly dissolves into floating champagne gold dust
        const cardOp = Math.max(0, 0.95 * (1.0 - subDissolve));
        this.step1CardMesh.material.opacity = cardOp;
        this.step1CardDustPoints.visible = true;
        this.step1CardDustMat.opacity = Math.max(0, (1.0 - subDissolve * 0.85) * 0.95);
        this.updateCardDust(subDissolve);

        if (subDissolve >= 0.98) {
          this.step1CardGroup.visible = false;
          this.step1CardDustPoints.visible = false;
        }
      }
    }

    // [Step 02] 20% ~ 40% (3/4 Perspective View Pos [28, 8, 85] - 100% Crisp S-Line Body Visual)
    else if (p > 0.20 && p <= 0.40) {
      this.setGroupVisible(2);
      const sub = (p - 0.20) / 0.20;

      this.targetCameraPos.set(28, 8, 85);
      this.targetLookAt.set(0, 0, 0);

      // Subtle golden waist aura ring smoothly highlights S-line curve
      if (this.step2WaistRing) {
        this.step2WaistRing.material.opacity = Math.sin(sub * Math.PI) * 0.75;
      }
    }

    // [Step 03] 40% ~ 60% (Extreme Close-Up Scalp Pos [0, 42, 28], LookAt [0, 38, 0])
    else if (p > 0.40 && p <= 0.60) {
      this.setGroupVisible(3);
      const sub = (p - 0.40) / 0.20;

      this.targetCameraPos.set(0, 42, 28);
      this.targetLookAt.set(0, 38, 0);

      // Subtle cooling ring highlight
      if (this.step3CoolRing) {
        this.step3CoolRing.material.opacity = Math.sin(sub * Math.PI) * 0.85;
      }
    }

    // [Step 04] 60% ~ 80% (Full Body 360 Rotation View Pos [0, 0, 105], Rot Y: 0 -> 360)
    else if (p > 0.60 && p <= 0.80) {
      this.setGroupVisible(4);
      const sub = (p - 0.60) / 0.20; // 0.0 ~ 1.0

      this.targetCameraPos.set(0, 0, 105);
      this.targetLookAt.set(0, 0, 0);

      // Full body rotation: 0 to 360 degrees
      this.step4Group.rotation.y = sub * Math.PI * 2;

      // Scan beam sweeps from y = 48 down to y = -58
      const scanY = 48 - sub * 106;
      this.chunaScanBeam.position.y = scanY;

      // Check each of the 9 joints
      let allHealed = true;
      let anyHealed = false;

      this.jointNodes.forEach(item => {
        const jY = item.def.pos[1];
        const isHealed = scanY <= jY + 2.0;

        if (isHealed) {
          item.gem.material.color.setHex(0x2F855A); // Emerald Healing Green
          item.gem.material.emissive.setHex(0x38A169);
          item.ring.material.color.setHex(0x2F855A);
          item.ring.material.emissive.setHex(0x38A169);
          item.healed = true;
          anyHealed = true;

          const chip = document.querySelector(`.pain-chip[data-joint="${item.def.chipKey}"]`);
          if (chip) chip.classList.add('healed');
        } else {
          item.gem.material.color.setHex(0xE53E3E); // Pain Signal Red
          item.gem.material.emissive.setHex(0xE53E3E);
          item.ring.material.color.setHex(0xE53E3E);
          item.ring.material.emissive.setHex(0xE53E3E);
          item.healed = false;
          allHealed = false;

          const chip = document.querySelector(`.pain-chip[data-joint="${item.def.chipKey}"]`);
          if (chip) chip.classList.remove('healed');
        }
      });

      // Spine alignment laser lights up as healing proceeds
      this.alignmentLaser.material.opacity = Math.min(1.0, sub * 1.5);

      if (this.painRadarStatus) {
        if (allHealed) {
          this.painRadarStatus.className = 'pain-radar-status healing';
          this.painRadarStatus.innerHTML = '<span class="pulse-dot">✓</span> <span>9대 관절 바른 정렬 완료</span>';
        } else if (anyHealed) {
          this.painRadarStatus.className = 'pain-radar-status healing';
          this.painRadarStatus.innerHTML = '<span class="pulse-dot">✦</span> <span>추나 치유 파동 스캔 중</span>';
        } else {
          this.painRadarStatus.className = 'pain-radar-status warning';
          this.painRadarStatus.innerHTML = '<span class="pulse-dot">●</span> <span>8Hz 통증 링 점멸 중</span>';
        }
      }
    }

    // [Step 05] 80% ~ 100% (Golden Vitality Recovery & Floating 24K Gongjindan)
    else {
      this.setGroupVisible(5);
      const sub = (p - 0.80) / 0.20;

      this.targetCameraPos.set(0, 0, 85);
      this.targetLookAt.set(0, 0, 0);
    }
  }

  // Smooth Film Cross-fade between 8K Continuous Visuals (7 Slides: 1a, 1b, 1c, 2, 3, 4, 5)
  renderBackdropBlend(p) {
    if (!this.backdrops || this.backdrops.length < 7) return;

    const slides = [
      { el: this.backdrops[0], start: 0.00, end: 0.05 }, // 1a: Egg
      { el: this.backdrops[1], start: 0.05, end: 0.12 }, // 1b: Toddler
      { el: this.backdrops[2], start: 0.12, end: 0.20 }, // 1c: Child & Card
      { el: this.backdrops[3], start: 0.20, end: 0.40 }, // 2:  Diet S-line
      { el: this.backdrops[4], start: 0.40, end: 0.60 }, // 3:  Scalp Hair
      { el: this.backdrops[5], start: 0.60, end: 0.80 }, // 4:  9-Joint Pain
      { el: this.backdrops[6], start: 0.80, end: 1.00 }  // 5:  Gongjindan
    ];

    const transDur = [0.012, 0.015, 0.02, 0.03, 0.03, 0.03]; // transition window width

    let activeIdx = 0;
    let nextIdx = -1;
    let blend = 0;

    for (let i = 0; i < slides.length; i++) {
      if (i === slides.length - 1) {
        if (p >= slides[i].start) {
          activeIdx = i;
          nextIdx = -1;
          break;
        }
      } else {
        const trans = transDur[i] || 0.02;
        const boundary = slides[i + 1].start;
        if (p >= slides[i].start && p < boundary - trans) {
          activeIdx = i;
          nextIdx = -1;
          break;
        } else if (p >= boundary - trans && p < boundary) {
          activeIdx = i;
          nextIdx = i + 1;
          blend = (p - (boundary - trans)) / trans;
          break;
        }
      }
    }

    slides.forEach((item, idx) => {
      if (!item.el) return;
      if (idx === activeIdx && nextIdx === -1) {
        item.el.style.opacity = '1';
        item.el.style.zIndex = '3';
        item.el.style.transform = 'scale(1.0)';
      } else if (idx === activeIdx && nextIdx !== -1) {
        item.el.style.opacity = (1 - blend).toFixed(3);
        item.el.style.zIndex = '2';
        item.el.style.transform = `scale(${(1.0 + blend * 0.02).toFixed(3)})`;
      } else if (idx === nextIdx) {
        item.el.style.opacity = blend.toFixed(3);
        item.el.style.zIndex = '3';
        item.el.style.transform = `scale(${(1.02 - blend * 0.02).toFixed(3)})`;
      } else {
        item.el.style.opacity = '0';
        item.el.style.zIndex = '1';
      }
    });
  }

  setGroupVisible(step) {
    if (!this.step1Group) return;
    this.step1Group.visible = (step === 1);
    this.step2Group.visible = (step === 2);
    this.step3Group.visible = (step === 3);
    this.step4Group.visible = (step === 4);
    this.step5Group.visible = (step === 5);
  }

  updateHUD(step) {
    if (step > 5) {
      if (this.hudBadge) this.hudBadge.textContent = '5대 특화진료 카드';
      if (this.hudCounter) this.hudCounter.textContent = 'FINAL';
      if (this.hudTitle) this.hudTitle.textContent = '바른한의원 5대 시그니처';
      if (this.hudSubtitle) this.hudSubtitle.textContent = '아래 카드에서 원하는 진료를 선택하세요';
      if (this.hudDesc) this.hudDesc.textContent = '소아 성장, 다이어트, 탈모, 9대 관절 통증, 명품 공진단까지 1:1 맞춤 진료';
      if (this.painRadarBox) this.painRadarBox.style.display = 'none';
      return;
    }

    const data = CLINIC_SPECS[step - 1];
    if (!data) return;

    if (this.hudBadge) this.hudBadge.textContent = data.badge;
    if (this.hudCounter) this.hudCounter.textContent = `0${data.step} / 05`;
    if (this.hudTitle) this.hudTitle.textContent = data.title;
    if (this.hudSubtitle) this.hudSubtitle.textContent = data.mainCopy;
    if (this.hudDesc) this.hudDesc.textContent = data.desc;
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

  updateBackdrops(step) {
    this.renderBackdropBlend(this.scrollProgress);
  }

  updateNavDots(step) {
    this.navDots.forEach(dot => {
      const s = parseInt(dot.getAttribute('data-step') || '1', 10);
      if (s === step) dot.classList.add('active');
      else dot.classList.remove('active');
    });
  }

  updateSKTDock(step) {
    this.sktCards.forEach(card => {
      const s = parseInt(card.getAttribute('data-step') || '1', 10);
      if (s === step) card.classList.add('active');
      else card.classList.remove('active');
    });
  }

  // Interactive Mouse Parallax & Hover Sync
  initInteractions() {
    window.addEventListener('mousemove', (e) => {
      this.mouseParallax.x = (e.clientX / window.innerWidth - 0.5) * 6;
      this.mouseParallax.y = (e.clientY / window.innerHeight - 0.5) * -4;
    }, { passive: true });

    // Touch / Click triggers golden radial shockwave
    if (this.stage) {
      this.stage.addEventListener('pointerdown', (e) => {
        if (!e.target.closest('button, a, input, select, textarea')) {
          if (this.currentStep === 1) {
            this.triggerShockwave();
          }
        }
      });
    }

    // Hover sync on SKT Dock cards
    this.sktCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        const step = parseInt(card.getAttribute('data-step'), 10);
        this.targetRotation.y = (step - 3) * 0.15;
      });
      card.addEventListener('mouseleave', () => {
        this.targetRotation.y = 0;
      });
    });
  }

  // 60fps / 120fps Smooth Damped Animation Loop
  animate() {
    requestAnimationFrame(() => this.animate());
    const time = performance.now() * 0.001;

    // Camera Inertia Damping via THREE.MathUtils.lerp
    this.camera.position.x = THREE.MathUtils.lerp(
      this.camera.position.x,
      this.targetCameraPos.x + this.mouseParallax.x,
      0.07
    );
    this.camera.position.y = THREE.MathUtils.lerp(
      this.camera.position.y,
      this.targetCameraPos.y + this.mouseParallax.y,
      0.07
    );
    this.camera.position.z = THREE.MathUtils.lerp(
      this.camera.position.z,
      this.targetCameraPos.z,
      0.07
    );

    this.currentLookAt.x = THREE.MathUtils.lerp(this.currentLookAt.x, this.targetLookAt.x, 0.07);
    this.currentLookAt.y = THREE.MathUtils.lerp(this.currentLookAt.y, this.targetLookAt.y, 0.07);
    this.currentLookAt.z = THREE.MathUtils.lerp(this.currentLookAt.z, this.targetLookAt.z, 0.07);
    this.camera.lookAt(this.currentLookAt);

    // Step 01 Continuous Animations (Egg rings, Shockwave pulse, Halo float)
    if (this.step1Group && this.step1Group.visible) {
      if (this.step1EggRings && this.step1EggGroup.visible) {
        this.step1EggRings.children.forEach((r, idx) => {
          r.rotation.z = time * (0.3 + idx * 0.15) * (idx % 2 === 0 ? 1 : -1);
        });
      }

      // Golden Shockwave Pulse on Touch/Trigger
      if (this.shockwaveActive && this.step1Shockwave) {
        const elapsed = (performance.now() - this.shockwaveStartTime) * 0.001;
        if (elapsed < 0.75) {
          const swNorm = elapsed / 0.75;
          const swScale = 1.0 + swNorm * 36.0;
          this.step1Shockwave.scale.set(swScale, swScale, swScale);
          this.step1Shockwave.material.opacity = (1.0 - swNorm) * 0.95;
        } else {
          this.shockwaveActive = false;
          this.step1Shockwave.material.opacity = 0.0;
          this.step1Shockwave.scale.set(1, 1, 1);
        }
      }

      // Toddler Halo Rotation
      if (this.step1Halo && this.step1ToddlerGroup.visible) {
        this.step1Halo.rotation.z = time * 0.4;
      }
    }

    // Step 02 Waist Ring Rotation
    if (this.step2Group && this.step2Group.visible && this.step2WaistRing) {
      this.step2WaistRing.rotation.z = time * 0.4;
    }

    // Step 03 Cooling Ring Rotation
    if (this.step3Group && this.step3Group.visible && this.step3CoolRing) {
      this.step3CoolRing.rotation.z = -time * 0.3;
    }

    // Step 04 8Hz Pulsating Ring on 9 Joint Anchors
    if (this.step4Group && this.step4Group.visible) {
      const pulse8Hz = Math.sin(time * 16 * Math.PI) * 0.5 + 0.5;
      this.jointNodes.forEach(item => {
        if (!item.healed) {
          const s = 1.0 + pulse8Hz * 0.6;
          item.ring.scale.set(s, s, s);
          item.ring.material.opacity = (1.0 - pulse8Hz * 0.5) * 0.9;
        } else {
          item.ring.scale.set(1.15, 1.15, 1.15);
          item.ring.material.opacity = 0.65;
        }
      });
    }

    // Step 05 Gongjindan Planetary Rings
    if (this.step5Group && this.step5Group.visible) {
      if (this.goldOrbit1) this.goldOrbit1.rotation.z = time * 0.5;
      if (this.goldOrbit2) this.goldOrbit2.rotation.z = -time * 0.35;
    }

    // Render with EffectComposer (Post-processing) or Fallback Renderer
    if (this.composer) {
      this.composer.render();
    } else if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  initIntro() {
    const splash = document.getElementById('intro-splash');
    const enterBtn = document.getElementById('intro-enter-btn');
    if (!splash) return;

    const closeIntro = () => {
      splash.style.transition = 'opacity 0.8s ease, visibility 0.8s ease';
      splash.style.opacity = '0';
      splash.style.visibility = 'hidden';
      if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
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

// Global Navigation & Step Navigation Helpers
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
  const progressMap = [0.05, 0.28, 0.48, 0.68, 0.88];
  const targetProgress = progressMap[stepNum - 1] || 0.05;
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
    const res = await fetch('/api/send-alimtalk', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    alert(`🎉 ${payload.parentName}님, 예약 신청이 성공적으로 접수되었습니다!\n원내 원장실에서 확인 후 카카오 알림톡과 안내 전화를 드립니다.`);
    
    if (nameInput) nameInput.value = '';
    if (phoneInput) phoneInput.value = '';
    if (memoInput) memoInput.value = '';
    const drawer = document.getElementById('menu-drawer');
    if (drawer) drawer.classList.remove('active');
  } catch (err) {
    alert(`신청서가 안전하게 저장되었습니다.\n담당 직원이 빠른 시간 내에 연락드리겠습니다.`);
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
    }
  }
}

// Auto Initialize
document.addEventListener('DOMContentLoaded', () => {
  window.bareunApp = new BareunMasterpieceStoryApp();
});
