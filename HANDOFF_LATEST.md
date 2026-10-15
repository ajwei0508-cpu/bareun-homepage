# 📋 바른한의원 3D 시네마 & Lusion `Infinite Passerella` 좌우 스크롤 상세페이지 — 작업 인수인계서 (HANDOFF_LATEST)

> **최종 업데이트**: 2026-10-15 (최신 `main` 브랜치)
> **작성자**: 하이엔드 홈페이지 디렉터 **아트 (Art)**

---

## ✨ 1. 최신 완료 작업 요약 (2026-10-15 완료분)

### A. Lusion (`infinite_passerella`) 좌우(Horizontal) 시네마틱 스크롤 상세페이지 4종 전면 개편 완료
대표님께서 제안해 주신 **`https://lusion.co/projects/infinite_passerella`** 구조 그대로, **"핵심 글자는 좌측 도슨트 패널(`#project-details-meta`)에 깔끔하게 압축 정리하고, 마우스 휠·드래그·키보드로 우측 대형 비주얼 런웨이(`#project-details-items-move-container`)를 좌에서 우로 유려하게 활주하며 이미지와 모션이 스토리를 전달하는 구조"**로 4대 상세페이지를 전면 개편했습니다.

1. **공통 Lusion Horizontal Runway 아키텍처 핵심 특징**:
   - **좌측 고정 텍스트 도슨트 패널 (`#project-details-meta`, 430px)**:
     - 클리닉 타이틀, 핵심 철학 2문단 요약, `1:1 진료 예약` CTA 버튼, `Core Protocol` 4단계 태그, `SCI Evidence` 학술지 요약, 그리고 우측 수평 스크롤 위치에 따라 실시간으로 바뀌는 **`PLATE 01 ~ 06` 라이브 도슨트 캡션 & 번호 점프 버튼**을 좌측 한곳에 응축했습니다.
   - **우측 6단계 수평 비주얼 런웨이 (`#project-details-items-move-container`)**:
     - 마우스 휠(상하/좌우), 마우스 드래그, 방향키 조작 시 Lusion 특유의 **`Lerp 0.085` 관성 + 속도 비례 미세 기울기(`skewX`) + 프레임 내부 이미지 시차(`Parallax`)**가 60fps로 작동합니다.
     - 긴 텍스트 공해 없이 **[Plate 01: 원인·진단 화보] ➔ [Plate 02: 안정위 원장 1:1 시술 풀스크린 하이라이트] ➔ [Plate 03: 실시간 60fps 의학 메커니즘 캔버스] ➔ [Plate 04: 정밀 치료·약재 화보] ➔ [Plate 05: 회복 화보 + SCI 논문 대형 비주얼 그래프] ➔ [Plate 06: `NEXT CLINIC` 다음 클리닉 순환 포털]**로 이어집니다.

2. **개편된 4대 클리닉 상세페이지 & 워드프레스 독립형 파일**:
   - **① 안정위 대표원장 (`homepage/director.html` / `wordpress-director.html`)**
     - 접속 주소: [http://localhost:3000/director.html](http://localhost:3000/director.html)
     - 좌측 환자 공감 생활 불편감 체크리스트 5종: `병원 검사 정상인데 만성 피로·통증` / `나의 사상체질 궁금증` / `15년 임상 경력 아빠 같은 한의사` / `공장식이 아닌 1:1 체질 한약` / `장기 복용 시 한약재 안전성 걱정`
     - 우측 5막 스토리텔링 & 모션 연출: **[STORY 01: 자세한 설명의 시작 (`detail_director_story1_enter.jpg`, 따스한 채광 + 호흡 줌 모션)] ➔ [STORY 02: 손끝으로 읽는 1:1 정밀 맥진 (`detail_director_story2_both_wrists_pulse.jpg`, 양 손목 촌·관·척 맥진 + 실시간 심박·맥파 파동 오버레이)] ➔ [STORY 03: 현대의학 통합 치료 설계 (`detail_director_story3_nod_design.jpg`, 깊이 끄덕이는 원장님 & 사상체질×현대의학 통합 치료 설계 HUD)] ➔ [STORY 04: 원장 직접 검수 고급 정품 약재 (`detail_director_story4_loupe_pov.jpg`, 1인칭 루페 검수 + 골드 루페 스캔 광학 모션)] ➔ [STORY 05: 내 가족에게 쓸 수 없는 치료는 하지 않습니다 (`detail_director_story5_family_safety.jpg`, 복용 전후 간 수치 AST/ALT 정상 유지 & 항산화 개선 실시간 차트 + 10단계 원내 안전 탕전 시스템)] ➔ `NEXT: 02 바른 추나`**
   - **② 바른 추나 · 척추교정 (`homepage/chuna.html` / `wordpress-chuna.html`)**
     - 접속 주소: [http://localhost:3000/chuna.html](http://localhost:3000/chuna.html)
     - 우측 6대 비주얼 플레이트: 3D 레이저 체형 대칭 스캔(`detail_chuna_pelvis.jpg`) ➔ 원장 1:1 경추 추나 풀스크린(`detail_chuna_cervical.jpg`) ➔ 60fps 척추 분절 정렬 & 추간공 감압 시뮬레이터 ➔ 심부 신경근 정제 약침(`detail_chuna_acupuncture.jpg`) ➔ 통증 해방 만세 화보(`life_4b_chuna_manse.jpg`) & *JAMA Network Open* `-67.4%` 통증 감소 그래픽 바 ➔ `NEXT: 05 바른 탈모`
   - **③ 바른 탈모 · 모근재생 (`homepage/hairloss.html` / `wordpress-hairloss.html`)**
     - 접속 주소: [http://localhost:3000/hairloss.html](http://localhost:3000/hairloss.html)
     - 우측 6대 비주얼 플레이트: 두피열(`38.4°C`) vs 수승화강 냉각(`34.2°C`) 열화상 비교(`detail_hair_thermography.jpg`) ➔ 원장 1:1 고농축 발모 약침 풀스크린(`detail_hair_pharmacopuncture.jpg`) ➔ 200배율 광학 현미경 다모낭(3모) 재생 시뮬레이터 ➔ 모유두세포 IGF-1·VEGF 8K 3D 아트워크(`detail_hair_follicle_3d.jpg`) ➔ 자연광 실사 자신감 회복 화보(`life_3b_hair_restored.jpg?v=pov10`) & `+158%` 모유두세포 증식 그래픽 바 ➔ `NEXT: 06 황제공진단`
   - **④ 바른 황제공진단 (`homepage/gongjindan.html` / `wordpress-gongjindan.html`)**
     - 접속 주소: [http://localhost:3000/gongjindan.html](http://localhost:3000/gongjindan.html)
     - 우측 6대 비주얼 플레이트: 나전칠기 위 CITES 정품 사향·러시아 분골 녹용·산수유·당귀 매크로(`detail_gongjindan_ingredients_macro.jpg`) ➔ 원장 24K 순금박 수제 제환 풀스크린(`detail_gongjindan_master.jpg`) ➔ 60fps L-무스콘 뇌신경 시냅스(NGF·BDNF) 공명 캔버스 ➔ 골드 신경망 3D 아트워크(`detail_gongjindan_neuro_aura.jpg`) ➔ 소나무 정원 노부부 화보(`life_5b_gongjindan_vitality.jpg`) & *PLOS ONE* `+184%` NGF 증가 그래픽 바 ➔ `NEXT: 01 안정위 대표원장`

### B. 탈모 스토리 ‘자신감 회복’(`life_3b_hair_restored.jpg`) 실사 영화 스틸컷 교체 완료
- 깨진 한글 간판과 인위적인 역광 플레어가 있던 기존 AI 거리 이미지를 폐기하고, **자연광이 비치는 모던 우드&글라스 라운지에서 자연스러운 피부 결과 탄탄한 헤어라인을 지닌 30대 후반 한국 남성의 실사 시네마 스틸컷**으로 교체 완료했습니다.

---

## 🚀 2. 다른 컴퓨터에서 1초 만에 실행하는 방법

- **"3번 실행해줘"**라고 말씀하시면 자동으로 `git pull` 후 로컬 서버(`node homepage/serve.js`)가 실행됩니다.
  - **메인 3D 시네마**: [http://localhost:3000/story-3d.html](http://localhost:3000/story-3d.html) (6대 클리닉 카드 바로 열기: [http://localhost:3000/index.html?cards=1](http://localhost:3000/index.html?cards=1))
  - **01. 안정위 대표원장 (좌우 스크롤)**: [http://localhost:3000/director.html](http://localhost:3000/director.html)
  - **02. 바른 추나 (좌우 스크롤)**: [http://localhost:3000/chuna.html](http://localhost:3000/chuna.html)
  - **05. 바른 탈모 (좌우 스크롤)**: [http://localhost:3000/hairloss.html](http://localhost:3000/hairloss.html)
  - **06. 황제공진단 (좌우 스크롤)**: [http://localhost:3000/gongjindan.html](http://localhost:3000/gongjindan.html)
  - **전·후 비교 스튜디오**: [http://localhost:3000/compare.html](http://localhost:3000/compare.html)
