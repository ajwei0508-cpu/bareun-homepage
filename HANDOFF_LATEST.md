# 📋 바른한의원 풀스크린 3D 인체모형(우측 『진료 살펴보기』 대표 건강 글 제목·구조·레이아웃·색감 올인원 커스텀 스튜디오 + 4대 계통 실시간 모션) — 작업 인수인계서 (HANDOFF_LATEST)

> **최종 업데이트**: 2026-10-28 v5.9 (① **네이버 서치어드바이저(`4069e9810cb66fcbb9eb3955b54e627f5096ac30`) & 구글 서치콘솔(`-OtjjERbe9ctyW4q9rwaFiNj9OvxGvOE7Bd1MBjSsX4`) 소유권 승인 완료 및 이중 영구 내장** · ② **네이버 서치어드바이저 전용 RSS 2.0 피드(`/feed/`) 전 16개 클리닉 페이지·칼럼 통합 송출 고도화** · ③ **전 페이지 의료 YMYL / E-E-A-T `MedicalWebPage` + `reviewedBy: 안정위 대표원장` JSON-LD 스키마 확장** · ④ **A4 3페이지 하이엔드 『바른한의원_대전본점_SEO_최적화_마스터_리포트_2026.pdf』 제작 완료**)
> **작성자**: 하이엔드 홈페이지 디렉터 **아트 (Art)**

---

## 💎 000000000000. 최신 완료 작업 요약 (2026-10-28 v5.9 · 네이버 서치어드바이저 & 구글 서치콘솔 승인 검증 + 마스터 SEO 5대 고도화 & PDF 리포트 발행)

1. **네이버 서치어드바이저 & 구글 서치콘솔 소유권 인증코드 이중 영구 보호 (`seo-master-config.js`, `bareun-member-private-qna.php`)**:
   - 네이버 서치어드바이저(`4069e9810cb66fcbb9eb3955b54e627f5096ac30`) 및 구글 서치콘솔(`-OtjjERbe9ctyW4q9rwaFiNj9OvxGvOE7Bd1MBjSsX4`) 소유권 승인을 실서버 전 16개 페이지에서 검증 완료하고, 워드프레스 DB(`bareun_seo_verification_codes_v1`)와 마스터 코드 상수에 이중 영구 내장.
2. **네이버 서치어드바이저 최적화용 RSS 2.0 피드(`/feed/`) 16개 전 페이지 확장**:
   - `/feed/` 호출 시 15개 클리닉 페이지(`page`)와 의학 칼럼(`post`) 총 16개 항목 전체가 정규 `https://www.bareunhaniwon.com/...` URL 및 정제된 메타 요약문으로 송출되도록 업그레이드.
3. **전 페이지 `MedicalWebPage` + 대표원장 의학 감수(`reviewedBy: 안정위`) 스키마 및 자사 도메인 OG 이미지 일원화**:
   - 6대 JSON-LD 지식그래프(`MedicalClinic`, `WebSite`, `MedicalWebPage`, `BreadcrumbList`, `ProfilePage/Person`, `Article/FAQPage`) 완비 및 자사 실서버 공식 OG 이미지(`https://www.bareunhaniwon.com/wp-content/uploads/2026/10/og-bareun-1200x630-1.jpg`) 통일.
4. **하이엔드 A4 3페이지 PDF 종합 보고서 생성 (`바른한의원_대전본점_SEO_최적화_마스터_리포트_2026.pdf`, `homepage/seo-master-report.pdf`)**:
   - 한지 아이보리·옵시디언 블랙·샴페인 골드·포레스트 그린 디자인 시스템으로 전 16개 페이지 진단표, 크롤러/CWV 규격, 지식그래프 스키마, 사후 운영 가이드를 수록한 PDF 리포트 발행.

---

## 💎 00000000000. 직전 완료 작업 요약 (2026-10-28 v5.8 · 대표 건강 글[팝업 01탭] 제목 · 구조 · 레이아웃 · 색감 올인원 커스텀 스튜디오 업그레이드)

1. **대표 건강 글(팝업 01탭) 커스텀 모달 스튜디오 전면 업그레이드 (`homepage/clinic-menu-editor.html`)**:
   - 네이티브 `<dialog>` 모달을 좌측 **3탭 커스텀 컨트롤러(`📝 제목 · 구조 · 본문` / `📐 레이아웃 · 서체` / `🎨 색감 · 테마 팔레트`)** + 우측 **`👁️ 실시간 팝업 01탭 LIVE 미리보기`** 2분할 스튜디오 구조로 확장.
   - **① 제목 커스텀**: 질문형(`?`) 또는 자유 칼럼형 메인 제목(`strictQuestionMark` 선택 토글), 보조 부제목(`subTitle`), 상단 `[부위명]` 배지 표시 ON/OFF(`showPartBadge`), 이 글 전용 `[배지명]` 직접 오버라이드(`badgeOverride`), 팝업 01탭 상단 라벨(`tab01Step`) 및 버튼명(`tab01Label`) 지원.
   - **② 구조 커스텀**: 원클릭 5종 구조 프리셋(`기본 4단` / `컴팩트 2단` / `3단 매거진` / `통념 Q&A 대비형` / `1단 에세이 칼럼형`) + `+ 새 섹션 블록 추가`, 섹션별 `▲▼ 순서 이동` · `노출 ON/OFF` · `아이콘` · **`섹션 소제목` 자유 변경** · **6종 표현 유형(`text` 줄글 / `highlight` 핵심 강조 박스 / `checklist` ☑ 체크박스 / `bullets` 불릿 / `numbered` 번호 스텝 / `qa` 통념 vs 해답 대비)** · `2열 전체폭(spanFull)` · 문장/항목 무제한 추가·삭제 지원.
   - **③ 레이아웃 & 서체 커스텀**: 팝업 가로 폭(`440px` / `520px` / `640px` / `740px` + 3D 카메라 수평 오프셋 자동 연동), 섹션 배치(`1열 수직 카드` / `2열 벤토 그리드` / `미니멀 디바이더` / `아코디언 접기형`), 헤더 정렬(`가로 인라인` / `상하 스택 매거진` / `중앙 시네마틱`), 제목 서체(`Noto Serif KR` 명조 / `Pretendard` 고딕) & 큰따옴표(`“ ”`) ON/OFF, 글자 크기(`SM`/`MD`/`LG`), 여백 밀도, 모서리 곡률 커스텀.
   - **④ 색감 & 테마 팔레트 커스텀**: 하이엔드 원클릭 8종 색감 프리셋(`시그니처 블랙&골드`, `웜 한지&앤틱 브론즈`, `다크 로얄 오닉스`, `포레스트 세이지 그린`, `로얄 슬레이트 네이비`, `로즈 테라코타 크림`, `퓨어 화이트 에디토리얼`, `앰버 허벌 에스프레소`) + 6대 영역(`headerBg`, `headerText`, `accentColor`, `bodyBg`, `cardBg`, `bodyText`) 실시간 컬러피커·HEX 입력 + 배경 대비 글자색 자동 보정 및 CSS `contrast-color()` / `oklch()` 상대 색상 자동 명도 대비 적용.
   - 모달 하단에서 **`[⚡ 표 반영 + 로컬 3D 즉시 제작]`** 원클릭 실행 및 **`현재 레이아웃 · 색감 디자인을 전체 메뉴에 공통 적용`** 일괄 동기화 지원.
2. **3D 본체 및 워드프레스 번들 렌더링 엔진 완벽 동기화 (`homepage/build-body-explorer.js`, `homepage/body-3d-auto-notes-data.js`)**:
   - `auditCustomLeadNote` 및 `normalizeNoteSections`를 도입하여 기존 2일 주기 54편 자동 순환 에피소드의 엄격한 3단계 검수는 100% 유지하면서, 원장님/관리자가 커스텀한 대표 건강 글의 자유 제목·가변 섹션 구조·레이아웃·색감을 팝업 01탭과 03탭 아카이브 열람기에 오차 없이 렌더링.

---

## 💎 0000000000. 직전 완료 작업 요약 (2026-10-27 v5.7 · 우측 『바른한의원 진료 살펴보기』 메뉴 상세 구성표 직접 수정 & 즉시 제작 스튜디오 구축)

1. **단일 원본(Single Source of Truth) 메뉴 설정 JSON 분리 (`homepage/clinic-explore-menu-config.json` & `.default.json`)**:
   - 기존 코드 내부에 고정되어 있던 우측 9개 진료 살펴보기 메뉴의 **헤더명 · 순서(`01`~`N`) · 노출 여부(`enabled`) · 파트 ID · 우측 버튼명(`shortLabel`) · 팝업 골드 태그(`[부위명]`) · 상단 상태바 타이틀(`menuTitle`) · 3D 내부 장기 13종 선택(`organs`) · 3D 골격 9종 + 척추디스크/반투명 옵션(`bones`, `showDiscs`, `supportBoneOpacity`) · 13종 3D 카메라 줌인 & 핫스팟 프리셋(`cameraPreset`) · 성별 자동 전환(`autoGender`) · 타깃 독자 · 대표 건강 글(`leadNote`)** 전체를 `clinic-explore-menu-config.json` 하나로 통합 연동.
2. **웹 브라우저 실시간 편집 표 + 우측 3D 분할 미리보기 스튜디오 (`homepage/clinic-menu-editor.html`)**:
   - 접속 주소: `http://localhost:3000/clinic-menu-editor.html` (`node serve.js` 실행 시 자동 활성화).
   - 엑셀/노션처럼 표의 모든 셀을 즉시 클릭·수정하고, 3D 장기 칩과 3D 골격·디스크 칩을 원클릭으로 다중 ON/OFF 토글하며, `+ 메뉴 행 추가` / `▲▼ 순서 변경` / `복제` / `삭제` / `[✏️ 대표 건강 글 열람·수정]`(실시간 3단계 의료법·일상어 검수 내장)까지 한 화면에서 수행.
   - 상단 **`[⚡ 표 수정대로 즉시 제작 (로컬 3D 반영)]`** 클릭 시 `/api/clinic-menu-config`가 1초 만에 `body-explorer.html` 및 `wordpress-body-explorer.html`을 자동 제작하고 우측 실시간 3D 인체모형 미리보기 창을 즉시 갱신.
   - 상단 **`[🚀 카페24 실서버 즉시 배포]`** 클릭 시 `deploy-body-explorer-fast.js`가 작동하여 `https://www.bareunhaniwon.com/body-explorer/` 실서버 페이지 업데이트 및 WP Super Cache 초기화까지 원클릭으로 완료.
3. **Antigravity 사이드 패널용 인터랙티브 수정 표 위젯 병행 제공 (`clinic_menu_editor_table.html`)**:
   - IDE 아티팩트 패널에서도 즉시 표를 수정·복사·빌드 요청할 수 있도록 인터랙티브 테이블 아티팩트를 함께 제공.

---

## 💎 000000000. 직전 완료 작업 요약 (2026-10-27 v5.6 · 하단 근육·신경·관절·혈관 4대 계통 모션 & 머리~발가락 해부학 핵심 요약 탑재)

1. **하단 4대 인체 계통 메뉴 추가 (`[근육 | 신경 | 관절 | 혈관]` — `homepage/build-body-explorer.js`)**:
   - 풀스크린 3D 스테이지 하단 컨트롤 바(`.stage-bottom-bar`)에 화이트·옵시디언 블랙·샴페인 골드 배색으로 **`근육` · `신경` · `관절` · `혈관`** 4개 계통 버튼을 추가 배치 (`[남성 체형 | 여성 체형 | 근육 · 신경 · 관절 · 혈관 | ↺ 전체 보기]`).
   - 우측 소형 `바른한의원 진료 살펴보기` 9개 메뉴 및 3탭 건강 정보 팝업과 100% 유기적으로 상호 전환되며, 초기 화면 및 `↺ 전체 보기` / `[✕ 닫기]` 시에는 내부 장기·계통이 비노출되고 도자 인체 외형만 깔끔하게 유지됨.
2. **계통 선택 시 전용 3D 인체 해부 시각화 및 실시간 전신 인체 모션 전환 (`homepage/body-3d-webgl-engine.js`)**:
   - 월드 좌표계 전방향 기구학(Forward Kinematics) 버텍스 모션 엔진(`GLSL_MOTION_CHUNK` + `evalSystemBodyMotionJS`)을 통해 인체 외피·근육·골격·관절·장기·신경·혈관·3D 마커가 60fps로 오차 없이 동기화 작동:
     - **`근육` 모드**: 19만 버텍스 인체 메쉬 기반 에코르셰(Écorché) 줄무늬 근섬유·건막/힘줄 셰이더 + **팔꿈치 컬 수축·어깨 외전·흉곽 호흡·하체 근수축 모션**.
     - **`신경` 모드**: 반투명 투시 인체 + 3D 뇌(`brain.glb`) + 뇌신경·척수·상완신경총(손끝)·늑간신경·좌골/경골/비골신경(발가락 끝) 3D 신경망 + **황금빛 활동전위 전도 파동 셰이더 & 경추 감각 스캔·사지 교차 반사 모션**.
     - **`관절` 모드**: 반투명 투시 인체 + 머리뼈~발가락 전신 9대 골격(`Skeleton.glb` 전 파트 개방) + 턱관절·척추 디스크·어깨·팔꿈치·손목/손가락·고관절·무릎 반월상연골·발목/발가락 연골(`Joints.glb`) + **전신 다관절 가동범위(ROM) 굴신·회전 모션**.
     - **`혈관` 모드**: 반투명 투시 인체 + 생리적 `lub-dub` 이중 박동 심장(`heart.glb`) + 전신 동맥·정맥 순환망(`Vascular.glb`) + **동맥 원심성 혈류 파동·정맥 구심성 환류 셰이더 & 종아리(제2의 심장) 정맥 펌프 모션**.
3. **해부학 교재 기준 머리에서 발가락까지 12구간 한글 핵심 요약 (`homepage/body-3d-anatomy-systems-data.js`)**:
   - 대한해부학회 해부학 교재 기준으로 인체를 **01 머리·얼굴·턱 → 02 목 → 03 어깨 → 04 가슴·등 → 05 위팔·팔꿈치 → 06 아래팔·손목·손가락 → 07 복부·허리 → 08 골반·고관절·엉덩이 → 09 허벅지 → 10 무릎·오금 → 11 종아리·정강이 → 12 발목·발바닥·발가락** 12구간으로 빠짐없이 구성 (총 48개 해부학 요약 카드).
   - 모든 부위마다 일반인이 즉시 이해할 수 있는 쉬운 한글로 **`1. 기능 · 역할` / `2. 통증` / `3. 운동법`** 핵심만 명쾌하게 전달하며, 칩 또는 3D 번호 마커 클릭 시 해당 부위로 3D 카메라가 부드럽게 확대 이동하고 샴페인 골드 포커스 조명이 점등됨.

---

## 💎 00000000. 직전 완료 작업 요약 (2026-10-27 v5.5 · 3D 내부 장기 클릭 시 활성 + 테마/하단 검수 문구 비노출 + 화이트·블랙·골드 하이엔드 배색)

1. **3D 인체모형 내부 장기 기본 감춤 & 메뉴 클릭 시에만 활성화 (`homepage/body-3d-webgl-engine.js`)**:
   - 초기 풀스크린 대기 화면(및 `[✕ 닫기]` / `↺ 전체 보기` 복귀 시)에는 오장육부(`loadedOrgans`), 전신 골격·성장판(`boneIllustrationMap`), 척추 추간판(`spinalDiscs3D`), 자궁(`uterus3D`), 전립선(`prostate3D`), 전신 혈관(`vascularGroup`), 자율신경(`autonomicNerveGroup`), 공진단 브릿지(`gongjindanBridgeGroup`)를 **100% 비노출(`visible = false`)**하고, 인체 외피(`uCenterAlpha = 0.88`, `depthWrite = true`)만 매끄러운 도자 조각상 형태로 노출.
   - 우측 소형 메뉴(또는 3D 포인트) 클릭 시 즉시 인체 외피가 반투명 투시(`uCenterAlpha = 0.22`, `depthWrite = false`)로 전환되면서 **클릭한 메뉴에 해당하는 내부 장기·골격·신경만 선명하게 활성화**.
2. **테마(Theme) 및 하단 검수 내용 전면 비노출 (`homepage/build-body-explorer.js`)**:
   - 정보 팝업 상단 메타 바(`.hip-meta-strip` — 테마·키워드·발행일 행) 및 메뉴 ③ 누적 아카이브 카드의 테마 태그(`.archive-theme-pill`)를 완전 제거.
   - 정보 팝업 하단 검수 푸터(`.hip-audit-footer` — `1차 학술 팩트 · 2차 의료법 제56조 · 3차 일상어 검수 통과`)를 완전 제거하여 `[부위명] | "[공감형 질문 타이틀]" [✕ 닫기]` 헤더와 1~4번 본문 카드만 순수하게 노출 (빌드·런타임 3단계 자가 검수 검증 로직은 백그라운드에서 그대로 작동).
3. **화이트 · 블랙 · 골드(White · Black · Champagne Gold) 럭셔리 배색 적용**:
   - 순백(`#FFFFFF`) · 옵시디언 블랙(`#0D0D0F`) · 샴페인 앤틱 골드(`#C5A059` / `#E5C67E` / `#967128`) 3색 시스템으로 상단 브랜드/조회수/액션 필, 우측 소형 9대 진료 메뉴, 하단 체형/전체보기 바, 3D 핫스팟 마커, 3메뉴 플로팅 정보 팝업 전 영역을 통일.

---

## 💎 0000000. 직전 완료 작업 요약 (2026-10-27 v5.4 · 풀스크린 3D 인체모형 + 우측 소형 수직 메뉴 나열 + 블랙 & 화이트 모노크롬 UI 개편)

1. **3D 인체모형 `100vw × 100vh` 전체화면(Fullscreen) 전환 (`homepage/build-body-explorer.js`)**:
   - 기존 좌 42% : 우 58% 분할 그리드를 제거하고 `#vibrant-3d-stage`와 `#vibrant-body-canvas`를 `position: fixed; inset: 0; width: 100vw !important; height: 100vh !important;` 풀스크린으로 확장.
   - 과거 버전의 시그니처 **웜 한지 베이지 배경 & 반투명 도자(Porcelain) 3D 인체모형·골격·신경·오장육부**는 100% 그대로 보존하면서, 와이드 모니터(`16:9` / `16:10`)와 모바일 전 해상도에서 머리끝부터 발끝까지 전신이 한눈에 들어오도록 수직 시야각(`vFOV 55°`)을 정밀 보정.
   - 우측 메뉴 클릭으로 정보 팝업이 열릴 때는 `camera.setViewOffset`을 통해 확대된 3D 부위가 좌측 오픈 영역 중앙에 자동으로 자리잡고, `[✕ 닫기]` 또는 `↺ 전체 보기` 클릭 시 즉시 화면 정중앙 풀스크린 전신 뷰로 복귀.
2. **『바른한의원 진료 살펴보기』 우측 소형 수직 메뉴 나열 (`.right-compact-menu`)**:
   - 상단 2단 바 및 대형 2열 카드 독을 걷어내고, 화면 우측 중앙(`right: 18px; width: 176px`)에 **`바른한의원 진료 살펴보기`** 헤더 캡과 `01 성장 · 성조숙증` ~ `09 전립선 · 배뇨 기능` 9개 소형 수직 버튼 리스트를 컴팩트하게 배치.
3. **전 메뉴 및 팝업 블랙 & 화이트(Black & White) 컬러 시스템 완성**:
   - 상단 미니멀 브랜드/액션 필 버튼, `visit-tracker.js` 조회수 배지 오버라이드, 우측 소형 수직 메뉴, 하단 `[남성 체형 | 여성 체형 | ↺ 전체 보기]` 컨트롤 바, 3D 핫스팟 마커, 플로팅 3메뉴 정보 팝업(`01 오늘의 건강 글` · `02 무엇이든 물어보세요` · `03 더 궁금하세요?`) 전 영역을 순수 **블랙(`#0A0A0A`) & 화이트(`#FFFFFF`) + 모노크롬 그레이(`#F4F4F5` / `#D4D4D8`)** 팔레트로 통일.

---

## 💎 000000. 직전 완료 작업 요약 (2026-10-27 v5.3 · 3D 인체 『바른한의원 진료 살펴보기』 3메뉴 정보 팝업 패널 & 2일 주기 AI 3단계 자가검수 자동 업데이트)

1. **『바른한의원 진료 살펴보기』 클릭 시 열리는 3대 메뉴 구성 (`homepage/build-body-explorer.js` → `body-explorer.html` / `wordpress-body-explorer.html`)**:
   - 좌측 42% 과거 버전 **웜 한지 베이지 & 반투명 도자(Porcelain) 3D 인체모형**은 100% 그대로 유지.
   - 우측 『바른한의원 진료 살펴보기』 메뉴 항목(또는 3D 인체 포인트)을 클릭하면 3D 카메라가 해당 부위로 줌인되면서 정확히 **총 3가지 메뉴**로 구성된 정보 팝업 패널이 열림:
     1. **메뉴 ① `오늘의 건강 글` (최신 글 단 1개 노출)**:
        - 표준 출력 박스 규격(`┌ [부위명] | "[공감형 질문 타이틀]" [✕ 닫기] ┐` → `🎒 1. 일상 속 공감 상황(2줄)` → `💡 2. 몸속 연골/신경이 알려주는 진실(2줄)` → `❌ 3. 흔히 하는 오해 바로잡기(2줄)` → `🔍 4. 오늘 밤 집에서 해보는 1분 체크(관찰 기준 2가지)`)으로 최신 글 **단 1편만** 깔끔하게 노출.
        - 성장 파트(`knee` · `[무릎 성장판]`) 대표 노출 글: 테마 `[소아 비만]` — **“통통하게 오른 살이 정말 나중에 다 키로 갈까요?”** (타깃: 초등학생 자녀를 둔 학부모).
     2. **메뉴 ② `무엇이든 물어보세요`**:
        - 해당 인체 부위의 실시간 1:1 질문·답변 현황(`/wp-json/bareun/v1/qna?part=<id>`) 조회 및 `✏️ 1:1 질문 남기기` 직통 연결.
     3. **메뉴 ③ `더 궁금하세요?` (누적 글 목록)**:
        - 동일 프롬프트와 3단계 자가 검수를 통과하여 2일 주기로 발행·누적된 건강 글 목록(`publishDate <= todayKst`)을 부위별/전체 부위별로 한눈에 모아보고 클릭 즉시 열람 가능.
2. **[AI 내부 3단계 자가 검수 루프] 코드 게이트화 (`homepage/body-3d-auto-notes-data.js` & `bareun-member-private-qna.php`)**:
   - **1차 검수 (의학·학술 팩트 체크)**: 소아내분비학·소아정형학·한방소아과학 및 각 분과 논문 근거 매핑, 질문형(`?`) 후킹 제목 및 각 항목 2줄/2가지 규격 강제 검증.
   - **2차 검수 (의료법 제56조 및 무홍보 검증)**: `'완치'`, `'100%'`, `'최고'`, `'예약'`, `'내원'`, `'상담'`, `'바른한의원'`, `'원장'` 등 단정적·상업적·내원 유도(CTA) 어휘 **0글자(100% 차단)**.
   - **3차 검수 (어휘 순화 및 핵심 키워드 검증)**: `'대퇴골'`, `'골단판'`, `'아로마타제'`, `'추간판'` 등 어려운 전문 용어를 `'허벅지 뼈'`, `'무릎 성장 연골'`, `'허리 물렁뼈 쿠션'` 등 초보자 일상 언어로 100% 순화하고 핵심 키워드 1~2회 자연 포함 검증 (`54 / 54편 100% 통과`).
3. **2일 주기(48시간) 신규 글 자동 업데이트 이중 엔진 (`bareun-member-private-qna.php` · `local-bareun-api.js` · `google-apps-script-daily-blog.gs`)**:
   - **KST 날짜 기준 2일 간격 자동 해금 스케줄러**: 한국 표준시(`Asia/Seoul`) 자정 기준으로 2일마다(`2026-10-23` → `10-25` → `10-27` → `10-29` → `10-31` → `11-02`...) 메뉴 ①의 대표 노출 글이 최신 글로 자동 교체되고 이전 글은 메뉴 ③(`더 궁금하세요?`) 누적 목록으로 자동 편입.
   - **실서버 REST API & WP-Cron / GAS 48시간 AI 자동 생성기**: 워드프레스 백엔드 `/wp-json/bareun/v1/body-notes` (`GET`/`POST`) 및 48시간 주기 WP-Cron(`bareun_every_two_days`), Google Apps Script(`setupBody3DEvery2DaysTrigger`, `everyDays(2)`)가 Gemini API + 서버 3단계 자가 검수기를 거쳐 영구적으로 신규 글을 자동 생성·축적.

---

## 💎 00000. 직전 완료 작업 요약 (2026-10-27 v5.2 · 3D 인체 모형 디자인 과거 버전 완벽 복원 및 최신 기능 통합)

1. **과거 시그니처 『웜 한지 베이지 & 반투명 도자(Porcelain) 3D 인체 해부 모형』 엔진 완벽 복원 (`homepage/body-3d-webgl-engine.js`)**:
   - v5.0의 퍼플/블루 불투명 진주 셰이더를 걷어내고, 과거 버전(`17e2a71` / `6ec05eb`)의 **`createStylizedPorcelainBodyMaterial` (하이라이트 `#FAF6EC` · 미드톤 `#EFE6D5` · 림 `#D2C2A8` · 웜 브라운 외곽선 `#6E5844` · 반투명 알파 `0.22~0.84`)** 셰이더를 100% 복원.
   - 초기 전체 조망 시부터 반투명 인체 윤곽 내부로 **셀셰이딩 오장육부(`brain`, `heart`, `liver`, `stomach`, `intestine`, `kidneys`, `thyroid`), 웜 아이보리 전신 골격(`Skeleton.glb`), 무릎 성장판 에메랄드 글로우, 시안 척추 추간판(`spinalDiscs3D`), 자궁(`uterus3D`), 전립선(`prostate3D`), 혈관·자율신경망, 황제공진단 골든 브릿지**가 입체적으로 투시되도록 복구.
2. **과거 5대 브랜드 컬러 분할 워크스페이스 복원 & 2단 헤더 시안성 고도화 (`homepage/build-body-explorer.js` → `body-explorer.html` / `wordpress-body-explorer.html`)**:
   - **좌측 42% 고정 3D 스테이지 (`.vibrant-3d-stage`)**: 따뜻한 한지 크림 그라데이션(`#FFFDF9 → #F1EADC → #E5DCCB`), 인체 위 9개 트리플닷 펄스 핫스팟(`.body-3d-hotspot`), 하단 `[남성 체형 | 여성 체형 | ↺ 원위치]` 컨트롤 바 및 워드프레스 Astra 테마 폭 붕괴 방지 가드(`width/min-width/max-width: 100% !important`) 완벽 적용.
   - **상단 2단 풀폭 헤더 (`.vibrant-header`)**: 1단에는 브랜드 타이틀과 실시간 방문 조회수 배지(`📊 조회수 오늘 N · 누적 N`), `📘 의학 인사이트`, `🔒 질환별 비공개 Q&A`, `← 메인 쇼룸`, `진료 상세카드 ↗` 버튼을 배치하고, 2단 전용 바에 **9대 인체 부위 퀵네비 칩 전체가 잘림 없이 한눈에 노출**되도록 구성.
   - **우측 58% 생활 꿀팁 & 해외 SCI 근거 패널 (`.tips-scroll-panel`)**:
     - `① ✅ 실천 DO vs ❌ 주의 DON'T` · `② ⏰ 아침 · 낮 · 밤 하루 루틴` · `③ 🥗 추천 식단 & 🤲 3분 지압` · `④ 🌍 해외 · 통합 SCI 논문 근거` 4탭 구성 및 연관 세부 클리닉(탈모 4대 유형 등) 직통 칩 탑재.
3. **전 페이지 3D 인체모형 진입 버튼 브랜드 톤 통일 (`index.html`, `story-3d.html`, `build-story-detail-pages.js`, `build-ask-doctor.js`, `deploy-cafe24.js`)**:
   - 기존의 차가운 블루 버튼을 모두 따뜻한 앰버 한지 골드 버튼(`#FEF3C7` / `#F59E0B` / `#92400E`, `💡 3D 생활꿀팁`)으로 일원화.

---

## 💎 0000. 최신 완료 작업 요약 (2026-10-27 v5.1 · 전 페이지 실시간 방문 조회수 확인 배지 & 방문 통계 대시보드 구축)

1. **전 페이지 상단 GNB 및 플로팅 『📊 조회수 · 오늘 / 누적』 실시간 배지 탑재 (`visit-tracker.js`)**:
   - 메인 3D 쇼룸(`index.html`, `story-3d.html`), 풀스크린 3D 인체모형(`body-explorer.html`), 의학 인사이트 & 비공개 Q&A(`ask-doctor.html`), 11대 클리닉 상세페이지(`director.html`, `chuna.html`, `growth.html`, `diet-zero.html`, `hairloss*.html`, `gongjindan.html`, `prostate.html`), 리프팅 윤곽진단(`lifting-compare.html`) 및 워드프레스 올인원 번들(`wordpress-*.html`) 전 페이지에 실시간 조회수 배지를 탑재.
   - 어느 페이지에서든 **`📊 조회수 오늘 N · 누적 N`** 버튼을 클릭하면 즉시 **실시간 방문 조회수 통계 대시보드 모달**이 열림.
2. **실시간 방문 통계 대시보드 & 백엔드 DB 자동 기록 (`bareun-member-private-qna.php` & `local-bareun-api.js`)**:
   - **5대 핵심 지표 카드**: `오늘 방문 조회수(TODAY) & 순방문자(UV)`, `어제 방문 조회수 & 순방문자`, `최근 7일 / 30일 조회수`, `누적 총 조회수(TOTAL) & 누적 순방문자`, `현재 실시간 접속자(최근 15분 활성 세션)`.
   - **최근 14일 일별 조회수 추이 막대그래프** 및 **페이지·클리닉별 인기 조회 순위 TOP 8 프로그레스 바**(메인 3D 쇼룸, 다이어트, 추나, 소아 성장, 황제공진단, 탈모, 대표원장, 전립선 등 오늘 증가분과 누적 조회수 동시 표시).
   - **유입 경로(Referrer: 네이버 검색, 구글 검색, 카카오·다음, SNS·유튜브, 직접 방문)** 및 **접속 기기(모바일·데스크톱·태블릿)** 자동 분류 집계.
   - **👑 마스터 관리자 전용 실시간 로그 & 보정치 설정**: 마스터 계정(`wealthywei0508` / `A50tkf100djrA!`) 로그인 시 최근 방문자 50명의 **열람 페이지 · 접속 IP · 유입경로 · 기기 · 접속 시각** 실시간 상세 테이블 조회 및 **기본 누적 조회수 보정치(`baseOffset`)** 즉시 변경·저장 기능 제공.

---

## 💎 000. 최신 완료 작업 요약 (2026-10-26 v5.0 · Vibrant 풀스크린 3D 그래픽모션 + 해외 SCI 단독 대표 블로그 + 소셜 회원가입 & 마스터 전용 100% 비공개 Q&A)

1. **모든 기존 발행글 비공개(Draft) 감춤 & 시술 홍보 배제 '대표 전문가 의학 아티클 단 1편' 단독 발행**:
   - 기존 36개 워드프레스 발행 포스트 전체를 `status: 'draft'`(비공개 보관)로 전환하고 구버전 공개 댓글을 전수 정리하여, 실서버에는 오직 **대표 의학 리서치 아티클 단 1편(`https://www.bareunhaniwon.com/integrative-autonomic-circadian-gut-spine-health-review/`)**만 단독 공개.
   - `"안정위 원장 시술"` 등 특정 의료인·시술 홍보 문구를 **0건(완전 삭제)**으로 배제하고, 순수 의학·생리학·예방의학 기반 전문가 저널(`바른 통합의학 리서치 에디토리얼`) 컨셉으로 확립 (`disease-blog-seed-data.js`, `llms.txt`, `google-apps-script-daily-blog.gs`).
2. **블로그와 Q&A 메뉴 완전 분리 — 『9대 질환별 1:1 비공개 Q&A』 독립 메뉴 구축 (`ask-doctor.html` / `/ask-doctor/`)**:
   - 상단 GNB 탭 및 히어로 스위처를 통해 **`📘 의학 인사이트 블로그 (대표글)`**(`?tab=blog`)과 **`🔒 질환별 1:1 비공개 Q&A`**(`?tab=qna`)를 명확히 분리 (`build-ask-doctor.js`).
   - 9대 질환 카테고리(`성장·성조숙·면역`, `경추·두피열·탈모`, `척추·디스크·체형통증`, `만성피로·면역·뇌활력`, `자율신경·두통·실신`, `소화기·담적·역류식도염`, `대사·내장지방·다이어트`, `자궁·난임(IVF)·여성건강`, `전립선·배뇨·남성활력`)별로 독립된 비공개 상담 게시판 제공.
3. **한의학·통합의학 논문 외 관련 해외 메이저 의학 논문 총망라 인용**:
   - *Nature Medicine* (전신 만성염증·피로), *NEJM* (성인 갈색지방 열생산), *The Lancet* & *JAMA* (만성 요통·척추 수기치료 RCT 메타분석), *Physiological Reviews* (Microbiota-Gut-Brain Axis), *European Heart Journal* (ESC 미주신경성 실신 가이드라인), *JCEM* (서파수면 성장호르몬 생리), *Nature Reviews Disease Primers* (모낭 모유두 미세염증), *Human Reproduction Update* (자궁내막 수용성·나선동맥), *European Urology* (하부요로증상·야간뇨 가이드라인) 등 해외 권위 저널을 대표 블로그·질환별 Q&A 배너·3D 드로어 전 영역에 수록.
4. **회원가입자 전용 질문 권한 & Google · 카카오톡 · 네이버 빠른 소셜 회원가입/로그인**:
   - 워드프레스 커스텀 백엔드 플러그인(`wp-plugin/bareun-member-private-qna/bareun-member-private-qna.php` → `/wp-json/bareun/v1/*`) 및 로컬 미러 API(`local-bareun-api.js`) 구축.
   - 비회원 질문 시 `401 Unauthorized` 원천 차단, **Google · 카카오톡 · 네이버 3초 원탭 소셜 가입/로그인** 및 이메일 회원가입 지원 (OAuth 키 설정 시 정식 팝업 인증 및 미설정 시 원탭 간편 소셜 가입 자동 지원).
5. **모든 질문 100% 비공개 보호 & 마스터(`👑 마스터`) 전체 열람·상세 회원정보 조회·1:1 답변**:
   - 비회원 및 타 회원에게는 서버 응답 단계부터 본문·개인정보가 완전히 제거된 마스킹 데이터(`🔒 비공개 건강 상담 질문입니다`)만 반환되며, 오직 **작성자 본인**과 **마스터 관리자(`wealthywei0508`)**만 열람 가능.
   - 마스터 로그인 시 전 카테고리 비공개 잠금 해제 + **가입회원 상세정보 도시에(`성함, 가입채널(Google/Kakao/Naver/Email), 이메일, 휴대폰 연락처, 성별, 연령대, 증상 지속기간, 접속 IP, 등록일시`)** 확인 + **전체 가입회원 명부 상세열람** + **1:1 비공개 답변 등록/수정/삭제** 지원.
6. **풀스크린 3D 인체모형 & 우측 바른한의원 진료 메뉴 & 3D 그래픽모션 & 연관 하위메뉴 순차 재활성화 (`body-explorer.html` / `/body-explorer/`)**:
   - 기존 15종 3D GLB·프로시저럴 장기·척추·신경 모형(`skinF2.glb`, `skinMB2.glb`, `Skeleton.glb`, `spinalDiscs3D`, `brain`, `heart`, `liver`, `stomach`, `intestine`, `kidneys2`, `thyroid`, `Vascular`, `uterus3D`, `prostate3D`, `autonomicNerveGroup`, `gongjindanBridgeGroup`) **100% 그대로 보존**.
   - `https://vibrant.noomoagency.com/` 레퍼런스 감성의 `100vw × 100vh` 전체화면 오로라 스테이지 + 진주빛 이리데슨트 3D 인체 + 상단 `[여성 ♀ | 남성 ♂]` 토글 + 인체 정중앙 화이트 더블링 핫스팟(`◉`) + 우측 반투명 글래스 『바른한의원 진료 살펴보기』 메뉴 독 구현 (`body-3d-webgl-engine.js`, `build-body-explorer.js`).
   - 진료 메뉴 클릭 시 **3D 카메라 플라이투 + 3D 바이오 스캔 파동 + X-ray 유리 투시 전환 + 3D 이중 홀로그램 자이로 링 회전 + 3D 생체신호 입자 스트림** 그래픽모션이 즉시 작동하며, 이어서 **3D 세부 포커스 콜아웃 버튼 + 연관 세부 진료 클리닉 바로가기 + 생활꿀팁 드로어 + 해외 SCI 논문 드로어 + 질환별 1:1 비공개 Q&A 직통 버튼**이 순차 캐스케이딩 애니메이션으로 활성화됨.

---

## 💎 00. 직전 완료 작업 요약 (2026-10-26 초기본 · 3D 생활꿀팁 vs 무엇이든 물어보세요 2개 페이지 분리 기록)

1. **시안성 극대화 & 혼돈 원천 제거 — 2개 페이지 100% 역할·컬러 분리**:
   - **페이지 ① `3D 인체모형 · 부위별 생활 꿀팁 창고` (`body-explorer.html` / `wordpress-body-explorer.html` / `/body-explorer/`)**:
     - 기존 5군데에 중복 산재하던 블로그/백과 줄글 박스를 전면 제거하고, **웜 한지 아이보리(`#FAF7F0`) & 골드/그린 팔레트** 기반의 순수 **3D 인체모형(좌 40%) + 생활 꿀팁 3탭(`① ✅ 실천 DO vs ❌ 주의 DON'T`, `② ⏰ 아침·낮·밤 하루 루틴`, `③ 🥗 추천 식단 & 🤲 3분 지압`, 우 60%)** 전용 페이지로 개편 (`build-body-explorer.js`, `body-3d-webgl-engine.js`).
     - 상단 헤더 및 우측 하단 단일 브릿지 배너를 통해 해당 부위의 공식 의학백과·질문방(`ask-doctor.html?part=<id>`)으로 1클릭 연결.
   - **페이지 ② `무엇이든 물어보세요 · 공식 의학백과 블로그 & 원장 Q&A` (`ask-doctor.html` / `wordpress-ask-doctor.html` / `/ask-doctor/`)**:
     - **로얄 슬레이트 네이비(`#0F172A`) + 에메랄드 그린(`#10B981`) + 15:1 초고대비 순백(`#FFFFFF`)** 에디토리얼 매거진 & 공개 문답 전용 허브 신설 (`build-ask-doctor.js`).
     - 상단 실시간 증상 검색창, `전체 발행글(36) / 📘 공식 의학백과 마스터(9) / 📰 심층 임상칼럼(27)` 모드 탭, 9대 질환 필터 칩, 정적 검색 크롤러 디렉토리(`<nav class="seo-crawl-directory">`) 탑재.
2. **의학백과 자체를 정식 워드프레스 블로그로 발행 (총 36편 고유 영문 URL)**:
   - 기존 JS 내부 데이터로만 존재하던 9대 부위 의학백과를 **9편의 『공식 의학백과 마스터 포스트(`isEncyclopediaMaster: true`)』**로 승격하고, 기존 27편 임상칼럼과 통합하여 총 **36편 전수**를 `https://www.bareunhaniwon.com/daejeon-.../` 고유 영문 슬러그(`status: 'publish'`)로 정식 발행 (`upgrade-blog-seed-data.js`, `disease-blog-seed-data.js`, `wp-published-posts-map.json`).
   - 기본 샘플 글(`Hello world!`) 및 구버전 중복 포스트 자동 정리로 `wp-sitemap-posts-post-1.xml`에 정확히 36편만 클린 노출.
3. **발행된 블로그에서 답글(댓글)로 질문을 받는 실시간 Q&A 시스템 구축**:
   - 전 발행글 `comment_status: 'open'` 및 워드프레스 `options-discussion.php` 비회원·무로그인·즉시노출·대댓글 스레드 설정 완료.
   - `/ask-doctor/` 본문 리더 하단 답글창(`POST /wp-comments-post.php`, 로컬 `POST /api/blog-comments`) 및 단독 블로그 퍼머링크(`/<slug>/#respond`) 양쪽에서 회원가입 없이 즉시 질문 등록 가능하며, 원장님 답변 시 `👨‍⚕️ 안정위 대표원장 · 바른한의원 대전본점 · 공식 답변` 인증 배지로 렌더링.
   - 9대 공식 의학백과 마스터 글에 대표 환자 질문 & 안정위 대표원장 공식 답변 스레드 기본 탑재 완료.
4. **국내(네이버·다음) 및 해외·글로벌 AI 검색엔진(Google, Bing, ChatGPT Search, Perplexity) 노출 최적화**:
   - 36편 전수에 `🤖 AI 핵심 3줄 즉답 요약(TL;DR)`, `🌐 Global Medical Abstract(영문 의학 초록)`, `📊 시맨틱 임상 비교표(<table>)`, `❓ 다빈도 Q&A`, 한·영 이중언어 `JSON-LD`(`MedicalWebPage` + `MedicalClinic` + `Physician` + `FAQPage` + `BreadcrumbList`) 내장.
   - `bundle-wp.js`에서 `application/ld+json` 스크립트를 Base64 인코딩하지 않고 원형 보존하도록 업그레이드하여 크롤러 즉시 파싱 보장.
   - 글로벌 AI 에이전트용 이중언어 `homepage/llms.txt` 생성, `google-apps-script-daily-blog.gs` v4.0 업그레이드, `IndexNow` 실시간 검색엔진 색인 핑 연동 완료.
5. **전역 내비게이션 연동 (`index.html`, `story-3d.html`, `build-story-detail-pages.js` 11개 클리닉 상세페이지 전체)**:
   - 모든 페이지 상단 GNB 및 카드 연결 버튼에서 `💡 3D 생활꿀팁`(`/body-explorer/`)과 `💬 무엇이든 물어보세요`(`/ask-doctor/`)를 명확히 구분하여 직통 연결.

---

## 💎 0. 직전 완료 작업 요약 (2026-10-24 최신본 · 소아 성장 상세페이지 04번 카드 3단계 수직 폭풍 키 성장 모션 추가 & 황제공진단/전립선 10카드 구성 개편 및 카페24 실서버 배포 완료)

0. **소아 성장 상세페이지(`growth.html` / `wordpress-growth.html`) 04번 카드 수직 폭풍 키 성장 모션 탑재 (`build-story-detail-pages.js`)**:
   - **배경·신장계(`70cm~180cm`) 100% 고정 & 3단계 실제 키 성장 시퀀스 이미지 적용**:
     - `growth_minimal_card4_short_before.jpg?v=grw4v3`: 또래보다 작던 성장 전 단계 (`~125cm` 지점)
     - `growth_minimal_card4_growing_mid.jpg?v=grw4v3`: 무릎·발목 성장판 골든 글로우 활성화와 함께 쑥쑥 자라나는 중간 단계 (`~158cm` 지점)
     - `growth_minimal_card4_tall_after.jpg?v=grw4v3`: 훤칠한 비율로 우뚝 자란 폭풍 성장 완료 단계 (`~180cm` 최상단 지점)
   - **전용 수직 키 성장 모션(`stage: 4` · `.growth-tall-seq-stage`) 구현**:
     - 3프레임 연속 크로스페이드(`growthTallSeqFrame2`, `growthTallSeqFrame3`, `transform: scale(1)` 고정으로 배경 흔들림 0%)
     - 아이의 정수리 높이를 따라 아래에서 위로 상승하는 **골든 수평 신장 측정 레이저 바(`.growth-height-laser-bar`, `GROWTH · +15cm 쑥쑥 ↑`)**
     - 양측 수직 상승 성장 벡터 화살표(`.growth-upward-arrows-svg`), 무릎 성장판 골든 펄스(`.growth-epiphyseal-glow`), 위로 솟구치는 스타라이트 파티클(`.growth-spark.gs1~gs6`) 탑재.
1. **메인 진료카드 쇼케이스(`#skt-bento-grid` · `story-3d.html`, `index.html`)에 `전립선 · 남성활력` 전용 카드 메뉴 신설**:
   - 기존 황제공진단 카드 내부 보조 칩으로만 있던 전립선 메뉴를 독립시켜 **7번째 전용 카드(`전립선 · 남성활력`, `prostate.html` 직통 연결)**로 추가 완료.
   - 중복 없는 신규 전용 카드 배경 에셋(`card_7_prostate.jpg`)을 생성하여 적용하고, 데스크톱 12컬럼 벤토 그리드(상단 3카드 `span 4` + 하단 4카드 `span 3`) 및 모바일 반응형 그리드(상단 대표원장 풀폭 + 하단 6대 클리닉 `2×3` 대칭 배치)로 완벽 정렬.
2. **황제공진단(`gongjindan.html` / `wordpress-gongjindan.html`) 6번 카드 풀블리드 이미지 적용 & 4대 약재 성분 기반 13대 적응증 논문 연구 전면 반영 (9번 카드 원본 보존)**:
   - **06번 카드(`#gjd-panorama-card`) 이미지 100% 풀채움**: 내부 여백과 레터박스를 제거하고 브로슈어 10종 이미지가 슬라이드 전체(`width: 100%; height: 100%; object-fit: fill;`)를 빈틈없이 꽉 채우도록 개편.
   - **카드별 중복 제거 및 4대 성분(사향 `L-Muscone` · 녹용 `IGF-1/판토크린` · 참당귀 `Decursin` · 산수유 `Loganin/Cornuside`) 기반 13대 적응증 논문 연구 분배**:
     - `01번 카드`: (5)면역피로 · (8)간 보호(AST/ALT) · (12)암 수술/항암 후유증 조혈 회복
     - `02번 카드`: (2)치매·뇌출혈 질환 신경 보호 · (4)심혈관질환 관상동맥 혈류 개선
     - `03번 카드`: (1)항피부 노화(연예인들이 밤샘 촬영에도 즐겨 복용하는 콜라겐 보호 비결) · (3)퇴행성 관절 염증 억제
     - `04번 카드`: (6)여성 자궁불임(난임 착상) 환경 복원 · (7)남성 정력강화(테스토스테론·NO 혈류)
     - `05번 카드`: (9)기억력저하(NGF·BDNF) · (10)만성스트레스(코르티솔 억제) · (11)불안증후군 안정 · (13)수험생 고도 집중력
     - `07·08·10번 카드`: 4대 핵심 성분 정량 수제 제환, 13대 적응증 SCI 논문 총정리, 목적별 약효 200% 복용 꿀팁
     - `09번 카드`: 수정 금지 원칙에 따라 100% 원본 그대로 보존.
3. **성장 · 다이어트 · 추나 · 황제공진단 · 전립선 03번 카드 양옆 여백 제거 및 부드러운 전환 (`build-story-detail-pages.js`)**:
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
  - **🧬 풀스크린 Vibrant 3D 인체모형 & 바른한의원 진료 모션 탐색기 (기존 3D 모형 100% 보존 · 3D 그래픽모션 & 연관 하위메뉴 순차 재활성화)**: [http://localhost:3000/body-explorer.html](http://localhost:3000/body-explorer.html) (실서버: [https://www.bareunhaniwon.com/body-explorer/](https://www.bareunhaniwon.com/body-explorer/))
  - **📘 해외 SCI 대표 의학 인사이트 블로그(단독 1편) & 🔒 회원전용 질환별 1:1 비공개 Q&A (Google·카카오·네이버 3초 가입 & 마스터 상세열람)**: [http://localhost:3000/ask-doctor.html](http://localhost:3000/ask-doctor.html) / [http://localhost:3000/ask-doctor.html?tab=qna](http://localhost:3000/ask-doctor.html?tab=qna) (실서버: [https://www.bareunhaniwon.com/ask-doctor/](https://www.bareunhaniwon.com/ask-doctor/))
  - **01. 안정위 대표원장**: [http://localhost:3000/director.html](http://localhost:3000/director.html)
  - **02. 바른 추나 · 척추교정**: [http://localhost:3000/chuna.html](http://localhost:3000/chuna.html)
  - **03. 바른 성장 · 성조숙증**: [http://localhost:3000/growth.html](http://localhost:3000/growth.html)
  - **04. 바른 다이어트 · 식욕ZERO**: [http://localhost:3000/diet-zero.html](http://localhost:3000/diet-zero.html)
  - **05. 바른 탈모 · 모근재생**: [http://localhost:3000/hairloss.html](http://localhost:3000/hairloss.html)
  - **06. 바른 황제공진단**: [http://localhost:3000/gongjindan.html](http://localhost:3000/gongjindan.html)
  - **리프팅 윤곽진단 스튜디오**: [http://localhost:3000/lifting-compare.html](http://localhost:3000/lifting-compare.html)
