/**
 * 학업 성취 섹션 컴포넌트
 * 학업 관련 과목, 수상 경력 및 활동을 보여줍니다.
 */
class AcademicAchievements {
    /**
     * AcademicAchievements 컴포넌트 생성자
     * @param {HTMLElement} container - 내용을 렌더링할 컨테이너 요소
     */
    constructor(container) {
      this.container = container;
      this.activeTab = 'courses';
      this.animatedItems = [];
      
      // 관련 과목 데이터
      this.courses = [
        { 
          id: 'course-1',
          name: '컴퓨터 과학 기초', 
          grade: 'A+', 
          year: '2022', 
          description: '컴퓨터 과학의 기본 개념과 원리를 배우고 문제 해결 능력을 기르는 과목입니다.',
          skills: ['알고리즘', '자료구조', '컴퓨터 구조'] 
        },
        { 
          id: 'course-2',
          name: '웹 프로그래밍', 
          grade: 'A', 
          year: '2022', 
          description: 'HTML, CSS, JavaScript를 활용한 웹 개발의 기초를 배우는 과목입니다.',
          skills: ['HTML/CSS', 'JavaScript', '반응형 디자인'] 
        },
        { 
          id: 'course-3',
          name: '데이터베이스 시스템', 
          grade: 'A+', 
          year: '2023', 
          description: '데이터베이스의 설계와 구현, SQL을 활용한 데이터 관리를 학습하는 과목입니다.',
          skills: ['SQL', '데이터 모델링', 'CRUD 연산'] 
        },
        { 
          id: 'course-4',
          name: 'UI/UX 디자인', 
          grade: 'A', 
          year: '2023', 
          description: '사용자 중심 디자인 원칙과 방법론을 배우고 실제 프로젝트에 적용하는 과목입니다.',
          skills: ['프로토타이핑', '사용자 연구', '인터페이스 디자인'] 
        },
        { 
          id: 'course-5',
          name: '모바일 앱 개발', 
          grade: 'A-', 
          year: '2024', 
          description: '모바일 플랫폼을 위한 앱 개발 기초와 사용자 경험 설계를 배우는 과목입니다.',
          skills: ['React Native', 'iOS/Android', '모바일 UI 디자인'] 
        },
        { 
          id: 'course-6',
          name: '인공지능 기초', 
          grade: 'B+', 
          year: '2024', 
          description: '인공지능과 기계학습의 기본 개념과 알고리즘을 학습하는 과목입니다.',
          skills: ['Python', '데이터 분석', '머신러닝 알고리즘'] 
        }
      ];
      
      // 수상 및 인증 데이터
      this.awards = [
        { 
          id: 'award-1',
          title: '지역 청소년 코딩 대회 우수상', 
          year: '2022', 
          organization: '청소년 IT 진흥원', 
          description: '웹 애플리케이션 개발 부문에서 창의적인 솔루션으로 우수상을 수상했습니다.'
        },
        { 
          id: 'award-2',
          title: '교내 SW 경진대회 대상', 
          year: '2023', 
          organization: '학교', 
          description: '교내 소프트웨어 경진대회에서 혁신적인 모바일 앱 아이디어로 대상을 수상했습니다.'
        },
        { 
          id: 'award-3',
          title: 'AWS 클라우드 프랙티셔너 인증', 
          year: '2023', 
          organization: 'Amazon Web Services', 
          description: 'AWS 클라우드 서비스의 기본 이해와 활용 능력을 인증받았습니다.'
        },
        { 
          id: 'award-4',
          title: '청소년 디지털 콘텐츠 공모전 장려상', 
          year: '2024', 
          organization: '디지털진흥원', 
          description: '교육 목적의 디지털 콘텐츠 제작 부문에서 장려상을 수상했습니다.'
        }
      ];
      
      // 활동 및 프로젝트 데이터
      this.activities = [
        { 
          id: 'activity-1',
          title: '코딩 동아리 부장', 
          year: '2022 - 2023', 
          organization: '학교', 
          description: '교내 코딩 동아리를 이끌며 다양한 워크샵과 프로젝트를 기획하고 진행했습니다.'
        },
        { 
          id: 'activity-2',
          title: '청소년 IT 멘토링 프로그램 참가', 
          year: '2023', 
          organization: '지역 IT 기업', 
          description: '지역 IT 기업의 전문가들과 함께하는 멘토링 프로그램에 참가하여 실무 경험을 쌓았습니다.'
        },
        { 
          id: 'activity-3',
          title: '온라인 코딩 부트캠프 수료', 
          year: '2023', 
          organization: 'Code Academy', 
          description: '12주간의 집중 코딩 부트캠프를 통해 풀스택 웹 개발 기술을 습득했습니다.'
        },
        { 
          id: 'activity-4',
          title: '오픈소스 프로젝트 기여자', 
          year: '2024 - 현재', 
          organization: 'GitHub', 
          description: '교육용 오픈소스 프로젝트에 기여하며 협업 경험과 기술을 향상시키고 있습니다.'
        }
      ];
      
      this.render();
      this.setupEventListeners();
      this.setupScrollAnimation();
    }
    
    /**
     * 학업 성취 컴포넌트 렌더링
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
      sectionTitle.innerHTML = '학업 <span class="text-accent">성취</span>';
      sectionContainer.appendChild(sectionTitle);
      
      // 설명 텍스트 생성
      const description = document.createElement('p');
      description.className = 'section-description';
      description.textContent = '제가 학교와 자기주도 학습을 통해 쌓아온 학업적 성취와 활동들을 소개합니다. 컴퓨터 과학, 디자인, 그리고 개발 분야에서의 다양한 경험이 저의 성장을 이끌었습니다.';
      sectionContainer.appendChild(description);
      
      // 탭 메뉴 생성
      const tabsContainer = document.createElement('div');
      tabsContainer.className = 'academic-tabs';
      
      // 관련 과목 탭
      const coursesTab = document.createElement('button');
      coursesTab.className = `academic-tab ${this.activeTab === 'courses' ? 'active' : ''}`;
      coursesTab.textContent = '관련 과목';
      coursesTab.addEventListener('click', () => this.changeTab('courses'));
      tabsContainer.appendChild(coursesTab);
      
      // 수상 및 인증 탭
      const awardsTab = document.createElement('button');
      awardsTab.className = `academic-tab ${this.activeTab === 'awards' ? 'active' : ''}`;
      awardsTab.textContent = '수상 및 인증';
      awardsTab.addEventListener('click', () => this.changeTab('awards'));
      tabsContainer.appendChild(awardsTab);
      
      // 활동 및 프로젝트 탭
      const activitiesTab = document.createElement('button');
      activitiesTab.className = `academic-tab ${this.activeTab === 'activities' ? 'active' : ''}`;
      activitiesTab.textContent = '활동 및 프로젝트';
      activitiesTab.addEventListener('click', () => this.changeTab('activities'));
      tabsContainer.appendChild(activitiesTab);
      
      sectionContainer.appendChild(tabsContainer);
      
      // 콘텐츠 영역 생성
      const contentContainer = document.createElement('div');
      contentContainer.className = 'academic-content';
      
      // 현재 활성화된 탭에 따라 콘텐츠 렌더링
      if (this.activeTab === 'courses') {
        const grid = document.createElement('div');
        grid.className = 'academic-grid';
        
        this.courses.forEach(course => {
          grid.appendChild(this.createCourseCard(course));
        });
        
        contentContainer.appendChild(grid);
      } else if (this.activeTab === 'awards') {
        const list = document.createElement('div');
        list.className = 'academic-list';
        
        this.awards.forEach(award => {
          list.appendChild(this.createAwardItem(award));
        });
        
        contentContainer.appendChild(list);
      } else if (this.activeTab === 'activities') {
        const list = document.createElement('div');
        list.className = 'academic-list';
        
        this.activities.forEach(activity => {
          list.appendChild(this.createActivityItem(activity));
        });
        
        contentContainer.appendChild(list);
      }
      
      sectionContainer.appendChild(contentContainer);
      this.container.appendChild(sectionContainer);
    }
    
    /**
     * 과목 카드 요소 생성
     * @param {Object} course - 과목 데이터
     * @returns {HTMLElement} 과목 카드 요소
     */
    createCourseCard(course) {
      const card = document.createElement('div');
      card.className = 'academic-item course-card';
      card.id = course.id;
      
      // 과목 헤더 (과목명 및 성적)
      const header = document.createElement('div');
      header.className = 'course-header';
      
      const name = document.createElement('h3');
      name.className = 'course-name';
      name.textContent = course.name;
      header.appendChild(name);
      
      const grade = document.createElement('div');
      grade.className = 'course-grade';
      grade.textContent = course.grade;
      header.appendChild(grade);
      
      card.appendChild(header);
      
      // 수강 년도
      const year = document.createElement('div');
      year.className = 'course-year';
      year.textContent = course.year;
      card.appendChild(year);
      
      // 과목 설명
      const description = document.createElement('p');
      description.className = 'course-description';
      description.textContent = course.description;
      card.appendChild(description);
      
      // 기술 목록
      const skillsList = document.createElement('div');
      skillsList.className = 'course-skills';
      
      course.skills.forEach(skill => {
        const skillItem = document.createElement('span');
        skillItem.className = 'course-skill';
        skillItem.textContent = skill;
        skillsList.appendChild(skillItem);
      });
      
      card.appendChild(skillsList);
      
      return card;
    }
    
    /**
     * 수상 내역 아이템 요소 생성
     * @param {Object} award - 수상 내역 데이터
     * @returns {HTMLElement} 수상 내역 아이템 요소
     */
    createAwardItem(award) {
      const item = document.createElement('div');
      item.className = 'academic-item award-item';
      item.id = award.id;
      
      // 아이콘
      const iconContainer = document.createElement('div');
      iconContainer.className = 'award-icon';
      
      const svgNS = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(svgNS, "svg");
      svg.setAttribute("viewBox", "0 0 24 24");
      svg.setAttribute("width", "24");
      svg.setAttribute("height", "24");
      svg.setAttribute("stroke", "currentColor");
      svg.setAttribute("fill", "none");
      
      const path1 = document.createElementNS(svgNS, "circle");
      path1.setAttribute("cx", "12");
      path1.setAttribute("cy", "8");
      path1.setAttribute("r", "7");
      
      const path2 = document.createElementNS(svgNS, "polyline");
      path2.setAttribute("points", "8.21 13.89 7 23 12 20 17 23 15.79 13.88");
      
      svg.appendChild(path1);
      svg.appendChild(path2);
      iconContainer.appendChild(svg);
      
      // 컨텐츠
      const contentContainer = document.createElement('div');
      contentContainer.className = 'award-content';
      
      // 헤더 (제목 및 년도)
      const header = document.createElement('div');
      header.className = 'award-header';
      
      const title = document.createElement('h3');
      title.className = 'award-title';
      title.textContent = award.title;
      header.appendChild(title);
      
      const year = document.createElement('div');
      year.className = 'award-year';
      year.textContent = award.year;
      header.appendChild(year);
      
      contentContainer.appendChild(header);
      
      // 주최 기관
      const organization = document.createElement('div');
      organization.className = 'award-organization';
      organization.textContent = award.organization;
      contentContainer.appendChild(organization);
      
      // 설명
      const description = document.createElement('p');
      description.className = 'award-description';
      description.textContent = award.description;
      contentContainer.appendChild(description);
      
      // 아이템 조립
      item.appendChild(iconContainer);
      item.appendChild(contentContainer);
      
      return item;
    }
    
    /**
     * 활동 내역 아이템 요소 생성
     * @param {Object} activity - 활동 내역 데이터
     * @returns {HTMLElement} 활동 내역 아이템 요소
     */
    createActivityItem(activity) {
      const item = document.createElement('div');
      item.className = 'academic-item activity-item';
      item.id = activity.id;
      
      // 아이콘
      const iconContainer = document.createElement('div');
      iconContainer.className = 'activity-icon';
      
      const svgNS = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(svgNS, "svg");
      svg.setAttribute("viewBox", "0 0 24 24");
      svg.setAttribute("width", "24");
      svg.setAttribute("height", "24");
      svg.setAttribute("stroke", "currentColor");
      svg.setAttribute("fill", "none");
      
      const path = document.createElementNS(svgNS, "path");
      path.setAttribute("d", "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z");
      
      svg.appendChild(path);
      iconContainer.appendChild(svg);
      
      // 컨텐츠
      const contentContainer = document.createElement('div');
      contentContainer.className = 'activity-content';
      
      // 헤더 (제목 및 년도)
      const header = document.createElement('div');
      header.className = 'activity-header';
      
      const title = document.createElement('h3');
      title.className = 'activity-title';
      title.textContent = activity.title;
      header.appendChild(title);
      
      const year = document.createElement('div');
      year.className = 'activity-year';
      year.textContent = activity.year;
      header.appendChild(year);
      
      contentContainer.appendChild(header);
      
      // 주최 기관
      const organization = document.createElement('div');
      organization.className = 'activity-organization';
      organization.textContent = activity.organization;
      contentContainer.appendChild(organization);
      
      // 설명
      const description = document.createElement('p');
      description.className = 'activity-description';
      description.textContent = activity.description;
      contentContainer.appendChild(description);
      
      // 아이템 조립
      item.appendChild(iconContainer);
      item.appendChild(contentContainer);
      
      return item;
    }
    
    /**
     * 탭 전환 함수
     * @param {string} tabName - 변경할 탭 이름
     */
    changeTab(tabName) {
      if (this.activeTab === tabName) return;
      
      this.activeTab = tabName;
      this.animatedItems = []; // 애니메이션 아이템 초기화
      this.render();
      this.setupScrollAnimation();
    }
    
    /**
     * 이벤트 리스너 설정
     */
    setupEventListeners() {
      // 창 크기 변경 이벤트
      window.addEventListener('resize', () => {
        // 필요한 경우 레이아웃 재조정
        this.setupScrollAnimation();
      });
    }
    
    /**
     * 스크롤 애니메이션 설정
     */
    setupScrollAnimation() {
      // IntersectionObserver 지원 확인
      if (!('IntersectionObserver' in window)) {
        // 모든 아이템을 한 번에 표시
        document.querySelectorAll('.academic-item').forEach(item => {
          item.classList.add('animate');
        });
        return;
      }
      
      // IntersectionObserver 설정
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // 화면에 보이면 애니메이션 적용
            entry.target.classList.add('animate');
            
            // 이미 애니메이션이 적용된 아이템은 관찰 중단
            observer.unobserve(entry.target);
            
            // 애니메이션된 아이템 ID 저장
            const itemId = entry.target.id;
            if (!this.animatedItems.includes(itemId)) {
              this.animatedItems.push(itemId);
            }
          }
        });
      }, {
        root: null, // viewport
        threshold: 0.1, // 10% 이상 보이면 실행
        rootMargin: '-50px 0px' // 상단에서 50px 내려왔을 때 실행
      });
      
      // 아카데믹 아이템 관찰 시작
      document.querySelectorAll('.academic-item').forEach(item => {
        observer.observe(item);
      });
      
      // 페이지 로드 시 보이는 아이템 처리
      setTimeout(() => {
        document.querySelectorAll('.academic-item').forEach(item => {
          const rect = item.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.9) {
            item.classList.add('animate');
            
            const itemId = item.id;
            if (!this.animatedItems.includes(itemId)) {
              this.animatedItems.push(itemId);
            }
          }
        });
      }, 500);
    }
  }