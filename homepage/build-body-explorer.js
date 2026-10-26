/**
 * 바른한의원 대전본점 · 풀스크린 3D 인체모형 & 진료 그래픽모션 탐색기 빌더 (v5.0 — Vibrant Wellness Edition)
 *
 * [핵심 구현 사항]
 * 1. 기존 3D GLB & 커스텀 장기·골격·신경 모형 100% 보존 (skinF2, skinMB2, Skeleton, spinalDiscs3D,
 *    brain, heart, liver, stomach, intestine, kidneys2, thyroid, Vascular, uterus3D, prostate3D,
 *    autonomicNerveGroup, gongjindanBridgeGroup)
 * 2. https://vibrant.noomoagency.com/ 레퍼런스 감성 100vw × 100vh 전체화면 구성:
 *    - 은은한 페리윙클·라벤더·스카이 오로라 그라데이션 + 3D 보케 입자 + 상단 중앙 [여성 ♀ | 남성 ♂] 필 토글
 *    - 인체 위 더블링 화이트 글로우 핫스팟(◉) + 우측 반투명 프로스티드 글래스 『바른한의원 진료 살펴보기』 메뉴 독
 * 3. 진료 메뉴 클릭 시:
 *    - Step A: 3D 인체 모형 다이내믹 그래픽모션 변화 (카메라 궤도 줌인 + 3D 바이오 스캔 파동 + X-ray 유리 스킨 투시 + 3D 이중 홀로그램 자이로 링 회전 + 3D 생체신호 입자 스트림)
 *    - Step B: 이어서 관련된 하위 메뉴 순차 재활성화 (3D 세부 포커스 포인트 팝업 + 우측 연관 세부 클리닉 바로가기 · 부위별 생활꿀팁 슬라이드 드로어 · 해외 SCI 논문 근거 드로어 · 질환별 1:1 비공개 Q&A 직통 연결)
 */

const fs = require('fs');
const path = require('path');

const BODY_PARTS = require('./body-parts-source.json');
const { DISEASE_QNA_CATEGORIES } = require('./disease-blog-seed-data.js');
const { partA: WEBGL_PART_A, partB: WEBGL_PART_B } = require('./body-3d-webgl-engine.js');

const CLINIC_MENU_CONFIG = [
  {
    id: 'syncope',
    menuTitle: '자율신경 · 두통 · 어지럼',
    menuSub: '미주신경 · 뇌혈류 · 불면 정밀검진',
    accent: '#4F46E5',
    skyA: '#8EA8F8', skyB: '#BBC8FC', skyC: '#E3DFFB',
    svgIcon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04Z"/></svg>',
    preset: { pos3D: [0.00, 4.12, 0.02], camPos: [0.22, 3.62, 2.75], camTarget: [0.00, 3.55, 0.00], ringScale: 1.05, focusRadius: 0.85 },
    motionDesc: '뇌간 자율신경 중추 ↔ 미주신경(Vagus Nerve) ↔ 심장·전신 혈관 탄력 네트워크가 3D 홀로그램으로 활성화되었습니다.',
    subFocus3D: [
      { label: '뇌간·편두통 혈류축', pos3D: [0.00, 4.26, 0.02], camPos: [0.16, 4.22, 1.65], camTarget: [0.00, 4.20, 0.00], ringScale: 0.72, note: '뇌혈관 자동조절능 및 편두통·현훈 신경 반사 포커스' },
      { label: '심장 자율신경총(HRV)', pos3D: [0.03, 3.52, 0.05], camPos: [0.18, 3.54, 1.78], camTarget: [0.02, 3.50, 0.02], ringScale: 0.78, note: '교감·부교감 심박변이도(HRV) 및 흉부 두근거림 조절축' },
      { label: '하지 정맥환류 펌프', pos3D: [0.13, 1.65, -0.02], camPos: [0.24, 1.75, 2.35], camTarget: [0.05, 1.70, 0.00], ringScale: 0.75, note: '기립 시 혈액 하체 저류를 막아 미주신경성 실신을 예방하는 혈관축' }
    ],
    relatedClinics: [
      { title: '9대 정밀검진 · 자율신경 클리닉', desc: 'HRV 자율신경 · 체열(DITI) · 말초혈관 통합 진단', href: 'director.html' },
      { title: '상부경추 추나 · 신경감압 클리닉', desc: '경추 1·2번 정렬을 통한 뇌혈류·미주신경 통로 확보', href: 'chuna.html' },
      { title: '바른 황제공진단 · 뇌활력 클리닉', desc: '만성 번아웃 및 브레인포그 신경영양 집중 케어', href: 'gongjindan.html' }
    ]
  },
  {
    id: 'lumbar',
    menuTitle: '추나 · 척추디스크 · 통증',
    menuSub: '목·허리디스크 · 골반비대칭 교정',
    accent: '#0EA5E9',
    skyA: '#8AB8F8', skyB: '#BBD7FB', skyC: '#E2ECFC',
    svgIcon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="7" y="3" width="10" height="4" rx="1.5"/><rect x="6" y="10" width="12" height="4" rx="1.5"/><rect x="7" y="17" width="10" height="4" rx="1.5"/><line x1="12" y1="7" x2="12" y2="10"/><line x1="12" y1="14" x2="12" y2="17"/></svg>',
    preset: { pos3D: [0.00, 2.68, -0.02], camPos: [-0.34, 2.68, 2.05], camTarget: [0.00, 2.62, -0.02], ringScale: 1.0, focusRadius: 0.72 },
    motionDesc: '요추 L1~S1 추간판(디스크) 수핵 쿠션과 골반 천장관절 중심축이 3D 생체역학 모션으로 활성화되었습니다.',
    subFocus3D: [
      { label: '요추 L4-L5-S1 추간판', pos3D: [0.00, 2.66, -0.03], camPos: [-0.26, 2.66, 1.55], camTarget: [0.00, 2.65, -0.03], ringScale: 0.68, note: '하중이 가장 집중되는 하부 요추 디스크 감압 포인트' },
      { label: '골반 천장관절 · 이상근', pos3D: [0.08, 2.34, -0.01], camPos: [0.28, 2.36, 1.72], camTarget: [0.02, 2.34, 0.00], ringScale: 0.78, note: '좌골신경 방사통과 골반 틀어짐을 좌우하는 균형축' },
      { label: '경추 C3-C7 디스크 정렬', pos3D: [0.00, 3.76, -0.06], camPos: [-0.26, 3.78, 1.58], camTarget: [0.00, 3.76, -0.05], ringScale: 0.62, note: '거북목 하중을 분산하는 경추 C자 전만 커브' }
    ],
    relatedClinics: [
      { title: '바른 추나 · 척추교정 클리닉', desc: '비수술 척추·골반 수기 감압 및 신경근 회복 프로그램', href: 'chuna.html' },
      { title: '초음파 · 적외선 체열 정밀검진', desc: '근골격 초음파 및 신경 염증 온도 분포 정밀 확인', href: 'director.html' }
    ]
  },
  {
    id: 'cervical',
    menuTitle: '탈모 · 두피열 · 경추순환',
    menuSub: '남성·여성·원형탈모 · 지루성두피염',
    accent: '#2563EB',
    skyA: '#8CA6F9', skyB: '#BAC8FB', skyC: '#E5E1FC',
    svgIcon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3c-4.5 0-8 3.2-8 7.5 0 2.8 1.5 5.2 3.8 6.5L9 21h6l1.2-4c2.3-1.3 3.8-3.7 3.8-6.5C20 6.2 16.5 3 12 3Z"/><path d="M9 10c1.5-2 4.5-2 6 0"/></svg>',
    preset: { pos3D: [0.00, 3.92, -0.02], camPos: [0.28, 3.90, 1.98], camTarget: [0.00, 3.86, -0.01], ringScale: 0.88, focusRadius: 0.65 },
    motionDesc: '경추 C자 정렬부터 후두하근 혈류 병목, 정수리 모낭 모유두 미세순환(수승화강) 경로가 활성화되었습니다.',
    subFocus3D: [
      { label: '정수리·전두부 모낭존', pos3D: [0.26, 4.28, 0.02], camPos: [0.18, 4.44, 1.54], camTarget: [0.00, 4.38, 0.00], ringScale: 0.66, note: '두피 열독 사막화 완화 및 모유두 성장기(Anagen) 보존 구역' },
      { label: '후두하근 · 풍지혈 관문', pos3D: [0.00, 4.04, -0.05], camPos: [0.28, 4.04, 1.52], camTarget: [0.00, 4.02, -0.03], ringScale: 0.62, note: '두피로 향하는 후두동맥 혈류 병목 해소 지점' },
      { label: '경추 추간판 & 갑상선 대사', pos3D: [0.00, 3.74, 0.02], camPos: [0.22, 3.76, 1.58], camTarget: [0.00, 3.74, 0.00], ringScale: 0.64, note: '거북목 교정 및 모발 대사 호르몬 균형 구역' }
    ],
    relatedClinics: [
      { title: '바른 탈모 · 모근재생 종합클리닉', desc: '수승화강 두피 청열 및 경추 순환 통합 탈모 치료', href: 'hairloss.html' },
      { title: '남성 M자 · 정수리 탈모 클리닉', desc: '성기능·호르몬 부담 없는 남성 모낭 자생력 복원', href: 'hairloss-male.html' },
      { title: '원형탈모 · 자가면역 복원 클리닉', desc: '자율신경 안정 및 모낭 주위 면역 관용 회복', href: 'hairloss-alopecia.html' },
      { title: '여성 가르마 · 상열하한 탈모 클리닉', desc: '출산·갱년기·다이어트 후 정수리 볼륨 집중 회복', href: 'hairloss-female.html' },
      { title: '지루성두피염 · 열독해독 클리닉', desc: '반복되는 두피 홍반·모낭염·가려움 진피 장벽 케어', href: 'hairloss-seborrheic.html' }
    ]
  },
  {
    id: 'knee',
    menuTitle: '소아 키성장 · 성조숙 · 면역',
    menuSub: '무릎 성장판 · 비염 구강호흡 · 소아비만',
    accent: '#10B981',
    skyA: '#87B9F4', skyB: '#B8DEFA', skyC: '#E2F5F1',
    svgIcon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 22v-9"/><path d="M12 13c-3.5 0-6-2.5-6-6 3.5 0 6 2.5 6 6Z"/><path d="M12 10c3.5 0 6-2.5 6-6-3.5 0-6 2.5-6 6Z"/></svg>',
    preset: { pos3D: [0.15, 1.20, 0.04], camPos: [0.22, 1.26, 2.08], camTarget: [0.06, 1.20, -0.02], ringScale: 0.85, focusRadius: 0.62 },
    motionDesc: '대퇴골·경골 무릎 성장판(Epiphyseal Plate) 연골 증식층과 하지 골격 정렬 라인이 3D 에메랄드 모션으로 활성화되었습니다.',
    subFocus3D: [
      { label: '대퇴·경골 무릎 성장판', pos3D: [0.15, 1.20, 0.04], camPos: [0.20, 1.22, 1.56], camTarget: [0.10, 1.20, 0.00], ringScale: 0.64, note: '연골모세포(Chondrocyte) 분열이 일어나는 핵심 선형 성장 구역' },
      { label: '소아 골반 · 척추 숨은키 축', pos3D: [0.00, 2.52, -0.02], camPos: [0.24, 2.56, 2.05], camTarget: [0.00, 2.52, 0.00], ringScale: 0.78, note: '다리 길이 차이와 구부정한 체형으로 숨은 2~3cm를 찾는 정렬축' }
    ],
    relatedClinics: [
      { title: '바른 성장 · 성조숙증 · 비염 클리닉', desc: '무방사선 성장판 초음파 · 골연령 · 호흡기 면역 통합 케어', href: 'growth.html' },
      { title: '소아 체형교정 추나 클리닉', desc: '거북목·골반 비대칭 교정으로 성장판 편측 압박 해소', href: 'chuna.html' }
    ]
  },
  {
    id: 'gut',
    menuTitle: '다이어트 · 내장지방 · 대사',
    menuSub: '갈색지방 열생산 · 인슐린 · 부종 해독',
    accent: '#6366F1',
    skyA: '#97AAF8', skyB: '#C5CEFB', skyC: '#ECE6FD',
    svgIcon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2c1.5 3.5 4.5 5.5 4.5 10a4.5 4.5 0 1 1-9 0c0-2.5 1.2-4.5 2.5-6.2.4 1.8 1.8 2.7 2 3.7.8-2.2.8-4.8 0-7.5Z"/></svg>',
    preset: { pos3D: [0.00, 3.06, 0.06], camPos: [0.22, 3.08, 1.98], camTarget: [0.00, 3.04, 0.02], ringScale: 1.02, focusRadius: 0.68 },
    motionDesc: '간(Liver) 지질 대사와 복부 내장지방 연소 코어·장관 해독 순환계가 3D 대사 모션으로 활성화되었습니다.',
    subFocus3D: [
      { label: '간(Liver) 지질·해독 대사', pos3D: [-0.09, 3.26, 0.05], camPos: [-0.22, 3.26, 1.62], camTarget: [-0.05, 3.24, 0.02], ringScale: 0.68, note: '지방간 예방 및 대사 노폐물 해독 효소 활성화 구역' },
      { label: '복부 내장지방 · 장대사 코어', pos3D: [0.00, 2.92, 0.07], camPos: [0.18, 2.94, 1.68], camTarget: [0.00, 2.92, 0.03], ringScale: 0.78, note: '인슐린 저항성 개선 및 심부 열생산 대사 활성화 중심축' }
    ],
    relatedClinics: [
      { title: '바른 다이어트 · 식욕ZERO 클리닉', desc: '근손실·손떨림 걱정 없는 건강한 갈색지방 대사 활성화', href: 'diet-zero.html' },
      { title: '바른리프팅 윤곽 전후 비교 시스템', desc: '비수술 탄력·윤곽 라인 개선 전후 진단 프로그램', href: 'lifting-compare.html' }
    ]
  },
  {
    id: 'digest',
    menuTitle: '위장 담적 · 역류식도염',
    menuSub: '기능성 소화불량 · 장-뇌 축 연동운동',
    accent: '#F59E0B',
    skyA: '#96B2F6', skyB: '#C6D4FB', skyC: '#F4ECFA',
    svgIcon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M10 3v4c0 2-3 3-3 7a6 6 0 0 0 12 0c0-3-2-5-5-5h-1"/><path d="M7 17c0 2.5 2 4 5 4"/></svg>',
    preset: { pos3D: [0.04, 3.18, 0.06], camPos: [-0.22, 3.18, 1.92], camTarget: [0.00, 3.14, 0.02], ringScale: 0.96, focusRadius: 0.66 },
    motionDesc: '위장(Stomach) 평활근 배출 리듬, 간·담도 소화축 및 장관신경계(Gut-Brain Axis) 연동 파동이 활성화되었습니다.',
    subFocus3D: [
      { label: '위저부 · 명치 담적 경결존', pos3D: [0.07, 3.26, 0.07], camPos: [-0.16, 3.28, 1.54], camTarget: [0.04, 3.24, 0.03], ringScale: 0.65, note: '카할 간질세포(ICC) 위 배출 리듬 및 하부식도괄약근 압력 조절' },
      { label: '소장·대장 장관신경계(ENS)', pos3D: [0.00, 2.86, 0.06], camPos: [0.18, 2.88, 1.66], camTarget: [0.00, 2.86, 0.03], ringScale: 0.74, note: '복부 가스 팽만 및 과민성 장 점막 면역 밸런스 구역' }
    ],
    relatedClinics: [
      { title: '복부 초음파 · 체열 · 내시경 정밀검진', desc: '위장 외벽 경결(담적)과 인후두 역류 점막 정밀 확인', href: 'director.html' },
      { title: '흉추·자율신경 감압 추나 클리닉', desc: '위장 미주신경 분지가 지나는 등·명치 근막 긴장 해소', href: 'chuna.html' }
    ]
  },
  {
    id: 'gongjindan',
    menuTitle: '황제공진단 · 만성피로 · 뇌활력',
    menuSub: '번아웃 · 수험생 집중력 · 면역 보강',
    accent: '#D97706',
    skyA: '#8FA9F6', skyB: '#C2CDF9', skyC: '#F4EFEA',
    svgIcon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    preset: { pos3D: [0.00, 3.86, 0.03], camPos: [0.22, 3.88, 2.26], camTarget: [0.00, 3.84, 0.00], ringScale: 1.04, focusRadius: 0.76 },
    motionDesc: '심장(Heart)과 대뇌(Brain)를 잇는 황금빛 수승화강 기혈 브릿지와 뇌신경 영양(BDNF) 순환이 활성화되었습니다.',
    subFocus3D: [
      { label: '대뇌 전두엽 · 해마 집중력축', pos3D: [0.00, 4.28, 0.01], camPos: [0.18, 4.26, 1.62], camTarget: [0.00, 4.24, 0.00], ringScale: 0.70, note: '브레인포그 해소 및 뇌유래신경영양인자(BDNF) 활성 구역' },
      { label: '심폐 활력 · 관상순환 코어', pos3D: [0.02, 3.52, 0.05], camPos: [0.18, 3.54, 1.68], camTarget: [0.02, 3.50, 0.02], ringScale: 0.72, note: '만성 번아웃 회복 및 심장-뇌 산소 공급 원동력' }
    ],
    relatedClinics: [
      { title: '바른 황제공진단 · 만성피로 클리닉', desc: '식약처 CITES 정품 사향 · 원장 수제 조제 프리미엄 보약', href: 'gongjindan.html' },
      { title: '간(AST/ALT) · 자율신경 안전성 검진', desc: '처방 전후 혈액 간수치 및 피로도 과학적 정밀 확인', href: 'director.html' }
    ]
  },
  {
    id: 'uterus',
    menuTitle: '자궁 · 난임(IVF) · 여성건강',
    menuSub: '시험관 착상 · 생리통 · 산후 보궁',
    accent: '#EC4899',
    skyA: '#9DA9F9', skyB: '#D0C6FB', skyC: '#F8E5F4',
    svgIcon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="9" r="6"/><line x1="12" y1="15" x2="12" y2="22"/><line x1="9" y1="19" x2="15" y2="19"/></svg>',
    preset: { pos3D: [0.00, 2.42, 0.03], camPos: [0.00, 2.45, 1.68], camTarget: [0.00, 2.42, 0.01], ringScale: 0.78, focusRadius: 0.56 },
    motionDesc: '여성 체형 전환과 함께 3D 자궁내막 착상 코어, 양측 난관·난소 및 골반 나선동맥 온열 혈류가 활성화되었습니다.',
    subFocus3D: [
      { label: '자궁내막 착상 수용성 코어', pos3D: [0.00, 2.45, 0.04], camPos: [0.00, 2.46, 1.38], camTarget: [0.00, 2.44, 0.02], ringScale: 0.56, note: '자궁 나선동맥 혈류 저항 감소 및 착상 환경 최적화 구역' },
      { label: '양측 난소 · 난포 성숙축', pos3D: [-0.10, 2.43, 0.01], camPos: [-0.18, 2.44, 1.48], camTarget: [-0.04, 2.42, 0.00], ringScale: 0.58, note: '배란 리듬 안정화 및 난소 미세순환 보호 포인트' }
    ],
    relatedClinics: [
      { title: '임신준비 · 시험관(IVF) 착상 클리닉', desc: '배아 이식 주기별 내막 수용성·골반 체열 맞춤 케어', href: 'director.html' },
      { title: '산후 골반교정 추나 클리닉', desc: '출산 및 만성 생리통 연관 골반 비대칭 수기 교정', href: 'chuna.html' }
    ]
  },
  {
    id: 'prostate',
    menuTitle: '전립선 · 야간뇨 · 남성활력',
    menuSub: '만성전립선염 · 과민성방광 · 골반저근',
    accent: '#0284C7',
    skyA: '#86AEF7', skyB: '#B8D0FB', skyC: '#E2EEFD',
    svgIcon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    preset: { pos3D: [0.00, 2.28, 0.03], camPos: [0.00, 2.32, 1.66], camTarget: [0.00, 2.28, 0.01], ringScale: 0.78, focusRadius: 0.56 },
    motionDesc: '남성 체형 전환과 함께 3D 방광·전립선 쌍엽·요관 및 신장-골반저근 울혈 감압 순환축이 활성화되었습니다.',
    subFocus3D: [
      { label: '전립선 · 요도 괄약근 코어', pos3D: [0.00, 2.25, 0.04], camPos: [0.00, 2.26, 1.36], camTarget: [0.00, 2.25, 0.02], ringScale: 0.56, note: '전립선 간질 울혈 감압 및 시원한 배뇨 유속 회복 구역' },
      { label: '방광 배뇨근 · 야간뇨 조절축', pos3D: [0.00, 2.34, 0.03], camPos: [0.16, 2.38, 1.52], camTarget: [0.00, 2.32, 0.01], ringScale: 0.60, note: '과민성 방광 진정 및 새벽 야간뇨 없는 숙면 유지 구역' }
    ],
    relatedClinics: [
      { title: '바른 전립선 · 남성활력 클리닉', desc: '1:1 프라이빗 방광·하복부 초음파 및 심부 자기장 골반저 강화', href: 'prostate.html' },
      { title: '골반 울혈 감압 추나 클리닉', desc: '장시간 좌식으로 눌린 골반강 및 음부신경 순환 개통', href: 'chuna.html' }
    ]
  }
];

const PART_LIFESTYLE_TIPS = {
  knee: {
    tipTitle: '숨은 키를 깨우는 소아 성장판 · 비만 · 코호흡 생활 꿀팁',
    doList: [
      { title: '밤 10시 이전 완전 소등 숙면', desc: '성장호르몬 일일 분비량의 70% 이상이 집중되는 깊은 서파수면(Slow-Wave Sleep)을 위해 침실 조명을 완전히 차단하세요.' },
      { title: '기상 직후 미온수 한 잔 & 비강 호흡', desc: '건조해진 코점막을 적셔 구강호흡을 줄이고 아침 소화 흡수를 부드럽게 깨웁니다.' },
      { title: '하루 15분 줄넘기 · 가벼운 수직 점프', desc: '운동화 착용 후 부드러운 바닥에서 뛰면 무릎 성장판 연골세포에 건강한 물리적 자극이 전달됩니다.' }
    ],
    dontList: [
      { title: '취침 2시간 전 단 음료 · 야식 금지', desc: '야간 고혈당과 인슐린 상승은 성장호르몬 분비를 직접 억제하고 조기 골화 위험을 높입니다.' },
      { title: '뜨거운 플라스틱 배달 용기 주의', desc: '내분비계 교란물질(환경호르몬) 노출을 막기 위해 유리·도자기 식기를 사용하세요.' },
      { title: '바닥 양반다리 · 구부정한 스마트폰', desc: '골반 비틀림과 거북목은 숨은 키 2~3cm를 손실시키고 성장판 편측 압박을 유발합니다.' }
    ],
    routine: [
      { time: '🌅 아침', title: '미온수 1잔 + 전신 기지개 스트레칭 2분', desc: '밤새 굳은 척추·무릎 관절을 늘려주고 단백질 아침 식사로 성장 재료를 공급합니다.' },
      { time: '☀️ 낮', title: '독서대 사용 + 햇볕 아래 15분 점프 활동', desc: '비타민 D 합성과 성장판 미세혈류 증진을 동시에 챙깁니다.' },
      { time: '🌙 밤', title: '침실 습도 50% 유지 + 스마트폰 거실 보관', desc: '코막힘 없는 비강 호흡 환경을 만들어 깊은 서파수면으로 진입합니다.' }
    ],
    goodFoods: ['잔멸치·두부·검은콩 (칼슘·식물성 단백)', '소고기 살코기·달걀 (아미노산·아연)', '시금치·표고버섯 (비타민 D·골대사)', '따뜻한 작두콩·배도라지차 (호흡기 점막 보호)'],
    avoidFoods: ['액상과당 탄산·과일주스 (성장호르몬 억제)', '야간 치킨·라면·튀김류 (체지방·성조숙 자극)', '고카페인 초콜릿·음료 (서파수면 방해)'],
    acupressure: { name: '무릎 아래 족삼리혈(足三里) & 위중혈 3분 지압', howTo: '무릎 바깥쪽 아래 오목한 곳에서 네 손가락 아래(족삼리)를 엄지로 5초씩 10회 지그시 누르고 종아리를 쓸어줍니다.', benefit: '소화 흡수력을 높이고 무릎 성장판 주변 미세혈류를 원활히 합니다.' }
  },
  cervical: {
    tipTitle: '두피 사막화를 식히는 경추 순환 · 모근 보습 생활 꿀팁',
    doList: [
      { title: '저녁 미온수 두피 세정 & 냉풍 완전 건조', desc: '하루 동안 쌓인 산화 피지와 미세먼지를 밤에 씻어내고 찬 바람으로 두피 속까지 말립니다.' },
      { title: '취침 전 15분 미온수 족욕 (수승화강)', desc: '하체 말초혈관을 데우면 정수리에 몰린 상열감이 자연스럽게 내려가 모낭 회복을 돕습니다.' },
      { title: '모니터 상단 눈높이 & 50분마다 턱 당기기', desc: '전방두부자세(거북목)를 교정해 후두하근의 두피 혈관 압박을 풀어줍니다.' }
    ],
    dontList: [
      { title: '젖은 머리로 취침 · 뜨거운 열풍 건조', desc: '습한 두피는 지루성 염증을 부르고 고온 열풍은 모유두 세포에 열 손상을 줍니다.' },
      { title: '손톱으로 긁기 · 강한 견인 헤어스타일', desc: '손톱 미세 상처는 모낭염을 악화시키며 강한 묶음은 견인성 탈모를 유발합니다.' },
      { title: '야간 음주 · 매운 야식 · 과도한 카페인', desc: '상부 열감과 피지 분비를 급증시켜 모발 성장기(Anagen)를 단축시킵니다.' }
    ],
    routine: [
      { time: '🌅 아침', title: '둥근 나무 브러시 측두부~정수리 빗질 1분', desc: '측두근 긴장을 부드럽게 풀어 두피 모세혈관 순환을 깨웁니다.' },
      { time: '☀️ 낮', title: '50분마다 견갑골 모으기 & 승모근 이완', desc: '경추 하중을 줄이고 커피 대신 미온수로 수분을 보충합니다.' },
      { time: '🌙 밤', title: '손끝 지문 거품 샴푸 + 15분 족욕 후 숙면', desc: '모낭 줄기세포 재생이 활발한 밤 11시 이전에 입면합니다.' }
    ],
    goodFoods: ['검은콩·흑임자·두부 (시스테인·이소플라본)', '호두·아몬드·해조류 (비오틴·철분·아연)', '연어·달걀 (오메가-3·케라틴 원료)', '구기자차·솔잎차 (상열 완화)'],
    avoidFoods: ['기름진 야식·튀김류 (과다 피지 산화)', '주류·알코올 (두피 홍반·열감 급상승)', '정제 설탕·액상과당 (모낭 당화 스트레스)'],
    acupressure: { name: '뒷목 풍지혈(風池穴) & 정수리 백회혈 3분 지압', howTo: '머리뼈 아래 뒷목 오목한 곳(풍지혈)을 양 엄지로 5초씩 지그시 밀어 올린 뒤 정수리(백회)를 손끝으로 가볍게 두드립니다.', benefit: '후두하근 병목을 열어 두피 산소·영양 공급을 촉진합니다.' }
  },
  lumbar: {
    tipTitle: '척추 추간판(디스크) · 골반 정렬을 지키는 생체역학 꿀팁',
    doList: [
      { title: '기상 시 옆으로 돌아 팔로 짚고 일어나기', desc: '밤새 수분이 차오른 추간판 내압 급상승을 막기 위해 통나무처럼 옆으로 돌아 기상하세요.' },
      { title: '엉덩이 깊숙이 밀착 & 요추 C자 전만 지지', desc: '등받이에 골반을 끝까지 붙이고 허리 쿠션을 대면 디스크 압력이 크게 감소합니다.' },
      { title: '하루 30분 시선 정면 평지 보행', desc: '규칙적인 평지 걷기는 다열근·둔근을 활성화하고 추간판 영양 확산을 돕습니다.' }
    ],
    dontList: [
      { title: '다리 꼬고 앉기 · 뒷주머니 지갑 휴대', desc: '골반 천장관절 회전 비대칭과 하부 요추 편측 압박의 주원인입니다.' },
      { title: '무릎 펴고 허리만 숙여 물건 들기', desc: '반드시 고관절과 무릎을 굽혀 하체 근육 힘으로 물건을 들어 올리세요.' },
      { title: '푹신한 소파에 반쯤 누운 자세', desc: '골반 후방경사로 요추 4-5번 추간판 후방 압력을 극대화합니다.' }
    ],
    routine: [
      { time: '🌅 아침', title: '누운 채 무릎 세워 좌우 천천히 흔들기 1분', desc: '굳은 요방형근과 골반 인대를 예열한 뒤 안전하게 일어납니다.' },
      { time: '☀️ 낮', title: '50분 착석마다 기립 허리 신전 스트레칭', desc: '양손으로 골반 위를 받치고 상체를 부드럽게 젖혀 디스크 압력을 분산합니다.' },
      { time: '🌙 밤', title: '둔부·허리 온찜질 15분 + 무릎 아래 낮은 베개', desc: '장요근 긴장을 늦추어 수면 중 요추 부담을 덜어줍니다.' }
    ],
    goodFoods: ['두부·연어·달걀 (심부 기립근 단백질·비타민 D)', '도가니·생선 콜라겐 (결합조직 영양)', '부추·마늘·양파 (미세순환 및 항염)', '두충차·우슬차 (근골·인대 보호)'],
    avoidFoods: ['흡연·니코틴 (추간판 미세혈관 수축·퇴행 가속)', '과음 (신경근 주위 부종·염증 악화)', '과도한 카페인 (근막 긴장 유발)'],
    acupressure: { name: '허리 신수혈(腎兪穴) 온열 마찰 & 둔부 이상근 스트레칭', howTo: '양손을 비벼 배꼽 반대편 허리 양옆을 따뜻하게 문지르고, 의자에서 아픈 쪽 발목을 반대 무릎에 올린 채 허리를 펴고 살짝 숙입니다.', benefit: '요추 심부 긴장과 좌골신경 압박을 부드럽게 이완합니다.' }
  },
  gongjindan: {
    tipTitle: '만성 번아웃과 브레인포그를 깨우는 뇌·에너지 대사 꿀팁',
    doList: [
      { title: '기상 직후 15분 자연 일광 노출', desc: '망막을 통한 아침 햇빛 자극이 코르티솔 각성 리듬과 밤 시간 멜라토닌 분비를 정상화합니다.' },
      { title: '아침 공복 미온수 섭취 & 천천히 음미', desc: '방향성 유효 성분과 영양소가 구강·위장 점막에서 온전히 흡수되도록 돕습니다.' },
      { title: '오후 피로 시 15분 이내 짧은 파워냅', desc: '장시간 주말 몰아자기 대신 짧은 낮 휴식으로 생체시계 항상성을 유지하세요.' }
    ],
    dontList: [
      { title: '오후 2시 이후 고카페인 · 에너지음료 남용', desc: '부신 피로를 가중시키고 야간 깊은 서파수면을 방해해 다음 날 피로를 악순환시킵니다.' },
      { title: '보약 복용 전후 1시간 진한 커피·녹차', desc: '탄닌과 카페인이 철분 및 주요 생리활성 성분의 흡수율을 떨어뜨립니다.' },
      { title: '심야 스마트폰 블루라이트 & 야간 폭식', desc: '간 해독과 뇌 글림프계(Glymphatic) 노폐물 청소를 방해합니다.' }
    ],
    routine: [
      { time: '🌅 아침', title: '미온수 반 컵 + 15분 햇볕 산책으로 뇌 각성', desc: '전두엽 세로토닌과 미토콘드리아 에너지 대사 스위치를 켭니다.' },
      { time: '☀️ 낮', title: '집중 업무 50분 + 눈 감고 심호흡 3분 휴식', desc: '과열된 뇌 신경망 피로를 주기적으로 냉각시킵니다.' },
      { time: '🌙 밤', title: '따뜻한 샤워 후 복식호흡 3분으로 부교감 전환', desc: 'HPA 축 긴장을 갈무리하고 깊은 회복 수면으로 들어갑니다.' }
    ],
    goodFoods: ['전복·굴·타우린 해산물 (미토콘드리아 피로 회복)', '블루베리·호두 (뇌혈관 항산화 폴리페놀)', '산마·연근·대추 (소화 보호 및 기력 보충)', '따뜻한 생강대추차 (말초 체온 유지)'],
    avoidFoods: ['고카페인 에너지드링크 (교감신경 고갈)', '초가공 당류 스낵 (혈당 롤러코스터 유발)', '심야 음주·야식 (간 해독 에너지 소모)'],
    acupressure: { name: '가슴 중앙 전중혈(膻中穴) & 손바닥 노궁혈 3분 지압', howTo: '양 유두 사이 중앙 가슴뼈를 둥글게 마사지하며 깊게 숨을 내쉬고 주먹 쥔 중지 끝 손바닥(노궁혈)을 5초씩 눌러줍니다.', benefit: '흉부 긴장을 완화하고 심장-뇌 기혈 순환을 편안하게 돕습니다.' }
  },
  syncope: {
    tipTitle: '미주신경성 실신 · 기립성 어지럼 · 편두통 자율신경 꿀팁',
    doList: [
      { title: '전조(식은땀·시야 협착) 즉시 쪼그려 앉기 & 다리 교차 힘주기', desc: '유럽심장학회(ESC) 1차 권고 대처법으로, 즉시 자세를 낮추고 허벅지·둔근에 힘을 주어 뇌혈류를 확보하세요.' },
      { title: '기상 시 30초-30초 3단계 완만 기상', desc: '눈 뜨고 30초, 걸터앉아 30초 후 일어서면 기립성 혈압 급강하를 예방합니다.' },
      { title: '수시로 까치발 들기 (종아리 제2의 심장 펌프)', desc: '하체 정맥혈을 심장과 뇌로 밀어 올려 장시간 기립 시 어지럼을 막아줍니다.' }
    ],
    dontList: [
      { title: '공복 고온 사우나 · 열탕 후 급격한 기립', desc: '말초혈관 확장 상태에서 갑자기 일어서면 뇌혈류가 급감해 실신 위험이 매우 높습니다.' },
      { title: '빈속 아이스 커피 · 극단적 수분/염분 결핍', desc: '교감신경 과각성과 혈장량 감소를 동시에 유발해 자율신경 반사를 불안정하게 만듭니다.' },
      { title: '밀폐·고온 실내에서 무릎 잠근 채 부동 기립', desc: '서 있어야 할 때는 다리 근육을 계속 미세하게 움직여 정맥 저류를 막으세요.' }
    ],
    routine: [
      { time: '🌅 아침', title: '침대 맡 미온수 1잔 섭취 후 3단계 천천히 기상', desc: '혈장량과 자율신경 혈관 수축 반사를 안정적으로 깨웁니다.' },
      { time: '☀️ 낮', title: '매시간 까치발 20회 + 목 옆 흉쇄유돌근 이완', desc: '추골동맥과 미주신경 주행 경로의 긴장을 부드럽게 풀어줍니다.' },
      { time: '🌙 밤', title: '취침 전 4-7-8 복식호흡 (4초 흡기·7초 유지·8초 호기)', desc: '미주신경 톤(Vagal Tone)을 높여 두근거림과 불면을 진정시킵니다.' }
    ],
    goodFoods: ['바나나·시금치·아보카도 (신경 안정 마그네슘)', '충분한 수분·적정 전해질 (혈장량 유지)', '연근·상추·대추 (심열 완화 및 수면 보조)', '국화차(감국차)·산조인차 (두통·긴장 완화)'],
    avoidFoods: ['공복 고농도 카페인 (빈맥·편두통 반동)', '적포도주·숙성 치즈 (편두통 혈관 유발 인자)', '탈수를 부르는 과음·초절식'],
    acupressure: { name: '손목 안쪽 내관혈(內關穴) & 귀 뒤 예풍혈 3분 지압', howTo: '손목 주름에서 손가락 세 마디 아래 두 힘줄 사이(내관혈)를 5초씩 지그시 누르고 귓불 뒤 오목한 곳(예풍혈)을 부드럽게 마사지합니다.', benefit: '오심·어지럼증·가슴 두근거림을 진정시키는 대표 자율신경 혈자리입니다.' }
  },
  digest: {
    tipTitle: '굳은 위장 운동성을 깨우는 담적 · 역류성식도염 식사 꿀팁',
    doList: [
      { title: '한 입 30회 저작 (침 속 아밀라아제 혼합)', desc: '음식물을 입안에서 잘게 부수면 위장 평활근의 기계적 배출 부담이 절반으로 줄어듭니다.' },
      { title: '식중 국물·물 줄이고 식후 1시간 뒤 미온수', desc: '소화효소 희석과 위 내 가스 압력 상승을 막아 명치 팽만감을 예방합니다.' },
      { title: '식후 곧바로 눕지 않고 15분 가벼운 보행', desc: '위-십이지장 배출 연동운동을 촉진해 위산과 가스의 식도 역류를 차단합니다.' }
    ],
    dontList: [
      { title: '취침 3시간 전 야식 & 식후 즉시 와위(눕기)', desc: '하부식도괄약근을 느슨하게 만들어 인후두 역류 이물감(매핵기)을 악화시킵니다.' },
      { title: '10분 이내 급식 · 긴장 상태 스마트폰 식사', desc: '교감신경 우위 상태에서 급히 삼키면 위저부 이완이 일어나지 않아 명치가 돌처럼 막힙니다.' },
      { title: '얼음 음료 · 정제 밀가루 면·빵 · 빈속 커피', desc: '위장 온도를 떨어뜨리고 장내 발효 가스를 급증시킵니다.' }
    ],
    routine: [
      { time: '🌅 아침', title: '따뜻한 미온수 반 잔 + 찐 양배추·산마·달걀', desc: '위 점막을 부드럽게 보호하며 장관 시계를 규칙적으로 켭니다.' },
      { time: '☀️ 낮', title: '20분 이상 천천히 식사 + 식후 15분 평지 산책', desc: '식곤증과 오후 복부 가스 팽만을 깔끔하게 예방합니다.' },
      { time: '🌙 밤', title: '저녁 7시 전 소식 마감 + 배꼽 시계방향 온열 마사지', desc: '야간 위장관 휴식과 미주신경 회복을 돕습니다.' }
    ],
    goodFoods: ['살짝 찐 양배추·브로콜리 (비타민 U 점막 보호)', '산마·연근 (뮤신 위벽 코팅)', '무·생강·진피차 (위 배출 촉진 및 복부 보온)', '부드러운 흰살생선·두부'],
    avoidFoods: ['라면·빵·피자 등 정제 밀가루 (가스·담적 유발)', '탄산·아이스 커피·초콜릿 (괄약근 압력 저하)', '기름진 튀김·매운 야식 (위 배출 지연)'],
    acupressure: { name: '명치-배꼽 중앙 중완혈(中脘穴) & 손등 합곡혈 3분 지압', howTo: '명치와 배꼽 정중앙(중완혈)을 따뜻한 손바닥으로 시계방향 30회 문지르고 엄지·검지 사이(합곡혈)를 5초씩 눌러줍니다.', benefit: '상복부 긴장을 완화하고 정체된 위장 가스와 체기를 내려줍니다.' }
  },
  gut: {
    tipTitle: '근육은 지키고 내장지방만 태우는 대사 · 인슐린 관리 꿀팁',
    doList: [
      { title: '채소 → 단백질 → 탄수화물 ‘거꾸로 식사법’', desc: '식이섬유와 단백질을 먼저 섭취하면 식후 혈당 스파이크와 인슐린 지방 축적 신호가 현저히 완만해집니다.' },
      { title: '저녁 식사 후 익일 아침까지 12~14시간 야간 공복', desc: '인슐린이 충분히 낮아지는 시간을 확보해 간과 내장지방 연소 스위치를 켭니다.' },
      { title: '하루 미온수 1.5~2L 분할 섭취 & 하체 저항운동', desc: '지방 대사 산물 배출을 돕고 최대 포도당 소비처인 허벅지·둔근 대사량을 지킵니다.' }
    ],
    dontList: [
      { title: '하루 한 끼 초절식 · 극단적 굶기 다이어트', desc: 'NEJM·Cell Metabolism 연구처럼 갈색지방 열생산과 갑상선 대사를 떨어뜨려 요요 체질을 만듭니다.' },
      { title: '액상과당 음료 · 시럽 라떼 · 습관적 단맛', desc: '액상과당은 간으로 직행해 내장지방과 지방간으로 빠르게 전환됩니다.' },
      { title: '고나트륨 국물 식사 & 수면 부족(6시간 미만)', desc: '수면 부족은 식욕 촉진 호르몬(그렐린)을 높이고 포만 호르몬(렙틴)을 마비시킵니다.' }
    ],
    routine: [
      { time: '🌅 아침', title: '미온수 1잔 + 단백질 중심 아침 식사(달걀·두부·요거트)', desc: '하루 열생산 기초대사를 깨우고 저녁 폭식 충동을 예방합니다.' },
      { time: '☀️ 낮', title: '건더기 위주 균형식 + 식후 15분 계단·평지 보행', desc: '혈중 포도당을 지방 저장 전 근육 에너지로 즉시 연소합니다.' },
      { time: '🌙 밤', title: '저녁 7시 전 식사 완료 + 서혜부 림프 스트레칭', desc: '하체 부종 정체를 풀고 7시간 이상 숙면으로 대사 호르몬을 회복합니다.' }
    ],
    goodFoods: ['양배추·오이·해조류 (풍부한 수용성 식이섬유)', '달걀·두부·생선·살코기 (대사 유지 단백질)', '올리브유·아보카도·견과류 한 줌 (불포화지방)', '율무·호박·우엉차 (부종·노폐물 배출)'],
    avoidFoods: ['가당 음료·과일주스·디저트 (직행성 내장지방)', '국물 찌개·야간 라면 (나트륨 부종·인슐린 폭발)', '야간 음주 (지방 산화 일시 완전 정지)'],
    acupressure: { name: '귀 앞 기점(飢點) & 발목 위 삼음교혈 부종 3분 지압', howTo: '식전 15분 귀 앞 작은 돌기 중앙(기점)을 검지로 30회 지그시 누르고, 안쪽 복숭아뼈 네 마디 위(삼음교)와 종아리를 쓸어 올립니다.', benefit: '가짜 식욕 충동을 다스리고 하체 림프 부종 순환을 촉진합니다.' }
  },
  uterus: {
    tipTitle: '자궁내막 수용성과 골반 온열 혈류를 지키는 여성건강 꿀팁',
    doList: [
      { title: '하복부(관원혈)와 발목(삼음교) 상시 보온', desc: '골반과 하지 온기를 유지해 자궁 나선동맥(Spiral Artery) 수축을 예방하고 내막 미세혈류를 돕습니다.' },
      { title: '유리·스테인리스 용기 사용으로 환경호르몬 차단', desc: '비스페놀·프탈레이트 등 내분비 교란물질 노출을 줄여 난포 성숙과 호르몬 균형을 보호합니다.' },
      { title: '하루 30분 골반 순환 걷기 & 나비 자세 이완', desc: '골반강 정맥 울혈을 해소하고 자궁·난소 산소 공급을 원활하게 합니다.' }
    ],
    dontList: [
      { title: '착상 준비기·생리기 얼음 음료 & 찬 바닥 착석', desc: '자궁 평활근 수축과 프로스타글란딘 경련성 통증을 악화시킵니다.' },
      { title: '복부·서혜부를 조이는 꽉 끼는 하의 장시간 착용', desc: '골반 림프와 정맥 순환을 방해해 하복부 냉증과 염증 재발을 부릅니다.' },
      { title: '배아 이식 직후 고온 사우나·탕목욕 주의', desc: '평소에는 온찜질이 좋으나 시험관 배아 이식 직후에는 심부 고열 사우나 대신 가벼운 양말 보온만 유지하세요.' }
    ],
    routine: [
      { time: '🌅 아침', title: '체온 미온수 1잔 + 양질의 단백질·채소·견과류 아침', desc: '생식 호르몬 합성과 자궁내막 영양 공급의 기반을 다집니다.' },
      { time: '☀️ 낮', title: '다리 꼬지 않기 + 점심 후 15분 자연 일광 산책', desc: '비타민 D 합성을 통해 난소 기능과 착상 면역 균형을 돕습니다.' },
      { time: '🌙 밤', title: '발목 보온 & 편안한 이완 호흡 후 밤 11시 전 숙면', desc: '멜라토닌은 난포 내 강력한 항산화 보호 인자로도 작용합니다.' }
    ],
    goodFoods: ['검은콩·두부·석류 (식물성 영양 및 내막 보조)', '시금치·소고기·미역 (철분·엽산·조혈 영양)', '부추·단호박·아보카도 (골반 혈류 및 비타민 E)', '따뜻한 쑥차·대추차 (하복부 냉감 완화)'],
    avoidFoods: ['아이스 음료·찬 성질 생식 과다 (자궁 수축 유발)', '플라스틱 용기 고온 조리 (내분비 교란)', '트랜스지방 베이커리·액상과당 (배란 저항성 악화)'],
    acupressure: { name: '배꼽 아래 관원혈(關元穴) 온기 전달 & 삼음교혈 3분 지압', howTo: '배꼽 네 손가락 아래(관원혈)에 따뜻한 양손을 얹어 1분간 호흡하고 안쪽 복숭아뼈 위 네 손가락 지점(삼음교)을 부드럽게 누릅니다.', benefit: '하복부 냉증을 완화하고 생리 전후 골반 긴장을 편안하게 풀어줍니다.' }
  },
  prostate: {
    tipTitle: '야간뇨 없는 통잠과 골반저 활력을 지키는 전립선 · 방광 꿀팁',
    doList: [
      { title: '저녁 7시 이후 수분·수박 등 이뇨 과일 제한', desc: '하루 필요 수분은 낮 동안 충분히 섭취하고 저녁 이후 줄여야 새벽 야간뇨 각성이 줄어듭니다.' },
      { title: '하루 10분 38~40℃ 미온수 좌욕 & 골반저근 운동', desc: '전립선 주위 울혈과 골반저근 과긴장을 풀고 요도 괄약근 탄력을 강화합니다.' },
      { title: '50분 착석마다 2분 기립 보행 & 푹신한 방석 활용', desc: '회음부 압박과 전립선 정맥 울혈이 고착되지 않도록 주기적으로 순환시킵니다.' }
    ],
    dontList: [
      { title: '소변 억지로 오래 참기 · 일부 코감기약 주의', desc: '방광 배뇨근 피로를 부르며, 교감신경 자극 감기약은 전립선 요도를 급격히 수축시킬 수 있습니다.' },
      { title: '저녁 음주(특히 맥주) · 진한 커피·탄산음료', desc: '전립선 부종과 방광 점막 자극을 일으켜 빈뇨·급박뇨를 악화시킵니다.' },
      { title: '좁고 딱딱한 자전거 안장 장시간 주행', desc: '회음부 음부신경과 전립선에 직접적인 압박 염증을 유발합니다.' }
    ],
    routine: [
      { time: '🌅 아침', title: '가벼운 스쿼트 15회 × 2세트 + 익힌 토마토 식단', desc: '하체·골반 혈류를 깨우고 항산화 라이코펜을 보충합니다.' },
      { time: '☀️ 낮', title: '매시간 기립 스트레칭 + 카페인 대신 미온수', desc: '방광 자극을 줄이고 골반강 혈액순환을 유지합니다.' },
      { time: '🌙 밤', title: '미온수 좌욕/반신욕 10분 + 취침 직전 가벼운 배뇨', desc: '하초 긴장을 이완해 아침까지 깨지 않는 깊은 숙면을 돕습니다.' }
    ],
    goodFoods: ['올리브유에 익힌 토마토 (라이코펜 흡수 극대화)', '호박씨·굴·견과류 (전립선 필수 미네랄 아연·셀레늄)', '산마·검은콩·부추 (하초 원기 및 괄약근 보조)', '따뜻한 산수유차·오미자차'],
    avoidFoods: ['야간 맥주·소주 등 알코올 (전립선 충혈·요폐 위험)', '고카페인 커피·탄산·매운 국물 (방광 자극)', '기름진 육류 야식 (골반 미세염증 악화)'],
    acupressure: { name: '하복부 관원혈 온찜질 & 발바닥 용천혈(湧泉穴) 3분 지압', howTo: '배꼽 아래 아랫배를 따뜻하게 감싸고 발바닥 앞쪽 중앙 오목한 곳(용천혈)을 양 엄지로 5초씩 15회 힘 있게 눌러줍니다.', benefit: '하초 냉기를 몰아내고 골반·하지 미세순환 회복을 돕습니다.' }
  }
};

function buildBodyExplorerHtml() {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
  <title>3D 인체모형 & 바른한의원 진료 모션 탐색기 | 바른한의원 대전본점</title>
  <meta name="description" content="전체화면 3D 인체모형과 함께 바른한의원 대전본점 9대 진료 분야를 인터랙티브 그래픽모션으로 탐색하고, 연관 클리닉·부위별 생활꿀팁·해외 의학 논문 근거·질환별 비공개 Q&A를 한눈에 확인하세요." />
  <link rel="canonical" href="https://www.bareunhaniwon.com/body-explorer/" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@600;700;800&family=Pretendard:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --sky-a: #95AEF8;
      --sky-b: #BCCBFA;
      --sky-c: #E4E0FB;
      --accent-active: #2563EB;
      --ink-900: #0F172A;
      --ink-700: #334155;
      --ink-500: #64748B;
      --glass-dock: rgba(235, 241, 255, 0.56);
      --glass-border: rgba(255, 255, 255, 0.78);
      --pill-bg: rgba(255, 255, 255, 0.88);
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
      color: var(--ink-900);
      -webkit-font-smoothing: antialiased;
      user-select: none;
    }

    /* FULL-SCREEN VIBRANT WELLNESS ATMOSPHERIC STAGE */
    .vibrant-fullscreen-app {
      position: fixed;
      inset: 0;
      width: 100vw;
      height: 100vh;
      background:
        radial-gradient(circle at 22% 24%, var(--sky-a) 0%, transparent 52%),
        radial-gradient(circle at 68% 36%, var(--sky-c) 0%, transparent 58%),
        linear-gradient(135deg, var(--sky-a) 0%, var(--sky-b) 44%, var(--sky-c) 78%, #F2F5FF 100%);
      transition: background 0.8s ease;
      overflow: hidden;
    }

    /* Architectural subtle left vertical hairline (from Vibrant reference) */
    .vibrant-left-hairline {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 28px;
      width: 1px;
      background: linear-gradient(180deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.32) 50%, rgba(255,255,255,0.65) 100%);
      z-index: 15;
      pointer-events: none;
    }

    /* FULL-SCREEN WEBGL CANVAS */
    #vibrant-body-canvas {
      position: absolute;
      inset: 0;
      width: 100% !important;
      height: 100% !important;
      display: block;
      z-index: 5;
      cursor: grab;
    }
    #vibrant-body-canvas:active { cursor: grabbing; }

    /* TOP FLOATING NAVIGATION & GENDER PILL */
    .vibrant-top-bar {
      position: fixed;
      top: 18px;
      left: 44px;
      right: 28px;
      z-index: 60;
      display: flex;
      align-items: center;
      justify-content: space-between;
      pointer-events: none;
    }
    .vtb-left, .vtb-center, .vtb-right {
      pointer-events: auto;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    @media (min-width: 981px) {
      .vtb-center {
        position: fixed;
        top: 18px;
        left: 33.5%;
        transform: translateX(-50%);
      }
    }

    /* Vibrant Reference Top Gender Pill Toggle: 여성 ♀ | 남성 ♂ */
    .vibrant-gender-capsule {
      display: inline-flex;
      align-items: center;
      padding: 4px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.34);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.68);
      box-shadow: 0 8px 24px rgba(59, 89, 182, 0.12);
    }
    .vg-btn {
      appearance: none;
      border: none;
      background: transparent;
      color: #334155;
      font-size: 0.82rem;
      font-weight: 700;
      padding: 7px 18px;
      border-radius: 999px;
      cursor: pointer;
      transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);
      letter-spacing: -0.01em;
    }
    .vg-btn.active {
      background: #0B6BCB;
      color: #FFFFFF;
      box-shadow: 0 4px 12px rgba(11, 107, 203, 0.36);
    }

    .vtb-brand-link {
      display: inline-flex;
      align-items: center;
      gap: 9px;
      padding: 8px 15px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.52);
      backdrop-filter: blur(14px);
      border: 1px solid rgba(255, 255, 255, 0.75);
      color: #0F172A;
      text-decoration: none;
      font-weight: 800;
      font-size: 0.85rem;
      box-shadow: 0 6px 20px rgba(30, 58, 138, 0.08);
      transition: all 0.2s ease;
    }
    .vtb-brand-link:hover {
      background: rgba(255, 255, 255, 0.85);
      transform: translateY(-1px);
    }
    .brand-nodes-svg {
      color: #1E3A8A;
      display: flex;
    }

    .vtb-nav-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 14px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.62);
      backdrop-filter: blur(14px);
      border: 1px solid rgba(255, 255, 255, 0.82);
      color: #0F172A;
      text-decoration: none;
      font-size: 0.8rem;
      font-weight: 800;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .vtb-nav-pill:hover {
      background: #FFFFFF;
      transform: translateY(-1px);
    }
    .vtb-nav-pill.dark {
      background: rgba(15, 23, 42, 0.88);
      border-color: rgba(15, 23, 42, 0.95);
      color: #FFFFFF;
    }

    /* BOTTOM-LEFT CAMERA QUICK CONTROLS */
    .vibrant-bottom-left-hud {
      position: fixed;
      left: 48px;
      bottom: 24px;
      z-index: 55;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .hud-chip-btn {
      appearance: none;
      border: 1px solid rgba(255, 255, 255, 0.78);
      background: rgba(255, 255, 255, 0.52);
      backdrop-filter: blur(14px);
      color: #1E293B;
      font-size: 0.78rem;
      font-weight: 800;
      padding: 8px 14px;
      border-radius: 999px;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 6px 18px rgba(30, 58, 138, 0.08);
    }
    .hud-chip-btn:hover { background: rgba(255, 255, 255, 0.9); }

    /* 3D HOTSPOTS OVERLAY (Exact Vibrant Glowing Double-Ring White Dots) */
    #hotspot-overlay-layer, #sub-hotspot-overlay-layer {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 25;
      overflow: hidden;
    }
    #sub-hotspot-overlay-layer { z-index: 30; }

    .vibrant-hotspot {
      position: absolute;
      width: 34px;
      height: 34px;
      transform: translate(-50%, -50%);
      pointer-events: auto;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity 0.28s ease, transform 0.28s ease;
    }
    .vh-dot-outer {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255,255,255,0.45) 0%, rgba(165,192,255,0.28) 70%);
      border: 1.5px solid rgba(255, 255, 255, 0.92);
      box-shadow: 0 0 18px rgba(255, 255, 255, 0.68), inset 0 0 8px rgba(255, 255, 255, 0.55);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: all 0.28s cubic-bezier(0.22, 1, 0.36, 1);
      animation: hotspotBreathe 3.2s ease-in-out infinite;
    }
    @keyframes hotspotBreathe {
      0%, 100% { transform: scale(1); box-shadow: 0 0 16px rgba(255,255,255,0.62); }
      50% { transform: scale(1.09); box-shadow: 0 0 26px rgba(255,255,255,0.92); }
    }
    .vh-dot-core {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #FFFFFF;
      box-shadow: 0 0 8px #FFFFFF;
    }
    .vh-hover-pill {
      position: absolute;
      left: calc(100% + 10px);
      top: 50%;
      padding: 5px 11px;
      border-radius: 999px;
      background: rgba(15, 23, 42, 0.86);
      backdrop-filter: blur(8px);
      color: #FFFFFF;
      font-size: 0.75rem;
      font-weight: 700;
      white-space: nowrap;
      opacity: 0;
      transform: translate(-6px, -50%);
      pointer-events: none;
      transition: all 0.2s ease;
    }
    .vibrant-hotspot:hover .vh-hover-pill,
    .vibrant-hotspot.active .vh-hover-pill {
      opacity: 1;
      transform: translate(0, -50%);
    }
    .vibrant-hotspot.active .vh-dot-outer {
      background: var(--accent-active);
      border-color: #FFFFFF;
      transform: scale(1.18);
      box-shadow: 0 0 0 6px rgba(255, 255, 255, 0.38), 0 8px 22px rgba(37, 99, 235, 0.5);
      animation: none;
    }
    .vibrant-hotspot.dimmed {
      opacity: 0.36;
    }

    /* CASCADED SECONDARY 3D SUB-FOCUS CALLOUT PILLS */
    .sub-focus-3d-pill {
      position: absolute;
      transform: translate(-50%, -135%) scale(0.86);
      opacity: 0;
      pointer-events: auto;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.92);
      backdrop-filter: blur(12px);
      border: 1.5px solid var(--accent-active);
      color: #0F172A;
      font-size: 0.75rem;
      font-weight: 800;
      white-space: nowrap;
      box-shadow: 0 8px 22px rgba(15, 23, 42, 0.16);
      transition: opacity 0.36s ease, transform 0.36s cubic-bezier(0.22, 1, 0.36, 1), background 0.2s ease;
    }
    .sub-focus-3d-pill.visible {
      opacity: 1;
      transform: translate(-50%, -135%) scale(1);
    }
    .sub-focus-3d-pill:hover, .sub-focus-3d-pill.active {
      background: var(--accent-active);
      color: #FFFFFF;
    }
    .sf-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--accent-active);
    }
    .sub-focus-3d-pill:hover .sf-dot, .sub-focus-3d-pill.active .sf-dot {
      background: #FFFFFF;
    }

    .vibrant-fullscreen-app p, .vibrant-menu-dock p { margin: 0 !important; }
    .vibrant-fullscreen-app button { text-transform: none; }

    /* ======================================================================
       RIGHT-SIDE FROSTED GLASS CLINIC MENU DOCK (Vibrant Wellness Layout!)
       ====================================================================== */
    .vibrant-menu-dock {
      position: fixed;
      right: 28px;
      bottom: 16px;
      width: min(390px, calc(100vw - 48px));
      max-height: calc(100vh - 76px);
      overflow-y: auto;
      scrollbar-width: thin;
      z-index: 65;
      padding: 15px 16px;
      border-radius: 26px;
      background: var(--glass-dock);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border: 1.5px solid var(--glass-border);
      box-shadow: 0 24px 60px rgba(42, 67, 145, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.85);
      transition: width 0.35s cubic-bezier(0.22, 1, 0.36, 1);
    }
    .vibrant-menu-dock.expanded-cascade {
      width: min(440px, calc(100vw - 48px));
    }
    .vibrant-menu-dock::-webkit-scrollbar { width: 5px; }
    .vibrant-menu-dock::-webkit-scrollbar-thumb { background: rgba(100, 116, 139, 0.28); border-radius: 999px; }

    .dock-header-title {
      text-align: center;
      font-size: 0.86rem;
      font-weight: 800;
      color: #1E293B;
      letter-spacing: -0.01em;
      margin-bottom: 12px;
    }

    .clinic-pill-list {
      display: flex;
      flex-direction: column;
      gap: 7px;
    }
    .vibrant-clinic-pill {
      width: 100%;
      appearance: none;
      border: 1px solid rgba(255, 255, 255, 0.92);
      background: var(--pill-bg);
      border-radius: 18px;
      padding: 12px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      cursor: pointer;
      text-align: left;
      text-decoration: none;
      color: #0F172A;
      box-shadow: 0 4px 14px rgba(51, 78, 158, 0.06);
      transition: all 0.22s cubic-bezier(0.22, 1, 0.36, 1);
    }
    .vibrant-clinic-pill:hover {
      background: #FFFFFF;
      transform: translateX(-3px);
      box-shadow: 0 10px 24px rgba(37, 99, 235, 0.14);
      border-color: #93C5FD;
    }
    .vcp-left {
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 0;
    }
    .vcp-icon {
      width: 34px;
      height: 34px;
      border-radius: 11px;
      background: rgba(224, 231, 255, 0.72);
      color: #1E3A8A;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: all 0.2s ease;
    }
    .vibrant-clinic-pill:hover .vcp-icon {
      background: #2563EB;
      color: #FFFFFF;
    }
    .vcp-title {
      font-size: 0.9rem;
      font-weight: 800;
      color: #0F172A;
      line-height: 1.25;
    }
    .vcp-sub {
      font-size: 0.73rem;
      font-weight: 600;
      color: #64748B;
      margin-top: 2px;
    }
    .vcp-chevron {
      font-size: 1.1rem;
      font-weight: 700;
      color: #475569;
      flex-shrink: 0;
    }

    /* SEQUENTIAL CASCADING ANIMATION FOR RELATED SUB-MENUS */
    .cascade-stage {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .cascade-step {
      opacity: 0;
      transform: translateY(12px);
      animation: cascadeReveal 0.42s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    }
    .cascade-step.d1 { animation-delay: 0.04s; }
    .cascade-step.d2 { animation-delay: 0.12s; }
    .cascade-step.d3 { animation-delay: 0.21s; }
    .cascade-step.d4 { animation-delay: 0.30s; }
    @keyframes cascadeReveal {
      to { opacity: 1; transform: translateY(0); }
    }

    .cascade-back-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }
    .cascade-back-btn {
      appearance: none;
      border: 1px solid rgba(255, 255, 255, 0.9);
      background: rgba(255, 255, 255, 0.78);
      color: #1E293B;
      font-size: 0.78rem;
      font-weight: 800;
      padding: 6px 12px;
      border-radius: 999px;
      cursor: pointer;
    }
    .cascade-back-btn:hover { background: #FFFFFF; }

    .active-motion-card {
      background: rgba(255, 255, 255, 0.92);
      border: 1.5px solid #BFDBFE;
      border-radius: 20px;
      padding: 12px 14px;
    }
    .amc-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.71rem;
      font-weight: 800;
      color: var(--accent-active);
      background: #EFF6FF;
      padding: 3px 10px;
      border-radius: 999px;
      margin-bottom: 6px;
    }
    .amc-live-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--accent-active);
      animation: pulseDot 1.4s infinite;
    }
    @keyframes pulseDot {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.45; transform: scale(1.35); }
    }

    .cascade-group-label {
      font-size: 0.73rem;
      font-weight: 800;
      color: #334155;
      letter-spacing: 0.03em;
      margin: 2px 2px 5px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .action-grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 7px;
    }
    .cascade-action-btn {
      appearance: none;
      border: 1px solid rgba(255, 255, 255, 0.92) !important;
      background: rgba(255, 255, 255, 0.9) !important;
      border-radius: 14px;
      padding: 10px 12px;
      text-align: left;
      cursor: pointer;
      text-decoration: none;
      color: #0F172A !important;
      transition: all 0.2s ease;
      display: flex;
      flex-direction: column;
      gap: 3px;
    }
    .cascade-action-btn:hover {
      background: #FFFFFF !important;
      border-color: var(--accent-active) !important;
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(37, 99, 235, 0.14);
    }
    .cascade-action-btn.primary-qna {
      grid-column: span 2;
      background: linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%) !important;
      border-color: #1E3A8A !important;
      color: #FFFFFF !important;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 11px 15px;
    }

    /* SLIDE-OVER KNOWLEDGE DRAWER (LIFESTYLE TIPS OR INTERNATIONAL SCI PAPERS) */
    .glass-drawer-backdrop {
      position: fixed;
      inset: 0;
      z-index: 200;
      background: rgba(15, 23, 42, 0.36);
      backdrop-filter: blur(6px);
      display: none;
      justify-content: flex-end;
    }
    .glass-drawer-backdrop.open { display: flex; }
    .glass-drawer-panel {
      width: min(680px, 100vw);
      height: 100vh;
      overflow-y: auto;
      background: rgba(255, 255, 255, 0.97);
      padding: 30px 32px 60px;
      box-shadow: -20px 0 60px rgba(15, 23, 42, 0.22);
      user-select: text;
      animation: slideInRight 0.28s cubic-bezier(0.22, 1, 0.36, 1);
    }
    @keyframes slideInRight {
      from { transform: translateX(40px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    .drawer-top-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding-bottom: 16px;
      border-bottom: 1px solid #E2E8F0;
      margin-bottom: 20px;
    }
    .drawer-close-btn {
      padding: 8px 14px;
      border-radius: 999px;
      border: 1px solid #CBD5E1;
      background: #F8FAFC;
      font-weight: 800;
      font-size: 0.82rem;
      cursor: pointer;
    }
    .dodont-2col {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
      margin-bottom: 18px;
    }
    .tip-box-do { background: #F0FDF4; border: 1.5px solid #86EFAC; border-radius: 16px; padding: 16px; }
    .tip-box-dont { background: #FEF2F2; border: 1.5px solid #FECACA; border-radius: 16px; padding: 16px; }

    /* LOADER */
    #dongin-loader-overlay {
      position: fixed;
      inset: 0;
      z-index: 120;
      background: linear-gradient(135deg, #9BB2F8 0%, #DCE4FD 100%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
      transition: opacity 0.45s ease, visibility 0.45s ease;
    }
    #dongin-loader-overlay.hidden { opacity: 0; visibility: hidden; pointer-events: none; }
    .loader-ring {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      border: 3px solid rgba(255,255,255,0.45);
      border-top-color: #0B6BCB;
      animation: spin 0.85s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    @media (max-width: 980px) {
      .vibrant-left-hairline { display: none; }
      .vibrant-top-bar { left: 14px; right: 14px; top: 12px; flex-wrap: wrap; gap: 8px; }
      .vtb-right .hide-mobile { display: none; }
      .vibrant-menu-dock, .vibrant-menu-dock.expanded-cascade {
        left: 12px;
        right: 12px;
        bottom: 12px;
        width: auto;
        max-height: 44vh;
        padding: 16px 14px;
      }
      .vibrant-bottom-left-hud { bottom: auto; top: 64px; left: 14px; }
      .dodont-2col { grid-template-columns: 1fr; }
    }
  </style>
  <link rel="icon" href="data:,">
</head>
<body>

  <div class="vibrant-fullscreen-app" id="vibrant-3d-stage">
    <div class="vibrant-left-hairline"></div>

    <!-- LOADER -->
    <div id="dongin-loader-overlay">
      <div class="loader-ring"></div>
      <div style="font-size:0.88rem;font-weight:800;color:#1E3A8A;">3D 인체 장기 · 척추 · 신경 그래픽모션 로딩 중...</div>
    </div>

    <!-- TOP BAR: BRAND (LEFT) | GENDER PILL (CENTER — Vibrant Style!) | PORTAL LINKS (RIGHT) -->
    <header class="vibrant-top-bar">
      <div class="vtb-left">
        <a href="story-3d.html" class="vtb-brand-link">
          <span class="brand-nodes-svg">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><circle cx="7" cy="6" r="2.6"/><circle cx="17" cy="6" r="2.6"/><circle cx="12" cy="12" r="2.8"/><circle cx="9" cy="18.5" r="2.3"/><circle cx="15" cy="18.5" r="2.3"/></svg>
          </span>
          <span>바른한의원 · 3D BODY EXPLORER</span>
        </a>
      </div>

      <div class="vtb-center">
        <div class="vibrant-gender-capsule" role="group" aria-label="3D 인체 성별 전환">
          <button type="button" class="vg-btn active" id="btn-gender-female" onclick="window.setDonginGender('female')">여성 ♀</button>
          <button type="button" class="vg-btn" id="btn-gender-male" onclick="window.setDonginGender('male')">남성 ♂</button>
        </div>
      </div>

      <div class="vtb-right">
        <a href="ask-doctor.html?tab=blog" class="vtb-nav-pill hide-mobile">📘 의학 인사이트 칼럼</a>
        <a href="ask-doctor.html?tab=qna" class="vtb-nav-pill dark" id="top-qna-shortcut">🔒 질환별 비공개 Q&amp;A</a>
        <a href="story-3d.html" class="vtb-nav-pill">← 메인 쇼룸</a>
      </div>
    </header>

    <!-- FULL-SCREEN WEBGL 3D CANVAS & HOTSPOT LAYERS -->
    <canvas id="vibrant-body-canvas"></canvas>
    <div id="hotspot-overlay-layer"></div>
    <div id="sub-hotspot-overlay-layer"></div>

    <!-- BOTTOM-LEFT VIEW CONTROLS -->
    <div class="vibrant-bottom-left-hud">
      <button type="button" class="hud-chip-btn" onclick="window.resetToVibrantOverview(false)">↺ 상반신 기본뷰</button>
      <button type="button" class="hud-chip-btn" onclick="window.resetToVibrantOverview(true)">🧍 전신 한눈에 보기</button>
    </div>

    <!-- RIGHT-SIDE FROSTED GLASS BARUEN CLINIC MENU DOCK (Vibrant Reference + Cascading Sub-Menus!) -->
    <aside class="vibrant-menu-dock" id="vibrant-menu-dock" aria-label="바른한의원 진료 살펴보기 및 연관 메뉴">
      <div id="dock-dynamic-inner"></div>
    </aside>
  </div>

  <!-- SLIDE-OVER DRAWER FOR LIFESTYLE TIPS & INTERNATIONAL SCI PAPERS -->
  <div class="glass-drawer-backdrop" id="knowledge-drawer-backdrop" onclick="if(event.target===this) window.closeKnowledgeDrawer()">
    <div class="glass-drawer-panel" id="knowledge-drawer-panel"></div>
  </div>

  <script>
  (async function() {
    const BODY_PARTS_DATA = ${JSON.stringify(BODY_PARTS)};
    const CLINIC_MENUS = ${JSON.stringify(CLINIC_MENU_CONFIG)};
    const PART_TIPS_MAP = ${JSON.stringify(PART_LIFESTYLE_TIPS)};
    const QNA_CATS_MAP = ${JSON.stringify(DISEASE_QNA_CATEGORIES)};

    // Legacy ?tab=blog redirect support
    const earlyParams = new URLSearchParams(window.location.search);
    if (earlyParams.get('tab') === 'blog' || earlyParams.get('blog') === '1') {
      window.location.replace('ask-doctor.html?tab=blog');
      return;
    }

    let currentPartId = null;
    const stageEl = document.getElementById('vibrant-3d-stage');
    const canvas = document.getElementById('vibrant-body-canvas');
    const hotspotLayer = document.getElementById('hotspot-overlay-layer');
    const loaderOverlay = document.getElementById('dongin-loader-overlay');
    const dockEl = document.getElementById('vibrant-menu-dock');
    const dockInner = document.getElementById('dock-dynamic-inner');
    const topQnaLink = document.getElementById('top-qna-shortcut');

    function esc(s) {
      return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function setSkyPalette(skyA, skyB, skyC, accent) {
      const root = document.documentElement;
      root.style.setProperty('--sky-a', skyA || '#95AEF8');
      root.style.setProperty('--sky-b', skyB || '#BCCBFA');
      root.style.setProperty('--sky-c', skyC || '#E4E0FB');
      root.style.setProperty('--accent-active', accent || '#2563EB');
    }

    // RENDER INITIAL VIBRANT CATEGORY LIST ("바른한의원 진료 살펴보기")
    function renderOverviewMenuDock() {
      if (!dockInner || !dockEl) return;
      dockEl.classList.remove('expanded-cascade');
      setSkyPalette('#95AEF8', '#BCCBFA', '#E4E0FB', '#2563EB');
      if (topQnaLink) topQnaLink.setAttribute('href', 'ask-doctor.html?tab=qna');

      dockInner.innerHTML =
        '<div class="dock-header-title">바른한의원 진료 살펴보기</div>' +
        '<div class="clinic-pill-list">' +
          CLINIC_MENUS.map(item =>
            '<button type="button" class="vibrant-clinic-pill" data-menu-part="' + item.id + '" onclick="window.activateClinicMotion(\\'' + item.id + '\\')">' +
              '<div class="vcp-left">' +
                '<div class="vcp-icon">' + item.svgIcon + '</div>' +
                '<div>' +
                  '<div class="vcp-title">' + esc(item.menuTitle) + '</div>' +
                  '<div class="vcp-sub">' + esc(item.menuSub) + '</div>' +
                '</div>' +
              '</div>' +
              '<span class="vcp-chevron">›</span>' +
            '</button>'
          ).join('') +
        '</div>';
    }

    // RENDER CASCADED RELATED SUB-MENUS AFTER 3D MOTION ACTIVATION!
    function renderCascadedRelatedMenu(cfg) {
      if (!dockInner || !dockEl) return;
      dockEl.classList.add('expanded-cascade');
      setSkyPalette(cfg.skyA, cfg.skyB, cfg.skyC, cfg.accent);
      if (topQnaLink) topQnaLink.setAttribute('href', 'ask-doctor.html?tab=qna&part=' + cfg.id);

      const relatedClinicHtml = (cfg.relatedClinics || []).map(rc =>
        '<a href="' + rc.href + '" class="vibrant-clinic-pill" style="padding:8px 12px;border-radius:14px;">' +
          '<div class="vcp-left" style="gap:10px;">' +
            '<div class="vcp-icon" style="width:28px;height:28px;border-radius:9px;background:#EFF6FF;color:' + cfg.accent + ';font-size:0.8rem;">✦</div>' +
            '<div>' +
              '<div class="vcp-title" style="font-size:0.83rem;">' + esc(rc.title) + '</div>' +
              '<div class="vcp-sub" style="font-size:0.7rem;">' + esc(rc.desc) + '</div>' +
            '</div>' +
          '</div>' +
          '<span class="vcp-chevron">↗</span>' +
        '</a>'
      ).join('');

      const subChipsHtml = (cfg.subFocus3D || []).map((sp, i) =>
        '<button type="button" onclick="window.clickDockSubChip(' + i + ')" style="appearance:none;border:1px solid #CBD5E1;background:#F8FAFC;color:#1E293B;font-size:0.74rem;font-weight:700;padding:5px 10px;border-radius:999px;cursor:pointer;">🎯 ' + esc(sp.label) + '</button>'
      ).join('');

      dockInner.innerHTML =
        '<div class="cascade-stage">' +
          '<div class="cascade-step d1 cascade-back-row">' +
            '<button type="button" class="cascade-back-btn" onclick="window.resetToVibrantOverview(false)">← 진료 카테고리 전체보기</button>' +
            '<span style="font-size:0.74rem;font-weight:800;color:#334155;">3D 그래픽모션 활성</span>' +
          '</div>' +

          '<div class="cascade-step d1 active-motion-card">' +
            '<div class="amc-badge"><span class="amc-live-dot"></span><span>3D ANATOMY MOTION ACTIVE</span></div>' +
            '<div style="font-size:1.06rem;font-weight:800;color:#0F172A;margin-bottom:4px;">' + esc(cfg.menuTitle) + '</div>' +
            '<p style="font-size:0.8rem;color:#475569;line-height:1.52;" id="sub-focus-live-note">' + esc(cfg.motionDesc) + '</p>' +
            '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:10px;">' + subChipsHtml + '</div>' +
          '</div>' +

          '<div class="cascade-step d2">' +
            '<div class="cascade-group-label">① 연관 세부 진료 클리닉 바로가기</div>' +
            '<div class="clinic-pill-list">' + relatedClinicHtml + '</div>' +
          '</div>' +

          '<div class="cascade-step d3">' +
            '<div class="cascade-group-label">② 이어서 확인하는 맞춤 정보 &amp; 비공개 상담</div>' +
            '<div class="action-grid-2">' +
              '<button type="button" class="cascade-action-btn" onclick="window.openKnowledgeDrawer(\\'tips\\', \\'' + cfg.id + '\\')">' +
                '<span style="font-size:0.74rem;font-weight:800;color:#059669;">💡 HOME CARE</span>' +
                '<strong style="font-size:0.85rem;">생활꿀팁 · 루틴 · 지압</strong>' +
              '</button>' +
              '<button type="button" class="cascade-action-btn" onclick="window.openKnowledgeDrawer(\\'papers\\', \\'' + cfg.id + '\\')">' +
                '<span style="font-size:0.74rem;font-weight:800;color:#2563EB;">🌍 SCI EVIDENCE</span>' +
                '<strong style="font-size:0.85rem;">해외·통합의학 논문 근거</strong>' +
              '</button>' +
              '<a href="ask-doctor.html?tab=qna&part=' + cfg.id + '" class="cascade-action-btn primary-qna">' +
                '<div>' +
                  '<div style="font-size:0.7rem;font-weight:800;color:#93C5FD;">MEMBERS ONLY · 100% 비공개</div>' +
                  '<div style="font-size:0.88rem;font-weight:800;">🔒 이 질환 1:1 비공개 Q&amp;A 질문하기</div>' +
                '</div>' +
                '<span style="font-size:1.05rem;font-weight:800;">→</span>' +
              '</a>' +
            '</div>' +
          '</div>' +

          '<div class="cascade-step d4" style="display:flex;justify-content:space-between;padding:4px 4px 0;font-size:0.76rem;font-weight:700;color:#334155;">' +
            '<span>다른 진료 바로 전환:</span>' +
            '<div style="display:flex;gap:8px;">' +
              CLINIC_MENUS.filter(m => m.id !== cfg.id).slice(0, 3).map(m =>
                '<button type="button" onclick="window.activateClinicMotion(\\'' + m.id + '\\')" style="border:none;background:transparent;color:#1D4ED8;font-weight:800;cursor:pointer;text-decoration:underline;">' + esc(m.menuTitle.split('·')[0].trim()) + '</button>'
              ).join('') +
            '</div>' +
          '</div>' +
        '</div>';
    }

    window.onResetMenuDock = function() {
      renderOverviewMenuDock();
    };

    window.updateSubFocusNote = function(label, note) {
      const el = document.getElementById('sub-focus-live-note');
      if (el) el.innerHTML = '<strong>[' + esc(label) + ']</strong> ' + esc(note);
    };

    // KNOWLEDGE SLIDE-OVER DRAWER (LIFESTYLE TIPS / INTERNATIONAL SCI PAPERS)
    window.openKnowledgeDrawer = function(mode, partId) {
      const backdrop = document.getElementById('knowledge-drawer-backdrop');
      const panel = document.getElementById('knowledge-drawer-panel');
      if (!backdrop || !panel) return;
      const cfg = CLINIC_MENUS.find(m => m.id === partId) || CLINIC_MENUS[0];

      if (mode === 'tips') {
        const t = PART_TIPS_MAP[partId] || PART_TIPS_MAP.knee;
        panel.innerHTML =
          '<div class="drawer-top-bar">' +
            '<div>' +
              '<div style="font-size:0.74rem;font-weight:800;color:#059669;">LIFESTYLE &amp; ACUPRESSURE GUIDE</div>' +
              '<h2 style="font-size:1.25rem;font-weight:800;color:#0F172A;">' + esc(t.tipTitle) + '</h2>' +
            '</div>' +
            '<button type="button" class="drawer-close-btn" onclick="window.closeKnowledgeDrawer()">✕ 닫기</button>' +
          '</div>' +
          '<div class="dodont-2col">' +
            '<div class="tip-box-do">' +
              '<div style="font-size:0.95rem;font-weight:800;color:#14532D;margin-bottom:10px;">✅ 꼭 실천할 DO 3</div>' +
              t.doList.map(d => '<div style="margin-bottom:10px;background:#FFF;padding:11px;border-radius:11px;"><div style="font-size:0.88rem;font-weight:800;">' + esc(d.title) + '</div><div style="font-size:0.82rem;color:#374151;margin-top:3px;line-height:1.55;">' + esc(d.desc) + '</div></div>').join('') +
            '</div>' +
            '<div class="tip-box-dont">' +
              '<div style="font-size:0.95rem;font-weight:800;color:#991B1B;margin-bottom:10px;">❌ 피해야 할 DON&apos;T 3</div>' +
              t.dontList.map(d => '<div style="margin-bottom:10px;background:#FFF;padding:11px;border-radius:11px;"><div style="font-size:0.88rem;font-weight:800;">' + esc(d.title) + '</div><div style="font-size:0.82rem;color:#374151;margin-top:3px;line-height:1.55;">' + esc(d.desc) + '</div></div>').join('') +
            '</div>' +
          '</div>' +
          '<div style="background:#FFFBEB;border:1.5px solid #FCD34D;border-radius:16px;padding:18px;margin-bottom:16px;">' +
            '<div style="font-size:0.92rem;font-weight:800;color:#92400E;margin-bottom:10px;">⏰ 아침 · 낮 · 밤 생체리듬 루틴</div>' +
            t.routine.map(r => '<div style="margin-bottom:8px;font-size:0.86rem;line-height:1.55;"><strong>' + esc(r.time) + ' · ' + esc(r.title) + ':</strong> ' + esc(r.desc) + '</div>').join('') +
          '</div>' +
          '<div style="background:#ECFDF5;border:1.5px solid #6EE7B7;border-radius:16px;padding:18px;margin-bottom:16px;">' +
            '<div style="font-size:0.78rem;font-weight:800;color:#065F46;">🤲 3분 셀프 혈자리 지압 가이드</div>' +
            '<div style="font-size:1rem;font-weight:800;color:#0F172A;margin:4px 0 6px;">' + esc(t.acupressure.name) + '</div>' +
            '<div style="font-size:0.86rem;color:#1E293B;line-height:1.6;">' + esc(t.acupressure.howTo) + '</div>' +
            '<div style="font-size:0.83rem;font-weight:700;color:#047857;margin-top:6px;">✨ ' + esc(t.acupressure.benefit) + '</div>' +
          '</div>' +
          '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">' +
            '<div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:14px;padding:14px;"><strong style="font-size:0.86rem;color:#065F46;">🥗 권장 식품</strong><ul style="padding-left:16px;margin-top:6px;font-size:0.82rem;line-height:1.65;">' + t.goodFoods.map(f => '<li>' + esc(f) + '</li>').join('') + '</ul></div>' +
            '<div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:14px;padding:14px;"><strong style="font-size:0.86rem;color:#9A3412;">⚠️ 주의 식품</strong><ul style="padding-left:16px;margin-top:6px;font-size:0.82rem;line-height:1.65;">' + t.avoidFoods.map(f => '<li>' + esc(f) + '</li>').join('') + '</ul></div>' +
          '</div>';
      } else {
        const qCat = QNA_CATS_MAP.find(c => c.partId === partId) || QNA_CATS_MAP[0];
        const partRaw = BODY_PARTS_DATA.find(p => p.id === partId);
        const extraSci = (partRaw && partRaw.sciPapers) ? partRaw.sciPapers : [];

        panel.innerHTML =
          '<div class="drawer-top-bar">' +
            '<div>' +
              '<div style="font-size:0.74rem;font-weight:800;color:#2563EB;">OVERSEAS &amp; INTEGRATIVE SCI EVIDENCE</div>' +
              '<h2 style="font-size:1.25rem;font-weight:800;color:#0F172A;">🌍 ' + esc(cfg.menuTitle) + ' — 해외 및 통합의학 논문 근거</h2>' +
            '</div>' +
            '<button type="button" class="drawer-close-btn" onclick="window.closeKnowledgeDrawer()">✕ 닫기</button>' +
          '</div>' +
          '<p style="font-size:0.9rem;color:#334155;line-height:1.65;margin-bottom:18px;">한의학·통합약리학 SCI 학술지뿐만 아니라 해외 메이저 의학 저널에 등재된 생리학·임상의학 연구 결과를 함께 참고하여 객관적 건강 기준을 제시합니다.</p>' +
          '<h3 style="font-size:0.95rem;font-weight:800;color:#1E3A8A;margin-bottom:10px;">📘 해외 메이저 의학 학술지 핵심 근거</h3>' +
          (qCat.overseasPapers || []).map(p =>
            '<div style="background:#EFF6FF;border:1px solid #BFDBFE;border-radius:15px;padding:15px 16px;margin-bottom:10px;">' +
              '<div style="font-size:0.74rem;font-weight:800;color:#1D4ED8;">' + esc(p.badge) + ' · ' + esc(p.journal) + '</div>' +
              '<div style="font-size:0.8rem;color:#475569;margin:3px 0 6px;">' + esc(p.citation) + '</div>' +
              '<div style="font-size:0.87rem;font-weight:600;color:#0F172A;line-height:1.58;">' + esc(p.finding) + '</div>' +
            '</div>'
          ).join('') +
          '<h3 style="font-size:0.95rem;font-weight:800;color:#065F46;margin:18px 0 10px;">🌿 통합의학 · 생체역학 SCI 학술 문헌</h3>' +
          (qCat.integrativePapers || []).map(p =>
            '<div style="background:#ECFDF5;border:1px solid #A7F3D0;border-radius:15px;padding:15px 16px;margin-bottom:10px;">' +
              '<div style="font-size:0.74rem;font-weight:800;color:#047857;">' + esc(p.badge) + ' · ' + esc(p.journal) + '</div>' +
              '<div style="font-size:0.8rem;color:#475569;margin:3px 0 6px;">' + esc(p.citation) + '</div>' +
              '<div style="font-size:0.87rem;font-weight:600;color:#0F172A;line-height:1.58;">' + esc(p.finding) + '</div>' +
            '</div>'
          ).join('') +
          extraSci.map(s =>
            '<div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:13px;padding:12px 14px;margin-bottom:8px;">' +
              '<div style="font-size:0.75rem;font-weight:800;color:#334155;">' + esc(s.journal) + '</div>' +
              '<div style="font-size:0.85rem;color:#0F172A;margin-top:2px;">' + esc(s.title) + '</div>' +
            '</div>'
          ).join('') +
          '<div style="margin-top:20px;display:flex;gap:10px;flex-wrap:wrap;">' +
            '<a href="ask-doctor.html?tab=blog" style="padding:12px 18px;border-radius:999px;background:#2563EB;color:#FFF;font-weight:800;font-size:0.86rem;text-decoration:none;">📘 대표 의학 인사이트 칼럼 전문 읽기 →</a>' +
            '<a href="ask-doctor.html?tab=qna&part=' + partId + '" style="padding:12px 18px;border-radius:999px;background:#0F172A;color:#FFF;font-weight:800;font-size:0.86rem;text-decoration:none;">🔒 이 질환 비공개 질문하기 →</a>' +
          '</div>';
      }

      backdrop.classList.add('open');
    };

    window.closeKnowledgeDrawer = function() {
      document.getElementById('knowledge-drawer-backdrop')?.classList.remove('open');
    };

    // Initial dock render immediately (0ms)
    renderOverviewMenuDock();
    setTimeout(() => { if (loaderOverlay) loaderOverlay.classList.add('hidden'); }, 4800);

${WEBGL_PART_A}

    // CORE INTERACTION: CLICK CLINIC MENU -> 3D GRAPHIC MOTION -> CASCADING RELATED MENUS!
    window.activateClinicMotion = function(partId) {
      const cfg = CLINIC_MENUS.find(m => m.id === partId) || CLINIC_MENUS[0];
      currentPartId = cfg.id;

      // Auto-switch gender model for female/male reproductive anatomy
      if (cfg.id === 'uterus') {
        window.setDonginGender('female');
      } else if (cfg.id === 'prostate') {
        window.setDonginGender('male');
      }

      // Highlight active 3D hotspot & softly dim others
      majorHotspotNodes.forEach(h => {
        h.dom.classList.toggle('active', h.id === cfg.id);
        h.dom.classList.toggle('dimmed', h.id !== cfg.id);
      });

      // 1) Trigger 3D Bio-Scan + X-Ray Organ Reveal + Orbital Gyro-Rings + Pathway Particles
      window.trigger3DGraphicMotion(cfg.id, cfg.preset, cfg.accent);

      // 2) Sequentially Activate Related 3D Sub-Focus Pills & Cascaded Right-Side Related Menus!
      window.spawnSubHotspots3D(cfg.subFocus3D || []);
      renderCascadedRelatedMenu(cfg);
    };

    window.clickDockSubChip = function(idx) {
      const cfg = CLINIC_MENUS.find(m => m.id === currentPartId);
      if (!cfg || !cfg.subFocus3D || !cfg.subFocus3D[idx]) return;
      const pills = document.querySelectorAll('.sub-focus-3d-pill');
      pills.forEach((el, i) => el.classList.toggle('active', i === idx));
      window.focusSubPoint3D(cfg.subFocus3D[idx]);
    };

    // Backward-compatible alias
    window.selectBodyPart = function(partId) {
      window.activateClinicMotion(partId);
    };

${WEBGL_PART_B}

    const urlPart = earlyParams.get('part');
    if (urlPart && CLINIC_MENUS.some(m => m.id === urlPart)) {
      window.activateClinicMotion(urlPart);
    } else {
      window.resetToVibrantOverview(false);
    }
    animate();
  })();
  </script>
</body>
</html>`;
}

const outPath = path.join(__dirname, 'body-explorer.html');
const html = buildBodyExplorerHtml();
fs.writeFileSync(outPath, html, 'utf8');
console.log('✅ Generated Full-Screen Vibrant 3D Body & Clinic Motion Explorer (body-explorer.html):', outPath, '(' + html.length + ' bytes)');
