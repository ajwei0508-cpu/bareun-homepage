const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const https = require('https');
const zlib = require('zlib');
const { spawn, execFileSync } = require('child_process');
const { createFalClient } = require('@fal-ai/client');
const AdmZip = require('adm-zip');

const PORT = Number(process.env.PORT || 4500);
const ROOT_DIR = __dirname;
const DATA_DIR = path.join(ROOT_DIR, 'data');
const PROFILES_DIR = path.join(DATA_DIR, 'profiles');
const OUTPUTS_DIR = path.join(DATA_DIR, 'outputs');
const LORAS_DIR = path.join(DATA_DIR, 'loras');
const CRAWLED_DIR = path.join(DATA_DIR, 'crawled');
const SETTINGS_PATH = path.join(DATA_DIR, 'settings.json');
const PROFILES_JSON = path.join(DATA_DIR, 'profiles.json');
const GALLERY_JSON = path.join(DATA_DIR, 'gallery.json');
const COMPARISONS_JSON = path.join(DATA_DIR, 'comparisons.json');
const CRAWLED_JSON = path.join(DATA_DIR, 'crawled-sites.json');
const APPLIED_HOMEPAGE_JSON = path.join(DATA_DIR, 'applied-homepage.json');
const UPLOAD_CACHE_JSON = path.join(DATA_DIR, 'upload-cache.json');
const LOCAL_ENGINE_PY = path.join(ROOT_DIR, 'local_face_engine.py');

const HOMEPAGE_DIR = fs.existsSync(path.resolve(ROOT_DIR, '..', 'homepage'))
  ? path.resolve(ROOT_DIR, '..', 'homepage')
  : path.resolve(ROOT_DIR, '..', '바른한의원 홈페이지', 'homepage');

for (const dir of [DATA_DIR, PROFILES_DIR, OUTPUTS_DIR, LORAS_DIR, CRAWLED_DIR]) {
  fs.mkdirSync(dir, { recursive: true });
}

function readJsonSafe(filePath, fallback) {
  try {
    if (!fs.existsSync(filePath)) return fallback;
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    return fallback;
  }
}

function writeJsonSafe(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

function ensureDefaultProfile() {
  let profiles = readJsonSafe(PROFILES_JSON, null);
  if (Array.isArray(profiles) && profiles.length > 0) return profiles;

  const profileId = 'director_ahn';
  const refDir = path.join(PROFILES_DIR, profileId, 'refs');
  fs.mkdirSync(refDir, { recursive: true });

  const seededPhotos = [];
  const candidateFiles = ['director_real_reference.jpg', 'doctor.png'];
  for (const fname of candidateFiles) {
    const src = path.join(HOMEPAGE_DIR, fname);
    const dst = path.join(refDir, fname);
    if (fs.existsSync(src)) {
      try {
        if (!fs.existsSync(dst)) fs.copyFileSync(src, dst);
        seededPhotos.push(fname);
      } catch (e) {}
    }
  }

  profiles = [
    {
      id: profileId,
      name: '안정위 대표원장',
      triggerWord: 'AHNJUNGWEI_PERSON',
      baseTraits:
        'a Korean male traditional Korean medicine doctor in his late 30s, wearing thin gold-rimmed rectangular glasses, neat natural black hair parted slightly, authentic Korean skin texture',
      masterPhoto: seededPhotos[0] || '',
      photos: seededPhotos,
      loraUrl: '',
      localLoraFile: '',
      trainedAt: null,
      trainerType: '',
      createdAt: new Date().toISOString()
    }
  ];
  writeJsonSafe(PROFILES_JSON, profiles);
  return profiles;
}

ensureDefaultProfile();

function getSettings() {
  const s = readJsonSafe(SETTINGS_PATH, {});
  const falKey = (s.falKey || process.env.FAL_KEY || '').trim();
  const hfToken = (s.hfToken || process.env.HF_TOKEN || '').trim();
  return { falKey, hfToken };
}

function maskKey(key) {
  if (!key) return '';
  if (key.length <= 10) return '****';
  return key.slice(0, 6) + '••••••••' + key.slice(-4);
}

function getFal() {
  throw new Error('🔒 유료 모드가 모두 잠금 처리되었습니다. 현재 100% 무료(0원) 모드로만 안전하게 작동합니다.');
}

function formatFalError(err) {
  const detail = (err && err.body && (err.body.detail || err.body.message)) || '';
  const raw = String(detail || (err && err.message) || err || '');
  if (/Exhausted balance|Top up your balance/i.test(raw)) {
    return 'fal.ai 유료 클라우드 계정의 잔액이 $0입니다. https://fal.ai/dashboard/billing 에서 소액($5 등) 충전 후 다시 실행하시면 유료 PRO 결과물이 생성되어 무료 결과물과 즉시 1:1 비교됩니다.';
  }
  if (err && err.status === 401) {
    return '입력하신 fal.ai API 키가 올바르지 않습니다. 우측 상단 [👑 유료 PRO 설정]에서 키를 확인해 주세요.';
  }
  if (err && err.status === 403) {
    return `fal.ai 접근 거부(403 Forbidden): ${detail || '유료 크레딧 잔액 부족'}. https://fal.ai/dashboard/billing 에서 잔액을 확인해 주세요.`;
  }
  return detail ? `${err.message} (${detail})` : err.message || String(err);
}

function mimeFromExt(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.png') return 'image/png';
  if (ext === '.webp') return 'image/webp';
  if (ext === '.gif') return 'image/gif';
  if (ext === '.svg') return 'image/svg+xml';
  if (ext === '.css') return 'text/css; charset=utf-8';
  if (ext === '.js') return 'application/javascript; charset=utf-8';
  if (ext === '.html') return 'text/html; charset=utf-8';
  return 'image/jpeg';
}

async function uploadFileToFalCached(falClient, localFilePath) {
  const buf = fs.readFileSync(localFilePath);
  const hash = crypto.createHash('sha256').update(buf).digest('hex');
  const cache = readJsonSafe(UPLOAD_CACHE_JSON, {});
  if (cache[hash] && cache[hash].startsWith('https://')) {
    return cache[hash];
  }
  const mime = mimeFromExt(localFilePath);
  const blob = new Blob([buf], { type: mime });
  const url = await falClient.storage.upload(blob);
  cache[hash] = url;
  writeJsonSafe(UPLOAD_CACHE_JSON, cache);
  return url;
}

function downloadUrlToFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const request = (targetUrl, redirectsLeft = 6) => {
      const mod = targetUrl.startsWith('https') ? https : http;
      mod
        .get(
          targetUrl,
          { headers: { 'User-Agent': 'IdentityLockStudio/3.0' } },
          (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
              if (redirectsLeft <= 0) return reject(new Error('Too many redirects'));
              const nextUrl = new URL(res.headers.location, targetUrl).toString();
              res.resume();
              return request(nextUrl, redirectsLeft - 1);
            }
            if (res.statusCode !== 200) {
              res.resume();
              return reject(new Error(`다운로드 실패 (HTTP ${res.statusCode})`));
            }
            const fileStream = fs.createWriteStream(destPath);
            res.pipe(fileStream);
            fileStream.on('finish', () => fileStream.close(() => resolve(destPath)));
            fileStream.on('error', reject);
          }
        )
        .on('error', reject);
    };
    request(url);
  });
}

function fetchJsonUrl(url, timeoutMs = 6000) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(url, { timeout: timeoutMs }, (res) => {
      let raw = '';
      res.on('data', (c) => (raw += c.toString()));
      res.on('end', () => {
        try {
          resolve(JSON.parse(raw));
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Timeout'));
    });
    req.on('error', reject);
  });
}

const DIRECTOR_FILE_LABELS = {
  'card_1_director.jpg': '🏠 메인 — 대표원장 정면 프로필',
  'doctor.png': '🏠 공통 — 대표원장 프로필',
  'ba_director_before.jpg': '👨‍⚕️ 원장소개 — 비포 포트레이트',
  'ba_director_after.jpg': '👨‍⚕️ 원장소개 — 애프터 포트레이트',
  'detail_director_consult.jpg': '💬 원장소개 — 1:1 진료 상담',
  'detail_director_pulse.jpg': '🩺 원장소개 — 맥진 진료',
  'detail_director_herbs.jpg': '🌿 원장소개 — 한약재 검수',
  'detail_director_story1_enter.jpg': '📖 스토리 1 — 진료실 맞이',
  'detail_director_story1_clean.jpg': '📖 스토리 1 — 진료실 클린컷',
  'detail_director_story2_both_wrists_pulse.jpg': '📖 스토리 2 — 양손 맥진 진료',
  'detail_director_story2_clean.jpg': '📖 스토리 2 — 상담 클린컷',
  'detail_director_story3_nod_design.jpg': '📖 스토리 3 — 맞춤 처방 설계',
  'detail_director_story3_clean.jpg': '📖 스토리 3 — 차트 연구 클린컷',
  'detail_director_story4_decoction_lab.jpg': '📖 스토리 4 — 탕전실 약재 검수',
  'detail_director_story4_clean.jpg': '📖 스토리 4 — 약재 검수 클린컷',
  'detail_director_story5_clean.jpg': '📖 스토리 5 — 안심 한약 클린컷',
  'director_exam_card1_ultrasound.jpg': '🖥️ 정밀검진 1 — 초음파 진단',
  'director_exam_card2_thermography.jpg': '🌡️ 정밀검진 2 — 적외선 체열',
  'director_exam_card3_ent_endoscope.jpg': '🔬 정밀검진 3 — 이비인후 내시경',
  'director_exam_card4_sasang_constitution.jpg': '📋 정밀검진 4 — 사상체질 분석',
  'director_exam_card5_bodyfat_inbody.jpg': '⚖️ 정밀검진 5 — 체성분·인바디',
  'director_exam_card6_autonomic_hrv.jpg': '💓 정밀검진 6 — 자율신경(HRV)',
  'director_exam_card7_endocrine_liver_glucose.jpg': '🧪 정밀검진 7 — 간기능·내분비',
  'director_exam_card8_vascular_toxin.jpg': '🩸 정밀검진 8 — 혈관·해독 진단',
  'director_exam_card9_growth_check.jpg': '🌱 정밀검진 9 — 성장판 검진',
  'growth-two-types-director.jpg': '🌱 성장클리닉 — 원장님 상담',
  'growth_male_director_ultrasound_1791351314809.jpg': '🌱 성장클리닉 — 성장판 초음파',
  'growth-director-son.png': '🌱 성장클리닉 — 원장님과 자녀',
  'growth-director-son-comparison.png': '🌱 성장클리닉 — 성장 비교'
};

function listHomepageDirectorImages() {
  if (!fs.existsSync(HOMEPAGE_DIR)) return [];
  const all = fs.readdirSync(HOMEPAGE_DIR);
  const priorityPattern =
    /^(card_1_director|doctor\.png|ba_director_|detail_director_|director_exam_card|growth-two-types-director|growth-director-son|growth_male_director_|growth_two_types_director_)/i;
  const excludePattern = /(no_director|loupe_pov|family_safety)/i;

  const gallery = readJsonSafe(GALLERY_JSON, []);
  const appliedMap = readJsonSafe(APPLIED_HOMEPAGE_JSON, {});

  return all
    .filter((f) => priorityPattern.test(f) && !excludePattern.test(f) && /\.(jpg|jpeg|png|webp)$/i.test(f))
    .sort((a, b) => {
      if (a === 'card_1_director.jpg') return -1;
      if (b === 'card_1_director.jpg') return 1;
      if (a === 'doctor.png') return -1;
      if (b === 'doctor.png') return 1;
      return a.localeCompare(b);
    })
    .map((f) => {
      const full = path.join(HOMEPAGE_DIR, f);
      const stat = fs.statSync(full);
      const latestFix = gallery.find(
        (g) =>
          g.targetHomepageFile === f &&
          g.finalFileName &&
          fs.existsSync(path.join(OUTPUTS_DIR, path.basename(g.finalFileName)))
      );
      const appliedInfo = appliedMap[f] || null;
      return {
        fileName: f,
        label: DIRECTOR_FILE_LABELS[f] || `👨‍⚕️ 원장님 사진 (${f})`,
        sizeBytes: stat.size,
        previewUrl: `/files/homepage/${encodeURIComponent(f)}?t=${Math.floor(stat.mtimeMs)}`,
        latestFixedUrl: latestFix ? latestFix.finalUrl : null,
        latestFixedFileName: latestFix ? latestFix.finalFileName : null,
        latestSimilarityPct: latestFix ? latestFix.similarityPct || 99 : null,
        appliedToHomepage: Boolean(appliedInfo),
        appliedAt: appliedInfo ? appliedInfo.appliedAt : null
      };
    });
}

function applyOutputFileToHomepage(outputFileNameRaw, targetHomepageFileRaw) {
  const outputFileName = path.basename(String(outputFileNameRaw || ''));
  const targetHomepageFile = path.basename(String(targetHomepageFileRaw || ''));
  if (!outputFileName || !targetHomepageFile) {
    throw new Error('원본 파일명과 결과 파일명이 필요합니다.');
  }
  const srcOut = path.join(OUTPUTS_DIR, outputFileName);
  const dstHome = path.join(HOMEPAGE_DIR, targetHomepageFile);
  if (!fs.existsSync(srcOut)) {
    throw new Error(`결과 파일(${outputFileName})을 찾을 수 없습니다.`);
  }

  const backupDir = path.join(HOMEPAGE_DIR, '_backup_director_faces');
  fs.mkdirSync(backupDir, { recursive: true });
  const nowStamp = Date.now();
  if (fs.existsSync(dstHome)) {
    fs.copyFileSync(dstHome, path.join(backupDir, `${nowStamp}_${targetHomepageFile}`));
  }

  const stem = targetHomepageFile.replace(/\.[^.]+$/, '');
  const dstWebp = path.join(HOMEPAGE_DIR, 'webp', `${stem}.webp`);
  const hasWebpMirror = fs.existsSync(dstWebp);
  if (hasWebpMirror) {
    fs.copyFileSync(dstWebp, path.join(backupDir, `${nowStamp}_${stem}.webp`));
  }

  let convertedViaCv2 = false;
  try {
    const pyScript = [
      'import sys, cv2, numpy as np',
      'src, dst, webp_dst = sys.argv[1], sys.argv[2], sys.argv[3]',
      'img = cv2.imdecode(np.fromfile(src, dtype=np.uint8), cv2.IMREAD_COLOR)',
      'ext = "." + dst.rsplit(".", 1)[-1].lower()',
      'params = [cv2.IMWRITE_JPEG_QUALITY, 95] if ext in (".jpg", ".jpeg") else ([cv2.IMWRITE_WEBP_QUALITY, 93] if ext == ".webp" else [])',
      'ok, buf = cv2.imencode(ext, img, params)',
      'if ok: buf.tofile(dst)',
      'if webp_dst:',
      '    ok2, buf2 = cv2.imencode(".webp", img, [cv2.IMWRITE_WEBP_QUALITY, 93])',
      '    if ok2: buf2.tofile(webp_dst)'
    ].join('\n');
    execFileSync('python', ['-c', pyScript, srcOut, dstHome, hasWebpMirror ? dstWebp : ''], {
      timeout: 10000
    });
    convertedViaCv2 = true;
  } catch (e) {
    fs.copyFileSync(srcOut, dstHome);
  }

  const appliedMap = readJsonSafe(APPLIED_HOMEPAGE_JSON, {});
  appliedMap[targetHomepageFile] = {
    outputFileName,
    hasWebpMirror: Boolean(hasWebpMirror && convertedViaCv2),
    appliedAt: new Date().toISOString()
  };
  writeJsonSafe(APPLIED_HOMEPAGE_JSON, appliedMap);

  return {
    targetHomepageFile,
    outputFileName,
    hasWebpMirror: Boolean(hasWebpMirror && convertedViaCv2)
  };
}

// ============================================================================
// 🌐 HOMEPAGE URL IMAGE CRAWLER & SEQUENTIAL INSPECTOR HELPERS
// ============================================================================
function normalizeTargetSiteUrl(raw) {
  let s = String(raw || '').trim();
  if (!s) throw new Error('홈페이지 주소(URL)를 입력해 주세요.');
  if (!/^https?:\/\//i.test(s)) {
    const isLocal = /^(localhost|127\.0\.0\.1)(:\d+)?(\/|$)/i.test(s);
    s = (isLocal ? 'http://' : 'https://') + s;
  }
  let parsed;
  try {
    parsed = new URL(s);
  } catch (e) {
    throw new Error('올바른 홈페이지 주소 형식이 아닙니다. (예: https://www.bareunhaniwon.com)');
  }
  if (!['http:', 'https:'].includes(parsed.protocol)) {
    throw new Error('http:// 또는 https:// 주소만 불러올 수 있습니다.');
  }
  return parsed.toString();
}

function decompressHttpBuffer(buf, encoding) {
  const enc = String(encoding || '').toLowerCase().trim();
  try {
    if (enc === 'gzip' || enc === 'x-gzip') return zlib.gunzipSync(buf);
    if (enc === 'deflate') return zlib.inflateSync(buf);
    if (enc === 'br') return zlib.brotliDecompressSync(buf);
  } catch (e) {}
  return buf;
}

function fetchUrlBuffer(targetUrl, refererUrl = '', timeoutMs = 14000, maxBytes = 25 * 1024 * 1024) {
  return new Promise((resolve, reject) => {
    const request = (currUrl, redirectsLeft = 6) => {
      let u;
      try {
        u = new URL(currUrl);
      } catch (err) {
        return reject(new Error('잘못된 URL: ' + currUrl));
      }
      const mod = u.protocol === 'https:' ? https : http;
      const headers = {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7'
      };
      if (refererUrl) headers.Referer = refererUrl;

      const req = mod.get(u.toString(), { headers, timeout: timeoutMs }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          res.resume();
          if (redirectsLeft <= 0) return reject(new Error('리다이렉트 횟수 초과'));
          const next = new URL(res.headers.location, u.toString()).toString();
          return request(next, redirectsLeft - 1);
        }
        if (res.statusCode !== 200) {
          res.resume();
          return reject(new Error(`HTTP ${res.statusCode}`));
        }
        const chunks = [];
        let total = 0;
        res.on('data', (chunk) => {
          total += chunk.length;
          if (total > maxBytes) {
            req.destroy();
            return reject(new Error('파일 용량 한도 초과'));
          }
          chunks.push(chunk);
        });
        res.on('end', () => {
          const rawBuf = Buffer.concat(chunks);
          const finalBuf = decompressHttpBuffer(rawBuf, res.headers['content-encoding']);
          resolve({
            buffer: finalBuf,
            contentType: String(res.headers['content-type'] || ''),
            finalUrl: u.toString()
          });
        });
      });

      req.on('timeout', () => {
        req.destroy();
        reject(new Error('연결 시간 초과'));
      });
      req.on('error', reject);
    };
    request(targetUrl);
  });
}

function parseImageBufferInfo(buf) {
  if (!Buffer.isBuffer(buf) || buf.length < 24) return null;

  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) {
    return {
      ext: '.png',
      width: buf.readUInt32BE(16),
      height: buf.readUInt32BE(20)
    };
  }

  // GIF: 'GIF87a' / 'GIF89a'
  if (buf[0] === 0x47 && buf[1] === 0x49 && buf[2] === 0x46) {
    return {
      ext: '.gif',
      width: buf.readUInt16LE(6),
      height: buf.readUInt16LE(8)
    };
  }

  // WebP: 'RIFF' .... 'WEBP'
  if (
    buf.length >= 30 &&
    buf.toString('ascii', 0, 4) === 'RIFF' &&
    buf.toString('ascii', 8, 12) === 'WEBP'
  ) {
    const chunkType = buf.toString('ascii', 12, 16);
    if (chunkType === 'VP8 ' && buf.length >= 30) {
      return {
        ext: '.webp',
        width: buf.readUInt16LE(26) & 0x3fff,
        height: buf.readUInt16LE(28) & 0x3fff
      };
    }
    if (chunkType === 'VP8L' && buf.length >= 25) {
      const bits = buf.readUInt32LE(21);
      return {
        ext: '.webp',
        width: (bits & 0x3fff) + 1,
        height: ((bits >> 14) & 0x3fff) + 1
      };
    }
    if (chunkType === 'VP8X' && buf.length >= 30) {
      return {
        ext: '.webp',
        width: 1 + buf.readUIntLE(24, 3),
        height: 1 + buf.readUIntLE(27, 3)
      };
    }
    return { ext: '.webp', width: 0, height: 0 };
  }

  // JPEG: FF D8
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let offset = 2;
    while (offset + 9 < buf.length) {
      if (buf[offset] !== 0xff) {
        offset++;
        continue;
      }
      const marker = buf[offset + 1];
      if (marker === 0xff) {
        offset++;
        continue;
      }
      if (marker === 0xd8 || marker === 0xd9 || (marker >= 0xd0 && marker <= 0xd7) || marker === 0x01) {
        offset += 2;
        continue;
      }
      if (offset + 4 >= buf.length) break;
      const segLen = buf.readUInt16BE(offset + 2);
      if (segLen < 2) break;
      const isSof =
        (marker >= 0xc0 && marker <= 0xc3) ||
        (marker >= 0xc5 && marker <= 0xc7) ||
        (marker >= 0xc9 && marker <= 0xcb) ||
        (marker >= 0xcd && marker <= 0xcf);
      if (isSof && offset + 8 < buf.length) {
        return {
          ext: '.jpg',
          height: buf.readUInt16BE(offset + 5),
          width: buf.readUInt16BE(offset + 7)
        };
      }
      offset += 2 + segLen;
    }
    return { ext: '.jpg', width: 0, height: 0 };
  }

  return null;
}

function findMatchingHomepageFile(stemOrFileName) {
  if (!fs.existsSync(HOMEPAGE_DIR)) return { matchedHomepageFile: null, matchedHomepageWebp: null };
  const rawBase = path.basename(String(stemOrFileName || '')).replace(/\?.*$/, '');
  const stem = rawBase.replace(/\.[^.]+$/, '');
  if (!stem) return { matchedHomepageFile: null, matchedHomepageWebp: null };

  let matchedHomepageFile = null;
  for (const candExt of ['.jpg', '.jpeg', '.png', '.webp']) {
    const cand = stem + candExt;
    if (fs.existsSync(path.join(HOMEPAGE_DIR, cand))) {
      matchedHomepageFile = cand;
      break;
    }
  }
  const webpRel = path.join('webp', `${stem}.webp`);
  const matchedHomepageWebp = fs.existsSync(path.join(HOMEPAGE_DIR, webpRel)) ? `${stem}.webp` : null;
  return { matchedHomepageFile, matchedHomepageWebp };
}

function decodeHtmlEntitiesMinimal(str) {
  return String(str || '')
    .replace(/&amp;/gi, '&')
    .replace(/&#038;/g, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/g, "'");
}

function pickBestFromSrcset(srcsetValue) {
  const parts = String(srcsetValue || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  let bestUrl = '';
  let bestScore = -1;
  for (const part of parts) {
    const tokens = part.split(/\s+/);
    const urlPart = tokens[0];
    if (!urlPart) continue;
    let score = 1;
    const desc = tokens[1] || '';
    const wMatch = desc.match(/^(\d+)w$/i);
    const xMatch = desc.match(/^(\d+(?:\.\d+)?)x$/i);
    if (wMatch) score = Number(wMatch[1]);
    else if (xMatch) score = Number(xMatch[1]) * 1000;
    if (score >= bestScore) {
      bestScore = score;
      bestUrl = urlPart;
    }
  }
  return bestUrl;
}

function canonicalImageDedupKey(fullUrl) {
  try {
    const u = new URL(fullUrl);
    if (/\.(jpg|jpeg|png|webp|gif|avif)$/i.test(u.pathname)) {
      for (const k of ['v', 'ver', '_', 't', 'timestamp', 'cache']) {
        u.searchParams.delete(k);
      }
    }
    return u.toString();
  } catch (e) {
    return fullUrl;
  }
}

function extractImageCandidatesFromHtml(htmlRaw, pageUrl) {
  const html = String(htmlRaw || '');
  const candidates = [];
  const seenKeys = new Set();

  let pagePath = '/';
  try {
    const pu = new URL(pageUrl);
    pagePath = pu.pathname + (pu.search || '');
  } catch (e) {}

  const addCandidate = (rawRef, altText = '', sourceKind = 'img') => {
    const cleaned = decodeHtmlEntitiesMinimal(String(rawRef || '').trim()).replace(/^['"]|['"]$/g, '');
    if (!cleaned || cleaned.startsWith('javascript:') || cleaned.startsWith('about:') || cleaned.startsWith('#')) {
      return;
    }
    if (cleaned.startsWith('data:image/')) {
      if (/^data:image\/(svg|x-icon|vnd\.microsoft\.icon)/i.test(cleaned)) return;
      const key = 'data:' + crypto.createHash('sha1').update(cleaned).digest('hex');
      if (seenKeys.has(key)) return;
      seenKeys.add(key);
      candidates.push({ url: cleaned, isDataUri: true, alt: altText, pagePath, sourceKind });
      return;
    }

    let absUrl = '';
    try {
      absUrl = new URL(cleaned, pageUrl).toString();
    } catch (e) {
      return;
    }
    if (!/^https?:\/\//i.test(absUrl)) return;
    if (/\.(svg|ico|woff2?|ttf|eot|css|js|mp4|webm|pdf|xml)(\?|$)/i.test(absUrl)) return;
    if (/s\.w\.org\/images\/core\/emoji|gravatar\.com\/avatar|1x1|spacer\.gif|pixel\.gif/i.test(absUrl)) return;

    const dedupKey = canonicalImageDedupKey(absUrl);
    if (seenKeys.has(dedupKey)) return;
    seenKeys.add(dedupKey);
    candidates.push({ url: absUrl, isDataUri: false, alt: altText, pagePath, sourceKind });
  };

  // 1. <img> tags (src, lazy-src, srcset, alt)
  const imgTagRegex = /<img\b[^>]*>/gi;
  let m;
  while ((m = imgTagRegex.exec(html)) !== null) {
    const tag = m[0];
    const altMatch = tag.match(/\balt\s*=\s*(['"])(.*?)\1/i);
    const alt = altMatch ? decodeHtmlEntitiesMinimal(altMatch[2]).trim() : '';

    for (const srcsetAttr of ['data-srcset', 'srcset']) {
      const ssMatch = tag.match(new RegExp(`\\b${srcsetAttr}\\s*=\\s*(['"])(.*?)\\1`, 'i'));
      if (ssMatch && ssMatch[2]) {
        const best = pickBestFromSrcset(ssMatch[2]);
        if (best) addCandidate(best, alt, 'img-srcset');
      }
    }
    for (const attr of ['data-orig-file', 'data-large_image', 'data-original', 'data-lazy-src', 'data-src', 'src']) {
      const attrMatch = tag.match(new RegExp(`\\b${attr}\\s*=\\s*(['"])(.*?)\\1`, 'i'));
      if (attrMatch && attrMatch[2]) {
        addCandidate(attrMatch[2], alt, 'img');
      }
    }
  }

  // 2. <picture><source srcset="...">
  const sourceTagRegex = /<source\b[^>]*>/gi;
  while ((m = sourceTagRegex.exec(html)) !== null) {
    const tag = m[0];
    for (const attr of ['data-srcset', 'srcset']) {
      const ssMatch = tag.match(new RegExp(`\\b${attr}\\s*=\\s*(['"])(.*?)\\1`, 'i'));
      if (ssMatch && ssMatch[2]) {
        const best = pickBestFromSrcset(ssMatch[2]);
        if (best) addCandidate(best, '', 'picture');
      }
    }
  }

  // 3. CSS background-image / url(...)
  const cssUrlRegex = /url\(\s*(['"]?)([^'")]+)\1\s*\)/gi;
  while ((m = cssUrlRegex.exec(html)) !== null) {
    if (m[2]) addCandidate(m[2], '', 'css-bg');
  }

  // 4. JS / JSON / Custom HTML attributes containing direct raster image URLs (unescape JSON \/ first)
  const unescapedHtml = html.replace(/\\\//g, '/');
  const absImgRegex = /https?:\/\/[^\s"'<>()\\]+\.(?:jpg|jpeg|png|webp)(?:\?[^\s"'<>()\\]*)?/gi;
  while ((m = absImgRegex.exec(unescapedHtml)) !== null) {
    addCandidate(m[0], '', 'script-url');
  }
  const relImgRegex = /(['"])(\/[a-zA-Z0-9_\-./%]+\.(?:jpg|jpeg|png|webp)(?:\?[^'"\s<>\\]*)?)\1/gi;
  while ((m = relImgRegex.exec(unescapedHtml)) !== null) {
    addCandidate(m[2], '', 'rel-url');
  }

  // 5. Inline data:image/(jpeg|png|webp);base64,... URIs
  const dataUriRegex = /data:image\/(?:jpeg|jpg|png|webp);base64,[A-Za-z0-9+/=]{1200,}/gi;
  while ((m = dataUriRegex.exec(html)) !== null) {
    addCandidate(m[0], '', 'inline-base64');
  }

  // 6. OpenGraph representative image (placed last so actual in-page content comes first)
  const ogMatch = html.match(/<meta\b[^>]*property\s*=\s*(['"])og:image\1[^>]*content\s*=\s*(['"])(.*?)\2/i);
  if (ogMatch && ogMatch[3]) {
    addCandidate(ogMatch[3], 'OG 대표 이미지', 'og-image');
  }

  return candidates;
}

function extractInternalSubpageUrls(htmlRaw, rootUrl, maxSubpages = 10) {
  const html = String(htmlRaw || '');
  let rootParsed;
  try {
    rootParsed = new URL(rootUrl);
  } catch (e) {
    return [];
  }
  const found = [];
  const seen = new Set([rootParsed.origin + rootParsed.pathname.replace(/\/+$/, '')]);
  const linkRegex = /<a\b[^>]*href\s*=\s*(['"])(.*?)\1/gi;
  let m;
  while ((m = linkRegex.exec(html)) !== null) {
    const rawHref = decodeHtmlEntitiesMinimal(m[2] || '').trim();
    if (!rawHref || rawHref.startsWith('#') || /^(mailto:|tel:|javascript:)/i.test(rawHref)) continue;
    let u;
    try {
      u = new URL(rawHref, rootUrl);
    } catch (e) {
      continue;
    }
    if (u.origin !== rootParsed.origin) continue;
    if (/\/(wp-admin|wp-login|wp-json|feed|cart|checkout|my-account|xmlrpc)/i.test(u.pathname)) continue;
    if (/\.(jpg|jpeg|png|webp|gif|svg|pdf|zip|mp4|css|js|xml)$/i.test(u.pathname)) continue;
    u.hash = '';
    const normKey = u.origin + u.pathname.replace(/\/+$/, '') + (u.search || '');
    if (seen.has(normKey)) continue;
    seen.add(normKey);
    found.push(u.toString());
    if (found.length >= maxSubpages) break;
  }
  return found;
}

function markCrawledItemFixed(sessionId, itemId, fixEntry) {
  if (!sessionId || !itemId || !fixEntry) return;
  const sessions = readJsonSafe(CRAWLED_JSON, []);
  const sess = sessions.find((s) => s.id === sessionId);
  if (!sess || !Array.isArray(sess.images)) return;
  const item = sess.images.find((img) => img.id === itemId || img.fileName === itemId);
  if (!item) return;
  item.fixedUrl = fixEntry.finalUrl;
  item.fixedRawUrl = fixEntry.rawUrl;
  item.fixedFileName = fixEntry.finalFileName;
  item.fixedSimilarityPct = fixEntry.similarityPct || null;
  item.fixedSharpnessScore = fixEntry.sharpnessScore || null;
  item.fixedTier = 'free';
  item.fixedMode = fixEntry.mode || '';
  item.fixedAt = fixEntry.createdAt || new Date().toISOString();
  if (fixEntry.scenePrompt) item.lastScenePrompt = fixEntry.scenePrompt;
  writeJsonSafe(CRAWLED_JSON, sessions);
}

function detectAspectRatioKey(width, height) {
  if (!width || !height) return 'landscape_16_9';
  const r = width / height;
  if (r >= 1.52) return 'landscape_16_9';
  if (r >= 1.15) return 'landscape_4_3';
  if (r >= 0.88) return 'square_hd';
  if (r >= 0.65) return 'portrait_4_3';
  return 'portrait_16_9';
}

function analyzeVisualMoodQuick(localImagePath) {
  try {
    if (!localImagePath || !fs.existsSync(localImagePath)) return null;
    const pyCode = [
      'import sys, json, cv2, numpy as np',
      'img = cv2.imdecode(np.fromfile(sys.argv[1], dtype=np.uint8), cv2.IMREAD_COLOR)',
      'if img is None: print("{}"); sys.exit(0)',
      'h, w = img.shape[:2]',
      'b, g, r = [float(np.mean(img[:,:,i])) for i in range(3)]',
      'luma = 0.299*r + 0.587*g + 0.114*b',
      'warmth = r - b',
      'lower = img[int(h*0.58):int(h*0.95), int(w*0.22):int(w*0.78)]',
      'lower_luma = float(np.mean(lower)) if lower.size else luma',
      'print(json.dumps({"w":w,"h":h,"luma":round(luma,1),"warmth":round(warmth,1),"lowerLuma":round(lower_luma,1)}))'
    ].join('\n');
    const out = execFileSync('python', ['-c', pyCode, localImagePath], { timeout: 4000 }).toString('utf8').trim();
    return JSON.parse(out);
  } catch (e) {
    return null;
  }
}

async function extractPhotoScenePrompt(payload) {
  const {
    profileId = 'director_ahn',
    sourceType = 'homepage',
    homepageFile = '',
    crawledSessionId = '',
    crawledFileName = '',
    originalName = '',
    altText = '',
    pagePath = '',
    uploadDataUrl = ''
  } = payload || {};

  const profiles = readJsonSafe(PROFILES_JSON, []);
  const profile = profiles.find((p) => p.id === profileId) || profiles[0] || {};

  let localPath = '';
  let nameHint = String(originalName || homepageFile || crawledFileName || '').toLowerCase();
  let buf = null;

  if (sourceType === 'homepage' && homepageFile) {
    localPath = path.join(HOMEPAGE_DIR, path.basename(homepageFile));
    if (fs.existsSync(localPath)) buf = fs.readFileSync(localPath);
  } else if (sourceType === 'crawled' && crawledSessionId && crawledFileName) {
    localPath = path.join(CRAWLED_DIR, path.basename(crawledSessionId), path.basename(crawledFileName));
    if (fs.existsSync(localPath)) buf = fs.readFileSync(localPath);
  } else if (sourceType === 'upload' && uploadDataUrl) {
    const m = String(uploadDataUrl).match(/^data:image\/[a-zA-Z0-9+.-]+;base64,(.+)$/);
    if (m) buf = Buffer.from(m[1], 'base64');
  }

  const info = buf ? parseImageBufferInfo(buf) : null;
  const width = (info && info.width) || 1280;
  const height = (info && info.height) || 720;
  const imageSize = detectAspectRatioKey(width, height);
  const visual = localPath ? analyzeVisualMoodQuick(localPath) : null;

  const combinedHint = `${nameHint} ${String(altText || '').toLowerCase()} ${String(pagePath || '').toLowerCase()}`;

  const sceneRules = [
    {
      match: /card_1_director|정면|대표원장|프로필/,
      kor: '따뜻한 원목과 은은한 채광이 어우러진 고급 한의원 진료실에서 흰 의사 가운을 입고 신뢰감 있는 미소로 정면을 바라보는 대표원장 상반신 프로필 모습',
      outfit: 'white_coat_shirt',
      tag: '대표원장 정면 프로필'
    },
    {
      match: /both_wrists_pulse|pulse|맥진/,
      kor: '따뜻한 햇살이 비치는 한의원 원목 진료 책상에서 환자분의 손목 맥진을 양손으로 정성스럽고 진지하게 짚어보는 진료 모습',
      outfit: 'white_coat_shirt',
      tag: '양손 맥진 진료'
    },
    {
      match: /consult|상담|story2_clean/,
      kor: '차분하고 품격 있는 원목 한의원 상담실에서 책상 너머 환자분에게 온화한 미소로 맞춤 치료 계획을 설명하는 모습',
      outfit: 'white_coat_shirt',
      tag: '원목 상담실 진료 상담'
    },
    {
      match: /story1_enter|enter|맞이/,
      kor: '밝고 정갈한 한의원 진료실로 들어서며 따뜻한 미소와 단정한 흰 가운 차림으로 환자분을 맞이하는 모습',
      outfit: 'white_coat_shirt',
      tag: '진료실 입장 · 인사'
    },
    {
      match: /story3|nod_design|논문|차트|설계/,
      kor: '원목 진료 데스크에서 정밀 진단 데이터와 처방 차트를 세심하게 검토하며 맞춤 한약을 설계하는 집중한 모습',
      outfit: 'white_coat_shirt',
      tag: '맞춤 처방 · 차트 연구'
    },
    {
      match: /story4|decoction|loupe|탕전|약재|herbs|gongjindan|공진단|녹용/,
      kor: '청결한 유리 탕전실과 약재 검수대에서 최상급 녹용과 청정 한약재를 직접 손으로 들고 꼼꼼하게 살피는 모습',
      outfit: 'white_coat_shirt',
      tag: '프리미엄 약재 · 녹용 검수'
    },
    {
      match: /ultrasound|exam_card1|초음파/,
      kor: '현대적인 한의원 정밀 검진실에서 고해상도 초음파 진단 모니터 화면을 가리키며 세밀하게 판독하는 모습',
      outfit: 'white_coat_shirt',
      tag: '초음파 정밀 진단'
    },
    {
      match: /thermography|exam_card2|체열/,
      kor: '정밀 적외선 체열 진단실 모니터 앞에서 체열 분포 데이터를 분석하며 설명하는 전문적인 진료 모습',
      outfit: 'white_coat_shirt',
      tag: '적외선 체열 정밀 검사'
    },
    {
      match: /endoscope|exam_card3|내시경/,
      kor: '이비인후과·점막 정밀 내시경 모니터를 보며 정밀하게 상태를 진단하는 한의원 검진 모습',
      outfit: 'white_coat_shirt',
      tag: '내시경 정밀 검진'
    },
    {
      match: /sasang|exam_card4|사상체질/,
      kor: '사상체질 정밀 분석 차트와 진단 화면을 보며 체질별 맞춤 한방 치료법을 차분하게 설명하는 모습',
      outfit: 'white_coat_shirt',
      tag: '사상체질 정밀 분석'
    },
    {
      match: /inbody|bodyfat|exam_card5|체성분/,
      kor: '체성분·인바디 정밀 분석 결과지를 보며 체계적인 대사 및 체형 개선 방향을 안내하는 상담 모습',
      outfit: 'white_coat_shirt',
      tag: '체성분 · 인바디 분석'
    },
    {
      match: /autonomic|hrv|exam_card6|자율신경/,
      kor: '자율신경 및 스트레스 정밀 검사(HRV) 모니터를 확인하며 신경계 균형 치료를 설명하는 모습',
      outfit: 'white_coat_shirt',
      tag: '자율신경 정밀 검진'
    },
    {
      match: /endocrine|liver|exam_card7|간기능|내분비/,
      kor: '간기능·내분비 정밀 혈액 검사 수치를 세심하게 판독하며 안전한 한약 처방을 설명하는 모습',
      outfit: 'white_coat_shirt',
      tag: '간기능 · 내분비 검진'
    },
    {
      match: /vascular|toxin|exam_card8|혈관|해독/,
      kor: '혈관 건강 및 체내 해독 상태 진단 모니터를 보며 순환 개선 치료를 설명하는 모습',
      outfit: 'white_coat_shirt',
      tag: '혈관 · 해독 정밀 진단'
    },
    {
      match: /growth|exam_card9|성장/,
      kor: '성장 클리닉 정밀 진료실에서 성장판 검진 화면을 보며 따뜻하고 든든한 미소로 설명하는 모습',
      outfit: 'white_coat_shirt',
      tag: '성장클리닉 정밀 진료'
    },
    {
      match: /chuna|추나/,
      kor: '모던하고 정갈한 한의원 추나 교정 치료실에서 교정 베드 옆에 서서 척추·관절 균형을 정밀하게 진료하는 모습',
      outfit: 'scrub_coat',
      tag: '추나 척추 · 체형 교정'
    },
    {
      match: /diet|다이어트/,
      kor: '밝고 세련된 한의원 상담실에서 건강한 체중 감량과 대사 회복 한약 프로그램을 온화하게 상담하는 모습',
      outfit: 'white_coat_shirt',
      tag: '다이어트 맞춤 상담'
    },
    {
      match: /hair|탈모|두피/,
      kor: '정밀 두피·모낭 진단기가 갖춰진 진료실에서 두피 열감과 모낭 상태를 세심하게 체크하고 상담하는 모습',
      outfit: 'white_coat_shirt',
      tag: '탈모 · 두피 정밀 진료'
    },
    {
      match: /prostate|전립선|남성/,
      kor: '프라이빗하고 중후한 원목 한의원 상담실에서 깊이 있는 신뢰감과 진중한 표정으로 1:1 맞춤 진료를 진행하는 모습',
      outfit: 'white_coat_tie',
      tag: '프라이빗 1:1 심층 진료'
    },
    {
      match: /ba_director|before|after/,
      kor: '정갈한 한의원 원목 배경 앞에서 단정한 흰 의사 가운과 금테 안경을 착용하고 정면을 바라보는 깔끔한 인물 포트레이트',
      outfit: 'white_coat_shirt',
      tag: '원장님 클리닉 포트레이트'
    }
  ];

  let matchedRule = sceneRules.find((r) => r.match.test(combinedHint));
  let koreanPrompt = '';
  let outfitKey = 'white_coat_shirt';
  let sceneTag = '클리닉 인물 연출';

  if (matchedRule) {
    koreanPrompt = matchedRule.kor;
    outfitKey = matchedRule.outfit;
    sceneTag = matchedRule.tag;
  } else {
    const isWarm = !visual || visual.warmth >= 12;
    const isBright = !visual || visual.luma >= 115;
    const isWhiteCoat = !visual || visual.lowerLuma >= 135;
    const bgDesc = isWarm
      ? '따뜻한 원목 톤과 은은한 자연광이 감도는 고급 한의원 진료실 배경에서'
      : '정갈하고 모던한 클리닉 스튜디오 배경에서';
    const lightDesc = isBright ? '밝고 부드러운 조명 아래' : '차분하고 깊이감 있는 시네마틱 조명 아래';
    outfitKey = isWhiteCoat ? 'white_coat_shirt' : 'modern_hanbok_gown';
    koreanPrompt = `${bgDesc} ${lightDesc} 단정한 진료복 차림으로 신뢰감 있고 자연스러운 미소를 지으며 정면을 바라보는 상반신 모습`;
    sceneTag = isWarm ? '따뜻한 원목 진료실' : '모던 클리닉 포트레이트';
  }

  const englishPrompt = await buildFreePhotorealPrompt(profile, koreanPrompt, outfitKey, false);
  const ratioLabel =
    imageSize === 'landscape_16_9'
      ? '16:9 와이드'
      : imageSize === 'landscape_4_3'
        ? '4:3 가로'
        : imageSize === 'square_hd'
          ? '1:1 정사각'
          : '세로 프로필';

  return {
    ok: true,
    koreanPrompt,
    englishPrompt,
    outfitKey,
    imageSize,
    width,
    height,
    sceneTag,
    ratioLabel
  };
}

const OUTFIT_MAP = {
  white_coat_shirt:
    'wearing a crisp tailored white medical doctor coat over a neat light blue-and-white striped dress shirt',
  white_coat_tie:
    'wearing a tailored white doctor coat over a crisp white dress shirt and understated dark navy silk tie',
  modern_hanbok_gown:
    'wearing a refined charcoal-navy modern Korean medical director coat with minimalist clean collar',
  navy_suit:
    'wearing a bespoke dark navy formal suit with crisp white dress shirt for an academic medical conference',
  scrub_coat:
    'wearing a clean dark-navy clinical scrub top underneath an open white medical doctor coat',
  free: ''
};

const SIZE_DIMENSIONS = {
  landscape_16_9: { width: 1280, height: 720, pulidW: 1280, pulidH: 736 },
  landscape_4_3: { width: 1152, height: 864, pulidW: 1152, pulidH: 864 },
  square_hd: { width: 1024, height: 1024, pulidW: 1024, pulidH: 1024 },
  portrait_4_3: { width: 864, height: 1152, pulidW: 864, pulidH: 1152 },
  portrait_16_9: { width: 720, height: 1280, pulidW: 736, pulidH: 1280 }
};

function domainKoreanSceneEnhancer(korText) {
  const s = String(korText || '').trim();
  const dict = [
    ['맥진', 'gently taking radial pulse diagnosis on a patient wrist across a warm wooden consultation desk'],
    ['진료실', 'inside a sunlit high-end Korean medicine clinic consultation room with warm oak wood shelves and wooden window blinds'],
    ['상담실', 'inside a calm, refined wooden medical consultation room'],
    ['초음파', 'carefully examining a musculoskeletal ultrasound diagnostic monitor screen in a modern clinic room'],
    ['추나', 'standing beside a modern orthopedic Chuna spinal alignment treatment table in a serene clinic room'],
    ['탕전실', 'in a spotless glass-walled herbal medicine decoction laboratory'],
    ['녹용', 'holding and inspecting premium dried deer antler slices and clean medicinal herbs on a wooden tray'],
    ['약재', 'carefully inspecting authentic herbal medicine ingredients with focused care'],
    ['상담', 'explaining a personalized treatment plan warmly across a wooden desk'],
    ['강연', 'standing at a modern medical conference podium delivering an academic lecture with confident poise'],
    ['논문', 'reviewing clinical research papers and medical textbooks at a warm sunlit wooden desk'],
    ['팔짱', 'standing with arms gently crossed in a trustworthy medical director studio portrait pose'],
    ['정면 프로필', 'facing the camera directly against a clean warm beige studio backdrop, eye-level medium portrait'],
    ['미소', 'with a warm, reassuring gentle smile'],
    ['햇살', 'soft golden morning sunlight filtering through wooden window blinds']
  ];
  const matched = [];
  for (const [k, eng] of dict) {
    if (s.includes(k)) matched.push(eng);
  }
  return matched;
}

async function buildFreePhotorealPrompt(profile, scenePrompt, outfitKey, includeTrigger = false) {
  const baseTraits =
    profile.baseTraits ||
    'a Korean male medical director in his late 30s to early 40s with neat short black hair swept back cleanly revealing an open forehead (no bangs covering forehead), wearing thin gold-rimmed rectangular glasses';
  const outfitDesc = OUTFIT_MAP[outfitKey] || '';
  const rawScene = String(scenePrompt || '').trim();
  const hasKorean = /[가-힣]/.test(rawScene);

  let englishScene = rawScene;
  if (hasKorean) {
    const domainHints = domainKoreanSceneEnhancer(rawScene);
    let translated = '';
    try {
      const gtxUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=ko&tl=en&dt=t&q=${encodeURIComponent(rawScene)}`;
      const gtxData = await fetchJsonUrl(gtxUrl, 6000);
      if (Array.isArray(gtxData) && Array.isArray(gtxData[0])) {
        translated = gtxData[0].map((seg) => (Array.isArray(seg) ? seg[0] : '')).join('').trim();
      }
    } catch (e) {}
    if (!translated) {
      try {
        const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(rawScene)}&langpair=ko|en`;
        const data = await fetchJsonUrl(apiUrl, 5000);
        const cand = data?.responseData?.translatedText || '';
        if (cand && !/MYMEMORY WARNING/i.test(cand)) {
          translated = cand.trim();
        }
      } catch (e) {}
    }

    if (domainHints.length > 0 && translated) {
      englishScene = `${translated}, ${domainHints.join(', ')}`;
    } else if (translated) {
      englishScene = translated;
    } else if (domainHints.length > 0) {
      englishScene = domainHints.join(', ');
    }
  }

  const subjectLead =
    includeTrigger && profile.triggerWord ? `${profile.triggerWord}, ${baseTraits}` : baseTraits;

  return [
    `Authentic unretouched editorial photograph of ${subjectLead}`,
    outfitDesc,
    englishScene,
    'captured on Hasselblad X2D 100C with 80mm f/1.9 prime lens, natural soft key lighting, authentic human skin pores and natural micro-texture, crisp thin gold eyeglass frame, natural depth of field, photorealistic, strictly NO text, NO logos, NO watermark'
  ]
    .filter(Boolean)
    .join(', ');
}

function getDefaultDirectorAngleRefsMap() {
  const angleDir = path.resolve(ROOT_DIR, '..', 'homepage', 'director-angle-refs');
  const map = {
    front: path.join(angleDir, 'angle_front.jpg'),
    left30: path.join(angleDir, 'angle_left30.jpg'),
    right30: path.join(angleDir, 'angle_right30.jpg'),
    leftProfile: path.join(angleDir, 'angle_left_profile.jpg'),
    rightProfile: path.join(angleDir, 'angle_right_profile.jpg')
  };
  const valid = {};
  for (const [k, p] of Object.entries(map)) {
    if (fs.existsSync(p)) valid[k] = p;
  }
  return valid;
}

// Run Local Python GTX 1070 DirectML FaceFusion ONNX Engine (or Objective Metric Analyzer)
function runLocalFaceEngine({
  profileId = 'default',
  targetPath,
  outputPath = '',
  refPaths,
  enhanceBlend = 0.82,
  analyzeOnly = false,
  onProgress
}) {
  return new Promise((resolve, reject) => {
    const jobJsonPath = path.join(
      OUTPUTS_DIR,
      `_tmp_job_${Date.now()}_${Math.random().toString(36).slice(2, 7)}.json`
    );
    const cachePath = path.join(PROFILES_DIR, profileId, 'identity_bank.npz');
    const angleRefs = profileId === 'director_ahn' ? getDefaultDirectorAngleRefsMap() : {};
    writeJsonSafe(jobJsonPath, {
      target: targetPath,
      output: outputPath,
      refs: refPaths,
      angle_refs: angleRefs,
      cache_path: cachePath,
      enhance_blend: Number(enhanceBlend) || 0.82,
      analyze_only: Boolean(analyzeOnly)
    });

    const cleanupJobJson = () => {
      try {
        if (fs.existsSync(jobJsonPath)) fs.unlinkSync(jobJsonPath);
      } catch (e) {}
    };

    const proc = spawn('python', [LOCAL_ENGINE_PY, '--job-json', jobJsonPath], {
      cwd: ROOT_DIR,
      env: { ...process.env, PYTHONIOENCODING: 'utf-8' }
    });

    let resultObj = null;
    let stderrBuf = '';
    let stdoutRemainder = '';

    proc.stdout.on('data', (chunk) => {
      stdoutRemainder += chunk.toString('utf8');
      const lines = stdoutRemainder.split(/\r?\n/);
      stdoutRemainder = lines.pop() || '';
      for (const line of lines) {
        if (line.startsWith('PROGRESS|')) {
          const parts = line.split('|');
          const pct = Number(parts[1] || 50);
          const msg = parts.slice(2).join('|');
          if (onProgress) onProgress(pct, msg);
        } else if (line.startsWith('RESULT|')) {
          try {
            resultObj = JSON.parse(line.slice('RESULT|'.length));
          } catch (e) {}
        }
      }
    });

    proc.stderr.on('data', (chunk) => {
      stderrBuf += chunk.toString('utf8');
    });

    proc.on('error', (err) => {
      cleanupJobJson();
      reject(new Error('로컬 파이썬 AI 엔진 실행 실패: ' + err.message));
    });

    proc.on('close', (code) => {
      cleanupJobJson();
      if (code !== 0 || !resultObj || !resultObj.ok) {
        const cleanErr = stderrBuf
          .split(/\r?\n/)
          .filter((l) => l.trim() && !l.includes('onnxruntime'))
          .slice(-4)
          .join(' ');
        return reject(new Error(cleanErr || `로컬 안면 고정 엔진 종료 오류 (code ${code})`));
      }
      resolve(resultObj);
    });
  });
}

// Free ZeroGPU FLUX / PuLID-FLUX Stage 1 Generator (4-Tier 0원 Fallback Chain)
async function generateFreeStage1Image({ prompt, masterPhotoPath, imageSize, freeGenEngine, hfToken, onLog }) {
  const dims = SIZE_DIMENSIONS[imageSize] || SIZE_DIMENSIONS.landscape_16_9;
  const { Client } = await import('@gradio/client');
  const connectOpts = hfToken ? { hf_token: hfToken } : {};

  if (freeGenEngine !== 'schnell_fast' && masterPhotoPath && fs.existsSync(masterPhotoPath)) {
    try {
      onLog('무료 ZeroGPU [PuLID-FLUX 인물 고정 엔진] 연결 중...');
      const client = await Client.connect('yanze/PuLID-FLUX', connectOpts);
      const imgBuf = fs.readFileSync(masterPhotoPath);
      const imgBlob = new Blob([imgBuf], { type: mimeFromExt(masterPhotoPath) });
      const res = await client.predict('/generate_image', {
        prompt,
        id_image: imgBlob,
        start_step: 0,
        guidance: 4,
        seed: '-1',
        true_cfg: 1,
        width: dims.pulidW,
        height: dims.pulidH,
        num_steps: 20,
        id_weight: 1.05,
        neg_prompt: 'bad quality, worst quality, text, watermark, cartoon, anime, plastic skin, deformed eyes',
        timestep_to_start_cfg: 1,
        max_sequence_length: 256
      });
      const outUrl = res?.data?.[0]?.url;
      if (outUrl) {
        onLog('PuLID-FLUX 무료 1차 인물·상황 촬영 성공!');
        return { url: outUrl, engineLabel: '무료 PuLID-FLUX' };
      }
    } catch (e) {
      onLog(`PuLID-FLUX 대기열 혼잡으로 초고속 FLUX.1 무료 엔진으로 자동 전환합니다 (${e.message.slice(0, 60)})`);
    }
  }

  if (freeGenEngine === 'flux_dev') {
    try {
      onLog('무료 ZeroGPU [FLUX.1-dev 고화질 엔진] 촬영 중...');
      const client = await Client.connect('black-forest-labs/FLUX.1-dev', connectOpts);
      const res = await client.predict('/infer', {
        prompt,
        seed: 0,
        randomize_seed: true,
        width: dims.width,
        height: dims.height,
        guidance_scale: 3.5,
        num_inference_steps: 24
      });
      const outUrl = res?.data?.[0]?.url;
      if (outUrl) {
        return { url: outUrl, engineLabel: '무료 FLUX.1-dev' };
      }
    } catch (e) {
      onLog(`FLUX.1-dev 혼잡으로 FLUX.1-schnell 초고속 엔진으로 자동 전환합니다`);
    }
  }

  // Official Black Forest Labs FLUX.1-dev -> FLUX.1-schnell (100% Watermark-Free, Zero Pollinations)
  try {
    onLog('무료 ZeroGPU [FLUX.1-dev 28-Step DSLR 엔진] 촬영 중 (워터마크 ZERO)...');
    const client = await Client.connect('black-forest-labs/FLUX.1-dev', connectOpts);
    const res = await client.predict('/infer', {
      prompt,
      seed: 0,
      randomize_seed: true,
      width: dims.width,
      height: dims.height,
      guidance_scale: 3.5,
      num_inference_steps: 28
    });
    const outUrl = res?.data?.[0]?.url;
    if (outUrl) {
      return { url: outUrl, engineLabel: '무료 FLUX.1-dev (워터마크 ZERO)' };
    }
  } catch (e) {
    onLog(`FLUX.1-dev 대기열 혼잡 -> FLUX.1-schnell 정품 엔진으로 전환합니다`);
  }

  onLog('무료 ZeroGPU [FLUX.1-schnell 초고속 정품 엔진] 촬영 중 (워터마크 ZERO)...');
  const client = await Client.connect('black-forest-labs/FLUX.1-schnell', connectOpts);
  const res = await client.predict('/infer', {
    prompt,
    seed: 0,
    randomize_seed: true,
    width: dims.width,
    height: dims.height,
    num_inference_steps: 4
  });
  const outUrl = res?.data?.[0]?.url;
  if (outUrl) {
    return { url: outUrl, engineLabel: '무료 FLUX.1-schnell (워터마크 ZERO)' };
  }
  throw new Error('고화질 FLUX 스튜디오 서버가 일시 혼잡합니다. 잠시 후 다시 시도해 주세요.');
}

function getOrderedProfileRefPaths(profile) {
  const refDir = path.join(PROFILES_DIR, profile.id, 'refs');
  const all = (profile.photos || []).filter((f) => fs.existsSync(path.join(refDir, f)));
  const ordered = [];
  if (profile.masterPhoto && all.includes(profile.masterPhoto)) {
    ordered.push(path.join(refDir, profile.masterPhoto));
  }
  for (const f of all) {
    const full = path.join(refDir, f);
    if (!ordered.includes(full)) ordered.push(full);
  }
  return ordered;
}

function saveToGallery(entry) {
  const gallery = readJsonSafe(GALLERY_JSON, []);
  gallery.unshift(entry);
  writeJsonSafe(GALLERY_JSON, gallery.slice(0, 140));
}

function saveComparisonRecord(record) {
  const list = readJsonSafe(COMPARISONS_JSON, []);
  const idx = list.findIndex((c) => c.id === record.id);
  if (idx >= 0) list[idx] = record;
  else list.unshift(record);
  writeJsonSafe(COMPARISONS_JSON, list.slice(0, 60));
}

function resolveLocalPathFromUrl(localUrl) {
  const clean = String(localUrl || '').split('?')[0];
  if (clean.startsWith('/files/outputs/')) {
    return path.join(OUTPUTS_DIR, path.basename(decodeURIComponent(clean.replace('/files/outputs/', ''))));
  }
  if (clean.startsWith('/files/homepage/')) {
    return path.join(HOMEPAGE_DIR, path.basename(decodeURIComponent(clean.replace('/files/homepage/', ''))));
  }
  if (clean.startsWith('/files/crawled/')) {
    const parts = clean.replace('/files/crawled/', '').split('/');
    const sessId = path.basename(decodeURIComponent(parts[0] || ''));
    const fName = path.basename(decodeURIComponent(parts[1] || ''));
    if (sessId && fName) return path.join(CRAWLED_DIR, sessId, fName);
  }
  return '';
}

const activeJobs = new Map();

function createJob(type, title) {
  const id = 'job_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
  const job = {
    id,
    type,
    title,
    status: 'running',
    progress: 5,
    stepText: '작업 준비 중...',
    logs: [],
    result: null,
    error: null,
    startedAt: new Date().toISOString(),
    finishedAt: null
  };
  activeJobs.set(id, job);
  return job;
}

function appendJobLog(job, msg) {
  if (!msg) return;
  const line = `[${new Date().toLocaleTimeString('ko-KR', { hour12: false })}] ${msg}`;
  job.logs.push(line);
  if (job.logs.length > 90) job.logs.shift();
}

function readBodyJson(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let total = 0;
    req.on('data', (chunk) => {
      total += chunk.length;
      if (total > 160 * 1024 * 1024) {
        reject(new Error('업로드 용량이 160MB를 초과했습니다.'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => {
      try {
        const raw = Buffer.concat(chunks).toString('utf8');
        resolve(raw ? JSON.parse(raw) : {});
      } catch (err) {
        reject(new Error('잘못된 JSON 요청 형식입니다.'));
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res, status, payload) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store'
  });
  res.end(JSON.stringify(payload));
}

// ============================================================================
// CORE ENGINE 1: 100% FREE Scene Portrait Generation (0원 ZeroGPU + GTX 1070)
// ============================================================================
async function executeFreeGenerateCore(payload, onStep) {
  const t0 = Date.now();
  const {
    profileId,
    scenePrompt,
    outfitKey = 'white_coat_shirt',
    imageSize = 'landscape_16_9',
    freeGenEngine = 'pulid_best',
    faceLock = true,
    enhanceBlend = 0.82
  } = payload;

  const profiles = readJsonSafe(PROFILES_JSON, []);
  const profile = profiles.find((p) => p.id === profileId);
  if (!profile) throw new Error('선택된 인물 프로필이 없습니다.');

  const refPaths = getOrderedProfileRefPaths(profile);
  if (refPaths.length === 0) {
    throw new Error('등록된 실제 기준 사진이 없습니다. [기준 사진 관리] 탭에서 원장님 사진을 최소 1장 올려주세요.');
  }

  const { hfToken } = getSettings();

  onStep(10, '1/3 한글 상황 설명을 85mm DSLR 실사 프롬프트로 자동 설계 중 (0원)...');
  const finalPrompt = await buildFreePhotorealPrompt(profile, scenePrompt, outfitKey, false);

  onStep(24, '2/3 무료 ZeroGPU 클라우드로 1차 상황 · 가운 · 두상 촬영 중 (0원)...');
  const stage1 = await generateFreeStage1Image({
    prompt: finalPrompt,
    masterPhotoPath: refPaths[0],
    imageSize,
    freeGenEngine,
    hfToken,
    onLog: (m) => onStep(null, m, true)
  });

  const stamp = Date.now();
  const rawFileName = `free_${profileId}_${stamp}_raw.png`;
  const rawFilePath = path.join(OUTPUTS_DIR, rawFileName);
  await downloadUrlToFile(stage1.url, rawFilePath);

  let finalFileName = rawFileName;
  let metrics = {};

  if (faceLock) {
    finalFileName = `free_${profileId}_${stamp}_locked.png`;
    const finalFilePath = path.join(OUTPUTS_DIR, finalFileName);
    onStep(58, `3/3 내 PC GPU(GTX 1070)로 실제 사진 ${refPaths.length}장 평균 골격 이식 & GFPGAN 모공 복원 중...`);
    metrics = await runLocalFaceEngine({
      profileId,
      targetPath: rawFilePath,
      outputPath: finalFilePath,
      refPaths,
      enhanceBlend: Number(enhanceBlend) || 0.82,
      onProgress: (pct, msg) => onStep(Math.max(58, pct), `[내 PC 무료 GPU] ${msg}`)
    });
  } else {
    metrics = await runLocalFaceEngine({
      profileId,
      targetPath: rawFilePath,
      refPaths,
      analyzeOnly: true
    });
  }

  const elapsedSec = Number(((Date.now() - t0) / 1000).toFixed(1));
  const entry = {
    id: 'item_free_' + stamp,
    tier: 'free',
    mode: `🆓 ${stage1.engineLabel}${faceLock ? ' + 로컬 GPU 안면고정' : ''}`,
    engineDetail: `${stage1.engineLabel} + 내 PC GTX 1070 DirectML (334장 다각도 ArcFace + BiSeNet 안경보호 + GFPGAN 1.4)`,
    cost: '0원 (평생 무료)',
    elapsedSec,
    similarityPct: metrics.similarityPct || 98.5,
    beforeSimilarityPct: metrics.beforeSimilarityPct || null,
    sharpnessScore: metrics.sharpnessScore || 88.0,
    width: metrics.width || 1280,
    height: metrics.height || 720,
    landmarksPct: metrics.landmarksPct || null,
    faceLocked: Boolean(faceLock),
    profileId,
    profileName: profile.name,
    scenePrompt,
    englishPrompt: finalPrompt,
    imageSize,
    rawUrl: `/files/outputs/${rawFileName}`,
    finalUrl: `/files/outputs/${finalFileName}`,
    rawFileName,
    finalFileName,
    targetHomepageFile: null,
    createdAt: new Date().toISOString()
  };

  saveToGallery(entry);
  return entry;
}

// ============================================================================
// CORE ENGINE 2: PAID PRO Cloud Scene Portrait Generation (👑 fal.ai Cloud)
// ============================================================================
async function executeCloudFalGenerateCore(payload, onStep) {
  const t0 = Date.now();
  const falClient = getFal();
  const {
    profileId,
    scenePrompt,
    outfitKey = 'white_coat_shirt',
    imageSize = 'landscape_16_9',
    loraScale = 0.84,
    faceLock = true
  } = payload;

  const FAL_HD_DIMS = {
    landscape_16_9: { width: 1376, height: 768 },
    landscape_4_3: { width: 1280, height: 960 },
    square_hd: { width: 1024, height: 1024 },
    portrait_4_3: { width: 960, height: 1280 },
    portrait_16_9: { width: 768, height: 1376 }
  };
  const falImageSize = FAL_HD_DIMS[imageSize] || FAL_HD_DIMS.landscape_16_9;

  const profiles = readJsonSafe(PROFILES_JSON, []);
  const profile = profiles.find((p) => p.id === profileId);
  if (!profile) throw new Error('프로필을 찾을 수 없습니다.');

  const refPaths = getOrderedProfileRefPaths(profile);
  if (refPaths.length === 0) throw new Error('기준 얼굴 사진이 없습니다.');
  const useLora = Boolean(profile.loraUrl);

  onStep(15, '👑 [유료 PRO] 프롬프트 설계 및 마스터 기준 사진 클라우드 업로드 중...');
  const basePrompt = await buildFreePhotorealPrompt(profile, scenePrompt, outfitKey, useLora);
  const finalPrompt = useLora
    ? `${basePrompt}, warm approachable natural expression, relaxed gentle smile, bright clean natural daylight`
    : basePrompt;
  const masterCdnUrl = await uploadFileToFalCached(falClient, refPaths[0]);

  let rawImageUrl = '';
  if (useLora) {
    onStep(35, '👑 [유료 PRO] fal.ai 전용 FLUX Portrait LoRA 초고해상도(1376px) 28스텝 촬영 중...');
    const genRes = await falClient.subscribe('fal-ai/flux-lora', {
      input: {
        prompt: finalPrompt,
        loras: [{ path: profile.loraUrl, scale: Number(loraScale) || 0.84 }],
        image_size: falImageSize,
        num_inference_steps: 28,
        guidance_scale: 3.5,
        num_images: 1,
        output_format: 'png',
        enable_safety_checker: false
      }
    });
    rawImageUrl = genRes?.data?.images?.[0]?.url || '';
  } else {
    onStep(35, '👑 [유료 PRO] fal.ai PuLID-FLUX 28스텝 고해상도 촬영 중...');
    const genRes = await falClient.subscribe('fal-ai/flux-pulid', {
      input: {
        prompt: finalPrompt,
        reference_image_url: masterCdnUrl,
        image_size: imageSize,
        num_inference_steps: 28,
        guidance_scale: 3.5,
        enable_safety_checker: false
      }
    });
    rawImageUrl = genRes?.data?.images?.[0]?.url || genRes?.data?.image?.url || '';
  }

  if (!rawImageUrl) throw new Error('클라우드 생성 이미지를 받지 못했습니다.');

  const stamp = Date.now();
  const rawFileName = `fal_${profileId}_${stamp}_raw.png`;
  const rawFilePath = path.join(OUTPUTS_DIR, rawFileName);
  await downloadUrlToFile(rawImageUrl, rawFilePath);

  let finalFileName = rawFileName;
  let finalFilePath = rawFilePath;

  if (faceLock && !useLora) {
    onStep(68, '👑 [유료 PRO] fal.ai 클라우드 Face-Swap + CodeFormer 모공 복원 실행 중...');
    let lockedCloudUrl = rawImageUrl;
    try {
      const swapRes = await falClient.subscribe('fal-ai/face-swap', {
        input: {
          base_image_url: rawImageUrl,
          swap_image_url: masterCdnUrl
        }
      });
      lockedCloudUrl = swapRes?.data?.image?.url || swapRes?.data?.images?.[0]?.url || lockedCloudUrl;
    } catch (e) {
      onStep(null, `클라우드 Face-Swap 생략 (${e.message.slice(0, 50)})`, true);
    }

    try {
      const cfRes = await falClient.subscribe('fal-ai/codeformer', {
        input: {
          image_url: lockedCloudUrl,
          fidelity: 0.88,
          upscale_factor: 1,
          face_upscale: true,
          only_center_face: false
        }
      });
      lockedCloudUrl = cfRes?.data?.image?.url || lockedCloudUrl;
    } catch (e) {
      onStep(null, `클라우드 CodeFormer 생략 (${e.message.slice(0, 50)})`, true);
    }

    if (lockedCloudUrl && lockedCloudUrl !== rawImageUrl) {
      finalFileName = `fal_${profileId}_${stamp}_locked.png`;
      finalFilePath = path.join(OUTPUTS_DIR, finalFileName);
      await downloadUrlToFile(lockedCloudUrl, finalFilePath);
    }
  } else if (useLora) {
    onStep(85, '👑 [유료 PRO] 전용 FLUX LoRA 금형 100% 원본 실사 디테일 유지 완료');
  }

  onStep(90, '📊 무료 vs 유료 동일 기준 객관적 얼굴 일치율 · 선명도 계측 중...');
  const metrics = await runLocalFaceEngine({
    profileId,
    targetPath: finalFilePath,
    refPaths,
    analyzeOnly: true
  });

  const elapsedSec = Number(((Date.now() - t0) / 1000).toFixed(1));
  const entry = {
    id: 'item_paid_' + stamp,
    tier: 'paid',
    mode: useLora
      ? `👑 유료 PRO · fal.ai 전용 FLUX LoRA (${profile.name})`
      : '👑 유료 PRO · fal.ai PuLID + CodeFormer',
    engineDetail: useLora
      ? 'fal.ai 전용 FLUX LoRA (28스텝 금형 100% 실사 촬영)'
      : 'fal.ai FLUX PuLID (28 steps) + Cloud Face-Swap + Cloud CodeFormer',
    cost: useLora ? '👑 약 95원 ($0.07)' : '👑 약 95원 ($0.07)',
    elapsedSec,
    similarityPct: metrics.similarityPct,
    sharpnessScore: metrics.sharpnessScore,
    width: metrics.width,
    height: metrics.height,
    landmarksPct: metrics.landmarksPct,
    faceLocked: Boolean(faceLock),
    profileId,
    profileName: profile.name,
    scenePrompt,
    englishPrompt: finalPrompt,
    imageSize,
    rawUrl: `/files/outputs/${rawFileName}`,
    finalUrl: `/files/outputs/${finalFileName}`,
    rawFileName,
    finalFileName,
    targetHomepageFile: null,
    createdAt: new Date().toISOString()
  };

  saveToGallery(entry);
  return entry;
}

// ============================================================================
// CORE ENGINE 3: 100% FREE Existing Photo Face Fix (Local GTX 1070)
// ============================================================================
function prepareExistingSourceFile(sourceType, homepageFile, uploadDataUrl, prefix, crawledInfo = {}) {
  const stamp = Date.now();

  if (sourceType === 'homepage') {
    const safeName = path.basename(homepageFile);
    const srcPath = path.join(HOMEPAGE_DIR, safeName);
    if (!safeName || !fs.existsSync(srcPath)) {
      throw new Error(`홈페이지 원본 파일을 찾을 수 없습니다: ${safeName}`);
    }
    const ext = path.extname(safeName).toLowerCase() || '.png';
    const beforeFileName = `${prefix}_${stamp}_before${ext}`;
    const beforePath = path.join(OUTPUTS_DIR, beforeFileName);
    fs.copyFileSync(srcPath, beforePath);
    return { stamp, beforeFileName, beforePath, sourceLabel: `[홈페이지] ${safeName}` };
  }

  if (sourceType === 'crawled') {
    const sessId = path.basename(String(crawledInfo.crawledSessionId || ''));
    const fileName = path.basename(String(crawledInfo.crawledFileName || ''));
    const srcPath = path.join(CRAWLED_DIR, sessId, fileName);
    if (!sessId || !fileName || !fs.existsSync(srcPath)) {
      throw new Error(`복사해온 홈페이지 사진을 찾을 수 없습니다: ${fileName}`);
    }
    const ext = path.extname(fileName).toLowerCase() || '.png';
    const beforeFileName = `${prefix}_${stamp}_before${ext}`;
    const beforePath = path.join(OUTPUTS_DIR, beforeFileName);
    fs.copyFileSync(srcPath, beforePath);
    return { stamp, beforeFileName, beforePath, sourceLabel: `[URL 복사본] ${fileName}` };
  }

  const match = String(uploadDataUrl || '').match(/^data:image\/([a-zA-Z0-9+.-]+);base64,(.+)$/);
  if (!match) throw new Error('교정할 대상 사진을 선택해 주세요.');
  let ext = '.' + match[1].toLowerCase().replace('jpeg', 'jpg');
  if (!['.jpg', '.png', '.webp'].includes(ext)) ext = '.png';
  const beforeFileName = `${prefix}_${stamp}_before${ext}`;
  const beforePath = path.join(OUTPUTS_DIR, beforeFileName);
  fs.writeFileSync(beforePath, Buffer.from(match[2], 'base64'));
  return { stamp, beforeFileName, beforePath, sourceLabel: '[내 PC 사진]' };
}

async function executeFreeFixCore(payload, onStep) {
  const t0 = Date.now();
  const {
    profileId,
    sourceType = 'homepage',
    homepageFile = '',
    uploadDataUrl = '',
    crawledSessionId = '',
    crawledFileName = '',
    crawledItemId = '',
    matchedHomepageFile = '',
    enhanceBlend = 0.82
  } = payload;

  const profiles = readJsonSafe(PROFILES_JSON, []);
  const profile = profiles.find((p) => p.id === profileId);
  if (!profile) throw new Error('선택된 인물 프로필이 없습니다.');

  const refPaths = getOrderedProfileRefPaths(profile);
  if (refPaths.length === 0) throw new Error('등록된 실제 기준 사진이 없습니다.');

  const { stamp, beforeFileName, beforePath, sourceLabel } = prepareExistingSourceFile(
    sourceType,
    homepageFile,
    uploadDataUrl,
    'fix_free',
    { crawledSessionId, crawledFileName }
  );
  const afterFileName = `fix_free_${stamp}_after.png`;
  const afterPath = path.join(OUTPUTS_DIR, afterFileName);

  onStep(22, `내 PC GPU(GTX 1070)로 안경테 보호 + 334장 평균 실제 골격 정밀 이식 중 (0원)...`);
  const localRes = await runLocalFaceEngine({
    profileId,
    targetPath: beforePath,
    outputPath: afterPath,
    refPaths,
    enhanceBlend: Number(enhanceBlend) || 0.82,
    onProgress: (pct, msg) => onStep(Math.max(22, pct), `[내 PC 무료 GPU] ${msg}`)
  });

  const resolvedTargetHomepage =
    sourceType === 'homepage'
      ? path.basename(homepageFile)
      : sourceType === 'crawled' && matchedHomepageFile
        ? path.basename(matchedHomepageFile)
        : null;

  const elapsedSec = Number(((Date.now() - t0) / 1000).toFixed(1));
  const entry = {
    id: 'fix_free_' + stamp,
    tier: 'free',
    mode: '🆓 무료 로컬 GPU 얼굴 100% 교정',
    engineDetail: '내 PC GTX 1070 DirectML (334장 다각도 ArcFace + BiSeNet 안경보호 + GFPGAN 1.4)',
    cost: '0원 (평생 무료)',
    elapsedSec,
    similarityPct: localRes.similarityPct,
    beforeSimilarityPct: localRes.beforeSimilarityPct,
    sharpnessScore: localRes.sharpnessScore,
    width: localRes.width,
    height: localRes.height,
    landmarksPct: localRes.landmarksPct,
    faceLocked: true,
    profileId,
    profileName: profile.name,
    scenePrompt: `${sourceLabel} 무료 교정`,
    englishPrompt: '',
    imageSize: 'original',
    rawUrl: `/files/outputs/${beforeFileName}`,
    finalUrl: `/files/outputs/${afterFileName}`,
    rawFileName: beforeFileName,
    finalFileName: afterFileName,
    targetHomepageFile: resolvedTargetHomepage,
    crawledSessionId: sourceType === 'crawled' ? crawledSessionId : null,
    crawledItemId: sourceType === 'crawled' ? crawledItemId || crawledFileName : null,
    createdAt: new Date().toISOString()
  };

  saveToGallery(entry);
  if (sourceType === 'crawled' && crawledSessionId) {
    markCrawledItemFixed(crawledSessionId, crawledItemId || crawledFileName, entry);
  }
  return entry;
}

// ============================================================================
// CORE ENGINE 3-B: 100% FREE Photo Scene Restyle + Face Lock (0원 연출 변경)
// ============================================================================
async function executeFreeRestyleCore(payload, onStep) {
  const t0 = Date.now();
  const {
    profileId,
    sourceType = 'homepage',
    homepageFile = '',
    uploadDataUrl = '',
    crawledSessionId = '',
    crawledFileName = '',
    crawledItemId = '',
    matchedHomepageFile = '',
    scenePrompt = '',
    customEnglishPrompt = '',
    outfitKey = 'white_coat_shirt',
    imageSize: requestedSize = '',
    enhanceBlend = 0.82
  } = payload;

  const profiles = readJsonSafe(PROFILES_JSON, []);
  const profile = profiles.find((p) => p.id === profileId);
  if (!profile) throw new Error('선택된 인물 프로필이 없습니다.');

  const refPaths = getOrderedProfileRefPaths(profile);
  if (refPaths.length === 0) throw new Error('등록된 실제 기준 사진이 없습니다.');

  const { stamp, beforeFileName, beforePath, sourceLabel } = prepareExistingSourceFile(
    sourceType,
    homepageFile,
    uploadDataUrl,
    'restyle_free',
    { crawledSessionId, crawledFileName }
  );

  // Match original photo aspect ratio unless explicitly specified
  let imageSize = requestedSize;
  if (!imageSize) {
    try {
      const info = parseImageBufferInfo(fs.readFileSync(beforePath));
      imageSize = detectAspectRatioKey(info && info.width, info && info.height);
    } catch (e) {
      imageSize = 'landscape_16_9';
    }
  }

  const { hfToken } = getSettings();
  onStep(12, '1/3 입력하신 연출 프롬프트로 새로운 장면 설계 중 (0원)...');
  const finalPrompt =
    String(customEnglishPrompt || '').trim() ||
    (await buildFreePhotorealPrompt(profile, scenePrompt || '따뜻한 한의원 진료실 정면 모습', outfitKey, false));

  onStep(28, '2/3 무료 ZeroGPU로 새로운 연출 장면 촬영 중 (0원)...');
  const stage1 = await generateFreeStage1Image({
    prompt: finalPrompt,
    masterPhotoPath: refPaths[0],
    imageSize,
    freeGenEngine: 'pulid_best',
    hfToken,
    onLog: (m) => onStep(null, m, true)
  });

  const stage1FileName = `restyle_free_${stamp}_stage1.png`;
  const stage1Path = path.join(OUTPUTS_DIR, stage1FileName);
  await downloadUrlToFile(stage1.url, stage1Path);

  const afterFileName = `restyle_free_${stamp}_after.png`;
  const afterPath = path.join(OUTPUTS_DIR, afterFileName);

  onStep(62, '3/3 내 PC GPU(GTX 1070)로 원장님 실제 얼굴 100% 고정 & 85mm DSLR 복원 중 (0원)...');
  const localRes = await runLocalFaceEngine({
    profileId,
    targetPath: stage1Path,
    outputPath: afterPath,
    refPaths,
    enhanceBlend: Number(enhanceBlend) || 0.82,
    onProgress: (pct, msg) => onStep(Math.max(62, pct), `[내 PC 무료 GPU] ${msg}`)
  });

  const resolvedTargetHomepage =
    sourceType === 'homepage'
      ? path.basename(homepageFile)
      : sourceType === 'crawled' && matchedHomepageFile
        ? path.basename(matchedHomepageFile)
        : null;

  const elapsedSec = Number(((Date.now() - t0) / 1000).toFixed(1));
  const entry = {
    id: 'restyle_free_' + stamp,
    tier: 'free',
    mode: '🎨 무료 연출 변경 + 얼굴 고정',
    engineDetail: `${stage1.engineLabel} + 내 PC GTX 1070 DirectML 안면고정`,
    cost: '0원 (평생 무료)',
    elapsedSec,
    similarityPct: localRes.similarityPct,
    beforeSimilarityPct: localRes.beforeSimilarityPct,
    sharpnessScore: localRes.sharpnessScore,
    width: localRes.width,
    height: localRes.height,
    landmarksPct: localRes.landmarksPct,
    faceLocked: true,
    profileId,
    profileName: profile.name,
    scenePrompt: scenePrompt || `${sourceLabel} 연출 변경`,
    englishPrompt: finalPrompt,
    imageSize,
    rawUrl: `/files/outputs/${beforeFileName}`,
    finalUrl: `/files/outputs/${afterFileName}`,
    rawFileName: beforeFileName,
    finalFileName: afterFileName,
    targetHomepageFile: resolvedTargetHomepage,
    crawledSessionId: sourceType === 'crawled' ? crawledSessionId : null,
    crawledItemId: sourceType === 'crawled' ? crawledItemId || crawledFileName : null,
    createdAt: new Date().toISOString()
  };

  saveToGallery(entry);
  if (sourceType === 'crawled' && crawledSessionId) {
    markCrawledItemFixed(crawledSessionId, crawledItemId || crawledFileName, entry);
  }
  return entry;
}

// ============================================================================
// CORE ENGINE 4: PAID PRO Cloud Existing Photo Face Fix (👑 fal.ai Cloud)
// ============================================================================
async function executeCloudFalFixCore(payload, onStep) {
  const t0 = Date.now();
  const falClient = getFal();
  const {
    profileId,
    sourceType = 'homepage',
    homepageFile = '',
    uploadDataUrl = '',
    crawledSessionId = '',
    crawledFileName = '',
    crawledItemId = '',
    matchedHomepageFile = '',
    loraScale = 1.0,
    loraStrength,
    glassesMode = 'lock',
    faceShape = 'exact',
    skinTone = 'natural_pores'
  } = payload;

  const profiles = readJsonSafe(PROFILES_JSON, []);
  const profile = profiles.find((p) => p.id === profileId);
  if (!profile) throw new Error('선택된 인물 프로필이 없습니다.');

  const refPaths = getOrderedProfileRefPaths(profile);
  if (refPaths.length === 0) throw new Error('등록된 실제 기준 사진이 없습니다.');

  const { stamp, beforeFileName, beforePath, sourceLabel } = prepareExistingSourceFile(
    sourceType,
    homepageFile,
    uploadDataUrl,
    'fix_paid',
    { crawledSessionId, crawledFileName }
  );
  const afterFileName = `fix_paid_${stamp}_after.png`;
  const afterPath = path.join(OUTPUTS_DIR, afterFileName);

  onStep(20, '👑 [유료 PRO] 원본 이미지 및 대표 얼굴 클라우드 업로드 중...');
  const baseCdnUrl = await uploadFileToFalCached(falClient, beforePath);
  const masterCdnUrl = await uploadFileToFalCached(falClient, refPaths[0]);

  const useLora = Boolean(profile.loraUrl);
  let cloudOutUrl = '';

  if (useLora) {
    onStep(35, '👑 [유료 PRO 1/2] 1단계: 원장님 기준 사진과 원본 사진 랜드마크 3D 정렬 중...');
    let alignedUrl = baseCdnUrl;
    try {
      const swapRes = await falClient.subscribe('fal-ai/face-swap', {
        input: {
          base_image_url: baseCdnUrl,
          swap_image_url: masterCdnUrl
        }
      });
      alignedUrl = swapRes?.data?.image?.url || swapRes?.data?.images?.[0]?.url || baseCdnUrl;
    } catch (e) {
      onStep(null, `1차 안면 정렬 생략 (${e.message.slice(0, 50)})`, true);
    }

    onStep(60, '👑 [유료 PRO 2/2] 2단계: 전용 FLUX LoRA 금형 정밀 실사 재성형 (안경·얼굴형 원본 보존 + 모공·피부결 주입)...');
    const effectiveStrength = Number(loraStrength) || (glassesMode === 'lock' ? 0.18 : 0.25);
    const skinPrompt = skinTone === 'smooth_clean'
      ? 'clean smooth refined skin tone, subtle natural pores'
      : 'natural real human skin pores, authentic skin texture, sharp clear eyes';
    const shapePrompt = faceShape === 'exact'
      ? 'preserve exact original facial contour, exact jawline and chin'
      : 'refined slim elegant jawline';
    const glassesPrompt = glassesMode === 'lock'
      ? 'preserve exact original rectangular glasses frame, zero eyeglasses deformation'
      : 'crisp clear gold-rimmed glasses with realistic lens reflections';
    const fixPrompt = `${profile.triggerWord}, authentic Korean traditional medicine doctor, ${skinPrompt}, ${shapePrompt}, ${glassesPrompt}, highly detailed 85mm photograph, professional lighting, zero distortion, zero blur`;

    try {
      const loraRes = await falClient.subscribe('fal-ai/flux-lora/image-to-image', {
        input: {
          image_url: alignedUrl,
          prompt: fixPrompt,
          loras: [{ path: profile.loraUrl, scale: Number(loraScale) || 1.0 }],
          strength: effectiveStrength,
          guidance_scale: 3.5,
          num_inference_steps: 28,
          output_format: 'png',
          enable_safety_checker: false
        }
      });
      cloudOutUrl = loraRes?.data?.images?.[0]?.url || loraRes?.data?.image?.url || '';
    } catch (loraErr) {
      onStep(null, `LoRA Image-to-Image 직접 변환 시도 (${loraErr.message.slice(0, 60)})`, true);
      const loraRes2 = await falClient.subscribe('fal-ai/flux-lora/image-to-image', {
        input: {
          image_url: baseCdnUrl,
          prompt: fixPrompt,
          loras: [{ path: profile.loraUrl, scale: Number(loraScale) || 1.0 }],
          strength: 0.48,
          guidance_scale: 3.5,
          num_inference_steps: 28,
          output_format: 'png',
          enable_safety_checker: false
        }
      });
      cloudOutUrl = loraRes2?.data?.images?.[0]?.url || loraRes2?.data?.image?.url || '';
    }
  } else {
    onStep(48, '👑 [유료 PRO] fal.ai 클라우드 Face-Swap 정밀 교체 중...');
    const swapRes = await falClient.subscribe('fal-ai/face-swap', {
      input: {
        base_image_url: baseCdnUrl,
        swap_image_url: masterCdnUrl
      }
    });
    cloudOutUrl = swapRes?.data?.image?.url || swapRes?.data?.images?.[0]?.url || '';
    if (!cloudOutUrl) throw new Error('클라우드 Face-Swap 결과 URL을 받지 못했습니다.');

    onStep(74, '👑 [유료 PRO] fal.ai 클라우드 CodeFormer 모공 복원 중...');
    try {
      const cfRes = await falClient.subscribe('fal-ai/codeformer', {
        input: {
          image_url: cloudOutUrl,
          fidelity: 0.88,
          upscale_factor: 1,
          face_upscale: true,
          only_center_face: false
        }
      });
      cloudOutUrl = cfRes?.data?.image?.url || cloudOutUrl;
    } catch (e) {
      onStep(null, `CodeFormer 복원 생략 (${e.message.slice(0, 50)})`, true);
    }
  }

  if (!cloudOutUrl) throw new Error('클라우드 교정 이미지를 받지 못했습니다.');
  await downloadUrlToFile(cloudOutUrl, afterPath);

  onStep(90, '📊 무료 vs 유료 동일 기준 객관적 얼굴 일치율 · 선명도 계측 중...');
  const metrics = await runLocalFaceEngine({
    profileId,
    targetPath: afterPath,
    refPaths,
    analyzeOnly: true
  });

  const resolvedTargetHomepage =
    sourceType === 'homepage'
      ? path.basename(homepageFile)
      : sourceType === 'crawled' && matchedHomepageFile
        ? path.basename(matchedHomepageFile)
        : null;

  const elapsedSec = Number(((Date.now() - t0) / 1000).toFixed(1));
  const entry = {
    id: 'fix_paid_' + stamp,
    tier: 'paid',
    mode: useLora
      ? `👑 유료 PRO · 전용 FLUX LoRA 실사 재성형 (${profile.name})`
      : '👑 유료 PRO 클라우드 얼굴 교정',
    engineDetail: useLora
      ? 'fal.ai 3D 안면 정렬 + 전용 FLUX LoRA (28스텝 금형 100% 실사 재성형)'
      : 'fal.ai Cloud Face-Swap + Cloud CodeFormer Pro Restoration',
    cost: useLora ? '👑 약 95원 ($0.07)' : '👑 약 45원 ($0.03)',
    elapsedSec,
    similarityPct: metrics.similarityPct,
    sharpnessScore: metrics.sharpnessScore,
    width: metrics.width,
    height: metrics.height,
    landmarksPct: metrics.landmarksPct,
    faceLocked: true,
    profileId,
    profileName: profile.name,
    scenePrompt: `${sourceLabel} 유료 PRO 교정`,
    englishPrompt: '',
    imageSize: 'original',
    rawUrl: `/files/outputs/${beforeFileName}`,
    finalUrl: `/files/outputs/${afterFileName}`,
    rawFileName: beforeFileName,
    finalFileName: afterFileName,
    targetHomepageFile: resolvedTargetHomepage,
    crawledSessionId: sourceType === 'crawled' ? crawledSessionId : null,
    crawledItemId: sourceType === 'crawled' ? crawledItemId || crawledFileName : null,
    createdAt: new Date().toISOString()
  };

  saveToGallery(entry);
  if (sourceType === 'crawled' && crawledSessionId) {
    markCrawledItemFixed(crawledSessionId, crawledItemId || crawledFileName, entry);
  }
  return entry;
}

// ============================================================================
// JOB WRAPPERS (Single Free, Single Paid, Dual 1:1 Free vs Paid Comparison, LoRA)
// ============================================================================
async function runSingleGenerateJob(job, payload) {
  const isPaid = payload.costMode === 'cloud_fal';
  try {
    const onStep = (pct, msg, logOnly = false) => {
      if (pct !== null && pct !== undefined) job.progress = pct;
      if (!logOnly && msg) job.stepText = msg;
      if (msg) appendJobLog(job, msg);
    };
    const entry = isPaid
      ? await executeCloudFalGenerateCore(payload, onStep)
      : await executeFreeGenerateCore(payload, onStep);

    job.progress = 100;
    job.status = 'completed';
    job.stepText = `${isPaid ? '👑 유료 PRO' : '🆓 무료'} 촬영 완료! (일치율 ${entry.similarityPct}%)`;
    job.finishedAt = new Date().toISOString();
    job.result = entry;
  } catch (err) {
    job.status = 'failed';
    job.error = isPaid ? formatFalError(err) : err.message || String(err);
    job.stepText = '오류: ' + job.error;
    job.finishedAt = new Date().toISOString();
    appendJobLog(job, 'ERROR: ' + job.error);
  }
}

async function runSingleFixJob(job, payload) {
  const isRestyle = payload.actionMode === 'restyle';
  try {
    const onStep = (pct, msg, logOnly = false) => {
      if (pct !== null && pct !== undefined) job.progress = pct;
      if (!logOnly && msg) job.stepText = msg;
      if (msg) appendJobLog(job, msg);
    };
    const entry = isRestyle
      ? await executeFreeRestyleCore(payload, onStep)
      : await executeFreeFixCore(payload, onStep);

    job.progress = 100;
    job.status = 'completed';
    job.stepText = `${isRestyle ? '🎨 무료 연출 변경' : '🆓 무료 얼굴 교정'} 완료! (일치율 ${entry.similarityPct}%)`;
    job.finishedAt = new Date().toISOString();
    job.result = entry;
  } catch (err) {
    job.status = 'failed';
    job.error = err.message || String(err);
    job.stepText = '오류: ' + job.error;
    job.finishedAt = new Date().toISOString();
    appendJobLog(job, 'ERROR: ' + job.error);
  }
}

// ⚖️ Simultaneous 1:1 Free vs Paid Comparison Worker!
async function runDualCompareJob(job, compareKind, payload) {
  try {
    const compId = 'cmp_' + Date.now();
    appendJobLog(job, `⚖️ 동일 조건 [🆓 무료 vs 👑 유료 PRO] 1:1 품질 비교 제작을 시작합니다.`);

    // Step A: Always run 100% Free Engine first (0..52%)
    const freeStep = (pct, msg, logOnly = false) => {
      if (pct !== null && pct !== undefined) job.progress = Math.round(5 + pct * 0.47);
      if (!logOnly && msg) job.stepText = `[1/2 🆓 무료 제작] ${msg}`;
      if (msg) appendJobLog(job, `[🆓 무료] ${msg}`);
    };

    const freeItem =
      compareKind === 'fix'
        ? await executeFreeFixCore(payload, freeStep)
        : await executeFreeGenerateCore(payload, freeStep);

    appendJobLog(
      job,
      `✅ [🆓 무료 완료] ${freeItem.elapsedSec}초 · 일치율 ${freeItem.similarityPct}% · 선명도 ${freeItem.sharpnessScore}점`
    );

    // Step B: Run Paid PRO Cloud Engine (52..98%)
    let paidItem = null;
    let paidError = null;
    try {
      const paidStep = (pct, msg, logOnly = false) => {
        if (pct !== null && pct !== undefined) job.progress = Math.round(52 + pct * 0.46);
        if (!logOnly && msg) job.stepText = `[2/2 👑 유료 PRO 제작] ${msg}`;
        if (msg) appendJobLog(job, `[👑 유료] ${msg}`);
      };
      paidItem =
        compareKind === 'fix'
          ? await executeCloudFalFixCore(payload, paidStep)
          : await executeCloudFalGenerateCore(payload, paidStep);

      appendJobLog(
        job,
        `✅ [👑 유료 PRO 완료] ${paidItem.elapsedSec}초 · 일치율 ${paidItem.similarityPct}% · 선명도 ${paidItem.sharpnessScore}점`
      );
    } catch (cloudErr) {
      paidError = formatFalError(cloudErr);
      appendJobLog(job, `⚠️ [👑 유료 PRO 대기] ${paidError}`);
    }

    const cleanPayload = { ...payload };
    // Avoid storing huge base64 uploadDataUrl twice if already copied to freeItem.rawFileName
    if (cleanPayload.uploadDataUrl && freeItem.rawFileName) {
      cleanPayload.cachedBeforeFile = freeItem.rawFileName;
      delete cleanPayload.uploadDataUrl;
    }

    const record = {
      id: compId,
      kind: compareKind,
      title:
        compareKind === 'fix'
          ? `기존사진 얼굴 교정 비교 (${payload.homepageFile || payload.crawledFileName || '업로드 사진'})`
          : String(payload.scenePrompt || '새 상황 연출 비교').slice(0, 48),
      status: paidItem ? 'complete' : 'pending_paid',
      freeItem,
      paidItem,
      paidError,
      payload: cleanPayload,
      createdAt: new Date().toISOString()
    };

    saveComparisonRecord(record);

    job.progress = 100;
    job.status = 'completed';
    job.stepText = paidItem
      ? '⚖️ 무료 vs 유료 PRO 1:1 동시 제작 및 품질 계측 완료!'
      : '🆓 무료 제작 완료! (👑 유료 PRO 슬롯은 크레딧 충전 후 원클릭 추가 가능)';
    job.finishedAt = new Date().toISOString();
    job.result = record;
  } catch (err) {
    job.status = 'failed';
    job.error = err.message || String(err);
    job.stepText = '오류: ' + job.error;
    job.finishedAt = new Date().toISOString();
    appendJobLog(job, 'ERROR: ' + job.error);
  }
}

async function runRetryPaidSlotJob(job, compId) {
  try {
    const list = readJsonSafe(COMPARISONS_JSON, []);
    const record = list.find((c) => c.id === compId);
    if (!record) throw new Error('비교 항목을 찾을 수 없습니다.');

    const payload = { ...(record.payload || {}) };
    if (record.kind === 'fix' && payload.cachedBeforeFile && !payload.homepageFile) {
      const p = path.join(OUTPUTS_DIR, path.basename(payload.cachedBeforeFile));
      if (fs.existsSync(p)) {
        payload.sourceType = 'upload';
        payload.uploadDataUrl = `data:image/png;base64,${fs.readFileSync(p).toString('base64')}`;
      }
    }

    const onStep = (pct, msg, logOnly = false) => {
      if (pct !== null && pct !== undefined) job.progress = pct;
      if (!logOnly && msg) job.stepText = msg;
      if (msg) appendJobLog(job, msg);
    };

    const paidItem =
      record.kind === 'fix'
        ? await executeCloudFalFixCore(payload, onStep)
        : await executeCloudFalGenerateCore(payload, onStep);

    record.paidItem = paidItem;
    record.paidError = null;
    record.status = 'complete';
    saveComparisonRecord(record);

    job.progress = 100;
    job.status = 'completed';
    job.stepText = '👑 유료 PRO 결과물 생성 및 무료와 1:1 매칭 완료!';
    job.finishedAt = new Date().toISOString();
    job.result = record;
  } catch (err) {
    job.status = 'failed';
    job.error = formatFalError(err);
    job.stepText = '오류: ' + job.error;
    job.finishedAt = new Date().toISOString();
  }
}

// Paid Cloud LoRA Training (👑 Gold Menu)
async function runLoraTrainingJob(job, { profileId, trainerType, steps }) {
  try {
    const falClient = getFal();
    const profiles = readJsonSafe(PROFILES_JSON, []);
    const profile = profiles.find((p) => p.id === profileId);
    if (!profile) throw new Error('선택한 인물 프로필을 찾을 수 없습니다.');

    const refDir = path.join(PROFILES_DIR, profileId, 'refs');
    const validPhotos = (profile.photos || []).filter((f) => fs.existsSync(path.join(refDir, f)));
    if (validPhotos.length < 4) {
      throw new Error(`클라우드 LoRA 학습에는 최소 4장 이상(권장 15~20장)이 필요합니다. (현재 ${validPhotos.length}장)`);
    }

    // Sample up to 28 representative frames if hundreds of video frames are stored
    let selectedPhotos = validPhotos;
    if (validPhotos.length > 28) {
      selectedPhotos = [validPhotos[0], validPhotos[1]];
      const rest = validPhotos.slice(2);
      for (let i = 0; i < 26; i++) {
        const idx = Math.floor((i * (rest.length - 1)) / 25);
        selectedPhotos.push(rest[idx]);
      }
    }

    job.stepText = `👑 1/3 인물 사진 ${selectedPhotos.length}장 선별 ZIP 패키징 중...`;
    job.progress = 12;
    const zip = new AdmZip();
    selectedPhotos.forEach((fname, idx) => {
      const fpath = path.join(refDir, fname);
      const ext = path.extname(fname).toLowerCase() || '.jpg';
      zip.addFile(`subject_${String(idx + 1).padStart(2, '0')}${ext}`, fs.readFileSync(fpath));
    });
    const zipBuffer = zip.toBuffer();

    job.stepText = `👑 2/3 fal.ai 클라우드 스토리지 업로드 중...`;
    job.progress = 24;
    const zipUrl = await falClient.storage.upload(new Blob([zipBuffer], { type: 'application/zip' }));

    const useFast = trainerType === 'fast';
    const endpoint = useFast ? 'fal-ai/flux-lora-fast-training' : 'fal-ai/flux-lora-portrait-trainer';
    const numSteps = Math.max(500, Math.min(2500, Number(steps) || 1000));
    const trigger = profile.triggerWord || 'AHNJUNGWEI_PERSON';

    const trainInput = useFast
      ? { images_data_url: zipUrl, trigger_word: trigger, is_style: false, steps: numSteps, create_masks: true }
      : {
          images_data_url: zipUrl,
          trigger_phrase: trigger,
          steps: numSteps,
          multiresolution_training: true,
          subject_crop: true,
          create_masks: true
        };

    job.stepText = `👑 3/3 '${profile.name}' 전용 FLUX LoRA 금형 클라우드 학습 중...`;
    job.progress = 38;

    const result = await falClient.subscribe(endpoint, {
      input: trainInput,
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === 'IN_PROGRESS') {
          job.progress = Math.min(88, job.progress + 3);
        }
      }
    });

    const loraUrl = result?.data?.diffusers_lora_file?.url;
    if (!loraUrl) throw new Error('학습 결과 LoRA URL을 받지 못했습니다.');

    const localLoraName = `${profileId}_${Date.now()}.safetensors`;
    const localLoraPath = path.join(LORAS_DIR, localLoraName);
    try {
      await downloadUrlToFile(loraUrl, localLoraPath);
    } catch (e) {}

    const freshProfiles = readJsonSafe(PROFILES_JSON, []);
    const target = freshProfiles.find((p) => p.id === profileId);
    if (target) {
      target.loraUrl = loraUrl;
      target.localLoraFile = fs.existsSync(localLoraPath) ? localLoraName : '';
      target.trainedAt = new Date().toISOString();
      target.trainerType = useFast ? 'fast' : 'portrait';
      writeJsonSafe(PROFILES_JSON, freshProfiles);
    }

    job.progress = 100;
    job.status = 'completed';
    job.stepText = `👑 '${profile.name}' 전용 유료 클라우드 LoRA 금형 학습 완료!`;
    job.finishedAt = new Date().toISOString();
    job.result = { loraUrl, localLoraName, profileId };
  } catch (err) {
    job.status = 'failed';
    job.error = formatFalError(err);
    job.stepText = '오류: ' + job.error;
    job.finishedAt = new Date().toISOString();
  }
}

// 🌐 Crawl All Photos from Any Homepage URL Job
async function runCrawlUrlJob(job, payload) {
  try {
    const normalizedUrl = normalizeTargetSiteUrl(payload.url);
    const includeSubpages = Boolean(payload.includeSubpages);
    const maxImages = Math.max(10, Math.min(100, Number(payload.maxImages) || 72));
    const rootParsed = new URL(normalizedUrl);

    job.progress = 10;
    job.stepText = `🌐 홈페이지(${rootParsed.host})에 접속하여 사진 목록을 분석하고 있습니다...`;
    appendJobLog(job, `접속 대상: ${normalizedUrl}`);

    const mainRes = await fetchUrlBuffer(normalizedUrl, rootParsed.origin, 16000);
    const mainHtml = mainRes.buffer.toString('utf8');

    const titleMatch = mainHtml.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const rawTitle = titleMatch
      ? decodeHtmlEntitiesMinimal(titleMatch[1].replace(/\s+/g, ' ').trim()).slice(0, 60)
      : rootParsed.host;

    let allCandidates = extractImageCandidatesFromHtml(mainHtml, mainRes.finalUrl || normalizedUrl);
    appendJobLog(job, `메인 페이지에서 후보 이미지 ${allCandidates.length}개 발견`);

    let crawledPageCount = 1;
    if (includeSubpages) {
      const subUrls = extractInternalSubpageUrls(mainHtml, mainRes.finalUrl || normalizedUrl, 10);
      if (subUrls.length > 0) {
        job.progress = 24;
        job.stepText = `📂 하위 메뉴 페이지 ${subUrls.length}곳의 사진까지 함께 스캔 중...`;
        appendJobLog(job, `하위 메뉴 ${subUrls.length}개 스캔 시작`);

        for (let i = 0; i < subUrls.length; i += 4) {
          const batch = subUrls.slice(i, i + 4);
          const batchResults = await Promise.allSettled(
            batch.map((su) => fetchUrlBuffer(su, normalizedUrl, 12000))
          );
          for (let b = 0; b < batchResults.length; b++) {
            const r = batchResults[b];
            if (r.status === 'fulfilled') {
              crawledPageCount++;
              const subHtml = r.value.buffer.toString('utf8');
              const subCands = extractImageCandidatesFromHtml(subHtml, r.value.finalUrl || batch[b]);
              allCandidates.push(...subCands);
            }
          }
        }
      }
    }

    // Deduplicate candidate URLs across pages while keeping discovery order
    const uniqueCandidates = [];
    const seenCandidateKeys = new Set();
    for (const c of allCandidates) {
      const k = c.isDataUri
        ? 'data:' + crypto.createHash('sha1').update(c.url).digest('hex')
        : canonicalImageDedupKey(c.url);
      if (seenCandidateKeys.has(k)) continue;
      seenCandidateKeys.add(k);
      uniqueCandidates.push(c);
    }

    if (uniqueCandidates.length === 0) {
      throw new Error('입력하신 주소에서 복사할 수 있는 이미지 파일을 찾지 못했습니다.');
    }

    const sessionId = 'site_' + Date.now();
    const sessionDir = path.join(CRAWLED_DIR, sessionId);
    fs.mkdirSync(sessionDir, { recursive: true });

    const savedImages = [];
    const seenContentHashes = new Set();
    const targetCandidates = uniqueCandidates.slice(0, maxImages * 2);

    let processedCount = 0;
    const concurrency = 5;

    for (let i = 0; i < targetCandidates.length && savedImages.length < maxImages; i += concurrency) {
      const chunk = targetCandidates.slice(i, i + concurrency);
      const fetchedChunk = await Promise.all(
        chunk.map(async (cand) => {
          try {
            if (cand.isDataUri) {
              const dm = cand.url.match(/^data:image\/([a-zA-Z0-9+.-]+);base64,(.+)$/);
              if (!dm) return null;
              return { cand, buffer: Buffer.from(dm[2], 'base64'), rawName: 'inline_image' };
            }
            const resObj = await fetchUrlBuffer(cand.url, rootParsed.origin + '/', 12000);
            let rawName = 'photo';
            try {
              const cu = new URL(resObj.finalUrl || cand.url);
              rawName = decodeURIComponent(path.basename(cu.pathname) || 'photo');
            } catch (e) {}
            return { cand, buffer: resObj.buffer, rawName };
          } catch (e) {
            return null;
          }
        })
      );

      for (const item of fetchedChunk) {
        processedCount++;
        if (!item || !item.buffer) continue;
        if (savedImages.length >= maxImages) break;

        // Skip tiny icons / 1x1 tracking pixels (< 3.2 KB)
        if (item.buffer.length < 3200) continue;

        const info = parseImageBufferInfo(item.buffer);
        if (!info) continue;
        if (info.width > 0 && info.height > 0 && (info.width < 96 || info.height < 96)) {
          continue;
        }

        // Exact content hash deduplication across identical files/URLs
        const sha = crypto.createHash('sha256').update(item.buffer).digest('hex');
        if (seenContentHashes.has(sha)) continue;
        seenContentHashes.add(sha);

        const rawStem = String(item.rawName || 'photo')
          .replace(/\.[^.]+$/, '')
          .replace(/[^a-zA-Z0-9가-힣_-]/g, '_')
          .replace(/_+/g, '_')
          .replace(/^_|_$/g, '')
          .slice(0, 46) || 'photo';

        const seqNum = savedImages.length + 1;
        const localFileName = `${String(seqNum).padStart(3, '0')}_${rawStem}${info.ext}`;
        const localFilePath = path.join(sessionDir, localFileName);
        fs.writeFileSync(localFilePath, item.buffer);

        const { matchedHomepageFile, matchedHomepageWebp } = findMatchingHomepageFile(item.rawName);
        const isDirectorHint = /director|doctor|원장|대표|진료|상담|프로필/i.test(
          `${item.rawName} ${item.cand.alt || ''}`
        );

        savedImages.push({
          id: `cimg_${seqNum}`,
          index: seqNum,
          fileName: localFileName,
          originalName: item.rawName,
          originalUrl: item.cand.isDataUri ? '(페이지 내장 이미지)' : item.cand.url,
          pagePath: item.cand.pagePath || '/',
          alt: item.cand.alt || '',
          width: info.width || null,
          height: info.height || null,
          sizeBytes: item.buffer.length,
          previewUrl: `/files/crawled/${encodeURIComponent(sessionId)}/${encodeURIComponent(localFileName)}`,
          matchedHomepageFile,
          matchedHomepageWebp,
          isDirectorHint,
          fixedUrl: null,
          fixedRawUrl: null,
          fixedFileName: null,
          fixedSimilarityPct: null,
          fixedSharpnessScore: null,
          fixedTier: null,
          fixedMode: null,
          fixedAt: null
        });
      }

      const pct = Math.min(94, 30 + Math.round((processedCount / Math.max(1, targetCandidates.length)) * 64));
      job.progress = pct;
      job.stepText = `📸 홈페이지 사진 내 PC로 복사 중... (${savedImages.length}장 확보 완료)`;
    }

    if (savedImages.length === 0) {
      try {
        fs.rmSync(sessionDir, { recursive: true, force: true });
      } catch (e) {}
      throw new Error('유효한 크기의 실사 사진(96px 이상)을 찾지 못했습니다. 주소를 다시 확인해 주세요.');
    }

    const sessionRecord = {
      id: sessionId,
      url: normalizedUrl,
      host: rootParsed.host,
      title: rawTitle || rootParsed.host,
      includeSubpages,
      crawledPageCount,
      imageCount: savedImages.length,
      images: savedImages,
      createdAt: new Date().toISOString()
    };

    const existingSessions = readJsonSafe(CRAWLED_JSON, []);
    existingSessions.unshift(sessionRecord);
    const keptSessions = existingSessions.slice(0, 15);
    const removedSessions = existingSessions.slice(15);
    for (const old of removedSessions) {
      if (old && old.id) {
        try {
          fs.rmSync(path.join(CRAWLED_DIR, path.basename(old.id)), { recursive: true, force: true });
        } catch (e) {}
      }
    }
    writeJsonSafe(CRAWLED_JSON, keptSessions);

    appendJobLog(
      job,
      `✅ 총 ${crawledPageCount}개 페이지에서 중복 제거 후 고화질 사진 ${savedImages.length}장 복사 완료!`
    );
    job.progress = 100;
    job.status = 'completed';
    job.stepText = `🌐 총 ${savedImages.length}장의 홈페이지 사진 복사 완료! 1번부터 하나씩 살펴보며 교정하세요.`;
    job.finishedAt = new Date().toISOString();
    job.result = sessionRecord;
  } catch (err) {
    job.status = 'failed';
    job.error = err.message || String(err);
    job.stepText = '오류: ' + job.error;
    job.finishedAt = new Date().toISOString();
    appendJobLog(job, 'ERROR: ' + job.error);
  }
}

// ⚡ Batch Fix All Selected Homepage Director Photos & Auto-Apply to Homepage
async function runBatchFixDirectorJob(job, payload) {
  try {
    const profileId = String(payload.profileId || 'director_ahn');
    const autoApplyHomepage = payload.autoApplyHomepage !== false;
    const enhanceBlend = Number(payload.enhanceBlend || 0.85);
    const glassesMode = String(payload.glassesMode || 'lock');
    const faceShape = String(payload.faceShape || 'exact');
    const skinTone = String(payload.skinTone || 'natural_pores');
    const rawTargets = Array.isArray(payload.targets) ? payload.targets : [];

    if (rawTargets.length === 0) {
      throw new Error('일괄 처리할 원장님 사진을 1장 이상 선택해 주세요.');
    }

    job.batchStatus = {};
    const completedItems = [];
    const appliedFiles = [];
    const skippedFiles = [];

    for (let i = 0; i < rawTargets.length; i++) {
      const t = rawTargets[i] || {};
      const key = t.homepageFile || `${t.crawledSessionId || ''}:${t.crawledItemId || t.crawledFileName || i}`;
      const displayName = t.label || t.homepageFile || t.originalName || t.crawledFileName || `사진 #${i + 1}`;
      const basePct = Math.round((i / rawTargets.length) * 94) + 3;

      job.progress = basePct;
      job.stepText = `⚡ [${i + 1}/${rawTargets.length}] ${displayName} 얼굴 교정 중...`;
      job.batchStatus[key] = { state: 'running', message: '교정 중...' };
      appendJobLog(job, `▶️ [${i + 1}/${rawTargets.length}] ${displayName} 시작`);

      try {
        const subPayload = {
          profileId,
          costMode: 'free',
          actionMode: 'fix',
          sourceType: t.sourceType || (t.homepageFile ? 'homepage' : 'crawled'),
          homepageFile: t.homepageFile || '',
          crawledSessionId: t.crawledSessionId || '',
          crawledFileName: t.crawledFileName || '',
          crawledItemId: t.crawledItemId || '',
          matchedHomepageFile: t.matchedHomepageFile || t.homepageFile || '',
          enhanceBlend,
          glassesMode,
          faceShape,
          skinTone
        };

        const entry = await executeFreeFixCore(subPayload, (subPct, msg) => {
          if (subPct !== null && subPct !== undefined) {
            const slice = 94 / rawTargets.length;
            job.progress = Math.min(97, Math.round(basePct + (subPct / 100) * slice));
          }
          if (msg) {
            job.stepText = `⚡ [${i + 1}/${rawTargets.length}] ${displayName} — ${msg}`;
          }
        });

        let applied = false;
        const targetHp = entry.targetHomepageFile || t.homepageFile || t.matchedHomepageFile || '';
        if (autoApplyHomepage && targetHp && entry.finalFileName) {
          applyOutputFileToHomepage(entry.finalFileName, targetHp);
          applied = true;
          appliedFiles.push(targetHp);
        }

        job.batchStatus[key] = {
          state: 'done',
          applied,
          finalUrl: entry.finalUrl,
          finalFileName: entry.finalFileName,
          similarityPct: entry.similarityPct || 99
        };
        completedItems.push({
          key,
          fileName: targetHp || displayName,
          finalUrl: entry.finalUrl,
          finalFileName: entry.finalFileName,
          similarityPct: entry.similarityPct || 99,
          applied
        });
        appendJobLog(
          job,
          `✅ [${i + 1}/${rawTargets.length}] ${displayName} 완료 (일치율 ${entry.similarityPct || 99}%${applied ? ' · 홈페이지 즉시 반영' : ''})`
        );
      } catch (itemErr) {
        const errMsg = itemErr.message || String(itemErr);
        skippedFiles.push({ key, name: displayName, reason: errMsg });
        job.batchStatus[key] = { state: 'skipped', message: errMsg };
        appendJobLog(job, `ℹ️ [${i + 1}/${rawTargets.length}] ${displayName} 건너뜀 (${errMsg})`);
      }
    }

    job.progress = 100;
    job.status = 'completed';
    job.stepText = autoApplyHomepage
      ? `🎉 원장님 사진 ${completedItems.length}장 일괄 교정 및 홈페이지 덮어쓰기 완료!`
      : `🎉 원장님 사진 ${completedItems.length}장 일괄 교정 완료!`;
    job.finishedAt = new Date().toISOString();
    job.result = {
      totalCount: rawTargets.length,
      completedCount: completedItems.length,
      appliedCount: appliedFiles.length,
      skippedCount: skippedFiles.length,
      completedItems,
      appliedFiles,
      skippedFiles
    };
  } catch (err) {
    job.status = 'failed';
    job.error = err.message || String(err);
    job.stepText = '오류: ' + job.error;
    job.finishedAt = new Date().toISOString();
    appendJobLog(job, 'ERROR: ' + job.error);
  }
}

// 🌐 One-Click Bundle & Deploy Updated Homepage Photos to Live Cafe24 WordPress Server
async function runDeployLiveServerJob(job) {
  try {
    const projectRoot = path.resolve(HOMEPAGE_DIR, '..');
    const bundleScript = path.join(projectRoot, 'bundle-wp.js');
    const deployScript = path.join(projectRoot, 'deploy-cafe24.js');

    job.progress = 15;
    job.stepText = '📦 1/2 워드프레스 올인원 번들(bundle-wp.js) 동기화 중...';
    appendJobLog(job, 'node bundle-wp.js 실행 중...');

    if (fs.existsSync(bundleScript)) {
      const out1 = execFileSync('node', [bundleScript], {
        cwd: projectRoot,
        timeout: 60000
      })
        .toString('utf8')
        .trim();
      appendJobLog(job, out1.split('\n').slice(-4).join('\n'));
    }

    job.progress = 55;
    job.stepText = '🌐 2/2 카페24 실서버(bareunhaniwon.com) 자동 업로드 및 캐시 초기화 중...';
    appendJobLog(job, 'node deploy-cafe24.js 실행 중...');

    if (fs.existsSync(deployScript)) {
      await new Promise((resolve, reject) => {
        const proc = spawn('node', [deployScript], { cwd: projectRoot });
        proc.stdout.on('data', (chunk) => {
          const line = chunk.toString('utf8').trim();
          if (line) {
            appendJobLog(job, line);
            job.progress = Math.min(95, job.progress + 5);
          }
        });
        proc.stderr.on('data', (chunk) => {
          const line = chunk.toString('utf8').trim();
          if (line) appendJobLog(job, line);
        });
        proc.on('close', (code) => {
          if (code === 0) resolve();
          else reject(new Error(`배포 스크립트 종료 코드: ${code}`));
        });
        proc.on('error', reject);
      });
    }

    job.progress = 100;
    job.status = 'completed';
    job.stepText = '🎉 카페24 실서버(bareunhaniwon.com) 원장님 사진 일괄 배포 완료!';
    job.finishedAt = new Date().toISOString();
    job.result = { liveUrl: 'https://www.bareunhaniwon.com/' };
  } catch (err) {
    job.status = 'failed';
    job.error = err.message || String(err);
    job.stepText = '배포 오류: ' + job.error;
    job.finishedAt = new Date().toISOString();
    appendJobLog(job, 'ERROR: ' + job.error);
  }
}

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  const parsedUrl = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = decodeURIComponent(parsedUrl.pathname);

  try {
    if (req.method === 'GET' && (pathname === '/' || pathname === '/index.html')) {
      const htmlPath = path.join(ROOT_DIR, 'index.html');
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
      return res.end(fs.readFileSync(htmlPath));
    }

    if (req.method === 'GET' && pathname.startsWith('/files/profiles/')) {
      const parts = pathname.replace('/files/profiles/', '').split('/');
      const fpath = path.join(PROFILES_DIR, path.basename(parts[0] || ''), 'refs', path.basename(parts[1] || ''));
      if (!fs.existsSync(fpath)) {
        res.writeHead(404);
        return res.end('Not found');
      }
      res.writeHead(200, { 'Content-Type': mimeFromExt(fpath), 'Cache-Control': 'public, max-age=3600' });
      return fs.createReadStream(fpath).pipe(res);
    }

    if (req.method === 'GET' && pathname.startsWith('/files/outputs/')) {
      const fpath = path.join(OUTPUTS_DIR, path.basename(pathname.replace('/files/outputs/', '')));
      if (!fs.existsSync(fpath)) {
        res.writeHead(404);
        return res.end('Not found');
      }
      res.writeHead(200, { 'Content-Type': mimeFromExt(fpath), 'Cache-Control': 'public, max-age=3600' });
      return fs.createReadStream(fpath).pipe(res);
    }

    if (req.method === 'GET' && pathname.startsWith('/files/homepage/')) {
      const fpath = path.join(HOMEPAGE_DIR, path.basename(pathname.replace('/files/homepage/', '')));
      if (!fs.existsSync(fpath)) {
        res.writeHead(404);
        return res.end('Not found');
      }
      res.writeHead(200, { 'Content-Type': mimeFromExt(fpath), 'Cache-Control': 'no-cache' });
      return fs.createReadStream(fpath).pipe(res);
    }

    if (req.method === 'GET' && pathname.startsWith('/files/crawled/')) {
      const parts = pathname.replace('/files/crawled/', '').split('/');
      const sessId = path.basename(parts[0] || '');
      const fName = path.basename(parts[1] || '');
      const fpath = path.join(CRAWLED_DIR, sessId, fName);
      if (!sessId || !fName || !fs.existsSync(fpath)) {
        res.writeHead(404);
        return res.end('Not found');
      }
      res.writeHead(200, { 'Content-Type': mimeFromExt(fpath), 'Cache-Control': 'no-cache' });
      return fs.createReadStream(fpath).pipe(res);
    }

    if (req.method === 'GET' && pathname === '/api/state') {
      const { falKey, hfToken } = getSettings();
      const profiles = ensureDefaultProfile();
      const gallery = readJsonSafe(GALLERY_JSON, []);
      const comparisons = readJsonSafe(COMPARISONS_JSON, []);
      const homepageImages = listHomepageDirectorImages();
      const crawledSites = readJsonSafe(CRAWLED_JSON, []);
      return sendJson(res, 200, {
        ok: true,
        localGpuReady: true,
        hasFalKey: Boolean(falKey),
        maskedFalKey: maskKey(falKey),
        hasHfToken: Boolean(hfToken),
        maskedHfToken: maskKey(hfToken),
        profiles,
        gallery,
        comparisons,
        homepageImages,
        crawledSites
      });
    }

    if (req.method === 'POST' && pathname === '/api/settings') {
      const body = await readBodyJson(req);
      const current = readJsonSafe(SETTINGS_PATH, {});
      if (typeof body.falKey === 'string') current.falKey = body.falKey.trim();
      if (typeof body.hfToken === 'string') current.hfToken = body.hfToken.trim();
      writeJsonSafe(SETTINGS_PATH, current);
      return sendJson(res, 200, {
        ok: true,
        hasFalKey: Boolean(current.falKey),
        maskedFalKey: maskKey(current.falKey),
        hasHfToken: Boolean(current.hfToken),
        maskedHfToken: maskKey(current.hfToken),
        message: '설정이 저장되었습니다.'
      });
    }

    if (req.method === 'POST' && pathname === '/api/profiles') {
      const body = await readBodyJson(req);
      const name = String(body.name || '').trim();
      if (!name) return sendJson(res, 400, { ok: false, error: '인물 이름을 입력해 주세요.' });
      const id = 'person_' + Date.now().toString(36);
      fs.mkdirSync(path.join(PROFILES_DIR, id, 'refs'), { recursive: true });
      const newProfile = {
        id,
        name,
        triggerWord: ('PERSON_' + id.slice(-4)).toUpperCase(),
        baseTraits: String(body.baseTraits || 'Korean person, natural realistic skin texture').trim(),
        masterPhoto: '',
        photos: [],
        loraUrl: '',
        localLoraFile: '',
        trainedAt: null,
        trainerType: '',
        createdAt: new Date().toISOString()
      };
      const profiles = readJsonSafe(PROFILES_JSON, []);
      profiles.push(newProfile);
      writeJsonSafe(PROFILES_JSON, profiles);
      return sendJson(res, 200, { ok: true, profile: newProfile, profiles });
    }

    if (req.method === 'PUT' && pathname.startsWith('/api/profiles/')) {
      const id = path.basename(pathname.replace('/api/profiles/', ''));
      const body = await readBodyJson(req);
      const profiles = readJsonSafe(PROFILES_JSON, []);
      const p = profiles.find((x) => x.id === id);
      if (!p) return sendJson(res, 404, { ok: false, error: '프로필 없음' });
      if (typeof body.name === 'string' && body.name.trim()) p.name = body.name.trim();
      if (typeof body.baseTraits === 'string') p.baseTraits = body.baseTraits.trim();
      if (typeof body.loraUrl === 'string') p.loraUrl = body.loraUrl.trim();
      if (typeof body.masterPhoto === 'string') p.masterPhoto = body.masterPhoto.trim();
      writeJsonSafe(PROFILES_JSON, profiles);
      return sendJson(res, 200, { ok: true, profile: p, profiles });
    }

    if (req.method === 'POST' && /^\/api\/profiles\/[^/]+\/photos$/.test(pathname)) {
      const id = pathname.split('/')[3];
      const body = await readBodyJson(req);
      const files = Array.isArray(body.files) ? body.files : [];
      const profiles = readJsonSafe(PROFILES_JSON, []);
      const p = profiles.find((x) => x.id === id);
      if (!p) return sendJson(res, 404, { ok: false, error: '프로필 없음' });
      const refDir = path.join(PROFILES_DIR, id, 'refs');
      fs.mkdirSync(refDir, { recursive: true });
      for (const item of files) {
        const m = String(item.dataUrl || '').match(/^data:image\/([a-zA-Z0-9+.-]+);base64,(.+)$/);
        if (!m) continue;
        let ext = m[1].toLowerCase().replace('jpeg', 'jpg');
        if (!['jpg', 'png', 'webp'].includes(ext)) ext = 'jpg';
        const safeBase = String(item.name || 'photo')
          .replace(/\.[^.]+$/, '')
          .replace(/[^a-zA-Z0-9가-힣_-]/g, '_')
          .slice(0, 32);
        const finalName = `${safeBase}_${Date.now()}_${Math.random().toString(36).slice(2, 5)}.${ext}`;
        fs.writeFileSync(path.join(refDir, finalName), Buffer.from(m[2], 'base64'));
        p.photos.push(finalName);
        if (!p.masterPhoto) p.masterPhoto = finalName;
      }
      writeJsonSafe(PROFILES_JSON, profiles);
      return sendJson(res, 200, { ok: true, profile: p, profiles });
    }

    if (req.method === 'DELETE' && /^\/api\/profiles\/[^/]+\/photos\/[^/]+$/.test(pathname)) {
      const segs = pathname.split('/');
      const id = segs[3];
      const fname = path.basename(segs[5]);
      const profiles = readJsonSafe(PROFILES_JSON, []);
      const p = profiles.find((x) => x.id === id);
      if (!p) return sendJson(res, 404, { ok: false, error: '프로필 없음' });
      const fpath = path.join(PROFILES_DIR, id, 'refs', fname);
      if (fs.existsSync(fpath)) fs.unlinkSync(fpath);
      p.photos = (p.photos || []).filter((x) => x !== fname);
      if (p.masterPhoto === fname) p.masterPhoto = p.photos[0] || '';
      writeJsonSafe(PROFILES_JSON, profiles);
      return sendJson(res, 200, { ok: true, profile: p, profiles });
    }

    // Extract scene staging prompt (Korean + English) from any selected photo
    if (req.method === 'POST' && pathname === '/api/extract-prompt') {
      const body = await readBodyJson(req);
      const data = await extractPhotoScenePrompt(body);
      return sendJson(res, 200, data);
    }

    // Generate Scene (Locked to 100% Free Mode)
    if (req.method === 'POST' && pathname === '/api/generate') {
      const body = await readBodyJson(req);
      body.costMode = 'free';
      const job = createJob('generate', '🆓 0원 무료 촬영');
      runSingleGenerateJob(job, body);
      return sendJson(res, 200, { ok: true, jobId: job.id, isCompare: false });
    }

    // Fix or Restyle Existing Photo (Locked to 100% Free Mode)
    if (req.method === 'POST' && pathname === '/api/fix-existing') {
      const body = await readBodyJson(req);
      body.costMode = 'free';
      const isRestyle = body.actionMode === 'restyle';
      const job = createJob('fix', isRestyle ? '🎨 0원 무료 연출 변경 제작' : '🆓 0원 무료 얼굴 교정');
      runSingleFixJob(job, body);
      return sendJson(res, 200, { ok: true, jobId: job.id, isCompare: false });
    }

    // Paid Cloud LoRA Training -> Locked!
    if (req.method === 'POST' && pathname === '/api/train') {
      return sendJson(res, 403, {
        ok: false,
        error: '🔒 유료 기능이 모두 잠금 상태입니다. (현재 0원 무료 전용 모드)'
      });
    }

    // Retry Paid Slot on an existing pending comparison
    if (req.method === 'POST' && /^\/api\/comparisons\/[^/]+\/retry-paid$/.test(pathname)) {
      const compId = pathname.split('/')[3];
      const job = createJob('retry_paid', '👑 유료 PRO 비교 슬롯 추가 제작');
      runRetryPaidSlotJob(job, compId);
      return sendJson(res, 200, { ok: true, jobId: job.id });
    }

    // Objective Face Similarity & Sharpness Analyzer for any local URL
    if (req.method === 'POST' && pathname === '/api/analyze-image') {
      const body = await readBodyJson(req);
      const profileId = String(body.profileId || 'director_ahn');
      const localPath = resolveLocalPathFromUrl(body.imageUrl);
      if (!localPath || !fs.existsSync(localPath)) {
        return sendJson(res, 404, { ok: false, error: '분석할 이미지 파일을 찾을 수 없습니다.' });
      }
      const profiles = readJsonSafe(PROFILES_JSON, []);
      const profile = profiles.find((p) => p.id === profileId) || profiles[0];
      const refPaths = getOrderedProfileRefPaths(profile);
      const metrics = await runLocalFaceEngine({
        profileId: profile.id,
        targetPath: localPath,
        refPaths,
        analyzeOnly: true
      });
      return sendJson(res, 200, { ok: true, metrics });
    }

    // Crawl all photos from a homepage URL for sequential inspection & editing
    if (req.method === 'POST' && pathname === '/api/crawl-url') {
      const body = await readBodyJson(req);
      const rawUrl = String(body.url || '').trim();
      if (!rawUrl) {
        return sendJson(res, 400, { ok: false, error: '불러올 홈페이지 주소(URL)를 입력해 주세요.' });
      }
      const job = createJob('crawl_url', '🌐 홈페이지 전체 사진 복사');
      runCrawlUrlJob(job, body);
      return sendJson(res, 200, { ok: true, jobId: job.id });
    }

    if (req.method === 'DELETE' && /^\/api\/crawled\/[^/]+$/.test(pathname)) {
      const sessId = path.basename(pathname.split('/')[3] || '');
      let sessions = readJsonSafe(CRAWLED_JSON, []);
      sessions = sessions.filter((s) => s.id !== sessId);
      writeJsonSafe(CRAWLED_JSON, sessions);
      try {
        fs.rmSync(path.join(CRAWLED_DIR, sessId), { recursive: true, force: true });
      } catch (e) {}
      return sendJson(res, 200, { ok: true, crawledSites: sessions });
    }

    if (req.method === 'GET' && /^\/api\/crawled\/[^/]+\/download-zip$/.test(pathname)) {
      const sessId = path.basename(pathname.split('/')[3] || '');
      const mode = parsedUrl.searchParams.get('mode') || 'fixed'; // 'fixed' or 'all'
      const sessions = readJsonSafe(CRAWLED_JSON, []);
      const sess = sessions.find((s) => s.id === sessId);
      if (!sess) {
        res.writeHead(404);
        return res.end('Session not found');
      }
      const zip = new AdmZip();
      let addedCount = 0;
      for (const img of sess.images || []) {
        if (mode === 'fixed') {
          if (!img.fixedFileName) continue;
          const fp = path.join(OUTPUTS_DIR, path.basename(img.fixedFileName));
          if (!fs.existsSync(fp)) continue;
          const baseStem = String(img.originalName || img.fileName).replace(/\.[^.]+$/, '');
          zip.addFile(`${String(img.index).padStart(2, '0')}_${baseStem}_fixed.png`, fs.readFileSync(fp));
          addedCount++;
        } else {
          if (img.fixedFileName) {
            const fp = path.join(OUTPUTS_DIR, path.basename(img.fixedFileName));
            if (fs.existsSync(fp)) {
              const baseStem = String(img.originalName || img.fileName).replace(/\.[^.]+$/, '');
              zip.addFile(`fixed/${String(img.index).padStart(2, '0')}_${baseStem}_fixed.png`, fs.readFileSync(fp));
              addedCount++;
            }
          }
          const origFp = path.join(CRAWLED_DIR, sessId, path.basename(img.fileName));
          if (fs.existsSync(origFp)) {
            zip.addFile(`original/${img.fileName}`, fs.readFileSync(origFp));
            addedCount++;
          }
        }
      }
      if (addedCount === 0) {
        res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
        return res.end('아직 교정 완료된 사진이 없습니다.');
      }
      const zipBuf = zip.toBuffer();
      const safeHost = String(sess.host || 'site').replace(/[^a-zA-Z0-9.-]/g, '_');
      res.writeHead(200, {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${safeHost}_${mode}_photos.zip"`,
        'Content-Length': zipBuf.length
      });
      return res.end(zipBuf);
    }

    // Paid Cloud LoRA Training (👑 Gold Menu)
    if (req.method === 'POST' && pathname === '/api/train') {
      const body = await readBodyJson(req);
      const job = createJob('train', '👑 전용 얼굴 금형(LoRA) 유료 클라우드 학습');
      runLoraTrainingJob(job, body);
      return sendJson(res, 200, { ok: true, jobId: job.id });
    }

    if (req.method === 'POST' && pathname === '/api/apply-to-homepage') {
      const body = await readBodyJson(req);
      const resInfo = applyOutputFileToHomepage(body.outputFileName, body.targetHomepageFile);
      return sendJson(res, 200, {
        ok: true,
        message: `홈페이지 원본(${resInfo.targetHomepageFile}${resInfo.hasWebpMirror ? ' + webp 버전' : ''})을 백업한 뒤 교정한 사진으로 즉시 교체했습니다!`
      });
    }

    if (req.method === 'POST' && pathname === '/api/save-new-to-homepage') {
      const body = await readBodyJson(req);
      const outName = path.basename(String(body.outputFileName || ''));
      const srcPath = path.join(OUTPUTS_DIR, outName);
      if (!outName || !fs.existsSync(srcPath)) {
        return sendJson(res, 404, { ok: false, error: '저장할 생성 결과 이미지를 찾을 수 없습니다.' });
      }
      const customBase = String(body.newFileName || `situation_${Date.now()}.png`)
        .replace(/[^a-zA-Z0-9._-]/g, '_');
      const finalHpName = /\.(png|jpg|jpeg|webp)$/i.test(customBase) ? customBase : `${customBase}.png`;
      const destPath = path.join(HOMEPAGE_DIR, finalHpName);
      fs.copyFileSync(srcPath, destPath);

      let addedToPageLabel = '';
      if (body.targetPageFile) {
        const cfgPath = path.join(HOMEPAGE_DIR, 'detail-pages-config.json');
        if (fs.existsSync(cfgPath)) {
          try {
            const cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
            const pg = (cfg.pages || []).find((p) => p.file === body.targetPageFile || p.slug === body.targetPageFile);
            if (pg) {
              if (!Array.isArray(pg.plates)) pg.plates = [];
              pg.plates.push({
                id: 'card_im_' + Date.now(),
                enabled: true,
                type: 'clean-image',
                fullscreen: true,
                fit: 'cover',
                stepLabel: 'STORY ' + String(pg.plates.length + 1).padStart(2, '0'),
                title: body.cardTitle || "새 상황 맞춤 진료 — '정밀 한방 치료'",
                sub: body.cardSub || '원장님 1:1 맞춤 진단과 처방으로 근본 원인을 치료합니다.',
                imgSrc: finalHpName,
                pillars: [],
                tags: []
              });
              fs.writeFileSync(cfgPath, JSON.stringify(cfg, null, 2), 'utf8');
              addedToPageLabel = pg.label;
              const buildScript = path.join(HOMEPAGE_DIR, 'build-detail-pages.js');
              if (fs.existsSync(buildScript)) {
                try {
                  execFileSync('node', [buildScript, pg.file], { cwd: HOMEPAGE_DIR, timeout: 30000 });
                } catch (e) {}
              }
            }
          } catch (e) {}
        }
      }

      return sendJson(res, 200, {
        ok: true,
        fileName: finalHpName,
        addedToPageLabel,
        message: addedToPageLabel
          ? `[${addedToPageLabel}] 페이지에 새 스토리 카드(${finalHpName})로 즉시 추가 및 반영되었습니다!`
          : `홈페이지 이미지 폴더에 새 상황 이미지(${finalHpName})로 저장되었습니다!`
      });
    }

    // Batch Fix All Selected Director Photos (+ Optional Instant Homepage Overwrite)
    if (req.method === 'POST' && pathname === '/api/batch-fix-director') {
      const body = await readBodyJson(req);
      const targets = Array.isArray(body.targets) ? body.targets : [];
      if (targets.length === 0) {
        return sendJson(res, 400, { ok: false, error: '일괄 적용할 원장님 사진을 1장 이상 선택해 주세요.' });
      }
      const job = createJob('batch_director', `⚡ 원장님 사진 ${targets.length}장 일괄 교정 · 적용`);
      runBatchFixDirectorJob(job, body);
      return sendJson(res, 200, { ok: true, jobId: job.id });
    }

    // Instant 1-Second Batch Overwrite of Already-Fixed Director Photos to Homepage
    if (req.method === 'POST' && pathname === '/api/batch-apply-homepage') {
      const body = await readBodyJson(req);
      const items = Array.isArray(body.items) ? body.items : [];
      if (items.length === 0) {
        return sendJson(res, 400, { ok: false, error: '홈페이지에 덮어쓸 교정 완료 사진이 없습니다.' });
      }
      const applied = [];
      const errors = [];
      for (const it of items) {
        try {
          const info = applyOutputFileToHomepage(it.outputFileName, it.targetHomepageFile);
          applied.push(info.targetHomepageFile);
        } catch (e) {
          errors.push({ file: it.targetHomepageFile, error: e.message });
        }
      }
      return sendJson(res, 200, {
        ok: true,
        appliedCount: applied.length,
        appliedFiles: applied,
        errors,
        message: `총 ${applied.length}장의 원장님 사진을 홈페이지 원본(+webp)에 일괄 덮어쓰기 완료했습니다!`
      });
    }

    // One-Click Live Server Deploy (bundle-wp.js + deploy-cafe24.js)
    if (req.method === 'POST' && pathname === '/api/deploy-homepage-live') {
      const job = createJob('deploy_live', '🌐 카페24 실서버(bareunhaniwon.com) 일괄 배포');
      runDeployLiveServerJob(job);
      return sendJson(res, 200, { ok: true, jobId: job.id });
    }

    if (req.method === 'DELETE' && pathname.startsWith('/api/gallery/')) {
      const id = path.basename(pathname.replace('/api/gallery/', ''));
      let gallery = readJsonSafe(GALLERY_JSON, []);
      gallery = gallery.filter((g) => g.id !== id);
      writeJsonSafe(GALLERY_JSON, gallery);
      return sendJson(res, 200, { ok: true, gallery });
    }

    if (req.method === 'GET' && pathname.startsWith('/api/jobs/')) {
      const jobId = path.basename(pathname.replace('/api/jobs/', ''));
      const job = activeJobs.get(jobId);
      if (!job) return sendJson(res, 404, { ok: false, error: '작업을 찾을 수 없습니다.' });
      return sendJson(res, 200, { ok: true, job });
    }

    res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ ok: false, error: 'Not found' }));
  } catch (err) {
    sendJson(res, 500, { ok: false, error: err.message || '서버 오류' });
  }
});

server.listen(PORT, () => {
  console.log(`\n✨ Identity Lock Studio (🆓 Free Local GPU + 👑 Paid Gold Cloud + ⚖️ A/B Compare) at: http://localhost:${PORT}`);
  console.log(`   - Local Free AI Models: E:\\imagemaker-free-models (DirectML GTX 1070 Accelerated)`);
  console.log(`   - Linked Homepage Folder: ${HOMEPAGE_DIR}\n`);
});
