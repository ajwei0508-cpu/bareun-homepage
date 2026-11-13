/**
 * =========================================================================
 * BAREUN CLINIC (바른한의원 대전본점) - 온라인 실결제 PG 연동 환경설정
 * =========================================================================
 * 
 * [포트원(PortOne) 및 카드사 입점 심사 필수 충족 구성]
 * 1. 포트원(PortOne: https://admin.portone.io) 관리자 콘솔 로그인
 * 2. [결제 연동] -> [내 식별코드·API Keys] 메뉴에서 '가맹점 식별코드' 확인 (예: imp12345678)
 * 3. 아래 BAREUN_PAY_CONFIG.userCode 값에 해당 식별코드를 입력하시면 즉시 실제 카드로 과금 및 정산됩니다.
 */

window.BAREUN_PAY_CONFIG = {
  // [필수] 포트원 실제 가맹점 식별코드 (User Code)
  // 실제 발급받으신 식별코드(예: 'imp12345678')를 입력해주세요.
  userCode: 'imp00000000',

  // 상점 법적 사업자 정보 (카드사 및 전자상거래법 필수 고시 규격)
  merchant: {
    name: '바른한의원 대전본점',
    ceo: '안정위 대표원장 (한의사)',
    tel: '010-5631-1275',
    email: 'bareunhaniwon@naver.com',
    address: '대전광역시 대덕구 비래동로7번길 1, 2층 (비래동)',
    bizNumber: '211-91-10479',
    mailOrderNumber: '제 2026-대전대덕-0001 호',
    clinicLicenseNumber: '제 3680000-000-00000 호',
    privacyOfficer: '안정위 대표원장 (bareunhaniwon@naver.com)',
    postcode: '34417'
  },

  // 결제 수단별 PG 설정 (포트원에 등록된 PG 채널 설정)
  pgMapping: {
    card: 'html5_inicis',      // 웹표준 신용카드 (KG이니시스, 나이스, KCP, 토스페이먼츠 등)
    kakaopay: 'kakaopay',      // 카카오페이 전용 CID
    naverpay: 'naverpay',      // 네이버페이 파트너센터 가맹점
    tosspay: 'tosspay',        // 토스페이 전용
    applepay: 'html5_inicis',  // 애플페이 (이니시스 경유)
    vbank: 'html5_inicis'      // 가상계좌 (무통장 입금)
  },

  isProduction: true
};
