/**
 * BAREUN KOREAN MEDICINE CLINIC - TYPE C: 3D SPATIAL ZOOM-THROUGH (LUSION / IGLOO STYLE) ENGINE
 * (60fps 3D Z-Axis Tunnel Projection, Frameless Spatial Typography & Full-Body 7-Region Pain Recovery)
 *
 * Directed by Art (아트)
 * - Type C (Lusion / Igloo style): Scrolling drives the camera forward along the 3D Z-axis
 *   (Z: 0m -> -1800m), flying THROUGH 3D healing portal gates from scene to scene (Zoom-Through)
 *   rather than swapping static images in a fixed frame.
 * - Frameless 3D Spatial Typography: Story copy & treatment pipeline float and move in 3D Z-depth.
 * - Stage 4 Full-Body 7-Region Pain Recovery: Visualizes head-to-toe recovery across
 *   ①목(Neck) · ②어깨(Shoulder) · ③팔/손목(Arm/Wrist) · ④굽은 척추(Crooked Spine) ·
 *   ⑤허리/골반(Lower Back/Pelvis) · ⑥다리/무릎(Leg/Knee) · ⑦발/발목(Foot/Ankle).
 */

// ============================================================================
// 1. 5-ACT MASTER LIFECYCLE STAGE SPECS (Frameless 3D Spatial Story Layer)
// ============================================================================
const CLINIC_SPECS = [
  {
    step: 1,
    slug: 'pediatric-growth',
    badge: 'SPACE 01 · 난임치료 ➔ 탄생 ➔ 감기면역 ➔ 키성장',
    title: '01. 생명 잉태부터 폭풍 키성장까지',
    mainCopy: '난임 착상 치료 · 소아 감기 면역강화 · 또래 추월 키성장 치료',
    desc: '자궁 온열·착상 치료로 생명이 잉태되는 신비로운 공간을 관통하여, 소아 감기를 이겨내는 면역보약과 또래 친구들 사이에서 작았던 키가 쭈욱 위로 길어지는 성장치료 공간까지 3차원 터널로 이어집니다.',
    link: 'growth.html',
    subPills: ['① 난임·수정치료', '② 아이 탄생', '③ 감기➔면역치료', '④ 작은키➔성장치료'],
    tpLabels: ['① 난임·감기·작은키', '② 착상·면역·성장 포털', '③ 건강탄생 & +20.5cm 성장']
  },
  {
    step: 2,
    slug: 'appetite-zero',
    badge: 'SPACE 02 · 성인 비만 ➔ 비만치료 슬림화',
    title: '02. 성인 비만에서 날씬한 S라인으로',
    mainCopy: '바른 비만치료 한약 복용 · 심부 체지방 분해 & 체형 슬리밍',
    desc: '성인이 되며 급격히 불어난 체중과 내장비만 공간 속으로 전진하여, 바른 비만치료 한약 포털을 통과하는 순간 심부 체지방이 연소되며 날씬하고 탄탄한 S라인으로 변신합니다.',
    link: 'diet-zero.html',
    subPills: ['① 성인 체중증가·비만', '② 바른 비만치료 한약 복용', '③ 날씬한 S라인 완치'],
    tpLabels: ['① 성인 비만·체지방 축적', '② 바른 비만탕약 포털', '③ -14.2kg 슬림 체형 완성']
  },
  {
    step: 3,
    slug: 'scalp-hair',
    badge: 'SPACE 03 · 30대 탈모 ➔ 탈모치료 모발 회복',
    title: '03. 30대 탈모, 뿌리부터 다시 빽빽하게',
    mainCopy: '두피 상열감(熱) 청열 쿨링 · 고농도 모근 재생 약침 발모 치료',
    desc: '30대 스트레스와 두피 열독으로 M자 이마와 정수리가 비어가는 공간에서, 한의사의 고농도 발모 약침·청열 치료 포털을 관통하며 다시 빽빽하고 풍성한 정상 모발로 회복됩니다.',
    link: 'https://pf.kakao.com/_ykxcLK',
    subPills: ['① 30대 M자·정수리 탈모', '② 두피 약침·청열 치료 중', '③ 풍성한 정상 모발 회복'],
    tpLabels: ['① 30대 두피열·탈모 발생', '② 발모약침·청열 포털', '③ 풍성한 정상 흑발 완치']
  },
  {
    step: 4,
    slug: 'pain-chuna',
    badge: 'SPACE 04 · 굽은 척추 & 목·어깨·팔·허리·다리·발 통증 치료',
    title: '04. 굽은 척추와 머리부터 발끝까지 전신 통증 회복',
    mainCopy: '대표원장 1:1 수기 추나 교정 · 목·어깨·팔·척추·허리·다리·발 통증 완치',
    desc: '근무 중 굽은 척추뿐만 아니라 목, 어깨, 팔·손목, 허리·골반, 다리·무릎, 발·발목까지 이어진 전신 통증이 대표원장님의 1:1 추나 수기 교정과 약침 치료 포털을 통과하며 머리부터 발끝까지 반듯하게 회복됩니다.',
    link: 'https://naver.me/5U1ELn8L',
    subPills: ['① 척추·목·어깨·팔·허리·다리·발 통증', '② 원장님 1:1 전신 추나·약침', '③ 전신 수직정렬 & 무통증 완치'],
    tpLabels: ['① 척추·목·어깨·팔·다리·발 통증', '② 1:1 전신 추나·약침 포털', '③ 전신 바른정렬 & 통증 완치']
  },
  {
    step: 5,
    slug: 'gongjindan',
    badge: 'SPACE 05 · 기력저하·성인병 ➔ 황제공진단 ➔ 아름다운 노년',
    title: '05. 황제공진단으로 완성하는 아름다운 노년',
    mainCopy: '특허 24K 순금박 황제공진단 · 성인병 케어 및 백세 원기 회복',
    desc: '노화로 기력이 고갈되고 성인병이 찾아온 어두운 공간에서 찬란한 24K 순금박 황제공진단 포털을 뚫고 나가면, 황금빛 노을 정원에서 건강하고 아름답게 나이 들어가는 노년이 펼쳐집니다.',
    link: 'https://pf.kakao.com/_ykxcLK',
    subPills: ['① 노화·기력저하·성인병', '② 24K 황제공진단 복용 치료', '③ 아름답게 늙어가는 노년'],
    tpLabels: ['① 노화·기력저하·성인병', '② 특허 황제공진단 포털', '③ 기력 회복 & 아름다운 노년']
  }
];

// ============================================================================
// 2. 18-FRAME 3D Z-AXIS SPATIAL TUNNEL SEQUENCE DEFINITIONS
// ============================================================================
const VIDEO_FRAMES = [
  // --- STAGE 1: 수정(난임치료) -> 탄생 -> 감기(Before) -> 면역치료(After) -> 작은키(Before) -> 성장치료 키성장(After) ---
  {
    frameIndex: 0,
    domId: 'backdrop-1a',
    step: 1,
    subPillIndex: 0,
    phase: 'treating',
    portalMode: 'zoom-tunnel', // Flies into the golden ovum core
    focalX: 0.68,
    focalY: 0.50,
    actLabel: 'SPACE 01 · 난임·불임 착상 치료 ➔ 생명 잉태 터널',
    sceneTag: 'SPACE 01 · Z-DEPTH 000m (난임·착상 치료)',
    stateText: '✦ 자궁 온열·착상 한약 치료 ➔ 수정 성공',
    subtitle: '“마우스 휠을 내리면 자궁 온열·착상 치료로 잉태된 생명의 빛 속으로 공간을 관통(Zoom-Through)합니다.”',
    metric1Title: '적용된 바른 치료 처방',
    metric1Value: '자궁온열·착상보혈 한약',
    metric2Title: '치료를 통한 호전 변화',
    metric2Value: '자궁내막 착상률 98.4% ▲',
    barPercent: 92,
    lightWarmth: 1.0,
    arBadge: '💊 [공간 01] 바른 난임·착상 치료 작용 중 ➔ 생명의 코어로 전진'
  },
  {
    frameIndex: 1,
    domId: 'backdrop-1b',
    step: 1,
    subPillIndex: 1,
    phase: 'after',
    portalMode: 'zoom-tunnel',
    focalX: 0.64,
    focalY: 0.52,
    actLabel: 'SPACE 01 · 난임 치료 완결 ➔ 건강한 아이 탄생 공간',
    sceneTag: 'SPACE 01 · Z-DEPTH 100m (건강한 아이 탄생)',
    stateText: '✦ 바른 안태(安胎) 한약 케어 ➔ 건강한 출산',
    subtitle: '“생명의 코어를 통과하면 엄마의 손가락을 꼭 쥔 건강한 신생아의 탄생 공간이 눈앞으로 다가옵니다.”',
    metric1Title: '적용된 바른 치료 처방',
    metric1Value: '바른 안태(安胎)·산후 보약',
    metric2Title: '치료를 통한 호전 변화',
    metric2Value: '신생아 건강 활성도 99.8% ▲',
    barPercent: 99,
    lightWarmth: 1.0,
    arBadge: '✦ [공간 01] 바른 난임·안태 치료 결과 · 건강한 아이 탄생'
  },
  {
    frameIndex: 2,
    domId: 'backdrop-1c0',
    step: 1,
    subPillIndex: 2,
    phase: 'before',
    portalMode: 'healing-gate', // Same child: Cold -> Herbal Immunity Cure
    focalX: 0.65,
    focalY: 0.48,
    actLabel: 'SPACE 01 · 소아 면역력 저하 ➔ 감기·발열 발생 공간',
    sceneTag: 'SPACE 01 · Z-DEPTH 200m (치료 전 · 면역저하 감기)',
    stateText: '⚠️ 치료 전 · 호흡기 면역력 저하 & 감기 발열',
    subtitle: '“공간 깊숙이 전진하면 면역력이 떨어져 잦은 감기와 고열로 코가 헐어 훌쩍이는 아이를 마주합니다.”',
    metric1Title: '치료 전 증상 진단',
    metric1Value: '호흡기·폐 면역력 41% 저하',
    metric2Title: '현재 신체 상태',
    metric2Value: '잦은 감기·비염·발열 지속 ⚠️',
    barPercent: 38,
    lightWarmth: 0.15,
    arBadge: '⚠️ [치료 전 공간] 소아 면역력 저하로 인한 감기·비염 발생'
  },
  {
    frameIndex: 3,
    domId: 'backdrop-1c',
    step: 1,
    subPillIndex: 2,
    phase: 'after',
    portalMode: 'zoom-tunnel',
    focalX: 0.65,
    focalY: 0.48,
    actLabel: 'SPACE 01 · 바른 면역강화 한약 포털 통과 ➔ 감기 완치',
    sceneTag: 'SPACE 01 · Z-DEPTH 300m (바른 면역강화 치료 완료)',
    stateText: '✦ 청정 녹용 면역보약 복용 ➔ 감기 완치·면역 회복',
    subtitle: '“바른 면역강화 치료 포털을 통과하는 순간, 따뜻한 녹용 보약을 마시며 감기가 완치되어 활짝 웃습니다.”',
    metric1Title: '적용된 바른 치료 처방',
    metric1Value: '소아 청정 녹용 면역보약',
    metric2Title: '치료를 통한 호전 변화',
    metric2Value: '면역력 41% ➔ 98.5% 완치 ▲',
    barPercent: 98,
    lightWarmth: 1.0,
    arBadge: '💊 [면역치료 포털 통과] 호흡기 자생력 98.5% 회복 · 감기 소실'
  },
  {
    frameIndex: 4,
    domId: 'backdrop-1d0',
    step: 1,
    subPillIndex: 3,
    phase: 'before',
    portalMode: 'growth-stretch', // Special 3D Growth Stretch + Portal
    focalX: 0.635,
    focalY: 0.45,
    actLabel: 'SPACE 01 · 또래와 서 있을 때 유독 작은 키 고민 공간',
    sceneTag: 'SPACE 01 · Z-DEPTH 400m (치료 전 · 또래 대비 작은 키)',
    stateText: '⚠️ 치료 전 · 또래 평균 대비 -12cm 성장 지연',
    subtitle: '“한옥 마루 깊숙이 전진하면, 양옆 또래 친구들보다 유독 키가 작아 주눅 들어 있는 아이가 보입니다.”',
    metric1Title: '치료 전 성장 진단',
    metric1Value: '현재 134.0cm (또래 하위 12%)',
    metric2Title: '성장판·척추 상태',
    metric2Value: '하체 성장판 순환 정체 ⚠️',
    barPercent: 42,
    lightWarmth: 0.3,
    arBadge: '⚠️ [성장치료 전] 또래 대비 작은 키 (134.0cm) · 성장판 자극 필요'
  },
  {
    frameIndex: 5,
    domId: 'backdrop-1d',
    step: 1,
    subPillIndex: 3,
    phase: 'after',
    portalMode: 'zoom-tunnel',
    focalX: 0.635,
    focalY: 0.38,
    actLabel: 'SPACE 01 · 바른 성장치료 포털 관통 ➔ 키가 쭈욱 길어지는 기적!',
    sceneTag: 'SPACE 01 · Z-DEPTH 500m (성장치료 · 키가 쭈욱 자라는 변화)',
    stateText: '✦ 성장판 한약·성장추나 치료 ➔ 또래 추월 폭풍 키성장!',
    subtitle: '“앞으로 전진하며 바른 성장치료가 작동하자, 가운데 아이의 키가 실시간으로 쭈욱 길어져 친구들보다 머리 하나만큼 더 커집니다!”',
    metric1Title: '적용된 바른 치료 처방',
    metric1Value: '성장판 녹용한약 + 성장추나',
    metric2Title: '치료를 통한 신장 변화',
    metric2Value: '134cm ➔ 154.5cm (+20.5cm 폭풍성장!)',
    barPercent: 100,
    lightWarmth: 1.0,
    arBadge: '🚀 [성장치료 포털 돌파] 또래 추월 +20.5cm 폭풍 키성장 달성!'
  },

  // --- STAGE 2: 성인 비만(Before) -> 바른 비만치료 한약 복용(Treating) -> 날씬한 S라인 변신(After) ---
  {
    frameIndex: 6,
    domId: 'backdrop-2a',
    step: 2,
    subPillIndex: 0,
    phase: 'before',
    portalMode: 'slim-morph',
    focalX: 0.65,
    focalY: 0.50,
    actLabel: 'SPACE 02 · 성인기 대사 저하 ➔ 체중 증가 & 비만 발생 공간',
    sceneTag: 'SPACE 02 · Z-DEPTH 650m (치료 전 · 성인 비만 발생)',
    stateText: '⚠️ 치료 전 · 성인 내장비만 & 체지방 과다 축적',
    subtitle: '“성장한 아이의 공간을 뚫고 전진하면, 성인이 되어 급격히 살이 찌고 비만이 된 무거운 일상 공간을 마주합니다.”',
    metric1Title: '치료 전 체성분 진단',
    metric1Value: '체지방률 34.8% (내장비만)',
    metric2Title: '현재 대사 상태',
    metric2Value: '기초대사 저하 · 부종 심화 ⚠️',
    barPercent: 32,
    lightWarmth: 0.15,
    arBadge: '⚠️ [비만치료 전 공간] 체지방률 34.8% · 성인 비만 및 부종 심화'
  },
  {
    frameIndex: 7,
    domId: 'backdrop-2t',
    step: 2,
    subPillIndex: 1,
    phase: 'treating',
    portalMode: 'slim-morph',
    focalX: 0.65,
    focalY: 0.50,
    actLabel: 'SPACE 02 · 바른 비만치료 한약 포털 통과 ➔ 체지방 집중 분해',
    sceneTag: 'SPACE 02 · Z-DEPTH 780m (바른 비만치료 한약 작용 중)',
    stateText: '💊 바른 다이어트 탕약 복용 ➔ 심부 체지방 연소 진행 중',
    subtitle: '“3D 치유 게이트를 통과하며 바른 비만치료 한약을 복용하자, 심부 체지방이 분해되며 몸매 라인이 실시간으로 줄어듭니다.”',
    metric1Title: '적용된 바른 치료 처방',
    metric1Value: '바른 비만탕약 (식욕·지방분해)',
    metric2Title: '실시간 치료 호전도',
    metric2Value: '체지방 34.8% ➔ 24.5% 연소 중 ▼',
    barPercent: 68,
    lightWarmth: 0.75,
    arBadge: '💊 [비만치료 포털 관통 중] 심부 체지방 분해 대사율 +240% 활성화'
  },
  {
    frameIndex: 8,
    domId: 'backdrop-2b',
    step: 2,
    subPillIndex: 2,
    phase: 'after',
    portalMode: 'zoom-tunnel',
    focalX: 0.66,
    focalY: 0.45,
    actLabel: 'SPACE 02 · 비만치료 포털 돌파 ➔ 날씬하고 건강한 S라인 변신',
    sceneTag: 'SPACE 02 · Z-DEPTH 900m (비만치료 완료 · 슬림 체형 완성)',
    stateText: '✦ 체지방 -14.2kg 감량 성공 ➔ 날씬한 S라인 완치',
    subtitle: '“치료 터널을 빠져나오면 체지방 -14.2kg 감량에 성공하여 날씬하고 탄탄한 S라인으로 변신한 모습이 펼쳐집니다.”',
    metric1Title: '적용된 바른 치료 처방',
    metric1Value: '바른 비만치료 1:1 맞춤 한약',
    metric2Title: '치료를 통한 최종 변화',
    metric2Value: '체지방 18.2% 달성 (-14.2kg 감량!)',
    barPercent: 99,
    lightWarmth: 1.0,
    arBadge: '✦ [비만치료 완결 공간] 체지방 -14.2kg 감량 · 날씬한 S라인 완벽 회복'
  },

  // --- STAGE 3: 30대 탈모 발생(Before) -> 두피 약침·청열 치료(Treating) -> 정상 모발 회복(After) ---
  {
    frameIndex: 9,
    domId: 'backdrop-3a',
    step: 3,
    subPillIndex: 0,
    phase: 'before',
    portalMode: 'hair-morph',
    focalX: 0.62,
    focalY: 0.32,
    actLabel: 'SPACE 03 · 30대 스트레스·두피열 ➔ M자·정수리 탈모 공간',
    sceneTag: 'SPACE 03 · Z-DEPTH 1050m (치료 전 · 30대 탈모 발생)',
    stateText: '⚠️ 치료 전 · 30대 두피 상열감(熱) & 모발 탈락',
    subtitle: '“다음 공간을 관통해 들어가면, 30대가 되면서 두피 열독으로 M자 이마와 정수리 머리카락이 빠지는 탈모 공간이 나타납니다.”',
    metric1Title: '치료 전 두피 진단',
    metric1Value: '두피열 38.6°C · 모낭 위축',
    metric2Title: '현재 모발 상태',
    metric2Value: 'M자·정수리 밀도 45% 감소 ⚠️',
    barPercent: 34,
    lightWarmth: 0.15,
    arBadge: '⚠️ [탈모치료 전 공간] 두피열 38.6°C · 30대 M자 및 정수리 모발 탈락'
  },
  {
    frameIndex: 10,
    domId: 'backdrop-3t',
    step: 3,
    subPillIndex: 1,
    phase: 'treating',
    portalMode: 'hair-morph',
    focalX: 0.62,
    focalY: 0.28,
    actLabel: 'SPACE 03 · 바른 두피 청열 & 고농도 발모 약침 포털 관통',
    sceneTag: 'SPACE 03 · Z-DEPTH 1180m (바른 두피 약침·청열 치료 과정)',
    stateText: '💉 고농도 발모 약침·청열 치료 ➔ 신생 모발 발아 중',
    subtitle: '“두피 깊숙이 줌인하며 한의사의 고농도 발모 약침·청열 치료 포털을 통과하자, 두피 열이 식고 새 모발이 자라납니다.”',
    metric1Title: '적용된 바른 치료 처방',
    metric1Value: '고농도 모근재생 약침 + 청열한약',
    metric2Title: '실시간 치료 호전도',
    metric2Value: '두피열 34.8°C 하강 · 신생모 발아 ▲',
    barPercent: 72,
    lightWarmth: 0.7,
    arBadge: '💉 [탈모치료 포털 관통 중] 두피 열독 해소 & 잠든 모근 세포 발모'
  },
  {
    frameIndex: 11,
    domId: 'backdrop-3b',
    step: 3,
    subPillIndex: 2,
    phase: 'after',
    portalMode: 'zoom-tunnel',
    focalX: 0.62,
    focalY: 0.32,
    actLabel: 'SPACE 03 · 탈모치료 포털 돌파 ➔ 풍성하고 빽빽한 정상 모발 회복',
    sceneTag: 'SPACE 03 · Z-DEPTH 1300m (탈모치료 완료 · 정상 모발 회복)',
    stateText: '✦ 모낭 밀도 99% 회복 ➔ 빈틈없이 풍성한 정상 모발',
    subtitle: '“치료 포털 너머로 전진하면, 빠졌던 M자 헤어라인과 정수리가 다시 빽빽한 흑발로 가득 찬 정상 모발을 마주합니다.”',
    metric1Title: '적용된 바른 치료 처방',
    metric1Value: '발모 약침 + 수승화강 탈모한약',
    metric2Title: '치료를 통한 최종 변화',
    metric2Value: '모발 밀도·굵기 99.2% 정상 회복 ▲',
    barPercent: 99,
    lightWarmth: 1.0,
    arBadge: '✦ [탈모치료 완결 공간] M자·정수리 모발 밀도 99.2% 정상 회복 달성'
  },

  // --- STAGE 4: 굽은 척추 + 목·어깨·팔·허리·다리·발 전신 통증(Before) -> 원장님 1:1 추나 치료(Treating) -> 전신 회복(After) ---
  {
    frameIndex: 12,
    domId: 'backdrop-4a',
    step: 4,
    subPillIndex: 0,
    phase: 'before',
    portalMode: 'chuna-fullbody',
    focalX: 0.53,
    focalY: 0.48,
    actLabel: 'SPACE 04 · 굽은 척추 & 목·어깨·팔·허리·다리·발 전신 통증 발생',
    sceneTag: 'SPACE 04 · Z-DEPTH 1420m (치료 전 · 척추 및 전신 7대 부위 통증)',
    stateText: '⚠️ 치료 전 · 굽은 척추 14.8° & 목·어깨·팔·허리·다리·발 통증',
    subtitle: '“근무 중 척추가 굽고 틀어지면서 목, 어깨, 팔·손목, 허리·골반, 다리·무릎, 발·발목까지 머리부터 발끝까지 통증이 번집니다.”',
    metric1Title: '치료 전 전신 통증 진단',
    metric1Value: '굽은 척추 14.8° · 전신 7대 부위 통증',
    metric2Title: '통증 발생 부위',
    metric2Value: '목·어깨·팔·척추·허리·다리·발 ⚠️',
    barPercent: 25,
    lightWarmth: 0.15,
    arBadge: '⚠️ [추나치료 전] 굽은 척추 + 목·어깨·팔·허리·다리·발 전신 통증 발생'
  },
  {
    frameIndex: 13,
    domId: 'backdrop-4t',
    step: 4,
    subPillIndex: 1,
    phase: 'treating',
    portalMode: 'chuna-fullbody',
    focalX: 0.53,
    focalY: 0.48,
    actLabel: 'SPACE 04 · 대표원장 1:1 추나 수기 교정 & 전신 관절 약침 포털',
    sceneTag: 'SPACE 04 · Z-DEPTH 1550m (바른 추나 · 전신 통증 교정 치료 중)',
    stateText: '👐 원장님 1:1 추나·약침 ➔ 목·어깨·팔·척추·허리·다리·발 교정 중',
    subtitle: '“대표원장님의 정밀 추나 수기 교정 포털을 통과하며, 목·어깨·팔부터 굽은 척추·허리·다리·발끝까지 순서대로 통증이 풀립니다.”',
    metric1Title: '적용된 바른 치료 처방',
    metric1Value: '1:1 전신 추나교정 + 고농도 봉약침',
    metric2Title: '실시간 전신 호전도',
    metric2Value: '목➔어깨➔팔➔척추➔허리➔다리➔발 치유 중 ▲',
    barPercent: 74,
    lightWarmth: 0.75,
    arBadge: '👐 [바른 추나 포털 관통 중] 굽은 척추 교정 & 목·어깨·팔·허리·다리·발 염증 제거'
  },
  {
    frameIndex: 14,
    domId: 'backdrop-4b',
    step: 4,
    subPillIndex: 2,
    phase: 'after',
    portalMode: 'zoom-tunnel',
    focalX: 0.54,
    focalY: 0.45,
    actLabel: 'SPACE 04 · 추나 통증치료 돌파 ➔ 머리부터 발끝까지 무통증 회복!',
    sceneTag: 'SPACE 04 · Z-DEPTH 1660m (추나치료 완료 · 전신 정렬 및 통증 완치)',
    stateText: '✦ 척추 수직 정렬 & 목·어깨·팔·허리·다리·발 통증 100% 소실!',
    subtitle: '“추나 치유 공간을 돌파하면, 굽은 척추가 반듯하게 펴지고 목·어깨·팔·허리·다리·발끝까지 통증이 씻은 듯이 사라집니다.”',
    metric1Title: '적용된 바른 치료 처방',
    metric1Value: '전신 추나요법 + 신경·인대 재생한약',
    metric2Title: '치료를 통한 최종 변화',
    metric2Value: '척추·목·어깨·팔·허리·다리·발 100% 완치 ▲',
    barPercent: 100,
    lightWarmth: 1.0,
    arBadge: '✦ [추나 통증치료 완료] 굽은 척추 & 목·어깨·팔·허리·다리·발 100% 회복 완료'
  },

  // --- STAGE 5: 노화·기력저하·성인병(Before) -> 24K 황제공진단 치료(Treating) -> 아름다운 노년(After) ---
  {
    frameIndex: 15,
    domId: 'backdrop-5a',
    step: 5,
    subPillIndex: 0,
    phase: 'before',
    portalMode: 'gongjindan-morph',
    focalX: 0.62,
    focalY: 0.52,
    actLabel: 'SPACE 05 · 노화로 인한 기력 고갈 & 성인병·만성피로 공간',
    sceneTag: 'SPACE 05 · Z-DEPTH 1720m (치료 전 · 노년 기력저하 & 성인병)',
    stateText: '⚠️ 치료 전 · 노년 원기 고갈 & 성인병 대사 저하',
    subtitle: '“마지막 터널 깊숙이 들어서면, 세월이 흘러 기력이 쇠하고 성인병과 만성 피로에 지친 노년의 공간을 마주합니다.”',
    metric1Title: '치료 전 진맥 진단',
    metric1Value: '심폐 원기 28% (기력 고갈)',
    metric2Title: '현재 건강 상태',
    metric2Value: '성인병 위험 · 만성 무기력증 ⚠️',
    barPercent: 28,
    lightWarmth: 0.15,
    arBadge: '⚠️ [공진단 치료 전] 노년 기력 고갈(28%) 및 성인병·만성 피로 누적'
  },
  {
    frameIndex: 16,
    domId: 'backdrop-5b',
    step: 5,
    subPillIndex: 1,
    phase: 'treating',
    portalMode: 'gongjindan-morph',
    focalX: 0.59,
    focalY: 0.76,
    actLabel: 'SPACE 05 · 특허 24K 황제공진단 포털 관통 ➔ 전신 기력 회복',
    sceneTag: 'SPACE 05 · Z-DEPTH 1760m (황제공진단 기력 회복 치료 과정)',
    stateText: '👑 24K 순금박 황제공진단 처방 ➔ 심폐 원기·면역 급상승',
    subtitle: '“24K 순금박 황제공진단에서 뿜어져 나오는 황금빛 원기 포털 속으로 줌인하며 막힌 기혈과 심폐 활력이 깨어납니다.”',
    metric1Title: '적용된 바른 치료 처방',
    metric1Value: '특허 24K 순금박 황제공진단',
    metric2Title: '실시간 치료 호전도',
    metric2Value: '원기 지수 28% ➔ 88% 급상승 ▲',
    barPercent: 86,
    lightWarmth: 0.85,
    arBadge: '👑 [황제공진단 포털 관통 중] 심폐 화색 회복 & 성인병 면역 방어력 강화'
  },
  {
    frameIndex: 17,
    domId: 'backdrop-5c',
    step: 5,
    subPillIndex: 2,
    phase: 'after',
    portalMode: 'zoom-tunnel',
    focalX: 0.65,
    focalY: 0.45,
    actLabel: 'SPACE 05 · 황제공진단 피날레 ➔ 건강하고 아름답게 늙어가는 삶',
    sceneTag: 'SPACE 05 · Z-DEPTH 1800m (황제공진단 완결 · 아름다운 노년)',
    stateText: '✦ 백세 원기 99.5% 완성 ➔ 품격 있고 아름다운 노년',
    subtitle: '“황금빛 공진단 포털을 통과하면, 성인병과 피로를 이겨내고 노을 정원에서 아름답게 나이 들어가는 인생의 피날레가 펼쳐집니다.”',
    metric1Title: '적용된 바른 치료 처방',
    metric1Value: '황제공진단 · 백세 항노화 보약',
    metric2Title: '치료를 통한 최종 변화',
    metric2Value: '백세 활력 99.5% · 아름다운 노년 ▲',
    barPercent: 100,
    lightWarmth: 1.0,
    arBadge: '✦ [황제공진단 치료 완결] 원기 99.5% 회복 · 품격 있고 아름다운 백세 노년'
  }
];

window.currentAppStepSlug = 'pediatric-growth';

// ============================================================================
// 3. TYPE C: 3D Z-AXIS SPATIAL ZOOM-THROUGH & FULL-BODY RECOVERY ENGINE
// ============================================================================
class BareunMasterpieceStoryApp {
  constructor() {
    this.canvas = document.getElementById('storyboard-canvas');
    this.videoCanvas = document.getElementById('cinema-video-canvas');
    this.vCtx = this.videoCanvas ? this.videoCanvas.getContext('2d') : null;

    this.currentStep = 1;
    this.scrollProgress = 0;

    // Master continuous 3D Z-Axis playhead (0.000 to 1.000 across all 18 spatial depth layers)
    this.playheadP = 0;
    this.targetPlayheadP = 0;
    this.isAutoPlaying = false;
    this.lastScrollTimestamp = 0;
    this.lastFrameTime = performance.now();

    this.mouseParallax = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.currentLightWarmth = 1.0;

    // Preloaded HTMLImageElements for 60fps 3D Z-Axis Canvas Projection
    this.loadedImages = new Array(VIDEO_FRAMES.length).fill(null);
    this.imagesReadyCount = 0;

    // DOM References
    this.hudPanel = document.getElementById('story-hud-panel');
    this.hudBadge = document.getElementById('hud-step-badge');
    this.hudCounter = document.getElementById('hud-step-counter');
    this.hudSubsceneFlow = document.getElementById('hud-subscene-flow');
    this.hudTitle = document.getElementById('hud-step-title');
    this.hudSubtitle = document.getElementById('hud-step-subtitle');
    this.hudDesc = document.getElementById('hud-step-desc');
    this.hudPrimaryBtn = document.getElementById('hud-primary-btn');
    this.hudDrawerBtn = document.getElementById('hud-drawer-btn');
    this.painRadarBox = document.getElementById('pain-radar-box');
    this.painRadarStatus = document.getElementById('pain-radar-status');

    // 3-Phase Treatment Recovery Pipeline DOM
    this.tpPhaseBefore = document.getElementById('tp-phase-before');
    this.tpPhaseTreating = document.getElementById('tp-phase-treating');
    this.tpPhaseAfter = document.getElementById('tp-phase-after');
    this.tpLabelBefore = document.getElementById('tp-label-before');
    this.tpLabelTreating = document.getElementById('tp-label-treating');
    this.tpLabelAfter = document.getElementById('tp-label-after');
    this.tpConn1 = document.getElementById('tp-conn-1');
    this.tpConn2 = document.getElementById('tp-conn-2');

    // Top-right Live Video Player Controls
    this.autoPlayBtn = document.getElementById('cinema-autoplay-btn');
    this.autoPlayText = document.getElementById('cinema-autoplay-text');
    this.timecodeEl = document.getElementById('cinema-timecode');

    // Top Timeline & Telemetry DOM
    this.timelineActLabel = document.getElementById('timeline-act-label');
    this.timelineProgressFill = document.getElementById('timeline-progress-fill');
    this.timelineStatePill = document.getElementById('timeline-state-pill');
    this.telemetryStatus = document.getElementById('telemetry-status');
    this.metric1Title = document.getElementById('metric-1-title');
    this.metric1Value = document.getElementById('metric-1-value');
    this.metric2Title = document.getElementById('metric-2-title');
    this.metric2Value = document.getElementById('metric-2-value');
    this.telemetryBarFill = document.getElementById('telemetry-bar-fill');
    this.cinemaSceneTag = document.getElementById('cinema-scene-tag');
    this.cinemaSubtitleText = document.getElementById('cinema-subtitle-text');

    this.navDots = document.querySelectorAll('.step-nav-dot');
    this.sktCards = document.querySelectorAll('.skt-dock-card');

    this.backdropMap = {};
    VIDEO_FRAMES.forEach(f => {
      const el = document.getElementById(f.domId);
      if (el) this.backdropMap[f.domId] = el;
    });

    this.initClock();
    this.preloadSequenceFrames();
    this.initVideoCanvasSize();
    this.initSpatialTunnelWebGL();
    this.initScrollEngine();
    this.initInteractions();
    this.initIntro();
    this.initDrawer();

    this.updateStepTextAndNav(1);
    this.syncUIWithPlayhead(0);
    this.animate();
  }

  initClock() {
    const updateTime = () => {
      const el = document.getElementById('hud-clock');
      if (!el) return;
      const now = new Date();
      el.textContent = now.toTimeString().split(' ')[0];
    };
    setInterval(updateTime, 1000);
    updateTime();
  }

  // =========================================================================
  // Preload All 18 Frames for 60fps 3D Z-Axis Zoom-Through Projection
  // =========================================================================
  preloadSequenceFrames() {
    VIDEO_FRAMES.forEach((f, idx) => {
      const el = this.backdropMap[f.domId];
      if (!el) return;
      const bgStyle = el.style.backgroundImage || '';
      const match = bgStyle.match(/url\(['"]?([^'"]+)['"]?\)/);
      if (!match || !match[1]) return;

      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        this.loadedImages[idx] = img;
        this.imagesReadyCount++;
      };
      img.onerror = () => {
        const fallbackImg = new Image();
        fallbackImg.onload = () => {
          this.loadedImages[idx] = fallbackImg;
          this.imagesReadyCount++;
        };
        fallbackImg.src = match[1];
      };
      img.src = match[1];
    });
  }

  initVideoCanvasSize() {
    if (!this.videoCanvas) return;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.videoCanvas.width = Math.floor(window.innerWidth * dpr);
      this.videoCanvas.height = Math.floor(window.innerHeight * dpr);
      this.videoDpr = dpr;
    };
    resize();
    window.addEventListener('resize', resize);
  }

  // =========================================================================
  // Three.js 3D Z-Axis Spatial Tunnel Particles (Lusion / Igloo Depth Flight)
  // =========================================================================
  initSpatialTunnelWebGL() {
    if (!this.canvas || typeof THREE === 'undefined') return;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 400);
    this.camera.position.set(0, 0, 50);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const bokehTex = this.createOpticalBokehTexture();

    // 140 3D Tunnel Depth Particles streaming past the camera along Z-axis
    const dustCount = 140;
    const dustGeo = new THREE.BufferGeometry();
    this.dustPositions = new Float32Array(dustCount * 3);
    const dustColors = new Float32Array(dustCount * 3);

    const colGold = new THREE.Color(0xFDE68A);
    const colEmerald = new THREE.Color(0x6EE7B7);

    for (let i = 0; i < dustCount; i++) {
      // Arrange in a hollow tunnel cylinder around the camera path
      const angle = Math.random() * Math.PI * 2;
      const radius = 8 + Math.random() * 48;
      this.dustPositions[i * 3] = Math.cos(angle) * radius;
      this.dustPositions[i * 3 + 1] = Math.sin(angle) * radius * 0.65;
      this.dustPositions[i * 3 + 2] = -Math.random() * 300;

      const c = Math.random() > 0.35 ? colGold : colEmerald;
      dustColors[i * 3] = c.r;
      dustColors[i * 3 + 1] = c.g;
      dustColors[i * 3 + 2] = c.b;
    }

    dustGeo.setAttribute('position', new THREE.BufferAttribute(this.dustPositions, 3));
    dustGeo.setAttribute('color', new THREE.BufferAttribute(dustColors, 3));

    this.dustMat = new THREE.PointsMaterial({
      size: 2.2,
      map: bokehTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.36,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    this.dustPoints = new THREE.Points(dustGeo, this.dustMat);
    this.scene.add(this.dustPoints);

    window.addEventListener('resize', () => {
      if (!this.camera || !this.renderer) return;
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  createOpticalBokehTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, 'rgba(255, 252, 240, 0.95)');
    grad.addColorStop(0.5, 'rgba(253, 230, 138, 0.45)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(canvas);
  }

  // =========================================================================
  // Scroll Engine + Continuous 3D Z-Axis Tunnel Flight Controller
  // =========================================================================
  initScrollEngine() {
    const track = document.getElementById('story-scroll-track');
    if (!track) return;

    const updateFromScroll = () => {
      const rect = track.getBoundingClientRect();
      const total = Math.max(1, track.offsetHeight - window.innerHeight);
      if (rect.top <= 10 && rect.bottom >= 0) {
        const p = Math.min(1.0, Math.max(0, -rect.top / total));
        this.scrollProgress = p;
        if (!this.isAutoPlaying) {
          this.targetPlayheadP = p;
        }
      }
    };

    window.addEventListener('scroll', () => {
      this.lastScrollTimestamp = performance.now();
      updateFromScroll();
    }, { passive: true });

    window.addEventListener('wheel', () => {
      this.lastScrollTimestamp = performance.now();
      if (this.isAutoPlaying) {
        this.isAutoPlaying = false;
        if (this.autoPlayBtn) this.autoPlayBtn.classList.add('paused');
        if (this.autoPlayText) this.autoPlayText.textContent = '▶ 3D 자동 주행 켜기 (현재: 스크롤 연동)';
      }
      updateFromScroll();
    }, { passive: true });
  }

  initInteractions() {
    window.addEventListener('mousemove', (e) => {
      this.mouseParallax.targetX = (e.clientX / window.innerWidth - 0.5);
      this.mouseParallax.targetY = (e.clientY / window.innerHeight - 0.5);
    }, { passive: true });
  }

  // =========================================================================
  // Sync Frameless 3D Spatial HUD, 3-Phase Pipeline & Stage 4 Full-Body Radar
  // =========================================================================
  syncUIWithPlayhead(p) {
    const totalFrames = VIDEO_FRAMES.length;
    const exactFrame = Math.max(0, Math.min(totalFrames - 1, p * (totalFrames - 1)));
    const activeIdx = Math.min(totalFrames - 1, Math.floor(exactFrame + 0.35));
    const frameData = VIDEO_FRAMES[activeIdx] || VIDEO_FRAMES[0];

    let step = frameData.step;
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

    // -----------------------------------------------------------------------
    // FRAMELESS 3D SPATIAL HUD MOTION (Moves in 3D Z-Space as you fly through)
    // -----------------------------------------------------------------------
    if (this.hudPanel && window.innerWidth > 900) {
      const subT = exactFrame - Math.floor(exactFrame);
      // Subtle 3D Z-axis glide: approaches from deep space and floats with camera parallax
      const hudScale = 0.96 + Math.sin(subT * Math.PI) * 0.05;
      const hudX = (this.mouseParallax.x * 14).toFixed(1);
      const hudY = (this.mouseParallax.y * 10).toFixed(1);
      this.hudPanel.style.transform = `perspective(1000px) translate3d(${hudX}px, calc(-50% + ${hudY}px), 0) scale(${hudScale.toFixed(3)})`;
    }

    // Update Top Z-Depth Timecode
    if (this.timecodeEl) {
      const fNum = String(activeIdx + 1).padStart(2, '0');
      const zMeters = String(Math.round(p * 1800)).padStart(4, '0');
      this.timecodeEl.textContent = `Z-DEPTH ${zMeters}m · SCENE ${fNum}/18`;
    }

    // Update 3-Phase Treatment Recovery Pipeline (Before -> Treating -> After)
    if (this.tpPhaseBefore && this.tpPhaseTreating && this.tpPhaseAfter) {
      this.tpPhaseBefore.className = `tp-phase ${frameData.phase === 'before' ? 'active-before' : ''}`;
      this.tpPhaseTreating.className = `tp-phase ${frameData.phase === 'treating' ? 'active-treating' : ''}`;
      this.tpPhaseAfter.className = `tp-phase ${frameData.phase === 'after' ? 'active-after' : ''}`;

      if (this.tpConn1 && this.tpConn2) {
        if (frameData.phase === 'before') {
          this.tpConn1.style.width = '25%';
          this.tpConn2.style.width = '0%';
        } else if (frameData.phase === 'treating') {
          this.tpConn1.style.width = '100%';
          this.tpConn2.style.width = '55%';
        } else {
          this.tpConn1.style.width = '100%';
          this.tpConn2.style.width = '100%';
        }
      }
    }

    const isCrisis = frameData.phase === 'before';

    if (this.timelineActLabel) this.timelineActLabel.textContent = frameData.actLabel;
    if (this.timelineProgressFill) {
      this.timelineProgressFill.style.width = `${Math.max(4, Math.round(p * 100))}%`;
    }
    if (this.timelineStatePill) {
      this.timelineStatePill.textContent = frameData.stateText;
      this.timelineStatePill.className = `timeline-state-pill ${isCrisis ? 'state-crisis' : 'state-healing'}`;
    }

    if (this.hudCounter) {
      this.hudCounter.textContent = `SCENE ${String(activeIdx + 1).padStart(2, '0')} / 18`;
    }
    if (this.hudPanel) {
      this.hudPanel.classList.toggle('crisis-mode', isCrisis);
    }

    if (this.hudSubsceneFlow && this.currentStep <= 5) {
      const pills = this.hudSubsceneFlow.querySelectorAll('.subscene-pill');
      pills.forEach((pill, idx) => {
        pill.classList.remove('active', 'crisis-active');
        if (idx === frameData.subPillIndex) {
          pill.classList.add(isCrisis ? 'crisis-active' : 'active');
        }
      });
    }

    if (this.cinemaSceneTag) this.cinemaSceneTag.textContent = frameData.sceneTag;
    if (this.cinemaSubtitleText) this.cinemaSubtitleText.textContent = frameData.subtitle;

    if (this.telemetryStatus) {
      if (frameData.phase === 'before') {
        this.telemetryStatus.textContent = '⚠️ 치료 전 증상 공간';
        this.telemetryStatus.className = 'telemetry-status crisis';
      } else if (frameData.phase === 'treating') {
        this.telemetryStatus.textContent = '💊 바른 치료 포털 관통 중';
        this.telemetryStatus.className = 'telemetry-status';
      } else {
        this.telemetryStatus.textContent = '✦ 완치·변화 공간 돌파';
        this.telemetryStatus.className = 'telemetry-status';
      }
    }

    if (this.metric1Title) this.metric1Title.textContent = frameData.metric1Title;
    if (this.metric2Title) this.metric2Title.textContent = frameData.metric2Title;
    if (this.metric1Value) {
      this.metric1Value.textContent = frameData.metric1Value;
      this.metric1Value.className = `metric-value ${isCrisis ? 'danger' : ''}`;
    }
    if (this.metric2Value) {
      this.metric2Value.textContent = frameData.metric2Value;
      this.metric2Value.className = `metric-value ${isCrisis ? 'danger' : 'highlight'}`;
    }
    if (this.telemetryBarFill) {
      this.telemetryBarFill.style.width = `${frameData.barPercent}%`;
      this.telemetryBarFill.className = `telemetry-bar-fill ${isCrisis ? 'danger' : ''}`;
    }

    // -----------------------------------------------------------------------
    // STAGE 4: 7-REGION FULL-BODY PAIN RADAR (목·어깨·팔·척추·허리·다리·발)
    // -----------------------------------------------------------------------
    if (step === 4) {
      const chips = document.querySelectorAll('.pain-chip');
      const stageProgress = Math.max(0, Math.min(1, (exactFrame - 12) / 2));
      const healedCount = Math.floor(stageProgress * (chips.length + 0.8));
      chips.forEach((c, idx) => {
        c.classList.toggle('healed', idx < healedCount);
      });
      if (this.painRadarStatus) {
        if (stageProgress < 0.25) {
          this.painRadarStatus.className = 'pain-radar-status warning';
          this.painRadarStatus.innerHTML = '<span class="pulse-dot">●</span> <span>굽은 척추 & 목·어깨·팔·허리·다리·발 통증</span>';
        } else if (stageProgress < 0.85) {
          this.painRadarStatus.className = 'pain-radar-status healing';
          this.painRadarStatus.innerHTML = '<span class="pulse-dot">✦</span> <span>머리부터 발끝까지 추나·약침 교정 중</span>';
        } else {
          this.painRadarStatus.className = 'pain-radar-status healing';
          this.painRadarStatus.innerHTML = '<span class="pulse-dot">✓</span> <span>척추·목·어깨·팔·허리·다리·발 완치 완료!</span>';
        }
      }
    }

    this.currentLightWarmth = frameData.lightWarmth ?? 1.0;

    VIDEO_FRAMES.forEach((f, idx) => {
      const el = this.backdropMap[f.domId];
      if (!el) return;
      el.style.opacity = (idx === activeIdx) ? '1' : '0';
    });
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
      if (this.hudDesc) this.hudDesc.textContent = '난임·소아면역·키성장부터 비만, 탈모, 척추·전신관절 추나, 황제공진단까지 1:1 맞춤 처방';
      if (this.painRadarBox) this.painRadarBox.style.display = 'none';
      return;
    }

    const data = CLINIC_SPECS[step - 1];
    if (!data) return;

    if (this.hudBadge) this.hudBadge.textContent = data.badge;
    if (this.hudTitle) this.hudTitle.textContent = data.title;
    if (this.hudSubtitle) this.hudSubtitle.textContent = data.mainCopy;
    if (this.hudDesc) this.hudDesc.textContent = data.desc;

    if (this.tpLabelBefore && data.tpLabels) this.tpLabelBefore.textContent = data.tpLabels[0];
    if (this.tpLabelTreating && data.tpLabels) this.tpLabelTreating.textContent = data.tpLabels[1];
    if (this.tpLabelAfter && data.tpLabels) this.tpLabelAfter.textContent = data.tpLabels[2];

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

  // =========================================================================
  // Helper: Draw Image with 3D Z-Axis Focal Zoom-Through Anchor
  // =========================================================================
  drawZoomImage(ctx, img, cw, ch, scaleX, scaleY, focalX, focalY, offsetX, offsetY, alpha) {
    if (!img || !img.width || !img.height || alpha <= 0.001) return;
    ctx.save();
    ctx.globalAlpha = Math.max(0, Math.min(1, alpha));

    const imgAspect = img.width / img.height;
    const canvasAspect = cw / ch;
    let baseW, baseH;

    if (canvasAspect > imgAspect) {
      baseW = cw;
      baseH = cw / imgAspect;
    } else {
      baseH = ch;
      baseW = ch * imgAspect;
    }

    const finalW = baseW * scaleX;
    const finalH = baseH * scaleY;

    // Anchor zoom around the 3D tunnel focal point (focalX, focalY)
    const fx = focalX ?? 0.62;
    const fy = focalY ?? 0.50;
    const dx = cw * fx - finalW * fx + offsetX;
    const dy = ch * fy - finalH * fy + offsetY;

    ctx.drawImage(img, dx, dy, finalW, finalH);
    ctx.restore();
  }

  // =========================================================================
  //Helper: Draw 3D Spatial Portal Gate Transition (Type C Zoom-Through)
  // =========================================================================
  drawPortalZoomThrough(ctx, imgA, imgB, cw, ch, dpr, t, focalX, focalY, px, py, time) {
    const fx = focalX ?? 0.62;
    const fy = focalY ?? 0.48;

    // 1. Outgoing space zooms PAST the camera (1.0 -> 1.58x) as you fly forward!
    const scaleOut = 1.0 + Math.pow(t, 1.3) * 0.58;
    this.drawZoomImage(ctx, imgA, cw, ch, scaleOut, scaleOut, fx, fy, px, py, 1.0);

    if (!imgB || t <= 0.005) return;

    // 2. Incoming space approaches from deep inside the 3D Z-tunnel (0.64x -> 1.00x)
    //    inside an expanding 3D circular/elliptical spatial portal!
    const scaleIn = 0.64 + (1 - Math.pow(1 - t, 1.6)) * 0.36;
    const maxRadius = Math.hypot(cw, ch) * 0.85;
    const portalR = Math.pow(t, 0.88) * maxRadius;
    const portalCenterX = cw * fx + px * 0.5;
    const portalCenterY = ch * fy + py * 0.5;

    ctx.save();
    ctx.beginPath();
    ctx.arc(portalCenterX, portalCenterY, portalR, 0, Math.PI * 2);
    ctx.clip();

    this.drawZoomImage(ctx, imgB, cw, ch, scaleIn, scaleIn, fx, fy, px, py, Math.min(1, t * 1.35));
    ctx.restore();

    // 3. Luminous 3D Golden-Emerald Portal Rim at the expanding tunnel boundary
    if (t > 0.03 && t < 0.96) {
      ctx.save();
      const rimAlpha = Math.sin(t * Math.PI) * 0.65;
      const rimGrad = ctx.createRadialGradient(
        portalCenterX, portalCenterY, Math.max(1, portalR - 28 * dpr),
        portalCenterX, portalCenterY, portalR + 28 * dpr
      );
      rimGrad.addColorStop(0, 'rgba(253, 230, 138, 0)');
      rimGrad.addColorStop(0.45, `rgba(16, 185, 129, ${rimAlpha * 0.55})`);
      rimGrad.addColorStop(0.55, `rgba(253, 230, 138, ${rimAlpha})`);
      rimGrad.addColorStop(1, 'rgba(253, 230, 138, 0)');

      ctx.fillStyle = rimGrad;
      ctx.beginPath();
      ctx.arc(portalCenterX, portalCenterY, portalR + 28 * dpr, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // =========================================================================
  // 60fps Type-C 3D Z-Axis Spatial Tunnel & Full-Body Transformation Canvas
  // =========================================================================
  renderContinuousVideoCanvas(p, time) {
    if (!this.vCtx || !this.videoCanvas) return;
    const ctx = this.vCtx;
    const cw = this.videoCanvas.width;
    const ch = this.videoCanvas.height;
    const dpr = this.videoDpr || 1;

    const totalFrames = VIDEO_FRAMES.length;
    const exactFrame = Math.max(0, Math.min(totalFrames - 1.0001, p * (totalFrames - 1)));
    const idxA = Math.floor(exactFrame);
    const idxB = Math.min(totalFrames - 1, idxA + 1);
    const rawT = exactFrame - idxA;
    const t = 0.5 - 0.5 * Math.cos(rawT * Math.PI);

    const frameA = VIDEO_FRAMES[idxA];
    const imgA = this.loadedImages[idxA];
    const imgB = this.loadedImages[idxB];

    if (!imgA && !imgB) return;

    ctx.clearRect(0, 0, cw, ch);

    const px = this.mouseParallax.x * -18 * dpr;
    const py = this.mouseParallax.y * -12 * dpr;
    const fx = frameA ? frameA.focalX : 0.62;
    const fy = frameA ? frameA.focalY : 0.50;

    // -----------------------------------------------------------------------
    // TYPE-C 3D SPATIAL ZOOM-THROUGH + ANATOMICAL MORPHING BY STAGE
    // -----------------------------------------------------------------------
    if (idxA === 4 && idxB === 5 && imgA && imgB) {
      // =====================================================================
      // STAGE 1D: PEER HEIGHT GROWTH ("또래와 서 있을 때 키가 작아 -> 성장치료로 키가 쭈욱 길어지는 연출")
      // Camera zooms into the hallway (0.94 -> 1.12x) while the central boy's
      // vertical body column stretches upward from short to a full head taller!
      // =====================================================================
      const camZoom = 0.96 + t * 0.14;
      this.drawZoomImage(ctx, imgA, cw, ch, camZoom, camZoom, fx, fy, px, py, 1.0);
      this.drawZoomImage(ctx, imgB, cw, ch, camZoom, camZoom, fx, fy, px, py, t);

      // Isolate central boy's column and stretch upward anchored at feet
      ctx.save();
      const colLeft = cw * 0.55;
      const colWidth = cw * 0.16;
      ctx.beginPath();
      ctx.rect(colLeft, 0, colWidth, ch);
      ctx.clip();

      const stretchA = 1.0 + t * 0.15;
      const liftA = -t * ch * 0.06;
      this.drawZoomImage(ctx, imgA, cw, ch, camZoom, camZoom * stretchA, fx, fy, px, py + liftA, 1 - t);

      const stretchB = 0.88 + t * 0.12;
      const liftB = (1 - t) * ch * 0.05;
      this.drawZoomImage(ctx, imgB, cw, ch, camZoom, camZoom * stretchB, fx, fy, px, py + liftB, t);
      ctx.restore();

      this.drawGrowthTherapyOverlay(ctx, cw, ch, dpr, t, time);

    } else if ((idxA === 6 || idxA === 7) && imgA && imgB) {
      // =====================================================================
      // STAGE 2: OBESITY -> HERBAL DIET PORTAL -> SLIM S-LINE SILHOUETTE
      // 3D Portal Zoom-Through combined with horizontal waist-slimming morph
      // =====================================================================
      const stageP = (exactFrame - 6) / 2;
      this.drawPortalZoomThrough(ctx, imgA, imgB, cw, ch, dpr, t, fx, fy, px, py, time);
      this.drawObesitySlimmingOverlay(ctx, cw, ch, dpr, stageP, time);

    } else if ((idxA === 9 || idxA === 10) && imgA && imgB) {
      // =====================================================================
      // STAGE 3: 30s HAIR LOSS -> SCALP ACUPUNCTURE PORTAL -> FULL HAIR
      // =====================================================================
      const stageP = (exactFrame - 9) / 2;
      this.drawPortalZoomThrough(ctx, imgA, imgB, cw, ch, dpr, t, fx, fy, px, py, time);
      this.drawHairRegrowthOverlay(ctx, cw, ch, dpr, stageP, time);

    } else if ((idxA === 12 || idxA === 13) && imgA && imgB) {
      // =====================================================================
      // STAGE 4: CROOKED SPINE + NECK/SHOULDER/ARM/WAIST/LEG/FOOT FULL-BODY PAIN
      //          -> HANDS-ON CHUNA PORTAL -> HEAD-TO-TOE FULL RECOVERY
      // =====================================================================
      const stageP = (exactFrame - 12) / 2; // 0.0 -> 1.0 across 4a -> 4t -> 4b
      this.drawPortalZoomThrough(ctx, imgA, imgB, cw, ch, dpr, t, fx, fy, px, py, time);
      this.drawFullBody7PainOverlay(ctx, cw, ch, dpr, stageP, time);

    } else if (idxA === 14 && imgA) {
      // Hold/Zoom-through on Stage 4 full recovery before flying to Stage 5
      this.drawPortalZoomThrough(ctx, imgA, imgB, cw, ch, dpr, t, fx, fy, px, py, time);
      if (t < 0.45) {
        this.drawFullBody7PainOverlay(ctx, cw, ch, dpr, 1.0, time);
      }

    } else if ((idxA === 15 || idxA === 16) && imgA && imgB) {
      // =====================================================================
      // STAGE 5: AGING FATIGUE -> 24K EMPEROR GONGJINDAN PORTAL -> GRACEFUL ELDER
      // =====================================================================
      const stageP = (exactFrame - 15) / 2;
      this.drawPortalZoomThrough(ctx, imgA, imgB, cw, ch, dpr, t, fx, fy, px, py, time);
      this.drawGongjindanVitalityOverlay(ctx, cw, ch, dpr, stageP, time);

    } else {
      // Universal 3D Z-Axis Portal Zoom-Through between scenes/stages
      this.drawPortalZoomThrough(ctx, imgA, imgB, cw, ch, dpr, t, fx, fy, px, py, time);
      if (idxA === 2 && idxB === 3) {
        this.drawImmunityHealingOverlay(ctx, cw, ch, dpr, t, time);
      }
    }

    // Draw 3D Perspective Depth Grid / Tunnel Guide Lines at edges
    this.draw3DTunnelDepthGuides(ctx, cw, ch, dpr, p, time);

    // Draw Universal Bottom-Right On-Video Treatment Status Callout
    const activeFrameObj = VIDEO_FRAMES[Math.min(totalFrames - 1, Math.round(exactFrame))];
    if (activeFrameObj) {
      this.drawOnVideoTreatmentBadge(ctx, cw, ch, dpr, activeFrameObj, exactFrame, time);
    }
  }

  // =========================================================================
  // Subtle 3D Z-Axis Perspective Tunnel Rings (Reinforces Forward Flight)
  // =========================================================================
  draw3DTunnelDepthGuides(ctx, cw, ch, dpr, p, time) {
    ctx.save();
    const vanishX = cw * 0.58;
    const vanishY = ch * 0.48;
    const maxR = Math.hypot(cw, ch) * 0.72;

    // 3 concentric depth rings expanding continuously as p advances
    for (let i = 0; i < 3; i++) {
      const ringProgress = ((p * 9 + i / 3) % 1.0);
      const r = Math.pow(ringProgress, 1.8) * maxR;
      const alpha = Math.sin(ringProgress * Math.PI) * 0.14;

      ctx.strokeStyle = `rgba(253, 230, 138, ${alpha.toFixed(3)})`;
      ctx.lineWidth = 1.2 * dpr;
      ctx.beginPath();
      ctx.ellipse(vanishX, vanishY, r, r * 0.62, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
  }

  // =========================================================================
  // On-Video Medical Cinema AR Overlays
  // =========================================================================

  // 1C: Childhood Cold -> Herbal Immunity Recovery Aura
  drawImmunityHealingOverlay(ctx, cw, ch, dpr, t, time) {
    ctx.save();
    const cx = cw * 0.65;
    const cy = ch * 0.54;
    const radius = cw * (0.08 + t * 0.22);

    const grad = ctx.createRadialGradient(cx, cy, radius * 0.1, cx, cy, radius);
    grad.addColorStop(0, `rgba(253, 230, 138, ${0.32 * Math.sin(t * Math.PI)})`);
    grad.addColorStop(0.6, `rgba(16, 185, 129, ${0.2 * Math.sin(t * Math.PI)})`);
    grad.addColorStop(1, 'rgba(16, 185, 129, 0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // 1D: Child Height Growth AR Ruler & Growth Plate Scan Wave
  drawGrowthTherapyOverlay(ctx, cw, ch, dpr, t, time) {
    ctx.save();
    const childX = cw * 0.635;
    const headY = ch * (0.245 - t * 0.115);
    const kneeY = ch * 0.76;
    const spineY = ch * (0.48 - t * 0.05);

    const scanY = kneeY - ((time * 0.65) % 1.0) * (kneeY - headY);
    const scanGrad = ctx.createLinearGradient(childX - cw * 0.07, scanY, childX + cw * 0.07, scanY);
    scanGrad.addColorStop(0, 'rgba(253, 230, 138, 0)');
    scanGrad.addColorStop(0.5, 'rgba(253, 230, 138, 0.8)');
    scanGrad.addColorStop(1, 'rgba(253, 230, 138, 0)');
    ctx.strokeStyle = scanGrad;
    ctx.lineWidth = 2.5 * dpr;
    ctx.beginPath();
    ctx.moveTo(childX - cw * 0.065, scanY);
    ctx.lineTo(childX + cw * 0.065, scanY);
    ctx.stroke();

    [kneeY, spineY].forEach(ny => {
      const g = ctx.createRadialGradient(childX, ny, 2 * dpr, childX, ny, 28 * dpr);
      g.addColorStop(0, 'rgba(253, 230, 138, 0.7)');
      g.addColorStop(0.5, 'rgba(16, 185, 129, 0.28)');
      g.addColorStop(1, 'rgba(16, 185, 129, 0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(childX, ny, 28 * dpr, 0, Math.PI * 2);
      ctx.fill();
    });

    const cmVal = (134.0 + t * 20.5).toFixed(1);
    const deltaCm = (t * 20.5).toFixed(1);
    ctx.strokeStyle = 'rgba(253, 230, 138, 0.92)';
    ctx.lineWidth = 2 * dpr;
    ctx.setLineDash([5 * dpr, 4 * dpr]);
    ctx.beginPath();
    ctx.moveTo(childX - cw * 0.055, headY);
    ctx.lineTo(childX + cw * 0.095, headY);
    ctx.stroke();
    ctx.setLineDash([]);

    const pillX = childX + cw * 0.02;
    const pillY = headY - 30 * dpr;
    ctx.fillStyle = 'rgba(3, 24, 17, 0.88)';
    ctx.strokeStyle = '#FBBF24';
    ctx.lineWidth = 1.5 * dpr;
    ctx.beginPath();
    ctx.roundRect(pillX, pillY, 215 * dpr, 26 * dpr, 13 * dpr);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#FDE68A';
    ctx.font = `800 ${12 * dpr}px "Plus Jakarta Sans", sans-serif`;
    ctx.fillText(`▲ 성장치료 신장: ${cmVal}cm (+${deltaCm}cm)`, pillX + 12 * dpr, pillY + 17 * dpr);
    ctx.restore();
  }

  // STAGE 2: Obesity -> Slimming Lipolysis Scan Wave
  drawObesitySlimmingOverlay(ctx, cw, ch, dpr, stageP, time) {
    ctx.save();
    const cx = cw * 0.66;
    const waistY = ch * 0.64;
    const halfW = cw * (0.095 - stageP * 0.032);

    const scanY = ch * (0.42 + ((time * 0.45) % 1.0) * 0.42);
    const grad = ctx.createLinearGradient(cx - halfW * 1.4, scanY, cx + halfW * 1.4, scanY);
    grad.addColorStop(0, 'rgba(251, 191, 36, 0)');
    grad.addColorStop(0.5, 'rgba(251, 191, 36, 0.7)');
    grad.addColorStop(1, 'rgba(251, 191, 36, 0)');
    ctx.strokeStyle = grad;
    ctx.lineWidth = 2 * dpr;
    ctx.beginPath();
    ctx.moveTo(cx - halfW * 1.3, scanY);
    ctx.lineTo(cx + halfW * 1.3, scanY);
    ctx.stroke();
    ctx.restore();
  }

  // STAGE 3: 30s Hair Loss -> Scalp Cooling & Follicle Regrowth Wave
  drawHairRegrowthOverlay(ctx, cw, ch, dpr, stageP, time) {
    ctx.save();
    const scalpX = cw * 0.62;
    const scalpY = ch * 0.22;
    const r = cw * 0.11;

    const grad = ctx.createRadialGradient(scalpX, scalpY, r * 0.1, scalpX, scalpY, r);
    if (stageP < 0.35) {
      grad.addColorStop(0, `rgba(239, 68, 68, ${0.32 * (1 - stageP * 2)})`);
      grad.addColorStop(1, 'rgba(239, 68, 68, 0)');
    } else {
      const pulse = 0.22 + 0.1 * Math.sin(time * 3);
      grad.addColorStop(0, `rgba(52, 211, 153, ${pulse})`);
      grad.addColorStop(0.6, `rgba(253, 230, 138, ${pulse * 0.6})`);
      grad.addColorStop(1, 'rgba(16, 185, 129, 0)');
    }

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(scalpX, scalpY, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // =========================================================================
  // STAGE 4: FULL-BODY 7-REGION PAIN TO RECOVERY VISUALIZATION
  // (굽은 척추 + ①목 · ②어깨 · ③팔/손목 · ④척추 · ⑤허리/골반 · ⑥다리/무릎 · ⑦발/발목)
  // =========================================================================
  drawFullBody7PainOverlay(ctx, cw, ch, dpr, stageP, time) {
    ctx.save();

    // Interpolate 7 anatomical joint coordinates from crooked/pain posture (stageP=0)
    // to straight/healed full-body posture (stageP=1) on our full-body live-action shot!
    const lerp = (a, b, t) => a + (b - a) * t;
    const p = Math.max(0, Math.min(1, stageP));

    const joints = [
      {
        id: 'neck',
        labelPain: '① 목 통증 (거북목·경추)',
        labelHeal: '✓ 목·경추 정렬 완료',
        x: cw * lerp(0.562, 0.548, p),
        y: ch * lerp(0.225, 0.195, p),
        threshold: 0.18,
        side: 'right'
      },
      {
        id: 'shoulder',
        labelPain: '② 어깨 결림 (회전근개)',
        labelHeal: '✓ 어깨 통증 해소',
        x: cw * lerp(0.518, 0.532, p),
        y: ch * lerp(0.245, 0.245, p),
        threshold: 0.28,
        side: 'left'
      },
      {
        id: 'arm',
        labelPain: '③ 팔·손목 통증 (엘보·저림)',
        labelHeal: '✓ 팔·손목 신경 회복',
        x: cw * lerp(0.435, 0.522, p),
        y: ch * lerp(0.355, 0.495, p),
        threshold: 0.38,
        side: 'left'
      },
      {
        id: 'spine',
        labelPain: '④ 굽은 척추 (14.8° 틀어짐)',
        labelHeal: '✓ 굽은 척추 0.0° 수직교정',
        x: cw * lerp(0.495, 0.538, p),
        y: ch * lerp(0.335, 0.345, p),
        threshold: 0.50,
        side: 'right'
      },
      {
        id: 'waist',
        labelPain: '⑤ 허리·골반 디스크 통증',
        labelHeal: '✓ 허리·골반 균형 회복',
        x: cw * lerp(0.465, 0.538, p),
        y: ch * lerp(0.445, 0.455, p),
        threshold: 0.62,
        side: 'left'
      },
      {
        id: 'leg',
        labelPain: '⑥ 다리·무릎 관절 통증',
        labelHeal: '✓ 다리·무릎 관절 치유',
        x: cw * lerp(0.482, 0.542, p),
        y: ch * lerp(0.685, 0.685, p),
        threshold: 0.76,
        side: 'right'
      },
      {
        id: 'foot',
        labelPain: '⑦ 발·발목 (염좌·족저근막)',
        labelHeal: '✓ 발·발목 통증 완치',
        x: cw * lerp(0.485, 0.545, p),
        y: ch * lerp(0.920, 0.920, p),
        threshold: 0.88,
        side: 'right'
      }
    ];

    // 1. Draw Full-Body Skeletal Alignment Line (Neck -> Shoulder -> Spine -> Waist -> Leg -> Foot)
    const chainIndices = [0, 1, 3, 4, 5, 6];
    ctx.lineWidth = 2.5 * dpr;
    ctx.strokeStyle = p < 0.45 ? 'rgba(248, 113, 113, 0.78)' : 'rgba(52, 211, 153, 0.88)';
    ctx.beginPath();
    chainIndices.forEach((ji, idx) => {
      const pt = joints[ji];
      if (idx === 0) ctx.moveTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    });
    ctx.stroke();

    // Branch line from Shoulder (1) to Arm/Wrist (2)
    ctx.beginPath();
    ctx.moveTo(joints[1].x, joints[1].y);
    ctx.lineTo(joints[2].x, joints[2].y);
    ctx.stroke();

    // 2. Draw Top-to-Bottom Chuna Full-Body Healing Scan Wave
    if (p > 0.08 && p < 0.96) {
      const waveY = ch * lerp(0.18, 0.95, p);
      const waveGrad = ctx.createLinearGradient(cw * 0.40, waveY, cw * 0.68, waveY);
      waveGrad.addColorStop(0, 'rgba(16, 185, 129, 0)');
      waveGrad.addColorStop(0.5, 'rgba(253, 230, 138, 0.88)');
      waveGrad.addColorStop(1, 'rgba(16, 185, 129, 0)');
      ctx.strokeStyle = waveGrad;
      ctx.lineWidth = 3 * dpr;
      ctx.beginPath();
      ctx.moveTo(cw * 0.40, waveY);
      ctx.lineTo(cw * 0.68, waveY);
      ctx.stroke();
    }

    // 3. Draw Each of the 7 Full-Body Joint Nodes & Floating Callout Pills
    joints.forEach((j, idx) => {
      const isHealed = p >= j.threshold;
      const pulseR = (9 + Math.sin(time * 4.5 + idx) * 3.5) * dpr;

      // Outer pulse ring
      ctx.strokeStyle = isHealed ? 'rgba(52, 211, 153, 0.85)' : 'rgba(239, 68, 68, 0.85)';
      ctx.lineWidth = 1.8 * dpr;
      ctx.beginPath();
      ctx.arc(j.x, j.y, pulseR, 0, Math.PI * 2);
      ctx.stroke();

      // Core node dot
      ctx.fillStyle = isHealed ? '#10B981' : '#EF4444';
      ctx.beginPath();
      ctx.arc(j.x, j.y, 4.5 * dpr, 0, Math.PI * 2);
      ctx.fill();

      // Callout Tag on desktop screens
      if (cw > 780 * dpr) {
        const label = isHealed ? j.labelHeal : j.labelPain;
        ctx.font = `700 ${10.5 * dpr}px "Plus Jakarta Sans", "Pretendard", sans-serif`;
        const tw = ctx.measureText(label).width;
        const pw = tw + 16 * dpr;
        const ph = 20 * dpr;
        const pxOffset = j.side === 'right' ? 18 * dpr : (-pw - 18 * dpr);
        const bx = j.x + pxOffset;
        const by = j.y - ph * 0.5;

        // Leader line
        ctx.strokeStyle = isHealed ? 'rgba(52, 211, 153, 0.6)' : 'rgba(248, 113, 113, 0.6)';
        ctx.lineWidth = 1 * dpr;
        ctx.beginPath();
        ctx.moveTo(j.x, j.y);
        ctx.lineTo(j.side === 'right' ? bx : bx + pw, j.y);
        ctx.stroke();

        // Tag pill
        ctx.fillStyle = 'rgba(2, 18, 12, 0.86)';
        ctx.strokeStyle = isHealed ? '#34D399' : '#F87171';
        ctx.lineWidth = 1.2 * dpr;
        ctx.beginPath();
        ctx.roundRect(bx, by, pw, ph, 10 * dpr);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = isHealed ? '#A7F3D0' : '#FCA5A5';
        ctx.fillText(label, bx + 8 * dpr, by + 13.8 * dpr);
      }
    });

    ctx.restore();
  }

  // STAGE 5: Aging Fatigue -> 24K Emperor Gongjindan Golden Vitality Wave
  drawGongjindanVitalityOverlay(ctx, cw, ch, dpr, stageP, time) {
    if (stageP < 0.15) return;
    ctx.save();
    const pillX = cw * 0.585;
    const pillY = ch * 0.78;
    const maxR = cw * (0.12 + stageP * 0.36);

    const grad = ctx.createRadialGradient(pillX, pillY, 4 * dpr, pillX, pillY, maxR);
    grad.addColorStop(0, `rgba(253, 230, 138, ${0.38 * Math.sin(stageP * Math.PI)})`);
    grad.addColorStop(0.5, `rgba(197, 160, 89, ${0.2 * stageP})`);
    grad.addColorStop(1, 'rgba(197, 160, 89, 0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(pillX, pillY, maxR, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // Universal On-Video Treatment Status Overlay
  drawOnVideoTreatmentBadge(ctx, cw, ch, dpr, frameObj, exactFrame, time) {
    if (!frameObj.arBadge || cw < 700 * dpr) return;
    ctx.save();

    const text = frameObj.arBadge;
    ctx.font = `700 ${12.5 * dpr}px "Plus Jakarta Sans", "Pretendard", sans-serif`;
    const textW = ctx.measureText(text).width;
    const boxW = textW + 32 * dpr;
    const boxH = 32 * dpr;
    const bx = Math.min(cw - boxW - 28 * dpr, cw * 0.52);
    const by = ch - 196 * dpr;

    ctx.fillStyle = 'rgba(2, 18, 12, 0.84)';
    ctx.strokeStyle = frameObj.phase === 'before'
      ? 'rgba(248, 113, 113, 0.65)'
      : 'rgba(253, 230, 138, 0.65)';
    ctx.lineWidth = 1.5 * dpr;

    ctx.beginPath();
    ctx.roundRect(bx, by, boxW, boxH, 16 * dpr);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = frameObj.phase === 'before' ? '#FCA5A5' : '#FDE68A';
    ctx.fillText(text, bx + 16 * dpr, by + 20.5 * dpr);
    ctx.restore();
  }

  // =========================================================================
  // Master 60fps Animation Loop (3D Z-Axis Forward Flight + Scroll Scrubbing)
  // =========================================================================
  animate() {
    requestAnimationFrame(() => this.animate());

    const now = performance.now();
    const dt = Math.min(0.05, (now - this.lastFrameTime) * 0.001);
    this.lastFrameTime = now;
    const time = now * 0.001;

    this.mouseParallax.x += (this.mouseParallax.targetX - this.mouseParallax.x) * 0.06;
    this.mouseParallax.y += (this.mouseParallax.targetY - this.mouseParallax.y) * 0.06;

    const timeSinceScroll = now - this.lastScrollTimestamp;
    const cardsSec = document.getElementById('signature-cards');
    const inCardsView = cardsSec && cardsSec.getBoundingClientRect().top < window.innerHeight * 0.5;
    const track = document.getElementById('story-scroll-track');

    if (this.isAutoPlaying && !inCardsView) {
      this.targetPlayheadP += dt * 0.018;
      if (this.targetPlayheadP > 1.0) {
        this.targetPlayheadP = 0.0;
        this.playheadP = 0.0;
      } else {
        this.playheadP += (this.targetPlayheadP - this.playheadP) * 0.06;
      }
      if (track) {
        const total = Math.max(1, track.offsetHeight - window.innerHeight);
        window.scrollTo(0, this.targetPlayheadP * total);
      }
    } else {
      if (track) {
        const rect = track.getBoundingClientRect();
        const total = Math.max(1, track.offsetHeight - window.innerHeight);
        if (rect.top <= 10 && rect.bottom >= 0) {
          this.targetPlayheadP = Math.min(1.0, Math.max(0, -rect.top / total));
        }
      }
      this.playheadP += (this.targetPlayheadP - this.playheadP) * 0.085;
    }

    // 1. Render 60fps Type-C 3D Z-Axis Zoom-Through Canvas
    this.renderContinuousVideoCanvas(this.playheadP, time);

    // 2. Sync Frameless 3D Spatial HUD & Full-Body Pain Radar
    this.syncUIWithPlayhead(this.playheadP);

    // 3. Fly Three.js Camera Forward Through the 3D Particle Tunnel!
    if (this.camera && this.dustPoints && this.renderer) {
      this.camera.position.x = this.mouseParallax.x * 6.0;
      this.camera.position.y = -this.mouseParallax.y * 4.0;
      this.camera.lookAt(0, 0, -100);

      // Stream tunnel particles toward the camera (+Z) as the user flies forward
      const pos = this.dustPositions;
      const zSpeed = 0.35 + (timeSinceScroll < 300 ? 1.8 : 0.0);
      for (let i = 0; i < pos.length / 3; i++) {
        pos[i * 3 + 2] += zSpeed;
        if (pos[i * 3 + 2] > 50) {
          pos[i * 3 + 2] = -250;
        }
      }
      this.dustPoints.geometry.attributes.position.needsUpdate = true;
      this.dustMat.opacity = 0.18 + this.currentLightWarmth * 0.24;
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

// ============================================================================
// 4. GLOBAL NAVIGATION, AUTOPLAY TOGGLE & RESERVATION HELPERS
// ============================================================================
function toggleCinemaAutoPlay() {
  const app = window.bareunApp;
  if (!app) return;
  app.isAutoPlaying = !app.isAutoPlaying;
  if (app.autoPlayBtn) {
    app.autoPlayBtn.classList.toggle('paused', !app.isAutoPlaying);
  }
  if (app.autoPlayText) {
    app.autoPlayText.textContent = app.isAutoPlaying
      ? '🚀 3D 공간 관통(Zoom-Through) 주행 중'
      : '⏸ 공간 주행 일시정지 (스크롤 제어)';
  }
}

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
  const progressMap = [0.0, 6 / 17, 9 / 17, 12 / 17, 15 / 17];
  const targetProgress = progressMap[stepNum - 1] ?? 0.0;
  const scrollTarget = track.offsetTop + trackHeight * targetProgress;

  if (window.bareunApp) {
    window.bareunApp.targetPlayheadP = targetProgress;
    window.bareunApp.lastScrollTimestamp = performance.now();
  }
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

// ============================================================================
// 5. CINEMATIC ORCHESTRAL & 3D SPATIAL BGM ENGINE (FOR MAIN HOMEPAGE)
// ============================================================================
(function initMainCinemaBGM() {
  let ctx = null;
  let masterGain = null;
  let reverbNode = null;
  let isPlaying = false;
  let userMuted = false;
  let chordTimer = null;
  let melodyTimer = null;
  let chordIdx = 0;

  const CHORDS = [
    { bass: 87.31,  pad: [174.61, 220.00, 261.63, 329.63, 392.00], scale: [523.25, 587.33, 659.25, 783.99, 880.00] },
    { bass: 98.00,  pad: [196.00, 246.94, 293.66, 329.63, 392.00], scale: [587.33, 659.25, 783.99, 880.00, 987.77] },
    { bass: 82.41,  pad: [164.81, 246.94, 293.66, 329.63, 392.00], scale: [493.88, 587.33, 659.25, 783.99, 987.77] },
    { bass: 110.00, pad: [220.00, 261.63, 329.63, 392.00, 493.88], scale: [523.25, 659.25, 783.99, 880.00, 1046.50] }
  ];

  function createHallReverb(audioCtx) {
    const duration = 3.4;
    const rate = audioCtx.sampleRate;
    const length = Math.floor(rate * duration);
    const impulse = audioCtx.createBuffer(2, length, rate);
    for (let ch = 0; ch < 2; ch++) {
      const data = impulse.getChannelData(ch);
      for (let i = 0; i < length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2.5) * 0.42;
      }
    }
    const conv = audioCtx.createConvolver();
    conv.buffer = impulse;
    return conv;
  }

  function ensureAudio() {
    if (ctx) return;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    ctx = new AudioCtx();
    masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
    masterGain.connect(ctx.destination);

    reverbNode = createHallReverb(ctx);
    const revGain = ctx.createGain();
    revGain.gain.value = 0.65;
    reverbNode.connect(revGain);
    revGain.connect(masterGain);
  }

  function playChord() {
    if (!ctx || !isPlaying) return;
    const now = ctx.currentTime;
    const chord = CHORDS[chordIdx % CHORDS.length];
    chordIdx++;

    const bassOsc = ctx.createOscillator();
    const bassLp = ctx.createBiquadFilter();
    const bassG = ctx.createGain();
    bassOsc.type = 'triangle';
    bassOsc.frequency.setValueAtTime(chord.bass, now);
    bassLp.type = 'lowpass';
    bassLp.frequency.setValueAtTime(240, now);
    bassG.gain.setValueAtTime(0.0001, now);
    bassG.gain.linearRampToValueAtTime(0.095, now + 1.8);
    bassG.gain.exponentialRampToValueAtTime(0.0008, now + 6.2);
    bassOsc.connect(bassLp);
    bassLp.connect(bassG);
    bassG.connect(masterGain);
    bassG.connect(reverbNode);
    bassOsc.start(now);
    bassOsc.stop(now + 6.3);

    chord.pad.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const lp = ctx.createBiquadFilter();
      const g = ctx.createGain();
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq * (1 + (idx - 2) * 0.0012), now);
      lp.type = 'lowpass';
      lp.frequency.setValueAtTime(1150, now);
      const peak = 0.038 / Math.sqrt(idx + 1);
      g.gain.setValueAtTime(0.0001, now);
      g.gain.linearRampToValueAtTime(peak, now + 2.0);
      g.gain.exponentialRampToValueAtTime(0.0005, now + 6.4);
      osc.connect(lp);
      lp.connect(g);
      g.connect(reverbNode);
      g.connect(masterGain);
      osc.start(now);
      osc.stop(now + 6.5);
    });
  }

  function playPianoNote() {
    if (!ctx || !isPlaying) return;
    const now = ctx.currentTime;
    const chord = CHORDS[(chordIdx - 1 + CHORDS.length) % CHORDS.length];
    const freq = chord.scale[Math.floor(Math.random() * chord.scale.length)];
    const osc = ctx.createOscillator();
    const lp = ctx.createBiquadFilter();
    const g = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(1750, now);
    lp.frequency.exponentialRampToValueAtTime(420, now + 2.5);
    g.gain.setValueAtTime(0.0001, now);
    g.gain.linearRampToValueAtTime(0.05, now + 0.035);
    g.gain.exponentialRampToValueAtTime(0.0004, now + 3.2);
    osc.connect(lp);
    lp.connect(g);
    g.connect(reverbNode);
    g.connect(masterGain);
    osc.start(now);
    osc.stop(now + 3.3);
  }

  function syncAudioUI() {
    const btn = document.getElementById('audio-toggle');
    const stateEl = document.getElementById('audio-state');
    if (btn) btn.classList.toggle('audio-playing', isPlaying);
    if (stateEl) stateEl.textContent = isPlaying ? 'On 🔊' : 'Off';
  }

  function startBGM() {
    if (userMuted || isPlaying) return;
    ensureAudio();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();
    isPlaying = true;
    masterGain.gain.cancelScheduledValues(ctx.currentTime);
    masterGain.gain.setValueAtTime(Math.max(0.001, masterGain.gain.value), ctx.currentTime);
    masterGain.gain.linearRampToValueAtTime(0.82, ctx.currentTime + 1.6);
    playChord();
    setTimeout(playPianoNote, 500);
    chordTimer = setInterval(playChord, 4800);
    melodyTimer = setInterval(playPianoNote, 1950);
    syncAudioUI();
  }

  function stopBGM() {
    if (!ctx || !isPlaying) return;
    isPlaying = false;
    clearInterval(chordTimer);
    clearInterval(melodyTimer);
    masterGain.gain.cancelScheduledValues(ctx.currentTime);
    masterGain.gain.setValueAtTime(masterGain.gain.value, ctx.currentTime);
    masterGain.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
    syncAudioUI();
  }

  window.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('audio-toggle');
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isPlaying) {
          userMuted = true;
          stopBGM();
        } else {
          userMuted = false;
          startBGM();
        }
      });
    }
    const autoUnlock = () => {
      if (!isPlaying && !userMuted) startBGM();
    };
    window.addEventListener('wheel', autoUnlock, { passive: true, once: true });
    window.addEventListener('pointerdown', autoUnlock, { passive: true, once: true });
    window.addEventListener('touchstart', autoUnlock, { passive: true, once: true });
  });
})();

window.addEventListener('DOMContentLoaded', () => {
  window.bareunApp = new BareunMasterpieceStoryApp();
});

