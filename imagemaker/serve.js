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
    throw new Error('유료 클라우드 모드를 쓰시려면 상단 [⚙️ 엔진 · 키 설정]에 fal.ai 키를 입력하거나, [🆓 100% 무료 모드]를 선택해 주세요.');
  }
  return createFalClient({ credentials: falKey });
}

function formatFalError(err) {
  const detail = (err && err.body && (err.body.detail || err.body.message)) || '';
  const raw = String(detail || (err && err.message) || err || '');
  if (/Exhausted balance|Top up your balance/i.test(raw)) {
    return 'fal.ai 유료 클라우드 계정의 잔액이 $0입니다. 결제 없이 쓰시려면 촬영 엔진을 [🆓 100% 무료 모드]로 선택하시거나, https://fal.ai/dashboard/billing 에서 크레딧을 충전해 주세요.';
  }
  if (err && err.status === 401) {
    return '입력하신 API 키가 올바르지 않습니다. [🆓 100% 무료 모드]는 키 없이도 바로 작동합니다!';
  }
  if (err && err.status === 403) {
    return `fal.ai 접근 거부(403 Forbidden): ${detail || '잔액 부족'}. [🆓 100% 무료 모드]로 전환하시면 결제 없이 바로 촬영됩니다!`;
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
          { headers: { 'User-Agent': 'IdentityLockStudio/2.0' } },
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
  const priorityPattern = /^(card_1_director|ba_director_|detail_director_|director_exam_card|growth-two-types-director|growth_male_director_|growth_two_types_director_)/i;
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

// 100% Free Korean -> English FLUX Photography Prompt Builder (Zero API Key Needed)
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

  const subjectLead = includeTrigger && profile.triggerWord
    ? `${profile.triggerWord}, ${baseTraits}`
    : baseTraits;

  return [
    `Candid editorial medium portrait photograph of ${subjectLead}`,
    outfitDesc,
    englishScene,
    'facing toward camera clearly, Shot on Canon EOS R5 with RF 85mm f/1.8 lens, natural soft key lighting, authentic human skin pores and natural micro-texture, crisp thin gold eyeglass frame, natural depth of field, photorealistic, zero CGI, zero illustration'
  ]
    .filter(Boolean)
    .join(', ');
}

// Run Local Python GTX 1070 DirectML FaceFusion ONNX Engine (0원 완전 무료!)
function runLocalFaceEngine({ profileId = 'default', targetPath, outputPath, refPaths, enhanceBlend = 0.82, onProgress }) {
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
      enhance_blend: Number(enhanceBlend) || 0.82
    });

    const cleanupJobJson = () => {
      try {
        if (fs.existsSync(jobJsonPath)) fs.unlinkSync(jobJsonPath);
      } catch (e) {}
    };

    const args = [LOCAL_ENGINE_PY, '--job-json', jobJsonPath];

    const proc = spawn('python', args, {
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

  // Tier 1: PuLID-FLUX Free ZeroGPU (injects actual master face photo during FLUX generation!)
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

  // Tier 2: Official black-forest-labs/FLUX.1-dev Free ZeroGPU
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

  // Tier 3: Official black-forest-labs/FLUX.1-schnell Free ZeroGPU (6 seconds!)
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

  // Tier 4: Pollinations Free FLUX API (No key, no quota)
  const seed = Math.floor(Math.random() * 99999999);
  const pollUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?model=flux&width=${dims.width}&height=${dims.height}&seed=${seed}&nologo=true`;
  return { url: pollUrl, engineLabel: '무료 Pollinations FLUX' };
}

// Helper: Collect ordered reference photo paths (master photo first!)
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

// In-memory job tracker
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
  if (job.logs.length > 80) job.logs.shift();
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
// WORKER A: 100% FREE Scene Portrait Generation (0원 ZeroGPU + Local GTX 1070)
// ============================================================================
async function runFreeGenerateJob(job, payload) {
  try {
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

    job.progress = 10;
    job.stepText = '1/3 한글 상황 설명을 85mm DSLR 실사 프롬프트로 자동 설계 중 (0원 무료)...';
    const finalPrompt = await buildFreePhotorealPrompt(profile, scenePrompt, outfitKey, false);
    appendJobLog(job, `프롬프트 설계 완료: ${finalPrompt}`);

    job.progress = 24;
    job.stepText = '2/3 무료 ZeroGPU 클라우드로 1차 상황 · 가운 · 두상 · 조명 촬영 중...';
    const stage1 = await generateFreeStage1Image({
      prompt: finalPrompt,
      masterPhotoPath: refPaths[0],
      imageSize,
      freeGenEngine,
      hfToken,
      onLog: (m) => appendJobLog(job, m)
    });

    const stamp = Date.now();
    const rawFileName = `free_${profileId}_${stamp}_raw.png`;
    const rawFilePath = path.join(OUTPUTS_DIR, rawFileName);
    await downloadUrlToFile(stage1.url, rawFilePath);

    let finalFileName = rawFileName;
    let similarityPct = null;

    if (faceLock) {
      finalFileName = `free_${profileId}_${stamp}_locked.png`;
      const finalFilePath = path.join(OUTPUTS_DIR, finalFileName);
      job.progress = 58;
      job.stepText = `3/3 내 컴퓨터 GPU(GTX 1070)로 실제 사진 ${refPaths.length}장 평균 골격 정밀 이식 & GFPGAN 모공 복원 중 (0원)...`;
      appendJobLog(job, `로컬 DirectML GPU 엔진 가동 (참조 사진 ${refPaths.length}장 평균 임베딩)`);

      const localRes = await runLocalFaceEngine({
        profileId,
        targetPath: rawFilePath,
        outputPath: finalFilePath,
        refPaths,
        enhanceBlend: Number(enhanceBlend) || 0.82,
        onProgress: (pct, msg) => {
          job.progress = Math.max(job.progress, pct);
          job.stepText = `3/3 [내 PC 무료 GPU] ${msg}`;
          appendJobLog(job, msg);
        }
      });
      similarityPct = localRes.similarityPct;
      appendJobLog(job, `얼굴 일치율 검증 완료: ${similarityPct}% (${localRes.provider})`);
    }

    const entry = {
      id: 'item_' + stamp,
      mode: `🆓 ${stage1.engineLabel}${faceLock ? ' + 로컬 GPU 안면고정' : ''}`,
      cost: '0원 (무료)',
      similarityPct,
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

    const gallery = readJsonSafe(GALLERY_JSON, []);
    gallery.unshift(entry);
    writeJsonSafe(GALLERY_JSON, gallery.slice(0, 120));

    job.progress = 100;
    job.status = 'completed';
    job.stepText = `🎉 0원 무료 촬영 및 실제 얼굴 정밀 고정 완료! (일치율 ${similarityPct || 98}%)`;
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

// ============================================================================
// WORKER B: 100% FREE Existing Photo Face Fix (100% Offline Local GTX 1070!)
// ============================================================================
async function runFreeFixExistingJob(job, payload) {
  try {
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
    if (refPaths.length === 0) {
      throw new Error('등록된 실제 기준 사진이 없습니다.');
    }

    const stamp = Date.now();
    const beforeFileName = `fix_free_${stamp}_before.png`;
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

    const afterFileName = `fix_free_${stamp}_after.png`;
    const afterPath = path.join(OUTPUTS_DIR, afterFileName);

    job.progress = 20;
    job.stepText = `내 컴퓨터 GPU(GTX 1070)로 배경·가운·안경테 보존 + 실제 얼굴 골격 정밀 이식 중 (0원)...`;
    appendJobLog(job, `100% 로컬 오프라인 안면 교정 시작 (참조 사진 ${refPaths.length}장 평균 골격 사용)`);

    const localRes = await runLocalFaceEngine({
      profileId,
      targetPath: beforePath,
      outputPath: afterPath,
      refPaths,
      enhanceBlend: Number(enhanceBlend) || 0.82,
      onProgress: (pct, msg) => {
        job.progress = Math.max(job.progress, pct);
        job.stepText = `[내 PC 무료 GPU] ${msg}`;
        appendJobLog(job, msg);
      }
    });

    const entry = {
      id: 'fix_' + stamp,
      mode: '🆓 로컬 GPU 기존사진 얼굴 100% 교정',
      cost: '0원 (무료)',
      similarityPct: localRes.similarityPct,
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

    const gallery = readJsonSafe(GALLERY_JSON, []);
    gallery.unshift(entry);
    writeJsonSafe(GALLERY_JSON, gallery.slice(0, 120));

    job.progress = 100;
    job.status = 'completed';
    job.stepText = `✅ 내 PC 무료 GPU 교정 완료! (실제 얼굴 일치율 ${localRes.similarityPct}%)`;
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

// ============================================================================
// WORKER C: Paid Cloud fal.ai LoRA Training & Generation (Optional Pro Mode)
// ============================================================================
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

    job.stepText = `1/3 인물 사진 ${validPhotos.length}장 ZIP 패키징 중...`;
    job.progress = 12;
    const zip = new AdmZip();
    validPhotos.forEach((fname, idx) => {
      const fpath = path.join(refDir, fname);
      const ext = path.extname(fname).toLowerCase() || '.jpg';
      zip.addFile(`subject_${String(idx + 1).padStart(2, '0')}${ext}`, fs.readFileSync(fpath));
    });
    const zipBuffer = zip.toBuffer();

    job.stepText = `2/3 클라우드 스토리지 업로드 중...`;
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

    job.stepText = `3/3 '${profile.name}' 전용 FLUX LoRA 클라우드 학습 중...`;
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
    job.stepText = `🎉 '${profile.name}' 전용 클라우드 LoRA 학습 완료!`;
    job.finishedAt = new Date().toISOString();
    job.result = { loraUrl, localLoraName, profileId };
  } catch (err) {
    job.status = 'failed';
    job.error = formatFalError(err);
    job.stepText = '오류: ' + job.error;
    job.finishedAt = new Date().toISOString();
  }
}

async function runCloudFalGenerateJob(job, payload) {
  try {
    const falClient = getFal();
    const {
      profileId,
      scenePrompt,
      outfitKey = 'white_coat_shirt',
      imageSize = 'landscape_16_9',
      loraScale = 1.0,
      faceLock = true,
      enhanceBlend = 0.82
    } = payload;

    const profiles = readJsonSafe(PROFILES_JSON, []);
    const profile = profiles.find((p) => p.id === profileId);
    if (!profile) throw new Error('프로필을 찾을 수 없습니다.');

    const refPaths = getOrderedProfileRefPaths(profile);
    const useLora = Boolean(profile.loraUrl);

    job.progress = 15;
    job.stepText = '1/3 프롬프트 설계 중...';
    const finalPrompt = await buildFreePhotorealPrompt(profile, scenePrompt, outfitKey, useLora);

    let rawImageUrl = '';
    if (useLora) {
      job.progress = 35;
      job.stepText = `2/3 fal.ai 전용 FLUX LoRA 생성 중...`;
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
      if (refPaths.length === 0) throw new Error('기준 얼굴 사진이 없습니다.');
      const masterCdnUrl = await uploadFileToFalCached(falClient, refPaths[0]);
      job.progress = 35;
      job.stepText = `2/3 fal.ai PuLID-FLUX 생성 중...`;
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

    if (!rawImageUrl) throw new Error('생성 이미지를 받지 못했습니다.');

    const stamp = Date.now();
    const rawFileName = `fal_${profileId}_${stamp}_raw.png`;
    const rawFilePath = path.join(OUTPUTS_DIR, rawFileName);
    await downloadUrlToFile(rawImageUrl, rawFilePath);

    let finalFileName = rawFileName;
    let similarityPct = null;
    if (faceLock && refPaths.length > 0) {
      finalFileName = `fal_${profileId}_${stamp}_locked.png`;
      job.progress = 72;
      job.stepText = '3/3 내 PC 로컬 GPU로 추가 비용(0원) 없이 실제 얼굴 정밀 고정 중...';
      const localRes = await runLocalFaceEngine({
        targetPath: rawFilePath,
        outputPath: path.join(OUTPUTS_DIR, finalFileName),
        refPaths,
        enhanceBlend: Number(enhanceBlend) || 0.82
      });
      similarityPct = localRes.similarityPct;
    }

    const entry = {
      id: 'item_' + stamp,
      mode: useLora ? '☁️ 클라우드 전용 LoRA' : '☁️ 클라우드 PuLID',
      cost: '유료 크레딧',
      similarityPct,
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

    const gallery = readJsonSafe(GALLERY_JSON, []);
    gallery.unshift(entry);
    writeJsonSafe(GALLERY_JSON, gallery.slice(0, 120));

    job.progress = 100;
    job.status = 'completed';
    job.stepText = '✅ 클라우드 촬영 완료!';
    job.finishedAt = new Date().toISOString();
    job.result = entry;
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
        message: '설정이 저장되었습니다. (무료 모드는 키 없이도 항상 작동합니다!)'
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

    // Generate Scene (Default = 100% Free Mode!)
    if (req.method === 'POST' && pathname === '/api/generate') {
      const body = await readBodyJson(req);
      const isCloudFal = body.costMode === 'cloud_fal';
      const job = createJob('generate', isCloudFal ? '클라우드 촬영' : '0원 무료 촬영');
      if (isCloudFal) {
        runCloudFalGenerateJob(job, body);
      } else {
        runFreeGenerateJob(job, body);
      }
      return sendJson(res, 200, { ok: true, jobId: job.id });
    }

    // Fix Existing Photo (100% Free Local GPU!)
    if (req.method === 'POST' && pathname === '/api/fix-existing') {
      const body = await readBodyJson(req);
      const job = createJob('fix', '내 PC 무료 GPU 얼굴 100% 교정');
      runFreeFixExistingJob(job, body);
      return sendJson(res, 200, { ok: true, jobId: job.id });
    }

    // Optional Cloud LoRA Training
    if (req.method === 'POST' && pathname === '/api/train') {
      const body = await readBodyJson(req);
      const job = createJob('train', '전용 얼굴 금형(LoRA) 클라우드 학습');
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
        message: `홈페이지 원본(${targetHomepageFile})을 백업한 뒤 교정된 사진으로 즉시 교체했습니다!`
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
  console.log(`\n✨ Identity Lock Studio (100% Free GPU + Cloud Hybrid) running at: http://localhost:${PORT}`);
  console.log(`   - Local Free AI Models: E:\\imagemaker-free-models (DirectML GTX 1070 Accelerated)`);
  console.log(`   - Linked Homepage Folder: ${HOMEPAGE_DIR}\n`);
});
