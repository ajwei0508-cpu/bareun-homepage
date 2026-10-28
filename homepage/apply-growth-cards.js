const fs = require('fs');
const path = require('path');

const dir = __dirname;
const cfgPath = path.join(dir, 'growth-cards-config.json');
const growthHtmlPath = path.join(dir, 'growth.html');

function escHtml(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escAttr(s) {
  return escHtml(s).replace(/"/g, '&quot;');
}

function renderTitleHtml(c) {
  const pre = escHtml(c.titlePrefix || '');
  const hi = c.titleHighlight ? `<span class="title-key-em">${escHtml(c.titleHighlight)}</span>` : '';
  const suf = escHtml(c.titleSuffix || '');
  return `${pre}${hi}${suf}`;
}

function renderCardHtml(c, displayNum, isFirstActive) {
  const activeCls = isFirstActive ? ' is-active-plate' : '';
  const numStr = String(displayNum).padStart(2, '0');

  if (c.type === 'son-hero') {
    const img = c.mainImage || 'growth-director-son.png';
    const paras = Array.isArray(c.letterParagraphs) ? c.letterParagraphs.join('<br><br>\n                  ') : '';
    const chips = Array.isArray(c.chips) ? c.chips : [];
    const chipsHtml = chips.map((ch, idx) => `
                  <div class="letter-milestone-chip${idx === chips.length - 1 ? ' is-accent' : ''}">
                    <span class="lm-label">${escHtml(ch.label)}</span>
                    <strong class="lm-val">${escHtml(ch.value)}</strong>
                  </div>`).join('');

    return `        <!-- PLATE ${numStr}: Director's Son Growth Enlarged Original Image Hero & Handwritten Pledge -->
        <article class="project-details-item is-growth-son-hero is-clean-plate${activeCls}" data-fullscreen>
          <div class="plate-media-inner growth-son-hero-inner">
            <div class="motion-video-stage is-son-ambient-stage" data-frames="${escAttr(img)}" data-duration="6.4" style="background:transparent; pointer-events:none; z-index:0;">
              <canvas class="plate-fx-canvas" data-fx="sunlight-bokeh"></canvas>
              <div class="motion-progress-track"><div class="motion-progress-fill"></div></div>
            </div>
            <div class="growth-son-hero-grid" style="position:relative; z-index:2;">
              <!-- LEFT: UNEDITED ORIGINAL SON GROWTH IMAGE ENLARGED SHOWCASE -->
              <div class="son-growth-visual-col" onclick="event.stopPropagation(); window.openCleanLightbox('${escAttr(img)}')" title="클릭하여 원본 이미지 전체화면 확대">
                <div class="son-original-frame">
                  <img
                    class="son-original-full-img"
                    src="${escAttr(img)}"
                    onerror="this.onerror=null; this.src='growth-director-son-comparison.png';"
                    alt="바른한의원 안정위 대표원장 친아들 성장한약 복용 비교 원본 이미지"
                    draggable="false" width="341" height="1024" fetchpriority="high">
                  <button type="button" class="son-original-zoom-pill" onclick="event.stopPropagation(); window.openCleanLightbox('${escAttr(img)}')">
                    <span>🔍 원본 크게 확대보기</span>
                  </button>
                </div>
              </div>

              <!-- RIGHT: DIRECTOR'S HANDWRITTEN PLEDGE -->
              <div class="father-letter-box">
                <div class="letter-top-hero-banner">
                  <span class="son-live-badge"><span class="son-live-dot"></span>${escHtml(c.badge || 'MAIN RECORD · 대표원장 친아들 실제 성장 스토리')}</span>
                  <h2 class="son-hero-main-title">${renderTitleHtml(c)}</h2>
                  <p class="son-hero-main-sub">${escHtml(c.subtitle || '')}</p>
                </div>

                <div class="letter-eyebrow">
                  <span class="letter-eyebrow-line"></span>
                  <span>${escHtml(c.letterEyebrow || "DIRECTOR'S HANDWRITTEN PLEDGE · 아빠의 마음으로 달인 성장한약")}</span>
                </div>
                <h3 class="letter-headline">
                  ${escHtml(c.letterHeadlineLine1 || '"내 아이에게 먹이지 못할 약이라면,')}<br>
                  <span>${escHtml(c.letterHeadlineLine2 || '세상 어떤 아이에게도 처방하지 않습니다"')}</span>
                </h3>
                <div class="letter-handwriting">
                  "${paras}"
                </div>
                <div class="letter-milestone-row">${chipsHtml}
                </div>
                <div class="letter-sign-row">
                  <div class="letter-sign-info">
                    <div class="letter-sign-text">${escHtml(c.signPrefix || '아빠같은 한의사')} <span>${escHtml(c.signName || '안 정 위')}</span> ${escHtml(c.signSuffix || '대표원장 배상')}</div>
                    <a href="${escAttr(c.blogUrl || 'https://blog.naver.com/wei0508/223437892490')}" target="_blank" rel="noopener" class="letter-blog-btn" onclick="event.stopPropagation();">
                      <span>${escHtml(c.blogBtnText || '📖 대표원장 아들 성장 스토리 원문 보러가기')}</span>
                      <span>↗</span>
                    </a>
                  </div>
                  <div class="director-seal-stamp" aria-label="안정위 대표원장 직인">
                    <svg viewBox="0 0 64 64" width="48" height="48">
                      <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#B83B2A" stroke-width="3.5"/>
                      <rect x="9" y="9" width="46" height="46" rx="3" fill="none" stroke="#B83B2A" stroke-width="1.2" stroke-dasharray="4 2"/>
                      <text x="32" y="28" text-anchor="middle" fill="#B83B2A" font-family="'Noto Serif KR', serif" font-weight="900" font-size="14">바른</text>
                      <text x="32" y="47" text-anchor="middle" fill="#B83B2A" font-family="'Noto Serif KR', serif" font-weight="900" font-size="14">正印</text>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>`;
  }

  if (c.type === 'obese-to-tall-motion') {
    const seq = Array.isArray(c.seqImages) && c.seqImages.length >= 3
      ? c.seqImages
      : ['growth_minimal_card3_obese_to_tall_a.jpg?v=grw3v2', 'growth_minimal_card3_obese_to_tall_b.jpg?v=grw3v2', 'growth_minimal_card3_obese_to_tall_c.jpg?v=grw3v2'];
    return `        <!-- PLATE ${numStr}: Obese-to-Tall Step-by-Step Motion Card -->
        <article class="project-details-item is-diet-single-stage-plate is-clean-plate${activeCls}" data-fullscreen>
          <span class="tiny-card-num-badge">${numStr}</span>
          <div class="plate-media-inner">
            <div class="efficacy-visual-frame detox-frame is-full-stage-frame is-edema-wring-motion">
              <div class="edema-wring-seq-stage">
                <img class="edema-seq-img seq-1" src="${escAttr(seq[0])}" alt="물이 꽉 찬 부종 전신" loading="lazy" draggable="false" width="1280" height="714">
                <img class="edema-seq-img seq-2" src="${escAttr(seq[1])}" alt="쥐어 짜서 물이 배출되는 전신" loading="lazy" draggable="false" width="1280" height="714">
                <img class="edema-seq-img seq-3" src="${escAttr(seq[2])}" alt="물이 빠져 늘씬해진 전신" loading="lazy" draggable="false" width="1280" height="714">
              </div>
              <div class="detox-slim-layer" aria-hidden="true">
                <svg class="contour-cinch-guide" viewBox="0 0 240 240" fill="none">
                  <path class="swollen-line-left" d="M62 46 Q36 120 62 194" />
                  <path class="swollen-line-right" d="M178 46 Q204 120 178 194" />
                  <path class="cinch-arrow left-arrow" d="M32 92 L78 92 M66 84 L78 92 L66 100" />
                  <path class="cinch-arrow right-arrow" d="M208 92 L162 92 M174 84 L162 92 L174 100" />
                  <path class="cinch-arrow left-arrow" d="M32 146 L78 146 M66 138 L78 146 L66 154" />
                  <path class="cinch-arrow right-arrow" d="M208 146 L162 146 M174 138 L162 146 L174 154" />
                </svg>
                <span class="water-drop d1"></span>
                <span class="water-drop d2"></span>
                <span class="water-drop d3"></span>
                <span class="water-drop d4"></span>
                <span class="water-drop d5"></span>
                <span class="water-drop d6"></span>
              </div>
              <div class="efficacy-motion-overlay"></div>
            </div>
            <div class="clean-plate-scrim"></div>
            <div class="clean-plate-caption">
              <div class="clean-plate-text">
                <h2 class="plate-caption-title">${renderTitleHtml(c)}</h2>
                <p class="plate-caption-sub">${escHtml(c.subtitle || '')}</p>
              </div>
            </div>
          </div>
        </article>`;
  }

  if (c.type === 'short-to-tall-motion') {
    const seq = Array.isArray(c.seqImages) && c.seqImages.length >= 3
      ? c.seqImages
      : ['growth_minimal_card4_short_before.jpg?v=grw4v3', 'growth_minimal_card4_growing_mid.jpg?v=grw4v3', 'growth_minimal_card4_tall_after.jpg?v=grw4v3'];
    return `        <!-- PLATE ${numStr}: Short-to-Tall Step-by-Step Motion Card -->
        <article class="project-details-item is-diet-single-stage-plate is-clean-plate${activeCls}" data-fullscreen>
          <span class="tiny-card-num-badge">${numStr}</span>
          <div class="plate-media-inner">
            <div class="efficacy-visual-frame growth-tall-frame is-full-stage-frame is-growth-tall-motion">
              <div class="growth-tall-seq-stage">
                <img class="growth-tall-seq-img seq-1" src="${escAttr(seq[0])}" alt="또래보다 작던 키 (성장 전)" loading="lazy" draggable="false" width="1280" height="714">
                <img class="growth-tall-seq-img seq-2" src="${escAttr(seq[1])}" alt="성장판 연골 증식으로 키가 자라는 중" loading="lazy" draggable="false" width="1280" height="714">
                <img class="growth-tall-seq-img seq-3" src="${escAttr(seq[2])}" alt="위로 쑥쑥 폭풍 키 성장 완료" loading="lazy" draggable="false" width="1280" height="714">
              </div>
              <div class="growth-tall-boost-layer" aria-hidden="true">
                <div class="growth-epiphyseal-glow"></div>
                <div class="growth-height-laser-bar">
                  <span class="growth-height-laser-pill"><span class="laser-dot"></span>${escHtml(c.laserBadge || '▲ 성장판 연골 증식 · 수직 폭풍 성장 UP')}</span>
                </div>
                <svg class="growth-upward-arrows-svg" viewBox="0 0 280 240" fill="none">
                  <path class="growth-up-arrow g-arr-1" d="M88 188 L88 54 M76 70 L88 54 L100 70" />
                  <path class="growth-up-arrow g-arr-2" d="M106 168 L106 38 M96 52 L106 38 L116 52" />
                  <path class="growth-up-arrow g-arr-3" d="M182 178 L182 52 M170 68 L182 52 L194 68" />
                </svg>
                <span class="growth-spark gs1"></span>
                <span class="growth-spark gs2"></span>
                <span class="growth-spark gs3"></span>
                <span class="growth-spark gs4"></span>
                <span class="growth-spark gs5"></span>
                <span class="growth-spark gs6"></span>
              </div>
              <div class="efficacy-motion-overlay"></div>
            </div>
            <div class="clean-plate-scrim"></div>
            <div class="clean-plate-caption">
              <div class="clean-plate-text">
                <h2 class="plate-caption-title">${renderTitleHtml(c)}</h2>
                <p class="plate-caption-sub">${escHtml(c.subtitle || '')}</p>
              </div>
            </div>
          </div>
        </article>`;
  }

  if (c.type === 'neuro-sleep-motion') {
    const img = c.mainImage || 'growth-child-sleep.jpg';
    return `        <!-- PLATE ${numStr}: Neuro-Sleep Motion Card -->
        <article class="project-details-item is-diet-single-stage-plate is-clean-plate${activeCls}" data-fullscreen>
          <span class="tiny-card-num-badge">${numStr}</span>
          <div class="plate-media-inner">
            <div class="efficacy-visual-frame neuro-frame is-full-stage-frame">
              <img src="${escAttr(img)}" alt="${escAttr((c.titlePrefix || '') + (c.titleHighlight || ''))}" loading="lazy" draggable="false" width="1280" height="714">
              <div class="electric-zap-layer" aria-hidden="true">
                <div class="zap-pulse-core"></div>
                <div class="zap-wave-ring"></div>
                <div class="zap-wave-ring ring-2"></div>
                <svg class="zap-lightning-svg" viewBox="0 0 200 200" fill="none">
                  <path class="zap-bolt bolt-1" d="M100 72 L84 52 L92 42 L72 22" />
                  <path class="zap-bolt bolt-2" d="M114 78 L138 62 L130 50 L156 34" />
                  <path class="zap-bolt bolt-3" d="M88 86 L62 82 L68 70 L42 64" />
                  <path class="zap-bolt bolt-4" d="M112 92 L142 96 L134 108 L162 114" />
                </svg>
                <span class="spark-dot s1"></span>
                <span class="spark-dot s2"></span>
                <span class="spark-dot s3"></span>
                <span class="spark-dot s4"></span>
              </div>
              <div class="efficacy-motion-overlay"></div>
            </div>
            <div class="clean-plate-scrim"></div>
            <div class="clean-plate-caption">
              <div class="clean-plate-text">
                <h2 class="plate-caption-title">${renderTitleHtml(c)}</h2>
                <p class="plate-caption-sub">${escHtml(c.subtitle || '')}</p>
              </div>
            </div>
          </div>
        </article>`;
  }

  if (c.type === 'multi-frame-trouble') {
    const seq = Array.isArray(c.seqImages) && c.seqImages.length >= 2
      ? c.seqImages
      : ['detail_growth_story1_wall_chart.jpg?v=grw1', 'detail_growth_story1_mouth_breathing.jpg?v=grw1', 'growth_minimal_card9_picky_eating.jpg?v=grw9'];
    return `        <!-- PLATE ${numStr}: Multi-Frame Motion Video Storytelling Stage -->
        <article class="project-details-item is-motion-plate${activeCls}" data-fullscreen>
          <span class="tiny-card-num-badge">${numStr}</span>
          <div class="plate-media-inner">
            <div class="motion-video-stage" data-frames="${escAttr(seq.join('|'))}" data-duration="6.6">
              <div class="motion-frame-layer frame-layer-a" style="background-image: url('${escAttr(seq[0])}');"></div>
              <div class="motion-frame-layer frame-layer-b" style="background-image: url('${escAttr(seq[1] || seq[0])}'); opacity: 0;"></div>
              <canvas class="plate-fx-canvas" data-fx="sunlight-bokeh"></canvas>
              <div class="motion-progress-track"><div class="motion-progress-fill"></div></div>
            </div>
            <div class="plate-gradient-scrim"></div>
            <div class="plate-bottom-caption">
              <div>
                <h2 class="plate-caption-title">${renderTitleHtml(c)}</h2>
                <p class="plate-caption-sub">${escHtml(c.subtitle || '')}</p>
              </div>
              <div class="plate-action-group">
                <button type="button" class="plate-step-btn" onclick="event.stopPropagation(); window.stepPlateFrame(this)">${escHtml(c.stepBtnText || '다음 장면 ⟳')}</button>
              </div>
            </div>
          </div>
        </article>`;
  }

  if (c.type === '3d-body-link') {
    const href = c.linkHref || 'body-explorer.html?part=knee';
    return `        <!-- LAST CARD (${numStr}th Card): Minimalist Honey-Tip Card Linked to 3D Body Model -->
        <article id="project-details-preview" class="body-model-last-card is-diet-body-extra-card" style="cursor:pointer;" onclick="if(!event.target.closest('a')){const a=this.querySelector('a');if(a)window.location.href=a.href;}">
          <span class="tiny-card-num-badge">${numStr}</span>
          <div class="diet-card10-3d-bg" id="diet-our-3d-body-stage" aria-hidden="true">
            <canvas id="diet-our-3d-body-canvas"></canvas>
          </div>
          <a class="diet-honey-tip-only-center" href="${escAttr(href)}" aria-label="${escAttr(c.titlePrefix || '성장 꿀팁')} - 3D 인체모형 바로가기">
            <h2 class="diet-honey-tip-only-title">${renderTitleHtml(c)}</h2>
          </a>
        </article>`;
  }

  // Default: single-image
  const img = c.mainImage || 'detail_growth_story2_supplements_limit.jpg?v=grw2';
  const plainAlt = ((c.titlePrefix || '') + (c.titleHighlight || '') + (c.titleSuffix || '')).trim();
  return `        <!-- PLATE ${numStr}: Single Main Image Plate -->
        <article class="project-details-item is-image is-clean-plate${activeCls}" data-fullscreen>
          <span class="tiny-card-num-badge">${numStr}</span>
          <div class="plate-media-inner">
            <img class="lusion-clean-media" src="${escAttr(img)}" alt="${escAttr(plainAlt)}" draggable="false" width="1280" height="714">
            <div class="clean-plate-scrim"></div>
            <div class="clean-plate-caption">
              <div class="clean-plate-text">
                <h2 class="plate-caption-title">${renderTitleHtml(c)}</h2>
                <p class="plate-caption-sub">${escHtml(c.subtitle || '')}</p>
              </div>
            </div>
          </div>
        </article>`;
}

function buildGrowthMainBlock(cfg) {
  const lp = cfg.leftPanel || {};
  const checkItems = Array.isArray(lp.checklistItems) ? lp.checklistItems : [];
  const checkHtml = checkItems.map((txt, idx) => `
            <label class="empathy-check-item" data-idx="${idx}">
              <input type="checkbox" class="empathy-check-input" value="${escAttr(txt)}">
              <span class="empathy-check-box">
                <svg viewBox="0 0 14 14" fill="none">
                  <path d="M2.5 7.2L5.6 10.3L11.5 3.8" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
              <span class="empathy-check-text">${escHtml(txt)}</span>
            </label>`).join('');

  const enabledCards = (Array.isArray(cfg.cards) ? cfg.cards : []).filter(c => c && c.enabled !== false);
  const cardsHtml = enabledCards.map((c, idx) => renderCardHtml(c, idx + 1, idx === 0)).join('\n\n');

  return `<main id="project-details">
    <!-- LEFT CLINIC GUIDE & INTERACTIVE PATIENT EMPATHY CHECKLIST -->
    <aside id="project-details-meta">
      <div>
        <div class="meta-eyebrow">${escHtml(lp.eyebrow || 'PEDIATRIC GROWTH CLINIC · 학술 논문 검증 소아 성장·성조숙증')}</div>
        <h1 id="project-details-title">${escHtml(lp.title || '바른 성장 · 성조숙증')}</h1>
        <div class="meta-subtitle-en">${escHtml(lp.subtitleEn || 'Evidence-Based Epiphyseal Chondrocyte & Pediatric Immunity Care')}</div>

        <div id="project-details-desc">
          <p>${escHtml(lp.description || '')}</p>
        </div>

        <!-- INTERACTIVE DAILY DISCOMFORT EMPATHY CHECKLIST -->
        <div class="empathy-checklist-card">
          <div class="empathy-checklist-header">
            <span class="empathy-checklist-title">${escHtml(lp.checklistTitle || '우리 아이 성장 · 성조숙증 체크리스트')}</span>
            <span class="empathy-count-badge" id="empathy-count-badge">증상 체크 전</span>
          </div>
          <p class="empathy-checklist-sub">${escHtml(lp.checklistSub || '내가 겪고 있는 일상 속 불편감을 클릭해 체크해 보세요.')}</p>
          <div class="empathy-checklist-list" id="empathy-checklist-list">${checkHtml}
          </div>
          <div class="empathy-severity-board" id="empathy-diagnosis-box" aria-live="polite" style="display:none;">
            <div class="doc-comment-top-row">
              <span class="doc-comment-eyebrow">👨‍⚕️ 안정위 대표원장 닥터 코멘트</span>
              <span class="doc-comment-pill" id="doc-comment-pill">1단계 · 관리 권장</span>
            </div>
            <div class="doc-comment-progress-track">
              <div class="doc-comment-progress-fill" id="doc-comment-bar-fill"></div>
            </div>
            <strong class="doc-comment-headline" id="doc-comment-title">초기 관리 권장</strong>
            <p class="doc-comment-body" id="doc-comment-desc">증상이 더 깊어지기 전에 내원하셔서 예방 및 맞춤 관리를 받아보시길 권합니다.</p>
          </div>
        </div>

        <button id="project-details-launch-cta" onclick="window.openConsultModal()">
          <span class="cta-left-group">
            <span id="project-details-launch-cta-dot"></span>
            <span id="cta-btn-label">${escHtml(lp.ctaButtonText || '우리 아이 맞춤 성장 계획 원장님과 상담하기')}</span>
          </span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path stroke="currentColor" stroke-linecap="round" stroke-width="1.8" d="M7 17 17 7m0 0H8m9 0v9"/>
          </svg>
        </button>
        <a href="${escAttr(lp.extraLinkHref || 'body-explorer.html?part=knee')}" class="extra-detail-link">${escHtml(lp.extraLinkText || '📊 무릎 성장판 · 학술 논문 검증 의학백과 전체보기 ↗')}</a>
      </div>
    </aside>

    <!-- RIGHT HORIZONTAL CARD RUNWAY -->
    <section id="project-details-items-wrapper" aria-label="수평 카드 트랙">
      <div id="project-details-items-move-container">
${cardsHtml}
      </div>
    </section>
  </main>`;
}

const cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
let html = fs.readFileSync(growthHtmlPath, 'utf8');
const mainRe = /<main id="project-details">[\s\S]*?<\/main>/;
if (!mainRe.test(html)) {
  throw new Error('Could not find <main id="project-details"> in growth.html');
}
html = html.replace(mainRe, buildGrowthMainBlock(cfg));
fs.writeFileSync(growthHtmlPath, html, 'utf8');
console.log('✅ Applied growth-cards-config.json -> growth.html (' + html.length + ' bytes)');
