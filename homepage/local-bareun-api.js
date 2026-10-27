const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { auditNoteThreeStage } = require('./body-3d-auto-notes-data.js');

const DB_PATH = path.join(__dirname, 'private-qna-db.json');
const LOCAL_SECRET = 'bareun-local-hmac-secret-2026';

const INITIAL_PRIVATE_QNA = [
  {
    id: 1, partId: 'knee', userId: 101,
    memberName: '김서연', memberEmail: 'seoyeon.parent@kakao.member', memberPhone: '010-4821-7390',
    socialProvider: 'kakao', gender: '여성', ageGroup: '초등 저학년 자녀(보호자)', symptomDuration: '6개월~1년',
    title: '초3 여아 야간 구강호흡과 또래 대비 성장 속도 지연 관련 문의드립니다',
    content: '만 9세 여아인데 비염으로 밤마다 입을 벌리고 자며 최근 1년간 키가 3.5cm밖에 자라지 않았습니다. 서파수면과 성장판 골연령 진행 상태를 확인하려면 어떤 생활 교정과 검진이 필요한지 궁금합니다.',
    status: 'answered',
    masterReply: '소아 내분비학 연구(JCEM)에 따르면 성장호르몬 일일 분비량의 약 70% 이상이 야간 깊은 서파수면(Slow-Wave Sleep) 단계에서 분비됩니다. 구강호흡은 야간 미세각성을 유발해 수면의 질을 떨어뜨리므로 실내 습도 50% 유지, 취침 2시간 전 당류 제한, 비강 호흡 환경 조성이 우선 권장되며 내원 시 무방사선 초음파 및 체성분·비강 상태 점검을 통해 세밀히 안내받으실 수 있습니다.',
    clientIp: '211.36.142.18', createdAt: '2026-10-24 14:20:00', repliedAt: '2026-10-24 17:05:00'
  },
  {
    id: 2, partId: 'cervical', userId: 102,
    memberName: '박준호', memberEmail: 'junho.park88@gmail.com', memberPhone: '010-9234-1182',
    socialProvider: 'google', gender: '남성', ageGroup: '30대', symptomDuration: '1년 이상 만성',
    title: 'IT 개발직 거북목 긴장과 정수리 열감·모발 가늘어짐 연관성 질문드립니다',
    content: '하루 10시간 이상 모니터를 본 뒤로 뒷목이 늘 뻐근하고 저녁이면 두피가 뜨거워지면서 정수리 모발이 눈에 띄게 가늘어졌습니다. 생활 속 두피 온도 관리와 경추 긴장 완화 방법이 궁금합니다.',
    status: 'answered',
    masterReply: '피부과학 학술지(Nature Reviews Disease Primers · J Invest Dermatol)에서도 모유두(Dermal Papilla) 주변 미세혈류 저하와 국소 미세염증이 모낭 소형화를 가속하는 주요 요인으로 보고됩니다. 모니터 상단을 눈높이에 맞추어 후두하근 압박을 줄이고, 저녁 미온수 세정 후 냉풍 건조 및 취침 전 15분 족욕으로 상부 열쏠림을 완화하는 루틴을 꾸준히 실천해 보시기 바랍니다.',
    clientIp: '175.223.41.90', createdAt: '2026-10-24 19:42:00', repliedAt: '2026-10-25 10:15:00'
  },
  {
    id: 3, partId: 'lumbar', userId: 103,
    memberName: '이정훈', memberEmail: 'jhlee_daejeon@naver.com', memberPhone: '010-3715-6049',
    socialProvider: 'naver', gender: '남성', ageGroup: '40대', symptomDuration: '6개월~1년',
    title: '장시간 운전 후 반복되는 우측 둔부·종아리 당김 증상 상담 요청드립니다',
    content: '하루 3시간 이상 운전하며 출퇴근하는데 허리 자체 통증보다 오른쪽 엉덩이 깊은 곳부터 종아리 바깥쪽까지 저릿하게 당기는 증상이 반복됩니다. 디스크성 방사통과 이상근 증후군을 어떻게 구별하나요?',
    status: 'answered',
    masterReply: '세계적 의학저널 The Lancet(2018) 및 JAMA 척추 가이드라인에서는 만성 요통·좌골신경통 평가 시 단순 영상 소견뿐 아니라 골반 경사·고관절 외회전근(이상근) 긴장도를 함께 감별할 것을 권고합니다. 기침·배변 시 복압 상승으로 저림이 심해지면 요추 신경근 압박 가능성이 높고, 착석 압박 시 둔부 국소 통증이 두드러지면 이상근 긴장 가능성이 높으므로 50분 간격 기립 신전 스트레칭과 정밀 이학적 평가를 권장합니다.',
    clientIp: '118.235.19.44', createdAt: '2026-10-25 09:12:00', repliedAt: '2026-10-25 13:30:00'
  },
  {
    id: 4, partId: 'gongjindan', userId: 104,
    memberName: '최은정', memberEmail: 'eunjung.choi@kakao.member', memberPhone: '010-6480-2910',
    socialProvider: 'kakao', gender: '여성', ageGroup: '50대', symptomDuration: '6개월~1년',
    title: '수면 시간은 충분한데도 아침 기상 직후 심한 번아웃과 브레인포그가 지속됩니다',
    content: '7시간 이상 자도 아침에 눈을 뜨면 몸이 물먹은 솜처럼 무겁고 오후 2시만 되면 머리가 멍해져 집중이 어렵습니다. 혈액검사는 정상 범위라는데 어떤 생체 지표를 점검해 보아야 할까요?',
    status: 'answered',
    masterReply: 'Nature Medicine(Furman et al., 2019)에서 제시한 전신 저등급 만성 염증(Systemic Chronic Inflammation) 및 시상하부-뇌하수체-부신(HPA) 축의 코르티솔 일주기 리듬 평탄화가 동반될 때 일반 혈액검사 정상 소견에도 깊은 피로와 브레인포그가 나타날 수 있습니다. 기상 직후 15분 자연광 노출과 오후 카페인 차단을 먼저 실천하시고 자율신경 변이도(HRV) 및 간·대사 지표를 함께 점검해 보시길 권합니다.',
    clientIp: '223.38.77.12', createdAt: '2026-10-25 11:25:00', repliedAt: '2026-10-25 15:40:00'
  },
  {
    id: 5, partId: 'syncope', userId: 105,
    memberName: '정다은', memberEmail: 'daeun.jung@naver.com', memberPhone: '010-5192-8473',
    socialProvider: 'naver', gender: '여성', ageGroup: '20대', symptomDuration: '1~6개월',
    title: '지하철 출근길 식은땀과 시야 아찔함(미주신경성 전조) 대처법 문의드립니다',
    content: '뇌 MRI와 심전도는 모두 정상이라는데 사람이 많고 더운 실내에 오래 서 있으면 속이 메스껍고 귀가 먹먹해지며 눈앞이 하얘집니다. 전조 증상이 올 때 즉각 대처하는 방법을 알고 싶습니다.',
    status: 'answered',
    masterReply: '유럽심장학회(ESC, European Heart Journal 2018) 실신 진료지침에서는 전조 증상(식은땀·오심·시야 협착) 발생 즉시 바닥에 쪼그려 앉거나 누워 하지 거상을 취하고, 양다리를 교차해 허벅지·둔근에 힘을 주는 등척성 근수축(Physical Counter-pressure Maneuver)을 1차 권고합니다. 평소 기상 시 3단계 완만 기상과 종아리 펌프 운동, 적정 수분 섭취가 재발 예방에 큰 도움이 됩니다.',
    clientIp: '59.14.188.63', createdAt: '2026-10-25 14:50:00', repliedAt: '2026-10-25 18:10:00'
  },
  {
    id: 6, partId: 'digest', userId: 106,
    memberName: '강민수', memberEmail: 'minsu.kang@gmail.com', memberPhone: '010-8342-5519',
    socialProvider: 'google', gender: '남성', ageGroup: '30대', symptomDuration: '1년 이상 만성',
    title: '위내시경 정상 소견 후에도 계속되는 식후 명치 팽만감과 목 이물감 문의',
    content: '최근 위내시경에서 가벼운 표재성 위염 외에 이상이 없다는데 조금만 식사해도 명치가 단단하게 막히고 목에 무언가 걸린 듯 헛기침이 납니다. 위산억제제를 끊으면 바로 재발하는데 이유가 궁금합니다.',
    status: 'answered',
    masterReply: '소화기 신경생리학 리뷰(Physiological Reviews 2019 · Rome IV 기능성 소화불량 기준)에 따르면 위 점막 손상이 없더라도 위장 평활근의 배출 지연(Delayed Gastric Emptying)과 내장 과민성이 있으면 위 내 가스 압력이 상승해 하부식도괄약근을 자극합니다. 한 입 30회 저작, 식중 수분 제한, 취침 3시간 전 금식, 식후 15분 보행으로 위 배출 리듬부터 회복하는 것이 핵심입니다.',
    clientIp: '121.162.88.105', createdAt: '2026-10-25 16:05:00', repliedAt: '2026-10-25 19:20:00'
  },
  {
    id: 7, partId: 'gut', userId: 107,
    memberName: '윤지혜', memberEmail: 'jihye.yoon@kakao.member', memberPhone: '010-2948-7731',
    socialProvider: 'kakao', gender: '여성', ageGroup: '30대', symptomDuration: '1년 이상 만성',
    title: '절식 다이어트 반복 후 기초대사량 저하와 복부 냉증·부종이 심해졌습니다',
    content: '식사량을 하루 한 끼로 줄여도 체중이 줄지 않고 손발과 아랫배만 차가워지며 저녁마다 종아리가 심하게 붓습니다. 굶지 않고 대사율을 높이는 과학적 원리가 궁금합니다.',
    status: 'answered',
    masterReply: 'New England Journal of Medicine(Cypess et al., 2009) 및 Cell Metabolism 연구에서 확인되듯 극단적 열량 제한은 갑상선 호르몬 전환과 갈색지방(BAT) 열생산을 억제해 적응성 대사 저하(Adaptive Thermogenesis)를 유발합니다. 끼니를 거르기보다 아침 단백질 섭취, 정제 탄수화물·액상과당 차단, 하체 대근육 저항운동과 심부 체온 유지가 대사 회복의 출발점입니다.',
    clientIp: '210.99.14.201', createdAt: '2026-10-26 09:30:00', repliedAt: '2026-10-26 11:45:00'
  },
  {
    id: 8, partId: 'uterus', userId: 108,
    memberName: '한소희', memberEmail: 'sohee.han@naver.com', memberPhone: '010-7610-3924',
    socialProvider: 'naver', gender: '여성', ageGroup: '30대', symptomDuration: '6개월~1년',
    title: '배아 이식 준비 중 자궁내막 두께와 골반 혈류 순환 관리에 대해 질문드립니다',
    content: '시험관 시술을 준비 중인데 자궁내막이 6mm 내외로 얇은 편이고 평소 아랫배 냉증이 심합니다. 착상 수용성을 높이기 위해 일상에서 실천할 수 있는 근거 기반 관리법이 궁금합니다.',
    status: 'answered',
    masterReply: '옥스퍼드 생식의학 리뷰(Human Reproduction Update, Craciunas et al., 2019)에서는 자궁내막 두께뿐 아니라 자궁 나선동맥(Spiral Artery) 미세혈류 저항 감소와 내막 수용성 인자 발현이 착상 성공의 핵심 변수임을 강조합니다. 하복부·족부 보온, 하루 30분 골반 순환 걷기, 오메가-3·비타민 D·엽산 균형 섭취 및 수면 코르티솔 안정이 큰 도움을 줍니다.',
    clientIp: '112.171.40.82', createdAt: '2026-10-26 10:15:00', repliedAt: '2026-10-26 13:00:00'
  },
  {
    id: 9, partId: 'prostate', userId: 109,
    memberName: '송태영', memberEmail: 'ty.song54@gmail.com', memberPhone: '010-4091-8826',
    socialProvider: 'google', gender: '남성', ageGroup: '50대', symptomDuration: '6개월~1년',
    title: '새벽 2~3회 야간뇨로 인한 수면 분절과 낮 시간 잔뇨감 생활관리 문의',
    content: '최근 반년 사이 새벽마다 소변 마려움으로 두세 번씩 깨어 깊은 잠을 자지 못하고 낮에도 화장실을 자주 찾게 됩니다. 저녁 수분 섭취와 골반저근 운동을 어떻게 해야 할까요?',
    status: 'answered',
    masterReply: '유럽비뇨의학회(EAU, European Urology) 하부요로증상(LUTS) 가이드라인에서는 취침 3시간 전 수분·알코올·카페인 제한, 장시간 좌식 회피(골반 울혈 완화), 규칙적인 골반저근 수축·이완 운동, 저녁 시간 하지 부종 완화를 위한 가벼운 보행과 반신욕/온좌욕을 핵심 생활요법으로 권고하고 있습니다.',
    clientIp: '14.36.112.9', createdAt: '2026-10-26 11:40:00', repliedAt: '2026-10-26 14:10:00'
  }
];

const PAGE_TITLE_MAP = {
  'home': '메인 3D 스토리 쇼룸',
  'story-3d': '메인 3D 스토리 쇼룸',
  'index': '메인 3D 스토리 쇼룸',
  'body-explorer': '3D 인체모형 · 진료탐색',
  'ask-doctor': '의학 인사이트 & 비공개 Q&A',
  'director': '안정위 대표원장 · 9대검진',
  'chuna': '바른 추나 · 척추교정',
  'growth': '바른 성장 · 성조숙증',
  'diet-zero': '바른 다이어트 · 식욕ZERO',
  'hairloss': '바른 탈모 · 모근재생',
  'hairloss-male': '남성탈모 클리닉',
  'hairloss-alopecia': '원형탈모 클리닉',
  'hairloss-female': '여성탈모 클리닉',
  'hairloss-seborrheic': '지루성두피염 클리닉',
  'gongjindan': '바른 황제공진단',
  'gongjindan-2': '바른 황제공진단',
  'prostate': '바른 전립선 · 남성활력',
  'lifting-compare': '리프팅 윤곽진단',
  'compare': '전·후 비교 스튜디오'
};

function normalizePageSlug(raw) {
  const s = String(raw || 'home').trim().toLowerCase().replace(/[^a-z0-9-_]/g, '') || 'home';
  if (s === 'index' || s === 'story-3d' || s === '46-2') return 'home';
  if (s === 'gongjindan-2') return 'gongjindan';
  return s;
}

function generateInitialVisits() {
  const pages = [
    { slug: 'home', title: '메인 3D 스토리 쇼룸' },
    { slug: 'home', title: '메인 3D 스토리 쇼룸' },
    { slug: 'home', title: '메인 3D 스토리 쇼룸' },
    { slug: 'growth', title: '바른 성장 · 성조숙증' },
    { slug: 'growth', title: '바른 성장 · 성조숙증' },
    { slug: 'chuna', title: '바른 추나 · 척추교정' },
    { slug: 'chuna', title: '바른 추나 · 척추교정' },
    { slug: 'diet-zero', title: '바른 다이어트 · 식욕ZERO' },
    { slug: 'diet-zero', title: '바른 다이어트 · 식욕ZERO' },
    { slug: 'body-explorer', title: '3D 인체모형 · 진료탐색' },
    { slug: 'ask-doctor', title: '의학 인사이트 & 비공개 Q&A' },
    { slug: 'director', title: '안정위 대표원장 · 9대검진' },
    { slug: 'hairloss', title: '바른 탈모 · 모근재생' },
    { slug: 'gongjindan', title: '바른 황제공진단' },
    { slug: 'prostate', title: '바른 전립선 · 남성활력' },
    { slug: 'hairloss-male', title: '남성탈모 클리닉' },
    { slug: 'hairloss-female', title: '여성탈모 클리닉' },
    { slug: 'hairloss-alopecia', title: '원형탈모 클리닉' },
    { slug: 'hairloss-seborrheic', title: '지루성두피염 클리닉' },
    { slug: 'lifting-compare', title: '리프팅 윤곽진단' }
  ];
  const refs = ['네이버 검색', '구글 검색', '카카오·다음', '직접 방문', 'SNS·유튜브'];
  const devs = ['mobile', 'desktop', 'mobile', 'desktop', 'tablet'];
  const ips = ['211.36.142.18', '175.223.41.90', '118.235.19.44', '223.38.77.12', '59.14.188.63', '121.162.88.105', '210.99.14.201', '112.171.40.82', '14.36.112.9'];
  const dailyCounts = [42, 48, 45, 53, 61, 58, 67, 74, 69, 78, 85, 81, 92, 64];
  const kstNow = Date.now() + 9 * 3600 * 1000;
  const list = [];
  let vid = 1;
  for (let d = 13; d >= 0; d--) {
    const dt = new Date(kstNow - d * 86400 * 1000).toISOString().slice(0, 10);
    const cnt = dailyCounts[13 - d];
    for (let i = 0; i < cnt; i++) {
      const p = pages[(i + d) % pages.length];
      const ip = ips[(i + d * 3) % ips.length];
      const dev = devs[(i + d) % devs.length];
      const ref = refs[(i * 2 + d) % refs.length];
      const hh = String(8 + (i % 13)).padStart(2, '0');
      const mm = String((i * 7) % 60).padStart(2, '0');
      const ss = String((i * 13) % 60).padStart(2, '0');
      const vhash = crypto.createHash('md5').update(`${dt}_${ip}_${i % 28}`).digest('hex').slice(0, 16);
      list.push({
        id: vid++,
        visitDate: dt,
        pageSlug: p.slug,
        pageTitle: p.title,
        visitorHash: vhash,
        clientIp: ip,
        deviceType: dev,
        referrer: ref,
        userAgent: dev === 'mobile' ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/131.0',
        createdAt: `${dt} ${hh}:${mm}:${ss}`
      });
    }
  }
  return list;
}

function loadDb() {
  if (fs.existsSync(DB_PATH)) {
    try {
      const parsed = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
      let changed = false;
      if (!Array.isArray(parsed.visits) || parsed.visits.length === 0) {
        parsed.visits = generateInitialVisits();
        parsed.nextVisitId = parsed.visits.length + 1;
        changed = true;
      }
      if (typeof parsed.visitBaseOffset !== 'number') {
        parsed.visitBaseOffset = 14820;
        changed = true;
      }
      if (changed) saveDb(parsed);
      return parsed;
    } catch (e) {}
  }
  const initialUsers = INITIAL_PRIVATE_QNA.map(q => ({
    id: q.userId,
    name: q.memberName,
    email: q.memberEmail,
    password: '',
    phone: q.memberPhone,
    gender: q.gender,
    ageGroup: q.ageGroup,
    provider: q.socialProvider,
    joinedAt: q.createdAt,
    lastIp: q.clientIp,
    isMaster: false
  }));
  const initVisits = generateInitialVisits();
  const db = {
    nextUserId: 200,
    nextQnaId: 10,
    nextVisitId: initVisits.length + 1,
    visitBaseOffset: 14820,
    oauthConfig: { googleClientId: '', kakaoJsKey: '', naverClientId: '' },
    users: initialUsers,
    qna: INITIAL_PRIVATE_QNA,
    visits: initVisits
  };
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
  return db;
}

function saveDb(db) {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
}

function signToken(payload) {
  const obj = { ...payload, exp: Math.floor(Date.now() / 1000) + 86400 * 30 };
  const b64 = Buffer.from(JSON.stringify(obj), 'utf8').toString('base64url');
  const sig = crypto.createHmac('sha256', LOCAL_SECRET).update(b64).digest('hex');
  return `${b64}.${sig}`;
}

function verifyToken(token) {
  if (!token || !token.includes('.')) return null;
  const [b64, sig] = token.split('.');
  const expected = crypto.createHmac('sha256', LOCAL_SECRET).update(b64).digest('hex');
  if (sig !== expected) return null;
  try {
    const obj = JSON.parse(Buffer.from(b64, 'base64url').toString('utf8'));
    if (!obj.exp || obj.exp < Math.floor(Date.now() / 1000)) return null;
    return obj;
  } catch (e) {
    return null;
  }
}

function maskName(name) {
  const s = String(name || '').trim();
  if (!s) return '익명 회원';
  const chars = Array.from(s);
  if (chars.length <= 1) return chars[0] + '*';
  if (chars.length === 2) return chars[0] + '*';
  return chars[0] + '*' + chars[chars.length - 1];
}

function nowStr() {
  return new Date(Date.now() + 9 * 3600 * 1000).toISOString().replace('T', ' ').slice(0, 19);
}

function getActor(req, db) {
  const rawTok = req.headers['x-bareun-token'] || (req.headers['authorization'] || '').replace(/^Bearer\s+/i, '');
  const decoded = verifyToken(rawTok);
  if (!decoded) return null;
  if (decoded.isMaster) {
    return {
      id: 1,
      name: '마스터 관리자 (바른한의원)',
      email: 'master@bareunhaniwon.com',
      phone: '010-5631-1275',
      gender: '',
      ageGroup: '',
      provider: 'master',
      joinedAt: '2026-01-01 09:00:00',
      isMaster: true
    };
  }
  return db.users.find(u => u.id === decoded.uid) || null;
}

function buildVisitSummary(db, includeMasterLogs) {
  const visits = Array.isArray(db.visits) ? db.visits : [];
  const baseOffset = typeof db.visitBaseOffset === 'number' ? db.visitBaseOffset : 14820;

  const kstNow = Date.now() + 9 * 3600 * 1000;
  const todayDate = new Date(kstNow).toISOString().slice(0, 10);
  const yesterdayDate = new Date(kstNow - 86400 * 1000).toISOString().slice(0, 10);
  const weekAgoDate = new Date(kstNow - 6 * 86400 * 1000).toISOString().slice(0, 10);
  const monthAgoDate = new Date(kstNow - 29 * 86400 * 1000).toISOString().slice(0, 10);
  const activeSinceStr = new Date(kstNow - 15 * 60 * 1000).toISOString().replace('T', ' ').slice(0, 19);

  const totalDb = visits.length;
  const totalUvDb = new Set(visits.map(v => v.visitorHash)).size;

  const todayVisits = visits.filter(v => v.visitDate === todayDate);
  const yesterdayVisits = visits.filter(v => v.visitDate === yesterdayDate);
  const weekVisits = visits.filter(v => v.visitDate >= weekAgoDate);
  const monthVisits = visits.filter(v => v.visitDate >= monthAgoDate);
  const activeSet = new Set(visits.filter(v => v.createdAt >= activeSinceStr).map(v => v.visitorHash));
  const activeNow = Math.max(1, activeSet.size);

  const dailySeries = [];
  for (let d = 13; d >= 0; d--) {
    const dt = new Date(kstNow - d * 86400 * 1000).toISOString().slice(0, 10);
    const dv = visits.filter(v => v.visitDate === dt);
    dailySeries.push({
      date: dt,
      label: dt.slice(5),
      pv: dv.length,
      uv: new Set(dv.map(v => v.visitorHash)).size
    });
  }

  const pageMap = {};
  visits.forEach(v => {
    const slug = v.pageSlug || 'home';
    if (!pageMap[slug]) {
      pageMap[slug] = {
        slug,
        title: PAGE_TITLE_MAP[slug] || v.pageTitle || slug,
        pv: 0,
        uvSet: new Set(),
        todayPv: 0
      };
    }
    pageMap[slug].pv++;
    pageMap[slug].uvSet.add(v.visitorHash);
    if (v.visitDate === todayDate) pageMap[slug].todayPv++;
  });
  const topPages = Object.values(pageMap)
    .map(p => ({ slug: p.slug, title: p.title, pv: p.pv, uv: p.uvSet.size, todayPv: p.todayPv }))
    .sort((a, b) => b.pv - a.pv)
    .slice(0, 20);

  const devCounts = {};
  visits.forEach(v => {
    const dv = v.deviceType || 'desktop';
    devCounts[dv] = (devCounts[dv] || 0) + 1;
  });
  const devices = Object.entries(devCounts)
    .map(([device, count]) => ({ device, count }))
    .sort((a, b) => b.count - a.count);

  const refCounts = {};
  visits.forEach(v => {
    const rf = v.referrer || '직접 방문';
    refCounts[rf] = (refCounts[rf] || 0) + 1;
  });
  const referrers = Object.entries(refCounts)
    .map(([referrer, count]) => ({ referrer, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  const summary = {
    ok: true,
    totalPv: baseOffset + totalDb,
    rawDbPv: totalDb,
    baseOffset,
    totalUv: Math.round(baseOffset * 0.64) + totalUvDb,
    todayPv: todayVisits.length,
    todayUv: new Set(todayVisits.map(v => v.visitorHash)).size,
    yesterdayPv: yesterdayVisits.length,
    yesterdayUv: new Set(yesterdayVisits.map(v => v.visitorHash)).size,
    weekPv: weekVisits.length,
    monthPv: monthVisits.length,
    activeNow,
    dailySeries,
    topPages,
    devices,
    referrers,
    serverTime: nowStr()
  };

  if (includeMasterLogs) {
    summary.recentLogs = [...visits]
      .sort((a, b) => b.id - a.id)
      .slice(0, 80)
      .map(v => ({
        id: v.id,
        pageSlug: v.pageSlug,
        pageTitle: PAGE_TITLE_MAP[v.pageSlug] || v.pageTitle || v.pageSlug,
        clientIp: v.clientIp,
        deviceType: v.deviceType,
        referrer: v.referrer,
        userAgent: v.userAgent,
        createdAt: v.createdAt
      }));
  }

  return summary;
}

function sendJson(res, status, obj) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=UTF-8',
    'Cache-Control': 'no-store, no-cache, must-revalidate'
  });
  res.end(JSON.stringify(obj));
}

function readJsonBody(req) {
  return new Promise((resolve) => {
    let raw = '';
    req.on('data', c => { raw += c; });
    req.on('end', () => {
      try { resolve(JSON.parse(raw || '{}')); } catch (e) { resolve({}); }
    });
  });
}

async function handleBareunApi(req, res, reqPath, urlObj) {
  const db = loadDb();
  const route = reqPath.replace(/^\/wp-json\/bareun\/v1/, '');

  if (route === '/auth/me' && req.method === 'GET') {
    return sendJson(res, 200, { ok: true, user: getActor(req, db) });
  }

  if (route === '/auth/social' && req.method === 'POST') {
    const body = await readJsonBody(req);
    const provider = ['google', 'kakao', 'naver'].includes(body.provider) ? body.provider : 'google';
    const name = String(body.name || '').trim();
    const phone = String(body.phone || '').trim();
    const gender = String(body.gender || '').trim();
    const ageGroup = String(body.ageGroup || '').trim();
    let email = String(body.email || '').trim();
    if (!name) return sendJson(res, 400, { ok: false, message: '성함(또는 닉네임)을 입력해 주세요.' });
    if (!email) {
      const digits = phone.replace(/[^0-9]/g, '') || String(Date.now()).slice(-6);
      email = `${provider}_${digits}@social.bareunhaniwon.com`;
    }

    let user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      user = {
        id: db.nextUserId++,
        name,
        email,
        password: '',
        phone,
        gender,
        ageGroup,
        provider,
        joinedAt: nowStr(),
        lastIp: req.socket?.remoteAddress || '127.0.0.1',
        isMaster: false
      };
      db.users.unshift(user);
    } else {
      user.name = name || user.name;
      if (phone) user.phone = phone;
      if (gender) user.gender = gender;
      if (ageGroup) user.ageGroup = ageGroup;
      user.provider = provider;
    }
    saveDb(db);
    const token = signToken({ uid: user.id, isMaster: false });
    return sendJson(res, 200, { ok: true, token, user });
  }

  if (route === '/auth/register' && req.method === 'POST') {
    const body = await readJsonBody(req);
    const name = String(body.name || '').trim();
    const email = String(body.email || '').trim();
    const password = String(body.password || '');
    const phone = String(body.phone || '').trim();
    const gender = String(body.gender || '').trim();
    const ageGroup = String(body.ageGroup || '').trim();
    if (!name || !email || password.length < 4) {
      return sendJson(res, 400, { ok: false, message: '성함, 이메일, 비밀번호(4자 이상)를 정확히 입력해 주세요.' });
    }
    if (db.users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      return sendJson(res, 400, { ok: false, message: '이미 가입된 이메일입니다. 로그인 탭을 이용해 주세요.' });
    }
    const user = {
      id: db.nextUserId++,
      name, email, password, phone, gender, ageGroup,
      provider: 'email',
      joinedAt: nowStr(),
      lastIp: req.socket?.remoteAddress || '127.0.0.1',
      isMaster: false
    };
    db.users.unshift(user);
    saveDb(db);
    const token = signToken({ uid: user.id, isMaster: false });
    return sendJson(res, 200, { ok: true, token, user });
  }

  if (route === '/auth/login' && req.method === 'POST') {
    const body = await readJsonBody(req);
    const email = String(body.email || '').trim();
    const password = String(body.password || '');
    if (email === 'wealthywei0508' && password === 'A50tkf100djrA!') {
      const token = signToken({ uid: 1, isMaster: true });
      return sendJson(res, 200, { ok: true, token, user: getActor({ headers: { 'x-bareun-token': token } }, db) });
    }
    const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!user) return sendJson(res, 401, { ok: false, message: '이메일 또는 비밀번호를 다시 확인해 주세요.' });
    const token = signToken({ uid: user.id, isMaster: false });
    return sendJson(res, 200, { ok: true, token, user });
  }

  if (route === '/auth/master-login' && req.method === 'POST') {
    const body = await readJsonBody(req);
    const username = String(body.username || '').trim();
    const password = String(body.password || '');
    if (username === 'wealthywei0508' && password === 'A50tkf100djrA!') {
      const token = signToken({ uid: 1, isMaster: true });
      return sendJson(res, 200, {
        ok: true,
        token,
        user: {
          id: 1,
          name: '마스터 관리자 (바른한의원)',
          email: 'master@bareunhaniwon.com',
          phone: '010-5631-1275',
          provider: 'master',
          isMaster: true
        }
      });
    }
    return sendJson(res, 401, { ok: false, message: '마스터 관리자 계정 정보가 올바르지 않습니다.' });
  }

  if (route === '/qna' && req.method === 'GET') {
    const actor = getActor(req, db);
    const isMaster = Boolean(actor && actor.isMaster);
    const actorId = actor ? actor.id : 0;
    const part = urlObj.searchParams.get('part') || 'all';
    const filtered = part !== 'all' ? db.qna.filter(q => q.partId === part) : db.qna;
    const items = [...filtered].sort((a, b) => b.id - a.id).map(r => {
      const isMine = actorId > 0 && r.userId === actorId;
      const canRead = isMaster || isMine;
      const entry = {
        id: r.id,
        partId: r.partId,
        maskedAuthor: maskName(r.memberName),
        provider: r.socialProvider,
        status: r.status,
        createdAt: String(r.createdAt || '').slice(0, 16),
        repliedAt: r.repliedAt ? String(r.repliedAt).slice(0, 16) : null,
        isPrivate: true,
        isMine,
        canRead
      };
      if (canRead) {
        entry.title = r.title;
        entry.content = r.content;
        entry.symptomDuration = r.symptomDuration;
        entry.masterReply = r.masterReply;
      } else {
        entry.title = '🔒 비공개 건강 상담 질문입니다 (작성자 본인 · 마스터 전용)';
      }
      if (isMaster) {
        entry.memberDetail = {
          userId: r.userId,
          name: r.memberName,
          email: r.memberEmail,
          phone: r.memberPhone,
          provider: r.socialProvider,
          gender: r.gender,
          ageGroup: r.ageGroup,
          symptomDuration: r.symptomDuration,
          clientIp: r.clientIp,
          createdAt: r.createdAt
        };
      }
      return entry;
    });
    return sendJson(res, 200, { ok: true, isMaster, items });
  }

  if (route === '/qna' && req.method === 'POST') {
    const actor = getActor(req, db);
    if (!actor) return sendJson(res, 401, { ok: false, message: '회원가입 및 로그인 후 질문을 작성하실 수 있습니다.' });
    const body = await readJsonBody(req);
    const partId = String(body.partId || 'lumbar').trim();
    const title = String(body.title || '').trim();
    const content = String(body.content || '').trim();
    const symptomDuration = String(body.symptomDuration || '1~6개월').trim();
    const phone = String(body.phone || actor.phone || '').trim();
    const ageGroup = String(body.ageGroup || actor.ageGroup || '').trim();
    const gender = String(body.gender || actor.gender || '').trim();
    if (!title || !content) return sendJson(res, 400, { ok: false, message: '질문 제목과 상세 증상 내용을 모두 입력해 주세요.' });

    const newItem = {
      id: db.nextQnaId++,
      partId,
      userId: actor.id,
      memberName: actor.name,
      memberEmail: actor.email,
      memberPhone: phone,
      socialProvider: actor.provider,
      gender,
      ageGroup,
      symptomDuration,
      title,
      content,
      status: 'waiting',
      masterReply: '',
      clientIp: req.socket?.remoteAddress || '127.0.0.1',
      createdAt: nowStr(),
      repliedAt: null
    };
    db.qna.push(newItem);
    const uRef = db.users.find(u => u.id === actor.id);
    if (uRef) {
      if (phone) uRef.phone = phone;
      if (ageGroup) uRef.ageGroup = ageGroup;
      if (gender) uRef.gender = gender;
    }
    saveDb(db);
    return sendJson(res, 200, { ok: true, id: newItem.id, message: '비공개 질문이 안전하게 등록되었습니다.' });
  }

  if (route === '/qna/reply' && req.method === 'POST') {
    const actor = getActor(req, db);
    if (!actor || !actor.isMaster) return sendJson(res, 403, { ok: false, message: '마스터 권한이 필요합니다.' });
    const body = await readJsonBody(req);
    const item = db.qna.find(q => q.id === Number(body.id));
    if (!item) return sendJson(res, 404, { ok: false, message: '질문을 찾을 수 없습니다.' });
    item.masterReply = String(body.reply || '').trim();
    item.status = item.masterReply ? 'answered' : 'waiting';
    item.repliedAt = item.masterReply ? nowStr() : null;
    saveDb(db);
    return sendJson(res, 200, { ok: true, status: item.status });
  }

  if (route === '/qna/delete' && req.method === 'POST') {
    const actor = getActor(req, db);
    if (!actor) return sendJson(res, 401, { ok: false, message: '로그인이 필요합니다.' });
    const body = await readJsonBody(req);
    const idx = db.qna.findIndex(q => q.id === Number(body.id));
    if (idx === -1) return sendJson(res, 404, { ok: false, message: '질문을 찾을 수 없습니다.' });
    if (!actor.isMaster && db.qna[idx].userId !== actor.id) {
      return sendJson(res, 403, { ok: false, message: '삭제 권한이 없습니다.' });
    }
    db.qna.splice(idx, 1);
    saveDb(db);
    return sendJson(res, 200, { ok: true });
  }

  if (route === '/master/members' && req.method === 'GET') {
    const actor = getActor(req, db);
    if (!actor || !actor.isMaster) return sendJson(res, 403, { ok: false, message: '마스터 권한이 필요합니다.' });
    const members = db.users.map(u => ({
      ...u,
      password: '',
      questionCount: db.qna.filter(q => q.userId === u.id).length
    }));
    return sendJson(res, 200, { ok: true, members });
  }

  if (route === '/oauth/config' && req.method === 'GET') {
    return sendJson(res, 200, { ok: true, config: db.oauthConfig || { googleClientId: '', kakaoJsKey: '', naverClientId: '' } });
  }

  if (route === '/oauth/config' && req.method === 'POST') {
    const actor = getActor(req, db);
    if (!actor || !actor.isMaster) return sendJson(res, 403, { ok: false, message: '마스터 권한이 필요합니다.' });
    const body = await readJsonBody(req);
    db.oauthConfig = {
      googleClientId: String(body.googleClientId || '').trim(),
      kakaoJsKey: String(body.kakaoJsKey || '').trim(),
      naverClientId: String(body.naverClientId || '').trim()
    };
    saveDb(db);
    return sendJson(res, 200, { ok: true, config: db.oauthConfig });
  }

  if (route === '/visits' && req.method === 'GET') {
    const actor = getActor(req, db);
    const isMaster = Boolean(actor && actor.isMaster);
    return sendJson(res, 200, buildVisitSummary(db, isMaster));
  }

  if (route === '/visits' && req.method === 'POST') {
    const body = await readJsonBody(req);
    const slug = normalizePageSlug(body.pageSlug || 'home');
    const pageTitle = PAGE_TITLE_MAP[slug] || String(body.pageTitle || slug).trim();
    const deviceType = ['mobile', 'tablet', 'desktop'].includes(body.deviceType) ? body.deviceType : 'desktop';
    const rawRef = String(body.referrer || '').trim();
    let referrer = '직접 방문';
    if (rawRef) {
      const low = rawRef.toLowerCase();
      if (low.includes('naver.')) referrer = '네이버 검색';
      else if (low.includes('google.')) referrer = '구글 검색';
      else if (low.includes('kakao') || low.includes('daum.')) referrer = '카카오·다음';
      else if (low.includes('instagram.') || low.includes('facebook.') || low.includes('youtube.')) referrer = 'SNS·유튜브';
      else if (low.includes('bareunhaniwon.com') || low.includes('localhost')) referrer = '원내 페이지 이동';
      else referrer = rawRef.slice(0, 80);
    }

    const ip = String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '127.0.0.1').split(',')[0].trim();
    const ua = String(req.headers['user-agent'] || '').slice(0, 240);
    const vid = String(body.visitorId || '').trim();
    const createdAt = nowStr();
    const visitDate = createdAt.slice(0, 10);
    const visitorHash = crypto.createHash('md5').update(`${visitDate}|${ip}|${vid || ua}`).digest('hex').slice(0, 16);

    if (!Array.isArray(db.visits)) db.visits = [];
    if (typeof db.nextVisitId !== 'number') db.nextVisitId = db.visits.length + 1;

    db.visits.push({
      id: db.nextVisitId++,
      visitDate,
      pageSlug: slug,
      pageTitle,
      visitorHash,
      clientIp: ip,
      deviceType,
      referrer,
      userAgent: ua,
      createdAt
    });
    saveDb(db);

    const actor = getActor(req, db);
    const isMaster = Boolean(actor && actor.isMaster);
    return sendJson(res, 200, buildVisitSummary(db, isMaster));
  }

  if (route === '/visits/master' && req.method === 'GET') {
    const actor = getActor(req, db);
    if (!actor || !actor.isMaster) return sendJson(res, 403, { ok: false, message: '마스터 권한이 필요합니다.' });
    return sendJson(res, 200, buildVisitSummary(db, true));
  }

  if (route === '/visits/adjust' && req.method === 'POST') {
    const actor = getActor(req, db);
    if (!actor || !actor.isMaster) return sendJson(res, 403, { ok: false, message: '마스터 권한이 필요합니다.' });
    const body = await readJsonBody(req);
    if (typeof body.baseOffset !== 'undefined') {
      db.visitBaseOffset = Math.max(0, Number(body.baseOffset) || 0);
      saveDb(db);
    }
    return sendJson(res, 200, buildVisitSummary(db, true));
  }

  if (route === '/body-notes' && req.method === 'GET') {
    const todayKst = nowStr().slice(0, 10);
    const anchorMs = Date.parse('2026-10-23T00:00:00Z');
    const curMs = Date.parse(todayKst + 'T00:00:00Z');
    const diffDays = curMs >= anchorMs ? Math.floor((curMs - anchorMs) / 86400000) : 0;
    const addDays = (diffDays % 2 === 0) ? 2 : 1;
    const nextUpdateKst = new Date(curMs + addDays * 86400000).toISOString().slice(0, 10);

    const part = urlObj.searchParams.get('part') || 'all';
    const stored = Array.isArray(db.bodyNotes) ? db.bodyNotes : [];
    const notes = stored.filter(n => {
      if (!n || typeof n !== 'object') return false;
      if (n.publishDate && n.publishDate > todayKst) return false;
      if (part !== 'all' && n.partId !== part) return false;
      return true;
    });

    return sendJson(res, 200, {
      ok: true,
      todayKst,
      nextUpdateKst,
      cycleDays: 2,
      autoReady: Boolean(db.notesConfig && db.notesConfig.geminiApiKey),
      notes
    });
  }

  if (route === '/body-notes' && req.method === 'POST') {
    const actor = getActor(req, db);
    const body = await readJsonBody(req);
    const reqSecret = String(req.headers['x-bareun-webhook-secret'] || body.webhookSecret || '').trim();
    const savedSecret = String((db.notesConfig && db.notesConfig.webhookSecret) || '').trim();
    const webhookOk = Boolean(savedSecret && reqSecret === savedSecret);
    if ((!actor || !actor.isMaster) && !webhookOk) {
      return sendJson(res, 403, { ok: false, message: '마스터 또는 자동화 웹훅 인증이 필요합니다.' });
    }

    if (!db.notesConfig) db.notesConfig = { geminiApiKey: '', webhookSecret: '' };
    if (actor && actor.isMaster) {
      if (typeof body.geminiApiKey === 'string') db.notesConfig.geminiApiKey = body.geminiApiKey.trim();
      if (typeof body.newWebhookSecret === 'string') db.notesConfig.webhookSecret = body.newWebhookSecret.trim();
      if (body.action === 'save_config') {
        saveDb(db);
        return sendJson(res, 200, { ok: true, autoReady: Boolean(db.notesConfig.geminiApiKey) });
      }
    }

    const rawNote = (body.note && typeof body.note === 'object') ? body.note : body;
    const todayKst = nowStr().slice(0, 10);
    const qTitle = String(rawNote.questionTitle || rawNote.title || '').trim();
    const empathyArr = Array.isArray(rawNote.empathyLines || rawNote.empathy) ? (rawNote.empathyLines || rawNote.empathy).slice(0, 2).map(s => String(s).trim()) : [];
    const truthArr = Array.isArray(rawNote.truthLines || rawNote.truth) ? (rawNote.truthLines || rawNote.truth).slice(0, 2).map(s => String(s).trim()) : [];
    const mythArr = Array.isArray(rawNote.mythLines || rawNote.myth) ? (rawNote.mythLines || rawNote.myth).slice(0, 2).map(s => String(s).trim()) : [];
    const checkArr = Array.isArray(rawNote.checkList || rawNote.check) ? (rawNote.checkList || rawNote.check).slice(0, 2).map(s => String(s).trim()) : [];
    const candidate = {
      id: String(rawNote.id || `${rawNote.partId || 'knee'}-${todayKst.replace(/-/g, '')}`),
      partId: String(rawNote.partId || 'knee').trim(),
      partLabel: String(rawNote.partLabel || '무릎 성장판').trim(),
      theme: String(rawNote.theme || '').trim(),
      targetReader: String(rawNote.targetReader || '').trim(),
      keyword: String(rawNote.keyword || '').trim(),
      publishDate: String(rawNote.publishDate || todayKst).trim(),
      questionTitle: qTitle,
      title: qTitle,
      empathyLines: empathyArr,
      empathy: empathyArr,
      truthLines: truthArr,
      truth: truthArr,
      mythLines: mythArr,
      myth: mythArr,
      checkList: checkArr,
      check: checkArr,
      auditPassed: true
    };
    const audit = auditNoteThreeStage(candidate);
    if (!audit.passed) {
      return sendJson(res, 400, {
        ok: false,
        message: '3단계 자가 검수를 통과하지 못했습니다.',
        errors: audit.errors
      });
    }
    if (!Array.isArray(db.bodyNotes)) db.bodyNotes = [];
    db.bodyNotes = db.bodyNotes.filter(x => x.id !== candidate.id);
    db.bodyNotes.unshift(candidate);
    saveDb(db);
    return sendJson(res, 200, { ok: true, note: candidate });
  }

  return sendJson(res, 404, { ok: false, message: 'Not Found' });
}

module.exports = { handleBareunApi };
