const fs = require('fs');
const path = require('path');
const createDracoModule = require('./draco/draco_decoder.js');

async function buildDonginSurfaceData() {
  const dm = await createDracoModule();
  const buf = fs.readFileSync(path.join(__dirname, 'models', 'skinMB2.glb'));
  const jsonLen = buf.readUInt32LE(12);
  const binOffset = 20 + jsonLen + 8;
  const gltf = JSON.parse(buf.toString('utf8', 20, 20 + jsonLen));
  const bv = gltf.bufferViews[0];
  const dracoBytes = new Int8Array(buf.buffer, buf.byteOffset + binOffset + (bv.byteOffset || 0), bv.byteLength);

  const decoder = new dm.Decoder();
  const dbuf = new dm.DecoderBuffer();
  dbuf.Init(dracoBytes, dracoBytes.length);
  const mesh = new dm.Mesh();
  decoder.DecodeBufferToMesh(dbuf, mesh);

  const posAttr = decoder.GetAttributeByUniqueId(mesh, 0);
  const normAttr = decoder.GetAttributeByUniqueId(mesh, 1);
  const numPoints = mesh.num_points();
  const posArr = new dm.DracoFloat32Array();
  const normArr = new dm.DracoFloat32Array();
  decoder.GetAttributeFloatForAllPoints(mesh, posAttr, posArr);
  decoder.GetAttributeFloatForAllPoints(mesh, normAttr, normArr);

  function snapPoint(tx, ty, tz, opts = {}) {
    const dir = opts.dir || 'any';
    const xMin = opts.xMin !== undefined ? opts.xMin : -2.0;
    const xMax = opts.xMax !== undefined ? opts.xMax : 2.0;
    const offset = opts.offset !== undefined ? opts.offset : 0.0055;

    let bestIdx = -1;
    let bestScore = 1e9;

    for (let pass = 0; pass < 2; pass++) {
      const yTol = pass === 0 ? 0.065 : 0.18;
      for (let i = 0; i < numPoints; i++) {
        const y = posArr.GetValue(i * 3 + 1);
        if (Math.abs(y - ty) > yTol) continue;
        const x = posArr.GetValue(i * 3);
        if (x < xMin || x > xMax) continue;
        const z = posArr.GetValue(i * 3 + 2);
        const nx = normArr.GetValue(i * 3);
        const ny = normArr.GetValue(i * 3 + 1);
        const nz = normArr.GetValue(i * 3 + 2);

        if (pass === 0) {
          if (dir === 'front' && nz < 0.12) continue;
          if (dir === 'back' && nz > -0.12) continue;
          if (dir === 'outerR' && nx < 0.12) continue;
          if (dir === 'innerR' && nx > -0.05) continue;
          if (dir === 'top' && ny < 0.25) continue;
          if (dir === 'bottom' && ny > -0.15) continue;
        }

        const dx = x - tx;
        const dy = (y - ty) * 2.4;
        const dz = z - tz;
        const dSq = dx * dx + dy * dy + dz * dz;
        if (dSq < bestScore) {
          bestScore = dSq;
          bestIdx = i;
        }
      }
      if (bestIdx !== -1) break;
    }

    const vx = posArr.GetValue(bestIdx * 3);
    const vy = posArr.GetValue(bestIdx * 3 + 1);
    const vz = posArr.GetValue(bestIdx * 3 + 2);
    const nx = normArr.GetValue(bestIdx * 3);
    const ny = normArr.GetValue(bestIdx * 3 + 1);
    const nz = normArr.GetValue(bestIdx * 3 + 2);

    return [
      +(vx + nx * offset).toFixed(4),
      +(vy + ny * offset).toFixed(4),
      +(vz + nz * offset).toFixed(4)
    ];
  }

  function traceSnappedCurve(waypoints, opts = {}, subdiv = 4) {
    const dense = [];
    for (let i = 0; i < waypoints.length - 1; i++) {
      const a = waypoints[i];
      const b = waypoints[i + 1];
      const steps = i === waypoints.length - 2 ? subdiv + 1 : subdiv;
      for (let s = 0; s < steps; s++) {
        const t = i === waypoints.length - 2 ? s / (steps - 1) : s / steps;
        const ix = a[0] + (b[0] - a[0]) * t;
        const iy = a[1] + (b[1] - a[1]) * t;
        const iz = a[2] + (b[2] - a[2]) * t;
        dense.push(snapPoint(ix, iy, iz, opts));
      }
    }
    // Light smoothing pass + re-snap to ensure smooth adherence to skin contour
    const smoothed = dense.map((pt, idx) => {
      if (idx === 0 || idx === dense.length - 1) return pt;
      const prev = dense[idx - 1];
      const next = dense[idx + 1];
      const mx = prev[0] * 0.25 + pt[0] * 0.5 + next[0] * 0.25;
      const my = prev[1] * 0.25 + pt[1] * 0.5 + next[1] * 0.25;
      const mz = prev[2] * 0.25 + pt[2] * 0.5 + next[2] * 0.25;
      return snapPoint(mx, my, mz, opts);
    });
    return smoothed;
  }

  function mirrorX(points) {
    return points.map(p => [+(-p[0]).toFixed(4), p[1], p[2]]);
  }

  // ============================================================================
  // 14 MERIDIANS (십이경맥 12경맥 + 독맥·임맥 기경팔맥) SURFACE-SNAPPED PATHWAYS
  // ============================================================================
  const meridians = [
    {
      id: 'GV',
      code: 'GV · 독맥(督脈)',
      nameKo: '독맥 (Governor Vessel)',
      hanja: '督脈 · 양맥지해(陽脈之海)',
      color: '#FDE68A',
      organRole: '척추·뇌수·자율신경 총괄 (목·허리디스크, 두피열, 성장)',
      paths: [
        traceSnappedCurve([
          [0.0, 2.42, -0.40],
          [0.0, 2.75, -0.32],
          [0.0, 3.05, -0.31],
          [0.0, 3.35, -0.41],
          [0.0, 3.65, -0.40],
          [0.0, 3.86, -0.30],
          [0.0, 4.12, -0.22],
          [0.0, 4.40, -0.28],
          [0.0, 4.585, -0.02]
        ], { dir: 'back', xMin: -0.04, xMax: 0.04, offset: 0.006 }, 5).concat([
          snapPoint(0.0, 4.52, 0.16, { dir: 'front', xMin: -0.03, xMax: 0.03, offset: 0.006 }),
          snapPoint(0.0, 4.35, 0.25, { dir: 'front', xMin: -0.03, xMax: 0.03, offset: 0.006 }),
          snapPoint(0.0, 4.24, 0.29, { dir: 'front', xMin: -0.03, xMax: 0.03, offset: 0.006 })
        ])
      ]
    },
    {
      id: 'CV',
      code: 'CV · 임맥(任脈)',
      nameKo: '임맥 (Conception Vessel)',
      hanja: '任脈 · 음맥지해(陰脈之海)',
      color: '#38BDF8',
      organRole: '자궁·생식·소화·호흡 정중선 총괄 (난임·착상, 복부대사, 공진단)',
      paths: [
        traceSnappedCurve([
          [0.0, 2.46, 0.20],
          [0.0, 2.58, 0.23],
          [0.0, 2.68, 0.23],
          [0.0, 2.80, 0.22],
          [0.0, 2.92, 0.22],
          [0.0, 3.06, 0.22],
          [0.0, 3.20, 0.23],
          [0.0, 3.38, 0.24],
          [0.0, 3.53, 0.22],
          [0.0, 3.72, 0.14],
          [0.0, 3.86, 0.08],
          [0.0, 4.10, 0.25],
          [0.0, 4.16, 0.27]
        ], { dir: 'front', xMin: -0.03, xMax: 0.03, offset: 0.006 }, 4)
      ]
    },
    {
      id: 'ST',
      code: 'ST · 족양명위경(足陽明胃經)',
      nameKo: '족양명위경 (Stomach Meridian)',
      hanja: '足陽明胃經 · 다기다혈(多氣多血)',
      color: '#10B981',
      organRole: '무릎 성장판(독비·족삼리) · 위장 소화흡수 · 안면/비염 주관',
      paths: (() => {
        const right = traceSnappedCurve([
          [0.045, 4.28, 0.26],
          [0.055, 4.15, 0.24],
          [0.075, 3.92, 0.08],
          [0.14, 3.72, 0.14],
          [0.14, 3.48, 0.22],
          [0.10, 3.20, 0.22],
          [0.09, 2.92, 0.21],
          [0.09, 2.62, 0.22],
          [0.24, 2.25, 0.15],
          [0.32, 1.85, 0.16],
          [0.36, 1.55, 0.11],
          [0.39, 1.32, 0.03],
          [0.44, 1.14, -0.03],
          [0.46, 0.80, -0.09],
          [0.47, 0.45, -0.10],
          [0.48, 0.22, 0.04],
          [0.49, 0.06, 0.24]
        ], { dir: 'front', xMin: 0.02, xMax: 0.56, offset: 0.0055 }, 3);
        return [right, mirrorX(right)];
      })()
    },
    {
      id: 'SP',
      code: '족태음비경(足太陰脾經)',
      nameKo: '족태음비경 (Spleen Meridian)',
      hanja: '足太陰脾經 · 후천지본(後天之本)',
      color: '#34D399',
      organRole: '영양 흡수·기혈 생성·자궁/생식(삼음교·혈해)·소아 식적 관리',
      paths: (() => {
        const right = traceSnappedCurve([
          [0.42, 0.06, 0.22],
          [0.40, 0.22, -0.06],
          [0.40, 0.42, -0.14],
          [0.36, 0.78, -0.16],
          [0.33, 1.12, -0.12],
          [0.29, 1.34, -0.04],
          [0.24, 1.65, 0.08],
          [0.20, 2.05, 0.14],
          [0.16, 2.55, 0.21],
          [0.17, 2.92, 0.19],
          [0.18, 3.25, 0.20],
          [0.22, 3.55, 0.18]
        ], { xMin: 0.05, xMax: 0.52, offset: 0.0055 }, 3);
        return [right, mirrorX(right)];
      })()
    },
    {
      id: 'GB',
      code: 'GB · 족소양담경(足少陽膽經)',
      nameKo: '족소양담경 (Gallbladder Meridian)',
      hanja: '足少陽膽經 · 근맥총괄(筋總括)',
      color: '#F59E0B',
      organRole: '무릎 외측 성장판(양릉천)·골반(환도)·편두통/목어깨(풍지·견정) 주관',
      paths: (() => {
        const right = traceSnappedCurve([
          [0.14, 4.32, 0.12],
          [0.16, 4.22, -0.05],
          [0.09, 4.10, -0.18],
          [0.24, 3.82, -0.14],
          [0.36, 3.45, -0.05],
          [0.35, 3.05, 0.02],
          [0.41, 2.55, -0.08],
          [0.48, 2.15, -0.06],
          [0.50, 1.75, -0.08],
          [0.50, 1.40, -0.10],
          [0.57, 1.15, -0.14],
          [0.57, 0.78, -0.18],
          [0.55, 0.42, -0.18],
          [0.54, 0.18, -0.08],
          [0.54, 0.06, 0.18]
        ], { dir: 'outerR', xMin: 0.06, xMax: 0.62, offset: 0.006 }, 3);
        return [right, mirrorX(right)];
      })()
    },
    {
      id: 'BL',
      code: 'BL · 족태양방광경(足太陽膀胱經)',
      nameKo: '족태양방광경 (Bladder Meridian)',
      hanja: '足太陽膀胱經 · 오장육부 배수혈(背俞穴)',
      color: '#60A5FA',
      organRole: '척추 기립근·허리디스크(신수·대장수·위중)·자율신경 배수혈 총괄',
      paths: (() => {
        const right = traceSnappedCurve([
          [0.04, 4.35, 0.25],
          [0.06, 4.54, 0.06],
          [0.07, 4.35, -0.26],
          [0.08, 4.05, -0.22],
          [0.09, 3.75, -0.36],
          [0.09, 3.52, -0.41],
          [0.09, 3.30, -0.39],
          [0.09, 3.05, -0.31],
          [0.09, 2.75, -0.32],
          [0.14, 2.42, -0.40],
          [0.28, 2.00, -0.28],
          [0.35, 1.65, -0.25],
          [0.41, 1.32, -0.32],
          [0.45, 0.92, -0.35],
          [0.47, 0.52, -0.29],
          [0.51, 0.22, -0.26],
          [0.56, 0.06, 0.05]
        ], { dir: 'back', xMin: 0.03, xMax: 0.60, offset: 0.006 }, 3);
        return [right, mirrorX(right)];
      })()
    },
    {
      id: 'KI',
      code: 'KI · 족소음신경(足少陰腎經)',
      nameKo: '족소음신경 (Kidney Meridian)',
      hanja: '足少陰腎經 · 선천지본(先天之本)',
      color: '#A78BFA',
      organRole: '선천 성장 에너지(골수·성장판)·발바닥 용천혈·생식/원기 주관',
      paths: (() => {
        const right = traceSnappedCurve([
          [0.48, 0.01, 0.11],
          [0.41, 0.22, -0.14],
          [0.40, 0.48, -0.18],
          [0.35, 0.88, -0.20],
          [0.30, 1.28, -0.18],
          [0.22, 1.72, -0.10],
          [0.12, 2.25, 0.12],
          [0.05, 2.68, 0.23],
          [0.05, 3.05, 0.22],
          [0.06, 3.45, 0.22],
          [0.08, 3.75, 0.12]
        ], { xMin: 0.03, xMax: 0.54, offset: 0.0055 }, 3);
        return [right, mirrorX(right)];
      })()
    },
    {
      id: 'LR',
      code: 'LR · 족궐음간경(足厥陰肝經)',
      nameKo: '족궐음간경 (Liver Meridian)',
      hanja: '足厥陰肝經 · 장혈·주근(藏血主筋)',
      color: '#2DD4BF',
      organRole: '해독·간기능·근육/인대 유연성·스트레스 울화(태충혈) 소통',
      paths: (() => {
        const right = traceSnappedCurve([
          [0.46, 0.06, 0.22],
          [0.45, 0.22, 0.02],
          [0.41, 0.55, -0.12],
          [0.35, 0.95, -0.13],
          [0.31, 1.32, -0.09],
          [0.24, 1.75, 0.04],
          [0.15, 2.25, 0.15],
          [0.22, 2.85, 0.18],
          [0.24, 3.22, 0.19]
        ], { xMin: 0.05, xMax: 0.54, offset: 0.0055 }, 3);
        return [right, mirrorX(right)];
      })()
    },
    {
      id: 'LU',
      code: 'LU · 수태음폐경(手太陰肺經)',
      nameKo: '수태음폐경 (Lung Meridian)',
      hanja: '手太陰肺經 · 호흡·위기면역(衛氣免疫)',
      color: '#E0F2FE',
      organRole: '소아 호흡기 면역(잦은 감기·비염·편도염 예방) 및 피부 위기(衛氣) 총괄',
      paths: (() => {
        const right = traceSnappedCurve([
          [0.26, 3.68, 0.14],
          [0.44, 3.72, 0.02],
          [0.54, 3.45, -0.05],
          [0.62, 3.12, -0.05],
          [0.72, 2.80, 0.02],
          [0.80, 2.50, 0.08],
          [0.88, 2.25, 0.18]
        ], { xMin: 0.22, xMax: 0.98, offset: 0.0055 }, 3);
        return [right, mirrorX(right)];
      })()
    },
    {
      id: 'LI',
      code: 'LI · 수양명대장경(手陽明大腸經)',
      nameKo: '수양명대장경 (Large Intestine Meridian)',
      hanja: '手陽明大腸經 · 합곡·영향 비강소통',
      color: '#93C5FD',
      organRole: '비염·코막힘 해소(영향혈), 급체·면역 통증 제어(합곡·곡지혈)',
      paths: (() => {
        const right = traceSnappedCurve([
          [0.88, 2.15, 0.16],
          [0.82, 2.48, 0.04],
          [0.74, 2.80, -0.06],
          [0.64, 3.12, -0.12],
          [0.56, 3.48, -0.14],
          [0.48, 3.76, -0.08],
          [0.16, 3.92, 0.04],
          [0.04, 4.23, 0.27]
        ], { xMin: 0.02, xMax: 0.98, offset: 0.0055 }, 3);
        return [right, mirrorX(right)];
      })()
    },
    {
      id: 'HT',
      code: 'HT · 수소음심경(手少陰心經)',
      nameKo: '수소음심경 (Heart Meridian)',
      hanja: '手少陰心經 · 군주지관(君主之官)',
      color: '#F87171',
      organRole: '심장 혈류·수면 안정·자율신경 화병 진정(신문혈·소해혈)',
      paths: (() => {
        const right = traceSnappedCurve([
          [0.36, 3.52, -0.04],
          [0.50, 3.35, -0.12],
          [0.58, 3.08, -0.16],
          [0.68, 2.75, -0.08],
          [0.77, 2.48, 0.01],
          [0.84, 2.15, 0.08]
        ], { xMin: 0.32, xMax: 0.96, offset: 0.0055 }, 3);
        return [right, mirrorX(right)];
      })()
    },
    {
      id: 'PC',
      code: 'PC · 수궐음심포경(手厥陰心包經)',
      nameKo: '수궐음심포경 (Pericardium Meridian)',
      hanja: '手厥陰心包經 · 심장수호·내관혈',
      color: '#FB923C',
      organRole: '심장 박동·자율신경 교감/부교감 균형·소화/불면 안정(내관혈)',
      paths: (() => {
        const right = traceSnappedCurve([
          [0.28, 3.55, 0.16],
          [0.48, 3.52, -0.04],
          [0.60, 3.10, -0.09],
          [0.71, 2.78, -0.02],
          [0.79, 2.52, 0.05],
          [0.86, 2.18, 0.13]
        ], { xMin: 0.24, xMax: 0.96, offset: 0.0055 }, 3);
        return [right, mirrorX(right)];
      })()
    },
    {
      id: 'SI',
      code: 'SI · 수태양소장경(手太陽小腸經)',
      nameKo: '수태양소장경 (Small Intestine Meridian)',
      hanja: '手太陽小腸經 · 경추·견갑골·이명 소통',
      color: '#F472B6',
      organRole: '목디스크·날개뼈(견갑골) 통증·후계혈(독맥 소통) 및 귀/안면 순환',
      paths: (() => {
        const right = traceSnappedCurve([
          [0.85, 2.12, 0.05],
          [0.78, 2.46, -0.04],
          [0.68, 2.82, -0.14],
          [0.58, 3.12, -0.20],
          [0.48, 3.55, -0.26],
          [0.28, 3.74, -0.32],
          [0.16, 3.96, -0.08],
          [0.16, 4.24, 0.02]
        ], { xMin: 0.12, xMax: 0.96, offset: 0.0055 }, 3);
        return [right, mirrorX(right)];
      })()
    },
    {
      id: 'TE',
      code: 'TE · 수소양삼초경(手少陽三焦經)',
      nameKo: '수소양삼초경 (Triple Energizer Meridian)',
      hanja: '手少陽三焦經 · 상·중·하초 기화 및 림프순환',
      color: '#C084FC',
      organRole: '상·중·하초 체온 조절, 림프 해독, 편두통·이명(외관·예풍혈) 주관',
      paths: (() => {
        const right = traceSnappedCurve([
          [0.87, 2.14, 0.09],
          [0.80, 2.52, -0.02],
          [0.71, 2.84, -0.11],
          [0.61, 3.14, -0.16],
          [0.52, 3.52, -0.18],
          [0.34, 3.80, -0.16],
          [0.15, 4.02, -0.10],
          [0.15, 4.30, 0.08]
        ], { xMin: 0.12, xMax: 0.96, offset: 0.0055 }, 3);
        return [right, mirrorX(right)];
      })()
    }
  ];

  // ============================================================================
  // 30+ KEY CLINICAL ACUPOINTS (침구동인 핵심 30대 경혈 혈자리 — 표면 밀착 좌표)
  // ============================================================================
  const acupoints = [
    { code: 'GV20', name: '백회혈 (百會)', meridian: 'GV · 독맥', partId: 'brain', pos: snapPoint(0.0, 4.58, -0.02, { dir: 'top', offset: 0.008 }), desc: '모든 양기(陽氣)가 모이는 정수리 혈자리 · 두피열 배출 & 뇌혈류/성장호르몬 자극' },
    { code: 'EX-HN3', name: '인당혈 (印堂)', meridian: '기혈 · 독맥', partId: 'brain', pos: snapPoint(0.0, 4.35, 0.25, { dir: 'front', offset: 0.008 }), desc: '비염·코막힘 완화 및 자율신경 과긴장·불면 진정 핵심 혈자리' },
    { code: 'LI20', name: '영향혈 (迎香)', meridian: 'LI · 수양명대장경', partId: 'knee', pos: snapPoint(0.032, 4.23, 0.27, { dir: 'front', offset: 0.008 }), desc: '소아 비염·축농증·구강호흡을 치료하여 야간 깊은 성장 수면을 열어주는 핵심 혈' },
    { code: 'GB20', name: '풍지혈 (風池)', meridian: 'GB · 족소양담경', partId: 'cervical', pos: snapPoint(0.088, 4.10, -0.18, { dir: 'back', offset: 0.008 }), desc: '후두하근 긴장 해소 · 뇌척수액 순환 및 초기 감기(풍한사) 차단 요혈' },
    { code: 'GV14', name: '대추혈 (大椎)', meridian: 'GV · 독맥', partId: 'cervical', pos: snapPoint(0.0, 3.86, -0.30, { dir: 'back', offset: 0.008 }), desc: '제7경추 아래 양기가 모이는 관문 · 일자목 교정 및 소아 감기/면역 체온 조절의 핵심' },
    { code: 'GB21', name: '견정혈 (肩井)', meridian: 'GB · 족소양담경', partId: 'cervical', pos: snapPoint(0.24, 3.82, -0.14, { dir: 'back', offset: 0.008 }), desc: '승모근·경추 근막 이완 및 상부 승모근 만성 통증 해소 혈자리' },
    { code: 'LU1', name: '중부혈 (中府)', meridian: 'LU · 수태음폐경', partId: 'heart', pos: snapPoint(0.26, 3.68, 0.14, { dir: 'front', offset: 0.008 }), desc: '폐의 기운이 모이는 모집혈(募穴) · 호흡기 면역력 및 기관지 강화' },
    { code: 'CV17', name: '단중혈 (膻中)', meridian: 'CV · 임맥', partId: 'heart', pos: snapPoint(0.0, 3.53, 0.22, { dir: 'front', offset: 0.008 }), desc: '심포와 기(氣)의 바다(기회혈) · 사향 공진단이 울체된 심장·자율신경 수문을 여는 중심' },
    { code: 'BL15', name: '심수혈 (心俞)', meridian: 'BL · 족태양방광경', partId: 'heart', pos: snapPoint(0.09, 3.52, -0.41, { dir: 'back', offset: 0.008 }), desc: '제5흉추 옆 심장 배수혈 · 만성 피로, 심계항진, 수면장애 회복' },
    { code: 'CV12', name: '중완혈 (中脘)', meridian: 'CV · 임맥', partId: 'gut', pos: snapPoint(0.0, 3.20, 0.23, { dir: 'front', offset: 0.008 }), desc: '위장(胃)의 모집혈 · 식적·담음 해독 및 복부 심부 대사 화로(화로 점화)의 중심' },
    { code: 'ST25', name: '천추혈 (天樞)', meridian: 'ST · 족양명위경', partId: 'gut', pos: snapPoint(0.09, 2.92, 0.21, { dir: 'front', offset: 0.008 }), desc: '대장의 모집혈 · 장내 미생물 균형 회복, 내장지방 분해 및 숙변·부종 배출' },
    { code: 'CV8', name: '신궐혈 (神闕)', meridian: 'CV · 임맥', partId: 'gut', pos: snapPoint(0.0, 2.92, 0.21, { dir: 'front', offset: 0.008 }), desc: '배꼽 중심 혈자리 · 복부 냉증 제거 및 오장육부 림프·혈류 순환의 허브' },
    { code: 'GV4', name: '명문혈 (命門)', meridian: 'GV · 독맥', partId: 'lumbar', pos: snapPoint(0.0, 3.05, -0.31, { dir: 'back', offset: 0.008 }), desc: '제2·3요추 사이 생명의 문 · 요추 디스크 감압 및 선천 원기(신양腎陽) 보강 중심혈' },
    { code: 'BL23', name: '신수혈 (腎俞)', meridian: 'BL · 족태양방광경', partId: 'lumbar', pos: snapPoint(0.092, 3.05, -0.31, { dir: 'back', offset: 0.008 }), desc: '신장·골수·척추를 주관하는 배수혈 · 허리디스크, 골밀도 강화, 소아 성장 핵심혈' },
    { code: 'CV6', name: '기해혈 (氣海)', meridian: 'CV · 임맥', partId: 'pelvis', pos: snapPoint(0.0, 2.78, 0.22, { dir: 'front', offset: 0.008 }), desc: '원기(元氣)가 모이는 바다 · 만성 피로 회복 및 하복부 냉증 해소' },
    { code: 'CV4', name: '관원혈 (關元)', meridian: 'CV · 임맥', partId: 'pelvis', pos: snapPoint(0.0, 2.68, 0.23, { dir: 'front', offset: 0.008 }), desc: '자궁·난소·정자의 생명력이 깃드는 단전 중심혈 · 착상탕 치료 및 자궁내막 온열 보강' },
    { code: 'CV3', name: '중극혈 (中極)', meridian: 'CV · 임맥', partId: 'pelvis', pos: snapPoint(0.0, 2.56, 0.23, { dir: 'front', offset: 0.008 }), desc: '비뇨생식기 및 자궁 혈류 순환을 촉진하는 골반강 핵심 혈자리' },
    { code: 'LI11', name: '곡지혈 (曲池)', meridian: 'LI · 수양명대장경', partId: 'gut', pos: snapPoint(0.64, 3.12, -0.12, { xMin: 0.50, xMax: 0.78, offset: 0.008 }), desc: '상열(열독)을 내리고 대장 해독 및 알레르기·피부 면역을 조절하는 대표 혈자리' },
    { code: 'PC6', name: '내관혈 (內關)', meridian: 'PC · 수궐음심포경', partId: 'heart', pos: snapPoint(0.76, 2.60, 0.04, { xMin: 0.65, xMax: 0.88, offset: 0.008 }), desc: '미주신경(Vagus Nerve)을 자극하여 심장 두근거림·불안·소화불량을 동시에 다스리는 명혈' },
    { code: 'HT7', name: '신문혈 (神門)', meridian: 'HT · 수소음심경', partId: 'heart', pos: snapPoint(0.78, 2.48, 0.01, { xMin: 0.68, xMax: 0.90, offset: 0.008 }), desc: '심경의 원혈(原穴) · 깊은 숙면을 유도하고 정신적 스트레스와 뇌 피로를 씻어내는 혈' },
    { code: 'LI4', name: '합곡혈 (合谷)', meridian: 'LI · 수양명대장경', partId: 'gut', pos: snapPoint(0.87, 2.18, 0.16, { xMin: 0.74, xMax: 0.98, offset: 0.008 }), desc: '전신 기혈 순환의 스위치 · 소화 정체(식적) 해소 및 통증 제어의 대표 원혈' },
    { code: 'SP10', name: '혈해혈 (血海)', meridian: 'SP · 족태음비경', partId: 'pelvis', pos: snapPoint(0.28, 1.48, 0.06, { dir: 'front', xMin: 0.15, xMax: 0.45, offset: 0.008 }), desc: '피의 바다 · 자궁 어혈을 풀고 무릎 관절 주변 혈류 공급을 극대화하는 혈자리' },
    { code: 'ST35', name: '독비혈 (犢鼻)', meridian: 'ST · 족양명위경', partId: 'knee', pos: snapPoint(0.39, 1.32, 0.03, { dir: 'front', xMin: 0.25, xMax: 0.55, offset: 0.008 }), desc: '무릎 슬개골 아래 외측 함요부 · 대퇴골·경골 성장판 연골모세포에 직접 산소·영양을 공급하는 제1 성장혈' },
    { code: 'EX-LE4', name: '내슬안 (內膝眼)', meridian: '기혈 · 슬안혈', partId: 'knee', pos: snapPoint(0.31, 1.32, 0.01, { dir: 'front', xMin: 0.20, xMax: 0.45, offset: 0.008 }), desc: '독비혈과 짝을 이루어 무릎 성장판 내측 미세혈류를 확장시키는 핵심 성장 경혈' },
    { code: 'BL40', name: '위중혈 (委中)', meridian: 'BL · 족태양방광경', partId: 'lumbar', pos: snapPoint(0.41, 1.32, -0.32, { dir: 'back', xMin: 0.25, xMax: 0.55, offset: 0.008 }), desc: '요배위중구(腰背委中求) · 급만성 허리 통증과 좌골신경통, 하지 성장통을 다스리는 특효혈' },
    { code: 'ST36', name: '족삼리혈 (足三里)', meridian: 'ST · 족양명위경', partId: 'knee', pos: snapPoint(0.44, 1.14, -0.03, { dir: 'front', xMin: 0.30, xMax: 0.56, offset: 0.008 }), desc: '소화 흡수력과 무릎 성장판(IGF-1 발현) 및 전신 면역(NK세포)을 동시에 깨우는 소아 성장 최고 명혈' },
    { code: 'GB34', name: '양릉천혈 (陽陵泉)', meridian: 'GB · 족소양담경', partId: 'knee', pos: snapPoint(0.57, 1.15, -0.13, { dir: 'outerR', xMin: 0.45, xMax: 0.62, offset: 0.008 }), desc: '팔회혈 중 근회(筋會: 근육과 인대가 모이는 곳) · 성장기 근육 신장과 성장통 완화의 핵심혈' },
    { code: 'SP9', name: '음릉천혈 (陰陵泉)', meridian: 'SP · 족태음비경', partId: 'knee', pos: snapPoint(0.33, 1.12, -0.12, { xMin: 0.22, xMax: 0.44, offset: 0.008 }), desc: '체내 불필요한 습담(부종·염증 액체)을 배출하고 무릎 관절 부종을 가라앉히는 혈자리' },
    { code: 'SP6', name: '삼음교혈 (三陰交)', meridian: 'SP · 족태음비경', partId: 'pelvis', pos: snapPoint(0.40, 0.42, -0.14, { xMin: 0.28, xMax: 0.50, offset: 0.008 }), desc: '간·비·신 3개의 음경(陰經)이 만나는 교차점 · 여성 자궁 보혈, 생리통, 난임 및 소아 성장 핵심혈' },
    { code: 'LR3', name: '태충혈 (太衝)', meridian: 'LR · 족궐음간경', partId: 'brain', pos: snapPoint(0.48, 0.08, 0.19, { dir: 'front', xMin: 0.35, xMax: 0.58, offset: 0.008 }), desc: '합곡혈과 함께 사관혈(四關穴)을 이루며 막힌 기혈과 간화(스트레스 열)를 내리는 대표 원혈' },
    { code: 'KI1', name: '용천혈 (湧泉)', meridian: 'KI · 족소음신경', partId: 'knee', pos: snapPoint(0.48, 0.01, 0.11, { dir: 'bottom', xMin: 0.35, xMax: 0.58, offset: 0.008 }), desc: '생명력이 샘솟는 발바닥 첫 혈자리 · 두피의 열을 발끝으로 내리고(수승화강) 성장판 골수를 채우는 혈' }
  ];

  return { meridians, acupoints };
}

if (require.main === module) {
  buildDonginSurfaceData().then(data => {
    console.log('Generated Meridians:', data.meridians.length, 'Acupoints:', data.acupoints.length);
  });
}

module.exports = { buildDonginSurfaceData };
