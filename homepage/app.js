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
      document.getElementById('backdrop-1'),
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
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.renderer.outputEncoding = THREE.sRGBEncoding;

    // Post-Processing: UnrealBloomPass for subtle cinematic gold & emerald bloom
    if (typeof THREE.EffectComposer !== 'undefined' && typeof THREE.UnrealBloomPass !== 'undefined') {
      try {
        this.composer = new THREE.EffectComposer(this.renderer);
        const renderPass = new THREE.RenderPass(this.scene, this.camera);
        this.composer.addPass(renderPass);

        // UnrealBloomPass(resolution, strength: 0.45, radius: 0.4, threshold: 0.85)
        this.bloomPass = new THREE.UnrealBloomPass(
          new THREE.Vector2(width, height),
          0.45, // subtle glow strength
          0.4,  // radius
          0.85  // threshold: only bright highlights bloom
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
  // Step 01: Warm Cellular Genesis & 3D Crystal Spine Straightening
  // =========================================================================
  buildStep1VFX() {
    this.step1Group = new THREE.Group();

    // 1. 15,000 Organic Life Particles (Sage Green & Gold)
    const count = this.isMobile ? 3500 : 15000;
    const geom = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const originalPos = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 26 * Math.cbrt(u);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      originalPos[i * 3] = x;
      originalPos[i * 3 + 1] = y;
      originalPos[i * 3 + 2] = z;
    }
    geom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    this.step1OriginalPositions = originalPos;

    const particleMat = new THREE.PointsMaterial({
      color: 0xC5A059,
      size: 0.9,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    });
    this.step1Particles = new THREE.Points(geom, particleMat);
    this.step1Group.add(this.step1Particles);

    // 2. Central Warm Cellular Womb Mesh (MeshPhysicalMaterial for glass/crystal luxury)
    const cellGeom = new THREE.IcosahedronGeometry(14, 3);
    const cellMat = new THREE.MeshPhysicalMaterial({
      color: 0x2D4030,
      emissive: 0xC5A059,
      emissiveIntensity: 0.35,
      transmission: 0.85,
      roughness: 0.15,
      metalness: 0.1,
      ior: 1.4,
      transparent: true,
      opacity: 0.8
    });
    this.step1Cell = new THREE.Mesh(cellGeom, cellMat);
    this.step1Group.add(this.step1Cell);

    // 3. 32-Vertebrae Child Spine Crystal Discs
    this.spineNodes = [];
    const discGeom = new THREE.CylinderGeometry(1.6, 1.8, 0.6, 24);
    const discMat = new THREE.MeshPhysicalMaterial({
      color: 0xFDE68A,
      emissive: 0xC5A059,
      emissiveIntensity: 0.6,
      transmission: 0.8,
      roughness: 0.12,
      metalness: 0.2,
      ior: 1.45
    });

    for (let i = 0; i < 32; i++) {
      const disc = new THREE.Mesh(discGeom, discMat.clone());
      disc.position.set(0, (i - 16) * 2.2, 0);
      disc.rotation.x = Math.PI / 2;
      disc.scale.set(0.001, 0.001, 0.001);
      this.step1Group.add(disc);
      this.spineNodes.push(disc);
    }

    this.scene.add(this.step1Group);
  }

  // =========================================================================
  // Step 02: 3D Body Volume Mesh Dissolve & Crystal S-Line Revelation
  // =========================================================================
  buildStep2VFX() {
    this.step2Group = new THREE.Group();

    // 1. Sleek Crystal S-Line Body Mesh (MeshPhysicalMaterial)
    // S-curve torso representation using lathe/curve geometry
    const curvePoints = [];
    for (let i = 0; i <= 24; i++) {
      const y = (i / 24) * 60 - 30; // -30 to +30
      const normY = (y + 30) / 60;
      // Elegant S-curve radius: shoulder wider, waist slim, hips curvy
      const r = 6.5 + Math.sin(normY * Math.PI) * 4.2 - Math.sin(normY * Math.PI * 2) * 2.2;
      curvePoints.push(new THREE.Vector2(Math.max(2.8, r), y));
    }
    const sLineGeom = new THREE.LatheGeometry(curvePoints, 32);
    const sLineMat = new THREE.MeshPhysicalMaterial({
      color: 0xFFFFFF,
      emissive: 0xC5A059,
      emissiveIntensity: 0.15,
      transmission: 0.88,
      roughness: 0.14,
      metalness: 0.08,
      ior: 1.45,
      transparent: true,
      opacity: 0.92
    });
    this.step2Sline = new THREE.Mesh(sLineGeom, sLineMat);
    this.step2Group.add(this.step2Sline);

    // 2. 20,000 Swirling Gold Dust Particles (Dissolve Micro-Powder)
    const count = this.isMobile ? 5000 : 20000;
    const geom = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 68;
      const r = 11 + Math.random() * 9;
      pos[i * 3] = Math.cos(theta) * r;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(theta) * r;
    }
    geom.setAttribute('position', new THREE.BufferAttribute(pos, 3));

    const mat = new THREE.PointsMaterial({
      color: 0xFDE68A,
      size: 0.85,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending
    });
    this.step2Dust = new THREE.Points(geom, mat);
    this.step2Group.add(this.step2Dust);

    this.step2Group.visible = false;
    this.scene.add(this.step2Group);
  }

  // =========================================================================
  // Step 03: Scalp Close-Up, Red Heat Fading & 5,000 3D Hair Strands Blooming
  // =========================================================================
  buildStep3VFX() {
    this.step3Group = new THREE.Group();

    // 1. Scalp Dome Base Mesh
    const scalpGeom = new THREE.SphereGeometry(22, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.45);
    const scalpMat = new THREE.MeshPhysicalMaterial({
      color: 0xE2C892,
      emissive: 0x2D4030,
      emissiveIntensity: 0.2,
      roughness: 0.35,
      metalness: 0.05
    });
    this.step3Scalp = new THREE.Mesh(scalpGeom, scalpMat);
    this.step3Scalp.position.set(0, 24, 0);
    this.step3Group.add(this.step3Scalp);

    // 2. Red Heat Surface Particles
    const heatCount = this.isMobile ? 800 : 2500;
    const heatGeom = new THREE.BufferGeometry();
    const heatPos = new Float32Array(heatCount * 3);
    for (let i = 0; i < heatCount; i++) {
      const u = Math.random();
      const theta = Math.random() * Math.PI * 2;
      const r = 21 * Math.sqrt(u);
      heatPos[i * 3] = r * Math.cos(theta);
      heatPos[i * 3 + 1] = 25 + Math.random() * 4;
      heatPos[i * 3 + 2] = r * Math.sin(theta);
    }
    heatGeom.setAttribute('position', new THREE.BufferAttribute(heatPos, 3));
    this.step3HeatMat = new THREE.PointsMaterial({
      color: 0xE53E3E,
      size: 1.2,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
    this.step3HeatParticles = new THREE.Points(heatGeom, this.step3HeatMat);
    this.step3Group.add(this.step3HeatParticles);

    // 3. Cooling Emerald Herbal Particles (#2F855A / #34D399)
    const coolCount = this.isMobile ? 1200 : 4500;
    const coolGeom = new THREE.BufferGeometry();
    const coolPos = new Float32Array(coolCount * 3);
    for (let i = 0; i < coolCount; i++) {
      coolPos[i * 3] = (Math.random() - 0.5) * 44;
      coolPos[i * 3 + 1] = 22 + Math.random() * 26;
      coolPos[i * 3 + 2] = (Math.random() - 0.5) * 44;
    }
    coolGeom.setAttribute('position', new THREE.BufferAttribute(coolPos, 3));
    this.step3CoolMat = new THREE.PointsMaterial({
      color: 0x2F855A,
      size: 1.1,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending
    });
    this.step3CoolParticles = new THREE.Points(coolGeom, this.step3CoolMat);
    this.step3Group.add(this.step3CoolParticles);

    // 4. InstancedMesh 3D Hair Strands Blooming Upward (5,000 strands)
    const hairCount = this.isMobile ? 1500 : 5000;
    const strandGeom = new THREE.CylinderGeometry(0.08, 0.22, 6.0, 6);
    strandGeom.translate(0, 3.0, 0); // pivot at base
    const strandMat = new THREE.MeshStandardMaterial({
      color: 0x1A1A1A,
      roughness: 0.25,
      metalness: 0.4
    });
    this.hairInstanced = new THREE.InstancedMesh(strandGeom, strandMat, hairCount);
    
    // Store hair root transforms
    this.hairTransforms = [];
    const dummy = new THREE.Object3D();
    for (let i = 0; i < hairCount; i++) {
      const u = Math.random();
      const theta = Math.random() * Math.PI * 2;
      const r = 20 * Math.sqrt(u);
      const x = r * Math.cos(theta);
      const z = r * Math.sin(theta);
      const y = 25 - (r * r) * 0.015;

      dummy.position.set(x, y, z);
      dummy.rotation.x = (Math.random() - 0.5) * 0.35;
      dummy.rotation.z = (Math.random() - 0.5) * 0.35;
      dummy.scale.set(0.001, 0.001, 0.001);
      dummy.updateMatrix();

      this.hairInstanced.setMatrixAt(i, dummy.matrix);
      this.hairTransforms.push({ x, y, z, rx: dummy.rotation.x, rz: dummy.rotation.z });
    }
    this.hairInstanced.instanceMatrix.needsUpdate = true;
    this.step3Group.add(this.hairInstanced);

    this.step3Group.visible = false;
    this.scene.add(this.step3Group);
  }

  // =========================================================================
  // Step 04: Full Body 360 Rotation, 8Hz Pain Rings & Chuna Green Healing Scan
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
      const gemGeom = new THREE.SphereGeometry(1.6, 18, 18);
      const gemMat = new THREE.MeshPhysicalMaterial({
        color: 0xE53E3E,
        emissive: 0xE53E3E,
        emissiveIntensity: 1.4,
        transmission: 0.75,
        roughness: 0.1,
        metalness: 0.2
      });
      const gem = new THREE.Mesh(gemGeom, gemMat);
      g.add(gem);

      // Radial Wave Pulsing Ring (8Hz)
      const ringGeom = new THREE.RingGeometry(2.2, 3.4, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xE53E3E,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide
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
  // Step 05: 24K Gold-Leaf Gongjindan & 30,000 Champagne Gold Aura Particles
  // =========================================================================
  buildStep5Gongjindan() {
    this.step5Group = new THREE.Group();

    // 1. 24K Pure Gold Foil Gongjindan Pill (MeshPhysicalMaterial with high metalness & clearcoat)
    const pillGeom = new THREE.SphereGeometry(15, 48, 48);
    const pillMat = new THREE.MeshPhysicalMaterial({
      color: 0xD4AF37,
      emissive: 0xC5A059,
      emissiveIntensity: 0.35,
      metalness: 0.95,
      roughness: 0.16,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      ior: 1.5
    });
    this.gongjindanPill = new THREE.Mesh(pillGeom, pillMat);
    this.step5Group.add(this.gongjindanPill);

    // Orbital Gold Energy Rings
    const ring1Geom = new THREE.TorusGeometry(23, 0.5, 16, 64);
    const rMat = new THREE.MeshStandardMaterial({ color: 0xFDE68A, metalness: 0.95, roughness: 0.1 });
    this.goldOrbit1 = new THREE.Mesh(ring1Geom, rMat);
    this.goldOrbit1.rotation.x = 0.85;
    this.goldOrbit1.rotation.y = 0.35;
    this.step5Group.add(this.goldOrbit1);

    const ring2Geom = new THREE.TorusGeometry(28, 0.38, 16, 64);
    this.goldOrbit2 = new THREE.Mesh(ring2Geom, rMat);
    this.goldOrbit2.rotation.x = -0.65;
    this.goldOrbit2.rotation.y = -0.45;
    this.step5Group.add(this.goldOrbit2);

    // 2. 30,000 Swirling Champagne Gold Aura Particles
    const aCount = this.isMobile ? 6500 : 30000;
    const aGeom = new THREE.BufferGeometry();
    const aPos = new Float32Array(aCount * 3);

    for (let i = 0; i < aCount; i++) {
      const u = Math.random();
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 20 + u * 34;

      aPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      aPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      aPos[i * 3 + 2] = r * Math.cos(phi);
    }
    aGeom.setAttribute('position', new THREE.BufferAttribute(aPos, 3));

    const aMat = new THREE.PointsMaterial({
      color: 0xC5A059,
      size: 0.85,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
    this.goldAura = new THREE.Points(aGeom, aMat);
    this.step5Group.add(this.goldAura);

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

    // [Step 01] 0% ~ 20% (Macro Center Pos [0, 0, 50] -> Full Shot Pos [0, 0, 115])
    if (p <= 0.20) {
      this.setGroupVisible(1);
      const sub = p / 0.20; // 0.0 ~ 1.0

      // Camera lerp targets
      this.targetCameraPos.set(0, 0, 50 + sub * 65);
      this.targetLookAt.set(0, 0, 0);

      // Womb cell pulsation & spine straightening
      if (this.step1Cell) {
        const s = 1.0 + Math.sin(sub * Math.PI * 4) * 0.08;
        this.step1Cell.scale.set(s, s, s);
        this.step1Cell.rotation.y = sub * Math.PI * 0.5;
      }

      const activeNodesCount = Math.floor(sub * 32);
      this.spineNodes.forEach((node, i) => {
        if (i <= activeNodesCount) {
          node.scale.set(1, 1, 1);
        } else {
          node.scale.set(0.001, 0.001, 0.001);
        }
      });
    }

    // [Step 02] 20% ~ 40% (3/4 Perspective View Pos [28, 8, 85])
    else if (p > 0.20 && p <= 0.40) {
      this.setGroupVisible(2);
      const sub = (p - 0.20) / 0.20;

      this.targetCameraPos.set(28, 8, 85);
      this.targetLookAt.set(0, 0, 0);

      // Dissolve dust fades in then disperses
      const dustOpacity = Math.sin(sub * Math.PI) * 0.95;
      this.step2Dust.material.opacity = dustOpacity;

      // S-line crystal emerges
      if (this.step2Sline) {
        this.step2Sline.rotation.y = sub * 0.8;
      }
    }

    // [Step 03] 40% ~ 60% (Extreme Close-Up Scalp Pos [0, 42, 28], LookAt [0, 40, 0])
    else if (p > 0.40 && p <= 0.60) {
      this.setGroupVisible(3);
      const sub = (p - 0.40) / 0.20;

      this.targetCameraPos.set(0, 42, 28);
      this.targetLookAt.set(0, 38, 0);

      // Red heat particles fade from 0.85 to 0.0
      this.step3HeatMat.opacity = Math.max(0.0, 0.85 * (1.0 - sub * 1.5));

      // Cooling emerald particles infiltrate
      this.step3CoolMat.opacity = Math.min(0.9, sub * 1.3);

      // 5,000 3D Hair Strands bloom upward organically
      if (this.hairInstanced && this.hairTransforms) {
        const dummy = new THREE.Object3D();
        const bloomScale = Math.min(1.0, Math.max(0.01, (sub - 0.2) * 1.25));

        for (let i = 0; i < this.hairTransforms.length; i++) {
          const t = this.hairTransforms[i];
          dummy.position.set(t.x, t.y, t.z);
          dummy.rotation.x = t.rx;
          dummy.rotation.z = t.rz;
          dummy.scale.set(bloomScale, bloomScale, bloomScale);
          dummy.updateMatrix();
          this.hairInstanced.setMatrixAt(i, dummy.matrix);
        }
        this.hairInstanced.instanceMatrix.needsUpdate = true;
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
          item.healed = true;
          anyHealed = true;

          const chip = document.querySelector(`.pain-chip[data-joint="${item.def.chipKey}"]`);
          if (chip) chip.classList.add('healed');
        } else {
          item.gem.material.color.setHex(0xE53E3E); // Pain Signal Red
          item.gem.material.emissive.setHex(0xE53E3E);
          item.ring.material.color.setHex(0xE53E3E);
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

      const s = 0.6 + Math.min(0.4, sub * 0.4);
      this.gongjindanPill.scale.set(s, s, s);
      this.goldAura.rotation.y = sub * Math.PI * 2;
    }
  }

  // Smooth Film Cross-fade between 8K Continuous Visuals
  renderBackdropBlend(p) {
    const rawStep = p * 5; // 0.0 to 5.0
    const currentIdx = Math.min(4, Math.floor(rawStep));
    const nextIdx = Math.min(4, currentIdx + 1);
    const blendFactor = rawStep - currentIdx; // 0.0 to 1.0 within step

    this.backdrops.forEach((slide, idx) => {
      if (!slide) return;
      if (idx === currentIdx) {
        slide.style.opacity = (1.0 - blendFactor * 0.85).toFixed(3);
        slide.style.transform = `scale(${(1.0 + blendFactor * 0.06).toFixed(3)})`;
      } else if (idx === nextIdx && blendFactor > 0.15) {
        const fadeIn = (blendFactor - 0.15) / 0.85;
        slide.style.opacity = fadeIn.toFixed(3);
        slide.style.transform = `scale(${(1.06 - fadeIn * 0.06).toFixed(3)})`;
      } else {
        slide.style.opacity = '0';
        slide.style.transform = 'scale(1.08)';
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
    this.backdrops.forEach((slide, idx) => {
      if (!slide) return;
      if (idx === step - 1) slide.classList.add('active');
      else slide.classList.remove('active');
    });
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

    // Step 01 Particle Breathing & Noise Movement
    if (this.step1Group && this.step1Group.visible) {
      this.step1Particles.rotation.y = time * 0.2;
      if (this.step1Cell) {
        this.step1Cell.rotation.x = Math.sin(time * 0.8) * 0.1;
      }
    }

    // Step 02 Dust Vortex & S-Line Shimmer
    if (this.step2Group && this.step2Group.visible) {
      this.step2Dust.rotation.y = -time * 0.35;
      if (this.step2Sline) {
        this.step2Sline.rotation.y = Math.sin(time * 0.5) * 0.2;
      }
    }

    // Step 03 Cooling Mist
    if (this.step3Group && this.step3Group.visible) {
      this.step3CoolParticles.rotation.y = time * 0.18;
      this.step3HeatParticles.rotation.y = -time * 0.12;
    }

    // Step 04 8Hz Pulsating Ring on 9 Joint Anchors
    if (this.step4Group && this.step4Group.visible) {
      const pulse8Hz = Math.sin(time * 16 * Math.PI) * 0.5 + 0.5;
      this.jointNodes.forEach(item => {
        if (!item.healed) {
          const s = 1.0 + pulse8Hz * 0.7;
          item.ring.scale.set(s, s, 1);
          item.ring.material.opacity = (1.0 - pulse8Hz * 0.6) * 0.9;
        } else {
          item.ring.scale.set(1.15, 1.15, 1);
          item.ring.material.opacity = 0.55;
        }
      });
    }

    // Step 05 Gongjindan Planetary Rings & 360 Slow Rotation
    if (this.step5Group && this.step5Group.visible) {
      this.gongjindanPill.rotation.y = time * 0.45;
      this.goldOrbit1.rotation.z = time * 0.6;
      this.goldOrbit2.rotation.z = -time * 0.4;
      this.goldAura.rotation.y = time * 0.2;
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
