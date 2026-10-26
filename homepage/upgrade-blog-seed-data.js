/**
 * 바른한의원 대전본점 · 의학백과 정식 블로그 전환 & AI-SEO / 글로벌 검색 고도화 빌더
 * - 기존 9대 부위 의학백과(BODY_PARTS)를 9편의 '공식 의학백과 마스터 블로그 포스트'로 정식 전환
 * - 기존 27편의 심층 임상 칼럼과 통합하여 총 36편의 정식 검색엔진 노출용 블로그 데이터 구축
 * - 국내(네이버·다음) 및 해외·글로벌 AI 플랫폼(Google, Bing, ChatGPT, Perplexity) 동시 최적화:
 *   1) 고유 영문 SEO 슬러그(slug) 부여
 *   2) AI 핵심 3줄 즉답 요약(TL;DR)
 *   3) 영문 의학 초록(Global Clinical Summary - EN)
 *   4) 시맨틱 임상 비교표(<table>)
 *   5) 다빈도 Q&A(FAQ) 및 JSON-LD(MedicalWebPage + Physician + MedicalClinic + FAQPage)
 */
const fs = require('fs');
const path = require('path');

const seedPath = path.join(__dirname, 'disease-blog-seed-data.js');
const explorerBuilderPath = path.join(__dirname, 'build-body-explorer.js');

const { DISEASE_BLOG_CATEGORIES, INITIAL_DISEASE_BLOG_POSTS } = require(seedPath);

const bodyPartsJsonPath = path.join(__dirname, 'body-parts-source.json');
let BODY_PARTS;
if (fs.existsSync(bodyPartsJsonPath)) {
  BODY_PARTS = JSON.parse(fs.readFileSync(bodyPartsJsonPath, 'utf8'));
} else {
  const explorerSrc = fs.readFileSync(explorerBuilderPath, 'utf8');
  const startMarker = 'const BODY_PARTS = [';
  const endMarker = '\nfunction buildBodyExplorerHtml()';
  const sIdx = explorerSrc.indexOf(startMarker);
  const eIdx = explorerSrc.indexOf(endMarker);
  if (sIdx === -1 || eIdx === -1) {
    throw new Error('Could not locate BODY_PARTS in build-body-explorer.js');
  }
  const bodyPartsCode = explorerSrc.slice(sIdx + 'const BODY_PARTS = '.length, eIdx).trim().replace(/;$/, '');
  BODY_PARTS = Function('"use strict"; return (' + bodyPartsCode + ');')();
  fs.writeFileSync(bodyPartsJsonPath, JSON.stringify(BODY_PARTS, null, 2), 'utf8');
}

// English SEO & Global Medical Metadata per 9 Encyclopedia Parts + 27 Clinical Posts
const ENCYCLOPEDIA_GLOBAL_META = {
  knee: {
    slug: 'daejeon-pediatric-growth-plate-obesity-immunity-encyclopedia',
    badge: '📘 공식 의학백과 · 소아성장·비만·면역',
    heroImg: 'illust_knee_growth_care.jpg',
    subImg: 'director_exam_card9_growth_check.jpg',
    enTitle: 'Pediatric Epiphyseal Growth Plate, Childhood Obesity & Mucosal Immunity — Clinical Encyclopedia',
    enSummary: 'Comprehensive Korean Medicine clinical guide by Dr. Jung-Wi Ahn at Bareun Korean Medicine Clinic (Daejeon, South Korea). Evaluates delayed linear growth, childhood obesity-induced early ossification (precocious puberty risk), and chronic rhinitis mouth-breathing via radiation-free growth plate ultrasound, InBody body composition, and ENT endoscopy, restoring height potential with pediatric Chuna manual therapy and safe herbal medicine.',
    enKeywords: ['Pediatric Growth Clinic Korea', 'Epiphyseal Plate Ultrasound', 'Childhood Obesity Precocious Puberty', 'Pediatric Chuna Daejeon', 'IGF-1 Sleep Growth'],
    examHighlight: '⑨ 소아·청소년 성장 검사(성장판·골연령) · ⑤ 체지방·체성분 검사(소아비만) · ③ 이비인후 내시경(코점막·구강호흡)',
    therapyHighlight: '안정위 대표원장 소아 성장·체형 추나 · 비위·폐 면역 및 소아비만 감량 한약 · 무통 소노(초음파)·자기장·IR·핫팩',
    tldr: [
      '핵심 원인: 잦은 감기·비염(구강호흡으로 인한 서파수면 저하)과 소아비만(렙틴 과다로 인한 성장판 조기 골화)이 아이의 최종 성인 키를 가로막는 양대 핵심 원인입니다.',
      '정밀 검진: 무방사선 소아 성장판·골연령 검사, 체지방·체성분 분석, 이비인후 코점막 내시경 및 1:1 진맥으로 숨은 키 저하 원인을 정밀하게 검사하고 진단합니다.',
      '맞춤 치료: 성호르몬 자극 우려 없는 원내 직영 맞춤 한약과 대표원장 직접 소아 성장 추나, 소노·자기장·IR 물리치료로 면역력과 바른 키 성장을 함께 회복합니다.'
    ],
    tableRows: [
      ['잦은 감기·비염 & 구강호흡', '이비인후 내시경 · 적외선 체열(DITI)', '호흡기 점막 한약 · 비강 IR·소노 케어', '기상 직후 미온수 · 침실 습도 50% 유지'],
      ['소아비만 & 빠른 뼈나이(성조숙 우려)', '체지방·체성분(InBody) · 성장판·골연령 검사', '소아비만 습열 감량 한약 · 심부 자기장', '야간 당분·일회용 용기 제한 · 밤 10시 소등'],
      ['거북목 · 골반 틀어짐 (숨은 키 손실)', '근골격 정밀 초음파 · 체열 밸런스 검사', '대표원장 1:1 소아 체형 추나 · ICT 이완', '독서대 사용 · 매일 15분 줄넘기 점프 운동']
    ],
    faqs: [
      {
        q: '성장 한약을 먹으면 살이 찌거나 사춘기(성조숙증)가 빨라지지 않나요?',
        a: '바른한의원은 성호르몬을 자극하는 성분을 배제하고 체지방·체성분 및 성장판·골연령 검사를 바탕으로 처방합니다. 특히 소아비만 아이는 체지방과 습열을 먼저 비워 조기 골화를 늦추도록 안전하게 도움드립니다.'
      },
      {
        q: '소아 성장 검사와 추나 치료는 몇 살부터 받을 수 있나요?',
        a: '무방사선 초음파 성장 검사와 부드러운 소아 성장 추나는 통증이나 방사선 부담이 없어 유아기·초등 저학년부터 청소년기까지 안심하고 검사하며 숨은 키를 회복합니다.'
      }
    ]
  },
  cervical: {
    slug: 'daejeon-cervical-spine-scalp-heat-hairloss-encyclopedia',
    badge: '📘 공식 의학백과 · 탈모·두피열·경추',
    heroImg: 'illust_cervical_hairloss.jpg',
    subImg: 'director_exam_card2_thermography.jpg',
    enTitle: 'Cervical Alignment, Scalp Hyperthermia & Hair Follicle Regeneration — Clinical Encyclopedia',
    enSummary: 'Evidence-based integrative alopecia and cervical spine guide by Dr. Jung-Wi Ahn at Bareun Korean Medicine Clinic (Daejeon, South Korea). Diagnoses scalp desertion (upper-body heat accumulation), forward head posture vascular bottleneck, alopecia areata, and female pattern hair loss using DITI infrared thermography and HRV autonomic testing, restoring dermal papilla vitality without hormonal side effects.',
    enKeywords: ['Scalp Heat Hair Loss Korea', 'Alopecia Areata Integrative Care', 'Cervical Chuna Therapy', 'DITI Scalp Thermography', 'Dermal Papilla Regeneration'],
    examHighlight: '② 적외선 체열진단기 DITI(두피열·상열하한) · ① 경추 심부근막 초음파 · ⑥ 자율신경·스트레스 검사(HRV)',
    therapyHighlight: '안정위 원장 상부 경추 감압 추나 · 고농축 모낭 재생 약침 · 수승화강 청열·보혈 한약 · 소노·ICT·극초단파',
    tldr: [
      '핵심 원인: 만성 거북목으로 뒷목 혈관이 조여지고 스트레스 열이 정수리에 고이는 상열하한(두피 사막화) 현상이 모낭 모유두 세포를 약화시켜 탈모를 가속화합니다.',
      '정밀 검진: 적외선 체열진단기(DITI) 두피열 촬영, 자율신경(HRV) 스트레스 검사, 경추 초음파로 모근 약화 원인을 객관적으로 검사하고 진단합니다.',
      '맞춤 치료: 호르몬 억제 부작용 걱정 없는 수승화강 청열 한약과 대표원장 상부 경추 추나, 두피 약침, 소노·ICT 치료로 두피 온도를 낮추고 모근 자생력을 회복합니다.'
    ],
    tableRows: [
      ['정수리·M자 열성 탈모 & 거북목', '적외선 체열진단(DITI) · 경추 초음파', '수승화강 청열 한약 · 상부 경추 감압 추나', '저녁 미온수 샴푸 · 찬 바람 완전 건조'],
      ['원형탈모 & 여성 정수리·산후 탈모', '자율신경(HRV) · 말초혈관(APG) · 체질검사', '자가면역·보혈 한약 · 두피 진피 약침 · 자기장', '취침 전 15분 족욕 · 밤 11시 이전 숙면'],
      ['지루성 두피염 · 모낭염 & 뒷목 두통', 'DITI 열독 검사 · 상부 경추 분절 진단', '청열해독 한약 · 후두하근 추나·소노·핫팩', '기름진 야식·음주 중단 · 낮은 경추 베개']
    ],
    faqs: [
      {
        q: '기존 탈모약을 복용 중이거나 부작용이 걱정될 때도 한방 탈모 치료가 가능한가요?',
        a: '네, 인위적인 남성호르몬 억제 방식이 아니라 두피 열독을 식히고 경추 혈류를 여는 자생 치료이므로 남성·여성 모두 성기능 저하나 우울감 부담 없이 건강한 모근을 회복하도록 도움드립니다.'
      },
      {
        q: '목·어깨 결림과 편두통이 심한데 탈모와 함께 치료받을 수 있나요?',
        a: '굳어진 상부 경추(C1~C7) 근육은 두피로 올라가는 혈관과 신경을 동시에 누릅니다. 경추 감압 추나와 물리치료를 병행하면 뒷목 통증과 두피 혈류가 함께 회복됩니다.'
      }
    ]
  },
  lumbar: {
    slug: 'daejeon-lumbar-disc-pelvic-chuna-spine-encyclopedia',
    badge: '📘 공식 의학백과 · 척추·골반·추나',
    heroImg: 'illust_lumbar_pelvis.jpg',
    subImg: 'detail_chuna_pelvis.jpg',
    enTitle: 'Non-Surgical Lumbar Disc Decompression, Sciatica & Pelvic Chuna — Clinical Encyclopedia',
    enSummary: 'Non-surgical spine and joint rehabilitation guide by Dr. Jung-Wi Ahn at Bareun Korean Medicine Clinic (Daejeon, South Korea). Addresses lumbar herniated disc (L4-L5, L5-S1), spinal stenosis, sciatica, pelvic asymmetry, and traffic accident whiplash via musculoskeletal ultrasound and DITI thermography, combining JAMA-validated manual Chuna decompression, pharmacopuncture, and 6 physical therapies.',
    enKeywords: ['Lumbar Disc Chuna Korea', 'Non-Surgical Spine Decompression', 'Sciatica Piriformis Care', 'Pelvic Alignment Daejeon', 'Herbal Ligament Strengthening'],
    examHighlight: '① 근골격 정밀 초음파(인대·근막·추간공) · ② 적외선 체열진단기 DITI(하지 방사통·신경염증) · 골반·다리길이 계측',
    therapyHighlight: '안정위 원장 1:1 요추·골반 신경감압 추나 · 봉약침·정제 약침 · 두충·우슬 강근골 한약 · 6대 물리치료 전종',
    tldr: [
      '핵심 원인: 척추의 주춧돌인 골반(천장관절)이 기울어지면 하부 요추(L4-L5, L5-S1) 디스크 한쪽에 압력이 집중되어 진통제나 주사 후에도 통증과 다리 저림이 재발합니다.',
      '정밀 검진: 근골격 정밀 초음파와 적외선 체열진단기(DITI), 양다리 길이·골반 경사 계측으로 신경이 눌린 정확한 지점을 검사하고 진단합니다.',
      '맞춤 치료: 대표원장 1:1 수기 감압 추나와 신경 염증 약침, 심부 자기장·극초단파·소노 물리치료, 강근골 한약으로 비수술 척추 자생력을 회복합니다.'
    ],
    tableRows: [
      ['재발성 허리디스크 & 골반 비대칭', '근골격 초음파 · 골반 경사·다리길이 계측', '요추·골반 공간확보 감압 추나 · 강근골 한약', '아침 통나무 구르기 기상 · 다리 꼬기 금지'],
      ['엉덩이·다리 저림(좌골신경통·이상근)', 'DITI 하지 방사통 체열 · SLR 이학적 검사', '추간공 개방 추나 · 봉약침 · 심부 자기장·극초단파', '뒷주머니 지갑 빼기 · 둔부 온열 찜질'],
      ['퇴행성 디스크 · 척추관협착증', '척추 연부조직 초음파 · 체성분(골격근량)', '부드러운 이완 추나 · 보간신 한약 · IR·핫팩', '평지 바른 보행 30분 · 금연 및 미온수 섭취']
    ],
    faqs: [
      {
        q: '허리디스크가 터져서 다리가 저린데 수술 없이 추나와 한방 치료로 호전될 수 있나요?',
        a: '마비 증상이 동반된 응급 상황이 아니라면 허리디스크의 90% 이상은 비수술 보존 치료가 우선입니다. 좁아진 추간판 간격을 넓히는 감압 추나와 약침·한약으로 신경 부종 흡수를 적극 도움드립니다.'
      },
      {
        q: '추나요법은 건강보험(실손) 적용이 되나요?',
        a: '네, 한의원 수기 추나요법은 건강보험 급여 항목으로 본인부담금이 낮으며, 가입하신 실손의료보험 약관에 따라 혜택 적용도 가능하여 경제적 부담을 덜어드립니다.'
      }
    ]
  },
  gongjindan: {
    slug: 'daejeon-emperor-gongjindan-chronic-fatigue-brain-encyclopedia',
    badge: '📘 공식 의학백과 · 만성피로·황제공진단',
    heroImg: 'illust_gongjindan_heart_brain.jpg',
    subImg: 'director_exam_card8_vascular_toxin.jpg',
    enTitle: 'Emperor Gongjindan (CITES Authentic Musk L-Muscone), Brain-Heart Circulation & Chronic Fatigue — Encyclopedia',
    enSummary: 'Authoritative clinical guide on authentic Emperor Gongjindan by Dr. Jung-Wi Ahn at Bareun Korean Medicine Clinic (Daejeon, South Korea). Explains how MFDS/CITES-certified natural musk (L-Muscone) crosses the blood-brain barrier (BBB) to upregulate BDNF, relieve brain fog and chronic burnout, and protect cardiovascular vitality, verified safely with liver/endocrine blood panels and APG vascular diagnostics.',
    enKeywords: ['Authentic Gongjindan Korea', 'CITES Musk L-Muscone BDNF', 'Chronic Fatigue Brain Fog', 'Korean Royal Herbal Tonic', 'Daejeon Bareun Clinic'],
    examHighlight: '④ 사상체질 & 眞장부맥학 진맥 · ⑧ 말초 혈관 상태 검사(APG) · ⑦ 내분비·간(AST/ALT) 및 당 안전성 검사',
    therapyHighlight: '식약처 CITES 정품 사향 황제공진단 대표원장 직접 정량 수제 제환 · 원내 직영 맞춤 보약 · 총명·보원 약침',
    tldr: [
      '핵심 기전: 식약처 CITES 인증 정품 사향의 주성분 L-무스콘(L-Muscone)은 뇌혈관장벽(BBB)을 직접 통과해 뇌혈류를 늘리고 뇌신경 영양인자(BDNF)를 깨워 만성 번아웃과 브레인 포그를 해소합니다.',
      '정밀 검진: 말초 혈관(APG) 검사, 자율신경(HRV) 검사, 원내 간·당 수치 안전성 검사 및 1:1 진맥으로 원기 고갈도와 장부 안전성을 정밀하게 검사하고 진단합니다.',
      '맞춤 조제: 보존제 없이 최상급 러시아산 녹용 분골과 정품 사향을 안정위 대표원장이 직접 정량 수제 조제하여 뇌·심장 기혈 순환과 깊은 활력을 회복합니다.'
    ],
    tableRows: [
      ['만성 번아웃 · 브레인 포그 · 기억력 저하', '자율신경(HRV) · 말초혈관(APG) · 진맥', 'CITES 정품 사향 황제공진단 · 두경부 약침', '아침 공복 미온수와 1~2분 천천히 씹어 복용'],
      ['수험생 집중력 · 중요 발표·시험 긴장', 'HRV 스트레스 지수 · 사상체질 정밀 검사', '수승화강 맞춤 공진단 · 상부 경추 이완 추나', '복용 전후 1시간 커피·녹차·녹두 제한'],
      ['부모님 기력·혈관 노화 · 수술 후 회복', '내분비·간(AST/ALT)·당 검사 · APG 혈관검사', '99.9% 순금박 수제 황제공진단 · 온열 물리케어', '냉장 보관 후 복용 15분 전 실온 상태 섭취']
    ],
    faqs: [
      {
        q: '시중의 일반 유사 공진단(침향단·목향단)과 정품 사향 황제공진단은 무엇이 다른가요?',
        a: '공진단 효능의 핵심 80% 이상을 차지하는 뇌혈관장벽 투과 및 기혈 개통 작용은 오직 식약처 CITES 인증 천연 사향(L-무스콘)에서만 나타납니다. 원장이 직접 정량 수제 조제하여 확실한 기력 충전을 도움드립니다.'
      },
      {
        q: '간 수치가 걱정되거나 혈압·당뇨 약을 복용 중인데 공진단을 먹어도 되나요?',
        a: '원내에 구비된 내분비·간(AST/ALT) 및 당 수치 혈액 검사 장비로 복용 전 장부 안전성을 직접 검사하고 체질에 맞게 복용 주기를 진단하므로 안심하고 드실 수 있습니다.'
      }
    ]
  },
  syncope: {
    slug: 'daejeon-autonomic-nerve-headache-vertigo-syncope-encyclopedia',
    badge: '📘 공식 의학백과 · 자율신경·두통·실신',
    heroImg: 'illust_syncope_autonomic.jpg',
    subImg: 'director_exam_card6_autonomic_hrv.jpg',
    enTitle: 'Autonomic Nervous System Dysfunction, Vasovagal Syncope, Migraine, Vertigo & Insomnia — Encyclopedia',
    enSummary: 'Specialized neuro-autonomic clinical guide by Dr. Jung-Wi Ahn at Bareun Korean Medicine Clinic (Daejeon, South Korea). Investigates MRI-normal chronic migraine, cervicogenic dizziness/vertigo, chronic insomnia, and recurrent vasovagal syncope via Heart Rate Variability (HRV), APG pulse wave, ENT endoscopy, and DITI thermography, restoring brainstem-vagus nerve equilibrium with C1-C2 upper cervical Chuna and herbal therapy.',
    enKeywords: ['Vasovagal Syncope Treatment Korea', 'Autonomic Dysfunction HRV Clinic', 'Upper Cervical Chuna Migraine', 'Vertigo Insomnia Korean Medicine', 'Daejeon Bareun Clinic'],
    examHighlight: '⑥ 자율신경·스트레스 검사(HRV) · ⑧ 말초 혈관 검사(APG) · ③ 이비인후 내시경(전정·내이) · ② 체열진단(DITI)',
    therapyHighlight: '안정위 원장 상부 경추(C1-C2)·두개천골·흉곽 추나 · 자율신경·안신·두풍 맞춤 한약 · 자기장·소노·IR·핫팩',
    tldr: [
      '핵심 원인: 뇌 MRI와 심전도가 정상인데도 반복되는 편두통, 어지럼증, 불면증, 미주신경성 실신은 상부 경추(C1-C2) 압박과 교감·부교감 자율신경 반사 오류에서 비롯됩니다.',
      '정밀 검진: 심박변이도(HRV) 자율신경 검사, 말초 혈관(APG) 수축 검사, 이비인후 내시경, 체열진단기(DITI)로 신경계 불균형을 정량적으로 검사하고 진단합니다.',
      '맞춤 치료: 추골동맥과 미주신경 통로를 여는 대표원장 상부 경추 추나와 무의존성 자율신경 맞춤 한약, 심부 온열 물리치료로 맑은 뇌혈류와 자연 숙면을 회복합니다.'
    ],
    tableRows: [
      ['미주신경성 실신 & 기립성 어지럼증', '자율신경(HRV) · 말초혈관 탄력(APG)', '심기(心氣)·혈관탄력 한약 · 미주신경 경추 추나', '전조 시 즉시 쪼그려 앉기 · 다리 교차 힘주기'],
      ['MRI 정상 만성 편두통 & 현훈·이석 후유증', '이비인후 내시경 · 상부 경추 초음파 · DITI', 'C1-C2 상부 경추 감압 추나 · 청열거풍 한약 · 소노', '3단계 천천히 기상 · 까치발 종아리 펌프 운동'],
      ['만성 불면증 · 가슴 두근거림 · 화병', 'HRV 교감신경 각성도 · DITI 심열 촬영', '무의존성 안신(安神) 한약 · 흉곽·횡격막 추나', '오후 카페인 차단 · 취침 전 4-7-8 복식호흡']
    ],
    faqs: [
      {
        q: '대학병원 뇌 MRI와 심장 검사에서 정상이라는데 왜 자꾸 어지럽고 쓰러질 것 같나요?',
        a: '구조적 출혈이나 종양이 없어도 뇌혈류를 실시간 조절하는 자율신경 센서와 상부 경추 혈류 통로가 막히면 증상이 반복됩니다. HRV·APG 기능 검사로 숨은 원인을 정확히 진단합니다.'
      },
      {
        q: '수면제나 신경안정제를 오래 복용 중인데 한방 치료로 서서히 줄일 수 있나요?',
        a: '갑작스러운 단약 대신 교감신경 과열(심열)을 식히는 안신 한약과 추나 치료로 자가 수면 리듬을 먼저 회복하면서 안전하게 의존도를 낮추도록 도움드립니다.'
      }
    ]
  },
  digest: {
    slug: 'daejeon-damjeok-indigestion-reflux-ibs-digestive-encyclopedia',
    badge: '📘 공식 의학백과 · 소화·위장·담적해독',
    heroImg: 'illust_gut_metabolism.jpg',
    subImg: 'director_exam_card1_ultrasound.jpg',
    enTitle: 'Damjeok Syndrome (Functional Dyspepsia), Acid Reflux (GERD) & Irritable Bowel Gut-Brain Care — Encyclopedia',
    enSummary: 'Integrative gastroenterology clinical guide by Dr. Jung-Wi Ahn at Bareun Korean Medicine Clinic (Daejeon, South Korea). Examines endoscopy-normal epigastric hardening (Damjeok syndrome), delayed gastric emptying, refractory GERD/globus pharyngeus, and IBS using abdominal ultrasound, DITI visceral thermography, and HRV gut-brain axis diagnostics, restoring smooth muscle motility with deep microwave diathermy and custom herbal medicine.',
    enKeywords: ['Damjeok Syndrome Korea', 'Functional Dyspepsia Gastric Motility', 'Reflux Esophagitis Globus Care', 'Irritable Bowel Gut-Brain Axis', 'Abdominal Ultrasound Korean Medicine'],
    examHighlight: '① 오장육부 복부 정밀 초음파(위 배출·가스) · ② 적외선 체열진단기 DITI(복부 냉증) · ③ 인후두 내시경 · 복진·진맥',
    therapyHighlight: '원내 직영 담적 용해 & 점막 재생 한약 · 대표원장 내장기·횡격막 추나 & 중완 약침 · 복부 극초단파·자기장·소노·핫팩',
    tldr: [
      '핵심 원인: 내시경은 안쪽 점막만 볼 뿐, 위장 바깥 근육층이 독소로 굳어 연동운동이 멈춘 ‘담적병(痰積病)’과 장-뇌 자율신경 과민이 만성 체기·역류·복통의 뿌리입니다.',
      '정밀 검진: 오장육부 복부 초음파, 적외선 체열진단기(DITI), 인후두 내시경 및 대표원장 복진·진맥으로 위장 경화도와 복부 냉증을 세밀하게 검사하고 진단합니다.',
      '맞춤 치료: 굳은 위장 외벽을 녹이는 맞춤 담적 한약과 복부 심부 극초단파·자기장 온열 치료, 내장기 추나로 약을 끊어도 재발 없는 소화 자생력을 회복합니다.'
    ],
    tableRows: [
      ['내시경 정상 명치 답답함 · 담적병', '복부 정밀 초음파 · DITI 복부 체열 · 복진', '발효 담적 용해 한약 · 극초단파 심부온열 · 약침', '한 입 30번 씹기 · 식중 물·국물 섭취 줄이기'],
      ['재발성 역류성식도염 & 목 이물감(매핵기)', '이비인후 인후두 내시경 · 복부 초음파 · HRV', '위 배출 촉진·점막보호 한약 · 횡격막 감압 추나', '취침 3시간 전 금식 · 식후 15분 가벼운 산책'],
      ['과민성대장증후군 (긴장성 설사·변비·가스)', 'DITI 하복부 냉증 · HRV 장-뇌 자율신경 검사', '온장(溫腸)·점막장벽 한약 · 골반 자율신경 추나', '찬 음료·밀가루 제한 · 저녁 배꼽 온열 마사지']
    ],
    faqs: [
      {
        q: '위내시경에서는 가벼운 위염뿐이라는데 왜 명치를 누르면 돌처럼 딱딱하고 아픈가요?',
        a: '위 점막 너머의 위장 외벽 평활근 층에 미소화 노폐물이 쌓여 굳어진 담적 상태이기 때문입니다. 복부 초음파와 복진으로 경화 범위를 검사하고 부드럽게 풀어 회복합니다.'
      },
      {
        q: '위산억제제(제산제)를 끊으면 바로 신물이 올라오는데 한방 치료와 병행 가능한가요?',
        a: '네, 초기에는 불편감을 관리하면서 위장 배출 속도와 하부식도괄약근 탄력을 함께 키워 위 내압을 낮추므로 자연스럽게 약 의존에서 벗어나도록 도움드립니다.'
      }
    ]
  },
  gut: {
    slug: 'daejeon-metabolic-detox-visceral-fat-diet-zero-encyclopedia',
    badge: '📘 공식 의학백과 · 대사·복부비만다이어트',
    heroImg: 'detail_diet_story5_fitting_room_smile.jpg',
    subImg: 'director_exam_card5_bodyfat_inbody.jpg',
    enTitle: 'Metabolic Detoxification, Visceral Fat Reduction & Appetite-Zero Safe Herbal Diet — Clinical Encyclopedia',
    enSummary: 'Safe medical weight management encyclopedia by Dr. Jung-Wi Ahn at Bareun Korean Medicine Clinic (Daejeon, South Korea). Targets adult visceral obesity, leptin resistance, metabolic syndrome, and edema obesity by verifying InBody extracellular water/visceral fat and AST/ALT liver & glucose panels before and after treatment, activating brown adipose tissue (BAT) thermogenesis without palpitations or muscle loss.',
    enKeywords: ['Safe Herbal Diet Korea', 'Visceral Fat Brown Adipose Tissue', 'Leptin Resistance Appetite Control', 'Liver Safe Weight Loss Daejeon', 'Postpartum Edema Diet'],
    examHighlight: '⑤ 체지방·체성분 검사(내장지방·골격근·부종지수) · ⑦ 내분비·간(AST/ALT)·당 수치 검사 · ④ 사상체질 정밀 검사',
    therapyHighlight: '손 떨림·불면 없는 식욕ZERO 대사 한약(간 수치 검증) · 복부 심부 극초단파·자기장·소노·ICT · 골반·림프 교정 추나',
    tldr: [
      '핵심 원인: 무작정 굶는 절식은 근육과 기초대사량만 깎아내릴 뿐, 간 해독 정체·렙틴 저항성(가짜 배고픔)·림프 부종을 해결해야 복부 내장지방이 빠집니다.',
      '정밀 검진: 체지방·체성분(내장지방·부종지수) 검사와 원내 내분비·간(AST/ALT)·당 혈액 검사, 사상체질 검사로 살찌는 대사 원인과 간 안전성을 정확히 검사하고 진단합니다.',
      '맞춤 치료: 심장 두근거림 없이 포만감을 깨우는 식욕ZERO 맞춤 한약과 복부 심부 극초단파·자기장·추나 치료로 근육은 지키고 순수 내장지방만 건강하게 회복합니다.'
    ],
    tableRows: [
      ['굶어도 안 빠지는 복부·내장비만 & 야식 폭식', '체성분(내장지방) · 사상체질 · HRV 검사', '식욕ZERO 갈색지방 활성화 한약 · 산삼비만약침', '채소→단백질→탄수화물 식사법 · 12시간 야간공복'],
      ['고혈당·지방간·간 수치 동반 대사형 비만', '내분비·간(AST/ALT)·혈당·당화혈색소 검사', '간 해독 검증 안심 한약 · 복부 극초단파·자기장', '액상과당·야간 맥주 중단 · 식후 15분 보행'],
      ['아침 얼굴·하체 부종형 비만 & 산후비만', '세포외수분(부종지수) · DITI 냉증 · APG 검사', '이수(利水) 림프 해독 한약 · 골반 교정 추나 · ICT', '국물 저염식 · 미온수 8잔 · 서혜부 림프 스트레칭']
    ],
    faqs: [
      {
        q: '다이어트 한약을 먹으면 가슴이 두근거리거나 잠이 안 오고 간 수치가 올라가지 않나요?',
        a: '바른한의원은 교감신경을 무리하게 흥분시키는 처방 대신 체질별 포만감 회로를 회복하며, 원내 간·당 혈액 분석기로 복용 전후 AST/ALT 수치를 직접 검사하여 안전하게 도움드립니다.'
      },
      {
        q: '감량 후 요요 현상을 막으려면 어떻게 관리하나요?',
        a: '체수분과 골격근을 지키는 순수 체지방 중심 감량과 갈색지방 기초대사 화로 활성화, 거꾸로 식사 루틴 설계를 통해 감량 체중이 안정적으로 정착되도록 회복합니다.'
      }
    ]
  },
  uterus: {
    slug: 'daejeon-uterine-fertility-ivf-menstrual-postpartum-encyclopedia',
    badge: '📘 공식 의학백과 · 여성·생리통·난임',
    heroImg: 'illust_uterus_fertility.jpg',
    subImg: 'director_exam_card2_thermography.jpg',
    enTitle: 'Uterine Endometrial Receptivity (IVF Support), Dysmenorrhea, Postpartum & Menopause Care — Encyclopedia',
    enSummary: 'Comprehensive women’s health and fertility encyclopedia by Dr. Jung-Wi Ahn at Bareun Korean Medicine Clinic (Daejeon, South Korea). Enhances thin endometrium and IVF/IUI implantation rates (LIF/Integrin expression), resolves severe menstrual cramps (pelvic blood stasis), postpartum joint wind, and climacteric syndrome through DITI pelvic thermography, ultrasound, pelvic Chuna, and toxin-screened herbal prescriptions.',
    enKeywords: ['IVF Fertility Herbal Support Korea', 'Endometrial Receptivity Thin Lining', 'Severe Dysmenorrhea Pelvic Chuna', 'Postpartum Herbal Care Daejeon', 'Menopause Autonomic Clinic'],
    examHighlight: '② 적외선 체열진단기 DITI(하복부·자궁 냉증·상열감) · ① 하복부·골반 초음파 · ⑧ 혈관 어혈(APG) · ⑦ 내분비 검사',
    therapyHighlight: '원내 직영 보궁(補宮)·착상·산후·갱년기 안심 한약 · 대표원장 골반·천골 교정 추나 · 자궁 심부 극초단파·자기장·핫팩',
    tldr: [
      '핵심 원인: 하복부 심부 냉증(궁한)과 틀어진 골반 내 어혈 정체는 자궁내막을 얇게 만들어 난임 착상을 방해하고 극심한 생리통·산후풍을 유발합니다.',
      '정밀 검진: 적외선 체열진단기(DITI) 자궁 온도 촬영, 하복부 초음파, 말초 혈관(APG) 및 내분비 안전성 검사로 자궁·난소 혈류 환경을 세밀하게 검사하고 진단합니다.',
      '맞춤 치료: SCI급 논문으로 입증된 단계별 보궁·착상·산후 한약과 골반 추나, 극초단파·자기장 심부 온열 치료로 따뜻하고 튼튼한 자궁 건강을 회복합니다.'
    ],
    tableRows: [
      ['난임 · 시험관(IVF)·인공수정 착상 준비', 'DITI 하복부 온도 · APG 혈관 · 내분비 검사', '3단계 보궁·착상·안태 한약 · 자궁 심부 극초단파', '하복부·발목(삼음교) 보온 · 부부 동반 숙면'],
      ['진통제 의존 극심한 생리통 & 생리불순', '하복부·골반 초음파 · DITI · 어혈 검사', '골반·천골 감압 추나 · 조경화어 한약 · 심부 자기장', '플라스틱 용기 차단 · 취침 전 나비 자세 스트레칭'],
      ['출산 후 산후풍·골반통 & 여성 갱년기', 'DITI 체열 분포 · HRV 자율신경 · 체성분 검사', '모유수유 안심 산후보약 · 갱년기 청열보음 한약', '산후 100일 냉기 차단 · 석류·검은콩·낮 산책']
    ],
    faqs: [
      {
        q: '산부인과 시험관(IVF) 시술 일정과 한방 착상 치료를 어떻게 병행하나요?',
        a: '난자 채취 전에는 난소 기능과 난자 질 개선에 집중하고, 배아 이식 준비기에는 내막 두께와 혈류를 높이며, 이식 후에는 자궁 수축을 줄이는 안태 처방으로 시술 주기에 맞춰 정교하게 도움드립니다.'
      },
      {
        q: '출산 직후 모유 수유 중인데 산후보약을 복용해도 아기에게 안전한가요?',
        a: '식약처 잔류농약·중금속 무독성 검사를 통과한 엄선된 한약재만 원내 직영 탕전하며, 모유 이행 안전성이 검증된 약재로 처방하여 산모 회복과 모유 질 향상을 함께 회복합니다.'
      }
    ]
  },
  prostate: {
    slug: 'daejeon-prostate-urinary-incontinence-male-vitality-encyclopedia',
    badge: '📘 공식 의학백과 · 전립선·요실금·활력',
    heroImg: 'illust_prostate_care.jpg',
    subImg: 'prostate_minimal_card6_pelvic_chuna_care.jpg',
    enTitle: 'Benign Prostatic Hyperplasia, Chronic Prostatitis (CP/CPPS), Urinary Incontinence & Vitality — Encyclopedia',
    enSummary: 'Private 1:1 urological and pelvic rehabilitation encyclopedia by Dr. Jung-Wi Ahn at Bareun Korean Medicine Clinic (Daejeon, South Korea). Treats nocturia, BPH urethral compression, stress/urge urinary incontinence, non-bacterial chronic pelvic pain syndrome (CP/CPPS), and male andropause using bladder/pelvic ultrasound, DITI thermography, clothed deep magnetic pelvic floor stimulation, pelvic Chuna, and herbal medicine.',
    enKeywords: ['Prostate BPH Non-Surgical Korea', 'Chronic Prostatitis Pelvic Chuna', 'Urinary Incontinence Magnetic Therapy', 'Nocturia Bladder Strengthening', 'Male Vitality Clinic Daejeon'],
    examHighlight: '① 하복부·방광·골반 정밀 초음파 · ② 적외선 체열진단기 DITI(하초 냉증·골반울혈) · ⑧ 말초혈관(APG) · 1:1 진맥',
    therapyHighlight: '1:1 독립 진료실 골반·천골 추나 & 회음·관원 약침 · 전립선 감압·요실금 축천(縮泉) 한약 · 심부 자기장·극초단파',
    tldr: [
      '핵심 원인: 전립선 울혈·비대로 인한 요도 압박과 방광 괄약근·골반저근 약화, 그리고 골반 비틀림에 의한 음부신경 압박이 야간뇨·요실금·만성 골반통의 핵심 원인입니다.',
      '정밀 검진: 1:1 독립 프라이빗 진료실에서 하복부·방광 초음파, 적외선 체열진단기(DITI), 말초 혈관(APG) 검사 및 진맥으로 하초 기능을 정밀하게 검사하고 진단합니다.',
      '맞춤 치료: 옷을 입은 채 골반저근을 강화하는 심부 자기장·극초단파 치료와 골반 추나, 전립선 감압·방광 온양 한약으로 시원한 배뇨와 통잠, 활력을 회복합니다.'
    ],
    tableRows: [
      ['전립선비대 · 새벽 야간뇨 · 복압/절박 요실금', '방광·하복부 초음파 · DITI 하초 냉증 검사', '전립선 감압·축천 한약 · 골반저 심부 자기장·극초단파', '저녁 7시 이후 수분·커피 제한 · 온수 좌욕 & 케겔'],
      ['항생제 불응성 만성 전립선염 · 회음부 통증', '골반 초음파 · DITI 울혈 촬영 · HRV 검사', '1:1 골반·천골 감압 추나 · 정제 약침 · 청열거어 한약', '50분마다 기립 보행 · 도넛 방석 · 자전거 안장 주의'],
      ['남성 갱년기 피로 · 하체 냉증 · 활력 저하', '말초혈관 탄력(APG) · 내분비·간·당 안전성 검사', '원내 직영 보신익정 한약 · 수제 공진단 · 온열 약침', '익힌 토마토(라이코펜)·아연 섭취 · 매일 스쿼트 30회']
    ],
    faqs: [
      {
        q: '요실금·전립선 진료나 물리치료를 받을 때 탈의가 필요하거나 민망하지 않나요?',
        a: '1:1 독립 진료실에서 대표원장이 프라이빗하게 진료하며, 골반저근 강화 심부 자기장 치료 역시 평상복을 입은 채 편안히 의자에 앉아 진행되어 부담 없이 회복을 도움드립니다.'
      },
      {
        q: '소변 균 검사에서 정상인데 회음부와 아랫배가 계속 뻐근한 이유도 치료되나요?',
        a: '만성 전립선염의 90% 이상은 세균이 아닌 골반 틀어짐과 골반저 근육 울혈(만성골반통증증후군)입니다. 골반 추나와 약침·극초단파 치료로 구조적 압박을 풀어 근본 회복합니다.'
      }
    ]
  }
};

// Map clean English SEO slugs & concise English abstracts for the 27 clinical posts
const CLINICAL_POST_SEO_META = {
  'knee-post-1': {
    slug: 'daejeon-child-rhinitis-mouth-breathing-growth-plate-care',
    enTitle: 'How Chronic Rhinitis & Mouth Breathing Delay Pediatric Height Growth (IGF-1 & Slow-Wave Sleep)',
    enSummary: 'Explains why recurrent pediatric respiratory infections and nocturnal mouth breathing suppress hepatic IGF-1 conversion and deep slow-wave sleep growth hormone secretion, and how ENT endoscopy, safe herbal immunity therapy, and pediatric Chuna restore linear growth.'
  },
  'knee-post-2': {
    slug: 'daejeon-childhood-obesity-bone-age-precocious-puberty-care',
    enTitle: 'Childhood Obesity & Accelerated Bone Age: Protecting Open Growth Plates Before Early Closure',
    enSummary: 'Clinical protocol for overweight children with advanced bone age and precocious puberty risk, combining InBody fat analysis, radiation-free growth plate ultrasound, and leptin-modulating herbal medicine without crash dieting.'
  },
  'knee-post-3': {
    slug: 'daejeon-youth-turtle-neck-pelvic-asymmetry-growth-chuna',
    enTitle: 'Forward Head Posture & Pelvic Tilt in Children: Restoring Hidden Height with Pediatric Chuna',
    enSummary: 'Demonstrates how smartphone-induced turtle neck and pelvic asymmetry compress knee epiphyseal plates unevenly, and how gentle pediatric Chuna manual therapy recovers hidden spinal height.'
  },
  'cervical-post-1': {
    slug: 'daejeon-scalp-heat-turtle-neck-hair-loss-recovery',
    enTitle: 'Scalp Hyperthermia (“Scalp Desertion”) & Forward Head Posture: Root Cause of Thinning Hair',
    enSummary: 'Examines how cervical muscle stiffness restricts cranial blood flow and traps upper-body heat above 38°C, accelerating dermal papilla apoptosis, treated with DITI thermography, cervical Chuna, and cooling herbal medicine.'
  },
  'cervical-post-2': {
    slug: 'daejeon-alopecia-areata-female-hairline-immune-care',
    enTitle: 'Alopecia Areata & Female Parting Hair Loss: Autonomic & Autoimmune Follicle Restoration Without Steroids',
    enSummary: 'Addresses coin-shaped alopecia areata and diffuse female hair thinning by restoring follicle immune privilege, HRV autonomic balance, and Wnt/beta-catenin signaling via dermal pharmacopuncture and blood-nourishing herbs.'
  },
  'cervical-post-3': {
    slug: 'daejeon-seborrheic-scalp-dermatitis-cervical-headache-care',
    enTitle: 'Chronic Seborrheic Scalp Dermatitis, Folliculitis & Cervicogenic Headache: Dual Decompression Therapy',
    enSummary: 'Resolves recurrent scalp erythema, pustular folliculitis, and occipital headaches simultaneously through upper cervical C1-C3 decompression Chuna and anti-inflammatory herbal detoxification.'
  },
  'lumbar-post-1': {
    slug: 'daejeon-lumbar-disc-relapse-pelvic-chuna-decompression',
    enTitle: 'Why Lumbar Disc Pain Relapses After Injections: Correcting the Pelvic Foundation with Chuna',
    enSummary: 'Details why nerve blocks alone fail when sacroiliac pelvic tilt asymmetrically loads L4-L5 and L5-S1 discs, and how JAMA-backed manual Chuna decompression and ligament-strengthening herbs prevent relapse.'
  },
  'lumbar-post-2': {
    slug: 'daejeon-sciatica-leg-numbness-disc-vs-piriformis-care',
    enTitle: 'Radiating Buttock & Leg Numbness (Sciatica): Differentiating Lumbar Disc vs. Piriformis Syndrome',
    enSummary: 'Uses musculoskeletal ultrasound and DITI thermography to pinpoint dual sciatic nerve entrapment at the lumbar foramen and deep piriformis muscle, treated non-surgically with Chuna, bee-venom pharmacopuncture, and magnetic therapy.'
  },
  'lumbar-post-3': {
    slug: 'daejeon-degenerative-disc-spinal-stenosis-herbal-care',
    enTitle: 'Rehydrating Aging Intervertebral Discs & Strengthening Spinal Ligaments in Spinal Stenosis',
    enSummary: 'Restores vertebral endplate microcirculation, type-II collagen synthesis, and paraspinal core stability in degenerative disc disease and spinal stenosis using Eucommia/Achyranthes herbal formulas and gentle flexion-distraction Chuna.'
  },
  'gongjindan-post-1': {
    slug: 'daejeon-chronic-fatigue-brain-fog-authentic-musk-gongjindan',
    enTitle: 'Chronic Burnout & Brain Fog: How Authentic Musk (L-Muscone) Crosses the Blood-Brain Barrier',
    enSummary: 'Explains the neuropharmacological mechanism of CITES-certified L-Muscone in Emperor Gongjindan crossing the blood-brain barrier to boost cerebral blood flow and BDNF expression for severe fatigue recovery.'
  },
  'gongjindan-post-2': {
    slug: 'daejeon-emperor-gongjindan-dosage-guide-students-parents',
    enTitle: 'Age-Specific Emperor Gongjindan Guide: From Exam-Prep Cognitive Focus to Senior Cardiovascular Care',
    enSummary: 'Provides personalized Gongjindan protocols for students, fatigued professionals, and seniors after verifying Sasang constitution, HRV stress index, and AST/ALT liver safety.'
  },
  'gongjindan-post-3': {
    slug: 'daejeon-anti-aging-skin-joint-deer-antler-gongjindan',
    enTitle: 'Dermal Collagen Preservation & Joint Cartilage Vitality: Anti-Aging Science of Deer Antler Tip & Angelica',
    enSummary: 'Reviews SCI-indexed evidence on Russian deer antler tip (IGF-1) and Angelica gigas (decursin) in 99.9% gold-leaf Emperor Gongjindan for skin elasticity, bone density, and joint comfort.'
  },
  'syncope-post-1': {
    slug: 'daejeon-vasovagal-syncope-fainting-hrv-autonomic-care',
    enTitle: 'Vasovagal Syncope & Sudden Presyncope Despite Normal Brain MRI: Fixing the Autonomic Vagal Brake',
    enSummary: 'Diagnoses paradoxical vagal over-activation and venous pooling via HRV and APG testing, preventing recurrent fainting through vagus-pathway cervical/thoracic Chuna and cardiac-vascular herbal support.'
  },
  'syncope-post-2': {
    slug: 'daejeon-mri-normal-chronic-migraine-vertigo-cervical-care',
    enTitle: 'MRI-Normal Chronic Migraine & Orthostatic Vertigo: Upper Cervical (C1-C2) & Baroreflex Recovery',
    enSummary: 'Treats medication-resistant migraines and positional dizziness by releasing suboccipital vertebral artery compression and restoring cerebral autoregulation.'
  },
  'syncope-post-3': {
    slug: 'daejeon-chronic-insomnia-palpitation-autonomic-sleep-care',
    enTitle: 'Chronic Insomnia, Nighttime Awakening & Palpitations: Calming Sympathetic Hyperarousal Naturally',
    enSummary: 'Restores natural slow-wave sleep without sedative dependency by cooling thoracic-cranial heat (seen on DITI) and boosting parasympathetic HRV tone via craniosacral Chuna and calming herbal formulas.'
  },
  'digest-post-1': {
    slug: 'daejeon-damjeok-indigestion-normal-endoscopy-ultrasound-care',
    enTitle: 'Endoscopy-Normal Epigastric Fullness (“Damjeok Syndrome”): Abdominal Ultrasound & Gastric Motility Care',
    enSummary: 'Identifies hardened outer gastric smooth muscle and interstitial cells of Cajal (ICC) dysrhythmia invisible to standard gastroscopy, dissolving Damjeok stasis with deep microwave diathermy and fermented herbal medicine.'
  },
  'digest-post-2': {
    slug: 'daejeon-acid-reflux-esophagitis-globus-gastric-emptying',
    enTitle: 'Recurrent Acid Reflux (GERD) & Globus Sensation: Restoring Gastric Emptying Beyond Acid Suppression',
    enSummary: 'Explains why PPI relapse occurs when delayed gastric emptying increases intra-gastric gas pressure against the lower esophageal sphincter, resolved via diaphragm Chuna, mucosal repair herbs, and ENT endoscopic tracking.'
  },
  'digest-post-3': {
    slug: 'daejeon-irritable-bowel-syndrome-ibs-gut-brain-axis-care',
    enTitle: 'Stress-Induced Irritable Bowel Syndrome (IBS): Heating Visceral Coldness & Calming the Gut-Brain Axis',
    enSummary: 'Relieves alternating diarrhea, constipation, and bloating by strengthening intestinal tight junctions and stabilizing vagal gut-brain hypersensitivity.'
  },
  'gut-post-1': {
    slug: 'daejeon-stubborn-visceral-fat-brown-fat-appetite-zero-diet',
    enTitle: 'Age-Related Belly Fat & Night Cravings: Activating Brown Fat (UCP1) & Reversing Leptin Resistance',
    enSummary: 'Overcomes metabolic slowdown without starvation by restoring hypothalamic leptin sensitivity and browning white adipose tissue via Appetite-Zero herbal therapy and deep abdominal RF/microwave stimulation.'
  },
  'gut-post-2': {
    slug: 'daejeon-metabolic-syndrome-blood-sugar-liver-safe-diet',
    enTitle: 'Abdominal Obesity with High Blood Sugar, Fatty Liver & Elevated AST/ALT: Blood-Verified Detox Diet',
    enSummary: 'Monitors AST/ALT liver enzymes, fasting glucose, and HbA1c in-clinic while activating hepatic AMPK lipid oxidation to safely reduce visceral fat and insulin resistance.'
  },
  'gut-post-3': {
    slug: 'daejeon-edema-obesity-swollen-legs-lymphatic-detox-diet',
    enTitle: 'Morning Facial Swelling & Lower-Body Edema Obesity: Extracellular Water & Pelvic Lymphatic Detox',
    enSummary: 'Treats fluid-retention obesity (high ECW ratio) without harsh diuretics using pelvic alignment Chuna, APG microcirculation tracking, and renal-splenic water-metabolism herbs.'
  },
  'uterus-post-1': {
    slug: 'daejeon-ivf-implantation-thin-endometrium-uterine-warming',
    enTitle: 'Preparing for IVF & IUI with a Thin Endometrium: Deep Uterine Warming & Receptivity (LIF) Protocol',
    enSummary: 'Improves uterine spiral artery blood flow, endometrial thickness (8-10mm+), and implantation rates across pre-retrieval, pre-transfer, and post-transfer luteal stages.'
  },
  'uterus-post-2': {
    slug: 'daejeon-severe-menstrual-cramps-clots-pelvic-chuna-care',
    enTitle: 'Severe Dysmenorrhea & Dark Menstrual Clots: Resolving Pelvic Blood Stasis & Sacral Asymmetry',
    enSummary: 'Regulates excessive uterine prostaglandin contractions and venous congestion via pelvic-sacral Chuna decompression, deep magnetic warming, and blood-activating herbal medicine.'
  },
  'uterus-post-3': {
    slug: 'daejeon-postpartum-joint-care-menopause-hot-flashes-clinic',
    enTitle: 'From Postpartum Joint Wind (Sanhupung) to Menopausal Hot Flashes: Lifelong Women’s Hormone Care',
    enSummary: 'Provides breastfeeding-safe postpartum lochia/pelvic recovery and non-hormonal relief for menopausal vasomotor symptoms and insomnia.'
  },
  'prostate-post-1': {
    slug: 'daejeon-nocturia-urinary-incontinence-prostate-bladder-care',
    enTitle: 'Frequent Nocturia, BPH & Stress/Urge Urinary Incontinence: Prostate Decompression & Sphincter Warming',
    enSummary: 'Combines clothed pelvic-floor magnetic stimulation, bladder/prostate ultrasound assessment, and sphincter-tonifying herbal medicine to restore uninterrupted sleep and urinary control.'
  },
  'prostate-post-2': {
    slug: 'daejeon-chronic-nonbacterial-prostatitis-pelvic-pain-chuna',
    enTitle: 'Antibiotic-Resistant Perineal Pain (Chronic Prostatitis / CPPS): Pelvic Floor & Pudendal Nerve Decompression',
    enSummary: 'Addresses the 90% non-bacterial majority of chronic prostatitis caused by sacroiliac pelvic asymmetry and pelvic floor myofascial congestion in a private 1:1 treatment suite.'
  },
  'prostate-post-3': {
    slug: 'daejeon-male-andropause-vitality-vascular-herbal-care',
    enTitle: 'Declining Morning Stamina & Male Andropause: Restoring Pelvic Nitric Oxide Flow & Kidney-Yang Vitality',
    enSummary: 'Revitalizes male endocrine homeostasis, cavernous microcirculation (verified by APG), and urinary strength simultaneously without synthetic vasodilator side effects.'
  }
};

function escapeHtml(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Build the 9 Official Encyclopedia Master Blog Posts from BODY_PARTS
const encyclopediaMasterPosts = BODY_PARTS.map((part) => {
  const cat = DISEASE_BLOG_CATEGORIES.find(c => c.partId === part.id) || DISEASE_BLOG_CATEGORIES[0];
  const gMeta = ENCYCLOPEDIA_GLOBAL_META[part.id];
  const s0 = part.slides[0];
  const s1 = part.slides[1];
  const s2 = part.slides[2];
  const s3 = part.slides[3];

  const causeCardsHtml = s0.cards.map((c, idx) =>
    `<div class="bblog-encyc-card">` +
      `<div class="bblog-encyc-card-tag">0${idx + 1} · ${escapeHtml(c.tag)}</div>` +
      `<h4>${escapeHtml(c.title)}</h4>` +
      `<p>${escapeHtml(c.desc)}</p>` +
    `</div>`
  ).join('\n');

  const txCardsHtml = s1.cards.map((c, idx) =>
    `<div class="bblog-encyc-card tx">` +
      `<div class="bblog-encyc-card-tag">치료 핵심 0${idx + 1} · ${escapeHtml(c.tag)}</div>` +
      `<h4>${escapeHtml(c.title)}</h4>` +
      `<p>${escapeHtml(c.desc)}</p>` +
    `</div>`
  ).join('\n');

  const sciItemsHtml = part.sciPapers.map((sp) =>
    `<li><strong>[${escapeHtml(sp.journal)}]</strong> ${escapeHtml(sp.title)}</li>`
  ).join('\n');

  const careItemsHtml = [...s2.cards.slice(0, 2), s3.cards[0]].map((c) =>
    `<li><strong>✔ ${escapeHtml(c.title)}</strong>: ${escapeHtml(c.desc)}</li>`
  ).join('\n');

  const encycTitle = `[공식 의학백과] ${part.title} — 원인 · 9대 선별 정밀검사 · 원장 직접 시술 통합 가이드`;

  const coreBodyHtml = [
    `<div class="bblog-article-body layout-type-encyclopedia" data-layout="ENCYCLOPEDIA">`,
    `<figure class="bblog-hero-figure" data-seo-filename="${gMeta.slug}.jpg">`,
    `  <div class="bblog-hero-img-wrap">`,
    `    <img src="${gMeta.heroImg}" alt="바른한의원 대전본점 ${escapeHtml(part.title)} 해부학 기전 및 맞춤 치료 일러스트" class="bblog-hero-img" loading="lazy" />`,
    `  </div>`,
    `  <figcaption class="bblog-hero-caption">▲ ${escapeHtml(part.illustCaption)} (바른한의원 대전본점 공식 의학백과)</figcaption>`,
    `</figure>`,
    `<div class="bblog-lead-box">`,
    `  <div class="bblog-lead-badge">📘 바른한의원 대전본점 · 공식 의학백과 마스터 가이드</div>`,
    `  <p>${escapeHtml(part.lead)} 모든 진료는 내 가족에게 처방하고 시술한 안전한 치료만 시행한다는 ‘아빠 한의사’의 원칙으로 끝까지 세심하게 <strong>도움드립니다.</strong></p>`,
    `</div>`,
    `<h3>1. 왜 증상이 반복될까요? — 해부학적 · 생리학적 3대 핵심 원인</h3>`,
    `<p class="bblog-sublead"><strong>${escapeHtml(s0.heading)}</strong></p>`,
    `<p>${escapeHtml(s0.summary)}</p>`,
    `<div class="bblog-encyc-cards-grid">`,
    causeCardsHtml,
    `</div>`,
    `<h3>2. 보이지 않는 뿌리까지 찾는 선별 정밀 검사 & 1:1 진맥</h3>`,
    `<div class="bblog-visual-split-card">`,
    `  <div class="bblog-visual-split-img-wrap">`,
    `    <img src="${gMeta.subImg}" alt="바른한의원 대전본점 ${escapeHtml(part.shortName)} 맞춤 정밀 검진 시스템" class="bblog-visual-split-img" loading="lazy" />`,
    `  </div>`,
    `  <div class="bblog-visual-split-text">`,
    `    <div class="bblog-split-kicker">🩺 증상 맞춤형 선별 정밀 검진 & 眞장부맥학 진맥</div>`,
    `    <h4 class="bblog-split-title">${escapeHtml(gMeta.examHighlight)}</h4>`,
    `    <p class="bblog-split-desc">바른한의원 원내 9대 정밀 검진 시스템 중 환자분의 현재 증상에 꼭 필요한 선별 장비를 통해 장부·혈관·신경·체형 상태를 객관적인 수치와 영상으로 세밀하게 <strong>검사합니다.</strong> 이어서 안정위 대표원장이 1:1 심층 진맥과 이학적 촉진을 결합해 재발의 구조적·체질적 뿌리를 바르게 <strong>진단합니다.</strong></p>`,
    `  </div>`,
    `</div>`,
    `<h3>3. 안정위 대표원장 1:1 직접 시술 & 6대 한방 물리치료 시너지</h3>`,
    `<p class="bblog-sublead"><strong>${escapeHtml(s1.heading)}</strong></p>`,
    `<div class="bblog-encyc-cards-grid">`,
    txCardsHtml,
    `</div>`,
    `<div class="bblog-physio-card">`,
    `  <div class="bblog-physio-kicker">⚡ 대표원장 직접 시술 & 원내 직영 탕전 · 맞춤 물리치료 통합 프로토콜</div>`,
    `  <h4 class="bblog-physio-title">${escapeHtml(gMeta.therapyHighlight)}</h4>`,
    `  <div class="bblog-physio-highlight">안정위 대표원장이 직접 시행하는 수기 추나·침·약침 시술과 증상 부위 심부까지 에너지를 전달하는 <strong>심부 자기장 · 소노(초음파) · 극초단파 · ICT(간섭파) · IR(적외선) · 온열 핫팩</strong> 맞춤 치료로 빠른 통증·불편감 완화를 <strong>도움드립니다.</strong> 식약처 인증 무독성 청정 약재로 원내에서 직접 달이는 체질 맞춤 한약을 더해 몸 스스로 이겨내는 근본 자생력을 <strong>회복합니다.</strong></div>`,
    `</div>`,
    `<div class="bblog-sci-callout">`,
    `  <div class="bblog-sci-label">📚 국제 학술지(SCI급) 논문 검증 근거 (${part.sciPapers.length}편 핵심 수록)</div>`,
    `  <ul class="bblog-sci-paper-list">`,
    sciItemsHtml,
    `  </ul>`,
    `</div>`,
    `<h3>4. 진료실 밖에서도 실천하는 핵심 생활 꿀팁 요약</h3>`,
    `<ul class="bblog-check-list">`,
    careItemsHtml,
    `</ul>`,
    `<div class="bblog-doctor-sign">`,
    `  <strong>글·의학감수 : 바른한의원 대전본점 안정위 대표원장 (아빠 한의사)</strong><br/>`,
    `  <span>“보이지 않는 원인까지 정밀하게 검사합니다. 내 가족을 살피듯 바르게 진단합니다. 정성 어린 직접 시술로 온전히 회복합니다. 건강한 일상까지 끝까지 도움드립니다.”</span>`,
    `</div>`,
    `</div>`
  ].join('\n');

  return {
    id: `${part.id}-encyc-master`,
    slug: gMeta.slug,
    partId: part.id,
    categorySlug: cat.slug,
    isEncyclopediaMaster: true,
    postType: 'encyclopedia',
    layoutType: 'ENCYCLOPEDIA',
    badge: gMeta.badge,
    title: encycTitle,
    enTitle: gMeta.enTitle,
    enSummary: gMeta.enSummary,
    enKeywords: gMeta.enKeywords,
    dateOffsetDays: 0,
    readTime: '5분 마스터 백과',
    sciRef: part.sciPapers.map(p => p.journal.replace(' 학술지 등재', '')).slice(0, 3).join(' · '),
    heroImg: gMeta.heroImg,
    subImg: gMeta.subImg,
    seoFilename: `${gMeta.slug}.jpg`,
    imageAlt: `바른한의원 대전본점 ${part.title} 공식 의학백과 일러스트`,
    subImageAlt: `바른한의원 대전본점 ${part.shortName} 맞춤 정밀 검진 장면`,
    summary: part.lead,
    tldr: gMeta.tldr,
    clinicalTable: gMeta.tableRows,
    faqs: gMeta.faqs,
    tags: [
      part.navLabel.split('·')[0].trim(),
      (part.navLabel.split('·')[1] || '공식의학백과').trim(),
      '안정위원장직접진료',
      '9대정밀검진',
      '대전바른한의원'
    ],
    rawBodyHtml: coreBodyHtml
  };
});

// Enrich the 27 Clinical Posts with AI-SEO blocks + English abstracts + Table + FAQ while preserving 100% of their original rich HTML
const enrichedClinicalPosts = INITIAL_DISEASE_BLOG_POSTS.filter(p => !p.isEncyclopediaMaster && !String(p.id).endsWith('-encyc-master')).map((post, idx) => {
  const gMeta = ENCYCLOPEDIA_GLOBAL_META[post.partId] || ENCYCLOPEDIA_GLOBAL_META.lumbar;
  const cMeta = CLINICAL_POST_SEO_META[post.id] || {
    slug: `daejeon-bareun-${post.partId}-clinical-column-${idx + 1}`,
    enTitle: `${gMeta.enTitle.split('—')[0].trim()} — Clinical Column`,
    enSummary: gMeta.enSummary
  };

  // Extract sublead & split-title & physio-title from post.contentHtml for tailored TL;DR & Table!
  const subleadMatch = post.contentHtml.match(/<p class="bblog-sublead"><strong>([\s\S]*?)<\/strong><\/p>/);
  const examMatch = post.contentHtml.match(/<h4 class="bblog-split-title">([\s\S]*?)<\/h4>/);
  const physioMatch = post.contentHtml.match(/<h4 class="bblog-physio-title">([\s\S]*?)<\/h4>/);

  const cleanSublead = subleadMatch ? subleadMatch[1].replace(/<[^>]*>/g, '').trim() : post.summary;
  const cleanExam = examMatch ? examMatch[1].replace(/<[^>]*>/g, '').trim() : gMeta.examHighlight;
  const cleanPhysio = physioMatch ? physioMatch[1].replace(/<[^>]*>/g, '').trim() : gMeta.therapyHighlight;

  const tldr = [
    `핵심 원인: ${cleanSublead}`,
    `선별 검진: ${cleanExam} 및 안정위 대표원장 1:1 진맥으로 증상의 뿌리를 정밀하게 검사하고 진단합니다.`,
    `맞춤 회복: ${cleanPhysio} 시술을 병행하여 재발 걱정을 줄이고 건강한 일상을 회복하도록 도움드립니다.`
  ];

  const clinicalTable = [
    [
      post.badge.replace(' 칼럼', ''),
      cleanExam,
      cleanPhysio,
      (post.tags || []).slice(0, 3).map(t => '#' + t).join(' ')
    ],
    gMeta.tableRows[0],
    gMeta.tableRows[1]
  ];

  const faqs = [
    {
      q: `${post.title.split(',')[0].replace(/^\[[^\]]+\]\s*/, '')} 증상, 언제 내원해 검사받는 것이 좋나요?`,
      a: `증상이 2주 이상 반복되거나 진통제·대증 약물 복용 후에도 재발한다면 만성화되기 전 ${cleanExam} 검진을 통해 정확한 원인을 진단받는 것을 권장해 도움드립니다.`
    },
    gMeta.faqs[0]
  ];

  // Cleanly strip any previously injected AI-SEO wrapper if upgrade script is run multiple times
  const cleanRawHtml = (post.rawBodyHtml || post.contentHtml || '')
    .replace(/외상을 100% 막을 수 있습니다/g, '낙상 외상을 안전하게 예방하도록 도움드립니다');

  return {
    ...post,
    slug: cMeta.slug,
    isEncyclopediaMaster: false,
    postType: 'column',
    dateOffsetDays: (idx % 3) + 1,
    enTitle: cMeta.enTitle,
    enSummary: cMeta.enSummary,
    enKeywords: gMeta.enKeywords,
    tldr,
    clinicalTable,
    faqs,
    rawBodyHtml: cleanRawHtml
  };
});

// Interleave so each disease has its Master Encyclopedia first, followed by its 3 Clinical Columns (Total = 36 posts)
const ALL_36_POSTS = [];
BODY_PARTS.forEach(part => {
  const master = encyclopediaMasterPosts.find(p => p.partId === part.id);
  if (master) ALL_36_POSTS.push(master);
  enrichedClinicalPosts.filter(p => p.partId === part.id).forEach(cp => ALL_36_POSTS.push(cp));
});

// Generate the complete output file `disease-blog-seed-data.js` with AI-SEO HTML & Standalone WP Post Builder
const outputModuleSource = `/**
 * 바른한의원 대전본점 · 공식 의학백과 블로그(9편) & 질환별 심층 임상칼럼(27편) — 총 36편 통합 데이터
 * - '무엇이든 물어보세요 (ask-doctor.html / /ask-doctor/)' 및 워드프레스 개별 고유 URL 정식 발행 연동
 * - 국내(네이버·다음) + 해외·글로벌 AI 검색엔진(Google, Bing, ChatGPT, Perplexity) 동시 최적화:
 *   · 영문 고유 퍼머링크(slug)
 *   · 🤖 AI 핵심 3줄 즉답 요약(TL;DR)
 *   · 🌐 Global Clinical Summary (영문 의학 초록)
 *   · 📊 증상·검진·치료 시맨틱 비교표(<table>)
 *   · ❓ 다빈도 질문(FAQ) & JSON-LD 4종 스키마(MedicalWebPage, MedicalClinic, Physician, FAQPage)
 *   · 💬 발행글 내 즉시 질문 가능한 공개 문답(답글/댓글) 연동
 */

const DISEASE_BLOG_CATEGORIES = ${JSON.stringify(DISEASE_BLOG_CATEGORIES, null, 2)};

const RAW_DISEASE_BLOG_POSTS = ${JSON.stringify(ALL_36_POSTS, null, 2)};

function escAttr(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * 개별 블로그 본문에 AI-SEO 5계층(TL;DR + 영문 초록 + 본문 + 시맨틱 비교표 + FAQ)을 결합
 */
function buildAiSeoArticleBodyHtml(post, category) {
  const cat = category || DISEASE_BLOG_CATEGORIES.find(c => c.partId === post.partId) || {};
  const tldrList = (post.tldr || []).map(item => '<li>' + escAttr(item) + '</li>').join('');
  const tableRowsHtml = (post.clinicalTable || []).map(row =>
    '<tr>' +
      '<td><strong>' + escAttr(row[0] || '') + '</strong></td>' +
      '<td>' + escAttr(row[1] || '') + '</td>' +
      '<td>' + escAttr(row[2] || '') + '</td>' +
      '<td>' + escAttr(row[3] || '') + '</td>' +
    '</tr>'
  ).join('');
  const faqHtml = (post.faqs || []).map((f, i) =>
    '<div class="bblog-faq-item">' +
      '<div class="bblog-faq-q">Q' + (i + 1) + '. ' + escAttr(f.q) + '</div>' +
      '<div class="bblog-faq-a"><strong>A.</strong> ' + escAttr(f.a) + '</div>' +
    '</div>'
  ).join('');

  return [
    '<article class="bblog-aiseo-article" itemscope itemtype="https://schema.org/MedicalWebPage">',
    '  <section class="bblog-aiseo-tldr" aria-label="AI 핵심 3줄 즉답 요약">',
    '    <div class="bblog-aiseo-tldr-badge">🤖 AI 핵심 3줄 즉답 요약 · Clinical Quick Answer</div>',
    '    <ul class="bblog-aiseo-tldr-list">' + tldrList + '</ul>',
    '  </section>',
    '  <section class="bblog-aiseo-en-box" lang="en" aria-label="International Clinical Summary">',
    '    <div class="bblog-aiseo-en-kicker">🌐 GLOBAL CLINICAL SUMMARY · DAEJEON BAREUN KOREAN MEDICINE CLINIC (SOUTH KOREA)</div>',
    '    <h4 class="bblog-aiseo-en-title">' + escAttr(post.enTitle || '') + '</h4>',
    '    <p class="bblog-aiseo-en-desc">' + escAttr(post.enSummary || '') + '</p>',
    '  </section>',
    post.rawBodyHtml || post.contentHtml || '',
    tableRowsHtml ? [
      '  <section class="bblog-aiseo-table-sec" aria-label="증상별 맞춤 검진 및 치료 요약표">',
      '    <h3>📊 증상 · 선별 정밀검사 · 원장 직접 시술 한눈에 비교표</h3>',
      '    <div class="bblog-aiseo-table-wrap">',
      '      <table class="bblog-aiseo-table">',
      '        <thead><tr><th>주요 증상 · 유형</th><th>선별 정밀 검사</th><th>원장 직접 시술 & 물리치료</th><th>핵심 생활 관리</th></tr></thead>',
      '        <tbody>' + tableRowsHtml + '</tbody>',
      '      </table>',
      '    </div>',
      '  </section>'
    ].join('\\n') : '',
    faqHtml ? [
      '  <section class="bblog-aiseo-faq-sec" aria-label="환자 다빈도 질문 Q&A">',
      '    <h3>❓ 진료실에서 자주 묻는 질문 Q&A</h3>',
      '    <div class="bblog-aiseo-faq-list">' + faqHtml + '</div>',
      '  </section>'
    ].join('\\n') : '',
    '</article>'
  ].filter(Boolean).join('\\n');
}

/**
 * 검색엔진 크롤러(Google, Naver, Bing, ChatGPT, Perplexity)용 구조화 JSON-LD 생성
 */
function buildPostJsonLdObject(post, category, siteOrigin) {
  const origin = (siteOrigin || 'https://www.bareunhaniwon.com').replace(/\\/$/, '');
  const ghBase = 'https://raw.githubusercontent.com/ajwei0508-cpu/bareun-homepage/main/homepage/';
  const postUrl = origin + '/' + post.slug + '/';
  const heroUrl = /^https?:\\/\\//.test(post.heroImg || '') ? post.heroImg : (ghBase + (post.heroImg || 'card_1_director.jpg'));
  const cat = category || DISEASE_BLOG_CATEGORIES.find(c => c.partId === post.partId) || {};

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalWebPage',
        '@id': postUrl + '#webpage',
        'url': postUrl,
        'name': post.title,
        'headline': post.title,
        'alternativeHeadline': post.enTitle || '',
        'description': (post.summary || '') + ' | ' + (post.enSummary || ''),
        'inLanguage': ['ko-KR', 'en-US'],
        'image': heroUrl,
        'datePublished': '2026-10-26T08:00:00+09:00',
        'dateModified': new Date().toISOString(),
        'keywords': [...(post.tags || []), ...(post.enKeywords || [])].join(', '),
        'about': {
          '@type': 'MedicalCondition',
          'name': cat.shortLabel || post.badge,
          'alternateName': post.enTitle || ''
        },
        'author': {
          '@type': 'Physician',
          '@id': origin + '/director/#physician',
          'name': '안정위 대표원장 (Dr. Jung-Wi Ahn)',
          'jobTitle': '대표원장 · 한의사 (Chief Korean Medicine Doctor)',
          'url': origin + '/director/',
          'worksFor': { '@id': origin + '/#clinic' }
        },
        'reviewedBy': { '@id': origin + '/director/#physician' },
        'publisher': { '@id': origin + '/#clinic' },
        'isPartOf': {
          '@type': 'Blog',
          '@id': origin + '/ask-doctor/#blog',
          'name': '바른한의원 대전본점 무엇이든 물어보세요 · 공식 의학백과 & 원장 Q&A 블로그',
          'url': origin + '/ask-doctor/'
        }
      },
      {
        '@type': 'MedicalClinic',
        '@id': origin + '/#clinic',
        'name': '바른한의원 대전본점 (Bareun Korean Medicine Clinic Daejeon)',
        'alternateName': 'Daejeon Bareun Korean Medicine Clinic',
        'url': origin + '/',
        'telephone': '+82-42-488-1075',
        'image': ghBase + 'card_1_director.jpg',
        'address': {
          '@type': 'PostalAddress',
          'addressLocality': 'Daejeon',
          'addressRegion': 'Daejeon',
          'addressCountry': 'KR'
        },
        'medicalSpecialty': [
          'Traditional Korean Medicine',
          'Musculoskeletal Chuna Therapy',
          'Pediatric Growth & Obesity',
          'Dermatology & Alopecia',
          'Gastroenterology',
          'Neurology & Autonomic Regulation',
          'Gynecology & Fertility',
          'Urology'
        ]
      },
      {
        '@type': 'FAQPage',
        '@id': postUrl + '#faq',
        'mainEntity': (post.faqs || []).map(f => ({
          '@type': 'Question',
          'name': f.q,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': f.a
          }
        }))
      },
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': '바른한의원 대전본점', 'item': origin + '/' },
          { '@type': 'ListItem', 'position': 2, 'name': '무엇이든 물어보세요 (의학백과·Q&A)', 'item': origin + '/ask-doctor/?part=' + post.partId },
          { '@type': 'ListItem', 'position': 3, 'name': post.title, 'item': postUrl }
        ]
      }
    ]
  };
}

/**
 * 워드프레스 개별 포스트 고유 URL(https://www.bareunhaniwon.com/<slug>/) 정식 발행용 완성형 HTML 빌더
 * - 검색엔진 유입 방문자가 단독 포스트로 접속했을 때도 최상급 매거진 시인성(15:1 대비) 제공
 * - 하단 워드프레스 기본 답글(댓글) 폼(#comments / #respond)을 '원장님께 질문하기 Q&A 라운지' 디자인으로 자동 변환
 */
function buildStandaloneWpPostHtml(post, category) {
  const ghBase = 'https://raw.githubusercontent.com/ajwei0508-cpu/bareun-homepage/main/homepage/';
  const cat = category || DISEASE_BLOG_CATEGORIES.find(c => c.partId === post.partId) || {};
  const clinicHref = cat.clinicLink === 'gongjindan.html'
    ? '/gongjindan-2/'
    : ('/' + String(cat.clinicLink || 'director.html').replace(/\\.html$/, '') + '/');

  const bodyHtmlWithCdn = buildAiSeoArticleBodyHtml(post, cat)
    .replace(/src="(?!https?:\\/\\/)([^"]+)"/g, 'src="' + ghBase + '$1"');

  const jsonLdStr = JSON.stringify(buildPostJsonLdObject(post, cat, 'https://www.bareunhaniwon.com')).replace(/<\\//g, '<\\\\/');

  const standaloneCss = [
    '<style>',
    '.single-post .post-thumb-img-content{display:none !important;}',
    '.bblog-wp-standalone-wrap{font-family:"Pretendard",-apple-system,BlinkMacSystemFont,sans-serif;color:#111827;line-height:1.82;max-width:860px;margin:0 auto;padding:8px 0 28px;word-break:keep-all;}',
    '.bblog-wp-only-bar{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px;padding:14px 18px;margin-bottom:22px;border-radius:16px;background:linear-gradient(135deg,#0F172A 0%,#1E293B 100%);color:#FFFFFF;box-shadow:0 10px 26px rgba(15,23,42,0.14);}',
    '.bblog-wp-only-links{display:flex;flex-wrap:wrap;gap:8px;}',
    '.bblog-wp-only-btn{display:inline-flex;align-items:center;gap:5px;padding:7px 13px;border-radius:999px;font-size:0.82rem;font-weight:800;text-decoration:none !important;border:1px solid rgba(255,255,255,0.24);color:#FFFFFF !important;background:rgba(255,255,255,0.1);}',
    '.bblog-wp-only-btn.gold{background:#FEF3C7;color:#92400E !important;border-color:#F59E0B;}',
    '.bblog-wp-only-btn.emerald{background:#10B981;color:#052E16 !important;border-color:#34D399;}',
    '.bblog-aiseo-tldr{margin:0 0 18px;padding:18px 22px;border-radius:16px;background:#F0FDF4;border:1.5px solid #86EFAC;border-left:6px solid #15803D;}',
    '.bblog-aiseo-tldr-badge{font-size:0.84rem;font-weight:800;color:#14532D;margin-bottom:8px;}',
    '.bblog-aiseo-tldr-list{margin:0;padding-left:18px;color:#111827;font-size:0.96rem;font-weight:600;line-height:1.72;}',
    '.bblog-aiseo-tldr-list li{margin-bottom:5px;}',
    '.bblog-aiseo-en-box{margin:0 0 22px;padding:15px 18px;border-radius:14px;background:#F8FAFC;border:1px solid #CBD5E1;}',
    '.bblog-aiseo-en-kicker{font-size:0.72rem;font-weight:800;letter-spacing:0.06em;color:#334155;margin-bottom:4px;}',
    '.bblog-aiseo-en-title{margin:0 0 5px !important;font-size:0.96rem !important;font-weight:800;color:#0F172A;}',
    '.bblog-aiseo-en-desc{margin:0 !important;font-size:0.86rem;line-height:1.62;color:#334155;}',
    '.bblog-hero-figure{margin:0 0 22px;border-radius:18px;overflow:hidden;border:1.5px solid #E2E8F0;background:#FFFFFF;}',
    '.bblog-hero-img{width:100%;max-height:420px;object-fit:cover;display:block;}',
    '.bblog-hero-caption{padding:10px 16px;font-size:0.84rem;font-weight:700;color:#334155;background:#F8FAFC;}',
    '.bblog-wp-standalone-wrap h3{margin:28px 0 12px;font-size:1.25rem;font-weight:800;color:#0F172A;padding-left:12px;border-left:4px solid #1B4332;line-height:1.4;}',
    '.bblog-wp-standalone-wrap p{margin:0 0 14px;font-size:1.02rem;color:#1F2937;line-height:1.84;}',
    '.bblog-sublead{font-size:1.05rem !important;color:#14532D !important;}',
    '.bblog-qa-box,.bblog-selfcheck-box,.bblog-lead-box,.bblog-essay-lead{margin:0 0 20px;padding:18px 20px;border-radius:16px;background:#F8FAFC;border:1.5px solid #CBD5E1;}',
    '.bblog-qa-q{padding-bottom:12px;margin-bottom:12px;border-bottom:1px dashed #CBD5E1;}',
    '.bblog-mythfact-grid,.bblog-encyc-cards-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px;margin:16px 0 20px;}',
    '.bblog-myth-card{padding:16px;border-radius:14px;background:#FEF2F2;border:1.5px solid #FECACA;}',
    '.bblog-fact-card{padding:16px;border-radius:14px;background:#ECFDF5;border:1.5px solid #A7F3D0;}',
    '.bblog-encyc-card{padding:16px 18px;border-radius:14px;background:#FFFFFF;border:1.5px solid #CBD5E1;box-shadow:0 4px 12px rgba(15,23,42,0.04);}',
    '.bblog-encyc-card.tx{background:#F0FDF4;border-color:#86EFAC;}',
    '.bblog-encyc-card-tag{font-size:0.76rem;font-weight:800;color:#1B4332;margin-bottom:5px;}',
    '.bblog-encyc-card h4{margin:0 0 6px !important;font-size:1.0rem !important;font-weight:800;color:#0F172A;}',
    '.bblog-encyc-card p{margin:0 !important;font-size:0.92rem !important;line-height:1.65 !important;}',
    '.bblog-visual-split-card{display:grid;grid-template-columns:220px 1fr;gap:18px;align-items:center;margin:16px 0 20px;padding:18px;border-radius:16px;background:#F8FAFC;border:1.5px solid #CBD5E1;}',
    '.bblog-visual-split-img{width:100%;height:150px;object-fit:cover;border-radius:12px;display:block;}',
    '.bblog-split-kicker,.bblog-physio-kicker{font-size:0.78rem;font-weight:800;color:#15803D;margin-bottom:4px;}',
    '.bblog-split-title,.bblog-physio-title{margin:0 0 8px !important;font-size:1.06rem !important;font-weight:800;color:#0F172A;}',
    '.bblog-physio-card{margin:16px 0 20px;padding:20px;border-radius:16px;background:#F0FDF4;border:1.5px solid #86EFAC;}',
    '.bblog-physio-highlight{margin-top:12px;padding:14px 16px;border-radius:12px;background:#FFFFFF;border:1px solid #BBF7D0;font-size:0.96rem;color:#111827;}',
    '.bblog-sci-callout{margin:18px 0;padding:18px 20px;border-radius:16px;background:#EFF6FF;border:1.5px solid #BFDBFE;border-left:5px solid #1D4ED8;}',
    '.bblog-sci-label{font-size:0.8rem;font-weight:800;color:#1E40AF;margin-bottom:6px;}',
    '.bblog-sci-paper-title{font-size:0.98rem;font-weight:800;color:#0F172A;margin-bottom:6px;}',
    '.bblog-sci-paper-list{margin:0;padding-left:18px;font-size:0.93rem;color:#1E293B;line-height:1.7;}',
    '.bblog-check-list{margin:12px 0 20px;padding-left:18px;font-size:0.98rem;color:#111827;line-height:1.8;}',
    '.bblog-aiseo-table-wrap{overflow-x:auto;margin:12px 0 20px;border-radius:14px;border:1.5px solid #CBD5E1;}',
    '.bblog-aiseo-table{width:100%;border-collapse:collapse;background:#FFFFFF;font-size:0.92rem;}',
    '.bblog-aiseo-table th{background:#0F172A;color:#FFFFFF;font-weight:800;padding:12px 14px;text-align:left;}',
    '.bblog-aiseo-table td{padding:12px 14px;border-top:1px solid #E2E8F0;color:#1E293B;vertical-align:top;}',
    '.bblog-faq-item{padding:15px 18px;border-radius:14px;background:#F8FAFC;border:1.5px solid #E2E8F0;margin-bottom:10px;}',
    '.bblog-faq-q{font-weight:800;color:#0F172A;font-size:0.98rem;margin-bottom:6px;}',
    '.bblog-faq-a{color:#334155;font-size:0.94rem;line-height:1.72;}',
    '.bblog-doctor-sign{margin-top:22px;padding:18px 20px;border-radius:16px;background:linear-gradient(135deg,#0F172A 0%,#1E293B 100%);color:#F8FAFC;font-size:0.93rem;line-height:1.72;}',
    '.bblog-doctor-sign strong{color:#6EE7B7;}',
    '.bblog-qna-invite-banner{margin-top:24px;padding:22px 24px;border-radius:18px;background:linear-gradient(135deg,#ECFDF5 0%,#FEF3C7 100%);border:2px solid #10B981;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:14px;}',
    '#comments.comments-area{max-width:860px;margin:28px auto 40px;padding:26px 28px;border-radius:20px;background:#F8FAFC;border:2px solid #0F172A;box-shadow:0 12px 30px rgba(15,23,42,0.08);}',
    '#comments .comments-title{font-size:1.24rem !important;font-weight:800 !important;color:#0F172A !important;margin-bottom:18px !important;}',
    '#comments ol.ast-comment-list{list-style:none;margin:0 0 24px;padding:0;}',
    '#comments article.ast-comment{padding:18px 20px;border-radius:16px;background:#FFFFFF;border:1.5px solid #CBD5E1;margin-bottom:14px;}',
    '#comments li.bypostauthor > article.ast-comment{background:#F0FDF4;border:2px solid #10B981;}',
    '#comments li.bypostauthor > article.ast-comment .ast-comment-cite-wrap::after{content:"👨‍⚕️ 안정위 대표원장 공식 답변";display:inline-block;margin-left:8px;padding:3px 10px;border-radius:999px;background:#0F172A;color:#6EE7B7;font-size:0.75rem;font-weight:800;}',
    '#comments .comment-reply-title{font-size:1.3rem !important;font-weight:800 !important;color:#0F172A !important;}',
    '#comments textarea#comment{border:1.5px solid #94A3B8 !important;border-radius:12px !important;padding:14px !important;background:#FFFFFF !important;font-size:0.98rem !important;color:#111827 !important;}',
    '#comments input#author,#comments input#email{border:1.5px solid #94A3B8 !important;border-radius:10px !important;padding:10px 14px !important;background:#FFFFFF !important;color:#111827 !important;}',
    '#comments input#submit{background:#0F172A !important;color:#FFFFFF !important;font-weight:800 !important;border-radius:999px !important;padding:12px 26px !important;border:none !important;cursor:pointer !important;}',
    '@media(max-width:760px){.bblog-visual-split-card{grid-template-columns:1fr;}}',
    '</style>'
  ].join('\\n');

  const standaloneQnaEnhancerJs = [
    '<script>',
    '(function(){',
    '  function enhanceWpCommentForm(){',
    '    var titleEl = document.getElementById("reply-title");',
    '    if(titleEl){',
    '      titleEl.textContent = "💬 이 의학백과·칼럼에 답글로 원장님께 질문 남기기";',
    '      var subSpan = document.createElement("span");',
    '      subSpan.style.cssText = "display:block;font-size:0.86rem;font-weight:600;color:#475569;margin-top:4px;";',
    '      subSpan.textContent = "회원가입·로그인 없이 바로 질문을 남기실 수 있으며, 안정위 대표원장실이 확인 후 답글로 안내해 도움드립니다.";',
    '      titleEl.appendChild(subSpan);',
    '    }',
    '    var ta = document.getElementById("comment");',
    '    if(ta) ta.setAttribute("placeholder", "궁금하신 증상, 기간, 연령대 또는 검사·한약·추나 치료 관련 질문을 편하게 남겨주세요. (개인정보 보호를 위해 휴대폰 번호는 본문에 적지 마세요)");',
    '    var authorInput = document.getElementById("author");',
    '    if(authorInput) authorInput.setAttribute("placeholder", "작성자 성함 또는 닉네임 (예: 둔산동 보호자)");',
    '    var emailInput = document.getElementById("email");',
    '    if(emailInput){ emailInput.removeAttribute("required"); emailInput.setAttribute("placeholder", "이메일 (선택입력 · 비워두셔도 등록됩니다)"); }',
    '    var urlP = document.querySelector(".comment-form-url");',
    '    if(urlP) urlP.style.display = "none";',
    '    var submitBtn = document.getElementById("submit");',
    '    if(submitBtn) submitBtn.value = "💬 원장님께 답글 질문 등록하기";',
    '    var form = document.getElementById("ast-commentform") || document.getElementById("commentform");',
    '    if(form){',
    '      form.addEventListener("submit", function(){',
    '        if(authorInput && !authorInput.value.trim()) authorInput.value = "방문 질문자";',
    '      });',
    '    }',
    '  }',
    '  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", enhanceWpCommentForm);',
    '  else enhanceWpCommentForm();',
    '})();',
    '<\\/script>'
  ].join('\\n');

  return [
    '<!-- wp:html -->',
    standaloneCss,
    '<div class="bblog-wp-standalone-wrap">',
    '  <nav class="bblog-wp-only-bar" aria-label="바른한의원 블로그 상단 바로가기">',
    '    <div style="font-size:0.9rem;font-weight:800;">👨‍⚕️ 바른한의원 대전본점 · 안정위 대표원장 공식 의학백과 & 문답</div>',
    '    <div class="bblog-wp-only-links">',
    '      <a class="bblog-wp-only-btn emerald" href="/ask-doctor/?part=' + escAttr(post.partId) + '&post=' + escAttr(post.slug) + '">💬 무엇이든 물어보세요 허브</a>',
    '      <a class="bblog-wp-only-btn gold" href="/body-explorer/?part=' + escAttr(post.partId) + '">💡 3D 부위별 생활꿀팁</a>',
    '      <a class="bblog-wp-only-btn" href="' + clinicHref + '">🏥 클리닉 상세보기 →</a>',
    '    </div>',
    '  </nav>',
    bodyHtmlWithCdn,
    '  <div class="bblog-qna-invite-banner bblog-wp-only-bar-cta">',
    '    <div>',
    '      <div style="font-size:1.04rem;font-weight:800;color:#064E3B;margin-bottom:4px;">💬 읽으신 내용 중 내 증상과 관련해 궁금한 점이 있으신가요?</div>',
    '      <div style="font-size:0.9rem;color:#1E293B;font-weight:600;">바로 아래 답글창에 질문을 남겨주시면 안정위 대표원장실이 직접 확인하여 답변을 도움드립니다.</div>',
    '    </div>',
    '    <div style="display:flex;gap:8px;flex-wrap:wrap;">',
    '      <a href="#respond" style="padding:10px 18px;border-radius:999px;background:#0F172A;color:#FFFFFF !important;font-size:0.86rem;font-weight:800;text-decoration:none !important;">✍️ 아래 답글로 바로 질문하기 ↓</a>',
    '      <a href="/ask-doctor/?part=' + escAttr(post.partId) + '" style="padding:10px 18px;border-radius:999px;background:#FFFFFF;border:1.5px solid #0F172A;color:#0F172A !important;font-size:0.86rem;font-weight:800;text-decoration:none !important;">📚 전체 의학백과 · Q&A 보기</a>',
    '    </div>',
    '  </div>',
    '</div>',
    '<script type="application/ld+json">' + jsonLdStr + '</script>',
    standaloneQnaEnhancerJs,
    '<!-- /wp:html -->'
  ].join('\\n');
}

const INITIAL_DISEASE_BLOG_POSTS = RAW_DISEASE_BLOG_POSTS.map(post => {
  const cat = DISEASE_BLOG_CATEGORIES.find(c => c.partId === post.partId);
  return {
    ...post,
    contentHtml: buildAiSeoArticleBodyHtml(post, cat)
  };
});

module.exports = {
  DISEASE_BLOG_CATEGORIES,
  INITIAL_DISEASE_BLOG_POSTS,
  RAW_DISEASE_BLOG_POSTS,
  buildAiSeoArticleBodyHtml,
  buildPostJsonLdObject,
  buildStandaloneWpPostHtml
};
`;

fs.writeFileSync(seedPath, outputModuleSource, 'utf8');
console.log('✅ Upgraded disease-blog-seed-data.js with', ALL_36_POSTS.length, 'total posts (9 Official Encyclopedia Masters + 27 Clinical Columns)!');
