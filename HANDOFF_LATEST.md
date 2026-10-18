# 📋 바른한의원 3D 시네마 & 6대 클리닉 상세페이지 & B2B 템플릿화 — 작업 인수인계서 (HANDOFF_LATEST)

> **최종 업데이트**: 2026-10-18 (최신 `main` 브랜치 · Awwwards B2B 템플릿화 & 시안성/신뢰성 고도화 완료)
> **작성자**: 하이엔드 홈페이지 디렉터 **아트 (Art)**

---

## 💎 0. 최신 완료 작업 요약 (2026-10-18 완료분 · 스크롤 연동 자동 전후 3D 스캔 & Vibrant 3D 인체모형 의학·SCI 논문 백과사전 & B2B 템플릿화)

1. **전 페이지 인라인 삽입형 스크롤 자동 연동 Before/After 3D 생체스캔 시스템 탑재**:
   - 수동으로 모달을 열거나 드래그할 필요 없이, **페이지를 스크롤하면 스크롤 진행도에 따라 치료 전(Before) 3D 스캔에서 치료 후(After) 3D 스캔으로 골드 레이저 스캔 라인이 실시간(`8% ➔ 96%`) 자동 변환**되도록 전 페이지에 기본 내장 완료.
   - **메인 3D 쇼룸 (`homepage/story-3d.html` / `homepage/index.html`)**: 우측 상단 `#live-scroll-ba-hud` 라이브 3D 스캔 HUD가 챕터(`ch0`~`ch6`) 전환 및 챕터 내 스크롤(`getChapterProgress`)에 맞춰 6대 클리닉 전후 스캔을 실시간 자동 변환.
   - **6대 상세페이지 전체 (`director`, `chuna`, `growth`, `diet-zero`, `hairloss`, `gongjindan`)**: 좌측 사이드바 하단 `#inline-scroll-ba-card` 및 우측 시네마틱 가로 런웨이 `#runway-scroll-ba-plate` 두 곳에 인라인 삽입하여, 스크롤 시 60fps(`window.applyInlineScrollBaPct`)로 자동 전후 스캔이 변화하며 마우스/터치 수동 비교도 동시에 지원.
2. **Vibrant Wellness (`vibrant.noomoagency.com`) 레퍼런스 기반 3D 인체모형 질환·의학·SCI 논문 백과사전 신설 (`homepage/body-explorer.html` / `homepage/wordpress-body-explorer.html`, 생성기: `homepage/build-body-explorer.js`)**:
   - **3D 반투명 홀로그램 인체모형 & GLSL Perlin 3D Noise 피부 투시 디졸브 셰이더 (`skinShaderMat`)**: `vibrant.noomoagency.com`의 핵심 3D 그래픽 기법인 프레넬(Fresnel) 무지개빛 유리 피부 + 선택 부위 주변 피부가 3D 노이즈로 부드럽게 투명해지며 내부 장기가 드러나는 Focus Dissolve Shader 구현.
   - **7대 인체 부위별 60fps 3D 내부 해부학 디테일 마이크로 모션**:
     - `무릎·성장판 (knee)`: 대퇴골·경골 사이 골단연골(성장판) 수직 증식 + 140개 연골모세포·IGF-1 바이오포톤 상승 파티클.
     - `목·경추 (cervical)` / `허리·골반 (lumbar)`: 18마디 척추뼈·추간판(디스크) +3.8mm 수직 감압 및 골반 링 수평 정렬 모션.
     - `두피·뇌신경 (brain)`: 두피 상열하한(42°C) ➔ 수승화강(36.5°C) 청열 쿨링 및 80개 모낭 재생 파티클.
     - `심장·전신기혈 (heart)`: CITES 사향 공진단 심장 박동 코어 및 뇌혈류·자율신경 골든 파동 링.
     - `복부·위장대사 (gut)`: 복부 심부 대사 화로(Metabolic Furnace) 점화 및 내장지방·습담 분해(Lipolysis) 모션.
     - `자궁·골반강 (pelvis)`: 자궁내막 수용성(LIF) 및 골반강 나선동맥 온열 혈류 파동.
   - **우측 백과사전 패널 스크롤 연동**: 우측 의학백과 패널을 아래로 스크롤하면 좌측 3D 인체 내부 장기가 **치료 전(병변/염증) ➔ 치료 후(정상 회복)** 상태로 실시간 3D 변형되며, 백과사전 상단 인라인 전후 3D 스캔도 동시에 자동 변환됨.
   - **초정밀 환자 맞춤 의학·생활·영양·SCI 논문 백과사전 수록**:
     - 특히 **무릎(소아·청소년 키 성장 & 성조숙증)** 클릭 시: ① 성장을 가로막는 5대 근본 원인(감기·비염 면역 에너지 고갈, 아데노이드 구강호흡과 성장호르몬 서파수면 단절, 비위 흡수 장애, 성조숙증 골령 가속, 척추 측만), ② **감기·비염이 잦은 아이 부모님 실전 6단계 홈케어 프로토콜** (초기 24시간 해열제 남용 주의, 수면 온습도 20~22°C/50~60% & 경추 보온, 유제품·찬물 차단과 온수 루틴, 비강 세척·영향혈 지압, 항생제 직후 식적 관리, 환절기 위기 면역 선제 보강), ③ 약선 음식 vs 성장판 조기 폐쇄 주의 식품, ④ 성장점프·태양광·혈자리(독비·족삼리·양릉천·백회·용천) 루틴, ⑤ 전세계 SCI/PubMed 논문 레퍼런스 완벽 수록.
3. **B2B 화이트라벨 마스터 설정 (`homepage/clinic-template-config.js`) & 3단 시안성 모드 (`다크 로얄` / `온기 한지 화이트` / `큰글씨 고시안성`) & 1초 화이트라벨 커스터마이저**:
   - 메인 페이지, 6대 상세페이지, 3D 인체모형 백과사전(`body-explorer.html`) 전체 연동 및 워드프레스 번들 9종(`wordpress-*.html`) 생성 완료.

---

## ✨ 1. 이전 완료 작업 요약 (2026-10-16 완료분)

### A. 6대 상세페이지 전체 (`director`, `chuna`, `growth`, `diet-zero`, `hairloss`, `gongjindan`) 전면 개편 및 중복 콘텐츠·이미지 100% 제거 완료
1. **레이아웃 및 미디어 원칙 (`build-story-detail-pages.js`)**:
   - **첫 번째 스토리(`STORY 01`)만 영상(`clean-video`) 또는 2프레임 모션(`motion-story`)**으로 구성하고, **나머지 모든 스토리(`STORY 02` ~ `STORY 05`)는 오직 단 한 장의 고해상도 시네마틱/3D 의학 이미지(`clean-image`)**로 통일했습니다.
   - **중복 이미지 0건 달성 (총 42개 미디어 전체 고유화)**:
     - 메인 페이지(`story-3d.html`), 백과사전 페이지(`growth-full.html`, `diet-zero-full.html`), 상세페이지 간, 또는 하단 `NEXT CLINIC` 예고 배너(`nextClinic.bg`)와 겹치던 이미지를 전수 삭제하고 **신규 전용 이미지 17장(STORY 03 3D 비유 3종 + 성장/다이어트/공진단/대표원장 전용 14종)**을 새로 생성하여 연결했습니다.
   - **중복 텍스트 0건 달성 (페이지 내·외부 전수 분리)**:
     - 좌측 상단 클리닉 소개(`meta.desc`), 좌측 체크리스트(`checklistItems`), 우측 스토리 캡션(`sub`), 좌측 하단 `원장 임상 노트 · STEP 01 / 06`(`caption`)의 문장이 서로 겹치지 않도록 **36개의 단독 임상 노트**와 클리닉별 고유 의학 정의로 전면 재집필했습니다.

2. **6대 상세페이지별 핵심 구성**:
   - **01. 안정위 대표원장 (`director.html` / `wordpress-director.html`)**:
     - 주제: `[병명이 아닌 사람을 읽는 15년 사상체질·통합의학]`
     - 구성: `STORY 01` 15분 심층 문진 영상(`detail_director_story1.mp4`) ➔ `STORY 02` 양 손목 27맥상 정밀 맥진(`detail_director_story2_clean.jpg`) ➔ `STORY 03` 사상체질 4유형 & 현대의학 통합 치료 설계(`detail_director_story3_clean.jpg`) ➔ `STORY 04` 10단계 원내 무균 탕전 & 320종 무해성 검수(`detail_director_story4_decoction_lab.jpg`) ➔ `STORY 05` 간·신장(AST/ALT) 안전성 입증 & 가족 주치의(`detail_director_story5_clean.jpg`)
   - **02. 바른 추나 · 척추교정 (`chuna.html` / `wordpress-chuna.html`)**:
     - 주제: `[멈춰버린 나를 다시 움직이게 하는 힘, 추나]`
     - 구성: `STORY 01` 아이를 안아 올리다/캠핑장 허리 통증 모션(`detail_chuna_story1_child_pain.jpg`, `detail_chuna_story1_camp_pain.jpg`) ➔ `STORY 02` 통증 스위치만 끄는 진통제 서랍(`detail_chuna_story2_painkiller_drawer.jpg`) ➔ `STORY 03` 틀어진 하단 젠가 블록 수직 정렬 & 3D 척추 +3.8mm 신경 감압(`detail_chuna_story3_jenga_spine.jpg`) ➔ `STORY 04` 원장 1:1 1mm 미세 아탈구 수기 촉진(`detail_chuna_story4_palpation.jpg`) ➔ `STORY 05` 아이 비행기 태우기 & 일상 회복(`detail_chuna_story5_child_airplane.jpg`)
   - **03. 바른 성장 · 성조숙증 (`growth.html` / `wordpress-growth.html`)**:
     - 주제: `[닫혀가는 성장판의 시계를 되돌리는, 숨은 10cm 골든타임]`
     - 구성: `STORY 01` 멈춰 선 거실 기둥 눈금 & 야간 구강호흡 모션(`detail_growth_story1_wall_chart.jpg`, `detail_growth_story1_mouth_breathing.jpg`) ➔ `STORY 02` 식탁 위 칼슘·영양제의 흡수 한계(`detail_growth_story2_supplements_limit.jpg`) ➔ `STORY 03` 조기 골화(성조숙증) 억제 & IGF-1 연골모세포 수직 증식 3D 기전(`detail_growth_story3_epiphyseal_3d.jpg`) ➔ `STORY 04` 무방사선 초음파 성장판 정밀 스캔(`detail_growth_story4_ultrasound_scan.jpg`) ➔ `STORY 05` 농구코트 점프슛 성장 피날레(`detail_growth_story5_tall_basketball.jpg`)
   - **04. 바른 다이어트 · 식욕ZERO (`diet-zero.html` / `wordpress-diet.html`)**:
     - 주제: `[벨트의 마지막 구멍, 다시 나를 사랑할 시간]` (Dove ‘Evolution’ & Clio Health ‘The Heavy Invisible Cloak’ 모티프)
     - 구성: `STORY 01` 1cm 여유 없는 바지 지퍼 & 헐렁한 고무줄 밴딩 바지의 한숨 모션(`detail_diet_story1_closet_zipper.jpg`, `detail_diet_story1_baggy_pants.jpg`) ➔ `STORY 02` 굶고 빼고 다시 배부터 단단하게 찌는 요요의 형벌(`detail_diet_story2_starvation_yoyo.jpg`) ➔ `STORY 03` 불 꺼진 복부 화로(식적·습담 적체) vs 맞춤 한약 대사 부스팅 화로 3D 기전(`detail_diet_story3_brazier_metabolism_3d.jpg`) ➔ `STORY 04` 정밀 체성분(InBody)·진맥 상담 & 복부 심부 온열 해독·대사 한약 루틴(`detail_diet_story4_inbody_pulse_herb.jpg`) ➔ `STORY 05` 지퍼가 한 번에 올라가고 벨트 구멍이 두 칸 줄어든 당당한 아침의 핏(`detail_diet_story5_zipper_success_fit.jpg`)
   - **05. 바른 탈모 · 모근재생 (`hairloss.html` / `wordpress-hairloss.html`)**:
     - 주제: `[30cm의 거리, 다시 가까워질 용기]`
     - 구성: `STORY 01` 사무실 모니터 뒤 동료·데이트 식탁 30cm 시선 위축 모션(`detail_hair_story1_30cm_tension.jpg`, `detail_hair_story1_date_bow.jpg`) ➔ `STORY 02` 욕실 진열장을 가득 채운 샴푸·영양제 실패의 기록(`detail_hair_story2_cabinet_failure.jpg`) ➔ `STORY 03` 42°C 끓는 냄비(상열하한) ➔ 36.5°C 수승화강 두피 쿨링 & 모근 재생 3D 기전(`detail_hair_story3_boiling_pot_cooling.jpg`) ➔ `STORY 04` 청열자음 한약 & 진피 3.5mm 정제 발모 약침 루틴(`detail_hair_story4_pulse_routine.jpg`) ➔ `STORY 05` 30cm 거리에서도 당당한 미소(`detail_hair_story5_30cm_confidence.jpg`)
   - **06. 바른 황제공진단 (`gongjindan.html` / `wordpress-gongjindan.html`)**:
     - 주제: `[꺼져가는 생명력의 불씨를 되살리는, 황제의 명약]`
     - 구성: `STORY 01` 1% 배터리 방전 소파·서재 번아웃 모션(`detail_gongjindan_story1_battery_sofa.jpg`, `detail_gongjindan_story1_burnout_clock.jpg`) ➔ `STORY 02` 밑빠진 크리스탈 잔에 새어나가는 영양제의 한계(`detail_gongjindan_story2_bottomless_glass.jpg`) ➔ `STORY 03` 24K 사향 공진단이 막힌 기혈의 거대 수문을 열고 뇌신경·전신 혈관까지 도달하는 3D 기전(`detail_gongjindan_story3_musk_floodgate.jpg`) ➔ `STORY 04` 식약처 CITES 정품 사향 0.001g 정밀 계량 & 수제 조제(`detail_gongjindan_story4_cites_scale.jpg`) ➔ `STORY 05` 황실 공진단함과 온 가족의 활력 회복(`detail_gongjindan_story5_royal_box_family.jpg`)

### B. 시술 전후 리프팅 윤곽진단 비교 시스템 (`lifting-compare.html` / `wealthywei` 연동 완료)
- **바른한의원 홈페이지 (`homepage/lifting-compare.html`, `homepage/wordpress-lifting-compare.html`)** 및 **1번 프로젝트 (`wealthywei`: 좌측 메뉴 `바른리프팅` ➔ 하위 메뉴 `윤곽진단` `/lifting-compare`)** 양쪽 모두 동기화 및 배포 완료.
- 시술 후(After) 기준 이미지 기본 설정, 전/후 이미지 각각 독립적인 윤곽선 수동 조절, 촬영 각도·거리 차이를 자동 보정하는 **3점 중심축(양안 동공 + 코끝/인중) 아핀(Affine) 자동 정합 교정** 탑재 완료.

---

## 🚀 2. 다른 컴퓨터에서 1초 만에 이어서 실행하는 방법

- **"1번 실행해줘"**: `wealthywei` 최신 `git pull` 후 로컬 서버 실행 (`바른리프팅 > 윤곽진단` 포함)
- **"3번 실행해줘"**: `바른한의원 홈페이지` 최신 `git pull` 후 `node homepage/serve.js` (포트 `3000` / `3001`) 자동 실행
  - **메인 3D 시네마 (스크롤 자동 연동 3D 전후 스캔 HUD 포함)**: [http://localhost:3000/story-3d.html](http://localhost:3000/story-3d.html) (6대 클리닉 카드 바로 열기: [http://localhost:3000/story-3d.html?cards=1](http://localhost:3000/story-3d.html?cards=1))
  - **🧬 3D 인체모형 질환·의학·SCI 논문 백과사전 (Vibrant Wellness 스타일 · 무릎 소아성장/감기케어 등 7대 부위)**: [http://localhost:3000/body-explorer.html](http://localhost:3000/body-explorer.html) (무릎 성장 바로가기: [http://localhost:3000/body-explorer.html?part=knee](http://localhost:3000/body-explorer.html?part=knee))
  - **01. 안정위 대표원장**: [http://localhost:3000/director.html](http://localhost:3000/director.html)
  - **02. 바른 추나 · 척추교정**: [http://localhost:3000/chuna.html](http://localhost:3000/chuna.html)
  - **03. 바른 성장 · 성조숙증**: [http://localhost:3000/growth.html](http://localhost:3000/growth.html)
  - **04. 바른 다이어트 · 식욕ZERO**: [http://localhost:3000/diet-zero.html](http://localhost:3000/diet-zero.html)
  - **05. 바른 탈모 · 모근재생**: [http://localhost:3000/hairloss.html](http://localhost:3000/hairloss.html)
  - **06. 바른 황제공진단**: [http://localhost:3000/gongjindan.html](http://localhost:3000/gongjindan.html)
  - **리프팅 윤곽진단 스튜디오**: [http://localhost:3000/lifting-compare.html](http://localhost:3000/lifting-compare.html)
