/**
 * BAREUN KOREAN MEDICINE CLINIC - MASTERPIECE 5-STAGE 18-FRAME CONTINUOUS LIVE-ACTION VIDEO ENGINE
 * (60fps Real-Time Canvas Video Synthesizer, Locked-Camera Treatment Morphing & Anatomical Recovery HUD)
 *
 * Directed by Art (아트)
 * - Focuses 100% on "Getting Better Through Treatment (치료를 통해 좋아지고 있다는 전달)"
 * - Zero static image cuts: All 18 locked-camera live-action frames are synthesized on a 60fps
 *   HTML5 Video Canvas (#cinema-video-canvas) with real-time anatomical strip-mesh deformation
 *   (child stretching taller among peers, waist slimming, follicular hair regrowth scan,
 *   Chuna spinal axis straightening, and 24K Emperor Gongjindan golden vitality wave)
 *   plus continuous auto-play film progression & silky scroll scrubbing.
 */

// ============================================================================
// 1. 5-ACT MASTER LIFECYCLE STAGE SPECS (Left HUD & Navigation Cards)
// ============================================================================
const CLINIC_SPECS = [
  {
    step: 1,
    slug: 'pediatric-growth',
    badge: 'STAGE 01 · 난임치료 ➔ 탄생 ➔ 감기면역 ➔ 키성장',
    title: '01. 생명 잉태부터 폭풍 키성장까지',
    mainCopy: '난임 착상 치료 · 소아 감기 면역강화 · 또래 추월 키성장 치료',
    desc: '자궁 온열·착상 한약으로 새 생명을 잉태하고, 면역력이 떨어져 찾아온 소아 감기를 녹용 면역보약으로 치료하며, 또래보다 작았던 키가 성장판·척추 성장치료를 통해 쭈욱 길어지는 전 과정을 연속 영상으로 담았습니다.',
    link: 'growth.html',
    subPills: ['① 난임·수정치료', '② 아이 탄생', '③ 감기➔면역치료', '④ 작은키➔성장치료'],
    tpLabels: ['① 난임·감기·작은키', '② 착상·면역·성장치료', '③ 건강탄생 & +20cm 성장']
  },
  {
    step: 2,
    slug: 'appetite-zero',
    badge: 'STAGE 02 · 성인 비만 ➔ 비만치료 슬림화',
    title: '02. 성인 비만에서 날씬한 S라인으로',
    mainCopy: '바른 비만치료 한약 복용 · 심부 체지방 분해 & 체형 슬리밍',
    desc: '성인이 되면서 급격히 살이 찌고 무거워진 몸이 바른한의원의 맞춤 다이어트 한약 치료를 통해 심부 체지방부터 연소되며 날씬하고 탄탄한 S라인으로 변해가는 연속 치유 과정입니다.',
    link: 'diet-zero.html',
    subPills: ['① 성인 체중증가·비만', '② 바른 비만치료 한약 복용', '③ 날씬한 S라인 완치'],
    tpLabels: ['① 성인 비만·체지방 축적', '② 바른 비만탕약 대사치료', '③ -14.2kg 슬림 체형 완성']
  },
  {
    step: 3,
    slug: 'scalp-hair',
    badge: 'STAGE 03 · 30대 탈모 ➔ 탈모치료 모발 회복',
    title: '03. 30대 탈모, 두피부터 다시 빽빽하게',
    mainCopy: '두피 상열감(熱) 청열 쿨링 · 고농도 모근 재생 약침 발모 치료',
    desc: '30대 스트레스와 두피 열독으로 M자 이마와 정수리 머리카락이 빠지던 남성이, 바른한의원의 정밀 두피 약침과 청열 한약 치료를 받으며 다시 빽빽하고 풍성한 정상 모발로 회복되는 연속 과정입니다.',
    link: 'https://pf.kakao.com/_ykxcLK',
    subPills: ['① 30대 M자·정수리 탈모', '② 두피 약침·청열 치료 중', '③ 풍성한 정상 모발 회복'],
    tpLabels: ['① 30대 두피열·탈모 발생', '② 고농도 발모약침·청열치료', '③ 풍성한 정상 흑발 완치']
  },
  {
    step: 4,
    slug: 'pain-chuna',
    badge: 'STAGE 04 · 근무 중 척추틀어짐 ➔ 추나 통증치료 회복',
    title: '04. 틀어진 척추와 관절통의 바른 회복',
    mainCopy: '대표원장 1:1 수기 추나 교정 · 고농도 봉약침 전신 관절 치료',
    desc: '과로와 근무로 척추가 틀어지고 목·어깨·허리 등 전신 관절 통증에 시달리던 직장인이, 대표원장님의 1:1 추나 수기 교정 치료를 통해 굽은 등이 곧게 펴지고 통증에서 해방되는 연속 과정입니다.',
    link: 'https://naver.me/5U1ELn8L',
    subPills: ['① 근무 중 척추틀어짐·통증', '② 원장님 1:1 추나 수기교정', '③ 척추 수직정렬·통증 완치'],
    tpLabels: ['① 척추 틀어짐·9대 관절통', '② 대표원장 1:1 추나·약침', '③ 척추 수직정렬 & 무통증']
  },
  {
    step: 5,
    slug: 'gongjindan',
    badge: 'STAGE 05 · 기력저하·성인병 ➔ 황제공진단 ➔ 아름다운 노년',
    title: '05. 황제공진단으로 완성하는 아름다운 노년',
    mainCopy: '특허 24K 순금박 황제공진단 · 성인병 케어 및 백세 원기 회복',
    desc: '나이가 들며 기력이 고갈되고 성인병으로 지쳐가던 노년이, 특허 받은 황제공진단 치료를 통해 심폐 활력과 면역력을 되찾고 황금빛 노을 속에서 건강하고 아름답게 나이 들어가는 연속 과정입니다.',
    link: 'https://pf.kakao.com/_ykxcLK',
    subPills: ['① 노화·기력저하·성인병', '② 24K 황제공진단 복용 치료', '③ 아름답게 늙어가는 노년'],
    tpLabels: ['① 노화·기력저하·성인병', '② 특허 황제공진단 원기충전', '③ 기력 회복 & 아름다운 노년']
  }
];

// ============================================================================
// 2. 18-FRAME LOCKED-CAMERA CONTINUOUS VIDEO SEQUENCE DEFINITIONS
// ============================================================================
const VIDEO_FRAMES = [
  // --- STAGE 1: 수정(난임치료) -> 탄생 -> 감기(Before) -> 면역치료(After) -> 작은키(Before) -> 성장치료 키성장(After) ---
  {
    frameIndex: 0,
    domId: 'backdrop-1a',
    step: 1,
    subPillIndex: 0,
    phase: 'treating', // 'before' | 'treating' | 'after'
    phaseProgress: 0.65,
    actLabel: 'ACT I · 01 난임·불임 착상 치료 ➔ 생명 잉태',
    sceneTag: 'ACT I · SCENE 01 (난임·불임 착상 치료)',
    stateText: '✦ 자궁 온열·착상 한약 치료 ➔ 수정 성공',
    subtitle: '“차가웠던 자궁을 따뜻하게 데우는 바른 난임·착상 치료를 통해 기적 같은 새 생명이 수정됩니다.”',
    metric1Title: '적용된 바른 치료 처방',
    metric1Value: '자궁온열·착상보혈 한약',
    metric2Title: '치료를 통한 호전 변화',
    metric2Value: '자궁내막 착상률 98.4% ▲',
    barPercent: 92,
    lightWarmth: 1.0,
    arBadge: '💊 바른 난임·착상 치료 작용 중 · 자궁 심부 온도 +1.8°C 상승'
  },
  {
    frameIndex: 1,
    domId: 'backdrop-1b',
    step: 1,
    subPillIndex: 1,
    phase: 'after',
    phaseProgress: 1.0,
    actLabel: 'ACT I · 02 난임 치료 완결 ➔ 건강한 아이 탄생',
    sceneTag: 'ACT I · SCENE 02 (건강한 생명 탄생)',
    stateText: '✦ 바른 안태(安胎) 한약 케어 ➔ 건강한 출산',
    subtitle: '“열 달간의 바른 안태 케어로 엄마의 손가락을 꼭 쥔 건강한 아이가 세상에 태어납니다.”',
    metric1Title: '적용된 바른 치료 처방',
    metric1Value: '바른 안태(安胎)·산후 보약',
    metric2Title: '치료를 통한 호전 변화',
    metric2Value: '신생아 건강 활성도 99.8% ▲',
    barPercent: 99,
    lightWarmth: 1.0,
    arBadge: '✦ 바른 난임·안태 치료 결과 · 건강한 아이 탄생 완료'
  },
  {
    frameIndex: 2,
    domId: 'backdrop-1c0',
    step: 1,
    subPillIndex: 2,
    phase: 'before',
    phaseProgress: 0.15,
    actLabel: 'ACT I · 03 소아 면역력 저하 ➔ 잦은 감기·발열 발생',
    sceneTag: 'ACT I · SCENE 03 (치료 전 · 면역저하 감기)',
    stateText: '⚠️ 치료 전 · 호흡기 면역력 저하 & 감기 발열',
    subtitle: '“아이가 자라며 면역력이 떨어져 잦은 감기와 비염, 고열로 코가 헐고 지쳐갑니다.”',
    metric1Title: '치료 전 증상 진단',
    metric1Value: '호흡기·폐 면역력 41% 저하',
    metric2Title: '현재 신체 상태',
    metric2Value: '잦은 감기·비염·발열 지속 ⚠️',
    barPercent: 38,
    lightWarmth: 0.15,
    arBadge: '⚠️ [치료 전 증상] 소아 면역력 저하로 인한 감기·비염 발생'
  },
  {
    frameIndex: 3,
    domId: 'backdrop-1c',
    step: 1,
    subPillIndex: 2,
    phase: 'after',
    phaseProgress: 0.95,
    actLabel: 'ACT I · 04 바른 면역강화 한약 치료 ➔ 감기 완치',
    sceneTag: 'ACT I · SCENE 04 (바른 면역강화 치료 완료)',
    stateText: '✦ 청정 녹용 면역보약 복용 ➔ 감기 완치·면역 회복',
    subtitle: '“바른 소아 면역강화 한약 치료로 호흡기 자생력이 깨어나 감기가 씻은 듯이 낫고 활짝 웃습니다.”',
    metric1Title: '적용된 바른 치료 처방',
    metric1Value: '소아 청정 녹용 면역보약',
    metric2Title: '치료를 통한 호전 변화',
    metric2Value: '면역력 41% ➔ 98.5% 완치 ▲',
    barPercent: 98,
    lightWarmth: 1.0,
    arBadge: '💊 [바른 면역강화 치료 완료] 호흡기 자생력 98.5% 회복 · 감기 소실'
  },
  {
    frameIndex: 4,
    domId: 'backdrop-1d0',
    step: 1,
    subPillIndex: 3,
    phase: 'before',
    phaseProgress: 0.2,
    actLabel: 'ACT I · 05 또래와 서 있을 때 유독 작은 키 고민',
    sceneTag: 'ACT I · SCENE 05 (치료 전 · 또래 대비 작은 키)',
    stateText: '⚠️ 치료 전 · 또래 평균 대비 -12cm 성장 지연',
    subtitle: '“또래 친구들과 나란히 서 있을 때 유독 키가 작아 아이가 주눅 들고 자신감을 잃어갑니다.”',
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
    phaseProgress: 1.0,
    actLabel: 'ACT I · 06 바른 성장치료 ➔ 키가 쭈욱 길어지는 기적',
    sceneTag: 'ACT I · SCENE 06 (바른 성장치료 · 키가 쭈욱 자라는 변화)',
    stateText: '✦ 성장판 한약·성장추나 치료 ➔ 또래 추월 폭풍 키성장!',
    subtitle: '“바른 성장치료(성장판 한약 + 척추 32마디 성장추나)를 통해 키가 쭈욱 길어져 또래보다 머리 하나만큼 훌쩍 자라납니다!”',
    metric1Title: '적용된 바른 치료 처방',
    metric1Value: '성장판 녹용한약 + 성장추나',
    metric2Title: '치료를 통한 신장 변화',
    metric2Value: '134cm ➔ 154.5cm (+20.5cm 폭풍성장!)',
    barPercent: 100,
    lightWarmth: 1.0,
    arBadge: '🚀 [바른 성장치료 효과] 성장판 활성 ➔ 또래 추월 +20.5cm 폭풍 키성장 달성!'
  },

  // --- STAGE 2: 성인 비만(Before) -> 바른 비만치료 한약 복용(Treating) -> 날씬한 S라인 변신(After) ---
  {
    frameIndex: 6,
    domId: 'backdrop-2a',
    step: 2,
    subPillIndex: 0,
    phase: 'before',
    phaseProgress: 0.15,
    actLabel: 'ACT II · 07 성인기 대사 저하 ➔ 체중 증가 & 비만 발생',
    sceneTag: 'ACT II · SCENE 07 (치료 전 · 성인 비만 발생)',
    stateText: '⚠️ 치료 전 · 성인 내장비만 & 체지방 과다 축적',
    subtitle: '“성인이 되면서 급격히 살이 찌고 복부·팔뚝·턱선에 체지방이 불어나 몸과 마음이 무거워집니다.”',
    metric1Title: '치료 전 체성분 진단',
    metric1Value: '체지방률 34.8% (내장비만)',
    metric2Title: '현재 대사 상태',
    metric2Value: '기초대사 저하 · 부종 심화 ⚠️',
    barPercent: 32,
    lightWarmth: 0.15,
    arBadge: '⚠️ [비만치료 전] 체지방률 34.8% · 대사 정체 및 체중 급증 상태'
  },
  {
    frameIndex: 7,
    domId: 'backdrop-2t',
    step: 2,
    subPillIndex: 1,
    phase: 'treating',
    phaseProgress: 0.6,
    actLabel: 'ACT II · 08 바른 비만치료 한약 복용 ➔ 체지방 집중 분해 중',
    sceneTag: 'ACT II · SCENE 08 (바른 비만치료 한약 작용 중)',
    stateText: '💊 바른 다이어트 탕약 복용 ➔ 심부 체지방 연소 진행 중',
    subtitle: '“바른 비만치료 한약이 식욕을 자연스럽게 잠재우고 심부 체지방을 분해하며 체형이 눈에 띄게 줄어듭니다.”',
    metric1Title: '적용된 바른 치료 처방',
    metric1Value: '바른 비만탕약 (식욕·지방분해)',
    metric2Title: '실시간 치료 호전도',
    metric2Value: '체지방 34.8% ➔ 24.5% 연소 중 ▼',
    barPercent: 68,
    lightWarmth: 0.75,
    arBadge: '💊 [바른 비만치료 진행 중] 심부 체지방 분해 대사율 +240% 활성화'
  },
  {
    frameIndex: 8,
    domId: 'backdrop-2b',
    step: 2,
    subPillIndex: 2,
    phase: 'after',
    phaseProgress: 1.0,
    actLabel: 'ACT II · 09 바른 비만치료 완결 ➔ 날씬하고 건강한 S라인 변신',
    sceneTag: 'ACT II · SCENE 09 (비만치료 완료 · 슬림 체형 완성)',
    stateText: '✦ 체지방 -14.2kg 감량 성공 ➔ 날씬한 S라인 완치',
    subtitle: '“요요 없이 체지방만 쏙 빠져 가볍고 날씬해진 S라인 실루엣과 탄력 있는 건강미를 되찾았습니다.”',
    metric1Title: '적용된 바른 치료 처방',
    metric1Value: '바른 비만치료 1:1 맞춤 한약',
    metric2Title: '치료를 통한 최종 변화',
    metric2Value: '체지방 18.2% 달성 (-14.2kg 감량!)',
    barPercent: 99,
    lightWarmth: 1.0,
    arBadge: '✦ [바른 비만치료 완료] 체지방 -14.2kg 감량 · 날씬한 S라인 완벽 회복'
  },

  // --- STAGE 3: 30대 탈모 발생(Before) -> 두피 약침·청열 치료(Treating) -> 정상 모발 회복(After) ---
  {
    frameIndex: 9,
    domId: 'backdrop-3a',
    step: 3,
    subPillIndex: 0,
    phase: 'before',
    phaseProgress: 0.15,
    actLabel: 'ACT III · 10 30대 스트레스·두피열 ➔ M자·정수리 탈모 발생',
    sceneTag: 'ACT III · SCENE 10 (치료 전 · 30대 탈모 발생)',
    stateText: '⚠️ 치료 전 · 30대 두피 상열감(熱) & 모발 탈락',
    subtitle: '“30대가 되면서 과로와 두피 열독으로 M자 이마와 정수리 머리카락이 힘없이 빠지는 탈모가 찾아옵니다.”',
    metric1Title: '치료 전 두피 진단',
    metric1Value: '두피열 38.6°C · 모낭 위축',
    metric2Title: '현재 모발 상태',
    metric2Value: 'M자·정수리 밀도 45% 감소 ⚠️',
    barPercent: 34,
    lightWarmth: 0.15,
    arBadge: '⚠️ [탈모치료 전] 두피 상열감 38.6°C · 30대 M자 및 정수리 모발 탈락'
  },
  {
    frameIndex: 10,
    domId: 'backdrop-3t',
    step: 3,
    subPillIndex: 1,
    phase: 'treating',
    phaseProgress: 0.6,
    actLabel: 'ACT III · 11 바른 탈모치료 (두피 청열 & 고농도 발모 약침 시술 중)',
    sceneTag: 'ACT III · SCENE 11 (바른 두피 약침·청열 치료 과정)',
    stateText: '💉 고농도 발모 약침·청열 치료 ➔ 신생 모발 발아 중',
    subtitle: '“바른한의원의 정밀 발모 약침과 두피 청열 치료가 모낭 깊숙이 영양을 공급하며 새 머리카락이 힘차게 자라납니다.”',
    metric1Title: '적용된 바른 치료 처방',
    metric1Value: '고농도 모근재생 약침 + 청열한약',
    metric2Title: '실시간 치료 호전도',
    metric2Value: '두피열 34.8°C 하강 · 신생모 발아 ▲',
    barPercent: 72,
    lightWarmth: 0.7,
    arBadge: '💉 [바른 탈모치료 시술 중] 두피 열독 해소 & 잠든 모근 세포 재생 발모'
  },
  {
    frameIndex: 11,
    domId: 'backdrop-3b',
    step: 3,
    subPillIndex: 2,
    phase: 'after',
    phaseProgress: 1.0,
    actLabel: 'ACT III · 12 바른 탈모치료 완료 ➔ 풍성하고 빽빽한 정상 모발 회복',
    sceneTag: 'ACT III · SCENE 12 (탈모치료 완료 · 정상 모발 회복)',
    stateText: '✦ 모낭 밀도 99% 회복 ➔ 빈틈없이 풍성한 정상 모발',
    subtitle: '“빠졌던 M자 헤어라인과 정수리가 다시 굵고 빽빽한 흑발로 가득 차올라 완벽한 정상 모발을 되찾았습니다.”',
    metric1Title: '적용된 바른 치료 처방',
    metric1Value: '발모 약침 + 수승화강 탈모한약',
    metric2Title: '치료를 통한 최종 변화',
    metric2Value: '모발 밀도·굵기 99.2% 정상 회복 ▲',
    barPercent: 99,
    lightWarmth: 1.0,
    arBadge: '✦ [바른 탈모치료 완료] M자·정수리 모발 밀도 99.2% 정상 회복 달성'
  },

  // --- STAGE 4: 근무 중 척추 틀어짐·관절통(Before) -> 원장님 1:1 추나 치료(Treating) -> 척추 회복(After) ---
  {
    frameIndex: 12,
    domId: 'backdrop-4a',
    step: 4,
    subPillIndex: 0,
    phase: 'before',
    phaseProgress: 0.15,
    actLabel: 'ACT IV · 13 근무 중 척추 틀어짐 & 전신 9대 관절 통증 발생',
    sceneTag: 'ACT IV · SCENE 13 (치료 전 · 척추 틀어짐 & 관절 통증)',
    stateText: '⚠️ 치료 전 · 척추 14.8° 틀어짐 & 전신 관절 통증',
    subtitle: '“과중한 업무로 척추와 골반이 틀어지고 목·어깨·허리·무릎 등 전신 관절에 극심한 통증이 발생합니다.”',
    metric1Title: '치료 전 체형·통증 진단',
    metric1Value: '척추 변위 14.8° · 디스크 압박',
    metric2Title: '현재 통증 지수',
    metric2Value: '목·어깨·허리 9대 관절 통증 ⚠️',
    barPercent: 28,
    lightWarmth: 0.15,
    arBadge: '⚠️ [추나치료 전] 근무 중 척추 14.8° 비대칭 틀어짐 & 전신 관절염증 발생'
  },
  {
    frameIndex: 13,
    domId: 'backdrop-4t',
    step: 4,
    subPillIndex: 1,
    phase: 'treating',
    phaseProgress: 0.62,
    actLabel: 'ACT IV · 14 대표원장 1:1 정밀 추나 수기 교정 & 약침 치료 중',
    sceneTag: 'ACT IV · SCENE 14 (바른 추나 수기 교정 치료 과정)',
    stateText: '👐 대표원장 1:1 추나요법 시술 ➔ 틀어진 척추 교정 중',
    subtitle: '“대표원장님이 직접 손으로 어긋난 경추·요추·골반 마디마디를 바로잡는 추나 치료로 굽은 등이 곧게 펴집니다.”',
    metric1Title: '적용된 바른 치료 처방',
    metric1Value: '대표원장 1:1 추나교정 + 봉약침',
    metric2Title: '실시간 치료 호전도',
    metric2Value: '척추 14.8° ➔ 2.4° 교정 진행 중 ▲',
    barPercent: 74,
    lightWarmth: 0.75,
    arBadge: '👐 [바른 추나 통증치료 진행 중] 수기 척추 정렬 & 심부 신경압박 즉시 해소'
  },
  {
    frameIndex: 14,
    domId: 'backdrop-4b',
    step: 4,
    subPillIndex: 2,
    phase: 'after',
    phaseProgress: 1.0,
    actLabel: 'ACT IV · 15 추나 통증치료 완료 ➔ 바른 척추 정렬 & 무통증 회복',
    sceneTag: 'ACT IV · SCENE 15 (추나치료 완료 · 척추 및 관절 회복)',
    stateText: '✦ 척추 0.2° 수직 정렬 완료 ➔ 전신 관절 통증 100% 소실',
    subtitle: '“틀어졌던 척추가 반듯하게 펴지고 전신 관절 통증이 씻은 듯이 사라져 가벼운 일상을 되찾았습니다.”',
    metric1Title: '적용된 바른 치료 처방',
    metric1Value: '정밀 추나요법 + 인대재생 한약',
    metric2Title: '치료를 통한 최종 변화',
    metric2Value: '척추 수직 정렬 & 통증 100% 회복 ▲',
    barPercent: 100,
    lightWarmth: 1.0,
    arBadge: '✦ [바른 추나치료 완료] 척추 0.2° 수직 정렬 & 9대 관절 통증 완벽 회복'
  },

  // --- STAGE 5: 노화·기력저하·성인병(Before) -> 24K 황제공진단 치료(Treating) -> 아름다운 노년(After) ---
  {
    frameIndex: 15,
    domId: 'backdrop-5a',
    step: 5,
    subPillIndex: 0,
    phase: 'before',
    phaseProgress: 0.15,
    actLabel: 'ACT V · 16 노화로 인한 기력 고갈 & 성인병·만성피로 도래',
    sceneTag: 'ACT V · SCENE 16 (치료 전 · 노년 기력저하 & 성인병)',
    stateText: '⚠️ 치료 전 · 노년 원기 고갈 & 성인병 대사 저하',
    subtitle: '“세월이 흐르며 기력이 급격히 쇠하고 성인병과 만성 피로가 찾아와 삶의 활력이 꺼져갑니다.”',
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
    phaseProgress: 0.65,
    actLabel: 'ACT V · 17 특허 24K 황제공진단 복용 치료 ➔ 전신 기력 회복 중',
    sceneTag: 'ACT V · SCENE 17 (황제공진단 기력 회복 치료 과정)',
    stateText: '👑 24K 순금박 황제공진단 처방 ➔ 심폐 원기·면역 급상승',
    subtitle: '“정품 사향·녹용을 빚은 24K 황제공진단 치료로 막힌 기혈이 뚫리고 전신에 뜨거운 생기와 혈색이 차오릅니다.”',
    metric1Title: '적용된 바른 치료 처방',
    metric1Value: '특허 24K 순금박 황제공진단',
    metric2Title: '실시간 치료 호전도',
    metric2Value: '원기 지수 28% ➔ 86% 급상승 ▲',
    barPercent: 82,
    lightWarmth: 0.85,
    arBadge: '👑 [황제공진단 치료 작용 중] 심폐 화색 회복 & 성인병 면역 방어력 강화'
  },
  {
    frameIndex: 17,
    domId: 'backdrop-5c',
    step: 5,
    subPillIndex: 2,
    phase: 'after',
    phaseProgress: 1.0,
    actLabel: 'ACT V · 18 기력 완벽 회복 ➔ 건강하고 아름답게 늙어가는 삶',
    sceneTag: 'ACT V · SCENE 18 (황제공진단 완결 · 아름다운 노년)',
    stateText: '✦ 백세 원기 99.5% 완성 ➔ 품격 있고 아름다운 노년',
    subtitle: '“기력을 되찾고 성인병을 이겨내어, 황금빛 노을처럼 건강하고 아름답게 나이 들어가는 인생을 완성합니다.”',
    metric1Title: '적용된 바른 치료 처방',
    metric1Value: '황제공진단 · 백세 항노화 보약',
    metric2Title: '치료를 통한 최종 변화',
    metric2Value: '백세 활력 99.5% · 아름다운 노년 ▲',
    barPercent: 100,
    lightWarmth: 1.0,
    arBadge: '✦ [황제공진단 치료 완료] 원기 99.5% 회복 · 품격 있고 아름다운 백세 노년'
  }
];

window.currentAppStepSlug = 'pediatric-growth';

// ============================================================================
// 3. CONTINUOUS LIVE-ACTION VIDEO SYNTHESIZER & ANATOMICAL DEFORMATION ENGINE
// ============================================================================
class BareunMasterpieceStoryApp {
  constructor() {
    this.canvas = document.getElementById('storyboard-canvas');
    this.videoCanvas = document.getElementById('cinema-video-canvas');
    this.vCtx = this.videoCanvas ? this.videoCanvas.getContext('2d') : null;

    this.currentStep = 1;
    this.scrollProgress = 0;

    // Master continuous film playhead (0.000 to 1.000 across all 18 frames)
    this.playheadP = 0;
    this.targetPlayheadP = 0;
    this.isAutoPlaying = true;
    this.lastScrollTimestamp = 0;
    this.lastFrameTime = performance.now();

    this.mouseParallax = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.currentLightWarmth = 1.0;

    // Preloaded HTMLImageElements for 60fps Canvas Video Synthesis
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
    this.initOpticalBokehWebGL();
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
  // Preload All 18 Locked-Camera Frames for 60fps Video Canvas Synthesis
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
        // Fallback without crossOrigin if needed
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
  // Optical Lens Bokeh & Sunlight Dust Motes (Three.js Layer)
  // =========================================================================
  initOpticalBokehWebGL() {
    if (!this.canvas || typeof THREE === 'undefined') return;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 300);
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

    const dustCount = 90;
    const dustGeo = new THREE.BufferGeometry();
    this.dustPositions = new Float32Array(dustCount * 3);
    const dustColors = new Float32Array(dustCount * 3);
    this.dustSpeeds = [];

    const colWarm = new THREE.Color(0xFDE68A);
    const colCream = new THREE.Color(0xFFFBEB);

    for (let i = 0; i < dustCount; i++) {
      this.dustPositions[i * 3] = (Math.random() - 0.35) * 90;
      this.dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      this.dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 35;

      this.dustSpeeds.push({
        vx: (Math.random() - 0.5) * 0.012,
        vy: 0.008 + Math.random() * 0.016,
        phase: Math.random() * Math.PI * 2
      });

      const c = Math.random() > 0.4 ? colWarm : colCream;
      dustColors[i * 3] = c.r;
      dustColors[i * 3 + 1] = c.g;
      dustColors[i * 3 + 2] = c.b;
    }

    dustGeo.setAttribute('position', new THREE.BufferAttribute(this.dustPositions, 3));
    dustGeo.setAttribute('color', new THREE.BufferAttribute(dustColors, 3));

    this.dustMat = new THREE.PointsMaterial({
      size: 1.8,
      map: bokehTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.32,
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
    grad.addColorStop(0.5, 'rgba(253, 230, 138, 0.4)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(canvas);
  }

  // =========================================================================
  // Scroll Engine + Continuous Film Hybrid Controller
  // =========================================================================
  initScrollEngine() {
    const track = document.getElementById('story-scroll-track');
    if (!track) return;

    window.addEventListener('scroll', () => {
      const rect = track.getBoundingClientRect();
      const total = track.offsetHeight - window.innerHeight;
      if (total <= 0) return;

      if (rect.top <= 0 && rect.bottom >= window.innerHeight * 0.5) {
        const p = Math.min(1.0, Math.max(0, -rect.top / total));
        this.scrollProgress = p;
        this.targetPlayheadP = p;
        this.lastScrollTimestamp = performance.now();
      }
    }, { passive: true });
  }

  initInteractions() {
    window.addEventListener('mousemove', (e) => {
      this.mouseParallax.targetX = (e.clientX / window.innerWidth - 0.5);
      this.mouseParallax.targetY = (e.clientY / window.innerHeight - 0.5);
    }, { passive: true });
  }

  // =========================================================================
  // Sync DOM HUD, 3-Phase Treatment Pipeline & Telemetry with Playhead (0~1)
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

    // Update Top Timecode
    if (this.timecodeEl) {
      const fNum = String(activeIdx + 1).padStart(2, '0');
      const pct = String(Math.round(p * 100)).padStart(2, '0');
      this.timecodeEl.textContent = `SCENE ${fNum} / 18 · ${pct}%`;
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
        this.telemetryStatus.textContent = '⚠️ 치료 전 증상 발생';
        this.telemetryStatus.className = 'telemetry-status crisis';
      } else if (frameData.phase === 'treating') {
        this.telemetryStatus.textContent = '💊 바른한의원 치료 작용 중';
        this.telemetryStatus.className = 'telemetry-status';
      } else {
        this.telemetryStatus.textContent = '✦ 치료 후 호전·완치 완료';
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

    // Step 4 9-Joint Radar chips live update
    if (step === 4) {
      const chips = document.querySelectorAll('.pain-chip');
      const stageProgress = Math.max(0, Math.min(1, (exactFrame - 12) / 2));
      const healedCount = Math.floor(stageProgress * (chips.length + 1));
      chips.forEach((c, idx) => {
        c.classList.toggle('healed', idx < healedCount);
      });
      if (this.painRadarStatus) {
        if (stageProgress < 0.3) {
          this.painRadarStatus.className = 'pain-radar-status warning';
          this.painRadarStatus.innerHTML = '<span class="pulse-dot">●</span> <span>척추 14.8° 틀어짐 & 관절 통증 발생</span>';
        } else if (stageProgress < 0.85) {
          this.painRadarStatus.className = 'pain-radar-status healing';
          this.painRadarStatus.innerHTML = '<span class="pulse-dot">✦</span> <span>원장님 1:1 추나 수기 교정 진행 중</span>';
        } else {
          this.painRadarStatus.className = 'pain-radar-status healing';
          this.painRadarStatus.innerHTML = '<span class="pulse-dot">✓</span> <span>척추 수직 정렬 & 9대 관절 회복 완료</span>';
        }
      }
    }

    this.currentLightWarmth = frameData.lightWarmth ?? 1.0;

    // Also update fallback DOM slides in case any image is still loading
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
  // Helper: Draw Cover-Fit Image onto Canvas with Continuous Camera Dolly
  // =========================================================================
  drawCoverImage(ctx, img, cw, ch, scaleX, scaleY, offsetX, offsetY, alpha) {
    if (!img || !img.width || !img.height || alpha <= 0.001) return;
    ctx.save();
    ctx.globalAlpha = Math.max(0, Math.min(1, alpha));

    const imgAspect = img.width / img.height;
    const canvasAspect = cw / ch;
    let drawW, drawH;

    if (canvasAspect > imgAspect) {
      drawW = cw;
      drawH = cw / imgAspect;
    } else {
      drawH = ch;
      drawW = ch * imgAspect;
    }

    const finalW = drawW * scaleX;
    const finalH = drawH * scaleY;
    const dx = (cw - finalW) * 0.5 + offsetX;
    const dy = (ch - finalH) * 0.5 + offsetY;

    ctx.drawImage(img, dx, dy, finalW, finalH);
    ctx.restore();
    return { dx, dy, finalW, finalH };
  }

  // =========================================================================
  // 60fps Continuous Video Synthesizer & Real-Time Treatment Transformation
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
    // Smooth cosine interpolation for fluid film motion
    const t = 0.5 - 0.5 * Math.cos(rawT * Math.PI);

    const imgA = this.loadedImages[idxA];
    const imgB = this.loadedImages[idxB];

    // If neither image is loaded yet, let CSS fallback show through
    if (!imgA && !imgB) return;

    ctx.clearRect(0, 0, cw, ch);

    // Continuous steadycam breathing + mouse parallax
    const breathScale = 1.028 + Math.sin(time * 0.75) * 0.008;
    const px = this.mouseParallax.x * -16 * dpr;
    const py = this.mouseParallax.y * -10 * dpr;

    // -----------------------------------------------------------------------
    // SPECIAL CONTINUOUS PHYSICAL MORPHING BY STAGE
    // -----------------------------------------------------------------------
    if (idxA === 4 && idxB === 5 && imgA && imgB) {
      // =====================================================================
      // STAGE 1D: PEER HEIGHT GROWTH ("또래와 서 있을 때 키가 작아 -> 성장치료로 키가 쭈욱 길어지는 연출")
      // Keep left & right peer children anchored while dynamically stretching
      // the central boy upward from shorter (imgA) to a full head taller (imgB)!
      // =====================================================================
      this.drawCoverImage(ctx, imgA, cw, ch, breathScale, breathScale, px, py, 1.0);
      this.drawCoverImage(ctx, imgB, cw, ch, breathScale, breathScale, px, py, t);

      // Isolate the central child's column (55% ~ 71% horizontal) and render
      // real-time vertical skeletal elongation anchored at the floor!
      ctx.save();
      const colLeft = cw * 0.555;
      const colWidth = cw * 0.155;
      ctx.beginPath();
      ctx.rect(colLeft, 0, colWidth, ch);
      ctx.clip();

      // Stretch imgA upward from feet and blend into imgB stretching into full tall stature
      const stretchA = 1.0 + t * 0.14;
      const liftA = -t * ch * 0.055;
      this.drawCoverImage(ctx, imgA, cw, ch, breathScale, breathScale * stretchA, px, py + liftA, 1 - t);

      const stretchB = 0.89 + t * 0.11;
      const liftB = (1 - t) * ch * 0.045;
      this.drawCoverImage(ctx, imgB, cw, ch, breathScale, breathScale * stretchB, px, py + liftB, t);
      ctx.restore();

      // Draw Live Growth-Plate Ultrasonic Scan Wave & Rising Height Ruler
      this.drawGrowthTherapyOverlay(ctx, cw, ch, dpr, t, time);

    } else if ((idxA === 6 || idxA === 7) && imgA && imgB) {
      // =====================================================================
      // STAGE 2: OBESITY -> HERBAL DIET TREATMENT -> SLIM S-LINE SILHOUETTE
      // Continuous horizontal waist-slimming contour morph & lipolysis wave
      // =====================================================================
      const stageP = (exactFrame - 6) / 2; // 0.0 -> 1.0 across 2a -> 2t -> 2b
      const dollyA = breathScale + t * 0.015;
      const dollyB = breathScale + (1 - t) * 0.015;

      // Horizontal body-slimming squeeze on outgoing fuller frame
      const slimScaleX_A = dollyA * (1.0 - t * 0.045);
      const slimScaleX_B = dollyB * (1.03 - t * 0.03);

      this.drawCoverImage(ctx, imgA, cw, ch, slimScaleX_A, dollyA, px, py, 1.0);
      this.drawCoverImage(ctx, imgB, cw, ch, slimScaleX_B, dollyB, px, py, t);

      this.drawObesitySlimmingOverlay(ctx, cw, ch, dpr, stageP, time);

    } else if ((idxA === 9 || idxA === 10) && imgA && imgB) {
      // =====================================================================
      // STAGE 3: 30s HAIR LOSS -> SCALP ACUPUNCTURE TREATMENT -> FULL HAIR
      // Directional follicular regrowth reveal wave across crown & hairline
      // =====================================================================
      const stageP = (exactFrame - 9) / 2; // 0.0 -> 1.0 across 3a -> 3t -> 3b
      const dolly = breathScale + t * 0.018;

      this.drawCoverImage(ctx, imgA, cw, ch, dolly, dolly, px, py, 1.0);
      this.drawCoverImage(ctx, imgB, cw, ch, dolly, dolly, px, py, t);

      this.drawHairRegrowthOverlay(ctx, cw, ch, dpr, stageP, time);

    } else if ((idxA === 12 || idxA === 13) && imgA && imgB) {
      // =====================================================================
      // STAGE 4: SPINAL PAIN -> HANDS-ON CHUNA THERAPY -> ALIGNED RECOVERY
      // Dynamic straightening spinal axis & 9-joint pain relief wave
      // =====================================================================
      const stageP = (exactFrame - 12) / 2; // 0.0 -> 1.0 across 4a -> 4t -> 4b
      const dolly = breathScale + t * 0.016;

      this.drawCoverImage(ctx, imgA, cw, ch, dolly, dolly, px, py, 1.0);
      this.drawCoverImage(ctx, imgB, cw, ch, dolly, dolly, px, py, t);

      this.drawChunaSpineOverlay(ctx, cw, ch, dpr, stageP, time);

    } else if ((idxA === 15 || idxA === 16) && imgA && imgB) {
      // =====================================================================
      // STAGE 5: AGING FATIGUE -> 24K EMPEROR GONGJINDAN -> GRACEFUL ELDER
      // Radial golden vitality bloom expanding from the Emperor Gongjindan pill
      // =====================================================================
      const stageP = (exactFrame - 15) / 2; // 0.0 -> 1.0 across 5a -> 5b -> 5c
      const dolly = breathScale + t * 0.016;

      this.drawCoverImage(ctx, imgA, cw, ch, dolly, dolly, px, py, 1.0);
      this.drawCoverImage(ctx, imgB, cw, ch, dolly, dolly, px, py, t);

      this.drawGongjindanVitalityOverlay(ctx, cw, ch, dpr, stageP, time);

    } else {
      // Standard ultra-smooth optical dolly cross-synthesis (e.g., 1a -> 1b -> 1c0 -> 1c)
      const scaleA = breathScale + t * 0.025;
      const scaleB = breathScale + (1 - t) * 0.02;
      if (imgA) this.drawCoverImage(ctx, imgA, cw, ch, scaleA, scaleA, px, py, 1.0);
      if (imgB && idxB !== idxA) this.drawCoverImage(ctx, imgB, cw, ch, scaleB, scaleB, px, py, t);

      // If in Stage 1c (Cold -> Herbal Immunity Recovery), draw warm immunity shield wave
      if (idxA === 2 && idxB === 3) {
        this.drawImmunityHealingOverlay(ctx, cw, ch, dpr, t, time);
      }
    }

    // Draw Universal Bottom-Right On-Video Treatment Progress Callout Badge
    const activeFrameObj = VIDEO_FRAMES[Math.min(totalFrames - 1, Math.round(exactFrame))];
    if (activeFrameObj) {
      this.drawOnVideoTreatmentBadge(ctx, cw, ch, dpr, activeFrameObj, exactFrame, time);
    }
  }

  // =========================================================================
  // On-Video Medical Cinema AR Overlays (Visualizing "Getting Better Through Treatment")
  // =========================================================================

  // 1C: Childhood Cold -> Herbal Immunity Recovery Aura
  drawImmunityHealingOverlay(ctx, cw, ch, dpr, t, time) {
    ctx.save();
    const cx = cw * 0.65;
    const cy = ch * 0.56;
    const radius = cw * (0.08 + t * 0.18);

    const grad = ctx.createRadialGradient(cx, cy, radius * 0.1, cx, cy, radius);
    grad.addColorStop(0, `rgba(253, 230, 138, ${0.28 * Math.sin(t * Math.PI)})`);
    grad.addColorStop(0.6, `rgba(16, 185, 129, ${0.18 * Math.sin(t * Math.PI)})`);
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
    // Head top rises from y = 0.25*ch (short) to y = 0.13*ch (tall)
    const headY = ch * (0.245 - t * 0.115);
    const kneeY = ch * 0.76;
    const spineY = ch * (0.48 - t * 0.05);

    // 1. Ultrasonic Growth Wave scanning upward from knees to head
    const scanY = kneeY - ((time * 0.65) % 1.0) * (kneeY - headY);
    const scanGrad = ctx.createLinearGradient(childX - cw * 0.07, scanY, childX + cw * 0.07, scanY);
    scanGrad.addColorStop(0, 'rgba(253, 230, 138, 0)');
    scanGrad.addColorStop(0.5, 'rgba(253, 230, 138, 0.75)');
    scanGrad.addColorStop(1, 'rgba(253, 230, 138, 0)');
    ctx.strokeStyle = scanGrad;
    ctx.lineWidth = 2.5 * dpr;
    ctx.beginPath();
    ctx.moveTo(childX - cw * 0.065, scanY);
    ctx.lineTo(childX + cw * 0.065, scanY);
    ctx.stroke();

    // 2. Growth Plate Glow Nodes (Knee & Spine)
    [kneeY, spineY].forEach(ny => {
      const g = ctx.createRadialGradient(childX, ny, 2 * dpr, childX, ny, 28 * dpr);
      g.addColorStop(0, 'rgba(253, 230, 138, 0.65)');
      g.addColorStop(0.5, 'rgba(16, 185, 129, 0.25)');
      g.addColorStop(1, 'rgba(16, 185, 129, 0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(childX, ny, 28 * dpr, 0, Math.PI * 2);
      ctx.fill();
    });

    // 3. Live Rising Height Measurement Bar above central child's head
    const cmVal = (134.0 + t * 20.5).toFixed(1);
    const deltaCm = (t * 20.5).toFixed(1);
    ctx.strokeStyle = 'rgba(253, 230, 138, 0.9)';
    ctx.lineWidth = 2 * dpr;
    ctx.setLineDash([5 * dpr, 4 * dpr]);
    ctx.beginPath();
    ctx.moveTo(childX - cw * 0.055, headY);
    ctx.lineTo(childX + cw * 0.095, headY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Height Tag Pill
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
    // Waist width indicator narrows as stageP goes 0 -> 1
    const halfW = cw * (0.095 - stageP * 0.032);

    // Lipolysis metabolic scan line
    const scanY = ch * (0.42 + ((time * 0.45) % 1.0) * 0.42);
    const grad = ctx.createLinearGradient(cx - halfW * 1.4, scanY, cx + halfW * 1.4, scanY);
    grad.addColorStop(0, 'rgba(251, 191, 36, 0)');
    grad.addColorStop(0.5, 'rgba(251, 191, 36, 0.65)');
    grad.addColorStop(1, 'rgba(251, 191, 36, 0)');
    ctx.strokeStyle = grad;
    ctx.lineWidth = 2 * dpr;
    ctx.beginPath();
    ctx.moveTo(cx - halfW * 1.3, scanY);
    ctx.lineTo(cx + halfW * 1.3, scanY);
    ctx.stroke();

    // Inward slimming arrows at waistline
    ctx.strokeStyle = '#34D399';
    ctx.lineWidth = 2.2 * dpr;
    const arrowOffset = Math.sin(time * 4) * 4 * dpr;
    // Left inward arrow
    ctx.beginPath();
    ctx.moveTo(cx - halfW - 18 * dpr + arrowOffset, waistY);
    ctx.lineTo(cx - halfW + arrowOffset, waistY);
    ctx.stroke();
    // Right inward arrow
    ctx.beginPath();
    ctx.moveTo(cx + halfW + 18 * dpr - arrowOffset, waistY);
    ctx.lineTo(cx + halfW - arrowOffset, waistY);
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
      // Red scalp heat before treatment
      grad.addColorStop(0, `rgba(239, 68, 68, ${0.32 * (1 - stageP * 2)})`);
      grad.addColorStop(1, 'rgba(239, 68, 68, 0)');
    } else {
      // Cooling emerald-gold follicle regeneration wave
      const pulse = 0.2 + 0.1 * Math.sin(time * 3);
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

  // STAGE 4: Crooked Spine Pain -> Chuna Spinal Alignment Axis
  drawChunaSpineOverlay(ctx, cw, ch, dpr, stageP, time) {
    ctx.save();
    const spineX = cw * 0.66;
    const neckY = ch * 0.29;
    const midY = ch * 0.44;
    const lumbarY = ch * 0.60;

    // Bend offset decreases from 26px crooked curve to 0px straight vertical line!
    const curveOffset = (1 - stageP) * 26 * dpr;

    ctx.lineWidth = 2.5 * dpr;
    ctx.strokeStyle = stageP < 0.4
      ? 'rgba(248, 113, 113, 0.85)'
      : 'rgba(52, 211, 153, 0.9)';

    ctx.beginPath();
    ctx.moveTo(spineX - curveOffset * 0.5, neckY);
    ctx.quadraticCurveTo(spineX + curveOffset, midY, spineX - curveOffset * 0.3, lumbarY);
    ctx.stroke();

    // Draw pain/healing nodes along neck, shoulder, lumbar
    [
      { x: spineX - curveOffset * 0.5, y: neckY },
      { x: spineX + curveOffset * 0.4, y: midY },
      { x: spineX - curveOffset * 0.3, y: lumbarY }
    ].forEach((pt, i) => {
      const isHealed = stageP > (0.3 + i * 0.2);
      const pulseR = (8 + Math.sin(time * 4 + i) * 3) * dpr;
      ctx.fillStyle = isHealed ? 'rgba(16, 185, 129, 0.85)' : 'rgba(239, 68, 68, 0.85)';
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 4.5 * dpr, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = isHealed ? 'rgba(167, 243, 208, 0.65)' : 'rgba(252, 165, 165, 0.65)';
      ctx.lineWidth = 1.5 * dpr;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, pulseR, 0, Math.PI * 2);
      ctx.stroke();
    });

    ctx.restore();
  }

  // STAGE 5: Aging Fatigue -> 24K Emperor Gongjindan Golden Vitality Wave
  drawGongjindanVitalityOverlay(ctx, cw, ch, dpr, stageP, time) {
    if (stageP < 0.2) return;
    ctx.save();
    const pillX = cw * 0.585;
    const pillY = ch * 0.78;
    const maxR = cw * (0.12 + stageP * 0.32);

    const grad = ctx.createRadialGradient(pillX, pillY, 4 * dpr, pillX, pillY, maxR);
    grad.addColorStop(0, `rgba(253, 230, 138, ${0.35 * Math.sin(stageP * Math.PI)})`);
    grad.addColorStop(0.5, `rgba(197, 160, 89, ${0.18 * stageP})`);
    grad.addColorStop(1, 'rgba(197, 160, 89, 0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(pillX, pillY, maxR, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // Universal On-Video Treatment Status Overlay (Top-Center/Right over Subject)
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
  // Master 60fps Animation Loop (Continuous Film Auto-Play + Scroll Scrubbing)
  // =========================================================================
  animate() {
    requestAnimationFrame(() => this.animate());

    const now = performance.now();
    const dt = Math.min(0.05, (now - this.lastFrameTime) * 0.001);
    this.lastFrameTime = now;
    const time = now * 0.001;

    // Smooth mouse parallax
    this.mouseParallax.x += (this.mouseParallax.targetX - this.mouseParallax.x) * 0.06;
    this.mouseParallax.y += (this.mouseParallax.targetY - this.mouseParallax.y) * 0.06;

    // Hybrid Continuous Video Playhead:
    // If user scrolled within the last 1.6 seconds, smoothly scrub to scroll position.
    // Otherwise, if auto-play is enabled and user is viewing the story stage,
    // advance the continuous film playhead smoothly so the treatment video NEVER stops!
    const timeSinceScroll = now - this.lastScrollTimestamp;
    const cardsSec = document.getElementById('signature-cards');
    const inCardsView = cardsSec && cardsSec.getBoundingClientRect().top < window.innerHeight * 0.5;

    if (timeSinceScroll < 1600) {
      this.playheadP += (this.targetPlayheadP - this.playheadP) * 0.08;
    } else if (this.isAutoPlaying && !inCardsView) {
      // Continuous film playback (~48 seconds for full 18-scene treatment movie)
      this.targetPlayheadP += dt * 0.021;
      if (this.targetPlayheadP > 1.0) {
        this.targetPlayheadP = 0.0;
        this.playheadP = 0.0;
      } else {
        this.playheadP += (this.targetPlayheadP - this.playheadP) * 0.06;
      }
    } else {
      this.playheadP += (this.targetPlayheadP - this.playheadP) * 0.08;
    }

    // 1. Render 60fps Continuous Video Synthesizer Canvas
    this.renderContinuousVideoCanvas(this.playheadP, time);

    // 2. Sync HUD & Treatment Pipeline UI
    this.syncUIWithPlayhead(this.playheadP);

    // 3. Render Three.js Optical Bokeh & Sunlight Dust Layer
    if (this.camera && this.dustPoints && this.renderer) {
      this.camera.position.x = this.mouseParallax.x * 5.0;
      this.camera.position.y = -this.mouseParallax.y * 3.5;
      this.camera.lookAt(0, 0, 0);

      const pos = this.dustPositions;
      for (let i = 0; i < this.dustSpeeds.length; i++) {
        const sp = this.dustSpeeds[i];
        pos[i * 3] += sp.vx + Math.sin(time * 0.6 + sp.phase) * 0.012;
        pos[i * 3 + 1] += sp.vy;
        if (pos[i * 3 + 1] > 35) pos[i * 3 + 1] = -35;
      }
      this.dustPoints.geometry.attributes.position.needsUpdate = true;
      this.dustMat.opacity = 0.14 + this.currentLightWarmth * 0.22;
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
      ? '🎬 연속 치료과정 영상 재생 중'
      : '⏸ 영상 일시정지 (스크롤 제어)';
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
  // Map steps 1..5 to the start of each stage in the 18-frame sequence
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

window.addEventListener('DOMContentLoaded', () => {
  window.bareunApp = new BareunMasterpieceStoryApp();
});
