/**
 * 바른한의원 대전본점 · 3D 인체모형 & 『바른한의원 진료 살펴보기』 3메뉴 정보 팝업 패널 빌더 (v5.3)
 *
 * [핵심 설계]
 * 1. 좌측 42%: 과거 버전 한지 베이지 & 반투명 도자(Porcelain) 3D 인체모형 · 골격 · 신경 · 오장육부 쇼룸 100% 보존
 * 2. 우측 58%: 『바른한의원 진료 살펴보기』 메뉴 클릭(또는 3D 핫스팟 클릭) 시 열리는 3D 인체 그래픽 '정보 팝업 패널'
 *    - 메뉴 ① 오늘의 건강 글 (AI 3단계 자가 검수 통과 최신 글 단 1편만 노출 · 2일 주기 자동 업데이트)
 *    - 메뉴 ② 무엇이든 물어보세요 (부위별 1:1 질문·답변 목록 및 질문 등록 연결)
 *    - 메뉴 ③ 더 궁금하세요? (2일마다 누적된 검수 통과 건강 글 전체 아카이브 목록 & 열람)
 * 3. 의료법 제56조 및 무홍보 순수 정보 규격 엄수:
 *    - 팝업 건강 글 내부 병원 예약/내원 유도(CTA), 상업 문구, 단정적 표현('완치','100%','최고'), 어려운 전문용어 100% 배제
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

// 빌드 시점 전수 3단계 자가 검수 게이트 실행 (단 1건이라도 위반 시 빌드 즉시 중단)
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
      theme: ep.theme,
      keyword: ep.keyword,
      academicBasis: ep.academicBasis || '',
      publishDate: ep.publishDate,
      title: ep.questionTitle,
      empathy: ep.empathyLines,
      truth: ep.truthLines,
      myth: ep.mythLines,
      check: ep.checkList
    });
  }
}

function buildBodyExplorerHtml() {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
  <title>바른한의원 대전본점 | 3D 인체모형 · 바른한의원 진료 살펴보기</title>
  <meta name="description" content="3D 인체모형으로 살펴보는 부위별 순수 건강 기준 가이드. 2일마다 자동 업데이트되는 일상 언어 건강 정보, 무엇이든 물어보세요 Q&A, 누적 건강 칼럼 아카이브." />
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
    "description": "의학·학술 팩트체크 및 의료법 제56조 기준 3단계 자가 검수를 거친 부위별 순수 건강 정보와 Q&A 공간입니다."
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
      --black-sub: #374151;
      --border-warm: #D6CFC2;
      --border-strong: #B8AE9C;
      --shadow-soft: 0 16px 40px rgba(24, 20, 15, 0.09);
      --shadow-card: 0 6px 20px rgba(24, 20, 15, 0.05);
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      width: 100%;
      min-height: 100%;
      background: var(--bg-beige);
      color: var(--black-ink);
      font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
    }

    /* 1. TOP HEADER BAR */
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
      background: linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%);
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 0.95rem;
      box-shadow: 0 4px 10px rgba(27, 67, 50, 0.22);
    }
    .vh-brand-title {
      font-family: 'Noto Serif KR', serif;
      font-weight: 800;
      font-size: 0.98rem;
      color: var(--black-ink);
    }
    .vh-right-actions {
      display: flex;
      align-items: center;
      gap: 8px;
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
      cursor: pointer;
      transition: all 0.2s ease;
      white-space: nowrap;
      font-family: 'Pretendard', sans-serif;
    }
    .vh-pill-btn:hover {
      border-color: var(--green-primary);
      background: var(--green-tint);
    }
    .vh-pill-btn.menu-overview-btn {
      background: #FEF3C7;
      border-color: #F59E0B;
      color: #92400E;
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
      background: rgba(250, 247, 240, 0.94);
      border-top: 1px solid #E5DEC9;
    }
    @media (min-width: 1680px) {
      .vh-part-quicknav { justify-content: center; }
    }
    .vh-part-quicknav::-webkit-scrollbar { display: none; }
    .vh-quicknav-label {
      font-size: 0.76rem;
      font-weight: 800;
      color: var(--brown-deep);
      padding-right: 6px;
      margin-right: 2px;
      border-right: 1.5px solid #D6CFC2;
      white-space: nowrap;
    }
    .vh-part-chip {
      appearance: none;
      border: 1.5px solid #D0C8B8;
      background: var(--bg-white);
      color: var(--black-ink);
      font-family: 'Pretendard', sans-serif;
      font-size: 0.77rem;
      font-weight: 800;
      padding: 6px 12px;
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

    /* 2. WORKSPACE SPLIT: LEFT 42% PAST WARM HANJI 3D MODEL + RIGHT 58% CLINIC EXPLORE & 3-MENU POPUP */
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
      width: 22px;
      height: 22px;
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
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: var(--brown-deep);
    }
    .body-3d-hotspot.active .hotspot-pulse-ring {
      background: #D97706;
      border-color: #FFFFFF;
      box-shadow: 0 0 0 5px rgba(217, 119, 6, 0.26), 0 4px 14px rgba(180, 83, 9, 0.35);
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

    /* 3. RIGHT PANEL: 『바른한의원 진료 살펴보기』 & 3-MENU INFO POPUP PANEL */
    .explore-right-panel {
      width: 100% !important;
      min-width: 0 !important;
      max-width: 1020px;
      margin: 0 auto !important;
      justify-self: stretch !important;
      padding: 16px 28px 36px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    /* Overview Mode: 『바른한의원 진료 살펴보기』 9-Card Menu Dock */
    .clinic-explore-dock {
      background: rgba(255, 255, 255, 0.94);
      border: 1.5px solid var(--border-strong);
      border-radius: 24px;
      padding: 26px 28px;
      box-shadow: var(--shadow-soft);
      animation: fadeSlideUp 0.26s ease-out;
    }
    .dock-header-row {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;
      padding-bottom: 18px;
      margin-bottom: 18px;
      border-bottom: 1.5px solid #EAE2D3;
    }
    .dock-eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 11px;
      border-radius: 999px;
      background: var(--green-tint);
      border: 1px solid #6EE7B7;
      color: var(--green-primary);
      font-size: 0.76rem;
      font-weight: 800;
      margin-bottom: 7px;
    }
    .dock-header-title {
      font-family: 'Noto Serif KR', serif;
      font-size: clamp(1.38rem, 2vw, 1.72rem);
      font-weight: 800;
      color: var(--brown-deep);
      letter-spacing: -0.02em;
    }
    .dock-header-sub {
      font-size: 0.9rem;
      color: var(--black-sub);
      margin-top: 5px;
      font-weight: 500;
      line-height: 1.55;
    }
    .dock-cycle-badge {
      padding: 9px 14px;
      border-radius: 14px;
      background: #FFFBEB;
      border: 1.5px solid #F59E0B;
      color: #92400E;
      font-size: 0.79rem;
      font-weight: 800;
      line-height: 1.45;
    }

    .clinic-menu-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }
    .clinic-menu-item {
      appearance: none;
      width: 100%;
      text-align: left;
      background: #FFFDF9;
      border: 1.5px solid #DFD7C8;
      border-radius: 18px;
      padding: 16px 18px;
      cursor: pointer;
      display: flex;
      align-items: flex-start;
      gap: 13px;
      transition: all 0.2s ease;
      font-family: 'Pretendard', sans-serif;
    }
    .clinic-menu-item:hover {
      border-color: var(--green-primary);
      background: #FFFFFF;
      transform: translateY(-2px);
      box-shadow: 0 10px 24px rgba(27, 67, 50, 0.1);
    }
    .clinic-menu-item.featured-growth {
      grid-column: 1 / -1;
      background: linear-gradient(135deg, #F0FDF4 0%, #FFFBEB 100%);
      border: 2px solid var(--green-primary);
    }
    .cmi-icon {
      width: 44px;
      height: 44px;
      border-radius: 13px;
      background: #FFFFFF;
      border: 1px solid #E5DEC9;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.32rem;
      flex-shrink: 0;
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.04);
    }
    .cmi-body {
      flex: 1;
      min-width: 0;
    }
    .cmi-top-line {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 4px;
    }
    .cmi-title {
      font-size: 1.02rem;
      font-weight: 800;
      color: var(--black-ink);
    }
    .cmi-count-pill {
      font-size: 0.72rem;
      font-weight: 800;
      padding: 3px 9px;
      border-radius: 999px;
      background: var(--green-primary);
      color: #FFFFFF;
      white-space: nowrap;
    }
    .cmi-preview-q {
      font-size: 0.87rem;
      font-weight: 700;
      color: var(--green-primary);
      line-height: 1.45;
      margin-top: 3px;
      word-break: keep-all;
    }
    .cmi-sub {
      font-size: 0.79rem;
      color: #6B7280;
      font-weight: 600;
    }

    /* Popup Active Mode: Exactly 3 Menus + Standardized Output Box */
    .popup-shell-wrap {
      display: flex;
      flex-direction: column;
      gap: 10px;
      animation: fadeSlideUp 0.25s ease-out;
    }
    @keyframes fadeSlideUp {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .popup-top-context-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 10px;
      padding: 8px 15px;
      border-radius: 13px;
      background: rgba(255, 255, 255, 0.9);
      border: 1.5px solid var(--border-warm);
    }
    .ptc-left {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.82rem;
      font-weight: 800;
      color: var(--brown-deep);
    }
    .ptc-back-btn {
      appearance: none;
      border: 1.5px solid #C8C0B0;
      background: #FAF7F0;
      color: var(--brown-deep);
      font-family: 'Pretendard', sans-serif;
      font-size: 0.77rem;
      font-weight: 800;
      padding: 5px 12px;
      border-radius: 999px;
      cursor: pointer;
      transition: all 0.18s ease;
    }
    .ptc-back-btn:hover {
      border-color: var(--brown-deep);
      background: #EFE8DA;
    }

    /* THE 3 CORE MENUS TAB BAR */
    .three-menu-nav {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 9px;
    }
    .three-menu-btn {
      appearance: none;
      border: 1.5px solid var(--border-strong);
      background: #FFFFFF;
      color: var(--black-ink);
      font-family: 'Pretendard', sans-serif;
      padding: 10px 10px;
      border-radius: 14px;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2px;
      box-shadow: var(--shadow-card);
      text-align: center;
    }
    .three-menu-btn:hover {
      border-color: #D97706;
      background: #FFFBEB;
    }
    .three-menu-btn.active {
      background: var(--green-primary);
      border-color: var(--green-primary);
      color: #FFFFFF;
      box-shadow: 0 10px 22px rgba(27, 67, 50, 0.24);
    }
    .tmb-step {
      font-size: 0.71rem;
      font-weight: 800;
      letter-spacing: 0.02em;
      opacity: 0.86;
    }
    .tmb-label {
      font-size: 0.94rem;
      font-weight: 800;
      word-break: keep-all;
    }

    /* EXACT OUTPUT BOX SPECIFICATION FOR MENU 1 & ARCHIVE READER */
    .health-info-popup-box {
      background: #FFFFFF;
      border: 2px solid var(--brown-deep);
      border-radius: 22px;
      overflow: hidden;
      box-shadow: 0 18px 42px rgba(24, 20, 15, 0.12);
    }
    .hip-header {
      background: linear-gradient(135deg, #233D31 0%, #1B4332 100%);
      color: #FFFFFF;
      padding: 13px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      border-bottom: 2px solid var(--brown-deep);
    }
    .hip-header-title-wrap {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
      min-width: 0;
    }
    .hip-part-bracket {
      display: inline-flex;
      align-items: center;
      padding: 5px 11px;
      border-radius: 8px;
      background: #FEF3C7;
      color: #78350F;
      font-size: 0.84rem;
      font-weight: 800;
      white-space: nowrap;
    }
    .hip-divider {
      color: rgba(255, 255, 255, 0.45);
      font-weight: 700;
    }
    .hip-question-title {
      font-family: 'Noto Serif KR', serif;
      font-size: clamp(1.08rem, 1.55vw, 1.32rem);
      font-weight: 800;
      color: #FFFFFF;
      line-height: 1.42;
      word-break: keep-all;
    }
    .hip-close-btn {
      appearance: none;
      border: 1.5px solid rgba(255, 255, 255, 0.45);
      background: rgba(255, 255, 255, 0.12);
      color: #FFFFFF;
      font-family: 'Pretendard', sans-serif;
      font-size: 0.82rem;
      font-weight: 800;
      padding: 7px 13px;
      border-radius: 10px;
      cursor: pointer;
      white-space: nowrap;
      flex-shrink: 0;
      transition: all 0.18s ease;
    }
    .hip-close-btn:hover {
      background: #FFFFFF;
      color: var(--brown-deep);
    }

    .hip-meta-strip {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 8px;
      padding: 10px 22px;
      background: #FAF7F0;
      border-bottom: 1px solid #E5DEC9;
      font-size: 0.78rem;
      font-weight: 700;
      color: var(--brown-mid);
    }
    .hip-tag-row {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 6px;
    }
    .hip-mini-tag {
      padding: 3px 9px;
      border-radius: 999px;
      background: #FFFFFF;
      border: 1px solid #D6CFC2;
      color: var(--brown-deep);
      font-weight: 800;
    }
    .hip-mini-tag.kw {
      background: #ECFDF5;
      border-color: #6EE7B7;
      color: #065F46;
    }

    .hip-sections {
      padding: 13px 18px 14px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .hip-sec-card {
      border-radius: 14px;
      padding: 12px 15px;
      border: 1.5px solid #E6DFD1;
      background: #FFFDF9;
    }
    .hip-sec-card.sec-empathy {
      background: #FFFBEB;
      border-color: #FDE68A;
    }
    .hip-sec-card.sec-truth {
      background: #F0FDF4;
      border-color: #A7F3D0;
    }
    .hip-sec-card.sec-myth {
      background: #FEF2F2;
      border-color: #FECACA;
    }
    .hip-sec-card.sec-check {
      background: #F8FAFC;
      border-color: #CBD5E1;
    }
    .hip-sec-heading {
      font-size: 0.9rem;
      font-weight: 800;
      color: var(--black-ink);
      margin-bottom: 6px;
      display: flex;
      align-items: center;
      gap: 7px;
    }
    .hip-two-lines {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .hip-line {
      margin: 0 !important;
      font-size: 0.89rem;
      font-weight: 600;
      color: #1F2937;
      line-height: 1.54;
      word-break: keep-all;
      padding-left: 2px;
    }
    .hip-check-item {
      display: flex;
      align-items: flex-start;
      gap: 9px;
      padding: 7px 11px;
      border-radius: 10px;
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      cursor: pointer;
      font-size: 0.88rem;
      font-weight: 600;
      color: #1E293B;
      line-height: 1.5;
      word-break: keep-all;
    }
    .hip-check-item input[type="checkbox"] {
      width: 18px;
      height: 18px;
      margin-top: 3px;
      accent-color: var(--green-primary);
      flex-shrink: 0;
      cursor: pointer;
    }

    .hip-audit-footer {
      padding: 12px 22px;
      background: #F4EFE4;
      border-top: 1px solid #DFD7C8;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 8px;
      font-size: 0.76rem;
      font-weight: 700;
      color: var(--brown-soft);
    }

    /* MENU 2: 무엇이든 물어보세요 */
    .qna-menu-panel {
      background: #FFFFFF;
      border: 1.5px solid var(--border-strong);
      border-radius: 22px;
      padding: 24px 26px;
      box-shadow: var(--shadow-soft);
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .qna-panel-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;
      padding-bottom: 16px;
      border-bottom: 1.5px solid #EAE2D3;
    }
    .qna-write-btn {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 11px 18px;
      border-radius: 999px;
      background: var(--green-primary);
      color: #FFFFFF;
      font-size: 0.88rem;
      font-weight: 800;
      text-decoration: none;
      transition: all 0.2s ease;
    }
    .qna-write-btn:hover {
      background: #14532D;
      transform: translateY(-1px);
    }
    .qna-item-row {
      padding: 15px 18px;
      border-radius: 15px;
      background: #FAF7F0;
      border: 1.5px solid #E5DEC9;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .qna-item-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      font-size: 0.77rem;
      font-weight: 700;
      color: #6B7280;
    }
    .qna-status-badge {
      padding: 3px 9px;
      border-radius: 999px;
      font-size: 0.72rem;
      font-weight: 800;
    }
    .qna-status-badge.answered {
      background: #DCFCE7;
      color: #14532D;
    }
    .qna-status-badge.waiting {
      background: #FEF3C7;
      color: #92400E;
    }
    .qna-item-title {
      font-size: 0.95rem;
      font-weight: 800;
      color: var(--black-ink);
      line-height: 1.45;
    }

    /* MENU 3: 더 궁금하세요? (프롬프트 누적 글 목록) */
    .archive-menu-panel {
      background: #FFFFFF;
      border: 1.5px solid var(--border-strong);
      border-radius: 22px;
      padding: 24px 26px;
      box-shadow: var(--shadow-soft);
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
    .archive-filter-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 10px;
      padding-bottom: 14px;
      border-bottom: 1.5px solid #EAE2D3;
    }
    .archive-scope-pills {
      display: flex;
      gap: 7px;
      flex-wrap: wrap;
    }
    .archive-scope-btn {
      appearance: none;
      border: 1.5px solid #D0C8B8;
      background: #FAF7F0;
      color: var(--brown-deep);
      font-family: 'Pretendard', sans-serif;
      font-size: 0.8rem;
      font-weight: 800;
      padding: 7px 14px;
      border-radius: 999px;
      cursor: pointer;
    }
    .archive-scope-btn.active {
      background: var(--brown-deep);
      border-color: var(--brown-deep);
      color: #FFFFFF;
    }
    .archive-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .archive-card-btn {
      appearance: none;
      width: 100%;
      text-align: left;
      background: #FFFDF9;
      border: 1.5px solid #DFD7C8;
      border-radius: 16px;
      padding: 15px 18px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
      font-family: 'Pretendard', sans-serif;
      transition: all 0.18s ease;
    }
    .archive-card-btn:hover {
      border-color: var(--green-primary);
      background: #F0FDF4;
      transform: translateX(2px);
    }
    .archive-card-tags {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 5px;
      font-size: 0.75rem;
      font-weight: 800;
    }
    .archive-date-pill {
      padding: 2px 8px;
      border-radius: 6px;
      background: #EFE8DA;
      color: var(--brown-deep);
    }
    .archive-part-pill {
      padding: 2px 8px;
      border-radius: 6px;
      background: #ECFDF5;
      color: #065F46;
    }
    .archive-theme-pill {
      padding: 2px 8px;
      border-radius: 6px;
      background: #FEF3C7;
      color: #92400E;
    }
    .archive-card-title {
      font-size: 0.98rem;
      font-weight: 800;
      color: var(--black-ink);
      line-height: 1.45;
      word-break: keep-all;
    }
    .archive-read-arrow {
      font-size: 0.82rem;
      font-weight: 800;
      color: var(--green-primary);
      white-space: nowrap;
      flex-shrink: 0;
    }

    @media (max-width: 1120px) {
      .vibrant-header { position: sticky; height: auto; }
      .vh-top-row { height: auto; min-height: 52px; padding: 8px 12px; flex-wrap: wrap; }
      .vh-part-quicknav { height: 44px; padding: 0 12px; }
      .vibrant-workspace { grid-template-columns: 1fr; padding-top: 0; }
      .vibrant-3d-stage {
        position: relative;
        top: 0;
        height: 45dvh;
        min-height: 320px;
        border-right: none;
        border-bottom: 1.5px solid var(--border-warm);
      }
      .explore-right-panel { padding: 18px 14px 40px; }
      .clinic-menu-grid { grid-template-columns: 1fr; }
      .three-menu-nav { grid-template-columns: 1fr; }
      .hip-header { padding: 15px 16px; align-items: flex-start; }
      .hip-sections { padding: 16px; }
    }
  </style>
  <link rel="icon" href="data:,">
</head>
<body>

  <!-- TOP HEADER BAR -->
  <header class="vibrant-header">
    <div class="vh-top-row">
      <a href="story-3d.html" class="vh-brand">
        <div class="vh-brand-mark">3D</div>
        <span class="vh-brand-title">바른한의원 대전본점 · 3D 인체모형 진료 살펴보기</span>
      </a>

      <div class="vh-right-actions">
        <button type="button" class="vh-pill-btn menu-overview-btn" onclick="window.closeInfoPopup()">☰ 바른한의원 진료 살펴보기</button>
        <a href="ask-doctor.html?tab=qna" class="vh-pill-btn" id="vh-ask-doctor-link">💬 무엇이든 물어보세요</a>
        <a href="story-3d.html" class="vh-pill-btn">← 메인 홈</a>
      </div>
    </div>

    <nav class="vh-part-quicknav" id="vh-part-quicknav" aria-label="바른한의원 진료 살펴보기 부위 선택">
      <span class="vh-quicknav-label">바른한의원 진료 살펴보기</span>
      ${CLINIC_EXPLORE_MENUS.map(m => `<button type="button" class="vh-part-chip" data-part="${m.id}">${m.icon} ${m.partLabel}</button>`).join('\n      ')}
    </nav>
  </header>

  <main class="vibrant-workspace">
    <!-- LEFT: PAST-VERSION WARM HANJI PORCELAIN 3D HUMAN BODY MODEL -->
    <section class="vibrant-3d-stage" id="vibrant-3d-stage">
      <div id="dongin-loader-overlay">
        <div class="loader-spinner"></div>
        <div style="font-size:0.88rem;font-weight:700;color:var(--brown-deep);">3D 인체 장기 · 신경 · 골격 로딩 중...</div>
      </div>

      <div class="stage-top-badge">
        <span class="stage-top-dot"></span>
        <span class="stage-top-text" id="stage-active-part-label">바른한의원 진료 살펴보기 · 부위를 클릭하세요</span>
      </div>

      <canvas id="vibrant-body-canvas"></canvas>
      <div id="hotspot-overlay-layer"></div>

      <div class="stage-bottom-bar">
        <button type="button" class="stage-ctrl-btn active" id="btn-gender-male" onclick="window.setDonginGender('male')">남성 체형</button>
        <button type="button" class="stage-ctrl-btn" id="btn-gender-female" onclick="window.setDonginGender('female')">여성 체형</button>
        <span style="width:1px;height:14px;background:var(--border-warm);"></span>
        <button type="button" class="stage-ctrl-btn reset-btn" id="btn-cam-reset" onclick="window.closeInfoPopup()">↺ 전체 보기</button>
      </div>
    </section>

    <!-- RIGHT: 『바른한의원 진료 살펴보기』 & 3-MENU INFO POPUP PANEL -->
    <section class="explore-right-panel" id="encyclopedia-scroll-panel">
      <div id="encyclopedia-dynamic-content"></div>
    </section>
  </main>

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

    // 클라이언트 측 3단계 자가 검수 검증기 (동적 수신 글까지 무결성 보장)
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

    function getMenuMeta(id) {
      return CLINIC_MENUS.find(m => m.id === id) || CLINIC_MENUS[0];
    }

    function normalizeDynamicNote(raw) {
      if (!raw || typeof raw !== 'object') return null;
      return {
        id: raw.id,
        partId: raw.partId || 'knee',
        partLabel: raw.partLabel || '무릎 성장판',
        theme: raw.theme || '',
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

    function buildStandardNoteBoxHtml(note, closeActionJs, closeLabel) {
      return (
        '<article class="health-info-popup-box" aria-label="3단계 검수 통과 순수 건강 정보 팝업">' +
          '<div class="hip-header">' +
            '<div class="hip-header-title-wrap">' +
              '<span class="hip-part-bracket">[' + escHtml(note.partLabel) + ']</span>' +
              '<span class="hip-divider">|</span>' +
              '<h2 class="hip-question-title">&ldquo;' + escHtml(note.title) + '&rdquo;</h2>' +
            '</div>' +
            '<button type="button" class="hip-close-btn" onclick="' + closeActionJs + '">' + escHtml(closeLabel || '✕ 닫기') + '</button>' +
          '</div>' +

          '<div class="hip-meta-strip">' +
            '<div class="hip-tag-row">' +
              '<span class="hip-mini-tag">테마 · ' + escHtml(note.theme) + '</span>' +
              '<span class="hip-mini-tag kw">핵심 키워드 · ' + escHtml(note.keyword) + '</span>' +
            '</div>' +
            '<span>발행일 ' + fmtDotDate(note.publishDate) + ' · 다음 신규 글 ' + fmtDotDate(nextUpdateKst) + '</span>' +
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

          '<div class="hip-audit-footer">' +
            '<span>✔ [1차 의학·학술 팩트] · [2차 의료법 제56조 순수 건강정보] · [3차 일상 언어 순화] 검수 통과</span>' +
            '<span>2일 주기 자동 업데이트</span>' +
          '</div>' +
        '</article>'
      );
    }

    function renderOverviewDock() {
      isPopupOpen = false;
      quickNavButtons.forEach(btn => btn.classList.remove('active'));
      if (stageLabelEl) {
        stageLabelEl.textContent = '바른한의원 진료 살펴보기 · 부위를 선택해 주세요';
      }

      const cardsHtml = CLINIC_MENUS.map((m, idx) => {
        const notes = getPublishedNotes(m.id);
        const latest = notes[0];
        const previewTitle = latest ? ('"' + latest.title + '"') : m.menuSub;
        const featuredCls = idx === 0 ? ' featured-growth' : '';
        return (
          '<button type="button" class="clinic-menu-item' + featuredCls + '" onclick="window.selectBodyPart(\\'' + m.id + '\\', true)">' +
            '<div class="cmi-icon">' + m.icon + '</div>' +
            '<div class="cmi-body">' +
              '<div class="cmi-top-line">' +
                '<span class="cmi-title">' + escHtml(m.menuTitle) + '</span>' +
                '<span class="cmi-count-pill">' + (idx === 0 ? '2일 자동업데이트 · ' : '') + '누적 ' + notes.length + '편</span>' +
              '</div>' +
              '<div class="cmi-sub">[' + escHtml(m.partLabel) + '] · ' + escHtml(m.menuSub) + '</div>' +
              '<div class="cmi-preview-q">오늘의 글: ' + escHtml(previewTitle) + '</div>' +
            '</div>' +
          '</button>'
        );
      }).join('');

      contentBox.innerHTML =
        '<div class="clinic-explore-dock">' +
          '<div class="dock-header-row">' +
            '<div>' +
              '<div class="dock-eyebrow">● 3D INTERACTIVE HEALTH GUIDE</div>' +
              '<h1 class="dock-header-title">바른한의원 진료 살펴보기</h1>' +
              '<p class="dock-header-sub">아래 진료 부위(또는 좌측 3D 인체 포인트)를 클릭하시면 2일마다 자동 업데이트되는 순수 건강 정보와 Q&amp;A가 열립니다.</p>' +
            '</div>' +
            '<div class="dock-cycle-badge">' +
              '<div>🔄 2일 주기 신규 글 자동 업데이트</div>' +
              '<div style="font-weight:700;margin-top:2px;">기준일: ' + fmtDotDate(todayKst) + ' (다음 업데이트 ' + fmtDotDate(nextUpdateKst) + ')</div>' +
            '</div>' +
          '</div>' +
          '<div class="clinic-menu-grid">' + cardsHtml + '</div>' +
        '</div>';
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
      if (topAskLink) {
        topAskLink.setAttribute('href', 'ask-doctor.html?tab=qna&part=' + currentPartId);
      }

      let activeBodyHtml = '';

      if (currentMenuTab === 0) {
        // 메뉴 1: 프롬프트로 작성된 최신 글 단 1개 노출
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
                '<div style="font-size:0.78rem;font-weight:800;color:var(--green-primary);margin-bottom:4px;">[' + escHtml(menuMeta.partLabel) + '] · 1:1 건강 Q&amp;A</div>' +
                '<h2 style="font-size:1.28rem;font-weight:800;color:var(--black-ink);">무엇이든 물어보세요</h2>' +
                '<p style="font-size:0.88rem;color:#4B5563;margin-top:4px;">개인 프라이버시 보호를 위해 작성자 본인과 의료진만 내용을 열람할 수 있습니다.</p>' +
              '</div>' +
              '<div style="display:flex;align-items:center;gap:8px;">' +
                '<a href="ask-doctor.html?tab=qna&part=' + currentPartId + '" class="qna-write-btn">✏️ 1:1 질문 남기기 →</a>' +
                '<button type="button" class="ptc-back-btn" onclick="window.closeInfoPopup()">✕ 닫기</button>' +
              '</div>' +
            '</div>' +
            '<div style="display:flex;flex-direction:column;gap:10px;">' + qnaListHtml + '</div>' +
          '</div>';
      } else {
        // 메뉴 3: 더 궁금하세요? (프롬프트로 누적된 글 목록 & 클릭 시 상세 열람)
        const targetList = archiveScope === 'all' ? allNotes : partNotes;
        const pickedNote = selectedArchiveNoteId
          ? targetList.find(n => n.id === selectedArchiveNoteId) || allNotes.find(n => n.id === selectedArchiveNoteId)
          : null;

        if (pickedNote) {
          activeBodyHtml =
            '<div style="margin-bottom:4px;">' +
              '<button type="button" class="ptc-back-btn" onclick="window.backToArchiveList()">← 더 궁금하세요? 누적 글 목록으로 돌아가기</button>' +
            '</div>' +
            buildStandardNoteBoxHtml(pickedNote, 'window.backToArchiveList()', '✕ 목록으로');
        } else {
          const rowsHtml = targetList.map((n, idx) =>
            '<button type="button" class="archive-card-btn" onclick="window.openArchivedNote(\\'' + n.id + '\\')">' +
              '<div>' +
                '<div class="archive-card-tags">' +
                  '<span class="archive-date-pill">' + fmtDotDate(n.publishDate) + (idx === 0 && archiveScope === 'part' ? ' · 최신' : '') + '</span>' +
                  '<span class="archive-part-pill">[' + escHtml(n.partLabel) + ']</span>' +
                  '<span class="archive-theme-pill">' + escHtml(n.theme) + '</span>' +
                '</div>' +
                '<div class="archive-card-title">&ldquo;' + escHtml(n.title) + '&rdquo;</div>' +
              '</div>' +
              '<span class="archive-read-arrow">읽기 →</span>' +
            '</button>'
          ).join('');

          activeBodyHtml =
            '<div class="archive-menu-panel">' +
              '<div class="archive-filter-bar">' +
                '<div>' +
                  '<div style="font-size:0.78rem;font-weight:800;color:var(--amber-gold);margin-bottom:3px;">2일 주기 자동 누적 건강 아카이브</div>' +
                  '<h2 style="font-size:1.26rem;font-weight:800;color:var(--black-ink);">더 궁금하세요?</h2>' +
                '</div>' +
                '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">' +
                  '<div class="archive-scope-pills">' +
                    '<button type="button" class="archive-scope-btn' + (archiveScope === 'part' ? ' active' : '') + '" onclick="window.setArchiveScope(\\'part\\')">[' + escHtml(menuMeta.partLabel) + '] 누적 글 (' + partNotes.length + ')</button>' +
                    '<button type="button" class="archive-scope-btn' + (archiveScope === 'all' ? ' active' : '') + '" onclick="window.setArchiveScope(\\'all\\')">전체 부위 누적 글 (' + allNotes.length + ')</button>' +
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
          '<div class="popup-top-context-bar">' +
            '<div class="ptc-left">' +
              '<span>' + menuMeta.icon + '</span>' +
              '<span>바른한의원 진료 살펴보기 &rsaquo; ' + escHtml(menuMeta.menuTitle) + '</span>' +
            '</div>' +
            '<button type="button" class="ptc-back-btn" onclick="window.closeInfoPopup()">← 바른한의원 진료 살펴보기 전체 메뉴</button>' +
          '</div>' +

          '<nav class="three-menu-nav" role="tablist" aria-label="정보 팝업 3대 메뉴">' +
            '<button type="button" class="three-menu-btn' + (currentMenuTab === 0 ? ' active' : '') + '" onclick="window.switchPopupMenu(0)">' +
              '<span class="tmb-step">MENU 01 · 2일 주기 신규 글</span>' +
              '<span class="tmb-label">오늘의 건강 글</span>' +
            '</button>' +
            '<button type="button" class="three-menu-btn' + (currentMenuTab === 1 ? ' active' : '') + '" onclick="window.switchPopupMenu(1)">' +
              '<span class="tmb-step">MENU 02 · 1:1 질문 공간</span>' +
              '<span class="tmb-label">무엇이든 물어보세요</span>' +
            '</button>' +
            '<button type="button" class="three-menu-btn' + (currentMenuTab === 2 ? ' active' : '') + '" onclick="window.switchPopupMenu(2)">' +
              '<span class="tmb-step">MENU 03 · 누적 아카이브 (' + partNotes.length + '편)</span>' +
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
      renderOverviewDock();
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
          else renderOverviewDock();
        }
      } catch (e) {}
    }

    // 초기 화면 즉시 렌더링 (0ms)
    if (earlyParams.get('part')) {
      renderPopupPanel();
    } else {
      renderOverviewDock();
    }
    syncLiveServerNotes();

    setTimeout(() => {
      if (loaderOverlay) loaderOverlay.classList.add('hidden');
    }, 5500);

${WEBGL_PART_A}

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
console.log('✅ Generated 3D Body Explorer & 3-Menu Info Popup Panel (body-explorer.html):', outPath, '(' + html.length + ' bytes)');
