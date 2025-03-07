/**
 * 학습 여정 타임라인 컴포넌트
 * 학습 경로와 성장 과정을 시각적 타임라인으로 보여줍니다.
 */
class AnimatedTimeline {
    /**
     * AnimatedTimeline 컴포넌트 생성자
     * @param {HTMLElement} container - 타임라인을 렌더링할 컨테이너 요소
     */
    constructor(container) {
      this.container = container;
      this.animatedItems = [];
      
      // 타임라인 이벤트 데이터
      this.timelineEvents = [
        { 
          year: '2021', 
          title: '프로그래밍 여정 시작', 
          description: 'HTML, CSS, JavaScript의 기초를 독학으로 배우기 시작했습니다. 처음으로 간단한 웹 페이지를 만들며 개발의 즐거움을 발견했습니다.',
          icon: 'rocket'
        },
        { 
          year: '2022', 
          title: '첫 웹 프로젝트 완성', 
          description: '학교 동아리를 위한 웹사이트를 개발했습니다. 사용자 피드백을 받으며 실제 사용자를 위한 디자인의 중요성을 배웠습니다.',
          icon: 'code'
        },
        { 
          year: '2022', 
          title: '프론트엔드 기술 심화', 
          description: 'React.js를 학습하고 컴포넌트 기반 개발 방식에 익숙해졌습니다. 온라인 코스와 튜토리얼을 통해 지식을 확장했습니다.',
          icon: 'layers'
        },
        { 
          year: '2023', 
          title: '백엔드 개발 시작', 
          description: 'Node.js와 Express를 배우면서 풀스택 개발자로 성장하기 시작했습니다. 간단한 API를 만들고 데이터베이스와 연동하는 방법을 익혔습니다.',
          icon: 'database'
        },
        { 
          year: '2023', 
          title: '첫 해커톤 참가', 
          description: '지역 청소년 해커톤에 참가하여 팀 프로젝트를 진행했습니다. 협업의 중요성과 제한된 시간 내에 결과물을 만들어내는 경험을 쌓았습니다.',
          icon: 'users'
        },
        { 
          year: '2024', 
          title: '포트폴리오 사이트 개발', 
          description: '그동안의 학습과 프로젝트 경험을 담은 개인 포트폴리오 웹사이트를 디자인하고 개발했습니다. UI/UX 디자인에 중점을 두었습니다.',
          icon: 'layout'
        },
        { 
          year: '2024', 
          title: '오픈 소스 기여 시작', 
          description: '처음으로 오픈 소스 프로젝트에 기여하며 더 큰 개발 커뮤니티의 일원이 되었습니다. 코드 리뷰와 협업 경험을 쌓았습니다.',
          icon: 'github'
        }
      ];
      
      this.render();
      this.setupScrollAnimation();
    }
    
    /**
     * 타임라인 컴포넌트 렌더링
     */
    render() {
      // 기존 내용 제거
      this.container.innerHTML = '';
      
      // 타임라인 컨테이너 생성
      const timelineContainer = document.createElement('div');
      timelineContainer.className = 'container';
      
      // 섹션 타이틀 생성
      const sectionTitle = document.createElement('h2');
      sectionTitle.className = 'section-title';
      sectionTitle.innerHTML = '학습 <span class="text-accent">여정</span>';
      timelineContainer.appendChild(sectionTitle);
      
      // 설명 텍스트 생성
      const description = document.createElement('p');
      description.className = 'section-description';
      description.textContent = '저의 프로그래밍 및 디자인 학습 경로를 시간순으로 정리했습니다. 각 단계마다 새로운 기술과 개념을 배우고 적용하며 성장해왔습니다.';
      timelineContainer.appendChild(description);
      
      // 타임라인 생성
      const timeline = document.createElement('div');
      timeline.className = 'timeline-container';
      
      // 타임라인 아이템 생성
      this.timelineEvents.forEach((event, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        timelineItem.id = `timeline-item-${index}`;
        
        // 타임라인 마커
        const marker = document.createElement('div');
        marker.className = 'timeline-marker';
        
        // 타임라인 아이콘
        const icon = document.createElement('div');
        icon.className = 'timeline-icon';
        icon.appendChild(this.renderIcon(event.icon));
        marker.appendChild(icon);
        
        // 타임라인 날짜
        const date = document.createElement('div');
        date.className = 'timeline-date';
        date.textContent = event.year;
        marker.appendChild(date);
        
        // 타임라인 내용
        const content = document.createElement('div');
        content.className = 'timeline-content';
        
        // 타임라인 제목
        const title = document.createElement('h3');
        title.className = 'timeline-title';
        title.textContent = event.title;
        content.appendChild(title);
        
        // 타임라인 설명
        const desc = document.createElement('p');
        desc.className = 'timeline-description';
        desc.textContent = event.description;
        content.appendChild(desc);
        
        // 아이템 조립
        timelineItem.appendChild(marker);
        timelineItem.appendChild(content);
        timeline.appendChild(timelineItem);
      });
      
      // 타임라인 라인
      const timelineLine = document.createElement('div');
      timelineLine.className = 'timeline-line';
      timeline.appendChild(timelineLine);
      
      // 컨테이너에 타임라인 추가
      timelineContainer.appendChild(timeline);
      this.container.appendChild(timelineContainer);
    }
    
    /**
     * 아이콘 SVG 렌더링
     * @param {string} iconName - 아이콘 이름
     * @returns {SVGElement} SVG 아이콘 요소
     */
    renderIcon(iconName) {
      const svgNS = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(svgNS, "svg");
      svg.setAttribute("viewBox", "0 0 24 24");
      svg.setAttribute("width", "24");
      svg.setAttribute("height", "24");
      svg.setAttribute("stroke", "currentColor");
      svg.setAttribute("fill", "none");
      svg.setAttribute("stroke-width", "2");
      
      let path;
      switch (iconName) {
        case 'rocket':
          path = document.createElementNS(svgNS, "path");
          path.setAttribute("d", "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z");
          svg.appendChild(path);
          
          path = document.createElementNS(svgNS, "path");
          path.setAttribute("d", "M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z");
          svg.appendChild(path);
          
          path = document.createElementNS(svgNS, "path");
          path.setAttribute("d", "M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0");
          svg.appendChild(path);
          
          path = document.createElementNS(svgNS, "path");
          path.setAttribute("d", "M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5");
          svg.appendChild(path);
          break;
          
        case 'code':
          path = document.createElementNS(svgNS, "polyline");
          path.setAttribute("points", "16 18 22 12 16 6");
          svg.appendChild(path);
          
          path = document.createElementNS(svgNS, "polyline");
          path.setAttribute("points", "8 6 2 12 8 18");
          svg.appendChild(path);
          break;
          
        case 'layers':
          path = document.createElementNS(svgNS, "polygon");
          path.setAttribute("points", "12 2 2 7 12 12 22 7 12 2");
          svg.appendChild(path);
          
          path = document.createElementNS(svgNS, "polyline");
          path.setAttribute("points", "2 17 12 22 22 17");
          svg.appendChild(path);
          
          path = document.createElementNS(svgNS, "polyline");
          path.setAttribute("points", "2 12 12 17 22 12");
          svg.appendChild(path);
          break;
          
        case 'database':
          path = document.createElementNS(svgNS, "ellipse");
          path.setAttribute("cx", "12");
          path.setAttribute("cy", "5");
          path.setAttribute("rx", "9");
          path.setAttribute("ry", "3");
          svg.appendChild(path);
          
          path = document.createElementNS(svgNS, "path");
          path.setAttribute("d", "M21 12c0 1.66-4 3-9 3s-9-1.34-9-3");
          svg.appendChild(path);
          
          path = document.createElementNS(svgNS, "path");
          path.setAttribute("d", "M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5");
          svg.appendChild(path);
          break;
          
        case 'users':
          path = document.createElementNS(svgNS, "path");
          path.setAttribute("d", "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2");
          svg.appendChild(path);
          
          path = document.createElementNS(svgNS, "circle");
          path.setAttribute("cx", "9");
          path.setAttribute("cy", "7");
          path.setAttribute("r", "4");
          svg.appendChild(path);
          
          path = document.createElementNS(svgNS, "path");
          path.setAttribute("d", "M23 21v-2a4 4 0 0 0-3-3.87");
          svg.appendChild(path);
          
          path = document.createElementNS(svgNS, "path");
          path.setAttribute("d", "M16 3.13a4 4 0 0 1 0 7.75");
          svg.appendChild(path);
          break;
          
        case 'layout':
          path = document.createElementNS(svgNS, "rect");
          path.setAttribute("x", "3");
          path.setAttribute("y", "3");
          path.setAttribute("width", "18");
          path.setAttribute("height", "18");
          path.setAttribute("rx", "2");
          path.setAttribute("ry", "2");
          svg.appendChild(path);
          
          path = document.createElementNS(svgNS, "line");
          path.setAttribute("x1", "3");
          path.setAttribute("y1", "9");
          path.setAttribute("x2", "21");
          path.setAttribute("y2", "9");
          svg.appendChild(path);
          
          path = document.createElementNS(svgNS, "line");
          path.setAttribute("x1", "9");
          path.setAttribute("y1", "21");
          path.setAttribute("x2", "9");
          path.setAttribute("y2", "9");
          svg.appendChild(path);
          break;
          
        case 'github':
          path = document.createElementNS(svgNS, "path");
          path.setAttribute("d", "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22");
          svg.appendChild(path);
          break;
          
        default:
          path = document.createElementNS(svgNS, "circle");
          path.setAttribute("cx", "12");
          path.setAttribute("cy", "12");
          path.setAttribute("r", "10");
          svg.appendChild(path);
          
          path = document.createElementNS(svgNS, "line");
          path.setAttribute("x1", "12");
          path.setAttribute("y1", "8");
          path.setAttribute("x2", "12");
          path.setAttribute("y2", "12");
          svg.appendChild(path);
          
          path = document.createElementNS(svgNS, "line");
          path.setAttribute("x1", "12");
          path.setAttribute("y1", "16");
          path.setAttribute("x2", "12.01");
          path.setAttribute("y2", "16");
          svg.appendChild(path);
          break;
      }
      
      return svg;
    }
    
    /**
     * 스크롤 애니메이션 설정
     */
    setupScrollAnimation() {
      // IntersectionObserver 지원 확인
      if (!('IntersectionObserver' in window)) {
        // 모든 아이템을 한 번에 표시
        document.querySelectorAll('.timeline-item').forEach(item => {
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
      
      // 타임라인 아이템 관찰 시작
      document.querySelectorAll('.timeline-item').forEach(item => {
        observer.observe(item);
      });
      
      // 페이지 로드 시 보이는 아이템 처리
      setTimeout(() => {
        document.querySelectorAll('.timeline-item').forEach(item => {
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