const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const https = require('https');
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

const HOMEPAGE_DIR = fs.existsSync(path.resolve(ROOT_DIR, '..', 'homepage'))
  ? path.resolve(ROOT_DIR, '..', 'homepage')
  : path.resolve(ROOT_DIR, '..', '바른한의원 홈페이지', 'homepage');

// Ensure directories exist
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

// Auto-seed default profile ("안정위 대표원장") with real photos from homepage folder if first run
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
      baseTraits: 'a Korean male traditional Korean medicine doctor in his late 30s, wearing thin gold-rimmed rectangular glasses, neat natural black hair parted slightly, authentic Korean skin texture',
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
  return { falKey };
}

function maskKey(key) {
  if (!key) return '';
  if (key.length <= 10) return '****';
  return key.slice(0, 6) + '••••••••' + key.slice(-4);
}

function getFal() {
  const { falKey } = getSettings();
  if (!falKey) {
    throw new Error('상단 [🔑 API 키 설정]에 fal.ai API 키(FAL_KEY)를 먼저 입력해 주세요.');
  }
  return createFalClient({ credentials: falKey });
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

// Upload local file to fal CDN with SHA-256 caching
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

// Download remote URL to local disk
function downloadUrlToFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const request = (targetUrl, redirectsLeft = 5) => {
      const mod = targetUrl.startsWith('https') ? https : http;
      mod.get(targetUrl, (res) => {
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
      }).on('error', reject);
    };
    request(url);
  });
}

// Scan existing director images in Bareun Homepage folder
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

// Built-in Korean -> English photography fallback translator + LLM director
const OUTFIT_MAP = {
  white_coat_shirt: 'wearing a crisp tailored white medical doctor coat over a neat light blue-and-white striped dress shirt',
  white_coat_tie: 'wearing a tailored white doctor coat over a crisp white dress shirt and understated dark navy silk tie',
  modern_hanbok_gown: 'wearing a refined charcoal-navy modern Korean medical director coat with minimalist clean collar',
  navy_suit: 'wearing a bespoke dark navy formal suit with crisp white dress shirt for an academic medical conference',
  scrub_coat: 'wearing a clean dark-navy clinical scrub top underneath an open white medical doctor coat',
  free: ''
};

function fallbackKoreanToEnglishScene(korText) {
  let s = String(korText || '').trim();
  const dict = [
    ['맥진', 'gently taking radial pulse diagnosis on a patient wrist across a warm wooden consultation desk'],
    ['진료실', 'inside a sunlit high-end Korean medicine clinic consultation room with warm oak wood shelves and soft window blinds'],
    ['초음파', 'carefully examining a musculoskeletal ultrasound monitor screen in a modern diagnostic clinic room'],
    ['추나', 'performing gentle orthopedic Chuna spinal alignment therapy in a serene modern treatment room'],
    ['탕전실', 'inspecting premium herbal medicine ingredients and deer antler slices in a spotless glass-walled herbal decoction laboratory'],
    ['녹용', 'holding and inspecting premium dried deer antler slices and clean medicinal herbs on a wooden tray'],
    ['약재', 'carefully examining authentic herbal medicine ingredients with warm focused expression'],
    ['상담', 'explaining a personalized treatment plan warmly across a consultation desk with gentle confident smile'],
    ['강연', 'standing at a modern medical conference podium delivering an academic lecture with confident poise'],
    ['논문', 'reviewing clinical research papers and medical textbooks at a warm sunlit wooden desk'],
    ['팔짱', 'standing with arms gently crossed in a confident, trustworthy medical director portrait pose'],
    ['미소', 'with a warm, reassuring, gentle smile'],
    ['진지', 'with a calm, focused, trustworthy expression'],
    ['정면', 'facing the camera directly, eye-level medium close-up portrait'],
    ['측면', 'subtle 30-degree three-quarter angle portrait'],
    ['햇살', 'soft golden morning sunlight filtering through wooden window blinds']
  ];
  const matched = [];
  for (const [k, eng] of dict) {
    if (s.includes(k)) matched.push(eng);
  }
  if (matched.length > 0) {
    return matched.join(', ');
  }
  return s;
}

async function buildPhotorealPrompt(falClient, profile, scenePrompt, outfitKey) {
  const trigger = profile.triggerWord || 'OHWX_PERSON';
  const baseTraits = profile.baseTraits || 'Korean male doctor, authentic natural skin texture';
  const outfitDesc = OUTFIT_MAP[outfitKey] || '';
  const rawScene = String(scenePrompt || '').trim();
  const hasKorean = /[가-힣]/.test(rawScene);

  let englishScene = rawScene;
  if (hasKorean) {
    try {
      const llmRes = await falClient.subscribe('fal-ai/any-llm', {
        input: {
          model: 'google/gemini-2.5-flash',
          system_prompt:
            'You convert Korean portrait/scene descriptions into concise, vivid, photorealistic English photography prompts (2-3 sentences max). Describe ONLY the environment, pose, camera framing, lighting, and expression. Do NOT invent random facial features that contradict the subject. Output ONLY the English description without quotes or markdown.',
          prompt: `Convert this Korean portrait scene into a realistic Canon EOS R5 85mm f/1.8 editorial photo scene description: "${rawScene}"`
        }
      });
      const outText = (llmRes && llmRes.data && (llmRes.data.output || llmRes.data.text)) || '';
      if (outText && outText.trim().length > 10) {
        englishScene = outText.trim().replace(/^["']|["']$/g, '');
      } else {
        englishScene = fallbackKoreanToEnglishScene(rawScene);
      }
    } catch (e) {
      englishScene = fallbackKoreanToEnglishScene(rawScene);
    }
  }

  const parts = [
    `Candid editorial medium portrait photograph of ${trigger}, ${baseTraits}`,
    outfitDesc,
    englishScene,
    'Shot on Canon EOS R5 with RF 85mm f/1.8 lens, natural soft key lighting, authentic human skin pores and natural micro-texture, crisp eyeglass reflection clarity, realistic head-to-shoulder anatomy, natural depth of field, zero CGI, zero plastic skin'
  ].filter(Boolean);

  return parts.join(', ');
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

// Parse JSON body up to 150MB
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

// Async Worker 1: Train Personal FLUX Portrait LoRA
async function runLoraTrainingJob(job, { profileId, trainerType, steps }) {
  try {
    const falClient = getFal();
    const profiles = readJsonSafe(PROFILES_JSON, []);
    const profile = profiles.find((p) => p.id === profileId);
    if (!profile) throw new Error('선택한 인물 프로필을 찾을 수 없습니다.');

    const refDir = path.join(PROFILES_DIR, profileId, 'refs');
    const validPhotos = (profile.photos || []).filter((f) => fs.existsSync(path.join(refDir, f)));
    if (validPhotos.length < 4) {
      throw new Error(`전용 LoRA 학습을 위해 최소 4장 이상(권장 15~20장)의 실제 얼굴 사진을 등록해 주세요. (현재 ${validPhotos.length}장)`);
    }

    job.stepText = `1/3 인물 사진 ${validPhotos.length}장을 학습용 압축파일(ZIP)로 패키징 중...`;
    job.progress = 12;
    appendJobLog(job, `${profile.name} 사진 ${validPhotos.length}장 ZIP 압축 시작`);

    const zip = new AdmZip();
    validPhotos.forEach((fname, idx) => {
      const fpath = path.join(refDir, fname);
      const ext = path.extname(fname).toLowerCase() || '.jpg';
      const cleanName = `subject_${String(idx + 1).padStart(2, '0')}${ext}`;
      zip.addFile(cleanName, fs.readFileSync(fpath));
    });
    const zipBuffer = zip.toBuffer();

    job.stepText = `2/3 보안 클라우드 스토리지에 사진 데이터셋(${(zipBuffer.length / 1024 / 1024).toFixed(1)}MB) 업로드 중...`;
    job.progress = 24;
    const zipBlob = new Blob([zipBuffer], { type: 'application/zip' });
    const zipUrl = await falClient.storage.upload(zipBlob);
    appendJobLog(job, `데이터셋 업로드 완료 -> LoRA 트레이너 호출 시작`);

    const useFast = trainerType === 'fast';
    const endpoint = useFast ? 'fal-ai/flux-lora-fast-training' : 'fal-ai/flux-lora-portrait-trainer';
    const numSteps = Math.max(500, Math.min(2500, Number(steps) || 1000));
    const trigger = profile.triggerWord || 'AHNJUNGWEI_PERSON';

    const trainInput = useFast
      ? {
          images_data_url: zipUrl,
          trigger_word: trigger,
          is_style: false,
          steps: numSteps,
          create_masks: true
        }
      : {
          images_data_url: zipUrl,
          trigger_phrase: trigger,
          steps: numSteps,
          multiresolution_training: true,
          subject_crop: true,
          create_masks: true
        };

    job.stepText = `3/3 '${profile.name}' 전용 얼굴 금형(LoRA) 정밀 학습 중... (${useFast ? '초고속 약 2분' : '고정밀 인물모드 약 4~8분'})`;
    job.progress = 35;

    const result = await falClient.subscribe(endpoint, {
      input: trainInput,
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === 'IN_QUEUE') {
          job.stepText = `클라우드 GPU 대기열 배정 중... (순번: ${update.queue_position ?? 0})`;
        } else if (update.status === 'IN_PROGRESS') {
          job.progress = Math.min(88, job.progress + 3);
          if (Array.isArray(update.logs)) {
            update.logs.forEach((l) => {
              if (l && l.message) appendJobLog(job, l.message);
            });
          }
        }
      }
    });

    const loraFileObj = result && result.data && result.data.diffusers_lora_file;
    const loraUrl = loraFileObj && loraFileObj.url;
    if (!loraUrl) {
      throw new Error('학습 응답에서 LoRA 가중치 URL을 받지 못했습니다.');
    }

    // Download local backup of .safetensors
    job.stepText = '학습 완료! 내 PC에 전용 LoRA 파일(.safetensors) 영구 백업 저장 중...';
    job.progress = 93;
    const localLoraName = `${profileId}_${Date.now()}.safetensors`;
    const localLoraPath = path.join(LORAS_DIR, localLoraName);
    try {
      await downloadUrlToFile(loraUrl, localLoraPath);
      appendJobLog(job, `로컬 영구 백업 완료: data/loras/${localLoraName}`);
    } catch (dlErr) {
      appendJobLog(job, `클라우드 URL 저장 완료 (로컬 백업 생략: ${dlErr.message})`);
    }

    // Save to profiles.json
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
    job.stepText = `🎉 '${profile.name}' 전용 LoRA 얼굴 모델 학습 및 영구 등록 완료!`;
    job.finishedAt = new Date().toISOString();
    job.result = { loraUrl, localLoraName, profileId };
  } catch (err) {
    job.status = 'failed';
    job.error = err.message || String(err);
    job.stepText = '오류: ' + job.error;
    job.finishedAt = new Date().toISOString();
    appendJobLog(job, 'ERROR: ' + job.error);
  }
}

// Async Worker 2: Generate Situation Portrait (LoRA or PuLID + Optional 2nd-Pass Face Lock)
async function runGenerateJob(job, payload) {
  try {
    const falClient = getFal();
    const {
      profileId,
      scenePrompt,
      outfitKey = 'white_coat_shirt',
      imageSize = 'landscape_16_9',
      loraScale = 1.0,
      engineMode = 'auto',
      faceLock = true,
      codeformerFidelity = 0.78
    } = payload;

    const profiles = readJsonSafe(PROFILES_JSON, []);
    const profile = profiles.find((p) => p.id === profileId);
    if (!profile) throw new Error('선택된 인물 프로필이 없습니다.');

    const refDir = path.join(PROFILES_DIR, profileId, 'refs');
    const masterFileName = profile.masterPhoto || (profile.photos && profile.photos[0]) || '';
    const masterLocalPath = masterFileName ? path.join(refDir, masterFileName) : '';
    const hasMasterPhoto = Boolean(masterLocalPath && fs.existsSync(masterLocalPath));

    const useLora = engineMode === 'lora' || (engineMode === 'auto' && Boolean(profile.loraUrl));
    if (engineMode === 'lora' && !profile.loraUrl) {
      throw new Error('아직 전용 LoRA가 학습되지 않았습니다. [전용 LoRA 등록] 탭에서 학습하거나 엔진 모드를 [자동 / PuLID 무학습]으로 선택해 주세요.');
    }
    if (!useLora && !hasMasterPhoto) {
      throw new Error('인물 기준 사진이 없습니다. 먼저 실제 얼굴 사진을 최소 1장 등록해 주세요.');
    }

    job.progress = 12;
    job.stepText = '1/4 한글 상황 설명을 85mm 실사 스튜디오 촬영 프롬프트로 설계 중...';
    const finalPrompt = await buildPhotorealPrompt(falClient, profile, scenePrompt, outfitKey);
    appendJobLog(job, `설계된 프롬프트: ${finalPrompt}`);

    let masterCdnUrl = '';
    if (hasMasterPhoto && (!useLora || faceLock)) {
      job.progress = 22;
      job.stepText = '기준 정면 얼굴 사진 보안 캐시 동기화 중...';
      masterCdnUrl = await uploadFileToFalCached(falClient, masterLocalPath);
    }

    let rawImageUrl = '';
    if (useLora) {
      job.progress = 35;
      job.stepText = `2/4 '${profile.name}' 전용 FLUX LoRA 모델로 상황·조명·체형 생성 중...`;
      appendJobLog(job, `fal-ai/flux-lora 호출 (scale=${loraScale}, size=${imageSize})`);
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
        },
        logs: true,
        onQueueUpdate: (u) => {
          if (u.status === 'IN_PROGRESS') job.progress = Math.min(60, job.progress + 4);
        }
      });
      rawImageUrl = genRes?.data?.images?.[0]?.url || '';
    } else {
      job.progress = 35;
      job.stepText = `2/4 '${profile.name}' 기준 사진으로 PuLID-FLUX 무학습 상황 촬영 중...`;
      appendJobLog(job, `fal-ai/flux-pulid 호출 (size=${imageSize})`);
      const genRes = await falClient.subscribe('fal-ai/flux-pulid', {
        input: {
          prompt: finalPrompt,
          reference_image_url: masterCdnUrl,
          image_size: imageSize,
          num_inference_steps: 28,
          guidance_scale: 3.5,
          enable_safety_checker: false
        },
        logs: true,
        onQueueUpdate: (u) => {
          if (u.status === 'IN_PROGRESS') job.progress = Math.min(60, job.progress + 4);
        }
      });
      rawImageUrl = genRes?.data?.images?.[0]?.url || genRes?.data?.image?.url || '';
    }

    if (!rawImageUrl) {
      throw new Error('1차 상황 이미지 생성 결과를 받지 못했습니다.');
    }

    const stamp = Date.now();
    const rawFileName = `gen_${profileId}_${stamp}_raw.png`;
    const rawFilePath = path.join(OUTPUTS_DIR, rawFileName);
    await downloadUrlToFile(rawImageUrl, rawFilePath);

    let finalFileName = rawFileName;
    if (faceLock && masterCdnUrl) {
      job.progress = 68;
      job.stepText = '3/4 [Face Lock] 원장님 실제 정면 사진 이목구비 랜드마크 정밀 매칭 중...';
      appendJobLog(job, 'fal-ai/face-swap 정밀 안면 고정 실행');
      const swapRes = await falClient.subscribe('fal-ai/face-swap', {
        input: {
          base_image_url: rawImageUrl,
          swap_image_url: masterCdnUrl
        }
      });
      const swappedUrl = swapRes?.data?.image?.url || rawImageUrl;

      job.progress = 84;
      job.stepText = '4/4 [CodeFormer] 실제 피부 모공·안경테·조명 경계 초고화질 복원 중...';
      appendJobLog(job, `fal-ai/codeformer 피부결·해상도 복원 실행 (fidelity=${codeformerFidelity})`);
      const cfRes = await falClient.subscribe('fal-ai/codeformer', {
        input: {
          image_url: swappedUrl,
          fidelity: Number(codeformerFidelity) || 0.78,
          background_enhance: true,
          face_upsample: true,
          only_center_face: false
        }
      });
      const restoredUrl = cfRes?.data?.image?.url || swappedUrl;
      finalFileName = `gen_${profileId}_${stamp}_locked.png`;
      await downloadUrlToFile(restoredUrl, path.join(OUTPUTS_DIR, finalFileName));
    }

    const entry = {
      id: 'item_' + stamp,
      mode: useLora ? 'FLUX 전용 LoRA' : 'PuLID 무학습',
      faceLocked: Boolean(faceLock && masterCdnUrl),
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
    job.stepText = '✅ 촬영 및 얼굴 정밀 고정 완료!';
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

// Async Worker 3: Fix Existing Homepage / Uploaded Photo with Exact Real Face
async function runFixExistingJob(job, payload) {
  try {
    const falClient = getFal();
    const {
      profileId,
      sourceType = 'homepage',
      homepageFile = '',
      uploadDataUrl = '',
      codeformerFidelity = 0.78,
      backgroundEnhance = true
    } = payload;

    const profiles = readJsonSafe(PROFILES_JSON, []);
    const profile = profiles.find((p) => p.id === profileId);
    if (!profile) throw new Error('선택된 인물 프로필이 없습니다.');

    const refDir = path.join(PROFILES_DIR, profileId, 'refs');
    const masterFileName = profile.masterPhoto || (profile.photos && profile.photos[0]) || '';
    const masterLocalPath = masterFileName ? path.join(refDir, masterFileName) : '';
    if (!masterLocalPath || !fs.existsSync(masterLocalPath)) {
      throw new Error('기준 얼굴 사진이 없습니다. 먼저 원장님 실제 사진을 등록해 주세요.');
    }

    const stamp = Date.now();
    const beforeFileName = `fix_${stamp}_before.png`;
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
      if (!match) throw new Error('교정할 대상 사진을 업로드해 주세요.');
      fs.writeFileSync(beforePath, Buffer.from(match[1], 'base64'));
    }

    job.progress = 20;
    job.stepText = '1/3 대상 이미지 및 원장님 실제 기준 사진 업로드 중...';
    const [targetCdnUrl, masterCdnUrl] = await Promise.all([
      uploadFileToFalCached(falClient, beforePath),
      uploadFileToFalCached(falClient, masterLocalPath)
    ]);

    job.progress = 50;
    job.stepText = '2/3 배경·가운·포즈는 100% 보존하고 실제 얼굴 골격·이목구비 정밀 이식 중...';
    appendJobLog(job, 'fal-ai/face-swap 실행');
    const swapRes = await falClient.subscribe('fal-ai/face-swap', {
      input: {
        base_image_url: targetCdnUrl,
        swap_image_url: masterCdnUrl
      }
    });
    const swappedUrl = swapRes?.data?.image?.url;
    if (!swappedUrl) throw new Error('얼굴 매핑 결과를 받지 못했습니다.');

    job.progress = 78;
    job.stepText = '3/3 CodeFormer로 피부 결·안경테 선명도·조명 톤 자연스럽게 복원 중...';
    appendJobLog(job, `fal-ai/codeformer 실행 (fidelity=${codeformerFidelity})`);
    const cfRes = await falClient.subscribe('fal-ai/codeformer', {
      input: {
        image_url: swappedUrl,
        fidelity: Number(codeformerFidelity) || 0.78,
        background_enhance: Boolean(backgroundEnhance),
        face_upsample: true,
        only_center_face: false
      }
    });
    const restoredUrl = cfRes?.data?.image?.url || swappedUrl;

    const afterFileName = `fix_${stamp}_after.png`;
    await downloadUrlToFile(restoredUrl, path.join(OUTPUTS_DIR, afterFileName));

    const entry = {
      id: 'fix_' + stamp,
      mode: '기존 사진 얼굴 100% 교정',
      faceLocked: true,
      profileId,
      profileName: profile.name,
      scenePrompt: sourceType === 'homepage' ? `[홈페이지 파일 교정] ${homepageFile}` : '[내 PC 사진 얼굴 교정]',
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
    job.stepText = '✅ 기존 사진 얼굴 100% 정밀 교정 완료!';
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
    // Static UI
    if (req.method === 'GET' && (pathname === '/' || pathname === '/index.html')) {
      const htmlPath = path.join(ROOT_DIR, 'index.html');
      const content = fs.readFileSync(htmlPath);
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
      return res.end(content);
    }

    // Serve profile reference photos
    if (req.method === 'GET' && pathname.startsWith('/files/profiles/')) {
      const parts = pathname.replace('/files/profiles/', '').split('/');
      const profileId = path.basename(parts[0] || '');
      const fname = path.basename(parts[1] || '');
      const fpath = path.join(PROFILES_DIR, profileId, 'refs', fname);
      if (!fs.existsSync(fpath)) {
        res.writeHead(404);
        return res.end('Not found');
      }
      res.writeHead(200, { 'Content-Type': mimeFromExt(fpath), 'Cache-Control': 'public, max-age=3600' });
      return fs.createReadStream(fpath).pipe(res);
    }

    // Serve output gallery files
    if (req.method === 'GET' && pathname.startsWith('/files/outputs/')) {
      const fname = path.basename(pathname.replace('/files/outputs/', ''));
      const fpath = path.join(OUTPUTS_DIR, fname);
      if (!fs.existsSync(fpath)) {
        res.writeHead(404);
        return res.end('Not found');
      }
      res.writeHead(200, { 'Content-Type': mimeFromExt(fpath), 'Cache-Control': 'public, max-age=3600' });
      return fs.createReadStream(fpath).pipe(res);
    }

    // Serve homepage preview files
    if (req.method === 'GET' && pathname.startsWith('/files/homepage/')) {
      const fname = path.basename(pathname.replace('/files/homepage/', ''));
      const fpath = path.join(HOMEPAGE_DIR, fname);
      if (!fs.existsSync(fpath)) {
        res.writeHead(404);
        return res.end('Not found');
      }
      res.writeHead(200, { 'Content-Type': mimeFromExt(fpath), 'Cache-Control': 'no-cache' });
      return fs.createReadStream(fpath).pipe(res);
    }

    // API: Full Studio State
    if (req.method === 'GET' && pathname === '/api/state') {
      const { falKey } = getSettings();
      const profiles = ensureDefaultProfile();
      const gallery = readJsonSafe(GALLERY_JSON, []);
      const homepageImages = listHomepageDirectorImages();
      return sendJson(res, 200, {
        ok: true,
        hasFalKey: Boolean(falKey),
        maskedFalKey: maskKey(falKey),
        profiles,
        gallery,
        homepageImages
      });
    }

    // API: Save FAL_KEY
    if (req.method === 'POST' && pathname === '/api/settings') {
      const body = await readBodyJson(req);
      const current = readJsonSafe(SETTINGS_PATH, {});
      if (typeof body.falKey === 'string') {
        current.falKey = body.falKey.trim();
      }
      writeJsonSafe(SETTINGS_PATH, current);
      return sendJson(res, 200, {
        ok: true,
        hasFalKey: Boolean(current.falKey),
        maskedFalKey: maskKey(current.falKey),
        message: current.falKey ? 'API 키가 내 PC에 안전하게 저장되었습니다.' : 'API 키가 초기화되었습니다.'
      });
    }

    // API: Create New Person Profile
    if (req.method === 'POST' && pathname === '/api/profiles') {
      const body = await readBodyJson(req);
      const name = String(body.name || '').trim();
      if (!name) return sendJson(res, 400, { ok: false, error: '인물 이름을 입력해 주세요.' });

      const id = 'person_' + Date.now().toString(36);
      const cleanToken = (body.triggerWord || 'PERSON_' + id.slice(-4).toUpperCase())
        .toUpperCase()
        .replace(/[^A-Z0-9_]/g, '');

      fs.mkdirSync(path.join(PROFILES_DIR, id, 'refs'), { recursive: true });
      const newProfile = {
        id,
        name,
        triggerWord: cleanToken || 'CUSTOM_PERSON',
        baseTraits: String(body.baseTraits || 'Korean person, natural realistic skin texture').trim(),
        masterPhoto: '',
        photos: [],
        loraUrl: String(body.loraUrl || '').trim(),
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

    // API: Update Profile Metadata / Master Photo / External LoRA URL
    if (req.method === 'PUT' && pathname.startsWith('/api/profiles/')) {
      const id = path.basename(pathname.replace('/api/profiles/', ''));
      const body = await readBodyJson(req);
      const profiles = readJsonSafe(PROFILES_JSON, []);
      const p = profiles.find((x) => x.id === id);
      if (!p) return sendJson(res, 404, { ok: false, error: '인물 프로필을 찾을 수 없습니다.' });

      if (typeof body.name === 'string' && body.name.trim()) p.name = body.name.trim();
      if (typeof body.triggerWord === 'string' && body.triggerWord.trim()) p.triggerWord = body.triggerWord.trim();
      if (typeof body.baseTraits === 'string') p.baseTraits = body.baseTraits.trim();
      if (typeof body.loraUrl === 'string') p.loraUrl = body.loraUrl.trim();
      if (typeof body.masterPhoto === 'string') p.masterPhoto = body.masterPhoto.trim();

      writeJsonSafe(PROFILES_JSON, profiles);
      return sendJson(res, 200, { ok: true, profile: p, profiles });
    }

    // API: Upload Reference Photos to Profile
    if (req.method === 'POST' && /^\/api\/profiles\/[^/]+\/photos$/.test(pathname)) {
      const id = pathname.split('/')[3];
      const body = await readBodyJson(req);
      const files = Array.isArray(body.files) ? body.files : [];
      if (files.length === 0) return sendJson(res, 400, { ok: false, error: '업로드할 사진이 없습니다.' });

      const profiles = readJsonSafe(PROFILES_JSON, []);
      const p = profiles.find((x) => x.id === id);
      if (!p) return sendJson(res, 404, { ok: false, error: '프로필을 찾을 수 없습니다.' });

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

    // API: Delete Reference Photo from Profile
    if (req.method === 'DELETE' && /^\/api\/profiles\/[^/]+\/photos\/[^/]+$/.test(pathname)) {
      const segs = pathname.split('/');
      const id = segs[3];
      const fname = path.basename(segs[5]);
      const profiles = readJsonSafe(PROFILES_JSON, []);
      const p = profiles.find((x) => x.id === id);
      if (!p) return sendJson(res, 404, { ok: false, error: '프로필을 찾을 수 없습니다.' });

      const fpath = path.join(PROFILES_DIR, id, 'refs', fname);
      if (fs.existsSync(fpath)) fs.unlinkSync(fpath);
      p.photos = (p.photos || []).filter((x) => x !== fname);
      if (p.masterPhoto === fname) {
        p.masterPhoto = p.photos[0] || '';
      }
      writeJsonSafe(PROFILES_JSON, profiles);
      return sendJson(res, 200, { ok: true, profile: p, profiles });
    }

    // API: Start LoRA Training Job
    if (req.method === 'POST' && pathname === '/api/train') {
      const body = await readBodyJson(req);
      const job = createJob('train', '전용 얼굴 금형(LoRA) 학습');
      runLoraTrainingJob(job, body);
      return sendJson(res, 200, { ok: true, jobId: job.id });
    }

    // API: Start Scene Portrait Generation Job
    if (req.method === 'POST' && pathname === '/api/generate') {
      const body = await readBodyJson(req);
      const job = createJob('generate', '상황 연출 사진 촬영');
      runGenerateJob(job, body);
      return sendJson(res, 200, { ok: true, jobId: job.id });
    }

    // API: Start Existing Homepage Photo Face-Fix Job
    if (req.method === 'POST' && pathname === '/api/fix-existing') {
      const body = await readBodyJson(req);
      const job = createJob('fix', '기존 사진 얼굴 100% 정밀 교정');
      runFixExistingJob(job, body);
      return sendJson(res, 200, { ok: true, jobId: job.id });
    }

    // API: Apply Fixed Output Directly to Bareun Homepage (with automatic backup)
    if (req.method === 'POST' && pathname === '/api/apply-to-homepage') {
      const body = await readBodyJson(req);
      const outputFileName = path.basename(String(body.outputFileName || ''));
      const targetHomepageFile = path.basename(String(body.targetHomepageFile || ''));
      if (!outputFileName || !targetHomepageFile) {
        return sendJson(res, 400, { ok: false, error: '원본 파일명과 결과 파일명이 필요합니다.' });
      }
      const srcOut = path.join(OUTPUTS_DIR, outputFileName);
      const dstHome = path.join(HOMEPAGE_DIR, targetHomepageFile);
      if (!fs.existsSync(srcOut)) return sendJson(res, 404, { ok: false, error: '교정 결과 파일을 찾을 수 없습니다.' });
      if (!fs.existsSync(HOMEPAGE_DIR)) return sendJson(res, 404, { ok: false, error: '홈페이지 폴더를 찾을 수 없습니다.' });

      const backupDir = path.join(HOMEPAGE_DIR, '_backup_director_faces');
      fs.mkdirSync(backupDir, { recursive: true });
      if (fs.existsSync(dstHome)) {
        const bkName = `${Date.now()}_${targetHomepageFile}`;
        fs.copyFileSync(dstHome, path.join(backupDir, bkName));
      }
      fs.copyFileSync(srcOut, dstHome);
      return sendJson(res, 200, {
        ok: true,
        message: `홈페이지 원본(${targetHomepageFile})을 백업한 뒤 새 이미지로 즉시 교체했습니다!`
      });
    }

    // API: Delete Gallery Item
    if (req.method === 'DELETE' && pathname.startsWith('/api/gallery/')) {
      const id = path.basename(pathname.replace('/api/gallery/', ''));
      let gallery = readJsonSafe(GALLERY_JSON, []);
      gallery = gallery.filter((g) => g.id !== id);
      writeJsonSafe(GALLERY_JSON, gallery);
      return sendJson(res, 200, { ok: true, gallery });
    }

    // API: Poll Job Status
    if (req.method === 'GET' && pathname.startsWith('/api/jobs/')) {
      const jobId = path.basename(pathname.replace('/api/jobs/', ''));
      const job = activeJobs.get(jobId);
      if (!job) return sendJson(res, 404, { ok: false, error: '작업을 찾을 수 없습니다.' });
      return sendJson(res, 200, { ok: true, job });
    }

    res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ ok: false, error: 'Not found' }));
  } catch (err) {
    sendJson(res, 500, { ok: false, error: err.message || '서버 내부 오류' });
  }
});

server.listen(PORT, () => {
  console.log(`\n✨ Identity Lock Portrait Studio running at: http://localhost:${PORT}`);
  console.log(`   - Default Profile Seeded: 안정위 대표원장 (${PROFILES_DIR})`);
  console.log(`   - Linked Homepage Folder: ${HOMEPAGE_DIR}\n`);
});
