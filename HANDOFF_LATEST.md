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
   - **① 안정위 대표원장 (`homepage/director.html` / `wordpress-director.html` — Lusion `oryzo_ai` 클린 에디토리얼 스타일)**
     - 접속 주소: [http://localhost:3000/director.html](http://localhost:3000/director.html)
     - 좌측 환자 공감 생활 불편감 체크리스트 5종: `병원 검사 정상인데 만성 피로·통증` / `나의 사상체질 궁금증` / `15년 임상 경력 아빠 같은 한의사` / `공장식이 아닌 1:1 체질 한약` / `장기 복용 시 한약재 안전성 걱정`
     - 우측 5막 클린 스토리텔링 (복잡한 HUD 오버레이·다중 프레임 깜빡임 완전 제거, **첫 스토리는 영상 + 이후 스토리는 단일 정밀 화보 + 원장 얼굴은 마지막 STORY 05에만 등장**):
       1. **[STORY 01 · VIDEO] 자세한 설명의 시작 (`detail_director_story1.mp4` / `detail_director_story1_clean.jpg`)**: 원장 얼굴 없이 환자 1인칭 시점으로 따스한 아침 햇살이 가득한 바른한의원의 원목 문을 열고 들어오는 첫걸음 영상 (부드러운 호흡 줌 & 채광 모션)
       2. **[STORY 02 · IMAGE] 손끝으로 읽는 1:1 정밀 맥진 (`detail_director_story2_clean.jpg`)**: 원장 얼굴 없이 골드 실크 맥침대 위 환자의 양 손목 촌·관·척 맥을 동시에 짚는 손끝 클로즈업 화보
       3. **[STORY 03 · IMAGE] 현대의학 통합 치료 설계 (`detail_director_story3_clean.jpg`)**: 원장 얼굴 없이 오버더숄더 시점으로 통합 치료 설계도를 짚어주며, 맞은편 환자가 깊이 만족하며 미소 짓는 화보
       4. **[STORY 04 · IMAGE] 원장 직접 검수 고급 정품 약재 (`detail_director_story4_clean.jpg`)**: 원장 얼굴 없이 순수 1인칭 시점(POV)으로 황동 루페(확대경)를 통해 러시아산 원용 분골의 치밀한 조직과 GAP 청정 약재를 검수하는 화보
       5. **[STORY 05 · IMAGE] 내 가족에게 쓸 수 없는 치료는 하지 않습니다 (`detail_director_story5_clean.jpg`)**: **유일하게 안정위 대표원장님의 따뜻한 얼굴이 등장하는 피날레 컷!** 원내 안심 탕전실을 배경으로 아내와 아이에게 안심 한약을 건네는 장면 & 하단 클린 스펙(`간 수치 AST 21 / ALT 18 정상 유지` · `항산화 +163% 개선` · `10단계 원내 안전 탕전 시스템`) ➔ `NEXT: 02 바른 추나`
   - **② 바른 추나 · 척추교정 (`homepage/chuna.html` / `wordpress-chuna.html` — Lusion `oryzo_ai` 클린 에디토리얼 스타일)**
     - 접속 주소: [http://localhost:3000/chuna.html](http://localhost:3000/chuna.html)
     - 핵심 테마: *"무너진 뼈와 신경의 공간을 열어, 수술 없이 통증의 뿌리를 뽑다"* (육아·업무로 굽어진 등과 찌릿한 허리 통증에서 벗어나 두 팔 벌려 ‘만세!’를 외치는 해방감)
     - 좌측 환자 공감 생활 불편감 체크리스트 5종: `아침 기상 시 목·어깨 경직 및 뒷목 뻐근함` / `오래 앉아 있을 때 허리 통증 및 골반·다리 저림` / `양쪽 어깨 비대칭 및 거북목·라운드숄더` / `진통제·물리치료 후에도 반복 재발하는 통증` / `디스크·협착증 비수술 치료 희망`
     - 우측 5막 클린 스토리텔링 (**첫 스토리는 5단계 연속 영상 + 이후 스토리는 단일 정밀 화보 + 안정위 원장 얼굴은 마지막 STORY 05에만 등장**):
       1. **[STORY 01 · VIDEO] 일상을 멈추게 한 찌릿한 통증 (`detail_chuna_story1.mp4` / `detail_chuna_story1_clean.jpg`)**: 원장 얼굴 없이 사무실 컴퓨터에 앉아 업무를 보던 중 목·허리 통증이 서서히 몰려와 목과 허리를 짚고 찡그리는 **5단계 연속 통증 발현 모션 시퀀스 + 붉은 신경 압박 파동** 영상
       2. **[STORY 02 · IMAGE] 3D 체형 분석 & 1:1 수기 추나 (`detail_chuna_story2_clean.jpg`)**: 원장 얼굴 없이 손끝으로 틀어진 경추·요추·골반의 아탈구 지점을 촉진하고 밀고 당기며 정렬을 맞추는 정밀 수기 추나 화보
       3. **[STORY 03 · IMAGE] 척추 추간판 +3.8mm 감압 기전 (`detail_chuna_story3_clean.jpg`)**: 좁아져 신경을 누르던 디스크 간격이 추나 교정을 통해 `+3.8mm` 넓어지며 붉은 염증 신호가 푸른 회복 빛으로 바뀌는 3D 하이엔드 척추 시뮬레이션 아트워크
       4. **[STORY 04 · IMAGE] 심부 약침 & 어혈 한약 복합 치료 (`detail_chuna_story4_clean.jpg`)**: 원장 얼굴 없이 손상된 심부 인대와 힘줄에 정제 약침을 시술하여 염증을 빠르게 제거하고 어혈 한약으로 근육·인대를 강화하는 타겟 파동 화보
       5. **[STORY 05 · IMAGE] 다시 찾은 가벼운 일상, "만세!" (`detail_chuna_story5_clean.jpg`)**: **원장 사진 제외, STORY 01 동일 환자의 통증 해방 단독 만세 컷!** 허리를 짚던 환자가 통증 없이 활짝 웃으며 두 팔을 머리 위로 번쩍 들어 올리는 만세 화보 & SCI급 국제 학술지 근거 비수술 회복률 오버레이(**`허리·목 디스크(추간판 탈출증) 비수술 회복률 95.2% (PAIN · JAMA Netw Open)`** / **`척추관 협착증 통증·보행기능 회복률 91.4% (BMJ Open · J Clin Med)`**) ➔ `NEXT: 03 바른 성장`
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
