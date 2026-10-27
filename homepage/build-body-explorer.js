/**
 * 바른한의원 대전본점 · 3D 인체모형 부위별 생활 꿀팁 창고 (body-explorer.html) 빌더
 * - 의학백과 블로그 & 원장 Q&A 페이지('무엇이든 물어보세요' ask-doctor.html)와 100% 역할 분리!
 * - 좌측 40%: 3D 인체모형 · 골격 · 신경 · 오장육부 인터랙티브 쇼룸 (100% 보존)
 * - 우측 60%: 복잡한 의학 줄글과 중복 칼럼 박스를 모두 걷어낸 순수 100% '고시인성 부위별 생활 꿀팁 카드 창고'
 *   · 탭 ① ✅ 꼭 실천할 DO 3 vs ❌ 피해야 할 DON'T 3
 *   · 탭 ② ⏰ 아침 · 낮 · 밤 3단계 하루 루틴
 *   · 탭 ③ 🥗 추천 약선 식단 & 🤲 3분 셀프 지압·스트레칭
 * - 상단 네비 & 하단 단일 브릿지 배너로 '💬 무엇이든 물어보세요 (공식 의학백과 블로그 · 원장 Q&A)' 즉시 연결
 */
const fs = require('fs');
const path = require('path');

const BODY_PARTS = require('./body-parts-source.json');
const { DISEASE_QNA_CATEGORIES } = require('./disease-blog-seed-data.js');
const { partA: WEBGL_PART_A, partB: WEBGL_PART_B } = require('./body-3d-webgl-engine.js');

const PART_LIFESTYLE_TIPS = {
  knee: {
    tipBadge: '💡 부위별 생활 꿀팁 01 · 무릎 성장판 & 소아비만·면역',
    tipTitle: '숨은 키를 깨우는 소아 성장판 · 비만 · 코호흡 생활 꿀팁',
    tipSummary: '성장호르몬 골든타임 수면, 구강호흡 차단, 무릎 성장판 점프 자극만 지켜도 치료 시너지가 배가됩니다.',
    doList: [
      { title: '밤 10시 이전 완전 소등 숙면', desc: '성장호르몬은 밤 10시~새벽 2시 깊은 서파수면에서 가장 왕성하게 분비됩니다. 침실 조명을 완전히 꺼 멜라토닌 분비를 도움드립니다.' },
      { title: '기상 직후 미온수 한 잔 & 코호흡', desc: '밤새 건조해진 코점막을 적셔 입호흡을 줄이고 아침 위장 운동을 부드럽게 깨워 영양 흡수율을 높입니다.' },
      { title: '하루 15분 줄넘기 · 제자리 점프', desc: '운동화 착용 후 부드러운 바닥에서 가볍게 뛰면 무릎 성장판 연골세포에 건강한 수직 자극이 전달됩니다.' }
    ],
    dontList: [
      { title: '취침 2시간 전 단 음료 · 야식 금지', desc: '밤사이 혈당과 인슐린이 높으면 성장호르몬 분비가 직접 억제되고 소아비만·조기 골화 위험이 커집니다.' },
      { title: '뜨거운 배달 용기 · 플라스틱 주의', desc: '환경호르몬 노출을 줄이기 위해 뜨거운 국물이나 전자레인지 조리 시 유리·도자기 용기를 사용하세요.' },
      { title: '바닥 양반다리 · 구부정한 스마트폰', desc: '골반 비틀림과 거북목은 이미 자란 숨은 키 2~3cm를 갉아먹고 무릎 성장판에 편측 압박을 줍니다.' }
    ],
    routine: [
      { time: '🌅 아침 · 기상 직후', title: '체온 미온수 1잔 + 기지개 전신 스트레칭 2분', desc: '밤새 굳은 척추 마디와 무릎 관절을 길게 늘려주고 단백질이 포함된 아침 식사로 성장 에너지를 채웁니다.' },
      { time: '☀️ 낮 · 학교 & 방과 후', title: '독서대 눈높이 맞추기 + 햇볕 아래 15분 점프 놀이', desc: '비타민 D 합성과 성장판 미세 자극을 동시에 챙기고, 물통을 휴대해 탄산음료 대신 순수한 물을 마십니다.' },
      { time: '🌙 밤 · 취침 1시간 전', title: '침실 습도 50% 유지 + 스마트폰 거실에 두기', desc: '코막힘 없는 비강 호흡 환경을 만들고 블루라이트를 차단해 10시 전 깊은 성장 수면으로 진입합니다.' }
    ],
    goodFoods: ['잔멸치·두부·검은콩 (양질의 칼슘·식물성 단백)', '소고기 살코기·달걀 (성장 아미노산·아연)', '시금치·브로콜리·표고버섯 (비타민 D·뼈 대사)', '따뜻한 작두콩·대추차 (코점막 면역 보호)'],
    avoidFoods: ['액상과당 탄산음료·과일주스 (성장호르몬 억제)', '밤늦은 치킨·라면·튀김류 (체지방·성조숙 자극)', '고카페인 초콜릿·에너지음료 (서파수면 방해)'],
    acupressure: {
      name: '무릎 아래 족삼리혈(足三里) & 종아리 위중혈 3분 지압',
      howTo: '무릎뼈 바깥쪽 아래 오목한 곳에서 손가락 세 마디 아래(족삼리)를 엄지로 5초씩 지그시 10회 눌러주고, 종아리를 따뜻하게 쓸어내립니다.',
      benefit: '비위 소화 흡수력을 높이고 무릎 성장판 주변 미세 혈류 순환을 부드럽게 회복합니다.'
    }
  },
  cervical: {
    tipBadge: '💡 부위별 생활 꿀팁 02 · 경추 정렬 & 두피열·탈모',
    tipTitle: '두피 사막화를 식히는 경추 순환 · 모근 보습 생활 꿀팁',
    tipSummary: '정수리 열독을 아래로 내리고 뒷목 혈류 병목을 풀어주면 모낭 뿌리가 다시 숨을 쉽니다.',
    doList: [
      { title: '아침 대신 저녁 미온수 샴푸 & 찬 바람 건조', desc: '하루 종일 쌓인 피지와 미세먼지를 밤에 씻어내고, 두피 속까지 미지근하거나 시원한 바람으로 완전히 말립니다.' },
      { title: '취침 전 15분 따뜻한 족욕 (수승화강)', desc: '발끝 말초혈관을 데우면 머리와 두피에 몰린 상열감이 자연스럽게 아래로 내려가 숙면과 모근 회복을 돕습니다.' },
      { title: '모니터 상단 눈높이 & 50분마다 턱 당기기', desc: '고개가 앞으로 빠지지 않게 높이를 맞추고 매시간 턱을 목 쪽으로 당겨 후두하근 긴장을 풀어줍니다.' }
    ],
    dontList: [
      { title: '젖은 머리로 바로 눕기 · 뜨거운 드라이기', desc: '축축한 두피는 지루성 세균 번식을 부르고, 뜨거운 열풍은 두피 온도를 38℃ 이상 높여 모근을 약화시킵니다.' },
      { title: '손톱으로 두피 긁기 · 꽉 묶는 헤어스타일', desc: '손톱 상처는 모낭염을 악화시키며 강한 견인력은 앞머리·정수리 견인성 탈모를 유발합니다.' },
      { title: '야간 음주 · 매운 야식 · 과도한 카페인', desc: '알코올과 매운 음식은 상부 열독과 피지 분비를 급격히 높여 다음 날 아침 모발 탈락을 가속화합니다.' }
    ],
    routine: [
      { time: '🌅 아침 · 출근/등교 전', title: '끝이 둥근 나무 브러시로 귀 옆~정수리 빗질 1분', desc: '두피 측두근을 부드럽게 깨워 아침 모낭 혈류를 열고 검은콩·견과류로 모발 케라틴 원료를 공급합니다.' },
      { time: '☀️ 낮 · 업무 중', title: '50분마다 날개뼈 모으기 & 뒷목 승모근 이완', desc: '어깨를 뒤로 젖혀 경추 동맥 압박을 풀어주고 커피 대신 미온수나 구기자차를 자주 마십니다.' },
      { time: '🌙 밤 · 귀가 후', title: '저녁 두피 거품 세정(지문 마사지) + 15분 족욕', desc: '손끝 지문으로 두피를 부드럽게 씻어낸 뒤 완전 건조하고 밤 11시 전에 취침해 모유두 세포 재생을 돕습니다.' }
    ],
    goodFoods: ['검은콩·검은깨·두부 (시스테인·이소플라본)', '호두·아몬드·해조류 (비오틴·철분·요오드)', '달걀 노른자·연어 (모낭 세포막 오메가3)', '솔잎차·구기자차 (상열 완화 및 혈액 보충)'],
    avoidFoods: ['기름진 삼겹살·튀김 야식 (두피 과다 피지)', '맥주·소주 등 알코올 (두피 염증·열독 급상승)', '액상과당 디저트·정제 밀가루 (당화 반응 촉진)'],
    acupressure: {
      name: '뒷목 머리뼈 아래 풍지혈(風池穴) & 정수리 백회혈 3분 지압',
      howTo: '양손 엄지를 뒷목과 머리뼈가 만나는 오목한 곳(풍지혈)에 대고 하늘 방향으로 5초씩 지그시 밀어 올린 뒤, 정수리 중앙(백회)을 열 손가락 끝으로 가볍게 두드립니다.',
      benefit: '굳어진 후두하근을 이완해 두피로 올라가는 혈류 통로를 시원하게 열어줍니다.'
    }
  },
  lumbar: {
    tipBadge: '💡 부위별 생활 꿀팁 03 · 요추 디스크 & 골반 교정',
    tipTitle: '허리디스크 · 골반 틀어짐 재발 막는 척추 감압 생활 꿀팁',
    tipSummary: '교정된 골반과 디스크 간격을 일상 속 바른 기상법과 좌식 습관으로 탄탄하게 지켜냅니다.',
    doList: [
      { title: '아침 기상 시 옆으로 돌아 짚고 일어나기', desc: '자고 일어난 직후 수분이 찬 디스크는 압력에 민감합니다. 통나무처럼 옆으로 돌아 팔로 짚고 안전하게 기상하세요.' },
      { title: '엉덩이를 의자 깊숙이 + 허리 오목 커브 지지', desc: '등받이에 엉덩이를 끝까지 밀착하고 작은 쿠션으로 요추 전만(C자 곡선)을 받쳐 디스크 내압을 절반으로 줄입니다.' },
      { title: '하루 30분 시선 정면 평지 파워워킹', desc: '보폭을 자연스럽게 넓혀 평지를 걸으면 척추기립근과 둔근이 고르게 강화되어 천연 복대 역할을 합니다.' }
    ],
    dontList: [
      { title: '다리 꼬고 앉기 · 뒷주머니 지갑 넣고 앉기', desc: '단 10분만 다리를 꼬아도 골반 천장관절이 비틀리며 하부 요추 디스크 한쪽으로 압력이 쏠립니다.' },
      { title: '허리만 숙여 무거운 물건 갑자기 들기', desc: '세수하거나 택배 상자를 들 때 허리만 굽히지 말고 반드시 무릎을 굽혀 하체 힘으로 들어 올리세요.' },
      { title: '푹신한 소파에 반쯤 누워 TV·스마트폰 보기', desc: '골반이 뒤로 말리는 후방경사 자세는 요추 4-5번 디스크 후방 돌출을 가장 강하게 유발합니다.' }
    ],
    routine: [
      { time: '🌅 아침 · 침대에서', title: '누운 채 무릎 세워 좌우 천천히 흔들기 1분 후 옆 기상', desc: '밤새 굳은 요방형근과 골반 인대를 예열한 뒤 옆으로 돌아 일어나 아침 급성 요통을 예방합니다.' },
      { time: '☀️ 낮 · 근무/운전 중', title: '50분 착석 후 2분 기립 + 양손 허리 짚고 뒤로 젖히기', desc: '앉아 있는 동안 눌렸던 디스크 수핵이 제자리로 돌아가도록 부드러운 신전(맥켄지) 스트레칭을 해줍니다.' },
      { time: '🌙 밤 · 귀가 후', title: '엉덩이·허리 따뜻한 온찜질 15분 + 무릎 아래 베개 받치기', desc: '바로 누워 잘 때 무릎 오금 아래에 낮은 베개를 받치면 장요근이 이완되어 허리가 바닥에 편안히 밀착됩니다.' }
    ],
    goodFoods: ['도가니·사골·생선 껍질 (콘드로이친·콜라겐)', '두부·연어·달걀·우유 (척추 기립근 단백질·칼슘)', '부추·양파·마늘 (어혈 순환 및 신경 염증 완화)', '두충차·우슬차 (허리·무릎 인대 및 근골 강화)'],
    avoidFoods: ['흡연·니코틴 (디스크 미세혈관 수축·퇴행 가속)', '과음·폭음 (추간판 주변 신경 부종·염증 악화)', '과도한 카페인 (칼슘 배출 증가 및 근육 긴장)'],
    acupressure: {
      name: '허리 뒤 신수혈(腎兪穴) 온열 마찰 & 이상근 3분 이완',
      howTo: '양 손바닥을 뜨겁게 비빈 뒤 배꼽 정반대편 허리 양옆(신수혈)을 위아래로 20회 문지르고, 의자에 앉아 아픈 쪽 발목을 반대 무릎에 올린 채 허리를 펴고 상체를 살짝 숙여 엉덩이 깊은 근육을 늘려줍니다.',
      benefit: '허리 심부 냉기를 몰아내고 좌골신경을 누르는 둔부 이상근 압박을 시원하게 덜어줍니다.'
    }
  },
  gongjindan: {
    tipBadge: '💡 부위별 생활 꿀팁 04 · 만성피로 & 황제공진단 복용법',
    tipTitle: '사향 L-무스콘 흡수율을 높이는 황제공진단 · 원기 회복 꿀팁',
    tipSummary: '귀한 정품 사향과 녹용의 뇌·심장 개통 효능을 온전히 흡수하는 골든타임 복용·보관 수칙입니다.',
    doList: [
      { title: '아침 기상 직후 공복에 미온수와 천천히 씹기', desc: '1~2분간 입안에서 천천히 씹어 사향의 방향성 성분이 구강 점막과 후각 신경으로 먼저 스며들도록 복용하세요.' },
      { title: '냉장 보관 후 복용 15분 전 실온 꺼내두기', desc: '보존제 없는 순수 꿀·약재 제환이므로 밀폐 냉장 보관하시고, 드시기 전 살짝 실온에 두면 식감과 향이 살아납니다.' },
      { title: '낮 15분 햇볕 산책으로 뇌 세로토닌 충전', desc: '공진단으로 열린 뇌혈류에 자연 일광 자극을 더하면 브레인 포그 해소와 밤 시간 숙면 전환이 한층 빨라집니다.' }
    ],
    dontList: [
      { title: '복용 전후 1시간 커피 · 녹차 · 홍차 피하기', desc: '탄닌과 카페인 성분이 녹용·당귀의 철분 및 유효 성분 흡수를 방해하므로 미온수로만 드시는 것이 가장 좋습니다.' },
      { title: '녹두 · 숙주나물 · 차가운 생무 과섭취 주의', desc: '성질이 차갑고 해독성이 강한 녹두류는 따뜻한 보익 약성을 중화시킬 수 있어 복용 기간 중 줄여주세요.' },
      { title: '피로하다고 주말 내내 몰아서 늦잠 자기', desc: '생체 시계가 깨지면 월요일 번아웃이 심해집니다. 기상 시각은 일정하게 유지하되 낮 20분 이내 토막잠을 활용하세요.' }
    ],
    routine: [
      { time: '🌅 아침 · 기상 직후 공복', title: '미온수 반 컵으로 입을 적신 뒤 황제공진단 1환 음미', desc: '위장이 비어 있을 때 흡수율이 가장 높으며, 하루를 지탱하는 뇌 집중력과 심폐 활력을 깨워줍니다.' },
      { time: '☀️ 낮 · 집중 업무/학습 전', title: '중요 시험·발표·야근 날에는 오후 2~3시 추가 케어', desc: '체력과 집중력이 급격히 떨어지는 오후 시간대 심장 두근거림이나 피로 누적 시 원장님 안내에 따라 활용하세요.' },
      { time: '🌙 밤 · 취침 준비', title: '따뜻한 샤워 후 복식호흡 3분으로 부교감신경 전환', desc: '낮 동안 소모된 부신 에너지를 갈무리하고 간 해독이 이루어지는 새벽 시간에 깊이 숙면합니다.' }
    ],
    goodFoods: ['전복·낙지·굴 (타우린 풍부한 천연 피로 회복제)', '산마·연근·대추 (비위 소화기 보호 및 기력 보충)', '블루베리·호두 (뇌혈관 항산화 시너지)', '따뜻한 꿀물·생강대추차 (체온 및 말초 순환 유지)'],
    avoidFoods: ['녹두전·숙주나물 과다 섭취 (보약 유효성분 반감)', '진한 에스프레소·에너지음료 남용 (부신 피로 가중)', '차가운 얼음물·야간 폭식 (간 해독 에너지 소모)'],
    acupressure: {
      name: '가슴 중앙 전중혈(膻中穴) & 손바닥 노궁혈 3분 지압',
      howTo: '양 유두 사이 정중앙 가슴뼈(전중혈)를 손가락 끝으로 둥글게 마사지하며 깊게 숨을 내쉬고, 주먹을 쥐었을 때 중지가 닿는 손바닥 중앙(노궁혈)을 5초씩 눌러줍니다.',
      benefit: '가슴에 맺힌 스트레스 열기를 풀고 심장과 뇌로 가는 기혈 순환을 편안하게 돕습니다.'
    }
  },
  syncope: {
    tipBadge: '💡 부위별 생활 꿀팁 05 · 자율신경 · 편두통 · 실신 예방',
    tipTitle: '미주신경성 실신 · 어지럼 · 불면을 다스리는 자율신경 꿀팁',
    tipSummary: '전조 증상 대처법과 혈관 수축 루틴만 숙지해도 급작스러운 어지럼과 낙상 위험을 안전하게 지킵니다.',
    doList: [
      { title: '실신 전조(식은땀·시야 암전) 시 즉시 쪼그려 앉기', desc: '참으며 서 있지 말고 즉시 바닥에 앉거나 누워 다리를 높이고, 양다리를 꼬아 허벅지·엉덩이에 강하게 힘을 주세요(근육 펌프).' },
      { title: '기상 시 3단계 천천히 일어나기 & 미온수 섭취', desc: '눈 뜨고 30초 → 걸터앉아 30초 후 일어서면 기립성 뇌혈류 급강하와 아침 현훈을 효과적으로 예방합니다.' },
      { title: '하루 3세트 까치발 들기(종아리 제2의 심장 운동)', desc: '양치하거나 서 있을 때 발뒤꿈치를 천천히 들었다 내리면 하체에 고인 혈액이 심장과 뇌로 힘차게 올라갑니다.' }
    ],
    dontList: [
      { title: '공복 사우나 · 뜨거운 탕 목욕 후 급히 일어서기', desc: '말초혈관이 갑자기 확장된 상태에서 일어서면 뇌혈류가 순식간에 빠져나가 실신하기 가장 쉽습니다.' },
      { title: '오후 2시 이후 커피 · 공복 고카페인 음료', desc: '교감신경을 과각성시켜 가슴 두근거림과 편두통 반동, 새벽 각성 불면증을 악화시킵니다.' },
      { title: '밀폐되고 더운 지하철·인파 속 장시간 부동 기립', desc: '다리를 움직이지 않고 오래 서 있으면 정맥혈이 하체에 고입니다. 제자리에서 발가락·종아리를 수시로 움직이세요.' }
    ],
    routine: [
      { time: '🌅 아침 · 기상 & 출근', title: '침대 맡 미온수 1잔 + 3단계 천천히 기상 + 아침 식사', desc: '아침 혈장량과 혈당을 안정시켜 오전 시간대 기립성 어지럼증과 식은땀을 든든하게 막아줍니다.' },
      { time: '☀️ 낮 · 일상 속', title: '매시간 까치발 펌프 20회 + 목 옆 흉쇄유돌근 이완', desc: '뇌로 올라가는 추골동맥과 미주신경 통로를 부드럽게 유지하고 충분한 수분을 조금씩 나누어 마십니다.' },
      { time: '🌙 밤 · 숙면 준비', title: '취침 30분 전 4-7-8 복식호흡으로 미주신경 안정', desc: '4초 코로 들이마시고 7초 멈춘 뒤 8초간 입으로 길게 내쉬면 과열된 교감신경 스위치가 편안히 꺼집니다.' }
    ],
    goodFoods: ['바나나·아보카도·시금치 (신경 안정 마그네슘·칼륨)', '연근·대추·상추 (천연 멜라토닌 및 심열 완화)', '전복·소고기·비트 (혈장량 및 뇌 산소 운반 보조)', '따뜻한 감국차(국화차)·산조인차 (두통·불면 진정)'],
    avoidFoods: ['공복 아이스 아메리카노·에너지드링크 (교감신경 폭주)', '숙성 치즈·적포도주·초콜릿 (편두통 혈관 유발 인자)', '극단적 무염식·탈수 다이어트 (혈압 저하·어지럼 유발)'],
    acupressure: {
      name: '손목 안쪽 내관혈(內關穴) & 귀 뒤 예풍혈 3분 지압',
      howTo: '손목 주름 중앙에서 팔꿈치 쪽으로 손가락 세 마디 아래 두 힘줄 사이(내관혈)를 엄지로 5초씩 지그시 누르고, 귓불 뒤 오목한 곳(예풍혈)을 부드럽게 원을 그리며 마사지합니다.',
      benefit: '울렁거림·어지럼증·가슴 두근거림을 진정시키고 미주신경 반사 균형을 빠르게 돕습니다.'
    }
  },
  digest: {
    tipBadge: '💡 부위별 생활 꿀팁 06 · 위장 담적 & 역류성식도염',
    tipTitle: '굳은 위장을 깨우는 담적 해독 · 역류 방지 식사 꿀팁',
    tipSummary: '위장 외벽이 다시 말랑하게 움직이도록 입안 침 효소와 복부 온도를 지키는 핵심 습관입니다.',
    doList: [
      { title: '한 입 30번 꼭꼭 씹기 (천연 소화제 아밀라아제)', desc: '음식물을 입안에서 죽처럼 잘게 부수어 넘기면 굳어진 위장 근육의 부담이 절반 이하로 줄어듭니다.' },
      { title: '식사 중 물·국물 줄이고 식후 1시간 뒤 미온수', desc: '밥을 물이나 국에 말아 먹으면 위산과 소화효소가 희석되어 미소화 독소(담적)와 가스가 쉽게 생깁니다.' },
      { title: '식후 바로 눕지 않고 15분 가벼운 평지 산책', desc: '가벼운 보행은 위장 연동운동을 촉진해 음식물이 십이지장으로 부드럽게 내려가도록 도와 역류를 막습니다.' }
    ],
    dontList: [
      { title: '취침 3시간 전 야식 및 식후 곧바로 눕기', desc: '위 속에 음식물이 남은 채 누우면 위산과 담즙이 식도와 목구멍(매핵기)까지 역류해 점막을 손상시킵니다.' },
      { title: '급하게 10분 만에 식사 끝내기 · 스마트폰 식사', desc: '교감신경이 긴장된 채 급히 삼키면 명치 끝이 돌처럼 막히는 급·만성 체기와 담적 경화가 반복됩니다.' },
      { title: '얼음 음료 · 밀가루 면류 · 빈속 산성 커피', desc: '차가운 음료는 복부 온도를 급격히 떨어뜨려 위장 평활근을 멈추게 하고 글루텐은 장내 가스 팽만을 키웁니다.' }
    ],
    routine: [
      { time: '🌅 아침 · 첫 끼니', title: '따뜻한 미온수 반 잔 + 양배추·마·부드러운 단백질 식사', desc: '밤새 쉬던 위 점막을 따뜻하게 코팅하고 위장 시계를 규칙적으로 작동시킵니다.' },
      { time: '☀️ 낮 · 점심 식사 후', title: '수저를 내려놓으며 20분 천천히 식사 + 15분 산책', desc: '식곤증과 명치 더부룩함을 없애고 오후 시간 가스가 차오르는 것을 예방합니다.' },
      { time: '🌙 밤 · 저녁 & 취침 전', title: '저녁 7시 이전 소식 + 배꼽 주변 시계방향 온열 마사지', desc: '따뜻한 손바닥이나 핫팩으로 배꼽 주변을 시계방향으로 쓸어주어 장 연동운동과 숙면을 함께 챙깁니다.' }
    ],
    goodFoods: ['살짝 찐 양배추·브로콜리 (비타민 U 위 점막 재생)', '산마·연근·감자 (뮤신 성분의 천연 위벽 보호막)', '무·매실청 미온수 (소화 효소 디아스타아제 풍부)', '따뜻한 생강차·진피차 (복부 냉증 해소 및 가스 배출)'],
    avoidFoods: ['라면·빵·피자 등 정제 밀가루 (담적 독소 및 장 가스)', '아이스 커피·탄산음료·초콜릿 (식도 괄약근 이완)', '기름진 튀김·매운 야식 (위 배출 지연 및 점막 자극)'],
    acupressure: {
      name: '명치와 배꼽 사이 중완혈(中脘穴) & 손등 합곡혈 3분 지압',
      howTo: '명치 끝과 배꼽의 정중앙(중완혈)을 따뜻한 손바닥으로 지그시 누르며 시계방향으로 30회 원을 그리고, 엄지와 검지 사이 오목한 손등(합곡혈)을 5초씩 눌러줍니다.',
      benefit: '딱딱하게 뭉친 명치 담적 긴장을 늦추고 답답한 트림·체기를 편안하게 내려줍니다.'
    }
  },
  gut: {
    tipBadge: '💡 부위별 생활 꿀팁 07 · 대사 해독 & 식욕ZERO 다이어트',
    tipTitle: '근육은 지키고 내장지방만 태우는 거꾸로 식사 · 대사 꿀팁',
    tipSummary: '굶는 고통 없이 인슐린 스파이크를 잠재우고 갈색지방 기초대사 화로를 켜는 핵심 루틴입니다.',
    doList: [
      { title: '채소 → 단백질 → 탄수화물 ‘거꾸로 식사법’', desc: '식이섬유와 단백질을 먼저 먹으면 혈당 급상승(인슐린 스파이크)이 억제되어 같은 양을 먹어도 지방 축적이 확 줄어듭니다.' },
      { title: '저녁 식사 후 다음 날 아침까지 12~14시간 공복', desc: '야간 공복 시간을 지켜주면 인슐린이 낮아지며 간과 복부에 쌓인 내장지방을 태우는 대사 스위치가 켜집니다.' },
      { title: '하루 미온수 1.5~2L 나누어 마시기', desc: '체지방이 분해될 때 나오는 대사 노폐물을 소변과 림프로 원활히 배출하고 가짜 배고픔을 잠재웁니다.' }
    ],
    dontList: [
      { title: '하루 한 끼 초절식 · 무탄수화물 굶기 다이어트', desc: '근육과 수분만 먼저 빠져 기초대사량이 추락하고, 이후 조금만 먹어도 더 살찌는 요요 체질로 변합니다.' },
      { title: '과일주스 · 라떼 · 제로음료 단맛 습관', desc: '액상과당은 간으로 직행해 내장지방이 되며, 강한 단맛 습관은 뇌의 렙틴 식욕 조절 회로를 둔감하게 만듭니다.' },
      { title: '짠 국물 식사 · 다리 꼬고 오래 앉아 있기', desc: '나트륨 과다와 골반 림프 정체는 하체 부종을 셀룰라이트형 살로 고착화시킵니다.' }
    ],
    routine: [
      { time: '🌅 아침 · 대사 스위치 ON', title: '기상 직후 미온수 1잔 + 삶은 달걀·그릭요거트·채소', desc: '아침 단백질 섭취는 하루 기초대사 체온을 올리고 저녁 폭식 호르몬(그렐린) 폭발을 막아줍니다.' },
      { time: '☀️ 낮 · 일반식 스마트하게', title: '국물 대신 건더기 위주 + 식후 15분 계단·평지 걷기', desc: '식후 15분 보행은 혈중 포도당이 뱃살로 저장되기 전 허벅지 근육 에너지로 즉시 소모시킵니다.' },
      { time: '🌙 밤 · 부종 배출 & 숙면', title: '저녁 7시 전 가벼운 식사 마감 + 서혜부(사타구니) 스트레칭', desc: '밤 7시간 이상 충분히 자야 식욕 억제 호르몬(렙틴)이 정상 분비되어 다음 날 식단 관리가 편안해집니다.' }
    ],
    goodFoods: ['오이·양배추·해조류 (포만감 채우는 풍부한 식이섬유)', '닭가슴살·두부·흰살생선·달걀 (근손실 없는 대사 단백질)', '호박·팥·율무차 (세포외수분 부종 및 노폐물 배출)', '아보카도·올리브유·견과류 한 줌 (착한 불포화지방)'],
    avoidFoods: ['달콤한 카페 음료·밀크티·탄산 (직행성 내장지방 원흉)', '마라탕·찌개 국물·야간 라면 (심한 부종 및 인슐린 폭발)', '야간 맥주·안주 습관 (지방 연소 완전 중단 및 지방간)'],
    acupressure: {
      name: '귀 앞 기점(飢點) 식욕혈 & 종아리 삼음교 부종 3분 지압',
      howTo: '식전 15분 귀 앞쪽 작은 돌기(이주) 중앙(기점)을 검지로 30회 지그시 누르고, 저녁에는 안쪽 복숭아뼈 위 손가락 네 마디 지점(삼음교)과 종아리를 아래에서 위로 쓸어 올립니다.',
      benefit: '가짜 식욕 충동을 부드럽게 가라앉히고 저녁마다 붓는 하체 림프 순환을 도와줍니다.'
    }
  },
  uterus: {
    tipBadge: '💡 부위별 생활 꿀팁 08 · 자궁 보온 · 생리통 · 난임 착상',
    tipTitle: '자궁내막을 따뜻하게 품어주는 보궁(補宮) · 골반 순환 꿀팁',
    tipSummary: '아랫배 심부 체온 1℃ 상승과 골반 어혈 순환이 편안한 그날과 건강한 착상의 토대가 됩니다.',
    doList: [
      { title: '아랫배(관원혈)와 발목(삼음교) 항상 따뜻하게 보온', desc: '발목과 하복부가 차가우면 자궁 나선동맥이 수축합니다. 실내에서도 덧신·양말과 무릎담요로 온기를 지켜주세요.' },
      { title: '일회용 용기·영수증 대신 유리·스테인리스 사용', desc: '비스페놀 등 환경호르몬(내분비계 교란물질)을 줄이면 난포 성숙과 호르몬 밸런스 안정에 큰 도움이 됩니다.' },
      { title: '취침 전 골반 나비 자세 스트레칭 & 부부 숙면', desc: '발바닥을 마주 대고 골반을 부드럽게 열어주면 자궁과 난소로 향하는 골반강 혈류가 원활해집니다.' }
    ],
    dontList: [
      { title: '생리·착상 준비기 아이스 음료 · 찬 바닥 착석', desc: '찬 기운은 자궁 근육 경련(프로스타글란딘 과다)과 검붉은 어혈 덩어리를 악화시켜 생리통을 키웁니다.' },
      { title: '꽉 끼는 스키니진 · 보정 속옷 장시간 착용', desc: '하복부와 서혜부 정맥·림프를 압박해 골반 울혈과 질염·냉대하 재발 원인이 됩니다.' },
      { title: '산후 조리기 찬 바람 노출 · 손목 비트는 집안일', desc: '출산 후 릴랙신 호르몬으로 느슨해진 관절에 냉기가 스며들면 만성 산후풍 시림으로 남기 쉽습니다.' }
    ],
    routine: [
      { time: '🌅 아침 · 따뜻한 시작', title: '체온보다 따뜻한 미온수 + 견과류·제철 채소·달걀 아침', desc: '하복부 장기와 자궁으로 따뜻한 혈액을 보내고 호르몬 합성에 필요한 좋은 영양소를 채웁니다.' },
      { time: '☀️ 낮 · 골반 순환', title: '다리 꼬지 않고 바르게 앉기 + 점심 후 15분 햇볕 산책', desc: '비타민 D 합성은 난소 기능(AMH)과 착상 면역 환경 개선에 중요한 역할을 합니다.' },
      { time: '🌙 밤 · 보궁 힐링', title: '하복부 온열 찜질 15분(생리 과다일·배아이식 직후 제외)', desc: '평소에는 아랫배를 따뜻하게 데워주되, 시험관 배아 이식 직후에는 과열 사우나 대신 가벼운 발목 보온만 해주세요.' }
    ],
    goodFoods: ['검은콩·두부·석류 (자궁내막 영양 및 식물성 에스트로겐)', '미역·소고기·시금치 (어혈 배출 및 철분·엽산 보충)', '단호박·부추·마늘 (하복부 냉증 완화 및 부종 감소)', '따뜻한 쑥차·대추생강차 (궁한 해소 및 손발 온기 회복)'],
    avoidFoods: ['얼음물·아이스크림·차가운 생식 (자궁 수축·어혈 유발)', '플라스틱 배달 용기 뜨거운 음식 (환경호르몬 노출)', '정제 설탕 과자·트랜스지방 빵류 (다낭성·배란 장애 악화)'],
    acupressure: {
      name: '배꼽 아래 관원혈(關元穴) & 안쪽 발목 삼음교혈 3분 지압',
      howTo: '배꼽에서 손가락 네 마디 아래(관원혈)에 따뜻한 양손을 포개어 1분간 온기를 전달하고, 안쪽 복숭아뼈 위 손가락 네 마디(삼음교)를 엄지로 5초씩 부드럽게 눌러줍니다.',
      benefit: '자궁과 난소의 심부 냉증을 녹이고 생리 전 골반 뻐근함을 편안하게 풀어줍니다.'
    }
  },
  prostate: {
    tipBadge: '💡 부위별 생활 꿀팁 09 · 전립선 · 요실금 · 골반저 활력',
    tipTitle: '야간뇨 없는 통잠과 당당한 외출을 돕는 전립선 · 방광 꿀팁',
    tipSummary: '회음부 압박 해소와 방광·골반저근 탄력 루틴으로 낮의 편안함과 밤의 깊은 숙면을 함께 지킵니다.',
    doList: [
      { title: '저녁 7시 이후 수분·과일 줄이고 취침 직전 배뇨', desc: '하루 수분은 낮 동안 충분히 마시고 저녁 이후에는 줄여야 새벽 야간뇨로 잠이 깨는 횟수가 빠르게 줄어듭니다.' },
      { title: '하루 10분 따뜻한 온수 좌욕 & 정확한 케겔 운동', desc: '38~40℃ 온수 좌욕으로 전립선 울혈을 풀고, 숨을 내쉬며 소변 참는 근육만 5초 수축·5초 이완을 15회 반복하세요.' },
      { title: '50분 착석마다 2분 기립 보행 & 도넛 방석 활용', desc: '오래 앉아 눌린 회음부 음부신경과 전립선 정맥 울혈을 즉시 해방시켜 묵직한 잔뇨감을 덜어줍니다.' }
    ],
    dontList: [
      { title: '소변 억지로 오래 참기 · 감기약(항히스타민) 주의', desc: '과도하게 소변을 참으면 방광 배뇨근이 지치고, 일부 코감기약 성분은 전립선 요도를 급격히 조일 수 있어 주의가 필요합니다.' },
      { title: '야간 맥주·음주 · 진한 커피·탄산음료', desc: '알코올은 전립선 점막을 붓게 하고 카페인은 방광을 예민하게 자극해 급박뇨와 절박성 요실금을 악화시킵니다.' },
      { title: '딱딱하고 좁은 자전거 안장 장시간 탑승', desc: '체중이 회음부 한 점에 집중되어 비세균성 만성 전립선염(만성골반통증증후군)을 재발시키는 대표 원인입니다.' }
    ],
    routine: [
      { time: '🌅 아침 · 활력 기상', title: '스쿼트 15회 × 2세트 + 익힌 토마토·호박씨 아침 식사', desc: '허벅지와 골반저 근육 혈류를 힘차게 깨우고 전립선 항산화 영양소(라이코펜·아연)를 충전합니다.' },
      { time: '☀️ 낮 · 방광 훈련', title: '50분마다 자리에서 일어나 걷기 + 커피 대신 미온수', desc: '골반 울혈이 쌓이지 않게 관리하고 방광 점막을 자극하는 산성·카페인 음료를 줄입니다.' },
      { time: '🌙 밤 · 통잠 준비', title: '저녁 온수 좌욕 10분 + 저녁 7시 이후 수분 제한', desc: '하복부와 회음부를 따뜻하게 이완해 새벽 화장실 각성 없이 아침까지 깊은 통잠을 돕습니다.' }
    ],
    goodFoods: ['올리브유에 살짝 익힌 토마토 (라이코펜 흡수율 4배)', '호박씨·굴·견과류 (전립선 면역 미네랄 아연·셀레늄)', '마·검은콩·부추·복분자 (방광 괄약근 및 신장 양기 보충)', '따뜻한 산수유차·오미자차 (야간뇨 완화 및 하초 진액 보호)'],
    avoidFoods: ['저녁 맥주·소주 등 알코올 (전립선 충혈·급성 요폐 위험)', '아이스 커피·탄산·신 과일주스 (과민성 방광 자극)', '매운 국물·기름진 육류 야식 (골반강 염증 및 부종 악화)'],
    acupressure: {
      name: '배꼽 아래 관원혈 온찜질 & 발바닥 용천혈(湧泉穴) 3분 지압',
      howTo: '아랫배 관원혈을 따뜻하게 감싸 데워주고, 발가락을 구부렸을 때 발바닥 앞쪽 중앙의 오목한 곳(용천혈)을 양손 엄지로 5초씩 15회 힘 있게 눌러줍니다.',
      benefit: '하초(방광·전립선·골반저)의 찬 기운을 몰아내고 하체 혈류와 원기 회복을 든든하게 돕습니다.'
    }
  }
};

function buildBodyExplorerHtml() {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
  <title>바른한의원 대전본점 | 3D 인체모형 · 부위별 생활 꿀팁 창고</title>
  <meta name="description" content="바른한의원 대전본점 안정위 대표원장이 알려드리는 3D 인체모형 9대 부위별 생활 꿀팁 창고. 소아성장, 탈모, 허리디스크 추나, 공진단, 자율신경 실신·두통, 담적 소화불량, 다이어트, 난임·생리통, 전립선·요실금 일상 루틴과 지압법." />
  <link rel="canonical" href="https://www.bareunhaniwon.com/body-explorer/" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@600;700;800&family=Pretendard:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": "바른한의원 대전본점 · 3D 인체모형 부위별 생활 꿀팁 창고",
    "url": "https://www.bareunhaniwon.com/body-explorer/",
    "inLanguage": "ko-KR",
    "description": "3D 인체모형으로 한눈에 보는 9대 부위별 실천 DO/DON'T, 아침·낮·밤 하루 루틴, 추천 식단 및 3분 셀프 지압 꿀팁 가이드.",
    "author": {
      "@type": "Physician",
      "name": "안정위 대표원장 (Dr. Jung-Wi Ahn)",
      "url": "https://www.bareunhaniwon.com/director/"
    }
  }
  </script>
  <style>
    :root {
      --bg-beige: #FAF7F0;
      --bg-beige-deep: #EFE8DA;
      --bg-white: #FFFFFF;
      --bg-white-glass: rgba(255, 255, 255, 0.96);
      --brown-deep: #362417;
      --brown-mid: #4A3525;
      --brown-soft: #635142;
      --green-primary: #1B4332;
      --green-mid: #15803D;
      --green-tint: #ECFDF5;
      --amber-gold: #B45309;
      --amber-tint: #FEF3C7;
      --navy-hub: #0F172A;
      --black-ink: #111827;
      --black-sub: #1F2937;
      --border-warm: #D6CFC2;
      --border-strong: #B8AE9C;
      --shadow-soft: 0 14px 36px rgba(24, 20, 15, 0.08);
      --shadow-card: 0 6px 20px rgba(24, 20, 15, 0.05);
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      width: 100%;
      height: 100%;
      background: var(--bg-beige);
      color: var(--black-ink);
      font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
    }

    /* 1. TOP HEADER BAR (2-ROW: TOP BRAND/ACTIONS + FULL-WIDTH 9-PART QUICKNAV) */
    .vibrant-header {
      position: fixed;
      top: 0; left: 0; right: 0;
      height: 104px;
      z-index: 300;
      background: var(--bg-white-glass);
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
      border-bottom: 1.5px solid var(--border-warm);
      box-shadow: 0 4px 20px rgba(17, 24, 39, 0.06);
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .vh-top-row {
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 22px;
      gap: 12px;
      width: 100%;
    }
    .vh-brand {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      color: var(--black-ink);
      flex-shrink: 0;
    }
    .vh-brand-mark {
      width: 32px;
      height: 32px;
      border-radius: 9px;
      background: linear-gradient(135deg, #D97706 0%, #B45309 100%);
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 0.96rem;
      box-shadow: 0 4px 10px rgba(180, 83, 9, 0.25);
    }
    .vh-brand-title {
      font-family: 'Noto Serif KR', serif;
      font-weight: 800;
      font-size: 0.98rem;
      color: var(--black-ink);
    }
    .vh-part-quicknav {
      height: 48px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 6px;
      overflow-x: auto;
      scrollbar-width: none;
      padding: 0 22px;
      background: rgba(250, 247, 240, 0.92);
      border-top: 1px solid #E5DEC9;
    }
    @media (min-width: 1700px) {
      .vh-part-quicknav { justify-content: center; }
    }
    .vh-part-quicknav::-webkit-scrollbar { display: none; }
    .vh-part-chip {
      appearance: none;
      border: 1.5px solid #D0C8B8;
      background: var(--bg-white);
      color: var(--black-ink);
      font-family: 'Pretendard', sans-serif;
      font-size: 0.77rem;
      font-weight: 800;
      padding: 6px 11px;
      border-radius: 999px;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.2s ease;
    }
    .vh-part-chip:hover {
      border-color: var(--amber-gold);
      background: #FFFBEB;
      color: #92400E;
    }
    .vh-part-chip.active {
      background: var(--green-primary);
      border-color: var(--green-primary);
      color: #FFFFFF;
      box-shadow: 0 4px 12px rgba(27, 67, 50, 0.24);
    }
    .vh-right-actions {
      display: flex;
      align-items: center;
      gap: 7px;
      flex-shrink: 0;
    }
    .vh-pill-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 7px 13px;
      border-radius: 999px;
      font-size: 0.8rem;
      font-weight: 800;
      text-decoration: none;
      border: 1.5px solid #C8C0B0;
      background: var(--bg-white);
      color: var(--black-ink);
      transition: all 0.2s ease;
      white-space: nowrap;
    }
    .vh-pill-btn:hover {
      border-color: var(--green-primary);
      background: var(--green-tint);
    }
    .vh-pill-btn.ask-hub-btn {
      background: var(--navy-hub);
      border-color: var(--navy-hub);
      color: #FFFFFF;
      box-shadow: 0 5px 14px rgba(15, 23, 42, 0.22);
    }
    .vh-pill-btn.ask-hub-btn:hover {
      background: #1E293B;
      transform: translateY(-1px);
    }
    .ask-live-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #34D399;
      box-shadow: 0 0 0 3px rgba(52, 211, 153, 0.25);
      display: inline-block;
    }

    /* 2. WORKSPACE SPLIT: LEFT 42% 3D BODY + RIGHT 58% LIFESTYLE TIPS & SCI HUB */
    .vibrant-workspace {
      display: grid;
      grid-template-columns: 42% 58%;
      justify-items: stretch;
      align-items: stretch;
      width: 100% !important;
      max-width: 100% !important;
      min-height: 100vh;
      margin: 0 !important;
      padding-top: 104px;
      background: radial-gradient(circle at 30% 35%, #FAF7F0 0%, #F4EFE4 58%, #EBE3D3 100%);
    }
    .vibrant-3d-stage {
      position: sticky;
      top: 104px;
      width: 100% !important;
      min-width: 100% !important;
      max-width: 100% !important;
      margin: 0 !important;
      justify-self: stretch !important;
      height: calc(100vh - 104px);
      background: radial-gradient(circle at 50% 42%, #FFFDF9 0%, #F1EADC 68%, #E5DCCB 100%);
      border-right: 1.5px solid var(--border-warm);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      user-select: none;
      z-index: 10;
    }
    #vibrant-body-canvas {
      position: absolute;
      inset: 0;
      width: 100% !important;
      height: 100% !important;
      display: block;
      z-index: 2;
      cursor: grab;
    }
    #vibrant-body-canvas:active { cursor: grabbing; }

    .stage-top-badge {
      position: relative;
      z-index: 25;
      margin: 16px auto 0;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 7px 16px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.95);
      border: 1.5px solid var(--border-warm);
      box-shadow: var(--shadow-card);
      pointer-events: none;
    }
    .stage-top-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #D97706;
    }
    .stage-top-text {
      font-size: 0.78rem;
      font-weight: 800;
      color: var(--brown-deep);
    }

    .stage-bottom-bar {
      position: relative;
      z-index: 25;
      margin: 0 auto 18px;
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 5px 10px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.95);
      border: 1.5px solid var(--border-warm);
      box-shadow: var(--shadow-soft);
    }
    .stage-ctrl-btn {
      appearance: none;
      border: none;
      background: transparent;
      color: var(--brown-mid);
      font-family: 'Pretendard', sans-serif;
      font-size: 0.76rem;
      font-weight: 800;
      padding: 6px 13px;
      border-radius: 999px;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .stage-ctrl-btn.active {
      background: var(--green-primary);
      color: #FFFFFF;
    }
    .stage-ctrl-btn.reset-btn {
      background: var(--brown-deep);
      color: #FFFFFF;
    }

    #hotspot-overlay-layer {
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 20;
      overflow: hidden;
    }
    .body-3d-hotspot {
      position: absolute;
      transform: translate(-50%, -50%);
      pointer-events: auto;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 5px;
      transition: opacity 0.25s ease, transform 0.25s ease;
    }
    .hotspot-pulse-ring {
      width: 21px;
      height: 21px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.96);
      border: 1.5px solid var(--brown-mid);
      box-shadow: 0 4px 10px rgba(58, 42, 30, 0.16);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 2px;
      transition: all 0.22s ease;
    }
    .hotspot-core-dot {
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background: var(--brown-deep);
    }
    .body-3d-hotspot.active .hotspot-pulse-ring {
      background: #D97706;
      border-color: #FFFFFF;
      box-shadow: 0 0 0 5px rgba(217, 119, 6, 0.24), 0 4px 14px rgba(180, 83, 9, 0.35);
    }
    .body-3d-hotspot.active .hotspot-core-dot { background: #FFFFFF; }
    .hotspot-tag-pill { display: none; }

    #dongin-loader-overlay {
      position: absolute;
      inset: 0;
      z-index: 60;
      background: rgba(250, 247, 240, 0.92);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10px;
      transition: opacity 0.4s ease, visibility 0.4s ease;
    }
    #dongin-loader-overlay.hidden { opacity: 0; visibility: hidden; pointer-events: none; }
    .loader-spinner {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      border: 3px solid var(--border-warm);
      border-top-color: #D97706;
      animation: spin 0.85s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* 3. RIGHT PANEL: PURE HIGH-VISIBILITY LIFESTYLE TIPS HUB */
    .tips-scroll-panel {
      width: 100% !important;
      min-width: 0 !important;
      max-width: 1060px;
      margin: 0 auto !important;
      justify-self: stretch !important;
      padding: 28px 34px 52px;
      display: flex;
      flex-direction: column;
      gap: 18px;
    }
    .tips-identity-strip {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 10px;
      padding: 12px 18px;
      border-radius: 14px;
      background: linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%);
      border: 1.5px solid #F59E0B;
      color: #78350F;
      font-size: 0.88rem;
      font-weight: 800;
    }
    .tips-hero-banner {
      display: grid;
      grid-template-columns: 200px 1fr;
      gap: 20px;
      align-items: center;
      background: #FFFFFF;
      border: 1.5px solid var(--border-strong);
      border-radius: 20px;
      padding: 20px 24px;
      box-shadow: var(--shadow-card);
    }
    .tips-hero-img {
      width: 100%;
      height: 138px;
      object-fit: cover;
      border-radius: 14px;
      border: 1px solid var(--border-warm);
      display: block;
    }
    .tips-kicker-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 5px 12px;
      border-radius: 999px;
      background: #FEF3C7;
      border: 1px solid #F59E0B;
      color: #92400E;
      font-size: 0.78rem;
      font-weight: 800;
      margin-bottom: 8px;
    }
    .tips-part-title {
      font-family: 'Noto Serif KR', serif;
      font-size: clamp(1.36rem, 2vw, 1.72rem);
      font-weight: 800;
      color: var(--black-ink);
      line-height: 1.36;
      margin-bottom: 7px;
      word-break: keep-all;
    }
    .tips-part-summary {
      font-size: 0.96rem;
      font-weight: 600;
      color: #374151;
      line-height: 1.62;
      word-break: keep-all;
    }

    .hero-clinic-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 7px;
      margin-top: 12px;
    }
    .hero-clinic-chip {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 6px 12px;
      border-radius: 999px;
      background: #FAF7F0;
      border: 1.5px solid #D6CFC2;
      color: var(--brown-deep);
      font-size: 0.78rem;
      font-weight: 800;
      text-decoration: none;
      transition: all 0.2s ease;
    }
    .hero-clinic-chip:hover {
      background: var(--green-primary);
      border-color: var(--green-primary);
      color: #FFFFFF;
      transform: translateY(-1px);
    }

    /* 4 Clear Lifestyle & SCI Evidence Tabs */
    .tips-tab-bar {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 9px;
    }
    .tips-tab-btn {
      appearance: none;
      border: 1.5px solid var(--border-strong);
      background: #FFFFFF;
      color: var(--black-ink);
      font-family: 'Pretendard', sans-serif;
      font-size: 0.86rem;
      font-weight: 800;
      padding: 12px 10px;
      border-radius: 14px;
      cursor: pointer;
      transition: all 0.2s ease;
      text-align: center;
      box-shadow: 0 3px 10px rgba(17, 24, 39, 0.04);
      word-break: keep-all;
    }
    .tips-tab-btn:hover {
      border-color: #D97706;
      background: #FFFBEB;
    }
    .tips-tab-btn.active {
      background: var(--green-primary);
      border-color: var(--green-primary);
      color: #FFFFFF;
      box-shadow: 0 8px 20px rgba(27, 67, 50, 0.22);
    }

    .tips-stage-box {
      background: #FFFFFF;
      border: 1.5px solid var(--border-strong);
      border-radius: 22px;
      padding: 26px 28px;
      box-shadow: var(--shadow-soft);
      animation: fadeSlideUp 0.28s ease-out;
    }
    @keyframes fadeSlideUp {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Tab 1: DO vs DON'T 2-Column High-Contrast Grid */
    .dodont-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 18px;
    }
    .dodont-col {
      border-radius: 18px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .dodont-col.do-col {
      background: #F0FDF4;
      border: 2px solid #86EFAC;
    }
    .dodont-col.dont-col {
      background: #FEF2F2;
      border: 2px solid #FECACA;
    }
    .dodont-col-header {
      font-size: 1.05rem;
      font-weight: 800;
      padding-bottom: 10px;
      border-bottom: 1.5px dashed rgba(17, 24, 39, 0.14);
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .do-col .dodont-col-header { color: #14532D; }
    .dont-col .dodont-col-header { color: #991B1B; }
    .tip-item-card {
      background: #FFFFFF;
      border-radius: 13px;
      padding: 14px 16px;
      border: 1px solid rgba(17, 24, 39, 0.09);
      box-shadow: 0 3px 8px rgba(17, 24, 39, 0.03);
    }
    .tip-item-title {
      font-size: 0.98rem;
      font-weight: 800;
      color: var(--black-ink);
      margin-bottom: 5px;
      line-height: 1.4;
      word-break: keep-all;
    }
    .tip-item-desc {
      font-size: 0.9rem;
      font-weight: 500;
      color: #374151;
      line-height: 1.62;
      word-break: keep-all;
    }

    /* Tab 2: Morning / Day / Night 3-Step Routine */
    .routine-timeline {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 14px;
      margin-bottom: 20px;
    }
    .routine-card {
      border-radius: 16px;
      padding: 18px;
      background: #FFFDF8;
      border: 1.5px solid #E5D5B5;
      border-top: 5px solid #D97706;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .routine-time-badge {
      font-size: 0.8rem;
      font-weight: 800;
      color: #92400E;
      background: #FEF3C7;
      padding: 4px 10px;
      border-radius: 999px;
      width: fit-content;
    }
    .routine-title {
      font-size: 1rem;
      font-weight: 800;
      color: var(--black-ink);
      line-height: 1.42;
      word-break: keep-all;
    }
    .routine-desc {
      font-size: 0.9rem;
      color: #374151;
      line-height: 1.64;
      word-break: keep-all;
    }
    .extra-care-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      padding-top: 16px;
      border-top: 1.5px dashed var(--border-warm);
    }
    .extra-care-card {
      background: #F8FAFC;
      border: 1px solid #CBD5E1;
      border-radius: 13px;
      padding: 14px 15px;
    }

    /* Tab 3: Food & Acupressure */
    .food-grid {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 16px;
      margin-bottom: 18px;
    }
    .food-box {
      border-radius: 16px;
      padding: 18px 20px;
    }
    .food-box.good {
      background: #ECFDF5;
      border: 1.5px solid #6EE7B7;
    }
    .food-box.avoid {
      background: #FFF7ED;
      border: 1.5px solid #FDBA74;
    }
    .food-list {
      margin: 10px 0 0;
      padding-left: 18px;
      font-size: 0.93rem;
      font-weight: 600;
      color: var(--black-ink);
      line-height: 1.78;
    }
    .acupressure-card {
      border-radius: 18px;
      padding: 20px 22px;
      background: linear-gradient(135deg, #F0FDF4 0%, #FEF3C7 100%);
      border: 1.5px solid #34D399;
      margin-bottom: 16px;
    }

    /* Tab 4: Overseas & Integrative SCI Evidence Cards */
    .sci-paper-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 14px;
      margin-bottom: 18px;
    }
    .sci-paper-card {
      border-radius: 16px;
      padding: 18px 20px;
      background: #FFFDF8;
      border: 1.5px solid #E5D5B5;
      border-left: 5px solid var(--green-primary);
      display: flex;
      flex-direction: column;
      gap: 7px;
    }
    .sci-paper-card.integrative {
      background: #F0FDF4;
      border-color: #86EFAC;
      border-left-color: #D97706;
      grid-column: 1 / -1;
    }
    .sci-paper-badge {
      display: inline-flex;
      align-items: center;
      padding: 3px 10px;
      border-radius: 999px;
      font-size: 0.75rem;
      font-weight: 800;
      background: #FEF3C7;
      color: #92400E;
      width: fit-content;
    }
    .sci-paper-journal {
      font-size: 0.94rem;
      font-weight: 800;
      color: var(--green-primary);
      line-height: 1.4;
    }
    .sci-paper-cite {
      font-size: 0.81rem;
      font-weight: 600;
      color: #6B7280;
      font-style: italic;
      line-height: 1.45;
    }
    .sci-paper-finding {
      font-size: 0.9rem;
      font-weight: 500;
      color: #1F2937;
      line-height: 1.64;
      word-break: keep-all;
    }

    /* Bottom Single Royal Slate Navy Bridge to '의학 인사이트 & 질환별 비공개 Q&A' */
    .ask-doctor-bridge-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 16px;
      padding: 22px 26px;
      border-radius: 20px;
      background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
      color: #FFFFFF;
      box-shadow: 0 12px 30px rgba(15, 23, 42, 0.18);
    }
    .adb-kicker {
      font-size: 0.78rem;
      font-weight: 800;
      color: #6EE7B7;
      margin-bottom: 4px;
    }
    .adb-title {
      font-family: 'Noto Serif KR', serif;
      font-size: 1.15rem;
      font-weight: 800;
      color: #FFFFFF;
      margin-bottom: 4px;
      word-break: keep-all;
    }
    .adb-sub {
      font-size: 0.88rem;
      color: #CBD5E1;
      font-weight: 500;
    }
    .adb-actions {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }
    .adb-btn-primary {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 12px 20px;
      border-radius: 999px;
      background: #10B981;
      color: #052E16;
      font-size: 0.9rem;
      font-weight: 800;
      text-decoration: none;
      transition: all 0.2s ease;
    }
    .adb-btn-primary:hover {
      background: #34D399;
      transform: translateY(-1px);
    }
    .adb-btn-secondary {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 11px 18px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.12);
      border: 1.5px solid rgba(255, 255, 255, 0.28);
      color: #FFFFFF;
      font-size: 0.86rem;
      font-weight: 800;
      text-decoration: none;
    }
    .adb-btn-secondary:hover { background: rgba(255, 255, 255, 0.2); }

    @media (max-width: 1120px) {
      .vibrant-header {
        position: sticky;
        height: auto;
      }
      .vh-top-row {
        height: auto;
        min-height: 52px;
        padding: 8px 12px;
        flex-wrap: wrap;
      }
      .vh-right-actions {
        flex-wrap: wrap;
        gap: 6px;
      }
      .vh-part-quicknav {
        height: 44px;
        padding: 0 12px;
      }
      .vibrant-workspace { grid-template-columns: 1fr; padding-top: 0; }
      .vibrant-3d-stage {
        position: relative;
        top: 0;
        height: 46dvh;
        min-height: 330px;
        border-right: none;
        border-bottom: 1.5px solid var(--border-warm);
      }
      .tips-scroll-panel { padding: 20px 14px 36px; }
      .tips-tab-bar { grid-template-columns: repeat(2, 1fr); }
      .tips-hero-banner, .dodont-grid, .routine-timeline, .extra-care-grid, .food-grid, .sci-paper-grid {
        grid-template-columns: 1fr;
      }
      .tips-stage-box { padding: 20px 16px; }
    }
    @media (max-width: 600px) {
      .tips-tab-bar { grid-template-columns: 1fr; }
    }
  </style>
  <link rel="icon" href="data:,">
</head>
<body>

  <!-- TOP HEADER BAR -->
  <header class="vibrant-header">
    <div class="vh-top-row">
      <a href="story-3d.html" class="vh-brand">
        <div class="vh-brand-mark">💡</div>
        <span class="vh-brand-title">바른한의원 대전본점 · 3D 인체모형 부위별 생활 꿀팁 창고</span>
      </a>

      <div class="vh-right-actions">
        <a href="ask-doctor.html?tab=blog" class="vh-pill-btn">📘 의학 인사이트</a>
        <a href="ask-doctor.html?tab=qna&part=knee" class="vh-pill-btn ask-hub-btn" id="vh-ask-doctor-link">
          <span class="ask-live-dot"></span>
          <span>🔒 질환별 비공개 Q&amp;A</span>
        </a>
        <a href="story-3d.html" class="vh-pill-btn">← 메인 쇼룸</a>
        <a href="story-3d.html?cards=1" class="vh-pill-btn">진료 상세카드 ↗</a>
      </div>
    </div>

    <nav class="vh-part-quicknav" id="vh-part-quicknav" aria-label="9대 인체 부위별 꿀팁 선택">
      ${BODY_PARTS.map((p, idx) => `<button type="button" class="vh-part-chip${idx === 0 ? ' active' : ''}" data-part="${p.id}">${p.navLabel}</button>`).join('\n      ')}
    </nav>
  </header>

  <main class="vibrant-workspace">
    <!-- LEFT: 3D HUMAN BODY SHOWROOM STAGE (WARM HANJI PORCELAIN TRANSLUCENT ANATOMY) -->
    <section class="vibrant-3d-stage" id="vibrant-3d-stage">
      <div id="dongin-loader-overlay">
        <div class="loader-spinner"></div>
        <div style="font-size:0.88rem;font-weight:700;color:var(--brown-deep);">3D 인체 장기 · 신경 · 골격 로딩 중...</div>
      </div>

      <div class="stage-top-badge">
        <span class="stage-top-dot"></span>
        <span class="stage-top-text" id="stage-active-part-label">무릎 · 소아 성장판 &amp; 소아비만 생활꿀팁</span>
      </div>

      <canvas id="vibrant-body-canvas"></canvas>
      <div id="hotspot-overlay-layer"></div>

      <div class="stage-bottom-bar">
        <button type="button" class="stage-ctrl-btn active" id="btn-gender-male" onclick="window.setDonginGender('male')">남성 체형</button>
        <button type="button" class="stage-ctrl-btn" id="btn-gender-female" onclick="window.setDonginGender('female')">여성 체형</button>
        <span style="width:1px;height:14px;background:var(--border-warm);"></span>
        <button type="button" class="stage-ctrl-btn reset-btn" id="btn-cam-reset" onclick="window.resetDonginView()">↺ 원위치</button>
      </div>
    </section>

    <!-- RIGHT: HIGH-VISIBILITY LIFESTYLE TIPS & OVERSEAS SCI EVIDENCE PANEL -->
    <section class="tips-scroll-panel" id="encyclopedia-scroll-panel">
      <div class="tips-identity-strip">
        <span>💡 이곳은 3D 인체 해부 모형으로 살펴보는 <strong>『9대 부위별 생활 꿀팁 &amp; 해외 SCI 근거 창고』</strong>입니다.</span>
        <span>심층 칼럼과 개인 증상 상담은 상단 <strong>[의학 인사이트]</strong> · <strong>[질환별 비공개 Q&amp;A]</strong>를 이용해 주세요.</span>
      </div>
      <div id="encyclopedia-dynamic-content"></div>
    </section>
  </main>

  <script>
  (async function() {
    const BODY_PARTS_DATA = ${JSON.stringify(BODY_PARTS)};
    const PART_TIPS_MAP = ${JSON.stringify(PART_LIFESTYLE_TIPS)};
    const QNA_CATS_LIST = ${JSON.stringify(DISEASE_QNA_CATEGORIES)};

    // Auto-redirect legacy ?tab=blog or ?blog=1 requests cleanly to the dedicated insight journal
    const earlyParams = new URLSearchParams(window.location.search);
    const earlyPart = earlyParams.get('part') || 'knee';
    if (earlyParams.get('tab') === 'blog' || earlyParams.get('blog') === '1') {
      window.location.replace('ask-doctor.html?tab=blog');
      return;
    }

    const PART_CAMERA_PRESETS = {
      knee:      { pos3D: [ 0.16, 1.20,  0.05], camPos: [ 0.14, 1.22, 2.05], camTarget: [0.06, 1.18, -0.06] },
      cervical:  { pos3D: [-0.06, 3.92,  0.04], camPos: [ 0.20, 3.90, 1.85], camTarget: [0.00, 3.86, -0.02] },
      lumbar:    { pos3D: [ 0.08, 2.75,  0.04], camPos: [-0.22, 2.62, 2.15], camTarget: [0.00, 2.58, -0.04] },
      gongjindan:{ pos3D: [ 0.06, 3.62,  0.06], camPos: [ 0.16, 3.88, 2.40], camTarget: [0.00, 3.84,  0.00] },
      syncope:   { pos3D: [ 0.08, 4.28,  0.04], camPos: [ 0.00, 2.28, 5.65], camTarget: [0.00, 2.26,  0.00] },
      digest:    { pos3D: [ 0.08, 3.22,  0.08], camPos: [-0.16, 3.20, 2.04], camTarget: [0.00, 3.16,  0.02] },
      gut:       { pos3D: [-0.08, 3.06,  0.08], camPos: [ 0.16, 3.08, 2.08], camTarget: [0.00, 3.06,  0.02] },
      uterus:    { pos3D: [-0.10, 2.44,  0.05], camPos: [ 0.00, 2.44, 1.75], camTarget: [0.00, 2.42,  0.00] },
      prostate:  { pos3D: [ 0.10, 2.26,  0.05], camPos: [ 0.00, 2.28, 1.72], camTarget: [0.00, 2.26,  0.00] }
    };

    let currentPartId = earlyPart;
    let currentTipTab = 0; // 0 = DO/DONT, 1 = 3-Step Daily Routine, 2 = Food & Acupressure, 3 = Overseas & Integrative SCI Papers

    const contentBox = document.getElementById('encyclopedia-dynamic-content');
    const quickNavButtons = document.querySelectorAll('#vh-part-quicknav .vh-part-chip');
    const stageLabelEl = document.getElementById('stage-active-part-label');
    const stageEl = document.getElementById('vibrant-3d-stage');
    const canvas = document.getElementById('vibrant-body-canvas');
    const hotspotLayer = document.getElementById('hotspot-overlay-layer');
    const loaderOverlay = document.getElementById('dongin-loader-overlay');
    const topAskLink = document.getElementById('vh-ask-doctor-link');

    function getPartById(id) {
      return BODY_PARTS_DATA.find(p => p.id === id) || BODY_PARTS_DATA[0];
    }

    function getQnaCatByPartId(id) {
      return QNA_CATS_LIST.find(c => c.partId === id) || QNA_CATS_LIST[0];
    }

    function renderTipsPanel(partId, tabIdx = 0) {
      const part = getPartById(partId);
      const tips = PART_TIPS_MAP[part.id] || PART_TIPS_MAP.knee;
      const qCat = getQnaCatByPartId(part.id);
      currentPartId = part.id;
      currentTipTab = ((tabIdx % 4) + 4) % 4;

      quickNavButtons.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-part') === part.id);
      });
      if (stageLabelEl) {
        stageLabelEl.textContent = part.shortName + ' · 생활꿀팁';
      }
      if (topAskLink) {
        topAskLink.setAttribute('href', 'ask-doctor.html?tab=qna&part=' + part.id);
      }

      const clinicLinksArr = (qCat && Array.isArray(qCat.clinicLinks) && qCat.clinicLinks.length)
        ? qCat.clinicLinks
        : [{ label: part.clinicCta || '연관 진료 클리닉 바로가기', href: part.clinicLink }];
      const heroClinicChipsHtml = clinicLinksArr.map(cl =>
        '<a href="' + cl.href + '" class="hero-clinic-chip">🏥 ' + cl.label + ' ↗</a>'
      ).join('');

      let tabBodyHtml = '';
      if (currentTipTab === 0) {
        const doHtml = tips.doList.map((item, i) =>
          '<div class="tip-item-card">' +
            '<div class="tip-item-title">✔ 실천 0' + (i + 1) + ' · ' + item.title + '</div>' +
            '<div class="tip-item-desc">' + item.desc + '</div>' +
          '</div>'
        ).join('');
        const dontHtml = tips.dontList.map((item, i) =>
          '<div class="tip-item-card">' +
            '<div class="tip-item-title">✖ 주의 0' + (i + 1) + ' · ' + item.title + '</div>' +
            '<div class="tip-item-desc">' + item.desc + '</div>' +
          '</div>'
        ).join('');

        tabBodyHtml =
          '<div class="dodont-grid">' +
            '<div class="dodont-col do-col">' +
              '<div class="dodont-col-header">✅ 오늘부터 꼭 실천할 꿀팁 DO 3</div>' +
              doHtml +
            '</div>' +
            '<div class="dodont-col dont-col">' +
              '<div class="dodont-col-header">❌ 회복을 방해하는 주의 습관 DON&apos;T 3</div>' +
              dontHtml +
            '</div>' +
          '</div>';
      } else if (currentTipTab === 1) {
        const routineCardsHtml = tips.routine.map(r =>
          '<div class="routine-card">' +
            '<span class="routine-time-badge">' + r.time + '</span>' +
            '<div class="routine-title">' + r.title + '</div>' +
            '<div class="routine-desc">' + r.desc + '</div>' +
          '</div>'
        ).join('');
        const slide2Cards = (part.slides && part.slides[2] && part.slides[2].cards) ? part.slides[2].cards : [];
        const extraHtml = slide2Cards.map(c =>
          '<div class="extra-care-card">' +
            '<div style="font-size:0.76rem;font-weight:800;color:#15803D;margin-bottom:4px;">' + c.tag + '</div>' +
            '<div class="tip-item-title">' + c.title + '</div>' +
            '<div class="tip-item-desc">' + c.desc + '</div>' +
          '</div>'
        ).join('');

        tabBodyHtml =
          '<div class="routine-timeline">' + routineCardsHtml + '</div>' +
          '<div style="font-size:0.9rem;font-weight:800;color:#1B4332;margin-bottom:8px;">📌 생활 속 실전 홈케어 체크포인트</div>' +
          '<div class="extra-care-grid">' + extraHtml + '</div>';
      } else if (currentTipTab === 2) {
        const goodLi = tips.goodFoods.map(f => '<li>' + f + '</li>').join('');
        const avoidLi = tips.avoidFoods.map(f => '<li>' + f + '</li>').join('');
        const slide3Cards = (part.slides && part.slides[3] && part.slides[3].cards) ? part.slides[3].cards : [];
        const keepHtml = slide3Cards.map(c =>
          '<div class="extra-care-card">' +
            '<div style="font-size:0.76rem;font-weight:800;color:#B45309;margin-bottom:4px;">' + c.tag + '</div>' +
            '<div class="tip-item-title">' + c.title + '</div>' +
            '<div class="tip-item-desc">' + c.desc + '</div>' +
          '</div>'
        ).join('');

        tabBodyHtml =
          '<div class="acupressure-card">' +
            '<div style="font-size:0.8rem;font-weight:800;color:#065F46;margin-bottom:5px;">🤲 하루 3분 셀프 혈자리 지압 · 이완 가이드</div>' +
            '<h3 style="font-size:1.12rem;font-weight:800;color:#111827;margin-bottom:7px;">' + tips.acupressure.name + '</h3>' +
            '<p style="font-size:0.94rem;color:#1F2937;line-height:1.68;margin-bottom:6px;"><strong>따라 하기:</strong> ' + tips.acupressure.howTo + '</p>' +
            '<p style="font-size:0.9rem;font-weight:700;color:#14532D;">✨ 기대 효과: ' + tips.acupressure.benefit + '</p>' +
          '</div>' +
          '<div class="food-grid">' +
            '<div class="food-box good">' +
              '<div style="font-size:0.98rem;font-weight:800;color:#065F46;">🥗 가까이하면 좋은 맞춤 약선 식품</div>' +
              '<ul class="food-list">' + goodLi + '</ul>' +
            '</div>' +
            '<div class="food-box avoid">' +
              '<div style="font-size:0.98rem;font-weight:800;color:#9A3412;">⚠️ 줄여야 할 주의 식품</div>' +
              '<ul class="food-list">' + avoidLi + '</ul>' +
            '</div>' +
          '</div>' +
          '<div class="extra-care-grid">' + keepHtml + '</div>';
      } else {
        const overseasHtml = ((qCat && qCat.overseasPapers) || []).map(p =>
          '<div class="sci-paper-card">' +
            '<span class="sci-paper-badge">🌍 ' + p.badge + '</span>' +
            '<div class="sci-paper-journal">' + p.journal + '</div>' +
            '<div class="sci-paper-cite">' + p.citation + '</div>' +
            '<div class="sci-paper-finding">' + p.finding + '</div>' +
          '</div>'
        ).join('');
        const integrativeHtml = ((qCat && qCat.integrativePapers) || []).map(p =>
          '<div class="sci-paper-card integrative">' +
            '<span class="sci-paper-badge" style="background:#DCFCE7;color:#14532D;">🌿 ' + p.badge + '</span>' +
            '<div class="sci-paper-journal">' + p.journal + '</div>' +
            '<div class="sci-paper-cite">' + p.citation + '</div>' +
            '<div class="sci-paper-finding">' + p.finding + '</div>' +
          '</div>'
        ).join('');
        const extraSciHtml = (part.sciPapers || []).map(sp =>
          '<div class="extra-care-card">' +
            '<div style="font-size:0.76rem;font-weight:800;color:#1B4332;margin-bottom:4px;">📄 ' + sp.journal + '</div>' +
            '<div class="tip-item-title" style="font-size:0.91rem;margin-bottom:0;">' + sp.title + '</div>' +
          '</div>'
        ).join('');

        tabBodyHtml =
          '<div style="font-size:0.94rem;font-weight:800;color:var(--brown-deep);margin-bottom:12px;">🌍 해외 메이저 의학 학술지 &amp; 통합의학 SCI 연구 근거 (' + (qCat ? qCat.enName : part.subtitleEn) + ')</div>' +
          '<div class="sci-paper-grid">' + overseasHtml + integrativeHtml + '</div>' +
          (extraSciHtml ? '<div style="font-size:0.86rem;font-weight:800;color:#4B5563;margin-bottom:8px;">📚 추가 참고 학술 문헌</div><div class="extra-care-grid">' + extraSciHtml + '</div>' : '');
      }

      contentBox.innerHTML =
        '<div class="tips-hero-banner">' +
          '<img src="' + part.illustImg + '" alt="바른한의원 대전본점 ' + part.shortName + ' 생활 꿀팁 일러스트" class="tips-hero-img" />' +
          '<div>' +
            '<div class="tips-kicker-pill">' + tips.tipBadge + '</div>' +
            '<h1 class="tips-part-title">' + tips.tipTitle + '</h1>' +
            '<p class="tips-part-summary">' + tips.tipSummary + '</p>' +
            '<div class="hero-clinic-chips">' + heroClinicChipsHtml + '</div>' +
          '</div>' +
        '</div>' +

        '<div class="tips-tab-bar" role="tablist">' +
          '<button type="button" class="tips-tab-btn' + (currentTipTab === 0 ? ' active' : '') + '" onclick="window.switchTipTab(0)">① ✅ 실천 DO vs ❌ 주의 DON&apos;T</button>' +
          '<button type="button" class="tips-tab-btn' + (currentTipTab === 1 ? ' active' : '') + '" onclick="window.switchTipTab(1)">② ⏰ 아침 · 낮 · 밤 하루 루틴</button>' +
          '<button type="button" class="tips-tab-btn' + (currentTipTab === 2 ? ' active' : '') + '" onclick="window.switchTipTab(2)">③ 🥗 추천 식단 &amp; 🤲 3분 지압</button>' +
          '<button type="button" class="tips-tab-btn' + (currentTipTab === 3 ? ' active' : '') + '" onclick="window.switchTipTab(3)">④ 🌍 해외 · 통합 SCI 논문 근거</button>' +
        '</div>' +

        '<div class="tips-stage-box">' +
          tabBodyHtml +
        '</div>' +

        '<div class="ask-doctor-bridge-card">' +
          '<div>' +
            '<div class="adb-kicker">📘 대표 의학 인사이트 저널 &amp; 🔒 회원 전용 질환별 1:1 비공개 Q&amp;A</div>' +
            '<div class="adb-title">' + part.shortName + '에 관한 심층 의학 칼럼을 읽거나 1:1 비공개 질문을 남기시겠어요?</div>' +
            '<div class="adb-sub">시술 홍보를 배제한 해외 SCI 논문 기반 의학 인사이트 저널과 작성자·의료진만 열람 가능한 1:1 비공개 Q&amp;A를 운영합니다.</div>' +
          '</div>' +
          '<div class="adb-actions">' +
            '<a href="ask-doctor.html?tab=qna&part=' + part.id + '" class="adb-btn-primary">🔒 질환별 1:1 비공개 Q&amp;A →</a>' +
            '<a href="ask-doctor.html?tab=blog" class="adb-btn-secondary">📘 의학 인사이트 블로그</a>' +
            '<a href="' + part.clinicLink + '" class="adb-btn-secondary">' + part.clinicCta + '</a>' +
          '</div>' +
        '</div>';
    }

    window.switchTipTab = function(tabIdx) {
      renderTipsPanel(currentPartId, tabIdx);
    };

    // Render Lifestyle Tips Immediately (0ms)
    renderTipsPanel(currentPartId, 0);

    setTimeout(() => {
      if (loaderOverlay) loaderOverlay.classList.add('hidden');
    }, 5500);

${WEBGL_PART_A}

    window.selectBodyPart = function(partId, shouldFlyCamera = true) {
      const part = getPartById(partId);
      renderTipsPanel(part.id, 0);

      if (part.id === 'uterus') {
        window.setDonginGender('female');
      } else if (part.id === 'prostate') {
        window.setDonginGender('male');
      }

      const preset = PART_CAMERA_PRESETS[part.id];
      if (preset && shouldFlyCamera) {
        isOverviewCamera = (part.id === 'syncope');
        camGoalPos.set(...preset.camPos);
        camGoalTarget.set(...preset.camTarget);
        isCameraFlying = true;
      }

      majorHotspotNodes.forEach(h => {
        h.dom.classList.toggle('active', h.id === part.id);
      });

      updateAnatomyHighlight();
    };

${WEBGL_PART_B}

    const params = new URLSearchParams(window.location.search);
    const urlPart = params.get('part');
    if (urlPart) {
      window.selectBodyPart(urlPart, true);
    } else {
      window.selectBodyPart('knee', false);
      window.resetDonginView();
    }
    animate();
  })();
  </script>
  <script src="visit-tracker.js"></script>
</body>
</html>`;
}

const outPath = path.join(__dirname, 'body-explorer.html');
const html = buildBodyExplorerHtml();
fs.writeFileSync(outPath, html, 'utf8');
console.log('✅ Generated Warm Hanji Porcelain 3D Body Explorer & Lifestyle Tips Hub (body-explorer.html):', outPath, '(' + html.length + ' bytes)');
