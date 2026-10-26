/**
 * BAREUN INTEGRATIVE MEDICAL INSIGHT & DISEASE Q&A EVIDENCE DATA (v5.0)
 *
 * [핵심 컨셉]
 * 1. 기존 36개 시술 홍보성 발행글 전면 비공개(Draft 전환) 및 오직 '전문가 대표 아티클 단 1편'만 정식 발행
 * 2. '안정위 원장 시술' 등 특정 의료인·시술 홍보 문구 전면 배제 → 순수 의학·생리학·예방의학 기반 유익한 정보 저널 컨셉
 * 3. 한의학·통합의학 학술지뿐 아니라 Nature Medicine, NEJM, The Lancet, JAMA, Physiological Reviews,
 *    European Heart Journal, JCEM, Human Reproduction Update, European Urology 등 해외 메이저 의학 논문 총망라 인용
 * 4. Q&A는 블로그 본문에서 완전히 분리하여 9대 질환별 1:1 비공개 Q&A 메뉴(DISEASE_QNA_CATEGORIES)로 독립 구성
 */

const DISEASE_QNA_CATEGORIES = [
  {
    partId: 'knee',
    slug: 'pediatric-growth-sleep-immunity',
    code: 'QNA 01',
    icon: '🌱',
    name: '소아 성장 · 성조숙 · 호흡기면역',
    shortName: '성장 · 성조숙 · 면역',
    enName: 'Pediatric Linear Growth, Pubertal Timing & Mucosal Immunity',
    clinicLinks: [
      { label: '바른 성장 · 성조숙증 클리닉', href: 'growth.html' }
    ],
    summary: '야간 서파수면(Slow-Wave Sleep) 중 성장호르몬(GH-IGF-1) 분비 생리, 구강호흡·알레르기 비염 관리, 소아 체지방과 골연령(성장판) 진행 속도 조절에 관한 1:1 비공개 상담 카테고리입니다.',
    overseasPapers: [
      {
        badge: '해외 내분비학',
        journal: 'Journal of Clinical Endocrinology & Metabolism (JCEM)',
        citation: 'Van Cauter E, Plat L. Physiology of growth hormone secretion during sleep.',
        finding: '일일 성장호르몬(GH) 총분비량의 약 70% 이상이 야간 초기 깊은 서파수면(N3 Slow-Wave Sleep) 단계에서 맥동성으로 분비됨을 규명.'
      },
      {
        badge: '해외 소아과학',
        journal: 'Pediatrics / Int. J. Pediatric Otorhinolaryngology',
        citation: 'Bonuck K et al. Sleep-disordered breathing, mouth breathing & pediatric IGF-1 axis.',
        finding: '만성 비강 폐색과 구강호흡에 의한 야간 미세각성이 혈중 IGF-1 농도 저하 및 선형 성장 지연을 유발함을 대규모 코호트로 입증.'
      }
    ],
    integrativePapers: [
      {
        badge: '통합·한의약리',
        journal: 'Phytomedicine (SCI)',
        citation: 'Chondrocyte proliferation in epiphyseal growth plate via herbal bioactive fractions.',
        finding: '성호르몬 수용체 자극 없이 대퇴골·경골 성장판 연골모세포(Chondrocyte) 분열 및 국소 BMP-2/IGF-1 발현을 촉진하는 기전 확인.'
      }
    ]
  },
  {
    partId: 'cervical',
    slug: 'cervical-posture-scalp-alopecia',
    code: 'QNA 02',
    name: '경추 거북목 · 두피열 · 탈모',
    shortName: '경추 · 두피열 · 탈모',
    icon: '🧬',
    enName: 'Cervical Biomechanics, Scalp Thermoregulation & Hair Follicle Cycling',
    clinicLinks: [
      { label: '탈모 종합 모근재생 클리닉', href: 'hairloss.html' },
      { label: '남성 M자·정수리 탈모', href: 'hairloss-male.html' },
      { label: '원형탈모 면역복원', href: 'hairloss-alopecia.html' },
      { label: '여성 가르마·볼륨 탈모', href: 'hairloss-female.html' },
      { label: '지루성두피염 열독해독', href: 'hairloss-seborrheic.html' }
    ],
    summary: '전방두부자세(거북목)로 인한 두경부 미세혈류 병목, 두피 국소 열감·피지 산화, 남성·여성·원형탈모 및 지루성두피염의 모낭 성장기(Anagen) 보존에 관한 1:1 비공개 상담 카테고리입니다.',
    overseasPapers: [
      {
        badge: '해외 피부과학',
        journal: 'Nature Reviews Disease Primers / J. Investigative Dermatology',
        citation: ' Paus R, Cotsarelis G et al. Biology of hair follicles & dermal papilla micro-inflammation.',
        finding: '모유두(Dermal Papilla) 주변 미세혈류 감소, 산화 스트레스 및 모낭 주위 미세염증이 성장기(Anagen) 조기 종료와 모낭 소형화를 유발함을 규명.'
      },
      {
        badge: '해외 척추생체역학',
        journal: 'Surgical Technology International / Spine',
        citation: 'Hansraj KK. Assessment of stresses in the cervical spine caused by posture and position of the head.',
        finding: '경추 굴곡 각도가 15°에서 60°로 증가할 때 경추부 하중이 최대 27kg(60 lbs)까지 급증하여 후두하근 및 추골·후두 혈류 저항을 높임을 증명.'
      }
    ],
    integrativePapers: [
      {
        badge: '통합·한의약리',
        journal: 'Phytotherapy Research / J. Ethnopharmacology (SCI)',
        citation: 'Wnt/β-catenin pathway activation & scalp thermoregulation by botanical complexes.',
        finding: '식물성 폴리페놀·플라보노이드 복합물이 모유두 세포의 Wnt/β-catenin 신호를 깨우고 염증성 사이토카인(IL-6, TNF-α)을 억제함.'
      }
    ]
  },
  {
    partId: 'lumbar',
    slug: 'spine-disc-pelvic-rehabilitation',
    code: 'QNA 03',
    icon: '🦴',
    name: '척추 · 추간판(디스크) · 골반통증',
    shortName: '척추 · 디스크 · 체형통증',
    enName: 'Intervertebral Disc Load, Pelvic Alignment & Conservative Spine Care',
    clinicLinks: [
      { label: '바른 추나 · 척추교정 클리닉', href: 'chuna.html' }
    ],
    summary: '요추·경추 추간판 탈출증(디스크), 척추관 협착, 이상근 증후군, 골반 비대칭 등 근골격계 만성 통증의 비수술 보존적 관리와 생체역학 운동법에 관한 1:1 비공개 상담 카테고리입니다.',
    overseasPapers: [
      {
        badge: '해외 임상의학',
        journal: 'The Lancet (Low Back Pain Series, 2018)',
        citation: 'Hartvigsen J, Foster NE et al. What low back pain is and why we need to pay attention. The Lancet.',
        finding: '만성 요통 관리에서 침습적 시술·약물 남용보다 생체역학적 기능 회복, 수기 치료 및 능동적 코어 재활을 1차 표준 치료로 권고.'
      },
      {
        badge: '해외 미국의학협회지',
        journal: 'JAMA (Journal of the American Medical Association, 2017)',
        citation: 'Paige NM et al. Association of Spinal Manipulative Therapy With Clinical Benefit and Harm for Acute Low Back Pain.',
        finding: '26개 무작위 대조 임상시험(RCT) 메타분석 결과, 척추 수기 교정 치료가 급·아급성 요통 통증 감소와 기능 점수 개선에 유의미한 임상적 이점을 보임.'
      }
    ],
    integrativePapers: [
      {
        badge: '통합·신경면역',
        journal: 'PAIN / JAMA Network Open (SCI)',
        citation: 'Manual Chuna biomechanical decompression & neuro-inflammatory cytokine modulation.',
        finding: '비수술 척추 수기 감압과 경혈 자극이 추간판 내압 감소 및 신경근 주변 물질 P(Substance P)·염증 매개체 완화에 기여함을 확인.'
      }
    ]
  },
  {
    partId: 'gongjindan',
    slug: 'chronic-fatigue-neuro-vitality',
    code: 'QNA 04',
    icon: '⚡',
    name: '만성피로 · 번아웃 · 뇌활력·면역',
    shortName: '만성피로 · 면역 · 뇌활력',
    iconEmoji: '⚡',
    enName: 'Systemic Chronic Inflammation, HPA-Axis Burnout & Neuroprotection',
    clinicLinks: [
      { label: '바른 황제공진단 · 만성피로 클리닉', href: 'gongjindan.html' }
    ],
    summary: '혈액검사 정상 소견에도 지속되는 만성피로증후군, 수험생·직장인 브레인포그, HPA 축 코르티솔 리듬 붕괴 및 미토콘드리아 에너지 대사 회복에 관한 1:1 비공개 상담 카테고리입니다.',
    overseasPapers: [
      {
        badge: '해외 네이처 메디슨',
        journal: 'Nature Medicine (2019)',
        citation: 'Furman D, Campisi J, Verdin E et al. Chronic inflammation in the etiology of disease across the life span.',
        finding: '수면 부족·만성 스트레스·일주기 교란이 유발하는 저등급 전신 만성염증(SCI)이 세포 미토콘드리아 기능 저하와 인지 피로의 핵심 기전임을 규명.'
      },
      {
        badge: '해외 신경과학',
        journal: 'Nature Reviews Neuroscience',
        citation: 'Lupien SJ et al. Effects of stress throughout the lifespan on the brain, behaviour and cognition.',
        finding: '지속적인 HPA 축 과활성 및 코르티솔 리듬 평탄화가 해마·전두엽 신경가소성과 작업 기억력을 저하시키는 신경생물학적 경로 입증.'
      }
    ],
    integrativePapers: [
      {
        badge: '통합·신경약리',
        journal: 'Journal of Ethnopharmacology / Frontiers in Pharmacology (SCI)',
        citation: 'Neuroprotective & anti-fatigue mechanisms of Gongjindan via BDNF/CREB activation.',
        finding: '사향(L-muscone)·녹용 등 복합 생약 성분이 뇌유래신경영양인자(BDNF) 발현 촉진과 산화적 피로 물질(젖산·코르티코스테론) 감소를 유도함.'
      }
    ]
  },
  {
    partId: 'syncope',
    slug: 'autonomic-nerve-syncope-vertigo',
    code: 'QNA 05',
    icon: '🧠',
    name: '자율신경실조 · 미주신경성실신 · 두통·어지럼',
    shortName: '자율신경 · 두통 · 실신',
    enName: 'Autonomic Nervous System Dysregulation, Vasovagal Syncope & Migraine',
    clinicLinks: [
      { label: '9대 정밀검진 · 자율신경 클리닉', href: 'director.html' }
    ],
    summary: '미주신경성 실신 전조(식은땀·시야 협착), 기립성 어지럼증, 만성 편두통, 흉부 두근거림 및 수면 각성 장애 등 자율신경계 균형 조절에 관한 1:1 비공개 상담 카테고리입니다.',
    overseasPapers: [
      {
        badge: '해외 유럽심장학회',
        journal: 'European Heart Journal (ESC Clinical Practice Guidelines, 2018)',
        citation: 'Brignole M et al. 2018 ESC Guidelines for the diagnosis and management of syncope.',
        finding: '반사성(미주신경성) 실신의 혈역학적 기전(말초혈관 저항 급감·서맥 반사)을 정의하고 물리적 대항압박법(PCM) 및 수분·기립 훈련을 1차 권고.'
      },
      {
        badge: '해외 자율신경생리',
        journal: 'The Lancet Neurology / Circulation',
        citation: 'Freeman R et al. Autonomic peripheral neuropathy, orthostatic intolerance & heart rate variability.',
        finding: '심박변이도(HRV) 고주파(HF)/저주파(LF) 불균형이 편두통 반동, 기립성 내성 저하 및 수면 분절의 객관적 생체지표임을 확인.'
      }
    ],
    integrativePapers: [
      {
        badge: '통합·자율신경학',
        journal: 'Autonomic Neuroscience: Basic and Clinical (SCI)',
        citation: 'Somato-autonomic reflex modulation of vagal tone & cerebral blood flow.',
        finding: '상부 경추 및 체성 감각 신경 자극이 고립로핵(NTS)을 경유하여 과도한 교감신경 흥분을 완화하고 뇌혈류 자동조절능을 안정시킴.'
      }
    ]
  },
  {
    partId: 'digest',
    slug: 'functional-dyspepsia-gut-motility',
    code: 'QNA 06',
    icon: '🌿',
    name: '기능성 소화불량 · 담적 · 역류성식도염 · 장민감',
    shortName: '소화기 · 담적 · 역류식도염',
    enName: 'Gut-Brain Axis, Delayed Gastric Emptying, GERD & Visceral Hypersensitivity',
    clinicLinks: [
      { label: '9대 복부·내시경 정밀검진 클리닉', href: 'director.html' }
    ],
    summary: '내시경상 구조적 궤양이 없음에도 반복되는 명치 경결·식후 팽만감(기능성 소화불량·담적), 인후두 역류 이물감, 과민성 장 증후군 관리에 관한 1:1 비공개 상담 카테고리입니다.',
    overseasPapers: [
      {
        badge: '해외 생리학 최고권위지',
        journal: 'Physiological Reviews (2019) / Gastroenterology (Rome IV)',
        citation: 'Cryan JF et al. The Microbiota-Gut-Brain Axis; Stanghellini V et al. Gastroduodenal Disorders.',
        finding: '장-뇌 축(Gut-Brain Axis) 미주신경 신호 이상과 위저부 이완 장애·위 배출 지연이 내시경 정상 기능성 소화불량 및 식도 역류의 핵심 원인임을 정립.'
      },
      {
        badge: '해외 소화기학',
        journal: 'Gut / Nature Reviews Gastroenterology & Hepatology',
        citation: 'Talley NJ, Ford AC. Functional Dyspepsia — New England Journal of Medicine / Gut.',
        finding: '소장·위 점막 저등급 호산구·비만세포 미세염증과 내장 과민성이 만성 상복부 압박감과 조기 포만감을 유발함을 규명.'
      }
    ],
    integrativePapers: [
      {
        badge: '통합·소화기약리',
        journal: 'Neurogastroenterology & Motility / J. Ethnopharmacology (SCI)',
        citation: 'Prokinetic & mucosal protective effects of botanical formulas on interstitial cells of Cajal (ICC).',
        finding: '천연 진피·창출·생강 유래 성분이 위장관 페이스메이커 세포(카할 간질세포, ICC) 전위를 회복시켜 위 배출 속도를 정상화함.'
      }
    ]
  },
  {
    partId: 'gut',
    slug: 'metabolic-health-visceral-adiposity',
    code: 'QNA 07',
    icon: '🔥',
    name: '대사증후군 · 내장지방 · 인슐린·건강체중',
    shortName: '대사 · 내장지방 · 다이어트',
    enName: 'Brown Adipose Thermogenesis, Insulin Sensitivity & Visceral Fat Metabolism',
    clinicLinks: [
      { label: '바른 다이어트 · 대사해독 클리닉', href: 'diet-zero.html' }
    ],
    summary: '반복된 초절식 후 찾아온 적응성 기초대사 저하, 인슐린 저항성, 식후 혈당 스파이크, 복부 내장지방 및 부종 순환 관리에 관한 1:1 비공개 상담 카테고리입니다.',
    overseasPapers: [
      {
        badge: '해외 최고권위 의학지',
        journal: 'New England Journal of Medicine (NEJM, 2009)',
        citation: 'Cypess AM et al. Identification and importance of brown adipose tissue in adult humans. NEJM.',
        finding: '성인 인체 내 활성 갈색지방(BAT)의 존재와 UCP1 미토콘드리아 비떨림 열생산(Thermogenesis)이 체질량지수 및 공복혈당 안정의 핵심 변수임을 입증.'
      },
      {
        badge: '해외 세포대사학',
        journal: 'Cell Metabolism / Obesity Reviews',
        citation: 'Rosenbaum M, Leibel RL. Adaptive thermogenesis in humans; Hall KD. Energy balance dynamics.',
        finding: '극단적 열량 제한(초절식)은 렙틴 급감과 갑상선 호르몬(T3) 저하를 통해 안정시 대사량을 영구적으로 억제하여 요요 현상을 유발함을 규명.'
      }
    ],
    integrativePapers: [
      {
        badge: '통합·대사약리',
        journal: 'International Journal of Obesity / Phytomedicine (SCI)',
        citation: 'AMPK pathway activation & white adipose browning without central sympathetic overstimulation.',
        finding: '대사 활성 생약 성분이 중추 신경 과각성 없이 AMPK 경로와 갈색지방 열생산 유전자를 자극하여 내장지방 산화를 돕는 기전 보고.'
      }
    ]
  },
  {
    partId: 'uterus',
    slug: 'reproductive-endometrial-womens-health',
    code: 'QNA 08',
    icon: '🌸',
    name: '자궁 · 난임(시험관 착상) · 생리통 · 여성건강',
    shortName: '자궁 · 난임(IVF) · 여성건강',
    enName: 'Endometrial Receptivity, Uterine Spiral Artery Perfusion & Ovarian Reserve',
    clinicLinks: [
      { label: '임신준비 · 착상 · 여성건강 클리닉', href: 'director.html' }
    ],
    summary: '자연임신 및 시험관(IVF) 배아 이식 전후 자궁내막 수용성·나선동맥 혈류 관리, 원발성·속발성 생리통, 다낭성난소증후군, 산후 회복에 관한 1:1 비공개 상담 카테고리입니다.',
    overseasPapers: [
      {
        badge: '해외 옥스퍼드 생식의학',
        journal: 'Human Reproduction Update (Oxford Academic, 2019)',
        citation: 'Craciunas L et al. Conventional and modern markers of endometrial receptivity: a systematic review and meta-analysis.',
        finding: '성공적 배아 착상은 단순 내막 두께뿐 아니라 자궁 나선동맥(Spiral Artery) 박동지수(PI) 감소와 LIF·인테그린 등 수용성 분자 발현에 좌우됨을 규명.'
      },
      {
        badge: '해외 산부인과학',
        journal: 'Fertility and Sterility / BMJ',
        citation: ' Hull MG, Practice Committee of ASRM. Endometrial perfusion, luteal support & oxidative stress in ART.',
        finding: '골반 미세순환 저하와 황체기 산화 스트레스가 난포 성숙도 및 배아 착상률을 저하시키는 주요 조절 가능 요인임을 확인.'
      }
    ],
    integrativePapers: [
      {
        badge: '통합·생식의학',
        journal: 'Complementary Therapies in Medicine / Cochrane Review',
        citation: 'Integrative pelvic microcirculation care & endometrial thickness optimization in IVF-ET cycles.',
        finding: '보조생식술(IVF) 주기에서 골반 혈류 개선 및 자궁 평활근 수축 안정화 병행 관리가 임상 임신율 향상에 긍정적 상관성을 보임.'
      }
    ]
  },
  {
    partId: 'prostate',
    slug: 'prostate-luts-pelvic-floor-vitality',
    code: 'QNA 09',
    icon: '🛡️',
    name: '전립선 · 야간뇨 · 과민성방광 · 남성활력',
    shortName: '전립선 · 배뇨 · 남성활력',
    enName: 'Male LUTS, Chronic Pelvic Pain Syndrome & Bladder Detrusor Function',
    clinicLinks: [
      { label: '바른 전립선 · 남성활력 클리닉', href: 'prostate.html' }
    ],
    summary: '새벽 수면을 깨우는 야간뇨, 잔뇨감·빈뇨, 만성 비세균성 전립선염(만성골반통증증후군), 과민성 방광 및 골반저근 기능 강화에 관한 1:1 비공개 상담 카테고리입니다.',
    overseasPapers: [
      {
        badge: '해외 유럽비뇨의학회',
        journal: 'European Urology (EAU Guidelines on Non-Neurogenic Male LUTS)',
        citation: 'Gravas S, Cornu JN et al. EAU Guidelines on Management of Non-Neurogenic Male Lower Urinary Tract Symptoms.',
        finding: '하부요로증상(LUTS) 및 야간뇨 관리에서 저녁 수분 배분 조절, 골반 울혈 회피, 골반저근 재교육이 약물 치료 못지않은 핵심 기반임을 명시.'
      },
      {
        badge: '해외 비뇨의학',
        journal: 'The Journal of Urology (AUA) / Nature Reviews Urology',
        citation: 'Nickel JC et al. UPOINT phenotype classification for Chronic Prostatitis / Chronic Pelvic Pain Syndrome (CP/CPPS).',
        finding: '만성 전립선 통증의 90% 이상이 세균 감염이 아닌 골반저근 긴장, 국소 미세순환 울혈 및 신경원성 염증의 복합 표현형임을 규명.'
      }
    ],
    integrativePapers: [
      {
        badge: '통합·비뇨약리',
        journal: 'Phytomedicine / Evidence-Based Complementary and Alternative Medicine (SCI)',
        citation: 'Anti-congestive & pelvic microcirculatory effects of botanical extracts in CP/CPPS and BPH.',
        finding: '식물성 피토스테롤·항산화 배당체가 전립선 간질 부종 및 염증성 프로스타글란딘 생성을 억제하여 배뇨 유속과 야간뇨 빈도를 개선함.'
      }
    ]
  }
];

/**
 * 블로그 대표 발행글 (오직 단 1편만 정식 공개 발행 — 시술 홍보 완전 배제 · 해외 SCI + 통합의학 학술 리뷰)
 */
const FLAGSHIP_REPRESENTATIVE_POST = {
  id: 'flagship-integrative-medical-review-01',
  slug: 'integrative-autonomic-circadian-gut-spine-health-review',
  partId: 'all',
  isFlagshipRepresentative: true,
  categoryBadge: 'FEATURED MEDICAL REVIEW · 대표 의학 리서치 저널 (단독 발행본)',
  readingTime: '약 9분 정독 · 해외 SCI 및 통합의학 논문 10편 수록',
  publishedDate: '2026-10-26',
  updatedDate: '2026-10-26',
  title: '만성 피로·소화 장애·척추 통증은 왜 함께 찾아오는가: 해외 의학 논문으로 읽는 자율신경·장-뇌 축·생체역학 통합 가이드',
  subtitleEn: 'Why Chronic Fatigue, Gut Dysmotility, and Spinal Pain Co-Occur: An Evidence-Based Synthesis of Autonomic, Microbiota–Gut–Brain, and Biomechanical Medicine',
  summary: '혈액검사와 영상검사에서 뚜렷한 구조적 이상이 없는데도 만성 피로, 식후 팽만감, 두피 열감, 어지럼증, 척추·골반 통증이 도미노처럼 이어지는 이유를 Nature Medicine, NEJM, The Lancet, Physiological Reviews 등 세계적 의학 저널과 통합생리학 연구 근거로 명쾌하게 해설합니다.',
  tldrPoints: [
    'Nature Medicine(2019) 연구진이 규명한 ‘저등급 전신 만성염증(Systemic Chronic Inflammation)’은 수면 부족·일주기 교란·좌식 생활에서 출발해 미토콘드리아 에너지 생성을 떨어뜨리고 만성 번아웃을 유발합니다.',
    'Physiological Reviews(2019)에 보고된 ‘장-뇌 축(Microbiota–Gut–Brain Axis)’ 생리에 따르면, 미주신경(Vagus Nerve) 긴장도가 저하될 때 위장관 연동운동 지연(기능성 소화불량)과 감정·수면 피로가 동시에 발생합니다.',
    'The Lancet(2018) 및 JAMA(2017) 척추 연구는 만성 목·허리 통증이 단순 추간판 마모만이 아니라 전방두부자세(거북목)·골반 경사 불균형과 심부 안정근의 신경근 조절 저하에서 비롯됨을 강조합니다.',
    '기상 직후 자연광 노출, 30회 저작과 12시간 야간 공복, 50분 주기 척추 감압 기립, 서파수면(Slow-Wave Sleep) 환경 조성 등 일상 속 생체리듬 재정렬이 다계통 회복의 가장 강력한 출발점입니다.'
  ],
  comparisonRows: [
    {
      axis: '신경·혈류 조절축 (Autonomic & Vascular)',
      signal: '아침 기립 시 아찔함, 식은땀, 편두통, 정수리 열감, 천박한 수면',
      mechanism: '교감신경 항진 및 미주신경(부교감) 브레이크 저하 · 두경부/말초 혈류 불균형',
      journal: 'European Heart Journal (2018) · Autonomic Neuroscience',
      action: '3단계 완만 기상, 종아리 근펌프 운동, 취침 전 4-7-8 호흡 및 15분 족욕'
    },
    {
      axis: '대사·소화 면역축 (Gut–Brain & Metabolic)',
      signal: '내시경 정상인 명치 답답함, 식후 식곤증, 복부 팽만, 체중 정체',
      mechanism: '위 배출 지연(카할 간질세포 리듬 저하), 인슐린 저항성, 갈색지방 열생산 감소',
      journal: 'Physiological Reviews (2019) · NEJM (2009)',
      action: '한 입 30회 저작, 채소→단백질→탄수화물 식사 순서, 12~14시간 야간 공복'
    },
    {
      axis: '척추·골격 역학축 (Spinal & Musculoskeletal)',
      signal: '뒷목 뻐근함, 엉덩이·하지 당김, 어깨 비대칭, 소아 구부정한 체형',
      mechanism: '전방두부자세로 인한 경추 하중 급증 및 요추 추간판 편측 압박·이상근 긴장',
      journal: 'The Lancet (2018) · JAMA (2017) · Spine',
      action: '모니터 눈높이 정렬, 50분 착석 후 2분 기립 신전, 일일 30분 평지 보행'
    },
    {
      axis: '호르몬·수면 재생축 (Circadian & Endocrine)',
      signal: '소아 성장 둔화, 자궁·하복부 냉감, 새벽 야간뇨로 인한 수면 분절',
      mechanism: '야간 서파수면 감소(GH 저하), 골반 미세혈류 저항 상승, 야간 항이뇨 리듬 저하',
      journal: 'JCEM · Human Reproduction Update (2019) · European Urology',
      action: '밤 10~11시 조기 소등, 비강 호흡 습도 유지, 저녁 7시 이후 수분·당류 절제'
    }
  ],
  sections: [
    {
      num: '01',
      heading: '단일 장기가 아닌 ‘연결된 생체 네트워크’로 증상을 읽어야 하는 이유',
      paragraphs: [
        '현대인이 겪는 대표적인 건강 고민인 만성 피로, 기능성 소화불량, 두피 열감과 탈모, 반복되는 목·허리 통증, 수면 장애는 겉보기에 서로 다른 진료과의 문제처럼 보입니다. 그러나 최근 10년간 발표된 시스템 생물학(Systems Biology) 및 신경면역학 연구들은 이 증상들이 결코 독립된 사건이 아니라 하나의 연결된 생리적 도미노임을 일관되게 지적합니다.',
        '2019년 세계적 의학 학술지 『Nature Medicine』에 발표된 스탠퍼드·하버드 공동 리뷰(Furman et al., 2019)는 수면 부족, 만성 심리적 스트레스, 초가공식품 위주 식단, 장시간 좌식 생활이 체내에 ‘저등급 전신 만성염증(Systemic Chronic Inflammation, SCI)’을 유도한다고 설명합니다. 급성 감염처럼 고열이나 급격한 백혈구 수치 상승을 일으키지는 않지만, 세포 내 미토콘드리아의 ATP 에너지 생산 효율을 서서히 떨어뜨려 혈액검사가 정상 범위임에도 깊은 무기력감과 브레인포그를 경험하게 만듭니다.'
      ],
      highlightQuote: '“검진 수치상 뚜렷한 병변이 발견되지 않는 미병(未病·Suboptimal Health) 단계의 핵심은 특정 장기의 파괴가 아니라, 자율신경·면역·대사 리듬 사이의 정교한 조율(Homeostasis)이 흐트러진 상태입니다.” — Nature Medicine (2019) & 통합생리학 핵심 요약'
    },
    {
      num: '02',
      heading: '자율신경계와 혈류 역학: 머리는 뜨겁고 손발은 차가워지는 생리학적 기전',
      paragraphs: [
        '인체의 자율신경계는 위기 상황에서 혈압과 심박수를 높이는 교감신경(Sympathetic)과 소화·휴식·세포 복구를 담당하는 부교감신경(Parasympathetic, 중심축: 미주신경)의 시소 균형으로 작동합니다. 만성적인 업무 긴장과 수면 분절이 누적되면 뇌간과 시상하부-뇌하수체-부신(HPA) 축이 과각성 상태에 머물면서 말초 모세혈관은 수축하고 두경부 근육과 두피 주변에는 대사성 열과 미세염증이 정체됩니다.',
        '유럽심장학회(ESC)가 『European Heart Journal』(Brignole et al., 2018)을 통해 제시한 자율신경 반사 연구에 따르면, 평소 교감신경 긴장이 과도한 사람일수록 장시간 기립이나 고온 환경에서 역설적인 미주신경 과반사(Vasovagal Reflex)가 일어나 일시적 뇌혈류 저하·어지럼증·식은땀이 나타나기 쉽습니다. 또한 피부과학 권위지 『Nature Reviews Disease Primers』는 두피 진피층의 모유두(Dermal Papilla) 미세혈류 저하와 산화 스트레스가 모낭의 성장기(Anagen)를 단축시키는 주요 미세환경 요인임을 밝히고 있습니다.'
      ]
    },
    {
      num: '03',
      heading: '장-뇌 축(Gut–Brain Axis)과 대사 열생산: 왜 긴장하면 명치가 굳고 살이 찌는가',
      paragraphs: [
        '위장관은 뇌 다음으로 많은 약 1억 개 이상의 신경세포(장관신경계, Enteric Nervous System)가 분포하여 ‘제2의 뇌’라 불립니다. 생리학 최고 권위지 『Physiological Reviews』(Cryan et al., 2019)와 기능성 위장관 질환 국제 기준(Rome IV)에 따르면, 스트레스 상황에서 미주신경 신호가 약화되면 위장 외벽 평활근의 리듬을 조율하는 카할 간질세포(Interstitial Cells of Cajal)의 전기적 서파가 느려집니다. 그 결과 내시경상 점막 궤양이 전혀 없더라도 음식물이 위장에 오래 머물며 가스와 압력을 높이고 명치 답답함과 식도 역류를 유발합니다.',
        '한편 체중과 대사 건강 역시 단순 칼로리 계산만으로는 설명되지 않습니다. 『New England Journal of Medicine(NEJM)』(Cypess et al., 2009) 및 『Cell Metabolism』 연구는 성인에게도 에너지를 열로 연소시키는 갈색지방(Brown Adipose Tissue)이 존재하며, 극단적인 굶기(초절식)는 오히려 갑상선 호르몬 전환과 갈색지방 활성도를 떨어뜨려 ‘적응성 대사 저하(Adaptive Thermogenesis)’를 초래한다고 경고합니다. 근육량과 심부 체온을 보전하면서 인슐린 스파이크를 낮추는 식사 순서가 훨씬 과학적인 대사 회복 전략인 이유입니다.'
      ]
    },
    {
      num: '04',
      heading: '척추 생체역학과 수면 재생: 거북목·골반 경사부터 성장·생식·배뇨 리듬까지',
      paragraphs: [
        '근골격계 구조는 신경과 혈관이 지나가는 물리적 통로입니다. 척추 외과학 연구(Hansraj, Spine 계열 생체역학 분석)에 따르면 고개를 정면(0°)으로 세웠을 때 성인 머리가 경추에 가하는 하중은 약 4.5~5.5kg이지만, 스마트폰이나 모니터를 보며 45°~60° 숙이는 순간 경추 디스크와 후두하근이 견뎌야 하는 부하는 22~27kg까지 치솟습니다. 『The Lancet』(Hartvigsen et al., 2018)과 『JAMA』(Paige et al., 2017)는 만성 요통과 방사통 관리에서 불필요한 침습적 처치보다 정렬 회복, 수기 역학 감압, 일상 보행 및 코어 근육의 능동적 재교육이 장기 예후를 결정한다고 결론지었습니다.',
        '나아가 밤 시간의 깊은 수면과 골반강 미세순환은 전 생애주기 건강을 좌우합니다. 소아·청소년기에는 『JCEM』 연구처럼 깊은 서파수면(Slow-Wave Sleep)과 비강 호흡이 성장호르몬(GH-IGF-1) 분비의 핵심 열쇠가 되며, 성인 여성과 남성에게는 각각 『Human Reproduction Update』(Craciunas et al., 2019)가 강조한 자궁 나선동맥 혈류 수용성과 『European Urology』(EAU 지침)가 권고한 저녁 수분 리듬·골반저근 이완이 생식 건강과 숙면(야간뇨 예방)을 지키는 핵심 기둥이 됩니다.'
      ]
    },
    {
      num: '05',
      heading: '오늘부터 바로 실천하는 근거 기반 ‘하루 4대 생체리듬 회복 프로토콜’',
      paragraphs: [
        '첫째, 【아침 일주기 앵커링(07:00~08:30)】 기상 직후 침대에서 30초간 손발을 움직인 뒤 천천히 일어나 체온과 비슷한 미온수 한 잔을 마시고, 15분간 자연 일광을 눈에 비추어 뇌 세로토닌과 밤 시간 멜라토닌 예약 타이머를 작동시킵니다.',
        '둘째, 【주간 척추 감압 & 혈당 평탄화(12:00~17:00)】 식사 시 채소·단백질을 먼저 섭취하며 한 입당 30회 저작하여 위장관 부담과 인슐린 급상승을 막고, 식후 15분 평지 보행과 업무 중 50분 간격 기립 신전 스트레칭으로 추간판 수분 확산을 돕습니다.',
        '셋째, 【저녁 소화·배뇨 휴식기(19:00~21:30)】 취침 최소 3시간 전 식사를 마무리하여 야간 위산 역류와 간 대사 피로를 예방하고, 야간뇨나 부종이 잦다면 저녁 7시 이후 수분·카페인·알코올 섭취를 줄입니다.',
        '넷째, 【심야 서파수면 & 상열하한 완화(22:00~23:00)】 취침 전 15분 미온수 족욕(38~40℃)과 4초 흡기·7초 유지·8초 호기의 복식호흡으로 교감신경 스위치를 끄고, 침실 조명을 완전히 차단해 깊은 세포 재생 수면으로 진입합니다.'
      ]
    }
  ],
  internationalReferences: [
    'Furman D, Campisi J, Verdin E, et al. Chronic inflammation in the etiology of disease across the life span. Nature Medicine. 2019;25(12):1822-1832.',
    'Cryan JF, O’Riordan KJ, Cowan CSM, et al. The Microbiota-Gut-Brain Axis. Physiological Reviews. 2019;99(4):1877-2013.',
    'Hartvigsen J, Hancock MJ, Kongsted A, et al. What low back pain is and why we need to pay attention. The Lancet. 2018;391(10137):2356-2367.',
    'Paige NM, Miake-Lye IM, Booth MS, et al. Association of Spinal Manipulative Therapy With Clinical Benefit and Harm for Acute Low Back Pain: Systematic Review and Meta-analysis. JAMA. 2017;317(14):1451-1460.',
    'Brignole M, Moya A, de Lange FJ, et al. 2018 ESC Guidelines for the diagnosis and management of syncope. European Heart Journal. 2018;39(21):1883-1948.',
    'Cypess AM, Lehman S, Williams G, et al. Identification and importance of brown adipose tissue in adult humans. New England Journal of Medicine (NEJM). 2009;360(15):1509-1517.',
    'Van Cauter E, Plat L. Physiology of growth hormone secretion during sleep. Journal of Pediatrics / Journal of Clinical Endocrinology & Metabolism.',
    'Craciunas L, Gallos I, Chu J, et al. Conventional and modern markers of endometrial receptivity: a systematic review and meta-analysis. Human Reproduction Update. 2019;25(2):202-223.',
    'Gravas S, Cornu JN, Gacci M, et al. EAU Guidelines on the Management of Non-Neurogenic Male Lower Urinary Tract Symptoms (LUTS). European Urology.',
    'Autonomic Neuroscience / Phytomedicine / Journal of Ethnopharmacology — Somato-autonomic reflex, neuroprotection (BDNF), and gut pacemaker (ICC) integrative physiology reviews.'
  ],
  faqList: [
    {
      q: '혈액검사와 내시경·MRI 결과가 정상인데도 왜 몸은 계속 피곤하고 아픈가요?',
      a: '일반 영상·혈액검사는 장기 조직의 파괴나 종양·궤양 같은 구조적 병변을 찾아내는 데 최적화되어 있습니다. 반면 자율신경 변이도 저하, 위 배출 속도 지연, 저등급 만성염증, 근막·골반의 기능적 불균형은 구조적 손상 이전 단계인 기능적 조절 장애(Functional Dysregulation)에 해당하므로 수면·식습관·생체역학 평가가 함께 이루어져야 원인을 파악할 수 있습니다.'
    },
    {
      q: '만성 피로와 소화불량을 동시에 겪을 때 가장 먼저 바꾸어야 할 생활습관 한 가지는 무엇인가요?',
      a: '취침 3시간 전 금식(야간 12시간 공복 유지)과 일정한 시각의 아침 자연광 노출입니다. 밤사이 위장관이 비워져야 미주신경 회복과 깊은 서파수면이 이루어지며, 다음 날 아침 코르티솔·세로토닌 일주기 리듬이 정상화되어 피로와 소화력이 함께 개선됩니다.'
    },
    {
      q: '개인별 증상에 대한 구체적인 상담이나 질문은 어디에서 남길 수 있나요?',
      a: '본 학술 칼럼은 객관적인 의학 정보 제공을 위해 댓글을 운영하지 않으며, 개인 건강 상담은 상단 [🩺 질환별 1:1 비공개 Q&A] 메뉴에서 Google·카카오톡·네이버 간편 회원가입 후 철저한 비공개로 안전하게 질문하실 수 있습니다.'
    }
  ]
};

const INITIAL_DISEASE_BLOG_POSTS = [FLAGSHIP_REPRESENTATIVE_POST];
const DISEASE_BLOG_CATEGORIES = [
  {
    partId: 'all',
    slug: 'integrative-medical-insight',
    name: '통합의학 리서치 저널'
  }
];

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildStandaloneWpPostHtml(post) {
  const canonicalUrl = `https://www.bareunhaniwon.com/${post.slug}/`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalWebPage',
        '@id': canonicalUrl + '#webpage',
        url: canonicalUrl,
        name: post.title,
        headline: post.title,
        alternativeHeadline: post.subtitleEn,
        description: post.summary,
        inLanguage: 'ko-KR',
        datePublished: post.publishedDate,
        dateModified: post.updatedDate,
        citation: post.internationalReferences
      },
      {
        '@type': 'FAQPage',
        '@id': canonicalUrl + '#faq',
        mainEntity: (post.faqList || []).map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.a
          }
        }))
      }
    ]
  };

  const tldrHtml = post.tldrPoints.map(pt => `<li style="margin-bottom:10px;line-height:1.72;">${escapeHtml(pt)}</li>`).join('');
  const tableRowsHtml = post.comparisonRows.map(r => `
    <tr>
      <td style="padding:12px 14px;border-bottom:1px solid #E2E8F0;font-weight:700;color:#0F172A;">${escapeHtml(r.axis)}</td>
      <td style="padding:12px 14px;border-bottom:1px solid #E2E8F0;color:#334155;">${escapeHtml(r.signal)}</td>
      <td style="padding:12px 14px;border-bottom:1px solid #E2E8F0;color:#334155;">${escapeHtml(r.mechanism)}</td>
      <td style="padding:12px 14px;border-bottom:1px solid #E2E8F0;font-weight:600;color:#1D4ED8;">${escapeHtml(r.journal)}</td>
    </tr>`).join('');

  const sectionsHtml = post.sections.map(s => `
    <section style="margin-top:34px;">
      <div style="font-size:0.78rem;font-weight:800;letter-spacing:0.08em;color:#2563EB;margin-bottom:6px;">SECTION ${escapeHtml(s.num)}</div>
      <h2 style="font-size:1.38rem;font-weight:800;color:#0F172A;line-height:1.42;margin:0 0 14px;">${escapeHtml(s.heading)}</h2>
      ${s.paragraphs.map(p => `<p style="font-size:1.02rem;line-height:1.86;color:#1E293B;margin:0 0 14px;">${escapeHtml(p)}</p>`).join('')}
      ${s.highlightQuote ? `<blockquote style="margin:18px 0;padding:16px 20px;border-left:4px solid #2563EB;background:#F8FAFC;border-radius:0 12px 12px 0;font-weight:600;color:#0F172A;line-height:1.72;">${escapeHtml(s.highlightQuote)}</blockquote>` : ''}
    </section>`).join('');

  const refsHtml = post.internationalReferences.map((ref, idx) =>
    `<li style="margin-bottom:8px;font-size:0.88rem;color:#475569;line-height:1.62;">[${idx + 1}] ${escapeHtml(ref)}</li>`
  ).join('');

  return `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
<article style="max-width:880px;margin:36px auto;padding:36px 28px;background:#FFFFFF;border:1px solid #E2E8F0;border-radius:24px;font-family:'Pretendard',-apple-system,sans-serif;color:#0F172A;">
  <div style="display:inline-block;padding:6px 14px;border-radius:999px;background:#EFF6FF;color:#1D4ED8;font-size:0.8rem;font-weight:800;margin-bottom:14px;">${escapeHtml(post.categoryBadge)}</div>
  <h1 style="font-size:clamp(1.6rem,3vw,2.2rem);font-weight:800;line-height:1.34;color:#0F172A;margin:0 0 10px;">${escapeHtml(post.title)}</h1>
  <p style="font-size:0.92rem;color:#64748B;margin:0 0 22px;">${escapeHtml(post.subtitleEn)} · ${escapeHtml(post.readingTime)}</p>
  <p style="font-size:1.06rem;line-height:1.8;color:#334155;padding:18px 20px;background:#F8FAFC;border-radius:16px;border:1px solid #E2E8F0;margin-bottom:26px;">${escapeHtml(post.summary)}</p>

  <div style="padding:22px 24px;border-radius:18px;background:#F0FDF4;border:1.5px solid #86EFAC;margin-bottom:28px;">
    <h2 style="font-size:1.08rem;font-weight:800;color:#14532D;margin:0 0 12px;">📌 핵심 의학 인사이트 요약 (Executive Summary)</h2>
    <ul style="margin:0;padding-left:20px;color:#14532D;font-size:0.96rem;">${tldrHtml}</ul>
  </div>

  <div style="overflow-x:auto;margin-bottom:30px;border:1px solid #E2E8F0;border-radius:16px;">
    <table style="width:100%;border-collapse:collapse;font-size:0.9rem;text-align:left;">
      <thead>
        <tr style="background:#0F172A;color:#FFFFFF;">
          <th style="padding:12px 14px;">생체 조절축</th>
          <th style="padding:12px 14px;">주요 일상 신호</th>
          <th style="padding:12px 14px;">생리학적 기전</th>
          <th style="padding:12px 14px;">관련 해외·통합 학술지</th>
        </tr>
      </thead>
      <tbody>${tableRowsHtml}</tbody>
    </table>
  </div>

  ${sectionsHtml}

  <section style="margin-top:38px;padding-top:24px;border-top:1.5px solid #E2E8F0;">
    <h2 style="font-size:1.15rem;font-weight:800;color:#0F172A;margin:0 0 14px;">📚 참고 해외 의학 및 통합생리학 학술 문헌 (References)</h2>
    <ol style="margin:0;padding-left:18px;list-style:none;">${refsHtml}</ol>
  </section>

  <div style="margin-top:34px;padding:22px 24px;border-radius:18px;background:linear-gradient(135deg,#0F172A 0%,#1E293B 100%);color:#FFFFFF;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:14px;">
    <div>
      <div style="font-size:0.78rem;font-weight:800;color:#93C5FD;margin-bottom:4px;">PRIVATE MEDICAL Q&amp;A · 회원 전용 1:1 비공개 질환 상담</div>
      <div style="font-size:1.05rem;font-weight:800;">질환별 개인 증상 질문은 별도 전용 Q&amp;A 메뉴(비공개)에서 안전하게 남겨주세요.</div>
    </div>
    <a href="/ask-doctor/?tab=qna" style="display:inline-block;padding:11px 20px;border-radius:999px;background:#3B82F6;color:#FFFFFF;font-weight:800;font-size:0.9rem;text-decoration:none;">🩺 질환별 1:1 비공개 Q&amp;A 바로가기 →</a>
  </div>
</article>`;
}

module.exports = {
  DISEASE_QNA_CATEGORIES,
  FLAGSHIP_REPRESENTATIVE_POST,
  DISEASE_BLOG_CATEGORIES,
  INITIAL_DISEASE_BLOG_POSTS,
  buildStandaloneWpPostHtml
};
