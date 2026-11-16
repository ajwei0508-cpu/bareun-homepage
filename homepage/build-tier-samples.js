/**
 * 바른 메디테크 — 전체 둘러보기 샘플 셸 생성기 (sample.html)
 * 실제 운영 중인 www.bareunhaniwon.com 구조의 진짜 페이지(index / body-explorer / chuna / location)를
 * 읽기 전용(?sample=1)으로 iframe에 띄워 실제로 작동하는 모습을 보여 주고,
 * 기능별로 [기본 포함 / 프로 전용 / 시그니처 전용] 마크를 화면 위에 표시합니다.
 * 실행: node build-tier-samples.js
 */
const fs = require('fs');
const path = require('path');

const css = `
:root{--g:#2D5A43;--g2:#3D7357;--tint:#E8F2EC;--mint:#8FE0B0;--ink:#12261C;--hanji:#F5F1E8;--line:rgba(45,90,67,.16);--red:#B4412F;--coral:#E2603F}
*{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}
body{font-family:'Pretendard',-apple-system,system-ui,sans-serif;background:var(--hanji);color:var(--ink);line-height:1.6;word-break:keep-all}
a{color:inherit;text-decoration:none}
.tierbar{position:sticky;top:0;z-index:90;background:#0B2418;color:#fff;border-bottom:1px solid rgba(143,224,176,.35)}
.tb-in{max-width:1500px;margin:0 auto;padding:9px 16px;display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.tb-badge{font-size:11.5px;font-weight:900;letter-spacing:.06em;padding:5px 12px;border-radius:999px;background:linear-gradient(135deg,#8FE0B0,#3FAE78);color:#0B2418}
.tb-sw{display:flex;gap:3px;background:rgba(255,255,255,.08);padding:3px;border-radius:999px;flex-wrap:wrap}
.tb-sw button{font-family:inherit;border:0;cursor:pointer;background:transparent;font-size:12.5px;font-weight:800;padding:6px 13px;border-radius:999px;color:rgba(255,255,255,.75)}
.tb-sw button.on{background:var(--mint);color:#0B2418}
.tb-cnt{font-size:12.5px;font-weight:700;color:rgba(255,255,255,.85)}.tb-cnt b{color:var(--mint);font-size:15px}.tb-cnt b.o{color:#FFB39F}
.tb-back{margin-left:auto;font-size:12.5px;font-weight:700;color:rgba(255,255,255,.75)}
.tb-leg{max-width:1500px;margin:0 auto;padding:0 16px 9px;display:flex;gap:8px;flex-wrap:wrap;align-items:center;font-size:11.5px;color:rgba(255,255,255,.72)}
.chip{display:inline-block;font-size:11px;font-weight:900;padding:3px 10px;border-radius:999px}
.chip.c0{background:#E8F2EC;color:#2D5A43;border:1px solid #B9D7C6}
.chip.c1{background:#FEF3C7;color:#92400E;border:1px solid #F59E0B}
.chip.c2{background:linear-gradient(135deg,#0B2418,#1F5A3F);color:#8FE0B0;border:1px solid #8FE0B0}
.chip.c0::before{content:"✓ "}.chip.c1::before{content:"★ "}.chip.c2::before{content:"✦ "}
.ptabs{max-width:1500px;margin:0 auto;padding:12px 16px 0;display:flex;gap:8px;flex-wrap:wrap}
.ptabs button{font-family:inherit;border:1.5px solid var(--line);background:#fff;color:#1F3A2D;font-weight:800;font-size:13px;padding:10px 16px;border-radius:14px;cursor:pointer}
.ptabs button.on{background:var(--g);color:#fff;border-color:var(--g);box-shadow:0 8px 20px rgba(45,90,67,.25)}
.stage{max-width:1500px;margin:0 auto;padding:12px 16px 24px;display:grid;grid-template-columns:1fr 300px;gap:14px;align-items:start}
@media(max-width:1000px){.stage{grid-template-columns:1fr}}
.frame-wrap{position:relative;border-radius:18px;overflow:hidden;border:1px solid var(--line);background:#fff;box-shadow:0 18px 44px rgba(15,42,30,.14)}
iframe#frame{display:block;width:100%;height:calc(100vh - 190px);min-height:560px;border:0;background:#F5F1E8}
.frame-note{position:absolute;left:12px;bottom:12px;background:rgba(11,36,24,.92);color:#fff;font-size:12px;font-weight:700;padding:8px 14px;border-radius:999px;pointer-events:none;max-width:90%}
.side{background:#fff;border:1px solid var(--line);border-radius:18px;padding:18px;position:sticky;top:130px}
@media(max-width:1000px){.side{position:static}}
.side h3{font-size:1.02rem;margin-bottom:4px}.side .how{font-size:.86rem;color:#41524A;margin-bottom:12px}
.mk-list{display:grid;gap:8px}
.mk-i{display:block;width:100%;text-align:left;font-family:inherit;border:1px solid var(--line);background:#FAFCFB;border-radius:12px;padding:10px 12px;cursor:pointer}
.mk-i b{display:block;font-size:.88rem;margin-bottom:5px;color:#0B2418}.mk-i .chip{margin-right:4px}
.mk-i.bey{background:#FFF1EE;border-color:#EBC5BB}.mk-i .lk{display:none;font-size:11px;font-weight:800;color:#B4412F;margin-top:4px}.mk-i.bey .lk{display:block}
.acts{display:flex;flex-wrap:wrap;gap:6px;margin-top:12px}
.act{font-family:inherit;border:1.5px solid var(--g);background:#fff;color:var(--g);font-weight:800;font-size:12px;padding:8px 12px;border-radius:999px;cursor:pointer}
.act.pri{background:var(--g);color:#fff}
.side .tip{margin-top:12px;font-size:11.5px;color:#6B7D72;line-height:1.5}
/* 도구 패널 */
.frame-wrap,.tools{grid-column:1;grid-row:1}
.side{grid-column:2;grid-row:1}
.tools{display:grid;gap:14px}
@media(max-width:1000px){.frame-wrap,.tools,.side{grid-column:auto;grid-row:auto}}
.tools[hidden]{display:none}
.tp{background:#fff;border:1px solid var(--line);border-radius:18px;padding:22px 20px 18px;position:relative}
.tp>.rib{position:absolute;top:12px;right:12px;font-family:inherit;border:0;cursor:pointer;font-size:11.5px;font-weight:900;padding:5px 12px;border-radius:999px}
.tp.t0 .rib{background:#E8F2EC;color:#2D5A43;border:1px solid #B9D7C6}.tp.t1 .rib{background:#FEF3C7;color:#92400E;border:1px solid #F59E0B}.tp.t2 .rib{background:linear-gradient(135deg,#0B2418,#1F5A3F);color:#8FE0B0;border:1px solid #8FE0B0}
.tp.t0 .rib::before{content:"✓ "}.tp.t1 .rib::before{content:"★ "}.tp.t2 .rib::before{content:"✦ "}
.tp.beyond{outline:2px dashed var(--coral);outline-offset:-2px}.tp.beyond .rib{background:linear-gradient(135deg,#FF9C7E,#E2603F);color:#fff;border:0}.tp.beyond .rib::before{content:"🔒 "}
.tp h3{font-size:1.04rem;margin-bottom:8px;padding-right:110px}.tp p.fine{font-size:12px;color:#6B7D72;margin-top:8px}
.tp textarea{width:100%;padding:11px 13px;border-radius:12px;border:1px solid #CFE0D5;font-family:inherit;font-size:14px;background:#FAFCFB}
.lawbox{margin-top:8px;padding:10px 12px;border-radius:12px;font-size:.88rem;background:#F6FAF7;border:1px solid #CFE0D5;min-height:42px}.lawbox.bad{background:#FFF1EE;border-color:#EBC5BB}.lawbox mark{background:#FFC9BC;color:#8A2B18;border-radius:4px;padding:0 3px}
.lawout{margin-top:10px;padding:12px 14px;border-radius:12px;background:var(--tint);border:1px solid #B9D7C6;font-size:.9rem;color:#14392A}
.mini{font-family:inherit;margin-top:10px;border:1.5px solid var(--g);background:#fff;color:var(--g);font-weight:800;font-size:12.5px;padding:8px 14px;border-radius:999px;cursor:pointer}.mini.gold{background:linear-gradient(135deg,#8FE0B0,#3FAE78);border-color:transparent;color:#0B2418}
.tgrid{display:grid;grid-template-columns:1fr 1fr;gap:14px}@media(max-width:760px){.tgrid{grid-template-columns:1fr}}
.cardsx{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:10px}
.cx{border:1px solid var(--line);border-radius:12px;padding:12px;font-size:.84rem;font-weight:800;background:#FAFCFB}.cx small{display:block;font-weight:600;color:#6B7D72}
.cx.new{background:var(--tint);border-style:dashed}
.addtile{border:2px dashed var(--g2);background:var(--tint);border-radius:12px;cursor:pointer;font-family:inherit;padding:12px;font-weight:900;color:var(--ink)}
.qrbox{display:flex;gap:18px;align-items:center;flex-wrap:wrap;margin-top:6px}
.qr{display:grid;grid-template-columns:repeat(11,1fr);width:120px;height:120px;background:#fff;padding:7px;border-radius:12px;border:1px solid var(--line)}.qr i.k{background:#0B2418}
.qrbox p{flex:1;min-width:200px;font-size:.9rem;color:#41524A}
.stat-grid{display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:12px}@media(max-width:860px){.stat-grid{grid-template-columns:1fr}}
.st{background:#0B2418;color:#fff;border-radius:14px;padding:14px}.st small{color:var(--mint);font-weight:800}.st ul{list-style:none;margin-top:6px}.st li{display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px dashed rgba(255,255,255,.2);font-size:.88rem}
.bars{display:flex;align-items:flex-end;gap:5px;height:110px;margin-top:10px}.bars i{flex:1;background:linear-gradient(180deg,#8FE0B0,#2D5A43);border-radius:4px 4px 0 0}
.popup{display:none;background:#C2701F;color:#fff;text-align:center;font-weight:800;padding:10px;font-size:.9rem}.popup.on{display:block}
.cta{padding:70px 16px;background:linear-gradient(160deg,#0B2418,#14452F);color:#fff;text-align:center}
.cta h2{font-size:clamp(1.4rem,3.2vw,2rem);font-weight:900;margin:6px 0 10px}.cta .eyebrow{font-size:11.5px;font-weight:900;letter-spacing:.08em;color:var(--mint)}
.cta .lead{max-width:760px;margin:0 auto;color:rgba(255,255,255,.85)}
.tiers{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;max-width:900px;margin:22px auto}@media(max-width:760px){.tiers{grid-template-columns:1fr}}
.tr{padding:18px;border-radius:18px;background:rgba(255,255,255,.07);border:1px solid rgba(143,224,176,.35);text-align:left}.tr small{color:var(--mint);font-weight:900}.tr b{display:block;font-size:1.3rem}.tr span{font-size:.85rem;opacity:.75}
.btn{display:inline-flex;align-items:center;justify-content:center;border:0;cursor:pointer;font-family:inherit;font-weight:900;font-size:14.5px;padding:13px 24px;border-radius:999px;background:var(--g);color:#fff}.btn.gold{background:linear-gradient(135deg,#8FE0B0,#3FAE78);color:#0B2418}.btn.line{background:transparent;border:1.5px solid rgba(255,255,255,.6);color:#fff}
.cta-row{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-top:18px}
.cta .fine{font-size:12px;color:rgba(255,255,255,.6);margin-top:12px}
.modal{position:fixed;inset:0;z-index:2147483600;background:rgba(5,18,12,.7);display:grid;place-items:center;padding:20px}.modal[hidden]{display:none}
.m-card{position:relative;background:#fff;border-radius:24px;max-width:520px;width:100%;padding:30px 28px;box-shadow:0 30px 70px rgba(0,0,0,.4)}
.m-x{position:absolute;right:14px;top:12px;border:0;background:none;font-size:20px;cursor:pointer}.m-card small{font-weight:900;color:var(--red);font-size:12px}
.m-card h3{font-size:1.3rem;margin:4px 0 8px}.m-card p{color:#41524A;font-size:.97rem}
.m-diff{margin:14px 0;padding:12px 14px;border-radius:12px;background:var(--tint);border:1px solid #B9D7C6;font-size:.88rem;color:#14392A}
.m-btns{display:flex;gap:8px;flex-wrap:wrap}.m-card .btn.line{border-color:var(--g);color:var(--g)}
.toast{position:fixed;left:50%;bottom:24px;transform:translateX(-50%);background:#0B2418;color:#fff;padding:12px 20px;border-radius:999px;z-index:2147483600;font-size:.9rem;font-weight:700;max-width:92vw}.toast[hidden]{display:none}
`;

const js = `
var TIER=['스탠다드','프로페셔널','시그니처'],BUILD=[790000,1490000,1890000],MO=[19900,55000,99000];
var INFO={
 storyboard:{n:'환자 스토리보드 12컷 오프닝',min:1,why:'검색으로 들어온 환자가 “아, 내 얘기네” 하고 끝까지 스크롤하게 만드는 오프닝입니다. 체류 시간이 길어질수록 예약 버튼까지 가는 환자가 늘어납니다.'},
 checkpoint:{n:'질환별 체크포인트(자가진단)',min:1,why:'“내 증상이 여기 해당하나?” 5문항 체크 후 결과 화면에서 바로 상담으로 이어집니다. 망설이는 환자를 예약 직전까지 데려가는 장치입니다.'},
 qna:{n:'1:1 “무엇이든 물어보세요” Q&A',min:1,why:'전화하기 부담스러운 환자가 비공개로 질문을 남기고, 답변이 쌓여 다른 환자의 의심까지 풀어 줍니다. 비급여 진료일수록 이 “질문 창구”가 신환 전환의 열쇠입니다.'},
 columnsAuto:{n:'건강 칼럼 — 프로 월 8건(텍스트) / 시그니처 월 15건 + 3단 화보',min:1,why:'원장님이 글을 쓰지 않아도 의료법 검수를 거친 칼럼이 올라옵니다. 프로는 월 8건 텍스트, 시그니처는 월 15건에 상·중·하 3단 맞춤 화보까지 자동 발행됩니다. 검색에 걸리는 “입구”가 매달 늘어납니다.'},
 lawWarn:{n:'AI 의료법 금지어 경고 · 계절 팝업 템플릿',min:1,why:'“완치·100%·최고” 같은 표현을 쓰는 순간 경고가 뜹니다. 과태료·신고 걱정을 줄여 줍니다.'},
 body3d:{n:'풀스크린 3D 인체모형 · 모션',min:2,why:'환자가 아픈 부위를 직접 돌려 보며 이해하는 체험형 화면입니다. “3분 공장식 진료가 아닌 원장 1:1 심층 진료”라는 인상을 눈으로 전달해 비급여 진료의 가치를 설득합니다.'},
 stats:{n:'마스터 전용 상세 통계 센터',min:2,why:'어느 플랫폼에서, 몇 시에, 어떤 페이지를 보고, 어떤 예약 버튼을 눌렀는지 한눈에 봅니다. 광고비를 감이 아니라 숫자로 결정하게 됩니다.'},
 cardsUnlimited:{n:'질환 카드 페이지 무제한 증설 (증설비 0원)',min:2,why:'새 진료(탈모·다이어트·성장·공진단…)를 시작할 때마다 원장님이 직접 카드 페이지를 추가합니다. 추가 제작비·대기 시간이 없습니다.'},
 aiLaw:{n:'의료법 AI 합법 대체 문구 자동 작성',min:2,why:'금지어를 감지(프로)하는 데서 그치지 않고, 의료법에 맞는 문장으로 AI가 바로 고쳐 줍니다.'},
 photo:{n:'원장님 사진 기반 인물 고정 화보 생성',min:2,why:'원장님 얼굴이 일관되게 들어간 고급 화보를 칼럼·카드에 직접 만듭니다. 촬영 비용 없이 “이 원장님이 직접 진료한다”는 신뢰를 줍니다.'},
 qrPop:{n:'대기실 QR 자가진단 POP · VIP 최우선 착수',min:2,why:'대기실 포스터의 QR로 환자가 기다리는 동안 자가진단을 하고, 추가 진료 상담으로 이어집니다. 이미 내원한 환자의 “추가 비급여” 문의를 만드는 장치입니다.'},
 cardsBase:{n:'6대 진료 카드 · 카드 첫장 셀프 수정',min:0,why:'환자가 가장 먼저 만나는 진료 카드입니다. 제목·소개·체크리스트·이미지를 원장님이 직접 고칩니다. 모든 단계에 기본 포함입니다.'},
 reserve:{n:'예약·상담 (전화·카톡·네이버예약 고정 바)',min:0,why:'마음이 선 순간 놓치지 않도록 전화·카톡·네이버예약 3버튼이 항상 눈앞에 있습니다. 모든 단계에 기본 포함입니다.'},
 hours:{n:'진료시간·휴진·4대 내비 길안내',min:0,why:'진료시간과 임시 휴진 공지는 원장님이 직접 수정하고, 네이버·구글·티맵·카카오맵 4대 내비로 원클릭 길안내가 됩니다. 모든 단계에 기본 포함입니다.'},
 greet:{n:'대표원장 인사말 · 임시 휴진 공지 배너',min:0,why:'환영 인사말과 임시 휴진·명절 공지를 원장님이 직접 수정합니다. 모든 단계에 기본 포함입니다.'},
 fees:{n:'비급여 진료비용 고지 (의료법 제45조)',min:0,why:'비급여 수가표를 정리해 공개하면 환자의 가격 불안이 사라지고 문의 문턱이 낮아집니다. 직접 수정할 수 있고 모든 단계에 기본 포함입니다.'}
};
var CHIP={base:[{t:0,x:'기본 포함'}],ps:[{t:1,x:'프로'},{t:2,x:'시그니처'}],s:[{t:2,x:'시그니처 전용'}],col:[{t:1,x:'프로 · 월 8건 텍스트'},{t:2,x:'시그니처 · 월 15건 + 3단 화보'}]};
var PAGES=[
 {name:'① 홈 · 스토리보드 · 6대 진료카드',src:'index.html?sample=1',
  how:'실제 홈페이지입니다. 스크롤하면 환자 스토리가 이어지고, 끝나면 6대 진료 카드가 펼쳐집니다. 화면 위 마크를 눌러 보세요.',
  marks:[
   {key:'storyboard',sel:'#daddy-doc-intro-stage,#story-dialogue-stage',name:'환자 스토리보드 오프닝',chips:CHIP.ps},
   {key:'cardsBase',sel:'#skt-bento-grid',name:'6대 진료 카드 (첫장 셀프 수정)',chips:CHIP.base,hit:1},
   {key:'body3d',sel:'a[href="body-explorer.html"]',name:'3D 진료 살펴보기',chips:CHIP.s,pos:'below'},
   {key:'qna',sel:'a[href*="tab=qna"]',name:'무엇이든 물어보세요',chips:CHIP.ps,pos:'below'},
   {key:'reserve',sel:'#btn-open-reserve',name:'예약·상담',chips:CHIP.base,pos:'below'}
  ],
  acts:[{t:'6대 진료카드로 바로 가기',sel:'#btn-show-skt-cards',pri:1},{t:'↑ 스토리 다시 보기',sel:'#btn-back-to-story'}]},
 {name:'② 3D 인체모형 · 건강 칼럼',src:'body-explorer.html?sample=1',
  how:'아픈 부위의 점을 눌러 3D 인체모형을 돌려 보고, 오른쪽 “진료 살펴보기” 메뉴에서 건강 칼럼을 열어 보세요.',
  marks:[
   {key:'body3d',sel:'#vibrant-3d-stage',name:'풀스크린 3D 인체모형 · 모션',chips:CHIP.s},
   {key:'columnsAuto',sel:'#encyclopedia-scroll-panel',name:'오늘의 건강 칼럼',chips:CHIP.col},
   {key:'columnsAuto',sel:'#vh-part-quicknav',name:'진료 살펴보기 (칼럼 아카이브)',chips:CHIP.col,pos:'above'}
  ],
  acts:[{t:'첫 번째 칼럼 열기',sel:'.vh-part-chip',pri:1},{t:'근육 모드',sel:'#btn-sys-muscle'},{t:'관절 모드',sel:'#btn-sys-joint'}]},
 {name:'③ 무엇이든 물어보세요 (Q&A)',src:'body-explorer.html?sample=1&tab=qna',
  how:'환자가 비공개로 1:1 질문을 남기는 게시판입니다. 샘플에서는 등록해도 저장되지 않습니다.',
  marks:[
   {key:'qna',sel:'#encyclopedia-scroll-panel',name:'1:1 Q&A 게시판',chips:CHIP.ps},
   {key:'body3d',sel:'#vibrant-3d-stage',name:'3D 인체모형 (배경)',chips:CHIP.s}
  ],acts:[]},
 {name:'④ 질환 상세 첫장 · 체크포인트',src:'chuna.html?sample=1',
  how:'질환 카드를 누르면 열리는 상세 페이지입니다. 왼쪽 자가진단 체크리스트를 눌러 보세요.',
  marks:[
   {key:'cardsBase',sel:'#project-details-meta',name:'질환 카드 첫장 (셀프 수정)',chips:CHIP.base,pos:'right'},
   {key:'checkpoint',sel:'#empathy-diagnosis-box,#empathy-checklist-list',name:'체크포인트(5문항 자가진단)',chips:CHIP.ps,pos:'right'},
   {key:'reserve',sel:'#project-details-launch-cta',name:'상담 예약 버튼',chips:CHIP.base,pos:'right'}
  ],acts:[]},
 {name:'⑤ 오시는길 · 비급여 안내',src:'location.html?sample=1',
  how:'진료시간, 4대 내비 길안내, 비급여 진료비용 고지가 한곳에 정리된 페이지입니다.',
  marks:[
   {key:'greet',sel:'.greeting-hero',name:'원장 인사말 · 휴진 공지 배너',chips:CHIP.base},
   {key:'body3d',sel:'#header a[href*="body-explorer"]',name:'3D 인체모형 · 건강백과',chips:CHIP.s,pos:'below'},
   {key:'hours',sel:'#loc-hours-list',name:'진료시간 · 휴진 (셀프 수정)',chips:CHIP.base},
   {key:'fees',sel:'#non-covered-fees',name:'비급여 고지 (의료법 제45조)',chips:CHIP.base},
   {key:'hours',sel:'#regional-directions',name:'4대 내비 · 지역별 오시는길',chips:CHIP.base,pos:'above'}
  ],acts:[]},
 {name:'⑥ 셀프 도구 · 통계',src:null,tools:true,
  how:'원장님이 직접 쓰는 도구들입니다. 모두 눌러서 체험해 볼 수 있습니다.',
  marks:[
   {key:'cardsUnlimited',name:'질환 카드 무제한 증설',chips:CHIP.s},
   {key:'lawWarn',name:'금지어 경고 · 계절 팝업',chips:[{t:1,x:'프로'},{t:2,x:'시그니처'}]},
   {key:'aiLaw',name:'합법 문구 자동 다듬기',chips:CHIP.s},
   {key:'photo',name:'원장님 화보 AI 생성',chips:CHIP.s},
   {key:'qrPop',name:'대기실 QR 자가진단 POP',chips:CHIP.s},
   {key:'stats',name:'마스터 상세 통계 센터',chips:CHIP.s}
  ],acts:[]}
];
var view=-1,cur=0,frame=document.getElementById('frame'),modal=document.getElementById('modal');
function won(n){return Math.round(n).toLocaleString('ko-KR')+'원';}
function diff(v){if(v<0||v>=2)return '';var b=BUILD[2]-BUILD[v],m=MO[2]-MO[v];return TIER[v]+' 기준으로 시그니처는 구축비 +'+won(b)+'(VAT 별도), 월 케어 +'+won(m)+'(VAT 포함) — 하루 약 '+won(m/30)+' 차이입니다.';}
function chipsHtml(ch){return ch.map(function(c){return '<span class="chip c'+c.t+'">'+c.x+'</span>';}).join(' ');}
function minOf(key){return INFO[key]?INFO[key].min:0;}
function beyond(key){return view>=0&&minOf(key)>view;}
window.openInfo=function(key){var f=INFO[key];if(!f)return;
  document.getElementById('mTier').textContent=TIER[f.min]+(f.min===0?'부터 기본 포함':' 이상 기능')+(view>=0&&f.min>view?' · 지금 보고 계신 '+TIER[view]+' 범위에는 없습니다':'');
  document.getElementById('mTitle').textContent=f.n;document.getElementById('mWhy').textContent=f.why;
  document.getElementById('mDiff').textContent=diff(view)||'스탠다드 79만 원 · 프로페셔널 149만 원 · 시그니처 189만 원 (구축비 VAT 별도)';modal.hidden=false;};
document.addEventListener('click',function(e){if(e.target===modal||e.target.id==='mX')modal.hidden=true;});
document.addEventListener('keydown',function(e){if(e.key==='Escape')modal.hidden=true;});
var tt;function toast(m){var t=document.getElementById('toast');t.textContent=m;t.hidden=false;clearTimeout(tt);tt=setTimeout(function(){t.hidden=true;},2800);}window.toast=toast;
window.addEventListener('message',function(e){if(e.data&&e.data.bareunSample==='blocked')toast('샘플이라 저장·전송되지 않습니다. 실제 사이트에서는 정상 등록됩니다.');});

/* 전체 기능 카운트 */
function counts(){var keys=Object.keys(INFO),i=0,o=0;keys.forEach(function(k){if(view>=0&&INFO[k].min>view)o++;else i++;});return [i,o];}
function applyView(){
  var c=counts();document.getElementById('cntIn').textContent=c[0];document.getElementById('cntOut').textContent=c[1];
  document.getElementById('cntTxt').style.display=view<0?'none':'';
  document.querySelectorAll('.tb-sw button').forEach(function(b){b.classList.toggle('on',+b.dataset.v===view);});
  document.getElementById('ctaDiff').textContent=diff(view);
  document.querySelectorAll('.tp').forEach(function(p){p.classList.toggle('beyond',beyond(p.dataset.key));});
  renderSide();
  try{history.replaceState(null,'',view<0?location.pathname:location.pathname+'?view='+['standard','professional','signature'][view]);}catch(e){}
}
document.querySelectorAll('.tb-sw button').forEach(function(b){b.addEventListener('click',function(){view=+b.dataset.v;applyView();});});

/* 탭 */
var tabs=document.getElementById('ptabs');
PAGES.forEach(function(p,i){var b=document.createElement('button');b.type='button';b.textContent=p.name;b.addEventListener('click',function(){go(i);});tabs.appendChild(b);});
function go(i){cur=i;var p=PAGES[i];
  [].slice.call(tabs.children).forEach(function(b,j){b.classList.toggle('on',j===i);});
  document.querySelector('.frame-wrap').style.display=p.tools?'none':'';
  document.getElementById('tools').hidden=!p.tools;
  if(!p.tools){document.getElementById('frameNote').textContent='실제 운영 중인 페이지입니다 · 직접 눌러 보세요 (읽기 전용)';frame.src=p.src;}
  renderSide();}
function renderSide(){var p=PAGES[cur];
  document.getElementById('sideTitle').textContent=p.name;document.getElementById('sideHow').textContent=p.how;
  var L=document.getElementById('sideList');L.innerHTML='';
  p.marks.forEach(function(m){var b=document.createElement('button');b.type='button';b.className='mk-i'+(beyond(m.key)?' bey':'');
    b.innerHTML='<b>'+m.name+'</b>'+chipsHtml(m.chips)+'<span class="lk">🔒 '+(view>=0?TIER[view]:'')+'에는 포함되지 않은 기능입니다</span>';
    b.addEventListener('click',function(){openInfo(m.key);});L.appendChild(b);});
  var A=document.getElementById('sideAct');A.innerHTML='';
  (p.acts||[]).forEach(function(a){var b=document.createElement('button');b.type='button';b.className='act'+(a.pri?' pri':'');b.textContent=a.t;
    b.addEventListener('click',function(){try{var d=frame.contentDocument,el=d.querySelector(a.sel);if(el)el.click();else toast('아직 이 버튼이 나타나지 않았어요. 화면을 조금 더 진행해 보세요.');}catch(e){toast('이 환경에서는 버튼 제어를 사용할 수 없습니다.');}});A.appendChild(b);});
}

/* 화면 위 마크(iframe 내부, 동일 출처) */
var STYLE='#smk-layer{position:fixed;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:2147483000;font-family:Pretendard,-apple-system,system-ui,sans-serif}'+
'.smk{position:fixed;display:flex;align-items:center;gap:5px;flex-wrap:wrap;max-width:300px;padding:7px 10px;border-radius:14px;background:rgba(255,255,255,.97);border:1.5px solid #3FAE78;box-shadow:0 8px 22px rgba(0,0,0,.3);pointer-events:auto;cursor:pointer;font-size:12px;font-weight:800;color:#0B2418;line-height:1.3}'+
'.smk b{font-weight:900;margin-right:2px}.smk i{font-style:normal;font-size:11px;font-weight:900;padding:3px 9px;border-radius:999px;white-space:nowrap}'+
'.smk .c0{background:#E8F2EC;color:#2D5A43;border:1px solid #B9D7C6}.smk .c1{background:#FEF3C7;color:#92400E;border:1px solid #F59E0B}.smk .c2{background:linear-gradient(135deg,#0B2418,#1F5A3F);color:#8FE0B0;border:1px solid #8FE0B0}'+
'.smk .c0:before{content:"✓ "}.smk .c1:before{content:"★ "}.smk .c2:before{content:"✦ "}'+
'.smk.bey{border-color:#E2603F;background:#FFF1EE}.smk .lk{display:none;background:#E2603F;color:#fff;border-radius:999px;padding:3px 9px;font-size:11px}.smk.bey .lk{display:inline-block}';
function visible(el,vw,vh){var cs=el.ownerDocument.defaultView.getComputedStyle(el);if(cs.display==='none'||cs.visibility==='hidden'||parseFloat(cs.opacity)<0.05)return null;var r=el.getBoundingClientRect();if(r.width<30||r.height<20)return null;if(r.bottom<20||r.top>vh-20||r.right<0||r.left>vw)return null;return r;}
function tick(){
  var p=PAGES[cur];if(p.tools)return;var d;
  try{d=frame.contentDocument;if(!d||!d.body||d.readyState==='loading')return;}catch(e){document.getElementById('frameNote').textContent='이 환경에서는 화면 위 마크를 표시할 수 없어요 · 오른쪽 목록을 참고하세요';return;}
  var w=frame.contentWindow,vw=w.innerWidth,vh=w.innerHeight;
  var layer=d.getElementById('smk-layer');
  if(!layer){var st=d.createElement('style');st.textContent=STYLE;d.head.appendChild(st);layer=d.createElement('div');layer.id='smk-layer';d.body.appendChild(layer);}
  var placed=[];
  p.marks.forEach(function(m,i){
    var id='smk-'+i,pill=d.getElementById(id),el=null,r=null,nodes=d.querySelectorAll(m.sel);
    for(var k=0;k<nodes.length;k++){var rr=visible(nodes[k],vw,vh);if(rr&&m.hit){var tp=d.elementFromPoint(Math.min(Math.max(rr.left+rr.width/2,1),vw-2),Math.min(Math.max(rr.top+rr.height/2,1),vh-2));if(!tp||!nodes[k].contains(tp))rr=null;}if(rr){el=nodes[k];r=rr;break;}}
    if(!r){if(pill)pill.style.display='none';return;}
    if(!pill){pill=d.createElement('div');pill.id=id;pill.className='smk';pill.innerHTML='<b>'+m.name+'</b>'+m.chips.map(function(c){return '<i class="c'+c.t+'">'+c.x+'</i>';}).join('')+'<i class="lk"></i>';
      pill.addEventListener('click',function(ev){ev.stopPropagation();ev.preventDefault();parent.openInfo(m.key);});layer.appendChild(pill);}
    pill.style.display='flex';
    var bey=beyond(m.key);pill.classList.toggle('bey',bey);pill.querySelector('.lk').textContent=bey?'🔒 '+TIER[view]+'에는 없음':'';
    var pw=pill.offsetWidth,ph=pill.offsetHeight,top,left;
    if(m.pos==='below'){top=r.bottom+6;left=r.left+r.width/2-pw/2;}
    else if(m.pos==='above'){top=r.top-ph-8;left=r.right-pw;}
    else if(m.pos==='right'){top=r.top+8;left=r.right+12;}
    else{top=r.top+10;left=r.left+10;}
    top=Math.min(Math.max(top,64),vh-ph-8);left=Math.min(Math.max(left,8),vw-pw-8);
    for(var q=0;q<placed.length;q++){var o=placed[q];if(left<o.l+o.w+4&&left+pw+4>o.l&&top<o.t+o.h+4&&top+ph+4>o.t){top=o.t+o.h+6;}}
    top=Math.min(top,vh-ph-8);
    pill.style.top=top+'px';pill.style.left=left+'px';placed.push({l:left,t:top,w:pw,h:ph});
  });
}
setInterval(tick,220);

/* ⑥ 도구 */
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
document.querySelectorAll('.tp .rib').forEach(function(b){b.addEventListener('click',function(){openInfo(b.closest('.tp').dataset.key);});});
var added=0;document.getElementById('addCard').addEventListener('click',function(){added++;var a=document.createElement('div');a.className='cx new';a.innerHTML='<span></span><small>원장님이 직접 만든 새 진료 카드</small>';a.querySelector('span').textContent='새 질환 카드 '+added;document.getElementById('cardsx').insertBefore(a,document.getElementById('addCard'));toast('카드 '+(6+added)+'개째 — 시그니처는 증설비 0원, 무제한입니다.');});
var BAD=/(완치|100\\s?%|최고|유일|보장|특효|무조건|부작용\\s?없|1위|할인|이벤트)/g;
var law=document.getElementById('dLaw'),box=document.getElementById('lawBox');
function checkLaw(){var t=law.value,h=t.match(BAD);if(h&&h.length){box.className='lawbox bad';box.innerHTML='⚠️ 의료법 제56조 위반 소지 표현 <b>'+h.length+'개</b> 감지<br>'+esc(t).replace(BAD,'<mark>$1</mark>');}else{box.className='lawbox';box.innerHTML='✅ 감지된 금지어가 없습니다.';}}
law.addEventListener('input',checkLaw);checkLaw();
var used=0,MAXU=2;
document.getElementById('lawFix').addEventListener('click',function(){var out=document.getElementById('lawOut');out.hidden=false;
  if(used>=MAXU){out.innerHTML='🔒 '+MAXU+'회 체험이 끝났습니다. 시그니처에서는 횟수 제한 없이 문장 전체를 의료법에 맞게 AI가 다시 써 드립니다.';return;}
  used++;var rs=softenKo(law.value),t=rs.changed?rs.text:'고칠 표현이 없어 그대로 사용하실 수 있습니다. '+law.value;
  out.innerHTML='✨ <b>합법 문구 제안 ('+used+'/'+MAXU+'회 체험)</b><br>'+esc(t)+'<br><small style="opacity:.7">※ 체험용 간이 규칙입니다. 실제 시그니처 AI는 문장 전체를 새로 씁니다. 최종 책임은 원장님 감수에 있습니다.</small>';});
document.getElementById('seasonBtn').addEventListener('click',function(){var p=document.getElementById('popup');p.classList.toggle('on');p.textContent='🍂 가을·환절기 면역 케어 안내 — 상담 예약 받습니다 (계절 팝업 템플릿 샘플)';toast(p.classList.contains('on')?'페이지 맨 위에 계절 팝업이 적용되었습니다.':'계절 팝업을 껐습니다.');});
document.getElementById('photoBtn').addEventListener('click',function(){toast('샘플: 원장님 사진 1장 업로드 → 인물 고정 화보 3장 자동 생성 (실제 사이트에서 동작)');});
(function(){var qr=document.getElementById('qr'),h=0,s='';for(var i=0;i<121;i++){var r=Math.floor(i/11),c=i%11,corner=(r<3&&c<3)||(r<3&&c>7)||(r>7&&c<3);h=(h*31+i*7+13)%97;var k=corner?!((r===1&&c===1)||(r===1&&c===9)||(r===9&&c===1)):(h%3===0);s+='<i'+(k?' class="k"':'')+'></i>';}qr.innerHTML=s;})();

var qv=(location.search.match(/view=(standard|professional|signature)/)||[])[1];if(qv)view=['standard','professional','signature'].indexOf(qv);
var qp=(location.search.match(/page=(\\d)/)||[])[1];
go(qp?+qp:0);applyView();
`;

const bars = [34, 41, 38, 52, 47, 63, 58, 71, 66, 80, 76, 92, 88, 104];
const html = `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex, nofollow">
<title>[샘플] 전체 둘러보기 — www.bareunhaniwon.com 실제 작동 화면 | 바른 메디테크</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css">
<style>${css}</style>
</head>
<body>
<div class="tierbar">
  <div class="tb-in">
    <span class="tb-badge">FULL SAMPLE · 실제 작동 화면</span>
    <nav class="tb-sw" aria-label="범위 보기">
      <button type="button" data-v="-1" class="on">전체 보기</button>
      <button type="button" data-v="0">스탠다드 범위</button>
      <button type="button" data-v="1">프로 범위</button>
      <button type="button" data-v="2">시그니처 범위</button>
    </nav>
    <span class="tb-cnt" id="cntTxt" style="display:none">이 범위 기능 <b id="cntIn">0</b>개 · 상위 단계 전용 <b class="o" id="cntOut">0</b>개</span>
    <a class="tb-back" href="b2b-landing.html#samples">← 안내 페이지로</a>
  </div>
  <div class="tb-leg"><span>화면 위 마크:</span><span class="chip c0">기본 포함</span><span class="chip c1">프로 전용</span><span class="chip c2">시그니처 전용</span><span>· 아래 탭에서 실제 www.bareunhaniwon.com 화면을 넘나들며, 마크를 누르면 기능 설명이 열립니다.</span></div>
</div>
<div class="popup" id="popup"></div>
<nav class="ptabs" id="ptabs" aria-label="샘플 화면 선택"></nav>
<div class="stage">
  <div class="frame-wrap">
    <iframe id="frame" title="바른한의원 실제 화면 샘플" allow="fullscreen"></iframe>
    <div class="frame-note" id="frameNote"></div>
  </div>
  <aside class="side">
    <h3 id="sideTitle"></h3><p class="how" id="sideHow"></p>
    <div class="mk-list" id="sideList"></div>
    <div class="acts" id="sideAct"></div>
    <p class="tip">※ 샘플은 읽기 전용입니다. 방문 통계와 Q&A 등록은 저장되지 않으며, 3D 화면은 PC 브라우저에서 가장 부드럽게 동작합니다.</p>
  </aside>
  <div class="tools" id="tools" hidden>
    <div class="tp t2" data-key="cardsUnlimited"><button type="button" class="rib">시그니처 전용</button><h3>🧩 질환 카드 무제한 증설</h3>
      <div class="cardsx" id="cardsx"><div class="cx">추나 · 통증<small>기본 카드</small></div><div class="cx">키 성장<small>기본 카드</small></div><div class="cx">다이어트<small>기본 카드</small></div><div class="cx">탈모<small>기본 카드</small></div><div class="cx">공진단<small>기본 카드</small></div><div class="cx">원장 소개<small>기본 카드</small></div><button type="button" class="addtile" id="addCard">＋ 새 질환 카드 추가</button></div>
      <p class="fine">눌러 보세요. 시그니처는 7번째, 8번째 카드를 원장님이 직접 무제한(증설비 0원)으로 추가합니다.</p></div>
    <div class="tgrid">
      <div class="tp t1" data-key="lawWarn"><button type="button" class="rib">프로 · 시그니처</button><h3>🛡️ 금지어 경고 · 계절 팝업</h3>
        <textarea id="dLaw" rows="3">이 한약을 드시면 100% 완치됩니다. 우리 한의원이 최고입니다.</textarea>
        <div class="lawbox" id="lawBox"></div>
        <button type="button" class="mini" id="seasonBtn">🍂 계절 팝업 템플릿 적용해 보기</button></div>
      <div class="tp t2" data-key="aiLaw"><button type="button" class="rib">시그니처 전용</button><h3>✨ 합법 문구 자동 다듬기</h3>
        <p class="fine" style="margin:0 0 6px">왼쪽에 입력한 문구를 의료법에 맞게 고쳐 드립니다. 샘플에서는 <b>2회</b>까지 체험할 수 있습니다.</p>
        <button type="button" class="mini gold" id="lawFix">✨ 합법 문구로 자동 다듬기 (2회 체험)</button>
        <div class="lawout" id="lawOut" hidden></div></div>
    </div>
    <div class="tgrid">
      <div class="tp t2" data-key="photo"><button type="button" class="rib">시그니처 전용</button><h3>📸 원장님 화보 AI 생성</h3><p class="fine" style="margin:0">원장님 사진 1장으로 칼럼·카드용 인물 고정 화보를 만듭니다.</p><button type="button" class="mini gold" id="photoBtn">화보 만들어 보기</button></div>
      <div class="tp t2" data-key="qrPop"><button type="button" class="rib">시그니처 전용</button><h3>📲 대기실 QR 자가진단 POP</h3>
        <div class="qrbox"><div class="qr" id="qr" aria-label="샘플 QR"></div><p>대기실 포스터 샘플 — QR을 스캔하면 질환별 체크포인트로 연결되고, 결과에 따라 상담으로 이어집니다. VIP 최우선 착수 혜택이 함께 제공됩니다.</p></div></div>
    </div>
    <div class="tp t2" data-key="stats"><button type="button" class="rib">시그니처 전용</button><h3>📊 마스터 전용 상세 통계 센터</h3>
      <div class="stat-grid">
        <div class="st"><small>14일 방문 추이 (샘플 데이터)</small><div class="bars">${bars.map((b) => `<i style="height:${b}%"></i>`).join('')}</div></div>
        <div class="st"><small>유입 경로</small><ul><li>네이버 검색 <b>46%</b></li><li>네이버 플레이스 <b>24%</b></li><li>AI 검색(GEO) <b>9%</b></li><li>인스타그램 <b>8%</b></li></ul></div>
        <div class="st"><small>예약 클릭 전환</small><ul><li>전화 상담 <b>31건</b></li><li>카톡 예약 <b>18건</b></li><li>네이버 예약 <b>22건</b></li><li>길안내 <b>40건</b></li></ul></div></div>
      <p class="fine">※ 샘플 화면의 숫자는 이해를 돕기 위한 예시이며 실제 성과가 아닙니다.</p></div>
  </div>
</div>
<section class="cta" id="sec-cta">
  <span class="eyebrow">TOUR COMPLETE · 처음부터 끝까지 둘러보셨습니다</span>
  <h2>필요한 기능이 있는 단계를 고르세요</h2>
  <p class="lead" id="ctaDiff"></p>
  <div class="tiers">
    <div class="tr"><small>STANDARD</small><b>790,000원</b><span>월 베이직 케어 19,900원 · VAT 별도(구축)</span></div>
    <div class="tr"><small>PROFESSIONAL</small><b>1,490,000원</b><span>월 AI 그로스 케어 55,000원 · VAT 별도(구축)</span></div>
    <div class="tr"><small>SIGNATURE</small><b>1,890,000원</b><span>월 AI 마스터 케어 99,000원 · VAT 별도(구축)</span></div>
  </div>
  <div class="cta-row"><a class="btn gold" href="b2b-landing.html#apply">상담 신청하기</a><a class="btn line" href="b2b-landing.html#plans">가격표 다시 보기</a></div>
  <p class="fine">※ 템플릿 구조가 정해져 있어 한의원 이름 시안은 별도로 제작하지 않습니다. 이 샘플이 실제 결과물과 같은 구조입니다.</p>
</section>
<div class="modal" id="modal" hidden>
  <div class="m-card" role="dialog" aria-modal="true">
    <button type="button" class="m-x" id="mX" aria-label="닫기">✕</button>
    <small id="mTier"></small><h3 id="mTitle"></h3><p id="mWhy"></p><div class="m-diff" id="mDiff"></div>
    <div class="m-btns"><a class="btn" href="b2b-landing.html#apply">상담 신청하기</a><a class="btn line" href="b2b-landing.html#samples">기능 비교표 보기</a></div>
  </div>
</div>
<div class="toast" id="toast" hidden></div>
<script src="soften-ko.js"></script>
<script>${js}</script>
</body>
</html>
`;
fs.writeFileSync(path.join(__dirname, 'sample.html'), html, 'utf8');
console.log('✔ sample.html (실제 화면 iframe + 기능 마크) 생성 완료');
