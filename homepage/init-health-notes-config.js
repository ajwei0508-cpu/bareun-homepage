/**
 * 바른한의원 3D 인체모형 · 『오늘의 건강 글』 72편 통합 커스텀 설정 생성기
 * - 광고성·기계적 문구(AEO/GEO/요약카드/5줄 요약/진료유도) 0%
 * - 상단 4단 요약과 중복되지 않는 순수 건강 정보형 [상세히] 심층 칼럼 + 이어서 읽기 BEST 2 + 유튜브/네이버/카카오톡 아이콘 설정 생성
 */
const fs = require('fs');
const path = require('path');
const { BODY_3D_AUTO_NOTES, CLINIC_EXPLORE_MENUS } = require('./body-3d-auto-notes-data.js');

const PURE_PART_DEEP_TEMPLATES = {
  knee: {
    illustImg: 'illust_knee_growth_care.jpg',
    illustCaption: '허벅지뼈·종아리뼈 끝 성장 연골의 세포 분열과 낮 활동·깊은 수면 리듬의 상호작용',
    bodyPrinciple: '성장기 아이들의 키 성장은 무릎 위아래 끝부분에 자리한 말랑한 성장 연골 세포가 밤사이 촘촘히 늘어나고, 그 자리에 칼슘과 단백질이 단단하게 채워지면서 이루어집니다. 특히 성장 연골 안쪽에는 굵은 혈관이 직접 닿아 있지 않아, 낮 동안 걷고 가볍게 뛸 때 연골이 스펀지처럼 눌렸다 펴지는 압력 변화로 주변 영양액을 빨아들이고 밤사이 깊은 숙면 구간에 분비되는 성장호르몬과 만나 뼈 길이를 키우게 됩니다.',
    dailyCareGuide: '따라서 낮에는 햇볕 아래에서 발바닥 전체로 땅을 가볍게 딛는 활동으로 성장 연골에 기분 좋은 탄력을 주고, 저녁 식사 이후에는 위장과 코 호흡 길을 편안하게 비워 밤 10시 무렵부터 끊김 없는 깊은 잠에 들 수 있도록 하루 리듬을 이어 주는 것이 큰 도움이 됩니다.',
    signals: [
      '잠들기 전 종아리나 무릎 앞쪽이 당긴다며 다리를 자주 주물러 달라고 하는지 살펴보세요.',
      '잘 때 입을 살짝 벌리고 자거나 코가 자주 막혀 깊은 잠에서 자주 뒤척이지 않는지 확인해 주세요.',
      '신발 뒤축 한쪽만 유독 빨리 닳거나 편하게 서 있을 때 양쪽 무릎·골반 높이가 다르지 않은지 체크해 보세요.'
    ]
  },
  cervical: {
    illustImg: 'illust_cervical_hairloss.jpg',
    illustCaption: '목뼈의 자연스러운 C자 곡선과 머리·두피로 이어지는 미세혈류 순환 경로',
    bodyPrinciple: '머리카락 뿌리를 감싸고 산소와 영양분을 건네주는 두피 속 미세혈관들은 모두 목과 뒷머리 길목을 지나 정수리까지 올라갑니다. 고개를 앞으로 길게 빼거나 어금니를 꽉 깨무는 긴장 상태가 길어지면 뒷목 아래쪽 깊은 근육들이 단단하게 뭉치면서 혈관 통로가 좁아지고, 아래로 자연스럽게 내려가야 할 체열이 머리 위쪽에 머물러 두피 수분 장벽이 쉽게 메마르게 됩니다.',
    dailyCareGuide: '평소 40~50분마다 화면에서 눈을 떼고 턱을 살짝 당겨 목 뒷선을 길게 펴 주는 작은 습관만으로도 두피로 향하는 혈류 흐름이 한결 부드러워집니다. 저녁에는 미지근한 물로 두피 노폐물을 씻어낸 뒤 뿌리 속 물기까지 시원한 바람으로 말려 두피 토양을 보송하고 편안하게 지켜 주세요.',
    signals: [
      '오후가 되면 정수리나 관자놀이 주변이 손목보다 유독 후끈거리고 쉽게 기름지거나 가렵지 않은지 살펴보세요.',
      '뒷머리 아래쪽 머리카락과 정수리·가르마 쪽 머리카락을 손끝으로 만졌을 때 굵기 차이가 느껴지는지 확인해 보세요.',
      '아침에 일어났을 때 뒷목과 어깨가 묵직하게 뭉쳐 있고 눈까지 쉽게 피로해지지 않는지 체크해 보세요.'
    ]
  },
  lumbar: {
    illustImg: 'illust_lumbar_pelvis.jpg',
    illustCaption: '허리 물렁뼈(디스크)의 수분 순환과 몸의 중심을 받치는 골반 균형 구조',
    bodyPrinciple: '허리 뼈마디 사이에서 충격을 흡수하는 물렁뼈(디스크)는 어른이 된 뒤에는 직접 연결된 혈관이 거의 없어, 허리와 골반이 바른 정렬로 움직일 때 스펀지처럼 수분과 영양을 머금으며 탄력을 유지합니다. 반대로 구부정하게 오래 앉거나 한쪽 다리에만 무게를 싣는 자세가 반복되면 특정 마디 뒤쪽으로만 압력이 쏠려 물렁뼈가 수분을 잃고 주변 속근육과 신경 길목까지 예민해집니다.',
    dailyCareGuide: '허리와 골반을 편안하게 지키는 핵심은 갑자기 무리한 근력 운동을 하기보다, 앉아 있는 중간중간 자리에서 일어나 기지개를 켜며 눌려 있던 물렁뼈에 수분이 다시 스며들 틈을 만들어 주는 것입니다. 아침 기상 직후에는 몸이 아직 굳어 있으므로 침대 옆에서 가볍게 숨을 고른 뒤 천천히 움직이는 습관이 안전합니다.',
    signals: [
      '아침에 침대에서 처음 몸을 일으킬 때 허리가 뻣뻣하게 굳어 한참 움직여야 풀리지 않는지 살펴보세요.',
      '세수하거나 양말을 신을 때처럼 상체를 살짝 숙이는 동작에서 허리나 엉덩이 위쪽이 찌릿하지 않은지 확인해 보세요.',
      '거울 앞에 편히 섰을 때 양쪽 어깨나 골반 높이가 다르고 바지나 치마가 한쪽으로만 돌아가지 않는지 체크해 보세요.'
    ]
  },
  gongjindan: {
    illustImg: 'illust_gongjindan_heart_brain.jpg',
    illustCaption: '낮과 밤의 생체 활력 리듬과 뇌·심장 에너지 순환의 조화',
    bodyPrinciple: '우리 몸의 맑은 집중력과 활력은 아침 햇살과 함께 깨어나 낮 동안 에너지를 고르게 쓰고, 밤에는 긴장 스위치를 내려 세포 속 에너지 발전소를 차분히 재충전하는 하루 생체 시계에서 비롯됩니다. 과로와 생각 과부하, 얕은 흉식 호흡이나 잦은 단 음료 섭취가 이어지면 뇌는 쉬는 시간에도 가속 페달을 밟은 채 에너지를 소모하게 되어 잠을 자도 개운하지 않은 피로가 누적됩니다.',
    dailyCareGuide: '오후마다 쉽게 방전되는 느낌이 들 때는 카페인이나 당분으로 순간적인 각성을 끌어내기보다, 잠시 눈을 감고 배 아래까지 깊고 느리게 숨을 내쉬어 과열된 신경계를 식혀 주는 것이 좋습니다. 아침에 눈을 뜬 직후 창가 자연광을 5분간 바라보면 밤사이 수면 리듬과 낮 활력 시계가 한결 또렷하게 맞춰집니다.',
    signals: [
      '아침에 눈을 떴을 때 개운함보다 몸이 솜처럼 무겁고 오후 3시 무렵 급격히 집중력이 떨어지는지 살펴보세요.',
      '피곤한데도 막상 밤에 누우면 머릿속 생각이 멈추지 않아 얕은 잠을 자거나 자주 깨지 않는지 확인해 보세요.',
      '조금만 신경 쓰는 일이 있어도 한숨이 자주 나오고 입안이 쉽게 마르거나 눈이 뻑뻑해지지 않는지 체크해 보세요.'
    ]
  },
  syncope: {
    illustImg: 'illust_syncope_autonomic.jpg',
    illustCaption: '자세 변화에 맞춰 혈압과 뇌 혈류를 자동으로 조절하는 신경 균형 원리',
    bodyPrinciple: '앉거나 누워 있다가 일어설 때 중력 때문에 하체 쪽으로 쏠리는 혈액을 심장과 머리 끝까지 1초 안에 다시 끌어올려 주는 것이 우리 몸의 자동조절 신경과 종아리 근육 펌프입니다. 수분이 부족하거나 수면이 모자란 날, 혹은 덥고 공기가 탁한 곳에서 긴장까지 겹치면 이 자동 조절 반사가 잠깐 흔들리면서 눈앞이 하얘지거나 식은땀·귀 먹먹함 같은 전조 신호가 나타날 수 있습니다.',
    dailyCareGuide: '이러한 어지럼을 예방하려면 아침 기상 후 미지근한 물 한 잔으로 혈액량을 넉넉히 채워 주고, 자리에서 일어설 때는 발목을 위아래로 서너 번 까딱여 종아리 혈류 펌프를 먼저 깨운 뒤 천천히 일어나는 습관이 큰 도움이 됩니다. 만약 아찔한 전조감이 느껴지면 참지 말고 즉시 자리에 앉거나 다리를 교차해 힘을 주는 것이 가장 안전한 대처법입니다.',
    signals: [
      '앉았다 일어설 때나 따뜻한 물로 샤워한 직후에 수 초 동안 눈앞이 하얘지거나 아찔한 느낌이 드는지 살펴보세요.',
      '사람이 많고 환기가 덜 된 실내에 가만히 서 있을 때 속이 울렁거리거나 식은땀이 먼저 나는지 확인해 보세요.',
      '전조 신호가 느껴질 때 무리해서 서서 버티지 말고 즉시 앉거나 다리에 힘을 주어 혈류를 올려주는 습관을 기억해 주세요.'
    ]
  },
  digest: {
    illustImg: 'illust_gut_metabolism.jpg',
    illustCaption: '위장 근육의 부드러운 물결 움직임과 뇌·소화기관 사이의 신경 신호 연결',
    bodyPrinciple: '위장은 단순히 음식을 담아 두는 주머니가 아니라, 겉을 감싼 매끈한 근육층이 일정한 박자로 물결치듯 움직이며 음식물을 부드럽게 반죽해 아래 장으로 내려보내는 섬세한 기관입니다. 시간에 쫓겨 급하게 식사하거나 긴장한 채로 늦은 밤 음식을 먹으면 위장 운동을 지휘하는 편안한 부교감 신경 신호가 약해져, 겉보기 상처가 없어도 명치가 단단히 막힌 듯 답답하고 가스가 쉽게 차오르게 됩니다.',
    dailyCareGuide: '속이 편안해지려면 무엇을 먹느냐 못지않게 첫 세 입을 평소보다 두 배 천천히 씹어 위장에 준비 신호를 보내 주는 것이 중요합니다. 식사 직후 바로 눕거나 구부정하게 앉기보다 10분 정도 가볍게 걸어 주면 위장 근육의 물결 운동이 자연스럽게 살아나 트림과 더부룩함이 한결 줄어듭니다.',
    signals: [
      '한 끼 식사를 10~15분 만에 급하게 마치고 식후 바로 의자에 구부정하게 앉아 있지 않은지 살펴보세요.',
      '조금만 먹어도 윗배가 금방 단단하게 부풀어 오르고 트림이나 목 이물감이 자주 이어지는지 확인해 보세요.',
      '잠들기 전 최소 3시간 동안 위장이 비워지고 쉴 수 있는 밤 공복 시간이 확보되고 있는지 체크해 보세요.'
    ]
  },
  gut: {
    illustImg: 'diet_minimal_card4_stage2_core_lipolysis.jpg',
    illustCaption: '근육과 체온 에너지를 지키면서 식후 혈당 물결을 완만하게 다스리는 대사 원리',
    bodyPrinciple: '건강하고 가뿐한 몸은 무조건 굶어서 열량을 깎아낼 때가 아니라, 에너지를 스스로 태우는 근육과 따뜻한 기초 체온을 지키면서 식사 후 혈당 물결이 완만하게 흐르도록 다스릴 때 만들어집니다. 식사를 극단적으로 거르면 우리 몸은 위기 상황으로 인식해 오히려 에너지 소비 스위치를 낮추고 다음 식사에서 들어오는 당분을 복부 주변에 먼저 비축하려 하기 때문입니다.',
    dailyCareGuide: '일상에서 대사 흐름을 깨우는 가장 쉬운 방법은 식탁에서 채소와 해조류, 두부·생선·달걀 같은 단백질을 먼저 천천히 맛보고 밥이나 면류를 뒤이어 먹는 식사 순서를 지키는 것입니다. 여기에 식후 15분 가벼운 산책을 더하면 핏속 당분이 지방으로 쌓이는 대신 허벅지와 종아리 근육의 에너지로 산뜻하게 소모됩니다.',
    signals: [
      '점심 식사 직후 눈꺼풀이 무거워질 만큼 졸음이 쏟아지거나 오후마다 단 음식이 강하게 당기는지 살펴보세요.',
      '아침과 저녁에 반지나 신발이 꽉 끼는 부종 차이가 크고 복부 주변만 유독 차갑고 단단해지지 않는지 확인해 보세요.',
      '식사할 때 채소와 단백질을 먼저 천천히 씹어 먹고 밥·면류를 나중에 먹는 순서가 지켜지는지 체크해 보세요.'
    ]
  },
  uterus: {
    illustImg: 'illust_uterus_fertility.jpg',
    illustCaption: '아랫배 깊은 곳의 따뜻한 미세혈류 순환과 규칙적인 생체 호르몬 리듬',
    bodyPrinciple: '여성의 편안한 월경 주기와 아랫배 컨디션은 골반 깊은 곳까지 따뜻한 혈액이 막힘없이 흐르고 낮과 밤의 생체 호르몬 시계가 일정한 리듬을 유지할 때 안정됩니다. 수면 부족과 긴장, 차가운 음료 습관이나 골반을 조이는 옷차림으로 하복부 순환이 정체되면 손발과 아랫배는 서늘해지는 반면 얼굴과 가슴 쪽으로는 열감이 오르면서 주기마다 묵직한 통증과 부종이 깊어지기 쉽습니다.',
    dailyCareGuide: '평소 찬 얼음 음료 대신 체온과 비슷한 따뜻한 물을 가까이하고, 저녁에는 배꼽 아래 아랫배와 발목을 따뜻하게 감싸 골반 주변 혈관이 부드럽게 이완되도록 도와주세요. 골반을 좌우로 천천히 풀어 주는 가벼운 스트레칭과 일정한 취침 시간만 지켜도 매달 찾아오는 몸의 파도가 훨씬 잔잔해집니다.',
    signals: [
      '평소 손발 끝과 배꼽 아래 아랫배를 만졌을 때 차가운 기운이 돌고 주기 전후로 부종이나 피로가 심해지는지 살펴보세요.',
      '주기가 앞당겨지거나 늦어지는 폭이 커지고 평소보다 뭉친 혈이나 허리·골반 뻐근함이 늘어나지 않았는지 확인해 보세요.',
      '따뜻한 음료를 플라스틱 일회용 컵 대신 유리·도자기 컵에 마시고 아랫배 보온을 챙기고 있는지 체크해 보세요.'
    ]
  },
  prostate: {
    illustImg: 'illust_prostate_care.jpg',
    illustCaption: '방광과 골반 바닥 근육의 편안한 이완 및 하체 혈액 순환의 균형',
    bodyPrinciple: '소변을 편안하게 모았다가 시원하게 비워 내는 과정은 방광과 그 아래를 해먹처럼 받치는 골반 바닥 근육들이 부드럽게 이완·수축하고 주변 미세혈류가 원활히 순환할 때 자연스럽게 이루어집니다. 오랜 시간 의자나 운전석에 앉아 아래쪽이 눌리거나 저녁 늦게 카페인·찬 음료를 마시는 습관이 쌓이면 골반 아래쪽에 혈액이 고이고 방광 감각 신경이 예민해져 밤잠을 깨우는 잦은 배뇨로 이어지기 쉽습니다.',
    dailyCareGuide: '하체와 골반 순환을 편안하게 돕기 위해 50분 앉아 있었다면 5분은 자리에서 일어나 허벅지와 엉덩이 근육을 가볍게 움직여 눌려 있던 혈류를 풀어 주세요. 또한 저녁 식사 이후에는 수분 섭취를 조금씩 줄이고 잠들기 전 따뜻한 물 반신욕이나 족욕으로 아랫배와 골반 바닥 근육의 긴장을 달래 주면 밤사이 숙면에 큰 도움이 됩니다.',
    signals: [
      '잠자리에 든 뒤 아침에 일어나기 전까지 소변 때문에 한 번 이상 잠에서 깨어 깊은 숙면이 끊기지 않는지 살펴보세요.',
      '한 번에 50분 이상 의자나 운전석에 쉬지 않고 앉아 있은 날 저녁에 아랫배나 회음부가 묵직하지 않은지 확인해 보세요.',
      '저녁 식사 이후 커피·녹차·차가운 물 섭취를 줄이고 따뜻한 물 반신욕이나 좌욕으로 하체를 이완해 주는지 체크해 보세요.'
    ]
  }
};

function buildPureDeepTitle(ep) {
  const theme = String(ep.theme || '').trim();
  const kw = String(ep.keyword || '').trim();
  if (theme) {
    return `${theme}, 우리 몸속에서는 어떤 변화가 일어날까요?`;
  }
  return `${kw}, 왜 작은 생활 습관 차이가 몸의 리듬을 바꿀까요?`;
}

function generateInitialHealthNotesConfig() {
  const parts = CLINIC_EXPLORE_MENUS.map((m, idx) => {
    const tpl = PURE_PART_DEEP_TEMPLATES[m.id] || PURE_PART_DEEP_TEMPLATES.lumbar;
    return {
      id: m.id,
      order: idx + 1,
      partLabel: m.partLabel,
      menuTitle: m.menuTitle,
      defaultIllustImg: tpl.illustImg,
      defaultIllustCaption: tpl.illustCaption
    };
  });

  const notes = [];
  for (const [partId, episodes] of Object.entries(BODY_3D_AUTO_NOTES)) {
    const tpl = PURE_PART_DEEP_TEMPLATES[partId] || PURE_PART_DEEP_TEMPLATES.lumbar;
    for (const ep of episodes) {
      const topicLabel = String(ep.theme || ep.keyword || ep.partLabel || '').trim();
      notes.push({
        id: ep.id,
        partId,
        partLabel: ep.partLabel || partId,
        enabled: true,
        publishDate: ep.publishDate || '2026-10-27',
        theme: ep.theme || '',
        keyword: ep.keyword || '',
        questionTitle: ep.questionTitle || '',
        empathyLines: Array.isArray(ep.empathyLines) ? [...ep.empathyLines] : [],
        truthLines: Array.isArray(ep.truthLines) ? [...ep.truthLines] : [],
        mythLines: Array.isArray(ep.mythLines) ? [...ep.mythLines] : ['', ''],
        checkList: Array.isArray(ep.checkList) ? [...ep.checkList] : [],
        academicBasis: ep.academicBasis || '국제 의학 학술지 및 생리학 연구 보고',
        // [🔍 상세히] 순수 정보형 심층 칼럼 필드 (스튜디오에서 72편 개별 직접 수정 가능)
        deepEnabled: true,
        deepIllustImg: tpl.illustImg,
        deepIllustCaption: tpl.illustCaption,
        deepTitle: buildPureDeepTitle(ep),
        deepParagraphs: [
          tpl.bodyPrinciple,
          `무엇보다 '${topicLabel}' 문제를 살필 때는 단편적인 증상 하나만 보기보다 하루의 호흡·자세·식사·수면 흐름을 함께 돌아보는 시선이 필요합니다. ${tpl.dailyCareGuide}`
        ],
        deepReference: `참고 문헌 · ${ep.academicBasis || '국제 의학 학술지 생리학 보고'}`,
        deepSignalsTitle: '가정에서 함께 살펴보면 좋은 3가지 신호',
        deepSignals: [...tpl.signals]
      });
    }
  }

  return {
    version: '1.0',
    updatedAt: new Date().toISOString(),
    globalSettings: {
      detailBtnLabel: '상세히',
      expandBarTitle: '이 주제의 깊은 원리가 더 궁금하신가요?',
      expandBarSub: '해부학 일러스트 · 우리 몸 생리 원리 · 놓치기 쉬운 생활 신호 3가지',
      expandedBarTitle: '심층 건강 칼럼 열람 중',
      bestReadCount: 2,
      bestReadBadge: '이어서 읽기 BEST 2',
      bestReadSub: '편 많이 읽은 글',
      channelBarLabel: '더 많은 건강 이야기 · 편하게 물어보기',
      channels: {
        youtube: {
          enabled: true,
          label: '유튜브',
          url: 'https://www.youtube.com/@bareunhaniwon'
        },
        naver: {
          enabled: true,
          label: '네이버',
          url: 'https://blog.naver.com/wei0508'
        },
        kakao: {
          enabled: true,
          label: '카카오톡',
          url: 'https://pf.kakao.com/_ykxcLK'
        }
      }
    },
    parts,
    notes
  };
}

if (require.main === module) {
  const cfg = generateInitialHealthNotesConfig();
  const outPath = path.join(__dirname, 'health-notes-custom-config.json');
  const defPath = path.join(__dirname, 'health-notes-custom-config.default.json');
  const jsonStr = JSON.stringify(cfg, null, 2) + '\n';
  fs.writeFileSync(outPath, jsonStr, 'utf8');
  fs.writeFileSync(defPath, jsonStr, 'utf8');
  console.log(`✅ Generated health-notes-custom-config.json (${cfg.notes.length} notes across ${cfg.parts.length} parts)`);
}

module.exports = {
  PURE_PART_DEEP_TEMPLATES,
  generateInitialHealthNotesConfig
};
