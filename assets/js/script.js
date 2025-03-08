/**
 * 메인 스크립트 파일
 * 페이지 로드 시 컴포넌트 초기화 및 이벤트 처리를 담당합니다.
 */
document.addEventListener('DOMContentLoaded', function() {
  // 모든 이미지에 로딩 클래스 추가
  initializeImageLoader();
  
  // 테마 관리자 초기화
  initializeThemeManager();
  
  // 컴포넌트 초기화
  initializeComponents();
  
  // 페이지 로더 숨기기
  setTimeout(hidePageLoader, 500);
});

/**
 * 이미지 로더 초기화
 */
function initializeImageLoader() {
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  images.forEach(img => {
    img.onload = function() {
      this.classList.add('loaded');
    };
    
    if (img.complete) {
      img.classList.add('loaded');
    }
  });
}

/**
 * 테마 관리자 초기화
 */
function initializeThemeManager() {
  // ThemeContext가 존재하는지 확인
  if (typeof ThemeContext !== 'undefined') {
    // ThemeContext 생성 및 전역 변수로 설정
    window.themeManager = new ThemeContext();
    
    // 테마 토글 버튼 요소 찾기
    const themeToggleContainer = document.getElementById('theme-toggle-container');
    if (themeToggleContainer && typeof ThemeToggle !== 'undefined') {
      const themeToggle = new ThemeToggle(window.themeManager);
      themeToggleContainer.appendChild(themeToggle.render());
    }
  }
}

/**
 * 컴포넌트 초기화
 */
function initializeComponents() {
  // Three.js 라이브러리 로드 확인
  const hasThreeJs = typeof THREE !== 'undefined';
  
  // 배경 3D 컴포넌트 초기화
  const background3DContainer = document.getElementById('background-3d');
  if (background3DContainer && hasThreeJs && typeof Background3D !== 'undefined') {
    try {
      new Background3D(background3DContainer);
    } catch (error) {
      console.error('Failed to initialize Background3D:', error);
    }
  } 
  
  // 학업 성취 컴포넌트 초기화
  const academicSection = document.getElementById('academic-section');
  if (academicSection && typeof AcademicAchievements !== 'undefined') {
    try {
      new AcademicAchievements(academicSection);
    } catch (error) {
      console.error('Failed to initialize AcademicAchievements:', error);
    }
  }
  
  // 애니메이션 타임라인 컴포넌트 초기화
  const timelineSection = document.getElementById('timeline-section');
  if (timelineSection && typeof AnimatedTimeline !== 'undefined') {
    try {
      new AnimatedTimeline(timelineSection);
    } catch (error) {
      console.error('Failed to initialize AnimatedTimeline:', error);
    }
  }
  
  // 필터링 가능한 프로젝트 컴포넌트 초기화
  const projectsSection = document.getElementById('projects-section');
  if (projectsSection && typeof FilterableProjects !== 'undefined') {
    try {
      new FilterableProjects(projectsSection);
    } catch (error) {
      console.error('Failed to initialize FilterableProjects:', error);
    }
  }
  
  // GitHub 통계 컴포넌트 초기화
  const githubSection = document.getElementById('github-stats-section');
  if (githubSection && typeof GitHubStats !== 'undefined') {
    try {
      new GitHubStats(githubSection);
    } catch (error) {
      console.error('Failed to initialize GitHubStats:', error);
    }
  }
  
  // 개인 소개문 컴포넌트 초기화
  const statementSection = document.getElementById('personal-statement-section');
  if (statementSection && typeof PersonalStatement !== 'undefined') {
    try {
      new PersonalStatement(statementSection);
    } catch (error) {
      console.error('Failed to initialize PersonalStatement:', error);
    }
  }
  
  // 프로젝트 캐러셀 컴포넌트 초기화
  const carouselSection = document.getElementById('project-carousel-section');
  if (carouselSection && typeof ProjectCarousel !== 'undefined') {
    try {
      new ProjectCarousel(carouselSection);
    } catch (error) {
      console.error('Failed to initialize ProjectCarousel:', error);
    }
  }
  
  // 학습 자료 섹션 컴포넌트 초기화
  const resourcesSection = document.getElementById('resources-section');
  if (resourcesSection && typeof ResourcesSection !== 'undefined') {
    try {
      new ResourcesSection(resourcesSection);
    } catch (error) {
      console.error('Failed to initialize ResourcesSection:', error);
    }
  }
  
  // 스킬 레이더 차트 컴포넌트 초기화
  const skillChartSection = document.getElementById('skill-chart-section');
  if (skillChartSection && typeof SkillRadarChart !== 'undefined') {
    try {
      new SkillRadarChart(skillChartSection);
    } catch (error) {
      console.error('Failed to initialize SkillRadarChart:', error);
    }
  }
}

/**
 * 페이지 로더 숨기기
 */
function hidePageLoader() {
  const pageLoader = document.querySelector('.page-loader');
  if (pageLoader) {
    pageLoader.style.opacity = '0';
    setTimeout(() => {
      pageLoader.style.display = 'none';
    }, 500);
  }
}