// macOS style top navbar with magnification effect
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    
    // Ensure header is at the top
    header.style.position = 'fixed';
    header.style.top = '0';
    header.style.width = '100%';
    header.style.backdropFilter = 'blur(10px)';
    header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
    header.style.transition = 'transform 0.3s ease';
    
    // Create a macOS-style container for the navigation links
    const macContainer = document.createElement('div');
    macContainer.className = 'mac-navbar-container';
    macContainer.style.display = 'flex';
    macContainer.style.justifyContent = 'center';
    macContainer.style.alignItems = 'center';
    macContainer.style.padding = '5px 0';
    
    // Preserve the original layout
    nav.style.justifyContent = 'space-between';
    
    if (navLinks) {
      // Clone the nav-links
      const macLinks = navLinks.cloneNode(true);
      macLinks.className = 'mac-navbar-links';
      macLinks.style.display = 'flex';
      macLinks.style.justifyContent = 'center';
      macLinks.style.alignItems = 'center';
      macLinks.style.gap = '20px';
      macLinks.style.transition = 'all 0.3s ease';
      
      // Style each link for macOS effect
      Array.from(macLinks.children).forEach(link => {
        if (link.classList.contains('nav-link')) {
          link.style.display = 'flex';
          link.style.alignItems = 'center';
          link.style.justifyContent = 'center';
          link.style.position = 'relative';
          link.style.transition = 'transform 0.2s ease, filter 0.2s ease';
          
          // Get the icon
          const icon = link.querySelector('.nav-link-icon');
          if (icon) {
            icon.style.width = '22px';
            icon.style.height = '22px';
            icon.style.transition = 'transform 0.2s ease';
          }
          
          // Get the text
          const text = link.querySelector('span');
          if (text) {
            text.style.fontSize = '14px';
            text.style.transition = 'transform 0.2s ease, opacity 0.2s ease';
          }
        }
      });
      
      // Add magnification effect to navbar links
      const applyMagnification = (event) => {
        const navRect = macLinks.getBoundingClientRect();
        const mouseX = event.clientX;
        
        Array.from(macLinks.querySelectorAll('.nav-link')).forEach(link => {
          const linkRect = link.getBoundingClientRect();
          const linkCenterX = linkRect.left + linkRect.width / 2;
          const distance = Math.abs(mouseX - linkCenterX);
          const maxDistance = 100; // Maximum distance where magnification is applied
          
          if (distance < maxDistance) {
            // Calculate scale based on distance (closer = larger)
            const scale = 1 + 0.15 * (1 - distance / maxDistance);
            
            // Apply scaling to the link
            link.style.transform = `scale(${scale})`;
            
            // Enhance the icon
            const icon = link.querySelector('.nav-link-icon');
            if (icon) {
              icon.style.transform = `scale(${scale * 1.1})`;
            }
            
            // Enhance the text
            const text = link.querySelector('span');
            if (text) {
              text.style.opacity = '1';
              text.style.fontWeight = 'bold';
            }
            
            link.style.zIndex = '10';
          } else {
            link.style.transform = 'scale(1)';
            
            const icon = link.querySelector('.nav-link-icon');
            if (icon) {
              icon.style.transform = 'scale(1)';
            }
            
            const text = link.querySelector('span');
            if (text) {
              text.style.opacity = '0.8';
              text.style.fontWeight = 'normal';
            }
            
            link.style.zIndex = '1';
          }
        });
      };
      
      macLinks.addEventListener('mousemove', applyMagnification);
      macLinks.addEventListener('mouseleave', () => {
        Array.from(macLinks.querySelectorAll('.nav-link')).forEach(link => {
          link.style.transform = 'scale(1)';
          
          const icon = link.querySelector('.nav-link-icon');
          if (icon) {
            icon.style.transform = 'scale(1)';
          }
          
          const text = link.querySelector('span');
          if (text) {
            text.style.opacity = '0.8';
            text.style.fontWeight = 'normal';
          }
        });
      });
      
      // Replace the original nav-links with our mac links
      navLinks.parentNode.replaceChild(macLinks, navLinks);
    }
    
    // Add padding to the top of the page to account for fixed header
    document.body.style.paddingTop = `${header.offsetHeight}px`;
    
    // Show/hide logic for the navbar (hide on scroll down, show on scroll up)
    let lastScrollY = window.scrollY;
    let isVisible = true;
    
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      
      // Don't hide when at the top of page
      if (currentScrollY < 50) {
        if (!isVisible) {
          header.style.transform = 'translateY(0)';
          isVisible = true;
        }
        return;
      }
      
      // Otherwise, hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && isVisible) {
        header.style.transform = 'translateY(-100%)';
        isVisible = false;
      } else if (currentScrollY < lastScrollY && !isVisible) {
        header.style.transform = 'translateY(0)';
        isVisible = true;
      }
      
      lastScrollY = currentScrollY;
    }, { passive: true });
    
    // Handle hover effect for showing the navbar when it's hidden
    const navbarSensor = document.createElement('div');
    navbarSensor.style.position = 'fixed';
    navbarSensor.style.top = '0';
    navbarSensor.style.left = '0';
    navbarSensor.style.width = '100%';
    navbarSensor.style.height = '20px';
    navbarSensor.style.zIndex = '999';
    document.body.appendChild(navbarSensor);
    
    navbarSensor.addEventListener('mouseenter', () => {
      if (!isVisible) {
        header.style.transform = 'translateY(0)';
        isVisible = true;
      }
    });
    
    // Handle window resize to update dimensions
    window.addEventListener('resize', () => {
      document.body.style.paddingTop = `${header.offsetHeight}px`;
    });
  });
