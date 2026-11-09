const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const dir = __dirname;
const growthCfgPath = path.join(dir, 'growth-cards-config.json');
const masterCfgPath = path.join(dir, 'detail-pages-config.json');

const growthCfg = JSON.parse(fs.readFileSync(growthCfgPath, 'utf8'));
const masterCfg = JSON.parse(fs.readFileSync(masterCfgPath, 'utf8'));

const growthPage = masterCfg.pages.find(p => p.file === 'growth.html');
if (!growthPage) {
  throw new Error('Could not find growth.html in detail-pages-config.json');
}

const lp = growthCfg.leftPanel || {};
growthPage.meta.eyebrow = lp.eyebrow || growthPage.meta.eyebrow;
growthPage.meta.title = lp.title || growthPage.meta.title;
growthPage.meta.subtitleEn = lp.subtitleEn || growthPage.meta.subtitleEn;
if (lp.description) growthPage.meta.desc = [lp.description];
growthPage.meta.checklistTitle = lp.checklistTitle || growthPage.meta.checklistTitle;
growthPage.meta.checklistSub = lp.checklistSub || growthPage.meta.checklistSub;
if (Array.isArray(lp.checklistItems)) growthPage.meta.checklistItems = lp.checklistItems;
if (lp.ctaButtonText) growthPage.meta.ctaText = lp.ctaButtonText;
if (lp.extraLinkText || lp.extraLinkHref) {
  growthPage.meta.extraLink = {
    text: lp.extraLinkText || '',
    href: lp.extraLinkHref || 'body-explorer.html?part=knee'
  };
}

const cards = Array.isArray(growthCfg.cards) ? growthCfg.cards : [];
const newPlates = [];

cards.forEach((c, idx) => {
  if (c.type === '3d-body-link') {
    growthPage.bodyModelCard = Object.assign({}, growthPage.bodyModelCard, {
      enabled: c.enabled !== false,
      honeyTipLabel: ((c.titlePrefix || '') + (c.titleHighlight || '') + (c.titleSuffix || '')).trim() || '성장 꿀팁',
      href: c.linkHref || 'body-explorer.html?part=knee'
    });
    return;
  }

  const hiRaw = String(c.titleHighlight || '').trim();
  const hiWrapped = hiRaw
    ? (hiRaw.startsWith("'") && hiRaw.endsWith("'") ? hiRaw : `'${hiRaw}'`)
    : '';
  const combinedTitle = `${c.titlePrefix || ''}${hiWrapped}${c.titleSuffix || ''}`;

  const base = {
    id: c.id || `card${String(idx + 1).padStart(2, '0')}`,
    enabled: c.enabled !== false,
    fullscreen: true,
    title: combinedTitle,
    sub: c.subtitle || '',
    pillars: Array.isArray(c.pillars) ? c.pillars : [],
    tags: Array.isArray(c.tags) ? c.tags : []
  };

  if (c.type === 'son-hero') {
    Object.assign(base, {
      type: 'growth-son-main-hero',
      imgSrc: c.mainImage || 'growth-director-son.png',
      badge: c.badge,
      letterEyebrow: c.letterEyebrow,
      letterHeadlineLine1: c.letterHeadlineLine1,
      letterHeadlineLine2: c.letterHeadlineLine2,
      letterParagraphs: c.letterParagraphs,
      chips: c.chips,
      signPrefix: c.signPrefix,
      signName: c.signName,
      signSuffix: c.signSuffix,
      blogBtnText: c.blogBtnText,
      blogUrl: c.blogUrl
    });
  } else if (c.type === 'obese-to-tall-motion') {
    Object.assign(base, {
      type: 'diet-single-stage',
      stage: 3,
      frames: c.seqImages || [
        'growth_minimal_card3_obese_to_tall_a.jpg?v=grw3v2',
        'growth_minimal_card3_obese_to_tall_b.jpg?v=grw3v2',
        'growth_minimal_card3_obese_to_tall_c.jpg?v=grw3v2'
      ]
    });
  } else if (c.type === 'short-to-tall-motion') {
    Object.assign(base, {
      type: 'diet-single-stage',
      stage: 4,
      laserBadge: c.laserBadge || '▲ 성장판 연골 증식 · 수직 폭풍 성장 UP',
      frames: c.seqImages || [
        'growth_minimal_card4_short_before.jpg?v=grw4v3',
        'growth_minimal_card4_growing_mid.jpg?v=grw4v3',
        'growth_minimal_card4_tall_after.jpg?v=grw4v3'
      ]
    });
  } else if (c.type === 'neuro-sleep-motion') {
    Object.assign(base, {
      type: 'diet-single-stage',
      stage: 1,
      imgSrc: c.mainImage || 'growth-child-sleep.jpg'
    });
  } else if (c.type === 'multi-frame-trouble') {
    Object.assign(base, {
      type: 'motion-story',
      fx: 'sunlight-bokeh',
      durationSec: 6.6,
      hideTopBar: true,
      stepBtnText: c.stepBtnText || '다음 장면 ⟳',
      frames: c.seqImages || [
        'detail_growth_story1_wall_chart.jpg?v=grw1',
        'detail_growth_story1_mouth_breathing.jpg?v=grw1',
        'growth_minimal_card9_picky_eating.jpg?v=grw9'
      ]
    });
  } else {
    Object.assign(base, {
      type: 'clean-image',
      imgSrc: c.mainImage || 'detail_growth_story2_supplements_limit.jpg?v=grw2'
    });
  }
  newPlates.push(base);
});

growthPage.plates = newPlates;
masterCfg.updatedAt = new Date().toISOString();
fs.writeFileSync(masterCfgPath, JSON.stringify(masterCfg, null, 2) + '\n', 'utf8');

execFileSync(process.execPath, [path.join(dir, 'build-story-detail-pages.js'), '--page=growth.html'], {
  cwd: dir,
  stdio: 'inherit'
});
console.log('✅ Synced growth-cards-config.json -> detail-pages-config.json -> Sample A growth.html');
