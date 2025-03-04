// Theme Switching Functionality
const themeToggle = document.getElementById('themeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Function to set the theme
function setTheme(theme) {
    if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        updateThemeIcon('light');
    } else {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
        updateThemeIcon('dark');
    }
}

// Function to update the theme toggle icon
function updateThemeIcon(theme) {
    if (themeToggle) {
        if (theme === 'light') {
            themeToggle.innerHTML = `
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zm-2 5.79V18h-3.52L12 20.48 9.52 18H6v-3.52L3.52 12 6 9.52V6h3.52L12 3.52 14.48 6H18v3.52L20.48 12 18 14.48zM12 6.5c-3.03 0-5.5 2.47-5.5 5.5s2.47 5.5 5.5 5.5 5.5-2.47 5.5-5.5-2.47-5.5-5.5-5.5zm0 9c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/>
                    <circle cx="12" cy="12" r="2"/>
                </svg>
            `;
        } else {
            themeToggle.innerHTML = `
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z"/>
                    <path d="M9 9h6v6H9z"/>
                </svg>
            `;
        }
    }
}

// Check for saved theme preference or use the system preference
const currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
setTheme(currentTheme);

// Toggle theme when the button is clicked
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });
}

// Listen for system theme changes
prefersDarkScheme.addEventListener('change', (e) => {
    const newTheme = e.matches ? 'dark' : 'light';
    setTheme(newTheme);
});

// Language Selector Functionality
const languageBtn = document.getElementById('languageBtn');
const currentLang = document.querySelector('.current-lang');
const languageDropdown = document.querySelector('.language-dropdown');
const languageOptions = document.querySelectorAll('.language-option');

// Dictionary for translations
const translations = {
    en: {
        home: 'Home',
        projects: 'My Projects',
        about: 'About Me',
        connect: 'Let\'s Connect',
        location: 'Based in',
        getInTouch: 'Get In Touch',
        letsWork: 'Let\'s Work Together'
    },
    es: {
        home: 'Inicio',
        projects: 'Mis Proyectos',
        about: 'Sobre Mí',
        connect: 'Conectemos',
        location: 'Basado en',
        getInTouch: 'Ponte en Contacto',
        letsWork: 'Trabajemos Juntos'
    },
    ko: {
        home: '홈',
        projects: '프로젝트',
        about: '소개',
        connect: '연락하기',
        location: '위치',
        getInTouch: '연락처',
        letsWork: '함께 일해요'
    }
};

// Toggle language dropdown
if (languageBtn) {
    languageBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        languageDropdown.classList.toggle('show');
    });

    // Close dropdown when clicking elsewhere
    document.addEventListener('click', () => {
        if (languageDropdown.classList.contains('show')) {
            languageDropdown.classList.remove('show');
        }
    });
}

// Prevent clicks within dropdown from closing it
if (languageDropdown) {
    languageDropdown.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// Set active language and change content
if (languageOptions && languageOptions.length > 0) {
    languageOptions.forEach(option => {
        option.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            
            // Update active option
            languageOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            // Update button text
            if (currentLang) {
                currentLang.textContent = this.textContent;
            }
            
            // Save preference in localStorage
            localStorage.setItem('language', lang);
            
            // Update content based on selected language
            updateLanguage(lang);
        });
    });
}

// Function to update content based on language
function updateLanguage(lang) {
    if (!translations[lang]) return;
    
    // Update navigation links
    const homeLink = document.querySelector('.nav-link:nth-child(1) span');
    const projectsLink = document.querySelector('.nav-link:nth-child(2) span');
    const aboutLink = document.querySelector('.nav-link:nth-child(3) span');
    
    if (homeLink) homeLink.textContent = translations[lang].home;
    if (projectsLink) projectsLink.textContent = translations[lang].projects;
    if (aboutLink) aboutLink.textContent = translations[lang].about;
    
    // Update connect button
    const connectBtn = document.querySelector('.connect-btn');
    if (connectBtn && !connectBtn.querySelector('.accent-dot')) {
        connectBtn.textContent = translations[lang].connect;
    }
    
    // Update location text
    const locationEl = document.querySelector('.location');
    if (locationEl) {
        const locationText = locationEl.innerHTML.split('<br>');
        if (locationText.length > 1) {
            locationEl.innerHTML = `// ${translations[lang].location}<br>${locationText[1]}`;
        }
    }
    
    // Update contact section title if on about page
    const contactTitle = document.querySelector('.contact-section .section-title');
    if (contactTitle) {
        contactTitle.innerHTML = `${translations[lang].getInTouch} <span class="text-accent">Touch</span>`;
    }
    
    // Update work together button if on about page
    const workBtn = document.querySelector('#contact .connect-btn');
    if (workBtn && !workBtn.querySelector('.accent-dot')) {
        workBtn.textContent = translations[lang].letsWork;
    }
}

// Load saved language preference
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('language') || 'en';
    
    // Set active option
    if (languageOptions && languageOptions.length > 0) {
        languageOptions.forEach(option => {
            if (option.getAttribute('data-lang') === savedLang) {
                option.classList.add('active');
                if (currentLang) {
                    currentLang.textContent = option.textContent;
                }
            } else {
                option.classList.remove('active');
            }
        });
    }
    
    // Update content
    updateLanguage(savedLang);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== "#") {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});