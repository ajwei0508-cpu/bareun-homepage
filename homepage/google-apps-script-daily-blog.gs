/**
 * ============================================================================
 * [바른한의원 대전본점] 3D 모션 백과사전 — 9대 질환 카드별 데일리 블로그 자동 발행 시스템
 * Google Apps Script (GAS) Master Automation Engine v3.0
 * ============================================================================
 *
 * 📌 지원 질환 (3D 모션 백과사전 9대 핵심 부위 1:1 매칭 — 카드 질환별 각각 하루 1편, 일 총 9편 발행):
 *   1. knee       (blog-knee)       : 소아 성장 · 소아비만 · 면역 (성장판·성조숙증·비염·아토피)
 *   2. cervical   (blog-cervical)   : 경추 · 두피열 · 탈모 (거북목·열성탈모·원형탈모·지루성두피염)
 *   3. lumbar     (blog-lumbar)     : 척추 · 관절 · 체형교정 (허리디스크·협착증·골반비대칭·교통사고)
 *   4. gongjindan (blog-gongjindan) : 기력회복 · 황제공진단 (뇌·심장 기혈순환·수험생·만성번아웃)
 *   5. syncope    (blog-syncope)    : 자율신경 · 두통 · 어지럼 · 수면 · 실신 (미주신경성실신·이석증·불면)
 *   6. digest     (blog-digest)     : 소화 · 위장 · 담적 해독 (담적병·역류성식도염·만성위염·과민성대장) [개별 파트 신설]
 *   7. gut        (blog-gut)        : 대사 · 복부비만 다이어트 (식욕ZERO·내장지방·렙틴저항성·산후비만)
 *   8. uterus     (blog-uterus)     : 여성질환 · 자궁 · 난임 · 산후 (난임착상·생리통·산후풍·갱년기)
 *   9. prostate   (blog-prostate)   : 전립선 · 요실금 · 남성활력 (전립선비대·복압성/절박성요실금·야간뇨)
 *
 * 📌 신규 표준 운영 시스템 핵심 수칙:
 *   - 1.1 문체 및 내용: 핵심 4대 종결어미("도움드립니다. 검사합니다. 진단합니다. 회복합니다.") 필수 사용
 *     + 안정위 원장 상세페이지(director.html) 9대 정밀 검사(초음파, DITI 적외선 체열, 이비인후 내시경,
 *       사상체질·진장부맥학, 체지방·체성분, HRV 자율신경, 내분비·간·당 수치, APG 말초혈관, 소아성장 검사)
 *       및 원장 1:1 직접 시술(추나·침·약침·원내 압력 탕전·황제공진단) 반영
 *   - 1.2 검수 및 발행 프로세스: 9개 카드 질환별로 각각 하루 1편(일 총 9편) 자동 생성·검수·발행
 *   - 1.3 대표 이미지: 잘생기고 예쁜 한국인 남녀노소, 일상 배경, 무텍스트(No-Text), 영문 SEO 파일명 & 정확한 한글 ALT
 *   - 1.4 홈페이지 연결: 3D 모션 백과사전(body-explorer.html)에 최신글 각 질환별 3개 자동 노출 및 추천 블로그 내부링크 연결
 *   - 2.1 한방 물리·이학요법: 자기장, 소노(초음파), 핫팩, ICT(간섭파), IR(적외선), 극초단파 6대 치료 수단 통합 안내
 * ============================================================================
 */

const CONFIG = {
  // 1. 워드프레스 실서버 연동 설정 (바른한의원 공식 홈페이지)
  WP_SITE_URL: 'https://www.bareunhaniwon.com',
  WP_USERNAME: 'wealthywei0508',
  WP_APP_PASSWORD: '', // 스크립트 속성(WP_APP_PASSWORD) 또는 여기에 입력

  // 2. 발행 모드 설정
  // 'ALL_9_DAILY'   : 매일 9개 카드 질환 모두 각각 1편씩(하루 총 9편) 자동 발행 (기본 표준)
  // 'ROTATE_1_DAILY': 매일 9개 질환을 순서대로 순환하며 1편씩 발행
  PUBLISH_MODE: 'ALL_9_DAILY',
  TRIGGER_HOUR_KST: 8, // 매일 오전 8시 자동 발행

  // 3. (선택) Google Gemini API 키 — 입력 시 Gemini 2.5 Flash가 매일 새로운 학술 칼럼 작성
  GEMINI_API_KEY: '',
  GEMINI_MODEL: 'gemini-2.5-flash',

  // 4. (선택) 발행 내역을 기록할 구글 스프레드시트 ID (비워두면 스크립트 자체 스토리지에 최근 54편 자동 저장)
  SPREADSHEET_ID: ''
};

/**
 * 안정위 원장 상세페이지(director.html) 9대 정밀 검사 & 6대 물리치료 표준 상수
 */
const DIRECTOR_STANDARD_SYSTEM = {
  toneEndings: ['도움드립니다.', '검사합니다.', '진단합니다.', '회복합니다.'],
  nineExamsSummary:
    '① 정밀 초음파 검사(통증·오장육부) · ② 적외선 체열진단기 DITI(면역·순환·생식기능) · ③ 이비인후 내시경(귀·코·목) · ' +
    '④ 사상체질 정밀 검사 & 眞장부맥학 진맥 · ⑤ 체지방·체성분 검사(소아 및 복부비만) · ⑥ 자율신경·스트레스 검사 HRV(두통·어지럼·불면·실신) · ' +
    '⑦ 내분비·간 및 당 수치 검사(대사질환 & 한약 안전성) · ⑧ 말초 혈관 상태 검사 APG(혈관노화·어혈·독소) · ⑨ 소아·청소년 성장 검사(성장판·골연령·최종예상키)',
  directTreatmentsSummary:
    '안정위 대표원장 1:1 직접 추나요법 · 경혈 침 및 고농축 약침(봉약침·태반·산삼) · 원내 100% 직영 압력 탕전 맞춤 한약 · 식약처 CITES 정품 사향 황제공진단 수제 조제',
  sixPhysicalTherapiesSummary:
    '심부 자기장 치료(Magnetic) · 소노 초음파 치료(Sonotherapy) · 심부 온열 핫팩(Hot Pack) · ICT 간섭파 전류치료 · IR 적외선 조사기 · 극초단파 심부온열기(Microwave)'
};

/**
 * 3D 모션 백과사전 9대 카드 질환 메타데이터 및 365일 임상 칼럼 토픽 매트릭스
 */
const DISEASE_META = [
  {
    partId: 'knee',
    catSlug: 'blog-knee',
    catName: '소아 성장 · 소아비만 · 면역 블로그',
    badgeLabel: '소아 성장 · 소아비만 · 면역',
    clinicLink: 'growth.html',
    doctorTitle: '바른한의원 안정위 대표원장 · 소아 성장·소아비만·면역 클리닉',
    primaryExams: '⑨ 소아·청소년 성장 검사(성장판·골연령), ⑤ 체지방·체성분 검사(소아비만), ③ 이비인후 내시경(비염·중이염)',
    primaryTherapies: '성장판 자극 추나 · 비위·호흡기 면역 한약 · 소노(초음파) · IR(적외선) · 핫팩 온열요법',
    imageModelDesc: '밝은 거실과 공원 일상 배경의 예쁘고 건강한 한국인 어린이와 다정한 부모님(무텍스트, 자연광)',
    sciJournals: [
      'Pediatrics (미국소아과학회지) — 재발성 호흡기 감염과 선형 성장 속도 억제 기전',
      'Int J Pediatr Otorhinolaryngol — 알레르기 비염·구강호흡 환아의 서파수면 및 IGF-1 저하 연구',
      'Phytomedicine — 소아비만 체지방 조절 및 성장판 연골모세포(Chondrocyte) 증식·조기 골화 지연 규명'
    ],
    topicBank: [
      {
        titleTpl: '감기·비염 달고 사는 아이와 소아비만, 또래보다 키가 덜 크는 원인을 정밀하게 진단합니다',
        subTopic: '호흡기 점막 면역과 간 IGF-1 성장인자 보존 치료',
        keyCause: '잦은 감기와 비염으로 체내 염증성 사이토카인 수치가 높아지면 간에서 합성되는 성장인자(IGF-1) 분비가 억제되어 성장판 연골 분열이 멈추는 현상을 정밀하게 진단합니다.',
        solution: '소아·청소년 성장 검사와 이비인후 내시경, 체지방·체성분 검사로 아이의 숨은 키를 검사합니다. 안정위 원장이 직접 성장판 자극 추나와 침·소노(초음파)·IR 치료를 시행하여 호흡기 면역과 키 성장을 안전하게 회복합니다.',
        homeCare: '기상 직후 따뜻한 미온수 마시기, 취침 전 식염수 코세척과 침실 습도 50~55% 유지, 밤 10시 이전 소등으로 아이의 깊은 숙면에 도움드립니다.'
      },
      {
        titleTpl: '살이 키로 간다는 오해! 성조숙증을 부르는 소아비만과 숨은 키를 바르게 회복합니다',
        subTopic: '소아비만 렙틴 호르몬 조절 및 조기 골화(Early Ossification) 지연',
        keyCause: '소아비만으로 과도하게 축적된 지방세포는 성호르몬 분비를 앞당겨 성장판이 일찍 닫히는 조기 골화를 유발하므로 체지방·체성분 검사와 골연령 검사를 통해 정확히 검사합니다.',
        solution: '무조건 굶기는 성인식 감량이 아니라 노폐물(습열)과 체지방만 비우고 근육·뼈 성장은 촉진하는 소아비만 맞춤 한약과 성장 추나로 건강한 체형과 최종 예상 키를 회복합니다.',
        homeCare: '플라스틱 용기 온열 조리 피하기, 튀김·액상과당 음료 줄이기, 줄넘기·농구 등 수직 점프 운동 하루 20분 실천에 도움드립니다.'
      },
      {
        titleTpl: '입 벌리고 자는 구강호흡·비염 아이, 밤 10시 성장호르몬 골든타임을 지켜드립니다',
        subTopic: '이비인후 내시경 비강 점막 검사와 서파수면(Deep Sleep) 복원',
        keyCause: '비염과 편도·아데노이드 비대로 밤새 입을 벌리고 자면 깊은 서파수면에 진입하지 못해 성장호르몬 분비가 30% 이상 감소하므로 이비인후 내시경으로 코점막 부종을 면밀히 진단합니다.',
        solution: '코 점막의 부종과 열독을 식히는 통비 한약과 상부 경추 추나, IR(적외선)·온열 치료를 병행해 밤새 코로 편안하게 숨 쉬는 수면 환경을 회복합니다.',
        homeCare: '저녁 샤워 후 뒷목(대추혈) 따뜻하게 보온하기, 베개 높이를 낮춰 기도 열기, 취침 2시간 전 야식 제한으로 숙면에 도움드립니다.'
      }
    ]
  },
  {
    partId: 'cervical',
    catSlug: 'blog-cervical',
    catName: '경추 · 두피열 · 탈모 블로그',
    badgeLabel: '경추 · 두피열 · 탈모',
    clinicLink: 'hairloss.html',
    doctorTitle: '바른한의원 안정위 대표원장 · 경추 추나 & 두피열 탈모 클리닉',
    primaryExams: '② 적외선 체열진단기 DITI(두피열·상열하한), ① 정밀 초음파 검사(경추 심부근막), ⑥ HRV 스트레스 검사',
    primaryTherapies: '안정위 원장 직접 상부 경추 감압 추나 · 모낭 재생 약침 · 수승화강 청열 한약 · ICT · 소노 · 극초단파',
    imageModelDesc: '세련된 서재와 카페 일상 배경의 잘생기고 예쁜 2040 한국인 남녀 모델(풍성한 머릿결, 무텍스트, 자연광)',
    sciJournals: [
      'J Dermatol Sci — 두피 국소 체열 상승 및 미세염증이 모유두 세포(Dermal Papilla) 사멸에 미치는 기전',
      'Spine — 전방두부자세(거북목) 각도 증가에 따른 경추 디스크 압력 및 두경부 혈류 감소 연구',
      'Phytotherapy Research — 생약 복합물의 Wnt/β-catenin 신호 활성화를 통한 모낭 성장기 연장 효과'
    ],
    topicBank: [
      {
        titleTpl: '정수리가 뜨겁고 머리카락이 가늘어지는 열성탈모, 적외선 체열진단(DITI)과 경추 추나로 회복합니다',
        subTopic: '수승화강(水昇火降) 청열 한약과 상부 경추 감압 추나의 시너지',
        keyCause: '만성 스트레스와 거북목으로 심장에서 두피로 올라간 열이 내려오지 못하고 정수리에 고여 모낭 뿌리를 말리는 현상을 적외선 체열진단기(DITI)와 초음파로 정밀하게 검사합니다.',
        solution: '안정위 원장이 직접 상부 경추(C1~C7) 병목을 여는 수기 추나와 고농축 약침, ICT·극초단파·소노 치료를 시행하고 수승화강 청열 한약으로 모낭 성장기를 건강하게 회복합니다.',
        homeCare: '하루 노폐물은 반드시 저녁에 미온수로 샴푸하고 찬 바람(냉풍)으로 두피 속까지 완전 건조하며, 취침 전 족욕 15분으로 두피열 완화에 도움드립니다.'
      },
      {
        titleTpl: '뒷목이 뻣뻣한 거북목과 함께 찾아온 M자·정수리 탈모, 목 혈류 수문부터 정밀하게 진단합니다',
        subTopic: '후두하근·승모근 긴장 해소와 모유두 세포 산소 공급',
        keyCause: '고개가 앞으로 빠진 거북목 자세가 후두하근과 승모근을 경직시켜 두피로 향하는 후두동맥과 모세혈관을 압박하는 구조적 원인을 정밀 초음파로 진단합니다.',
        solution: '경추 C자 커브를 복원하는 대표원장 직접 추나와 자기장·소노·핫팩 물리치료를 병행하여 뒷목 통증과 두피 혈류 장애를 동시에 회복합니다.',
        homeCare: '모니터 상단을 눈높이에 맞추고 매시간 턱 당기기(Chin-in) 스트레칭 10회를 실천하여 경추 정렬 유지에 도움드립니다.'
      },
      {
        titleTpl: '두피가 붉고 가려운 지루성 두피염·원형탈모, 체질과 자율신경 면역 균형으로 회복합니다',
        subTopic: '피지선 과열 진정 및 두피 장벽 면역 복원',
        keyCause: '수면 부족과 스트레스 열독이 두피 피지선을 자극해 만성 미세염증과 모낭 손상을 일으키는 상태를 HRV 자율신경 검사와 사상체질 검사로 꼼꼼히 검사합니다.',
        solution: '체내 상열하한(上熱下寒) 불균형을 바로잡는 원내 직영 탕전 한약과 두피 약침 치료로 재발 없는 두피 면역 환경을 회복합니다.',
        homeCare: '매운 야식·튀김·액상과당을 줄이고 손톱 대신 지문으로 부드럽게 샴푸하는 습관으로 두피 장벽 보호에 도움드립니다.'
      }
    ]
  },
  {
    partId: 'lumbar',
    catSlug: 'blog-lumbar',
    catName: '척추 · 관절 · 체형교정 블로그',
    badgeLabel: '척추 · 관절 · 체형교정',
    clinicLink: 'chuna.html',
    doctorTitle: '바른한의원 안정위 대표원장 · 척추·관절 신경감압 추나 클리닉',
    primaryExams: '① 정밀 초음파 검사(척추·관절·인대·연부조직), ② 적외선 체열진단기 DITI(신경근 염증·방사통 체열 분포)',
    primaryTherapies: '안정위 원장 1:1 직접 추나요법 · 봉약침·정제 약침 · 강근골 한약 · 자기장 · 소노 · 핫팩 · ICT · IR · 극초단파',
    imageModelDesc: '햇살 드는 공원 산책로와 거실 일상 배경의 자세가 바르고 활기찬 한국인 남녀노소 모델(무텍스트, 자연광)',
    sciJournals: [
      'JAMA Network Open — 요추 추간판 탈출증 및 만성 요통 환자에서 수기 교정(Chuna/SMT)의 통증 감소 효과',
      'Spine Journal — 골반 경사 및 천장관절 비대칭 교정이 요추 추간판 내압 감소에 미치는 영향',
      'J Ethnopharmacology — 두충·우슬 복합 추출물의 추간판 수핵 세포 보호 및 신경근 염증 억제 기전'
    ],
    topicBank: [
      {
        titleTpl: '자꾸 재발하는 허리디스크·좌골신경통, 초음파·체열 검사로 골반 비대칭 원인을 진단합니다',
        subTopic: '골반 주춧돌 수평 교정 및 요추 L4-L5·L5-S1 디스크 공간 확보',
        keyCause: '척추의 주춧돌인 골반과 천장관절이 기울어져 하부 요추 디스크 한쪽 면에만 비정상적인 압력이 집중되는 상태를 정밀 초음파 검사와 적외선 체열진단기(DITI)로 정확히 검사합니다.',
        solution: '안정위 대표원장이 직접 손으로 골반과 요추 마디를 교정하는 신경감압 추나와 약침, 그리고 자기장·소노(초음파)·극초단파·ICT·IR·핫팩 6대 이학요법을 병행해 수술 없이 척추 자생력을 회복합니다.',
        homeCare: '아침 기상 시 옆으로 돌아누워 팔로 짚고 일어나는 통나무 구르기 기상법과 다리 꼬기 중단으로 디스크 보호에 도움드립니다.'
      },
      {
        titleTpl: '엉덩이부터 종아리까지 당기는 디스크 방사통과 척추관협착증, 비수술 감압 치료로 회복합니다',
        subTopic: '신경근 화학적 염증 제거와 심부 코어 인대 강화',
        keyCause: '디스크 탈출과 황색인대 비후로 신경 뿌리에 화학적 염증과 부종이 발생한 부위를 초음파와 체열진단기로 면밀히 진단합니다.',
        solution: '추간공을 넓히는 굴곡·신연 감압 추나와 고농축 봉약침, 두충·우슬 강근골 한약, 심부 자기장·극초단파 온열 치료로 신경 부종을 흡수하고 보행 시간을 회복합니다.',
        homeCare: '바닥에 쪼그려 앉거나 푹 꺼진 소파에 기대앉지 않기, 물건 들 때 무릎을 굽혀 몸에 밀착해 들기로 허리 건강에 도움드립니다.'
      },
      {
        titleTpl: '교통사고 후유증 목·허리 통증과 어혈, 사고 초기 정밀 초음파 검사와 추나로 빠르게 회복합니다',
        subTopic: '편타성 손상(Whiplash Injury) 미세 어혈 제거 및 인대 복원',
        keyCause: 'X-ray상 뼈에 이상이 없더라도 충격으로 늘어난 심부 인대와 근막의 미세 파열 및 어혈을 정밀 초음파와 적외선 체열진단기(DITI)로 세밀하게 검사합니다.',
        solution: '사고 직후 굳어진 경추·요추 정렬을 바로잡는 원장 직접 추나와 어혈 배출 한약, 소노·ICT·자기장 집중 물리치료로 만성 후유증 없이 일상을 회복합니다.',
        homeCare: '사고 초기 2주간은 무리한 회전 스트레칭 대신 충분한 안정과 온찜질을 유지하도록 세심하게 도움드립니다.'
      }
    ]
  },
  {
    partId: 'gongjindan',
    catSlug: 'blog-gongjindan',
    catName: '기력회복 · 황제공진단 블로그',
    badgeLabel: '기력회복 · 황제공진단',
    clinicLink: 'gongjindan.html',
    doctorTitle: '바른한의원 안정위 대표원장 · 황제공진단 & 뇌·심장 기혈 클리닉',
    primaryExams: '④ 사상체질 정밀 검사 & 眞장부맥학 진맥, ⑧ 말초 혈관 상태 검사 APG, ⑦ 내분비·간 및 당 수치 검사',
    primaryTherapies: '안정위 원장 직접 정량 수제 조제 황제공진단(식약처 CITES 정품 사향) · 원내 직영 압력 탕전 보약 · 침·약침',
    imageModelDesc: '품격 있는 한옥 라운지와 서재 일상 배경의 건강하고 기품 있는 한국인 중장년 부부 및 전문직 남녀(무텍스트, 자연광)',
    sciJournals: [
      'J Ethnopharmacology — 공진단(Gongjindan)의 뇌신경 영양인자(BDNF) 발현 증가 및 기억력·피로 개선 기전',
      'Front Pharmacol — 사향 주성분 L-무스콘(L-Muscone)의 뇌혈관장벽(BBB) 투과 및 심근 허혈 보호 효과 규명',
      'Nutrients — 녹용·당귀·산수유 복합 추출물의 코르티솔 감소 및 만성피로증후군(CFS) 임상 개선'
    ],
    topicBank: [
      {
        titleTpl: '머리가 멍한 브레인 포그와 만성 번아웃, 정품 사향 황제공진단으로 뇌·심장 기력을 회복합니다',
        subTopic: 'L-무스콘(L-Muscone)의 뇌혈관장벽 통과 및 BDNF 뇌신경 보호 기전',
        keyCause: '과로와 스트레스 누적으로 심장 펌프력과 뇌 혈류량이 떨어진 상태를 眞장부맥학 진맥과 말초 혈관 상태 검사(APG), 내분비·간 수치 검사로 정밀하게 검사합니다.',
        solution: '식약처 CITES 인증 정품 사향과 최상급 녹용 분골을 안정위 원장이 원내에서 직접 정량 수제 조제한 황제공진단으로 막힌 기혈을 뚫고 깊은 활력을 회복합니다.',
        homeCare: '아침 기상 직후 공복 상태에서 따뜻한 미온수와 함께 공진단 향을 음미하며 1~2분간 천천히 씹어서 복용하시면 흡수율 향상에 큰 도움드립니다.'
      },
      {
        titleTpl: '수험생·전문직·경영진의 극심한 체력 고갈, 사상체질 검사와 맞춤 공진단으로 집중력을 회복합니다',
        subTopic: '심기(心氣) 안정화와 고도 집중력·수면 리듬 동시 회복',
        keyCause: '중요한 시험이나 결정을 앞두고 교감신경이 과열되어 가슴 두근거림과 집중력 저하가 나타나는 원인을 HRV 스트레스 검사와 사상체질 검사로 진단합니다.',
        solution: '심장의 열을 내리고 신장의 수기를 올리는 수승화강(水昇火降) 원리의 바른 황제공진단과 총명 약침으로 흔들리지 않는 평정심과 지구력을 회복합니다.',
        homeCare: '복용 전후 1시간 동안은 커피·녹차(카페인) 및 녹두·숙주 섭취를 피하고 낮 햇볕 산책 20분을 병행하도록 도움드립니다.'
      },
      {
        titleTpl: '부모님 효도 선물 및 큰 수술·출산 후 기력 저하, 간·당 안전성 검사와 정품 사향으로 보강합니다',
        subTopic: '내분비·간 수치 안전성 확인 및 식약처 정식 수입 사향 정량 조제',
        keyCause: '노화와 수술 후 혈관 탄력 저하 및 면역력 감소를 말초 혈관 상태 검사(APG)와 내분비·간 및 당 수치 검사로 꼼꼼히 검사합니다.',
        solution: '간과 신장에 부담이 없도록 체질과 혈액 수치를 확인한 뒤, 방부제 없이 대표원장이 직접 빚어낸 황제공진단과 맞춤 보약으로 안전한 원기 충전을 회복합니다.',
        homeCare: '직사광선을 피해 서늘한 곳에 보관하시고 냉장 보관 시 복용 15분 전에 미리 꺼내어 실온 상태로 드시도록 안내해 도움드립니다.'
      }
    ]
  },
  {
    partId: 'syncope',
    catSlug: 'blog-syncope',
    catName: '자율신경 · 두통 · 어지럼 · 수면 · 실신 블로그',
    badgeLabel: '자율신경 · 두통 · 어지럼 · 수면 · 실신',
    clinicLink: 'director.html',
    doctorTitle: '바른한의원 안정위 대표원장 · 자율신경·두통·어지럼·수면·실신 클리닉',
    primaryExams: '⑥ 자율신경·스트레스 검사 HRV, ⑧ 말초 혈관 상태 검사 APG, ③ 이비인후 내시경(전정·이석 어지럼), ② 적외선 체열진단기 DITI',
    primaryTherapies: '안정위 원장 직접 상부 경추·두개천골 추나 · 자율신경 조율 한약 · 침·약침 · 자기장 · 소노 · 핫팩 · IR',
    imageModelDesc: '차분한 침실과 햇살 드는 창가 일상 배경의 편안하게 미소 짓는 잘생기고 예쁜 한국인 남녀 모델(무텍스트, 자연광)',
    sciJournals: [
      'European Heart Journal — ESC 실신(Syncope) 진단 및 관리 가이드라인: 미주신경성 반사 및 하지 근육 수축 요법',
      'Cephalalgia & J Vestib Res — 상부 경추(C1-C2) 교정 및 침구 치료의 만성 편두통·경추성 어지럼증 완화 기전',
      'Autonomic Neuroscience — 한의학 안신·보익 처방의 심박변이도(HRV) 개선 및 불면·자율신경실조 회복 연구'
    ],
    topicBank: [
      {
        titleTpl: '갑자기 눈앞이 아찔해지는 미주신경성 실신과 기립성 어지럼증, HRV 자율신경 검사로 진단합니다',
        subTopic: '뇌간-미주신경-말초혈관 수축 반사 균형 복원 치료',
        keyCause: '피로·공복·밀폐된 공간에서 부교감(미주)신경이 과도하게 작동해 심박수와 혈압이 동시에 떨어지며 뇌 혈류가 차단되는 기전을 자율신경 검사(HRV)와 말초 혈관 검사(APG)로 정확히 검사합니다.',
        solution: '심장 펌프력과 혈관 수축 탄력을 높이는 맞춤 한약과 미주신경이 지나는 상부 경추 이완 추나, 심부 자기장·IR 온열 치료를 병행해 실신 재발 없는 일상을 회복합니다.',
        homeCare: '아찔한 전조 증상이 오면 즉시 쪼그려 앉거나 다리를 X자로 교차해 허벅지·엉덩이에 힘을 주는(Leg Crossing) 응급 대처법으로 안전에 도움드립니다.'
      },
      {
        titleTpl: '진통제도 안 듣는 만성 편두통과 세상이 빙빙 도는 어지럼증(이석증·전정기능), 경추와 귀에서 원인을 진단합니다',
        subTopic: '상부 경추(C1-C2) 추골동맥 혈류 개통 및 전정신경 안정화',
        keyCause: 'MRI상 이상이 없는데도 반복되는 두통과 어지럼증은 상부 경추(환추·축추) 비틀림으로 인한 추골동맥 혈류 저하와 내이(전정기관) 림프 순환 장애가 핵심 원인이므로 이비인후 내시경과 초음파, HRV로 면밀히 진단합니다.',
        solution: '안정위 대표원장이 직접 상부 경추를 정밀 교정하는 추나와 두풍(頭風)·담음을 제거하는 맞춤 한약, 소노(초음파)·약침 치료로 맑고 가벼운 머리를 회복합니다.',
        homeCare: '고개를 급격히 돌리는 동작과 카페인·치즈·초콜릿 과다 섭취를 줄이고 뒷목 온찜질을 생활화하도록 도움드립니다.'
      },
      {
        titleTpl: '가슴이 두근거리고 잠들기 힘든 만성 불면증·자율신경실조증, 교감신경 과열을 식혀 숙면을 회복합니다',
        subTopic: '심박변이도(HRV) 균형 복원 및 수면-각성 생체시계 재설계',
        keyCause: '밤이 되어도 교감신경 브레이크가 작동하지 않아 뇌가 각성 상태에 머무는 원인을 자율신경·스트레스 검사(HRV)와 적외선 체열진단기(DITI)로 정밀하게 검사합니다.',
        solution: '의존성 수면제 대신 과열된 심열(心熱)을 내리고 흉곽·횡격막 긴장을 풀어주는 대표원장 수기 추나와 안신(安神) 한약으로 아침이 개운한 자연 숙면을 회복합니다.',
        homeCare: '취침 1시간 전 스마트폰 블루라이트를 차단하고 4-7-8 복식호흡과 미온수 족욕을 실천하여 깊은 잠에 도움드립니다.'
      }
    ]
  },
  {
    partId: 'digest',
    catSlug: 'blog-digest',
    catName: '소화 · 위장 · 담적 해독 블로그',
    badgeLabel: '소화 · 위장 · 담적 해독',
    clinicLink: 'director.html',
    doctorTitle: '바른한의원 안정위 대표원장 · 소화·위장·담적 해독 클리닉',
    primaryExams: '① 정밀 초음파 검사(오장육부·복부 위장관), ② 적외선 체열진단기 DITI(복부 냉증·담적 체열), ④ 사상체질 & 眞장부맥학 진맥',
    primaryTherapies: '담적 용해·위장 운동성 강화 한약(원내 압력 탕전) · 복부 왕뜸·극초단파·핫팩 심부온열 · 내장기 추나 · 소노 · ICT',
    imageModelDesc: '따뜻한 다이닝룸과 티룸 일상 배경의 속이 편안해 보이는 잘생기고 예쁜 한국인 남녀 모델(무텍스트, 자연광)',
    sciJournals: [
      'Neurogastroenterol Motil & J Ethnopharmacology — 한약 처방 및 침구 치료의 위 배출능(Gastric Emptying) 촉진 및 기능성 소화불량 개선',
      'Phytomedicine — 반하·황련·진피 복합 추출물의 식도 하부 괄약근 압력 조절 및 식도 점막 염증 보호 기전',
      'World J Gastroenterol — 과민성대장증후군(IBS)에서 장-뇌 축(Gut-Brain Axis) 조절 한약·침구 치료의 임상 효과'
    ],
    topicBank: [
      {
        titleTpl: '위내시경은 정상인데 명치가 돌처럼 딱딱하고 더부룩한 ‘담적병(痰積病)’, 복부 초음파와 체열 검사로 진단합니다',
        subTopic: '굳어진 위장 외벽 평활근 용해 및 위 배출능(연동운동) 복원',
        keyCause: '급하게 먹는 습관과 스트레스로 위장 외벽에 노폐물(담적)이 쌓여 위장이 굳어지는 현상을 정밀 초음파 검사(오장육부)와 적외선 체열진단기(DITI), 眞장부맥학 진맥으로 세밀하게 검사합니다.',
        solution: '굳어진 위장 근육을 부드럽게 녹여내는 원내 직영 담적 한약과 복부 심부 온도를 높이는 극초단파·자기장·소노·핫팩 온열요법, 내장기 추나를 병행해 속 시원한 소화력을 회복합니다.',
        homeCare: '한 입에 30번씩 꼭꼭 씹어 침 속 소화효소와 섞어 삼키고, 식사 중 물 마시기를 줄여 위산 희석 방지에 도움드립니다.'
      },
      {
        titleTpl: '타는 듯한 가슴 쓰림과 목 이물감 ‘역류성식도염’, 위산 억제가 아닌 하부식도괄약근 강화로 회복합니다',
        subTopic: '위장 내 가스 압력 감압 및 식도 점막 재생 치료',
        keyCause: '위산이 많아서가 아니라 위장 운동이 멈춰 음식물이 부패하면서 치솟는 가스가 느슨해진 식도 괄약근을 밀고 올라오는 원인을 복부 초음파와 이비인후 내시경으로 정확히 진단합니다.',
        solution: '위장 배출 속도를 높여 위 내압을 낮추고 손상된 식도·위 점막을 재생하는 보위(補胃) 한약과 상복부 혈자리 약침·IR 온열 치료로 재발 없는 편안함을 회복합니다.',
        homeCare: '취침 3시간 전 야식을 금하고 식후 바로 눕지 않으며, 커피·밀가루·탄산음료를 줄이도록 생활 관리에 도움드립니다.'
      },
      {
        titleTpl: '긴장만 하면 배가 아프고 설사·변비·가스가 반복되는 ‘과민성대장증후군’, 장-뇌 자율신경 축을 함께 치료합니다',
        subTopic: '장 점막 면역 장벽 복원 및 대장 과민 수축 진정',
        keyCause: '장과 뇌는 미주신경으로 직결되어 있어 스트레스와 장내 냉증이 대장 평활근의 경련성 수축을 일으키므로 HRV 자율신경 검사와 적외선 체열진단기(DITI)로 꼼꼼히 검사합니다.',
        solution: '차가운 아랫배를 따뜻하게 데우는 온장(溫腸) 한약과 골반·요추 자율신경 추나, 극초단파·핫팩 치료를 통해 중요한 자리에서도 배 아플 걱정 없는 튼튼한 대장을 회복합니다.',
        homeCare: '찬물·아이스 음료 대신 따뜻한 물을 마시고 양배추·연근·마 등 점막 보호 식단을 챙기도록 세심하게 도움드립니다.'
      }
    ]
  },
  {
    partId: 'gut',
    catSlug: 'blog-gut',
    catName: '대사 · 복부비만 다이어트 블로그',
    badgeLabel: '대사 · 복부비만 다이어트',
    clinicLink: 'diet-zero.html',
    doctorTitle: '바른한의원 안정위 대표원장 · 대사 해독 & 식욕ZERO 다이어트 클리닉',
    primaryExams: '⑤ 체지방·체성분 검사(내장지방·골격근·세포외수분), ⑦ 내분비·간 및 당 수치 검사, ④ 사상체질 정밀 검사',
    primaryTherapies: '식욕ZERO 맞춤 대사 한약(원내 압력 탕전) · 복부 심부 극초단파·자기장·소노·ICT · 골반·체형 교정 추나',
    imageModelDesc: '밝은 피트니스 라운지와 브런치 일상 배경의 건강하고 날씬한 잘생기고 예쁜 한국인 남녀 모델(무텍스트, 자연광)',
    sciJournals: [
      'Cell Metabolism — 시간제한 섭식(야간 공복 유지)의 내장지방 감소 및 인슐린 감수성 개선 기전',
      'Int J Obes — 전통 한약 복합물의 갈색지방(BAT) 열발생 활성화 및 렙틴 저항성 개선 연구',
      'Diabetes Care — 식이섬유·단백질 선섭취(Food Order)가 식후 혈당 스파이크 및 인슐린 분비에 미치는 영향'
    ],
    topicBank: [
      {
        titleTpl: '적게 먹어도 뱃살부터 찌는 복부·내장비만, 체성분 및 간·당 수치 검사로 대사 원인을 진단합니다',
        subTopic: '간·장 해독과 갈색지방 기초대사 화로 부스팅',
        keyCause: '무작정 굶는 절식 다이어트가 근육량과 기초대사량을 떨어뜨리고 내장지방을 축적시키는 과정을 체지방·체성분 검사와 내분비·간 및 당 수치 검사로 정밀하게 검사합니다.',
        solution: '손 떨림·불면 없이 자연스러운 포만감을 유도하는 식욕ZERO 한약과 복부 심부 지방층을 자극하는 극초단파·자기장·소노(초음파) 치료로 근육은 지키고 순수 내장지방만 건강하게 회복합니다.',
        homeCare: '식사할 때 [채소·해조류 → 단백질 → 탄수화물] 순서로 먹는 거꾸로 식사법으로 혈당 스파이크 예방에 도움드립니다.'
      },
      {
        titleTpl: '밤마다 터지는 가짜 배고픔과 야식 폭식, 렙틴 저항성과 스트레스 호르몬을 다스려 회복합니다',
        subTopic: '스트레스 코르티솔 진정 및 포만감 호르몬(렙틴) 감수성 복원',
        keyCause: '만성 수면 부족과 스트레스가 식욕 억제 호르몬(렙틴) 신호를 마비시키는 상태를 HRV 스트레스 검사와 사상체질 정밀 검사로 정확히 진단합니다.',
        solution: '위열(胃熱)과 울화를 가라앉히는 체질 맞춤 한약으로 절반만 먹어도 기분 좋게 배부른 진짜 포만감 회로를 되살려 요요 없는 체중 감량을 회복합니다.',
        homeCare: '저녁 식사 후 다음 날 아침까지 12~14시간 야간 공복을 유지하고 액상과당 음료를 끊도록 실천에 도움드립니다.'
      },
      {
        titleTpl: '아침마다 얼굴·하체가 붓는 부종형 비만과 산후비만, 골반 교정 추나와 림프 배출로 회복합니다',
        subTopic: '복부 냉증 개선 및 체수분·림프 순환 대사 치료',
        keyCause: '세포외수분 비율(부종 수치)이 높고 골반이 틀어져 하체 순환이 막힌 상태를 체성분 검사와 적외선 체열진단기(DITI)로 꼼꼼히 검사합니다.',
        solution: '안정위 원장이 직접 시행하는 골반·체형 교정 추나와 부종 배출 대사 한약, ICT·핫팩·극초단파 온열 치료를 병행해 부기와 군살을 동시에 회복합니다.',
        homeCare: '찬물 대신 따뜻한 미온수를 마시고 저녁 가벼운 하체 스트레칭으로 림프 순환 활성화에 도움드립니다.'
      }
    ]
  },
  {
    partId: 'uterus',
    catSlug: 'blog-uterus',
    catName: '여성질환 · 자궁 · 난임 · 산후 블로그',
    badgeLabel: '여성질환 · 자궁 · 난임 · 산후',
    clinicLink: 'director.html',
    doctorTitle: '바른한의원 안정위 대표원장 · 여성질환·자궁·난임·산후 클리닉',
    primaryExams: '② 적외선 체열진단기 DITI(하복부·자궁 냉증), ① 정밀 초음파 검사(하복부·골반), ⑧ 말초 혈관 검사 APG, ⑦ 내분비·간·당 검사',
    primaryTherapies: '보궁(補宮)·착상·산후 한약(원내 압력 탕전) · 골반 교정 추나 · 자궁 심부 극초단파·자기장·핫팩·IR 온열 치료',
    imageModelDesc: '따뜻한 햇살이 비치는 침실과 거실 일상 배경의 우아하고 건강한 한국인 여성 및 부부 모델(무텍스트, 자연광)',
    sciJournals: [
      'Complement Ther Med — 시험관 아기(IVF) 시술 시 한약 병행 치료의 자궁내막 수용성 및 임상 임신율 향상 메타분석',
      'J Ethnopharmacology — 조경·화어(化瘀) 한약 처방의 자궁 평활근 과수축 억제 및 생리통·골반 어혈 개선 기전',
      'Phytomedicine — 산후 어혈 배출·보허 처방의 자궁 퇴축 촉진 및 갱년기 상열감·불면 개선 연구'
    ],
    topicBank: [
      {
        titleTpl: '시험관(IVF)·인공수정 착상률을 높이는 따뜻한 자궁내막, 적외선 체열진단(DITI)으로 검사합니다',
        subTopic: '자궁 동맥 혈류 확장 및 착상 필수 인자(LIF) 발현 극대화',
        keyCause: '아랫배가 차갑고 자궁내막 혈류 저항이 높아 배아가 뿌리내리기 힘든 환경을 적외선 체열진단기(DITI)와 말초 혈관 검사(APG), 내분비 수치 검사로 정밀하게 진단합니다.',
        solution: '안정위 원장이 직접 처방·탕전하는 보궁·착상 한약과 자궁 심부 온도를 높이는 극초단파·자기장·핫팩·IR 온열 치료, 골반 추나를 병행해 건강한 임신과 안태(유산 방지)를 회복합니다.',
        homeCare: '매일 저녁 아랫배 온찜질 20분과 발목(삼음교혈) 보온을 실천하여 자궁 혈류 유지에 따뜻한 도움드립니다.'
      },
      {
        titleTpl: '진통제 없이는 버티기 힘든 극심한 생리통과 생리불순, 골반 추나와 자궁 어혈 해독으로 회복합니다',
        subTopic: '프로스타글란딘 과다 분비 억제 및 골반 정맥 울혈 해소',
        keyCause: '틀어진 골반과 자궁 내 고인 어혈(瘀血)이 자궁 근육의 경련성 수축을 유발하는 원인을 정밀 초음파 검사와 체열진단기(DITI)로 꼼꼼히 검사합니다.',
        solution: '자궁을 감싸는 골반·천골의 비틀림을 대표원장 수기 추나로 바로잡고, 묵은 어혈을 깨끗하게 비워내는 맞춤 한약과 소노·자기장 치료로 진통제 없이 편안한 생리 주기를 회복합니다.',
        homeCare: '일회용 플라스틱 용기 사용(환경호르몬)을 피하고 취침 전 골반 나비 자세 스트레칭으로 골반 순환에 도움드립니다.'
      },
      {
        titleTpl: '출산 후 시린 마디마디 산후풍과 얼굴 달아오르는 여성 갱년기, 체질별 맞춤 한약으로 회복합니다',
        subTopic: '산후 오로 배출·골반 복원 및 갱년기 상열하한 자율신경 조절',
        keyCause: '출산 후 릴랙신 호르몬에 의한 관절 이완과 갱년기 에스트로겐 급감으로 인한 자율신경 불균형을 HRV 검사와 사상체질 검사, 간 안전성 검사로 정밀하게 진단합니다.',
        solution: '모유 수유 중에도 안심할 수 있는 원내 직영 산후보약과 산후 골반 교정 추나, 그리고 갱년기 화병·불면을 다스리는 청열보음 치료로 평생 여성 건강을 회복합니다.',
        homeCare: '출산 후 찬 바람 노출을 피하고 갱년기에는 석류·검은콩·두부 식단과 낮 산책을 유지하도록 도움드립니다.'
      }
    ]
  },
  {
    partId: 'prostate',
    catSlug: 'blog-prostate',
    catName: '전립선 · 요실금 · 남성활력 블로그',
    badgeLabel: '전립선 · 요실금 · 남성활력',
    clinicLink: 'prostate.html',
    doctorTitle: '바른한의원 안정위 대표원장 · 전립선·요실금·남성활력 클리닉',
    primaryExams: '① 정밀 초음파 검사(하복부·방광·전립선 주변), ② 적외선 체열진단기 DITI(하초 냉증), ⑧ 말초 혈관 검사 APG, ④ 眞장부맥학 진맥',
    primaryTherapies: '전립선 감압 & 방광 괄약근(요실금) 강화 한약 · 골반저근 심부 자기장·극초단파·소노 · 대표원장 골반 추나 · 약침',
    imageModelDesc: '세련된 라운지와 산책로 일상 배경의 활기차고 자신감 넘치는 한국인 중장년 남녀 모델(무텍스트, 자연광)',
    sciJournals: [
      'Phytomedicine & J Urol — 한약 추출물 및 골반저 자극의 전립선 부종 감압·방광 괄약근 안정화를 통한 요실금·야간뇨 감소 효과',
      'Urology — 만성 비세균성 전립선염/만성골반통증증후군(CP/CPPS)에서 침구·약침 및 골반 이완 치료의 NIH-CPSI 개선',
      'Andrology — 보신익정(補腎益精) 처방의 남성 내분비 항상성 유지 및 말초 해면체 혈류 활성화 연구'
    ],
    topicBank: [
      {
        titleTpl: '새벽 야간뇨와 기침·급박할 때 새는 ‘요실금·전립선비대’, 방광 괄약근 강화와 감압 치료로 회복합니다',
        subTopic: '전립선 부종 감압 및 복압성·절박성 요실금 골반저근·방광 온양 치료',
        keyCause: '부어오른 전립선이 요도를 압박하고 약해진 방광 괄약근과 골반저 근육 때문에 복압성·절박성 요실금과 야간뇨가 발생하는 원인을 정밀 초음파 검사와 적외선 체열진단기(DITI)로 정확히 검사합니다.',
        solution: '전립선 부종을 빼고 차가워진 방광과 괄약근 수축력을 높이는 축천(縮泉)·온양 한약과, 옷을 입은 채 골반저근을 강화하는 심부 자기장·극초단파·소노 치료를 병행해 요실금 없는 쾌뇨와 통잠을 회복합니다.',
        homeCare: '저녁 7시 이후 수분·카페인 섭취를 줄이고 매일 미온수 온수 좌욕과 케겔(괄약근 수축) 운동을 실천하도록 도움드립니다.'
      },
      {
        titleTpl: '항생제를 먹어도 낫지 않는 회음부·아랫배 통증 ‘만성 전립선염’, 골반 추나와 약침으로 진단·회복합니다',
        subTopic: '골반저근 울혈 해소 & 골반·천장관절 신경감압 추나',
        keyCause: '만성 전립선염의 90% 이상은 세균이 아닌 골반 틀어짐과 골반저 근육 경직으로 인한 신경·혈관 울혈이므로 초음파와 체열진단기(DITI)로 정밀하게 진단합니다.',
        solution: '1:1 독립 진료실에서 안정위 대표원장이 직접 골반·천골 비대칭을 교정하는 수기 추나와 고농축 약침, 자기장·극초단파 치료를 시행해 묵직한 회음부 통증과 빈뇨를 회복합니다.',
        homeCare: '50분 앉아 있었다면 5분은 일어나 걷고 푹신한 도넛 방석을 활용하며 소변을 억지로 참지 않도록 도움드립니다.'
      },
      {
        titleTpl: '예전 같지 않은 아침 활력과 남성 갱년기 피로, 1:1 프라이빗 진맥과 하초(腎陽) 보강으로 회복합니다',
        subTopic: '말초 혈관 탄력(APG) 개선 및 보신익정(補腎益精) 맞춤 처방',
        keyCause: '배뇨 불편감과 요실금, 남성 활력 저하는 하초(신장·방광·생식기)로 향하는 골반 동맥 혈류와 자율신경 뿌리를 공유하므로 말초 혈관 검사(APG)와 眞장부맥학 진맥으로 세밀하게 검사합니다.',
        solution: '원내 직영 압력 탕전으로 조제하는 보신익정 맞춤 한약과 심부 온열·약침 치료로 요도·방광 기능과 당당한 남성 활력을 동시에 회복합니다.',
        homeCare: '익힌 토마토(라이코펜)·호박씨·굴·마늘 섭취와 매일 하체 스쿼트 30회로 골반 혈류 강화에 도움드립니다.'
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
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(function(t) {
    if (t.getHandlerFunction() === 'dailyDiseaseAutoPublishJob') {
      ScriptApp.deleteTrigger(t);
    }
  });

  ScriptApp.newTrigger('dailyDiseaseAutoPublishJob')
    .timeBased()
    .atHour(CONFIG.TRIGGER_HOUR_KST || 8)
    .everyDays(1)
    .inTimezone('Asia/Seoul')
    .create();

  Logger.log('✅ [바른한의원 3D 모션 백과사전] 9대 카드 질환별 데일리 블로그 자동 발행 트리거 설정 완료 (매일 ' + (CONFIG.TRIGGER_HOUR_KST || 8) + '시, 모드: ' + CONFIG.PUBLISH_MODE + ')');
}

/**
 * ============================================================================
 * 2. 매일 실행되는 메인 자동 발행 잡 (카드 질환별 각각 하루 1편 = 총 9편 발행)
 * ============================================================================
 */
function dailyDiseaseAutoPublishJob() {
  const props = PropertiesService.getScriptProperties();
  const todayStr = Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyy-MM-dd');
  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);

  if (CONFIG.PUBLISH_MODE === 'ALL_9_DAILY' || CONFIG.PUBLISH_MODE === 'ALL_8_DAILY') {
    // 매일 9개 카드 질환 모두 각각 1편씩(하루 총 9편) 자동 발행
    const results = [];
    for (var i = 0; i < DISEASE_META.length; i++) {
      var meta = DISEASE_META[i];
      var res = publishSingleDiseaseBlog(meta, dayOfYear + i, todayStr);
      results.push(res);
    }
    Logger.log('✅ [' + todayStr + '] 9대 카드 질환 전체 데일리 블로그 발행 완료 (' + results.length + '건)');
    return results;
  } else {
    var rotIdx = parseInt(props.getProperty('LAST_ROTATE_INDEX') || '0', 10);
    var targetMeta = DISEASE_META[rotIdx % DISEASE_META.length];
    var singleRes = publishSingleDiseaseBlog(targetMeta, dayOfYear, todayStr);
    props.setProperty('LAST_ROTATE_INDEX', String((rotIdx + 1) % DISEASE_META.length));
    Logger.log('✅ [' + todayStr + '] 순환 질환 블로그 발행 완료: ' + targetMeta.partId);
    return [singleRes];
  }
}

/**
 * 수동 즉시 테스트 함수 1: 9개 카드 질환 모두 지금 즉시 1편씩 발행
 */
function testPublishAll9DiseasesNow() {
  const prevMode = CONFIG.PUBLISH_MODE;
  CONFIG.PUBLISH_MODE = 'ALL_9_DAILY';
  const res = dailyDiseaseAutoPublishJob();
  CONFIG.PUBLISH_MODE = prevMode;
  return res;
}

// 하위 호환용 별칭 유지
function testPublishAll8DiseasesNow() {
  return testPublishAll9DiseasesNow();
}

/**
 * 수동 즉시 테스트 함수 2: 단일 질환 1편 즉시 발행
 */
function testPublishSingleDiseaseNow() {
  const todayStr = Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyy-MM-dd');
  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  return publishSingleDiseaseBlog(DISEASE_META[0], dayOfYear, todayStr);
}

/**
 * ============================================================================
 * 3. 개별 질환 블로그 아티클 생성 + 워드프레스 발행 + 3D 모션 백과사전 피드 저장
 * ============================================================================
 */
function publishSingleDiseaseBlog(meta, seedNumber, dateStr) {
  const article = generateDiseaseArticleContent(meta, seedNumber, dateStr);

  let wpResult = { ok: false, wpPostId: null, link: '' };
  try {
    wpResult = postToWordPressRestApi(meta, article);
  } catch (e) {
    Logger.log('⚠️ 워드프레스 REST API 전송 참고 (' + meta.partId + '): ' + e.message);
  }

  const postRecord = {
    id: wpResult.wpPostId ? ('wp-' + wpResult.wpPostId) : (meta.partId + '-gas-' + dateStr + '-' + seedNumber),
    partId: meta.partId,
    catSlug: meta.catSlug,
    date: dateStr,
    badge: article.badge,
    title: article.title,
    summary: article.summary,
    journalRef: article.journalRef,
    readTime: '4분 칼럼',
    tags: article.tags,
    seoFilename: article.seoFilename,
    imageAlt: article.imageAlt,
    link: wpResult.link || (CONFIG.WP_SITE_URL + '/body-explorer/?part=' + meta.partId + '&tab=blog'),
    contentHtml: article.contentHtml
  };

  savePostToScriptStorage(postRecord);
  appendLogToSpreadsheet(postRecord, wpResult.ok ? '워드프레스+3D백과사전 발행완료' : '3D백과사전 피드 발행완료');

  return postRecord;
}

/**
 * ============================================================================
 * 4. Gemini AI 연동 + 365일 내장 학술 임상 칼럼 생성기 (신규 표준 운영 시스템 완벽 준수)
 * ============================================================================
 */
function generateDiseaseArticleContent(meta, seedNumber, dateStr) {
  const props = PropertiesService.getScriptProperties();
  const geminiKey = CONFIG.GEMINI_API_KEY || props.getProperty('GEMINI_API_KEY') || '';
  const topicItem = meta.topicBank[seedNumber % meta.topicBank.length];
  const journalRef = meta.sciJournals[seedNumber % meta.sciJournals.length];
  const seoFilename = 'daejeon-bareun-korean-medicine-' + meta.partId + '-care-' + dateStr.replace(/-/g, '') + '.webp';
  const imageAlt = '대전 바른한의원 ' + meta.badgeLabel + ' — ' + meta.imageModelDesc + ' 대표 이미지';

  if (geminiKey) {
    try {
      const prompt = [
        '당신은 대전 바른한의원 안정위 대표원장("아빠 한의사 — 내 가족에게 처방하는 치료만 시행합니다")입니다.',
        '3D 모션 백과사전(body-explorer.html)의 [' + meta.badgeLabel + '] 파트를 위한 오늘의 질환 블로그 칼럼을 JSON 형식으로 작성하세요.',
        '필수 문체 규칙: 문장 서술 시 반드시 "도움드립니다.", "검사합니다.", "진단합니다.", "회복합니다." 4대 핵심 종결어미를 자연스럽게 포함하세요.',
        '필수 검사 및 시술 반영: ' + meta.primaryExams + ' 및 ' + meta.primaryTherapies + ' (자기장, 소노, 핫팩, ICT, IR, 극초단파 포함) 내용을 구체적으로 녹여내세요.',
        '참고 주제: ' + topicItem.titleTpl + ' (' + topicItem.subTopic + ')',
        '인용 학술지: ' + journalRef,
        '반드시 아래 JSON 키만 포함하여 순수 JSON으로 응답하세요:',
        '{"title":"제목","summary":"2문장 핵심 요약","step1Title":"1단계 소제목","step1Body":"원인 및 정밀 검사 본문(3~4문장)","step2Title":"2단계 소제목","step2Body":"원장 직접 시술 및 6대 물리치료 본문(3~4문장)","step3Title":"3단계 소제목","step3Body":"가정 내 실전 홈케어 수칙 본문(3~4문장)","tags":["태그1","태그2","태그3"]}'
      ].join('\n');

      const url = 'https://generativelanguage.googleapis.com/v1beta/models/' + CONFIG.GEMINI_MODEL + ':generateContent?key=' + encodeURIComponent(geminiKey);
      const resp = UrlFetchApp.fetch(url, {
        method: 'post',
        contentType: 'application/json',
        payload: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: 'application/json', temperature: 0.5 }
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
          seoFilename: seoFilename,
          imageAlt: imageAlt,
          tags: aiData.tags || [meta.badgeLabel, '안정위원장직접시술', '바른한의원'],
          contentHtml: buildMedicalColumnHtml({
            meta: meta,
            lead: aiData.summary || topicItem.keyCause,
            sections: [
              { h: '1. ' + (aiData.step1Title || '핵심 원인 분석 및 9대 정밀 검사'), p: aiData.step1Body || topicItem.keyCause },
              { h: '2. ' + (aiData.step2Title || '안정위 원장 직접 시술 및 6대 한방 물리치료'), p: aiData.step2Body || topicItem.solution },
              { h: '3. ' + (aiData.step3Title || '일상 속 실전 홈케어 가이드'), p: aiData.step3Body || topicItem.homeCare }
            ],
            journal: journalRef,
            seoFilename: seoFilename,
            imageAlt: imageAlt,
            doctorNote: '바른한의원은 안정위 대표원장이 9대 정밀 과학 검사로 원인을 진단하고, 내 가족에게 처방하는 치료만 직접 시술하여 환자분의 건강한 일상을 회복합니다.'
          })
        };
      }
    } catch (err) {
      Logger.log('Gemini 호출 폴백(내장 학술 엔진 사용): ' + err.message);
    }
  }

  const seasonTags = ['봄 환절기', '여름철', '가을 환절기', '겨울철'];
  const month = new Date().getMonth() + 1;
  const seasonLabel = month >= 3 && month <= 5 ? seasonTags[0] : (month >= 6 && month <= 8 ? seasonTags[1] : (month >= 9 && month <= 11 ? seasonTags[2] : seasonTags[3]));

  return {
    badge: '질환별 데일리 칼럼 · ' + meta.badgeLabel,
    title: '[' + seasonLabel + ' 집중케어] ' + topicItem.titleTpl,
    summary: topicItem.keyCause,
    journalRef: journalRef,
    seoFilename: seoFilename,
    imageAlt: imageAlt,
    tags: [meta.badgeLabel.split('·')[0].trim(), topicItem.subTopic.split(' ')[0], '안정위원장직접진료', '바른한의원'],
    contentHtml: buildMedicalColumnHtml({
      meta: meta,
      lead: topicItem.keyCause,
      sections: [
        { h: '1. 왜 증상이 반복될까요? — ' + topicItem.subTopic + ' (정밀 검사 및 진단)', p: topicItem.keyCause },
        { h: '2. 안정위 원장 1:1 직접 시술 & 6대 한방 물리치료 프로토콜', p: topicItem.solution },
        { h: '3. 오늘부터 바로 실천하는 가정 내 핵심 관리 수칙', p: topicItem.homeCare }
      ],
      journal: journalRef,
      seoFilename: seoFilename,
      imageAlt: imageAlt,
      doctorNote: '“정밀하게 검사합니다. 근본 원인을 진단합니다. 정성껏 도움드립니다. 건강한 일상을 회복합니다.” — 바른한의원 안정위 대표원장 임상 노트 (' + dateStr + ')'
    })
  };
}

function buildMedicalColumnHtml(data) {
  const meta = data.meta || {};
  const secs = (data.sections || []).map(function(s) {
    return '<div class="blog-art-sec" style="margin:14px 0;padding:14px 16px;border-radius:12px;background:#FFFDF9;border:1px solid #E2D9C8;">' +
      '<h4 style="margin:0 0 6px;font-size:0.95rem;color:#2D5A43;font-weight:800;">' + s.h + '</h4>' +
      '<p style="margin:0;font-size:0.86rem;line-height:1.7;color:#2C2623;">' + s.p + '</p>' +
    '</div>';
  }).join('');

  return '<div class="bareun-disease-blog-article" data-seo-image="' + (data.seoFilename || '') + '" data-image-alt="' + (data.imageAlt || '') + '">' +
    '<p class="blog-art-lead" style="font-size:0.9rem;font-weight:700;line-height:1.68;color:#171614;margin:0 0 14px;">' + data.lead + '</p>' +
    secs +
    '<div class="blog-art-exams" style="margin-top:12px;padding:12px 14px;border-radius:10px;background:#F4F8F5;border:1px solid rgba(45,90,67,0.22);font-size:0.8rem;color:#1E3A2B;line-height:1.6;">' +
      '<strong>🔬 안정위 원장 상세페이지(director.html) 정밀 검사 및 직접 시술:</strong><br>' +
      '· 핵심 검사: ' + (meta.primaryExams || DIRECTOR_STANDARD_SYSTEM.nineExamsSummary) + '<br>' +
      '· 6대 물리·이학요법: ' + DIRECTOR_STANDARD_SYSTEM.sixPhysicalTherapiesSummary +
    '</div>' +
    '<div class="blog-art-sci" style="margin-top:10px;padding:11px 14px;border-radius:10px;background:#F3EFE6;font-size:0.78rem;color:#4E463F;">' +
      '<strong>📚 학술 논문 검수 근거:</strong> ' + data.journal +
    '</div>' +
    '<div class="blog-art-internal-links" style="margin-top:10px;padding:11px 14px;border-radius:10px;background:#FFFDF9;border:1px dashed #C5A059;font-size:0.79rem;color:#2C2623;">' +
      '<strong>🔗 3D 모션 백과사전 & 추천 블로그 내부링크:</strong> ' +
      '<a href="https://www.bareunhaniwon.com/body-explorer/?part=' + (meta.partId || 'lumbar') + '&tab=blog" style="color:#2D5A43;font-weight:800;text-decoration:underline;">[3D 모션 백과사전 ' + (meta.badgeLabel || '') + ' 최신글 3개 & 3D 해부학 보기]</a> · ' +
      '<a href="https://www.bareunhaniwon.com/director/" style="color:#8A6327;font-weight:700;text-decoration:underline;">[안정위 원장 9대 정밀 검사 안내]</a>' +
    '</div>' +
    '<div class="blog-art-docnote" style="margin-top:10px;padding:11px 14px;border-radius:10px;background:#EBF3EE;font-size:0.8rem;font-weight:700;color:#2D5A43;">' +
      '<strong>👨‍⚕️ 아빠 한의사 안정위 대표원장 한마디:</strong> ' + data.doctorNote +
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

  let catId = ensureWordPressCategory(baseUrl, authHeader, meta.catSlug, meta.catName);

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
 * 6. GAS 웹앱(doGet) 실시간 JSON 피드 엔드포인트 (3D 모션 백과사전 연동용)
 * ============================================================================
 */
function doGet(e) {
  const partFilter = (e && e.parameter && e.parameter.part) ? String(e.parameter.part).trim() : '';
  const action = (e && e.parameter && e.parameter.action) ? String(e.parameter.action).trim() : 'feed';

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
    clinic: '바른한의원 대전본점 3D 모션 백과사전 9대 질환별 자동 블로그 피드',
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
  // 최신 글이 맨 앞으로 오도록 추가 (최대 54건 유지 — 9개 질환당 최신 6건)
  list.unshift(postRecord);
  if (list.length > 54) {
    list = list.slice(0, 54);
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
      sheet.appendRow(['발행일시', '질환코드(partId)', '카테고리슬러그', '칼럼제목', '핵심요약', '학술지근거', 'SEO파일명', '상태', '연결링크']);
    }
    sheet.appendRow([
      Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyy-MM-dd HH:mm:ss'),
      postRecord.partId,
      postRecord.catSlug,
      postRecord.title,
      postRecord.summary,
      postRecord.journalRef,
      postRecord.seoFilename || '',
      statusText,
      postRecord.link
    ]);
  } catch (e) {
    Logger.log('스프레드시트 로그 기록 생략: ' + e.message);
  }
}
