/**
 * 프로젝트 필터링 컴포넌트
 * 카테고리별로 프로젝트를 필터링하여 보여줍니다.
 */
class FilterableProjects {
    /**
     * FilterableProjects 컴포넌트 생성자
     * @param {HTMLElement} container - 프로젝트 그리드를 렌더링할 컨테이너 요소
     */
    constructor(container) {
      this.container = container;
      this.filter = 'all';
      this.animateCards = false;
      
      // 프로젝트 데이터
      this.projects = [
        { 
          id: 1, 
          title: "E-커머스 대시보드 리디자인", 
          category: "web",
          image: "img/featured-project.jpg",
          tags: ["UI/UX 디자인", "React", "데이터 시각화"],
          description: "데이터 시각화에 중점을 둔 e-커머스 분석 대시보드의 완전한 개편 프로젝트. 사용자 참여도를 37% 향상시켰습니다."
        },
        { 
          id: 2, 
          title: "모바일 뱅킹 앱", 
          category: "mobile",
          image: "img/project-1.jpg",
          tags: ["모바일", "UI/UX 디자인", "프로토타이핑"],
          description: "밀레니얼 세대를 위한 현대적인 뱅킹 애플리케이션으로, 금융 목표 및 소비 습관 시각화에 중점을 두었습니다."
        },
        { 
          id: 3, 
          title: "헬스케어 환자 포털", 
          category: "web",
          image: "img/project-2.jpg",
          tags: ["웹 앱", "풀스택"],
          description: "약속 일정 및 의료 기록 접근을 단순화하는 종합적인 환자 관리 시스템입니다."
        },
        { 
          id: 4, 
          title: "여행 경험 플랫폼", 
          category: "design",
          image: "img/project-3.jpg",
          tags: ["UI/UX", "사용자 리서치"],
          description: "사용자의 취향에 따라 독특한 경험을 발견할 수 있도록 도와주는 맞춤형 여행 동반자 앱입니다."
        },
        { 
          id: 5, 
          title: "학습 진도 트래커", 
          category: "web",
          image: "img/project-2.jpg",
          tags: ["웹 개발", "React", "교육"],
          description: "학생들이 학습 목표를 설정하고 진행 상황을 추적할 수 있는 인터랙티브한 대시보드입니다."
        },
        { 
          id: 6, 
          title: "AI 챗봇 인터페이스", 
          category: "design",
          image: "img/project-3.jpg",
          tags: ["UI 디자인", "UX 리서치", "프로토타이핑"],
          description: "사용자 친화적인 AI 챗봇을 위한 현대적이고 직관적인 인터페이스 디자인입니다."
        }
      ];
      
      this.filteredProjects = this.projects;
      
      this.render();
      this.setupEventListeners();
    }
    
    /**
     * 프로젝트 목록 렌더링
     */
    render() {
      // 기존 내용 제거
      this.container.innerHTML = '';
      
      // 컨테이너 생성
      const projectsContainer = document.createElement('div');
      projectsContainer.className = 'container';
      
      // 섹션 타이틀 생성
      const sectionTitle = document.createElement('h2');
      sectionTitle.className = 'section-title';
      sectionTitle.innerHTML = '내 <span class="text-accent">프로젝트</span>';
      projectsContainer.appendChild(sectionTitle);
      
      // 설명 텍스트 생성
      const description = document.createElement('p');
      description.className = 'section-description';
      description.textContent = 'UI/UX 디자인, 웹 개발, 그리고 디지털 경험을 아우르는 제 작업물을 소개합니다. 각 프로젝트는 사용자 요구와 비즈니스 목표에 초점을 맞추어 세심하게 제작되었습니다.';
      projectsContainer.appendChild(description);
      
      // 필터 버튼 컨테이너 생성
      const filterButtons = document.createElement('div');
      filterButtons.className = 'filter-buttons';
      
      // 전체 필터 버튼
      const allButton = document.createElement('button');
      allButton.className = `filter-btn ${this.filter === 'all' ? 'active' : ''}`;
      allButton.textContent = '전체';
      allButton.addEventListener('click', () => this.applyFilter('all'));
      filterButtons.appendChild(allButton);
      
      // 웹 개발 필터 버튼
      const webButton = document.createElement('button');
      webButton.className = `filter-btn ${this.filter === 'web' ? 'active' : ''}`;
      webButton.textContent = '웹 개발';
      webButton.addEventListener('click', () => this.applyFilter('web'));
      filterButtons.appendChild(webButton);
      
      // 모바일 필터 버튼
      const mobileButton = document.createElement('button');
      mobileButton.className = `filter-btn ${this.filter === 'mobile' ? 'active' : ''}`;
      mobileButton.textContent = '모바일';
      mobileButton.addEventListener('click', () => this.applyFilter('mobile'));
      filterButtons.appendChild(mobileButton);
      
      // 디자인 필터 버튼
      const designButton = document.createElement('button');
      designButton.className = `filter-btn ${this.filter === 'design' ? 'active' : ''}`;
      designButton.textContent = '디자인';
      designButton.addEventListener('click', () => this.applyFilter('design'));
      filterButtons.appendChild(designButton);
      
      projectsContainer.appendChild(filterButtons);
      
      // 프로젝트 그리드 생성
      const projectsGrid = document.createElement('div');
      projectsGrid.className = 'projects-grid';
      
      // 필터링된 프로젝트 렌더링
      this.filteredProjects.forEach(project => {
        const projectCard = this.createProjectCard(project);
        projectsGrid.appendChild(projectCard);
      });
      
      projectsContainer.appendChild(projectsGrid);
      this.container.appendChild(projectsContainer);
      
      // 애니메이션 적용
      setTimeout(() => {
        this.animateCards = true;
        document.querySelectorAll('.project-card').forEach(card => {
          card.classList.add('animate');
        });
      }, 100);
    }
    
    /**
     * 프로젝트 카드 요소 생성
     * @param {Object} project - 프로젝트 데이터
     * @returns {HTMLElement} 프로젝트 카드 요소
     */
    createProjectCard(project) {
      const card = document.createElement('div');
      card.className = 'project-card';
      
      // 프로젝트 이미지
      const imageContainer = document.createElement('div');
      imageContainer.className = 'project-image';
      
      const img = document.createElement('img');
      img.src = project.image;
      img.alt = project.title;
      img.loading = 'lazy';
      imageContainer.appendChild(img);
      
      // 이미지 오버레이
      const overlay = document.createElement('div');
      overlay.className = 'project-overlay';
      
      const actionContainer = document.createElement('div');
      actionContainer.className = 'project-actions';
      
      const viewButton = document.createElement('button');
      viewButton.className = 'view-project-btn';
      viewButton.textContent = '프로젝트 보기';
      
      const btnIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      btnIcon.setAttribute('width', '16');
      btnIcon.setAttribute('height', '16');
      btnIcon.setAttribute('fill', 'none');
      btnIcon.setAttribute('stroke', 'currentColor');
      btnIcon.setAttribute('viewBox', '0 0 24 24');
      
      const iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      iconPath.setAttribute('d', 'M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z');
      
      btnIcon.appendChild(iconPath);
      viewButton.appendChild(btnIcon);
      actionContainer.appendChild(viewButton);
      overlay.appendChild(actionContainer);
      imageContainer.appendChild(overlay);
      
      card.appendChild(imageContainer);
      
      // 프로젝트 내용
      const content = document.createElement('div');
      content.className = 'project-content';
      
      // 태그 목록
      const tags = document.createElement('div');
      tags.className = 'project-tags';
      
      project.tags.forEach(tag => {
        const tagItem = document.createElement('div');
        tagItem.className = 'project-tag';
        tagItem.textContent = tag;
        tags.appendChild(tagItem);
      });
      
      content.appendChild(tags);
      
      // 프로젝트 제목
      const title = document.createElement('h3');
      title.className = 'project-title';
      title.textContent = project.title;
      content.appendChild(title);
      
      // 프로젝트 설명
      const description = document.createElement('p');
      description.className = 'project-description';
      description.textContent = project.description;
      content.appendChild(description);
      
      card.appendChild(content);
      
      return card;
    }
    
    /**
     * 필터 적용 함수
     * @param {string} category - 필터링할 카테고리
     */
    applyFilter(category) {
      if (this.filter === category) return;
      
      this.filter = category;
      this.animateCards = false;
      
      // 애니메이션을 위한 지연 처리
      document.querySelectorAll('.project-card').forEach(card => {
        card.classList.remove('animate');
      });
      
      setTimeout(() => {
        // 필터링 적용
        if (category === 'all') {
          this.filteredProjects = this.projects;
        } else {
          this.filteredProjects = this.projects.filter(project => project.category === category);
        }
        
        // 컴포넌트 다시 렌더링
        this.render();
      }, 300);
    }
    
    /**
     * 이벤트 리스너 설정
     */
    setupEventListeners() {
      // 필요한 이벤트 리스너가 있다면 여기에 추가
      window.addEventListener('resize', () => {
        // 화면 크기 변경 시 그리드 레이아웃 재조정이 필요할 경우 여기서 처리
      });
    }
  }