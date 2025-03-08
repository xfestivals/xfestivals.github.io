document.addEventListener('DOMContentLoaded', function() {
  // 테마 선택기 초기화
  initThemeSwitcher();
  
  // 모바일 메뉴 초기화
  initMobileMenu();
  
  // 언어 선택기 초기화
  initLanguageSelector();
});

// 테마 선택기 초기화
function initThemeSwitcher() {
  // 로컬 스토리지에서 저장된 테마 가져오기
  const savedTheme = localStorage.getItem('colorTheme') || 'theme-blue';
  
  // 저장된 테마 적용
  document.body.className = document.body.className.replace(/theme-\w+/g, '').trim();
  document.body.classList.add(savedTheme);
  
  // 테마 메뉴 버튼과 드롭다운
  const themeBtn = document.getElementById('themeBtn');
  const themeDropdown = document.querySelector('.theme-dropdown');
  
  // 테마 옵션들
  const themeOptions = document.querySelectorAll('.theme-option');
  
  // 테마 버튼 클릭 이벤트
  if(themeBtn) {
    themeBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      themeDropdown.classList.toggle('show');
    });
  }
  
  // 테마 옵션 클릭 이벤트
  themeOptions.forEach(option => {
    // 저장된 테마에 맞는 옵션 활성화
    if (option.getAttribute('data-theme') === savedTheme) {
      option.classList.add('active');
    }
    
    option.addEventListener('click', function() {
      // 이전 활성 옵션 비활성화
      themeOptions.forEach(opt => opt.classList.remove('active'));
      
      // 현재 옵션 활성화
      this.classList.add('active');
      
      // 테마 변경
      const theme = this.getAttribute('data-theme');
      document.body.className = document.body.className.replace(/theme-\w+/g, '').trim();
      document.body.classList.add(theme);
      
      // 로컬 스토리지에 저장
      localStorage.setItem('colorTheme', theme);
      
      // 드롭다운 닫기
      themeDropdown.classList.remove('show');
      
      // 모바일 팔레트 옵션도 업데이트
      updateMobilePaletteOptions(theme);
    });
  });
  
  // 모바일 팔레트 옵션에 이벤트 리스너 추가
  const mobilePaletteOptions = document.querySelectorAll('.mobile-palette-option');
  mobilePaletteOptions.forEach(option => {
    // 저장된 테마에 맞는 옵션 활성화
    if (option.dataset.theme === savedTheme) {
      option.classList.add('active');
    }
    
    option.addEventListener('click', function() {
      // 이전 활성 옵션 비활성화
      mobilePaletteOptions.forEach(opt => opt.classList.remove('active'));
      
      // 현재 옵션 활성화
      this.classList.add('active');
      
      // 테마 변경
      const theme = this.dataset.theme;
      document.body.className = document.body.className.replace(/theme-\w+/g, '').trim();
      document.body.classList.add(theme);
      
      // 로컬 스토리지에 저장
      localStorage.setItem('colorTheme', theme);
      
      // 데스크톱 테마 옵션도 업데이트
      updateDesktopThemeOptions(theme);
    });
  });
  
  // 다른 곳 클릭 시 드롭다운 닫기
  document.addEventListener('click', function() {
    if(themeDropdown) {
      themeDropdown.classList.remove('show');
    }
  });
}

// 모바일 메뉴 초기화
function initMobileMenu() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const menuClose = document.querySelector('.mobile-menu-close');
  const menuOverlay = document.querySelector('.menu-overlay');
  
  if (!menuToggle || !mobileMenu || !menuClose || !menuOverlay) return;
  
  // 메뉴 토글 버튼 클릭 이벤트
  menuToggle.addEventListener('click', function() {
    mobileMenu.classList.add('show');
    menuOverlay.classList.add('show');
    document.body.style.overflow = 'hidden'; // 스크롤 방지
  });
  
  // 메뉴 닫기 버튼 클릭 이벤트
  menuClose.addEventListener('click', closeMenu);
  
  // 오버레이 클릭 이벤트
  menuOverlay.addEventListener('click', closeMenu);
  
  // 메뉴 닫기 함수
  function closeMenu() {
    mobileMenu.classList.remove('show');
    menuOverlay.classList.remove('show');
    document.body.style.overflow = ''; // 스크롤 허용
  }
  
  // 모바일 메뉴 링크 클릭 시 메뉴 닫기
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

// 언어 선택기 초기화
function initLanguageSelector() {
  // 데스크톱 언어 선택기
  const languageBtn = document.getElementById('languageBtn');
  const languageDropdown = document.querySelector('.language-dropdown');
  const languageOptions = document.querySelectorAll('.language-option');
  
  if (!languageBtn || !languageDropdown || !languageOptions.length) return;
  
  // 언어 버튼 클릭 이벤트
  languageBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    languageDropdown.classList.toggle('show');
  });
  
  // 언어 옵션 클릭 이벤트
  languageOptions.forEach(option => {
    option.addEventListener('click', function(e) {
      e.stopPropagation();
      
      // 이전 활성 옵션 비활성화
      languageOptions.forEach(opt => opt.classList.remove('active'));
      
      // 현재 옵션 활성화
      this.classList.add('active');
      
      // 텍스트 업데이트
      const lang = this.dataset.lang;
      const langText = this.textContent;
      document.querySelector('.current-lang').textContent = langText;
      
      // 로컬 스토리지에 저장
      localStorage.setItem('language', lang);
      
      // 드롭다운 닫기
      languageDropdown.classList.remove('show');
      
      // 언어 변경 로직 구현 (필요시)
      // changeLanguage(lang);
      
      // 모바일 언어 옵션도 업데이트
      updateMobileLanguageOptions(lang);
    });
  });
  
  // 모바일 언어 옵션
  const mobileLanguageOptions = document.querySelectorAll('.mobile-language-option');
  if (mobileLanguageOptions.length) {
    mobileLanguageOptions.forEach(option => {
      option.addEventListener('click', function() {
        // 이전 활성 옵션 비활성화
        mobileLanguageOptions.forEach(opt => opt.classList.remove('active'));
        
        // 현재 옵션 활성화
        this.classList.add('active');
        
        // 텍스트 업데이트
        const lang = this.dataset.lang;
        const langText = this.textContent;
        const currentLang = document.querySelector('.current-lang');
        if (currentLang) {
          currentLang.textContent = langText;
        }
        
        // 로컬 스토리지에 저장
        localStorage.setItem('language', lang);
        
        // 언어 변경 로직 구현 (필요시)
        // changeLanguage(lang);
        
        // 데스크톱 언어 옵션도 업데이트
        updateDesktopLanguageOptions(lang);
      });
    });
  }
  
  // 저장된 언어 설정 적용
  const savedLanguage = localStorage.getItem('language') || 'en';
  
  // 데스크톱 언어 옵션 업데이트
  updateDesktopLanguageOptions(savedLanguage);
  
  // 모바일 언어 옵션 업데이트
  updateMobileLanguageOptions(savedLanguage);
}

// 데스크톱 테마 옵션 업데이트
function updateDesktopThemeOptions(theme) {
  const themeOptions = document.querySelectorAll('.theme-option');
  themeOptions.forEach(option => {
    option.classList.remove('active');
    if (option.getAttribute('data-theme') === theme) {
      option.classList.add('active');
    }
  });
}

// 모바일 팔레트 옵션 업데이트
function updateMobilePaletteOptions(theme) {
  const mobilePaletteOptions = document.querySelectorAll('.mobile-palette-option');
  mobilePaletteOptions.forEach(option => {
    option.classList.remove('active');
    if (option.dataset.theme === theme) {
      option.classList.add('active');
    }
  });
}

// 데스크톱 언어 옵션 업데이트
function updateDesktopLanguageOptions(lang) {
  const languageOptions = document.querySelectorAll('.language-option');
  let selectedText = 'English'; // 기본값
  
  languageOptions.forEach(option => {
    option.classList.remove('active');
    if (option.dataset.lang === lang) {
      option.classList.add('active');
      selectedText = option.textContent;
    }
  });
  
  const currentLang = document.querySelector('.current-lang');
  if (currentLang) {
    currentLang.textContent = selectedText;
  }
}

// 모바일 언어 옵션 업데이트
function updateMobileLanguageOptions(lang) {
  const mobileLanguageOptions = document.querySelectorAll('.mobile-language-option');
  
  mobileLanguageOptions.forEach(option => {
    option.classList.remove('active');
    if (option.dataset.lang === lang) {
      option.classList.add('active');
    }
  });
}