/**
 * ============================================================================
 * [v5.0] 바른 통합의학 리서치 저널 자동화 스크립트 (Google Apps Script)
 * ============================================================================
 * 핵심 변경 사항 (v5.0 전문가 저널 에디션):
 *  1) '안정위 원장 시술' 등 특정 원장 성함·시술 홍보 문구 100% 배제 (비홍보성 순수 의학 저널 컨셉)
 *  2) 한의학·통합의학 논문뿐 아니라 해외 메이저 의학 학술지(Nature Medicine, NEJM, The Lancet, JAMA,
 *     Physiological Reviews, European Heart Journal, JCEM, Human Reproduction Update, European Urology 등) 필수 인용
 *  3) 기본 모드: DRAFT_REVIEW_MODE = true (기존 대표글 1편 단독 노출 유지, 신규 원고는 임시저장 후 마스터 검수 발행)
 *  4) 블로그 내 Q&A 댓글창 완전 분리 (comment_status: 'closed') → 질문은 전용 '/ask-doctor/?tab=qna' 비공개 메뉴로 안내
 */

const CONFIG = {
  WP_SITE_URL: 'https://www.bareunhaniwon.com',
  WP_USERNAME: 'wealthywei0508',
  WP_APP_PASSWORD: '여기에_워드프레스_애플리케이션_비밀번호_입력',
  GEMINI_API_KEY: '여기에_GEMINI_API_KEY_입력',
  GEMINI_MODEL: 'gemini-2.5-flash',
  DRAFT_REVIEW_MODE: true // 대표글 1편만 공개 유지하려면 true (검수 후 수동 공개 가능)
};

const RESEARCH_TOPICS = [
  {
    slugPrefix: 'circadian-hpa-chronic-fatigue-review',
    theme: '전신 저등급 만성염증(SCI)과 일주기 코르티솔 리듬 회복 생리학',
    overseasRefs: ['Nature Medicine (Furman et al., 2019)', 'Nature Reviews Neuroscience (Lupien et al.)'],
    integrativeRefs: ['Journal of Ethnopharmacology (BDNF/CREB neuroprotection)']
  },
  {
    slugPrefix: 'gut-brain-axis-functional-dyspepsia-review',
    theme: '장-뇌 축(Microbiota-Gut-Brain Axis)과 기능성 위장관 운동 지연의 이해',
    overseasRefs: ['Physiological Reviews (Cryan et al., 2019)', 'Gastroenterology (Rome IV Criteria)'],
    integrativeRefs: ['Neurogastroenterology & Motility (Interstitial Cells of Cajal)']
  },
  {
    slugPrefix: 'spinal-biomechanics-conservative-care-review',
    theme: '전방두부자세와 요추 추간판 압력 생체역학 및 비수술 보존 관리 원칙',
    overseasRefs: ['The Lancet Low Back Pain Series (2018)', 'JAMA Spinal Manipulative Therapy Review (2017)'],
    integrativeRefs: ['PAIN / Spine Biomechanics']
  }
];

function generateExpertJournalArticle() {
  const dayIdx = Math.floor(Date.now() / 86400000) % RESEARCH_TOPICS.length;
  const topic = RESEARCH_TOPICS[dayIdx];

  const prompt = [
    '당신은 Harvard Health Publishing 및 Nature Reviews 스타일의 의학·생리학 전문 에디터입니다.',
    `주제: ${topic.theme}`,
    `필수 해외 의학 참고문헌: ${topic.overseasRefs.join(', ')}`,
    `필수 통합생리학 참고문헌: ${topic.integrativeRefs.join(', ')}`,
    '엄격 준수 원칙:',
    '1. 특정 병원장 이름이나 병원 시술 홍보 문구를 절대 포함하지 마십시오.',
    '2. 독자에게 실질적으로 유익한 생리학적 원리, 최신 해외 논문 근거, 일상 실천 루틴만 객관적이고 품격 있게 작성하십시오.',
    '3. JSON 형식({ "title": "...", "excerpt": "...", "htmlBody": "..." })으로 반환하십시오.'
  ].join('\n');

  const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${CONFIG.GEMINI_MODEL}:generateContent?key=${CONFIG.GEMINI_API_KEY}`;
  const res = UrlFetchApp.fetch(geminiUrl, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: 'application/json', temperature: 0.4 }
    })
  });

  const parsed = JSON.parse(JSON.parse(res.getContentText()).candidates[0].content.parts[0].text);
  const authHeader = 'Basic ' + Utilities.base64Encode(CONFIG.WP_USERNAME + ':' + CONFIG.WP_APP_PASSWORD);

  UrlFetchApp.fetch(`${CONFIG.WP_SITE_URL}/wp-json/wp/v2/posts`, {
    method: 'post',
    contentType: 'application/json',
    headers: { Authorization: authHeader },
    payload: JSON.stringify({
      title: parsed.title,
      slug: `${topic.slugPrefix}-${Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyyMMdd')}`,
      excerpt: parsed.excerpt,
      content: parsed.htmlBody,
      status: CONFIG.DRAFT_REVIEW_MODE ? 'draft' : 'publish',
      comment_status: 'closed'
    })
  });
}

/**
 * ============================================================================
 * [v5.3] 3D 인체모형 『바른한의원 진료 살펴보기』 2일 주기(48h) 신규 글 자동 업데이트 엔진
 *  - [AI 내부 3단계 자가 검수 루프] (1차 의학 팩트 체크 → 2차 의료법 제56조·무홍보 → 3차 일상어 순화·맞춤법)
 *  - 검수 통과 시 /wp-json/bareun/v1/body-notes 로 자동 발행되어 메뉴 1(최신글 1개) 및 메뉴 3(더 궁금하세요? 누적 목록)에 즉시 반영!
 * ============================================================================
 */
const BODY_3D_PART_ROTATION = [
  { partId: 'knee',       partLabel: '무릎 성장판',       targetReader: '초등학생 자녀를 둔 학부모',        themes: ['소아 비만', '밤중 입호흡과 수면', '성조숙증과 단 음료 습관', '줄넘기 운동과 성장통 구별'] },
  { partId: 'cervical',   partLabel: '뒷목 · 두피 혈관',  targetReader: '머리카락이 가늘어진 직장인',       themes: ['두피 열감과 정수리 탈모', '거북목과 뒷목 뻐근함', '저녁 샴푸와 찬 바람 건조'] },
  { partId: 'lumbar',     partLabel: '허리 · 골반 마디',  targetReader: '오래 앉아 일하는 직장인',          themes: ['허리 통증과 다리 저림', '다리 꼬기와 골반 틀어짐', '아침 기상 직후 급성 허리 통증'] },
  { partId: 'gongjindan', partLabel: '심장 · 뇌 활력축',  targetReader: '만성 피로에 지친 현대인',          themes: ['자도 안 풀리는 만성 피로', '오후 머리가 멍해지는 집중력 저하', '주말 몰아 자기와 생체 시계'] },
  { partId: 'syncope',    partLabel: '자율신경 · 뇌혈류', targetReader: '어지럼과 불면을 겪는 성인',        themes: ['갑자기 눈앞이 하얘지는 어지럼증', '새벽마다 깨는 얕은 수면', '관자놀이가 지끈거리는 편두통'] },
  { partId: 'digest',     partLabel: '위장 · 식도 근육',  targetReader: '식후 더부룩함이 잦은 성인',        themes: ['검사상 정상인데 막히는 소화불량', '목 이물감과 신물 역류', '급하게 먹는 식습관과 배 가스'] },
  { partId: 'gut',        partLabel: '복부 · 대사 순환',  targetReader: '체중 감량 정체기를 겪는 성인',     themes: ['굶어도 안 빠지는 나잇살', '저녁 가짜 배고픔과 단맛 습관', '저녁마다 붓는 종아리 부종'] },
  { partId: 'uterus',     partLabel: '아랫배 · 골반 순환',targetReader: '생리통과 임신을 준비하는 여성',     themes: ['손발 · 아랫배 냉증과 생리통', '임신 준비기 골반 순환과 숙면', '출산 후 손목 · 발목 시림'] },
  { partId: 'prostate',   partLabel: '방광 · 골반 바닥근',targetReader: '야간 소변으로 잠을 설치는 중장년',  themes: ['새벽 잠 깨우는 야간뇨', '오래 앉은 뒤 묵직한 잔뇨감', '기침할 때 새는 민감한 방광'] }
];

function generateEvery2DaysBody3DNote() {
  const twoDaySlot = Math.floor(Date.now() / (2 * 86400000));
  // 성장 파트(knee) 비중을 높게 유지하면서 9대 부위를 2일마다 자동 순환 업데이트
  const targetMeta = (twoDaySlot % 2 === 0)
    ? BODY_3D_PART_ROTATION[0]
    : BODY_3D_PART_ROTATION[twoDaySlot % BODY_3D_PART_ROTATION.length];
  const theme = targetMeta.themes[twoDaySlot % targetMeta.themes.length];

  const prompt = [
    '[역할 정의]',
    '너는 환자의 눈높이에서 일상 언어로 소통하는 한의사이자, 의학적 정확성을 엄격히 통제하는 수석 팩트체커야.',
    '의학적·학술적 팩트(소아내분비학, 소아정형학, 한방소아과학 및 관련 분과 논문 근거)를 기반으로 하되, 초보자도 1초 만에 이해할 수 있는 쉬운 일상 언어로 작성해야 해.',
    '',
    '[목적 및 환경]',
    '- 환경: 한의원 홈페이지 3D 인체 그래픽 "정보 팝업 패널"',
    '- 목적: 병원 홍보나 예약 유도(CTA)는 일절 배제하고, 환자가 유익한 건강 기준을 얻어가는 순수 정보형 콘텐츠 작성',
    '',
    '[입력 변수]',
    `- 클릭 부위: [${targetMeta.partLabel}]`,
    `- 테마: [${theme}]`,
    `- 타깃 독자: ${targetMeta.targetReader}`,
    '',
    '[필수 반영 핵심 규칙]',
    '1. 제목(Hooking): 일상적인 질문형 문장(?)으로 시작할 것.',
    '2. 언어 순화: 해부학 전문 용어(대퇴골, 골단판, 아로마타제, 추간판, 수핵, 후두하근, 모유두, 나선동맥, 시상하부 등) 대신 일상 언어(예: 성장 연골, 허벅지 뼈, 디스크 말랑 쿠션 등) 사용.',
    '3. 학술 논문 팩트 매핑: 질환의 원리를 일상적인 비유로 쉽게 설명.',
    '4. 흔한 오해 바로잡기: 해당 테마에 맞는 통념 1가지를 명확히 짚어줄 것.',
    '5. 1분 홈 체크리스트: 집에서 오늘 밤 당장 확인 가능한 관찰 기준 2가지 제시.',
    '6. 홍보 금지: 내원 유도, 예약, 상담, 병원명, 원장, 완치, 100%, 최고 등 상업적 문구 절대 배제.',
    '7. 핵심 키워드 필수 포함: 조회수 높은 핵심 키워드 1개를 선정하여 문맥에 맞게 자연스럽게 1~2회 녹여낼 것.',
    '',
    '[3단계 연속 자가 검수 프로토콜 수행 후 순수 JSON으로만 반환]',
    '{"keyword":"핵심키워드","title":"공감형 질문 타이틀?","empathy":["고민 대사 1줄","고민 대사 2줄"],"truth":["핵심 원인 1줄","핵심 원인 2줄"],"myth":["통념 교정 1줄","통념 교정 2줄"],"check":["관찰 기준 1","관찰 기준 2"]}'
  ].join('\n');

  const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${CONFIG.GEMINI_MODEL}:generateContent?key=${CONFIG.GEMINI_API_KEY}`;
  const res = UrlFetchApp.fetch(geminiUrl, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: 'application/json', temperature: 0.35 }
    })
  });

  const parsed = JSON.parse(JSON.parse(res.getContentText()).candidates[0].content.parts[0].text);
  const todayKst = Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyy-MM-dd');
  const authHeader = 'Basic ' + Utilities.base64Encode(CONFIG.WP_USERNAME + ':' + CONFIG.WP_APP_PASSWORD);

  UrlFetchApp.fetch(`${CONFIG.WP_SITE_URL}/wp-json/bareun/v1/body-notes`, {
    method: 'post',
    contentType: 'application/json',
    headers: { Authorization: authHeader },
    payload: JSON.stringify({
      note: {
        id: `${targetMeta.partId}-${todayKst.replace(/-/g, '')}-auto`,
        partId: targetMeta.partId,
        partLabel: targetMeta.partLabel,
        theme: theme,
        targetReader: targetMeta.targetReader,
        keyword: parsed.keyword,
        publishDate: todayKst,
        title: parsed.title,
        empathy: parsed.empathy,
        truth: parsed.truth,
        myth: parsed.myth,
        check: parsed.check
      }
    })
  });
}

/**
 * 2일에 한 번씩 오전 8시에 자동 실행되도록 Google Apps Script 트리거를 등록합니다 (최초 1회 실행).
 */
function setupBody3DEvery2DaysTrigger() {
  ScriptApp.getProjectTriggers().forEach(function(t) {
    if (t.getHandlerFunction() === 'generateEvery2DaysBody3DNote') {
      ScriptApp.deleteTrigger(t);
    }
  });
  ScriptApp.newTrigger('generateEvery2DaysBody3DNote')
    .timeBased()
    .everyDays(2)
    .atHour(8)
    .create();
}
