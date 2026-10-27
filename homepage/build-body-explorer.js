/**
 * 바른한의원 대전본점 · 풀스크린 3D 인체모형(클릭 시 내부 장기 활성) & 우측 소형 화이트·블랙·골드 메뉴 + 3메뉴 정보 팝업 빌더 (v5.5)
 *
 * [핵심 설계]
 * 1. 전체화면(100vw × 100vh) 3D 인체모형 & 내부 장기 기본 감춤 / 메뉴 클릭 시 활성:
 *    - 초기 화면(및 닫기/전체보기 시)에는 내부 장기·골격·신경을 모두 감추고 매끄러운 도자(Porcelain) 3D 인체 외형만 품격 있게 노출
 *    - 우측 메뉴(또는 3D 포인트) 클릭 시 인체가 반투명 투시 모드로 전환되며 해당 메뉴의 내부 장기·골격·신경만 즉시 활성화
 * 2. 우측 소형 수직 메뉴 나열: 『바른한의원 진료 살펴보기』 9개 파트를 화면 우측에 작고 정갈하게 수직 배치
 * 3. 화이트 · 블랙 · 골드(White · Black · Champagne Gold) 하이엔드 배색:
 *    - 순백(#FFFFFF) · 옵시디언 블랙(#0D0D0F) · 샴페인 앤틱 골드(#C5A059 / #E5C67E) 3색 조화
 * 4. 클린 정보 팝업 규격:
 *    - 테마(Theme) 표기 전면 비노출 & 하단 3단계 검수 문구 전면 비노출 (내부 3단계 자가 검수 게이트는 백그라운드에서 엄격 수행)
 */
const fs = require('fs');
const path = require('path');

const BODY_PARTS = require('./body-parts-source.json');
const { partA: WEBGL_PART_A, partB: WEBGL_PART_B } = require('./body-3d-webgl-engine.js');
const {
  CLINIC_EXPLORE_MENUS,
  BODY_3D_AUTO_NOTES,
  FORBIDDEN_PROMO_WORDS,
  FORBIDDEN_JARGON_WORDS,
  auditNoteThreeStage
} = require('./body-3d-auto-notes-data.js');

// 빌드 시점 보이지 않는 내부 3단계 자가 검수 게이트 실행 (단 1건이라도 위반 시 빌드 즉시 중단)
const FLATTENED_SEED_NOTES = [];
for (const [partId, episodes] of Object.entries(BODY_3D_AUTO_NOTES)) {
  for (const ep of episodes) {
    const res = auditNoteThreeStage(ep);
    if (!res.passed) {
      throw new Error(`[3-Stage Self-Correction Gate Failed] ${ep.id}: ${res.errors.join(' | ')}`);
    }
    FLATTENED_SEED_NOTES.push({
      id: ep.id,
      partId,
      partLabel: ep.partLabel,
      keyword: ep.keyword,
      publishDate: ep.publishDate,
      title: ep.questionTitle,
      empathy: ep.empathyLines,
      truth: ep.truthLines,
      myth: ep.mythLines,
      check: ep.checkList
    });
  }
}

const COMPACT_SHORT_LABELS = {
  knee: '성장 · 성조숙증',
  cervical: '일자목 · 경추 추나',
  lumbar: '허리 디스크 · 골반',
  gongjindan: '황제 공진단',
  syncope: '미주신경성 실신',
  digest: '신경성 위염 · 담적',
  gut: '과민성 장 · 해독',
  uterus: '자궁 · 난소 · 착상',
  prostate: '전립선 · 배뇨 기능'
};

function buildBodyExplorerHtml() {
  const rightCompactButtonsHtml = CLINIC_EXPLORE_MENUS.map((m, idx) => {
    const num = String(idx + 1).padStart(2, '0');
    const shortTitle = COMPACT_SHORT_LABELS[m.id] || m.partLabel;
    return `<button type="button" class="vh-part-chip" data-part="${m.id}" title="${m.menuTitle} (${m.partLabel})"><span class="rcm-num">${num}</span><span class="rcm-label">${shortTitle}</span><span class="rcm-arrow">&rsaquo;</span></button>`;
  }).join('\n      ');

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
  <title>바른한의원 대전본점 | 3D 인체모형 · 바른한의원 진료 살펴보기</title>
  <meta name="description" content="풀스크린 3D 인체모형으로 살펴보는 부위별 순수 건강 기준 가이드. 2일마다 자동 업데이트되는 일상 언어 건강 정보, 무엇이든 물어보세요 Q&A, 누적 건강 칼럼 아카이브." />
  <link rel="canonical" href="https://www.bareunhaniwon.com/body-explorer/" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@600;700;800&family=Pretendard:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": "3D 인체모형 · 바른한의원 진료 살펴보기 건강 정보 패널",
    "url": "https://www.bareunhaniwon.com/body-explorer/",
    "inLanguage": "ko-KR",
    "description": "부위별 순수 건강 정보와 Q&A 공간입니다."
  }
  </script>
  <style>
    :root {
      --lux-white: #FFFFFF;
      --lux-white-glass: rgba(255, 255, 255, 0.95);
      --lux-ivory: #FCFBF8;
      --lux-gold-tint: #FAF5EA;
      --lux-black: #0D0D0F;
      --lux-charcoal: #1A1A1E;
      --lux-ink: #141416;
      --lux-sub: #57534E;
      --lux-gold: #C5A059;
      --lux-gold-bright: #E5C67E;
      --lux-gold-deep: #967128;
      --lux-gold-border: #DFC99B;
      --lux-border-soft: #EAE3D5;
      --lux-shadow: 0 22px 50px rgba(13, 13, 15, 0.16);
      --lux-shadow-sm: 0 8px 22px rgba(13, 13, 15, 0.08);
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      width: 100% !important;
      height: 100% !important;
      margin: 0 !important;
      padding: 0 !important;
      overflow: hidden !important;
      background: #F5EFE2;
      color: var(--lux-ink);
      font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
      -webkit-font-smoothing: antialiased;
    }

    /* 1. FULLSCREEN 3D HUMAN BODY MODEL STAGE (100vw × 100vh) */
    .vibrant-workspace {
      position: fixed;
      inset: 0;
      width: 100vw !important;
      height: 100vh !important;
      height: 100dvh !important;
      margin: 0 !important;
      padding: 0 !important;
      overflow: hidden;
      z-index: 1;
    }
    .vibrant-3d-stage {
      position: fixed;
      inset: 0;
      width: 100vw !important;
      height: 100vh !important;
      height: 100dvh !important;
      min-width: 100vw !important;
      min-height: 100vh !important;
      margin: 0 !important;
      padding: 0 !important;
      background: radial-gradient(circle at 50% 44%, #FFFEFA 0%, #F5EFE2 66%, #E8DEC9 100%);
      overflow: hidden;
      user-select: none;
      z-index: 1;
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

    /* 2. FLOATING MINIMAL TOP HEADER (WHITE · BLACK · GOLD) */
    .vibrant-header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 220;
      padding: 14px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      pointer-events: none;
      background: transparent;
      border: none;
      box-shadow: none;
    }
    .vh-brand {
      pointer-events: auto;
      display: inline-flex;
      align-items: center;
      gap: 9px;
      padding: 5px 15px 5px 6px;
      border-radius: 999px;
      background: var(--lux-white-glass);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border: 1px solid var(--lux-gold-border);
      box-shadow: var(--lux-shadow-sm);
      text-decoration: none;
      color: var(--lux-black);
      transition: all 0.18s ease;
    }
    .vh-brand:hover {
      border-color: var(--lux-gold);
      background: var(--lux-white);
    }
    .vh-brand-mark {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: var(--lux-black);
      border: 1px solid var(--lux-gold);
      color: var(--lux-gold-bright);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 0.71rem;
      letter-spacing: -0.02em;
    }
    .vh-brand-title {
      font-size: 0.82rem;
      font-weight: 800;
      color: var(--lux-black);
      letter-spacing: -0.02em;
      white-space: nowrap;
    }

    .vh-right-actions {
      pointer-events: auto;
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
      justify-content: flex-end;
    }
    .vh-pill-btn {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 6px 13px;
      border-radius: 999px;
      font-size: 0.75rem;
      font-weight: 800;
      text-decoration: none;
      border: 1px solid var(--lux-gold-border);
      background: var(--lux-white-glass);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      color: var(--lux-black);
      cursor: pointer;
      transition: all 0.18s ease;
      white-space: nowrap;
      font-family: 'Pretendard', sans-serif;
      box-shadow: var(--lux-shadow-sm);
    }
    .vh-pill-btn:hover {
      background: var(--lux-black);
      border-color: var(--lux-gold);
      color: var(--lux-gold-bright);
    }

    /* Override visit-tracker.js pill inside header to White · Black · Gold */
    html body header.vibrant-header .bareun-visit-pill-btn {
      background: var(--lux-black) !important;
      color: var(--lux-white) !important;
      border: 1px solid var(--lux-gold) !important;
      box-shadow: var(--lux-shadow-sm) !important;
      padding: 6px 13px !important;
      font-size: 0.74rem !important;
    }
    html body header.vibrant-header .bareun-visit-pill-btn:hover {
      background: var(--lux-charcoal) !important;
      border-color: var(--lux-gold-bright) !important;
    }
    html body header.vibrant-header .bareun-visit-pill-btn .bareun-visit-live-dot,
    html body header.vibrant-header .bareun-visit-pill-btn .bareun-visit-pill-dot {
      background: var(--lux-gold-bright) !important;
      box-shadow: 0 0 8px rgba(229, 198, 126, 0.65) !important;
    }
    html body header.vibrant-header .bareun-visit-pill-btn .bareun-visit-pill-label,
    html body header.vibrant-header .bareun-visit-pill-btn .bareun-visit-pill-sep {
      color: rgba(255, 255, 255, 0.88) !important;
    }
    html body header.vibrant-header .bareun-visit-pill-btn .bareun-visit-pill-num {
      color: var(--lux-gold-bright) !important;
    }

    /* 3. COMPACT RIGHT-SIDE VERTICAL MENU STACK (우측 소형 나열 · WHITE · BLACK · GOLD) */
    .right-compact-menu {
      position: fixed;
      right: 18px;
      top: 50%;
      transform: translateY(-50%);
      z-index: 215;
      width: 178px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 7px;
      border-radius: 15px;
      background: rgba(255, 255, 255, 0.93);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid var(--lux-gold-border);
      box-shadow: 0 14px 36px rgba(13, 13, 15, 0.11);
    }
    .rcm-head {
      background: var(--lux-black);
      color: var(--lux-white);
      border: 1px solid rgba(197, 160, 89, 0.55);
      border-radius: 10px;
      padding: 8px 10px;
      margin-bottom: 2px;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .rcm-head-title {
      font-size: 0.73rem;
      font-weight: 800;
      letter-spacing: -0.02em;
      color: var(--lux-white);
      line-height: 1.25;
    }
    .rcm-head-sub {
      font-size: 0.63rem;
      font-weight: 700;
      color: var(--lux-gold-bright);
      letter-spacing: -0.01em;
    }

    .vh-part-chip {
      appearance: none;
      width: 100%;
      border: 1px solid var(--lux-border-soft);
      background: var(--lux-white);
      color: var(--lux-ink);
      font-family: 'Pretendard', sans-serif;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 7px 9px;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 6px;
      text-align: left;
      transition: all 0.16s ease;
      line-height: 1.2;
    }
    .vh-part-chip .rcm-num {
      font-size: 0.65rem;
      font-weight: 800;
      color: var(--lux-gold-deep);
      font-variant-numeric: tabular-nums;
      flex-shrink: 0;
    }
    .vh-part-chip .rcm-label {
      flex: 1;
      min-width: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      letter-spacing: -0.02em;
    }
    .vh-part-chip .rcm-arrow {
      font-size: 0.84rem;
      font-weight: 700;
      color: var(--lux-gold);
      flex-shrink: 0;
      line-height: 1;
    }
    .vh-part-chip:hover {
      background: var(--lux-gold-tint);
      border-color: var(--lux-gold);
      color: var(--lux-black);
      transform: translateX(-2px);
    }
    .vh-part-chip.active {
      background: var(--lux-black);
      border: 1px solid var(--lux-gold);
      color: var(--lux-white);
      box-shadow: 0 7px 18px rgba(13, 13, 15, 0.24);
      transform: translateX(-3px);
    }
    .vh-part-chip.active .rcm-num,
    .vh-part-chip.active .rcm-arrow {
      color: var(--lux-gold-bright);
    }

    /* 4. TOP STATUS & BOTTOM 3D CONTROLS (WHITE · BLACK · GOLD) */
    .stage-top-badge {
      position: fixed;
      top: 15px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 205;
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 6px 15px;
      border-radius: 999px;
      background: var(--lux-white-glass);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid var(--lux-gold-border);
      box-shadow: var(--lux-shadow-sm);
      pointer-events: none;
      transition: left 0.28s ease;
    }
    .stage-top-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--lux-gold);
    }
    .stage-top-text {
      font-size: 0.74rem;
      font-weight: 800;
      color: var(--lux-black);
      white-space: nowrap;
      letter-spacing: -0.01em;
    }

    .stage-bottom-bar {
      position: fixed;
      bottom: 18px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 205;
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 4px 6px;
      border-radius: 999px;
      background: var(--lux-white-glass);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border: 1px solid var(--lux-gold-border);
      box-shadow: var(--lux-shadow-sm);
      transition: left 0.28s ease;
    }
    @media (min-width: 961px) {
      body.popup-open-mode .stage-bottom-bar {
        left: 31%;
      }
      body.popup-open-mode .stage-top-badge {
        left: 31%;
      }
    }
    .stage-ctrl-btn {
      appearance: none;
      border: 1px solid transparent;
      background: transparent;
      color: var(--lux-sub);
      font-family: 'Pretendard', sans-serif;
      font-size: 0.73rem;
      font-weight: 800;
      padding: 6px 13px;
      border-radius: 999px;
      cursor: pointer;
      transition: all 0.18s ease;
      white-space: nowrap;
    }
    .stage-ctrl-btn:hover {
      color: var(--lux-black);
      background: var(--lux-gold-tint);
    }
    .stage-ctrl-btn.active {
      background: var(--lux-black);
      border-color: var(--lux-gold);
      color: var(--lux-gold-bright);
    }
    .stage-ctrl-btn.reset-btn {
      background: var(--lux-gold-tint);
      color: var(--lux-black);
      border: 1px solid var(--lux-gold-border);
    }
    .stage-ctrl-btn.reset-btn:hover {
      background: var(--lux-black);
      border-color: var(--lux-gold);
      color: var(--lux-gold-bright);
    }

    /* 5. 3D HOTSPOTS & LOADER (WHITE · BLACK · GOLD) */
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
      transition: opacity 0.22s ease, transform 0.22s ease;
    }
    .hotspot-pulse-ring {
      width: 19px;
      height: 19px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.96);
      border: 1.5px solid var(--lux-gold);
      box-shadow: 0 3px 10px rgba(13, 13, 15, 0.14);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1.5px;
      transition: all 0.2s ease;
    }
    .hotspot-core-dot {
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background: var(--lux-black);
    }
    .body-3d-hotspot:hover .hotspot-pulse-ring {
      transform: scale(1.14);
      border-color: var(--lux-black);
    }
    .body-3d-hotspot.active .hotspot-pulse-ring {
      background: var(--lux-black);
      border-color: var(--lux-gold-bright);
      box-shadow: 0 0 0 5px rgba(197, 160, 89, 0.30), 0 4px 14px rgba(13, 13, 15, 0.34);
    }
    .body-3d-hotspot.active .hotspot-core-dot { background: var(--lux-gold-bright); }
    .hotspot-tag-pill { display: none; }

    #dongin-loader-overlay {
      position: absolute;
      inset: 0;
      z-index: 60;
      background: rgba(247, 242, 232, 0.90);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10px;
      transition: opacity 0.4s ease, visibility 0.4s ease;
    }
    #dongin-loader-overlay.hidden { opacity: 0; visibility: hidden; pointer-events: none; }
    .loader-spinner {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 2.5px solid var(--lux-gold-border);
      border-top-color: var(--lux-gold-deep);
      animation: spin 0.85s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* 6. FLOATING WHITE · BLACK · GOLD 3-MENU INFO POPUP PANEL */
    .explore-floating-popup {
      position: fixed;
      right: 208px;
      top: 62px;
      max-height: calc(100vh - 82px);
      max-height: calc(100dvh - 82px);
      width: min(505px, calc(100vw - 228px));
      z-index: 218;
      overflow-y: auto;
      scrollbar-width: thin;
      scrollbar-color: var(--lux-gold) transparent;
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      transform: translateX(14px) scale(0.99);
      transition: opacity 0.22s ease, transform 0.22s ease, visibility 0.22s ease;
    }
    .explore-floating-popup.open {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
      transform: translateX(0) scale(1);
    }
    .explore-floating-popup::-webkit-scrollbar { width: 5px; }
    .explore-floating-popup::-webkit-scrollbar-thumb { background: var(--lux-gold); border-radius: 999px; }

    .popup-shell-wrap {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    /* THE 3 CORE MENUS TAB BAR (WHITE · BLACK · GOLD) */
    .three-menu-nav {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 6px;
      padding: 5px;
      border-radius: 13px;
      background: rgba(255, 255, 255, 0.97);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1.5px solid var(--lux-gold);
      box-shadow: var(--lux-shadow-sm);
    }
    .three-menu-btn {
      appearance: none;
      border: 1px solid transparent;
      background: transparent;
      color: var(--lux-ink);
      font-family: 'Pretendard', sans-serif;
      padding: 8px 6px;
      border-radius: 9px;
      cursor: pointer;
      transition: all 0.16s ease;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1px;
      text-align: center;
    }
    .three-menu-btn:hover {
      background: var(--lux-gold-tint);
    }
    .three-menu-btn.active {
      background: var(--lux-black);
      border-color: var(--lux-gold);
      color: var(--lux-white);
    }
    .tmb-step {
      font-size: 0.64rem;
      font-weight: 800;
      letter-spacing: 0.02em;
      color: var(--lux-gold-deep);
    }
    .three-menu-btn.active .tmb-step {
      color: var(--lux-gold-bright);
    }
    .tmb-label {
      font-size: 0.82rem;
      font-weight: 800;
      word-break: keep-all;
      letter-spacing: -0.02em;
    }

    /* CLEAN OUTPUT BOX FOR MENU 1 & ARCHIVE READER (NO THEME STRIP · NO AUDIT FOOTER) */
    .health-info-popup-box {
      background: var(--lux-white);
      border: 1.5px solid var(--lux-gold);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: var(--lux-shadow);
    }
    .hip-header {
      background: var(--lux-black);
      color: var(--lux-white);
      padding: 13px 16px;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 10px;
      border-bottom: 2px solid var(--lux-gold);
    }
    .hip-header-title-wrap {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
      min-width: 0;
    }
    .hip-part-bracket {
      display: inline-flex;
      align-items: center;
      padding: 3px 9px;
      border-radius: 6px;
      background: linear-gradient(135deg, #E7C983 0%, #C59E50 100%);
      color: var(--lux-black);
      font-size: 0.75rem;
      font-weight: 800;
      white-space: nowrap;
    }
    .hip-divider {
      color: rgba(229, 198, 126, 0.50);
      font-weight: 600;
      font-size: 0.82rem;
    }
    .hip-question-title {
      font-family: 'Noto Serif KR', serif;
      font-size: 1.02rem;
      font-weight: 800;
      color: var(--lux-white);
      line-height: 1.42;
      word-break: keep-all;
    }
    .hip-close-btn {
      appearance: none;
      border: 1px solid rgba(229, 198, 126, 0.65);
      background: rgba(255, 255, 255, 0.06);
      color: var(--lux-gold-bright);
      font-family: 'Pretendard', sans-serif;
      font-size: 0.74rem;
      font-weight: 800;
      padding: 5px 10px;
      border-radius: 7px;
      cursor: pointer;
      white-space: nowrap;
      flex-shrink: 0;
      transition: all 0.16s ease;
    }
    .hip-close-btn:hover {
      background: var(--lux-gold);
      color: var(--lux-black);
      border-color: var(--lux-gold-bright);
    }

    .hip-sections {
      padding: 13px 15px 15px;
      display: flex;
      flex-direction: column;
      gap: 9px;
      background: var(--lux-white);
    }
    .hip-sec-card {
      border-radius: 11px;
      padding: 10px 13px;
      border: 1px solid var(--lux-border-soft);
      background: var(--lux-ivory);
    }
    .hip-sec-card.sec-truth {
      background: #FFFEFA;
      border: 1px solid var(--lux-gold-border);
      border-left: 3px solid var(--lux-gold);
    }
    .hip-sec-heading {
      font-size: 0.82rem;
      font-weight: 800;
      color: var(--lux-black);
      margin-bottom: 5px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .hip-two-lines {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }
    .hip-line {
      margin: 0 !important;
      font-size: 0.83rem;
      font-weight: 600;
      color: #262522;
      line-height: 1.52;
      word-break: keep-all;
    }
    .hip-check-item {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      padding: 7px 10px;
      border-radius: 8px;
      background: var(--lux-white);
      border: 1px solid var(--lux-border-soft);
      cursor: pointer;
      font-size: 0.82rem;
      font-weight: 600;
      color: var(--lux-ink);
      line-height: 1.46;
      word-break: keep-all;
    }
    .hip-check-item input[type="checkbox"] {
      width: 15px;
      height: 15px;
      margin-top: 2px;
      accent-color: var(--lux-gold-deep);
      flex-shrink: 0;
      cursor: pointer;
    }

    /* MENU 2 & MENU 3 PANELS (WHITE · BLACK · GOLD) */
    .qna-menu-panel,
    .archive-menu-panel {
      background: var(--lux-white);
      border: 1.5px solid var(--lux-gold);
      border-radius: 16px;
      padding: 18px;
      box-shadow: var(--lux-shadow);
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .qna-panel-top,
    .archive-filter-bar {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 10px;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--lux-border-soft);
    }
    .qna-write-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 14px;
      border-radius: 999px;
      background: var(--lux-black);
      border: 1px solid var(--lux-gold);
      color: var(--lux-gold-bright);
      font-size: 0.78rem;
      font-weight: 800;
      text-decoration: none;
      transition: all 0.16s ease;
    }
    .qna-write-btn:hover {
      background: var(--lux-gold);
      color: var(--lux-black);
    }
    .ptc-back-btn {
      appearance: none;
      border: 1px solid var(--lux-gold-border);
      background: var(--lux-white);
      color: var(--lux-black);
      font-family: 'Pretendard', sans-serif;
      font-size: 0.74rem;
      font-weight: 800;
      padding: 6px 11px;
      border-radius: 999px;
      cursor: pointer;
      transition: all 0.16s ease;
    }
    .ptc-back-btn:hover {
      border-color: var(--lux-gold);
      background: var(--lux-black);
      color: var(--lux-gold-bright);
    }
    .qna-item-row {
      padding: 12px 14px;
      border-radius: 11px;
      background: var(--lux-ivory);
      border: 1px solid var(--lux-border-soft);
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .qna-item-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      font-size: 0.72rem;
      font-weight: 700;
      color: var(--lux-sub);
    }
    .qna-status-badge {
      padding: 2px 8px;
      border-radius: 999px;
      font-size: 0.68rem;
      font-weight: 800;
    }
    .qna-status-badge.answered {
      background: var(--lux-black);
      border: 1px solid var(--lux-gold);
      color: var(--lux-gold-bright);
    }
    .qna-status-badge.waiting {
      background: var(--lux-gold-tint);
      border: 1px solid var(--lux-gold-border);
      color: var(--lux-gold-deep);
    }
    .qna-item-title {
      font-size: 0.86rem;
      font-weight: 800;
      color: var(--lux-ink);
      line-height: 1.42;
    }

    /* MENU 3: 더 궁금하세요? 누적 아카이브 (WHITE · BLACK · GOLD · 테마 비노출) */
    .archive-scope-pills {
      display: flex;
      gap: 5px;
      flex-wrap: wrap;
    }
    .archive-scope-btn {
      appearance: none;
      border: 1px solid var(--lux-gold-border);
      background: var(--lux-ivory);
      color: var(--lux-ink);
      font-family: 'Pretendard', sans-serif;
      font-size: 0.74rem;
      font-weight: 800;
      padding: 5px 11px;
      border-radius: 999px;
      cursor: pointer;
      transition: all 0.16s ease;
    }
    .archive-scope-btn.active {
      background: var(--lux-black);
      border-color: var(--lux-gold);
      color: var(--lux-gold-bright);
    }
    .archive-list {
      display: flex;
      flex-direction: column;
      gap: 7px;
    }
    .archive-card-btn {
      appearance: none;
      width: 100%;
      text-align: left;
      background: var(--lux-ivory);
      border: 1px solid var(--lux-border-soft);
      border-radius: 11px;
      padding: 11px 13px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      font-family: 'Pretendard', sans-serif;
      transition: all 0.16s ease;
    }
    .archive-card-btn:hover {
      border-color: var(--lux-gold);
      background: var(--lux-gold-tint);
      transform: translateX(-2px);
    }
    .archive-card-tags {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 5px;
      margin-bottom: 4px;
      font-size: 0.69rem;
      font-weight: 800;
    }
    .archive-date-pill {
      padding: 2px 7px;
      border-radius: 5px;
      background: var(--lux-black);
      color: var(--lux-gold-bright);
    }
    .archive-part-pill {
      padding: 2px 7px;
      border-radius: 5px;
      background: var(--lux-white);
      border: 1px solid var(--lux-gold-border);
      color: var(--lux-ink);
    }
    .archive-card-title {
      font-size: 0.87rem;
      font-weight: 800;
      color: var(--lux-ink);
      line-height: 1.4;
      word-break: keep-all;
    }
    .archive-read-arrow {
      font-size: 0.75rem;
      font-weight: 800;
      color: var(--lux-gold-deep);
      white-space: nowrap;
      flex-shrink: 0;
    }

    @media (max-width: 1100px) {
      .stage-top-badge { display: none; }
    }

    @media (max-width: 960px) {
      .vibrant-header { padding: 10px 12px; }
      .vh-brand-title { font-size: 0.76rem; }
      .vh-pill-btn { padding: 5px 10px; font-size: 0.71rem; }
      .right-compact-menu {
        right: 10px;
        width: 148px;
        padding: 5px;
        gap: 3px;
      }
      .rcm-head { padding: 6px 8px; }
      .rcm-head-title { font-size: 0.65rem; word-break: keep-all; white-space: nowrap; }
      .rcm-head-sub { display: none; }
      .vh-part-chip {
        padding: 6px 7px;
        font-size: 0.69rem;
      }
      .vh-part-chip .rcm-num { display: none; }
      .stage-bottom-bar {
        bottom: 12px;
        left: 12px;
        transform: none;
      }
      .explore-floating-popup {
        left: 10px;
        right: 10px;
        top: auto;
        bottom: 10px;
        width: auto;
        max-height: 74dvh;
        z-index: 235;
        transform: translateY(14px);
      }
      .explore-floating-popup.open {
        transform: translateY(0);
      }
    }
  </style>
  <link rel="icon" href="data:,">
</head>
<body>

  <!-- MINIMAL FLOATING TOP BAR (WHITE · BLACK · GOLD) -->
  <header class="vibrant-header">
    <a href="story-3d.html" class="vh-brand">
      <div class="vh-brand-mark">3D</div>
      <span class="vh-brand-title">바른한의원 · 3D 인체모형</span>
    </a>

    <div class="vh-right-actions">
      <a href="ask-doctor.html?tab=qna" class="vh-pill-btn" id="vh-ask-doctor-link">무엇이든 물어보세요</a>
      <a href="story-3d.html" class="vh-pill-btn">&larr; 메인 홈</a>
    </div>
  </header>

  <!-- CENTER STATUS PILL -->
  <div class="stage-top-badge">
    <span class="stage-top-dot"></span>
    <span class="stage-top-text" id="stage-active-part-label">우측 메뉴를 클릭하면 해당 내부 장기와 건강 정보가 열립니다</span>
  </div>

  <!-- COMPACT RIGHT-SIDE VERTICAL MENU (우측 소형 나열 · WHITE · BLACK · GOLD) -->
  <aside class="right-compact-menu" id="vh-part-quicknav" aria-label="바른한의원 진료 살펴보기 우측 소형 메뉴">
    <div class="rcm-head">
      <span class="rcm-head-title">바른한의원 진료 살펴보기</span>
      <span class="rcm-head-sub" id="rcm-cycle-sub">2일 주기 신규 글 업데이트</span>
    </div>
    ${rightCompactButtonsHtml}
  </aside>

  <!-- FULLSCREEN 100vw × 100vh 3D HUMAN BODY WORKSPACE -->
  <main class="vibrant-workspace">
    <section class="vibrant-3d-stage" id="vibrant-3d-stage">
      <div id="dongin-loader-overlay">
        <div class="loader-spinner"></div>
        <div style="font-size:0.82rem;font-weight:800;color:#0D0D0F;">3D 인체모형 준비 중...</div>
      </div>

      <canvas id="vibrant-body-canvas"></canvas>
      <div id="hotspot-overlay-layer"></div>
    </section>
  </main>

  <!-- BOTTOM-CENTER 3D CONTROLS (WHITE · BLACK · GOLD) -->
  <div class="stage-bottom-bar">
    <button type="button" class="stage-ctrl-btn active" id="btn-gender-male" onclick="window.setDonginGender('male')">남성 체형</button>
    <button type="button" class="stage-ctrl-btn" id="btn-gender-female" onclick="window.setDonginGender('female')">여성 체형</button>
    <button type="button" class="stage-ctrl-btn reset-btn" id="btn-cam-reset" onclick="window.closeInfoPopup()">&#8634; 전체 보기</button>
  </div>

  <!-- FLOATING WHITE · BLACK · GOLD 3-MENU INFO POPUP PANEL -->
  <section class="explore-floating-popup" id="encyclopedia-scroll-panel" aria-live="polite">
    <div id="encyclopedia-dynamic-content"></div>
  </section>

  <script>
  (async function() {
    const BODY_PARTS_DATA = ${JSON.stringify(BODY_PARTS)};
    const CLINIC_MENUS = ${JSON.stringify(CLINIC_EXPLORE_MENUS)};
    const SEED_NOTES = ${JSON.stringify(FLATTENED_SEED_NOTES)};
    const FORBIDDEN_PROMO = ${JSON.stringify(FORBIDDEN_PROMO_WORDS)};
    const FORBIDDEN_JARGON = ${JSON.stringify(FORBIDDEN_JARGON_WORDS)};

    const earlyParams = new URLSearchParams(window.location.search);
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

    function getTodayKst() {
      try {
        return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Seoul' }).format(new Date());
      } catch (e) {
        return new Date(Date.now() + 9 * 3600 * 1000).toISOString().slice(0, 10);
      }
    }

    function computeNextUpdateKst(todayStr) {
      const anchor = Date.parse('2026-10-23T00:00:00Z');
      const cur = Date.parse(todayStr + 'T00:00:00Z');
      if (isNaN(cur) || cur < anchor) return '2026-10-23';
      const diffDays = Math.floor((cur - anchor) / 86400000);
      const addDays = (diffDays % 2 === 0) ? 2 : 1;
      return new Date(cur + addDays * 86400000).toISOString().slice(0, 10);
    }

    function fmtDotDate(d) {
      return String(d || '').replace(/-/g, '.');
    }

    function escHtml(str) {
      return String(str == null ? '' : str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }

    // 보이지 않는 내부 3단계 자가 검수 게이트 (UI에는 검수 문구 비노출)
    function passThreeStageGate(note) {
      if (!note || !note.title || !String(note.title).includes('?')) return false;
      if (!Array.isArray(note.empathy) || note.empathy.length < 2) return false;
      if (!Array.isArray(note.truth) || note.truth.length < 2) return false;
      if (!Array.isArray(note.myth) || note.myth.length < 2) return false;
      if (!Array.isArray(note.check) || note.check.length < 2) return false;
      const all = [note.title, ...note.empathy, ...note.truth, ...note.myth, ...note.check].join(' ');
      for (const w of FORBIDDEN_PROMO) { if (all.includes(w)) return false; }
      for (const j of FORBIDDEN_JARGON) { if (all.includes(j)) return false; }
      return true;
    }

    let todayKst = getTodayKst();
    let nextUpdateKst = computeNextUpdateKst(todayKst);
    let dynamicNotes = [];
    let isPopupOpen = false;
    let currentPartId = earlyParams.get('part') || 'knee';
    let currentMenuTab = 0; // 0: 오늘의 건강 글(1개 노출), 1: 무엇이든 물어보세요, 2: 더 궁금하세요?(누적 글 목록)
    let archiveScope = 'part'; // 'part' | 'all'
    let selectedArchiveNoteId = null;
    let qnaCacheByPart = {};

    const popupDrawer = document.getElementById('encyclopedia-scroll-panel');
    const contentBox = document.getElementById('encyclopedia-dynamic-content');
    const quickNavButtons = document.querySelectorAll('#vh-part-quicknav .vh-part-chip');
    const stageLabelEl = document.getElementById('stage-active-part-label');
    const cycleSubEl = document.getElementById('rcm-cycle-sub');
    const stageEl = document.getElementById('vibrant-3d-stage');
    const canvas = document.getElementById('vibrant-body-canvas');
    const hotspotLayer = document.getElementById('hotspot-overlay-layer');
    const loaderOverlay = document.getElementById('dongin-loader-overlay');
    const topAskLink = document.getElementById('vh-ask-doctor-link');

    function getPartById(id) {
      return BODY_PARTS_DATA.find(p => p.id === id) || BODY_PARTS_DATA[0];
    }

    function getMenuMeta(id) {
      return CLINIC_MENUS.find(m => m.id === id) || CLINIC_MENUS[0];
    }

    function normalizeDynamicNote(raw) {
      if (!raw || typeof raw !== 'object') return null;
      return {
        id: raw.id,
        partId: raw.partId || 'knee',
        partLabel: raw.partLabel || '무릎 성장판',
        keyword: raw.keyword || '',
        publishDate: raw.publishDate || todayKst,
        title: raw.title || raw.questionTitle || '',
        empathy: raw.empathy || raw.empathyLines || [],
        truth: raw.truth || raw.truthLines || [],
        myth: raw.myth || raw.mythLines || [],
        check: raw.check || raw.checkList || []
      };
    }

    function getPublishedNotes(partFilter) {
      const mergedMap = new Map();
      for (const n of SEED_NOTES) {
        if (passThreeStageGate(n)) mergedMap.set(n.id, n);
      }
      for (const raw of dynamicNotes) {
        const n = normalizeDynamicNote(raw);
        if (n && passThreeStageGate(n)) mergedMap.set(n.id, n);
      }
      const list = Array.from(mergedMap.values()).filter(n => {
        if (n.publishDate && n.publishDate > todayKst) return false;
        if (partFilter && partFilter !== 'all' && n.partId !== partFilter) return false;
        return true;
      });
      list.sort((a, b) => {
        if (b.publishDate !== a.publishDate) return b.publishDate.localeCompare(a.publishDate);
        return String(b.id).localeCompare(String(a.id));
      });
      return list;
    }

    // 최종 출력 양식 (테마 행 제거 & 하단 검수 문구 제거 · 순수 본문만 출력)
    function buildStandardNoteBoxHtml(note, closeActionJs, closeLabel) {
      return (
        '<article class="health-info-popup-box" aria-label="부위별 건강 정보 팝업">' +
          '<div class="hip-header">' +
            '<div class="hip-header-title-wrap">' +
              '<span class="hip-part-bracket">[' + escHtml(note.partLabel) + ']</span>' +
              '<span class="hip-divider">|</span>' +
              '<h2 class="hip-question-title">&ldquo;' + escHtml(note.title) + '&rdquo;</h2>' +
            '</div>' +
            '<button type="button" class="hip-close-btn" onclick="' + closeActionJs + '">' + escHtml(closeLabel || '✕ 닫기') + '</button>' +
          '</div>' +

          '<div class="hip-sections">' +
            '<section class="hip-sec-card sec-empathy">' +
              '<div class="hip-sec-heading">🎒 1. 일상 속 공감 상황</div>' +
              '<div class="hip-two-lines">' +
                '<p class="hip-line">' + escHtml(note.empathy[0]) + '</p>' +
                '<p class="hip-line">' + escHtml(note.empathy[1]) + '</p>' +
              '</div>' +
            '</section>' +

            '<section class="hip-sec-card sec-truth">' +
              '<div class="hip-sec-heading">💡 2. 몸속 연골/신경이 알려주는 진실</div>' +
              '<div class="hip-two-lines">' +
                '<p class="hip-line">' + escHtml(note.truth[0]) + '</p>' +
                '<p class="hip-line">' + escHtml(note.truth[1]) + '</p>' +
              '</div>' +
            '</section>' +

            '<section class="hip-sec-card sec-myth">' +
              '<div class="hip-sec-heading">❌ 3. 흔히 하는 오해 바로잡기</div>' +
              '<div class="hip-two-lines">' +
                '<p class="hip-line">' + escHtml(note.myth[0]) + '</p>' +
                '<p class="hip-line">' + escHtml(note.myth[1]) + '</p>' +
              '</div>' +
            '</section>' +

            '<section class="hip-sec-card sec-check">' +
              '<div class="hip-sec-heading">🔍 4. 오늘 밤 집에서 해보는 1분 체크</div>' +
              '<div class="hip-two-lines">' +
                '<label class="hip-check-item">' +
                  '<input type="checkbox" />' +
                  '<span>' + escHtml(note.check[0]) + '</span>' +
                '</label>' +
                '<label class="hip-check-item">' +
                  '<input type="checkbox" />' +
                  '<span>' + escHtml(note.check[1]) + '</span>' +
                '</label>' +
              '</div>' +
            '</section>' +
          '</div>' +
        '</article>'
      );
    }

    let applyCameraFraming = function() {};

    function renderIdleState() {
      isPopupOpen = false;
      document.body.classList.remove('popup-open-mode');
      if (popupDrawer) popupDrawer.classList.remove('open');
      quickNavButtons.forEach(btn => btn.classList.remove('active'));
      if (stageLabelEl) {
        stageLabelEl.textContent = '우측 메뉴를 클릭하면 해당 내부 장기와 건강 정보가 열립니다';
      }
      if (cycleSubEl) {
        cycleSubEl.textContent = '2일 주기 · 다음 ' + fmtDotDate(nextUpdateKst);
      }
      applyCameraFraming();
    }

    async function loadQnaForPart(partId) {
      try {
        const res = await fetch('/wp-json/bareun/v1/qna?part=' + encodeURIComponent(partId), { cache: 'no-store' });
        if (!res.ok) return;
        const data = await res.json();
        if (data && Array.isArray(data.items)) {
          qnaCacheByPart[partId] = data.items;
          if (isPopupOpen && currentMenuTab === 1 && currentPartId === partId) {
            renderPopupPanel();
          }
        }
      } catch (e) {}
    }

    function renderPopupPanel() {
      isPopupOpen = true;
      document.body.classList.add('popup-open-mode');
      if (popupDrawer) popupDrawer.classList.add('open');
      const menuMeta = getMenuMeta(currentPartId);
      const partNotes = getPublishedNotes(currentPartId);
      const allNotes = getPublishedNotes('all');
      const latestNote = partNotes[0] || allNotes[0];

      quickNavButtons.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-part') === currentPartId);
      });
      if (stageLabelEl) {
        stageLabelEl.textContent = '[' + menuMeta.partLabel + '] · ' + menuMeta.menuTitle;
      }
      if (cycleSubEl) {
        cycleSubEl.textContent = '2일 주기 · 다음 ' + fmtDotDate(nextUpdateKst);
      }
      if (topAskLink) {
        topAskLink.setAttribute('href', 'ask-doctor.html?tab=qna&part=' + currentPartId);
      }
      applyCameraFraming();

      let activeBodyHtml = '';

      if (currentMenuTab === 0) {
        // 메뉴 1: 최신 글 단 1개 노출
        activeBodyHtml = latestNote
          ? buildStandardNoteBoxHtml(latestNote, 'window.closeInfoPopup()', '✕ 닫기')
          : '<div class="archive-menu-panel">등록된 건강 정보가 없습니다.</div>';
      } else if (currentMenuTab === 1) {
        // 메뉴 2: 무엇이든 물어보세요
        const items = qnaCacheByPart[currentPartId];
        if (!items) {
          loadQnaForPart(currentPartId);
        }
        const qnaListHtml = (items && items.length > 0)
          ? items.slice(0, 6).map(q =>
              '<div class="qna-item-row">' +
                '<div class="qna-item-meta">' +
                  '<span>작성자 ' + escHtml(q.maskedAuthor || '회원') + ' · ' + escHtml(q.createdAt || '') + '</span>' +
                  '<span class="qna-status-badge ' + (q.status === 'answered' ? 'answered' : 'waiting') + '">' +
                    (q.status === 'answered' ? '답변 완료' : '답변 대기') +
                  '</span>' +
                '</div>' +
                '<div class="qna-item-title">' + escHtml(q.title) + '</div>' +
              '</div>'
            ).join('')
          : '<div class="qna-item-row"><div class="qna-item-title">[' + escHtml(menuMeta.partLabel) + '] 관련 궁금한 점을 1:1 비공개로 편하게 질문해 보세요.</div></div>';

        activeBodyHtml =
          '<div class="qna-menu-panel">' +
            '<div class="qna-panel-top">' +
              '<div>' +
                '<div style="font-size:0.72rem;font-weight:800;color:#967128;margin-bottom:3px;">[' + escHtml(menuMeta.partLabel) + '] · 1:1 건강 Q&amp;A</div>' +
                '<h2 style="font-size:1.12rem;font-weight:800;color:#0D0D0F;">무엇이든 물어보세요</h2>' +
                '<p style="font-size:0.8rem;color:#57534E;margin-top:3px;">작성자 본인과 의료진만 열람 가능한 비공개 질문 공간입니다.</p>' +
              '</div>' +
              '<div style="display:flex;align-items:center;gap:6px;">' +
                '<a href="ask-doctor.html?tab=qna&part=' + currentPartId + '" class="qna-write-btn">1:1 질문 남기기 &rarr;</a>' +
                '<button type="button" class="ptc-back-btn" onclick="window.closeInfoPopup()">✕ 닫기</button>' +
              '</div>' +
            '</div>' +
            '<div style="display:flex;flex-direction:column;gap:8px;">' + qnaListHtml + '</div>' +
          '</div>';
      } else {
        // 메뉴 3: 더 궁금하세요? (누적 글 목록 · 테마 배지 비노출)
        const targetList = archiveScope === 'all' ? allNotes : partNotes;
        const pickedNote = selectedArchiveNoteId
          ? targetList.find(n => n.id === selectedArchiveNoteId) || allNotes.find(n => n.id === selectedArchiveNoteId)
          : null;

        if (pickedNote) {
          activeBodyHtml =
            '<div style="margin-bottom:2px;">' +
              '<button type="button" class="ptc-back-btn" onclick="window.backToArchiveList()">&larr; 누적 글 목록으로 돌아가기</button>' +
            '</div>' +
            buildStandardNoteBoxHtml(pickedNote, 'window.backToArchiveList()', '✕ 목록으로');
        } else {
          const rowsHtml = targetList.map((n, idx) =>
            '<button type="button" class="archive-card-btn" onclick="window.openArchivedNote(\\'' + n.id + '\\')">' +
              '<div>' +
                '<div class="archive-card-tags">' +
                  '<span class="archive-date-pill">' + fmtDotDate(n.publishDate) + (idx === 0 && archiveScope === 'part' ? ' · 최신' : '') + '</span>' +
                  '<span class="archive-part-pill">[' + escHtml(n.partLabel) + ']</span>' +
                '</div>' +
                '<div class="archive-card-title">&ldquo;' + escHtml(n.title) + '&rdquo;</div>' +
              '</div>' +
              '<span class="archive-read-arrow">읽기 &rarr;</span>' +
            '</button>'
          ).join('');

          activeBodyHtml =
            '<div class="archive-menu-panel">' +
              '<div class="archive-filter-bar">' +
                '<div>' +
                  '<div style="font-size:0.72rem;font-weight:800;color:#967128;margin-bottom:2px;">2일 주기 자동 누적 아카이브</div>' +
                  '<h2 style="font-size:1.12rem;font-weight:800;color:#0D0D0F;">더 궁금하세요?</h2>' +
                '</div>' +
                '<div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">' +
                  '<div class="archive-scope-pills">' +
                    '<button type="button" class="archive-scope-btn' + (archiveScope === 'part' ? ' active' : '') + '" onclick="window.setArchiveScope(\\'part\\')">[' + escHtml(menuMeta.partLabel) + '] (' + partNotes.length + ')</button>' +
                    '<button type="button" class="archive-scope-btn' + (archiveScope === 'all' ? ' active' : '') + '" onclick="window.setArchiveScope(\\'all\\')">전체 부위 (' + allNotes.length + ')</button>' +
                  '</div>' +
                  '<button type="button" class="ptc-back-btn" onclick="window.closeInfoPopup()">✕ 닫기</button>' +
                '</div>' +
              '</div>' +
              '<div class="archive-list">' + rowsHtml + '</div>' +
            '</div>';
        }
      }

      contentBox.innerHTML =
        '<div class="popup-shell-wrap">' +
          '<nav class="three-menu-nav" role="tablist" aria-label="정보 팝업 3대 메뉴">' +
            '<button type="button" class="three-menu-btn' + (currentMenuTab === 0 ? ' active' : '') + '" onclick="window.switchPopupMenu(0)">' +
              '<span class="tmb-step">01 · 최신 글 1편</span>' +
              '<span class="tmb-label">오늘의 건강 글</span>' +
            '</button>' +
            '<button type="button" class="three-menu-btn' + (currentMenuTab === 1 ? ' active' : '') + '" onclick="window.switchPopupMenu(1)">' +
              '<span class="tmb-step">02 · 1:1 질문</span>' +
              '<span class="tmb-label">무엇이든 물어보세요</span>' +
            '</button>' +
            '<button type="button" class="three-menu-btn' + (currentMenuTab === 2 ? ' active' : '') + '" onclick="window.switchPopupMenu(2)">' +
              '<span class="tmb-step">03 · 누적 ' + partNotes.length + '편</span>' +
              '<span class="tmb-label">더 궁금하세요?</span>' +
            '</button>' +
          '</nav>' +
          activeBodyHtml +
        '</div>';
    }

    window.switchPopupMenu = function(tabIdx) {
      currentMenuTab = tabIdx;
      if (tabIdx !== 2) selectedArchiveNoteId = null;
      renderPopupPanel();
    };

    window.setArchiveScope = function(scope) {
      archiveScope = scope;
      selectedArchiveNoteId = null;
      renderPopupPanel();
    };

    window.openArchivedNote = function(noteId) {
      selectedArchiveNoteId = noteId;
      renderPopupPanel();
    };

    window.backToArchiveList = function() {
      selectedArchiveNoteId = null;
      renderPopupPanel();
    };

    window.closeInfoPopup = function() {
      selectedArchiveNoteId = null;
      renderIdleState();
      if (typeof window.resetDonginView === 'function') {
        window.resetDonginView();
      }
      if (typeof majorHotspotNodes !== 'undefined' && Array.isArray(majorHotspotNodes)) {
        majorHotspotNodes.forEach(h => h.dom.classList.remove('active'));
      }
    };

    // 백엔드(/wp-json/bareun/v1/body-notes)에서 2일 주기 동적 신규 글 실시간 동기화
    async function syncLiveServerNotes() {
      try {
        const res = await fetch('/wp-json/bareun/v1/body-notes', { cache: 'no-store' });
        if (!res.ok) return;
        const data = await res.json();
        if (data && data.ok) {
          if (data.todayKst) todayKst = data.todayKst;
          if (data.nextUpdateKst) nextUpdateKst = data.nextUpdateKst;
          if (Array.isArray(data.notes) && data.notes.length > 0) {
            dynamicNotes = data.notes;
          }
          if (isPopupOpen) renderPopupPanel();
          else renderIdleState();
        }
      } catch (e) {}
    }

    if (earlyParams.get('part')) {
      renderPopupPanel();
    } else {
      renderIdleState();
    }
    syncLiveServerNotes();

    setTimeout(() => {
      if (loaderOverlay) loaderOverlay.classList.add('hidden');
    }, 2400);

${WEBGL_PART_A}

    // 풀스크린 전 해상도에서 머리끝~발끝 전신이 한눈에 들어오도록 수직 시야각(vFOV) 및 좌우 프레이밍 제어
    camera.setFocalLength = function() {
      const w = Math.max(320, stageEl ? (stageEl.clientWidth || window.innerWidth) : window.innerWidth);
      const h = Math.max(320, stageEl ? (stageEl.clientHeight || window.innerHeight) : window.innerHeight);
      const aspect = w / Math.max(1, h);
      this.aspect = aspect;
      this.fov = aspect < 0.65 ? Math.min(68, 55 * (0.65 / Math.max(0.42, aspect)) * 0.90) : 55;
      if (isPopupOpen && w > 960) {
        this.setViewOffset(w, h, Math.round(w * 0.19), 0, w, h);
      } else {
        this.clearViewOffset();
      }
      this.updateProjectionMatrix();
    };

    applyCameraFraming = function() {
      if (!camera) return;
      camera.setFocalLength(38);
    };

    window.selectBodyPart = function(partId, shouldFlyCamera = true) {
      const part = getPartById(partId);
      currentPartId = part.id;
      currentMenuTab = 0;
      archiveScope = 'part';
      selectedArchiveNoteId = null;
      renderPopupPanel();

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

    const urlPart = earlyParams.get('part');
    if (urlPart) {
      window.selectBodyPart(urlPart, true);
    } else {
      window.resetDonginView();
      majorHotspotNodes.forEach(h => h.dom.classList.remove('active'));
    }
    window.addEventListener('resize', applyCameraFraming);
    applyCameraFraming();
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
console.log('✅ Generated Fullscreen 3D Body Explorer (Organs Hidden Until Clicked · White-Black-Gold v5.5):', outPath, '(' + html.length + ' bytes)');
