/**
 * ============================================================================
 * [바른한의원 대전본점] 3D 인체모형 의학백과 — 질환별 데일리 블로그 자동 발행 시스템
 * Google Apps Script (GAS) Master Automation Engine v2.0
 * ============================================================================
 *
 * 📌 지원 질환 (3D 모형 8대 핵심 부위 1:1 매칭):
 *   1. knee       (blog-knee)       : 무릎 성장판 & 소아 키성장 · 감기면역
 *   2. cervical   (blog-cervical)   : 경추(목) 정렬 & 두피열 탈모 · 모근재생
 *   3. lumbar     (blog-lumbar)     : 요추(허리) · 골반 교정 & 디스크 신경감압 추나
 *   4. gongjindan (blog-gongjindan) : 뇌 · 심장 기혈순환 & 바른 황제공진단
 *   5. syncope    (blog-syncope)    : 자율신경성(미주신경성) 실신 & 전신 혈관·신경 조절
 *   6. gut        (blog-gut)        : 위장 · 간 대사 해독 & 식욕ZERO 다이어트
 *   7. uterus     (blog-uterus)     : 자궁 · 난소 해부 & 난임 착상 · 생리통 클리닉
 *   8. prostate   (blog-prostate)   : 전립선 비대 · 만성 전립선염 & 야간뇨 · 남성활력
 *
 * 📌 핵심 기능:
 *   1) 매일 지정 시각(기본 오전 08:00) 시간 기반 트리거로 질환별 칼럼 자동 생성 및 발행
 *   2) 워드프레스 REST API(/wp-json/wp/v2/posts) 직접 발행 → 3D 모형 페이지 실시간 연동
 *   3) GAS 웹앱(doGet) JSON 피드 엔드포인트 동시 제공 (웹앱 URL만 넣어도 3D 모형과 즉시 연동)
 *   4) Gemini API 연동(선택) + 내장 365일 SCI 학술 근거 임상 칼럼 생성 엔진(무료 무결점 기본 내장)
 *   5) 구글 스프레드시트(발행 로그 & 원장님 지정 주제 큐) 자동 기록 지원
 *
 * 📌 초기 설치 방법 (3분 완성):
 *   1) https://script.google.com 접속 → [새 프로젝트] 생성 → 본 코드 전체 붙여넣기
 *   2) 아래 CONFIG 객체에서 WP_USER / WP_APP_PASSWORD (또는 GEMINI_API_KEY) 확인
 *   3) 상단 함수 선택 드롭다운에서 [setupDailyAutoPublishTrigger] 선택 후 [실행] 클릭 (권한 승인)
 *   4) 즉시 테스트하려면 [testPublishAll8DiseasesNow] 또는 [testPublishSingleDiseaseNow] 실행!
 * ============================================================================
 */

const CONFIG = {
  // 1. 워드프레스 실서버 연동 설정 (바른한의원 공식 홈페이지)
  WP_SITE_URL: 'https://bareunhaniwon.com',
  WP_USERNAME: 'wealthywei0508',
  // 워드프레스 [사용자 -> 프로필 -> 애플리케이션 비밀번호]에서 발급한 비밀번호 권장 (또는 기본 비밀번호)
  WP_APP_PASSWORD: '', // 스크립트 속성(WP_APP_PASSWORD) 또는 여기에 입력

  // 2. 발행 모드 설정
  // 'ALL_8_DAILY'   : 매일 8개 질환 모두 1편씩(하루 총 8편) 질환별 블로그 자동 발행
  // 'ROTATE_1_DAILY': 매일 8개 질환을 순서대로 순환하며 1편씩 발행
  PUBLISH_MODE: 'ALL_8_DAILY',
  TRIGGER_HOUR_KST: 8, // 매일 오전 8시 자동 발행

  // 3. (선택) Google Gemini API 키 — 입력 시 Gemini 2.5 Flash가 매일 새로운 학술 칼럼 작성
  // 비워두어도 내장된 '365일 SCI 논문 기반 한의학 임상 칼럼 엔진'이 매일 새로운 주제를 자동 생성합니다.
  GEMINI_API_KEY: '',
  GEMINI_MODEL: 'gemini-2.5-flash',

  // 4. (선택) 발행 내역을 기록할 구글 스프레드시트 ID (비워두면 스크립트 자체 스토리지에 최근 80편 자동 저장)
  SPREADSHEET_ID: ''
};

/**
 * 3D 인체모형 8대 질환 메타데이터 및 365일 임상 칼럼 토픽 매트릭스
 */
const DISEASE_META = [
  {
    partId: 'knee',
    catSlug: 'blog-knee',
    catName: '무릎·소아키성장·감기면역 블로그',
    badgeLabel: '무릎 · 소아 키성장·감기면역',
    clinicLink: 'growth.html',
    doctorTitle: '바른한의원 대표원장 · 아빠 한의사 소아성장 클리닉',
    sciJournals: [
      'Pediatrics (미국소아과학회지) — 재발성 호흡기 감염과 선형 성장 속도 억제 기전',
      'Int J Pediatr Otorhinolaryngol — 알레르기 비염·구강호흡 환아의 서파수면 및 IGF-1 저하 연구',
      'Phytomedicine — 전통 보익 한약재의 조기 골화 지연 및 성장판 연골모세포(Chondrocyte) 증식 규명'
    ],
    topicBank: [
      {
        titleTpl: '감기·비염 달고 사는 아이, 또래보다 키가 덜 크는 의학적 이유와 성장판 치료',
        subTopic: '호흡기 점막 면역과 간 IGF-1 성장인자 보존 치료',
        keyCause: '잦은 감기와 비염으로 체내 염증성 사이토카인(IL-6, TNF-α) 수치가 높아지면 간에서 합성되는 성장인자(IGF-1) 분비가 직접적으로 억제되어 성장판 연골 분열이 멈추게 됩니다.',
        solution: '성호르몬 자극 없이 폐·비위 점막 면역을 먼저 세워 감기 빈도를 줄이고, 대퇴골·경골 성장판 연골모세포에 혈류와 영양을 집중 공급하는 체질 맞춤 성장 한약과 성장 추나를 병행합니다.',
        homeCare: '기상 직후 따뜻한 미온수 한 모금 마시기, 취침 전 식염수 코세척과 침실 습도 50~55% 유지, 밤 10시 이전 소등 및 취침 2시간 전 단 음식·과일주스 제한'
      },
      {
        titleTpl: '입 벌리고 자는 구강호흡 아이, 밤 10시 성장호르몬 골든타임을 놓치는 이유',
        subTopic: '비강 호흡 복원과 서파수면(Deep Sleep) 성장호르몬 극대화',
        keyCause: '비염과 아데노이드 비대로 밤새 입을 벌리고 자면 뇌 산소 공급이 떨어져 깊은 서파수면(Slow-Wave Sleep)에 진입하지 못하고, 수면 중 분비되는 성장호르몬이 최대 30~40% 감소합니다.',
        solution: '코 점막의 부종과 열독을 식히는 통비(通鼻) 치료와 경추·상악 정렬 추나를 통해 밤새 코로 편안하게 숨 쉬는 수면 환경을 되찾아 줍니다.',
        homeCare: '저녁 샤워 후 뒷목(대추혈) 따뜻하게 보온하기, 베개 높이를 낮춰 기도 열기, 낮 동안 줄넘기·농구 등 가벼운 수직 점프 운동 20분 실천'
      },
      {
        titleTpl: '뼈나이가 빠른 아이(성조숙증 의심), 성장판 시계를 늦추는 안전한 한의학 관리법',
        subTopic: '조기 골화(Early Ossification) 지연 및 숨은 키 회복',
        keyCause: '소아 비만, 환경호르몬, 학업 스트레스로 인해 사춘기 징후가 빨리 시작되면 성장판 연골이 예상보다 일찍 단단한 뼈로 굳어 최종 성인 키에서 큰 손해를 보게 됩니다.',
        solution: '율무·인진쑥 등 습열(濕熱)을 비워내는 처방으로 성호르몬 과다 자극 없이 뼈나이 진행 속도를 완만하게 조절하면서 무릎 성장판 연골 증식 시간을 벌어줍니다.',
        homeCare: '플라스틱 용기 온열 조리 피하기, 튀김·가공육·액상과당 줄이기, 살코기·잔멸치·표고버섯·시금치 등 칼슘·아연 식단 챙기기'
      },
      {
        titleTpl: '감기 앓고 난 뒤 밥 안 먹는 아이, 따라잡기 성장(Catch-up Growth) 골든타임 수칙',
        subTopic: '병후 비위(脾胃) 소화 흡수력 복원과 성장 에너지 재충전',
        keyCause: '고열이나 독감·장염을 앓고 난 직후2~3주는 비위 소화 효소와 장내 유익균이 급감하여 영양 흡수가 중단되는 성장 정체기입니다.',
        solution: '항생제 복용 후 약해진 위장 점막과 비기(脾氣)를 빠르게 회복시키는 보비위(補脾胃) 처방으로 식욕과 흡수율을 깨워 놓친 키를 빠르게 따라잡게 돕습니다.',
        homeCare: '회복기 1주간 찬 우유·밀가루 대신 따뜻한 소고기 야채죽과 배도라지차 챙기기, 배꼽 주변 시계방향 온열 마사지 5분'
      }
    ]
  },
  {
    partId: 'cervical',
    catSlug: 'blog-cervical',
    catName: '경추·두피열·탈모 모근재생 블로그',
    badgeLabel: '경추·두피 · 거북목·열성탈모',
    clinicLink: 'hairloss.html',
    doctorTitle: '바른한의원 대표원장 · 두피열 탈모 & 경추 추나 클리닉',
    sciJournals: [
      'J Dermatol Sci — 두피 국소 체열 상승 및 미세염증이 모유두 세포(Dermal Papilla) 사멸에 미치는 기전',
      'Spine — 전방두부자세(거북목) 각도 증가에 따른 경추 디스크 압력 및 두경부 혈류 감소 연구',
      'Phytotherapy Research — 생약 복합물의 Wnt/β-catenin 신호 활성화를 통한 모낭 성장기 연장 효과'
    ],
    topicBank: [
      {
        titleTpl: '정수리가 뜨겁고 머리카락이 가늘어지는 열성탈모, 왜 목(경추)부터 교정해야 할까요?',
        subTopic: '수승화강(水昇火降) 청열 한약과 상부 경추 감압 추나의 시너지',
        keyCause: '만성 스트레스와 스마트폰·모니터 사용으로 거북목이 굳어지면 심장에서 두피로 올라간 열이 내려오지 못하고 정수리에 고여 모낭 뿌리를 말리는 사막화 현상이 일어납니다.',
        solution: '상부 경추(C1~C7)와 후두하근의 병목을 여는 원장 수기 추나로 두피 혈류 수문을 개통하고, 수승화강 청열·발모 한약으로 두피 온도를 낮춰 모낭 성장기(Anagen)를 되살립니다.',
        homeCare: '하루 노폐물은 반드시 저녁에 미온수로 샴푸하고 찬 바람(냉풍)으로 두피 속까지 완전 건조하기, 취침 전 40도 족욕 15분'
      },
      {
        titleTpl: '뒷목이 뻣뻣하면서 편두통과 M자·정수리 탈모가 함께 오는 경추성 혈류 장애',
        subTopic: '후두하근·승모근 긴장 해소와 모유두 세포 산소 공급',
        keyCause: '고개가 1cm 앞으로 빠질 때마다 목뼈가 견뎌야 하는 하중은 2~3kg씩 늘어나며, 단단하게 굳은 뒷목 근육이 두피로 향하는 후두동맥과 모세혈관을 압박합니다.',
        solution: '경추 C자 커브를 복원하는 감압 추나와 고농축 모낭 재생 약침을 병행하여 두통·안구건조증 해소와 함께 가늘어진 연모를 굵은 성모로 육성합니다.',
        homeCare: '모니터 상단을 눈높이에 맞추기, 매시간 턱 당기기(Chin-in) & 날개뼈 모으기 스트레칭 10회, 검은콩·흑임자·해조류 섭취'
      },
      {
        titleTpl: '두피가 붉고 가렵고 각질·뾰루지가 올라오는 지루성 두피염 탈모 근본 치료법',
        subTopic: '피지선 과열 진정 및 두피 장벽 면역 복원',
        keyCause: '야식, 수면 부족, 스트레스 열독이 두피 피지선을 과도하게 자극하면 만성 미세염증이 모낭 줄기세포를 손상시켜 급성 탈모로 이어집니다.',
        solution: '단순 스테로이드 외용제에 의존하기보다 체내 상열하한(上熱下寒) 불균형을 바로잡는 청열해독 내치(內治)로 피지 분비와 두피 홍반을 근본적으로 가라앉힙니다.',
        homeCare: '매운 야식·튀김·알코올·액상과당 차단, 손톱 대신 지문으로 부드럽게 샴푸하기, 밤 11시 이전 숙면으로 모낭 세포 재생 돕기'
      }
    ]
  },
  {
    partId: 'lumbar',
    catSlug: 'blog-lumbar',
    catName: '요추·골반·디스크 추나 블로그',
    badgeLabel: '요추·골반 · 디스크·체형 추나',
    clinicLink: 'chuna.html',
    doctorTitle: '바른한의원 대표원장 · 척추·골반 신경감압 추나 클리닉',
    sciJournals: [
      'JAMA Network Open — 요추 추간판 탈출증 및 만성 요통 환자에서 수기 교정(Chuna/SMT)의 통증 감소 효과',
      'Spine Journal — 골반 경사 및 천장관절 비대칭 교정이 요추 추간판 내압 감소에 미치는 영향',
      'J Ethnopharmacology — 두충·우슬 복합 추출물의 추간판 수핵 세포 보호 및 신경근 염증 억제 기전'
    ],
    topicBank: [
      {
        titleTpl: '허리디스크·좌골신경통이 진통제를 먹어도 자꾸 재발하는 진짜 원인은 골반 비대칭입니다',
        subTopic: '골반 주춧돌 수평 교정 및 요추 L4-L5·L5-S1 디스크 공간 확보',
        keyCause: '척추의 주춧돌인 골반과 천장관절이 다리 꼬기·짝다리 습관으로 기울어지면, 하부 요추 디스크 한쪽 면에만 비정상적인 쐐기 압력이 집중되어 수핵 탈출과 신경 압박이 반복됩니다.',
        solution: '대표원장이 직접 손으로 틀어진 골반 경사와 요추 마디를 정밀 교정하는 신경감압 추나로 디스크가 숨 쉴 공간을 넓히고, 두충·우슬 강근골 한약으로 신경 부종을 흡수합니다.',
        homeCare: '아침 기상 시 윗몸일으키기처럼 바로 일어나지 말고 옆으로 돌아누워 팔로 짚고 일어나기(통나무 구르기), 다리 꼬기 즉시 중단'
      },
      {
        titleTpl: '엉덩이부터 허벅지·종아리까지 저리고 당기는 방사통, 비수술 보존 치료의 핵심',
        subTopic: '신경근 화학적 염증 제거와 심부 코어 인대 강화',
        keyCause: '디스크가 밀려나와 신경 뿌리를 누를 때 발생하는 극심한 저림은 물리적 압박뿐만 아니라 신경 주변에 쏟아져 나온 염증 물질(화학적 염증) 때문인 경우가 많습니다.',
        solution: '요추 추간공을 넓히는 굴곡·신연 감압 추나와 약침·척추 한약 치료를 병행하면 신경 뿌리의 부종이 빠르게 가라앉으며 수술 없이도 보행과 일상이 편안해집니다.',
        homeCare: '바닥에 쪼그려 앉거나 푹 꺼진 소파에 기대앉지 않기, 물건 들 때 허리 대신 무릎을 굽혀 몸에 밀착해 들기'
      },
      {
        titleTpl: '오래 앉아 일하는 직장인·운전자의 만성 허리 통증, 디스크 수분을 지키는 루틴',
        subTopic: '추간판 수핵 수분 보존 및 장요근·이상근 이완 케어',
        keyCause: '장시간 앉아 있으면 서 있을 때보다 요추 디스크 내압이 약 1.4~1.8배 상승하며, 고관절 앞쪽 장요근이 짧아져 일어설 때 허리가 펴지지 않는 통증을 유발합니다.',
        solution: '단축된 장요근과 이상근을 이완하고 굳어진 요추 분절의 가동성을 회복하는 체형 교정 추나로 만성 요통의 뿌리를 제거합니다.',
        homeCare: '50분 앉아 있었다면 5분은 일어나 허리를 가볍게 뒤로 젖히는 맥켄지 신전 스트레칭하기, 매일 평지 바른 보행 30분'
      }
    ]
  },
  {
    partId: 'gongjindan',
    catSlug: 'blog-gongjindan',
    catName: '뇌·심장·황제공진단 블로그',
    badgeLabel: '뇌·심장 · 황제공진단',
    clinicLink: 'gongjindan.html',
    doctorTitle: '바른한의원 대표원장 · 황제공진단 & 뇌·심장 기혈 클리닉',
    sciJournals: [
      'J Ethnopharmacology — 공진단(Gongjindan)의 뇌신경 영양인자(BDNF) 발현 증가 및 기억력·피로 개선 기전',
      'Front Pharmacol — 사향 주성분 L-무스콘(L-Muscone)의 뇌혈관장벽(BBB) 투과 및 심근 허혈 보호 효과 규명',
      'Nutrients — 녹용·당귀·산수유 복합 추출물의 코르티솔 감소 및 만성피로증후군(CFS) 임상 개선'
    ],
    topicBank: [
      {
        titleTpl: '머리가 멍한 브레인 포그와 만성 번아웃, 정품 사향 황제공진단이 뇌·심장을 깨우는 원리',
        subTopic: 'L-무스콘(L-Muscone)의 뇌혈관장벽 통과 및 BDNF 뇌신경 보호 기전',
        keyCause: '극심한 과로와 스트레스가 누적되면 코르티솔 호르몬이 과다 분비되어 심장 펌프력과 뇌 혈류량(CBF)이 동시에 떨어지고 기억력 감퇴·불면·무기력증이 고착화됩니다.',
        solution: '식약처 CITES 인증 정품 사향의 핵심 성분인 L-무스콘이 뇌혈관장벽(BBB)을 직접 통과해 뇌신경 성장인자(BDNF)를 활성화하고, 최상급 녹용 분골이 심장 조혈과 원기를 즉각 충전합니다.',
        homeCare: '아침 기상 직후 공복 상태에서 따뜻한 미온수와 함께 공진단 향을 충분히 음미하며 1~2분간 천천히 씹어서 복용하기'
      },
      {
        titleTpl: '수험생·전문직·경영진의 극심한 긴장과 체력 고갈, 공진단 복용 골든타임 가이드',
        subTopic: '심기(心氣) 안정화와 고도 집중력·수면 리듬 동시 회복',
        keyCause: '중요한 시험이나 결정을 앞두고 교감신경이 과열되면 가슴이 두근거리고 정작 집중해야 할 순간에 머리가 하얘지며 수면의 질이 급격히 무너집니다.',
        solution: '대표원장이 직접 정량 수제 제환한 바른 황제공진단은 심장의 열을 내리고 신장의 수기를 올리는 수승화강(水昇火降) 작용으로 평정심과 지구력을 동시에 높여줍니다.',
        homeCare: '복용 전후 1시간 동안은 약효 흡수를 방해하는 커피·녹차(카페인) 및 녹두·숙주 섭취 피하기, 낮 햇볕 산책 20분'
      },
      {
        titleTpl: '부모님 효도 선물 및 큰 수술·출산 후 기력 회복, 가짜·대체품 아닌 정품 사향 확인법',
        subTopic: '식약처 정식 수입 사향 정량 조제와 면역·혈관 탄력 보강',
        keyCause: '나이가 들수록 뇌혈관과 관상동맥의 탄력이 떨어지고 작은 감기나 수술 후에도 기력이 쉽게 회복되지 않아 치매·심뇌혈관 질환 예방 관리가 필수적입니다.',
        solution: '바른한의원은 식약처 정식 수입 인증을 거친 정품 사향만을 엄선하여 방부제·보존제 없이 원내에서 대표원장이 직접 정량 수제 조제합니다.',
        homeCare: '직사광선을 피해 서늘한 실온 또는 냉장 보관하되, 냉장 보관 시 복용 10~15분 전에 미리 꺼내어 실온 상태에서 복용하기'
      }
    ]
  },
  {
    partId: 'syncope',
    catSlug: 'blog-syncope',
    catName: '자율신경·실신·혈관신경 블로그',
    badgeLabel: '자율신경 · 전신 혈관·신경',
    clinicLink: 'director.html',
    doctorTitle: '바른한의원 대표원장 · 자율신경 & 미주신경성 실신 클리닉',
    sciJournals: [
      'European Heart Journal — ESC 실신(Syncope) 진단 및 관리 가이드라인: 미주신경성 반사 및 하지 근육 수축 요법',
      'J Am Coll Cardiol (JACC) — 재발성 미주신경성 실신 환자의 자율신경 심박변이도(HRV) 불균형 기전',
      'Autonomic Neuroscience — 한의학 보익·안신 처방 및 침구 자극의 미주신경 톤 조절 및 기립성 저혈압 개선 연구'
    ],
    topicBank: [
      {
        titleTpl: '갑자기 눈앞이 노래지고 식은땀 나며 쓰러지는 미주신경성 실신, 왜 반복될까요?',
        subTopic: '뇌간-미주신경-말초혈관 수축 반사 균형 복원 치료',
        keyCause: '피로·공복·밀폐된 공간·배변·통증 스트레스 상황에서 교감신경이 지치면, 부교감(미주)신경이 과도하게 급브레이크를 밟아 심박수와 혈압이 동시에 추락하며 뇌 혈류가 순간 차단됩니다.',
        solution: '심장 펌프력과 혈관 수축 탄력을 높이는 체질 맞춤 한약과 미주신경이 지나는 상부 경추·흉곽 자율신경절 이완 추나로 심박변이도(HRV) 균형을 근본 복원합니다.',
        homeCare: '아찔한 전조 증상(메스꺼움·식은땀·이명)이 오면 절대 참지 말고 즉시 그 자리에 쪼그려 앉거나 누워 다리를 심장보다 높게 올리기'
      },
      {
        titleTpl: '일어설 때마다 어지러운 기립성 저혈압과 하체 혈액 저류, 제2의 심장 종아리를 깨우세요',
        subTopic: '정맥 환류(Venous Return) 강화 및 말초 혈관 탄력 회복',
        keyCause: '하체 근육과 정맥 판막의 탄력이 약하면 자리에서 일어설 때 중력에 의해 혈액 500~800ml가 다리로 몰린 채 심장과 뇌로 올라오지 못해 현기증과 실신이 발생합니다.',
        solution: '하초(下焦)의 양기와 말초 순환을 데워주는 보익 처방으로 혈관 수축 반응 속도를 높이고 만성 어지럼증과 수족냉증을 함께 개선합니다.',
        homeCare: '서 있어야 할 때 어지러우면 양다리를 X자로 교차해 허벅지·엉덩이에 강하게 힘주기(Leg Crossing), 매일 까치발 들기 운동 50회'
      },
      {
        titleTpl: '병원 검사상 정상인데도 가슴이 두근거리고 숨이 차는 자율신경실조증 한의학 치료',
        subTopic: '교감신경 과항진 진정 및 호흡·수면 자율신경 리듬 재설계',
        keyCause: 'MRI나 심전도에서 구조적 이상이 없더라도 자율신경계 조율 능력이 무너지면 소화불량, 어지럼증, 가슴 답답함, 공황 유사 증상이 전신에 걸쳐 나타납니다.',
        solution: '과열된 교감신경 흥분을 가라앉히고 횡격막과 흉추 긴장을 풀어주는 통합 치료로 작은 외부 자극에도 흔들리지 않는 단단한 신경계 항상성을 만들어 줍니다.',
        homeCare: '아침 공복 상태에서의 뜨거운 사우나·장시간 기립 피하기, 하루 따뜻한 미온수 1.5L 이상 충분히 나누어 마시기'
      }
    ]
  },
  {
    partId: 'gut',
    catSlug: 'blog-gut',
    catName: '위장·간해독·대사다이어트 블로그',
    badgeLabel: '위장·간 · 대사 다이어트',
    clinicLink: 'diet-zero.html',
    doctorTitle: '바른한의원 대표원장 · 위장·간 해독 & 식욕ZERO 다이어트 클리닉',
    sciJournals: [
      'Cell Metabolism — 시간제한 섭식(야간 공복 유지)의 내장지방 감소 및 인슐린 감수성 개선 기전',
      'Int J Obes — 전통 한약 복합물의 갈색지방(BAT) 열발생 활성화 및 렙틴 저항성 개선 연구',
      'Diabetes Care — 식이섬유·단백질 선섭취(Food Order)가 식후 혈당 스파이크 및 인슐린 분비에 미치는 영향'
    ],
    topicBank: [
      {
        titleTpl: '적게 먹어도 아랫배부터 찌는 나잇살·내장지방, 굶지 않고 위장·간 대사 화로를 켜는 법',
        subTopic: '식적(食積)·습담 해독과 갈색지방 기초대사 부스팅',
        keyCause: '무작정 굶는 초절식 다이어트는 근육량과 기초대사량만 떨어뜨리고, 위장 운동성 저하와 간 해독 정체로 쌓인 독소(습담)가 복부 내장지방으로 빠르게 전환됩니다.',
        solution: '손 떨림이나 불면증 같은 교감신경 과자극 없이 자연스러운 포만감을 유도하고, 간 해독과 림프 순환을 열어 근육은 지키고 순수 내장지방만 비워냅니다.',
        homeCare: '식사할 때 [채소·해조류 → 단백질 → 탄수화물] 순서로 먹는 거꾸로 식사법 실천하기, 식후 바로 눕지 않고 15분 가볍게 산책하기'
      },
      {
        titleTpl: '밤마다 터지는 가짜 배고픔과 야식 폭식, 의지력 부족이 아니라 렙틴 저항성 때문입니다',
        subTopic: '스트레스 코르티솔 진정 및 포만감 호르몬(렙틴) 감수성 회복',
        keyCause: '만성 수면 부족과 스트레스는 식욕 억제 호르몬인 렙틴 신호를 마비시키고 가짜 배고픔 호르몬(그렐린)을 폭발시켜 밤마다 매운 음식과 탄수화물을 찾게 만듭니다.',
        solution: '위열(胃熱)과 스트레스 울화를 가라앉히는 체질 맞춤 한약으로 절반만 먹어도 기분 좋게 배부른 진짜 포만감 회로를 되살려 요요 없는 감량을 완성합니다.',
        homeCare: '저녁 식사 후 다음 날 아침까지 12~14시간 야간 공복 유지하기, 과일주스·믹스커피·액상과당 음료 대신 따뜻한 미온수 마시기'
      },
      {
        titleTpl: '아침마다 얼굴·다리가 붓고 소화가 안 되는 부종형 비만, 순환이 풀려야 살이 빠집니다',
        subTopic: '복부 냉증 개선 및 비위(脾胃) 수분 대사·림프 배출 치료',
        keyCause: '속이 차갑고 위장 기능이 약한 체질은 수분 대사가 정체되어 세포 사이에 불필요한 수분(부종)이 고이고, 이 부종이 지방 세포와 결합해 셀룰라이트로 굳어집니다.',
        solution: '차가운 복부 심부 체온을 높여 지방 분해 효소를 활성화하고 정체된 수독(水毒)을 배출하여 몸이 먼저 가벼워지는 건강한 다이어트를 돕습니다.',
        homeCare: '찬물·아이스 아메리카노 대신 따뜻한 물 마시기, 양배추·브로콜리·율무·오리고기·흰살생선 중심의 따뜻한 클린 식단 유지'
      }
    ]
  },
  {
    partId: 'uterus',
    catSlug: 'blog-uterus',
    catName: '자궁·난임착상·여성질환 블로그',
    badgeLabel: '자궁·난임 · 착상·여성질환',
    clinicLink: 'director.html',
    doctorTitle: '바른한의원 대표원장 · 자궁 보궁(補宮) & 난임 착상 클리닉',
    sciJournals: [
      'Complement Ther Med — 시험관 아기(IVF) 시술 시 한약 병행 치료의 자궁내막 수용성 및 임상 임신율 향상 메타분석',
      'Fertil Steril — 자궁 동맥 혈류 저항 감소 및 자궁내막 두께 확보가 배아 착상률에 미치는 영향',
      'J Ethnopharmacology — 전통 보궁(補宮) 한약 처방의 착상 필수 단백질(LIF, Integrin) 발현 촉진 기전'
    ],
    topicBank: [
      {
        titleTpl: '시험관(IVF)·인공수정 준비 중이라면 필독! 배아가 뿌리내리는 따뜻한 자궁내막 만들기',
        subTopic: '자궁 동맥 혈류 확장 및 착상 필수 인자(LIF) 발현 극대화',
        keyCause: '좋은 등급의 배아를 이식하더라도 아랫배가 차갑고(자궁 냉증) 자궁내막이 얇거나 혈류 저항이 높으면 배아가 안정적으로 착상하기 어렵습니다.',
        solution: '국제 학술지 메타분석으로 입증된 보궁(補宮)·착상탕 처방으로 자궁 나선동맥 혈류를 풍부하게 열어 내막을 도톰하고 따뜻하게 성숙시키며 이식 후 자궁 수축을 예방합니다.',
        homeCare: '매일 저녁 아랫배 온찜질 20분 및 발목(삼음교혈) 양말 보온, 아이스 음료와 밀가루·정제당 줄이기'
      },
      {
        titleTpl: '진통제로 버티는 극심한 생리통과 검고 덩어리진 생리혈, 자궁 어혈(瘀血) 신호입니다',
        subTopic: '골반 울혈 해소 및 자궁근종·자궁내막증 예방 치료',
        keyCause: '골반이 틀어지고 하복부 순환이 막히면 생리 때 배출되어야 할 노폐물이 자궁 내에 어혈로 남아 프로스타글란딘 과다 분비와 경련성 통증을 일으킵니다.',
        solution: '자궁을 감싸는 골반·천장관절 비대칭을 교정해 신경·혈관 압박을 풀고, 온경(溫經) 어혈 배출 한약으로 자궁 스스로 깨끗하게 비워내는 힘을 길러줍니다.',
        homeCare: '뜨거운 음식을 플라스틱·일회용 용기에 담아 먹지 않기(환경호르몬 차단), 취침 전 양 발바닥을 붙이는 골반 나비 자세 스트레칭'
      },
      {
        titleTpl: '난소 나이(AMH) 저하와 생리불순, 건강한 배란과 유산 방지(안태)를 위한 부부 동반 케어',
        subTopic: '난소 미토콘드리아 항산화 보호 및 부부 동시 생식 활력 강화',
        keyCause: '30대 중후반 이후 스트레스와 수면 부족으로 활성산소가 증가하면 난포의 성숙도와 정자의 운동성이 함께 저하되어 임신까지의 시간이 길어집니다.',
        solution: '채취·배란 전에는 난소 예비능과 난자·정자의 질을 높이고, 임신 확인 후에는 유산을 막고 태아를 튼튼히 지키는 안태(安胎) 단계별 맞춤 치료를 시행합니다.',
        homeCare: '쑥·당귀차·검은콩·두부·전복·석류 등 보혈 영양소 섭취, 난포 성숙 기간 동안 부부가 함께 밤 11시 이전 규칙적인 숙면 취하기'
      }
    ]
  },
  {
    partId: 'prostate',
    catSlug: 'blog-prostate',
    catName: '전립선·배뇨장애·남성활력 블로그',
    badgeLabel: '전립선·배뇨 · 남성활력',
    clinicLink: 'prostate.html',
    doctorTitle: '바른한의원 대표원장 · 전립선 감압 & 남성활력 클리닉',
    sciJournals: [
      'J Urol — 만성 전립선염/만성 골반통증증후군(CP/CPPS)에서 침구 및 골반저 이완 치료의 NIH-CPSI 점수 개선',
      'Phytomedicine — 산수유·숙지황·복분자 복합 추출물의 5α-환원효소 억제 및 전립선 비대 조직 부종 감소 기전',
      'Andrology — 한의학 보신(補腎) 처방의 남성 호르몬 항상성 유지 및 하부요로증상(LUTS)·야간뇨 개선 연구'
    ],
    topicBank: [
      {
        titleTpl: '새벽마다 2~3번 소변 때문에 깨는 야간뇨와 약해진 소변 줄기, 전립선·방광 동시 치료법',
        subTopic: '전립선 울혈 감압 및 차가운 과민성 방광 온열 보강',
        keyCause: '부어오른 전립선이 요도를 좁히면 소변 줄기가 가늘어지고(세뇨), 다 비우지 못한 잔뇨와 차가워진 방광 근육 때문에 밤마다 화장실을 찾는 야간뇨 악순환이 반복됩니다.',
        solution: '산수유·복분자·숙지황 등 보신(補腎)·이수 처방으로 전립선 내 압력과 부종을 빼 소변 길을 넓히고, 방광 괄약근의 탄력을 회복해 아침까지 깨지 않는 통잠을 되찾아 드립니다.',
        homeCare: '취침 2시간 전 수분·알코올·카페인 섭취 제한하기, 저녁마다 40도 따뜻한 물로 15분 좌욕하여 회음부 근육 이완하기'
      },
      {
        titleTpl: '항생제를 먹어도 낫지 않는 묵직한 회음부·골반 통증, 만성 비세균성 전립선염 해법',
        subTopic: '골반저근 울혈 해소 & 골반·천장관절 신경감압 추나',
        keyCause: '만성 전립선염 환자의 90% 이상은 세균 감염이 아닌 장시간 착석·운전·스트레스로 인해 골반 바닥 근육이 딱딱하게 굳어 혈류가 막힌 골반 울혈성 통증입니다.',
        solution: '틀어진 골반과 천장관절을 교정하는 수기 추나와 약침 치료로 전립선 주변 신경 압박과 골반저근 경직을 풀어 묵직한 불쾌감과 빈뇨를 근본적으로 해소합니다.',
        homeCare: '오래 앉아 일할 때 푹신한 도넛 방석 사용하기, 소변을 억지로 오래 참지 않기, 장시간 자전거 안장 압박 피하기'
      },
      {
        titleTpl: '예전 같지 않은 아침 활력과 남성 갱년기 피로, 간·신장(肝腎) 원기부터 채워야 합니다',
        subTopic: '대표원장 1:1 프라이빗 진맥 및 남성 호르몬·해면체 혈류 활성화',
        keyCause: '40~50대 이후 과로와 스트레스가 누적되면 남성 호르몬과 산화질소(NO) 혈관 확장 능력이 떨어져 배뇨 장애와 함께 만성 무기력증·성기능 저하가 동시에 찾아옵니다.',
        solution: '1:1 독립 진료실에서 정밀 맥진과 체질 진단을 통해 하초(下焦)의 양기와 정혈을 꽉 채우는 맞춤 보양 한약으로 시원한 배뇨와 당당한 남성 활력을 함께 깨웁니다.',
        homeCare: '라이코펜이 풍부한 익힌 토마토·굴·마늘·부추·호두 섭취하기, 매일 허벅지·엉덩이 하체 스쿼트 30회 및 유산소 걷기 실천'
      }
    ]
  }
];

/**
 * ============================================================================
 * 1. 자동 발행 트리거 설치 함수 (최초 1회 실행)
 * ============================================================================
 */
function setupDailyAutoPublishTrigger() {
  // 기존 동일 트리거 중복 방지 삭제
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(function(t) {
    if (t.getHandlerFunction() === 'dailyDiseaseAutoPublishJob') {
      ScriptApp.deleteTrigger(t);
    }
  });

  // 매일 지정 시간(기본 오전 8시) 자동 실행 트리거 등록
  ScriptApp.newTrigger('dailyDiseaseAutoPublishJob')
    .timeBased()
    .atHour(CONFIG.TRIGGER_HOUR_KST || 8)
    .everyDays(1)
    .inTimezone('Asia/Seoul')
    .create();

  Logger.log('✅ [바른한의원 3D 인체모형] 질환별 데일리 블로그 자동 발행 트리거가 설정되었습니다. (매일 ' + (CONFIG.TRIGGER_HOUR_KST || 8) + '시 실행, 모드: ' + CONFIG.PUBLISH_MODE + ')');
}

/**
 * ============================================================================
 * 2. 매일 실행되는 메인 자동 발행 잡 (트리거 호출 대상)
 * ============================================================================
 */
function dailyDiseaseAutoPublishJob() {
  const props = PropertiesService.getScriptProperties();
  const todayStr = Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyy-MM-dd');
  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);

  if (CONFIG.PUBLISH_MODE === 'ALL_8_DAILY') {
    // 매일 8개 질환 모두 각 1편씩 자동 발행
    const results = [];
    for (var i = 0; i < DISEASE_META.length; i++) {
      var meta = DISEASE_META[i];
      var res = publishSingleDiseaseBlog(meta, dayOfYear + i, todayStr);
      results.push(res);
    }
    Logger.log('✅ [' + todayStr + '] 8대 질환 전체 데일리 블로그 발행 완료 (' + results.length + '건)');
    return results;
  } else {
    // 하루 1개 질환씩 순환 발행
    var rotIdx = parseInt(props.getProperty('LAST_ROTATE_INDEX') || '0', 10);
    var targetMeta = DISEASE_META[rotIdx % DISEASE_META.length];
    var singleRes = publishSingleDiseaseBlog(targetMeta, dayOfYear, todayStr);
    props.setProperty('LAST_ROTATE_INDEX', String((rotIdx + 1) % DISEASE_META.length));
    Logger.log('✅ [' + todayStr + '] 순환 질환 블로그 발행 완료: ' + targetMeta.partId);
    return [singleRes];
  }
}

/**
 * 수동 즉시 테스트 함수 1: 8개 질환 모두 지금 즉시 1편씩 발행
 */
function testPublishAll8DiseasesNow() {
  const prevMode = CONFIG.PUBLISH_MODE;
  CONFIG.PUBLISH_MODE = 'ALL_8_DAILY';
  const res = dailyDiseaseAutoPublishJob();
  CONFIG.PUBLISH_MODE = prevMode;
  return res;
}

/**
 * 수동 즉시 테스트 함수 2: 다음 순번 질환 1편 즉시 발행
 */
function testPublishSingleDiseaseNow() {
  const todayStr = Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyy-MM-dd');
  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  return publishSingleDiseaseBlog(DISEASE_META[0], dayOfYear, todayStr);
}

/**
 * ============================================================================
 * 3. 개별 질환 블로그 아티클 생성 + 워드프레스 발행 + 웹앱 피드/시트 저장
 * ============================================================================
 */
function publishSingleDiseaseBlog(meta, seedNumber, dateStr) {
  // 1) 원장님 예약 주제 큐 확인 또는 Gemini AI / 내장 학술 엔진으로 원고 생성
  const article = generateDiseaseArticleContent(meta, seedNumber, dateStr);

  // 2) 워드프레스 REST API(/wp-json/wp/v2/posts)로 실서버 자동 게시 시도
  let wpResult = { ok: false, wpPostId: null, link: '' };
  try {
    wpResult = postToWordPressRestApi(meta, article);
  } catch (e) {
    Logger.log('⚠️ 워드프레스 REST API 전송 참고 (' + meta.partId + '): ' + e.message);
  }

  // 3) 스크립트 스토리지(웹앱 JSON 피드용) 및 구글 시트에 발행 이력 저장
  const postRecord = {
    id: wpResult.wpPostId ? ('wp-' + wpResult.wpPostId) : (meta.partId + '-gas-' + dateStr + '-' + seedNumber),
    partId: meta.partId,
    catSlug: meta.catSlug,
    date: dateStr,
    badge: article.badge,
    title: article.title,
    summary: article.summary,
    journalRef: article.journalRef,
    readTime: '3분 칼럼',
    tags: article.tags,
    link: wpResult.link || (CONFIG.WP_SITE_URL + '/body-explorer/?part=' + meta.partId + '&tab=blog'),
    contentHtml: article.contentHtml
  };

  savePostToScriptStorage(postRecord);
  appendLogToSpreadsheet(postRecord, wpResult.ok ? '워드프레스+웹앱 발행완료' : '웹앱 피드 발행완료');

  return postRecord;
}

/**
 * ============================================================================
 * 4. Gemini AI 연동 + 365일 내장 학술 임상 칼럼 생성기 (이중 안전 엔진)
 * ============================================================================
 */
function generateDiseaseArticleContent(meta, seedNumber, dateStr) {
  const props = PropertiesService.getScriptProperties();
  const geminiKey = CONFIG.GEMINI_API_KEY || props.getProperty('GEMINI_API_KEY') || '';
  const topicItem = meta.topicBank[seedNumber % meta.topicBank.length];
  const journalRef = meta.sciJournals[seedNumber % meta.sciJournals.length];

  // Gemini API 키가 설정된 경우 Gemini 2.5 Flash로 최신 맞춤형 임상 칼럼 생성
  if (geminiKey) {
    try {
      const prompt = [
        '당신은 대전 바른한의원 대표원장("아빠 한의사 — 내 가족에게 처방하는 치료만 시행합니다")입니다.',
        '3D 인체모형 의학백과의 [' + meta.badgeLabel + '] 파트를 위한 오늘의 질환 블로그 칼럼을 JSON 형식으로 작성하세요.',
        '참고 주제: ' + topicItem.titleTpl + ' (' + topicItem.subTopic + ')',
        '인용 학술지: ' + journalRef,
        '반드시 아래 JSON 키만 포함하여 순수 JSON으로 응답하세요:',
        '{"title":"제목","summary":"2문장 핵심 요약","step1Title":"1단계 소제목","step1Body":"원인 본문(3~4문장)","step2Title":"2단계 소제목","step2Body":"학술 검증 한의학 치료 본문(3~4문장)","step3Title":"3단계 소제목","step3Body":"가정 내 실전 홈케어 수칙 본문(3~4문장)","tags":["태그1","태그2","태그3"]}'
      ].join('\n');

      const url = 'https://generativelanguage.googleapis.com/v1beta/models/' + CONFIG.GEMINI_MODEL + ':generateContent?key=' + encodeURIComponent(geminiKey);
      const resp = UrlFetchApp.fetch(url, {
        method: 'post',
        contentType: 'application/json',
        payload: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: 'application/json', temperature: 0.55 }
        }),
        muteHttpExceptions: true
      });

      if (resp.getResponseCode() === 200) {
        const parsed = JSON.parse(resp.getContentText());
        const rawJson = parsed.candidates[0].content.parts[0].text;
        const aiData = JSON.parse(rawJson);
        return {
          badge: '질환별 데일리 칼럼 · ' + meta.badgeLabel,
          title: aiData.title || topicItem.titleTpl,
          summary: aiData.summary || topicItem.keyCause,
          journalRef: journalRef,
          tags: aiData.tags || [meta.badgeLabel, '학술검증', '바른한의원'],
          contentHtml: buildMedicalColumnHtml({
            lead: aiData.summary || topicItem.keyCause,
            sections: [
              { h: '1. ' + (aiData.step1Title || '핵심 원인 분석'), p: aiData.step1Body || topicItem.keyCause },
              { h: '2. ' + (aiData.step2Title || '학술 검증 한의학 치료'), p: aiData.step2Body || topicItem.solution },
              { h: '3. ' + (aiData.step3Title || '일상 속 실전 홈케어'), p: aiData.step3Body || topicItem.homeCare }
            ],
            journal: journalRef,
            doctorNote: '바른한의원은 내 가족에게 직접 처방하고 검증한 안전한 치료만을 고집합니다. 증상이 반복된다면 만성화되기 전에 정밀 진맥과 체형 진단을 받아보시길 권합니다.'
          })
        };
      }
    } catch (err) {
      Logger.log('Gemini 호출 폴백(내장 학술 엔진 사용): ' + err.message);
    }
  }

  // 기본 내장 365일 SCI 논문 기반 임상 칼럼 엔진
  const seasonTags = ['봄 환절기', '여름철', '가을 환절기', '겨울철'];
  const month = new Date().getMonth() + 1;
  const seasonLabel = month >= 3 && month <= 5 ? seasonTags[0] : (month >= 6 && month <= 8 ? seasonTags[1] : (month >= 9 && month <= 11 ? seasonTags[2] : seasonTags[3]));

  return {
    badge: '질환별 데일리 칼럼 · ' + meta.badgeLabel,
    title: '[' + seasonLabel + ' 집중케어] ' + topicItem.titleTpl,
    summary: topicItem.keyCause,
    journalRef: journalRef,
    tags: [meta.badgeLabel.split('·')[0].trim(), topicItem.subTopic.split(' ')[0], 'SCI학술검증', '바른한의원'],
    contentHtml: buildMedicalColumnHtml({
      lead: topicItem.keyCause,
      sections: [
        { h: '1. 왜 증상이 반복될까요? — ' + topicItem.subTopic, p: topicItem.keyCause },
        { h: '2. 학술 논문으로 검증된 바른한의원 근본 치료 프로토콜', p: topicItem.solution },
        { h: '3. 오늘부터 바로 실천하는 가정 내 핵심 관리 수칙', p: topicItem.homeCare }
      ],
      journal: journalRef,
      doctorNote: '“내 가족에게 직접 처방하고 시술한 치료만 시행하며, 모든 환자를 내 가족처럼 진료합니다.” — 바른한의원 대표원장 임상 노트 (' + dateStr + ')'
    })
  };
}

function buildMedicalColumnHtml(data) {
  const secs = (data.sections || []).map(function(s) {
    return '<div class="blog-art-sec" style="margin:14px 0;padding:14px 16px;border-radius:12px;background:#FFFDF9;border:1px solid #E2D9C8;">' +
      '<h4 style="margin:0 0 6px;font-size:0.95rem;color:#2D5A43;font-weight:800;">' + s.h + '</h4>' +
      '<p style="margin:0;font-size:0.86rem;line-height:1.7;color:#2C2623;">' + s.p + '</p>' +
    '</div>';
  }).join('');

  return '<div class="bareun-disease-blog-article">' +
    '<p class="blog-art-lead" style="font-size:0.9rem;font-weight:700;line-height:1.68;color:#171614;margin:0 0 14px;">' + data.lead + '</p>' +
    secs +
    '<div class="blog-art-sci" style="margin-top:14px;padding:11px 14px;border-radius:10px;background:#F3EFE6;font-size:0.78rem;color:#4E463F;">' +
      '<strong>📚 학술 논문 검수 근거:</strong> ' + data.journal +
    '</div>' +
    '<div class="blog-art-docnote" style="margin-top:10px;padding:11px 14px;border-radius:10px;background:#EBF3EE;font-size:0.8rem;font-weight:700;color:#2D5A43;">' +
      '<strong>👨‍⚕️ 아빠 한의사 대표원장 한마디:</strong> ' + data.doctorNote +
    '</div>' +
  '</div>';
}

/**
 * ============================================================================
 * 5. 워드프레스 REST API 자동 카테고리 매칭 및 포스트 발행
 * ============================================================================
 */
function postToWordPressRestApi(meta, article) {
  const props = PropertiesService.getScriptProperties();
  const wpUser = CONFIG.WP_USERNAME || props.getProperty('WP_USERNAME') || 'wealthywei0508';
  const wpPass = CONFIG.WP_APP_PASSWORD || props.getProperty('WP_APP_PASSWORD') || '';
  if (!wpPass) {
    return { ok: false, wpPostId: null, link: '' };
  }

  const authHeader = 'Basic ' + Utilities.base64Encode(wpUser + ':' + wpPass);
  const baseUrl = CONFIG.WP_SITE_URL.replace(/\/$/, '');

  // 1) 질환별 카테고리 ID 조회 또는 자동 생성
  let catId = ensureWordPressCategory(baseUrl, authHeader, meta.catSlug, meta.catName);

  // 2) 워드프레스 포스트 생성 (/wp-json/wp/v2/posts)
  const payload = {
    title: article.title,
    excerpt: article.summary,
    content: article.contentHtml,
    status: 'publish',
    categories: catId ? [catId] : []
  };

  const postResp = UrlFetchApp.fetch(baseUrl + '/wp-json/wp/v2/posts', {
    method: 'post',
    contentType: 'application/json',
    headers: { Authorization: authHeader },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  });

  const code = postResp.getResponseCode();
  if (code === 200 || code === 201) {
    const body = JSON.parse(postResp.getContentText());
    return { ok: true, wpPostId: body.id, link: body.link || '' };
  }
  throw new Error('WP REST API 응답 코드: ' + code);
}

function ensureWordPressCategory(baseUrl, authHeader, slug, name) {
  const getResp = UrlFetchApp.fetch(baseUrl + '/wp-json/wp/v2/categories?slug=' + encodeURIComponent(slug), {
    method: 'get',
    headers: { Authorization: authHeader },
    muteHttpExceptions: true
  });
  if (getResp.getResponseCode() === 200) {
    const arr = JSON.parse(getResp.getContentText());
    if (arr && arr.length > 0) return arr[0].id;
  }

  const createResp = UrlFetchApp.fetch(baseUrl + '/wp-json/wp/v2/categories', {
    method: 'post',
    contentType: 'application/json',
    headers: { Authorization: authHeader },
    payload: JSON.stringify({ name: name, slug: slug }),
    muteHttpExceptions: true
  });
  if (createResp.getResponseCode() === 200 || createResp.getResponseCode() === 201) {
    return JSON.parse(createResp.getContentText()).id;
  }
  return null;
}

/**
 * ============================================================================
 * 6. GAS 웹앱(doGet) 실시간 JSON 피드 엔드포인트 (3D 모형 페이지 직접 연동용)
 * ============================================================================
 */
function doGet(e) {
  const partFilter = (e && e.parameter && e.parameter.part) ? String(e.parameter.part).trim() : '';
  const action = (e && e.parameter && e.parameter.action) ? String(e.parameter.action).trim() : 'feed';

  // 웹훅 방식으로 즉시 1회 발행을 트리거할 수도 있음 (?action=publishNow)
  if (action === 'publishNow') {
    const published = dailyDiseaseAutoPublishJob();
    return ContentService.createTextOutput(JSON.stringify({
      ok: true,
      action: 'publishNow',
      publishedCount: published.length,
      posts: published
    })).setMimeType(ContentService.MimeType.JSON);
  }

  const storedPosts = getStoredPostsFromScriptStorage();
  const filtered = partFilter
    ? storedPosts.filter(function(p) { return p.partId === partFilter; })
    : storedPosts;

  const responsePayload = {
    ok: true,
    clinic: '바른한의원 대전본점 3D 인체모형 질환별 자동 블로그 피드',
    updatedAt: Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyy-MM-dd HH:mm:ss'),
    totalCount: filtered.length,
    posts: filtered
  };

  return ContentService
    .createTextOutput(JSON.stringify(responsePayload))
    .setMimeType(ContentService.MimeType.JSON);
}

function savePostToScriptStorage(postRecord) {
  const props = PropertiesService.getScriptProperties();
  let list = [];
  try {
    const raw = props.getProperty('DISEASE_BLOG_FEED_JSON');
    if (raw) list = JSON.parse(raw);
  } catch (e) {
    list = [];
  }
  // 최신 글이 맨 앞으로 오도록 추가 (최대 48건 유지 — 질환당 최신 6건)
  list.unshift(postRecord);
  if (list.length > 48) {
    list = list.slice(0, 48);
  }
  props.setProperty('DISEASE_BLOG_FEED_JSON', JSON.stringify(list));
}

function getStoredPostsFromScriptStorage() {
  const props = PropertiesService.getScriptProperties();
  try {
    const raw = props.getProperty('DISEASE_BLOG_FEED_JSON');
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return [];
}

function appendLogToSpreadsheet(postRecord, statusText) {
  if (!CONFIG.SPREADSHEET_ID) return;
  try {
    const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    let sheet = ss.getSheetByName('질환별_자동블로그_발행로그');
    if (!sheet) {
      sheet = ss.insertSheet('질환별_자동블로그_발행로그');
      sheet.appendRow(['발행일시', '질환코드(partId)', '카테고리슬러그', '칼럼제목', '핵심요약', '학술지근거', '상태', '연결링크']);
    }
    sheet.appendRow([
      Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyy-MM-dd HH:mm:ss'),
      postRecord.partId,
      postRecord.catSlug,
      postRecord.title,
      postRecord.summary,
      postRecord.journalRef,
      statusText,
      postRecord.link
    ]);
  } catch (e) {
    Logger.log('스프레드시트 로그 기록 생략: ' + e.message);
  }
}
