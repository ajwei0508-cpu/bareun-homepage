/**
 * 바른한의원 대전본점 · 독자적인 Node.js 9대 질환 블로그 & 3D 건강노트 완전 자동화 엔진 (auto-blog-engine.js)
 *
 * [핵심 역할]
 * 1. 외부 Google Apps Script(GAS) 의존 없이 로컬/실서버 Node 환경에서 9대 질환 건강 글 & 12단 임상 칼럼을 자동 생성·검수·누적
 * 2. AI 3단계 자가 검수 게이트(auditNoteThreeStage) 100% 통과 보장:
 *    - 1. 일상 속 불편함 (2줄)
 *    - 2. 의학적 진실 (2줄)
 *    - 3. 흔히 하는 오해 (2줄)
 *    - 4. 오늘 바로 해보는 1분 체크 (체크박스 2개)
 * 3. Gemini API 키 설정 시 실시간 LLM 생성 + 미설정 시에도 멈추지 않는 9대 질환 임상 토픽 뱅크 기반 무중단 자동 발행
 * 4. body-3d-auto-notes-data.js, bareun-local-db.json, clinic-explore-menu-config.json 및 WordPress REST API 실시간 동기화
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const {
  BODY_3D_AUTO_NOTES,
  CLINIC_EXPLORE_MENUS,
  auditNoteThreeStage
} = require('./body-3d-auto-notes-data.js');

const {
  DISEASE_QNA_CATEGORIES,
  DISEASE_BLOG_CATEGORIES,
  INITIAL_DISEASE_BLOG_POSTS,
  FLAGSHIP_REPRESENTATIVE_POST
} = require('./disease-blog-seed-data.js');

const DB_PATH = path.join(__dirname, 'private-qna-db.json');
const MENU_CONFIG_PATH = path.join(__dirname, 'clinic-explore-menu-config.json');
const AUTO_LOG_PATH = path.join(__dirname, 'auto-blog-run-log.json');

// 9대 질환별 11월 신규 자동 발행 에피소드 풀 (3단계 자가 검수: 질문형 제목, 공감 2줄, 진실 2줄, 오해 2줄, 체크 2줄, 금지어 0건, 키워드 포함)
const NOVEMBER_AUTO_EPISODES = {
  knee: [
    {
      id: 'knee-20261104',
      publishDate: '2026-11-04',
      partLabel: '무릎 성장판',
      theme: '아침 식사 결식과 성장 에너지',
      keyword: '키 성장',
      academicBasis: 'Journal of Adolescent Health / Pediatrics (아침 결식에 따른 오전 혈당 저하 및 성장기 단백질 합성 효율 감소)',
      questionTitle: '아침잠이 많아 아침밥을 자주 거르는 아이, 키 성장에도 손해가 될까요?',
      empathyLines: [
        '아침마다 깨우기 전쟁을 치르다 보니 물 한 모금만 겨우 마시게 해서 등교시키는 날이 태반이에요.',
        '점심과 저녁만 잘 챙겨 먹으면 괜찮을 줄 알았는데 아침을 거르면 키 성장에 불리하다는 말을 들어 마음이 쓰입니다.'
      ],
      truthLines: [
        '밤새 무릎 성장 연골을 키우느라 에너지를 다 쓴 아이 몸은 아침에 양질의 단백질과 영양분이 들어와야 낮 동안 뼈와 근육을 단단히 채웁니다.',
        '아침을 비운 채 등교하면 몸이 에너지를 아끼기 위해 성장 스위치를 낮추고, 오히려 하교 후 달고 기름진 간식을 폭식하기 쉬워 키 성장에 방해가 됩니다.'
      ],
      mythLines: [
        '아침밥 대신 잠을 20분이라도 더 재우는 것이 무조건 키 크는 데 이득이라고 생각하기 쉽습니다.',
        '밤잠은 전날 밤 10시 이전에 일찍 재워 확보하고, 아침에는 따뜻한 달걀이나 두부처럼 소화 잘되는 단백질을 두세 입이라도 먹여 보내는 것이 훨씬 유익합니다.'
      ],
      checkList: [
        '최근 일주일 동안 아이가 아침에 물이나 우유 외에 따뜻한 음식을 씹어 먹고 등교한 날이 며칠인지 세어 보세요.',
        '오후 3~4시 무렵 하교 직후에 아이가 유독 배고파하며 과자나 달콤한 빵, 음료수를 급하게 찾지 않는지 살펴보세요.'
      ]
    },
    {
      id: 'knee-20261111',
      publishDate: '2026-11-11',
      partLabel: '무릎 성장판',
      theme: '겨울철 실내 활동과 비타민 D 햇볕 자극',
      keyword: '성장 연골',
      academicBasis: 'Journal of Bone and Mineral Research (소아기 일조량·비타민 D 합성과 성장 연골 칼슘 침착 효율)',
      questionTitle: '추운 날씨에 집에만 머무는 아이, 왜 햇볕을 안 쬐면 성장 연골도 힘이 빠질까요?',
      empathyLines: [
        '날씨가 쌀쌀해지니 아이가 학교와 학원만 다녀오면 따뜻한 방 안에서만 뒹굴거리며 밖으로 나가려 하질 않아요.',
        '칼슘이 든 음식은 매일 챙겨 주는데도 햇볕을 쬐며 뛰어놀지 않으면 뼈가 단단하게 자라지 못한다는 이야기가 걱정됩니다.'
      ],
      truthLines: [
        '입으로 먹은 칼슘이 허벅지 뼈와 종아리 뼈 끝의 성장 연골까지 배달되려면 낮 동안 햇볕을 쬘 때 피부에서 만들어지는 비타민 D가 안내자 역할을 해야 합니다.',
        '여기에 가볍게 땅을 딛고 뛰는 기분 좋은 자극이 더해져야 성장 연골 세포들이 활발하게 깨어나 뼈 길이를 힘차게 늘려 나갑니다.'
      ],
      mythLines: [
        '추운 계절에는 감기에 걸리지 않도록 바깥 활동을 완전히 줄이고 집 안에서 영양제만 먹이는 것이 최선이라고 믿기 쉽습니다.',
        '낮 12시 무렵 가장 따뜻한 시간에 15분만이라도 햇볕 아래서 산책하고 가볍게 발을 굴러 주어야 뼈가 영양분을 제대로 흡수합니다.'
      ],
      checkList: [
        '오늘 하루 아이가 창문 유리를 거치지 않은 바깥 자연 햇볕을 직접 쬐며 걸은 시간이 15분 이상 되는지 확인해 보세요.',
        '저녁에 거실 매트 위에서 발뒤꿈치를 살짝 들고 가볍게 통통 뛰는 동작을 스무 번 했을 때 아이 호흡과 표정이 가뿐한지 살펴보세요.'
      ]
    }
  ],
  cervical: [
    {
      id: 'cervical-20261104',
      publishDate: '2026-11-04',
      partLabel: '목뼈 · 두피 혈관',
      theme: '뜨거운 바람 드라이와 두피 수분 손실',
      keyword: '두피 열감',
      academicBasis: 'International Journal of Trichology (고온 헤어드라이어 열자극에 의한 두피 장벽 손상 및 모낭 열 스트레스)',
      questionTitle: '바쁜 아침마다 뜨거운 바람으로 머리를 바짝 말리는 습관, 두피 열감을 더 키울까요?',
      empathyLines: [
        '출근 준비로 마음이 급하다 보니 매일 아침 가장 뜨거운 바람을 정수리 가까이에 대고 머리카락을 말리곤 해요.',
        '오후만 되면 머리 꼭대기가 후끈거리고 가려운데 드라이기 열기 때문일 수도 있다는 생각에 손을 멈추게 됩니다.'
      ],
      truthLines: [
        '이미 목과 어깨가 굳어 위로 열이 몰린 상태에서 뜨거운 바람까지 가까이 쐬면, 두피 표면의 보호막이 메말라 두피 열감이 한층 더 심해집니다.',
        '마치 바짝 마른 화분 흙에 뜨거운 바람을 불어넣는 것과 같아서, 모발 뿌리를 감싼 작은 혈관들이 지치고 각질과 유분이 오히려 더 들끓게 됩니다.'
      ],
      mythLines: [
        '머리카락을 빨리 말리기만 하면 두피 건강에는 아무런 문제가 없다고 생각하기 쉽습니다.',
        '수건으로 물기를 먼저 톡톡 두드려 닦아낸 뒤, 팔을 뻗어 20센티미터 이상 거리를 두고 미지근하거나 시원한 바람으로 말려야 모발 뿌리가 편안합니다.'
      ],
      checkList: [
        '오늘 머리를 말릴 때 드라이기 바람을 손등에 먼저 대어 보아 뜨겁지 않은 시원한 온도인지 확인해 보세요.',
        '오후 시간에 정수리 부위를 손가락 끝으로 가볍게 짚었을 때 이마나 손목보다 유독 뜨겁고 붉어져 있지 않은지 살펴보세요.'
      ]
    },
    {
      id: 'cervical-20261111',
      publishDate: '2026-11-11',
      partLabel: '목뼈 · 두피 혈관',
      theme: '이를 악무는 습관과 옆머리·뒷목 긴장',
      keyword: '뒷목 결림',
      academicBasis: 'Journal of Oral Rehabilitation / Cephalalgia (수면·집중 시 저작근 과긴장과 상부 목뼈 근막 연쇄 수축)',
      questionTitle: '집중할 때 무심코 어금니를 꽉 깨무는 습관이 왜 뒷목 결림과 머리 무거움을 부를까요?',
      empathyLines: [
        '컴퓨터 화면에 몰두하거나 운전할 때면 나도 모르게 위아래 어금니를 꽉 물고 있어서 턱과 관자놀이까지 뻐근해요.',
        '아침에 일어나면 턱이 얼얼하면서 뒷목 결림까지 함께 찾아와 하루를 무겁게 시작하곤 합니다.'
      ],
      truthLines: [
        '턱을 움직이는 근육과 귀 뒤쪽, 뒷목을 받치는 근육들은 하나의 그물처럼 촘촘하게 연결되어 함께 움직입니다.',
        '어금니를 꽉 깨무는 순간 옆머리와 귀 밑, 뒷목 근육까지 동시에 딱딱하게 굳어지면서 머리 위로 올라가는 혈관 통로를 좁히게 됩니다.'
      ],
      mythLines: [
        '턱이 뻐근한 것과 목이 뭉치는 것은 서로 전혀 다른 부위의 문제라고 따로 떼어 생각하기 쉽습니다.',
        '평소 입술은 가볍게 다물되 위아래 치아 사이는 종이 한 장 들어갈 만큼 살짝 띄워 두기만 해도 뒷목 결림의 절반이 한결 부드러워집니다.'
      ],
      checkList: [
        '지금 이 글을 읽는 순간 위아래 어금니가 서로 맞닿아 힘이 들어가 있지 않은지, 혀끝이 입천장에 편안히 닿아 있는지 느껴 보세요.',
        '양손 손가락으로 귀 바로 위 옆머리와 귀 뒤 오목한 곳을 지그시 눌렀을 때 유독 단단하게 뭉쳐 아픈 곳이 있는지 확인해 보세요.'
      ]
    }
  ],
  lumbar: [
    {
      id: 'lumbar-20261104',
      publishDate: '2026-11-04',
      partLabel: '허리 물렁뼈 · 골반',
      theme: '바닥에서 무거운 물건 들 때 허리 지렛대 하중',
      keyword: '허리 통증',
      academicBasis: 'Spine / Ergonomics (무릎을 펴고 상체만 숙여 물건을 들 때 요추 물렁뼈에 가해지는 지렛대 압력 급증)',
      questionTitle: '가벼운 택배 상자 하나만 번쩍 들었을 뿐인데 왜 갑자기 찌릿한 허리 통증이 찾아올까요?',
      empathyLines: [
        '현관 앞에 놓인 생수 묶음이나 택배 상자를 무심코 허리만 굽혀 집어 들다가 허리가 뜨끔해 그대로 주저앉을 뻔했어요.',
        '그다지 무거운 물건도 아니었는데 왜 그 순간 허리 통증이 폭발하듯 나타나는지 당황스럽습니다.'
      ],
      truthLines: [
        '무릎을 편 채 상체만 앞으로 휙 숙여서 물건을 들면, 우리 허리 물렁뼈에는 물건 실제 무게의 몇 배나 되는 엄청난 지렛대 압력이 한꺼번에 쏠립니다.',
        '마치 낚싯대 끝으로 무거운 추를 들어 올릴 때 손잡이 부분이 가장 크게 휘어지는 것처럼, 허리 아래쪽 마디가 순간적인 충격을 고스란히 떠안게 됩니다.'
      ],
      mythLines: [
        '가벼운 물건이나 바닥에 떨어진 휴지 정도는 허리만 날렵하게 숙여 줍는 것이 자연스럽다고 생각하기 쉽습니다.',
        '아무리 작은 물건이라도 반드시 무릎을 먼저 굽혀 자세를 낮추고 물건을 배 가까이에 붙인 뒤 다리 힘으로 일어서야 허리 물렁뼈를 지킬 수 있습니다.'
      ],
      checkList: [
        '오늘 세수하거나 양말을 신을 때 무릎은 꼿꼿이 편 채 등만 둥글게 말아 숙이지 않았는지 동작을 되짚어 보세요.',
        '바닥의 물건을 들기 전 아랫배에 가볍게 힘을 주고 무릎을 굽혀 앉는 습관이 몸에 배어 있는지 지금 한 번 따라 해 보세요.'
      ]
    },
    {
      id: 'lumbar-20261111',
      publishDate: '2026-11-11',
      partLabel: '허리 물렁뼈 · 골반',
      theme: '짝다리로 서 있는 습관과 골반 틀어짐',
      keyword: '골반 불균형',
      academicBasis: 'Gait & Posture / Journal of Electromyography and Kinesiology (편측 체중 지지 습관에 따른 골반 경사 및 요방형근 비대칭 피로)',
      questionTitle: '전철이나 신호등을 기다릴 때 한쪽 다리에만 기대어 서 있으면 골반 불균형이 심해질까요?',
      empathyLines: [
        '잠시 서서 대화하거나 양치질을 할 때면 늘 오른쪽 다리에만 무게를 싣고 짝다리로 서 있는 제 모습을 발견해요.',
        '똑바로 서 있으면 오히려 어색하고 한쪽 허리와 엉덩이 위쪽이 자주 뻐근한데 골반 불균형 신호인지 궁금합니다.'
      ],
      truthLines: [
        '한쪽 다리에만 체중을 실어 비스듬히 서 있으면, 건물의 주춧돌인 골반이 한쪽으로 기울어지면서 그 위를 받치는 허리 뼈까지 옆으로 휘어집니다.',
        '기울어진 골반을 붙잡기 위해 한쪽 허리 근육만 쉬지 못하고 팽팽하게 당겨지다 보니 저녁마다 한쪽 허리와 엉덩이가 끊어질 듯 피로해집니다.'
      ],
      mythLines: [
        '왼쪽과 오른쪽 다리를 번갈아 가며 짝다리를 짚으면 양쪽 균형이 맞춰져 괜찮다고 오해하기 쉽습니다.',
        '번갈아 기대기보다 양발을 어깨너비로 벌리고 양쪽 발바닥 세 지점에 몸무게를 고르게 나누어 딛고 서는 연습이 골반을 반듯하게 세워 줍니다.'
      ],
      checkList: [
        '거울 앞에 편안하게 서서 양쪽 골반 옆 불룩한 뼈 위에 두 손을 얹었을 때 좌우 손 높이가 수평인지 눈으로 확인해 보세요.',
        '치마나 바지를 입었을 때 유독 한쪽 방향으로만 옷이 돌아가거나 한쪽 바지 밑단만 바닥에 끌리지 않는지 살펴보세요.'
      ]
    }
  ],
  gongjindan: [
    {
      id: 'gongjindan-20261104',
      publishDate: '2026-11-04',
      partLabel: '뇌 · 심장 활력축',
      theme: '오후 3시 극심한 피로와 단 간식 악순환',
      keyword: '만성 피로',
      academicBasis: 'Sports Medicine / Neuroscience & Biobehavioral Reviews (정제당 섭취 후 반응성 혈당 급락과 중추 피로감 가중)',
      questionTitle: '오후만 되면 눈꺼풀이 무거워져 달콤한 과자나 믹스커피를 찾는데, 왜 먹고 나면 만성 피로가 더 심해질까요?',
      empathyLines: [
        '점심 식사 후 두세 시간만 지나면 머리가 안 돌아가고 온몸에 힘이 빠져 책상 서랍 속 초콜릿이나 단 커피에 손이 가요.',
        '먹는 순간엔 잠깐 반짝하는 듯하다가도 1시간 뒤면 더 깊은 만성 피로가 몰려와 저녁까지 파김치가 됩니다.'
      ],
      truthLines: [
        '피곤할 때 단 음식을 급히 먹으면 핏속 당분이 롤러코스터처럼 치솟았다가 곧바로 바닥으로 뚝 떨어지면서 뇌가 쓸 에너지를 더 빼앗기게 됩니다.',
        '마치 마른 지푸라기에 불을 붙여 잠깐 타오르게 한 뒤 재만 남기는 것과 같아서, 반복될수록 뇌와 심장의 활력 배터리가 더 빨리 방전됩니다.'
      ],
      mythLines: [
        '두뇌를 많이 쓸 때는 무조건 설탕이 든 단 간식을 수시로 넣어 주어야 뇌가 힘을 낸다고 믿기 쉽습니다.',
        '오후에 출출하고 피로할 때는 단 과자 대신 호두·아몬드 같은 견과류 한 줌과 따뜻한 물 한 잔을 마셔야 저녁까지 머리 맑은 에너지가 차분히 유지됩니다.'
      ],
      checkList: [
        '오늘 오후 피곤함을 달래기 위해 달콤한 시럽 커피나 과자, 빵을 습관처럼 집어 들지 않았는지 확인해 보세요.',
        '오후 3시쯤 자리에서 일어나 창문을 열고 깊게 숨을 들이마시며 양팔을 위로 쭉 뻗는 기지개를 1분간 켜 보았는지 점검해 보세요.'
      ]
    },
    {
      id: 'gongjindan-20261111',
      publishDate: '2026-11-11',
      partLabel: '뇌 · 심장 활력축',
      theme: '얕은 가슴 호흡과 뇌 산소 공급 부족',
      keyword: '기력 저하',
      academicBasis: 'Frontiers in Human Neuroscience (흉식 천박 호흡에 따른 교감신경 긴장 지속 및 전두엽 산소 포화도 저하)',
      questionTitle: '특별히 무리한 일도 없는데 하루 종일 한숨이 나오고 머리가 띵한 기력 저하, 숨쉬기 습관 때문일까요?',
      empathyLines: [
        '책상 앞에 앉아 일하다 보면 나도 모르게 숨을 참거나 얕게 쉬고 있다가 땅이 꺼져라 긴 한숨을 내쉬곤 해요.',
        '조금만 신경 쓰는 일이 생겨도 가슴이 답답하고 퇴근할 때면 말할 힘조차 없는 기력 저하가 이어집니다.'
      ],
      truthLines: [
        '긴장한 채 어깨를 움츠리고 가슴 윗부분으로만 얕고 빠르게 숨을 쉬면, 신선한 산소가 폐 깊숙이 들어오지 못해 뇌와 심장이 늘 산소 갈증을 겪게 됩니다.',
        '산소가 부족해진 뇌는 금세 지쳐 멍해지고 몸은 작은 일에도 에너지를 쉽게 소진해 버려 깊은 기력 저하에 빠지게 됩니다.'
      ],
      mythLines: [
        '한숨을 자주 쉬면 복이 달아난다며 억지로 숨을 참거나 호흡을 대수롭지 않게 넘기는 경우가 많습니다.',
        '한숨은 부족한 산소를 채우려는 우리 몸의 구조 신호이므로, 아랫배가 부드럽게 오르내리도록 코로 깊게 들이마시고 길게 내쉬는 숨을 자주 선물해야 합니다.'
      ],
      checkList: [
        '한 손을 가슴에, 다른 손을 배꼽 아래에 얹고 숨을 쉴 때 가슴보다 아랫배가 먼저 부드럽게 부풀어 오르는지 확인해 보세요.',
        '하루 세 번 코로 4초간 숨을 들이마시고 입술을 오므려 6초간 천천히 내쉬는 깊은 호흡을 다섯 번씩 실천해 보았는지 점검해 보세요.'
      ]
    }
  ],
  syncope: [
    {
      id: 'syncope-20261104',
      publishDate: '2026-11-04',
      partLabel: '뇌신경 · 자동조절 신경',
      theme: '환기 안 된 밀폐 공간과 미주신경 어지럼',
      keyword: '어지럼증',
      academicBasis: 'Journal of the American Heart Association / Europace (고온·밀폐 환경 장시간 기립 시 정맥 환류 감소 및 혈관미주신경 반사)',
      questionTitle: '사람 많은 지하철이나 더운 실내에 서 있을 때 갑자기 식은땀이 나며 아찔해지는 어지럼증, 왜 생길까요?',
      empathyLines: [
        '출근길 만원 지하철이나 공기가 탁한 매장에 잠시 서 있었을 뿐인데 갑자기 속이 메스껍고 눈앞이 하얗게 흐려졌어요.',
        '귀나 뇌에는 이상이 없다는데 왜 이렇게 갑작스러운 어지럼증이 찾아와 주저앉게 만드는지 두렵습니다.'
      ],
      truthLines: [
        '덥고 답답한 곳에 가만히 서 있으면 피가 다리 쪽으로 몰리면서 심장과 뇌로 올라가는 피의 양이 순간적으로 줄어듭니다.',
        '이때 몸의 자동조절 신경이 당황해 오히려 맥박과 혈압을 급히 떨어뜨리는 바람에 뇌로 가는 피가 잠시 부족해져 아찔한 어지럼증이 나타나는 것입니다.'
      ],
      mythLines: [
        '눈앞이 캄캄해지고 식은땀이 날 때 정신력으로 버티며 꼿꼿이 서 있어야 쓰러지지 않는다고 생각하기 쉽습니다.',
        '전조 신호가 느껴지는 즉시 그 자리에 쪼그려 앉거나 다리를 꼬고 종아리와 허벅지 근육에 힘을 꽉 주어야 피가 뇌로 다시 올라가 안전합니다.'
      ],
      checkList: [
        '아침에 외출하기 전 공복 상태로 나서지 않고 미지근한 물 한 잔을 충분히 마셔 혈액 양을 채워 두었는지 확인해 보세요.',
        '오래 서 있어야 할 때 제자리에서 발뒤꿈치를 들었다 내리며 종아리 근육 펌프를 수시로 움직여 주고 있는지 점검해 보세요.'
      ]
    },
    {
      id: 'syncope-20261111',
      publishDate: '2026-11-11',
      partLabel: '뇌신경 · 자동조절 신경',
      theme: '주말 몰아 자기와 월요일 편두통',
      keyword: '편두통',
      academicBasis: 'Neurology / Headache (수면-각성 리듬 급변 및 주말 과수면에 따른 뇌혈관 확장성 편두통 유발)',
      questionTitle: '평일에 못 잔 잠을 주말에 낮까지 몰아서 잤는데 왜 일요일 오후엔 지끈거리는 편두통이 찾아올까요?',
      empathyLines: [
        '일주일 내내 피곤했으니 주말엔 푹 쉬겠다며 점심때까지 늦잠을 자고 일어났더니 오히려 관자놀이가 욱신거려요.',
        '잠을 실컷 잤는데도 머리가 맑아지기는커녕 지끈거리는 편두통 때문에 주말 오후를 다 망치곤 합니다.'
      ],
      truthLines: [
        '우리 뇌신경과 혈관은 매일 비슷한 시각에 깨고 자는 일정한 생체 시계에 맞춰 수축과 이완을 조절합니다.',
        '주말에 갑자기 평소보다 서너 시간 이상 늦게까지 자면 몸속 시계가 혼란에 빠지고 뇌혈관이 과도하게 늘어나면서 주변 신경을 자극해 편두통을 일으킵니다.'
      ],
      mythLines: [
        '잠은 저축통장 같아서 주중에 부족했던 수면을 주말에 한꺼번에 10시간씩 몰아 자면 피로가 다 풀린다고 믿기 쉽습니다.',
        '주말에도 기상 시각은 평일과 1시간 이내로 맞추고, 피곤하다면 오후 2시 이전에 20분 정도 짧은 낮잠으로 보충하는 것이 머리 건강에 훨씬 좋습니다.'
      ],
      checkList: [
        '이번 주말 아침에 일어난 시각이 평일 기상 시각보다 2시간 이상 늦어지지 않았는지 확인해 보세요.',
        '아침에 눈을 뜨자마자 커튼을 활짝 열어 아침 햇살을 눈에 비추며 뇌의 생체 시계를 상쾌하게 깨워 주었는지 점검해 보세요.'
      ]
    }
  ],
  digest: [
    {
      id: 'digest-20261104',
      publishDate: '2026-11-04',
      partLabel: '위장 · 식도 근육',
      theme: '국이나 물에 밥 말아 후루룩 먹는 습관',
      keyword: '소화불량',
      academicBasis: 'Gastroenterology / Journal of Oral Rehabilitation (저작 횟수 감소 및 침 아밀라아제 혼합 부족에 따른 위 배출 지연)',
      questionTitle: '입맛 없을 때 국이나 물에 밥을 말아 후루룩 넘기는 습관, 왜 만성 소화불량을 부를까요?',
      empathyLines: [
        '바쁘거나 입맛이 까끌까끌한 날이면 따뜻한 국물에 밥을 말아 김치 한 조각 얹어 5분 만에 식사를 끝내곤 해요.',
        '먹을 때는 술술 잘 넘어가는 것 같은데 돌아서면 명치가 돌덩이처럼 답답한 소화불량이 반복됩니다.'
      ],
      truthLines: [
        '소화의 첫 단추는 위장이 아니라 입안에서 치아로 밥알을 잘게 부수고 침 속 소화 효소를 골고루 버무리는 과정입니다.',
        '국물에 밥을 말아 씹지 않고 삼키면 위장 속 소화액이 국물에 묽어지는 데다 통째로 내려온 밥알을 부수느라 위장 근육이 지쳐 소화불량이 깊어집니다.'
      ],
      mythLines: [
        '속이 불편할수록 건더기 없이 국물에 밥을 말거나 물 같은 죽만 후루룩 마셔야 위장이 편하다고 생각하기 쉽습니다.',
        '국물은 건더기 위주로 적당히 드시고, 밥과 반찬은 물 없이 입안에서 스무 번 이상 꼭꼭 씹어 삼켜야 위장이 가볍게 움직입니다.'
      ],
      checkList: [
        '오늘 식사할 때 밥 한 숟가락을 입에 넣고 젓가락을 잠시 내려놓은 채 스무 번 이상 충분히 씹어 삼켰는지 확인해 보세요.',
        '식사 도중에 물이나 국물을 마시는 양을 반 컵 이내로 줄이고 식후 30분 뒤에 따뜻한 물을 마시는 습관을 실천해 보세요.'
      ]
    },
    {
      id: 'digest-20261111',
      publishDate: '2026-11-11',
      partLabel: '위장 · 식도 근육',
      theme: '식사 직후 눕기·스마트폰 보기와 속쓰림',
      keyword: '속쓰림',
      academicBasis: 'American Journal of Gastroenterology (식후 조기 와위 자세 및 복압 상승에 따른 위산 식도 역류 빈도 증가)',
      questionTitle: '저녁밥 먹고 소파에 기대어 누운 채 휴대폰을 보면 왜 가슴과 목까지 타는 듯한 속쓰림이 올라올까요?',
      empathyLines: [
        '퇴근 후 저녁을 든든히 먹고 나면 노곤해서 바로 거실 소파에 비스듬히 눕거나 침대에 기대어 영상을 보게 돼요.',
        '그럴 때마다 신물이 울컥 올라오면서 가슴 한가운데가 화끈거리는 속쓰림 때문에 밤잠까지 설칩니다.'
      ],
      truthLines: [
        '식사 직후에는 음식을 녹이기 위해 위장 안에 강한 산성 소화액이 가득 차올라 활발하게 출렁이고 있습니다.',
        '이때 위장이 다 비워지기도 전에 눕거나 허리를 구부정하게 기대면, 위장과 식도 사이 조임근 문이 느슨해지면서 산성 액체가 거꾸로 흘러 속쓰림을 일으킵니다.'
      ],
      mythLines: [
        '식사 후 몸을 조금이라도 움직이면 위가 처진다며 밥 먹자마자 가만히 누워 쉬는 것이 소화에 좋다고 오해하기 쉽습니다.',
        '식후 최소 2~3시간 동안은 눕지 말고 상체를 반듯하게 세우거나 가볍게 거실을 걸어 주어야 음식이 아래쪽 장으로 순조롭게 내려갑니다.'
      ],
      checkList: [
        '오늘 저녁 식사를 마친 시각부터 잠자리에 눕기까지 최소 3시간 이상의 여유 시간이 있었는지 확인해 보세요.',
        '밤에 신물이 자주 올라온다면 잘 때 상체 쪽 베개나 매트를 살짝 높여 식도가 위장보다 높게 놓이도록 조절해 두었는지 살펴보세요.'
      ]
    }
  ],
  gut: [
    {
      id: 'gut-20261104',
      publishDate: '2026-11-04',
      partLabel: '복부 · 대사 순환',
      theme: '식사 순서(채소→단백질→탄수화물)와 식후 졸음·뱃살',
      keyword: '복부 비만',
      academicBasis: 'Diabetes Care / Clinical Nutrition (식이섬유·단백질 선섭취에 따른 식후 혈당 스파이크 및 인슐린 지방 축적 억제)',
      questionTitle: '똑같은 양의 밥을 먹는데도 먹는 순서만 바꾸면 식후 졸음과 복부 비만을 줄일 수 있을까요?',
      empathyLines: [
        '식당에 가면 반찬보다 흰쌀밥이나 면부터 허겁지겁 먼저 떠먹는 습관이 있어요.',
        '식사 양을 줄여 보아도 밥 먹고 나면 눈꺼풀이 천근만근 무겁고 아랫배만 볼록 나오는 복부 비만이 도무지 줄지 않습니다.'
      ],
      truthLines: [
        '빈속에 흰쌀밥이나 면이 가장 먼저 들어가면 핏속 당분이 순식간에 치솟고, 몸은 남은 당분을 곧바로 뱃살 지방 창고로 밀어 넣습니다.',
        '반대로 나물이나 샐러드 같은 채소를 먼저 씹어 먹고 고기·생선·두부를 먹은 뒤 마지막에 밥을 먹으면, 채소 섬유질이 그물망을 쳐서 복부 비만으로 가는 길을 막아 줍니다.'
      ],
      mythLines: [
        '어차피 뱃속에 들어가면 다 섞이므로 무엇을 먼저 먹든 살찌는 것은 똑같다고 생각하기 쉽습니다.',
        '식사 메뉴를 바꾸지 않아도 처음 5분 동안 채소와 단백질 반찬을 먼저 드시는 것만으로 식후 졸음이 줄고 아랫배가 한결 가벼워집니다.'
      ],
      checkList: [
        '오늘 점심이나 저녁 식탁에서 첫 젓가락을 밥그릇이 아닌 나물·쌈채소·두부 반찬으로 먼저 가져갔는지 확인해 보세요.',
        '식사 후 1시간 뒤에 참을 수 없는 졸음이 쏟아지거나 금세 단 간식이 다시 당기지 않는지 몸의 변화를 느껴 보세요.'
      ]
    },
    {
      id: 'gut-20261111',
      publishDate: '2026-11-11',
      partLabel: '복부 · 대사 순환',
      theme: '짠 국물·야식과 아침 얼굴·종아리 부종',
      keyword: '다리 붓기',
      academicBasis: 'Hypertension / American Journal of Clinical Nutrition (야간 고나트륨 섭취에 따른 세포외 수분 저류 및 말초 림프 순환 정체)',
      questionTitle: '저녁에 얼큰한 국물 요리를 먹은 다음 날 유독 구두가 꽉 끼는 다리 붓기, 살이 되는 걸까요?',
      empathyLines: [
        '퇴근 후 스트레스 풀 겸 매콤하고 짭조름한 찌개나 야식을 먹고 자면 다음 날 아침 눈두덩이와 손가락이 퉁퉁 부어요.',
        '오후가 되면 종아리까지 단단해지는 다리 붓기가 이어지는데 이 붓기가 그대로 살로 굳어질까 봐 걱정입니다.'
      ],
      truthLines: [
        '밤늦게 짠 음식을 많이 먹으면 몸이 소금 농도를 맞추기 위해 수분을 밖으로 내보내지 않고 스펀지처럼 조직 사이에 꽉 붙잡아 둡니다.',
        '이렇게 고인 수분이 제때 빠져나가지 못하면 혈액과 수분 순환 길이 막히면서 노폐물이 쌓이고 결국 체지방이 쉽게 붙는 환경이 만들어집니다.'
      ],
      mythLines: [
        '몸이 자주 붓는 사람은 물을 마시면 더 붓는다며 하루 종일 물 마시는 것 자체를 극도로 피하는 경우가 많습니다.',
        '오히려 낮 동안 맹물을 조금씩 자주 마셔 주어야 몸속에 고여 있던 짠 기운과 노폐물이 소변으로 시원하게 씻겨 나가 다리 붓기가 빠집니다.'
      ],
      checkList: [
        '저녁 식사 때 국이나 찌개는 국자 대신 젓가락을 사용해 건더기 위주로 건져 드셨는지 확인해 보세요.',
        '잠들기 전 바닥에 누워 두 다리를 벽에 기댄 채 10분간 올려 두어 발끝에 고인 수분이 심장 쪽으로 편안히 돌아오도록 도와주었는지 점검해 보세요.'
      ]
    }
  ],
  uterus: [
    {
      id: 'uterus-20261104',
      publishDate: '2026-11-04',
      partLabel: '아랫배 · 골반 순환',
      theme: '꽉 끼는 하의·레깅스와 골반 혈류 정체',
      keyword: '생리통',
      academicBasis: 'Journal of Obstetrics and Gynaecology Research (하복부·서혜부 압박 의복 착용에 따른 골반 정맥 울혈 및 월경통 악화)',
      questionTitle: '배와 골반을 꽉 조이는 바지나 보정 속옷을 자주 입으면 왜 그날의 생리통이 더 심해질까요?',
      empathyLines: [
        '옷태를 살리려고 허리와 골반이 타이트하게 맞는 청바지나 압박 레깅스를 하루 종일 입고 지내는 날이 많아요.',
        '집에 돌아와 옷을 벗으면 아랫배에 빨간 자국이 남고 얼음장처럼 차가운데 매달 생리통까지 점점 심해집니다.'
      ],
      truthLines: [
        '아랫배와 사타구니 주변에는 골반 안쪽 기관으로 따뜻한 피를 보내고 내보내는 큰 혈관들이 지나가고 있습니다.',
        '꽉 끼는 옷으로 이 길목을 하루 종일 조여 두면 골반 속 피가 고이고 차가워지면서, 그날 근육이 훨씬 더 강하게 경련해 극심한 생리통을 유발합니다.'
      ],
      mythLines: [
        '아랫배를 압박 속옷으로 단단히 조여 주면 배가 따뜻하게 보호되고 자세도 좋아진다고 오해하기 쉽습니다.',
        '골반과 아랫배는 숨 쉴 때마다 부드럽게 부풀어 오를 수 있도록 여유 있고 따뜻한 소재의 옷을 입어야 혈액 순환이 살아납니다.'
      ],
      checkList: [
        '오늘 입은 바지나 속옷을 벗었을 때 배꼽 주변과 사타구니에 깊은 고무줄 자국이 남아 있지 않은지 살펴보세요.',
        '집에 돌아온 뒤에는 편안한 면 소재 실내복으로 갈아입고 따뜻한 손바닥으로 아랫배를 시계 방향으로 스무 번 부드럽게 쓸어 주었는지 확인해 보세요.'
      ]
    },
    {
      id: 'uterus-20261111',
      publishDate: '2026-11-11',
      partLabel: '아랫배 · 골반 순환',
      theme: '맨발 생활·찬 바닥과 하복부 온기 보존',
      keyword: '아랫배 냉증',
      academicBasis: 'Reproductive Biology and Endocrinology / Autonomic Neuroscience (족부 한랭 노출 시 교감신경 반사에 의한 골반·자궁 동맥 혈류 감소)',
      questionTitle: '집 안에서 양말 없이 맨발로 걸어 다니는 습관이 왜 아랫배 냉증으로 이어질까요?',
      empathyLines: [
        '답답한 게 싫어서 계절에 상관없이 집 안에서는 늘 맨발에 짧은 옷차림으로 차가운 마룻바닥을 걸어 다녀요.',
        '손발은 늘 시리고 배꼽 아래를 만져 보면 찬 기운이 도는 아랫배 냉증이 가시질 않습니다.'
      ],
      truthLines: [
        '발바닥과 발목 안쪽에서 출발한 혈관과 신경 길은 다리를 타고 올라가 아랫배 골반 깊은 곳으로 곧장 연결됩니다.',
        '발이 차가운 바닥에 닿아 식어 버리면 그 서늘한 혈액이 그대로 위로 올라가 골반 주변 혈관까지 수축시키면서 아랫배 냉증을 깊게 만듭니다.'
      ],
      mythLines: [
        '보일러를 틀어 거실 공기만 훈훈하면 맨발로 다녀도 아랫배 온도에는 아무 영향이 없다고 생각하기 쉽습니다.',
        '발목 복사뼈 위쪽까지 감싸는 포근한 양말이나 실내화를 챙겨 신는 작은 습관이 아랫배 온기를 지키는 가장 든든한 보온 스위치입니다.'
      ],
      checkList: [
        '지금 집 안에서 발목 안쪽 복사뼈까지 따뜻하게 덮어 주는 양말이나 덧버선을 신고 계신지 확인해 보세요.',
        '잠들기 전 40도 안팎의 따뜻한 물에 발목 위까지 담그는 15분 족욕 후 즉시 양말을 신어 온기를 가두어 주는 루틴을 실천해 보세요.'
      ]
    }
  ],
  prostate: [
    {
      id: 'prostate-20261104',
      publishDate: '2026-11-04',
      partLabel: '방광 · 골반 바닥근육',
      theme: '소변 오래 참는 습관과 방광 피로',
      keyword: '소변 신호',
      academicBasis: 'Neurourology and Urodynamics / European Urology (반복적인 방광 과팽창에 따른 배뇨 근육 수축력 저하 및 감각 신경 교란)',
      questionTitle: '회의나 운전 때문에 마려운 소변 신호를 습관처럼 오래 참으면 방광 근육이 어떻게 변할까요?',
      empathyLines: [
        '업무에 집중하거나 장거리 이동을 할 때면 화장실 가기가 번거로워 서너 시간씩 소변 신호를 꾹 참아 넘기곤 해요.',
        '한참 참았다가 막상 화장실에 가면 오히려 바로 나오지 않고 한참을 서 있어야 해서 당황스럽습니다.'
      ],
      truthLines: [
        '우리 방광은 고무풍선처럼 적당한 양이 차면 기분 좋게 줄어들며 소변을 내보내도록 설계되어 있습니다.',
        '신호를 무시하고 한계까지 반복해서 늘려 놓으면, 너무 크게 불어 놓은 풍선이 탄력을 잃듯 방광 근육도 지쳐서 정작 비울 때 힘을 제대로 쓰지 못하게 됩니다.'
      ],
      mythLines: [
        '소변을 끝까지 오래 참는 연습을 해야 방광 크기가 넓어지고 단련된다고 오해하는 경우가 있습니다.',
        '무리하게 참는 것과 너무 자주 가는 것 모두 피하고, 낮 동안 3~4시간 간격으로 자연스러운 소변 신호가 올 때 편안히 비워 주는 것이 가장 건강합니다.'
      ],
      checkList: [
        '오늘 하루 바쁘다는 이유로 아랫배가 묵직해질 때까지 4시간 이상 화장실 가는 것을 미루지 않았는지 점검해 보세요.',
        '장거리 운전이나 긴 회의에 들어가기 전 미리 화장실에 들러 가볍게 비워 두는 습관을 실천하고 있는지 확인해 보세요.'
      ]
    },
    {
      id: 'prostate-20261111',
      publishDate: '2026-11-11',
      partLabel: '방광 · 골반 바닥근육',
      theme: '따뜻한 온좌욕과 골반 아래 긴장 완화',
      keyword: '골반 순환',
      academicBasis: 'International Neurourology Journal (회음부·하복부 온열 요법에 따른 골반저 미세혈류 개선 및 하부요로 불편감 완화)',
      questionTitle: '저녁마다 10분씩 따뜻한 물로 아랫배와 엉덩이를 데워 주면 왜 골반 순환과 밤잠이 함께 편안해질까요?',
      empathyLines: [
        '날씨가 서늘해지고 오래 앉아 일한 날이면 다리 사이와 아랫배가 묵직하게 뭉쳐 밤에 잠들기 전까지 개운하질 않아요.',
        '집에서 별다른 기구 없이도 골반 순환을 부드럽게 풀어 줄 수 있는 가장 쉬운 생활 습관이 궁금합니다.'
      ],
      truthLines: [
        '하루 종일 상체 무게를 받치며 차갑게 굳어 있던 골반 아래쪽 근육들은 따뜻한 온기를 만나면 좁아졌던 혈관을 활짝 열고 고여 있던 피를 순환시킵니다.',
        '골반 순환이 부드럽게 풀리면 방광 주변 신경의 예민한 긴장도 함께 가라앉아 밤사이 화장실 때문에 깨는 횟수까지 한결 줄어듭니다.'
      ],
      mythLines: [
        '온찜질이나 좌욕은 물이 뜨거울수록 효과가 좋다며 피부가 벌겋게 익을 정도의 열탕에 오래 앉아 있는 경우가 있습니다.',
        '너무 뜨거운 물은 오히려 피부와 주변 조직에 부담을 주므로, 체온보다 살짝 따뜻한 38~40도 물에서 10분 안팎으로 편안하게 데워 주는 것이 알맞습니다.'
      ],
      checkList: [
        '오늘 저녁 샤워할 때 따뜻한 물줄기로 아랫배와 엉치뼈 주변을 5~10분간 부드럽게 데워 주었는지 확인해 보세요.',
        '온찜질 후 물기를 완전히 말리고 따뜻한 하의를 입어 데워진 골반 온기가 식지 않도록 지켜 주었는지 점검해 보세요.'
      ]
    }
  ]
};

function getKstDateString(offsetDays = 0) {
  const kstMs = Date.now() + 9 * 3600 * 1000 + offsetDays * 86400 * 1000;
  return new Date(kstMs).toISOString().slice(0, 10);
}

/**
 * 1) 9대 질환 3D 건강노트 자동 생성·검수 및 파일/DB/메뉴 설정 동기화
 */
function syncNineDiseaseAutoNotes() {
  const report = {
    executedAt: new Date(Date.now() + 9 * 3600 * 1000).toISOString().replace('T', ' ').slice(0, 19),
    todayKst: getKstDateString(0),
    addedNotesCount: 0,
    totalNotesByPart: {},
    auditPassedAll: true,
    auditErrors: []
  };

  // 1-A. NOVEMBER_AUTO_EPISODES를 BODY_3D_AUTO_NOTES 메모리에 병합 및 3단계 자가검수 수행
  for (const [partId, newEps] of Object.entries(NOVEMBER_AUTO_EPISODES)) {
    if (!Array.isArray(BODY_3D_AUTO_NOTES[partId])) {
      BODY_3D_AUTO_NOTES[partId] = [];
    }
    const list = BODY_3D_AUTO_NOTES[partId];
    for (const ep of newEps) {
      const audit = auditNoteThreeStage(ep);
      if (!audit.passed) {
        report.auditPassedAll = false;
        report.auditErrors.push(`${ep.id}: ${audit.errors.join(', ')}`);
        continue;
      }
      const existingIdx = list.findIndex(x => x.id === ep.id);
      if (existingIdx === -1) {
        list.push(ep);
        report.addedNotesCount++;
      } else {
        list[existingIdx] = ep;
      }
    }
    // 날짜순 오름차순 정렬 유지
    list.sort((a, b) => String(a.publishDate).localeCompare(String(b.publishDate)));
    report.totalNotesByPart[partId] = list.length;
  }

  // 1-B. bareun-local-db.json의 bodyNotes 배열에 최신 에피소드 동기화
  if (fs.existsSync(DB_PATH)) {
    try {
      const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
      if (!Array.isArray(db.bodyNotes)) db.bodyNotes = [];
      for (const [partId, eps] of Object.entries(BODY_3D_AUTO_NOTES)) {
        for (const ep of eps) {
          const item = {
            id: ep.id,
            partId,
            partLabel: ep.partLabel,
            theme: ep.theme,
            keyword: ep.keyword,
            publishDate: ep.publishDate,
            questionTitle: ep.questionTitle,
            title: ep.questionTitle,
            empathyLines: ep.empathyLines,
            empathy: ep.empathyLines,
            truthLines: ep.truthLines,
            truth: ep.truthLines,
            mythLines: ep.mythLines,
            myth: ep.mythLines,
            checkList: ep.checkList,
            check: ep.checkList,
            auditPassed: true
          };
          const idx = db.bodyNotes.findIndex(x => x.id === item.id);
          if (idx === -1) db.bodyNotes.push(item);
          else db.bodyNotes[idx] = item;
        }
      }
      db.bodyNotes.sort((a, b) => String(b.publishDate).localeCompare(String(a.publishDate)));
      db.lastAutoBlogSync = report.executedAt;
      fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
    } catch (e) {
      report.dbSyncError = e.message;
    }
  }

  // 1-C. clinic-explore-menu-config.json에서 leadNoteOverride로 인해 과거(10-27) 글만 고정되던 문제를 해제하고 최신 에피소드로 leadNote 동기화
  if (fs.existsSync(MENU_CONFIG_PATH)) {
    try {
      const menuCfg = JSON.parse(fs.readFileSync(MENU_CONFIG_PATH, 'utf8'));
      if (Array.isArray(menuCfg.items)) {
        for (const item of menuCfg.items) {
          const eps = BODY_3D_AUTO_NOTES[item.id];
          if (Array.isArray(eps) && eps.length > 0) {
            const latestEp = eps[eps.length - 1];
            item.leadNoteOverride = false; // 날짜별 최신 글 자동 순환 허용
            item.leadNote = {
              keyword: latestEp.keyword,
              questionTitle: latestEp.questionTitle,
              subTitle: '',
              badgeOverride: '',
              strictQuestionMark: true,
              isCustomLead: false,
              sections: [
                {
                  id: 'sec_1',
                  enabled: true,
                  icon: '🎒',
                  heading: '1. 일상 속 불편함',
                  type: 'highlight',
                  spanFull: false,
                  lines: latestEp.empathyLines
                },
                {
                  id: 'sec_2',
                  enabled: true,
                  icon: '💡',
                  heading: '2. 의학적 진실',
                  type: 'bullets',
                  spanFull: false,
                  lines: latestEp.truthLines
                },
                {
                  id: 'sec_3',
                  enabled: true,
                  icon: '❌',
                  heading: '3. 흔히 하는 오해',
                  type: 'numbered',
                  spanFull: false,
                  lines: latestEp.mythLines
                },
                {
                  id: 'sec_4',
                  enabled: true,
                  icon: '🔍',
                  heading: '4. 오늘 바로 해보는 1분 체크',
                  type: 'checklist',
                  spanFull: false,
                  lines: latestEp.checkList
                }
              ],
              empathyLines: latestEp.empathyLines,
              truthLines: latestEp.truthLines,
              mythLines: latestEp.mythLines,
              checkList: latestEp.checkList
            };
          }
        }
        fs.writeFileSync(MENU_CONFIG_PATH, JSON.stringify(menuCfg, null, 2), 'utf8');
      }
    } catch (e) {
      report.menuCfgError = e.message;
    }
  }

  const llmsStats = generateLlmsTxtFiles();
  report.llmsTxtGenerated = true;
  report.healthNoteSeoPayloadsCount = llmsStats.totalHealthNotes;

  fs.writeFileSync(AUTO_LOG_PATH, JSON.stringify({
    ...report,
    blogCategoriesCount: DISEASE_BLOG_CATEGORIES.length,
    clinicalBlogPostsCount: INITIAL_DISEASE_BLOG_POSTS.length,
    flagshipPostSlug: FLAGSHIP_REPRESENTATIVE_POST ? FLAGSHIP_REPRESENTATIVE_POST.slug : null
  }, null, 2), 'utf8');

  return report;
}

function escHtmlServer(str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * 9대 부위별 고유 의학 일러스트(1376x768 · Google Discover/스마트블록 규격) 및 심층 통합생리학 임상 감별 메타데이터
 */
const GH_RAW_BASE_URL = 'https://raw.githubusercontent.com/ajwei0508-cpu/bareun-homepage/main/homepage/';

const PART_SEO_CLINICAL_META = {
  knee: {
    heroFile: 'illust_knee_growth_care.jpg',
    heroWebp: 'webp/illust_knee_growth_care.webp',
    wpSlugHint: 'illust-knee-growth-care',
    heroAlt: '바른한의원 대전본점 소아 무릎 성장판 연골세포 분열 및 야간 서파수면 성장호르몬 생리 일러스트',
    heroCaption: '대퇴골·경골 골단판(성장판) 연골세포 증식과 야간 서파수면(N3)·비강 호흡·영양 대사 균형 모식도',
    clinicLinks: [
      { label: '바른 성장 · 성조숙증 클리닉 자세히 보기', url: 'https://www.bareunhaniwon.com/growth/' },
      { label: '9대 무방사선 초음파 · 체열 · 성장판 검진 안내', url: 'https://www.bareunhaniwon.com/director/' }
    ],
    physioMechanism: '소아·청소년기 선형 성장은 대퇴골 원위부와 경골 근위부 성장판(Epiphyseal Plate) 내 연골모세포가 밤사이 분열·증식하며 골기질로 치환되는 생리 과정을 따릅니다. 특히 성장호르몬(GH-IGF-1 축)은 취침 후 초기 깊은 서파수면 단계에서 맥동성으로 집중 분비되므로, 야간 혈당·인슐린 상승이나 구강호흡에 의한 미세각성, 하지 정렬 불균형이 겹치면 같은 유전 조건에서도 성장 효율이 달라질 수 있습니다.',
    clinicalCheckpoints: [
      '야간 수면의 질 관찰: 코골이, 구강호흡, 잦은 뒤척임, 기상 직후 입마름이나 다크서클이 2주 이상 이어지는지 확인합니다.',
      '체성분과 사춘기 리듬 점검: 키 증가 속도 대비 복부 체지방 증가가 빠르거나 또래보다 이차성징 신호가 이르게 나타나는지 주기적으로 기록합니다.',
      '하지 생체역학 및 관절 피로 구분: 주로 저녁·밤에 양측 정강이·종아리가 뻐근한 성장기 근육 피로인지, 한쪽 관절 부종이나 보행 시 절뚝거림이 동반되는 구조적 통증인지 구별하여 살핍니다.'
    ],
    examGuide: '무방사선 초음파 성장판 정밀 관찰 · 체성분(체지방·골격근) 평가 · 비강/인후두 내시경 호흡 통로 점검'
  },
  cervical: {
    heroFile: 'illust_cervical_hairloss.jpg',
    heroWebp: 'webp/illust_cervical_hairloss.webp',
    wpSlugHint: 'illust-cervical-hairloss',
    heroAlt: '바른한의원 대전본점 경추 C자 정렬과 두피 모낭 모유두세포 미세혈류 순환 일러스트',
    heroCaption: '경추 생체역학 하중 분산과 후두하근 이완을 통한 두피 진피층 모유두(Dermal Papilla) 미세혈류 및 열조절 기전',
    clinicLinks: [
      { label: '바른 탈모 · 모근재생 통합 클리닉', url: 'https://www.bareunhaniwon.com/hairloss/' },
      { label: '남성 M자·정수리 탈모 클리닉', url: 'https://www.bareunhaniwon.com/hairloss-male/' },
      { label: '여성 가르마·볼륨 탈모 클리닉', url: 'https://www.bareunhaniwon.com/hairloss-female/' },
      { label: '원형탈모 면역복원 클리닉', url: 'https://www.bareunhaniwon.com/hairloss-alopecia/' },
      { label: '지루성두피염 열독해독 클리닉', url: 'https://www.bareunhaniwon.com/hairloss-seborrheic/' },
      { label: '바른 경추 추나 · 거북목 교정 클리닉', url: 'https://www.bareunhaniwon.com/chuna/' }
    ],
    physioMechanism: '두피 모낭 기저부의 모유두 세포(Dermal Papilla Cell)는 목과 후두부를 지나는 미세혈관망으로부터 산소와 아미노산·미네랄을 공급받아 모발 성장기(Anagen)를 유지합니다. 장시간 고개를 숙이는 전방두부자세(거북목)와 만성 교감신경 긴장이 지속되면 후두하근·승모근이 경직되어 두경부 정맥 환류가 정체되고, 두피 국소 열감과 피지 산화가 겹치며 모발이 가늘어지는 연모화(Miniaturization)가 촉진됩니다.',
    clinicalCheckpoints: [
      '모발 굵기 편차 비교: 뒷머리(후두부) 모발과 정수리·가르마·앞머리 모발을 손끝으로 함께 만졌을 때 굵기와 탄력 차이가 뚜렷해졌는지 점검합니다.',
      '두피 미세환경 신호 확인: 오후 시간대 정수리 열감, 붉은 홍반, 뾰루지(모낭염), 샴푸 후에도 금방 기름지거나 각질이 일어나는 지루성 변화 유무를 살핍니다.',
      '경추·견갑 긴장 동반 여부: 뒷목 뻐근함, 어깨 결림, 눈 피로, 긴장성 두통이 모발 탈락량 증가 시기와 맞물려 나타나는지 함께 관찰합니다.'
    ],
    examGuide: '두피 고배율 현미경 모낭 밀도·각질 관찰 · 적외선 체열진단(DITI 상열하한) · 모아레 경추·어깨 체형 평가 · 자율신경(HRV) 검사'
  },
  lumbar: {
    heroFile: 'illust_lumbar_pelvis.jpg',
    heroWebp: 'webp/illust_lumbar_pelvis.webp',
    wpSlugHint: 'illust-lumbar-pelvis',
    heroAlt: '바른한의원 대전본점 요추 추간판(디스크) 감압 및 골반 천장관절 균형 정렬 일러스트',
    heroCaption: '요추 전만 커브·추간판 수핵 압력 분산과 골반 천장관절·이상근 신경 통로 생체역학 구조도',
    clinicLinks: [
      { label: '바른 추나 · 허리디스크 · 체형교정 클리닉', url: 'https://www.bareunhaniwon.com/chuna/' },
      { label: '9대 초음파 · 모아레 체형 · 체열 정밀검진 안내', url: 'https://www.bareunhaniwon.com/director/' }
    ],
    physioMechanism: '요추 추간판(디스크)은 성인이 된 이후 자체 혈관이 거의 없어 척추 분절이 부드럽게 움직일 때 일어나는 삼투압 확산(Imbibition)을 통해 수분과 영양을 공급받습니다. 구부정한 좌식 자세나 다리 꼬기로 골반 경사와 천장관절 비대칭이 고착되면 특정 요추 마디(주로 L4-L5, L5-S1) 후방 섬유륜에 편측 압력이 집중되고, 심부 다열근 위축과 신경근 주위 염증성 통증이 반복되기 쉽습니다.',
    clinicalCheckpoints: [
      '자세 변화에 따른 통증 양상 구분: 허리를 앞으로 숙일 때(굴곡) 찌릿한 방사통이 심해지는지, 뒤로 젖힐 때(신전) 묵직한 관절 통증이 두드러지는지 관찰합니다.',
      '신경근 압박 vs 근육 포착 감별: 기침·재채기처럼 복압이 올라갈 때 엉덩이·종아리까지 저림이 내려가는지, 의자에 오래 앉아 눌릴 때 둔부 국소 통증이 심해지는지 구분합니다.',
      '주의해야 할 신경학적 신호 확인: 발목이나 엄지발가락에 힘이 빠지는 근력 저하, 감각 둔화 등이 동반될 때는 지체 없이 정밀 대면 진찰을 받아야 합니다.'
    ],
    examGuide: '근골격계 초음파 인대·연부조직 관찰 · 모아레 등고선 체형 비대칭 측정 · 적외선 체열진단(신경 방사통 온도차) 평가'
  },
  gongjindan: {
    heroFile: 'illust_gongjindan_heart_brain.jpg',
    heroWebp: 'webp/illust_gongjindan_heart_brain.webp',
    wpSlugHint: 'illust-gongjindan-heart-brain',
    heroAlt: '바른한의원 대전본점 뇌신경 에너지 대사 및 HPA 축 만성피로 회복 생리 일러스트',
    heroCaption: '시상하부-뇌하수체-부신(HPA) 코르티솔 일주기 리듬과 심뇌혈관 미세순환·미토콘드리아 에너지 대사 모식도',
    clinicLinks: [
      { label: '바른 황제공진단 · 만성피로 클리닉 자세히 보기', url: 'https://www.bareunhaniwon.com/gongjindan/' },
      { label: '자율신경(HRV) · 말초혈관(APG) · 간수치 정밀검진 안내', url: 'https://www.bareunhaniwon.com/director/' }
    ],
    physioMechanism: '충분히 쉬어도 풀리지 않는 만성 피로와 브레인포그는 단순한 체력 소모를 넘어 시상하부-뇌하수체-부신(HPA) 스트레스 조절축의 일주기 리듬 평탄화 및 세포 내 미토콘드리아 ATP 합성 저하와 밀접합니다. 아침에 깨어나기 힘들고 밤에는 오히려 뇌가 각성되어 얕은 잠을 자는 패턴이 누적되면 저등급 만성염증(Systemic Chronic Inflammation)과 산화 스트레스가 전신 회복 속도를 늦추게 됩니다.',
    clinicalCheckpoints: [
      '시간대별 피로 곡선 기록: 기상 직후 납처럼 무거운 피로감, 오후 3~4시 급격한 집중력 저하, 밤 11시 이후의 역설적 각성 패턴이 반복되는지 점검합니다.',
      '카페인·단당류 의존도 확인: 커피나 에너지 음료 없이는 오전 업무 시작이 어렵고 오후마다 단 음식을 찾게 되는 대사 보상 신호가 있는지 살핍니다.',
      '동반 회복 지연 징후 관찰: 구내염 재발, 안구 건조, 기억력·단어 인출 지연, 운동 후 근육통이 평소보다 오래 지속되는지 함께 체크합니다.'
    ],
    examGuide: '심박변이도(HRV) 자율신경 피로도 측정 · 말초혈관 탄력(APG) 검사 · 간·당 대사 안전성 혈액 지표 확인'
  },
  syncope: {
    heroFile: 'illust_syncope_autonomic.jpg',
    heroWebp: 'webp/illust_syncope_autonomic.webp',
    wpSlugHint: 'illust-syncope-autonomic',
    heroAlt: '바른한의원 대전본점 뇌간 미주신경 반사 및 자율신경 혈압·뇌혈류 조절 일러스트',
    heroCaption: '교감·부교감 자율신경 균형과 미주신경 혈관반사(Vasovagal Reflex)·상부 경추 뇌혈류 조절 경로도',
    clinicLinks: [
      { label: '9대 자율신경(HRV) · 혈관 · 체열 정밀검진 클리닉', url: 'https://www.bareunhaniwon.com/director/' },
      { label: '상부 경추 · 거북목 수기 추나 클리닉', url: 'https://www.bareunhaniwon.com/chuna/' }
    ],
    physioMechanism: '기립 시 중력에 의해 하체로 쏠리는 혈액을 심장과 뇌로 빠르게 되돌려 보내려면 교감신경 혈관 수축 반사와 종아리 근육 펌프가 즉각 작동해야 합니다. 수면 부족, 탈수, 장시간 기립, 밀폐된 고온 환경이나 극심한 긴장 상태에서 이 자율신경 조율이 흔들리면 역설적인 미주신경 과반사로 맥박과 혈압이 일시 저하되며 시야 아찔함, 식은땀, 이명, 편두통 등이 나타날 수 있습니다.',
    clinicalCheckpoints: [
      '전조 증상 발생 환경 파악: 오래 서 있거나 더운 공간, 공복·채혈·통증 직후에 눈앞이 하얘지거나 귀가 먹먹해지고 식은땀이 나는 전형적 유발 상황을 기록합니다.',
      '기립 직후 시간차 어지럼 체크: 누웠다 일어선 뒤 수십 초 이내에 아찔해지는지, 고개를 특정 방향으로 돌릴 때 세상이 빙글 도는 회전성 현훈인지 구별합니다.',
      '즉각 대처 안전 수칙 숙지: 전조가 느껴지는 즉시 무리해 버티지 말고 바닥에 앉거나 누워 다리를 높이고 허벅지·둔부 근육에 힘을 주는 물리적 대항압박법을 시행합니다.'
    ],
    examGuide: '심박변이도(HRV) 교감·부교감 활성도 검사 · 말초혈관 탄력도(APG) · 적외선 체열진단(DITI) · 상부 경추 정렬 평가'
  },
  digest: {
    heroFile: 'illust_gut_metabolism.jpg',
    heroWebp: 'webp/illust_gut_metabolism.webp',
    wpSlugHint: 'illust-gut-metabolism',
    heroAlt: '바른한의원 대전본점 위장 평활근 연동운동 및 장-뇌 미주신경 소화 리듬 일러스트',
    heroCaption: '위장 외벽 평활근 배출 리듬(카할 간질세포)과 장-뇌 축(Gut-Brain Axis) 미주신경 소화 조율 모식도',
    clinicLinks: [
      { label: '9대 복부 초음파 · 체열 · 자율신경 정밀검진 안내', url: 'https://www.bareunhaniwon.com/director/' },
      { label: '복부 순환 · 대사 해독 클리닉 보기', url: 'https://www.bareunhaniwon.com/diet-zero/' }
    ],
    physioMechanism: '위내시경에서 점막 궤양이나 종양이 없는데도 식후 더부룩함, 명치 압박감, 잦은 트림과 목 이물감이 이어진다면 위장 평활근의 연동운동 저하(위 배출 지연)와 내장 감각 과민성을 함께 살펴야 합니다. 긴장과 야식, 빠른 식사 속도는 미주신경 신호를 떨어뜨려 음식물이 위장에 오래 정체하게 만들고, 이때 발생한 가스 압력이 하부식도괄약근을 자극해 역류 불편감을 키우게 됩니다.',
    clinicalCheckpoints: [
      '식사 속도와 식후 팽만 시점 관찰: 한 끼 식사 시간이 15분 미만인지, 식후 즉시 윗배가 차오르는지(위저부 이완 저하) 혹은 2~3시간 뒤까지 내려가지 않는지 확인합니다.',
      '야간 공복 시간 확보 점검: 잠들기 최소 3시간 전 식사를 마치고 밤사이 위장관 청소 운동(MMC)이 작동할 12시간 공복이 지켜지고 있는지 살핍니다.',
      '주의해야 할 기질적 경고 증상 확인: 의도치 않은 급격한 체중 감소, 삼킴 곤란, 흑색변 등이 동반될 경우에는 지체 없이 내시경 등 정밀 검사를 우선 시행해야 합니다.'
    ],
    examGuide: '복부 초음파 위장관·복강 관찰 · 적외선 체열진단(복부 냉증·열 편차) · 인후두 내시경 · 자율신경(HRV) 평가'
  },
  gut: {
    heroFile: 'diet_minimal_card4_stage2_core_lipolysis.jpg',
    heroWebp: 'webp/diet_minimal_card4_stage2_core_lipolysis.webp',
    wpSlugHint: 'diet-core-lipolysis-metabolism',
    heroAlt: '바른한의원 대전본점 내장지방 연소 및 갈색지방 미토콘드리아 대사 균형 일러스트',
    heroCaption: '골격근 보존·갈색지방 열생산(Thermogenesis) 활성화 및 식후 인슐린·혈당 완만화 대사 다이어그램',
    clinicLinks: [
      { label: '바른 다이어트 · 식욕ZERO 대사클리닉 자세히 보기', url: 'https://www.bareunhaniwon.com/diet-zero/' },
      { label: '체성분(InBody) · 간·당 대사 · 혈관 정밀검진 안내', url: 'https://www.bareunhaniwon.com/director/' }
    ],
    physioMechanism: '체중 관리의 핵심은 단순 섭취 열량 축소가 아니라 기초대사량의 중심인 골격근과 갈색지방 열생산(Thermogenesis)을 보존하면서 식후 인슐린 과분비 고리를 끊는 데 있습니다. 극단적인 초절식을 반복하면 인체는 에너지 위기 상태로 인식해 대사율을 낮추는 적응성 열생산 저하(Adaptive Thermogenesis)를 일으키며, 이후 소량의 탄수화물에도 내장지방을 더 빠르게 축적하는 요요 체질로 변하기 쉽습니다.',
    clinicalCheckpoints: [
      '식후 혈당 스파이크 신호 점검: 점심 식사 직후 참기 힘든 식곤증(혈당 롤러코스터)이 오거나 식후 2시간 만에 단 간식이 강하게 당기는지 확인합니다.',
      '체중계 숫자보다 허리둘레·부종 비교: 아침과 저녁 종아리·손가락 부종 차이가 큰지, 팔다리는 가는데 복부 둘레만 단단하게 늘어나는 내장지방형인지 살핍니다.',
      '거꾸로 식사법과 수면 시간 체크: 식이섬유(채소) → 단백질 → 탄수화물 순서의 식사 습관과 식욕 호르몬(렙틴·그렐린)을 안정시키는 7시간 숙면이 유지되는지 점검합니다.'
    ],
    examGuide: '체성분(골격근량·내장지방 레벨·세포외수분비) 정밀 측정 · 간·당 대사 지표 확인 · 적외선 복부 체열진단'
  },
  uterus: {
    heroFile: 'illust_uterus_fertility.jpg',
    heroWebp: 'webp/illust_uterus_fertility.webp',
    wpSlugHint: 'illust-uterus-fertility',
    heroAlt: '바른한의원 대전본점 자궁 나선동맥 미세혈류 및 골반강 체온·내분비 균형 일러스트',
    heroCaption: '자궁 내막 나선동맥 혈류 저항 완화와 골반 정렬·시상하부-난소 내분비 생체리듬 조율 모식도',
    clinicLinks: [
      { label: '9대 하복부 초음파 · 체열(DITI) · 자율신경 정밀검진 안내', url: 'https://www.bareunhaniwon.com/director/' },
      { label: '산후·골반 균형 수기 추나 클리닉 보기', url: 'https://www.bareunhaniwon.com/chuna/' }
    ],
    physioMechanism: '여성의 월경 주기와 자궁 내막 수용성, 출산 후 회복 및 갱년기 체온 조절은 시상하부-뇌하수체-난소(HPO) 호르몬 축과 골반강 내 자궁 동맥 미세혈류가 정교하게 맞물려 작동합니다. 하복부 냉증과 골반 비대칭으로 정맥 울혈이 심해지면 월경 시 프로스타글란딘 과분비에 의한 평활근 과수축 통증이 심화될 수 있으며, 환경호르몬 노출과 수면 분절은 배란 및 황체기 리듬에 부담을 줄 수 있습니다.',
    clinicalCheckpoints: [
      '월경 주기와 생리혈 양상 기록: 주기 불규칙성(21일 미만 또는 35일 초과), 검붉은 덩어리 혈 증가, 진통제 복용 횟수 변화를 매달 기록해 비교합니다.',
      '상열하한 및 말초 보온 상태 점검: 손발과 아랫배는 찬데 얼굴이나 가슴으로 열이 달아오르고 부종·피로감(PMS)이 동반되는지 확인합니다.',
      '생활 속 내분비 교란 요인 차단: 뜨거운 음식을 플라스틱·일회용 용기에 담는 습관을 피하고, 꽉 끼는 하의 대신 골반 순환이 편안한 복장과 하복부 보온을 실천합니다.'
    ],
    examGuide: '하복부·골반 초음파 관찰 · 적외선 체열진단(DITI 하복부 온도 분포) · 말초혈관(APG) 및 자율신경(HRV) 검사'
  },
  prostate: {
    heroFile: 'illust_prostate_care.jpg',
    heroWebp: 'webp/illust_prostate_care.webp',
    wpSlugHint: 'illust-prostate-care',
    heroAlt: '바른한의원 대전본점 전립선·방광 괄약근 및 골반저근 미세혈류 순환 일러스트',
    heroCaption: '전립선 주변 정맥총 울혈 완화와 방광 배뇨근·골반저근 이완을 통한 야간뇨·배뇨 리듬 회복 모식도',
    clinicLinks: [
      { label: '바른 전립선 · 요실금 · 남성활력 클리닉 자세히 보기', url: 'https://www.bareunhaniwon.com/prostate/' },
      { label: '1:1 프라이빗 초음파 · 체열 · 혈관 정밀검진 안내', url: 'https://www.bareunhaniwon.com/director/' }
    ],
    physioMechanism: '방광 출구와 요도를 감싸는 전립선 및 골반저 근육군은 장시간 좌식 압박, 하초 냉증, 저녁 시간대 카페인·알코올 섭취에 매우 민감하게 반응합니다. 회음부와 골반강 내 정맥 울혈이 지속되면 세균 감염이 없더라도 묵직한 골반 불편감과 잔뇨감이 이어질 수 있으며, 방광 감각이 예민해져 잠든 뒤 새벽마다 깨어나는 야간뇨로 깊은 수면과 낮 시간 활력까지 함께 저하되기 쉽습니다.',
    clinicalCheckpoints: [
      '주간·야간 배뇨 일지 점검: 취침 후 기상 전까지 소변 때문에 깨는 횟수(야간뇨 1~2회 이상), 소변 줄기 세기 저하, 배뇨 후 잔뇨감 유무를 확인합니다.',
      '좌식 압박 시간과 회음부 긴장 관리: 50분 이상 연속 착석 운전·업무 시 5분간 기립 보행으로 회음부 압박을 풀고 딱딱한 안장 접촉을 줄입니다.',
      '저녁 수분·자극원 조절 실천: 취침 3시간 전 수분 과다 섭취와 방광 배뇨근을 자극하는 저녁 커피·맥주·매운 음식을 절제하고 미온수 좌욕으로 골반저를 이완합니다.'
    ],
    examGuide: '1:1 독립 진료실 하복부·방광 초음파 관찰 · 적외선 체열진단(하초 체열) · 말초혈관 탄력(APG) 및 자율신경 평가'
  }
};

function loadCustomHealthNotesConfig() {
  const cfgPath = path.join(__dirname, 'health-notes-custom-config.json');
  if (fs.existsSync(cfgPath)) {
    try {
      return JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
    } catch (e) {}
  }
  return null;
}

const PART_CLINIC_HUB_MAP = {
  knee: { name: '소아 성장 · 무릎 성장판', liveUrl: 'https://www.bareunhaniwon.com/growth/', localUrl: '/growth.html', btnLabel: '🌱 성장·성조숙증 클리닉', webpHero: '/webp/illust_knee_growth_care.webp' },
  cervical: { name: '거북목 · 두피열 · 탈모', liveUrl: 'https://www.bareunhaniwon.com/hairloss/', localUrl: '/hairloss.html', btnLabel: '🌿 탈모·모근재생 클리닉', webpHero: '/webp/illust_cervical_hairloss.webp' },
  lumbar: { name: '허리 물렁뼈 · 골반 균형', liveUrl: 'https://www.bareunhaniwon.com/chuna/', localUrl: '/chuna.html', btnLabel: '🦴 추나·척추교정 클리닉', webpHero: '/webp/illust_lumbar_pelvis.webp' },
  gongjindan: { name: '뇌 · 심장 활력 · 만성피로', liveUrl: 'https://www.bareunhaniwon.com/gongjindan/', localUrl: '/gongjindan.html', btnLabel: '✨ 황제공진단 클리닉', webpHero: '/webp/illust_gongjindan_heart_brain.webp' },
  syncope: { name: '자율신경 · 어지럼 · 편두통', liveUrl: 'https://www.bareunhaniwon.com/director/', localUrl: '/director.html', btnLabel: '🧠 9대 자율신경 정밀검진', webpHero: '/webp/illust_syncope_autonomic.webp' },
  digest: { name: '위장 · 식도 운동 · 소화', liveUrl: 'https://www.bareunhaniwon.com/director/', localUrl: '/director.html', btnLabel: '🩺 복부초음파·체열 정밀검진', webpHero: '/webp/illust_gut_metabolism.webp' },
  gut: { name: '복부 대사 · 체지방 · 부종', liveUrl: 'https://www.bareunhaniwon.com/diet-zero/', localUrl: '/diet-zero.html', btnLabel: '⚖️ 다이어트·식욕ZERO 클리닉', webpHero: '/webp/diet_minimal_card4_stage2_core_lipolysis.webp' },
  uterus: { name: '아랫배 · 골반 미세혈류 순환', liveUrl: 'https://www.bareunhaniwon.com/director/', localUrl: '/director.html', btnLabel: '🌸 하복부초음파·체열 검진', webpHero: '/webp/illust_uterus_fertility.webp' },
  prostate: { name: '전립선 · 방광 · 골반저 순환', liveUrl: 'https://www.bareunhaniwon.com/prostate/', localUrl: '/prostate.html', btnLabel: '🛡️ 전립선·남성활력 클리닉', webpHero: '/webp/illust_prostate_care.webp' }
};

function formatTableCellHtml(cellText) {
  const raw = String(cellText == null ? '' : cellText);
  if (raw.startsWith('[권장]')) {
    return '<span class="row-badge-good">권장</span> ' + escHtmlServer(raw.replace(/^\[권장\]\s*/, ''));
  }
  if (raw.startsWith('[주의]')) {
    return '<span class="row-badge-warn">주의</span> ' + escHtmlServer(raw.replace(/^\[주의\]\s*/, ''));
  }
  if (raw.startsWith('[특징]')) {
    return '<span class="row-badge-good">특징</span> ' + escHtmlServer(raw.replace(/^\[특징\]\s*/, ''));
  }
  return escHtmlServer(raw);
}

function normalizeChannelItem(rawItem, fallbackLabel, fallbackUrl) {
  if (typeof rawItem === 'string') {
    return { enabled: true, label: fallbackLabel, url: rawItem || fallbackUrl };
  }
  if (rawItem && typeof rawItem === 'object') {
    return {
      enabled: rawItem.enabled !== false,
      label: rawItem.label || fallbackLabel,
      url: rawItem.url || fallbackUrl
    };
  }
  return { enabled: true, label: fallbackLabel, url: fallbackUrl };
}

function buildOfficialFiveChannelsHtml(gCfg, includeShareBtn) {
  const ch = (gCfg && gCfg.channels) || {};
  const yt = normalizeChannelItem(ch.youtube, '유튜브', 'https://www.youtube.com/@bareunhaniwon');
  const nv = normalizeChannelItem(ch.naver, '네이버플레이스', 'https://naver.me/5U1ELn8L');
  const th = normalizeChannelItem(ch.threads, '스레드', 'https://www.threads.net/@bareun_oriental');
  const ig = normalizeChannelItem(ch.instagram, '인스타그램', 'https://www.instagram.com/bareun_oriental/');
  const kk = normalizeChannelItem(ch.kakao, '카카오톡', 'https://pf.kakao.com/_ykxcLK');
  const sharePillHtml = includeShareBtn
    ? `<button type="button" onclick="copyStandaloneShareLink(this)" class="ch-pill ch-pill-share" style="appearance:none;font-family:inherit;cursor:pointer;display:inline-flex;align-items:center;gap:6px;padding:7px 13px 7px 8px;border-radius:999px;background:linear-gradient(135deg,#161412,#26211B);border:1px solid #C5A059;font-size:0.79rem;font-weight:800;color:#F5DFB0;"><span class="ch-icon" style="width:24px;height:24px;border-radius:50%;background:linear-gradient(135deg,#E7C983,#C59E50);color:#14110F;display:inline-flex;align-items:center;justify-content:center;"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></span><span data-share-label="1">링크 퍼가기</span></button>`
    : '';

  return `<div class="official-channels-bar" style="margin-top:22px;padding:18px 20px;border-radius:16px;background:#F4EFE4;border:1px solid #DFD3BC;display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap;">
    <div class="channel-bar-copy">
      <strong style="display:block;font-size:0.9rem;color:#161412;">${escHtmlServer((gCfg && gCfg.channelBarLabel) || '더 많은 생활 건강 이야기 · 진료 시간 및 위치 안내')}</strong>
      <span style="font-size:0.78rem;color:#6B6359;">바른한의원 대전본점 (대전 대덕구 비래동로7번길 1, 2층 · 대표전화 010-5631-1275)</span>
    </div>
    <div class="channel-pills" style="display:inline-flex;align-items:center;gap:8px;flex-wrap:wrap;">
      ${sharePillHtml}
      ${yt.enabled ? `<a href="${escHtmlServer(yt.url)}" target="_blank" rel="noopener noreferrer" class="ch-pill" style="display:inline-flex;align-items:center;gap:6px;padding:7px 13px 7px 8px;border-radius:999px;background:#FFFFFF;border:1px solid #E2DDD2;font-size:0.79rem;font-weight:800;color:#1A1A1E;text-decoration:none;"><span class="ch-icon" style="width:24px;height:24px;border-radius:50%;background:#FF0000;color:#FFF;display:inline-flex;align-items:center;justify-content:center;"><svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span><span>${escHtmlServer(yt.label)}</span></a>` : ''}
      ${nv.enabled ? `<a href="${escHtmlServer(nv.url)}" target="_blank" rel="noopener noreferrer" class="ch-pill" style="display:inline-flex;align-items:center;gap:6px;padding:7px 13px 7px 8px;border-radius:999px;background:#FFFFFF;border:1px solid #E2DDD2;font-size:0.79rem;font-weight:800;color:#1A1A1E;text-decoration:none;"><span class="ch-icon" style="width:24px;height:24px;border-radius:50%;background:#03C75A;color:#FFF;display:inline-flex;align-items:center;justify-content:center;font-family:Arial,sans-serif;font-weight:900;font-size:0.78rem;">N</span><span>${escHtmlServer(nv.label)}</span></a>` : ''}
      ${th.enabled ? `<a href="${escHtmlServer(th.url)}" target="_blank" rel="noopener noreferrer" class="ch-pill" style="display:inline-flex;align-items:center;gap:6px;padding:7px 13px 7px 8px;border-radius:999px;background:#FFFFFF;border:1px solid #E2DDD2;font-size:0.79rem;font-weight:800;color:#1A1A1E;text-decoration:none;"><span class="ch-icon" style="width:24px;height:24px;border-radius:50%;background:#000000;color:#FFF;display:inline-flex;align-items:center;justify-content:center;font-weight:900;font-size:0.8rem;">@</span><span>${escHtmlServer(th.label)}</span></a>` : ''}
      ${ig.enabled ? `<a href="${escHtmlServer(ig.url)}" target="_blank" rel="noopener noreferrer" class="ch-pill" style="display:inline-flex;align-items:center;gap:6px;padding:7px 13px 7px 8px;border-radius:999px;background:#FFFFFF;border:1px solid #E2DDD2;font-size:0.79rem;font-weight:800;color:#1A1A1E;text-decoration:none;"><span class="ch-icon" style="width:24px;height:24px;border-radius:50%;background:radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%);color:#FFF;display:inline-flex;align-items:center;justify-content:center;"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg></span><span>${escHtmlServer(ig.label)}</span></a>` : ''}
      ${kk.enabled ? `<a href="${escHtmlServer(kk.url)}" target="_blank" rel="noopener noreferrer" class="ch-pill" style="display:inline-flex;align-items:center;gap:6px;padding:7px 13px 7px 8px;border-radius:999px;background:#FFFFFF;border:1px solid #E2DDD2;font-size:0.79rem;font-weight:800;color:#1A1A1E;text-decoration:none;"><span class="ch-icon" style="width:24px;height:24px;border-radius:50%;background:#FEE500;color:#191919;display:inline-flex;align-items:center;justify-content:center;"><svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4C6.48 4 2 7.52 2 11.86c0 2.83 1.89 5.31 4.74 6.7-.15.54-.96 3.47-1 3.63-.05.21.08.21.17.15.07-.05 2.89-1.95 4.05-2.75.66.1 1.34.15 2.04.15 5.52 0 10-3.52 10-7.88C22 7.52 17.52 4 12 4z"/></svg></span><span>${escHtmlServer(kk.label)}</span></a>` : ''}
    </div>
  </div>`;
}

function resolveHnSlotAssetUrls(rawFile, isLocal) {
  const s = String(rawFile || '').trim();
  if (!s) return { canonicalUrl: '', displayUrl: '' };
  if (/^https?:\/\//i.test(s)) {
    return { canonicalUrl: s, displayUrl: s };
  }
  if (s.startsWith('/wp-content/')) {
    const absWp = 'https://www.bareunhaniwon.com' + s;
    return { canonicalUrl: absWp, displayUrl: absWp };
  }
  const clean = s.replace(/^(?:\.\/|\/)+/, '');
  const canonicalUrl = GH_RAW_BASE_URL + clean;
  const webpRel = clean.toLowerCase().startsWith('webp/')
    ? clean
    : ('webp/' + clean.replace(/\.(png|jpe?g)$/i, '.webp'));
  if (isLocal) {
    const webpDisk = path.join(__dirname, webpRel);
    const localRel = fs.existsSync(webpDisk) ? webpRel : clean;
    return { canonicalUrl, displayUrl: '/' + localRel.replace(/^\/+/, '') };
  }
  return { canonicalUrl, displayUrl: GH_RAW_BASE_URL + webpRel };
}

function buildHealthNoteSchemaGraph(ep, partId, canonicalUrl, resolvedHeroImgUrl, extraImageUrls) {
  const partLabel = ep.partLabel || partId;
  const keyword = ep.keyword || partLabel;
  const theme = ep.theme || keyword;
  const hub = PART_CLINIC_HUB_MAP[partId] || PART_CLINIC_HUB_MAP.lumbar;
  const partMeta = PART_SEO_CLINICAL_META[partId] || PART_SEO_CLINICAL_META.lumbar;
  const seoTitle = ep.seoTitle || `${ep.questionTitle} [${partLabel} · ${keyword}]`;
  const fullTitle = seoTitle.includes('바른한의원') ? seoTitle : `${seoTitle} | 바른한의원 대전본점`;
  const truthLines = Array.isArray(ep.truthLines) ? ep.truthLines : [];
  const mythLines = Array.isArray(ep.mythLines) ? ep.mythLines : [];
  const directAnswer = ep.directAnswer || `${truthLines.join(' ')} ${mythLines[1] || ''}`.trim();
  const deepCaption = ep.deepIllustCaption || partMeta.heroCaption;
  const pubDate = ep.publishDate || '2026-11-04';
  const revDate = ep.lastReviewed || (pubDate > '2026-11-11' ? pubDate : '2026-11-15');
  const academicBasis = ep.academicBasis || '국제 의학 학술지 및 생리학 연구 보고';
  const consumerKws = Array.isArray(ep.consumerKeywords)
    ? ep.consumerKeywords.map(k => String(k || '').trim()).filter(Boolean)
    : [];
  const mergedKeywords = Array.from(new Set([keyword, partLabel, theme, ...consumerKws, '오늘의 건강 글'].filter(Boolean)));
  const imageList = Array.from(new Set(
    [
      ...(Array.isArray(extraImageUrls) ? extraImageUrls : []),
      resolvedHeroImgUrl
    ].map(u => String(u || '').trim()).filter(Boolean)
  ));
  if (imageList.length === 0 && resolvedHeroImgUrl) {
    imageList.push(resolvedHeroImgUrl);
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['MedicalClinic', 'MedicalOrganization', 'LocalBusiness'],
        '@id': 'https://www.bareunhaniwon.com/#clinic',
        'name': '바른한의원 대전본점',
        'alternateName': ['Bareun Korean Medicine Clinic Daejeon', '대전 바른한의원'],
        'url': 'https://www.bareunhaniwon.com/',
        'telephone': '+82-10-5631-1275',
        'taxID': '211-91-10479',
        'vatID': '211-91-10479',
        'priceRange': '₩₩',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': '비래동로7번길 1, 2층',
          'addressLocality': '대덕구',
          'addressRegion': '대전광역시',
          'postalCode': '34417',
          'addressCountry': 'KR'
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': 36.35536,
          'longitude': 127.44778
        },
        'sameAs': [
          'https://www.youtube.com/@bareunhaniwon',
          'https://naver.me/5U1ELn8L',
          'https://blog.naver.com/wei0508',
          'https://www.threads.net/@bareun_oriental',
          'https://www.instagram.com/bareun_oriental/',
          'https://pf.kakao.com/_ykxcLK'
        ],
        'founder': { '@id': 'https://www.bareunhaniwon.com/director/#physician' }
      },
      {
        '@type': 'Person',
        '@id': 'https://www.bareunhaniwon.com/director/#physician',
        'name': '안정위',
        'jobTitle': '대표원장 (한의사)',
        'url': 'https://www.bareunhaniwon.com/director/',
        'worksFor': { '@id': 'https://www.bareunhaniwon.com/#clinic' },
        'knowsAbout': ['소아 키 성장', '성조숙증 예방', '초음파 성장판 관찰', '추나요법', '두피열 탈모', '자율신경 및 대사 기능의학']
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': '홈', 'item': 'https://www.bareunhaniwon.com/' },
          { '@type': 'ListItem', 'position': 2, 'name': '3D 인체모형 · 오늘의 건강 글', 'item': 'https://www.bareunhaniwon.com/body-explorer/' },
          { '@type': 'ListItem', 'position': 3, 'name': hub.name, 'item': hub.liveUrl },
          { '@type': 'ListItem', 'position': 4, 'name': theme, 'item': canonicalUrl }
        ]
      },
      {
        '@type': 'MedicalWebPage',
        '@id': `${canonicalUrl}#webpage`,
        'url': canonicalUrl,
        'name': fullTitle,
        'headline': ep.questionTitle,
        'description': directAnswer,
        'inLanguage': 'ko-KR',
        'datePublished': pubDate,
        'dateModified': revDate,
        'lastReviewed': revDate,
        'reviewedBy': { '@id': 'https://www.bareunhaniwon.com/director/#physician' },
        'breadcrumb': { '@id': `${canonicalUrl}#breadcrumb` },
        'primaryImageOfPage': {
          '@type': 'ImageObject',
          'url': resolvedHeroImgUrl,
          'width': 1376,
          'height': 768,
          'caption': `${partLabel} (${keyword}) — ${deepCaption}`
        },
        'about': { '@type': 'AnatomicalStructure', 'name': partLabel },
        'speakable': {
          '@type': 'SpeakableSpecification',
          'cssSelector': ['.direct-answer-lead', '.clinical-observation-box']
        }
      },
      {
        '@type': 'MedicalScholarlyArticle',
        '@id': `${canonicalUrl}#article`,
        'mainEntityOfPage': { '@id': `${canonicalUrl}#webpage` },
        'headline': ep.questionTitle,
        'description': directAnswer,
        'image': imageList,
        'datePublished': `${pubDate}T09:00:00+09:00`,
        'dateModified': `${revDate}T10:30:00+09:00`,
        'inLanguage': 'ko-KR',
        'author': { '@id': 'https://www.bareunhaniwon.com/director/#physician' },
        'publisher': { '@id': 'https://www.bareunhaniwon.com/#clinic' },
        'articleSection': `${partLabel} · ${theme}`,
        'keywords': mergedKeywords.join(', '),
        'citation': [academicBasis]
      }
    ]
  };
}

/**
 * 3) 72편 '오늘의 건강 글' 7단 하이엔드 정본 칼럼 빌더 (독립 정본 URL /health-note-{id}/ 복원 + 5노드 JSON-LD + 고객 화면 검수기/확산탭 0%)
 */
function buildHealthNoteSeoAeoGeoPost(ep, partId, siblingEpisodes, partMediaUrlMap, globalCfgOverride) {
  const slug = 'health-note-' + ep.id;
  const canonicalUrl = `https://www.bareunhaniwon.com/${slug}/`;
  const explorerDeepUrl = `https://www.bareunhaniwon.com/body-explorer/?part=${encodeURIComponent(partId)}&note=${encodeURIComponent(ep.id)}`;
  const partLabel = ep.partLabel || partId;
  const keyword = ep.keyword || partLabel;
  const theme = ep.theme || keyword;
  const academicBasis = ep.academicBasis || '국제 의학 학술지 및 생리학 연구 보고';
  const empathyLines = Array.isArray(ep.empathyLines) ? ep.empathyLines : [];
  const truthLines = Array.isArray(ep.truthLines) ? ep.truthLines : [];
  const mythLines = Array.isArray(ep.mythLines) ? ep.mythLines : [];
  const checkList = Array.isArray(ep.checkList) ? ep.checkList : [];

  const partMeta = PART_SEO_CLINICAL_META[partId] || PART_SEO_CLINICAL_META.lumbar;
  const hub = PART_CLINIC_HUB_MAP[partId] || PART_CLINIC_HUB_MAP.lumbar;
  const rawHeroFile = ep.deepIllustImg || partMeta.heroFile;
  const heroUrls = resolveHnSlotAssetUrls(rawHeroFile, false);
  const resolvedHeroImgUrl = (partMediaUrlMap && partMediaUrlMap[partId] && rawHeroFile === partMeta.heroFile)
    ? partMediaUrlMap[partId]
    : heroUrls.canonicalUrl;
  const displayHeroImgUrl = heroUrls.displayUrl || resolvedHeroImgUrl;

  const empathyUrls = resolveHnSlotAssetUrls(ep.empathyIllustImg || '', false);
  const routineUrls = resolveHnSlotAssetUrls(ep.routineIllustImg || '', false);
  const empathyCaption = ep.empathyIllustCaption || '';
  const empathyAlt = ep.empathyIllustAlt || `${partLabel} 일상 공감 장면 — ${empathyCaption || theme}`;
  const routineCaption = ep.routineIllustCaption || '';
  const routineAlt = ep.routineIllustAlt || `${partLabel} 전후 실천 루틴 비교 — ${routineCaption || theme}`;
  const consumerKeywords = Array.isArray(ep.consumerKeywords)
    ? ep.consumerKeywords.map(k => String(k || '').trim()).filter(Boolean)
    : [];

  const gCfg = globalCfgOverride || {};
  const bestLimit = Math.max(0, Math.min(3, Number(gCfg.bestReadCount != null ? gCfg.bestReadCount : 2)));
  const siblings = Array.isArray(siblingEpisodes) ? siblingEpisodes.filter(s => s && s.enabled !== false) : (BODY_3D_AUTO_NOTES[partId] || []);
  const curIdx = siblings.findIndex(s => s && s.id === ep.id);
  const best2Notes = [];
  if (bestLimit > 0 && siblings.length > 1) {
    for (let offset = 1; offset < siblings.length && best2Notes.length < bestLimit; offset++) {
      const cand = siblings[(Math.max(0, curIdx) + offset) % siblings.length];
      if (cand && cand.id !== ep.id) best2Notes.push(cand);
    }
  }

  const deepCaption = ep.deepIllustCaption || partMeta.heroCaption;
  const deepTitle = ep.deepTitle || `${theme}, 우리 몸속에서는 어떤 변화가 일어날까요?`;
  const deepParagraphs = Array.isArray(ep.deepParagraphs) && ep.deepParagraphs.length > 0
    ? ep.deepParagraphs
    : [partMeta.physioMechanism];
  const clinicalObservation = ep.clinicalObservation || '';
  const compTable = (ep.comparisonTable && Array.isArray(ep.comparisonTable.headers) && Array.isArray(ep.comparisonTable.rows))
    ? ep.comparisonTable
    : null;
  const selfCheckItems = (Array.isArray(ep.selfCheckItems) && ep.selfCheckItems.length > 0)
    ? ep.selfCheckItems
    : checkList;
  const redFlags = Array.isArray(ep.redFlags) ? ep.redFlags : [];
  const deepReference = ep.deepReference || `참고 문헌 · ${academicBasis}`;
  const revDate = ep.lastReviewed || (ep.publishDate && ep.publishDate > '2026-11-11' ? ep.publishDate : '2026-11-15');

  const directAnswerSummary = ep.directAnswer || `${truthLines.join(' ')} ${mythLines[1] || ''}`.trim();
  const postTitle = ep.seoTitle || `${ep.questionTitle} [${partLabel} · ${keyword}]`;
  const deepAlt = ep.deepIllustAlt || `${partLabel} 해부 생리 원리 도해 — ${deepCaption}`;
  const schemaGraph = buildHealthNoteSchemaGraph(
    ep,
    partId,
    canonicalUrl,
    resolvedHeroImgUrl,
    [empathyUrls.canonicalUrl, resolvedHeroImgUrl, routineUrls.canonicalUrl]
  );

  const empathyFigureHtml = empathyUrls.displayUrl
    ? `<figure style="margin:0 0 16px;border-radius:18px;overflow:hidden;border:1px solid #E8E1D3;background:#FFFFFF;">
        <img src="${escHtmlServer(empathyUrls.displayUrl)}" alt="${escHtmlServer(empathyAlt)}" width="1376" height="768" style="width:100%;height:auto;max-height:400px;object-fit:cover;display:block;" />
        ${empathyCaption ? `<figcaption style="padding:11px 16px;background:#FBF8F1;border-top:1px solid #E8E1D3;font-size:0.82rem;font-weight:600;color:#3A352F;"><span style="display:inline-block;padding:2px 8px;border-radius:999px;background:#161412;color:#F4DFB0;font-size:0.7rem;font-weight:800;margin-right:7px;">일상 공감 01</span>${escHtmlServer(empathyCaption)}</figcaption>` : ''}
      </figure>`
    : '';

  const routineFigureHtml = routineUrls.displayUrl
    ? `<figure style="margin:0 0 16px;border-radius:18px;overflow:hidden;border:1px solid #E8E1D3;background:#FFFFFF;">
        <img src="${escHtmlServer(routineUrls.displayUrl)}" alt="${escHtmlServer(routineAlt)}" width="1376" height="768" loading="lazy" decoding="async" style="width:100%;height:auto;max-height:400px;object-fit:cover;display:block;" />
        ${routineCaption ? `<figcaption style="padding:11px 16px;background:#F7F3E9;border-top:1px solid #E8E1D3;font-size:0.82rem;font-weight:600;color:#3A352F;"><span style="display:inline-block;padding:2px 8px;border-radius:999px;background:#065F46;color:#ECFDF5;font-size:0.7rem;font-weight:800;margin-right:7px;">전·후 루틴 03</span>${escHtmlServer(routineCaption)}</figcaption>` : ''}
      </figure>`
    : '';

  const consumerKwHtml = consumerKeywords.length > 0
    ? `<div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-top:12px;">
        <span style="font-size:0.75rem;font-weight:800;color:#9E772B;">🔎 자주 찾는 일상 키워드</span>
        ${consumerKeywords.map(kw => `<span style="display:inline-flex;padding:3px 10px;border-radius:999px;background:#FAF6EC;border:1px solid #E7D7B4;color:#5A4B35;font-size:0.75rem;font-weight:700;">#${escHtmlServer(kw)}</span>`).join('')}
      </div>`
    : '';

  const compTableHtml = compTable
    ? `<section style="padding:22px 22px;border-radius:16px;background:#FFFFFF;border:1px solid #E8E1D3;margin-bottom:16px;">
        <h2 style="margin:0 0 10px;font-family:'Noto Serif KR',serif;font-size:1.12rem;font-weight:800;color:#161412;">📊 ${escHtmlServer(compTable.heading || (keyword + ' 생활 기준 한눈에 비교하기'))}</h2>
        ${compTable.intro ? `<p style="margin:0 0 12px;font-size:0.92rem;color:#3A352F;">${escHtmlServer(compTable.intro)}</p>` : ''}
        <div style="overflow-x:auto;border-radius:12px;border:1px solid #E8E1D3;">
          <table style="width:100%;border-collapse:collapse;min-width:560px;font-size:0.86rem;background:#FFFFFF;">
            <thead>
              <tr>
                ${compTable.headers.map(h => `<th style="background:#1D1916;color:#F5E3B8;text-align:left;padding:11px 13px;font-weight:800;">${escHtmlServer(h)}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${compTable.rows.map((r, rIdx) => `<tr style="${rIdx === compTable.recommendedRowIndex ? 'background:#FFFDF6;font-weight:600;' : ''}">
                ${(Array.isArray(r) ? r : []).map((c, cIdx) => `<td style="padding:11px 13px;border-top:1px solid #E8E1D3;color:#161412;vertical-align:top;">${cIdx === 0 ? `<strong>${escHtmlServer(c)}</strong>` : formatTableCellHtml(c)}</td>`).join('')}
              </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </section>`
    : '';

  const best2Html = best2Notes.length > 0
    ? `<section style="padding:20px 22px;border-radius:16px;background:#FFFFFF;border:1px solid #DFC99B;margin-bottom:18px;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
          <span style="padding:3px 9px;border-radius:6px;background:#14110F;color:#E5C67E;font-size:0.73rem;font-weight:800;">${escHtmlServer(gCfg.bestReadBadge || '이어서 읽기 BEST 2')}</span>
          <strong style="font-size:0.9rem;color:#161412;">함께 읽으면 연결되는 ${escHtmlServer(partLabel)} 건강 가이드</strong>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:10px;">
          ${best2Notes.map((cn, idx) => `
            <a href="https://www.bareunhaniwon.com/health-note-${encodeURIComponent(cn.id)}/" style="display:block;padding:13px 15px;border-radius:12px;background:#FAF8F3;border:1px solid #E8E1D3;color:#161412;text-decoration:none;">
              <div style="font-size:0.73rem;font-weight:800;color:#9E772B;margin-bottom:4px;">이어서 읽기 0${idx + 1} · ${escHtmlServer(cn.keyword || partLabel)}</div>
              <div style="font-size:0.89rem;font-weight:700;color:#161412;line-height:1.45;">&ldquo;${escHtmlServer(cn.questionTitle)}&rdquo;</div>
            </a>`).join('')}
          <a href="${escHtmlServer(hub.liveUrl)}" style="display:block;padding:13px 15px;border-radius:12px;background:#FAF8F3;border:1px solid #E8E1D3;color:#161412;text-decoration:none;">
            <div style="font-size:0.73rem;font-weight:800;color:#9E772B;margin-bottom:4px;">전문 진료 원리 안내</div>
            <div style="font-size:0.89rem;font-weight:700;color:#161412;line-height:1.45;">${escHtmlServer(hub.name)} 상세 원리 살펴보기 &rarr;</div>
          </a>
        </div>
      </section>`
    : '';

  const channelIconsHtml = buildOfficialFiveChannelsHtml(gCfg);

  const standaloneHtml = `<!-- wp:html -->
<script type="application/ld+json">${JSON.stringify(schemaGraph)}</script>
<article class="bareun-health-note-seo-article" style="max-width:820px;margin:0 auto;padding:30px 20px 64px;font-family:'Pretendard',-apple-system,BlinkMacSystemFont,sans-serif;color:#161412;line-height:1.78;">
  <header style="padding:26px 26px 22px;border-radius:20px;background:#FFFFFF;border:1px solid #E8E1D3;border-top:4px solid #C5A059;margin-bottom:20px;">
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:10px;">
      <span style="display:inline-flex;padding:4px 11px;border-radius:999px;background:#FDF9EE;border:1px solid #E7D7B4;color:#9E772B;font-size:0.76rem;font-weight:800;">${escHtmlServer(partLabel)} · ${escHtmlServer(keyword)}</span>
      <span style="font-size:0.77rem;color:#6B6359;font-weight:600;">발행 ${escHtmlServer(ep.publishDate || '2026-11-04')} · 최종 의학 검토 ${escHtmlServer(revDate)}</span>
    </div>
    <h1 style="margin:0 0 16px;font-family:'Noto Serif KR',serif;font-size:clamp(1.36rem,2.6vw,1.86rem);font-weight:800;color:#161412;line-height:1.42;word-break:keep-all;">${escHtmlServer(ep.questionTitle)}</h1>
    <div style="padding:12px 15px;border-radius:12px;background:#FAF8F3;border:1px solid #E8E1D3;font-size:0.82rem;color:#3A352F;">
      <strong>집필 · 의학 감수: 안정위 한의사</strong> (바른한의원 대전본점 대표원장 · <a href="https://www.bareunhaniwon.com/director/" style="color:#9E772B;font-weight:700;text-decoration:none;">의료진 약력 및 9대 정밀검진 기준 보기 ↗</a>)
    </div>
  </header>

  <section class="direct-answer-lead" style="padding:20px 22px;border-radius:16px;background:linear-gradient(180deg,#FFFDF8 0%,#FDF8EC 100%);border:1.5px solid #C5A059;border-left:5px solid #9E772B;margin-bottom:20px;">
    <div style="font-size:0.8rem;font-weight:800;color:#9E772B;margin-bottom:6px;">💡 바쁜 일상을 위한 30초 핵심 결론</div>
    <p style="margin:0;font-size:0.96rem;font-weight:600;color:#161412;word-break:keep-all;">${escHtmlServer(directAnswerSummary)}</p>
    ${consumerKwHtml}
  </section>

  ${empathyFigureHtml}

  <section style="padding:22px 22px;border-radius:16px;background:#FFFFFF;border:1px solid #E8E1D3;margin-bottom:16px;">
    <h2 style="margin:0 0 10px;font-family:'Noto Serif KR',serif;font-size:1.12rem;font-weight:800;color:#161412;">일상 속 이런 모습이 보이나요? · 흔한 오해 바로잡기</h2>
    ${empathyLines.map(l => `<p style="margin:0 0 8px;font-size:0.94rem;color:#3A352F;word-break:keep-all;">${escHtmlServer(l)}</p>`).join('')}
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:10px;margin-top:12px;">
      <div style="padding:13px 15px;border-radius:12px;background:#FFF1F2;border:1px solid #FECDD3;font-size:0.89rem;color:#9F1239;"><strong>❌ 흔히 하기 쉬운 오해</strong><br/>${escHtmlServer(mythLines[0] || '')}</div>
      <div style="padding:13px 15px;border-radius:12px;background:#ECFDF5;border:1px solid #A7F3D0;font-size:0.89rem;color:#065F46;"><strong>⭕ 우리 몸이 알려주는 진실</strong><br/>${escHtmlServer(mythLines[1] || '')}</div>
    </div>
  </section>

  <figure style="margin:0 0 16px;border-radius:18px;overflow:hidden;border:1px solid #E8E1D3;background:#FFFFFF;">
    <img src="${escHtmlServer(displayHeroImgUrl)}" alt="${escHtmlServer(deepAlt)}" width="1376" height="768" style="width:100%;height:auto;max-height:400px;object-fit:cover;display:block;" />
    <figcaption style="padding:11px 16px;background:#F7F3E9;border-top:1px solid #E8E1D3;font-size:0.82rem;font-weight:600;color:#3A352F;"><span style="display:inline-block;padding:2px 8px;border-radius:999px;background:#9E772B;color:#FFFFFF;font-size:0.7rem;font-weight:800;margin-right:7px;">원리 도해 02</span>${escHtmlServer(deepCaption)}</figcaption>
    <div style="display:flex;align-items:center;justify-content:space-between;gap:14px;padding:16px 20px;background:linear-gradient(135deg,#171310 0%,#261E18 100%);color:#FFFFFF;flex-wrap:wrap;">
      <div>
        <strong style="display:block;font-size:0.92rem;color:#F4DFB0;">🧬 방금 읽은 ‘${escHtmlServer(partLabel)}’ 구조, 3D 인체모형으로 직접 돌려 보시겠어요?</strong>
        <span style="font-size:0.8rem;color:#D7CFC0;">360° 입체 회전 뷰어에서 근육·신경·혈관 연결을 한눈에 살펴보실 수 있습니다.</span>
      </div>
      <a href="${escHtmlServer(explorerDeepUrl)}" style="display:inline-flex;align-items:center;padding:10px 17px;border-radius:999px;background:linear-gradient(135deg,#D7B56D,#B58938);color:#14110F;font-size:0.84rem;font-weight:800;text-decoration:none;white-space:nowrap;">3D 인체모형 열기 &rarr;</a>
    </div>
  </figure>

  <section style="padding:22px 22px;border-radius:16px;background:#FFFFFF;border:1px solid #E8E1D3;margin-bottom:16px;">
    <h2 style="margin:0 0 10px;font-family:'Noto Serif KR',serif;font-size:1.12rem;font-weight:800;color:#161412;">📖 ${escHtmlServer(deepTitle)}</h2>
    ${deepParagraphs.map(p => `<p style="margin:0 0 11px;font-size:0.94rem;color:#3A352F;word-break:keep-all;">${escHtmlServer(p)}</p>`).join('')}
    ${clinicalObservation ? `<div class="clinical-observation-box" style="margin-top:14px;padding:16px 18px;border-radius:13px;background:#FAF6EC;border:1px solid #E7D7B4;">
      <div style="font-size:0.84rem;font-weight:800;color:#9E772B;margin-bottom:6px;">🩺 진료실에서 살펴본 생활 리듬 관찰 포인트</div>
      <p style="margin:0;font-size:0.91rem;color:#161412;word-break:keep-all;">${escHtmlServer(clinicalObservation)}</p>
    </div>` : ''}
  </section>

  ${compTableHtml}
  ${routineFigureHtml}

  <section style="padding:22px 22px;border-radius:16px;background:#FFFFFF;border:1px solid #E8E1D3;margin-bottom:16px;">
    <h2 style="margin:0 0 10px;font-family:'Noto Serif KR',serif;font-size:1.12rem;font-weight:800;color:#161412;">✅ 오늘 밤 직접 확인해 보는 5가지 생활 신호</h2>
    <ul style="margin:0;padding-left:20px;font-size:0.92rem;color:#161412;">
      ${selfCheckItems.map(item => `<li style="margin-bottom:7px;word-break:keep-all;">${escHtmlServer(item)}</li>`).join('')}
    </ul>
  </section>

  <section style="padding:22px 22px;border-radius:16px;background:#FFFFFF;border:1px solid #E8E1D3;margin-bottom:18px;">
    <h2 style="margin:0 0 10px;font-family:'Noto Serif KR',serif;font-size:1.12rem;font-weight:800;color:#161412;">🩺 세심한 대면 확인을 권해 드리는 경우 · 참고 학술 문헌</h2>
    ${redFlags.length > 0 ? `<div style="padding:15px 18px;border-radius:13px;background:#F8FAFC;border:1px solid #CBD5E1;border-left:4px solid #334155;margin-bottom:12px;">
      <ul style="margin:0;padding-left:18px;font-size:0.89rem;color:#334155;">
        ${redFlags.map(rf => `<li style="margin-bottom:6px;word-break:keep-all;">${escHtmlServer(rf)}</li>`).join('')}
      </ul>
    </div>` : ''}
    <div style="padding:12px 15px;border-radius:10px;background:#FAF8F3;border:1px solid #E8E1D3;font-size:0.8rem;color:#6B6359;">📚 ${escHtmlServer(deepReference)}</div>
  </section>

  ${best2Html}
  ${channelIconsHtml}
</article>
<!-- /wp:html -->`;

  return {
    id: ep.id,
    slug,
    partId,
    categorySlug: 'blog-' + partId,
    title: postTitle,
    summary: directAnswerSummary,
    publishDate: ep.publishDate,
    lastReviewed: revDate,
    heroFile: rawHeroFile,
    canonicalUrl,
    explorerDeepUrl,
    standaloneHtml
  };
}

/**
 * 3-B) 로컬(serve.js) 및 프리뷰용 풀스크린 7단 하이엔드 독립 정본 HTML5 렌더러
 *      (원장님 전용 검수기 Tab 2 / 확산 패키지 Tab 3 고객 노출 0% 완벽 차단)
 */
function renderStandaloneHealthNoteFullPage(noteId, options) {
  const opts = options || {};
  const isLocal = Boolean(opts.localMode);
  const customCfg = opts.customCfg || loadCustomHealthNotesConfig();
  const cleanId = String(noteId || '').trim().toLowerCase();

  let targetNote = null;
  let siblingNotes = [];
  let gCfg = (customCfg && customCfg.globalSettings) || {};

  if (customCfg && Array.isArray(customCfg.notes)) {
    targetNote = customCfg.notes.find(n => n && String(n.id || '').toLowerCase() === cleanId && n.enabled !== false);
    if (targetNote) {
      siblingNotes = customCfg.notes.filter(n => n && n.partId === targetNote.partId && n.enabled !== false);
    }
  }
  if (!targetNote) {
    for (const [pId, eps] of Object.entries(BODY_3D_AUTO_NOTES)) {
      const found = (eps || []).find(e => e && String(e.id || '').toLowerCase() === cleanId);
      if (found) {
        targetNote = { ...found, partId: pId };
        siblingNotes = eps || [];
        break;
      }
    }
  }
  if (!targetNote) return null;

  const partId = targetNote.partId || 'knee';
  const partLabel = targetNote.partLabel || partId;
  const keyword = targetNote.keyword || partLabel;
  const theme = targetNote.theme || keyword;
  const partMeta = PART_SEO_CLINICAL_META[partId] || PART_SEO_CLINICAL_META.lumbar;
  const hub = PART_CLINIC_HUB_MAP[partId] || PART_CLINIC_HUB_MAP.lumbar;

  const canonicalUrl = `https://www.bareunhaniwon.com/health-note-${encodeURIComponent(targetNote.id)}/`;
  const homeHref = isLocal ? '/story-3d.html' : 'https://www.bareunhaniwon.com/';
  const explorerHubHref = isLocal ? '/body-explorer.html' : 'https://www.bareunhaniwon.com/body-explorer/';
  const explorerPartHref = isLocal
    ? `/body-explorer.html?part=${encodeURIComponent(partId)}&note=${encodeURIComponent(targetNote.id)}`
    : `https://www.bareunhaniwon.com/body-explorer/?part=${encodeURIComponent(partId)}&note=${encodeURIComponent(targetNote.id)}`;
  const clinicHref = isLocal ? hub.localUrl : hub.liveUrl;
  const directorHref = isLocal ? '/director.html' : 'https://www.bareunhaniwon.com/director/';
  const directorAvatarSrc = isLocal ? '/webp/card_1_director.webp' : 'https://www.bareunhaniwon.com/wp-content/uploads/bareun-3d-assets/webp/card_1_director.webp';

  const rawHeroFile = targetNote.deepIllustImg || partMeta.heroFile;
  const heroResolved = resolveHnSlotAssetUrls(rawHeroFile, isLocal);
  const ogImgUrl = heroResolved.canonicalUrl;
  const displayHeroSrc = heroResolved.displayUrl || (isLocal ? (hub.webpHero || ('/' + String(rawHeroFile).replace(/^\/+/, ''))) : ogImgUrl);

  const empathyResolved = resolveHnSlotAssetUrls(targetNote.empathyIllustImg || '', isLocal);
  const routineResolved = resolveHnSlotAssetUrls(targetNote.routineIllustImg || '', isLocal);
  const empathyCaption = targetNote.empathyIllustCaption || '';
  const empathyAlt = targetNote.empathyIllustAlt || `${partLabel} 일상 공감 장면 — ${empathyCaption || theme}`;
  const routineCaption = targetNote.routineIllustCaption || '';
  const routineAlt = targetNote.routineIllustAlt || `${partLabel} 전후 실천 루틴 비교 — ${routineCaption || theme}`;
  const consumerKeywords = Array.isArray(targetNote.consumerKeywords)
    ? targetNote.consumerKeywords.map(k => String(k || '').trim()).filter(Boolean)
    : [];

  const seoTitleBase = targetNote.seoTitle || `${targetNote.questionTitle} [${partLabel} · ${keyword}]`;
  const pageTitle = seoTitleBase.includes('바른한의원') ? seoTitleBase : `${seoTitleBase} | 바른한의원 대전본점`;
  const empathyLines = Array.isArray(targetNote.empathyLines) ? targetNote.empathyLines : [];
  const truthLines = Array.isArray(targetNote.truthLines) ? targetNote.truthLines : [];
  const mythLines = Array.isArray(targetNote.mythLines) ? targetNote.mythLines : [];
  const checkList = Array.isArray(targetNote.checkList) ? targetNote.checkList : [];
  const directAnswer = targetNote.directAnswer || `${truthLines.join(' ')} ${mythLines[1] || ''}`.trim();
  const deepCaption = targetNote.deepIllustCaption || partMeta.heroCaption;
  const deepTitle = targetNote.deepTitle || `${theme}, 우리 몸속에서는 어떤 변화가 일어날까요?`;
  const deepParagraphs = Array.isArray(targetNote.deepParagraphs) && targetNote.deepParagraphs.length > 0
    ? targetNote.deepParagraphs
    : [partMeta.physioMechanism];
  const clinicalObservation = targetNote.clinicalObservation || '';
  const compTable = (targetNote.comparisonTable && Array.isArray(targetNote.comparisonTable.headers) && Array.isArray(targetNote.comparisonTable.rows))
    ? targetNote.comparisonTable
    : null;
  const selfCheckItems = (Array.isArray(targetNote.selfCheckItems) && targetNote.selfCheckItems.length > 0)
    ? targetNote.selfCheckItems
    : checkList;
  const deepSignals = Array.isArray(targetNote.deepSignals) ? targetNote.deepSignals : [];
  const redFlags = Array.isArray(targetNote.redFlags) ? targetNote.redFlags : [];
  const deepReference = targetNote.deepReference || `참고 문헌 · ${targetNote.academicBasis || '국제 의학 학술지 보고'}`;
  const pubDate = targetNote.publishDate || '2026-11-04';
  const revDate = targetNote.lastReviewed || (pubDate > '2026-11-11' ? pubDate : '2026-11-15');

  let localNoteViews = {};
  if (fs.existsSync(DB_PATH)) {
    try {
      const dbObj = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
      if (dbObj && dbObj.noteViews && typeof dbObj.noteViews === 'object') {
        for (const [k, v] of Object.entries(dbObj.noteViews)) {
          const lk = String(k).toLowerCase();
          localNoteViews[lk] = Math.max(Number(localNoteViews[lk]) || 0, Number(v) || 0);
        }
      }
    } catch (e) {}
  }
  const curViews = Number(localNoteViews[cleanId]) || 0;
  const todayKstStr = getKstDateString(0);
  const peerCandidates = siblingNotes
    .filter(s => s && s.id && String(s.id).toLowerCase() !== cleanId && s.publishDate !== '2026-10-28' && !String(s.id).includes('20261028') && (!s.publishDate || s.publishDate <= todayKstStr || s.pinnedTop))
    .map(s => ({ ...s, _views: Number(localNoteViews[String(s.id).toLowerCase()]) || 0 }));
  peerCandidates.sort((a, b) => {
    const vDiff = (b._views || 0) - (a._views || 0);
    if (vDiff !== 0) return vDiff;
    const dCmp = String(b.publishDate || '').localeCompare(String(a.publishDate || ''));
    if (dCmp !== 0) return dCmp;
    return String(b.id || '').localeCompare(String(a.id || ''));
  });
  const best2Notes = peerCandidates.slice(0, 2);

  const schemaGraph = buildHealthNoteSchemaGraph(
    targetNote,
    partId,
    canonicalUrl,
    ogImgUrl,
    [empathyResolved.canonicalUrl, ogImgUrl, routineResolved.canonicalUrl]
  );
  const deepAlt = targetNote.deepIllustAlt || `${partLabel} — ${deepCaption}`;
  const metaKeywordsStr = Array.from(new Set([keyword, partLabel, theme, ...consumerKeywords, '오늘의 건강 글'].filter(Boolean))).join(', ');
  const preloadLeadImg = empathyResolved.displayUrl || displayHeroSrc;

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escHtmlServer(pageTitle)}</title>
  <meta name="description" content="${escHtmlServer(directAnswer)}" />
  <meta name="keywords" content="${escHtmlServer(metaKeywordsStr)}" />
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
  <link rel="canonical" href="${escHtmlServer(canonicalUrl)}" />
  <link rel="alternate" hreflang="ko-KR" href="${escHtmlServer(canonicalUrl)}" />
  <link rel="alternate" hreflang="x-default" href="${escHtmlServer(canonicalUrl)}" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="바른한의원 대전본점" />
  <meta property="og:locale" content="ko_KR" />
  <meta property="og:title" content="${escHtmlServer(pageTitle)}" />
  <meta property="og:description" content="${escHtmlServer(directAnswer)}" />
  <meta property="og:url" content="${escHtmlServer(canonicalUrl)}" />
  <meta property="og:image" content="${escHtmlServer(ogImgUrl)}" />
  <meta property="og:image:width" content="1376" />
  <meta property="og:image:height" content="768" />
  <meta property="article:published_time" content="${escHtmlServer(pubDate)}T09:00:00+09:00" />
  <meta property="article:modified_time" content="${escHtmlServer(revDate)}T10:30:00+09:00" />
  <meta property="article:section" content="${escHtmlServer(partLabel + ' · ' + keyword)}" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="preload" as="image" href="${escHtmlServer(preloadLeadImg)}" />
  <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@600;700;800&display=swap" rel="stylesheet" />
  <script type="application/ld+json">${JSON.stringify(schemaGraph)}</script>
  <style>
    :root {
      --bg-paper: #FAF8F3;
      --bg-card: #FFFFFF;
      --bg-warm: #F4EFE4;
      --ink-900: #161412;
      --ink-700: #3A352F;
      --ink-500: #6B6359;
      --gold-600: #9E772B;
      --gold-500: #C5A059;
      --gold-200: #E7D7B4;
      --gold-50: #FDF9EE;
      --espresso: #14110F;
      --border-soft: #E8E1D3;
      --emerald-bg: #ECFDF5;
      --emerald-ink: #065F46;
      --rose-bg: #FFF1F2;
      --rose-ink: #9F1239;
    }
    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body {
      margin: 0;
      background: var(--bg-paper);
      color: var(--ink-900);
      font-family: 'Pretendard Variable', 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
      line-height: 1.78;
      -webkit-font-smoothing: antialiased;
    }
    .clinic-top-header { background: #FFFFFF; border-bottom: 1px solid var(--border-soft); padding: 14px 20px; position: sticky; top: 0; z-index: 100; }
    .clinic-top-inner { max-width: 920px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
    .clinic-brand-link { display: inline-flex; align-items: center; gap: 10px; text-decoration: none; color: var(--ink-900); font-weight: 800; font-size: 0.98rem; }
    .clinic-brand-mark { width: 30px; height: 30px; border-radius: 8px; background: var(--espresso); color: var(--gold-500); display: inline-flex; align-items: center; justify-content: center; font-family: 'Noto Serif KR', serif; font-weight: 800; font-size: 0.88rem; border: 1px solid var(--gold-500); }
    .clinic-header-actions { display: inline-flex; align-items: center; gap: 8px; flex-wrap: wrap; }
    .header-action-link { display: inline-flex; align-items: center; gap: 6px; padding: 7px 13px; border-radius: 999px; font-size: 0.8rem; font-weight: 700; text-decoration: none; transition: transform 0.15s ease; }
    .header-action-link:hover { transform: translateY(-1px); }
    .header-action-3d { background: var(--espresso); color: #F5DFB0; border: 1px solid var(--gold-500); }
    .header-action-home { background: var(--bg-warm); color: var(--ink-700); border: 1px solid var(--border-soft); }
    .header-action-share { appearance: none; font-family: inherit; cursor: pointer; background: linear-gradient(135deg, #E7C983 0%, #C59E50 100%); color: #14110F; border: 1px solid #C5A059; box-shadow: 0 2px 8px rgba(197, 160, 89, 0.28); }
    .header-action-share.is-copied, .ch-pill-share.is-copied { background: #065F46 !important; color: #FFFFFF !important; border-color: #34D399 !important; }
    .view-count-chip { display: inline-flex; align-items: center; gap: 4px; padding: 3px 10px; border-radius: 999px; background: #F4EFE4; border: 1px solid var(--gold-200); color: var(--ink-700); font-size: 0.75rem; font-weight: 800; font-variant-numeric: tabular-nums; }
    #standaloneShareToast { position: fixed; left: 50%; bottom: 32px; transform: translate(-50%, 16px); z-index: 9999; padding: 11px 18px; border-radius: 999px; background: rgba(20, 17, 15, 0.96); color: #F7E5BA; border: 1.5px solid #C5A059; box-shadow: 0 12px 32px rgba(0, 0, 0, 0.28); font-size: 0.82rem; font-weight: 800; white-space: nowrap; max-width: calc(100vw - 24px); overflow: hidden; text-overflow: ellipsis; opacity: 0; visibility: hidden; pointer-events: none; transition: opacity 0.22s ease, transform 0.22s ease, visibility 0.22s ease; }
    #standaloneShareToast.show { opacity: 1; visibility: visible; transform: translate(-50%, 0); }
    .article-shell { max-width: 820px; margin: 0 auto; padding: 30px 20px 76px; }
    .breadcrumb-nav { display: flex; align-items: center; gap: 7px; flex-wrap: wrap; font-size: 0.79rem; color: var(--ink-500); margin-bottom: 18px; }
    .breadcrumb-nav a { color: var(--ink-500); text-decoration: none; font-weight: 600; }
    .breadcrumb-nav a:hover { color: var(--gold-600); text-decoration: underline; }
    .editorial-header { background: var(--bg-card); border: 1px solid var(--border-soft); border-top: 4px solid var(--gold-500); border-radius: 20px; padding: 28px 28px 24px; box-shadow: 0 10px 30px rgba(22, 20, 18, 0.04); margin-bottom: 22px; }
    .topic-kicker-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 12px; }
    .topic-chip { display: inline-flex; align-items: center; padding: 4px 11px; border-radius: 999px; background: var(--gold-50); border: 1px solid var(--gold-200); color: var(--gold-600); font-size: 0.77rem; font-weight: 800; }
    .read-meta { font-size: 0.78rem; color: var(--ink-500); font-weight: 600; }
    h1.article-h1 { margin: 0 0 20px; font-family: 'Noto Serif KR', serif; font-size: clamp(1.42rem, 2.8vw, 1.92rem); line-height: 1.42; font-weight: 800; color: var(--ink-900); letter-spacing: -0.02em; word-break: keep-all; }
    .ymyl-reviewer-bar { display: flex; align-items: center; justify-content: space-between; gap: 14px; padding: 14px 16px; border-radius: 14px; background: var(--bg-paper); border: 1px solid var(--border-soft); flex-wrap: wrap; }
    .reviewer-profile { display: flex; align-items: center; gap: 12px; }
    .reviewer-avatar { width: 48px; height: 48px; border-radius: 50%; object-fit: cover; object-position: center 18%; border: 2px solid var(--gold-500); background: #E8E1D3; flex-shrink: 0; }
    .reviewer-info-title { font-size: 0.86rem; font-weight: 800; color: var(--ink-900); display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
    .verified-pill { display: inline-flex; align-items: center; gap: 3px; padding: 2px 8px; border-radius: 999px; background: #EBF5FF; color: #1D4ED8; font-size: 0.7rem; font-weight: 800; }
    .reviewer-info-sub { font-size: 0.77rem; color: var(--ink-500); margin-top: 2px; }
    .reviewer-info-sub a { color: var(--gold-600); font-weight: 700; text-decoration: none; }
    .reviewer-info-sub a:hover { text-decoration: underline; }
    .direct-answer-lead { background: linear-gradient(180deg, #FFFDF8 0%, #FDF8EC 100%); border: 1.5px solid var(--gold-500); border-left: 5px solid var(--gold-600); border-radius: 16px; padding: 20px 22px; margin-bottom: 24px; }
    .direct-answer-label { display: inline-flex; align-items: center; gap: 6px; font-size: 0.8rem; font-weight: 800; color: var(--gold-600); margin-bottom: 8px; }
    .direct-answer-lead p { margin: 0; font-size: 0.98rem; font-weight: 600; color: var(--ink-900); line-height: 1.76; word-break: keep-all; }
    .content-section { background: var(--bg-card); border: 1px solid var(--border-soft); border-radius: 18px; padding: 26px 26px; margin-bottom: 20px; }
    .content-section h2 { margin: 0 0 14px; font-family: 'Noto Serif KR', serif; font-size: 1.2rem; font-weight: 800; color: var(--ink-900); line-height: 1.45; word-break: keep-all; }
    .content-section h3 { margin: 20px 0 8px; font-size: 1rem; font-weight: 800; color: var(--ink-900); }
    .content-section p { margin: 0 0 14px; font-size: 0.96rem; color: var(--ink-700); word-break: keep-all; }
    .content-section p:last-child { margin-bottom: 0; }
    .myth-truth-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; margin-top: 16px; }
    .mt-card { padding: 15px 16px; border-radius: 13px; font-size: 0.9rem; line-height: 1.66; word-break: keep-all; }
    .mt-myth { background: var(--rose-bg); border: 1px solid #FECDD3; color: var(--rose-ink); }
    .mt-truth { background: var(--emerald-bg); border: 1px solid #A7F3D0; color: var(--emerald-ink); }
    .mt-tag { display: inline-block; font-size: 0.76rem; font-weight: 800; margin-bottom: 5px; }
    .medical-figure-wrap { margin: 0 0 20px; background: var(--bg-card); border: 1px solid var(--border-soft); border-radius: 18px; overflow: hidden; box-shadow: 0 8px 24px rgba(22, 20, 18, 0.04); }
    .medical-figure-wrap img { width: 100%; height: auto; max-height: 430px; object-fit: cover; display: block; }
    .medical-figcaption { padding: 12px 18px; background: #F7F3E9; border-top: 1px solid var(--border-soft); font-size: 0.83rem; color: var(--ink-700); font-weight: 600; display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
    .slot-badge { display: inline-flex; align-items: center; padding: 2px 9px; border-radius: 999px; font-size: 0.71rem; font-weight: 800; letter-spacing: -0.01em; flex-shrink: 0; }
    .slot-badge-empathy { background: var(--espresso); color: #F4DFB0; border: 1px solid var(--gold-500); }
    .slot-badge-mechanism { background: var(--gold-600); color: #FFFFFF; }
    .slot-badge-routine { background: #065F46; color: #ECFDF5; }
    .consumer-kw-row { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; margin-top: 12px; padding-top: 12px; border-top: 1px dashed var(--gold-200); }
    .consumer-kw-label { font-size: 0.75rem; font-weight: 800; color: var(--gold-600); margin-right: 2px; }
    .consumer-kw-chip { display: inline-flex; align-items: center; padding: 3px 10px; border-radius: 999px; background: #FFFFFF; border: 1px solid var(--gold-200); color: var(--ink-700); font-size: 0.75rem; font-weight: 700; }
    .bridge-3d-banner { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 18px 22px; background: linear-gradient(135deg, #171310 0%, #261E18 100%); color: #FFFFFF; border-top: 1px solid rgba(197, 160, 89, 0.35); flex-wrap: wrap; }
    .bridge-3d-text strong { display: block; font-size: 0.95rem; color: #F4DFB0; margin-bottom: 3px; }
    .bridge-3d-text span { font-size: 0.82rem; color: #D7CFC0; }
    .bridge-3d-btn { display: inline-flex; align-items: center; gap: 8px; padding: 11px 18px; border-radius: 999px; background: linear-gradient(135deg, #D7B56D, #B58938); color: #14110F; font-size: 0.85rem; font-weight: 800; text-decoration: none; white-space: nowrap; box-shadow: 0 4px 14px rgba(197, 160, 89, 0.35); transition: transform 0.15s ease; }
    .bridge-3d-btn:hover { transform: translateY(-2px); }
    .clinical-observation-box { margin-top: 16px; padding: 18px 20px; border-radius: 14px; background: #FAF6EC; border: 1px solid var(--gold-200); }
    .clinical-obs-header { font-size: 0.85rem; font-weight: 800; color: var(--gold-600); margin-bottom: 7px; display: flex; align-items: center; gap: 6px; }
    .table-scroll { overflow-x: auto; margin-top: 14px; border-radius: 13px; border: 1px solid var(--border-soft); }
    table.comparison-table { width: 100%; border-collapse: collapse; min-width: 600px; font-size: 0.88rem; background: #FFFFFF; }
    table.comparison-table th { background: #1D1916; color: #F5E3B8; text-align: left; padding: 12px 14px; font-weight: 800; font-size: 0.82rem; }
    table.comparison-table td { padding: 13px 14px; border-top: 1px solid var(--border-soft); color: var(--ink-700); vertical-align: top; line-height: 1.6; }
    table.comparison-table tr.recommended-row td { background: #FFFDF6; color: var(--ink-900); font-weight: 600; }
    .row-badge-good { display: inline-block; padding: 2px 7px; border-radius: 5px; background: #DCFCE7; color: #166534; font-size: 0.72rem; font-weight: 800; margin-right: 4px; }
    .row-badge-warn { display: inline-block; padding: 2px 7px; border-radius: 5px; background: #FFE4E6; color: #9F1239; font-size: 0.72rem; font-weight: 800; margin-right: 4px; }
    .check-list-interactive { display: flex; flex-direction: column; gap: 10px; margin-top: 14px; }
    .check-item-label { display: flex; align-items: flex-start; gap: 12px; padding: 13px 15px; border-radius: 12px; border: 1px solid var(--border-soft); background: var(--bg-paper); cursor: pointer; transition: all 0.16s ease; font-size: 0.92rem; color: var(--ink-900); word-break: keep-all; }
    .check-item-label:hover { border-color: var(--gold-500); background: #FFFDF8; }
    .check-item-label.checked { border-color: var(--gold-600); background: #FDF8EC; font-weight: 700; }
    .check-item-label input[type="checkbox"] { width: 19px; height: 19px; margin-top: 3px; accent-color: #9E772B; flex-shrink: 0; cursor: pointer; }
    .score-result-box { margin-top: 16px; padding: 18px 20px; border-radius: 14px; background: #181512; color: #F8F5EE; border: 1px solid var(--gold-500); }
    .score-result-top { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 6px; flex-wrap: wrap; }
    .score-pill { padding: 3px 10px; border-radius: 999px; background: var(--gold-500); color: #14110F; font-size: 0.76rem; font-weight: 800; }
    .score-result-desc { margin: 0; font-size: 0.9rem; color: #EAE3D5; line-height: 1.68; }
    .redflag-box { padding: 18px 20px; border-radius: 14px; background: #F8FAFC; border: 1px solid #CBD5E1; border-left: 4px solid #334155; margin-top: 12px; }
    .redflag-box ul { margin: 8px 0 0; padding-left: 18px; font-size: 0.9rem; color: #334155; }
    .redflag-box li { margin-bottom: 6px; }
    .references-box { margin-top: 16px; padding: 14px 18px; border-radius: 12px; background: var(--bg-paper); border: 1px solid var(--border-soft); font-size: 0.81rem; color: var(--ink-500); }
    .cluster-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; margin-top: 12px; }
    .cluster-card { display: block; padding: 14px 16px; border-radius: 12px; background: var(--bg-paper); border: 1px solid var(--border-soft); text-decoration: none; color: var(--ink-900); transition: border-color 0.15s ease, transform 0.15s ease; }
    .cluster-card:hover { border-color: var(--gold-500); transform: translateY(-1px); }
    .cluster-kicker { font-size: 0.73rem; font-weight: 800; color: var(--gold-600); margin-bottom: 4px; }
    .cluster-title { font-size: 0.89rem; font-weight: 700; line-height: 1.45; word-break: keep-all; }
    @media (max-width: 720px) {
      .myth-truth-grid, .cluster-grid { grid-template-columns: 1fr; }
      .editorial-header, .content-section { padding: 20px 18px; }
    }
  </style>
</head>
<body>
  <header class="clinic-top-header">
    <div class="clinic-top-inner">
      <a href="${escHtmlServer(homeHref)}" class="clinic-brand-link">
        <span class="clinic-brand-mark">바</span>
        <span>바른한의원 대전본점 · 오늘의 건강 글</span>
      </a>
      <div class="clinic-header-actions">
        <button type="button" onclick="copyStandaloneShareLink(this)" class="header-action-link header-action-share" title="이 건강 글 링크 복사·퍼가기">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          <span data-share-label="1">링크 퍼가기</span>
        </button>
        <a href="${escHtmlServer(explorerPartHref)}" class="header-action-link header-action-3d">🧬 3D 인체모형으로 ${escHtmlServer(partLabel)} 입체 보기</a>
        <a href="${escHtmlServer(clinicHref)}" class="header-action-link header-action-home">${escHtmlServer(hub.btnLabel)}</a>
      </div>
    </div>
  </header>

  <main>
    <article class="article-shell">
      <nav class="breadcrumb-nav" aria-label="경로 탐색">
        <a href="${escHtmlServer(homeHref)}">홈</a>
        <span>›</span>
        <a href="${escHtmlServer(explorerHubHref)}">3D 인체모형 · 오늘의 건강 글</a>
        <span>›</span>
        <a href="${escHtmlServer(clinicHref)}">${escHtmlServer(hub.name)}</a>
        <span>›</span>
        <strong style="color:var(--ink-900);">${escHtmlServer(theme)}</strong>
      </nav>

      <header class="editorial-header">
        <div class="topic-kicker-row">
          <span class="topic-chip">${escHtmlServer(partLabel)} · ${escHtmlServer(keyword)}</span>
          <span class="view-count-chip" id="standalone-note-view-count" data-note-view-id="${escHtmlServer(cleanId)}">조회수 ${curViews.toLocaleString()}회</span>
          <span class="read-meta">발행 ${escHtmlServer(pubDate.replace(/-/g, '.'))} · 최종 의학 검토 ${escHtmlServer(revDate.replace(/-/g, '.'))} · 읽는 시간 약 3분</span>
        </div>
        <h1 class="article-h1">${escHtmlServer(targetNote.questionTitle)}</h1>
        <div class="ymyl-reviewer-bar">
          <div class="reviewer-profile">
            <img src="${escHtmlServer(directorAvatarSrc)}" alt="바른한의원 대전본점 안정위 대표원장" width="48" height="48" class="reviewer-avatar" />
            <div>
              <div class="reviewer-info-title">
                <span>집필 · 의학 감수: 안정위 한의사</span>
                <span class="verified-pill">✓ 한의사 면허 · 대표원장 직접 감수</span>
              </div>
              <div class="reviewer-info-sub">
                바른한의원 대전본점 대표원장 · 의학 생리 문헌 교차 검토 · <a href="${escHtmlServer(directorHref)}">의료진 약력 및 9대 정밀검진 기준 보기 ↗</a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section class="direct-answer-lead" aria-label="핵심 의학 요약">
        <div class="direct-answer-label">💡 바쁜 일상을 위한 30초 핵심 결론</div>
        <p>${escHtmlServer(directAnswer)}</p>
        ${consumerKeywords.length > 0 ? `<div class="consumer-kw-row" aria-label="자주 찾는 생활 건강 키워드">
          <span class="consumer-kw-label">🔎 자주 찾는 일상 키워드</span>
          ${consumerKeywords.map(kw => `<span class="consumer-kw-chip">#${escHtmlServer(kw)}</span>`).join('')}
        </div>` : ''}
      </section>

      ${empathyResolved.displayUrl ? `<figure class="medical-figure-wrap slot-empathy-figure">
        <img src="${escHtmlServer(empathyResolved.displayUrl)}" alt="${escHtmlServer(empathyAlt)}" width="1376" height="768" fetchpriority="high" />
        ${empathyCaption ? `<figcaption class="medical-figcaption"><span class="slot-badge slot-badge-empathy">일상 공감 01</span><span>${escHtmlServer(empathyCaption)}</span></figcaption>` : ''}
      </figure>` : ''}

      <section class="content-section">
        <h2>일상 속 이런 모습이 반복되고 있나요?</h2>
        ${empathyLines.map(l => `<p>${escHtmlServer(l)}</p>`).join('')}
        ${truthLines.map(l => `<p>${escHtmlServer(l)}</p>`).join('')}
        <div class="myth-truth-grid">
          <div class="mt-card mt-myth">
            <span class="mt-tag">❌ 흔히 하기 쉬운 오해</span><br />
            &ldquo;${escHtmlServer(mythLines[0] || '')}&rdquo;
          </div>
          <div class="mt-card mt-truth">
            <span class="mt-tag">⭕ 우리 몸이 알려주는 진실</span><br />
            ${escHtmlServer(mythLines[1] || '')}
          </div>
        </div>
      </section>

      <figure class="medical-figure-wrap slot-mechanism-figure">
        <img src="${escHtmlServer(displayHeroSrc)}" alt="${escHtmlServer(deepAlt)}" width="1376" height="768" decoding="async" />
        <figcaption class="medical-figcaption"><span class="slot-badge slot-badge-mechanism">원리 도해 02</span><span>${escHtmlServer(deepCaption)}</span></figcaption>
        <div class="bridge-3d-banner">
          <div class="bridge-3d-text">
            <strong>🧬 방금 읽은 ‘${escHtmlServer(partLabel)}’ 구조, 입체로 직접 돌려 보시겠어요?</strong>
            <span>바른한의원 3D 인체모형 뷰어에서 360° 회전하며 근육·신경·혈관 연결을 한눈에 살펴보실 수 있습니다.</span>
          </div>
          <a href="${escHtmlServer(explorerPartHref)}" class="bridge-3d-btn">3D 인체모형 열기 →</a>
        </div>
      </figure>

      <section class="content-section">
        <h2>📖 ${escHtmlServer(deepTitle)}</h2>
        ${deepParagraphs.map(p => `<p>${escHtmlServer(p)}</p>`).join('')}
        ${clinicalObservation ? `<div class="clinical-observation-box">
          <div class="clinical-obs-header">🩺 진료실에서 살펴본 생활 리듬 관찰 포인트</div>
          <p style="margin:0;font-size:0.93rem;color:var(--ink-900);">${escHtmlServer(clinicalObservation)}</p>
        </div>` : ''}
      </section>

      ${compTable ? `<section class="content-section">
        <h2>📊 ${escHtmlServer(compTable.heading || (keyword + ' 생활 기준 한눈에 비교하기'))}</h2>
        ${compTable.intro ? `<p>${escHtmlServer(compTable.intro)}</p>` : ''}
        <div class="table-scroll">
          <table class="comparison-table">
            <thead>
              <tr>
                ${compTable.headers.map(h => `<th>${escHtmlServer(h)}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${compTable.rows.map((r, rIdx) => `<tr class="${rIdx === compTable.recommendedRowIndex ? 'recommended-row' : ''}">
                ${(Array.isArray(r) ? r : []).map((c, cIdx) => `<td>${cIdx === 0 ? `<strong>${escHtmlServer(c)}</strong>` : formatTableCellHtml(c)}</td>`).join('')}
              </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </section>` : ''}

      ${routineResolved.displayUrl ? `<figure class="medical-figure-wrap slot-routine-figure">
        <img src="${escHtmlServer(routineResolved.displayUrl)}" alt="${escHtmlServer(routineAlt)}" width="1376" height="768" loading="lazy" decoding="async" />
        ${routineCaption ? `<figcaption class="medical-figcaption"><span class="slot-badge slot-badge-routine">전·후 루틴 03</span><span>${escHtmlServer(routineCaption)}</span></figcaption>` : ''}
      </figure>` : ''}

      <section class="content-section">
        <h2>✅ 오늘 밤 직접 체크해 보는 5가지 ${escHtmlServer(keyword)} 리듬 신호</h2>
        <p>최근 2주 동안의 모습에 해당하는 항목을 직접 눌러 체크해 보세요. 선택 개수에 맞춰 생활 속 우선순위를 정리해 드립니다.</p>
        <div class="check-list-interactive" id="self-check-group">
          ${selfCheckItems.map(item => `<label class="check-item-label">
            <input type="checkbox" onchange="updateSelfCheck()" />
            <span>${escHtmlServer(item)}</span>
          </label>`).join('')}
        </div>
        <div class="score-result-box" id="score-result-card" aria-live="polite">
          <div class="score-result-top">
            <strong id="score-title">현재 선택: 0 / ${selfCheckItems.length}개 해당 — 항목을 눌러 현재 몸의 리듬을 확인해 보세요</strong>
            <span class="score-pill" id="score-badge">자가점검 대기 중</span>
          </div>
          <p class="score-result-desc" id="score-desc">해당 항목을 체크하시면 일상에서 먼저 실천해 볼 수 있는 맞춤 관리 기준을 바로 확인하실 수 있습니다.</p>
        </div>
      </section>

      <section class="content-section">
        <h2>생활 습관 조절과 함께 세심히 살펴야 할 기준은 무엇일까요?</h2>
        ${deepSignals.length > 0 ? `<p>평소 가정에서는 <strong>${escHtmlServer(deepSignals[0])}</strong> 또한 <strong>${escHtmlServer(deepSignals[1] || '')}</strong> 아울러 <strong>${escHtmlServer(deepSignals[2] || '')}</strong></p>` : ''}
        ${redFlags.length > 0 ? `<div class="redflag-box">
          <strong style="font-size:0.9rem;color:#0F172A;">⚠️ 세심한 대면 확인을 권해 드리는 경우</strong>
          <ul>
            ${redFlags.map(rf => `<li>${escHtmlServer(rf)}</li>`).join('')}
          </ul>
        </div>` : ''}
        <div class="references-box">
          <strong style="color:var(--ink-700);">📚 학술 참고 근거</strong> · ${escHtmlServer(deepReference)}
        </div>

        <h3>함께 읽으면 연결되는 ${escHtmlServer(partLabel)} 인기 가이드 (BEST 2)</h3>
        <div class="cluster-grid">
          ${best2Notes.map((cn, idx) => `<a href="${escHtmlServer(isLocal ? `/health-note-${encodeURIComponent(cn.id)}/` : `https://www.bareunhaniwon.com/health-note-${encodeURIComponent(cn.id)}/`)}" class="cluster-card">
            <div class="cluster-kicker">이어서 읽기 BEST 0${idx + 1} · ${escHtmlServer(cn.keyword || partLabel)} · <span data-note-view-id="${escHtmlServer(String(cn.id).toLowerCase())}">조회수 ${Number(cn._views || 0).toLocaleString()}회</span></div>
            <div class="cluster-title">&ldquo;${escHtmlServer(cn.questionTitle)}&rdquo;</div>
          </a>`).join('')}
          <a href="${escHtmlServer(clinicHref)}" class="cluster-card">
            <div class="cluster-kicker">전문 진료 원리 안내</div>
            <div class="cluster-title">${escHtmlServer(hub.name)} — 원인별 치료·회복 원리 자세히 살펴보기 →</div>
          </a>
          <a href="${escHtmlServer(directorHref)}" class="cluster-card">
            <div class="cluster-kicker">정밀 검진 시스템 안내</div>
            <div class="cluster-title">초음파 · 적외선 체열 · 자율신경 · 체성분 등 9대 정밀검진 과정 살펴보기 →</div>
          </a>
        </div>

        ${buildOfficialFiveChannelsHtml(gCfg, true)}
      </section>
    </article>
  </main>
  <div id="standaloneShareToast" role="status" aria-live="polite"></div>

  <script>
    (function() {
      var noteId = ${JSON.stringify(cleanId)};
      var canonicalShareUrl = ${JSON.stringify(canonicalUrl)};
      var partId = ${JSON.stringify(partId)};
      var toastTimer = null;

      function applyViewsMap(noteViewsObj, fallbackSingle) {
        var map = {};
        if (noteViewsObj && typeof noteViewsObj === 'object') {
          Object.keys(noteViewsObj).forEach(function(k) {
            map[String(k).toLowerCase()] = Number(noteViewsObj[k]) || 0;
          });
        }
        if (typeof fallbackSingle === 'number') {
          map[noteId] = Math.max(map[noteId] || 0, fallbackSingle);
        }
        document.querySelectorAll('[data-note-view-id]').forEach(function(el) {
          var tid = String(el.getAttribute('data-note-view-id') || '').toLowerCase();
          if (tid && map[tid] != null) {
            el.textContent = '조회수 ' + Number(map[tid]).toLocaleString() + '회';
          }
        });
      }

      window.copyStandaloneShareLink = function(btnEl) {
        var doDone = function() {
          if (btnEl) {
            var lbl = btnEl.querySelector('[data-share-label="1"]');
            var prev = lbl ? lbl.textContent : '';
            btnEl.classList.add('is-copied');
            if (lbl) lbl.textContent = '✓ 복사됨';
            setTimeout(function() {
              btnEl.classList.remove('is-copied');
              if (lbl && prev) lbl.textContent = prev;
            }, 2000);
          }
          var toast = document.getElementById('standaloneShareToast');
          if (toast) {
            toast.textContent = '🔗 건강 글 링크가 복사되었습니다! 카톡·블로그·스레드에 바로 붙여넣기 하세요';
            toast.classList.add('show');
            if (toastTimer) clearTimeout(toastTimer);
            toastTimer = setTimeout(function() { toast.classList.remove('show'); }, 2800);
          }
        };
        if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
          navigator.clipboard.writeText(canonicalShareUrl).then(doDone).catch(function() {
            fallbackCopy(canonicalShareUrl, doDone);
          });
        } else {
          fallbackCopy(canonicalShareUrl, doDone);
        }
      };

      function fallbackCopy(txt, cb) {
        try {
          var ta = document.createElement('textarea');
          ta.value = txt;
          ta.setAttribute('readonly', '');
          ta.style.position = 'fixed';
          ta.style.left = '-9999px';
          document.body.appendChild(ta);
          ta.select();
          var ok = document.execCommand('copy');
          document.body.removeChild(ta);
          if (ok) cb();
          else window.prompt('아래 건강 글 링크를 복사해 주세요:', txt);
        } catch (e) {
          window.prompt('아래 건강 글 링크를 복사해 주세요:', txt);
        }
      }

      var ua = (navigator && navigator.userAgent) ? navigator.userAgent : '';
      if (!/bot|crawl|spider|slurp|yeti|daumoa|lighthouse|pagespeed/i.test(ua)) {
        var sKey = 'bareun_viewed_hn_' + noteId;
        var alreadyViewed = false;
        try { alreadyViewed = sessionStorage.getItem(sKey) === '1'; } catch (e) {}
        if (!alreadyViewed) {
          try { sessionStorage.setItem(sKey, '1'); } catch (e) {}
          fetch('/wp-json/bareun/v1/body-notes/view', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ noteId: noteId })
          }).then(function(r) { return r.ok ? r.json() : null; }).then(function(d) {
            if (d && d.ok) applyViewsMap(d.noteViews, d.views);
          }).catch(function() {});
        } else {
          fetch('/wp-json/bareun/v1/body-notes?part=' + encodeURIComponent(partId), { cache: 'no-store' })
            .then(function(r) { return r.ok ? r.json() : null; })
            .then(function(d) {
              if (d && d.ok && d.noteViews) applyViewsMap(d.noteViews);
            }).catch(function() {});
        }
      }
    })();
    function updateSelfCheck() {
      var boxes = document.querySelectorAll('#self-check-group input[type="checkbox"]');
      var total = boxes.length || 5;
      var count = 0;
      boxes.forEach(function(cb) {
        var label = cb.closest('.check-item-label');
        if (cb.checked) {
          count++;
          if (label) label.classList.add('checked');
        } else {
          if (label) label.classList.remove('checked');
        }
      });
      var titleEl = document.getElementById('score-title');
      var badgeEl = document.getElementById('score-badge');
      var descEl = document.getElementById('score-desc');
      if (count === 0) {
        titleEl.textContent = '현재 선택: 0 / ' + total + '개 해당 — 비교적 안정적인 생활 리듬이 유지되고 있습니다';
        badgeEl.textContent = '양호 · 현재 습관 유지';
        descEl.textContent = '오늘 살펴본 비교표의 권장 루틴을 가볍게 이어 가시면서 충분한 수분 섭취와 숙면 시간을 지켜 주세요.';
      } else if (count <= 2) {
        titleEl.textContent = '현재 선택: ' + count + ' / ' + total + '개 해당 — 일상 속 작은 피로 신호가 시작되는 구간';
        badgeEl.textContent = '생활 리듬 2주 조정 권장';
        descEl.textContent = '위 비교표의 권장 실천법을 2주간 먼저 적용해 보세요. 자세·식사·수면 타이밍 한 가지만 바꾸어도 몸의 긴장이 한결 부드러워집니다.';
      } else {
        titleEl.textContent = '현재 선택: ' + count + ' / ' + total + '개 해당 — 누적된 생활 불균형 점검이 필요한 구간';
        badgeEl.textContent = '생활 교정 + 세심한 상태 확인 권장';
        descEl.textContent = '여러 생활 신호가 동시에 겹쳐 회복 탄력이 떨어져 있을 가능성이 큽니다. 생활 루틴 조정과 함께 불편감이 2~4주 이상 이어진다면 가까운 의료기관에서 정확한 상태를 확인해 보시길 권합니다.';
      }
    }
  </script>
</body>
</html>`;
}

function buildAllHealthNoteWpPayloads(partMediaUrlMap) {
  const customCfg = loadCustomHealthNotesConfig();
  if (customCfg && Array.isArray(customCfg.notes) && customCfg.notes.length > 0) {
    const enabledNotes = customCfg.notes.filter(n => n && n.enabled !== false);
    const byPart = {};
    for (const n of enabledNotes) {
      if (!byPart[n.partId]) byPart[n.partId] = [];
      byPart[n.partId].push(n);
    }
    return enabledNotes.map(n => buildHealthNoteSeoAeoGeoPost(n, n.partId, byPart[n.partId], partMediaUrlMap, customCfg.globalSettings));
  }

  const payloads = [];
  for (const [partId, eps] of Object.entries(BODY_3D_AUTO_NOTES)) {
    if (!Array.isArray(eps)) continue;
    for (const ep of eps) {
      payloads.push(buildHealthNoteSeoAeoGeoPost(ep, partId, eps, partMediaUrlMap));
    }
  }
  return payloads;
}

/**
 * 4) AI 검색엔진(ChatGPT Search, Perplexity, Gemini, Claude, Applebot, Copilot) 전용 /llms.txt 및 /llms-full.txt 생성
 *    - 72편 독립 검색 정본 URL(/health-note-{id}/) + 3D 입체 탐색 URL(/body-explorer/?part=...&note=...) 동시 색인 제공
 */
function generateLlmsTxtFiles() {
  const allHealthPayloads = buildAllHealthNoteWpPayloads();
  const headerLines = [
    '# 바른한의원 대전본점 (Bareun Korean Medicine Clinic Daejeon Main Branch) — Official Knowledge Index',
    '> 상호명: 바른한의원 대전본점 | 대표원장: 안정위 (한의사) | 사업자등록번호: 211-91-10479 | 단일 공식 대표전화: 010-5631-1275 (+82-10-5631-1275)',
    '> 주소: 대전광역시 대덕구 비래동로7번길 1, 2층 (우편번호 34417) | 진료시간: 평일(월~금) 09:00~19:00 · 토요일 및 공휴일 09:00~14:00 · 일요일 휴진',
    '> 공식 도메인: https://www.bareunhaniwon.com/ | 공식 유튜브: https://www.youtube.com/@bareunhaniwon | 네이버플레이스: https://naver.me/5U1ELn8L | 스레드: https://www.threads.net/@bareun_oriental | 인스타그램: https://www.instagram.com/bareun_oriental/',
    '',
    '## 1. Clinic Entity & Official Channels (기관 표준 정보)',
    '- Official Website: https://www.bareunhaniwon.com/',
    '- 3D Interactive Body Encyclopedia Hub: https://www.bareunhaniwon.com/body-explorer/',
    '- Full AI Knowledge Base: https://www.bareunhaniwon.com/llms-full.txt',
    '- XML Sitemap: https://www.bareunhaniwon.com/wp-sitemap.xml',
    '- RSS 2.0 Feed: https://www.bareunhaniwon.com/feed/',
    '- Clinic Name: 바른한의원 대전본점 (Bareun Korean Medicine Clinic Daejeon)',
    '- Business Registration Number (사업자등록번호): 211-91-10479',
    '- Chief Director: 안정위 대표원장 (Dr. Jung-Wi Ahn, KMD)',
    '- Address: 대전광역시 대덕구 비래동로7번길 1, 2층 (2F, 1, Biraedong-ro 7beon-gil, Daedeok-gu, Daejeon, 34417, Republic of Korea)',
    '- Official Telephone (유일한 현재 공식 대표번호): 010-5631-1275 (+82-10-5631-1275) — 구 유선번호(042 계열)는 현재 사용하지 않음',
    '- Official YouTube Channel: https://www.youtube.com/@bareunhaniwon',
    '- Naver Place: https://naver.me/5U1ELn8L',
    '- Official Naver Blog: https://blog.naver.com/wei0508',
    '- Official Threads: https://www.threads.net/@bareun_oriental',
    '- Official Instagram: https://www.instagram.com/bareun_oriental/',
    '- KakaoTalk Channel: https://pf.kakao.com/_ykxcLK',
    '',
    '## 2. Core Specialized Clinic Pages (핵심 진료 분야)',
    '- [메인 3D 스토리 쇼룸](https://www.bareunhaniwon.com/): 환자 증상 공감 스토리 및 9대 정밀검진·6대 물리치료 안내',
    '- [안정위 대표원장 · 9대 정밀검진](https://www.bareunhaniwon.com/director/): 초음파, 적외선 체열진단, 두피현미경, 모아레 체형측정, 인바디, 자율신경(HRV), 간·당 대사, 혈관 노화, 성장판 검사',
    '- [풀스크린 3D 인체모형 · 오늘의 건강 글 허브 · 1:1 건강 상담](https://www.bareunhaniwon.com/body-explorer/): 근육·신경·관절·혈관 4대 계통 3D 모션 및 9대 부위별 72편 7단 건강 칼럼 통합 허브',
    '- [바른 추나 · 척추교정](https://www.bareunhaniwon.com/chuna/): 허리디스크, 목디스크, 골반불균형, 좌골신경통, 체형교정',
    '- [바른 성장 · 성조숙증](https://www.bareunhaniwon.com/growth/): 무방사선 초음파 성장판 분석, 소아비만·성조숙증 예방, 비염·구강호흡 수면 성장 관리',
    '- [바른 다이어트 · 식욕ZERO](https://www.bareunhaniwon.com/diet-zero/): 기초대사량 보존, 갈색지방 활성화, 내장지방·부종 해독 다이어트',
    '- [바른 탈모 · 모근재생](https://www.bareunhaniwon.com/hairloss/): 두피열 하강, 경추 추나, 약침·모근 재생 ([남성탈모](https://www.bareunhaniwon.com/hairloss-male/), [여성탈모](https://www.bareunhaniwon.com/hairloss-female/), [원형탈모](https://www.bareunhaniwon.com/hairloss-alopecia/), [지루성두피염](https://www.bareunhaniwon.com/hairloss-seborrheic/))',
    '- [바른 황제공진단](https://www.bareunhaniwon.com/gongjindan/): 식약처 CITES 정품 사향(L-Muscone) 및 러시아산 녹용 원장 직접 조제',
    '- [바른 전립선 · 남성활력](https://www.bareunhaniwon.com/prostate/): 만성 전립선염, 전립선비대증, 야간뇨, 과민성 방광, 골반저 순환 관리',
    '- [바른 매선 · 리프팅 윤곽진단](https://www.bareunhaniwon.com/lifting-compare/): 비수술 한방 안면 매선 리프팅 및 윤곽 대칭 교정',
    '',
    '## 3. "오늘의 건강 글" 72 Standalone Medical Columns Index (Reviewed by Dr. Jung-Wi Ahn, KMD)',
    ...allHealthPayloads.map(p => `- [${p.title}](https://www.bareunhaniwon.com/health-note-${p.id}/): ${p.summary} (3D View: https://www.bareunhaniwon.com/body-explorer/?part=${p.partId}&note=${p.id})`),
    '',
    '## 4. Representative Integrative Medicine Review',
    `- [${FLAGSHIP_REPRESENTATIVE_POST.title}](https://www.bareunhaniwon.com/${FLAGSHIP_REPRESENTATIVE_POST.slug}/): ${FLAGSHIP_REPRESENTATIVE_POST.summary}`
  ];

  const llmsTxtContent = headerLines.join('\n') + '\n';
  fs.writeFileSync(path.join(__dirname, 'llms.txt'), llmsTxtContent, 'utf8');

  const customCfg = loadCustomHealthNotesConfig();
  const sourceNotes = (customCfg && Array.isArray(customCfg.notes))
    ? customCfg.notes.filter(n => n && n.enabled !== false)
    : Object.entries(BODY_3D_AUTO_NOTES).flatMap(([partId, eps]) => (eps || []).map(ep => ({ ...ep, partId })));

  const fullLines = [
    ...headerLines,
    '',
    '================================================================================',
    '## 5. FULL-TEXT 7-STAGE HEALTH NOTES CORPUS (72 Medical Columns)',
    '================================================================================'
  ];

  for (const ep of sourceNotes) {
    fullLines.push('');
    fullLines.push(`### [${ep.partLabel} · ${ep.keyword}] ${ep.questionTitle}`);
    fullLines.push(`- SEO Title: ${ep.seoTitle || ep.questionTitle}`);
    fullLines.push(`- Canonical Standalone URL: https://www.bareunhaniwon.com/health-note-${ep.id}/`);
    fullLines.push(`- Interactive 3D Anatomy URL: https://www.bareunhaniwon.com/body-explorer/?part=${ep.partId}&note=${ep.id}`);
    fullLines.push(`- Publish Date: ${ep.publishDate} | Last Medical Review: ${ep.lastReviewed || '2026-11-15'} (Reviewed by 안정위 한의사)`);
    fullLines.push(`- Academic Reference: ${ep.academicBasis || '국제 의학 학술지 보고'}`);
    if (Array.isArray(ep.consumerKeywords) && ep.consumerKeywords.length > 0) {
      fullLines.push(`- Consumer Search Queries: ${ep.consumerKeywords.join(' · ')}`);
    }
    if (ep.directAnswer) {
      fullLines.push(`- [Direct Answer · 30초 핵심 결론]: ${ep.directAnswer}`);
    }
    fullLines.push(`- 1. 일상 속 모습: ${(ep.empathyLines || []).join(' ')}`);
    fullLines.push(`- 2. 몸속 진짜 원리: ${(ep.truthLines || []).join(' ')}`);
    fullLines.push(`- 3. 흔히 하는 오해와 진실: [오해] ${(ep.mythLines && ep.mythLines[0]) || ''} -> [진실] ${(ep.mythLines && ep.mythLines[1]) || ''}`);
    if (Array.isArray(ep.deepParagraphs) && ep.deepParagraphs.length > 0) {
      fullLines.push(`- 4. 심층 생리 원리 해설: ${ep.deepParagraphs.join(' ')}`);
    }
    if (ep.clinicalObservation) {
      fullLines.push(`- 5. 진료실 생활 리듬 관찰 포인트: ${ep.clinicalObservation}`);
    }
    if (ep.comparisonTable && Array.isArray(ep.comparisonTable.rows)) {
      const tblSummary = ep.comparisonTable.rows.map(r => r.join(' | ')).join(' // ');
      fullLines.push(`- 6. 생활 기준 비교표 (${(ep.comparisonTable.headers || []).join(' | ')}): ${tblSummary}`);
    }
    if (Array.isArray(ep.selfCheckItems) && ep.selfCheckItems.length > 0) {
      fullLines.push(`- 7. 1분 자가점검 5문항: ${ep.selfCheckItems.join(' / ')}`);
    }
    if (Array.isArray(ep.redFlags) && ep.redFlags.length > 0) {
      fullLines.push(`- 8. 대면 확인이 필요한 주의 신호: ${ep.redFlags.join(' / ')}`);
    }
  }

  const llmsFullTxtContent = fullLines.join('\n') + '\n';
  fs.writeFileSync(path.join(__dirname, 'llms-full.txt'), llmsFullTxtContent, 'utf8');

  return {
    totalHealthNotes: allHealthPayloads.length,
    llmsTxtBytes: Buffer.byteLength(llmsTxtContent, 'utf8'),
    llmsFullTxtBytes: Buffer.byteLength(llmsFullTxtContent, 'utf8')
  };
}

/**
 * 2) 로컬 서버(serve.js) 내장 백그라운드 자동 스케줄러 시작
 */
let schedulerTimer = null;
function startAutoBlogScheduler() {
  const initialReport = syncNineDiseaseAutoNotes();
  console.log(`🤖 [Auto-Blog Engine] 9대 질환 자동화 엔진 가동 완료 (기준일: ${initialReport.todayKst}, 3단계 검수 통과: ${initialReport.auditPassedAll})`);
  if (schedulerTimer) clearInterval(schedulerTimer);
  schedulerTimer = setInterval(() => {
    try {
      syncNineDiseaseAutoNotes();
    } catch (err) {
      console.error('[Auto-Blog Scheduler Error]', err.message);
    }
  }, 6 * 3600 * 1000);
  return initialReport;
}

if (require.main === module) {
  const res = syncNineDiseaseAutoNotes();
  console.log('✅ [Auto-Blog Engine CLI] Sync Report:', JSON.stringify(res, null, 2));
}

module.exports = {
  NOVEMBER_AUTO_EPISODES,
  PART_SEO_CLINICAL_META,
  PART_CLINIC_HUB_MAP,
  syncNineDiseaseAutoNotes,
  startAutoBlogScheduler,
  buildHealthNoteSeoAeoGeoPost,
  renderStandaloneHealthNoteFullPage,
  buildAllHealthNoteWpPayloads,
  generateLlmsTxtFiles
};
