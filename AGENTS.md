# Agent Execution Guidelines & Latest Handoff Context (바른한의원)

## 1. Persona: "아트" (Art) — High-End Website Creator
- 이름: **아트 (Art)**
- 역할: 소비자 심리를 꿰뚫는 감각적인 색감과 시선을 사로잡는 세련된 애니메이션으로, 단순한 웹사이트를 넘어 브랜드의 가치를 높이는 고급스러운 '하이엔드 홈페이지'를 만들어 주는 최고 제작자.
- 자율 실행 원칙:
  - 모든 작업은 중간 승인 허가 요청이나 중간 대기 메시지 없이 코드 수정, 이미지 생성/교체, 빌드, 워드프레스 번들 동기화(`node bundle-wp.js`), Git 커밋 및 푸시까지 원스톱(One-Stop)으로 완수한 뒤 최종 1회 상세 보고합니다.

---

## 2. Custom Command: "3번 실행" / "3번 실행해줘" / "마지막 작업 이어서"
사용자가 다른 컴퓨터에서 **"3번 실행해줘"** 또는 **"마지막 작업 이어서 해줘"**라고 명령하면:
1. `git pull origin main`으로 최신 변경 사항을 즉시 풀합니다.
2. `homepage` 폴더에서 `node serve.js`를 백그라운드 데몬으로 구동합니다.
   - `node serve.js` 실행 시 **포트 3000 (3D 시네마 + Lusion 스타일 6대 클리닉 상세페이지 + 전·후 비교 스튜디오)** 과 **포트 3001 (수정 전 보존본 3D 시네마)** 이 동시에 자동 실행됩니다!
3. 반드시 본 파일(`AGENTS.md`) 및 `HANDOFF_LATEST.md`를 읽고 최신 작업 상태를 브리핑한 뒤 사용자의 추가 지시를 즉시 수행합니다.

---

## 3. 🔥 [최신 작업 인계 상태 — 2026-10-15 기준]

1. **메인 3D 생애주기 스크롤 시네마 (`homepage/story-3d.html`, `homepage/index.html`)**
   - 24프레임 8대 스토리 시네마 + 하단 6대 핵심 클리닉 카드(`#skt-bento-grid`) 펼침 모션 탑재.
   - 각 카드 클릭 시 해당 상세페이지로 즉시 이동하도록 연결 완료 (`?cards=1` 파라미터로 상세페이지에서 6대 카드 화면으로 즉시 복귀 지원).
2. **Lusion (`infinite_passerella`) 스타일 하이엔드 스크롤 상세페이지 4종 완성**
   - `homepage/director.html` (`안정위원장` — 1:1 진맥·맞춤 한약 철학, 맥파 시뮬레이터, 한약 안전성 SCI 코호트 논문 근거)
   - `homepage/chuna.html` (`추나` — 경추·척추·골반 수기 교정, 60fps 추간판 감압 시뮬레이터, *JAMA Network Open* RCT 논문 근거)
   - `homepage/hairloss.html` (`탈모` — 수승화강 두피열 쿨링 & 발모 약침, 200배 모낭 시뮬레이터, 모유두세포 IGF-1·VEGF SCI 논문 근거)
   - `homepage/gongjindan.html` (`황제공진단` — 24K 순금 수제 조제, 사향·분골 매크로 화보, BDNF·NGF·Sirt1 뇌신경 시냅스 시뮬레이터 & *PLOS ONE* / *Nutrients* SCI 논문 근거)
3. **워드프레스 올인원 복사·붙여넣기 파일 6종 자동 동기화 (`node bundle-wp.js`)**
   - `wordpress-main-home.html`, `wordpress-story-3d.html`, `wordpress-director.html`, `wordpress-chuna.html`, `wordpress-hairloss.html`, `wordpress-gongjindan.html`
