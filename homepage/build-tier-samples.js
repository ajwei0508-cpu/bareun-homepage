/**
 * 바른 메디테크 — 샘플 홈페이지 셸 생성기 (sample.html)
 * 실제 www.bareunhaniwon.com 페이지를 화면 가득 iframe으로 띄워 "홈페이지처럼" 그대로 작동시키고,
 * 단계별로 차이가 나는 기능 위에만 작은 아이콘과 기능 이름을 표시합니다.
 *   스탠다드 ✕ / 프로 △ (클릭 시 시그니처와 차이점 작은 창 안내) / 시그니처 ○
 * 실행: node build-tier-samples.js
 */
const fs = require('fs');
const path = require('path');

const css = `
*{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%;overflow:hidden}
body{font-family:'Pretendard',-apple-system,system-ui,sans-serif;background:#0B2418;color:#fff;word-break:keep-all}
a{color:inherit;text-decoration:none}
.bar{height:46px;display:flex;align-items:center;gap:12px;padding:0 16px;font-size:12px;font-weight:700;border-bottom:1px solid rgba(143,224,176,.25);background:#071911}
.bar .tag{font-size:11px;font-weight:900;letter-spacing:.06em;padding:4px 10px;border-radius:999px;background:#8FE0B0;color:#071911}
.bar .note{color:rgba(255,255,255,.72);font-weight:600}
.bar-nav{display:flex;gap:4px;background:rgba(255,255,255,.08);padding:3px;border-radius:999px;margin-left:6px}
.b-tab{font-family:inherit;font-size:11.5px;font-weight:800;color:rgba(255,255,255,.75);padding:4px 12px;border-radius:999px;transition:all .15s}
.b-tab:hover{color:#fff}
.b-tab.on{background:#8FE0B0;color:#071911}
.legend{display:flex;align-items:center;gap:8px;margin-left:auto;color:rgba(255,255,255,.8);font-weight:600;font-size:11.5px}
.legend span{display:inline-flex;align-items:center;gap:3px}
.legend svg{width:12px;height:12px}
.back{color:rgba(255,255,255,.75);margin-left:8px;font-weight:700}
.back:hover{color:#8FE0B0}
@media(max-width:860px){.bar .note{display:none}.bar-nav{margin-left:0}}
iframe{display:block;width:100%;height:calc(100% - 46px);border:0;background:#F5F1E8}
.toast{position:fixed;left:50%;bottom:20px;transform:translateX(-50%);background:#0B2418;color:#fff;padding:10px 18px;border-radius:999px;z-index:10;font-size:13px;font-weight:700;box-shadow:0 8px 24px rgba(0,0,0,.3)}.toast[hidden]{display:none}
`;

const ICON_X = '<svg viewBox="0 0 12 12"><path d="M2.5 2.5l7 7M9.5 2.5l-7 7" stroke="#D2533C" stroke-width="2" stroke-linecap="round"/></svg>';
const ICON_T = '<svg viewBox="0 0 12 12"><path d="M6 1.8l4.6 8.4H1.4z" fill="none" stroke="#D99A18" stroke-width="1.8" stroke-linejoin="round"/></svg>';
const ICON_O = '<svg viewBox="0 0 12 12"><circle cx="6" cy="6" r="4.3" fill="none" stroke="#2E9A62" stroke-width="2"/></svg>';

const js = `
var ICON = {
  x: '${ICON_X.replace(/'/g, "\\'")}',
  t: '${ICON_T.replace(/'/g, "\\'")}',
  o: '${ICON_O.replace(/'/g, "\\'")}'
};
var TIER = ['스탠다드', '프로', '시그니처'];

var MARKS = [
  {
    name: '환자 스토리보드 오프닝',
    sel: '#daddy-doc-intro-stage,#story-dialogue-stage',
    lv: ['x', 't', 'o'],
    diff: {
      pro: '프로(△): 12컷 스토리보드 제공',
      sig: '시그니처(○): 24컷 풀스토리 + 계절/시즌별 무제한 개편 (스탠다드는 미포함)',
      cost: '구축비 +40만 원 · 월 케어 +4.4만 원 (체류 시간 증가로 신환 예약 전환율 극대화)'
    }
  },
  {
    name: '풀스크린 3D 인체모형 · 모션',
    sel: '#vibrant-3d-stage',
    lv: ['x', 'x', 'o'],
    diff: {
      pro: '프로(✕): 3D 모형 미포함 (체험형 인터랙션 제외)',
      sig: '시그니처(○): 웹GL 풀스크린 3D 인터랙션 및 실시간 모션 독점 탑재',
      cost: '환자가 직접 아픈 부위를 회전하며 살펴보는 최고급 몰입형 진료 경험'
    }
  },
  {
    name: '오늘의 건강 칼럼 자동 발행',
    sel: '#vh-part-quicknav,#encyclopedia-scroll-panel',
    pos: 'left',
    unless: '#qna-kw-input',
    lv: ['x', 't', 'o'],
    diff: {
      pro: '프로(△): 월 8건 텍스트 건강 칼럼 자동 발행',
      sig: '시그니처(○): 월 15건 칼럼 + 상·중·하 3단 맞춤 화보 자동 생성',
      cost: '네이버/구글 검색 유입 입구가 2배 넓어지고 비급여 신환 확보에 특화'
    }
  },
  {
    name: '무엇이든 물어보세요 (1:1 Q&A)',
    sel: '#encyclopedia-scroll-panel',
    pos: 'left',
    when: '#qna-kw-input',
    lv: ['x', 'o', 'o'],
    diff: {
      pro: '프로(○): 1:1 비공개 상담 게시판 기본 제공',
      sig: '시그니처(○): 1:1 상담 게시판 + AI 대표원장 답변 초안 자동 작성 연동',
      cost: '비급여 진료 문의 문턱을 대폭 낮추어 전화 부담 환자를 신환으로 전환'
    }
  },
  {
    name: '질환별 자가진단 체크포인트',
    sel: '.empathy-checklist-card,#empathy-checklist-list',
    lv: ['x', 'o', 'o'],
    diff: {
      pro: '프로(○): 5문항 인터랙티브 자가진단 체크리스트 제공',
      sig: '시그니처(○): 자가진단 + 결과 화면 VIP 상담 우선 연동 + 원내 QR 연계',
      cost: '“내 증상 맞네” 확신을 주고 망설이는 환자를 예약 직전까지 리드'
    }
  }
];

var STYLE = '#smk-layer{position:fixed;inset:0;pointer-events:none;z-index:2147483000}' +
  '.smk{position:fixed;display:flex;flex-direction:column;gap:4px;padding:7px 11px;border-radius:13px;background:rgba(255,255,255,.98);box-shadow:0 6px 20px rgba(0,0,0,.26);pointer-events:auto;font-family:Pretendard,-apple-system,system-ui,sans-serif;color:#0B2418;border:1.5px solid #2D5A43;z-index:2147483000;max-width:320px}' +
  '.smk-title{font-size:11px;font-weight:900;color:#0B2418;letter-spacing:-.01em;padding-bottom:3px;border-bottom:1px dashed rgba(45,90,67,.25);white-space:nowrap}' +
  '.smk-row{display:flex;align-items:center;gap:7px;font-size:11px;font-weight:800;white-space:nowrap}' +
  '.smk-it{display:inline-flex;align-items:center;gap:3px}' +
  '.smk-it svg{width:11px;height:11px;display:block}' +
  '.smk-pro-btn{cursor:pointer;background:#FEF3C7;padding:2px 6px;border-radius:6px;border:1px solid #F59E0B;color:#92400E;transition:transform .12s,box-shadow .12s}' +
  '.smk-pro-btn:hover{transform:scale(1.06);box-shadow:0 2px 6px rgba(217,154,24,.35)}' +
  '#smk-diff-box{position:fixed;z-index:2147483010;max-width:330px;width:92%;background:#fff;border-radius:16px;padding:16px 15px 14px;box-shadow:0 12px 36px rgba(0,0,0,.35);border:1.5px solid #D99A18;font-family:Pretendard,-apple-system,system-ui,sans-serif;color:#142B20;line-height:1.45;pointer-events:auto;animation:smkPop .15s ease-out}' +
  '@keyframes smkPop{from{opacity:0;transform:scale(.94)}to{opacity:1;transform:scale(1)}}' +
  '.sdb-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}' +
  '.sdb-tag{font-size:10px;font-weight:900;background:#FEF3C7;color:#92400E;padding:3px 8px;border-radius:999px;border:1px solid #F59E0B}' +
  '.sdb-x{border:0;background:none;font-size:16px;cursor:pointer;color:#7A8D83;font-weight:900;line-height:1;padding:0 2px}' +
  '.sdb-title{font-size:13px;font-weight:900;color:#0B2418;margin-bottom:8px}' +
  '.sdb-body{font-size:11.5px;color:#31463C;margin-bottom:10px}' +
  '.sdb-p{margin-bottom:6px;line-height:1.4}' +
  '.sdb-p b{color:#0B2418}' +
  '.sdb-foot{font-size:10.5px;color:#5D7368;background:#F4F8F5;padding:6px 8px;border-radius:8px;border:1px solid #D4E5DC;margin-bottom:9px;line-height:1.4}' +
  '.sdb-close-btn{width:100%;border:0;background:#2D5A43;color:#fff;font-size:11.5px;font-weight:800;padding:7px;border-radius:8px;cursor:pointer}';

var frame = document.getElementById('frame');
document.cookie = 'bareun_sample=1; path=/; SameSite=Lax';

var qs = (location.search.match(/[?&]src=([a-z0-9\\-]+\\.html)(?:&tab=(qna))?/i) || []);
if (qs[1]) frame.src = qs[1] + '?sample=1' + (qs[2] ? '&tab=qna' : '');

function markHtml(m, idx) {
  return '<div class="smk-title">' + m.name + '</div>' +
    '<div class="smk-row">' +
      m.lv.map(function(k, i) {
        var isPro = (i === 1);
        var cls = isPro ? 'smk-it smk-pro-btn' : 'smk-it';
        var attr = isPro ? ' title="클릭하여 시그니처와 차이점 보기" data-idx="' + idx + '"' : '';
        return '<span class="' + cls + '"' + attr + '>' + TIER[i] + ICON[k] + '</span>';
      }).join('') +
    '</div>';
}

function vis(el, vw, vh) {
  var cs = el.ownerDocument.defaultView.getComputedStyle(el);
  if (cs.display === 'none' || cs.visibility === 'hidden' || parseFloat(cs.opacity) < 0.05) return null;
  var r = el.getBoundingClientRect();
  if (r.width < 30 || r.height < 20 || r.bottom < 20 || r.top > vh - 20 || r.right < 0 || r.left > vw) return null;
  return r;
}

function anyVis(d, sel, vw, vh) {
  var n = d.querySelectorAll(sel);
  for (var i = 0; i < n.length; i++) if (vis(n[i], vw, vh)) return true;
  return false;
}

function showDiff(d, idx, anchorR, vw, vh) {
  var m = MARKS[idx]; if (!m || !m.diff) return;
  var old = d.getElementById('smk-diff-box'); if (old) old.remove();
  var box = d.createElement('div'); box.id = 'smk-diff-box';
  box.innerHTML = '<div class="sdb-head"><span class="sdb-tag">★ 프로 vs ✦ 시그니처 차이점</span><button type="button" class="sdb-x" aria-label="닫기">✕</button></div>' +
    '<div class="sdb-title">' + m.name + '</div>' +
    '<div class="sdb-body">' +
      '<div class="sdb-p"><b>• ' + m.diff.pro + '</b></div>' +
      '<div class="sdb-p"><b>• ' + m.diff.sig + '</b></div>' +
    '</div>' +
    '<div class="sdb-foot">💡 ' + m.diff.cost + '</div>' +
    '<button type="button" class="sdb-close-btn">확인 (닫기)</button>';

  box.querySelector('.sdb-x').onclick = function(e) { e.stopPropagation(); box.remove(); };
  box.querySelector('.sdb-close-btn').onclick = function(e) { e.stopPropagation(); box.remove(); };
  d.getElementById('smk-layer').appendChild(box);

  var bw = box.offsetWidth || 320, bh = box.offsetHeight || 200;
  var top = anchorR.top + anchorR.height + 6;
  var left = Math.min(Math.max(anchorR.left, 10), vw - bw - 12);
  if (top + bh > vh - 10) top = Math.max(anchorR.top - bh - 8, 60);
  box.style.top = top + 'px'; box.style.left = left + 'px';
}

function tick() {
  var d; try { d = frame.contentDocument; if (!d || !d.body || d.readyState === 'loading') return; } catch (e) { return; }
  var w = frame.contentWindow, vw = w.innerWidth, vh = w.innerHeight;
  var layer = d.getElementById('smk-layer');
  if (!layer) {
    var st = d.createElement('style'); st.textContent = STYLE; d.head.appendChild(st);
    layer = d.createElement('div'); layer.id = 'smk-layer'; d.body.appendChild(layer);
    d.addEventListener('click', function(e) {
      var t = e.target.closest('.smk-pro-btn');
      if (t) {
        e.stopPropagation(); e.preventDefault();
        var idx = +t.getAttribute('data-idx');
        showDiff(d, idx, t.getBoundingClientRect(), vw, vh);
      } else if (!e.target.closest('#smk-diff-box')) {
        var old = d.getElementById('smk-diff-box'); if (old) old.remove();
      }
    });
  }
  var placed = [];
  MARKS.forEach(function(m, i) {
    var pill = d.getElementById('smk-' + i), r = null;
    if (!(m.when && !anyVis(d, m.when, vw, vh)) && !(m.unless && anyVis(d, m.unless, vw, vh))) {
      m.sel.split(',').forEach(function(s) { if (r) return; var n = d.querySelectorAll(s); for (var k = 0; k < n.length && !r; k++) r = vis(n[k], vw, vh); });
    }
    if (!r) { if (pill) pill.style.display = 'none'; return; }
    if (!pill) {
      pill = d.createElement('div'); pill.id = 'smk-' + i; pill.className = 'smk';
      pill.innerHTML = markHtml(m, i); layer.appendChild(pill);
    }
    pill.style.display = 'flex';
    var pw = pill.offsetWidth, ph = pill.offsetHeight;
    var top, left;
    if (m.pos === 'left' && r.left - pw - 10 > 8) { top = r.top + 10; left = r.left - pw - 10; }
    else { top = r.top - ph / 2; left = r.left + 14; }
    if (top < 64) top = 70; top = Math.min(top, vh - ph - 8); left = Math.min(Math.max(left, 8), vw - pw - 8);
    for (var q = 0; q < placed.length; q++) { var o = placed[q]; if (left < o.l + o.w + 4 && left + pw + 4 > o.l && top < o.t + o.h + 4 && top + ph + 4 > o.t) top = o.t + o.h + 6; }
    pill.style.top = top + 'px'; pill.style.left = left + 'px'; placed.push({ l: left, t: top, w: pw, h: ph });
  });
}
setInterval(tick, 250);

function openDiff(idx) {
  var d; try { d = frame.contentDocument; } catch(e) { return false; }
  if (!d) return false;
  var btn = d.querySelector('.smk-pro-btn[data-idx="' + idx + '"]');
  if (btn) {
    showDiff(d, +idx, btn.getBoundingClientRect(), frame.contentWindow.innerWidth, frame.contentWindow.innerHeight);
    return true;
  }
  return false;
}

var qd = (location.search.match(/[?&]diff=(\\d+)/) || [])[1];
if (qd !== undefined) {
  var diffTimer = setInterval(function() {
    if (openDiff(+qd)) clearInterval(diffTimer);
  }, 200);
  setTimeout(function() { clearInterval(diffTimer); }, 6000);
}

var tt;
window.addEventListener('message', function(e) {
  if (e.data && e.data.bareunSample === 'blocked') {
    var t = document.getElementById('toast');
    t.textContent = '샘플이라 저장·전송되지 않습니다. 실제 홈페이지에서는 정상 등록됩니다.';
    t.hidden = false; clearTimeout(tt); tt = setTimeout(function() { t.hidden = true; }, 2600);
  }
});
`;

const legend = `<span>${ICON_O}포함</span><span>${ICON_T}일부 (클릭 시 차이 안내)</span><span>${ICON_X}미포함</span>`;

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
  <nav class="bar-nav" aria-label="샘플 뷰 전환">
    <a href="sample.html" class="b-tab on">🌐 홈페이지 샘플</a>
    <a href="sample-studio.html" class="b-tab">🛠️ 커스텀 스튜디오 체험 (수정 TEST)</a>
  </nav>
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
console.log('✔ sample.html (기능 이름 표시 + 프로 세모 클릭 시 차이점 안내창) 생성 완료');
