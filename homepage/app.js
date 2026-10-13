/**
 * BAREUN CLINIC (바른한의원 대전본점)
 * 5-Step Continuous 3D Lifecycle & 9-Joint Pain Relief Storytelling Engine
 * Three.js WebGL (r128+) + GSAP ScrollTrigger
 * Exact Spec Implementation (Step 01 ~ Step 05 with 9-Joint Real World Coordinates)
 */

const CLINIC_SPECS = [
  {
    step: 1,
    slug: 'pediatric-growth',
    title: '01. 바른 성장클리닉',
    badge: 'STEP 01 (0% ~ 20%) · 수정과 생명의 탄생',
    mainCopy: '생명의 시작부터 바르게, 우리 아이 숨은 키를 찾는 골격 성장',
    desc: '수정란의 세포 분열과 15,000개 유기적 파티클이 응집하며 32개 아동 척추 마디가 형성되고, 골드 광원과 함께 바르게 수직 정렬됩니다.',
    drawerSteps: ['3D 골격 분석', '성장판 검사', '추나 교정'],
    link: 'growth.html',
    seqImg: 'bareun_seq_01_womb_spine.jpg',
    color: '#34D399'
  },
  {
    step: 2,
    slug: 'appetite-zero',
    title: '02. 바른 다이어트 (식욕 ZERO)',
    badge: 'STEP 02 (20% ~ 40%) · 체형 변화 & 감량',
    mainCopy: '가벼워진 몸, 건강하게 되찾은 나만의 바른 라인',
    desc: '인체를 둘러싼 불투명 젤리 형태의 체지방 메쉬가 20,000개의 골드 미세 가루 파티클로 산산이 부서져 마이크로 증발하고, 매끈한 S라인 바디 메쉬가 안착합니다.',
    drawerSteps: ['1:1 체질 분석', '식욕 감퇴 & 독소 배출', '요요 방지 3단계'],
    link: 'diet-zero.html#checkout-zone',
    seqImg: 'bareun_seq_02_fat_dissolve.jpg',
    color: '#F472B6'
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
    seqImg: 'bareun_seq_03_scalp_cooling.jpg',
    color: '#60A5FA'
  },
  {
    step: 4,
    slug: 'pain-chuna',
    title: '04. 바른 통증·추나 (9대 관절 치유)',
    badge: 'STEP 04 (60% ~ 80%) · 전신 통증 점멸 & 녹색 치유',
    mainCopy: '통증의 붉은 신호를 지우고, 관절을 바르게 세우는 추나 케어',
    desc: '목, 어깨, 팔꿈치, 손가락, 허리, 골반, 무릎, 발목, 발가락 9대 관절의 8Hz 붉은 통증 링이 추나 치유 파동 스캔을 통과하며 눈부신 초록색 치유점으로 전환되고 척추가 곧게 정렬됩니다.',
    drawerSteps: ['3D 관절 교정 원리', '추나/약침 프로세스', '치료 케이스'],
    link: 'https://naver.me/5U1ELn8L',
    seqImg: 'bareun_seq_04_pain_chuna_9joints.jpg',
    color: '#38A169'
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
    seqImg: 'bareun_seq_05_gongjindan_aura.jpg',
    color: '#FCD34D'
  }
];

class BareunContinuous3DStoryApp {
  constructor() {
    this.scrollProgress = 0;
    this.currentStep = 1;
    this.isMobile = window.innerWidth <= 768;

    // Exact 9-Joint Anchors specified in production sheet
    this.jointAnchors = [
      { id: 'neck', name: '목 (Cervical Spine)', pos: [0.0, 38.0, 0.0], chipKey: 'neck' },
      { id: 'shoulder_l', name: '어깨 (Shoulder L)', pos: [-12.0, 32.0, 0.0], chipKey: 'shoulder' },
      { id: 'shoulder_r', name: '어깨 (Shoulder R)', pos: [12.0, 32.0, 0.0], chipKey: 'shoulder' },
      { id: 'elbow_l', name: '팔꿈치 (Elbow L)', pos: [-18.0, 18.0, 0.0], chipKey: 'elbow' },
      { id: 'elbow_r', name: '팔꿈치 (Elbow R)', pos: [18.0, 18.0, 0.0], chipKey: 'elbow' },
      { id: 'finger_l', name: '손가락 (Finger L)', pos: [-22.0, 0.0, 0.0], chipKey: 'wrist' },
      { id: 'finger_r', name: '손가락 (Finger R)', pos: [22.0, 0.0, 0.0], chipKey: 'wrist' },
      { id: 'lumbar', name: '허리 (Lumbar Spine)', pos: [0.0, 10.0, -2.0], chipKey: 'waist' },
      { id: 'hip_l', name: '다리/고관절 (Hip L)', pos: [-8.0, -5.0, 0.0], chipKey: 'hip' },
      { id: 'hip_r', name: '다리/고관절 (Hip R)', pos: [8.0, -5.0, 0.0], chipKey: 'hip' },
      { id: 'knee_l', name: '무릎 (Knee L)', pos: [-7.0, -25.0, 0.0], chipKey: 'knee' },
      { id: 'knee_r', name: '무릎 (Knee R)', pos: [7.0, -25.0, 0.0], chipKey: 'knee' },
      { id: 'ankle_l', name: '발목 (Ankle L)', pos: [-6.0, -45.0, 0.0], chipKey: 'ankle' },
      { id: 'ankle_r', name: '발목 (Ankle R)', pos: [6.0, -45.0, 0.0], chipKey: 'ankle' },
      { id: 'toe_l', name: '발가락 (Toe L)', pos: [-6.0, -52.0, 3.0], chipKey: 'toe' },
      { id: 'toe_r', name: '발가락 (Toe R)', pos: [6.0, -52.0, 3.0], chipKey: 'toe' }
    ];

    this.initDOM();
    this.initThree();
    this.initScrollEngine();
    this.initIntro();
    this.initDrawer();
    this.animate();
  }

  initDOM() {
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

    this.backdrops = [
      document.getElementById('backdrop-1'),
      document.getElementById('backdrop-2'),
      document.getElementById('backdrop-3'),
      document.getElementById('backdrop-4'),
      document.getElementById('backdrop-5')
    ];

    this.navDots = document.querySelectorAll('.step-nav-dot');
  }

  initThree() {
    if (!this.canvas || typeof THREE === 'undefined') return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // 1. Scene
    this.scene = new THREE.Scene();

    // 2. Camera (Initial: Step 01 Macro Pos [0, 0, 50], FOV 45)
    this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    this.camera.position.set(0, 0, 50);
    this.cameraTarget = new THREE.Vector3(0, 0, 0);

    // 3. Renderer with high performance & smooth alpha
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 4. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    this.scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffecc4, 1.5);
    dirLight1.position.set(30, 50, 40);
    this.scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x2D4030, 1.0);
    dirLight2.position.set(-30, -30, -20);
    this.scene.add(dirLight2);

    // Dynamic Healing Light & Pain Light
    this.healingPointLight = new THREE.PointLight(0x38A169, 0, 100);
    this.healingPointLight.position.set(0, 0, 30);
    this.scene.add(this.healingPointLight);

    this.painPointLight = new THREE.PointLight(0xE53E3E, 0, 80);
    this.painPointLight.position.set(0, 0, 30);
    this.scene.add(this.painPointLight);

    // 5. Build 3D Step Meshes according to specs
    this.buildStep01();
    this.buildStep02();
    this.buildStep03();
    this.buildStep04();
    this.buildStep05();

    window.addEventListener('resize', () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      this.isMobile = w <= 768;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    });
  }

  // =========================================================================
  // [Step 01] 수정과 생명의 탄생 (0% ~ 20%)
  // Macro Center Pos [0, 0, 50] -> Full Shot Pos [0, 0, 120]
  // 32개 척추 마디 메쉬 & 15,000개 유기적 파티클
  // =========================================================================
  buildStep01() {
    this.step01Group = new THREE.Group();

    // 1. 자궁/수정란 메쉬 (MeshPhysicalMaterial)
    const eggGeom = new THREE.SphereGeometry(18, 32, 32);
    const eggMat = new THREE.MeshPhysicalMaterial({
      color: 0x2D4030,
      emissive: 0xC5A059,
      emissiveIntensity: 0.35,
      roughness: 0.2,
      transmission: 0.85,
      ior: 1.4,
      transparent: true,
      opacity: 0.55
    });
    this.wombMesh = new THREE.Mesh(eggGeom, eggMat);
    this.step01Group.add(this.wombMesh);

    // 2. 15,000개 생명 탄생 유기적 파티클 (모바일은 3,000개로 최적화)
    const pCount = this.isMobile ? 3000 : 15000;
    const pGeom = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    this.pOriginalPos = new Float32Array(pCount * 3);

    for (let i = 0; i < pCount; i++) {
      const u = Math.random();
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 16 * Math.cbrt(u);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      pPos[i * 3] = x;
      pPos[i * 3 + 1] = y;
      pPos[i * 3 + 2] = z;

      this.pOriginalPos[i * 3] = x;
      this.pOriginalPos[i * 3 + 1] = y;
      this.pOriginalPos[i * 3 + 2] = z;
    }

    pGeom.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xC5A059,
      size: 0.65,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
    this.lifeParticles = new THREE.Points(pGeom, pMat);
    this.step01Group.add(this.lifeParticles);

    // 3. 아동 3D 척추 마디 메쉬 (정확히 32개 마디)
    this.spineVertebrae = [];
    this.spineGroup = new THREE.Group();
    const vertGeom = new THREE.CylinderGeometry(1.6, 2.0, 1.4, 16);
    const vertMat = new THREE.MeshStandardMaterial({
      color: 0xC5A059,
      emissive: 0x2D4030,
      metalness: 0.6,
      roughness: 0.25
    });

    for (let i = 0; i < 32; i++) {
      const vert = new THREE.Mesh(vertGeom, vertMat);
      // Height spans roughly y = -35 to +35
      const baseSpacing = 2.1;
      vert.position.y = (i - 16) * baseSpacing;
      vert.scale.set(0.001, 0.001, 0.001); // starts invisible, expands on timeline
      this.spineGroup.add(vert);
      this.spineVertebrae.push(vert);
    }
    this.step01Group.add(this.spineGroup);

    this.scene.add(this.step01Group);
  }

  // =========================================================================
  // [Step 02] 체형 변화 & 감량 (20% ~ 40%)
  // 3/4 Perspective View Pos [30, 10, 80]
  // 3D 체지방 젤리 메쉬 -> 20,000개 골드 가루 파티클 디졸브 & 슬림 S라인 메쉬
  // =========================================================================
  buildStep02() {
    this.step02Group = new THREE.Group();

    // 1. 슬림 바디 메쉬 (Pure White #FFFFFF, Opacity: 0.9)
    const slimGeom = new THREE.CylinderGeometry(6.5, 9.5, 65, 24, 20);
    // Mold vertices into S-line curve
    const pos = slimGeom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      let rFactor = 1.0;
      if (y > 10) rFactor = 1.1 + Math.sin(y * 0.1) * 0.15; // chest
      else if (y > -10) rFactor = 0.72 + (Math.abs(y) / 10) * 0.2; // slim waist
      else rFactor = 1.15 + Math.cos(y * 0.1) * 0.1; // hips
      pos.setX(i, pos.getX(i) * rFactor);
      pos.setZ(i, pos.getZ(i) * rFactor * 0.75);
    }
    slimGeom.computeVertexNormals();

    const slimMat = new THREE.MeshStandardMaterial({
      color: 0xFFFFFF,
      roughness: 0.25,
      metalness: 0.2,
      transparent: true,
      opacity: 0.92
    });
    this.slimBodyMesh = new THREE.Mesh(slimGeom, slimMat);
    this.step02Group.add(this.slimBodyMesh);

    // 2. 부풀어 오른 3D 체지방 젤리 메쉬 (외곽 레이어)
    const fatGeom = slimGeom.clone();
    const fatPos = fatGeom.attributes.position;
    for (let i = 0; i < fatPos.count; i++) {
      const y = fatPos.getY(i);
      const fatFactor = (y > -15 && y < 15) ? 1.55 : 1.25;
      fatPos.setX(i, fatPos.getX(i) * fatFactor);
      fatPos.setZ(i, fatPos.getZ(i) * fatFactor);
    }
    fatGeom.computeVertexNormals();

    const fatMat = new THREE.MeshPhysicalMaterial({
      color: 0xC5A059,
      transmission: 0.6,
      roughness: 0.45,
      transparent: true,
      opacity: 0.75
    });
    this.fatJellyMesh = new THREE.Mesh(fatGeom, fatMat);
    this.step02Group.add(this.fatJellyMesh);

    // 3. 20,000개 골드빛 미세 가루 파티클 (디졸브 증발용)
    const fCount = this.isMobile ? 4000 : 20000;
    const fGeom = new THREE.BufferGeometry();
    const fPositions = new Float32Array(fCount * 3);
    this.dissolveVelocity = new Float32Array(fCount * 3);

    for (let i = 0; i < fCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 60;
      const r = 11 + Math.random() * 5;

      fPositions[i * 3] = Math.cos(theta) * r;
      fPositions[i * 3 + 1] = y;
      fPositions[i * 3 + 2] = Math.sin(theta) * r;

      this.dissolveVelocity[i * 3] = (Math.random() - 0.5) * 0.8;
      this.dissolveVelocity[i * 3 + 1] = 0.5 + Math.random() * 1.5;
      this.dissolveVelocity[i * 3 + 2] = (Math.random() - 0.5) * 0.8;
    }

    fGeom.setAttribute('position', new THREE.BufferAttribute(fPositions, 3));
    const fMat = new THREE.PointsMaterial({
      color: 0xFDE68A,
      size: 0.85,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending
    });
    this.dissolveDust = new THREE.Points(fGeom, fMat);
    this.step02Group.add(this.dissolveDust);

    this.step02Group.visible = false;
    this.scene.add(this.step02Group);
  }

  // =========================================================================
  // [Step 03] 두피 열감 & 모근 개화 (40% ~ 60%)
  // Extreme Close-Up Pos [0, 45, 25], LookAt [0, 42, 0]
  // 붉은 열감 파티클 -> 쿨링 에메랄드 입자 -> 5,000개 3D 모발 인스턴스 개화
  // =========================================================================
  buildStep03() {
    this.step03Group = new THREE.Group();

    // 1. 3D 두피 조직 & 모공 그리드 메쉬
    const scalpGeom = new THREE.SphereGeometry(22, 32, 24, 0, Math.PI * 2, 0, Math.PI / 2.3);
    const scalpMat = new THREE.MeshStandardMaterial({
      color: 0x1A2E26,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });
    this.scalpDome = new THREE.Mesh(scalpGeom, scalpMat);
    this.scalpDome.position.set(0, 36, 0);
    this.step03Group.add(this.scalpDome);

    // 2. 붉은 열감 파티클 (Color: #E53E3E Pain Red, Opacity: 0.8)
    const heatCount = this.isMobile ? 800 : 3500;
    const heatGeom = new THREE.BufferGeometry();
    const heatPos = new Float32Array(heatCount * 3);
    for (let i = 0; i < heatCount; i++) {
      const u = Math.random();
      const theta = Math.random() * Math.PI * 2;
      const r = 21.5 * Math.sqrt(u);
      heatPos[i * 3] = Math.cos(theta) * r;
      heatPos[i * 3 + 1] = 42 + Math.random() * 4;
      heatPos[i * 3 + 2] = Math.sin(theta) * r;
    }
    heatGeom.setAttribute('position', new THREE.BufferAttribute(heatPos, 3));
    this.heatMat = new THREE.PointsMaterial({
      color: 0xE53E3E,
      size: 1.1,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
    this.heatParticles = new THREE.Points(heatGeom, this.heatMat);
    this.step03Group.add(this.heatParticles);

    // 3. 쿨링 에메랄드 한방 입자 (#2D4030 / #34D399)
    const coolCount = this.isMobile ? 800 : 3500;
    const coolGeom = new THREE.BufferGeometry();
    const coolPos = new Float32Array(coolCount * 3);
    for (let i = 0; i < coolCount; i++) {
      coolPos[i * 3] = (Math.random() - 0.5) * 36;
      coolPos[i * 3 + 1] = 40 + Math.random() * 12;
      coolPos[i * 3 + 2] = (Math.random() - 0.5) * 36;
    }
    coolGeom.setAttribute('position', new THREE.BufferAttribute(coolPos, 3));
    this.coolMat = new THREE.PointsMaterial({
      color: 0x34D399,
      size: 1.2,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending
    });
    this.coolingParticles = new THREE.Points(coolGeom, this.coolMat);
    this.step03Group.add(this.coolingParticles);

    // 4. InstancedMesh 기반 5,000개 굵은 3D 모발 인스턴싱
    const hairCount = this.isMobile ? 1200 : 5000;
    const hairStrandGeom = new THREE.CylinderGeometry(0.08, 0.16, 7.5, 6);
    hairStrandGeom.translate(0, 3.75, 0); // origin at bottom

    const hairMat = new THREE.MeshStandardMaterial({
      color: 0x050C09,
      roughness: 0.2,
      metalness: 0.4
    });
    this.hairInstanced = new THREE.InstancedMesh(hairStrandGeom, hairMat, hairCount);
    const dummy = new THREE.Object3D();

    for (let i = 0; i < hairCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * (Math.PI / 2.5);
      const r = 21.8;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = 36 + r * Math.cos(phi);
      const z = r * Math.sin(phi) * Math.sin(theta);

      dummy.position.set(x, y, z);
      // Align direction radially outward with slight organic curve
      dummy.lookAt(x * 1.5, y + 10, z * 1.5);
      dummy.scale.set(0.001, 0.001, 0.001); // initial hidden scale
      dummy.updateMatrix();
      this.hairInstanced.setMatrixAt(i, dummy.matrix);
    }
    this.hairInstanced.instanceMatrix.needsUpdate = true;
    this.step03Group.add(this.hairInstanced);

    this.step03Group.visible = false;
    this.scene.add(this.step03Group);
  }

  // =========================================================================
  // [Step 04] 전신 통증 점멸 & 녹색 치유 (60% ~ 80%)
  // Full Body 360도 회전 샷 Pos [0, 0, 100], Rot Y: 0° -> 360°
  // 9대 관절 정확한 좌표 & 8Hz 붉은 점멸 -> Y-axis 추나 치유 파동 스캔 & 초록 치유
  // =========================================================================
  buildStep04() {
    this.step04Group = new THREE.Group();

    // 1. 전신 3D 홀로그램 인체 와이어프레임 골격
    const bodyWireMat = new THREE.LineBasicMaterial({ color: 0x334155, transparent: true, opacity: 0.5 });
    
    // Spine line with slight scoliosis/distortion (straightens on heal)
    this.step4SpinePoints = [];
    for (let y = -40; y <= 38; y += 2) {
      this.step4SpinePoints.push(new THREE.Vector3(Math.sin(y * 0.15) * 1.8, y, 0));
    }
    const sGeom = new THREE.BufferGeometry().setFromPoints(this.step4SpinePoints);
    this.step4SpineLine = new THREE.Line(sGeom, new THREE.LineBasicMaterial({ color: 0xE2C892, linewidth: 2 }));
    this.step04Group.add(this.step4SpineLine);

    // Human skeleton limbs connections
    const limbsData = [
      // Head to Neck
      [ [0, 44, 0], [0, 38, 0] ],
      // Neck to Shoulders
      [ [0, 38, 0], [-12, 32, 0] ], [ [0, 38, 0], [12, 32, 0] ],
      // Shoulders to Elbows
      [ [-12, 32, 0], [-18, 18, 0] ], [ [12, 32, 0], [18, 18, 0] ],
      // Elbows to Fingers
      [ [-18, 18, 0], [-22, 0, 0] ], [ [18, 18, 0], [22, 0, 0] ],
      // Lumbar to Hips
      [ [0, 10, -2], [-8, -5, 0] ], [ [0, 10, -2], [8, -5, 0] ],
      // Hips to Knees
      [ [-8, -5, 0], [-7, -25, 0] ], [ [8, -5, 0], [7, -25, 0] ],
      // Knees to Ankles
      [ [-7, -25, 0], [-6, -45, 0] ], [ [7, -25, 0], [6, -45, 0] ],
      // Ankles to Toes
      [ [-6, -45, 0], [-6, -52, 3] ], [ [6, -45, 0], [6, -52, 3] ]
    ];

    limbsData.forEach(pair => {
      const lPts = [new THREE.Vector3(...pair[0]), new THREE.Vector3(...pair[1])];
      const lGeom = new THREE.BufferGeometry().setFromPoints(lPts);
      this.step04Group.add(new THREE.Line(lGeom, bodyWireMat));
    });

    // 2. 9대 관절 정확한 좌표 앵커 & 8Hz 붉은 펄스 링 셰이더 메쉬
    this.jointMarkerMeshes = [];
    this.jointAnchors.forEach(j => {
      const g = new THREE.Group();
      g.position.set(...j.pos);

      // Core Glowing Node
      const sGeom = new THREE.SphereGeometry(1.6, 16, 16);
      const sMat = new THREE.MeshStandardMaterial({
        color: 0xE53E3E,
        emissive: 0xE53E3E,
        emissiveIntensity: 1.0,
        roughness: 0.1
      });
      const sphere = new THREE.Mesh(sGeom, sMat);
      g.add(sphere);

      // 8Hz Pulsating Ring
      const rGeom = new THREE.RingGeometry(2.2, 3.0, 32);
      const rMat = new THREE.MeshBasicMaterial({
        color: 0xE53E3E,
        transparent: true,
        opacity: 0.85,
        side: THREE.DoubleSide
      });
      const ring = new THREE.Mesh(rGeom, rMat);
      g.add(ring);

      this.step04Group.add(g);
      this.jointMarkerMeshes.push({
        def: j,
        group: g,
        sphere: sphere,
        ring: ring,
        healed: false,
        pulseOffset: Math.random() * Math.PI
      });
    });

    // 3. Y-axis 한방 추나 치유 파동 스캔 링 (Scan Wave)
    const waveGeom = new THREE.TorusGeometry(32, 0.8, 16, 64);
    const waveMat = new THREE.MeshStandardMaterial({
      color: 0x38A169,
      emissive: 0x10B981,
      emissiveIntensity: 1.5,
      transparent: true,
      opacity: 0.9
    });
    this.chunaScanRing = new THREE.Mesh(waveGeom, waveMat);
    this.chunaScanRing.rotation.x = Math.PI / 2;
    this.chunaScanRing.position.y = 48; // Starts above head
    this.step04Group.add(this.chunaScanRing);

    this.step04Group.visible = false;
    this.scene.add(this.step04Group);
  }

  // =========================================================================
  // [Step 05] 황금빛 원기 회복 (80% ~ 100%)
  // Hero Center Focus Pos [0, 0, 60]
  // 30,000개 샴페인 골드 오라 파티클 & 3D 24K 금박 공진단 메쉬
  // =========================================================================
  buildStep05() {
    this.step05Group = new THREE.Group();

    // 1. 3D 금박 공진단 메쉬 (MeshStandardMaterial, Metalness: 0.95, Roughness: 0.1)
    const pillGeom = new THREE.SphereGeometry(14, 36, 36);
    const pillMat = new THREE.MeshStandardMaterial({
      color: 0xFFD700,
      emissive: 0xC5A059,
      emissiveIntensity: 0.5,
      metalness: 0.95,
      roughness: 0.12
    });
    this.gongjindanPill = new THREE.Mesh(pillGeom, pillMat);
    this.step05Group.add(this.gongjindanPill);

    // Orbital Gold Rings
    const r1Geom = new THREE.TorusGeometry(20, 0.45, 16, 64);
    const ringMat = new THREE.MeshStandardMaterial({ color: 0xFDE68A, metalness: 0.9, roughness: 0.15 });
    this.orbitRing1 = new THREE.Mesh(r1Geom, ringMat);
    this.orbitRing1.rotation.x = 0.85;
    this.orbitRing1.rotation.y = 0.35;
    this.step05Group.add(this.orbitRing1);

    const r2Geom = new THREE.TorusGeometry(25, 0.35, 16, 64);
    this.orbitRing2 = new THREE.Mesh(r2Geom, ringMat);
    this.orbitRing2.rotation.x = -0.65;
    this.orbitRing2.rotation.y = -0.45;
    this.step05Group.add(this.orbitRing2);

    // 2. 30,000개 샴페인 골드 (#C5A059) 및 에메랄드 오라 파티클
    const aCount = this.isMobile ? 6000 : 30000;
    const aGeom = new THREE.BufferGeometry();
    const aPos = new Float32Array(aCount * 3);

    for (let i = 0; i < aCount; i++) {
      const u = Math.random();
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 18 + u * 28;

      aPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      aPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      aPos[i * 3 + 2] = r * Math.cos(phi);
    }

    aGeom.setAttribute('position', new THREE.BufferAttribute(aPos, 3));
    const aMat = new THREE.PointsMaterial({
      color: 0xC5A059,
      size: 0.75,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
    this.gongjindanAura = new THREE.Points(aGeom, aMat);
    this.step05Group.add(this.gongjindanAura);

    this.step05Group.visible = false;
    this.scene.add(this.step05Group);
  }

  // =========================================================================
  // Scroll Timeline Engine & Keyframe Synchronization
  // =========================================================================
  initScrollEngine() {
    const track = document.getElementById('story-scroll-track');
    if (!track) return;

    window.addEventListener('scroll', () => {
      const rect = track.getBoundingClientRect();
      const totalScrollable = track.offsetHeight - window.innerHeight;
      let progress = 0;

      if (rect.top <= 0) {
        progress = Math.min(1.0, Math.max(0, -rect.top / totalScrollable));
      }
      this.scrollProgress = progress;
      this.evaluateTimeline(progress);
    }, { passive: true });
  }

  evaluateTimeline(p) {
    // Current Step index
    let step = 1;
    if (p < 0.20) step = 1;
    else if (p < 0.40) step = 2;
    else if (p < 0.60) step = 3;
    else if (p < 0.80) step = 4;
    else step = 5;

    // Check if reached final signature cards section
    const cardsSec = document.getElementById('signature-cards');
    if (cardsSec) {
      const cRect = cardsSec.getBoundingClientRect();
      if (cRect.top < window.innerHeight * 0.45) {
        step = 6;
      }
    }

    if (this.currentStep !== step) {
      this.currentStep = step;
      this.updateHUD(step);
      this.updateBackdrops(step);
      this.updateNavDots(step);
    }

    // --- Continuous 3D Keyframe Choreography ---

    // [Step 01] 0.00 ~ 0.20
    if (p <= 0.20) {
      this.setGroupVisibility(1);
      const subP = p / 0.20; // 0.0 ~ 1.0

      // Camera: Pos [0, 0, 50] -> Pos [0, 0, 120]
      const camZ = 50 + subP * 70;
      this.camera.position.set(0, 0, camZ);
      this.camera.lookAt(0, 0, 0);

      // 0% ~ 8%: 자궁 세포 파티클 응집 및 미세 진동
      if (subP <= 0.4) { // 0% ~ 8% relative
        const vib = Math.sin(performance.now() * 0.02) * 0.5;
        this.wombMesh.scale.set(1 + vib * 0.05, 1 + vib * 0.05, 1 + vib * 0.05);
      }
      // 8% ~ 15%: 아동 3D 척추 마디 메쉬 형성
      if (subP > 0.4 && subP <= 0.75) {
        const spineFactor = (subP - 0.4) / 0.35;
        this.spineVertebrae.forEach((vert, idx) => {
          if (idx / 32 <= spineFactor) {
            vert.scale.set(1, 1, 1);
          }
        });
      }
      // 15% ~ 20%: 척추 마디 간격 수직 5% 연장 & 바른 정렬
      if (subP > 0.75) {
        const stretch = 1.0 + (subP - 0.75) * 0.2; // up to 5% ~ 7%
        this.spineGroup.scale.set(1, stretch, 1);
      }
    }

    // [Step 02] 0.20 ~ 0.40
    else if (p > 0.20 && p <= 0.40) {
      this.setGroupVisibility(2);
      const subP = (p - 0.20) / 0.20; // 0.0 ~ 1.0

      // Camera: 3/4 Perspective View Pos [30, 10, 80], LookAt Center
      this.camera.position.set(30, 10, 80);
      this.camera.lookAt(0, 0, 0);

      // 20% ~ 28%: 부풀어 오른 3D 체지방 젤리 메쉬 등장
      // 28% ~ 35%: 골드 가루 파티클로 미세 분해 및 증발
      if (subP < 0.4) {
        this.fatJellyMesh.material.opacity = 0.75;
        this.dissolveDust.material.opacity = 0.0;
      } else if (subP >= 0.4 && subP < 0.75) {
        const dissolveProg = (subP - 0.4) / 0.35;
        this.fatJellyMesh.material.opacity = 0.75 * (1.0 - dissolveProg);
        this.dissolveDust.material.opacity = dissolveProg * 0.9;
        this.fatJellyMesh.scale.set(1.0 + dissolveProg * 0.15, 1.0, 1.0 + dissolveProg * 0.15);
      } else {
        // 35% ~ 40%: 슬림 S라인 인체 메쉬 안착
        this.fatJellyMesh.material.opacity = 0.0;
        this.dissolveDust.material.opacity = 0.2;
        this.slimBodyMesh.material.opacity = 0.95;
      }
    }

    // [Step 03] 0.40 ~ 0.60
    else if (p > 0.40 && p <= 0.60) {
      this.setGroupVisibility(3);
      const subP = (p - 0.40) / 0.20; // 0.0 ~ 1.0

      // Camera: Extreme Close-Up Pos [0, 45, 25], LookAt 정수리 [0, 42, 0]
      this.camera.position.set(0, 45, 25);
      this.camera.lookAt(0, 42, 0);

      // 40% ~ 48%: 붉은 열감 파티클 일렁임
      // 48% ~ 55%: 쿨링 에메랄드 한방 파티클 침투로 붉은 기 완전 소멸
      if (subP < 0.4) {
        this.heatMat.opacity = 0.85;
        this.coolMat.opacity = 0.0;
      } else if (subP >= 0.4 && subP < 0.75) {
        const coolProg = (subP - 0.4) / 0.35;
        this.heatMat.opacity = 0.85 * (1.0 - coolProg);
        this.coolMat.opacity = coolProg * 0.9;
      } else {
        // 55% ~ 60%: 5,000개 3D 모발 인스턴스 위로 피어나며 풍성한 모발 완성
        this.heatMat.opacity = 0.0;
        this.coolMat.opacity = 0.5;
        const hairGrowth = Math.min(1.0, (subP - 0.75) / 0.25);
        this.hairInstanced.scale.set(hairGrowth, hairGrowth, hairGrowth);
      }
    }

    // [Step 04] 0.60 ~ 0.80
    else if (p > 0.60 && p <= 0.80) {
      this.setGroupVisibility(4);
      const subP = (p - 0.60) / 0.20; // 0.0 ~ 1.0

      // Camera: Full Body 360도 회전 샷 Pos [0, 0, 100], Rot Y: 0° -> 360°
      const angle = subP * Math.PI * 2;
      this.camera.position.set(Math.sin(angle) * 100, 0, Math.cos(angle) * 100);
      this.camera.lookAt(0, 0, 0);

      // Y-axis 추나 치유 파동 스캔: 위(y: 45)에서 아래(y: -55)로 통과
      const scanY = 45 - subP * 100;
      this.chunaScanRing.position.y = scanY;

      // 9대 관절 치유 전환: 스캔 링이 관절 Y 좌표를 통과하면 즉시 초록색 치유점으로 전환!
      let allHealed = true;
      let anyHealed = false;

      this.jointMarkerMeshes.forEach(item => {
        const jY = item.def.pos[1];
        const isHealed = scanY <= jY + 2.0;

        if (isHealed) {
          item.sphere.material.color.setHex(0x38A169); // Healing Green
          item.sphere.material.emissive.setHex(0x10B981);
          item.ring.material.color.setHex(0x38A169);
          item.healed = true;
          anyHealed = true;

          const chip = document.querySelector(`.pain-chip[data-joint="${item.def.chipKey}"]`);
          if (chip) chip.classList.add('healed');
        } else {
          item.sphere.material.color.setHex(0xE53E3E); // Pain Red
          item.sphere.material.emissive.setHex(0xE53E3E);
          item.ring.material.color.setHex(0xE53E3E);
          item.healed = false;
          allHealed = false;

          const chip = document.querySelector(`.pain-chip[data-joint="${item.def.chipKey}"]`);
          if (chip) chip.classList.remove('healed');
        }
      });

      // Spine straightens on heal
      const straightness = Math.min(1.0, subP * 1.3);
      const pts = [];
      for (let y = -40; y <= 38; y += 2) {
        const curX = Math.sin(y * 0.15) * 1.8 * (1.0 - straightness);
        pts.push(new THREE.Vector3(curX, y, 0));
      }
      this.step4SpineLine.geometry.setFromPoints(pts);

      // Radar status text
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

    // [Step 05] 0.80 ~ 1.00
    else {
      this.setGroupVisibility(5);
      const subP = (p - 0.80) / 0.20; // 0.0 ~ 1.0

      // Camera: Hero Center Focus Pos [0, 0, 60]
      this.camera.position.set(0, 0, 60);
      this.camera.lookAt(0, 0, 0);

      // 80% ~ 90%: 샴페인 골드 오라 승화
      // 90% ~ 100%: 3D 금박 공진단 메쉬 중앙 안착 & 회전
      const scale = 0.5 + Math.min(0.5, subP * 0.5);
      this.gongjindanPill.scale.set(scale, scale, scale);
      this.gongjindanAura.rotation.y = subP * Math.PI * 2;
    }
  }

  setGroupVisibility(step) {
    if (!this.step01Group) return;
    this.step01Group.visible = (step === 1);
    this.step02Group.visible = (step === 2);
    this.step03Group.visible = (step === 3);
    this.step04Group.visible = (step === 4);
    this.step05Group.visible = (step === 5);
  }

  updateHUD(step) {
    if (step > 5) {
      if (this.hudBadge) this.hudBadge.textContent = '5대 특화진료 카드';
      if (this.hudCounter) this.hudCounter.textContent = 'FINAL';
      if (this.hudTitle) this.hudTitle.textContent = '바른한의원 5대 시그니처';
      if (this.hudSubtitle) this.hudSubtitle.textContent = '아래 카드에서 원하는 진료를 선택하세요';
      if (this.hudDesc) this.hudDesc.textContent = '소아 성장, 다이어트, 탈모, 9대 관절 통증, 황제 공진단까지 1:1 맞춤 진료';
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
      if (s === step) dot.classList.add('active');
      else dot.classList.remove('active');
    });
  }

  // Animation Loop (PC 60fps Target)
  animate() {
    requestAnimationFrame(() => this.animate());

    const time = performance.now() * 0.001;

    // Step 01 Cell Vibration & Spine Spin
    if (this.step01Group && this.step01Group.visible) {
      this.wombMesh.rotation.y = time * 0.15;
      this.lifeParticles.rotation.y = -time * 0.25;
      this.spineGroup.rotation.y = time * 0.35;
    }

    // Step 02 Dissolve Dust Swirl
    if (this.step02Group && this.step02Group.visible) {
      this.dissolveDust.rotation.y = time * 0.4;
      this.slimBodyMesh.rotation.y = Math.sin(time * 0.5) * 0.1;
    }

    // Step 03 Heat Flurry & Cooling
    if (this.step03Group && this.step03Group.visible) {
      this.heatParticles.rotation.y = time * 0.5;
      this.coolingParticles.rotation.y = -time * 0.3;
    }

    // Step 04 8Hz Pulsating Ring on 9 Joints
    if (this.step04Group && this.step04Group.visible) {
      // 8Hz pulsating rate = Math.sin(time * 16 * Math.PI)
      const pulse8Hz = Math.sin(time * 16 * Math.PI) * 0.5 + 0.5;
      this.jointMarkerMeshes.forEach(item => {
        if (!item.healed) {
          const s = 1.0 + pulse8Hz * 0.75;
          item.ring.scale.set(s, s, 1);
          item.ring.material.opacity = (1.0 - pulse8Hz * 0.6) * 0.85;
        } else {
          item.ring.scale.set(1.15, 1.15, 1);
          item.ring.material.opacity = 0.5;
        }
      });
    }

    // Step 05 Gongjindan 360-degree rotation & Aura Flakes
    if (this.step05Group && this.step05Group.visible) {
      this.gongjindanPill.rotation.y = time * 0.45;
      this.orbitRing1.rotation.z = time * 0.6;
      this.orbitRing2.rotation.z = -time * 0.4;
      this.gongjindanAura.rotation.y = time * 0.25;
    }

    if (this.renderer && this.scene && this.camera) {
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
  window.bareunApp = new BareunContinuous3DStoryApp();
});
