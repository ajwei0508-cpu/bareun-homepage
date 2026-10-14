# 바른한의원 대전본점 (Bareun Korean Medicine Clinic)

바른한의원 대전본점 하이엔드 3D 시네마 홈페이지 공식 저장소입니다.

## 🚀 다른 컴퓨터에서 작업 이어서 시작하기 (`git pull` & 서버 실행)

```bash
git pull origin main
cd homepage
node serve.js
```

> **`node serve.js` 실행 시 아래 3개의 로컬 페이지가 동시에 구동됩니다:**
> - **수정 후 완성본 3D 시네마 (포트 3000)**: [http://localhost:3000/story-3d.html](http://localhost:3000/story-3d.html) (또는 `http://localhost:3000`)
> - **수정 전·후 1:1 비교 & 좌우 실시간 동시 비교 스튜디오 (포트 3000)**: [http://localhost:3000/compare.html](http://localhost:3000/compare.html)
> - **수정 전 비교용 3D 시네마 (포트 3001 자동 구동)**: [http://localhost:3001](http://localhost:3001)

---

## 📂 주요 파일 및 인수인계 문서

- **[`HANDOFF_LATEST.md`](./HANDOFF_LATEST.md)**: **가장 최근 진행한 3D 스크롤 시네마(8대 스토리 대사·22프레임 연속 실사·1인칭/3인칭 시점 혼합·GLSL 셰이더) 상세 내역 및 작업 이어하기 가이드**
- **[`AGENTS.md`](./AGENTS.md)**: AI 어시스턴트("아트") 실행 지침 및 프로젝트 컨텍스트
- **`homepage/story-3d.html`** & **`homepage/index.html`**: 22프레임 연속 실사 3D 스크롤 시네마 메인 파일
- **`homepage/compare.html`**: 수정 전·후 1:1 이미지 비교 및 3D 스크롤 좌·우 분할 동시 비교 스튜디오
- **`homepage/story-before.html`**: 포트 3001에서 구동되는 수정 전 비교 버전
- **`homepage/bundle-wp.js`**: 워드프레스 올인원 파일(`wordpress-main-home.html`, `wordpress-story-3d.html`) 자동 생성 스크립트
- **`homepage/sync-before.js`**: `story-3d.html` 수정 후 `index.html` 및 `story-before.html` 동기화 스크립트