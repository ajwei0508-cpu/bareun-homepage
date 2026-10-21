# 📋 바른한의원 3D 시네마 & 6대 클리닉 상세페이지 & B2B 템플릿화 — 작업 인수인계서 (HANDOFF_LATEST)

> **최종 업데이트**: 2026-10-22 (최신 `main` 브랜치 · 성장/추나/다이어트/황제공진단/전립선 10카드 미니멀 구조 완성 & 중복 이미지 0건 신규 에셋 27장 탑재 & 카페24 실서버 배포 완료)
> **작성자**: 하이엔드 홈페이지 디렉터 **아트 (Art)**

---

## 💎 0. 최신 완료 작업 요약 (2026-10-22 최신본 · 황제공진단 & 전립선 10카드 구성 개편, 03번 카드 여백 제거 풀커버 전환, 중복 없는 신규 이미지 27장 적용 및 카페24 실서버 배포 완료)

1. **성장 · 다이어트 · 추나 · 황제공진단 · 전립선 03번 카드 양옆 여백 제거 및 부드러운 전환 (`build-story-detail-pages.js`)**:
   - 기존 `edemaSeqFrame`, `bellySeqFrame` CSS 키프레임에서 사진 자체의 가로 폭을 축소시키던 `scaleX(0.92)` / `scaleX(0.89)`를 전면 제거하고 `transform: scale(1)`(100% 풀커버)로 고정하여 카드 좌·우 여백이 절대 생기지 않도록 수정.
   - 3단계 변화 이미지(`a ➔ b ➔ c`)가 바닥 프레임(`opacity: 1`) 위에서 부드러운 오퍼시티 크로스페이드로 자연스럽게 넘어가도록 개선.
2. **황제공진단(`gongjindan.html` / `wordpress-gongjindan.html`) 소아 성장 동일 10카드 구성 개편 (06·07번 카드 고정 유지 & 신규 고유 이미지 12장 생성)**:
   - **06번 카드(`#gjd-panorama-card` 10대 브로슈어 파노라마 아카이브)** 및 **07번 카드(`식약처 인증 정품 사향 & 대표원장 직접 수제 조제`)** 원본 그대로 유지.
   - 01·03·04·05·08·09번 카드 전용 신규 이미지 12장(`gongjindan_minimal_card*`) 생성 및 10번 카드(`공진단 꿀팁` 3D 인체모형 연동) 구성 완료.
3. **바른 전립선 · 남성활력(`prostate.html` / `wordpress-prostate.html`) 소아 성장 동일 10카드 구성 개편 (신규 고유 하이엔드 이미지 15장 생성)**:
   - 타 페이지와 겹치던 기존 이미지를 전수 교체하여 01~09번 카드 전용 신규 하이엔드 이미지 15장(`prostate_minimal_card*`, 새벽 야간뇨 컷 자연스러운 손목·손 모양 교정본 `?v=noct2` 포함) 생성 및 10번 카드(`전립선 꿀팁` 3D 인체모형 연동) 구성 완료.
4. **GitHub (`origin main`) 푸시 및 카페24 실서버(`https://www.bareunhaniwon.com/`) 전 페이지 배포 & 캐시 초기화 완료**.

---

## 💎 0-0. 직전 완료 작업 요약 (2026-10-20 최신본 · 아빠 한의사 메인 슬로건 오프닝, 자동스크롤 속도 최적화, 공진단 이미지 보정, 탈모 4대 유형 분리, 11대 상세페이지 클린 개편)

1. **메인 스토리 오프닝 & 자동 스크롤 최적화 (`index.html`, `story-3d.html`)**:
   - 메인 스토리 시작 전 **메인 슬로건(`“아빠 한의사를 찾는 환자 스토리 공개”`)**만 단독으로 시네마틱 애니메이션과 함께 노출된 뒤 자동으로 메인 스토리 보드로 전환되도록 정리.
   - 메인 스토리 자동 스크롤 속도를 장면(컷)당 **약 1.5초 더 여유 있게** 감속(`~1.88초 ➔ ~3.38초/컷`)하여 대사와 장면을 충분히 감상할 수 있도록 개선.
   - STORY 02 `“다시 찾은 한의원”` 장면(`life_1c_clinic_exam.jpg?v=pov15`)을 인물 얼굴 없이 **따뜻한 진료실 맥진 베개 위 아이의 손목과 다정하게 세 손가락(촌·관·척)으로 맥을 짚는 한의사의 손만 클로즈업한 시네마틱 매크로 이미지**로 교체 완료.
   - STORY 04 다이어트 파트(`#story4-weight-counter`)에서 스크롤 진행에 따라 **실시간 숫자로 체중이 감소하는 카운터(`68.5 kg ➔ 48.5 kg`, `▼ -0.0 kg 감량 ➔ ▼ -20.0 kg 감량`)**를 원상복구 완료.
   - STORY 07 공진단을 먹여주는 이미지(`life_5b_gongjindan_vitality.jpg`)의 공진단 크기를 실제 공진단 한 알 크기(약 1.4cm)로 자연스럽게 축소 교정.
   - 기존 웹 신디사이저 BGM 멜로디 및 상단 BGM 토글 버튼 삭제 완료 (추후 제작 음원 연결 준비 완료).
2. **바른 탈모 4대 유형별 상세페이지 신설 및 선택 모달 탑재**:
   - 메인 카드 및 상세페이지 탭에서 탈모 선택 시 **남성탈모(`hairloss-male.html`) · 원형탈모(`hairloss-alopecia.html`) · 여성탈모(`hairloss-female.html`) · 지루성두피염(`hairloss-seborrheic.html`)** 4가지 유형별 상세페이지를 선택할 수 있도록 구성.
3. **11대 카드 상세페이지 전체 클린 개편 (`build-story-detail-pages.js`)**:
   - 카드 상세페이지 자동 스크롤 제거 (사용자 수동 스크롤 전환).
   - 각 카드당 3장 썸네일 도크를 제거하고 **카드별 메인 이미지 1장씩만** 직관적으로 표시.
   - 카드별 `STORY` 라벨/배지 및 좌·우측 중복 콘텐츠 전면 삭제.
   - 체크리스트 선택 전(`0개`)에는 닥터 코멘트 박스를 숨기고(`display: none`), 선택 개수에 따라 **5단계 맞춤형 닥터 코멘트(`닥터 코멘트 · DR. AN'S CLINICAL COMMENT`)**가 실시간 표시되도록 고도화:
     - **1개 체크**: `초기 관리 권장` — *"초기 징후가 감지되었습니다. 증상이 고착화되기 전에 가벼운 진맥과 초기 맞춤 관리를 받아보시는 것을 권장합니다."*
     - **2개 체크**: **`주의 (20% 진행중)`** — *"질환이 약 20% 진행 중입니다. 방치하면 만성화로 이어질 수 있으니 빠른 시일 내에 내원하셔서 상태 점검과 관리를 시작하세요."*
     - **3개 체크**: **`위험 (50% 고생중)`** — *"이미 50% 이상 증상이 깊어져 일상에서 적지 않은 고통을 겪고 계신 상태입니다. 자가 관리만으로는 회복이 어려우니 정밀 한방 치료가 필요합니다."*
     - **4개 체크**: **`심각 (70% 위태함)`** — *"70% 이상 심각하게 진행된 위태로운 단계입니다. 신체 균형이 빠르게 무너지고 있으니 더 늦기 전에 대표원장 1:1 집중 치료를 받으셔야 합니다."*
     - **5개 모두 체크 (`5 / 5`)**: **`응급 (100% 한계점 도달)`** 코멘트와 동시에 **화면 중앙에 강렬한 긴급 경고 모달(`#urgent-5check-alert-modal`)이 출현**하며, Web Audio API 기반 묵직한 **"쾅! 쾅!" 2연속 중저음 타격 효과음(`playHeavyDoubleImpactSound`) + 화면 진동(`screenHeavyImpactShake`) + 스탬프 슬램 애니메이션**으로 **`"더이상 방치하지말고 당장 진료받으세요"`** 메시지를 진지하고 강력하게 전달 (사운드 재재생 및 즉시 진료 예약 직통 버튼 탑재).
   - 구버전 브로슈어(`growth-full.html`, `diet-zero-full.html`, `brochure1~10.jpg`)의 핵심 시각자료와 핵심 카피를 최소한의 직관적 문구로 카드에 통합.
4. **성장(`growth.html`) 및 다이어트(`diet-zero.html`) 카드 상세페이지 핵심 모션·비대면 영상·원장 친필 서약 메인 강화**:
   - **성장 상세페이지(`growth.html` / `wordpress-growth.html`)**:
     - 첫 번째 메인 카드(PLATE 01)를 **다른 일반 카드(`56vw × 76vh`)보다 월등히 큰 초대형 히어로 카드(`min(82vw, 1260px) × calc(100vh - 72px)`, 골드 스포트라이트 프레임)**로 확대하여 한눈에 시선을 사로잡도록 구성하고, 좌측에는 안정위 대표원장의 **친아들 성장 치료 원본 이미지(`growth-director-son.png` / `growth-director-son-comparison.png`)를 일체의 분할·편집 없이 원본 그대로 풀사이즈로 배치**, 우측에는 **숫자 표기를 모두 제거한 대표원장 친필 서약서(`father-letter-box`, 고운바탕 친필 서체 + 안정위 원장 서명 + 붉은 직인 `[바른正印]` + 네이버 블로그 원문 링크)**를 메인으로 배치.
     - 무릎 성장판 비교 스캔 카드(`#runway-scroll-ba-plate`)를 **초음파 4대 핵심 성장 지표 비교 분석 카드(`연령별 평균키 · 성장판 나이 · 뼈길이 · 최종예상키 비교 분석`)**로 개편하여 2×2 정밀 비교 대시보드(각 지표별 비교 기준 · 시각 게이지 · 임상 판독 설명)와 하단 핵심 타이틀로 직관적 구성 완료.
   - **다이어트 상세페이지(`diet-zero.html` / `wordpress-diet.html`)**: 과거 브로슈어의 **3가지 핵심 작용 모션 동작(`01 식욕 중추 안정` 전기 스파크 진정 모션 · `02 심부 체지방 분해` 열대사 연소 수축 모션 · `03 붓기 & 독소 완화` 림프 순환 바디 슬리밍 모션)** 카드와 **전국 비대면 진료 4단계 프로세스 및 안심 특급 배송 안내 영상(`concierge-cinema-suite`)** 카드를 추가 반영.
5. **11대 상세페이지 전체 첫 카드 60fps 모션 동작 복원 & 황제공진단(`gongjindan.html`) 기존 스토리 이미지 복구 및 10대 브로슈어 파노라마 아카이브 카드 신설**:
   - **전 상세페이지(11개 전체) 첫 카드 실시간 모션 동작(`motion-video-stage` + 60fps Canvas FX) 완비**:
     - 대표원장(`warm-breath-zoom` 골든 볼류메트릭 광선 + 비디오), 추나(`chuna-lost-movement-fx` 요추 통증 파동), 성장(`sunlight-bokeh` & `growth-starlight` 성장판 눈금·스타라이트 모션), 다이어트(`belt-zipper-morning-fx` 복부 지퍼 대사 정체 모션), 남성탈모/통합탈모(`distance-30cm-tension` 30cm 시선 레이더 모션), 원형탈모(`alopecia-immune-radar-fx` 자가면역 모낭 공격 레이더 모션), 여성탈모(`distance-30cm-tension` 가르마 상열하한 모션), 지루성두피염(`thermal-cooling` 두피 청열 쿨링 파동), 황제공진단(`battery-1pct-warning-fx` 1% 방전 배터리 점멸 모션), 전립선(`prostate-pressure-pulse-fx` 전립선 울혈 압박 파동)까지 모든 상세페이지 첫 카드의 멀티 프레임 크로스페이드 + 60fps 캔버스 모션 + 하단 프로그레스 바 + 장면 전환 버튼을 전면 복구 및 적용 완료.
   - **황제공진단(`gongjindan.html` / `wordpress-gongjindan.html`) 스토리별 원본 이미지 복구 및 파노라마 아카이브 카드(`#gjd-panorama-card`) 탑재**:
     - 카드 1~5의 스토리 텍스트와 100% 부합하는 기존 전용 이미지(`detail_gongjindan_story1_battery_sofa.jpg`, `detail_gongjindan_story1_burnout_clock.jpg`, `detail_gongjindan_story2_bottomless_glass.jpg`, `detail_gongjindan_story3_musk_floodgate.jpg`, `detail_gongjindan_story4_cites_scale.jpg`, `detail_gongjindan_story5_royal_box_family.jpg`)로 완벽 복구.
     - 과거 황제공진단 브로슈어 화보 자료 10장(`brochure/brochure1.jpg` ~ `brochure/brochure10.jpg`: 특허 제10-1744704호, 700년 황실 비방, 사향 보존 공법, 효능 특허 훈장, 사향 씨알 단면, 러시아산 원용 분골, 한의사 100인 검증, 잔류농약·중금속 0ppm 성적서, 원목 자개함 패키징, 4대 명품 약재 도감)을 **단 하나의 파노라마 아카이브 카드(`#gjd-panorama-card`)**에 모아 좌우 드래그·스와이프·이전/다음 버튼·하단 10종 필름스트립 탭·전체화면 확대로 넘겨볼 수 있도록 구현 완료.

---

## 💎 0-1. 직전 완료 작업 요약 (2026-10-18 · 상호명/연락처 전체 통일 & 질환별 상세페이지 직통 연결 & 3D 인체모형 통합 의학백과 일원화 & 실서버 자동 배포)

1. **전 페이지 상호명(`바른한의원 대전본점`) 및 대표 연락처(`010-5631-1275`) 완벽 통일**:
   - 메인 3D 쇼룸(`index.html`, `story-3d.html`), 3D 인체모형 통합 의학백과(`body-explorer.html`), 11대 질환별 상세페이지(`director.html`, `chuna.html`, `growth.html`, `diet-zero.html`, `hairloss.html`, `hairloss-male.html`, `hairloss-alopecia.html`, `hairloss-female.html`, `hairloss-seborrheic.html`, `gongjindan.html`, `prostate.html`), 윤곽진단 스튜디오(`lifting-compare.html`), 글로벌 설정(`clinic-template-config.js`) 및 워드프레스 번들 전체를 **`바른한의원 대전본점`** / **`010-5631-1275`**로 통일 완료.
2. **역할 분리 및 직관적 동선 구축 (펼침 카드 ➔ 질환별 상세페이지 / 3D 모형 ➔ 통합 의학백과 페이지)**:
   - 메인 페이지에서 카드를 펼쳤을 때(`#skt-bento-grid`) 각 카드를 클릭하면 해당 질환 상세페이지로 즉시 이동(탈모 카드는 4대 유형 선택 모달 오픈)하도록 직통 연결 완료.
   - 모든 3D 인체모형은 별도의 통합 의학정보 페이지(`body-explorer.html` / `/body-explorer/`)로 통합 구성하고, 각 질환 상세페이지에서도 해당 부위(`?part=knee`, `?part=lumbar` 등)로 1클릭 이동 가능하도록 연동.
3. **불필요한 버튼 및 오버레이 메뉴 클린 정리**:
   - 메인 페이지 상단 헤더의 개발용 비교 메뉴(`⇄ 수정 전·후 비교 보기`, `수정 전 페이지(3001) ↗`) 삭제 완료.
   - 질환 상세페이지 전체에서 **`B/A 스캔 크게보기`**, **모든 `이미지 크게 보기` 버튼/클릭 확대 라이트박스**, 좌측 하단 **`원장 임상 노트` 도슨트 박스(`.live-plate-docent`)**를 전면 삭제하여 한눈에 깔끔하게 읽히는 레이아웃 완성.
4. **카페24 워드프레스 실서버(`https://www.bareunhaniwon.com/`) 원클릭 배포 자동화 (`homepage/deploy-cafe24.js`)**:
   - `node bundle-wp.js` 실행 후 `node deploy-cafe24.js`로 전체 워드프레스 페이지 배포 및 WP Super Cache 즉시 초기화 완료.

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
