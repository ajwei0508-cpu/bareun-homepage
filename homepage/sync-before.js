const fs = require('fs');
const path = require('path');

const homepageDir = __dirname;
const indexBeforePath = path.join(homepageDir, 'index.html');
const storyAfterPath = path.join(homepageDir, 'story-3d.html');
const storyBeforePath = path.join(homepageDir, 'story-before.html');

// 1. Build story-before.html from current index.html (using prev_life_*.jpg backups) before syncing index.html
let beforeHtml = fs.readFileSync(indexBeforePath, 'utf8');

const imgMap = [
  ['life_1a0_infertility_before.jpg', 'prev_life_1a0_infertility_before.jpg'],
  ['life_1a1_infertility_treatment.jpg', 'prev_life_1a1_infertility_treatment.jpg'],
  ['life_1a_fertilization.jpg', 'prev_life_1a_fertilization.jpg'],
  ['life_1b_birth.jpg', 'prev_life_1b_birth.jpg'],
  ['life_1c_cold_before.jpg', 'prev_life_1c_cold_before.jpg'],
  ['life_1c_clinic_exam.jpg', 'prev_life_1c_clinic_exam.jpg'],
  ['life_1c_immunity.jpg', 'prev_life_1c_immunity.jpg'],
  ['life_1d_growth_short.jpg', 'prev_life_1d_growth_short.jpg'],
  ['life_1d_growth_peers.jpg', 'prev_life_1d_growth_peers.jpg'],
  ['life_2a_obesity.jpg', 'prev_life_2a_obesity.jpg'],
  ['life_2a_treatment.jpg', 'prev_life_2a_treatment.jpg'],
  ['life_2b_slim_therapy.jpg', 'prev_life_2b_slim_therapy.jpg'],
  ['life_3a_hairloss.jpg', 'prev_life_3a_hairloss.jpg'],
  ['life_3a_treatment.jpg', 'prev_life_3a_treatment.jpg'],
  ['life_3a_follicle_zoom.jpg', 'prev_life_3a_follicle_zoom.jpg'],
  ['life_3b_hair_restored.jpg', 'prev_life_3b_hair_restored.jpg'],
  ['life_4a_work_spine_pain.jpg', 'prev_life_4a_work_spine_pain.jpg'],
  ['life_4a_treatment.jpg', 'prev_life_4a_treatment.jpg'],
  ['life_4b_chuna_recovery.jpg', 'prev_life_4b_chuna_recovery.jpg'],
  ['life_5a_aging_fatigue.jpg', 'prev_life_5a_aging_fatigue.jpg'],
  ['life_5b_gongjindan_vitality.jpg', 'prev_life_5b_gongjindan_vitality.jpg'],
  ['life_5c_graceful_elder.jpg', 'prev_life_5c_graceful_elder.jpg']
];

for (const [orig, prev] of imgMap) {
  if (fs.existsSync(path.join(homepageDir, prev))) {
    beforeHtml = beforeHtml.split(orig).join(prev);
  }
}

beforeHtml = beforeHtml.replace(
  '<span class="nav-brand-sub">1ST & 3RD POV 3D CINEMA</span>',
  '<span class="nav-brand-sub" style="color:#F87171;">[BEFORE · 수정 전 비교 버전]</span>'
);

fs.writeFileSync(storyBeforePath, beforeHtml, 'utf8');
console.log('Saved story-before.html (' + beforeHtml.split('\n').length + ' lines)');

// 2. Sync index.html with the updated story-3d.html
const afterHtml = fs.readFileSync(storyAfterPath, 'utf8');
fs.writeFileSync(indexBeforePath, afterHtml, 'utf8');
console.log('Synced index.html with story-3d.html (' + afterHtml.split('\n').length + ' lines)');
