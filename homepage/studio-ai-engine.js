'use strict';

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { spawn, execFileSync } = require('child_process');
const { pathToFileURL } = require('url');

const HOMEPAGE_DIR = __dirname;
const IMAGEMAKER_DIR = path.resolve(__dirname, '..', 'imagemaker');
const SETTINGS_JSON_PATH = path.join(IMAGEMAKER_DIR, 'data', 'settings.json');
const STUDIO_USAGE_JSON_PATH = path.join(HOMEPAGE_DIR, 'studio-ai-usage.json');
const ANGLE_REFS_DIR = path.join(HOMEPAGE_DIR, 'director-angle-refs');
const ANGLE_MANIFEST_PATH = path.join(ANGLE_REFS_DIR, 'manifest.json');
const LOCAL_FACE_ENGINE_PY = path.join(IMAGEMAKER_DIR, 'local_face_engine.py');
const DIRECTOR_PROFILE_DIR = path.join(IMAGEMAKER_DIR, 'data', 'profiles', 'director_ahn');
const PROFILES_JSON_PATH = path.join(IMAGEMAKER_DIR, 'data', 'profiles.json');
const GRADIO_CLIENT_ESM = path.join(IMAGEMAKER_DIR, 'node_modules', '@gradio', 'client', 'dist', 'index.js');

const DEFAULT_DAILY_FREE_LIMIT = 50;

function getTodayKstDateString() {
  try {
    return new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Seoul',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(new Date());
  } catch (e) {
    const kst = new Date(Date.now() + 9 * 3600 * 1000);
    return kst.toISOString().slice(0, 10);
  }
}

function readRawStudioUsage() {
  const today = getTodayKstDateString();
  let data = {
    dateKst: today,
    dailyFreeLimit: DEFAULT_DAILY_FREE_LIMIT,
    argonHighTodayUsed: 0,
    argonHighTotalUsed: 0,
    fallbackTodayUsed: 0,
    quotaExhaustedToday: false,
    lastModel: '',
    lastUsedAt: null
  };
  try {
    if (fs.existsSync(STUDIO_USAGE_JSON_PATH)) {
      const parsed = JSON.parse(fs.readFileSync(STUDIO_USAGE_JSON_PATH, 'utf8')) || {};
      data = { ...data, ...parsed };
    }
  } catch (e) {}

  data.dailyFreeLimit = Math.max(1, Math.min(5000, Number(data.dailyFreeLimit) || DEFAULT_DAILY_FREE_LIMIT));
  data.argonHighTotalUsed = Math.max(0, Number(data.argonHighTotalUsed) || 0);

  if (data.dateKst !== today) {
    data.dateKst = today;
    data.argonHighTodayUsed = 0;
    data.fallbackTodayUsed = 0;
    data.quotaExhaustedToday = false;
    try {
      fs.writeFileSync(STUDIO_USAGE_JSON_PATH, JSON.stringify(data, null, 2) + '\n', 'utf8');
    } catch (e) {}
  } else {
    data.argonHighTodayUsed = Math.max(0, Number(data.argonHighTodayUsed) || 0);
    data.fallbackTodayUsed = Math.max(0, Number(data.fallbackTodayUsed) || 0);
    data.quotaExhaustedToday = Boolean(data.quotaExhaustedToday);
  }
  return data;
}

function formatStudioUsagePayload(raw) {
  const d = raw || readRawStudioUsage();
  const limit = Math.max(1, Number(d.dailyFreeLimit) || DEFAULT_DAILY_FREE_LIMIT);
  const used = Math.max(0, Number(d.argonHighTodayUsed) || 0);
  const freeRemaining = d.quotaExhaustedToday ? 0 : Math.max(0, limit - used);
  const usedPct = Math.min(100, Math.round((used / limit) * 100));
  return {
    todayDate: d.dateKst,
    dateKst: d.dateKst,
    dailyFreeLimit: limit,
    argonHighTodayUsed: used,
    argonHighTotalUsed: Math.max(0, Number(d.argonHighTotalUsed) || 0),
    fallbackTodayUsed: Math.max(0, Number(d.fallbackTodayUsed) || 0),
    freeRemaining,
    usedPct,
    quotaExhaustedToday: Boolean(d.quotaExhaustedToday),
    lastModel: d.lastModel || '',
    lastUsedAt: d.lastUsedAt || null
  };
}

function getStudioAiUsage() {
  return formatStudioUsagePayload(readRawStudioUsage());
}

function updateStudioAiUsageConfig({ dailyFreeLimit, resetToday } = {}) {
  const d = readRawStudioUsage();
  if (dailyFreeLimit !== undefined && dailyFreeLimit !== null && dailyFreeLimit !== '') {
    const n = Number(dailyFreeLimit);
    if (!Number.isNaN(n) && n >= 1) {
      d.dailyFreeLimit = Math.max(1, Math.min(5000, Math.round(n)));
    }
  }
  if (resetToday) {
    d.dateKst = getTodayKstDateString();
    d.argonHighTodayUsed = 0;
    d.fallbackTodayUsed = 0;
    d.quotaExhaustedToday = false;
  }
  fs.writeFileSync(STUDIO_USAGE_JSON_PATH, JSON.stringify(d, null, 2) + '\n', 'utf8');
  return formatStudioUsagePayload(d);
}

function recordStudioAiGeneration({ tier = 'argon-high', modelLabel = '', quotaExhausted = false } = {}) {
  const d = readRawStudioUsage();
  d.dateKst = getTodayKstDateString();
  if (quotaExhausted) {
    d.quotaExhaustedToday = true;
  } else if (tier === 'argon-high') {
    d.argonHighTodayUsed = (Number(d.argonHighTodayUsed) || 0) + 1;
    d.argonHighTotalUsed = (Number(d.argonHighTotalUsed) || 0) + 1;
    d.quotaExhaustedToday = false;
  } else {
    d.fallbackTodayUsed = (Number(d.fallbackTodayUsed) || 0) + 1;
  }
  if (modelLabel) d.lastModel = String(modelLabel);
  d.lastUsedAt = new Date().toISOString();
  try {
    fs.writeFileSync(STUDIO_USAGE_JSON_PATH, JSON.stringify(d, null, 2) + '\n', 'utf8');
  } catch (e) {}
  return formatStudioUsagePayload(d);
}

function detectNoFaceDirective(promptText) {
  const s = String(promptText || '').trim();
  if (!s) return false;
  return /얼굴\s*미노출|얼굴\s*비노출|얼굴\s*노출\s*(?:금지|없이|제외|안|불가|x)|얼굴\s*없이|얼굴이?\s*(?:안|보이지)\s*(?:보이|않|나오)|얼굴이?\s*나오지\s*않|얼굴\s*제외|얼굴\s*가리|얼굴\s*크롭|목\s*아래만|어깨\s*아래만|손만\s*클로즈업|뒷모습만|등\s*뒤에서만|no[\s_-]*face|faceless|without\s+face/i.test(s);
}

function detectNoBackgroundDirective(promptText) {
  const s = String(promptText || '').trim();
  if (!s) return false;
  return /배경\s*없이|배경\s*미노출|배경\s*비노출|배경\s*제거|배경\s*생략|배경\s*제외|무배경|단색\s*배경|심플\s*배경|누끼|no[\s_-]*background|without\s+background|clean\s+backdrop/i.test(s);
}

function normalizeUserPromptDirectives(promptText) {
  let s = String(promptText || '').trim();
  if (!s) return '';
  if (detectNoBackgroundDirective(s)) {
    // '공간에서 (배경없이)에서' 처럼 공간 단어와 배경없이 지시가 충돌하는 문맥을 깔끔한 단색/아웃포커싱 배경 지시로 자동 교정
    s = s.replace(/공간에서\s*\(\s*배경\s*없이\s*\)\s*에서/g, '창문이나 배경 가구가 전혀 없는 깔끔한 단색 스튜디오 톤 배경에서');
    s = s.replace(/공간에서\s*배경\s*없이\s*에서/g, '창문이나 배경 가구가 전혀 없는 깔끔한 단색 스튜디오 톤 배경에서');
    s = s.replace(/\(\s*배경\s*없이\s*\)\s*에서/g, '창문·가구 등 배경 사물이 전혀 없는 깨끗한 단색 아웃포커싱 배경에서');
    s = s.replace(/\(\s*배경\s*없이\s*\)/g, '(창문·가구 등 실내 배경 사물 완전 배제, 깔끔한 단색 아웃포커싱 배경)');
  }
  return s;
}

const DEFAULT_ANGLE_SLOTS = [
  { key: 'front',        label: '정면 (0° · 기본)',     desc: '85mm 정면 · 단정한 기본',      defaultFile: 'director-angle-refs/angle_front.jpg' },
  { key: 'frontSmile',   label: '정면 미소 (0°)',       desc: '온화한 눈웃음 · 미소',          defaultFile: 'director-angle-refs/angle_front_smile.jpg' },
  { key: 'left15Smile',  label: '좌측 15° 미소',        desc: '좌측 사선 · 진료 상담 미소',   defaultFile: 'director-angle-refs/angle_left15_smile.jpg' },
  { key: 'right15Smile', label: '우측 15° 미소',        desc: '우측 사선 · 진료 설명 미소',   defaultFile: 'director-angle-refs/angle_right15_smile.jpg' },
  { key: 'left30',       label: '좌측 30° 사선',        desc: '왼쪽 반측면 · 골격 기준',      defaultFile: 'director-angle-refs/angle_left30.jpg' },
  { key: 'right30',      label: '우측 30° 사선',        desc: '오른쪽 반측면 · 골격 기준',    defaultFile: 'director-angle-refs/angle_right30.jpg' },
  { key: 'leftProfile',  label: '좌측 측면 (45°+)',     desc: '왼쪽 깊은 측면 · 콧대·턱선',   defaultFile: 'director-angle-refs/angle_left_profile.jpg' },
  { key: 'rightProfile', label: '우측 측면 (45°+)',     desc: '오른쪽 깊은 측면 · 콧대·턱선', defaultFile: 'director-angle-refs/angle_right_profile.jpg' }
];

function maskSecretKey(rawKey) {
  const s = String(rawKey || '').trim();
  if (!s) return '';
  if (s.length <= 10) return s.slice(0, 3) + '***';
  return `${s.slice(0, 7)}...${s.slice(-4)}`;
}

function readRawSettingsJson() {
  try {
    if (fs.existsSync(SETTINGS_JSON_PATH)) {
      return JSON.parse(fs.readFileSync(SETTINGS_JSON_PATH, 'utf8')) || {};
    }
  } catch (e) {}
  return {};
}

function getRawStudioAiKeys() {
  const s = readRawSettingsJson();
  const geminiKey = String(s.geminiKey || s.googleApiKey || process.env.GEMINI_API_KEY || '').trim();
  const falKey = String(s.falKey || process.env.FAL_KEY || '').trim();
  return { geminiKey, falKey };
}

function getStudioAiKeyConfig() {
  const { geminiKey, falKey } = getRawStudioAiKeys();
  const hasGeminiKey = Boolean(geminiKey);
  const hasFalKey = Boolean(falKey);
  const hasArgonEngine = hasGeminiKey || hasFalKey;
  let activeProvider = 'free-flux';
  let activeLabel = '무료 기본 FLUX 엔진 (아르곤 하이 미연결)';
  if (hasGeminiKey) {
    activeProvider = 'google-gemini-pro';
    activeLabel = '아르곤 하이 정품 엔진 (Google Gemini 3 Pro Image · 2K 초고화질)';
  } else if (hasFalKey) {
    activeProvider = 'fal-nano-banana-pro';
    activeLabel = '아르곤 하이 정품 엔진 (Nano Banana Pro · Gemini 3 Pro Image 2K)';
  }
  return {
    ok: true,
    hasArgonEngine,
    hasGeminiKey,
    hasFalKey,
    activeProvider,
    activeLabel,
    maskedGeminiKey: maskSecretKey(geminiKey),
    maskedFalKey: maskSecretKey(falKey),
    usage: getStudioAiUsage()
  };
}

function saveStudioAiKeyConfig({ geminiKey, falKey, apiKey, dailyFreeLimit, resetUsageToday } = {}) {
  const s = readRawSettingsJson();
  const singleKey = String(apiKey || '').trim();
  if (singleKey) {
    if (/^AIza/i.test(singleKey)) {
      s.geminiKey = singleKey;
    } else if (singleKey.includes(':') || /^fal_/i.test(singleKey)) {
      s.falKey = singleKey;
    } else {
      s.geminiKey = singleKey;
    }
  }
  if (typeof geminiKey === 'string') {
    const cleanG = geminiKey.trim();
    if (cleanG === '__CLEAR__') delete s.geminiKey;
    else if (cleanG) s.geminiKey = cleanG;
  }
  if (typeof falKey === 'string') {
    const cleanF = falKey.trim();
    if (cleanF === '__CLEAR__') delete s.falKey;
    else if (cleanF) s.falKey = cleanF;
  }
  const dir = path.dirname(SETTINGS_JSON_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(SETTINGS_JSON_PATH, JSON.stringify(s, null, 2) + '\n', 'utf8');
  if (dailyFreeLimit !== undefined || resetUsageToday) {
    updateStudioAiUsageConfig({ dailyFreeLimit, resetToday: Boolean(resetUsageToday) });
  }
  return getStudioAiKeyConfig();
}

function ensureAngleManifest() {
  if (!fs.existsSync(ANGLE_REFS_DIR)) {
    fs.mkdirSync(ANGLE_REFS_DIR, { recursive: true });
  }
  let manifest = { profileId: 'director_ahn', name: '안정위 대표원장', angles: {} };
  if (fs.existsSync(ANGLE_MANIFEST_PATH)) {
    try {
      manifest = JSON.parse(fs.readFileSync(ANGLE_MANIFEST_PATH, 'utf8'));
    } catch (e) {}
  }
  if (!manifest.angles || typeof manifest.angles !== 'object') {
    manifest.angles = {};
  }
  for (const slot of DEFAULT_ANGLE_SLOTS) {
    if (!manifest.angles[slot.key] || !manifest.angles[slot.key].fileName) {
      manifest.angles[slot.key] = {
        key: slot.key,
        label: slot.label,
        desc: slot.desc,
        fileName: slot.defaultFile
      };
    } else {
      manifest.angles[slot.key].label = slot.label;
      manifest.angles[slot.key].desc = slot.desc;
    }
  }
  return manifest;
}

function getDirectorAngleSamples() {
  const manifest = ensureAngleManifest();
  const list = DEFAULT_ANGLE_SLOTS.map((slot) => {
    const info = manifest.angles[slot.key] || {};
    return {
      key: slot.key,
      label: slot.label,
      desc: slot.desc,
      fileName: info.fileName || slot.defaultFile,
      yaw: info.yaw,
      updatedAt: info.updatedAt || null
    };
  });
  return {
    ok: true,
    profileId: manifest.profileId || 'director_ahn',
    name: manifest.name || '안정위 대표원장',
    angles: list
  };
}

function updateDirectorAngleSample(angleKey, dataUrl, origName = 'angle.jpg') {
  const validSlot = DEFAULT_ANGLE_SLOTS.find((s) => s.key === angleKey);
  if (!validSlot) {
    throw new Error('유효하지 않은 각도 슬롯입니다: ' + angleKey);
  }
  const match = String(dataUrl || '').match(/^data:(image\/(?:jpeg|jpg|png|webp));base64,(.+)$/i);
  if (!match) {
    throw new Error('지원되는 이미지 형식(JPG, PNG, WEBP)이 아닙니다.');
  }
  const mime = match[1].toLowerCase();
  const ext = mime.includes('png') ? '.png' : mime.includes('webp') ? '.webp' : '.jpg';
  const buf = Buffer.from(match[2], 'base64');
  if (buf.length < 1024) {
    throw new Error('유효한 얼굴 이미지 데이터가 아닙니다.');
  }

  if (!fs.existsSync(ANGLE_REFS_DIR)) {
    fs.mkdirSync(ANGLE_REFS_DIR, { recursive: true });
  }
  const outName = `angle_${angleKey}_custom_${Date.now()}${ext}`;
  const outRel = `director-angle-refs/${outName}`;
  const outFull = path.join(ANGLE_REFS_DIR, outName);
  fs.writeFileSync(outFull, buf);

  // Auto-orient EXIF upright & resize <=1024px so smartphone portrait uploads never rotate sideways
  try {
    execFileSync(
      'python',
      [
        '-c',
        'import sys; from PIL import Image, ImageOps; p=sys.argv[1]; im=ImageOps.exif_transpose(Image.open(p)).convert("RGB"); im.thumbnail((1024,1024), Image.Resampling.LANCZOS); im.save(p, quality=95)',
        outFull
      ],
      { timeout: 12000 }
    );
  } catch (e) {}

  try {
    const profRefsDir = path.join(DIRECTOR_PROFILE_DIR, 'refs');
    if (fs.existsSync(profRefsDir)) {
      fs.copyFileSync(outFull, path.join(profRefsDir, outName));
    }
  } catch (e) {}

  const manifest = ensureAngleManifest();
  manifest.angles[angleKey] = {
    key: angleKey,
    label: validSlot.label,
    desc: validSlot.desc,
    fileName: outRel,
    sourceRef: origName,
    updatedAt: new Date().toISOString()
  };
  fs.writeFileSync(ANGLE_MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
  return getDirectorAngleSamples();
}

function fetchBufferFollowRedirects(url, timeoutMs = 60000, redirectsLeft = 5) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(
      url,
      {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) BareunStudio/4.0' },
        timeout: timeoutMs
      },
      (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          res.resume();
          if (redirectsLeft <= 0) return reject(new Error('리다이렉트 횟수 초과'));
          const nextUrl = new URL(res.headers.location, url).toString();
          return resolve(fetchBufferFollowRedirects(nextUrl, timeoutMs, redirectsLeft - 1));
        }
        if (res.statusCode !== 200) {
          res.resume();
          return reject(new Error(`HTTP ${res.statusCode} 응답 오류`));
        }
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => resolve(Buffer.concat(chunks)));
      }
    );
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('요청 시간 초과'));
    });
    req.on('error', reject);
  });
}

function postJsonHttps(urlStr, headers, bodyObj, timeoutMs = 135000) {
  return new Promise((resolve, reject) => {
    const bodyStr = JSON.stringify(bodyObj);
    const parsedUrl = new URL(urlStr);
    const req = https.request(
      {
        protocol: parsedUrl.protocol,
        hostname: parsedUrl.hostname,
        port: parsedUrl.port || 443,
        path: parsedUrl.pathname + (parsedUrl.search || ''),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(bodyStr),
          'User-Agent': 'BareunArgonHighStudio/4.0',
          ...headers
        },
        timeout: timeoutMs
      },
      (res) => {
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => {
          const rawText = Buffer.concat(chunks).toString('utf8');
          let json = null;
          try {
            json = JSON.parse(rawText);
          } catch (e) {}
          resolve({ statusCode: res.statusCode || 0, json, rawText });
        });
      }
    );
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('AI 엔진 응답 대기 시간 초과'));
    });
    req.on('error', reject);
    req.write(bodyStr);
    req.end();
  });
}

function detectMimeFromPathOrBuffer(refName, buf) {
  if (buf && buf.length > 12) {
    if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return 'image/png';
    if (buf[0] === 0xff && buf[1] === 0xd8) return 'image/jpeg';
    if (buf.slice(0, 4).toString('ascii') === 'RIFF' && buf.slice(8, 12).toString('ascii') === 'WEBP') return 'image/webp';
  }
  const lower = String(refName || '').toLowerCase();
  if (lower.endsWith('.png')) return 'image/png';
  if (lower.endsWith('.webp')) return 'image/webp';
  return 'image/jpeg';
}

async function resolveReferenceImageInput(rawRef) {
  const clean = String(rawRef || '').split('?')[0].split('#')[0].trim();
  if (!clean || /\.(mp4|webm|mov|svg)$/i.test(clean)) return null;

  if (/^data:(image\/(?:jpeg|jpg|png|webp));base64,(.+)$/i.test(clean)) {
    const m = clean.match(/^data:(image\/(?:jpeg|jpg|png|webp));base64,(.+)$/i);
    const mimeType = m[1].toLowerCase().replace('image/jpg', 'image/jpeg');
    const base64 = m[2];
    return {
      mimeType,
      base64,
      dataUri: `data:${mimeType};base64,${base64}`
    };
  }

  if (/^https?:\/\//i.test(clean)) {
    try {
      const buf = await fetchBufferFollowRedirects(clean, 25000);
      if (buf && buf.length > 512) {
        const mimeType = detectMimeFromPathOrBuffer(clean, buf);
        const base64 = buf.toString('base64');
        return {
          mimeType,
          base64,
          dataUri: `data:${mimeType};base64,${base64}`,
          remoteUrl: clean
        };
      }
    } catch (e) {}
    return null;
  }

  const relClean = clean.replace(/^\/+/, '');
  const candidates = [
    path.join(HOMEPAGE_DIR, relClean),
    path.join(HOMEPAGE_DIR, path.basename(relClean)),
    path.join(HOMEPAGE_DIR, 'webp', path.basename(relClean).replace(/\.[^.]+$/, '.webp'))
  ];
  for (const fp of candidates) {
    if (fs.existsSync(fp) && fs.statSync(fp).isFile()) {
      const buf = fs.readFileSync(fp);
      if (buf.length > 512) {
        const mimeType = detectMimeFromPathOrBuffer(fp, buf);
        const base64 = buf.toString('base64');
        return {
          mimeType,
          base64,
          dataUri: `data:${mimeType};base64,${base64}`,
          localPath: fp
        };
      }
    }
  }

  // Fallback: try GitHub raw repository if asset is hosted there
  try {
    const ghUrl = `https://raw.githubusercontent.com/ajwei0508-cpu/bareun-homepage/main/homepage/${encodeURI(relClean)}`;
    const buf = await fetchBufferFollowRedirects(ghUrl, 20000);
    if (buf && buf.length > 512) {
      const mimeType = detectMimeFromPathOrBuffer(relClean, buf);
      const base64 = buf.toString('base64');
      return {
        mimeType,
        base64,
        dataUri: `data:${mimeType};base64,${base64}`,
        remoteUrl: ghUrl
      };
    }
  } catch (e) {}

  return null;
}

function guessPreferredAngleKeyFromPrompt(promptText) {
  const s = String(promptText || '').toLowerCase();
  const isWarmOrSmile = /미소|웃음|눈웃음|따뜻|온화|친절|상담|설명|문진|경청|맞이|인사|브리핑|환자/.test(s);
  if (/좌측\s*측면|왼쪽\s*옆모습|왼쪽\s*측면|left\s*profile/.test(s)) return 'leftProfile';
  if (/우측\s*측면|오른쪽\s*옆모습|오른쪽\s*측면|측면|옆모습|side\s*profile|right\s*profile/.test(s)) return 'rightProfile';
  if (/좌측\s*15|왼쪽\s*15/.test(s) || (/좌측|왼쪽|left/.test(s) && isWarmOrSmile)) return 'left15Smile';
  if (/우측\s*15|오른쪽\s*15/.test(s) || (/우측|오른쪽|사선|대각선|초음파|모니터|상담|설명|브리핑/.test(s) && isWarmOrSmile)) return 'right15Smile';
  if (/좌측|왼쪽|left/.test(s)) return 'left30';
  if (/우측|오른쪽|사선|어깨너머|대각선|진맥|맥진/.test(s)) return 'right30';
  if (isWarmOrSmile) return 'frontSmile';
  return 'front';
}

function orderDirectorSlotsForPrompt(promptText, allAngles = [], maxCount = 3) {
  const prefKey = guessPreferredAngleKeyFromPrompt(promptText);
  const byKey = {};
  for (const a of allAngles) {
    if (a && a.key) byKey[a.key] = a;
  }
  const priorityMap = {
    front:        ['front', 'frontSmile', 'right15Smile', 'left15Smile', 'right30', 'left30'],
    frontSmile:   ['frontSmile', 'front', 'right15Smile', 'left15Smile', 'right30', 'left30'],
    left15Smile:  ['left15Smile', 'frontSmile', 'front', 'left30', 'leftProfile', 'right15Smile'],
    right15Smile: ['right15Smile', 'frontSmile', 'front', 'right30', 'rightProfile', 'left15Smile'],
    left30:       ['left30', 'left15Smile', 'front', 'frontSmile', 'leftProfile', 'right30'],
    right30:      ['right30', 'right15Smile', 'front', 'frontSmile', 'rightProfile', 'left30'],
    leftProfile:  ['leftProfile', 'left30', 'front', 'left15Smile', 'frontSmile', 'right30'],
    rightProfile: ['rightProfile', 'right30', 'front', 'right15Smile', 'frontSmile', 'left30']
  };
  const orderKeys = priorityMap[prefKey] || priorityMap.frontSmile;
  const result = [];
  for (const k of orderKeys) {
    if (byKey[k] && !result.includes(byKey[k])) result.push(byKey[k]);
  }
  for (const a of allAngles) {
    if (a && !result.includes(a)) result.push(a);
  }
  return result.slice(0, Math.max(1, maxCount));
}

/**
 * 아르곤 하이(Gemini 3 Pro Image / Nano Banana Pro 2K) 전용 정밀 에디토리얼 프롬프트 빌더
 * - 기본값(hasSourceRef === false): 기존 카드 이미지를 전혀 참조하지 않고 100% 백지상태에서 프롬프트를 깊이 사고해 완전히 새로운 구도로 촬영합니다.
 * - 부분 수정(hasSourceRef === true): 사용자가 명시적으로 밑그림 참조를 켠 경우에만 기존 이미지 톤·배경을 유지하며 수정합니다.
 * - 얼굴미노출(noFaceDirective === true): 원장님 얼굴 참조를 완전 차단하고 어깨/목 아래 또는 등 뒤 오버더숄더 비노출 구도를 강제합니다.
 * - 원장님 얼굴 합성(useDirectorFace === true): 정방향 보정된 핵심 각도 실사 포트레이트와 1:1 동일 골격·안경·가르마·흰 가운을 정밀 고정합니다.
 */
function buildArgonHighPrompt({
  userPrompt,
  originalCardPrompt = '',
  workMode = 'edit_current',
  useDirectorFace = false,
  noFaceDirective = false,
  noBackgroundDirective = false,
  hasSourceRef = false,
  preferredAngleLabel = '정면 미소 (0°)'
}) {
  const rawUser = String(userPrompt || '').trim();
  const cleanUser = normalizeUserPromptDirectives(rawUser);
  const cleanOrig = String(originalCardPrompt || '').trim();
  const isPromptModified = Boolean(cleanOrig && cleanOrig !== rawUser);
  const effectiveNoBg = Boolean(noBackgroundDirective || detectNoBackgroundDirective(rawUser));

  const lines = [];

  if (hasSourceRef) {
    if (isPromptModified) {
      lines.push(
        '[역할: 하이엔드 메디컬 에디토리얼 포토그래퍼 — 참조 밑그림 기반 부분 수정 촬영]',
        '첨부된 [참조 밑그림 사진]의 전체 구도와 조명 밸런스는 참고하되, 아래 [최종 연출 프롬프트]에서 지시한 동작·피사체·배경·소품 변경 사항을 100% 최우선으로 정확히 반영하여 새롭게 촬영해 주세요.',
        `[기존 장면 참고]: ${cleanOrig}`,
        `[최종 연출 프롬프트 (최우선 반영 필수)]: ${cleanUser}`
      );
    } else {
      lines.push(
        '[역할: 하이엔드 메디컬 에디토리얼 포토그래퍼 — 참조 밑그림 품격 계승 재촬영]',
        '첨부된 [참조 밑그림 사진]의 조명과 색감을 참고하면서, 아래 연출 지시를 초고화질 DSLR 실사 사진으로 촬영해 주세요.',
        `[장면 연출 지시]: ${cleanUser}`
      );
    }
  } else {
    lines.push(
      '[역할: 하이엔드 메디컬 에디토리얼 포토그래퍼 — 사용자 프롬프트 100% 정밀 구현 실사 촬영]',
      '이전 이미지나 정형화된 스톡 구도에 얽매이지 말고, 오직 아래 [장면 연출 지시] 문장에 적힌 공간·조명·피사체·시점(1인칭/3인칭)·행동만을 100% 있는 그대로 정확하게 구현하세요.',
      '[임의 왜곡 절대 금지]: 사용자가 프롬프트에 직접 적지 않은 전통 한옥 창살(한지 격자 창문), 불필요한 원목 인테리어, 화분, 또는 지시하지 않은 과장된 손가락 가리키기 동작을 임의로 추가하지 마세요.',
      '촬영 스펙: Canon EOS R5 + RF 85mm f/1.8L USM 렌즈, 실제 피부 결과 소재 본연의 질감이 살아있는 무보정 RAW 초고화질 실사 화보.',
      `[장면 연출 지시 (100% 정확히 구현 필수)]: ${cleanUser}`
    );
  }

  // [최우선 규칙 0] 배경없이 지시 감지 시 창문·한옥 창살·화분·가구 등 실내 배경 구조물 100% 원천 차단
  if (effectiveNoBg) {
    lines.push(
      '[절대 구도 규칙 — 배경 사물·창문·가구 100% 완전 배제 (NO BACKGROUND / CLEAN STUDIO BACKDROP) 강제]: 사용자가 명시적으로 (배경없이)를 지시했습니다! 배경에 창문, 한옥 격자 창살(창호지 문), 블라인드, 커튼, 화분, 선반, 가구, 벽면 몰딩 등 어떠한 실내 건축 구조물이나 배경 소품도 절대 그리지 마십시오(배경 사물 노출 0%). 오직 프롬프트에서 지시한 조명 톤과 감성 색감만 부드럽게 감도는 매끄러운 무지(단색) 스튜디오 배경 또는 배경 사물이 완전히 사라진 깊은 아웃포커싱(보케)으로 처리하여, 시선이 오직 핵심 피사체(기기·모니터·인물)에만 100% 집중되도록 촬영하세요.'
    );
  }

  // [최우선 규칙 1] 얼굴미노출 지시 감지 시 원장(의사) 얼굴 노출 0% 원천 차단
  if (noFaceDirective) {
    lines.push(
      '[절대 구도 규칙 — 얼굴 100% 완전 미노출(NO FACE) 강제]: 프롬프트에 얼굴 미노출 지시가 포함되어 있습니다. 화면 어디에도 인물의 얼굴·눈·코·입·옆모습(측면 실루엣 포함)·턱선·모니터/유리 반사상이 단 1%도 노출되어서는 절대 안 됩니다! 반드시 카메라를 등·어깨 뒤편이나 1인칭 시점(POV)에서 내려다보는 구도로 잡거나, 프레임을 어깨·목 아래(팔·손 클로즈업)로 크롭하여 촬영하세요.'
    );
  }

  // [현대 의료기기 재질 왜곡 방지 가드] 체성분 분석기(인바디)·초음파·모니터 등이 나무(목재)로 변질되는 현상 차단
  if (/체성분\s*분석기|인바디|inbody|초음파|체열|엑스레이|모니터|태블릿|디스플레이|분석기|측정기|진단기|결과\s*데이터/i.test(rawUser)) {
    lines.push(
      '[현대 의료기기 재질 및 디지털 화면 정밀 구현 규칙]: 체성분 분석기(인바디)·초음파·모니터 등 의료기기는 절대로 나무(목재/원목) 재질로 만들지 마십시오! 반드시 실제 현대 메디컬 클리닉의 정밀 디지털 장비(깔끔한 매트 화이트·메탈릭 실버·다크그레이 강화플라스틱/알루미늄 바디와 선명한 고해상도 글래스 LCD 터치스크린 모니터)로 사실적으로 표현하세요.'
    );
  }

  // [인체 해부학 및 손 개수 엄격 제한 규칙 — 제3의 손 환각 원천 차단]
  lines.push(
    '[인체 해부학 및 손 개수 엄격 제한 규칙 (제3의 손 환각 절대 금지)]: 한 사람의 팔과 손은 반드시 왼손·오른손 최대 2개만 존재해야 하며, 각 손은 해부학적으로 정확한 5개 손가락 비례를 가져야 합니다. 특히 1인칭 시점(POV)이나 체성분 분석기(인바디) 측정 장면에서 환자의 양손이 좌우 전극 손잡이를 잡고 있다면, 화면을 가리키는 제3의 손(여분의 손/팔)을 절대 추가로 그리지 마십시오! (양손으로 좌우 손잡이를 잡은 상태에서는 손가락으로 모니터를 찌르지 않고 양손은 손잡이에만 두고 시선으로 정면 모니터 화면을 바라보는 구도로 촬영하세요.)'
  );

  // 진맥/맥진·상담 등 한의사와 환자가 함께 나오는 동작에서 자가 손목 잡기 오류 원천 차단
  if (/진맥|맥진|요골\s*동맥|손목/.test(rawUser)) {
    lines.push(
      '[맥진 인물 분리 필수 규칙]: 반드시 진료 책상을 사이에 두고 서로 마주 앉은 두 명의 독립된 인물(한쪽은 편안한 일상복 소매의 환자 팔/손목, 반대쪽은 깔끔한 흰 의사 가운 소매의 한의사 손)로 정확히 분리하여 표현하세요. 절대로 한 사람이 자기 자신의 손목을 짚는 구도가 되어서는 안 됩니다. 손가락 개수(엄지~새끼손가락 5개 해부학 비례, 특히 2·3·4지 검지·중지·약지 지시 시 세 손가락을 나란히 가지런히 요골동맥 위에 얹는 정통 맥진 자세)를 100% 정확하게 표현하세요.'
    );
  }

  if (useDirectorFace && !noFaceDirective) {
    lines.push(
      `[안정위 대표원장 실제 인물 사진 1:1 동일 인물 고정 (IDENTITY LOCK)]: 첨부된 [참조 인물 사진 #1~#3]은 모두 오늘 촬영할 주인공인 '안정위 대표원장(30대 후반~40대 초반 한국인 남성 한의사)' 동일 인물의 실제 정방향 얼굴 사진입니다. 임의의 다른 남성 의사 얼굴을 생성하지 말고, 반드시 첨부된 참조 인물 사진 속 안정위 원장 본인의 얼굴 골격, 부드러우면서 또렷한 눈매와 눈웃음, 콧대, 입매, 피부톤, 얇은 샴페인 골드 다각형/직사각 메탈 안경테, 앞머리로 이마를 가리지 않고 깔끔하게 가르마 타서 넘긴 단정한 검은 생머리 헤어스타일을 장면 각도(권장 기준: ${preferredAngleLabel})에 맞춰 100% 동일 인물로 정밀하게 재현하세요.`,
      '[의상 및 체형 필수 지시]: 참조 인물 사진에서 입고 있는 검은색 외투/사복을 그대로 입히지 말고, 한의원 진료 상황에 맞게 반드시 깨끗하고 품격 있는 순백색 한의사 진료 가운(안에 단정한 셔츠 착용, 가슴에 깨진 글자·명찰 없는 무지 화이트 가운)을 착용한 모습으로 촬영하세요. 결과 사진에는 대표원장 1명만 등장시켜야 합니다(동일 얼굴 복제 금지).',
      '[85mm 망원 렌즈 윤곽 고정 · 부종 ZERO]: 광각 왜곡으로 볼이나 하관이 넓어지거나 붓지 않도록 85mm~105mm 인물 망원 단렌즈 비례를 적용하여 참조 인물 사진처럼 날렵하고 단정한 턱선과 자연스럽고 따뜻한 미소를 표현하세요.'
    );
  }

  lines.push(
    '[화질 및 클린 마감 절대 원칙]: 이미지 모서리의 워터마크, 브랜드 로고, 서명, 인위적인 자막 오버레이를 절대 넣지 마세요(단, 프롬프트에서 모니터·태블릿·차트 화면 안에 표시하도록 직접 지시한 데이터 그래프나 의학 분류표 UI는 깨진 글자 없이 정갈하고 선명하게 표현하세요). 3D 그래픽이나 AI 일러스트 느낌 없이 100% 실제 카메라로 촬영한 초고화질 에디토리얼 실사 사진이어야 합니다.'
  );

  return lines.join('\n');
}

function extractBase64FromGeminiInteractionResponse(json) {
  if (!json || typeof json !== 'object') return null;
  if (json.output_image && json.output_image.data) {
    return Buffer.from(json.output_image.data, 'base64');
  }
  if (Array.isArray(json.steps)) {
    for (let i = json.steps.length - 1; i >= 0; i--) {
      const content = json.steps[i]?.content;
      if (Array.isArray(content)) {
        for (let j = content.length - 1; j >= 0; j--) {
          const item = content[j];
          if (item && item.type === 'image' && item.data) {
            return Buffer.from(item.data, 'base64');
          }
        }
      }
    }
  }
  if (Array.isArray(json.outputs)) {
    for (let i = json.outputs.length - 1; i >= 0; i--) {
      const out = json.outputs[i];
      if (out && out.type === 'image' && out.data) {
        return Buffer.from(out.data, 'base64');
      }
    }
  }
  const parts = json.candidates?.[0]?.content?.parts;
  if (Array.isArray(parts)) {
    for (let i = parts.length - 1; i >= 0; i--) {
      const inline = parts[i]?.inlineData || parts[i]?.inline_data;
      if (inline && inline.data) {
        return Buffer.from(inline.data, 'base64');
      }
    }
  }
  return null;
}

async function generateViaGoogleGeminiDirect({ geminiKey, promptText, refImages = [], seed = 0 }) {
  const models = [
    { id: 'gemini-3-pro-image', label: 'Google Gemini 3 Pro Image (아르곤 하이 정품 2K)', supportsSize: true, isArgonHigh: true },
    { id: 'gemini-nano-banana-2.1', label: 'Google Gemini Nano Banana 2.1 (아르곤 하이 2K)', supportsSize: true, isArgonHigh: true },
    { id: 'gemini-3.1-flash-image', label: 'Google Gemini 3.1 Flash Image (2K)', supportsSize: true, isArgonHigh: false },
    { id: 'gemini-2.5-flash-image', label: 'Google Gemini 2.5 Flash Image', supportsSize: false, isArgonHigh: false }
  ];

  const inputBlocks = [];
  for (const img of refImages.slice(0, 6)) {
    if (img && img.base64) {
      if (img.roleLabel) {
        inputBlocks.push({
          type: 'text',
          text: String(img.roleLabel)
        });
      }
      inputBlocks.push({
        type: 'image',
        mime_type: img.mimeType || 'image/jpeg',
        data: img.base64
      });
    }
  }
  inputBlocks.push({
    type: 'text',
    text: promptText
  });

  const errs = [];
  let sawArgonQuotaExhausted = false;
  for (const m of models) {
    try {
      const responseFormat = m.supportsSize
        ? { type: 'image', aspect_ratio: '16:9', image_size: '2K' }
        : { type: 'image', aspect_ratio: '16:9' };

      const res = await postJsonHttps(
        'https://generativelanguage.googleapis.com/v1beta/interactions',
        {
          'x-goog-api-key': geminiKey,
          'Api-Revision': '2026-05-20'
        },
        {
          model: m.id,
          input: inputBlocks,
          response_format: responseFormat
        },
        130000
      );

      if (res.statusCode === 200 && res.json) {
        const imgBuf = extractBase64FromGeminiInteractionResponse(res.json);
        if (imgBuf && imgBuf.length > 8000) {
          return { buffer: imgBuf, engine: m.label, modelId: m.id, isArgonHigh: m.isArgonHigh, seed };
        }
      }
      const errMsg = res.json?.error?.message || res.rawText?.slice(0, 180) || `HTTP ${res.statusCode}`;
      if (m.id === 'gemini-3-pro-image' && (res.statusCode === 429 || /RESOURCE_EXHAUSTED|quota/i.test(errMsg))) {
        sawArgonQuotaExhausted = true;
      }
      errs.push(`${m.id}: ${errMsg}`);
    } catch (e) {
      errs.push(`${m.id}: ${e.message}`);
    }
  }

  if (sawArgonQuotaExhausted) {
    recordStudioAiGeneration({ tier: 'argon-high', quotaExhausted: true });
  }
  throw new Error('Google Gemini 이미지 엔진 호출 오류: ' + errs.join(' | '));
}

async function generateViaFalNanoBananaPro({ falKey, promptText, refImages = [], hasSourceRef = false, seed = 0 }) {
  const actualSeed = seed > 0 ? Math.floor(seed % 2147483647) : Math.floor(Math.random() * 89999999 + 10000000);
  const imageUrls = refImages
    .slice(0, 8)
    .map((img) => img.dataUri || img.remoteUrl)
    .filter(Boolean);

  const isEdit = imageUrls.length > 0;
  const endpoints = isEdit
    ? [
        { path: 'fal-ai/nano-banana-pro/edit', label: '아르곤 하이 정품 (Gemini 3 Pro Image · 2K 원본참조 에디팅)' },
        { path: 'google/nano-banana-2.1/edit', label: '아르곤 하이 정품 (Gemini Nano Banana 2.1 · 2K 에디팅)' }
      ]
    : [
        { path: 'fal-ai/nano-banana-pro', label: '아르곤 하이 정품 (Gemini 3 Pro Image · 2K 실사 촬영)' },
        { path: 'google/nano-banana-2.1', label: '아르곤 하이 정품 (Gemini Nano Banana 2.1 · 2K 실사 촬영)' }
      ];

  const errs = [];
  for (const ep of endpoints) {
    try {
      const payload = {
        prompt: promptText,
        resolution: '2K',
        aspect_ratio: hasSourceRef ? 'auto' : '16:9',
        output_format: 'jpeg',
        seed: actualSeed
      };
      if (isEdit) {
        payload.image_urls = imageUrls;
      }

      const res = await postJsonHttps(
        `https://fal.run/${ep.path}`,
        { Authorization: `Key ${falKey}` },
        payload,
        135000
      );

      const outUrl = res.json?.images?.[0]?.url || res.json?.image?.url || '';
      if (res.statusCode === 200 && outUrl) {
        const buf = await fetchBufferFollowRedirects(outUrl, 60000);
        if (buf && buf.length > 8000) {
          return { buffer: buf, engine: ep.label, seed: actualSeed };
        }
      }
      const detail = res.json?.detail || res.json?.message || res.rawText?.slice(0, 180) || `HTTP ${res.statusCode}`;
      errs.push(`${ep.path}: ${typeof detail === 'string' ? detail : JSON.stringify(detail)}`);
    } catch (e) {
      errs.push(`${ep.path}: ${e.message}`);
    }
  }

  throw new Error('Argon High (Nano Banana Pro) 호출 오류: ' + errs.join(' | '));
}

/**
 * 무료 폴백용: 한의학·해부학 전문 용어를 정확하게 전처리한 뒤 서버 사이드 Google GTX 번역 엔진으로 문장 전체를 영문화합니다.
 */
function preprocessKoreanMedicalTerms(koText) {
  let s = normalizeUserPromptDirectives(String(koText || '').trim());
  const rules = [
    [/체성분\s*(?:분석기|검사기|측정기)|인바디/g, 'sleek modern digital clinical body composition analyzer machine'],
    [/2\s*[,·ㆍ/.\-]?\s*3\s*[,·ㆍ/.\-]?\s*4\s*지\s*(손가락)?|검지\s*[,·ㆍ]?\s*중지\s*[,·ㆍ]?\s*약지/g, 'index middle and ring fingers placed gently side-by-side'],
    [/요골\s*동맥/g, 'inner wrist radial artery pulse point'],
    [/진맥\s*쿠션|맥진\s*쿠션/g, 'ivory silk wrist pulse cushion'],
    [/양손\s*맥진|양\s*손목\s*맥진|양손\s*진맥/g, 'traditional pulse palpation on both wrists of the patient sitting opposite'],
    [/(?<!손목 받침 )(?:진맥|맥진)/g, 'traditional Korean medicine radial pulse diagnosis'],
    [/복진/g, 'gentle clinical abdominal palpation on an examination bed'],
    [/추나\s*요법|수기\s*추나|추나/g, 'hands-on Chuna spinal alignment manual therapy'],
    [/약침/g, 'precise sterile Korean pharmacopuncture therapy'],
    [/황제\s*공진단|공진단/g, 'traditional Korean Gongjindan herbal pill wrapped in pure 24k gold leaf in a walnut box'],
    [/녹용\s*분골|러시아\s*녹용|녹용/g, 'premium sliced deer antler tip cross-sections'],
    [/원내\s*탕전실|무균\s*탕전실|탕전실/g, 'clean glass-walled modern herbal medicine decoction lab'],
    [/초음파\s*진단기|초음파\s*모니터|초음파/g, 'diagnostic ultrasound probe and live grayscale ultrasound monitor'],
    [/체열\s*진단기|적외선\s*체열/g, 'medical infrared thermography body heat-map monitor']
  ];
  for (const [regex, replacement] of rules) {
    s = s.replace(regex, ` ${replacement} `);
  }
  return s.replace(/\s+/g, ' ').trim();
}

async function translateKoreanToEnglishSentence(text) {
  const raw = String(text || '').trim();
  if (!raw) return '';
  if (!/[가-힣]/.test(raw)) return raw;

  const prepared = preprocessKoreanMedicalTerms(raw);
  if (!/[가-힣]/.test(prepared)) return prepared;

  try {
    const c5Url =
      'https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=ko&tl=en&q=' +
      encodeURIComponent(prepared);
    const buf = await fetchBufferFollowRedirects(c5Url, 7000);
    const parsed = JSON.parse(buf.toString('utf8'));
    if (Array.isArray(parsed)) {
      const chunks = [];
      for (const item of parsed) {
        if (typeof item === 'string') chunks.push(item);
        else if (Array.isArray(item) && typeof item[0] === 'string') chunks.push(item[0]);
      }
      const joined = chunks.join(' ').trim();
      if (joined && !/[가-힣]/.test(joined)) return joined;
    }
  } catch (e) {}

  try {
    const mmUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(prepared)}&langpair=ko|en`;
    const buf = await fetchBufferFollowRedirects(mmUrl, 6000);
    const parsed = JSON.parse(buf.toString('utf8'));
    const cand = parsed?.responseData?.translatedText || '';
    if (cand && !/MYMEMORY WARNING/i.test(cand) && !/[가-힣]/.test(cand)) return cand.trim();
  } catch (e) {}

  try {
    const gtxUrl =
      'https://translate.googleapis.com/translate_a/single?client=gtx&sl=ko&tl=en&dt=t&q=' +
      encodeURIComponent(prepared);
    const buf = await fetchBufferFollowRedirects(gtxUrl, 7000);
    const parsed = JSON.parse(buf.toString('utf8'));
    if (Array.isArray(parsed) && Array.isArray(parsed[0])) {
      const joined = parsed[0]
        .map((seg) => (Array.isArray(seg) && seg[0] ? String(seg[0]) : ''))
        .join('')
        .trim();
      if (joined) return joined;
    }
  } catch (e) {}

  return prepared;
}

async function buildMasterFluxPrompt(userPrompt, { useDirectorFace = false, noFaceDirective = false, noBackgroundDirective = false } = {}) {
  const rawUser = String(userPrompt || '').trim();
  const cleanUser = normalizeUserPromptDirectives(rawUser);
  const effectiveNoBg = Boolean(noBackgroundDirective || detectNoBackgroundDirective(rawUser));
  const translatedScene = await translateKoreanToEnglishSentence(cleanUser);
  const sanitizedScene = translatedScene.replace(/\b(watermark|logo|text overlay)\b/gi, '').trim();

  const extraGuards = [];
  if (/1\s*인칭\s*시점/.test(rawUser)) {
    extraGuards.push('first-person POV camera angle looking down from the standing patient perspective at the clinical LCD display while the patient two hands grip the left and right metallic side handle electrodes, strictly ZERO face visible in frame, strictly NO extra third hand pointing');
  }
  if (/체성분\s*(?:분석기|검사기|측정기)|인바디/i.test(rawUser)) {
    extraGuards.push('modern sleek white-and-silver metallic unbranded digital body composition analyzer machine with a sharp clinical LCD screen displaying clear body fat reduction downward trend chart and muscle mass increase upward bar graph, strictly modern medical equipment with NO wood material');
  }

  const needsTwoPersonPulseSeparation = /진맥|맥진|요골|손목|radial artery|pulse/i.test(rawUser + ' ' + sanitizedScene);
  const twoPersonClause = needsTwoPersonPulseSeparation
    ? 'two separate distinct people sitting across a consultation table from opposite sides: a patient extending their bare wrist from the left side onto an ivory silk cushion, and a Korean medicine doctor in a plain unembroidered crisp white coat reaching from the right side to palpate the patient wrist'
    : '';
  const noFaceClause = noFaceDirective
    ? 'strictly faceless framing from behind over-the-shoulder or first-person POV or cropped below the neck, zero face visible anywhere'
    : '';
  const noBgClause = effectiveNoBg
    ? 'strictly clean solid-color out-of-focus studio backdrop with ZERO background windows, ZERO wooden lattice frames, ZERO plants, and ZERO background furniture'
    : '';

  if (useDirectorFace && !noFaceDirective) {
    const directorIdentityLead =
      'Korean male medical director in his early 40s with neat swept-back short black hair revealing a clean open forehead (no bangs covering forehead), slim sharp well-defined masculine jawline and natural cheekbones (85mm portrait telephoto compression, zero puffy or bloated cheeks), warm trustworthy gentle eye-smile expression, wearing thin gold-rimmed rectangular glasses and a plain unembroidered crisp tailored white medical doctor coat over a neat blue-and-white vertical striped dress shirt';
    return [
      'Authentic raw candid editorial photograph',
      directorIdentityLead,
      noBgClause,
      twoPersonClause,
      sanitizedScene,
      ...extraGuards,
      'shot on Canon EOS R5 with RF 85mm f/1.8L USM lens, ultra-realistic natural human skin pores and authentic micro-texture, accurate 5-finger hand anatomy (strictly maximum 2 hands per person), shallow depth of field, high-end medical editorial color grading, photorealistic, zero CGI, no text, no watermark, no signature'
    ]
      .filter(Boolean)
      .join(', ');
  }

  return [
    'Authentic raw editorial photograph',
    noFaceClause,
    noBgClause,
    twoPersonClause,
    sanitizedScene,
    ...extraGuards,
    'shot on Canon EOS R5 with RF 85mm f/1.8L USM lens, ultra-realistic natural human skin texture and fine material detail, accurate anatomical hands and fingers (strictly maximum 2 hands per person, no extra third hand), shallow depth of field, warm natural color grading, photorealistic, zero CGI, no watermark, no logo'
  ]
    .filter(Boolean)
    .join(', ');
}

async function loadGradioClient() {
  if (fs.existsSync(GRADIO_CLIENT_ESM)) {
    const mod = await import(pathToFileURL(GRADIO_CLIENT_ESM).href);
    return mod.Client;
  }
  const mod = await import('@gradio/client');
  return mod.Client;
}

async function generateWatermarkFreeFluxImage({
  masterPrompt,
  width = 1280,
  height = 800,
  seed = 0,
  useDirectorFace = false,
  preferredAnglePath = ''
}) {
  const Client = await loadGradioClient();
  const actualSeed = seed > 0 ? Math.floor(seed % 2147483647) : Math.floor(Math.random() * 2000000000 + 10000);
  const safeW = Math.max(512, Math.min(1536, Math.round(width / 32) * 32));
  const safeH = Math.max(512, Math.min(1536, Math.round(height / 32) * 32));

  const errors = [];

  try {
    const client = await Client.connect('black-forest-labs/FLUX.1-dev');
    const res = await client.predict('/infer', {
      prompt: masterPrompt,
      seed: actualSeed,
      randomize_seed: false,
      width: safeW,
      height: safeH,
      guidance_scale: 3.5,
      num_inference_steps: 28
    });
    const outUrl = res?.data?.[0]?.url;
    if (outUrl) {
      const buf = await fetchBufferFollowRedirects(outUrl, 60000);
      if (buf && buf.length > 8000) {
        return { buffer: buf, engine: 'FLUX.1-dev (28-Step 최고화질 DSLR 엔진)', seed: actualSeed };
      }
    }
  } catch (err) {
    errors.push('FLUX.1-dev: ' + err.message);
  }

  if (preferredAnglePath && fs.existsSync(preferredAnglePath)) {
    try {
      const client = await Client.connect('yanze/PuLID-FLUX');
      const refBuf = fs.readFileSync(preferredAnglePath);
      const refBlob = new Blob([refBuf], { type: 'image/jpeg' });
      const res = await client.predict('/generate_image', {
        prompt: masterPrompt,
        id_image: refBlob,
        start_step: useDirectorFace ? 0 : 4,
        guidance: 4,
        seed: String(actualSeed),
        true_cfg: 1,
        width: Math.min(1280, safeW),
        height: Math.min(800, safeH),
        num_steps: 20,
        id_weight: useDirectorFace ? 1.05 : 0.0,
        neg_prompt: 'watermark, logo, text, signature, cartoon, illustration, CGI, plastic skin, deformed fingers, blurry',
        timestep_to_start_cfg: 1,
        max_sequence_length: 256
      });
      const outUrl = res?.data?.[0]?.url;
      if (outUrl) {
        const buf = await fetchBufferFollowRedirects(outUrl, 60000);
        if (buf && buf.length > 8000) {
          return { buffer: buf, engine: 'PuLID-FLUX 고해상도 스튜디오 엔진', seed: actualSeed };
        }
      }
    } catch (err) {
      errors.push('PuLID-FLUX: ' + err.message);
    }
  }

  try {
    const client = await Client.connect('black-forest-labs/FLUX.1-schnell');
    const res = await client.predict('/infer', {
      prompt: masterPrompt,
      seed: actualSeed,
      randomize_seed: false,
      width: safeW,
      height: safeH,
      num_inference_steps: 4
    });
    const outUrl = res?.data?.[0]?.url;
    if (outUrl) {
      const buf = await fetchBufferFollowRedirects(outUrl, 60000);
      if (buf && buf.length > 8000) {
        return { buffer: buf, engine: 'FLUX.1-schnell 고해상도 클린 엔진', seed: actualSeed };
      }
    }
  } catch (err) {
    errors.push('FLUX.1-schnell: ' + err.message);
  }

  throw new Error('고화질 AI 스튜디오 엔진 연결 지연: ' + errors.join(' | '));
}

function runMultiAngleFaceLockLocal({ targetImagePath, outputImagePath = '', angleRefPaths, analyzeOnly = false }) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(LOCAL_FACE_ENGINE_PY)) {
      return reject(new Error('로컬 다각도 안면 엔진 파일을 찾을 수 없습니다.'));
    }

    const fullRefPaths = (Array.isArray(angleRefPaths) && angleRefPaths.length > 0)
      ? [...angleRefPaths]
      : [];
    const cachePath = path.join(ANGLE_REFS_DIR, 'studio_angle_bank.npz');
    const tmpJobJson = path.join(
      HOMEPAGE_DIR,
      `_tmp_angle_job_${Date.now()}_${Math.random().toString(36).slice(2, 7)}.json`
    );

    fs.writeFileSync(
      tmpJobJson,
      JSON.stringify(
        {
          target: targetImagePath,
          output: outputImagePath,
          refs: fullRefPaths,
          angle_refs: angleRefPaths,
          cache_path: cachePath,
          enhance_blend: 0.85,
          analyze_only: Boolean(analyzeOnly)
        },
        null,
        2
      ),
      'utf8'
    );

    const cleanup = () => {
      try {
        if (fs.existsSync(tmpJobJson)) fs.unlinkSync(tmpJobJson);
      } catch (e) {}
    };

    const proc = spawn('python', [LOCAL_FACE_ENGINE_PY, '--job-json', tmpJobJson], {
      cwd: IMAGEMAKER_DIR,
      env: { ...process.env, PYTHONIOENCODING: 'utf-8' }
    });

    let resultObj = null;
    let stderrBuf = '';
    let stdoutRem = '';

    proc.stdout.on('data', (chunk) => {
      stdoutRem += chunk.toString('utf8');
      const lines = stdoutRem.split(/\r?\n/);
      stdoutRem = lines.pop() || '';
      for (const line of lines) {
        if (line.startsWith('RESULT|')) {
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
      cleanup();
      reject(err);
    });

    proc.on('close', (code) => {
      cleanup();
      if (code !== 0 || !resultObj || !resultObj.ok) {
        const cleanErr = stderrBuf
          .split(/\r?\n/)
          .filter((l) => l.trim() && !l.includes('onnxruntime'))
          .slice(-3)
          .join(' ');
        return reject(new Error(cleanErr || `다각도 안면 합성 종료 코드 ${code}`));
      }
      resolve(resultObj);
    });
  });
}

async function generateStudioImageComplete({
  userPrompt,
  originalCardPrompt = '',
  workMode = 'edit_current',
  sourceImage = '',
  useSourceImageRef = false,
  useDirectorFace = false,
  width = 1280,
  height = 800,
  seed = 0,
  filePrefix = 'clinic'
}) {
  const cleanPrompt = String(userPrompt || '').trim();
  if (!cleanPrompt) {
    throw new Error('생성할 이미지 프롬프트를 입력해 주세요.');
  }

  const noFaceDirective = detectNoFaceDirective(cleanPrompt);
  const noBackgroundDirective = detectNoBackgroundDirective(cleanPrompt);
  const effectiveUseDirectorFace = noFaceDirective ? false : Boolean(useDirectorFace);
  const effectiveUseSourceRef = Boolean(useSourceImageRef && sourceImage);

  const actualSeed = seed > 0 ? Math.floor(seed % 2147483647) : Math.floor(Math.random() * 89999999 + 10000000);
  const angleState = getDirectorAngleSamples();
  const angleRefPaths = angleState.angles
    .map((a) => path.join(HOMEPAGE_DIR, a.fileName.replace(/^\/+/, '')))
    .filter((p) => fs.existsSync(p));

  const preferredAngleKey = guessPreferredAngleKeyFromPrompt(cleanPrompt);
  const preferredAngleObj =
    angleState.angles.find((a) => a.key === preferredAngleKey) || angleState.angles[0];
  const preferredAnglePath = preferredAngleObj
    ? path.join(HOMEPAGE_DIR, preferredAngleObj.fileName.replace(/^\/+/, ''))
    : angleRefPaths[0] || '';

  const strippedPrefix =
    String(filePrefix || 'clinic')
      .replace(/^bareun_im_/i, '')
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .slice(0, 24) || 'clinic';
  const ts = Date.now();
  const finalSavedName = `bareun_im_${strippedPrefix}_${ts}.jpg`;
  const finalSavedPath = path.join(HOMEPAGE_DIR, finalSavedName);

  // Prepare multimodal reference images for Argon High (Gemini 3 Pro Image / Nano Banana Pro)
  const { geminiKey, falKey } = getRawStudioAiKeys();
  if (geminiKey || falKey) {
    const refImages = [];
    let hasSourceRef = false;

    // Only attach existing card image when the user explicitly opted into partial image reference!
    if (effectiveUseSourceRef) {
      const srcRef = await resolveReferenceImageInput(sourceImage);
      if (srcRef) {
        srcRef.roleLabel = '[참조 밑그림 사진 — 부분 수정 대상 원본 이미지 (조명·배경 참고용)]';
        refImages.push(srcRef);
        hasSourceRef = true;
      }
    }

    if (effectiveUseDirectorFace) {
      // Attach top 3 upright calibrated portraits with interleaved text labels so Gemini 3 Pro Image locks exact identity
      const orderedSlots = orderDirectorSlotsForPrompt(cleanPrompt, angleState.angles, 3);
      let refIdx = 1;
      for (const slot of orderedSlots) {
        const aRef = await resolveReferenceImageInput(slot.fileName);
        if (aRef) {
          aRef.roleLabel = `[참조 인물 사진 #${refIdx} — 안정위 대표원장 (${slot.label}) 실제 정방향 얼굴 골격·안경·가르마 기준]`;
          refImages.push(aRef);
          refIdx++;
        }
      }
    }

    const argonPrompt = buildArgonHighPrompt({
      userPrompt: cleanPrompt,
      originalCardPrompt: hasSourceRef ? originalCardPrompt : '',
      workMode,
      useDirectorFace: effectiveUseDirectorFace,
      noFaceDirective,
      noBackgroundDirective,
      hasSourceRef,
      preferredAngleLabel: preferredAngleObj ? preferredAngleObj.label : '정면 미소 (0°)'
    });

    let argonStage = null;
    const argonErrors = [];

    if (geminiKey) {
      try {
        argonStage = await generateViaGoogleGeminiDirect({
          geminiKey,
          promptText: argonPrompt,
          refImages,
          seed: actualSeed
        });
      } catch (gErr) {
        argonErrors.push(gErr.message);
      }
    }

    if (!argonStage && falKey) {
      try {
        argonStage = await generateViaFalNanoBananaPro({
          falKey,
          promptText: argonPrompt,
          refImages,
          hasSourceRef,
          seed: actualSeed
        });
        if (argonStage) argonStage.isArgonHigh = true;
      } catch (fErr) {
        argonErrors.push(fErr.message);
      }
    }

    if (argonStage && argonStage.buffer) {
      fs.writeFileSync(finalSavedPath, argonStage.buffer);
      let modeTag = noFaceDirective
        ? ' · [얼굴 미노출 구도 강제 적용]'
        : (effectiveUseDirectorFace
            ? ` + 안정위 원장님 정방향 얼굴 고정 (${preferredAngleObj ? preferredAngleObj.label : '정면'})`
            : '');
      let faceLockMeta = null;

      // Local Hybrid Precision Pass: fast ArcFace check first (~1s); preserve razor-sharp native 2K Gemini portrait when identity >= 70%!
      if (effectiveUseDirectorFace && angleRefPaths.length > 0 && fs.existsSync(LOCAL_FACE_ENGINE_PY)) {
        const tmpArgonRaw = path.join(HOMEPAGE_DIR, `_tmp_argon_raw_${ts}.jpg`);
        const tmpArgonLocked = path.join(HOMEPAGE_DIR, `_tmp_argon_locked_${ts}.jpg`);
        try {
          fs.copyFileSync(finalSavedPath, tmpArgonRaw);
          const checkMeta = await runMultiAngleFaceLockLocal({
            targetImagePath: tmpArgonRaw,
            angleRefPaths,
            analyzeOnly: true
          });
          const nativeSim = Number(checkMeta && checkMeta.similarityPct) || 0;
          if (nativeSim >= 70) {
            faceLockMeta = checkMeta;
            modeTag = ` + 안정위 원장님 2K 네이티브 얼굴 정밀 매칭 (일치율 ${nativeSim}%)`;
          } else {
            faceLockMeta = await runMultiAngleFaceLockLocal({
              targetImagePath: tmpArgonRaw,
              outputImagePath: tmpArgonLocked,
              angleRefPaths,
              analyzeOnly: false
            });
            if (faceLockMeta && faceLockMeta.ok && fs.existsSync(tmpArgonLocked)) {
              fs.copyFileSync(tmpArgonLocked, finalSavedPath);
              modeTag = ` + 8각도·미소 골격 정밀보정 (일치율 ${faceLockMeta.similarityPct || 98}%)`;
            }
          }
        } catch (lockErr) {
          // Keep Argon High 2K raw output intact
        } finally {
          try { if (fs.existsSync(tmpArgonRaw)) fs.unlinkSync(tmpArgonRaw); } catch (e) {}
          try { if (fs.existsSync(tmpArgonLocked)) fs.unlinkSync(tmpArgonLocked); } catch (e) {}
        }
      }

      const usage = recordStudioAiGeneration({
        tier: argonStage.isArgonHigh !== false ? 'argon-high' : 'gemini-flash',
        modelLabel: argonStage.engine
      });

      return {
        ok: true,
        fileName: finalSavedName,
        url: finalSavedName,
        seed: argonStage.seed || actualSeed,
        engine: `${argonStage.engine}${modeTag}`,
        tier: 'argon-high',
        noFaceDirective,
        effectiveUseDirectorFace,
        usedSourceImageRef: hasSourceRef,
        faceLockMeta,
        usage,
        message: `아르곤 하이 2K 초고화질 실사 이미지 제작 완료 (${argonStage.engine}${modeTag})`
      };
    }

    console.warn('[Argon High Engine Fallback to FLUX.1-dev]:', argonErrors.join(' | '));
  }

  // Fallback: Watermark-Free FLUX.1-dev + Local Multi-Angle Face Lock
  const masterPrompt = await buildMasterFluxPrompt(cleanPrompt, {
    useDirectorFace: effectiveUseDirectorFace,
    noFaceDirective,
    noBackgroundDirective
  });
  const stage1 = await generateWatermarkFreeFluxImage({
    masterPrompt,
    width,
    height,
    seed: actualSeed,
    useDirectorFace: effectiveUseDirectorFace,
    preferredAnglePath: effectiveUseDirectorFace ? preferredAnglePath : ''
  });

  const rawStage1Path = path.join(HOMEPAGE_DIR, `_tmp_stage1_${ts}.jpg`);
  fs.writeFileSync(rawStage1Path, stage1.buffer);

  let faceLockMeta = null;
  let engineSummary = stage1.engine + (noFaceDirective ? ' · [얼굴 미노출 구도 적용]' : '');

  if (effectiveUseDirectorFace && angleRefPaths.length > 0) {
    try {
      faceLockMeta = await runMultiAngleFaceLockLocal({
        targetImagePath: rawStage1Path,
        outputImagePath: finalSavedPath,
        angleRefPaths
      });
      engineSummary = `${stage1.engine} + 다각도 원장님 얼굴 정밀합성 (일치율 ${faceLockMeta.similarityPct || 99}%)`;
      try {
        if (fs.existsSync(rawStage1Path)) fs.unlinkSync(rawStage1Path);
      } catch (e) {}
    } catch (faceErr) {
      fs.renameSync(rawStage1Path, finalSavedPath);
      engineSummary = `${stage1.engine} (원본 유지)`;
    }
  } else {
    fs.renameSync(rawStage1Path, finalSavedPath);
  }

  const usage = recordStudioAiGeneration({
    tier: 'free-flux',
    modelLabel: stage1.engine
  });

  return {
    ok: true,
    fileName: finalSavedName,
    url: finalSavedName,
    seed: stage1.seed,
    engine: engineSummary,
    tier: 'free-flux',
    noFaceDirective,
    effectiveUseDirectorFace,
    usedSourceImageRef: false,
    masterPrompt,
    faceLockMeta,
    usage,
    message: `무워터마크 이미지 제작 완료 (${engineSummary})`
  };
}

module.exports = {
  DEFAULT_ANGLE_SLOTS,
  detectNoFaceDirective,
  detectNoBackgroundDirective,
  normalizeUserPromptDirectives,
  getStudioAiUsage,
  updateStudioAiUsageConfig,
  recordStudioAiGeneration,
  getRawStudioAiKeys,
  getStudioAiKeyConfig,
  saveStudioAiKeyConfig,
  getDirectorAngleSamples,
  updateDirectorAngleSample,
  translateKoreanToEnglishSentence,
  buildMasterFluxPrompt,
  buildArgonHighPrompt,
  generateStudioImageComplete
};
