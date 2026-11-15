/**
 * Builds standalone `location.html` (/location/) from `clinic-global-info.json`
 * Also syncs `clinic-template-config.js` with the latest `clinic-global-info.json` values.
 */
const fs = require('fs');
const path = require('path');

const dir = __dirname;
const infoPath = path.join(dir, 'clinic-global-info.json');
const defPath = path.join(dir, 'clinic-global-info.default.json');

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function loadClinicGlobalInfo() {
  const src = fs.existsSync(infoPath) ? infoPath : defPath;
  if (!fs.existsSync(src)) {
    throw new Error('Missing clinic-global-info.json');
  }
  return JSON.parse(fs.readFileSync(src, 'utf8'));
}

function syncClinicTemplateConfigJs(info) {
  const cfgPath = path.join(dir, 'clinic-template-config.js');
  const merged = {
    clinicName: info.clinicName || '바른한의원 대전본점',
    clinicNameEn: info.clinicNameEn || 'BAREUN KOREAN MEDICINE CLINIC DAEJEON',
    directorName: info.directorName || '안정위',
    directorTitle: info.directorTitle || '대표원장',
    businessRegNo: info.businessRegNo || '211-91-10479',
    careerYears: '15년',
    slogan: '바른 마음, 정직한 처방 · 평생 주치의 바른한의원 대전본점',
    greetingEyebrow: info.greetingEyebrow || "DIRECTOR'S WARM GREETING · 대표원장 환영 인사말",
    greetingTitle: info.greetingTitle || '먼 길 찾아주시는 소중한 발걸음, 내 가족을 돌보는 정직한 마음으로 맞이합니다',
    greetingBody: info.greetingBody || '바른한의원 대전본점을 찾아주셔서 진심으로 감사합니다. 통증과 불편함 너머의 일상까지 깊이 경청하며, 제 가족과 아이에게 직접 처방·시술하는 검증된 치료만으로 한 분 한 분 정성껏 진료하겠습니다.',
    greetingSign: info.greetingSign || '바른한의원 대전본점 대표원장 안정위 배상',
    phone: info.phone || '010-5631-1275',
    kakaoUrl: info.kakaoUrl || 'https://pf.kakao.com/_ykxcLK',
    naverBookingUrl: info.naverBookingUrl || 'https://naver.me/5U1ELn8L',
    address: info.address || '대전광역시 대덕구 비래동로7번길 1, 2층 (비래동, 바른한의원 대전본점)',
    shortAddress: info.shortAddress || '대전 대덕구 비래동로7번길 1, 2층',
    postalCode: info.postalCode || '34417',
    lat: Number(info.lat) || 36.354682,
    lng: Number(info.lng) || 127.4492455,
    parkingGuide: info.parkingGuide || '',
    transitGuide: info.transitGuide || '',
    regionalDirections: Array.isArray(info.regionalDirections) ? info.regionalDirections : [],
    hours: Array.isArray(info.hours) ? info.hours : [],
    holidayNotice: info.holidayNotice || { enabled: false, badge: '진료 안내', text: '' },
    nonCoveredUpdatedDate: info.nonCoveredUpdatedDate || '2026-11-15',
    nonCoveredFees: Array.isArray(info.nonCoveredFees) ? info.nonCoveredFees : [],
    defaultTheme: 'warm-hanji',
    brandPalette: {
      beige: { hex: '#F5F1E8', subHex: '#EFE9DC', meaning: '신뢰감 (Trust)', role: '웜 한지 에디토리얼 배경 및 공간 베이스' },
      brown: { hex: '#4A3525', subHex: '#5E4736', meaning: '부드러움 (Softness)', role: '부드러운 프레임, 보더, 서브 타이틀 및 온기 있는 그림자' },
      black: { hex: '#171614', subHex: '#23201C', meaning: '진실 (Truth)', role: '정직한 진료를 상징하는 고대비 본문·헤드라인 타이포그래피' },
      white: { hex: '#FFFFFF', glass: 'rgba(255, 255, 255, 0.88)', meaning: '투명 (Transparency)', role: '투명한 탕전과 진료를 상징하는 글래스모피즘 카드·헤더' },
      green: { hex: '#2D5A43', subHex: '#3D7357', tint: '#E8F2EC', meaning: '자연 (Nature)', role: '자연 치유력과 생명력을 상징하는 포인트·CTA·활성 배지' }
    },
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

  const jsOut =
    '/**\n' +
    ' * ============================================================================\n' +
    ' * 🏛️ BAREUN KOREAN MEDICINE — B2B WHITE-LABEL MASTER TEMPLATE CONFIG\n' +
    ' * ============================================================================\n' +
    ' */\n' +
    'window.CLINIC_TEMPLATE_CONFIG = ' + JSON.stringify(merged, null, 2) + ';\n';
  fs.writeFileSync(cfgPath, jsOut, 'utf8');
}

function buildLocationHtml(info) {
  const lat = Number(info.lat) || 36.354682;
  const lng = Number(info.lng) || 127.4492455;
  const phone = info.phone || '010-5631-1275';
  const telHref = 'tel:' + phone.replace(/[^0-9+]/g, '');
  const kakaoUrl = info.kakaoUrl || 'https://pf.kakao.com/_ykxcLK';
  const naverBookingUrl = info.naverBookingUrl || 'https://naver.me/5U1ELn8L';
  const hours = Array.isArray(info.hours) ? info.hours : [];
  const fees = Array.isArray(info.nonCoveredFees) ? info.nonCoveredFees : [];
  const regionalGroups = Array.isArray(info.regionalDirections) ? info.regionalDirections : [];
  const hn = info.holidayNotice || { enabled: false, badge: '진료 안내', text: '' };

  const regionalGroupsHtml = regionalGroups.map((g) => {
    const routes = Array.isArray(g.routes) ? g.routes : [];
    const cardsHtml = routes.map((r) => `
      <article class="reg-route-card">
        <div class="reg-route-top">
          <strong class="reg-origin-name">${esc(r.origin)}</strong>
          <span class="reg-eta-pill">${esc(r.eta)}</span>
        </div>
        <div class="reg-route-row">
          <span class="reg-mode-tag reg-mode-car">자가용·IC</span>
          <p>${esc(r.car)}</p>
        </div>
        <div class="reg-route-row">
          <span class="reg-mode-tag reg-mode-transit">대중교통·철도</span>
          <p>${esc(r.transit)}</p>
        </div>
      </article>
    `).join('');
    return `
      <div class="reg-group-block" id="reg-${esc(g.groupId || 'group')}">
        <div class="reg-group-head">
          <div>
            <span class="reg-group-badge">${esc(g.badge)}</span>
            <h3 class="reg-group-title">${esc(g.title)}</h3>
          </div>
          <p class="reg-group-summary">${esc(g.summary || '')}</p>
        </div>
        <div class="reg-route-grid">${cardsHtml}</div>
      </div>
    `;
  }).join('');

  const hoursRowsHtml = hours.map((h) => `
    <div class="loc-hour-row">
      <div class="loc-hour-day">${esc(h.day)}</div>
      <div class="loc-hour-right">
        <strong class="loc-hour-time">${esc(h.time)}</strong>
        ${h.note ? `<span class="loc-hour-note">${esc(h.note)}</span>` : ''}
      </div>
    </div>
  `).join('');

  const feeRowsHtml = fees.map((f) => `
    <tr>
      <td><span class="fee-cat-pill">${esc(f.category)}</span></td>
      <td><strong>${esc(f.name)}</strong></td>
      <td>${esc(f.spec || '-')}</td>
      <td class="fee-price-cell">${esc(f.price)}</td>
      <td class="fee-note-cell">${esc(f.note || '')}</td>
    </tr>
  `).join('');

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>오시는길 · 진료시간 · 주차 · 비급여 안내 | 바른한의원 대전본점</title>
  <link rel="preconnect" href="https://cdn.jsdelivr.net">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css">
  <script src="clinic-template-config.js"></script>
  <style>
    :root {
      --hanji-bg: #F5F1E8;
      --hanji-sub: #EFE9DC;
      --espresso: #171614;
      --brown: #4A3525;
      --green: #2D5A43;
      --green-soft: #E8F2EC;
      --gold: #C5A059;
      --card-bg: #FFFFFF;
      --border: rgba(74, 53, 37, 0.14);
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
      background: var(--hanji-bg);
      color: var(--espresso);
      line-height: 1.65;
      word-break: keep-all;
      padding-bottom: 92px;
    }
    a { color: inherit; text-decoration: none; }

    /* Top Sticky Header */
    #header {
      position: sticky;
      top: 0;
      z-index: 1200;
      background: rgba(245, 241, 232, 0.94);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border-bottom: 1px solid var(--border);
      padding: 12px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
    }
    .header-left {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }
    .brand-logo {
      display: inline-flex;
      align-items: center;
      gap: 9px;
      font-weight: 900;
      font-size: 16px;
      color: var(--espresso);
    }
    .brand-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--green);
      box-shadow: 0 0 0 4px rgba(45, 90, 67, 0.16);
    }
    .nav-pill {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 7px 13px;
      border-radius: 999px;
      font-size: 12.5px;
      font-weight: 800;
      border: 1px solid var(--border);
      background: #FFFFFF;
      color: var(--brown);
      transition: all 0.2s ease;
    }
    .nav-pill:hover {
      border-color: var(--green);
      color: var(--green);
      transform: translateY(-1px);
    }
    .header-right {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    .header-cta {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 15px;
      border-radius: 999px;
      background: var(--green);
      color: #FFFFFF !important;
      font-size: 12.5px;
      font-weight: 800;
      box-shadow: 0 6px 16px rgba(45, 90, 67, 0.24);
    }

    /* Main Container */
    .loc-container {
      max-width: 1140px;
      margin: 0 auto;
      padding: 34px 20px 44px;
      display: flex;
      flex-direction: column;
      gap: 26px;
    }

    /* Warm Greeting Hero Card */
    .greeting-hero {
      position: relative;
      background: linear-gradient(135deg, #1B1815 0%, #2A211B 58%, #1E3B2D 100%);
      color: #FDFBF7;
      border-radius: 28px;
      padding: 38px 36px;
      border: 1px solid rgba(197, 160, 89, 0.42);
      box-shadow: 0 22px 54px rgba(23, 22, 20, 0.16);
      overflow: hidden;
    }
    .greeting-eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 5px 13px;
      border-radius: 999px;
      background: rgba(197, 160, 89, 0.18);
      border: 1px solid rgba(245, 211, 108, 0.45);
      color: #F5D36C;
      font-size: 11.5px;
      font-weight: 800;
      letter-spacing: 0.04em;
      margin-bottom: 14px;
    }
    .greeting-title {
      font-size: clamp(1.38rem, 2.6vw, 2.02rem);
      font-weight: 900;
      line-height: 1.38;
      letter-spacing: -0.02em;
      color: #FFFFFF;
      margin-bottom: 14px;
    }
    .greeting-body {
      font-size: clamp(0.96rem, 1.35vw, 1.06rem);
      color: rgba(253, 251, 247, 0.88);
      max-width: 820px;
      line-height: 1.78;
    }
    .greeting-sign {
      margin-top: 18px;
      padding-top: 14px;
      border-top: 1px solid rgba(255, 255, 255, 0.14);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
      font-size: 13.5px;
      font-weight: 800;
      color: #F5D36C;
    }

    /* Holiday / Notice Banner */
    .holiday-banner {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 15px 20px;
      border-radius: 18px;
      background: ${hn.enabled ? '#FFFBEB' : '#ECFDF5'};
      border: 1.5px solid ${hn.enabled ? '#F59E0B' : '#6EE7B7'};
      color: ${hn.enabled ? '#92400E' : '#065F46'};
      font-size: 13.5px;
      font-weight: 700;
    }
    .holiday-badge {
      padding: 4px 10px;
      border-radius: 999px;
      background: ${hn.enabled ? '#F59E0B' : '#059669'};
      color: #FFFFFF;
      font-size: 11.5px;
      font-weight: 900;
      flex-shrink: 0;
    }

    /* 4 Brand Navigation Icons Section */
    .section-card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 24px;
      padding: 28px;
      box-shadow: 0 10px 30px rgba(23, 22, 20, 0.05);
    }
    .sec-head {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
      margin-bottom: 18px;
    }
    .sec-kicker {
      font-size: 11.5px;
      font-weight: 800;
      color: var(--green);
      letter-spacing: 0.04em;
      margin-bottom: 4px;
    }
    .sec-title {
      font-size: clamp(1.18rem, 2vw, 1.45rem);
      font-weight: 900;
      color: var(--espresso);
      letter-spacing: -0.02em;
    }
    .addr-copy-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
      padding: 14px 18px;
      border-radius: 16px;
      background: var(--hanji-bg);
      border: 1px solid var(--border);
      margin-bottom: 18px;
    }
    .addr-copy-btn {
      appearance: none;
      border: 1px solid var(--green);
      background: #FFFFFF;
      color: var(--green);
      padding: 8px 14px;
      border-radius: 999px;
      font-size: 12.5px;
      font-weight: 800;
      cursor: pointer;
      transition: all 0.18s ease;
    }
    .addr-copy-btn:hover {
      background: var(--green);
      color: #FFFFFF;
    }

    .nav-app-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 14px;
      margin-bottom: 22px;
    }
    @media (max-width: 860px) {
      .nav-app-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    .nav-app-btn {
      appearance: none;
      border: 1.5px solid #E5E7EB;
      background: #FFFFFF;
      border-radius: 20px;
      padding: 18px 16px;
      display: flex;
      align-items: center;
      gap: 13px;
      cursor: pointer;
      text-align: left;
      transition: all 0.22s cubic-bezier(0.22, 1, 0.36, 1);
      box-shadow: 0 4px 14px rgba(15, 23, 42, 0.04);
    }
    .nav-app-btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 14px 28px rgba(15, 23, 42, 0.11);
      border-color: var(--green);
    }
    .nav-app-icon {
      width: 48px;
      height: 48px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);
    }
    .nav-app-meta strong {
      display: block;
      font-size: 15px;
      font-weight: 900;
      color: #111827;
    }
    .nav-app-meta span {
      display: block;
      font-size: 11.5px;
      font-weight: 700;
      color: #6B7280;
      margin-top: 2px;
    }

    /* Map + Hours 2-Column */
    .loc-two-col {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 20px;
    }
    @media (max-width: 920px) {
      .loc-two-col {
        grid-template-columns: 1fr;
      }
    }
    .map-frame-wrap {
      border-radius: 18px;
      overflow: hidden;
      border: 1px solid var(--border);
      height: 360px;
      background: #E5E7EB;
    }
    .map-frame-wrap iframe {
      width: 100%;
      height: 100%;
      border: 0;
      display: block;
    }
    .loc-hours-card {
      background: var(--hanji-bg);
      border-radius: 18px;
      padding: 20px 22px;
      border: 1px solid var(--border);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 12px;
    }
    .loc-hour-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding: 10px 0;
      border-bottom: 1px dashed rgba(74, 53, 37, 0.16);
    }
    .loc-hour-row:last-child {
      border-bottom: 0;
    }
    .loc-hour-day {
      font-size: 13.5px;
      font-weight: 800;
      color: var(--brown);
    }
    .loc-hour-right {
      text-align: right;
    }
    .loc-hour-time {
      display: block;
      font-size: 14.5px;
      font-weight: 900;
      color: var(--espresso);
      font-variant-numeric: tabular-nums;
    }
    .loc-hour-note {
      display: block;
      font-size: 11.5px;
      color: #6B7280;
      font-weight: 600;
    }

    /* Parking & Transit + 3 Approved Reservation Channels */
    .guide-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-top: 18px;
    }
    @media (max-width: 768px) {
      .guide-grid {
        grid-template-columns: 1fr;
      }
    }
    .guide-box {
      background: #FAF8F3;
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 16px 18px;
    }
    .guide-box h3 {
      font-size: 14px;
      font-weight: 900;
      color: var(--brown);
      margin-bottom: 6px;
    }
    .guide-box p {
      font-size: 13px;
      color: #374151;
      line-height: 1.65;
    }

    .reserve-3btn-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      margin-top: 18px;
    }
    @media (max-width: 720px) {
      .reserve-3btn-grid {
        grid-template-columns: 1fr;
      }
    }
    .res-ch-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 9px;
      padding: 15px 18px;
      border-radius: 16px;
      font-size: 14px;
      font-weight: 900;
      transition: transform 0.18s ease, box-shadow 0.18s ease;
    }
    .res-ch-btn:hover {
      transform: translateY(-2px);
    }
    .res-ch-tel {
      background: #171614;
      color: #FFFFFF !important;
    }
    .res-ch-kakao {
      background: #FEE500;
      color: #191919 !important;
    }
    .res-ch-naver {
      background: #03C75A;
      color: #FFFFFF !important;
    }

    /* Regional & KTX Multi-Origin Access Guide (100% Visible Semantic Cards, Zero Hidden Text) */
    .hub-highlight-strip {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      margin-bottom: 18px;
    }
    @media (max-width: 820px) {
      .hub-highlight-strip {
        grid-template-columns: 1fr;
      }
    }
    .hub-highlight-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 16px;
      border-radius: 16px;
      background: linear-gradient(135deg, #1B1815 0%, #27201A 100%);
      color: #FDFBF7;
      border: 1px solid rgba(197, 160, 89, 0.36);
    }
    .hub-highlight-num {
      padding: 6px 11px;
      border-radius: 11px;
      background: rgba(245, 211, 108, 0.16);
      border: 1px solid rgba(245, 211, 108, 0.42);
      color: #F5D36C;
      font-size: 13px;
      font-weight: 900;
      white-space: nowrap;
    }
    .hub-highlight-copy strong {
      display: block;
      font-size: 13.5px;
      font-weight: 900;
      color: #FFFFFF;
    }
    .hub-highlight-copy span {
      display: block;
      font-size: 11.5px;
      color: rgba(253, 251, 247, 0.76);
      margin-top: 2px;
    }
    .reg-jump-bar {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 20px;
    }
    .reg-jump-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 14px;
      border-radius: 999px;
      background: var(--hanji-bg);
      border: 1px solid var(--border);
      font-size: 12.5px;
      font-weight: 800;
      color: var(--brown);
      transition: all 0.18s ease;
    }
    .reg-jump-pill:hover {
      border-color: var(--green);
      background: var(--green-soft);
      color: var(--green);
    }
    .reg-group-block {
      padding: 20px;
      border-radius: 20px;
      background: #FAF8F3;
      border: 1px solid var(--border);
      margin-bottom: 18px;
      scroll-margin-top: 84px;
    }
    .reg-group-block:last-child {
      margin-bottom: 0;
    }
    .reg-group-head {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
      margin-bottom: 14px;
      padding-bottom: 12px;
      border-bottom: 1px dashed rgba(74, 53, 37, 0.16);
    }
    .reg-group-badge {
      display: inline-block;
      padding: 3px 10px;
      border-radius: 999px;
      background: var(--green-soft);
      color: var(--green);
      font-size: 11px;
      font-weight: 900;
      margin-bottom: 5px;
    }
    .reg-group-title {
      font-size: 1.08rem;
      font-weight: 900;
      color: var(--espresso);
      letter-spacing: -0.01em;
    }
    .reg-group-summary {
      font-size: 12.5px;
      color: #4B5563;
      max-width: 520px;
      line-height: 1.55;
    }
    .reg-route-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }
    @media (max-width: 820px) {
      .reg-route-grid {
        grid-template-columns: 1fr;
      }
    }
    .reg-route-card {
      background: #FFFFFF;
      border: 1px solid rgba(74, 53, 37, 0.12);
      border-radius: 16px;
      padding: 15px 16px;
      display: flex;
      flex-direction: column;
      gap: 9px;
    }
    .reg-route-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      flex-wrap: wrap;
      padding-bottom: 7px;
      border-bottom: 1px solid #F3F4F6;
    }
    .reg-origin-name {
      font-size: 14.5px;
      font-weight: 900;
      color: var(--espresso);
    }
    .reg-eta-pill {
      padding: 3px 9px;
      border-radius: 999px;
      background: #FEF3C7;
      color: #92400E;
      font-size: 11.5px;
      font-weight: 800;
      font-variant-numeric: tabular-nums;
    }
    .reg-route-row {
      display: grid;
      grid-template-columns: 84px 1fr;
      gap: 8px;
      align-items: start;
      font-size: 12.5px;
      color: #374151;
      line-height: 1.58;
    }
    .reg-mode-tag {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 2px 7px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 800;
      white-space: nowrap;
      margin-top: 2px;
    }
    .reg-mode-car {
      background: #EEF2FF;
      color: #3730A3;
    }
    .reg-mode-transit {
      background: #ECFDF5;
      color: #065F46;
    }

    /* Non-Covered Fee Schedule Table */
    .fee-table-wrap {
      overflow-x: auto;
      border-radius: 16px;
      border: 1px solid #E5E7EB;
    }
    .fee-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13px;
      text-align: left;
      min-width: 640px;
    }
    .fee-table th {
      background: #171614;
      color: #F5D36C;
      padding: 12px 14px;
      font-weight: 800;
      font-size: 12.5px;
    }
    .fee-table td {
      padding: 12px 14px;
      border-top: 1px solid #E5E7EB;
      color: #1F2937;
    }
    .fee-cat-pill {
      display: inline-block;
      padding: 3px 9px;
      border-radius: 999px;
      background: var(--green-soft);
      color: var(--green);
      font-size: 11.5px;
      font-weight: 800;
      white-space: nowrap;
    }
    .fee-price-cell {
      font-weight: 900;
      color: var(--green);
      white-space: nowrap;
      font-variant-numeric: tabular-nums;
    }
    .fee-note-cell {
      font-size: 12px;
      color: #6B7280;
    }

    .legal-footer {
      text-align: center;
      font-size: 12px;
      color: #6E5D4F;
      padding: 18px 12px 10px;
      line-height: 1.7;
    }
    @media (max-width: 640px) {
      .greeting-hero { padding: 26px 22px; }
      .section-card { padding: 20px 18px; }
      #header { padding: 10px 14px; }
    }
  </style>
</head>
<body class="theme-hanji">
  <header id="header">
    <div class="header-left">
      <a class="brand-logo" href="index.html">
        <span class="brand-dot"></span>
        <span data-clinic-field="clinicName">${esc(info.clinicName)}</span>
      </a>
      <a class="nav-pill" href="index.html?cards=1">← 전체 진료클리닉</a>
      <a class="nav-pill" href="director.html">👨‍⚕️ 대표원장 소개</a>
      <a class="nav-pill" href="body-explorer.html" style="background:#FEF3C7;border-color:#F59E0B;color:#92400E;">💡 3D 인체모형 · 건강백과</a>
    </div>
    <div class="header-right">
      <a class="nav-pill" href="#regional-directions">🚄 권역·KTX 오시는길</a>
      <a class="nav-pill" href="#non-covered-fees">📋 비급여 수가표</a>
      <a class="header-cta" href="${esc(naverBookingUrl)}" target="_blank" rel="noopener noreferrer">📍 네이버 빠른예약 ↗</a>
    </div>
  </header>

  <main class="loc-container">
    <!-- 1. Warm Greeting Card -->
    <section class="greeting-hero" aria-label="대표원장 환영 인사말">
      <div class="greeting-eyebrow" id="loc-greeting-eyebrow">${esc(info.greetingEyebrow)}</div>
      <h1 class="greeting-title" id="loc-greeting-title">${esc(info.greetingTitle)}</h1>
      <p class="greeting-body" id="loc-greeting-body">${esc(info.greetingBody)}</p>
      <div class="greeting-sign">
        <span id="loc-greeting-sign">${esc(info.greetingSign)}</span>
        <span style="font-size:12px;color:rgba(255,255,255,0.72);">대표전화 ${esc(phone)} · ${esc(info.shortAddress)}</span>
      </div>
    </section>

    <!-- Holiday / Operation Notice -->
    <div class="holiday-banner" id="loc-holiday-banner">
      <span class="holiday-badge" id="loc-holiday-badge">${esc(hn.badge || '진료 안내')}</span>
      <span id="loc-holiday-text">${esc(hn.text || '평일 09:00~19:00 · 토요일/공휴일 09:00~14:00(점심시간 없이 연속 진료) · 일요일 정기 휴진')}</span>
    </div>

    <!-- 2. 4 Brand Auto-Navigation Icons + Map + Hours -->
    <section class="section-card" aria-label="자동 길안내 및 진료시간">
      <div class="sec-head">
        <div>
          <div class="sec-kicker">ONE-CLICK AUTO NAVIGATION · 원클릭 자동 길안내</div>
          <h2 class="sec-title">원하시는 지도 아이콘을 누르시면 즉시 길안내가 시작됩니다</h2>
        </div>
        <span style="font-size:12px;font-weight:700;color:#6B7280;">모바일 앱 자동 실행 · PC 경로안내 연동</span>
      </div>

      <div class="addr-copy-bar">
        <div>
          <div style="font-size:11.5px;font-weight:800;color:#6B7280;">도로명 주소 (우편번호 ${esc(info.postalCode || '34417')})</div>
          <strong style="font-size:15px;color:#171614;" id="loc-address-text">${esc(info.address)}</strong>
        </div>
        <button type="button" class="addr-copy-btn" onclick="window.copyBareunClinicAddress && window.copyBareunClinicAddress(this)">📋 도로명 주소 복사</button>
      </div>

      <!-- 4 Individual Brand Icons: Naver Map, Google Maps, TMAP, KakaoMap -->
      <div class="nav-app-grid">
        <button type="button" class="nav-app-btn" onclick="window.launchBareunMapNav && window.launchBareunMapNav('naver')">
          <span class="nav-app-icon" style="background:#03C75A;color:#FFFFFF;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 4.5h4.3l5.4 7.8V4.5H19v15h-4.3L9.3 11.7v7.8H5v-15z" fill="#FFFFFF"/>
            </svg>
          </span>
          <span class="nav-app-meta">
            <strong>네이버지도</strong>
            <span>클릭 시 자동 길안내 →</span>
          </span>
        </button>

        <button type="button" class="nav-app-btn" onclick="window.launchBareunMapNav && window.launchBareunMapNav('google')">
          <span class="nav-app-icon" style="background:#FFFFFF;border:1px solid #E5E7EB;">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 2C7.86 2 4.5 5.36 4.5 9.5c0 5.25 7.5 12.5 7.5 12.5s7.5-7.25 7.5-12.5C19.5 5.36 16.14 2 12 2z" fill="#EA4335"/>
              <path d="M12 2C7.86 2 4.5 5.36 4.5 9.5c0 1.78.64 3.42 1.7 4.7L15.8 4.6A7.46 7.46 0 0 0 12 2z" fill="#4285F4"/>
              <path d="M6.2 14.2C8.08 17.55 12 22 12 22s2.15-2.08 4.18-4.88L8.8 9.75l-2.6 4.45z" fill="#34A853"/>
              <circle cx="12" cy="9.5" r="3.1" fill="#FFFFFF"/>
            </svg>
          </span>
          <span class="nav-app-meta">
            <strong>구글지도</strong>
            <span>클릭 시 자동 길안내 →</span>
          </span>
        </button>

        <button type="button" class="nav-app-btn" onclick="window.launchBareunMapNav && window.launchBareunMapNav('tmap')">
          <span class="nav-app-icon" style="background:linear-gradient(135deg,#FF2D55 0%,#6E3AFF 52%,#00C7BE 100%);color:#FFFFFF;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4.5 6h15v3.4h-5.6V19h-3.8V9.4H4.5V6z" fill="#FFFFFF"/>
            </svg>
          </span>
          <span class="nav-app-meta">
            <strong>티맵 (TMAP)</strong>
            <span>내비게이션 즉시 출발 →</span>
          </span>
        </button>

        <button type="button" class="nav-app-btn" onclick="window.launchBareunMapNav && window.launchBareunMapNav('kakao')">
          <span class="nav-app-icon" style="background:#FEE500;color:#191919;">
            <svg width="25" height="25" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 2.5C7.58 2.5 4 6.08 4 10.5c0 5.55 8 11 8 11s8-5.45 8-11c0-4.42-3.58-8-8-8z" fill="#1866FF"/>
              <circle cx="12" cy="10.2" r="3.2" fill="#FEE500"/>
            </svg>
          </span>
          <span class="nav-app-meta">
            <strong>카카오맵</strong>
            <span>클릭 시 자동 길안내 →</span>
          </span>
        </button>
      </div>

      <div class="loc-two-col">
        <div class="map-frame-wrap">
          <iframe
            id="loc-google-map-iframe"
            title="바른한의원 대전본점 위치 지도"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            src="https://maps.google.com/maps?q=${lat},${lng}&z=17&hl=ko&output=embed"></iframe>
        </div>

        <div class="loc-hours-card">
          <div>
            <div style="font-size:12px;font-weight:900;color:#2D5A43;margin-bottom:8px;">🕒 진료시간 · 점심시간 · 휴진일 안내</div>
            <div id="loc-hours-list">${hoursRowsHtml}</div>
          </div>
          <div style="padding:12px 14px;border-radius:12px;background:#FFFFFF;border:1px solid var(--border);font-size:12.5px;color:#374151;">
            📞 진료·예약 문의: <a href="${esc(telHref)}" style="font-weight:900;color:#2D5A43;">${esc(phone)}</a><br>
            평일 야간 또는 토요일·공휴일 내원 전 예약 주시면 대기 시간을 줄이실 수 있습니다.
          </div>
        </div>
      </div>

      <div class="guide-grid">
        <div class="guide-box">
          <h3>🚗 자가용 · 주차 안내</h3>
          <p id="loc-parking-guide">${esc(info.parkingGuide)}</p>
        </div>
        <div class="guide-box">
          <h3>🚌 대중교통 · 주변 랜드마크 안내</h3>
          <p id="loc-transit-guide">${esc(info.transitGuide)}</p>
        </div>
      </div>

      <!-- Strictly 3 Approved Channels ONLY: 전화 / 카톡 / 네이버예약 (Zero Naver TalkTalk) -->
      <div class="reserve-3btn-grid">
        <a class="res-ch-btn res-ch-tel" href="${esc(telHref)}">📞 전화상담 (${esc(phone)})</a>
        <a class="res-ch-btn res-ch-kakao" href="${esc(kakaoUrl)}" target="_blank" rel="noopener noreferrer">💬 카카오톡 상담·예약</a>
        <a class="res-ch-btn res-ch-naver" href="${esc(naverBookingUrl)}" target="_blank" rel="noopener noreferrer">📍 네이버 예약 바로가기</a>
      </div>
    </section>

    <!-- 2-B. Multi-Region & National KTX Access Guide (12 Major Origins, 100% Visible Genuine Transit Utility) -->
    <section class="section-card" id="regional-directions" aria-label="권역별 및 광역 교통 오시는길 안내">
      <div class="sec-head">
        <div>
          <div class="sec-kicker">REGIONAL &amp; KTX ACCESS GUIDE · 권역별 · 광역 IC · 고속철도 교통편 안내</div>
          <h2 class="sec-title">대전 시내권 · 충청 인근 도시 · 전국 KTX 철도역에서 오시는 길</h2>
        </div>
        <span style="font-size:12px;font-weight:700;color:#6B7280;">대전IC 차량 3분 · 복합터미널 7분 · 대전역 동광장 12분</span>
      </div>

      <div class="hub-highlight-strip">
        <div class="hub-highlight-item">
          <span class="hub-highlight-num">차량 3분</span>
          <div class="hub-highlight-copy">
            <strong>경부고속도로 대전IC 진출 직결</strong>
            <span>톨게이트 통과 후 비래동로 방면 약 1.3km</span>
          </div>
        </div>
        <div class="hub-highlight-item">
          <span class="hub-highlight-num">차량 7분</span>
          <div class="hub-highlight-copy">
            <strong>대전복합터미널 · 세종 BRT 정류장</strong>
            <span>시외·고속버스 및 B1 BRT 하차 후 약 2.4km</span>
          </div>
        </div>
        <div class="hub-highlight-item">
          <span class="hub-highlight-num">택시 12분</span>
          <div class="hub-highlight-copy">
            <strong>대전역 (KTX · SRT 고속철도)</strong>
            <span>대전역 『동광장』 택시 승강장 기준 약 5.2km</span>
          </div>
        </div>
      </div>

      <nav class="reg-jump-bar" aria-label="출발 권역 바로가기">
        <a class="reg-jump-pill" href="#reg-daejeon-city">🏙️ 대전 시내권 (둔산동 · 유성 · 도안동)</a>
        <a class="reg-jump-pill" href="#reg-chungcheong-ic">🛣️ 충청 · 인근 광역권 (세종 · 청주 · 계룡시 · 옥천 · 영동)</a>
        <a class="reg-jump-pill" href="#reg-ktx-national">🚄 전국 KTX 철도역 (서울역 · 천안아산역 · 대구역 · 부산역)</a>
      </nav>

      <div id="loc-regional-groups">${regionalGroupsHtml}</div>
    </section>

    <!-- 3. Medical Law Article 45 Non-Covered Fee Schedule -->
    <section class="section-card" id="non-covered-fees" aria-label="비급여 진료비용 안내">
      <div class="sec-head">
        <div>
          <div class="sec-kicker">MEDICAL LAW ARTICLE 45 · 의료법 제45조 고지사항</div>
          <h2 class="sec-title">비급여 진료비용 및 제증명 수수료 안내표</h2>
        </div>
        <span style="font-size:12px;font-weight:700;color:#6B7280;" id="loc-fee-updated">최종 고지 기준일: ${esc(info.nonCoveredUpdatedDate || '2026-11-15')}</span>
      </div>
      <p style="font-size:13px;color:#4B5563;margin-bottom:14px;">
        의료법 제45조 및 동법 시행규칙 제42조의2에 의거하여 건강보험 비급여 대상 항목의 비용을 투명하게 안내합니다. 실제 처방·시술 비용은 환자분의 증상 중증도, 체질, 약재 구성(녹용·사향 등) 및 치료 기간에 따라 1:1 진찰 후 상세히 안내해 드립니다.
      </p>
      <div class="fee-table-wrap">
        <table class="fee-table">
          <thead>
            <tr>
              <th>분류</th>
              <th>비급여 항목명</th>
              <th>기준 / 규격</th>
              <th>비용 안내 (VAT 면세/포함 기준)</th>
              <th>비고 안내</th>
            </tr>
          </thead>
          <tbody id="loc-fee-tbody">${feeRowsHtml}</tbody>
        </table>
      </div>
    </section>

    <footer class="legal-footer">
      <strong>${esc(info.clinicName)}</strong> · 대표원장: ${esc(info.directorName)} · 사업자등록번호: <strong>${esc(info.businessRegNo)}</strong><br>
      소재지: ${esc(info.address)} · 대표전화: <a href="${esc(telHref)}" style="font-weight:800;">${esc(phone)}</a>
    </footer>
  </main>

  <script>
    (function () {
      function escH(s) {
        return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
      }
      function applyLiveClinicInfo(info) {
        if (!info || typeof info !== 'object') return;
        window.CLINIC_TEMPLATE_CONFIG = Object.assign({}, window.CLINIC_TEMPLATE_CONFIG || {}, info);
        var setTxt = function (id, v) { var el = document.getElementById(id); if (el && v != null) el.textContent = String(v); };
        setTxt('loc-greeting-eyebrow', info.greetingEyebrow);
        setTxt('loc-greeting-title', info.greetingTitle);
        setTxt('loc-greeting-body', info.greetingBody);
        setTxt('loc-greeting-sign', info.greetingSign);
        setTxt('loc-address-text', info.address);
        setTxt('loc-parking-guide', info.parkingGuide);
        setTxt('loc-transit-guide', info.transitGuide);
        if (info.nonCoveredUpdatedDate) setTxt('loc-fee-updated', '최종 고지 기준일: ' + info.nonCoveredUpdatedDate);
        if (info.holidayNotice) {
          var hb = document.getElementById('loc-holiday-banner');
          var hBadge = document.getElementById('loc-holiday-badge');
          var hText = document.getElementById('loc-holiday-text');
          var isEn = Boolean(info.holidayNotice.enabled);
          if (hb) {
            hb.style.background = isEn ? '#FFFBEB' : '#ECFDF5';
            hb.style.borderColor = isEn ? '#F59E0B' : '#6EE7B7';
            hb.style.color = isEn ? '#92400E' : '#065F46';
          }
          if (hBadge) {
            hBadge.style.background = isEn ? '#F59E0B' : '#059669';
            hBadge.textContent = info.holidayNotice.badge || '진료 안내';
          }
          if (hText && info.holidayNotice.text) hText.textContent = info.holidayNotice.text;
        }
        if (Array.isArray(info.hours) && info.hours.length) {
          var hl = document.getElementById('loc-hours-list');
          if (hl) {
            hl.innerHTML = info.hours.map(function (h) {
              return '<div class="loc-hour-row"><div class="loc-hour-day">' + escH(h.day) + '</div><div class="loc-hour-right"><strong class="loc-hour-time">' + escH(h.time) + '</strong>' + (h.note ? '<span class="loc-hour-note">' + escH(h.note) + '</span>' : '') + '</div></div>';
            }).join('');
          }
        }
        if (Array.isArray(info.nonCoveredFees) && info.nonCoveredFees.length) {
          var tb = document.getElementById('loc-fee-tbody');
          if (tb) {
            tb.innerHTML = info.nonCoveredFees.map(function (f) {
              return '<tr><td><span class="fee-cat-pill">' + escH(f.category) + '</span></td><td><strong>' + escH(f.name) + '</strong></td><td>' + escH(f.spec || '-') + '</td><td class="fee-price-cell">' + escH(f.price) + '</td><td class="fee-note-cell">' + escH(f.note || '') + '</td></tr>';
            }).join('');
          }
        }
        if (Array.isArray(info.regionalDirections) && info.regionalDirections.length) {
          var rg = document.getElementById('loc-regional-groups');
          if (rg) {
            rg.innerHTML = info.regionalDirections.map(function (g) {
              var cards = (Array.isArray(g.routes) ? g.routes : []).map(function (r) {
                return '<article class="reg-route-card">' +
                  '<div class="reg-route-top"><strong class="reg-origin-name">' + escH(r.origin) + '</strong><span class="reg-eta-pill">' + escH(r.eta) + '</span></div>' +
                  '<div class="reg-route-row"><span class="reg-mode-tag reg-mode-car">자가용·IC</span><p>' + escH(r.car) + '</p></div>' +
                  '<div class="reg-route-row"><span class="reg-mode-tag reg-mode-transit">대중교통·철도</span><p>' + escH(r.transit) + '</p></div>' +
                '</article>';
              }).join('');
              return '<div class="reg-group-block" id="reg-' + escH(g.groupId || 'group') + '">' +
                '<div class="reg-group-head"><div><span class="reg-group-badge">' + escH(g.badge) + '</span><h3 class="reg-group-title">' + escH(g.title) + '</h3></div><p class="reg-group-summary">' + escH(g.summary || '') + '</p></div>' +
                '<div class="reg-route-grid">' + cards + '</div>' +
              '</div>';
            }).join('');
          }
        }
      }
      var isLocal = (location.hostname === 'localhost' || location.hostname === '127.0.0.1');
      var apiUrl = isLocal ? '/api/clinic-global-info' : '/wp-json/bareun/v1/clinic-info';
      fetch(apiUrl + '?t=' + Date.now(), { cache: 'no-store' })
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (d) { if (d && d.ok && d.info) applyLiveClinicInfo(d.info); })
        .catch(function () {});
    })();
  </script>
  <script src="visit-tracker.js"></script>
</body>
</html>
`;
}

function run() {
  const info = loadClinicGlobalInfo();
  syncClinicTemplateConfigJs(info);
  const html = buildLocationHtml(info);
  const outPath = path.join(dir, 'location.html');
  fs.writeFileSync(outPath, html, 'utf8');
  console.log('[build-location-page] Generated location.html (' + html.length + ' bytes) & synced clinic-template-config.js');
}

if (require.main === module) {
  run();
}

module.exports = { loadClinicGlobalInfo, syncClinicTemplateConfigJs, buildLocationHtml, run };
