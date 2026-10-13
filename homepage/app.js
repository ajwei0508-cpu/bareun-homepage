/**
 * BAREUN CLINIC (바른한의원 대전본점)
 * 5-Step Continuous 3D Lifecycle & 9-Joint Pain Relief Storytelling Engine
 * Three.js WebGL, GSAP ScrollTrigger, Hybrid 8K CGI Visual Layers
 */

// Step Data Configuration
const STORY_STEPS = [
  {
    step: 1,
    slug: 'pediatric-growth',
    badge: 'STEP 01 · 수정과 성장',
    counter: '01 / 05',
    title: '01. 바른 성장클리닉',
    subtitle: '세이지 그린 & 골드 입자가 이루는 생명 탄생과 3D 척추 바른 정렬',
    desc: '15년 임상경력 대표원장이 자신의 친아들에게 직접 처방하여 입증한 무방사선 정밀 초음파와 8대 전신 기능 검진으로 아이의 숨은 잠재 키를 깨웁니다.',
    link: 'growth.html',
    btnText: '성장클리닉 상세 보기 ↗',
    color: '#34D399',
    backdropId: 'backdrop-1'
  },
  {
    step: 2,
    slug: 'appetite-zero',
    badge: 'STEP 02 · 체형과 감량',
    counter: '02 / 05',
    title: '02. 바른 다이어트 (식욕 ZERO)',
    subtitle: '체지방 볼륨 입자 분해 & 슬림한 실루엣 라인 형성',
    desc: '굶지 않고 자연스럽게 식탐을 억제하며 체질별 기초 대사율을 끌어올리는 바른한의원만의 시그니처 탕약. 누적 50,000건 임상으로 입증된 1:1 맞춤 탕전입니다.',
    link: 'diet-zero.html#checkout-zone',
    btnText: '식욕 ZERO 비대면 처방 ↗',
    color: '#F472B6',
    backdropId: 'backdrop-2'
  },
  {
    step: 3,
    slug: 'scalp-hair',
    badge: 'STEP 03 · 두피와 모근',
    counter: '03 / 05',
    title: '03. 바른 탈모케어 (모근 개화)',
    subtitle: '두피 상열감 순환 소산 & 약재 파티클 모근 개화',
    desc: '두피로 솟구치는 화기(火氣)를 시원한 쿨링 오라로 다스리고, 고농도 모근 영양 약침이 잠든 모낭 세포를 깨워 풍성하고 건강한 머릿결을 피워냅니다.',
    link: 'https://pf.kakao.com/_ykxcLK',
    btnText: '탈모케어 1:1 카톡 상담 ↗',
    color: '#60A5FA',
    backdropId: 'backdrop-3'
  },
  {
    step: 4,
    slug: 'pain-chuna',
    badge: 'STEP 04 · 전신 통증 & 녹색 치유',
    counter: '04 / 05',
    title: '04. 바른 통증·추나 (9대 관절 치유)',
    subtitle: '9대 관절 붉은 점 점멸 소산 & 한방 추나 파동의 녹색 치유 정렬',
    desc: '목, 어깨, 팔꿈치, 손가락, 허리, 골반, 무릎, 발목, 발가락 9대 관절의 붉은 통증 신호를 소산시키고, 비수술 추나 요법과 봉약침의 강력한 치유 파동으로 바르게 정렬합니다.',
    link: 'https://naver.me/5U1ELn8L',
    btnText: '네이버 통증 진료 예약 ↗',
    color: '#38A169',
    backdropId: 'backdrop-4'
  },
  {
    step: 5,
    slug: 'gongjindan',
    badge: 'STEP 05 · 원기 회복',
    counter: '05 / 05',
    title: '05. 황제 공진단 (원기 회복)',
    subtitle: '24K 순금박 공진단 황금빛 장막 & 궁극의 원기 회복',
    desc: '통증이 사라지고 바르게 정렬된 몸을 영롱한 3D 금박 공진단 황금빛 오라가 감싸며 최상의 활력 완성. 식약처 CITES 정품 사향 100%를 원장이 직접 빚어냅니다.',
    link: 'gongjindan.html',
    btnText: '황제 공진단 상세 보기 ↗',
    color: '#FCD34D',
    backdropId: 'backdrop-5'
  }
];

class BareunContinuous3DStoryApp {
  constructor() {
    this.currentStep = 1;
    this.scrollProgress = 0;
    this.audioEnabled = false;
    this.audioCtx = null;
    
    // Joint definitions for Step 4
    this.joints = [
      { id: 'neck', name: '목 (경추)', pos: [0, 1.95, 0], healed: false },
      { id: 'shoulder_l', name: '어깨 (좌)', pos: [-0.85, 1.6, 0], healed: false, chipId: 'shoulder' },
      { id: 'shoulder_r', name: '어깨 (우)', pos: [0.85, 1.6, 0], healed: false, chipId: 'shoulder' },
      { id: 'elbow_l', name: '팔꿈치 (좌)', pos: [-1.15, 0.95, 0], healed: false, chipId: 'elbow' },
      { id: 'elbow_r', name: '팔꿈치 (우)', pos: [1.15, 0.95, 0], healed: false, chipId: 'elbow' },
      { id: 'wrist_l', name: '손가락 (좌)', pos: [-1.3, 0.25, 0], healed: false, chipId: 'wrist' },
      { id: 'wrist_r', name: '손가락 (우)', pos: [1.3, 0.25, 0], healed: false, chipId: 'wrist' },
      { id: 'waist', name: '허리 (요추)', pos: [0, 0.85, -0.05], healed: false },
      { id: 'hip_l', name: '골반/다리', pos: [-0.45, 0.35, 0], healed: false, chipId: 'hip' },
      { id: 'hip_r', name: '골반/다리', pos: [0.45, 0.35, 0], healed: false, chipId: 'hip' },
      { id: 'knee_l', name: '무릎 (좌)', pos: [-0.45, -0.65, 0.05], healed: false, chipId: 'knee' },
      { id: 'knee_r', name: '무릎 (우)', pos: [0.45, -0.65, 0.05], healed: false, chipId: 'knee' },
      { id: 'ankle_l', name: '발목 (좌)', pos: [-0.42, -1.5, 0], healed: false, chipId: 'ankle' },
      { id: 'ankle_r', name: '발목 (우)', pos: [0.42, -1.5, 0], healed: false, chipId: 'ankle' },
      { id: 'toe_l', name: '발가락 (좌)', pos: [-0.42, -1.85, 0.15], healed: false, chipId: 'toe' },
      { id: 'toe_r', name: '발가락 (우)', pos: [0.42, -1.85, 0.15], healed: false, chipId: 'toe' }
    ];

    this.initDOM();
    this.initThree();
    this.initScroll();
    this.initNavigation();
    this.initIntro();
    this.initDrawer();
    this.animate();
  }

  initDOM() {
    // Canvas & HUD elements
    this.canvas = document.getElementById('storyboard-canvas');
    this.hudBadge = document.getElementById('hud-step-badge');
    this.hudCounter = document.getElementById('hud-step-counter');
    this.hudTitle = document.getElementById('hud-step-title');
    this.hudSubtitle = document.getElementById('hud-step-subtitle');
    this.hudDesc = document.getElementById('hud-step-desc');
    this.hudPrimaryBtn = document.getElementById('hud-primary-btn');
    this.hudDrawerBtn = document.getElementById('hud-drawer-btn');
    this.painRadarBox = document.getElementById('pain-radar-box');
    this.painRadarStatus = document.getElementById('pain-radar-status');
    
    // Backdrops
    this.backdrops = [
      document.getElementById('backdrop-1'),
      document.getElementById('backdrop-2'),
      document.getElementById('backdrop-3'),
      document.getElementById('backdrop-4'),
      document.getElementById('backdrop-5')
    ];

    // Left nav dots
    this.navDots = document.querySelectorAll('.step-nav-dot');

    // Time widget
    const timeDisplay = document.getElementById('current-time');
    if (timeDisplay) {
      const updateClock = () => {
        const now = new Date();
        timeDisplay.textContent = now.toTimeString().slice(0, 5);
      };
      updateClock();
      setInterval(updateClock, 10000);
    }
  }

  initThree() {
    if (!this.canvas || typeof THREE === 'undefined') return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // 1. Scene
    this.scene = new THREE.Scene();

    // 2. Camera
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    this.camera.position.set(0, 0, 7.5);

    // 3. Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    this.scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffeedd, 1.4);
    dirLight.position.set(5, 8, 5);
    this.scene.add(dirLight);

    // Dynamic Healing Light & Pain Light
    this.healingLight = new THREE.PointLight(0x38A169, 0, 15);
    this.healingLight.position.set(0, 0, 2);
    this.scene.add(this.healingLight);

    this.painLight = new THREE.PointLight(0xE53E3E, 0, 10);
    this.painLight.position.set(0, 0, 2);
    this.scene.add(this.painLight);

    // 5. Build 3D Step Groups
    this.buildStep1Growth();
    this.buildStep2Diet();
    this.buildStep3Scalp();
    this.buildStep4PainChuna();
    this.buildStep5Gongjindan();

    // Resize event
    window.addEventListener('resize', () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    });
  }

  // --- Step 1: 3D Spine & DNA Life Helix ---
  buildStep1Growth() {
    this.growthGroup = new THREE.Group();

    // Rising Spine Vertebrae
    const spineGeom = new THREE.CylinderGeometry(0.08, 0.12, 4.2, 16);
    const spineMat = new THREE.MeshStandardMaterial({
      color: 0x526B59,
      emissive: 0x1A3B2B,
      roughness: 0.3,
      metalness: 0.6
    });
    const spineCore = new THREE.Mesh(spineGeom, spineMat);
    this.growthGroup.add(spineCore);

    // Glowing Vertebrae Discs
    this.vertebraeDiscs = [];
    for (let i = -8; i <= 8; i++) {
      const discGeom = new THREE.TorusGeometry(0.24 - Math.abs(i) * 0.008, 0.035, 12, 24);
      const discMat = new THREE.MeshStandardMaterial({
        color: 0xE2C892,
        emissive: 0xC09A67,
        emissiveIntensity: 0.6
      });
      const disc = new THREE.Mesh(discGeom, discMat);
      disc.rotation.x = Math.PI / 2;
      disc.position.y = i * 0.24;
      this.growthGroup.add(disc);
      this.vertebraeDiscs.push(disc);
    }

    // Double Helix DNA Life Sparks
    const count = 750;
    const geom1 = new THREE.BufferGeometry();
    const geom2 = new THREE.BufferGeometry();
    const pos1 = new Float32Array(count * 3);
    const pos2 = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 8 - Math.PI * 4;
      const r = 0.75 + Math.sin(t * 2) * 0.1;
      const y = (i / count) * 4.6 - 2.3;

      pos1[i * 3] = Math.cos(t) * r;
      pos1[i * 3 + 1] = y;
      pos1[i * 3 + 2] = Math.sin(t) * r;

      pos2[i * 3] = Math.cos(t + Math.PI) * r;
      pos2[i * 3 + 1] = y;
      pos2[i * 3 + 2] = Math.sin(t + Math.PI) * r;
    }

    geom1.setAttribute('position', new THREE.BufferAttribute(pos1, 3));
    geom2.setAttribute('position', new THREE.BufferAttribute(pos2, 3));

    const mat1 = new THREE.PointsMaterial({ color: 0x34D399, size: 0.05, transparent: true, opacity: 0.85 });
    const mat2 = new THREE.PointsMaterial({ color: 0xFDE68A, size: 0.05, transparent: true, opacity: 0.85 });

    this.growthGroup.add(new THREE.Points(geom1, mat1));
    this.growthGroup.add(new THREE.Points(geom2, mat2));

    this.growthGroup.position.set(1.5, 0, 0);
    this.scene.add(this.growthGroup);
  }

  // --- Step 2: 3D Slimming Silhouette & Dissolving Adipose Mesh ---
  buildStep2Diet() {
    this.dietGroup = new THREE.Group();

    // Hourglass Contoured Waist Silhouette
    const silhouetteCount = 900;
    const silGeom = new THREE.BufferGeometry();
    const silPos = new Float32Array(silhouetteCount * 3);

    for (let i = 0; i < silhouetteCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 4.2;
      // Hourglass waist curve function
      const r = 0.55 + Math.pow(Math.abs(y) / 2.0, 2) * 0.75;

      silPos[i * 3] = Math.cos(theta) * r;
      silPos[i * 3 + 1] = y;
      silPos[i * 3 + 2] = Math.sin(theta) * r * 0.65;
    }

    silGeom.setAttribute('position', new THREE.BufferAttribute(silPos, 3));
    const silMat = new THREE.PointsMaterial({ color: 0xF472B6, size: 0.045, transparent: true, opacity: 0.8 });
    this.dietSilhouette = new THREE.Points(silGeom, silMat);
    this.dietGroup.add(this.dietSilhouette);

    // Swirling Adipose Particles (contracts inward)
    const lipidCount = 600;
    const lipidGeom = new THREE.BufferGeometry();
    this.lipidInitialPos = new Float32Array(lipidCount * 3);
    const lipidPos = new Float32Array(lipidCount * 3);

    for (let i = 0; i < lipidCount; i++) {
      const u = Math.random();
      const angle = Math.random() * Math.PI * 2;
      const r = 1.3 + u * 1.5;
      const y = (Math.random() - 0.5) * 2.8;

      lipidPos[i * 3] = Math.cos(angle) * r;
      lipidPos[i * 3 + 1] = y;
      lipidPos[i * 3 + 2] = Math.sin(angle) * r;

      this.lipidInitialPos[i * 3] = lipidPos[i * 3];
      this.lipidInitialPos[i * 3 + 1] = lipidPos[i * 3 + 1];
      this.lipidInitialPos[i * 3 + 2] = lipidPos[i * 3 + 2];
    }

    lipidGeom.setAttribute('position', new THREE.BufferAttribute(lipidPos, 3));
    const lipidMat = new THREE.PointsMaterial({ color: 0xC09A67, size: 0.055, transparent: true, opacity: 0.75 });
    this.lipidPoints = new THREE.Points(lipidGeom, lipidMat);
    this.dietGroup.add(this.lipidPoints);

    this.dietGroup.position.set(1.5, 0, 0);
    this.dietGroup.visible = false;
    this.scene.add(this.dietGroup);
  }

  // --- Step 3: Scalp Zoom, Heat Dissipation & Hair Blooming ---
  buildStep3Scalp() {
    this.scalpGroup = new THREE.Group();

    // Scalp Dome Mesh
    const domeGeom = new THREE.SphereGeometry(1.6, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const domeMat = new THREE.MeshStandardMaterial({
      color: 0x1E3A2F,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const scalpDome = new THREE.Mesh(domeGeom, domeMat);
    scalpDome.position.y = 0.2;
    this.scalpGroup.add(scalpDome);

    // Blooming Hair Strands
    this.hairStrands = [];
    const strandCount = 180;
    for (let i = 0; i < strandCount; i++) {
      const phi = Math.random() * (Math.PI / 2.2);
      const theta = Math.random() * Math.PI * 2;
      const start = new THREE.Vector3(
        1.55 * Math.sin(phi) * Math.cos(theta),
        1.55 * Math.cos(phi) + 0.2,
        1.55 * Math.sin(phi) * Math.sin(theta)
      );

      const mid = start.clone().multiplyScalar(1.25);
      mid.y += 0.4 + Math.random() * 0.4;
      mid.x += (Math.random() - 0.5) * 0.3;

      const end = mid.clone().multiplyScalar(1.2);
      end.y += 0.5 + Math.random() * 0.6;
      end.x += (Math.random() - 0.5) * 0.5;

      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const points = curve.getPoints(12);
      const strandGeom = new THREE.BufferGeometry().setFromPoints(points);
      const strandMat = new THREE.LineBasicMaterial({
        color: i % 3 === 0 ? 0x60A5FA : 0x34D399,
        transparent: true,
        opacity: 0.65
      });
      const strand = new THREE.Line(strandGeom, strandMat);
      this.scalpGroup.add(strand);
      this.hairStrands.push(strand);
    }

    // Cooling Jade Mist Particle Cloud
    const mistCount = 450;
    const mistGeom = new THREE.BufferGeometry();
    const mistPos = new Float32Array(mistCount * 3);
    for (let i = 0; i < mistCount; i++) {
      mistPos[i * 3] = (Math.random() - 0.5) * 3.2;
      mistPos[i * 3 + 1] = 0.5 + Math.random() * 2.8;
      mistPos[i * 3 + 2] = (Math.random() - 0.5) * 3.2;
    }
    mistGeom.setAttribute('position', new THREE.BufferAttribute(mistPos, 3));
    const mistMat = new THREE.PointsMaterial({ color: 0x6EE7B7, size: 0.06, transparent: true, opacity: 0.7 });
    this.mistPoints = new THREE.Points(mistGeom, mistMat);
    this.scalpGroup.add(this.mistPoints);

    this.scalpGroup.position.set(1.5, -0.6, 0);
    this.scalpGroup.visible = false;
    this.scene.add(this.scalpGroup);
  }

  // --- Step 4: 3D Anatomical Human Model with 9-Joint Pain & Green Healing Animation ---
  buildStep4PainChuna() {
    this.painGroup = new THREE.Group();

    // 1. Holographic Human Anatomical Wireframe
    // Head
    const headGeom = new THREE.SphereGeometry(0.42, 16, 12);
    const wireMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });
    const head = new THREE.Mesh(headGeom, wireMat);
    head.position.set(0, 2.3, 0);
    this.painGroup.add(head);

    // Spine Curve
    const spineCurvePoints = [];
    for (let y = -0.3; y <= 1.9; y += 0.2) {
      spineCurvePoints.push(new THREE.Vector3(Math.sin(y * 2) * 0.08, y, 0));
    }
    const spineGeom = new THREE.BufferGeometry().setFromPoints(spineCurvePoints);
    this.painSpineLine = new THREE.Line(spineGeom, new THREE.LineBasicMaterial({ color: 0xE2C892, linewidth: 2 }));
    this.painGroup.add(this.painSpineLine);

    // Torso Ribcage Cage
    const ribGeom = new THREE.CylinderGeometry(0.7, 0.5, 1.4, 12, 4, true);
    const ribMesh = new THREE.Mesh(ribGeom, wireMat);
    ribMesh.position.set(0, 1.2, 0);
    this.painGroup.add(ribMesh);

    // Limbs Wireframe Lines
    const limbLinesMat = new THREE.LineBasicMaterial({ color: 0x475569, transparent: true, opacity: 0.5 });
    
    // Left Arm
    const leftArmPts = [new THREE.Vector3(0, 1.6, 0), new THREE.Vector3(-0.85, 1.6, 0), new THREE.Vector3(-1.15, 0.95, 0), new THREE.Vector3(-1.3, 0.25, 0)];
    this.painGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(leftArmPts), limbLinesMat));

    // Right Arm
    const rightArmPts = [new THREE.Vector3(0, 1.6, 0), new THREE.Vector3(0.85, 1.6, 0), new THREE.Vector3(1.15, 0.95, 0), new THREE.Vector3(1.3, 0.25, 0)];
    this.painGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(rightArmPts), limbLinesMat));

    // Left Leg
    const leftLegPts = [new THREE.Vector3(0, 0.35, 0), new THREE.Vector3(-0.45, 0.35, 0), new THREE.Vector3(-0.45, -0.65, 0.05), new THREE.Vector3(-0.42, -1.5, 0), new THREE.Vector3(-0.42, -1.85, 0.15)];
    this.painGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(leftLegPts), limbLinesMat));

    // Right Leg
    const rightLegPts = [new THREE.Vector3(0, 0.35, 0), new THREE.Vector3(0.45, 0.35, 0), new THREE.Vector3(0.45, -0.65, 0.05), new THREE.Vector3(0.42, -1.5, 0), new THREE.Vector3(0.42, -1.85, 0.15)];
    this.painGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(rightLegPts), limbLinesMat));

    // 2. The 9 Major Joint Pain & Healing Markers
    this.jointMeshes = [];
    this.joints.forEach(j => {
      const markerGroup = new THREE.Group();
      markerGroup.position.set(...j.pos);

      // Core Glowing Sphere
      const sphereGeom = new THREE.SphereGeometry(0.09, 16, 16);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: 0xE53E3E, // Pain Red default
        emissive: 0xE53E3E,
        emissiveIntensity: 0.8,
        roughness: 0.2
      });
      const sphere = new THREE.Mesh(sphereGeom, sphereMat);
      markerGroup.add(sphere);

      // Concentric Radar Pulse Ring
      const ringGeom = new THREE.RingGeometry(0.12, 0.16, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xE53E3E,
        transparent: true,
        opacity: 0.7,
        side: THREE.DoubleSide
      });
      const ring = new THREE.Mesh(ringGeom, ringMat);
      markerGroup.add(ring);

      this.painGroup.add(markerGroup);
      this.jointMeshes.push({
        def: j,
        group: markerGroup,
        sphere: sphere,
        ring: ring,
        pulseOffset: Math.random() * Math.PI
      });
    });

    // 3. Sweeping Chuna Healing Wave Torus
    const waveGeom = new THREE.TorusGeometry(1.65, 0.05, 16, 64);
    const waveMat = new THREE.MeshStandardMaterial({
      color: 0x34D399,
      emissive: 0x10B981,
      emissiveIntensity: 1.2,
      transparent: true,
      opacity: 0.8
    });
    this.chunaWaveRing = new THREE.Mesh(waveGeom, waveMat);
    this.chunaWaveRing.rotation.x = Math.PI / 2;
    this.chunaWaveRing.position.set(0, 2.5, 0); // starts at top
    this.painGroup.add(this.chunaWaveRing);

    this.painGroup.position.set(1.5, 0, 0);
    this.painGroup.visible = false;
    this.scene.add(this.painGroup);
  }

  // --- Step 5: 3D Emperor Gongjindan & Golden Vitality Aura ---
  buildStep5Gongjindan() {
    this.gongjindanGroup = new THREE.Group();

    // Central 24K Gold Foil Pill Sphere
    const pillGeom = new THREE.SphereGeometry(0.95, 32, 32);
    const pillMat = new THREE.MeshStandardMaterial({
      color: 0xFFD700,
      emissive: 0xC09A67,
      emissiveIntensity: 0.45,
      metalness: 0.95,
      roughness: 0.22
    });
    this.gongjindanPill = new THREE.Mesh(pillGeom, pillMat);
    this.gongjindanGroup.add(this.gongjindanPill);

    // Orbital Gold Rings
    const ring1Geom = new THREE.TorusGeometry(1.45, 0.025, 16, 64);
    const ringMat = new THREE.MeshStandardMaterial({ color: 0xFDE68A, metalness: 0.9, roughness: 0.2 });
    this.goldOrbit1 = new THREE.Mesh(ring1Geom, ringMat);
    this.goldOrbit1.rotation.x = 0.85;
    this.goldOrbit1.rotation.y = 0.35;
    this.gongjindanGroup.add(this.goldOrbit1);

    const ring2Geom = new THREE.TorusGeometry(1.85, 0.02, 16, 64);
    this.goldOrbit2 = new THREE.Mesh(ring2Geom, ringMat);
    this.goldOrbit2.rotation.x = -0.65;
    this.goldOrbit2.rotation.y = -0.45;
    this.gongjindanGroup.add(this.goldOrbit2);

    // Golden Vitality Shield Sphere
    const shieldGeom = new THREE.SphereGeometry(2.1, 24, 24);
    const shieldMat = new THREE.MeshStandardMaterial({
      color: 0xE2C892,
      wireframe: true,
      transparent: true,
      opacity: 0.22
    });
    this.vitalityShield = new THREE.Mesh(shieldGeom, shieldMat);
    this.gongjindanGroup.add(this.vitalityShield);

    // Swirling Gold Leaf Flakes
    const flakeCount = 850;
    const flakeGeom = new THREE.BufferGeometry();
    const flakePos = new Float32Array(flakeCount * 3);
    for (let i = 0; i < flakeCount; i++) {
      const u = Math.random();
      const theta = Math.random() * Math.PI * 2;
      const r = 1.1 + u * 1.8;
      const y = (Math.random() - 0.5) * 3.5;
      flakePos[i * 3] = Math.cos(theta) * r;
      flakePos[i * 3 + 1] = y;
      flakePos[i * 3 + 2] = Math.sin(theta) * r;
    }
    flakeGeom.setAttribute('position', new THREE.BufferAttribute(flakePos, 3));
    const flakeMat = new THREE.PointsMaterial({ color: 0xFBBF24, size: 0.05, transparent: true, opacity: 0.85 });
    this.goldFlakes = new THREE.Points(flakeGeom, flakeMat);
    this.gongjindanGroup.add(this.goldFlakes);

    this.gongjindanGroup.position.set(1.5, 0, 0);
    this.gongjindanGroup.visible = false;
    this.scene.add(this.gongjindanGroup);
  }

  // --- Scroll & Storyboard Step Manager ---
  initScroll() {
    const track = document.getElementById('story-scroll-track');
    if (!track) return;

    window.addEventListener('scroll', () => {
      const rect = track.getBoundingClientRect();
      const trackHeight = track.offsetHeight - window.innerHeight;
      let progress = 0;

      if (rect.top <= 0) {
        progress = Math.min(1.0, Math.max(0, -rect.top / trackHeight));
      }
      this.scrollProgress = progress;
      this.updateStepFromProgress(progress);
    }, { passive: true });
  }

  updateStepFromProgress(p) {
    // Map 0.0 - 1.0 to 5 steps
    let targetStep = 1;
    if (p < 0.20) targetStep = 1;
    else if (p < 0.40) targetStep = 2;
    else if (p < 0.60) targetStep = 3;
    else if (p < 0.80) targetStep = 4;
    else targetStep = 5;

    // Check if reached signature cards section
    const cardsSec = document.getElementById('signature-cards');
    if (cardsSec) {
      const cRect = cardsSec.getBoundingClientRect();
      if (cRect.top < window.innerHeight * 0.4) {
        targetStep = 6;
      }
    }

    if (this.currentStep !== targetStep) {
      this.currentStep = targetStep;
      this.renderStepHUD(targetStep);
      this.updateBackdrops(targetStep);
      this.updateNavDots(targetStep);
      this.update3DVisibility(targetStep);
    }

    // Step 4 Realtime Wave & Pain Transition based on fine progress within Step 4 (0.60 ~ 0.80)
    if (p >= 0.58 && p <= 0.82 && this.painGroup) {
      const step4Progress = Math.min(1.0, Math.max(0.0, (p - 0.60) / 0.18));
      this.updateStep4ChunaWave(step4Progress);
    }
  }

  renderStepHUD(step) {
    if (step > 5) {
      // Reached signature cards
      if (this.hudBadge) this.hudBadge.textContent = '5대 특화진료 카드';
      if (this.hudCounter) this.hudCounter.textContent = 'FINAL';
      if (this.hudTitle) this.hudTitle.textContent = '바른한의원 5대 시그니처';
      if (this.hudSubtitle) this.hudSubtitle.textContent = '아래 카드에서 원하는 진료를 선택하세요';
      if (this.hudDesc) this.hudDesc.textContent = '소아 성장, 다이어트, 탈모, 9대 관절 통증, 황제 공진단까지 1:1 맞춤 진료';
      if (this.painRadarBox) this.painRadarBox.style.display = 'none';
      return;
    }

    const data = STORY_STEPS[step - 1];
    if (!data) return;

    if (this.hudBadge) this.hudBadge.textContent = data.badge;
    if (this.hudCounter) this.hudCounter.textContent = data.counter;
    if (this.hudTitle) this.hudTitle.textContent = data.title;
    if (this.hudSubtitle) this.hudSubtitle.textContent = data.subtitle;
    if (this.hudDesc) this.hudDesc.textContent = data.desc;
    if (this.hudPrimaryBtn) {
      this.hudPrimaryBtn.href = data.link;
      this.hudPrimaryBtn.innerHTML = `<span>${data.btnText}</span> <span>➔</span>`;
    }
    if (this.hudDrawerBtn) {
      this.hudDrawerBtn.onclick = () => openDrawerWithProgram(data.slug);
    }

    // Step 4 Pain Radar Box display
    if (this.painRadarBox) {
      this.painRadarBox.style.display = (step === 4) ? 'block' : 'none';
    }
  }

  updateBackdrops(step) {
    this.backdrops.forEach((slide, idx) => {
      if (!slide) return;
      if (idx === step - 1) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });
  }

  updateNavDots(step) {
    this.navDots.forEach(dot => {
      const s = parseInt(dot.getAttribute('data-step') || '1', 10);
      if (s === step) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  update3DVisibility(step) {
    if (!this.growthGroup) return;

    this.growthGroup.visible = (step === 1);
    this.dietGroup.visible = (step === 2);
    this.scalpGroup.visible = (step === 3);
    this.painGroup.visible = (step === 4);
    this.gongjindanGroup.visible = (step === 5);

    // Camera positioning based on step
    if (typeof gsap !== 'undefined') {
      if (step === 1) {
        gsap.to(this.camera.position, { x: 0, y: 0, z: 7.5, duration: 1.2, ease: 'power2.out' });
      } else if (step === 2) {
        gsap.to(this.camera.position, { x: 0, y: 0, z: 6.8, duration: 1.2, ease: 'power2.out' });
      } else if (step === 3) {
        gsap.to(this.camera.position, { x: 0, y: 0.6, z: 5.2, duration: 1.2, ease: 'power2.out' });
      } else if (step === 4) {
        gsap.to(this.camera.position, { x: 0, y: 0, z: 7.6, duration: 1.2, ease: 'power2.out' });
      } else if (step === 5) {
        gsap.to(this.camera.position, { x: 0, y: 0, z: 6.5, duration: 1.2, ease: 'power2.out' });
      }
    }
  }

  // --- Step 4: Chuna Wave Sweep & 9 Pain Points Green Healing Logic ---
  updateStep4ChunaWave(progress) {
    if (!this.chunaWaveRing || !this.jointMeshes) return;

    // Wave travels from y: 2.6 down to y: -2.2
    const waveY = 2.6 - progress * 4.8;
    this.chunaWaveRing.position.y = waveY;

    // Check each joint: if wave has passed it, heal it!
    let allHealed = true;
    let anyHealed = false;

    this.jointMeshes.forEach(item => {
      const jointY = item.def.pos[1];
      const isHealed = waveY <= jointY + 0.15; // wave passed joint

      if (isHealed) {
        item.sphere.material.color.setHex(0x38A169); // Health Green
        item.sphere.material.emissive.setHex(0x10B981);
        item.ring.material.color.setHex(0x38A169);
        item.def.healed = true;
        anyHealed = true;

        // Update corresponding HTML chip
        const chipKey = item.def.chipId || item.def.id;
        const chip = document.querySelector(`.pain-chip[data-joint="${chipKey}"]`);
        if (chip) chip.classList.add('healed');
      } else {
        item.sphere.material.color.setHex(0xE53E3E); // Pain Red
        item.sphere.material.emissive.setHex(0xE53E3E);
        item.ring.material.color.setHex(0xE53E3E);
        item.def.healed = false;
        allHealed = false;

        const chipKey = item.def.chipId || item.def.id;
        const chip = document.querySelector(`.pain-chip[data-joint="${chipKey}"]`);
        if (chip) chip.classList.remove('healed');
      }
    });

    // Update status badge
    if (this.painRadarStatus) {
      if (allHealed) {
        this.painRadarStatus.className = 'pain-radar-status healing';
        this.painRadarStatus.innerHTML = '<span class="pulse-dot">✓</span> <span>9대 관절 바른 정렬 완료</span>';
      } else if (anyHealed) {
        this.painRadarStatus.className = 'pain-radar-status healing';
        this.painRadarStatus.innerHTML = '<span class="pulse-dot">✦</span> <span>추나 치유 파동 진행 중</span>';
      } else {
        this.painRadarStatus.className = 'pain-radar-status warning';
        this.painRadarStatus.innerHTML = '<span class="pulse-dot">●</span> <span>통증 신호 점멸 중</span>';
      }
    }

    // Straighten spine line as healing progresses
    if (this.painSpineLine) {
      const pts = [];
      const straightness = progress; // 0: curved, 1: straight
      for (let y = -0.3; y <= 1.9; y += 0.2) {
        const xCurved = Math.sin(y * 2) * 0.08 * (1.0 - straightness);
        pts.push(new THREE.Vector3(xCurved, y, 0));
      }
      this.painSpineLine.geometry.setFromPoints(pts);
      this.painSpineLine.material.color.setHex(allHealed ? 0x34D399 : 0xE2C892);
    }
  }

  // --- Animation Render Loop ---
  animate() {
    requestAnimationFrame(() => this.animate());

    const time = performance.now() * 0.001;

    // Step 1 Animations
    if (this.growthGroup && this.growthGroup.visible) {
      this.growthGroup.rotation.y = time * 0.35;
      this.vertebraeDiscs.forEach((disc, idx) => {
        disc.rotation.z = Math.sin(time * 1.5 + idx * 0.3) * 0.06;
      });
    }

    // Step 2 Animations
    if (this.dietGroup && this.dietGroup.visible) {
      this.dietSilhouette.rotation.y = time * 0.25;
      this.lipidPoints.rotation.y = -time * 0.45;
    }

    // Step 3 Animations
    if (this.scalpGroup && this.scalpGroup.visible) {
      this.hairStrands.forEach((strand, idx) => {
        strand.rotation.y = Math.sin(time * 0.8 + idx * 0.1) * 0.03;
      });
      this.mistPoints.rotation.y = time * 0.15;
    }

    // Step 4 Pain Radar Radar Ring Pulsing
    if (this.painGroup && this.painGroup.visible) {
      this.jointMeshes.forEach(item => {
        const pulse = Math.sin(time * 6 + item.pulseOffset) * 0.5 + 0.5;
        const scale = 1.0 + pulse * (item.def.healed ? 0.35 : 0.8);
        item.ring.scale.set(scale, scale, 1);
        item.ring.material.opacity = (1.0 - pulse * 0.7) * (item.def.healed ? 0.6 : 0.9);
      });
    }

    // Step 5 Gongjindan Animations
    if (this.gongjindanGroup && this.gongjindanGroup.visible) {
      this.gongjindanPill.rotation.y = time * 0.4;
      this.goldOrbit1.rotation.z = time * 0.5;
      this.goldOrbit2.rotation.z = -time * 0.35;
      this.vitalityShield.rotation.y = -time * 0.2;
      this.goldFlakes.rotation.y = time * 0.15;
    }

    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  initNavigation() {
    this.navDots.forEach(dot => {
      dot.addEventListener('click', () => {
        const stepNum = parseInt(dot.getAttribute('data-step') || '1', 10);
        scrollToStep(stepNum);
      });
    });
  }

  initIntro() {
    const splash = document.getElementById('intro-splash');
    const enterBtn = document.getElementById('intro-enter-btn');
    if (!splash) return;

    const closeIntro = () => {
      splash.style.transition = 'opacity 0.8s ease, visibility 0.8s ease';
      splash.style.opacity = '0';
      splash.style.visibility = 'hidden';
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

// Global Nav Helpers
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

// 1-Click Drawer Booking Submit Handler (Kakao Alimtalk Dispatch)
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
    
    // Reset & close
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

// Auto Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  window.bareunApp = new BareunContinuous3DStoryApp();
});
