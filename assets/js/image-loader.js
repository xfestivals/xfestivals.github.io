/**
 * 이미지 로딩 최적화 스크립트
 * - 이미지가 로드된 후 페이드인 효과 적용
 * - 스크롤 시 지연 로딩 구현
 */
document.addEventListener('DOMContentLoaded', function() {
    // 모든 이미지에 로딩 클래스 추가
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    // 각 이미지에 로드 이벤트 리스너 추가
    images.forEach(img => {
      // 이미지 로드 완료 시 클래스 추가
      img.onload = function() {
        this.classList.add('loaded');
      };
      
      // 이미 캐시된 이미지에 대한 처리
      if (img.complete) {
        img.classList.add('loaded');
      }
    });
    
    // 인터섹션 옵저버를 사용한 이미지 지연 로딩
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.getAttribute('data-src');
            
            if (src) {
              img.src = src;
              img.removeAttribute('data-src');
            }
            
            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.01
      });
      
      // data-src 속성이 있는 이미지를 관찰
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    } else {
      // 인터섹션 옵저버를 지원하지 않는 브라우저를 위한 폴백
      const lazyLoad = function() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        lazyImages.forEach(img => {
          if (isInViewport(img)) {
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
          }
        });
      };
      
      // 뷰포트 내 요소 확인 함수
      const isInViewport = function(el) {
        const rect = el.getBoundingClientRect();
        
        return (
          rect.bottom >= 0 &&
          rect.right >= 0 &&
          rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.left <= (window.innerWidth || document.documentElement.clientWidth)
        );
      };
      
      // 스크롤 이벤트에 지연 로딩 함수 연결
      window.addEventListener('scroll', lazyLoad);
      window.addEventListener('resize', lazyLoad);
      window.addEventListener('orientationchange', lazyLoad);
      
      // 초기 로딩
      lazyLoad();
    }
    
    // 부드러운 스크롤 구현
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // 헤더 높이 고려
            behavior: 'smooth'
          });
        }
      });
    });
  });