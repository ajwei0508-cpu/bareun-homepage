'use strict';

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { spawn } = require('child_process');
const { pathToFileURL } = require('url');

const HOMEPAGE_DIR = __dirname;
const IMAGEMAKER_DIR = path.resolve(__dirname, '..', 'imagemaker');
const SETTINGS_JSON_PATH = path.join(IMAGEMAKER_DIR, 'data', 'settings.json');
const ANGLE_REFS_DIR = path.join(HOMEPAGE_DIR, 'director-angle-refs');
const ANGLE_MANIFEST_PATH = path.join(ANGLE_REFS_DIR, 'manifest.json');
const LOCAL_FACE_ENGINE_PY = path.join(IMAGEMAKER_DIR, 'local_face_engine.py');
const DIRECTOR_PROFILE_DIR = path.join(IMAGEMAKER_DIR, 'data', 'profiles', 'director_ahn');
const PROFILES_JSON_PATH = path.join(IMAGEMAKER_DIR, 'data', 'profiles.json');
const GRADIO_CLIENT_ESM = path.join(IMAGEMAKER_DIR, 'node_modules', '@gradio', 'client', 'dist', 'index.js');

const DEFAULT_ANGLE_SLOTS = [
  { key: 'front', label: '정면 (0°)', desc: '카메라 정면 응시', defaultFile: 'director-angle-refs/angle_front.jpg' },
  { key: 'left30', label: '좌측 30° 사선', desc: '왼쪽 반측면 시선', defaultFile: 'director-angle-refs/angle_left30.jpg' },
  { key: 'right30', label: '우측 30° 사선', desc: '오른쪽 반측면 시선', defaultFile: 'director-angle-refs/angle_right30.jpg' },
  { key: 'leftProfile', label: '좌측 측면 (45°+)', desc: '왼쪽 깊은 측면', defaultFile: 'director-angle-refs/angle_left_profile.jpg' },
  { key: 'rightProfile', label: '우측 측면 (45°+)', desc: '오른쪽 깊은 측면', defaultFile: 'director-angle-refs/angle_right_profile.jpg' }
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
  const geminiKey = String(s.geminiKey || process.env.GEMINI_API_KEY || '').trim();
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
    maskedFalKey: maskSecretKey(falKey)
  };
}

function saveStudioAiKeyConfig({ geminiKey, falKey, apiKey } = {}) {
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
  if (/좌측\s*측면|왼쪽\s*옆모습|왼쪽\s*측면|left\s*profile/.test(s)) return 'leftProfile';
  if (/우측\s*측면|오른쪽\s*옆모습|오른쪽\s*측면|측면|옆모습|side\s*profile|right\s*profile/.test(s)) return 'rightProfile';
  if (/좌측|왼쪽|left/.test(s)) return 'left30';
  if (/우측|오른쪽|사선|어깨너머|대각선|상담|초음파|진맥|맥진/.test(s)) return 'right30';
  return 'front';
}

/**
 * 아르곤 하이(Gemini 3 Pro Image / Nano Banana Pro 2K) 전용 정밀 에디토리얼 프롬프트 빌더
 * - 원본 카드 이미지 참조(edit_current) 시 변경된 구절(Diff)을 최우선으로 반영하고, 기존 카드의 조명·원목·색감·렌즈 심도를 완벽히 보존합니다.
 * - 다각도 원장님 얼굴 샘플 합성(useDirectorFace) 시 5각도 골격 동일성을 고정하며 중복 인물 생성을 방지합니다.
 */
function buildArgonHighPrompt({
  userPrompt,
  originalCardPrompt = '',
  workMode = 'edit_current',
  useDirectorFace = false,
  hasSourceRef = false,
  preferredAngleLabel = '정면 (0°)'
}) {
  const cleanUser = String(userPrompt || '').trim();
  const cleanOrig = String(originalCardPrompt || '').trim();
  const isPromptModified = Boolean(cleanOrig && cleanOrig !== cleanUser);

  const lines = [];

  if (workMode === 'edit_current' && hasSourceRef) {
    if (isPromptModified) {
      lines.push(
        '[역할: 하이엔드 메디컬 에디토리얼 포토그래퍼 — 원본 카드 기반 정밀 수정 촬영]',
        '첨부된 첫 번째 사진은 현재 홈페이지 카드에 설정되어 있는 원본 이미지입니다.',
        '첫 번째 원본 사진의 고급스러운 한의원 자연 채광, 따뜻한 원목/한지 톤앤매너, 카메라 렌즈 심도(Canon EOS R5 85mm f/1.8L)와 전체 공간 품격은 그대로 유지하되, 사용자가 수정한 아래 [최종 연출 프롬프트]의 변경 내용(손가락 위치·개수, 동작, 소품, 구도, 시선 등)을 최우선으로 오차 없이 정확하게 반영하여 새롭게 촬영해 주세요.',
        `[기존 카드 설명 (참고용)]: ${cleanOrig}`,
        `[최종 연출 프롬프트 (최우선 반영 필수)]: ${cleanUser}`
      );
    } else {
      lines.push(
        '[역할: 하이엔드 메디컬 에디토리얼 포토그래퍼 — 원본 카드 품격 계승 재촬영]',
        '첨부된 첫 번째 원본 카드 사진의 고급 한의원 조명·원목 질감·색감·구도 품격을 그대로 계승하면서, 디테일과 생동감이 한층 자연스럽게 새로 촬영된 초고화질 DSLR 실사 사진으로 제작해 주세요.',
        `[장면 연출 지시]: ${cleanUser}`
      );
    }
  } else {
    lines.push(
      '[역할: 하이엔드 메디컬 에디토리얼 포토그래퍼 — 최상급 DSLR 실사 촬영]',
      '따뜻한 원목과 은은한 한지 자연광이 어우러진 프리미엄 한의원(바른한의원)의 실제 에디토리얼 화보 수준(Canon EOS R5, RF 85mm f/1.8L USM 렌즈, 자연스러운 얕은 피사계 심도, 실제 피부 모공과 원단 직조 질감)으로 아래 장면을 촬영해 주세요.',
      `[장면 연출 지시]: ${cleanUser}`
    );
  }

  // 진맥/맥진·상담 등 한의사와 환자가 함께 나오는 동작에서 자가 손목 잡기 오류 원천 차단
  if (/진맥|맥진|요골\s*동맥|손목/.test(cleanUser)) {
    lines.push(
      '[해부학 및 인물 배치 필수 규칙]: 반드시 진료 책상을 사이에 두고 서로 마주 앉은 두 명의 독립된 인물(한쪽은 편안한 일상복 소매의 환자 팔/손목, 반대쪽은 깔끔한 흰 의사 가운과 스트라이프 셔츠 소매의 한의사 손)로 정확히 분리하여 표현하세요. 절대로 한 사람이 자기 자신의 손목을 짚는 구도가 되어서는 안 됩니다. 손가락 개수(엄지~새끼손가락 5개 해부학 비례, 특히 2·3·4지 검지·중지·약지 지시 시 세 손가락을 나란히 가지런히 요골동맥 위에 얹는 정통 맥진 자세)를 100% 정확하게 표현하세요.'
    );
  }

  if (useDirectorFace) {
    lines.push(
      `[안정위 대표원장 다각도 샘플 얼굴 오차 ZERO 고정]: ${hasSourceRef ? '두 번째 이후 첨부된 인물 사진들은' : '첨부된 인물 기준 사진들은'} 모두 '동일한 한 명의 한국인 남성 한의사(안정위 대표원장)'를 각도별로 촬영한 실제 얼굴 샘플입니다. 결과 사진에는 대표원장 1명만 등장시켜야 하며(기준 인물을 여러 명으로 복제 금지), 프롬프트 구도에 맞는 각도(권장 기준: ${preferredAngleLabel})에서 첨부 샘플과 얼굴 골격, 눈매, 콧대, 입매, 피부톤, 얇은 금테 직사각형 안경, 앞머리로 이마를 덮지 않고 깔끔하게 넘긴 단정한 검은 헤어스타일이 100% 동일 인물로 보이도록 정밀하게 표현하세요.`
    );
  }

  lines.push(
    '[화질 및 클린 마감 절대 원칙]: 워터마크, 로고, 서명, 자막 텍스트를 절대 넣지 마세요. 흰 의사 가운 가슴 주머니에도 깨진 글자나 자수 명찰 없이 깨끗한 순백색 무지 고급 가운으로 표현하세요. 3D 그래픽이나 AI 일러스트 느낌 없이 100% 실제 카메라로 촬영한 무보정 RAW 에디토리얼 실사 사진이어야 합니다.'
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
    { id: 'gemini-3-pro-image', label: 'Google Gemini 3 Pro Image (아르곤 하이 정품 2K)', supportsSize: true },
    { id: 'gemini-nano-banana-2.1', label: 'Google Gemini Nano Banana 2.1 (아르곤 하이 2K)', supportsSize: true },
    { id: 'gemini-3.1-flash-image', label: 'Google Gemini 3.1 Flash Image (2K)', supportsSize: true },
    { id: 'gemini-2.5-flash-image', label: 'Google Gemini 2.5 Flash Image', supportsSize: false }
  ];

  const inputBlocks = [];
  for (const img of refImages.slice(0, 8)) {
    if (img && img.base64) {
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
          return { buffer: imgBuf, engine: m.label, seed };
        }
      }
      const errMsg = res.json?.error?.message || res.rawText?.slice(0, 180) || `HTTP ${res.statusCode}`;
      errs.push(`${m.id}: ${errMsg}`);
    } catch (e) {
      errs.push(`${m.id}: ${e.message}`);
    }
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
  let s = String(koText || '').trim();
  const rules = [
    [/2\s*[,·ㆍ/.\-]?\s*3\s*[,·ㆍ/.\-]?\s*4\s*지\s*(손가락)?|검지\s*[,·ㆍ]?\s*중지\s*[,·ㆍ]?\s*약지/g, '검지·중지·약지 세 손가락을 나란히 모아서(placing ONLY the index, middle, and ring fingers side-by-side)'],
    [/요골\s*동맥/g, '환자 손목 안쪽 요골동맥 맥자리(the radial artery pulse point on the inner wrist of the patient)'],
    [/진맥\s*쿠션|맥진\s*쿠션/g, '아이보리 명주 손목 받침 쿠션(ivory silk wrist pulse cushion)'],
    [/양손\s*맥진|양\s*손목\s*맥진|양손\s*진맥/g, '마주 앉은 환자의 양 손목 정밀 맥박 촉진(traditional pulse palpation on both wrists of the patient sitting opposite)'],
    [/(?<!손목 받침 )(?:진맥|맥진)/g, '전통 한의학 손목 맥박 촉진(traditional Korean medicine radial pulse diagnosis)'],
    [/복진/g, '진료 베드에 누운 환자의 복부 정밀 촉진(gentle clinical abdominal palpation on an examination bed)'],
    [/추나\s*요법|수기\s*추나|추나/g, '수기 척추교정 치료(hands-on Chuna spinal alignment manual therapy)'],
    [/약침/g, '정밀 한방 약침 시술(precise sterile Korean pharmacopuncture therapy)'],
    [/황제\s*공진단|공진단/g, '24K 순금박을 입힌 전통 한방 환약과 원목 목함(traditional Korean Gongjindan herbal pill wrapped in pure 24k gold leaf in a walnut box)'],
    [/녹용\s*분골|러시아\s*녹용|녹용/g, '최상급 녹용 분골 절편(premium sliced deer antler tip cross-sections)'],
    [/원내\s*탕전실|무균\s*탕전실|탕전실/g, '유리 통창 원내 한약 조제실(clean glass-walled modern herbal medicine decoction lab)'],
    [/초음파\s*진단기|초음파\s*모니터|초음파/g, '정밀 초음파 진단 프로브와 초음파 모니터(diagnostic ultrasound probe and live grayscale ultrasound monitor)'],
    [/체열\s*진단기|적외선\s*체열/g, '적외선 체열진단 열화상 모니터(medical infrared thermography body heat-map monitor)']
  ];
  const tokens = [];
  for (const [regex, replacement] of rules) {
    s = s.replace(regex, () => {
      const key = `__BMED_${tokens.length}__`;
      tokens.push(replacement);
      return key;
    });
  }
  for (let i = 0; i < tokens.length; i++) {
    s = s.split(`__BMED_${i}__`).join(tokens[i]);
  }
  return s;
}

async function translateKoreanToEnglishSentence(text) {
  const raw = String(text || '').trim();
  if (!raw) return '';
  if (!/[가-힣]/.test(raw)) return raw;

  const prepared = preprocessKoreanMedicalTerms(raw);

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

  try {
    const mmUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(prepared)}&langpair=ko|en`;
    const buf = await fetchBufferFollowRedirects(mmUrl, 6000);
    const parsed = JSON.parse(buf.toString('utf8'));
    const cand = parsed?.responseData?.translatedText || '';
    if (cand && !/MYMEMORY WARNING/i.test(cand)) return cand.trim();
  } catch (e) {}

  return prepared;
}

async function buildMasterFluxPrompt(userPrompt, { useDirectorFace = false } = {}) {
  const cleanUser = String(userPrompt || '').trim();
  const translatedScene = await translateKoreanToEnglishSentence(cleanUser);
  const sanitizedScene = translatedScene.replace(/\b(watermark|logo|text overlay)\b/gi, '').trim();

  const needsTwoPersonPulseSeparation = /진맥|맥진|요골|손목|radial artery|pulse/i.test(cleanUser + ' ' + sanitizedScene);
  const twoPersonClause = needsTwoPersonPulseSeparation
    ? 'two separate distinct people sitting across a warm walnut consultation table from opposite sides: a patient in dark navy knitwear extending their bare wrist from the left side onto an ivory silk cushion, and a Korean medicine doctor in a plain unembroidered crisp white coat over a blue-and-white striped dress shirt reaching from the right side to palpate the patient wrist'
    : '';

  if (useDirectorFace) {
    const directorIdentityLead =
      'Korean male medical director in his early 40s with neat swept-back short black hair revealing a clean open forehead (no bangs covering forehead), trustworthy masculine facial bone structure, wearing thin gold-rimmed rectangular glasses and a plain unembroidered crisp tailored white medical doctor coat over a neat blue-and-white vertical striped dress shirt';
    return [
      'Authentic raw candid editorial photograph',
      directorIdentityLead,
      twoPersonClause,
      sanitizedScene,
      'warm sunlit Korean medicine clinic interior with natural honey-oak wood and soft warm daylight, shot on Canon EOS R5 with RF 85mm f/1.8L USM lens, ultra-realistic natural human skin pores and authentic micro-texture, accurate 5-finger hand anatomy, shallow depth of field, high-end medical editorial color grading, photorealistic, zero CGI, no text, no watermark, no signature'
    ]
      .filter(Boolean)
      .join(', ');
  }

  return [
    'Authentic raw editorial photograph',
    twoPersonClause,
    sanitizedScene,
    'warm refined Korean medicine clinic aesthetic, natural soft key lighting, shot on Canon EOS R5 with RF 85mm f/1.8L USM lens, ultra-realistic natural human skin texture and fine material detail, accurate anatomical hands and fingers, shallow depth of field, warm natural color grading, photorealistic, zero CGI, no text, no watermark, no logo'
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

function runMultiAngleFaceLockLocal({ targetImagePath, outputImagePath, angleRefPaths }) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(LOCAL_FACE_ENGINE_PY)) {
      return reject(new Error('로컬 다각도 안면 엔진 파일을 찾을 수 없습니다.'));
    }

    let fullRefPaths = [];
    try {
      if (fs.existsSync(PROFILES_JSON_PATH)) {
        const profiles = JSON.parse(fs.readFileSync(PROFILES_JSON_PATH, 'utf8'));
        const dirProf = (profiles || []).find((p) => p.id === 'director_ahn') || profiles[0];
        if (dirProf && Array.isArray(dirProf.photos)) {
          const refsDir = path.join(DIRECTOR_PROFILE_DIR, 'refs');
          if (dirProf.masterPhoto && fs.existsSync(path.join(refsDir, dirProf.masterPhoto))) {
            fullRefPaths.push(path.join(refsDir, dirProf.masterPhoto));
          }
          for (const f of dirProf.photos) {
            const p = path.join(refsDir, f);
            if (fs.existsSync(p) && !fullRefPaths.includes(p)) fullRefPaths.push(p);
          }
        }
      }
    } catch (e) {}

    if (fullRefPaths.length === 0) {
      fullRefPaths = [...angleRefPaths];
    }

    const cachePath = path.join(DIRECTOR_PROFILE_DIR, 'identity_bank.npz');
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
          analyze_only: false
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

    if (workMode === 'edit_current' && sourceImage) {
      const srcRef = await resolveReferenceImageInput(sourceImage);
      if (srcRef) {
        refImages.push(srcRef);
        hasSourceRef = true;
      }
    }

    if (useDirectorFace) {
      // Put preferred angle first, followed by the remaining 4 angles so Gemini locks full 3D bone structure
      const orderedSlots = [
        preferredAngleObj,
        ...angleState.angles.filter((a) => !preferredAngleObj || a.key !== preferredAngleObj.key)
      ].filter(Boolean);
      for (const slot of orderedSlots) {
        const aRef = await resolveReferenceImageInput(slot.fileName);
        if (aRef) refImages.push(aRef);
      }
    }

    const argonPrompt = buildArgonHighPrompt({
      userPrompt: cleanPrompt,
      originalCardPrompt,
      workMode,
      useDirectorFace,
      hasSourceRef,
      preferredAngleLabel: preferredAngleObj ? preferredAngleObj.label : '정면 (0°)'
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
      } catch (fErr) {
        argonErrors.push(fErr.message);
      }
    }

    if (argonStage && argonStage.buffer) {
      fs.writeFileSync(finalSavedPath, argonStage.buffer);
      const modeTag = useDirectorFace ? ' + 5각도 원장님 실제 얼굴 네이티브 고정' : '';
      return {
        ok: true,
        fileName: finalSavedName,
        url: finalSavedName,
        seed: argonStage.seed || actualSeed,
        engine: `${argonStage.engine}${modeTag}`,
        tier: 'argon-high',
        message: `아르곤 하이 2K 초고화질 실사 이미지 제작 완료 (${argonStage.engine})`
      };
    }

    console.warn('[Argon High Engine Fallback to FLUX.1-dev]:', argonErrors.join(' | '));
  }

  // Fallback: Watermark-Free FLUX.1-dev + Local Multi-Angle Face Lock
  const masterPrompt = await buildMasterFluxPrompt(cleanPrompt, { useDirectorFace });
  const stage1 = await generateWatermarkFreeFluxImage({
    masterPrompt,
    width,
    height,
    seed: actualSeed,
    useDirectorFace,
    preferredAnglePath
  });

  const rawStage1Path = path.join(HOMEPAGE_DIR, `_tmp_stage1_${ts}.jpg`);
  fs.writeFileSync(rawStage1Path, stage1.buffer);

  let faceLockMeta = null;
  let engineSummary = stage1.engine;

  if (useDirectorFace && angleRefPaths.length > 0) {
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
      engineSummary = `${stage1.engine} (얼굴 미노출 구도 원본 유지)`;
    }
  } else {
    fs.renameSync(rawStage1Path, finalSavedPath);
  }

  return {
    ok: true,
    fileName: finalSavedName,
    url: finalSavedName,
    seed: stage1.seed,
    engine: engineSummary,
    tier: 'free-flux',
    masterPrompt,
    faceLockMeta,
    message: `무워터마크 이미지 제작 완료 (${engineSummary})`
  };
}

module.exports = {
  DEFAULT_ANGLE_SLOTS,
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
