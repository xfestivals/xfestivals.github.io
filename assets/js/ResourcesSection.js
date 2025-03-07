/**
 * 도서 및 자료 섹션 컴포넌트
 * 프로그래밍과 디자인 학습에 활용한 자료들을 소개합니다.
 */
class ResourcesSection {
    /**
     * ResourcesSection 컴포넌트 생성자
     * @param {HTMLElement} container - 내용을 렌더링할 컨테이너 요소
     */
    constructor(container) {
      this.container = container;
      this.activeCategory = 'all';
      
      // 학습 자료 데이터
      this.resources = [
        {
          id: 1,
          title: "JavaScript: The Good Parts",
          author: "Douglas Crockford",
          type: "book",
          category: "development",
          image: "img/resource-1.jpg",
          description: "자바스크립트의 핵심 개념과 좋은 프로그래밍 관행을 배우는 데 큰 도움이 된 책입니다."
        },
        {
          id: 2,
          title: "Eloquent JavaScript",
          author: "Marijn Haverbeke",
          type: "book",
          category: "development",
          image: "img/resource-2.jpg",
          description: "자바스크립트 프로그래밍을 깊이 있게 이해하고 실습할 수 있는 좋은 가이드북입니다."
        },
        {
          id: 3,
          title: "The Design of Everyday Things",
          author: "Don Norman",
          type: "book",
          category: "design",
          image: "img/resource-3.jpg",
          description: "사용자 중심 디자인의 원칙과 중요성을 배울 수 있는 UI/UX 디자인의 고전입니다."
        },
        {
          id: 4,
          title: "React 완벽 가이드",
          author: "Academind",
          type: "course",
          category: "development",
          image: "img/resource-4.jpg",
          description: "React의 기초부터 고급 개념까지 체계적으로 배울 수 있었던 온라인 강좌입니다."
        },
        {
          id: 5,
          title: "UI/UX 디자인 마스터클래스",
          author: "디자인스쿨",
          type: "course",
          category: "design",
          image: "img/resource-5.jpg",
          description: "실무에서 사용되는 UI/UX 디자인 프로세스와 도구를 배울 수 있는 강좌입니다."
        },
        {
          id: 6,
          title: "Clean Code",
          author: "Robert C. Martin",
          type: "book",
          category: "development",
          image: "img/resource-6.jpg",
          description: "가독성 있고 유지보수가 쉬운 코드를 작성하는 방법을 배울 수 있는 책입니다."
        },
        {
          id: 7,
          title: "프론트엔드 로드맵",
          author: "MDN Web Docs",
          type: "website",
          category: "development",
          image: "img/resource-7.jpg",
          description: "웹 개발자가 되기 위해 필요한 기술과 지식을 체계적으로 정리한 리소스입니다."
        },
        {
          id: 8,
          title: "Design Systems 핸드북",
          author: "InVision",
          type: "website",
          category: "design",
          image: "img/resource-8.jpg",
          description: "효과적인 디자인 시스템을 구축하고 관리하는 방법을 배울 수 있는 리소스입니다."
        }
      ];
      
      this.render();
      this.setupEventListeners();
    }
    
    /**
     * 자료 목록 렌더링
     */
    render() {
      // 기존 내용 제거
      this.container.innerHTML = '';
      
      // 컨테이너 생성
      const resourcesContainer = document.createElement('div');
      resourcesContainer.className = 'container';
      
      // 섹션 타이틀 생성
      const sectionTitle = document.createElement('h2');
      sectionTitle.className = 'section-title';
      sectionTitle.innerHTML = '학습 <span class="text-accent">자료</span>';
      resourcesContainer.appendChild(sectionTitle);
      
      // 설명 텍스트 생성
      const description = document.createElement('p');
      description.className = 'section-description';
      description.textContent = '제가 프로그래밍과 디자인 여정에서 큰 도움을 받은 책, 강의, 웹사이트를 소개합니다. 이러한 자료들이 저의 지식과 기술 향상에 큰 영향을 주었습니다.';
      resourcesContainer.appendChild(description);
      
      // 필터 버튼 컨테이너 생성
      const filterButtons = document.createElement('div');
      filterButtons.className = 'resources-filter';
      
      // 전체 필터 버튼
      const allButton = document.createElement('button');
      allButton.className = `filter-btn ${this.activeCategory === 'all' ? 'active' : ''}`;
      allButton.textContent = '전체';
      allButton.addEventListener('click', () => this.applyFilter('all'));
      filterButtons.appendChild(allButton);
      
      // 개발 필터 버튼
      const devButton = document.createElement('button');
      devButton.className = `filter-btn ${this.activeCategory === 'development' ? 'active' : ''}`;
      devButton.textContent = '개발';
      devButton.addEventListener('click', () => this.applyFilter('development'));
      filterButtons.appendChild(devButton);
      
      // 디자인 필터 버튼
      const designButton = document.createElement('button');
      designButton.className = `filter-btn ${this.activeCategory === 'design' ? 'active' : ''}`;
      designButton.textContent = '디자인';
      designButton.addEventListener('click', () => this.applyFilter('design'));
      filterButtons.appendChild(designButton);
      
      resourcesContainer.appendChild(filterButtons);
      
      // 자료 그리드 생성
      const resourcesGrid = document.createElement('div');
      resourcesGrid.className = 'resources-grid';
      
      // 필터링된 자료 렌더링
      const filteredResources = this.activeCategory === 'all' 
        ? this.resources 
        : this.resources.filter(resource => resource.category === this.activeCategory);
      
      filteredResources.forEach(resource => {
        const resourceCard = this.createResourceCard(resource);
        resourcesGrid.appendChild(resourceCard);
      });
      
      resourcesContainer.appendChild(resourcesGrid);
      
      // 추가 메모
      const resourcesNote = document.createElement('div');
      resourcesNote.className = 'resources-note';
      
      const noteIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      noteIcon.setAttribute('viewBox', '0 0 24 24');
      noteIcon.setAttribute('width', '24');
      noteIcon.setAttribute('height', '24');
      noteIcon.setAttribute('stroke', 'currentColor');
      noteIcon.setAttribute('fill', 'none');
      
      const circlePath = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circlePath.setAttribute('cx', '12');
      circlePath.setAttribute('cy', '12');
      circlePath.setAttribute('r', '10');
      
      const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line1.setAttribute('x1', '12');
      line1.setAttribute('y1', '8');
      line1.setAttribute('x2', '12');
      line1.setAttribute('y2', '12');
      
      const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line2.setAttribute('x1', '12');
      line2.setAttribute('y1', '16');
      line2.setAttribute('x2', '12.01');
      line2.setAttribute('y2', '16');
      
      noteIcon.appendChild(circlePath);
      noteIcon.appendChild(line1);
      noteIcon.appendChild(line2);
      
      const noteParagraph = document.createElement('p');
      noteParagraph.textContent = '이 외에도 다양한 유튜브 채널, 블로그, 오픈소스 프로젝트 문서 등을 통해 지속적으로 학습하고 있습니다. 자기주도 학습과 커뮤니티를 통한 지식 공유가 제 성장의 중요한 부분입니다.';
      
      resourcesNote.appendChild(noteIcon);
      resourcesNote.appendChild(noteParagraph);
      
      resourcesContainer.appendChild(resourcesNote);
      
      this.container.appendChild(resourcesContainer);
    }
    
    /**
     * 자료 카드 요소 생성
     * @param {Object} resource - 자료 데이터
     * @returns {HTMLElement} 자료 카드 요소
     */
    createResourceCard(resource) {
      const card = document.createElement('div');
      card.className = 'resource-card';
      
      // 자료 이미지
      const imageContainer = document.createElement('div');
      imageContainer.className = 'resource-image';
      
      // 자료 유형 배지
      const typeBadge = document.createElement('div');
      typeBadge.className = 'resource-type-badge';
      
      // 유형 아이콘
      typeBadge.appendChild(this.renderTypeIcon(resource.type));
      
      // 유형 텍스트
      const typeText = document.createElement('span');
      typeText.textContent = resource.type === 'book' ? '도서' : 
                            resource.type === 'course' ? '강의' : '웹사이트';
      typeBadge.appendChild(typeText);
      
      imageContainer.appendChild(typeBadge);
      
      // 이미지
      const img = document.createElement('img');
      img.src = resource.image;
      img.alt = resource.title;
      imageContainer.appendChild(img);
      
      card.appendChild(imageContainer);
      
      // 자료 내용
      const content = document.createElement('div');
      content.className = 'resource-content';
      
      // 자료 제목
      const title = document.createElement('h3');
      title.className = 'resource-title';
      title.textContent = resource.title;
      content.appendChild(title);
      
      // 자료 저자/제공자
      const author = document.createElement('div');
      author.className = 'resource-author';
      author.textContent = resource.author;
      content.appendChild(author);
      
      // 자료 설명
      const description = document.createElement('p');
      description.className = 'resource-description';
      description.textContent = resource.description;
      content.appendChild(description);
      
      card.appendChild(content);
      
      return card;
    }
    
    /**
     * 자료 유형 아이콘 렌더링
     * @param {string} type - 자료 유형 (book, course, website)
     * @returns {SVGElement} 유형 아이콘 SVG 요소
     */
    renderTypeIcon(type) {
      const svgNS = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(svgNS, "svg");
      svg.setAttribute("viewBox", "0 0 24 24");
      svg.setAttribute("width", "24");
      svg.setAttribute("height", "24");
      svg.setAttribute("stroke", "currentColor");
      svg.setAttribute("fill", "none");
      svg.setAttribute("stroke-width", "2");
      
      let path;
      
      switch (type) {
        case 'book':
          path = document.createElementNS(svgNS, "path");
          path.setAttribute("d", "M4 19.5A2.5 2.5 0 0 1 6.5 17H20");
          svg.appendChild(path);
          
          path = document.createElementNS(svgNS, "path");
          path.setAttribute("d", "M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z");
          svg.appendChild(path);
          break;
          
        case 'course':
          path = document.createElementNS(svgNS, "path");
          path.setAttribute("d", "M12 14l9-5-9-5-9 5 9 5z");
          svg.appendChild(path);
          
          path = document.createElementNS(svgNS, "path");
          path.setAttribute("d", "M12 14l6.16-3.422a12.083 12.083 0 0 1 .665 6.479A11.952 11.952 0 0 1 12 20.055a11.952 11.952 0 0 1-6.824-2.998 12.078 12.078 0 0 1 .665-6.479L12 14z");
          svg.appendChild(path);
          
          path = document.createElementNS(svgNS, "path");
          path.setAttribute("d", "M12 14l-6-3.2v6.2");
          svg.appendChild(path);
          break;
          
        case 'website':
          const circle = document.createElementNS(svgNS, "circle");
          circle.setAttribute("cx", "12");
          circle.setAttribute("cy", "12");
          circle.setAttribute("r", "10");
          svg.appendChild(circle);
          
          const line1 = document.createElementNS(svgNS, "line");
          line1.setAttribute("x1", "2");
          line1.setAttribute("y1", "12");
          line1.setAttribute("x2", "22");
          line1.setAttribute("y2", "12");
          svg.appendChild(line1);
          
          path = document.createElementNS(svgNS, "path");
          path.setAttribute("d", "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z");
          svg.appendChild(path);
          break;
          
        default:
          path = document.createElementNS(svgNS, "path");
          path.setAttribute("d", "M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-7-7z");
          svg.appendChild(path);
          
          const polyline = document.createElementNS(svgNS, "polyline");
          polyline.setAttribute("points", "13 2 13 9 20 9");
          svg.appendChild(polyline);
          break;
      }
      
      return svg;
    }
    
    /**
     * 필터 적용 함수
     * @param {string} category - 필터링할 카테고리
     */
    applyFilter(category) {
      if (this.activeCategory === category) return;
      
      this.activeCategory = category;
      this.render();
    }
    
    /**
     * 이벤트 리스너 설정
     */
    setupEventListeners() {
      // 필요한 이벤트 리스너가 있다면 여기에 추가
      window.addEventListener('resize', () => {
        // 화면 크기 변경 시 그리드 레이아웃 조정이 필요할 경우 여기서 처리
      });
    }
  }