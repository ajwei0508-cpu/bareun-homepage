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
