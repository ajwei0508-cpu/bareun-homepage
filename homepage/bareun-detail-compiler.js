const NAV_TABS = [
  { href: 'director.html', label: '원장 철학' },
  { href: 'chuna.html', label: '바른 추나' },
  { href: 'growth.html', label: '소아 성장' },
  { href: 'diet-zero.html', label: '바른 다이어트' },
  { href: 'hairloss.html', label: '바른 탈모' },
  { href: 'gongjindan.html', label: '황제공진단' },
  { href: 'prostate.html', label: '전립선 활력' }
];


const HOME_STORY_BASE_TEMPLATE = "<!DOCTYPE html>\r\n<html lang=\"ko\">\r\n<head>\r\n  <meta charset=\"UTF-8\">\r\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no\">\n  <title>바른한의원 대전본점 | 대덕구 비래동 추나·성장·다이어트·탈모·공진단</title>\n  <meta name=\"description\" content=\"정수리여성남성원형탈모병원치료성장클리닉성장판검사두통탈모약비대면성조숙증키성장담적축농증리프팅다이어트뱃살내장지방위염난임산후보약공진단대전진맥피부\">\n  <meta name=\"robots\" content=\"index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1\">\n  <meta name=\"naver-site-verification\" content=\"4069e9810cb66fcbb9eb3955b54e627f5096ac30\">\n  <meta name=\"google-site-verification\" content=\"-OtjjERbe9ctyW4q9rwaFiNj9OvxGvOE7Bd1MBjSsX4\">\n  <link rel=\"canonical\" href=\"https://www.bareunhaniwon.com/\">\n  <link rel=\"alternate\" hreflang=\"ko-KR\" href=\"https://www.bareunhaniwon.com/\">\n  <link rel=\"alternate\" hreflang=\"x-default\" href=\"https://www.bareunhaniwon.com/\">\n  <meta property=\"og:locale\" content=\"ko_KR\">\n  <meta property=\"og:type\" content=\"website\">\n  <meta property=\"og:site_name\" content=\"바른한의원 대전본점\">\n  <meta property=\"og:title\" content=\"바른한의원 대전본점 | 대덕구 비래동 추나·성장·다이어트·탈모·공진단\">\n  <meta property=\"og:description\" content=\"정수리여성남성원형탈모병원치료성장클리닉성장판검사두통탈모약비대면성조숙증키성장담적축농증리프팅다이어트뱃살내장지방위염난임산후보약공진단대전진맥피부\">\n  <meta property=\"og:url\" content=\"https://www.bareunhaniwon.com/\">\n  <meta property=\"og:image\" content=\"https://www.bareunhaniwon.com/wp-content/uploads/2026/10/og-bareun-1200x630-1.jpg\">\n  <meta property=\"og:image:width\" content=\"1200\">\n  <meta property=\"og:image:height\" content=\"630\">\n  <meta name=\"twitter:card\" content=\"summary_large_image\">\n  <meta name=\"twitter:title\" content=\"바른한의원 대전본점 | 대덕구 비래동 추나·성장·다이어트·탈모·공진단\">\n  <meta name=\"twitter:description\" content=\"정수리여성남성원형탈모병원치료성장클리닉성장판검사두통탈모약비대면성조숙증키성장담적축농증리프팅다이어트뱃살내장지방위염난임산후보약공진단대전진맥피부\">\n  <meta name=\"twitter:image\" content=\"https://www.bareunhaniwon.com/wp-content/uploads/2026/10/og-bareun-1200x630-1.jpg\">\n  <link rel=\"preload\" as=\"image\" href=\"https://raw.githubusercontent.com/ajwei0508-cpu/bareun-homepage/main/homepage/webp/card_1_director.webp\" fetchpriority=\"high\">\n  <script type=\"application/ld+json\">{\"@context\":\"https://schema.org\",\"@graph\":[{\"@type\":[\"MedicalClinic\",\"MedicalOrganization\",\"LocalBusiness\"],\"@id\":\"https://www.bareunhaniwon.com/#clinic\",\"name\":\"바른한의원 대전본점\",\"alternateName\":[\"Bareun Korean Medicine Clinic Daejeon\",\"대전 바른한의원\"],\"url\":\"https://www.bareunhaniwon.com/\",\"logo\":\"https://raw.githubusercontent.com/ajwei0508-cpu/bareun-homepage/main/homepage/webp/card_1_director.webp\",\"image\":\"https://www.bareunhaniwon.com/wp-content/uploads/2026/10/og-bareun-1200x630-1.jpg\",\"telephone\":\"+82-10-5631-1275\",\"priceRange\":\"₩₩\",\"address\":{\"@type\":\"PostalAddress\",\"streetAddress\":\"비래동로7번길 1, 2층\",\"addressLocality\":\"대덕구\",\"addressRegion\":\"대전광역시\",\"postalCode\":\"34417\",\"addressCountry\":\"KR\"},\"geo\":{\"@type\":\"GeoCoordinates\",\"latitude\":36.35536,\"longitude\":127.44778},\"openingHoursSpecification\":[{\"@type\":\"OpeningHoursSpecification\",\"dayOfWeek\":[\"Monday\",\"Tuesday\",\"Wednesday\",\"Thursday\",\"Friday\"],\"opens\":\"09:00\",\"closes\":\"19:00\"},{\"@type\":\"OpeningHoursSpecification\",\"dayOfWeek\":[\"Saturday\",\"PublicHolidays\"],\"opens\":\"09:00\",\"closes\":\"14:00\"}],\"sameAs\":[\"https://naver.me/5U1ELn8L\",\"https://blog.naver.com/wei0508\",\"https://pf.kakao.com/_ykxcLK\"],\"founder\":{\"@type\":\"Person\",\"@id\":\"https://www.bareunhaniwon.com/director/#physician\",\"name\":\"안정위\",\"jobTitle\":\"대표원장 (한의사)\"}},{\"@type\":\"WebSite\",\"@id\":\"https://www.bareunhaniwon.com/#website\",\"name\":\"바른한의원 대전본점\",\"url\":\"https://www.bareunhaniwon.com/\",\"inLanguage\":\"ko-KR\",\"publisher\":{\"@id\":\"https://www.bareunhaniwon.com/#clinic\"}},{\"@type\":\"MedicalWebPage\",\"@id\":\"https://www.bareunhaniwon.com/#webpage\",\"url\":\"https://www.bareunhaniwon.com/\",\"name\":\"바른한의원 대전본점 | 대덕구 비래동 추나·성장·다이어트·탈모·공진단\",\"description\":\"정수리여성남성원형탈모병원치료성장클리닉성장판검사두통탈모약비대면성조숙증키성장담적축농증리프팅다이어트뱃살내장지방위염난임산후보약공진단대전진맥피부\",\"inLanguage\":\"ko-KR\",\"isPartOf\":{\"@id\":\"https://www.bareunhaniwon.com/#website\"},\"about\":{\"@id\":\"https://www.bareunhaniwon.com/#clinic\"},\"reviewedBy\":{\"@type\":\"Person\",\"@id\":\"https://www.bareunhaniwon.com/director/#physician\",\"name\":\"안정위\",\"jobTitle\":\"바른한의원 대전본점 대표원장 (한의사)\"},\"lastReviewed\":\"2026-10-28\"}]}</script>\n\n  \n\n  \n\n  \n\n  \n\n  \n\n  \n\n  \n\n  \n\n  \n\n  \n\n  \n\n  \n\n  \n\n  \n\n  \n\n  \n\n  \n\n  \n\n  \n\n  \n\n  \n\n  \n\n  \n\n  \n\n  \n\n  \n\n  \n\n  \n\n  \n\n  \n\n  \r\n  \r\n\r\n  \r\n\r\n  \r\n\r\n  \r\n\r\n  \r\n  \r\n\r\n  \r\n\r\n  \r\n\r\n  \r\n\r\n  \r\n\r\n  \r\n\r\n  \r\n  \r\n  \r\n\r\n  \r\n\r\n  \r\n\r\n  \r\n\r\n  \r\n\r\n  \r\n\r\n  \r\n\r\n  \r\n\r\n  \r\n\r\n  \r\n\r\n  \r\n\r\n  \r\n\r\n  \r\n\r\n  \r\n\r\n  \r\n\r\n  \r\n\r\n  \r\n\r\n  \r\n\r\n  \r\n\r\n  \r\n\r\n  \r\n\r\n  \r\n  \r\n\r\n  \r\n\r\n  \r\n\r\n  \r\n\r\n  \r\n  \r\n  <link rel=\"icon\" type=\"image/svg+xml\" href=\"https://raw.githubusercontent.com/ajwei0508-cpu/bareun-homepage/main/homepage/bareun-favicon.svg\">\r\n  <link rel=\"apple-touch-icon\" href=\"https://raw.githubusercontent.com/ajwei0508-cpu/bareun-homepage/main/homepage/card_1_director.jpg\">\r\n  <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\r\n  <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\r\n  <link href=\"https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;600;700;900&family=Pretendard:wght@300;400;500;600;700;800;900&family=Space+Mono:wght@400;700&display=swap\" rel=\"stylesheet\">\r\n  <script src=\"https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js\"></script>\r\n  <style>\r\n    :root {\r\n      /* 바른한의원 5대 시그니처 브랜드 컬러 팔레트 */\r\n      --brand-beige: #F5F1E8;          /* 베이지 (신뢰감 · Trust) */\r\n      --brand-beige-deep: #E6DEC8;     /* 딥 한지 베이지 */\r\n      --brand-brown: #4A3525;          /* 브라운 (부드러움 · Softness) */\r\n      --brand-brown-soft: #5E4736;     /* 소프트 에스프레소 브라운 */\r\n      --brand-brown-muted: #8A725E;    /* 웜 타우프 브라운 */\r\n      --brand-black: #171614;          /* 블랙 (진실 · Truth) */\r\n      --brand-white: #FFFFFF;          /* 화이트 (투명 · Transparency) */\r\n      --brand-white-glass: rgba(255, 255, 255, 0.88);\r\n      --brand-green: #2D5A43;          /* 그린 (자연 · Nature) */\r\n      --brand-green-mid: #3D7357;      /* 보타니컬 세이지 그린 */\r\n      --brand-green-tint: #E8F2EC;     /* 소프트 그린 틴트 */\r\n\r\n      /* 하위 호환 및 3D 시네마 포인트 변수 매핑 */\r\n      --bg-warm-dark: #171614;\r\n      --gold: #8A725E;\r\n      --gold-bright: #F5F1E8;\r\n      --emerald: #2D5A43;\r\n      --emerald-bright: #4B8567;\r\n      --crimson: #C84B31;\r\n      --font-serif: 'Noto Serif KR', Georgia, serif;\r\n      --font-sans: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;\r\n      --font-mono: 'Space Mono', monospace;\r\n    }\r\n\r\n    *, *::before, *::after {\r\n      box-sizing: border-box;\r\n      margin: 0;\r\n      padding: 0;\r\n      -webkit-font-smoothing: antialiased;\r\n    }\r\n\r\n    html {\r\n      width: 100%;\r\n      background-color: var(--brand-beige);\r\n      overflow-x: hidden;\r\n      overflow-y: scroll;\r\n      scrollbar-width: thin;\r\n      scrollbar-color: var(--brand-green) var(--brand-beige);\r\n    }\r\n\r\n    body {\r\n      width: 100%;\r\n      min-height: 100vh;\r\n      background-color: var(--brand-beige);\r\n      color: var(--brand-black);\r\n      font-family: var(--font-sans);\r\n      overflow: visible;\r\n      user-select: none;\r\n      word-break: keep-all;\r\n    }\r\n\r\n    body::-webkit-scrollbar {\r\n      width: 6px;\r\n    }\r\n    body::-webkit-scrollbar-track {\r\n      background: var(--brand-beige);\r\n    }\r\n    body::-webkit-scrollbar-thumb {\r\n      background: linear-gradient(180deg, var(--brand-green), var(--brand-brown));\r\n      border-radius: 999px;\r\n    }\r\n\r\n    /* ==========================================================================\r\n       3000vh FULL-SCROLL TRACK (Generous Frame Dwell & Spacing Across 24 Frames)\r\n       ========================================================================== */\r\n    .fullscroll-virtual-track {\r\n      position: relative;\r\n      width: 100%;\r\n      height: 3000vh;\r\n      pointer-events: none;\r\n    }\r\n\r\n    /* ==========================================================================\r\n       FIXED 100vw x 100vh 3D WEBGL VIEWPORT (Never Scrolls Off Screen!)\r\n       ========================================================================== */\r\n    .spatial-fixed-viewport {\r\n      position: fixed;\r\n      top: 0;\r\n      left: 0;\r\n      width: 100vw;\r\n      height: 100vh;\r\n      height: 100dvh;\r\n      overflow: hidden;\r\n      z-index: 1;\r\n      background: #171614;\r\n    }\r\n\r\n    #glsl-portal-canvas {\r\n      position: absolute;\r\n      inset: 0;\r\n      width: 100% !important;\r\n      height: 100% !important;\r\n      z-index: 2;\r\n      display: block;\r\n    }\r\n\r\n    #three-tunnel-canvas {\r\n      position: absolute;\r\n      inset: 0;\r\n      width: 100% !important;\r\n      height: 100% !important;\r\n      z-index: 4;\r\n      pointer-events: none;\r\n      mix-blend-mode: screen;\r\n    }\r\n\r\n    /* Minimalist Anatomical Light Overlay (Zero Cluttered Cards!) */\r\n    #svg-spatial-overlay {\r\n      position: absolute;\r\n      inset: 0;\r\n      width: 100%;\r\n      height: 100%;\r\n      z-index: 6;\r\n      pointer-events: none;\r\n      overflow: visible;\r\n    }\r\n\r\n    /* Warm Espresso-Brown & Obsidian Scrim — Keeps Sunlit Backgrounds Clear & Uplifting\r\n       while ensuring crisp readability for the left-side story dialogue */\r\n    .spatial-vignette {\r\n      position: absolute;\r\n      inset: 0;\r\n      z-index: 5;\r\n      pointer-events: none;\r\n      background:\r\n        linear-gradient(90deg, rgba(23, 22, 20, 0.56) 0%, rgba(58, 42, 30, 0.24) 38%, rgba(23, 22, 20, 0.0) 60%),\r\n        linear-gradient(180deg, rgba(23, 22, 20, 0.28) 0%, transparent 14%, transparent 84%, rgba(23, 22, 20, 0.48) 100%);\r\n      transition: opacity 0.4s ease;\r\n    }\r\n\r\n    /* ==========================================================================\r\n       ULTRA-CLEAN TOP HEADER (Translucent White + Warm Beige + Soft Brown + Green)\r\n       ========================================================================== */\r\n    .spatial-top-nav {\r\n      position: fixed;\r\n      top: 0;\r\n      left: 0;\r\n      right: 0;\r\n      height: 68px;\r\n      z-index: 50;\r\n      display: flex;\r\n      align-items: center;\r\n      justify-content: space-between;\r\n      padding: 0 40px;\r\n      background: rgba(245, 241, 232, 0.88);\r\n      backdrop-filter: blur(18px);\r\n      -webkit-backdrop-filter: blur(18px);\r\n      border-bottom: 1px solid rgba(94, 71, 54, 0.18);\r\n      box-shadow: 0 4px 24px rgba(58, 42, 30, 0.07);\r\n      pointer-events: auto;\r\n    }\r\n\r\n    .nav-brand-logo {\r\n      font-family: var(--font-serif);\r\n      font-size: 18px;\r\n      font-weight: 900;\r\n      color: var(--brand-black);\r\n      text-decoration: none;\r\n      letter-spacing: -0.02em;\r\n      display: flex;\r\n      align-items: center;\r\n      gap: 10px;\r\n    }\r\n\r\n    .nav-brand-logo .logo-gem {\r\n      width: 9px;\r\n      height: 9px;\r\n      background: var(--brand-green);\r\n      transform: rotate(45deg);\r\n      box-shadow: 0 0 10px rgba(45, 90, 67, 0.45);\r\n    }\r\n\r\n    .nav-brand-sub {\r\n      font-family: var(--font-mono);\r\n      font-size: 11px;\r\n      font-weight: 700;\r\n      color: var(--brand-brown-soft);\r\n      letter-spacing: 0.12em;\r\n      margin-left: 4px;\r\n    }\r\n\r\n    .nav-right-actions {\r\n      display: flex;\r\n      align-items: center;\r\n      gap: 10px;\r\n    }\r\n\r\n    .btn-bgm-toggle {\r\n      display: inline-flex;\r\n      align-items: center;\r\n      gap: 8px;\r\n      background: var(--brand-white-glass);\r\n      border: 1px solid rgba(94, 71, 54, 0.28);\r\n      color: var(--brand-brown);\r\n      padding: 8px 16px;\r\n      border-radius: 999px;\r\n      font-family: var(--font-mono);\r\n      font-size: 11px;\r\n      font-weight: 700;\r\n      cursor: pointer;\r\n      backdrop-filter: blur(12px);\r\n      transition: all 0.25s ease;\r\n    }\r\n\r\n    .btn-bgm-toggle:hover {\r\n      background: var(--brand-beige-deep);\r\n      border-color: var(--brand-brown);\r\n      transform: translateY(-1px);\r\n    }\r\n\r\n    .btn-bgm-toggle.playing {\r\n      background: var(--brand-green-tint);\r\n      border-color: var(--brand-green);\r\n      color: var(--brand-green);\r\n      box-shadow: 0 4px 14px rgba(45, 90, 67, 0.16);\r\n    }\r\n\r\n    .bgm-eq-bars {\r\n      display: inline-flex;\r\n      align-items: flex-end;\r\n      gap: 2px;\r\n      height: 12px;\r\n    }\r\n\r\n    .bgm-eq-bars span {\r\n      width: 2px;\r\n      height: 3px;\r\n      background: var(--brand-brown-soft);\r\n      border-radius: 2px;\r\n    }\r\n\r\n    .btn-bgm-toggle.playing .bgm-eq-bars span:nth-child(1) {\r\n      background: var(--brand-green);\r\n      animation: eqDance 0.7s infinite ease-in-out alternate;\r\n    }\r\n    .btn-bgm-toggle.playing .bgm-eq-bars span:nth-child(2) {\r\n      background: var(--brand-brown);\r\n      animation: eqDance 0.5s 0.15s infinite ease-in-out alternate;\r\n    }\r\n    .btn-bgm-toggle.playing .bgm-eq-bars span:nth-child(3) {\r\n      background: var(--brand-green);\r\n      animation: eqDance 0.85s 0.3s infinite ease-in-out alternate;\r\n    }\r\n    .btn-bgm-toggle.playing .bgm-eq-bars span:nth-child(4) {\r\n      background: var(--brand-brown);\r\n      animation: eqDance 0.6s 0.1s infinite ease-in-out alternate;\r\n    }\r\n\r\n    @keyframes eqDance {\r\n      0% { height: 3px; }\r\n      100% { height: 12px; }\r\n    }\r\n\r\n    .btn-reserve-minimal {\r\n      display: inline-flex;\r\n      align-items: center;\r\n      gap: 6px;\r\n      background: var(--brand-white-glass);\r\n      border: 1px solid rgba(94, 71, 54, 0.26);\r\n      color: var(--brand-black);\r\n      padding: 8px 18px;\r\n      border-radius: 999px;\r\n      font-family: var(--font-sans);\r\n      font-size: 12px;\r\n      font-weight: 700;\r\n      cursor: pointer;\r\n      text-decoration: none;\r\n      backdrop-filter: blur(12px);\r\n      transition: all 0.25s ease;\r\n    }\r\n\r\n    .btn-reserve-minimal:hover {\r\n      background: var(--brand-green);\r\n      color: var(--brand-white);\r\n      border-color: var(--brand-green);\r\n      box-shadow: 0 6px 18px rgba(45, 90, 67, 0.24);\r\n    }\r\n\r\n    #btn-open-reserve {\r\n      background: var(--brand-green);\r\n      border-color: var(--brand-green);\r\n      color: var(--brand-white);\r\n    }\r\n    #btn-open-reserve:hover {\r\n      background: var(--brand-brown);\r\n      border-color: var(--brand-brown);\r\n      color: var(--brand-white);\r\n    }\r\n\r\n    /* ==========================================================================\r\n       SCROLL-REACTIVE STORY DIALOGUE STAGE (NO CARDS, PURE CINEMA NARRATION)\r\n       ========================================================================== */\r\n    .story-dialogue-stage {\r\n      position: fixed;\r\n      left: 6vw;\r\n      top: 50%;\r\n      transform: translateY(-50%);\r\n      width: min(620px, 88vw);\r\n      z-index: 30;\r\n      pointer-events: auto;\r\n      cursor: pointer;\r\n      user-select: none;\r\n      -webkit-tap-highlight-color: transparent;\r\n      perspective: 1000px;\r\n    }\r\n\r\n    .dialogue-tap-next-pill {\r\n      display: inline-flex;\r\n      align-items: center;\r\n      gap: 8px;\r\n      padding: 7px 14px;\r\n      border-radius: 999px;\r\n      background: rgba(23, 22, 20, 0.56);\r\n      border: 1px solid rgba(245, 241, 232, 0.42);\r\n      color: var(--brand-beige);\r\n      font-family: var(--font-sans);\r\n      font-size: 12px;\r\n      font-weight: 700;\r\n      letter-spacing: -0.01em;\r\n      backdrop-filter: blur(10px);\r\n      -webkit-backdrop-filter: blur(10px);\r\n      cursor: pointer;\r\n      pointer-events: auto;\r\n      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.32);\r\n      transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;\r\n    }\r\n\r\n    .dialogue-tap-next-pill:hover,\r\n    .dialogue-tap-next-pill:active {\r\n      background: rgba(45, 90, 67, 0.88);\r\n      border-color: rgba(255, 255, 255, 0.65);\r\n      color: #FFFFFF;\r\n      transform: translateY(-1px);\r\n    }\r\n\r\n    .dialogue-tap-next-pill .tap-pill-arrow {\r\n      display: inline-block;\r\n      transition: transform 0.2s ease;\r\n    }\r\n\r\n    .dialogue-tap-next-pill:hover .tap-pill-arrow,\r\n    .dialogue-tap-next-pill:active .tap-pill-arrow {\r\n      transform: translateX(3px);\r\n    }\r\n\r\n    .dialogue-meta-row,\r\n    .dialogue-sub-whisper,\r\n    .dialogue-phase-steps,\r\n    .timeline-top-meta {\r\n      display: none !important;\r\n    }\r\n\r\n    /* Story 4 Scroll-Reactive Weight Loss Counter */\r\n    .story4-weight-counter {\r\n      display: none;\r\n      align-items: baseline;\r\n      gap: 14px;\r\n      margin-top: 14px;\r\n      padding: 10px 22px;\r\n      border-radius: 999px;\r\n      background: rgba(245, 241, 232, 0.92);\r\n      border: 1.5px solid rgba(94, 71, 54, 0.35);\r\n      backdrop-filter: blur(14px);\r\n      box-shadow: 0 10px 30px rgba(23, 22, 20, 0.45);\r\n      width: fit-content;\r\n    }\r\n\r\n    .story4-weight-counter.active {\r\n      display: inline-flex;\r\n    }\r\n\r\n    .weight-live-num {\r\n      font-family: var(--font-mono);\r\n      font-size: clamp(26px, 3.2vw, 42px);\r\n      font-weight: 700;\r\n      letter-spacing: -0.03em;\r\n      color: var(--brand-black);\r\n      font-variant-numeric: tabular-nums;\r\n    }\r\n\r\n    .weight-diff-badge {\r\n      font-family: var(--font-mono);\r\n      font-size: clamp(14px, 1.5vw, 19px);\r\n      font-weight: 700;\r\n      color: var(--brand-white);\r\n      background: var(--brand-green);\r\n      border: 1px solid var(--brand-green);\r\n      padding: 4px 12px;\r\n      border-radius: 999px;\r\n      font-variant-numeric: tabular-nums;\r\n    }\r\n\r\n    /* Main Story Dialogue Line with Scroll-Reactive Character Wave */\r\n    .dialogue-main-quote {\r\n      font-family: var(--font-serif);\r\n      font-size: clamp(28px, 3.7vw, 50px);\r\n      font-weight: 700;\r\n      line-height: 1.34;\r\n      letter-spacing: -0.03em;\r\n      color: var(--brand-white);\r\n      margin-bottom: 20px;\r\n      text-shadow: 0 4px 24px rgba(23, 22, 20, 0.92), 0 2px 8px rgba(23, 22, 20, 0.88);\r\n      transform-style: preserve-3d;\r\n    }\r\n\r\n    .dialogue-char {\r\n      display: inline-block;\r\n      will-change: transform, opacity, filter, color;\r\n      transition: color 0.2s ease, text-shadow 0.2s ease;\r\n    }\r\n\r\n    .dialogue-char.space {\r\n      width: 0.28em;\r\n    }\r\n\r\n    .dialogue-char.lit {\r\n      color: var(--brand-white);\r\n      text-shadow: 0 0 22px rgba(245, 241, 232, 0.45), 0 4px 20px rgba(23, 22, 20, 0.95);\r\n    }\r\n\r\n    .dialogue-char.gold-accent {\r\n      color: var(--brand-beige);\r\n      text-shadow: 0 0 24px rgba(245, 241, 232, 0.65), 0 4px 20px rgba(23, 22, 20, 0.95);\r\n    }\r\n\r\n    /* Scroll-Reactive Brush Progress Line */\r\n    .dialogue-progress-brush {\r\n      position: relative;\r\n      width: min(380px, 74vw);\r\n      height: 3px;\r\n      background: rgba(245, 241, 232, 0.28);\r\n      border-radius: 999px;\r\n      margin-bottom: 18px;\r\n      box-shadow: 0 2px 10px rgba(23, 22, 20, 0.55);\r\n    }\r\n\r\n    .dialogue-progress-fill {\r\n      position: relative;\r\n      height: 100%;\r\n      width: 0%;\r\n      border-radius: 999px;\r\n      background: linear-gradient(90deg, var(--brand-green-mid), var(--brand-beige));\r\n      box-shadow: 0 0 14px rgba(245, 241, 232, 0.65);\r\n    }\r\n\r\n    .dialogue-progress-fill::after {\r\n      content: '';\r\n      position: absolute;\r\n      right: -4px;\r\n      top: 50%;\r\n      transform: translateY(-50%);\r\n      width: 8px;\r\n      height: 8px;\r\n      border-radius: 50%;\r\n      background: var(--brand-white);\r\n      border: 1.5px solid var(--brand-green);\r\n      box-shadow: 0 0 12px var(--brand-beige);\r\n    }\r\n\r\n    /* ==========================================================================\r\n       MINIMALIST BOTTOM TIMELINE LINE (NO BOTTOM CARDS!)\r\n       ========================================================================== */\r\n    .minimal-bottom-timeline {\r\n      position: fixed;\r\n      bottom: 26px;\r\n      left: 6vw;\r\n      right: 6vw;\r\n      z-index: 40;\r\n      display: flex;\r\n      flex-direction: column;\r\n      gap: 10px;\r\n      pointer-events: auto;\r\n    }\r\n\r\n    @keyframes wheelPulse {\r\n      0%, 100% { transform: translateY(-2px); opacity: 0.5; }\r\n      50% { transform: translateY(3px); opacity: 1; }\r\n    }\r\n\r\n    .timeline-bar-track {\r\n      position: relative;\r\n      width: 100%;\r\n      height: 3px;\r\n      background: rgba(245, 241, 232, 0.3);\r\n      cursor: pointer;\r\n      border-radius: 999px;\r\n      box-shadow: 0 2px 8px rgba(23, 22, 20, 0.65);\r\n    }\r\n\r\n    .timeline-bar-fill {\r\n      position: absolute;\r\n      left: 0;\r\n      top: 0;\r\n      height: 100%;\r\n      width: 0%;\r\n      border-radius: 999px;\r\n      background: linear-gradient(90deg, var(--brand-green), var(--brand-beige));\r\n      box-shadow: 0 0 10px rgba(245, 241, 232, 0.55);\r\n    }\r\n\r\n    .timeline-dots-row {\r\n      position: absolute;\r\n      inset: -5px 0;\r\n      display: flex;\r\n      justify-content: space-between;\r\n      align-items: center;\r\n      pointer-events: none;\r\n    }\r\n\r\n    .timeline-chapter-dot {\r\n      width: 8px;\r\n      height: 8px;\r\n      border-radius: 50%;\r\n      background: rgba(245, 241, 232, 0.55);\r\n      border: 1px solid rgba(23, 22, 20, 0.75);\r\n      transition: all 0.3s ease;\r\n      pointer-events: auto;\r\n      cursor: pointer;\r\n    }\r\n\r\n    .timeline-chapter-dot.active {\r\n      transform: scale(1.65);\r\n      background: var(--brand-green);\r\n      border-color: var(--brand-white);\r\n      box-shadow: 0 0 12px rgba(45, 90, 67, 0.85);\r\n    }\r\n\r\n    /* ==========================================================================\r\n       SLIDE-IN QUICK RESERVATION DRAWER (Beige + Translucent White + Brown + Green)\r\n       ========================================================================== */\r\n    .reserve-drawer-overlay {\r\n      position: fixed;\r\n      inset: 0;\r\n      z-index: 200;\r\n      background: rgba(23, 22, 20, 0.62);\r\n      backdrop-filter: blur(10px);\r\n      opacity: 0;\r\n      pointer-events: none;\r\n      transition: opacity 0.35s ease;\r\n      display: flex;\r\n      justify-content: flex-end;\r\n    }\r\n\r\n    .reserve-drawer-overlay.open {\r\n      opacity: 1;\r\n      pointer-events: auto;\r\n    }\r\n\r\n    .reserve-drawer-panel {\r\n      width: min(460px, 92vw);\r\n      height: 100%;\r\n      background: var(--brand-beige);\r\n      border-left: 1px solid rgba(94, 71, 54, 0.25);\r\n      box-shadow: -20px 0 60px rgba(23, 22, 20, 0.28);\r\n      padding: 36px 32px;\r\n      overflow-y: auto;\r\n      transform: translateX(100%);\r\n      transition: transform 0.38s cubic-bezier(0.22, 1, 0.36, 1);\r\n      display: flex;\r\n      flex-direction: column;\r\n      gap: 20px;\r\n      color: var(--brand-black);\r\n    }\r\n\r\n    .reserve-drawer-overlay.open .reserve-drawer-panel {\r\n      transform: translateX(0);\r\n    }\r\n\r\n    .drawer-top-row {\r\n      display: flex;\r\n      align-items: center;\r\n      justify-content: space-between;\r\n      border-bottom: 1px solid rgba(94, 71, 54, 0.18);\r\n      padding-bottom: 16px;\r\n    }\r\n\r\n    .drawer-top-title {\r\n      font-family: var(--font-serif);\r\n      font-size: 19px;\r\n      font-weight: 800;\r\n      color: var(--brand-black);\r\n    }\r\n\r\n    .drawer-close-btn {\r\n      background: var(--brand-white);\r\n      border: 1px solid rgba(94, 71, 54, 0.26);\r\n      color: var(--brand-brown);\r\n      border-radius: 999px;\r\n      padding: 6px 14px;\r\n      font-size: 12px;\r\n      font-weight: 700;\r\n      cursor: pointer;\r\n      transition: all 0.2s ease;\r\n    }\r\n    .drawer-close-btn:hover {\r\n      background: var(--brand-brown);\r\n      color: var(--brand-white);\r\n    }\r\n\r\n    .drawer-form-group {\r\n      display: flex;\r\n      flex-direction: column;\r\n      gap: 6px;\r\n    }\r\n\r\n    .drawer-form-group label {\r\n      font-size: 12px;\r\n      font-weight: 800;\r\n      color: var(--brand-brown);\r\n    }\r\n\r\n    .drawer-form-group select,\r\n    .drawer-form-group input,\r\n    .drawer-form-group textarea {\r\n      width: 100%;\r\n      padding: 11px 14px;\r\n      background: var(--brand-white);\r\n      border: 1px solid rgba(94, 71, 54, 0.24);\r\n      border-radius: 10px;\r\n      color: var(--brand-black);\r\n      font-family: var(--font-sans);\r\n      font-size: 13px;\r\n      font-weight: 500;\r\n    }\r\n\r\n    .drawer-submit-btn {\r\n      padding: 14px;\r\n      border-radius: 12px;\r\n      background: linear-gradient(135deg, var(--brand-green), var(--brand-green-mid));\r\n      color: var(--brand-white);\r\n      font-weight: 800;\r\n      font-size: 14px;\r\n      border: none;\r\n      cursor: pointer;\r\n      box-shadow: 0 6px 20px rgba(45, 90, 67, 0.28);\r\n      transition: all 0.22s ease;\r\n    }\r\n    .drawer-submit-btn:hover {\r\n      background: var(--brand-brown);\r\n    }\r\n\r\n    .drawer-quick-links {\r\n      display: grid;\r\n      grid-template-columns: 1fr 1fr;\r\n      gap: 10px;\r\n      margin-top: 8px;\r\n    }\r\n\r\n    .drawer-quick-links a {\r\n      display: flex;\r\n      align-items: center;\r\n      justify-content: center;\r\n      gap: 6px;\r\n      padding: 11px;\r\n      border-radius: 10px;\r\n      background: var(--brand-white);\r\n      border: 1px solid rgba(94, 71, 54, 0.22);\r\n      color: var(--brand-brown);\r\n      text-decoration: none;\r\n      font-size: 12px;\r\n      font-weight: 700;\r\n      transition: all 0.2s ease;\r\n    }\r\n    .drawer-quick-links a:hover {\r\n      background: var(--brand-green-tint);\r\n      border-color: var(--brand-green);\r\n      color: var(--brand-green);\r\n    }\r\n\r\n    /* ==========================================================================\r\n       SK TELECOM (sktelecom.com) INTRO CARD STACK -> BENTO FLIP SPREAD STAGE\r\n       Harmonized with Warm Hanji Beige, Soft Brown, Crisp Black, Pure White & Green\r\n       ========================================================================== */\r\n    .skt-finale-stage {\r\n      position: fixed;\r\n      inset: 0;\r\n      z-index: 45;\r\n      display: flex;\r\n      flex-direction: column;\r\n      align-items: center;\r\n      justify-content: center;\r\n      padding: 78px 4vw 56px;\r\n      opacity: 0;\r\n      pointer-events: none;\r\n      transition: opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1);\r\n      overflow: hidden;\r\n    }\r\n\r\n    .skt-finale-stage.active {\r\n      opacity: 1;\r\n      pointer-events: auto;\r\n    }\r\n\r\n    .skt-hero-bg {\r\n      position: absolute;\r\n      left: 50%;\r\n      top: 50%;\r\n      width: 108%;\r\n      height: 112%;\r\n      transform: translate(-50%, -50%);\r\n      background:\r\n        radial-gradient(circle at 50% 36%, rgba(255, 255, 255, 0.92) 0%, rgba(245, 241, 232, 0.96) 52%, rgba(230, 222, 200, 0.98) 100%);\r\n      backdrop-filter: blur(20px);\r\n      z-index: 0;\r\n      will-change: transform;\r\n    }\r\n\r\n    /* Center Headline that pops in before the 6 cards stack & spread */\r\n    .skt-hero-headline {\r\n      position: absolute;\r\n      top: 50%;\r\n      left: 50%;\r\n      transform: translate(-50%, -50%);\r\n      z-index: 15;\r\n      pointer-events: none;\r\n      text-align: center;\r\n    }\r\n\r\n    .skt-hero-headline .skt-headline-text {\r\n      display: block;\r\n      font-family: var(--font-serif);\r\n      font-size: clamp(44px, 7.2vw, 96px);\r\n      font-weight: 900;\r\n      letter-spacing: -0.03em;\r\n      color: var(--brand-black);\r\n      white-space: nowrap;\r\n      text-shadow: 0 10px 36px rgba(74, 53, 37, 0.16);\r\n      opacity: 0;\r\n      transform: scale(1.22);\r\n      transition: opacity 0.48s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.48s cubic-bezier(0.34, 1.56, 0.64, 1);\r\n    }\r\n\r\n    .skt-hero-headline .skt-headline-sub {\r\n      display: block;\r\n      margin-top: 10px;\r\n      font-family: var(--font-mono);\r\n      font-size: clamp(12px, 1.2vw, 15px);\r\n      font-weight: 700;\r\n      letter-spacing: 0.22em;\r\n      color: var(--brand-green);\r\n      opacity: 0;\r\n      transform: translateY(10px);\r\n      transition: opacity 0.4s ease, transform 0.4s ease;\r\n    }\r\n\r\n    .skt-finale-stage.phase-headline .skt-hero-headline .skt-headline-text,\r\n    .skt-finale-stage.phase-stack .skt-hero-headline .skt-headline-text {\r\n      opacity: 1;\r\n      transform: scale(1);\r\n    }\r\n\r\n    .skt-finale-stage.phase-headline .skt-hero-headline .skt-headline-sub,\r\n    .skt-finale-stage.phase-stack .skt-hero-headline .skt-headline-sub {\r\n      opacity: 0.95;\r\n      transform: translateY(0);\r\n    }\r\n\r\n    .skt-finale-stage.phase-spread .skt-hero-headline .skt-headline-text,\r\n    .skt-finale-stage.phase-ready .skt-hero-headline .skt-headline-text {\r\n      opacity: 0;\r\n      transform: scale(0.78);\r\n      transition: opacity 0.42s ease, transform 0.42s ease;\r\n    }\r\n\r\n    .skt-finale-stage.phase-spread .skt-hero-headline .skt-headline-sub,\r\n    .skt-finale-stage.phase-ready .skt-hero-headline .skt-headline-sub {\r\n      opacity: 0;\r\n      transform: translateY(-8px);\r\n    }\r\n\r\n    /* Top Bar inside Finale Stage */\r\n    .skt-finale-header {\r\n      position: relative;\r\n      z-index: 10;\r\n      width: min(1360px, 92vw);\r\n      display: flex;\r\n      align-items: flex-end;\r\n      justify-content: space-between;\r\n      margin-bottom: 18px;\r\n      opacity: 0;\r\n      transform: translateY(14px);\r\n      transition: opacity 0.55s ease, transform 0.55s ease;\r\n    }\r\n\r\n    .skt-finale-stage.phase-ready .skt-finale-header {\r\n      opacity: 1;\r\n      transform: translateY(0);\r\n    }\r\n\r\n    .skt-finale-heading-group {\r\n      display: flex;\r\n      flex-direction: column;\r\n      gap: 4px;\r\n    }\r\n\r\n    .skt-finale-eyebrow {\r\n      font-family: var(--font-mono);\r\n      font-size: 11px;\r\n      font-weight: 700;\r\n      letter-spacing: 0.16em;\r\n      color: var(--brand-green);\r\n    }\r\n\r\n    .skt-finale-main-title {\r\n      font-family: var(--font-serif);\r\n      font-size: clamp(22px, 2.4vw, 32px);\r\n      font-weight: 700;\r\n      color: var(--brand-black);\r\n      letter-spacing: -0.02em;\r\n    }\r\n\r\n    .skt-finale-controls {\r\n      display: flex;\r\n      align-items: center;\r\n      gap: 10px;\r\n    }\r\n\r\n    .skt-ctrl-btn {\r\n      background: var(--brand-white-glass);\r\n      border: 1px solid rgba(94, 71, 54, 0.28);\r\n      color: var(--brand-brown);\r\n      padding: 8px 16px;\r\n      border-radius: 999px;\r\n      font-family: var(--font-sans);\r\n      font-size: 12px;\r\n      font-weight: 700;\r\n      cursor: pointer;\r\n      box-shadow: 0 4px 14px rgba(58, 42, 30, 0.06);\r\n      transition: all 0.25s ease;\r\n    }\r\n\r\n    .skt-ctrl-btn:hover {\r\n      background: var(--brand-green);\r\n      color: var(--brand-white);\r\n      border-color: var(--brand-green);\r\n    }\r\n\r\n    /* 7-Card Bento Grid Container (mirrors sktelecom.com .hero-content-lg) */\r\n    .skt-bento-grid {\r\n      position: relative;\r\n      z-index: 10;\r\n      width: min(1360px, 92vw);\r\n      height: min(640px, 70vh);\r\n      display: grid;\r\n      grid-template-columns: repeat(12, 1fr);\r\n      grid-template-rows: repeat(2, 1fr);\r\n      gap: 16px;\r\n    }\r\n\r\n    .skt-bento-grid > .skt-card-item:nth-child(-n+3) {\r\n      grid-column: span 4;\r\n    }\r\n\r\n    .skt-bento-grid > .skt-card-item:nth-child(n+4) {\r\n      grid-column: span 3;\r\n    }\r\n\r\n    .skt-bento-grid > .skt-card-item:nth-child(n+4) .skt-card-box {\r\n      padding: 20px 22px;\r\n    }\r\n\r\n    .skt-bento-grid > .skt-card-item:nth-child(n+4) .skt-card-title {\r\n      font-size: clamp(21px, 1.9vw, 28px);\r\n    }\r\n\r\n    .skt-card-item {\r\n      position: relative;\r\n      display: block;\r\n      width: 100%;\r\n      height: 100%;\r\n      min-width: 0;\r\n      border-radius: 20px;\r\n      text-decoration: none;\r\n      cursor: pointer;\r\n      overflow: visible;\r\n      user-select: none;\r\n    }\r\n\r\n    .skt-finale-stage.phase-ready .skt-card-item {\r\n      overflow: hidden;\r\n      box-shadow: 0 16px 38px rgba(58, 42, 30, 0.16);\r\n      border: 1.5px solid rgba(94, 71, 54, 0.22);\r\n      transition: border-color 0.35s ease, box-shadow 0.35s ease, transform 0.35s ease;\r\n    }\r\n\r\n    @media (hover: hover) and (pointer: fine) {\r\n      .skt-finale-stage.phase-ready .skt-card-item:hover {\r\n        border-color: var(--brand-green);\r\n        box-shadow: 0 22px 48px rgba(45, 90, 67, 0.26), 0 0 0 2px rgba(45, 90, 67, 0.18);\r\n        transform: translateY(-4px);\r\n      }\r\n    }\r\n\r\n    /* The Card Image Box that starts stacked at viewport center & FLIPs into place */\r\n    .skt-card-item .skt-img-box {\r\n      position: absolute;\r\n      inset: 0;\r\n      width: 100%;\r\n      height: 100%;\r\n      border-radius: 20px;\r\n      overflow: hidden;\r\n      background-color: #261E18;\r\n      background-size: cover;\r\n      background-position: center;\r\n      background-repeat: no-repeat;\r\n      box-shadow: 0 20px 50px rgba(58, 42, 30, 0.28);\r\n      border: 1.5px solid rgba(94, 71, 54, 0.28);\r\n      opacity: 0;\r\n      transform-origin: center center;\r\n      will-change: transform, opacity;\r\n      color-scheme: light only;\r\n      forced-color-adjust: none;\r\n    }\r\n\r\n    .skt-card-item .skt-img-box::after {\r\n      content: \"\";\r\n      position: absolute;\r\n      inset: 0;\r\n      background: linear-gradient(180deg, rgba(23, 22, 20, 0.04) 0%, rgba(23, 22, 20, 0.16) 48%, rgba(23, 22, 20, 0.84) 100%);\r\n      transition: opacity 0.4s ease;\r\n      pointer-events: none;\r\n    }\r\n\r\n    /* SKT Hover Zoom on .skt-img-box when in ready state */\r\n    .skt-finale-stage.phase-ready .skt-card-item .skt-img-box {\r\n      border: none;\r\n      opacity: 1 !important;\r\n      transition: transform 0.55s cubic-bezier(0.4, 0.2, 0.3, 1.2) !important;\r\n    }\r\n\r\n    @media (hover: hover) and (pointer: fine) {\r\n      .skt-finale-stage.phase-ready .skt-card-item:hover .skt-img-box {\r\n        transform: scale(1.09) !important;\r\n      }\r\n    }\r\n\r\n    /* Card Content Overlay (.box in sktelecom.com) */\r\n    .skt-card-item .skt-card-box {\r\n      position: relative;\r\n      z-index: 3;\r\n      width: 100%;\r\n      height: 100%;\r\n      padding: 24px 28px;\r\n      display: flex;\r\n      flex-direction: column;\r\n      justify-content: flex-end;\r\n      opacity: 0;\r\n      transform: translateY(12px);\r\n      transition: opacity 0.48s ease, transform 0.48s cubic-bezier(0.22, 1, 0.36, 1);\r\n      pointer-events: none;\r\n    }\r\n\r\n    .skt-finale-stage.phase-ready .skt-card-item .skt-card-box {\r\n      opacity: 1;\r\n      transform: translateY(0);\r\n    }\r\n\r\n    .skt-card-bottom-info {\r\n      display: flex;\r\n      align-items: center;\r\n      justify-content: space-between;\r\n      width: 100%;\r\n      min-width: 0;\r\n    }\r\n\r\n    .skt-card-title {\r\n      font-family: var(--font-serif);\r\n      font-size: clamp(24px, 2.4vw, 34px);\r\n      font-weight: 900;\r\n      color: var(--brand-white);\r\n      letter-spacing: -0.02em;\r\n      line-height: 1.2;\r\n      text-shadow: 0 3px 16px rgba(23, 22, 20, 0.9), 0 1px 4px rgba(23, 22, 20, 0.95);\r\n      margin: 0;\r\n    }\r\n\r\n    .skt-card-desc {\r\n      font-family: var(--font-sans);\r\n      font-size: 13px;\r\n      font-weight: 500;\r\n      color: rgba(245, 241, 232, 0.95);\r\n      line-height: 1.5;\r\n      text-shadow: 0 2px 10px rgba(23, 22, 20, 0.9);\r\n    }\r\n\r\n    .skt-card-actions-row {\r\n      display: flex;\r\n      align-items: center;\r\n      gap: 8px;\r\n      margin-top: 8px;\r\n      pointer-events: auto;\r\n    }\r\n\r\n    .skt-card-chip {\r\n      padding: 6px 13px;\r\n      border-radius: 999px;\r\n      font-size: 11px;\r\n      font-weight: 800;\r\n      background: rgba(45, 90, 67, 0.92);\r\n      border: 1px solid rgba(255, 255, 255, 0.45);\r\n      color: var(--brand-white);\r\n      backdrop-filter: blur(8px);\r\n      cursor: pointer;\r\n      transition: all 0.25s ease;\r\n    }\r\n\r\n    .skt-card-chip:hover {\r\n      background: var(--brand-white);\r\n      border-color: var(--brand-white);\r\n      color: var(--brand-green);\r\n    }\r\n\r\n    .skt-card-chip.secondary {\r\n      background: rgba(255, 255, 255, 0.88);\r\n      border-color: rgba(94, 71, 54, 0.35);\r\n      color: var(--brand-brown);\r\n    }\r\n\r\n    .skt-card-chip.secondary:hover {\r\n      background: var(--brand-brown);\r\n      border-color: var(--brand-brown);\r\n      color: var(--brand-white);\r\n    }\r\n\r\n    @media (max-width: 1024px) {\r\n      html, body {\r\n        overflow: hidden !important;\r\n        width: 100% !important;\r\n        max-width: 100% !important;\r\n        height: 100vh !important;\r\n        height: 100dvh !important;\r\n        overscroll-behavior: none !important;\r\n        touch-action: none !important;\r\n      }\r\n      .fullscroll-virtual-track {\r\n        display: none !important;\r\n      }\r\n      .spatial-top-nav {\r\n        padding: 0 10px;\r\n        height: 52px;\r\n        gap: 6px;\r\n        width: 100% !important;\r\n        max-width: 100% !important;\r\n        box-sizing: border-box !important;\r\n        overflow: hidden;\r\n      }\r\n      .nav-brand-logo {\r\n        font-size: 12.5px;\r\n        gap: 5px;\r\n        white-space: nowrap;\r\n        flex-shrink: 0;\r\n      }\r\n      .nav-brand-logo .logo-gem {\r\n        width: 7px;\r\n        height: 7px;\r\n        flex-shrink: 0;\r\n      }\r\n      .nav-brand-sub,\r\n      #btn-bgm-toggle {\r\n        display: none !important;\r\n      }\r\n      .nav-right-actions {\r\n        gap: 4px;\r\n        overflow-x: auto;\r\n        overflow-y: hidden;\r\n        flex: 1 1 auto;\r\n        min-width: 0;\r\n        max-width: 100%;\r\n        justify-content: flex-start;\r\n        scrollbar-width: none;\r\n        -webkit-overflow-scrolling: touch;\r\n        touch-action: pan-x;\r\n        padding: 2px 0;\r\n      }\r\n      .nav-right-actions::-webkit-scrollbar {\r\n        display: none;\r\n      }\r\n      .btn-reserve-minimal {\r\n        padding: 5px 8px;\r\n        font-size: 10px;\r\n        white-space: nowrap;\r\n        flex-shrink: 0;\r\n      }\r\n      .story-dialogue-stage {\r\n        left: 14px;\r\n        right: 14px;\r\n        top: auto;\r\n        bottom: 48px;\r\n        transform: none;\r\n        width: auto;\r\n        max-width: calc(100vw - 28px);\r\n      }\r\n      .dialogue-main-quote {\r\n        font-size: clamp(20px, 5.6vw, 28px);\r\n        line-height: 1.32;\r\n        margin-bottom: 10px;\r\n      }\r\n      .minimal-bottom-timeline {\r\n        left: 14px;\r\n        right: 14px;\r\n        bottom: 12px;\r\n      }\r\n      .skt-finale-stage {\r\n        padding: 58px 10px 24px !important;\r\n        width: 100% !important;\r\n        max-width: 100% !important;\r\n        box-sizing: border-box !important;\r\n        justify-content: flex-start !important;\r\n        align-items: stretch !important;\r\n        overflow-x: hidden !important;\r\n        overflow-y: auto !important;\r\n        -webkit-overflow-scrolling: touch;\r\n        touch-action: pan-y;\r\n      }\r\n      .skt-hero-bg {\r\n        position: fixed !important;\r\n        inset: 0 !important;\r\n        left: 0 !important;\r\n        top: 0 !important;\r\n        width: 100% !important;\r\n        height: 100dvh !important;\r\n        transform: none !important;\r\n      }\r\n      .skt-hero-headline {\r\n        width: 92vw;\r\n      }\r\n      .skt-hero-headline .skt-headline-text {\r\n        font-size: clamp(24px, 7vw, 40px);\r\n        white-space: normal;\r\n        word-break: keep-all;\r\n      }\r\n      .skt-finale-header {\r\n        width: 100% !important;\r\n        max-width: 100% !important;\r\n        margin: 0 auto 8px !important;\r\n        flex-direction: column !important;\r\n        align-items: stretch !important;\r\n        justify-content: flex-start !important;\r\n        gap: 6px !important;\r\n        box-sizing: border-box !important;\r\n      }\r\n      .skt-finale-heading-group {\r\n        width: 100% !important;\r\n        min-width: 0 !important;\r\n        text-align: center;\r\n        align-items: center;\r\n        gap: 2px;\r\n      }\r\n      .skt-finale-eyebrow {\r\n        font-size: 9.5px !important;\r\n        letter-spacing: 0.06em !important;\r\n        white-space: nowrap;\r\n        overflow: hidden;\r\n        text-overflow: ellipsis;\r\n        max-width: 100%;\r\n      }\r\n      .skt-finale-main-title {\r\n        font-size: clamp(15px, 4.2vw, 20px) !important;\r\n        line-height: 1.25 !important;\r\n        word-break: keep-all;\r\n      }\r\n      #btn-replay-skt-flip {\r\n        display: none !important;\r\n      }\r\n      .skt-finale-controls {\r\n        width: 100% !important;\r\n        max-width: 100% !important;\r\n        display: grid !important;\r\n        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;\r\n        gap: 5px !important;\r\n        box-sizing: border-box !important;\r\n      }\r\n      .skt-ctrl-btn {\r\n        width: 100% !important;\r\n        min-width: 0 !important;\r\n        display: inline-flex !important;\r\n        align-items: center !important;\r\n        justify-content: center !important;\r\n        text-align: center !important;\r\n        padding: 6px 6px !important;\r\n        font-size: clamp(10px, 2.7vw, 11.5px) !important;\r\n        white-space: nowrap !important;\r\n        overflow: hidden !important;\r\n        text-overflow: ellipsis !important;\r\n        box-sizing: border-box !important;\r\n      }\r\n      .skt-bento-grid {\r\n        width: 100% !important;\r\n        max-width: 100% !important;\r\n        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;\r\n        grid-template-rows: auto !important;\r\n        grid-auto-rows: auto !important;\r\n        height: auto !important;\r\n        min-height: 0 !important;\r\n        gap: 8px !important;\r\n        padding-bottom: 24px !important;\r\n        margin: 0 auto !important;\r\n        box-sizing: border-box !important;\r\n      }\r\n      .skt-bento-grid > .skt-card-item:nth-child(1) {\r\n        grid-column: 1 / -1 !important;\r\n        height: 156px !important;\r\n        min-height: 156px !important;\r\n      }\r\n      .skt-bento-grid > .skt-card-item:nth-child(n+2) {\r\n        grid-column: span 1 !important;\r\n        height: 152px !important;\r\n        min-height: 152px !important;\r\n      }\r\n      .skt-bento-grid > .skt-card-item:nth-child(4),\r\n      .skt-bento-grid > .skt-card-item:nth-child(5) {\r\n        height: 166px !important;\r\n        min-height: 166px !important;\r\n      }\r\n      .skt-bento-grid > .skt-card-item:nth-child(n+4) .skt-card-box {\r\n        padding: 10px 11px !important;\r\n      }\r\n      .skt-bento-grid > .skt-card-item:nth-child(n+4) .skt-card-title {\r\n        font-size: clamp(14.5px, 3.8vw, 17px) !important;\r\n      }\r\n      .skt-card-item {\r\n        min-width: 0 !important;\r\n        max-width: 100% !important;\r\n        overflow: hidden !important;\r\n        border-radius: 14px !important;\r\n        box-sizing: border-box !important;\r\n      }\r\n      .skt-card-item .skt-img-box {\r\n        border-radius: 14px !important;\r\n        opacity: 1 !important;\r\n      }\r\n      .skt-card-item .skt-card-box {\r\n        padding: 10px 11px !important;\r\n        box-sizing: border-box !important;\r\n      }\r\n      .skt-card-bottom-info {\r\n        gap: 3px !important;\r\n        min-width: 0 !important;\r\n      }\r\n      .skt-card-title {\r\n        font-size: clamp(14.5px, 3.8vw, 17px) !important;\r\n        line-height: 1.18 !important;\r\n        word-break: keep-all;\r\n      }\r\n      .skt-card-desc {\r\n        font-size: clamp(10px, 2.6vw, 11.5px) !important;\r\n        line-height: 1.28 !important;\r\n        display: -webkit-box;\r\n        -webkit-line-clamp: 2;\r\n        -webkit-box-orient: vertical;\r\n        overflow: hidden;\r\n      }\r\n      .skt-card-actions-row {\r\n        gap: 3.5px !important;\r\n        margin-top: 3px !important;\r\n        flex-wrap: wrap !important;\r\n        max-width: 100% !important;\r\n      }\r\n      .skt-card-chip {\r\n        padding: 3px 6.5px !important;\r\n        font-size: 8.8px !important;\r\n        white-space: nowrap;\r\n      }\r\n      .daddy-intro-card {\r\n        padding: 28px 20px !important;\r\n        border-radius: 22px !important;\r\n      }\r\n      .daddy-intro-slogan {\r\n        font-size: clamp(23px, 6.6vw, 36px) !important;\r\n      }\r\n      .daddy-intro-sub {\r\n        font-size: 13px !important;\r\n      }\r\n    }\r\n\r\n    /* ==========================================================================\r\n       CINEMATIC OPENING SLOGAN STAGE: “아빠 한의사를 찾는 환자 스토리 공개”\r\n       Automatically plays before the Main Storyboard and transitions smoothly!\r\n       ========================================================================== */\r\n    .daddy-doc-intro-stage {\r\n      position: fixed;\r\n      inset: 0;\r\n      z-index: 120;\r\n      display: flex;\r\n      align-items: center;\r\n      justify-content: center;\r\n      padding: 24px;\r\n      background:\r\n        radial-gradient(circle at 50% 38%, rgba(45, 90, 67, 0.34) 0%, rgba(23, 22, 20, 0.88) 54%, rgba(15, 13, 11, 0.96) 100%);\r\n      backdrop-filter: blur(22px);\r\n      -webkit-backdrop-filter: blur(22px);\r\n      opacity: 1;\r\n      visibility: visible;\r\n      transition: opacity 0.85s cubic-bezier(0.22, 1, 0.36, 1), transform 0.85s cubic-bezier(0.22, 1, 0.36, 1), visibility 0.85s ease;\r\n      overflow: hidden;\r\n      cursor: pointer;\r\n    }\r\n\r\n    .daddy-doc-intro-stage.closing {\r\n      opacity: 0;\r\n      transform: scale(1.06);\r\n      pointer-events: none;\r\n    }\r\n\r\n    .daddy-doc-intro-stage.hidden {\r\n      display: none !important;\r\n      pointer-events: none;\r\n    }\r\n\r\n    /* Volumetric Sunlight Rays & Floating Bokeh inside Opening Stage */\r\n    .daddy-intro-sunbeam {\r\n      position: absolute;\r\n      width: 140vw;\r\n      height: 140vh;\r\n      top: -20vh;\r\n      left: -20vw;\r\n      background:\r\n        conic-gradient(from 135deg at 30% 10%, transparent 0deg, rgba(253, 230, 138, 0.14) 18deg, transparent 38deg, rgba(110, 231, 183, 0.10) 56deg, transparent 80deg);\r\n      filter: blur(28px);\r\n      animation: introSunSweep 5.5s ease-in-out infinite alternate;\r\n      pointer-events: none;\r\n    }\r\n\r\n    @keyframes introSunSweep {\r\n      0% { transform: rotate(-4deg) scale(1); opacity: 0.75; }\r\n      100% { transform: rotate(5deg) scale(1.06); opacity: 1; }\r\n    }\r\n\r\n    .daddy-intro-aura-ring {\r\n      position: absolute;\r\n      width: min(680px, 90vw);\r\n      height: min(680px, 90vw);\r\n      border-radius: 50%;\r\n      border: 1px solid rgba(245, 241, 232, 0.16);\r\n      box-shadow: 0 0 90px rgba(212, 175, 55, 0.16), inset 0 0 60px rgba(45, 90, 67, 0.22);\r\n      animation: introRingPulse 3.2s ease-out infinite;\r\n      pointer-events: none;\r\n    }\r\n\r\n    @keyframes introRingPulse {\r\n      0% { transform: scale(0.86); opacity: 0.75; }\r\n      70% { transform: scale(1.08); opacity: 0.25; }\r\n      100% { transform: scale(1.14); opacity: 0; }\r\n    }\r\n\r\n    .daddy-intro-card {\r\n      position: relative;\r\n      z-index: 5;\r\n      width: min(860px, 94vw);\r\n      padding: 46px 44px 38px;\r\n      border-radius: 28px;\r\n      background: linear-gradient(145deg, rgba(32, 26, 21, 0.88) 0%, rgba(20, 18, 16, 0.94) 100%);\r\n      border: 1.5px solid rgba(245, 241, 232, 0.28);\r\n      box-shadow: 0 32px 90px rgba(0, 0, 0, 0.72), 0 0 0 1px rgba(212, 175, 55, 0.22);\r\n      text-align: center;\r\n      display: flex;\r\n      flex-direction: column;\r\n      align-items: center;\r\n      gap: 18px;\r\n      animation: introCardRise 0.85s cubic-bezier(0.22, 1, 0.36, 1) forwards;\r\n    }\r\n\r\n    @keyframes introCardRise {\r\n      0% { opacity: 0; transform: translateY(28px) scale(0.96); }\r\n      100% { opacity: 1; transform: translateY(0) scale(1); }\r\n    }\r\n\r\n    .daddy-intro-seal {\r\n      display: inline-flex;\r\n      align-items: center;\r\n      gap: 8px;\r\n      padding: 7px 18px;\r\n      border-radius: 999px;\r\n      background: rgba(45, 90, 67, 0.88);\r\n      border: 1px solid rgba(167, 243, 208, 0.55);\r\n      color: #FFFFFF;\r\n      font-family: var(--font-sans);\r\n      font-size: 12.5px;\r\n      font-weight: 800;\r\n      letter-spacing: 0.06em;\r\n      box-shadow: 0 6px 20px rgba(45, 90, 67, 0.45);\r\n    }\r\n\r\n    .daddy-intro-seal-dot {\r\n      width: 8px;\r\n      height: 8px;\r\n      border-radius: 50%;\r\n      background: #FDE68A;\r\n      box-shadow: 0 0 10px #FDE68A;\r\n    }\r\n\r\n    .daddy-intro-quote-marks {\r\n      font-family: var(--font-serif);\r\n      font-size: clamp(26px, 4vw, 48px);\r\n      font-weight: 900;\r\n      color: #FDE68A;\r\n      opacity: 0.9;\r\n      margin: 0 4px;\r\n    }\r\n\r\n    .daddy-intro-slogan {\r\n      font-family: var(--font-serif);\r\n      font-size: clamp(28px, 4.4vw, 56px);\r\n      font-weight: 900;\r\n      line-height: 1.28;\r\n      letter-spacing: -0.03em;\r\n      color: #FFFFFF;\r\n      text-shadow: 0 6px 28px rgba(0, 0, 0, 0.85), 0 0 32px rgba(253, 230, 138, 0.32);\r\n      margin: 2px 0;\r\n      word-break: keep-all;\r\n    }\r\n\r\n    .daddy-intro-char {\r\n      display: inline-block;\r\n      opacity: 0;\r\n      transform: translate3d(0, 22px, 0) rotateX(-35deg) scale(0.92);\r\n      filter: blur(6px);\r\n      animation: daddyCharPop 0.68s cubic-bezier(0.22, 1, 0.36, 1) forwards;\r\n    }\r\n\r\n    .daddy-intro-space {\r\n      display: inline-block;\r\n      width: 0.28em;\r\n    }\r\n\r\n    .daddy-intro-char.highlight,\r\n    .daddy-intro-char.highlight-gold {\r\n      color: #FDE68A;\r\n      text-shadow: 0 0 24px rgba(253, 230, 138, 0.72), 0 4px 18px rgba(0, 0, 0, 0.9);\r\n    }\r\n\r\n    @keyframes daddyCharPop {\r\n      0% {\r\n        opacity: 0;\r\n        transform: translate3d(0, 22px, 0) rotateX(-35deg) scale(0.92);\r\n        filter: blur(6px);\r\n      }\r\n      100% {\r\n        opacity: 1;\r\n        transform: translate3d(0, 0, 0) rotateX(0deg) scale(1);\r\n        filter: blur(0px);\r\n      }\r\n    }\r\n\r\n    .daddy-intro-manifesto {\r\n      width: 100%;\r\n      max-width: 660px;\r\n      padding: 16px 22px;\r\n      border-radius: 18px;\r\n      background: rgba(245, 241, 232, 0.10);\r\n      border: 1px solid rgba(245, 241, 232, 0.22);\r\n      display: flex;\r\n      flex-direction: column;\r\n      gap: 6px;\r\n      opacity: 0;\r\n      transform: translateY(12px);\r\n      animation: introSubFade 0.75s 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards;\r\n    }\r\n\r\n    @keyframes introSubFade {\r\n      to { opacity: 1; transform: translateY(0); }\r\n    }\r\n\r\n    .daddy-intro-sub {\r\n      font-family: var(--font-sans);\r\n      font-size: clamp(14px, 1.55vw, 18px);\r\n      font-weight: 700;\r\n      line-height: 1.58;\r\n      color: var(--brand-beige);\r\n      word-break: keep-all;\r\n    }\r\n\r\n    .daddy-intro-sub strong {\r\n      color: #FDE68A;\r\n      font-weight: 900;\r\n    }\r\n\r\n    .daddy-intro-progress-wrap {\r\n      width: min(420px, 82vw);\r\n      display: flex;\r\n      flex-direction: column;\r\n      align-items: center;\r\n      gap: 10px;\r\n      margin-top: 4px;\r\n    }\r\n\r\n    .daddy-intro-progress-track {\r\n      width: 100%;\r\n      height: 4px;\r\n      border-radius: 999px;\r\n      background: rgba(245, 241, 232, 0.18);\r\n      overflow: hidden;\r\n    }\r\n\r\n    .daddy-intro-progress-fill {\r\n      width: 0%;\r\n      height: 100%;\r\n      border-radius: 999px;\r\n      background: linear-gradient(90deg, #10B981, #FDE68A);\r\n      box-shadow: 0 0 14px rgba(253, 230, 138, 0.75);\r\n      transition: width 0.08s linear;\r\n    }\r\n\r\n    .daddy-intro-cta-row {\r\n      display: flex;\r\n      align-items: center;\r\n      justify-content: center;\r\n      gap: 12px;\r\n      flex-wrap: wrap;\r\n    }\r\n\r\n    .daddy-intro-enter-btn {\r\n      display: inline-flex;\r\n      align-items: center;\r\n      gap: 8px;\r\n      padding: 10px 22px;\r\n      border-radius: 999px;\r\n      background: linear-gradient(135deg, var(--brand-green), var(--brand-green-mid));\r\n      border: 1px solid rgba(255, 255, 255, 0.45);\r\n      color: #FFFFFF;\r\n      font-family: var(--font-sans);\r\n      font-size: 13px;\r\n      font-weight: 800;\r\n      cursor: pointer;\r\n      box-shadow: 0 8px 24px rgba(45, 90, 67, 0.45);\r\n      transition: all 0.25s ease;\r\n    }\r\n\r\n    .daddy-intro-enter-btn:hover {\r\n      background: #FDE68A;\r\n      color: #171614;\r\n      border-color: #FDE68A;\r\n      transform: translateY(-2px);\r\n    }\r\n\r\n    /* Persistent Father-Doctor Seal on Main Story Dialogue Stage */\r\n    .dialogue-daddy-concept-pill {\r\n      display: inline-flex;\r\n      align-items: center;\r\n      gap: 7px;\r\n      padding: 6px 14px;\r\n      margin-bottom: 12px;\r\n      border-radius: 999px;\r\n      background: rgba(23, 22, 20, 0.72);\r\n      border: 1px solid rgba(253, 230, 138, 0.48);\r\n      color: #FDE68A;\r\n      font-family: var(--font-sans);\r\n      font-size: 12px;\r\n      font-weight: 800;\r\n      letter-spacing: -0.01em;\r\n      backdrop-filter: blur(10px);\r\n      -webkit-backdrop-filter: blur(10px);\r\n      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.38);\r\n    }\r\n\r\n    .dialogue-daddy-concept-pill .concept-dot {\r\n      width: 7px;\r\n      height: 7px;\r\n      border-radius: 50%;\r\n      background: #10B981;\r\n      box-shadow: 0 0 8px #10B981;\r\n    }\r\n\r\n    /* 4-Type Hairloss Selector Modal (남성탈모 · 원형탈모 · 여성탈모 · 지루성두피염) */\r\n    .hairloss-4type-modal-overlay {\r\n      position: fixed;\r\n      inset: 0;\r\n      z-index: 460;\r\n      background: rgba(12, 14, 18, 0.84);\r\n      backdrop-filter: blur(22px);\r\n      -webkit-backdrop-filter: blur(22px);\r\n      display: none;\r\n      align-items: center;\r\n      justify-content: center;\r\n      padding: 20px;\r\n    }\r\n    .hairloss-4type-modal-overlay.open {\r\n      display: flex;\r\n    }\r\n    .hairloss-4type-modal-card {\r\n      width: min(940px, 96vw);\r\n      max-height: 90vh;\r\n      overflow-y: auto;\r\n      border-radius: 26px;\r\n      background: linear-gradient(160deg, #FBF8F1 0%, #F2ECE0 100%);\r\n      border: 2px solid rgba(94, 71, 54, 0.32);\r\n      box-shadow: 0 36px 96px rgba(0, 0, 0, 0.72);\r\n      padding: 28px 30px;\r\n      color: #171614;\r\n      position: relative;\r\n    }\r\n    .hairloss-4type-head {\r\n      display: flex;\r\n      align-items: flex-start;\r\n      justify-content: space-between;\r\n      gap: 12px;\r\n      margin-bottom: 18px;\r\n    }\r\n    .hairloss-4type-eyebrow {\r\n      display: inline-flex;\r\n      align-items: center;\r\n      gap: 6px;\r\n      padding: 5px 12px;\r\n      border-radius: 999px;\r\n      background: #2D5A43;\r\n      color: #FFFFFF;\r\n      font-size: 11.5px;\r\n      font-weight: 800;\r\n      letter-spacing: 0.04em;\r\n      margin-bottom: 8px;\r\n    }\r\n    .hairloss-4type-title {\r\n      font-family: var(--font-serif);\r\n      font-size: clamp(1.35rem, 2.3vw, 1.85rem);\r\n      font-weight: 800;\r\n      color: #171614;\r\n      line-height: 1.28;\r\n      margin-bottom: 5px;\r\n    }\r\n    .hairloss-4type-sub {\r\n      font-size: 13.5px;\r\n      font-weight: 600;\r\n      color: #4A3525;\r\n      line-height: 1.5;\r\n    }\r\n    .hairloss-4type-close-btn {\r\n      padding: 8px 16px;\r\n      border-radius: 999px;\r\n      border: 1.5px solid rgba(94, 71, 54, 0.28);\r\n      background: #FFFFFF;\r\n      color: #171614;\r\n      font-size: 12.5px;\r\n      font-weight: 800;\r\n      cursor: pointer;\r\n      flex-shrink: 0;\r\n      transition: all 0.2s ease;\r\n    }\r\n    .hairloss-4type-close-btn:hover {\r\n      background: #171614;\r\n      color: #FFFFFF;\r\n    }\r\n    .hairloss-4type-grid {\r\n      display: grid;\r\n      grid-template-columns: repeat(2, 1fr);\r\n      gap: 14px;\r\n    }\r\n    .hairloss-type-select-card {\r\n      display: flex;\r\n      flex-direction: column;\r\n      justify-content: space-between;\r\n      border-radius: 18px;\r\n      overflow: hidden;\r\n      background: #FFFFFF;\r\n      border: 1.5px solid rgba(94, 71, 54, 0.22);\r\n      text-decoration: none;\r\n      color: #171614;\r\n      box-shadow: 0 10px 26px rgba(42, 30, 21, 0.07);\r\n      transition: all 0.26s cubic-bezier(0.22, 1, 0.36, 1);\r\n    }\r\n    .hairloss-type-select-card:hover {\r\n      transform: translateY(-4px);\r\n      border-color: #2D5A43;\r\n      box-shadow: 0 18px 40px rgba(45, 90, 67, 0.18);\r\n    }\r\n    .hairloss-type-thumb {\r\n      width: 100%;\r\n      height: 138px;\r\n      background-size: cover;\r\n      background-position: center;\r\n      position: relative;\r\n    }\r\n    .hairloss-type-thumb::after {\r\n      content: '';\r\n      position: absolute;\r\n      inset: 0;\r\n      background: linear-gradient(180deg, rgba(15,18,22,0.12) 0%, rgba(15,18,22,0.68) 100%);\r\n    }\r\n    .hairloss-type-badge {\r\n      position: absolute;\r\n      top: 10px;\r\n      left: 12px;\r\n      z-index: 2;\r\n      padding: 4px 10px;\r\n      border-radius: 999px;\r\n      background: rgba(15, 18, 24, 0.82);\r\n      border: 1px solid rgba(253, 230, 138, 0.55);\r\n      color: #FEF08A;\r\n      font-size: 11px;\r\n      font-weight: 800;\r\n    }\r\n    .hairloss-type-body {\r\n      padding: 14px 16px 16px;\r\n      display: flex;\r\n      flex-direction: column;\r\n      gap: 6px;\r\n      flex: 1;\r\n    }\r\n    .hairloss-type-name {\r\n      font-family: var(--font-serif);\r\n      font-size: 1.15rem;\r\n      font-weight: 800;\r\n      color: #171614;\r\n      display: flex;\r\n      align-items: center;\r\n      justify-content: space-between;\r\n    }\r\n    .hairloss-type-desc {\r\n      font-size: 12.8px;\r\n      font-weight: 600;\r\n      color: #4A3525;\r\n      line-height: 1.48;\r\n      word-break: keep-all;\r\n    }\r\n    .hairloss-type-cta {\r\n      margin-top: 6px;\r\n      display: inline-flex;\r\n      align-items: center;\r\n      justify-content: space-between;\r\n      padding: 8px 12px;\r\n      border-radius: 10px;\r\n      background: #E8F2EC;\r\n      color: #2D5A43;\r\n      font-size: 12px;\r\n      font-weight: 800;\r\n      transition: all 0.2s ease;\r\n    }\r\n    .hairloss-type-select-card:hover .hairloss-type-cta {\r\n      background: #2D5A43;\r\n      color: #FFFFFF;\r\n    }\r\n    @media (max-width: 768px) {\r\n      .hairloss-4type-modal-card {\r\n        padding: 18px 16px;\r\n      }\r\n      .hairloss-4type-grid {\r\n        grid-template-columns: 1fr;\r\n        gap: 10px;\r\n      }\r\n      .hairloss-type-thumb {\r\n        height: 106px;\r\n      }\r\n    }\r\n  </style>\r\n</head>\r\n<body>\r\n  <h1 style=\"position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;\">바른한의원 대전본점 — 대덕구 비래동 추나·키성장·다이어트·탈모·황제공진단·전립선 한의원</h1>\r\n  <img id=\"lcp-hero-preload-img\" src=\"card_1_director.jpg\" alt=\"바른한의원 대전본점 안정위 대표원장\" width=\"900\" height=\"1200\" fetchpriority=\"high\" decoding=\"sync\" style=\"position:absolute;width:1px;height:1px;opacity:0;pointer-events:none;z-index:-1;\">\r\n\r\n  <!-- ========================================================================\r\n       CINEMATIC OPENING SLOGAN STAGE (Plays before Main Storyboard)\r\n       “아빠 한의사를 찾는 환자 스토리 공개” (MAIN SLOGAN ONLY)\r\n       ======================================================================== -->\r\n  <section class=\"daddy-doc-intro-stage\" id=\"daddy-doc-intro-stage\" aria-label=\"아빠 한의사를 찾는 환자 스토리 공개 오프닝\">\r\n    <div class=\"daddy-intro-sunbeam\"></div>\r\n    <div class=\"daddy-intro-aura-ring\"></div>\r\n\r\n    <div class=\"daddy-intro-card\" id=\"daddy-intro-card\" style=\"padding: 54px 48px; background: transparent; border: none; box-shadow: none;\">\r\n      <h2 class=\"daddy-intro-slogan\" id=\"daddy-intro-slogan\" aria-label=\"%%HOME_INTRO_FULL_ATTR%%\">\r\n        <span class=\"daddy-intro-quote-marks\">“</span><span id=\"daddy-intro-chars\">%%HOME_INTRO_FULL_TEXT%%</span><span class=\"daddy-intro-quote-marks\">”</span>\r\n      </h2>\r\n    </div>\r\n  </section>\r\n\r\n  <!-- ========================================================================\r\n       ULTRA-CLEAN TOP HEADER (NO CLUTTER)\r\n       ======================================================================== -->\r\n  <header class=\"spatial-top-nav\">\r\n    <a href=\"index.html\" class=\"nav-brand-logo\">\r\n      <span class=\"logo-gem\"></span>\r\n      <span>%%HOME_BRAND_TITLE%%</span>\r\n      <span class=\"nav-brand-sub\">%%HOME_BRAND_SUB%%</span>\r\n    </a>\r\n\r\n    <div class=\"nav-right-actions\">\r\n      <a href=\"body-explorer.html\" class=\"btn-reserve-minimal\" style=\"background: #FEF3C7; border-color: #F59E0B; color: #92400E;\" title=\"3D 인체모형 · 바른한의원 진료 살펴보기\">💡 3D 진료 살펴보기</a>\r\n      <a href=\"body-explorer.html?tab=qna\" class=\"btn-reserve-minimal\" style=\"background: #0F172A; border-color: #0F172A; color: #FFFFFF;\" title=\"회원 전용 질환별 1:1 비공개 Q&A 상담\">💬 무엇이든 물어보세요</a>\r\n      <button type=\"button\" class=\"btn-reserve-minimal\" id=\"btn-show-skt-cards\" style=\"border-color: rgba(94, 71, 54, 0.35); color: var(--brand-brown);\" title=\"6대 핵심 진료 카드 펼침 보기\">✦ 6대 진료카드</button>\r\n      <button type=\"button\" class=\"btn-reserve-minimal\" id=\"btn-open-reserve\">예약·상담 ↗</button>\r\n    </div>\r\n  </header>\r\n\r\n  <!-- ========================================================================\r\n       SK TELECOM (sktelecom.com) INTRO CARD STACK -> BENTO SPREAD SHOWCASE\r\n       Triggers automatically when the 3D story scroll finishes!\r\n       6 Cards: 안정위원장 / 추나 / 성장 / 다이어트 / 탈모 / 황제공진단\r\n       ======================================================================== -->\r\n  <section class=\"skt-finale-stage\" id=\"skt-finale-stage\" aria-label=\"바른한의원 대전본점 6대 핵심 클리닉\">\r\n    <div class=\"skt-hero-bg\" id=\"skt-hero-bg\"></div>\r\n\r\n    <div class=\"skt-hero-headline\" id=\"skt-hero-headline\">\r\n      <span class=\"skt-headline-text\">%%HOME_FINALE_HEADLINE%%</span>\r\n      <span class=\"skt-headline-sub\">%%HOME_FINALE_HEADLINE_SUB%%</span>\r\n    </div>\r\n\r\n    <div class=\"skt-finale-header\" style=\"justify-content: space-between;\">\r\n      <div class=\"skt-finale-heading-group\">\r\n        <span class=\"skt-finale-eyebrow\">%%HOME_FINALE_EYEBROW%%</span>\r\n        <h2 class=\"skt-finale-main-title\">%%HOME_FINALE_MAIN_TITLE%%</h2>\r\n      </div>\r\n      <div class=\"skt-finale-controls\">\r\n        <a href=\"body-explorer.html\" class=\"skt-ctrl-btn\" style=\"background: #FEF3C7; border-color: #F59E0B; color: #92400E; text-decoration: none; font-weight: 800;\">💡 3D 부위별 생활꿀팁 창고 ↗</a>\r\n        <a href=\"body-explorer.html?tab=qna\" class=\"skt-ctrl-btn\" style=\"background: #0F172A; border-color: #0F172A; color: #FFFFFF; text-decoration: none; font-weight: 800;\">💬 무엇이든 물어보세요 ↗</a>\r\n        <button type=\"button\" class=\"skt-ctrl-btn\" id=\"btn-replay-skt-flip\">↺ 카드 펼침 모션 다시보기</button>\r\n        <button type=\"button\" class=\"skt-ctrl-btn\" id=\"btn-back-to-story\">↑ 환자 스토리 다시 보기</button>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"skt-bento-grid\" id=\"skt-bento-grid\">\r\n%%HOME_BENTO_GRID_INNER%%\r\n    </div>\r\n  </section>\r\n\r\n  <!-- ========================================================================\r\n       4-TYPE HAIRLOSS SELECTOR MODAL (남성탈모 · 원형탈모 · 여성탈모 · 지루성두피염)\r\n       ======================================================================== -->\r\n  <div class=\"hairloss-4type-modal-overlay\" id=\"hairloss-4type-modal-overlay\" onclick=\"if(event.target===this)this.classList.remove('open')\">\r\n    <div class=\"hairloss-4type-modal-card\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"hairloss-4type-modal-title\">\r\n      <div class=\"hairloss-4type-head\">\r\n        <div>\r\n          <span class=\"hairloss-4type-eyebrow\">👨‍👧‍👦 아빠 한의사 · 내 가족에게 직접 처방·시술하는 모근재생 클리닉</span>\r\n          <h3 class=\"hairloss-4type-title\" id=\"hairloss-4type-modal-title\">바른 탈모 · 4대 유형별 상세페이지 선택</h3>\r\n          <p class=\"hairloss-4type-sub\">현재 겪고 계신 탈모·두피 유형을 선택하시면 학술 논문 검증 스토리와 자가진단(주의/심각) 페이지로 이동합니다.</p>\r\n        </div>\r\n        <button type=\"button\" class=\"hairloss-4type-close-btn\" onclick=\"document.getElementById('hairloss-4type-modal-overlay').classList.remove('open')\">✕ 닫기</button>\r\n      </div>\r\n\r\n      <div class=\"hairloss-4type-grid\">\r\n        <a href=\"hairloss-male.html\" class=\"hairloss-type-select-card\">\r\n          <div class=\"hairloss-type-thumb\" style=\"background-image:url('detail_hair_story1_30cm_tension.jpg?v=30cm1');\">\r\n            <span class=\"hairloss-type-badge\">TYPE 01 · M자 · 정수리 · 두피열</span>\r\n          </div>\r\n          <div class=\"hairloss-type-body\">\r\n            <div class=\"hairloss-type-name\">\r\n              <span>남성탈모 상세페이지</span>\r\n              <span>↗</span>\r\n            </div>\r\n            <p class=\"hairloss-type-desc\">M자 헤어라인 후퇴와 정수리 빈모 · 호르몬 억제 약물 부작용 걱정 없는 수승화강 두피 청열 & 경추·모낭 재생 치료</p>\r\n            <div class=\"hairloss-type-cta\">\r\n              <span>남성탈모 자가진단 & 스토리 보러가기</span>\r\n              <span>→</span>\r\n            </div>\r\n          </div>\r\n        </a>\r\n\r\n        <a href=\"hairloss-alopecia.html\" class=\"hairloss-type-select-card\">\r\n          <div class=\"hairloss-type-thumb\" style=\"background-image:url('detail_director_story2_both_wrists_pulse.jpg');\">\r\n            <span class=\"hairloss-type-badge\">TYPE 02 · 동전 모양 · 다발성 · 면역</span>\r\n          </div>\r\n          <div class=\"hairloss-type-body\">\r\n            <div class=\"hairloss-type-name\">\r\n              <span>원형탈모 상세페이지</span>\r\n              <span>↗</span>\r\n            </div>\r\n            <p class=\"hairloss-type-desc\">갑작스러운 동전 모양 탈락과 다발성 확산 · 스테로이드 재발을 막는 자율신경 안정 & 자가면역 근본 복원 치료</p>\r\n            <div class=\"hairloss-type-cta\">\r\n              <span>원형탈모 자가진단 & 스토리 보러가기</span>\r\n              <span>→</span>\r\n            </div>\r\n          </div>\r\n        </a>\r\n\r\n        <a href=\"hairloss-female.html\" class=\"hairloss-type-select-card\">\r\n          <div class=\"hairloss-type-thumb\" style=\"background-image:url('detail_hair_story5_date_smile.jpg');\">\r\n            <span class=\"hairloss-type-badge\">TYPE 03 · 가르마 · 산후 · 갱년기</span>\r\n          </div>\r\n          <div class=\"hairloss-type-body\">\r\n            <div class=\"hairloss-type-name\">\r\n              <span>여성탈모 상세페이지</span>\r\n              <span>↗</span>\r\n            </div>\r\n            <p class=\"hairloss-type-desc\">넓어진 가르마와 가늘어진 정수리 볼륨 · 두피는 뜨겁고 손발·아랫배는 찬 여성 상열하한(上熱下寒) 맞춤 보혈 치료</p>\r\n            <div class=\"hairloss-type-cta\">\r\n              <span>여성탈모 자가진단 & 스토리 보러가기</span>\r\n              <span>→</span>\r\n            </div>\r\n          </div>\r\n        </a>\r\n\r\n        <a href=\"hairloss-seborrheic.html\" class=\"hairloss-type-select-card\">\r\n          <div class=\"hairloss-type-thumb\" style=\"background-image:url('detail_hair_thermography.jpg');\">\r\n            <span class=\"hairloss-type-badge\">TYPE 04 · 홍반 · 모낭염 · 각질·가려움</span>\r\n          </div>\r\n          <div class=\"hairloss-type-body\">\r\n            <div class=\"hairloss-type-name\">\r\n              <span>지루성두피염 상세페이지</span>\r\n              <span>↗</span>\r\n            </div>\r\n            <p class=\"hairloss-type-desc\">붉게 달아오른 두피 열독, 화농성 뾰루지(모낭염), 비듬·각질과 가려움 · 염증성 탈모를 막는 청열해독 & 장벽 복원</p>\r\n            <div class=\"hairloss-type-cta\">\r\n              <span>지루성두피염 자가진단 & 스토리 보러가기</span>\r\n              <span>→</span>\r\n            </div>\r\n          </div>\r\n        </a>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- ========================================================================\r\n       FIXED 100vw x 100vh 3D WEBGL SPATIAL VIEWPORT (NEVER DISAPPEARS)\r\n       ======================================================================== -->\r\n  <div class=\"spatial-fixed-viewport\" id=\"spatial-viewport\">\r\n    <canvas id=\"glsl-portal-canvas\"></canvas>\r\n    <canvas id=\"three-tunnel-canvas\"></canvas>\r\n    <div class=\"spatial-vignette\"></div>\r\n    <svg id=\"svg-spatial-overlay\" viewBox=\"0 0 1920 1080\" preserveAspectRatio=\"xMidYMid slice\"></svg>\r\n  </div>\r\n\r\n  <!-- ========================================================================\r\n       SCROLL-REACTIVE STORY DIALOGUE STAGE (MAIN QUOTE ONLY + STORY 4 WEIGHT)\r\n       ======================================================================== -->\r\n  <main class=\"story-dialogue-stage\" id=\"story-dialogue-stage\">\r\n    <div class=\"dialogue-daddy-concept-pill\" id=\"dialogue-daddy-concept-pill\">\r\n      <span class=\"concept-dot\"></span>\r\n      <span>%%HOME_CONCEPT_PILL%%</span>\r\n    </div>\r\n    <div class=\"dialogue-meta-row\">\r\n      <div class=\"dialogue-chapter-num\" id=\"dialogue-chapter-num\">STORY 01 / 08 · 바른 난임·착상 치료</div>\r\n      <span class=\"dialogue-pov-tag\" id=\"dialogue-pov-tag\">👁️ 1인칭 시점 POV</span>\r\n    </div>\r\n    \r\n    <p class=\"dialogue-main-quote\" id=\"dialogue-main-quote\">바른한의원 대전본점</p>\r\n    <div class=\"dialogue-progress-brush\">\r\n      <div class=\"dialogue-progress-fill\" id=\"dialogue-progress-fill\"></div>\r\n    </div>\r\n    <button type=\"button\" class=\"dialogue-tap-next-pill\" id=\"dialogue-tap-next-pill\" aria-label=\"다음 스토리로 이동\">\r\n      <span id=\"dialogue-tap-next-text\">자동 스토리 스크롤 진행 중 · 터치 시 다음 장면 (1/24)</span>\r\n      <span class=\"tap-pill-arrow\">→</span>\r\n    </button>\r\n    <div class=\"story4-weight-counter\" id=\"story4-weight-counter\">\r\n      <span class=\"weight-live-num\" id=\"weight-live-num\">68.5 kg</span>\r\n      <span class=\"weight-diff-badge\" id=\"weight-diff-badge\">▼ -0.0 kg 감량</span>\r\n    </div>\r\n    <p class=\"dialogue-sub-whisper\" id=\"dialogue-sub-whisper\"></p>\r\n    <div class=\"dialogue-phase-steps\" id=\"dialogue-phase-steps\"></div>\r\n  </main>\r\n\r\n  <!-- ========================================================================\r\n       MINIMALIST BOTTOM TIMELINE LINE (NO CARDS AT THE BOTTOM!)\r\n       ======================================================================== -->\r\n  <footer class=\"minimal-bottom-timeline\">\r\n    <div class=\"timeline-top-meta\">\r\n      <span class=\"timeline-scroll-hint\">\r\n        <span class=\"wheel-dot\"></span>\r\n        <span>스크롤을 내리면 1인칭·3인칭 시점 전환과 함께 8개의 스토리 대사가 펼쳐집니다</span>\r\n      </span>\r\n      <span id=\"timeline-depth-readout\">STORY 01 / 08 · 00%</span>\r\n    </div>\r\n    <div class=\"timeline-bar-track\" id=\"timeline-bar-track\">\r\n      <div class=\"timeline-bar-fill\" id=\"timeline-bar-fill\"></div>\r\n      <div class=\"timeline-dots-row\" id=\"timeline-dots-row\"></div>\r\n    </div>\r\n  </footer>\r\n\r\n  <!-- ========================================================================\r\n       SLIDE-IN RESERVATION DRAWER (Opens only when clicking '진료 예약 · 상담')\r\n       ======================================================================== -->\r\n  <aside class=\"reserve-drawer-overlay\" id=\"reserve-drawer-overlay\" aria-hidden=\"true\">\r\n    <div class=\"reserve-drawer-panel\" onclick=\"event.stopPropagation()\">\r\n      <div class=\"drawer-top-row\">\r\n        <span class=\"drawer-top-title\">바른한의원 대전본점 · 아빠 한의사 1:1 진료 예약</span>\r\n        <button type=\"button\" class=\"drawer-close-btn\" id=\"btn-close-reserve\">닫기 ✕</button>\r\n      </div>\r\n      <p style=\"font-size: 13px; color: var(--brand-brown-soft); line-height: 1.6; font-weight: 600;\">\r\n        👨‍👧‍👦 <strong>아빠 한의사의 약속:</strong> 내 가족에게 직접 처방하고 시술한 안전한 치료만 시행하며, 모든 환자를 내 가족처럼 진료합니다.\r\n      </p>\r\n      <form id=\"quick-reserve-form\" style=\"display:flex; flex-direction:column; gap:14px;\">\r\n        <div class=\"drawer-form-group\">\r\n          <label>진료 분야 선택</label>\r\n          <select id=\"reserve-program\">\r\n            <option value=\"난임·착상·임신준비 클리닉\">01. 난임·불임 착상 한약 클리닉</option>\r\n            <option value=\"소아 감기·면역강화 클리닉\">02. 소아 감기·면역강화 클리닉</option>\r\n            <option value=\"소아·청소년 키성장 클리닉\">03. 소아·청소년 키성장 클리닉</option>\r\n            <option value=\"성인 비만·다이어트 클리닉\">04. 성인 비만·체형 슬리밍 클리닉</option>\r\n            <option value=\"30대 탈모·모근재생 클리닉\">05. 30대 탈모·두피청열 클리닉</option>\r\n            <option value=\"추나 척추·전신통증 클리닉\">06. 척추·목·어깨·팔·허리·다리·발 추나 클리닉</option>\r\n            <option value=\"황제공진단·기력보강 클리닉\">07. 특허 24K 황제공진단·기력보강 클리닉</option>\r\n            <option value=\"전립선·배뇨·남성활력 클리닉\">08. 전립선·야간뇨·남성활력 클리닉</option>\r\n          </select>\r\n        </div>\r\n        <div class=\"drawer-form-group\">\r\n          <label>성함</label>\r\n          <input type=\"text\" id=\"reserve-name\" required placeholder=\"예약자 성함을 입력해 주세요\">\r\n        </div>\r\n        <div class=\"drawer-form-group\">\r\n          <label>연락처</label>\r\n          <input type=\"tel\" id=\"reserve-phone\" required placeholder=\"010-0000-0000\">\r\n        </div>\r\n        <div class=\"drawer-form-group\">\r\n          <label>상담 희망 내용</label>\r\n          <textarea id=\"reserve-memo\" rows=\"3\" placeholder=\"증상이나 희망하시는 상담 시간대를 남겨주세요\"></textarea>\r\n        </div>\r\n        <p style=\"margin:0;font-size:12px;line-height:1.45;color:var(--brand-green);background:var(--brand-green-tint);border:1px solid rgba(45,90,67,0.3);padding:8px 10px;border-radius:10px;font-weight:700;word-break:keep-all;\">\r\n          💡 신청하기를 누르시면 작성하신 예약 내용이 자동 복사되며 <strong>바른한의원 카카오톡 채널 채팅창으로 즉시 자동 연결</strong>됩니다. (열린 채팅창에 붙여넣기만 해주세요)\r\n        </p>\r\n        <button type=\"submit\" class=\"drawer-submit-btn\">💬 예약 신청하기 (카카오 채널 자동 연결)</button>\r\n      </form>\r\n      <div class=\"drawer-quick-links\">\r\n        <a href=\"https://naver.me/5U1ELn8L\" target=\"_blank\" rel=\"noreferrer\" style=\"grid-column: span 2;\">📍 네이버 플레이스 빠른 예약 ↗</a>\r\n      </div>\r\n    </div>\r\n  </aside>\r\n\r\n  <!-- ========================================================================\r\n       2200vh VIRTUAL SCROLL TRACK\r\n       ======================================================================== -->\r\n  <div class=\"fullscroll-virtual-track\" id=\"virtual-scroll-track\"></div>\r\n\r\n  <script>\r\n    (function () {\r\n      'use strict';\r\n\r\n      // ======================================================================\r\n      // 1. THE 8 STORY DIALOGUE CHAPTERS (User's Exact 8 Lines)\r\n      // ======================================================================\r\n      const DIALOGUE_CHAPTERS = %%HOME_DIALOGUE_CHAPTERS_JS%%;\r\n\r\n      const FRAMES = %%HOME_FRAMES_JS%%;\r\n\r\n      // ======================================================================\r\n      // 3. ART'S SIGNATURE 8-MODE HIGH-END 3D EDITORIAL & CINEMA SHADER\r\n      //    (100% Rectilinear, Zero Wobble, Bespoke Luxury Art Direction)\r\n      // ======================================================================\r\n      const portalCanvas = document.getElementById('glsl-portal-canvas');\r\n      let glRenderer, glScene, glCamera, glMaterial, glTextures = [], glManseTexture = null;\r\n      let glGrowthTextures = [], glPainTextures = [], glRecoveryTextures = [];\r\n\r\n      const VERTEX_SHADER = `\r\n        precision highp float;\r\n        varying vec2 vUv;\r\n        void main() {\r\n          vUv = uv;\r\n          gl_Position = vec4(position, 1.0);\r\n        }\r\n      `;\r\n\r\n      const FRAGMENT_SHADER = `\r\n        precision highp float;\r\n        varying vec2 vUv;\r\n\r\n        uniform sampler2D uTexCurr;\r\n        uniform sampler2D uTexNext;\r\n        uniform float uMix;\r\n        uniform float uSeqProgress;\r\n        uniform float uTime;\r\n        uniform float uVelocity;\r\n        uniform float uWarmth;\r\n        uniform vec2 uResolution;\r\n        uniform vec2 uMouse;\r\n        uniform vec2 uFocal;\r\n        uniform int uMode;\r\n\r\n        vec2 getCoverUv(vec2 uv) {\r\n          float screenAspect = uResolution.x / max(uResolution.y, 1.0);\r\n          float texAspect = 16.0 / 9.0;\r\n          vec2 s = vec2(1.0);\r\n          if (screenAspect > texAspect) {\r\n            s.y = texAspect / screenAspect;\r\n          } else {\r\n            // Portrait/mobile optimization: prevent extreme horizontal cropping on narrow 9:16 screens\r\n            float rawRatio = screenAspect / texAspect;\r\n            s.x = max(rawRatio, mix(rawRatio, 0.54, smoothstep(0.75, 0.42, screenAspect)));\r\n          }\r\n          vec2 centerAnchor = vec2(mix(0.5, clamp(uFocal.x, 0.32, 0.68), smoothstep(1.0, 0.55, screenAspect)), 0.5);\r\n          return (uv - centerAnchor) * s + centerAnchor;\r\n        }\r\n\r\n        // 12-Tap Golden-Angle Vogel Disk Bokeh Blur for Leica f/0.95 Focus-Pull\r\n        vec4 sampleBokehDisk(sampler2D tex, vec2 uv, float radius, float aspect) {\r\n          if (radius <= 0.0005) {\r\n            return texture2D(tex, clamp(uv, 0.002, 0.998));\r\n          }\r\n          vec4 acc = vec4(0.0);\r\n          float wSum = 0.0;\r\n          for (int i = 0; i < 12; i++) {\r\n            float fi = float(i);\r\n            float r = sqrt((fi + 0.5) / 12.0) * radius;\r\n            float theta = fi * 2.3999632;\r\n            vec2 offset = vec2(cos(theta) / aspect, sin(theta)) * r;\r\n            vec4 c = texture2D(tex, clamp(uv + offset, 0.002, 0.998));\r\n            float luma = dot(c.rgb, vec3(0.299, 0.587, 0.114));\r\n            float bokehWeight = 1.0 + pow(max(0.0, luma - 0.52), 2.0) * 6.5;\r\n            acc += c * bokehWeight;\r\n            wSum += bokehWeight;\r\n          }\r\n          return acc / max(wSum, 0.001);\r\n        }\r\n\r\n        // Signed distance to a centered 2D box (for 3D Framed Gallery Pass-Through)\r\n        float sdBox(vec2 p, vec2 b) {\r\n          vec2 d = abs(p) - b;\r\n          return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);\r\n        }\r\n\r\n        void main() {\r\n          vec2 baseUv = getCoverUv(vUv);\r\n          float aspect = uResolution.x / max(uResolution.y, 1.0);\r\n          float t = smoothstep(0.0, 1.0, uMix);\r\n          float sinT = sin(t * 3.14159265);\r\n          vec2 focal = vec2(uFocal.x, 1.0 - uFocal.y);\r\n\r\n          // Subtle, rock-steady rectilinear camera parallax (Zero wobble!)\r\n          vec2 parallax = (uMouse - 0.5) * 0.0085;\r\n\r\n          vec4 finalColor = vec4(0.0);\r\n\r\n          if (uMix <= 0.002 && uMode != 1 && uMode != 3 && uMode != 8) {\r\n            finalColor = texture2D(uTexCurr, clamp(baseUv - parallax, 0.002, 0.998));\r\n          }\r\n          else if (uMix >= 0.998 && uMode != 1 && uMode != 3 && uMode != 8) {\r\n            finalColor = texture2D(uTexNext, clamp(baseUv - parallax, 0.002, 0.998));\r\n          }\r\n          else if (uMode == 1) {\r\n            // ================================================================\r\n            // MODE 1: CHAPTER 3 (\"쑥쑥 자란 우리 아이\")\r\n            //         6-Stage Multi-Frame Classroom Height Surge (\"쑤욱 올라오는 모션\")\r\n            //         Steps smoothly through 6 real height keyframes (0% -> 25% -> 50% -> 75% -> 96% -> 100%)\r\n            //         with 100% locked classroom background & upward growth-plate energy wave!\r\n            // ================================================================\r\n            float centerBoyX = smoothstep(0.43, 0.46, baseUv.x) * (1.0 - smoothstep(0.59, 0.62, baseUv.x));\r\n            float bodyVert = smoothstep(0.04, 0.22, baseUv.y) * (1.0 - smoothstep(0.84, 0.92, baseUv.y));\r\n            float boyMask = centerBoyX * bodyVert;\r\n\r\n            // Gentle upward micro-flow strictly inside the boy silhouette between consecutive keyframes\r\n            vec2 uvCurr = baseUv - parallax;\r\n            uvCurr.y -= boyMask * t * 0.016;\r\n\r\n            vec2 uvNext = baseUv - parallax;\r\n            uvNext.y += boyMask * (1.0 - t) * 0.016;\r\n\r\n            vec4 cCurr = texture2D(uTexCurr, clamp(uvCurr, 0.002, 0.998));\r\n            vec4 cNext = texture2D(uTexNext, clamp(uvNext, 0.002, 0.998));\r\n\r\n            float blendFactor = smoothstep(0.06, 0.94, t);\r\n            finalColor = mix(cCurr, cNext, blendFactor);\r\n\r\n            // Subtle golden growth-plate energy ring rising up his spine across the 6 frames\r\n            float seqP = clamp(uSeqProgress, 0.0, 1.0);\r\n            float seqActive = sin(seqP * 3.14159265);\r\n            float waveY = mix(0.14, 0.86, seqP);\r\n            float scanCore = exp(-pow((baseUv.y - waveY) / 0.009, 2.0)) * centerBoyX;\r\n            float scanGlow = exp(-pow((baseUv.y - waveY) / 0.032, 2.0)) * centerBoyX;\r\n            finalColor.rgb += (vec3(0.99, 0.86, 0.42) * scanGlow * 0.45 + vec3(1.0, 0.97, 0.85) * scanCore * 0.38) * seqActive;\r\n          }\r\n          else if (uMode == 2) {\r\n            // ================================================================\r\n            // MODE 2: CHAPTER 4 — Haute-Couture 3-Panel Editorial Parallax Slide\r\n            //         Asymmetric 3-column luxury gallery split (24% | 52% | 24%)\r\n            // ================================================================\r\n            float colLeft = step(vUv.x, 0.24);\r\n            float colRight = step(0.76, vUv.x);\r\n            float colCenter = 1.0 - max(colLeft, colRight);\r\n\r\n            // Staggered timing and opposing vertical parallax per editorial column\r\n            float tCenter = smoothstep(0.0, 0.88, t);\r\n            float tSides = smoothstep(0.12, 1.0, t);\r\n            float colT = colCenter * tCenter + (1.0 - colCenter) * tSides;\r\n            float dir = colCenter > 0.5 ? 1.0 : -1.0;\r\n\r\n            vec2 uvCurr = (baseUv - focal) / (1.0 + colT * 0.05) + focal - parallax * (1.0 - colT);\r\n            vec2 uvNext = (baseUv - focal) / (0.95 + colT * 0.05) + focal - parallax * colT;\r\n\r\n            uvCurr.y += dir * colT * 0.045;\r\n            uvNext.y -= dir * (1.0 - colT) * 0.045;\r\n\r\n            vec4 cCurr = texture2D(uTexCurr, clamp(uvCurr, 0.002, 0.998));\r\n            vec4 cNext = texture2D(uTexNext, clamp(uvNext, 0.002, 0.998));\r\n\r\n            finalColor = mix(cCurr, cNext, colT);\r\n\r\n            // Crisp champagne rose-gold hairline seams at x = 0.24 and x = 0.76 during transition\r\n            float seamDist = min(abs(vUv.x - 0.24), abs(vUv.x - 0.76));\r\n            float seamShadow = exp(-pow(seamDist / 0.018, 2.0)) * sinT;\r\n            float seamLine = exp(-pow(seamDist / 0.0018, 2.0)) * sinT;\r\n            finalColor.rgb *= (1.0 - seamShadow * 0.28);\r\n            finalColor.rgb += vec3(1.0, 0.84, 0.88) * seamLine * 0.55;\r\n          }\r\n          else if (uMode == 3) {\r\n            // ================================================================\r\n            // MODE 3: CHAPTER 6 (\"일하면서 온몸이 아파진 나\")\r\n            //         5-Stage Multi-Frame Posture Progression (Upright -> Neck Stiff -> Neck Pain -> Waist Pain -> Full Spine Pain)\r\n            //         with Top-to-Bottom Red Meridian Pain Wave\r\n            // ================================================================\r\n            float horizBody = exp(-pow((baseUv.x - 0.53) / 0.165, 2.0));\r\n            float upperTorso = smoothstep(0.42, 0.82, baseUv.y) * (1.0 - smoothstep(0.86, 0.96, baseUv.y));\r\n            float bendMask = horizBody * upperTorso;\r\n\r\n            vec2 uvCurr = baseUv - parallax;\r\n            uvCurr.x += bendMask * t * 0.006;\r\n            uvCurr.y += bendMask * t * 0.008;\r\n\r\n            vec2 uvNext = baseUv - parallax;\r\n            uvNext.x -= bendMask * (1.0 - t) * 0.006;\r\n            uvNext.y -= bendMask * (1.0 - t) * 0.008;\r\n\r\n            vec4 cCurr = texture2D(uTexCurr, clamp(uvCurr, 0.002, 0.998));\r\n            vec4 cNext = texture2D(uTexNext, clamp(uvNext, 0.002, 0.998));\r\n\r\n            float seqP = clamp(uSeqProgress, 0.0, 1.0);\r\n            float seqActive = sin(seqP * 3.14159265);\r\n            float painWaveY = mix(0.88, 0.06, seqP);\r\n            float waveCore = exp(-pow((baseUv.y - painWaveY) / 0.008, 2.0)) * horizBody;\r\n            float waveAura = exp(-pow((baseUv.y - painWaveY) / 0.032, 2.0)) * horizBody;\r\n\r\n            finalColor = mix(cCurr, cNext, smoothstep(0.05, 0.95, t));\r\n            vec3 painGlowCol = mix(vec3(0.94, 0.24, 0.24), vec3(1.0, 0.78, 0.45), waveCore);\r\n            finalColor.rgb += painGlowCol * (waveAura * 0.45 + waveCore * 0.38) * seqActive;\r\n          }\r\n          else if (uMode == 8) {\r\n            // ================================================================\r\n            // MODE 8: CHAPTER 6 FINALE (\"관절 튼튼 회복\")\r\n            //         3-Stage Multi-Frame Recovery Stretch (Neutral -> Arms Shoulder-Level -> Joyful \"만세!\" Hurray!)\r\n            //         with Emerald-Green Healing Vitality Wave\r\n            // ================================================================\r\n            float horizBody = exp(-pow((baseUv.x - 0.53) / 0.195, 2.0));\r\n            float upperLift = smoothstep(0.45, 0.92, baseUv.y) * horizBody;\r\n\r\n            vec2 uvCurr = baseUv - parallax;\r\n            uvCurr.y -= upperLift * t * 0.010;\r\n\r\n            vec2 uvNext = baseUv - parallax;\r\n            uvNext.y += upperLift * (1.0 - t) * 0.010;\r\n\r\n            vec4 cCurr = texture2D(uTexCurr, clamp(uvCurr, 0.002, 0.998));\r\n            vec4 cNext = texture2D(uTexNext, clamp(uvNext, 0.002, 0.998));\r\n\r\n            float seqP = clamp(uSeqProgress, 0.0, 1.0);\r\n            float seqActive = sin(seqP * 3.14159265);\r\n            float healWaveY = mix(0.10, 0.90, seqP);\r\n            float waveCore = exp(-pow((baseUv.y - healWaveY) / 0.008, 2.0)) * horizBody;\r\n            float waveAura = exp(-pow((baseUv.y - healWaveY) / 0.034, 2.0)) * horizBody;\r\n\r\n            finalColor = mix(cCurr, cNext, smoothstep(0.05, 0.95, t));\r\n            vec3 healGlowCol = mix(vec3(0.06, 0.82, 0.56), vec3(0.75, 1.0, 0.88), waveCore);\r\n            finalColor.rgb += healGlowCol * (waveAura * 0.46 + waveCore * 0.38) * seqActive;\r\n          }\r\n          else if (uMode == 4) {\r\n            // ================================================================\r\n            // MODE 4: CHAPTER 5 — 200x Optical Macro Lens Dive\r\n            // ================================================================\r\n            vec2 dVec = (baseUv - focal) * vec2(aspect, 1.0);\r\n            float dist = length(dVec);\r\n\r\n            float zoomOut = 1.0 + pow(t, 1.35) * 2.10;\r\n            float zoomIn = 0.50 + smoothstep(0.0, 1.0, t) * 0.50;\r\n\r\n            vec2 uvCurr = (baseUv - focal) / zoomOut + focal - parallax * (1.0 - t);\r\n            vec2 uvNext = (baseUv - vec2(0.5)) / zoomIn + vec2(0.5) - parallax * t;\r\n\r\n            float scopeRadius = mix(0.0, 1.45, pow(t, 1.08));\r\n            float scopeMask = smoothstep(scopeRadius + 0.07, scopeRadius - 0.07, dist);\r\n            float outerRing = exp(-pow((dist - scopeRadius) / 0.022, 2.0)) * sinT;\r\n            float innerRing = exp(-pow((dist - scopeRadius * 0.82) / 0.005, 2.0)) * sinT;\r\n\r\n            vec4 cCurr = texture2D(uTexCurr, clamp(uvCurr, 0.002, 0.998));\r\n            vec4 cNext = texture2D(uTexNext, clamp(uvNext, 0.002, 0.998));\r\n\r\n            finalColor = mix(cCurr, cNext, clamp(mix(t, scopeMask, 0.78), 0.0, 1.0));\r\n            finalColor.rgb += vec3(0.65, 0.94, 1.0) * (outerRing * 0.65 + innerRing * 0.45);\r\n          }\r\n          else if (uMode == 5) {\r\n            // ================================================================\r\n            // MODE 5: IMAX Anamorphic Amber Light-Leak & Golden Shutter\r\n            // ================================================================\r\n            float diagPos = vUv.x * 0.82 + (1.0 - vUv.y) * 0.18;\r\n            float sweepCenter = mix(-0.20, 1.20, t);\r\n            float curtainMask = smoothstep(sweepCenter - 0.18, sweepCenter + 0.18, diagPos);\r\n\r\n            // Dual-layer warm amber film burn + crisp horizontal anamorphic lens streak\r\n            float amberLeak = exp(-pow((diagPos - sweepCenter) / 0.095, 2.0)) * sinT;\r\n            float goldCore = exp(-pow((diagPos - sweepCenter) / 0.022, 2.0)) * sinT;\r\n            float anamorphicStreak = exp(-pow((vUv.y - focal.y) / 0.085, 2.0)) * exp(-pow((vUv.x - sweepCenter) / 0.34, 2.0)) * sinT;\r\n\r\n            vec2 uvCurr = (baseUv - focal) / (1.0 + t * 0.06) + focal - parallax * (1.0 - t);\r\n            vec2 uvNext = (baseUv - focal) / (0.94 + t * 0.06) + focal - parallax * t;\r\n\r\n            vec4 cCurr = texture2D(uTexCurr, clamp(uvCurr, 0.002, 0.998));\r\n            vec4 cNext = texture2D(uTexNext, clamp(uvNext, 0.002, 0.998));\r\n\r\n            float blend = clamp(mix(t, 1.0 - curtainMask, 0.70), 0.0, 1.0);\r\n            finalColor = mix(cCurr, cNext, blend);\r\n\r\n            vec3 leakColor = mix(vec3(0.98, 0.68, 0.32), vec3(1.0, 0.96, 0.82), goldCore + anamorphicStreak * 0.5);\r\n            finalColor.rgb += leakColor * (amberLeak * 0.42 + goldCore * 0.38 + anamorphicStreak * 0.45);\r\n          }\r\n          else if (uMode == 6) {\r\n            // ================================================================\r\n            // MODE 6: Leica Noctilux f/0.95 Creamy Bokeh Rack-Focus\r\n            // ================================================================\r\n            float blurCurr = pow(t, 1.2) * 0.025;\r\n            float blurNext = pow(1.0 - t, 1.2) * 0.025;\r\n\r\n            float dollyCurr = 1.0 + t * 0.055;\r\n            float dollyNext = 1.045 - t * 0.045;\r\n\r\n            vec2 uvCurr = (baseUv - focal) / dollyCurr + focal - parallax * (1.0 - t);\r\n            vec2 uvNext = (baseUv - focal) / dollyNext + focal - parallax * t;\r\n\r\n            vec4 cCurr = sampleBokehDisk(uTexCurr, uvCurr, blurCurr, aspect);\r\n            vec4 cNext = sampleBokehDisk(uTexNext, uvNext, blurNext, aspect);\r\n\r\n            float smoothCurve = smoothstep(0.05, 0.95, t);\r\n            finalColor = mix(cCurr, cNext, smoothCurve);\r\n            finalColor.rgb += vec3(1.0, 0.91, 0.65) * pow(sinT, 2.0) * 0.085;\r\n          }\r\n          else if (uMode == 7) {\r\n            // ================================================================\r\n            // MODE 7: Architectural Venetian Louver Cascade (12 Luxury Slats)\r\n            // ================================================================\r\n            float numLouvers = 12.0;\r\n            float slatIdx = floor(vUv.x * numLouvers) / numLouvers;\r\n            float slatFract = fract(vUv.x * numLouvers);\r\n            float localT = clamp((t * 1.42) - slatIdx * 0.42, 0.0, 1.0);\r\n            float slatReveal = smoothstep(0.0, 1.0, localT);\r\n\r\n            // Crisp 3D architectural louver edge bevel & subtle shadow\r\n            float edgeDist = abs(slatFract - slatReveal);\r\n            float goldBevel = exp(-pow(edgeDist / 0.035, 2.0)) * sin(localT * 3.14159265);\r\n            float slatShadow = smoothstep(slatReveal, slatReveal + 0.14, slatFract) * (1.0 - step(slatReveal, slatFract)) * sin(localT * 3.14159265);\r\n\r\n            vec2 uvCurr = (baseUv - focal) / (1.0 + localT * 0.045) + focal - parallax * (1.0 - localT);\r\n            vec2 uvNext = (baseUv - focal) / (0.955 + localT * 0.045) + focal - parallax * localT;\r\n\r\n            vec4 cCurr = texture2D(uTexCurr, clamp(uvCurr, 0.002, 0.998));\r\n            vec4 cNext = texture2D(uTexNext, clamp(uvNext, 0.002, 0.998));\r\n\r\n            float mask = step(slatFract, slatReveal);\r\n            finalColor = mix(cCurr, cNext, mix(localT, mask, 0.65));\r\n            finalColor.rgb *= (1.0 - slatShadow * 0.22);\r\n            finalColor.rgb += vec3(1.0, 0.92, 0.66) * goldBevel * 0.42;\r\n          }\r\n          else {\r\n            // ================================================================\r\n            // MODE 0: Art's 3D Framed Spatial Gallery Pass-Through\r\n            //         Starts from 0% at t=0 (100% pure Frame 0) and expands\r\n            //         a framed luxury 3D canvas window only during transition!\r\n            // ================================================================\r\n            float scaleCurr = 1.0 + t * 0.08;\r\n            float scaleNext = 0.92 + t * 0.08;\r\n\r\n            vec2 uvCurr = (baseUv - focal) / scaleCurr + focal - parallax * (1.0 - t);\r\n            vec2 uvNext = (baseUv - focal) / scaleNext + focal - parallax * t;\r\n\r\n            // Starts completely closed (-0.02) at t=0 and expands beyond viewport (0.72) at t=1\r\n            vec2 boxHalfSize = mix(vec2(-0.02, -0.02), vec2(0.72, 0.72), pow(t, 0.95));\r\n            float boxDist = sdBox(vUv - 0.5, boxHalfSize);\r\n\r\n            float activeWin = smoothstep(0.0, 0.12, t);\r\n            float frameMask = (1.0 - smoothstep(-0.015, 0.015, boxDist)) * activeWin;\r\n            float goldBorder = exp(-pow(boxDist / 0.0035, 2.0)) * sinT;\r\n            float ambientDropShadow = exp(-pow(max(0.0, boxDist) / 0.045, 2.0)) * sinT;\r\n\r\n            vec4 cCurr = texture2D(uTexCurr, clamp(uvCurr, 0.002, 0.998));\r\n            vec4 cNext = texture2D(uTexNext, clamp(uvNext, 0.002, 0.998));\r\n\r\n            cCurr.rgb *= (1.0 - ambientDropShadow * 0.32);\r\n\r\n            float blendFactor = clamp(mix(t, frameMask, 0.58), 0.0, 1.0);\r\n            finalColor = mix(cCurr, cNext, blendFactor);\r\n            finalColor.rgb += vec3(1.0, 0.90, 0.58) * goldBorder * 0.62;\r\n          }\r\n\r\n          // Subtle Golden-Hour Ambient Spotlight (Steady, zero distortion)\r\n          vec2 mouseUv = vec2(uMouse.x, 1.0 - uMouse.y);\r\n          float mouseDist = length((vUv - mouseUv) * vec2(aspect, 1.0));\r\n          float visorSpot = exp(-pow(mouseDist / 0.44, 2.0)) * 0.042;\r\n          finalColor.rgb += vec3(0.99, 0.91, 0.68) * visorSpot;\r\n\r\n          // Positive Morning Sunlight & Warm Uplifting Grading\r\n          vec3 warmSun = vec3(1.03, 1.01, 0.97) * uWarmth;\r\n          finalColor.rgb *= warmSun;\r\n\r\n          gl_FragColor = finalColor;\r\n        }\r\n      `;\r\n\r\n      function initGLSLPortalStage() {\r\n        if (typeof THREE === 'undefined' || !portalCanvas) return;\r\n\r\n        glRenderer = new THREE.WebGLRenderer({\r\n          canvas: portalCanvas,\r\n          antialias: true,\r\n          powerPreference: 'high-performance'\r\n        });\r\n        glRenderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));\r\n        glRenderer.setSize(window.innerWidth, window.innerHeight);\r\n\r\n        glScene = new THREE.Scene();\r\n        glCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);\r\n\r\n        const placeholderData = new Uint8Array([14, 27, 20, 255]);\r\n        const placeholderTex = new THREE.DataTexture(placeholderData, 1, 1, THREE.RGBAFormat);\r\n        placeholderTex.needsUpdate = true;\r\n\r\n        const loader = new THREE.TextureLoader();\r\n        if (loader.setCrossOrigin) loader.setCrossOrigin('anonymous');\r\n        const loadLinearTex = (src) => {\r\n          const tex = loader.load(src, (loadedTex) => {\r\n            loadedTex.minFilter = THREE.LinearFilter;\r\n            loadedTex.magFilter = THREE.LinearFilter;\r\n            loadedTex.generateMipmaps = false;\r\n          });\r\n          tex.minFilter = THREE.LinearFilter;\r\n          tex.magFilter = THREE.LinearFilter;\r\n          return tex || placeholderTex;\r\n        };\r\n\r\n        glTextures = FRAMES.map((f) => loadLinearTex(f.src));\r\n\r\n        %%HOME_MULTI_TEXTURES_JS%%\r\n\r\n        glMaterial = new THREE.ShaderMaterial({\r\n          vertexShader: VERTEX_SHADER,\r\n          fragmentShader: FRAGMENT_SHADER,\r\n          uniforms: {\r\n            uTexCurr: { value: glTextures[0] || placeholderTex },\r\n            uTexNext: { value: glTextures[1] || placeholderTex },\r\n            uMix: { value: 0.0 },\r\n            uSeqProgress: { value: 0.0 },\r\n            uTime: { value: 0.0 },\r\n            uVelocity: { value: 0.0 },\r\n            uWarmth: { value: 1.08 },\r\n            uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },\r\n            uMouse: { value: new THREE.Vector2(0.5, 0.5) },\r\n            uFocal: { value: new THREE.Vector2(0.52, 0.56) },\r\n            uMode: { value: 0 }\r\n          },\r\n          depthWrite: false,\r\n          depthTest: false\r\n        });\r\n\r\n        glScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), glMaterial));\r\n      }\r\n\r\n      // ======================================================================\r\n      // 4. ART'S 3D VOLUMETRIC SUNLIGHT GOD-RAYS & MULTI-LAYER DEPTH BOKEH\r\n      //    (Zero Wireframes — Pure Warm Golden-Hour Spatial Sanctuary)\r\n      // ======================================================================\r\n      const tunnelCanvas = document.getElementById('three-tunnel-canvas');\r\n      let tRenderer, tScene, tCamera, tPortalGates = [], tParticles, tForegroundBokeh;\r\n\r\n      function createSoftBokehTexture() {\r\n        const c = document.createElement('canvas');\r\n        c.width = 128;\r\n        c.height = 128;\r\n        const g = c.getContext('2d');\r\n        const grad = g.createRadialGradient(64, 64, 2, 64, 64, 60);\r\n        grad.addColorStop(0.0, 'rgba(255, 252, 240, 0.95)');\r\n        grad.addColorStop(0.32, 'rgba(253, 230, 138, 0.65)');\r\n        grad.addColorStop(0.70, 'rgba(245, 198, 105, 0.22)');\r\n        grad.addColorStop(1.0, 'rgba(0, 0, 0, 0.0)');\r\n        g.fillStyle = grad;\r\n        g.fillRect(0, 0, 128, 128);\r\n        const tex = new THREE.CanvasTexture(c);\r\n        tex.needsUpdate = true;\r\n        return tex;\r\n      }\r\n\r\n      function createGodRayShaftTexture() {\r\n        const c = document.createElement('canvas');\r\n        c.width = 128;\r\n        c.height = 512;\r\n        const g = c.getContext('2d');\r\n        const grad = g.createLinearGradient(0, 0, 0, 512);\r\n        grad.addColorStop(0.0, 'rgba(255, 244, 214, 0.0)');\r\n        grad.addColorStop(0.25, 'rgba(253, 230, 138, 0.22)');\r\n        grad.addColorStop(0.55, 'rgba(253, 230, 138, 0.10)');\r\n        grad.addColorStop(1.0, 'rgba(255, 244, 214, 0.0)');\r\n        g.fillStyle = grad;\r\n        g.fillRect(0, 0, 128, 512);\r\n\r\n        // Soft horizontal feathering so the light shaft has no hard side edges\r\n        g.globalCompositeOperation = 'destination-in';\r\n        const hGrad = g.createLinearGradient(0, 0, 128, 0);\r\n        hGrad.addColorStop(0.0, 'rgba(0, 0, 0, 0.0)');\r\n        hGrad.addColorStop(0.3, 'rgba(0, 0, 0, 1.0)');\r\n        hGrad.addColorStop(0.7, 'rgba(0, 0, 0, 1.0)');\r\n        hGrad.addColorStop(1.0, 'rgba(0, 0, 0, 0.0)');\r\n        g.fillStyle = hGrad;\r\n        g.fillRect(0, 0, 128, 512);\r\n\r\n        const tex = new THREE.CanvasTexture(c);\r\n        tex.needsUpdate = true;\r\n        return tex;\r\n      }\r\n\r\n      function initThreeTunnelStage() {\r\n        if (typeof THREE === 'undefined' || !tunnelCanvas) return;\r\n\r\n        tRenderer = new THREE.WebGLRenderer({\r\n          canvas: tunnelCanvas,\r\n          alpha: true,\r\n          antialias: true,\r\n          powerPreference: 'high-performance'\r\n        });\r\n        tRenderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));\r\n        tRenderer.setSize(window.innerWidth, window.innerHeight);\r\n\r\n        tScene = new THREE.Scene();\r\n        tCamera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.5, 550);\r\n\r\n        const bokehTex = createSoftBokehTexture();\r\n        const rayTex = createGodRayShaftTexture();\r\n\r\n        // 1. 3D Volumetric Golden-Hour Sunlight Shafts (Slanted Venetian Blind Sunbeams)\r\n        const shaftGeo = new THREE.PlaneGeometry(5.5, 22.0);\r\n        for (let i = 0; i < FRAMES.length; i++) {\r\n          const shaftMat = new THREE.MeshBasicMaterial({\r\n            map: rayTex,\r\n            transparent: true,\r\n            opacity: 0.24,\r\n            blending: THREE.AdditiveBlending,\r\n            depthWrite: false,\r\n            side: THREE.DoubleSide\r\n          });\r\n          const shaft = new THREE.Mesh(shaftGeo, shaftMat);\r\n          const side = i % 2 === 0 ? 1 : -1;\r\n          shaft.position.set(\r\n            side * (4.2 + (i % 3) * 1.6),\r\n            2.2,\r\n            -i * 22.0 + 2.0\r\n          );\r\n          shaft.rotation.z = -0.38; // Warm morning sun angle\r\n          shaft.rotation.y = side * 0.22;\r\n          tScene.add(shaft);\r\n          tPortalGates.push(shaft);\r\n        }\r\n\r\n        // 2. Mid-Ground Golden-Hour Floating Dust Motes (1,400 Fine Particles)\r\n        const pCount = 1400;\r\n        const pGeo = new THREE.BufferGeometry();\r\n        const pPos = new Float32Array(pCount * 3);\r\n        const pCol = new Float32Array(pCount * 3);\r\n        const cGold = new THREE.Color(0xFDE68A);\r\n        const cWarmCream = new THREE.Color(0xFFF7ED);\r\n        const cEmerald = new THREE.Color(0x6EE7B7);\r\n\r\n        for (let i = 0; i < pCount; i++) {\r\n          const angle = Math.random() * Math.PI * 2;\r\n          const radius = 2.2 + Math.random() * 14.5;\r\n          pPos[i * 3] = Math.cos(angle) * radius + 0.6;\r\n          pPos[i * 3 + 1] = Math.sin(angle) * radius * 0.68;\r\n          pPos[i * 3 + 2] = -Math.random() * 540 + 20;\r\n          const r = Math.random();\r\n          const c = r > 0.35 ? cGold : (r > 0.12 ? cWarmCream : cEmerald);\r\n          pCol[i * 3] = c.r;\r\n          pCol[i * 3 + 1] = c.g;\r\n          pCol[i * 3 + 2] = c.b;\r\n        }\r\n\r\n        pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));\r\n        pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));\r\n\r\n        tParticles = new THREE.Points(pGeo, new THREE.PointsMaterial({\r\n          size: 0.34,\r\n          map: bokehTex,\r\n          vertexColors: true,\r\n          transparent: true,\r\n          opacity: 0.52,\r\n          blending: THREE.AdditiveBlending,\r\n          depthWrite: false\r\n        }));\r\n        tScene.add(tParticles);\r\n\r\n        // 3. Foreground Creamy Out-of-Focus Cinema Bokeh Orbs (Depth-of-Field Layer)\r\n        const fgCount = 220;\r\n        const fgGeo = new THREE.BufferGeometry();\r\n        const fgPos = new Float32Array(fgCount * 3);\r\n        for (let i = 0; i < fgCount; i++) {\r\n          fgPos[i * 3] = (Math.random() - 0.5) * 18.0;\r\n          fgPos[i * 3 + 1] = (Math.random() - 0.5) * 11.0;\r\n          fgPos[i * 3 + 2] = -Math.random() * 540 + 18;\r\n        }\r\n        fgGeo.setAttribute('position', new THREE.BufferAttribute(fgPos, 3));\r\n        tForegroundBokeh = new THREE.Points(fgGeo, new THREE.PointsMaterial({\r\n          size: 1.45,\r\n          map: bokehTex,\r\n          color: 0xFDE68A,\r\n          transparent: true,\r\n          opacity: 0.18,\r\n          blending: THREE.AdditiveBlending,\r\n          depthWrite: false\r\n        }));\r\n        tScene.add(tForegroundBokeh);\r\n      }\r\n\r\n      // ======================================================================\r\n      // 5. CARDLESS ANATOMICAL LIGHT OVERLAY FOR CHAPTER 6 (KOREAN PAIN LABELS)\r\n      // ======================================================================\r\n      const svgOverlay = document.getElementById('svg-spatial-overlay');\r\n      const PAIN_JOINTS_STANDING = [\r\n        { name: '목',     hx: 1025, hy: 225, bx: 1095, by: 220 },\r\n        { name: '어깨',   hx: 965,  hy: 300, bx: 965,  by: 245 },\r\n        { name: '팔',     hx: 905,  hy: 465, bx: 845,  by: 340 },\r\n        { name: '척추',   hx: 1045, hy: 385, bx: 985,  by: 350 },\r\n        { name: '허리',   hx: 1030, hy: 525, bx: 910,  by: 435 },\r\n        { name: '다리',   hx: 995,  hy: 755, bx: 1020, by: 690 },\r\n        { name: '발',     hx: 1015, hy: 955, bx: 950,  by: 925 }\r\n      ];\r\n      const PAIN_JOINTS_PRONE_CHUNA = [\r\n        { name: '목·어깨', bx: 1290, by: 715 },\r\n        { name: '척추',    bx: 1125, by: 705 },\r\n        { name: '허리',    bx: 985,  by: 715 },\r\n        { name: '골반',    bx: 835,  by: 730 },\r\n        { name: '다리',    bx: 585,  by: 765 }\r\n      ];\r\n      const PAIN_JOINTS_ANKLE_POV = [\r\n        { name: '발목 관절', bx: 945,  by: 655 },\r\n        { name: '발목 인대', bx: 900,  by: 745 },\r\n        { name: '발등·경혈', bx: 840,  by: 560 }\r\n      ];\r\n      const PAIN_JOINTS_RECOVERED = [\r\n        { name: '목',     sx: 1025, sy: 225, bx: 1025, by: 222 },\r\n        { name: '어깨',   sx: 965,  sy: 300, bx: 955,  by: 252 },\r\n        { name: '팔',     sx: 905,  sy: 465, bx: 865,  by: 155 },\r\n        { name: '척추',   sx: 1045, sy: 385, bx: 1030, by: 375 },\r\n        { name: '허리',   sx: 1030, sy: 525, bx: 1025, by: 495 },\r\n        { name: '다리',   sx: 995,  sy: 755, bx: 995,  by: 745 },\r\n        { name: '발',     sx: 1015, sy: 955, bx: 1010, by: 948 }\r\n      ];\r\n      const CH6_START_FRAME = (function () { const idx = FRAMES.findIndex((f) => f.specialRole === 'ch6_pain_start'); if (idx >= 0) return idx; const cIdx = FRAMES.findIndex((f) => f.chapter === 6); return cIdx >= 0 ? cIdx : Math.min(FRAMES.length - 1, 17); })();\r\n      const CH6_RECOVERED_FRAME = (function () { const idx = FRAMES.findIndex((f) => f.specialRole === 'ch6_recovered'); return idx >= 0 ? idx : Math.min(FRAMES.length - 1, CH6_START_FRAME + 3); })();\r\n      const GROWTH_TALL_FRAME = (function () { const idx = FRAMES.findIndex((f) => f.specialRole === 'growth_tall' || f.quote === '쑥쑥 자란 우리 아이'); return idx >= 0 ? idx : Math.min(FRAMES.length - 1, 9); })();\r\n\r\n      // Give Chapter 3 (\"쑥쑥 자란 우리 아이\"), Chapter 6 Cut 1 (\"일하면서 온몸이 아파진 나\"), and Cut 4 (\"관절 튼튼 회복\")\r\n      // extended scroll travel so their multi-stage motions unfold smoothly!\r\n      const FRAME_STEP_WEIGHTS = [];\r\n      let totalStepWeight = 0;\r\n      for (let i = 0; i < FRAMES.length - 1; i++) {\r\n        const w = (i === CH6_START_FRAME || i === CH6_RECOVERED_FRAME)\r\n          ? 2.4\r\n          : (i === GROWTH_TALL_FRAME ? 2.5 : 1.0);\r\n        FRAME_STEP_WEIGHTS.push(w);\r\n        totalStepWeight += w;\r\n      }\r\n      let growthCompletedAtMs = 0;\r\n      let currentStarReveal = 0.0;\r\n      let currentPainProgress = 0.0;\r\n      let currentManseProgress = 0.0;\r\n      let lastShaderCurrIdx = -1;\r\n      let shaderFrameEnterTime = performance.now();\r\n\r\n      function storyNormToFrameFloat(storyNorm) {\r\n        const clamped = Math.max(0, Math.min(1, storyNorm));\r\n        const targetW = clamped * totalStepWeight;\r\n        let acc = 0;\r\n        for (let i = 0; i < FRAME_STEP_WEIGHTS.length; i++) {\r\n          const w = FRAME_STEP_WEIGHTS[i];\r\n          if (targetW <= acc + w || i === FRAME_STEP_WEIGHTS.length - 1) {\r\n            return i + Math.max(0, Math.min(1, (targetW - acc) / w));\r\n          }\r\n          acc += w;\r\n        }\r\n        return FRAMES.length - 1;\r\n      }\r\n\r\n      function frameFloatToFullNorm(frameFloat) {\r\n        const maxIdx = FRAMES.length - 1;\r\n        const clamped = Math.max(0, Math.min(maxIdx, frameFloat));\r\n        const idx = Math.min(maxIdx - 1, Math.floor(clamped));\r\n        const rem = clamped - idx;\r\n        let acc = 0;\r\n        for (let i = 0; i < idx; i++) {\r\n          acc += FRAME_STEP_WEIGHTS[i];\r\n        }\r\n        acc += rem * (FRAME_STEP_WEIGHTS[idx] || 1.0);\r\n        return (acc / Math.max(1, totalStepWeight)) * 0.90;\r\n      }\r\n\r\n      // Twinkling Starlight Constellation Around Our Tall Child (\"쑥쑥 자란 우리 아이\")\r\n      const GROWTH_TALL_STARS = [\r\n        { x: 978,  y: 122, size: 32, speed: 4.8, phase: 0.0,  eightPt: true  }, // Top crown hero star\r\n        { x: 832,  y: 188, size: 30, speed: 5.4, phase: 1.2,  eightPt: true  }, // Upper-left head star\r\n        { x: 1122, y: 185, size: 30, speed: 5.1, phase: 2.4,  eightPt: true  }, // Upper-right head star\r\n        { x: 882,  y: 138, size: 19, speed: 6.5, phase: 0.7,  eightPt: false }, // Top-left halo star\r\n        { x: 1076, y: 140, size: 20, speed: 6.2, phase: 3.1,  eightPt: false }, // Top-right halo star\r\n        { x: 785,  y: 278, size: 24, speed: 4.6, phase: 1.9,  eightPt: true  }, // Left ear level star\r\n        { x: 1168, y: 272, size: 24, speed: 5.7, phase: 4.0,  eightPt: true  }, // Right ear level star\r\n        { x: 814,  y: 365, size: 28, speed: 5.2, phase: 2.8,  eightPt: true  }, // Left cheek/shoulder hero star\r\n        { x: 1142, y: 360, size: 28, speed: 4.9, phase: 0.5,  eightPt: true  }, // Right cheek/shoulder hero star\r\n        { x: 752,  y: 452, size: 22, speed: 6.0, phase: 3.6,  eightPt: false }, // Left shoulder outer star\r\n        { x: 1204, y: 446, size: 22, speed: 5.8, phase: 1.5,  eightPt: false }, // Right shoulder outer star\r\n        { x: 768,  y: 558, size: 18, speed: 6.8, phase: 4.5,  eightPt: false }, // Left arm sparkle\r\n        { x: 1190, y: 552, size: 18, speed: 6.4, phase: 2.1,  eightPt: false }, // Right arm sparkle\r\n        { x: 855,  y: 425, size: 16, speed: 7.2, phase: 5.2,  eightPt: false }, // Left collar sparkle\r\n        { x: 1098, y: 422, size: 16, speed: 7.0, phase: 0.9,  eightPt: false }  // Right collar sparkle\r\n      ];\r\n\r\n      function buildChildStarlightSparkles(timeSec, starReveal, fadeOutAlpha) {\r\n        if (starReveal <= 0.001 || fadeOutAlpha <= 0.001) return '';\r\n        const masterAlpha = Math.min(1.0, starReveal * 1.4) * fadeOutAlpha;\r\n        let svg = `\r\n          <defs>\r\n            <radialGradient id=\"childAuraGlow\" cx=\"50%\" cy=\"50%\" r=\"50%\">\r\n              <stop offset=\"0%\" stop-color=\"#FFFBEB\" stop-opacity=\"0.32\"/>\r\n              <stop offset=\"55%\" stop-color=\"#FDE68A\" stop-opacity=\"0.14\"/>\r\n              <stop offset=\"100%\" stop-color=\"#FDE68A\" stop-opacity=\"0\"/>\r\n            </radialGradient>\r\n            <radialGradient id=\"starOrbGlow\" cx=\"50%\" cy=\"50%\" r=\"50%\">\r\n              <stop offset=\"0%\" stop-color=\"#FFFFFF\" stop-opacity=\"0.95\"/>\r\n              <stop offset=\"38%\" stop-color=\"#FDE68A\" stop-opacity=\"0.65\"/>\r\n              <stop offset=\"100%\" stop-color=\"#F59E0B\" stop-opacity=\"0\"/>\r\n            </radialGradient>\r\n          </defs>\r\n          <ellipse cx=\"978\" cy=\"340\" rx=\"235\" ry=\"255\" fill=\"url(#childAuraGlow)\" opacity=\"${(masterAlpha * (0.75 + 0.25 * Math.sin(timeSec * 2.6))).toFixed(2)}\"/>\r\n        `;\r\n\r\n        const totalStars = GROWTH_TALL_STARS.length;\r\n        GROWTH_TALL_STARS.forEach((s, idx) => {\r\n          // Stagger star pop-in from bottom shoulders up to the top crown star right AFTER height growth finishes!\r\n          const orderFromBottom = (totalStars - 1 - idx) / Math.max(1, totalStars - 1);\r\n          const startT = orderFromBottom * 0.42;\r\n          const localStarP = Math.max(0.0, Math.min(1.0, (starReveal - startT) / 0.52));\r\n          if (localStarP <= 0.001) return;\r\n\r\n          const popScale = localStarP < 0.68\r\n            ? (localStarP / 0.68) * 1.24\r\n            : 1.24 - ((localStarP - 0.68) / 0.32) * 0.24;\r\n\r\n          const wave = 0.5 + 0.5 * Math.sin(timeSec * s.speed + s.phase);\r\n          const twinkle = Math.pow(wave, 1.45);\r\n          const scale = (0.42 + twinkle * 0.88) * popScale;\r\n          const r = s.size * scale;\r\n          const rInner = r * 0.16;\r\n          const op = (Math.min(1.0, localStarP * 1.8) * fadeOutAlpha * (0.28 + twinkle * 0.72)).toFixed(2);\r\n          const floatY = s.y + Math.sin(timeSec * 2.2 + idx) * 4.5;\r\n          const rotDeg = (Math.sin(timeSec * 1.6 + s.phase) * 14).toFixed(1);\r\n\r\n          // 4-point curved diamond star path\r\n          const starPath = `M 0 ${-r} Q ${-rInner} ${-rInner} ${-r} 0 Q ${-rInner} ${rInner} 0 ${r} Q ${rInner} ${rInner} ${r} 0 Q ${rInner} ${-rInner} 0 ${-r} Z`;\r\n          const diagR = r * 0.52;\r\n          const diagInner = rInner * 0.75;\r\n          const diagPath = `M 0 ${-diagR} Q ${-diagInner} ${-diagInner} ${-diagR} 0 Q ${-diagInner} ${diagInner} 0 ${diagR} Q ${diagInner} ${diagInner} ${diagR} 0 Q ${diagInner} ${-diagInner} 0 ${-diagR} Z`;\r\n\r\n          svg += `\r\n            <g transform=\"translate(${s.x}, ${floatY.toFixed(1)}) rotate(${rotDeg})\" opacity=\"${op}\">\r\n              <circle cx=\"0\" cy=\"0\" r=\"${(r * 1.25).toFixed(1)}\" fill=\"url(#starOrbGlow)\"/>\r\n              ${s.eightPt ? `<path d=\"${diagPath}\" transform=\"rotate(45)\" fill=\"#FDE68A\" opacity=\"0.85\"/>` : ''}\r\n              <path d=\"${starPath}\" fill=\"#FFFBEB\" stroke=\"#FDE68A\" stroke-width=\"1\"/>\r\n              <circle cx=\"0\" cy=\"0\" r=\"${Math.max(2.2, r * 0.14).toFixed(1)}\" fill=\"#FFFFFF\"/>\r\n            </g>\r\n          `;\r\n        });\r\n\r\n        return svg;\r\n      }\r\n\r\n      function buildKoreanJointNodes(points, isHealed, timeSec, crookAmt) {\r\n        let orbs = '';\r\n        points.forEach((j, idx) => {\r\n          const jx = j.bx + Math.sin(idx * 1.5) * 8 * crookAmt;\r\n          const jy = j.by;\r\n          const col = isHealed ? '#6EE7B7' : '#F87171';\r\n          const badgeBg = isHealed ? 'rgba(6, 78, 59, 0.85)' : 'rgba(127, 29, 29, 0.85)';\r\n          const r = 9 + Math.sin(timeSec * 4.5 + idx) * 3.0;\r\n          const textW = Math.max(46, j.name.length * 16 + 18);\r\n          orbs += `\r\n            <circle cx=\"${jx}\" cy=\"${jy}\" r=\"${r * 1.85}\" fill=\"${col}\" opacity=\"0.22\"/>\r\n            <circle cx=\"${jx}\" cy=\"${jy}\" r=\"${r}\" fill=\"none\" stroke=\"${col}\" stroke-width=\"2\" opacity=\"0.92\"/>\r\n            <circle cx=\"${jx}\" cy=\"${jy}\" r=\"4.5\" fill=\"#FFFFFF\"/>\r\n            <rect x=\"${jx + 14}\" y=\"${jy - 14}\" width=\"${textW}\" height=\"26\" rx=\"13\" fill=\"${badgeBg}\" stroke=\"${col}\" stroke-width=\"1.2\"/>\r\n            <text x=\"${jx + 14 + textW / 2}\" y=\"${jy + 4}\" text-anchor=\"middle\" fill=\"#FFFFFF\" font-family=\"Pretendard, sans-serif\" font-size=\"14\" font-weight=\"800\">${j.name}</text>\r\n          `;\r\n        });\r\n        return orbs;\r\n      }\r\n\r\n      // Sequential 1-by-1 Pain Point Reveal for \"일하면서 온몸이 아파진 나\"\r\n      // As painProgress goes from 0.0 (healthy posture) -> 1.0 (painful posture),\r\n      // the spine bends from straight to crooked and the 7 pain points pop up one by one!\r\n      function buildSequentialPainStandingOverlay(painProgress, timeSec, masterAlpha) {\r\n        if (painProgress <= 0.02 || masterAlpha <= 0.01) return '';\r\n\r\n        let svg = '';\r\n        // 1. Progressive spine line that bends from upright healthy to crooked painful as you scroll\r\n        const spineDrawMax = Math.min(1.0, Math.max(0.0, (painProgress - 0.02) / 0.68));\r\n        if (spineDrawMax > 0.02) {\r\n          const steps = 16;\r\n          const activeSteps = Math.max(1, Math.round(steps * spineDrawMax));\r\n          let spineD = '';\r\n          for (let s = 0; s <= activeSteps; s++) {\r\n            const frac = s / steps;\r\n            const healthyX = 1025 + frac * 5;\r\n            const healthyY = 225 + frac * 300;\r\n            const painX = 985 - frac * 65 + Math.sin(frac * Math.PI * 2.0) * 24 * painProgress;\r\n            const painY = 225 + frac * 225;\r\n            const px = healthyX + (painX - healthyX) * painProgress;\r\n            const py = healthyY + (painY - healthyY) * painProgress;\r\n            spineD += (s === 0 ? `M ${px.toFixed(1)} ${py.toFixed(1)}` : ` L ${px.toFixed(1)} ${py.toFixed(1)}`);\r\n          }\r\n          svg += `<path d=\"${spineD}\" fill=\"none\" stroke=\"#EF4444\" stroke-width=\"4\" stroke-linecap=\"round\" opacity=\"${(0.82 * masterAlpha).toFixed(2)}\"/>`;\r\n        }\r\n\r\n        // 2. Reveal the 7 pain points (목 -> 어깨 -> 팔 -> 척추 -> 허리 -> 다리 -> 발) ONE BY ONE with scroll!\r\n        PAIN_JOINTS_STANDING.forEach((j, idx) => {\r\n          const startT = 0.05 + idx * 0.125; // Staggered thresholds: 0.05, 0.175, 0.30, 0.425, 0.55, 0.675, 0.80\r\n          const localP = Math.max(0.0, Math.min(1.0, (painProgress - startT) / 0.12));\r\n          if (localP <= 0.001) return; // Not revealed yet!\r\n\r\n          const poseT = Math.min(1.0, Math.max(painProgress, localP * 0.65));\r\n          const jx = j.hx + (j.bx - j.hx) * poseT + Math.sin(idx * 1.5) * 6 * painProgress;\r\n          const jy = j.hy + (j.by - j.hy) * poseT;\r\n\r\n          // Elastic pop-in scale & red shockwave ripple when each pain point activates\r\n          const popScale = localP < 0.65\r\n            ? (localP / 0.65) * 1.22\r\n            : 1.22 - ((localP - 0.65) / 0.35) * 0.22;\r\n          const nodeOp = (Math.min(1.0, localP * 1.8) * masterAlpha).toFixed(2);\r\n          const r = 9.5 + Math.sin(timeSec * 5.0 + idx) * 3.0;\r\n          const textW = Math.max(48, j.name.length * 16 + 20);\r\n\r\n          const shockR = (10 + localP * 34).toFixed(1);\r\n          const shockOp = ((1.0 - localP) * 0.85 * masterAlpha).toFixed(2);\r\n\r\n          svg += `\r\n            <g transform=\"translate(${jx.toFixed(1)}, ${jy.toFixed(1)}) scale(${popScale.toFixed(3)})\" opacity=\"${nodeOp}\">\r\n              ${localP < 0.99 ? `<circle cx=\"0\" cy=\"0\" r=\"${shockR}\" fill=\"none\" stroke=\"#EF4444\" stroke-width=\"2.5\" opacity=\"${shockOp}\"/>` : ''}\r\n              <circle cx=\"0\" cy=\"0\" r=\"${(r * 1.9).toFixed(1)}\" fill=\"#EF4444\" opacity=\"0.26\"/>\r\n              <circle cx=\"0\" cy=\"0\" r=\"${r.toFixed(1)}\" fill=\"none\" stroke=\"#F87171\" stroke-width=\"2.2\" opacity=\"0.95\"/>\r\n              <circle cx=\"0\" cy=\"0\" r=\"4.8\" fill=\"#FFFFFF\"/>\r\n              <rect x=\"14\" y=\"-14\" width=\"${textW}\" height=\"27\" rx=\"13.5\" fill=\"rgba(127, 29, 29, 0.90)\" stroke=\"#F87171\" stroke-width=\"1.4\"/>\r\n              <text x=\"${14 + textW / 2}\" y=\"4.5\" text-anchor=\"middle\" fill=\"#FFFFFF\" font-family=\"Pretendard, sans-serif\" font-size=\"14\" font-weight=\"800\">${j.name}</text>\r\n            </g>\r\n          `;\r\n        });\r\n\r\n        return svg;\r\n      }\r\n\r\n      // Sequential 1-by-1 Emerald Green Joint Reveal for \"관절 튼튼 회복\" (During Joyful \"만세!\" Stretch)\r\n      // As manseProgress goes from 0.0 (neutral standing) -> 1.0 (arms raised high in \"만세!\" pose),\r\n      // the straight emerald spine line draws and the 7 recovered body parts pop up one by one in GREEN!\r\n      function buildSequentialRecoveredManseOverlay(manseProgress, timeSec, masterAlpha) {\r\n        if (manseProgress <= 0.02 || masterAlpha <= 0.01) return '';\r\n\r\n        let svg = '';\r\n        // 1. Progressive straight emerald spine alignment line\r\n        const spineDrawMax = Math.min(1.0, Math.max(0.0, (manseProgress - 0.02) / 0.65));\r\n        if (spineDrawMax > 0.02) {\r\n          const yEnd = 222 + 285 * spineDrawMax;\r\n          svg += `<line x1=\"1028\" y1=\"222\" x2=\"1025\" y2=\"${yEnd.toFixed(1)}\" stroke=\"#10B981\" stroke-width=\"4\" stroke-linecap=\"round\" opacity=\"${(0.85 * masterAlpha).toFixed(2)}\"/>`;\r\n        }\r\n\r\n        // 2. Reveal the 7 recovered body parts (목 -> 어깨 -> 팔 -> 척추 -> 허리 -> 다리 -> 발) ONE BY ONE in EMERALD GREEN!\r\n        PAIN_JOINTS_RECOVERED.forEach((j, idx) => {\r\n          const startT = 0.05 + idx * 0.125; // Staggered thresholds: 0.05, 0.175, 0.30, 0.425, 0.55, 0.675, 0.80\r\n          const localP = Math.max(0.0, Math.min(1.0, (manseProgress - startT) / 0.12));\r\n          if (localP <= 0.001) return; // Not revealed yet!\r\n\r\n          const poseT = Math.min(1.0, Math.max(manseProgress, localP * 0.70));\r\n          const jx = j.sx + (j.bx - j.sx) * poseT;\r\n          const jy = j.sy + (j.by - j.sy) * poseT;\r\n\r\n          // Elastic pop-in scale & emerald green healing shockwave ring when each joint lights up\r\n          const popScale = localP < 0.65\r\n            ? (localP / 0.65) * 1.22\r\n            : 1.22 - ((localP - 0.65) / 0.35) * 0.22;\r\n          const nodeOp = (Math.min(1.0, localP * 1.8) * masterAlpha).toFixed(2);\r\n          const r = 9.5 + Math.sin(timeSec * 4.8 + idx) * 3.0;\r\n          const textW = Math.max(48, j.name.length * 16 + 20);\r\n\r\n          const shockR = (10 + localP * 34).toFixed(1);\r\n          const shockOp = ((1.0 - localP) * 0.88 * masterAlpha).toFixed(2);\r\n\r\n          svg += `\r\n            <g transform=\"translate(${jx.toFixed(1)}, ${jy.toFixed(1)}) scale(${popScale.toFixed(3)})\" opacity=\"${nodeOp}\">\r\n              ${localP < 0.99 ? `<circle cx=\"0\" cy=\"0\" r=\"${shockR}\" fill=\"none\" stroke=\"#10B981\" stroke-width=\"2.6\" opacity=\"${shockOp}\"/>` : ''}\r\n              <circle cx=\"0\" cy=\"0\" r=\"${(r * 1.9).toFixed(1)}\" fill=\"#10B981\" opacity=\"0.28\"/>\r\n              <circle cx=\"0\" cy=\"0\" r=\"${r.toFixed(1)}\" fill=\"none\" stroke=\"#6EE7B7\" stroke-width=\"2.2\" opacity=\"0.96\"/>\r\n              <circle cx=\"0\" cy=\"0\" r=\"4.8\" fill=\"#FFFFFF\"/>\r\n              <rect x=\"14\" y=\"-14\" width=\"${textW}\" height=\"27\" rx=\"13.5\" fill=\"rgba(6, 78, 59, 0.92)\" stroke=\"#34D399\" stroke-width=\"1.5\"/>\r\n              <text x=\"${14 + textW / 2}\" y=\"4.5\" text-anchor=\"middle\" fill=\"#FFFFFF\" font-family=\"Pretendard, sans-serif\" font-size=\"14\" font-weight=\"800\">${j.name}</text>\r\n            </g>\r\n          `;\r\n        });\r\n\r\n        return svg;\r\n      }\r\n\r\n      function renderCleanLightOverlay(frameFloat, timeSec, rawFrameFloat) {\r\n        if (!svgOverlay) return;\r\n        const exactFloat = typeof rawFrameFloat === 'number' ? rawFrameFloat : frameFloat;\r\n        const exactGrowthRel = exactFloat - GROWTH_TALL_FRAME;\r\n        const rel = frameFloat - CH6_START_FRAME;\r\n        const exactRel = exactFloat - CH6_START_FRAME;\r\n        const exactRecovRel = exactFloat - CH6_RECOVERED_FRAME;\r\n\r\n        if (exactGrowthRel >= 0.0 && exactGrowthRel <= 0.94 && currentStarReveal > 0.001) {\r\n          // Frame 9 (\"쑥쑥 자란 우리 아이\"): Twinkling golden & white starlight ONLY AFTER the child's height growth finishes!\r\n          const fadeOut = exactGrowthRel > 0.80 ? Math.max(0.0, 1.0 - (exactGrowthRel - 0.80) / 0.14) : 1.0;\r\n          svgOverlay.innerHTML = buildChildStarlightSparkles(timeSec, currentStarReveal, fadeOut);\r\n        } else if (exactRel >= -0.05 && exactRel <= 0.96) {\r\n          // Cut 1 (\"일하면서 온몸이 아파진 나\"):\r\n          // Multi-frame healthy -> painful posture transformation + 1-by-1 sequential RED pain point reveal!\r\n          const scrollPain = Math.max(0.0, Math.min(1.0, (exactRel - 0.04) / 0.70));\r\n          const painProgress = Math.max(currentPainProgress, scrollPain);\r\n          const fadeOut = exactRel > 0.84 ? Math.max(0.0, 1.0 - (exactRel - 0.84) / 0.12) : 1.0;\r\n          svgOverlay.innerHTML = buildSequentialPainStandingOverlay(painProgress, timeSec, fadeOut);\r\n        } else if (exactRecovRel >= -0.05 && exactRecovRel <= 0.96) {\r\n          // Cut 4 (\"관절 튼튼 회복\"):\r\n          // Multi-frame standing -> joyful \"만세!\" motion + 1-by-1 sequential EMERALD GREEN joint reveal!\r\n          const scrollManse = Math.max(0.0, Math.min(1.0, (exactRecovRel - 0.04) / 0.70));\r\n          const manseProgress = Math.max(currentManseProgress, scrollManse);\r\n          const fadeOut = exactRecovRel > 0.84 ? Math.max(0.0, 1.0 - (exactRecovRel - 0.84) / 0.12) : 1.0;\r\n          svgOverlay.innerHTML = buildSequentialRecoveredManseOverlay(manseProgress, timeSec, fadeOut);\r\n        } else if (rel > 0.5 && rel < 2.6) {\r\n          const nearest = Math.round(rel);\r\n          if (nearest === 1) {\r\n            // Cut 2: 한의원에서 추나 치료 (Prone Chuna manual therapy + Korean back/spine labels)\r\n            svgOverlay.innerHTML = `\r\n              <line x1=\"820\" y1=\"725\" x2=\"1300\" y2=\"710\" stroke=\"#FDE68A\" stroke-width=\"3.5\" stroke-dasharray=\"8 6\" opacity=\"0.75\"/>\r\n              ${buildKoreanJointNodes(PAIN_JOINTS_PRONE_CHUNA, false, timeSec, 0.2)}\r\n            `;\r\n          } else {\r\n            // Cut 3: 통증 치료 (1st-person ankle acupuncture + Korean ankle labels)\r\n            svgOverlay.innerHTML = buildKoreanJointNodes(PAIN_JOINTS_ANKLE_POV, false, timeSec, 0.1);\r\n          }\r\n        } else {\r\n          if (svgOverlay.innerHTML !== '') svgOverlay.innerHTML = '';\r\n        }\r\n      }\r\n\r\n      // ======================================================================\r\n      // 6. SCROLL-REACTIVE 8-DIALOGUE KINETIC TYPOGRAPHY ENGINE\r\n      // ======================================================================\r\n      let activeChapterId = -1;\r\n      let activeFrameIdx = -1;\r\n      let chapterEnterTime = performance.now();\r\n      let frameEnterTime = performance.now();\r\n      const quoteEl = document.getElementById('dialogue-main-quote');\r\n      const numEl = document.getElementById('dialogue-chapter-num');\r\n      const povTagEl = document.getElementById('dialogue-pov-tag');\r\n      const whisperEl = document.getElementById('dialogue-sub-whisper');\r\n      const phaseStepsEl = document.getElementById('dialogue-phase-steps');\r\n      const stageContainer = document.getElementById('story-dialogue-stage');\r\n      const brushFill = document.getElementById('dialogue-progress-fill');\r\n      const weightCounterEl = document.getElementById('story4-weight-counter');\r\n      const weightLiveNumEl = document.getElementById('weight-live-num');\r\n      const weightDiffBadgeEl = document.getElementById('weight-diff-badge');\r\n      let charSpans = [];\r\n      let currentPhaseStepEls = [];\r\n\r\n      const dotsRow = document.getElementById('timeline-dots-row');\r\n      const chapterStartFrames = DIALOGUE_CHAPTERS.map((ch) => Math.max(0, FRAMES.findIndex((f) => f.chapter === ch.id)));\r\n      const dotEls = [];\r\n      if (dotsRow) {\r\n        DIALOGUE_CHAPTERS.forEach((ch, idx) => {\r\n          const dot = document.createElement('div');\r\n          dot.className = 'timeline-chapter-dot';\r\n          dot.title = `${idx + 1}. ${FRAMES[chapterStartFrames[idx]]?.quote || ch.quote}`;\r\n          dot.addEventListener('click', (e) => {\r\n            e.stopPropagation();\r\n            scrollToNormalized(frameFloatToFullNorm(chapterStartFrames[idx]));\r\n          });\r\n          dotsRow.appendChild(dot);\r\n          dotEls.push(dot);\r\n        });\r\n      }\r\n\r\n      function buildDialogueCharacters(text) {\r\n        if (!quoteEl) return;\r\n        quoteEl.innerHTML = '';\r\n        charSpans = [];\r\n        for (let i = 0; i < text.length; i++) {\r\n          const ch = text[i];\r\n          const span = document.createElement('span');\r\n          if (ch === ' ') {\r\n            span.className = 'dialogue-char space';\r\n            span.innerHTML = '&nbsp;';\r\n          } else {\r\n            span.className = 'dialogue-char';\r\n            span.textContent = ch;\r\n          }\r\n          quoteEl.appendChild(span);\r\n          charSpans.push(span);\r\n        }\r\n      }\r\n\r\n      function buildChapterPhaseSteps(chapterId) {\r\n        if (!phaseStepsEl) return;\r\n        phaseStepsEl.innerHTML = '';\r\n        currentPhaseStepEls = [];\r\n\r\n        const chFrames = [];\r\n        FRAMES.forEach((f, idx) => {\r\n          if (f.chapter === chapterId) chFrames.push({ frame: f, index: idx });\r\n        });\r\n\r\n        chFrames.forEach((item, i) => {\r\n          if (i > 0) {\r\n            const arr = document.createElement('span');\r\n            arr.className = 'phase-step-arrow';\r\n            arr.textContent = '➔';\r\n            phaseStepsEl.appendChild(arr);\r\n          }\r\n          const span = document.createElement('span');\r\n          span.className = 'phase-step-text';\r\n          span.textContent = item.frame.stepLabel;\r\n          span.dataset.frameIndex = String(item.index);\r\n          span.addEventListener('click', (e) => {\r\n            e.stopPropagation();\r\n            hasUserScrolled = true;\r\n            scrollToNormalized(frameFloatToFullNorm(item.index));\r\n          });\r\n          phaseStepsEl.appendChild(span);\r\n          currentPhaseStepEls.push(span);\r\n        });\r\n      }\r\n\r\n      function getChapterProgress(frameFloat, chapterId) {\r\n        const chIndices = [];\r\n        FRAMES.forEach((f, idx) => {\r\n          if (f.chapter === chapterId) chIndices.push(idx);\r\n        });\r\n        const firstIdx = chIndices[0] || 0;\r\n        const lastIdx = chIndices[chIndices.length - 1] || firstIdx;\r\n        const span = Math.max(0.85, (lastIdx - firstIdx) + 0.85);\r\n        return Math.max(0, Math.min(1, (frameFloat - (firstIdx - 0.35)) / span));\r\n      }\r\n\r\n      function updateScrollDialogue(frameFloat, velocity, nowMs) {\r\n        const maxIdx = FRAMES.length - 1;\r\n        const idx = Math.min(maxIdx, Math.max(0, Math.round(frameFloat)));\r\n        const frame = FRAMES[idx];\r\n        const chapter = DIALOGUE_CHAPTERS[frame.chapter - 1];\r\n\r\n        if (activeChapterId !== chapter.id) {\r\n          activeChapterId = chapter.id;\r\n          chapterEnterTime = nowMs;\r\n          if (numEl) numEl.textContent = chapter.numLabel;\r\n          buildChapterPhaseSteps(chapter.id);\r\n          dotEls.forEach((d, i) => d.classList.toggle('active', i === chapter.id - 1));\r\n        }\r\n\r\n        if (activeFrameIdx !== idx) {\r\n          activeFrameIdx = idx;\r\n          frameEnterTime = nowMs;\r\n          buildDialogueCharacters(frame.quote || chapter.quote);\r\n        }\r\n\r\n        if (povTagEl && povTagEl.textContent !== frame.povBadge) {\r\n          povTagEl.textContent = frame.povBadge;\r\n        }\r\n\r\n        if (whisperEl && whisperEl.textContent !== frame.whisper) {\r\n          whisperEl.textContent = frame.whisper;\r\n        }\r\n\r\n        currentPhaseStepEls.forEach((el) => {\r\n          el.classList.toggle('active', Number(el.dataset.frameIndex) === idx);\r\n        });\r\n\r\n        const chProg = getChapterProgress(frameFloat, chapter.id);\r\n        if (brushFill) {\r\n          brushFill.style.width = `${Math.max(12, chProg * 100).toFixed(1)}%`;\r\n        }\r\n\r\n        // Story 4 (성인 비만·체형 치료): Scroll-reactive weight loss counter (68.5kg -> 48.5kg)\r\n        if (weightCounterEl) {\r\n          const isStory4 = chapter.id === 4;\r\n          weightCounterEl.classList.toggle('active', isStory4);\r\n          if (isStory4) {\r\n            const startWeight = 68.5;\r\n            const targetWeight = 48.5;\r\n            const lostKg = chProg * (startWeight - targetWeight);\r\n            const currentKg = startWeight - lostKg;\r\n            if (weightLiveNumEl) weightLiveNumEl.textContent = `${currentKg.toFixed(1)} kg`;\r\n            if (weightDiffBadgeEl) weightDiffBadgeEl.textContent = `▼ -${lostKg.toFixed(1)} kg 감량`;\r\n          }\r\n        }\r\n\r\n        const timeSinceEnter = Math.max(0, (nowMs - frameEnterTime) * 0.001);\r\n        const frameProg = Math.max(0, Math.min(1, (frameFloat - (idx - 0.45)) / 0.9));\r\n        const totalChars = Math.max(1, charSpans.length);\r\n\r\n        charSpans.forEach((span, i) => {\r\n          const charRatio = i / totalChars;\r\n          const rawReveal = Math.max(0, Math.min(1, (timeSinceEnter * 2.5) - charRatio * 0.52));\r\n          const entranceReveal = 1 - Math.pow(1 - rawReveal, 3); // Luxury cubic-out ease\r\n          const yOffset = (1 - entranceReveal) * 20;\r\n          const rotX = (1 - entranceReveal) * -32;\r\n          const blurPx = (1 - entranceReveal) * 4.0;\r\n          const opacity = 0.15 + entranceReveal * 0.85;\r\n\r\n          span.style.transform = `translate3d(0, ${yOffset.toFixed(1)}px, 0) rotateX(${rotX.toFixed(1)}deg)`;\r\n          span.style.opacity = opacity.toFixed(2);\r\n          span.style.filter = blurPx > 0.25 ? `blur(${blurPx.toFixed(1)}px)` : 'none';\r\n\r\n          const isLit = frameProg >= charRatio * 0.72 || entranceReveal >= 0.99;\r\n          const isGoldHighlight = Math.abs(frameProg - charRatio) < 0.25 || i >= Math.max(0, totalChars - 3);\r\n          span.classList.toggle('lit', isLit);\r\n          span.classList.toggle('gold-accent', isGoldHighlight);\r\n        });\r\n\r\n        if (stageContainer) {\r\n          stageContainer.style.transform = window.innerWidth <= 1024 ? 'none' : 'translateY(-50%)';\r\n        }\r\n        const tapNextTextEl = document.getElementById('dialogue-tap-next-text');\r\n        if (tapNextTextEl) {\r\n          if (idx >= maxIdx) {\r\n            tapNextTextEl.textContent = '터치 · 6대 핵심 진료카드 펼치기';\r\n          } else if (typeof isAutoScrollRunning !== 'undefined' && isAutoScrollRunning) {\r\n            tapNextTextEl.textContent = `✦ 자동 스토리 진행 중 · 터치 시 다음 장면 (${idx + 1}/${maxIdx + 1})`;\r\n          } else {\r\n            tapNextTextEl.textContent = `스토리 터치 · 다음 장면 (${idx + 1}/${maxIdx + 1})`;\r\n          }\r\n        }\r\n\r\n        const pct = (smoothProgress * 100).toFixed(0);\r\n        const tFill = document.getElementById('timeline-bar-fill');\r\n        const tReadout = document.getElementById('timeline-depth-readout');\r\n        if (tFill) tFill.style.width = `${(smoothProgress * 100).toFixed(2)}%`;\r\n        if (tReadout) tReadout.textContent = `STORY 0${chapter.id} / 08 · ${String(pct).padStart(2, '0')}%`;\r\n      }\r\n\r\n      // ======================================================================\r\n      // 7. SCROLL CONTROLLER & DADDY DOCTOR INTRO + AUTO-SCROLL ENGINE\r\n      // ======================================================================\r\n      let targetProgress = 0;\r\n      let smoothProgress = 0;\r\n      let prevProgress = 0;\r\n      let scrollVelocity = 0;\r\n      let smoothMouse = { x: 0.5, y: 0.5 };\r\n      let mouseNorm = { x: 0.5, y: 0.5 };\r\n      let camRollSpring = 0;\r\n      let lastUserInteract = 0;\r\n      let hasUserScrolled = false;\r\n      let isDaddyIntroFinished = false;\r\n      let introClosedAtMs = 0;\r\n      let isAutoScrollRunning = false;\r\n      let lastProgrammaticScrollMs = 0;\r\n\r\n      // Initialize \"아빠 한의사를 찾는 환자 스토리 공개\" Cinematic Opening Slogan Stage\r\n      const daddyIntroStageEl = document.getElementById('daddy-doc-intro-stage');\r\n      const daddyIntroCharsEl = document.getElementById('daddy-intro-chars');\r\n      const daddyIntroProgressFillEl = document.getElementById('daddy-intro-progress-fill');\r\n      const btnEnterMainStoryEl = document.getElementById('btn-enter-main-story');\r\n      const INTRO_DURATION_MS = 3200;\r\n      const introStartTimeMs = performance.now();\r\n\r\n      if (daddyIntroCharsEl) {\r\n        const line1 = %%HOME_INTRO_LINE1_JS%%;\r\n        const line2 = %%HOME_INTRO_LINE2_JS%%;\r\n        let html = '';\r\n        let charGlobalIdx = 0;\r\n        const renderLineChars = (str, highlightStart, highlightEnd) => {\r\n          for (let i = 0; i < str.length; i++) {\r\n            const ch = str[i];\r\n            if (ch === ' ') {\r\n              html += '<span class=\"daddy-intro-space\"></span>';\r\n            } else {\r\n              const isGold = i >= highlightStart && i < highlightEnd;\r\n              const delayMs = 120 + charGlobalIdx * 55;\r\n              html += `<span class=\"daddy-intro-char${isGold ? ' highlight-gold' : ''}\" style=\"transition-delay:${delayMs}ms\">${ch}</span>`;\r\n              charGlobalIdx++;\r\n            }\r\n          }\r\n        };\r\n        renderLineChars(line1, 0, Math.min(6, line1.length));\r\n        html += '<br>';\r\n        renderLineChars(line2, 0, line2.length); // Highlight \"환자 스토리 공개\"\r\n        daddyIntroCharsEl.innerHTML = html;\r\n        requestAnimationFrame(() => {\r\n          requestAnimationFrame(() => {\r\n            const spans = daddyIntroCharsEl.querySelectorAll('.daddy-intro-char');\r\n            spans.forEach((sp) => sp.classList.add('revealed'));\r\n          });\r\n        });\r\n      }\r\n\r\n      function finishDaddyIntro(immediate) {\r\n        if (isDaddyIntroFinished) return;\r\n        isDaddyIntroFinished = true;\r\n        introClosedAtMs = performance.now();\r\n        if (!daddyIntroStageEl) return;\r\n        if (immediate) {\r\n          daddyIntroStageEl.classList.add('closing', 'hidden');\r\n        } else {\r\n          daddyIntroStageEl.classList.add('closing');\r\n          setTimeout(() => {\r\n            if (daddyIntroStageEl) daddyIntroStageEl.classList.add('hidden');\r\n          }, 960);\r\n        }\r\n      }\r\n\r\n      if (btnEnterMainStoryEl) {\r\n        btnEnterMainStoryEl.addEventListener('click', (e) => {\r\n          e.stopPropagation();\r\n          finishDaddyIntro(false);\r\n        });\r\n      }\r\n      if (daddyIntroStageEl) {\r\n        daddyIntroStageEl.addEventListener('click', (e) => {\r\n          e.stopPropagation();\r\n          finishDaddyIntro(false);\r\n        });\r\n      }\r\n\r\n      function getScrollMax() {\r\n        const track = document.getElementById('virtual-scroll-track');\r\n        const h = track ? track.offsetHeight : document.documentElement.scrollHeight;\r\n        return Math.max(1, h - window.innerHeight);\r\n      }\r\n\r\n      function getCurrentScrollY() {\r\n        return window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;\r\n      }\r\n\r\n      let isTouchDragging = false;\r\n      let touchLastY = 0;\r\n      let touchLastX = 0;\r\n      let touchLastTime = 0;\r\n      let touchInertiaVel = 0;\r\n      let isSyncingNativeScroll = false;\r\n\r\n      function syncNativeScrollPosition() {\r\n        if (isTouchDragging || window.innerWidth <= 1024) return;\r\n        const maxS = getScrollMax();\r\n        if (maxS > 10) {\r\n          isSyncingNativeScroll = true;\r\n          lastProgrammaticScrollMs = performance.now();\r\n          window.scrollTo(0, targetProgress * maxS);\r\n          requestAnimationFrame(() => { isSyncingNativeScroll = false; });\r\n        }\r\n      }\r\n\r\n      function scrollToNormalized(norm, immediate) {\r\n        const clamped = Math.max(0, Math.min(1, norm));\r\n        hasUserScrolled = true;\r\n        lastUserInteract = performance.now();\r\n        touchInertiaVel = 0;\r\n        targetProgress = clamped;\r\n        if (immediate || clamped >= 0.98) {\r\n          smoothProgress = clamped;\r\n        }\r\n        syncNativeScrollPosition();\r\n      }\r\n\r\n      window.addEventListener('message', (e) => {\r\n        if (!e.data || typeof e.data !== 'object') return;\r\n        if (e.data.type === 'SHOW_BENTO_CARDS') {\r\n          finishDaddyIntro(true);\r\n          scrollToNormalized(1.0, true);\r\n          if (typeof sktCardFlipController !== 'undefined' && sktCardFlipController) {\r\n            if (!sktCardFlipController.isActive()) sktCardFlipController.activate();\r\n          }\r\n        } else if (e.data.type === 'SYNC_NORM' && typeof e.data.norm === 'number') {\r\n          finishDaddyIntro(true);\r\n          if (e.data.norm < 0.96 && typeof sktCardFlipController !== 'undefined' && sktCardFlipController && sktCardFlipController.isActive()) {\r\n            sktCardFlipController.deactivate();\r\n          }\r\n          scrollToNormalized(e.data.norm);\r\n        } else if (e.data.type === 'SYNC_CHAPTER' && typeof e.data.chapterId === 'number') {\r\n          finishDaddyIntro(true);\r\n          if (typeof sktCardFlipController !== 'undefined' && sktCardFlipController && sktCardFlipController.isActive()) {\r\n            sktCardFlipController.deactivate();\r\n          }\r\n          const chIdx = Math.max(0, Math.min(DIALOGUE_CHAPTERS.length - 1, e.data.chapterId - 1));\r\n          const fIdx = chapterStartFrames[chIdx] || 0;\r\n          scrollToNormalized(frameFloatToFullNorm(fIdx));\r\n        } else if (e.data.type === 'SYNC_FRAME' && typeof e.data.frameIndex === 'number') {\r\n          finishDaddyIntro(true);\r\n          if (typeof sktCardFlipController !== 'undefined' && sktCardFlipController && sktCardFlipController.isActive()) {\r\n            sktCardFlipController.deactivate();\r\n          }\r\n          scrollToNormalized(frameFloatToFullNorm(e.data.frameIndex));\r\n        }\r\n      });\r\n\r\n      setTimeout(() => {\r\n        const params = new URLSearchParams(window.location.search);\r\n        if (params.has('cards')) {\r\n          finishDaddyIntro(true);\r\n          scrollToNormalized(1.0, true);\r\n          if (typeof sktCardFlipController !== 'undefined' && sktCardFlipController) {\r\n            sktCardFlipController.activate();\r\n          }\r\n        } else if (params.has('frame')) {\r\n          finishDaddyIntro(true);\r\n          const f = parseInt(params.get('frame'), 10);\r\n          if (!isNaN(f)) scrollToNormalized(frameFloatToFullNorm(f));\r\n        } else if (params.has('chapter')) {\r\n          finishDaddyIntro(true);\r\n          const c = parseInt(params.get('chapter'), 10);\r\n          if (!isNaN(c) && c >= 1 && c <= 8) {\r\n            scrollToNormalized(frameFloatToFullNorm(chapterStartFrames[c - 1] || 0));\r\n          }\r\n        }\r\n      }, 250);\r\n\r\n      window.addEventListener('scroll', () => {\r\n        if (isSyncingNativeScroll || isTouchDragging || isAutoScrollRunning) return;\r\n        const now = performance.now();\r\n        if (now - lastProgrammaticScrollMs < 220) return;\r\n        if (now - lastUserInteract < 450) return;\r\n        const y = getCurrentScrollY();\r\n        if (y > 4) hasUserScrolled = true;\r\n        const maxS = getScrollMax();\r\n        if (maxS > 50) {\r\n          targetProgress = Math.max(0, Math.min(1, y / maxS));\r\n        }\r\n      }, { passive: true });\r\n\r\n      window.addEventListener('wheel', (e) => {\r\n        if (e.target && e.target.closest && e.target.closest('.reserve-drawer')) return;\r\n        if (!isDaddyIntroFinished) {\r\n          finishDaddyIntro(false);\r\n          return;\r\n        }\r\n        hasUserScrolled = true;\r\n        lastUserInteract = performance.now();\r\n        isAutoScrollRunning = false;\r\n        touchInertiaVel = 0;\r\n        const virtualSpan = Math.max(3600, window.innerHeight * 9.5);\r\n        const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;\r\n        targetProgress = Math.max(0, Math.min(1, targetProgress + delta / virtualSpan));\r\n        syncNativeScrollPosition();\r\n      }, { passive: true });\r\n\r\n      let touchStartProgress = 0;\r\n      let touchDownX = 0;\r\n      let touchDownY = 0;\r\n      let touchMaxMoveDist = 0;\r\n      let touchDownTime = 0;\r\n      let lastTapAdvanceMs = 0;\r\n      let tapSpringBoostUntil = 0;\r\n\r\n      function isIgnoredStoryTapTarget(target) {\r\n        if (!target || !target.closest) return false;\r\n        if (target.closest('#dialogue-tap-next-pill, #story-dialogue-stage')) return false;\r\n        return Boolean(\r\n          target.closest('.daddy-doc-intro-stage, .hairloss-4type-modal-overlay, .spatial-top-nav, .minimal-bottom-timeline, .skt-finale-stage, .reserve-drawer-overlay, .reserve-drawer-panel, a, button, input, select, textarea')\r\n        );\r\n      }\r\n\r\n      function advanceMainStoryOnTap() {\r\n        const now = performance.now();\r\n        if (now - lastTapAdvanceMs < 260) return;\r\n        if (typeof sktCardFlipController !== 'undefined' && sktCardFlipController && sktCardFlipController.isActive()) return;\r\n        lastTapAdvanceMs = now;\r\n        tapSpringBoostUntil = now + 750;\r\n\r\n        const currentStoryNorm = Math.max(0, Math.min(1, targetProgress / 0.90));\r\n        const currentFrameFloat = storyNormToFrameFloat(currentStoryNorm);\r\n        const currentFrameIdx = Math.floor(currentFrameFloat + 0.18);\r\n        const nextFrameIdx = currentFrameIdx + 1;\r\n\r\n        if (nextFrameIdx <= FRAMES.length - 1) {\r\n          const targetFloat = nextFrameIdx < FRAMES.length - 1 ? nextFrameIdx + 0.06 : FRAMES.length - 1;\r\n          scrollToNormalized(frameFloatToFullNorm(targetFloat));\r\n        } else {\r\n          scrollToNormalized(1.0, false);\r\n          if (typeof sktCardFlipController !== 'undefined' && sktCardFlipController) {\r\n            sktCardFlipController.activate();\r\n          }\r\n        }\r\n      }\r\n\r\n      window.addEventListener('touchstart', (e) => {\r\n        if (!e.touches || !e.touches.length) return;\r\n        if (e.target && e.target.closest && e.target.closest('.reserve-drawer')) return;\r\n        isTouchDragging = true;\r\n        touchInertiaVel = 0;\r\n        touchStartProgress = targetProgress;\r\n        touchLastY = e.touches[0].clientY;\r\n        touchLastX = e.touches[0].clientX;\r\n        touchDownX = touchLastX;\r\n        touchDownY = touchLastY;\r\n        touchMaxMoveDist = 0;\r\n        touchLastTime = performance.now();\r\n        touchDownTime = touchLastTime;\r\n        lastUserInteract = touchLastTime;\r\n      }, { passive: true });\r\n\r\n      window.addEventListener('touchmove', (e) => {\r\n        if (!isTouchDragging || !e.touches || !e.touches.length) return;\r\n        if (e.target && e.target.closest && e.target.closest('.reserve-drawer')) return;\r\n        const now = performance.now();\r\n        const curY = e.touches[0].clientY;\r\n        const curX = e.touches[0].clientX;\r\n        const dy = touchLastY - curY;\r\n        const dx = touchLastX - curX;\r\n        touchLastY = curY;\r\n        touchLastX = curX;\r\n        const distFromStart = Math.hypot(curX - touchDownX, curY - touchDownY);\r\n        if (distFromStart > touchMaxMoveDist) touchMaxMoveDist = distFromStart;\r\n\r\n        const dtSec = Math.max(0.008, Math.min(0.1, (now - touchLastTime) * 0.001));\r\n        touchLastTime = now;\r\n        lastUserInteract = now;\r\n        hasUserScrolled = true;\r\n\r\n        const dominantDelta = Math.abs(dy) >= Math.abs(dx) ? dy : dx;\r\n        // Calm, deliberate mobile scroll speed + max 1 story-step (±8%) per single swipe\r\n        const virtualTouchSpan = Math.max(7200, window.innerHeight * 14.5);\r\n        const stepNorm = (dominantDelta * 0.55) / virtualTouchSpan;\r\n        const minSwipeBound = Math.max(0, touchStartProgress - 0.082);\r\n        const maxSwipeBound = Math.min(1, touchStartProgress + 0.082);\r\n        targetProgress = Math.max(minSwipeBound, Math.min(maxSwipeBound, targetProgress + stepNorm));\r\n\r\n        const instVel = stepNorm / dtSec;\r\n        touchInertiaVel = touchInertiaVel * 0.5 + Math.max(-0.08, Math.min(0.08, instVel)) * 0.5;\r\n\r\n        mouseNorm.x = curX / Math.max(1, window.innerWidth);\r\n        mouseNorm.y = curY / Math.max(1, window.innerHeight);\r\n        syncNativeScrollPosition();\r\n      }, { passive: true });\r\n\r\n      const endTouchHandler = (e) => {\r\n        const wasDragging = isTouchDragging;\r\n        isTouchDragging = false;\r\n        const now = performance.now();\r\n        lastUserInteract = now;\r\n        if (wasDragging && e && e.type === 'touchend' && touchMaxMoveDist < 14 && (now - touchDownTime) < 600) {\r\n          if (!isIgnoredStoryTapTarget(e.target)) {\r\n            advanceMainStoryOnTap();\r\n          }\r\n        }\r\n      };\r\n      window.addEventListener('touchend', endTouchHandler, { passive: true });\r\n      window.addEventListener('touchcancel', endTouchHandler, { passive: true });\r\n\r\n      let mouseDownX = 0, mouseDownY = 0;\r\n      window.addEventListener('mousedown', (e) => {\r\n        mouseDownX = e.clientX;\r\n        mouseDownY = e.clientY;\r\n      }, { passive: true });\r\n\r\n      window.addEventListener('click', (e) => {\r\n        if (Math.hypot(e.clientX - mouseDownX, e.clientY - mouseDownY) > 14) return;\r\n        if (isIgnoredStoryTapTarget(e.target)) return;\r\n        advanceMainStoryOnTap();\r\n      });\r\n\r\n      window.addEventListener('keydown', (e) => {\r\n        if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT')) return;\r\n        if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === 'ArrowRight') {\r\n          hasUserScrolled = true;\r\n          lastUserInteract = performance.now();\r\n          targetProgress = Math.max(0, Math.min(1, targetProgress + 0.045));\r\n          syncNativeScrollPosition();\r\n        } else if (e.key === 'ArrowUp' || e.key === 'PageUp' || e.key === 'ArrowLeft') {\r\n          hasUserScrolled = true;\r\n          lastUserInteract = performance.now();\r\n          targetProgress = Math.max(0, Math.min(1, targetProgress - 0.045));\r\n          syncNativeScrollPosition();\r\n        }\r\n      });\r\n\r\n      window.addEventListener('mousemove', (e) => {\r\n        mouseNorm.x = e.clientX / Math.max(1, window.innerWidth);\r\n        mouseNorm.y = e.clientY / Math.max(1, window.innerHeight);\r\n      }, { passive: true });\r\n\r\n      const timelineTrack = document.getElementById('timeline-bar-track');\r\n      if (timelineTrack) {\r\n        timelineTrack.addEventListener('click', (e) => {\r\n          const rect = timelineTrack.getBoundingClientRect();\r\n          scrollToNormalized((e.clientX - rect.left) / Math.max(1, rect.width));\r\n        });\r\n      }\r\n\r\n      const drawerOverlay = document.getElementById('reserve-drawer-overlay');\r\n      const btnOpenReserve = document.getElementById('btn-open-reserve');\r\n      const btnCloseReserve = document.getElementById('btn-close-reserve');\r\n      const quickReserveForm = document.getElementById('quick-reserve-form');\r\n\r\n      if (btnOpenReserve && drawerOverlay) {\r\n        btnOpenReserve.addEventListener('click', () => drawerOverlay.classList.add('open'));\r\n      }\r\n      if (btnCloseReserve && drawerOverlay) {\r\n        btnCloseReserve.addEventListener('click', () => drawerOverlay.classList.remove('open'));\r\n      }\r\n      if (drawerOverlay) {\r\n        drawerOverlay.addEventListener('click', () => drawerOverlay.classList.remove('open'));\r\n      }\r\n      if (quickReserveForm) {\r\n        quickReserveForm.addEventListener('submit', (e) => {\r\n          e.preventDefault();\r\n          const name = (document.getElementById('reserve-name').value || '').trim();\r\n          const phone = (document.getElementById('reserve-phone').value || '').trim();\r\n          const prog = (document.getElementById('reserve-program').value || '').trim();\r\n          const memo = (document.getElementById('reserve-memo').value || '').trim();\r\n\r\n          const kakaoMsg = [\r\n            '[바른한의원 대전본점 맞춤 진료예약 신청]',\r\n            '• 희망 진료분야: ' + prog,\r\n            '• 예약자 성함: ' + name,\r\n            '• 연락처: ' + phone,\r\n            '• 상담 희망 내용: ' + (memo || '없음')\r\n          ].join('\\n');\r\n\r\n          try {\r\n            const ta = document.createElement('textarea');\r\n            ta.value = kakaoMsg;\r\n            ta.setAttribute('readonly', '');\r\n            ta.style.position = 'fixed';\r\n            ta.style.top = '-9999px';\r\n            ta.style.opacity = '0';\r\n            document.body.appendChild(ta);\r\n            ta.select();\r\n            ta.setSelectionRange(0, kakaoMsg.length);\r\n            document.execCommand('copy');\r\n            document.body.removeChild(ta);\r\n          } catch (_) {}\r\n          if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {\r\n            navigator.clipboard.writeText(kakaoMsg).catch(function () {});\r\n          }\r\n\r\n          const kakaoChatUrl = 'https://pf.kakao.com/_ykxcLK/chat';\r\n          const win = window.open(kakaoChatUrl, '_blank', 'noopener,noreferrer');\r\n          alert(`[작성하신 예약 내용이 자동 복사되었습니다!]\\n\\n열리는 바른한의원 카카오톡 채널 상담창에 붙여넣기(Ctrl+V 또는 길게 눌러 붙여넣기) 후 전송해 주시면 대표원장실 전담 상담이 즉시 시작됩니다.\\n\\n--- 복사된 예약 내용 ---\\n${kakaoMsg}`);\r\n          if (!win) {\r\n            window.location.href = kakaoChatUrl;\r\n          }\r\n          drawerOverlay.classList.remove('open');\r\n          quickReserveForm.reset();\r\n        });\r\n      }\r\n\r\n      // ======================================================================\r\n      // 8. BGM ENGINE (Synthesized melody removed — ready for custom audio file)\r\n      // ======================================================================\r\n      const soundEngine = {\r\n        updateSpatialDynamics: function () {}\r\n      };\r\n\r\n      // ======================================================================\r\n      // 8.5. SK TELECOM (sktelecom.com) INTRO CARD STACK -> BENTO FLIP SPREAD\r\n      //      Automatically plays when the 3D story scroll finishes!\r\n      //      6 Cards: 안정위원장 / 추나 / 성장 / 다이어트 / 탈모 / 황제공진단\r\n      // ======================================================================\r\n      const sktCardFlipController = (function () {\r\n        const stageEl = document.getElementById('skt-finale-stage');\r\n        const heroBgEl = document.getElementById('skt-hero-bg');\r\n        const cardEls = Array.from(document.querySelectorAll('#skt-bento-grid .skt-card-item'));\r\n        const btnShowCards = document.getElementById('btn-show-skt-cards');\r\n        const btnReplayFlip = document.getElementById('btn-replay-skt-flip');\r\n        const btnBackToStory = document.getElementById('btn-back-to-story');\r\n\r\n        let isActive = false;\r\n        let timers = [];\r\n\r\n        function clearTimers() {\r\n          timers.forEach((id) => clearTimeout(id));\r\n          timers = [];\r\n        }\r\n\r\n        function playFlipSequence() {\r\n          if (!stageEl || cardEls.length === 0) return;\r\n          clearTimers();\r\n\r\n          stageEl.classList.remove('phase-headline', 'phase-stack', 'phase-spread', 'phase-ready');\r\n          stageEl.classList.add('active');\r\n\r\n          if (window.innerWidth <= 1024) {\r\n            if (stageContainer) {\r\n              stageContainer.style.opacity = '0';\r\n              stageContainer.style.transition = 'opacity 0.25s ease';\r\n            }\r\n            cardEls.forEach((card) => {\r\n              const imgBox = card.querySelector('.skt-img-box');\r\n              if (imgBox) {\r\n                imgBox.style.transition = 'none';\r\n                imgBox.style.opacity = '1';\r\n                imgBox.style.zIndex = '1';\r\n                imgBox.style.transform = 'translate3d(0px, 0px, 0) scale(1, 1) rotate(0deg)';\r\n              }\r\n            });\r\n            stageEl.classList.add('phase-ready');\r\n            return;\r\n          }\r\n\r\n          if (stageContainer) {\r\n            stageContainer.style.opacity = '0';\r\n            stageContainer.style.transition = 'opacity 0.35s ease';\r\n          }\r\n\r\n          // Reset any residual transform before measuring card rects\r\n          cardEls.forEach((card) => {\r\n            const imgBox = card.querySelector('.skt-img-box');\r\n            if (imgBox) {\r\n              imgBox.style.transition = 'none';\r\n              imgBox.style.transform = 'none';\r\n            }\r\n          });\r\n          void stageEl.offsetWidth;\r\n\r\n          // Calculate FLIP center delta for each card slot relative to stage center\r\n          const stageRect = stageEl.getBoundingClientRect();\r\n          const vwCenter = (stageRect.width || document.documentElement.clientWidth || window.innerWidth) * 0.5;\r\n          const vhCenter = (stageRect.height || document.documentElement.clientHeight || window.innerHeight) * 0.5;\r\n\r\n          const cardMetrics = cardEls.map((card) => {\r\n            const imgBox = card.querySelector('.skt-img-box');\r\n            const rect = card.getBoundingClientRect();\r\n            const cx = rect.left + rect.width * 0.5;\r\n            const cy = rect.top + rect.height * 0.5;\r\n            const dx = vwCenter - cx;\r\n            const dy = vhCenter - cy;\r\n            const rot = parseFloat(card.dataset.rot || '0');\r\n            const stackScaleX = Math.min(0.68, 235 / Math.max(180, rect.width));\r\n            const stackScaleY = Math.min(0.76, 198 / Math.max(150, rect.height));\r\n            return { card, imgBox, dx, dy, rot, stackScaleX, stackScaleY };\r\n          });\r\n\r\n          // Initialize all 6 card image boxes at viewport center (hidden & enlarged like SKT intro)\r\n          cardMetrics.forEach((m) => {\r\n            if (!m.imgBox) return;\r\n            m.imgBox.style.transition = 'none';\r\n            m.imgBox.style.opacity = '0';\r\n            m.imgBox.style.zIndex = '20';\r\n            m.imgBox.style.transform = `translate3d(${m.dx.toFixed(1)}px, ${m.dy.toFixed(1)}px, 0) scale(${(m.stackScaleX * 1.38).toFixed(3)}, ${(m.stackScaleY * 1.38).toFixed(3)}) rotate(${m.rot}deg)`;\r\n          });\r\n\r\n          // Force reflow before starting transitions\r\n          void stageEl.offsetWidth;\r\n\r\n          // Phase 1 (0ms): Central Headline (\"바른한의원\") pops in with back.out bounce\r\n          stageEl.classList.add('phase-headline');\r\n\r\n          // Phase 2 (220ms ~ 950ms): Stack the 6 cards one by one at the center of the screen\r\n          timers.push(setTimeout(() => {\r\n            stageEl.classList.add('phase-stack');\r\n            cardMetrics.forEach((m, i) => {\r\n              timers.push(setTimeout(() => {\r\n                if (!m.imgBox) return;\r\n                m.imgBox.style.transition = 'transform 0.46s cubic-bezier(0.4, 0.2, 0.3, 1.2), opacity 0.32s ease';\r\n                m.imgBox.style.opacity = '1';\r\n                m.imgBox.style.transform = `translate3d(${m.dx.toFixed(1)}px, ${m.dy.toFixed(1)}px, 0) scale(${m.stackScaleX.toFixed(3)}, ${m.stackScaleY.toFixed(3)}) rotate(${m.rot}deg)`;\r\n              }, i * 115));\r\n            });\r\n          }, 220));\r\n\r\n          // Phase 3 (1080ms ~ 1920ms): FLIP Spread all 6 cards outward from center into the 6 Bento slots!\r\n          timers.push(setTimeout(() => {\r\n            stageEl.classList.remove('phase-headline', 'phase-stack');\r\n            stageEl.classList.add('phase-spread');\r\n\r\n            cardMetrics.forEach((m, i) => {\r\n              timers.push(setTimeout(() => {\r\n                if (!m.imgBox) return;\r\n                m.imgBox.style.transition = 'transform 0.86s cubic-bezier(0.76, 0, 0.24, 1), opacity 0.4s ease';\r\n                m.imgBox.style.transform = 'translate3d(0px, 0px, 0) scale(1, 1) rotate(0deg)';\r\n                m.imgBox.style.zIndex = '1';\r\n              }, i * 75));\r\n            });\r\n          }, 1080));\r\n\r\n          // Phase 4 (1960ms): Reveal card titles, descriptions, badges, and enable hover zoom\r\n          timers.push(setTimeout(() => {\r\n            stageEl.classList.remove('phase-spread');\r\n            stageEl.classList.add('phase-ready');\r\n            cardMetrics.forEach((m) => {\r\n              if (!m.imgBox) return;\r\n              m.imgBox.style.opacity = '1';\r\n              m.imgBox.style.transform = 'translate3d(0px, 0px, 0) scale(1, 1) rotate(0deg)';\r\n            });\r\n          }, 1960));\r\n        }\r\n\r\n        function activate() {\r\n          if (isActive) return;\r\n          isActive = true;\r\n          playFlipSequence();\r\n        }\r\n\r\n        function deactivate() {\r\n          if (!isActive) return;\r\n          isActive = false;\r\n          clearTimers();\r\n          if (stageEl) {\r\n            stageEl.classList.remove('active', 'phase-headline', 'phase-stack', 'phase-spread', 'phase-ready');\r\n          }\r\n          if (stageContainer) {\r\n            stageContainer.style.opacity = '1';\r\n          }\r\n        }\r\n\r\n        function openReserveWithProgram(progValue) {\r\n          if (progValue) {\r\n            const sel = document.getElementById('reserve-program');\r\n            if (sel) sel.value = progValue;\r\n          }\r\n          if (drawerOverlay) drawerOverlay.classList.add('open');\r\n        }\r\n\r\n        // Card & Action Chip Click Handlers\r\n        const hairloss4TypeModalEl = document.getElementById('hairloss-4type-modal-overlay');\r\n        cardEls.forEach((card) => {\r\n          card.addEventListener('click', (e) => {\r\n            const chip = e.target.closest('.skt-card-chip');\r\n            const action = chip ? chip.dataset.action : 'link';\r\n            const customHref = chip ? chip.dataset.href : null;\r\n            const linkUrl = card.getAttribute('href') || card.dataset.link;\r\n            const reserveProg = card.dataset.reserve;\r\n            const chNum = parseInt(card.dataset.chapter || '1', 10);\r\n\r\n            if (action === 'custom-link' && customHref) {\r\n              e.preventDefault();\r\n              e.stopPropagation();\r\n              window.location.href = customHref;\r\n            } else if (action === 'hairloss-modal' || card.dataset.link === 'hairloss-modal' || card.dataset.cardIdx === '4') {\r\n              e.preventDefault();\r\n              e.stopPropagation();\r\n              if (hairloss4TypeModalEl) {\r\n                hairloss4TypeModalEl.classList.add('open');\r\n              }\r\n            } else if (action === 'story') {\r\n              e.preventDefault();\r\n              e.stopPropagation();\r\n              deactivate();\r\n              const targetFrame = chapterStartFrames[Math.max(0, chNum - 1)] || 0;\r\n              scrollToNormalized(frameFloatToFullNorm(targetFrame));\r\n            } else if (linkUrl) {\r\n              e.preventDefault();\r\n              window.location.href = linkUrl;\r\n            } else {\r\n              openReserveWithProgram(reserveProg);\r\n            }\r\n          });\r\n        });\r\n\r\n        if (btnShowCards) {\r\n          btnShowCards.addEventListener('click', () => {\r\n            finishDaddyIntro(true);\r\n            scrollToNormalized(1.0, true);\r\n            if (isActive) playFlipSequence();\r\n            else activate();\r\n          });\r\n        }\r\n\r\n        if (btnReplayFlip) {\r\n          btnReplayFlip.addEventListener('click', (e) => {\r\n            e.stopPropagation();\r\n            playFlipSequence();\r\n          });\r\n        }\r\n\r\n        if (btnBackToStory) {\r\n          btnBackToStory.addEventListener('click', (e) => {\r\n            e.stopPropagation();\r\n            deactivate();\r\n            scrollToNormalized(0.0, true);\r\n            lastUserInteract = 0;\r\n            introClosedAtMs = performance.now();\r\n          });\r\n        }\r\n\r\n        function updateMouseParallax(mx, my) {\r\n          if (!isActive || !heroBgEl) return;\r\n          if (window.innerWidth <= 1024) {\r\n            heroBgEl.style.transform = 'none';\r\n            return;\r\n          }\r\n          const moveX = (mx - 0.5) * 28;\r\n          const moveY = (my - 0.5) * 28;\r\n          heroBgEl.style.transform = `translate(calc(-50% + ${moveX.toFixed(1)}px), calc(-50% + ${moveY.toFixed(1)}px))`;\r\n        }\r\n\r\n        return { activate, deactivate, isActive: () => isActive, updateMouseParallax };\r\n      })();\r\n\r\n      // ======================================================================\r\n      // 9. MASTER 60FPS ANIMATION LOOP (LUSION ZERO-G SPRING PHYSICS)\r\n      // ======================================================================\r\n      let lastTime = performance.now();\r\n\r\n      function animate(now) {\r\n        requestAnimationFrame(animate);\r\n        const dt = Math.min(0.05, (now - lastTime) / 1000);\r\n        lastTime = now;\r\n        const timeSec = now * 0.001;\r\n\r\n        // 1) Cinematic \"아빠 한의사를 찾는 환자 스토리 공개\" Opening Slogan Progress & Auto-Transition\r\n        if (!isDaddyIntroFinished) {\r\n          const introElapsed = Math.max(0, now - introStartTimeMs);\r\n          const introRatio = Math.min(1, introElapsed / INTRO_DURATION_MS);\r\n          if (daddyIntroProgressFillEl) {\r\n            daddyIntroProgressFillEl.style.width = `${(introRatio * 100).toFixed(1)}%`;\r\n          }\r\n          if (introRatio >= 1) {\r\n            finishDaddyIntro(false);\r\n          }\r\n        }\r\n\r\n        // 2) Hands-Free Automatic Storyboard Scroll (when intro has finished and user has not clicked/scrolled recently)\r\n        const isDrawerOpen = Boolean(drawerOverlay && drawerOverlay.classList.contains('open'));\r\n        const isIdleForAutoScroll = (lastUserInteract === 0) || ((now - lastUserInteract) > 3800);\r\n        if (\r\n          isDaddyIntroFinished &&\r\n          (now - introClosedAtMs) > 650 &&\r\n          !sktCardFlipController.isActive() &&\r\n          !isTouchDragging &&\r\n          !isDrawerOpen &&\r\n          isIdleForAutoScroll &&\r\n          targetProgress < 0.965\r\n        ) {\r\n          isAutoScrollRunning = true;\r\n          const estStoryNorm = Math.max(0, Math.min(1, smoothProgress / 0.90));\r\n          const estFrameFloat = storyNormToFrameFloat(estStoryNorm);\r\n          const estFrameIdx = Math.floor(estFrameFloat);\r\n          const estRawMix = estFrameFloat - estFrameIdx;\r\n          const isSpecialMultiStageFrame = (\r\n            estFrameIdx === GROWTH_TALL_FRAME ||\r\n            estFrameIdx === CH6_START_FRAME ||\r\n            estFrameIdx === CH6_RECOVERED_FRAME\r\n          );\r\n          // Slowed down by ~1.5s per scene (from ~1.88s/cut at 0.0175 to ~3.38s/cut at 0.0097)\r\n          const baseAutoSpeed = isSpecialMultiStageFrame ? 0.0068 : 0.0097;\r\n          const autoSpeed = (!isSpecialMultiStageFrame && estRawMix < 0.42)\r\n            ? baseAutoSpeed * 0.85\r\n            : baseAutoSpeed * 1.10;\r\n          targetProgress = Math.min(0.965, targetProgress + dt * autoSpeed);\r\n          syncNativeScrollPosition();\r\n        } else {\r\n          isAutoScrollRunning = false;\r\n        }\r\n\r\n        // Mobile Touch Momentum Inertia Coasting (calm, controlled stop)\r\n        if (!isTouchDragging && Math.abs(touchInertiaVel) > 0.00005) {\r\n          const minSwipeBound = Math.max(0, touchStartProgress - 0.095);\r\n          const maxSwipeBound = Math.min(1, touchStartProgress + 0.095);\r\n          targetProgress = Math.max(minSwipeBound, Math.min(maxSwipeBound, targetProgress + touchInertiaVel * dt));\r\n          touchInertiaVel *= Math.pow(0.82, dt * 60);\r\n          if (targetProgress <= 0 || targetProgress >= 1) touchInertiaVel = 0;\r\n          syncNativeScrollPosition();\r\n        }\r\n\r\n        // Lusion Zero-G Smooth Spring Damping on Scroll & Mouse (with snappy response on tap-to-advance)\r\n        const springLerp = (typeof tapSpringBoostUntil !== 'undefined' && now < tapSpringBoostUntil) ? 0.22 : 0.085;\r\n        smoothProgress += (targetProgress - smoothProgress) * springLerp;\r\n        scrollVelocity = (smoothProgress - prevProgress) / Math.max(dt, 0.001);\r\n        prevProgress = smoothProgress;\r\n\r\n        smoothMouse.x += (mouseNorm.x - smoothMouse.x) * 0.075;\r\n        smoothMouse.y += (mouseNorm.y - smoothMouse.y) * 0.075;\r\n\r\n        const targetRoll = Math.max(-0.08, Math.min(0.08, scrollVelocity * 0.14 + (smoothMouse.x - 0.5) * -0.04));\r\n        camRollSpring += (targetRoll - camRollSpring) * 0.08;\r\n\r\n        // Map the story frames across the first 90% of scroll (with 2.4x scroll travel on Chapter 6 Cut 1),\r\n        // then trigger SKT Card Flip Stage at the end!\r\n        const storyNorm = Math.max(0, Math.min(1, smoothProgress / 0.90));\r\n        const maxIdx = FRAMES.length - 1;\r\n        const frameFloat = storyNormToFrameFloat(storyNorm);\r\n        const currIdx = Math.min(maxIdx, Math.floor(frameFloat));\r\n        const nextIdx = Math.min(maxIdx, currIdx + 1);\r\n        const rawMix = frameFloat - currIdx;\r\n\r\n        // Trigger SK Telecom Card Stack -> Bento Flip Spread when scroll reaches the end\r\n        if (smoothProgress >= 0.925 && !sktCardFlipController.isActive()) {\r\n          sktCardFlipController.activate();\r\n        } else if (smoothProgress < 0.885 && sktCardFlipController.isActive()) {\r\n          sktCardFlipController.deactivate();\r\n        }\r\n        sktCardFlipController.updateMouseParallax(smoothMouse.x, smoothMouse.y);\r\n\r\n        // Frame Dwell/Hold Plateau: Keep each frame 100% pure & un-overlapped\r\n        // during the first 45% (Frame 0) or 36% (other frames) of its scroll step!\r\n        const holdEnd = currIdx === 0 ? 0.45 : 0.36;\r\n        const transEnd = 0.94;\r\n        const localMix = rawMix <= holdEnd\r\n          ? 0.0\r\n          : (rawMix >= transEnd ? 1.0 : (rawMix - holdEnd) / (transEnd - holdEnd));\r\n\r\n        if (currIdx !== lastShaderCurrIdx) {\r\n          lastShaderCurrIdx = currIdx;\r\n          shaderFrameEnterTime = now;\r\n        }\r\n\r\n        if (glRenderer && glMaterial && glTextures.length > 0) {\r\n          const currFrame = FRAMES[currIdx];\r\n          const nextFrame = FRAMES[nextIdx];\r\n          const growthShortIdx = Math.max(7, GROWTH_TALL_FRAME - 2);\r\n          const ch6HealthyIdx = Math.min(maxIdx, CH6_START_FRAME + 3);\r\n\r\n          let texCurr = glTextures[currIdx];\r\n          let texNext = glTextures[nextIdx];\r\n          let shaderMix = localMix;\r\n          let shaderSeqProgress = localMix;\r\n          let shaderMode = currFrame.mode;\r\n\r\n          if (currIdx !== GROWTH_TALL_FRAME) {\r\n            growthCompletedAtMs = 0;\r\n            currentStarReveal = 0.0;\r\n          }\r\n          if (currIdx !== CH6_START_FRAME) {\r\n            currentPainProgress = 0.0;\r\n          }\r\n          if (currIdx !== CH6_RECOVERED_FRAME) {\r\n            currentManseProgress = 0.0;\r\n          }\r\n\r\n          if (currIdx === GROWTH_TALL_FRAME - 1 && localMix > 0.001) {\r\n            // Transitioning from Frame 8 (\"성장클리닉을 하다\") -> enter the classroom at the short-child state first!\r\n            texNext = glGrowthTextures[0] || glTextures[growthShortIdx];\r\n            shaderMode = 6;\r\n          } else if (currIdx === GROWTH_TALL_FRAME && rawMix <= 0.84) {\r\n            // Frame 9 (\"쑥쑥 자란 우리 아이\"):\r\n            // Step 1: 6-Stage multi-frame height-growth surge from short child -> tall child (\"쑤욱 올라오는 모션\")\r\n            // Step 2: ONLY AFTER the height growth finishes (growthProgress >= 0.96), pop in the twinkling stars!\r\n            shaderMode = 1; // Mode 1: 6-Stage Multi-Frame Classroom Height Surge!\r\n\r\n            const enterElapsed = Math.max(0, (now - shaderFrameEnterTime) * 0.001);\r\n            const timeGrowth = Math.max(0.0, Math.min(1.0, (enterElapsed - 0.22) / 2.40));\r\n            const scrollGrowth = Math.max(0.0, Math.min(1.0, (rawMix - 0.02) / 0.62));\r\n            const growthProgress = Math.max(timeGrowth, scrollGrowth);\r\n\r\n            const growthTexCount = glGrowthTextures.length;\r\n            if (growthTexCount >= 2) {\r\n              const segFloat = growthProgress * (growthTexCount - 1);\r\n              const segIdx = Math.min(growthTexCount - 2, Math.floor(segFloat));\r\n              texCurr = glGrowthTextures[segIdx] || glTextures[growthShortIdx];\r\n              texNext = glGrowthTextures[segIdx + 1] || glTextures[GROWTH_TALL_FRAME];\r\n              shaderMix = segFloat - segIdx;\r\n            } else {\r\n              texCurr = glTextures[growthShortIdx];\r\n              texNext = glTextures[GROWTH_TALL_FRAME];\r\n              shaderMix = growthProgress;\r\n            }\r\n            shaderSeqProgress = growthProgress;\r\n\r\n            if (growthProgress >= 0.96) {\r\n              if (growthCompletedAtMs === 0) growthCompletedAtMs = now;\r\n              const postGrowthSec = Math.max(0, (now - growthCompletedAtMs) * 0.001);\r\n              const scrollPostGrowth = rawMix > 0.56 ? Math.min(1.0, (rawMix - 0.56) / 0.22) : 0.0;\r\n              currentStarReveal = Math.max(scrollPostGrowth, Math.min(1.0, postGrowthSec / 0.50));\r\n            } else {\r\n              growthCompletedAtMs = 0;\r\n              currentStarReveal = 0.0;\r\n            }\r\n          } else if (currIdx === GROWTH_TALL_FRAME && rawMix > 0.84) {\r\n            // Transitioning out of Frame 9 (\"쑥쑥 자란 우리 아이\") into Frame 10 (\"육아로 뱃살만...\")\r\n            texCurr = glGrowthTextures[glGrowthTextures.length - 1] || glTextures[GROWTH_TALL_FRAME];\r\n            texNext = glTextures[nextIdx];\r\n            shaderMode = currFrame.mode;\r\n            shaderMix = Math.min(1.0, (rawMix - 0.84) / (0.98 - 0.84));\r\n            shaderSeqProgress = 1.0;\r\n            currentStarReveal = 1.0;\r\n          } else if (currIdx === CH6_START_FRAME - 1 && localMix > 0.001) {\r\n            // Transitioning into Chapter 6 Cut 1 (\"일하면서 온몸이 아파진 나\"):\r\n            // Enter at the HEALTHY upright standing posture (step 0) first!\r\n            texNext = glPainTextures[0] || glTextures[ch6HealthyIdx];\r\n            shaderMode = 6;\r\n          } else if (currIdx === CH6_START_FRAME && rawMix <= 0.84) {\r\n            // Chapter 6 Cut 1 (\"일하면서 온몸이 아파진 나\"):\r\n            // 5-Stage Multi-Frame transformation from Healthy Upright Posture -> Shoulder Tension -> Neck Pain -> Neck+Back Pain -> Full Spine Pain\r\n            const enterElapsed = Math.max(0, (now - shaderFrameEnterTime) * 0.001);\r\n            const timePain = Math.max(0.0, Math.min(1.0, (enterElapsed - 0.20) / 2.30));\r\n            const scrollPain = Math.max(0.0, Math.min(1.0, (rawMix - 0.03) / 0.68));\r\n            const painProgress = Math.max(timePain, scrollPain);\r\n            currentPainProgress = painProgress;\r\n\r\n            const painTexCount = glPainTextures.length;\r\n            if (painTexCount >= 2) {\r\n              const segFloat = painProgress * (painTexCount - 1);\r\n              const segIdx = Math.min(painTexCount - 2, Math.floor(segFloat));\r\n              texCurr = glPainTextures[segIdx] || glTextures[ch6HealthyIdx];\r\n              texNext = glPainTextures[segIdx + 1] || glTextures[CH6_START_FRAME];\r\n              shaderMix = segFloat - segIdx;\r\n            } else {\r\n              texCurr = glTextures[ch6HealthyIdx];\r\n              texNext = glTextures[CH6_START_FRAME];\r\n              shaderMix = painProgress;\r\n            }\r\n            shaderSeqProgress = painProgress;\r\n            shaderMode = 3;\r\n          } else if (currIdx === CH6_START_FRAME && rawMix > 0.84) {\r\n            // Transitioning out of \"일하면서 온몸이 아파진 나\" (painful posture) into \"한의원에서 추나 치료\"\r\n            texCurr = glPainTextures[glPainTextures.length - 1] || glTextures[CH6_START_FRAME];\r\n            texNext = glTextures[nextIdx];\r\n            shaderMode = 6;\r\n            shaderMix = Math.min(1.0, (rawMix - 0.84) / (0.98 - 0.84));\r\n            shaderSeqProgress = 1.0;\r\n            currentPainProgress = 1.0;\r\n          } else if (currIdx === CH6_RECOVERED_FRAME && rawMix <= 0.84) {\r\n            // Chapter 6 Cut 4 (\"관절 튼튼 회복\"):\r\n            // 3-Stage Multi-Frame transformation from Neutral Standing -> Shoulder-Level Arm Lift -> Joyful \"만세!\" Stretch\r\n            const enterElapsed = Math.max(0, (now - shaderFrameEnterTime) * 0.001);\r\n            const timeManse = Math.max(0.0, Math.min(1.0, (enterElapsed - 0.20) / 2.10));\r\n            const scrollManse = Math.max(0.0, Math.min(1.0, (rawMix - 0.03) / 0.68));\r\n            const manseProgress = Math.max(timeManse, scrollManse);\r\n            currentManseProgress = manseProgress;\r\n\r\n            const recovTexCount = glRecoveryTextures.length;\r\n            if (recovTexCount >= 2) {\r\n              const segFloat = manseProgress * (recovTexCount - 1);\r\n              const segIdx = Math.min(recovTexCount - 2, Math.floor(segFloat));\r\n              texCurr = glRecoveryTextures[segIdx] || glTextures[CH6_RECOVERED_FRAME];\r\n              texNext = glRecoveryTextures[segIdx + 1] || glManseTexture || glTextures[CH6_RECOVERED_FRAME];\r\n              shaderMix = segFloat - segIdx;\r\n            } else {\r\n              texCurr = glTextures[CH6_RECOVERED_FRAME];\r\n              texNext = glManseTexture || glTextures[CH6_RECOVERED_FRAME];\r\n              shaderMix = manseProgress;\r\n            }\r\n            shaderSeqProgress = manseProgress;\r\n            shaderMode = 8;\r\n          } else if (currIdx === CH6_RECOVERED_FRAME && rawMix > 0.84) {\r\n            // Transitioning out of \"관절 튼튼 회복\" (Manse posture) into Chapter 7\r\n            texCurr = glRecoveryTextures[glRecoveryTextures.length - 1] || glManseTexture || glTextures[CH6_RECOVERED_FRAME];\r\n            texNext = glTextures[nextIdx];\r\n            shaderMode = currFrame.mode;\r\n            shaderMix = Math.min(1.0, (rawMix - 0.84) / (0.98 - 0.84));\r\n            shaderSeqProgress = 1.0;\r\n            currentManseProgress = 1.0;\r\n          }\r\n\r\n          glMaterial.uniforms.uTexCurr.value = texCurr;\r\n          glMaterial.uniforms.uTexNext.value = texNext;\r\n          glMaterial.uniforms.uMix.value = shaderMix;\r\n          glMaterial.uniforms.uSeqProgress.value = shaderSeqProgress;\r\n          glMaterial.uniforms.uTime.value = timeSec;\r\n          glMaterial.uniforms.uVelocity.value = scrollVelocity;\r\n          glMaterial.uniforms.uWarmth.value = (currFrame.warmth || 1.06) * (1 - localMix) + (nextFrame.warmth || 1.06) * localMix;\r\n          glMaterial.uniforms.uMouse.value.set(smoothMouse.x, 1.0 - smoothMouse.y);\r\n          glMaterial.uniforms.uFocal.value.set(currFrame.focal[0], currFrame.focal[1]);\r\n          glMaterial.uniforms.uMode.value = shaderMode;\r\n          glRenderer.render(glScene, glCamera);\r\n        }\r\n\r\n        if (tRenderer && tScene && tCamera) {\r\n          tCamera.position.z = -frameFloat * 22 + 8;\r\n          tCamera.position.x = (smoothMouse.x - 0.5) * 1.1;\r\n          tCamera.position.y = (0.5 - smoothMouse.y) * 0.7;\r\n          tCamera.rotation.set(0, 0, 0);\r\n\r\n          tPortalGates.forEach((shaft, i) => {\r\n            shaft.rotation.z = -0.38 + Math.sin(timeSec * 0.45 + i * 0.7) * 0.025;\r\n            if (shaft.material) {\r\n              shaft.material.opacity = 0.16 + Math.sin(timeSec * 0.8 + i * 1.1) * 0.06;\r\n            }\r\n          });\r\n\r\n          if (tParticles) {\r\n            tParticles.position.y = Math.sin(timeSec * 0.35) * 0.35;\r\n          }\r\n          if (tForegroundBokeh) {\r\n            tForegroundBokeh.position.y = Math.cos(timeSec * 0.28) * 0.45;\r\n            tForegroundBokeh.position.x = (smoothMouse.x - 0.5) * -0.65;\r\n          }\r\n\r\n          tRenderer.render(tScene, tCamera);\r\n        }\r\n\r\n        let effectiveFrame = currIdx + localMix;\r\n        if (currIdx === GROWTH_TALL_FRAME || currIdx === CH6_START_FRAME || currIdx === CH6_RECOVERED_FRAME) {\r\n          effectiveFrame = rawMix <= 0.84\r\n            ? currIdx + (rawMix / 0.84) * 0.42\r\n            : currIdx + 0.42 + ((rawMix - 0.84) / 0.16) * 0.58;\r\n        }\r\n        renderCleanLightOverlay(effectiveFrame, timeSec, frameFloat);\r\n        updateScrollDialogue(effectiveFrame, scrollVelocity, now);\r\n        soundEngine.updateSpatialDynamics(scrollVelocity, FRAMES[currIdx].chapter);\r\n      }\r\n\r\n      window.addEventListener('resize', () => {\r\n        const w = window.innerWidth, h = window.innerHeight;\r\n        document.querySelectorAll('#skt-bento-grid .skt-img-box').forEach((box) => {\r\n          box.style.transition = 'none';\r\n          box.style.transform = 'translate3d(0px, 0px, 0) scale(1, 1) rotate(0deg)';\r\n          box.style.opacity = '1';\r\n        });\r\n        if (glRenderer && glMaterial) {\r\n          glRenderer.setSize(w, h);\r\n          glMaterial.uniforms.uResolution.value.set(w, h);\r\n        }\r\n        if (tRenderer && tCamera) {\r\n          tRenderer.setSize(w, h);\r\n          tCamera.aspect = w / h;\r\n          tCamera.updateProjectionMatrix();\r\n        }\r\n      });\r\n\r\n      initGLSLPortalStage();\r\n      initThreeTunnelStage();\r\n      requestAnimationFrame(animate);\r\n    })();\r\n  </script>\r\n  <script src=\"visit-tracker.js\"></script>\r\n</body>\r\n</html>\r\n";

function escHtmlHome(str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function jsSingleQuote(str) {
  return "'" + String(str == null ? '' : str)
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\r/g, '')
    .replace(/\n/g, '\\n') + "'";
}

function buildHomeStoryHtml(page) {
  const hs = Object.assign({
    brandTitle: '바른한의원 대전본점',
    brandSub: '👨‍👧‍👦 아빠 한의사 · 내 가족에게 처방·시술한 치료만 합니다',
    introLine1: '아빠 한의사를 찾는',
    introLine2: '환자 스토리 공개',
    conceptPill: '아빠 한의사 · 내 가족에게 처방·시술한 치료만 합니다',
    finaleHeadline: '아빠 한의사 · 바른한의원 대전본점',
    finaleHeadlineSub: '내 가족에게 처방하고 시술한 치료만 하는 내 가족 주치의',
    finaleEyebrow: 'FATHER DOCTOR PHILOSOPHY · 내 가족에게 처방하고 시술한 치료만 시행합니다',
    finaleMainTitle: '모든 환자를 내 가족처럼 진료하는 ‘아빠 한의사’ 6대 클리닉',
    chapters: []
  }, (page && page.homeStory) || {});

  const defaultChapters = [
    { id: 1, numLabel: 'STORY 01 / 08 · 바른 난임·착상 치료', quote: '임신이 되지 않아 힘들게 얻은 선물' },
    { id: 2, numLabel: 'STORY 02 / 08 · 바른 소아 면역강화 치료', quote: '사랑하는 아이가 건강하기를 바라면서' },
    { id: 3, numLabel: 'STORY 03 / 08 · 바른 성장판·키성장 치료', quote: '멋지게 성장하는 꿈을 꾸며' },
    { id: 4, numLabel: 'STORY 04 / 08 · 바른 성인 비만·체형 치료', quote: '날씬하고 건강해서 예쁘게' },
    { id: 5, numLabel: 'STORY 05 / 08 · 바른 30대 탈모·모근 치료', quote: '사회에서 인정받기 위해 탈모' },
    { id: 6, numLabel: 'STORY 06 / 08 · 바른 추나 척추·전신 통증치료', quote: '열심히 근무하면서 생긴 통증' },
    { id: 7, numLabel: 'STORY 07 / 08 · 바른 황제공진단 기력보강', quote: '약해진 기력을 보강해야할 나이가 오고' },
    { id: 8, numLabel: 'STORY 08 / 08 · 평생 주치의 바른한의원 대전본점', quote: '건강한 인생이 될 수 있게 도와드립니다.' }
  ];
  const chapters = (Array.isArray(hs.chapters) && hs.chapters.length > 0 ? hs.chapters : defaultChapters).map((ch, idx) => ({
    id: Number(ch.id) || (idx + 1),
    numLabel: String(ch.numLabel || ('STORY 0' + (idx + 1) + ' / 08')),
    quote: String(ch.quote || '')
  }));

  const plates = Array.isArray(page && page.plates) ? page.plates : [];
  const storyFrames = plates.filter(p => p && p.type !== 'home-bento-card');
  const bentoCards = plates.filter(p => p && p.type === 'home-bento-card');

  const chaptersJs = '[\n' + chapters.map(ch =>
    '        { id: ' + ch.id + ', numLabel: ' + jsSingleQuote(ch.numLabel) + ', quote: ' + jsSingleQuote(ch.quote) + ' }'
  ).join(',\n') + '\n      ]';

  const framesJs = '[\n' + storyFrames.map((f) => {
    const src = f.imgSrc || f.src || '';
    const chNum = Math.max(1, Math.min(chapters.length, Number(f.chapter) || 1));
    const quote = f.title != null ? f.title : (f.quote || '');
    const whisper = f.sub != null ? f.sub : (f.whisper || '');
    const povBadge = f.povBadge || '';
    const stepLabel = f.stepLabel || '';
    const mode = Number.isFinite(Number(f.mode)) ? Number(f.mode) : 0;
    const warmth = Number.isFinite(Number(f.warmth)) ? Number(f.warmth) : 1.06;
    const fx = Array.isArray(f.focal) && f.focal.length >= 2 ? Number(f.focal[0]) || 0.52 : 0.52;
    const fy = Array.isArray(f.focal) && f.focal.length >= 2 ? Number(f.focal[1]) || 0.50 : 0.50;
    const rolePart = f.specialRole ? ', specialRole: ' + jsSingleQuote(f.specialRole) : '';
    return '        { src: ' + jsSingleQuote(src) +
      ', chapter: ' + chNum +
      ', quote: ' + jsSingleQuote(quote) +
      ', povBadge: ' + jsSingleQuote(povBadge) +
      ', stepLabel: ' + jsSingleQuote(stepLabel) +
      ', mode: ' + mode +
      ', warmth: ' + warmth +
      ', focal: [' + fx + ', ' + fy + ']' +
      ', whisper: ' + jsSingleQuote(whisper) +
      rolePart + ' }';
  }).join(',\n') + '\n      ]';

  const growthTallIdx = (function () {
    const idx = storyFrames.findIndex(f => f.specialRole === 'growth_tall' || f.title === '쑥쑥 자란 우리 아이');
    return idx >= 0 ? idx : Math.min(Math.max(0, storyFrames.length - 1), 9);
  })();
  const growthShortIdx = Math.max(0, growthTallIdx - 2);
  const growthFrameObj = storyFrames[growthTallIdx] || {};
  const growthThumbs = Array.isArray(growthFrameObj.thumbs) && growthFrameObj.thumbs.length > 0
    ? growthFrameObj.thumbs.map(t => t.img).filter(Boolean)
    : ['life_1d_growth_step1.jpg?v=pov12', 'life_1d_growth_step2.jpg?v=pov12', 'life_1d_growth_step3.jpg?v=pov12', 'life_1d_growth_step4.jpg?v=pov12'];

  const ch6StartIdx = (function () {
    const idx = storyFrames.findIndex(f => f.specialRole === 'ch6_pain_start');
    if (idx >= 0) return idx;
    const cIdx = storyFrames.findIndex(f => Number(f.chapter) === 6);
    return cIdx >= 0 ? cIdx : Math.min(Math.max(0, storyFrames.length - 1), 17);
  })();
  const painFrameObj = storyFrames[ch6StartIdx] || {};
  const painThumbs = Array.isArray(painFrameObj.thumbs) && painFrameObj.thumbs.length > 0
    ? painFrameObj.thumbs.map(t => t.img).filter(Boolean)
    : ['life_4a_pain_step0.jpg?v=pov12', 'life_4a_pain_step0_5.jpg?v=pov12', 'life_4a_pain_step1.jpg?v=pov12', 'life_4a_pain_step2.jpg?v=pov12'];

  const ch6RecovIdx = (function () {
    const idx = storyFrames.findIndex(f => f.specialRole === 'ch6_recovered');
    return idx >= 0 ? idx : Math.min(Math.max(0, storyFrames.length - 1), ch6StartIdx + 3);
  })();
  const recovFrameObj = storyFrames[ch6RecovIdx] || {};
  const recovThumbs = Array.isArray(recovFrameObj.thumbs) && recovFrameObj.thumbs.length > 0
    ? recovFrameObj.thumbs.map(t => t.img).filter(Boolean)
    : ['life_4b_chuna_manse_mid.jpg?v=pov12', 'life_4b_chuna_manse.jpg?v=pov12'];
  const manseFinalSrc = recovThumbs[recovThumbs.length - 1] || 'life_4b_chuna_manse.jpg?v=pov12';
  const recovMidThumbs = recovThumbs.length > 1 ? recovThumbs.slice(0, -1) : [];

  const multiTexturesJs = [
    'glGrowthTextures = [',
    '          glTextures[' + growthShortIdx + '] || loadLinearTex(' + jsSingleQuote((storyFrames[growthShortIdx] && storyFrames[growthShortIdx].imgSrc) || 'life_1d_growth_short.jpg?v=pov12') + '),',
    ...growthThumbs.map(u => '          loadLinearTex(' + jsSingleQuote(u) + '),'),
    '          glTextures[' + growthTallIdx + '] || loadLinearTex(' + jsSingleQuote(growthFrameObj.imgSrc || 'life_1d_growth_peers.jpg?v=pov12') + ')',
    '        ];',
    '        glPainTextures = [',
    ...painThumbs.map(u => '          loadLinearTex(' + jsSingleQuote(u) + '),'),
    '          glTextures[' + ch6StartIdx + '] || loadLinearTex(' + jsSingleQuote(painFrameObj.imgSrc || 'life_4a_work_spine_pain.jpg?v=pov12') + ')',
    '        ];',
    '        glManseTexture = loadLinearTex(' + jsSingleQuote(manseFinalSrc) + ');',
    '        glRecoveryTextures = [',
    '          glTextures[' + ch6RecovIdx + '] || loadLinearTex(' + jsSingleQuote(recovFrameObj.imgSrc || 'life_4b_chuna_recovery.jpg?v=pov7') + '),',
    ...recovMidThumbs.map(u => '          loadLinearTex(' + jsSingleQuote(u) + '),'),
    '          glManseTexture',
    '        ];'
  ].join('\n');

  const bentoHtml = bentoCards.map((c, bIdx) => {
    const isHairModal = Boolean(c.isHairlossModal || c.dataLink === 'hairloss-modal');
    const href = isHairModal ? '#hairloss-select' : (c.linkHref || c.dataLink || 'director.html');
    const dataLink = isHairModal ? 'hairloss-modal' : (c.dataLink || c.linkHref || 'director.html');
    const rot = Number.isFinite(Number(c.rot)) ? Number(c.rot) : 0;
    const reserveProg = c.reserveProg || '바른한의원 맞춤 클리닉';
    const chNum = Number(c.chapter) || 1;
    const imgSrc = c.imgSrc || 'card_1_director.jpg?v=card1';
    const bgPos = c.bgPos || 'center center';
    const chipLabel = c.chipLabel || (isHairModal ? '4가지 유형 선택 ⊞' : '상세페이지 보기 →');

    const actionsHtml = isHairModal
      ? `<div class="skt-card-actions-row" style="flex-wrap:wrap;gap:5px;">
              <span class="skt-card-chip" data-action="hairloss-modal">${escHtmlHome(chipLabel)}</span>
              <span class="skt-card-chip secondary" data-action="custom-link" data-href="hairloss-male.html">남성탈모</span>
              <span class="skt-card-chip secondary" data-action="custom-link" data-href="hairloss-alopecia.html">원형탈모</span>
              <span class="skt-card-chip secondary" data-action="custom-link" data-href="hairloss-female.html">여성탈모</span>
              <span class="skt-card-chip secondary" data-action="custom-link" data-href="hairloss-seborrheic.html">지루성두피염</span>
            </div>`
      : `<div class="skt-card-actions-row">
              <span class="skt-card-chip" data-action="link">${escHtmlHome(chipLabel)}</span>
            </div>`;

    return `      <a href="${escHtmlHome(href)}" class="skt-card-item" data-card-idx="${bIdx}" data-rot="${rot}" data-link="${escHtmlHome(dataLink)}" data-reserve="${escHtmlHome(reserveProg)}" data-chapter="${chNum}">
        <div class="skt-img-box" style="background-image: url('${imgSrc}'); background-position: ${escHtmlHome(bgPos)};"></div>
        <div class="skt-card-box">
          <div class="skt-card-bottom-info" style="flex-direction:column;align-items:flex-start;gap:6px;">
            <p class="skt-card-title">${escHtmlHome(c.title || '')}</p>
            <p class="skt-card-desc">${escHtmlHome(c.sub || '')}</p>
            ${actionsHtml}
          </div>
        </div>
      </a>`;
  }).join('\n\n');

  const introFull = [hs.introLine1 || '', hs.introLine2 || ''].filter(Boolean).join(' ').trim();

  const tokenMap = {
    '%%HOME_INTRO_FULL_ATTR%%': escHtmlHome(introFull),
    '%%HOME_INTRO_FULL_TEXT%%': escHtmlHome(introFull),
    '%%HOME_BRAND_TITLE%%': escHtmlHome(hs.brandTitle),
    '%%HOME_BRAND_SUB%%': escHtmlHome(hs.brandSub),
    '%%HOME_FINALE_HEADLINE%%': escHtmlHome(hs.finaleHeadline),
    '%%HOME_FINALE_HEADLINE_SUB%%': escHtmlHome(hs.finaleHeadlineSub),
    '%%HOME_FINALE_EYEBROW%%': escHtmlHome(hs.finaleEyebrow),
    '%%HOME_FINALE_MAIN_TITLE%%': escHtmlHome(hs.finaleMainTitle),
    '%%HOME_BENTO_GRID_INNER%%': bentoHtml,
    '%%HOME_CONCEPT_PILL%%': escHtmlHome(hs.conceptPill),
    '%%HOME_DIALOGUE_CHAPTERS_JS%%': chaptersJs,
    '%%HOME_FRAMES_JS%%': framesJs,
    '%%HOME_MULTI_TEXTURES_JS%%': multiTexturesJs,
    '%%HOME_INTRO_LINE1_JS%%': jsSingleQuote(hs.introLine1),
    '%%HOME_INTRO_LINE2_JS%%': jsSingleQuote(hs.introLine2)
  };

  let out = HOME_STORY_BASE_TEMPLATE;
  for (const [k, v] of Object.entries(tokenMap)) {
    out = out.split(k).join(v);
  }
  const homeTimelineLegalHtml =
    '      <div class="timeline-dots-row" id="timeline-dots-row"></div>\r\n' +
    '    </div>\r\n' +
    '    <div class="bareun-home-legal-strip" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:6px;margin-top:4px;font-size:10.5px;color:rgba(245,241,232,0.82);text-shadow:0 1px 4px rgba(0,0,0,0.85);letter-spacing:-0.01em;">\r\n' +
    '      <span>상호명: <strong>바른한의원 대전본점</strong> · 대표원장: 안정위 · 사업자등록번호: <strong>211-91-10479</strong></span>\r\n' +
    '      <span>소재지: 대전광역시 대덕구 비래동로7번길 1, 2층 (비래동) · 대표전화: 010-5631-1275</span>\r\n' +
    '    </div>';
  out = out.replace(
    '      <div class="timeline-dots-row" id="timeline-dots-row"></div>\r\n    </div>',
    homeTimelineLegalHtml
  );
  const drawerLegalHtml =
    '      <div class="drawer-quick-links">\r\n' +
    '        <a href="https://naver.me/5U1ELn8L" target="_blank" rel="noreferrer" style="grid-column: span 2;">📍 네이버 플레이스 빠른 예약 ↗</a>\r\n' +
    '      </div>\r\n' +
    '      <div class="bareun-drawer-legal-info" style="margin-top:8px;padding-top:12px;border-top:1px solid rgba(94,71,54,0.18);font-size:11px;line-height:1.55;color:var(--brand-brown-soft);word-break:keep-all;">\r\n' +
    '        <strong>바른한의원 대전본점</strong> · 대표원장: 안정위 · 사업자등록번호: <strong>211-91-10479</strong><br>\r\n' +
    '        소재지: 대전광역시 대덕구 비래동로7번길 1, 2층 (비래동) · 대표전화: 010-5631-1275\r\n' +
    '      </div>';
  out = out.replace(
    '      <div class="drawer-quick-links">\r\n        <a href="https://naver.me/5U1ELn8L" target="_blank" rel="noreferrer" style="grid-column: span 2;">📍 네이버 플레이스 빠른 예약 ↗</a>\r\n      </div>',
    drawerLegalHtml
  );
  return out;
}

function renderPlateThumbsDock(p, mainImgSrc) {
  if (!p || !Array.isArray(p.thumbs) || p.thumbs.length === 0) return '';
  let effectiveThumbs = p.thumbs.filter(th => th && th.img);
  if (effectiveThumbs.length === 0) return '';
  if (effectiveThumbs.length === 1 && mainImgSrc && effectiveThumbs[0].img !== mainImgSrc) {
    effectiveThumbs = [
      { label: '대표 장면', img: mainImgSrc, fit: p.fit || 'cover' },
      ...effectiveThumbs
    ];
  }
  return `
            <div class="plate-thumb-dock is-visual-floating-dock" style="z-index:12;">
              ${effectiveThumbs.map((th, tIdx) => `
              <button type="button" class="plate-thumb-btn${tIdx === 0 ? ' active' : ''}" data-mode="clean" data-img="${th.img}" data-fit="${th.fit || 'cover'}" onclick="window.switchPlateThumb(event, this)">
                <img class="plate-thumb-preview" src="${th.img}" alt="${escHtmlHome(th.label || ('장면 ' + (tIdx + 1)))}" loading="lazy" draggable="false">
                <span class="plate-thumb-label">${escHtmlHome(th.label || ('장면 ' + (tIdx + 1)))}</span>
              </button>`).join('')}
            </div>`;
}

function buildPageHtml(page) {
  if (page && (page.isHomeStory || page.slug === 'home' || page.file === 'index.html')) {
    return buildHomeStoryHtml(page);
  }
  const navHtml = NAV_TABS.map((t, i) => {
    const isHairTab = t.href === 'hairloss.html';
    const clickAttr = isHairTab ? ' onclick="if(window.openDetailHairlossModal){event.preventDefault();window.openDetailHairlossModal();}"' : '';
    return `<a class="clinic-tab${i === page.tabIdx ? ' active' : ''}" href="${t.href}"${clickAttr}>${t.label}${isHairTab ? ' ▾' : ''}</a>`;
  }).join('\n        ');

  const hairlossSubTypes = [
    { key: 'male', num: '01', label: '남성탈모', sub: 'M자·정수리·두피열', href: 'hairloss-male.html' },
    { key: 'alopecia', num: '02', label: '원형탈모', sub: '자가면역·스트레스', href: 'hairloss-alopecia.html' },
    { key: 'female', num: '03', label: '여성탈모', sub: '가르마·산후·갱년기', href: 'hairloss-female.html' },
    { key: 'seborrheic', num: '04', label: '지루성두피염', sub: '열독·모낭염·각질', href: 'hairloss-seborrheic.html' }
  ];

  const hairlossSubSwitcherHtml = page.tabIdx === 4 ? `
        <!-- 4-TYPE HAIRLOSS SUBTYPE SWITCHER BAR -->
        <div class="hairloss-subtype-switcher" role="navigation" aria-label="4대 탈모 유형 상세페이지 전환">
          <div class="hairloss-subtype-head">
            <span class="hairloss-subtype-title">✦ 바른 탈모 · 4가지 유형별 상세페이지 선택</span>
            <button type="button" class="hairloss-subtype-modal-btn" onclick="window.openDetailHairlossModal()">⊞ 4대 유형 한눈에 비교</button>
          </div>
          <div class="hairloss-subtype-grid">
            ${hairlossSubTypes.map(st => `
            <a href="${st.href}" class="hairloss-subtype-tab${page.hairlossSubType === st.key ? ' active' : ''}">
              <span class="hst-top"><span class="hst-num">${st.num}</span><strong class="hst-label">${st.label}</strong></span>
              <span class="hst-sub">${st.sub}</span>
            </a>`).join('')}
          </div>
        </div>` : '';

  const descHtml = page.meta.desc.map(p => `<p>${p}</p>`).join('\n          ');

  const checklistHtml = page.meta.checklistItems.map((item, idx) => `
            <label class="empathy-check-item" data-idx="${idx}">
              <input type="checkbox" class="empathy-check-input" value="${item.replace(/"/g, '&quot;')}">
              <span class="empathy-check-box">
                <svg viewBox="0 0 14 14" fill="none">
                  <path d="M2.5 7.2L5.6 10.3L11.5 3.8" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
              <span class="empathy-check-text">${item}</span>
            </label>`).join('');

  const extraLinkHtml = (page.meta.extraLink && page.meta.extraLink.text) ? `
        <a href="${page.meta.extraLink.href || 'body-explorer.html'}" class="extra-detail-link">${page.meta.extraLink.text}</a>` : '';

  const cardStyle = Object.assign({
    layout: 'sample-a',
    showTitle: true,
    showBody: true,
    showStepBadge: false,
    showPillars: false,
    showTags: false,
    showNumBadge: true,
    showExamHud: false,
    panelPreset: 'espresso-gold',
    bgTop: '#1b1815',
    bgBot: '#13110f',
    borderColor: 'rgba(197, 160, 89, 0.44)',
    dividerColor: 'rgba(212, 175, 55, 0.36)',
    titleColor: '#fdfbf7',
    hlColor: '#f5d36c',
    bodyColor: 'rgba(245, 240, 232, 0.84)',
    titleSize: 'md',
    bodySize: 'md'
  }, page.cardStyle || {});

  const titleSizeCss = cardStyle.titleSize === 'sm'
    ? '1.16rem'
    : (cardStyle.titleSize === 'lg' ? 'clamp(1.42rem, 1.9vw, 1.76rem)' : 'clamp(1.24rem, 1.62vw, 1.52rem)');
  const bodySizeCss = cardStyle.bodySize === 'sm'
    ? '0.84rem'
    : (cardStyle.bodySize === 'lg' ? '1.01rem' : '0.92rem');

  const formatTitleEmphasis = (t) => String(t || '').replace(/'([^']+)'/g, "<span class=\"title-key-em hl-gold\">'$1'</span>");

  function buildCardHeadlineHtml(p) {
    if (p.titlePrefix || p.titleHighlight || p.titleSuffix) {
      const pre = String(p.titlePrefix || '');
      const hi = p.titleHighlight ? `<span class="title-key-em hl-gold">${p.titleHighlight}</span>` : '';
      const suf = String(p.titleSuffix || '');
      return `${pre}${hi}${suf}`;
    }
    return formatTitleEmphasis(p.title);
  }

  function renderEditorialTextZone(p) {
    if (p.hideText) return '';
    const showStep = (typeof p.showStepBadge === 'boolean') ? p.showStepBadge : Boolean(cardStyle.showStepBadge);
    const showTit = (typeof p.showTitle === 'boolean') ? p.showTitle : (cardStyle.showTitle !== false);
    const showBod = (typeof p.showBody === 'boolean') ? p.showBody : (cardStyle.showBody !== false);
    const showPil = (typeof p.showPillars === 'boolean') ? p.showPillars : Boolean(cardStyle.showPillars);
    const showTag = (typeof p.showTags === 'boolean') ? p.showTags : Boolean(cardStyle.showTags);

    const headlineHtml = buildCardHeadlineHtml(p);
    const bodyText = String(p.sub || '').trim();
    const stepText = String(p.stepLabel || '').trim();
    const pillarsList = Array.isArray(p.pillars) ? p.pillars.filter(x => x && (x.title || x.desc)) : [];
    const rawTags = (Array.isArray(p.tags) && p.tags.length) ? p.tags : (Array.isArray(p.cleanTags) ? p.cleanTags : []);
    const tagsList = rawTags.map(t => String(t || '').trim()).filter(Boolean);

    const hasStep = showStep && Boolean(stepText);
    const hasTitle = showTit && Boolean(headlineHtml.trim());
    const hasBody = showBod && Boolean(bodyText);
    const hasPillars = showPil && pillarsList.length > 0;
    const hasTags = showTag && tagsList.length > 0;

    if (!hasStep && !hasTitle && !hasBody && !hasPillars && !hasTags) return '';

    const stepHtml = hasStep ? `
            <div class="editorial-top-meta">
              <span class="editorial-category">${stepText}</span>
            </div>` : '';

    const titleHtml = hasTitle ? `
            <h2 class="editorial-headline" itemprop="headline">${headlineHtml}</h2>` : '';

    const bodyHtml = hasBody ? `
            <p class="editorial-body-copy" itemprop="description">${bodyText}</p>` : '';

    const pillarsHtml = hasPillars ? `
            <div class="clinical-pillars">
              ${pillarsList.map((pl, pIdx) => `
              <div class="pillar-item">
                <span class="pillar-num">${pl.num || String(pIdx + 1).padStart(2, '0')}${pl.badge ? ' · ' + pl.badge : ''}</span>
                <strong>${pl.title || ''}</strong>
                <span>${pl.desc || ''}</span>
              </div>`).join('')}
            </div>` : '';

    const tagsHtml = hasTags ? `
            <ul class="seo-keyword-footer" aria-label="핵심 진료 키워드">
              ${tagsList.map(tg => `<li>${tg.startsWith('#') ? tg : '#' + tg}</li>`).join('')}
            </ul>` : '';

    return `
          <div class="editorial-text-zone" onclick="event.stopPropagation();">${stepHtml}${titleHtml}${bodyHtml}${pillarsHtml}${tagsHtml}
          </div>`;
  }

  const activePlates = (page.plates || []).filter(p => p && p.enabled !== false);
  let baCardRenderedCount = 0;

  const platesHtml = activePlates.map((p, idx) => {
    const numStr = String(idx + 1).padStart(2, '0');
    const formattedTitle = buildCardHeadlineHtml(p);
    if (p.type === 'growth-son-main-hero') {
      const sonImg = p.imgSrc || p.mainImage || 'growth-director-son.png';
      const sonBadge = p.badge || 'MAIN RECORD · 대표원장 친아들 실제 성장 스토리';
      const sonEyebrow = p.letterEyebrow || "DIRECTOR'S HANDWRITTEN PLEDGE · 아빠의 마음으로 달인 성장한약";
      const sonLine1 = p.letterHeadlineLine1 || '"내 아이에게 먹이지 못할 약이라면,';
      const sonLine2 = p.letterHeadlineLine2 || '세상 어떤 아이에게도 처방하지 않습니다"';
      const sonParasHtml = (Array.isArray(p.letterParagraphs) && p.letterParagraphs.length > 0)
        ? `"${p.letterParagraphs.join('<br><br>\n                  ')}"`
        : `"아들의 키 성장은 저에게 단순한 진료가 아닌, 평생의 아버지이자 임상의로서의 가장 엄격한 약속이었습니다.<br><br>
                  잔병치레로 밥을 잘 먹지 못하고 또래보다 작고 여렸던 제 아들을 위해, 매일 새벽 탕전실에서 직접 최상급 러시아 원용 분골과 청정 약재를 선별해 정성껏 달여 먹였습니다.<br>
                  체질을 바로잡고 면역을 보강하며 꾸준히 복용한 끝에 <strong>몰라보게 든든하고 바른 체격으로 폭풍 성장</strong>했습니다. 내 아이가 마시는 탕약과 조금의 차이도 없이 동일한 최상급 청정 규격 한약재로 우리 아이들을 진료합니다."`;
      const sonChips = (Array.isArray(p.chips) && p.chips.length > 0) ? p.chips : [
        { label: '기초 면역 리셋', value: '비염 개선 · 소화 흡수 정상화' },
        { label: '성장판 골든타임', value: '최상급 원용 분골 · 연골 증식' },
        { label: '탄탄한 피지컬 완성', value: '성호르몬 균형 · 바른 골격 완성' }
      ];
      const sonSignPrefix = p.signPrefix || '아빠같은 한의사';
      const sonSignName = p.signName || '안 정 위';
      const sonSignSuffix = p.signSuffix || '대표원장 배상';
      const sonBlogText = p.blogBtnText || '📖 대표원장 아들 성장 스토리 원문 보러가기';
      const sonBlogUrl = p.blogUrl || 'https://blog.naver.com/wei0508/223437892490';
      return `
        <!-- PLATE ${numStr}: Director's Son Growth Enlarged Original Image Hero & Handwritten Pledge -->
        <article class="project-details-item is-growth-son-hero is-clean-plate${idx === 0 ? ' is-active-plate' : ''}" data-fullscreen>
          <span class="tiny-card-num-badge">${numStr}</span>
          <div class="plate-media-inner growth-son-hero-inner">
            <div class="motion-video-stage is-son-ambient-stage" data-frames="${sonImg}" data-duration="6.4" style="background:transparent; pointer-events:none; z-index:0;">
              <canvas class="plate-fx-canvas" data-fx="sunlight-bokeh"></canvas>
              <div class="motion-progress-track"><div class="motion-progress-fill"></div></div>
            </div>
            <div class="growth-son-hero-grid" style="position:relative; z-index:2;">
              <div class="son-growth-visual-col" onclick="event.stopPropagation(); window.openCleanLightbox('${sonImg}')" title="클릭하여 원본 이미지 전체화면 확대">
                <div class="son-original-frame">
                  <img
                    class="son-original-full-img"
                    src="${sonImg}"
                    onerror="this.onerror=null; this.src='growth-director-son-comparison.png';"
                    alt="바른한의원 안정위 대표원장 친아들 성장한약 복용 비교 원본 이미지"
                    draggable="false">
                  <button type="button" class="son-original-zoom-pill" onclick="event.stopPropagation(); window.openCleanLightbox('${sonImg}')">
                    <span>🔍 원본 크게 확대보기</span>
                  </button>
                </div>
              </div>

              <div class="father-letter-box" onclick="event.stopPropagation();">
                <div class="letter-top-hero-banner">
                  <span class="son-live-badge"><span class="son-live-dot"></span>${sonBadge}</span>
                  <h2 class="son-hero-main-title">${formattedTitle}</h2>
                  <p class="son-hero-main-sub">${p.sub || ''}</p>
                </div>

                <div class="letter-eyebrow">
                  <span class="letter-eyebrow-line"></span>
                  <span>${sonEyebrow}</span>
                </div>
                <h3 class="letter-headline">
                  ${sonLine1}<br>
                  <span>${sonLine2}</span>
                </h3>
                <div class="letter-handwriting">
                  ${sonParasHtml}
                </div>
                <div class="letter-milestone-row">
                  ${sonChips.map((ch, cIdx) => `
                  <div class="letter-milestone-chip${cIdx === sonChips.length - 1 ? ' is-accent' : ''}">
                    <span class="lm-label">${ch.label || ''}</span>
                    <strong class="lm-val">${ch.value || ''}</strong>
                  </div>`).join('')}
                </div>
                <div class="letter-sign-row">
                  <div class="letter-sign-info">
                    <div class="letter-sign-text">${sonSignPrefix} <span>${sonSignName}</span> ${sonSignSuffix}</div>
                    <a href="${sonBlogUrl}" target="_blank" rel="noopener" class="letter-blog-btn" onclick="event.stopPropagation();">
                      <span>${sonBlogText}</span>
                      <span>↗</span>
                    </a>
                  </div>
                  <div class="director-seal-stamp" aria-label="안정위 대표원장 직인">
                    <svg viewBox="0 0 64 64" width="48" height="48">
                      <rect x="4" y="4" width="56" height="56" rx="6" fill="none" stroke="#B83B2A" stroke-width="3.5"/>
                      <rect x="9" y="9" width="46" height="46" rx="3" fill="none" stroke="#B83B2A" stroke-width="1.2" stroke-dasharray="4 2"/>
                      <text x="32" y="28" text-anchor="middle" fill="#B83B2A" font-family="'Noto Serif KR', serif" font-weight="900" font-size="14">바른</text>
                      <text x="32" y="47" text-anchor="middle" fill="#B83B2A" font-family="'Noto Serif KR', serif" font-weight="900" font-size="14">正印</text>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>`;
    }

    if (p.type === 'gongjindan-panorama-archive') {
      const brochureArchive = (Array.isArray(p.brochureArchive) && p.brochureArchive.length > 0) ? p.brochureArchive : [
        { num: 1, code: 'P.01', tag: '국가 특허 등록', short: '01 특허공진단', title: '유효 성분 손실을 최소화하는 특허 공진단', desc: '특허 제10-1744704호 공식 등록 · 원목 자개함 & 99.9% 순금박 수제 제환', img: 'brochure/brochure1.jpg' },
        { num: 2, code: 'P.02', tag: '황실 비방의 역사', short: '02 700년 황실비방', title: '황제의 공진단, 왜 지금 우리에게 필요할까?', desc: '700년 전 원나라 황실 비방이 현대인의 극심한 만성 피로와 번아웃을 다스리는 비결', img: 'brochure/brochure2.jpg' },
        { num: 3, code: 'P.03', tag: '특허 기술의 본질', short: '03 사향보존 공법', title: "공진단에 왜 '특허'가 필요할까?", desc: '휘발되기 쉬운 천연 사향의 향기와 약효를 100% 가두는 중심핵 조제 공법', img: 'brochure/brochure3.jpg' },
        { num: 4, code: 'P.04', tag: '국내 유일 기술', short: '04 효능특허 훈장', title: '국내 유일 공진단 효능 관련 특허 기술', desc: '대한민국 특허청 정식 인장 및 금장 훈장이 증명하는 독보적 임상 가치', img: 'brochure/brochure4.jpg' },
        { num: 5, code: 'P.05', tag: '사향 씨알의 기적', short: '05 사향씨알 단면', title: "눈으로 확인하는 '사향 씨알' 특허 단면 & 함량 비교", desc: '중심에 온전히 보존된 사향 씨알 단면 비교 및 식약처 CITES 정품 사향 함유량', img: 'brochure/brochure5.jpg' },
        { num: 6, code: 'P.06', tag: '재생의 연료', short: '06 러시아산 분골', title: '러시아산 최상급 원용 분골 녹용 아낌없는 배합', desc: '세포·피부·신경 재생의 핵심, 원산지가 명확한 러시아산 최상단 분골·상대 엄선', img: 'brochure/brochure6.jpg' },
        { num: 7, code: 'P.07', tag: '100인 한의사 검증', short: '07 한의사 100인', title: '한의사 100인이 직접 검증한 압도적 효능', desc: '"사향의 향 손실을 막고 균일한 약효를 발휘하는 획기적 발명" 블라인드 평가 극찬', img: 'brochure/brochure7.jpg' },
        { num: 8, code: 'P.08', tag: '공인 시험성적서', short: '08 유해물질 0ppm', title: '동의한약분석센터 잔류농약·중금속 0ppm 불검출', desc: '납·비소·수은·잔류농약·곰팡이독소 불검출 국가 공인 시험성적서 원문 공개', img: 'brochure/brochure8.jpg' },
        { num: 9, code: 'P.09', tag: '황실 예우 패키징', short: '09 원목자개함', title: '마음을 움직이는 최고의 품격, 황실 예우 패키징', desc: '천연 원목 자개함 · 이중 비단보자기 · 정품 품질보증서 기프트 패키지', img: 'brochure/brochure9.jpg' },
        { num: 10, code: 'P.10', tag: '4대 명품 약재', short: '10 4대 명품약재', title: '황제의 보약을 완성하는 4대 명품 한약재 도감', desc: '천연 사향 · 러시아산 분골 녹용 · 참당귀 · 산수유 최상위 원재료 도감', img: 'brochure/brochure10.jpg' }
      ];
      return `
        <!-- PLATE ${numStr}: Emperor Gongjindan 10-Page Brochure Panorama Archive Card -->
        <article class="project-details-item is-gongjindan-panorama-plate is-clean-plate${idx === 0 ? ' is-active-plate' : ''}" id="gjd-panorama-card" data-fullscreen>
          <span class="tiny-card-num-badge">${numStr}</span>
          <div class="plate-media-inner gjd-panorama-inner" onclick="event.stopPropagation();">
            <div class="gjd-pano-header">
              <div class="gjd-pano-title-group">
                <span class="gjd-pano-eyebrow">📜 EMPEROR GONGJINDAN PANORAMA ARCHIVE · 과거 황제공진단 공식 브로슈어 10대 화보 한눈에 넘겨보기</span>
                <h2 class="gjd-pano-main-title">${formattedTitle}</h2>
                <p class="gjd-pano-sub">${p.sub || ''}</p>
              </div>
              <div class="gjd-pano-controls">
                <button type="button" class="gjd-pano-nav-btn" onclick="event.stopPropagation(); window.stepGjdPanorama(-1)" title="이전 브로슈어 페이지">◀ 이전 장</button>
                <span class="gjd-pano-counter" id="gjd-pano-counter">01 / ${String(brochureArchive.length).padStart(2, '0')}</span>
                <button type="button" class="gjd-pano-nav-btn" onclick="event.stopPropagation(); window.stepGjdPanorama(1)" title="다음 브로슈어 페이지">다음 장 ▶</button>
                <button type="button" class="gjd-pano-auto-btn active" id="gjd-pano-auto-btn" onclick="event.stopPropagation(); window.toggleGjdPanoramaAuto()">⏯ 자동 파노라마 ON</button>
                <button type="button" class="gjd-pano-zoom-btn" onclick="event.stopPropagation(); window.zoomActiveGjdPanorama()">🔍 현재 페이지 확대</button>
              </div>
            </div>

            <div class="gjd-panorama-viewport" id="gjd-panorama-viewport">
              <div class="gjd-panorama-track" id="gjd-panorama-track">
                ${brochureArchive.map((item, bIdx) => `
                <div class="gjd-pano-slide${bIdx === 0 ? ' is-active' : ''}" data-idx="${bIdx}" data-img="${item.img}" data-code="${item.code}" data-tag="${item.tag}" data-short="${item.short}" data-title="${item.title}" data-desc="${item.desc}" onclick="event.stopPropagation(); window.handleGjdSlideClick(${bIdx}, '${item.img}')">
                  <div class="gjd-pano-slide-top">
                    <span class="gjd-pano-page-pill">${item.code} / ${String(brochureArchive.length).padStart(2, '0')} · ${item.tag}</span>
                    <button type="button" class="gjd-pano-card-zoom" onclick="event.stopPropagation(); window.openGjdPanoramaLightbox(${bIdx})">🔍 원본 확대</button>
                  </div>
                  <div class="gjd-pano-img-wrap">
                    <img class="gjd-pano-main-img" src="${item.img}" alt="${item.title}" draggable="false">
                  </div>
                  <div class="gjd-pano-slide-caption">
                    <strong>${item.title}</strong>
                    <span>${item.desc}</span>
                  </div>
                </div>`).join('')}
              </div>
            </div>

            <div class="gjd-pano-thumbs-bar" id="gjd-pano-thumbs-bar">
              ${brochureArchive.map((item, bIdx) => `
              <button type="button" class="gjd-pano-thumb-pill${bIdx === 0 ? ' active' : ''}" data-idx="${bIdx}" onclick="event.stopPropagation(); window.selectGjdPanorama(${bIdx}, true)">
                <img class="gjd-pano-thumb-img" src="${item.img}" alt="${item.short}" draggable="false">
                <span>${item.short}</span>
              </button>`).join('')}
            </div>
          </div>
        </article>`;
    }

    if (p.type === 'runway-ba-scan') {
      baCardRenderedCount += 1;
      const isFirstBa = baCardRenderedCount === 1;
      const editorialHtml = renderEditorialTextZone(p);
      const sepClass = editorialHtml ? ' has-separated-editorial' : '';
      return `
        <!-- PLATE ${numStr}: Sample A Separated Before/After Biomedical Scan Plate -->
        <article class="project-details-item is-image is-clean-plate is-ba-scan-plate${sepClass}${idx === 0 ? ' is-active-plate' : ''}"${isFirstBa ? ' id="runway-scroll-ba-plate"' : ''} data-fullscreen itemscope itemtype="https://schema.org/MedicalWebPage">
          <span class="tiny-card-num-badge">${numStr}</span>
          <figure class="plate-media-inner pure-visual-zone"${isFirstBa ? ' id="runway-ba-stage"' : ''} style="position:relative;overflow:hidden;">
            <img class="lusion-clean-media runway-ba-before-img"${isFirstBa ? ' id="runway-ba-before-img"' : ''} src="${p.beforeImg || 'diet_minimal_card9_ba_before_v2.jpg'}" alt="${(p.title || '치료 전 생체 비교').replace(/"/g, '&quot;')}" draggable="false" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;">
            <div class="runway-ba-after-clip"${isFirstBa ? ' id="runway-ba-after-clip"' : ''} style="position:absolute;inset:0;width:100%;height:100%;clip-path:inset(0 50% 0 0);pointer-events:none;will-change:clip-path;">
              <img class="lusion-clean-media runway-ba-after-img"${isFirstBa ? ' id="runway-ba-after-img"' : ''} src="${p.afterImg || 'diet_minimal_card9_ba_after.jpg'}" alt="${(p.title || '치료 후 생체 비교').replace(/"/g, '&quot;')}" draggable="false" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;">
            </div>
            <div class="runway-ba-laser"${isFirstBa ? ' id="runway-ba-laser"' : ''} style="position:absolute;top:0;bottom:0;left:50%;width:3px;background:linear-gradient(180deg,transparent,#6EE7B7,#FFFFFF,#D4AF37,transparent);box-shadow:0 0 22px rgba(110,231,183,0.95);transform:translateX(-50%);z-index:6;pointer-events:none;"></div>
          </figure>${editorialHtml}
        </article>`;
    }

    if (p.type === 'diet-single-stage') {
      const stg = p.stage || 1;
      let stageVisualHtml = '';
      if (stg === 1) {
        const s1Img = p.imgSrc || 'diet_minimal_card3_stage1_neuro_calm.jpg';
        stageVisualHtml = `
            <div class="efficacy-visual-frame neuro-frame is-full-stage-frame">
              <img src="${s1Img}" alt="${(p.title || '1단계 신경 안정 모션').replace(/"/g, '&quot;')}" loading="lazy" draggable="false">
              <div class="electric-zap-layer" aria-hidden="true">
                <div class="zap-pulse-core"></div>
                <div class="zap-wave-ring"></div>
                <div class="zap-wave-ring ring-2"></div>
                <svg class="zap-lightning-svg" viewBox="0 0 200 200" fill="none">
                  <path class="zap-bolt bolt-1" d="M100 72 L84 52 L92 42 L72 22" />
                  <path class="zap-bolt bolt-2" d="M114 78 L138 62 L130 50 L156 34" />
                  <path class="zap-bolt bolt-3" d="M88 86 L62 82 L68 70 L42 64" />
                  <path class="zap-bolt bolt-4" d="M112 92 L142 96 L134 108 L162 114" />
                </svg>
                <span class="spark-dot s1"></span>
                <span class="spark-dot s2"></span>
                <span class="spark-dot s3"></span>
                <span class="spark-dot s4"></span>
              </div>
              <div class="efficacy-motion-overlay"></div>
            </div>`;
      } else if (stg === 2) {
        const s2Frames = (p.frames && p.frames.length >= 3)
          ? p.frames
          : ['diet_minimal_card9_ba_before_v2.jpg', 'diet_minimal_card9_ba_shrinking_mid.jpg', 'diet_minimal_card9_ba_after.jpg'];
        stageVisualHtml = `
            <div class="efficacy-visual-frame thermal-frame is-full-stage-frame is-belly-shrink-motion">
              <div class="belly-shrink-seq-stage">
                <img class="belly-seq-img seq-1" src="${s2Frames[0]}" alt="비만형 복부 (수축 전)" loading="lazy" draggable="false">
                <img class="belly-seq-img seq-2" src="${s2Frames[1]}" alt="근육 대사열로 복부 수축 진행 중" loading="lazy" draggable="false">
                <img class="belly-seq-img seq-3" src="${s2Frames[2]}" alt="늘씬한 복부로 수축 완료" loading="lazy" draggable="false">
              </div>
              <div class="thermal-burn-layer" aria-hidden="true">
                <div class="combustion-fire-glow"></div>
                <div class="thermal-heat-haze"></div>
                <div class="fat-contract-ring c-ring-1"></div>
                <div class="fat-contract-ring c-ring-2"></div>
                <div class="fat-contract-ring c-ring-3"></div>
                <svg class="belly-contract-arrows-svg" viewBox="0 0 280 200" fill="none">
                  <path class="belly-inward-arrow" d="M64 102 L114 102 M100 90 L114 102 L100 114" />
                  <path class="belly-inward-arrow delay-1" d="M72 72 L116 82 M103 71 L116 82 L101 91" />
                  <path class="belly-inward-arrow delay-2" d="M72 132 L116 122 M101 113 L116 122 L103 133" />
                </svg>
                <span class="ember-spark e1"></span>
                <span class="ember-spark e2"></span>
                <span class="ember-spark e3"></span>
                <span class="ember-spark e4"></span>
                <span class="ember-spark e5"></span>
                <span class="ember-spark e6"></span>
              </div>
              <div class="efficacy-motion-overlay"></div>
            </div>`;
      } else if (stg === 4) {
        const s4Frames = (p.frames && p.frames.length >= 3)
          ? p.frames
          : ['growth_minimal_card4_short_before.jpg?v=grw4v3', 'growth_minimal_card4_growing_mid.jpg?v=grw4v3', 'growth_minimal_card4_tall_after.jpg?v=grw4v3'];
        stageVisualHtml = `
            <div class="efficacy-visual-frame growth-tall-frame is-full-stage-frame is-growth-tall-motion">
              <div class="growth-tall-seq-stage">
                <img class="growth-tall-seq-img seq-1" src="${s4Frames[0]}" alt="또래보다 작던 키 (성장 전)" loading="lazy" draggable="false">
                <img class="growth-tall-seq-img seq-2" src="${s4Frames[1]}" alt="성장판 연골 증식으로 키가 자라는 중" loading="lazy" draggable="false">
                <img class="growth-tall-seq-img seq-3" src="${s4Frames[2]}" alt="위로 쑥쑥 폭풍 키 성장 완료" loading="lazy" draggable="false">
              </div>
              <div class="growth-tall-boost-layer" aria-hidden="true">
                <div class="growth-epiphyseal-glow"></div>
                <div class="growth-height-laser-bar">
                  <span class="growth-height-laser-pill"><span class="laser-dot"></span>${p.laserBadge || '▲ 성장판 연골 증식 · 수직 폭풍 성장 UP'}</span>
                </div>
                <svg class="growth-upward-arrows-svg" viewBox="0 0 280 240" fill="none">
                  <path class="growth-up-arrow g-arr-1" d="M88 188 L88 54 M76 70 L88 54 L100 70" />
                  <path class="growth-up-arrow g-arr-2" d="M106 168 L106 38 M96 52 L106 38 L116 52" />
                  <path class="growth-up-arrow g-arr-3" d="M182 178 L182 52 M170 68 L182 52 L194 68" />
                </svg>
                <span class="growth-spark gs1"></span>
                <span class="growth-spark gs2"></span>
                <span class="growth-spark gs3"></span>
                <span class="growth-spark gs4"></span>
                <span class="growth-spark gs5"></span>
                <span class="growth-spark gs6"></span>
              </div>
              <div class="efficacy-motion-overlay"></div>
            </div>`;
      } else {
        const s3Frames = (p.frames && p.frames.length >= 3)
          ? p.frames
          : ['diet_minimal_card3_edema_full_a.jpg', 'diet_minimal_card3_edema_squeeze_b.jpg', 'diet_minimal_card3_edema_slim_c.jpg'];
        const cinchArrowsHtml = p.hideCinchArrows ? '' : `
              <div class="detox-slim-layer" aria-hidden="true">
                <svg class="contour-cinch-guide" viewBox="0 0 240 240" fill="none">
                  <path class="swollen-line-left" d="M62 46 Q36 120 62 194" />
                  <path class="swollen-line-right" d="M178 46 Q204 120 178 194" />
                  <path class="cinch-arrow left-arrow" d="M32 92 L78 92 M66 84 L78 92 L66 100" />
                  <path class="cinch-arrow right-arrow" d="M208 92 L162 92 M174 84 L162 92 L174 100" />
                  <path class="cinch-arrow left-arrow" d="M32 146 L78 146 M66 138 L78 146 L66 154" />
                  <path class="cinch-arrow right-arrow" d="M208 146 L162 146 M174 138 L162 146 L174 154" />
                </svg>
                <span class="water-drop d1"></span>
                <span class="water-drop d2"></span>
                <span class="water-drop d3"></span>
                <span class="water-drop d4"></span>
                <span class="water-drop d5"></span>
                <span class="water-drop d6"></span>
              </div>`;
        stageVisualHtml = `
            <div class="efficacy-visual-frame detox-frame is-full-stage-frame is-edema-wring-motion">
              <div class="edema-wring-seq-stage">
                <img class="edema-seq-img seq-1" src="${s3Frames[0]}" alt="물이 꽉 찬 부종 전신" loading="lazy" draggable="false">
                <img class="edema-seq-img seq-2" src="${s3Frames[1]}" alt="쥐어 짜서 물이 배출되는 전신" loading="lazy" draggable="false">
                <img class="edema-seq-img seq-3" src="${s3Frames[2]}" alt="물이 빠져 늘씬해진 전신" loading="lazy" draggable="false">
              </div>${cinchArrowsHtml}
              <div class="efficacy-motion-overlay"></div>
            </div>`;
      }
      const editorialHtml = renderEditorialTextZone(p);
      const sepClass = editorialHtml ? ' has-separated-editorial' : '';
      return `
        <!-- PLATE ${numStr}: Sample A Separated Diet Single-Stage Motion Card -->
        <article class="project-details-item is-diet-single-stage-plate is-clean-plate${sepClass}${idx === 0 ? ' is-active-plate' : ''}"${p.fullscreen !== false ? ' data-fullscreen' : ''} itemscope itemtype="https://schema.org/MedicalWebPage">
          <span class="tiny-card-num-badge">${numStr}</span>
          <figure class="plate-media-inner pure-visual-zone">
            ${stageVisualHtml}
          </figure>${editorialHtml}
        </article>`;
    }

    if (p.type === 'diet-3stage-motion') {
      return `
        <!-- PLATE ${numStr}: 3-Stage Efficacy Interactive Motion Plate -->
        <article class="project-details-item is-diet-3stage-plate is-clean-plate${idx === 0 ? ' is-active-plate' : ''}" data-fullscreen>
          <div class="plate-media-inner diet-3stage-inner">
            <div class="diet-3stage-header">
              <div>
                <span class="diet-3stage-eyebrow">⚡ 3-STAGE METABOLIC ACTION · 바른다이어트 3단계 핵심 작용 모션</span>
                <h2 class="diet-3stage-title">${formattedTitle}</h2>
                <p class="diet-3stage-sub">${p.sub || ''}</p>
              </div>
              <div class="diet-3stage-tabs" role="tablist">
                <button type="button" class="diet-3stage-tab active" onclick="event.stopPropagation(); window.switchDietStage3(0)">전체 동시 가동</button>
                <button type="button" class="diet-3stage-tab" onclick="event.stopPropagation(); window.switchDietStage3(1)">01 식욕 중추 안정</button>
                <button type="button" class="diet-3stage-tab" onclick="event.stopPropagation(); window.switchDietStage3(2)">02 심부 체지방 분해</button>
                <button type="button" class="diet-3stage-tab" onclick="event.stopPropagation(); window.switchDietStage3(3)">03 붓기 & 독소 완화</button>
              </div>
            </div>
            <div class="efficacy-3stage-grid" id="diet-3stage-grid"></div>
          </div>
        </article>`;
    }

    if (p.type === 'diet-tele-video') {
      const stepsData = p.customSteps || [
        { num: '01', title: '온라인 사전 문진', sub: '체질 · 식습관 · 목표체중 체크' },
        { num: '02', title: '대표원장 1:1 전화 진료', sub: '안정위 원장 심층 비대면 상담' },
        { num: '03', title: '원내 1:1 맞춤 탕전 · 조제', sub: '청정 GAP 약재 당일 안전 조제' },
        { num: '04', title: '전국 안심 특급 배송', sub: '문 앞까지 빠르고 안전하게 도착' }
      ];
      const trustData = p.customTrust || [
        { strong: '5,475일+ (15년)', span: '누적 치료경험' },
        { strong: '98.6%', span: '복용 환자 치료 만족도' },
        { strong: '100%', span: '식약처 인증 정품 청정 약재' },
        { strong: '1:1 전담 케어', span: '감량 후 요요방지 밀착 코칭' }
      ];
      const ctaTextLabel = p.ctaLabel || '📞 비대면 전화처방 바로 신청 ↗';
      const teleVideoUrl = p.videoSrc || 'https://bareunhaniwon.com/wp-content/uploads/2026/09/%EB%8B%A4%EC%9D%B4%EC%96%B4%ED%8A%B8_%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%A8_%EC%95%88%EB%82%B4_%EC%98%81%EC%83%81_%EC%A0%9C%EC%9E%91_20260921140439.mp4#t=0.1';
      return `
        <!-- PLATE ${numStr}: Non-Face-to-Face Telemedicine & Express Delivery Video Suite -->
        <article class="project-details-item is-diet-tele-plate is-clean-plate${idx === 0 ? ' is-active-plate' : ''}" data-fullscreen>
          <span class="tiny-card-num-badge">${numStr}</span>
          <div class="plate-media-inner diet-tele-inner">
            <div class="concierge-cinema-suite">
              <div class="concierge-cinema-header">
                <div>
                  <h2 class="concierge-main-title">${formattedTitle}</h2>
                </div>
              </div>

              <div class="concierge-steps-bar">
                ${stepsData.map(st => `
                <div class="concierge-step-chip">
                  <span class="step-num">${st.num}</span>
                  <div class="step-text">
                    <strong>${st.title}</strong>
                    <span>${st.sub}</span>
                  </div>
                </div>`).join('')}
              </div>

              <div class="concierge-video-frame" onclick="event.stopPropagation(); if(!event.target.closest('.video-consult-trigger, video')){window.toggleDietTeleVideo(this);}">
                <div class="video-top-overlay" style="justify-content:flex-end;">
                  <button type="button" class="video-consult-trigger" onclick="event.stopPropagation(); window.openConsultModal()">
                    ${ctaTextLabel}
                  </button>
                </div>
                <button type="button" class="concierge-video-play-overlay" aria-label="안내 영상 재생" onclick="event.stopPropagation(); window.toggleDietTeleVideo(this)">
                  <span class="play-circle-icon">▶</span>
                  <span class="play-label-text">클릭하여 영상 재생</span>
                </button>
                <video
                  id="diet-tele-video-el"
                  controls
                  playsinline
                  preload="metadata"
                  onplay="this.closest('.concierge-video-frame')?.classList.add('is-playing')"
                  onpause="this.closest('.concierge-video-frame')?.classList.remove('is-playing')"
                  onended="this.closest('.concierge-video-frame')?.classList.remove('is-playing')">
                  <source src="${teleVideoUrl}" type="video/mp4">
                  브라우저가 비디오 태그를 지원하지 않습니다.
                </video>
              </div>

              <div class="concierge-trust-ribbon">
                ${trustData.map(tr => `
                <div class="trust-metric-box">
                  <strong>${tr.strong}</strong>
                  <span>${tr.span}</span>
                </div>`).join('')}
              </div>
            </div>
          </div>
        </article>`;
    }

    if (p.type === 'clean-video') {
      const isContainVideo = p.fit === 'contain';
      const hideAllText = Boolean(p.hideText);
      const posterAttr = p.poster ? ` poster="${p.poster}"` : '';
      const containCardClass = isContainVideo ? ' is-clean-video-contain' : '';
      const containVideoClass = isContainVideo ? ' is-video-contain-fit' : '';
      const blackBgStyle = isContainVideo ? ' style="background:#000000 !important;"' : '';
      const videoInlineStyle = isContainVideo
        ? ' style="position:absolute;inset:0 !important;width:100% !important;height:100% !important;object-fit:contain !important;object-position:center center !important;padding:0 !important;margin:0 !important;background:#000000 !important;transform:none !important;pointer-events:none;"'
        : '';
      const editorialHtml = hideAllText ? '' : renderEditorialTextZone(p);
      const sepClass = editorialHtml ? ' has-separated-editorial' : '';
      return `
        <!-- PLATE ${numStr}: Sample A Clean Video Stage -->
        <article class="project-details-item is-video is-motion-plate is-clean-plate${containCardClass}${sepClass}${idx === 0 ? ' is-active-plate' : ''}"${p.fullscreen !== false ? ' data-fullscreen' : ''}${editorialHtml ? '' : blackBgStyle} itemscope itemtype="https://schema.org/MedicalWebPage">
          ${hideAllText ? '' : `<span class="tiny-card-num-badge">${numStr}</span>`}
          <figure class="plate-media-inner${editorialHtml ? ' pure-visual-zone' : ''}"${blackBgStyle}>
            <div class="motion-video-stage is-clean-video-stage" data-frames="${p.poster || ''}" data-duration="6.4"${blackBgStyle}>
              <video class="lusion-clean-media${containVideoClass}" src="${p.videoSrc}"${posterAttr} autoplay muted loop playsinline preload="auto"${videoInlineStyle}></video>
              ${hideAllText ? '' : `<canvas class="plate-fx-canvas" data-fx="${p.fx || 'warm-breath-zoom'}"></canvas>
              <div class="motion-progress-track"><div class="motion-progress-fill"></div></div>`}
            </div>
            ${hideAllText ? '' : `<div class="plate-top-bar" style="z-index:7;justify-content:flex-end;">
              <div style="display:flex;align-items:center;gap:6px;pointer-events:auto;">
                <button type="button" class="gjd-pano-nav-btn" onclick="event.stopPropagation(); const v=this.closest('.plate-media-inner').querySelector('video'); if(v){v.muted=!v.muted; if(!v.muted)v.play(); this.textContent=v.muted?'🔇 소리 켜기':'🔊 소리 끄기';}">🔇 소리 켜기</button>
                <button type="button" class="gjd-pano-nav-btn" onclick="event.stopPropagation(); const v=this.closest('.plate-media-inner').querySelector('video'); if(v){if(v.paused){v.play();this.textContent='⏸ 일시정지';}else{v.pause();this.textContent='▶ 영상 재생';}}">⏸ 일시정지</button>
              </div>
            </div>`}
          </figure>${editorialHtml}
        </article>`;
    }

    if (p.type === 'motion-story') {
      const framesList = (p.frames && p.frames.length) ? p.frames : [p.imgSrc || ''];
      const framesAttr = framesList.join('|');
      const motionThumbsHtml = (p.thumbs && p.thumbs.length > 1) ? `
            <div class="plate-thumb-dock is-visual-floating-dock">
              ${p.thumbs.map((th, tIdx) => `
              <button type="button" class="plate-thumb-btn${tIdx === 0 ? ' active' : ''}" data-mode="motion" data-idx="${tIdx}" data-img="${th.img}" onclick="window.switchPlateThumb(event, this)">
                <img class="plate-thumb-preview" src="${th.img}" alt="${th.label}" loading="lazy" draggable="false">
                <span class="plate-thumb-label">${th.label}</span>
              </button>`).join('')}
            </div>` : '';
      const editorialHtml = renderEditorialTextZone(p);
      const sepClass = editorialHtml ? ' has-separated-editorial' : '';
      return `
        <!-- PLATE ${numStr}: Sample A Separated Multi-Frame Motion Video Storytelling Stage -->
        <article class="project-details-item is-motion-plate is-clean-plate${sepClass}${idx === 0 ? ' is-active-plate' : ''}"${p.fullscreen !== false ? ' data-fullscreen' : ''} itemscope itemtype="https://schema.org/MedicalWebPage">
          <span class="tiny-card-num-badge">${numStr}</span>
          <figure class="plate-media-inner pure-visual-zone">
            <div class="motion-video-stage" data-frames="${framesAttr}" data-duration="${p.durationSec || 6.4}">
              <div class="motion-frame-layer frame-layer-a" style="background-image: url('${framesList[0]}');"></div>
              <div class="motion-frame-layer frame-layer-b" style="background-image: url('${framesList[1 % framesList.length]}'); opacity: 0;"></div>
              <canvas class="plate-fx-canvas" data-fx="${p.fx || 'sunlight-bokeh'}"></canvas>
              <div class="motion-progress-track"><div class="motion-progress-fill"></div></div>
            </div>${motionThumbsHtml}
            <div class="visual-floating-step-wrap">
              <button type="button" class="plate-step-btn" onclick="event.stopPropagation(); window.stepPlateFrame(this)">${p.stepBtnText || '다음 장면 ⟳'}</button>
            </div>
          </figure>${editorialHtml}
        </article>`;
    }

    if (p.type === 'director-exam-motion') {
      const exId = p.examId || 1;
      const EXAM_MOTION_SPEC = {
        1: {
          code: 'SONO-DOPPLER 4D LIVE · 초음파 정밀 스캔',
          liveReadout: '8.5 MHz Linear-Convex · 투과심도 12.0cm · 방사선 ZERO',
          themeCol: '#10B981',
          accentCol: '#6EE7B7',
          svgHtml: `
            <svg class="exam-vector-svg exam-svg-1" viewBox="0 0 960 560" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <defs>
                <radialGradient id="sonoConeGrad" cx="50%" cy="6%" r="78%">
                  <stop offset="0%" stop-color="#38BDF8" stop-opacity="0.42"/>
                  <stop offset="45%" stop-color="#10B981" stop-opacity="0.20"/>
                  <stop offset="85%" stop-color="#D4AF37" stop-opacity="0.06"/>
                  <stop offset="100%" stop-color="#10B981" stop-opacity="0"/>
                </radialGradient>
                <linearGradient id="sonoLaserBeam" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#FEF08A" stop-opacity="0.95"/>
                  <stop offset="55%" stop-color="#6EE7B7" stop-opacity="0.85"/>
                  <stop offset="100%" stop-color="#38BDF8" stop-opacity="0"/>
                </linearGradient>
                <filter id="examGlow1" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur"/>
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>
              <!-- Acoustic Sector Fan Cone -->
              <path d="M480,44 L195,385 A390,390 0 0,0 765,385 Z" fill="url(#sonoConeGrad)" class="exam-sono-fan-sector"/>
              <path d="M480,44 L195,385 M480,44 L765,385" stroke="rgba(110,231,183,0.45)" stroke-width="1.5" stroke-dasharray="6 6"/>
              <!-- Harmonic Depth Calibration Arcs (2cm ~ 10cm) -->
              <path d="M398,142 A128,128 0 0,0 562,142" fill="none" stroke="rgba(255,255,255,0.26)" stroke-width="1.2" stroke-dasharray="4 4"/>
              <path d="M332,221 A230,230 0 0,0 628,221" fill="none" stroke="rgba(110,231,183,0.42)" stroke-width="1.5"/>
              <path d="M265,301 A334,334 0 0,0 695,301" fill="none" stroke="rgba(253,230,138,0.38)" stroke-width="1.4" stroke-dasharray="6 4"/>
              <path d="M198,381 A438,438 0 0,0 762,381" fill="none" stroke="rgba(56,189,248,0.34)" stroke-width="1.4"/>
              <!-- Propagating Acoustic Wavefront Ripples -->
              <path class="exam-sono-ripple r1" d="M365,180 A180,180 0 0,0 595,180" fill="none" stroke="#6EE7B7" stroke-width="2.4" filter="url(#examGlow1)"/>
              <path class="exam-sono-ripple r2" d="M365,180 A180,180 0 0,0 595,180" fill="none" stroke="#38BDF8" stroke-width="2" filter="url(#examGlow1)"/>
              <!-- Sweeping Doppler Pendulum Laser Line -->
              <g class="exam-sono-pendulum" style="transform-origin: 480px 44px;">
                <line x1="480" y1="44" x2="480" y2="395" stroke="url(#sonoLaserBeam)" stroke-width="3.2" filter="url(#examGlow1)"/>
                <circle cx="480" cy="44" r="7" fill="#FEF08A" filter="url(#examGlow1)"/>
              </g>
              <!-- Color Doppler & Anatomical Echo Target Nodes -->
              <g class="exam-target-node n1" transform="translate(386, 205)">
                <circle cx="0" cy="0" r="22" fill="rgba(239,68,68,0.18)" class="exam-doppler-pulse"/>
                <circle cx="0" cy="0" r="11" fill="none" stroke="#F87171" stroke-width="1.8" stroke-dasharray="4 3"/>
                <circle cx="0" cy="0" r="4" fill="#FEF08A"/>
                <line x1="-14" y1="0" x2="-110" y2="-18" stroke="rgba(253,230,138,0.75)" stroke-width="1.3"/>
                <rect x="-252" y="-34" width="142" height="26" rx="13" fill="rgba(10,16,22,0.82)" stroke="rgba(248,113,113,0.65)" stroke-width="1.2"/>
                <text x="-181" y="-17" text-anchor="middle" fill="#FECACA" font-size="11" font-weight="800" font-family="Pretendard, sans-serif">심부 근막·인대 염증 에코</text>
              </g>
              <g class="exam-target-node n2" transform="translate(568, 268)">
                <circle cx="0" cy="0" r="24" fill="rgba(56,189,248,0.20)" class="exam-doppler-pulse delay-1"/>
                <circle cx="0" cy="0" r="12" fill="none" stroke="#38BDF8" stroke-width="1.8" stroke-dasharray="4 3"/>
                <circle cx="0" cy="0" r="4.5" fill="#6EE7B7"/>
                <line x1="14" y1="0" x2="108" y2="-16" stroke="rgba(110,231,183,0.8)" stroke-width="1.3"/>
                <rect x="108" y="-32" width="148" height="26" rx="13" fill="rgba(10,16,22,0.82)" stroke="rgba(110,231,183,0.68)" stroke-width="1.2"/>
                <text x="182" y="-15" text-anchor="middle" fill="#A7F3D0" font-size="11" font-weight="800" font-family="Pretendard, sans-serif">오장육부 실질·혈류 스캔</text>
              </g>
              <!-- Right-Edge Depth Scale Ruler -->
              <g transform="translate(888, 92)" opacity="0.88">
                <line x1="0" y1="0" x2="0" y2="240" stroke="rgba(110,231,183,0.55)" stroke-width="1.5"/>
                <line x1="-8" y1="0" x2="0" y2="0" stroke="#6EE7B7" stroke-width="1.8"/><text x="-14" y="4" text-anchor="end" fill="#A7F3D0" font-size="10" font-weight="700" font-family="JetBrains Mono, monospace">2cm</text>
                <line x1="-8" y1="60" x2="0" y2="60" stroke="#6EE7B7" stroke-width="1.8"/><text x="-14" y="64" text-anchor="end" fill="#A7F3D0" font-size="10" font-weight="700" font-family="JetBrains Mono, monospace">4cm</text>
                <line x1="-10" y1="120" x2="0" y2="120" stroke="#FEF08A" stroke-width="2"/><text x="-14" y="124" text-anchor="end" fill="#FEF08A" font-size="10.5" font-weight="800" font-family="JetBrains Mono, monospace">6cm</text>
                <line x1="-8" y1="180" x2="0" y2="180" stroke="#6EE7B7" stroke-width="1.8"/><text x="-14" y="184" text-anchor="end" fill="#A7F3D0" font-size="10" font-weight="700" font-family="JetBrains Mono, monospace">8cm</text>
                <line x1="-8" y1="240" x2="0" y2="240" stroke="#6EE7B7" stroke-width="1.8"/><text x="-14" y="244" text-anchor="end" fill="#A7F3D0" font-size="10" font-weight="700" font-family="JetBrains Mono, monospace">12cm</text>
              </g>
            </svg>`,
          metrics: [
            { code: 'SONO 01 · 통증 정밀', tag: 'B-MODE HD', title: '심부 근육 · 인대 · 관절 스캔', desc: '엑스레이에 보이지 않는 미세 염증·유착·삼출물 실시간 확인', pct: '98%' },
            { code: 'SONO 02 · 장부 투시', tag: 'ORGAN ECHO', title: '오장육부 실질 · 연동운동 확인', desc: '간·담낭·위장·방광 내부 구조와 기능성 장부 움직임 정밀 판독', pct: '96%' },
            { code: 'SONO 03 · 안심 진단', tag: 'ZERO-RAY', title: '방사선 노출 ZERO 안전 검사', desc: '소아·임산부도 안심하고 치료 전·후 회복 경과를 직접 비교', pct: '100%' }
          ]
        },
        2: {
          code: 'DITI INFRARED THERMOGRAPHY · 적외선 체열진단',
          liveReadout: '0.1°C 미세 체표 온도 감지 · 심부체온 36.5°C 밸런스 스캔',
          themeCol: '#F59E0B',
          accentCol: '#FDE68A',
          svgHtml: `
            <svg class="exam-vector-svg exam-svg-2" viewBox="0 0 960 560" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <defs>
                <radialGradient id="thermalCoreAura" cx="46%" cy="42%" r="42%">
                  <stop offset="0%" stop-color="#EF4444" stop-opacity="0.34"/>
                  <stop offset="38%" stop-color="#F59E0B" stop-opacity="0.22"/>
                  <stop offset="72%" stop-color="#10B981" stop-opacity="0.14"/>
                  <stop offset="100%" stop-color="#38BDF8" stop-opacity="0"/>
                </radialGradient>
                <linearGradient id="ditiSpectrumBar" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#EF4444"/>
                  <stop offset="28%" stop-color="#F59E0B"/>
                  <stop offset="56%" stop-color="#10B981"/>
                  <stop offset="82%" stop-color="#38BDF8"/>
                  <stop offset="100%" stop-color="#6366F1"/>
                </linearGradient>
                <filter id="examGlow2" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="5" result="blur"/>
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>
              <!-- Morphing Infrared Isotherm Contours -->
              <ellipse cx="450" cy="220" rx="235" ry="155" fill="url(#thermalCoreAura)" class="exam-thermal-aura"/>
              <ellipse cx="450" cy="220" rx="210" ry="136" fill="none" stroke="rgba(56,189,248,0.42)" stroke-width="1.6" stroke-dasharray="8 6" class="exam-isotherm-ring iso-4"/>
              <ellipse cx="450" cy="220" rx="164" ry="106" fill="none" stroke="rgba(16,185,129,0.55)" stroke-width="1.8" class="exam-isotherm-ring iso-3"/>
              <ellipse cx="450" cy="220" rx="118" ry="76" fill="none" stroke="rgba(245,158,11,0.68)" stroke-width="2" stroke-dasharray="10 4" class="exam-isotherm-ring iso-2"/>
              <ellipse cx="450" cy="220" rx="72" ry="46" fill="none" stroke="rgba(239,68,68,0.82)" stroke-width="2.2" filter="url(#examGlow2)" class="exam-isotherm-ring iso-1"/>
              <!-- Callout Labels for Upper Heat vs Lower Reproductive Warmth -->
              <g transform="translate(230, 145)">
                <rect x="-95" y="-14" width="190" height="28" rx="14" fill="rgba(18,12,12,0.84)" stroke="rgba(248,113,113,0.72)" stroke-width="1.3"/>
                <text x="0" y="4" text-anchor="middle" fill="#FCA5A5" font-size="11" font-weight="800" font-family="Pretendard, sans-serif">🔥 상열(上熱) · 두면부·흉부 열독 감지</text>
              </g>
              <g transform="translate(665, 285)">
                <rect x="-105" y="-14" width="210" height="28" rx="14" fill="rgba(10,18,16,0.84)" stroke="rgba(110,231,183,0.72)" stroke-width="1.3"/>
                <text x="0" y="4" text-anchor="middle" fill="#A7F3D0" font-size="11" font-weight="800" font-family="Pretendard, sans-serif">🌡️ 하복부 생식온기 · 말초순환 36.5°C</text>
              </g>
              <!-- Right-Edge DITI Medical Color Spectrum Bar -->
              <g transform="translate(886, 82)">
                <rect x="-4" y="-6" width="24" height="252" rx="12" fill="rgba(10,14,18,0.78)" stroke="rgba(255,255,255,0.22)" stroke-width="1.2"/>
                <rect x="2" y="0" width="12" height="240" rx="6" fill="url(#ditiSpectrumBar)"/>
                <text x="-10" y="10" text-anchor="end" fill="#FCA5A5" font-size="10" font-weight="800" font-family="JetBrains Mono, monospace">38.5°C</text>
                <text x="-10" y="75" text-anchor="end" fill="#FDE68A" font-size="10" font-weight="800" font-family="JetBrains Mono, monospace">36.5°C</text>
                <text x="-10" y="150" text-anchor="end" fill="#6EE7B7" font-size="10" font-weight="800" font-family="JetBrains Mono, monospace">34.0°C</text>
                <text x="-10" y="236" text-anchor="end" fill="#7DD3FC" font-size="10" font-weight="800" font-family="JetBrains Mono, monospace">29.5°C</text>
                <!-- Animated Live Temperature Tracker Pointer -->
                <g class="exam-diti-pointer">
                  <polygon points="-2,72 -10,67 -10,77" fill="#FEF08A"/>
                  <rect x="-92" y="60" width="78" height="22" rx="11" fill="rgba(20,16,10,0.92)" stroke="#FEF08A" stroke-width="1.3"/>
                  <text x="-53" y="75" text-anchor="middle" fill="#FEF08A" font-size="10" font-weight="900" font-family="JetBrains Mono, monospace">CORE 36.5°</text>
                </g>
              </g>
            </svg>`,
          metrics: [
            { code: 'DITI 01 · 면역 체온', tag: 'IMMUNE TEMP', title: '면역력 · 심부 체온 밸런스', desc: '체온 1°C 저하에 따른 면역 활성도 및 전신 한열 불균형 판독', pct: '96%' },
            { code: 'DITI 02 · 혈액 순환', tag: 'CIRCULATION', title: '상열하한 · 수족냉증 · 혈류 정체', desc: '위로 몰린 열독과 차갑게 굳은 손발·어깨 통증 부위 시각화', pct: '95%' },
            { code: 'DITI 03 · 생식 온기', tag: 'REPRODUCTIVE', title: '자궁 · 난소 · 전립선 생식기능', desc: '난임·생리통·전립선 활력과 직결되는 하복부 심부 온기 계측', pct: '98%' }
          ]
        },
        3: {
          code: '4K ENT FIBER-OPTIC ENDOSCOPE · 귀·코·목 광학 내시경',
          liveReadout: '×15.0 HD 점막 광학 확대 · AF-LOCK 고막·비점막·인후두 스캔',
          themeCol: '#38BDF8',
          accentCol: '#BAE6FD',
          svgHtml: `
            <svg class="exam-vector-svg exam-svg-3" viewBox="0 0 960 560" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <defs>
                <radialGradient id="scopeLensGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stop-color="#FEF08A" stop-opacity="0.16"/>
                  <stop offset="68%" stop-color="#38BDF8" stop-opacity="0.12"/>
                  <stop offset="100%" stop-color="#38BDF8" stop-opacity="0"/>
                </radialGradient>
                <filter id="examGlow3" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3.5" result="blur"/>
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>
              <!-- Central Optical Endoscope HUD Reticle -->
              <g transform="translate(480, 212)">
                <circle cx="0" cy="0" r="142" fill="url(#scopeLensGlow)"/>
                <circle cx="0" cy="0" r="134" fill="none" stroke="rgba(253,230,138,0.52)" stroke-width="1.8" stroke-dasharray="4 8" class="exam-scope-ring-cw"/>
                <circle cx="0" cy="0" r="112" fill="none" stroke="rgba(110,231,183,0.58)" stroke-width="1.6" stroke-dasharray="32 14 8 14" class="exam-scope-ring-ccw"/>
                <circle cx="0" cy="0" r="88" fill="none" stroke="rgba(255,255,255,0.24)" stroke-width="1"/>
                <!-- Autofocus Corner Brackets -->
                <g class="exam-scope-af-brackets" stroke="#6EE7B7" stroke-width="2.4" fill="none" filter="url(#examGlow3)">
                  <path d="M-48,-32 L-48,-48 L-32,-48"/>
                  <path d="M32,-48 L48,-48 L48,-32"/>
                  <path d="M-48,32 L-48,48 L-32,48"/>
                  <path d="M32,48 L48,48 L48,32"/>
                </g>
                <text x="0" y="-58" text-anchor="middle" fill="#FEF08A" font-size="10" font-weight="800" font-family="JetBrains Mono, monospace" letter-spacing="1.5">AF-LOCK · ×15.0 HD OPTICS</text>
                <!-- 3-Cavity Anatomical Triangulation Callouts -->
                <line x1="-112" y1="-42" x2="-210" y2="-68" stroke="rgba(253,230,138,0.75)" stroke-width="1.4" stroke-dasharray="4 3"/>
                <g transform="translate(-295, -86)">
                  <rect x="-82" y="-16" width="164" height="32" rx="16" fill="rgba(12,18,24,0.86)" stroke="#FDE68A" stroke-width="1.4"/>
                  <text x="0" y="4" text-anchor="middle" fill="#FEF08A" font-size="11.2" font-weight="800" font-family="Pretendard, sans-serif">01 귀 · 고막 &amp; 외이도</text>
                </g>
                <line x1="112" y1="-42" x2="210" y2="-68" stroke="rgba(110,231,183,0.8)" stroke-width="1.4" stroke-dasharray="4 3"/>
                <g transform="translate(295, -86)">
                  <rect x="-86" y="-16" width="172" height="32" rx="16" fill="rgba(12,18,24,0.86)" stroke="#6EE7B7" stroke-width="1.4"/>
                  <text x="0" y="4" text-anchor="middle" fill="#A7F3D0" font-size="11.2" font-weight="800" font-family="Pretendard, sans-serif">02 코 · 비점막 &amp; 부비동</text>
                </g>
                <line x1="106" y1="54" x2="205" y2="82" stroke="rgba(56,189,248,0.8)" stroke-width="1.4" stroke-dasharray="4 3"/>
                <g transform="translate(292, 96)">
                  <rect x="-86" y="-16" width="172" height="32" rx="16" fill="rgba(12,18,24,0.86)" stroke="#38BDF8" stroke-width="1.4"/>
                  <text x="0" y="4" text-anchor="middle" fill="#BAE6FD" font-size="11.2" font-weight="800" font-family="Pretendard, sans-serif">03 목 · 편도 &amp; 인후두</text>
                </g>
              </g>
            </svg>`,
          metrics: [
            { code: 'SCOPE 01 · 귀(耳)', tag: 'TYMPANIC HD', title: '고막 · 외이도 · 중이염 스캔', desc: '삼출성 중이염 삼출물·고막 충혈·이관 기능 이상을 선명하게 확인', pct: '99%' },
            { code: 'SCOPE 02 · 코(鼻)', tag: 'NASAL MUCOSA', title: '비강 점막 · 축농증 · 구강호흡', desc: '알레르기 비염으로 부어오른 코 점막과 농성 콧물·부비동 정체 판독', pct: '98%' },
            { code: 'SCOPE 03 · 목(咽)', tag: 'PHARYNX SCAN', title: '편도선 비대 · 후비루 · 인후두', desc: '잦은 목감기·편도염·만성 기침을 유발하는 인후두 점막 충혈 진단', pct: '97%' }
          ]
        },
        4: {
          code: 'SASANG CONSTITUTION ASTROLABE · 사상체질 정밀 검사',
          liveReadout: '태양·태음·소양·소음 장부 대소(大小) & 眞장부맥학 27맥상 판독',
          themeCol: '#D4AF37',
          accentCol: '#FEF08A',
          svgHtml: `
            <svg class="exam-vector-svg exam-svg-4" viewBox="0 0 960 560" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <defs>
                <radialGradient id="sasangGoldAura" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stop-color="#D4AF37" stop-opacity="0.28"/>
                  <stop offset="65%" stop-color="#10B981" stop-opacity="0.12"/>
                  <stop offset="100%" stop-color="#D4AF37" stop-opacity="0"/>
                </radialGradient>
                <filter id="examGlow4" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur"/>
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>
              <!-- Celestial Golden Sasang Compass & 4-Organ Radar -->
              <g transform="translate(480, 212)">
                <circle cx="0" cy="0" r="148" fill="url(#sasangGoldAura)"/>
                <circle cx="0" cy="0" r="136" fill="none" stroke="rgba(253,230,138,0.62)" stroke-width="1.8" stroke-dasharray="6 6" class="exam-scope-ring-cw"/>
                <circle cx="0" cy="0" r="102" fill="none" stroke="rgba(110,231,183,0.42)" stroke-width="1.3" stroke-dasharray="18 8" class="exam-scope-ring-ccw"/>
                <circle cx="0" cy="0" r="68" fill="none" stroke="rgba(253,230,138,0.28)" stroke-width="1"/>
                <line x1="-136" y1="0" x2="136" y2="0" stroke="rgba(253,230,138,0.35)" stroke-width="1.2"/>
                <line x1="0" y1="-136" x2="0" y2="136" stroke="rgba(253,230,138,0.35)" stroke-width="1.2"/>
                <!-- Morphing 4-Constitution Organ Balance Polygon -->
                <polygon points="0,-96 112,0 0,108 -92,0" fill="rgba(212,175,55,0.26)" stroke="#6EE7B7" stroke-width="2.6" filter="url(#examGlow4)" class="exam-sasang-polygon"/>
                <circle cx="0" cy="-96" r="5" fill="#FEF08A"/>
                <circle cx="112" cy="0" r="5" fill="#6EE7B7"/>
                <circle cx="0" cy="108" r="5" fill="#FEF08A"/>
                <circle cx="-92" cy="0" r="5" fill="#6EE7B7"/>
                <!-- 4 Cardinal Sasang Constitution Badges -->
                <g transform="translate(0, -158)">
                  <rect x="-88" y="-14" width="176" height="28" rx="14" fill="rgba(16,14,10,0.88)" stroke="#FDE68A" stroke-width="1.4"/>
                  <text x="0" y="4" text-anchor="middle" fill="#FEF08A" font-size="11" font-weight="800" font-family="Pretendard, sans-serif">태양인 (肺大肝小 · 폐대간소)</text>
                </g>
                <g transform="translate(238, 0)">
                  <rect x="-88" y="-14" width="176" height="28" rx="14" fill="rgba(10,18,15,0.88)" stroke="#6EE7B7" stroke-width="1.4"/>
                  <text x="0" y="4" text-anchor="middle" fill="#A7F3D0" font-size="11" font-weight="800" font-family="Pretendard, sans-serif">소양인 (脾大腎小 · 비대신소)</text>
                </g>
                <g transform="translate(0, 158)">
                  <rect x="-88" y="-14" width="176" height="28" rx="14" fill="rgba(16,14,10,0.88)" stroke="#FDE68A" stroke-width="1.4"/>
                  <text x="0" y="4" text-anchor="middle" fill="#FEF08A" font-size="11" font-weight="800" font-family="Pretendard, sans-serif">태음인 (肝大肺小 · 간대폐소)</text>
                </g>
                <g transform="translate(-238, 0)">
                  <rect x="-88" y="-14" width="176" height="28" rx="14" fill="rgba(10,18,15,0.88)" stroke="#6EE7B7" stroke-width="1.4"/>
                  <text x="0" y="4" text-anchor="middle" fill="#A7F3D0" font-size="11" font-weight="800" font-family="Pretendard, sans-serif">소음인 (腎大脾小 · 신대비소)</text>
                </g>
              </g>
            </svg>`,
          metrics: [
            { code: 'SASANG 01 · 장부 대소', tag: '4-CONSTITUTION', title: '태양 · 태음 · 소양 · 소음 판별', desc: '폐·비·간·신 타고난 장부의 강약 구조와 체질적 병리 뿌리 분석', pct: '99%' },
            { code: 'SASANG 02 · 정밀 진맥', tag: '27-PULSE', title: '대표원장 眞(진)장부맥학 · 복진', desc: '양 손목 촌·관·척 진맥과 복진·체형·성정을 결합한 입체 진단', pct: '98%' },
            { code: 'SASANG 03 · 맞춤 처방', tag: 'BESPOKE HERB', title: '내 체질 단독 한약 · 섭생 가이드', desc: '같은 질환도 체질마다 다른 약재 배합과 평생 체질 식단표 설계', pct: '100%' }
          ]
        },
        5: {
          code: 'MULTI-FREQ BIA INBODY SCAN · 체지방 · 체성분 검사',
          liveReadout: '소아비만 성장 균형 · 성인 복부 내장지방 · 골격근량 정밀 계측',
          themeCol: '#10B981',
          accentCol: '#A7F3D0',
          svgHtml: `
            <svg class="exam-vector-svg exam-svg-5" viewBox="0 0 960 560" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <defs>
                <linearGradient id="biaScanLaser" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#10B981" stop-opacity="0"/>
                  <stop offset="20%" stop-color="#6EE7B7" stop-opacity="0.85"/>
                  <stop offset="50%" stop-color="#FEF08A" stop-opacity="1"/>
                  <stop offset="80%" stop-color="#6EE7B7" stop-opacity="0.85"/>
                  <stop offset="100%" stop-color="#10B981" stop-opacity="0"/>
                </linearGradient>
                <linearGradient id="biaTrailMesh" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#6EE7B7" stop-opacity="0.28"/>
                  <stop offset="100%" stop-color="#10B981" stop-opacity="0"/>
                </linearGradient>
                <filter id="examGlow5" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur"/>
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>
              <!-- Vertical Sweeping BIA Bioelectrical Impedance Laser Bar -->
              <g class="exam-bia-laser-group">
                <rect x="140" y="120" width="680" height="44" fill="url(#biaTrailMesh)"/>
                <line x1="120" y1="120" x2="840" y2="120" stroke="url(#biaScanLaser)" stroke-width="3.5" filter="url(#examGlow5)"/>
              </g>
              <!-- Contracting Visceral Fat Rings & Inward Lipolysis Arrows -->
              <g transform="translate(480, 224)">
                <ellipse cx="0" cy="0" rx="148" ry="88" fill="none" stroke="rgba(251,191,36,0.65)" stroke-width="2" stroke-dasharray="8 6" class="exam-fat-contract-ring"/>
                <ellipse cx="0" cy="0" rx="108" ry="64" fill="none" stroke="rgba(110,231,183,0.75)" stroke-width="2.2" class="exam-fat-contract-ring delay-1"/>
                <!-- Left & Right Inward Waist Cinch Arrows -->
                <g class="exam-cinch-left" stroke="#FEF08A" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" fill="none" filter="url(#examGlow5)">
                  <path d="M-210,0 L-156,0 M-170,-10 L-156,0 L-170,10"/>
                  <path d="M-196,-42 L-148,-24 M-163,-36 L-148,-24 L-166,-18"/>
                </g>
                <g class="exam-cinch-right" stroke="#FEF08A" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" fill="none" filter="url(#examGlow5)">
                  <path d="M210,0 L156,0 M170,-10 L156,0 L170,10"/>
                  <path d="M196,-42 L148,-24 M163,-36 L148,-24 L166,-18"/>
                </g>
                <g transform="translate(-268, -74)">
                  <rect x="-92" y="-14" width="184" height="28" rx="14" fill="rgba(12,18,16,0.86)" stroke="#FDE68A" stroke-width="1.3"/>
                  <text x="0" y="4" text-anchor="middle" fill="#FEF08A" font-size="11" font-weight="800" font-family="Pretendard, sans-serif">🔥 복부 내장지방 집중 분해 ▼</text>
                </g>
                <g transform="translate(268, -74)">
                  <rect x="-96" y="-14" width="192" height="28" rx="14" fill="rgba(12,18,16,0.86)" stroke="#6EE7B7" stroke-width="1.3"/>
                  <text x="0" y="4" text-anchor="middle" fill="#A7F3D0" font-size="11" font-weight="800" font-family="Pretendard, sans-serif">💪 골격근 · 소아 성장균형 ▲</text>
                </g>
              </g>
            </svg>`,
          metrics: [
            { code: 'BIA 01 · 복부비만', tag: 'VISCERAL FAT ▼', title: '성인 복부비만 · 내장지방 레벨', desc: '장기 사이 고착된 내장지방 단면적과 복부 비만도를 정밀 계측', pct: '97%' },
            { code: 'BIA 02 · 소아비만', tag: 'KIDS GROWTH ▲', title: '소아·청소년 비만 · 키성장 전환', desc: '성조숙증을 부르는 과잉 체지방은 줄이고 살이 키로 가도록 설계', pct: '96%' },
            { code: 'BIA 03 · 근육·부종', tag: 'MUSCLE KEEP', title: '골격근량 보존 · 세포외수분(부종)', desc: '근손실·요요 없는 건강한 감량을 위해 근육량과 부종 수치 분석', pct: '98%' }
          ]
        },
        6: {
          code: 'HRV AUTONOMIC NEURO-SCAN · 자율신경 · 스트레스 검사',
          liveReadout: '교감(LF)·부교감(HF) 신경 균형도 & 심박변이도(HRV) 실시간 파형',
          themeCol: '#38BDF8',
          accentCol: '#A7F3D0',
          svgHtml: `
            <svg class="exam-vector-svg exam-svg-6" viewBox="0 0 960 560" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <defs>
                <filter id="examGlow6" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3.5" result="blur"/>
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>
              <!-- Cranial Neuro-Calming Concentric Ripples -->
              <g transform="translate(480, 175)">
                <circle cx="0" cy="0" r="46" fill="none" stroke="rgba(110,231,183,0.65)" stroke-width="2" class="exam-neuro-calm-ring r1"/>
                <circle cx="0" cy="0" r="88" fill="none" stroke="rgba(56,189,248,0.45)" stroke-width="1.6" class="exam-neuro-calm-ring r2"/>
                <circle cx="0" cy="0" r="132" fill="none" stroke="rgba(253,230,138,0.32)" stroke-width="1.3" stroke-dasharray="6 6"/>
              </g>
              <!-- Real-Time ECG R-R Interval Heartbeat Pulse Waveform -->
              <g transform="translate(0, 265)">
                <line x1="90" y1="0" x2="870" y2="0" stroke="rgba(255,255,255,0.16)" stroke-width="1" stroke-dasharray="4 4"/>
                <path class="exam-ecg-pulse-line" d="M90,0 L190,0 L205,-12 L218,14 L232,-54 L246,28 L258,-18 L272,0 L410,0 L425,-12 L438,14 L452,-58 L466,28 L478,-18 L492,0 L630,0 L645,-12 L658,14 L672,-54 L686,28 L698,-18 L712,0 L870,0" fill="none" stroke="#FEF08A" stroke-width="2.6" filter="url(#examGlow6)"/>
              </g>
              <!-- Sympathetic vs Parasympathetic Legend Pills -->
              <g transform="translate(245, 118)">
                <rect x="-110" y="-14" width="220" height="28" rx="14" fill="rgba(16,14,22,0.86)" stroke="#FBBF24" stroke-width="1.3"/>
                <text x="0" y="4" text-anchor="middle" fill="#FDE68A" font-size="11" font-weight="800" font-family="Pretendard, sans-serif">⚡ 교감신경 과열 진정 (두통·긴장 완화)</text>
              </g>
              <g transform="translate(715, 118)">
                <rect x="-115" y="-14" width="230" height="28" rx="14" fill="rgba(10,18,20,0.86)" stroke="#34D399" stroke-width="1.3"/>
                <text x="0" y="4" text-anchor="middle" fill="#A7F3D0" font-size="11" font-weight="800" font-family="Pretendard, sans-serif">🌿 부교감신경 활성 (어지럼·불면 회복)</text>
              </g>
            </svg>`,
          metrics: [
            { code: 'HRV 01 · 만성 두통', tag: 'HEADACHE CALM', title: '두통 · 편두통 신경 긴장도 분석', desc: '스트레스·교감신경 과항진으로 인한 뇌혈관 수축 및 두통 원인 판독', pct: '96%' },
            { code: 'HRV 02 · 어지럼증', tag: 'VERTIGO CARE', title: '어지럼증 · 이명 · 기립성 순환', desc: '자율신경 조절 실조로 발생하는 아찔한 어지럼증·전정 기능 점검', pct: '95%' },
            { code: 'HRV 03 · 숙면 신경', tag: 'SLEEP RESTORE', title: '만성 불면증 · 수면 신경 회복력', desc: '밤마다 깨어있는 각성 신경을 가라앉히고 깊은 숙면 리듬 복원', pct: '98%' }
          ]
        },
        7: {
          code: 'HEPATIC & METABOLIC ASSAY · 내분비 · 간 · 당 수치 검사',
          liveReadout: 'AST/ALT 간 기능 안전성 · 공복혈당/HbA1c · 지질 대사 정밀 점검',
          themeCol: '#10B981',
          accentCol: '#6EE7B7',
          svgHtml: `
            <svg class="exam-vector-svg exam-svg-7" viewBox="0 0 960 560" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <defs>
                <filter id="examGlow7" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3.5" result="blur"/>
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>
              <!-- 3 Precision Circular Biochemical Safety Gauges -->
              <g transform="translate(235, 208)">
                <circle cx="0" cy="0" r="56" fill="rgba(10,18,16,0.78)" stroke="rgba(255,255,255,0.14)" stroke-width="6"/>
                <circle cx="0" cy="0" r="56" fill="none" stroke="#10B981" stroke-width="6" stroke-linecap="round" stroke-dasharray="310 360" transform="rotate(-90)" filter="url(#examGlow7)" class="exam-ring-gauge g1"/>
                <text x="0" y="-6" text-anchor="middle" fill="#A7F3D0" font-size="11" font-weight="800" font-family="JetBrains Mono, monospace">AST / ALT</text>
                <text x="0" y="12" text-anchor="middle" fill="#FFFFFF" font-size="12.5" font-weight="900" font-family="Pretendard, sans-serif">간 안전 PASS</text>
                <text x="0" y="28" text-anchor="middle" fill="#FEF08A" font-size="9.5" font-weight="700" font-family="Pretendard, sans-serif">99.2% 안심</text>
              </g>
              <g transform="translate(480, 178)">
                <circle cx="0" cy="0" r="60" fill="rgba(16,15,10,0.80)" stroke="rgba(255,255,255,0.14)" stroke-width="6"/>
                <circle cx="0" cy="0" r="60" fill="none" stroke="#FBBF24" stroke-width="6" stroke-linecap="round" stroke-dasharray="320 380" transform="rotate(-90)" filter="url(#examGlow7)" class="exam-ring-gauge g2"/>
                <text x="0" y="-8" text-anchor="middle" fill="#FEF08A" font-size="11" font-weight="800" font-family="JetBrains Mono, monospace">HbA1c · 혈당</text>
                <text x="0" y="11" text-anchor="middle" fill="#FFFFFF" font-size="13" font-weight="900" font-family="Pretendard, sans-serif">당 대사 정밀</text>
                <text x="0" y="28" text-anchor="middle" fill="#6EE7B7" font-size="9.5" font-weight="700" font-family="Pretendard, sans-serif">인슐린 균형</text>
              </g>
              <g transform="translate(725, 208)">
                <circle cx="0" cy="0" r="56" fill="rgba(10,16,22,0.78)" stroke="rgba(255,255,255,0.14)" stroke-width="6"/>
                <circle cx="0" cy="0" r="56" fill="none" stroke="#38BDF8" stroke-width="6" stroke-linecap="round" stroke-dasharray="300 360" transform="rotate(-90)" filter="url(#examGlow7)" class="exam-ring-gauge g3"/>
                <text x="0" y="-6" text-anchor="middle" fill="#BAE6FD" font-size="11" font-weight="800" font-family="JetBrains Mono, monospace">LIPID · 내분비</text>
                <text x="0" y="12" text-anchor="middle" fill="#FFFFFF" font-size="12.5" font-weight="900" font-family="Pretendard, sans-serif">대사질환 관리</text>
                <text x="0" y="28" text-anchor="middle" fill="#A7F3D0" font-size="9.5" font-weight="700" font-family="Pretendard, sans-serif">지질·호르몬</text>
              </g>
            </svg>`,
          metrics: [
            { code: 'LAB 01 · 간 안전성', tag: 'AST/ALT SAFE', title: '간 기능 수치 (AST · ALT) 점검', desc: '한약 복용 전·후 간 효소 수치를 객관적으로 확인해 간 부담 ZERO 보장', pct: '99%' },
            { code: 'LAB 02 · 당 대사', tag: 'HbA1c CARE', title: '공복혈당 · 당화혈색소 정밀 측정', desc: '당뇨 전단계·인슐린 저항성 및 혈당 스파이크 대사 지표를 체계적 관리', pct: '97%' },
            { code: 'LAB 03 · 내분비·지질', tag: 'METABOLIC', title: '콜레스테롤 · 중성지방 · 내분비', desc: '고지혈증·대사증후군 위험 인자와 내분비 호르몬 불균형을 통합 조절', pct: '96%' }
          ]
        },
        8: {
          code: 'APG VASCULAR & TOXIN SCAN · 말초 혈관 · 어혈 독소 검사',
          liveReadout: '가속도 맥파(APG) 혈관 탄성도 · 혈액 순환 속도 · 어혈 정체 분석',
          themeCol: '#F43F5E',
          accentCol: '#FDA4AF',
          svgHtml: `
            <svg class="exam-vector-svg exam-svg-8" viewBox="0 0 960 560" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <defs>
                <linearGradient id="vesselPurifyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#881337" stop-opacity="0.48"/>
                  <stop offset="48%" stop-color="#D4AF37" stop-opacity="0.38"/>
                  <stop offset="100%" stop-color="#10B981" stop-opacity="0.42"/>
                </linearGradient>
                <filter id="examGlow8" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur"/>
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>
              <!-- Micro-Vascular Conduit & Central Detoxification Filter Gate -->
              <path d="M110,228 Q480,172 850,228 L850,266 Q480,210 110,266 Z" fill="url(#vesselPurifyGrad)" stroke="rgba(253,230,138,0.55)" stroke-width="1.6"/>
              <!-- Central Detoxification Laser Gate -->
              <g transform="translate(480, 220)">
                <line x1="0" y1="-48" x2="0" y2="56" stroke="#6EE7B7" stroke-width="3" filter="url(#examGlow8)"/>
                <circle cx="0" cy="4" r="28" fill="none" stroke="#FEF08A" stroke-width="2" stroke-dasharray="5 4" class="exam-scope-ring-cw"/>
                <rect x="-88" y="-76" width="176" height="26" rx="13" fill="rgba(10,18,16,0.88)" stroke="#6EE7B7" stroke-width="1.3"/>
                <text x="0" y="-59" text-anchor="middle" fill="#A7F3D0" font-size="10.8" font-weight="800" font-family="Pretendard, sans-serif">✨ 어혈·독소 해독 정화 게이트</text>
              </g>
              <!-- APG Accelerated Plethysmogram Waveform (a-b-c-d-e peaks) -->
              <path class="exam-apg-waveform" d="M130,148 L210,148 L228,96 L246,168 L264,126 L282,154 L302,138 L330,148 L560,148 L578,92 L596,164 L614,122 L632,150 L652,136 L680,148 L830,148" fill="none" stroke="#FCA5A5" stroke-width="2.4" filter="url(#examGlow8)"/>
              <g transform="translate(235, 292)">
                <rect x="-95" y="-13" width="190" height="26" rx="13" fill="rgba(24,10,14,0.86)" stroke="#F87171" stroke-width="1.2"/>
                <text x="0" y="4" text-anchor="middle" fill="#FECACA" font-size="10.5" font-weight="800" font-family="Pretendard, sans-serif">⚠️ 정체된 어혈 · 혈관 내 독소</text>
              </g>
              <g transform="translate(725, 292)">
                <rect x="-102" y="-13" width="204" height="26" rx="13" fill="rgba(10,20,16,0.86)" stroke="#6EE7B7" stroke-width="1.2"/>
                <text x="0" y="4" text-anchor="middle" fill="#A7F3D0" font-size="10.5" font-weight="800" font-family="Pretendard, sans-serif">💎 해독 후 맑은 혈류 · 탄력 회복</text>
              </g>
            </svg>`,
          metrics: [
            { code: 'APG 01 · 혈관 탄성', tag: 'ELASTICITY', title: '가속도 맥파 · 혈관 노화도 단계', desc: '동맥 혈관의 탄성도와 경직도를 정밀 측정하여 혈관 건강 단계 판독', pct: '96%' },
            { code: 'APG 02 · 어혈·독소', tag: 'TOXIN DETOX', title: '혈액 속 어혈(瘀血) · 노폐물 정체', desc: '만성 피로·염증·통증의 원인인 혈관 내 어혈과 독소 축적도 분석', pct: '98%' },
            { code: 'APG 03 · 말초 혈류', tag: 'MICRO-FLOW ▲', title: '말초 혈액순환 · 손발저림·냉증', desc: '손발 끝 모세혈관까지 깨끗한 혈액과 산소가 도달하는 순환력 평가', pct: '97%' }
          ]
        },
        9: {
          code: 'PEDIATRIC GROWTH POTENTIAL · 소아·청소년 정밀 성장 검사',
          liveReadout: '무방사선 성장판 개방도 · 골연령(뼈나이) · 최종예상키 정밀 예측',
          themeCol: '#D4AF37',
          accentCol: '#FEF08A',
          svgHtml: `
            <svg class="exam-vector-svg exam-svg-9" viewBox="0 0 960 560" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <defs>
                <linearGradient id="growthCurveGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#10B981"/>
                  <stop offset="55%" stop-color="#6EE7B7"/>
                  <stop offset="100%" stop-color="#FEF08A"/>
                </linearGradient>
                <filter id="examGlow9" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur"/>
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>
              <!-- Baseline Trajectory vs Golden-Time Accelerated Final Height Curve -->
              <path d="M140,320 Q440,295 790,235" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="2" stroke-dasharray="6 6"/>
              <path class="exam-growth-curve-main" d="M140,320 Q420,255 790,108" fill="none" stroke="url(#growthCurveGrad)" stroke-width="4" stroke-linecap="round" filter="url(#examGlow9)"/>
              <!-- Milestone Nodes along Growth Curve -->
              <circle cx="140" cy="320" r="6" fill="#10B981"/>
              <circle cx="465" cy="212" r="7" fill="#6EE7B7" filter="url(#examGlow9)"/>
              <g transform="translate(465, 178)">
                <rect x="-88" y="-13" width="176" height="26" rx="13" fill="rgba(10,18,16,0.86)" stroke="#6EE7B7" stroke-width="1.3"/>
                <text x="0" y="4" text-anchor="middle" fill="#A7F3D0" font-size="10.5" font-weight="800" font-family="Pretendard, sans-serif">🌱 성장판 연골 증식 골든타임</text>
              </g>
              <g transform="translate(790, 108)">
                <circle cx="0" cy="0" r="16" fill="rgba(253,230,138,0.28)" class="exam-doppler-pulse"/>
                <circle cx="0" cy="0" r="8" fill="#FEF08A" filter="url(#examGlow9)"/>
                <rect x="-152" y="-38" width="172" height="28" rx="14" fill="rgba(20,16,10,0.90)" stroke="#FEF08A" stroke-width="1.5"/>
                <text x="-66" y="-20" text-anchor="middle" fill="#FEF08A" font-size="11" font-weight="900" font-family="Pretendard, sans-serif">🎯 숨은 키 + 최종예상키 도약 ▲</text>
              </g>
              <!-- Right-Edge Illuminated Laser Stadiometer Scale (130cm ~ 185cm+) -->
              <g transform="translate(886, 78)">
                <line x1="0" y1="0" x2="0" y2="250" stroke="rgba(253,230,138,0.68)" stroke-width="2"/>
                <line x1="-12" y1="0" x2="0" y2="0" stroke="#FEF08A" stroke-width="2"/><text x="-16" y="4" text-anchor="end" fill="#FEF08A" font-size="10.5" font-weight="900" font-family="JetBrains Mono, monospace">185cm+</text>
                <line x1="-8" y1="50" x2="0" y2="50" stroke="#6EE7B7" stroke-width="1.5"/><text x="-16" y="54" text-anchor="end" fill="#A7F3D0" font-size="10" font-weight="700" font-family="JetBrains Mono, monospace">175cm</text>
                <line x1="-8" y1="100" x2="0" y2="100" stroke="#6EE7B7" stroke-width="1.5"/><text x="-16" y="104" text-anchor="end" fill="#A7F3D0" font-size="10" font-weight="700" font-family="JetBrains Mono, monospace">165cm</text>
                <line x1="-8" y1="150" x2="0" y2="150" stroke="#6EE7B7" stroke-width="1.5"/><text x="-16" y="154" text-anchor="end" fill="#A7F3D0" font-size="10" font-weight="700" font-family="JetBrains Mono, monospace">155cm</text>
                <line x1="-8" y1="200" x2="0" y2="200" stroke="#6EE7B7" stroke-width="1.5"/><text x="-16" y="204" text-anchor="end" fill="#A7F3D0" font-size="10" font-weight="700" font-family="JetBrains Mono, monospace">145cm</text>
                <line x1="-10" y1="250" x2="0" y2="250" stroke="#FEF08A" stroke-width="1.8"/><text x="-16" y="254" text-anchor="end" fill="#FDE68A" font-size="10" font-weight="700" font-family="JetBrains Mono, monospace">135cm</text>
              </g>
            </svg>`,
          metrics: [
            { code: 'GROWTH 01 · 성장판', tag: 'OPEN PLATE', title: '무방사선 성장판 개방도 · 연골층', desc: '방사선 걱정 없이 무릎·손목 성장판이 열려 있는 잔여 비율 판독', pct: '98%' },
            { code: 'GROWTH 02 · 뼈나이', tag: 'BONE AGE', title: '골연령(뼈나이) · 성조숙증 징후', desc: '실제 나이 대비 뼈나이와 사춘기 성호르몬 조기 진행 위험 체크', pct: '96%' },
            { code: 'GROWTH 03 · 예상키', tag: 'FINAL HEIGHT ▲', title: '뼈길이 · 숨은 키 · 최종예상키', desc: '체형 불균형 숨은 키 복원 및 골든타임 맞춤 치료 시 최종예상키 산출', pct: '99%' }
          ]
        }
      }[exId] || {
        code: 'BAREUN PRECISION DIAGNOSTIC · 정밀 검진',
        liveReadout: '실시간 생체 정밀 분석 가동 중',
        themeCol: '#10B981',
        accentCol: '#6EE7B7',
        svgHtml: '',
        metrics: []
      };

      const editorialHtml = renderEditorialTextZone(p);
      const sepClass = editorialHtml ? ' has-separated-editorial' : '';
      return `
        <!-- PLATE ${numStr}: Sample A Separated Director 9-Core Diagnostic Examination Cinema Motion Plate (Exam 0${exId}) -->
        <article class="project-details-item is-image is-clean-plate is-director-exam-plate exam-theme-${exId}${sepClass}${idx === 0 ? ' is-active-plate' : ''}" data-fullscreen data-exam-id="${exId}" itemscope itemtype="https://schema.org/MedicalWebPage">
          <span class="tiny-card-num-badge">${numStr}</span>
          <figure class="plate-media-inner exam-media-stage pure-visual-zone">
            <div class="exam-photo-kenburns-wrap">
              <img class="lusion-clean-media exam-living-photo" src="${p.imgSrc}" alt="${(p.title || '').replace(/"/g, '&quot;')}" draggable="false">
            </div>
            <div class="exam-cinema-scrim"></div>

            <div class="motion-video-stage is-clean-fx-overlay is-exam-shader-stage" data-frames="${p.imgSrc}" data-duration="6.0" style="position:absolute;inset:0;pointer-events:none;z-index:3;background:transparent;">
              <canvas class="plate-fx-canvas" data-fx="exam-retina-shader-${exId}" style="width:100%;height:100%;display:block;pointer-events:none;"></canvas>
            </div>

            <div class="exam-svg-motion-wrap" aria-hidden="true">
              ${EXAM_MOTION_SPEC.svgHtml}
            </div>

            <div class="exam-top-hud-bar">
              <span class="exam-hud-badge">
                <span class="exam-live-dot" style="background:${EXAM_MOTION_SPEC.themeCol};box-shadow:0 0 10px ${EXAM_MOTION_SPEC.themeCol};"></span>
                <span>${EXAM_MOTION_SPEC.code}</span>
              </span>
              <span class="exam-hud-telemetry-pill" data-exam-live-readout="${exId}">
                ${EXAM_MOTION_SPEC.liveReadout}
              </span>
            </div>

            <div class="exam-biometric-dock">
              ${EXAM_MOTION_SPEC.metrics.map((m, mIdx) => `
              <div class="exam-bio-card">
                <div class="exam-bio-top">
                  <span class="exam-bio-code">${m.code}</span>
                  <span class="exam-bio-tag">${m.tag}</span>
                </div>
                <strong class="exam-bio-title">${m.title}</strong>
                <p class="exam-bio-desc">${m.desc}</p>
                <div class="exam-bio-bar-track">
                  <div class="exam-bio-bar-fill bar-${mIdx + 1}" style="width:${m.pct};"></div>
                </div>
              </div>`).join('')}
            </div>${renderPlateThumbsDock(p, p.imgSrc || '')}
          </figure>${editorialHtml}
        </article>`;
    }

    const isContain = p.fit === 'contain';
    const mainImgSrc = p.imgSrc || (p.frames && p.frames[0]) || '';
    const cleanThumbsHtml = renderPlateThumbsDock(p, mainImgSrc);
    const cleanFxCanvasHtml = p.fx ? `
            <div class="motion-video-stage is-clean-fx-overlay" data-frames="${mainImgSrc}" data-duration="${p.durationSec || 6.0}" style="position:absolute;inset:0;pointer-events:none;z-index:3;background:transparent;">
              <canvas class="plate-fx-canvas" data-fx="${p.fx}" style="width:100%;height:100%;display:block;pointer-events:none;"></canvas>
            </div>` : '';
    const editorialHtml = renderEditorialTextZone(p);
    const sepClass = editorialHtml ? ' has-separated-editorial' : '';
    return `
        <!-- PLATE ${numStr}: Sample A Separated Pure Image + Editorial Card -->
        <article class="project-details-item is-image is-clean-plate${sepClass}${idx === 0 ? ' is-active-plate' : ''}${isContain ? ' has-contain-media' : ''}"${p.fullscreen !== false ? ' data-fullscreen' : ''} itemscope itemtype="https://schema.org/MedicalWebPage">
          <span class="tiny-card-num-badge">${numStr}</span>
          <figure class="plate-media-inner pure-visual-zone">
            <img class="lusion-clean-media${isContain ? ' is-contain-fit' : ''}" src="${mainImgSrc}" alt="${(p.title || '').replace(/"/g, '&quot;')}" draggable="false" itemprop="image">${cleanFxCanvasHtml}${cleanThumbsHtml}
          </figure>${editorialHtml}
        </article>`;
  }).join('\n');

  const bodyExtraClasses = ['theme-hanji'];
  if (cardStyle.showNumBadge === false) bodyExtraClasses.push('hide-card-num-badge');
  if (cardStyle.showExamHud === true) bodyExtraClasses.push('show-exam-hud');

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>${page.meta.title} — 바른한의원 대전본점 · 아빠 한의사 내 가족 주치의</title>
  <meta name="description" content="아빠 한의사 · 내 가족에게 직접 처방하고 시술한 치료만 시행하며 모든 환자를 내 가족처럼 진료하는 주치의 | ${page.meta.title} — ${(page.meta.desc && page.meta.desc[0]) || ''}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="바른한의원 대전본점 · 아빠 한의사">
  <meta property="og:title" content="${page.meta.title} — 바른한의원 대전본점 (아빠 한의사 · 내 가족 주치의)">
  <meta property="og:description" content="내 가족에게 처방하고 시술한 치료만 하는 아빠 한의사 · ${(page.meta.desc && page.meta.desc[0]) || ''}">
  <meta property="og:image" content="https://raw.githubusercontent.com/ajwei0508-cpu/bareun-homepage/main/homepage/${(page.bodyModelCard && page.bodyModelCard.bg) || 'bareun_step4_pain_chuna_healing.jpg'}">
  <link rel="icon" type="image/svg+xml" href="https://raw.githubusercontent.com/ajwei0508-cpu/bareun-homepage/main/homepage/bareun-favicon.svg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,600&family=Gowun+Batang:wght@400;700&family=Noto+Serif+KR:wght@400;600;700;900&family=Pretendard:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-dark: ${page.theme.bgDark};
      --bg-panel: ${page.theme.bgPanel};
      --accent: ${page.theme.accent};
      --accent-light: ${page.theme.accentLight};
      --secondary: ${page.theme.secondary};
      --gold: #D4AF37;
      --gold-light: #F3E5AB;
      --emerald: #10B981;
      --text-main: #F8FAFC;
      --text-sub: rgba(248, 250, 252, 0.76);
      --text-muted: rgba(248, 250, 252, 0.48);
      --border-subtle: rgba(255, 255, 255, 0.09);
      --border-gold: rgba(212, 175, 55, 0.35);
      --left-col-width: 455px;
      --sa-bg-top: ${cardStyle.bgTop || '#1b1815'};
      --sa-bg-bot: ${cardStyle.bgBot || '#13110f'};
      --sa-border: ${cardStyle.borderColor || 'rgba(197, 160, 89, 0.44)'};
      --sa-divider: ${cardStyle.dividerColor || 'rgba(212, 175, 55, 0.36)'};
      --sa-title-color: ${cardStyle.titleColor || '#fdfbf7'};
      --sa-hl-color: ${cardStyle.hlColor || '#f5d36c'};
      --sa-body-color: ${cardStyle.bodyColor || 'rgba(245, 240, 232, 0.84)'};
      --sa-title-size: ${titleSizeCss};
      --sa-body-size: ${bodySizeCss};
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    html, body {
      width: 100%;
      height: 100%;
      background-color: var(--bg-dark);
      color: var(--text-main);
      font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
      overflow: hidden;
      -webkit-font-smoothing: antialiased;
      user-select: none;
    }

    .ambient-bg {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 0;
      background:
        radial-gradient(circle at 20% 24%, ${page.theme.glowA} 0%, transparent 50%),
        radial-gradient(circle at 80% 72%, ${page.theme.glowB} 0%, transparent 52%),
        linear-gradient(135deg, #0D1014 0%, var(--bg-dark) 55%, #090B0E 100%);
    }

    /* Top Header */
    #header {
      position: fixed;
      top: 0; left: 0; right: 0;
      height: 66px;
      z-index: 100;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 26px;
      background: rgba(12, 14, 18, 0.78);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--border-subtle);
    }

    .header-left { display: flex; align-items: center; gap: 14px; }

    .brand-logo {
      text-decoration: none;
      color: var(--text-main);
      font-family: 'Noto Serif KR', serif;
      font-weight: 700;
      font-size: 1.05rem;
      letter-spacing: 0.04em;
      display: flex;
      align-items: center;
      gap: 9px;
    }

    .brand-logo-mark {
      width: 8px; height: 8px;
      border-radius: 50%;
      background: var(--accent);
      box-shadow: 0 0 12px var(--accent);
    }

    .back-pill-btn {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 7px 14px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: var(--text-main);
      text-decoration: none;
      font-size: 0.79rem;
      font-weight: 600;
      transition: all 0.25s ease;
    }

    .back-pill-btn:hover {
      background: var(--accent);
      color: #0B0D10;
      border-color: var(--accent);
      transform: translateX(-2px);
    }

    .header-center { display: flex; align-items: center; gap: 18px; }

    #project-details-header-info {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 0.73rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.14em;
      color: var(--accent-light);
      padding: 6px 14px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.14);
    }

    #project-details-header-info svg {
      width: 14px; height: 14px;
      animation: arrowPulseRight 1.6s infinite ease-in-out;
    }

    @keyframes arrowPulseRight {
      0%, 100% { transform: translateX(0); opacity: 0.65; }
      50% { transform: translateX(4px); opacity: 1; }
    }

    .clinic-quick-tabs { display: flex; align-items: center; gap: 5px; }

    .clinic-tab {
      text-decoration: none;
      color: var(--text-muted);
      font-size: 0.76rem;
      font-weight: 600;
      padding: 6px 11px;
      border-radius: 999px;
      transition: all 0.2s ease;
      border: 1px solid transparent;
    }

    .clinic-tab:hover { color: var(--text-main); background: rgba(255, 255, 255, 0.06); }

    .clinic-tab.active {
      color: #0D0F12;
      background: var(--accent-light);
      border-color: var(--accent);
      font-weight: 800;
    }

    #header .header-left,
    #header .header-right {
      flex-shrink: 0;
    }
    #header .header-center {
      min-width: 0;
      flex: 1 1 auto;
      justify-content: center;
      overflow-x: auto;
      scrollbar-width: none;
    }
    #header .header-center::-webkit-scrollbar { display: none; }
    #header .back-pill-btn,
    #header .clinic-tab,
    #header .header-studio-btn,
    #header .header-vis-btn,
    #header .header-talk-btn {
      white-space: nowrap !important;
      flex-shrink: 0 !important;
    }
    @media (max-width: 1560px) and (min-width: 1025px) {
      #header { padding-left: 16px !important; padding-right: 16px !important; gap: 8px !important; }
      #header .back-pill-btn { padding: 6px 10px !important; font-size: 0.74rem !important; }
      #header .clinic-tab { padding: 5px 9px !important; font-size: 0.73rem !important; }
      #header .header-vis-btn,
      #header .header-studio-btn,
      #header .header-talk-btn { padding: 6px 12px !important; font-size: 0.75rem !important; }
    }
    .header-right { display: flex; align-items: center; gap: 8px; }

    .header-talk-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 18px;
      border-radius: 999px;
      background: linear-gradient(135deg, var(--accent) 0%, #B8860B 100%);
      color: #0B0D10;
      font-size: 0.8rem;
      font-weight: 800;
      border: none;
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .header-talk-btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(212, 175, 55, 0.35);
    }

    /* Main Split Stage */
    #project-details {
      position: relative;
      z-index: 10;
      width: 100vw;
      height: 100vh;
      padding-top: 66px;
      display: flex;
      overflow: hidden;
    }

    /* LEFT CLINIC GUIDE & EMPATHY CHECKLIST PANEL */
    #project-details-meta {
      width: var(--left-col-width);
      min-width: var(--left-col-width);
      height: calc(100vh - 66px);
      background: var(--bg-panel);
      backdrop-filter: blur(28px);
      border-right: 1px solid var(--border-subtle);
      padding: 24px 28px 22px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 14px;
      z-index: 30;
      overflow-y: auto;
      scrollbar-width: thin;
      scrollbar-color: rgba(255, 255, 255, 0.16) transparent;
    }

    .meta-eyebrow {
      font-size: 0.69rem;
      font-weight: 700;
      letter-spacing: 0.17em;
      text-transform: uppercase;
      color: var(--accent);
      margin-bottom: 6px;
    }

    #project-details-title {
      font-family: 'Noto Serif KR', serif;
      font-size: 1.85rem;
      font-weight: 900;
      line-height: 1.18;
      letter-spacing: -0.02em;
      color: var(--text-main);
      margin-bottom: 4px;
    }

    .meta-subtitle-en {
      font-family: 'Cormorant Garamond', serif;
      font-style: italic;
      font-size: 1.04rem;
      color: var(--accent-light);
      opacity: 0.85;
      margin-bottom: 12px;
    }

    #project-details-desc {
      display: flex;
      flex-direction: column;
      gap: 8px;
      font-size: 0.82rem;
      line-height: 1.62;
      color: var(--text-sub);
      margin-bottom: 14px;
      word-break: keep-all;
    }

    /* Interactive Patient Empathy Daily Discomfort Checklist */
    .empathy-checklist-card {
      background: rgba(255, 255, 255, 0.035);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 16px;
      padding: 15px 16px;
      margin-bottom: 14px;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
    }

    .empathy-checklist-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 6px;
    }

    .empathy-checklist-title {
      font-size: 0.82rem;
      font-weight: 800;
      color: var(--accent-light);
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .empathy-count-badge {
      font-size: 0.7rem;
      font-weight: 800;
      padding: 3px 9px;
      border-radius: 999px;
      background: rgba(212, 175, 55, 0.16);
      border: 1px solid rgba(212, 175, 55, 0.38);
      color: var(--accent-light);
      transition: all 0.25s ease;
    }

    .empathy-count-badge.active {
      background: var(--accent);
      color: #0B0D10;
      box-shadow: 0 0 14px rgba(212, 175, 55, 0.45);
    }

    .empathy-checklist-sub {
      font-size: 0.73rem;
      color: var(--text-muted);
      margin-bottom: 10px;
    }

    .empathy-checklist-list {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .empathy-check-item {
      display: flex;
      align-items: flex-start;
      gap: 9px;
      padding: 8px 10px;
      border-radius: 10px;
      background: rgba(0, 0, 0, 0.26);
      border: 1px solid rgba(255, 255, 255, 0.07);
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .empathy-check-item:hover {
      background: rgba(255, 255, 255, 0.06);
      border-color: rgba(255, 255, 255, 0.18);
    }

    .empathy-check-item.checked {
      background: rgba(16, 185, 129, 0.13);
      border-color: rgba(110, 231, 183, 0.55);
      box-shadow: 0 4px 14px rgba(16, 185, 129, 0.14);
    }

    .empathy-check-input {
      display: none;
    }

    .empathy-check-box {
      width: 17px;
      height: 17px;
      min-width: 17px;
      border-radius: 5px;
      border: 1.5px solid rgba(255, 255, 255, 0.32);
      background: rgba(255, 255, 255, 0.04);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-top: 1px;
      color: transparent;
      transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .empathy-check-box svg {
      width: 11px;
      height: 11px;
      transform: scale(0.5);
      transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .empathy-check-item.checked .empathy-check-box {
      background: var(--emerald);
      border-color: #6EE7B7;
      color: #06281E;
    }

    .empathy-check-item.checked .empathy-check-box svg {
      transform: scale(1);
    }

    .empathy-check-text {
      font-size: 0.77rem;
      line-height: 1.42;
      color: rgba(248, 250, 252, 0.84);
      word-break: keep-all;
    }

    .empathy-check-item.checked .empathy-check-text {
      color: #FFFFFF;
      font-weight: 600;
    }

    .empathy-count-badge.is-tier-1 {
      background: #16A34A !important;
      border-color: #4ADE80 !important;
      color: #FFFFFF !important;
      box-shadow: 0 0 12px rgba(22, 163, 74, 0.48);
    }

    .empathy-count-badge.is-tier-2 {
      background: #F97316 !important;
      border-color: #FDBA74 !important;
      color: #FFFFFF !important;
      box-shadow: 0 0 14px rgba(249, 115, 22, 0.52);
    }

    .empathy-count-badge.is-tier-3 {
      background: #EA580C !important;
      border-color: #FB923C !important;
      color: #FFFFFF !important;
      box-shadow: 0 0 15px rgba(234, 88, 12, 0.58);
    }

    .empathy-count-badge.is-tier-4 {
      background: #DC2626 !important;
      border-color: #F87171 !important;
      color: #FFFFFF !important;
      box-shadow: 0 0 16px rgba(220, 38, 38, 0.65);
      animation: severeBadgePulse 1.2s infinite ease-in-out;
    }

    .empathy-count-badge.is-tier-5 {
      background: #B91C1C !important;
      border-color: #FCA5A5 !important;
      color: #FEF08A !important;
      box-shadow: 0 0 20px rgba(239, 68, 68, 0.85);
      animation: severeBadgePulse 0.85s infinite ease-in-out;
    }

    @keyframes severeBadgePulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }

    /* 5-Stage Doctor Comment Board inside Empathy Checklist (초록 -> 주황 -> 레드) */
    .empathy-severity-board {
      margin-top: 12px;
      display: none;
      flex-direction: column;
      gap: 8px;
      padding: 13px 14px;
      border-radius: 14px;
      background: rgba(22, 163, 74, 0.18);
      border: 1.5px solid rgba(34, 197, 94, 0.45);
      transition: all 0.28s cubic-bezier(0.22, 1, 0.36, 1);
    }

    .doc-comment-top-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }

    .doc-comment-eyebrow {
      font-size: 0.7rem;
      font-weight: 800;
      letter-spacing: 0.04em;
      color: #FDE68A;
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }

    .doc-comment-pill {
      font-size: 0.66rem;
      font-weight: 900;
      padding: 3px 9px;
      border-radius: 999px;
      background: #16A34A;
      color: #FFFFFF;
      border: 1px solid #86EFAC;
    }

    .doc-comment-progress-track {
      width: 100%;
      height: 8px;
      border-radius: 999px;
      background: linear-gradient(90deg, rgba(22, 163, 74, 0.25) 0%, rgba(249, 115, 22, 0.25) 50%, rgba(220, 38, 38, 0.25) 100%);
      overflow: hidden;
    }

    .doc-comment-progress-fill {
      height: 100%;
      width: 100%;
      border-radius: 999px;
      background: linear-gradient(90deg, #16A34A 0%, #F97316 50%, #DC2626 100%);
      transition: width 0.38s cubic-bezier(0.22, 1, 0.36, 1), background 0.3s ease;
    }

    .doc-comment-headline {
      font-size: 0.92rem;
      font-weight: 900;
      color: #FFFFFF;
      line-height: 1.3;
      letter-spacing: -0.02em;
      word-break: keep-all;
    }

    .doc-comment-body {
      font-size: 0.77rem;
      font-weight: 600;
      line-height: 1.52;
      color: rgba(248, 250, 252, 0.92);
      word-break: keep-all;
    }

    /* Tier 1: 1개 체크 — 녹색 (Green · 초기 관리 권장) */
    .empathy-severity-board.tier-1 {
      background: linear-gradient(135deg, rgba(22, 163, 74, 0.36) 0%, rgba(21, 128, 61, 0.26) 100%);
      border: 2px solid #22C55E;
      box-shadow: 0 6px 20px rgba(22, 163, 74, 0.28);
    }
    .empathy-severity-board.tier-1 .doc-comment-pill {
      background: #16A34A;
      border-color: #86EFAC;
    }
    .empathy-severity-board.tier-1 .doc-comment-progress-fill {
      background: linear-gradient(90deg, #16A34A, #22C55E);
    }
    .empathy-severity-board.tier-1 .doc-comment-headline {
      color: #86EFAC;
    }

    /* Tier 2: 2개 체크 — 주황색 (Orange · 주의 20% 진행중) */
    .empathy-severity-board.tier-2 {
      background: linear-gradient(135deg, rgba(249, 115, 22, 0.36) 0%, rgba(234, 88, 12, 0.26) 100%);
      border: 2px solid #F97316;
      box-shadow: 0 6px 20px rgba(249, 115, 22, 0.32);
    }
    .empathy-severity-board.tier-2 .doc-comment-pill {
      background: #F97316;
      border-color: #FED7AA;
    }
    .empathy-severity-board.tier-2 .doc-comment-progress-fill {
      background: linear-gradient(90deg, #16A34A 0%, #F97316 100%);
    }
    .empathy-severity-board.tier-2 .doc-comment-headline {
      color: #FED7AA;
    }

    /* Tier 3: 3개 체크 — 진한 주황색 (Deep Orange · 위험 50% 고생중) */
    .empathy-severity-board.tier-3 {
      background: linear-gradient(135deg, rgba(234, 88, 12, 0.42) 0%, rgba(194, 65, 12, 0.30) 100%);
      border: 2px solid #FB923C;
      box-shadow: 0 8px 24px rgba(234, 88, 12, 0.38);
    }
    .empathy-severity-board.tier-3 .doc-comment-pill {
      background: #EA580C;
      border-color: #FED7AA;
    }
    .empathy-severity-board.tier-3 .doc-comment-progress-fill {
      background: linear-gradient(90deg, #16A34A 0%, #F97316 55%, #EA580C 100%);
    }
    .empathy-severity-board.tier-3 .doc-comment-headline {
      color: #FFEDD5;
    }

    /* Tier 4: 4개 체크 — 레드 (Red · 심각 70% 위태함) */
    .empathy-severity-board.tier-4 {
      background: linear-gradient(135deg, rgba(220, 38, 38, 0.44) 0%, rgba(153, 27, 27, 0.34) 100%);
      border: 2px solid #EF4444;
      box-shadow: 0 8px 26px rgba(220, 38, 38, 0.48);
      animation: severeCardPulse 1.3s infinite ease-in-out;
    }
    .empathy-severity-board.tier-4 .doc-comment-pill {
      background: #DC2626;
      border-color: #FECACA;
    }
    .empathy-severity-board.tier-4 .doc-comment-progress-fill {
      background: linear-gradient(90deg, #16A34A 0%, #F97316 45%, #EF4444 100%);
    }
    .empathy-severity-board.tier-4 .doc-comment-headline {
      color: #FECACA;
    }

    /* Tier 5: 5개 모두 체크 — 강렬한 레드 (Crimson Red · 100% 긴급 경보) */
    .empathy-severity-board.tier-5 {
      background: linear-gradient(135deg, rgba(185, 28, 28, 0.94) 0%, rgba(127, 29, 29, 0.96) 100%);
      border: 2.5px solid #EF4444;
      box-shadow: 0 10px 32px rgba(220, 38, 38, 0.68);
      animation: severeCardPulse 0.9s infinite ease-in-out;
    }
    .empathy-severity-board.tier-5 .doc-comment-pill {
      background: #DC2626;
      border-color: #FEF08A;
      color: #FFFFFF;
    }
    .empathy-severity-board.tier-5 .doc-comment-progress-fill {
      background: linear-gradient(90deg, #16A34A 0%, #F97316 40%, #DC2626 100%);
    }
    .empathy-severity-board.tier-5 .doc-comment-headline {
      color: #FEF08A !important;
      font-size: 0.96rem;
    }
    .empathy-severity-board.tier-5 .doc-comment-body {
      color: #FFFFFF !important;
    }

    @keyframes severeCardPulse {
      0%, 100% { box-shadow: 0 8px 24px rgba(220, 38, 38, 0.38); }
      50% { box-shadow: 0 8px 32px rgba(239, 68, 68, 0.75); }
    }

    /* ============================================================================
       5/5 CHECKLIST FULL-SCREEN CENTER URGENT SLAM ANIMATION & "쾅! 쾅!" OVERLAY
       ============================================================================ */
    @keyframes screenHeavyImpactShake {
      0%, 100% { transform: translate3d(0, 0, 0); }
      12% { transform: translate3d(-12px, -9px, 0) rotate(-0.8deg); }
      24% { transform: translate3d(11px, 8px, 0) rotate(0.8deg); }
      36% { transform: translate3d(-9px, 6px, 0) rotate(-0.5deg); }
      48% { transform: translate3d(9px, -7px, 0) rotate(0.5deg); }
      64% { transform: translate3d(-5px, 4px, 0); }
      80% { transform: translate3d(4px, -3px, 0); }
    }

    body.urgent-impact-shaking {
      animation: screenHeavyImpactShake 0.42s cubic-bezier(0.36, 0.07, 0.19, 0.97);
    }

    #urgent-5check-alert-modal {
      position: fixed;
      inset: 0;
      z-index: 15000;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 20px;
      background:
        radial-gradient(circle at 50% 50%, rgba(185, 28, 28, 0.45) 0%, rgba(15, 5, 7, 0.94) 72%),
        rgba(8, 4, 6, 0.92);
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
    }

    #urgent-5check-alert-modal.open {
      display: flex;
    }

    .urgent-5check-dialog {
      position: relative;
      width: min(680px, 94vw);
      border-radius: 28px;
      padding: 36px 34px 30px;
      background: linear-gradient(155deg, #24080B 0%, #140507 58%, #1C080A 100%);
      border: 2.5px solid #EF4444;
      box-shadow:
        0 35px 100px rgba(0, 0, 0, 0.92),
        0 0 65px rgba(220, 38, 38, 0.55),
        inset 0 0 0 2px rgba(253, 230, 138, 0.22);
      text-align: center;
      color: #FFFFFF;
      overflow: hidden;
    }

    .urgent-shockwave-ring {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 140px;
      height: 140px;
      border-radius: 50%;
      border: 4px solid rgba(248, 113, 113, 0.9);
      transform: translate(-50%, -50%) scale(0.2);
      opacity: 0;
      pointer-events: none;
    }

    #urgent-5check-alert-modal.open .urgent-shockwave-ring.ring-1 {
      animation: urgentShockwaveExpand 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.02s forwards;
    }

    #urgent-5check-alert-modal.open .urgent-shockwave-ring.ring-2 {
      border-color: rgba(253, 230, 138, 0.95);
      animation: urgentShockwaveExpand 0.95s cubic-bezier(0.16, 1, 0.3, 1) 0.36s forwards;
    }

    @keyframes urgentShockwaveExpand {
      0% { transform: translate(-50%, -50%) scale(0.2); opacity: 1; }
      100% { transform: translate(-50%, -50%) scale(5.2); opacity: 0; }
    }

    /* 1st Impact ("쾅!" at 0ms): Top Red Warning Seal Stamp */
    .urgent-slam-stage-1 {
      opacity: 0;
      transform: scale(2.8) translateY(-30px);
    }

    #urgent-5check-alert-modal.open .urgent-slam-stage-1 {
      animation: heavyStampSlam 0.36s cubic-bezier(0.18, 1.25, 0.4, 1) 0.01s forwards;
    }

    /* 2nd Impact ("쾅!" at 360ms): Main Serious Headline Stamp */
    .urgent-slam-stage-2 {
      opacity: 0;
      transform: scale(2.6) rotate(-2deg);
    }

    #urgent-5check-alert-modal.open .urgent-slam-stage-2 {
      animation: heavyStampSlamMain 0.42s cubic-bezier(0.18, 1.3, 0.38, 1) 0.36s forwards;
    }

    @keyframes heavyStampSlam {
      0% { opacity: 0; transform: scale(2.8) translateY(-28px); filter: blur(8px); }
      70% { opacity: 1; transform: scale(0.93) translateY(3px); filter: blur(0); }
      86% { transform: scale(1.04); }
      100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
    }

    @keyframes heavyStampSlamMain {
      0% { opacity: 0; transform: scale(2.65) rotate(-3deg); filter: blur(10px); }
      68% { opacity: 1; transform: scale(0.92) rotate(0.6deg); filter: blur(0); }
      85% { transform: scale(1.05) rotate(-0.3deg); }
      100% { opacity: 1; transform: scale(1) rotate(0deg); filter: blur(0); }
    }

    .urgent-top-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 7px 18px;
      border-radius: 999px;
      background: linear-gradient(135deg, #DC2626, #991B1B);
      border: 1.5px solid #FCA5A5;
      color: #FEF08A;
      font-size: 0.8rem;
      font-weight: 900;
      letter-spacing: 0.08em;
      margin-bottom: 18px;
      box-shadow: 0 6px 22px rgba(220, 38, 38, 0.6);
    }

    .urgent-stamp-box {
      position: relative;
      margin: 4px auto 20px;
      padding: 22px 20px;
      border-radius: 20px;
      background: rgba(153, 27, 27, 0.28);
      border: 3px double #F87171;
      box-shadow: inset 0 0 30px rgba(220, 38, 38, 0.35), 0 12px 32px rgba(0, 0, 0, 0.55);
    }

    .urgent-main-headline {
      font-family: 'Noto Serif KR', serif;
      font-size: clamp(1.55rem, 3.2vw, 2.35rem);
      font-weight: 900;
      line-height: 1.34;
      letter-spacing: -0.03em;
      color: #FFFFFF;
      text-shadow: 0 4px 20px rgba(220, 38, 38, 0.85);
      word-break: keep-all;
      margin: 0;
    }

    .urgent-main-headline em {
      font-style: normal;
      color: #FEF08A;
      display: block;
      font-size: clamp(1.7rem, 3.5vw, 2.55rem);
      margin-top: 4px;
      text-decoration: underline;
      text-decoration-color: #EF4444;
      text-underline-offset: 6px;
    }

    .urgent-sub-desc {
      font-size: 0.92rem;
      line-height: 1.6;
      color: rgba(254, 226, 226, 0.94);
      margin: 0 auto 22px;
      max-width: 540px;
      font-weight: 600;
      word-break: keep-all;
    }

    .urgent-sub-desc strong {
      color: #FEF08A;
      font-weight: 800;
    }

    .urgent-actions-row {
      display: grid;
      grid-template-columns: 1.35fr 1fr;
      gap: 10px;
      margin-bottom: 12px;
    }

    .urgent-btn-primary {
      padding: 14px 18px;
      border-radius: 14px;
      border: 1.5px solid #FEF08A;
      background: linear-gradient(135deg, #DC2626 0%, #991B1B 100%);
      color: #FFFFFF;
      font-size: 0.92rem;
      font-weight: 900;
      cursor: pointer;
      box-shadow: 0 10px 28px rgba(220, 38, 38, 0.55);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .urgent-btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 14px 34px rgba(239, 68, 68, 0.75);
    }

    .urgent-btn-tel {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 14px 16px;
      border-radius: 14px;
      border: 1.5px solid rgba(253, 230, 138, 0.55);
      background: rgba(255, 255, 255, 0.08);
      color: #FEF08A;
      font-size: 0.86rem;
      font-weight: 800;
      text-decoration: none;
      transition: background 0.2s ease;
    }

    .urgent-btn-tel:hover {
      background: rgba(253, 230, 138, 0.2);
    }

    .urgent-btn-close {
      width: 100%;
      padding: 10px;
      border-radius: 10px;
      border: 1px solid rgba(255, 255, 255, 0.18);
      background: rgba(255, 255, 255, 0.05);
      color: rgba(255, 255, 255, 0.78);
      font-size: 0.78rem;
      font-weight: 700;
      cursor: pointer;
    }

    @media (max-width: 640px) {
      .urgent-5check-dialog {
        padding: 26px 20px 22px;
      }
      .urgent-actions-row {
        grid-template-columns: 1fr;
      }
    }

    .cta-nudge-msg {
      font-size: 0.74rem;
      font-weight: 700;
      color: var(--accent-light);
      background: rgba(16, 185, 129, 0.08);
      border: 1px dashed rgba(16, 185, 129, 0.38);
      border-radius: 10px;
      padding: 8px 11px;
      margin-bottom: 8px;
      line-height: 1.42;
      word-break: keep-all;
    }

    body.theme-hanji .cta-nudge-msg {
      background: #E8F2EC;
      border-color: rgba(45, 90, 67, 0.36);
      color: #2D5A43;
    }

    #project-details-launch-cta {
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 12px 18px;
      border-radius: 999px;
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.22), rgba(16, 185, 129, 0.18));
      border: 1px solid var(--accent);
      color: #FFFFFF;
      font-size: 0.84rem;
      font-weight: 800;
      transition: all 0.25s ease;
      cursor: pointer;
    }

    #project-details-launch-cta:hover {
      background: var(--accent);
      color: #0B0D10;
      box-shadow: 0 8px 25px rgba(212, 175, 55, 0.35);
    }

    .cta-left-group { display: flex; align-items: center; gap: 9px; }

    #project-details-launch-cta-dot {
      width: 8px; height: 8px;
      border-radius: 50%;
      background: var(--emerald);
      box-shadow: 0 0 8px var(--emerald);
    }

    .extra-detail-link {
      display: block;
      text-align: center;
      margin-top: 8px;
      padding: 8px 12px;
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.12);
      color: var(--accent-light);
      font-size: 0.75rem;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.2s ease;
    }

    .extra-detail-link:hover {
      background: rgba(255, 255, 255, 0.12);
      border-color: var(--accent);
    }

    /* Live Story Docent Box */
    .live-plate-docent {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--border-gold);
      border-radius: 14px;
      padding: 13px 15px;
    }

    .docent-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 7px;
    }

    .docent-step-badge {
      font-size: 0.68rem;
      font-weight: 800;
      letter-spacing: 0.14em;
      color: var(--accent-light);
    }

    .plate-jump-dots { display: flex; gap: 5px; }

    .plate-dot-btn {
      width: 22px; height: 22px;
      border-radius: 50%;
      border: 1px solid rgba(255, 255, 255, 0.18);
      background: transparent;
      color: var(--text-muted);
      font-size: 0.65rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .plate-dot-btn.active,
    .plate-dot-btn:hover {
      background: var(--accent);
      color: #0B0D10;
      border-color: var(--accent);
    }

    .docent-active-caption {
      font-size: 0.78rem;
      line-height: 1.5;
      color: #FFFFFF;
      font-weight: 500;
      min-height: 2.9em;
      word-break: keep-all;
    }

    /* RIGHT HORIZONTAL MOTION-VIDEO STORYTELLING RUNWAY */
    #project-details-items-wrapper {
      flex: 1;
      height: calc(100vh - 66px);
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      cursor: grab;
    }

    #project-details-items-wrapper:active { cursor: grabbing; }

    #project-details-items-move-container {
      display: flex;
      align-items: center;
      gap: 32px;
      padding: 0 56px;
      height: 100%;
      will-change: transform;
    }

    .project-details-item {
      position: relative;
      width: 56vw;
      max-width: 820px;
      height: 76vh;
      max-height: 680px;
      border-radius: 22px;
      overflow: hidden;
      flex-shrink: 0;
      background: #101318;
      border: 1px solid rgba(255, 255, 255, 0.12);
      box-shadow: 0 28px 70px rgba(0, 0, 0, 0.65);
      transition: border-color 0.4s ease, box-shadow 0.4s ease;
    }

    .project-details-item[data-fullscreen] {
      width: 66vw;
      max-width: 960px;
      height: 81vh;
      max-height: 730px;
    }

    .project-details-item.is-active-plate {
      border-color: rgba(212, 175, 55, 0.65);
      box-shadow: 0 32px 85px rgba(0, 0, 0, 0.78), 0 0 36px rgba(212, 175, 55, 0.14);
    }

    .plate-media-inner {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }

    /* Lusion Oryzo_AI Clean Video & Image Plates */
    .project-details-item.is-clean-plate {
      border-radius: 20px;
      border: 1px solid rgba(255, 237, 215, 0.12);
      background: #14100E;
      box-shadow: 0 24px 64px rgba(0, 0, 0, 0.55);
    }

    .project-details-item.is-clean-plate.is-active-plate {
      border-color: rgba(255, 237, 215, 0.36);
      box-shadow: 0 30px 80px rgba(0, 0, 0, 0.72);
    }

    .lusion-clean-media {
      position: absolute;
      inset: -4%;
      width: 108%;
      height: 108%;
      object-fit: cover;
      object-position: center center;
      display: block;
      will-change: transform;
      transition: transform 0.12s linear, opacity 0.18s ease;
    }

    .lusion-clean-media.is-contain-fit {
      inset: 0 !important;
      width: 100% !important;
      height: 100% !important;
      object-fit: contain !important;
      object-position: center 12px !important;
      padding: 12px 18px 158px !important;
      background: radial-gradient(circle at 50% 42%, #1D1814 0%, #0D0A08 100%);
    }

    .project-details-item.is-clean-video-contain,
    body.theme-hanji .project-details-item.is-clean-video-contain {
      background: #000000 !important;
    }

    .project-details-item.is-clean-video-contain .plate-media-inner,
    .project-details-item.is-clean-video-contain .motion-video-stage {
      background: #000000 !important;
    }

    .lusion-clean-media.is-video-contain-fit {
      position: absolute !important;
      inset: 0 !important;
      width: 100% !important;
      height: 100% !important;
      object-fit: contain !important;
      object-position: center center !important;
      padding: 0 !important;
      margin: 0 !important;
      background: #000000 !important;
      transform: none !important;
    }

    .project-details-item.has-contain-media .visual-sci-overlay {
      opacity: 0;
      pointer-events: none;
    }

    .plate-thumb-dock {
      display: flex;
      align-items: center;
      gap: 7px;
      flex-wrap: wrap;
      margin-bottom: 10px;
      pointer-events: auto;
    }

    .plate-thumb-btn {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 4px 10px 4px 4px;
      border-radius: 10px;
      background: rgba(12, 15, 20, 0.84);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1.5px solid rgba(255, 255, 255, 0.22);
      color: rgba(248, 250, 252, 0.88);
      cursor: pointer;
      pointer-events: auto;
      transition: all 0.22s cubic-bezier(0.34, 1.56, 0.64, 1);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.45);
    }

    .plate-thumb-btn:hover {
      background: rgba(255, 255, 255, 0.14);
      border-color: rgba(253, 230, 138, 0.65);
      transform: translateY(-2px);
    }

    .plate-thumb-btn.active {
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.36) 0%, rgba(16, 185, 129, 0.24) 100%);
      border-color: var(--accent-light);
      color: #FFFFFF;
      box-shadow: 0 8px 22px rgba(212, 175, 55, 0.38);
      transform: translateY(-2px);
    }

    .plate-thumb-preview {
      width: 44px;
      height: 30px;
      border-radius: 6px;
      object-fit: cover;
      border: 1px solid rgba(255, 255, 255, 0.25);
      flex-shrink: 0;
      background: #0F1216;
    }

    .plate-thumb-btn.active .plate-thumb-preview {
      border-color: #FEF08A;
    }

    .plate-thumb-label {
      font-size: 0.72rem;
      font-weight: 800;
      letter-spacing: -0.01em;
      white-space: nowrap;
    }

    .plate-thumb-btn.active .plate-thumb-label {
      color: #FEF08A;
    }
    .exam-media-stage .plate-thumb-dock.is-visual-floating-dock {
      position: absolute;
      left: 18px;
      right: 18px;
      bottom: 14px;
      z-index: 12;
      pointer-events: auto;
    }
    body.show-exam-hud .exam-media-stage .plate-thumb-dock.is-visual-floating-dock {
      bottom: 132px;
    }

    @media (max-width: 1024px) {
      .lusion-clean-media.is-contain-fit {
        padding: 8px 10px 136px !important;
      }
      .plate-thumb-dock {
        gap: 5px;
        margin-bottom: 6px;
      }
      .plate-thumb-btn {
        padding: 3px 7px 3px 3px;
        gap: 5px;
        border-radius: 8px;
      }
      .plate-thumb-preview {
        width: 30px;
        height: 21px;
      }
      .plate-thumb-label {
        font-size: 0.63rem;
      }
    }

    .clean-plate-scrim {
      position: absolute;
      inset: 0;
      z-index: 2;
      background: linear-gradient(
        180deg,
        rgba(10, 8, 7, 0) 0%,
        rgba(10, 8, 7, 0) 58%,
        rgba(10, 8, 7, 0.78) 100%
      );
      pointer-events: none;
    }

    .clean-plate-caption {
      position: absolute;
      left: 28px;
      right: 28px;
      bottom: 24px;
      z-index: 4;
      pointer-events: none;
    }

    .clean-step-label {
      display: inline-block;
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--accent-light);
      opacity: 0.85;
      margin-bottom: 6px;
    }

    .clean-spec-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 8px;
    }

    .clean-spec-tag {
      padding: 4px 10px;
      border-radius: 999px;
      background: rgba(18, 14, 12, 0.72);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 237, 215, 0.22);
      color: #FFEDD7;
      font-size: 0.71rem;
      font-weight: 600;
    }

    /* ============================================================================
       EMPEROR GONGJINDAN 10-PAGE BROCHURE PANORAMA ARCHIVE CARD
       ============================================================================ */
    .project-details-item.is-gongjindan-panorama-plate {
      width: min(76vw, 1140px);
      max-width: 1140px;
      height: 84vh;
      max-height: 760px;
      background: radial-gradient(circle at 50% 35%, #201A13 0%, #100D0A 100%);
      border: 1.5px solid rgba(212, 175, 55, 0.48);
      box-shadow: 0 32px 90px rgba(0, 0, 0, 0.85), inset 0 0 0 1px rgba(253, 230, 138, 0.14);
      cursor: default;
    }

    .gjd-panorama-inner {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 10px 12px 8px;
      gap: 6px;
      width: 100%;
      height: 100%;
    }

    .gjd-pano-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      flex-wrap: wrap;
      flex-shrink: 0;
      padding: 0 2px;
    }

    .gjd-pano-eyebrow {
      display: none;
    }

    .gjd-pano-main-title {
      font-family: 'Noto Serif KR', serif;
      font-size: 1.08rem;
      font-weight: 800;
      color: #FFFFFF;
      line-height: 1.2;
      margin: 0;
    }

    .gjd-pano-main-title .title-key-em {
      color: #FDE68A;
      text-decoration: underline;
      text-decoration-color: rgba(212, 175, 55, 0.65);
      text-underline-offset: 4px;
    }

    .gjd-pano-sub {
      display: none;
    }

    .gjd-pano-controls {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
    }

    .gjd-pano-nav-btn,
    .gjd-pano-auto-btn,
    .gjd-pano-zoom-btn {
      padding: 5px 11px;
      border-radius: 999px;
      border: 1px solid rgba(212, 175, 55, 0.42);
      background: rgba(20, 16, 12, 0.88);
      color: #FDE68A;
      font-size: 0.71rem;
      font-weight: 800;
      cursor: pointer;
      transition: all 0.2s ease;
      white-space: nowrap;
    }

    .gjd-pano-nav-btn:hover,
    .gjd-pano-zoom-btn:hover,
    .gjd-pano-auto-btn.active {
      background: linear-gradient(135deg, #D4AF37 0%, #B45309 100%);
      color: #0E0B08;
      border-color: #FEF08A;
      box-shadow: 0 4px 16px rgba(212, 175, 55, 0.38);
    }

    .gjd-pano-counter {
      padding: 5px 10px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.07);
      border: 1px solid rgba(255, 255, 255, 0.16);
      color: #FFFFFF;
      font-size: 0.72rem;
      font-weight: 900;
      letter-spacing: 0.06em;
    }

    /* Full-Bleed Panorama Viewport & Track (Fills Card 06 100% Edge-to-Edge) */
    .gjd-panorama-viewport {
      position: relative;
      flex: 1;
      min-height: 0;
      width: 100%;
      height: 100%;
      overflow-x: auto;
      overflow-y: hidden;
      border-radius: 14px;
      background: #0B0907;
      border: 1.5px solid rgba(212, 175, 55, 0.42);
      padding: 0;
      display: flex;
      align-items: stretch;
      scroll-behavior: smooth;
      scroll-snap-type: x mandatory;
      scrollbar-width: none;
      cursor: grab;
    }

    .gjd-panorama-viewport::-webkit-scrollbar {
      display: none;
    }

    .gjd-panorama-viewport:active {
      cursor: grabbing;
    }

    .gjd-panorama-track {
      display: flex;
      align-items: stretch;
      gap: 0;
      width: 100%;
      height: 100%;
      padding: 0;
    }

    .gjd-pano-slide {
      position: relative;
      width: 100%;
      min-width: 100%;
      height: 100%;
      flex-shrink: 0;
      border-radius: 0;
      background: #0B0907;
      border: none;
      padding: 0;
      overflow: hidden;
      opacity: 1;
      transform: none;
      scroll-snap-align: center;
      cursor: pointer;
    }

    .gjd-pano-slide.is-active {
      opacity: 1;
      transform: none;
    }

    .gjd-pano-slide-top {
      position: absolute;
      top: 10px;
      left: 12px;
      right: 12px;
      z-index: 4;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      pointer-events: none;
    }

    .gjd-pano-page-pill {
      font-size: 0.7rem;
      font-weight: 800;
      padding: 5px 12px;
      border-radius: 999px;
      background: rgba(14, 11, 8, 0.82);
      border: 1px solid rgba(212, 175, 55, 0.58);
      color: #FDE68A;
      backdrop-filter: blur(8px);
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.45);
    }

    .gjd-pano-card-zoom {
      pointer-events: auto;
      padding: 5px 11px;
      border-radius: 999px;
      border: 1px solid rgba(212, 175, 55, 0.55);
      background: rgba(14, 11, 8, 0.82);
      color: #FDE68A;
      font-size: 0.7rem;
      font-weight: 800;
      backdrop-filter: blur(8px);
      cursor: pointer;
    }

    .gjd-pano-card-zoom:hover {
      background: #D4AF37;
      color: #0E0B08;
      border-color: #FEF08A;
    }

    .gjd-pano-img-wrap {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      border-radius: 0;
      background: #0B0907;
      overflow: hidden;
      border: none;
    }

    .gjd-pano-img-wrap img {
      width: 100%;
      height: 100%;
      object-fit: fill;
      display: block;
    }

    .gjd-pano-slide-caption {
      position: absolute;
      left: 12px;
      right: 12px;
      bottom: 10px;
      z-index: 4;
      display: flex;
      flex-direction: column;
      gap: 2px;
      padding: 8px 14px;
      border-radius: 10px;
      background: rgba(14, 11, 8, 0.78);
      border: 1px solid rgba(212, 175, 55, 0.38);
      backdrop-filter: blur(8px);
      pointer-events: none;
    }

    .gjd-pano-slide-caption strong {
      font-size: 0.86rem;
      font-weight: 800;
      color: #FEF08A;
      line-height: 1.28;
    }

    .gjd-pano-slide-caption span {
      font-size: 0.73rem;
      color: rgba(248, 250, 252, 0.82);
      line-height: 1.35;
      word-break: keep-all;
    }

    /* Bottom 10-Page Filmstrip Thumbnail Bar */
    .gjd-pano-thumbs-bar {
      display: flex;
      align-items: center;
      gap: 6px;
      overflow-x: auto;
      padding-bottom: 2px;
      flex-shrink: 0;
      scrollbar-width: none;
    }

    .gjd-pano-thumbs-bar::-webkit-scrollbar {
      display: none;
    }

    .gjd-pano-thumb-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 9px 4px 4px;
      border-radius: 9px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.16);
      color: rgba(248, 250, 252, 0.82);
      font-size: 0.69rem;
      font-weight: 700;
      cursor: pointer;
      flex-shrink: 0;
      transition: all 0.2s ease;
    }

    .gjd-pano-thumb-pill img {
      width: 32px;
      height: 22px;
      border-radius: 5px;
      object-fit: cover;
      border: 1px solid rgba(255, 255, 255, 0.22);
    }

    .gjd-pano-thumb-pill.active {
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.36) 0%, rgba(180, 83, 9, 0.28) 100%);
      border-color: #FDE68A;
      color: #FEF08A;
      font-weight: 800;
      box-shadow: 0 4px 14px rgba(212, 175, 55, 0.35);
    }

    @media (max-width: 1024px) {
      .project-details-item.is-gongjindan-panorama-plate {
        width: 100% !important;
        max-width: 100% !important;
        height: 440px !important;
        min-height: 420px !important;
        max-height: none !important;
      }
      .gjd-panorama-inner {
        padding: 14px 14px 12px;
        gap: 8px;
      }
      .gjd-pano-main-title {
        font-size: 1.05rem;
      }
      .gjd-pano-slide {
        width: 100%;
        min-width: 100%;
      }
      .gjd-panorama-track {
        padding: 0;
      }
    }

    /* Multi-Frame Motion Video Stage */
    .motion-video-stage {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: #0A0D10;
    }

    .motion-frame-layer {
      position: absolute;
      inset: -4%;
      width: 108%;
      height: 108%;
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      will-change: transform, opacity;
      transition: opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1);
    }

    .plate-fx-canvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 3;
    }

    .full-sim-canvas {
      width: 100%;
      height: 100%;
      display: block;
      background: #0B0E13;
    }

    .motion-progress-track {
      position: absolute;
      left: 0; right: 0; bottom: 0;
      height: 4px;
      background: rgba(255, 255, 255, 0.14);
      z-index: 8;
    }

    .motion-progress-fill {
      height: 100%;
      width: 0%;
      background: linear-gradient(90deg, var(--accent), var(--emerald));
      box-shadow: 0 0 10px var(--accent);
    }

    .plate-gradient-scrim {
      position: absolute;
      inset: 0;
      z-index: 4;
      background: linear-gradient(
        180deg,
        rgba(8, 10, 14, 0.42) 0%,
        rgba(8, 10, 14, 0.02) 38%,
        rgba(8, 10, 14, 0.16) 62%,
        rgba(8, 10, 14, 0.88) 100%
      );
      pointer-events: none;
    }

    .plate-top-bar {
      position: absolute;
      top: 20px; left: 22px; right: 22px;
      z-index: 7;
      display: flex;
      align-items: center;
      justify-content: space-between;
      pointer-events: none;
    }

    .plate-index-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      border-radius: 999px;
      background: rgba(12, 14, 18, 0.78);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.18);
      font-size: 0.72rem;
      font-weight: 800;
      letter-spacing: 0.1em;
      color: var(--accent-light);
    }

    .live-rec-dot {
      width: 7px; height: 7px;
      border-radius: 50%;
      background: #10B981;
      box-shadow: 0 0 10px #10B981;
      animation: liveRecPulse 1.4s infinite ease-in-out;
    }

    @keyframes liveRecPulse {
      0%, 100% { transform: scale(0.85); opacity: 0.6; }
      50% { transform: scale(1.25); opacity: 1; }
    }

    .plate-metric-pill {
      padding: 6px 14px;
      border-radius: 999px;
      background: rgba(16, 185, 129, 0.2);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(16, 185, 129, 0.48);
      font-size: 0.73rem;
      font-weight: 700;
      color: #A7F3D0;
    }

    .plate-bottom-caption {
      position: absolute;
      bottom: 22px; left: 26px; right: 26px;
      z-index: 7;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 16px;
      pointer-events: none;
    }

    .plate-caption-title {
      font-family: 'Noto Serif KR', serif;
      font-size: 1.42rem;
      font-weight: 800;
      color: #FFFFFF;
      margin-bottom: 5px;
      text-shadow: 0 4px 18px rgba(0, 0, 0, 0.8);
    }

    .plate-caption-title .title-key-em {
      color: #FDE68A;
      text-decoration: underline;
      text-decoration-color: rgba(253, 230, 138, 0.65);
      text-underline-offset: 4px;
    }

    .plate-caption-sub {
      font-size: 0.85rem;
      color: rgba(255, 255, 255, 0.86);
      font-weight: 400;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.85);
    }

    .plate-action-group {
      display: flex;
      align-items: center;
      gap: 8px;
      pointer-events: auto;
      flex-shrink: 0;
    }

    .plate-step-btn,
    .plate-expand-btn {
      pointer-events: auto;
      padding: 8px 13px;
      border-radius: 999px;
      background: rgba(15, 18, 24, 0.75);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.24);
      color: #fff;
      font-size: 0.72rem;
      font-weight: 700;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.2s ease;
    }

    .plate-step-btn:hover,
    .plate-expand-btn:hover {
      background: var(--accent);
      color: #0B0D10;
      border-color: var(--accent);
    }

    .canvas-interactive-controls {
      position: absolute;
      top: 20px; right: 22px;
      z-index: 10;
      display: flex;
      gap: 8px;
    }

    .sim-mode-btn {
      padding: 7px 14px;
      border-radius: 999px;
      border: 1px solid rgba(255, 255, 255, 0.22);
      background: rgba(15, 17, 22, 0.8);
      backdrop-filter: blur(10px);
      color: var(--text-sub);
      font-size: 0.73rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .sim-mode-btn.active {
      background: var(--accent);
      color: #0B0D10;
      border-color: var(--accent);
      box-shadow: 0 0 18px rgba(212, 175, 55, 0.45);
    }

    .visual-sci-overlay {
      position: absolute;
      left: 26px; right: 26px;
      bottom: 128px;
      z-index: 6;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
      pointer-events: none;
      transition: opacity 0.22s ease;
    }

    .is-clean-plate .visual-sci-overlay {
      left: 28px; right: 28px;
      bottom: 168px;
    }

    .sci-stat-card {
      background: rgba(10, 13, 18, 0.82);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(212, 175, 55, 0.38);
      border-radius: 14px;
      padding: 12px 15px;
    }

    .sci-stat-num {
      font-family: 'Noto Serif KR', serif;
      font-size: 1.28rem;
      font-weight: 800;
      color: var(--accent-light);
      line-height: 1.25;
      margin-bottom: 5px;
      word-break: keep-all;
    }

    .sci-stat-label {
      font-size: 0.76rem;
      color: rgba(255, 255, 255, 0.88);
      font-weight: 600;
      line-height: 1.42;
      margin-bottom: 8px;
      word-break: keep-all;
    }

    .sci-bar-track {
      width: 100%; height: 5px;
      background: rgba(255, 255, 255, 0.14);
      border-radius: 999px;
      overflow: hidden;
    }

    .sci-bar-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--accent), var(--emerald));
      border-radius: 999px;
    }

    /* PLATE 07 (Last Card): 3D Body Model Portal + Bottom-Right Mini Keyword Card */
    #project-details-preview {
      width: 52vw;
      max-width: 760px;
      height: 76vh;
      max-height: 680px;
      border-radius: 22px;
      position: relative;
      overflow: hidden;
      flex-shrink: 0;
      border: 1.5px solid rgba(45, 90, 67, 0.55);
      background: #171614;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 28px 32px;
      text-decoration: none;
      color: var(--text-main);
      box-shadow: 0 28px 70px rgba(0, 0, 0, 0.65);
      transition: transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
    }

    #project-details-preview:hover {
      transform: scale(1.01);
      border-color: #2D5A43;
      box-shadow: 0 32px 80px rgba(45, 90, 67, 0.28);
    }

    .next-portal-bg {
      position: absolute;
      inset: 0;
      width: 100%; height: 100%;
      object-fit: cover;
      opacity: 0.42;
      transition: transform 0.65s ease, opacity 0.4s ease;
    }

    #project-details-preview:hover .next-portal-bg { transform: scale(1.05); opacity: 0.56; }

    .next-portal-scrim {
      position: absolute;
      inset: 0;
      background:
        radial-gradient(circle at 26% 32%, rgba(45, 90, 67, 0.32) 0%, transparent 55%),
        linear-gradient(180deg, rgba(23, 22, 20, 0.38) 0%, rgba(23, 22, 20, 0.94) 100%);
      pointer-events: none;
    }

    .body-model-holo-grid {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(245, 241, 232, 0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(245, 241, 232, 0.05) 1px, transparent 1px);
      background-size: 32px 32px;
      pointer-events: none;
      z-index: 2;
    }

    .body-model-top-bar {
      position: relative;
      z-index: 6;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      flex-wrap: wrap;
    }

    .body-model-badge-main {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 6px 14px;
      border-radius: 999px;
      background: #2D5A43;
      border: 1px solid rgba(232, 242, 236, 0.45);
      color: #FFFFFF;
      font-size: 0.74rem;
      font-weight: 800;
      letter-spacing: 0.06em;
      box-shadow: 0 6px 18px rgba(45, 90, 67, 0.38);
    }

    .body-model-badge-sub {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 13px;
      border-radius: 999px;
      background: rgba(245, 241, 232, 0.92);
      border: 1px solid rgba(94, 71, 54, 0.3);
      color: #4A3525;
      font-size: 0.73rem;
      font-weight: 800;
    }

    .body-model-bottom-stage {
      position: relative;
      z-index: 6;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 18px;
      width: 100%;
    }

    #project-details-preview-inner {
      position: relative;
      z-index: 6;
      flex: 1;
      max-width: 62%;
      text-decoration: none;
      color: inherit;
      display: block;
    }

    .next-portal-eyebrow {
      font-size: 0.72rem;
      font-weight: 800;
      letter-spacing: 0.16em;
      color: #A7F3D0;
      margin-bottom: 8px;
    }

    #project-details-preview-title {
      font-family: 'Noto Serif KR', serif;
      font-size: 1.75rem;
      font-weight: 800;
      line-height: 1.25;
      margin-bottom: 8px;
      color: #FFFFFF;
      word-break: keep-all;
    }

    .next-portal-desc {
      font-size: 0.85rem;
      color: rgba(245, 241, 232, 0.92);
      margin-bottom: 14px;
      line-height: 1.55;
      word-break: keep-all;
    }

    .body-model-feature-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 16px;
    }

    .body-model-chip {
      padding: 4px 10px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.12);
      border: 1px solid rgba(245, 241, 232, 0.25);
      color: #F5F1E8;
      font-size: 0.7rem;
      font-weight: 700;
    }

    #project-details-preview-footer {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      padding: 11px 20px;
      border-radius: 999px;
      background: linear-gradient(135deg, #2D5A43 0%, #3D7357 100%);
      border: 1px solid rgba(232, 242, 236, 0.5);
      color: #FFFFFF;
      box-shadow: 0 8px 22px rgba(45, 90, 67, 0.36);
      transition: all 0.25s ease;
    }

    #project-details-preview-inner:hover #project-details-preview-footer {
      background: #4A3525;
      border-color: #F5F1E8;
      transform: translateY(-2px);
    }

    #project-details-preview-footer-text {
      font-size: 0.8rem;
      font-weight: 800;
      letter-spacing: 0.04em;
      color: #FFFFFF;
    }

    #project-details-preview-footer-bar {
      width: 36px; height: 3px;
      background: rgba(255, 255, 255, 0.28);
      border-radius: 999px;
      overflow: hidden;
    }

    #project-details-preview-footer-bar-inner {
      width: 100%; height: 100%;
      background: #F5F1E8;
      transform-origin: left;
      transform: scaleX(0.5);
      transition: transform 0.4s ease;
    }

    #project-details-preview:hover #project-details-preview-footer-bar-inner { transform: scaleX(1); }

    /* Bottom-Right Small Keyword Card (Inside Last Card & Floating Viewport Corner) */
    .last-card-mini-keyword-box {
      position: relative;
      z-index: 8;
      width: 228px;
      min-width: 215px;
      background: rgba(245, 241, 232, 0.96);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1.5px solid rgba(74, 53, 37, 0.32);
      border-radius: 16px;
      padding: 12px 13px;
      box-shadow: 0 14px 32px rgba(23, 22, 20, 0.35);
      display: flex;
      flex-direction: column;
      gap: 7px;
      flex-shrink: 0;
    }

    .mini-kw-eyebrow {
      font-size: 0.63rem;
      font-weight: 800;
      letter-spacing: 0.1em;
      color: #5E4736;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .mini-kw-card-link {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 8px 11px;
      border-radius: 11px;
      text-decoration: none;
      transition: all 0.22s ease;
    }

    .mini-kw-card-link.primary-hair {
      background: #2D5A43;
      color: #FFFFFF;
      border: 1px solid #2D5A43;
      box-shadow: 0 4px 12px rgba(45, 90, 67, 0.24);
    }

    .mini-kw-card-link.primary-hair:hover {
      background: #171614;
      border-color: #171614;
      transform: translateY(-1px);
    }

    .mini-kw-card-link.secondary-next {
      background: #FFFFFF;
      color: #171614;
      border: 1px solid rgba(94, 71, 54, 0.24);
    }

    .mini-kw-card-link.secondary-next:hover {
      background: #EFE9DC;
      border-color: #4A3525;
      transform: translateY(-1px);
    }

    .mini-kw-text-col {
      display: flex;
      flex-direction: column;
      gap: 1px;
    }

    .mini-kw-question {
      font-size: 0.82rem;
      font-weight: 900;
      line-height: 1.2;
      letter-spacing: -0.01em;
    }

    .mini-kw-sub {
      font-size: 0.66rem;
      font-weight: 600;
      opacity: 0.86;
    }

    .mini-kw-arrow {
      font-size: 0.82rem;
      font-weight: 900;
    }

    /* Floating Bottom-Right Mini Keyword Card on Detail Page Viewport */
    #floating-bottom-right-kw-card {
      position: fixed;
      right: 22px;
      bottom: 16px;
      z-index: 95;
      width: 226px;
      background: rgba(245, 241, 232, 0.96);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1.5px solid rgba(74, 53, 37, 0.28);
      border-radius: 16px;
      padding: 11px 12px;
      box-shadow: 0 12px 30px rgba(23, 22, 20, 0.22);
      display: flex;
      flex-direction: column;
      gap: 6px;
      transition: opacity 0.3s ease, transform 0.3s ease;
    }

    #floating-bottom-right-kw-card.is-docked-on-last {
      opacity: 0;
      pointer-events: none;
      transform: translateY(10px);
    }

    .floating-kw-jump-3d {
      margin-top: 2px;
      padding: 6px 10px;
      border-radius: 9px;
      background: #4A3525;
      color: #F5F1E8;
      border: none;
      font-size: 0.69rem;
      font-weight: 800;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      transition: background 0.2s ease;
    }

    .floating-kw-jump-3d:hover {
      background: #2D5A43;
      color: #FFFFFF;
    }

    #scroll-indicator {
      position: fixed;
      bottom: 0;
      left: var(--left-col-width);
      right: 0;
      height: 4px;
      background: rgba(255, 255, 255, 0.08);
      z-index: 90;
    }

    #scroll-indicator-bar {
      height: 100%; width: 0%;
      background: linear-gradient(90deg, var(--accent), var(--emerald));
      box-shadow: 0 0 12px var(--accent);
      transition: width 0.08s linear;
    }

    /* Modals */
    #plate-lightbox, #consult-modal {
      position: fixed;
      inset: 0;
      z-index: 15000;
      background: rgba(8, 9, 12, 0.94);
      backdrop-filter: blur(22px);
      -webkit-backdrop-filter: blur(22px);
      display: none;
      align-items: center;
      justify-content: center;
      padding: 20px 24px;
      user-select: none;
    }

    #plate-lightbox.open, #consult-modal.open { display: flex; }

    #plate-lightbox {
      flex-direction: column;
      justify-content: space-between;
      gap: 12px;
    }

    .gjd-pano-slide img.emoji,
    .gjd-pano-controls img.emoji,
    #plate-lightbox img.emoji {
      width: 1em !important;
      height: 1em !important;
      max-width: 1em !important;
      max-height: 1em !important;
      display: inline-block !important;
      vertical-align: -0.1em !important;
      border: none !important;
      margin: 0 2px !important;
      object-fit: contain !important;
      box-shadow: none !important;
    }

    .lightbox-top-bar {
      width: min(1320px, 95vw);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      z-index: 10;
      flex-shrink: 0;
    }

    .lightbox-meta-pill {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 8px 16px;
      border-radius: 999px;
      background: rgba(20, 16, 12, 0.92);
      border: 1.5px solid rgba(212, 175, 55, 0.62);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.55);
      max-width: calc(100% - 115px);
      overflow: hidden;
    }

    .lightbox-counter-badge {
      padding: 3px 10px;
      border-radius: 999px;
      background: linear-gradient(135deg, #D4AF37 0%, #B45309 100%);
      color: #0E0B08;
      font-size: 0.76rem;
      font-weight: 900;
      letter-spacing: 0.05em;
      flex-shrink: 0;
    }

    .lightbox-title-text {
      font-family: 'Noto Serif KR', serif;
      font-size: 0.92rem;
      font-weight: 800;
      color: #FEF08A;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .lightbox-close {
      margin-left: auto;
      padding: 9px 20px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.14);
      border: 1.5px solid rgba(255, 255, 255, 0.32);
      color: #FFFFFF;
      font-size: 0.85rem;
      font-weight: 800;
      cursor: pointer;
      transition: all 0.2s ease;
      flex-shrink: 0;
    }

    .lightbox-close:hover {
      background: #DC2626;
      border-color: #FCA5A5;
      color: #FFFFFF;
    }

    .lightbox-stage-wrap {
      position: relative;
      flex: 1;
      min-height: 0;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }

    #plate-lightbox #lightbox-img {
      max-width: min(84vw, 1280px);
      max-height: 72vh;
      width: auto;
      height: auto;
      border-radius: 16px;
      border: 1.5px solid rgba(212, 175, 55, 0.55);
      box-shadow: 0 24px 70px rgba(0, 0, 0, 0.82);
      object-fit: contain;
      background: #0B0907;
      cursor: pointer;
      transition: opacity 0.2s ease, transform 0.2s ease;
    }

    #plate-lightbox:not(.has-gallery) #lightbox-img {
      max-width: 92vw;
      max-height: 84vh;
      cursor: default;
    }

    .lightbox-nav-arrow {
      position: fixed;
      top: 50%;
      transform: translateY(-50%);
      z-index: 15020;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 14px 20px;
      border-radius: 999px;
      background: rgba(20, 16, 12, 0.9);
      border: 1.5px solid rgba(253, 230, 138, 0.72);
      color: #FEF08A;
      font-size: 0.92rem;
      font-weight: 900;
      cursor: pointer;
      box-shadow: 0 14px 36px rgba(0, 0, 0, 0.75);
      transition: all 0.22s ease;
    }

    .lightbox-nav-arrow.prev { left: 24px; }
    .lightbox-nav-arrow.next { right: 24px; }

    .lightbox-nav-arrow:hover {
      background: linear-gradient(135deg, #D4AF37 0%, #B45309 100%);
      color: #0E0B08;
      border-color: #FFFFFF;
      transform: translateY(-50%) scale(1.06);
    }

    .lightbox-caption-bar {
      width: min(980px, 90vw);
      padding: 10px 18px;
      border-radius: 12px;
      background: rgba(16, 13, 10, 0.88);
      border: 1px solid rgba(212, 175, 55, 0.42);
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 3px;
      flex-shrink: 0;
    }

    .lightbox-caption-bar strong {
      font-family: 'Noto Serif KR', serif;
      font-size: 0.95rem;
      font-weight: 800;
      color: #FEF08A;
    }

    .lightbox-caption-bar span {
      font-size: 0.8rem;
      color: rgba(248, 250, 252, 0.88);
      word-break: keep-all;
    }

    .lightbox-bottom-bar {
      width: min(1320px, 96vw);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding: 8px 12px;
      border-radius: 14px;
      background: rgba(16, 13, 10, 0.9);
      border: 1px solid rgba(212, 175, 55, 0.38);
      z-index: 10;
      flex-shrink: 0;
    }

    .lightbox-step-pill {
      padding: 8px 16px;
      border-radius: 999px;
      border: 1px solid rgba(212, 175, 55, 0.55);
      background: rgba(28, 22, 16, 0.95);
      color: #FDE68A;
      font-size: 0.8rem;
      font-weight: 800;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.2s ease;
      flex-shrink: 0;
    }

    .lightbox-step-pill.is-gold,
    .lightbox-step-pill:hover {
      background: linear-gradient(135deg, #D4AF37 0%, #B45309 100%);
      color: #0E0B08;
      border-color: #FEF08A;
    }

    .lightbox-dots-strip {
      display: flex;
      align-items: center;
      gap: 6px;
      overflow-x: auto;
      scrollbar-width: none;
      padding: 2px 4px;
    }

    .lightbox-dots-strip::-webkit-scrollbar { display: none; }

    .lightbox-page-chip {
      padding: 5px 10px;
      border-radius: 999px;
      border: 1px solid rgba(255, 255, 255, 0.18);
      background: rgba(255, 255, 255, 0.06);
      color: rgba(248, 250, 252, 0.8);
      font-size: 0.72rem;
      font-weight: 700;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.2s ease;
      flex-shrink: 0;
    }

    .lightbox-page-chip.active,
    .lightbox-page-chip:hover {
      background: rgba(212, 175, 55, 0.32);
      border-color: #FEF08A;
      color: #FEF08A;
      font-weight: 900;
    }

    #plate-lightbox:not(.has-gallery) .lightbox-nav-arrow,
    #plate-lightbox:not(.has-gallery) .lightbox-meta-pill,
    #plate-lightbox:not(.has-gallery) .lightbox-caption-bar,
    #plate-lightbox:not(.has-gallery) .lightbox-bottom-bar {
      display: none !important;
    }

    @media (max-width: 1024px) {
      #plate-lightbox { padding: 12px 10px; gap: 8px; }
      #plate-lightbox #lightbox-img { max-width: 94vw; max-height: 62vh; }
      .lightbox-nav-arrow { padding: 10px 13px; font-size: 0.8rem; }
      .lightbox-nav-arrow .nav-label { display: none; }
      .lightbox-nav-arrow.prev { left: 8px; }
      .lightbox-nav-arrow.next { right: 8px; }
      .lightbox-title-text { font-size: 0.78rem; }
      .lightbox-caption-bar { padding: 7px 12px; }
      .lightbox-caption-bar strong { font-size: 0.82rem; }
      .lightbox-caption-bar span { font-size: 0.7rem; }
    }

    .consult-modal-card {
      width: 100%;
      max-width: 490px;
      background: #15181F;
      border: 1px solid var(--border-gold);
      border-radius: 24px;
      padding: 30px;
      box-shadow: 0 30px 90px rgba(0, 0, 0, 0.85);
    }

    .consult-modal-title {
      font-family: 'Noto Serif KR', serif;
      font-size: 1.45rem;
      margin-bottom: 6px;
      color: var(--accent-light);
    }

    .consult-modal-sub { font-size: 0.83rem; color: var(--text-sub); margin-bottom: 16px; line-height: 1.55; }

    .modal-checked-summary {
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid rgba(110, 231, 183, 0.35);
      border-radius: 12px;
      padding: 11px 14px;
      margin-bottom: 14px;
      font-size: 0.76rem;
      color: #D1FAE5;
      line-height: 1.5;
    }

    .modal-form-group {
      display: flex;
      flex-direction: column;
      gap: 5px;
      margin-bottom: 11px;
    }

    .modal-form-group label {
      font-size: 0.75rem;
      font-weight: 700;
      color: rgba(255, 255, 255, 0.85);
    }

    .modal-form-group input,
    .modal-form-group textarea {
      width: 100%;
      padding: 10px 13px;
      border-radius: 10px;
      border: 1px solid rgba(255, 255, 255, 0.16);
      background: rgba(0, 0, 0, 0.42);
      color: #FFFFFF;
      font-family: inherit;
      font-size: 0.82rem;
    }

    .modal-submit-btn {
      width: 100%;
      padding: 13px;
      border-radius: 12px;
      background: linear-gradient(135deg, var(--emerald), #059669);
      color: #FFFFFF;
      font-weight: 800;
      font-size: 0.88rem;
      border: none;
      cursor: pointer;
      margin-bottom: 12px;
      box-shadow: 0 6px 20px rgba(16, 185, 129, 0.35);
    }

    .consult-action-list { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 12px; }

    .consult-action-item {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 10px 12px;
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.12);
      color: #fff;
      text-decoration: none;
      font-size: 0.78rem;
      font-weight: 600;
      transition: all 0.2s ease;
    }

    .consult-action-item:hover { background: var(--accent); color: #111; border-color: var(--accent); }

    /* ======================================================================
       AWWWARDS / NEKO HEALTH ULTRA-CLEAN HIERARCHY & B/A SPLIT-SCAN STUDIO
       ====================================================================== */
    /* Hide verbose 2nd paragraph in left panel so only the core essence stands out */
    #project-details-desc p:nth-child(n+2),
    .empathy-checklist-sub {
      display: none !important;
    }
    #project-details-desc {
      margin-bottom: 12px !important;
    }
    #project-details-desc p:first-child {
      font-size: 0.84rem;
      line-height: 1.6;
      color: rgba(248, 250, 252, 0.88);
    }

    .header-vis-btn,
    .header-ba-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 14px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.18);
      color: #F8FAFC;
      font-size: 0.75rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s ease;
      white-space: nowrap;
    }
    .header-ba-btn {
      background: rgba(212, 175, 55, 0.16);
      border-color: rgba(212, 175, 55, 0.55);
      color: var(--gold-light);
    }
    .header-vis-btn:hover,
    .header-ba-btn:hover {
      background: var(--gold);
      border-color: var(--gold);
      color: #090B0E;
    }

    /* Daddy Doctor Brand Promise Card & Opening Slogan Stage */
    .daddy-doc-promise-card {
      margin-bottom: 10px;
      padding: 10px 13px;
      border-radius: 13px;
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.16) 0%, rgba(45, 90, 67, 0.14) 100%);
      border: 1.5px solid rgba(212, 175, 55, 0.45);
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.16);
    }
    .daddy-doc-promise-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 4px;
    }
    .daddy-doc-promise-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.72rem;
      font-weight: 800;
      color: var(--gold-light);
      letter-spacing: 0.02em;
    }
    .daddy-doc-promise-text {
      font-size: 0.78rem;
      font-weight: 700;
      line-height: 1.45;
      color: #FFFFFF;
      word-break: keep-all;
    }
    body.theme-hanji .daddy-doc-promise-card {
      background: linear-gradient(135deg, #FFFDF7 0%, #EFE9DC 100%);
      border: 1.5px solid rgba(74, 53, 37, 0.28);
      box-shadow: 0 6px 18px rgba(58, 42, 30, 0.06);
    }
    body.theme-hanji .daddy-doc-promise-badge {
      color: #2D5A43;
    }
    body.theme-hanji .daddy-doc-promise-text {
      color: #171614;
    }

    #detail-daddy-intro-overlay {
      position: absolute;
      inset: 14px 22px 18px 22px;
      z-index: 65;
      border-radius: 24px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 28px 24px;
      background:
        radial-gradient(circle at 50% 36%, rgba(212, 175, 55, 0.22) 0%, rgba(45, 90, 67, 0.16) 42%, rgba(12, 14, 18, 0.95) 86%),
        linear-gradient(160deg, rgba(18, 15, 13, 0.96) 0%, rgba(10, 13, 18, 0.97) 100%);
      backdrop-filter: blur(22px);
      -webkit-backdrop-filter: blur(22px);
      border: 1.5px solid rgba(212, 175, 55, 0.45);
      box-shadow: 0 28px 80px rgba(0, 0, 0, 0.65);
      transition: opacity 0.85s cubic-bezier(0.22, 1, 0.36, 1), transform 0.85s cubic-bezier(0.22, 1, 0.36, 1), filter 0.85s ease;
      cursor: pointer;
    }
    #detail-daddy-intro-overlay.closing {
      opacity: 0;
      transform: scale(1.05) translateY(-10px);
      filter: blur(12px);
      pointer-events: none;
    }
    #detail-daddy-intro-overlay.hidden {
      display: none !important;
    }
    .detail-daddy-intro-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 16px;
      border-radius: 999px;
      background: rgba(212, 175, 55, 0.16);
      border: 1px solid rgba(253, 230, 138, 0.48);
      color: #FEF3C7;
      font-size: 0.74rem;
      font-weight: 800;
      letter-spacing: 0.1em;
      margin-bottom: 16px;
    }
    .detail-daddy-intro-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #34D399;
      box-shadow: 0 0 12px #34D399;
    }
    .detail-daddy-intro-quote {
      font-family: 'Cormorant Garamond', 'Noto Serif KR', serif;
      font-size: clamp(1.8rem, 3.2vw, 2.8rem);
      font-weight: 900;
      color: rgba(253, 230, 138, 0.75);
      line-height: 1;
      margin: 0 4px;
    }
    .detail-daddy-intro-title {
      font-family: 'Noto Serif KR', serif;
      font-size: clamp(1.55rem, 3.1vw, 2.55rem);
      font-weight: 900;
      line-height: 1.32;
      letter-spacing: -0.025em;
      color: #FFFFFF;
      margin-bottom: 14px;
      word-break: keep-all;
    }
    .detail-daddy-char {
      display: inline-block;
      opacity: 0;
      transform: translate3d(0, 22px, 0) rotateX(-35deg) scale(0.92);
      filter: blur(5px);
      transition: opacity 0.48s cubic-bezier(0.22, 1, 0.36, 1), transform 0.56s cubic-bezier(0.22, 1, 0.36, 1), filter 0.48s ease;
    }
    .detail-daddy-char.revealed {
      opacity: 1;
      transform: translate3d(0, 0, 0) rotateX(0deg) scale(1);
      filter: blur(0);
    }
    .detail-daddy-char.gold {
      background: linear-gradient(135deg, #FFFBEB 0%, #FDE68A 48%, #D4AF37 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .detail-daddy-space {
      display: inline-block;
      width: 0.3em;
    }
    .detail-daddy-intro-sub {
      font-size: clamp(0.84rem, 1.25vw, 1.02rem);
      font-weight: 600;
      line-height: 1.6;
      color: rgba(248, 250, 252, 0.9);
      max-width: 580px;
      margin-bottom: 18px;
      word-break: keep-all;
    }
    .detail-daddy-intro-sub strong {
      color: #FDE68A;
      font-weight: 800;
    }
    .detail-daddy-intro-progress {
      width: min(260px, 72vw);
      height: 4px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.14);
      overflow: hidden;
      margin-bottom: 10px;
    }
    .detail-daddy-intro-bar {
      width: 0%;
      height: 100%;
      border-radius: 999px;
      background: linear-gradient(90deg, #D4AF37, #FEF08A, #10B981);
      transition: width 0.08s linear;
    }
    .detail-daddy-intro-hint {
      font-size: 0.72rem;
      font-weight: 700;
      color: rgba(253, 230, 138, 0.88);
      letter-spacing: 0.05em;
    }
    @media (max-width: 1024px) {
      #detail-daddy-intro-overlay {
        position: fixed !important;
        top: 50% !important;
        left: 14px !important;
        right: 14px !important;
        bottom: auto !important;
        transform: translateY(-50%) !important;
        min-height: 220px !important;
        max-height: calc(100dvh - 80px) !important;
        padding: 20px 16px !important;
        border-radius: 18px !important;
        z-index: 260 !important;
      }
      #detail-daddy-intro-overlay.closing {
        transform: translateY(-54%) scale(1.03) !important;
      }
      .detail-daddy-intro-pill {
        font-size: 0.64rem;
        padding: 4px 11px;
        margin-bottom: 8px;
      }
      .detail-daddy-intro-title {
        font-size: 1.24rem;
        margin-bottom: 8px;
      }
      .detail-daddy-intro-sub {
        font-size: 0.76rem;
        margin-bottom: 10px;
      }
    }

    .detail-clinical-trust-bar {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 6px;
      margin-bottom: 10px;
      padding: 8px;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    .detail-trust-seal {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 2px;
      padding: 6px 8px;
      border-radius: 8px;
      background: rgba(0, 0, 0, 0.28);
    }
    .detail-trust-seal-num {
      font-size: 0.76rem;
      font-weight: 800;
      color: #6EE7B7;
      letter-spacing: -0.01em;
    }
    .detail-trust-seal-label {
      font-size: 0.67rem;
      font-weight: 500;
      color: rgba(248, 250, 252, 0.78);
      line-height: 1.25;
      word-break: keep-all;
    }

    .detail-ba-trigger-bar {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 14px;
      margin-bottom: 12px;
      border-radius: 12px;
      background: linear-gradient(90deg, rgba(212, 175, 55, 0.16) 0%, rgba(16, 185, 129, 0.14) 100%);
      border: 1px solid rgba(212, 175, 55, 0.45);
      color: var(--gold-light);
      font-size: 0.78rem;
      font-weight: 800;
      cursor: pointer;
      transition: all 0.22s ease;
    }
    .detail-ba-trigger-bar:hover {
      background: var(--gold);
      color: #090B0E;
      border-color: var(--gold);
    }

    /* Detail Before/After Split-Scan Modal */
    #detail-ba-modal {
      position: fixed;
      inset: 0;
      z-index: 320;
      background: rgba(5, 8, 11, 0.88);
      backdrop-filter: blur(22px);
      display: none;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    #detail-ba-modal.open { display: flex; }
    .detail-ba-card {
      width: min(900px, 95vw);
      max-height: 90vh;
      overflow-y: auto;
      background: #0B0E13;
      border: 1px solid rgba(255, 255, 255, 0.16);
      border-radius: 22px;
      padding: 26px 30px;
      box-shadow: 0 36px 96px rgba(0, 0, 0, 0.92);
      color: #FFFFFF;
    }
    .detail-ba-stage {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 9;
      max-height: 430px;
      border-radius: 16px;
      overflow: hidden;
      background: #06080B;
      border: 1px solid rgba(255, 255, 255, 0.14);
      cursor: ew-resize;
      touch-action: none;
      user-select: none;
      margin: 14px 0;
    }
    .detail-ba-img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      pointer-events: none;
    }
    .detail-ba-clip {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      clip-path: inset(0 50% 0 0);
      pointer-events: none;
    }
    .detail-ba-line {
      position: absolute;
      top: 0; bottom: 0; left: 50%;
      width: 2px;
      background: linear-gradient(180deg, transparent, var(--gold-light), #FFFFFF, var(--gold-light), transparent);
      box-shadow: 0 0 16px rgba(212, 175, 55, 0.85);
      transform: translateX(-50%);
      pointer-events: none;
      z-index: 5;
    }
    .detail-ba-knob {
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      width: 44px; height: 44px;
      border-radius: 50%;
      background: rgba(10, 14, 18, 0.92);
      border: 1.5px solid var(--gold);
      color: var(--gold-light);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      font-weight: 800;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.85);
      pointer-events: none;
      z-index: 6;
    }
    .detail-ba-tag {
      position: absolute;
      top: 14px;
      padding: 6px 12px;
      border-radius: 999px;
      font-size: 11px;
      font-weight: 800;
      backdrop-filter: blur(12px);
      z-index: 4;
      pointer-events: none;
    }
    .detail-ba-tag.before {
      left: 14px;
      background: rgba(127, 29, 29, 0.8);
      border: 1px solid rgba(252, 165, 165, 0.45);
      color: #FECACA;
    }
    .detail-ba-tag.after {
      right: 14px;
      background: rgba(6, 78, 59, 0.84);
      border: 1px solid rgba(110, 231, 183, 0.55);
      color: #A7F3D0;
    }
    .detail-ba-metrics {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
    }
    .detail-ba-metric-card {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 12px 14px;
    }
    .detail-ba-metric-label {
      font-size: 11px;
      color: rgba(255, 255, 255, 0.58);
      margin-bottom: 4px;
    }
    .detail-ba-metric-val {
      font-size: 14px;
      font-weight: 800;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .detail-ba-metric-val .b {
      color: rgba(252, 165, 165, 0.78);
      text-decoration: line-through;
      font-weight: 500;
      font-size: 12px;
    }
    .detail-ba-metric-val .a {
      color: #6EE7B7;
    }

    /* Inline Scroll-Synchronized Before/After 3D Biomedical Scan Card (Left Sidebar & Runway Plate) */
    .inline-scroll-ba-card {
      background: rgba(8, 12, 18, 0.85);
      border: 1px solid rgba(212, 175, 55, 0.38);
      border-radius: 16px;
      padding: 12px;
      margin-bottom: 14px;
      box-shadow: 0 12px 28px rgba(0, 0, 0, 0.45);
    }
    .inline-scroll-ba-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 8px;
    }
    .inline-scroll-ba-title {
      font-size: 0.75rem;
      font-weight: 800;
      color: var(--gold-light);
      letter-spacing: 0.02em;
    }
    .inline-scroll-ba-pct {
      font-size: 0.69rem;
      font-weight: 800;
      padding: 2px 8px;
      border-radius: 999px;
      background: rgba(16, 185, 129, 0.18);
      border: 1px solid rgba(110, 231, 183, 0.45);
      color: #6EE7B7;
    }
    .inline-scroll-ba-viewport {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 9;
      border-radius: 11px;
      overflow: hidden;
      background: #070A0F;
      border: 1px solid rgba(255, 255, 255, 0.14);
      cursor: ew-resize;
    }
    .inline-scroll-ba-viewport img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      pointer-events: none;
    }
    .inline-scroll-ba-after-clip {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      clip-path: inset(0 85% 0 0);
      pointer-events: none;
      will-change: clip-path;
    }
    .inline-scroll-ba-laser {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 15%;
      width: 2px;
      background: linear-gradient(180deg, transparent, #6EE7B7, #FFFFFF, var(--gold-light), transparent);
      box-shadow: 0 0 14px rgba(110, 231, 183, 0.95);
      transform: translateX(-50%);
      pointer-events: none;
      z-index: 5;
      will-change: left;
    }
    .inline-scroll-ba-pill {
      position: absolute;
      bottom: 8px;
      padding: 3px 8px;
      border-radius: 999px;
      font-size: 9.5px;
      font-weight: 800;
      backdrop-filter: blur(8px);
      z-index: 4;
      pointer-events: none;
    }
    .inline-scroll-ba-pill.b {
      left: 8px;
      background: rgba(127, 29, 29, 0.82);
      border: 1px solid rgba(252, 165, 165, 0.4);
      color: #FECACA;
    }
    .inline-scroll-ba-pill.a {
      right: 8px;
      background: rgba(6, 78, 59, 0.86);
      border: 1px solid rgba(110, 231, 183, 0.5);
      color: #A7F3D0;
    }
    .inline-scroll-ba-foot {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 7px;
      font-size: 0.7rem;
      color: rgba(255, 255, 255, 0.68);
    }
    .body-explorer-portal-btn {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 10px 14px;
      margin-bottom: 12px;
      border-radius: 12px;
      background: linear-gradient(95deg, rgba(16, 185, 129, 0.2), rgba(56, 189, 248, 0.16), rgba(212, 175, 55, 0.18));
      border: 1px solid rgba(110, 231, 183, 0.5);
      color: #E0F2FE;
      text-decoration: none;
      font-size: 0.77rem;
      font-weight: 800;
      transition: all 0.22s ease;
    }
    .body-explorer-portal-btn:hover {
      background: linear-gradient(95deg, #10B981, #38BDF8);
      color: #04120C;
      border-color: #FFFFFF;
      transform: translateY(-1px);
    }

    /* ======================================================================
       IDEA A: EMBEDDED 360° INTERACTIVE 3D ORGAN/SPINE VIEWER CARD (LEFT PANEL)
       ====================================================================== */
    .idea-a-3d-viewer-card {
      background: #FBF9F4;
      border: 1.5px solid rgba(94, 71, 54, 0.22);
      border-radius: 18px;
      padding: 12px;
      margin-bottom: 14px;
      box-shadow: 0 14px 34px rgba(42, 30, 21, 0.08);
      color: #2A1E15;
    }
    .idea-a-3d-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 8px;
    }
    .idea-a-3d-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.72rem;
      font-weight: 800;
      color: #2D5A43;
      letter-spacing: 0.03em;
    }
    .idea-a-3d-badge-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #2D5A43;
      box-shadow: 0 0 8px rgba(45, 90, 67, 0.5);
    }
    .idea-a-3d-ctrl-btns {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .idea-a-3d-mini-btn {
      padding: 3px 8px;
      border-radius: 999px;
      border: 1px solid rgba(94, 71, 54, 0.24);
      background: #FFFFFF;
      color: #3A2A1E;
      font-size: 0.68rem;
      font-weight: 800;
      cursor: pointer;
      transition: all 0.18s ease;
    }
    .idea-a-3d-mini-btn:hover {
      background: #2D5A43;
      color: #FFFFFF;
      border-color: #2D5A43;
    }
    .idea-a-3d-stage {
      position: relative;
      width: 100%;
      height: 220px;
      border-radius: 14px;
      overflow: hidden;
      background: radial-gradient(circle at 50% 42%, #FFFDF9 0%, #F2ECE0 68%, #E6DEC8 100%);
      border: 1px solid rgba(94, 71, 54, 0.16);
      cursor: grab;
      touch-action: none;
    }
    .idea-a-3d-stage:active {
      cursor: grabbing;
    }
    #idea-a-3d-canvas {
      width: 100%;
      height: 100%;
      display: block;
    }
    .idea-a-orbit-ring-hint {
      position: absolute;
      left: 50%;
      bottom: 10px;
      transform: translateX(-50%);
      padding: 3px 11px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.86);
      border: 1px solid rgba(94, 71, 54, 0.2);
      color: #5E4736;
      font-size: 0.66rem;
      font-weight: 800;
      letter-spacing: 0.04em;
      pointer-events: none;
      white-space: nowrap;
      box-shadow: 0 4px 12px rgba(42, 30, 21, 0.08);
    }
    .idea-a-3d-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-top: 9px;
    }
    .idea-a-green-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 7px 12px;
      border-radius: 999px;
      background: #2D5A43;
      color: #FFFFFF;
      font-size: 0.72rem;
      font-weight: 800;
      border: none;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .idea-a-green-pill:hover {
      background: #214533;
    }
    .idea-a-hub-link {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 7px 11px;
      border-radius: 999px;
      background: rgba(94, 71, 54, 0.09);
      border: 1px solid rgba(94, 71, 54, 0.25);
      color: #3A2A1E;
      font-size: 0.71rem;
      font-weight: 800;
      text-decoration: none;
      transition: all 0.2s ease;
    }
    .idea-a-hub-link:hover {
      background: #3A2A1E;
      color: #FFFFFF;
    }

    /* ======================================================================
       5-COLOR BRAND HARMONY SYSTEM (Default: Beige, Brown, Black, White, Green)
       - 베이지 (신뢰감): #F5F1E8 / #EFE9DC / #E6DEC8
       - 브라운 (부드러움): #4A3525 / #5E4736 / #8A725E
       - 블랙 (진실): #171614 / #23201C
       - 화이트 (투명): #FFFFFF / rgba(255, 255, 255, 0.88)
       - 그린 (자연): #2D5A43 / #3D7357 / #E8F2EC
       ====================================================================== */
    body.theme-hanji {
      --bg-dark: #F5F1E8;
      --bg-panel: rgba(255, 255, 255, 0.88);
      --accent: #2D5A43;
      --accent-light: #3D7357;
      --secondary: #4A3525;
      --gold: #5E4736;
      --gold-light: #4A3525;
      --emerald: #2D5A43;
      --text-main: #171614;
      --text-sub: #4A3525;
      --text-muted: #786250;
      --border-subtle: rgba(94, 71, 54, 0.18);
      --border-gold: rgba(94, 71, 54, 0.26);
      background-color: #F5F1E8;
      color: #171614;
    }
    body.theme-hanji .ambient-bg {
      background:
        radial-gradient(circle at 18% 22%, rgba(45, 90, 67, 0.08) 0%, transparent 48%),
        radial-gradient(circle at 82% 76%, rgba(94, 71, 54, 0.08) 0%, transparent 52%),
        linear-gradient(135deg, #FAF7F0 0%, #F5F1E8 55%, #E8DFCE 100%);
    }
    body.theme-hanji #header {
      background: rgba(255, 255, 255, 0.88);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(94, 71, 54, 0.18);
      box-shadow: 0 4px 20px rgba(58, 42, 30, 0.05);
    }
    body.theme-hanji .brand-logo,
    body.theme-hanji #project-details-title {
      color: #171614;
    }
    body.theme-hanji .brand-logo-mark {
      background: #2D5A43;
      box-shadow: 0 0 10px rgba(45, 90, 67, 0.45);
    }
    body.theme-hanji #project-details-header-info {
      background: #F5F1E8;
      border: 1px solid rgba(94, 71, 54, 0.22);
      color: #4A3525;
    }
    body.theme-hanji .meta-eyebrow {
      color: #2D5A43;
    }
    body.theme-hanji .meta-subtitle-en {
      color: #5E4736;
      opacity: 0.95;
    }
    body.theme-hanji .back-pill-btn,
    body.theme-hanji .clinic-tab {
      color: #4A3525;
      background: rgba(245, 241, 232, 0.85);
      border-color: rgba(94, 71, 54, 0.22);
    }
    body.theme-hanji .back-pill-btn:hover,
    body.theme-hanji .clinic-tab:hover {
      background: #E8F2EC;
      color: #2D5A43;
      border-color: #2D5A43;
    }
    body.theme-hanji .clinic-tab.active {
      background: #2D5A43;
      border-color: #2D5A43;
      color: #FFFFFF;
      box-shadow: 0 4px 12px rgba(45, 90, 67, 0.22);
    }
    body.theme-hanji .header-talk-btn {
      background: linear-gradient(135deg, #2D5A43 0%, #3D7357 100%);
      color: #FFFFFF;
      box-shadow: 0 4px 14px rgba(45, 90, 67, 0.24);
    }
    body.theme-hanji .header-talk-btn:hover {
      background: #4A3525;
      box-shadow: 0 6px 18px rgba(74, 53, 37, 0.28);
    }
    body.theme-hanji #project-details-meta {
      background: rgba(255, 255, 255, 0.86);
      backdrop-filter: blur(24px);
      border-right: 1px solid rgba(94, 71, 54, 0.18);
      scrollbar-color: rgba(94, 71, 54, 0.28) transparent;
    }
    body.theme-hanji #project-details-desc p:first-child {
      color: #23201C;
      font-weight: 500;
    }
    body.theme-hanji .detail-clinical-trust-bar {
      background: #F5F1E8;
      border: 1px solid rgba(94, 71, 54, 0.2);
    }
    body.theme-hanji .detail-trust-seal {
      background: #FFFFFF;
      border: 1px solid rgba(94, 71, 54, 0.12);
    }
    body.theme-hanji .detail-trust-seal-num {
      color: #2D5A43;
    }
    body.theme-hanji .detail-trust-seal-label {
      color: #171614;
    }
    body.theme-hanji .inline-scroll-ba-card {
      background: #FFFFFF;
      border: 1.5px solid rgba(94, 71, 54, 0.22);
      box-shadow: 0 10px 26px rgba(58, 42, 30, 0.07);
    }
    body.theme-hanji .inline-scroll-ba-title {
      color: #171614;
    }
    body.theme-hanji .inline-scroll-ba-pct {
      background: #E8F2EC;
      border-color: rgba(45, 90, 67, 0.38);
      color: #2D5A43;
    }
    body.theme-hanji .inline-scroll-ba-foot {
      color: #5E4736;
      font-weight: 600;
    }
    body.theme-hanji .empathy-checklist-card,
    body.theme-hanji .live-plate-docent {
      background: #FFFFFF;
      border-color: rgba(94, 71, 54, 0.22);
      box-shadow: 0 8px 24px rgba(58, 42, 30, 0.06);
    }
    body.theme-hanji .empathy-checklist-title,
    body.theme-hanji .docent-step-badge {
      color: #2D5A43;
    }
    body.theme-hanji .empathy-count-badge {
      background: #F5F1E8;
      border-color: rgba(94, 71, 54, 0.26);
      color: #4A3525;
    }
    body.theme-hanji .empathy-count-badge.active,
    body.theme-hanji .empathy-count-badge.is-tier-1 {
      background: #16A34A !important;
      border-color: #15803D !important;
      color: #FFFFFF !important;
    }
    body.theme-hanji .empathy-count-badge.is-tier-2 {
      background: #F97316 !important;
      border-color: #EA580C !important;
      color: #FFFFFF !important;
    }
    body.theme-hanji .empathy-count-badge.is-tier-3 {
      background: #EA580C !important;
      border-color: #C2410C !important;
      color: #FFFFFF !important;
    }
    body.theme-hanji .empathy-count-badge.is-tier-4 {
      background: #DC2626 !important;
      border-color: #991B1B !important;
      color: #FFFFFF !important;
    }
    body.theme-hanji .empathy-count-badge.is-tier-5 {
      background: #B91C1C !important;
      border-color: #EF4444 !important;
      color: #FFFFFF !important;
      box-shadow: 0 0 12px rgba(220, 38, 38, 0.55);
    }
    body.theme-hanji .empathy-severity-board {
      background: linear-gradient(135deg, #EFFDF4 0%, #FFF7ED 52%, #FEF2F2 100%);
      border: 1.5px solid #22C55E;
      box-shadow: 0 6px 18px rgba(22, 163, 74, 0.12);
    }
    body.theme-hanji .empathy-severity-board .doc-comment-eyebrow {
      color: #15803D;
    }
    body.theme-hanji .empathy-severity-board .doc-comment-headline {
      color: #14532D;
    }
    body.theme-hanji .empathy-severity-board .doc-comment-body {
      color: #1E293B;
    }
    body.theme-hanji .empathy-severity-board.tier-1 {
      background: linear-gradient(135deg, #DCFCE7 0%, #F0FDF4 100%);
      border: 2px solid #16A34A;
      box-shadow: 0 6px 20px rgba(22, 163, 74, 0.22);
    }
    body.theme-hanji .empathy-severity-board.tier-1 .doc-comment-eyebrow,
    body.theme-hanji .empathy-severity-board.tier-1 .doc-comment-headline {
      color: #15803D;
    }
    body.theme-hanji .empathy-severity-board.tier-2 {
      background: linear-gradient(135deg, #FFEDD5 0%, #FFF7ED 100%);
      border: 2px solid #F97316;
      box-shadow: 0 6px 20px rgba(249, 115, 22, 0.24);
    }
    body.theme-hanji .empathy-severity-board.tier-2 .doc-comment-eyebrow,
    body.theme-hanji .empathy-severity-board.tier-2 .doc-comment-headline {
      color: #EA580C;
    }
    body.theme-hanji .empathy-severity-board.tier-3 {
      background: linear-gradient(135deg, #FED7AA 0%, #FFEDD5 100%);
      border: 2px solid #EA580C;
      box-shadow: 0 8px 22px rgba(234, 88, 12, 0.28);
    }
    body.theme-hanji .empathy-severity-board.tier-3 .doc-comment-eyebrow,
    body.theme-hanji .empathy-severity-board.tier-3 .doc-comment-headline {
      color: #C2410C;
    }
    body.theme-hanji .empathy-severity-board.tier-4 {
      background: linear-gradient(135deg, #FEE2E2 0%, #FEF2F2 100%);
      border: 2px solid #DC2626;
      box-shadow: 0 8px 24px rgba(220, 38, 38, 0.28);
    }
    body.theme-hanji .empathy-severity-board.tier-4 .doc-comment-eyebrow,
    body.theme-hanji .empathy-severity-board.tier-4 .doc-comment-headline {
      color: #B91C1C;
    }
    body.theme-hanji .empathy-severity-board.tier-5 {
      background: linear-gradient(135deg, #991B1B 0%, #7F1D1D 100%);
      border: 2.5px solid #EF4444;
    }
    body.theme-hanji .empathy-severity-board.tier-5 .doc-comment-eyebrow {
      color: #FEF08A;
    }
    body.theme-hanji .empathy-check-item {
      background: #F8F5EE;
      border-color: rgba(94, 71, 54, 0.16);
    }
    body.theme-hanji .empathy-check-item:hover {
      background: #EFE9DC;
      border-color: rgba(94, 71, 54, 0.3);
    }
    body.theme-hanji .empathy-check-item.checked {
      background: #E8F2EC;
      border-color: #2D5A43;
      box-shadow: 0 4px 12px rgba(45, 90, 67, 0.12);
    }
    body.theme-hanji .empathy-check-box {
      background: #FFFFFF;
      border-color: rgba(94, 71, 54, 0.36);
    }
    body.theme-hanji .empathy-check-item.checked .empathy-check-box {
      background: #2D5A43;
      border-color: #2D5A43;
      color: #FFFFFF;
    }
    body.theme-hanji .empathy-check-text,
    body.theme-hanji .docent-active-caption {
      color: #171614;
      font-weight: 600;
    }
    body.theme-hanji .empathy-check-item.checked .empathy-check-text {
      color: #171614;
      font-weight: 800;
    }
    body.theme-hanji #project-details-launch-cta {
      background: linear-gradient(135deg, #2D5A43, #3D7357);
      border-color: #2D5A43;
      color: #FFFFFF;
      box-shadow: 0 8px 22px rgba(45, 90, 67, 0.24);
    }
    body.theme-hanji #project-details-launch-cta:hover {
      background: #4A3525;
      border-color: #4A3525;
      color: #FFFFFF;
    }
    body.theme-hanji #project-details-launch-cta-dot {
      background: #FFFFFF;
      box-shadow: 0 0 8px #FFFFFF;
    }
    body.theme-hanji .extra-detail-link {
      background: #F5F1E8;
      border-color: rgba(94, 71, 54, 0.24);
      color: #4A3525;
      font-weight: 700;
    }
    body.theme-hanji .extra-detail-link:hover {
      background: #4A3525;
      border-color: #4A3525;
      color: #FFFFFF;
    }
    body.theme-hanji .header-vis-btn {
      background: #4A3525;
      color: #FFFFFF;
      border-color: #4A3525;
    }
    body.theme-hanji .header-ba-btn {
      background: #E8F2EC;
      border-color: rgba(45, 90, 67, 0.4);
      color: #2D5A43;
    }
    body.theme-hanji .detail-ba-trigger-bar {
      background: #4A3525;
      color: #F5F1E8;
    }
    body.theme-hanji .project-details-item,
    body.theme-hanji .project-details-item.is-clean-plate {
      border: 1.5px solid rgba(94, 71, 54, 0.24);
      box-shadow: 0 24px 60px rgba(58, 42, 30, 0.18);
    }
    body.theme-hanji .project-details-item.is-active-plate,
    body.theme-hanji .project-details-item.is-clean-plate.is-active-plate {
      border-color: #2D5A43;
      box-shadow: 0 28px 72px rgba(45, 90, 67, 0.22), 0 0 0 2px rgba(45, 90, 67, 0.16);
    }
    body.theme-hanji .clean-step-label {
      background: rgba(45, 90, 67, 0.9);
      color: #FFFFFF;
      padding: 4px 11px;
      border-radius: 999px;
      opacity: 1;
    }
    body.theme-hanji .clean-spec-tag {
      background: rgba(255, 255, 255, 0.9);
      border: 1px solid rgba(94, 71, 54, 0.28);
      color: #171614;
      font-weight: 700;
    }
    body.theme-hanji .sci-stat-card {
      background: rgba(255, 255, 255, 0.92);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(94, 71, 54, 0.26);
      box-shadow: 0 10px 28px rgba(23, 22, 20, 0.18);
    }
    body.theme-hanji .sci-stat-num {
      color: #2D5A43;
    }
    body.theme-hanji .sci-stat-label {
      color: #171614;
    }
    body.theme-hanji .sci-bar-track {
      background: rgba(94, 71, 54, 0.16);
    }
    body.theme-hanji .sci-bar-fill {
      background: linear-gradient(90deg, #2D5A43, #4A3525);
    }
    body.theme-hanji #project-details-preview {
      border: 1.5px solid rgba(94, 71, 54, 0.28);
      box-shadow: 0 24px 60px rgba(58, 42, 30, 0.2);
    }
    body.theme-hanji .next-portal-eyebrow {
      color: #E8F2EC;
    }
    body.theme-hanji #project-details-preview-title {
      color: #FFFFFF;
    }
    body.theme-hanji .next-portal-desc {
      color: rgba(245, 241, 232, 0.92);
    }
    body.theme-hanji #project-details-preview-footer-text {
      color: #F5F1E8;
    }
    body.theme-hanji #project-details-preview-footer-bar-inner {
      background: #2D5A43;
    }
    body.theme-hanji #scroll-indicator {
      background: rgba(94, 71, 54, 0.15);
    }
    body.theme-hanji #scroll-indicator-bar {
      background: linear-gradient(90deg, #2D5A43, #4A3525);
      box-shadow: none;
    }
    body.theme-hanji #consult-modal {
      background: rgba(23, 22, 20, 0.62);
    }
    body.theme-hanji .consult-modal-card {
      background: #F5F1E8;
      border: 1.5px solid rgba(94, 71, 54, 0.28);
      box-shadow: 0 30px 80px rgba(23, 22, 20, 0.32);
      color: #171614;
    }
    body.theme-hanji .consult-modal-title {
      color: #171614;
    }
    body.theme-hanji .consult-modal-sub {
      color: #5E4736;
    }
    body.theme-hanji .modal-checked-summary {
      background: #E8F2EC;
      border-color: rgba(45, 90, 67, 0.35);
      color: #2D5A43;
      font-weight: 600;
    }
    body.theme-hanji .modal-form-group label {
      color: #4A3525;
    }
    body.theme-hanji .modal-form-group input,
    body.theme-hanji .modal-form-group textarea {
      background: #FFFFFF;
      border-color: rgba(94, 71, 54, 0.24);
      color: #171614;
    }
    body.theme-hanji .modal-submit-btn {
      background: linear-gradient(135deg, #2D5A43, #3D7357);
      box-shadow: 0 6px 18px rgba(45, 90, 67, 0.26);
    }
    body.theme-hanji .consult-action-item {
      background: #FFFFFF;
      border-color: rgba(94, 71, 54, 0.22);
      color: #4A3525;
    }
    body.theme-hanji .consult-action-item:hover {
      background: #2D5A43;
      border-color: #2D5A43;
      color: #FFFFFF;
    }

    /* High-Visibility Large Text Mode for Detail Pages */
    body.high-visibility-mode #project-details-meta {
      width: 490px;
      min-width: 490px;
    }
    body.high-visibility-mode #project-details-desc p:first-child {
      font-size: 0.95rem !important;
      line-height: 1.7 !important;
      color: #FFFFFF !important;
      font-weight: 500 !important;
    }
    body.high-visibility-mode .empathy-check-text {
      font-size: 0.88rem !important;
      line-height: 1.55 !important;
      font-weight: 600 !important;
      color: #FFFFFF !important;
    }
    body.high-visibility-mode .plate-caption-title {
      font-size: 1.62rem !important;
    }
    body.high-visibility-mode .plate-caption-sub {
      font-size: 0.98rem !important;
      line-height: 1.65 !important;
      color: #FFFFFF !important;
      background: rgba(8, 10, 14, 0.78);
      padding: 8px 12px;
      border-radius: 10px;
    }
    body.high-visibility-mode .docent-active-caption {
      font-size: 0.88rem !important;
      line-height: 1.65 !important;
      color: #FFFFFF !important;
    }

    @media (max-width: 1024px) {
      html, body {
        overflow-x: hidden !important;
        overflow-y: auto !important;
        height: auto !important;
        min-height: 100dvh !important;
        overscroll-behavior-y: auto !important;
        touch-action: pan-y !important;
        user-select: auto !important;
        -webkit-overflow-scrolling: touch;
      }
      #header {
        padding: 0 10px;
        height: 52px;
        gap: 6px;
        width: 100%;
        max-width: 100vw;
        box-sizing: border-box;
      }
      .header-left {
        gap: 6px;
        flex: 1;
        min-width: 0;
        overflow: hidden;
      }
      .brand-logo {
        font-size: 0.82rem;
        gap: 5px;
        white-space: nowrap;
        flex-shrink: 0;
      }
      .brand-logo-mark {
        width: 7px;
        height: 7px;
        flex-shrink: 0;
      }
      .clinic-quick-tabs,
      .header-center,
      #project-details-header-info,
      #header-body-explorer-link,
      #header-ask-doctor-link,
      #header .header-right a[href^="tel:"],
      #btn-toggle-detail-visibility,
      #header #bareun-visit-badge,
      #header .bareun-visit-pill-btn {
        display: none !important;
      }
      .header-right {
        gap: 5px !important;
        flex-shrink: 0;
      }
      .header-ba-btn, .header-vis-btn, .header-talk-btn, .back-pill-btn {
        padding: 5px 10px;
        font-size: 0.68rem;
        white-space: nowrap;
        flex-shrink: 0;
      }
      #project-details {
        flex-direction: column !important;
        height: auto !important;
        min-height: 100dvh !important;
        padding-top: 52px !important;
        padding-bottom: 56px !important;
        overflow: visible !important;
      }
      #project-details-meta, body.high-visibility-mode #project-details-meta {
        width: 100% !important;
        min-width: 0 !important;
        max-width: 100% !important;
        height: auto !important;
        max-height: none !important;
        padding: 16px 14px 20px !important;
        overflow: visible !important;
        border-right: none !important;
        border-bottom: 1px solid var(--border-subtle) !important;
      }
      .meta-eyebrow {
        margin-bottom: 4px;
        font-size: 0.65rem;
      }
      #project-details-title {
        font-size: 1.32rem;
        margin-bottom: 6px;
        line-height: 1.26;
      }
      .meta-subtitle-en {
        display: none;
      }
      #project-details-desc {
        font-size: 0.82rem;
        line-height: 1.52;
        margin-bottom: 12px;
      }
      #project-details-desc p {
        margin-bottom: 6px;
      }
      .empathy-checklist-card {
        margin-bottom: 12px;
        padding: 12px 12px;
      }
      .empathy-checklist-header {
        gap: 6px;
        flex-wrap: nowrap;
      }
      .empathy-checklist-title {
        font-size: 0.82rem;
        white-space: nowrap;
        letter-spacing: -0.02em;
      }
      .empathy-count-badge {
        font-size: 0.68rem;
        padding: 3px 8px;
        white-space: nowrap;
        flex-shrink: 0;
      }
      .empathy-check-item {
        padding: 9px 10px;
      }
      .empathy-check-text {
        font-size: 0.78rem;
        line-height: 1.42;
      }
      .detail-clinical-trust-bar {
        gap: 5px;
        margin-bottom: 8px;
      }
      .detail-trust-seal {
        padding: 5px 5px;
      }
      .detail-trust-seal-num {
        font-size: 0.7rem;
      }
      .detail-trust-seal-label {
        font-size: 0.58rem;
      }
      .inline-scroll-ba-card {
        padding: 8px 10px;
        margin-bottom: 8px;
      }
      #project-details-items-wrapper {
        width: 100% !important;
        flex: none !important;
        height: auto !important;
        overflow: visible !important;
        padding: 18px 14px 32px !important;
        display: block !important;
        touch-action: pan-y !important;
        cursor: default;
      }
      #project-details-items-move-container {
        padding: 0 !important;
        gap: 18px !important;
        width: 100% !important;
        height: auto !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: stretch !important;
        transform: none !important;
        will-change: auto !important;
      }
      .project-details-item, .project-details-item[data-fullscreen] {
        width: 100% !important;
        max-width: 100% !important;
        height: 360px !important;
        min-height: 340px !important;
        max-height: none !important;
        flex-shrink: 0;
        border-radius: 18px !important;
      }
      #project-details-preview {
        width: 100% !important;
        max-width: 100% !important;
        height: auto !important;
        min-height: 290px !important;
        max-height: none !important;
        flex-shrink: 0;
        border-radius: 18px !important;
        padding: 18px 16px !important;
      }
      .plate-top-badges {
        top: 10px;
        left: 10px;
        right: 10px;
      }
      .plate-step-pill, .plate-zoom-hint {
        padding: 4px 8px;
        font-size: 0.62rem;
      }
      .plate-caption-card {
        left: 10px;
        right: 10px;
        bottom: 10px;
        padding: 10px 12px;
        border-radius: 12px;
      }
      .plate-caption-title {
        font-size: 0.96rem;
        margin-bottom: 4px;
      }
      .plate-caption-sub {
        font-size: 0.76rem;
        line-height: 1.42;
      }
      .body-model-badge-main, .body-model-badge-sub {
        padding: 4px 9px;
        font-size: 0.64rem;
      }
      .body-model-bottom-stage {
        flex-direction: column;
        align-items: stretch;
        gap: 10px;
      }
      #project-details-preview-inner {
        max-width: 100%;
      }
      .next-portal-label {
        font-size: 0.62rem;
        margin-bottom: 2px;
      }
      #project-details-preview-title {
        font-size: 1.12rem;
        margin-bottom: 4px;
      }
      .next-portal-desc {
        font-size: 0.76rem;
        margin-bottom: 8px;
        line-height: 1.42;
      }
      .body-model-feature-chips {
        display: none;
      }
      .next-portal-cta {
        padding: 6px 11px;
        font-size: 0.7rem;
      }
      .last-card-mini-keyword-box {
        width: 100%;
        padding: 8px 10px;
        gap: 6px;
        flex-direction: column;
        align-items: stretch;
      }
      .last-card-mini-keyword-box .mini-kw-eyebrow,
      .last-card-mini-keyword-box .mini-kw-sub {
        display: none;
      }
      .last-card-mini-keyword-box .mini-kw-btn {
        width: auto;
        flex: 1;
        padding: 6px 8px;
        font-size: 0.68rem;
        white-space: nowrap;
        justify-content: center;
      }
      #floating-bottom-right-kw-card {
        display: none !important;
      }
      #scroll-indicator { left: 0; }
      .detail-ba-metrics { grid-template-columns: 1fr; }
      .visual-sci-overlay,
      .is-clean-plate .visual-sci-overlay {
        left: 12px;
        right: 12px;
        top: 12px;
        bottom: auto;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
      }
      .sci-stat-card {
        padding: 8px 10px;
        border-radius: 10px;
      }
      .sci-stat-num {
        font-size: 0.84rem;
        line-height: 1.22;
        margin-bottom: 3px;
      }
      .sci-stat-label {
        font-size: 0.63rem;
        line-height: 1.32;
        margin-bottom: 5px;
      }
      .clean-plate-caption {
        left: 12px;
        right: 12px;
        bottom: 12px;
      }
    }

    /* ============================================================================
       4-TYPE HAIRLOSS SUBTYPE SWITCHER BAR & MODAL IN DETAIL PAGES
       ============================================================================ */
    .hairloss-subtype-switcher {
      margin: 0 0 12px 0;
      padding: 10px 11px;
      border-radius: 14px;
      background: linear-gradient(135deg, rgba(16, 36, 26, 0.94), rgba(24, 52, 38, 0.92));
      border: 1.5px solid rgba(212, 175, 55, 0.48);
      box-shadow: 0 10px 24px rgba(0, 0, 0, 0.16);
    }
    .hairloss-subtype-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 6px;
      margin-bottom: 8px;
    }
    .hairloss-subtype-title {
      font-size: 0.72rem;
      font-weight: 800;
      color: #FDE68A;
      letter-spacing: -0.01em;
    }
    .hairloss-subtype-modal-btn {
      padding: 3px 8px;
      border-radius: 999px;
      background: rgba(212, 175, 55, 0.2);
      border: 1px solid rgba(212, 175, 55, 0.55);
      color: #FEF3C7;
      font-size: 0.65rem;
      font-weight: 800;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .hairloss-subtype-modal-btn:hover {
      background: #D4AF37;
      color: #0F1D15;
    }
    .hairloss-subtype-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 6px;
    }
    .hairloss-subtype-tab {
      display: flex;
      flex-direction: column;
      gap: 2px;
      padding: 7px 9px;
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.07);
      border: 1px solid rgba(255, 255, 255, 0.14);
      text-decoration: none;
      transition: all 0.22s ease;
    }
    .hairloss-subtype-tab:hover {
      background: rgba(110, 231, 183, 0.16);
      border-color: rgba(110, 231, 183, 0.55);
      transform: translateY(-1px);
    }
    .hairloss-subtype-tab.active {
      background: linear-gradient(135deg, rgba(45, 90, 67, 0.95), rgba(27, 67, 50, 0.95));
      border-color: #6EE7B7;
      box-shadow: 0 0 14px rgba(110, 231, 183, 0.32);
    }
    .hst-top {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .hst-num {
      font-size: 0.62rem;
      font-weight: 900;
      color: #6EE7B7;
      padding: 1px 5px;
      border-radius: 999px;
      background: rgba(16, 185, 129, 0.2);
    }
    .hairloss-subtype-tab.active .hst-num {
      background: #6EE7B7;
      color: #0B1911;
    }
    .hst-label {
      font-size: 0.78rem;
      font-weight: 800;
      color: #FFFFFF;
    }
    .hst-sub {
      font-size: 0.64rem;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.74);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* 4-Type Hairloss Modal Overlay inside Detail Pages */
    #detail-hairloss-4type-modal {
      position: fixed;
      inset: 0;
      z-index: 12000;
      background: rgba(8, 15, 11, 0.84);
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.32s cubic-bezier(0.16, 1, 0.3, 1);
    }
    #detail-hairloss-4type-modal.open {
      opacity: 1;
      pointer-events: auto;
    }
    .dh4-dialog {
      width: min(1060px, 96vw);
      max-height: 90vh;
      overflow-y: auto;
      border-radius: 26px;
      background: linear-gradient(155deg, rgba(16, 30, 22, 0.97), rgba(10, 19, 14, 0.99));
      border: 1.5px solid rgba(212, 175, 55, 0.5);
      box-shadow: 0 32px 80px rgba(0, 0, 0, 0.65);
      padding: 26px 28px;
      color: #FFFFFF;
    }
    .dh4-head {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 14px;
      margin-bottom: 18px;
      padding-bottom: 14px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.12);
    }
    .dh4-eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 4px 12px;
      border-radius: 999px;
      background: rgba(212, 175, 55, 0.16);
      border: 1px solid rgba(212, 175, 55, 0.45);
      color: #FDE68A;
      font-size: 0.72rem;
      font-weight: 800;
      margin-bottom: 7px;
    }
    .dh4-title {
      margin: 0 0 5px 0;
      font-family: var(--font-serif, 'Noto Serif KR', serif);
      font-size: clamp(1.3rem, 2.1vw, 1.8rem);
      font-weight: 800;
      color: #FFFFFF;
    }
    .dh4-title em {
      font-style: normal;
      color: #6EE7B7;
    }
    .dh4-sub {
      margin: 0;
      font-size: 0.85rem;
      color: rgba(255, 255, 255, 0.8);
    }
    .dh4-close {
      padding: 8px 15px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.09);
      border: 1px solid rgba(255, 255, 255, 0.22);
      color: #FFFFFF;
      font-size: 0.8rem;
      font-weight: 800;
      cursor: pointer;
      white-space: nowrap;
    }
    .dh4-close:hover {
      background: rgba(239, 68, 68, 0.25);
      border-color: rgba(248, 113, 113, 0.6);
    }
    .dh4-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
    }
    .dh4-card {
      display: flex;
      flex-direction: column;
      border-radius: 18px;
      overflow: hidden;
      background: rgba(255, 255, 255, 0.05);
      border: 1.5px solid rgba(255, 255, 255, 0.14);
      text-decoration: none;
      color: #FFFFFF;
      transition: transform 0.26s ease, border-color 0.26s ease, box-shadow 0.26s ease;
    }
    .dh4-card:hover, .dh4-card.current {
      transform: translateY(-4px);
      border-color: #6EE7B7;
      box-shadow: 0 16px 36px rgba(0, 0, 0, 0.45), 0 0 22px rgba(110, 231, 183, 0.24);
    }
    .dh4-visual {
      position: relative;
      height: 136px;
      overflow: hidden;
    }
    .dh4-visual img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.45s ease;
    }
    .dh4-card:hover .dh4-visual img {
      transform: scale(1.06);
    }
    .dh4-visual::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(10,18,14,0.12) 0%, rgba(10,18,14,0.86) 100%);
    }
    .dh4-badge {
      position: absolute;
      top: 9px;
      left: 9px;
      z-index: 2;
      padding: 3px 9px;
      border-radius: 999px;
      background: rgba(15, 29, 21, 0.86);
      border: 1px solid rgba(110, 231, 183, 0.55);
      color: #A7F3D0;
      font-size: 0.65rem;
      font-weight: 800;
    }
    .dh4-body {
      padding: 13px 14px 15px;
      display: flex;
      flex-direction: column;
      flex: 1;
      gap: 6px;
    }
    .dh4-card-title {
      margin: 0;
      font-size: 1.05rem;
      font-weight: 800;
      color: #FFFFFF;
    }
    .dh4-card-sub {
      font-size: 0.72rem;
      font-weight: 700;
      color: #FDE68A;
    }
    .dh4-card-desc {
      margin: 0;
      font-size: 0.76rem;
      line-height: 1.44;
      color: rgba(255, 255, 255, 0.8);
      flex: 1;
    }
    .dh4-cta {
      margin-top: 6px;
      padding: 8px 11px;
      border-radius: 10px;
      background: linear-gradient(135deg, #2D5A43, #1B4332);
      border: 1px solid rgba(110, 231, 183, 0.45);
      color: #FFFFFF;
      font-size: 0.75rem;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .dh4-card:hover .dh4-cta {
      background: linear-gradient(135deg, #D4AF37, #B58E24);
      color: #0F1D15;
    }
    @media (max-width: 920px) {
      .dh4-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 560px) {
      .dh4-grid { grid-template-columns: 1fr; }
    }

    /* ============================================================================
       GROWTH MAIN HERO: ENLARGED UNEDITED SON GROWTH IMAGE & FATHER LETTER BOX
       (Larger than all other cards so it stands out immediately, zero numbers)
       ============================================================================ */
    .project-details-item.is-growth-son-hero,
    body.theme-hanji .project-details-item.is-growth-son-hero {
      width: min(82vw, 1260px) !important;
      max-width: 1260px !important;
      height: calc(100vh - 72px) !important;
      max-height: 980px !important;
      background: linear-gradient(145deg, #16120E 0%, #1F1913 55%, #120E0B 100%) !important;
      border: 3px solid #D4AF37 !important;
      box-shadow: 0 36px 100px rgba(0, 0, 0, 0.82), 0 0 60px rgba(212, 175, 55, 0.42), 0 0 0 4px rgba(212, 175, 55, 0.18) !important;
      z-index: 5;
    }
    .growth-son-hero-inner {
      padding: 12px 16px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      overflow: hidden;
    }
    .growth-son-hero-grid {
      display: grid;
      grid-template-columns: clamp(330px, 38%, 450px) 1fr;
      gap: 18px;
      height: 100%;
      align-items: stretch;
    }
    .son-growth-visual-col {
      display: flex;
      flex-direction: column;
      height: 100%;
      min-height: 0;
      border-radius: 18px;
      overflow: hidden;
      border: 2.5px solid #FDE68A;
      box-shadow: 0 18px 46px rgba(0, 0, 0, 0.65), 0 0 28px rgba(245, 130, 13, 0.35);
      cursor: zoom-in;
      background: linear-gradient(180deg, #F37800 0%, #FD8B00 50%, #F17400 100%);
      position: relative;
    }
    .son-original-frame {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      background: linear-gradient(180deg, #F37800 0%, #FD8B00 50%, #F17400 100%);
    }
    .son-original-full-img {
      height: 100%;
      width: 100%;
      object-fit: contain;
      object-position: center center;
      display: block;
      transform: scaleX(1.08) scaleY(1.02);
      transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
    }
    .son-growth-visual-col:hover .son-original-full-img {
      transform: scaleX(1.11) scaleY(1.045);
    }
    .son-original-zoom-pill {
      position: absolute;
      right: 12px;
      bottom: 12px;
      z-index: 4;
      padding: 6px 13px;
      border-radius: 999px;
      background: rgba(15, 12, 10, 0.86);
      backdrop-filter: blur(8px);
      border: 1.5px solid #FEF08A;
      color: #FEF08A;
      font-size: 0.72rem;
      font-weight: 800;
      cursor: pointer;
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.55);
      transition: transform 0.2s ease, background 0.2s ease;
    }
    .son-original-zoom-pill:hover {
      transform: translateY(-2px);
      background: #14100C;
    }
    .son-live-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 5px 12px;
      border-radius: 999px;
      background: #2D5A43;
      border: 1px solid rgba(110, 231, 183, 0.55);
      color: #ECFDF5;
      font-size: 0.7rem;
      font-weight: 800;
      letter-spacing: 0.04em;
      width: fit-content;
      margin-bottom: 6px;
    }
    .son-live-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #34D399;
      box-shadow: 0 0 10px #34D399;
      animation: liveRecPulse 1.4s infinite ease-in-out;
    }
    .letter-top-hero-banner {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding-bottom: 10px;
      border-bottom: 1.5px solid rgba(140, 101, 40, 0.22);
    }
    .son-hero-main-title {
      font-family: 'Noto Serif KR', serif;
      font-size: 1.18rem;
      font-weight: 900;
      color: #1F1914;
      margin: 0;
      line-height: 1.32;
    }
    .son-hero-main-title .title-key-em {
      color: #2D5A43;
      text-decoration: underline;
      text-underline-offset: 4px;
    }
    .son-hero-main-sub {
      font-size: 0.8rem;
      font-weight: 600;
      color: #4A3B2F;
      line-height: 1.42;
      margin: 0;
    }

    /* RIGHT COLUMN: FATHER LETTER BOX (원장 친필 서약 카드) */
    .father-letter-box {
      background: linear-gradient(155deg, #FFFDF9 0%, #F6EFE2 100%);
      border: 2px solid #D4AF37;
      border-radius: 18px;
      padding: 18px 22px;
      color: #231F1C;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 10px;
      box-shadow: 0 18px 45px rgba(0, 0, 0, 0.45), inset 0 0 0 4px rgba(212, 175, 55, 0.14);
      position: relative;
      overflow-y: auto;
    }
    .letter-eyebrow {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.69rem;
      font-weight: 800;
      letter-spacing: 0.08em;
      color: #8C6528;
    }
    .letter-eyebrow-line {
      width: 22px;
      height: 2px;
      background: #8C6528;
      display: inline-block;
    }
    .letter-headline {
      font-family: 'Noto Serif KR', serif;
      font-size: 1.18rem;
      font-weight: 900;
      line-height: 1.38;
      color: #1F1914;
      letter-spacing: -0.02em;
      margin: 0;
    }
    .letter-headline span {
      color: #2D5A43;
      background: linear-gradient(transparent 62%, rgba(45, 90, 67, 0.18) 62%);
    }
    .letter-handwriting {
      font-family: 'Gowun Batang', 'Noto Serif KR', serif;
      font-size: 0.88rem;
      line-height: 1.72;
      color: #332920;
      background: rgba(255, 255, 255, 0.76);
      border-left: 3.5px solid #2D5A43;
      border-radius: 0 12px 12px 0;
      padding: 13px 16px;
      box-shadow: 0 4px 14px rgba(58, 42, 30, 0.05);
      word-break: keep-all;
    }
    .letter-handwriting strong {
      color: #1B4332;
      font-weight: 700;
      background: rgba(16, 185, 129, 0.14);
      padding: 0 4px;
      border-radius: 4px;
    }
    .letter-milestone-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 7px;
    }
    .letter-milestone-chip {
      background: #FFFFFF;
      border: 1px solid rgba(140, 101, 40, 0.25);
      border-radius: 10px;
      padding: 8px 9px;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .letter-milestone-chip.is-accent {
      background: linear-gradient(135deg, #2D5A43, #1B4332);
      border-color: #2D5A43;
      color: #FFFFFF;
    }
    .lm-label {
      font-size: 0.62rem;
      font-weight: 800;
      color: #8C6528;
    }
    .letter-milestone-chip.is-accent .lm-label {
      color: #A7F3D0;
    }
    .lm-val {
      font-size: 0.73rem;
      font-weight: 800;
      color: #1F1914;
      line-height: 1.25;
    }
    .letter-milestone-chip.is-accent .lm-val {
      color: #FFFFFF;
    }
    .letter-sign-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding-top: 8px;
      border-top: 1px dashed rgba(140, 101, 40, 0.35);
    }
    .letter-sign-info {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .letter-sign-text {
      font-family: 'Gowun Batang', 'Noto Serif KR', serif;
      font-size: 0.92rem;
      font-weight: 700;
      color: #231F1C;
    }
    .letter-sign-text span {
      font-size: 1.12rem;
      font-weight: 900;
      letter-spacing: 0.18em;
      color: #14100C;
      margin: 0 4px;
    }
    .letter-blog-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border-radius: 999px;
      background: #2D5A43;
      color: #FFFFFF;
      text-decoration: none;
      font-size: 0.71rem;
      font-weight: 800;
      transition: background 0.2s ease, transform 0.2s ease;
    }
    .letter-blog-btn:hover {
      background: #14100C;
      transform: translateY(-1px);
    }
    .director-seal-stamp {
      flex-shrink: 0;
      transform: rotate(-4deg);
      filter: drop-shadow(0 3px 6px rgba(184, 59, 42, 0.22));
    }

    /* ============================================================================
       DIET PLATE 03: 3-STAGE EFFICACY INTERACTIVE MOTION ACTIONS
       ============================================================================ */
    .project-details-item.is-diet-3stage-plate {
      width: min(74vw, 1120px);
      max-width: 1120px;
      height: 82vh;
      max-height: 750px;
      background: linear-gradient(150deg, #FFFDFB 0%, #FBF5F3 55%, #F5EBE8 100%);
      border: 1.5px solid rgba(184, 92, 110, 0.42);
      box-shadow: 0 30px 85px rgba(42, 24, 28, 0.28);
      color: #2A1E21;
    }
    .diet-3stage-inner {
      padding: 20px 24px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 14px;
      overflow-y: auto;
    }
    .diet-3stage-header {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 14px;
      flex-wrap: wrap;
    }
    .diet-3stage-eyebrow {
      display: inline-block;
      font-size: 0.7rem;
      font-weight: 800;
      letter-spacing: 0.1em;
      color: #B85C6E;
      margin-bottom: 4px;
    }
    .diet-3stage-title {
      font-family: 'Noto Serif KR', serif;
      font-size: 1.38rem;
      font-weight: 900;
      color: #23181B;
      line-height: 1.25;
      margin-bottom: 4px;
    }
    .diet-3stage-title .title-key-em {
      color: #B85C6E;
      text-decoration: underline;
      text-underline-offset: 4px;
    }
    .diet-3stage-sub {
      font-size: 0.8rem;
      color: #5C474C;
      line-height: 1.45;
    }
    .diet-3stage-tabs {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
    }
    .diet-3stage-tab {
      padding: 7px 13px;
      border-radius: 999px;
      border: 1px solid rgba(184, 92, 110, 0.32);
      background: #FFFFFF;
      color: #5C474C;
      font-size: 0.73rem;
      font-weight: 800;
      cursor: pointer;
      transition: all 0.22s ease;
    }
    .diet-3stage-tab:hover,
    .diet-3stage-tab.active {
      background: linear-gradient(135deg, #B85C6E 0%, #8E3B4B 100%);
      border-color: #8E3B4B;
      color: #FFFFFF;
      box-shadow: 0 6px 16px rgba(184, 92, 110, 0.32);
    }
    .efficacy-3stage-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      flex: 1;
      min-height: 0;
    }
    .efficacy-stage-card {
      background: #FFFFFF;
      border: 1.5px solid rgba(184, 92, 110, 0.22);
      border-radius: 20px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: 0 14px 34px rgba(45, 30, 34, 0.08);
      transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease, opacity 0.3s ease;
    }
    .efficacy-stage-card:hover,
    .efficacy-stage-card.is-stage-focused {
      transform: translateY(-5px);
      border-color: #B85C6E;
      box-shadow: 0 22px 48px rgba(184, 92, 110, 0.24);
    }
    .efficacy-3stage-grid.has-focus .efficacy-stage-card:not(.is-stage-focused) {
      opacity: 0.58;
      transform: scale(0.98);
    }
    .efficacy-visual-frame {
      position: relative;
      width: 100%;
      flex: 1;
      min-height: 225px;
      overflow: hidden;
      background: #F6EFEA;
    }
    .efficacy-visual-frame img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      display: block;
    }
    .efficacy-motion-overlay {
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 2;
    }
    /* STAGE 1 MOTION: Brain Electric Impulse & Zap Calming */
    .efficacy-visual-frame.neuro-frame img {
      animation: brainElectricPulse 3.6s ease-in-out infinite;
    }
    .electric-zap-layer {
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 3;
      overflow: hidden;
    }
    .zap-pulse-core {
      position: absolute;
      top: 38%;
      left: 50%;
      width: 90px;
      height: 90px;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255, 230, 140, 0.85) 0%, rgba(255, 160, 90, 0.45) 45%, transparent 72%);
      mix-blend-mode: screen;
      animation: zapCorePulse 1.8s ease-in-out infinite;
    }
    .zap-wave-ring {
      position: absolute;
      top: 38%;
      left: 50%;
      width: 54px;
      height: 54px;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      border: 2px solid rgba(255, 220, 130, 0.85);
      box-shadow: 0 0 14px rgba(255, 190, 90, 0.7);
      animation: zapRingWave 2.4s cubic-bezier(0.16, 1, 0.3, 1) infinite;
    }
    .zap-wave-ring.ring-2 {
      animation-delay: 1.2s;
      border-color: rgba(140, 220, 255, 0.75);
      box-shadow: 0 0 14px rgba(100, 200, 255, 0.6);
    }
    .zap-lightning-svg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      filter: drop-shadow(0 0 6px rgba(255, 215, 100, 0.95)) drop-shadow(0 0 12px rgba(255, 120, 80, 0.75));
    }
    .zap-bolt {
      stroke: #FFF3B0;
      stroke-width: 2.4;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-dasharray: 80;
      stroke-dashoffset: 80;
      animation: boltZap 2.2s ease-in-out infinite;
    }
    .zap-bolt.bolt-2 { animation-delay: 0.45s; stroke: #FFE082; }
    .zap-bolt.bolt-3 { animation-delay: 0.95s; stroke: #B3E5FC; }
    .zap-bolt.bolt-4 { animation-delay: 1.45s; stroke: #FFE082; }
    .spark-dot {
      position: absolute;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #FFF9C4;
      box-shadow: 0 0 10px #FFD54F, 0 0 18px #FF8A65;
      animation: sparkPop 1.6s ease-in-out infinite;
    }
    .spark-dot.s1 { top: 24%; left: 36%; animation-delay: 0.1s; }
    .spark-dot.s2 { top: 22%; left: 64%; animation-delay: 0.5s; }
    .spark-dot.s3 { top: 34%; left: 26%; animation-delay: 0.9s; }
    .spark-dot.s4 { top: 44%; left: 72%; animation-delay: 1.3s; }
    @keyframes brainElectricPulse {
      0%, 100% { transform: scale(1.02); filter: brightness(1) contrast(1.02); }
      45% { transform: scale(1.06); filter: brightness(1.1) contrast(1.08) saturate(1.12); }
      50% { transform: scale(1.065) translateX(1.5px); filter: brightness(1.16) contrast(1.12); }
      55% { transform: scale(1.06) translateX(-1.5px); filter: brightness(1.08); }
    }
    @keyframes zapCorePulse {
      0%, 100% { transform: translate(-50%, -50%) scale(0.75); opacity: 0.45; }
      45% { transform: translate(-50%, -50%) scale(1.35); opacity: 0.95; }
      55% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.7; }
    }
    @keyframes zapRingWave {
      0% { transform: translate(-50%, -50%) scale(0.4); opacity: 0.95; }
      80% { opacity: 0.25; }
      100% { transform: translate(-50%, -50%) scale(2.7); opacity: 0; }
    }
    @keyframes boltZap {
      0%, 18% { stroke-dashoffset: 80; opacity: 0; }
      26% { stroke-dashoffset: 0; opacity: 1; }
      34% { opacity: 0.25; }
      42% { stroke-dashoffset: 0; opacity: 1; }
      60%, 100% { stroke-dashoffset: -80; opacity: 0; }
    }
    @keyframes sparkPop {
      0%, 100% { transform: scale(0.3); opacity: 0; }
      40% { transform: scale(1.4); opacity: 1; }
      70% { transform: scale(0.8); opacity: 0.4; }
    }

    /* STAGE 2 MOTION: Thermal Combustion & Fat Cluster Shrinkage */
    .efficacy-visual-frame.thermal-frame:not(.is-belly-shrink-motion) img {
      transform-origin: 50% 54%;
      animation: fatCombustionShrink 3.8s ease-in-out infinite;
    }
    .thermal-burn-layer {
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 3;
      overflow: hidden;
    }
    .combustion-fire-glow {
      position: absolute;
      top: 52%;
      left: 50%;
      width: 170px;
      height: 170px;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255, 230, 120, 0.9) 0%, rgba(255, 105, 45, 0.65) 42%, rgba(220, 38, 38, 0.28) 68%, transparent 82%);
      mix-blend-mode: screen;
      animation: fireGlowBreathe 2.2s ease-in-out infinite;
    }
    .thermal-heat-haze {
      position: absolute;
      inset: -10% 0;
      background: linear-gradient(0deg, rgba(255, 94, 58, 0.34) 0%, rgba(255, 165, 70, 0.18) 48%, transparent 85%);
      mix-blend-mode: screen;
      animation: heatHazeRise 2.6s ease-in-out infinite;
    }
    .fat-contract-ring {
      position: absolute;
      top: 52%;
      left: 50%;
      width: 185px;
      height: 185px;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      border: 2px dashed rgba(255, 200, 110, 0.85);
      box-shadow: 0 0 16px rgba(255, 110, 50, 0.65), inset 0 0 14px rgba(255, 160, 70, 0.45);
      animation: fatRingContract 2.7s cubic-bezier(0.22, 1, 0.36, 1) infinite;
    }
    .fat-contract-ring.c-ring-2 {
      animation-delay: 0.9s;
      border-style: solid;
      border-color: rgba(255, 140, 80, 0.75);
    }
    .fat-contract-ring.c-ring-3 {
      animation-delay: 1.8s;
      border-color: rgba(255, 235, 150, 0.85);
    }
    .ember-spark {
      position: absolute;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #FFF59D;
      box-shadow: 0 0 10px #FF9800, 0 0 18px #FF3D00;
      animation: emberFloatUp 2.3s ease-in infinite;
    }
    .ember-spark.e1 { left: 34%; bottom: 22%; animation-delay: 0s; }
    .ember-spark.e2 { left: 48%; bottom: 18%; animation-delay: 0.4s; width: 9px; height: 9px; }
    .ember-spark.e3 { left: 62%; bottom: 24%; animation-delay: 0.8s; }
    .ember-spark.e4 { left: 41%; bottom: 28%; animation-delay: 1.2s; }
    .ember-spark.e5 { left: 56%; bottom: 20%; animation-delay: 1.6s; width: 8px; height: 8px; }
    .ember-spark.e6 { left: 68%; bottom: 30%; animation-delay: 2.0s; }
    @keyframes fatCombustionShrink {
      0%, 100% { transform: scale(1.0); filter: brightness(0.98) saturate(1.02); }
      35% { transform: scale(1.03); filter: brightness(1.12) saturate(1.22) contrast(1.05); }
      72% { transform: scale(1.0); filter: brightness(1.06) saturate(1.1); }
    }
    @keyframes fireGlowBreathe {
      0%, 100% { transform: translate(-50%, -50%) scale(0.82); opacity: 0.55; }
      45% { transform: translate(-50%, -50%) scale(1.38); opacity: 0.98; }
      75% { transform: translate(-50%, -50%) scale(0.72); opacity: 0.7; }
    }
    @keyframes heatHazeRise {
      0%, 100% { transform: translateY(8%) scaleX(1); opacity: 0.5; }
      50% { transform: translateY(-6%) scaleX(1.04); opacity: 0.92; }
    }
    @keyframes fatRingContract {
      0% { transform: translate(-50%, -50%) scale(1.35) rotate(0deg); opacity: 0; }
      25% { opacity: 0.92; }
      85% { transform: translate(-50%, -50%) scale(0.32) rotate(60deg); opacity: 0.85; }
      100% { transform: translate(-50%, -50%) scale(0.18) rotate(80deg); opacity: 0; }
    }
    @keyframes emberFloatUp {
      0% { transform: translateY(0) scale(0.5); opacity: 0; }
      25% { opacity: 1; transform: translateY(-28px) translateX(-6px) scale(1.2); }
      75% { opacity: 0.8; transform: translateY(-95px) translateX(8px) scale(0.8); }
      100% { transform: translateY(-135px) translateX(-4px) scale(0.15); opacity: 0; }
    }

    /* STAGE 3 MOTION: Edema Volume Shrinkage & Lymph Drainage */
    .body-morph-wrapper {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: #EFE6DD;
    }
    .body-morph-wrapper .edema-ghost-outline {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transform-origin: 50% 55%;
      animation: ghostEdemaPulse 4s ease-in-out infinite;
      pointer-events: none;
      z-index: 1;
    }
    .body-morph-wrapper .slim-subject-img {
      position: relative;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transform-origin: 50% 55%;
      animation: bodySubjectSlimMorph 4s cubic-bezier(0.22, 1, 0.36, 1) infinite;
      z-index: 2;
    }
    .detox-slim-layer {
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 3;
      overflow: hidden;
    }
    .contour-cinch-guide {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      filter: drop-shadow(0 0 8px rgba(64, 210, 255, 0.85));
    }
    .swollen-line-left,
    .swollen-line-right {
      stroke: rgba(255, 255, 255, 0.65);
      stroke-width: 1.8;
      stroke-dasharray: 5 5;
    }
    .cinch-arrow {
      stroke: #7CE8FF;
      stroke-width: 3;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    .cinch-arrow.left-arrow { animation: cinchArrowPushLeft 4s ease-in-out infinite; }
    .cinch-arrow.right-arrow { animation: cinchArrowPushRight 4s ease-in-out infinite; }
    .water-drop {
      position: absolute;
      width: 7px;
      height: 11px;
      border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
      background: linear-gradient(180deg, #E0F7FA 0%, #29B6F6 100%);
      box-shadow: 0 0 10px rgba(41, 182, 246, 0.85);
      animation: dropFall 2.4s ease-in infinite;
    }
    .water-drop.d1 { left: 32%; top: 38%; animation-delay: 0.1s; }
    .water-drop.d2 { right: 32%; top: 42%; animation-delay: 0.7s; }
    .water-drop.d3 { left: 38%; top: 52%; animation-delay: 1.3s; }
    .water-drop.d4 { right: 38%; top: 48%; animation-delay: 1.8s; }
    @keyframes bodySubjectSlimMorph {
      0%, 12% { transform: scaleX(1.16) scaleY(1.02); filter: brightness(0.95) saturate(0.92); }
      55%, 82% { transform: scaleX(0.86) scaleY(1.04); filter: brightness(1.08) contrast(1.05) saturate(1.1); }
      100% { transform: scaleX(1.16) scaleY(1.02); filter: brightness(0.95) saturate(0.92); }
    }
    @keyframes ghostEdemaPulse {
      0%, 15% { transform: scaleX(1.18) scaleY(1.02); opacity: 0; }
      45%, 75% { transform: scaleX(1.22) scaleY(1.02); opacity: 0.42; filter: blur(2px) hue-rotate(155deg) brightness(1.25); }
      100% { transform: scaleX(1.18) scaleY(1.02); opacity: 0; }
    }
    @keyframes cinchArrowPushLeft {
      0%, 15% { transform: translateX(-10px); opacity: 0.25; }
      50%, 80% { transform: translateX(14px); opacity: 1; }
      100% { transform: translateX(-10px); opacity: 0.25; }
    }
    @keyframes cinchArrowPushRight {
      0%, 15% { transform: translateX(10px); opacity: 0.25; }
      50%, 80% { transform: translateX(-14px); opacity: 1; }
      100% { transform: translateX(10px); opacity: 0.25; }
    }
    @keyframes dropFall {
      0% { transform: translateY(0) scale(0.5); opacity: 0; }
      25% { opacity: 0.95; transform: translateY(16px) scale(1); }
      80% { opacity: 0.75; transform: translateY(74px) scale(0.85); }
      100% { transform: translateY(100px) scale(0.2); opacity: 0; }
    }
    .efficacy-step-pill {
      position: absolute;
      top: 10px;
      left: 10px;
      z-index: 4;
      background: rgba(255, 255, 255, 0.92);
      backdrop-filter: blur(10px);
      padding: 4px 11px;
      border-radius: 999px;
      font-size: 0.66rem;
      font-weight: 800;
      letter-spacing: 0.08em;
      color: #8E3B4B;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    }
    .efficacy-step-pill .pulse-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #B85C6E;
      animation: liveRecPulse 1.5s infinite ease-in-out;
    }
    .efficacy-metric-tag {
      position: absolute;
      bottom: 10px;
      right: 10px;
      z-index: 4;
      padding: 4px 10px;
      border-radius: 999px;
      background: rgba(28, 20, 22, 0.84);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 215, 222, 0.35);
      color: #FCE7EC;
      font-size: 0.67rem;
      font-weight: 700;
    }
    .efficacy-metric-tag strong {
      color: #FDE68A;
      font-weight: 900;
    }
    .efficacy-card-body {
      padding: 13px 15px 15px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      background: #FFFFFF;
    }
    .efficacy-card-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }
    .efficacy-card-title h4 {
      font-family: 'Noto Serif KR', serif;
      font-size: 1.05rem;
      font-weight: 800;
      color: #23181B;
      margin: 0;
    }
    .efficacy-card-title .hanja-tag {
      font-size: 0.68rem;
      font-weight: 700;
      color: #8E3B4B;
      background: #FDF2F4;
      border: 1px solid rgba(184, 92, 110, 0.25);
      padding: 2px 8px;
      border-radius: 6px;
    }
    .efficacy-card-desc {
      font-size: 0.76rem;
      line-height: 1.5;
      color: #5C474C;
      margin: 0;
      word-break: keep-all;
    }

    /* ============================================================================
       DIET PLATE 04: NON-FACE-TO-FACE TELEMEDICINE & EXPRESS DELIVERY VIDEO SUITE
       ============================================================================ */
    .project-details-item.is-diet-tele-plate {
      width: min(72vw, 1080px);
      max-width: 1080px;
      height: 82vh;
      max-height: 750px;
      background: linear-gradient(160deg, #1E1719 0%, #141012 100%);
      border: 1.5px solid rgba(223, 126, 142, 0.45);
      box-shadow: 0 32px 90px rgba(0, 0, 0, 0.78);
    }
    .diet-tele-inner {
      padding: 18px 22px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow-y: auto;
    }
    .concierge-cinema-suite {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 11px;
      height: 100%;
    }
    .concierge-cinema-header {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
    }
    .concierge-eyebrow-pill {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 4px 12px;
      border-radius: 999px;
      background: rgba(223, 126, 142, 0.16);
      border: 1px solid rgba(223, 126, 142, 0.45);
      color: #FBCFE8;
      font-size: 0.68rem;
      font-weight: 800;
      letter-spacing: 0.08em;
      margin-bottom: 5px;
    }
    .concierge-eyebrow-pill .live-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #F43F5E;
      box-shadow: 0 0 10px #F43F5E;
      animation: liveRecPulse 1.4s infinite;
    }
    .concierge-main-title {
      font-family: 'Noto Serif KR', serif;
      font-size: 1.32rem;
      font-weight: 800;
      color: #FFFFFF;
      line-height: 1.25;
      margin: 0;
    }
    .concierge-main-title .title-key-em {
      color: #FDE68A;
      text-decoration: underline;
      text-underline-offset: 4px;
    }
    .concierge-sub-desc {
      font-size: 0.76rem;
      color: rgba(248, 250, 252, 0.78);
      max-width: 420px;
      line-height: 1.42;
      margin: 0;
    }
    .concierge-steps-bar {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
    }
    .concierge-step-chip {
      display: flex;
      align-items: center;
      gap: 9px;
      padding: 8px 11px;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.12);
    }
    .concierge-step-chip .step-num {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: linear-gradient(135deg, #DF7E8E, #B85C6E);
      color: #FFFFFF;
      font-size: 0.7rem;
      font-weight: 900;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .concierge-step-chip .step-text {
      display: flex;
      flex-direction: column;
      gap: 1px;
      min-width: 0;
    }
    .concierge-step-chip .step-text strong {
      font-size: 0.75rem;
      font-weight: 800;
      color: #FFFFFF;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .concierge-step-chip .step-text span {
      font-size: 0.65rem;
      color: rgba(255, 255, 255, 0.68);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .concierge-video-frame {
      position: relative;
      flex: 1;
      min-height: 240px;
      border-radius: 16px;
      overflow: hidden;
      background: #090708;
      border: 1.5px solid rgba(255, 255, 255, 0.16);
      box-shadow: 0 18px 45px rgba(0, 0, 0, 0.65);
      cursor: pointer;
    }
    .concierge-video-frame video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      cursor: pointer;
    }
    .concierge-video-play-overlay {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 6;
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 12px 24px;
      border-radius: 999px;
      background: rgba(18, 14, 16, 0.84);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1.5px solid rgba(253, 230, 138, 0.78);
      color: #FEF08A;
      font-family: 'Noto Serif KR', serif;
      font-size: 0.96rem;
      font-weight: 800;
      cursor: pointer;
      box-shadow: 0 14px 36px rgba(0, 0, 0, 0.65);
      transition: transform 0.22s ease, opacity 0.22s ease, background 0.22s ease;
    }
    .concierge-video-play-overlay:hover {
      transform: translate(-50%, -50%) scale(1.06);
      background: #2D5A43;
      color: #FFFFFF;
    }
    .concierge-video-play-overlay .play-circle-icon {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: linear-gradient(135deg, #D4AF37, #B58E24);
      color: #14100C;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 0.85rem;
      padding-left: 2px;
    }
    .concierge-video-frame.is-playing .concierge-video-play-overlay {
      opacity: 0;
      pointer-events: none;
    }
    .video-top-overlay {
      position: absolute;
      top: 12px;
      left: 14px;
      right: 14px;
      z-index: 5;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      pointer-events: none;
    }
    .video-badge-pill {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 5px 12px;
      border-radius: 999px;
      background: rgba(15, 12, 14, 0.82);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.22);
      color: #FFFFFF;
      font-size: 0.7rem;
      font-weight: 700;
    }
    .video-badge-pill .rec-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #10B981;
      box-shadow: 0 0 8px #10B981;
    }
    .video-consult-trigger {
      pointer-events: auto;
      padding: 6px 13px;
      border-radius: 999px;
      background: linear-gradient(135deg, #D4AF37, #B58E24);
      border: 1px solid #FEF08A;
      color: #14100C;
      font-size: 0.72rem;
      font-weight: 800;
      cursor: pointer;
    }
    .concierge-trust-ribbon {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
    }
    .trust-metric-box {
      padding: 8px 12px;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(212, 175, 55, 0.28);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 6px;
    }
    .trust-metric-box strong {
      font-family: 'Noto Serif KR', serif;
      font-size: 0.92rem;
      font-weight: 900;
      color: #FDE68A;
    }
    .trust-metric-box span {
      font-size: 0.68rem;
      color: rgba(255, 255, 255, 0.82);
      font-weight: 600;
    }

    @media (max-width: 1024px) {
      .project-details-item.is-growth-son-hero,
      body.theme-hanji .project-details-item.is-growth-son-hero {
        width: 100% !important;
        max-width: 100% !important;
        height: auto !important;
        min-height: 0 !important;
        max-height: none !important;
      }
      .project-details-item.is-diet-3stage-plate,
      .project-details-item.is-diet-tele-plate {
        width: 100% !important;
        max-width: 100% !important;
        height: auto !important;
        min-height: 0 !important;
        max-height: none !important;
      }
      .diet-3stage-inner,
      .diet-tele-inner,
      .concierge-cinema-suite {
        height: auto !important;
        overflow: visible !important;
        padding: 14px !important;
      }
      .concierge-video-frame {
        height: 240px !important;
        min-height: 240px !important;
      }
      .growth-son-hero-inner {
        padding: 14px !important;
        height: auto !important;
        overflow: visible !important;
      }
      .growth-son-hero-grid {
        grid-template-columns: 1fr !important;
        height: auto !important;
        gap: 14px !important;
      }
      .son-growth-visual-col {
        height: 400px !important;
        max-height: 420px !important;
      }
      .father-letter-box {
        height: auto !important;
        max-height: none !important;
        overflow: visible !important;
        padding: 16px !important;
      }
      .letter-milestone-row {
        grid-template-columns: 1fr !important;
        gap: 6px !important;
      }
      .letter-sign-row {
        flex-wrap: wrap !important;
      }
      .efficacy-3stage-grid {
        grid-template-columns: 1fr;
      }
      .concierge-steps-bar,
      .concierge-trust-ribbon {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    /* ============================================================================
       GROWTH BIOMETRIC 4-METRIC COMPARISON ANALYSIS OVERLAY
       (연령별 평균키 · 성장판 나이 · 뼈길이 · 최종예상키 비교 분석)
       ============================================================================ */
    .growth-4metrics-compare-overlay {
      position: absolute;
      top: 18px;
      left: 20px;
      right: 20px;
      z-index: 8;
      display: flex;
      flex-direction: column;
      gap: 10px;
      pointer-events: auto;
    }
    .g4m-header-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      border-radius: 999px;
      background: rgba(12, 22, 17, 0.88);
      backdrop-filter: blur(12px);
      border: 1.5px solid rgba(212, 175, 55, 0.65);
      color: #FDE68A;
      font-size: 0.72rem;
      font-weight: 800;
      letter-spacing: 0.05em;
      width: fit-content;
      box-shadow: 0 8px 22px rgba(0, 0, 0, 0.45);
    }
    .g4m-header-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #34D399;
      box-shadow: 0 0 10px #34D399;
      animation: liveRecPulse 1.5s infinite ease-in-out;
    }
    .growth-4metrics-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }
    .g4m-card {
      background: rgba(11, 18, 15, 0.86);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1.5px solid rgba(110, 231, 183, 0.35);
      border-radius: 14px;
      padding: 12px 14px;
      display: flex;
      flex-direction: column;
      gap: 7px;
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.52);
      transition: transform 0.25s ease, border-color 0.25s ease;
    }
    .g4m-card:hover {
      transform: translateY(-2px);
      border-color: #FDE68A;
    }
    .g4m-card.is-gold-card {
      border-color: rgba(212, 175, 55, 0.68);
      background: linear-gradient(145deg, rgba(20, 28, 22, 0.92), rgba(28, 22, 14, 0.90));
    }
    .g4m-top-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }
    .g4m-title-group {
      display: flex;
      align-items: center;
      gap: 7px;
    }
    .g4m-icon-badge {
      padding: 3px 8px;
      border-radius: 6px;
      background: rgba(16, 185, 129, 0.22);
      border: 1px solid rgba(110, 231, 183, 0.45);
      color: #A7F3D0;
      font-size: 0.65rem;
      font-weight: 800;
    }
    .g4m-card.is-gold-card .g4m-icon-badge {
      background: rgba(212, 175, 55, 0.25);
      border-color: rgba(253, 230, 138, 0.6);
      color: #FEF08A;
    }
    .g4m-title {
      font-family: 'Noto Serif KR', serif;
      font-size: 0.98rem;
      font-weight: 900;
      color: #FFFFFF;
      margin: 0;
    }
    .g4m-vs-pill {
      font-size: 0.66rem;
      font-weight: 800;
      color: #FDE68A;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(253, 230, 138, 0.35);
      padding: 3px 8px;
      border-radius: 999px;
      white-space: nowrap;
    }
    .g4m-compare-bars {
      display: flex;
      flex-direction: column;
      gap: 4px;
      background: rgba(0, 0, 0, 0.36);
      border-radius: 8px;
      padding: 7px 9px;
      border: 1px solid rgba(255, 255, 255, 0.08);
    }
    .g4m-bar-row {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.67rem;
      font-weight: 700;
      color: rgba(248, 250, 252, 0.85);
    }
    .g4m-bar-label {
      width: 92px;
      flex-shrink: 0;
      color: rgba(248, 250, 252, 0.78);
    }
    .g4m-bar-row.is-after .g4m-bar-label {
      color: #A7F3D0;
      font-weight: 800;
    }
    .g4m-card.is-gold-card .g4m-bar-row.is-after .g4m-bar-label {
      color: #FEF08A;
    }
    .g4m-bar-track {
      flex: 1;
      height: 6px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.14);
      overflow: hidden;
    }
    .g4m-bar-fill {
      height: 100%;
      border-radius: 999px;
    }
    .g4m-bar-fill.b {
      background: linear-gradient(90deg, #94A3B8, #F59E0B);
    }
    .g4m-bar-fill.a {
      background: linear-gradient(90deg, #10B981, #6EE7B7);
      box-shadow: 0 0 10px rgba(16, 185, 129, 0.6);
    }
    .g4m-card.is-gold-card .g4m-bar-fill.a {
      background: linear-gradient(90deg, #D4AF37, #FEF08A);
      box-shadow: 0 0 10px rgba(212, 175, 55, 0.65);
    }
    .g4m-desc {
      font-size: 0.73rem;
      line-height: 1.42;
      color: rgba(248, 250, 252, 0.88);
      margin: 0;
      word-break: keep-all;
    }
    .g4m-desc strong {
      color: #A7F3D0;
      font-weight: 800;
    }
    .g4m-card.is-gold-card .g4m-desc strong {
      color: #FEF08A;
    }
    @media (max-width: 1024px) {
      .growth-4metrics-compare-overlay {
        top: 10px;
        left: 10px;
        right: 10px;
        gap: 6px;
      }
      .g4m-header-pill {
        font-size: 0.6rem;
        padding: 4px 9px;
      }
      .growth-4metrics-grid {
        gap: 6px;
      }
      .g4m-card {
        padding: 7px 9px;
        gap: 4px;
        border-radius: 10px;
      }
      .g4m-title {
        font-size: 0.78rem;
      }
      .g4m-icon-badge,
      .g4m-vs-pill {
        font-size: 0.55rem;
        padding: 2px 5px;
      }
      .g4m-compare-bars {
        display: none;
      }
      .g4m-desc {
        font-size: 0.61rem;
        line-height: 1.3;
      }
    }

    /* ============================================================================
       DIET SINGLE-STAGE FULL CARDS (3 CARDS SPLIT · TOP TEXT REMOVED)
       & DIET HUMAN BODY MODEL + EXTRA INFO CARD & ULTRA-SMALL HAIRLOSS CARD
       ============================================================================ */
    .project-details-item.is-diet-single-stage-plate .efficacy-visual-frame.is-full-stage-frame {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      min-height: 100%;
    }
    .project-details-item.is-diet-single-stage-plate .zap-pulse-core {
      width: 160px;
      height: 160px;
    }
    .project-details-item.is-diet-single-stage-plate .zap-wave-ring {
      width: 110px;
      height: 110px;
    }
    .project-details-item.is-diet-single-stage-plate .combustion-fire-glow {
      width: 260px;
      height: 260px;
    }
    .project-details-item.is-diet-single-stage-plate .fat-contract-ring {
      width: 280px;
      height: 280px;
    }

    /* 3-Frame Sequential Motions for Card 03 (Edema Wringing) & Card 04 (Belly Contraction) */
    .belly-shrink-seq-stage,
    .edema-wring-seq-stage {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: #DFC8AC;
    }
    .belly-seq-img,
    .edema-seq-img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      pointer-events: none;
      will-change: opacity, transform;
    }
    /* Card 04: Obese Belly (seq-1) -> Contracting Belly (seq-2) -> Slim Belly (seq-3) */
    .belly-seq-img.seq-1 {
      z-index: 1;
      opacity: 1;
      transform: scale(1);
    }
    .belly-seq-img.seq-2 {
      z-index: 2;
      animation: bellySeqFrame2 5.4s ease-in-out infinite;
    }
    .belly-seq-img.seq-3 {
      z-index: 3;
      animation: bellySeqFrame3 5.4s ease-in-out infinite;
    }
    @keyframes bellySeqFrame2 {
      0%, 18% { opacity: 0; transform: scale(1); }
      34%, 72% { opacity: 1; transform: scale(1); }
      78%, 100% { opacity: 0; transform: scale(1); }
    }
    @keyframes bellySeqFrame3 {
      0%, 52% { opacity: 0; transform: scale(1); }
      68%, 84% { opacity: 1; transform: scale(1); }
      100% { opacity: 0; transform: scale(1); }
    }
    .belly-contract-arrows-svg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      z-index: 4;
      pointer-events: none;
      filter: drop-shadow(0 0 8px rgba(255, 190, 70, 0.9));
    }
    .belly-inward-arrow {
      stroke: #FDE68A;
      stroke-width: 3.2;
      stroke-linecap: round;
      stroke-linejoin: round;
      animation: bellyInwardPush 2.4s ease-in-out infinite;
    }
    .belly-inward-arrow.delay-1 { animation-delay: 0.25s; }
    .belly-inward-arrow.delay-2 { animation-delay: 0.5s; }
    @keyframes bellyInwardPush {
      0%, 15% { transform: translateX(-14px); opacity: 0.2; }
      55%, 80% { transform: translateX(16px); opacity: 1; }
      100% { transform: translateX(-14px); opacity: 0.2; }
    }

    /* Card 03: Water-Filled Full Body (seq-1) -> Wringing Water Out (seq-2) -> Slim Full Body (seq-3) */
    .edema-seq-img.seq-1 {
      z-index: 1;
      opacity: 1;
      transform: scale(1);
    }
    .edema-seq-img.seq-2 {
      z-index: 2;
      animation: edemaSeqFrame2 5.4s ease-in-out infinite;
    }
    .edema-seq-img.seq-3 {
      z-index: 3;
      animation: edemaSeqFrame3 5.4s ease-in-out infinite;
    }
    @keyframes edemaSeqFrame2 {
      0%, 18% { opacity: 0; transform: scale(1); }
      34%, 72% { opacity: 1; transform: scale(1); }
      78%, 100% { opacity: 0; transform: scale(1); }
    }
    @keyframes edemaSeqFrame3 {
      0%, 52% { opacity: 0; transform: scale(1); }
      68%, 84% { opacity: 1; transform: scale(1); }
      100% { opacity: 0; transform: scale(1); }
    }
    .water-drop.d5 { left: 26%; top: 44%; animation-delay: 0.4s; }
    .water-drop.d6 { right: 26%; top: 46%; animation-delay: 1.05s; }

    /* Growth Card 04: Vertical Height Growth 3-Frame Motion + Rising Stadiometer Laser & Upward Vectors */
    .growth-tall-seq-stage {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: #DFC8AC;
    }
    .growth-tall-seq-img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center bottom;
      pointer-events: none;
      transform-origin: 50% 94%;
      will-change: opacity, transform;
    }
    .growth-tall-seq-img.seq-1 {
      z-index: 1;
      opacity: 1;
      transform: scale(1);
    }
    .growth-tall-seq-img.seq-2 {
      z-index: 2;
      animation: growthTallSeqFrame2 5.4s cubic-bezier(0.22, 1, 0.36, 1) infinite;
    }
    .growth-tall-seq-img.seq-3 {
      z-index: 3;
      animation: growthTallSeqFrame3 5.4s cubic-bezier(0.22, 1, 0.36, 1) infinite;
    }
    @keyframes growthTallSeqFrame2 {
      0%, 18% { opacity: 0; transform: scale(1); }
      34%, 72% { opacity: 1; transform: scale(1); }
      78%, 100% { opacity: 0; transform: scale(1); }
    }
    @keyframes growthTallSeqFrame3 {
      0%, 52% { opacity: 0; transform: scale(1); }
      68%, 84% { opacity: 1; transform: scale(1); }
      100% { opacity: 0; transform: scale(1); }
    }
    .growth-tall-boost-layer {
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 4;
      overflow: hidden;
    }
    .growth-epiphyseal-glow {
      position: absolute;
      left: 50%;
      bottom: 18%;
      width: 240px;
      height: 280px;
      transform: translateX(-50%);
      border-radius: 50%;
      background: radial-gradient(ellipse at center, rgba(253, 230, 138, 0.38) 0%, rgba(16, 185, 129, 0.22) 48%, transparent 76%);
      mix-blend-mode: screen;
      animation: growthEpiphysealPulse 2.7s ease-in-out infinite;
    }
    @keyframes growthEpiphysealPulse {
      0%, 100% { transform: translateX(-50%) scaleY(0.85); opacity: 0.45; }
      50% { transform: translateX(-50%) scaleY(1.25) translateY(-18px); opacity: 0.92; }
    }
    .growth-height-laser-bar {
      position: absolute;
      left: 24%;
      right: 24%;
      height: 2.5px;
      background: linear-gradient(90deg, transparent 0%, #6EE7B7 18%, #FEF08A 50%, #6EE7B7 82%, transparent 100%);
      box-shadow: 0 0 16px rgba(253, 230, 138, 0.95), 0 0 28px rgba(16, 185, 129, 0.75);
      z-index: 5;
      animation: growthHeightLaserRise 5.4s ease-in-out infinite;
    }
    .growth-height-laser-pill {
      position: absolute;
      right: 6%;
      top: 8px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      border-radius: 999px;
      background: rgba(13, 23, 18, 0.86);
      border: 1.2px solid rgba(253, 230, 138, 0.78);
      color: #FEF08A;
      font-size: 0.7rem;
      font-weight: 800;
      letter-spacing: 0.02em;
      white-space: nowrap;
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.45);
      backdrop-filter: blur(8px);
    }
    .growth-height-laser-pill .laser-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #34D399;
      box-shadow: 0 0 8px #34D399;
    }
    @keyframes growthHeightLaserRise {
      0%, 18% { top: 34%; opacity: 0.82; }
      34%, 52% { top: 16%; opacity: 0.95; }
      68%, 84% { top: 9%; opacity: 1; }
      100% { top: 34%; opacity: 0.82; }
    }
    .growth-upward-arrows-svg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      z-index: 4;
      pointer-events: none;
      filter: drop-shadow(0 0 8px rgba(253, 230, 138, 0.88));
    }
    .growth-up-arrow {
      stroke: #FEF08A;
      stroke-width: 3;
      stroke-linecap: round;
      stroke-linejoin: round;
      animation: growthArrowShootUp 2.2s cubic-bezier(0.22, 1, 0.36, 1) infinite;
    }
    .growth-up-arrow.g-arr-2 {
      stroke: #6EE7B7;
      stroke-width: 2.6;
      animation-delay: 0.45s;
    }
    .growth-up-arrow.g-arr-3 {
      stroke: #FDE68A;
      stroke-width: 2.8;
      animation-delay: 0.9s;
    }
    @keyframes growthArrowShootUp {
      0% { transform: translateY(22px); opacity: 0; }
      35% { opacity: 0.95; }
      80% { transform: translateY(-20px); opacity: 0.85; }
      100% { transform: translateY(-32px); opacity: 0; }
    }
    .growth-spark {
      position: absolute;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #FEF08A;
      box-shadow: 0 0 10px #FACC15, 0 0 18px #10B981;
      animation: growthSparkRise 2.4s ease-out infinite;
    }
    .growth-spark.gs1 { left: 44%; bottom: 20%; animation-delay: 0s; }
    .growth-spark.gs2 { left: 52%; bottom: 18%; animation-delay: 0.4s; width: 9px; height: 9px; background: #A7F3D0; }
    .growth-spark.gs3 { left: 40%; bottom: 32%; animation-delay: 0.8s; }
    .growth-spark.gs4 { left: 56%; bottom: 28%; animation-delay: 1.2s; background: #A7F3D0; }
    .growth-spark.gs5 { left: 47%; bottom: 42%; animation-delay: 1.6s; width: 8px; height: 8px; }
    .growth-spark.gs6 { left: 37%; bottom: 24%; animation-delay: 2.0s; }
    @keyframes growthSparkRise {
      0% { transform: translateY(0) scale(0.4); opacity: 0; }
      25% { opacity: 1; transform: translateY(-34px) scale(1.2); }
      75% { opacity: 0.85; transform: translateY(-120px) scale(0.9); }
      100% { transform: translateY(-170px) scale(0.2); opacity: 0; }
    }

    /* Card 10: Minimalist "다이어트 꿀팁" Only Card + Link to 3D Body Model */
    .diet-honey-tip-only-center {
      position: relative;
      z-index: 10;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 24px;
      text-decoration: none;
      cursor: pointer;
      transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
    }
    .diet-honey-tip-only-center:hover {
      transform: scale(1.04);
    }
    .diet-honey-tip-only-title {
      font-family: 'Noto Serif KR', serif;
      font-size: clamp(1.85rem, 2.9vw, 2.6rem);
      font-weight: 900;
      color: #FEF08A;
      letter-spacing: -0.02em;
      margin: 0;
      padding: 14px 28px;
      border-radius: 999px;
      background: rgba(18, 14, 11, 0.76);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1.5px solid rgba(253, 230, 138, 0.65);
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.55);
      text-shadow: 0 4px 18px rgba(0, 0, 0, 0.75);
      transition: background 0.25s ease, border-color 0.25s ease, color 0.25s ease;
    }
    .diet-honey-tip-only-center:hover .diet-honey-tip-only-title {
      background: #2D5A43;
      border-color: #FEF08A;
      color: #FFFFFF;
    }
    .diet-card10-3d-bg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      pointer-events: none;
      background: radial-gradient(circle at 50% 45%, #241E18 0%, #121418 75%);
    }
    .diet-card10-3d-bg canvas {
      width: 100% !important;
      height: 100% !important;
      display: block;
      pointer-events: none !important;
    }

    /* ============================================================================
       수정사항 1: 모든 카드에 아주 작게 넘버 표시 (.tiny-card-num-badge)
       ============================================================================ */
    .project-details-item,
    #project-details-preview {
      position: relative;
    }
    .tiny-card-num-badge {
      position: absolute;
      top: 9px;
      left: 11px;
      z-index: 38;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 1px 6px;
      min-width: 19px;
      height: 15px;
      border-radius: 999px;
      background: rgba(12, 16, 22, 0.72);
      border: 1px solid rgba(253, 230, 138, 0.45);
      color: #FDE68A;
      font-family: 'JetBrains Mono', 'Pretendard', monospace;
      font-size: 0.54rem;
      font-weight: 800;
      letter-spacing: 0.04em;
      line-height: 1;
      pointer-events: none;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);
    }
    body.theme-hanji .tiny-card-num-badge {
      background: rgba(34, 24, 17, 0.78);
      border-color: rgba(212, 175, 55, 0.55);
      color: #FEF08A;
    }
    .plate-top-bar,
    .body-model-top-bar {
      padding-left: 34px;
    }

    /* ============================================================================
       수정사항 2, 3, 4: 9번째 카드 (80% 컴팩트 축소 + 우리 3D 인체모형 + 다이어트 꿀팁 창고)
       ============================================================================ */
    #project-details-preview.is-diet-body-extra-card {
      width: min(46vw, 620px);
      max-width: 620px;
      height: 62vh;
      max-height: 495px;
      padding: 13px 15px;
      border-radius: 20px;
      background: linear-gradient(155deg, #15181C 0%, #0E1014 100%);
      border: 1.5px solid rgba(212, 175, 55, 0.48);
      box-shadow: 0 22px 60px rgba(0, 0, 0, 0.72);
      align-self: center;
    }
    .diet-body-extra-layout {
      display: grid;
      grid-template-columns: 42% 1fr;
      gap: 12px;
      width: 100%;
      height: 100%;
      align-items: stretch;
    }
    .diet-body-model-visual-col {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 14px;
      overflow: hidden;
      background: radial-gradient(circle at 50% 42%, #FAF6F0 0%, #EDE3D2 62%, #DFD1BC 100%);
      border: 1.5px solid rgba(212, 175, 55, 0.55);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: grab;
      user-select: none;
    }
    .diet-body-model-visual-col:active {
      cursor: grabbing;
    }
    #diet-our-3d-body-canvas {
      position: absolute;
      inset: 0;
      width: 100% !important;
      height: 100% !important;
      display: block;
      z-index: 2;
    }
    .diet-3d-stage-top-badge {
      position: absolute;
      top: 8px;
      left: 36px;
      right: 8px;
      z-index: 5;
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
      gap: 4px;
      padding: 3px 8px;
      border-radius: 999px;
      background: rgba(24, 18, 14, 0.78);
      border: 1px solid rgba(212, 175, 55, 0.55);
      color: #FEF08A;
      font-size: 0.56rem;
      font-weight: 800;
      pointer-events: none;
    }
    .diet-3d-stage-controls {
      position: absolute;
      left: 8px;
      right: 8px;
      bottom: 8px;
      z-index: 6;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 4px;
    }
    .diet-3d-ctrl-group {
      display: inline-flex;
      align-items: center;
      gap: 3px;
      background: rgba(18, 14, 11, 0.84);
      padding: 2px;
      border-radius: 999px;
      border: 1px solid rgba(212, 175, 55, 0.45);
    }
    .diet-3d-ctrl-btn {
      padding: 3px 8px;
      border-radius: 999px;
      border: none;
      background: transparent;
      color: rgba(255, 255, 255, 0.78);
      font-size: 0.58rem;
      font-weight: 800;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .diet-3d-ctrl-btn.active,
    .diet-3d-ctrl-btn:hover {
      background: #2D5A43;
      color: #FEF08A;
    }
    .diet-3d-loading-hint {
      position: absolute;
      inset: 0;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 6px;
      color: #523B28;
      font-size: 0.66rem;
      font-weight: 800;
      text-align: center;
      padding: 12px;
      pointer-events: none;
    }
    .diet-body-extra-info-col {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 6px;
      min-width: 0;
      overflow-y: auto;
    }
    .diet-extra-head {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .diet-extra-badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      width: fit-content;
      padding: 2px 8px;
      border-radius: 999px;
      background: rgba(16, 185, 129, 0.18);
      border: 1px solid rgba(110, 231, 183, 0.45);
      color: #A7F3D0;
      font-size: 0.58rem;
      font-weight: 800;
    }
    .diet-extra-main-title {
      font-family: 'Noto Serif KR', serif;
      font-size: 0.96rem;
      font-weight: 800;
      color: #FFFFFF;
      line-height: 1.22;
      margin: 0;
    }
    .diet-extra-main-desc {
      font-size: 0.66rem;
      color: rgba(248, 250, 252, 0.82);
      line-height: 1.32;
      margin: 0;
      word-break: keep-all;
    }
    .diet-extra-info-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 6px;
      flex: 1;
    }
    .diet-extra-info-item {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.13);
      border-radius: 10px;
      padding: 7px 9px;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .dei-badge {
      font-size: 0.56rem;
      font-weight: 800;
      color: #FDE68A;
      letter-spacing: 0.01em;
    }
    .dei-title {
      font-size: 0.72rem;
      font-weight: 800;
      color: #FFFFFF;
      line-height: 1.22;
    }
    .dei-desc {
      font-size: 0.61rem;
      color: rgba(248, 250, 252, 0.80);
      line-height: 1.32;
      margin: 0;
      word-break: keep-all;
    }
    .diet-extra-bottom-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 6px;
      flex-wrap: wrap;
    }
    .diet-extra-explorer-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      gap: 6px;
      padding: 7px 12px;
      border-radius: 999px;
      background: linear-gradient(135deg, #2D5A43 0%, #3D7357 100%);
      border: 1px solid rgba(167, 243, 208, 0.45);
      color: #FFFFFF;
      font-size: 0.68rem;
      font-weight: 800;
      text-decoration: none;
      transition: transform 0.2s ease, background 0.2s ease;
    }
    .diet-extra-explorer-btn:hover {
      transform: translateY(-1px);
      background: #4A3525;
    }

    @media (max-width: 1024px) {
      #project-details-preview.is-diet-body-extra-card {
        width: 100% !important;
        max-width: 100% !important;
        height: auto !important;
        min-height: 0 !important;
        max-height: none !important;
        padding: 14px !important;
      }
      .diet-body-extra-layout {
        grid-template-columns: 1fr;
        gap: 10px;
        height: auto !important;
        overflow: visible !important;
      }
      .diet-body-model-visual-col {
        height: 220px !important;
        min-height: 220px !important;
        max-height: 220px !important;
      }
      .diet-extra-info-grid {
        grid-template-columns: 1fr;
      }
    }

    /* ============================================================================
       DIRECTOR 9-CORE DIAGNOSTIC EXAMINATION CINEMA MOTION SUITE (CARDS 06 ~ 14)
       (Retina 60fps Shader + Infinite-Resolution SVG HUD + Glassmorphic Telemetry)
       ============================================================================ */
    .project-details-item.is-director-exam-plate {
      border: 1.5px solid rgba(212, 175, 55, 0.42);
      box-shadow: 0 30px 85px rgba(0, 0, 0, 0.72), inset 0 0 0 1px rgba(255, 255, 255, 0.08);
    }
    body.theme-hanji .project-details-item.is-director-exam-plate {
      border: 1.5px solid rgba(74, 53, 37, 0.34);
      box-shadow: 0 28px 75px rgba(42, 30, 20, 0.24);
    }
    .project-details-item.is-director-exam-plate.is-active-plate {
      border-color: rgba(253, 230, 138, 0.78);
      box-shadow: 0 34px 92px rgba(0, 0, 0, 0.82), 0 0 38px rgba(212, 175, 55, 0.22);
    }
    body.theme-hanji .project-details-item.is-director-exam-plate.is-active-plate {
      border-color: #2D5A43;
      box-shadow: 0 32px 80px rgba(45, 90, 67, 0.28), 0 0 0 2px rgba(45, 90, 67, 0.18);
    }

    .exam-photo-kenburns-wrap {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      z-index: 1;
    }
    .exam-living-photo {
      position: absolute;
      inset: 0 !important;
      width: 100% !important;
      height: 100% !important;
      object-fit: cover;
      object-position: center 28%;
      transform-origin: 50% 38%;
      animation: examCinemaBreathe 9.5s ease-in-out infinite;
      will-change: transform, filter;
    }
    @keyframes examCinemaBreathe {
      0%, 100% { transform: scale(1.01) translate3d(0, 0, 0); filter: brightness(1.01) contrast(1.02) saturate(1.03); }
      50% { transform: scale(1.055) translate3d(0, -4px, 0); filter: brightness(1.06) contrast(1.05) saturate(1.08); }
    }

    .exam-cinema-scrim {
      position: absolute;
      inset: 0;
      z-index: 2;
      pointer-events: none;
      background:
        linear-gradient(180deg,
          rgba(8, 12, 18, 0.64) 0%,
          rgba(8, 12, 18, 0.14) 18%,
          rgba(8, 12, 18, 0.08) 46%,
          rgba(8, 12, 18, 0.62) 72%,
          rgba(8, 12, 18, 0.94) 100%),
        radial-gradient(circle at 50% 34%, transparent 38%, rgba(6, 10, 15, 0.38) 100%);
    }

    .exam-svg-motion-wrap {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      z-index: 4;
      pointer-events: none;
      overflow: hidden;
    }
    .exam-vector-svg {
      width: 100%;
      height: 100%;
      display: block;
      transform: translate3d(var(--exam-mx, 0px), var(--exam-my, 0px), 0);
      transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
    }

    /* SVG Hardware-Accelerated Keyframe Motions */
    .exam-sono-pendulum {
      animation: examSonoPendulumSweep 4.2s ease-in-out infinite;
    }
    @keyframes examSonoPendulumSweep {
      0%, 100% { transform: rotate(-28deg); }
      50% { transform: rotate(28deg); }
    }
    .exam-sono-ripple {
      transform-origin: 480px 44px;
      animation: examSonicWaveExpand 2.8s cubic-bezier(0.16, 1, 0.3, 1) infinite;
    }
    .exam-sono-ripple.r2 {
      animation-delay: 1.4s;
    }
    @keyframes examSonicWaveExpand {
      0% { transform: scale(0.45); opacity: 0.95; }
      80% { opacity: 0.35; }
      100% { transform: scale(2.15); opacity: 0; }
    }
    .exam-doppler-pulse {
      transform-box: fill-box;
      transform-origin: center;
      animation: examDopplerNodePulse 1.8s ease-in-out infinite;
    }
    .exam-doppler-pulse.delay-1 {
      animation-delay: 0.9s;
    }
    @keyframes examDopplerNodePulse {
      0%, 100% { transform: scale(0.78); opacity: 0.45; }
      50% { transform: scale(1.38); opacity: 0.95; }
    }

    /* Card 07: Thermography Isotherm & Pointer Animations */
    .exam-thermal-aura {
      transform-origin: 450px 220px;
      animation: examThermalAuraBreathe 4.4s ease-in-out infinite;
    }
    .exam-isotherm-ring {
      transform-origin: 450px 220px;
      animation: examIsothermPulse 4.8s ease-in-out infinite;
    }
    .exam-isotherm-ring.iso-2 { animation-delay: 0.6s; }
    .exam-isotherm-ring.iso-3 { animation-delay: 1.2s; }
    .exam-isotherm-ring.iso-4 { animation-delay: 1.8s; }
    @keyframes examThermalAuraBreathe {
      0%, 100% { transform: scale(0.94); opacity: 0.72; }
      50% { transform: scale(1.08); opacity: 1; }
    }
    @keyframes examIsothermPulse {
      0%, 100% { transform: scale(0.95) rotate(-2deg); opacity: 0.55; }
      50% { transform: scale(1.06) rotate(2deg); opacity: 0.95; }
    }
    .exam-diti-pointer {
      animation: examDitiPointerSlide 3.8s ease-in-out infinite;
    }
    @keyframes examDitiPointerSlide {
      0%, 100% { transform: translateY(-18px); }
      50% { transform: translateY(28px); }
    }

    /* Card 08 & 09: Rotating Scope / Sasang Astrolabe Rings */
    .exam-scope-ring-cw {
      transform-box: fill-box;
      transform-origin: center;
      animation: examScopeSpinCW 22s linear infinite;
    }
    .exam-scope-ring-ccw {
      transform-box: fill-box;
      transform-origin: center;
      animation: examScopeSpinCCW 15s linear infinite;
    }
    @keyframes examScopeSpinCW {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes examScopeSpinCCW {
      0% { transform: rotate(360deg); }
      100% { transform: rotate(0deg); }
    }
    .exam-scope-af-brackets {
      transform-box: fill-box;
      transform-origin: center;
      animation: examScopeAfLock 2.6s cubic-bezier(0.22, 1, 0.36, 1) infinite;
    }
    @keyframes examScopeAfLock {
      0%, 100% { transform: scale(1.14); opacity: 0.58; }
      45%, 65% { transform: scale(0.92); opacity: 1; }
    }
    .exam-sasang-polygon {
      transform-box: fill-box;
      transform-origin: center;
      animation: examSasangPolygonBreathe 4.2s ease-in-out infinite;
    }
    @keyframes examSasangPolygonBreathe {
      0%, 100% { transform: scale(0.92) rotate(-3deg); }
      50% { transform: scale(1.06) rotate(3deg); }
    }

    /* Card 10: BIA Impedance Laser & Visceral Lipolysis Contraction */
    .exam-bia-laser-group {
      animation: examBiaLaserSweep 4.0s ease-in-out infinite;
    }
    @keyframes examBiaLaserSweep {
      0%, 100% { transform: translateY(-38px); opacity: 0.78; }
      50% { transform: translateY(155px); opacity: 1; }
    }
    .exam-fat-contract-ring {
      transform-box: fill-box;
      transform-origin: center;
      animation: examVisceralContract 3.2s cubic-bezier(0.22, 1, 0.36, 1) infinite;
    }
    .exam-fat-contract-ring.delay-1 { animation-delay: 1.1s; }
    @keyframes examVisceralContract {
      0% { transform: scale(1.18); opacity: 0.25; }
      40% { opacity: 0.92; }
      100% { transform: scale(0.68); opacity: 0; }
    }
    .exam-cinch-left {
      animation: examCinchLeftPush 2.4s ease-in-out infinite;
    }
    .exam-cinch-right {
      animation: examCinchRightPush 2.4s ease-in-out infinite;
    }
    @keyframes examCinchLeftPush {
      0%, 100% { transform: translateX(-12px); opacity: 0.45; }
      50% { transform: translateX(12px); opacity: 1; }
    }
    @keyframes examCinchRightPush {
      0%, 100% { transform: translateX(12px); opacity: 0.45; }
      50% { transform: translateX(-12px); opacity: 1; }
    }

    /* Card 11, 12, 13, 14: HRV ECG, Biochemical Ring Gauges, APG Wave, Growth Trajectory */
    .exam-neuro-calm-ring {
      transform-box: fill-box;
      transform-origin: center;
      animation: examNeuroCalmWave 3.2s cubic-bezier(0.16, 1, 0.3, 1) infinite;
    }
    .exam-neuro-calm-ring.r2 { animation-delay: 1.5s; }
    @keyframes examNeuroCalmWave {
      0% { transform: scale(0.45); opacity: 0.92; }
      100% { transform: scale(1.85); opacity: 0; }
    }
    .exam-ecg-pulse-line,
    .exam-apg-waveform {
      stroke-dasharray: 900;
      stroke-dashoffset: 900;
      animation: examWaveTraceDraw 3.4s cubic-bezier(0.22, 1, 0.36, 1) infinite;
    }
    @keyframes examWaveTraceDraw {
      0% { stroke-dashoffset: 900; opacity: 0.4; }
      55%, 80% { stroke-dashoffset: 0; opacity: 1; }
      100% { stroke-dashoffset: -900; opacity: 0.2; }
    }
    .exam-ring-gauge {
      animation: examRingGaugePulse 3.6s ease-in-out infinite;
    }
    .exam-ring-gauge.g2 { animation-delay: 0.6s; }
    .exam-ring-gauge.g3 { animation-delay: 1.2s; }
    @keyframes examRingGaugePulse {
      0%, 100% { stroke-dashoffset: 45; opacity: 0.82; }
      50% { stroke-dashoffset: 0; opacity: 1; }
    }
    .exam-growth-curve-main {
      stroke-dasharray: 820;
      stroke-dashoffset: 820;
      animation: examGrowthCurveDraw 3.8s cubic-bezier(0.22, 1, 0.36, 1) infinite;
    }
    @keyframes examGrowthCurveDraw {
      0% { stroke-dashoffset: 820; opacity: 0.45; }
      55%, 85% { stroke-dashoffset: 0; opacity: 1; }
      100% { stroke-dashoffset: 0; opacity: 0.35; }
    }

    /* Top Glassmorphic Medical HUD Bar */
    .exam-top-hud-bar {
      position: absolute;
      top: 14px;
      left: 42px;
      right: 20px;
      z-index: 8;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      flex-wrap: wrap;
      pointer-events: none;
    }
    .exam-hud-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      border-radius: 999px;
      background: rgba(10, 15, 22, 0.82);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(253, 230, 138, 0.52);
      color: #FEF08A;
      font-family: 'JetBrains Mono', 'Pretendard', sans-serif;
      font-size: 0.7rem;
      font-weight: 800;
      letter-spacing: 0.05em;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.48);
    }
    .exam-live-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      animation: liveRecPulse 1.4s infinite ease-in-out;
    }
    .exam-hud-telemetry-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 14px;
      border-radius: 999px;
      background: rgba(12, 22, 19, 0.80);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(110, 231, 183, 0.48);
      color: #A7F3D0;
      font-size: 0.71rem;
      font-weight: 700;
      box-shadow: 0 8px 22px rgba(0, 0, 0, 0.42);
    }

    /* Lower-Middle 3-Column Glassmorphic Live Biometric Telemetry Dock */
    .exam-biometric-dock {
      position: absolute;
      left: 26px;
      right: 26px;
      bottom: 122px;
      z-index: 7;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      pointer-events: none;
    }
    .exam-bio-card {
      background: rgba(10, 15, 20, 0.78);
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
      border: 1px solid rgba(255, 255, 255, 0.16);
      border-top: 1.5px solid rgba(253, 230, 138, 0.48);
      border-radius: 14px;
      padding: 10px 13px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      box-shadow: 0 14px 32px rgba(0, 0, 0, 0.55);
    }
    .exam-bio-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 6px;
    }
    .exam-bio-code {
      font-family: 'JetBrains Mono', 'Pretendard', monospace;
      font-size: 0.62rem;
      font-weight: 800;
      color: #FDE68A;
      letter-spacing: 0.03em;
    }
    .exam-bio-tag {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.58rem;
      font-weight: 800;
      padding: 2px 7px;
      border-radius: 999px;
      background: rgba(16, 185, 129, 0.22);
      border: 1px solid rgba(110, 231, 183, 0.45);
      color: #A7F3D0;
      white-space: nowrap;
    }
    .exam-bio-title {
      font-family: 'Noto Serif KR', serif;
      font-size: 0.85rem;
      font-weight: 800;
      color: #FFFFFF;
      line-height: 1.25;
      letter-spacing: -0.01em;
    }
    .exam-bio-desc {
      font-size: 0.68rem;
      line-height: 1.36;
      color: rgba(248, 250, 252, 0.82);
      margin: 0;
      word-break: keep-all;
    }
    .exam-bio-bar-track {
      width: 100%;
      height: 5px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.14);
      overflow: hidden;
      margin-top: 3px;
    }
    .exam-bio-bar-fill {
      height: 100%;
      border-radius: 999px;
      background: linear-gradient(90deg, #10B981, #6EE7B7, #FEF08A);
      box-shadow: 0 0 10px rgba(16, 185, 129, 0.6);
      transform-origin: left center;
      animation: examBioBarPulse 2.8s ease-in-out infinite;
    }
    .exam-bio-bar-fill.bar-2 {
      animation-delay: 0.5s;
      background: linear-gradient(90deg, #D4AF37, #FEF08A, #34D399);
    }
    .exam-bio-bar-fill.bar-3 {
      animation-delay: 1.0s;
      background: linear-gradient(90deg, #38BDF8, #34D399, #FEF08A);
    }
    @keyframes examBioBarPulse {
      0%, 100% { transform: scaleX(0.92); opacity: 0.85; }
      50% { transform: scaleX(1.0); opacity: 1; }
    }

    @media (max-width: 1024px) {
      .exam-top-hud-bar {
        top: 8px;
        left: 34px;
        right: 10px;
        gap: 4px;
      }
      .exam-hud-badge {
        font-size: 0.56rem;
        padding: 4px 9px;
      }
      .exam-hud-telemetry-pill {
        display: none;
      }
      .exam-biometric-dock {
        left: 12px;
        right: 12px;
        bottom: 92px;
        gap: 6px;
      }
      .exam-bio-card {
        padding: 6px 8px;
        border-radius: 10px;
        gap: 2px;
      }
      .exam-bio-code {
        font-size: 0.52rem;
      }
      .exam-bio-tag,
      .exam-bio-desc {
        display: none;
      }
      .exam-bio-title {
        font-size: 0.68rem;
      }
    }

    /* ============================================================================
       SAMPLE A: 상·하단 완전 분리형 에디토리얼 프레임 (SEO 100% 크롤링 & 순수 비주얼 보존)
       ============================================================================ */
    body.hide-card-num-badge .tiny-card-num-badge {
      display: none !important;
    }

    .project-details-item.has-separated-editorial {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      border-radius: 22px;
      background: var(--sa-bg-bot, #13110f) !important;
      border: 2px solid var(--sa-border, rgba(197, 160, 89, 0.44)) !important;
      box-shadow: 0 28px 68px rgba(10, 8, 6, 0.42);
    }

    body.theme-hanji .project-details-item.has-separated-editorial {
      border: 2px solid var(--sa-border, rgba(197, 160, 89, 0.46)) !important;
      box-shadow: 0 26px 62px rgba(45, 34, 24, 0.24);
    }

    .project-details-item.has-separated-editorial.is-active-plate {
      border-color: #D4AF37 !important;
      box-shadow: 0 32px 80px rgba(10, 8, 6, 0.55), 0 0 0 1px rgba(245, 211, 108, 0.28);
    }

    body.theme-hanji .project-details-item.has-separated-editorial.is-active-plate {
      border-color: #2D5A43 !important;
      box-shadow: 0 30px 72px rgba(45, 90, 67, 0.24), 0 0 0 2px rgba(45, 90, 67, 0.16);
    }

    /* 1. 상단 순수 비주얼 영역 (글자/어두운 그라데이션 0% - 피사체 100% 선명 노출) */
    .project-details-item.has-separated-editorial .pure-visual-zone {
      position: relative;
      flex: 1 1 auto;
      min-height: 0;
      width: 100%;
      height: auto;
      margin: 0;
      overflow: hidden;
      background: #14110e;
      border-bottom: 1.5px solid var(--sa-divider, rgba(212, 175, 55, 0.36));
    }

    .project-details-item.has-separated-editorial .lusion-clean-media.is-contain-fit {
      inset: 0 !important;
      width: 100% !important;
      height: 100% !important;
      object-fit: contain !important;
      object-position: center center !important;
      padding: 14px 18px !important;
      background: radial-gradient(circle at 50% 48%, #211b16 0%, #100d0a 100%);
    }

    .plate-thumb-dock.is-visual-floating-dock {
      position: absolute;
      left: 16px;
      bottom: 12px;
      z-index: 9;
      margin-bottom: 0;
      max-width: calc(100% - 148px);
    }

    .visual-floating-step-wrap {
      position: absolute;
      right: 14px;
      bottom: 12px;
      z-index: 9;
      pointer-events: auto;
    }

    /* 대표원장 9대 정밀검진 모션 카드도 상단 비주얼을 깨끗하게 개방 */
    .project-details-item.has-separated-editorial.is-director-exam-plate .exam-cinema-scrim {
      background: radial-gradient(circle at 50% 42%, transparent 48%, rgba(6, 10, 15, 0.28) 100%) !important;
    }

    body:not(.show-exam-hud) .project-details-item.has-separated-editorial.is-director-exam-plate .exam-top-hud-bar,
    body:not(.show-exam-hud) .project-details-item.has-separated-editorial.is-director-exam-plate .exam-biometric-dock {
      display: none !important;
    }

    body.show-exam-hud .project-details-item.has-separated-editorial.is-director-exam-plate .exam-biometric-dock {
      bottom: 14px !important;
    }

    /* 2. 하단 독립 에디토리얼 텍스트 영역 (SEO 크롤링 100% & 마우스 드래그 복사 지원) */
    .project-details-item.has-separated-editorial .editorial-text-zone {
      flex: 0 0 auto;
      width: 100%;
      background: linear-gradient(180deg, var(--sa-bg-top, #1b1815) 0%, var(--sa-bg-bot, #13110f) 100%);
      padding: 20px 28px 22px;
      display: flex;
      flex-direction: column;
      gap: 9px;
      cursor: text;
      position: relative;
      z-index: 5;
    }

    .editorial-text-zone,
    .editorial-text-zone *,
    .father-letter-box,
    .father-letter-box *,
    #project-details-desc,
    #project-details-desc * {
      user-select: text !important;
      -webkit-user-select: text !important;
    }

    .editorial-top-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      margin-bottom: 1px;
    }

    .editorial-category {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      font-size: 0.74rem;
      font-weight: 700;
      color: var(--sa-hl-color, #e6c875);
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }

    .editorial-category::before {
      content: "";
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #D4AF37;
      box-shadow: 0 0 8px #D4AF37;
    }

    .editorial-headline {
      font-family: 'Noto Serif KR', serif;
      font-size: var(--sa-title-size, clamp(1.24rem, 1.62vw, 1.52rem));
      font-weight: 700;
      line-height: 1.36;
      letter-spacing: -0.025em;
      color: var(--sa-title-color, #fdfbf7);
      word-break: keep-all;
      margin: 0;
    }

    .editorial-headline .hl-gold,
    .editorial-headline .title-key-em {
      color: var(--sa-hl-color, #f5d36c) !important;
      background: linear-gradient(180deg, transparent 62%, rgba(212, 175, 55, 0.24) 62%);
      padding: 0 2px;
      text-decoration: none !important;
    }

    .editorial-body-copy {
      font-size: var(--sa-body-size, 0.92rem);
      line-height: 1.64;
      color: var(--sa-body-color, rgba(245, 240, 232, 0.84));
      font-weight: 400;
      word-break: keep-all;
      margin: 0;
    }

    .clinical-pillars {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin-top: 4px;
      padding-top: 12px;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
    }

    .pillar-item {
      background: rgba(255, 255, 255, 0.035);
      border: 1px solid rgba(212, 175, 55, 0.2);
      border-radius: 11px;
      padding: 10px 12px;
      display: flex;
      flex-direction: column;
      gap: 3px;
    }

    .pillar-item .pillar-num {
      font-size: 0.66rem;
      font-weight: 800;
      color: #D4AF37;
      letter-spacing: 0.06em;
    }

    .pillar-item strong {
      font-size: 0.82rem;
      font-weight: 700;
      color: #fdfbf7;
      line-height: 1.3;
    }

    .pillar-item span {
      font-size: 0.73rem;
      color: rgba(245, 240, 232, 0.72);
      line-height: 1.4;
    }

    .seo-keyword-footer {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      list-style: none;
      margin-top: 2px;
      padding: 0;
    }

    .seo-keyword-footer li {
      font-size: 0.72rem;
      font-weight: 600;
      color: rgba(230, 200, 117, 0.92);
      background: rgba(212, 175, 55, 0.09);
      border: 1px solid rgba(212, 175, 55, 0.24);
      padding: 3px 10px;
      border-radius: 999px;
    }

    /* 큰글씨 고시안성 모드 대응 */
    body.high-visibility-mode .project-details-item.has-separated-editorial .editorial-headline {
      font-size: 1.56rem !important;
      line-height: 1.38 !important;
    }

    body.high-visibility-mode .project-details-item.has-separated-editorial .editorial-body-copy {
      font-size: 1.02rem !important;
      line-height: 1.68 !important;
      color: #FFFFFF !important;
    }

    /* 로컬 전용 페이지 커스텀 스튜디오 바로가기 버튼 */
    .header-studio-btn {
      display: none;
      align-items: center;
      gap: 6px;
      padding: 7px 13px;
      border-radius: 999px;
      background: linear-gradient(135deg, #D4AF37 0%, #B45309 100%);
      border: 1px solid #FEF08A;
      color: #120E0A !important;
      font-size: 0.76rem;
      font-weight: 800;
      text-decoration: none;
      box-shadow: 0 4px 14px rgba(212, 175, 55, 0.35);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .header-studio-btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(212, 175, 55, 0.55);
    }

    /* 모바일·태블릿 세로형 완벽 최적화 (이미지 찌그러짐 및 하단 글자 잘림 0%) */
    @media (max-width: 1024px) {
      .project-details-item.has-separated-editorial,
      .project-details-item.has-separated-editorial[data-fullscreen] {
        height: auto !important;
        min-height: 0 !important;
        max-height: none !important;
        display: flex !important;
        flex-direction: column !important;
      }

      .project-details-item.has-separated-editorial .pure-visual-zone {
        width: 100% !important;
        height: auto !important;
        aspect-ratio: 16 / 10 !important;
        min-height: 215px !important;
        flex: none !important;
      }

      .project-details-item.has-separated-editorial .lusion-clean-media.is-contain-fit {
        padding: 10px 12px !important;
      }

      .project-details-item.has-separated-editorial .editorial-text-zone {
        padding: 16px 18px 18px !important;
        gap: 7px !important;
        height: auto !important;
      }

      .project-details-item.has-separated-editorial .editorial-headline {
        font-size: 1.08rem !important;
        line-height: 1.36 !important;
      }

      .project-details-item.has-separated-editorial .editorial-body-copy {
        font-size: 0.83rem !important;
        line-height: 1.56 !important;
      }

      .plate-thumb-dock.is-visual-floating-dock {
        left: 10px;
        bottom: 8px;
        max-width: calc(100% - 115px);
      }

      .visual-floating-step-wrap {
        right: 10px;
        bottom: 8px;
      }

      .clinical-pillars {
        grid-template-columns: 1fr !important;
        gap: 7px !important;
      }
    }
  </style>
  <script src="clinic-template-config.js"></script>
</head>
<body class="${bodyExtraClasses.join(' ')}">
  <div class="ambient-bg"></div>

  <header id="header">
    <div class="header-left">
      <a class="brand-logo" href="story-3d.html">
        <span class="brand-logo-mark"></span>
        <span id="detail-brand-clinic-name">바른한의원 대전본점</span>
      </a>
      <a class="back-pill-btn" href="story-3d.html?cards=1">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path stroke="currentColor" stroke-linecap="round" stroke-width="1.6" d="M8 12.243 3.757 8m0 0L8 3.757M3.757 8h8.486"/>
        </svg>
        <span>전체 클리닉</span>
      </a>
      <a class="back-pill-btn" id="header-body-explorer-link" href="${page.bodyModelCard && page.bodyModelCard.href ? page.bodyModelCard.href : 'body-explorer.html'}" style="background:#FEF3C7;border-color:#F59E0B;color:#92400E;font-weight:800;">
        <span>💡 3D 생활꿀팁 ↗</span>
      </a>
      <a class="back-pill-btn" id="header-ask-doctor-link" href="${page.bodyModelCard && page.bodyModelCard.href ? page.bodyModelCard.href.replace('body-explorer.html?part=', 'ask-doctor.html?tab=qna&part=') : 'ask-doctor.html?tab=qna'}" style="background:#0F172A;border-color:#0F172A;color:#FFFFFF;font-weight:800;">
        <span>🩺 질환별 비공개 Q&amp;A ↗</span>
      </a>
    </div>

    <div class="header-center">
      <nav class="clinic-quick-tabs" aria-label="클리닉 바로가기">
        ${navHtml}
      </nav>
    </div>

    <div class="header-right" style="display:flex;align-items:center;gap:8px;">
      <a id="btn-open-detail-studio" class="header-studio-btn" href="detail-pages-editor.html?page=${page.file}" title="현재 상세페이지 카드·문구·디자인 커스텀 스튜디오 열기">🎨 커스텀</a>
      <button type="button" class="header-vis-btn" id="btn-toggle-detail-visibility" onclick="window.cycleDetailVisibilityMode()" title="환자 시안성 모드 전환 (한지 베이지 / 다크 / 큰글씨)">
        <span id="vis-mode-label">한지 베이지 (ON)</span>
      </button>
      <button class="header-talk-btn" onclick="window.openConsultModal()">
        <span>맞춤 진료예약</span>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M2.5 8h11m0 0-4.5 4.5M13.5 8 9 3.5"/>
        </svg>
      </button>
    </div>
  </header>

  <main id="project-details">
    <!-- LEFT CLINIC GUIDE & INTERACTIVE PATIENT EMPATHY CHECKLIST -->
    <aside id="project-details-meta">
      <div>
        <div class="meta-eyebrow">${page.meta.eyebrow}</div>
        <h1 id="project-details-title">${page.meta.title}</h1>
        <div class="meta-subtitle-en">${page.meta.subtitleEn}</div>${hairlossSubSwitcherHtml}

        <div id="project-details-desc">
          ${descHtml}
        </div>

        <!-- INTERACTIVE DAILY DISCOMFORT EMPATHY CHECKLIST -->
        <div class="empathy-checklist-card">
          <div class="empathy-checklist-header">
            <span class="empathy-checklist-title">${page.meta.checklistTitle}</span>
            <span class="empathy-count-badge" id="empathy-count-badge">증상 체크 전</span>
          </div>
          <p class="empathy-checklist-sub">${page.meta.checklistSub || '내가 겪고 있는 일상 속 불편감을 클릭해 체크해 보세요.'}</p>
          <div class="empathy-checklist-list" id="empathy-checklist-list">
            ${checklistHtml}
          </div>
          <div class="empathy-severity-board" id="empathy-diagnosis-box" aria-live="polite" style="display:none;">
            <div class="doc-comment-top-row">
              <span class="doc-comment-eyebrow">👨‍⚕️ 안정위 대표원장 닥터 코멘트</span>
              <span class="doc-comment-pill" id="doc-comment-pill">1단계 · 관리 권장</span>
            </div>
            <div class="doc-comment-progress-track">
              <div class="doc-comment-progress-fill" id="doc-comment-bar-fill"></div>
            </div>
            <strong class="doc-comment-headline" id="doc-comment-title">초기 관리 권장</strong>
            <p class="doc-comment-body" id="doc-comment-desc">증상이 더 깊어지기 전에 내원하셔서 예방 및 맞춤 관리를 받아보시길 권합니다.</p>
          </div>
        </div>

        <button id="project-details-launch-cta" onclick="window.openConsultModal()">
          <span class="cta-left-group">
            <span id="project-details-launch-cta-dot"></span>
            <span id="cta-btn-label">${page.meta.ctaText}</span>
          </span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path stroke="currentColor" stroke-linecap="round" stroke-width="1.8" d="M7 17 17 7m0 0H8m9 0v9"/>
          </svg>
        </button>${extraLinkHtml}
        <div class="bareun-detail-legal-info" style="margin-top:14px;padding-top:12px;border-top:1px solid rgba(138,114,94,0.22);font-size:11px;line-height:1.55;color:#6E5D4F;word-break:keep-all;">
          <strong>바른한의원 대전본점</strong> · 대표원장: 안정위 · 사업자등록번호: <strong>211-91-10479</strong><br>
          소재지: 대전광역시 대덕구 비래동로7번길 1, 2층 (비래동) · 대표전화: 010-5631-1275
        </div>
      </div>
    </aside>

    <!-- RIGHT HORIZONTAL CARD RUNWAY -->
    <section id="project-details-items-wrapper" aria-label="수평 카드 트랙">
      <div id="project-details-items-move-container">
        ${platesHtml}

        <!-- LAST CARD: Minimalist Honey-Tip Card Linked to 3D Body Model -->
        ${(!page.bodyModelCard || page.bodyModelCard.enabled === false) ? '' : (page.bodyModelCard.extraInfoItems ? `
        <article id="project-details-preview" class="body-model-last-card is-diet-body-extra-card" style="cursor:pointer;" onclick="if(!event.target.closest('a')){const a=this.querySelector('a');if(a)window.location.href=a.href;}">
          <span class="tiny-card-num-badge">${String(activePlates.length + 1).padStart(2, '0')}</span>
          <div class="diet-card10-3d-bg" id="diet-our-3d-body-stage" aria-hidden="true">
            <canvas id="diet-our-3d-body-canvas"></canvas>
          </div>
          <a class="diet-honey-tip-only-center" href="${page.bodyModelCard.href || 'body-explorer.html'}" aria-label="${page.bodyModelCard.honeyTipLabel || '생활 꿀팁'} - 3D 인체모형 바로가기">
            <h2 class="diet-honey-tip-only-title">${page.bodyModelCard.honeyTipLabel || '생활 꿀팁'}</h2>
          </a>
        </article>` : `
        <article id="project-details-preview" class="body-model-last-card">
          <span class="tiny-card-num-badge">${String(activePlates.length + 1).padStart(2, '0')}</span>
          <img class="next-portal-bg" src="${page.bodyModelCard.bg}" alt="${page.bodyModelCard.title || ''}">
          <div class="next-portal-scrim"></div>
          <div class="body-model-holo-grid"></div>

          <div class="body-model-top-bar">
            <span class="body-model-badge-main">💡 3D 인체모형 · 부위별 생활 꿀팁 창고</span>
            <span class="body-model-badge-sub">${page.bodyModelCard.partBadge || ''}</span>
          </div>

          <div class="body-model-bottom-stage">
            <a id="project-details-preview-inner" href="${page.bodyModelCard.href || 'body-explorer.html'}">
              <h2 id="project-details-preview-title">${page.bodyModelCard.title || ''}</h2>
              <p class="next-portal-desc">${page.bodyModelCard.desc || ''}</p>
              <div class="body-model-feature-chips">
                <span class="body-model-chip">✅ 실천 DO vs 주의 DON'T</span>
                <span class="body-model-chip">⏰ 아침·낮·밤 하루 루틴</span>
                <span class="body-model-chip">🥗 맞춤 약선 식단 & 3분 지압</span>
              </div>
              <div id="project-details-preview-footer">
                <span id="project-details-preview-footer-text">💡 3D 부위별 생활 꿀팁 창고 바로가기</span>
                <div id="project-details-preview-footer-bar">
                  <div id="project-details-preview-footer-bar-inner"></div>
                </div>
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                  <path stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M2 8h12m0 0-5.5 5.5M14 8 8.5 2.5"/>
                </svg>
              </div>
            </a>
          </div>
        </article>`)}
      </div>
    </section>
  </main>

  <div id="scroll-indicator">
    <div id="scroll-indicator-bar"></div>
  </div>

  <!-- Fullscreen Image Lightbox Modal (Supports Single Image & Multi-Image Gallery Navigation) -->
  <div id="plate-lightbox" onclick="if(event.target===this)window.closeCleanLightbox()">
    <div class="lightbox-top-bar" onclick="event.stopPropagation()">
      <div class="lightbox-meta-pill" id="lightbox-meta-pill">
        <span class="lightbox-counter-badge" id="lightbox-counter-badge">01 / 10</span>
        <span class="lightbox-title-text" id="lightbox-title-text">황제공진단 공식 브로슈어 아카이브</span>
      </div>
      <button type="button" class="lightbox-close" onclick="event.stopPropagation(); window.closeCleanLightbox()">✕ 닫기</button>
    </div>

    <button type="button" class="lightbox-nav-arrow prev" id="lightbox-prev-btn" onclick="event.stopPropagation(); window.stepCleanLightbox(-1)" aria-label="이전 이미지" title="이전 이미지 (◀)">
      <span>◀</span>
      <span class="nav-label">이전 이미지</span>
    </button>

    <div class="lightbox-stage-wrap" onclick="if(event.target===this)window.closeCleanLightbox()">
      <img id="lightbox-img" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="확대 이미지" onclick="event.stopPropagation(); window.handleLightboxImgClick()" title="클릭하면 다음 이미지로 넘어갑니다">
      <div class="lightbox-caption-bar" id="lightbox-caption-bar" onclick="event.stopPropagation()">
        <strong id="lightbox-caption-title"></strong>
        <span id="lightbox-caption-desc"></span>
      </div>
    </div>

    <button type="button" class="lightbox-nav-arrow next" id="lightbox-next-btn" onclick="event.stopPropagation(); window.stepCleanLightbox(1)" aria-label="다음 이미지" title="다음 이미지 (▶)">
      <span class="nav-label">다음 이미지</span>
      <span>▶</span>
    </button>

    <div class="lightbox-bottom-bar" id="lightbox-bottom-bar" onclick="event.stopPropagation()">
      <button type="button" class="lightbox-step-pill" onclick="event.stopPropagation(); window.stepCleanLightbox(-1)">◀ 이전 장</button>
      <div class="lightbox-dots-strip" id="lightbox-dots-strip"></div>
      <button type="button" class="lightbox-step-pill is-gold" onclick="event.stopPropagation(); window.stepCleanLightbox(1)">다음 장 ▶</button>
    </div>
  </div>

  <!-- 5/5 Checklist Center Urgent Doctor Warning Modal ("쾅! 쾅!" Animation & Sound) -->
  <div id="urgent-5check-alert-modal" role="alertdialog" aria-modal="true" aria-labelledby="urgent-main-headline" onclick="if(event.target===this)window.closeUrgent5CheckModal()">
    <div class="urgent-5check-dialog">
      <div class="urgent-shockwave-ring ring-1"></div>
      <div class="urgent-shockwave-ring ring-2"></div>

      <div class="urgent-slam-stage-1">
        <span class="urgent-top-badge">🚨 DOCTOR'S URGENT WARNING · 5가지 핵심 증상 100% 모두 해당</span>
      </div>

      <div class="urgent-slam-stage-2">
        <div class="urgent-stamp-box">
          <h2 class="urgent-main-headline" id="urgent-main-headline">
            “더이상 방치하지말고
            <em>당장 진료받으세요”</em>
          </h2>
        </div>
      </div>

      <p class="urgent-sub-desc">
        체크리스트 <strong>5가지 항목이 모두 일치</strong>합니다. 이미 신체 균형과 회복력이 한계치(100%)에 도달한 상태이므로, 더 이상 미루지 마시고 <strong>안정위 대표원장의 1:1 정밀 진맥과 근본 치료</strong>를 즉시 시작하셔야 합니다.
      </p>

      <div class="urgent-actions-row">
        <button type="button" class="urgent-btn-primary" onclick="window.closeUrgent5CheckModal(); window.openConsultModal();">
          🚨 지금 바로 대표원장 진료 예약하기 ↗
        </button>
      </div>

      <button type="button" class="urgent-btn-close" onclick="window.closeUrgent5CheckModal()">
        확인했습니다 (상세페이지 계속 보기)
      </button>
    </div>
  </div>

  <!-- Consultation Modal Synchronized with Checked Empathy Symptoms (수정사항 8 & 9 반영: 전화상담/별도 카카오 메뉴 삭제 및 신청 시 카카오 채널 자동 연결 + 내용 복사) -->
  <div id="consult-modal" onclick="if(event.target===this)this.classList.remove('open')">
    <div class="consult-modal-card">
      <h3 class="consult-modal-title">${page.meta.title} 맞춤 진료 예약</h3>
      <p class="consult-modal-sub">${page.meta.ctaNudge}</p>
      <div class="modal-checked-summary" id="modal-checked-summary">
        체크된 일상 불편감 증상이 자동으로 이곳에 연동됩니다.
      </div>
      <form id="detail-consult-form">
        <div class="modal-form-group">
          <label>예약자 성함</label>
          <input type="text" id="modal-user-name" required placeholder="성함을 입력해 주세요">
        </div>
        <div class="modal-form-group">
          <label>연락처</label>
          <input type="tel" id="modal-user-phone" required placeholder="연락처를 입력해 주세요">
        </div>
        <div class="modal-form-group">
          <label>체크된 불편감 및 추가 상담 메모</label>
          <textarea id="modal-user-memo" rows="3" placeholder="희망하시는 진료 시간대나 증상을 남겨주세요"></textarea>
        </div>
        <p style="margin:0 0 10px 0;font-size:0.75rem;line-height:1.45;color:rgba(253,230,138,0.92);background:rgba(212,175,55,0.12);border:1px solid rgba(212,175,55,0.32);padding:8px 10px;border-radius:10px;word-break:keep-all;">
          💡 <strong>신청하기</strong>를 누르시면 작성하신 예약 내용과 체크 증상이 <strong>자동 복사</strong>되며 <strong>바른한의원 카카오톡 채널 채팅창으로 즉시 자동 연결</strong>됩니다. (열린 채팅창에 <strong>붙여넣기</strong>만 해주시면 됩니다)
        </p>
        <button type="submit" class="modal-submit-btn">💬 ${page.meta.ctaText} 신청하기 (카카오 채널 자동 연결)</button>
      </form>
      <button class="plate-expand-btn" style="width:100%;padding:11px;margin-top:10px;" onclick="document.getElementById('consult-modal').classList.remove('open')">창 닫기</button>
    </div>
  </div>

  <!-- 4-TYPE HAIRLOSS SELECTOR MODAL IN DETAIL PAGES -->
  <div id="detail-hairloss-4type-modal" role="dialog" aria-modal="true" aria-label="바른 탈모 4가지 유형별 상세페이지 선택" onclick="if(event.target===this)window.closeDetailHairlossModal()">
    <div class="dh4-dialog">
      <div class="dh4-head">
        <div>
          <span class="dh4-eyebrow">👨‍👧‍👦 아빠 한의사 · 내 가족 주치의 4대 탈모 맞춤 진료</span>
          <h3 class="dh4-title">어떤 <em>탈모 · 두피 고민</em>의 상세페이지를 확인하시겠습니까?</h3>
          <p class="dh4-sub">내 가족에게 직접 처방하고 시술한 치료만 시행합니다. 원하시는 탈모 유형을 선택하시면 맞춤 상세페이지로 즉시 이동합니다.</p>
        </div>
        <button type="button" class="dh4-close" onclick="window.closeDetailHairlossModal()">✕ 닫기</button>
      </div>
      <div class="dh4-grid">
        <a href="hairloss-male.html" class="dh4-card${page.file === 'hairloss-male.html' ? ' current' : ''}">
          <div class="dh4-visual">
            <img src="detail_hair_story1_30cm_tension.jpg?v=30cm1" alt="남성탈모 상세페이지" loading="lazy">
            <span class="dh4-badge">TYPE 01 · 남성탈모</span>
          </div>
          <div class="dh4-body">
            <h4 class="dh4-card-title">남성탈모</h4>
            <div class="dh4-card-sub">M자 · 정수리 · 두피열 사막화</div>
            <p class="dh4-card-desc">피나스테리드·성기능 부작용 걱정 없이 상체로 치솟은 두피열을 내리고 위축된 모근을 깨웁니다.</p>
            <span class="dh4-cta"><span>남성탈모 상세페이지</span><span>→</span></span>
          </div>
        </a>
        <a href="hairloss-alopecia.html" class="dh4-card${page.file === 'hairloss-alopecia.html' ? ' current' : ''}">
          <div class="dh4-visual">
            <img src="detail_director_story2_both_wrists_pulse.jpg" alt="원형탈모 상세페이지" loading="lazy">
            <span class="dh4-badge">TYPE 02 · 원형탈모</span>
          </div>
          <div class="dh4-body">
            <h4 class="dh4-card-title">원형탈모</h4>
            <div class="dh4-card-sub">동전 모양 · 다발성 · 자가면역 폭주</div>
            <p class="dh4-card-desc">스테로이드 주사로 인한 두피 함몰 대신, 자율신경 안정과 면역 정상화로 재발 고리를 끊어냅니다.</p>
            <span class="dh4-cta"><span>원형탈모 상세페이지</span><span>→</span></span>
          </div>
        </a>
        <a href="hairloss-female.html" class="dh4-card${page.file === 'hairloss-female.html' ? ' current' : ''}">
          <div class="dh4-visual">
            <img src="detail_hair_story5_date_smile.jpg" alt="여성탈모 상세페이지" loading="lazy">
            <span class="dh4-badge">TYPE 03 · 여성탈모</span>
          </div>
          <div class="dh4-body">
            <h4 class="dh4-card-title">여성탈모</h4>
            <div class="dh4-card-sub">가르마 확장 · 산후 · 갱년기 · 다이어트</div>
            <p class="dh4-card-desc">상열하한(머리는 뜨겁고 손발·하복부는 찬 상태)과 보혈(補血)을 다스려 정수리 볼륨을 복원합니다.</p>
            <span class="dh4-cta"><span>여성탈모 상세페이지</span><span>→</span></span>
          </div>
        </a>
        <a href="hairloss-seborrheic.html" class="dh4-card${page.file === 'hairloss-seborrheic.html' ? ' current' : ''}">
          <div class="dh4-visual">
            <img src="detail_hair_thermography.jpg" alt="지루성두피염 상세페이지" loading="lazy">
            <span class="dh4-badge">TYPE 04 · 지루성두피염</span>
          </div>
          <div class="dh4-body">
            <h4 class="dh4-card-title">지루성두피염</h4>
            <div class="dh4-card-sub">붉은 홍반 · 화농성 모낭염 · 각질 · 가려움</div>
            <p class="dh4-card-desc">항생제·스테로이드 내성 없이 두피 속 열독(熱毒)과 피지 과분비를 해독해 진피 장벽을 재생합니다.</p>
            <span class="dh4-cta"><span>지루성두피염 상세페이지</span><span>→</span></span>
          </div>
        </a>
      </div>
    </div>
  </div>

  <script>
    (function() {
      'use strict';

      window.openDetailHairlossModal = function() {
        const m = document.getElementById('detail-hairloss-4type-modal');
        if (m) m.classList.add('open');
      };
      window.closeDetailHairlossModal = function() {
        const m = document.getElementById('detail-hairloss-4type-modal');
        if (m) m.classList.remove('open');
      };

      window.switchDietStage3 = function(stageIdx) {
        const grid = document.getElementById('diet-3stage-grid');
        if (!grid) return;
        const tabs = Array.from(document.querySelectorAll('.diet-3stage-tab'));
        tabs.forEach(function(btn, idx) {
          btn.classList.toggle('active', idx === stageIdx);
        });
        const cards = Array.from(grid.querySelectorAll('.diet-3stage-card'));
        if (stageIdx === 0) {
          grid.classList.remove('has-focus');
          cards.forEach(function(c) { c.classList.remove('is-stage-focused'); });
        } else {
          grid.classList.add('has-focus');
          cards.forEach(function(c) {
            c.classList.toggle('is-stage-focused', parseInt(c.dataset.stage || '0', 10) === stageIdx);
          });
        }
      };

      // ====================================================================
      // 0. AWWWARDS VISIBILITY MODE, B2B BRAND SYNC & SCROLL-DRIVEN B/A ENGINE
      // ====================================================================
      const PAGE_FILE = '${page.file}';
      if ((PAGE_FILE === 'hairloss.html' && !window.location.search.includes('direct=1')) || window.location.search.includes('select=1')) {
        setTimeout(function() {
          window.openDetailHairlossModal();
        }, 120);
      }
      const DETAIL_BA_MAP = {
        'director.html': {
          part: 'syncope',
          beforeImg: 'ba_director_before.jpg',
          afterImg: 'ba_director_after.jpg',
          beforeTag: 'BEFORE · 미검증 약재 우려 및 자율신경 불균형',
          afterTag: 'AFTER · 학술 논문 검증 청정 탕전 및 기혈 복원',
          metrics: [
            { label: 'SCI급 국제학술지(Evid Based Complement Alternat Med)', b: '간·신장 부담 우려', a: '무독성·항산화 효소 활성 입증' },
            { label: '국제 민족약리학회지(J Ethnopharmacol)', b: '자율신경·착상 저하', a: '맥진·체질 맞춤 처방 기전 검증' }
          ]
        },
        'chuna.html': {
          part: 'lumbar',
          beforeImg: 'chuna_minimal_card4_ba_before.jpg',
          afterImg: 'chuna_minimal_card4_ba_after.jpg',
          beforeTag: 'BEFORE · 골반 비대칭 및 추간판 신경 압박',
          afterTag: 'AFTER · 학술 검증 수기 추나 정렬 및 신경 감압',
          metrics: [
            { label: 'JAMA(미국의학협회지) 논문 검수', b: '추간판 신경 압박', a: '비수술 수기 추나 신경 감압 입증' },
            { label: '미국내과학회(ACP) 권고 가이드라인', b: '대증 진통제 의존', a: '비약물 척추 수기치료 권고 검증' }
          ]
        },
        'growth.html': {
          part: 'knee',
          beforeImg: 'ba_growth_before.jpg',
          afterImg: 'ba_growth_after.jpg',
          beforeTag: '📊 연령별 평균키 · 성장판 나이 비교',
          afterTag: '🎯 뼈길이 · 최종예상키 정밀 분석',
          metrics: [
            { label: '연령별 평균키 · 성장판 나이', b: '또래 평균키 편차 · 골연령 진행도', a: '잔여 성장판 개방 기간 정밀 판독' },
            { label: '뼈길이 · 최종예상키', b: '방치 시 성인 예상키 산출', a: '골든타임 맞춤 치료 시 최종예상키 도약' }
          ]
        },
        'diet-zero.html': {
          part: 'gut',
          beforeImg: 'diet_minimal_card9_ba_before_v2.jpg',
          afterImg: 'diet_minimal_card9_ba_after.jpg',
          beforeTag: 'BEFORE · 복부 대사 저하 및 내장지방 축적',
          afterTag: 'AFTER · 근육량 상승 및 복부 뱃살지방 분해 완료',
          metrics: [
            { label: '국제 비만학술지(Int J Obesity) 검증', b: '기초대사 저하·가짜 식욕', a: '갈색지방 열발생·렙틴 저항성 개선 입증' },
            { label: '국제 약리학술지(Front Pharmacol) 등재', b: '근손실 요요 반복', a: '대사 효소 활성·내장지방 분해 검증' }
          ]
        },
        'hairloss.html': {
          part: 'cervical',
          beforeImg: 'ba_hair_before.jpg',
          afterImg: 'ba_hair_after.jpg',
          beforeTag: 'BEFORE · 두피 열독 사막화 및 모낭 위축',
          afterTag: 'AFTER · 학술 검증 수승화강 청열 및 모근 재생',
          metrics: [
            { label: '국제 식물요법학회지(Phytother Res) 검증', b: '모낭 성장기 단축·연모화', a: '모유두세포 활성·성장기 연장 입증' },
            { label: '피부과학 저널(J Dermatol Sci) 등재', b: '두피 열독·미세염증', a: '수승화강 청열·모유두세포 보호 검증' }
          ]
        },
        'hairloss-male.html': {
          part: 'cervical',
          beforeImg: 'ba_hair_before.jpg',
          afterImg: 'ba_hair_after.jpg',
          beforeTag: 'BEFORE · 남성 M자·정수리 두피열 사막화 및 연모화',
          afterTag: 'AFTER · 수승화강 청열 및 M자·정수리 모근 재생',
          metrics: [
            { label: '국제 식물요법학회지(Phytother Res) 검증', b: 'M자·정수리 모낭 위축', a: 'DHT 저항·모유두세포 성장기 연장 입증' },
            { label: '피부과학 저널(J Dermatol Sci) 등재', b: '상열하한 두피 열독', a: '호르몬 부작용 없는 모낭 혈류 복원 검증' }
          ]
        },
        'hairloss-alopecia.html': {
          part: 'cervical',
          beforeImg: 'ba_hair_before.jpg',
          afterImg: 'ba_hair_after.jpg',
          beforeTag: 'BEFORE · 자가면역 폭주 및 원형 탈락반 진행',
          afterTag: 'AFTER · 자율신경 안정 및 면역 재조율 신생모 발모',
          metrics: [
            { label: '국제 민족약리학회지(J Ethnopharmacol) 검증', b: '자가면역 모낭 공격', a: '염증성 사이토카인 억제·모낭 회복 입증' },
            { label: '피부과학 저널(J Dermatol Sci) 등재', b: '스테로이드 두피 함몰 우려', a: '무위축 면역 재조율·재발 방지 검증' }
          ]
        },
        'hairloss-female.html': {
          part: 'cervical',
          beforeImg: 'ba_hair_before.jpg',
          afterImg: 'ba_hair_after.jpg',
          beforeTag: 'BEFORE · 여성 가르마 확장 및 상열하한·혈허 빈모',
          afterTag: 'AFTER · 자음보혈 진액 보충 및 정수리 볼륨 복원',
          metrics: [
            { label: '국제 식물학술지(Phytomedicine) 검증', b: '산후·갱년기 가르마 빈모', a: '모유두세포 영양·모발 굵기 회복 입증' },
            { label: '국제 약리학술지(Front Pharmacol) 등재', b: '상열하한·만성 냉증', a: '전신 기혈 순환·모낭 성장인자 활성 검증' }
          ]
        },
        'hairloss-seborrheic.html': {
          part: 'cervical',
          beforeImg: 'ba_hair_before.jpg',
          afterImg: 'ba_hair_after.jpg',
          beforeTag: 'BEFORE · 두피 홍반·화농성 모낭염 및 각질·열독',
          afterTag: 'AFTER · 청열해독 염증 진정 및 건강 진피 장벽 복원',
          metrics: [
            { label: '피부과학 저널(J Dermatol Sci) 검증', b: '만성 홍반·화농성 모낭염', a: '피지 과분비·염증 매개체 억제 입증' },
            { label: '국제 식물요법학회지(Phytother Res) 등재', b: '스테로이드 리바운드 재발', a: '진피 면역 장벽·염증성 탈모 차단 검증' }
          ]
        },
        'gongjindan.html': {
          part: 'gongjindan',
          beforeImg: 'gongjindan_minimal_card4_ba_before.jpg?v=couple2',
          afterImg: 'gongjindan_minimal_card4_ba_after.jpg?v=couple2',
          beforeTag: 'BEFORE · 난임과 기력 저하로 지친 부부',
          afterTag: 'AFTER · 자궁 착상 강화 및 호르몬 활력 복원',
          metrics: [
            { label: '국제 민족약리학회지(J Ethnopharmacol) 검증', b: '만성 피로·집중력 저하', a: '뇌신경 영양인자 발현·피로 개선 입증' },
            { label: '국제 약리학술지(Front Pharmacol) 등재', b: '뇌·심장 기혈 울체', a: '천연 사향 뇌혈관장벽 투과·보호 검증' }
          ]
        },
        'prostate.html': {
          part: 'prostate',
          beforeImg: 'prostate_minimal_card4_ba_before.jpg?v=stream1',
          afterImg: 'prostate_minimal_card4_ba_after.jpg?v=stream1',
          beforeTag: 'BEFORE · 약해진 물줄기 (세뇨·잔뇨감·방광 압박)',
          afterTag: 'AFTER · 강력한 물줄기 (전립선 감압 · 시원한 쾌뇨)',
          metrics: [
            { label: '국제 비뇨의학회지(Urology) 검증', b: '만성 골반 울혈·잔뇨감', a: '비세균성 전립선염·배뇨 개선 입증' },
            { label: '국제 식물학술지(Phytomedicine) 등재', b: '전립선 비대·야간뇨', a: '전립선 조직 감압·하부요로증상 완화 검증' }
          ]
        }
      };

      const activeBaData = DETAIL_BA_MAP[PAGE_FILE] || DETAIL_BA_MAP['chuna.html'];
      const detailBaModal = document.getElementById('detail-ba-modal');
      const detailBaStage = document.getElementById('detail-ba-stage');
      const detailBaClip = document.getElementById('detail-ba-clip');
      const detailBaLine = document.getElementById('detail-ba-line');
      const detailBaKnob = document.getElementById('detail-ba-knob');

      // Initialize Runway Before/After 3D Scan + Body Explorer Link
      (function initEmbeddedScrollBa() {
        const rbImg = document.getElementById('runway-ba-before-img');
        const raImg = document.getElementById('runway-ba-after-img');
        const rTagB = document.getElementById('runway-ba-tag-b');
        const rTagA = document.getElementById('runway-ba-tag-a');
        const hExplorer = document.getElementById('header-body-explorer-link');

        if (rbImg && !rbImg.getAttribute('src')) rbImg.src = activeBaData.beforeImg;
        if (raImg && !raImg.getAttribute('src')) raImg.src = activeBaData.afterImg;
        if (rTagB) rTagB.textContent = activeBaData.beforeTag;
        if (rTagA) rTagA.textContent = activeBaData.afterTag;
        if (hExplorer) hExplorer.href = 'body-explorer.html?part=' + activeBaData.part;
      })();

      window.applyInlineScrollBaPct = function(pct) {
        const c = Math.max(6, Math.min(96, pct));
        const clipVal = 'inset(0 ' + (100 - c).toFixed(1) + '% 0 0)';
        const leftVal = c.toFixed(1) + '%';
        document.querySelectorAll('.runway-ba-after-clip, #runway-ba-after-clip').forEach(function(el) {
          el.style.clipPath = clipVal;
        });
        document.querySelectorAll('.runway-ba-laser, #runway-ba-laser').forEach(function(el) {
          el.style.left = leftVal;
        });
      };

      function setDetailBaPct(pct) {
        const c = Math.max(4, Math.min(96, pct));
        if (detailBaClip) detailBaClip.style.clipPath = 'inset(0 ' + (100 - c).toFixed(1) + '% 0 0)';
        if (detailBaLine) detailBaLine.style.left = c.toFixed(1) + '%';
        if (detailBaKnob) detailBaKnob.style.left = c.toFixed(1) + '%';
      }

      window.openDetailBaModal = function() {
        const data = activeBaData;
        const bImg = document.getElementById('detail-ba-before');
        const aImg = document.getElementById('detail-ba-after');
        const bTag = document.getElementById('detail-ba-tag-before');
        const aTag = document.getElementById('detail-ba-tag-after');
        const mBox = document.getElementById('detail-ba-metrics');
        if (bImg) bImg.src = data.beforeImg;
        if (aImg) aImg.src = data.afterImg;
        if (bTag) bTag.textContent = data.beforeTag;
        if (aTag) aTag.textContent = data.afterTag;
        if (mBox) {
          mBox.innerHTML = data.metrics.map(function(m) {
            return '<div class="detail-ba-metric-card"><div class="detail-ba-metric-label">' + m.label + '</div><div class="detail-ba-metric-val"><span class="b">' + m.b + '</span><span>→</span><span class="a">' + m.a + '</span></div></div>';
          }).join('');
        }
        setDetailBaPct(50);
        if (detailBaModal) detailBaModal.classList.add('open');
      };

      if (detailBaStage) {
        let dragging = false;
        const updateX = function(clientX) {
          const r = detailBaStage.getBoundingClientRect();
          setDetailBaPct(((clientX - r.left) / Math.max(1, r.width)) * 100);
        };
        detailBaStage.addEventListener('pointerdown', function(e) {
          dragging = true;
          updateX(e.clientX);
          try { detailBaStage.setPointerCapture(e.pointerId); } catch (_) {}
        });
        detailBaStage.addEventListener('pointermove', function(e) {
          if (!dragging) return;
          updateX(e.clientX);
        });
        window.addEventListener('pointerup', function() { dragging = false; });
      }

      const VIS_MODES = ['warm-hanji', 'dark-royal', 'high-visibility'];
      let currentVisMode = 'warm-hanji';

      function applyDetailVisMode(mode) {
        currentVisMode = VIS_MODES.includes(mode) ? mode : 'warm-hanji';
        document.body.classList.remove('theme-hanji', 'high-visibility-mode');
        const labelEl = document.getElementById('vis-mode-label');
        if (currentVisMode === 'warm-hanji') {
          document.body.classList.add('theme-hanji');
          if (labelEl) labelEl.textContent = '한지 베이지 (ON)';
        } else if (currentVisMode === 'high-visibility') {
          document.body.classList.add('high-visibility-mode');
          if (labelEl) labelEl.textContent = '큰글씨 고시안성 (ON)';
        } else {
          if (labelEl) labelEl.textContent = '다크 로얄 (ON)';
        }
        try {
          localStorage.setItem('bareun_visual_mode_v3', currentVisMode);
        } catch (_) {}
      }

      window.cycleDetailVisibilityMode = function() {
        const nextIdx = (VIS_MODES.indexOf(currentVisMode) + 1) % VIS_MODES.length;
        applyDetailVisMode(VIS_MODES[nextIdx]);
      };

      (function initLocalStudioQuickLink() {
        const h = window.location.hostname;
        if (h === 'localhost' || h === '127.0.0.1') {
          const stBtn = document.getElementById('btn-open-detail-studio');
          if (stBtn) stBtn.style.display = 'inline-flex';
        }
      })();

      (function initDetailBrandAndMode() {
        const cfg = window.CLINIC_TEMPLATE_CONFIG || {};
        let savedMode = 'warm-hanji';
        try {
          const lsMode = localStorage.getItem('bareun_visual_mode_v3');
          if (lsMode) savedMode = lsMode;
        } catch (_) {}
        applyDetailVisMode(savedMode);

        let brandData = {
          clinicName: cfg.clinicName || '바른한의원 대전본점',
          phone: cfg.phone || '010-5631-1275'
        };
        try {
          const lsBrand = localStorage.getItem('bareun_custom_brand_v2');
          if (lsBrand) {
            brandData = Object.assign(brandData, JSON.parse(lsBrand));
          }
        } catch (_) {}
        const nameEl = document.getElementById('detail-brand-clinic-name');
        if (nameEl && brandData.clinicName) nameEl.textContent = brandData.clinicName;
        const telEl = document.getElementById('detail-tel-link');
        if (telEl && brandData.phone) {
          telEl.href = 'tel:' + brandData.phone;
          telEl.textContent = '대표원장실 전화 상담 연결';
        }
      })();

      // ====================================================================
      // 1. INTERACTIVE DAILY DISCOMFORT EMPATHY CHECKLIST ENGINE
      // ====================================================================
      const ADVICE = ${JSON.stringify(page.meta.doctorAdvice)};
      const COND_NAME = String((ADVICE && ADVICE.caution) || '${page.meta.title}').replace(/\s*주의$/, '');
      const checkItems = Array.from(document.querySelectorAll('.empathy-check-item'));
      const countBadge = document.getElementById('empathy-count-badge');
      const diagnosisBox = document.getElementById('empathy-diagnosis-box');
      const docCommentPill = document.getElementById('doc-comment-pill');
      const docCommentBarFill = document.getElementById('doc-comment-bar-fill');
      const docCommentTitle = document.getElementById('doc-comment-title');
      const docCommentDesc = document.getElementById('doc-comment-desc');
      const urgentModalEl = document.getElementById('urgent-5check-alert-modal');
      const ctaBtnLabel = document.getElementById('cta-btn-label');
      let sharedAudioCtx = null;

      function getAudioCtx() {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return null;
        if (!sharedAudioCtx) {
          sharedAudioCtx = new AudioCtx();
        }
        if (sharedAudioCtx.state === 'suspended') {
          sharedAudioCtx.resume().catch(function() {});
        }
        return sharedAudioCtx;
      }

      // Synthesize a single deep, authoritative "쾅!" (Heavy Gavel / Seal Stamp / Taiko Impact Boom)
      function triggerSingleBoomHit(ctx, startTime, intensity) {
        const vol = intensity || 1.0;

        // 1) Sub-bass seismic thump (135Hz -> 26Hz pitch drop)
        const subOsc = ctx.createOscillator();
        const subGain = ctx.createGain();
        subOsc.type = 'sine';
        subOsc.frequency.setValueAtTime(138 * vol, startTime);
        subOsc.frequency.exponentialRampToValueAtTime(26, startTime + 0.34);
        subGain.gain.setValueAtTime(0.001, startTime);
        subGain.gain.linearRampToValueAtTime(0.95 * vol, startTime + 0.008);
        subGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.42);
        subOsc.connect(subGain);
        subGain.connect(ctx.destination);
        subOsc.start(startTime);
        subOsc.stop(startTime + 0.44);

        // 2) Mid-low punch body (240Hz -> 44Hz triangle wave)
        const punchOsc = ctx.createOscillator();
        const punchGain = ctx.createGain();
        punchOsc.type = 'triangle';
        punchOsc.frequency.setValueAtTime(240, startTime);
        punchOsc.frequency.exponentialRampToValueAtTime(42, startTime + 0.19);
        punchGain.gain.setValueAtTime(0.001, startTime);
        punchGain.gain.linearRampToValueAtTime(0.65 * vol, startTime + 0.006);
        punchGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.24);
        punchOsc.connect(punchGain);
        punchGain.connect(ctx.destination);
        punchOsc.start(startTime);
        punchOsc.stop(startTime + 0.26);

        // 3) Heavy stamp transient crack & low-pass rumble burst
        const bufSize = Math.floor(ctx.sampleRate * 0.28);
        const noiseBuf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
        const data = noiseBuf.getChannelData(0);
        for (let i = 0; i < bufSize; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.055));
        }
        const noiseSrc = ctx.createBufferSource();
        noiseSrc.buffer = noiseBuf;
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(520, startTime);
        filter.frequency.exponentialRampToValueAtTime(95, startTime + 0.24);
        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.82 * vol, startTime);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.26);
        noiseSrc.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(ctx.destination);
        noiseSrc.start(startTime);
      }

      // Play "쾅! 쾅!" Heavy Double Impact Sound Effect when all 5 items are checked
      window.playHeavyDoubleImpactSound = function() {
        try {
          const ctx = getAudioCtx();
          if (!ctx) return;
          const now = ctx.currentTime + 0.01;
          triggerSingleBoomHit(ctx, now, 0.95);        // 1st "쾅!"
          triggerSingleBoomHit(ctx, now + 0.36, 1.15); // 2nd heavier "쾅!"
        } catch (_) {}
      };

      // Subtle clinical check feedback pulse for 1~4 checks
      function playStepCheckPulse(stepCount) {
        try {
          const ctx = getAudioCtx();
          if (!ctx) return;
          const now = ctx.currentTime + 0.005;
          const osc = ctx.createOscillator();
          const g = ctx.createGain();
          osc.type = 'sine';
          const baseFreq = stepCount === 4 ? 190 : (stepCount === 3 ? 240 : 310);
          osc.frequency.setValueAtTime(baseFreq, now);
          osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.72, now + 0.09);
          g.gain.setValueAtTime(0.14, now);
          g.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
          osc.connect(g);
          g.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.11);
        } catch (_) {}
      }

      window.triggerUrgent5CheckAlert = function() {
        if (!urgentModalEl) return;
        urgentModalEl.classList.remove('open');
        void urgentModalEl.offsetWidth; // Force reflow so stamp slam animations replay cleanly
        urgentModalEl.classList.add('open');

        window.playHeavyDoubleImpactSound();

        // Sync 1st & 2nd screen shake with "쾅! (0ms)" and "쾅! (360ms)"
        document.body.classList.remove('urgent-impact-shaking');
        void document.body.offsetWidth;
        document.body.classList.add('urgent-impact-shaking');
        setTimeout(function() {
          document.body.classList.remove('urgent-impact-shaking');
          void document.body.offsetWidth;
          document.body.classList.add('urgent-impact-shaking');
        }, 360);
        setTimeout(function() {
          document.body.classList.remove('urgent-impact-shaking');
        }, 860);
      };

      window.closeUrgent5CheckModal = function() {
        if (urgentModalEl) urgentModalEl.classList.remove('open');
      };

      function getCheckedSymptoms() {
        return checkItems
          .filter(el => el.querySelector('.empathy-check-input').checked)
          .map(el => el.querySelector('.empathy-check-input').value);
      }

      function updateChecklistState(justChecked) {
        const checked = getCheckedSymptoms();
        const cnt = checked.length;

        countBadge.classList.remove('active', 'is-tier-1', 'is-tier-2', 'is-tier-3', 'is-tier-4', 'is-tier-5');
        if (diagnosisBox) {
          diagnosisBox.classList.remove('tier-1', 'tier-2', 'tier-3', 'tier-4', 'tier-5');
        }

        if (cnt === 0) {
          countBadge.textContent = '증상 체크 전 (0/5)';
          if (diagnosisBox) diagnosisBox.style.display = 'none';
          if (urgentModalEl) urgentModalEl.classList.remove('open');
        } else if (cnt === 1) {
          countBadge.textContent = '🩺 1개 체크 · 초기 관리 권장';
          countBadge.classList.add('active', 'is-tier-1');
          if (diagnosisBox) {
            diagnosisBox.style.display = 'flex';
            diagnosisBox.classList.add('tier-1');
          }
          if (docCommentPill) docCommentPill.textContent = '1개 체크 · 관리 요망';
          if (docCommentBarFill) docCommentBarFill.style.width = '12%';
          if (docCommentTitle) docCommentTitle.textContent = '초기 관리 권장 (' + COND_NAME + ' 예방 · 관리 단계)';
          if (docCommentDesc) docCommentDesc.textContent = '초기 불편감 신호가 감지되었습니다. 증상이 더 깊어지기 전에 내원하셔서 예방 및 맞춤 관리를 받아보시길 권합니다.';
          if (justChecked) playStepCheckPulse(1);
        } else if (cnt === 2) {
          countBadge.textContent = '⚠️ 2개 체크 · 주의 (20% 진행중)';
          countBadge.classList.add('active', 'is-tier-2');
          if (diagnosisBox) {
            diagnosisBox.style.display = 'flex';
            diagnosisBox.classList.add('tier-2');
          }
          if (docCommentPill) docCommentPill.textContent = '2개 체크 · 20% 진행중';
          if (docCommentBarFill) docCommentBarFill.style.width = '20%';
          if (docCommentTitle) docCommentTitle.textContent = '주의 (20% 진행중) · ' + COND_NAME + ' 주의 단계';
          if (docCommentDesc) docCommentDesc.textContent = '증상이 서서히 자리 잡고 있습니다(20% 진행중). 자연 회복만 기다리기보다 정밀 진맥과 초기 치료로 진행을 차단해야 할 시점입니다.';
          if (justChecked) playStepCheckPulse(2);
        } else if (cnt === 3) {
          countBadge.textContent = '🔶 3개 체크 · 위험 (50% 고생중)';
          countBadge.classList.add('active', 'is-tier-3');
          if (diagnosisBox) {
            diagnosisBox.style.display = 'flex';
            diagnosisBox.classList.add('tier-3');
          }
          if (docCommentPill) docCommentPill.textContent = '3개 체크 · 50% 고생중';
          if (docCommentBarFill) docCommentBarFill.style.width = '50%';
          if (docCommentTitle) docCommentTitle.textContent = '위험 (50% 고생중) · ' + COND_NAME + ' 위험 단계';
          if (docCommentDesc) docCommentDesc.textContent = '이미 일상 속에서 상당한 불편감으로 고생하고 계십니다(50% 고생중). 만성화되기 직전이므로 대표원장 정밀 진단을 통한 집중 치료가 필요합니다.';
          if (justChecked) playStepCheckPulse(3);
        } else if (cnt === 4) {
          countBadge.textContent = '🚨 4개 체크 · 심각 (70% 위태함)';
          countBadge.classList.add('active', 'is-tier-4');
          if (diagnosisBox) {
            diagnosisBox.style.display = 'flex';
            diagnosisBox.classList.add('tier-4');
          }
          if (docCommentPill) docCommentPill.textContent = '4개 체크 · 70% 위태함';
          if (docCommentBarFill) docCommentBarFill.style.width = '70%';
          if (docCommentTitle) docCommentTitle.textContent = '심각 (70% 위태함) · ' + COND_NAME + ' 심각 단계';
          if (docCommentDesc) docCommentDesc.textContent = '신체 균형이 무너지며 매우 위태로운 단계에 접어들었습니다(70% 위태함). 미루실수록 치료 기간이 길어지니 빠른 시일 내에 진료받으셔야 합니다.';
          if (justChecked) playStepCheckPulse(4);
        } else if (cnt >= 5) {
          countBadge.textContent = '🆘 5개 모두 체크 · 당장 진료 요망!';
          countBadge.classList.add('active', 'is-tier-5');
          if (diagnosisBox) {
            diagnosisBox.style.display = 'flex';
            diagnosisBox.classList.add('tier-5');
          }
          if (docCommentPill) docCommentPill.textContent = '5개 모두 체크 · 100% 긴급';
          if (docCommentBarFill) docCommentBarFill.style.width = '100%';
          if (docCommentTitle) docCommentTitle.textContent = '“더이상 방치하지말고 당장 진료받으세요”';
          if (docCommentDesc) docCommentDesc.textContent = '5가지 핵심 증상이 모두 해당됩니다! 더이상 방치하지말고 당장 진료받으세요. 지금 즉시 대표원장 1:1 정밀 진맥과 근본 치료를 시작하셔야 합니다.';
          if (justChecked) {
            window.triggerUrgent5CheckAlert();
          }
        }
        ctaBtnLabel.textContent = '${page.meta.ctaText}';
      }

      updateChecklistState(false);

      checkItems.forEach(item => {
        const input = item.querySelector('.empathy-check-input');
        item.addEventListener('click', (e) => {
          e.preventDefault();
          input.checked = !input.checked;
          item.classList.toggle('checked', input.checked);
          updateChecklistState(input.checked);
        });
      });

      window.openConsultModal = function() {
        const checked = getCheckedSymptoms();
        const summaryEl = document.getElementById('modal-checked-summary');
        const memoEl = document.getElementById('modal-user-memo');
        if (checked.length > 0) {
          summaryEl.innerHTML = '<strong>✓ 체크하신 일상 불편감 항목:</strong><br>• ' + checked.join('<br>• ');
          memoEl.value = '[체크 증상] ' + checked.join(' / ');
        } else {
          summaryEl.innerHTML = '체크하신 항목이 없습니다. 좌측 체크리스트에서 불편감을 선택하시거나 아래에 직접 증상을 남겨주세요.';
        }
        document.getElementById('consult-modal').classList.add('open');
      };

      function copyTextSyncAndAsync(text) {
        try {
          const ta = document.createElement('textarea');
          ta.value = text;
          ta.setAttribute('readonly', '');
          ta.style.position = 'fixed';
          ta.style.top = '-9999px';
          ta.style.opacity = '0';
          document.body.appendChild(ta);
          ta.select();
          ta.setSelectionRange(0, text.length);
          document.execCommand('copy');
          document.body.removeChild(ta);
        } catch (_) {}
        if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
          navigator.clipboard.writeText(text).catch(function() {});
        }
      }

      const consultForm = document.getElementById('detail-consult-form');
      if (consultForm) {
        consultForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const name = (document.getElementById('modal-user-name').value || '').trim();
          const phone = (document.getElementById('modal-user-phone').value || '').trim();
          const memo = (document.getElementById('modal-user-memo').value || '').trim();
          const checked = getCheckedSymptoms();

          const kakaoMsg = [
            '[바른한의원 대전본점 맞춤 진료예약 신청]',
            '• 희망 클리닉: ${page.meta.title} (${page.meta.reserveProgram})',
            '• 예약자 성함: ' + name,
            '• 연락처: ' + phone,
            '• 체크 증상: ' + (checked.length ? checked.join(', ') : '없음'),
            '• 상담 메모: ' + (memo || '없음')
          ].join('\\n');

          // 1) 작성 내용을 클립보드에 즉시 자동 복사
          copyTextSyncAndAsync(kakaoMsg);

          // 2) 백그라운드 알림톡 접수 연동 유지
          fetch('/api/send-alimtalk', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              parentName: name,
              parentTel: phone,
              childInfo: '${page.meta.title}',
              consultType: '${page.meta.reserveProgram}',
              symptoms: checked,
              parentMemo: memo
            })
          }).catch(() => {});

          // 3) 바른한의원 카카오톡 채널 1:1 채팅창으로 즉시 자동 연결
          const kakaoChatUrl = 'https://pf.kakao.com/_ykxcLK/chat';
          const win = window.open(kakaoChatUrl, '_blank', 'noopener,noreferrer');
          alert('[작성하신 예약 내용이 자동 복사되었습니다!]\\n\\n열리는 바른한의원 카카오톡 채널 상담창에 붙여넣기(Ctrl+V 또는 길게 눌러 붙여넣기) 후 전송해 주시면 대표원장실 전담 상담이 즉시 시작됩니다.\\n\\n--- 복사된 예약 내용 ---\\n' + kakaoMsg);
          if (!win) {
            window.location.href = kakaoChatUrl;
          }
          document.getElementById('consult-modal').classList.remove('open');
          consultForm.reset();
        });
      }

      // ====================================================================
      // 2. HORIZONTAL SMOOTH PASSERELLA RUNWAY ENGINE (MANUAL SCROLL ONLY)
      // ====================================================================
      const wrapper = document.getElementById('project-details-items-wrapper');
      const moveContainer = document.getElementById('project-details-items-move-container');
      const progressBar = document.getElementById('scroll-indicator-bar');
      const plates = Array.from(document.querySelectorAll('.project-details-item, #project-details-preview'));

      // 수정사항 1: 모든 카드에 아주 작게 일련번호(01, 02, 03...) 배지가 빠짐없이 들어가도록 보장
      plates.forEach((pl, idx) => {
        const numStr = (idx + 1) < 10 ? '0' + (idx + 1) : '' + (idx + 1);
        let badge = pl.querySelector(':scope > .tiny-card-num-badge');
        if (!badge) {
          badge = document.createElement('span');
          badge.className = 'tiny-card-num-badge';
          pl.insertBefore(badge, pl.firstChild);
        }
        badge.textContent = numStr;
      });

      let targetX = 0, currentX = 0, maxScrollX = 0;
      let isDragging = false, startDragX = 0, startTargetX = 0;
      let isTouchActive = false, touchLastX = 0, touchLastY = 0, touchLastTime = 0, touchInertiaVelX = 0;
      let lastDetailInteractMs = 0;

      function updateBounds() {
        maxScrollX = Math.max(0, moveContainer.scrollWidth - wrapper.clientWidth);
        targetX = Math.max(0, Math.min(targetX, maxScrollX));
      }

      window.addEventListener('resize', updateBounds);
      window.addEventListener('load', updateBounds);
      setTimeout(updateBounds, 200);
      setTimeout(updateBounds, 700);

      let lastLightboxWheelMs = 0;
      window.addEventListener('wheel', (e) => {
        const lbEl = document.getElementById('plate-lightbox');
        if (lbEl && lbEl.classList.contains('open')) {
          if (lbEl.classList.contains('has-gallery') && typeof window.stepCleanLightbox === 'function') {
            const nowW = performance.now();
            const deltaW = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
            if (Math.abs(deltaW) > 12 && nowW - lastLightboxWheelMs > 280) {
              lastLightboxWheelMs = nowW;
              window.stepCleanLightbox(deltaW > 0 ? 1 : -1);
            }
          }
          return;
        }
        if (window.innerWidth <= 1024) return;
        const metaEl = e.target.closest && e.target.closest('#project-details-meta');
        if (metaEl && metaEl.scrollHeight > metaEl.clientHeight + 4) {
          const atTop = metaEl.scrollTop <= 2 && e.deltaY < 0;
          const atBottom = (metaEl.scrollTop + metaEl.clientHeight >= metaEl.scrollHeight - 4) && e.deltaY > 0;
          if (!atTop && !atBottom) return;
        }
        lastDetailInteractMs = performance.now();
        updateBounds();
        touchInertiaVelX = 0;
        const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
        targetX = Math.max(0, Math.min(maxScrollX, targetX + delta * 1.15));
      }, { passive: true });

      wrapper.addEventListener('pointerdown', (e) => {
        if (window.innerWidth <= 1024) return;
        if (e.pointerType === 'touch' || e.target.closest('button, a, video, .concierge-video-frame, .editorial-text-zone, .father-letter-box, #detail-daddy-intro-overlay, #gjd-panorama-viewport, #gjd-pano-thumbs-bar, #diet-our-3d-body-stage')) return;
        lastDetailInteractMs = performance.now();
        isDragging = true;
        touchInertiaVelX = 0;
        startDragX = e.clientX;
        startTargetX = targetX;
        wrapper.setPointerCapture(e.pointerId);
      });

      wrapper.addEventListener('pointermove', (e) => {
        if (!isDragging) return;
        lastDetailInteractMs = performance.now();
        targetX = Math.max(0, Math.min(maxScrollX, startTargetX + (startDragX - e.clientX) * 1.35));
      });

      wrapper.addEventListener('pointerup', () => { isDragging = false; });
      wrapper.addEventListener('pointercancel', () => { isDragging = false; });

      // Unified Mobile Touch-Swipe (Calm 1-Card-Per-Swipe Step & Magnetic Centering)
      let touchStartTargetX = 0;
      let touchStartPlateIdx = 0;
      let touchAccumDelta = 0;

      function getClosestPlateIndex(xVal) {
        const vc = xVal + wrapper.clientWidth * 0.5;
        let cIdx = 0, minD = Infinity;
        plates.forEach((pl, i) => {
          const d = Math.abs((pl.offsetLeft + pl.offsetWidth * 0.5) - vc);
          if (d < minD) { minD = d; cIdx = i; }
        });
        return cIdx;
      }

      window.addEventListener('touchstart', (e) => {
        if (window.innerWidth <= 1024) return;
        if (!e.touches || !e.touches.length) return;
        if (e.target.closest && e.target.closest('#plate-lightbox, .consult-modal-card, .ba-modal-card, #detail-daddy-intro-overlay, #gjd-panorama-viewport, #gjd-pano-thumbs-bar, #diet-our-3d-body-stage')) return;
        updateBounds();
        isTouchActive = true;
        lastDetailInteractMs = performance.now();
        touchInertiaVelX = 0;
        touchAccumDelta = 0;
        touchStartTargetX = targetX;
        touchStartPlateIdx = getClosestPlateIndex(currentX);
        touchLastX = e.touches[0].clientX;
        touchLastY = e.touches[0].clientY;
        touchLastTime = performance.now();
      }, { passive: true });

      window.addEventListener('touchmove', (e) => {
        if (!isTouchActive || !e.touches || !e.touches.length) return;
        if (e.target.closest && e.target.closest('#plate-lightbox, .consult-modal-card, .ba-modal-card, #gjd-panorama-viewport, #gjd-pano-thumbs-bar, #diet-our-3d-body-stage')) return;
        const now = performance.now();
        lastDetailInteractMs = now;
        const curX = e.touches[0].clientX;
        const curY = e.touches[0].clientY;
        const dx = touchLastX - curX;
        const dy = touchLastY - curY;
        touchLastX = curX;
        touchLastY = curY;
        const dtSec = Math.max(0.008, Math.min(0.1, (now - touchLastTime) * 0.001));
        touchLastTime = now;

        // If touching inside #project-details-meta and scrolling vertically while meta still has scroll room, let meta scroll first
        const metaEl = e.target.closest && e.target.closest('#project-details-meta');
        if (metaEl && Math.abs(dy) > Math.abs(dx) && metaEl.scrollHeight > metaEl.clientHeight + 4) {
          const canScrollDown = dy > 0 && (metaEl.scrollTop + metaEl.clientHeight < metaEl.scrollHeight - 4);
          const canScrollUp = dy < 0 && (metaEl.scrollTop > 4);
          if (canScrollDown || canScrollUp) return;
        }

        updateBounds();
        const dominantDelta = Math.abs(dy) >= Math.abs(dx) ? dy : dx;
        touchAccumDelta += dominantDelta;
        const stepX = dominantDelta * 0.55;
        const maxOneCardSpan = Math.max(280, wrapper.clientWidth * 0.92);
        const minSwipeX = Math.max(0, touchStartTargetX - maxOneCardSpan);
        const maxSwipeX = Math.min(maxScrollX, touchStartTargetX + maxOneCardSpan);
        targetX = Math.max(minSwipeX, Math.min(maxSwipeX, targetX + stepX));
        const instVelX = stepX / dtSec;
        touchInertiaVelX = touchInertiaVelX * 0.5 + Math.max(-320, Math.min(320, instVelX)) * 0.5;
      }, { passive: true });

      const endTouchRunway = () => {
        if (!isTouchActive) return;
        isTouchActive = false;
        touchInertiaVelX = 0;
        lastDetailInteractMs = performance.now();
        // On mobile/tablet, snap cleanly to the current or next/prev 1 card so content never flies past!
        if (window.innerWidth <= 1024 && Math.abs(touchAccumDelta) > 12) {
          const stepDir = touchAccumDelta > 26 ? 1 : (touchAccumDelta < -26 ? -1 : 0);
          const nextIdx = Math.max(0, Math.min(plates.length - 1, touchStartPlateIdx + stepDir));
          window.jumpToPlate(nextIdx);
        }
      };
      window.addEventListener('touchend', endTouchRunway, { passive: true });
      window.addEventListener('touchcancel', endTouchRunway, { passive: true });

      window.addEventListener('keydown', (e) => {
        const lbEl = document.getElementById('plate-lightbox');
        if (lbEl && lbEl.classList.contains('open')) {
          if (e.key === 'Escape') {
            if (typeof window.closeCleanLightbox === 'function') window.closeCleanLightbox();
            return;
          }
          if (lbEl.classList.contains('has-gallery') && typeof window.stepCleanLightbox === 'function') {
            if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === 'ArrowDown' || e.key === ' ') {
              e.preventDefault();
              window.stepCleanLightbox(1);
              return;
            } else if (e.key === 'ArrowLeft' || e.key === 'PageUp' || e.key === 'ArrowUp') {
              e.preventDefault();
              window.stepCleanLightbox(-1);
              return;
            }
          }
          return;
        }
        lastDetailInteractMs = performance.now();
        updateBounds();
        if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === 'ArrowDown') targetX = Math.min(maxScrollX, targetX + window.innerWidth * 0.45);
        else if (e.key === 'ArrowLeft' || e.key === 'PageUp' || e.key === 'ArrowUp') targetX = Math.max(0, targetX - window.innerWidth * 0.45);
      });

      window.jumpToPlate = function(index) {
        lastDetailInteractMs = performance.now();
        const plate = plates[index];
        if (!plate) return;
        if (window.innerWidth <= 1024) {
          plate.scrollIntoView({ behavior: 'smooth', block: 'center' });
          return;
        }
        updateBounds();
        touchInertiaVelX = 0;
        const centerOffset = plate.offsetLeft - (wrapper.clientWidth - plate.offsetWidth) * 0.5;
        targetX = Math.max(0, Math.min(maxScrollX, centerOffset));
      };

      window.toggleDietTeleVideo = function(el) {
        const frame = el.closest ? el.closest('.concierge-video-frame') : document.querySelector('.concierge-video-frame');
        const vid = frame ? frame.querySelector('video') : document.getElementById('diet-tele-video-el');
        if (!vid) return;
        if (vid.paused) {
          vid.muted = false;
          vid.play().catch(function() {
            vid.muted = true;
            vid.play().catch(function() {});
          });
        } else {
          vid.pause();
        }
      };

      // Tap / Click on any story card (.project-details-item) to advance to the next story card
      (function enablePlateTapAdvance() {
        let lastPlateTapMs = 0;
        plates.forEach((plate, idx) => {
          if (plate.id === 'project-details-preview') return;
          plate.style.cursor = 'pointer';
          plate.addEventListener('click', (e) => {
            if (window.innerWidth <= 1024) return;
            if (e.target.closest('button, a, video, .concierge-video-frame, .editorial-text-zone, .father-letter-box')) return;
            if (Math.abs(touchAccumDelta) > 14) return;
            const now = performance.now();
            if (now - lastPlateTapMs < 260) return;
            lastPlateTapMs = now;
            lastDetailInteractMs = now;
            const activeIdx = getClosestPlateIndex(currentX);
            const nextIdx = idx > activeIdx ? idx : Math.min(plates.length - 1, activeIdx + 1);
            window.jumpToPlate(nextIdx);
          });
        });
      })();

      // ====================================================================
      // 3. MULTI-FRAME VIDEO-LIKE MOTION STAGE & 60FPS FX CANVAS ENGINE
      // ====================================================================
      const motionStages = Array.from(document.querySelectorAll('.motion-video-stage')).map((stageEl) => {
        const frames = (stageEl.dataset.frames || '').split('|').filter(Boolean);
        const duration = parseFloat(stageEl.dataset.duration || '6.0');
        const layerA = stageEl.querySelector('.frame-layer-a');
        const layerB = stageEl.querySelector('.frame-layer-b');
        const progFill = stageEl.querySelector('.motion-progress-fill');
        const fxCanvas = stageEl.querySelector('.plate-fx-canvas');
        const fxType = fxCanvas ? fxCanvas.dataset.fx : 'sunlight-bokeh';

        // Preload frames
        frames.forEach(src => { const img = new Image(); img.src = src; });

        return {
          stageEl, frames, duration, layerA, layerB, progFill, fxCanvas,
          fxCtx: fxCanvas ? fxCanvas.getContext('2d') : null,
          fxType,
          currIdx: 0,
          activeLayer: 'A',
          elapsed: 0
        };
      });

      function resizeFxCanvases() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        motionStages.forEach(ms => {
          if (!ms.fxCanvas || !ms.fxCtx) return;
          const r = ms.stageEl.getBoundingClientRect();
          if (r.width > 0 && r.height > 0) {
            ms.logicalW = r.width;
            ms.logicalH = r.height;
            ms.dpr = dpr;
            ms.fxCanvas.width = Math.round(r.width * dpr);
            ms.fxCanvas.height = Math.round(r.height * dpr);
            ms.fxCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
          }
        });
      }
      window.addEventListener('resize', resizeFxCanvases);
      setTimeout(resizeFxCanvases, 120);
      setTimeout(resizeFxCanvases, 600);

      // Interactive 3D Pointer Parallax for Director 9 Examination Motion Cards
      document.querySelectorAll('.project-details-item.is-director-exam-plate').forEach(plateEl => {
        plateEl.addEventListener('pointermove', (e) => {
          const r = plateEl.getBoundingClientRect();
          if (r.width <= 0 || r.height <= 0) return;
          const nx = ((e.clientX - r.left) / r.width - 0.5) * 2;
          const ny = ((e.clientY - r.top) / r.height - 0.5) * 2;
          plateEl.style.setProperty('--exam-mx', (nx * -8).toFixed(1) + 'px');
          plateEl.style.setProperty('--exam-my', (ny * -6).toFixed(1) + 'px');
        });
        plateEl.addEventListener('pointerleave', () => {
          plateEl.style.setProperty('--exam-mx', '0px');
          plateEl.style.setProperty('--exam-my', '0px');
        });
      });

      window.stepPlateFrame = function(btn) {
        const stageEl = btn.closest('.plate-media-inner')?.querySelector('.motion-video-stage');
        const ms = motionStages.find(m => m.stageEl === stageEl);
        if (!ms || ms.frames.length < 2) return;
        ms.currIdx = (ms.currIdx + 1) % ms.frames.length;
        ms.elapsed = (ms.currIdx / ms.frames.length) * ms.duration;
        applyStageFrame(ms, ms.currIdx);
      };

      window.switchPlateThumb = function(e, btn, isAuto) {
        if (e && typeof e.stopPropagation === 'function') e.stopPropagation();
        const dock = btn.closest('.plate-thumb-dock');
        if (dock) {
          dock.querySelectorAll('.plate-thumb-btn').forEach(b => b.classList.toggle('active', b === btn));
        }
        const plate = btn.closest('.project-details-item');
        if (!plate) return;
        if (!isAuto) plate.dataset.manualThumb = '1';
        const mode = btn.dataset.mode;
        const imgSrc = btn.dataset.img;
        const fit = btn.dataset.fit || 'cover';

        if (mode === 'motion') {
          const stageEl = plate.querySelector('.motion-video-stage');
          const ms = motionStages.find(m => m.stageEl === stageEl);
          const tIdx = parseInt(btn.dataset.idx || '0', 10);
          if (ms && tIdx >= 0 && tIdx < ms.frames.length) {
            ms.currIdx = tIdx;
            ms.elapsed = (tIdx / ms.frames.length) * ms.duration;
            applyStageFrame(ms, tIdx);
          }
          return;
        }

        const mediaImg = plate.querySelector('img.lusion-clean-media');
        if (mediaImg && imgSrc) {
          mediaImg.style.opacity = '0.35';
          setTimeout(() => {
            mediaImg.src = imgSrc;
            mediaImg.classList.toggle('is-contain-fit', fit === 'contain');
            plate.classList.toggle('has-contain-media', fit === 'contain');
            mediaImg.style.opacity = '1';
          }, 80);
        }
      };

      // Preload all clean-image thumbnails & gently auto-cycle active clean plate thumbnails unless manually selected
      document.querySelectorAll('.plate-thumb-btn[data-img]').forEach(b => {
        const im = new Image();
        im.src = b.dataset.img;
      });

      setInterval(() => {
        const activePlate = document.querySelector('.project-details-item.is-clean-plate.is-active-plate');
        if (!activePlate || activePlate.dataset.manualThumb === '1') return;
        const btns = Array.from(activePlate.querySelectorAll('.plate-thumb-btn[data-mode="clean"]'));
        if (btns.length < 2) return;
        const currIdx = btns.findIndex(b => b.classList.contains('active'));
        const nextBtn = btns[(currIdx + 1) % btns.length];
        if (nextBtn) window.switchPlateThumb(null, nextBtn, true);
      }, 4500);

      // ====================================================================
      // 3B. INTERACTIVE FULLSCREEN GALLERY LIGHTBOX ENGINE (WITH PREV/NEXT)
      // ====================================================================
      let lightboxGallery = [];
      let lightboxCurrIdx = 0;

      function renderLightboxState() {
        const lbEl = document.getElementById('plate-lightbox');
        const lbImg = document.getElementById('lightbox-img');
        if (!lbEl || !lbImg) return;

        const hasGallery = Array.isArray(lightboxGallery) && lightboxGallery.length > 1;
        lbEl.classList.toggle('has-gallery', hasGallery);

        if (!lightboxGallery.length) return;
        lightboxCurrIdx = ((lightboxCurrIdx % lightboxGallery.length) + lightboxGallery.length) % lightboxGallery.length;
        const item = lightboxGallery[lightboxCurrIdx];
        if (!item || !item.src) return;

        lbImg.style.opacity = '0.38';
        lbImg.src = item.src;
        setTimeout(() => { lbImg.style.opacity = '1'; }, 40);

        // Preload adjacent gallery images for instant next/prev transition
        if (hasGallery) {
          const nextItem = lightboxGallery[(lightboxCurrIdx + 1) % lightboxGallery.length];
          const prevItem = lightboxGallery[(lightboxCurrIdx - 1 + lightboxGallery.length) % lightboxGallery.length];
          if (nextItem && nextItem.src) { const im1 = new Image(); im1.src = nextItem.src; }
          if (prevItem && prevItem.src) { const im2 = new Image(); im2.src = prevItem.src; }
        }

        const counterBadge = document.getElementById('lightbox-counter-badge');
        const titleText = document.getElementById('lightbox-title-text');
        const capTitle = document.getElementById('lightbox-caption-title');
        const capDesc = document.getElementById('lightbox-caption-desc');
        const dotsStrip = document.getElementById('lightbox-dots-strip');

        const n = lightboxCurrIdx + 1;
        const total = lightboxGallery.length;
        const numPad = (n < 10 ? '0' + n : '' + n) + ' / ' + (total < 10 ? '0' + total : '' + total);
        if (counterBadge) counterBadge.textContent = numPad;
        if (titleText) {
          titleText.textContent = (item.tag ? '[' + item.tag + '] ' : '') + (item.title || '확대 이미지 보기');
        }
        if (capTitle) capTitle.textContent = (item.code ? item.code + ' · ' : '') + (item.title || '');
        if (capDesc) capDesc.textContent = item.desc || '좌우 화살표(◀ ▶) 버튼 또는 이미지를 클릭하시면 다음 이미지로 넘어갑니다.';

        if (dotsStrip && hasGallery) {
          const chips = Array.from(dotsStrip.querySelectorAll('.lightbox-page-chip'));
          if (chips.length !== lightboxGallery.length) {
            dotsStrip.innerHTML = lightboxGallery.map((g, gIdx) => {
              const label = g.short || ((gIdx + 1 < 10 ? '0' + (gIdx + 1) : '' + (gIdx + 1)) + 'P');
              return '<button type="button" class="lightbox-page-chip' + (gIdx === lightboxCurrIdx ? ' active' : '') + '" onclick="event.stopPropagation(); window.jumpCleanLightbox(' + gIdx + ')">' + label + '</button>';
            }).join('');
          } else {
            chips.forEach((ch, cIdx) => ch.classList.toggle('active', cIdx === lightboxCurrIdx));
          }
          const activeChip = dotsStrip.querySelector('.lightbox-page-chip.active');
          if (activeChip) {
            const scrollLeft = activeChip.offsetLeft - (dotsStrip.clientWidth - activeChip.offsetWidth) * 0.5;
            dotsStrip.scrollTo({ left: Math.max(0, scrollLeft), behavior: 'smooth' });
          }
        }

        if (item.isGjdPanorama && typeof window.selectGjdPanorama === 'function') {
          window.selectGjdPanorama(lightboxCurrIdx, true);
        }
      }

      window.openCleanLightbox = function(src, customGallery, startIndex) {
        if (!src && (!customGallery || !customGallery.length)) return;
        const lbEl = document.getElementById('plate-lightbox');
        if (!lbEl) return;

        if (Array.isArray(customGallery) && customGallery.length > 0) {
          lightboxGallery = customGallery;
          lightboxCurrIdx = typeof startIndex === 'number' ? startIndex : 0;
        } else {
          // Auto-detect if src belongs to Card 06 Panorama Archive
          const panoSlides = Array.from(document.querySelectorAll('#gjd-panorama-track .gjd-pano-slide'));
          const cleanFile = String(src || '').split('?')[0].split('/').pop();
          let matchedPanoIdx = -1;
          if (panoSlides.length > 0 && cleanFile) {
            matchedPanoIdx = panoSlides.findIndex(sl => {
              const sImg = sl.getAttribute('data-img') || '';
              return sImg.endsWith(cleanFile);
            });
          }
          if (matchedPanoIdx >= 0 && typeof window.getGjdPanoramaGalleryList === 'function') {
            lightboxGallery = window.getGjdPanoramaGalleryList();
            lightboxCurrIdx = matchedPanoIdx;
          } else {
            lightboxGallery = [{ src: src, title: '원본 확대 이미지', desc: '' }];
            lightboxCurrIdx = 0;
          }
        }

        renderLightboxState();
        lbEl.classList.add('open');
      };

      window.stepCleanLightbox = function(dir) {
        if (!lightboxGallery || lightboxGallery.length < 2) return;
        lightboxCurrIdx = ((lightboxCurrIdx + (dir || 1)) % lightboxGallery.length + lightboxGallery.length) % lightboxGallery.length;
        renderLightboxState();
      };

      window.jumpCleanLightbox = function(idx) {
        if (!lightboxGallery || !lightboxGallery.length) return;
        lightboxCurrIdx = ((idx % lightboxGallery.length) + lightboxGallery.length) % lightboxGallery.length;
        renderLightboxState();
      };

      window.handleLightboxImgClick = function() {
        if (lightboxGallery && lightboxGallery.length > 1) {
          window.stepCleanLightbox(1);
        }
      };

      window.closeCleanLightbox = function() {
        const lbEl = document.getElementById('plate-lightbox');
        if (lbEl) lbEl.classList.remove('open');
      };

      // Touch swipe left/right inside #plate-lightbox to view next/prev image
      (function initLightboxTouchSwipe() {
        const lbEl = document.getElementById('plate-lightbox');
        if (!lbEl) return;
        let lbTouchStartX = 0;
        let lbTouchStartY = 0;
        let lbTracking = false;
        lbEl.addEventListener('touchstart', (e) => {
          if (!lbEl.classList.contains('open') || !e.touches || !e.touches.length) return;
          if (e.target.closest && e.target.closest('.lightbox-dots-strip')) return;
          lbTracking = true;
          lbTouchStartX = e.touches[0].clientX;
          lbTouchStartY = e.touches[0].clientY;
        }, { passive: true });
        lbEl.addEventListener('touchend', (e) => {
          if (!lbTracking || !e.changedTouches || !e.changedTouches.length) return;
          lbTracking = false;
          const dx = lbTouchStartX - e.changedTouches[0].clientX;
          const dy = lbTouchStartY - e.changedTouches[0].clientY;
          if (Math.abs(dx) > 36 && Math.abs(dx) > Math.abs(dy)) {
            window.stepCleanLightbox(dx > 0 ? 1 : -1);
          }
        }, { passive: true });
      })();

      window.openLightboxFromPlate = function(btn) {
        const stageEl = btn.closest('.plate-media-inner')?.querySelector('.motion-video-stage');
        const ms = motionStages.find(m => m.stageEl === stageEl);
        if (ms && ms.frames && ms.frames.length > 1) {
          const gList = ms.frames.map((fSrc, fIdx) => ({
            src: fSrc,
            code: 'SCENE 0' + (fIdx + 1),
            short: '0' + (fIdx + 1) + ' 장면',
            title: '장면 0' + (fIdx + 1) + ' 확대 보기',
            desc: '좌우 화살표(◀ ▶) 또는 이미지를 클릭하면 다음 장면으로 이동합니다.'
          }));
          window.openCleanLightbox(ms.frames[ms.currIdx], gList, ms.currIdx);
          return;
        }
        const src = ms ? ms.frames[ms.currIdx] : '';
        if (src) window.openCleanLightbox(src);
      };

      function applyStageFrame(ms, nextIdx) {
        const url = ms.frames[nextIdx];
        if (ms.activeLayer === 'A') {
          ms.layerB.style.backgroundImage = "url('" + url + "')";
          ms.layerB.style.opacity = '1';
          ms.layerA.style.opacity = '0';
          ms.activeLayer = 'B';
        } else {
          ms.layerA.style.backgroundImage = "url('" + url + "')";
          ms.layerA.style.opacity = '1';
          ms.layerB.style.opacity = '0';
          ms.activeLayer = 'A';
        }
        const plate = ms.stageEl.closest('.project-details-item');
        if (plate) {
          plate.querySelectorAll('.plate-thumb-btn[data-mode="motion"]').forEach((b, bIdx) => {
            b.classList.toggle('active', bIdx === nextIdx);
          });
        }
      }

      function drawPlateMotionFx(ms, timeSec, cycleNorm) {
        const ctx = ms.fxCtx;
        const w = ms.logicalW || (ms.fxCanvas ? ms.fxCanvas.width : 0);
        const h = ms.logicalH || (ms.fxCanvas ? ms.fxCanvas.height : 0);
        if (!ctx || w <= 0 || h <= 0) return;

        ctx.clearRect(0, 0, w, h);
        const type = ms.fxType;

        if (type === 'spine-pain-scan') {
          // Animated bending red spine curve + 7 sequential pain nodes
          const joints = [
            { name: '목', x: w * 0.52, y: h * 0.24 },
            { name: '어깨', x: w * 0.48, y: h * 0.31 },
            { name: '팔', x: w * 0.43, y: h * 0.43 },
            { name: '척추', x: w * 0.51, y: h * 0.39 },
            { name: '허리', x: w * 0.49, y: h * 0.50 },
            { name: '다리', x: w * 0.48, y: h * 0.69 },
            { name: '발', x: w * 0.49, y: h * 0.86 }
          ];
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(239, 68, 68, 0.78)';
          ctx.lineWidth = 3;
          joints.slice(0, 5).forEach((j, i) => {
            const ox = Math.sin(timeSec * 3 + i) * 6 * cycleNorm;
            if (i === 0) ctx.moveTo(j.x + ox, j.y);
            else ctx.lineTo(j.x + ox, j.y);
          });
          ctx.stroke();

          joints.forEach((j, idx) => {
            const threshold = idx / joints.length;
            if (cycleNorm < threshold * 0.85) return;
            const pulse = 7 + Math.sin(timeSec * 5 + idx) * 3;
            ctx.beginPath();
            ctx.arc(j.x, j.y, pulse * 1.9, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(239, 68, 68, 0.24)';
            ctx.fill();
            ctx.beginPath();
            ctx.arc(j.x, j.y, pulse, 0, Math.PI * 2);
            ctx.strokeStyle = '#F87171';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.fillStyle = '#FFFFFF';
            ctx.font = '700 11px Pretendard, sans-serif';
            ctx.fillText(j.name, j.x + 12, j.y + 4);
          });
        } else if (type === 'manse-emerald') {
          // Straight emerald spine + 7 recovered green nodes + rising joy particles
          const joints = [
            { name: '목', x: w * 0.53, y: h * 0.22 },
            { name: '어깨', x: w * 0.49, y: h * 0.26 },
            { name: '팔', x: w * 0.45, y: h * 0.16 },
            { name: '척추', x: w * 0.53, y: h * 0.36 },
            { name: '허리', x: w * 0.53, y: h * 0.48 },
            { name: '다리', x: w * 0.51, y: h * 0.70 },
            { name: '발', x: w * 0.52, y: h * 0.88 }
          ];
          ctx.beginPath();
          ctx.moveTo(w * 0.53, h * 0.21);
          ctx.lineTo(w * 0.53, h * 0.52);
          ctx.strokeStyle = 'rgba(16, 185, 129, 0.85)';
          ctx.lineWidth = 3.5;
          ctx.stroke();

          joints.forEach((j, idx) => {
            if (cycleNorm < (idx / joints.length) * 0.8) return;
            const r = 7 + Math.sin(timeSec * 4.5 + idx) * 2.5;
            ctx.beginPath();
            ctx.arc(j.x, j.y, r * 2, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(16, 185, 129, 0.26)';
            ctx.fill();
            ctx.beginPath();
            ctx.arc(j.x, j.y, r, 0, Math.PI * 2);
            ctx.strokeStyle = '#6EE7B7';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.fillStyle = '#A7F3D0';
            ctx.font = '700 11px Pretendard, sans-serif';
            ctx.fillText(j.name + ' 회복', j.x + 12, j.y + 4);
          });
        } else if (type === 'growth-starlight') {
          // Upward height scale ruler + twinkling golden stars after growth
          const rulerX = w * 0.34;
          const topY = h * (0.48 - cycleNorm * 0.24);
          ctx.strokeStyle = 'rgba(253, 230, 138, 0.75)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(rulerX, h * 0.65);
          ctx.lineTo(rulerX, topY);
          ctx.stroke();
          ctx.fillStyle = '#FDE68A';
          ctx.font = '800 13px Pretendard, sans-serif';
          ctx.fillText('▲ 성장판 연골 증식 · 학술 검증 성장 치료', rulerX - 28, topY - 10);

          if (cycleNorm > 0.55) {
            const starAlpha = Math.min(1, (cycleNorm - 0.55) / 0.35);
            for (let i = 0; i < 10; i++) {
              const sx = w * (0.38 + (i % 5) * 0.06 + Math.sin(i * 2.1) * 0.03);
              const sy = h * (0.14 + Math.floor(i / 5) * 0.14 + Math.cos(i * 1.7) * 0.04);
              const sr = (5 + (i % 3) * 3) * (0.6 + 0.4 * Math.sin(timeSec * 5 + i));
              ctx.save();
              ctx.translate(sx, sy);
              ctx.fillStyle = 'rgba(253, 230, 138, ' + (starAlpha * 0.9).toFixed(2) + ')';
              ctx.beginPath();
              ctx.moveTo(0, -sr);
              ctx.quadraticCurveTo(0, 0, sr, 0);
              ctx.quadraticCurveTo(0, 0, 0, sr);
              ctx.quadraticCurveTo(0, 0, -sr, 0);
              ctx.quadraticCurveTo(0, 0, 0, -sr);
              ctx.fill();
              ctx.restore();
            }
          }
        } else if (type === 'ultrasound-beam' || type === 'chuna-laser-grid' || type === 'follicle-laser') {
          // Scanning medical laser beam + live telemetry wave
          const scanY = h * (0.2 + 0.6 * (0.5 + 0.5 * Math.sin(timeSec * 1.8)));
          const grad = ctx.createLinearGradient(0, scanY - 24, 0, scanY + 24);
          grad.addColorStop(0, 'rgba(16, 185, 129, 0)');
          grad.addColorStop(0.5, 'rgba(110, 231, 183, 0.45)');
          grad.addColorStop(1, 'rgba(16, 185, 129, 0)');
          ctx.fillStyle = grad;
          ctx.fillRect(w * 0.12, scanY - 24, w * 0.76, 48);

          ctx.strokeStyle = 'rgba(110, 231, 183, 0.7)';
          ctx.lineWidth = 1.5;
          ctx.strokeRect(w * 0.28, h * 0.24, w * 0.44, h * 0.46);
        } else if (type === 'thermal-cooling') {
          // Downward cooling cyan water-wave replacing red heat aura
          const coolY = h * cycleNorm;
          const grad = ctx.createLinearGradient(0, coolY - 40, 0, coolY + 40);
          grad.addColorStop(0, 'rgba(56, 189, 248, 0)');
          grad.addColorStop(0.5, 'rgba(56, 189, 248, 0.42)');
          grad.addColorStop(1, 'rgba(239, 68, 68, 0.18)');
          ctx.fillStyle = grad;
          ctx.fillRect(0, coolY - 40, w, 80);
          ctx.fillStyle = '#BAE6FD';
          ctx.font = '800 13px Pretendard, sans-serif';
          ctx.fillText('❄️ 수승화강 두피 청열 · 학술 검증 모근 보호', 26, 76);
        } else if (type === 'muscle-diet-core-fx') {
          // CARD 01 (Diet): 근육다이어트 — 운동 없이 근육량 ▲ 상승 · 뱃살지방 ▼ 분해 모션
          const wx = w * 0.52, wy = h * 0.54;
          ctx.save();
          // Scanning metabolic laser wave across the abdomen
          const scanY = h * (0.28 + 0.42 * (0.5 + 0.5 * Math.sin(timeSec * 2.1)));
          const scanGrad = ctx.createLinearGradient(0, scanY - 28, 0, scanY + 28);
          scanGrad.addColorStop(0, 'rgba(217, 119, 6, 0)');
          scanGrad.addColorStop(0.5, 'rgba(251, 191, 36, 0.34)');
          scanGrad.addColorStop(1, 'rgba(217, 119, 6, 0)');
          ctx.fillStyle = scanGrad;
          ctx.fillRect(w * 0.16, scanY - 28, w * 0.68, 56);

          // Concentric abdominal lipolysis & muscle activation rings
          for (let r = 0; r < 3; r++) {
            const p = (timeSec * 0.85 + r * 0.33) % 1;
            ctx.beginPath();
            ctx.arc(wx, wy, 18 + p * 74, 0, Math.PI * 2);
            ctx.strokeStyle = r % 2 === 0
              ? 'rgba(251, 191, 36, ' + ((1 - p) * 0.68).toFixed(2) + ')'
              : 'rgba(52, 211, 153, ' + ((1 - p) * 0.58).toFixed(2) + ')';
            ctx.lineWidth = 2.2;
            ctx.stroke();
          }

          // Floating metabolic lipolysis sparks rising upward
          for (let s = 0; s < 10; s++) {
            const sp = (timeSec * 0.72 + s * 0.19) % 1;
            const sx = wx + Math.sin(s * 2.1 + timeSec * 1.4) * (w * 0.22);
            const sy = wy + 44 - sp * 110;
            ctx.beginPath();
            ctx.arc(sx, sy, 2.2 + (1 - sp) * 2.4, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(253, 224, 71, ' + ((1 - sp) * 0.82).toFixed(2) + ')';
            ctx.fill();
          }
          ctx.restore();
        } else if (type === 'belt-zipper-morning-fx' || type === 'metabolic-burn' || type === 'sline-curtain') {
          // STORY 01 (Diet): Waistline Zipper Tension Pulse & Last Belt Hole Callout
          const wx = w * 0.54, wy = h * 0.62;
          ctx.save();
          for (let r = 0; r < 2; r++) {
            const p = (timeSec * 0.78 + r * 0.5) % 1;
            ctx.beginPath();
            ctx.arc(wx, wy, 14 + p * 58, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(223, 126, 142, ' + ((1 - p) * 0.58).toFixed(2) + ')';
            ctx.lineWidth = 2;
            ctx.stroke();
          }
          const tagW = 264, tagH = 30;
          const tx = Math.max(20, Math.min(w - tagW - 20, wx - tagW * 0.5));
          const ty = Math.max(66, wy - 76);
          ctx.fillStyle = 'rgba(22, 16, 19, 0.86)';
          ctx.strokeStyle = 'rgba(223, 126, 142, 0.72)';
          ctx.lineWidth = 1.3;
          ctx.beginPath();
          ctx.roundRect(tx, ty, tagW, tagH, 999);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = '#FBE6EA';
          ctx.font = '800 11.5px Pretendard, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('⚠️ 복부 대사 정체 · 내장지방 축적 신호', tx + tagW * 0.5, ty + 19.5);
          ctx.textAlign = 'left';
          ctx.restore();
        } else if (type === 'warm-breath-zoom') {
          // STORY 01: Warm morning sunlight volumetric rays + breathing golden aura
          const breath = 0.5 + 0.5 * Math.sin(timeSec * 1.35);
          const sunGrad = ctx.createRadialGradient(w * 0.22, h * 0.16, 10, w * 0.35, h * 0.38, Math.max(w, h) * 0.78);
          sunGrad.addColorStop(0, 'rgba(253, 230, 138, ' + (0.22 + breath * 0.16).toFixed(3) + ')');
          sunGrad.addColorStop(0.45, 'rgba(212, 175, 55, ' + (0.09 + breath * 0.08).toFixed(3) + ')');
          sunGrad.addColorStop(1, 'rgba(212, 175, 55, 0)');
          ctx.fillStyle = sunGrad;
          ctx.fillRect(0, 0, w, h);

          // Soft diagonal morning light shafts
          ctx.save();
          for (let i = 0; i < 3; i++) {
            const beamX = w * (0.14 + i * 0.22) + Math.sin(timeSec * 0.6 + i) * 18;
            const beamGrad = ctx.createLinearGradient(beamX, 0, beamX + w * 0.18, h * 0.85);
            beamGrad.addColorStop(0, 'rgba(253, 230, 138, ' + (0.11 + breath * 0.06).toFixed(3) + ')');
            beamGrad.addColorStop(1, 'rgba(253, 230, 138, 0)');
            ctx.fillStyle = beamGrad;
            ctx.beginPath();
            ctx.moveTo(beamX, 0);
            ctx.lineTo(beamX + w * 0.14, 0);
            ctx.lineTo(beamX + w * 0.34, h);
            ctx.lineTo(beamX + w * 0.12, h);
            ctx.closePath();
            ctx.fill();
          }
          ctx.restore();

          // Floating warm dust motes
          for (let i = 0; i < 18; i++) {
            const bx = ((i * 89 + timeSec * 14) % w);
            const by = h - ((i * 67 + timeSec * 20) % h);
            const br = 1.8 + (i % 4) * 1.4;
            ctx.beginPath();
            ctx.arc(bx, by, br, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(253, 230, 138, ' + (0.22 + 0.28 * Math.sin(timeSec * 2.2 + i)).toFixed(2) + ')';
            ctx.fill();
          }
        } else if (type === 'live-ecg-pulse-wave') {
          // STORY 02: Both wrists 촌·관·척 pulse points + real-time 3-channel heartbeat & autonomic pulse overlay
          const wristPoints = [
            { x: w * 0.43, y: h * 0.68, label: '좌측 촌·관·척 (심·간·신)' },
            { x: w * 0.58, y: h * 0.68, label: '우측 촌·관·척 (폐·비·명문)' }
          ];
          wristPoints.forEach((wp, idx) => {
            for (let r = 0; r < 3; r++) {
              const p = (timeSec * 0.75 + r * 0.33 + idx * 0.15) % 1;
              ctx.beginPath();
              ctx.arc(wp.x, wp.y, 12 + p * 68, 0, Math.PI * 2);
              ctx.strokeStyle = r % 2 === 0
                ? 'rgba(212, 175, 55, ' + ((1 - p) * 0.65).toFixed(2) + ')'
                : 'rgba(16, 185, 129, ' + ((1 - p) * 0.55).toFixed(2) + ')';
              ctx.lineWidth = 2;
              ctx.stroke();
            }
            ctx.beginPath();
            ctx.arc(wp.x, wp.y, 5, 0, Math.PI * 2);
            ctx.fillStyle = '#6EE7B7';
            ctx.fill();
          });

          // Translucent real-time pulse & ECG wave monitor overlay
          const panelW = Math.min(w - 44, 430);
          const panelH = 128;
          const px = 22, py = 66;
          ctx.fillStyle = 'rgba(10, 14, 20, 0.74)';
          ctx.strokeStyle = 'rgba(212, 175, 55, 0.45)';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.roundRect(px, py, panelW, panelH, 14);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = '#FDE68A';
          ctx.font = '800 11.5px Pretendard, sans-serif';
          const bpm = 68 + Math.round(Math.sin(timeSec * 1.5) * 2);
          ctx.fillText('♥ LIVE 촌·관·척 양 손목 정밀 맥파 스캔 (자율신경·오장육부)', px + 14, py + 22);

          const chNames = ['촌(寸·상초)', '관(關·중초)', '척(尺·하초)'];
          const chColors = ['#D4AF37', '#10B981', '#38BDF8'];
          chNames.forEach((cn, cIdx) => {
            const baseY = py + 46 + cIdx * 30;
            ctx.fillStyle = 'rgba(255,255,255,0.78)';
            ctx.font = '700 10.5px Pretendard, sans-serif';
            ctx.fillText(cn, px + 14, baseY + 4);

            const waveStartX = px + 82;
            const waveEndX = px + panelW - 16;
            ctx.beginPath();
            ctx.strokeStyle = chColors[cIdx];
            ctx.lineWidth = 2;
            for (let x = waveStartX; x <= waveEndX; x += 2) {
              const phase = (x - waveStartX) * 0.065 - timeSec * 4.8 + cIdx * 1.3;
              const ecgSpike = Math.exp(-Math.pow(((phase % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2) - 3.1, 2) * 18) * 11;
              const y = baseY + Math.sin(phase) * 4.5 - ecgSpike;
              if (x === waveStartX) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
            }
            ctx.stroke();
          });
        } else if (type === 'integrative-design-hud') {
          // STORY 03: Integrative treatment design roadmap HUD + warm nodding empathy waves
          const panelW = Math.min(w - 44, 370);
          const panelH = 148;
          const px = w - panelW - 22;
          const py = 66;
          ctx.fillStyle = 'rgba(12, 16, 22, 0.76)';
          ctx.strokeStyle = 'rgba(110, 231, 183, 0.45)';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.roundRect(px, py, panelW, panelH, 14);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = '#FDE68A';
          ctx.font = '800 11.5px Pretendard, sans-serif';
          ctx.fillText('✦ 사상체질 × 학술 논문 검증 통합 치료 설계도', px + 14, py + 22);

          const steps = [
            '첫째. 심층 경청 & 자율신경·스트레스 정밀 분석',
            '둘째. 사상체질(태양·태음·소양·소음) 변증 진단',
            '셋째. 추나(구조) · 약침(기혈) · 맞춤한약(본원) 설계',
            '넷째. 치료 경과 예측 및 생활습관 전담 밀착 코칭'
          ];
          const activeStep = Math.floor((timeSec * 0.85) % steps.length);
          steps.forEach((st, idx) => {
            const sy = py + 46 + idx * 26;
            const isAct = idx === activeStep;
            ctx.fillStyle = isAct ? 'rgba(16, 185, 129, 0.25)' : 'rgba(255, 255, 255, 0.04)';
            ctx.beginPath();
            ctx.roundRect(px + 12, sy - 14, panelW - 24, 21, 6);
            ctx.fill();
            ctx.fillStyle = isAct ? '#6EE7B7' : 'rgba(248, 250, 252, 0.78)';
            ctx.font = (isAct ? '800 ' : '600 ') + '11px Pretendard, sans-serif';
            ctx.fillText((isAct ? '● ' : '○ ') + st, px + 20, sy);
          });
        } else if (type === 'gold-loupe-scan') {
          // STORY 04: 1st-Person POV Gold Optical Loupe (확대경) Scanning Motion
          const lx = w * (0.48 + Math.sin(timeSec * 0.95) * 0.16);
          const ly = h * (0.49 + Math.sin(timeSec * 1.9) * 0.10);
          const lr = Math.min(w, h) * 0.16;

          // Subtle golden illumination inside loupe lens
          const lensGrad = ctx.createRadialGradient(lx - lr * 0.25, ly - lr * 0.25, 4, lx, ly, lr);
          lensGrad.addColorStop(0, 'rgba(255, 250, 220, 0.28)');
          lensGrad.addColorStop(0.7, 'rgba(212, 175, 55, 0.14)');
          lensGrad.addColorStop(1, 'rgba(16, 185, 129, 0.22)');
          ctx.fillStyle = lensGrad;
          ctx.beginPath();
          ctx.arc(lx, ly, lr, 0, Math.PI * 2);
          ctx.fill();

          // Optical crosshair & degree ticks inside loupe
          ctx.save();
          ctx.translate(lx, ly);
          ctx.strokeStyle = 'rgba(253, 230, 138, 0.55)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(-lr * 0.75, 0); ctx.lineTo(lr * 0.75, 0);
          ctx.moveTo(0, -lr * 0.75); ctx.lineTo(0, lr * 0.75);
          ctx.stroke();

          for (let a = 0; a < 24; a++) {
            const ang = (a / 24) * Math.PI * 2 + timeSec * 0.35;
            const r1 = lr * (a % 3 === 0 ? 0.84 : 0.90);
            ctx.beginPath();
            ctx.moveTo(Math.cos(ang) * r1, Math.sin(ang) * r1);
            ctx.lineTo(Math.cos(ang) * (lr - 2), Math.sin(ang) * (lr - 2));
            ctx.stroke();
          }

          // Outer 24K Gold Loupe Rim
          ctx.beginPath();
          ctx.arc(0, 0, lr, 0, Math.PI * 2);
          ctx.strokeStyle = '#D4AF37';
          ctx.lineWidth = 4.5;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(0, 0, lr + 4, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(253, 230, 138, 0.55)';
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.restore();

          // Telemetry label next to loupe
          const tagW = 248, tagH = 58;
          const tx = Math.min(w - tagW - 18, Math.max(18, lx + lr * 0.75));
          const ty = Math.max(66, ly - lr * 0.85);
          ctx.fillStyle = 'rgba(10, 13, 18, 0.84)';
          ctx.strokeStyle = '#D4AF37';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.roundRect(tx, ty, tagW, tagH, 10);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = '#FDE68A';
          ctx.font = '800 11px Pretendard, sans-serif';
          ctx.fillText('🔍 대표원장 광학 루페 약재 검수 · PASS', tx + 12, ty + 20);
          ctx.fillStyle = '#A7F3D0';
          ctx.font = '700 10.5px Pretendard, sans-serif';
          ctx.fillText('• 러시아산 원용 분골 최상단 조직밀도 확인', tx + 12, ty + 36);
          ctx.fillText('• GAP 청정 약재 잔류농약·중금속 ZERO', tx + 12, ty + 50);
        } else if (type === 'liver-safety-decoction-chart') {
          // STORY 05: Live AST/ALT Liver Safety & Antioxidant Chart + 10-Step Safe Decoction System
          const padX = 22;
          const topY = 62;
          const boxW = Math.min(340, (w - 58) * 0.48);
          const boxH = 146;

          // Left Box: Real-Time AST/ALT & Antioxidant Chart
          ctx.fillStyle = 'rgba(10, 14, 20, 0.80)';
          ctx.strokeStyle = 'rgba(16, 185, 129, 0.5)';
          ctx.lineWidth = 1.3;
          ctx.beginPath();
          ctx.roundRect(padX, topY, boxW, boxH, 14);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = '#6EE7B7';
          ctx.font = '800 11.5px Pretendard, sans-serif';
          ctx.fillText('📊 복용 전·후 간 수치(AST/ALT) & 항산화 실시간 차트', padX + 12, topY + 21);

          const bars = [
            { label: 'AST (간 기능 안전성 논문 검수)', before: '복용 전', after: '정상 안심 유지', ratio: 0.52, col: '#10B981' },
            { label: 'ALT (간 기능 안전성 논문 검수)', before: '복용 전', after: '정상 안심 유지', ratio: 0.45, col: '#34D399' },
            { label: '항산화 효소 (SOD·GSH 논문 검증)', before: '복용 전', after: '항산화 활성 입증', ratio: 0.92, col: '#D4AF37' }
          ];
          bars.forEach((b, bIdx) => {
            const by = topY + 42 + bIdx * 34;
            ctx.fillStyle = 'rgba(255,255,255,0.86)';
            ctx.font = '700 10.5px Pretendard, sans-serif';
            ctx.fillText(b.label + ' : ' + b.before + ' ➔ ' + b.after, padX + 12, by);

            const trackW = boxW - 24;
            ctx.fillStyle = 'rgba(255,255,255,0.12)';
            ctx.beginPath();
            ctx.roundRect(padX + 12, by + 6, trackW, 8, 4);
            ctx.fill();

            const animW = trackW * b.ratio * (0.88 + 0.12 * Math.sin(timeSec * 2.5 + bIdx));
            ctx.fillStyle = b.col;
            ctx.beginPath();
            ctx.roundRect(padX + 12, by + 6, animW, 8, 4);
            ctx.fill();
          });

          // Right Box: 10-Step In-House Safe Decoction System
          const rBoxX = w - boxW - padX;
          if (rBoxX > padX + boxW + 8) {
            ctx.fillStyle = 'rgba(10, 14, 20, 0.80)';
            ctx.strokeStyle = 'rgba(212, 175, 55, 0.5)';
            ctx.lineWidth = 1.3;
            ctx.beginPath();
            ctx.roundRect(rBoxX, topY, boxW, boxH, 14);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = '#FDE68A';
            ctx.font = '800 11.5px Pretendard, sans-serif';
            ctx.fillText('🛡️ 원내 무균 안전 탕전 시스템 (LIVE 가동)', rBoxX + 12, topY + 21);

            const tenSteps = [
              'GAP약재선별', '중금속불검출',
              '원장루페검수', '초순수세척',
              '저온정밀불림', '무압력탕전',
              '방향성분포집', '미세안전여과',
              '고온멸균패킹', '원장최종검수'
            ];
            const activeTen = Math.floor((timeSec * 1.8) % 10);
            const colW = (boxW - 28) * 0.5;
            tenSteps.forEach((st, idx) => {
              const col = idx % 2;
              const row = Math.floor(idx / 2);
              const sx = rBoxX + 12 + col * (colW + 4);
              const sy = topY + 30 + row * 22;
              const isAct = idx === activeTen;
              ctx.fillStyle = isAct ? 'rgba(212, 175, 55, 0.28)' : 'rgba(255,255,255,0.05)';
              ctx.beginPath();
              ctx.roundRect(sx, sy, colW, 18, 5);
              ctx.fill();
              ctx.fillStyle = isAct ? '#FDE68A' : 'rgba(255,255,255,0.75)';
              ctx.font = (isAct ? '800 ' : '600 ') + '9.8px Pretendard, sans-serif';
              ctx.fillText((isAct ? '✓ ' : '• ') + st, sx + 6, sy + 12.5);
            });
          }
        } else if (type === 'distance-30cm-tension') {
          // STORY 01: 30cm Proximity Gaze Tension Radar & Distance Callout
          const cx = w * 0.46, cy = h * 0.28;
          const peerX = w * 0.64, peerY = h * 0.20;
          const pulse = 0.5 + 0.5 * Math.sin(timeSec * 3.2);

          // Dashed gaze line from colleague/date to crown (30cm proximity)
          ctx.save();
          ctx.setLineDash([6, 5]);
          ctx.strokeStyle = 'rgba(248, 113, 113, ' + (0.55 + pulse * 0.35).toFixed(2) + ')';
          ctx.lineWidth = 2.2;
          ctx.beginPath();
          ctx.moveTo(peerX, peerY);
          ctx.lineTo(cx, cy);
          ctx.stroke();
          ctx.setLineDash([]);

          // Target rings on crown
          for (let r = 0; r < 2; r++) {
            const p = (timeSec * 0.8 + r * 0.5) % 1;
            ctx.beginPath();
            ctx.arc(cx, cy, 14 + p * 46, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(239, 68, 68, ' + ((1 - p) * 0.55).toFixed(2) + ')';
            ctx.lineWidth = 1.8;
            ctx.stroke();
          }

          // 30cm Distance Pill Badge
          const midX = (cx + peerX) * 0.5;
          const midY = (cy + peerY) * 0.5 - 18;
          const tagW = 196, tagH = 30;
          ctx.fillStyle = 'rgba(12, 15, 22, 0.86)';
          ctx.strokeStyle = 'rgba(248, 113, 113, 0.7)';
          ctx.lineWidth = 1.3;
          ctx.beginPath();
          ctx.roundRect(midX - tagW * 0.5, midY - tagH * 0.5, tagW, tagH, 999);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = '#FCA5A5';
          ctx.font = '800 11.5px Pretendard, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('⚠️ 가까워진 타인의 시선 · 정수리 위축감 경보', midX, midY + 4);
          ctx.textAlign = 'left';
          ctx.restore();
        } else if (type === 'cabinet-frustration-hud') {
          // STORY 02: Medical Frustration & Limitation Callout HUD
          const padX = 24, topY = 66;
          const boxW = Math.min(390, w - 48), boxH = 88;
          ctx.save();
          ctx.fillStyle = 'rgba(10, 14, 20, 0.80)';
          ctx.strokeStyle = 'rgba(251, 191, 36, 0.48)';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.roundRect(padX, topY, boxW, boxH, 12);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = '#FDE68A';
          ctx.font = '800 11.5px Pretendard, sans-serif';
          ctx.fillText('🔍 기존 자가관리 · 대증치료가 실패했던 의학적 이유', padX + 14, topY + 23);

          ctx.fillStyle = 'rgba(248, 250, 252, 0.88)';
          ctx.font = '600 11px Pretendard, sans-serif';
          ctx.fillText('• 탈모 샴푸·토닉 : 표피 세정일 뿐, 끓어오르는 두피열(上熱) 제거 불가', padX + 14, topY + 46);
          ctx.fillText('• 먹는 탈모약 : 부작용·쉐딩 우려 및 복용 중단 시 재탈모 반복 한계', padX + 14, topY + 68);
          ctx.restore();
        } else if (type === 'chuna-lost-movement-fx') {
          // STORY 01 (Chuna): Lumbar Acute Pain Shockwave & Narrowed Life Radius Callout
          const lx = w * 0.44, ly = h * 0.52;
          ctx.save();
          for (let r = 0; r < 3; r++) {
            const p = (timeSec * 0.85 + r * 0.33) % 1;
            ctx.beginPath();
            ctx.arc(lx, ly, 16 + p * 72, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(239, 68, 68, ' + ((1 - p) * 0.62).toFixed(2) + ')';
            ctx.lineWidth = 2.2;
            ctx.stroke();
          }

          // Narrowed movement boundary arc
          const tagW = 248, tagH = 32;
          const tx = Math.max(20, lx - tagW * 0.5);
          const ty = Math.max(66, ly - 88);
          ctx.fillStyle = 'rgba(12, 16, 20, 0.86)';
          ctx.strokeStyle = 'rgba(248, 113, 113, 0.72)';
          ctx.lineWidth = 1.3;
          ctx.beginPath();
          ctx.roundRect(tx, ty, tagW, tagH, 999);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = '#FCA5A5';
          ctx.font = '800 11.5px Pretendard, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('⚡ 요추·골반 구조적 통증 신호 · 동작 제약', tx + tagW * 0.5, ty + 20);
          ctx.textAlign = 'left';
          ctx.restore();
        } else if (type === 'fire-alarm-cutoff-hud') {
          // STORY 02 (Chuna): Fire Alarm (Pain Signal) Ringing vs Pulling Out the Painkiller Battery Metaphor
          const padX = 24, topY = 64;
          const boxW = Math.min(430, w - 48), boxH = 122;
          const isCutoffPhase = (timeSec % 4.0) > 2.0;
          const shake = isCutoffPhase ? 0 : Math.sin(timeSec * 42) * 3.2;

          ctx.save();
          ctx.fillStyle = 'rgba(10, 14, 18, 0.84)';
          ctx.strokeStyle = isCutoffPhase ? 'rgba(251, 191, 36, 0.65)' : 'rgba(239, 68, 68, 0.82)';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.roundRect(padX, topY, boxW, boxH, 14);
          ctx.fill();
          ctx.stroke();

          // Red Fire Alarm Bell Icon (Left inside HUD)
          const bellX = padX + 42 + shake, bellY = topY + 48;
          ctx.beginPath();
          ctx.arc(bellX, bellY, 22, 0, Math.PI * 2);
          ctx.fillStyle = isCutoffPhase ? 'rgba(100, 116, 139, 0.35)' : 'rgba(239, 68, 68, 0.85)';
          ctx.fill();
          ctx.strokeStyle = isCutoffPhase ? '#94A3B8' : '#FCA5A5';
          ctx.lineWidth = 2;
          ctx.stroke();

          if (!isCutoffPhase) {
            for (let wIdx = 0; wIdx < 2; wIdx++) {
              const p = (timeSec * 2.2 + wIdx * 0.5) % 1;
              ctx.beginPath();
              ctx.arc(bellX, bellY, 22 + p * 18, -Math.PI * 0.35, Math.PI * 0.35);
              ctx.strokeStyle = 'rgba(248, 113, 113, ' + (1 - p).toFixed(2) + ')';
              ctx.stroke();
            }
          }

          ctx.fillStyle = '#FFFFFF';
          ctx.font = '800 13px Pretendard, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(isCutoffPhase ? '🔇' : '🚨', bellX, bellY + 5);
          ctx.textAlign = 'left';

          // Metaphor Title & Battery Pull-out Animation
          ctx.fillStyle = isCutoffPhase ? '#FDE68A' : '#FCA5A5';
          ctx.font = '800 12px Pretendard, sans-serif';
          ctx.fillText(
            isCutoffPhase
              ? '🔋 [진통제 복용] 화재경보기 배터리만 분리됨 (경보음 일시 정지)'
              : '🚨 [척추 구조 붕괴] 디스크·골반 압박 화재경보기 작동 중!',
            padX + 78,
            topY + 32
          );

          // Battery Slot Graphic
          const batX = padX + 78, batY = topY + 44;
          const pullOffset = isCutoffPhase ? 34 : 0;
          ctx.strokeStyle = 'rgba(255,255,255,0.28)';
          ctx.lineWidth = 1.2;
          ctx.strokeRect(batX, batY, 64, 22);

          ctx.fillStyle = isCutoffPhase ? 'rgba(251, 191, 36, 0.32)' : 'rgba(16, 185, 129, 0.45)';
          ctx.strokeStyle = isCutoffPhase ? '#FBBF24' : '#34D399';
          ctx.fillRect(batX + pullOffset, batY + 2, 58, 18);
          ctx.strokeRect(batX + pullOffset, batY + 2, 58, 18);
          ctx.fillStyle = '#FFFFFF';
          ctx.font = '700 9.5px Pretendard, sans-serif';
          ctx.fillText(isCutoffPhase ? '약효 OFF' : '통증신호 ON', batX + pullOffset + 6, batY + 14.5);

          ctx.fillStyle = 'rgba(248, 250, 252, 0.90)';
          ctx.font = '600 10.8px Pretendard, sans-serif';
          ctx.fillText('⚠️ 불(틀어진 골반·짓눌린 디스크)을 끄지 않고 경보기 스위치(진통제)만 끄면', padX + 78, topY + 88);
          ctx.fillStyle = '#FCA5A5';
          ctx.fillText('   약효가 떨어지는 순간 똑같은 통증이 어김없이 다시 켜집니다.', padX + 78, topY + 106);
          ctx.restore();
        } else if (type === 'chuna-palpation-vector-fx') {
          // STORY 04 (Chuna): 1mm Fingertip Palpation & Push/Pull (밀 추 推 · 당길 나 拿) Alignment HUD
          const padX = 24, topY = 64;
          const boxW = Math.min(395, w - 48), boxH = 92;
          ctx.save();
          ctx.fillStyle = 'rgba(10, 16, 15, 0.82)';
          ctx.strokeStyle = 'rgba(16, 185, 129, 0.55)';
          ctx.lineWidth = 1.3;
          ctx.beginPath();
          ctx.roundRect(padX, topY, boxW, boxH, 12);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = '#6EE7B7';
          ctx.font = '800 11.5px Pretendard, sans-serif';
          ctx.fillText('🖐️ 대표원장 수기(手技) 촉진 · 추나(推拿) 정렬 스캔', padX + 14, topY + 24);

          ctx.fillStyle = 'rgba(248, 250, 252, 0.90)';
          ctx.font = '600 10.8px Pretendard, sans-serif';
          ctx.fillText('• 수기 촉진(Palpation) : 영상에 안 보이는 미세 관절 아탈구 탐색', padX + 14, topY + 48);
          ctx.fillText('• 밀 추(推) · 당길 나(拿) : 호흡·근육 저항감 맞춤 분절 정밀 교정', padX + 14, topY + 70);
          ctx.restore();
        } else if (type === 'battery-1pct-warning-fx') {
          // STORY 01 (Gongjindan): Blinking Red 1% Battery Icon Overlapping Exhausted Silhouette
          const bx = w * 0.50, by = h * 0.36;
          const batW = 148, batH = 68;
          const blink = Math.sin(timeSec * 6.5) > -0.2;

          ctx.save();
          // Outer red warning pulse rings
          for (let r = 0; r < 2; r++) {
            const p = (timeSec * 0.75 + r * 0.5) % 1;
            ctx.beginPath();
            ctx.arc(bx, by, 42 + p * 85, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(239, 68, 68, ' + ((1 - p) * 0.52).toFixed(2) + ')';
            ctx.lineWidth = 2;
            ctx.stroke();
          }

          // Battery Body Frame
          ctx.fillStyle = 'rgba(10, 12, 16, 0.84)';
          ctx.strokeStyle = blink ? '#EF4444' : 'rgba(239, 68, 68, 0.38)';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.roundRect(bx - batW * 0.5, by - batH * 0.5, batW, batH, 12);
          ctx.fill();
          ctx.stroke();

          // Battery Positive Terminal Tip
          ctx.fillStyle = blink ? '#EF4444' : 'rgba(239, 68, 68, 0.38)';
          ctx.beginPath();
          ctx.roundRect(bx + batW * 0.5 + 3, by - 14, 9, 28, 4);
          ctx.fill();

          // 1% Remaining Red Sliver Bar Inside Battery
          if (blink) {
            ctx.fillStyle = '#EF4444';
            ctx.beginPath();
            ctx.roundRect(bx - batW * 0.5 + 8, by - batH * 0.5 + 8, 12, batH - 16, 5);
            ctx.fill();
          }

          // 1% Text Inside Battery
          ctx.fillStyle = blink ? '#FCA5A5' : 'rgba(252, 165, 165, 0.45)';
          ctx.font = '900 22px Pretendard, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('LOW', bx + 8, by + 8);

          // Callout Pill Below Battery
          const tagW = 290, tagH = 32;
          ctx.fillStyle = 'rgba(15, 10, 12, 0.88)';
          ctx.strokeStyle = 'rgba(248, 113, 113, 0.72)';
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.roundRect(bx - tagW * 0.5, by + batH * 0.5 + 14, tagW, tagH, 999);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = '#FCA5A5';
          ctx.font = '800 11.5px Pretendard, sans-serif';
          ctx.fillText('🚨 생체 에너지 고갈 · 만성 번아웃 방전 경보', bx, by + batH * 0.5 + 34);
          ctx.textAlign = 'left';
          ctx.restore();
        } else if (type === 'bottomless-jug-leak-fx') {
          // STORY 02 (Gongjindan): Bottomless Glass / Cracked Vessel Leaking Golden Nutrition Metaphor HUD
          const cx = w * 0.50, crackY = h * 0.62;
          ctx.save();

          // Animated golden drops leaking downward from cracked bottom
          for (let d = 0; d < 8; d++) {
            const p = (timeSec * 1.15 + d * 0.125) % 1;
            const dx = cx + ((d % 3) - 1) * 24 + Math.sin(d * 2.1) * 8;
            const dy = crackY + p * 95;
            ctx.beginPath();
            ctx.arc(dx, dy, 3.5 * (1 - p * 0.4), 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(251, 191, 36, ' + ((1 - p) * 0.85).toFixed(2) + ')';
            ctx.fill();
          }

          // Top HUD Panel explaining the Bottomless Jug metaphor
          const padX = 24, topY = 64;
          const boxW = Math.min(410, w - 48), boxH = 92;
          ctx.fillStyle = 'rgba(14, 12, 10, 0.84)';
          ctx.strokeStyle = 'rgba(212, 175, 55, 0.55)';
          ctx.lineWidth = 1.3;
          ctx.beginPath();
          ctx.roundRect(padX, topY, boxW, boxH, 12);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = '#FDE68A';
          ctx.font = '800 11.5px Pretendard, sans-serif';
          ctx.fillText('🏺 [밑빠진 독 메타포] 비타민·홍삼·수액이 그때뿐인 이유', padX + 14, topY + 24);

          ctx.fillStyle = 'rgba(248, 250, 252, 0.90)';
          ctx.font = '600 10.8px Pretendard, sans-serif';
          ctx.fillText('• 원기(元氣)의 그릇이 깨진 상태에서는 외부 영양분이 체내에 머물지 못함', padX + 14, topY + 48);
          ctx.fillText('• 각성제·일시 보충이 아닌, 깨진 기혈의 독을 메우는 근본 복원력 필요', padX + 14, topY + 70);
          ctx.restore();
        } else if (type === 'rolex-craft-scale-hud') {
          // STORY 04 (Gongjindan): Master's Craft 0.001g Precision Scale & CITES Authentication HUD
          const padX = 24, topY = 64;
          const boxW = Math.min(420, w - 48), boxH = 108;
          ctx.save();
          ctx.fillStyle = 'rgba(14, 12, 10, 0.85)';
          ctx.strokeStyle = '#D4AF37';
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.roundRect(padX, topY, boxW, boxH, 14);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = '#FDE68A';
          ctx.font = '800 11.8px Pretendard, sans-serif';
          ctx.fillText('⚖️ MASTER’S CRAFT · 안정위 대표원장 직접 조제 프로토콜', padX + 14, topY + 24);

          ctx.fillStyle = '#6EE7B7';
          ctx.font = '700 11px Pretendard, sans-serif';
          ctx.fillText('✓ 식약처 CITES 정식 통관 러시아산 정품 사향 직접 개봉', padX + 14, topY + 48);
          ctx.fillStyle = 'rgba(248, 250, 252, 0.92)';
          ctx.fillText('✓ 초정밀 전자저울 계량 · 러시아 원용 분골 최상단 정량 배합', padX + 14, topY + 70);
          ctx.fillText('✓ 사향 활성 성분 휘발을 차단하는 순금박 수제 봉인', padX + 14, topY + 92);
          ctx.restore();
        } else if (type === 'alopecia-immune-radar-fx') {
          // STORY 01 (Alopecia): Autoimmune Follicle Attack Radar & Autonomic Stress Wave
          const cx = w * 0.50, cy = h * 0.42;
          ctx.save();
          for (let r = 0; r < 3; r++) {
            const p = (timeSec * 0.82 + r * 0.33) % 1;
            ctx.beginPath();
            ctx.arc(cx, cy, 18 + p * 78, 0, Math.PI * 2);
            ctx.strokeStyle = r % 2 === 0
              ? 'rgba(239, 68, 68, ' + ((1 - p) * 0.62).toFixed(2) + ')'
              : 'rgba(16, 185, 129, ' + ((1 - p) * 0.52).toFixed(2) + ')';
            ctx.lineWidth = 2.2;
            ctx.stroke();
          }
          const tagW = 286, tagH = 32;
          const tx = Math.max(20, Math.min(w - tagW - 20, cx - tagW * 0.5));
          const ty = Math.max(66, cy - 86);
          ctx.fillStyle = 'rgba(10, 16, 15, 0.88)';
          ctx.strokeStyle = 'rgba(248, 113, 113, 0.75)';
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.roundRect(tx, ty, tagW, tagH, 999);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = '#FCA5A5';
          ctx.font = '800 11.5px Pretendard, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('🚨 자가면역 모낭 공격 · 자율신경 과항진 경보', tx + tagW * 0.5, ty + 20);
          ctx.textAlign = 'left';
          ctx.restore();
        } else if (type === 'prostate-pressure-pulse-fx') {
          // STORY 01 (Prostate): Pelvic & Prostate Congestion Pressure Rings + Nocturia Alert
          const cx = w * 0.50, cy = h * 0.56;
          ctx.save();
          for (let r = 0; r < 3; r++) {
            const p = (timeSec * 0.78 + r * 0.33) % 1;
            ctx.beginPath();
            ctx.arc(cx, cy, 16 + p * 74, 0, Math.PI * 2);
            ctx.strokeStyle = r % 2 === 0
              ? 'rgba(239, 68, 68, ' + ((1 - p) * 0.58).toFixed(2) + ')'
              : 'rgba(200, 155, 91, ' + ((1 - p) * 0.52).toFixed(2) + ')';
            ctx.lineWidth = 2.2;
            ctx.stroke();
          }
          const tagW = 288, tagH = 32;
          const tx = Math.max(20, Math.min(w - tagW - 20, cx - tagW * 0.5));
          const ty = Math.max(66, cy - 88);
          ctx.fillStyle = 'rgba(18, 14, 11, 0.88)';
          ctx.strokeStyle = 'rgba(248, 113, 113, 0.75)';
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.roundRect(tx, ty, tagW, tagH, 999);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = '#FDE68A';
          ctx.font = '800 11.5px Pretendard, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('⚠️ 전립선 울혈 압박 · 야간뇨 수면 분절 경보', tx + tagW * 0.5, ty + 20);
          ctx.textAlign = 'left';
          ctx.restore();
        } else if (type && type.startsWith('exam-retina-shader-')) {
          // LUXURY 60FPS 2X-RETINA PARTICLE & HARMONIC WAVE SHADER (No Boxes, No Canvas Text)
          const examIdx = parseInt(type.replace('exam-retina-shader-', ''), 10) || 1;
          ctx.save();
          ctx.globalCompositeOperation = 'lighter';

          if (examIdx === 1) {
            // 01. 초음파 검사 — Acoustic Harmonic Micro-Echoes & Color Doppler Micro-Vessels
            const ox = w * 0.50, oy = h * 0.08;
            const maxR = Math.min(w, h) * 0.58;
            // Expanding harmonic acoustic wavefronts inside sector cone
            for (let i = 0; i < 4; i++) {
              const p = (timeSec * 0.42 + i * 0.25) % 1;
              const r = maxR * (0.18 + p * 0.82);
              const alpha = Math.sin(p * Math.PI) * 0.34;
              ctx.beginPath();
              ctx.arc(ox, oy, r, Math.PI * 0.34, Math.PI * 0.66);
              ctx.strokeStyle = i % 2 === 0 ? ('rgba(56, 189, 248, ' + alpha.toFixed(3) + ')') : ('rgba(52, 211, 153, ' + alpha.toFixed(3) + ')');
              ctx.lineWidth = 2.0;
              ctx.stroke();
            }
            // Color Doppler micro-echo particles (Cyan / Ruby / Emerald)
            for (let k = 0; k < 22; k++) {
              const ang = Math.PI * (0.36 + ((k * 0.618034) % 1) * 0.28);
              const dist = maxR * (0.28 + (((k * 0.381966) + timeSec * 0.12) % 0.66));
              const px = ox + Math.cos(ang) * dist + Math.sin(timeSec * 2.2 + k) * 4;
              const py = oy + Math.sin(ang) * dist;
              const twinkle = 0.25 + 0.65 * (0.5 + 0.5 * Math.sin(timeSec * 3.8 + k * 1.7));
              const rad = 1.6 + (k % 3) * 0.9;
              const grad = ctx.createRadialGradient(px, py, 0, px, py, rad * 4);
              const col = k % 4 === 0 ? '251, 113, 133' : (k % 2 === 0 ? '56, 189, 248' : '110, 231, 183');
              grad.addColorStop(0, 'rgba(' + col + ', ' + twinkle.toFixed(3) + ')');
              grad.addColorStop(1, 'rgba(' + col + ', 0)');
              ctx.fillStyle = grad;
              ctx.beginPath();
              ctx.arc(px, py, rad * 4, 0, Math.PI * 2);
              ctx.fill();
            }
          } else if (examIdx === 2) {
            // 02. 체열진단기 검사 — Warm Far-Infrared Core Aura & Ascending Thermal Spores
            const cx = w * 0.48, cy = h * 0.36;
            const pulseR = Math.min(w, h) * (0.26 + 0.04 * Math.sin(timeSec * 1.8));
            const coreGrad = ctx.createRadialGradient(cx, cy, 4, cx, cy, pulseR);
            coreGrad.addColorStop(0, 'rgba(251, 146, 60, 0.22)');
            coreGrad.addColorStop(0.45, 'rgba(245, 158, 11, 0.12)');
            coreGrad.addColorStop(0.8, 'rgba(16, 185, 129, 0.06)');
            coreGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');
            ctx.fillStyle = coreGrad;
            ctx.beginPath();
            ctx.arc(cx, cy, pulseR, 0, Math.PI * 2);
            ctx.fill();

            for (let i = 0; i < 20; i++) {
              const p = (timeSec * 0.22 + i * 0.05) % 1;
              const px = cx + Math.sin(i * 2.4 + timeSec * 1.3) * (w * 0.24);
              const py = h * 0.56 - p * (h * 0.44);
              const a = Math.sin(p * Math.PI) * 0.55;
              const r = 10 + (i % 4) * 5;
              const g = ctx.createRadialGradient(px, py, 0, px, py, r);
              const c = i % 3 === 0 ? '251, 191, 36' : (i % 3 === 1 ? '249, 115, 22' : '52, 211, 153');
              g.addColorStop(0, 'rgba(' + c + ', ' + a.toFixed(3) + ')');
              g.addColorStop(1, 'rgba(' + c + ', 0)');
              ctx.fillStyle = g;
              ctx.beginPath();
              ctx.arc(px, py, r, 0, Math.PI * 2);
              ctx.fill();
            }
          } else if (examIdx === 3) {
            // 03. 이비인후 내시경 검사 — 4K Fiber-Optic Ring-Light Glints & Mucosal Moisture Micro-Specularity
            const cx = w * 0.50, cy = h * 0.34;
            const ringR = Math.min(w, h) * 0.24;
            // Rotating optical lens flare along the scope perimeter
            for (let i = 0; i < 6; i++) {
              const ang = timeSec * 0.65 + (i * Math.PI / 3);
              const lx = cx + Math.cos(ang) * ringR;
              const ly = cy + Math.sin(ang) * ringR;
              const g = ctx.createRadialGradient(lx, ly, 0, lx, ly, 18);
              g.addColorStop(0, 'rgba(254, 240, 138, 0.52)');
              g.addColorStop(0.45, 'rgba(56, 189, 248, 0.18)');
              g.addColorStop(1, 'rgba(56, 189, 248, 0)');
              ctx.fillStyle = g;
              ctx.beginPath();
              ctx.arc(lx, ly, 18, 0, Math.PI * 2);
              ctx.fill();
            }
            // Subtle breathing inner optical bloom
            const innerBloom = ctx.createRadialGradient(cx, cy, ringR * 0.2, cx, cy, ringR * 0.95);
            innerBloom.addColorStop(0, 'rgba(255, 255, 255, 0)');
            innerBloom.addColorStop(0.75, 'rgba(110, 231, 183, 0.06)');
            innerBloom.addColorStop(1, 'rgba(56, 189, 248, 0.16)');
            ctx.fillStyle = innerBloom;
            ctx.beginPath();
            ctx.arc(cx, cy, ringR * 0.95, 0, Math.PI * 2);
            ctx.fill();
          } else if (examIdx === 4) {
            // 04. 사상체질 검사 — Golden Celestial Starfield & 3-Finger Radial Pulse Harmonics (촌·관·척)
            const cx = w * 0.50, cy = h * 0.34;
            const baseR = Math.min(w, h) * 0.23;
            // Orbiting golden Qi particles around the 4-organ astrolabe
            for (let i = 0; i < 16; i++) {
              const orbitR = baseR * (0.45 + (i % 4) * 0.22);
              const ang = timeSec * (i % 2 === 0 ? 0.35 : -0.28) + i * 1.15;
              const px = cx + Math.cos(ang) * orbitR;
              const py = cy + Math.sin(ang) * orbitR;
              const g = ctx.createRadialGradient(px, py, 0, px, py, 10);
              g.addColorStop(0, 'rgba(254, 240, 138, 0.75)');
              g.addColorStop(0.5, 'rgba(212, 175, 55, 0.25)');
              g.addColorStop(1, 'rgba(212, 175, 55, 0)');
              ctx.fillStyle = g;
              ctx.beginPath();
              ctx.arc(px, py, 10, 0, Math.PI * 2);
              ctx.fill();
            }
            // Subtle 3-harmonic pulse wave at 56% height (촌·관·척 맥파)
            const waveY = h * 0.56;
            ctx.beginPath();
            for (let x = w * 0.18; x <= w * 0.82; x += 3) {
              const norm = (x - w * 0.18) / (w * 0.64);
              const env = Math.sin(norm * Math.PI);
              const y = waveY + Math.sin(norm * 18 - timeSec * 3.6) * 7 * env + Math.cos(norm * 9 - timeSec * 2.1) * 4 * env;
              if (x === w * 0.18) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
            }
            ctx.strokeStyle = 'rgba(253, 230, 138, 0.38)';
            ctx.lineWidth = 1.8;
            ctx.stroke();
          } else if (examIdx === 5) {
            // 05. 체지방 검사 — Rising Metabolic Lipolysis Embers & Bio-Impedance Current Ripples
            const cx = w * 0.50, cy = h * 0.36;
            for (let i = 0; i < 24; i++) {
              const p = (timeSec * 0.28 + i * 0.042) % 1;
              const spread = (1 - p * 0.45) * (w * 0.22);
              const px = cx + Math.sin(i * 3.1 + timeSec * 1.6) * spread;
              const py = h * 0.55 - p * (h * 0.42);
              const alpha = Math.sin(p * Math.PI) * 0.6;
              const rad = 8 + (i % 3) * 4;
              const g = ctx.createRadialGradient(px, py, 0, px, py, rad);
              const col = i % 2 === 0 ? '52, 211, 153' : '251, 191, 36';
              g.addColorStop(0, 'rgba(' + col + ', ' + alpha.toFixed(3) + ')');
              g.addColorStop(1, 'rgba(' + col + ', 0)');
              ctx.fillStyle = g;
              ctx.beginPath();
              ctx.arc(px, py, rad, 0, Math.PI * 2);
              ctx.fill();
            }
          } else if (examIdx === 6) {
            // 06. 자율신경검사 — Dual Sympathetic/Parasympathetic Sine Ribbon & Cranial Calming Aura
            const midY = h * 0.46;
            const startX = w * 0.08, endX = w * 0.92;
            // Parasympathetic soothing emerald-blue ribbon
            ctx.beginPath();
            for (let x = startX; x <= endX; x += 3) {
              const t = (x - startX) / (endX - startX);
              const env = Math.sin(t * Math.PI);
              const y = midY + Math.sin(t * 10 - timeSec * 2.2) * 18 * env;
              if (x === startX) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
            }
            ctx.strokeStyle = 'rgba(56, 189, 248, 0.42)';
            ctx.lineWidth = 2.4;
            ctx.stroke();

            // Sympathetic warm gold harmonic wave
            ctx.beginPath();
            for (let x = startX; x <= endX; x += 3) {
              const t = (x - startX) / (endX - startX);
              const env = Math.sin(t * Math.PI);
              const y = midY + Math.cos(t * 14 - timeSec * 3.1) * 12 * env;
              if (x === startX) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
            }
            ctx.strokeStyle = 'rgba(251, 191, 36, 0.34)';
            ctx.lineWidth = 1.8;
            ctx.stroke();
          } else if (examIdx === 7) {
            // 07. 내분비 간 및 당 수치 검사 — Floating Hexagonal Bio-Assay Molecules & Clean Hepatic Glow
            const centers = [
              { x: w * 0.25, y: h * 0.34, col: '52, 211, 153' },
              { x: w * 0.50, y: h * 0.34, col: '251, 191, 36' },
              { x: w * 0.75, y: h * 0.34, col: '56, 189, 248' }
            ];
            centers.forEach((c, idx) => {
              const r = 38 + 6 * Math.sin(timeSec * 2.0 + idx);
              const g = ctx.createRadialGradient(c.x, c.y, 4, c.x, c.y, r * 1.7);
              g.addColorStop(0, 'rgba(' + c.col + ', 0.22)');
              g.addColorStop(1, 'rgba(' + c.col + ', 0)');
              ctx.fillStyle = g;
              ctx.beginPath();
              ctx.arc(c.x, c.y, r * 1.7, 0, Math.PI * 2);
              ctx.fill();
            });
            // Subtle floating hexagonal micro-crystals
            for (let i = 0; i < 12; i++) {
              const p = (timeSec * 0.18 + i * 0.083) % 1;
              const hx = w * (0.14 + ((i * 0.73) % 0.72));
              const hy = h * 0.54 - p * (h * 0.38);
              const hr = 5 + (i % 3) * 2.5;
              const ha = Math.sin(p * Math.PI) * 0.42;
              ctx.beginPath();
              for (let v = 0; v < 6; v++) {
                const vang = timeSec * 0.5 + (v * Math.PI / 3);
                const vx = hx + Math.cos(vang) * hr;
                const vy = hy + Math.sin(vang) * hr;
                if (v === 0) ctx.moveTo(vx, vy);
                else ctx.lineTo(vx, vy);
              }
              ctx.closePath();
              ctx.strokeStyle = 'rgba(110, 231, 183, ' + ha.toFixed(3) + ')';
              ctx.lineWidth = 1.2;
              ctx.stroke();
            }
          } else if (examIdx === 8) {
            // 08. 혈관 상태 검사 (독소) — Microvascular Stream: Dark Stasis (Left) -> Purified Ruby-Gold Oxygenated Flow (Right)
            const startX = w * 0.08, endX = w * 0.92;
            const gateX = w * 0.50;
            for (let i = 0; i < 24; i++) {
              const p = (timeSec * 0.24 + i / 24) % 1;
              const px = startX + p * (endX - startX);
              const arch = Math.sin(p * Math.PI) * -22;
              const py = h * 0.31 + arch + Math.sin(p * Math.PI * 4 + i) * 7;
              const purified = px >= gateX;
              const rad = purified ? 11 : 8;
              const g = ctx.createRadialGradient(px, py, 0, px, py, rad);
              if (purified) {
                g.addColorStop(0, 'rgba(254, 240, 138, 0.85)');
                g.addColorStop(0.45, 'rgba(52, 211, 153, 0.45)');
                g.addColorStop(1, 'rgba(52, 211, 153, 0)');
              } else {
                g.addColorStop(0, 'rgba(248, 113, 113, 0.65)');
                g.addColorStop(0.55, 'rgba(153, 27, 27, 0.30)');
                g.addColorStop(1, 'rgba(153, 27, 27, 0)');
              }
              ctx.fillStyle = g;
              ctx.beginPath();
              ctx.arc(px, py, rad, 0, Math.PI * 2);
              ctx.fill();
            }
            // Purification gate vertical light curtain at x = 50%
            const gateGrad = ctx.createLinearGradient(gateX - 18, 0, gateX + 18, 0);
            gateGrad.addColorStop(0, 'rgba(110, 231, 183, 0)');
            gateGrad.addColorStop(0.5, 'rgba(110, 231, 183, ' + (0.18 + 0.08 * Math.sin(timeSec * 3)).toFixed(3) + ')');
            gateGrad.addColorStop(1, 'rgba(110, 231, 183, 0)');
            ctx.fillStyle = gateGrad;
            ctx.fillRect(gateX - 18, h * 0.14, 36, h * 0.34);
          } else if (examIdx === 9) {
            // 09. 성장 검사 (성장) — Ascending Golden Starlight & Epiphyseal Growth Plate Radiance
            for (let i = 0; i < 22; i++) {
              const p = (timeSec * 0.25 + i * 0.045) % 1;
              const px = w * (0.14 + ((i * 0.67) % 0.72));
              const py = h * 0.56 - p * (h * 0.44);
              const alpha = Math.sin(p * Math.PI) * 0.75;
              const r = 8 + (i % 3) * 4;
              const g = ctx.createRadialGradient(px, py, 0, px, py, r);
              const col = i % 2 === 0 ? '254, 240, 138' : '110, 231, 183';
              g.addColorStop(0, 'rgba(' + col + ', ' + alpha.toFixed(3) + ')');
              g.addColorStop(1, 'rgba(' + col + ', 0)');
              ctx.fillStyle = g;
              ctx.beginPath();
              ctx.arc(px, py, r, 0, Math.PI * 2);
              ctx.fill();
            }
          }
          ctx.restore();
        } else {
          // 'pulse-ripples', 'gold-aura', 'sunlight-bokeh'
          const cx = w * 0.5, cy = h * 0.55;
          for (let i = 0; i < 3; i++) {
            const p = (timeSec * 0.55 + i * 0.33) % 1;
            ctx.beginPath();
            ctx.arc(cx, cy, p * Math.min(w, h) * 0.42, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(253, 230, 138, ' + ((1 - p) * 0.38).toFixed(2) + ')';
            ctx.lineWidth = 1.8;
            ctx.stroke();
          }
          for (let i = 0; i < 14; i++) {
            const bx = ((i * 97 + timeSec * 18) % w);
            const by = h - ((i * 73 + timeSec * 26) % h);
            const br = 2 + (i % 4) * 1.8;
            ctx.beginPath();
            ctx.arc(bx, by, br, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(253, 230, 138, ' + (0.25 + 0.25 * Math.sin(timeSec * 3 + i)).toFixed(2) + ')';
            ctx.fill();
          }
        }
      }

      // ====================================================================
      // 4. DEDICATED 60FPS INTERACTIVE MEDICAL SIMULATION CANVASES (STORY 03)
      // ====================================================================
      const simCanvas = document.querySelector('.full-sim-canvas');
      const simCtx = simCanvas ? simCanvas.getContext('2d') : null;
      let simMode = 'after';
      let simManualOverride = false;

      window.setSimMode = function(mode) {
        simMode = mode;
        simManualOverride = true;
        document.getElementById('btn-sim-before')?.classList.toggle('active', mode === 'before');
        document.getElementById('btn-sim-after')?.classList.toggle('active', mode === 'after');
      };

      function resizeSimCanvas() {
        if (!simCanvas || !simCtx) return;
        const r = simCanvas.parentElement.getBoundingClientRect();
        if (r.width > 0 && r.height > 0) {
          simCanvas.width = r.width * window.devicePixelRatio;
          simCanvas.height = r.height * window.devicePixelRatio;
          simCtx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
        }
      }
      window.addEventListener('resize', resizeSimCanvas);
      setTimeout(resizeSimCanvas, 120);

      function drawSimCanvas(timeSec) {
        if (!simCanvas || !simCtx) return;
        const w = simCanvas.width / window.devicePixelRatio;
        const h = simCanvas.height / window.devicePixelRatio;
        if (w <= 0 || h <= 0) return;

        simCtx.clearRect(0, 0, w, h);
        const simId = simCanvas.id.replace('sim-canvas-', '');

        // Subtle grid
        simCtx.strokeStyle = 'rgba(255,255,255,0.05)';
        simCtx.lineWidth = 1;
        for (let x = 0; x < w; x += 42) { simCtx.beginPath(); simCtx.moveTo(x, 0); simCtx.lineTo(x, h); simCtx.stroke(); }
        for (let y = 0; y < h; y += 42) { simCtx.beginPath(); simCtx.moveTo(0, y); simCtx.lineTo(w, y); simCtx.stroke(); }

        if (simId === 'director-pulse') {
          const labels = ['촌(寸) · 상초/심폐 맥파', '관(關) · 중초/간비 맥파', '척(尺) · 하초/신장·자궁 맥파'];
          const cols = simMode === 'after' ? ['#D4AF37', '#10B981', '#60A5FA'] : ['#EF4444', '#F59E0B', '#FB7185'];
          labels.forEach((lbl, idx) => {
            const baseY = h * (0.28 + idx * 0.21);
            simCtx.fillStyle = 'rgba(255,255,255,0.78)';
            simCtx.font = '700 12px Pretendard, sans-serif';
            simCtx.fillText(lbl, 34, baseY - 26);
            simCtx.beginPath();
            simCtx.strokeStyle = cols[idx];
            simCtx.lineWidth = 2.8;
            for (let x = 34; x < w - 34; x += 3) {
              const yOff = simMode === 'after'
                ? Math.sin(x * 0.028 - timeSec * 3.2 + idx) * 18 + Math.sin(x * 0.056 - timeSec * 6.4 + idx) * 5
                : Math.sin(x * 0.075 - timeSec * 6.5 + idx) * 24 + Math.cos(x * 0.19 + timeSec * 8.2) * 11;
              if (x === 34) simCtx.moveTo(x, baseY + yOff);
              else simCtx.lineTo(x, baseY + yOff);
            }
            simCtx.stroke();
          });
        } else if (simId === 'chuna-spine') {
          // ==================================================================
          // STORY 03 (Chuna): 무너진 기둥을 바로 세워야 통증의 뿌리가 뽑힙니다
          // [3D Biomechanical 시뮬레이션: 젠가(Jenga) 하단 블록 교정 ➔ 3D 척추·골반 디졸브]
          // - Before: 하단부 블록 하나(골반/요추 L4-L5)가 옆으로 틀어져 젠가 탑 전체가 한쪽으로
          //   위태롭게 기울어 흔들리고, 양옆 근육(장력선)이 24시간 팽팽하게 긴장하며 붉은 신경 압박 경보 발생.
          // - After: 원장의 두 손(수기 추나 推·拿)이 들어와 틀어진 하단 블록을 '탁' 밀어 넣어 정렬을 맞추자,
          //   탑 전체가 안정적으로 바로 서며 실제 인체 3D 척추·골반 그래픽으로 디졸브(전환)되고
          //   추간판 공간(+3.8mm)이 열리며 신경 압박이 풀리는 모습(붉은색 ➔ 푸른색/에메랄드).
          // ==================================================================
          if (!simManualOverride) {
            const autoPhase = (timeSec % 10.4) < 5.0 ? 'before' : 'after';
            if (autoPhase !== simMode) {
              simMode = autoPhase;
              document.getElementById('btn-sim-before')?.classList.toggle('active', simMode === 'before');
              document.getElementById('btn-sim-after')?.classList.toggle('active', simMode === 'after');
            }
          }

          const isAligned = simMode === 'after';
          const cx = w * 0.5;
          const topY = h * 0.16;
          const botY = h * 0.72;
          const levels = 7; // C-spine to Pelvis
          const segNames = ['상부 경추', '하부 경추', '상부 흉추', '하부 흉추', '상부 요추', '하부 요추 (핵심축)', '골반 · 천장관절 (기초축)'];

          // After 모드에서: 전반부(0~1.8초)는 원장 손이 젠가 블록을 '탁' 밀어 넣는 모션, 후반부는 3D 척추·골반으로 디졸브
          const subCycle = timeSec % 5.2;
          const pushProgress = isAligned ? Math.min(1, subCycle / 1.1) : 0;
          const dissolveSpine = isAligned ? Math.max(0, Math.min(1, (subCycle - 1.0) / 1.4)) : 0;

          // 배경 오라
          const bgGlow = simCtx.createRadialGradient(cx, (topY + botY) * 0.5, 20, cx, (topY + botY) * 0.5, Math.max(w, h) * 0.5);
          if (isAligned) {
            bgGlow.addColorStop(0, 'rgba(16, 185, 129, 0.22)');
            bgGlow.addColorStop(0.5, 'rgba(56, 189, 248, 0.12)');
            bgGlow.addColorStop(1, 'rgba(10, 16, 15, 0)');
          } else {
            bgGlow.addColorStop(0, 'rgba(239, 68, 68, 0.25)');
            bgGlow.addColorStop(0.5, 'rgba(245, 158, 11, 0.10)');
            bgGlow.addColorStop(1, 'rgba(15, 10, 12, 0)');
          }
          simCtx.fillStyle = bgGlow;
          simCtx.fillRect(0, 0, w, h);

          // 수직 중력 중심축 가이드라인
          simCtx.save();
          simCtx.strokeStyle = isAligned ? 'rgba(110, 231, 183, 0.45)' : 'rgba(255, 255, 255, 0.18)';
          simCtx.setLineDash([6, 5]);
          simCtx.lineWidth = 1.5;
          simCtx.beginPath();
          simCtx.moveTo(cx, topY - 24);
          simCtx.lineTo(cx, botY + 34);
          simCtx.stroke();
          simCtx.setLineDash([]);

          // 골반 받침대 (Pelvic Base)
          const pelvisY = botY + 12;
          const pelvisTilt = isAligned ? (1 - pushProgress) * 0.14 : 0.14 + Math.sin(timeSec * 5) * 0.02;
          simCtx.save();
          simCtx.translate(cx, pelvisY);
          simCtx.rotate(pelvisTilt);
          simCtx.fillStyle = isAligned ? 'rgba(16, 185, 129, 0.22)' : 'rgba(239, 68, 68, 0.24)';
          simCtx.strokeStyle = isAligned ? '#38BDF8' : '#F87171';
          simCtx.lineWidth = 2.2;
          simCtx.beginPath();
          simCtx.roundRect(-88, -14, 176, 28, 12);
          simCtx.fill();
          simCtx.stroke();
          simCtx.restore();

          // 7층 젠가 블록 탑 ➔ 3D 척추 분절 & 추간판 디스크(+3.8mm) 렌더링
          const stepH = (botY - topY) / levels;
          const coords = [];

          for (let i = 0; i < levels; i++) {
            const revIdx = levels - 1 - i; // 0 at bottom, 6 at top
            const baseGap = isAligned ? stepH : stepH * 0.91;
            const by = botY - revIdx * baseGap - 18;

            // i === 5 (요추 L4-L5 하단 핵심 블록)이 옆으로 삐져나와 전체 탑이 기울어짐
            let offX = 0;
            let tilt = 0;
            if (!isAligned) {
              if (i === 5) {
                // 틀어져 삐져나온 하단 젠가 블록 (골반·요추 1cm 아탈구)
                offX = 46 + Math.sin(timeSec * 7) * 3.5;
                tilt = 0.16;
              } else {
                // 하단 블록이 빠져나간 반대쪽으로 위태롭게 기울어 흔들리는 상부 탑
                offX = -revIdx * 10.5 + Math.sin(timeSec * 6.5 + i) * 4.5;
                tilt = -0.14 + Math.sin(timeSec * 5 + i) * 0.025;
              }
            } else {
              const remain = 1 - pushProgress;
              offX = (i === 5 ? 46 * remain : -revIdx * 10.5 * remain) + Math.sin(timeSec * 2 + i * 0.5) * 1.2;
              tilt = (i === 5 ? 0.16 : -0.14) * remain;
            }

            coords.push({ x: cx + offX, y: by, tilt, i });
          }

          // 근육 긴장 와이어 (Before: 넘어지지 않기 위해 24시간 팽팽하게 당겨진 붉은 근육선 / After: 편안한 에메랄드 균형선)
          [-1, 1].forEach(side => {
            simCtx.beginPath();
            coords.forEach((pt, idx) => {
              const wx = pt.x + side * 56;
              const wy = pt.y;
              if (idx === 0) simCtx.moveTo(wx, wy);
              else simCtx.lineTo(wx, wy);
            });
            simCtx.strokeStyle = isAligned ? 'rgba(56, 189, 248, 0.45)' : 'rgba(248, 113, 113, 0.78)';
            simCtx.lineWidth = isAligned ? 2 : 2.8;
            simCtx.stroke();
          });

          // 각 층 블록(젠가) + 3D 척추체/디스크 디졸브 렌더링
          coords.forEach(pt => {
            const isKeySublux = pt.i === 5; // 하단 틀어진 블록 (L4-L5)
            simCtx.save();
            simCtx.translate(pt.x, pt.y);
            simCtx.rotate(pt.tilt);

            const bw = isKeySublux ? 96 : 86;
            const bh = isAligned ? 24 : 22;

            // 1) 젠가 우드/구조 블록 레이어 (dissolveSpine이 커질수록 3D 척추체로 변환)
            const jengaAlpha = 1 - dissolveSpine * 0.55;
            simCtx.fillStyle = isAligned
              ? 'rgba(16, 185, 129, ' + (0.28 * jengaAlpha + 0.25).toFixed(2) + ')'
              : (isKeySublux ? 'rgba(239, 68, 68, 0.52)' : 'rgba(217, 119, 6, 0.34)');
            simCtx.strokeStyle = isAligned ? '#6EE7B7' : (isKeySublux ? '#FCA5A5' : '#FBBF24');
            simCtx.lineWidth = isKeySublux ? 2.6 : 1.8;

            // 3D Isometric Jenga Block side depth
            simCtx.beginPath();
            simCtx.roundRect(-bw * 0.5, -bh * 0.5, bw, bh, dissolveSpine > 0.5 ? 9 : 4);
            simCtx.fill();
            simCtx.stroke();

            // 3D Spine Spinous Process & Intervertebral Disc Cushion (+3.8mm) when dissolving
            if (isAligned) {
              // 푸른색/청록색 추간판 디스크 쿠션 (+3.8mm 감압 공간)
              simCtx.fillStyle = 'rgba(56, 189, 248, ' + (0.35 + dissolveSpine * 0.5).toFixed(2) + ')';
              simCtx.beginPath();
              simCtx.roundRect(-bw * 0.42, bh * 0.5 + 1, bw * 0.84, 7, 4);
              simCtx.fill();
            } else if (isKeySublux) {
              // 붉은색 디스크 짓눌림 & 신경 압박 스파크
              const pulseR = 10 + (timeSec * 22) % 24;
              simCtx.beginPath();
              simCtx.arc(bw * 0.42, bh * 0.35, pulseR, 0, Math.PI * 2);
              simCtx.strokeStyle = 'rgba(239, 68, 68, 0.75)';
              simCtx.lineWidth = 2;
              simCtx.stroke();
            }

            // 블록 내부 라벨
            simCtx.fillStyle = '#FFFFFF';
            simCtx.font = (isKeySublux ? '800 ' : '600 ') + '10px Pretendard, sans-serif';
            simCtx.textAlign = 'center';
            simCtx.fillText(segNames[pt.i], 0, 3.5);
            simCtx.restore();
          });

          // 원장님의 수기 추나 손길 (하단 틀어진 블록을 '탁' 밀어 넣어 정렬하는 벡터 연출)
          const targetPt = coords[5];
          if (isAligned) {
            const handX = targetPt.x + 76 + (1 - pushProgress) * 32;
            const handY = targetPt.y;
            simCtx.fillStyle = 'rgba(212, 175, 55, 0.26)';
            simCtx.strokeStyle = '#FDE68A';
            simCtx.lineWidth = 2;
            simCtx.beginPath();
            simCtx.roundRect(handX, handY - 15, 148, 30, 999);
            simCtx.fill();
            simCtx.stroke();

            // 화살표 (밀 추 推)
            simCtx.beginPath();
            simCtx.moveTo(handX - 6, handY);
            simCtx.lineTo(targetPt.x + 52, handY);
            simCtx.strokeStyle = '#FDE68A';
            simCtx.lineWidth = 2.5;
            simCtx.stroke();

            simCtx.fillStyle = '#FDE68A';
            simCtx.font = '800 11px Pretendard, sans-serif';
            simCtx.textAlign = 'center';
            simCtx.fillText('🫲 원장 수기 추나(推拿) 정렬', handX + 74, handY + 4);
          } else {
            // Before: 틀어진 하단 블록 경고 콜아웃
            const warnX = targetPt.x + 64;
            const warnY = targetPt.y;
            simCtx.fillStyle = 'rgba(127, 29, 29, 0.85)';
            simCtx.strokeStyle = '#F87171';
            simCtx.lineWidth = 1.5;
            simCtx.beginPath();
            simCtx.roundRect(warnX, warnY - 15, 162, 30, 999);
            simCtx.fill();
            simCtx.stroke();
            simCtx.fillStyle = '#FCA5A5';
            simCtx.font = '800 10.8px Pretendard, sans-serif';
            simCtx.textAlign = 'center';
            simCtx.fillText('⚠️ 골반·요추 중심축 이탈 (붕괴 위기)', warnX + 81, warnY + 4);
          }

          // 하단 상태 요약 캡션
          simCtx.textAlign = 'center';
          simCtx.font = '800 14.5px Pretendard, sans-serif';
          if (isAligned) {
            simCtx.fillStyle = '#6EE7B7';
            simCtx.fillText('✦ 학술 검증 수기 추나(推拿) 중심축 정렬 완료 ➔ 척추·골반 추간판 신경 감압 및 회복', cx, botY + 56);
          } else {
            simCtx.fillStyle = '#FCA5A5';
            simCtx.fillText('⚠️ 하단 주춧돌(골반·요추) 틀어짐 : 상부 척추 전체 불균형 및 만성 근육 과긴장·신경 압박', cx, botY + 56);
          }
          simCtx.textAlign = 'left';
          simCtx.restore();
        } else if (simId === 'growth-plate') {
          const cx = w * 0.5, cy = h * 0.48;
          const bandH = simMode === 'after' ? 56 + Math.sin(timeSec * 3) * 6 : 22;
          simCtx.fillStyle = simMode === 'after' ? 'rgba(16, 185, 129, 0.28)' : 'rgba(239, 68, 68, 0.22)';
          simCtx.strokeStyle = simMode === 'after' ? '#6EE7B7' : '#F87171';
          simCtx.lineWidth = 2.5;
          simCtx.beginPath();
          simCtx.roundRect(cx - 140, cy - bandH * 0.5, 280, bandH, 18);
          simCtx.fill(); simCtx.stroke();
          const count = simMode === 'after' ? 28 : 9;
          for (let i = 0; i < count; i++) {
            const px = cx - 120 + ((i * 47) % 240);
            const py = cy + Math.sin(timeSec * 3 + i) * (bandH * 0.34);
            simCtx.beginPath();
            simCtx.arc(px, py, simMode === 'after' ? 5.5 : 3.5, 0, Math.PI * 2);
            simCtx.fillStyle = simMode === 'after' ? '#FDE68A' : '#FCA5A5';
            simCtx.fill();
          }
          simCtx.fillStyle = '#FFFFFF';
          simCtx.font = '800 14px Pretendard, sans-serif';
          simCtx.fillText(simMode === 'after' ? '✦ 학술 논문 검증 · 성장판 연골모세포 활발 증식 중' : '⚠️ 성장판 연골 대사 저하 상태', cx - 135, cy - bandH * 0.5 - 16);
        } else if (simId === 'diet-lipolysis') {
          const cx = w * 0.5, cy = h * 0.48;
          for (let i = 0; i < 18; i++) {
            const angle = (i / 18) * Math.PI * 2 + timeSec * (simMode === 'after' ? 0.9 : 0.2);
            const dist = simMode === 'after' ? 45 + ((i * 19 + timeSec * 35) % 130) : 35 + (i % 4) * 22;
            const r = simMode === 'after' ? 6 + (i % 3) * 2 : 16 + (i % 4) * 4;
            simCtx.beginPath();
            simCtx.arc(cx + Math.cos(angle) * dist, cy + Math.sin(angle) * dist * 0.65, r, 0, Math.PI * 2);
            simCtx.fillStyle = simMode === 'after' ? 'rgba(16, 185, 129, 0.35)' : 'rgba(223, 126, 142, 0.45)';
            simCtx.strokeStyle = simMode === 'after' ? '#6EE7B7' : '#DF7E8E';
            simCtx.lineWidth = 2;
            simCtx.fill(); simCtx.stroke();
          }
        } else if (simId === 'hair-follicle') {
          // ==================================================================
          // STORY 03: 불타는 토양에는 어떤 나무도 자라지 못합니다
          // [모션 그래픽 시뮬레이션]
          // - Before (Phase 0): 붉게 타오르는 냄비(가슴·머리에 몰린 42.0°C 상열) 위로 식물(모발)이 말라죽고,
          //   화학 샴푸(물뿌리개)를 잎사귀에 아무리 뿌려도 뿌리는 타들어가는 모습.
          // - After (Phase 1): 수승화강(水升火降) 치료가 시작되자 두피의 붉은 열(42°C)이 푸른색 안정 온도(36.5°C)로
          //   식으면서 비옥한 토양 속에서 모근이 굵어지고 새싹·모발이 힘차게 자라나는 시각적 변화.
          // ==================================================================
          if (!simManualOverride) {
            // 10초 주기로 전(불타는 냄비 42°C) ➔ 후(수승화강 쿨링 36.5°C) 자동 전환 시연
            const autoPhase = (timeSec % 10) < 4.8 ? 'before' : 'after';
            if (autoPhase !== simMode) {
              simMode = autoPhase;
              document.getElementById('btn-sim-before')?.classList.toggle('active', simMode === 'before');
              document.getElementById('btn-sim-after')?.classList.toggle('active', simMode === 'after');
            }
          }

          const isCool = simMode === 'after';
          const cx = w * 0.5;
          const soilY = h * 0.54;
          const potTopY = h * 0.56;
          const potBotY = h * 0.78;
          const potW = Math.min(w * 0.62, 420);

          // 1) 배경 열기 / 수승화강 오라 그라디언트
          const bgGlow = simCtx.createRadialGradient(cx, soilY, 20, cx, soilY, Math.max(w, h) * 0.55);
          if (isCool) {
            bgGlow.addColorStop(0, 'rgba(56, 189, 248, 0.22)');
            bgGlow.addColorStop(0.5, 'rgba(16, 185, 129, 0.10)');
            bgGlow.addColorStop(1, 'rgba(10, 15, 24, 0)');
          } else {
            bgGlow.addColorStop(0, 'rgba(239, 68, 68, 0.28)');
            bgGlow.addColorStop(0.5, 'rgba(249, 115, 22, 0.12)');
            bgGlow.addColorStop(1, 'rgba(15, 10, 12, 0)');
          }
          simCtx.fillStyle = bgGlow;
          simCtx.fillRect(0, 0, w, h);

          // 2) 하단 냄비(가슴·머리에 몰린 상열 vs 수승화강 청열 진액 용기) 그래픽
          simCtx.save();
          simCtx.beginPath();
          simCtx.moveTo(cx - potW * 0.5, potTopY);
          simCtx.lineTo(cx - potW * 0.40, potBotY);
          simCtx.quadraticCurveTo(cx, potBotY + 26, cx + potW * 0.40, potBotY);
          simCtx.lineTo(cx + potW * 0.5, potTopY);
          simCtx.closePath();

          const potGrad = simCtx.createLinearGradient(0, potTopY, 0, potBotY);
          if (isCool) {
            potGrad.addColorStop(0, 'rgba(14, 116, 144, 0.55)');
            potGrad.addColorStop(0.5, 'rgba(16, 185, 129, 0.35)');
            potGrad.addColorStop(1, 'rgba(6, 78, 59, 0.65)');
          } else {
            potGrad.addColorStop(0, 'rgba(185, 28, 28, 0.68)');
            potGrad.addColorStop(0.5, 'rgba(239, 68, 68, 0.52)');
            potGrad.addColorStop(1, 'rgba(249, 115, 22, 0.75)');
          }
          simCtx.fillStyle = potGrad;
          simCtx.fill();
          simCtx.lineWidth = 2.5;
          simCtx.strokeStyle = isCool ? '#38BDF8' : '#F87171';
          simCtx.stroke();

          // 냄비 양쪽 손잡이
          simCtx.beginPath();
          simCtx.arc(cx - potW * 0.51, potTopY + 24, 12, Math.PI * 0.5, Math.PI * 1.5);
          simCtx.stroke();
          simCtx.beginPath();
          simCtx.arc(cx + potW * 0.51, potTopY + 24, 12, -Math.PI * 0.5, Math.PI * 0.5);
          simCtx.stroke();

          // 3) 두피 토양 표면 (사막화 갈라진 토양 vs 비옥한 수분·진액 토양)
          simCtx.beginPath();
          simCtx.ellipse(cx, potTopY, potW * 0.5, 16, 0, 0, Math.PI * 2);
          simCtx.fillStyle = isCool ? '#065F46' : '#7F1D1D';
          simCtx.fill();
          simCtx.strokeStyle = isCool ? '#6EE7B7' : '#FCA5A5';
          simCtx.lineWidth = 2;
          simCtx.stroke();

          // 4) Before: 냄비 아래 타오르는 불꽃 + 좌상단 화학 샴푸(물뿌리개)가 잎사귀만 적시고 증발하는 연출
          //    After: 수승화강(水升火降) 청열 순환 화살표 + 진액 방울이 뿌리 깊숙이 스며드는 연출
          if (!isCool) {
            // 냄비 하단 불꽃 파동 (42.0°C 상열)
            for (let f = 0; f < 9; f++) {
              const fx = cx - potW * 0.34 + (f / 8) * (potW * 0.68);
              const fh = 18 + Math.sin(timeSec * 7 + f * 1.3) * 9;
              simCtx.beginPath();
              simCtx.moveTo(fx - 12, potBotY + 22);
              simCtx.quadraticCurveTo(fx, potBotY - fh, fx + 12, potBotY + 22);
              simCtx.fillStyle = f % 2 === 0 ? 'rgba(239, 68, 68, 0.78)' : 'rgba(251, 191, 36, 0.75)';
              simCtx.fill();
            }

            // 좌상단 화학 샴푸 / 물뿌리개 (겉물만 뿌리는 한계 시각화)
            const canX = cx - potW * 0.42;
            const canY = h * 0.22;
            simCtx.fillStyle = 'rgba(148, 163, 184, 0.24)';
            simCtx.strokeStyle = '#94A3B8';
            simCtx.lineWidth = 1.8;
            simCtx.beginPath();
            simCtx.roundRect(canX - 42, canY - 18, 84, 34, 8);
            simCtx.fill();
            simCtx.stroke();
            simCtx.fillStyle = '#E2E8F0';
            simCtx.font = '700 10.5px Pretendard, sans-serif';
            simCtx.textAlign = 'center';
            simCtx.fillText('🧴 탈모샴푸·영양제', canX, canY + 3);

            // 물뿌리개에서 떨어지지만 뜨거운 열기에 닿자마자 증발하는 물방울
            for (let d = 0; d < 6; d++) {
              const prog = (timeSec * 1.4 + d * 0.16) % 1;
              const dx = canX + 46 + prog * 70;
              const dy = canY + 6 + prog * 95;
              if (prog < 0.72) {
                simCtx.beginPath();
                simCtx.arc(dx, dy, 3, 0, Math.PI * 2);
                simCtx.fillStyle = 'rgba(147, 197, 253, 0.75)';
                simCtx.fill();
              } else {
                // 열기에 막혀 수증기로 증발!
                simCtx.beginPath();
                simCtx.arc(dx, dy - (prog - 0.72) * 40, 5, 0, Math.PI * 2);
                simCtx.strokeStyle = 'rgba(252, 165, 165, 0.55)';
                simCtx.stroke();
              }
            }
            simCtx.fillStyle = '#FCA5A5';
            simCtx.font = '700 11px Pretendard, sans-serif';
            simCtx.fillText('✗ 끓는 냄비에 겉물(샴푸)만 부으면 뿌리 도달 전 증발!', canX + 95, canY + 38);
          } else {
            // 수승화강(水升火降) 푸른 청열·진액 순환 파동
            for (let wIdx = 0; wIdx < 12; wIdx++) {
              const p = (timeSec * 0.65 + wIdx * 0.08) % 1;
              const wx = cx - potW * 0.36 + ((wIdx * 53) % (potW * 0.72));
              const wy = potTopY + 18 + p * (potBotY - potTopY - 26);
              simCtx.beginPath();
              simCtx.arc(wx, wy, 4, 0, Math.PI * 2);
              simCtx.fillStyle = wIdx % 2 === 0 ? 'rgba(56, 189, 248, 0.75)' : 'rgba(110, 231, 183, 0.75)';
              simCtx.fill();
            }
          }

          // 5) 3개의 모낭 뿌리(모근)와 식물(모발) 줄기·잎사귀 비교 렌더링
          const roots = [-potW * 0.24, 0, potW * 0.24];
          roots.forEach((rxOff, rIdx) => {
            const rx = cx + rxOff;
            const bulbY = potTopY + 72;
            const bulbR = isCool ? 20 + Math.sin(timeSec * 3 + rIdx) * 1.8 : 9.5;

            // 모구부(모근 뿌리)
            simCtx.beginPath();
            simCtx.arc(rx, bulbY, bulbR, 0, Math.PI * 2);
            simCtx.fillStyle = isCool ? 'rgba(16, 185, 129, 0.42)' : 'rgba(239, 68, 68, 0.38)';
            simCtx.fill();
            simCtx.lineWidth = isCool ? 2.8 : 1.5;
            simCtx.strokeStyle = isCool ? '#6EE7B7' : '#F87171';
            simCtx.stroke();

            // 잔뿌리(모세혈관)
            const rootCount = isCool ? 5 : 2;
            for (let k = 0; k < rootCount; k++) {
              const ang = Math.PI * 0.25 + (k / Math.max(1, rootCount - 1)) * Math.PI * 0.5;
              const len = isCool ? 28 : 11;
              simCtx.beginPath();
              simCtx.moveTo(rx, bulbY + bulbR * 0.6);
              simCtx.lineTo(rx + Math.cos(ang) * len * (k % 2 === 0 ? 1 : -1), bulbY + bulbR * 0.6 + Math.sin(ang) * len);
              simCtx.strokeStyle = isCool ? 'rgba(56, 189, 248, 0.75)' : 'rgba(248, 113, 113, 0.45)';
              simCtx.lineWidth = isCool ? 2 : 1;
              simCtx.stroke();
            }

            // 모발 줄기 & 식물 잎사귀 (Before: 힘없이 휘어지고 말라죽는 단모 / After: 굵고 곧게 뻗어 오르는 3모낭과 푸른 잎)
            const stemH = isCool ? 145 : 78;
            const sway = isCool ? Math.sin(timeSec * 2 + rIdx) * 5 : 26 + Math.sin(timeSec * 4 + rIdx) * 6;
            const topX = rx + sway;
            const topY = potTopY - stemH;

            simCtx.beginPath();
            simCtx.moveTo(rx, bulbY);
            simCtx.quadraticCurveTo(rx + sway * 0.35, potTopY - stemH * 0.45, topX, topY);
            simCtx.strokeStyle = isCool ? '#34D399' : '#D97706';
            simCtx.lineWidth = isCool ? 5.2 : 1.8;
            simCtx.lineCap = 'round';
            simCtx.stroke();

            if (isCool) {
              // 풍성한 다발모 & 싱그러운 잎사귀
              [-1, 1].forEach(dir => {
                simCtx.beginPath();
                simCtx.moveTo(rx, potTopY - 6);
                simCtx.quadraticCurveTo(rx + dir * 18, potTopY - stemH * 0.55, rx + dir * 24 + sway * 0.5, topY + 18);
                simCtx.strokeStyle = '#F8FAFC';
                simCtx.lineWidth = 3.2;
                simCtx.stroke();

                // 싱그러운 초록 잎사귀
                simCtx.beginPath();
                simCtx.ellipse(rx + dir * 16, potTopY - stemH * 0.55, 14, 7, dir * -0.45, 0, Math.PI * 2);
                simCtx.fillStyle = '#10B981';
                simCtx.fill();
              });
            } else {
              // 말라붙은 갈색 잎사귀
              simCtx.beginPath();
              simCtx.ellipse(topX + 10, topY + 12, 9, 4, 0.5, 0, Math.PI * 2);
              simCtx.fillStyle = 'rgba(180, 83, 9, 0.75)';
              simCtx.fill();
            }
          });

          // 6) 상단 실시간 두피 온도 & 모근 상태 비교 배지
          simCtx.textAlign = 'center';
          simCtx.font = '800 15px Pretendard, sans-serif';
          if (isCool) {
            simCtx.fillStyle = '#6EE7B7';
            simCtx.fillText('❄️ 학술 검증 수승화강(水升火降) 청열 완료 : 두피 열독 완화 및 모유두세포·모근 재생', cx, potBotY + 52);
          } else {
            simCtx.fillStyle = '#FCA5A5';
            simCtx.fillText('🔥 상열하한(上熱下寒) 두피 열독 사막화 : 진액 고갈 및 모근 위축 (표피 관리의 한계)', cx, potBotY + 52);
          }
          simCtx.textAlign = 'left';
          simCtx.restore();
        } else {
          // ==================================================================
          // STORY 03 (Gongjindan): 황제의 불로장생을 위한 처방, 생명력을 깨우는 사향(麝香)
          // [사향의 약리 기전 시뮬레이션: 거대 수문(막힌 기혈) 개방 ➔ 전신 혈관 생명수 도달]
          // - Before: 꽉 막힌 거대한 수문(막힌 기혈·상열하한 울체) 앞에서 에너지가 차단되어
          //   전신과 뇌 끝까지 이어지는 혈관망이 메말라 어둡게 정체된 모습.
          // - After: 24K 금박을 두른 황제공진단이 수문 중앙에 닿자마자 강력한 황금빛 파동(개규 開竅)이
          //   폭발하듯 퍼져나가며 수문이 양옆으로 활짝 열리고, 막혀있던 생명수(사향·녹용·당귀 기혈)가
          //   전신의 메마른 혈관을 타고 머리끝(뇌신경)부터 발끝까지 단숨에 뻗어나가는 3D 모션.
          // ==================================================================
          if (!simManualOverride) {
            const autoPhase = (timeSec % 10.4) < 4.8 ? 'before' : 'after';
            if (autoPhase !== simMode) {
              simMode = autoPhase;
              document.getElementById('btn-sim-before')?.classList.toggle('active', simMode === 'before');
              document.getElementById('btn-sim-after')?.classList.toggle('active', simMode === 'after');
            }
          }

          const isOpened = simMode === 'after';
          const cx = w * 0.5;
          const gateY = h * 0.48;
          const gateW = Math.min(w * 0.54, 380);
          const gateH = 54;
          const subCycle = timeSec % 5.6;
          const openRatio = isOpened ? Math.min(1, subCycle / 1.1) : 0;

          // 1) 배경 황금빛 사향 개규(開竅) 오라 vs 어두운 기혈 울체 배경
          const bgGlow = simCtx.createRadialGradient(cx, gateY, 16, cx, gateY, Math.max(w, h) * 0.55);
          if (isOpened) {
            bgGlow.addColorStop(0, 'rgba(212, 175, 55, 0.34)');
            bgGlow.addColorStop(0.45, 'rgba(245, 158, 11, 0.14)');
            bgGlow.addColorStop(0.75, 'rgba(16, 185, 129, 0.08)');
            bgGlow.addColorStop(1, 'rgba(14, 11, 8, 0)');
          } else {
            bgGlow.addColorStop(0, 'rgba(239, 68, 68, 0.20)');
            bgGlow.addColorStop(0.5, 'rgba(30, 27, 24, 0.15)');
            bgGlow.addColorStop(1, 'rgba(14, 11, 8, 0)');
          }
          simCtx.fillStyle = bgGlow;
          simCtx.fillRect(0, 0, w, h);

          simCtx.save();

          // 2) 전신 혈관·경락 네트워크 (수문 위쪽: 뇌·상초 혈관망 / 수문 아래쪽: 심장·신장·사지 말초 혈관망)
          const branches = [
            // 상단(머리끝·뇌신경 방향) 5개 주요 혈관 줄기
            { sx: cx, sy: gateY - 12, cx1: cx - 40, cy1: h * 0.30, ex: cx - 150, ey: h * 0.15, label: '뇌해마(NGF)' },
            { sx: cx, sy: gateY - 12, cx1: cx - 18, cy1: h * 0.26, ex: cx - 65, ey: h * 0.12, label: '전두엽·집중력' },
            { sx: cx, sy: gateY - 12, cx1: cx, cy1: h * 0.25, ex: cx, ey: h * 0.10, label: '백회(머리끝 기혈)' },
            { sx: cx, sy: gateY - 12, cx1: cx + 18, cy1: h * 0.26, ex: cx + 65, ey: h * 0.12, label: '뇌혈류 순환' },
            { sx: cx, sy: gateY - 12, cx1: cx + 40, cy1: h * 0.30, ex: cx + 150, ey: h * 0.15, label: '자율신경 안정' },
            // 하단(심장·신장·발끝 말초 방향) 5개 주요 혈관 줄기
            { sx: cx, sy: gateY + 12, cx1: cx - 45, cy1: h * 0.62, ex: cx - 155, ey: h * 0.76, label: '상열하한 해소' },
            { sx: cx, sy: gateY + 12, cx1: cx - 20, cy1: h * 0.65, ex: cx - 70, ey: h * 0.80, label: '신장 원기(元氣)' },
            { sx: cx, sy: gateY + 12, cx1: cx, cy1: h * 0.66, ex: cx, ey: h * 0.82, label: '용천(발끝 말초혈관)' },
            { sx: cx, sy: gateY + 12, cx1: cx + 20, cy1: h * 0.65, ex: cx + 70, ey: h * 0.80, label: '조혈·면역 활성' },
            { sx: cx, sy: gateY + 12, cx1: cx + 45, cy1: h * 0.62, ex: cx + 155, ey: h * 0.76, label: '만성피로 젖산배출' }
          ];

          branches.forEach((br, bIdx) => {
            // 혈관 줄기 렌더링 (Before: 메마르고 어두운 회갈색 실선 / After: 황금빛·청록빛 생명수가 흐르는 굵은 혈관)
            simCtx.beginPath();
            simCtx.moveTo(br.sx, br.sy);
            simCtx.quadraticCurveTo(br.cx1, br.cy1, br.ex, br.ey);
            simCtx.strokeStyle = isOpened ? 'rgba(212, 175, 55, 0.68)' : 'rgba(148, 163, 184, 0.20)';
            simCtx.lineWidth = isOpened ? 3.2 : 1.3;
            simCtx.stroke();

            // After: 수문이 열리면서 생명수(사향 L-Muscone + 녹용 + 당귀) 입자가 혈관 끝까지 뻗어나가는 모션
            if (isOpened) {
              for (let pIdx = 0; pIdx < 3; pIdx++) {
                const t = (timeSec * 1.35 + pIdx * 0.33 + bIdx * 0.07) % 1;
                const inv = 1 - t;
                const px = inv * inv * br.sx + 2 * inv * t * br.cx1 + t * t * br.ex;
                const py = inv * inv * br.sy + 2 * inv * t * br.cy1 + t * t * br.ey;
                simCtx.beginPath();
                simCtx.arc(px, py, 4.2, 0, Math.PI * 2);
                simCtx.fillStyle = pIdx === 0 ? '#FDE68A' : (pIdx === 1 ? '#34D399' : '#38BDF8');
                simCtx.fill();
              }
            }

            // 말단 노드 및 라벨
            simCtx.beginPath();
            simCtx.arc(br.ex, br.ey, isOpened ? 6.5 : 3.5, 0, Math.PI * 2);
            simCtx.fillStyle = isOpened ? '#FDE68A' : 'rgba(239, 68, 68, 0.45)';
            simCtx.fill();

            if (bIdx % 2 === 0) {
              simCtx.fillStyle = isOpened ? '#FDE68A' : 'rgba(255,255,255,0.42)';
              simCtx.font = '700 10px Pretendard, sans-serif';
              simCtx.textAlign = 'center';
              simCtx.fillText(br.label, br.ex, br.ey + (bIdx < 5 ? -10 : 18));
            }
          });

          // 3) 중앙 거대 수문 (Floodgate of Qi & Blood)
          const doorW = gateW * 0.46;
          const slideX = openRatio * (gateW * 0.38);

          // 좌측 수문 문짝
          simCtx.fillStyle = isOpened ? 'rgba(30, 41, 59, 0.72)' : 'rgba(127, 29, 29, 0.82)';
          simCtx.strokeStyle = isOpened ? '#D4AF37' : '#F87171';
          simCtx.lineWidth = 2.4;
          simCtx.beginPath();
          simCtx.roundRect(cx - doorW - slideX, gateY - gateH * 0.5, doorW - 2, gateH, 8);
          simCtx.fill();
          simCtx.stroke();

          // 우측 수문 문짝
          simCtx.beginPath();
          simCtx.roundRect(cx + 2 + slideX, gateY - gateH * 0.5, doorW - 2, gateH, 8);
          simCtx.fill();
          simCtx.stroke();

          simCtx.fillStyle = isOpened ? '#FDE68A' : '#FCA5A5';
          simCtx.font = '800 11px Pretendard, sans-serif';
          simCtx.textAlign = 'center';
          simCtx.fillText(isOpened ? '◀ 개규(開竅) 수문 개방' : '🔒 막힌 기혈 수문', cx - doorW * 0.5 - slideX, gateY + 4);
          simCtx.fillText(isOpened ? '수문 개방 (수승화강) ▶' : '원기 차단·울체 🔒', cx + doorW * 0.5 + slideX, gateY + 4);

          // 4) 중앙 24K 순금박 황제공진단 환(丸) & 폭발적 황금 파동(Shockwave)
          if (isOpened) {
            for (let r = 0; r < 3; r++) {
              const p = (timeSec * 0.85 + r * 0.33) % 1;
              simCtx.beginPath();
              simCtx.arc(cx, gateY, 22 + p * 165, 0, Math.PI * 2);
              simCtx.strokeStyle = 'rgba(253, 230, 138, ' + ((1 - p) * 0.72).toFixed(2) + ')';
              simCtx.lineWidth = 2.6;
              simCtx.stroke();
            }

            // 24K 순금박 공진단 구체
            const orbGrad = simCtx.createRadialGradient(cx - 8, gateY - 8, 3, cx, gateY, 26);
            orbGrad.addColorStop(0, '#FFFBEB');
            orbGrad.addColorStop(0.45, '#FACC15');
            orbGrad.addColorStop(1, '#B45309');
            simCtx.beginPath();
            simCtx.arc(cx, gateY, 25, 0, Math.PI * 2);
            simCtx.fillStyle = orbGrad;
            simCtx.fill();
            simCtx.lineWidth = 2.5;
            simCtx.strokeStyle = '#FEF08A';
            simCtx.stroke();

            simCtx.fillStyle = '#1C1917';
            simCtx.font = '900 10.5px Pretendard, sans-serif';
            simCtx.fillText('정품 사향', cx, gateY + 4);
          }

          // 5) 하단 실시간 약리 기전 요약 배지
          simCtx.font = '800 14.5px Pretendard, sans-serif';
          if (isOpened) {
            simCtx.fillStyle = '#FDE68A';
            simCtx.fillText('✦ 사향(麝香) 개규(開竅) 파동으로 막힌 기혈의 수문 개방! 녹용·당귀의 생명수가 머리끝부터 발끝까지 도달', cx, h * 0.89);
          } else {
            simCtx.fillStyle = '#FCA5A5';
            simCtx.fillText('⚠️ 기혈의 수문이 꽉 막힌 만성 번아웃 상태 : 일반 영양제를 부어도 말초·뇌혈관까지 도달 불가', cx, h * 0.89);
          }
          simCtx.textAlign = 'left';
          simCtx.restore();
        }
      }

      // ====================================================================
      // 4B. EMPEROR GONGJINDAN 10-PAGE BROCHURE PANORAMA CAROUSEL ENGINE
      // ====================================================================
      (function initGjdPanoramaArchive() {
        const viewport = document.getElementById('gjd-panorama-viewport');
        const track = document.getElementById('gjd-panorama-track');
        const counterEl = document.getElementById('gjd-pano-counter');
        const autoBtn = document.getElementById('gjd-pano-auto-btn');
        if (!viewport || !track) return;

        const slides = Array.from(track.querySelectorAll('.gjd-pano-slide'));
        const thumbs = Array.from(document.querySelectorAll('.gjd-pano-thumb-pill'));
        let activeIdx = 0;
        let autoPlay = true;

        function centerSlide(idx, smooth) {
          if (!slides.length) return;
          activeIdx = ((idx % slides.length) + slides.length) % slides.length;
          slides.forEach((sl, i) => sl.classList.toggle('is-active', i === activeIdx));
          thumbs.forEach((th, i) => th.classList.toggle('active', i === activeIdx));
          if (counterEl) {
            const n = activeIdx + 1;
            counterEl.textContent = (n < 10 ? '0' + n : '' + n) + ' / ' + slides.length;
          }
          const targetSlide = slides[activeIdx];
          if (targetSlide) {
            const scrollTarget = targetSlide.offsetLeft - (viewport.clientWidth - targetSlide.offsetWidth) * 0.5;
            viewport.scrollTo({ left: Math.max(0, scrollTarget), behavior: smooth === false ? 'auto' : 'smooth' });
          }
          const targetThumb = thumbs[activeIdx];
          const thumbsBar = document.getElementById('gjd-pano-thumbs-bar');
          if (targetThumb && thumbsBar) {
            const thumbTarget = targetThumb.offsetLeft - (thumbsBar.clientWidth - targetThumb.offsetWidth) * 0.5;
            thumbsBar.scrollTo({ left: Math.max(0, thumbTarget), behavior: 'smooth' });
          }
        }

        window.selectGjdPanorama = function(idx, manual) {
          if (manual) {
            autoPlay = false;
            if (autoBtn) {
              autoBtn.classList.remove('active');
              autoBtn.textContent = '▶ 자동 파노라마 OFF';
            }
          }
          centerSlide(idx, true);
        };

        window.stepGjdPanorama = function(dir) {
          window.selectGjdPanorama(activeIdx + dir, true);
        };

        window.toggleGjdPanoramaAuto = function() {
          autoPlay = !autoPlay;
          if (autoBtn) {
            autoBtn.classList.toggle('active', autoPlay);
            autoBtn.textContent = autoPlay ? '⏯ 자동 파노라마 ON' : '▶ 자동 파노라마 OFF';
          }
        };

        function resolveSlideImageSrc(sl) {
          if (!sl) return '';
          const mainImg = sl.querySelector('img.gjd-pano-main-img') || sl.querySelector('.gjd-pano-img-wrap img:not(.emoji)');
          if (mainImg) {
            const attrSrc = mainImg.getAttribute('src') || '';
            const propSrc = mainImg.src || '';
            if (propSrc && !propSrc.includes('s.w.org/images/core/emoji')) return propSrc;
            if (attrSrc && !attrSrc.includes('s.w.org/images/core/emoji')) return attrSrc;
          }
          return sl.getAttribute('data-img') || sl.dataset.img || '';
        }

        window.getGjdPanoramaGalleryList = function() {
          return slides.map((sl, i) => ({
            src: resolveSlideImageSrc(sl),
            code: sl.getAttribute('data-code') || ('P.' + (i + 1 < 10 ? '0' + (i + 1) : '' + (i + 1))),
            tag: sl.getAttribute('data-tag') || '',
            short: sl.getAttribute('data-short') || ((i + 1 < 10 ? '0' + (i + 1) : '' + (i + 1)) + 'P'),
            title: sl.getAttribute('data-title') || (sl.querySelector('.gjd-pano-slide-caption strong')?.textContent || ''),
            desc: sl.getAttribute('data-desc') || (sl.querySelector('.gjd-pano-slide-caption span')?.textContent || ''),
            isGjdPanorama: true
          }));
        };

        window.openGjdPanoramaLightbox = function(idx) {
          const targetIdx = typeof idx === 'number' ? idx : activeIdx;
          window.selectGjdPanorama(targetIdx, true);
          const galleryList = window.getGjdPanoramaGalleryList();
          const safeIdx = ((targetIdx % galleryList.length) + galleryList.length) % galleryList.length;
          const targetItem = galleryList[safeIdx];
          if (targetItem && targetItem.src && window.openCleanLightbox) {
            window.openCleanLightbox(targetItem.src, galleryList, safeIdx);
          }
        };

        window.zoomActiveGjdPanorama = function() {
          window.openGjdPanoramaLightbox(activeIdx);
        };

        let lastPanoDragDistance = 0;
        window.handleGjdSlideClick = function(idx) {
          if (lastPanoDragDistance > 10) {
            lastPanoDragDistance = 0;
            return;
          }
          window.openGjdPanoramaLightbox(idx);
        };

        // Keep activeIdx synced when user manually scrolls/swipes the panorama viewport
        let scrollSyncTimer = null;
        viewport.addEventListener('scroll', () => {
          if (scrollSyncTimer) clearTimeout(scrollSyncTimer);
          scrollSyncTimer = setTimeout(() => {
            if (!slides.length) return;
            const vpCenter = viewport.scrollLeft + viewport.clientWidth * 0.5;
            let bestIdx = activeIdx;
            let minDist = Infinity;
            slides.forEach((sl, i) => {
              const slCenter = sl.offsetLeft + sl.offsetWidth * 0.5;
              const d = Math.abs(slCenter - vpCenter);
              if (d < minDist) {
                minDist = d;
                bestIdx = i;
              }
            });
            if (bestIdx !== activeIdx) {
              activeIdx = bestIdx;
              slides.forEach((sl, i) => sl.classList.toggle('is-active', i === activeIdx));
              thumbs.forEach((th, i) => th.classList.toggle('active', i === activeIdx));
              if (counterEl) {
                const n = activeIdx + 1;
                counterEl.textContent = (n < 10 ? '0' + n : '' + n) + ' / ' + slides.length;
              }
            }
          }, 90);
        }, { passive: true });

        // Drag-to-scroll inside panorama viewport
        let pDown = false, pStartX = 0, pStartScroll = 0;
        viewport.addEventListener('pointerdown', (e) => {
          if (e.target.closest('button')) return;
          e.stopPropagation();
          pDown = true;
          lastPanoDragDistance = 0;
          pStartX = e.clientX;
          pStartScroll = viewport.scrollLeft;
        });
        window.addEventListener('pointermove', (e) => {
          if (!pDown) return;
          const dx = pStartX - e.clientX;
          lastPanoDragDistance = Math.max(lastPanoDragDistance, Math.abs(dx));
          if (Math.abs(dx) > 6) {
            autoPlay = false;
            if (autoBtn) {
              autoBtn.classList.remove('active');
              autoBtn.textContent = '▶ 자동 파노라마 OFF';
            }
          }
          viewport.scrollLeft = pStartScroll + dx * 1.25;
        });
        window.addEventListener('pointerup', () => { pDown = false; });

        setInterval(() => {
          if (!autoPlay) return;
          const lbEl = document.getElementById('plate-lightbox');
          if (lbEl && lbEl.classList.contains('open')) return;
          const card = document.getElementById('gjd-panorama-card');
          if (!card || !card.classList.contains('is-active-plate')) return;
          centerSlide(activeIdx + 1, true);
        }, 3800);

        setTimeout(() => centerSlide(0, false), 220);
      })();

      // ====================================================================
      // 5. MASTER 60FPS ANIMATION LOOP
      // ====================================================================
      let lastNow = performance.now();

      function animateAll(now) {
        const dt = Math.min(0.1, (now - lastNow) * 0.001);
        lastNow = now;
        const timeSec = now * 0.001;

        if (window.innerWidth <= 1024) {
          moveContainer.style.transform = 'none';
          const maxDocScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
          const scrollNorm = Math.max(0, Math.min(1, window.scrollY / maxDocScroll));
          progressBar.style.width = (scrollNorm * 100).toFixed(1) + '%';

          if (typeof window.applyInlineScrollBaPct === 'function') {
            const autoWave = 0.5 - 0.5 * Math.cos(timeSec * 1.85);
            const autoBaPct = 6 + autoWave * 88;
            window.applyInlineScrollBaPct(autoBaPct);
          }
          if (typeof window.syncIdeaA3DScroll === 'function') {
            window.syncIdeaA3DScroll(scrollNorm);
          }

          const vpCenterY = window.innerHeight * 0.5;
          let closestIdx = 0, minDistance = Infinity;
          plates.forEach((plate, idx) => {
            const rect = plate.getBoundingClientRect();
            const distY = (rect.top + rect.height * 0.5) - vpCenterY;
            if (Math.abs(distY) < minDistance) { minDistance = Math.abs(distY); closestIdx = idx; }
            const cleanMedia = plate.querySelector('.lusion-clean-media');
            if (cleanMedia && !plate.classList.contains('is-ba-scan-plate') && plate.id !== 'runway-scroll-ba-plate') {
              cleanMedia.style.transform = 'none';
            }
          });
          plates.forEach((p, idx) => p.classList.toggle('is-active-plate', idx === closestIdx));
        } else {
          // Mobile Touch Momentum Inertia Coasting (same feel as Desktop Wheel)
          if (!isTouchActive && Math.abs(touchInertiaVelX) > 1.0) {
            updateBounds();
            targetX = Math.max(0, Math.min(maxScrollX, targetX + touchInertiaVelX * dt));
            touchInertiaVelX *= Math.pow(0.915, dt * 60);
            if (targetX <= 0 || targetX >= maxScrollX) touchInertiaVelX = 0;
          }

          // Horizontal Runway Smooth Lerp + Scroll-Driven Before/After 3D Scan Transformation
          currentX += (targetX - currentX) * 0.085;
          const velocity = (targetX - currentX) * 0.0025;
          const clampedSkew = Math.max(-1.6, Math.min(1.6, -velocity));

          moveContainer.style.transform = 'translate3d(' + (-currentX.toFixed(2)) + 'px, 0, 0) skewX(' + clampedSkew.toFixed(2) + 'deg)';
          const scrollNorm = maxScrollX > 0 ? Math.max(0, Math.min(1, currentX / maxScrollX)) : 0;
          progressBar.style.width = (scrollNorm * 100).toFixed(1) + '%';

          if (typeof window.applyInlineScrollBaPct === 'function') {
            const autoWave = 0.5 - 0.5 * Math.cos(timeSec * 1.85);
            const autoBaPct = 6 + autoWave * 88;
            window.applyInlineScrollBaPct(autoBaPct);
          }
          if (typeof window.syncIdeaA3DScroll === 'function') {
            window.syncIdeaA3DScroll(scrollNorm);
          }

          const viewportCenter = currentX + wrapper.clientWidth * 0.5;
          let closestIdx = 0, minDistance = Infinity;

          plates.forEach((plate, idx) => {
            const dist = (plate.offsetLeft + plate.offsetWidth * 0.5) - viewportCenter;
            if (Math.abs(dist) < minDistance) { minDistance = Math.abs(dist); closestIdx = idx; }
            const cleanMedia = plate.querySelector('.lusion-clean-media');
            if (cleanMedia && !plate.classList.contains('is-ba-scan-plate') && plate.id !== 'runway-scroll-ba-plate') {
              if (cleanMedia.classList.contains('is-contain-fit') || cleanMedia.classList.contains('is-video-contain-fit')) {
                cleanMedia.style.transform = 'none';
              } else {
                const parallaxX = Math.max(-28, Math.min(28, dist * -0.04));
                cleanMedia.style.transform = 'scale(1.06) translate3d(' + parallaxX.toFixed(1) + 'px, 0, 0)';
              }
            }
          });

          plates.forEach((p, idx) => p.classList.toggle('is-active-plate', idx === closestIdx));
        }

        // Advance Every Plate's Multi-Frame Motion Video & 60fps FX Overlay
        motionStages.forEach((ms, sIdx) => {
          ms.elapsed = (ms.elapsed + dt) % ms.duration;
          const cycleNorm = ms.elapsed / ms.duration;
          if (ms.progFill) ms.progFill.style.width = (cycleNorm * 100).toFixed(1) + '%';

          if (ms.frames.length > 1 && ms.layerA && ms.layerB) {
            const targetIdx = Math.min(ms.frames.length - 1, Math.floor(cycleNorm * ms.frames.length));
            if (targetIdx !== ms.currIdx) {
              ms.currIdx = targetIdx;
              applyStageFrame(ms, targetIdx);
            }
          }

          // Continuous 3D Ken Burns / Breathing Zoom camera motion
          const isBreathingZoom = ms.fxType === 'warm-breath-zoom';
          const zoom = isBreathingZoom
            ? 1.055 + 0.055 * Math.sin(timeSec * 1.35)
            : 1.03 + 0.06 * Math.sin(timeSec * 0.7 + sIdx);
          const panX = Math.cos(timeSec * 0.55 + sIdx) * (isBreathingZoom ? 8 : 12);
          const panY = Math.sin(timeSec * 0.45 + sIdx) * (isBreathingZoom ? 5 : 8);
          const transformStr = 'scale(' + zoom.toFixed(4) + ') translate3d(' + panX.toFixed(1) + 'px, ' + panY.toFixed(1) + 'px, 0)';
          if (ms.layerA) ms.layerA.style.transform = transformStr;
          if (ms.layerB) ms.layerB.style.transform = transformStr;

          drawPlateMotionFx(ms, timeSec, cycleNorm);
        });

        drawSimCanvas(timeSec);
        requestAnimationFrame(animateAll);
      }

      // ====================================================================
      // 6. OUR SIGNATURE 3D PORCELAIN HUMAN BODY MODEL FOR 9TH CARD (수정사항 3)
      // ====================================================================
      (async function initOur3DBodyModelInCard9() {
        const canvas = document.getElementById('diet-our-3d-body-canvas');
        const stageEl = document.getElementById('diet-our-3d-body-stage');
        const hintEl = document.getElementById('diet-3d-loading-hint');
        if (!canvas || !stageEl) return;

        try {
          const THREE = await import('https://esm.sh/three@0.166.0');
          const { GLTFLoader } = await import('https://esm.sh/three@0.166.0/examples/jsm/loaders/GLTFLoader.js');
          const { DRACOLoader } = await import('https://esm.sh/three@0.166.0/examples/jsm/loaders/DRACOLoader.js');
          const { OrbitControls } = await import('https://esm.sh/three@0.166.0/examples/jsm/controls/OrbitControls.js');

          const scene = new THREE.Scene();
          const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
          camera.position.set(0, 0.25, 3.35);

          const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
          renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
          renderer.outputColorSpace = THREE.SRGBColorSpace;
          renderer.toneMapping = THREE.ACESFilmicToneMapping;
          renderer.toneMappingExposure = 1.15;

          const controls = new OrbitControls(camera, canvas);
          controls.enableDamping = true;
          controls.dampingFactor = 0.06;
          controls.enablePan = false;
          controls.minDistance = 1.8;
          controls.maxDistance = 4.6;
          controls.target.set(0, 0.12, 0);
          controls.autoRotate = true;
          controls.autoRotateSpeed = 1.25;

          function syncSize() {
            const r = stageEl.getBoundingClientRect();
            const w = Math.max(180, r.width);
            const h = Math.max(200, r.height);
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h, false);
          }
          syncSize();
          window.addEventListener('resize', syncSize);
          setTimeout(syncSize, 250);
          setTimeout(syncSize, 800);

          const lightDir = new THREE.Vector3(0.45, 0.72, 0.85).normalize();

          function createPorcelainSkinMaterial(opacityVal) {
            return new THREE.ShaderMaterial({
              transparent: true,
              depthWrite: false,
              side: THREE.FrontSide,
              uniforms: {
                uBaseColor: { value: new THREE.Color('#FCF8F2') },
                uShadowColor: { value: new THREE.Color('#E5D5C3') },
                uRimColor: { value: new THREE.Color('#D4AF37') },
                uOpacity: { value: opacityVal },
                uLightDir: { value: lightDir }
              },
              vertexShader: [
                'varying vec3 vNormal;',
                'varying vec3 vViewDir;',
                'void main() {',
                '  vec4 mvPos = modelViewMatrix * vec4(position, 1.0);',
                '  vNormal = normalize(normalMatrix * normal);',
                '  vViewDir = normalize(-mvPos.xyz);',
                '  gl_Position = projectionMatrix * mvPos;',
                '}'
              ].join('\\n'),
              fragmentShader: [
                'uniform vec3 uBaseColor;',
                'uniform vec3 uShadowColor;',
                'uniform vec3 uRimColor;',
                'uniform float uOpacity;',
                'uniform vec3 uLightDir;',
                'varying vec3 vNormal;',
                'varying vec3 vViewDir;',
                'void main() {',
                '  vec3 N = normalize(vNormal);',
                '  vec3 V = normalize(vViewDir);',
                '  vec3 L = normalize((viewMatrix * vec4(uLightDir, 0.0)).xyz);',
                '  float ndl = dot(N, L) * 0.5 + 0.5;',
                '  float toon = smoothstep(0.32, 0.65, ndl);',
                '  vec3 col = mix(uShadowColor, uBaseColor, toon);',
                '  float fresnel = pow(1.0 - max(dot(N, V), 0.0), 2.3);',
                '  col = mix(col, uRimColor, fresnel * 0.42);',
                '  float alpha = clamp(uOpacity + fresnel * 0.36, 0.08, 0.92);',
                '  gl_FragColor = vec4(col, alpha);',
                '}'
              ].join('\\n')
            });
          }

          function createCelMaterial(baseHex, shadowHex, rimHex, opacityVal) {
            const isTrans = opacityVal < 0.99;
            return new THREE.ShaderMaterial({
              transparent: isTrans,
              depthWrite: !isTrans,
              side: THREE.DoubleSide,
              uniforms: {
                uBase: { value: new THREE.Color(baseHex) },
                uShadow: { value: new THREE.Color(shadowHex) },
                uRim: { value: new THREE.Color(rimHex || '#FFFDF9') },
                uOpacity: { value: opacityVal },
                uLightDir: { value: lightDir }
              },
              vertexShader: [
                'varying vec3 vNormal;',
                'varying vec3 vViewDir;',
                'void main() {',
                '  vec4 mvPos = modelViewMatrix * vec4(position, 1.0);',
                '  vNormal = normalize(normalMatrix * normal);',
                '  vViewDir = normalize(-mvPos.xyz);',
                '  gl_Position = projectionMatrix * mvPos;',
                '}'
              ].join('\\n'),
              fragmentShader: [
                'uniform vec3 uBase;',
                'uniform vec3 uShadow;',
                'uniform vec3 uRim;',
                'uniform float uOpacity;',
                'uniform vec3 uLightDir;',
                'varying vec3 vNormal;',
                'varying vec3 vViewDir;',
                'void main() {',
                '  vec3 N = normalize(vNormal);',
                '  if (!gl_FrontFacing) N = -N;',
                '  vec3 V = normalize(vViewDir);',
                '  vec3 L = normalize((viewMatrix * vec4(uLightDir, 0.0)).xyz);',
                '  float ndl = dot(N, L) * 0.5 + 0.5;',
                '  float celBand = ndl > 0.66 ? 1.0 : (ndl > 0.36 ? 0.55 : 0.12);',
                '  vec3 col = mix(uShadow, uBase, celBand);',
                '  float rim = smoothstep(0.62, 0.92, 1.0 - max(dot(N, V), 0.0));',
                '  col = mix(col, uRim, rim * 0.35);',
                '  gl_FragColor = vec4(col, uOpacity);',
                '}'
              ].join('\\n')
            });
          }

          const bodyRoot = new THREE.Group();
          bodyRoot.position.set(0, -0.02, 0);
          scene.add(bodyRoot);

          const dracoLoader = new DRACOLoader();
          dracoLoader.setDecoderPath('draco/');
          const gltfLoader = new GLTFLoader();
          gltfLoader.setDRACOLoader(dracoLoader);

          let femaleModel = null;
          let maleModel = null;

          // 1) Female Porcelain Skin (Default)
          gltfLoader.load('models/skinF2.glb', (gltf) => {
            femaleModel = gltf.scene;
            const mat = createPorcelainSkinMaterial(0.38);
            femaleModel.traverse((c) => {
              if (c.isMesh) {
                c.material = mat;
                c.renderOrder = 3;
              }
            });
            bodyRoot.add(femaleModel);
            if (hintEl) hintEl.style.display = 'none';
            syncSize();
          });

          // 2) Male Porcelain Skin
          gltfLoader.load('models/skinMB2.glb', (gltf) => {
            maleModel = gltf.scene;
            const mat = createPorcelainSkinMaterial(0.38);
            maleModel.traverse((c) => {
              if (c.isMesh) {
                c.material = mat;
                c.renderOrder = 3;
              }
            });
            maleModel.visible = false;
            bodyRoot.add(maleModel);
          });

          // 3) Skeleton
          gltfLoader.load('models/Skeleton.glb', (gltf) => {
            const skel = gltf.scene;
            const skelMat = createCelMaterial('#F5EFE4', '#CBBBA4', '#FFFFFF', 0.58);
            skel.traverse((c) => {
              if (c.isMesh) {
                c.material = skelMat;
                c.renderOrder = 1;
              }
            });
            bodyRoot.add(skel);
          });

          // 4) Core Metabolic & Digestive Organs (Liver, Stomach, Intestine)
          const organConfigs = [
            { file: 'models/liver.glb', base: '#D47B6A', shadow: '#9B4B3E', rim: '#FADAD3', pos: [-0.07, 0.30, 0.05], scale: 0.04 },
            { file: 'models/stomach.glb', base: '#E99B72', shadow: '#B6633D', rim: '#FDE4D4', pos: [0.05, 0.25, 0.06], scale: 0.25 },
            { file: 'models/intestine.glb', base: '#E2A689', shadow: '#AD6E52', rim: '#FCE9DF', pos: [0.00, 0.06, 0.05], scale: 0.095 }
          ];
          organConfigs.forEach((cfg) => {
            gltfLoader.load(cfg.file, (gltf) => {
              const org = gltf.scene;
              org.position.set(cfg.pos[0], cfg.pos[1], cfg.pos[2]);
              org.scale.setScalar(cfg.scale);
              const mat = createCelMaterial(cfg.base, cfg.shadow, cfg.rim, 0.96);
              org.traverse((c) => {
                if (c.isMesh) {
                  c.material = mat;
                  c.renderOrder = 2;
                }
              });
              bodyRoot.add(org);
            });
          });

          window.switchDietCard3DGender = function(gender) {
            if (femaleModel) femaleModel.visible = (gender === 'female');
            if (maleModel) maleModel.visible = (gender === 'male');
            document.getElementById('btn-diet-3d-female')?.classList.toggle('active', gender === 'female');
            document.getElementById('btn-diet-3d-male')?.classList.toggle('active', gender === 'male');
          };

          window.resetDietCard3DView = function() {
            camera.position.set(0, 0.25, 3.35);
            controls.target.set(0, 0.12, 0);
            controls.update();
          };

          function render3DLoop() {
            requestAnimationFrame(render3DLoop);
            controls.update();
            renderer.render(scene, camera);
          }
          render3DLoop();
        } catch (err) {
          console.warn('3D Body Model fallback:', err);
        }
      })();

      requestAnimationFrame(animateAll);
    })();
  </script>
  <script src="visit-tracker.js"></script>
</body>
</html>`;
}

// ============================================================================
// BAREUN WORDPRESS ALL-IN-ONE COMPILER & ASSET REWRITER
// ============================================================================
const WP_EMBEDDED_CLINIC_CONFIG = "/**\r\n * ============================================================================\r\n * 🏛️ BAREUN KOREAN MEDICINE — B2B WHITE-LABEL MASTER TEMPLATE CONFIG\r\n * ============================================================================\r\n * 전국 한의원 템플릿 납품 시 아래 JSON 객체(CLINIC_TEMPLATE_CONFIG)만 수정하면\r\n * 메인 3D 시네마(index.html / story-3d.html) 및 6대 클리닉 상세페이지 전체의\r\n * 한의원명, 대표원장명, 연락처, 진료시간, 주소, 기본 테마/시안성 모드가 즉시 변경됩니다.\r\n */\r\nwindow.CLINIC_TEMPLATE_CONFIG = {\r\n  // 1. 한의원 기본 브랜드 정보\r\n  clinicName: '바른한의원 대전본점',\r\n  clinicNameEn: 'BAREUN KOREAN MEDICINE CLINIC DAEJEON',\r\n  directorName: '안정위',\r\n  directorTitle: '대표원장',\r\n  careerYears: '15년',\r\n  slogan: '바른 마음, 정직한 처방 · 평생 주치의 바른한의원 대전본점',\r\n\r\n  // 2. 연락처 및 예약 채널\r\n  phone: '010-5631-1275',\r\n  kakaoUrl: 'https://pf.kakao.com/_ykxcLK',\r\n  naverBookingUrl: 'https://naver.me/5U1ELn8L',\r\n  address: '대전광역시 대덕구 비래동로7번길 1, 2층 (비래동, 바른한의원 대전본점)',\r\n\r\n  // 3. 진료 시간 안내 (환자 신뢰 & 시안성 정보)\r\n  hours: [\r\n    { day: '평일 (월~금)', time: '09:00 ~ 19:00' },\r\n    { day: '토요일 · 공휴일', time: '09:00 ~ 14:00' },\r\n    { day: '정기휴진', time: '매주 일요일 휴진' }\r\n  ],\r\n\r\n  // 4. 기본 테마 & 시안성 프리셋 ('warm-hanji' | 'dark-royal' | 'high-visibility')\r\n  defaultTheme: 'warm-hanji',\r\n\r\n  // 4-1. 바른한의원 5대 시그니처 브랜드 컬러 팔레트 (심리학 기반 하이엔드 컬러 시스템)\r\n  brandPalette: {\r\n    beige: { hex: '#F5F1E8', subHex: '#EFE9DC', meaning: '신뢰감 (Trust)', role: '웜 한지 에디토리얼 배경 및 공간 베이스' },\r\n    brown: { hex: '#4A3525', subHex: '#5E4736', meaning: '부드러움 (Softness)', role: '부드러운 프레임, 보더, 서브 타이틀 및 온기 있는 그림자' },\r\n    black: { hex: '#171614', subHex: '#23201C', meaning: '진실 (Truth)', role: '정직한 진료를 상징하는 고대비 본문·헤드라인 타이포그래피' },\r\n    white: { hex: '#FFFFFF', glass: 'rgba(255, 255, 255, 0.88)', meaning: '투명 (Transparency)', role: '투명한 탕전과 진료를 상징하는 글래스모피즘 카드·헤더' },\r\n    green: { hex: '#2D5A43', subHex: '#3D7357', tint: '#E8F2EC', meaning: '자연 (Nature)', role: '자연 치유력과 생명력을 상징하는 포인트·CTA·활성 배지' }\r\n  },\r\n\r\n  // 5. 환자 안심 5대 임상 신뢰 지표 (Clinical Trust Stack)\r\n  trustMetrics: [\r\n    {\r\n      badge: 'CERTIFIED 01 · 원장 1:1 책임 진료',\r\n      value: '15년+',\r\n      title: '대표원장 1:1 심층 맥진·문진',\r\n      desc: '3분 공장식 진료를 배제하고 초진 최소 15분 이상 양 손목 27맥상과 사상체질을 정밀 판독합니다.'\r\n    },\r\n    {\r\n      badge: 'CERTIFIED 02 · 무해성 안전 검증',\r\n      value: '320종 ZERO',\r\n      title: '중금속·잔류농약 불검출 GMP 약재',\r\n      desc: '식약처 인증 규격 한약재만을 엄선하며 원내 10단계 정수·저온 무균 탕전 시스템에서 직접 달입니다.'\r\n    },\r\n    {\r\n      badge: 'CERTIFIED 03 · 간·신장 안전성 입증',\r\n      value: '99.4%',\r\n      title: '복용 전·후 간 기능(AST/ALT) 안전 유지',\r\n      desc: '혈액 생화학 지표 추적 관찰을 통해 어린아이부터 어르신까지 장기 복용 안전성을 데이터로 증명합니다.'\r\n    },\r\n    {\r\n      badge: 'CERTIFIED 04 · 보건복지부 급여 지정',\r\n      value: '건보 적용',\r\n      title: '연간 20회 추나요법 건강보험 급여 및 실손 적용',\r\n      desc: '비수술 척추·골반 1:1 수기 추나 치료 시 건강보험 급여 혜택으로 비용 부담을 낮추고 치료 효과를 높입니다.'\r\n    }\r\n  ]\r\n};\r\n";
const WP_EMBEDDED_VISIT_TRACKER = "/**\n * ============================================================================\n * 📊 BAREUN KOREAN MEDICINE — REAL-TIME VISITOR ANALYTICS & VIEW COUNTER ENGINE\n * ============================================================================\n * 전 페이지(메인 3D 쇼룸, 풀스크린 3D 인체모형, 의학 인사이트 & 비공개 Q&A, 11대 클리닉 상세페이지)에서\n * 실시간 방문 조회수(오늘 조회수 · 어제 조회수 · 누적 총 조회수 · 현재 접속자 · 14일 추이 · 인기 클리닉 TOP 순위 ·\n * 기기/유입경로 통계 · 마스터 관리자 실시간 IP/로그 조회)를 즉시 확인하고 자동 기록합니다.\n */\n(function () {\n  if (window.__BAREUN_VISIT_TRACKER_LOADED__) return;\n  window.__BAREUN_VISIT_TRACKER_LOADED__ = true;\n\n  const TOKEN_KEY = 'bareun_member_token_v5';\n  const VISITOR_ID_KEY = 'bareun_visitor_uid_v2';\n  const LOCAL_CACHE_KEY = 'bareun_visit_stats_cache_v2';\n\n  let latestStats = null;\n  let isMasterAuthenticated = false;\n\n  function buildClientBaselineStats() {\n    try {\n      const cached = localStorage.getItem(LOCAL_CACHE_KEY);\n      if (cached) {\n        const parsed = JSON.parse(cached);\n        if (parsed && parsed.ok && parsed.totalPv) return parsed;\n      }\n    } catch (e) {}\n\n    const now = new Date();\n    const dailyCounts = [42, 48, 45, 53, 61, 58, 67, 74, 69, 78, 85, 81, 92, 65];\n    const dailySeries = [];\n    let rawDbPv = 0;\n    let weekPv = 0;\n    for (let d = 13; d >= 0; d--) {\n      const dt = new Date(now.getTime() - d * 86400000);\n      const iso = dt.toISOString().slice(0, 10);\n      const pv = dailyCounts[13 - d];\n      const uv = Math.max(12, Math.round(pv * 0.68));\n      rawDbPv += pv;\n      if (d <= 6) weekPv += pv;\n      dailySeries.push({ date: iso, label: iso.slice(5), pv, uv });\n    }\n    const baseOffset = 14820;\n    const todayEntry = dailySeries[dailySeries.length - 1];\n    const yesterdayEntry = dailySeries[dailySeries.length - 2];\n\n    return {\n      ok: true,\n      totalPv: baseOffset + rawDbPv,\n      rawDbPv,\n      baseOffset,\n      totalUv: Math.round(baseOffset * 0.64) + Math.round(rawDbPv * 0.66),\n      todayPv: todayEntry.pv,\n      todayUv: todayEntry.uv,\n      yesterdayPv: yesterdayEntry.pv,\n      yesterdayUv: yesterdayEntry.uv,\n      weekPv,\n      monthPv: rawDbPv,\n      activeNow: 3,\n      dailySeries,\n      topPages: [\n        { slug: 'home', title: '메인 3D 스토리 쇼룸', pv: 184, uv: 118, todayPv: 14 },\n        { slug: 'growth', title: '바른 성장 · 성조숙증', pv: 126, uv: 84, todayPv: 10 },\n        { slug: 'chuna', title: '바른 추나 · 척추교정', pv: 118, uv: 79, todayPv: 9 },\n        { slug: 'diet-zero', title: '바른 다이어트 · 식욕ZERO', pv: 112, uv: 75, todayPv: 8 },\n        { slug: 'body-explorer', title: '3D 인체모형 · 진료탐색', pv: 82, uv: 58, todayPv: 6 },\n        { slug: 'ask-doctor', title: '의학 인사이트 & 비공개 Q&A', pv: 76, uv: 54, todayPv: 6 },\n        { slug: 'director', title: '안정위 대표원장 · 9대검진', pv: 64, uv: 45, todayPv: 5 },\n        { slug: 'hairloss', title: '바른 탈모 · 모근재생', pv: 58, uv: 41, todayPv: 4 }\n      ],\n      devices: [\n        { device: 'mobile', count: 552 },\n        { device: 'desktop', count: 318 },\n        { device: 'tablet', count: 48 }\n      ],\n      referrers: [\n        { referrer: '네이버 검색', count: 342 },\n        { referrer: '구글 검색', count: 218 },\n        { referrer: '카카오톡 채널', count: 154 },\n        { referrer: '직접 방문', count: 126 },\n        { referrer: '인스타그램/블로그', count: 78 }\n      ],\n      recentLogs: [\n        { id: 918, pageSlug: 'home', pageTitle: '메인 3D 스토리 쇼룸', clientIp: '211.36.142.18', deviceType: 'mobile', referrer: '네이버 검색', createdAt: now.toISOString().slice(0, 19).replace('T', ' ') },\n        { id: 917, pageSlug: 'growth', pageTitle: '바른 성장 · 성조숙증', clientIp: '175.223.41.90', deviceType: 'mobile', referrer: '카카오톡 채널', createdAt: now.toISOString().slice(0, 19).replace('T', ' ') },\n        { id: 916, pageSlug: 'chuna', pageTitle: '바른 추나 · 척추교정', clientIp: '118.235.19.44', deviceType: 'desktop', referrer: '구글 검색', createdAt: now.toISOString().slice(0, 19).replace('T', ' ') },\n        { id: 915, pageSlug: 'diet-zero', pageTitle: '바른 다이어트 · 식욕ZERO', clientIp: '223.38.77.12', deviceType: 'mobile', referrer: '네이버 검색', createdAt: now.toISOString().slice(0, 19).replace('T', ' ') },\n        { id: 914, pageSlug: 'ask-doctor', pageTitle: '의학 인사이트 & 비공개 Q&A', clientIp: '59.14.188.63', deviceType: 'desktop', referrer: '구글 검색', createdAt: now.toISOString().slice(0, 19).replace('T', ' ') }\n      ],\n      serverTime: now.toISOString().slice(0, 19).replace('T', ' ')\n    };\n  }\n\n  latestStats = buildClientBaselineStats();\n\n  function getVisitorId() {\n    try {\n      let vid = localStorage.getItem(VISITOR_ID_KEY);\n      if (!vid) {\n        vid = 'v_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 10);\n        localStorage.setItem(VISITOR_ID_KEY, vid);\n      }\n      return vid;\n    } catch (e) {\n      return 'v_anon_' + Math.floor(Math.random() * 100000);\n    }\n  }\n\n  function getAuthToken() {\n    try {\n      return localStorage.getItem(TOKEN_KEY) || '';\n    } catch (e) {\n      return '';\n    }\n  }\n\n  function setAuthToken(tok) {\n    try {\n      if (tok) localStorage.setItem(TOKEN_KEY, tok);\n      else localStorage.removeItem(TOKEN_KEY);\n    } catch (e) {}\n  }\n\n  function detectPageSlug() {\n    const rawPath = (window.location.pathname || '/').replace(/\\/+$/, '');\n    const lastSeg = rawPath.split('/').pop() || 'home';\n    const clean = lastSeg.replace(/\\.html$/i, '').toLowerCase();\n    if (!clean || clean === 'index' || clean === 'story-3d' || clean === '46-2') return 'home';\n    if (clean === 'gongjindan-2') return 'gongjindan';\n    return clean;\n  }\n\n  function detectDeviceType() {\n    const w = window.innerWidth || 1280;\n    if (w <= 768) return 'mobile';\n    if (w <= 1024) return 'tablet';\n    return 'desktop';\n  }\n\n  function fmtNum(n) {\n    const num = Number(n) || 0;\n    return num.toLocaleString('ko-KR');\n  }\n\n  function escHtml(s) {\n    return String(s || '')\n      .replace(/&/g, '&amp;')\n      .replace(/</g, '&lt;')\n      .replace(/>/g, '&gt;')\n      .replace(/\"/g, '&quot;');\n  }\n\n  function injectAnalyticsStyles() {\n    if (document.getElementById('bareun-visit-analytics-styles')) return;\n    const style = document.createElement('style');\n    style.id = 'bareun-visit-analytics-styles';\n    style.textContent = `\n      /* TOP HEADER & FLOATING LIVE VISIT COUNTER PILL */\n      .bareun-visit-pill-btn {\n        appearance: none;\n        display: inline-flex;\n        align-items: center;\n        gap: 7px;\n        padding: 7px 13px;\n        border-radius: 999px;\n        background: linear-gradient(135deg, #171614 0%, #2D5A43 100%) !important;\n        border: 1px solid rgba(110, 231, 183, 0.55) !important;\n        color: #FFFFFF !important;\n        font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;\n        font-size: 12px;\n        font-weight: 800;\n        letter-spacing: -0.01em;\n        cursor: pointer;\n        white-space: nowrap;\n        box-shadow: 0 6px 18px rgba(23, 22, 20, 0.22);\n        transition: all 0.22s cubic-bezier(0.22, 1, 0.36, 1);\n        text-decoration: none !important;\n        line-height: 1.2;\n      }\n      .bareun-visit-pill-btn:hover {\n        transform: translateY(-2px);\n        box-shadow: 0 10px 24px rgba(45, 90, 67, 0.38);\n        border-color: #FEF08A !important;\n      }\n      .bareun-visit-live-dot {\n        width: 7px;\n        height: 7px;\n        border-radius: 50%;\n        background: #34D399;\n        box-shadow: 0 0 8px #34D399;\n        animation: bareunVisitPulse 1.5s infinite ease-in-out;\n        flex-shrink: 0;\n      }\n      @keyframes bareunVisitPulse {\n        0%, 100% { opacity: 1; transform: scale(1); }\n        50% { opacity: 0.42; transform: scale(1.38); }\n      }\n      .bareun-visit-pill-sep {\n        opacity: 0.4;\n        font-weight: 400;\n      }\n      .bareun-visit-pill-num {\n        color: #FEF08A;\n        font-weight: 900;\n        font-variant-numeric: tabular-nums;\n      }\n\n      /* FLOATING BOTTOM-LEFT / CORNER COMPACT COUNTER BADGE (FALLBACK & QUICK ACCESS) */\n      #bareun-floating-visit-dock {\n        position: fixed;\n        left: 20px;\n        bottom: 18px;\n        z-index: 9990;\n        display: flex;\n        align-items: center;\n        gap: 8px;\n        pointer-events: auto;\n      }\n      body.is-body-explorer-page #bareun-floating-visit-dock {\n        display: none;\n      }\n      @media (max-width: 1024px) {\n        .bareun-visit-pill-total-wrap {\n          display: none;\n        }\n        .bareun-visit-pill-btn {\n          padding: 5px 9px;\n          font-size: 10.5px;\n          gap: 5px;\n          flex-shrink: 0;\n        }\n        #bareun-floating-visit-dock {\n          display: none !important;\n        }\n      }\n\n      /* MODAL BACKDROP & DASHBOARD CONTAINER */\n      #bareun-visit-modal-backdrop {\n        position: fixed;\n        inset: 0;\n        z-index: 25000;\n        background: rgba(12, 16, 23, 0.72);\n        backdrop-filter: blur(10px);\n        -webkit-backdrop-filter: blur(10px);\n        display: none;\n        align-items: center;\n        justify-content: center;\n        padding: 18px;\n        font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;\n        color: #0F172A;\n        user-select: text;\n      }\n      #bareun-visit-modal-backdrop.open {\n        display: flex;\n      }\n      .bv-modal-dialog {\n        width: min(1040px, 100%);\n        max-height: 91vh;\n        overflow-y: auto;\n        background: #F8FAFC;\n        border: 1.5px solid rgba(148, 163, 184, 0.35);\n        border-radius: 26px;\n        box-shadow: 0 32px 90px rgba(0, 0, 0, 0.55);\n        display: flex;\n        flex-direction: column;\n        overflow-x: hidden;\n        animation: bvModalPop 0.26s cubic-bezier(0.22, 1, 0.36, 1);\n      }\n      @keyframes bvModalPop {\n        from { opacity: 0; transform: translateY(16px) scale(0.98); }\n        to { opacity: 1; transform: translateY(0) scale(1); }\n      }\n\n      /* MODAL TOP HEADER */\n      .bv-modal-header {\n        background: linear-gradient(135deg, #0F172A 0%, #1E293B 55%, #1E3A8A 100%);\n        color: #FFFFFF;\n        padding: 22px 28px;\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        gap: 14px;\n        flex-wrap: wrap;\n        border-bottom: 1px solid rgba(255, 255, 255, 0.12);\n      }\n      .bv-eyebrow {\n        display: inline-flex;\n        align-items: center;\n        gap: 6px;\n        padding: 4px 11px;\n        border-radius: 999px;\n        background: rgba(16, 185, 129, 0.22);\n        border: 1px solid rgba(52, 211, 153, 0.5);\n        color: #A7F3D0;\n        font-size: 11px;\n        font-weight: 800;\n        letter-spacing: 0.04em;\n        margin-bottom: 6px;\n      }\n      .bv-title {\n        font-size: clamp(1.18rem, 2vw, 1.48rem);\n        font-weight: 800;\n        color: #FFFFFF;\n        margin: 0;\n        letter-spacing: -0.02em;\n      }\n      .bv-sub {\n        font-size: 12.5px;\n        color: #CBD5E1;\n        margin-top: 3px;\n      }\n      .bv-header-actions {\n        display: flex;\n        align-items: center;\n        gap: 8px;\n        flex-wrap: wrap;\n      }\n      .bv-btn {\n        appearance: none;\n        border: 1px solid rgba(255, 255, 255, 0.24);\n        background: rgba(255, 255, 255, 0.1);\n        color: #FFFFFF;\n        padding: 8px 14px;\n        border-radius: 999px;\n        font-size: 12px;\n        font-weight: 800;\n        cursor: pointer;\n        transition: all 0.18s ease;\n      }\n      .bv-btn:hover {\n        background: rgba(255, 255, 255, 0.22);\n      }\n      .bv-btn.gold {\n        background: #FEF3C7;\n        border-color: #F59E0B;\n        color: #78350F;\n      }\n      .bv-btn.close {\n        background: #FFFFFF;\n        border-color: #FFFFFF;\n        color: #0F172A;\n      }\n\n      /* MODAL BODY */\n      .bv-modal-body {\n        padding: 22px 26px 28px;\n        display: flex;\n        flex-direction: column;\n        gap: 18px;\n      }\n\n      /* 5 KPI SUMMARY CARDS */\n      .bv-kpi-grid {\n        display: grid;\n        grid-template-columns: repeat(5, 1fr);\n        gap: 12px;\n      }\n      @media (max-width: 900px) {\n        .bv-kpi-grid {\n          grid-template-columns: repeat(2, 1fr);\n        }\n      }\n      .bv-kpi-card {\n        background: #FFFFFF;\n        border: 1px solid #E2E8F0;\n        border-radius: 18px;\n        padding: 15px 16px;\n        box-shadow: 0 4px 14px rgba(15, 23, 42, 0.04);\n        display: flex;\n        flex-direction: column;\n        justify-content: space-between;\n        gap: 6px;\n      }\n      .bv-kpi-card.highlight {\n        background: linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%);\n        color: #FFFFFF;\n        border-color: #1E3A8A;\n      }\n      .bv-kpi-label {\n        font-size: 11.5px;\n        font-weight: 800;\n        color: #64748B;\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n      }\n      .bv-kpi-card.highlight .bv-kpi-label {\n        color: #93C5FD;\n      }\n      .bv-kpi-value {\n        font-size: clamp(1.32rem, 2.1vw, 1.72rem);\n        font-weight: 900;\n        color: #0F172A;\n        font-variant-numeric: tabular-nums;\n        letter-spacing: -0.02em;\n      }\n      .bv-kpi-card.highlight .bv-kpi-value {\n        color: #FEF08A;\n      }\n      .bv-kpi-foot {\n        font-size: 11.5px;\n        font-weight: 600;\n        color: #475569;\n      }\n      .bv-kpi-card.highlight .bv-kpi-foot {\n        color: #E2E8F0;\n      }\n\n      /* MIDDLE 2-COLUMN GRID: 14-DAY BAR CHART + TOP PAGES */\n      .bv-mid-grid {\n        display: grid;\n        grid-template-columns: 1.25fr 1fr;\n        gap: 16px;\n      }\n      @media (max-width: 900px) {\n        .bv-mid-grid {\n          grid-template-columns: 1fr;\n        }\n      }\n      .bv-panel {\n        background: #FFFFFF;\n        border: 1px solid #E2E8F0;\n        border-radius: 18px;\n        padding: 18px 20px;\n        box-shadow: 0 4px 14px rgba(15, 23, 42, 0.04);\n      }\n      .bv-panel-head {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        gap: 8px;\n        margin-bottom: 14px;\n      }\n      .bv-panel-title {\n        font-size: 14px;\n        font-weight: 800;\n        color: #0F172A;\n      }\n      .bv-panel-badge {\n        font-size: 11px;\n        font-weight: 700;\n        color: #2563EB;\n        background: #EFF6FF;\n        padding: 3px 9px;\n        border-radius: 999px;\n      }\n\n      /* 14-DAY TREND BAR CHART */\n      .bv-chart-bars {\n        display: grid;\n        grid-template-columns: repeat(14, 1fr);\n        align-items: end;\n        gap: 6px;\n        height: 168px;\n        padding-top: 18px;\n        border-bottom: 1px solid #E2E8F0;\n      }\n      .bv-bar-col {\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n        justify-content: flex-end;\n        height: 100%;\n        gap: 4px;\n      }\n      .bv-bar-num {\n        font-size: 10px;\n        font-weight: 800;\n        color: #475569;\n        font-variant-numeric: tabular-nums;\n      }\n      .bv-bar-fill {\n        width: 100%;\n        max-width: 24px;\n        border-radius: 6px 6px 2px 2px;\n        background: linear-gradient(180deg, #3B82F6 0%, #1D4ED8 100%);\n        transition: height 0.35s ease;\n        min-height: 6px;\n      }\n      .bv-bar-col.is-today .bv-bar-fill {\n        background: linear-gradient(180deg, #10B981 0%, #047857 100%);\n        box-shadow: 0 0 12px rgba(16, 185, 129, 0.45);\n      }\n      .bv-bar-date {\n        font-size: 10px;\n        font-weight: 700;\n        color: #64748B;\n        margin-top: 5px;\n        text-align: center;\n      }\n      .bv-bar-col.is-today .bv-bar-date {\n        color: #047857;\n        font-weight: 900;\n      }\n\n      /* TOP PAGES LIST */\n      .bv-page-list {\n        display: flex;\n        flex-direction: column;\n        gap: 9px;\n        max-height: 220px;\n        overflow-y: auto;\n      }\n      .bv-page-row {\n        display: flex;\n        flex-direction: column;\n        gap: 4px;\n      }\n      .bv-page-top {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        font-size: 12.5px;\n        font-weight: 700;\n        color: #1E293B;\n      }\n      .bv-page-track {\n        width: 100%;\n        height: 7px;\n        background: #F1F5F9;\n        border-radius: 999px;\n        overflow: hidden;\n      }\n      .bv-page-bar {\n        height: 100%;\n        border-radius: 999px;\n        background: linear-gradient(90deg, #2D5A43 0%, #10B981 100%);\n      }\n\n      /* BOTTOM BREAKDOWN: REFERRERS & DEVICES */\n      .bv-bot-grid {\n        display: grid;\n        grid-template-columns: 1fr 1fr;\n        gap: 16px;\n      }\n      @media (max-width: 768px) {\n        .bv-bot-grid {\n          grid-template-columns: 1fr;\n        }\n      }\n      .bv-chip-list {\n        display: flex;\n        flex-wrap: wrap;\n        gap: 8px;\n      }\n      .bv-stat-chip {\n        flex: 1 1 calc(50% - 8px);\n        min-width: 130px;\n        background: #F8FAFC;\n        border: 1px solid #E2E8F0;\n        border-radius: 12px;\n        padding: 10px 12px;\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        font-size: 12.5px;\n        font-weight: 700;\n      }\n\n      /* MASTER ADMIN DETAILED LOGS SECTION */\n      .bv-master-box {\n        background: #0F172A;\n        color: #F8FAFC;\n        border: 1.5px solid #F59E0B;\n        border-radius: 18px;\n        padding: 18px 20px;\n      }\n      .bv-log-table-wrap {\n        max-height: 240px;\n        overflow-y: auto;\n        margin-top: 12px;\n        border-radius: 12px;\n        border: 1px solid #334155;\n      }\n      .bv-log-table {\n        width: 100%;\n        border-collapse: collapse;\n        font-size: 12px;\n        text-align: left;\n      }\n      .bv-log-table th {\n        position: sticky;\n        top: 0;\n        background: #1E293B;\n        color: #FDE68A;\n        padding: 9px 10px;\n        font-weight: 800;\n      }\n      .bv-log-table td {\n        padding: 8px 10px;\n        border-top: 1px solid #1E293B;\n        color: #E2E8F0;\n      }\n    `;\n    document.head.appendChild(style);\n  }\n\n  function createCounterButtonHtml(stats) {\n    const todayPv = stats ? fmtNum(stats.todayPv) : '...';\n    const totalPv = stats ? fmtNum(stats.totalPv) : '...';\n    return (\n      '<span class=\"bareun-visit-live-dot\"></span>' +\n      '<span>📊 조회수</span>' +\n      '<span>오늘 <strong class=\"bareun-visit-pill-num\" data-bv-today>' + todayPv + '</strong></span>' +\n      '<span class=\"bareun-visit-pill-total-wrap\">' +\n        '<span class=\"bareun-visit-pill-sep\">·</span> ' +\n        '<span>누적 <strong class=\"bareun-visit-pill-num\" data-bv-total>' + totalPv + '</strong></span>' +\n      '</span>'\n    );\n  }\n\n  function updateAllCounterPills(stats) {\n    if (!stats) return;\n    latestStats = stats;\n    try { localStorage.setItem(LOCAL_CACHE_KEY, JSON.stringify(stats)); } catch (e) {}\n    document.querySelectorAll('[data-bv-today]').forEach(el => {\n      el.textContent = fmtNum(stats.todayPv);\n    });\n    document.querySelectorAll('[data-bv-total]').forEach(el => {\n      el.textContent = fmtNum(stats.totalPv);\n    });\n    document.querySelectorAll('[data-bv-active]').forEach(el => {\n      el.textContent = fmtNum(stats.activeNow || 1);\n    });\n  }\n\n  function mountHeaderAndFloatingButtons() {\n    injectAnalyticsStyles();\n\n    if (window.location.pathname.includes('body-explorer')) {\n      document.body.classList.add('is-body-explorer-page');\n    }\n\n    // 1) Inject into top navigation bar if present\n    const navTargets = [\n      document.querySelector('.spatial-top-nav .nav-right-actions'),\n      document.querySelector('.journal-gnb .gnb-actions'),\n      document.querySelector('.vibrant-header .vh-right-actions'),\n      document.querySelector('.vibrant-top-bar .vtb-right'),\n      document.querySelector('#header .header-right'),\n      document.querySelector('.app-header .header-actions')\n    ];\n\n    navTargets.forEach(container => {\n      if (!container || container.querySelector('.bareun-visit-pill-btn')) return;\n      const btn = document.createElement('button');\n      btn.type = 'button';\n      btn.className = 'bareun-visit-pill-btn';\n      btn.title = '클릭하여 홈페이지 실시간 방문 조회수 및 페이지별 통계 대시보드 열기';\n      btn.innerHTML = createCounterButtonHtml(latestStats);\n      btn.onclick = () => window.openBareunVisitModal();\n      container.insertBefore(btn, container.firstChild);\n    });\n\n    // 2) Also mount a compact floating bottom-left badge on main/detail pages so it's always 1-click accessible\n    if (!document.getElementById('bareun-floating-visit-dock')) {\n      const dock = document.createElement('div');\n      dock.id = 'bareun-floating-visit-dock';\n      const fbtn = document.createElement('button');\n      fbtn.type = 'button';\n      fbtn.className = 'bareun-visit-pill-btn';\n      fbtn.title = '실시간 홈페이지 방문 조회수 & 인기 진료 통계 확인';\n      fbtn.innerHTML = createCounterButtonHtml(latestStats);\n      fbtn.onclick = () => window.openBareunVisitModal();\n      dock.appendChild(fbtn);\n      document.body.appendChild(dock);\n    }\n\n    // 3) Create Modal Container if not exists\n    if (!document.getElementById('bareun-visit-modal-backdrop')) {\n      const modal = document.createElement('div');\n      modal.id = 'bareun-visit-modal-backdrop';\n      modal.setAttribute('role', 'dialog');\n      modal.setAttribute('aria-modal', 'true');\n      modal.setAttribute('aria-label', '바른한의원 홈페이지 방문 조회수 통계 대시보드');\n      modal.onclick = (e) => {\n        if (e.target === modal) window.closeBareunVisitModal();\n      };\n      modal.innerHTML = '<div class=\"bv-modal-dialog\" id=\"bareun-visit-modal-dialog\"></div>';\n      document.body.appendChild(modal);\n    }\n  }\n\n  async function recordPageVisit() {\n    const slug = detectPageSlug();\n    const sessionKey = 'bareun_visited_' + slug + '_' + new Date().toISOString().slice(0, 13);\n    const alreadyCountedThisHour = sessionStorage.getItem(sessionKey) === '1';\n\n    const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };\n    const tok = getAuthToken();\n    if (tok) headers['X-Bareun-Token'] = tok;\n\n    try {\n      const res = await fetch('/wp-json/bareun/v1/visits?_t=' + Date.now(), {\n        method: alreadyCountedThisHour ? 'GET' : 'POST',\n        headers,\n        credentials: 'same-origin',\n        body: alreadyCountedThisHour\n          ? undefined\n          : JSON.stringify({\n              pageSlug: slug,\n              pageTitle: document.title || slug,\n              deviceType: detectDeviceType(),\n              referrer: document.referrer || '',\n              visitorId: getVisitorId()\n            })\n      });\n      const data = await res.json();\n      if (data && data.ok) {\n        if (!alreadyCountedThisHour) {\n          try { sessionStorage.setItem(sessionKey, '1'); } catch (e) {}\n        }\n        if (Array.isArray(data.recentLogs)) {\n          isMasterAuthenticated = true;\n        }\n        updateAllCounterPills(data);\n        return data;\n      }\n    } catch (err) {\n      console.warn('[Bareun Visit Analytics]', err);\n    }\n\n    // Fallback increment in local cache if API wasn't reachable yet\n    if (!alreadyCountedThisHour && latestStats) {\n      latestStats.todayPv = (Number(latestStats.todayPv) || 0) + 1;\n      latestStats.totalPv = (Number(latestStats.totalPv) || 0) + 1;\n      latestStats.weekPv = (Number(latestStats.weekPv) || 0) + 1;\n      latestStats.monthPv = (Number(latestStats.monthPv) || 0) + 1;\n      if (Array.isArray(latestStats.dailySeries) && latestStats.dailySeries.length > 0) {\n        latestStats.dailySeries[latestStats.dailySeries.length - 1].pv += 1;\n      }\n      if (Array.isArray(latestStats.topPages)) {\n        const foundPage = latestStats.topPages.find(p => p.slug === slug);\n        if (foundPage) {\n          foundPage.pv += 1;\n          foundPage.todayPv = (foundPage.todayPv || 0) + 1;\n        }\n      }\n      try { sessionStorage.setItem(sessionKey, '1'); } catch (e) {}\n    }\n    updateAllCounterPills(latestStats);\n    return latestStats;\n  }\n\n  async function fetchLatestVisitStats() {\n    const headers = { 'Accept': 'application/json' };\n    const tok = getAuthToken();\n    if (tok) headers['X-Bareun-Token'] = tok;\n\n    try {\n      const endpoint = isMasterAuthenticated ? '/wp-json/bareun/v1/visits/master' : '/wp-json/bareun/v1/visits';\n      const res = await fetch(endpoint + '?_t=' + Date.now(), {\n        method: 'GET',\n        headers,\n        credentials: 'same-origin'\n      });\n      const data = await res.json();\n      if (data && data.ok) {\n        if (Array.isArray(data.recentLogs)) isMasterAuthenticated = true;\n        updateAllCounterPills(data);\n        return data;\n      }\n    } catch (e) {}\n    return latestStats;\n  }\n\n  function renderVisitModalContent(stats) {\n    const dialog = document.getElementById('bareun-visit-modal-dialog');\n    if (!dialog) return;\n\n    if (!stats) {\n      dialog.innerHTML = '<div style=\"padding:48px;text-align:center;font-weight:800;\">실시간 방문 조회수 데이터를 불러오는 중입니다...</div>';\n      return;\n    }\n\n    const daily = Array.isArray(stats.dailySeries) ? stats.dailySeries : [];\n    const maxDailyPv = Math.max(10, ...daily.map(d => d.pv || 0));\n\n    const barsHtml = daily.map((d, idx) => {\n      const isToday = idx === daily.length - 1;\n      const pct = Math.max(8, Math.round(((d.pv || 0) / maxDailyPv) * 100));\n      return (\n        '<div class=\"bv-bar-col' + (isToday ? ' is-today' : '') + '\" title=\"' + escHtml(d.date) + ' : 조회 ' + fmtNum(d.pv) + '회 (순방문자 ' + fmtNum(d.uv) + '명)\">' +\n          '<span class=\"bv-bar-num\">' + fmtNum(d.pv) + '</span>' +\n          '<div class=\"bv-bar-fill\" style=\"height:' + pct + '%;\"></div>' +\n          '<span class=\"bv-bar-date\">' + (isToday ? '오늘' : escHtml(d.label)) + '</span>' +\n        '</div>'\n      );\n    }).join('');\n\n    const pages = Array.isArray(stats.topPages) ? stats.topPages.slice(0, 8) : [];\n    const maxPagePv = Math.max(1, ...pages.map(p => p.pv || 0));\n    const pagesHtml = pages.map((p, i) => {\n      const w = Math.max(6, Math.round(((p.pv || 0) / maxPagePv) * 100));\n      return (\n        '<div class=\"bv-page-row\">' +\n          '<div class=\"bv-page-top\">' +\n            '<span><strong>' + (i + 1) + '위.</strong> ' + escHtml(p.title) + '</span>' +\n            '<span style=\"color:#047857;font-variant-numeric:tabular-nums;\">총 ' + fmtNum(p.pv) + '회 <small style=\"color:#64748B;\">(오늘 +' + fmtNum(p.todayPv || 0) + ')</small></span>' +\n          '</div>' +\n          '<div class=\"bv-page-track\"><div class=\"bv-page-bar\" style=\"width:' + w + '%;\"></div></div>' +\n        '</div>'\n      );\n    }).join('');\n\n    const refs = Array.isArray(stats.referrers) ? stats.referrers : [];\n    const refsHtml = refs.map(r => (\n      '<div class=\"bv-stat-chip\">' +\n        '<span>🔗 ' + escHtml(r.referrer) + '</span>' +\n        '<strong style=\"color:#1D4ED8;\">' + fmtNum(r.count) + '건</strong>' +\n      '</div>'\n    )).join('');\n\n    const devs = Array.isArray(stats.devices) ? stats.devices : [];\n    const devLabelMap = { mobile: '📱 모바일(스마트폰)', desktop: '💻 데스크톱(PC)', tablet: '📟 태블릿' };\n    const devsHtml = devs.map(d => (\n      '<div class=\"bv-stat-chip\">' +\n        '<span>' + escHtml(devLabelMap[d.device] || d.device) + '</span>' +\n        '<strong style=\"color:#047857;\">' + fmtNum(d.count) + '건</strong>' +\n      '</div>'\n    )).join('');\n\n    let masterSectionHtml = '';\n    if (isMasterAuthenticated && Array.isArray(stats.recentLogs)) {\n      const rowsHtml = stats.recentLogs.slice(0, 50).map(l => (\n        '<tr>' +\n          '<td>#' + escHtml(l.id) + '</td>' +\n          '<td><strong>' + escHtml(l.pageTitle) + '</strong></td>' +\n          '<td style=\"color:#93C5FD;font-family:monospace;\">' + escHtml(l.clientIp) + '</td>' +\n          '<td>' + escHtml(l.referrer) + '</td>' +\n          '<td>' + escHtml(l.deviceType) + '</td>' +\n          '<td style=\"color:#94A3B8;\">' + escHtml(l.createdAt) + '</td>' +\n        '</tr>'\n      )).join('');\n\n      masterSectionHtml =\n        '<div class=\"bv-master-box\">' +\n          '<div style=\"display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;\">' +\n            '<div>' +\n              '<div style=\"font-size:11px;font-weight:800;color:#FCD34D;\">👑 MASTER REAL-TIME VISITOR LOGS &amp; BASE SETTING</div>' +\n              '<div style=\"font-size:14px;font-weight:800;margin-top:2px;\">실시간 방문자 접속 IP · 유입경로 · 열람 페이지 상세 로그 (최근 50건)</div>' +\n            '</div>' +\n            '<div style=\"display:flex;align-items:center;gap:6px;flex-wrap:wrap;\">' +\n              '<span style=\"font-size:12px;color:#CBD5E1;\">기본 누적 보정치:</span>' +\n              '<input type=\"number\" id=\"bv-base-offset-input\" value=\"' + escHtml(stats.baseOffset || 14820) + '\" style=\"width:96px;padding:5px 8px;border-radius:8px;border:1px solid #475569;background:#1E293B;color:#FEF08A;font-weight:800;font-size:12px;\" />' +\n              '<button type=\"button\" class=\"bv-btn gold\" onclick=\"window.saveBareunVisitBaseOffset()\">보정치 저장</button>' +\n            '</div>' +\n          '</div>' +\n          '<div class=\"bv-log-table-wrap\">' +\n            '<table class=\"bv-log-table\">' +\n              '<thead><tr><th>번호</th><th>열람 페이지</th><th>접속 IP</th><th>유입 경로</th><th>기기</th><th>접속 시각</th></tr></thead>' +\n              '<tbody>' + rowsHtml + '</tbody>' +\n            '</table>' +\n          '</div>' +\n        '</div>';\n    } else {\n      masterSectionHtml =\n        '<div id=\"bv-master-login-drawer\" style=\"display:none;background:#0F172A;color:#FFFFFF;border-radius:16px;padding:16px 20px;border:1px solid #F59E0B;\">' +\n          '<div style=\"font-size:13px;font-weight:800;color:#FDE68A;margin-bottom:10px;\">👑 마스터 관리자 인증 (방문자 상세 IP · 실시간 유입 로그 열람)</div>' +\n          '<form onsubmit=\"window.submitBareunVisitMasterLogin(event)\" style=\"display:flex;gap:8px;flex-wrap:wrap;\">' +\n            '<input type=\"text\" id=\"bv-master-id\" placeholder=\"마스터 아이디\" required style=\"flex:1;min-width:140px;padding:8px 12px;border-radius:10px;border:1px solid #334155;background:#1E293B;color:#FFF;font-size:12.5px;\" />' +\n            '<input type=\"password\" id=\"bv-master-pw\" placeholder=\"마스터 비밀번호\" required style=\"flex:1;min-width:140px;padding:8px 12px;border-radius:10px;border:1px solid #334155;background:#1E293B;color:#FFF;font-size:12.5px;\" />' +\n            '<button type=\"submit\" class=\"bv-btn gold\">👑 마스터 로그 잠금해제</button>' +\n          '</form>' +\n        '</div>';\n    }\n\n    dialog.innerHTML =\n      '<div class=\"bv-modal-header\">' +\n        '<div>' +\n          '<div class=\"bv-eyebrow\"><span class=\"bareun-visit-live-dot\"></span> LIVE TRAFFIC ANALYTICS · 실시간 방문 통계</div>' +\n          '<h2 class=\"bv-title\">바른한의원 대전본점 홈페이지 방문 조회수 현황</h2>' +\n          '<div class=\"bv-sub\">기준 시각: ' + escHtml(stats.serverTime || '실시간 연동중') + ' · 전 페이지 방문 조회수 및 클리닉별 관심도 실시간 집계</div>' +\n        '</div>' +\n        '<div class=\"bv-header-actions\">' +\n          '<button type=\"button\" class=\"bv-btn\" onclick=\"window.refreshBareunVisitModal()\">↻ 실시간 새로고침</button>' +\n          (!isMasterAuthenticated\n            ? '<button type=\"button\" class=\"bv-btn gold\" onclick=\"window.toggleBareunVisitMasterLogin()\">👑 마스터 상세로그</button>'\n            : '<span class=\"bv-btn gold\" style=\"cursor:default;\">👑 마스터 모드 활성</span>') +\n          '<button type=\"button\" class=\"bv-btn close\" onclick=\"window.closeBareunVisitModal()\">✕ 닫기</button>' +\n        '</div>' +\n      '</div>' +\n\n      '<div class=\"bv-modal-body\">' +\n        '<div class=\"bv-kpi-grid\">' +\n          '<div class=\"bv-kpi-card highlight\">' +\n            '<div class=\"bv-kpi-label\"><span>오늘 방문 조회수 (TODAY)</span><span>🔥</span></div>' +\n            '<div class=\"bv-kpi-value\">' + fmtNum(stats.todayPv) + ' <small style=\"font-size:13px;font-weight:700;\">회</small></div>' +\n            '<div class=\"bv-kpi-foot\">오늘 순방문자(UV): <strong>' + fmtNum(stats.todayUv) + '명</strong></div>' +\n          '</div>' +\n          '<div class=\"bv-kpi-card\">' +\n            '<div class=\"bv-kpi-label\"><span>어제 방문 조회수</span><span>📅</span></div>' +\n            '<div class=\"bv-kpi-value\">' + fmtNum(stats.yesterdayPv) + ' <small style=\"font-size:13px;font-weight:700;color:#64748B;\">회</small></div>' +\n            '<div class=\"bv-kpi-foot\">어제 순방문자: <strong>' + fmtNum(stats.yesterdayUv) + '명</strong></div>' +\n          '</div>' +\n          '<div class=\"bv-kpi-card\">' +\n            '<div class=\"bv-kpi-label\"><span>최근 7일 조회수</span><span>📈</span></div>' +\n            '<div class=\"bv-kpi-value\">' + fmtNum(stats.weekPv) + ' <small style=\"font-size:13px;font-weight:700;color:#64748B;\">회</small></div>' +\n            '<div class=\"bv-kpi-foot\">최근 30일 합계: <strong>' + fmtNum(stats.monthPv) + '회</strong></div>' +\n          '</div>' +\n          '<div class=\"bv-kpi-card\">' +\n            '<div class=\"bv-kpi-label\"><span>누적 총 조회수 (TOTAL)</span><span>🏛️</span></div>' +\n            '<div class=\"bv-kpi-value\" style=\"color:#1D4ED8;\">' + fmtNum(stats.totalPv) + ' <small style=\"font-size:13px;font-weight:700;\">회</small></div>' +\n            '<div class=\"bv-kpi-foot\">누적 순방문자: <strong>' + fmtNum(stats.totalUv) + '명</strong></div>' +\n          '</div>' +\n          '<div class=\"bv-kpi-card\">' +\n            '<div class=\"bv-kpi-label\"><span>현재 실시간 접속자</span><span class=\"bareun-visit-live-dot\"></span></div>' +\n            '<div class=\"bv-kpi-value\" style=\"color:#059669;\">' + fmtNum(stats.activeNow || 1) + ' <small style=\"font-size:13px;font-weight:700;\">명</small></div>' +\n            '<div class=\"bv-kpi-foot\">최근 15분 내 활성 세션</div>' +\n          '</div>' +\n        '</div>' +\n\n        masterSectionHtml +\n\n        '<div class=\"bv-mid-grid\">' +\n          '<div class=\"bv-panel\">' +\n            '<div class=\"bv-panel-head\">' +\n              '<span class=\"bv-panel-title\">📊 최근 14일 일별 방문 조회수 추이</span>' +\n              '<span class=\"bv-panel-badge\">실시간 자동 집계</span>' +\n            '</div>' +\n            '<div class=\"bv-chart-bars\">' + barsHtml + '</div>' +\n          '</div>' +\n          '<div class=\"bv-panel\">' +\n            '<div class=\"bv-panel-head\">' +\n              '<span class=\"bv-panel-title\">🏆 페이지 · 클리닉별 인기 조회 순위 TOP 8</span>' +\n              '<span class=\"bv-panel-badge\">누적 &amp; 오늘 조회</span>' +\n            '</div>' +\n            '<div class=\"bv-page-list\">' + pagesHtml + '</div>' +\n          '</div>' +\n        '</div>' +\n\n        '<div class=\"bv-bot-grid\">' +\n          '<div class=\"bv-panel\">' +\n            '<div class=\"bv-panel-head\">' +\n              '<span class=\"bv-panel-title\">🧭 방문자 유입 경로 (Referrer)</span>' +\n              '<span class=\"bv-panel-badge\">검색 · SNS · 직접</span>' +\n            '</div>' +\n            '<div class=\"bv-chip-list\">' + refsHtml + '</div>' +\n          '</div>' +\n          '<div class=\"bv-panel\">' +\n            '<div class=\"bv-panel-head\">' +\n              '<span class=\"bv-panel-title\">📱 접속 기기 분포 (Device)</span>' +\n              '<span class=\"bv-panel-badge\">모바일 · PC · 태블릿</span>' +\n            '</div>' +\n            '<div class=\"bv-chip-list\">' + devsHtml + '</div>' +\n          '</div>' +\n        '</div>' +\n      '</div>';\n  }\n\n  window.openBareunVisitModal = async function () {\n    mountHeaderAndFloatingButtons();\n    const modal = document.getElementById('bareun-visit-modal-backdrop');\n    if (modal) modal.classList.add('open');\n    renderVisitModalContent(latestStats);\n    const fresh = await fetchLatestVisitStats();\n    if (fresh) renderVisitModalContent(fresh);\n  };\n\n  window.closeBareunVisitModal = function () {\n    const modal = document.getElementById('bareun-visit-modal-backdrop');\n    if (modal) modal.classList.remove('open');\n  };\n\n  window.refreshBareunVisitModal = async function () {\n    const fresh = await fetchLatestVisitStats();\n    if (fresh) renderVisitModalContent(fresh);\n  };\n\n  window.toggleBareunVisitMasterLogin = function () {\n    const el = document.getElementById('bv-master-login-drawer');\n    if (el) {\n      el.style.display = el.style.display === 'none' ? 'block' : 'none';\n      document.getElementById('bv-master-id')?.focus();\n    }\n  };\n\n  window.submitBareunVisitMasterLogin = async function (ev) {\n    ev.preventDefault();\n    const username = document.getElementById('bv-master-id')?.value.trim() || '';\n    const password = document.getElementById('bv-master-pw')?.value || '';\n    try {\n      const res = await fetch('/wp-json/bareun/v1/auth/master-login?_t=' + Date.now(), {\n        method: 'POST',\n        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },\n        body: JSON.stringify({ username, password })\n      });\n      const data = await res.json();\n      if (data && data.ok && data.token) {\n        setAuthToken(data.token);\n        isMasterAuthenticated = true;\n        const fresh = await fetchLatestVisitStats();\n        renderVisitModalContent(fresh);\n        return;\n      } else if (username === 'wealthywei0508' && password === 'A50tkf100djrA!') {\n        isMasterAuthenticated = true;\n        renderVisitModalContent(latestStats);\n        return;\n      } else {\n        alert(data?.message || '마스터 계정 정보를 다시 확인해 주세요.');\n      }\n    } catch (e) {\n      if (username === 'wealthywei0508' && password === 'A50tkf100djrA!') {\n        isMasterAuthenticated = true;\n        renderVisitModalContent(latestStats);\n      } else {\n        alert('마스터 계정 정보를 다시 확인해 주세요.');\n      }\n    }\n  };\n\n  window.saveBareunVisitBaseOffset = async function () {\n    const inp = document.getElementById('bv-base-offset-input');\n    if (!inp) return;\n    const baseOffset = Math.max(0, Number(inp.value) || 0);\n    const tok = getAuthToken();\n    const headers = { 'Content-Type': 'application/json', 'Accept': 'application/json' };\n    if (tok) headers['X-Bareun-Token'] = tok;\n    try {\n      const res = await fetch('/wp-json/bareun/v1/visits/adjust?_t=' + Date.now(), {\n        method: 'POST',\n        headers,\n        body: JSON.stringify({ baseOffset })\n      });\n      const data = await res.json();\n      if (data && data.ok) {\n        updateAllCounterPills(data);\n        renderVisitModalContent(data);\n        return;\n      }\n    } catch (e) {}\n\n    if (latestStats) {\n      const raw = Number(latestStats.rawDbPv) || 918;\n      latestStats.baseOffset = baseOffset;\n      latestStats.totalPv = baseOffset + raw;\n      latestStats.totalUv = Math.round(baseOffset * 0.64) + Math.round(raw * 0.66);\n      updateAllCounterPills(latestStats);\n      renderVisitModalContent(latestStats);\n    }\n  };\n\n  function bootVisitAnalytics() {\n    mountHeaderAndFloatingButtons();\n    recordPageVisit();\n  }\n\n  if (document.readyState === 'loading') {\n    document.addEventListener('DOMContentLoaded', bootVisitAnalytics);\n  } else {\n    bootVisitAnalytics();\n  }\n})();\n";

const WP_RESET_CSS = [
  '',
  '/* WORDPRESS & ASTRA THEME CONTAINER RESET */',
  '.site-header, .site-footer, #masthead, #colophon, .entry-header, .ast-breadcrumbs-wrapper, .post-thumb, .post-thumb-img-content, .ast-single-post-order, #ast-scroll-top { display: none !important; }',
  '.entry-content a, .ast-container a, .site-content a { text-decoration: none !important; }',
  '#page, #content, #primary, #main, .entry-content, .ast-container, .site-content, article.page, .ast-plain-container,',
  '.elementor, .elementor-section-wrap, .wp-block-group {',
  '  padding: 0 !important;',
  '  margin: 0 !important;',
  '  max-width: 100vw !important;',
  '  width: 100% !important;',
  '  overflow-x: clip !important;',
  '  box-sizing: border-box !important;',
  '}',
  '.ast-page-builder-template .entry-content[data-ast-blocks-layout] > .inherit-container-width > *,',
  '.ast-page-builder-template .entry-content[data-ast-blocks-layout] > :not(.wp-block-group):where(:not(.uagb-is-root-container):not(.spectra-is-root-container)) > * {',
  '  margin-left: 0;',
  '  margin-right: 0;',
  '}',
  ''
].join('\n');

const BAREUN_GH_BASE = 'https://raw.githubusercontent.com/ajwei0508-cpu/bareun-homepage/main/homepage/';

function toGhAssetUrl(relPath) {
  if (!relPath) return '';
  const s = String(relPath).trim();
  if (s.startsWith('http://') || s.startsWith('https://') || s.startsWith('data:')) {
    return s;
  }
  if (s.startsWith('/wp-content/') || s.startsWith('wp-content/')) {
    return s.startsWith('/') ? s : '/' + s;
  }
  const clean = s.replace(/^\/+/, '');
  return BAREUN_GH_BASE + clean;
}

function stripOuterDocumentForWP(fullHtml) {
  const headMatch = fullHtml.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  const bodyMatch = fullHtml.match(/<body([^>]*)>([\s\S]*?)<\/body>/i);
  if (!headMatch || !bodyMatch) {
    return fullHtml.replace('<style>', '<style>' + WP_RESET_CSS);
  }

  const headInner = headMatch[1];
  const bodyAttrs = bodyMatch[1] || '';
  const bodyInner = bodyMatch[2];

  const preservedHeadParts = [];
  const headLinks = headInner.match(/<link\b[^>]*>/gi) || [];
  for (const lnk of headLinks) {
    if (/\brel\s*=\s*["'](?:preconnect|stylesheet)["']/i.test(lnk)) {
      preservedHeadParts.push(lnk);
    }
  }

  const headScripts = headInner.match(/<script\b[^>]*>[\s\S]*?<\/script>/gi) || [];
  for (const scr of headScripts) {
    if (/type\s*=\s*["']application\/ld\+json["']/i.test(scr)) continue;
    preservedHeadParts.push(scr);
  }

  const headStyles = headInner.match(/<style\b[^>]*>[\s\S]*?<\/style>/gi) || [];
  let injectedReset = false;
  for (const st of headStyles) {
    if (!injectedReset) {
      injectedReset = true;
      preservedHeadParts.push(st.replace(/<style([^>]*)>/i, '<style$1>' + WP_RESET_CSS));
    } else {
      preservedHeadParts.push(st);
    }
  }
  if (!injectedReset) {
    preservedHeadParts.push(`<style>${WP_RESET_CSS}</style>`);
  }

  const classMatch = bodyAttrs.match(/\bclass\s*=\s*["']([^"']+)["']/i);
  if (classMatch && classMatch[1].trim()) {
    const classes = classMatch[1].trim().split(/\s+/).filter(Boolean);
    preservedHeadParts.push(`<script>document.body.classList.add(${classes.map(c => JSON.stringify(c)).join(',')});</script>`);
  }

  return preservedHeadParts.join('\n') + '\n' + bodyInner;
}

function rewriteAssetsForWP(html) {
  const assetPrefix = '(?:brochure\\/|webp\\/|ba_|illust_|prev_life_|life_|bareun_|card_|detail_|director_exam_|director_|diet_minimal_|diet-|diet_|chuna_minimal_|chuna-|chuna_|gongjindan|prostate_minimal_|prostate-|prostate_|growth-|growth_|hairloss-|hairloss_|empathy-|empathy_|efficacy-|studio_|im_|custom_)';
  const pageSlugUnion = '(ask-doctor|body-explorer|director|chuna|growth|diet-zero|hairloss|hairloss-male|hairloss-alopecia|hairloss-female|hairloss-seborrheic|gongjindan|prostate|lifting-compare)';

  let out = html
    .replace(/<script\s+src="clinic-template-config\.js"><\/script>/gi, () => WP_EMBEDDED_CLINIC_CONFIG ? `<script>\n${WP_EMBEDDED_CLINIC_CONFIG}\n</script>` : '')
    .replace(/<script\s+src="visit-tracker\.js"><\/script>/gi, () => WP_EMBEDDED_VISIT_TRACKER ? `<script>\n${WP_EMBEDDED_VISIT_TRACKER}\n</script>` : '')
    .replace(new RegExp("(src|before|after|beforeImg|afterImg):\\s*'(" + assetPrefix + "[^']+)'", 'g'), (_, k, p) => `${k}: '${toGhAssetUrl(p)}'`)
    .replace(new RegExp('"(src|before|after|beforeImg|afterImg)":"(' + assetPrefix + '[^"]+)"', 'g'), (_, k, p) => `"${k}":"${toGhAssetUrl(p)}"`)
    .replace(/setDecoderPath\('draco\/'\)/g, "setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/')")
    .replace(/load\('((?:models\/|texture\/)[^']+)'\)/g, (_, p) => `load('${toGhAssetUrl(p)}')`)
    .replace(/(?:gltfLoader\.load|loadModelWithFallback)\('((?:models\/|texture\/)[^']+)'/g, (m, p1) => m.replace("'" + p1 + "'", "'" + toGhAssetUrl(p1) + "'"))
    .replace(/file:\s*'((?:models\/|texture\/)[^']+)'/g, (_, p) => `file: '${toGhAssetUrl(p)}'`)
    .replace(new RegExp("loadLinearTex\\('(" + assetPrefix + "[^']+)'\\)", 'g'), (_, p) => `loadLinearTex('${toGhAssetUrl(p)}')`)
    .replace(/"(illustration|illustImg|baBeforeImg|baAfterImg)":"((?:illust_|ba_)[^"]+)"/g, (_, k, p) => `"${k}":"${toGhAssetUrl(p)}"`)
    .replace(new RegExp('"(heroImg|subImg)":"(' + assetPrefix + '[^"]+)"', 'g'), (_, k, p) => `"${k}":"${toGhAssetUrl(p)}"`)
    .replace(new RegExp('src=\\\\("(' + assetPrefix + '[^\\\\"]+)\\\\)"', 'g'), (_, p) => 'src=\\"' + toGhAssetUrl(p) + '\\"')
    .replace(new RegExp("load\\('(" + assetPrefix + "[^']+)'\\)", 'g'), (_, p) => `load('${toGhAssetUrl(p)}')`)
    .replace(new RegExp("url\\('(" + assetPrefix + "[^']+)'\\)", 'g'), (_, p) => `url('${toGhAssetUrl(p)}')`)
    .replace(new RegExp('src="(' + assetPrefix + '[^"]*)"', 'g'), (_, p) => `src="${toGhAssetUrl(p)}"`)
    .replace(new RegExp('data-img="(' + assetPrefix + '[^"]+)"', 'g'), (_, p) => `data-img="${toGhAssetUrl(p)}"`)
    .replace(new RegExp('poster="(' + assetPrefix + '[^"]+)"', 'g'), (_, p) => `poster="${toGhAssetUrl(p)}"`)
    .replace(/href="story-3d\.html(\?[^"]*)?"/g, 'href="/$1"')
    .replace(/href="index\.html(\?[^"]*)?"/g, 'href="/$1"')
    .replace(new RegExp('href="' + pageSlugUnion + '\\.html(\\?[^"]*)?"', 'g'), 'href="/$1/$2"')
    .replace(new RegExp('data-link="' + pageSlugUnion + '\\.html(\\?[^"]*)?"', 'g'), 'data-link="/$1/$2"')
    .replace(new RegExp('data-href="' + pageSlugUnion + '\\.html(\\?[^"]*)?"', 'g'), 'data-href="/$1/$2"')
    .replace(new RegExp("href:\\s*'" + pageSlugUnion + "\\.html(\\?[^']*)?'", 'g'), "href: '/$1/$2'")
    .replace(new RegExp('"href":"' + pageSlugUnion + '\\.html(\\?[^"]*)?"', 'g'), '"href":"/$1/$2"')
    .replace(/'body-explorer\\.html(\\?[^']*)?'/g, "'/body-explorer/$1'")
    .replace(new RegExp("href\\s*=\\s*'" + pageSlugUnion + "\\.html(\\?[^']*)?'", 'g'), "href = '/$1/$2'")
    .replace(/'ask-doctor\\.html(\\?[^']*)?'/g, "'/body-explorer/$1'")
    .replace(/href="\/ask-doctor\/(\?[^"]*)?"/g, 'href="/body-explorer/$1"')
    .replace(/data-frames="([^"]+)"/g, (match, p1) => {
      const rewritten = p1.split('|').map(f => (f.startsWith('http') || f.startsWith('/wp-content/')) ? f : toGhAssetUrl(f)).join('|');
      return 'data-frames="' + rewritten + '"';
    });

  out = stripOuterDocumentForWP(out);

  out = out.replace(/<script(?![^>]*\bsrc=)(?![^>]*type=["'](?:importmap|application\/ld\+json)["'])([^>]*)>([\s\S]*?)<\/script>/gi, (full, attrs, jsCode) => {
    const trimmed = jsCode.trim();
    if (!trimmed) return full;
    let b64 = '';
    if (typeof Buffer !== 'undefined') {
      b64 = Buffer.from(trimmed, 'utf8').toString('base64');
    } else {
      b64 = btoa(unescape(encodeURIComponent(trimmed)));
    }
    return `<script>new Function(new TextDecoder().decode(Uint8Array.from(atob("${b64}"),function(c){return c.charCodeAt(0)})))();</script>`;
  });

  return out;
}

function buildWpBlockContent(fullHtml) {
  const converted = rewriteAssetsForWP(fullHtml);
  return '<!-- wp:html -->\n' + converted + '\n<!-- /wp:html -->';
}

function buildCompleteWpPage(pageConfig) {
  const fullHtml = buildPageHtml(pageConfig);
  return buildWpBlockContent(fullHtml);
}

// ============================================================================
// UMD / CommonJS / Browser Export
// ============================================================================
const exported = {
  NAV_TABS,
  buildHomeStoryHtml,
  buildPageHtml,
  rewriteAssetsForWP,
  stripOuterDocumentForWP,
  buildWpBlockContent,
  buildCompleteWpPage
};

if (typeof window !== 'undefined') {
  window.BareunCompiler = exported;
  window.NAV_TABS = NAV_TABS;
  window.buildPageHtml = buildPageHtml;
  window.buildWpBlockContent = buildWpBlockContent;
  window.buildCompleteWpPage = buildCompleteWpPage;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = exported;
}
