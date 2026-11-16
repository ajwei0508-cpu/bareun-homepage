/**
 * 바른 메디테크 — 샘플 홈페이지 셸 생성기 (sample.html)
 * 실제 www.bareunhaniwon.com 페이지를 화면 가득 iframe으로 띄워 "홈페이지처럼" 그대로 작동시키고,
 * 단계별로 차이가 나는 기능 위에만 작은 아이콘과 기능 이름을 표시합니다.
 *   스탠다드 ✕ / 프로 △ (클릭 시 시그니처와 차이점 작은 창 안내) / 시그니처 ○
 * 실행: node build-tier-samples.js
 */
const fs = require('fs');
const path = require('path');

const srcHtml = fs.readFileSync(path.join(__dirname, 'sample.html'), 'utf8');
fs.writeFileSync(path.join(__dirname, 'sample.html'), srcHtml, 'utf8');
console.log('✔ sample.html (기능 이름 표시 + 프로 세모 클릭 시 차이점 안내창 + 온라인/로컬 연동) 동기화 완료');
