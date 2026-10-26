# 바른한의원 대전본점 · 블로그 자동화 & 의학백과 Q&A 운영 마스터 플랜 (v4.0)

## 1. 시안성·직관성 극대화를 위한 2대 공간 완전 분리 아키텍처
기존에 한 화면에 혼재되어 있던 **생활 꿀팁 · 의학백과 · 건강칼럼**을 역할과 색채 정체성에 따라 **2개의 독립 허브 페이지**로 100% 분리하여 방문자의 인지 혼돈을 원천 해소했습니다.

| 구분 | ① 3D 부위별 생활 꿀팁 창고 | ② 무엇이든 물어보세요 (의학백과 블로그 & 원장 Q&A) |
| :--- | :--- | :--- |
| **로컬 파일** | `body-explorer.html` (`build-body-explorer.js`) | `ask-doctor.html` (`build-ask-doctor.js`) |
| **워드프레스 번들** | `wordpress-body-explorer.html` | `wordpress-ask-doctor.html` |
| **실서버 고유 주소** | `https://www.bareunhaniwon.com/body-explorer/` | `https://www.bareunhaniwon.com/ask-doctor/` |
| **시각 정체성** | 웜 한지 아이보리(`#FAF7F0`) + 앰버 골드(`#D97706`) & 그린 | 로얄 슬레이트 네이비(`#0F172A`) + 15:1 고대비 순백(`#FFFFFF`) |
| **핵심 구성** | 좌측 3D 인체모형 + 우측 **DO/DON'T · 하루 루틴 · 식단 & 지압** | **공식 의학백과(9편) + 심층 임상칼럼(27+편) + 블로그 답글 Q&A** |

---

## 2. 의학백과 자체의 정식 블로그 발행 (총 36편 고유 퍼머링크)
- 기존 JS 배열에만 머물던 **9대 부위 의학백과**를 **9편의 『공식 의학백과 마스터 블로그 포스트』**로 전환하고, **27편의 심층 임상칼럼**과 합쳐 총 **36편 전수**를 워드프레스 개별 고유 영문 퍼머링크(`https://www.bareunhaniwon.com/<seo-slug>/`)로 정식 발행합니다.
- 매일 발행되는 신규 칼럼(`google-apps-script-daily-blog.gs` v4.0) 역시 동일하게 워드프레스 개별 URL 포스트로 자동 누적되며 `/ask-doctor/` 허브와 실시간 동기화됩니다.

### 9대 질환 공식 의학백과 마스터 슬러그
1. **소아성장·비만·면역**: `/daejeon-pediatric-growth-plate-obesity-immunity-encyclopedia/`
2. **두피열·탈모·경추**: `/daejeon-cervical-spine-scalp-heat-hairloss-encyclopedia/`
3. **척추·골반·추나**: `/daejeon-lumbar-disc-pelvic-chuna-spine-encyclopedia/`
4. **만성피로·황제공진단**: `/daejeon-emperor-gongjindan-chronic-fatigue-brain-encyclopedia/`
5. **자율신경·두통·실신**: `/daejeon-autonomic-nerve-headache-vertigo-syncope-encyclopedia/`
6. **소화·위장·담적해독**: `/daejeon-damjeok-indigestion-reflux-ibs-digestive-encyclopedia/`
7. **대사·복부비만다이어트**: `/daejeon-metabolic-detox-visceral-fat-diet-zero-encyclopedia/`
8. **여성·생리통·난임**: `/daejeon-uterine-fertility-ivf-menstrual-postpartum-encyclopedia/`
9. **전립선·요실금·활력**: `/daejeon-prostate-urinary-incontinence-male-vitality-encyclopedia/`

---

## 3. 발행된 블로그 답글(댓글) 기반 실시간 환자 Q&A 문답 시스템
- **무로그인 즉시 질문 등록**: 모든 발행 포스트의 `comment_status: 'open'` 활성화 및 워드프레스 토론 설정 완화를 통해, 방문자가 회원가입/로그인 없이 `/ask-doctor/` 리더 하단 또는 개별 블로그 고유 주소(`/<slug>/#respond`)에서 즉시 답글로 질문을 등록할 수 있습니다.
- **원장 공식 답변 배지**: 안정위 대표원장 계정으로 답글을 작성하면 `👨‍⚕️ 안정위 대표원장 · 바른한의원 대전본점 · 공식 답변` 에메랄드 배지 카드로 자동 강조됩니다.

---

## 4. 국내(네이버·다음) 및 해외·글로벌 AI 검색엔진 동시 최적화 (AI-SEO / GEO)
1. **🤖 AI 핵심 3줄 즉답 요약 (TL;DR)**: ChatGPT Search, Perplexity, Google AI Overviews, 네이버 Cue가 최상단 인용문으로 즉시 발췌하도록 전 포스트 상단에 배치.
2. **🌐 Global Clinical Summary (영문 의학 초록)**: 해외 거주 교민·외국인 및 글로벌 영문 검색엔진(Google/Bing Global) 노출을 위해 모든 글에 영문 제목(`enTitle`)과 영문 임상 초록(`enSummary`) 내장.
3. **📊 시맨틱 임상 비교표 (`<table>`) & ❓ 다빈도 질문 Q&A**: 검색엔진 리치 스니펫(Featured Snippet) 채택률 극대화.
4. **구조화 데이터 JSON-LD 4종 (`inLanguage: ["ko-KR", "en-US"]`)**: `MedicalWebPage` + `MedicalClinic` + `Physician` + `FAQPage` + `BreadcrumbList` 탑재 (`bundle-wp.js`에서 JSON-LD 스크립트 원형 100% 보존).
5. **크롤러 디렉토리 & `llms.txt` & IndexNow 자동 핑**: `wp-sitemap.xml` 등록과 함께 발행 즉시 IndexNow API를 호출하여 색인 속도를 단축합니다.
