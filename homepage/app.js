/**
 * BAREUN CLINIC (바른한의원 대전본점)
 * World-Class High-End Creative Website Architecture
 */

const GET_DIET_ZERO_URL = () => {
  return (window.location.protocol === 'file:' || window.location.pathname.endsWith('.html'))
    ? 'diet-zero.html'
    : '/diet-zero/';
};

const GET_GONGJINDAN_URL = () => {
  return (window.location.protocol === 'file:' || window.location.pathname.endsWith('.html'))
    ? 'gongjindan.html'
    : '/gongjindan-2/';
};

const GET_GROWTH_URL = () => {
  return (window.location.protocol === 'file:' || window.location.pathname.endsWith('.html'))
    ? 'growth.html'
    : '/growth/';
};


const CLINIC_PROGRAMS = [
  {
    id: "00",
    slug: "appetite-zero",
    title: "식욕 ZERO",
    badge: "비대면 처방 BEST 1위",
    subtitle: "비대면 처방 BEST 1위 · 1:1 맞춤 전화 처방 & 전국 당일 발송",
    client: "비대면 처방 BEST 1위 · 시그니처 다이어트 한약",
    role: "식욕 억제 · 체지방 분해 · 신진대사 활성화",
    year: "TELEMEDICINE",
    awards: "🏆 비대면 처방 베스트 1위 · 누적 처방 50,000건 돌파 · 100% 개별 체질 맞춤 탕전",
    description: "굶지 않고 자연스럽게 식탐을 억제하며 체질별 기초 대사율을 끌어올리는 바른한의원만의 시그니처 다이어트 탕약. 내원 없이 전화 상담 후 집 앞까지 안전하게 직배송됩니다.",
    image: "http://bareunhaniwon.com/wp-content/uploads/2026/09/식욕제로.jpg",
    details: [
      "✓ 1:1 비대면 전화 진료를 통한 맞춤형 체질 감별 및 정밀 처방",
      "✓ 위장 장애 및 심장 두근거림 최소화 원내 특수 탕전 공법",
      "✓ 식욕 중추 안정 및 자연스러운 포만감 형성",
      "✓ 전국 어디서나 간편하게 네이버 폼 신청 후 안심 택배 수령"
    ],
    primaryLink: "diet-zero.html#checkout-zone",
    primaryText: "💳 온라인 결제 & 비대면 처방 신청",
    secondaryLink: "https://pf.kakao.com/_ykxcLK",
    secondaryText: "💬 카카오톡 1:1 상담 문의"
  },
  {
    id: "01",
    slug: "gongjindan",
    title: "황제 공진단",
    badge: "특허 제10-1744704호",
    subtitle: "식약처 정품 사향 100% 인증 · 원내 직접 제환",
    client: "원기 회복 & 면역력 강화 명약",
    role: "황실 전통 비방 · 최고급 원방 사향 공진단",
    year: "MASTERPIECE",
    awards: "황제를 위한 특허받은 공진단 · 식약처 CITES 정품 사향 100% · 99.9% 순금박 수제 제환",
    description: "장인의 손끝에서 피어나는 천년의 건강. 엄격한 CITES 정품 사향 인증을 거친 최고급 약재만을 선별하여 대전본점 원장이 직접 한 알 한 알 정성으로 빚어내는 궁극의 명작입니다.",
    image: "http://bareunhaniwon.com/wp-content/uploads/2026/09/image.png_20260921230913.jpeg",
    details: [
      "✓ 식약처 CITES 공인 정품 천연 사향 시험성적서 및 품질 보증서 동봉",
      "✓ 최상급 러시아산 원용 분골(녹용 최고 부위) 황금 비율 배합",
      "✓ 원내 조제실에서 원장이 직접 전통 수제 제환",
      "✓ 만성 피로 회복, 수험생 집중력, VIP 효도 선물 추천"
    ],
    primaryLink: "https://pf.kakao.com/_ykxcLK",
    primaryText: "💬 카카오톡 공진단 사전 예약 문의",
    secondaryLink: "https://naver.me/5U1ELn8L",
    secondaryText: "📍 네이버 플레이스 정보 보기"
  },
  {
    id: "02",
    slug: "dream-beauty",
    title: "드림뷰티 뱃살 다이어트",
    subtitle: "고민 부위 복부 집중 라인 조각 프로그램",
    client: "복부 집중 슬리밍 솔루션",
    role: "심부 내장지방 연소 · 피하지방 분해약침 · 탄력 케어",
    year: "BODY SCULPT",
    awards: "복부 둘레 집중 감소 임상 프로그램 · 피하지방 분해 & 피부 탄력 리프팅 동시 케어",
    description: "쉽게 빠지지 않는 뱃살과 옆구리 러브핸들을 위한 집중 타겟팅 프로그램. 1:1 체성분 분석을 기반으로 체지방 분해 한약과 복부 온열 심부 테라피를 결합하여 매끄러운 바디 라인을 완성합니다.",
    details: [
      "✓ 내장지방 및 셀룰라이트 집중 타겟 분해 프로그램",
      "✓ 심부 온열 요법으로 복부 순환 및 독소 배출 활성화",
      "✓ 늘어진 피부 탄력을 복원하는 한방 슬리밍 리프팅 케어",
      "✓ 요요 없는 유지 관리 가이드 및 1:1 밀착 코칭"
    ],
    primaryLink: "https://pf.kakao.com/_ykxcLK",
    primaryText: "💬 복부 슬리밍 카카오톡 상담 예약",
    secondaryLink: "https://naver.me/5U1ELn8L",
    secondaryText: "📍 네이버 예약 바로가기"
  },
  {
    id: "03",
    slug: "doctor-profile",
    title: "대표원장 소개 & 진료철학",
    subtitle: "바른 마음, 정직한 처방으로 치유합니다",
    client: "바른한의원 대전본점 대표원장",
    role: "한의학 박사 · 1:1 평생 주치의 케어",
    year: "CHIEF DIRECTOR",
    awards: "대한한의학회 정회원 · 비만체형학회 정회원 · 1:1 책임 전담 진료제 준수",
    description: "환자의 몸을 바르게 세우는 정직한 치료. 과잉 진료 없는 정확한 원인 진단과 100% 정품 인증 약재만을 고집하며, 환자 한 분 한 분과의 깊은 소통을 통해 평생의 건강 파트너가 되어 드립니다.",
    image: "doctor.png",
    details: [
      "✓ 대전본점 대표원장 직접 책임 진료",
      "✓ 한의학 박사 및 비만 체형 교정 전문 임상 연구",
      "✓ 탕전 전 과정 투명 공개 및 안심 한약재 사용 원칙",
      "✓ 대전 둔산동 중심에서 환자 한 분만을 위한 평생 주치의 동행"
    ],
    primaryLink: "https://naver.me/5U1ELn8L",
    primaryText: "📍 네이버 플레이스 1:1 진료 예약",
    secondaryLink: "https://pf.kakao.com/_ykxcLK",
    secondaryText: "💬 카카오톡 실시간 상담 문의"
  },
  {
    id: "04",
    slug: "pediatric-growth",
    title: "키성장 · 성조숙증 클리닉",
    badge: "무방사선 초음파 성장판 검사",
    subtitle: "15년 임상경력 대표원장 친아들 직접 처방 입증 · 초음파 & 8대 전신 기능 검진",
    client: "소아청소년 성장 & 성조숙증 안심 클리닉",
    role: "무방사선 초음파 진단 · 8대 전신 기능검진(체열·스트레스·자율신경·비염·체질·면역·혈류·장내GAS) · 맞춤 성장 한약",
    year: "GROWTH CLINIC",
    awards: "🌿 15년 임상경력 대표원장 직접 진료 · 초음파 4대 지표 · 8대 전신 정밀 기능 검진 체계",
    description: "15년 임상경력으로 대표원장님이 직접 친아들에게 처방하며 입증한 100% 천연 안심 성장 한약까지. 무방사선 정밀 초음파와 8대 전신 기능 검진(체열·스트레스·자율신경·비염·체질·면역·혈류·장내가스)으로 우리 아이의 숨겨진 잠재 키를 찾아드립니다.",
    image: "growth-happy-family.jpg",
    details: [
      "✓ 15년 임상경력 대표원장이 자신의 친아들에게 직접 처방하며 입증한 정직한 치료",
      "✓ [네이버 블로그 공개] 대표원장 친아들 3개년 키성장 치료 수기 및 사진 전문 (https://blog.naver.com/wei0508/223437892490)",
      "✓ 방사선 피폭 걱정 없는 무방사선 정밀 초음파 4대 지표 (골연령·백분위·뼈길이·예측키) 판독",
      "✓ 성장판 너머 8대 전신 정밀 기능 검진 (체열·스트레스·자율신경·비염·사상체질·면역력·혈류·장내GAS)",
      "✓ 성조숙증 성장판 조기 폐쇄 예방 및 오장육부 면역 균형 1:1 맞춤 성장 탕전"
    ],
    primaryLink: "growth.html",
    primaryText: "🌱 키성장 · 성조숙증 클리닉 보기",
    secondaryLink: "https://blog.naver.com/wei0508/223437892490",
    secondaryText: "📝 원장님 아들 성장 후기 블로그 보기 ↗"
  }
];

class BareunClinicApp {
  constructor() {
    this.projects = CLINIC_PROGRAMS;
    this.currentIndex = 0;
    this.audioEnabled = false;
    this.audioCtx = null;
    
    // DOM Cache
    this.cursor = document.getElementById('custom-cursor');
    this.cursorFollower = document.getElementById('cursor-follower');
    this.track = document.getElementById('carousel-track');
    this.container = document.getElementById('carousel-container');
    
    // Meta HUD elements
    this.activeIndex = document.getElementById('active-index');
    this.activeTitle = document.getElementById('active-title');
    this.activeClient = document.getElementById('active-client');
    this.activeRole = document.getElementById('active-role');
    this.activeYear = document.getElementById('active-year');
    this.activeDesc = document.getElementById('active-desc');
    this.activeAwards = document.getElementById('active-awards');
    this.progressFill = document.getElementById('progress-fill');
    
    // Footer counters
    this.currentCounter = document.getElementById('current-counter');
    this.totalCounter = document.getElementById('total-counter');

    // Controls
    this.prevBtn = document.getElementById('prev-btn');
    this.nextBtn = document.getElementById('next-btn');
    this.audioBtn = document.getElementById('audio-toggle');
    this.audioStateText = document.getElementById('audio-state');
    this.menuBtn = document.getElementById('menu-toggle');
    this.menuDrawer = document.getElementById('menu-drawer');
    this.drawerClose = document.getElementById('drawer-close');
    this.drawerBackdrop = document.getElementById('drawer-backdrop');
    
    // Modal
    this.projectModal = document.getElementById('project-modal');
    this.modalContent = document.getElementById('modal-content');
    this.modalClose = document.getElementById('modal-close');
    this.modalBackdrop = document.getElementById('modal-backdrop');

    // Intro Elements
    this.introSplash = document.getElementById('intro-splash');
    this.introVideo = document.getElementById('intro-video');
    this.introEnterBtn = document.getElementById('intro-enter-btn');
    this.replayIntroBtn = document.getElementById('replay-intro-btn');

    // Gesture & Drag State
    this.wasDragging = false;

    // Cursor tracking state
    this.mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.follower = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    this.init();
  }

  init() {
    this.renderCards();
    this.initCursor();
    this.initClock();
    this.initAudio();
    this.initIntro();
    this.initTouchAndDrag();
    this.initEvents();
    this.updateProjectView(0, false);
  }

  /* --------------------------------------------------------------------------
     CINEMATIC INTRO VIDEO SPLASH ("아트" 예술적 인터랙션 & 영상 종료 시 타이포그래피 등장)
     -------------------------------------------------------------------------- */
  initIntro() {
    if (!this.introSplash) return;

    let hasEnded = false;

    const showEndedState = () => {
      if (hasEnded) return;
      hasEnded = true;
      this.introSplash.classList.add('video-ended');
    };

    const dismissIntro = () => {
      if (this.introSplash.classList.contains('leaving') || this.introSplash.style.display === 'none') return;
      this.playEntryChime();
      this.introSplash.classList.add('leaving');
      setTimeout(() => {
        this.introSplash.style.display = 'none';
        if (this.introVideo) {
          try { this.introVideo.pause(); } catch(e) {}
        }
      }, 950);
    };

    // 비디오 이벤트 리스너 등록
    if (this.introVideo) {
      // 영상 끝부분 도달 시 조기 fallback
      this.introVideo.addEventListener('timeupdate', () => {
        if (!hasEnded && this.introVideo.duration) {
          if (this.introVideo.currentTime >= this.introVideo.duration - 0.3) {
            showEndedState();
          }
        }
      });

      // 영상 재생이 끝났을 때 드라마틱하게 글과 버튼 애니메이션 등장
      this.introVideo.addEventListener('ended', () => {
        showEndedState();
      });

      // 브라우저 정책으로 자동 재생 차단 시 즉시 텍스트 노출하여 사용자 블로킹 방지
      this.introVideo.play().catch(() => {
        showEndedState();
      });
    } else {
      showEndedState();
    }

    // 인트로 스플래시 화면 클릭/터치 시 인터랙션
    this.introSplash.addEventListener('click', () => {
      if (!hasEnded) {
        // 영상 재생 중 클릭 시: 영상을 끝내고 예술적 타이포그래피를 즉시 펼침
        if (this.introVideo) {
          try {
            this.introVideo.currentTime = this.introVideo.duration || 10;
          } catch(e) {}
        }
        showEndedState();
      } else {
        // 영상 종료 후 클릭 시: 힐링 차임과 함께 메인 공간으로 입장
        dismissIntro();
      }
    });

    if (this.introEnterBtn) {
      this.introEnterBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dismissIntro();
      });
    }

    // 인트로 다시보기 (Replay)
    if (this.replayIntroBtn) {
      this.replayIntroBtn.addEventListener('click', () => {
        this.playClick();
        hasEnded = false;
        this.introSplash.classList.remove('video-ended');
        this.introSplash.classList.remove('leaving');
        this.introSplash.style.display = 'flex';
        if (this.introVideo) {
          this.introVideo.currentTime = 0;
          this.introVideo.play().catch(() => {
            showEndedState();
          });
        }
      });
    }
  }

  /* --------------------------------------------------------------------------
     AUDIO SYNTHESIS (Web Audio API)
     -------------------------------------------------------------------------- */
  initAudio() {
    this.audioBtn.addEventListener('click', () => {
      this.audioEnabled = !this.audioEnabled;
      if (this.audioEnabled) {
        if (!this.audioCtx) {
          this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (this.audioCtx.state === 'suspended') {
          this.audioCtx.resume();
        }
        document.body.classList.add('audio-playing');
        this.audioStateText.textContent = 'On';
        this.playTone(880, 0.05, 'sine');
      } else {
        document.body.classList.remove('audio-playing');
        this.audioStateText.textContent = 'Off';
      }
    });
  }

  playTone(freq, duration = 0.04, type = 'sine') {
    if (!this.audioEnabled || !this.audioCtx) return;
    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch (e) {
      console.warn('Audio play suppressed', e);
    }
  }

  playClick() {
    this.playTone(1100, 0.03, 'sine');
  }

  playSlide() {
    this.playTone(190, 0.08, 'triangle');
  }

  playEntryChime() {
    try {
      if (!this.audioCtx) {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      // 528Hz (치유의 솔페지오 주파수) + 792Hz 따뜻한 화음
      [528, 792, 1056].forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sine';
        const start = this.audioCtx.currentTime + (idx * 0.07);
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.05 / (idx + 1), start);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 1.2);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(start);
        osc.stop(start + 1.2);
      });
    } catch (e) {}
  }

  /* --------------------------------------------------------------------------
     CURSOR (Difference lerp trailing)
     -------------------------------------------------------------------------- */
  initCursor() {
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.cursor.style.transform = `translate(${this.mouse.x}px, ${this.mouse.y}px)`;
    });

    const loop = () => {
      this.follower.x += (this.mouse.x - this.follower.x) * 0.18;
      this.follower.y += (this.mouse.y - this.follower.y) * 0.18;
      this.cursorFollower.style.transform = `translate(${this.follower.x}px, ${this.follower.y}px)`;
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);

    const attachHover = () => {
      document.querySelectorAll('a, button, .project-card, [data-hover="magnetic"]').forEach(el => {
        el.addEventListener('mouseenter', () => {
          document.body.classList.add('cursor-hover');
          this.playClick();
        });
        el.addEventListener('mouseleave', () => {
          document.body.classList.remove('cursor-hover');
        });
      });
    };
    attachHover();
    this.attachHover = attachHover;
  }

  /* --------------------------------------------------------------------------
     REAL-TIME CLOCK (South Korea KST GMT+9)
     -------------------------------------------------------------------------- */
  initClock() {
    const timeEl = document.getElementById('current-time');
    const updateTime = () => {
      const now = new Date();
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const kst = new Date(utc + (3600000 * 9));
      const hours = String(kst.getHours()).padStart(2, '0');
      const mins = String(kst.getMinutes()).padStart(2, '0');
      timeEl.textContent = `${hours}:${mins}`;
    };
    updateTime();
    setInterval(updateTime, 1000);
  }

  /* --------------------------------------------------------------------------
     RENDER CAROUSEL CARDS
     -------------------------------------------------------------------------- */
  renderCards() {
    this.track.innerHTML = '';
    this.totalCounter.textContent = String(this.projects.length).padStart(2, '0');

    this.projects.forEach((item, index) => {
      const card = document.createElement('article');
      const isDoctor = item.slug === 'doctor-profile';
      const isGongjindan = item.slug === 'gongjindan';

      let cardClass = 'project-card';
      if (isDoctor) cardClass += ' doctor-card';
      if (isGongjindan) cardClass += ' gongjindan-card';
      if (item.slug === 'appetite-zero') cardClass += ' zero-card';
      if (index === 0) cardClass += ' active';

      card.className = cardClass;
      card.dataset.index = index;

      let wrapClass = 'card-image-wrap';
      if (isDoctor) wrapClass += ' doctor-wrap';
      if (isGongjindan) wrapClass += ' gongjindan-wrap';
      if (item.slug === 'appetite-zero') wrapClass += ' zero-wrap';

      let imgClass = 'card-img';
      if (isDoctor) imgClass += ' doctor-img';
      if (isGongjindan) imgClass += ' gongjindan-img';
      if (item.slug === 'appetite-zero') imgClass += ' zero-img';

      const badgeHtml = item.badge ? `
        <div class="card-badge-top">
          <span class="card-badge-pill">
            <span class="badge-trophy">🏆</span>
            <span class="badge-text">${item.badge}</span>
          </span>
        </div>
      ` : '';

      const sealHtml = isGongjindan ? `
        <div class="gongjin-seal-stamp" title="식약처 CITES 공인 정품 사향 眞品 인증">
          <div class="seal-box">
            <span class="seal-char">眞</span>
            <span class="seal-char">品</span>
          </div>
          <span class="seal-ribbon">特許 10-1744704</span>
        </div>
      ` : '';

      const hoverCueHtml = item.slug === 'appetite-zero' ? `
        <div class="card-hover-cue" aria-label="식욕 폭주 클릭">
          <span class="cue-sparkle">✦</span>
          <span class="cue-text">식욕 폭주 클릭</span>
          <span class="cue-arrow">➔</span>
        </div>
      ` : (item.slug === 'gongjindan' ? `
        <div class="card-hover-cue gongjin-cue" aria-label="황제공진단 상세">
          <span class="cue-sparkle">✦</span>
          <span class="cue-text">황제공진단 상세</span>
          <span class="cue-arrow">➔</span>
        </div>
      ` : (item.slug === 'pediatric-growth' ? `
        <div class="card-hover-cue growth-cue" aria-label="키성장 클리닉 상세" style="background: rgba(28, 61, 43, 0.92); border-color: rgba(196, 151, 85, 0.6);">
          <span class="cue-sparkle">🌱</span>
          <span class="cue-text">키성장 클리닉 상세</span>
          <span class="cue-arrow">➔</span>
        </div>
      ` : ''));

      card.innerHTML = `
        <div class="${wrapClass}">
          <img class="${imgClass}" src="${item.image}" alt="${item.title}" loading="lazy" />
          ${sealHtml}
          <div class="card-overlay">
            ${badgeHtml}
            <div class="card-meta-bottom">
              <h3 class="card-title">${item.title}</h3>
              <p class="card-subtitle">${item.subtitle || item.role}</p>
            </div>
          </div>
          ${hoverCueHtml}
        </div>
      `;

      // Click ANY card to immediately animate and open detail page (ignored if user was swiping)
      card.addEventListener('click', (e) => {
        if (this.wasDragging) return;
        if (item.slug === 'appetite-zero') {
          e.preventDefault();
          e.stopPropagation();
          this.playClick();
          window.location.href = GET_DIET_ZERO_URL();
          return;
        } else if (item.slug === 'gongjindan') {
          e.preventDefault();
          e.stopPropagation();
          this.playClick();
          this.triggerGongjindanCraftAnimation(() => {
            window.location.href = GET_GONGJINDAN_URL();
          });
          return;
        } else if (item.slug === 'pediatric-growth') {
          e.preventDefault();
          e.stopPropagation();
          this.playClick();
          window.location.href = GET_GROWTH_URL();
          return;
        }
        this.updateProjectView(index);
        this.openProjectModal(item);
      });

      this.track.appendChild(card);
    });
  }

  /* --------------------------------------------------------------------------
     UPDATE ACTIVE PROJECT
     -------------------------------------------------------------------------- */
  updateProjectView(index, animate = true) {
    if (index < 0) index = 0;
    if (index >= this.projects.length) index = this.projects.length - 1;

    this.currentIndex = index;
    const project = this.projects[index];

    if (animate) {
      this.playSlide();
      this.activeTitle.style.opacity = '0';
      this.activeTitle.style.transform = 'translateY(8px)';
      setTimeout(() => {
        this.activeTitle.textContent = project.title;
        this.activeTitle.style.opacity = '1';
        this.activeTitle.style.transform = 'translateY(0)';
      }, 150);
    } else {
      this.activeTitle.textContent = project.title;
    }

    this.activeIndex.textContent = `/${project.id}`;
    this.activeClient.textContent = project.client;
    this.activeRole.textContent = project.role;
    this.activeYear.textContent = project.year;
    this.activeDesc.textContent = project.description;
    this.activeAwards.textContent = project.awards;

    this.currentCounter.textContent = String(index + 1).padStart(2, '0');
    const progressPct = ((index + 1) / this.projects.length) * 100;
    this.progressFill.style.width = `${progressPct}%`;

    // Highlight active card
    const cards = this.track.querySelectorAll('.project-card');
    cards.forEach((c, idx) => {
      c.classList.toggle('active', idx === index);
    });

    const getTrackGap = () => {
      const gap = parseFloat(window.getComputedStyle(this.track).gap);
      return isNaN(gap) ? (window.innerWidth <= 768 ? 16 : 28) : gap;
    };

    // Move track to center the card dynamically
    const firstCard = this.track.querySelector('.project-card');
    const cardWidth = firstCard ? (firstCard.offsetWidth + getTrackGap()) : (window.innerWidth <= 768 ? 336 : 448);
    const targetX = -(index * cardWidth);
    this.track.style.transform = `translateX(${targetX}px)`;
  }

  /* --------------------------------------------------------------------------
     TOUCH & POINTER DRAG INTERACTION (모바일 터치 스와이프 & 데스크톱 드래그)
     -------------------------------------------------------------------------- */
  initTouchAndDrag() {
    let startX = 0;
    let startY = 0;
    let isPointerDown = false;
    let isHorizontalSwipe = false;
    let dragDistance = 0;
    let initialTrackX = 0;

    const getTrackGap = () => {
      const gap = parseFloat(window.getComputedStyle(this.track).gap);
      return isNaN(gap) ? (window.innerWidth <= 768 ? 16 : 28) : gap;
    };

    const getCardWidth = () => {
      const card = this.track.querySelector('.project-card');
      return card ? (card.offsetWidth + getTrackGap()) : (window.innerWidth <= 768 ? 336 : 448);
    };

    const getBaseX = () => -(this.currentIndex * getCardWidth());

    const onStart = (clientX, clientY) => {
      isPointerDown = true;
      startX = clientX;
      startY = clientY;
      dragDistance = 0;
      isHorizontalSwipe = false;
      this.wasDragging = false;
      initialTrackX = getBaseX();
    };

    const onMove = (clientX, clientY, e) => {
      if (!isPointerDown) return;
      const diffX = clientX - startX;
      const diffY = clientY - startY;

      // Determine swipe direction after 8px threshold
      if (!isHorizontalSwipe) {
        if (Math.abs(diffX) > 8 && Math.abs(diffX) > Math.abs(diffY)) {
          isHorizontalSwipe = true;
          this.container.classList.add('is-dragging');
          this.track.classList.add('is-dragging');
        } else if (Math.abs(diffY) > 8) {
          // Vertical page scroll intent -> cancel carousel dragging
          isPointerDown = false;
          return;
        }
      }

      if (isHorizontalSwipe) {
        if (e && e.cancelable) e.preventDefault();
        dragDistance = diffX;
        if (Math.abs(dragDistance) > 10) {
          this.wasDragging = true;
        }

        // Boundary resistance on first and last card
        let delta = dragDistance;
        if ((this.currentIndex === 0 && delta > 0) || 
            (this.currentIndex === this.projects.length - 1 && delta < 0)) {
          delta *= 0.35; // rubber-band dampening
        }

        this.track.style.transform = `translateX(${initialTrackX + delta}px)`;
      }
    };

    const onEnd = () => {
      if (!isPointerDown) return;
      isPointerDown = false;
      this.container.classList.remove('is-dragging');
      this.track.classList.remove('is-dragging');

      if (isHorizontalSwipe) {
        const threshold = 40; // 40px swipe threshold
        if (dragDistance < -threshold) {
          // Swiped left -> Next card
          this.updateProjectView(this.currentIndex + 1);
        } else if (dragDistance > threshold) {
          // Swiped right -> Previous card
          this.updateProjectView(this.currentIndex - 1);
        } else {
          // Snap back to current card
          this.updateProjectView(this.currentIndex);
        }
      }

      // Reset wasDragging after click event propagation
      setTimeout(() => {
        this.wasDragging = false;
      }, 60);
    };

    // Mobile touch events
    this.container.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        onStart(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    this.container.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1) {
        onMove(e.touches[0].clientX, e.touches[0].clientY, e);
      }
    }, { passive: false });

    this.container.addEventListener('touchend', onEnd);
    this.container.addEventListener('touchcancel', onEnd);

    // Desktop pointer drag events
    this.container.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return; // left click only
      onStart(e.clientX, e.clientY);
    });

    window.addEventListener('mousemove', (e) => {
      onMove(e.clientX, e.clientY, e);
    });

    window.addEventListener('mouseup', onEnd);
  }

  /* --------------------------------------------------------------------------
     EVENT LISTENERS & NAVIGATION
     -------------------------------------------------------------------------- */
  initEvents() {
    this.prevBtn.addEventListener('click', () => {
      this.updateProjectView(this.currentIndex - 1);
    });

    this.nextBtn.addEventListener('click', () => {
      this.updateProjectView(this.currentIndex + 1);
    });

    // Window resize / mobile orientation change re-centering
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        this.updateProjectView(this.currentIndex, false);
      }, 100);
    });

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
      if (this.projectModal.classList.contains('open') || this.menuDrawer.classList.contains('open')) {
        if (e.key === 'Escape') {
          this.closeMenu();
          this.closeProjectModal();
        }
        return;
      }
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        this.updateProjectView(this.currentIndex + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        this.updateProjectView(this.currentIndex - 1);
      }
    });

    // Mouse wheel horizontal scroll
    let wheelTimeout;
    this.container.addEventListener('wheel', (e) => {
      e.preventDefault();
      if (wheelTimeout) return;
      wheelTimeout = setTimeout(() => { wheelTimeout = null; }, 180);
      if (e.deltaY > 20 || e.deltaX > 20) {
        this.updateProjectView(this.currentIndex + 1);
      } else if (e.deltaY < -20 || e.deltaX < -20) {
        this.updateProjectView(this.currentIndex - 1);
      }
    }, { passive: false });

    // Responsive Window Resize realignment
    window.addEventListener('resize', () => {
      this.updateProjectView(this.currentIndex, false);
    });

    // Menu Drawer
    this.menuBtn.addEventListener('click', () => this.openMenu());
    this.drawerClose.addEventListener('click', () => this.closeMenu());
    this.drawerBackdrop.addEventListener('click', () => this.closeMenu());

    // Modal Close
    this.modalClose.addEventListener('click', () => this.closeProjectModal());
    this.modalBackdrop.addEventListener('click', () => this.closeProjectModal());

    this.attachHover();
  }

  openMenu() {
    this.playClick();
    this.menuDrawer.classList.add('open');
    this.menuDrawer.setAttribute('aria-hidden', 'false');
  }

  closeMenu() {
    this.playClick();
    this.menuDrawer.classList.remove('open');
    this.menuDrawer.setAttribute('aria-hidden', 'true');
  }

  openProjectModal(item) {
    this.playClick();
    const isDoctor = item.slug === 'doctor-profile';
    const isGongjindan = item.slug === 'gongjindan';
    const detailListHtml = (item.details || [])
      .map(d => `<li style="font-size: 14px; line-height: 1.6; color: #333; margin-bottom: 6px;">${d}</li>`)
      .join('');

    let heroBg = '#222';
    let heroImgStyle = 'width: 100%; height: 100%; object-fit: cover;';
    if (isDoctor) {
      heroBg = 'linear-gradient(180deg, #EBE5DF 0%, #D8CFC7 100%)';
      heroImgStyle = 'object-fit: contain; max-height: 380px; width: auto;';
    } else if (isGongjindan) {
      heroBg = '#FAF8F5';
      heroImgStyle = 'object-fit: contain; max-height: 380px; width: auto; padding: 12px 0;';
    }

    const isZero = item.slug === 'appetite-zero';
    const isGongjin = item.slug === 'gongjindan';
    const isGrowth = item.slug === 'pediatric-growth';
    const landingBtnHtml = isZero ? `
      <a href="${GET_DIET_ZERO_URL()}" class="modal-cta-btn modal-cta-accent" style="background: linear-gradient(135deg, #1C1917 0%, #382A24 100%); color: #F5EFEB; font-weight: 700; border: 1px solid rgba(197, 160, 89, 0.4); box-shadow: 0 4px 20px rgba(0,0,0,0.15); display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 8px; text-decoration: none; width: 100%;">
        <span>✨ 식욕 ZERO 시네마틱 상세페이지 & 결제창 바로가기</span>
        <span style="color: var(--accent-gold);">➔</span>
      </a>
    ` : (isGongjin ? `
      <a href="${GET_GONGJINDAN_URL()}" class="modal-cta-btn modal-cta-accent" style="background: linear-gradient(135deg, #1C130E 0%, #382A24 100%); color: #F5EFEB; font-weight: 700; border: 1px solid rgba(197, 160, 89, 0.4); box-shadow: 0 4px 20px rgba(0,0,0,0.15); display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 8px; text-decoration: none; width: 100%;">
        <span>👑 황제공진단 10대 특허 브로셔 & 1:1 수제 제환 상세페이지</span>
        <span style="color: var(--accent-gold);">➔</span>
      </a>
    ` : (isGrowth ? `
      <a href="${GET_GROWTH_URL()}" class="modal-cta-btn modal-cta-accent" style="background: linear-gradient(135deg, #12281D 0%, #2A5A3F 100%); color: #F5EFEB; font-weight: 700; border: 1px solid rgba(196, 151, 85, 0.5); box-shadow: 0 4px 20px rgba(18, 40, 29, 0.3); display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 8px; text-decoration: none; width: 100%;">
        <span>🌱 키성장 · 성조숙증 안심 클리닉 상세페이지 보기</span>
        <span style="color: #6EE7B7;">➔</span>
      </a>
    ` : ''));

    this.modalContent.innerHTML = `
      <div style="background: ${heroBg}; display: flex; justify-content: center; align-items: center; overflow: hidden; height: 380px;">
        <img class="modal-hero-img" src="${item.image}" alt="${item.title}" style="${heroImgStyle}" />
      </div>
      <div class="modal-info-panel">
        <div class="modal-meta-row">
          <span style="color: var(--accent-rose); font-weight: 700;">${item.year}</span>
          <span>·</span>
          <span>${item.client}</span>
        </div>
        <h2 class="modal-title">${item.title}</h2>
        <div class="modal-awards">🌿 ${item.awards}</div>
        <p class="modal-desc">${item.description}</p>
        
        <div style="background: #FAFAFA; border: 1px solid var(--border-line); border-radius: 6px; padding: 20px; margin-top: 4px;">
          <h4 style="font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; color: var(--text-dim); margin-bottom: 12px; letter-spacing: 0.05em;">
            PROGRAM SPECIFICATIONS
          </h4>
          <ul style="list-style: none; padding: 0;">
            ${detailListHtml}
          </ul>
        </div>

        <div class="modal-cta-group" style="${(isZero || isGongjin || isGrowth) ? 'flex-direction: column; gap: 10px;' : ''}">
          ${landingBtnHtml}
          <div style="display: flex; gap: 12px; width: 100%;">
            <a href="${item.primaryLink}" target="_blank" rel="noopener noreferrer" class="modal-cta-btn modal-cta-primary" style="flex: 1;">
              ${item.primaryText} ↗
            </a>
            <a href="${item.secondaryLink}" target="_blank" rel="noopener noreferrer" class="modal-cta-btn modal-cta-secondary" style="flex: 1;">
              ${item.secondaryText} ↗
            </a>
          </div>
        </div>
      </div>
    `;
    this.projectModal.classList.add('open');
    this.projectModal.setAttribute('aria-hidden', 'false');
  }

  /* --------------------------------------------------------------------------
     GONGJINDAN "예약 즉시 조제" 시네마틱 트랜지션 애니메이션
     -------------------------------------------------------------------------- */
  triggerGongjindanCraftAnimation(onComplete) {
    let overlay = document.getElementById('gongjin-craft-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'gongjin-craft-overlay';
      overlay.className = 'craft-transition-overlay';
      overlay.innerHTML = `
        <div class="craft-center-stage">
          <div class="craft-seal-wrapper">
            <div class="craft-giant-seal">
              <span class="seal-char">眞</span>
              <span class="seal-char">品</span>
            </div>
            <div class="craft-seal-shockwave"></div>
          </div>
          <div class="craft-meta-badge">✦ 大韓民國 特許 第10-1744704號 · 1:1 수제 조제</div>
          <h2 class="craft-main-title">예약 즉시 조제 (豫約 即時 調製)</h2>
          <p class="craft-desc">천연 사향의 향손실을 막기 위해, 사전 예약된 수량에 한하여 원장이 직접 한 알 한 알 정성으로 빚어냅니다.</p>
          <div class="craft-progress-track">
            <div class="craft-progress-bar"></div>
          </div>
          <span class="craft-skip-cue">황제공진단 시네마틱 아카이브로 이동합니다 (화면 터치 시 즉시 이동)</span>
        </div>
      `;
      document.body.appendChild(overlay);
    }

    let navigated = false;
    const doNav = () => {
      if (navigated) return;
      navigated = true;
      if (typeof onComplete === 'function') onComplete();
    };

    overlay.onclick = doNav;
    overlay.classList.add('is-active');

    const pBar = overlay.querySelector('.craft-progress-bar');
    if (pBar) {
      pBar.style.width = '0%';
      setTimeout(() => { pBar.style.width = '100%'; }, 50);
    }

    this.playClick();
    setTimeout(doNav, 1100);
  }

  closeProjectModal() {
    this.playClick();
    this.projectModal.classList.remove('open');
    this.projectModal.setAttribute('aria-hidden', 'true');
  }
}

// Start application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new BareunClinicApp();
});
