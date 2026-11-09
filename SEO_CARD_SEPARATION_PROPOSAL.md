# 💎 [기획안] 바른한의원 상세페이지 이미지·글자 완전 분리형 SEO 하이엔드 아키텍처

> **작성일**: 2026-11-09  
> **디렉터**: 하이엔드 홈페이지 총괄 디렉터 **아트 (Art)**  
> **상태**: 기획안 및 실물 샘플 이미지 3종 완성 · 원장님 최종 컨펌 대기

---

## 1. 기획 배경 및 정밀 진단

### 문제점 진단 (왜 검색 플랫폼에서 제대로 수집되지 못하고 통이미지처럼 보였는가?)
1. **`user-select: none` 및 라이트박스 간섭**:
   - `chuna.html` 상단에 `user-select: none;`이 적용되어 마우스 드래그가 차단되었고, 카드 전체가 `[data-fullscreen]` 클릭으로 묶여 텍스트를 클릭해도 이미지 팝업이 떠버려 사용자와 환자에게 100% 통이미지처럼 체감됨.
2. **이미지 내부 `position: absolute` 종속 및 Thin Content 한계**:
   - 사진 위에 글자(`.clean-plate-caption`)를 얹어두다 보니, 피사체(척추·골반 일러스트)를 가리지 않기 위해 텍스트 분량을 단 2줄(약 70자)로 줄여놓음.
   - 네이버 서치어드바이저(Yeti), 구글봇, AI 검색엔진(ChatGPT/Perplexity/Gemini)은 페이지를 '전문 의학 아티클'이 아닌 '단순 이미지 갤러리'로 분류하여 상위 노출에 불리.
3. **모션/캔버스 카드의 텍스트 정보 누락**:
   - 03~05번(CSS/SVG 모션) 및 10번(3D 캔버스) 카드에 검색봇이 읽을 수 있는 체계적 임상 텍스트가 부족함.

---

## 2. 해결 방안: 이미지와 글자 완전 분리 아키텍처 (Visual + SEO Dual-Engine)

- **상단/좌측 순수 비주얼 영역 (`<figure>`)**: 이미지 위 글자와 검은 그림자 막을 100% 제거하여 골반·척추 그래픽을 원본 그대로 온전히 노출.
- **하단/우측 독립 에디토리얼 텍스트 영역 (`<div class="editorial-text-zone">`)**: 마우스 드래그·복사가 가능하며, `<h2>` 메인 카피, `<p>` 의학 본문, `3단 임상 포인트`, `#핵심키워드` 태그를 체계적으로 배치.

---

## 3. 제작 완료된 샘플 구성

| 구분 | 파일명 / URL | 설명 |
| :--- | :--- | :--- |
| **실시간 프리뷰** | `homepage/seo-card-sample.html`<br>(`http://localhost:3000/seo-card-sample.html`) | 브라우저에서 실제 마우스 드래그 및 반응형 확인 가능 |
| **【추천】 샘플 A** | `homepage/sample_option_a_top_bottom.png` | **상·하단 완전 분리형**: 상단 100% 클린 이미지 + 하단 독립 SEO 텍스트 보드 |
| **샘플 B** | `homepage/sample_option_b_split.png` | **좌·우 매거진 스플릿형**: 좌측 60% 비주얼 + 우측 40% 의학 칼럼 (데스크톱 최적화) |
| **Before / After** | `homepage/sample_before_after_comparison.png` | 기존 중첩 방식 vs 리뉴얼 분리 방식 한눈에 비교 |

---

## 4. 다른 컴퓨터에서 이어 작업하는 순서 (Handoff Guide)

다른 컴퓨터로 이동하신 후 아래 순서대로 실행하시면 바로 이어서 작업하실 수 있습니다.

### STEP 1. 최신 작업 내역 내려받기
```bash
git pull origin main
```

### STEP 2. 로컬 서버 실행 및 샘플 확인
- 대화창에 `"3번 실행해줘"` 입력 (또는 터미널에서 `cd homepage && node serve.js`)
- 브라우저에서 `http://localhost:3000/seo-card-sample.html` 열기
- 원장님께서 선호하시는 스타일(샘플 A 추천 또는 샘플 B) 확인

### STEP 3. 본 작업 진행 (선택 시 자동 일괄 변환)
원장님께서 선택을 확정해 주시면 다음 파이프라인으로 9개 진료과목 전 페이지에 일괄 적용됩니다:
1. `homepage/build-story-detail-pages.js` 내 카드 템플릿 구조를 선택된 분리형 레이아웃으로 변경
2. `node build-story-detail-pages.js` 실행 (추나, 다이어트, 성장, 교통사고 등 전 9개 페이지 HTML 자동 재생성)
3. `node bundle-wp.js` 실행 (워드프레스 독립형 `wordpress-*.html` 번들 동기화)
4. `node deploy-cafe24.js` 실행 (카페24 실서버 자동 업로드 및 캐시 갱신)
