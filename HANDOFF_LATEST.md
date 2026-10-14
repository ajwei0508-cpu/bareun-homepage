# 📋 바른한의원 3D 시네마 홈페이지 — 다른 컴퓨터 작업 이어하기 인수인계서 (HANDOFF_LATEST)

> **최종 업데이트**: 2026-10-15 (최신 `main` 브랜치)
> **작성자**: 하이엔드 홈페이지 디렉터 **아트 (Art)**

---

## 🔥 0. [최우선] 다른 컴퓨터에서 바로 이어서 실행할 마지막 요청 명령어 (Pending Task)

대표님께서 마지막으로 요청하신 작업 명령어는 아래와 같습니다. 새 컴퓨터에서 **`"3번 실행해줘"`** 또는 **`"마지막 작업 이어서 해줘"`**라고 말씀하시면 AI(아트)가 아래 명령어를 즉시 이어받아 수행합니다.

### 📌 마지막 요청 명령어 원문
```text
https://lusion.co/projects/infinite_passerella

처럼 스크롤 해서 이미지로 설명하는 상세페이로 제작해줘 
추나 / 탈모 / 황제공진단 / 안정위 / 카드별로 최고급 디자인으로 연출해주고 내용에 필요한 정보는 온라인에서 수집하고 / 논문 자료를 근거하면 더 좋아 / 필요한 이미지와 영상은 직접 하이엔드 수준으로 생성해줘 / 소비자가 공감 할 수 있는 스토리텔링 필수 / 직관적이게 / 전문가 /
```

### 📌 상세페이지 제작 시 핵심 가이드 (새 컴퓨터 AI 필독)
1. **레퍼런스 연출 (`https://lusion.co/projects/infinite_passerella`)**:
   - 다크 럭셔리 에디토리얼 톤앤매너 + 스크롤 연동 대형 시네마틱 비주얼 시퀀스(Full-bleed / Split Sticky Scroll) + 정교한 타이포그래피 페이드/패럴랙스 + 스크롤에 따라 이미지와 영상이 직관적으로 스토리를 설명하는 구조.
2. **제작 대상 카드 및 상세페이지 연결 (`homepage/story-3d.html` 및 `homepage/index.html` 하단 `#skt-bento-grid`)**:
   - **카드 1 (`안정위원장`)**: 대표원장 철학, 1:1 맞춤 진맥·책임진료 프로세스, 임상 전문성 스토리텔링 (`director.html` 또는 통합 모달/상세페이지 연결)
     - ⚠️ **실제 원장님 얼굴 레퍼런스 이미지**: `homepage/director_real_reference.jpg` (및 `homepage/card_1_director.jpg`)를 반드시 참조하여 100% 동일한 인상(금테 직사각형 안경, 단정한 흑발, 파란 스트라이프 셔츠 + 흰 가운)으로 생성할 것.
   - **카드 2 (`추나`)**: 척추·골반·턱관절·체형 불균형 수기 교정, JAMA Network Open 등 추나요법 SCI급 임상 논문 근거(통증 감소율, 기능 회복 데이터), 소비자 공감 스토리텔링 (`chuna.html` 연결)
   - **카드 5 (`탈모`)**: 두피열(수승화강)·모낭 재생·약침/한약 복합 치료, 한의학 탈모 치료 SCI 논문 및 모낭 성장인자(IGF-1, VEGF 등) 근거 데이터, 200배 두피 현미경 진단부터 발모 회복까지의 스토리텔링 (`hairloss.html` 연결)
   - **카드 6 (`황제공진단`)**: 정품 사향(L-muscone)·러시아산 분골 녹용·국내산 산수유/당귀, 뇌신경보호(NGF, BDNF)·만성피로 회복·항산화/면역 증진 SCI 논문 근거, 24K 금박 수제 조제 공정 및 하이엔드 스토리텔링 (`gongjindan.html` 업그레이드 연결)
   - *(기존 `성장` → `growth.html`, `다이어트` → `diet.html` 등도 필요 시 동일 톤앤매너로 연동 확인)*
3. **작업 완료 후 필수 동기화**:
   - `story-3d.html`에서 카드 클릭 시 각 상세페이지로 자연스럽게 이동하도록 `data-link` 연결 후 `index.html`, `wordpress-story-3d.html`, `wordpress-main-home.html`(`node bundle-wp.js`)까지 완벽 동기화할 것.

---

## 🚀 1. 다른 컴퓨터에서 1초 만에 작업 이어서 시작하는 방법

### 방법 A: AI 어시스턴트(Antigravity)에게 말하기
- **"3번 실행해줘"** 또는 **"마지막에 요청한 상세페이지 작업 이어서 해줘"**
  - AI가 자동으로 `git pull` ➔ `node homepage/serve.js` 실행 ➔ `AGENTS.md` 및 본 `HANDOFF_LATEST.md`를 읽고 위 **0번 마지막 요청 명령어**를 즉시 이어서 수행합니다.

### 방법 B: 터미널 명령어 직접 실행
```bash
git pull origin main
cd homepage
node serve.js
```
> 💡 **`node serve.js` 한 번만 실행하면 아래 3개 주소가 동시에 모두 열립니다!**
> 1. **수정 후 완성본 3D 시네마 (포트 3000)**: [http://localhost:3000/story-3d.html](http://localhost:3000/story-3d.html) (및 `http://localhost:3000`)
> 2. **수정 전·후 1:1 비교 & 좌우 동시 스크롤 스튜디오 (포트 3000)**: [http://localhost:3000/compare.html](http://localhost:3000/compare.html)
> 3. **수정 전 보존본 3D 시네마 (포트 3001 자동 구동)**: [http://localhost:3001](http://localhost:3001)

---

## ✨ 2. 직전까지 완료된 작업 요약 (2026-10-15 새벽 완료분)

1. **하단 6대 핵심 클리닉 카드(`#skt-bento-grid`) 전용 이미지 6종 신규 생성 & 메인 타이틀 단독 표시**
   - 카드 상단 뱃지, 부연 설명 대사, 하단 칩 버튼을 모두 제거하고 **직관적인 이미지 + 메인 타이틀 1개**만 깔끔하게 표시:
     - `안정위원장`: `homepage/card_1_director.jpg`
     - `추나`: `homepage/card_2_chuna.jpg`
     - `성장`: `homepage/card_3_growth.jpg`
     - `다이어트`: `homepage/card_4_diet.jpg`
     - `탈모`: `homepage/card_5_hairloss.jpg`
     - `황제공진단`: `homepage/card_6_gongjindan.jpg`
2. **STORY 06 (`관절 튼튼 회복`) 만세 모션 & 초록색 7대 관절 순차 점등**
   - `life_4b_chuna_recovery.jpg`(차렷 자세)에서 스크롤 시 `life_4b_chuna_manse.jpg`(활짝 웃으며 양팔 만세 자세)로 부드럽게 전환(`uMode == 8`)되며, **`목` ➔ `어깨` ➔ `팔` ➔ `척추` ➔ `허리` ➔ `다리` ➔ `발`** 7개 부위가 에메랄드 그린(`#10B981`)으로 하나씩 순차 팝업됨.
3. **STORY 03 (`쑥쑥 자란 우리 아이`) 키 성장 후 별빛 반짝임 시퀀스**
   - 아이의 키가 작은 모습(`life_1d_growth_short.jpg`)에서 큰 모습(`life_1d_growth_peers.jpg`)으로 자라는 모션(`growthProgress: 0 ➔ 1`)이 완전히 끝난 직후(`growthProgress >= 0.96`)에 별 모양이 팝인되며 반짝이도록 수정 완료.
4. **Lusion 8-Mode 하이엔드 셰이더 & 서정적 피아노·스트링 BGM 엔진 탑재**
   - 8가지 변칙 시네마틱 GLSL 전환 모드(`uMode 0~8`) 및 16마디 서정적 어쿠스틱 피아노 & 첼로/스트링 오케스트라 자동 연주 엔진 적용 완료.

---

## 🎬 3. 현재 완료된 3D 스크롤 시네마 전체 24프레임 구성표 (`FRAMES`)

| 프레임Idx | 챕터 | 화면 대사 (`quote`) | 이미지 파일명 (`homepage/`) | GLSL 모드 |
| :---: | :---: | :--- | :--- | :---: |
| **0** | 1장 (난임·탄생) | `간절한 기다림` | `life_1a0_infertility_before.jpg` | `mode: 0` |
| **1** | 1장 (난임·탄생) | `난임으로 찾게 된 한의원` | `life_1a1_infertility_treatment.jpg` | `mode: 5` |
| **2** | 1장 (난임·탄생) | `힘들게 얻은 선물` | `life_1a_fertilization.jpg` | `mode: 6` |
| **3** | 1장 (난임·탄생) | `소중한 탄생` | `life_1b_birth.jpg` | `mode: 7` |
| **4** | 2장 (소아 면역) | `자꾸만 아픈 우리 아이` | `life_1c_cold_before.jpg` | `mode: 0` |
| **5** | 2장 (소아 면역) | `다시 찾은 한의원` | `life_1c_clinic_exam.jpg` | `mode: 5` |
| **6** | 2장 (소아 면역) | `으랏차차` | `life_1c_immunity.jpg` | `mode: 6` |
| **7** | 3장 (키성장) | `친구보다 너무 작은 우리 아이` | `life_1d_growth_short.jpg` | `mode: 7` |
| **8** | 3장 (키성장) | `성장클리닉을 하다` | `life_1d_growth_clinic.jpg` | `mode: 1` |
| **9** | 3장 (키성장) | `쑥쑥 자란 우리 아이` | `life_1d_growth_peers.jpg` (키 성장 완료 직후 별빛 팝인) | `mode: 6` |
| **10** | 4장 (다이어트) | `육아로 뱃살만...` | `life_2a_obesity.jpg` | `mode: 0` |
| **11** | 4장 (다이어트) | `결심했어!!` | `life_2a_treatment.jpg` | `mode: 2` |
| **12** | 4장 (다이어트) | `늘씬한 내가 되자` | `life_2b_slim_therapy.jpg` | `mode: 7` |
| **13** | 5장 (탈모) | `심해진 탈모` | `life_3a_hairloss.jpg` | `mode: 6` |
| **14** | 5장 (탈모) | `한의원에서 탈모검사 중` | `life_3a_treatment.jpg` | `mode: 4` |
| **15** | 5장 (탈모) | `탈모 두피 치료` | `life_3a_follicle_zoom.jpg` | `mode: 5` |
| **16** | 5장 (탈모) | `자신감 회복` | `life_3b_hair_restored.jpg` | `mode: 7` |
| **17** | 6장 (추나·통증) | `일하면서 온몸이 아파진 나` | `life_4a_work_spine_pain.jpg` (붉은 7대 통증 순차 점등) | `mode: 3` |
| **18** | 6장 (추나·통증) | `한의원에서 추나 치료` | `life_4a_treatment.jpg` | `mode: 6` |
| **19** | 6장 (추나·통증) | `통증 치료` | `life_4a2_ankle_acupuncture.jpg` | `mode: 5` |
| **20** | 6장 (추나·통증) | `관절 튼튼 회복` | `life_4b_chuna_recovery.jpg` ➔ `life_4b_chuna_manse.jpg` (만세 + 초록 7관절 순차 점등) | `mode: 8` |
| **21** | 7장 (황제공진단) | `어느새 기력이 쇠약해지고` | `life_5a_aging_fatigue.jpg` | `mode: 7` |
| **22** | 7장 (황제공진단) | `황제공진단으로 기력충전` | `life_5b_gongjindan_vitality.jpg` | `mode: 5` |
| **23** | 8장 (백세 인생) | `건강한 백세 인생` | `life_5c_graceful_elder.jpg` | `mode: 5` |

---

## 🛠️ 4. 추가 작업 후 동기화 & 배포 명령어 (`homepage/` 폴더 내)

```bash
cd homepage
node sync-before.js
node bundle-wp.js
git add -A
git commit -m "update: high-end scroll detail pages and 3D story cinema"
git push origin main
```
