/**
 * 바른한의원 대전본점 · 3D 백과사전 오늘의 건강 글 & 무엇이든 물어보세요 단독 페이지 빌더 (v6.0)
 *
 * [핵심 설계]
 * 1. 워드프레스에 72개의 개별 글 페이지를 생성하지 않고, 단 1개의 단독 페이지(/ask-doctor/ 및 /health-notes/)에서
 *    3D 백과사전 건강글(9대 부위 × 8편 = 72편) 전체를 깔끔하게 노출 및 검색 유입(SEO · AEO · GEO 통합) 처리
 * 2. 3D 백과사전 팝업과 100% 동일한 화이트 · 블랙 · 샴페인골드 하이엔드 3탭 카드 UI를 단독 풀페이지로 구현:
 *    - [01 · 최신 글 1편 | 오늘의 건강 글]: 최신글 붉은 포인트 배지 + 실시간 DB 실제 조회수(+1) + 1~4단 구조 + AEO 요약 & GEO 팩트 시트 + 심층 임상 칼럼 3선(실제 조회수 BEST 3)
 *    - [02 · 1:1 질문 | 무엇이든 물어보세요]: 전 질환 통합게시판 + 키워드 검색 + 비밀글 + 페이지 이동 없이 현재 창 바로 작성 + 답글 등록 시 이메일·카톡 알림 전송
 *    - [03 · 누적 8편 | 더 궁금하세요?]: 부위별/전체 누적 건강글 아카이브(실제 조회수 반영)
 */

const fs = require('fs');
const path = require('path');

const {
  CLINIC_EXPLORE_MENUS,
  BODY_3D_AUTO_NOTES,
  FORBIDDEN_PROMO_WORDS,
  FORBIDDEN_JARGON_WORDS,
  auditNoteThreeStage,
  normalizeNoteSections,
  auditCustomLeadNote
} = require('./body-3d-auto-notes-data.js');

function escServer(str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

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

const LOCAL_DB_PATH = path.join(__dirname, 'private-qna-db.json');
let SAVED_NOTE_VIEWS = {};
if (fs.existsSync(LOCAL_DB_PATH)) {
  try {
    const parsedDb = JSON.parse(fs.readFileSync(LOCAL_DB_PATH, 'utf8'));
    if (parsedDb && parsedDb.noteViews && typeof parsedDb.noteViews === 'object') {
      SAVED_NOTE_VIEWS = parsedDb.noteViews;
    }
  } catch (e) {}
}

const FLATTENED_SEED_NOTES = [];
for (const [partId, episodes] of Object.entries(BODY_3D_AUTO_NOTES)) {
  const overridePartLabel = MENU_CFG_BY_ID[partId] && MENU_CFG_BY_ID[partId].partLabel;
  episodes.forEach((ep) => {
    const mergedEp = overridePartLabel ? { ...ep, partLabel: overridePartLabel } : ep;
    const res = auditNoteThreeStage(mergedEp);
    if (!res.passed) {
      throw new Error(`[3-Stage Self-Correction Gate Failed] ${ep.id}: ${res.errors.join(' | ')}`);
    }
    FLATTENED_SEED_NOTES.push({
      id: ep.id,
      partId,
      partLabel: mergedEp.partLabel,
      theme: ep.theme || '',
      keyword: ep.keyword,
      academicBasis: ep.academicBasis || '국제 SCI 의학저널 및 통합생리학 가이드라인',
      publishDate: ep.publishDate,
      views: Number(SAVED_NOTE_VIEWS[ep.id]) || 0,
      pinnedTop: false,
      title: ep.questionTitle,
      empathy: ep.empathyLines,
      truth: ep.truthLines,
      myth: ep.mythLines,
      check: ep.checkList
    });
  });
}

for (const m of ALL_CONFIG_ITEMS) {
  const isCustomRow = !BODY_3D_AUTO_NOTES[m.id];
  if ((m.leadNoteOverride || isCustomRow) && m.leadNote) {
    const candidate = {
      partLabel: m.partLabel || m.shortLabel || '주요 부위',
      badgeOverride: m.leadNote.badgeOverride || '',
      subTitle: m.leadNote.subTitle || '',
      strictQuestionMark: Boolean(m.leadNote.strictQuestionMark),
      keyword: m.leadNote.keyword || '',
      questionTitle: m.leadNote.questionTitle || '',
      sections: Array.isArray(m.leadNote.sections) ? m.leadNote.sections : null,
      empathyLines: Array.isArray(m.leadNote.empathyLines) ? m.leadNote.empathyLines : [],
      truthLines: Array.isArray(m.leadNote.truthLines) ? m.leadNote.truthLines : [],
      mythLines: Array.isArray(m.leadNote.mythLines) ? m.leadNote.mythLines : [],
      checkList: Array.isArray(m.leadNote.checkList) ? m.leadNote.checkList : []
    };
    const res = auditCustomLeadNote(candidate);
    if (!res.passed) {
      throw new Error(`[표 대표 건강 글 검수 확인 - ${m.shortLabel || m.id}] ${res.errors.join(' | ')}`);
    }
    const normSecs = normalizeNoteSections(candidate, m.popupDesign && m.popupDesign.defaultSectionHeadings);
    const existingIdx = FLATTENED_SEED_NOTES.findIndex(
      x => x.partId === m.id && (x.title === candidate.questionTitle || x.id === `${m.id}-20261027`)
    );
    if (existingIdx >= 0) {
      FLATTENED_SEED_NOTES[existingIdx] = {
        ...FLATTENED_SEED_NOTES[existingIdx],
        partLabel: candidate.partLabel,
        badgeOverride: candidate.badgeOverride,
        subTitle: candidate.subTitle,
        keyword: candidate.keyword,
        pinnedTop: false,
        isCustomLead: true,
        title: candidate.questionTitle,
        sections: normSecs,
        empathy: candidate.empathyLines,
        truth: candidate.truthLines,
        myth: candidate.mythLines,
        check: candidate.checkList
      };
    } else {
      FLATTENED_SEED_NOTES.push({
        id: `${m.id}-table-lead`,
        partId: m.id,
        partLabel: candidate.partLabel,
        badgeOverride: candidate.badgeOverride,
        subTitle: candidate.subTitle,
        keyword: candidate.keyword,
        publishDate: '2026-10-27',
        views: Number(SAVED_NOTE_VIEWS[`${m.id}-table-lead`]) || 0,
        pinnedTop: true,
        isCustomLead: true,
        title: candidate.questionTitle,
        sections: normSecs,
        empathy: candidate.empathyLines,
        truth: candidate.truthLines,
        myth: candidate.mythLines,
        check: candidate.checkList
      });
    }
  }
}

function buildStandaloneHealthNotesHtml() {
  const canonicalHub = 'https://www.bareunhaniwon.com/ask-doctor/';

  const latestNineNotes = ENABLED_MENUS.map(m => {
    const pNotes = FLATTENED_SEED_NOTES.filter(n => n.partId === m.id);
    return pNotes[pNotes.length - 1];
  }).filter(Boolean);

  // 단 1개의 단독 페이지에서 SEO(구글·네이버) + AEO(즉답 스니펫·음성검색) + GEO(ChatGPT·Perplexity·Gemini) 통합 노출 스키마
  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalWebPage',
        '@id': canonicalHub + '#webpage',
        url: canonicalHub,
        name: '3D 백과사전 오늘의 건강 글(72선) & 1:1 통합 건강 Q&A | 바른한의원 대전본점',
        headline: '바른한의원 대전본점 3D 백과사전 오늘의 건강 글 단독 페이지 & 전 질환 1:1 질문 센터',
        inLanguage: 'ko-KR',
        description: '척추·골반, 위·장, 무릎 성장판, 간·해독, 자율신경, 하복부·대사, 두피·모낭, 원기·면역, 전립선·방광 등 9대 부위별 오늘의 건강 글(72편)과 해외 SCI 학술지 근거 의학 정보, 전 질환 통합 1:1 질문 게시판을 한눈에 볼 수 있는 단독 페이지입니다.',
        isPartOf: { '@id': 'https://www.bareunhaniwon.com/#website' },
        reviewedBy: {
          '@type': 'Person',
          '@id': 'https://www.bareunhaniwon.com/director/#physician',
          name: '안정위',
          jobTitle: '바른한의원 대전본점 대표원장 (한의사)'
        },
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['.aeo-direct-answer', '.geo-fact-table', '.hip-question-title', '.seo-standalone-note-item']
        }
      },
      {
        '@type': 'FAQPage',
        '@id': canonicalHub + '#faq',
        mainEntity: latestNineNotes.map(n => ({
          '@type': 'Question',
          name: `[${n.partLabel}] ${n.title}`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `${(n.truth || []).join(' ')} 올바른 관리: ${(n.myth && n.myth[1]) || ''} 1분 자가 체크: ${(n.check || []).join(' / ')} (참고 학술지: ${n.academicBasis || '국제 SCI 학술지'})`
          }
        }))
      },
      {
        '@type': 'ItemList',
        '@id': canonicalHub + '#health-notes-72',
        name: '바른한의원 3D 백과사전 오늘의 건강 글 72선 단독 아카이브',
        numberOfItems: FLATTENED_SEED_NOTES.length,
        itemListElement: FLATTENED_SEED_NOTES.map((n, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: `[${n.partLabel} · ${n.keyword}] ${n.title}`,
          url: `${canonicalHub}?part=${n.partId}&note=${n.id}`
        }))
      }
    ]
  };

  const partChipsServerHtml = ENABLED_MENUS.map((m, idx) => {
    const num = String(idx + 1).padStart(2, '0');
    const label = m.shortLabel || m.partLabel || m.id;
    return `<button type="button" class="sp-part-chip" data-part="${escServer(m.id)}" onclick="window.selectStandalonePart('${escServer(m.id)}')"><span class="sp-chip-num">${num}</span><span>${escServer(label)}</span></button>`;
  }).join('\n        ');

  // 단일 페이지 내 72편 전체 SSR 시맨틱 아카이브 (구글·네이버 크롤러 및 ChatGPT·Perplexity·Gemini 직접 색인용)
  const ssrAllNotesArticlesHtml = FLATTENED_SEED_NOTES.map(n => {
    const deepHref = `?part=${escServer(n.partId)}&amp;note=${escServer(n.id)}`;
    const canonicalNoteUrl = `${canonicalHub}?part=${escServer(n.partId)}&amp;note=${escServer(n.id)}`;
    return `<article id="note-${escServer(n.id)}" class="seo-standalone-note-item" itemscope itemtype="https://schema.org/MedicalWebPage">
          <div class="ssni-head">
            <div class="ssni-badges">
              <span class="ssni-part">[${escServer(n.partLabel)}]</span>
              <span class="ssni-kw">핵심 키워드: ${escServer(n.keyword)}</span>
              <time datetime="${escServer(n.publishDate)}" class="ssni-date">${escServer(n.publishDate)}</time>
              <span data-note-view-id="${escServer(n.id)}" class="ssni-views">실제 조회수 ${Number(n.views || 0).toLocaleString()}회</span>
            </div>
            <h3 itemprop="headline" class="ssni-title">
              <a href="${deepHref}" onclick="window.openNoteById('${escServer(n.id)}'); return false;">&ldquo;${escServer(n.title)}&rdquo;</a>
            </h3>
          </div>
          <p itemprop="description" class="aeo-direct-answer ssni-aeo">
            <strong>⚡ AEO 핵심 의학 답변:</strong> ${escServer((n.truth || []).join(' '))}
            <strong>올바른 생활 교정:</strong> ${escServer((n.myth && n.myth[1]) || '')}
          </p>
          <div class="ssni-meta-grid">
            <div><strong>🎒 일상 불편 증상:</strong> ${escServer((n.empathy || []).join(' '))}</div>
            <div><strong>🔍 1분 자가 체크:</strong> ${escServer((n.check || []).join(' / '))}</div>
            <div><strong>📚 해외 SCI 학술 근거(GEO):</strong> ${escServer(n.academicBasis || '')} · <strong>감수:</strong> 바른한의원 대전본점 안정위 대표원장</div>
          </div>
          <div class="ssni-foot">
            <button type="button" class="ssni-read-btn" onclick="window.openNoteById('${escServer(n.id)}')">단독 카드 본문으로 크게 열람하기 &uarr;</button>
            <a href="${canonicalNoteUrl}" class="ssni-permalink">고유 링크(#${escServer(n.id)})</a>
          </div>
        </article>`;
  }).join('\n        ');

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
  <title>3D 백과사전 오늘의 건강 글 &amp; 무엇이든 물어보세요 (단독 페이지) | 바른한의원 대전본점</title>
  <meta name="description" content="척추·골반, 위·장, 무릎 성장판, 간·해독, 자율신경, 하복부·대사, 두피·모낭, 원기·면역, 전립선·방광 등 9대 부위별 오늘의 건강 글(72편)과 전 질환 통합 1:1 질문 게시판을 한눈에 볼 수 있는 단독 페이지입니다." />
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
  <link rel="canonical" href="${canonicalHub}" />
  <link rel="alternate" type="text/plain" title="AI / LLM Knowledge Index (GEO)" href="https://www.bareunhaniwon.com/llms.txt" />
  <link rel="alternate" type="text/plain" title="AI / LLM Full Medical Corpus (GEO)" href="https://www.bareunhaniwon.com/llms-full.txt" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@600;700;800&family=Pretendard:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <script type="application/ld+json">${JSON.stringify(schemaGraph)}</script>
  <style>
    :root {
      --lux-white: #FFFFFF;
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
      --lux-shadow: 0 22px 50px rgba(13, 13, 15, 0.12);
      --lux-shadow-sm: 0 8px 22px rgba(13, 13, 15, 0.06);
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      width: 100%;
      min-height: 100vh;
      background: radial-gradient(circle at 50% 0%, #FFFEFA 0%, #F5EFE2 65%, #ECE3D0 100%);
      color: var(--lux-ink);
      font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
      -webkit-font-smoothing: antialiased;
      line-height: 1.6;
    }
    a { color: inherit; text-decoration: none; }

    /* TOP LUXURY NAVIGATION BAR */
    .sp-topbar {
      position: sticky;
      top: 0;
      z-index: 100;
      background: rgba(255, 255, 255, 0.96);
      backdrop-filter: blur(14px);
      border-bottom: 1.5px solid var(--lux-gold-border);
      box-shadow: 0 6px 20px rgba(13, 13, 15, 0.06);
      padding: 12px 20px;
    }
    .sp-topbar-inner {
      max-width: 980px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
    }
    .sp-brand {
      display: inline-flex;
      align-items: center;
      gap: 10px;
    }
    .sp-brand-mark {
      width: 32px;
      height: 32px;
      border-radius: 9px;
      background: var(--lux-black);
      border: 1px solid var(--lux-gold);
      color: var(--lux-gold-bright);
      font-weight: 800;
      font-size: 0.78rem;
      display: grid;
      place-items: center;
      flex-shrink: 0;
    }
    .sp-brand-text {
      display: flex;
      flex-direction: column;
    }
    .sp-brand-sub {
      font-size: 0.68rem;
      font-weight: 800;
      color: var(--lux-gold-deep);
      letter-spacing: 0.02em;
    }
    .sp-brand-title {
      font-size: 0.96rem;
      font-weight: 800;
      color: var(--lux-black);
      letter-spacing: -0.02em;
    }
    .sp-top-actions {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    .sp-nav-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 14px;
      border-radius: 999px;
      background: var(--lux-white);
      border: 1px solid var(--lux-gold-border);
      color: var(--lux-ink);
      font-size: 0.78rem;
      font-weight: 800;
      cursor: pointer;
      transition: all 0.16s ease;
    }
    .sp-nav-btn:hover {
      background: var(--lux-black);
      border-color: var(--lux-gold);
      color: var(--lux-gold-bright);
    }
    .sp-nav-btn.primary {
      background: var(--lux-black);
      border-color: var(--lux-gold);
      color: var(--lux-gold-bright);
    }

    /* MAIN STANDALONE CONTAINER */
    .sp-main-wrap {
      max-width: 980px;
      margin: 0 auto;
      padding: 24px 16px 72px;
      display: flex;
      flex-direction: column;
      gap: 18px;
    }

    /* 9 BODY PARTS SELECTOR BAR */
    .sp-parts-bar {
      background: rgba(255, 255, 255, 0.96);
      border: 1.5px solid var(--lux-gold-border);
      border-radius: 18px;
      padding: 14px 16px;
      box-shadow: var(--lux-shadow-sm);
    }
    .sp-parts-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      margin-bottom: 10px;
      flex-wrap: wrap;
    }
    .sp-parts-title {
      font-size: 0.84rem;
      font-weight: 800;
      color: var(--lux-black);
      display: flex;
      align-items: center;
      gap: 7px;
    }
    .sp-parts-sub {
      font-size: 0.74rem;
      font-weight: 700;
      color: var(--lux-gold-deep);
    }
    .sp-parts-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .sp-part-chip {
      appearance: none;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 7px 12px;
      border-radius: 10px;
      background: var(--lux-ivory);
      border: 1px solid var(--lux-border-soft);
      color: var(--lux-ink);
      font-family: 'Pretendard', sans-serif;
      font-size: 0.8rem;
      font-weight: 800;
      cursor: pointer;
      transition: all 0.16s ease;
    }
    .sp-part-chip:hover {
      border-color: var(--lux-gold);
      background: var(--lux-gold-tint);
    }
    .sp-part-chip.active {
      background: var(--lux-black);
      border-color: var(--lux-gold);
      color: var(--lux-white);
      box-shadow: 0 6px 16px rgba(13, 13, 15, 0.15);
    }
    .sp-chip-num {
      font-size: 0.68rem;
      font-weight: 800;
      padding: 1px 5px;
      border-radius: 5px;
      background: rgba(197, 160, 89, 0.18);
      color: var(--lux-gold-deep);
    }
    .sp-part-chip.active .sp-chip-num {
      background: var(--lux-gold);
      color: var(--lux-black);
    }

    /* 3-TAB LUXURY NAVIGATION (EXACT MATCH TO 3D ENCYCLOPEDIA CARD) */
    .three-menu-nav {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      padding: 8px;
      border-radius: 18px;
      background: rgba(255, 255, 255, 0.98);
      border: 1.5px solid var(--lux-gold-border);
      box-shadow: var(--lux-shadow-sm);
    }
    .three-menu-btn {
      appearance: none;
      border: 1px solid transparent;
      background: transparent;
      color: var(--lux-sub);
      font-family: 'Pretendard', sans-serif;
      padding: 12px 10px;
      border-radius: 12px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 3px;
      transition: all 0.16s ease;
    }
    .three-menu-btn:hover {
      background: var(--lux-gold-tint);
      color: var(--lux-black);
    }
    .three-menu-btn.active {
      background: var(--lux-black);
      color: var(--lux-white);
      border-color: var(--lux-gold);
      box-shadow: 0 8px 20px rgba(13, 13, 15, 0.18);
    }
    .tmb-step {
      font-size: 0.72rem;
      font-weight: 800;
      color: var(--lux-gold-deep);
      letter-spacing: 0.01em;
    }
    .three-menu-btn.active .tmb-step {
      color: var(--lux-gold-bright);
    }
    .tmb-label {
      font-size: 0.95rem;
      font-weight: 800;
      letter-spacing: -0.02em;
    }

    /* LATEST POST RED POINT BADGE */
    .latest-red-badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 3px 9px;
      border-radius: 999px;
      background: linear-gradient(135deg, #E11D48 0%, #BE123C 100%);
      color: #FFFFFF !important;
      font-size: 0.7rem;
      font-weight: 800;
      letter-spacing: 0.01em;
      box-shadow: 0 3px 10px rgba(225, 29, 72, 0.32);
    }
    .latest-red-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #FFE4E6;
      display: inline-block;
    }

    /* STANDALONE HEALTH INFO CARD (EXACT MATCH TO ATTACHMENT 1) */
    .health-info-popup-box {
      border-radius: 20px;
      background: var(--lux-white);
      border: 1.5px solid var(--lux-gold);
      box-shadow: var(--lux-shadow);
      overflow: hidden;
      color: var(--lux-ink);
    }
    .hip-header {
      padding: 22px 24px;
      background: var(--lux-black);
      color: var(--lux-white);
      border-bottom: 1.5px solid rgba(197, 160, 89, 0.55);
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 14px;
    }
    .hip-header-main {
      display: flex;
      flex-direction: column;
      gap: 10px;
      min-width: 0;
      flex: 1;
    }
    .hip-header-title-wrap {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
    }
    .hip-part-bracket {
      display: inline-flex;
      align-items: center;
      padding: 4px 10px;
      border-radius: 7px;
      background: rgba(197, 160, 89, 0.18);
      border: 1px solid rgba(229, 198, 126, 0.55);
      color: var(--lux-gold-bright);
      font-size: 0.8rem;
      font-weight: 800;
    }
    .hip-question-title {
      width: 100%;
      margin: 2px 0 0;
      font-family: 'Noto Serif KR', serif;
      font-size: clamp(1.18rem, 2.2vw, 1.48rem);
      font-weight: 800;
      color: var(--lux-white);
      line-height: 1.44;
      letter-spacing: -0.02em;
      word-break: keep-all;
    }
    .hip-sections {
      padding: 20px 22px 24px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      background: var(--lux-white);
    }
    .hip-sec-card {
      padding: 16px 18px;
      border-radius: 14px;
      background: var(--lux-ivory);
      border: 1px solid var(--lux-border-soft);
    }
    .hip-sec-card.sec-highlight {
      background: #FFFDF7;
      border: 1.5px solid var(--lux-gold);
      border-left: 4px solid var(--lux-gold);
    }
    .hip-sec-heading {
      font-size: 0.95rem;
      font-weight: 800;
      color: var(--lux-black);
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 7px;
    }
    .hip-two-lines {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .hip-line {
      margin: 0;
      font-size: 0.92rem;
      font-weight: 600;
      color: #262522;
      line-height: 1.62;
      word-break: keep-all;
    }
    .hip-bullet-row {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      font-size: 0.92rem;
      font-weight: 700;
      color: #141416;
      line-height: 1.62;
      word-break: keep-all;
    }
    .hip-bullet-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--lux-gold-deep);
      margin-top: 8px;
      flex-shrink: 0;
    }
    .hip-num-row {
      display: flex;
      align-items: flex-start;
      gap: 9px;
      font-size: 0.92rem;
      font-weight: 700;
      color: #1F1E1B;
      line-height: 1.6;
      word-break: keep-all;
    }
    .hip-num-chip {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 2px 7px;
      border-radius: 6px;
      background: #E7C983;
      color: #0D0D0F;
      font-size: 0.72rem;
      font-weight: 800;
      flex-shrink: 0;
      margin-top: 2px;
    }
    .hip-check-item {
      display: flex;
      align-items: flex-start;
      gap: 9px;
      padding: 11px 13px;
      border-radius: 10px;
      background: var(--lux-white);
      border: 1px solid #E5DEC9;
      font-size: 0.9rem;
      font-weight: 700;
      color: var(--lux-ink);
      line-height: 1.55;
      cursor: pointer;
    }
    .hip-check-item input[type="checkbox"] {
      width: 16px;
      height: 16px;
      margin-top: 3px;
      accent-color: var(--lux-black);
      flex-shrink: 0;
    }

    /* AEO & GEO SUMMARY BLOCK INSIDE STANDALONE CARD */
    .sp-aeo-geo-box {
      margin-top: 4px;
      padding: 16px 18px;
      border-radius: 14px;
      background: var(--lux-gold-tint);
      border: 1px solid var(--lux-gold-border);
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .geo-fact-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.82rem;
      background: var(--lux-white);
      border-radius: 10px;
      overflow: hidden;
    }
    .geo-fact-table th {
      width: 26%;
      padding: 8px 12px;
      background: #F7F3E8;
      border-bottom: 1px solid #EAE3D5;
      text-align: left;
      font-weight: 800;
      color: var(--lux-black);
    }
    .geo-fact-table td {
      padding: 8px 12px;
      border-bottom: 1px solid #EAE3D5;
      font-weight: 600;
      color: #262522;
    }

    /* Q&A PANEL & ARCHIVE PANEL */
    .qna-menu-panel, .archive-menu-panel {
      border-radius: 20px;
      background: var(--lux-white);
      border: 1.5px solid var(--lux-gold);
      box-shadow: var(--lux-shadow);
      padding: 22px 24px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .qna-panel-top, .archive-filter-bar {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;
      padding-bottom: 14px;
      border-bottom: 1px solid var(--lux-border-soft);
      flex-wrap: wrap;
    }
    .qna-write-btn {
      appearance: none;
      border: 1px solid var(--lux-gold);
      background: var(--lux-black);
      color: var(--lux-gold-bright);
      font-family: 'Pretendard', sans-serif;
      font-size: 0.84rem;
      font-weight: 800;
      padding: 10px 16px;
      border-radius: 999px;
      cursor: pointer;
    }
    .qna-inline-composer {
      padding: 16px;
      border-radius: 14px;
      background: #FAF5EA;
      border: 1.5px solid var(--lux-gold);
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .qic-row-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }
    .qic-input, .qic-select, .qic-textarea {
      width: 100%;
      padding: 10px 12px;
      border-radius: 9px;
      border: 1px solid #DFC99B;
      background: #FFFFFF;
      font-family: 'Pretendard', sans-serif;
      font-size: 0.86rem;
      font-weight: 600;
      color: #141416;
    }
    .qic-submit-btn {
      padding: 12px 16px;
      border-radius: 10px;
      border: 1px solid var(--lux-gold);
      background: var(--lux-black);
      color: var(--lux-gold-bright);
      font-family: 'Pretendard', sans-serif;
      font-size: 0.88rem;
      font-weight: 800;
      cursor: pointer;
    }
    .qna-item-row {
      padding: 14px 16px;
      border-radius: 12px;
      background: var(--lux-ivory);
      border: 1px solid var(--lux-border-soft);
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .qna-item-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      font-size: 0.78rem;
      font-weight: 700;
      color: var(--lux-sub);
    }
    .qna-status-badge {
      padding: 3px 9px;
      border-radius: 999px;
      font-size: 0.72rem;
      font-weight: 800;
    }
    .qna-status-badge.answered {
      background: var(--lux-black);
      color: var(--lux-gold-bright);
    }
    .qna-status-badge.waiting {
      background: var(--lux-gold-tint);
      color: var(--lux-gold-deep);
      border: 1px solid var(--lux-gold-border);
    }
    .qna-item-title {
      font-size: 0.94rem;
      font-weight: 800;
      color: var(--lux-ink);
    }

    .archive-scope-pills {
      display: inline-flex;
      border-radius: 10px;
      background: var(--lux-ivory);
      padding: 3px;
      border: 1px solid var(--lux-border-soft);
    }
    .archive-scope-btn {
      border: none;
      background: transparent;
      padding: 6px 12px;
      border-radius: 8px;
      font-size: 0.78rem;
      font-weight: 800;
      color: var(--lux-sub);
      cursor: pointer;
    }
    .archive-scope-btn.active {
      background: var(--lux-black);
      color: var(--lux-gold-bright);
    }
    .archive-list {
      display: flex;
      flex-direction: column;
      gap: 9px;
    }
    .archive-card-btn {
      width: 100%;
      text-align: left;
      padding: 14px 16px;
      border-radius: 13px;
      background: var(--lux-ivory);
      border: 1px solid var(--lux-border-soft);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      cursor: pointer;
      transition: all 0.16s ease;
    }
    .archive-card-btn:hover {
      border-color: var(--lux-gold);
      background: var(--lux-gold-tint);
    }
    .archive-card-tags {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
      margin-bottom: 5px;
    }
    .archive-date-pill {
      padding: 2px 8px;
      border-radius: 6px;
      background: #F0EAE1;
      color: #57534E;
      font-size: 0.72rem;
      font-weight: 800;
    }
    .archive-date-pill.is-latest-red {
      background: #E11D48;
      color: #FFFFFF;
    }
    .archive-part-pill {
      font-size: 0.76rem;
      font-weight: 800;
      color: var(--lux-gold-deep);
    }
    .archive-card-title {
      font-size: 0.95rem;
      font-weight: 800;
      color: var(--lux-black);
    }
    .archive-read-arrow {
      font-size: 0.8rem;
      font-weight: 800;
      color: var(--lux-gold-deep);
      flex-shrink: 0;
    }

    /* SINGLE-PAGE ALL 72 HEALTH NOTES SEO · AEO · GEO DIRECTORY */
    .seo-all-notes-hub {
      margin-top: 12px;
      background: rgba(255, 255, 255, 0.96);
      border: 1.5px solid var(--lux-gold-border);
      border-radius: 18px;
      padding: 18px 20px;
      box-shadow: var(--lux-shadow-sm);
    }
    .seo-all-notes-hub summary {
      cursor: pointer;
      font-size: 0.92rem;
      font-weight: 800;
      color: var(--lux-black);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }
    .seo-standalone-note-item {
      padding: 14px 16px;
      margin-top: 12px;
      border-radius: 12px;
      background: var(--lux-ivory);
      border: 1px solid var(--lux-border-soft);
    }
    .ssni-badges {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 7px;
      margin-bottom: 6px;
      font-size: 0.74rem;
      font-weight: 800;
    }
    .ssni-part { color: var(--lux-gold-deep); }
    .ssni-kw { color: #BE123C; }
    .ssni-date, .ssni-views { color: var(--lux-sub); }
    .ssni-title {
      font-size: 0.96rem;
      font-weight: 800;
      color: var(--lux-black);
      margin-bottom: 6px;
    }
    .ssni-aeo {
      font-size: 0.84rem;
      color: #262522;
      margin-bottom: 6px;
      line-height: 1.58;
    }
    .ssni-meta-grid {
      font-size: 0.78rem;
      color: var(--lux-sub);
      display: flex;
      flex-direction: column;
      gap: 3px;
      margin-bottom: 8px;
    }
    .ssni-foot {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }
    .ssni-read-btn {
      padding: 5px 11px;
      border-radius: 7px;
      border: 1px solid var(--lux-gold);
      background: var(--lux-black);
      color: var(--lux-gold-bright);
      font-size: 0.74rem;
      font-weight: 800;
      cursor: pointer;
    }
    .ssni-permalink {
      font-size: 0.72rem;
      font-weight: 700;
      color: var(--lux-gold-deep);
    }

    @media (max-width: 640px) {
      .qic-row-2 { grid-template-columns: 1fr; }
      .hip-header { padding: 18px 16px; }
      .hip-sections { padding: 16px 14px; }
      .tmb-label { font-size: 0.82rem; }
    }
  </style>
</head>
<body>

  <!-- TOP LUXURY STANDALONE HEADER -->
  <header class="sp-topbar">
    <div class="sp-topbar-inner">
      <a href="story-3d.html" class="sp-brand">
        <div class="sp-brand-mark">3D</div>
        <div class="sp-brand-text">
          <span class="sp-brand-sub">BAREUN MEDICAL ENCYCLOPEDIA · STANDALONE HUB</span>
          <h1 class="sp-brand-title">바른한의원 3D 백과사전 · 오늘의 건강 글 단독 페이지</h1>
        </div>
      </a>
      <div class="sp-top-actions">
        <a href="body-explorer.html" id="sp-link-3d-model" class="sp-nav-btn">🧊 3D 인체모형과 함께 보기</a>
        <button type="button" class="sp-nav-btn primary" onclick="window.openQnaTabDirect()">✍️ 무엇이든 물어보세요</button>
        <a href="story-3d.html" class="sp-nav-btn">&larr; 메인 홈</a>
      </div>
    </div>
  </header>

  <main class="sp-main-wrap">
    <!-- 9대 질환 부위 선택 바 -->
    <section class="sp-parts-bar" aria-label="9대 진료 부위 선택">
      <div class="sp-parts-head">
        <div class="sp-parts-title">
          <span>📍 부위별 오늘의 건강 글 선택</span>
        </div>
        <span class="sp-parts-sub">부위를 선택하면 해당 부위의 최신 건강글 · 조회수 BEST 3 · 누적 칼럼이 즉시 전환됩니다</span>
      </div>
      <div class="sp-parts-grid" id="sp-parts-chip-container">
        ${partChipsServerHtml}
      </div>
    </section>

    <!-- 3D 백과사전 건강글 3탭 단독 컨테이너 -->
    <div id="standalone-dynamic-container"></div>

    <!-- 단 1개의 단독 페이지에서 72편 전체를 검색엔진(SEO·AEO·GEO)에 노출시키는 통합 시맨틱 아카이브 -->
    <details class="seo-all-notes-hub">
      <summary>
        <span>📚 9대 부위 · 오늘의 건강 글 72선 전체 통합 색인 (SEO · AEO · GEO 학술 아카이브)</span>
        <span style="font-size:0.76rem;color:#967128;">클릭하여 전체 펼치기 &#9662;</span>
      </summary>
      <div style="margin-top:10px;">
        ${ssrAllNotesArticlesHtml}
      </div>
    </details>
  </main>

  <script>
  (function() {
    const CLINIC_MENUS = ${JSON.stringify(ENABLED_MENUS)};
    const SEED_NOTES = ${JSON.stringify(FLATTENED_SEED_NOTES)};
    const FORBIDDEN_PROMO = ${JSON.stringify(FORBIDDEN_PROMO_WORDS)};
    const FORBIDDEN_JARGON = ${JSON.stringify(FORBIDDEN_JARGON_WORDS)};

    function escHtml(str) {
      return String(str == null ? '' : str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }

    function fmtDotDate(d) {
      return String(d || '').replace(/-/g, '.');
    }

    function getTodayKst() {
      try {
        return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Seoul' }).format(new Date());
      } catch (e) {
        return new Date(Date.now() + 9 * 3600 * 1000).toISOString().slice(0, 10);
      }
    }

    function passThreeStageGate(note) {
      if (!note || !note.title) return false;
      const all = [
        note.title,
        ...(note.empathy || []),
        ...(note.truth || []),
        ...(note.myth || []),
        ...(note.check || [])
      ].join(' ');
      for (const w of FORBIDDEN_PROMO) { if (all.includes(w)) return false; }
      for (const j of FORBIDDEN_JARGON) { if (all.includes(j)) return false; }
      return true;
    }

    const params = new URLSearchParams(window.location.search);
    let todayKst = getTodayKst();
    let dynamicNotes = [];
    let noteViewsMap = {};
    SEED_NOTES.forEach(n => {
      if (n && n.id) noteViewsMap[n.id] = Number(n.views) || 0;
    });
    let lastViewedNoteIdSession = '';

    const initNoteParam = params.get('note') || '';
    const initPartFromNote = initNoteParam ? initNoteParam.split('-')[0] : '';
    const initPartParam = params.get('part') || initPartFromNote || (CLINIC_MENUS[0] ? CLINIC_MENUS[0].id : 'knee');
    let currentPartId = CLINIC_MENUS.some(m => m.id === initPartParam) ? initPartParam : (CLINIC_MENUS[0] ? CLINIC_MENUS[0].id : 'knee');
    let currentMenuTab = params.get('tab') === 'qna' ? 1 : (params.get('tab') === 'archive' ? 2 : 0);
    let selectedNoteId = initNoteParam || null;
    let archiveScope = 'part';
    let qnaItems = null;
    let qnaSearchQuery = '';
    let isQnaComposerOpen = params.get('write') === '1';
    let qnaWriteFeedback = '';

    function getMenuMeta(id) {
      return CLINIC_MENUS.find(m => m.id === id) || CLINIC_MENUS[0];
    }

    async function recordActualNoteView(noteId) {
      const nid = String(noteId || '').trim();
      if (!nid || lastViewedNoteIdSession === nid) return;
      lastViewedNoteIdSession = nid;
      noteViewsMap[nid] = (Number(noteViewsMap[nid]) || 0) + 1;
      document.querySelectorAll('[data-note-view-id="' + nid + '"]').forEach(el => {
        el.textContent = '실제 조회수 ' + Number(noteViewsMap[nid]).toLocaleString() + '회';
      });
      try {
        const res = await fetch('/wp-json/bareun/v1/body-notes/view', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ noteId: nid })
        });
        if (!res.ok) return;
        const data = await res.json();
        if (data && data.ok) {
          if (data.noteViews && typeof data.noteViews === 'object') {
            Object.entries(data.noteViews).forEach(([k, v]) => {
              noteViewsMap[k] = Number(v) || 0;
            });
          } else if (typeof data.views === 'number') {
            noteViewsMap[nid] = data.views;
          }
          document.querySelectorAll('[data-note-view-id="' + nid + '"]').forEach(el => {
            el.textContent = '실제 조회수 ' + Number(noteViewsMap[nid] || 0).toLocaleString() + '회';
          });
        }
      } catch (e) {}
    }

    function getPublishedNotes(partFilter) {
      const mergedMap = new Map();
      for (const n of SEED_NOTES) {
        if (passThreeStageGate(n)) {
          mergedMap.set(n.id, Object.assign({}, n, {
            views: Number(noteViewsMap[n.id] != null ? noteViewsMap[n.id] : n.views) || 0
          }));
        }
      }
      for (const raw of dynamicNotes) {
        if (raw && raw.id && passThreeStageGate(raw)) {
          mergedMap.set(raw.id, Object.assign({}, raw, {
            views: Number(noteViewsMap[raw.id] != null ? noteViewsMap[raw.id] : raw.views) || 0
          }));
        }
      }
      const rawList = Array.from(mergedMap.values()).filter(n => {
        if (n.publishDate === '2026-10-28' || String(n.id || '').includes('20261028')) return false;
        if (!n.pinnedTop && n.publishDate && n.publishDate > todayKst) return false;
        if (partFilter && partFilter !== 'all' && n.partId !== partFilter) return false;
        return true;
      });
      rawList.sort((a, b) => {
        if (Boolean(b.pinnedTop) !== Boolean(a.pinnedTop)) return b.pinnedTop ? 1 : -1;
        const da = a.publishDate || '2026-10-27';
        const db = b.publishDate || '2026-10-27';
        if (db !== da) return db.localeCompare(da);
        return String(b.id).localeCompare(String(a.id));
      });
      const seen = new Set();
      const list = [];
      for (const n of rawList) {
        const key = String(n.partId || '') + '|' + String(n.title || '').trim();
        if (seen.has(key)) continue;
        seen.add(key);
        list.push(n);
      }
      return list;
    }

    function buildNoteCardHtml(note, isLatestRed) {
      const realViews = Number(noteViewsMap[note.id] != null ? noteViewsMap[note.id] : (note.views || 0));
      const badgeHtml = isLatestRed
        ? '<span class="latest-red-badge"><span class="latest-red-dot"></span>NEW 최신글</span>'
        : '<span style="display:inline-flex;padding:3px 9px;border-radius:999px;background:rgba(255,255,255,0.12);color:#D6D3CD;font-size:0.7rem;font-weight:700;">발행일 ' + fmtDotDate(note.publishDate) + '</span>';
      const viewBadgeHtml = '<span data-note-view-id="' + escHtml(note.id) + '" style="display:inline-flex;align-items:center;padding:3px 10px;border-radius:999px;background:rgba(255,255,255,0.12);border:1px solid rgba(229,198,126,0.5);color:#E5C67E;font-size:0.72rem;font-weight:800;">실제 조회수 ' + realViews.toLocaleString() + '회</span>';

      const empLines = (note.empathy || []).map(l => '<p class="hip-line">' + escHtml(l) + '</p>').join('');
      const truthLines = (note.truth || []).map(l => '<div class="hip-bullet-row"><span class="hip-bullet-dot"></span><span>' + escHtml(l) + '</span></div>').join('');
      const mythLines = (note.myth || []).map((l, i) => '<div class="hip-num-row"><span class="hip-num-chip">' + String(i + 1).padStart(2, '0') + '</span><span>' + escHtml(l) + '</span></div>').join('');
      const checkLines = (note.check || []).map(l => '<label class="hip-check-item"><input type="checkbox" /><span>' + escHtml(l) + '</span></label>').join('');

      const aeoAnswer = (note.truth || []).join(' ') + ' ' + ((note.myth && note.myth[1]) || '');

      return (
        '<article class="health-info-popup-box" itemscope itemtype="https://schema.org/MedicalWebPage">' +
          '<div class="hip-header">' +
            '<div class="hip-header-main">' +
              '<div class="hip-header-title-wrap">' +
                '<span class="hip-part-bracket">[' + escHtml(note.partLabel) + ']</span>' +
                badgeHtml +
                viewBadgeHtml +
              '</div>' +
              '<h2 itemprop="headline" class="hip-question-title">&ldquo;' + escHtml(note.title) + '&rdquo;</h2>' +
            '</div>' +
          '</div>' +
          '<div class="hip-sections">' +
            '<section class="hip-sec-card">' +
              '<div class="hip-sec-heading"><span>🎒</span><span>1. 일상 속 불편함</span></div>' +
              '<div class="hip-two-lines">' + empLines + '</div>' +
            '</section>' +
            '<section class="hip-sec-card sec-highlight">' +
              '<div class="hip-sec-heading"><span>💡</span><span>2. 의학적 진실</span></div>' +
              '<div class="hip-two-lines">' + truthLines + '</div>' +
              (note.academicBasis
                ? '<div style="margin-top:10px;padding:8px 12px;border-radius:8px;background:#FAF5EA;font-size:0.78rem;font-weight:700;color:#785A1E;">📚 참고 학술 근거: ' + escHtml(note.academicBasis) + '</div>'
                : '') +
            '</section>' +
            '<section class="hip-sec-card">' +
              '<div class="hip-sec-heading"><span>❌</span><span>3. 흔히 하는 오해</span></div>' +
              '<div class="hip-two-lines">' + mythLines + '</div>' +
            '</section>' +
            '<section class="hip-sec-card">' +
              '<div class="hip-sec-heading"><span>🔍</span><span>4. 오늘 바로 해보는 1분 체크</span></div>' +
              '<div class="hip-two-lines">' + checkLines + '</div>' +
            '</section>' +
            '<section class="sp-aeo-geo-box" aria-label="AEO 즉답 요약 및 GEO 의학 팩트 시트">' +
              '<div class="aeo-direct-answer" itemprop="description" style="font-size:0.84rem;font-weight:700;color:#141416;line-height:1.6;">' +
                '<strong style="color:#967128;">⚡ AEO 핵심 의학 요약:</strong> ' + escHtml(aeoAnswer) +
              '</div>' +
              '<table class="geo-fact-table">' +
                '<tbody>' +
                  '<tr><th>진료 부위 · 키워드</th><td>' + escHtml(note.partLabel) + ' · ' + escHtml(note.keyword || '') + '</td></tr>' +
                  '<tr><th>해외 SCI 학술지 근거</th><td>' + escHtml(note.academicBasis || '국제 SCI 의학저널 및 통합생리학 가이드라인') + '</td></tr>' +
                  '<tr><th>의학 감수 기관</th><td>바른한의원 대전본점 (대표원장 안정위 · 010-5631-1275)</td></tr>' +
                '</tbody>' +
              '</table>' +
            '</section>' +
          '</div>' +
        '</article>'
      );
    }

    async function loadQnaAll() {
      try {
        const res = await fetch('/wp-json/bareun/v1/qna?part=all', { cache: 'no-store' });
        if (!res.ok) return;
        const data = await res.json();
        if (data && Array.isArray(data.items)) {
          qnaItems = data.items;
          if (currentMenuTab === 1) renderStandalone();
        }
      } catch (e) {}
    }

    function renderStandalone() {
      // Sync 9 part chips
      document.querySelectorAll('#sp-parts-chip-container .sp-part-chip').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-part') === currentPartId);
      });

      const link3d = document.getElementById('sp-link-3d-model');
      if (link3d) {
        link3d.setAttribute('href', 'body-explorer.html?part=' + encodeURIComponent(currentPartId) + (selectedNoteId ? '&note=' + encodeURIComponent(selectedNoteId) : ''));
      }

      const menuMeta = getMenuMeta(currentPartId);
      const partNotes = getPublishedNotes(currentPartId);
      const allNotes = getPublishedNotes('all');
      const latestNote = partNotes[0] || allNotes[0];

      // Determine active note for Tab 01
      const activeNote = (selectedNoteId && (partNotes.find(n => n.id === selectedNoteId) || allNotes.find(n => n.id === selectedNoteId))) || latestNote;

      if (currentMenuTab === 0 && activeNote && activeNote.id) {
        recordActualNoteView(activeNote.id);
      }

      // Refresh after view increment
      const refreshedPartNotes = getPublishedNotes(currentPartId);
      const refreshedLatest = refreshedPartNotes[0] || latestNote;
      const refreshedActive = (activeNote && refreshedPartNotes.find(n => n.id === activeNote.id)) || activeNote;

      // Update document title dynamically for SEO/AEO/GEO
      if (refreshedActive && refreshedActive.title) {
        document.title = refreshedActive.title + ' [' + refreshedActive.partLabel + ' · 오늘의 건강 글] | 바른한의원 대전본점';
      }

      // 심층 임상 칼럼 3선 (작성된 오늘의 건강글 범위 안에서 실제 조회수 많은 순 정렬)
      const topViewedNotes3 = [...refreshedPartNotes]
        .sort((a, b) => {
          const vDiff = (Number(b.views) || 0) - (Number(a.views) || 0);
          if (vDiff !== 0) return vDiff;
          return String(b.publishDate || '').localeCompare(String(a.publishDate || ''));
        })
        .slice(0, 3);

      const top3Html = topViewedNotes3.length > 0
        ? '<section style="margin-top:14px;padding:18px 20px;border-radius:18px;background:#FFFFFF;border:1.5px solid #DFC99B;box-shadow:0 8px 22px rgba(13,13,15,0.06);">' +
            '<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:12px;flex-wrap:wrap;">' +
              '<div style="display:flex;align-items:center;gap:8px;">' +
                '<span style="display:inline-flex;padding:3px 9px;border-radius:7px;background:#0D0D0F;color:#E5C67E;font-size:0.74rem;font-weight:800;">심층 임상 칼럼 3선</span>' +
                '<strong style="font-size:0.92rem;font-weight:800;color:#0D0D0F;">[' + escHtml(menuMeta.partLabel) + '] 작성된 오늘의 건강글 실제 조회수 BEST 3</strong>' +
              '</div>' +
              '<button type="button" onclick="window.switchStandaloneTab(2)" style="border:none;background:transparent;cursor:pointer;font-size:0.78rem;font-weight:800;color:#967128;">누적 건강글 전체 (' + refreshedPartNotes.length + '편) &rarr;</button>' +
            '</div>' +
            '<div style="display:flex;flex-direction:column;gap:8px;">' +
              topViewedNotes3.map((np, bIdx) => {
                const isLatestItem = refreshedLatest && np.id === refreshedLatest.id;
                const isCurrentItem = refreshedActive && np.id === refreshedActive.id;
                return '<button type="button" onclick="window.openNoteById(\\'' + escHtml(np.id) + '\\')" style="width:100%;text-align:left;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:10px;padding:12px 14px;border-radius:11px;background:' + (isCurrentItem ? '#FAF5EA' : '#FCFBF8') + ';border:1.5px solid ' + (isLatestItem ? '#FDA4AF' : (isCurrentItem ? '#C5A059' : '#EAE3D5')) + ';color:#141416;transition:all 0.16s ease;">' +
                  '<div style="min-width:0;flex:1;">' +
                    '<div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;flex-wrap:wrap;">' +
                      '<span style="font-size:0.72rem;font-weight:800;color:#E11D48;">BEST 0' + (bIdx + 1) + '</span>' +
                      '<span data-note-view-id="' + escHtml(np.id) + '" style="font-size:0.72rem;font-weight:800;color:#57534E;">실제 조회수 ' + Number(np.views || 0).toLocaleString() + '회</span>' +
                      '<span style="font-size:0.72rem;font-weight:600;color:#8C857B;">· ' + fmtDotDate(np.publishDate) + '</span>' +
                      (isLatestItem ? '<span class="latest-red-badge" style="padding:1px 6px;font-size:0.64rem;">최신글</span>' : '') +
                    '</div>' +
                    '<div style="font-size:0.88rem;font-weight:800;color:#0D0D0F;">&ldquo;' + escHtml(np.title) + '&rdquo;</div>' +
                  '</div>' +
                  '<span style="font-size:0.78rem;font-weight:800;color:#967128;flex-shrink:0;">바로 읽기 &rsaquo;</span>' +
                '</button>';
              }).join('') +
            '</div>' +
          '</section>'
        : '';

      let bodyHtml = '';
      if (currentMenuTab === 0) {
        const isLatestActive = Boolean(refreshedLatest && refreshedActive && refreshedActive.id === refreshedLatest.id);
        bodyHtml = (refreshedActive ? buildNoteCardHtml(refreshedActive, isLatestActive) : '') + top3Html;
      } else if (currentMenuTab === 1) {
        if (!qnaItems) loadQnaAll();
        const partLabelLookup = {};
        CLINIC_MENUS.forEach(m => {
          partLabelLookup[m.id] = m.partLabel || m.shortLabel || m.id;
          if (m.qnaPartId) partLabelLookup[m.qnaPartId] = m.partLabel || m.shortLabel || m.id;
        });
        const qnaPartKey = menuMeta.qnaPartId || currentPartId;

        const filteredQna = (qnaItems || []).filter(q => {
          if (!qnaSearchQuery) return true;
          const kw = qnaSearchQuery.toLowerCase();
          const pName = (partLabelLookup[q.partId] || '').toLowerCase();
          return String(q.title || '').toLowerCase().includes(kw) ||
                 String(q.maskedAuthor || '').toLowerCase().includes(kw) ||
                 pName.includes(kw);
        });

        const composerHtml = isQnaComposerOpen
          ? '<form class="qna-inline-composer" onsubmit="window.submitStandaloneQna(event)">' +
              '<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">' +
                '<strong style="font-size:0.9rem;font-weight:800;color:#0D0D0F;">✍️ 현재 페이지에서 바로 1:1 질문 작성하기</strong>' +
                '<button type="button" onclick="window.toggleStandaloneQnaComposer(false)" style="border:none;background:transparent;font-size:0.78rem;font-weight:800;color:#57534E;cursor:pointer;">접기 ▲</button>' +
              '</div>' +
              '<div class="qic-row-2">' +
                '<select id="sqic-part" class="qic-select">' +
                  CLINIC_MENUS.map(m => {
                    const pVal = m.qnaPartId || m.id;
                    const sel = (pVal === qnaPartKey) ? ' selected' : '';
                    return '<option value="' + escHtml(pVal) + '"' + sel + '>[' + escHtml(m.partLabel || m.shortLabel) + '] 관련 질문</option>';
                  }).join('') +
                '</select>' +
                '<input type="text" id="sqic-name" class="qic-input" placeholder="작성자 성함 (또는 닉네임) *" required />' +
              '</div>' +
              '<div class="qic-row-2">' +
                '<input type="tel" id="sqic-phone" class="qic-input" placeholder="연락처 (카톡 답변 알림용)" />' +
                '<input type="email" id="sqic-email" class="qic-input" placeholder="이메일 (메일 답변 알림용)" />' +
              '</div>' +
              '<div class="qic-row-2" style="align-items:center;">' +
                '<label style="display:inline-flex;align-items:center;gap:6px;font-size:0.8rem;font-weight:700;color:#0D0D0F;cursor:pointer;">' +
                  '<input type="checkbox" id="sqic-secret" checked />' +
                  '<span>🔒 비밀글로 보호 (체크 해제 시 공개글)</span>' +
                '</label>' +
                '<input type="password" id="sqic-password" class="qic-input" placeholder="비밀글 열람 비밀번호 (선택)" />' +
              '</div>' +
              '<input type="text" id="sqic-title" class="qic-input" placeholder="질문 제목을 입력해 주세요 *" required />' +
              '<textarea id="sqic-content" class="qic-textarea" rows="4" placeholder="불편하신 증상과 궁금한 점을 남겨주시면 대표원장님의 답변이 등록된 이메일과 카카오톡으로 전송됩니다. *" required></textarea>' +
              '<button type="submit" class="qic-submit-btn" id="sqic-submit-btn">1:1 질문 즉시 등록하기 &rarr;</button>' +
            '</form>'
          : '';

        const feedbackHtml = qnaWriteFeedback
          ? '<div style="padding:11px 14px;border-radius:10px;background:#ECFDF5;border:1px solid #6EE7B7;color:#065F46;font-size:0.84rem;font-weight:800;">' + escHtml(qnaWriteFeedback) + '</div>'
          : '';

        const listHtml = filteredQna.length > 0
          ? filteredQna.map(q => {
              const pName = partLabelLookup[q.partId] || '통합 건강';
              return '<div class="qna-item-row">' +
                '<div class="qna-item-meta">' +
                  '<span><strong style="color:#967128;">[' + escHtml(pName) + ']</strong> · 작성자 ' + escHtml(q.maskedAuthor || '회원') + ' · ' + escHtml(q.createdAt || '') + '</span>' +
                  '<span class="qna-status-badge ' + (q.status === 'answered' ? 'answered' : 'waiting') + '">' +
                    (q.status === 'answered' ? '답변 완료' : '답변 대기') +
                  '</span>' +
                '</div>' +
                '<div class="qna-item-title">' + escHtml(q.title) + '</div>' +
                (q.canRead && q.masterReply
                  ? '<div style="margin-top:6px;padding:10px 12px;border-radius:9px;background:#FFFFFF;border-left:3px solid #C5A059;font-size:0.84rem;color:#262522;line-height:1.55;"><strong>원장실 답변 ·</strong> ' + escHtml(q.masterReply) + '</div>'
                  : '') +
              '</div>';
            }).join('')
          : '<div class="qna-item-row"><div class="qna-item-title">검색 결과가 없거나 등록된 질문이 없습니다. 위 [1:1 질문 남기기] 버튼으로 바로 작성해 보세요.</div></div>';

        bodyHtml =
          '<section class="qna-menu-panel">' +
            '<div class="qna-panel-top">' +
              '<div>' +
                '<div style="font-size:0.76rem;font-weight:800;color:#967128;margin-bottom:4px;">전 질환 통합 게시판 · 비밀글 · 이메일/카톡 답변 알림 (' + (qnaItems ? qnaItems.length : 0) + '건)</div>' +
                '<h2 style="font-size:1.25rem;font-weight:800;color:#0D0D0F;">무엇이든 물어보세요</h2>' +
                '<p style="font-size:0.84rem;color:#57534E;margin-top:3px;">모든 질환 질문이 하나로 통합되어 있으며, 링크 이동 없이 현재 페이지에서 바로 질문을 작성하실 수 있습니다.</p>' +
              '</div>' +
              '<button type="button" onclick="window.toggleStandaloneQnaComposer()" class="qna-write-btn">' + (isQnaComposerOpen ? '✕ 작성창 닫기' : '✍️ 1:1 질문 남기기 &rarr;') + '</button>' +
            '</div>' +
            '<div style="display:flex;gap:8px;">' +
              '<input type="search" id="sqna-search-input" class="qic-input" placeholder="🔍 질환명·증상·키워드로 통합 질문 검색..." value="' + escHtml(qnaSearchQuery) + '" oninput="window.filterStandaloneQna(this.value)" />' +
            '</div>' +
            feedbackHtml +
            composerHtml +
            '<div style="display:flex;flex-direction:column;gap:9px;">' + listHtml + '</div>' +
          '</section>';
      } else {
        const targetList = archiveScope === 'all' ? getPublishedNotes('all') : refreshedPartNotes;
        const rowsHtml = targetList.map((n, idx) => {
          const isRowLatest = (idx === 0 && archiveScope === 'part') || (refreshedLatest && n.id === refreshedLatest.id);
          return '<button type="button" class="archive-card-btn" onclick="window.openNoteById(\\'' + escHtml(n.id) + '\\')">' +
            '<div>' +
              '<div class="archive-card-tags">' +
                '<span class="archive-date-pill' + (isRowLatest ? ' is-latest-red' : '') + '">' + fmtDotDate(n.publishDate) + (isRowLatest ? ' · NEW 최신글' : '') + '</span>' +
                '<span class="archive-part-pill">[' + escHtml(n.partLabel) + ']</span>' +
                '<span data-note-view-id="' + escHtml(n.id) + '" style="font-size:0.74rem;color:#6E685F;font-weight:800;">실제 조회수 ' + Number(n.views || 0).toLocaleString() + '회</span>' +
              '</div>' +
              '<div class="archive-card-title">&ldquo;' + escHtml(n.title) + '&rdquo;</div>' +
            '</div>' +
            '<span class="archive-read-arrow">단독 열람 &rarr;</span>' +
          '</button>';
        }).join('');

        bodyHtml =
          '<section class="archive-menu-panel">' +
            '<div class="archive-filter-bar">' +
              '<div>' +
                '<div style="font-size:0.76rem;font-weight:800;color:#967128;margin-bottom:3px;">2일 주기 자동 누적 건강 아카이브</div>' +
                '<h2 style="font-size:1.25rem;font-weight:800;color:#0D0D0F;">더 궁금하세요?</h2>' +
              '</div>' +
              '<div class="archive-scope-pills">' +
                '<button type="button" class="archive-scope-btn' + (archiveScope === 'part' ? ' active' : '') + '" onclick="window.setStandaloneArchiveScope(\\'part\\')">[' + escHtml(menuMeta.partLabel) + '] (' + refreshedPartNotes.length + '편)</button>' +
                '<button type="button" class="archive-scope-btn' + (archiveScope === 'all' ? ' active' : '') + '" onclick="window.setStandaloneArchiveScope(\\'all\\')">전체 9대 부위 (' + allNotes.length + '편)</button>' +
              '</div>' +
            '</div>' +
            '<div class="archive-list">' + rowsHtml + '</div>' +
          '</section>';
      }

      const container = document.getElementById('standalone-dynamic-container');
      container.innerHTML =
        '<nav class="three-menu-nav" role="tablist" aria-label="3D 백과사전 건강글 3대 탭" style="margin-bottom:14px;">' +
          '<button type="button" class="three-menu-btn' + (currentMenuTab === 0 ? ' active' : '') + '" onclick="window.switchStandaloneTab(0)">' +
            '<span class="tmb-step" style="display:inline-flex;align-items:center;gap:4px;"><span class="latest-red-dot"></span><span style="color:#E11D48;font-weight:900;">01 · 최신 글 1편</span></span>' +
            '<span class="tmb-label">오늘의 건강 글</span>' +
          '</button>' +
          '<button type="button" class="three-menu-btn' + (currentMenuTab === 1 ? ' active' : '') + '" onclick="window.switchStandaloneTab(1)">' +
            '<span class="tmb-step">02 · 1:1 질문</span>' +
            '<span class="tmb-label">무엇이든 물어보세요</span>' +
          '</button>' +
          '<button type="button" class="three-menu-btn' + (currentMenuTab === 2 ? ' active' : '') + '" onclick="window.switchStandaloneTab(2)">' +
            '<span class="tmb-step">03 · 누적 ' + refreshedPartNotes.length + '편</span>' +
            '<span class="tmb-label">더 궁금하세요?</span>' +
          '</button>' +
        '</nav>' +
        bodyHtml;
    }

    window.selectStandalonePart = function(partId) {
      currentPartId = partId;
      selectedNoteId = null;
      currentMenuTab = 0;
      renderStandalone();
      try {
        window.history.replaceState(null, '', '?part=' + encodeURIComponent(partId));
      } catch (e) {}
    };

    window.switchStandaloneTab = function(tabIdx) {
      currentMenuTab = tabIdx;
      renderStandalone();
    };

    window.openQnaTabDirect = function() {
      currentMenuTab = 1;
      isQnaComposerOpen = true;
      renderStandalone();
    };

    window.openNoteById = function(noteId) {
      const all = getPublishedNotes('all');
      const found = all.find(n => n.id === noteId);
      if (found) {
        currentPartId = found.partId;
        selectedNoteId = found.id;
      } else {
        selectedNoteId = noteId;
      }
      currentMenuTab = 0;
      lastViewedNoteIdSession = '';
      renderStandalone();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      try {
        window.history.replaceState(null, '', '?part=' + encodeURIComponent(currentPartId) + '&note=' + encodeURIComponent(selectedNoteId));
      } catch (e) {}
    };

    window.setStandaloneArchiveScope = function(scope) {
      archiveScope = scope;
      renderStandalone();
    };

    window.toggleStandaloneQnaComposer = function(force) {
      isQnaComposerOpen = typeof force === 'boolean' ? force : !isQnaComposerOpen;
      qnaWriteFeedback = '';
      renderStandalone();
    };

    window.filterStandaloneQna = function(val) {
      qnaSearchQuery = String(val || '');
      renderStandalone();
      const input = document.getElementById('sqna-search-input');
      if (input) {
        input.focus();
        input.setSelectionRange(input.value.length, input.value.length);
      }
    };

    window.submitStandaloneQna = async function(ev) {
      ev.preventDefault();
      const partEl = document.getElementById('sqic-part');
      const nameEl = document.getElementById('sqic-name');
      const phoneEl = document.getElementById('sqic-phone');
      const emailEl = document.getElementById('sqic-email');
      const secEl = document.getElementById('sqic-secret');
      const passEl = document.getElementById('sqic-password');
      const titleEl = document.getElementById('sqic-title');
      const contentEl = document.getElementById('sqic-content');
      const btnEl = document.getElementById('sqic-submit-btn');

      const name = (nameEl && nameEl.value || '').trim();
      const title = (titleEl && titleEl.value || '').trim();
      const content = (contentEl && contentEl.value || '').trim();
      if (!name || !title || !content) return;

      if (btnEl) {
        btnEl.disabled = true;
        btnEl.textContent = '질문 등록 중...';
      }

      try {
        const res = await fetch('/wp-json/bareun/v1/qna', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            partId: (partEl && partEl.value) || currentPartId,
            name,
            phone: (phoneEl && phoneEl.value || '').trim(),
            email: (emailEl && emailEl.value || '').trim(),
            isSecret: secEl ? Boolean(secEl.checked) : true,
            secretPassword: (passEl && passEl.value || '').trim(),
            title,
            content
          })
        });
        const data = await res.json();
        if (data && data.ok) {
          isQnaComposerOpen = false;
          qnaWriteFeedback = '✅ 질문이 등록되었습니다! 대표원장님 답변 등록 시 입력하신 이메일과 카카오톡으로 즉시 알림이 전송됩니다.';
          await loadQnaAll();
          renderStandalone();
        } else {
          alert((data && data.message) || '질문 등록 중 오류가 발생했습니다.');
          if (btnEl) {
            btnEl.disabled = false;
            btnEl.textContent = '1:1 질문 즉시 등록하기 →';
          }
        }
      } catch (e) {
        alert('네트워크 통신 중 오류가 발생했습니다.');
        if (btnEl) {
          btnEl.disabled = false;
          btnEl.textContent = '1:1 질문 즉시 등록하기 →';
        }
      }
    };

    async function syncLiveServerNotes() {
      try {
        const res = await fetch('/wp-json/bareun/v1/body-notes', { cache: 'no-store' });
        if (!res.ok) return;
        const data = await res.json();
        if (data && data.ok) {
          if (data.todayKst) todayKst = data.todayKst;
          if (data.noteViews && typeof data.noteViews === 'object') {
            Object.entries(data.noteViews).forEach(([k, v]) => {
              noteViewsMap[k] = Number(v) || 0;
            });
          }
          if (Array.isArray(data.notes) && data.notes.length > 0) {
            dynamicNotes = data.notes;
          }
          renderStandalone();
        }
      } catch (e) {}
    }

    renderStandalone();
    syncLiveServerNotes();
    loadQnaAll();
  })();
  </script>
  <script src="visit-tracker.js"></script>
</body>
</html>`;
}

const outPath = path.join(__dirname, 'ask-doctor.html');
const html = buildStandaloneHealthNotesHtml();
fs.writeFileSync(outPath, html, 'utf8');
console.log('✅ Generated Standalone 3D Encyclopedia Health Notes Hub (ask-doctor.html):', outPath, '(' + html.length + ' bytes)');
