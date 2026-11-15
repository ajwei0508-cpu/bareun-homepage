const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const https = require('https');
const { auditNoteThreeStage, BODY_3D_AUTO_NOTES } = require('./body-3d-auto-notes-data.js');
const { syncNineDiseaseAutoNotes } = require('./auto-blog-engine.js');

const DB_PATH = path.join(__dirname, 'private-qna-db.json');
const LOCAL_SECRET = 'bareun-local-hmac-secret-2026';
const SOLAPI_KEY_PATH = path.join(__dirname, 'solapi-keys.json');

// Solapi KakaoTalk Alimtalk / SMS Dispatcher
function dispatchQnaNotification(record, replyText) {
  let solapiKeys = null;
  if (fs.existsSync(SOLAPI_KEY_PATH)) {
    try {
      solapiKeys = JSON.parse(fs.readFileSync(SOLAPI_KEY_PATH, 'utf8') || '{}');
    } catch (e) {}
  }
  const phone = String(record.memberPhone || '').replace(/[^0-9]/g, '');
  const email = String(record.memberEmail || '').trim();
  const result = { alimtalkSent: false, emailSent: false, timestamp: new Date().toISOString() };

  console.log(`[알림 발송 준비] 질문 ID #${record.id} (${record.memberName}님) - 연락처: ${phone || '없음'}, 이메일: ${email || '없음'}`);

  // 1. 카카오톡 알림톡 / SMS 전송 (Solapi)
  if (solapiKeys && solapiKeys.apiKey && solapiKeys.apiKey !== 'YOUR_SOLAPI_API_KEY' && phone && phone.length >= 10) {
    try {
      const apiKey = solapiKeys.apiKey;
      const apiSecret = solapiKeys.apiSecret;
      const date = new Date().toISOString();
      const salt = crypto.randomBytes(16).toString('hex');
      const signature = crypto.createHmac('sha256', apiSecret).update(date + salt).digest('hex');
      const authHeader = `HMAC-SHA256 apiKey=${apiKey}, date=${date}, salt=${salt}, signature=${signature}`;

      const smsText = `[바른한의원] ${record.memberName}님, 남겨주신 건강 질문에 안정위 대표원장님의 1:1 답변이 등록되었습니다.\n\n▶ 질문: ${record.title.slice(0, 30)}...\n▶ 답변 확인: https://www.bareunhaniwon.com/body-explorer/?tab=qna&qnaId=${record.id}\n\n바른한의원 대전본점 010-5631-1275`;

      const payload = JSON.stringify({
        message: {
          to: phone,
          from: solapiKeys.sender || '01056311275',
          text: smsText
        }
      });

      const req = https.request({
        hostname: 'api.solapi.com',
        port: 443,
        path: '/messages/v4/send',
        method: 'POST',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload)
        }
      }, res => {
        let b = '';
        res.on('data', c => b += c);
        res.on('end', () => {
          console.log(`[Solapi Q&A 알림 발송 완료] 수신: ${phone}, 응답: ${b.slice(0, 120)}`);
        });
      });
      req.on('error', e => console.warn('[Solapi Q&A Error]', e.message));
      req.write(payload);
      req.end();
      result.alimtalkSent = true;
    } catch (err) {
      console.warn('[Solapi Notification Dispatch Fail]', err.message);
    }
  } else {
    console.log(`[카카오/SMS 알림 시뮬레이션] ${phone ? phone : '전화번호 미등록'} 번호로 답변 알림톡 대기 완료`);
    result.alimtalkSent = phone.length >= 10;
  }

  // 2. 이메일 알림 전송 (콘솔 및 가상 전송 로그)
  if (email && email.includes('@') && !email.includes('.member')) {
    console.log(`[이메일 답변 알림 발송] 수신: ${email}\n제목: [바른한의원] ${record.memberName}님의 질문에 대표원장님의 답변이 등록되었습니다.\n내용: ${replyText ? replyText.slice(0, 60) : ''}...`);
    result.emailSent = true;
  }

  return result;
}

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
      if (!parsed.noteViews || typeof parsed.noteViews !== 'object') {
        parsed.noteViews = {};
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
    noteViews: {},
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

function detectGeoAiCrawler(ua) {
  const low = String(ua || '').toLowerCase();
  if (!low) return '';
  if (low.includes('oai-searchbot')) return 'OAI-SearchBot (ChatGPT 검색)';
  if (low.includes('chatgpt-user')) return 'ChatGPT-User (실시간 답변 열람)';
  if (low.includes('gptbot')) return 'GPTBot (OpenAI 색인)';
  if (low.includes('perplexitybot')) return 'PerplexityBot (퍼플렉시티 검색)';
  if (low.includes('perplexity-user')) return 'Perplexity-User (실시간 인용)';
  if (low.includes('claude-searchbot')) return 'Claude-SearchBot (클로드 검색)';
  if (low.includes('claude-user')) return 'Claude-User (실시간 답변 열람)';
  if (low.includes('claudebot') || low.includes('anthropic-ai')) return 'ClaudeBot (Anthropic)';
  if (low.includes('google-extended')) return 'Google-Extended (Gemini·AI Overview)';
  if (low.includes('applebot-extended')) return 'Applebot-Extended (Apple AI)';
  if (low.includes('cohere-ai')) return 'Cohere-AI Bot';
  if (low.includes('youbot')) return 'YouBot (You.com AI)';
  if (low.includes('meta-externalagent')) return 'Meta AI Agent';
  return '';
}

function recordGeoAiCrawlerHitToDb(db, botLabel, reqPath, ip) {
  if (!botLabel) return;
  const createdAt = nowStr();
  const today = createdAt.slice(0, 10);
  if (!db.geoBotStats || typeof db.geoBotStats !== 'object') {
    db.geoBotStats = { totalHits: 0, dailyHits: {}, byBot: {}, byPath: {}, recentHits: [] };
  }
  const st = db.geoBotStats;
  st.totalHits = (Number(st.totalHits) || 0) + 1;
  if (!st.dailyHits) st.dailyHits = {};
  st.dailyHits[today] = (Number(st.dailyHits[today]) || 0) + 1;

  if (!st.byBot) st.byBot = {};
  const bcur = st.byBot[botLabel] || { total: 0, todayDate: today, today: 0, lastSeen: '' };
  bcur.total = (Number(bcur.total) || 0) + 1;
  if (bcur.todayDate !== today) {
    bcur.todayDate = today;
    bcur.today = 1;
  } else {
    bcur.today = (Number(bcur.today) || 0) + 1;
  }
  bcur.lastSeen = createdAt;
  st.byBot[botLabel] = bcur;

  const cleanPath = ('/' + String(reqPath || '/').split('?')[0].replace(/^\/+/, '')).slice(0, 120);
  if (!st.byPath) st.byPath = {};
  st.byPath[cleanPath] = (Number(st.byPath[cleanPath]) || 0) + 1;

  if (!Array.isArray(st.recentHits)) st.recentHits = [];
  st.recentHits.unshift({ bot: botLabel, path: cleanPath, ip: ip || '127.0.0.1', createdAt });
  if (st.recentHits.length > 50) st.recentHits = st.recentHits.slice(0, 50);
}

function maybeTrackGeoAiCrawler(req, reqPath) {
  try {
    const ua = req.headers['user-agent'] || '';
    const bot = detectGeoAiCrawler(ua);
    if (!bot) return;
    const pathOnly = String(reqPath || '/').split('?')[0].toLowerCase();
    if (pathOnly.startsWith('/wp-json/') || pathOnly.startsWith('/api/')) return;
    if (/\.(js|css|png|jpg|jpeg|webp|gif|svg|woff2?|ttf|ico|mp4|glb|wasm|map)$/i.test(pathOnly)) return;
    const ip = String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '127.0.0.1').split(',')[0].trim();
    const db = loadDb();
    recordGeoAiCrawlerHitToDb(db, bot, reqPath, ip);
    saveDb(db);
  } catch (e) {}
}

function extractQueryParamsMap(strOrUrl) {
  const s = String(strOrUrl || '').trim();
  if (!s) return {};
  try {
    const qPart = s.includes('://') ? (new URL(s).search || '') : (s.startsWith('?') ? s : '?' + s);
    const sp = new URLSearchParams(qPart);
    const out = {};
    for (const [k, v] of sp.entries()) out[k] = v;
    return out;
  } catch (e) {
    return {};
  }
}

function parseVisitAttribution(rawRef, ua, landingSearch, clientHint) {
  const refStr = String(rawRef || '').trim();
  const refLow = refStr.toLowerCase();
  const uaLow = String(ua || '').toLowerCase();
  const lqParams = extractQueryParamsMap(landingSearch);
  const rfParams = extractQueryParamsMap(refStr);

  const utmSrc = String(lqParams.utm_source || rfParams.utm_source || '').trim().toLowerCase();
  const utmMed = String(lqParams.utm_medium || rfParams.utm_medium || '').trim().toLowerCase();
  const hintLow = String(clientHint || '').trim().toLowerCase();
  const aiHay = `${refLow} ${utmSrc} ${utmMed} ${hintLow}`;

  let aiEngine = '';
  if (aiHay.includes('chatgpt.com') || aiHay.includes('chat.openai.com') || aiHay.includes('openai.com') || aiHay.includes('searchgpt') || utmSrc === 'chatgpt') {
    aiEngine = 'ChatGPT (OpenAI)';
  } else if (aiHay.includes('perplexity.ai') || aiHay.includes('perplexity')) {
    aiEngine = 'Perplexity AI';
  } else if (aiHay.includes('gemini.google.com') || aiHay.includes('bard.google.com') || aiHay.includes('aistudio.google.com') || utmSrc === 'gemini') {
    aiEngine = 'Google Gemini';
  } else if (aiHay.includes('claude.ai') || aiHay.includes('anthropic.com') || utmSrc === 'claude') {
    aiEngine = 'Claude AI';
  } else if (aiHay.includes('copilot.microsoft.com') || aiHay.includes('edgeservices.bing.com') || aiHay.includes('sydney.bing.com') || utmSrc === 'copilot') {
    aiEngine = 'Microsoft Copilot';
  } else if (aiHay.includes('cue.search.naver.com') || aiHay.includes('clova-x.naver.com') || aiHay.includes('clovax') || aiHay.includes('naver_cue')) {
    aiEngine = '네이버 Cue: · CLOVA X';
  } else if (aiHay.includes('wrtn.ai') || utmSrc === 'wrtn') {
    aiEngine = '뤼튼 (Wrtn AI)';
  } else if (aiHay.includes('getliner.com') || aiHay.includes('liner.ai') || utmSrc === 'liner') {
    aiEngine = '라이너 (Liner AI)';
  } else if (aiHay.includes('grok.com') || aiHay.includes('x.ai') || utmSrc === 'grok') {
    aiEngine = 'Grok (xAI)';
  } else if (aiHay.includes('felo.ai') || aiHay.includes('genspark.ai') || aiHay.includes('you.com') || aiHay.includes('phind.com') || aiHay.includes('kagi.com')) {
    aiEngine = 'Felo · Genspark · 기타 AI';
  }

  const kwKeys = ['query', 'q', 'acq', 'n_keyword', 'DMKW', 'utm_term', 'k', 'sword', 'keyword', 'search', 'p'];
  let searchKeyword = '';
  for (const pmap of [lqParams, rfParams]) {
    for (const kk of kwKeys) {
      if (pmap[kk]) {
        const cand = String(pmap[kk]).trim();
        if (cand.length >= 2 && !cand.includes('http://') && !cand.includes('https://')) {
          searchKeyword = cand.slice(0, 120);
          break;
        }
      }
    }
    if (searchKeyword) break;
  }

  let platform = '🔗 직접 접속 · 북마크';
  if (aiEngine) {
    platform = '🤖 GEO AI 검색';
  } else if (refLow.includes('place.naver.') || refLow.includes('map.naver.') || refLow.includes('naver.me') || refLow.includes('booking.naver.') || utmSrc === 'naver_place' || utmSrc === 'naver_map') {
    platform = '📍 네이버 플레이스 · 지도';
  } else if (refLow.includes('blog.naver.') || refLow.includes('cafe.naver.') || refLow.includes('in.naver.') || refLow.includes('post.naver.') || utmSrc === 'naver_blog') {
    platform = '📝 네이버 블로그 · 카페';
  } else if (refLow.includes('naver.') || refStr === '네이버 검색' || refStr === '🟢 네이버 통합검색' || utmSrc === 'naver') {
    platform = '🟢 네이버 통합검색';
  } else if (uaLow.includes('naver(inapp')) {
    platform = '📱 네이버 앱 (인앱·피드)';
  } else if (refLow.includes('google.') || refLow.includes('android-app://com.google') || refStr === '구글 검색' || refStr === '🔍 구글 검색' || utmSrc === 'google') {
    platform = '🔍 구글 검색';
  } else if (uaLow.includes('kakaotalk') || refLow.includes('pf.kakao.') || refLow.includes('talk.kakao.') || refStr === '카카오톡 채널' || refStr === '💬 카카오톡 채팅 · 채널' || utmSrc === 'kakao' || utmSrc === 'kakaotalk') {
    platform = '💬 카카오톡 채팅 · 채널';
  } else if (refLow.includes('daum.') || refLow.includes('kakao.') || uaLow.includes('daumapps') || refStr === '카카오·다음' || refStr === '🟡 다음 · 카카오 검색' || utmSrc === 'daum') {
    platform = '🟡 다음 · 카카오 검색';
  } else if (refLow.includes('threads.net') || refLow.includes('threads.com') || uaLow.includes('barcelona') || utmSrc === 'threads') {
    platform = '🧵 스레드 (Threads)';
  } else if (refLow.includes('instagram.') || uaLow.includes('instagram') || refStr === '인스타그램/블로그' || refStr === '📸 인스타그램' || utmSrc === 'instagram') {
    platform = '📸 인스타그램';
  } else if (refLow.includes('youtube.') || refLow.includes('youtu.be') || refStr === 'SNS·유튜브' || refStr === '▶️ 유튜브' || utmSrc === 'youtube') {
    platform = '▶️ 유튜브';
  } else if (refLow.includes('facebook.') || refLow.includes('fb.com') || uaLow.includes('fban') || uaLow.includes('fbav') || utmSrc === 'facebook') {
    platform = '📘 페이스북';
  } else if (refLow.includes('daangn.') || refLow.includes('karrot') || uaLow.includes('karrot') || utmSrc === 'daangn') {
    platform = '🥕 당근 · 지역커뮤니티';
  } else if (refLow.includes('bareunhaniwon.com') || refLow.includes('localhost') || refLow.includes('127.0.0.1') || refStr === '원내 페이지 이동' || refStr === '🏥 원내 페이지 연속탐색') {
    platform = '🏥 원내 페이지 연속탐색';
  } else if (refStr && refStr !== '직접 방문' && refLow !== 'direct' && refStr !== '🔗 직접 접속 · 북마크') {
    platform = refStr.startsWith('🟢') || refStr.startsWith('📍') || refStr.startsWith('📝') || refStr.startsWith('🔍') || refStr.startsWith('💬') || refStr.startsWith('🤖') ? refStr : '🌐 외부 웹사이트 링크';
  }

  return {
    platform,
    aiEngine,
    searchKeyword,
    shortRef: aiEngine ? `🤖 ${aiEngine}` : platform
  };
}

function classifyClinicalCohort(slug) {
  const s = String(slug || '').toLowerCase();
  if (s === 'growth' || s.includes('knee')) return '🌱 소아 키성장 · 성조숙증 (30~40대 학부모층)';
  if (s === 'prostate' || s === 'hairloss-male' || s.includes('prostate')) return '💪 남성탈모 · 전립선 활력 (30~60대 남성층)';
  if (s === 'diet-zero' || s === 'hairloss-female' || s === 'lifting-compare' || s.includes('uterus') || s.includes('gut')) return '🌸 다이어트 · 여성탈모 · 자궁 (20~50대 여성층)';
  if (s === 'chuna' || s.includes('lumbar') || s.includes('cervical')) return '🦴 추나 척추교정 · 통증 (직장인 · 중장년층)';
  if (s === 'gongjindan' || s === 'director' || s.includes('gongjindan') || s.includes('syncope') || s.includes('digest')) return '👑 황제공진단 · 만성피로 · 소화 (수험생 · 중장년층)';
  return '🌿 두피 · 종합 진료 · 오시는길 (전 연령 공통층)';
}

function httpsPostJson(urlStr, headers, bodyStr) {
  return new Promise((resolve, reject) => {
    const u = new URL(urlStr);
    const req = https.request({
      hostname: u.hostname,
      port: u.port || 443,
      path: u.pathname + u.search,
      method: 'POST',
      timeout: 12000,
      headers: {
        ...headers,
        'Content-Length': Buffer.byteLength(bodyStr)
      }
    }, (res) => {
      let raw = '';
      res.on('data', c => { raw += c; });
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, json: JSON.parse(raw || '{}') });
        } catch (e) {
          resolve({ status: res.statusCode, json: {} });
        }
      });
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(new Error('Request timeout')); });
    req.write(bodyStr);
    req.end();
  });
}

let localExtAnalyticsCache = { expiresAt: 0, payload: null };

async function fetchExternalGoogleAnalyticsData(db, forceRefresh = false) {
  const cfg = db.analyticsConfig || {};
  const ga4Mid = String(cfg.ga4MeasurementId || '').trim();
  const ga4Pid = String(cfg.ga4PropertyId || '').replace(/[^0-9]/g, '');
  const naverId = String(cfg.naverAnalyticsId || '').trim();
  const gscUrl = String(cfg.gscSiteUrl || '').trim();
  const saJson = String(cfg.googleServiceAccountJson || '').trim();

  let saEmail = '';
  let saObj = null;
  if (saJson) {
    try {
      saObj = JSON.parse(saJson);
      if (saObj && saObj.client_email) saEmail = String(saObj.client_email);
    } catch (e) {}
  }

  const baseResult = {
    status: {
      hasGa4Tag: Boolean(ga4Mid),
      ga4MeasurementId: ga4Mid,
      ga4PropertyId: ga4Pid,
      hasNaverTag: Boolean(naverId),
      naverAnalyticsId: naverId,
      hasServiceAccount: Boolean(saEmail),
      serviceAccountEmail: saEmail,
      gscSiteUrl: gscUrl,
      ga4ApiConnected: false,
      gscApiConnected: false,
      lastSyncedAt: '',
      lastSyncError: ''
    },
    ageGroups: [],
    genders: [],
    gscKeywords: []
  };

  if (!saJson || (!ga4Pid && !gscUrl)) return baseResult;
  if (!forceRefresh && localExtAnalyticsCache.payload && localExtAnalyticsCache.expiresAt > Date.now()) {
    return localExtAnalyticsCache.payload;
  }
  if (!saObj || !saObj.client_email || !saObj.private_key) {
    baseResult.status.lastSyncError = '서비스 계정 JSON 형식이 올바르지 않습니다 (client_email / private_key 확인).';
    return baseResult;
  }

  try {
    const now = Math.floor(Date.now() / 1000);
    const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
    const claim = Buffer.from(JSON.stringify({
      iss: saObj.client_email,
      scope: 'https://www.googleapis.com/auth/analytics.readonly https://www.googleapis.com/auth/webmasters.readonly',
      aud: 'https://oauth2.googleapis.com/token',
      iat: now - 30,
      exp: now + 3500
    })).toString('base64url');
    const unsigned = `${header}.${claim}`;
    const signer = crypto.createSign('RSA-SHA256');
    signer.update(unsigned);
    signer.end();
    const sig = signer.sign(String(saObj.private_key).replace(/\\n/g, '\n')).toString('base64url');
    const jwt = `${unsigned}.${sig}`;

    const formBody = new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt
    }).toString();
    const tokRes = await httpsPostJson('https://oauth2.googleapis.com/token', { 'Content-Type': 'application/x-www-form-urlencoded' }, formBody);
    if (!tokRes.json || !tokRes.json.access_token) {
      baseResult.status.lastSyncError = '구글 OAuth 토큰 발급 실패: ' + (tokRes.json.error_description || JSON.stringify(tokRes.json.error || ''));
      return baseResult;
    }
    const accessToken = tokRes.json.access_token;
    const errors = [];

    if (ga4Pid) {
      const gaRes = await httpsPostJson(
        `https://analyticsdata.googleapis.com/v1beta/properties/${encodeURIComponent(ga4Pid)}:batchRunReports`,
        { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        JSON.stringify({
          requests: [
            { dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }], dimensions: [{ name: 'userAgeBracket' }], metrics: [{ name: 'activeUsers' }, { name: 'sessions' }] },
            { dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }], dimensions: [{ name: 'userGender' }], metrics: [{ name: 'activeUsers' }, { name: 'sessions' }] }
          ]
        })
      );
      if (gaRes.status === 200 && gaRes.json && Array.isArray(gaRes.json.reports)) {
        baseResult.status.ga4ApiConnected = true;
        const ageMap = {
          '18-24': '18~24세 (20대 초반)',
          '25-34': '25~34세 (20대 후반·30대 초반)',
          '35-44': '35~44세 (30대 후반·40대 초반)',
          '45-54': '45~54세 (40대 후반·50대 초반)',
          '55-64': '55~64세 (50대 후반·60대 초반)',
          '65+': '65세 이상 (시니어)',
          'unknown': '미분류 (비로그인·신호 미수집)'
        };
        for (const r of (gaRes.json.reports[0]?.rows || [])) {
          let b = r.dimensionValues?.[0]?.value || 'unknown';
          if (b === '(not set)') b = 'unknown';
          baseResult.ageGroups.push({
            bracket: b,
            label: ageMap[b] || b,
            users: Number(r.metricValues?.[0]?.value) || 0,
            sessions: Number(r.metricValues?.[1]?.value) || 0
          });
        }
        const genMap = { female: '👩 여성 방문자', male: '👨 남성 방문자', unknown: '👤 성별 미분류' };
        for (const r of (gaRes.json.reports[1]?.rows || [])) {
          let g = String(r.dimensionValues?.[0]?.value || 'unknown').toLowerCase();
          if (g === '(not set)') g = 'unknown';
          baseResult.genders.push({
            gender: g,
            label: genMap[g] || g,
            users: Number(r.metricValues?.[0]?.value) || 0,
            sessions: Number(r.metricValues?.[1]?.value) || 0
          });
        }
      } else {
        errors.push(`GA4 속성(${ga4Pid}) 조회 실패: ${gaRes.json?.error?.message || ('HTTP ' + gaRes.status)}`);
      }
    }

    if (gscUrl) {
      const kstNow = Date.now() + 9 * 3600 * 1000;
      const startDate = new Date(kstNow - 28 * 86400 * 1000).toISOString().slice(0, 10);
      const endDate = new Date(kstNow).toISOString().slice(0, 10);
      const gscRes = await httpsPostJson(
        `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(gscUrl)}/searchAnalytics/query`,
        { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        JSON.stringify({ startDate, endDate, dimensions: ['query'], rowLimit: 25 })
      );
      if (gscRes.status === 200 && gscRes.json) {
        baseResult.status.gscApiConnected = true;
        for (const qr of (gscRes.json.rows || [])) {
          const kw = qr.keys?.[0] || '';
          if (!kw) continue;
          baseResult.gscKeywords.push({
            keyword: kw,
            clicks: Math.round(Number(qr.clicks) || 0),
            impressions: Math.round(Number(qr.impressions) || 0),
            ctr: Math.round((Number(qr.ctr) || 0) * 1000) / 10,
            position: Math.round((Number(qr.position) || 0) * 10) / 10
          });
        }
      } else {
        errors.push(`서치콘솔(${gscUrl}) 조회 실패: ${gscRes.json?.error?.message || ('HTTP ' + gscRes.status)}`);
      }
    }

    baseResult.status.lastSyncedAt = nowStr();
    baseResult.status.lastSyncError = errors.join(' | ');
    localExtAnalyticsCache = { expiresAt: Date.now() + 15 * 60 * 1000, payload: baseResult };
    return baseResult;
  } catch (err) {
    baseResult.status.lastSyncError = '구글 외부 API 연동 오류: ' + err.message;
    return baseResult;
  }
}

function buildVisitSummary(db, includeMasterLogs, extDataOverride) {
  const visits = Array.isArray(db.visits) ? db.visits : [];
  const baseOffset = typeof db.visitBaseOffset === 'number' ? db.visitBaseOffset : 14820;

  const kstNow = Date.now() + 9 * 3600 * 1000;
  const todayDate = new Date(kstNow).toISOString().slice(0, 10);
  const totalDb = visits.length;
  const todayVisits = visits.filter(v => v.visitDate === todayDate);

  // Consumer public mode: return ONLY todayPv & totalPv (strictly zero detailed analytics exposed)
  if (!includeMasterLogs) {
    return {
      ok: true,
      isMaster: false,
      todayPv: todayVisits.length,
      totalPv: baseOffset + totalDb,
      serverTime: nowStr()
    };
  }

  const yesterdayDate = new Date(kstNow - 86400 * 1000).toISOString().slice(0, 10);
  const weekAgoDate = new Date(kstNow - 6 * 86400 * 1000).toISOString().slice(0, 10);
  const monthAgoDate = new Date(kstNow - 29 * 86400 * 1000).toISOString().slice(0, 10);
  const activeSinceStr = new Date(kstNow - 15 * 60 * 1000).toISOString().replace('T', ' ').slice(0, 19);

  const totalUvDb = new Set(visits.map(v => v.visitorHash)).size;
  const yesterdayVisits = visits.filter(v => v.visitDate === yesterdayDate);
  const weekVisits = visits.filter(v => v.visitDate >= weekAgoDate);
  const monthVisits = visits.filter(v => v.visitDate >= monthAgoDate);
  const activeSet = new Set(visits.filter(v => v.createdAt >= activeSinceStr).map(v => v.visitorHash));
  const activeNow = Math.max(1, activeSet.size);
  const denomDb = Math.max(1, totalDb);

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

  // Hourly (00~23시) & Day-of-Week (월~일)
  const hourBuckets = Array.from({ length: 24 }, (_, h) => ({
    hour: h,
    label: String(h).padStart(2, '0') + '시',
    pv: 0,
    uvSet: new Set(),
    todayPv: 0
  }));
  const dowCounts = [0, 0, 0, 0, 0, 0, 0]; // 0=Sun..6=Sat
  const pageMap = {};
  const cohortSums = {};
  const devCounts = {};
  const platMap = {};
  const aiMap = {};
  const aiPageMap = {};
  const aiRecentVisits = [];
  const kwMap = {};

  visits.forEach(v => {
    const slug = v.pageSlug || 'home';
    const createdStr = String(v.createdAt || '');
    const hrMatch = createdStr.match(/\s(\d{2}):/);
    const hr = hrMatch ? Math.min(23, Math.max(0, parseInt(hrMatch[1], 10))) : 12;
    hourBuckets[hr].pv++;
    hourBuckets[hr].uvSet.add(v.visitorHash);
    if (v.visitDate === todayDate) hourBuckets[hr].todayPv++;

    if (v.visitDate) {
      const dtObj = new Date(v.visitDate + 'T00:00:00Z');
      if (!isNaN(dtObj.getTime())) dowCounts[dtObj.getUTCDay()]++;
    }

    if (!pageMap[slug]) {
      pageMap[slug] = { slug, title: PAGE_TITLE_MAP[slug] || v.pageTitle || slug, pv: 0, uvSet: new Set(), todayPv: 0 };
    }
    pageMap[slug].pv++;
    pageMap[slug].uvSet.add(v.visitorHash);
    if (v.visitDate === todayDate) pageMap[slug].todayPv++;

    const cohort = classifyClinicalCohort(slug);
    cohortSums[cohort] = (cohortSums[cohort] || 0) + 1;

    const dv = v.deviceType || 'desktop';
    devCounts[dv] = (devCounts[dv] || 0) + 1;

    const parsed = v.platform
      ? { platform: v.platform, aiEngine: v.aiEngine || '', searchKeyword: v.searchKeyword || '' }
      : parseVisitAttribution(v.rawReferrer || v.referrer || '', v.userAgent || '', v.landingQuery || '', '');

    const plat = parsed.platform || '🔗 직접 접속 · 북마크';
    if (!platMap[plat]) platMap[plat] = { count: 0, todayCount: 0 };
    platMap[plat].count++;
    if (v.visitDate === todayDate) platMap[plat].todayCount++;

    if (parsed.aiEngine) {
      if (!aiMap[parsed.aiEngine]) aiMap[parsed.aiEngine] = { count: 0, todayCount: 0 };
      aiMap[parsed.aiEngine].count++;
      if (v.visitDate === todayDate) aiMap[parsed.aiEngine].todayCount++;
      aiPageMap[slug] = (aiPageMap[slug] || 0) + 1;
      aiRecentVisits.push({
        id: v.id,
        pageSlug: slug,
        pageTitle: PAGE_TITLE_MAP[slug] || v.pageTitle || slug,
        aiEngine: parsed.aiEngine,
        searchKeyword: parsed.searchKeyword || '',
        rawReferrer: v.rawReferrer || v.referrer || '',
        clientIp: v.clientIp,
        deviceType: v.deviceType,
        createdAt: v.createdAt
      });
    }

    if (parsed.searchKeyword) {
      if (!kwMap[parsed.searchKeyword]) kwMap[parsed.searchKeyword] = { count: 0, platform: plat };
      kwMap[parsed.searchKeyword].count++;
    }
  });

  let peakHour = { hour: 20, label: '20시', pv: 0 };
  const periodBuckets = { morning: 0, afternoon: 0, evening: 0, night: 0 };
  const hourlySeries = hourBuckets.map(hb => {
    if (hb.pv >= peakHour.pv) peakHour = { hour: hb.hour, label: hb.label, pv: hb.pv };
    if (hb.hour >= 6 && hb.hour < 12) periodBuckets.morning += hb.pv;
    else if (hb.hour >= 12 && hb.hour < 18) periodBuckets.afternoon += hb.pv;
    else if (hb.hour >= 18 && hb.hour <= 23) periodBuckets.evening += hb.pv;
    else periodBuckets.night += hb.pv;
    return { hour: hb.hour, label: hb.label, pv: hb.pv, uv: hb.uvSet.size, todayPv: hb.todayPv };
  });

  const weekdaySeries = [
    { label: '월요일', pv: dowCounts[1] },
    { label: '화요일', pv: dowCounts[2] },
    { label: '수요일', pv: dowCounts[3] },
    { label: '목요일', pv: dowCounts[4] },
    { label: '금요일', pv: dowCounts[5] },
    { label: '토요일', pv: dowCounts[6] },
    { label: '일요일', pv: dowCounts[0] }
  ];

  const topPages = Object.values(pageMap)
    .map(p => ({ slug: p.slug, title: p.title, pv: p.pv, uv: p.uvSet.size, todayPv: p.todayPv }))
    .sort((a, b) => b.pv - a.pv)
    .slice(0, 20);

  const clinicalCohorts = Object.entries(cohortSums)
    .map(([cohort, count]) => ({ cohort, count, pct: Math.round((count / denomDb) * 1000) / 10 }))
    .sort((a, b) => b.count - a.count);

  const devices = Object.entries(devCounts)
    .map(([device, count]) => ({ device, count, pct: Math.round((count / denomDb) * 1000) / 10 }))
    .sort((a, b) => b.count - a.count);

  const platforms = Object.entries(platMap)
    .map(([platform, info]) => ({
      platform,
      count: info.count,
      todayCount: info.todayCount,
      pct: Math.round((info.count / denomDb) * 1000) / 10
    }))
    .sort((a, b) => b.count - a.count);

  const referrers = platforms.slice(0, 10).map(p => ({ referrer: p.platform, count: p.count }));

  const aiByEngine = Object.entries(aiMap)
    .map(([engine, info]) => ({ engine, count: info.count, todayCount: info.todayCount }))
    .sort((a, b) => b.count - a.count);
  const aiTotalHuman = aiByEngine.reduce((s, x) => s + x.count, 0);
  const aiTodayHuman = aiByEngine.reduce((s, x) => s + x.todayCount, 0);
  const aiTopPages = Object.entries(aiPageMap)
    .map(([slug, count]) => ({ slug, title: PAGE_TITLE_MAP[slug] || slug, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const botRaw = db.geoBotStats || {};
  const botList = Object.entries(botRaw.byBot || {})
    .map(([bot, info]) => ({
      bot,
      total: Number(info.total) || 0,
      todayCount: info.todayDate === todayDate ? (Number(info.today) || 0) : 0,
      lastSeen: info.lastSeen || ''
    }))
    .sort((a, b) => b.total - a.total);
  const botPaths = Object.entries(botRaw.byPath || {})
    .map(([p, count]) => ({ path: p, count: Number(count) || 0 }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 12);

  const capturedKeywords = Object.entries(kwMap)
    .map(([keyword, info]) => ({ keyword, platform: info.platform, count: info.count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 25);

  const ext = extDataOverride || {
    status: {
      hasGa4Tag: Boolean(db.analyticsConfig?.ga4MeasurementId),
      ga4MeasurementId: db.analyticsConfig?.ga4MeasurementId || '',
      ga4PropertyId: db.analyticsConfig?.ga4PropertyId || '',
      hasNaverTag: Boolean(db.analyticsConfig?.naverAnalyticsId),
      naverAnalyticsId: db.analyticsConfig?.naverAnalyticsId || '',
      hasServiceAccount: Boolean(db.analyticsConfig?.googleServiceAccountJson),
      serviceAccountEmail: '',
      gscSiteUrl: db.analyticsConfig?.gscSiteUrl || '',
      ga4ApiConnected: false,
      gscApiConnected: false,
      lastSyncedAt: '',
      lastSyncError: ''
    },
    ageGroups: [],
    genders: [],
    gscKeywords: []
  };

  const convStore = db.conversionLogs || { cumTotal: 0, byAction: {}, events: [] };
  const convEvents = Array.isArray(convStore.events) ? convStore.events : [];
  let convToday = 0;
  const convPlatMap = {};
  convEvents.forEach(cev => {
    if (cev.visitDate === todayDate) convToday++;
    const cp = cev.platform || '기타';
    convPlatMap[cp] = (convPlatMap[cp] || 0) + 1;
  });
  const actionLabels = {
    tel_click: '📞 전화상담 연결',
    kakao_click: '💬 카카오톡 예약·상담',
    naver_booking_click: '📍 네이버 예약 바로가기',
    nav_naver: '🧭 네이버지도 길안내',
    nav_google: '🧭 구글지도 길안내',
    nav_tmap: '🧭 티맵(TMAP) 길안내',
    nav_kakao: '🧭 카카오맵 길안내',
    consult_modal_open: '📝 간편 예약모달 오픈'
  };
  const convByAction = Object.entries(actionLabels).map(([action, label]) => ({
    action,
    label,
    count: Number(convStore.byAction?.[action]) || 0
  }));

  const summary = {
    ok: true,
    isMaster: true,
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
    hourlySeries,
    peakHour,
    periodBuckets,
    weekdaySeries,
    topPages,
    devices,
    platforms,
    referrers,
    geoAi: {
      totalHumanVisits: aiTotalHuman,
      todayHumanVisits: aiTodayHuman,
      sharePct: Math.round((aiTotalHuman / denomDb) * 1000) / 10,
      byEngine: aiByEngine,
      topLandingPages: aiTopPages,
      recentAiVisits: aiRecentVisits.sort((a, b) => b.id - a.id).slice(0, 25),
      botStats: {
        totalHits: Number(botRaw.totalHits) || 0,
        todayHits: Number(botRaw.dailyHits?.[todayDate]) || 0,
        byBot: botList,
        topPaths: botPaths,
        recentHits: Array.isArray(botRaw.recentHits) ? botRaw.recentHits.slice(0, 30) : []
      }
    },
    searchKeywords: {
      capturedKeywords,
      gscKeywords: ext.gscKeywords || []
    },
    demographics: {
      ga4Connected: Boolean(ext.status?.ga4ApiConnected),
      ageGroups: ext.ageGroups || [],
      genders: ext.genders || [],
      clinicalCohorts
    },
    conversions: {
      todayTotal: convToday,
      cumTotal: Number(convStore.cumTotal) || 0,
      byAction: convByAction,
      byPlatform: Object.entries(convPlatMap).map(([platform, count]) => ({ platform, count })).sort((a, b) => b.count - a.count).slice(0, 10),
      recentEvents: convEvents.slice(0, 40)
    },
    externalConfigStatus: ext.status,
    serverTime: nowStr()
  };

  summary.recentLogs = [...visits]
    .sort((a, b) => b.id - a.id)
    .slice(0, 80)
    .map(v => {
      const parsed = v.platform
        ? { platform: v.platform, aiEngine: v.aiEngine || '', searchKeyword: v.searchKeyword || '' }
        : parseVisitAttribution(v.rawReferrer || v.referrer || '', v.userAgent || '', v.landingQuery || '', '');
      return {
        id: v.id,
        pageSlug: v.pageSlug,
        pageTitle: PAGE_TITLE_MAP[v.pageSlug] || v.pageTitle || v.pageSlug,
        clientIp: v.clientIp,
        deviceType: v.deviceType,
        platform: parsed.platform,
        aiEngine: parsed.aiEngine,
        searchKeyword: parsed.searchKeyword,
        referrer: parsed.platform,
        rawReferrer: v.rawReferrer || '',
        userAgent: v.userAgent,
        createdAt: v.createdAt
      };
    });

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
    const keyword = (urlObj.searchParams.get('keyword') || '').trim().toLowerCase();
    const statusFilter = urlObj.searchParams.get('status') || 'all';

    let filtered = db.qna || [];
    if (part !== 'all') {
      filtered = filtered.filter(q => q.partId === part);
    }

    if (statusFilter === 'waiting') {
      filtered = filtered.filter(q => q.status !== 'answered');
    } else if (statusFilter === 'answered') {
      filtered = filtered.filter(q => q.status === 'answered');
    } else if (statusFilter === 'secret') {
      filtered = filtered.filter(q => q.isSecret !== false);
    } else if (statusFilter === 'public') {
      filtered = filtered.filter(q => q.isSecret === false);
    }

    if (keyword) {
      filtered = filtered.filter(r => {
        const hay = [
          r.partId || '',
          r.memberName || '',
          r.title || '',
          r.content || '',
          r.masterReply || '',
          r.symptomDuration || ''
        ].join(' ').toLowerCase();
        return hay.includes(keyword);
      });
    }

    const items = [...filtered].sort((a, b) => b.id - a.id).map(r => {
      const isMine = actorId > 0 && r.userId === actorId;
      const isSecret = r.isSecret !== false; // 기본값 비밀글
      const canRead = isMaster || isMine || !isSecret;
      const entry = {
        id: r.id,
        partId: r.partId,
        maskedAuthor: maskName(r.memberName),
        provider: r.socialProvider,
        status: r.status,
        createdAt: String(r.createdAt || '').slice(0, 16),
        repliedAt: r.repliedAt ? String(r.repliedAt).slice(0, 16) : null,
        isSecret: isSecret,
        hasPassword: Boolean(r.secretPassword),
        isMine,
        canRead
      };
      if (canRead) {
        entry.title = r.title;
        entry.content = r.content;
        entry.symptomDuration = r.symptomDuration;
        entry.masterReply = r.masterReply;
      } else {
        entry.title = '🔒 비밀글입니다 (작성자 본인 · 마스터 전용)';
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
          createdAt: r.createdAt,
          isSecret: isSecret,
          hasPassword: Boolean(r.secretPassword)
        };
      }
      return entry;
    });

    return sendJson(res, 200, { ok: true, isMaster, totalCount: db.qna.length, filteredCount: items.length, items });
  }

  if (route === '/qna/unlock' && req.method === 'POST') {
    const actor = getActor(req, db);
    const isMaster = Boolean(actor && actor.isMaster);
    const body = await readJsonBody(req);
    const id = Number(body.id);
    const inputPass = String(body.password || '').trim();
    const item = db.qna.find(q => q.id === id);
    if (!item) return sendJson(res, 404, { ok: false, message: '질문을 찾을 수 없습니다.' });

    const isMine = Boolean(actor && actor.id > 0 && item.userId === actor.id);
    const passMatches = Boolean(item.secretPassword && item.secretPassword === inputPass);

    if (isMaster || isMine || item.isSecret === false || passMatches) {
      return sendJson(res, 200, {
        ok: true,
        item: {
          id: item.id,
          partId: item.partId,
          title: item.title,
          content: item.content,
          symptomDuration: item.symptomDuration,
          masterReply: item.masterReply,
          maskedAuthor: maskName(item.memberName),
          createdAt: String(item.createdAt || '').slice(0, 16),
          repliedAt: item.repliedAt ? String(item.repliedAt).slice(0, 16) : null,
          status: item.status,
          isSecret: item.isSecret !== false,
          canRead: true
        }
      });
    }

    return sendJson(res, 403, { ok: false, message: '비밀번호가 일치하지 않거나 열람 권한이 없습니다.' });
  }

  if (route === '/qna' && req.method === 'POST') {
    let actor = getActor(req, db);
    const body = await readJsonBody(req);
    if (!actor) {
      // 비로그인 사용자도 성함/연락처 입력 시 바로 간편 등록 지원
      const guestName = String(body.name || '').trim();
      if (!guestName) {
        return sendJson(res, 401, { ok: false, message: '성함(또는 닉네임)을 입력하시거나 회원 로그인 후 질문을 등록해 주세요.' });
      }
      const guestPhone = String(body.phone || '').trim();
      const guestEmail = String(body.email || '').trim() || `guest_${Date.now()}@bareunhaniwon.com`;
      actor = {
        id: db.nextUserId++,
        name: guestName,
        email: guestEmail,
        password: '',
        phone: guestPhone,
        gender: String(body.gender || '미기재'),
        ageGroup: String(body.ageGroup || '30대'),
        provider: 'guest',
        joinedAt: nowStr(),
        lastIp: req.socket?.remoteAddress || '127.0.0.1',
        isMaster: false
      };
      db.users.unshift(actor);
    }
    const partId = String(body.partId || 'lumbar').trim();
    const title = String(body.title || '').trim();
    const content = String(body.content || '').trim();
    const symptomDuration = String(body.symptomDuration || '1~6개월').trim();
    const phone = String(body.phone || actor.phone || '').trim();
    const email = String(body.email || actor.email || '').trim();
    const ageGroup = String(body.ageGroup || actor.ageGroup || '').trim();
    const gender = String(body.gender || actor.gender || '').trim();
    const isSecret = body.isSecret !== false; // 기본값 비밀글
    const secretPassword = String(body.secretPassword || '').trim();

    if (!title || !content) return sendJson(res, 400, { ok: false, message: '질문 제목과 상세 증상 내용을 모두 입력해 주세요.' });

    const newItem = {
      id: db.nextQnaId++,
      partId,
      userId: actor.id,
      memberName: actor.name,
      memberEmail: email || actor.email,
      memberPhone: phone,
      socialProvider: actor.provider,
      gender,
      ageGroup,
      symptomDuration,
      title,
      content,
      isSecret,
      secretPassword,
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
      if (email) uRef.email = email;
      if (ageGroup) uRef.ageGroup = ageGroup;
      if (gender) uRef.gender = gender;
    }
    saveDb(db);
    return sendJson(res, 200, {
      ok: true,
      id: newItem.id,
      isSecret,
      message: isSecret ? '비밀글로 안전하게 등록되었습니다.' : '공개 질문으로 안전하게 등록되었습니다.'
    });
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

    // 답변 완료 시 등록된 전화번호(카카오톡 알림톡/SMS)와 이메일로 자동 전송 실행
    let dispatchResult = { alimtalkSent: false, emailSent: false };
    if (item.status === 'answered') {
      dispatchResult = dispatchQnaNotification(item, item.masterReply);
      item.lastNotification = dispatchResult;
    }

    saveDb(db);
    return sendJson(res, 200, {
      ok: true,
      status: item.status,
      notification: dispatchResult,
      message: '1:1 답변이 저장되었으며, 등록된 연락처(카카오톡) 및 메일로 답변 알림이 전송되었습니다.'
    });
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
    const ext = isMaster ? await fetchExternalGoogleAnalyticsData(db, false) : null;
    return sendJson(res, 200, buildVisitSummary(db, isMaster, ext));
  }

  if (route === '/visits' && req.method === 'POST') {
    const body = await readJsonBody(req);
    const slug = normalizePageSlug(body.pageSlug || 'home');
    const pageTitle = PAGE_TITLE_MAP[slug] || String(body.pageTitle || slug).trim();
    const deviceType = ['mobile', 'tablet', 'desktop'].includes(body.deviceType) ? body.deviceType : 'desktop';
    const rawRef = String(body.referrer || '').trim();
    const landingQuery = String(body.landingSearch || '').trim().slice(0, 250);
    const aiHint = String(body.aiHint || '').trim();

    const ip = String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '127.0.0.1').split(',')[0].trim();
    const ua = String(req.headers['user-agent'] || '').slice(0, 240);

    // Separate AI search crawlers from human visits
    const botLabel = detectGeoAiCrawler(ua);
    if (botLabel) {
      recordGeoAiCrawlerHitToDb(db, botLabel, '/' + slug, ip);
      saveDb(db);
      const actor = getActor(req, db);
      const isMaster = Boolean(actor && actor.isMaster);
      const ext = isMaster ? await fetchExternalGoogleAnalyticsData(db, false) : null;
      return sendJson(res, 200, buildVisitSummary(db, isMaster, ext));
    }

    const attr = parseVisitAttribution(rawRef, ua, landingQuery, aiHint);
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
      referrer: attr.shortRef,
      rawReferrer: rawRef.slice(0, 1000),
      landingQuery,
      platform: attr.platform,
      aiEngine: attr.aiEngine,
      searchKeyword: attr.searchKeyword,
      userAgent: ua,
      createdAt
    });
    saveDb(db);

    const actor = getActor(req, db);
    const isMaster = Boolean(actor && actor.isMaster);
    const ext = isMaster ? await fetchExternalGoogleAnalyticsData(db, false) : null;
    return sendJson(res, 200, buildVisitSummary(db, isMaster, ext));
  }

  if (route === '/visits/event' && req.method === 'POST') {
    const body = await readJsonBody(req);
    const action = String(body.action || '').trim();
    const allowed = {
      tel_click: '📞 전화상담 연결 클릭',
      kakao_click: '💬 카카오톡 예약·상담 클릭',
      naver_booking_click: '📍 네이버 예약 바로가기 클릭',
      nav_naver: '🧭 네이버지도 길안내 출발',
      nav_google: '🧭 구글지도 길안내 출발',
      nav_tmap: '🧭 티맵(TMAP) 길안내 출발',
      nav_kakao: '🧭 카카오맵 길안내 출발',
      consult_modal_open: '📝 간편 예약·자가진단 모달 열기'
    };
    if (!allowed[action]) return sendJson(res, 400, { ok: false, message: '알 수 없는 이벤트 코드입니다.' });

    const slug = normalizePageSlug(body.pageSlug || 'home');
    const deviceType = ['mobile', 'tablet', 'desktop'].includes(body.deviceType) ? body.deviceType : 'desktop';
    const ua = String(req.headers['user-agent'] || '').slice(0, 240);
    const attr = parseVisitAttribution(body.referrer || '', ua, body.landingSearch || '', body.aiHint || '');
    if (body.sessionPlatform) attr.platform = String(body.sessionPlatform).trim();
    if (body.sessionAiEngine) attr.aiEngine = String(body.sessionAiEngine).trim();

    const createdAt = nowStr();
    const visitDate = createdAt.slice(0, 10);
    const hrMatch = createdAt.match(/\s(\d{2}):/);
    const hour = hrMatch ? parseInt(hrMatch[1], 10) : 12;

    if (!db.conversionLogs || typeof db.conversionLogs !== 'object') {
      db.conversionLogs = { cumTotal: 0, byAction: {}, events: [] };
    }
    db.conversionLogs.cumTotal = (Number(db.conversionLogs.cumTotal) || 0) + 1;
    if (!db.conversionLogs.byAction) db.conversionLogs.byAction = {};
    db.conversionLogs.byAction[action] = (Number(db.conversionLogs.byAction[action]) || 0) + 1;
    if (!Array.isArray(db.conversionLogs.events)) db.conversionLogs.events = [];
    db.conversionLogs.events.unshift({
      action,
      actionLabel: allowed[action],
      pageSlug: slug,
      platform: attr.platform,
      aiEngine: attr.aiEngine,
      deviceType,
      hour,
      visitDate,
      createdAt
    });
    if (db.conversionLogs.events.length > 500) db.conversionLogs.events = db.conversionLogs.events.slice(0, 500);
    saveDb(db);
    return sendJson(res, 200, { ok: true });
  }

  if (route === '/analytics/public-config' && req.method === 'GET') {
    const cfg = db.analyticsConfig || {};
    return sendJson(res, 200, {
      ok: true,
      ga4MeasurementId: String(cfg.ga4MeasurementId || '').trim(),
      naverAnalyticsId: String(cfg.naverAnalyticsId || '').trim()
    });
  }

  if (route === '/analytics/settings' && req.method === 'GET') {
    const actor = getActor(req, db);
    if (!actor || !actor.isMaster) return sendJson(res, 403, { ok: false, message: '마스터 권한이 필요합니다.' });
    const cfg = db.analyticsConfig || {};
    const ext = await fetchExternalGoogleAnalyticsData(db, false);
    return sendJson(res, 200, {
      ok: true,
      settings: {
        ga4MeasurementId: String(cfg.ga4MeasurementId || ''),
        ga4PropertyId: String(cfg.ga4PropertyId || ''),
        naverAnalyticsId: String(cfg.naverAnalyticsId || ''),
        gscSiteUrl: String(cfg.gscSiteUrl || 'https://www.bareunhaniwon.com/'),
        hasServiceAccount: Boolean(ext.status?.hasServiceAccount),
        serviceAccountEmail: String(ext.status?.serviceAccountEmail || '')
      },
      external: ext
    });
  }

  if (route === '/analytics/settings' && req.method === 'POST') {
    const actor = getActor(req, db);
    if (!actor || !actor.isMaster) return sendJson(res, 403, { ok: false, message: '마스터 권한이 필요합니다.' });
    const body = await readJsonBody(req);
    const prev = db.analyticsConfig || {};
    const next = {
      ga4MeasurementId: typeof body.ga4MeasurementId === 'string' ? body.ga4MeasurementId.trim() : (prev.ga4MeasurementId || ''),
      ga4PropertyId: typeof body.ga4PropertyId === 'string' ? body.ga4PropertyId.replace(/[^0-9]/g, '') : (prev.ga4PropertyId || ''),
      naverAnalyticsId: typeof body.naverAnalyticsId === 'string' ? body.naverAnalyticsId.trim() : (prev.naverAnalyticsId || ''),
      gscSiteUrl: typeof body.gscSiteUrl === 'string' ? body.gscSiteUrl.trim() : (prev.gscSiteUrl || 'https://www.bareunhaniwon.com/'),
      googleServiceAccountJson: prev.googleServiceAccountJson || ''
    };
    if (body.clearServiceAccount) {
      next.googleServiceAccountJson = '';
    } else if (typeof body.googleServiceAccountJson === 'string' && body.googleServiceAccountJson.trim()) {
      next.googleServiceAccountJson = body.googleServiceAccountJson.trim();
    }
    db.analyticsConfig = next;
    saveDb(db);
    localExtAnalyticsCache = { expiresAt: 0, payload: null };
    const ext = await fetchExternalGoogleAnalyticsData(db, true);
    return sendJson(res, 200, {
      ok: true,
      message: '외부 통계(GA4 · 서치콘솔 · 네이버 애널리틱스) 설정이 저장 및 동기화되었습니다.',
      external: ext,
      summary: buildVisitSummary(db, true, ext)
    });
  }

  if (route === '/visits/master' && req.method === 'GET') {
    const actor = getActor(req, db);
    if (!actor || !actor.isMaster) return sendJson(res, 403, { ok: false, message: '마스터 권한이 필요합니다.' });
    const force = urlObj.searchParams.get('forceRefresh') === '1';
    const ext = await fetchExternalGoogleAnalyticsData(db, force);
    return sendJson(res, 200, buildVisitSummary(db, true, ext));
  }

  if (route === '/visits/adjust' && req.method === 'POST') {
    const actor = getActor(req, db);
    if (!actor || !actor.isMaster) return sendJson(res, 403, { ok: false, message: '마스터 권한이 필요합니다.' });
    const body = await readJsonBody(req);
    if (typeof body.baseOffset !== 'undefined') {
      db.visitBaseOffset = Math.max(0, Number(body.baseOffset) || 0);
      saveDb(db);
    }
    const ext = await fetchExternalGoogleAnalyticsData(db, false);
    return sendJson(res, 200, buildVisitSummary(db, true, ext));
  }

  if (route === '/body-notes' && req.method === 'GET') {
    const todayKst = nowStr().slice(0, 10);
    const anchorMs = Date.parse('2026-10-23T00:00:00Z');
    const curMs = Date.parse(todayKst + 'T00:00:00Z');
    const diffDays = curMs >= anchorMs ? Math.floor((curMs - anchorMs) / 86400000) : 0;
    const addDays = (diffDays % 2 === 0) ? 2 : 1;
    const nextUpdateKst = new Date(curMs + addDays * 86400000).toISOString().slice(0, 10);

    const part = urlObj.searchParams.get('part') || 'all';
    let stored = Array.isArray(db.bodyNotes) ? db.bodyNotes : [];
    if (stored.length < 72) {
      syncNineDiseaseAutoNotes();
      const reloaded = loadDb();
      stored = Array.isArray(reloaded.bodyNotes) ? reloaded.bodyNotes : [];
    }
    const noteViews = (db.noteViews && typeof db.noteViews === 'object') ? db.noteViews : {};
    const notes = stored.filter(n => {
      if (!n || typeof n !== 'object') return false;
      if (n.publishDate && n.publishDate > todayKst) return false;
      if (part !== 'all' && n.partId !== part) return false;
      return true;
    }).map(n => ({
      ...n,
      views: Number(noteViews[n.id]) || 0
    }));

    return sendJson(res, 200, {
      ok: true,
      todayKst,
      nextUpdateKst,
      cycleDays: 2,
      autoReady: true,
      noteViews,
      notes
    });
  }

  if (route === '/body-notes/view' && req.method === 'POST') {
    const body = await readJsonBody(req);
    const noteId = String(body.noteId || body.id || '').trim().toLowerCase();
    if (!noteId) return sendJson(res, 400, { ok: false, message: 'noteId is required' });
    if (!db.noteViews || typeof db.noteViews !== 'object') db.noteViews = {};
    db.noteViews[noteId] = (Number(db.noteViews[noteId]) || 0) + 1;
    if (Array.isArray(db.bodyNotes)) {
      const targetNote = db.bodyNotes.find(x => x && x.id === noteId);
      if (targetNote) targetNote.views = db.noteViews[noteId];
    }
    saveDb(db);
    return sendJson(res, 200, {
      ok: true,
      noteId,
      views: db.noteViews[noteId],
      noteViews: db.noteViews
    });
  }

  if (route === '/auto-blog/status' && req.method === 'GET') {
    const logPath = path.join(__dirname, 'auto-blog-run-log.json');
    const logData = fs.existsSync(logPath)
      ? JSON.parse(fs.readFileSync(logPath, 'utf8'))
      : syncNineDiseaseAutoNotes();
    return sendJson(res, 200, { ok: true, status: logData });
  }

  if (route === '/auto-blog/run' && req.method === 'POST') {
    const report = syncNineDiseaseAutoNotes();
    return sendJson(res, 200, { ok: true, report });
  }

  if (route === '/clinic-info' && req.method === 'GET') {
    const infoPath = path.join(__dirname, 'clinic-global-info.json');
    const defPath = path.join(__dirname, 'clinic-global-info.default.json');
    const src = fs.existsSync(infoPath) ? infoPath : defPath;
    if (fs.existsSync(src)) {
      try {
        return sendJson(res, 200, { ok: true, info: JSON.parse(fs.readFileSync(src, 'utf8')) });
      } catch (e) {}
    }
    return sendJson(res, 200, { ok: true, info: null });
  }

  if (route === '/clinic-info' && req.method === 'POST') {
    const body = await readJsonBody(req);
    const info = (body && body.info && typeof body.info === 'object') ? body.info : body;
    if (!info || !info.clinicName) {
      return sendJson(res, 400, { ok: false, error: '유효한 병원 정보 데이터가 없습니다.' });
    }
    info.updatedAt = new Date().toISOString();
    fs.writeFileSync(path.join(__dirname, 'clinic-global-info.json'), JSON.stringify(info, null, 2) + '\n', 'utf8');
    try {
      require('./build-location-page.js').run();
    } catch (e) {}
    return sendJson(res, 200, { ok: true, info, message: '병원 정보 및 오시는길 페이지가 반영되었습니다.' });
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

module.exports = { handleBareunApi, maybeTrackGeoAiCrawler };
