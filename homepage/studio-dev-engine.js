'use strict';

const https = require('https');

function runDeterministicDevCommand({ instruction, itemType, itemId, itemData }) {
  const raw = String(instruction || '').trim();
  const low = raw.toLowerCase();
  const uid = Date.now().toString(36).slice(-4);

  const mutation = {
    addFields: [],
    patchProps: {},
    appendCss: '',
    appendHtmlBefore: '',
    appendHtmlAfter: '',
    appendJs: ''
  };
  const actionsDone = [];

  // 1. Custom Color / Background / Border / Typography CSS rules
  const hexMatch = raw.match(/#[0-9a-fA-F]{3,8}\b/g) || [];
  if (/배경|배경색|background/i.test(raw)) {
    const bgCol = hexMatch[0] || '#FAF7F2';
    mutation.addFields.push({
      id: `bg_color_${uid}`,
      label: '커스텀 배경색',
      type: 'color',
      value: bgCol,
      slot: 'cssVar'
    });
    mutation.appendCss += `\n{{SELF}}, {{SELF}} .editorial-text-zone { background: {{bg_color_${uid}}} !important; }`;
    actionsDone.push(`배경색 커스텀 컬러 피커(${bgCol}) 및 CSS 규칙 추가`);
  }
  if (/글자색|텍스트\s*색|폰트\s*색|컬러/i.test(raw) && !/배경/.test(raw)) {
    const txtCol = hexMatch[0] || '#D4AF37';
    mutation.addFields.push({
      id: `text_color_${uid}`,
      label: '커스텀 글자색',
      type: 'color',
      value: txtCol,
      slot: 'cssVar'
    });
    mutation.appendCss += `\n{{SELF}} .editorial-headline, {{SELF}} .editorial-body-copy { color: {{text_color_${uid}}} !important; }`;
    actionsDone.push(`글자색 커스텀 컬러 피커(${txtCol}) 추가`);
  }
  if (/테두리|보더|골드\s*라인|border/i.test(raw)) {
    const bdCol = hexMatch[0] || '#D4AF37';
    mutation.appendCss += `\n{{SELF}} { border: 2px solid ${bdCol} !important; box-shadow: 0 12px 32px rgba(212, 175, 55, 0.22) !important; }`;
    actionsDone.push(`강조 테두리(${bdCol}) & 글로우 스타일 적용`);
  }
  if (/둥글|라운드|radius/i.test(raw)) {
    mutation.appendCss += `\n{{SELF}} { border-radius: 26px !important; overflow: hidden !important; }`;
    actionsDone.push('카드 모서리 라운드(26px) 스타일 적용');
  }
  if (/그림자|shadow|입체/i.test(raw)) {
    mutation.appendCss += `\n{{SELF}} { box-shadow: 0 22px 54px rgba(0, 0, 0, 0.34) !important; }`;
    actionsDone.push('입체 그림자 스타일 적용');
  }

  // 2. CTA Button / Link Field Addition
  if (/버튼|링크|cta|바로가기|예약\s*버튼/i.test(raw)) {
    const btnTextId = `cta_label_${uid}`;
    const btnUrlId = `cta_url_${uid}`;
    const btnBgId = `cta_bg_${uid}`;
    mutation.addFields.push(
      { id: btnTextId, label: '커스텀 버튼 문구', type: 'text', value: '맞춤 상담 바로가기', slot: 'templateOnly' },
      { id: btnUrlId, label: '버튼 이동 링크 URL (예: #consult 또는 growth.html)', type: 'url', value: '#consult', slot: 'templateOnly' },
      { id: btnBgId, label: '버튼 배경 색상', type: 'color', value: '#10B981', slot: 'templateOnly' }
    );
    mutation.appendHtmlAfter += `\n<div class="dev-custom-cta-wrap"><a class="dev-custom-cta-btn" href="{{${btnUrlId}}}" style="background:{{${btnBgId}}};" onclick="event.stopPropagation();if(this.getAttribute('href')==='#consult'&&window.openConsultModal){window.openConsultModal();return false;}">{{${btnTextId}}} ↗</a></div>`;
    actionsDone.push('커스텀 CTA 버튼(문구·링크·색상 수정 필드 3종) 추가');
  }

  // 3. Comparison Table Widget
  if (/비교표|비교\s*테이블|표\s*추가|스펙표|2열/i.test(raw)) {
    const tHeadL = `cmp_l_head_${uid}`;
    const tHeadR = `cmp_r_head_${uid}`;
    const tRow1L = `cmp_r1_l_${uid}`;
    const tRow1R = `cmp_r1_r_${uid}`;
    const tRow2L = `cmp_r2_l_${uid}`;
    const tRow2R = `cmp_r2_r_${uid}`;
    mutation.addFields.push(
      { id: tHeadL, label: '비교표 왼쪽 제목 (Before / 일반)', type: 'text', value: '기존 대증 관리', slot: 'templateOnly' },
      { id: tHeadR, label: '비교표 오른쪽 제목 (After / 바른)', type: 'text', value: '바른한의원 1:1 정밀 치료', slot: 'templateOnly' },
      { id: tRow1L, label: '1행 왼쪽 내용', type: 'text', value: '일시적 증상 완화 위주', slot: 'templateOnly' },
      { id: tRow1R, label: '1행 오른쪽 내용', type: 'text', value: '9대 정밀검진 기반 원인 교정', slot: 'templateOnly' },
      { id: tRow2L, label: '2행 왼쪽 내용', type: 'text', value: '획일화된 기성 처방', slot: 'templateOnly' },
      { id: tRow2R, label: '2행 오른쪽 내용', type: 'text', value: '체질별 맞춤 GMP 원내 직탕', slot: 'templateOnly' }
    );
    mutation.appendHtmlAfter += `\n<div class="dev-custom-cmp-table" onclick="event.stopPropagation();" style="margin-top:12px;border-radius:12px;overflow:hidden;border:1px solid rgba(212,175,55,0.35);font-size:12px;"><div style="display:grid;grid-template-columns:1fr 1fr;background:rgba(212,175,55,0.16);font-weight:800;"><div style="padding:8px 10px;border-right:1px solid rgba(212,175,55,0.2);">{{${tHeadL}}}</div><div style="padding:8px 10px;color:var(--sa-hl-color,#D4AF37);">{{${tHeadR}}}</div></div><div style="display:grid;grid-template-columns:1fr 1fr;border-top:1px solid rgba(255,255,255,0.08);"><div style="padding:8px 10px;opacity:0.78;border-right:1px solid rgba(255,255,255,0.08);">{{${tRow1L}}}</div><div style="padding:8px 10px;font-weight:700;">{{${tRow1R}}}</div></div><div style="display:grid;grid-template-columns:1fr 1fr;border-top:1px solid rgba(255,255,255,0.08);"><div style="padding:8px 10px;opacity:0.78;border-right:1px solid rgba(255,255,255,0.08);">{{${tRow2L}}}</div><div style="padding:8px 10px;font-weight:700;">{{${tRow2R}}}</div></div></div>`;
    actionsDone.push('편집 가능한 2열 비교표 위젯 & 6개 셀 입력 필드 추가');
  }

  // 4. Callout / Notice Box
  if (/콜아웃|강조\s*박스|주의|안내\s*박스|팁\s*박스|메모/i.test(raw)) {
    const cTitle = `callout_title_${uid}`;
    const cBody = `callout_body_${uid}`;
    mutation.addFields.push(
      { id: cTitle, label: '강조 박스 제목', type: 'text', value: '💡 대표원장 임상 핵심 포인트', slot: 'templateOnly' },
      { id: cBody, label: '강조 박스 본문', type: 'textarea', value: '초진 시 정밀 검진 결과에 따라 개인 맞춤 치료 기간과 생활 가이드를 상세히 안내해 드립니다.', slot: 'templateOnly' }
    );
    mutation.appendHtmlAfter += `\n<div class="dev-custom-callout"><strong>{{${cTitle}}}</strong><p>{{${cBody}}}</p></div>`;
    actionsDone.push('임상 핵심 안내 콜아웃 박스 & 제목/본문 편집 필드 추가');
  }

  // 5. YouTube / Video Embed
  if (/유튜브|youtube|동영상|영상\s*추가/i.test(raw)) {
    const ytId = `youtube_${uid}`;
    mutation.addFields.push({
      id: ytId,
      label: '유튜브 영상 URL (예: https://www.youtube.com/watch?v=...)',
      type: 'youtube',
      value: '',
      slot: 'youtube'
    });
    actionsDone.push('유튜브 동영상 URL 임베드 입력 필드 추가');
  }

  // 6. Metrics / Stats Cards
  if (/수치|통계|퍼센트|데이터\s*박스|지표/i.test(raw)) {
    mutation.addFields.push(
      { id: `metric_a_${uid}`, label: '핵심 수치 1 (예: 임상 경력)', type: 'text', value: '15년+', slot: 'metrics' },
      { id: `metric_b_${uid}`, label: '핵심 수치 2 (예: 안전 기준)', type: 'text', value: 'GMP 320종 통과', slot: 'metrics' }
    );
    actionsDone.push('핵심 수치 지표 위젯 & 2개 입력 필드 추가');
  }

  // 7. Badge / Pill
  if (/배지|뱃지|라벨|태그\s*추가/i.test(raw)) {
    mutation.addFields.push({
      id: `badge_${uid}`,
      label: '상단 커스텀 배지 텍스트',
      type: 'text',
      value: '✦ 바른한의원 전담 클리닉',
      slot: 'badge'
    });
    actionsDone.push('상단 커스텀 배지 입력 필드 추가');
  }

  // 8. Generic Custom Field Addition if user asked to add a field/feature not matched above
  if (actionsDone.length === 0) {
    const genericId = `custom_field_${uid}`;
    const cleanTitle = raw.replace(/추가해줘|만들어줘|넣어줘|수정해줘|적용해줘/g, '').trim().slice(0, 24) || '커스텀 항목';
    mutation.addFields.push({
      id: genericId,
      label: `커스텀 [${cleanTitle}]`,
      type: 'textarea',
      value: raw,
      slot: 'callout'
    });
    actionsDone.push(`즉석 커스텀 필드 [${cleanTitle}] 생성 및 UI 반영`);
  }

  return {
    ok: true,
    engine: 'local-instant-dev-mutator',
    mutation,
    summary: actionsDone.join(' · ')
  };
}

function callGeminiJson(apiKey, promptText) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: promptText }] }],
      generationConfig: {
        temperature: 0.25,
        responseMimeType: 'application/json'
      }
    });
    const req = https.request({
      hostname: 'generativelanguage.googleapis.com',
      path: `/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      },
      timeout: 25000
    }, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode < 200 || res.statusCode >= 300) {
          return reject(new Error(`Gemini HTTP ${res.statusCode}: ${data.slice(0, 200)}`));
        }
        try {
          const parsed = JSON.parse(data);
          const text = parsed?.candidates?.[0]?.content?.parts?.[0]?.text || '';
          resolve(JSON.parse(text));
        } catch (err) {
          reject(err);
        }
      });
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('Gemini API timeout')); });
    req.write(payload);
    req.end();
  });
}

async function executeStudioDevCommand({ instruction, itemType, itemId, itemData, pageSlug, geminiKey, useAi }) {
  const cleanInst = String(instruction || '').trim();
  if (!cleanInst) {
    throw new Error('즉석 커스텀 명령을 입력해 주세요.');
  }

  // Try Gemini AI Architect first if key is present and AI mode requested
  if (geminiKey && useAi !== false) {
    try {
      const prompt = `당신은 '바른한의원 커스텀 스튜디오'의 시니어 풀스택 개발자입니다.
사용자가 특정 커스텀 항목(${itemType} / ${itemId})에 대해 아래 명령을 내렸습니다.
스튜디오 자체 UI 입력 필드를 즉시 추가하고, 해당 항목의 HTML/CSS/JS 구성을 실시간 수정할 JSON 패치를 생성하세요.

[현재 항목 JSON 요약]
${JSON.stringify(itemData || {}).slice(0, 2500)}

[사용자 명령]
"${cleanInst}"

[출력 JSON 스키마 (반드시 순수 JSON만 반환)]
{
  "summary": "적용 내용 한 줄 한국어 요약",
  "patchProps": { /* 필요시 기존 필드 직접 수정 (예: title, sub, stepLabel 등) */ },
  "addFields": [
    {
      "id": "영문_스네이크케이스_고유키",
      "label": "스튜디오 UI에 표시될 한글 입력란 이름",
      "type": "text | textarea | color | url | number | toggle | html | youtube",
      "value": "초기 기본값",
      "slot": "templateOnly | badge | cta | callout | metrics | cssVar | afterBody | beforeTitle"
    }
  ],
  "appendCss": "선택적 CSS (항상 {{SELF}} 선택자로 스코프 지정, {{field_id}} 변수 사용 가능)",
  "appendHtmlBefore": "선택적 상단 HTML ({{field_id}} 변수 바인딩 가능)",
  "appendHtmlAfter": "선택적 하단 HTML ({{field_id}} 변수 바인딩 가능, slot이 templateOnly인 필드는 반드시 여기에 {{field_id}}로 배치)",
  "appendJs": "선택적 JS (root 엘리먼트와 fields 객체가 이미 스코프로 제공됨)"
}`;

      const aiRes = await callGeminiJson(geminiKey, prompt);
      if (aiRes && typeof aiRes === 'object') {
        return {
          ok: true,
          engine: 'gemini-2.5-flash-dev-architect',
          mutation: {
            addFields: Array.isArray(aiRes.addFields) ? aiRes.addFields : [],
            patchProps: (aiRes.patchProps && typeof aiRes.patchProps === 'object') ? aiRes.patchProps : {},
            appendCss: String(aiRes.appendCss || ''),
            appendHtmlBefore: String(aiRes.appendHtmlBefore || ''),
            appendHtmlAfter: String(aiRes.appendHtmlAfter || ''),
            appendJs: String(aiRes.appendJs || '')
          },
          summary: String(aiRes.summary || 'AI 개발자 모드 커스텀 구성이 즉시 반영되었습니다.')
        };
      }
    } catch (aiErr) {
      console.warn('[StudioDevEngine AI Fallback]', aiErr.message);
    }
  }

  return runDeterministicDevCommand({ instruction: cleanInst, itemType, itemId, itemData });
}

module.exports = {
  runDeterministicDevCommand,
  executeStudioDevCommand
};
