/**
 * 바른 메디테크 — 샘플 홈페이지 셸 생성기 (sample.html)
 * 실제 www.bareunhaniwon.com 페이지를 화면 가득 iframe으로 띄워 "홈페이지처럼" 그대로 작동시키고,
 * 단계별로 차이가 나는 기능 위에만 작은 아이콘을 표시합니다.
 *   스탠다드 ✕ / 프로 △ / 시그니처 ○   (✕ 미포함 · △ 일부 제공 · ○ 포함)
 * 링크를 눌러 다른 페이지로 이동해도 읽기 전용(serve.js: bareun_sample 쿠키 + iframe)과 아이콘이 유지됩니다.
 * 실행: node build-tier-samples.js
 */
const fs = require('fs');
const path = require('path');

const css = `
*{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%;overflow:hidden}
body{font-family:'Pretendard',-apple-system,system-ui,sans-serif;background:#0B2418;color:#fff;word-break:keep-all}
a{color:inherit;text-decoration:none}
.bar{height:44px;display:flex;align-items:center;gap:14px;padding:0 16px;font-size:12.5px;font-weight:700;border-bottom:1px solid rgba(143,224,176,.25)}
.bar .tag{font-size:11px;font-weight:900;letter-spacing:.06em;padding:4px 10px;border-radius:999px;background:#8FE0B0;color:#0B2418}
.bar .note{color:rgba(255,255,255,.72);font-weight:600}
.legend{display:flex;align-items:center;gap:10px;margin-left:auto;color:rgba(255,255,255,.8);font-weight:600;font-size:12px}
.legend span{display:inline-flex;align-items:center;gap:4px}
.legend svg{width:12px;height:12px}
.back{color:rgba(255,255,255,.75);margin-left:8px}
@media(max-width:760px){.bar .note{display:none}.legend{gap:6px;font-size:11px}}
iframe{display:block;width:100%;height:calc(100% - 44px);border:0;background:#F5F1E8}
.toast{position:fixed;left:50%;bottom:20px;transform:translateX(-50%);background:#0B2418;color:#fff;padding:10px 18px;border-radius:999px;z-index:10;font-size:13px;font-weight:700;box-shadow:0 8px 24px rgba(0,0,0,.3)}.toast[hidden]{display:none}
`;

// 아이콘 (작은 SVG)
const ICON = {
  x: '<svg viewBox="0 0 12 12"><path d="M2.5 2.5l7 7M9.5 2.5l-7 7" stroke="#D2533C" stroke-width="2" stroke-linecap="round"/></svg>',
  t: '<svg viewBox="0 0 12 12"><path d="M6 1.8l4.6 8.4H1.4z" fill="none" stroke="#D99A18" stroke-width="1.8" stroke-linejoin="round"/></svg>',
  o: '<svg viewBox="0 0 12 12"><circle cx="6" cy="6" r="4.3" fill="none" stroke="#2E9A62" stroke-width="2"/></svg>'
};

const js = `
var ICON=${JSON.stringify(ICON)};
var TIER=['스탠다드','프로','시그니처'];
/* 단계별로 차이가 나는 기능만 표시합니다. 모든 단계 기본 포함 기능은 표시하지 않습니다. */
var MARKS=[
 {sel:'#daddy-doc-intro-stage,#story-dialogue-stage',lv:['x','t','o'],tip:'환자 스토리보드 — 스탠다드 없음 · 프로 12컷 · 시그니처 24컷 + 무제한'},
 {sel:'#vibrant-3d-stage',lv:['x','x','o'],tip:'풀스크린 3D 인체모형 · 모션 — 시그니처 전용'},
 {sel:'#vh-part-quicknav,#encyclopedia-scroll-panel',pos:'left',unless:'#qna-kw-input',lv:['x','t','o'],tip:'건강 칼럼 — 프로 월 8건(텍스트) · 시그니처 월 15건 + 3단 화보'},
 {sel:'#encyclopedia-scroll-panel',pos:'left',when:'#qna-kw-input',lv:['x','o','o'],tip:'1:1 무엇이든 물어보세요 (Q&A) — 프로 · 시그니처'},
 {sel:'.empathy-checklist-card,#empathy-checklist-list',lv:['x','o','o'],tip:'질환별 체크포인트(자가진단) — 프로 · 시그니처'}
];
var STYLE='#smk-layer{position:fixed;inset:0;pointer-events:none;z-index:2147483000}'+
'.smk{position:fixed;display:flex;align-items:center;gap:8px;padding:4px 10px;border-radius:999px;background:rgba(255,255,255,.95);box-shadow:0 4px 14px rgba(0,0,0,.22);pointer-events:auto;cursor:help;font:800 11px/1 Pretendard,-apple-system,system-ui,sans-serif;color:#1B2E24;white-space:nowrap}'+
'.smk span{display:inline-flex;align-items:center;gap:3px}.smk svg{width:11px;height:11px;display:block}';
var frame=document.getElementById('frame');
document.cookie='bareun_sample=1; path=/; SameSite=Lax';
/* 바로가기: sample.html?src=body-explorer.html (같은 사이트 html만 허용) */
var qs=(location.search.match(/[?&]src=([a-z0-9\\-]+\\.html)(?:&tab=(qna))?/i)||[]);if(qs[1])frame.src=qs[1]+'?sample=1'+(qs[2]?'&tab=qna':'');
function markHtml(lv){return lv.map(function(k,i){return '<span>'+TIER[i]+ICON[k]+'</span>';}).join('');}
function vis(el,vw,vh){var cs=el.ownerDocument.defaultView.getComputedStyle(el);if(cs.display==='none'||cs.visibility==='hidden'||parseFloat(cs.opacity)<0.05)return null;var r=el.getBoundingClientRect();if(r.width<30||r.height<20||r.bottom<20||r.top>vh-20||r.right<0||r.left>vw)return null;return r;}
function anyVis(d,sel,vw,vh){var n=d.querySelectorAll(sel);for(var i=0;i<n.length;i++)if(vis(n[i],vw,vh))return true;return false;}
function tick(){
  var d;try{d=frame.contentDocument;if(!d||!d.body||d.readyState==='loading')return;}catch(e){return;}
  var w=frame.contentWindow,vw=w.innerWidth,vh=w.innerHeight;
  var layer=d.getElementById('smk-layer');
  if(!layer){var st=d.createElement('style');st.textContent=STYLE;d.head.appendChild(st);layer=d.createElement('div');layer.id='smk-layer';d.body.appendChild(layer);}
  var placed=[];
  MARKS.forEach(function(m,i){
    var pill=d.getElementById('smk-'+i),r=null;
    if(!(m.when&&!anyVis(d,m.when,vw,vh))&&!(m.unless&&anyVis(d,m.unless,vw,vh))){
      m.sel.split(',').forEach(function(s){if(r)return;var n=d.querySelectorAll(s);for(var k=0;k<n.length&&!r;k++)r=vis(n[k],vw,vh);});}
    if(!r){if(pill)pill.style.display='none';return;}
    if(!pill){pill=d.createElement('div');pill.id='smk-'+i;pill.className='smk';pill.title=m.tip;pill.innerHTML=markHtml(m.lv);layer.appendChild(pill);}
    pill.style.display='flex';
    var pw=pill.offsetWidth,ph=pill.offsetHeight;
    var top,left;
    if(m.pos==='left'&&r.left-pw-10>8){top=r.top+10;left=r.left-pw-10;}else{top=r.top-ph/2;left=r.left+14;}
    if(top<70)top=76;top=Math.min(top,vh-ph-8);left=Math.min(Math.max(left,8),vw-pw-8);
    for(var q=0;q<placed.length;q++){var o=placed[q];if(left<o.l+o.w+4&&left+pw+4>o.l&&top<o.t+o.h+4&&top+ph+4>o.t)top=o.t+o.h+6;}
    pill.style.top=top+'px';pill.style.left=left+'px';placed.push({l:left,t:top,w:pw,h:ph});
  });
}
setInterval(tick,250);
var tt;window.addEventListener('message',function(e){if(e.data&&e.data.bareunSample==='blocked'){var t=document.getElementById('toast');t.textContent='샘플이라 저장·전송되지 않습니다. 실제 홈페이지에서는 정상 등록됩니다.';t.hidden=false;clearTimeout(tt);tt=setTimeout(function(){t.hidden=true;},2600);}});
`;

const legend = `<span>${ICON.o}포함</span><span>${ICON.t}일부</span><span>${ICON.x}미포함</span>`;
const html = `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex, nofollow">
<title>[샘플] www.bareunhaniwon.com 실제 작동 화면 | 바른 메디테크</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css">
<style>${css}</style>
</head>
<body>
<div class="bar">
  <span class="tag">SAMPLE</span>
  <span class="note">실제 홈페이지처럼 눌러 보세요 · 읽기 전용</span>
  <span class="legend">${legend}</span>
  <a class="back" href="b2b-landing.html#samples">← 안내 페이지로</a>
</div>
<iframe id="frame" src="index.html?sample=1" title="바른한의원 실제 홈페이지 샘플" allow="fullscreen"></iframe>
<div class="toast" id="toast" hidden></div>
<script>${js}</script>
</body>
</html>
`;
fs.writeFileSync(path.join(__dirname, 'sample.html'), html, 'utf8');
console.log('✔ sample.html (홈페이지 그대로 + 스탠다드✕/프로△/시그니처○ 아이콘) 생성 완료');
