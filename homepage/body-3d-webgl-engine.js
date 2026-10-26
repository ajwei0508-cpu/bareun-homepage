// ============================================================================
// BAREUN 3D FULL-SCREEN VIBRANT WELLNESS ENGINE & GRAPHIC MOTION SYSTEM (v5.0)
// - Preserves 100% of existing 3D GLB & procedural anatomical models:
//   skinMB2.glb, skinF2.glb, Skeleton.glb, spinalDiscs3D, brain.glb, heart.glb,
//   liver.glb, stomach.glb, intestine.glb, kidneys2.glb, thyroid.glb,
//   Vascular.glb, uterus3D, prostate3D, autonomicNerveGroup, gongjindanBridgeGroup
// - Adds Full-Screen Vibrant Iridescent Pearl -> Bio-Scan X-Ray Shader,
//   Left-of-Center ViewOffset Framing, 3D Ambient Bokeh Motes,
//   3D Counter-Rotating Orbital Gyro-Rings, and 3D Bio-Signal Pathway Particles!
// ============================================================================

const partA = `
    // ========================================================================
    // 2. FULL-SCREEN 3D WEBGL SCENE & VIBRANT IRIDESCENT / BIO-SCAN SHADERS
    // ========================================================================
    const [THREE, { GLTFLoader }, { DRACOLoader }, { OrbitControls }] = await Promise.all([
      import('https://esm.sh/three@0.166.0'),
      import('https://esm.sh/three@0.166.0/examples/jsm/loaders/GLTFLoader.js'),
      import('https://esm.sh/three@0.166.0/examples/jsm/loaders/DRACOLoader.js'),
      import('https://esm.sh/three@0.166.0/examples/jsm/controls/OrbitControls.js')
    ]);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, window.innerWidth / Math.max(1, window.innerHeight), 0.1, 2000);
    // Heroic Vibrant-style portrait framing (crown y=4.60 to upper thighs y=1.85)
    const HERO_OVERVIEW_POS = new THREE.Vector3(0.0, 3.25, 4.12);
    const HERO_OVERVIEW_TARGET = new THREE.Vector3(0.0, 3.22, 0.0);
    const FULLBODY_OVERVIEW_POS = new THREE.Vector3(0.0, 2.36, 6.65);
    const FULLBODY_OVERVIEW_TARGET = new THREE.Vector3(0.0, 2.32, 0.0);

    camera.position.copy(HERO_OVERVIEW_POS);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      powerPreference: 'high-performance',
      antialias: true,
      alpha: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.NoToneMapping;

    const controls = new OrbitControls(camera, canvas);
    controls.target.copy(HERO_OVERVIEW_TARGET);
    controls.enableDamping = true;
    controls.dampingFactor = 0.075;
    controls.enablePan = false;
    controls.maxDistance = 8.2;
    controls.minDistance = 0.72;
    controls.maxPolarAngle = Math.PI * 0.80;
    controls.minPolarAngle = Math.PI * 0.20;

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('draco/');
    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);

    // 2.1 Vibrant Wellness Iridescent Periwinkle-Pearl & Bio-Scan X-Ray Skin Shader
    function createVibrantIridescentBodyMaterial() {
      return new THREE.ShaderMaterial({
        uniforms: {
          uHighlightCol:  { value: new THREE.Color('#F8FAFF') },
          uMidCol:        { value: new THREE.Color('#AEBEFA') },
          uDeepCol:       { value: new THREE.Color('#8396EB') },
          uRimCol:        { value: new THREE.Color('#5E72DB') },
          uIridescentCol: { value: new THREE.Color('#9BF6FF') },
          uAccentCol:     { value: new THREE.Color('#4F6EF7') },
          uXrayMix:       { value: 0.0 },
          uScanY:         { value: -2.0 },
          uFocusCenter:   { value: new THREE.Vector3(0.0, 3.2, 0.0) },
          uFocusRadius:   { value: 0.65 },
          uTime:          { value: 0.0 }
        },
        vertexShader: [
          'varying vec3 vNormal;',
          'varying vec3 vViewDir;',
          'varying vec3 vWorldPos;',
          'void main() {',
          '  vec4 worldPos = modelMatrix * vec4(position, 1.0);',
          '  vWorldPos = worldPos.xyz;',
          '  vec4 mvPos = viewMatrix * worldPos;',
          '  vViewDir = normalize(-mvPos.xyz);',
          '  vNormal = normalize(normalMatrix * normal);',
          '  gl_Position = projectionMatrix * mvPos;',
          '}'
        ].join(' '),
        fragmentShader: [
          'uniform vec3 uHighlightCol;',
          'uniform vec3 uMidCol;',
          'uniform vec3 uDeepCol;',
          'uniform vec3 uRimCol;',
          'uniform vec3 uIridescentCol;',
          'uniform vec3 uAccentCol;',
          'uniform float uXrayMix;',
          'uniform float uScanY;',
          'uniform vec3 uFocusCenter;',
          'uniform float uFocusRadius;',
          'uniform float uTime;',
          'varying vec3 vNormal;',
          'varying vec3 vViewDir;',
          'varying vec3 vWorldPos;',
          'void main() {',
          '  vec3 N = normalize(vNormal);',
          '  vec3 V = normalize(vViewDir);',
          '  vec3 L1 = normalize(vec3(0.28, 0.68, 0.86));',
          '  vec3 L2 = normalize(vec3(-0.62, 0.35, 0.48));',
          '  float NdotL1 = clamp(dot(N, L1) * 0.5 + 0.5, 0.0, 1.0);',
          '  float NdotL2 = clamp(dot(N, L2), 0.0, 1.0);',
          '  float NdotV = clamp(abs(dot(N, V)), 0.0, 1.0);',
          '  float fresnel = pow(1.0 - NdotV, 2.1);',
          '  vec3 H1 = normalize(L1 + V);',
          '  float spec = pow(max(0.0, dot(N, H1)), 26.0);',
          '  float iridMask = pow(max(0.0, dot(N, normalize(vec3(-0.45, 0.55, 0.70)))), 8.0) * (1.0 - NdotV * 0.55);',
          '  vec3 pearlCol = mix(uDeepCol, uMidCol, smoothstep(0.22, 0.68, NdotL1));',
          '  pearlCol = mix(pearlCol, uHighlightCol, smoothstep(0.66, 0.96, NdotL1) * 0.88 + spec * 0.55);',
          '  pearlCol = mix(pearlCol, uIridescentCol, clamp(iridMask * 0.52 + NdotL2 * 0.16, 0.0, 0.55));',
          '  pearlCol = mix(pearlCol, uRimCol, smoothstep(0.52, 0.94, fresnel) * 0.68);',
          '  float distFocus = length(vWorldPos - uFocusCenter);',
          '  float focusWindow = 1.0 - smoothstep(uFocusRadius * 0.45, uFocusRadius * 1.45, distFocus);',
          '  vec3 xrayCol = mix(pearlCol, uAccentCol, 0.32 + fresnel * 0.42);',
          '  vec3 finalCol = mix(pearlCol, xrayCol, uXrayMix);',
          '  float scanBand = exp(-pow((vWorldPos.y - uScanY) * 9.5, 2.0));',
          '  finalCol = mix(finalCol, mix(vec3(1.0), uIridescentCol, 0.35), clamp(scanBand * 0.92, 0.0, 1.0));',
          '  finalCol += uAccentCol * (focusWindow * uXrayMix * 0.18 * (0.65 + 0.35 * sin(uTime * 3.2)));',
          '  float idleAlpha = mix(0.88, 0.98, fresnel);',
          '  float xrayAlpha = mix(0.14, 0.74, fresnel) * (1.0 - focusWindow * 0.28);',
          '  float alpha = mix(idleAlpha, xrayAlpha, uXrayMix);',
          '  alpha = clamp(alpha + scanBand * 0.35, 0.10, 0.99);',
          '  gl_FragColor = vec4(finalCol, alpha);',
          '}'
        ].join(' '),
        transparent: true,
        depthWrite: false,
        side: THREE.FrontSide
      });
    }

    const maleSkinMat = createVibrantIridescentBodyMaterial();
    const femaleSkinMat = createVibrantIridescentBodyMaterial();
    const allSkinMats = [maleSkinMat, femaleSkinMat];
    let maleBodyObj = null;
    let femaleBodyObj = null;
    // Default to 'female' to match Vibrant Wellness reference hero, toggleable 1-click!
    let currentGender = 'female';

    gltfLoader.load('models/skinF2.glb', (gltf) => {
      femaleBodyObj = gltf.scene;
      femaleBodyObj.visible = (currentGender === 'female');
      femaleBodyObj.traverse(c => {
        if (c.isMesh) {
          c.material = femaleSkinMat;
          c.renderOrder = 12;
        }
      });
      scene.add(femaleBodyObj);
      if (loaderOverlay) loaderOverlay.classList.add('hidden');
    });

    gltfLoader.load('models/skinMB2.glb', (gltf) => {
      maleBodyObj = gltf.scene;
      maleBodyObj.visible = (currentGender === 'male');
      maleBodyObj.traverse(c => {
        if (c.isMesh) {
          c.material = maleSkinMat;
          c.renderOrder = 12;
        }
      });
      scene.add(maleBodyObj);
      if (loaderOverlay) loaderOverlay.classList.add('hidden');
    });

    // 2.2 Smooth Lifelike Cel-Shaded Clay Shader for Internal Organs & Bones (Preserved 100%)
    function createToonClayMaterial(hiHex, midHex, shdHex, outHex, initialOpacity = 0.96, smoothFactor = 0.72) {
      return new THREE.ShaderMaterial({
        uniforms: {
          uHigh:    { value: new THREE.Color(hiHex) },
          uMid:     { value: new THREE.Color(midHex) },
          uShadow:  { value: new THREE.Color(shdHex) },
          uOutline: { value: new THREE.Color(outHex) },
          uOpacity: { value: initialOpacity },
          uCenter:  { value: new THREE.Vector3(0, 0, 0) },
          uSmooth:  { value: smoothFactor },
          uGlow:    { value: 0.0 }
        },
        vertexShader: [
          'uniform vec3 uCenter;',
          'varying vec3 vNormal;',
          'varying vec3 vRadial;',
          'varying vec3 vViewDir;',
          'void main() {',
          '  vec4 mvPos = modelViewMatrix * vec4(position, 1.0);',
          '  vViewDir = normalize(-mvPos.xyz);',
          '  vNormal = normalize(normalMatrix * normal);',
          '  vec3 radLocal = position - uCenter;',
          '  float rLen = length(radLocal);',
          '  vRadial = rLen > 0.0001 ? normalize(normalMatrix * (radLocal / rLen)) : vNormal;',
          '  gl_Position = projectionMatrix * mvPos;',
          '}'
        ].join(' '),
        fragmentShader: [
          'uniform vec3 uHigh;',
          'uniform vec3 uMid;',
          'uniform vec3 uShadow;',
          'uniform vec3 uOutline;',
          'uniform float uOpacity;',
          'uniform float uSmooth;',
          'uniform float uGlow;',
          'varying vec3 vNormal;',
          'varying vec3 vRadial;',
          'varying vec3 vViewDir;',
          'void main() {',
          '  if (uOpacity <= 0.01) discard;',
          '  vec3 N = normalize(mix(normalize(vNormal), normalize(vRadial), uSmooth));',
          '  vec3 V = normalize(vViewDir);',
          '  vec3 L = normalize(vec3(0.38, 0.72, 0.68));',
          '  float nl = dot(N, L) * 0.5 + 0.5;',
          '  float nv = clamp(abs(dot(N, V)), 0.0, 1.0);',
          '  float band1 = smoothstep(0.35, 0.42, nl);',
          '  float band2 = smoothstep(0.65, 0.72, nl);',
          '  vec3 col = mix(uShadow, uMid, band1);',
          '  col = mix(col, uHigh, band2);',
          '  vec3 H = normalize(L + V);',
          '  float spec = smoothstep(0.88, 0.95, max(0.0, dot(N, H)));',
          '  col = mix(col, vec3(0.99, 0.99, 1.0), spec * 0.48);',
          '  float ink = smoothstep(0.75, 0.88, 1.0 - nv);',
          '  col = mix(col, uOutline, ink * 0.62);',
          '  col += uHigh * (uGlow * (1.0 - nv) * 0.45);',
          '  gl_FragColor = vec4(col, uOpacity);',
          '}'
        ].join(' '),
        transparent: true,
        depthWrite: true
      });
    }

    // 2.3 Skeleton & Intervertebral Discs (Preserved 100%)
    const boneIllustrationMap = {};
    gltfLoader.load('models/Skeleton.glb', (gltf) => {
      gltf.scene.traverse(c => {
        if (c.isMesh) {
          const gName = c.name || c.parent?.name || '';
          if (gName.includes('Skull') || gName.includes('ThoracicRibcage') || gName.includes('UpperLimbs')) {
            c.visible = false;
            return;
          }
          c.geometry.computeBoundingBox();
          const center = new THREE.Vector3();
          c.geometry.boundingBox.getCenter(center);
          const isGP = gName.includes('KneeGrowthPlate');
          const mat = isGP
            ? createToonClayMaterial('#6EE7B7', '#10B981', '#047857', '#064E3B', 0.0, 0.25)
            : createToonClayMaterial('#FAF5EB', '#E4D5BD', '#BCA280', '#4D3722', 0.0, 0.22);
          mat.uniforms.uCenter.value.copy(center);
          c.material = mat;
          c.renderOrder = isGP ? 6 : 3;
          boneIllustrationMap[gName] = { mesh: c, mat: mat, isGP: isGP };
        }
      });
      scene.add(gltf.scene);
      updateAnatomyHighlight();
    });

    function createSpinalDiscs3DGroup() {
      const group = new THREE.Group();
      const discMat = createToonClayMaterial('#9BE8FA', '#38BDF8', '#0284C7', '#0C4A6E', 0.0, 0.30);
      const highlightDiscMat = createToonClayMaterial('#C4F5FF', '#22D3EE', '#0891B2', '#164E63', 0.0, 0.25);

      const lumbarDiscSpecs = [
        { y: 2.935, z: -0.042, rx: 0.044, rz: 0.034, h: 0.022, tilt: 0.03, highlight: false },
        { y: 2.845, z: -0.038, rx: 0.047, rz: 0.036, h: 0.024, tilt: 0.05, highlight: false },
        { y: 2.752, z: -0.035, rx: 0.050, rz: 0.038, h: 0.025, tilt: 0.08, highlight: true  },
        { y: 2.660, z: -0.038, rx: 0.052, rz: 0.039, h: 0.026, tilt: 0.14, highlight: true  },
        { y: 2.572, z: -0.046, rx: 0.050, rz: 0.037, h: 0.024, tilt: 0.22, highlight: true  }
      ];
      lumbarDiscSpecs.forEach(d => {
        const geo = new THREE.CylinderGeometry(d.rx, d.rx, d.h, 32, 1);
        geo.scale(1.0, 1.0, d.rz / d.rx);
        const mesh = new THREE.Mesh(geo, d.highlight ? highlightDiscMat : discMat);
        mesh.position.set(0, d.y, d.z);
        mesh.rotation.x = d.tilt;
        mesh.renderOrder = 6;
        group.add(mesh);
      });

      const cervicalDiscSpecs = [
        { y: 3.865, z: -0.072, r: 0.026, h: 0.015 },
        { y: 3.795, z: -0.075, r: 0.028, h: 0.016 },
        { y: 3.725, z: -0.078, r: 0.030, h: 0.016 },
        { y: 3.655, z: -0.082, r: 0.032, h: 0.017 }
      ];
      cervicalDiscSpecs.forEach(d => {
        const geo = new THREE.CylinderGeometry(d.r, d.r, d.h, 28, 1);
        geo.scale(1.0, 1.0, 0.78);
        const mesh = new THREE.Mesh(geo, discMat);
        mesh.position.set(0, d.y, d.z);
        mesh.rotation.x = -0.06;
        mesh.renderOrder = 6;
        group.add(mesh);
      });

      const pubGeo = new THREE.BoxGeometry(0.018, 0.055, 0.028);
      const pubMesh = new THREE.Mesh(pubGeo, discMat);
      pubMesh.position.set(0, 2.20, 0.068);
      pubMesh.renderOrder = 6;
      group.add(pubMesh);

      group.visible = false;
      scene.add(group);
      return { group, mats: [discMat, highlightDiscMat] };
    }
    const spinalDiscs3D = createSpinalDiscs3DGroup();

    // 2.4 Lifelike Natural Colored Internal Organs (Preserved 100%)
    const loadedOrgans = {};
    const STYLIZED_ORGANS = [
      { key: 'brain',     file: 'models/brain.glb',     parts: ['gongjindan', 'cervical', 'syncope'], smooth: 0.80, activeCols: ['#F7D6CE', '#E2A89B', '#B37668', '#5E3830'] },
      { key: 'heart',     file: 'models/heart.glb',     parts: ['gongjindan', 'syncope'],             smooth: 0.65, activeCols: ['#F0756C', '#C9463E', '#912923', '#4A120F'] },
      { key: 'liver',     file: 'models/liver.glb',     parts: ['gut', 'digest'],                     smooth: 0.72, activeCols: ['#CC6E5E', '#A34B3C', '#732E22', '#3D150E'] },
      { key: 'stomach',   file: 'models/stomach.glb',   parts: ['digest', 'gut'],                     smooth: 0.68, activeCols: ['#F7B29C', '#DB846B', '#A85742', '#54271B'] },
      { key: 'intestine', file: 'models/intestine.glb', parts: ['digest', 'gut'],                     smooth: 0.80, activeCols: ['#F2C2B3', '#D49887', '#A16858', '#523127'] },
      { key: 'kidneys',   file: 'models/kidneys2.glb',  parts: ['lumbar', 'prostate'],                smooth: 0.66, activeCols: ['#D4746A', '#AB4E45', '#782F28', '#3D1410'] },
      { key: 'thyroid',   file: 'models/thyroid.glb',   parts: ['cervical'],                          smooth: 0.62, activeCols: ['#F0A096', '#CC7066', '#94463D', '#4A1F1A'] }
    ];

    STYLIZED_ORGANS.forEach(cfg => {
      gltfLoader.load(cfg.file, (gltf) => {
        const mat = createToonClayMaterial(...cfg.activeCols, 0.0, cfg.smooth);
        const rootMesh = gltf.scene.children[0] || gltf.scene;
        if (cfg.key === 'brain' && rootMesh) {
          rootMesh.scale.multiplyScalar(0.86);
          rootMesh.position.y -= 0.042;
        }
        gltf.scene.traverse(c => {
          if (c.isMesh) {
            c.geometry.computeBoundingBox();
            const center = new THREE.Vector3();
            c.geometry.boundingBox.getCenter(center);
            mat.uniforms.uCenter.value.copy(center);
            c.material = mat;
            c.renderOrder = 4;
          }
        });
        gltf.scene.visible = false;
        scene.add(gltf.scene);
        loadedOrgans[cfg.key] = { scene: gltf.scene, mesh: rootMesh, mat: mat, cfg: cfg, baseScale: gltf.scene.scale.clone() };
        updateAnatomyHighlight();
      });
    });

    // 2.5 Custom 3D Uterus + Fallopian Tubes + Ovaries (Preserved 100%)
    function createUterus3DGroup() {
      const group = new THREE.Group();
      group.position.set(0.0, 2.42, 0.02);
      const uterusMat = createToonClayMaterial('#F4979D', '#D15E67', '#96363E', '#4F181D', 0.98, 0.35);
      const ovaryMat  = createToonClayMaterial('#FAF0E4', '#E2CBB5', '#B89E84', '#5C4632', 0.98, 0.35);
      const glowMat   = createToonClayMaterial('#FFDAD0', '#FA9E8E', '#C96B5B', '#7A3328', 0.98, 0.25);

      const lathePts = [
        new THREE.Vector2(0.000, -0.085), new THREE.Vector2(0.016, -0.080),
        new THREE.Vector2(0.018, -0.045), new THREE.Vector2(0.026, -0.010),
        new THREE.Vector2(0.044,  0.030), new THREE.Vector2(0.052,  0.058),
        new THREE.Vector2(0.038,  0.076), new THREE.Vector2(0.000,  0.082)
      ];
      const bodyGeo = new THREE.LatheGeometry(lathePts, 36);
      bodyGeo.scale(1.0, 1.0, 0.62);
      const bodyMesh = new THREE.Mesh(bodyGeo, uterusMat);
      bodyMesh.renderOrder = 6;
      group.add(bodyMesh);

      const coreGeo = new THREE.SphereGeometry(0.022, 24, 24);
      coreGeo.scale(1.0, 1.25, 0.72);
      const coreMesh = new THREE.Mesh(coreGeo, glowMat);
      coreMesh.position.set(0, 0.032, 0.018);
      coreMesh.renderOrder = 7;
      group.add(coreMesh);

      [-1, 1].forEach(dir => {
        const tubeCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(dir * 0.040, 0.058,  0.000),
          new THREE.Vector3(dir * 0.082, 0.068, -0.004),
          new THREE.Vector3(dir * 0.125, 0.052, -0.008),
          new THREE.Vector3(dir * 0.142, 0.022, -0.006),
          new THREE.Vector3(dir * 0.126, 0.004, -0.004)
        ]);
        const tubeMesh = new THREE.Mesh(new THREE.TubeGeometry(tubeCurve, 32, 0.0095, 16, false), uterusMat);
        tubeMesh.renderOrder = 6;
        group.add(tubeMesh);

        const ovGeo = new THREE.SphereGeometry(0.022, 24, 24);
        ovGeo.scale(1.25, 0.85, 0.70);
        const ovMesh = new THREE.Mesh(ovGeo, ovaryMat);
        ovMesh.position.set(dir * 0.105, 0.008, -0.004);
        ovMesh.rotation.z = dir * 0.25;
        ovMesh.renderOrder = 6;
        group.add(ovMesh);

        const ligCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(dir * 0.036, 0.032, 0.000),
          new THREE.Vector3(dir * 0.086, 0.012, -0.004)
        ]);
        const ligMesh = new THREE.Mesh(new THREE.TubeGeometry(ligCurve, 12, 0.0045, 10, false), ovaryMat);
        ligMesh.renderOrder = 6;
        group.add(ligMesh);
      });

      group.visible = false;
      scene.add(group);
      return { group, mats: [uterusMat, ovaryMat, glowMat] };
    }
    const uterus3D = createUterus3DGroup();

    // 2.6 Custom 3D Prostate + Urinary Bladder + Ureters (Preserved 100%)
    function createProstate3DGroup() {
      const group = new THREE.Group();
      group.position.set(0.0, 2.26, 0.03);
      const bladderMat  = createToonClayMaterial('#F0B594', '#D18B66', '#9E5D3C', '#522B18', 0.98, 0.35);
      const prostateMat = createToonClayMaterial('#E0756C', '#B84B43', '#822923', '#47120E', 0.98, 0.35);
      const tractMat    = createToonClayMaterial('#FAE8C8', '#DEC296', '#B09264', '#59462A', 0.98, 0.30);

      const blGeo = new THREE.SphereGeometry(0.058, 32, 32);
      blGeo.scale(1.12, 0.92, 0.85);
      const blMesh = new THREE.Mesh(blGeo, bladderMat);
      blMesh.position.set(0, 0.062, 0.004);
      blMesh.renderOrder = 6;
      group.add(blMesh);

      [-1, 1].forEach(dir => {
        const lobeGeo = new THREE.SphereGeometry(0.028, 28, 28);
        lobeGeo.scale(0.95, 1.05, 0.85);
        const lobeMesh = new THREE.Mesh(lobeGeo, prostateMat);
        lobeMesh.position.set(dir * 0.014, -0.004, 0.002);
        lobeMesh.renderOrder = 7;
        group.add(lobeMesh);
      });

      const urethraCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0,  0.045, 0.018),
        new THREE.Vector3(0, -0.005, 0.018),
        new THREE.Vector3(0, -0.058, 0.016)
      ]);
      const urethraMesh = new THREE.Mesh(new THREE.TubeGeometry(urethraCurve, 20, 0.0055, 12, false), tractMat);
      urethraMesh.renderOrder = 8;
      group.add(urethraMesh);

      [-1, 1].forEach(dir => {
        const ureterCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(dir * 0.046, 0.088, -0.010),
          new THREE.Vector3(dir * 0.062, 0.165, -0.020),
          new THREE.Vector3(dir * 0.072, 0.250, -0.030)
        ]);
        const ureterMesh = new THREE.Mesh(new THREE.TubeGeometry(ureterCurve, 20, 0.0048, 10, false), tractMat);
        ureterMesh.renderOrder = 6;
        group.add(ureterMesh);
      });

      group.visible = false;
      scene.add(group);
      return { group, mats: [bladderMat, prostateMat, tractMat] };
    }
    const prostate3D = createProstate3DGroup();

    // 2.7 Vascular.glb + Autonomic Nervous System + Gongjindan Bridge (Preserved 100%)
    function createVascularMaterial(highHex, midHex, shadowHex, outlineHex, opacity) {
      return new THREE.ShaderMaterial({
        uniforms: {
          uHigh:    { value: new THREE.Color(highHex) },
          uMid:     { value: new THREE.Color(midHex) },
          uShadow:  { value: new THREE.Color(shadowHex) },
          uOutline: { value: new THREE.Color(outlineHex) },
          uOpacity: { value: opacity }
        },
        vertexShader: [
          'varying vec3 vNormal;',
          'varying vec3 vViewDir;',
          'varying vec3 vLocalPos;',
          'void main() {',
          '  vLocalPos = position;',
          '  vec4 mvPos = modelViewMatrix * vec4(position, 1.0);',
          '  vViewDir = normalize(-mvPos.xyz);',
          '  vNormal = normalize(normalMatrix * normal);',
          '  gl_Position = projectionMatrix * mvPos;',
          '}'
        ].join(' '),
        fragmentShader: [
          'uniform vec3 uHigh;',
          'uniform vec3 uMid;',
          'uniform vec3 uShadow;',
          'uniform vec3 uOutline;',
          'uniform float uOpacity;',
          'varying vec3 vNormal;',
          'varying vec3 vViewDir;',
          'varying vec3 vLocalPos;',
          'void main() {',
          '  if (vLocalPos.y > 1.92 && vLocalPos.y < 2.38 && abs(vLocalPos.x) < 0.092) discard;',
          '  vec3 N = normalize(vNormal);',
          '  vec3 V = normalize(vViewDir);',
          '  vec3 L = normalize(vec3(0.38, 0.72, 0.68));',
          '  float nl = dot(N, L) * 0.5 + 0.5;',
          '  float nv = clamp(abs(dot(N, V)), 0.0, 1.0);',
          '  vec3 col = mix(uShadow, uMid, smoothstep(0.35, 0.44, nl));',
          '  col = mix(col, uHigh, smoothstep(0.65, 0.74, nl));',
          '  col = mix(col, uOutline, smoothstep(0.74, 0.86, 1.0 - nv) * 0.65);',
          '  gl_FragColor = vec4(col, uOpacity);',
          '}'
        ].join(' '),
        transparent: true,
        depthWrite: true
      });
    }

    let vascularGroup = null;
    gltfLoader.load('models/Vascular.glb', (gltf) => {
      vascularGroup = gltf.scene;
      vascularGroup.visible = false;
      const artMat = createVascularMaterial('#F06A64', '#C93E38', '#8C1F1B', '#4D0E0B', 0.88);
      const venMat = createVascularMaterial('#74ACFA', '#427CD1', '#224C87', '#112A4D', 0.85);
      vascularGroup.traverse(c => {
        if (c.isMesh) {
          c.material = (c.name || '').includes('Venous') ? venMat : artMat;
          c.renderOrder = 5;
        }
      });
      scene.add(vascularGroup);
      updateAnatomyHighlight();
    });

    function createAutonomicNerve3DGroup() {
      const group = new THREE.Group();
      const nerveMat = createToonClayMaterial('#FFF3A8', '#FACC15', '#CA8A04', '#713F12', 0.98, 0.20);
      [
        [0.0, 4.10, -0.02, 0.024],
        [0.03, 3.52, 0.04, 0.020],
        [0.0, 3.12, 0.03, 0.022],
        [0.0, 2.48, 0.02, 0.018]
      ].forEach(([x, y, z, r]) => {
        const node = new THREE.Mesh(new THREE.SphereGeometry(r, 20, 20), nerveMat);
        node.position.set(x, y, z);
        node.renderOrder = 8;
        group.add(node);
      });

      [-1, 1].forEach(dir => {
        const vagusPath = new THREE.CatmullRomCurve3([
          new THREE.Vector3(dir * 0.022, 4.12, -0.02),
          new THREE.Vector3(dir * 0.038, 3.85,  0.00),
          new THREE.Vector3(dir * 0.042, 3.52,  0.03),
          new THREE.Vector3(dir * 0.028, 3.12,  0.03),
          new THREE.Vector3(dir * 0.035, 2.75,  0.01),
          new THREE.Vector3(dir * 0.045, 2.45,  0.00),
          new THREE.Vector3(dir * 0.115, 1.85, -0.04),
          new THREE.Vector3(dir * 0.145, 1.20, -0.08),
          new THREE.Vector3(dir * 0.155, 0.55, -0.08)
        ]);
        const vagusMesh = new THREE.Mesh(new THREE.TubeGeometry(vagusPath, 64, 0.0075, 12, false), nerveMat);
        vagusMesh.renderOrder = 8;
        group.add(vagusMesh);

        const armPath = new THREE.CatmullRomCurve3([
          new THREE.Vector3(dir * 0.040, 3.78,  0.00),
          new THREE.Vector3(dir * 0.180, 3.62, -0.02),
          new THREE.Vector3(dir * 0.310, 3.15, -0.03),
          new THREE.Vector3(dir * 0.420, 2.55,  0.02)
        ]);
        const armMesh = new THREE.Mesh(new THREE.TubeGeometry(armPath, 32, 0.0055, 10, false), nerveMat);
        armMesh.renderOrder = 8;
        group.add(armMesh);
      });

      group.visible = false;
      scene.add(group);
      return group;
    }
    const autonomicNerveGroup = createAutonomicNerve3DGroup();

    function createGongjindanBridgeGroup() {
      const group = new THREE.Group();
      const goldMat = createToonClayMaterial('#FFF4B8', '#F59E0B', '#B45309', '#5E4306', 0.96, 0.20);
      [-1, 1].forEach(dir => {
        const curve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(dir * 0.025, 3.52, 0.04),
          new THREE.Vector3(dir * 0.048, 3.88, 0.02),
          new THREE.Vector3(dir * 0.032, 4.26, 0.00)
        ]);
        const m = new THREE.Mesh(new THREE.TubeGeometry(curve, 32, 0.0075, 12, false), goldMat);
        m.renderOrder = 7;
        group.add(m);
      });
      group.visible = false;
      scene.add(group);
      return group;
    }
    const gongjindanBridgeGroup = createGongjindanBridgeGroup();

    // ========================================================================
    // 2.8 VIBRANT 3D AMBIENT BOKEH MOTES + DYNAMIC 3D GRAPHIC MOTION RIG!
    // ========================================================================
    // Soft Radial Glow Sprite Texture Generator (Procedural CanvasTexture)
    function makeSoftGlowTexture(innerRgba, midRgba) {
      const c = document.createElement('canvas');
      c.width = 64; c.height = 64;
      const ctx = c.getContext('2d');
      const g = ctx.createRadialGradient(32, 32, 2, 32, 32, 30);
      g.addColorStop(0.0, innerRgba);
      g.addColorStop(0.42, midRgba);
      g.addColorStop(1.0, 'rgba(255,255,255,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 64, 64);
      const tex = new THREE.CanvasTexture(c);
      tex.needsUpdate = true;
      return tex;
    }
    const bokehTex = makeSoftGlowTexture('rgba(255,255,255,0.92)', 'rgba(224,234,255,0.42)');
    const photonTex = makeSoftGlowTexture('rgba(255,255,255,1.0)', 'rgba(147,197,253,0.65)');

    // A) Floating Ambient Pearl Bokeh Motes (matching Vibrant Wellness background)
    const BOKEH_COUNT = 85;
    const bokehGeo = new THREE.BufferGeometry();
    const bokehPos = new Float32Array(BOKEH_COUNT * 3);
    const bokehSeeds = new Float32Array(BOKEH_COUNT * 3);
    for (let i = 0; i < BOKEH_COUNT; i++) {
      bokehPos[i * 3 + 0] = (Math.random() - 0.35) * 4.6;
      bokehPos[i * 3 + 1] = 0.8 + Math.random() * 4.2;
      bokehPos[i * 3 + 2] = -0.6 - Math.random() * 2.2;
      bokehSeeds[i * 3 + 0] = Math.random() * Math.PI * 2;
      bokehSeeds[i * 3 + 1] = 0.25 + Math.random() * 0.55;
      bokehSeeds[i * 3 + 2] = bokehPos[i * 3 + 1];
    }
    bokehGeo.setAttribute('position', new THREE.BufferAttribute(bokehPos, 3));
    const bokehMat = new THREE.PointsMaterial({
      size: 0.085,
      map: bokehTex,
      transparent: true,
      opacity: 0.62,
      depthWrite: false
    });
    const ambientBokehPoints = new THREE.Points(bokehGeo, bokehMat);
    ambientBokehPoints.renderOrder = 1;
    scene.add(ambientBokehPoints);

    // B) 3D Counter-Rotating Holographic Orbital Gyro-Rings & Energy Halo around Active Organ!
    const motionRigGroup = new THREE.Group();
    motionRigGroup.position.set(0, 3.2, 0);
    motionRigGroup.scale.setScalar(0.001);
    motionRigGroup.visible = false;

    const ringMatOuter = new THREE.MeshBasicMaterial({
      color: 0x60A5FA,
      transparent: true,
      opacity: 0.68,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const ringMatInner = new THREE.MeshBasicMaterial({
      color: 0xFFFFFF,
      transparent: true,
      opacity: 0.82,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const haloDiscMat = new THREE.MeshBasicMaterial({
      color: 0x93C5FD,
      transparent: true,
      opacity: 0.16,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const gyroOuter = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.0042, 16, 96), ringMatOuter);
    gyroOuter.rotation.x = Math.PI * 0.42;
    gyroOuter.renderOrder = 18;
    motionRigGroup.add(gyroOuter);

    const gyroInner = new THREE.Mesh(new THREE.TorusGeometry(0.23, 0.0034, 16, 84), ringMatInner);
    gyroInner.rotation.x = -Math.PI * 0.34;
    gyroInner.rotation.y = Math.PI * 0.22;
    gyroInner.renderOrder = 19;
    motionRigGroup.add(gyroInner);

    const gyroEquatorial = new THREE.Mesh(new THREE.RingGeometry(0.16, 0.31, 64), haloDiscMat);
    gyroEquatorial.rotation.x = -Math.PI * 0.5;
    gyroEquatorial.renderOrder = 17;
    motionRigGroup.add(gyroEquatorial);

    scene.add(motionRigGroup);

    // C) 3D Flowing Bio-Signal Pathway Particles along Anatomical Curves!
    const PATH_PHOTON_COUNT = 96;
    const photonGeo = new THREE.BufferGeometry();
    const photonPositions = new Float32Array(PATH_PHOTON_COUNT * 3);
    const photonOffsets = new Float32Array(PATH_PHOTON_COUNT);
    for (let i = 0; i < PATH_PHOTON_COUNT; i++) {
      photonOffsets[i] = i / PATH_PHOTON_COUNT;
    }
    photonGeo.setAttribute('position', new THREE.BufferAttribute(photonPositions, 3));
    const photonMat = new THREE.PointsMaterial({
      size: 0.052,
      map: photonTex,
      color: 0x93C5FD,
      transparent: true,
      opacity: 0.92,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const pathwayParticles = new THREE.Points(photonGeo, photonMat);
    pathwayParticles.visible = false;
    pathwayParticles.renderOrder = 20;
    scene.add(pathwayParticles);

    const ANATOMY_MOTION_CURVES = {
      syncope: new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.00, 4.30, 0.02),
        new THREE.Vector3(0.03, 3.88, 0.01),
        new THREE.Vector3(0.03, 3.52, 0.05),
        new THREE.Vector3(0.00, 3.12, 0.03),
        new THREE.Vector3(0.08, 2.45, 0.01),
        new THREE.Vector3(0.13, 1.65, -0.03)
      ]),
      cervical: new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.00, 3.58, -0.05),
        new THREE.Vector3(0.00, 3.82, -0.06),
        new THREE.Vector3(0.00, 4.08, -0.03),
        new THREE.Vector3(0.00, 4.38,  0.02),
        new THREE.Vector3(0.00, 4.52,  0.00)
      ]),
      lumbar: new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.00, 3.05, -0.04),
        new THREE.Vector3(0.00, 2.82, -0.04),
        new THREE.Vector3(0.00, 2.64, -0.04),
        new THREE.Vector3(0.06, 2.38, -0.02),
        new THREE.Vector3(0.12, 1.95, -0.04)
      ]),
      gongjindan: new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.03, 3.50, 0.05),
        new THREE.Vector3(-0.05, 3.86, 0.03),
        new THREE.Vector3( 0.00, 4.28, 0.01),
        new THREE.Vector3( 0.05, 3.86, 0.03),
        new THREE.Vector3( 0.03, 3.50, 0.05)
      ], true),
      digest: new THREE.CatmullRomCurve3([
        new THREE.Vector3( 0.00, 3.58, 0.03),
        new THREE.Vector3( 0.06, 3.24, 0.07),
        new THREE.Vector3(-0.04, 3.06, 0.07),
        new THREE.Vector3( 0.05, 2.86, 0.06),
        new THREE.Vector3(-0.04, 2.72, 0.05)
      ]),
      gut: new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.12, 3.18, 0.06),
        new THREE.Vector3( 0.00, 3.24, 0.09),
        new THREE.Vector3( 0.12, 3.10, 0.06),
        new THREE.Vector3( 0.00, 2.90, 0.08),
        new THREE.Vector3(-0.12, 3.02, 0.06)
      ], true),
      uterus: new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.12, 2.44, 0.02),
        new THREE.Vector3(-0.05, 2.48, 0.04),
        new THREE.Vector3( 0.00, 2.42, 0.05),
        new THREE.Vector3( 0.05, 2.48, 0.04),
        new THREE.Vector3( 0.12, 2.44, 0.02)
      ]),
      prostate: new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.07, 2.52, -0.01),
        new THREE.Vector3( 0.00, 2.33,  0.04),
        new THREE.Vector3( 0.00, 2.24,  0.05),
        new THREE.Vector3( 0.07, 2.52, -0.01)
      ]),
      knee: new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.14, 1.56, 0.02),
        new THREE.Vector3(0.15, 1.24, 0.05),
        new THREE.Vector3(0.15, 1.16, 0.05),
        new THREE.Vector3(0.15, 0.86, 0.02)
      ])
    };

    // Motion State Variables
    let targetXrayMix = 0.0;
    let currentXrayMix = 0.0;
    let scanWaveActive = false;
    let scanWaveY = 4.8;
    let rigTargetPos = new THREE.Vector3(0, 3.2, 0);
    let rigTargetScale = 0.001;
    let activeMotionCurve = null;

    // ========================================================================
    // 3. VIBRANT DOUBLE-RING 3D HOTSPOTS + CASCADING SUB-HOTSPOTS
    // ========================================================================
    const HOTSPOT_3D_ANCHORS = {
      syncope:    [ 0.00, 4.35,  0.11], // Forehead / Neuro-Autonomic (matches Vibrant top dot!)
      cervical:   [ 0.00, 3.88,  0.09], // Neck / Cervical & Scalp Thermoregulation
      gongjindan: [ 0.02, 3.52,  0.14], // Heart-Thoracic Vitality
      digest:     [-0.08, 3.24,  0.14], // Stomach / Epigastric Motility
      gut:        [ 0.00, 2.94,  0.14], // Navel / Metabolic Visceral Core
      lumbar:     [ 0.13, 2.74,  0.08], // Lumbar Spine & Pelvis
      uterus:     [-0.08, 2.44,  0.11], // Uterus / Ovarian Reproductive
      prostate:   [ 0.08, 2.26,  0.11], // Prostate / Bladder Pelvic Floor
      knee:       [ 0.15, 1.20,  0.09]  // Pediatric Knee Growth Plate
    };

    const majorHotspotNodes = [];
    BODY_PARTS_DATA.forEach((part) => {
      const anchor = HOTSPOT_3D_ANCHORS[part.id] || [0, 3.0, 0.1];
      const dom = document.createElement('div');
      dom.className = 'vibrant-hotspot';
      dom.setAttribute('data-hpart', part.id);
      dom.innerHTML =
        '<div class="vh-dot-outer"><div class="vh-dot-core"></div></div>' +
        '<div class="vh-hover-pill">' + part.shortName + '</div>';
      dom.addEventListener('click', (e) => {
        e.stopPropagation();
        window.activateClinicMotion(part.id);
      });
      hotspotLayer.appendChild(dom);
      majorHotspotNodes.push({
        id: part.id,
        part: part,
        dom: dom,
        worldPos: new THREE.Vector3(...anchor)
      });
    });

    // Secondary Sub-Focus 3D Callout Nodes (Activated sequentially after main clinic click!)
    const subHotspotLayer = document.getElementById('sub-hotspot-overlay-layer');
    let activeSubHotspotNodes = [];

    window.spawnSubHotspots3D = function(subPoints) {
      if (!subHotspotLayer) return;
      subHotspotLayer.innerHTML = '';
      activeSubHotspotNodes = [];
      if (!Array.isArray(subPoints)) return;

      subPoints.forEach((sp, idx) => {
        const dom = document.createElement('button');
        dom.type = 'button';
        dom.className = 'sub-focus-3d-pill';
        dom.style.transitionDelay = (180 + idx * 95) + 'ms';
        dom.innerHTML = '<span class="sf-dot"></span><span>' + sp.label + '</span>';
        dom.addEventListener('click', (e) => {
          e.stopPropagation();
          document.querySelectorAll('.sub-focus-3d-pill').forEach(el => el.classList.remove('active'));
          dom.classList.add('active');
          window.focusSubPoint3D(sp);
        });
        subHotspotLayer.appendChild(dom);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => dom.classList.add('visible'));
        });
        activeSubHotspotNodes.push({
          dom,
          worldPos: new THREE.Vector3(...sp.pos3D)
        });
      });
    };

    // ========================================================================
    // 4. CAMERA FLY-TO & ANATOMY X-RAY HIGHLIGHT CONTROLLER
    // ========================================================================
    const camGoalPos = HERO_OVERVIEW_POS.clone();
    const camGoalTarget = HERO_OVERVIEW_TARGET.clone();
    let isCameraFlying = false;
    let isOverviewMode = true;

    controls.addEventListener('start', () => {
      isCameraFlying = false;
    });

    function updateAnatomyHighlight() {
      const active = !isOverviewMode && Boolean(currentPartId);

      uterus3D.group.visible = active && (currentPartId === 'uterus');
      prostate3D.group.visible = active && (currentPartId === 'prostate');
      if (vascularGroup) vascularGroup.visible = active && (currentPartId === 'syncope');
      autonomicNerveGroup.visible = active && (currentPartId === 'syncope');
      gongjindanBridgeGroup.visible = active && (currentPartId === 'gongjindan');

      const boneHighlightMap = {
        knee:       ['KneeJointBones', 'KneeGrowthPlate', 'LowerLimbs'],
        cervical:   ['CervicalSpine'],
        lumbar:     ['LumbarSpine', 'Pelvis'],
        gongjindan: ['CervicalSpine'],
        syncope:    [],
        digest:     ['LumbarSpine'],
        gut:        ['LumbarSpine'],
        uterus:     ['Pelvis', 'LumbarSpine'],
        prostate:   ['Pelvis', 'LumbarSpine']
      };
      const activeBones = active ? (boneHighlightMap[currentPartId] || []) : [];

      Object.keys(boneIllustrationMap).forEach(gName => {
        const entry = boneIllustrationMap[gName];
        if (!active) {
          entry.mesh.visible = false;
          entry.mat.uniforms.uOpacity.value = 0.0;
          return;
        }
        const isMatched = activeBones.some(b => gName.includes(b)) || (currentPartId === 'knee' && entry.isGP);
        entry.mesh.visible = true;
        entry.mat.uniforms.uOpacity.value = isMatched ? 0.96 : 0.16;
        entry.mat.uniforms.uGlow.value = isMatched ? 1.0 : 0.0;
        entry.mat.depthWrite = isMatched;
      });

      if (spinalDiscs3D && spinalDiscs3D.group) {
        const showDiscs = active && ['lumbar', 'cervical', 'uterus', 'prostate'].includes(currentPartId);
        spinalDiscs3D.group.visible = showDiscs;
        const discAlpha = (currentPartId === 'lumbar' || currentPartId === 'cervical') ? 0.98 : 0.72;
        spinalDiscs3D.mats.forEach(m => {
          m.uniforms.uOpacity.value = showDiscs ? discAlpha : 0.0;
          m.uniforms.uGlow.value = (currentPartId === 'lumbar' || currentPartId === 'cervical') ? 1.0 : 0.2;
        });
      }

      Object.keys(loadedOrgans).forEach(key => {
        const entry = loadedOrgans[key];
        if (!active) {
          entry.scene.visible = false;
          entry.mat.uniforms.uOpacity.value = 0.0;
          return;
        }
        const isTarget = entry.cfg.parts.includes(currentPartId);
        entry.scene.visible = isTarget;
        entry.mat.uniforms.uOpacity.value = isTarget ? 0.97 : 0.0;
        entry.mat.uniforms.uGlow.value = isTarget ? 1.0 : 0.0;
        entry.mat.depthWrite = isTarget;
      });
    }
`;

const partB = `
    window.setDonginGender = function(gender) {
      currentGender = (gender === 'male') ? 'male' : 'female';
      document.getElementById('btn-gender-female')?.classList.toggle('active', currentGender === 'female');
      document.getElementById('btn-gender-male')?.classList.toggle('active', currentGender === 'male');
      if (femaleBodyObj) femaleBodyObj.visible = (currentGender === 'female');
      if (maleBodyObj) maleBodyObj.visible = (currentGender === 'male');
    };

    window.trigger3DGraphicMotion = function(partId, preset, accentHex) {
      isOverviewMode = false;
      targetXrayMix = 1.0;
      scanWaveActive = true;
      scanWaveY = 4.72;

      const accentColor = new THREE.Color(accentHex || '#4F6EF7');
      allSkinMats.forEach(m => {
        m.uniforms.uAccentCol.value.copy(accentColor);
        m.uniforms.uFocusCenter.value.set(...preset.pos3D);
        m.uniforms.uFocusRadius.value = preset.focusRadius || 0.62;
      });

      ringMatOuter.color.copy(accentColor);
      haloDiscMat.color.copy(accentColor);
      photonMat.color.copy(accentColor).lerp(new THREE.Color('#FFFFFF'), 0.35);

      rigTargetPos.set(...preset.pos3D);
      rigTargetScale = preset.ringScale || 1.0;
      motionRigGroup.visible = true;

      activeMotionCurve = ANATOMY_MOTION_CURVES[partId] || null;
      pathwayParticles.visible = Boolean(activeMotionCurve);

      camGoalPos.set(...preset.camPos);
      camGoalTarget.set(...preset.camTarget);
      isCameraFlying = true;

      updateAnatomyHighlight();
    };

    window.focusSubPoint3D = function(sp) {
      if (!sp) return;
      rigTargetPos.set(...sp.pos3D);
      rigTargetScale = sp.ringScale || 0.72;
      allSkinMats.forEach(m => {
        m.uniforms.uFocusCenter.value.set(...sp.pos3D);
      });
      if (sp.camPos && sp.camTarget) {
        camGoalPos.set(...sp.camPos);
        camGoalTarget.set(...sp.camTarget);
        isCameraFlying = true;
      }
      if (sp.note && typeof window.updateSubFocusNote === 'function') {
        window.updateSubFocusNote(sp.label, sp.note);
      }
    };

    window.resetToVibrantOverview = function(fullBody = false) {
      isOverviewMode = true;
      currentPartId = null;
      targetXrayMix = 0.0;
      scanWaveActive = true;
      scanWaveY = 4.72;
      rigTargetScale = 0.001;
      activeMotionCurve = null;
      pathwayParticles.visible = false;

      if (subHotspotLayer) subHotspotLayer.innerHTML = '';
      activeSubHotspotNodes = [];

      majorHotspotNodes.forEach(h => {
        h.dom.classList.remove('active', 'dimmed');
      });

      camGoalPos.copy(fullBody ? FULLBODY_OVERVIEW_POS : HERO_OVERVIEW_POS);
      camGoalTarget.copy(fullBody ? FULLBODY_OVERVIEW_TARGET : HERO_OVERVIEW_TARGET);
      isCameraFlying = true;

      updateAnatomyHighlight();
      if (typeof window.onResetMenuDock === 'function') {
        window.onResetMenuDock();
      }
    };

    function resizeRenderer() {
      const w = Math.max(320, window.innerWidth);
      const h = Math.max(320, window.innerHeight);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // Frame the 3D body gracefully at ~33% from left on wide desktop so the right-side Clinic Menu Dock has clear breathing space!
      if (w > 980) {
        camera.setViewOffset(w, h, Math.round(w * 0.165), 0, w, h);
      } else {
        camera.clearViewOffset();
      }
      camera.updateProjectionMatrix();
    }
    window.addEventListener('resize', resizeRenderer);
    resizeRenderer();

    // ========================================================================
    // 5. 60FPS CINEMATIC RENDER & 3D GRAPHIC MOTION LOOP
    // ========================================================================
    const projVec = new THREE.Vector3();
    const clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      const dt = Math.min(clock.getDelta(), 0.05);
      const elapsed = clock.elapsedTime;

      // 1) Smooth Camera Fly-To
      if (isCameraFlying) {
        camera.position.lerp(camGoalPos, 0.075);
        controls.target.lerp(camGoalTarget, 0.085);
        if (camera.position.distanceTo(camGoalPos) < 0.012 && controls.target.distanceTo(camGoalTarget) < 0.012) {
          isCameraFlying = false;
        }
      } else if (isOverviewMode) {
        // Subtle living breathing sway in Vibrant idle overview
        camera.position.x = Math.sin(elapsed * 0.45) * 0.06;
      }
      controls.update();

      // 2) Update Iridescent / X-Ray Skin Uniforms & 3D Bio-Scan Wave
      currentXrayMix += (targetXrayMix - currentXrayMix) * 0.08;
      if (scanWaveActive) {
        scanWaveY -= dt * 3.4;
        if (scanWaveY < 0.1) {
          scanWaveActive = false;
          scanWaveY = -2.0;
        }
      }
      allSkinMats.forEach(m => {
        m.uniforms.uXrayMix.value = currentXrayMix;
        m.uniforms.uScanY.value = scanWaveY;
        m.uniforms.uTime.value = elapsed;
      });

      // 3) Animate Ambient Bokeh Motes
      const bArr = bokehGeo.attributes.position.array;
      for (let i = 0; i < BOKEH_COUNT; i++) {
        const phase = bokehSeeds[i * 3 + 0];
        const spd = bokehSeeds[i * 3 + 1];
        const baseY = bokehSeeds[i * 3 + 2];
        bArr[i * 3 + 1] = baseY + Math.sin(elapsed * spd + phase) * 0.14;
      }
      bokehGeo.attributes.position.needsUpdate = true;

      // 4) Animate 3D Orbital Gyro-Rings & Target Organ Pulse
      if (motionRigGroup.visible) {
        motionRigGroup.position.lerp(rigTargetPos, 0.10);
        const curS = motionRigGroup.scale.x;
        const nextS = curS + (rigTargetScale - curS) * 0.10;
        motionRigGroup.scale.setScalar(Math.max(0.001, nextS));
        gyroOuter.rotation.z = elapsed * 0.85;
        gyroOuter.rotation.y = Math.sin(elapsed * 0.6) * 0.35;
        gyroInner.rotation.z = -elapsed * 1.25;
        gyroInner.rotation.x = -Math.PI * 0.34 + Math.cos(elapsed * 0.8) * 0.22;
        gyroEquatorial.scale.setScalar(0.94 + Math.sin(elapsed * 2.8) * 0.06);
        if (rigTargetScale < 0.01 && nextS < 0.015) {
          motionRigGroup.visible = false;
        }
      }

      // Subtle physiological pulse on active internal organ
      if (!isOverviewMode && currentPartId) {
        const pulse = 1.0 + Math.sin(elapsed * 3.1) * 0.022;
        if (currentPartId === 'uterus') uterus3D.group.scale.setScalar(pulse);
        if (currentPartId === 'prostate') prostate3D.group.scale.setScalar(pulse);
        if (loadedOrgans.heart && loadedOrgans.heart.scene.visible) {
          loadedOrgans.heart.scene.scale.copy(loadedOrgans.heart.baseScale).multiplyScalar(pulse);
        }
      }

      // 5) Animate 3D Bio-Signal Pathway Photons
      if (pathwayParticles.visible && activeMotionCurve) {
        const pArr = photonGeo.attributes.position.array;
        const pt = projVec;
        for (let i = 0; i < PATH_PHOTON_COUNT; i++) {
          const t = (photonOffsets[i] + elapsed * 0.26) % 1.0;
          activeMotionCurve.getPointAt(t, pt);
          const spread = Math.sin(i * 12.7 + elapsed * 2.0) * 0.008;
          pArr[i * 3 + 0] = pt.x + spread;
          pArr[i * 3 + 1] = pt.y;
          pArr[i * 3 + 2] = pt.z + spread;
        }
        photonGeo.attributes.position.needsUpdate = true;
      }

      // 6) Project 3D Hotspots & Sub-Focus Callouts to Full-Screen Viewport
      // Note: camera.projectionMatrix already includes setViewOffset!
      const w = window.innerWidth;
      const h = window.innerHeight;

      majorHotspotNodes.forEach(item => {
        // Hide gender-specific reproductive dot when opposite gender is selected in idle overview
        if (isOverviewMode) {
          if (item.id === 'uterus' && currentGender === 'male') { item.dom.style.opacity = '0'; item.dom.style.pointerEvents = 'none'; return; }
          if (item.id === 'prostate' && currentGender === 'female') { item.dom.style.opacity = '0'; item.dom.style.pointerEvents = 'none'; return; }
        }
        projVec.copy(item.worldPos).project(camera);
        if (projVec.z > 1.0) {
          item.dom.style.opacity = '0';
          item.dom.style.pointerEvents = 'none';
          return;
        }
        const sx = (projVec.x * 0.5 + 0.5) * w;
        const sy = (-projVec.y * 0.5 + 0.5) * h;
        item.dom.style.left = sx.toFixed(1) + 'px';
        item.dom.style.top = sy.toFixed(1) + 'px';
        const inBounds = (sx > 24 && sx < w - 24 && sy > 52 && sy < h - 28);
        item.dom.style.opacity = inBounds ? '' : '0';
        item.dom.style.pointerEvents = inBounds ? 'auto' : 'none';
      });

      activeSubHotspotNodes.forEach(sub => {
        projVec.copy(sub.worldPos).project(camera);
        if (projVec.z > 1.0) {
          sub.dom.style.opacity = '0';
          return;
        }
        const sx = (projVec.x * 0.5 + 0.5) * w;
        const sy = (-projVec.y * 0.5 + 0.5) * h;
        sub.dom.style.left = sx.toFixed(1) + 'px';
        sub.dom.style.top = sy.toFixed(1) + 'px';
      });

      renderer.render(scene, camera);
    }
`;

module.exports = { partA, partB };
