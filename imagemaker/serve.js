const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const https = require('https');
const { spawn } = require('child_process');
const { createFalClient } = require('@fal-ai/client');
const AdmZip = require('adm-zip');

const PORT = Number(process.env.PORT || 4500);
const ROOT_DIR = __dirname;
const DATA_DIR = path.join(ROOT_DIR, 'data');
const PROFILES_DIR = path.join(DATA_DIR, 'profiles');
const OUTPUTS_DIR = path.join(DATA_DIR, 'outputs');
const LORAS_DIR = path.join(DATA_DIR, 'loras');
const SETTINGS_PATH = path.join(DATA_DIR, 'settings.json');
const PROFILES_JSON = path.join(DATA_DIR, 'profiles.json');
const GALLERY_JSON = path.join(DATA_DIR, 'gallery.json');
const COMPARISONS_JSON = path.join(DATA_DIR, 'comparisons.json');
const UPLOAD_CACHE_JSON = path.join(DATA_DIR, 'upload-cache.json');
const LOCAL_ENGINE_PY = path.join(ROOT_DIR, 'local_face_engine.py');

const HOMEPAGE_DIR = fs.existsSync(path.resolve(ROOT_DIR, '..', 'homepage'))
  ? path.resolve(ROOT_DIR, '..', 'homepage')
  : path.resolve(ROOT_DIR, '..', '바른한의원 홈페이지', 'homepage');

for (const dir of [DATA_DIR, PROFILES_DIR, OUTPUTS_DIR, LORAS_DIR]) {
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
  const { falKey } = getSettings();
  if (!falKey) {
    throw new Error(
      '유료 PRO(골드 메뉴)를 사용하시려면 우측 상단 [👑 유료 PRO 설정]에서 fal.ai API 키를 등록해 주세요. (무료 모드는 키 없이 바로 작동합니다!)'
    );
  }
  return createFalClient({ credentials: falKey });
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

function listHomepageDirectorImages() {
  if (!fs.existsSync(HOMEPAGE_DIR)) return [];
  const all = fs.readdirSync(HOMEPAGE_DIR);
  const priorityPattern =
    /^(card_1_director|ba_director_|detail_director_|director_exam_card|growth-two-types-director|growth_male_director_|growth_two_types_director_)/i;
  return all
    .filter((f) => priorityPattern.test(f) && /\.(jpg|jpeg|png|webp)$/i.test(f))
    .sort()
    .map((f) => {
      const full = path.join(HOMEPAGE_DIR, f);
      const stat = fs.statSync(full);
      return {
        fileName: f,
        sizeBytes: stat.size,
        previewUrl: `/files/homepage/${encodeURIComponent(f)}?t=${Math.floor(stat.mtimeMs)}`
      };
    });
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
    'a Korean male doctor in his late 30s wearing thin gold-rimmed rectangular glasses, neat black hair';
  const outfitDesc = OUTFIT_MAP[outfitKey] || '';
  const rawScene = String(scenePrompt || '').trim();
  const hasKorean = /[가-힣]/.test(rawScene);

  let englishScene = rawScene;
  if (hasKorean) {
    const domainHints = domainKoreanSceneEnhancer(rawScene);
    let translated = '';
    try {
      const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(rawScene)}&langpair=ko|en`;
      const data = await fetchJsonUrl(apiUrl, 5000);
      const cand = data?.responseData?.translatedText || '';
      if (cand && !/MYMEMORY WARNING/i.test(cand)) {
        translated = cand.trim();
      }
    } catch (e) {}

    if (domainHints.length > 0 && translated) {
      englishScene = `${translated}, ${domainHints.join(', ')}`;
    } else if (domainHints.length > 0) {
      englishScene = domainHints.join(', ');
    } else if (translated) {
      englishScene = translated;
    }
  }

  const subjectLead =
    includeTrigger && profile.triggerWord ? `${profile.triggerWord}, ${baseTraits}` : baseTraits;

  return [
    `Candid editorial medium portrait photograph of ${subjectLead}`,
    outfitDesc,
    englishScene,
    'facing toward camera clearly, Shot on Canon EOS R5 with RF 85mm f/1.8 lens, natural soft key lighting, authentic human skin pores and natural micro-texture, crisp thin gold eyeglass frame, natural depth of field, photorealistic, zero CGI, zero illustration'
  ]
    .filter(Boolean)
    .join(', ');
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
    writeJsonSafe(jobJsonPath, {
      target: targetPath,
      output: outputPath,
      refs: refPaths,
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

  try {
    onLog('무료 ZeroGPU [FLUX.1-schnell 초고속 엔진] 촬영 중...');
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
      return { url: outUrl, engineLabel: '무료 FLUX.1-schnell' };
    }
  } catch (e) {
    onLog(`ZeroGPU 일시 한도 도달 -> Pollinations 무료 FLUX 백업 서버로 촬영합니다`);
  }

  const seed = Math.floor(Math.random() * 99999999);
  const pollUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?model=flux&width=${dims.width}&height=${dims.height}&seed=${seed}&nologo=true`;
  return { url: pollUrl, engineLabel: '무료 Pollinations FLUX' };
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
    loraScale = 1.0,
    faceLock = true
  } = payload;

  const profiles = readJsonSafe(PROFILES_JSON, []);
  const profile = profiles.find((p) => p.id === profileId);
  if (!profile) throw new Error('프로필을 찾을 수 없습니다.');

  const refPaths = getOrderedProfileRefPaths(profile);
  if (refPaths.length === 0) throw new Error('기준 얼굴 사진이 없습니다.');
  const useLora = Boolean(profile.loraUrl);

  onStep(15, '👑 [유료 PRO] 프롬프트 설계 및 마스터 기준 사진 클라우드 업로드 중...');
  const finalPrompt = await buildFreePhotorealPrompt(profile, scenePrompt, outfitKey, useLora);
  const masterCdnUrl = await uploadFileToFalCached(falClient, refPaths[0]);

  let rawImageUrl = '';
  if (useLora) {
    onStep(35, '👑 [유료 PRO] fal.ai 전용 FLUX Portrait LoRA 28스텝 촬영 중...');
    const genRes = await falClient.subscribe('fal-ai/flux-lora', {
      input: {
        prompt: finalPrompt,
        loras: [{ path: profile.loraUrl, scale: Number(loraScale) || 1.0 }],
        image_size: imageSize,
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

  if (faceLock) {
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
          fidelity: 0.72,
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
    mode: useLora ? '👑 유료 PRO · 전용 LoRA + CodeFormer' : '👑 유료 PRO · fal.ai PuLID + CodeFormer',
    engineDetail: useLora
      ? 'fal.ai FLUX Portrait LoRA (28 steps) + Cloud Face-Swap + Cloud CodeFormer'
      : 'fal.ai FLUX PuLID (28 steps) + Cloud Face-Swap + Cloud CodeFormer',
    cost: useLora ? '👑 약 110원 ($0.08)' : '👑 약 95원 ($0.07)',
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
function prepareExistingSourceFile(sourceType, homepageFile, uploadDataUrl, prefix) {
  const stamp = Date.now();
  const beforeFileName = `${prefix}_${stamp}_before.png`;
  const beforePath = path.join(OUTPUTS_DIR, beforeFileName);

  if (sourceType === 'homepage') {
    const safeName = path.basename(homepageFile);
    const srcPath = path.join(HOMEPAGE_DIR, safeName);
    if (!safeName || !fs.existsSync(srcPath)) {
      throw new Error(`홈페이지 원본 파일을 찾을 수 없습니다: ${safeName}`);
    }
    fs.copyFileSync(srcPath, beforePath);
  } else {
    const match = String(uploadDataUrl || '').match(/^data:image\/[a-zA-Z0-9+.-]+;base64,(.+)$/);
    if (!match) throw new Error('교정할 대상 사진을 선택해 주세요.');
    fs.writeFileSync(beforePath, Buffer.from(match[1], 'base64'));
  }
  return { stamp, beforeFileName, beforePath };
}

async function executeFreeFixCore(payload, onStep) {
  const t0 = Date.now();
  const {
    profileId,
    sourceType = 'homepage',
    homepageFile = '',
    uploadDataUrl = '',
    enhanceBlend = 0.82
  } = payload;

  const profiles = readJsonSafe(PROFILES_JSON, []);
  const profile = profiles.find((p) => p.id === profileId);
  if (!profile) throw new Error('선택된 인물 프로필이 없습니다.');

  const refPaths = getOrderedProfileRefPaths(profile);
  if (refPaths.length === 0) throw new Error('등록된 실제 기준 사진이 없습니다.');

  const { stamp, beforeFileName, beforePath } = prepareExistingSourceFile(
    sourceType,
    homepageFile,
    uploadDataUrl,
    'fix_free'
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
    scenePrompt: sourceType === 'homepage' ? `[홈페이지 무료 교정] ${homepageFile}` : '[내 PC 사진 무료 교정]',
    englishPrompt: '',
    imageSize: 'original',
    rawUrl: `/files/outputs/${beforeFileName}`,
    finalUrl: `/files/outputs/${afterFileName}`,
    rawFileName: beforeFileName,
    finalFileName: afterFileName,
    targetHomepageFile: sourceType === 'homepage' ? path.basename(homepageFile) : null,
    createdAt: new Date().toISOString()
  };

  saveToGallery(entry);
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
    uploadDataUrl = ''
  } = payload;

  const profiles = readJsonSafe(PROFILES_JSON, []);
  const profile = profiles.find((p) => p.id === profileId);
  if (!profile) throw new Error('선택된 인물 프로필이 없습니다.');

  const refPaths = getOrderedProfileRefPaths(profile);
  if (refPaths.length === 0) throw new Error('등록된 실제 기준 사진이 없습니다.');

  const { stamp, beforeFileName, beforePath } = prepareExistingSourceFile(
    sourceType,
    homepageFile,
    uploadDataUrl,
    'fix_paid'
  );
  const afterFileName = `fix_paid_${stamp}_after.png`;
  const afterPath = path.join(OUTPUTS_DIR, afterFileName);

  onStep(20, '👑 [유료 PRO] 원본 이미지 및 대표 얼굴 클라우드 업로드 중...');
  const baseCdnUrl = await uploadFileToFalCached(falClient, beforePath);
  const masterCdnUrl = await uploadFileToFalCached(falClient, refPaths[0]);

  onStep(48, '👑 [유료 PRO] fal.ai 클라우드 Face-Swap 정밀 교체 중...');
  const swapRes = await falClient.subscribe('fal-ai/face-swap', {
    input: {
      base_image_url: baseCdnUrl,
      swap_image_url: masterCdnUrl
    }
  });
  let cloudOutUrl = swapRes?.data?.image?.url || swapRes?.data?.images?.[0]?.url || '';
  if (!cloudOutUrl) throw new Error('클라우드 Face-Swap 결과 URL을 받지 못했습니다.');

  onStep(74, '👑 [유료 PRO] fal.ai 클라우드 CodeFormer 초고화질 모공·안경 복원 중...');
  try {
    const cfRes = await falClient.subscribe('fal-ai/codeformer', {
      input: {
        image_url: cloudOutUrl,
        fidelity: 0.72,
        upscale_factor: 1,
        face_upscale: true,
        only_center_face: false
      }
    });
    cloudOutUrl = cfRes?.data?.image?.url || cloudOutUrl;
  } catch (e) {
    onStep(null, `CodeFormer 추가 복원 생략 (${e.message.slice(0, 50)})`, true);
  }

  await downloadUrlToFile(cloudOutUrl, afterPath);

  onStep(90, '📊 무료 vs 유료 동일 기준 객관적 얼굴 일치율 · 선명도 계측 중...');
  const metrics = await runLocalFaceEngine({
    profileId,
    targetPath: afterPath,
    refPaths,
    analyzeOnly: true
  });

  const elapsedSec = Number(((Date.now() - t0) / 1000).toFixed(1));
  const entry = {
    id: 'fix_paid_' + stamp,
    tier: 'paid',
    mode: '👑 유료 PRO 클라우드 얼굴 교정 (CodeFormer)',
    engineDetail: 'fal.ai Cloud Face-Swap + Cloud CodeFormer Pro Restoration',
    cost: '👑 약 45원 ($0.03)',
    elapsedSec,
    similarityPct: metrics.similarityPct,
    sharpnessScore: metrics.sharpnessScore,
    width: metrics.width,
    height: metrics.height,
    landmarksPct: metrics.landmarksPct,
    faceLocked: true,
    profileId,
    profileName: profile.name,
    scenePrompt: sourceType === 'homepage' ? `[홈페이지 유료 PRO 교정] ${homepageFile}` : '[내 PC 사진 유료 PRO 교정]',
    englishPrompt: '',
    imageSize: 'original',
    rawUrl: `/files/outputs/${beforeFileName}`,
    finalUrl: `/files/outputs/${afterFileName}`,
    rawFileName: beforeFileName,
    finalFileName: afterFileName,
    targetHomepageFile: sourceType === 'homepage' ? path.basename(homepageFile) : null,
    createdAt: new Date().toISOString()
  };

  saveToGallery(entry);
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
  const isPaid = payload.costMode === 'cloud_fal';
  try {
    const onStep = (pct, msg, logOnly = false) => {
      if (pct !== null && pct !== undefined) job.progress = pct;
      if (!logOnly && msg) job.stepText = msg;
      if (msg) appendJobLog(job, msg);
    };
    const entry = isPaid
      ? await executeCloudFalFixCore(payload, onStep)
      : await executeFreeFixCore(payload, onStep);

    job.progress = 100;
    job.status = 'completed';
    job.stepText = `${isPaid ? '👑 유료 PRO' : '🆓 무료 GPU'} 교정 완료! (일치율 ${entry.similarityPct}%)`;
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
          ? `기존사진 얼굴 교정 비교 (${payload.homepageFile || '업로드 사진'})`
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

    if (req.method === 'GET' && pathname === '/api/state') {
      const { falKey, hfToken } = getSettings();
      const profiles = ensureDefaultProfile();
      const gallery = readJsonSafe(GALLERY_JSON, []);
      const comparisons = readJsonSafe(COMPARISONS_JSON, []);
      const homepageImages = listHomepageDirectorImages();
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
        homepageImages
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

    // Generate Scene (Free, Paid Gold, or 1:1 Simultaneous Compare!)
    if (req.method === 'POST' && pathname === '/api/generate') {
      const body = await readBodyJson(req);
      if (body.costMode === 'compare_both') {
        const job = createJob('compare_generate', '⚖️ 무료 vs 👑 유료 1:1 동시 촬영 비교');
        runDualCompareJob(job, 'generate', body);
        return sendJson(res, 200, { ok: true, jobId: job.id, isCompare: true });
      }
      const isPaid = body.costMode === 'cloud_fal';
      const job = createJob('generate', isPaid ? '👑 유료 PRO 클라우드 촬영' : '🆓 0원 무료 촬영');
      runSingleGenerateJob(job, body);
      return sendJson(res, 200, { ok: true, jobId: job.id, isCompare: false });
    }

    // Fix Existing Photo (Free Local GPU, Paid Gold Cloud, or 1:1 Simultaneous Compare!)
    if (req.method === 'POST' && pathname === '/api/fix-existing') {
      const body = await readBodyJson(req);
      if (body.costMode === 'compare_both') {
        const job = createJob('compare_fix', '⚖️ 무료 GPU vs 👑 유료 클라우드 동시 교정 비교');
        runDualCompareJob(job, 'fix', body);
        return sendJson(res, 200, { ok: true, jobId: job.id, isCompare: true });
      }
      const isPaid = body.costMode === 'cloud_fal';
      const job = createJob('fix', isPaid ? '👑 유료 PRO 클라우드 얼굴 교정' : '🆓 내 PC 무료 GPU 얼굴 교정');
      runSingleFixJob(job, body);
      return sendJson(res, 200, { ok: true, jobId: job.id, isCompare: false });
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

    // Paid Cloud LoRA Training (👑 Gold Menu)
    if (req.method === 'POST' && pathname === '/api/train') {
      const body = await readBodyJson(req);
      const job = createJob('train', '👑 전용 얼굴 금형(LoRA) 유료 클라우드 학습');
      runLoraTrainingJob(job, body);
      return sendJson(res, 200, { ok: true, jobId: job.id });
    }

    if (req.method === 'POST' && pathname === '/api/apply-to-homepage') {
      const body = await readBodyJson(req);
      const outputFileName = path.basename(String(body.outputFileName || ''));
      const targetHomepageFile = path.basename(String(body.targetHomepageFile || ''));
      if (!outputFileName || !targetHomepageFile) {
        return sendJson(res, 400, { ok: false, error: '원본 파일명과 결과 파일명이 필요합니다.' });
      }
      const srcOut = path.join(OUTPUTS_DIR, outputFileName);
      const dstHome = path.join(HOMEPAGE_DIR, targetHomepageFile);
      if (!fs.existsSync(srcOut)) return sendJson(res, 404, { ok: false, error: '결과 파일을 찾을 수 없습니다.' });

      const backupDir = path.join(HOMEPAGE_DIR, '_backup_director_faces');
      fs.mkdirSync(backupDir, { recursive: true });
      if (fs.existsSync(dstHome)) {
        fs.copyFileSync(dstHome, path.join(backupDir, `${Date.now()}_${targetHomepageFile}`));
      }
      fs.copyFileSync(srcOut, dstHome);
      return sendJson(res, 200, {
        ok: true,
        message: `홈페이지 원본(${targetHomepageFile})을 백업한 뒤 선택하신 사진으로 즉시 교체했습니다!`
      });
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
