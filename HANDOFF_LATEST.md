# 📋 바른한의원 3D 시네마 & 6대 클리닉 상세페이지 & B2B 템플릿화 — 작업 인수인계서 (HANDOFF_LATEST)

> **최종 업데이트**: 2026-10-18 (최신 `main` 브랜치 · Awwwards B2B 템플릿화 & 시안성/신뢰성 고도화 완료)
> **작성자**: 하이엔드 홈페이지 디렉터 **아트 (Art)**

---

## 💎 0. 최신 완료 작업 요약 (2026-10-18 완료분 · Vibrant 193K-Vertex 3D 동인(銅人) 해부학·골격·혈관·12경맥 대백과 완성 & 메인 페이지 원본 복원)

1. **메인 페이지 (`homepage/story-3d.html` / `homepage/index.html`) 클린 원본 복원 완료**:
   - 사용자 요청에 따라 메인 페이지를 이전 클린 버전(`e962494`)으로 완벽 복원하고, 상단 헤더에 `🧬 3D 동인(銅人) 경락·질환백과` (`body-explorer.html`) 바로가기 버튼만 깔끔하게 연결 완료.
2. **Vibrant (`vibrant.noomoagency.com`) 공식 193,288-Vertex 3D 인체모형 + Z-Anatomy 정밀 3D 골격·관절·혈관/12경맥 통합 구축 (`homepage/body-explorer.html` / `homepage/wordpress-body-explorer.html`)**:
   - **실제 3D 지오메트리 파이프라인 구축 (`@gltf-transform` + `draco3dgltf` + `meshoptimizer`)**:
     - `models/skinMB2.glb` (남성 193,288 버텍스) & `models/skinF2.glb` (여성 190,564 버텍스): `vibrant.noomoagency.com` 공식 조각 메쉬 + `GSG_PRO_STUDIOS_METAL_001_sm` HDR GainMap 환경맵 디코더 + 크리스탈 글래스 굴절(`MeshPhysicalMaterial` Dispersion·Iridescence) + X-Ray Fresnel 진주빛 윤곽 림 셰이더 + GLSL Perlin 3D Noise 피부 투시 디졸브(`uDissolve`) 탑재.
     - `models/Skeleton.glb` (1,052 KB Draco 압축): `skinMB2.glb` 체형 내부에 100% 정밀 포즈 피팅된 두개골(`Skull`), 경추(`CervicalSpine`), 12쌍 흉곽·늑골·흉골·쇄골·견갑골(`ThoracicRibcage`), 요추(`LumbarSpine`), 골반(`Pelvis`), 상지골(`UpperLimbs`), 하지골(`LowerLimbs`), 무릎 관절골(`KneeJointBones`) 및 **대퇴골 원위부·경골 근위부 실제 3D 골단연골 성장판(`KneeGrowthPlate`)** 탑재. X-Ray 반투명 프레넬 골격 셰이더를 적용해 두개골 내부의 뇌와 흉곽 내부의 심장·혈관이 선명하게 투시됨.
     - `models/Joints.glb` (281 KB Draco 압축): 척추 추간판 디스크·늑연골(`SpinalDiscs`), 무릎 반월상연골·십자인대(`KneeCartilage`), 전신 관절낭(`OtherJoints`).
     - `models/Vascular.glb` (2,372 KB Draco 압축 · 136만 버텍스): 전신 동맥·정맥 및 12경맥 기혈 분지망(`ArterialMeridians`, `VenousMeridians`) + 실시간 GLSL 기혈(Qi-Blood) 바이오포톤 파동 셰이더.
     - **Vibrant 공식 10대 내부 장기 (`brain.glb`, `heart.glb`, `liver.glb`, `stomach.glb`, `intestine.glb`, `kidneys2.glb`, `galbladder.glb`, `pancreas.glb`, `glands.glb`, `thyroid.glb`)**: Three.js `SubsurfaceScatteringShader` 기반 심장 박동·뇌신경 루비-앰버 생체 발광 및 우측 백과사전 스크롤 연동 회복 모션.
     - **스타라이트 경혈 포인트 (`THREE.Points`) & 좌우 여백 수평 리더라인 콜아웃**: 인체 위를 가리던 기존의 조잡한 튜브와 겹치는 텍스트 배지를 전면 제거하고, 선택 부위 핵심 경혈(최대 4개)만 좌우 여백으로 자동 분산(충돌 방지)되어 수평 지시선으로 표시됨.
3. **6대 상세페이지 (`director`, `chuna`, `growth`, `diet-zero`, `hairloss`, `gongjindan`) 인라인 스크롤 자동 연동 Before/After 3D 스캔 및 워드프레스 번들 9종(`wordpress-*.html`) 최신 동기화 완료**.

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
