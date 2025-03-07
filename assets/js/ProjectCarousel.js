/**
 * 프로젝트 슬라이더/캐러셀 컴포넌트
 * 주요 프로젝트를 슬라이드 형태로 표시합니다.
 */
class ProjectCarousel {
    /**
     * ProjectCarousel 컴포넌트 생성자
     * @param {HTMLElement} container - 슬라이더를 렌더링할 컨테이너 요소
     */
    constructor(container) {
      this.container = container;
      this.activeSlide = 0;
      
      // 프로젝트 데이터
      this.projects = [
        {
          id: 1,
          title: "E-커머스 대시보드 리디자인",
          description: "데이터 시각화에 중점을 둔 e-커머스 분석 대시보드의 완전한 개편 프로젝트입니다. React와 D3.js를 활용하여 직관적인 데이터 시각화를 구현했습니다. 이 리디자인 이후 사용자 참여도가 37% 증가하고 의사결정 시간이 28% 단축되었습니다.",
          image: "img/featured-project.jpg",
          tags: ["UI/UX 디자인", "React", "데이터 시각화", "TypeScript"],
          links: {
            live: "#",
            code: "#",
            case: "#"
          }
        },
        {
          id: 2,
          title: "모바일 뱅킹 앱",
          description: "밀레니얼 세대를 위한 현대적인 뱅킹 애플리케이션으로, 금융 목표 관리 및 소비 습관 시각화에 중점을 두었습니다. 사용자 연구와 프로토타이핑을 통해 직관적인 인터페이스를 디자인했으며, 테스트 결과 목표 설정 및 관리 기능이 사용자들에게 특히 호평을 받았습니다.",
          image: "img/project-1.jpg",
          tags: ["모바일", "UI/UX 디자인", "Swift", "Firebase"],
          links: {
            live: "#",
            code: "#",
            case: "#"
          }
        },
        {
          id: 3,
          title: "헬스케어 환자 포털",
          description: "약속 일정 및 의료 기록 접근을 단순화하는 종합적인 환자 관리 시스템입니다. React와 Node.js를 사용한 풀스택 개발 프로젝트로, 실시간 알림 기능과 의사-환자 커뮤니케이션 채널을 구축했습니다. 프로젝트 기간 동안 인증 보안과 개인정보 보호에 특별히 신경썼습니다.",
          image: "img/project-2.jpg",
          tags: ["웹 앱", "풀스택", "React", "Node.js", "MongoDB"],
          links: {
            live: "#",
            code: "#",
            case: "#"
          }
        },
        {
          id: 4,
          title: "여행 경험 플랫폼",
          description: "사용자의 취향에 따라 독특한 경험을 발견할 수 있도록 도와주는 맞춤형 여행 동반자 앱입니다. 기계학습 알고리즘을 활용하여 사용자 선호도에 따른 추천 시스템을 구현했으며, 지역 문화 관광 명소와의 파트너십을 통해 차별화된 경험을 제공합니다.",
          image: "img/project-3.jpg",
          tags: ["모바일 앱", "UX 연구", "React Native", "AWS"],
          links: {
            live: "#",
            code: "#",
            case: "#"
          }
        }
      ];
      
      this.render();
      this.setupEventListeners();
    }
    
    /**
     * 슬라이더 컴포넌트 렌더링
     */
    render() {
      // 기존 내용 제거
      this.container.innerHTML = '';
      
      // 섹션 컨테이너 생성
      const sectionContainer = document.createElement('div');
      sectionContainer.className = 'container';
      
      // 섹션 타이틀 생성
      const sectionTitle = document.createElement('h2');
      sectionTitle.className = 'section-title';
      sectionTitle.innerHTML = '주요 <span class="text-accent">프로젝트</span>';
      sectionContainer.appendChild(sectionTitle);
      
      // 설명 텍스트 생성
      const description = document.createElement('p');
      description.className = 'section-description';
      description.textContent = '제가 가장 자랑스럽게 생각하는 몇 가지 프로젝트를 소개합니다. 각 프로젝트는 특정 문제를 해결하거나 새로운 기술을 익히는 과정에서 탄생했습니다.';
      sectionContainer.appendChild(description);
      
      // 캐러셀 컨테이너 생성
      const carouselContainer = document.createElement('div');
      carouselContainer.className = 'carousel-container';
      
      // 슬라이드 래퍼
      const slidesWrapper = document.createElement('div');
      slidesWrapper.className = 'carousel-wrapper';
      
      // 슬라이드 컨테이너
      const slides = document.createElement('div');
      slides.className = 'carousel-slides';
      slides.style.transform = `translateX(-${this.activeSlide * 100}%)`;
      
      // 슬라이드 생성
      this.projects.forEach(project => {
        const slide = this.createSlide(project);
        slides.appendChild(slide);
      });
      
      slidesWrapper.appendChild(slides);
      carouselContainer.appendChild(slidesWrapper);
      
      // 이전/다음 버튼 생성
      const prevButton = document.createElement('button');
      prevButton.className = 'carousel-arrow prev';
      prevButton.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      `;
      prevButton.addEventListener('click', () => this.prevSlide());
      carouselContainer.appendChild(prevButton);
      
      const nextButton = document.createElement('button');
      nextButton.className = 'carousel-arrow next';
      nextButton.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      `;
      nextButton.addEventListener('click', () => this.nextSlide());
      carouselContainer.appendChild(nextButton);
      
      // 인디케이터 생성
      const indicators = document.createElement('div');
      indicators.className = 'carousel-indicators';
      
      this.projects.forEach((_, index) => {
        const indicator = document.createElement('button');
        indicator.className = `carousel-indicator ${this.activeSlide === index ? 'active' : ''}`;
        indicator.setAttribute('aria-label', `Go to slide ${index + 1}`);
        indicator.addEventListener('click', () => this.goToSlide(index));
        indicators.appendChild(indicator);
      });
      
      carouselContainer.appendChild(indicators);
      sectionContainer.appendChild(carouselContainer);
      
      this.container.appendChild(sectionContainer);
    }
    
    /**
     * 슬라이드 요소 생성
     * @param {Object} project - 프로젝트 데이터
     * @returns {HTMLElement} 슬라이드 요소
     */
    createSlide(project) {
      const slide = document.createElement('div');
      slide.className = 'carousel-slide';
      
      const slideInner = document.createElement('div');
      slideInner.className = 'carousel-slide-inner';
      
      // 프로젝트 이미지
      const imageContainer = document.createElement('div');
      imageContainer.className = 'project-image';
      
      const image = document.createElement('img');
      image.src = project.image;
      image.alt = project.title;
      imageContainer.appendChild(image);
      
      // 프로젝트 상세 정보
      const detailsContainer = document.createElement('div');
      detailsContainer.className = 'project-details';
      
      // 프로젝트 태그
      const tagsContainer = document.createElement('div');
      tagsContainer.className = 'project-tags';
      
      project.tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'project-tag';
        tagElement.textContent = tag;
        tagsContainer.appendChild(tagElement);
      });
      
      detailsContainer.appendChild(tagsContainer);
      
      // 프로젝트 제목
      const title = document.createElement('h3');
      title.className = 'project-title';
      title.textContent = project.title;
      detailsContainer.appendChild(title);
      
      // 프로젝트 설명
      const description = document.createElement('p');
      description.className = 'project-description';
      description.textContent = project.description;
      detailsContainer.appendChild(description);
      
      // 프로젝트 링크
      const linksContainer = document.createElement('div');
      linksContainer.className = 'project-links';
      
      // 라이브 데모 링크
      const liveLink = document.createElement('a');
      liveLink.href = project.links.live;
      liveLink.className = 'project-link primary';
      liveLink.innerHTML = `
        라이브 데모
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
          <polyline points="15 3 21 3 21 9"></polyline>
          <line x1="10" y1="14" x2="21" y2="3"></line>
        </svg>
      `;
      linksContainer.appendChild(liveLink);
      
      // 소스 코드 링크
      const codeLink = document.createElement('a');
      codeLink.href = project.links.code;
      codeLink.className = 'project-link';
      codeLink.innerHTML = `
        소스 코드
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      `;
      linksContainer.appendChild(codeLink);
      
      // 사례 연구 링크
      const caseLink = document.createElement('a');
      caseLink.href = project.links.case;
      caseLink.className = 'project-link';
      caseLink.innerHTML = `
        사례 연구
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      `;
      linksContainer.appendChild(caseLink);
      
      detailsContainer.appendChild(linksContainer);
      
      // 슬라이드 조립
      slideInner.appendChild(imageContainer);
      slideInner.appendChild(detailsContainer);
      slide.appendChild(slideInner);
      
      return slide;
    }
    
    /**
     * 다음 슬라이드로 이동
     */
    nextSlide() {
      this.activeSlide = (this.activeSlide + 1) % this.projects.length;
      this.updateSlider();
    }
    
    /**
     * 이전 슬라이드로 이동
     */
    prevSlide() {
      this.activeSlide = (this.activeSlide - 1 + this.projects.length) % this.projects.length;
      this.updateSlider();
    }
    
    /**
     * 특정 슬라이드로 이동
     * @param {number} index - 이동할 슬라이드 인덱스
     */
    goToSlide(index) {
      this.activeSlide = index;
      this.updateSlider();
    }
    
    /**
     * 슬라이더 상태 업데이트
     */
    updateSlider() {
      // 슬라이드 위치 업데이트
      const slides = this.container.querySelector('.carousel-slides');
      if (slides) {
        slides.style.transform = `translateX(-${this.activeSlide * 100}%)`;
      }
      
      // 인디케이터 상태 업데이트
      const indicators = this.container.querySelectorAll('.carousel-indicator');
      indicators.forEach((indicator, index) => {
        if (index === this.activeSlide) {
          indicator.classList.add('active');
        } else {
          indicator.classList.remove('active');
        }
      });
    }
    
    /**
     * 이벤트 리스너 설정
     */
    setupEventListeners() {
      // 키보드 이벤트 - 좌우 화살표 키로 슬라이드 전환
      document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
          this.prevSlide();
        } else if (e.key === 'ArrowRight') {
          this.nextSlide();
        }
      });
      
      // 자동 슬라이드 기능 (선택 사항)
      // setInterval(() => this.nextSlide(), 5000);
      
      // 터치 이벤트 처리 (모바일 지원)
      let touchStartX = 0;
      let touchEndX = 0;
      
      this.container.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, false);
      
      this.container.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        this.handleSwipe();
      }, false);
      
      // 스와이프 처리
      this.handleSwipe = () => {
        if (touchEndX < touchStartX) {
          // 왼쪽으로 스와이프 - 다음 슬라이드
          this.nextSlide();
        }
        if (touchEndX > touchStartX) {
          // 오른쪽으로 스와이프 - 이전 슬라이드
          this.prevSlide();
        }
      };
    }
  }