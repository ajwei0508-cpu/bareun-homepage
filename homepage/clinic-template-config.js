/**
 * ============================================================================
 * 🏛️ BAREUN KOREAN MEDICINE — B2B WHITE-LABEL MASTER TEMPLATE CONFIG
 * ============================================================================
 * 전국 한의원 템플릿 납품 시 아래 JSON 객체(CLINIC_TEMPLATE_CONFIG)만 수정하면
 * 메인 3D 시네마(index.html / story-3d.html) 및 6대 클리닉 상세페이지 전체의
 * 한의원명, 대표원장명, 연락처, 진료시간, 주소, 기본 테마/시안성 모드가 즉시 변경됩니다.
 */
window.CLINIC_TEMPLATE_CONFIG = {
  // 1. 한의원 기본 브랜드 정보
  clinicName: '바른한의원',
  clinicNameEn: 'BAREUN KOREAN MEDICINE CLINIC',
  directorName: '안정위',
  directorTitle: '대표원장',
  careerYears: '15년',
  slogan: '바른 마음, 정직한 처방 · 평생 주치의 한의원',

  // 2. 연락처 및 예약 채널
  phone: '042-488-1075',
  kakaoUrl: 'https://pf.kakao.com/_ykxcLK',
  naverBookingUrl: 'https://naver.me/5U1ELn8L',
  address: '대전광역시 서구 둔산로 (둔산동, 바른한의원 빌딩 3층 · 전용 주차장 완비)',

  // 3. 진료 시간 안내 (환자 신뢰 & 시안성 정보)
  hours: [
    { day: '평일 (월~금)', time: '09:30 ~ 20:30 (야간진료 운영)' },
    { day: '토요일 · 공휴일', time: '09:30 ~ 15:00 (점심시간 없이 진료)' },
    { day: '점심시간 (평일)', time: '13:00 ~ 14:00' },
    { day: '정기휴진', time: '매주 일요일' }
  ],

  // 4. 기본 테마 & 시안성 프리셋 ('dark-royal' | 'warm-hanji' | 'high-visibility')
  defaultTheme: 'dark-royal',

  // 5. 환자 안심 5대 임상 신뢰 지표 (Clinical Trust Stack)
  trustMetrics: [
    {
      badge: 'CERTIFIED 01 · 원장 1:1 책임 진료',
      value: '15년+',
      title: '대표원장 1:1 심층 맥진·문진',
      desc: '3분 공장식 진료를 배제하고 초진 최소 15분 이상 양 손목 27맥상과 사상체질을 정밀 판독합니다.'
    },
    {
      badge: 'CERTIFIED 02 · 무해성 안전 검증',
      value: '320종 ZERO',
      title: '중금속·잔류농약 불검출 GMP 약재',
      desc: '식약처 인증 규격 한약재만을 엄선하며 원내 10단계 정수·저온 무균 탕전 시스템에서 직접 달입니다.'
    },
    {
      badge: 'CERTIFIED 03 · 간·신장 안전성 입증',
      value: '99.4%',
      title: '복용 전·후 간 기능(AST/ALT) 안전 유지',
      desc: '혈액 생화학 지표 추적 관찰을 통해 어린아이부터 어르신까지 장기 복용 안전성을 데이터로 증명합니다.'
    },
    {
      badge: 'CERTIFIED 04 · 보건복지부 급여 지정',
      value: '건보 적용',
      title: '연간 20회 추나요법 건강보험 급여 및 실손 적용',
      desc: '비수술 척추·골반 1:1 수기 추나 치료 시 건강보험 급여 혜택으로 비용 부담을 낮추고 치료 효과를 높입니다.'
    }
  ]
};
