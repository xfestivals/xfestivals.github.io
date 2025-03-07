/**
 * 테마 관리 클래스
 * 다크 모드와 라이트 모드 간의 전환을 관리합니다.
 */
class ThemeContext {
    constructor() {
      // 초기 테마 설정
      this.isDarkMode = this.getInitialTheme();
      this.listeners = [];
      
      // 초기 테마 적용
      this.applyTheme();
      
      // 시스템 테마 변경 감지
      this.setupSystemThemeListener();
    }
    
    /**
     * 초기 테마 상태를 결정합니다.
     * 로컬 스토리지 또는 시스템 설정 기반
     * @returns {boolean} 다크 모드 여부
     */
    getInitialTheme() {
      // 로컬 스토리지에서 테마 설정 가져오기
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      
      // 시스템 기본 설정 확인
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    /**
     * 테마 전환 함수
     */
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode;
      this.applyTheme();
      this.notifyListeners();
    }
    
    /**
     * 특정 테마 직접 설정 함수
     * @param {boolean} isDark - 다크 모드 여부
     */
    setTheme(isDark) {
      if (this.isDarkMode !== isDark) {
        this.isDarkMode = isDark;
        this.applyTheme();
        this.notifyListeners();
      }
    }
    
    /**
     * 테마 변경 리스너 등록
     * @param {Function} listener - 테마 변경 시 호출할 콜백 함수
     */
    addThemeChangeListener(listener) {
      this.listeners.push(listener);
    }
    
    /**
     * 테마 변경 리스너 제거
     * @param {Function} listener - 제거할 리스너 함수
     */
    removeThemeChangeListener(listener) {
      const index = this.listeners.indexOf(listener);
      if (index !== -1) {
        this.listeners.splice(index, 1);
      }
    }
    
    /**
     * 등록된 모든 리스너에게 테마 변경 알림
     */
    notifyListeners() {
      this.listeners.forEach(listener => {
        listener(this.isDarkMode);
      });
    }
    
    /**
     * 테마 변경 적용
     */
    applyTheme() {
      // 루트 요소에 클래스 적용
      document.documentElement.classList.toggle('dark-theme', this.isDarkMode);
      document.documentElement.classList.toggle('light-theme', !this.isDarkMode);
      
      // CSS 변수 업데이트
      if (this.isDarkMode) {
        document.documentElement.style.setProperty('--bg-color', '#1e2021');
        document.documentElement.style.setProperty('--text-color', '#ffffff');
        document.documentElement.style.setProperty('--card-bg', '#121212');
        document.documentElement.style.setProperty('--nav-bg', 'rgba(18, 18, 18, 0.7)');
      } else {
        document.documentElement.style.setProperty('--bg-color', '#f5f5f7');
        document.documentElement.style.setProperty('--text-color', '#333333');
        document.documentElement.style.setProperty('--card-bg', '#ffffff');
        document.documentElement.style.setProperty('--nav-bg', 'rgba(255, 255, 255, 0.7)');
      }
      
      // 로컬 스토리지에 테마 설정 저장
      localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    }
    
    /**
     * 시스템 테마 변경 감지 설정
     */
    setupSystemThemeListener() {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleChange = (e) => {
        // 사용자가 직접 테마를 선택한 적이 없으면 시스템 설정을 따름
        if (!localStorage.getItem('theme')) {
          this.setTheme(e.matches);
        }
      };
      
      // 이벤트 리스너 등록
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
      } else {
        // 이전 버전 브라우저 지원
        mediaQuery.addListener(handleChange);
      }
    }
  }