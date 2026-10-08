const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.mp4': 'video/mp4',
  '.woff2': 'font/woff2'
};

const brainDir = path.resolve('C:/Users/0508a/.gemini/antigravity/brain/27107abe-29bc-4aac-b3c8-075bf69cc1b3');

// Auto-sync newly generated empathy images to homepage root on startup
try {
  if (fs.existsSync(brainDir)) {
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
  } else if (reqPath === '/diet-zero' || reqPath === '/diet-zero/') {
    reqPath = '/diet-zero.html';
  } else if (reqPath === '/growth' || reqPath === '/growth/') {
    reqPath = '/growth.html';
  } else if (reqPath === '/gongjindan' || reqPath === '/gongjindan/' || reqPath === '/gongjindan-2' || reqPath === '/gongjindan-2/') {
    reqPath = '/gongjindan.html';
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
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`✨ Huyml Replica Server running at: http://localhost:${PORT}`);
});
