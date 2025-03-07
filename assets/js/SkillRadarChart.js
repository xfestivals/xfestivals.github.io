/**
 * 스킬 레이더 차트 컴포넌트
 * 바닐라 자바스크립트로 구현된 스킬 시각화 차트
 */
class SkillRadarChart {
    /**
     * SkillRadarChart 컴포넌트 생성자
     * @param {HTMLElement} container - 차트를 렌더링할 컨테이너 요소
     */
    constructor(container) {
      this.container = container;
      this.activeSkill = null;
      this.data = [
        { skill: 'HTML/CSS', level: 90, fullMark: 100 },
        { skill: 'JavaScript', level: 85, fullMark: 100 },
        { skill: 'React', level: 80, fullMark: 100 },
        { skill: 'Node.js', level: 75, fullMark: 100 },
        { skill: 'UI/UX Design', level: 85, fullMark: 100 },
        { skill: 'MongoDB', level: 70, fullMark: 100 }
      ];
      
      this.render();
      this.setupEventListeners();
    }
    
    /**
     * 차트 컴포넌트 렌더링
     */
    render() {
      // 기존 내용 제거
      this.container.innerHTML = '';
      
      // 섹션 타이틀 생성
      const sectionTitle = document.createElement('h2');
      sectionTitle.className = 'section-title';
      sectionTitle.innerHTML = '기술 <span class="text-accent">역량</span>';
      this.container.appendChild(sectionTitle);
      
      // 설명 텍스트 생성
      const description = document.createElement('p');
      description.className = 'chart-description';
      description.textContent = '다양한 개발 및 디자인 분야에서의 제 역량을 시각화했습니다. 각 항목에 마우스를 올려 상세 정보를 확인하세요.';
      this.container.appendChild(description);
      
      // 차트 컨테이너 생성
      const chartContainer = document.createElement('div');
      chartContainer.className = 'skill-chart';
      this.container.appendChild(chartContainer);
      
      // 레이더 차트 렌더링
      this.renderRadarChart(chartContainer);
      
      // 스킬 범례 생성
      const legendsContainer = document.createElement('div');
      legendsContainer.className = 'skill-legends';
      this.container.appendChild(legendsContainer);
      
      // 각 스킬 항목 렌더링
      this.data.forEach((item, index) => {
        const legend = document.createElement('div');
        legend.className = 'skill-legend';
        legend.id = `skill-legend-${index}`;
        
        const dot = document.createElement('div');
        dot.className = 'skill-dot';
        dot.style.backgroundColor = '#3182F6';
        
        const info = document.createElement('div');
        info.className = 'skill-info';
        
        const name = document.createElement('span');
        name.className = 'skill-name';
        name.textContent = item.skill;
        
        const bar = document.createElement('div');
        bar.className = 'skill-bar';
        
        const progress = document.createElement('div');
        progress.className = 'skill-progress';
        progress.style.width = `${item.level}%`;
        
        const percentage = document.createElement('span');
        percentage.className = 'skill-percentage';
        percentage.textContent = `${item.level}%`;
        
        // 요소 조립
        bar.appendChild(progress);
        info.appendChild(name);
        info.appendChild(bar);
        info.appendChild(percentage);
        
        legend.appendChild(dot);
        legend.appendChild(info);
        
        legendsContainer.appendChild(legend);
        
        // 이벤트 리스너 추가
        legend.addEventListener('mouseenter', () => this.handleMouseEnter(index));
        legend.addEventListener('mouseleave', () => this.handleMouseLeave());
      });
    }
    
    /**
     * 레이더 차트 캔버스 렌더링
     * @param {HTMLElement} container - 레이더 차트를 그릴 컨테이너
     */
    renderRadarChart(container) {
      // 순수 캔버스 기반 레이더 차트 구현
      // 이 예제에서는 간단히 하기 위해 SVG로 구현
      
      const svgNS = "http://www.w3.org/2000/svg";
      const width = 500;
      const height = 500;
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(centerX, centerY) * 0.8;
      
      // SVG 요소 생성
      const svg = document.createElementNS(svgNS, "svg");
      svg.setAttribute("width", "100%");
      svg.setAttribute("height", "500");
      svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
      
      // 배경 원형 그리드 (5개 레벨)
      for (let i = 5; i > 0; i--) {
        const circle = document.createElementNS(svgNS, "circle");
        circle.setAttribute("cx", centerX);
        circle.setAttribute("cy", centerY);
        circle.setAttribute("r", radius * i / 5);
        circle.setAttribute("fill", "none");
        circle.setAttribute("stroke", "rgba(255, 255, 255, 0.1)");
        circle.setAttribute("stroke-width", "1");
        svg.appendChild(circle);
      }
      
      // 축 라인 그리기
      const angleStep = (2 * Math.PI) / this.data.length;
      
      this.data.forEach((item, i) => {
        const angle = i * angleStep - Math.PI / 2; // 첫 축이 위쪽을 가리키도록 조정
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        // 축 라인
        const line = document.createElementNS(svgNS, "line");
        line.setAttribute("x1", centerX);
        line.setAttribute("y1", centerY);
        line.setAttribute("x2", x);
        line.setAttribute("y2", y);
        line.setAttribute("stroke", "rgba(255, 255, 255, 0.2)");
        line.setAttribute("stroke-width", "1");
        svg.appendChild(line);
        
        // 스킬 레이블
        const text = document.createElementNS(svgNS, "text");
        const labelX = centerX + (radius + 20) * Math.cos(angle);
        const labelY = centerY + (radius + 20) * Math.sin(angle);
        text.setAttribute("x", labelX);
        text.setAttribute("y", labelY);
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("alignment-baseline", "middle");
        text.setAttribute("fill", "#fff");
        text.setAttribute("font-size", "14px");
        text.textContent = item.skill;
        
        // 레이블 위치 조정
        if (Math.abs(angle - Math.PI / 2) < 0.1 || Math.abs(angle + Math.PI / 2) < 0.1) {
          text.setAttribute("text-anchor", "middle");
        } else if (angle > -Math.PI / 2 && angle < Math.PI / 2) {
          text.setAttribute("text-anchor", "start");
          text.setAttribute("x", labelX + 5);
        } else {
          text.setAttribute("text-anchor", "end");
          text.setAttribute("x", labelX - 5);
        }
        
        svg.appendChild(text);
      });
      
      // 스킬 레벨 다각형 그리기
      const points = this.data.map((item, i) => {
        const angle = i * angleStep - Math.PI / 2;
        const levelRadius = radius * (item.level / 100);
        const x = centerX + levelRadius * Math.cos(angle);
        const y = centerY + levelRadius * Math.sin(angle);
        return `${x},${y}`;
      }).join(" ");
      
      // 스킬 레벨 다각형 - 채우기
      const polygon = document.createElementNS(svgNS, "polygon");
      polygon.setAttribute("points", points);
      polygon.setAttribute("fill", "rgba(49, 130, 246, 0.2)");
      polygon.setAttribute("stroke", "#3182F6");
      polygon.setAttribute("stroke-width", "2");
      
      // 다각형 애니메이션 효과
      polygon.style.opacity = "0";
      setTimeout(() => {
        polygon.style.transition = "opacity 1.5s ease-in-out";
        polygon.style.opacity = "1";
      }, 300);
      
      svg.appendChild(polygon);
      
      // 스킬 레벨 점 그리기
      this.data.forEach((item, i) => {
        const angle = i * angleStep - Math.PI / 2;
        const levelRadius = radius * (item.level / 100);
        const x = centerX + levelRadius * Math.cos(angle);
        const y = centerY + levelRadius * Math.sin(angle);
        
        const circle = document.createElementNS(svgNS, "circle");
        circle.setAttribute("cx", x);
        circle.setAttribute("cy", y);
        circle.setAttribute("r", "5");
        circle.setAttribute("fill", "#3182F6");
        circle.setAttribute("stroke", "#fff");
        circle.setAttribute("stroke-width", "2");
        circle.setAttribute("data-index", i);
        
        // 툴팁 및 호버 효과
        circle.addEventListener("mouseenter", () => {
          this.handleMouseEnter(i);
          circle.setAttribute("r", "8");
        });
        
        circle.addEventListener("mouseleave", () => {
          this.handleMouseLeave();
          circle.setAttribute("r", "5");
        });
        
        svg.appendChild(circle);
      });
      
      container.appendChild(svg);
    }
    
    /**
     * 마우스 진입 이벤트 핸들러
     * @param {number} index - 활성화할 스킬의 인덱스
     */
    handleMouseEnter(index) {
      this.activeSkill = index;
      
      // 모든 범례 비활성화
      document.querySelectorAll('.skill-legend').forEach(legend => {
        legend.classList.remove('active');
      });
      
      // 해당 범례 활성화
      const activeLegend = document.getElementById(`skill-legend-${index}`);
      if (activeLegend) {
        activeLegend.classList.add('active');
      }
    }
    
    /**
     * 마우스 이탈 이벤트 핸들러
     */
    handleMouseLeave() {
      this.activeSkill = null;
      
      // 모든 범례 비활성화
      document.querySelectorAll('.skill-legend').forEach(legend => {
        legend.classList.remove('active');
      });
    }
    
    /**
     * 이벤트 리스너 설정
     */
    setupEventListeners() {
      // 창 크기 변경 이벤트
      window.addEventListener('resize', () => {
        // 필요한 경우 차트 크기 조정
        this.render();
      });
    }
  }