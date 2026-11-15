/**
 * ============================================================================
 * 📊 BAREUN KOREAN MEDICINE — VISITOR COUNTER (CONSUMER 2-METRIC / MASTER FULL)
 * 📍 GLOBAL LOCATION · GREETING · 4-APP AUTO-NAVIGATION · NON-COVERED FEES
 * 📱 MOBILE 3-CHANNEL QUICK RESERVATION BAR (전화 · 카톡 · 네이버예약 ONLY)
 * ============================================================================
 */
(function () {
  if (window.__BAREUN_VISIT_TRACKER_LOADED__) return;
  window.__BAREUN_VISIT_TRACKER_LOADED__ = true;

  // Skip Studio editor environment
  const pathLower = (window.location.pathname || '').toLowerCase();
  const isStudioEditor =
    pathLower.includes('detail-pages-editor') ||
    pathLower.includes('custom-studio');

  const TOKEN_KEY = 'bareun_member_token_v5';
  const VISITOR_ID_KEY = 'bareun_visitor_uid_v2';
  const LOCAL_CACHE_KEY = 'bareun_visit_public_cache_v3';

  let latestStats = null;
  let isMasterAuthenticated = false;
  let activeLocationTab = 'location';
  let activeMasterTab = 'overview';
  let sessionAttribution = { referrer: '', landingSearch: '', aiHint: '', platform: '', aiEngine: '' };

  function initSessionAttribution() {
    try {
      const saved = sessionStorage.getItem('bareun_session_attr_v1');
      if (saved) {
        sessionAttribution = Object.assign(sessionAttribution, JSON.parse(saved));
        return;
      }
    } catch (e) {}
    const ref = document.referrer || '';
    const lsearch = window.location.search || '';
    const low = (ref + ' ' + lsearch).toLowerCase();
    let aiHint = '';
    if (low.includes('chatgpt.com') || low.includes('chat.openai.com') || low.includes('searchgpt') || low.includes('utm_source=chatgpt')) aiHint = 'chatgpt.com';
    else if (low.includes('perplexity.ai') || low.includes('utm_source=perplexity')) aiHint = 'perplexity.ai';
    else if (low.includes('gemini.google.com') || low.includes('bard.google.com') || low.includes('utm_source=gemini')) aiHint = 'gemini.google.com';
    else if (low.includes('claude.ai') || low.includes('utm_source=claude')) aiHint = 'claude.ai';
    else if (low.includes('copilot.microsoft.com') || low.includes('edgeservices.bing.com')) aiHint = 'copilot.microsoft.com';
    else if (low.includes('cue.search.naver.com') || low.includes('clova-x.naver.com')) aiHint = 'cue.search.naver.com';
    else if (low.includes('wrtn.ai')) aiHint = 'wrtn.ai';
    else if (low.includes('getliner.com') || low.includes('liner.ai')) aiHint = 'getliner.com';
    else if (low.includes('grok.com') || low.includes('x.ai')) aiHint = 'grok.com';

    sessionAttribution = {
      referrer: ref,
      landingSearch: lsearch,
      aiHint: aiHint,
      platform: '',
      aiEngine: ''
    };
    try {
      sessionStorage.setItem('bareun_session_attr_v1', JSON.stringify(sessionAttribution));
    } catch (e) {}
  }
  initSessionAttribution();

  function trackBareunConversionEvent(action) {
    if (isStudioEditor || !action) return;
    const slug = detectPageSlug();
    const payload = JSON.stringify({
      action: action,
      pageSlug: slug,
      deviceType: detectDeviceType(),
      referrer: document.referrer || sessionAttribution.referrer || '',
      landingSearch: window.location.search || sessionAttribution.landingSearch || '',
      aiHint: sessionAttribution.aiHint || '',
      sessionPlatform: sessionAttribution.platform || '',
      sessionAiEngine: sessionAttribution.aiEngine || ''
    });

    try {
      if (navigator.sendBeacon) {
        const blob = new Blob([payload], { type: 'application/json' });
        navigator.sendBeacon('/wp-json/bareun/v1/visits/event?_t=' + Date.now(), blob);
      } else {
        fetch('/wp-json/bareun/v1/visits/event?_t=' + Date.now(), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payload,
          keepalive: true
        }).catch(function () {});
      }
    } catch (e) {}

    // Fire Stage-2 GA4 custom conversion event if gtag is loaded
    try {
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'clinic_conversion_click', {
          conversion_action: action,
          page_slug: slug,
          ai_engine: sessionAttribution.aiHint || 'none'
        });
      }
    } catch (e) {}
  }
  window.trackBareunConversionEvent = trackBareunConversionEvent;

  const DEFAULT_CLINIC_INFO = {
    clinicName: '바른한의원 대전본점',
    directorName: '안정위',
    directorTitle: '대표원장',
    businessRegNo: '211-91-10479',
    greetingEyebrow: "DIRECTOR'S WARM GREETING · 대표원장 환영 인사말",
    greetingTitle: '먼 길 찾아주시는 소중한 발걸음, 내 가족을 돌보는 정직한 마음으로 맞이합니다',
    greetingBody: '바른한의원 대전본점을 찾아주셔서 진심으로 감사합니다. 통증과 불편함 너머의 일상까지 깊이 경청하며, 제 가족과 아이에게 직접 처방·시술하는 검증된 치료만으로 한 분 한 분 정성껏 진료하겠습니다.',
    greetingSign: '바른한의원 대전본점 대표원장 안정위 배상',
    phone: '010-5631-1275',
    kakaoUrl: 'https://pf.kakao.com/_ykxcLK',
    naverBookingUrl: 'https://naver.me/5U1ELn8L',
    address: '대전광역시 대덕구 비래동로7번길 1, 2층 (비래동, 바른한의원 대전본점)',
    shortAddress: '대전 대덕구 비래동로7번길 1, 2층',
    postalCode: '34417',
    lat: 36.35536,
    lng: 127.44778,
    hours: [
      { day: '평일 (월 ~ 금)', time: '09:00 ~ 19:00', note: '초진·재진 예약 우선 진료' },
      { day: '토요일 · 공휴일', time: '09:00 ~ 14:00', note: '점심시간 없이 연속 진료' },
      { day: '점심시간 (평일)', time: '12:30 ~ 14:00', note: '토요일·공휴일 점심시간 없음' },
      { day: '정기 휴진', time: '매주 일요일 휴진', note: '임시 휴진 시 상단 배너 사전 공지' }
    ],
    holidayNotice: {
      enabled: false,
      badge: '진료 안내',
      text: '평일 09:00~19:00 · 토요일/공휴일 09:00~14:00(점심시간 없이 연속 진료) · 매주 일요일 정기 휴진'
    },
    parkingGuide: '건물 전용 주차 공간 및 비래동로7번길 인근 노상·공영 주차 무료 이용 가능 (초진·거동 불편 환자분은 내원 전 전화 주시면 가장 편한 주차 위치를 바로 안내해 드립니다.)',
    transitGuide: '대전 복합터미널 차량 7분 거리 · 비래동 행정복지센터 및 비래삼호아파트 인근 도보 3분 (비래동로7번길 1, 2층)',
    nonCoveredUpdatedDate: '2026-11-15',
    nonCoveredFees: [
      { category: '추나요법', name: '비급여 체형·턱관절 교정 추나요법', spec: '1회 기준 (건보 연 20회 초과/비급여 대상)', price: '30,000원 ~ 50,000원', note: '연간 20회 이내 단순·복잡추나는 건강보험 급여 적용' },
      { category: '약침 시술', name: '정제 약침 (근골격·신경감압·면역)', spec: '1회 / 부위·용량별', price: '10,000원 ~ 30,000원', note: '시술 부위 및 정제 약침 성분에 따라 차등' },
      { category: '특수 약침·매선', name: '모낭재생 · 산삼비만 · 한방 리프팅 약침/매선', spec: '1회 / 집중 시술', price: '30,000원 ~ 150,000원', note: '두피·체형·윤곽 시술 범위 및 매선 수량별' },
      { category: '맞춤 탕약', name: '체질 맞춤 치료·보양 한약 (통증·소화·면역·전립선)', spec: '15일분 ~ 1개월분 (원내 직탕)', price: '220,000원 ~ 450,000원', note: '식약처 인증 GMP 한약재 · 녹용 등급 추가 시 변동' },
      { category: '특화 한약', name: '바른 소아 키성장 · 성조숙증 맞춤 한약', spec: '1개월분', price: '350,000원 ~ 550,000원', note: '초음파 성장판·체성분 분석 및 녹용 배합별' },
      { category: '특화 한약', name: '식욕ZERO 체지방 분해 다이어트 한약', spec: '1개월 프로그램', price: '250,000원 ~ 450,000원', note: '대사 단계 및 체성분 맞춤 1:1 단독 처방' },
      { category: '명품 환제', name: '식약처 CITES 인증 정품 사향 황제공진단', spec: '10환 / 30환', price: '500,000원 ~ 1,500,000원', note: '천연 사향·원용 분골 함량 및 환수별 차등' },
      { category: '제증명 수수료', name: '일반진단서 / 진료확인서·소견서 / 진료기록사본', spec: '1통 기준', price: '1,000원 ~ 20,000원', note: '보건복지부 의료기관 제증명수수료 기준 준수' }
    ]
  };

  function mergeClinicInfo(src) {
    const base = Object.assign({}, DEFAULT_CLINIC_INFO, window.CLINIC_TEMPLATE_CONFIG || {});
    if (!src || typeof src !== 'object') return base;
    const next = Object.assign({}, base, src);
    if (!Array.isArray(next.hours) || next.hours.length === 0) next.hours = base.hours;
    if (!Array.isArray(next.nonCoveredFees) || next.nonCoveredFees.length === 0) next.nonCoveredFees = base.nonCoveredFees;
    if (!next.holidayNotice || typeof next.holidayNotice !== 'object') next.holidayNotice = base.holidayNotice;
    return next;
  }

  let clinicInfo = mergeClinicInfo(null);

  /**
   * Consumer baseline contains ONLY Today & Cumulative counts.
   * Zero detailed logs, page rankings, device breakdowns, or passwords in client code.
   */
  function buildClientBaselineStats() {
    try {
      const cached = localStorage.getItem(LOCAL_CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && parsed.ok && typeof parsed.totalPv === 'number') {
          return {
            ok: true,
            isMaster: false,
            todayPv: Number(parsed.todayPv) || 65,
            totalPv: Number(parsed.totalPv) || 15738,
            serverTime: parsed.serverTime || ''
          };
        }
      }
    } catch (e) {}

    const now = new Date();
    return {
      ok: true,
      isMaster: false,
      todayPv: 65,
      totalPv: 15738,
      serverTime: now.toISOString().slice(0, 19).replace('T', ' ')
    };
  }

  latestStats = buildClientBaselineStats();

  function getVisitorId() {
    try {
      let vid = localStorage.getItem(VISITOR_ID_KEY);
      if (!vid) {
        vid = 'v_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 10);
        localStorage.setItem(VISITOR_ID_KEY, vid);
      }
      return vid;
    } catch (e) {
      return 'v_anon_' + Math.floor(Math.random() * 100000);
    }
  }

  function getAuthToken() {
    try {
      return localStorage.getItem(TOKEN_KEY) || '';
    } catch (e) {
      return '';
    }
  }

  function setAuthToken(tok) {
    try {
      if (tok) localStorage.setItem(TOKEN_KEY, tok);
      else localStorage.removeItem(TOKEN_KEY);
    } catch (e) {}
  }

  function isWordPressLivePath() {
    const p = window.location.pathname || '/';
    return !/\.html$/i.test(p) && p !== '/index.html' && p !== '/story-3d.html';
  }

  function getLocationPageHref() {
    return isWordPressLivePath() ? '/location/' : 'location.html';
  }

  function detectPageSlug() {
    const rawPath = (window.location.pathname || '/').replace(/\/+$/, '');
    const lastSeg = rawPath.split('/').pop() || 'home';
    const clean = lastSeg.replace(/\.html$/i, '').toLowerCase();
    if (!clean || clean === 'index' || clean === 'story-3d' || clean === '46-2') return 'home';
    if (clean === 'gongjindan-2') return 'gongjindan';
    return clean;
  }

  function detectDeviceType() {
    const w = window.innerWidth || 1280;
    if (w <= 768) return 'mobile';
    if (w <= 1024) return 'tablet';
    return 'desktop';
  }

  function fmtNum(n) {
    const num = Number(n) || 0;
    return num.toLocaleString('ko-KR');
  }

  function escHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function showBareunToast(msg) {
    let el = document.getElementById('bareun-global-toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'bareun-global-toast';
      el.style.cssText =
        'position:fixed;left:50%;bottom:84px;transform:translateX(-50%) translateY(10px);z-index:32000;' +
        'background:#171614;color:#FEF08A;border:1px solid #C5A059;padding:11px 18px;border-radius:999px;' +
        'font-family:Pretendard,-apple-system,sans-serif;font-size:13px;font-weight:800;' +
        'box-shadow:0 14px 32px rgba(0,0,0,0.38);opacity:0;pointer-events:none;transition:all 0.25s ease;' +
        'max-width:92vw;text-align:center;word-break:keep-all;';
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.style.opacity = '1';
    el.style.transform = 'translateX(-50%) translateY(0)';
    clearTimeout(el.__hideTimer);
    el.__hideTimer = setTimeout(function () {
      el.style.opacity = '0';
      el.style.transform = 'translateX(-50%) translateY(10px)';
    }, 2800);
  }

  /**
   * 4-App Individual Auto-Navigation Launcher (네이버지도 · 구글지도 · 티맵 · 카카오맵)
   */
  window.launchBareunMapNav = function (provider) {
    const navActMap = { naver: 'nav_naver', google: 'nav_google', tmap: 'nav_tmap', kakao: 'nav_kakao' };
    if (navActMap[provider]) trackBareunConversionEvent(navActMap[provider]);
    const lat = Number(clinicInfo.lat) || 36.35536;
    const lng = Number(clinicInfo.lng) || 127.44778;
    const name = clinicInfo.clinicName || '바른한의원 대전본점';
    const addr = clinicInfo.address || '대전광역시 대덕구 비래동로7번길 1, 2층';
    const encName = encodeURIComponent(name);
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent || '');

    if (provider === 'naver') {
      const webUrl = 'https://map.naver.com/p/search/' + encName;
      if (isMobile) {
        const appUrl = 'nmap://route/car?dlat=' + lat + '&dlng=' + lng + '&dname=' + encName + '&appname=com.bareunhaniwon.web';
        const startedAt = Date.now();
        window.location.href = appUrl;
        setTimeout(function () {
          if (!document.hidden && Date.now() - startedAt < 2200) {
            window.open(webUrl, '_blank', 'noopener,noreferrer');
          }
        }, 1350);
      } else {
        window.open(webUrl, '_blank', 'noopener,noreferrer');
      }
      return;
    }

    if (provider === 'google') {
      const googleDirUrl = 'https://www.google.com/maps/dir/?api=1&destination=' + lat + ',' + lng + '&travelmode=driving';
      window.open(googleDirUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    if (provider === 'tmap') {
      if (isMobile) {
        const tmapUrl = 'tmap://route?goalname=' + encName + '&goalx=' + lng + '&goaly=' + lat;
        const startedAt = Date.now();
        window.location.href = tmapUrl;
        setTimeout(function () {
          if (!document.hidden && Date.now() - startedAt < 2200) {
            if (navigator.clipboard && navigator.clipboard.writeText) {
              navigator.clipboard.writeText(addr).catch(function () {});
            }
            showBareunToast('티맵 앱이 설치되어 있지 않아 도로명 주소를 복사했습니다.');
          }
        }, 1400);
      } else {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(addr).catch(function () {});
        }
        showBareunToast('티맵(모바일 전용)용 도로명 주소가 복사되었습니다! PC 경로 안내를 함께 엽니다.');
        window.open('https://map.kakao.com/link/to/' + encName + ',' + lat + ',' + lng, '_blank', 'noopener,noreferrer');
      }
      return;
    }

    if (provider === 'kakao') {
      const kakaoUrl = 'https://map.kakao.com/link/to/' + encName + ',' + lat + ',' + lng;
      window.open(kakaoUrl, '_blank', 'noopener,noreferrer');
    }
  };

  window.copyBareunClinicAddress = function (btnEl) {
    const addr = clinicInfo.address || '대전광역시 대덕구 비래동로7번길 1, 2층';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(addr).then(function () {
        showBareunToast('✅ 도로명 주소가 클립보드에 복사되었습니다.');
        if (btnEl) {
          const orig = btnEl.textContent;
          btnEl.textContent = '✅ 주소 복사 완료!';
          setTimeout(function () { btnEl.textContent = orig; }, 1800);
        }
      }).catch(function () {
        window.prompt('아래 도로명 주소를 복사해 주세요:', addr);
      });
    } else {
      window.prompt('아래 도로명 주소를 복사해 주세요:', addr);
    }
  };

  window.handleBareunMobileKakaoReserve = function (ev) {
    if (typeof window.openConsultModal === 'function') {
      if (ev) ev.preventDefault();
      window.openConsultModal();
      return false;
    }
    const reserveTrigger = document.getElementById('btn-open-reserve');
    if (reserveTrigger) {
      if (ev) ev.preventDefault();
      reserveTrigger.click();
      return false;
    }
    return true;
  };

  function injectAnalyticsStyles() {
    if (document.getElementById('bareun-visit-analytics-styles')) return;
    const style = document.createElement('style');
    style.id = 'bareun-visit-analytics-styles';
    style.textContent = `
      /* TOP HEADER & FLOATING LIVE VISIT COUNTER PILL */
      .bareun-visit-pill-btn {
        appearance: none;
        display: inline-flex;
        align-items: center;
        gap: 7px;
        padding: 7px 13px;
        border-radius: 999px;
        background: linear-gradient(135deg, #171614 0%, #2D5A43 100%) !important;
        border: 1px solid rgba(110, 231, 183, 0.55) !important;
        color: #FFFFFF !important;
        font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
        font-size: 12px;
        font-weight: 800;
        letter-spacing: -0.01em;
        cursor: pointer;
        white-space: nowrap;
        box-shadow: 0 6px 18px rgba(23, 22, 20, 0.22);
        transition: all 0.22s cubic-bezier(0.22, 1, 0.36, 1);
        text-decoration: none !important;
        line-height: 1.2;
      }
      .bareun-visit-pill-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 24px rgba(45, 90, 67, 0.38);
        border-color: #FEF08A !important;
      }
      .bareun-loc-pill-btn {
        appearance: none;
        display: inline-flex;
        align-items: center;
        gap: 5px;
        padding: 7px 12px;
        border-radius: 999px;
        background: #FFFFFF !important;
        border: 1px solid rgba(74, 53, 37, 0.22) !important;
        color: #171614 !important;
        font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
        font-size: 12px;
        font-weight: 800;
        cursor: pointer;
        white-space: nowrap;
        box-shadow: 0 4px 12px rgba(23, 22, 20, 0.08);
        transition: all 0.2s ease;
        text-decoration: none !important;
        line-height: 1.2;
      }
      .bareun-loc-pill-btn:hover {
        border-color: #2D5A43 !important;
        color: #2D5A43 !important;
        transform: translateY(-1px);
      }
      .bareun-legal-utility-row {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        flex-wrap: wrap;
        margin-top: 10px;
      }
      .bareun-legal-util-btn {
        appearance: none;
        display: inline-flex;
        align-items: center;
        gap: 5px;
        padding: 6px 12px;
        border-radius: 999px;
        background: #FFFFFF;
        border: 1px solid rgba(74, 53, 37, 0.2);
        color: #2D5A43;
        font-family: 'Pretendard', -apple-system, sans-serif;
        font-size: 11.5px;
        font-weight: 800;
        cursor: pointer;
        text-decoration: none !important;
        transition: all 0.18s ease;
      }
      .bareun-legal-util-btn:hover {
        background: #2D5A43;
        color: #FFFFFF;
        border-color: #2D5A43;
      }

      .bareun-visit-live-dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #34D399;
        box-shadow: 0 0 8px #34D399;
        animation: bareunVisitPulse 1.5s infinite ease-in-out;
        flex-shrink: 0;
      }
      @keyframes bareunVisitPulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.42; transform: scale(1.38); }
      }
      .bareun-visit-pill-sep {
        opacity: 0.4;
        font-weight: 400;
      }
      .bareun-visit-pill-num {
        color: #FEF08A;
        font-weight: 900;
        font-variant-numeric: tabular-nums;
      }

      /* FLOATING BOTTOM-LEFT COMPACT COUNTER BADGE */
      #bareun-floating-visit-dock {
        position: fixed;
        left: 20px;
        bottom: 18px;
        z-index: 9990;
        display: flex;
        align-items: center;
        gap: 8px;
        pointer-events: auto;
      }
      body.is-body-explorer-page #bareun-floating-visit-dock {
        display: none;
      }
      @media (max-width: 1024px) {
        .bareun-visit-pill-btn {
          padding: 5px 9px;
          font-size: 10.5px;
          gap: 5px;
          flex-shrink: 0;
        }
        .bareun-loc-pill-btn {
          padding: 5px 9px;
          font-size: 10.5px;
          flex-shrink: 0;
        }
        #bareun-floating-visit-dock {
          display: none !important;
        }
      }
      @media (max-width: 520px) {
        .bareun-visit-pill-total-wrap {
          display: inline;
        }
      }

      /* HOLIDAY TOP FLOATING BANNER WHEN ENABLED */
      #bareun-global-holiday-strip {
        background: linear-gradient(90deg, #78350F 0%, #92400E 100%);
        color: #FEF3C7;
        font-family: 'Pretendard', -apple-system, sans-serif;
        font-size: 12.5px;
        font-weight: 800;
        padding: 8px 16px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        flex-wrap: wrap;
        z-index: 1250;
        position: relative;
      }

      /* MOBILE STICKY 3-BUTTON QUICK BAR (전화 / 카톡 / 네이버예약 ONLY — ZERO TALKTALK) */
      #bareun-mobile-quick-bar {
        display: none;
      }
      @media (max-width: 900px) {
        #bareun-mobile-quick-bar {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 14000;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 6px;
          padding: 8px 10px calc(8px + env(safe-area-inset-bottom, 0px));
          background: rgba(23, 22, 20, 0.96);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-top: 1px solid rgba(197, 160, 89, 0.38);
          box-shadow: 0 -10px 28px rgba(0, 0, 0, 0.28);
          font-family: 'Pretendard', -apple-system, sans-serif;
        }
        .bmqb-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          height: 42px;
          border-radius: 11px;
          font-size: 12.5px;
          font-weight: 900;
          letter-spacing: -0.02em;
          text-decoration: none !important;
          border: none;
          cursor: pointer;
          white-space: nowrap;
        }
        .bmqb-tel {
          background: #FFFFFF;
          color: #171614 !important;
        }
        .bmqb-kakao {
          background: #FEE500;
          color: #191919 !important;
        }
        .bmqb-naver {
          background: #03C75A;
          color: #FFFFFF !important;
        }
        /* Prevent overlap with bottom timelines / drawers on mobile */
        .minimal-bottom-timeline {
          bottom: 68px !important;
        }
        .story-dialogue-stage {
          bottom: 98px !important;
        }
        .skt-finale-stage {
          padding-bottom: 84px !important;
        }
        body:not(.is-home-3d) {
          padding-bottom: 72px !important;
        }
      }

      /* VISIT ANALYTICS MODAL */
      #bareun-visit-modal-backdrop,
      #bareun-location-modal-backdrop {
        position: fixed;
        inset: 0;
        z-index: 25000;
        background: rgba(12, 16, 23, 0.72);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        display: none;
        align-items: center;
        justify-content: center;
        padding: 18px;
        font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
        color: #0F172A;
        user-select: text;
      }
      #bareun-visit-modal-backdrop.open,
      #bareun-location-modal-backdrop.open {
        display: flex;
      }
      .bv-modal-dialog {
        width: min(1140px, 100%);
        max-height: 92vh;
        overflow-y: auto;
        background: #F8FAFC;
        border: 1.5px solid rgba(148, 163, 184, 0.35);
        border-radius: 26px;
        box-shadow: 0 32px 90px rgba(0, 0, 0, 0.55);
        display: flex;
        flex-direction: column;
        overflow-x: hidden;
        animation: bvModalPop 0.26s cubic-bezier(0.22, 1, 0.36, 1);
      }
      .bv-modal-dialog.is-consumer-compact {
        width: min(640px, 100%);
      }
      @keyframes bvModalPop {
        from { opacity: 0; transform: translateY(16px) scale(0.98); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }
      .bv-modal-header {
        background: linear-gradient(135deg, #171614 0%, #233329 55%, #2D5A43 100%);
        color: #FFFFFF;
        padding: 22px 26px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 14px;
        flex-wrap: wrap;
        border-bottom: 1px solid rgba(255, 255, 255, 0.12);
      }
      .bv-eyebrow {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 4px 11px;
        border-radius: 999px;
        background: rgba(16, 185, 129, 0.22);
        border: 1px solid rgba(52, 211, 153, 0.5);
        color: #A7F3D0;
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 0.04em;
        margin-bottom: 6px;
      }
      .bv-title {
        font-size: clamp(1.15rem, 2vw, 1.44rem);
        font-weight: 800;
        color: #FFFFFF;
        margin: 0;
        letter-spacing: -0.02em;
      }
      .bv-sub {
        font-size: 12.5px;
        color: #D1FAE5;
        margin-top: 3px;
      }
      .bv-header-actions {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
      }
      .bv-btn {
        appearance: none;
        border: 1px solid rgba(255, 255, 255, 0.24);
        background: rgba(255, 255, 255, 0.1);
        color: #FFFFFF;
        padding: 8px 14px;
        border-radius: 999px;
        font-size: 12px;
        font-weight: 800;
        cursor: pointer;
        transition: all 0.18s ease;
      }
      .bv-btn:hover { background: rgba(255, 255, 255, 0.22); }
      .bv-btn.gold { background: #FEF3C7; border-color: #F59E0B; color: #78350F; }
      .bv-btn.close { background: #FFFFFF; border-color: #FFFFFF; color: #0F172A; }

      .bv-modal-body {
        padding: 22px 26px 28px;
        display: flex;
        flex-direction: column;
        gap: 18px;
      }

      /* CONSUMER 2-CARD SUMMARY GRID */
      .bv-consumer-two-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 14px;
      }
      @media (max-width: 560px) {
        .bv-consumer-two-grid { grid-template-columns: 1fr; }
      }
      .bv-consumer-card {
        border-radius: 20px;
        padding: 22px 22px;
        border: 1px solid #E2E8F0;
        background: #FFFFFF;
        display: flex;
        flex-direction: column;
        gap: 8px;
        box-shadow: 0 8px 22px rgba(15, 23, 42, 0.05);
      }
      .bv-consumer-card.is-today {
        background: linear-gradient(135deg, #171614 0%, #2D5A43 100%);
        color: #FFFFFF;
        border-color: #2D5A43;
      }
      .bv-consumer-label {
        font-size: 12.5px;
        font-weight: 800;
        opacity: 0.88;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .bv-consumer-val {
        font-size: clamp(1.85rem, 3vw, 2.35rem);
        font-weight: 900;
        font-variant-numeric: tabular-nums;
        letter-spacing: -0.02em;
      }
      .bv-consumer-card.is-today .bv-consumer-val {
        color: #FEF08A;
      }
      .bv-consumer-LockNote {
        background: #F1F5F9;
        border: 1px dashed #CBD5E1;
        border-radius: 14px;
        padding: 13px 16px;
        font-size: 12.5px;
        color: #475569;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        flex-wrap: wrap;
      }

      /* MASTER 6 KPI SUMMARY CARDS & 5 SUB-TABS */
      .bv-kpi-grid {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 10px;
      }
      @media (max-width: 1020px) {
        .bv-kpi-grid { grid-template-columns: repeat(3, 1fr); }
      }
      @media (max-width: 600px) {
        .bv-kpi-grid { grid-template-columns: repeat(2, 1fr); }
      }
      .bv-kpi-card {
        background: #FFFFFF;
        border: 1px solid #E2E8F0;
        border-radius: 16px;
        padding: 13px 14px;
        box-shadow: 0 4px 14px rgba(15, 23, 42, 0.04);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 5px;
      }
      .bv-kpi-card.highlight {
        background: linear-gradient(135deg, #171614 0%, #2D5A43 100%);
        color: #FFFFFF;
        border-color: #2D5A43;
      }
      .bv-kpi-card.geo-highlight {
        background: linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%);
        color: #FFFFFF;
        border-color: #3B82F6;
      }
      .bv-kpi-label {
        font-size: 11px;
        font-weight: 800;
        color: #64748B;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .bv-kpi-card.highlight .bv-kpi-label { color: #A7F3D0; }
      .bv-kpi-card.geo-highlight .bv-kpi-label { color: #93C5FD; }
      .bv-kpi-value {
        font-size: clamp(1.22rem, 1.9vw, 1.56rem);
        font-weight: 900;
        color: #0F172A;
        font-variant-numeric: tabular-nums;
      }
      .bv-kpi-card.highlight .bv-kpi-value { color: #FEF08A; }
      .bv-kpi-card.geo-highlight .bv-kpi-value { color: #FDE68A; }
      .bv-kpi-foot { font-size: 11px; font-weight: 600; color: #475569; }
      .bv-kpi-card.highlight .bv-kpi-foot, .bv-kpi-card.geo-highlight .bv-kpi-foot { color: #E2E8F0; }

      .bv-master-tabs {
        display: flex;
        gap: 7px;
        flex-wrap: wrap;
        background: #EEF2F6;
        padding: 6px;
        border-radius: 16px;
        border: 1px solid #CBD5E1;
      }
      .bv-mtab-btn {
        appearance: none;
        flex: 1 1 auto;
        padding: 9px 13px;
        border-radius: 11px;
        border: 1px solid transparent;
        background: transparent;
        color: #334155;
        font-size: 12.5px;
        font-weight: 800;
        cursor: pointer;
        transition: all 0.18s ease;
        white-space: nowrap;
      }
      .bv-mtab-btn:hover { background: rgba(255,255,255,0.7); }
      .bv-mtab-btn.active {
        background: #171614;
        color: #FEF08A;
        border-color: #2D5A43;
        box-shadow: 0 4px 12px rgba(15, 23, 42, 0.18);
      }

      .bv-hour-bars {
        display: grid;
        grid-template-columns: repeat(24, 1fr);
        align-items: end;
        gap: 4px;
        height: 148px;
        padding-top: 16px;
        border-bottom: 1px solid #E2E8F0;
      }
      @media (max-width: 720px) {
        .bv-hour-bars { overflow-x: auto; min-width: 560px; }
      }
      .bv-hbar-col {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        height: 100%;
        gap: 3px;
      }
      .bv-hbar-fill {
        width: 100%;
        max-width: 18px;
        border-radius: 5px 5px 2px 2px;
        background: linear-gradient(180deg, #64748B 0%, #334155 100%);
        min-height: 4px;
      }
      .bv-hbar-col.is-peak .bv-hbar-fill {
        background: linear-gradient(180deg, #F59E0B 0%, #D97706 100%);
        box-shadow: 0 0 10px rgba(245, 158, 11, 0.5);
      }
      .bv-hbar-lbl { font-size: 9.5px; font-weight: 700; color: #64748B; margin-top: 3px; }
      .bv-data-table { width: 100%; border-collapse: collapse; font-size: 12px; text-align: left; }
      .bv-data-table th { background: #F1F5F9; color: #334155; padding: 8px 10px; font-weight: 800; border-bottom: 1px solid #CBD5E1; }
      .bv-data-table td { padding: 8px 10px; border-bottom: 1px solid #F1F5F9; color: #0F172A; }
      .bv-form-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
      @media (max-width: 760px) { .bv-form-grid { grid-template-columns: 1fr; } }
      .bv-form-input {
        width: 100%;
        box-sizing: border-box;
        padding: 10px 12px;
        border-radius: 10px;
        border: 1px solid #CBD5E1;
        background: #FFFFFF;
        font-size: 12.5px;
        font-family: inherit;
        color: #0F172A;
      }

      .bv-mid-grid {
        display: grid;
        grid-template-columns: 1.25fr 1fr;
        gap: 16px;
      }
      @media (max-width: 900px) { .bv-mid-grid { grid-template-columns: 1fr; } }
      .bv-panel {
        background: #FFFFFF;
        border: 1px solid #E2E8F0;
        border-radius: 18px;
        padding: 18px 20px;
      }
      .bv-panel-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        margin-bottom: 14px;
      }
      .bv-panel-title { font-size: 14px; font-weight: 800; color: #0F172A; }
      .bv-panel-badge {
        font-size: 11px;
        font-weight: 700;
        color: #2D5A43;
        background: #E8F2EC;
        padding: 3px 9px;
        border-radius: 999px;
      }
      .bv-chart-bars {
        display: grid;
        grid-template-columns: repeat(14, 1fr);
        align-items: end;
        gap: 6px;
        height: 168px;
        padding-top: 18px;
        border-bottom: 1px solid #E2E8F0;
      }
      .bv-bar-col {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        height: 100%;
        gap: 4px;
      }
      .bv-bar-num { font-size: 10px; font-weight: 800; color: #475569; font-variant-numeric: tabular-nums; }
      .bv-bar-fill {
        width: 100%;
        max-width: 24px;
        border-radius: 6px 6px 2px 2px;
        background: linear-gradient(180deg, #3D7357 0%, #2D5A43 100%);
        min-height: 6px;
      }
      .bv-bar-col.is-today .bv-bar-fill {
        background: linear-gradient(180deg, #10B981 0%, #047857 100%);
        box-shadow: 0 0 12px rgba(16, 185, 129, 0.45);
      }
      .bv-bar-date { font-size: 10px; font-weight: 700; color: #64748B; margin-top: 5px; }
      .bv-page-list { display: flex; flex-direction: column; gap: 9px; max-height: 220px; overflow-y: auto; }
      .bv-page-row { display: flex; flex-direction: column; gap: 4px; }
      .bv-page-top { display: flex; align-items: center; justify-content: space-between; font-size: 12.5px; font-weight: 700; color: #1E293B; }
      .bv-page-track { width: 100%; height: 7px; background: #F1F5F9; border-radius: 999px; overflow: hidden; }
      .bv-page-bar { height: 100%; border-radius: 999px; background: linear-gradient(90deg, #2D5A43 0%, #10B981 100%); }
      .bv-bot-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
      @media (max-width: 768px) { .bv-bot-grid { grid-template-columns: 1fr; } }
      .bv-chip-list { display: flex; flex-wrap: wrap; gap: 8px; }
      .bv-stat-chip {
        flex: 1 1 calc(50% - 8px);
        min-width: 130px;
        background: #F8FAFC;
        border: 1px solid #E2E8F0;
        border-radius: 12px;
        padding: 10px 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 12.5px;
        font-weight: 700;
      }
      .bv-master-box {
        background: #0F172A;
        color: #F8FAFC;
        border: 1.5px solid #F59E0B;
        border-radius: 18px;
        padding: 18px 20px;
      }
      .bv-log-table-wrap {
        max-height: 240px;
        overflow-y: auto;
        margin-top: 12px;
        border-radius: 12px;
        border: 1px solid #334155;
      }
      .bv-log-table { width: 100%; border-collapse: collapse; font-size: 12px; text-align: left; }
      .bv-log-table th { position: sticky; top: 0; background: #1E293B; color: #FDE68A; padding: 9px 10px; font-weight: 800; }
      .bv-log-table td { padding: 8px 10px; border-top: 1px solid #1E293B; color: #E2E8F0; }

      /* LOCATION & NON-COVERED FEES MODAL */
      .bloc-dialog {
        width: min(980px, 100%);
        max-height: 91vh;
        overflow-y: auto;
        background: #F5F1E8;
        border: 1.5px solid rgba(74, 53, 37, 0.22);
        border-radius: 26px;
        box-shadow: 0 32px 90px rgba(0, 0, 0, 0.55);
        display: flex;
        flex-direction: column;
        animation: bvModalPop 0.25s cubic-bezier(0.22, 1, 0.36, 1);
      }
      .bloc-tabs {
        display: flex;
        gap: 8px;
        padding: 14px 24px 0;
        flex-wrap: wrap;
      }
      .bloc-tab-btn {
        appearance: none;
        padding: 10px 18px;
        border-radius: 999px;
        border: 1px solid rgba(74, 53, 37, 0.18);
        background: #FFFFFF;
        color: #4A3525;
        font-size: 13px;
        font-weight: 900;
        cursor: pointer;
      }
      .bloc-tab-btn.active {
        background: #2D5A43;
        color: #FFFFFF;
        border-color: #2D5A43;
      }
      .bloc-nav-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
      }
      @media (max-width: 820px) {
        .bloc-nav-grid { grid-template-columns: repeat(2, 1fr); }
      }
      .bloc-nav-btn {
        appearance: none;
        display: flex;
        align-items: center;
        gap: 11px;
        padding: 13px 14px;
        border-radius: 16px;
        border: 1.5px solid rgba(74, 53, 37, 0.14);
        background: #FFFFFF;
        cursor: pointer;
        text-align: left;
        transition: all 0.2s ease;
      }
      .bloc-nav-btn:hover {
        transform: translateY(-2px);
        border-color: #2D5A43;
        box-shadow: 0 10px 22px rgba(23, 22, 20, 0.09);
      }
      .bloc-nav-ico {
        width: 42px;
        height: 42px;
        border-radius: 12px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .bloc-two-col {
        display: grid;
        grid-template-columns: 1.15fr 0.85fr;
        gap: 16px;
      }
      @media (max-width: 820px) {
        .bloc-two-col { grid-template-columns: 1fr; }
      }
      .bloc-3ch-row {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
      }
      @media (max-width: 640px) {
        .bloc-3ch-row { grid-template-columns: 1fr; }
      }
    `;
    document.head.appendChild(style);
  }

  function createCounterButtonHtml(stats) {
    const todayPv = stats ? fmtNum(stats.todayPv) : '...';
    const totalPv = stats ? fmtNum(stats.totalPv) : '...';
    return (
      '<span class="bareun-visit-live-dot"></span>' +
      '<span>📊 조회수</span>' +
      '<span>오늘 <strong class="bareun-visit-pill-num" data-bv-today>' + todayPv + '</strong></span>' +
      '<span class="bareun-visit-pill-total-wrap">' +
        '<span class="bareun-visit-pill-sep">·</span> ' +
        '<span>누적 <strong class="bareun-visit-pill-num" data-bv-total>' + totalPv + '</strong></span>' +
      '</span>'
    );
  }

  function updateAllCounterPills(stats) {
    if (!stats) return;
    latestStats = stats;
    // Persist ONLY Today & Cumulative counts in localStorage (zero detailed analytics cached)
    try {
      localStorage.setItem(LOCAL_CACHE_KEY, JSON.stringify({
        ok: true,
        todayPv: Number(stats.todayPv) || 0,
        totalPv: Number(stats.totalPv) || 0,
        serverTime: stats.serverTime || ''
      }));
    } catch (e) {}

    document.querySelectorAll('[data-bv-today]').forEach(function (el) {
      el.textContent = fmtNum(stats.todayPv);
    });
    document.querySelectorAll('[data-bv-total]').forEach(function (el) {
      el.textContent = fmtNum(stats.totalPv);
    });
    document.querySelectorAll('[data-bv-active]').forEach(function (el) {
      el.textContent = fmtNum(stats.activeNow || 1);
    });
  }

  function hydrateLocationPageDomIfPresent() {
    const gEyebrow = document.getElementById('loc-greeting-eyebrow');
    if (gEyebrow) gEyebrow.textContent = clinicInfo.greetingEyebrow || '';
    const gTitle = document.getElementById('loc-greeting-title');
    if (gTitle) gTitle.textContent = clinicInfo.greetingTitle || '';
    const gBody = document.getElementById('loc-greeting-body');
    if (gBody) gBody.textContent = clinicInfo.greetingBody || '';
    const gSign = document.getElementById('loc-greeting-sign');
    if (gSign) gSign.textContent = clinicInfo.greetingSign || '';

    const hBanner = document.getElementById('loc-holiday-banner');
    const hBadge = document.getElementById('loc-holiday-badge');
    const hText = document.getElementById('loc-holiday-text');
    if (hBanner && clinicInfo.holidayNotice) {
      if (hBadge) hBadge.textContent = clinicInfo.holidayNotice.badge || '진료 안내';
      if (hText) hText.textContent = clinicInfo.holidayNotice.text || '';
      if (clinicInfo.holidayNotice.enabled) {
        hBanner.style.background = '#FEF3C7';
        hBanner.style.borderColor = '#F59E0B';
      }
    }

    const addrEl = document.getElementById('loc-address-text');
    if (addrEl) addrEl.textContent = clinicInfo.address || '';

    const mapIframe = document.getElementById('loc-google-map-iframe');
    if (mapIframe && clinicInfo.lat && clinicInfo.lng) {
      const targetSrc = 'https://maps.google.com/maps?q=' + clinicInfo.lat + ',' + clinicInfo.lng + '&z=17&hl=ko&output=embed';
      if (mapIframe.getAttribute('src') !== targetSrc) {
        mapIframe.setAttribute('src', targetSrc);
      }
    }

    const hoursList = document.getElementById('loc-hours-list');
    if (hoursList && Array.isArray(clinicInfo.hours)) {
      hoursList.innerHTML = clinicInfo.hours.map(function (h) {
        return (
          '<div class="loc-hour-row">' +
            '<div class="loc-hour-day">' + escHtml(h.day) + '</div>' +
            '<div class="loc-hour-right">' +
              '<strong class="loc-hour-time">' + escHtml(h.time) + '</strong>' +
              (h.note ? '<span class="loc-hour-note">' + escHtml(h.note) + '</span>' : '') +
            '</div>' +
          '</div>'
        );
      }).join('');
    }

    const pGuide = document.getElementById('loc-parking-guide');
    if (pGuide) pGuide.textContent = clinicInfo.parkingGuide || '';
    const tGuide = document.getElementById('loc-transit-guide');
    if (tGuide) tGuide.textContent = clinicInfo.transitGuide || '';

    const feeUpd = document.getElementById('loc-fee-updated');
    if (feeUpd && clinicInfo.nonCoveredUpdatedDate) {
      feeUpd.textContent = '최종 고지 기준일: ' + clinicInfo.nonCoveredUpdatedDate;
    }
    const feeTbody = document.getElementById('loc-fee-tbody');
    if (feeTbody && Array.isArray(clinicInfo.nonCoveredFees)) {
      feeTbody.innerHTML = clinicInfo.nonCoveredFees.map(function (f) {
        return (
          '<tr>' +
            '<td><span class="fee-cat-pill">' + escHtml(f.category) + '</span></td>' +
            '<td><strong>' + escHtml(f.name) + '</strong></td>' +
            '<td>' + escHtml(f.spec || '-') + '</td>' +
            '<td class="fee-price-cell">' + escHtml(f.price) + '</td>' +
            '<td class="fee-note-cell">' + escHtml(f.note || '') + '</td>' +
          '</tr>'
        );
      }).join('');
    }

    // Update mobile quick bar links dynamically
    const mobBar = document.getElementById('bareun-mobile-quick-bar');
    if (mobBar) {
      const telA = mobBar.querySelector('.bmqb-tel');
      const kakaoA = mobBar.querySelector('.bmqb-kakao');
      const naverA = mobBar.querySelector('.bmqb-naver');
      const cleanTel = 'tel:' + String(clinicInfo.phone || '010-5631-1275').replace(/[^0-9+]/g, '');
      if (telA) telA.setAttribute('href', cleanTel);
      if (kakaoA) kakaoA.setAttribute('href', clinicInfo.kakaoUrl || 'https://pf.kakao.com/_ykxcLK');
      if (naverA) naverA.setAttribute('href', clinicInfo.naverBookingUrl || 'https://naver.me/5U1ELn8L');
    }

    // Global Holiday Notice Strip (when temporary holiday notice is enabled by Master in Studio)
    const existingStrip = document.getElementById('bareun-global-holiday-strip');
    if (clinicInfo.holidayNotice && clinicInfo.holidayNotice.enabled && clinicInfo.holidayNotice.text && detectPageSlug() !== 'location') {
      if (!existingStrip && !isStudioEditor) {
        const strip = document.createElement('div');
        strip.id = 'bareun-global-holiday-strip';
        strip.innerHTML =
          '<span style="background:#FDE68A;color:#78350F;padding:2px 8px;border-radius:999px;font-size:11px;font-weight:900;">' +
            escHtml(clinicInfo.holidayNotice.badge || '휴진·진료 공지') +
          '</span>' +
          '<span>' + escHtml(clinicInfo.holidayNotice.text) + '</span>' +
          '<button type="button" onclick="window.openBareunLocationModal(\'location\')" style="background:transparent;border:1px solid rgba(254,243,199,0.5);color:#FEF3C7;border-radius:999px;padding:2px 9px;font-size:11px;font-weight:800;cursor:pointer;">진료시간 상세 →</button>';
        document.body.insertBefore(strip, document.body.firstChild);
      }
    } else if (existingStrip) {
      existingStrip.remove();
    }
  }

  async function fetchLiveClinicInfo() {
    try {
      const res = await fetch('/wp-json/bareun/v1/clinic-info?_t=' + Date.now(), {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        credentials: 'same-origin'
      });
      if (!res.ok) return;
      const data = await res.json();
      if (data && data.ok && data.info) {
        clinicInfo = mergeClinicInfo(data.info);
        hydrateLocationPageDomIfPresent();
      }
    } catch (e) {}
  }

  function mountHeaderAndFloatingButtons() {
    injectAnalyticsStyles();
    if (isStudioEditor) return;

    const currentSlug = detectPageSlug();
    if (currentSlug === 'home') {
      document.body.classList.add('is-home-3d');
    }
    if (window.location.pathname.includes('body-explorer')) {
      document.body.classList.add('is-body-explorer-page');
    }

    // 1) Inject Counter + Location Pill into top navigation bar if present
    const navTargets = [
      document.querySelector('.spatial-top-nav .nav-right-actions'),
      document.querySelector('.journal-gnb .gnb-actions'),
      document.querySelector('.vibrant-header .vh-right-actions'),
      document.querySelector('.vibrant-top-bar .vtb-right'),
      document.querySelector('#header .header-right'),
      document.querySelector('.app-header .header-actions')
    ];

    navTargets.forEach(function (container) {
      if (!container) return;
      if (currentSlug !== 'location' && !container.querySelector('.bareun-loc-pill-btn')) {
        const locBtn = document.createElement('button');
        locBtn.type = 'button';
        locBtn.className = 'bareun-loc-pill-btn';
        locBtn.title = '오시는길 · 자동 길안내(네이버/구글/티맵/카카오) · 진료시간 · 비급여 안내';
        locBtn.innerHTML = '📍 오시는길';
        locBtn.onclick = function () { window.openBareunLocationModal('location'); };
        container.insertBefore(locBtn, container.firstChild);
      }
      if (!container.querySelector('.bareun-visit-pill-btn')) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'bareun-visit-pill-btn';
        btn.title = '홈페이지 오늘 및 누적 방문 조회수 확인';
        btn.innerHTML = createCounterButtonHtml(latestStats);
        btn.onclick = function () { window.openBareunVisitModal(); };
        container.insertBefore(btn, container.firstChild);
      }
    });

    // 2) Inject [📍 오시는길 · 진료시간] & [📋 비급여 진료비 안내] into detail legal footers & main finale
    document.querySelectorAll('.bareun-detail-legal-info').forEach(function (el) {
      if (el.querySelector('.bareun-legal-utility-row')) return;
      const row = document.createElement('div');
      row.className = 'bareun-legal-utility-row';
      row.innerHTML =
        '<button type="button" class="bareun-legal-util-btn" onclick="window.openBareunLocationModal(\'location\')">📍 오시는길 · 자동 길안내 · 진료시간</button>' +
        '<button type="button" class="bareun-legal-util-btn" onclick="window.openBareunLocationModal(\'fees\')">📋 비급여 진료비용 안내표</button>' +
        '<a class="bareun-legal-util-btn" href="' + escHtml(getLocationPageHref()) + '">🗺️ 오시는길 전용 페이지 ↗</a>';
      el.appendChild(row);
    });

    const finaleControls = document.querySelector('.skt-finale-controls');
    if (finaleControls && !finaleControls.querySelector('[data-bareun-loc-finale]')) {
      const wrap = document.createElement('div');
      wrap.setAttribute('data-bareun-loc-finale', '1');
      wrap.style.cssText = 'display:flex;gap:8px;justify-content:center;flex-wrap:wrap;width:100%;margin-top:8px;';
      wrap.innerHTML =
        '<button type="button" class="bareun-legal-util-btn" style="padding:9px 15px;font-size:12.5px;" onclick="window.openBareunLocationModal(\'location\')">📍 오시는길 · 4대 내비 자동길안내 · 진료시간</button>' +
        '<button type="button" class="bareun-legal-util-btn" style="padding:9px 15px;font-size:12.5px;" onclick="window.openBareunLocationModal(\'fees\')">📋 비급여 진료비용 안내표</button>';
      finaleControls.appendChild(wrap);
    }

    // 3) Compact floating bottom-left counter badge on desktop
    if (!document.getElementById('bareun-floating-visit-dock')) {
      const dock = document.createElement('div');
      dock.id = 'bareun-floating-visit-dock';
      const fbtn = document.createElement('button');
      fbtn.type = 'button';
      fbtn.className = 'bareun-visit-pill-btn';
      fbtn.title = '홈페이지 방문 조회수 확인';
      fbtn.innerHTML = createCounterButtonHtml(latestStats);
      fbtn.onclick = function () { window.openBareunVisitModal(); };
      dock.appendChild(fbtn);
      document.body.appendChild(dock);
    }

    // 4) Mobile Sticky 3-Button Quick Reservation Bar (전화 / 카톡 / 네이버예약 ONLY — ZERO TalkTalk)
    if (!document.getElementById('bareun-mobile-quick-bar')) {
      const cleanTel = 'tel:' + String(clinicInfo.phone || '010-5631-1275').replace(/[^0-9+]/g, '');
      const bar = document.createElement('nav');
      bar.id = 'bareun-mobile-quick-bar';
      bar.setAttribute('aria-label', '모바일 빠른 상담 및 예약 바');
      bar.innerHTML =
        '<a class="bmqb-btn bmqb-tel" href="' + escHtml(cleanTel) + '">📞 전화상담</a>' +
        '<a class="bmqb-btn bmqb-kakao" href="' + escHtml(clinicInfo.kakaoUrl || 'https://pf.kakao.com/_ykxcLK') + '" target="_blank" rel="noopener noreferrer" onclick="return window.handleBareunMobileKakaoReserve(event)">💬 카톡예약</a>' +
        '<a class="bmqb-btn bmqb-naver" href="' + escHtml(clinicInfo.naverBookingUrl || 'https://naver.me/5U1ELn8L') + '" target="_blank" rel="noopener noreferrer">📍 네이버예약</a>';
      document.body.appendChild(bar);
    }

    // 5) Visit Modal Container
    if (!document.getElementById('bareun-visit-modal-backdrop')) {
      const modal = document.createElement('div');
      modal.id = 'bareun-visit-modal-backdrop';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('aria-label', '바른한의원 홈페이지 방문 조회수 현황');
      modal.onclick = function (e) {
        if (e.target === modal) window.closeBareunVisitModal();
      };
      modal.innerHTML = '<div class="bv-modal-dialog is-consumer-compact" id="bareun-visit-modal-dialog"></div>';
      document.body.appendChild(modal);
    }

    // 6) Location & Non-Covered Fees Modal Container
    if (!document.getElementById('bareun-location-modal-backdrop')) {
      const locModal = document.createElement('div');
      locModal.id = 'bareun-location-modal-backdrop';
      locModal.setAttribute('role', 'dialog');
      locModal.setAttribute('aria-modal', 'true');
      locModal.setAttribute('aria-label', '바른한의원 오시는길 · 진료시간 · 비급여 진료비 안내');
      locModal.onclick = function (e) {
        if (e.target === locModal) window.closeBareunLocationModal();
      };
      locModal.innerHTML = '<div class="bloc-dialog" id="bareun-location-modal-dialog"></div>';
      document.body.appendChild(locModal);
    }

    hydrateLocationPageDomIfPresent();
  }

  function renderLocationModalContent() {
    const dialog = document.getElementById('bareun-location-modal-dialog');
    if (!dialog) return;

    const lat = Number(clinicInfo.lat) || 36.35536;
    const lng = Number(clinicInfo.lng) || 127.44778;
    const phone = clinicInfo.phone || '010-5631-1275';
    const cleanTel = 'tel:' + String(phone).replace(/[^0-9+]/g, '');
    const hours = Array.isArray(clinicInfo.hours) ? clinicInfo.hours : [];
    const fees = Array.isArray(clinicInfo.nonCoveredFees) ? clinicInfo.nonCoveredFees : [];
    const hn = clinicInfo.holidayNotice || {};

    const hoursHtml = hours.map(function (h) {
      return (
        '<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px;padding:9px 0;border-bottom:1px dashed rgba(74,53,37,0.14);font-size:13px;">' +
          '<span style="font-weight:800;color:#171614;">' + escHtml(h.day) + '</span>' +
          '<div style="text-align:right;">' +
            '<strong style="color:#2D5A43;font-size:13.5px;">' + escHtml(h.time) + '</strong>' +
            (h.note ? '<div style="font-size:11.5px;color:#6B7280;">' + escHtml(h.note) + '</div>' : '') +
          '</div>' +
        '</div>'
      );
    }).join('');

    const feeRowsHtml = fees.map(function (f) {
      return (
        '<tr>' +
          '<td style="padding:10px 12px;border-top:1px solid #E5E7EB;"><span style="display:inline-block;padding:3px 8px;border-radius:999px;background:#E8F2EC;color:#2D5A43;font-size:11px;font-weight:800;">' + escHtml(f.category) + '</span></td>' +
          '<td style="padding:10px 12px;border-top:1px solid #E5E7EB;font-weight:800;color:#171614;">' + escHtml(f.name) + '</td>' +
          '<td style="padding:10px 12px;border-top:1px solid #E5E7EB;color:#4B5563;">' + escHtml(f.spec || '-') + '</td>' +
          '<td style="padding:10px 12px;border-top:1px solid #E5E7EB;font-weight:900;color:#2D5A43;white-space:nowrap;">' + escHtml(f.price) + '</td>' +
          '<td style="padding:10px 12px;border-top:1px solid #E5E7EB;font-size:12px;color:#6B7280;">' + escHtml(f.note || '') + '</td>' +
        '</tr>'
      );
    }).join('');

    const tabBodyHtml = activeLocationTab === 'fees'
      ? (
        '<div style="padding:20px 24px 26px;display:flex;flex-direction:column;gap:14px;">' +
          '<div style="background:#FFFFFF;border-radius:18px;padding:18px 20px;border:1px solid rgba(74,53,37,0.14);">' +
            '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:10px;">' +
              '<div>' +
                '<div style="font-size:11px;font-weight:900;color:#2D5A43;letter-spacing:0.06em;">MEDICAL LAW ARTICLE 45 · 의료법 제45조 비급여 고지</div>' +
                '<h3 style="font-size:17px;font-weight:900;color:#171614;margin:2px 0 0;">비급여 진료비용 및 제증명 수수료 안내표</h3>' +
              '</div>' +
              '<span style="font-size:12px;font-weight:700;color:#6B7280;">고지 기준일: ' + escHtml(clinicInfo.nonCoveredUpdatedDate || '2026-11-15') + '</span>' +
            '</div>' +
            '<p style="font-size:12.5px;color:#4B5563;margin-bottom:12px;">의료법 제45조 및 시행규칙 제42조의2에 따라 비급여 진료비용을 투명하게 고지합니다. 환자분의 증상·체질·약재 구성에 따라 1:1 진찰 후 상세 안내해 드립니다.</p>' +
            '<div style="overflow-x:auto;border-radius:14px;border:1px solid #E5E7EB;">' +
              '<table style="width:100%;min-width:600px;border-collapse:collapse;font-size:12.5px;text-align:left;">' +
                '<thead><tr style="background:#171614;color:#F5D36C;">' +
                  '<th style="padding:10px 12px;">분류</th><th style="padding:10px 12px;">비급여 항목명</th><th style="padding:10px 12px;">기준/규격</th><th style="padding:10px 12px;">비용 안내</th><th style="padding:10px 12px;">비고</th>' +
                '</tr></thead>' +
                '<tbody>' + feeRowsHtml + '</tbody>' +
              '</table>' +
            '</div>' +
          '</div>' +
        '</div>'
      )
      : (
        '<div style="padding:18px 24px 26px;display:flex;flex-direction:column;gap:16px;">' +
          /* Warm Greeting Box */
          '<div style="background:linear-gradient(135deg,#171614 0%,#233329 58%,#2D5A43 100%);color:#FFFFFF;border-radius:20px;padding:20px 22px;">' +
            '<div style="font-size:11px;font-weight:800;color:#A7F3D0;letter-spacing:0.05em;margin-bottom:6px;">' + escHtml(clinicInfo.greetingEyebrow) + '</div>' +
            '<div style="font-size:16.5px;font-weight:900;line-height:1.4;margin-bottom:8px;">' + escHtml(clinicInfo.greetingTitle) + '</div>' +
            '<div style="font-size:13px;color:rgba(255,255,255,0.88);line-height:1.68;">' + escHtml(clinicInfo.greetingBody) + '</div>' +
            '<div style="margin-top:10px;padding-top:10px;border-top:1px solid rgba(255,255,255,0.14);display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;font-size:12.5px;color:#F5D36C;font-weight:800;">' +
              '<span>' + escHtml(clinicInfo.greetingSign) + '</span>' +
              '<a href="' + escHtml(getLocationPageHref()) + '" style="color:#FFFFFF;text-decoration:underline;">오시는길 전용 페이지 전체보기 ↗</a>' +
            '</div>' +
          '</div>' +

          /* Holiday / Operation Notice */
          (hn.text ? (
            '<div style="background:' + (hn.enabled ? '#FEF3C7' : '#E8F2EC') + ';border:1px solid ' + (hn.enabled ? '#F59E0B' : '#2D5A43') + ';border-radius:14px;padding:11px 15px;font-size:12.5px;font-weight:800;color:#171614;display:flex;align-items:center;gap:8px;flex-wrap:wrap;">' +
              '<span style="background:#171614;color:#FEF08A;padding:2px 9px;border-radius:999px;font-size:11px;">' + escHtml(hn.badge || '진료 안내') + '</span>' +
              '<span>' + escHtml(hn.text) + '</span>' +
            '</div>'
          ) : '') +

          /* Road Address + Copy */
          '<div style="background:#FFFFFF;border:1px solid rgba(74,53,37,0.14);border-radius:16px;padding:13px 16px;display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;">' +
            '<div>' +
              '<div style="font-size:11px;font-weight:800;color:#6B7280;">도로명 주소 (우편번호 ' + escHtml(clinicInfo.postalCode || '34417') + ')</div>' +
              '<strong style="font-size:14.5px;color:#171614;">' + escHtml(clinicInfo.address) + '</strong>' +
            '</div>' +
            '<button type="button" onclick="window.copyBareunClinicAddress(this)" style="background:#171614;color:#FFFFFF;border:none;border-radius:999px;padding:8px 14px;font-size:12px;font-weight:800;cursor:pointer;">📋 도로명 주소 복사</button>' +
          '</div>' +

          /* 4 Brand Auto-Navigation Buttons */
          '<div>' +
            '<div style="font-size:12px;font-weight:900;color:#2D5A43;margin-bottom:8px;">🧭 원하시는 내비게이션 아이콘 클릭 시 즉시 자동 길안내</div>' +
            '<div class="bloc-nav-grid">' +
              '<button type="button" class="bloc-nav-btn" onclick="window.launchBareunMapNav(\'naver\')">' +
                '<span class="bloc-nav-ico" style="background:#03C75A;"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M5 4.5h4.3l5.4 7.8V4.5H19v15h-4.3L9.3 11.7v7.8H5v-15z" fill="#FFFFFF"/></svg></span>' +
                '<span><strong style="display:block;font-size:13.5px;color:#171614;">네이버지도</strong><span style="font-size:11px;color:#6B7280;font-weight:700;">자동 길안내 →</span></span>' +
              '</button>' +
              '<button type="button" class="bloc-nav-btn" onclick="window.launchBareunMapNav(\'google\')">' +
                '<span class="bloc-nav-ico" style="background:#FFFFFF;border:1px solid #E5E7EB;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2C7.86 2 4.5 5.36 4.5 9.5c0 5.25 7.5 12.5 7.5 12.5s7.5-7.25 7.5-12.5C19.5 5.36 16.14 2 12 2z" fill="#EA4335"/><path d="M12 2C7.86 2 4.5 5.36 4.5 9.5c0 1.78.64 3.42 1.7 4.7L15.8 4.6A7.46 7.46 0 0 0 12 2z" fill="#4285F4"/><path d="M6.2 14.2C8.08 17.55 12 22 12 22s2.15-2.08 4.18-4.88L8.8 9.75l-2.6 4.45z" fill="#34A853"/><circle cx="12" cy="9.5" r="3.1" fill="#FFFFFF"/></svg></span>' +
                '<span><strong style="display:block;font-size:13.5px;color:#171614;">구글지도</strong><span style="font-size:11px;color:#6B7280;font-weight:700;">자동 길안내 →</span></span>' +
              '</button>' +
              '<button type="button" class="bloc-nav-btn" onclick="window.launchBareunMapNav(\'tmap\')">' +
                '<span class="bloc-nav-ico" style="background:linear-gradient(135deg,#FF2D55 0%,#6E3AFF 52%,#00C7BE 100%);"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4.5 6h15v3.4h-5.6V19h-3.8V9.4H4.5V6z" fill="#FFFFFF"/></svg></span>' +
                '<span><strong style="display:block;font-size:13.5px;color:#171614;">티맵 (TMAP)</strong><span style="font-size:11px;color:#6B7280;font-weight:700;">내비 즉시 출발 →</span></span>' +
              '</button>' +
              '<button type="button" class="bloc-nav-btn" onclick="window.launchBareunMapNav(\'kakao\')">' +
                '<span class="bloc-nav-ico" style="background:#FEE500;"><svg width="23" height="23" viewBox="0 0 24 24" fill="none"><path d="M12 2.5C7.58 2.5 4 6.08 4 10.5c0 5.55 8 11 8 11s8-5.45 8-11c0-4.42-3.58-8-8-8z" fill="#1866FF"/><circle cx="12" cy="10.2" r="3.2" fill="#FEE500"/></svg></span>' +
                '<span><strong style="display:block;font-size:13.5px;color:#171614;">카카오맵</strong><span style="font-size:11px;color:#6B7280;font-weight:700;">자동 길안내 →</span></span>' +
              '</button>' +
            '</div>' +
          '</div>' +

          /* Map + Hours */
          '<div class="bloc-two-col">' +
            '<div style="border-radius:16px;overflow:hidden;border:1px solid rgba(74,53,37,0.14);min-height:250px;background:#E5E7EB;">' +
              '<iframe title="바른한의원 대전본점 지도" loading="lazy" style="width:100%;height:100%;min-height:250px;border:0;display:block;" src="https://maps.google.com/maps?q=' + lat + ',' + lng + '&z=17&hl=ko&output=embed"></iframe>' +
            '</div>' +
            '<div style="background:#FFFFFF;border:1px solid rgba(74,53,37,0.14);border-radius:16px;padding:16px 18px;">' +
              '<div style="font-size:12px;font-weight:900;color:#2D5A43;margin-bottom:6px;">🕒 진료시간 · 점심시간 · 휴진일</div>' +
              hoursHtml +
              '<div style="margin-top:10px;font-size:12px;color:#4B5563;line-height:1.55;">' +
                '<strong>🚗 주차:</strong> ' + escHtml(clinicInfo.parkingGuide) + '<br>' +
                '<strong>🚌 대중교통:</strong> ' + escHtml(clinicInfo.transitGuide) +
              '</div>' +
            '</div>' +
          '</div>' +

          /* Strictly 3 Approved Reservation Buttons ONLY (Zero Naver TalkTalk) */
          '<div class="bloc-3ch-row">' +
            '<a href="' + escHtml(cleanTel) + '" style="display:flex;align-items:center;justify-content:center;gap:6px;padding:13px;border-radius:14px;background:#171614;color:#FFFFFF;font-weight:900;font-size:13.5px;text-decoration:none;">📞 전화상담 (' + escHtml(phone) + ')</a>' +
            '<a href="' + escHtml(clinicInfo.kakaoUrl || 'https://pf.kakao.com/_ykxcLK') + '" target="_blank" rel="noopener noreferrer" onclick="return window.handleBareunMobileKakaoReserve(event)" style="display:flex;align-items:center;justify-content:center;gap:6px;padding:13px;border-radius:14px;background:#FEE500;color:#191919;font-weight:900;font-size:13.5px;text-decoration:none;">💬 카카오톡 상담·예약</a>' +
            '<a href="' + escHtml(clinicInfo.naverBookingUrl || 'https://naver.me/5U1ELn8L') + '" target="_blank" rel="noopener noreferrer" style="display:flex;align-items:center;justify-content:center;gap:6px;padding:13px;border-radius:14px;background:#03C75A;color:#FFFFFF;font-weight:900;font-size:13.5px;text-decoration:none;">📍 네이버 예약 바로가기</a>' +
          '</div>' +
        '</div>'
      );

    dialog.innerHTML =
      '<div class="bv-modal-header">' +
        '<div>' +
          '<div class="bv-eyebrow">📍 BAREUN CLINIC GUIDE · 오시는길 · 진료시간 · 비급여 고지</div>' +
          '<h2 class="bv-title">' + escHtml(clinicInfo.clinicName) + ' 내원 및 진료 안내</h2>' +
        '</div>' +
        '<div class="bv-header-actions">' +
          '<a class="bv-btn" href="' + escHtml(getLocationPageHref()) + '" style="text-decoration:none;">전용 페이지 열기 ↗</a>' +
          '<button type="button" class="bv-btn close" onclick="window.closeBareunLocationModal()">✕ 닫기</button>' +
        '</div>' +
      '</div>' +
      '<div class="bloc-tabs">' +
        '<button type="button" class="bloc-tab-btn' + (activeLocationTab === 'location' ? ' active' : '') + '" onclick="window.switchBareunLocationTab(\'location\')">📍 오시는길 · 4대 내비 자동길안내 · 진료시간</button>' +
        '<button type="button" class="bloc-tab-btn' + (activeLocationTab === 'fees' ? ' active' : '') + '" onclick="window.switchBareunLocationTab(\'fees\')">📋 비급여 진료비용 안내표 (의료법 제45조)</button>' +
      '</div>' +
      tabBodyHtml;
  }

  window.openBareunLocationModal = function (tab) {
    activeLocationTab = tab === 'fees' ? 'fees' : 'location';
    mountHeaderAndFloatingButtons();
    const modal = document.getElementById('bareun-location-modal-backdrop');
    if (modal) modal.classList.add('open');
    renderLocationModalContent();
    fetchLiveClinicInfo().then(function () {
      if (modal && modal.classList.contains('open')) renderLocationModalContent();
    });
  };

  window.switchBareunLocationTab = function (tab) {
    activeLocationTab = tab === 'fees' ? 'fees' : 'location';
    renderLocationModalContent();
  };

  window.closeBareunLocationModal = function () {
    const modal = document.getElementById('bareun-location-modal-backdrop');
    if (modal) modal.classList.remove('open');
  };

  async function bootExternalAnalyticsTags() {
    if (isStudioEditor) return;
    try {
      const res = await fetch('/wp-json/bareun/v1/analytics/public-config?_t=' + Math.floor(Date.now() / 60000), {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        credentials: 'same-origin'
      });
      if (!res.ok) return;
      const cfg = await res.json();
      if (!cfg || !cfg.ok) return;

      const ga4Id = String(cfg.ga4MeasurementId || '').trim();
      const naverId = String(cfg.naverAnalyticsId || '').trim();

      if (ga4Id && !window.__BAREUN_GA4_READY__) {
        window.__BAREUN_GA4_READY__ = ga4Id;
        window.dataLayer = window.dataLayer || [];
        window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
        window.gtag('js', new Date());
        window.gtag('config', ga4Id, { allow_google_signals: true });
        const gs = document.createElement('script');
        gs.async = true;
        gs.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(ga4Id);
        document.head.appendChild(gs);
      }

      if (ga4Id && sessionAttribution.aiHint && !window.__BAREUN_GEO_GA4_SENT__) {
        window.__BAREUN_GEO_GA4_SENT__ = true;
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'geo_ai_referral', {
            ai_engine: sessionAttribution.aiHint,
            landing_slug: detectPageSlug()
          });
        }
      }

      if (naverId && !window.__BAREUN_NAVER_WCS_READY__) {
        window.__BAREUN_NAVER_WCS_READY__ = naverId;
        const ns = document.createElement('script');
        ns.async = true;
        ns.src = 'https://wcs.naver.net/wcslog.js';
        ns.onload = function () {
          try {
            if (!window.wcs_add) window.wcs_add = {};
            window.wcs_add['wa'] = naverId;
            if (window.wcs && typeof window.wcs_do === 'function') window.wcs_do();
          } catch (e) {}
        };
        document.head.appendChild(ns);
      }
    } catch (e) {}
  }

  function bindGlobalConversionClickTelemetry() {
    if (isStudioEditor || window.__BAREUN_CONV_BOUND__) return;
    window.__BAREUN_CONV_BOUND__ = true;
    document.addEventListener('click', function (ev) {
      const target = ev.target && ev.target.closest ? ev.target.closest('a, button') : null;
      if (!target) return;
      const href = String(target.getAttribute('href') || '').toLowerCase();
      const id = String(target.id || '').toLowerCase();
      const onclickAttr = String(target.getAttribute('onclick') || '');

      if (href.startsWith('tel:')) {
        trackBareunConversionEvent('tel_click');
      } else if (href.includes('pf.kakao.com') || onclickAttr.includes('handleBareunMobileKakaoReserve')) {
        trackBareunConversionEvent('kakao_click');
      } else if (href.includes('naver.me') || href.includes('booking.naver.com')) {
        trackBareunConversionEvent('naver_booking_click');
      } else if (id === 'btn-open-reserve' || onclickAttr.includes('openConsultModal')) {
        trackBareunConversionEvent('consult_modal_open');
      }
    }, true);
  }

  async function recordPageVisit() {
    if (isStudioEditor) return latestStats;
    const slug = detectPageSlug();
    const sessionKey = 'bareun_visited_' + slug + '_' + new Date().toISOString().slice(0, 13);
    const alreadyCountedThisHour = sessionStorage.getItem(sessionKey) === '1';

    const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
    const tok = getAuthToken();
    if (tok) headers['X-Bareun-Token'] = tok;

    try {
      const res = await fetch('/wp-json/bareun/v1/visits?_t=' + Date.now(), {
        method: alreadyCountedThisHour ? 'GET' : 'POST',
        headers: headers,
        credentials: 'same-origin',
        body: alreadyCountedThisHour
          ? undefined
          : JSON.stringify({
              pageSlug: slug,
              pageTitle: document.title || slug,
              deviceType: detectDeviceType(),
              referrer: document.referrer || sessionAttribution.referrer || '',
              landingSearch: window.location.search || sessionAttribution.landingSearch || '',
              aiHint: sessionAttribution.aiHint || '',
              visitorId: getVisitorId()
            })
      });
      const data = await res.json();
      if (data && data.ok) {
        if (!alreadyCountedThisHour) {
          try { sessionStorage.setItem(sessionKey, '1'); } catch (e) {}
        }
        isMasterAuthenticated = Boolean(data.isMaster || Array.isArray(data.recentLogs));
        updateAllCounterPills(data);
        return data;
      }
    } catch (err) {}

    if (!alreadyCountedThisHour && latestStats) {
      latestStats.todayPv = (Number(latestStats.todayPv) || 0) + 1;
      latestStats.totalPv = (Number(latestStats.totalPv) || 0) + 1;
      try { sessionStorage.setItem(sessionKey, '1'); } catch (e) {}
    }
    updateAllCounterPills(latestStats);
    return latestStats;
  }

  async function fetchLatestVisitStats(forceRefresh) {
    const tok = getAuthToken();
    const headers = { 'Accept': 'application/json' };
    if (tok) headers['X-Bareun-Token'] = tok;

    if (tok) {
      try {
        const q = forceRefresh ? '?forceRefresh=1&_t=' + Date.now() : '?_t=' + Date.now();
        const mRes = await fetch('/wp-json/bareun/v1/visits/master' + q, {
          method: 'GET',
          headers: headers,
          credentials: 'same-origin'
        });
        if (mRes.ok) {
          const mData = await mRes.json();
          if (mData && mData.ok && (mData.isMaster || Array.isArray(mData.recentLogs))) {
            isMasterAuthenticated = true;
            updateAllCounterPills(mData);
            return mData;
          }
        } else if (mRes.status === 401 || mRes.status === 403) {
          isMasterAuthenticated = false;
        }
      } catch (e) {}
    } else {
      isMasterAuthenticated = false;
    }

    try {
      const res = await fetch('/wp-json/bareun/v1/visits?_t=' + Date.now(), {
        method: 'GET',
        headers: headers,
        credentials: 'same-origin'
      });
      const data = await res.json();
      if (data && data.ok) {
        isMasterAuthenticated = Boolean(data.isMaster || Array.isArray(data.recentLogs));
        updateAllCounterPills(data);
        return data;
      }
    } catch (e) {}
    return latestStats;
  }

  window.switchBareunMasterAnalyticsTab = function (tab) {
    activeMasterTab = tab || 'overview';
    renderVisitModalContent(latestStats);
  };

  function renderVisitModalContent(stats) {
    const dialog = document.getElementById('bareun-visit-modal-dialog');
    if (!dialog) return;

    if (!stats) {
      dialog.innerHTML = '<div style="padding:48px;text-align:center;font-weight:800;">실시간 방문 조회수 데이터를 불러오는 중입니다...</div>';
      return;
    }

    const showMasterFull = Boolean(isMasterAuthenticated && (stats.isMaster || Array.isArray(stats.recentLogs)));
    dialog.classList.toggle('is-consumer-compact', !showMasterFull);

    // -------------------------------------------------------------------------
    // CONSUMER VIEW: ONLY Today Views & Cumulative Views (Zero Detailed Stats)
    // -------------------------------------------------------------------------
    if (!showMasterFull) {
      dialog.innerHTML =
        '<div class="bv-modal-header">' +
          '<div>' +
            '<div class="bv-eyebrow"><span class="bareun-visit-live-dot"></span> LIVE VIEW COUNTER · 실시간 방문 조회수</div>' +
            '<h2 class="bv-title">바른한의원 대전본점 방문 조회수 현황</h2>' +
            '<div class="bv-sub">기준 시각: ' + escHtml(stats.serverTime || '실시간 연동중') + '</div>' +
          '</div>' +
          '<div class="bv-header-actions">' +
            '<button type="button" class="bv-btn" onclick="window.refreshBareunVisitModal()">↻ 새로고침</button>' +
            '<button type="button" class="bv-btn gold" onclick="window.toggleBareunVisitMasterLogin()">👑 마스터 로그인</button>' +
            '<button type="button" class="bv-btn close" onclick="window.closeBareunVisitModal()">✕ 닫기</button>' +
          '</div>' +
        '</div>' +
        '<div class="bv-modal-body">' +
          '<div class="bv-consumer-two-grid">' +
            '<div class="bv-consumer-card is-today">' +
              '<div class="bv-consumer-label"><span>오늘 방문 조회수 (TODAY)</span><span>🔥</span></div>' +
              '<div class="bv-consumer-val">' + fmtNum(stats.todayPv) + ' <small style="font-size:15px;font-weight:800;">회</small></div>' +
              '<div style="font-size:12px;color:#A7F3D0;font-weight:700;">오늘 하루 홈페이지를 찾아주신 조회수</div>' +
            '</div>' +
            '<div class="bv-consumer-card">' +
              '<div class="bv-consumer-label" style="color:#475569;"><span>누적 총 조회수 (TOTAL)</span><span>🏛️</span></div>' +
              '<div class="bv-consumer-val" style="color:#2D5A43;">' + fmtNum(stats.totalPv) + ' <small style="font-size:15px;font-weight:800;color:#64748B;">회</small></div>' +
              '<div style="font-size:12px;color:#64748B;font-weight:700;">개원 이래 누적 홈페이지 총 방문 조회수</div>' +
            '</div>' +
          '</div>' +

          '<div class="bv-consumer-LockNote">' +
            '<span>🔒 플랫폼별 · GEO AI 검색 · 유입 키워드 · 연령/성별 · 시간대별 · 접속 IP 상세 통계는 <strong>마스터(원장님) 전용</strong>입니다.</span>' +
            '<button type="button" onclick="window.toggleBareunVisitMasterLogin()" style="background:#0F172A;color:#FDE68A;border:none;border-radius:999px;padding:6px 12px;font-size:11.5px;font-weight:800;cursor:pointer;">마스터 인증</button>' +
          '</div>' +

          '<div id="bv-master-login-drawer" style="display:none;background:#0F172A;color:#FFFFFF;border-radius:16px;padding:16px 20px;border:1px solid #F59E0B;">' +
            '<div style="font-size:13px;font-weight:800;color:#FDE68A;margin-bottom:10px;">👑 마스터 관리자 인증 (통합 상세 분석 대시보드 잠금해제)</div>' +
            '<form onsubmit="window.submitBareunVisitMasterLogin(event)" style="display:flex;gap:8px;flex-wrap:wrap;">' +
              '<input type="text" id="bv-master-id" placeholder="마스터 아이디" required autocomplete="username" style="flex:1;min-width:140px;padding:9px 12px;border-radius:10px;border:1px solid #334155;background:#1E293B;color:#FFF;font-size:12.5px;" />' +
              '<input type="password" id="bv-master-pw" placeholder="마스터 비밀번호" required autocomplete="current-password" style="flex:1;min-width:140px;padding:9px 12px;border-radius:10px;border:1px solid #334155;background:#1E293B;color:#FFF;font-size:12.5px;" />' +
              '<button type="submit" class="bv-btn gold">👑 상세 통계 잠금해제</button>' +
            '</form>' +
          '</div>' +
        '</div>';
      return;
    }

    // -------------------------------------------------------------------------
    // MASTER VIEW: 5-Tab Unified Analytics Suite (Stage 1 + Stage 2 + GEO AI)
    // -------------------------------------------------------------------------
    const geoAi = stats.geoAi || { totalHumanVisits: 0, todayHumanVisits: 0, sharePct: 0, byEngine: [], topLandingPages: [], recentAiVisits: [], botStats: { totalHits: 0, todayHits: 0, byBot: [], topPaths: [], recentHits: [] } };
    const botStats = geoAi.botStats || { totalHits: 0, todayHits: 0, byBot: [], topPaths: [], recentHits: [] };
    const conv = stats.conversions || { todayTotal: 0, cumTotal: 0, byAction: [], byPlatform: [], recentEvents: [] };
    const peakHour = stats.peakHour || { hour: 20, label: '20시', pv: 0 };
    const extCfg = stats.externalConfigStatus || {};
    const demo = stats.demographics || { ga4Connected: false, ageGroups: [], genders: [], clinicalCohorts: [] };
    const kwObj = stats.searchKeywords || { capturedKeywords: [], gscKeywords: [] };

    const kpiHtml =
      '<div class="bv-kpi-grid">' +
        '<div class="bv-kpi-card highlight">' +
          '<div class="bv-kpi-label"><span>오늘 방문 조회수</span><span>🔥</span></div>' +
          '<div class="bv-kpi-value">' + fmtNum(stats.todayPv) + ' <small style="font-size:12px;">회</small></div>' +
          '<div class="bv-kpi-foot">오늘 순방문자: <strong>' + fmtNum(stats.todayUv) + '명</strong> (어제 ' + fmtNum(stats.yesterdayPv) + '회)</div>' +
        '</div>' +
        '<div class="bv-kpi-card geo-highlight">' +
          '<div class="bv-kpi-label"><span>🤖 GEO AI 검색 유입</span><span>✨</span></div>' +
          '<div class="bv-kpi-value">' + fmtNum(geoAi.totalHumanVisits) + ' <small style="font-size:12px;">건</small></div>' +
          '<div class="bv-kpi-foot">오늘 +' + fmtNum(geoAi.todayHumanVisits) + '건 · AI봇 스캔 ' + fmtNum(botStats.totalHits) + '회</div>' +
        '</div>' +
        '<div class="bv-kpi-card">' +
          '<div class="bv-kpi-label"><span>예약·길안내 클릭 전환</span><span>🎯</span></div>' +
          '<div class="bv-kpi-value" style="color:#047857;">' + fmtNum(conv.cumTotal) + ' <small style="font-size:12px;">건</small></div>' +
          '<div class="bv-kpi-foot">오늘 전환 클릭: <strong>+' + fmtNum(conv.todayTotal) + '건</strong></div>' +
        '</div>' +
        '<div class="bv-kpi-card">' +
          '<div class="bv-kpi-label"><span>최다 방문 골든타임</span><span>🕒</span></div>' +
          '<div class="bv-kpi-value" style="color:#B45309;">' + escHtml(peakHour.label || '20시') + '</div>' +
          '<div class="bv-kpi-foot">해당 시간대 누적 <strong>' + fmtNum(peakHour.pv) + '회</strong> 집중</div>' +
        '</div>' +
        '<div class="bv-kpi-card">' +
          '<div class="bv-kpi-label"><span>최근 7일 / 30일</span><span>📈</span></div>' +
          '<div class="bv-kpi-value">' + fmtNum(stats.weekPv) + ' <small style="font-size:12px;color:#64748B;">회</small></div>' +
          '<div class="bv-kpi-foot">최근 30일 합계: <strong>' + fmtNum(stats.monthPv) + '회</strong></div>' +
        '</div>' +
        '<div class="bv-kpi-card">' +
          '<div class="bv-kpi-label"><span>누적 총 조회수</span><span class="bareun-visit-live-dot"></span></div>' +
          '<div class="bv-kpi-value" style="color:#2D5A43;">' + fmtNum(stats.totalPv) + ' <small style="font-size:12px;">회</small></div>' +
          '<div class="bv-kpi-foot">실시간 활성: <strong>' + fmtNum(stats.activeNow || 1) + '명</strong> · 누적UV ' + fmtNum(stats.totalUv) + '</div>' +
        '</div>' +
      '</div>';

    const tabsNavHtml =
      '<div class="bv-master-tabs">' +
        '<button type="button" class="bv-mtab-btn' + (activeMasterTab === 'overview' ? ' active' : '') + '" onclick="window.switchBareunMasterAnalyticsTab(\'overview\')">📊 종합 · 시간대 · 플랫폼</button>' +
        '<button type="button" class="bv-mtab-btn' + (activeMasterTab === 'geo_ai' ? ' active' : '') + '" onclick="window.switchBareunMasterAnalyticsTab(\'geo_ai\')">🤖 GEO AI 검색 · 봇 분석</button>' +
        '<button type="button" class="bv-mtab-btn' + (activeMasterTab === 'keywords_demo' ? ' active' : '') + '" onclick="window.switchBareunMasterAnalyticsTab(\'keywords_demo\')">🔍 키워드 · 연령 · 성별</button>' +
        '<button type="button" class="bv-mtab-btn' + (activeMasterTab === 'conversions_ip' ? ' active' : '') + '" onclick="window.switchBareunMasterAnalyticsTab(\'conversions_ip\')">🎯 예약 전환 · 실시간 IP</button>' +
        '<button type="button" class="bv-mtab-btn' + (activeMasterTab === 'settings' ? ' active' : '') + '" onclick="window.switchBareunMasterAnalyticsTab(\'settings\')">⚙️ GA4 · 서치콘솔 · 네이버 연동</button>' +
      '</div>';

    let tabPaneHtml = '';

    // =========================================================================
    // TAB 1: OVERVIEW + 24H HOURLY + WEEKDAY + 14 PLATFORMS + DAILY + TOP PAGES
    // =========================================================================
    if (activeMasterTab === 'overview') {
      const hourly = Array.isArray(stats.hourlySeries) ? stats.hourlySeries : [];
      const maxHourPv = Math.max(5, ...hourly.map(function (h) { return h.pv || 0; }));
      const hourBarsHtml = hourly.map(function (h) {
        const isPeak = h.hour === peakHour.hour && (h.pv || 0) > 0;
        const pct = Math.max(5, Math.round(((h.pv || 0) / maxHourPv) * 100));
        return (
          '<div class="bv-hbar-col' + (isPeak ? ' is-peak' : '') + '" title="' + escHtml(h.label) + ' : 누적 ' + fmtNum(h.pv) + '회 (오늘 +' + fmtNum(h.todayPv || 0) + ')">' +
            '<span style="font-size:9px;font-weight:800;color:' + (isPeak ? '#D97706' : '#475569') + ';">' + fmtNum(h.pv) + '</span>' +
            '<div class="bv-hbar-fill" style="height:' + pct + '%;"></div>' +
            '<span class="bv-hbar-lbl">' + String(h.hour).padStart(2, '0') + '</span>' +
          '</div>'
        );
      }).join('');

      const pb = stats.periodBuckets || { morning: 0, afternoon: 0, evening: 0, night: 0 };
      const pbTot = Math.max(1, (pb.morning || 0) + (pb.afternoon || 0) + (pb.evening || 0) + (pb.night || 0));

      const plats = Array.isArray(stats.platforms) ? stats.platforms : [];
      const maxPlatCnt = Math.max(1, ...plats.map(function (p) { return p.count || 0; }));
      const platsHtml = plats.map(function (p, i) {
        const w = Math.max(5, Math.round(((p.count || 0) / maxPlatCnt) * 100));
        const isGeo = String(p.platform || '').includes('GEO AI');
        return (
          '<div class="bv-page-row">' +
            '<div class="bv-page-top">' +
              '<span><strong>' + (i + 1) + '.</strong> ' + escHtml(p.platform) + '</span>' +
              '<span style="color:' + (isGeo ? '#1D4ED8' : '#047857') + ';font-variant-numeric:tabular-nums;">' + fmtNum(p.count) + '건 (' + escHtml(p.pct || 0) + '%) <small style="color:#64748B;">오늘 +' + fmtNum(p.todayCount || 0) + '</small></span>' +
            '</div>' +
            '<div class="bv-page-track"><div class="bv-page-bar" style="width:' + w + '%;' + (isGeo ? 'background:linear-gradient(90deg,#2563EB,#60A5FA);' : '') + '"></div></div>' +
          '</div>'
        );
      }).join('') || '<div style="font-size:12.5px;color:#64748B;">집계된 플랫폼 유입 데이터가 없습니다.</div>';

      const wdays = Array.isArray(stats.weekdaySeries) ? stats.weekdaySeries : [];
      const wdaysHtml = wdays.map(function (w) {
        return '<div class="bv-stat-chip" style="flex:1 1 calc(25% - 8px);min-width:105px;"><span>📅 ' + escHtml(w.label) + '</span><strong style="color:#2D5A43;">' + fmtNum(w.pv) + '회</strong></div>';
      }).join('');

      const devs = Array.isArray(stats.devices) ? stats.devices : [];
      const devLabelMap = { mobile: '📱 모바일(스마트폰)', desktop: '💻 데스크톱(PC)', tablet: '📟 태블릿' };
      const devsHtml = devs.map(function (d) {
        return '<div class="bv-stat-chip"><span>' + escHtml(devLabelMap[d.device] || d.device) + '</span><strong style="color:#047857;">' + fmtNum(d.count) + '건 (' + escHtml(d.pct || 0) + '%)</strong></div>';
      }).join('');

      const daily = Array.isArray(stats.dailySeries) ? stats.dailySeries : [];
      const maxDailyPv = Math.max(10, ...daily.map(function (d) { return d.pv || 0; }));
      const barsHtml = daily.map(function (d, idx) {
        const isToday = idx === daily.length - 1;
        const pct = Math.max(8, Math.round(((d.pv || 0) / maxDailyPv) * 100));
        return (
          '<div class="bv-bar-col' + (isToday ? ' is-today' : '') + '" title="' + escHtml(d.date) + ' : 조회 ' + fmtNum(d.pv) + '회 (순방문자 ' + fmtNum(d.uv) + '명)">' +
            '<span class="bv-bar-num">' + fmtNum(d.pv) + '</span>' +
            '<div class="bv-bar-fill" style="height:' + pct + '%;"></div>' +
            '<span class="bv-bar-date">' + (isToday ? '오늘' : escHtml(d.label)) + '</span>' +
          '</div>'
        );
      }).join('');

      const pages = Array.isArray(stats.topPages) ? stats.topPages.slice(0, 10) : [];
      const maxPagePv = Math.max(1, ...pages.map(function (p) { return p.pv || 0; }));
      const pagesHtml = pages.map(function (p, i) {
        const w = Math.max(6, Math.round(((p.pv || 0) / maxPagePv) * 100));
        return (
          '<div class="bv-page-row">' +
            '<div class="bv-page-top">' +
              '<span><strong>' + (i + 1) + '위.</strong> ' + escHtml(p.title) + '</span>' +
              '<span style="color:#047857;font-variant-numeric:tabular-nums;">총 ' + fmtNum(p.pv) + '회 <small style="color:#64748B;">(오늘 +' + fmtNum(p.todayPv || 0) + ')</small></span>' +
            '</div>' +
            '<div class="bv-page-track"><div class="bv-page-bar" style="width:' + w + '%;"></div></div>' +
          '</div>'
        );
      }).join('');

      tabPaneHtml =
        '<div class="bv-panel">' +
          '<div class="bv-panel-head">' +
            '<span class="bv-panel-title">🕒 24시간 시간대별 유입 분포 (00시 ~ 23시 KST · 피크타임 자동 강조)</span>' +
            '<span class="bv-panel-badge" style="background:#FEF3C7;color:#92400E;">골든타임: ' + escHtml(peakHour.label) + ' (' + fmtNum(peakHour.pv) + '회)</span>' +
          '</div>' +
          '<div style="overflow-x:auto;"><div class="bv-hour-bars">' + hourBarsHtml + '</div></div>' +
          '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px;font-size:12px;font-weight:700;color:#334155;">' +
            '<span style="background:#F8FAFC;border:1px solid #E2E8F0;padding:5px 11px;border-radius:999px;">🌅 오전(06~12시): <strong>' + Math.round(((pb.morning || 0) / pbTot) * 100) + '%</strong> (' + fmtNum(pb.morning) + '회)</span>' +
            '<span style="background:#F8FAFC;border:1px solid #E2E8F0;padding:5px 11px;border-radius:999px;">☀️ 오후(12~18시): <strong>' + Math.round(((pb.afternoon || 0) / pbTot) * 100) + '%</strong> (' + fmtNum(pb.afternoon) + '회)</span>' +
            '<span style="background:#FFFBEB;border:1px solid #FDE68A;padding:5px 11px;border-radius:999px;color:#92400E;">🌙 저녁·야간(18~24시): <strong>' + Math.round(((pb.evening || 0) / pbTot) * 100) + '%</strong> (' + fmtNum(pb.evening) + '회)</span>' +
            '<span style="background:#F8FAFC;border:1px solid #E2E8F0;padding:5px 11px;border-radius:999px;">🌌 심야·새벽(00~06시): <strong>' + Math.round(((pb.night || 0) / pbTot) * 100) + '%</strong> (' + fmtNum(pb.night) + '회)</span>' +
          '</div>' +
        '</div>' +

        '<div class="bv-mid-grid">' +
          '<div class="bv-panel">' +
            '<div class="bv-panel-head"><span class="bv-panel-title">🧭 세부 플랫폼별 유입 순위 (14대 채널 + GEO AI 정밀 분류)</span><span class="bv-panel-badge">실시간 1차 집계</span></div>' +
            '<div class="bv-page-list" style="max-height:270px;">' + platsHtml + '</div>' +
          '</div>' +
          '<div class="bv-panel">' +
            '<div class="bv-panel-head"><span class="bv-panel-title">🏆 클리닉 · 3D · 건강노트 인기 조회 순위 TOP 10</span><span class="bv-panel-badge">마스터 전용</span></div>' +
            '<div class="bv-page-list" style="max-height:270px;">' + pagesHtml + '</div>' +
          '</div>' +
        '</div>' +

        '<div class="bv-mid-grid">' +
          '<div class="bv-panel">' +
            '<div class="bv-panel-head"><span class="bv-panel-title">📊 최근 14일 일별 방문 조회수 추이</span><span class="bv-panel-badge">일별 추세</span></div>' +
            '<div class="bv-chart-bars">' + barsHtml + '</div>' +
          '</div>' +
          '<div class="bv-panel">' +
            '<div class="bv-panel-head"><span class="bv-panel-title">📅 요일별 방문 분포 &amp; 📱 기기 비중</span><span class="bv-panel-badge">요일 · 디바이스</span></div>' +
            '<div class="bv-chip-list" style="margin-bottom:12px;">' + wdaysHtml + '</div>' +
            '<div class="bv-chip-list">' + devsHtml + '</div>' +
          '</div>' +
        '</div>';
    }

    // =========================================================================
    // TAB 2: DEDICATED GEO AI SEARCH INFLOW & AI CITATION BOT MONITOR
    // =========================================================================
    else if (activeMasterTab === 'geo_ai') {
      const engines = Array.isArray(geoAi.byEngine) ? geoAi.byEngine : [];
      const enginesHtml = engines.length
        ? engines.map(function (e, idx) {
            return (
              '<div class="bv-stat-chip" style="background:#EFF6FF;border-color:#BFDBFE;">' +
                '<span><strong>' + (idx + 1) + '.</strong> 🤖 ' + escHtml(e.engine) + '</span>' +
                '<strong style="color:#1D4ED8;">총 ' + fmtNum(e.count) + '건 <small style="color:#475569;">(오늘 +' + fmtNum(e.todayCount || 0) + ')</small></strong>' +
              '</div>'
            );
          }).join('')
        : '<div style="padding:14px;background:#F8FAFC;border-radius:12px;border:1px dashed #CBD5E1;font-size:12.5px;color:#475569;">아직 기록된 GEO AI 직접 클릭 유입이 없습니다. ChatGPT · Perplexity · Gemini · Claude · Copilot · 네이버 Cue · 뤼튼 답변 내 바른한의원 출처 링크를 환자가 클릭하면 즉시 엔진별로 자동 분류됩니다!</div>';

      const aiPages = Array.isArray(geoAi.topLandingPages) ? geoAi.topLandingPages : [];
      const aiPagesHtml = aiPages.length
        ? aiPages.map(function (p, i) {
            return (
              '<div class="bv-stat-chip">' +
                '<span><strong>' + (i + 1) + '위.</strong> ' + escHtml(p.title) + '</span>' +
                '<strong style="color:#1D4ED8;">' + fmtNum(p.count) + '건</strong>' +
              '</div>'
            );
          }).join('')
        : '<div style="font-size:12.5px;color:#64748B;">AI 답변을 통해 착지한 페이지 이력이 쌓이면 이곳에 순위가 표시됩니다.</div>';

      const aiRecentHtml = (Array.isArray(geoAi.recentAiVisits) && geoAi.recentAiVisits.length)
        ? geoAi.recentAiVisits.map(function (r) {
            return (
              '<tr>' +
                '<td><strong style="color:#1D4ED8;">🤖 ' + escHtml(r.aiEngine) + '</strong></td>' +
                '<td>' + escHtml(r.pageTitle) + '</td>' +
                '<td>' + escHtml(r.searchKeyword || '-') + '</td>' +
                '<td style="font-family:monospace;color:#475569;">' + escHtml(r.clientIp) + '</td>' +
                '<td>' + escHtml(r.deviceType) + '</td>' +
                '<td style="color:#64748B;">' + escHtml(r.createdAt) + '</td>' +
              '</tr>'
            );
          }).join('')
        : '<tr><td colspan="6" style="text-align:center;color:#64748B;padding:16px;">GEO AI 검색 클릭 유입 발생 시 실시간으로 기록됩니다.</td></tr>';

      const botByHtml = (Array.isArray(botStats.byBot) && botStats.byBot.length)
        ? botStats.byBot.map(function (b) {
            return (
              '<div class="bv-stat-chip" style="background:#0F172A;border-color:#334155;color:#F8FAFC;">' +
                '<span>🛰️ ' + escHtml(b.bot) + '</span>' +
                '<strong style="color:#38BDF8;">누적 ' + fmtNum(b.total) + '회 <small style="color:#94A3B8;">(오늘 +' + fmtNum(b.todayCount || 0) + ')</small></strong>' +
              '</div>'
            );
          }).join('')
        : '<div style="font-size:12.5px;color:#64748B;">OAI-SearchBot · PerplexityBot · ClaudeBot · Google-Extended 등 AI 검색봇이 홈페이지를 스캔하면 즉시 카운트됩니다 (환자 조회수에는 섞이지 않고 청정 분리 집계).</div>';

      const botPathsHtml = (Array.isArray(botStats.topPaths) && botStats.topPaths.length)
        ? botStats.topPaths.map(function (bp) {
            return '<div class="bv-stat-chip"><span>📄 <code>' + escHtml(bp.path) + '</code></span><strong style="color:#0369A1;">' + fmtNum(bp.count) + '회 수집</strong></div>';
          }).join('')
        : '<div style="font-size:12.5px;color:#64748B;">AI 크롤러 수집 경로 대기중 (<code>/llms.txt</code>, <code>/health-note-*/</code> 등)</div>';

      tabPaneHtml =
        '<div style="background:linear-gradient(135deg,#0F172A 0%,#1E3A8A 100%);color:#FFFFFF;border-radius:18px;padding:18px 22px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">' +
          '<div>' +
            '<div style="font-size:11px;font-weight:800;color:#93C5FD;letter-spacing:0.05em;">GEO (GENERATIVE ENGINE OPTIMIZATION) · AI 검색 유입 &amp; 인용 관제</div>' +
            '<div style="font-size:16px;font-weight:900;margin-top:3px;">ChatGPT · Perplexity · Gemini · Claude · Copilot · 네이버 Cue 유입 정밀 추적</div>' +
            '<div style="font-size:12.5px;color:#DBEAFE;margin-top:4px;">환자가 AI 답변 출처를 눌러 방문한 <strong>실제 유입(' + fmtNum(geoAi.totalHumanVisits) + '건, 전체의 ' + escHtml(geoAi.sharePct || 0) + '%)</strong>과 AI 봇이 학습·인용을 위해 읽어간 <strong>크롤링 스캔(' + fmtNum(botStats.totalHits) + '회, 조회수 미포함)</strong>을 분리 집계합니다.</div>' +
          '</div>' +
        '</div>' +

        '<div class="bv-mid-grid">' +
          '<div class="bv-panel">' +
            '<div class="bv-panel-head"><span class="bv-panel-title">🤖 AI 검색엔진별 실제 환자 유입 현황</span><span class="bv-panel-badge" style="background:#DBEAFE;color:#1E40AF;">Human Clicks</span></div>' +
            '<div class="bv-chip-list">' + enginesHtml + '</div>' +
          '</div>' +
          '<div class="bv-panel">' +
            '<div class="bv-panel-head"><span class="bv-panel-title">🎯 GEO AI 방문자가 가장 많이 찾은 페이지</span><span class="bv-panel-badge">착지 페이지 TOP</span></div>' +
            '<div class="bv-chip-list">' + aiPagesHtml + '</div>' +
          '</div>' +
        '</div>' +

        '<div class="bv-panel">' +
          '<div class="bv-panel-head"><span class="bv-panel-title">📋 실시간 GEO AI 환자 유입 상세 로그 (최근 25건)</span><span class="bv-panel-badge">출처 AI · 착지 페이지</span></div>' +
          '<div style="overflow-x:auto;max-height:220px;">' +
            '<table class="bv-data-table">' +
              '<thead><tr><th>유입 AI 엔진</th><th>착지 페이지</th><th>포착 질문/키워드</th><th>접속 IP</th><th>기기</th><th>유입 시각</th></tr></thead>' +
              '<tbody>' + aiRecentHtml + '</tbody>' +
            '</table>' +
          '</div>' +
        '</div>' +

        '<div class="bv-mid-grid">' +
          '<div class="bv-panel">' +
            '<div class="bv-panel-head"><span class="bv-panel-title">🛰️ AI 검색 크롤러 봇 방문 카운터 (조회수 미포함 청정 분리)</span><span class="bv-panel-badge" style="background:#E0F2FE;color:#0369A1;">오늘 +' + fmtNum(botStats.todayHits) + '회 / 누적 ' + fmtNum(botStats.totalHits) + '회</span></div>' +
            '<div class="bv-chip-list">' + botByHtml + '</div>' +
          '</div>' +
          '<div class="bv-panel">' +
            '<div class="bv-panel-head"><span class="bv-panel-title">📚 AI 봇이 가장 많이 인용·수집해 간 문서 경로</span><span class="bv-panel-badge">/llms.txt · 건강노트</span></div>' +
            '<div class="bv-chip-list">' + botPathsHtml + '</div>' +
          '</div>' +
        '</div>';
    }

    // =========================================================================
    // TAB 3: SEARCH KEYWORDS + AGE & GENDER DEMOGRAPHICS + CLINICAL COHORTS
    // =========================================================================
    else if (activeMasterTab === 'keywords_demo') {
      const capKw = Array.isArray(kwObj.capturedKeywords) ? kwObj.capturedKeywords : [];
      const gscKw = Array.isArray(kwObj.gscKeywords) ? kwObj.gscKeywords : [];

      const capKwHtml = capKw.length
        ? capKw.map(function (k, i) {
            return '<tr><td><strong>' + (i + 1) + '</strong></td><td><strong>' + escHtml(k.keyword) + '</strong></td><td>' + escHtml(k.platform) + '</td><td style="font-weight:800;color:#047857;">' + fmtNum(k.count) + '회</td></tr>';
          }).join('')
        : '<tr><td colspan="4" style="text-align:center;color:#64748B;padding:16px;">네이버 통합검색 쿼리 · 광고 파라미터(n_keyword, utm_term, query) 포함 유입 시 자동 누적됩니다.</td></tr>';

      const gscKwHtml = gscKw.length
        ? gscKw.map(function (g, i) {
            return '<tr><td>' + (i + 1) + '</td><td><strong>' + escHtml(g.keyword) + '</strong></td><td style="font-weight:800;color:#1D4ED8;">' + fmtNum(g.clicks) + '회</td><td>' + fmtNum(g.impressions) + '회</td><td>' + escHtml(g.ctr) + '%</td><td>' + escHtml(g.position) + '위</td></tr>';
          }).join('')
        : '<tr><td colspan="6" style="text-align:center;color:#64748B;padding:16px;">' +
            (extCfg.gscApiConnected
              ? '최근 28일간 집계된 구글 검색어 데이터가 아직 없습니다.'
              : '구글 검색어 암호화 정책상 공식 키워드 전체 열람은 <strong>Google Search Console API 연동</strong>이 필요합니다. <button type="button" onclick="window.switchBareunMasterAnalyticsTab(\'settings\')" style="margin-left:6px;padding:4px 10px;border-radius:999px;border:none;background:#171614;color:#FEF08A;font-size:11.5px;font-weight:800;cursor:pointer;">⚙️ 3분 연동하기 →</button>') +
          '</td></tr>';

      let ga4DemoHtml = '';
      if (demo.ga4Connected && (demo.ageGroups.length || demo.genders.length)) {
        const maxAgeU = Math.max(1, ...demo.ageGroups.map(function (a) { return a.users || 0; }));
        const ageRows = demo.ageGroups.map(function (a) {
          const w = Math.max(5, Math.round(((a.users || 0) / maxAgeU) * 100));
          return (
            '<div class="bv-page-row">' +
              '<div class="bv-page-top"><span>🎂 ' + escHtml(a.label) + '</span><span style="color:#1D4ED8;">' + fmtNum(a.users) + '명 (세션 ' + fmtNum(a.sessions) + ')</span></div>' +
              '<div class="bv-page-track"><div class="bv-page-bar" style="width:' + w + '%;background:linear-gradient(90deg,#1E40AF,#3B82F6);"></div></div>' +
            '</div>'
          );
        }).join('');
        const genChips = demo.genders.map(function (g) {
          return '<div class="bv-stat-chip"><span>' + escHtml(g.label) + '</span><strong style="color:#1E40AF;">' + fmtNum(g.users) + '명 (세션 ' + fmtNum(g.sessions) + ')</strong></div>';
        }).join('');
        ga4DemoHtml =
          '<div style="display:flex;flex-direction:column;gap:10px;">' +
            '<div class="bv-chip-list">' + genChips + '</div>' +
            '<div class="bv-page-list">' + ageRows + '</div>' +
          '</div>';
      } else if (demo.ga4Connected) {
        ga4DemoHtml =
          '<div style="background:#F0FDF4;border:1px solid #BBF7D0;border-radius:14px;padding:16px;font-size:12.5px;color:#166534;line-height:1.65;">' +
            '<div style="font-weight:900;color:#14532D;margin-bottom:4px;display:flex;align-items:center;gap:6px;">' +
              '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#16A34A;"></span>' +
              'Google GA4 공식 API 통신 연동 완료 (데이터 누적 집계중)' +
            '</div>' +
            '구글 본사 API와 정상 통신 중입니다. 방금 신규 발급된 GA4 측정 속성은 <strong>구글의 개인정보보호 임계값(Thresholding) 정책</strong>에 따라 최초 방문자 표본이 수집된 후(약 24~48시간 누적) 연령대별 막대그래프와 성별 비율이 이곳에 자동으로 활성화됩니다.<br>' +
            '<div style="margin-top:10px;padding:8px 12px;background:#DCFCE7;border-radius:8px;font-size:11.5px;color:#15803D;font-weight:700;">' +
              '💡 우측의 [관심 진료군 기반 추정 코호트]는 지금 이 순간에도 100% 실시간 집계되고 있습니다.' +
            '</div>' +
          '</div>';
      } else {
        ga4DemoHtml =
          '<div style="background:#F8FAFC;border:1px dashed #CBD5E1;border-radius:14px;padding:16px;font-size:12.5px;color:#334155;line-height:1.65;">' +
            '<div style="font-weight:900;color:#0F172A;margin-bottom:4px;">📡 Google GA4 · 네이버 애널리틱스 공식 연령·성별 연동 안내</div>' +
            '개인정보보호법상 일반 웹사이트가 로그인 없이 방문자의 실제 나이·성별을 임의로 추적하는 것은 불가하며, <strong>구글 로그인 신호(GA4 Google Signals)</strong> 및 <strong>네이버 애널리틱스(WCS)</strong> 공식 통계 데이터를 연동하여 정직하게 표출합니다.<br>' +
            '<button type="button" onclick="window.switchBareunMasterAnalyticsTab(\'settings\')" style="margin-top:10px;padding:8px 14px;border-radius:999px;border:none;background:#2D5A43;color:#FFFFFF;font-size:12px;font-weight:800;cursor:pointer;">⚙️ GA4 · 네이버 애널리틱스 ID 입력하러 가기 →</button>' +
          '</div>';
      }

      const cohorts = Array.isArray(demo.clinicalCohorts) ? demo.clinicalCohorts : [];
      const maxCohortCnt = Math.max(1, ...cohorts.map(function (c) { return c.count || 0; }));
      const cohortsHtml = cohorts.map(function (c) {
        const w = Math.max(6, Math.round(((c.count || 0) / maxCohortCnt) * 100));
        return (
          '<div class="bv-page-row">' +
            '<div class="bv-page-top"><span>' + escHtml(c.cohort) + '</span><span style="color:#047857;">' + fmtNum(c.count) + '회 (' + escHtml(c.pct) + '%)</span></div>' +
            '<div class="bv-page-track"><div class="bv-page-bar" style="width:' + w + '%;"></div></div>' +
          '</div>'
        );
      }).join('');

      tabPaneHtml =
        '<div class="bv-mid-grid">' +
          '<div class="bv-panel">' +
            '<div class="bv-panel-head"><span class="bv-panel-title">🔍 자체 포착 유입 검색 키워드 (네이버·캠페인 URL 추출)</span><span class="bv-panel-badge">1차 실시간 포착</span></div>' +
            '<div style="overflow-x:auto;max-height:230px;">' +
              '<table class="bv-data-table">' +
                '<thead><tr><th>순위</th><th>포착 검색 키워드</th><th>유입 플랫폼</th><th>유입수</th></tr></thead>' +
                '<tbody>' + capKwHtml + '</tbody>' +
              '</table>' +
            '</div>' +
          '</div>' +
          '<div class="bv-panel">' +
            '<div class="bv-panel-head"><span class="bv-panel-title">🌐 Google Search Console 공식 유입 키워드 (최근 28일)</span><span class="bv-panel-badge" style="background:#DBEAFE;color:#1E40AF;">' + (extCfg.gscApiConnected ? '연동 완료' : '연동 대기') + '</span></div>' +
            '<div style="overflow-x:auto;max-height:230px;">' +
              '<table class="bv-data-table">' +
                '<thead><tr><th>#</th><th>구글 검색어</th><th>클릭</th><th>노출</th><th>클릭률</th><th>평균순위</th></tr></thead>' +
                '<tbody>' + gscKwHtml + '</tbody>' +
              '</table>' +
            '</div>' +
          '</div>' +
        '</div>' +

        '<div class="bv-mid-grid">' +
          '<div class="bv-panel">' +
            '<div class="bv-panel-head"><span class="bv-panel-title">👥 방문자 연령대(20대~60대+) · 성별 분포 (GA4 공식 데이터)</span><span class="bv-panel-badge" style="background:' + (demo.ga4Connected ? '#DCFCE7;color:#166534;' : '#F1F5F9;color:#475569;') + '">' + (demo.ga4Connected ? '실시간 GA4 연동중' : 'GA4 연동 대기') + '</span></div>' +
            ga4DemoHtml +
          '</div>' +
          '<div class="bv-panel">' +
            '<div class="bv-panel-head"><span class="bv-panel-title">🏥 관심 진료군 기반 추정 연령·성별 타깃 코호트 (100% 상시 집계)</span><span class="bv-panel-badge">행동 데이터 분석</span></div>' +
            '<div class="bv-page-list" style="max-height:260px;">' + cohortsHtml + '</div>' +
          '</div>' +
        '</div>';
    }

    // =========================================================================
    // TAB 4: CONVERSION CLICKS + REAL-TIME IP LOGS + BASE OFFSET
    // =========================================================================
    else if (activeMasterTab === 'conversions_ip') {
      const actChipsHtml = (Array.isArray(conv.byAction) ? conv.byAction : []).map(function (a) {
        return (
          '<div class="bv-stat-chip">' +
            '<span>' + escHtml(a.label) + '</span>' +
            '<strong style="color:#047857;">' + fmtNum(a.count) + '건</strong>' +
          '</div>'
        );
      }).join('');

      const convPlatHtml = (Array.isArray(conv.byPlatform) && conv.byPlatform.length)
        ? conv.byPlatform.map(function (p) {
            return '<div class="bv-stat-chip"><span>🧭 ' + escHtml(p.platform) + '</span><strong style="color:#1D4ED8;">예약클릭 ' + fmtNum(p.count) + '건</strong></div>';
          }).join('')
        : '<div style="font-size:12.5px;color:#64748B;">전화상담 · 카카오톡 예약 · 네이버 예약 · 4대 지도 길안내 클릭이 발생하면 어느 플랫폼 유입 환자인지 즉시 집계됩니다.</div>';

      const rowsHtml = (Array.isArray(stats.recentLogs) ? stats.recentLogs : []).slice(0, 80).map(function (l) {
        const platBadge = l.aiEngine
          ? '<strong style="color:#60A5FA;">🤖 ' + escHtml(l.aiEngine) + '</strong>'
          : escHtml(l.platform || l.referrer);
        return (
          '<tr>' +
            '<td>#' + escHtml(l.id) + '</td>' +
            '<td><strong>' + escHtml(l.pageTitle) + '</strong></td>' +
            '<td style="color:#93C5FD;font-family:monospace;">' + escHtml(l.clientIp) + '</td>' +
            '<td>' + platBadge + (l.searchKeyword ? ' <span style="color:#FDE68A;">[' + escHtml(l.searchKeyword) + ']</span>' : '') + '</td>' +
            '<td>' + escHtml(l.deviceType) + '</td>' +
            '<td style="color:#94A3B8;">' + escHtml(l.createdAt) + '</td>' +
          '</tr>'
        );
      }).join('');

      tabPaneHtml =
        '<div class="bv-mid-grid">' +
          '<div class="bv-panel">' +
            '<div class="bv-panel-head"><span class="bv-panel-title">🎯 예약 · 길안내 액션별 실제 클릭 전환수</span><span class="bv-panel-badge">오늘 +' + fmtNum(conv.todayTotal) + '건 / 누적 ' + fmtNum(conv.cumTotal) + '건</span></div>' +
            '<div class="bv-chip-list">' + actChipsHtml + '</div>' +
          '</div>' +
          '<div class="bv-panel">' +
            '<div class="bv-panel-head"><span class="bv-panel-title">🏆 예약 클릭을 가장 많이 일으킨 유입 플랫폼</span><span class="bv-panel-badge">전환 기여도</span></div>' +
            '<div class="bv-chip-list">' + convPlatHtml + '</div>' +
          '</div>' +
        '</div>' +

        '<div class="bv-master-box">' +
          '<div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">' +
            '<div>' +
              '<div style="font-size:11px;font-weight:800;color:#FCD34D;">👑 MASTER REAL-TIME VISITOR IP LOGS &amp; BASE OFFSET</div>' +
              '<div style="font-size:14px;font-weight:800;margin-top:2px;">실시간 방문자 접속 IP · 세부 플랫폼 · GEO AI · 포착 검색어 상세 로그 (최근 80건)</div>' +
            '</div>' +
            '<div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">' +
              '<span style="font-size:12px;color:#CBD5E1;">기본 누적 보정치:</span>' +
              '<input type="number" id="bv-base-offset-input" value="' + escHtml(stats.baseOffset || 14820) + '" style="width:96px;padding:5px 8px;border-radius:8px;border:1px solid #475569;background:#1E293B;color:#FEF08A;font-weight:800;font-size:12px;" />' +
              '<button type="button" class="bv-btn gold" onclick="window.saveBareunVisitBaseOffset()">보정치 저장</button>' +
            '</div>' +
          '</div>' +
          '<div class="bv-log-table-wrap" style="max-height:300px;">' +
            '<table class="bv-log-table">' +
              '<thead><tr><th>번호</th><th>열람 페이지</th><th>접속 IP</th><th>유입 플랫폼 / GEO AI / 키워드</th><th>기기</th><th>접속 시각</th></tr></thead>' +
              '<tbody>' + rowsHtml + '</tbody>' +
            '</table>' +
          '</div>' +
        '</div>';
    }

    // =========================================================================
    // TAB 5: STAGE 2 EXTERNAL ANALYTICS (GA4 / GSC / NAVER WCS) SETTINGS
    // =========================================================================
    else if (activeMasterTab === 'settings') {
      const badge = function (ok, txtOk, txtWait) {
        return ok
          ? '<span style="background:#DCFCE7;color:#166534;padding:3px 9px;border-radius:999px;font-size:11px;font-weight:800;">✅ ' + txtOk + '</span>'
          : '<span style="background:#F1F5F9;color:#475569;padding:3px 9px;border-radius:999px;font-size:11px;font-weight:800;">⏳ ' + txtWait + '</span>';
      };

      tabPaneHtml =
        '<div class="bv-panel">' +
          '<div class="bv-panel-head">' +
            '<span class="bv-panel-title">⚙️ 2단계 공식 외부 통계 원클릭 연동 센터 (Google GA4 · Search Console · 네이버 애널리틱스)</span>' +
            '<button type="button" onclick="window.refreshBareunVisitModal(true)" style="padding:6px 12px;border-radius:999px;border:1px solid #2D5A43;background:#E8F2EC;color:#2D5A43;font-size:11.5px;font-weight:800;cursor:pointer;">🔄 외부 API 즉시 재동기화</button>' +
          '</div>' +

          '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px;">' +
            badge(extCfg.hasGa4Tag, 'GA4 자동 수집태그 활성 (' + escHtml(extCfg.ga4MeasurementId) + ')', 'GA4 측정 ID 미입력') +
            badge(extCfg.hasNaverTag, '네이버 애널리틱스 태그 활성 (' + escHtml(extCfg.naverAnalyticsId) + ')', '네이버 애널리틱스 ID 미입력') +
            badge(extCfg.ga4ApiConnected, 'GA4 연령·성별 실시간 API 연결됨', 'GA4 Data API 미연결') +
            badge(extCfg.gscApiConnected, '구글 서치콘솔 키워드 API 연결됨', '서치콘솔 API 미연결') +
          '</div>' +

          (extCfg.lastSyncError
            ? '<div style="margin-bottom:14px;padding:11px 14px;border-radius:12px;background:#FEF2F2;border:1px solid #FECACA;color:#991B1B;font-size:12px;font-weight:700;">⚠️ 최근 동기화 점검 메시지: ' + escHtml(extCfg.lastSyncError) + '</div>'
            : (extCfg.lastSyncedAt ? '<div style="margin-bottom:14px;padding:10px 14px;border-radius:12px;background:#ECFDF5;border:1px solid #A7F3D0;color:#065F46;font-size:12px;font-weight:700;">✅ 마지막 구글 API 실시간 동기화 시각: ' + escHtml(extCfg.lastSyncedAt) + '</div>' : '')) +

          '<div class="bv-form-grid">' +
            '<div>' +
              '<label style="display:block;font-size:12px;font-weight:800;color:#1E293B;margin-bottom:5px;">1️⃣ Google GA4 측정 ID (입력 즉시 전 페이지 자동 삽입)</label>' +
              '<input type="text" id="bv-cfg-ga4-mid" class="bv-form-input" placeholder="예: G-XXXXXXXXXX" value="' + escHtml(extCfg.ga4MeasurementId || '') + '" />' +
              '<div style="font-size:11px;color:#64748B;margin-top:3px;">GA4 관리 → 데이터 스트림 → 측정 ID (Google 신호 데이터 활성화 권장)</div>' +
            '</div>' +
            '<div>' +
              '<label style="display:block;font-size:12px;font-weight:800;color:#1E293B;margin-bottom:5px;">2️⃣ 네이버 애널리틱스 발급 ID (입력 즉시 전 페이지 자동 삽입)</label>' +
              '<input type="text" id="bv-cfg-naver-id" class="bv-form-input" placeholder="예: s_1a2b3c4d5e6f" value="' + escHtml(extCfg.naverAnalyticsId || '') + '" />' +
              '<div style="font-size:11px;color:#64748B;margin-top:3px;">analytics.naver.com 사이트 등록 후 발급되는 <code>s_...</code> 코드</div>' +
            '</div>' +
            '<div>' +
              '<label style="display:block;font-size:12px;font-weight:800;color:#1E293B;margin-bottom:5px;">3️⃣ Google GA4 속성 ID (연령대 · 성별 차트 직접 불러오기용)</label>' +
              '<input type="text" id="bv-cfg-ga4-pid" class="bv-form-input" placeholder="예: 412345678 (숫자만)" value="' + escHtml(extCfg.ga4PropertyId || '') + '" />' +
              '<div style="font-size:11px;color:#64748B;margin-top:3px;">GA4 관리 → 속성 세부정보 우측 상단의 9자리 숫자 속성 ID</div>' +
            '</div>' +
            '<div>' +
              '<label style="display:block;font-size:12px;font-weight:800;color:#1E293B;margin-bottom:5px;">4️⃣ Google Search Console 사이트 주소 (검색 키워드 불러오기용)</label>' +
              '<input type="text" id="bv-cfg-gsc-url" class="bv-form-input" placeholder="https://www.bareunhaniwon.com/ 또는 sc-domain:bareunhaniwon.com" value="' + escHtml(extCfg.gscSiteUrl || 'https://www.bareunhaniwon.com/') + '" />' +
              '<div style="font-size:11px;color:#64748B;margin-top:3px;">서치콘솔에 등록된 정확한 속성 URL 또는 <code>sc-domain:bareunhaniwon.com</code></div>' +
            '</div>' +
          '</div>' +

          '<div style="margin-top:14px;">' +
            '<label style="display:block;font-size:12px;font-weight:800;color:#1E293B;margin-bottom:5px;">5️⃣ Google Cloud 서비스 계정 JSON 키 (GA4 연령·성별 + 서치콘솔 키워드 자동 조회용 보안키)</label>' +
            (extCfg.hasServiceAccount
              ? '<div style="font-size:12px;color:#047857;font-weight:800;margin-bottom:6px;">🔒 현재 등록된 서비스 계정: <code>' + escHtml(extCfg.serviceAccountEmail) + '</code> (변경 시에만 아래 칸에 새 JSON을 붙여넣으세요)</div>'
              : '') +
            '<textarea id="bv-cfg-sa-json" class="bv-form-input" rows="4" placeholder=\'{"type":"service_account","project_id":"...","private_key":"-----BEGIN PRIVATE KEY-----...","client_email":"...@....iam.gserviceaccount.com"}\'></textarea>' +
            '<div style="font-size:11.5px;color:#475569;margin-top:6px;line-height:1.55;">' +
              '💡 <strong>3분 연동 팁:</strong> ① Google Cloud에서 <code>Google Analytics Data API</code> 및 <code>Google Search Console API</code> 사용 설정 후 서비스 계정 JSON 키를 발급합니다. ② 해당 <code>client_email</code> 주소를 GA4 속성 및 서치콘솔의 <strong>[뷰어(Viewer) 사용자]</strong>로 추가한 뒤 여기에 붙여넣고 저장하면 마스터 창 안에서 나이·성별·구글 키워드가 자동 표출됩니다!' +
            '</div>' +
          '</div>' +

          '<div style="margin-top:16px;display:flex;gap:10px;flex-wrap:wrap;align-items:center;">' +
            '<button type="button" onclick="window.saveBareunExternalAnalyticsSettings()" style="padding:11px 22px;border-radius:999px;border:none;background:linear-gradient(135deg,#171614,#2D5A43);color:#FEF08A;font-size:13px;font-weight:900;cursor:pointer;">💾 연동 설정 저장 및 실시간 테스트</button>' +
            '<a href="https://analytics.google.com/" target="_blank" rel="noopener noreferrer" style="font-size:12px;font-weight:800;color:#1D4ED8;text-decoration:underline;">구글 애널리틱스(GA4) 열기 ↗</a>' +
            '<a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer" style="font-size:12px;font-weight:800;color:#1D4ED8;text-decoration:underline;">구글 서치콘솔 열기 ↗</a>' +
            '<a href="https://analytics.naver.com/" target="_blank" rel="noopener noreferrer" style="font-size:12px;font-weight:800;color:#047857;text-decoration:underline;">네이버 애널리틱스 열기 ↗</a>' +
          '</div>' +
        '</div>';
    }

    dialog.innerHTML =
      '<div class="bv-modal-header">' +
        '<div>' +
          '<div class="bv-eyebrow"><span class="bareun-visit-live-dot"></span> 👑 MASTER ANALYTICS · 1·2단계 통합 &amp; GEO AI 관제</div>' +
          '<h2 class="bv-title">바른한의원 대전본점 마스터 통합 방문 분석 대시보드</h2>' +
          '<div class="bv-sub">기준 시각: ' + escHtml(stats.serverTime || '실시간 연동중') + ' · 일반 방문자에게는 오늘/누적 조회수 2개만 노출됩니다</div>' +
        '</div>' +
        '<div class="bv-header-actions">' +
          '<button type="button" class="bv-btn" onclick="window.refreshBareunVisitModal(true)">↻ 실시간 새로고침</button>' +
          '<button type="button" class="bv-btn gold" onclick="window.logoutBareunVisitMaster()">🔓 마스터 로그아웃</button>' +
          '<button type="button" class="bv-btn close" onclick="window.closeBareunVisitModal()">✕ 닫기</button>' +
        '</div>' +
      '</div>' +
      '<div class="bv-modal-body">' +
        kpiHtml +
        tabsNavHtml +
        tabPaneHtml +
      '</div>';
  }

  window.saveBareunExternalAnalyticsSettings = async function () {
    const tok = getAuthToken();
    if (!tok) {
      alert('마스터 인증 상태에서만 설정을 저장할 수 있습니다.');
      return;
    }
    const payload = {
      ga4MeasurementId: (document.getElementById('bv-cfg-ga4-mid') || {}).value || '',
      naverAnalyticsId: (document.getElementById('bv-cfg-naver-id') || {}).value || '',
      ga4PropertyId: (document.getElementById('bv-cfg-ga4-pid') || {}).value || '',
      gscSiteUrl: (document.getElementById('bv-cfg-gsc-url') || {}).value || '',
      googleServiceAccountJson: (document.getElementById('bv-cfg-sa-json') || {}).value || ''
    };
    try {
      showBareunToast('⏳ 외부 통계 설정을 저장하고 실시간 연동을 점검 중입니다...');
      const res = await fetch('/wp-json/bareun/v1/analytics/settings?_t=' + Date.now(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Bareun-Token': tok
        },
        credentials: 'same-origin',
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data && data.ok) {
        if (data.summary) {
          updateAllCounterPills(data.summary);
          renderVisitModalContent(data.summary);
        } else {
          const fresh = await fetchLatestVisitStats(true);
          renderVisitModalContent(fresh);
        }
        bootExternalAnalyticsTags();
        showBareunToast('✅ GA4 · 서치콘솔 · 네이버 애널리틱스 설정이 저장되었습니다!');
        return;
      }
      alert((data && data.message) || '설정 저장에 실패했습니다.');
    } catch (e) {
      alert('서버와 통신 중 오류가 발생했습니다.');
    }
  };

  window.openBareunVisitModal = async function () {
    mountHeaderAndFloatingButtons();
    const modal = document.getElementById('bareun-visit-modal-backdrop');
    if (modal) modal.classList.add('open');
    renderVisitModalContent(latestStats);
    const fresh = await fetchLatestVisitStats(false);
    if (fresh) renderVisitModalContent(fresh);
  };

  window.closeBareunVisitModal = function () {
    const modal = document.getElementById('bareun-visit-modal-backdrop');
    if (modal) modal.classList.remove('open');
  };

  window.refreshBareunVisitModal = async function (forceExt) {
    const fresh = await fetchLatestVisitStats(Boolean(forceExt));
    if (fresh) renderVisitModalContent(fresh);
    if (forceExt) showBareunToast('🔄 최신 방문 통계 및 외부 연동 지표를 새로고침했습니다.');
  };

  window.toggleBareunVisitMasterLogin = function () {
    const el = document.getElementById('bv-master-login-drawer');
    if (el) {
      el.style.display = el.style.display === 'none' ? 'block' : 'none';
      const idInp = document.getElementById('bv-master-id');
      if (idInp && el.style.display === 'block') idInp.focus();
    }
  };

  window.submitBareunVisitMasterLogin = async function (ev) {
    ev.preventDefault();
    const usernameEl = document.getElementById('bv-master-id');
    const passwordEl = document.getElementById('bv-master-pw');
    const username = usernameEl ? usernameEl.value.trim() : '';
    const password = passwordEl ? passwordEl.value : '';

    try {
      const res = await fetch('/wp-json/bareun/v1/auth/master-login?_t=' + Date.now(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ username: username, password: password })
      });
      const data = await res.json();
      if (data && data.ok && data.token) {
        setAuthToken(data.token);
        isMasterAuthenticated = true;
        activeMasterTab = 'overview';
        const fresh = await fetchLatestVisitStats(false);
        renderVisitModalContent(fresh);
        showBareunToast('👑 마스터 1·2단계 통합 & GEO AI 통계 대시보드가 열렸습니다.');
        return;
      }
      alert((data && data.message) || '마스터 계정 정보를 다시 확인해 주세요.');
    } catch (e) {
      alert('서버 마스터 인증 통신 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    }
  };

  window.logoutBareunVisitMaster = async function () {
    setAuthToken('');
    isMasterAuthenticated = false;
    latestStats = {
      ok: true,
      isMaster: false,
      todayPv: latestStats ? latestStats.todayPv : 65,
      totalPv: latestStats ? latestStats.totalPv : 15738,
      serverTime: latestStats ? latestStats.serverTime : ''
    };
    const fresh = await fetchLatestVisitStats(false);
    renderVisitModalContent(fresh);
    showBareunToast('마스터 모드에서 로그아웃되었습니다.');
  };

  window.saveBareunVisitBaseOffset = async function () {
    const inp = document.getElementById('bv-base-offset-input');
    if (!inp) return;
    const baseOffset = Math.max(0, Number(inp.value) || 0);
    const tok = getAuthToken();
    const headers = { 'Content-Type': 'application/json', 'Accept': 'application/json' };
    if (tok) headers['X-Bareun-Token'] = tok;
    try {
      const res = await fetch('/wp-json/bareun/v1/visits/adjust?_t=' + Date.now(), {
        method: 'POST',
        headers: headers,
        credentials: 'same-origin',
        body: JSON.stringify({ baseOffset: baseOffset })
      });
      const data = await res.json();
      if (data && data.ok) {
        const fresh = await fetchLatestVisitStats(false);
        renderVisitModalContent(fresh);
        showBareunToast('✅ 기본 누적 보정치가 저장되었습니다.');
        return;
      }
    } catch (e) {}
    alert('보정치 저장 권한을 확인해 주세요.');
  };

  function bootVisitAnalytics() {
    mountHeaderAndFloatingButtons();
    bindGlobalConversionClickTelemetry();
    recordPageVisit();
    fetchLiveClinicInfo();
    bootExternalAnalyticsTags();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootVisitAnalytics);
  } else {
    bootVisitAnalytics();
  }
})();
