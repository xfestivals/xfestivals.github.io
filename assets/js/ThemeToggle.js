/**
 * 테마 전환 버튼 컴포넌트
 * 다크 모드와 라이트 모드 간의 전환을 위한 UI 컴포넌트
 */
class ThemeToggle {
    /**
     * ThemeToggle 컴포넌트 생성자
     * @param {ThemeContext} themeContext - 테마 컨텍스트 인스턴스
     */
    constructor(themeContext) {
      this.themeContext = themeContext || window.themeManager;
      this.element = this.createToggleButton();
      
      // 초기 상태 설정
      this.updateToggleState(this.themeContext.isDarkMode);
      
      // 테마 변경 리스너 등록
      this.themeContext.addThemeChangeListener(this.updateToggleState.bind(this));
    }
    
    /**
     * 테마 전환 버튼 DOM 요소 생성
     * @returns {HTMLElement} 버튼 요소
     */
    createToggleButton() {
      const button = document.createElement('button');
      button.className = 'theme-toggle';
      button.setAttribute('aria-label', 'Toggle dark mode');
      
      // 토글 트랙
      const track = document.createElement('div');
      track.className = 'toggle-track';
      
      // 토글 인디케이터
      const indicator = document.createElement('div');
      indicator.className = 'toggle-indicator';
      
      // 인디케이터 아이콘
      const iconContainer = document.createElement('div');
      iconContainer.className = 'indicator-icons';
      
      // 해 아이콘 (라이트 모드)
      const sunIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      sunIcon.setAttribute('class', 'sun-icon');
      sunIcon.setAttribute('viewBox', '0 0 24 24');
      sunIcon.setAttribute('width', '24');
      sunIcon.setAttribute('height', '24');
      sunIcon.setAttribute('stroke', 'currentColor');
      sunIcon.setAttribute('fill', 'none');
      sunIcon.innerHTML = `
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      `;
      
      // 달 아이콘 (다크 모드)
      const moonIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      moonIcon.setAttribute('class', 'moon-icon');
      moonIcon.setAttribute('viewBox', '0 0 24 24');
      moonIcon.setAttribute('width', '24');
      moonIcon.setAttribute('height', '24');
      moonIcon.setAttribute('stroke', 'currentColor');
      moonIcon.setAttribute('fill', 'none');
      moonIcon.innerHTML = `
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      `;
      
      // 스크린 리더용 텍스트
      const srText = document.createElement('span');
      srText.className = 'sr-only';
      srText.textContent = 'Switch to light mode';
      
      // 요소 조립
      iconContainer.appendChild(sunIcon);
      iconContainer.appendChild(moonIcon);
      indicator.appendChild(iconContainer);
      track.appendChild(indicator);
      button.appendChild(track);
      button.appendChild(srText);
      
      // 클릭 이벤트 핸들러 추가
      button.addEventListener('click', () => {
        this.themeContext.toggleTheme();
      });
      
      return button;
    }
    
    /**
     * 테마 상태에 따라 토글 버튼 업데이트
     * @param {boolean} isDarkMode - 다크 모드 여부
     */
    updateToggleState(isDarkMode) {
      if (isDarkMode) {
        this.element.classList.add('dark');
        this.element.classList.remove('light');
        this.element.querySelector('.sr-only').textContent = '라이트 모드로 전환';
      } else {
        this.element.classList.add('light');
        this.element.classList.remove('dark');
        this.element.querySelector('.sr-only').textContent = '다크 모드로 전환';
      }
    }
    
    /**
     * 테마 토글 버튼 요소 반환
     * @returns {HTMLElement} 버튼 요소
     */
    render() {
      return this.element;
    }
  }