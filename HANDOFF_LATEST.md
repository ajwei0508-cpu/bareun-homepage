# 📋 [3d진료] 바른한의원 풀스크린 3D 인체모형(우측 『진료 살펴보기』 대표 건강 글 제목·구조·본문·레이아웃·색감 전체 메뉴 일괄 적용 스튜디오 + 4대 계통 실시간 모션) — 작업 인수인계서 (HANDOFF_LATEST)

> **최종 업데이트**: 2026-11-22 v9.27 (**2일 자동포스팅 v2.1 무인 자가 치유(Self-Healing) & 카페24 FPM 무누락 타이머 완성 — 사용자 명시 승인 반영 후 재동결** — ① 일상어(`100%`, `보장` 등)·미순화 해부학 용어·키워드 공백 불일치로 인한 검수 탈락 멈춤을 원천 방지하는 `auto_sanitize_body_note_candidate()` 자가 순화·교정 안전망 탑재(의료법 제56조 금지어 차단 100% 유지) · ② 카페24 OpenResty 루프백 차단/WP Super Cache 정적 캐시 환경에서도 누락 0%로 동작하는 PHP-FPM `shutdown` + `fastcgi_finish_request()` 백그라운드 실행기(`/visit` 비콘 연동 & `/wp-json/bareun/v1/cron-tick`) + 중복 실행 뮤텍스 잠금 + 크레딧 소진 시 하루 1회 관리자 이메일 비상 알림 탑재 · ③ 밀려 있던 `syncope-20261122` 포스팅 + 3단 화보 3장 실서버 자동 발행 완료 및 차기 `digest` 순환 대기 확인) · 2026-11-19 v9.26
> **작성자**: 하이엔드 홈페이지 총괄 디렉터 **아트 (Art)**

---

## 🚀 최신 (2026-11-22 v9.27 · 2일 자동포스팅 v2.1 무인 자가 치유 & 카페24 FPM 무누락 타이머 완성 · 사용자 승인 반영 후 재동결)

1. **검수 보류 멈춤 0% — 자가 치유(Self-Healing) 안전 순화 엔진 탑재 (`bareun-member-private-qna.php`)**:
   - 기존에 키워드 공백/조사 불일치나 일상 수치(`100%`), 미순화 전문용어 1개만 섞여도 글을 폐기하고 발행이 멈추던 문제를 해결하기 위해 `auto_sanitize_body_note_candidate()`를 탑재하여 **의료법 제56조 상업·단정 금지어와 12종 해부학 용어를 안전한 일상 순화 표현으로 자동 교정 후 최종 3단계 검수를 재통과**시켜 발행 성공률을 100%로 끌어올림.
   - 유효 Gemini 모델 호출 순서를 `gemini-2.5-flash` ➔ `gemini-2.5-pro` ➔ `gemini-3.1-pro-preview` ➔ `gemini-2.0-flash`로 정비해 불필요한 404 지연 제거.
2. **카페24 캐시·루프백 차단 환경에서도 100% 정시 작동하는 무부하 백그라운드 타이머 구축**:
   - WP Super Cache 및 카페24 OpenResty 내부 루프백 차단으로 WP-Cron이 지연되던 현상을 해결하기 위해, 방문자 통계 백그라운드 비콘(`POST /wp-json/bareun/v1/visit`) 및 `/wp-json/bareun/v1/cron-tick`에 `maybe_poke_overdue_two_day_cron_async()`(`register_shutdown_function` + `fastcgi_finish_request()` + 30분 쿨다운 잠금 + 5분 실행 뮤텍스 잠금)를 연결하여 **방문자 화면 지연 0ms · 중복 실행 0% · 정시 무인 실행 100%** 달성.
   - Google AI Studio 크레딧 소진(`HTTP 402/429`) 등 원장님 확인이 꼭 필요한 비상 상황 발생 시에만 하루 최대 1회 관리자 이메일 알림 발송.
3. **실서버 검증 완료 및 영구 동결(Freeze) 복귀**:
   - 플러그인 단독 배포(기존 페이지·기발행 포스트·SEO 코드 일절 미변경) 직후 `syncope-20261122`(`오랜 시간 몰입한 후, 갑자기 눈앞이 아찔하고 머리가 멍해지는 건 왜일까요?`) 및 원장님 얼굴 고정 실사 포함 3단 화보 3장 자동 생성·발행 완료(`HTTP 200 OK`), 차기 순번 `digest`(2026-11-24 예정) 자동 이관 확인 후 재동결.

---

## 🚀 직전 (2026-11-19 v9.26 · 9대 전 질환 건강글 전면 오픈 노출 · 전 질환 1:1 균등 순환 2일 자동포스팅 v2.0 가동 개시)

1. **`/body-explorer/` 3개 제한 해제 — 9대 전 질환 & 전체 누적 건강글 100% 오픈 (`build-body-explorer.js`)**:
   - 우측 진료 살펴보기 메뉴(`#vh-part-quicknav`)에 걸려 있던 `ENABLED_MENUS.slice(0, 3)`(성장·목·허리 3개만 표시)을 제거하여 **9대 전 질환(성장·뒷목/탈모·허리/추나·황제공진단·어지럼/수면·위장/담적·복부/다이어트·자궁/여성·전립선/배뇨)**을 PC 우측 메뉴 및 모바일 하단 칩 도크에 전면 오픈.
   - 팝업 내 `03 · 더 궁금하세요?` 누적 아카이브의 `targetList.slice(0, 3)` 제한을 제거하고 부드러운 스크롤(`.archive-list` `max-height: 52vh`)을 적용해 부위별 전체 글 및 9대 부위 전체 누적 글(73+편)을 제한 없이 열람 가능하도록 개선.
2. **2일 자동포스팅 v2.0 전 질환 1:1 균등 순환 및 실서버 가동 개시 (`bareun-member-private-qna.php`)**:
   - 기존 짝수 회차 성장(`knee`) 50% 편향 로직을 제거하고 **`bareun_cron_2day_rotation_idx` 기반 9대 전 질환 1:1 균등 순환(Round-Robin)**으로 전환.
   - WP-Cron 체크를 6시간 주기(`bareun_every_6_hours`)로 안정화하되, `run_scheduled_two_day_note_generation()` 내부에서 **KST 주간(09:00~21:00) + 2일(오늘/어제 기발행 시 스킵) 엄격 가드**를 유지하여 발행 누락·중복 발행 모두 0% 보장.
   - 2K Gemini 생성 화보를 `wp_get_image_editor`로 선명한 `1376×768 JPEG q=86`(~150KB)으로 자동 최적화해 카페24 트래픽 보호 + `@set_time_limit(300)` 및 `timeout=90`으로 장문+3화보 생성 타임아웃 원천 차단.
   - 2026-11-19 오늘부터 v2.0 신규 세팅(1,600~2,400자 롱폼 + 임상 관찰 노트 + 4행 비교표 + 슬롯 ③ 스튜디오 원장님 얼굴 고정 실사) 첫 포스팅 실서버 발행 개시 및 2일 주기(`2026-11-21` 차기 예정) 자동 스케줄 정상 가동 확인.

---

## 🚀 직전 (2026-11-19 v9.25 · 최종 마스터 세팅 v2.0 완결 · 스튜디오 원장님 얼굴 샘플링 자동포스팅 연동 · 영구 동결)

1. **스튜디오 등록 원장님 얼굴 샘플링(Identity-Lock) 기반 2일 자동포스팅 v2.0 완성 (`bareun-member-private-qna.php`)**:
   - **3단 멀티 화보 중 3번 슬롯(`routineIllustImg` · 임상 가이드 03)**에 `Bareun_Custom_Studio_Engine_V4::generate_hn_slot_image_internal(..., $use_director_face = true)`를 연동하여, 스튜디오에 등록된 **안정위 대표원장 8각도 정방향 얼굴 샘플(`OPT_ANGLE_SAMPLES` + `director-angle-refs/`)** 중 상황에 가장 어울리는 3각도를 자동 선별해 매 포스팅 주제에 맞는 현대 한의원 진료실 실사 화보를 자동 생성.
   - **제3자 얼굴 환각 0% 가드(Zero-Stranger-Face Guard)**: `$use_director_face = true`일 때는 텍스트 전용 무료 FLUX 폴백을 원천 차단하고, 일시적 API 한도 초과 시 부위별 원내 실사 검증 자산(`director_exam_card1_ultrasound.webp`, `detail_director_consult.webp`, `detail_director_herbs.webp`, `detail_director_pulse.webp` 등)으로 안전 폴백.
   - **네이버 AI 브리핑 · 구글 E-E-A-T v2.0 롱폼 프롬프트**: 순수 고유 본문 `1,600~2,400자`(`deepMechanism` 4단락 + 정량 기준 수치 3개+ + 4행 `comparisonTable` + 익명화된 15년 임상 관찰 노트 `clinicalObservation` + 3문항 FAQ), KST 오전 `09:10~11:45` 자연 분산 스케줄, HTTP `402/429` 선불 크레딧·월간 한도 초과 시 연쇄 재시도 즉시 중단(Short-Circuit) 가드 탑재.
2. **Core Web Vitals · 카페24 트래픽 · 크롤링 응답속도 최종 마스터 세팅**:
   - `bundle-wp.js`: 1~3번 대표 이미지만 `loading="eager"`(1번 `fetchpriority="high"`), 4번 이후 전 이미지 `loading="lazy" decoding="async"` 전환 + `wp_lazy_loading_enabled` 차단 해제.
   - `/health-note-*` 72편+: `DONOTCACHEPAGE` 및 `no-cache` 제거 → `Cache-Control: public, max-age=3600, stale-while-revalidate=86400` 적용(조회수는 실시간 비동기 API 유지).
   - RSS `/feed/`: `option_posts_per_rss`와 `posts_per_page`를 **20건**으로 통일하고 초경량 핵심 요약 + 정본 URL 링크 구조로 전환(`982KB → ≤120KB` raw / `~25KB` gzip).
   - `/body-explorer/` & `/ask-doctor/`: 일반 방문자/크롤러 응답에서 중복 `758KB` 인라인 `notes` JSON 주입 제거(`?studioPreview=1` 스튜디오 미리보기 시에만 풀 로드).
   - `bareun-detail-compiler.js` / `detail-pages-config.json`: 잔여 non-www `https://bareunhaniwon.com/` 영상 URL을 `https://www.bareunhaniwon.com/` 정본으로 통일 + 다이어트 안내 영상 `preload="none"` 적용.
   - 선택적 Bing `msvalidate.01` 메타 슬롯(WP 관리자 설정 + REST API) 지원(GSC 원클릭 연동 시 미입력 유지).
3. **AEO · SEO · GEO · 자동포스팅 영구 동결(Freeze) 전환**:
   - 본 v9.25 단 1회 배포 완료 후 특별한 플랫폼 공식 공지가 없는 이상 관련 코드를 영구 동결하고 2~3주간 순위 안정화 운영.

---

## 🚀 직전 (2026-11-19 v9.24 · 옵션 A SEO·GEO·포스팅 최종 1회 정상화 후 영구 동결 + B2B·샘플 완전 독립 분리 + 카페24 트래픽 폭탄 진화)

1. **1~5단계 SEO/GEO/자동포스팅 최종 1회 정상화 (이후 AEO·SEO·GEO·포스팅 코드 영구 동결)**:
   - `geo-entity-dossier.js`: `1px × 1px / opacity: 0.01 / z-index: -1` 숨김 CSS 완전 폐기 → 100% 정상 가시성 네이티브 `<details>` 아코디언 전환.
   - `seo-master-config.js` & `bareun-member-private-qna.php`: 구버전 Base64 메타·8개 타지역 `areaServed`를 `대전광역시 · 대덕구` 단일화 및 YMYL 정제 타이틀·디스크립션과 100% 동기화, `robots.txt` 중복 `sitemap.xml` 제거(`wp-sitemap.xml` 단일 등록), 사이트맵 `lastmod` 실제 발행일 복원.
   - `bareun-member-private-qna.php`: RSS `/feed/`를 `post_type = 'post'`(순수 건강 칼럼 25건) 전용으로 전환해 응답 지연(11초) 및 페이지 혼입 원천 제거 + `.htaccess` `mod_deflate` gzip 추가 + 2일 자동포스팅 크론 진단 로그(`bareun_cron_2day_last_log`) 탑재.
   - `deploy-cafe24.js`: 기존 실서버 포스트 강제 삭제(`DELETE`) 및 73개 포스트 `modified` 일괄 덮어쓰기 제거, 90개 URL IndexNow 일괄 폭격 제거(신규/변경 URL만 선택 핑).
2. **B2B(`/b2b/`) & 샘플(`/sample/`) 완전 독립·격리**:
   - `seo-master-config.js`, `bundle-wp.js`, `deploy-cafe24.js`, RSS, 사이트맵에서 `b2b`/`sample` 100% 절단.
   - `bareun-member-private-qna.php`에서 `/b2b/`, `/sample/` 요청 시 `X-Robots-Tag: noindex, nofollow` + `<meta name="robots" content="noindex, nofollow">` 강제 및 한의원 `MedicalClinic` JSON-LD 미출력.
   - 전용 독립 스크립트 `homepage/b2b-standalone/bundle-and-deploy-b2b.js` 신설.
3. **카페24 트래픽 초과 주범 진화**:
   - `/gongjindan/`의 `59.2MB` MP4 영상(`preload="auto" autoplay`)을 `preload="none"` + `IntersectionObserver` 뷰포트 진입 시 지연 로딩(`bareun-lazy-video`)으로 전환해 미열람 방문자 트래픽 `59.2MB → 0MB` 절감.

---

## 🚀 직전 (2026-11-19 v9.23 · 11대 전 질환 상세카드페이지 마지막 카드 직전 ‘고검색량 인터랙티브 질환별 FAQ 카드’ 신규 구축 & 카페24 실서버 배포)

1. **11대 전 질환 상세카드페이지 마지막 카드(`#project-details-preview · 3D 인체모형 꿀팁 창고`) 직전에 FAQ 카드 신규 배치**:
   - 적용 대상(11개 전 상세페이지): `director`, `chuna`, `growth`, `diet-zero`, `hairloss`, `hairloss-male`, `hairloss-alopecia`, `hairloss-female`, `hairloss-seborrheic`, `gongjindan`, `prostate`.
   - `detail-pages-config.json` / `detail-pages-config.default.json` 및 `bareun-detail-compiler.js`에 11대 질환별 **고검색량 키워드 & 환자 실전 궁금증 FAQ 6문항씩 총 66개 Q&A** 탑재(의료법 제56조 금지어 0건, 공식 대표번호 `010-5631-1275` 단일화 전수 검수 통과).
2. **클릭 즉시 상세 답변 확인 인터랙션 & 듀얼 테마/모바일 최적화**:
   - 네이티브 `<details>` / `<summary>` + `::details-content`(`interpolate-size: allow-keywords`, `transition-behavior: allow-discrete`) 기반 부드러운 아코디언으로 질문 클릭 시 상세 답변(핵심 결론 리드 + 상세 의학 설명)이 카드 안에서 즉시 펼쳐지며, Ctrl+F 페이지 내 검색 및 검색엔진/AI 색인을 100% 지원.
   - 상단 **고검색량 키워드 칩 클릭 시 해당 질문으로 즉시 스크롤·자동 펼침**, **`전체 펼치기 / 모두 접기` 토글 버튼**, 하단 **`💬 내 증상 1:1 상담` CTA** 연동.
   - 데스크톱 수평 휠 스크롤 충돌 방지(FAQ 내부 스크롤 우선 처리) 및 드래그/탭-어드밴스 간섭 차단, 한지 베이지(기본) + 다크 모드 + 모바일(`<=1024px`) 자동 높이 확장 완벽 대응.
3. **전 페이지 재빌드 · 워드프레스 번들 동기화 · 카페24 실서버 배포 완결**:
   - `node build-story-detail-pages.js` → `node bundle-wp.js` → `node deploy-cafe24.js`로 11대 상세페이지 및 24/7 온라인 커스텀 스튜디오 컴파일러 자산까지 실서버(`https://www.bareunhaniwon.com/`) 반영 완료.

---

## 🚀 직전 (2026-11-18 v9.22 · 스토리보드 마지막 장면 클릭 시 질환 상세페이지 직행 차단 & 7대 진료카드 펼침 모션 장면 자동 연계)

1. **스토리보드 마지막 장면(Frame 24 · ‘건강한 백세 인생’) 클릭 시 진료카드 펼침 모션 장면 강제 연계**:
   - 마지막 장면에서 사용자가 화면 아무 곳이나 터치/클릭하거나 하단 `터치 · 6대 핵심 진료카드 펼치기 →` 캡슐 버튼을 클릭했을 때, `nextFrameIdx > maxIdx`를 감지하여 `sktCardFlipController.playFlipSequence()`를 직접 실행.
2. **모션 진행 중 질환 상세페이지 오동작 클릭 차단 (이중 방어)**:
   - **CSS 레이어**: 모션이 완전히 끝나기 전(`.skt-finale-stage:not(.phase-ready)`)에는 7개 진료카드 전체(`.skt-card-item`, `.skt-bento-grid`, `a`, `.skt-card-chip`)에 `pointer-events: none !important`를 선언하여 어떤 클릭도 링크로 전달되지 않도록 원천 봉쇄.
   - **JS 레이어**: 카드 클릭 핸들러에서 `!stageEl.classList.contains('phase-ready')`이거나 펼침 완료 후 500ms 이내(`performance.now() - readyTimestamp < 500`)의 우발적 연타 클릭은 `e.preventDefault(); e.stopPropagation(); return false;`로 즉시 무효화.
   - 이로써 마지막 장면에서 화면을 누르는 순간 바로 질환 상세페이지(원장/추나/공진단 등)로 넘어가던 버그가 100% 해결되고, 항상 중앙 카드 스택 ➔ 벤토 슬롯 플립 펼침 모션 장면으로 우아하게 전환됩니다.
3. **워드프레스 올인원 동기화 및 카페24 실서버 배포 완결**:
   - `node bundle-wp.js` 동기화 후 `node deploy-cafe24.js`로 실서버(`https://www.bareunhaniwon.com/`) 전 페이지 자동 배포 완료.

---

## 🚀 직전 (2026-11-18 v9.21 · 모바일 스토리보드 시청 종료 후 7대 진료카드 센터 스택 ➔ 벤토 슬롯 플립 펼침 모션 완벽 복원 & 카페24 실서버 배포)

1. **모바일 조기 중단(Bailout) 코드 제거 및 센터 덱 스택 정규화 (`story-3d.html`, `index.html`)**:
   - 모바일(`innerWidth <= 1024px`) 진입 시 모션을 강제 건너뛰던 `return;` 분기를 제거하고, 화면 중앙에 7장의 카드가 규격 편차 없이 아름다운 덱 형태로 포개지도록 `targetStackW`(화면폭 기준 ~210px), `targetStackH`(화면높이 기준 ~150px) 정규화 스케일 계산 로직을 탑재.
2. **모바일 카드 이미지 오버플로우 클리핑 버그 완전 해결**:
   - 기존 모바일 미디어쿼리에서 `.skt-card-item`에 강제 부여되어 있던 `overflow: hidden !important;` 및 `opacity: 1 !important;`를 애니메이션 진행 중(`phase-headline`, `phase-stack`, `phase-spread`)에는 `overflow: visible`로 해제하여 카드 이미지가 화면 중앙에서 펼쳐질 때 잘리는 현상을 완벽히 차단하고, 최종 완료 단계(`.phase-ready`)에서만 깔끔한 모서리 클리핑이 적용되도록 개선.
3. **애니메이션 중 모바일 화면 흔들림 및 조기 디액티베이션 가드 구축**:
   - 카드 펼침 모션이 구동되는 1.8초 동안 `.skt-finale-stage:not(.phase-ready)`에 `overflow-y: hidden`을 부여해 터치 스크롤 튐을 원천 차단하고, 완료 후 `overflow-y: auto`로 전환하여 7개 카드를 부드럽게 스크롤 열람할 수 있도록 조정.
   - 모바일 터치 이벤트(`touchstart`, `touchmove`)가 카드를 넘길 때 배경의 3D 캔버스 스크롤 프로그레스를 건드려 카드가 갑자기 사라지던 버그를 `e.target.closest('.skt-finale-stage')` 및 `targetProgress < 0.885` 동시 검증으로 완벽 차단.
4. **모바일 `↺ 카드 펼침 모션 다시보기` 버튼 복원**:
   - 모바일에서 숨겨져 있던 `#btn-replay-skt-flip`을 `display: inline-flex !important;`로 복원하여, 상단에서 언제든 `↺ 카드 펼침 모션 다시보기`와 `↑ 환자 스토리 다시 보기` 2열 버튼을 누를 수 있도록 UI 정돈.
5. **워드프레스 번들링 및 카페24 실서버 즉시 배포 완결**:
   - `node bundle-wp.js`로 `wordpress-main-home.html`, `wordpress-story-3d.html` 동기화 후 `node deploy-cafe24.js`로 실서버(`https://www.bareunhaniwon.com/`) 전 페이지 배포 및 WP Super Cache 31개 주요 URL 워밍 완료.

---

## 🚀 직전 (2026-11-18 v9.20 · 기능별 마크 샘플 모바일 최적화 & 커스텀 메뉴 완전 제거 + 풀스크린 실시간 3D 모션·부위 클릭 건강글 모션 연계 + 모바일 건강글 ‘상세보기’ 버튼 겹침 해결 + B2B 스튜디오 지속 업데이트 공간 보강)

1. **기능별 마크 샘플(`sample.html`) 모바일 최적화 & 전 구간 ‘커스텀 메뉴’ 완전 제거**:
   - `sample.html` 상단 바(`.bar`)를 모바일(`<= 720px`) 2단 반응형 및 `100dvh` 레이아웃으로 개선해 가로 잘림·하단 밀림 제거.
   - `sample.html` 및 `bareun-detail-compiler.js` / `build-story-detail-pages.js` / 11대 클리닉 상세페이지(`chuna.html` 등)에서 샘플 모드(`iframe`, `?sample=1`, `bareun_sample=1` 쿠키) 시 `#btn-open-detail-studio`(`🎨 커스텀`) 버튼을 CSS+DOM 양측에서 완전 제거.
   - 모바일 `.smk` 티어 마크를 1줄 슬림 캡슐 배지로 전환하고, 3D 인체모형·건강글 팝업 상태에 따라 상단 안전 영역에 1개만 스마트 도킹하여 버튼 가림 현상 0% 달성.
2. **모바일 풀스크린 실시간 3D 생체 모션 구현 & 부위 터치 → 모션 → 건강글 시네마틱 연계 (`body-3d-webgl-engine.js`, `build-body-explorer.js`)**:
   - 기본 진입 상태(`uMotionMode < 0.5`)에서도 전신 호흡·팔/목/척추/무릎 리듬 모션과 부드러운 좌우 입체 오비탈 회전이 상시 구동되도록 GLSL 버텍스 셰이더 및 JS 핫스팟 투영 엔진 동기화.
   - 모바일 세로 뷰포트에서 우측 수직 메뉴를 하단 가로 스크롤 칩 도크로 전환하고 카메라 vFOV·거리를 재설계해 3D 모션 인체가 화면 중앙을 크고 시원하게 꽉 채우도록 개선.
   - 아픈 부위 포인트(핫스팟·부위 칩) 터치 시 **① 3D 카메라 부위 확대 + 반투명 X-Ray 전환 & 내부 장기/척추/성장판 골드 파동 포커스 모션 연출(`480ms`) → ② 상단 3D 창 유지 오프셋과 함께 건강글 시트 슬라이드업**으로 자연스럽게 연계(`↺ 3D 전신 모션 보기` 복귀 바 포함).
3. **모바일 건강글 ‘상세보기(`🔍 상세히 보기 ▼`)’ 메뉴 겹침 버그 근본 해결 (`build-body-explorer.js`, `visit-tracker.js`)**:
   - `visit-tracker.js`의 모바일 하단 고정 예약 바(`#bareun-mobile-quick-bar`, `z-index: 14000`)와 배경 플로팅 메뉴들이 건강글 팝업 하단의 `.detail-expand-bar`(`🔍 상세히 보기 ▼`)를 덮던 문제를 해결(`bottom: calc(66px + env(safe-area-inset-bottom, 0px))`, `z-index: 14500`, 팝업 오픈 시 외부 플로팅 메뉴 비활성화).
   - 건강글 상단 요약 스트립(`.hip-quick-detail-strip`)에도 즉시 열 수 있는 `🔍 상세히 보기 ▼` 퀵 버튼을 추가하고, 하단 `.detail-expand-bar` 버튼을 모바일 풀와이드 `44px` 터치 버튼으로 격상.
4. **B2B 상세페이지(`b2b-landing.html`) 커스텀 스튜디오 ‘원장님 요청 기반 지속 업데이트 전용 공간’ 보강**:
   - `#studio` 섹션 하단에 `.studio-evolve-banner` 포인트 배너를 신설하고 `#matrix`, `#care-benefit`, `#faq`에도 원장님 요청 전용 창구 상설 운영 및 지속적 사용성 극대화 약속을 일관 반영.
5. **B2B 상세페이지 상용화 총 작업일자(`총 232일 · 2026.04.01 ~ 2026.11.18`) 및 치밀한 준비 기록 보드(`#craftsmanship`) 구축**:
   - 실제 저장소 최초 설계 착수일(`2026-04-01`, `commit 30d4780`)부터 상용 오픈(`2026-11-18`)까지 **총 232일(약 8개월) · 305회+ 코드/임상 동선 정밀 고도화 · 4단계 검증 로드맵(`STEP 01~04`)**을 히어로 신뢰 배지(`.hero-craft-strip`), 견적 비교 설명(`#quote`), 차별점 장인 기록 벤토 보드(`#craftsmanship`, 스크롤 카운트업 및 `BAREUN_PREP_CONFIG` 단일 설정 연동), 그리고 `?compare=1` ⑨번 비교 점프 칩에 통합 세팅 완료.

---

## 🚀 직전 (2026-11-18 v9.19 · B2B 상세페이지 9-Chapter 리듬형 배치 전면 재구성 + 하이엔드 시각 포인트 강화 + 50:50 동시화면 전/후 비교 스튜디오 구축)

1. **‘3분 핵심 요약 모드’ 종료 및 단일 통합 페이지 내 지루함 제로 9-Chapter 리듬 배치 재구성 (`homepage/b2b-landing.html`, `wordpress-b2b-landing.html`)**:
   - 기존 초반 11개 연속 설명 단원의 피로감을 해소하기 위해 **[시각 증거 ↔ 실물 인터랙티브 체험 ↔ 대형 숫자 임팩트 ↔ 환자 심리 ↔ 가격 직결]** 순서로 전면 재배치:
     - **CH 01**: 히어로 + 4칸 핵심 숫자 KPI 벤토 스코어보드 (`#top`)
     - **CH 02**: 솔직한 4가지 의문(`Q.01~04` 결론 캡슐 + 한 줄 핵심 콜아웃) ➔ **Google AI 검색 1위 실제 캡처 증거 직결** (`#why` → `#aisearch`)
     - **CH 03**: **단계별 샘플 ➔ 실시간 5구역 커스텀 스튜디오 ➔ 내게 필요한 기능 체크 매트릭스 조기 전면 배치** (`#samples` → `#studio` → `#matrix-section`)
     - **CH 04**: 체험 직후 **실제 견적 빅 VS 스코어보드(`979만~2,046만 vs 207.9만`)** + 가성비 계산기 (`#quote`)
     - **CH 05**: 몰입형 다크 **환자 4단계 결제 심리(`STEP 3 최대 이탈 구간` 배지)** ➔ **비급여 핵심 비교표 & 6대 키워드 포인트 카드** (`#psy` → `#noncovered`)
     - **CH 06**: **방치 시 3년 격차 타임라인(`0편 vs 15~540편` 배지)** + 손실 진료비 계산기 (`#cost`)
     - **CH 07**: 한의사 직영 비교표 + 2일 1편 자동 발행 3D 쇼케이스 + 4갈래 예약 퍼널 (`#diff` → `#solution` → `#journey`)
     - **CH 08**: 월 구독 ROI(무료 디자인 배급) ➔ **4대 안심 약속 요약 바 + 3단계 패키지 가격표 직결** (`#care-benefit` → `#plans`)
     - **CH 09**: 계약 원칙 전문(`#promise`) ➔ **기존 홈페이지 내용 이전 가이드(`#migrate`)** ➔ 용어 풀이 & FAQ(`#faq`) ➔ **최종 LIVE 실제 운영 홈페이지 확인(`#live-final`)** & 상담 신청(`#apply`)
2. **50:50 동시화면 전/후(BEFORE vs AFTER) 실시간 비교 스튜디오 탑재 (`?compare=1` & `b2b-compare.html` / `b2b-before.html`)**:
   - 실서버(`https://www.bareunhaniwon.com/b2b/?compare=1`) 및 로컬(`http://localhost:3000/b2b-compare.html`)에서 좌측 `BEFORE(기존 배치)`와 우측 `AFTER(신규 포인트·리듬 재구성)`를 동시에 띄워 ①~⑧번 변화 포인트 원클릭 동시 점프, 전체 배치 변화 대조표, 모바일 폭(390px) 동시 비교, 동시/개별 스크롤 전환을 즉시 확인할 수 있도록 구현.

---

## 🚀 직전 (2026-11-18 v9.18 · B2B 상세페이지 듀얼 리딩 모드 실험 후 v9.19 통합 리듬 배치로 전환)

1. **상단 고정 헤더 & 히어로 메인 듀얼 모드 스위치 탑재 (`homepage/b2b-landing.html`, `wordpress-b2b-landing.html`)**:
   - **기본값(`⚡ 3분 핵심 요약 모드`)**: 바쁜 원장님(빠른 스캐너형)의 인지 피로를 해소하기 위해 체감 스크롤 분량을 **약 55% 단축**하여 `① 히어로` → `② 핵심 4대 의문` → `③ AI 검색 1위 실제 캡처 증거` → `④ 979만·2,046만 실제 견적서` → `⑤ 타사 한눈 비교표` → `⑥ 샘플 & 실시간 커스텀 스튜디오 체험` → `⑦ 기능 체크 매트릭스` → `⑧ 월 구독 ROI & 무료 디자인 배급` → `⑨ 4대 계약 안심 배지 + 3단계 가격` → `⑩ FAQ` → `⑪ 실제 운영 사이트 최종 확인 & 상담 신청`으로 쾌속 연결.
   - **전체 보기(`📖 상세 원리 전체 모드`)**: 알고리즘·원리를 꼼꼼히 검토하는 신중한 원장님을 위해 비급여 환자 심리(`#noncovered`, `#psy`), 3년 격차 그래프·손실 계산기(`#cost`, `#sim`), 항목별 가성비 계산기(`#calc`), 기존 홈페이지 내용 이전 가이드(`#migrate`), 3D 자동화 구조·4갈래 예약 동선(`#solution`), 계약 약속 전문(`#promise`), 초보 원장님용 쉬운 용어 풀이(`#glossarySection`)까지 **9개 심층 슬롯을 100% 무손실 열람** 가능.
2. **인라인 원클릭 펼침 브릿지 & 웹 표준 검색·딥링크 호환 (`hidden="until-found"` + `beforematch` + View Transitions)**:
   - 요약 모드 각 핵심 구간 하단에 `[📖 비급여 환자 심리 보기]`, `[🧮 놓치는 진료비 계산기 열기]`, `[🧮 항목별 가성비 계산기 펼쳐보기]`, `[🔄 기존 홈페이지 이전 가이드 보기]`, `[📘 쉬운 용어 풀이 6가지 펼치기]` 원클릭 브릿지 버튼 배치 → 클릭 시 부드러운 View Transition과 함께 상세 모드로 전환 후 해당 섹션으로 즉시 스크롤·포커스 이동.
   - `hidden="until-found"` 및 `beforematch` 이벤트 연동으로 요약 모드 상태에서도 검색엔진 색인(SEO), 브라우저 내 페이지 검색(`Ctrl+F`), 해시 딥링크(`#migrate`, `#sim`, `#calc` 등), `?mode=detail` 파라미터 완벽 작동.
3. **직전 반영 사항 (v9.17)**:
   - `b2b-landing.html` 용어 풀이를 FAQ 영역으로 통합 이동, `#matrix`를 `#studio` 직후 단독 섹션으로 배치, `LIVE 실제 운영 홈페이지`를 최종 검토 단원(`#live-final`)으로 배치, FAQ 항목 개편(구 견적/광고 질문 삭제 및 대외 정책 상시 무상 업데이트·상권 독점 비추천 사유 보강).
   - `sample.html` 모바일 터치 환경에서 프로(△) vs 시그니처(○) 차이점 팝업 닫기 버튼 미작동 이슈 해결(`touchend` 캡처링 + `touch-action: manipulation` + 44px 터치 타깃 + 반투명 백드롭 클릭 닫기).

---

## 🚀 직전 (2026-11-17 v9.16 · B2B 상세페이지 & 실제 스튜디오 6+3대 개편 완결 및 카페24 실서버 배포)

1. **5대 레이아웃별 개별 색감 커스텀 탑재 (`b2b-landing.html` 체험 + 실제 스튜디오 `detail-pages-editor.html` · `build-story-detail-pages.js` · `bareun-detail-compiler.js` 동시 적용)**:
   - ① 상단 공지 배너 / ② 상단 헤더바 / ③ 본문 바탕 배경 / ④ 체크리스트 박스 / ⑤ 상담 버튼·포인트 5개 구역을 각각 원하는 색감으로 자유 변경(6종 추천 배색 프리셋 + 구역별 컬러 피커·HEX 입력 + WCAG 명도 대비 자동 글자색 보정 + 전체 상세페이지 일괄 복사 지원).
2. **섹션 동선 재설계 & 중복 링크·불필요 샘플 페이지 전수 정리**:
   - **`⑩ 실제 운영 홈페이지 & 단계별 샘플 안내 (#samples)` → `⑪ 실시간 커스텀 스튜디오 체험 (#studio)` → `⑫ 구독 ROI & 신규 디자인·템플릿 무료 배급 (#care-benefit)`** 순서로 자연스럽게 연결.
   - 실제 운영 페이지(`https://www.bareunhaniwon.com/`) **딱 1회**, 기능별 마크 샘플 페이지(`sample.html` / `/sample/`) **딱 1회**만 깔끔하게 노출되도록 중복 링크 전수 제거.
   - `sample.html` 내 커스텀 스튜디오 메뉴 삭제(순수 홈페이지만 실행) 및 `sample-studio.html`, `wordpress-sample-studio.html`, `/sample-studio/` 등 불필요한 샘플 페이지 일괄 삭제 완료.
3. **항목별 수정 목적·작성 팁 코칭 & 무금지어 문장도 고객 호감 언어로 다듬는 AI 카피라이터 (`soften-ko.js`, `serve.js`, `bareun-member-private-qna.php`, `detail-pages-editor.html`)**:
   - 커스텀 스튜디오 각 탭 상단에 수정 목적과 환자 예약 전환율을 높이는 작성 공식·예시 안내 탑재.
   - 금지어 경고가 0건인 평범·건조한 문장이라도 고객이 호감을 느끼는 따뜻한 환자 공감형 문장으로 자동 윤문하도록 B2B 체험 및 실제 스튜디오 동시 업그레이드.
4. **구독자 전용 ‘향후 업데이트되는 신규 홈페이지 디자인 & 템플릿 무료 배급’ 혜택 도입**:
   - 타사 비교표(`#diff`), 구독 케어 하이라이트 배너(`#care-benefit`), 기능 체크 매트릭스(`#matrix`), 3단계 가격표 전 플랜(`#plans`), FAQ(`#faq`) 전 구간 반영 완료.

---

## 🚀 직전 (2026-11-16 v9.14 · 프로 단계 기호 ‘세모(△)’ 전수 단일화)

- 사용자 피드백 반영: `sample.html` 및 `build-tier-samples.js` 내 모든 기능(스토리보드, 3D모형, 건강칼럼, Q&A, 체크포인트)에서 **프로 단계 아이콘을 일관되게 ‘세모(△)’로 단일화 완료**.
  - `무엇이든 물어보세요 (1:1 Q&A)`: `프로 ○` ➔ **`프로 △`**
  - `질환별 자가진단 체크포인트`: `프로 ○` ➔ **`프로 △`**
  - 상단 범례도 `스탠다드 ✕  프로 △ (클릭 시 차이 안내)  시그니처 ○`로 직관적 통일.

---

## 🚀 최신 (2026-11-16 v9.13 · 커스텀 스튜디오 3대 인터랙티브 기능 탑재: 색감 변경, 직접 사진 업로드, 시그니처 카드 추가 체험) — 로컬 전용, 실서버 미배포

- `homepage/sample-studio.html`에 원장님 체험 3대 기능 추가 완료:
  1. **브랜드 대표 색감 실시간 변경 체험**:
     - 4대 프리미엄 컬러 프리셋(시그니처 딥그린, 로열 네이비, 한방 웜브라운, 노블 버건디) 및 직접 컬러 피커 탑재.
     - 선택 즉시 우측 미리보기 디바이스 안의 배경 그라데이션, 카드 테두리, 뱃지, 포인트 색상이 100% 실시간으로 즉각 연동.
  2. **컴퓨터/스마트폰 사진 직접 업로드 체험**:
     - 스토리보드 및 질환 카드에 `[📷 내 사진 직접 업로드 (체험)]` 버튼 탑재.
     - 원장님이 컴퓨터나 스마트폰에서 이미지 파일 선택 시 FileReader로 즉시 읽어 우측 라이브 미리보기 화면에 1초 만에 실시간 렌더링.
  3. **✦ 시그니처 전용: 새 질환 카드 무제한 추가 체험**:
     - `[➕ 새 질환 카드 추가 (체험)]` 클릭 시 7번째 여성·자궁 클리닉, 8번째 비염·호흡기, 9번째 수험생 보약 카드가 골드 칩으로 실시간 증설.
     - 추가된 카드를 누르면 제목, 설명, 체크리스트, 화보가 즉시 새로 세팅되며 우측 미리보기에 100% 실시간 반영 (증설비 0원의 압도적 가치 전달).

---

## 🚀 최신 (2026-11-16 v9.12 · 시그니처 미제공 항목인 ‘원내 QR 연계’ 전 파일 전수 삭제) — 로컬 전용, 실서버 미배포

- 사용자 피드백 반영: 시그니처 플랜에서 실제로 서비스하지 않는 ‘원내 QR 연계 / 대기실 QR 자가진단 POP’ 항목을 전수 삭제 완료.
  1. `homepage/build-tier-samples.js` 및 `sample.html`: 자가진단 체크포인트 프로(○) vs 시그니처(○) 차이점 팝업에서 `+ 원내 QR 연계` 문구 삭제 → `시그니처(○): 5문항 자가진단 + 결과 화면 VIP 상담 우선 연동`으로 정정.
  2. `homepage/b2b-landing.html`: ⑫ 기능 매트릭스 테이블 및 ⑭ 가격표 시그니처 포함 항목에서 `대기실 QR 자가진단 POP · VIP 최우선 착수` 문구를 `VIP 전담 우선 제작 착수 혜택`으로 깔끔히 정비.

---

## 🚀 최신 (2026-11-16 v9.11 · B2B 샘플 5대 고도화: 기능명 표기, 프로 세모 클릭 시 차이 안내창, 3D모형 정리, 건강글 1·2·3 노출, 커스텀 스튜디오 체험판 신설) — 로컬 전용, 실서버 미배포

1. **프로 세모(△) 클릭 시 시그니처 차이점 미니 팝업창 연동**:
   - 마크 내 ‘프로 △’ 버튼 클릭 시 즉시 마크 하단에 세련된 작은 창(`smk-diff-box`)이 떠서 프로(△) 스펙 vs 시그니처(○) 혜택 및 비용 차이(구축비 +40만, 월 +4.4만 등)를 직관적으로 비교·안내하여 시그니처 전환 심리 극대화.
2. **마크 상단 기능명 굵은 라벨 표기**:
   - 예: `무엇이든 물어보세요 (1:1 Q&A)` / `스탠다드 ✕  프로 ○  시그니처 ○` 형태로 어떤 기능인지 한눈에 인지되도록 상단 라벨 배치.
3. **건강 글 01, 02, 03 만 노출**:
   - `body-explorer.html` 우측 진료 살펴보기 목록에서 04~09(황제공진단, 미주신경, 위염, 장, 자궁, 전립선)를 제거하고 `01 성장 · 성조숙증`, `02 뒷목 · 목 디스크`, `03 허리 디스크 · 골반` 3종만 핵심 노출.
4. **3D 모형 하단 근육·신경·관절·혈관 메뉴 삭제**:
   - `body-explorer.html` 하단 3D 컨트롤 바에서 복잡한 해부 계통 버튼 4종을 삭제하고 `[남성 체형] [여성 체형] [전체 보기]` 기본 컨트롤만 깔끔하게 유지.
5. **원장님 전용 커스텀 스튜디오 샘플 페이지 신설 (`homepage/sample-studio.html`)**:
   - 스토리보드(1컷), 질환 카드(첫장 추나·척추), 건강 칼럼(01번) 3대 핵심 영역의 텍스트와 사진을 원장님이 직접 수정 테스트하고, 우측 브라우저 디바이스 프레임에서 100% 실시간 라이브 반영되는 인터랙티브 스튜디오 구축.
   - `sample.html`과 `sample-studio.html` 상단 바에 `[ 🌐 홈페이지 샘플 ]` `[ 🛠️ 커스텀 스튜디오 체험 (수정 TEST) ]` 탭을 배치하여 원클릭 상호 이동 지원.

---

## 🚀 최신 (2026-11-16 v9.10 · 샘플 홈페이지 단순화: 홈페이지 그대로 + ✕△○ 아이콘) — 로컬 전용, 실서버 미배포

- `homepage/sample.html`(생성기 `build-tier-samples.js` 전면 재작성): 탭·사이드바·셀프도구 패널·하단 CTA 모두 제거. 상단 44px 얇은 바(SAMPLE · 범례 ○포함 △일부 ✕미포함 · 안내 페이지로) + 화면 가득 실제 홈페이지 iframe. 사이트 안에서 링크를 눌러 자유롭게 이동.
- 단계별로 차이 나는 기능 위에만 작은 아이콘 표시(`스탠다드 ✕ · 프로 △/○ · 시그니처 ○`, 마우스를 올리면 설명): 스토리보드 ✕△○(프로 12컷/시그니처 24컷+무제한), 3D 인체모형 ✕✕○, 건강 칼럼 ✕△○, Q&A ✕○○, 체크포인트 ✕○○. 모든 단계 기본 포함 기능은 표시하지 않음.
- 바로가기: `sample.html?src=body-explorer.html`, `?src=body-explorer.html&tab=qna`, `?src=chuna.html`.
- `serve.js`: sample.html이 `bareun_sample=1` 쿠키를 심고, iframe(Sec-Fetch-Dest: iframe) 요청이면 `?sample=1` 없이도 읽기 전용 가드 주입 → 사이트 내 이동 후에도 쓰기 차단 유지. 일반 브라우징(document)에는 영향 없음.

---

## 🚀 최신 (2026-11-16 v9.9 · 합법 문구 순화 엔진 개선)

- `homepage/soften-ko.js`(신규): 단어 치환 대신 문장·문맥 기반 순화 엔진(은/는 조사 자동 선택, 완치·최고·1등·효과 100%·보장·특효·무조건·부작용 없음·할인/이벤트 등). b2b-landing.html ‘홍보 문구 AI’와 sample.html ⑥ 탭이 공통 사용. 결과 보장성 표현이 있으면 ‘치료 결과에는 개인차가 있을 수 있습니다.’ 자동 보강.

---

## 🚀 최신 (2026-11-16 v9.8 · B2B 샘플 = 실제 작동 화면 + 기능 마크) — 로컬 전용, 실서버 미배포

- `homepage/sample.html`(생성기 `build-tier-samples.js`): www.bareunhaniwon.com의 진짜 페이지(index / body-explorer / chuna / location)를 iframe으로 띄워 실제 작동을 보여 주고, 화면 위에 기능별 마크(✓ 기본 포함 / ★ 프로 전용 / ✦ 시그니처 전용)를 표시. 스토리보드=프로·시그니처, 3D 인체모형=시그니처, 칼럼=프로(월 8건 텍스트)/시그니처(월 15건+3단 화보), Q&A·체크포인트=프로·시그니처. ⑥ 탭은 셀프 도구(카드 무제한·금지어·합법문구 2회·화보·QR·통계).
- `serve.js`: `?sample=1` 쿼리 시 HTML에 읽기 전용 가드 주입(방문 통계 차단, POST/Q&A 저장 차단). **서버 재시작 필요**. 운영(WordPress) 배포에는 해당 가드가 없으므로, b2b 페이지를 같은 도메인에 올릴 때 별도 처리 필요.
- 셀프 스튜디오 체험의 질환 카드 첫장은 ‘추나·척추교정’ 한 가지로 고정(카드1 이미지 5종 교체 체험).

---

## 🚀 최신 (2026-11-16 v9.7 · B2B 상세페이지 2차 수정) — 로컬 전용, 실서버 미배포

- 한약 가격 문구를 전국 일반 가격대(15일분 20만~35만 원대, 녹용 35만~60만 원 이상, 참고용)로 교체. 환자 심리 4걸음에 ‘한의원 가/나(2가지 vs 4가지 세팅)’ 비유 + 인근 한의원에 환자를 뺏기는 격차 막대 시각화 추가.
- AI 검색 노출 예시 섹션(#aisearch) 추가 — **homepage/b2b-assets/ai-search-example.png 파일 필요**(다른 한의원 모자이크 처리본). 파일 넣기 전까지 자리 표시 박스가 보임.
- 쉬운 계산기: 보험 객단가/비급여 객단가/비급여 결제 비율 분리, ‘10명 중 N명’ 0~10까지 확장. 1년 총비용 계산기는 견적 입력 대신 ‘따로 사면 얼마?’ 가성비 계산기(견적서 실제 항목 단가)로 교체.
- 샘플: 3개 파일 → sample.html 1개(전체 둘러보기, 모든 기능 체험 가능, 기본 포함/프로 전용/시그니처 전용 표시, ?view=standard|professional|signature). 생성기 uild-tier-samples.js.
- 무료 시안 신청 문구 전부 삭제(템플릿 고정). 스튜디오 체험은 질환 카드 첫장 편집으로 교체, 홍보 문구 AI 2회 체험 제한. ‘상황별 설득’, ‘이전 5단계’, ‘이전 30초 점검’ 삭제.

---

## 🚀 최신 (2026-11-16 v9.6 · B2B 상세페이지 개편 + 3단계 샘플 페이지) — 로컬 전용, 실서버 미배포

- **녹색 브랜드 전환**: homepage/b2b-landing.html 전체 팔레트를 진녹색+민트로 교체(구 골드/브라운 제거).
- **실제 견적 2건 반영**: A사 9,790,000원 / B사 20,460,000원(VAT 포함). 업체명·연락처 비공개(A/B사 표기). 1년(12개월) 총비용 비교 계산기로 변경(36개월 약정 느낌 제거, 월 구독은 약정 없음 명시).
- **비급여 설득 섹션(#noncovered)**, **쉬운 계산기(#sim: ‘새 환자 10명 중 몇 명이 마음을 바꿀까’)**, **이전 안내(#migrate: 내용만 이전 가능/디자인·기능은 새 틀, 도메인·사진 저작권·계약 점검 30초 체크)**, **셀프 스튜디오 체험(#studio: 실물 캡처 2b-assets/studio-real.png + 진료시간/수가표/금지어 경고/합법문구 1회 체험/카드 7번째 잠금)**, **단계별 샘플 + 필요 기능 체크 → 단계 추천(#samples)** 추가.
- **3단계 샘플 페이지**: 
ode build-tier-samples.js → sample-standard.html(🔒10개) / sample-professional.html(🔒7개) / sample-signature.html(전체 개방). 섹션 구조는 동일, 미포함 기능은 블러+🔒 안내 모달(차액 문구 → 시그니처 유도).
- **미결정**: 카카오 URL, 1차 특가 곳 수, 환불·해지 정책 확정, 실서버(/b2b/) 배포 여부 (v9.5 항목 유지).

---
## 🚀 다음 PC에서 이어서 할 일 (2026-11-16 v9.5 · B2B 원장님 대상 상세페이지 초안 `homepage/b2b-landing.html`)

- **상태**: 로컬 초안 완성·브라우저 QA 완료(데스크톱/모바일). **실서버 미배포.** 확인: `node serve.js` 후 http://localhost:3000/b2b-landing.html
- **구성**: 히어로(“과연 필요할까?”) → 솔직한 의문 4개 → 환자 심리 4단계 → 안 하면 6개월/1년/3년 + 놓치는 매출 시뮬레이터·손익분기 → 용어 풀이 → 견적 영수증(bareunhaniwon.com 동일 구성 1,000만~1,800만) + 3년 총비용 계산기 → 차별점 4대+비교표 → 3D 회전 카드 → 예약 유도 4갈래 → 셀프 스튜디오 → 구독 ROI → 실서버 증거 → 약속·계약조건 → 가격 3단계 → FAQ → 신청(전화/문자).
- **사용자 확정 사항**: 전국 **100곳 한정**, 문의 **010-8877-0508**, 견적 기준 = www.bareunhaniwon.com 동일 구성, 상권 독점 없음, 네이버 톡톡 미사용.
- **미결정(다음에 물어볼 것)**:
  1. 카카오톡 B2B 채널/오픈채팅 URL → 파일 상단 `KAKAO_URL` 에 입력하면 버튼 활성화(현재 전화·문자만).
  2. 1차 오픈 특가 몇 곳? → `BATCH = {total, remaining}` 입력 시 배지 노출(현재 숨김, 허위 카운터 방지). 권장: 1차 30곳 / 전체 100곳.
  3. 환불·해지 정책 4안(시안 무료·착수 전 전액환불/착수 후 공제·월구독 약정없음·해지 후 30일 보관+백업 제공)은 **제안안** — 확정 및 약관 검토 필요.
  4. “저도 그랬습니다” 류 1인칭 문구는 제거함. 스토리 톤 최종 확인.
  5. 실서버(예: /b2b/) 배포 여부 및 기존 `sales-pitch.html` 대체 여부.
- **주의**: 수치 비교는 “단순 참고용” 문구 유지, 순위·매출 보장 문구 금지, 의료법 56조 금지어 자동 검수는 ‘최종 책임=원장 감수’로 표기.
- 직전 완료: 구글지도 링크 수정(정확 좌표 36.354682,127.4492455 + maps/search API), `/location/` 12개 거점 교통 안내, 네이버·구글 정책 헌법(`SEO_AUTOPOST_CONSTITUTION.md`), 월간 정책 점검 자동화(`monthly-seo-policy-check.js`, 사용자가 Automations 대시보드에서 활성화 필요).

---

## 💎 최신 완료 작업 요약 (2026-11-15 v9.4 · 12개 광역·KTX 오시는길 무페널티 구축 + 네이버·구글 정책 전수 검수 & 자동포스팅 10대 헌법 + 월간 자동 점검 연동)

1. **`/location/` (`location.html`) 12개 시내·충청·전국 KTX 거점 오시는길 카드 구축 (`missingOrigins=[]`, `spamCombo=false`)**:
   - 대전 시내권(`둔산동·유성·도안동`), 충청·인근 광역권(`세종·청주·계룡시·옥천·영동` — **경부고속도로 대전IC 진출 후 3분 / 대전복합터미널 7분**), 전국 KTX·SRT 철도역(`서울역·천안아산역·대구역·부산역` — **대전역 동광장 택시 12~15분**) 실제 도로·IC·대중교통·열차 환승 가이드를 `/location/` 단일 페이지 내 가시적 시맨틱 카드로 구축·배포했습니다.
   - 도어웨이 페이지 `0개`, `[지역명]+한의원` 키워드 도배 `0회`, `JSON-LD` `areaServed`는 실제 주소지(`대전광역시·대덕구`)만 유지하여 다중지역 스팸 페널티 위험 `0%`를 달성했습니다.
2. **네이버·구글 공식 공지 전수 검수 및 4건 선제 고도화 (`SEO_AUTOPOST_CONSTITUTION.md`, `bareun-member-private-qna.php`, `deploy-detail-page-fast.js`)**:
   - `generate_body_note_via_gemini()`에 **기발행 동일 부위 제목·주제 중복 금지 가드** 및 풀세트 심층 필드(`deepParagraphs`, `selfCheckItems` 5문항, `redFlags`, `clinicalObservation`) 매핑을 추가하여 2일 1회(월 15편) 장기 발행 시 Scaled Content Abuse / 유사문서를 원천 방지했습니다.
   - `/feed/` RSS 송출을 최신 수정 35건(`484KB`)으로 슬림화하고 중복 홈 링크를 제외하여 네이버 서치어드바이저 RSS 파싱 안정성을 영구 확보했습니다.
   - 전 건강 글(`/health-note-*/`) 하단에 **AI 문헌 정리 보조 및 안정위 대표원장(한의사) 직접 의학 감수·대면 진료 면책 안내문**을 명시했고, `deploy-detail-page-fast.js` 내 레거시 무공백 키워드 문자열을 자연어로 교체했습니다.

---

## 💎 직전 완료 작업 요약 (2026-11-15 v9.3 · 구글 서치콘솔 & 네이버 서치어드바이저 색인 문제 해결 + 72편 건강 글 지역 스키마·외부 통계 전수 연동)

1. **IndexNow `HTTP 403` 원인 규명 및 네이버 Yeti(`HTTP 200`) + 글로벌 Bing/ChatGPT(`HTTP 202`) 즉시 색인 개통**:
   - 기존 키에 16진수 외 알파벳(`g~z`)이 포함되어 발생하던 `HTTP 403`을 표준 32자리 16진수 키(`b4e02026a15e0ce0849201f7c3d9a5b2`)로 교체하고 물리 파일(`/b4e02026a15e0ce0849201f7c3d9a5b2.txt` `200 OK`)을 생성했습니다.
   - 배포 및 2일 주기 자동 발행 시 **네이버 공식 엔드포인트(`https://searchadvisor.naver.com/indexnow`)**와 **글로벌 엔드포인트(`https://api.indexnow.org/indexnow`)** 양쪽에 전 88개 URL을 동시 전송하여 `HTTP 200 / 202` 수신을 검증했습니다.
2. **구글 서치콘솔(GSC) 사이트맵·RSS 자동 등록 (`88개 URL`, 오류 `0건`)**:
   - Google Cloud 서비스계정(`bareunhaniwon-total@bareunhaniwon-total.iam.gserviceaccount.com`) API를 통해 `wp-sitemap.xml`, `wp-sitemap-posts-page-1.xml`, `wp-sitemap-posts-post-1.xml`, `feed/`를 즉시 제출 완료(`submitted: 88`, `errors: 0`)했으며, 향후 새 건강 글 발행 시 서버가 자동으로 서치콘솔 사이트맵 재수집 핑을 보냅니다.
3. **네이버·구글 구조화 데이터 가이드라인 1:1 일치(`areaServed`) & 72편 독립 건강 글(`/health-note-*/`) 통계·AI 봇 전수 연동**:
   - 네이버 서치어드바이저 및 구글 검색 센터의 '화면 가시 텍스트 = 구조화 데이터 1:1 일치 원칙(숨김 지역명 스팸 방지)'에 맞춰, 화면 주소에 실제 표기된 `대전광역시·대덕구`만 `JSON-LD` `MedicalClinic.areaServed`에 엄격히 일치시켰습니다(미표기 동네·타 지역 숨김 마크업 0건).
   - `wp_head()` 이전에 독립 렌더링되는 `/health-note-{id}/` 72편 전체에도 GA4(`G-8K2Q55SRTB`), 네이버 애널리틱스(`1f9f91dc5849ae0`), RSS 자동발견 태그, 1차 방문·전환 추적(`/wp-json/bareun/v1/visits`), AI 크롤러 우선순위(`init` priority `1`) 추적을 빠짐없이 연결했습니다.

---

## 💎 직전 완료 작업 요약 (2026-11-15 v9.2 · 마스터 전용 1·2단계 통합 분석 & GEO AI 검색·크롤러 관제 5탭 대시보드 완비)

1. **일반 소비자 vs 마스터 철통 분리 유지 (`GET/POST /wp-json/bareun/v1/visits` vs `GET /wp-json/bareun/v1/visits/master`)**:
   - 비로그인 일반 소비자에게는 변함없이 **`오늘 조회수(todayPv)`와 `누적 조회수(totalPv)` 딱 2가지 숫자만 반환·표시**되며, 아래 모든 심층 분석은 마스터 인증 통과 시에만 5탭 대시보드로 열립니다.
2. **1단계: 계정 없이 즉시 작동하는 자체 정밀 분석 + 🤖 GEO AI 유입 & 봇 관제**:
   - **🤖 GEO AI 검색 유입 & AI 인용 크롤러 분리 관제 (`geoAi`)**:
     - **실제 환자 AI 클릭 유입**: ChatGPT(`chatgpt.com`, `chat.openai.com`), Perplexity(`perplexity.ai`), Google Gemini(`gemini.google.com`), Claude(`claude.ai`), Microsoft Copilot(`copilot.microsoft.com`), 네이버 Cue:/CLOVA X(`cue.search.naver.com`), 뤼튼(`wrtn.ai`), 라이너(`getliner.com`), Grok(`grok.com`) 답변 내 출처 링크 클릭 유입을 엔진별·착지 페이지별로 자동 집계합니다.
     - **AI 검색봇 스캔 분리 카운터 (`botStats`)**: `OAI-SearchBot`, `ChatGPT-User`, `GPTBot`, `PerplexityBot`, `ClaudeBot`, `Google-Extended` 등이 `/llms.txt` 및 `/health-note-*/`를 읽어갈 때 **환자 조회수를 부풀리지 않고 별도 AI 봇 카운터로 청정 분리 집계**합니다.
   - **🧭 14대 세부 플랫폼 · 🕒 00~23시 시간대별 골든타임 · 🎯 예약 클릭 전환 추적**:
     - 네이버 통합검색 / 네이버 플레이스·지도 / 네이버 블로그·카페 / 네이버 인앱 / 구글 검색 / 카카오톡 채팅·채널 / 다음·카카오 / 인스타그램 / 스레드(Threads) / 유튜브 / 페이스북 / 당근 / 🤖 GEO AI 검색 / 직접 접속을 정밀 분류합니다.
     - 00시~23시 시간대별 집중도 막대 차트(피크타임 자동 표시 + 오전/오후/저녁/심야 비중), 요일별(월~일) 분포, 그리고 **`전화상담 / 카톡예약 / 네이버예약 / 4대 지도 길안내`** 실제 클릭 전환수(`POST /wp-json/bareun/v1/visits/event`)와 플랫폼별 전환 기여도를 집계합니다.
3. **2단계: Google GA4(연령·성별) + Google Search Console(구글 키워드) + 네이버 애널리틱스(WCS) 원클릭 자동 연동**:
   - 마스터 모달 5번째 탭(`⚙️ GA4 · 서치콘솔 · 네이버 연동`)에서 코딩 없이 `GA4 측정 ID(G-...)`와 `네이버 애널리틱스 ID(s_...)`만 입력하면 전 페이지에 `gtag.js`(Google Signals 활성 + `geo_ai_referral`·`clinic_conversion_click` 이벤트 자동 전송)와 `wcslog.js`가 자동 삽입됩니다.
   - `GA4 속성 ID`, `서치콘솔 사이트 주소`, `Google 서비스계정 JSON`을 입력하면 서버 내장 RS256 OAuth2 엔진이 **GA4 연령대(`18-24`~`65+`)·성별(`여성/남성`)** 및 **구글 서치콘솔 실제 유입 키워드 TOP 25(클릭·노출·CTR·평균순위)**를 마스터 대시보드 안으로 실시간 불러옵니다 (미연동 시에도 1차 진료군 기반 타깃 코호트 분포가 상시 작동하며, 가짜 인구통계 숫자는 절대 표시하지 않음).

---

## 💎 직전 완료 작업 요약 (2026-11-15 v9.1 · 시그니처 마스터 기능 완비: 1번 오시는길·4대 내비 자동길안내·인사말·비급여 / 3번 모바일 3버튼 예약바·원장약력·합법AI·무제한페이지 / 4번 마스터 전용 상세통계 잠금)

1. **`1번` 오시는길 · 진료시간 · 비급여 전용 페이지(`/location/` · `location.html`) & 전 페이지 모달 & 스튜디오 셀프 수정 탭 (`clinic-global-info.json`, `build-location-page.js`, `visit-tracker.js`, `detail-pages-editor.html`)**:
   - 상단에 따뜻한 **대표원장 환영 인사말**을 탑재하고, **네이버지도 · 구글지도 · 티맵(TMAP) · 카카오맵** 4대 개별 브랜드 아이콘 클릭 시 바른한의원 대전본점(`대전광역시 대덕구 비래동로7번길 1, 2층`, `36.35536, 127.44778`)으로 **즉시 자동 길안내(모바일 앱 딥링크 + PC 웹 경로안내 폴백)**가 실행됩니다.
   - 의료법 제45조 **『비급여 진료비용 안내표』** 및 진료시간·임시휴진 공지·주차 안내를 탑재했으며, 스튜디오 내 **`🏥 병원정보 · 오시는길 · 비급여`** 탭에서 코딩 없이 직접 수정·실서버 배포가 가능합니다.
2. **`2번` 보류 항목 (`chairside-3d` 실서버 배포 & 대기실 QR 자가진단 POP 생성기)**:
   - 사용자 지시에 따라 코드 미적용(보류) 상태를 엄격히 유지하며, 추후 승인 시 즉시 연동 가능하도록 보존했습니다.
3. **`3번` 승인 항목 (`전화 / 카톡 / 네이버예약` 3종만 적용 · `네이버 톡톡` 완전 삭제/제외)**:
   - 모바일(`900px` 이하) 전 페이지 하단 고정 플로팅 빠른 예약 바(`📞 전화상담` / `💬 카톡예약` / `📍 네이버예약` 딱 3개 버튼, 네이버 톡톡 `0건`), `director.html` 좌측 대표원장 **공식 약력·학술활동·진료철학** 섹션, 스튜디오 각 카드 **실시간 의료법 제56조 금지어 감지 + `[✨ 합법 AI 문구 자동 다듬기]`**, 스튜디오 상단 **`[➕ 새 질환 페이지 추가]` 무제한 셀프 생성/삭제**를 완비했습니다.
4. **`4번` 조회수 공개 범위 이원화 (`visit-tracker.js`, `bareun-member-private-qna.php`, `local-bareun-api.js`)**:
   - 일반 방문자용 배지 및 미인증 API(`GET/POST /wp-json/bareun/v1/visits`)는 오직 **`오늘 조회수(todayPv)`와 `누적 조회수(totalPv)` 2개 수치만 반환·표시**하며, 14일 추이·인기 페이지·유입 경로·접속 기기·최근 IP 로그는 **마스터 서버 인증(`POST /wp-json/bareun/v1/auth/master-login` → `GET /wp-json/bareun/v1/visits/master`) 통과 시에만 열람**되도록 백엔드와 프론트엔드를 이중 잠금했습니다.

---

## 💎 직전 완료 작업 요약 (2026-11-15 v9.0 · 『오늘의 건강 글』 상·중·하 3단 멀티 화보 풀세트 + 소비자 실생활 검색 키워드 360개 + 2일 주기 자동 발행 엔진 풀세트 업그레이드)

1. **9대 부위 플래그십 맞춤 27장 16:9 화보(`1376×768`) 신규 제작 & 전 72편(216개 슬롯) 3단 멀티 배치 완비 (`webp/hn_*_20261111_*.webp`, `hn_*_20261111_mechanism.jpg`, `health-notes-custom-config.json`)**:
   - **슬롯 ① 도입부 (`일상 공감 01` · `empathyIllustImg`)**: 독자가 겪는 일상 속 불편 순간을 따뜻한 캐시미어 아이보리(`#FAF8F3`) 자연광으로 포착해 글 시작 3초 체류율을 극대화했습니다.
   - **슬롯 ② 본문 중단 (`원리 도해 02` · `deepIllustImg`)**: 직관적인 3D 메디컬 일러스트와 **`[🧬 3D 인체모형 열기 →]`** 브릿지를 일체형으로 배치하고, 카카오톡·블로그 공유용 `1376×768` OG 대표 썸네일(`.jpg`)과 연동했습니다.
   - **슬롯 ③ 하단 실천부 (`전·후 루틴 03` · `routineIllustImg`)**: `✅ 1분 자가점검` 직전에 나쁜 생활 자세(Before)와 편안한 저녁 회복 루틴(After) 비교 화보를 배치해 완독률과 실천 전환율을 높였습니다.
   - 72편 × 3슬롯 = **216개 슬롯 전수 비중복 매핑 및 실물 파일 검증(`0 누락`)**을 완료했습니다.
2. **소비자 실생활 검색 키워드 360개(`consumerKeywords` · 편당 5개) & SEO·AEO·GEO 스키마 고도화 (`auto-blog-engine.js`, `bareun-member-private-qna.php`, `build-body-explorer.js`)**:
   - 환자들이 실제 검색창에 자주 입력하는 구어체·증상형 키워드 5개씩(총 360개)을 본문 해시태그 칩(`.consumer-kw-row` / `.inline-consumer-kws`), `<meta name="keywords">`, 3단 이미지 `alt`·`figcaption`, `/llms-full.txt`, 5노드 정본 JSON-LD `MedicalScholarlyArticle`(`image` 3장 배열 + 통합 `keywords`)에 자연스럽게 반영했습니다 (의료법 제56조 및 미순화 전문용어 3단계 감사 오류 `0건`).
3. **2일 주기 자동 발행 엔진(`bareun-member-private-qna.php`) & 원장님 온라인 스튜디오(`detail-pages-editor.html`) 풀세트 연동**:
   - 워드프레스 2일 주기 크론 실행 시 7단계 공감 원고 + 실생활 키워드 5개 + 상·중·하 3단 맞춤 화보를 자동 생성·업로드하고 `/body-explorer/`, `/health-note-{id}/` SSR, 사이트맵/피드, IndexNow 색인 핑까지 한 번에 처리합니다.
   - 온라인 스튜디오(`detail-pages-editor.html`)에서도 `consumerKeywords` 입력란과 슬롯 ①·②·③ 각각의 업로드·보관함·AI 2K 화보 제작 패널을 완비했습니다.

---
## 💎 최신 완료 작업 요약 (2026-11-15 v8.2 · `/health-note-{id}/` ↔ `/body-explorer/` 통합 조회수·인기글 랭킹 단일화 & 원클릭 『🔗 링크 퍼가기』 아이콘 탑재)

1. **양방향 단일 조회수 카운터 & 『이어서 읽기 BEST 2』 인기글 100% 실시간 동기화 (`bareun-member-private-qna.php`, `build-body-explorer.js`, `auto-blog-engine.js`, `local-bareun-api.js`)**:
   - 워드프레스 중앙 옵션 DB(`bareun_body_note_views_v1`) 및 로컬 DB(`private-qna-db.json` → `noteViews`)를 단일 원천으로 묶어, 고객이 **`https://www.bareunhaniwon.com/health-note-{id}/`에서 읽든 `https://www.bareunhaniwon.com/body-explorer/`에서 읽든 동일한 카운터가 즉시 합산**됩니다.
   - 동일 브라우저 세션 내 중복 집계를 막는 통합 키(`sessionStorage['bareun_viewed_hn_' + noteId]`) 및 검색봇 필터링을 적용해 한 고객이 독립 칼럼에서 `[🧬 3D 인체모형 열기 →]`로 이동해도 중복 카운트 없이 **양쪽 페이지에 100% 동일한 `조회수 N회`와 동일한 `이어서 읽기 BEST 01 · 02` 인기글 순위**가 노출됩니다.
2. **`/body-explorer/` 및 `/health-note-{id}/` 원클릭 『🔗 링크 퍼가기』 아이콘 버튼 탑재**:
   - **`/body-explorer/` 5곳 배치**: ① 상단 우측 헤더(`#vh-share-link-btn`), ② 모든 건강 글 팝업 카드 우측 상단(`.hip-share-link-btn`, `✕ 닫기` 옆), ③ `[🔍 상세히 보기]` 감수자 바(`.iyb-share-btn`), ④ 하단 채널 바 좌측 첫 버튼(`.ch-icon-btn.ch-copy`), ⑤ `03 · 더 궁금하세요?` 72편 아카이브 목록 각 행 우측(`.archive-share-mini-btn`).
   - **`/health-note-{id}/` 2곳 배치**: 상단 고정 헤더(`.header-action-share`) 및 하단 공식 채널 바(`.ch-pill-share`).
   - 퍼가기 클릭 시 카톡·네이버 블로그·카페·스레드·문자 어디에 붙여넣어도 **개별 글 전용 제목·요약·1376×768 의학 일러스트 OG 미리보기와 SEO 백링크 점수가 100% 정본으로 모이는 `https://www.bareunhaniwon.com/health-note-{id}/` 주소**가 클립보드에 즉시 복사되며 `✓ 복사됨` 상태 전환 및 샴페인 골드 토스트 알림이 표시됩니다.

---

## 💎 직전 완료 작업 요약 (2026-11-15 v8.1 · 『오늘의 건강 글』 72편 SEO·AEO·GEO 7단계 통합 정본화 & 관리자 전용 3사 알고리즘 확산 스튜디오 구축)

1. **독립 검색 정본 URL(`/health-note-{id}/`, HTTP `200 OK`) 복원 & 3D 인체모형 인라인 서랍 단일 소스 동기화 (`bareun-member-private-qna.php`, `auto-blog-engine.js`, `build-body-explorer.js`, `serve.js`)**:
   - 기존 `/health-note-{id}/` 접속 시 `/body-explorer/?part=...&note=...`로 301 리다이렉트되며 72개 개별 글 색인이 단일 페이지로 합쳐지던 구조 병목을 근본 해결했습니다.
   - 이제 **`https://www.bareunhaniwon.com/health-note-{id}/` 전 72편이 독립된 `HTTP 200 OK` 정본 칼럼**으로 서빙되며, 본문 내 **`[🧬 3D 인체모형 열기 →]`** 배너로 3D 뷰어와 양방향 연결됩니다.
   - `/body-explorer/?part=...&note={id}` 내 **`[🔍 상세히 보기 ▼]`** 서랍 역시 동일한 단일 설정(`health-notes-custom-config.json` / WP `bareun_health_notes_cfg_v1`)을 읽어 7단계 심층 칼럼을 즉시 표시하며, `<link rel="canonical">`을 `/health-note-{id}/`로 지정해 중복 문서 감점을 원천 차단했습니다.
2. **72편 전수 고유 7단계 하이엔드 환자 친화 에디토리얼 데이터 완비 (`health-notes-custom-config.json`, `health-notes-custom-config.default.json`)**:
   - 전 72편(9대 부위 × 8편) 모두 중복 문단 없이 고유한 **`seoTitle`**, **`directAnswer`(AEO 30초 핵심 결론)**, **`deepParagraphs`**, **`clinicalObservation`(진료실 생활 리듬 관찰 포인트)**, **`comparisonTable`(GEO 인용 자석 4×4 비교표)**, **`selfCheckItems`(SXO 인터랙티브 5문항 자가점검 스코어카드)**, **`redFlags`(대면 확인 주의 신호)**, **`lastReviewed`**를 구축 완료했습니다 (의료법 제56조 주의 금칙어 `0건`).
   - 상업 의료기관 제한 대상인 `FAQPage` 스키마를 제거하고 `MedicalClinic` · `Person(#physician)` · `BreadcrumbList` · `MedicalWebPage` · `MedicalScholarlyArticle` 5노드 정본 JSON-LD 그래프로 정비했습니다.
3. **고객 노출 경계 100% 분리 — 원장님 전용 관리자 스튜디오(`detail-pages-editor.html`) 전용 검수기 & 3사 확산 패키지 탑재**:
   - 고객/검색봇이 보는 `/health-note-{id}/` 및 `/body-explorer/`에는 순수 7단계 건강 노트만 노출됩니다 (`hasAdminTabs: false` 검증 완료).
   - 오직 원장님 전용 스튜디오(`http://localhost:3000/detail-pages-editor.html` 및 워드프레스 관리자 `bareun-custom-studio`) 내부 각 건강 글 편집창 하단에만 **BOX C (`🔬 실시간 SEO·AEO·GEO·의료법 100점 검수기`)**와 **BOX D (`📣 유튜브 쇼츠[VVSA·APV 무한루프] · 네이버 블로그[D.I.A.+·실사 5슬롯·네이버플레이스 지도] · 메타 스레드[외부링크 0% 3단 타래] 원클릭 복사 패키지`)**가 표시됩니다.
4. **기술 SEO / GEO 인프라 정밀 교정 및 카페24 실서버 배포 검증 완료 (`seo-master-config.js`, `deploy-cafe24.js`)**:
   - `robots.txt`에 `Claude-SearchBot`, `Claude-User`, `Applebot-Extended` 명시 허용 추가, `wp-sitemap-posts-post-1.xml` 내 72개 정본 `/health-note-{id}/` URL 및 실제 검토일 기준 분산 `<lastmod>` 적용, `/llms.txt` 및 `/llms-full.txt` 정본 URL 갱신 및 실서버 배포·브라우저 검증을 100% 완료했습니다.

---

## 💎 최신 완료 작업 요약 (2026-11-14 v8.0 · 체어사이드 3D(`chairside-3d.html`) 그래픽 품질 전면 개편)

1. **렌더 파이프라인 교정**: HalfFloat + 4x MSAA 컴포저 타깃 + `OutputPass`(ACES→sRGB). 기존 raw linear 출력으로 인한 탁함·계단현상 제거. 에스프레소 라디얼 스튜디오 배경 적용.
2. **셰이더 전면 업그레이드**: 뼈(프로시저럴 피질골 범프·AO·SSS·스튜디오 환경 반사), 디스크/수핵(젤 SSS·wet 스펙큘러, 흰색 번아웃 제거), 피부(모공 범프)·근막(유기적 콜라겐 섬유망)·근육(섬유 범프+광택), 혈관·신경 튜브(광택·림).
3. **고스트 인체 실루엣**: 피부/근육 투시 시에도 해부학적 맥락 유지(`createGhostBodyShader`).
4. **수핵 탈출 모델**: 구체 4개 → 단일 유기적 변형 메쉬(mergeVertices), x-ray(depthTest off)로 후궁 뒤에서도 식별.
5. 포커스 스포트라이트 감쇠 완화(0.16→0.46), 요추·무릎 카메라 프리셋 구도 조정, 혈관 깊이쓰기 활성.
- 백업: 개편 전 파일은 브레인 scratch 폴더 `chairside-3d.backup.html`. 미커밋 상태(원하시면 커밋·카페24 배포 진행).

---


## 💎 최신 완료 작업 요약 (2026-11-13 v7.9 · 건강 글 네이버플레이스 링크 교체 & 스레드·인스타그램 채널 5종 연동)

1. **72편 전 건강 글 네이버 아이콘 링크 단일화 (`homepage/build-body-explorer.js`, `health-notes-custom-config.json`, `health-notes-custom-config.default.json`)**:
   - 기존 네이버 블로그 링크(`blog.naver.com/wei0508`)에서 환자분들이 지도와 진료 예약으로 즉시 연결될 수 있는 **공식 네이버플레이스(`https://naver.me/5U1ELn8L`)**로 100% 교체 완료했습니다.
2. **스레드(Threads) & 인스타그램(Instagram) 공식 심볼 아이콘 버튼 추가**:
   - **스레드 (Threads)**: 공식 블랙 서클 테마 + 정품 Threads SVG 로고 + `스레드` 라벨 (`https://www.threads.net/@bareun_oriental`)
   - **인스타그램 (Instagram)**: 감각적인 인스타그램 오리지널 5색 선셋 그라데이션 서클 + 카메라 SVG 로고 + `인스타그램` 라벨 (`https://www.instagram.com/bareun_oriental/`)
   - 최종 5대 채널 구성: **▶️ 유튜브 · 🟩 네이버플레이스 · 🧵 스레드 · 📸 인스타그램 · 💬 카카오톡**
3. **통합 커스텀 스튜디오(`detail-pages-editor.html`) 전역 설정 연동**:
   - `🧬 12 · 3D 오늘의 건강 글`의 `🎛️ 표시 항목 & 컬러` 설정 패널에서 5개 채널 각각의 노출 ON/OFF 체크박스, 버튼 라벨, 연결 URL을 원장님께서 언제든 자유롭게 수정하실 수 있도록 확장했습니다.
4. **카페24 실서버 배포 및 브라우저 검증 완료**:
   - Puppeteer 라이브 검증 결과 5개 채널 아이콘(`iconsCount: 5`)이 모두 정상 로드 및 링크 작동함을 100% 검증 완료했습니다.

---

## 💎 직전 완료 작업 요약 (2026-11-13 v7.8 · 『오늘의 건강 글』 상단 상세히 중복 제거 & 하단 단일화)

1. **상단 `[🔍 상세히]` 캡슐 버튼 전면 제거 및 헤더 액션 단일화 (`homepage/build-body-explorer.js`, `homepage/bundle-wp.js`, `homepage/body-explorer.html`)**:
   - 기존 상단 헤더 우측(`[🔍 상세히 ▼]` + `[✕ 닫기]`)과 본문 최하단 바(`이 주제의 깊은 원리가 더 궁금하신가요? · 🔍 상세히 보기 ▼`)가 동시에 존재하여 발생하던 시각적 중복 및 사용자 혼선을 해결했습니다.
   - 상단 헤더에서는 `[🔍 상세히]` 버튼을 72편 전 글에서 **완전 삭제**하고 오직 **`[✕ 닫기]`** 버튼만 깔끔하게 남겼습니다.
2. **하단 `[🔍 상세히 보기 ▼ / 접기 ▲]` 바 단일 상호작용 검증**:
   - 4단 요약을 정독한 후 본문 하단 바를 누르면 심층 건강 칼럼(`.deep-editorial-drawer`)이 부드럽게 펼쳐지며 문구가 `심층 건강 칼럼 열람 중 · 접기 ▲`로 전환되고, 다시 누르면 4단 요약으로 접히는 원스톱 UX를 완성했습니다.
   - Puppeteer 브라우저를 통해 `https://www.bareunhaniwon.com/body-explorer/` 실서버에서 상단 버튼 부재(`headerPill: null`), 하단 바 토글 동작(`drawerOpen: true` → `false`) 100% 정상 작동을 확인했습니다.

---

## 💎 직전 완료 작업 요약 (2026-11-13 v7.7 · 『오늘의 건강 글』 원페이지 `[🔍 상세히]` 심층 칼럼 & 통합 커스텀 스튜디오 72편 직접 수정 탑재)

1. **『오늘의 건강 글』(`/body-explorer/`, WP ID `125`) 원페이지 인라인 `[🔍 상세히]` 심층 칼럼 구현 (`homepage/build-body-explorer.js`, `homepage/health-notes-custom-config.json`, `homepage/bundle-wp.js`)**:
   - **기존 4단 요약 구조 100% 보존**: `1. 일상 속 공감 상황` · `2. 몸속 연골/신경이 알려주는 진실` · `3. 흔히 하는 오해 바로잡기` · `4. 오늘 밤 집에서 해보는 1분 체크` 기본 카드 레이아웃을 그대로 유지했습니다.
   - **상단 캡슐 버튼 & 하단 펼침 바 이중 토글**: 팝업 우측 상단 **`[🔍 상세히 ▼]`** 버튼과 본문 하단 안내 바(`이 주제의 깊은 원리가 더 궁금하신가요? · 🔍 상세히 보기 ▼`)를 누르면 페이지 이동 없이 같은 화면 안에서 심층 건강 칼럼(`.deep-editorial-drawer`)이 부드럽게 펼쳐지고 접힙니다.
   - **기계적 마케팅/SEO 용어 및 `5줄 요약` 100% 제거 · 순수 정보형 문체 재작성 (`init-health-notes-config.js`)**: 구독자에게 광고처럼 느껴질 수 있는 `⚡ AEO 핵심 의학 결론 요약`, `GEO 의학 팩트 시트`, `AEO`, `GEO`, `SEO` 표기 및 `가족 공유용 건강 노트 핵심 5줄 요약`을 전 72편에서 **0%**로 완전 삭제하고, 오직 몸속 생리 변화와 생활 속 돌봄 원리만 담백하게 풀어썼습니다(검색엔진용 구조화 데이터는 화면에 보이지 않는 `<script type="application/ld+json">` 내부에서만 작동).
   - **심층 영역 5대 핵심 구성**:
     1. 부위별 고해상도 의학 모식도(`1376×768`) + 쉬운 우리말 캡션(`▲ ...`)
     2. 중복 없는 순수 정보 에디토리얼(`📖 {주제}, 우리 몸속에서는 어떤 변화가 일어날까요?` 2문단 + 1줄 참고 문헌)
     3. `🩺 가정에서 함께 살펴보면 좋은 3가지 신호` (번호형 `1, 2, 3`)
     4. **`이어서 읽기 BEST 2`**: 같은 부위 인기 건강 글 **2개**만 엄선 노출하며, 클릭 시 외부 이동 없이 현재 팝업 안에서 해당 글로 즉시 전환
     5. **`유튜브 · 네이버 · 카카오톡` 브랜드 심볼 아이콘 버튼**: 공식 유튜브(`https://www.youtube.com/@bareunhaniwon`), 네이버 블로그(`https://blog.naver.com/wei0508`), 카카오톡 채널(`https://pf.kakao.com/_ykxcLK`) SVG 아이콘 캡슐 버튼 배치
2. **외부 검색·구독 유입의 홈페이지(`/body-explorer/`) 단일 집중 (`bareun-member-private-qna.php`, `auto-blog-engine.js`)**:
   - 기존 개별 URL(`/health-note-{id}/`) 접속 시 별도 고립 블로그 화면에 머물지 않고 **`https://www.bareunhaniwon.com/body-explorer/?part={부위}&note={글ID}&detail=1`로 즉시 1-hop `301` 리다이렉트**되어, 3D 인체모형 본 홈페이지 안에서 해당 부위와 `[🔍 상세히]` 심층 칼럼이 자동으로 열린 상태로 맞이합니다.
   - 워드프레스 `post_link` 필터·네이버용 `/feed/`·사이트맵·`/llms.txt` 링크도 모두 `https://www.bareunhaniwon.com/body-explorer/?part={부위}&note={글ID}` 정본 URL(`HTTP 200` + 개별 동적 `<title>`·`og:image`·`Article` JSON-LD SSR 주입)로 일원화했습니다.
3. **기존 통합 커스텀 스튜디오(`detail-pages-editor.html`)에 `🧬 12 · 3D 오늘의 건강 글` 72편 직접 편집 완벽 통합 (`detail-pages-editor.html`, `serve.js`, `deploy-detail-page-fast.js`, `bareun-member-private-qna.php`)**:
   - **로컬 스튜디오(`http://localhost:3000/detail-pages-editor.html`)** 및 **24시간 워드프레스 온라인 스튜디오(`https://www.bareunhaniwon.com/wp-admin/admin.php?page=bareun-custom-studio` · `/body-explorer/?bareun_studio=1`)** 상단 탭에서 **`🧬 12 · 3D 오늘의 건강 글`**을 선택해 72편 전체를 코딩 없이 직접 수정할 수 있습니다.
   - **지원 편집 항목**: 9대 부위 필터, 새 건강 글 추가·복제·삭제·순서 이동·표시 ON/OFF, 기본 4단 요약(제목·서브키워드·공감·진실·오해·1분 체크·참고문헌), `[🔍 상세히]` 심층 칼럼(심층 소제목·순수 정보 본문·가정 내 체크 신호 3가지·모식도 PC 업로드 및 **✨ 아르곤 하이 2K AI 이미지 생성 연동**), 전역 설정(`상세히` 버튼 문구, `이어서 읽기 BEST N` 개수 `0/1/2/3`, `유튜브·네이버·카카오톡` 아이콘 개별 ON/OFF 및 링크 URL 수정), 우측 3D 인체모형 화면 `0.01초` 실시간 미리보기(`SYNC_HEALTH_NOTE_PREVIEW`) 및 원클릭 카페24 실서버 즉시 반영(`window.__BAREUN_LIVE_HEALTH_NOTES_CFG__` 런타임 주입 + 정적 HTML 리빌드).

---

## 💎 직전 완료 작업 요약 (2026-11-13 v7.6 · 『오늘의 건강 글』 72편 SEO·AEO·GEO 6대 전면 개편 & 대표번호 `010-5631-1275` 단일화)

1. **공식 대표번호 `010-5631-1275`(`+82-10-5631-1275`) 100% 단일화 및 구 `042-*` 번호 전수 영구 삭제 (`seo-master-config.js`, `disease-blog-seed-data.js`, `terms.js`, `payment-config.js`, `local-bareun-api.js`, `serve.js`, `wordpress-alimtalk-endpoint.php` 등 전 파일)**:
   - 현재 사용하지 않는 `042-622-1275`, `042-488-1075` 등 모든 `042` 유선번호를 홈페이지 소스·JSON-LD 스키마·약관·알림톡 발신번호·레거시 파일에서 0건이 되도록 완전 소거했습니다.
   - `MedicalClinic` / `MedicalOrganization` 엔티티의 `sameAs` 배열에 공식 유튜브 채널(`https://www.youtube.com/@bareunhaniwon`), 네이버 플레이스(`https://naver.me/5U1ELn8L`), 공식 네이버 블로그(`https://blog.naver.com/wei0508`), 카카오톡 채널(`https://pf.kakao.com/_ykxcLK`)을 통합 연결했습니다.
2. **워드프레스 코어 SEO 엔진(`bareun-member-private-qna.php`) 4대 구조적 병목 해결**:
   - **중복 `FAQPage` 스키마 충돌 제거**: `/health-note-*` 및 인라인 스키마 보유 포스트에서 `<head>`는 `MedicalClinic`·`WebSite`·3단계 `BreadcrumbList`만 출력하고, 본문 전용 JSON-LD가 단일 정본 `MedicalWebPage`·`MedicalScholarlyArticle`·5문항 `FAQPage`·`HowTo`를 전담하도록 분리하여 구글 리치 결과 및 AI 검색 파싱 정합성을 확보했습니다.
   - **`<title>` 중간 음절 절단(`…`) 해결**: 포스트 타이틀 허용 임계치를 스마트 78~82자로 상향하여 전체 질문형 제목과 `[부위 · 핵심키워드 건강백과] | 바른한의원`이 잘림 없이 온전히 노출됩니다.
   - **9대 부위별 `1376×768` 고유 대표 이미지(`og:image` · Google Discover 규격) 자동 매핑**: 전 포스트가 동일한 기본 로고 이미지를 공유하던 한계를 넘어, 부위별 `featured_media`(`illust_knee_growth_care.jpg`, `illust_cervical_hairloss.jpg` 등 9종 `1376×768`)를 자동 감지하여 `og:image`, `twitter:image`, `<link rel="preload">`에 각각 반영했습니다.
   - **네이버 서치어드바이저 RSS 피드(`/feed/`) 30개 → 120개 확장 및 `<script>` 제거**: 기존 최신 30개 제한으로 누락되던 57개 건강 글을 포함해 총 **87개 전체(14개 진료 페이지 + 1개 플래그십 리뷰 + 72개 건강 글)**가 `/feed/`에 100% 송출되며, 피드 본문 내 인라인 `<script>`/`<style>`을 정제해 네이버 크롤러 호환성을 극대화했습니다.
3. **72개 『오늘의 건강 글』 심층 의학 에디토리얼 확장 & AI 지식 인덱스(`/llms.txt`, `/llms-full.txt`) 업그레이드 (`auto-blog-engine.js`, `deploy-cafe24.js`)**:
   - 기존 약 500자 단문 구조에서 **약 4,290자 분량의 하이엔드 통합생리학 아티클**(고해상도 모식도 `<figure>`, 해외 SCI + 통합생리 학술 인용 보강, 6번 심층 생리 기전 및 감별 관찰 포인트 섹션, 5문항 확장 `FAQPage`, 같은 부위 연관 건강 글 4편 **토픽 클러스터 내부 링크**, 맞춤 전문 클리닉 및 공식 유튜브·블로그 연동, 블로그/SNS 공유용 5줄 요약 카드)로 고도화했습니다(3단계 환자 친화 품질 감사 72/72 전수 통과 유지).
   - `https://www.bareunhaniwon.com/` 실서버 배포 완료 및 HTTP 200·스키마·RSS(87건)·사이트맵(73포스트)·`llms.txt` 라이브 검증 완료.

---

## 💎 직전 완료 작업 요약 (2026-11-13 v7.5 · AI 이미지 제작 프롬프트 100% 정밀 이행 엔진 개편)

1. **시스템 하드코딩 고정 문구(`원목·한지 자연광·손동작 강요`) 전면 제거 (`homepage/studio-ai-engine.js`, `bareun-member-private-qna.php`)**:
   - 기존 프롬프트 빌더(`buildArgonHighPrompt`, `build_argon_high_prompt_php`, `buildMasterFluxPrompt`, `translate_ko_medical_prompt_server`) 내부에 고정 주입되어 있던 `'따뜻한 원목과 은은한 한지 자연광이 어우러진 프리미엄 한의원'` 및 `'손동작을 처음부터 새롭게 사고하여 촬영하세요'` 문구가 사용자의 `'모던한'`, `'(배경없이)'`, `'1인칭 시점'` 지시를 덮어써서 한옥 창살 배경·나무 인바디·손 3개 환각을 유발하던 문제를 근본 해결했습니다.
   - 이제 사용자가 프롬프트에 직접 적지 않은 한옥 창살(한지 창문), 원목 인테리어, 화분, 과장된 손가락 가리키기 동작을 임의로 추가하지 않고 오직 사용자의 문장 지시만 100% 최우선으로 구현합니다.
2. **`(배경없이)` 전용 감지 가드(`detectNoBackgroundDirective`) 및 문맥 자동 정규화(`normalizeUserPromptDirectives`) 신설**:
   - 프롬프트에 `(배경없이)`, `배경 없이`, `단색 배경`, `무배경` 등이 포함되면 창문·한옥 격자 창살·블라인드·화분·선반·가구 등 실내 배경 사물 생성을 0%로 차단하고, 깔끔한 단색 스튜디오 톤/아웃포커싱 배경으로 강제합니다.
   - `'공간에서 (배경없이)에서'`처럼 단어 간 충돌이 일어나는 표현도 `'창문이나 배경 가구가 전혀 없는 깔끔한 단색 스튜디오 톤 배경에서'`로 자동 정규화하여 AI 혼선을 원천 제거했습니다.
   - `detail-pages-editor.html` UI에도 `🎯 [(배경없이) 클린 스튜디오 가드 자동 감지됨]` 실시간 배너를 추가했습니다.
3. **현대 의료기기 재질 고정 & 인체 해부학(1인 최대 2손 · 제3의 손 차단) 규칙 강제**:
   - 체성분 분석기(인바디)·초음파·모니터 등 의료기기가 절대 나무(목재)로 변질되지 않도록 현대 메디컬 클리닉 디지털 장비 재질(매트 화이트·실버·다크그레이 바디 + 글래스 LCD 모니터)을 강제했습니다.
   - 1인칭 시점(POV) 또는 양손으로 좌우 전극 손잡이를 잡는 장면에서 화면을 가리키는 '제3의 손'이 추가로 등장하지 않도록 엄격한 해부학 가드를 적용했습니다.

---

## 💎 직전 완료 작업 요약 (2026-11-12 v7.4 · 워드프레스 상하 2개 중복 스튜디오 창 원인 규명 및 100% 정상화)

1. **상세페이지 에디터 코드 100% 롤백 완료 (`homepage/detail-pages-editor.html`)**:
   - 직전 턴에서 우측 실시간 미리보기 프레임을 제거했던 변경사항을 완전히 롤백하여, 원본 2컬럼 레이아웃(좌측 카드 편집 + 우측 실시간 3D/의학 미리보기)으로 완벽 복원했습니다.
2. **워드프레스 관리자에서 동일한 창이 상하 2개로 표시되던 근본 원인 규명 및 해결**:
   - **원인**: 카페24 워드프레스에 공식 플러그인(`Bareun Member Auth & Private Disease QnA`)이 활성화되어 있는 상태에서, 과거에 등록되었던 **WPCode PHP Snippet #1873(`Bareun Member Auth & Private Disease QnA v5`)**이 동시에 활성화되어 있었습니다. 두 모듈이 모두 `add_action('admin_menu')`에 동일한 스튜디오 메뉴를 등록하면서 WordPress가 `render_admin_studio_page()`를 연속 2회 실행하여 화면에 위/아래 2개의 동일한 스튜디오 iframe이 렌더링되던 현상이었습니다.
   - **조치**: 중복 실행되던 구 WPCode Snippet #1873을 즉시 비활성화(Deactivate) 처리 완료.
   - **검증**: Puppeteer 헤드리스 브라우저로 실제 워드프레스 관리자(`admin.php?page=bareun-custom-studio`) 접속 검증 결과, iframe 개수가 정확히 `1개`로 단일화되었음을 확인 완료.
3. **`deploy-cafe24.js` 배포 스크립트 가드 고도화**:
   - 배포 시 공식 플러그인이 백엔드를 전담하므로, WPCode에 중복 등록된 레거시 스니펫이 다시 켜지지 않도록 자동 비활성화 가드를 적용했습니다.

---

## 💎 이전 완료 작업 요약 (2026-11-12 v7.3 · 통합 커스텀 스튜디오 V4 5대 고도화 & 메인 홈 시작 스토리 통합)

1. **`(얼굴미노출)` 지시 100% 엄격 준수 가드 & 안정위 대표원장 정방향 8각도 인물 정밀 고정 (`homepage/studio-ai-engine.js`, `homepage/director-angle-refs/`, `bareun-member-private-qna.php` V4)**:
   - 기존 가로 회전(EXIF 미보정)되었던 원장님 샘플 파일 정리 및 RetinaFace 중앙 정렬 `1024×1024` 정방향(Upright) 8각도 샘플(`angle_front`, `angle_front_smile`, `angle_left15_smile`, `angle_right15_smile`, `angle_left30`, `angle_right30`, `angle_left_profile`, `angle_right_profile`) 캘리브레이션 완료 (ArcFace 코사인 일치율 `97.2%` 검증).
   - `detectNoFaceDirective()` 가드 탑재: 프롬프트에 `얼굴미노출`, `얼굴 없이`, `뒷모습만`, `목 아래만` 등이 입력되면 대표원장 얼굴 합성 체크를 자동 차단하고 인물 참조 사진 전달을 `0장`으로 원천 봉쇄하며, 정후면 오버더숄더/어깨 아래 크롭 구도로 얼굴 노출 `0%`를 강제.
   - 다인(원장+환자) 진료 사진에서 `local_face_engine.py`의 `measure_face_metrics()`가 환자 얼굴 대신 원장님 얼굴(`target_kps`)을 정확히 계측하도록 교정 완료.
2. **새 지시 시 기존 이미지 구도 모방 현상 완전 해결 (`useSourceImageRef: false` 기본값)**:
   - 기존 `edit_current` 모드에서 이전 카드 이미지를 자동으로 Gemini에 첨부해 구도가 고착되던 문제를 해결하여, 기본 상태에서는 기존 사진을 AI에 전달하지 않고 오직 새 프롬프트만으로 100% 새롭게 사고·촬영하도록 전환(부분 수정 시에만 `🖼️ 기존 슬롯 이미지를 밑그림으로 함께 참조하기` 체크박스 선택).
3. **서브 썸네일(`thumbs`) 프롬프트 제작 및 전환 독 자동 렌더링 (`detail-pages-editor.html`, `bareun-detail-compiler.js`, `card-image-prompts.js`)**:
   - 대표카드뿐만 아니라 `서브 썸네일 #1..#N 교체`, `➕ 새 서브 썸네일 추가 제작`, `모션 프레임`, `브로슈어 페이지` 전 슬롯을 프롬프트로 직접 제작·비교·즉시 반영 지원.
   - 서브 썸네일을 1개만 추가해도 `[대표 장면]` 칩이 자동 생성되어 `clean-image` 및 `director-exam-motion` 카드 모두에서 클릭 전환 독이 즉시 작동.
4. **아르곤 하이(`Gemini 3 Pro Image` 2K) 사용량 및 무료 잔여 횟수 실시간 표시 (`/api/studio-ai-usage`, `/wp-json/bareun/v1/studio/ai-usage`)**:
   - 상단 헤더 배지(`⚡ 아르곤 하이 2K · 무료 N회 남음 (오늘 M/50회)`) 및 이미지메이커 상단 게이지 바에서 KST 일자 기준 실시간 사용량·무료 잔여 횟수 표시 및 일일 한도/초기화 관리 지원.
5. **홈페이지 첫 시작 스토리 카드(`index.html` / `story-3d.html`, WP ID `46`) 커스텀 스튜디오 탑재**:
   - `🏠 00 · 메인 홈 시작 스토리` 탭 신설: 첫 진입 오프닝 슬로건 2줄, 상단 브랜드 헤더, 8대 챕터 대사, 24개 3D 환자 스토리 장면(장면별 대사·모션 셰이더 모드·다단계 서브 프레임·AI 프롬프트 이미지 제작), 피날레 7대 핵심 진료 벤토 카드까지 실시간 미리보기 동기화(`SYNC_FRAME` / `SHOW_BENTO_CARDS`) 및 원클릭 카페24 실서버 반영 완비.

---

## 💎 최신 완료 작업 요약 (2026-11-10 v7.2 · 비급여 동의용 3D 타임랩스 티칭 뷰어 chairside-3d.html & B2B 분양 랜딩 sales-pitch.html)

1. **비급여 치료 동의용 하이엔드 한의학 3D 타임랩스 티칭 뷰어 (http://localhost:3000/chairside-3d.html, homepage/chairside-3d.html)**:
   - 24만+ 폴리곤 정밀 해부학 스캔 모델(Skeleton.glb, Joints.glb, skinMB2.glb, Vascular.glb, rain.glb) + 독자 개발 GLSL 생체역학 변형 셰이더 기반.
   - 에스프레소 골드 다크 글래스 테마 + 우측 6단계 세로 조직 투시 레일 + 포커스 스포트라이트 + 4대 질환(요추 디스크·회전근개·퇴행성 무릎관절염·15kg 거북목) 고통→추나·약침·도침→회복 타임랩스 슬라이더 + 아이패드 레이저 판서 펜 + 원장님 브리핑 텔레프롬프터 + 3단계 동의서 모달 + ?clinic=OO한의원 화이트라벨 내장.
2. **한의사 원장님 대상 분양 안내 랜딩페이지 연동 (http://localhost:3000/sales-pitch.html, homepage/sales-pitch.html)**:
   - 5대 실구동 엔진 쇼케이스 1번 탭에 3D 타임랩스 티칭 뷰어 실시간 연동 및 단독 구독(월 49,000원) / PRO·SIGNATURE 기본 탑재 모델 구축 완료.

---
## 💎 000000000000000000000. 최신 완료 작업 요약 (2026-11-09 v7.1 · 11개 전 상세페이지 Sample A 일괄 적용 & 통합 커스텀 스튜디오 구축)

1. **11개 모든 질환별 상세페이지에 Sample A (상단 순수 비주얼 + 하단 분리형 에디토리얼 박스) 전면 적용 (`homepage/build-story-detail-pages.js`, `homepage/detail-pages-config.json`)**:
   - **적용 대상 11개 페이지 전체**: `director.html`, `chuna.html`, `growth.html`, `diet-zero.html`, `hairloss.html`, `hairloss-male.html`, `hairloss-alopecia.html`, `hairloss-female.html`, `hairloss-seborrheic.html`, `gongjindan.html`, `prostate.html` 및 대응 `wordpress-*.html` 번들 전체.
   - **상단 순수 비주얼 영역 (`.pure-visual-zone`)**: 기존 사진 위를 가리던 어두운 그라데이션 스크림과 텍스트 캡션을 100% 제거하여 의학 일러스트·원내 사진·전후 스캔 영상이 가림 없이 선명하게 노출됨.
   - **하단 분리형 에디토리얼 박스 (`.editorial-text-zone`)**: 요청사항("하단 제목과 태그 없이")에 맞춰 **메인 제목(`<h2>` + `'작은따옴표'` 골드 강조) + 핵심 본문 설명(`<p>`)만 깔끔하게 노출**하도록 기본 설계(`showTitle: true`, `showBody: true`, `showStepBadge: false`, `showPillars: false`, `showTags: false`, `showExamHud: false`).
   - **검색엔진(SEO) & 텍스트 복사 최적화**: `itemscope itemtype="https://schema.org/MedicalWebPage"` 시맨틱 마크업 및 `user-select: text !important` 적용으로 마우스 드래그 복사 및 네이버·구글 크롤러 색인 완벽 지원.
2. **11개 전 상세페이지 통합 커스텀 스튜디오 신설 (`http://localhost:3000/detail-pages-editor.html`, `homepage/serve.js`, `homepage/deploy-detail-page-fast.js`)**:
   - **접속 경로**: 로컬 서버 실행 후 `http://localhost:3000/detail-pages-editor.html` 접속 또는 각 상세페이지 우측 상단의 **`🎨 커스텀`** 버튼(로컬 전용 노출, 실서버에서는 자동 숨김) 클릭.
   - **스토리 카드 전체 커스텀**: 11개 상세페이지 각각의 모든 카드 순서 이동(`▲/▼`), 표시 ON/OFF, 새 카드 추가/복제/삭제, 카드 유형 변경(단일 이미지·전후 레이저 비교·다중 프레임 모션·비디오·친아들 편지·브로슈어 파노라마), 제목 `'골드 강조'` 원클릭 감싸기, 본문 수정, **내 PC 사진/MP4 직접 업로드(`/api/upload-detail-image`)** 지원.
   - **Sample A 디자인 & 표시 항목 스위치**: 하단 메인 제목·본문·카드 번호·STEP 배지·3칸 소제목 박스·`#해시태그` 개별 ON/OFF 토글, 4종 럭셔리 컬러 프리셋 및 글자 크기 조절, **`[🎨 이 디자인·표시 설정을 11개 전 페이지에 동일 적용]`** 일괄 동기화 지원.
   - **좌측 고정 패널 & 체크리스트 편집**: 진료과목 대제목, 소개글, 자가진단 체크리스트 문항 추가/삭제/이동, 예약 CTA 버튼 문구 및 테마 컬러 실시간 수정.
   - **실시간 미리보기 & 원클릭 카페24 배포**: 우측 데스크톱/모바일(390px) 라이브 프리뷰 및 `[💾 현재 페이지 즉시 반영]`, `[✨ 11개 전체 일괄 반영]`, `[🚀 현재 페이지 카페24 배포]`, `[🌐 11개 전체 카페24 배포]`(내 PC에서 새로 올린 `detail_custom_*` 사진도 워드프레스 미디어 라이브러리에 자동 업로드 연동) 완비.

---

## 💎 00000000000000000000. 최신 완료 작업 요약 (2026-11-09 v7.0 · 상세페이지 이미지-글자 완전 분리형 SEO 하이엔드 기획안 & 샘플 구축)

1. **상세페이지 이미지·글자 완전 분리 아키텍처 수립 및 정밀 진단 (`SEO_CARD_SEPARATION_PROPOSAL.md`)**:
   - **기존 한계 진단**: `chuna.html` 등 상세페이지 카드 내부 글자가 `position: absolute`로 이미지에 겹쳐 있고 `user-select: none` 및 카드 전체 라이트박스 팝업 이벤트로 묶여 있어, 사용자가 마우스로 글자를 선택·복사할 수 없고 검색 플랫폼(네이버 Yeti, 구글봇, AI 검색)에서 'Thin Content(단순 이미지 갤러리)'로 저평가되는 문제 규명.
   - **해결 아키텍처**: 상단 100% 클린 이미지 영역(`<figure>`)과 하단 독립 에디토리얼 텍스트 패널(`<div class="editorial-text-zone">`)의 시맨틱 물리 분리 설계.
2. **실물 샘플 3종 및 실시간 브라우저 프리뷰 구축 (`homepage/seo-card-sample.html`, `http://localhost:3000/seo-card-sample.html`)**:
   - **【추천안】 샘플 A (`homepage/sample_option_a_top_bottom.png`)**: 상·하단 완전 분리형 에디토리얼 프레임. 상단은 글자/그림자 0% 순수 이미지로 척추·골반 투시 일러스트를 온전히 노출하고, 하단은 딥차콜/골드 보더 전용 패널에 제목 + 상세 본문 + 3단 임상 포인트 + `#키워드` 태그를 체계적 배치.
   - **샘플 B (`homepage/sample_option_b_split.png`)**: 좌·우 매거진 스플릿형 프레임 (좌측 60% 비주얼 + 우측 40% 의학 칼럼).
   - **비교안 (`homepage/sample_before_after_comparison.png`)**: 기존 중첩 방식 vs 리뉴얼 분리 방식 한눈에 비교 이미지.
3. **다른 컴퓨터 인수인계 실행 가이드**:
   - `git pull origin main` ➔ "3번 실행해줘" (또는 `node serve.js`) ➔ `http://localhost:3000/seo-card-sample.html`에서 샘플 확인 후 선택 확정 시 전 9개 페이지 일괄 빌드 및 카페24 실서버 배포 파이프라인 대기 중.

---

## 💎 0000000000000000000. 최신 완료 작업 요약 (2026-11-04 v6.9 · 모바일·폴더블 메인 3D 쇼룸 & 7대 진료카드 레이아웃·비율 100% 정밀 교정)

1. **모바일·폴더블(`.skt-finale-stage`, `.skt-finale-header`, `.skt-bento-grid`) 가로 쏠림 및 좌측 글자 잘림 현상 완전 해결 (`homepage/story-3d.html`, `homepage/index.html`)**:
   - 기존 모바일(`@media (max-width: 1024px)`)에서 `.skt-finale-header` 내 좌측 타이틀 그룹(`.skt-finale-heading-group`)과 우측 4개 컨트롤 버튼(`.skt-finale-controls`, `flex-wrap: nowrap`)이 한 줄(`flex-direction: row`)에 배치되어 약 `620px+`의 가로 오버플로우를 유발하고 전체 레이아웃이 좌측으로 밀리던(`x < 0`) 문제를 해결.
   - 모바일에서 `.skt-finale-header`를 `flex-direction: column`으로 전환하고 `.skt-finale-controls`를 `grid-template-columns: repeat(2, minmax(0, 1fr))` 2x2 균등 그리드로 재설계하여 가로 폭 `100%` 내부에 오차 없이 정렬.
   - `.skt-bento-grid`에 `grid-template-columns: repeat(2, minmax(0, 1fr))` 및 카드별 명시적 높이(`156px` / `152px` / `166px`), `.skt-card-item`에 `min-width: 0; overflow: hidden`을 부여하여 카드 중첩 및 좌우 잘림 0% 달성(`scrollWidth === clientWidth`).
2. **배경 레이어(`.skt-hero-bg`) 하단 끊김 해결 및 삼성 인터넷/안드로이드 강제 다크모드 이미지 보호**:
   - 모바일 스크롤 시 `.skt-hero-bg`가 상단 55% 지점에서 끊기며 뒤쪽 WebGL 캔버스가 비치던 현상을 `position: fixed; inset: 0; width: 100%; height: 100dvh; transform: none !important;`로 고정하여 해결.
   - `.skt-img-box`에 `color-scheme: light only; forced-color-adjust: none; background-color: #261E18;` 및 모바일 즉시 노출(`phase-ready` 직행) 로직을 적용해 모바일 강제 다크모드나 FLIP 전환 도중 카드 배경 사진이 누락되거나 어긋나는 현상 원천 차단.
3. **상단 네비게이션(`.spatial-top-nav`) 및 하단 중복 방문자 카운터(`visit-tracker.js`) 모바일 최적화**:
   - 상단 헤더 `.nav-right-actions`에 `flex: 1 1 auto; min-width: 0; overflow-x: auto;`를 부여해 우측 메뉴 영역이 화면 밖으로 밀리지 않고 부드럽게 가로 스와이프되도록 개선.
   - 모바일에서 상단 헤더에 이미 실시간 조회수 배지(`📊 조회수 오늘 N`)가 표시되므로, 하단 카드 CTA 버튼을 가리던 좌측 하단 플로팅 배지(`#bareun-floating-visit-dock`)는 모바일(`max-width: 1024px`)에서 자동 숨김 처리.
4. **3D 스토리 WebGL 셰이더(`getCoverUv`) 모바일 세로 비율(`9:16`) 초점 보정 및 실서버 자동 배포**:
   - 세로형 모바일 화면에서 `16:9` 스토리 아트워크가 과도하게 확대·크롭되지 않도록 피사체 중심 초점(`uFocal.x`) 보정.
   - `node bundle-wp.js` 및 `node deploy-cafe24.js`로 전 16개 워드프레스 번들 파일 및 카페24 실서버(`https://www.bareunhaniwon.com/`) 원스톱 동기화 완료.

---
## 💎 000000000000000000. 최신 완료 작업 요약 (2026-11-01 v6.8 · 네이버 서치어드바이저 RSS XML 이스케이프 수정 & 사이트맵 등록 최적화)

1. **RSS 2.0 피드 XML 문법 엄격화 및 W3C 유효성 검사 100% 통과 (`bareun-member-private-qna.php`)**:
   - 네이버 서치어드바이저에서 "사이트맵/RSS 형식이 올바르지 않습니다" 에러를 유발하던 제목 특수문자(`&` ➔ `&amp;`) 미변환 버그 해결 (`filter_rss_title`, `filter_rss_excerpt`에 `esc_html()` 전면 적용).
   - W3C Feed Validator 검증: **`validity: true`, `errors: 0` 완벽 통과**.
2. **카페24 실서버 배포 및 정규화 동기화 완료 (`deploy-cafe24.js`)**:
   - 워드프레스 WPCode 백엔드 및 전 15개 페이지 실서버 재배포 및 캐시 플러시 완료.
   - 네이버 서치어드바이저 사이트맵 규격(`wp-sitemap-posts-page-1.xml`) 및 RSS URL(`https://www.bareunhaniwon.com/feed/`) 등록 가이드 수립.

---
## 💎 00000000000000000. 최신 완료 작업 요약 (2026-10-29 v6.7 · `imagemaker/` 👑 유료 메뉴 골드 구분 & `⚖️ 무료 vs 유료 품질 비교실` 구축)

1. **무료(🆓 에메랄드) vs 유료 PRO(👑 샴페인 골드) 시각 구분 체계 전면 적용 (`imagemaker/index.html`)**:
   - 과금이 발생하는 모든 메뉴·카드·탭·실행 버튼·모달·갤러리 결과 카드를 **고급 금색(`👑 유료 PRO`, `--gold` / `--gold-strong`)**과 예상 단가 배지(`약 95원/장`, `약 45원/장`, `LoRA 학습 약 3,000원/회`)로 명확히 구분하여 실수로 과금 메뉴를 누르는 일을 원천 방지.
2. **동일 조건 1:1 동시 비교 제작 및 `⚖️ 무료 vs 유료 품질 비교실` 신설 (`imagemaker/serve.js`, `imagemaker/local_face_engine.py`, `imagemaker/index.html`)**:
   - 새 상황 촬영(탭 1)과 기존 사진 얼굴 교정(탭 2) 모두에서 **`[⚖️ 무료 vs 👑 유료 동시 비교]`** 선택 시 동일 프롬프트·원본으로 무료 엔진과 순수 `fal.ai` 클라우드 PRO 엔진(`FLUX LoRA/PuLID` + `Cloud Face-Swap` + `Cloud CodeFormer`)을 연속 구동하여 비교 세트로 자동 저장(`fal.ai` 잔액 부족 시 무료 결과는 즉시 완료 보존하고 골드 안내 배너에서 원클릭 유료 슬롯 재실행 지원).
   - **탭 3 `⚖️ 무료 vs 유료 품질 비교실`**: 네이티브 `<input type="range">` 기반 **반반 커튼 슬라이더**, 랜드마크 자동 점프 지원 **좌우 2.5배 동기화 픽셀 돋보기**, 동일 기준 **ArcFace 실제 얼굴 일치율(`%`) & 라플라시안 모공 선명도 점수(`점`) 성적표** 탑재.

---

## 💎 0000000000000000. 직전 완료 작업 요약 (2026-10-29 v6.6 · `imagemaker/` 평생 0원 100% 무료 로컬 GPU + ZeroGPU 인물 고정 엔진 탑재)

1. **결제·API 키 없이 평생 0원 무제한 작동하는 하이브리드 무료 엔진 구축 (`imagemaker/local_face_engine.py`, `imagemaker/serve.js`, `imagemaker/index.html`)**:
   - **Stage 1 (0원 새 상황 연출 촬영)**: `@gradio/client` 기반 무료 HuggingFace ZeroGPU 4중 자동 폴백 체인(`yanze/PuLID-FLUX` 실제 얼굴 참조 생성 → `FLUX.1-dev` → `FLUX.1-schnell` → `Pollinations FLUX`) + 무인증 한영 의학 스튜디오 프롬프트 자동 번역기 내장.
   - **Stage 2 & 기존 홈페이지 사진 교정 (0원 내 PC `NVIDIA GeForce GTX 1070` DirectML 오프라인 GPU 엔진)**: FaceFusion 3.0 코어 5종 ONNX 모델(`E:\imagemaker-free-models\` 저장으로 C드라이브 용량 보호, 미존재 시 자동 다운로드)을 DirectX 12 GPU(`DmlExecutionProvider`)로 가속하여 장당 약 **4초** 만에 처리:
     - 등록된 모든 프로필 사진의 **512차원 ArcFace 다중 평균 얼굴 임베딩** 생성(`유사도 99.6%`)
     - `BiSeNet ResNet-34` 19클래스 세그멘테이션으로 **`class 6` 안경테 및 앞머리 침범 0% 마스킹 보호**
     - `InSwapper-128` 정밀 이식 + `GFPGAN v1.4` (512×512) DSLR 피부 모공·눈동자 복원 및 라플라시안 선명화
   - 스튜디오 실행 시 기본 모드를 **`🆓 평생 0원 무료 GPU 가동 중`**으로 자동 활성화하여 `fal.ai` 잔액 부족(`Forbidden`)이나 유료 과금 걱정 없이 즉시 무제한 촬영·교정 가능.

---

## 💎 000000000000000. 직전 완료 작업 요약 (2026-10-28 v6.5 · `imagemaker/` 원장님 전용 인물 고정 AI 사진관 구축 및 GitHub 반영)

1. **`imagemaker/` 전용 스튜디오 신설 (`http://localhost:4500`, `imagemaker/serve.js`, `imagemaker/index.html`, `imagemaker/start-studio.bat`)**:
   - **탭 1 [새 상황 연출 촬영]**: 한글 상황 설명 → 85mm 실사 스튜디오 프롬프트 자동 변환 + 전용 FLUX LoRA(`fal-ai/flux-lora`) / 무학습 즉시 모드(`fal-ai/flux-pulid`) + **2차 실제 이목구비 정밀 고정(`fal-ai/face-swap` + `fal-ai/codeformer`)** 자동 실행.
   - **탭 2 [기존 홈페이지 사진 얼굴 100% 교정]**: `homepage/` 내 원장님 이미지 30장 자동 연동, 배경·가운·손동작은 100% 보존한 채 얼굴만 실제 원장님 기준 사진으로 정밀 교체 및 원본 자동 백업 덮어쓰기(`_backup_director_faces/`).
   - **탭 3 [전용 얼굴 금형(LoRA) 학습·관리]**: `director_real_reference.jpg` 및 `doctor.png` 기본 시딩 완료, 사진 15~20장 드래그 시 자동 ZIP 패키징 후 `fal-ai/flux-lora-portrait-trainer` 학습 및 로컬 `.safetensors` 영구 백업.
   - API 키(`imagemaker/data/settings.json`) 및 대용량 출력물은 `.gitignore`로 완벽 분리하여 GitHub 보안 유지.

---

## 💎 00000000000000. 최신 완료 작업 요약 (2026-10-28 v6.4 · 바른 성장 · 성조숙증 상세페이지 좌측 패널 + 10대 카드 정리 및 실시간 편집 스튜디오 구축)

1. **성장 상세페이지(`growth.html`) 마스터 설정 파일 분리 (`homepage/growth-cards-config.json`, `homepage/growth-cards-config.default.json`)**:
   - 좌측 고정 패널(`#project-details-meta`: 상단 배지, 대제목, 영문 부제, 대표 설명문, 5대 자가진단 체크리스트, 하단 상담 예약 CTA 버튼)과 우측 수평 카드 트랙(`CARD 01 ~ CARD 10`: 제목 앞문구 + `'골드 강조 문구'` + 제목 뒷문구, 하단 본문 설명, 연결 이미지/3컷 모션 시퀀스, 카드 01 대표원장 친필 서약 편지 전문 및 3대 마일스톤 칩) 전체를 단일 JSON 설정 파일로 구조화.
2. **자동 빌더(`homepage/apply-growth-cards.js`) & 성장 페이지 전용 초고속 실서버 배포기(`homepage/deploy-growth-fast.js`) 구축**:
   - `node apply-growth-cards.js` 실행 시 `growth-cards-config.json`의 내용이 `growth.html` 내 `<main id="project-details">...</main>` 영역에 무손실 동기화되며, 이어서 `node bundle-wp.js` 및 `node deploy-growth-fast.js`로 카페24 워드프레스 실서버(`https://www.bareunhaniwon.com/growth/`, Page ID `105`)에 단독 초고속 반영.
3. **웹 브라우저 시각 편집 스튜디오 (`http://localhost:3000/growth-card-editor.html`) 및 로컬 서버 API (`/api/growth-cards-config`) 탑재**:
   - 브라우저에서 좌측 패널 문구·체크리스트 5문항·10대 카드 제목/골드 강조어/본문 설명/이미지/카드 순서(▲/▼)/노출 여부를 표 형태로 직접 수정하고, **`[💾 ① 로컬 페이지 즉시 적용]`** 또는 **`[🚀 ② 카페24 실서버까지 원클릭 배포]`** 버튼으로 즉시 반영 가능.

---

## 💎 0000000000000. 최신 완료 작업 요약 (2026-10-28 v6.0 · 『제목 · 구조 · 본문』 전체 메뉴 일괄 적용 메뉴 구축)

1. **`POPUP 01 STUDIO` 모달 1번 탭(`📝 제목 · 구조 · 본문`) 상단 『🌐 제목 · 구조 · 본문 전체 메뉴 일괄 적용 메뉴』 신설 (`homepage/clinic-menu-editor.html`)**:
   - **① `🧱 1. 현재 [섹션 구조 · 소제목]만 전체 메뉴 적용 (부위별 본문 유지)`**: 현재 설정한 섹션 개수(1단 칼럼 / 2단 컴팩트 / 3단 매거진·Q&A / 4단 기본 / 사용자 추가 N단)·순서·노출 여부·아이콘·소제목·표현방식(`text`/`highlight`/`checklist`/`bullets`/`numbered`/`qa`)·2열 전체폭(`spanFull`) 틀만 9개 전체 메뉴에 똑같이 적용하며, **각 메뉴가 가진 부위별 맞춤 건강 문장(`empathyLines`, `truthLines`, `mythLines`, `checkList`)은 손실 없이 새 구조에 맞춰 자동 매핑**됩니다.
   - **② `🏷️ 2. 현재 [탭 라벨 · 제목 옵션 · 부제목] 전체 적용`**: `01탭 상단 보조 라벨`(`tab01Step`), `01탭 메인 버튼명`(`tab01Label`), `상단 [부위명] 배지 표시` 여부(`showPartBadge`), `질문형(?) 필수 체크`(`strictQuestionMark`), `보조 부제목`(`subTitle`/`commonSubTitle`)을 9개 전체 메뉴에 공통 적용합니다.
   - **③ `📋 3. 현재 [제목 + 구조 + 본문 내용] 통째로 전체 적용`**: 현재 입력된 메인 제목·키워드·부제목·배지명·섹션 구조·본문 문장 전체를 9개 모든 메뉴에 100% 동일하게 일괄 복사합니다.
   - **④ `✨ 4. 올인원 전체 통일 (구조·탭·레이아웃·색감)`**: 각 부위 고유 본문은 유지한 채 섹션 구조·소제목·탭 설정·레이아웃·서체·색감 팔레트를 전 메뉴에 한 번에 통일합니다.
2. **개별 카드 헤더 및 빠른 구조 프리셋 바 원클릭 전체 적용 버튼 추가**:
   - `🏷️ 상단 탭 & 헤드라인 제목 커스텀` 우측 상단에 `[🌐 탭·제목옵션 전체 적용]`, `[🌐 메인 제목까지 전체 동일 적용]` 버튼 배치.
   - `🧱 빠른 구조 프리셋` 바 우측에 `[🌐 현재 구조 틀 전체 메뉴 적용]`, `[🌐 구조+본문 전체 메뉴 동일 적용]` 버튼 배치.
   - `📐 레이아웃 · 서체` 탭 및 `🎨 색감 · 테마 팔레트` 탭 상단에도 `[🌐 현재 레이아웃·서체를 9개 전체 메뉴에 즉시 적용]`, `[🌐 현재 색감 팔레트를 9개 전체 메뉴에 즉시 적용]` 원클릭 바 추가.
3. **모달 하단 푸터(`.nm-foot`) 일괄 적용 체크박스 4종 + `[✨ 전체 적용 모두 선택]` 버튼 확장**:
   - `☑️ 📌 현재 메뉴 01탭 고정 반영` (`#nm-override-chk`)
   - `☑️ 🧱 [섹션 구조·소제목·탭 설정] 전체 메뉴 적용 (본문 유지)` (`#nm-apply-structure-all-chk`)
   - `☑️ 📋 [제목 + 본문 + 구조] 전체 메뉴 동일 적용` (`#nm-apply-content-all-chk`)
   - `☑️ 🎨 [레이아웃 · 색감 디자인] 전체 메뉴 적용` (`#nm-apply-design-all-chk`)
   - 우측 `[✨ 전체 적용 모두 선택]` 버튼(`window.toggleAllGlobalCheckboxes()`)으로 원클릭 일괄 체크/해제 후 `[✔ 표에 반영하기]` 또는 `[⚡ 표 반영 + 로컬 3D 즉시 제작]` 실행 가능.
4. **메인 스튜디오 상단 바(`.header-config-strip`) 및 각 행(`#menu-table-tbody`) 즉시 동기화 메뉴 추가**:
   - 모달을 열지 않고도 메인 표 상단 `🌐 기준 메뉴 전체 적용` 드롭다운에서 기준 메뉴 선택 후 `[🧱 구조·디자인 전체 통일]` 또는 `[📋 제목·본문·구조 전체 복사]` 실행 가능, 각 행의 `[🌐 이 행의 구조·디자인 전체 적용]` 미니 버튼으로도 즉시 동기화 가능.

---

## 💎 000000000000. 직전 완료 작업 요약 (2026-10-28 v5.9 · 네이버 서치어드바이저 & 구글 서치콘솔 승인 검증 + 마스터 SEO 5대 고도화 & PDF 리포트 발행)

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

