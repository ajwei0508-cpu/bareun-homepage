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
   - `node serve.js` 실행 시 **포트 3000 (3D 시네마 + Lusion 스타일 6대 클리닉 상세페이지 + 리프팅 윤곽진단 스튜디오)** 과 **포트 3001 (수정 전 보존본 3D 시네마)** 이 동시에 자동 실행됩니다!
3. 반드시 본 파일(`AGENTS.md`) 및 `HANDOFF_LATEST.md`를 읽고 최신 작업 상태를 브리핑한 뒤 사용자의 추가 지시를 즉시 수행합니다.

---

## 3. 🔥 [최신 작업 인계 상태 — 2026-10-16 기준]

1. **6대 상세페이지 전체 (`director.html`, `chuna.html`, `growth.html`, `diet-zero.html`, `hairloss.html`, `gongjindan.html`) 전면 개편 완료**
   - **구성 원칙**: 첫 번째 스토리(`STORY 01`)만 영상/모션으로 구성하고, 나머지 스토리(`STORY 02` ~ `STORY 05`)는 모두 단 한 장의 고해상도 시네마틱/3D 의학 이미지(`clean-image`)로 구성 완료.
   - **중복 텍스트 & 중복 이미지 0건**:
     - 좌측 상단 클리닉 정의(`meta.desc`), 체크리스트 5종, 우측 스토리 캡션(`sub`), 좌측 하단 `원장 임상 노트 · STEP 01 / 06`(`caption`)의 모든 중복 문구를 제거하고 각기 다른 전문 의학 내용으로 재작성 완료.
     - 메인 페이지(`story-3d.html`) 및 상세페이지 간 겹치던 이미지를 모두 제거하고 17장의 신규 전용 시네마틱/3D 의학 비주얼을 생성하여 총 42개 미디어 전체 고유화 완료.
2. **시술 전후 리프팅 윤곽진단 비교 앱 (`homepage/lifting-compare.html` & `wealthywei` `/lifting-compare`)**
   - 시술 후(After) 사진 기본 기준 설정, 전/후 사진 개별 윤곽선 수동 편집, 촬영 각도·거리 보정을 위한 3점 중심축(양안 동공 + 코끝) 자동 정합 기능 구현 완료.
3. **워드프레스 올인원 복사·붙여넣기 파일 전체 동기화 (`node bundle-wp.js`)**
   - `wordpress-main-home.html`, `wordpress-story-3d.html`, `wordpress-director.html`, `wordpress-chuna.html`, `wordpress-growth.html`, `wordpress-diet.html`, `wordpress-hairloss.html`, `wordpress-gongjindan.html`, `wordpress-lifting-compare.html`
