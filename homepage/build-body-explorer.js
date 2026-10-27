/**
 * 바른한의원 대전본점 · 풀스크린 3D 인체모형(우측 진료 살펴보기 + 하단 근육·신경·관절·혈관 4대 계통 모션 & 머리~발가락 해부학 핵심 요약) 빌더 (v5.6)
 *
 * [핵심 설계]
 * 1. 전체화면(100vw × 100vh) 3D 인체모형 & 내부 장기 기본 감춤 / 메뉴 클릭 시 활성
 * 2. 우측 소형 수직 메뉴 나열: 『바른한의원 진료 살펴보기』 9개 파트 + 3탭 정보 팝업 유지
 * 3. 하단 4대 해부학 계통 메뉴 추가: [근육 | 신경 | 관절 | 혈관]
 *    - 선택 시 해당 계통 전용 3D 해부 시각화 및 실시간 전신 인체 모션(수축·호흡 / 신경전도·반사 / 관절 ROM / 심박·종아리펌프)으로 즉시 전환
 *    - 해부학 교재 기준 머리(01 머리·얼굴·턱)에서 발가락(12 발목·발바닥·발가락)까지 전 부위 한글 핵심 요약 제공:
 *      [1. 기능·역할 / 2. 통증 / 3. 운동법]
 * 4. 화이트 · 블랙 · 골드(White · Black · Champagne Gold) 하이엔드 배색 일관 적용
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
const {
  ANATOMY_SYSTEM_TABS,
  ANATOMY_REGIONS_META,
  ANATOMY_SYSTEMS_CONTENT,
  auditAnatomySystemsData
} = require('./body-3d-anatomy-systems-data.js');

function escAttrServer(str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Editable Single-Source-of-Truth Menu Config (clinic-explore-menu-config.json)
const MENU_CONFIG_PATH = path.join(__dirname, 'clinic-explore-menu-config.json');
const MENU_CONFIG = fs.existsSync(MENU_CONFIG_PATH)
  ? JSON.parse(fs.readFileSync(MENU_CONFIG_PATH, 'utf8'))
  : {
      header: { title: '바른한의원 진료 살펴보기', subMode: 'auto2day', customSubText: '2일 주기 신규 글 업데이트' },
      items: CLINIC_EXPLORE_MENUS.map(m => ({ ...m, enabled: true, shortLabel: m.partLabel }))
    };

const ALL_CONFIG_ITEMS = Array.isArray(MENU_CONFIG.items) && MENU_CONFIG.items.length > 0
  ? MENU_CONFIG.items
  : CLINIC_EXPLORE_MENUS;
const ENABLED_MENUS = ALL_CONFIG_ITEMS.filter(m => m && m.enabled !== false);
if (ENABLED_MENUS.length === 0 && ALL_CONFIG_ITEMS.length > 0) {
  ENABLED_MENUS.push(ALL_CONFIG_ITEMS[0]);
}
const MENU_CFG_BY_ID = Object.fromEntries(ALL_CONFIG_ITEMS.map(m => [m.id, m]));

// 빌드 시점 보이지 않는 내부 3단계 자가 검수 게이트 실행
const FLATTENED_SEED_NOTES = [];
for (const [partId, episodes] of Object.entries(BODY_3D_AUTO_NOTES)) {
  const overridePartLabel = MENU_CFG_BY_ID[partId] && MENU_CFG_BY_ID[partId].partLabel;
  for (const ep of episodes) {
    const mergedEp = overridePartLabel ? { ...ep, partLabel: overridePartLabel } : ep;
    const res = auditNoteThreeStage(mergedEp);
    if (!res.passed) {
      throw new Error(`[3-Stage Self-Correction Gate Failed] ${ep.id}: ${res.errors.join(' | ')}`);
    }
    FLATTENED_SEED_NOTES.push({
      id: ep.id,
      partId,
      partLabel: mergedEp.partLabel,
      keyword: ep.keyword,
      publishDate: ep.publishDate,
      pinnedTop: false,
      title: ep.questionTitle,
      empathy: ep.empathyLines,
      truth: ep.truthLines,
      myth: ep.mythLines,
      check: ep.checkList
    });
  }
}

// 표(clinic-explore-menu-config.json)에서 직접 수정하거나 새로 추가한 대표 건강 글 반영
for (const m of ALL_CONFIG_ITEMS) {
  const isCustomRow = !BODY_3D_AUTO_NOTES[m.id];
  if ((m.leadNoteOverride || isCustomRow) && m.leadNote) {
    const candidate = {
      partLabel: m.partLabel || m.shortLabel || '주요 부위',
      keyword: m.leadNote.keyword || '',
      questionTitle: m.leadNote.questionTitle || '',
      empathyLines: Array.isArray(m.leadNote.empathyLines) ? m.leadNote.empathyLines : [],
      truthLines: Array.isArray(m.leadNote.truthLines) ? m.leadNote.truthLines : [],
      mythLines: Array.isArray(m.leadNote.mythLines) ? m.leadNote.mythLines : [],
      checkList: Array.isArray(m.leadNote.checkList) ? m.leadNote.checkList : []
    };
    const res = auditNoteThreeStage(candidate);
    if (!res.passed) {
      throw new Error(`[표 대표 건강 글 3단계 자가 검수 실패 - ${m.shortLabel || m.id}] ${res.errors.join(' | ')}`);
    }
    FLATTENED_SEED_NOTES.push({
      id: `${m.id}-table-lead`,
      partId: m.id,
      partLabel: candidate.partLabel,
      keyword: candidate.keyword,
      publishDate: '',
      pinnedTop: true,
      title: candidate.questionTitle,
      empathy: candidate.empathyLines,
      truth: candidate.truthLines,
      myth: candidate.mythLines,
      check: candidate.checkList
    });
  }
}

// 4대 해부학 계통(근육·신경·관절·혈관 × 12부위 = 48개 항목) 무결성 및 의료법 게이트 검증
const sysAudit = auditAnatomySystemsData();
if (!sysAudit.passed) {
  throw new Error(`[Anatomy Systems Audit Failed] ${sysAudit.errors.join(' | ')}`);
}

function buildBodyExplorerHtml() {
  const headerCfg = MENU_CONFIG.header || {};
  const rightHeaderTitle = headerCfg.title || '바른한의원 진료 살펴보기';
  const rightHeaderSubInitial = headerCfg.subMode === 'custom'
    ? (headerCfg.customSubText || '')
    : '2일 주기 신규 글 업데이트';
  const rightHeaderSubStyle = headerCfg.subMode === 'hidden' ? ' style="display:none;"' : '';

  const rightCompactButtonsHtml = ENABLED_MENUS.map((m, idx) => {
    const num = String(idx + 1).padStart(2, '0');
    const shortTitle = m.shortLabel || m.partLabel || m.id;
    return `<button type="button" class="vh-part-chip" data-part="${escAttrServer(m.id)}" title="${escAttrServer(m.menuTitle || shortTitle)} (${escAttrServer(m.partLabel || shortTitle)})"><span class="rcm-num">${num}</span><span class="rcm-label">${escAttrServer(shortTitle)}</span><span class="rcm-arrow">&rsaquo;</span></button>`;
  }).join('\n      ');

  const bottomSystemButtonsHtml = ANATOMY_SYSTEM_TABS.map(sys =>
    `<button type="button" class="stage-ctrl-btn sys-mode-btn" id="btn-sys-${sys.id}" data-sys="${sys.id}" onclick="window.selectAnatomySystem('${sys.id}')">${sys.label}</button>`
  ).join('\n    ');

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
  <title>바른한의원 대전본점 | 3D 인체모형 · 근육·신경·관절·혈관 &amp; 진료 살펴보기</title>
  <meta name="description" content="풀스크린 3D 인체모형으로 살펴보는 전신 근육·신경·관절·혈관 해부학 가이드(머리~발가락 기능·통증·운동법) 및 2일 주기 부위별 순수 건강 정보." />
  <link rel="canonical" href="https://www.bareunhaniwon.com/body-explorer/" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@600;700;800&family=Pretendard:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": "3D 인체모형 · 근육·신경·관절·혈관 해부 가이드 & 바른한의원 진료 살펴보기",
    "url": "https://www.bareunhaniwon.com/body-explorer/",
    "inLanguage": "ko-KR",
    "description": "머리에서 발가락까지 근육·신경·관절·혈관의 기능·통증·운동법 요약과 부위별 순수 건강 정보 공간입니다."
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

    /* 4. TOP STATUS & BOTTOM 3D CONTROLS + 4-SYSTEM ANATOMY DOCK (WHITE · BLACK · GOLD) */
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
      padding: 5px 8px;
      border-radius: 999px;
      background: var(--lux-white-glass);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1.5px solid var(--lux-gold);
      box-shadow: 0 12px 30px rgba(13, 13, 15, 0.13);
      transition: left 0.28s ease;
    }
    @media (min-width: 961px) {
      body.popup-open-mode .stage-bottom-bar {
        left: 30%;
      }
      body.popup-open-mode .stage-top-badge {
        left: 30%;
      }
    }
    .stage-bar-sep {
      width: 1px;
      height: 18px;
      background: var(--lux-gold-border);
      margin: 0 2px;
      flex-shrink: 0;
    }
    .stage-ctrl-btn {
      appearance: none;
      border: 1px solid transparent;
      background: transparent;
      color: var(--lux-sub);
      font-family: 'Pretendard', sans-serif;
      font-size: 0.74rem;
      font-weight: 800;
      padding: 6px 12px;
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
    .stage-ctrl-btn.sys-mode-btn {
      color: var(--lux-black);
      background: var(--lux-ivory);
      border: 1px solid var(--lux-gold-border);
      padding: 6px 14px;
      font-size: 0.76rem;
      letter-spacing: -0.01em;
    }
    .stage-ctrl-btn.sys-mode-btn:hover {
      background: var(--lux-gold-tint);
      border-color: var(--lux-gold);
      transform: translateY(-1px);
    }
    .stage-ctrl-btn.sys-mode-btn.active {
      background: var(--lux-black);
      border-color: var(--lux-gold);
      color: var(--lux-gold-bright);
      box-shadow: 0 4px 14px rgba(13, 13, 15, 0.24);
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

    /* System 12 Head-to-Toe Numbered 3D Markers */
    .hotspot-pulse-ring.sys-ring {
      width: 22px;
      height: 22px;
      background: rgba(13, 13, 15, 0.88);
      border: 1.5px solid var(--lux-gold-bright);
    }
    .sys-hotspot-num {
      font-size: 0.62rem;
      font-weight: 800;
      color: var(--lux-gold-bright);
      line-height: 1;
      font-variant-numeric: tabular-nums;
    }
    .sys-hotspot-label {
      padding: 2px 7px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.94);
      border: 1px solid var(--lux-gold-border);
      color: var(--lux-black);
      font-size: 0.66rem;
      font-weight: 800;
      white-space: nowrap;
      box-shadow: 0 3px 10px rgba(13, 13, 15, 0.12);
      opacity: 0;
      transform: translateX(-3px);
      transition: all 0.16s ease;
      pointer-events: none;
    }
    .system-region-hotspot:hover .sys-hotspot-label,
    .system-region-hotspot.active .sys-hotspot-label {
      opacity: 1;
      transform: translateX(0);
    }
    .system-region-hotspot.active .hotspot-pulse-ring.sys-ring {
      background: var(--lux-gold);
      border-color: var(--lux-black);
      transform: scale(1.18);
    }
    .system-region-hotspot.active .sys-hotspot-num {
      color: var(--lux-black);
    }
    .system-region-hotspot.active .sys-hotspot-label {
      background: var(--lux-black);
      border-color: var(--lux-gold);
      color: var(--lux-gold-bright);
    }

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

    /* 6. FLOATING WHITE · BLACK · GOLD INFO & ANATOMY SYSTEM POPUP PANEL */
    .explore-floating-popup {
      position: fixed;
      right: 208px;
      top: 60px;
      max-height: calc(100vh - 80px);
      max-height: calc(100dvh - 80px);
      width: min(520px, calc(100vw - 228px));
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

    /* THE 3 CORE CLINIC MENUS TAB BAR & 4-SYSTEM SWITCHER BAR (WHITE · BLACK · GOLD) */
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
    .four-system-nav {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 5px;
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
      font-size: 0.63rem;
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

    /* CLEAN OUTPUT BOX FOR MENU 1, ARCHIVE READER & 4-SYSTEM ANATOMY PANEL */
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
      font-size: 0.74rem;
      font-weight: 800;
      white-space: nowrap;
    }
    .hip-motion-pill {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 3px 9px;
      border-radius: 999px;
      background: rgba(229, 198, 126, 0.14);
      border: 1px solid rgba(229, 198, 126, 0.55);
      color: var(--lux-gold-bright);
      font-size: 0.69rem;
      font-weight: 700;
      white-space: nowrap;
    }
    .hip-motion-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--lux-gold-bright);
      animation: pulseGold 1.4s ease-in-out infinite;
    }
    @keyframes pulseGold {
      0%, 100% { opacity: 0.45; transform: scale(0.9); }
      50% { opacity: 1; transform: scale(1.2); }
    }
    .hip-divider {
      color: rgba(229, 198, 126, 0.50);
      font-weight: 600;
      font-size: 0.82rem;
    }
    .hip-question-title {
      font-family: 'Noto Serif KR', serif;
      font-size: 1.00rem;
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

    /* 7. HEAD-TO-TOE 12-REGION ANATOMY EXPLORER STYLES (WHITE · BLACK · GOLD) */
    .sys-region-bar {
      padding: 11px 14px 10px;
      background: var(--lux-ivory);
      border-bottom: 1px solid var(--lux-border-soft);
      display: flex;
      flex-direction: column;
      gap: 7px;
    }
    .sys-region-bar-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      font-size: 0.72rem;
      font-weight: 800;
      color: var(--lux-sub);
    }
    .sys-region-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
    }
    .sys-reg-chip {
      appearance: none;
      border: 1px solid var(--lux-border-soft);
      background: var(--lux-white);
      color: var(--lux-ink);
      font-family: 'Pretendard', sans-serif;
      font-size: 0.71rem;
      font-weight: 800;
      padding: 5px 8px;
      border-radius: 7px;
      cursor: pointer;
      transition: all 0.15s ease;
      white-space: nowrap;
    }
    .sys-reg-chip:hover {
      border-color: var(--lux-gold);
      background: var(--lux-gold-tint);
    }
    .sys-reg-chip.active {
      background: var(--lux-black);
      border-color: var(--lux-gold);
      color: var(--lux-gold-bright);
    }

    .sys-cards-body {
      padding: 12px 14px 15px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      background: var(--lux-white);
    }
    .sys-region-card {
      border-radius: 12px;
      border: 1px solid var(--lux-gold-border);
      background: var(--lux-ivory);
      overflow: hidden;
      transition: border-color 0.16s ease, box-shadow 0.16s ease;
    }
    .sys-region-card.focused {
      border: 1.5px solid var(--lux-gold);
      background: #FFFEFA;
      box-shadow: 0 10px 24px rgba(13, 13, 15, 0.08);
    }
    .src-head {
      padding: 10px 13px;
      background: var(--lux-black);
      color: var(--lux-white);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      border-bottom: 1px solid rgba(197, 160, 89, 0.45);
    }
    .src-head-left {
      display: flex;
      align-items: center;
      gap: 7px;
      min-width: 0;
    }
    .src-num-badge {
      padding: 2px 7px;
      border-radius: 5px;
      background: linear-gradient(135deg, #E7C983 0%, #C59E50 100%);
      color: var(--lux-black);
      font-size: 0.69rem;
      font-weight: 800;
      font-variant-numeric: tabular-nums;
      flex-shrink: 0;
    }
    .src-region-title {
      font-size: 0.88rem;
      font-weight: 800;
      color: var(--lux-white);
      letter-spacing: -0.02em;
    }
    .src-zoom-btn {
      appearance: none;
      border: 1px solid rgba(229, 198, 126, 0.55);
      background: rgba(255, 255, 255, 0.07);
      color: var(--lux-gold-bright);
      font-family: 'Pretendard', sans-serif;
      font-size: 0.69rem;
      font-weight: 800;
      padding: 4px 9px;
      border-radius: 999px;
      cursor: pointer;
      white-space: nowrap;
      flex-shrink: 0;
      transition: all 0.15s ease;
    }
    .src-zoom-btn:hover {
      background: var(--lux-gold);
      color: var(--lux-black);
    }
    .src-structures-bar {
      padding: 7px 13px;
      background: var(--lux-gold-tint);
      border-bottom: 1px solid var(--lux-border-soft);
      font-size: 0.74rem;
      font-weight: 700;
      color: var(--lux-ink);
      line-height: 1.42;
      word-break: keep-all;
    }
    .src-structures-bar strong {
      color: var(--lux-gold-deep);
      font-weight: 800;
      margin-right: 4px;
    }
    .src-points {
      padding: 10px 12px 11px;
      display: flex;
      flex-direction: column;
      gap: 7px;
    }
    .src-point-row {
      padding: 8px 10px;
      border-radius: 9px;
      background: var(--lux-white);
      border: 1px solid var(--lux-border-soft);
      display: flex;
      flex-direction: column;
      gap: 3px;
    }
    .src-point-row.pt-exercise {
      border-left: 3px solid var(--lux-gold);
      background: #FFFEFA;
    }
    .src-point-tag {
      font-size: 0.74rem;
      font-weight: 800;
      color: var(--lux-black);
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }
    .src-point-tag .pt-num {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: var(--lux-black);
      color: var(--lux-gold-bright);
      font-size: 0.64rem;
      font-weight: 800;
    }
    .src-point-desc {
      margin: 0 !important;
      font-size: 0.81rem;
      font-weight: 600;
      color: #262522;
      line-height: 1.5;
      word-break: keep-all;
    }
    .sys-step-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 6px;
      padding-top: 2px;
    }

    /* CLINIC NOTE SECTIONS */
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

    /* MENU 3: 더 궁금하세요? 누적 아카이브 */
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

    @media (max-width: 1180px) {
      .stage-top-badge { display: none; }
    }

    @media (max-width: 960px) {
      .vibrant-header { padding: 10px 12px; }
      .vh-brand-title { font-size: 0.76rem; }
      .vh-pill-btn { padding: 5px 10px; font-size: 0.71rem; }
      .right-compact-menu {
        right: 10px;
        width: 146px;
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
        bottom: 10px;
        left: 10px;
        right: 10px;
        transform: none;
        border-radius: 14px;
        flex-wrap: wrap;
        justify-content: center;
        gap: 4px;
        padding: 6px;
      }
      .stage-bar-sep { display: none; }
      .stage-ctrl-btn,
      .stage-ctrl-btn.sys-mode-btn {
        padding: 5px 9px;
        font-size: 0.70rem;
      }
      .explore-floating-popup {
        left: 10px;
        right: 10px;
        top: auto;
        bottom: 10px;
        width: auto;
        max-height: 75dvh;
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
      <h1 class="vh-brand-title" style="margin:0;font-size:inherit;line-height:inherit;">바른한의원 대전본점 · 3D 인체모형</h1>
    </a>

    <div class="vh-right-actions">
      <a href="ask-doctor.html?tab=qna" class="vh-pill-btn" id="vh-ask-doctor-link">무엇이든 물어보세요</a>
      <a href="story-3d.html" class="vh-pill-btn">&larr; 메인 홈</a>
    </div>
  </header>

  <!-- CENTER STATUS PILL -->
  <div class="stage-top-badge">
    <span class="stage-top-dot"></span>
    <span class="stage-top-text" id="stage-active-part-label">하단 [근육·신경·관절·혈관] 또는 우측 진료 살펴보기 메뉴를 선택해 보세요</span>
  </div>

  <!-- COMPACT RIGHT-SIDE VERTICAL MENU (우측 소형 나열 · WHITE · BLACK · GOLD · EDITABLE CONFIG DRIVEN) -->
  <aside class="right-compact-menu" id="vh-part-quicknav" aria-label="${escAttrServer(rightHeaderTitle)} 우측 소형 메뉴">
    <div class="rcm-head">
      <span class="rcm-head-title" id="rcm-head-title">${escAttrServer(rightHeaderTitle)}</span>
      <span class="rcm-head-sub" id="rcm-cycle-sub"${rightHeaderSubStyle}>${escAttrServer(rightHeaderSubInitial)}</span>
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

  <!-- BOTTOM-CENTER 3D CONTROLS + 4-SYSTEM ANATOMY DOCK (근육 · 신경 · 관절 · 혈관) -->
  <div class="stage-bottom-bar" role="toolbar" aria-label="3D 인체 체형 및 근육·신경·관절·혈관 해부 계통 선택">
    <button type="button" class="stage-ctrl-btn active" id="btn-gender-male" onclick="window.setDonginGender('male')">남성 체형</button>
    <button type="button" class="stage-ctrl-btn" id="btn-gender-female" onclick="window.setDonginGender('female')">여성 체형</button>
    <span class="stage-bar-sep" aria-hidden="true"></span>
    ${bottomSystemButtonsHtml}
    <span class="stage-bar-sep" aria-hidden="true"></span>
    <button type="button" class="stage-ctrl-btn reset-btn" id="btn-cam-reset" onclick="window.closeInfoPopup()">&#8634; 전체 보기</button>
  </div>

  <!-- FLOATING WHITE · BLACK · GOLD INFO & ANATOMY SYSTEM POPUP PANEL -->
  <section class="explore-floating-popup" id="encyclopedia-scroll-panel" aria-live="polite">
    <div id="encyclopedia-dynamic-content"></div>
  </section>

  <!-- SEMANTIC 3D ANATOMY & CLINIC SUMMARY DIRECTORY (SSR INDEXABLE + ACCESSIBLE) -->
  <details class="seo-anatomy-summary-drawer" style="position:fixed;left:16px;bottom:14px;z-index:95;max-width:340px;font-family:'Pretendard',sans-serif;">
    <summary style="list-style:none;cursor:pointer;display:inline-flex;align-items:center;gap:6px;padding:6px 12px;border-radius:999px;background:rgba(255,255,255,0.92);border:1px solid rgba(197,160,89,0.45);color:#0D0D0F;font-size:0.74rem;font-weight:700;box-shadow:0 4px 14px rgba(0,0,0,0.08);">
      <span>📖 해부학 가이드 · 진료안내</span>
    </summary>
    <div style="margin-top:8px;padding:14px 16px;border-radius:14px;background:rgba(255,255,255,0.97);border:1px solid rgba(13,13,15,0.12);box-shadow:0 12px 32px rgba(0,0,0,0.14);max-height:52vh;overflow-y:auto;color:#171614;font-size:0.78rem;line-height:1.6;">
      <h2 style="margin:0 0 8px;font-size:0.88rem;font-weight:800;color:#0D0D0F;">전신 4대 해부 계통 및 9대 부위별 건강 가이드</h2>
      <p style="margin:0 0 10px;">바른한의원 대전본점 풀스크린 3D 인체모형 포털은 전신 근육계, 자율·말초 신경계, 척추·사지 관절계, 심혈관 순환계의 입체적 상호작용을 실시간 3D 그래픽 모션으로 시각화하고 해외 SCI 의학 학술지 근거 기반 생활 건강 정보를 제공합니다.</p>
      <h3 style="margin:8px 0 4px;font-size:0.8rem;font-weight:700;">부위별 주요 건강 탐색 주제</h3>
      <ul style="margin:0 0 10px;padding-left:16px;">
        <li><strong>무릎 성장판 · 소아성장</strong>: 서파수면 성장호르몬 생리, 소아비만 체지방 대사 관리, 구강호흡·비염 점막 면역과 키 성장의 연관성 안내.</li>
        <li><strong>경추 · 두피열 · 탈모</strong>: 거북목(전방두부자세)에 따른 두피 미세혈류 저하, 상열하한 열조절 및 남성·여성·원형탈모·지루성두피염 두피 환경 관리.</li>
        <li><strong>요추 · 골반 · 추나 생체역학</strong>: 추간판 압력 분산, 골반 경사 불균형 교정, 만성 요통·좌골신경통 완화를 위한 코어 안정화 원칙.</li>
        <li><strong>뇌 · 심혈관 · 만성피로</strong>: 저등급 전신 만성염증, 브레인 포그, 수면-각성 일주기 리듬 회복과 신경 보호 영양 생리.</li>
        <li><strong>자율신경 · 미주신경 · 어지럼증</strong>: 심박변이도(HRV) 균형, 기립성 어지럼증·두통·불면 완화를 위한 호흡 및 생활 루틴.</li>
        <li><strong>위장 · 장-뇌 축 · 대사 해독</strong>: 기능성 소화불량, 위 배출 지연, 내장지방 갈색지방 열생산 활성화 및 식습관 교정.</li>
        <li><strong>여성 자궁 · 남성 전립선 골반 순환</strong>: 골반강 미세혈류 개선, 야간뇨·배뇨 불편 완화 및 생애주기별 비뇨·생식기 건강 관리.</li>
      </ul>
      <h3 style="margin:8px 0 4px;font-size:0.8rem;font-weight:700;">바른한의원 대전본점 오시는 길 · 진료시간</h3>
      <p style="margin:0;">주소: 대전광역시 대덕구 비래동로7번길 1, 2층 (비래동, 우편번호 34417) · 대표전화: <a href="tel:010-5631-1275" style="color:#0D0D0F;font-weight:700;">010-5631-1275</a> · 대표원장: 안정위<br>진료시간: 평일(월~금) 09:00~19:00 / 토요일·공휴일 09:00~14:00 / 일요일 휴진</p>
    </div>
  </details>

  <script>
  (async function() {
    const BODY_PARTS_DATA = ${JSON.stringify(BODY_PARTS)};
    const CLINIC_HEADER_CFG = ${JSON.stringify(MENU_CONFIG.header || {})};
    const CLINIC_MENUS = ${JSON.stringify(ENABLED_MENUS)};
    const SEED_NOTES = ${JSON.stringify(FLATTENED_SEED_NOTES)};
    const FORBIDDEN_PROMO = ${JSON.stringify(FORBIDDEN_PROMO_WORDS)};
    const FORBIDDEN_JARGON = ${JSON.stringify(FORBIDDEN_JARGON_WORDS)};
    const SYSTEM_TABS = ${JSON.stringify(ANATOMY_SYSTEM_TABS)};
    const ANATOMY_REGIONS = ${JSON.stringify(ANATOMY_REGIONS_META)};
    const SYSTEM_CONTENT = ${JSON.stringify(ANATOMY_SYSTEMS_CONTENT)};

    const earlyParams = new URLSearchParams(window.location.search);
    if (earlyParams.get('tab') === 'blog' || earlyParams.get('blog') === '1') {
      window.location.replace('ask-doctor.html?tab=blog');
      return;
    }

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
      return String(d || todayKst || '').replace(/-/g, '.');
    }

    function applyRightHeaderSubText() {
      if (!cycleSubEl) return;
      if (CLINIC_HEADER_CFG && CLINIC_HEADER_CFG.subMode === 'hidden') {
        cycleSubEl.style.display = 'none';
      } else if (CLINIC_HEADER_CFG && CLINIC_HEADER_CFG.subMode === 'custom') {
        cycleSubEl.style.display = '';
        cycleSubEl.textContent = CLINIC_HEADER_CFG.customSubText || '';
      } else {
        cycleSubEl.style.display = '';
        cycleSubEl.textContent = '2일 주기 · 다음 ' + fmtDotDate(nextUpdateKst);
      }
    }

    function escHtml(str) {
      return String(str == null ? '' : str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }

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
    let currentPartId = earlyParams.get('part') || (CLINIC_MENUS[0] ? CLINIC_MENUS[0].id : 'knee');
    let currentMenuTab = 0; // 0: 오늘의 건강 글, 1: 무엇이든 물어보세요, 2: 더 궁금하세요?
    let archiveScope = 'part';
    let selectedArchiveNoteId = null;
    let qnaCacheByPart = {};

    // 4-System Bottom Menu State ('muscle' | 'nerve' | 'joint' | 'vessel' | null)
    let currentSystemMode = null;
    let currentSystemRegionId = 'all';

    const popupDrawer = document.getElementById('encyclopedia-scroll-panel');
    const contentBox = document.getElementById('encyclopedia-dynamic-content');
    const quickNavButtons = document.querySelectorAll('#vh-part-quicknav .vh-part-chip');
    const bottomSysButtons = document.querySelectorAll('.stage-bottom-bar .sys-mode-btn');
    const stageLabelEl = document.getElementById('stage-active-part-label');
    const cycleSubEl = document.getElementById('rcm-cycle-sub');
    const stageEl = document.getElementById('vibrant-3d-stage');
    const canvas = document.getElementById('vibrant-body-canvas');
    const hotspotLayer = document.getElementById('hotspot-overlay-layer');
    const loaderOverlay = document.getElementById('dongin-loader-overlay');
    const topAskLink = document.getElementById('vh-ask-doctor-link');

    function syncBottomSystemButtons() {
      bottomSysButtons.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-sys') === currentSystemMode);
      });
    }

    function getMenuMeta(id) {
      return CLINIC_MENUS.find(m => m.id === id) || CLINIC_MENUS[0];
    }

    function getSystemMeta(sysId) {
      return SYSTEM_TABS.find(s => s.id === sysId) || SYSTEM_TABS[0];
    }

    function normalizeDynamicNote(raw) {
      if (!raw || typeof raw !== 'object') return null;
      const m = CLINIC_MENUS.find(x => x.id === raw.partId);
      return {
        id: raw.id,
        partId: raw.partId || 'knee',
        partLabel: (m && m.partLabel) || raw.partLabel || '무릎 성장판',
        keyword: raw.keyword || '',
        publishDate: raw.publishDate || todayKst,
        pinnedTop: Boolean(raw.pinnedTop),
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
        if (!n.pinnedTop && n.publishDate && n.publishDate > todayKst) return false;
        if (partFilter && partFilter !== 'all' && n.partId !== partFilter) return false;
        return true;
      });
      list.sort((a, b) => {
        if (Boolean(b.pinnedTop) !== Boolean(a.pinnedTop)) return b.pinnedTop ? 1 : -1;
        const da = a.publishDate || todayKst;
        const db = b.publishDate || todayKst;
        if (db !== da) return db.localeCompare(da);
        return String(b.id).localeCompare(String(a.id));
      });
      return list;
    }

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

    // Build Head-to-Toe Region Card HTML (1. 기능·역할 / 2. 통증 / 3. 운동법)
    function buildSystemRegionCardHtml(reg, item, isSingleFocused) {
      const btnHtml = isSingleFocused
        ? '<button type="button" class="src-zoom-btn" onclick="window.selectSystemRegion(\\'all\\', true)">전신 모션 보기</button>'
        : '<button type="button" class="src-zoom-btn" onclick="window.selectSystemRegion(\\'' + reg.id + '\\', true)">3D 부위 확대 &rsaquo;</button>';
      return (
        '<section class="sys-region-card' + (isSingleFocused ? ' focused' : '') + '" data-reg-card="' + reg.id + '">' +
          '<div class="src-head">' +
            '<div class="src-head-left">' +
              '<span class="src-num-badge">' + escHtml(reg.num) + '</span>' +
              '<h3 class="src-region-title">' + escHtml(reg.regionLabel) + '</h3>' +
            '</div>' +
            btnHtml +
          '</div>' +
          '<div class="src-structures-bar"><strong>해부학 기준 ·</strong>' + escHtml(item.structures) + '</div>' +
          '<div class="src-points">' +
            '<div class="src-point-row">' +
              '<div class="src-point-tag"><span class="pt-num">1</span>기능 · 역할</div>' +
              '<p class="src-point-desc">' + escHtml(item.role) + '</p>' +
            '</div>' +
            '<div class="src-point-row">' +
              '<div class="src-point-tag"><span class="pt-num">2</span>통증</div>' +
              '<p class="src-point-desc">' + escHtml(item.pain) + '</p>' +
            '</div>' +
            '<div class="src-point-row pt-exercise">' +
              '<div class="src-point-tag"><span class="pt-num">3</span>운동법</div>' +
              '<p class="src-point-desc">' + escHtml(item.exercise) + '</p>' +
            '</div>' +
          '</div>' +
        '</section>'
      );
    }

    let applyCameraFraming = function() {};

    function renderIdleState() {
      isPopupOpen = false;
      currentSystemMode = null;
      currentSystemRegionId = 'all';
      document.body.classList.remove('popup-open-mode');
      if (popupDrawer) popupDrawer.classList.remove('open');
      quickNavButtons.forEach(btn => btn.classList.remove('active'));
      syncBottomSystemButtons();
      if (stageLabelEl) {
        stageLabelEl.textContent = '하단 [근육·신경·관절·혈관] 또는 우측 진료 살펴보기 메뉴를 선택해 보세요';
      }
      applyRightHeaderSubText();
      applyCameraFraming();
    }

    function renderSystemAnatomyPanel() {
      if (!currentSystemMode) return;
      isPopupOpen = true;
      document.body.classList.add('popup-open-mode');
      if (popupDrawer) popupDrawer.classList.add('open');
      quickNavButtons.forEach(btn => btn.classList.remove('active'));
      syncBottomSystemButtons();

      const sysMeta = getSystemMeta(currentSystemMode);
      const sysDataMap = SYSTEM_CONTENT[currentSystemMode] || {};
      const activeReg = currentSystemRegionId !== 'all'
        ? ANATOMY_REGIONS.find(r => r.id === currentSystemRegionId)
        : null;

      if (stageLabelEl) {
        stageLabelEl.textContent = activeReg
          ? '[' + sysMeta.label + ' 계통 · ' + activeReg.num + ' ' + activeReg.regionLabel + '] · ' + sysMeta.motionBadge
          : '[' + sysMeta.fullTitle + '] · ' + sysMeta.motionBadge;
      }
      applyCameraFraming();

      const topTabsHtml = SYSTEM_TABS.map(t =>
        '<button type="button" class="three-menu-btn' + (t.id === currentSystemMode ? ' active' : '') + '" onclick="window.selectAnatomySystem(\\'' + t.id + '\\')">' +
          '<span class="tmb-step">해부 계통</span>' +
          '<span class="tmb-label">' + escHtml(t.label) + '</span>' +
        '</button>'
      ).join('');

      const regionChipsHtml =
        '<button type="button" class="sys-reg-chip' + (currentSystemRegionId === 'all' ? ' active' : '') + '" onclick="window.selectSystemRegion(\\'all\\', true)">전체 12부위</button>' +
        ANATOMY_REGIONS.map(r =>
          '<button type="button" class="sys-reg-chip' + (currentSystemRegionId === r.id ? ' active' : '') + '" onclick="window.selectSystemRegion(\\'' + r.id + '\\', true)">' +
            escHtml(r.num + ' ' + r.shortLabel) +
          '</button>'
        ).join('');

      let cardsHtml = '';
      if (activeReg) {
        const regIdx = ANATOMY_REGIONS.findIndex(r => r.id === activeReg.id);
        const prevReg = ANATOMY_REGIONS[(regIdx - 1 + ANATOMY_REGIONS.length) % ANATOMY_REGIONS.length];
        const nextReg = ANATOMY_REGIONS[(regIdx + 1) % ANATOMY_REGIONS.length];
        const item = sysDataMap[activeReg.id];
        cardsHtml =
          buildSystemRegionCardHtml(activeReg, item, true) +
          '<div class="sys-step-footer">' +
            '<button type="button" class="ptc-back-btn" onclick="window.selectSystemRegion(\\'' + prevReg.id + '\\', true)">&larr; ' + escHtml(prevReg.num + ' ' + prevReg.shortLabel) + '</button>' +
            '<button type="button" class="ptc-back-btn" onclick="window.selectSystemRegion(\\'all\\', true)">머리~발가락 전체 보기</button>' +
            '<button type="button" class="ptc-back-btn" onclick="window.selectSystemRegion(\\'' + nextReg.id + '\\', true)">' + escHtml(nextReg.num + ' ' + nextReg.shortLabel) + ' &rarr;</button>' +
          '</div>';
      } else {
        cardsHtml = ANATOMY_REGIONS.map(r => buildSystemRegionCardHtml(r, sysDataMap[r.id], false)).join('');
      }

      contentBox.innerHTML =
        '<div class="popup-shell-wrap">' +
          '<nav class="four-system-nav" role="tablist" aria-label="4대 인체 해부학 계통 전환">' +
            topTabsHtml +
          '</nav>' +
          '<article class="health-info-popup-box" aria-label="' + escHtml(sysMeta.fullTitle) + ' 가이드">' +
            '<div class="hip-header">' +
              '<div style="display:flex;flex-direction:column;gap:6px;min-width:0;">' +
                '<div class="hip-header-title-wrap">' +
                  '<span class="hip-part-bracket">[' + escHtml(sysMeta.label) + ' 계통]</span>' +
                  '<span class="hip-motion-pill"><span class="hip-motion-dot"></span>' + escHtml(sysMeta.motionBadge) + '</span>' +
                '</div>' +
                '<h2 class="hip-question-title">머리에서 발가락까지 · 기능 · 통증 · 운동법 핵심 요약</h2>' +
              '</div>' +
              '<button type="button" class="hip-close-btn" onclick="window.closeInfoPopup()">✕ 닫기</button>' +
            '</div>' +
            '<div class="sys-region-bar">' +
              '<div class="sys-region-bar-top">' +
                '<span>해부학 교재 기준 12구간 (클릭 시 3D 부위 확대)</span>' +
                '<span style="color:#967128;">머리 &rarr; 발가락</span>' +
              '</div>' +
              '<div class="sys-region-grid">' + regionChipsHtml + '</div>' +
            '</div>' +
            '<div class="sys-cards-body">' + cardsHtml + '</div>' +
          '</article>' +
        '</div>';

      if (popupDrawer) popupDrawer.scrollTop = 0;
    }

    async function loadQnaForPart(partId) {
      try {
        const res = await fetch('/wp-json/bareun/v1/qna?part=' + encodeURIComponent(partId), { cache: 'no-store' });
        if (!res.ok) return;
        const data = await res.json();
        if (data && Array.isArray(data.items)) {
          qnaCacheByPart[partId] = data.items;
          const curMeta = getMenuMeta(currentPartId);
          const curQnaKey = (curMeta && curMeta.qnaPartId) || currentPartId;
          if (isPopupOpen && !currentSystemMode && currentMenuTab === 1 && curQnaKey === partId) {
            renderPopupPanel();
          }
        }
      } catch (e) {}
    }

    function renderPopupPanel() {
      currentSystemMode = null;
      currentSystemRegionId = 'all';
      syncBottomSystemButtons();
      isPopupOpen = true;
      document.body.classList.add('popup-open-mode');
      if (popupDrawer) popupDrawer.classList.add('open');
      const menuMeta = getMenuMeta(currentPartId);
      const qnaPartKey = menuMeta.qnaPartId || currentPartId;
      const partNotes = getPublishedNotes(currentPartId);
      const allNotes = getPublishedNotes('all');
      const latestNote = partNotes[0] || allNotes[0];

      quickNavButtons.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-part') === currentPartId);
      });
      if (stageLabelEl) {
        stageLabelEl.textContent = '[' + menuMeta.partLabel + '] · ' + menuMeta.menuTitle;
      }
      applyRightHeaderSubText();
      if (topAskLink) {
        topAskLink.setAttribute('href', 'ask-doctor.html?tab=qna&part=' + encodeURIComponent(qnaPartKey));
      }
      applyCameraFraming();

      let activeBodyHtml = '';

      if (currentMenuTab === 0) {
        activeBodyHtml = latestNote
          ? buildStandardNoteBoxHtml(latestNote, 'window.closeInfoPopup()', '✕ 닫기')
          : '<div class="archive-menu-panel">등록된 건강 정보가 없습니다.</div>';
      } else if (currentMenuTab === 1) {
        const items = qnaCacheByPart[qnaPartKey];
        if (!items) {
          loadQnaForPart(qnaPartKey);
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
                '<a href="ask-doctor.html?tab=qna&part=' + encodeURIComponent(qnaPartKey) + '" class="qna-write-btn">1:1 질문 남기기 &rarr;</a>' +
                '<button type="button" class="ptc-back-btn" onclick="window.closeInfoPopup()">✕ 닫기</button>' +
              '</div>' +
            '</div>' +
            '<div style="display:flex;flex-direction:column;gap:8px;">' + qnaListHtml + '</div>' +
          '</div>';
      } else {
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

    // 하단 [근육 · 신경 · 관절 · 혈관] 계통 선택 핸들러
    window.selectAnatomySystem = function(sysId, keepRegion) {
      const valid = SYSTEM_TABS.some(s => s.id === sysId);
      if (!valid) return;
      currentSystemMode = sysId;
      if (!keepRegion) currentSystemRegionId = 'all';
      selectedArchiveNoteId = null;
      renderSystemAnatomyPanel();
      if (typeof majorHotspotNodes !== 'undefined' && Array.isArray(majorHotspotNodes)) {
        majorHotspotNodes.forEach(h => h.dom.classList.remove('active'));
      }
      if (currentSystemRegionId === 'all') {
        if (typeof window.flyDonginCameraTo === 'function') {
          window.flyDonginCameraTo([0.0, 2.28, 5.65], [0.0, 2.26, 0.0], true);
        }
      }
      if (typeof window.syncDonginAnatomy === 'function') {
        window.syncDonginAnatomy();
      }
    };

    // 머리~발가락 12개 부위 선택 핸들러 (3D 카메라 이동 + 골드 포커스 하이라이트)
    window.selectSystemRegion = function(regId, shouldFly) {
      if (!currentSystemMode) return;
      currentSystemRegionId = regId || 'all';
      renderSystemAnatomyPanel();
      if (shouldFly && typeof window.flyDonginCameraTo === 'function') {
        if (currentSystemRegionId === 'all') {
          window.flyDonginCameraTo([0.0, 2.28, 5.65], [0.0, 2.26, 0.0], true);
        } else {
          const reg = ANATOMY_REGIONS.find(r => r.id === currentSystemRegionId);
          if (reg) {
            window.flyDonginCameraTo(reg.camPos, reg.camTarget, false);
          }
        }
      }
      if (typeof window.syncDonginAnatomy === 'function') {
        window.syncDonginAnatomy();
      }
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
          if (isPopupOpen) {
            if (currentSystemMode) renderSystemAnatomyPanel();
            else renderPopupPanel();
          } else {
            renderIdleState();
          }
        }
      } catch (e) {}
    }

    if (earlyParams.get('system')) {
      currentSystemMode = earlyParams.get('system');
      renderSystemAnatomyPanel();
    } else if (earlyParams.get('part')) {
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
      currentSystemMode = null;
      currentSystemRegionId = 'all';
      syncBottomSystemButtons();
      const menuMeta = getMenuMeta(partId);
      currentPartId = menuMeta ? menuMeta.id : partId;
      currentMenuTab = 0;
      archiveScope = 'part';
      selectedArchiveNoteId = null;
      renderPopupPanel();

      if (menuMeta && menuMeta.autoGender === 'female') {
        window.setDonginGender('female');
      } else if (menuMeta && menuMeta.autoGender === 'male') {
        window.setDonginGender('male');
      }

      if (shouldFlyCamera && menuMeta && Array.isArray(menuMeta.camPos) && Array.isArray(menuMeta.camTarget)) {
        isOverviewCamera = Boolean(menuMeta.isOverview);
        camGoalPos.set(menuMeta.camPos[0], menuMeta.camPos[1], menuMeta.camPos[2]);
        camGoalTarget.set(menuMeta.camTarget[0], menuMeta.camTarget[1], menuMeta.camTarget[2]);
        isCameraFlying = true;
      }

      majorHotspotNodes.forEach(h => {
        h.dom.classList.toggle('active', h.id === currentPartId);
      });

      updateAnatomyHighlight();
    };

${WEBGL_PART_B}

    // Live Preview Bridge for Clinic Menu Editable Table Studio (clinic-menu-editor.html)
    window.addEventListener('message', (ev) => {
      const msg = ev && ev.data;
      if (!msg || typeof msg !== 'object') return;
      if (msg.type === 'BAREUN_PREVIEW_SELECT_PART' && msg.partId) {
        window.selectBodyPart(msg.partId, true);
      } else if (msg.type === 'BAREUN_PREVIEW_RESET') {
        window.closeInfoPopup();
      }
    });

    const urlSys = earlyParams.get('system');
    const urlPart = earlyParams.get('part');
    if (urlSys && SYSTEM_TABS.some(s => s.id === urlSys)) {
      window.selectAnatomySystem(urlSys);
    } else if (urlPart) {
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
console.log('✅ Generated Fullscreen 3D Body Explorer (Editable Menu Table Config + 4-System Motions v5.7):', outPath, '(' + html.length + ' bytes)');
