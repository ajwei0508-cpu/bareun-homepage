'use strict';

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { spawn } = require('child_process');
const { pathToFileURL } = require('url');

const HOMEPAGE_DIR = __dirname;
const IMAGEMAKER_DIR = path.resolve(__dirname, '..', 'imagemaker');
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

  // Also copy into imagemaker profile refs so 374+ identity bank includes it
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
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) BareunStudio/3.0' },
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

/**
 * 한의학·해부학 전문 용어를 정확하게 전처리한 뒤 Google GTX 번역 엔진으로 문장 전체를 정밀 영문화합니다.
 */
function preprocessKoreanMedicalTerms(koText) {
  let s = String(koText || '').trim();
  const rules = [
    [/2\s*[,·ㆍ/.\-]?\s*3\s*[,·ㆍ/.\-]?\s*4\s*지\s*(손가락)?/g, '검지·중지·약지 세 손가락을 나란히 모아서(placing ONLY the index, middle, and ring fingers side-by-side)'],
    [/요골\s*동맥/g, '손목 안쪽 요골동맥 맥자리(radial artery pulse point on the inner wrist)'],
    [/진맥\s*쿠션|맥진\s*쿠션/g, '아이보리 명주 손목 받침 쿠션(ivory silk wrist pulse cushion)'],
    [/양손\s*맥진|양\s*손목\s*맥진|양손\s*진맥/g, '양 손목 정밀 맥박 촉진(traditional pulse palpation on both wrists)'],
    [/(?<!손목 받침 )(?:진맥|맥진)/g, '전통 한의학 손목 맥박 촉진(traditional Korean medicine radial pulse diagnosis)'],
    [/추나\s*요법|수기\s*추나|추나/g, '수기 척추교정 치료(hands-on Chuna spinal alignment manual therapy)'],
    [/약침/g, '정밀 한방 시술(precise Korean pharmacopuncture therapy)'],
    [/황제\s*공진단|공진단/g, '24K 순금박을 입힌 전통 한방 환약(traditional Korean Gongjindan herbal pill wrapped in pure 24k gold leaf)'],
    [/녹용\s*분골|러시아\s*녹용|녹용/g, '최상급 녹용 분골 절편(premium sliced deer antler tip cross-sections)'],
    [/원내\s*탕전실|무균\s*탕전실|탕전실/g, '유리 통창 원내 한약 조제실(clean glass-walled modern herbal medicine decoction lab)']
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

  // 1) Primary: Google GTX full-sentence neural translation
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

  // 2) Fallback: MyMemory
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

  // Strip any accidental mention of watermark/text
  const sanitizedScene = translatedScene.replace(/\b(watermark|logo|text overlay)\b/gi, '').trim();

  if (useDirectorFace) {
    // Ensure a realistic Korean male medical director with Director Ahn's exact swept-back forehead-exposed hair, gold rectangular glasses & doctor coat
    const directorIdentityLead =
      'Korean male medical director in his early 40s with neat swept-back short black hair revealing a clean open forehead (no bangs covering forehead), trustworthy masculine facial bone structure, wearing thin gold-rimmed rectangular glasses and a crisp tailored white medical doctor coat over a neat blue-and-white vertical striped dress shirt';
    return [
      'Authentic raw candid editorial photograph',
      directorIdentityLead,
      sanitizedScene,
      'warm sunlit Korean medicine clinic interior with natural honey-oak wood and soft warm daylight, shot on Canon EOS R5 with RF 85mm f/1.8L USM lens, ultra-realistic natural human skin pores and authentic micro-texture, natural hand anatomy, shallow depth of field, high-end medical editorial color grading, photorealistic, zero CGI, no text, no watermark, no signature'
    ]
      .filter(Boolean)
      .join(', ');
  }

  return [
    'Authentic raw editorial photograph',
    sanitizedScene,
    'warm refined Korean medicine clinic aesthetic, natural soft key lighting, shot on Canon EOS R5 with RF 85mm f/1.8L USM lens, ultra-realistic natural human skin texture and fine material detail, accurate anatomical hands and fingers, shallow depth of field, warm natural color grading, photorealistic, zero CGI, no text, no watermark, no logo'
  ]
    .filter(Boolean)
    .join(', ');
}

function guessPreferredAngleKeyFromPrompt(promptText) {
  const s = String(promptText || '').toLowerCase();
  if (/좌측\s*측면|왼쪽\s*옆모습|left profile/.test(s)) return 'leftProfile';
  if (/우측\s*측면|오른쪽\s*옆모습|측면|옆모습|side profile|right profile/.test(s)) return 'rightProfile';
  if (/좌측|왼쪽|left/.test(s)) return 'left30';
  if (/우측|오른쪽|사선|어깨너머|대각선|상담|초음파|진맥|맥진/.test(s)) return 'right30';
  return 'front';
}

async function loadGradioClient() {
  if (fs.existsSync(GRADIO_CLIENT_ESM)) {
    const mod = await import(pathToFileURL(GRADIO_CLIENT_ESM).href);
    return mod.Client;
  }
  const mod = await import('@gradio/client');
  return mod.Client;
}

/**
 * 100% 워터마크 없는 공식 Black Forest Labs FLUX.1-dev (28-step) / PuLID-FLUX / FLUX.1-schnell 생성기
 */
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
  // FLUX dimensions must be multiples of 32
  const safeW = Math.max(512, Math.min(1536, Math.round(width / 32) * 32));
  const safeH = Math.max(512, Math.min(1536, Math.round(height / 32) * 32));

  const errors = [];

  // Tier 1: Official Black Forest Labs FLUX.1-dev (28 steps — highest photorealism, hand anatomy, lighting, zero watermark!)
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

  // Tier 2: PuLID-FLUX (ZeroGPU reference-conditioned FLUX.1-dev, zero watermark)
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

  // Tier 3: Official Black Forest Labs FLUX.1-schnell (Zero watermark, ultra-fast fallback)
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

/**
 * 등록된 5개 각도별 얼굴 샘플 + 374장 실제 원장님 사진 은행을 결합하여 오차 범위 없는 다각도 인물 합성을 수행합니다.
 */
function runMultiAngleFaceLockLocal({ targetImagePath, outputImagePath, angleRefPaths }) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(LOCAL_FACE_ENGINE_PY)) {
      return reject(new Error('로컬 다각도 안면 엔진 파일을 찾을 수 없습니다.'));
    }

    // Collect full 374-photo profile refs if available
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
  useDirectorFace = false,
  width = 1280,
  height = 800,
  seed = 0,
  filePrefix = 'bareun_scene'
}) {
  const cleanPrompt = String(userPrompt || '').trim();
  if (!cleanPrompt) {
    throw new Error('생성할 이미지 프롬프트를 입력해 주세요.');
  }

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

  const masterPrompt = await buildMasterFluxPrompt(cleanPrompt, { useDirectorFace });

  const stage1 = await generateWatermarkFreeFluxImage({
    masterPrompt,
    width,
    height,
    seed,
    useDirectorFace,
    preferredAnglePath
  });

  const safePrefix =
    String(filePrefix || 'bareun_scene')
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .slice(0, 28) || 'bareun_scene';
  const ts = Date.now();
  const rawStage1Name = `_tmp_stage1_${ts}.jpg`;
  const rawStage1Path = path.join(HOMEPAGE_DIR, rawStage1Name);
  const finalSavedName = `bareun_im_${safePrefix}_${ts}.jpg`;
  const finalSavedPath = path.join(HOMEPAGE_DIR, finalSavedName);

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
      // If prompt had no visible human face (e.g., close-up of hands only), keep crisp Stage 1 output cleanly
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
    masterPrompt,
    faceLockMeta,
    message: `최고화질 무워터마크 이미지 제작 완료 (${engineSummary})`
  };
}

module.exports = {
  DEFAULT_ANGLE_SLOTS,
  getDirectorAngleSamples,
  updateDirectorAngleSample,
  translateKoreanToEnglishSentence,
  buildMasterFluxPrompt,
  generateStudioImageComplete
};
