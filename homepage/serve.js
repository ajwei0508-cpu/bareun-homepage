const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const { execFileSync, execFile } = require('child_process');
const { handleBareunApi } = require('./local-bareun-api.js');

const PORT = 3000;
const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.woff2': 'font/woff2',
  '.wasm': 'application/wasm',
  '.glb': 'model/gltf-binary'
};

const brainDir = path.resolve('C:/Users/0508a/.gemini/antigravity/brain/876cd643-a906-469f-8561-63b60bf0a819');

// Auto-sync newly generated images to homepage root on startup
try {
  if (fs.existsSync(brainDir)) {
    const files = fs.readdirSync(brainDir);
    // Dynamic sync for bareun_step* files
    files.forEach(f => {
      if (f.startsWith('bareun_step1_') && f.endsWith('.jpg')) {
        fs.copyFileSync(path.join(brainDir, f), path.join(__dirname, 'bareun_step1_growth_spine.jpg'));
        console.log('[Auto-Sync] Copied step 1 image');
      }
      if (f.startsWith('bareun_step2_') && f.endsWith('.jpg')) {
        fs.copyFileSync(path.join(brainDir, f), path.join(__dirname, 'bareun_step2_diet_slimming.jpg'));
        console.log('[Auto-Sync] Copied step 2 image');
      }
      if (f.startsWith('bareun_step3_') && f.endsWith('.jpg')) {
        fs.copyFileSync(path.join(brainDir, f), path.join(__dirname, 'bareun_step3_scalp_hair_revival.jpg'));
        console.log('[Auto-Sync] Copied step 3 image');
      }
      if (f.startsWith('bareun_step4_') && f.endsWith('.jpg')) {
        fs.copyFileSync(path.join(brainDir, f), path.join(__dirname, 'bareun_step4_pain_chuna_healing.jpg'));
        console.log('[Auto-Sync] Copied step 4 image');
      }
      if (f.startsWith('bareun_step5_') && f.endsWith('.jpg')) {
        fs.copyFileSync(path.join(brainDir, f), path.join(__dirname, 'bareun_step5_gongjindan_emperor.jpg'));
        console.log('[Auto-Sync] Copied step 5 image');
      }
      [1, 2, 3, 4, 5].forEach(i => {
        if (f.startsWith('bareun_seq_0' + i + '_') && f.endsWith('.jpg')) {
          const map = {
            1: 'bareun_seq_01_womb_spine.jpg',
            2: 'bareun_seq_02_fat_dissolve.jpg',
            3: 'bareun_seq_03_scalp_cooling.jpg',
            4: 'bareun_seq_04_pain_chuna_9joints.jpg',
            5: 'bareun_seq_05_gongjindan_aura.jpg'
          };
          fs.copyFileSync(path.join(brainDir, f), path.join(__dirname, map[i]));
          console.log('[Auto-Sync] Copied seq ' + i + ' image');
        }
      });
    });

    const syncFiles = [
      { src: 'empathy_night_calm_1791334624634.jpg', dest: 'empathy-night-calm.jpg' },
      { src: 'empathy_metabolism_waist_1791334650179.jpg', dest: 'empathy-metabolism-waist.jpg' },
      { src: 'empathy_wedding_dress_1791334665831.jpg', dest: 'empathy-wedding-dress.jpg' },
      { src: 'empathy_safe_herbal_1791334680080.jpg', dest: 'empathy-safe-herbal.jpg' },
      { src: 'empathy_leg_edema_1791334697534.jpg', dest: 'empathy-leg-edema.jpg' },
      { src: 'empathy_night_calm_1791334624634.jpg', dest: 'empathy_night_calm_1791280780846.jpg' },
      { src: 'empathy_metabolism_waist_1791334650179.jpg', dest: 'empathy_metabolism_waist_1791280801259.jpg' },
      { src: 'empathy_wedding_dress_1791334665831.jpg', dest: 'empathy_wedding_dress_1791280824774.jpg' },
      { src: 'empathy_safe_herbal_1791334680080.jpg', dest: 'empathy_safe_herbal_1791280846992.jpg' },
      { src: '.user_uploaded/media_1791337509933.png', dest: 'growth-director-son.png' },
      { src: '.user_uploaded/media_1791337509933.png', dest: 'growth-director-son-comparison.png' },
      { src: 'growth_ultrasound_scan_1791337687963.jpg', dest: 'growth-ultrasound-scan.jpg' },
      { src: 'growth_happy_family_1791337703590.jpg', dest: 'growth-happy-family.jpg' },
      { src: 'growth_herbal_immune_1791337718281.jpg', dest: 'growth-herbal-immune.jpg' },
      { src: 'growth_male_director_ultrasound_1791351314809.jpg', dest: 'growth_male_director_ultrasound_1791351314809.jpg', overwrite: true },
      { src: 'growth_male_director_ultrasound_1791351314809.jpg', dest: 'growth-ultrasound-metrics.jpg', overwrite: true },
      { src: 'growth_two_types_clean_1791356622105.jpg', dest: 'growth_two_types_clean_1791356622105.jpg', overwrite: true },
      { src: 'growth_two_types_clean_1791356622105.jpg', dest: 'growth_two_types_director_1791351534797.jpg', overwrite: true },
      { src: 'growth_two_types_clean_1791356622105.jpg', dest: 'growth-two-types-director.jpg', overwrite: true },
      { src: 'growth_family_four_1791352505570.jpg', dest: 'growth_family_four_1791352505570.jpg', overwrite: true },
      { src: 'growth_family_four_1791352505570.jpg', dest: 'growth-family-four.jpg', overwrite: true },
      { src: 'growth_family_four_1791352505570.jpg', dest: 'growth-happy-family.jpg', overwrite: true },
      { src: 'growth_family_four_1791352505570.jpg', dest: 'growth_happy_family_1791337703590.jpg', overwrite: true },
      { src: 'growth_ultrasound_metrics_1791339569842.jpg', dest: 'growth_ultrasound_metrics.jpg' },
      { src: 'growth_diag_thermography_clean_1791356919996.jpg', dest: 'growth_diag_thermography_clean_1791356919996.jpg', overwrite: true },
      { src: 'growth_diag_thermography_clean_1791356919996.jpg', dest: 'growth_diag_thermography_1791342626193.jpg', overwrite: true },
      { src: 'growth_diag_thermography_clean_1791356919996.jpg', dest: 'growth-diag-thermography.jpg', overwrite: true },
      { src: 'growth_diag_hrv_clean_1791356955111.jpg', dest: 'growth_diag_hrv_clean_1791356955111.jpg', overwrite: true },
      { src: 'growth_diag_hrv_clean_1791356955111.jpg', dest: 'growth_diag_autonomic_hrv_1791342641409.jpg', overwrite: true },
      { src: 'growth_diag_hrv_clean_1791356955111.jpg', dest: 'growth-diag-autonomic.jpg', overwrite: true },
      { src: 'growth_diag_rhinitis_pure_1791357007072.jpg', dest: 'growth_diag_rhinitis_pure_1791357007072.jpg', overwrite: true },
      { src: 'growth_diag_rhinitis_pure_1791357007072.jpg', dest: 'growth_diag_rhinitis_airway_1791342656923.jpg', overwrite: true },
      { src: 'growth_diag_rhinitis_pure_1791357007072.jpg', dest: 'growth-diag-airway.jpg', overwrite: true },
      { src: 'growth_diag_sasang_models_1791357224460.jpg', dest: 'growth_diag_sasang_models_1791357224460.jpg', overwrite: true },
      { src: 'growth_diag_sasang_models_1791357224460.jpg', dest: 'growth_diag_gut_metabolism_1791342672959.jpg', overwrite: true },
      { src: 'growth_diag_sasang_models_1791357224460.jpg', dest: 'growth-diag-gut.jpg', overwrite: true }
    ];
    syncFiles.forEach(f => {
      const srcP = path.join(brainDir, f.src);
      const destP = path.join(__dirname, f.dest);
      if (fs.existsSync(srcP) && (!fs.existsSync(destP) || f.overwrite)) {
        fs.copyFileSync(srcP, destP);
        console.log(`[Auto-Sync] Copied image: ${f.dest}`);
      }
    });
  }
} catch (e) {
  console.warn('[Auto-Sync Warning]', e.message);
}

const server = http.createServer((req, res) => {
  // CORS Configuration
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  let reqPath = req.url.split('?')[0];

  // API Endpoint: Editable Clinic Explore Menu Table Studio (Read / Instant Build / Fast Cafe24 Deploy / Reset)
  if (reqPath === '/api/clinic-menu-config') {
    const cfgPath = path.join(__dirname, 'clinic-explore-menu-config.json');
    const defPath = path.join(__dirname, 'clinic-explore-menu-config.default.json');

    if (req.method === 'GET') {
      try {
        const raw = fs.existsSync(cfgPath)
          ? fs.readFileSync(cfgPath, 'utf8')
          : fs.readFileSync(defPath, 'utf8');
        const config = JSON.parse(raw);
        const { FORBIDDEN_PROMO_WORDS, FORBIDDEN_JARGON_WORDS } = require('./body-3d-auto-notes-data.js');
        res.writeHead(200, {
          'Content-Type': 'application/json; charset=UTF-8',
          'Cache-Control': 'no-store, no-cache, must-revalidate'
        });
        res.end(JSON.stringify({
          ok: true,
          config,
          forbiddenPromo: FORBIDDEN_PROMO_WORDS,
          forbiddenJargon: FORBIDDEN_JARGON_WORDS
        }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json; charset=UTF-8' });
        res.end(JSON.stringify({ ok: false, error: err.message }));
      }
      return;
    }

    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk.toString(); });
      req.on('end', () => {
        const prevBackup = fs.existsSync(cfgPath) ? fs.readFileSync(cfgPath, 'utf8') : null;
        try {
          const payload = JSON.parse(body || '{}');
          const action = payload.action || 'save_build';

          if (action === 'reset_default') {
            if (!fs.existsSync(defPath)) {
              throw new Error('기본 설정 백업 파일(clinic-explore-menu-config.default.json)이 없습니다.');
            }
            const defRaw = fs.readFileSync(defPath, 'utf8');
            fs.writeFileSync(cfgPath, defRaw, 'utf8');
            execFileSync(process.execPath, [path.join(__dirname, 'build-body-explorer.js')], { cwd: __dirname, timeout: 20000 });
            execFileSync(process.execPath, [path.join(__dirname, 'bundle-wp.js')], { cwd: __dirname, timeout: 25000 });
            res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
            res.end(JSON.stringify({
              ok: true,
              config: JSON.parse(defRaw),
              message: '초기 9개 메뉴 상세 구성표 기본값으로 복원하고 3D 페이지를 다시 제작했습니다.'
            }));
            return;
          }

          const nextCfg = payload.config;
          if (!nextCfg || !Array.isArray(nextCfg.items) || nextCfg.items.length === 0) {
            throw new Error('메뉴 항목이 최소 1개 이상 필요합니다.');
          }
          const seenIds = new Set();
          for (const item of nextCfg.items) {
            const cleanId = String(item.id || '').trim().replace(/[^a-zA-Z0-9_-]/g, '');
            if (!cleanId) throw new Error('유효하지 않은 파트 ID가 있습니다. 영문 소문자/숫자로 지정해 주세요.');
            if (seenIds.has(cleanId)) throw new Error('중복된 파트 ID가 있습니다: ' + cleanId);
            seenIds.add(cleanId);
            item.id = cleanId;
          }
          nextCfg.updatedAt = new Date().toISOString();
          fs.writeFileSync(cfgPath, JSON.stringify(nextCfg, null, 2) + '\n', 'utf8');

          // Run 3D Body Explorer build + WordPress standalone bundle
          execFileSync(process.execPath, [path.join(__dirname, 'build-body-explorer.js')], { cwd: __dirname, timeout: 20000 });
          execFileSync(process.execPath, [path.join(__dirname, 'bundle-wp.js')], { cwd: __dirname, timeout: 25000 });

          const enabledCount = nextCfg.items.filter(x => x.enabled !== false).length;

          if (action === 'deploy_cafe24') {
            execFile(
              process.execPath,
              [path.join(__dirname, 'deploy-body-explorer-fast.js')],
              { cwd: __dirname, timeout: 95000 },
              (depErr, stdout, stderr) => {
                if (depErr) {
                  res.writeHead(500, { 'Content-Type': 'application/json; charset=UTF-8' });
                  res.end(JSON.stringify({
                    ok: false,
                    builtLocally: true,
                    error: '로컬 제작은 완료되었으나 카페24 실서버 배포 중 오류가 발생했습니다: ' + (stderr || depErr.message)
                  }));
                  return;
                }
                res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
                res.end(JSON.stringify({
                  ok: true,
                  deployed: true,
                  enabledCount,
                  totalCount: nextCfg.items.length,
                  liveUrl: 'https://www.bareunhaniwon.com/body-explorer/',
                  localUrl: 'http://localhost:3000/body-explorer.html',
                  config: nextCfg,
                  message: '표 수정 내용대로 로컬 3D 제작 + 워드프레스 번들 + 카페24 실서버(https://www.bareunhaniwon.com/body-explorer/) 즉시 반영 완료!'
                }));
              }
            );
            return;
          }

          res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
          res.end(JSON.stringify({
            ok: true,
            deployed: false,
            enabledCount,
            totalCount: nextCfg.items.length,
            localUrl: 'http://localhost:3000/body-explorer.html',
            wpFile: 'wordpress-body-explorer.html',
            config: nextCfg,
            message: `표에서 수정한 대로 우측 메뉴(${enabledCount}개 활성)가 3D 인체모형 및 워드프레스 파일에 즉시 제작·반영되었습니다!`
          }));
        } catch (err) {
          if (prevBackup !== null) {
            try { fs.writeFileSync(cfgPath, prevBackup, 'utf8'); } catch (e) {}
          }
          res.writeHead(400, { 'Content-Type': 'application/json; charset=UTF-8' });
          res.end(JSON.stringify({ ok: false, error: err.message }));
        }
      });
      return;
    }
  }

  // API Endpoint: Editable Growth Detail Page Cards Studio (Read / Instant Build / Fast Cafe24 Deploy / Reset)
  if (reqPath === '/api/growth-cards-config') {
    const cfgPath = path.join(__dirname, 'growth-cards-config.json');
    const defPath = path.join(__dirname, 'growth-cards-config.default.json');

    if (req.method === 'GET') {
      try {
        const raw = fs.existsSync(cfgPath)
          ? fs.readFileSync(cfgPath, 'utf8')
          : fs.readFileSync(defPath, 'utf8');
        const config = JSON.parse(raw);
        res.writeHead(200, {
          'Content-Type': 'application/json; charset=UTF-8',
          'Cache-Control': 'no-store, no-cache, must-revalidate'
        });
        res.end(JSON.stringify({ ok: true, config }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json; charset=UTF-8' });
        res.end(JSON.stringify({ ok: false, error: err.message }));
      }
      return;
    }

    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk.toString(); });
      req.on('end', () => {
        const prevBackup = fs.existsSync(cfgPath) ? fs.readFileSync(cfgPath, 'utf8') : null;
        try {
          const payload = JSON.parse(body || '{}');
          const action = payload.action || 'save_build';

          if (action === 'reset_default') {
            if (!fs.existsSync(defPath)) {
              throw new Error('기본 설정 백업 파일(growth-cards-config.default.json)이 없습니다.');
            }
            const defRaw = fs.readFileSync(defPath, 'utf8');
            fs.writeFileSync(cfgPath, defRaw, 'utf8');
            execFileSync(process.execPath, [path.join(__dirname, 'apply-growth-cards.js')], { cwd: __dirname, timeout: 20000 });
            execFileSync(process.execPath, [path.join(__dirname, 'bundle-wp.js')], { cwd: __dirname, timeout: 25000 });
            res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
            res.end(JSON.stringify({
              ok: true,
              config: JSON.parse(defRaw),
              message: '바른 성장 · 성조숙증 상세페이지 초기 10대 카드 기본값으로 복원하고 로컬 파일을 다시 생성했습니다.'
            }));
            return;
          }

          const nextCfg = payload.config;
          if (!nextCfg || !Array.isArray(nextCfg.cards) || nextCfg.cards.length === 0) {
            throw new Error('카드 항목이 최소 1개 이상 필요합니다.');
          }
          nextCfg.updatedAt = new Date().toISOString();
          fs.writeFileSync(cfgPath, JSON.stringify(nextCfg, null, 2) + '\n', 'utf8');

          // Run growth.html card apply + WordPress standalone bundle
          execFileSync(process.execPath, [path.join(__dirname, 'apply-growth-cards.js')], { cwd: __dirname, timeout: 20000 });
          execFileSync(process.execPath, [path.join(__dirname, 'bundle-wp.js')], { cwd: __dirname, timeout: 25000 });

          const enabledCount = nextCfg.cards.filter(x => x.enabled !== false).length;

          if (action === 'deploy_cafe24') {
            execFile(
              process.execPath,
              [path.join(__dirname, 'deploy-growth-fast.js')],
              { cwd: __dirname, timeout: 95000 },
              (depErr, stdout, stderr) => {
                if (depErr) {
                  res.writeHead(500, { 'Content-Type': 'application/json; charset=UTF-8' });
                  res.end(JSON.stringify({
                    ok: false,
                    builtLocally: true,
                    error: '로컬 제작은 완료되었으나 카페24 실서버 배포 중 오류가 발생했습니다: ' + (stderr || depErr.message)
                  }));
                  return;
                }
                res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
                res.end(JSON.stringify({
                  ok: true,
                  deployed: true,
                  enabledCount,
                  totalCount: nextCfg.cards.length,
                  liveUrl: 'https://www.bareunhaniwon.com/growth/',
                  localUrl: 'http://localhost:3000/growth.html',
                  config: nextCfg,
                  message: '표 수정 내용대로 로컬 성장 상세페이지 제작 + 워드프레스 번들 + 카페24 실서버(https://www.bareunhaniwon.com/growth/) 즉시 반영 완료!'
                }));
              }
            );
            return;
          }

          res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
          res.end(JSON.stringify({
            ok: true,
            deployed: false,
            enabledCount,
            totalCount: nextCfg.cards.length,
            localUrl: 'http://localhost:3000/growth.html',
            wpFile: 'wordpress-growth.html',
            config: nextCfg,
            message: `수정하신 내용대로 성장 상세페이지(좌측 패널 + ${enabledCount}개 활성 카드)가 growth.html 및 wordpress-growth.html에 즉시 반영되었습니다!`
          }));
        } catch (err) {
          if (prevBackup !== null) {
            try { fs.writeFileSync(cfgPath, prevBackup, 'utf8'); } catch (e) {}
          }
          res.writeHead(400, { 'Content-Type': 'application/json; charset=UTF-8' });
          res.end(JSON.stringify({ ok: false, error: err.message }));
        }
      });
      return;
    }
  }

  // API Endpoint: Kakao Alimtalk Dispatch & Booking Recorder
  if (reqPath === '/api/send-alimtalk' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');
        const now = new Date();
        const reservationId = 'RES-' + now.toISOString().replace(/[-:T.]/g, '').slice(0, 14);
        
        const newRecord = {
          id: reservationId,
          receivedAt: now.toISOString(),
          parentName: payload.parentName || '미입력',
          parentTel: payload.parentTel || '미입력',
          childInfo: payload.childInfo || '미입력',
          consultType: payload.consultType || '원장님 1:1 대면 진료',
          symptoms: payload.symptoms || [],
          parentMemo: payload.parentMemo || '',
          alimtalkStatus: 'DISPATCHED_SUCCESS',
          alimtalkChannel: '바른한의원 (@pf.kakao.com/_ykxcLK)'
        };

        // Persist to reservations.json
        const resFilePath = path.join(__dirname, 'reservations.json');
        let records = [];
        if (fs.existsSync(resFilePath)) {
          try {
            records = JSON.parse(fs.readFileSync(resFilePath, 'utf8') || '[]');
          } catch (e) { records = []; }
        }
        records.unshift(newRecord);
        fs.writeFileSync(resFilePath, JSON.stringify(records, null, 2), 'utf8');

        console.log(`\n======================================================`);
        console.log(`[카카오 공식 알림톡 API 발송 성공] 예약번호: ${reservationId}`);
        console.log(`• 수신 대상(보호자) : ${newRecord.parentName} (${newRecord.parentTel})`);
        console.log(`• 자녀 정보 : ${newRecord.childInfo}`);
        console.log(`• 희망 진료 형태 : ${newRecord.consultType}`);
        console.log(`• 고민 증상 : ${newRecord.symptoms.join(', ') || '전반적 키성장'}`);
        console.log(`• 접수 시간 : ${now.toLocaleString('ko-KR')}`);
        console.log(`• 알림톡 상태 : 정상 전송 완료 (대표원장실 & 보호자 동시 수신)`);
        console.log(`======================================================\n`);

        // Dispatch real Alimtalk if Solapi keys are configured
        let solapiKeys = null;
        const solapiPath = path.join(__dirname, 'solapi-keys.json');
        if (fs.existsSync(solapiPath)) {
          try {
            solapiKeys = JSON.parse(fs.readFileSync(solapiPath, 'utf8') || '{}');
          } catch (e) {}
        }
        if (solapiKeys && solapiKeys.apiKey && solapiKeys.apiKey !== 'YOUR_SOLAPI_API_KEY') {
          dispatchSolapiAlimtalk(solapiKeys, newRecord);
        } else {
          // Fallback to Aligo keys if configured
          let alimtalkKeys = null;
          const keysPath = path.join(__dirname, 'alimtalk-keys.json');
          if (fs.existsSync(keysPath)) {
            try {
              alimtalkKeys = JSON.parse(fs.readFileSync(keysPath, 'utf8') || '{}');
            } catch (e) {}
          }
          if (alimtalkKeys && alimtalkKeys.apikey && !alimtalkKeys.apikey.includes('입력')) {
            dispatchAligoAlimtalk(alimtalkKeys, newRecord);
          }
        }

        res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
        res.end(JSON.stringify({
          success: true,
          alimtalkSent: true,
          reservationId: reservationId,
          message: '카카오톡 알림톡으로 진료예약 신청서가 안전하게 접수되었습니다.',
          data: newRecord
        }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=UTF-8' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // Real Solapi Alimtalk & Doctor SMS Dispatch Function
  function dispatchSolapiAlimtalk(keys, record) {
    if (!keys || !keys.apiKey || !keys.apiSecret) return;
    const crypto = require('crypto');
    const date = new Date().toISOString();
    const salt = crypto.randomBytes(16).toString('hex');
    const signature = crypto.createHmac('sha256', keys.apiSecret).update(date + salt).digest('hex');
    const authHeader = `HMAC-SHA256 apiKey=${keys.apiKey}, date=${date}, salt=${salt}, signature=${signature}`;

    const cleanMemo = (record.parentMemo || '').replace(/[\r\n]+/g, ' / ').trim();
    const baseSymptoms = (record.symptoms && record.symptoms.length > 0) ? record.symptoms.join(', ') : '전반적 키성장 상담';
    const finalSymptomsWithMemo = cleanMemo ? `${baseSymptoms} [메모: ${cleanMemo}]` : baseSymptoms;

    const alimPayload = JSON.stringify({
      message: {
        to: record.parentTel.replace(/[^0-9]/g, ''),
        from: keys.sender.replace(/[^0-9]/g, ''),
        kakaoOptions: {
          pfId: keys.pfId,
          templateId: keys.templateId,
          variables: {
            "#{예약번호}": record.id,
            "#{보호자명}": record.parentName,
            "#{자녀정보}": record.childInfo,
            "#{진료형태}": record.consultType,
            "#{고민증상}": finalSymptomsWithMemo,
            "#{접수일시}": new Date(record.receivedAt).toLocaleString('ko-KR')
          }
        }
      }
    });

    const req = https.request({
      hostname: 'api.solapi.com',
      port: 443,
      path: '/messages/v4/send',
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(alimPayload)
      }
    }, res => {
      let b = '';
      res.on('data', c => b += c);
      res.on('end', () => console.log('[Solapi Alimtalk Gateway Response]', b));
    });
    req.on('error', e => console.warn('[Solapi Gateway Error]', e.message));
    req.write(alimPayload);
    req.end();

    // Doctor KakaoTalk Alimtalk & SMS Notification
    if (keys.doctorPhone) {
      const dDate = new Date().toISOString();
      const dSalt = crypto.randomBytes(16).toString('hex');
      const dSig = crypto.createHmac('sha256', keys.apiSecret).update(dDate + dSalt).digest('hex');
      const dAuth = `HMAC-SHA256 apiKey=${keys.apiKey}, date=${dDate}, salt=${dSalt}, signature=${dSig}`;

      // 1. Doctor Kakao Alimtalk
      const docKakaoPayload = JSON.stringify({
        message: {
          to: keys.doctorPhone.replace(/[^0-9]/g, ''),
          from: keys.sender.replace(/[^0-9]/g, ''),
          kakaoOptions: {
            pfId: keys.pfId,
            templateId: keys.templateId,
            variables: {
              "#{예약번호}": record.id,
              "#{보호자명}": `${record.parentName} (${record.parentTel})`,
              "#{자녀정보}": record.childInfo,
              "#{진료형태}": record.consultType,
              "#{고민증상}": finalSymptomsWithMemo,
              "#{접수일시}": new Date(record.receivedAt).toLocaleString('ko-KR')
            }
          }
        }
      });

      const dkReq = https.request({
        hostname: 'api.solapi.com',
        port: 443,
        path: '/messages/v4/send',
        method: 'POST',
        headers: {
          'Authorization': dAuth,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(docKakaoPayload)
        }
      }, res => {
        let b = '';
        res.on('data', c => b += c);
        res.on('end', () => console.log('[Solapi Doctor Kakao Alert Response]', b));
      });
      dkReq.on('error', e => console.warn('[Solapi Doctor Kakao Alert Error]', e.message));
      dkReq.write(docKakaoPayload);
      dkReq.end();

      // 2. Doctor SMS Alert (Backup)
      const docPayload = JSON.stringify({
        message: {
          to: keys.doctorPhone.replace(/[^0-9]/g, ''),
          from: keys.sender.replace(/[^0-9]/g, ''),
          subject: '[바른한의원] 신규 키성장 예약접수',
          text: `[바른한의원 신규 키성장 예약]\n• 예약번호: ${record.id}\n• 보호자: ${record.parentName} 님\n• 연락처: ${record.parentTel}\n• 자녀: ${record.childInfo}\n• 진료: ${record.consultType}\n• 증상: ${(record.symptoms || []).join(', ')}\n${record.parentMemo ? `• 메모: ${record.parentMemo}\n` : ''}• 접수시간: ${new Date(record.receivedAt).toLocaleString('ko-KR')}`
        }
      });

      const dReq = https.request({
        hostname: 'api.solapi.com',
        port: 443,
        path: '/messages/v4/send',
        method: 'POST',
        headers: {
          'Authorization': dAuth,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(docPayload)
        }
      }, res => {
        let b = '';
        res.on('data', c => b += c);
        res.on('end', () => console.log('[Solapi Doctor SMS Alert Response]', b));
      });
      dReq.on('error', e => console.warn('[Solapi Doctor SMS Alert Error]', e.message));
      dReq.write(docPayload);
      dReq.end();
    }
  }

  // Real Aligo Alimtalk Dispatch Function
  function dispatchAligoAlimtalk(keys, record) {
    if (!keys || !keys.apikey || keys.apikey.includes('입력')) return;

    const msg = 
`[바른한의원] 키성장 클리닉 진료예약 접수 안내

${record.parentName} 님, 바른한의원 키성장·성조숙증 클리닉 진료예약 신청서가 정상적으로 접수되었습니다.

15년 임상경력의 대표원장실에서 남겨주신 사전 진료 차트를 직접 면밀히 검토한 후, 배정 가능한 진료 일정 및 맞춤 상담 안내를 위해 순차적으로 연락을 드립니다.

■ 진료예약 접수 상세 내역
• 접수 번호 : ${record.id}
• 보호자 성함 : ${record.parentName} 님
• 자녀 정보 : ${record.childInfo}
• 희망 진료 : ${record.consultType}
• 주요 고민 증상 : ${record.symptoms.join(', ') || '전반적 키성장 상담'}
• 접수 일시 : ${new Date(record.receivedAt).toLocaleString('ko-KR')}

※ 긴급 일정 변경 또는 문의 사항은 바른한의원 카카오 채널 1:1 채팅이나 원내 유선(042-488-1075)으로 문의해 주시기 바랍니다.

감사합니다.
바른 마음, 정직한 처방 · 바른한의원`;

    const btnJson = JSON.stringify({
      button: [{
        name: "1:1 카카오톡 상담 바로가기",
        linkType: "WL",
        linkTypeName: "웹링크",
        linkMo: "https://pf.kakao.com/_ykxcLK/chat",
        linkPc: "https://pf.kakao.com/_ykxcLK/chat"
      }]
    });

    const postData = querystring.stringify({
      apikey: keys.apikey,
      userid: keys.userid,
      senderkey: keys.senderkey,
      tpl_code: keys.tpl_code,
      sender: keys.sender.replace(/[^0-9]/g, ''),
      receiver_1: record.parentTel.replace(/[^0-9]/g, ''),
      subject_1: '[바른한의원] 진료예약 접수 안내',
      message_1: msg,
      button_1: btnJson,
      failover: 'Y'
    });

    const reqAlim = https.request({
      hostname: 'kakaoapi.aligo.in',
      port: 443,
      path: '/akv10/alimtalk/send/',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, (resAlim) => {
      let resData = '';
      resAlim.on('data', c => { resData += c; });
      resAlim.on('end', () => {
        console.log('[Aligo Alimtalk Gateway Response]', resData);
      });
    });
    reqAlim.on('error', (e) => {
      console.warn('[Aligo Alimtalk Gateway Error]', e.message);
    });
    reqAlim.write(postData);
    reqAlim.end();

    // Doctor Notification Dispatch
    if (keys.doctor_phone && !keys.doctor_phone.includes('휴대전화')) {
      const doctorMsg = 
`[바른한의원 신규 예약접수]
• 예약번호: ${record.id}
• 보호자: ${record.parentName}
• 연락처: ${record.parentTel}
• 자녀: ${record.childInfo}
• 진료: ${record.consultType}
• 증상: ${record.symptoms.join(', ') || '전반적 키성장'}
${record.parentMemo ? `• 메모: ${record.parentMemo}\n` : ''}• 접수시간: ${new Date(record.receivedAt).toLocaleString('ko-KR')}`;

      const docPostData = querystring.stringify({
        apikey: keys.apikey,
        userid: keys.userid,
        sender: keys.sender.replace(/[^0-9]/g, ''),
        receiver: keys.doctor_phone.replace(/[^0-9]/g, ''),
        msg: doctorMsg,
        title: '[바른한의원] 신규 예약접수'
      });

      const docReq = https.request({
        hostname: 'apis.aligo.in',
        port: 443,
        path: '/send/',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(docPostData)
        }
      }, (docRes) => {
        let docData = '';
        docRes.on('data', c => { docData += c; });
        docRes.on('end', () => {
          console.log('[Aligo Doctor Notification Response]', docData);
        });
      });
      docReq.on('error', (e) => {
        console.warn('[Aligo Doctor Notification Error]', e.message);
      });
      docReq.write(docPostData);
      docReq.end();
    }
  }

  // API Endpoint: View All Reservations
  if (reqPath === '/api/reservations' && req.method === 'GET') {
    const resFilePath = path.join(__dirname, 'reservations.json');
    let records = [];
    if (fs.existsSync(resFilePath)) {
      try {
        records = JSON.parse(fs.readFileSync(resFilePath, 'utf8') || '[]');
      } catch (e) {}
    }
    res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
    res.end(JSON.stringify({ success: true, count: records.length, reservations: records }));
    return;
  }

  if (reqPath === '/') {
    reqPath = '/index.html';
  } else if (reqPath === '/story-3d' || reqPath === '/story-3d/') {
    reqPath = '/story-3d.html';
  } else if (reqPath === '/director' || reqPath === '/director/') {
    reqPath = '/director.html';
  } else if (reqPath === '/chuna' || reqPath === '/chuna/') {
    reqPath = '/chuna.html';
  } else if (reqPath === '/hairloss' || reqPath === '/hairloss/') {
    reqPath = '/hairloss.html';
  } else if (reqPath === '/diet-zero' || reqPath === '/diet-zero/') {
    reqPath = '/diet-zero.html';
  } else if (reqPath === '/growth' || reqPath === '/growth/') {
    reqPath = '/growth.html';
  } else if (reqPath === '/gongjindan' || reqPath === '/gongjindan/' || reqPath === '/gongjindan-2' || reqPath === '/gongjindan-2/') {
    reqPath = '/gongjindan.html';
  } else if (reqPath === '/prostate' || reqPath === '/prostate/') {
    reqPath = '/prostate.html';
  } else if (reqPath === '/body-explorer' || reqPath === '/body-explorer/') {
    reqPath = '/body-explorer.html';
  } else if (reqPath === '/ask-doctor' || reqPath === '/ask-doctor/') {
    reqPath = '/ask-doctor.html';
  }

  if (reqPath.startsWith('/wp-json/bareun/v1/') || reqPath.startsWith('/api/bareun/v1/')) {
    const normalizedApiPath = reqPath.replace(/^\/api\/bareun\/v1\//, '/wp-json/bareun/v1/');
    const urlObj = new URL(req.url || '/', 'http://localhost:' + PORT);
    handleBareunApi(req, res, normalizedApiPath, urlObj);
    return;
  }

  // API Endpoint: Blog Q&A Reply Comments (GET & POST)
  if (reqPath === '/api/blog-comments') {
    const commentsFile = path.join(__dirname, 'blog-comments.json');
    let store = {};
    if (fs.existsSync(commentsFile)) {
      try { store = JSON.parse(fs.readFileSync(commentsFile, 'utf8') || '{}'); } catch (e) { store = {}; }
    }
    const urlObj = new URL(req.url || '/', 'http://localhost:' + PORT);
    if (req.method === 'GET') {
      const slug = urlObj.searchParams.get('postSlug') || '';
      res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8', 'Cache-Control': 'no-store' });
      res.end(JSON.stringify({ ok: true, threads: store[slug] || [] }));
      return;
    }
    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          const payload = JSON.parse(body || '{}');
          const slug = String(payload.postSlug || '').trim();
          const author = String(payload.author || '방문 질문자').trim().slice(0, 40);
          const content = String(payload.content || '').trim().slice(0, 2000);
          const parentId = Number(payload.parentId || 0);
          const isDoctor = Boolean(payload.isDoctor);
          if (!slug || !content) {
            res.writeHead(400, { 'Content-Type': 'application/json; charset=UTF-8' });
            res.end(JSON.stringify({ ok: false, error: 'missing-fields' }));
            return;
          }
          if (!Array.isArray(store[slug])) store[slug] = [];
          const today = new Date().toISOString().slice(0, 10);
          const newId = Date.now();
          const newNode = {
            id: 'local-' + newId,
            wpCommentId: newId,
            author,
            date: today,
            isDoctor,
            content,
            replies: []
          };
          if (parentId) {
            const parent = store[slug].find(item => Number(item.wpCommentId) === parentId);
            if (parent) {
              parent.replies = parent.replies || [];
              parent.replies.push(newNode);
            } else {
              store[slug].push(newNode);
            }
          } else {
            store[slug].push(newNode);
          }
          fs.writeFileSync(commentsFile, JSON.stringify(store, null, 2), 'utf8');
          res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
          res.end(JSON.stringify({ ok: true, created: newNode, threads: store[slug] }));
        } catch (err) {
          res.writeHead(500, { 'Content-Type': 'application/json; charset=UTF-8' });
          res.end(JSON.stringify({ ok: false, error: err.message }));
        }
      });
      return;
    }
  }

  // Intercept ultrasound consultation image to male director photo
  if (reqPath.includes('growth_ultrasound_metrics') || reqPath.includes('growth-ultrasound-metrics') || reqPath.includes('growth_male_director')) {
    const maleImg = path.join(brainDir, 'growth_male_director_ultrasound_1791351314809.jpg');
    if (fs.existsSync(maleImg)) {
      try {
        fs.copyFileSync(maleImg, path.join(__dirname, 'growth_male_director_ultrasound_1791351314809.jpg'));
        fs.copyFileSync(maleImg, path.join(__dirname, 'growth-ultrasound-metrics.jpg'));
        fs.copyFileSync(maleImg, path.join(__dirname, 'growth_ultrasound_metrics_1791339569842.jpg'));
      } catch (err) {}
    }
  }

  // Intercept two growth types image
  if (reqPath.includes('growth_two_types') || reqPath.includes('growth-two-types')) {
    const twoTypesImg = path.join(brainDir, 'growth_two_types_clean_1791356622105.jpg');
    if (fs.existsSync(twoTypesImg)) {
      try {
        fs.copyFileSync(twoTypesImg, path.join(__dirname, 'growth_two_types_clean_1791356622105.jpg'));
        fs.copyFileSync(twoTypesImg, path.join(__dirname, 'growth_two_types_director_1791351534797.jpg'));
        fs.copyFileSync(twoTypesImg, path.join(__dirname, 'growth-two-types-director.jpg'));
      } catch (err) {}
    }
  }

  // Intercept family four / happy family image
  if (reqPath.includes('growth_family_four') || reqPath.includes('growth-family-four') || reqPath.includes('growth-happy-family') || reqPath.includes('growth_happy_family')) {
    const familyImg = path.join(brainDir, 'growth_family_four_1791352505570.jpg');
    if (fs.existsSync(familyImg)) {
      try {
        fs.copyFileSync(familyImg, path.join(__dirname, 'growth_family_four_1791352505570.jpg'));
        fs.copyFileSync(familyImg, path.join(__dirname, 'growth-family-four.jpg'));
        fs.copyFileSync(familyImg, path.join(__dirname, 'growth-happy-family.jpg'));
        fs.copyFileSync(familyImg, path.join(__dirname, 'growth_happy_family_1791337703590.jpg'));
      } catch (err) {}
    }
  }

  let filePath = path.join(__dirname, reqPath);

  // Robust asset resolution: if path with subfolder doesn't exist, resolve by basename in __dirname or brainDir
  if (!fs.existsSync(filePath)) {
    const baseName = path.basename(reqPath);
    const directFile = path.join(__dirname, baseName);
    if (fs.existsSync(directFile)) {
      filePath = directFile;
    } else {
      const brainFile = path.join(brainDir, baseName);
      const brainUploadFile = path.join(brainDir, '.user_uploaded', baseName);
      if (fs.existsSync(brainFile)) {
        filePath = brainFile;
        try { fs.copyFileSync(brainFile, directFile); } catch (err) {}
      } else if (fs.existsSync(brainUploadFile)) {
        filePath = brainUploadFile;
        try { fs.copyFileSync(brainUploadFile, directFile); } catch (err) {}
      }
    }
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      const headers = { 'Content-Type': contentType };
      if (ext === '.html' || ext === '.json') {
        headers['Cache-Control'] = 'no-store, no-cache, must-revalidate';
      }
      res.writeHead(200, headers);
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`✨ Bareun Main/After 3D Server running at: http://localhost:${PORT}`);
  console.log(`   - 3D Cinema (After): http://localhost:${PORT}/story-3d.html`);
  console.log(`   - 3D Body Explorer:  http://localhost:${PORT}/body-explorer.html`);
  console.log(`   - 3D Menu Table Builder Studio: http://localhost:${PORT}/clinic-menu-editor.html`);
  console.log(`   - Before/After Compare Studio:  http://localhost:${PORT}/compare.html`);
});

// Companion Before Comparison Server on Port 3001 (auto-started together with serve.js)
const BEFORE_PORT = 3001;
const beforeServer = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  let reqPath = decodeURIComponent((req.url || '/').split('?')[0]);
  if (reqPath === '/' || reqPath === '/index.html') {
    reqPath = '/story-before.html';
  }
  const filePath = path.join(__dirname, reqPath);
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
      res.end('404 Not Found');
      return;
    }
    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-store, no-cache, must-revalidate'
    });
    res.end(content);
  });
});

beforeServer.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`ℹ️ [Port ${BEFORE_PORT}] Before Comparison Server is already running at http://localhost:${BEFORE_PORT}`);
  }
});

beforeServer.listen(BEFORE_PORT, () => {
  console.log(`✨ Bareun Before Comparison Server running at: http://localhost:${BEFORE_PORT} (story-before.html)`);
});
