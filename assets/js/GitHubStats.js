/**
 * GitHub 통계 컴포넌트
 * GitHub 활동 통계 및 저장소 정보를 시각화합니다.
 */
class GitHubStats {
    /**
     * GitHubStats 컴포넌트 생성자
     * @param {HTMLElement} container - 내용을 렌더링할 컨테이너 요소
     */
    constructor(container) {
      this.container = container;
      this.isVisible = false;
      
      // GitHub 데이터 (실제로는 GitHub API를 통해 가져올 수 있음)
      this.gitHubData = {
        username: 'github-username',
        repos: 15,
        commits: 368,
        stars: 47,
        forks: 18,
        contributions: 412,
        languages: [
          { name: 'JavaScript', percentage: 45, color: '#f1e05a' },
          { name: 'HTML', percentage: 25, color: '#e34c26' },
          { name: 'CSS', percentage: 20, color: '#563d7c' },
          { name: 'Python', percentage: 10, color: '#3572A5' }
        ],
        topRepos: [
          { 
            name: 'e-commerce-dashboard', 
            stars: 15, 
            description: 'React와 D3.js를 활용한 e-커머스 대시보드',
            language: 'JavaScript'
          },
          { 
            name: 'school-management-system', 
            stars: 12, 
            description: '학교 관리를 위한 웹 애플리케이션',
            language: 'JavaScript'
          },
          { 
            name: 'personal-portfolio', 
            stars: 10, 
            description: '개인 포트폴리오 웹사이트',
            language: 'HTML'
          }
        ]
      };
      
      this.render();
      this.setupScrollAnimation();
    }
    
    /**
     * 특정 언어의 색상 반환
     * @param {string} language - 프로그래밍 언어명
     * @returns {string} 언어 색상 코드
     */
    getLanguageColor(language) {
      const languageObj = this.gitHubData.languages.find(lang => lang.name === language);
      return languageObj ? languageObj.color : '#ccc';
    }
    
    /**
     * GitHub 통계 컴포넌트 렌더링
     */
    render() {
      // 기존 내용 제거
      this.container.innerHTML = '';
      
      // 컨테이너 생성
      const statsContainer = document.createElement('div');
      statsContainer.className = 'container';
      
      // 섹션 타이틀 생성
      const sectionTitle = document.createElement('h2');
      sectionTitle.className = 'section-title';
      sectionTitle.innerHTML = 'GitHub <span class="text-accent">통계</span>';
      statsContainer.appendChild(sectionTitle);
      
      // 설명 텍스트 생성
      const description = document.createElement('p');
      description.className = 'section-description';
      description.textContent = '제 GitHub 활동 통계입니다. 코드와 오픈 소스 프로젝트에 대한 기여를 통해 지속적으로 성장하고 있습니다.';
      statsContainer.appendChild(description);
      
      // GitHub 통계 컨테이너
      const gitHubStatsContainer = document.createElement('div');
      gitHubStatsContainer.className = 'github-stats-container';
      
      // GitHub 프로필 정보
      const profile = this.createProfileSection();
      gitHubStatsContainer.appendChild(profile);
      
      // 통계 그리드
      const statsGrid = this.createStatsGrid();
      gitHubStatsContainer.appendChild(statsGrid);
      
      // 콘텐츠 그리드 (언어 및 저장소)
      const contentGrid = this.createContentGrid();
      gitHubStatsContainer.appendChild(contentGrid);
      
      // 기여 히트맵
      const heatmap = this.createHeatmap();
      gitHubStatsContainer.appendChild(heatmap);
      
      statsContainer.appendChild(gitHubStatsContainer);
      
      // GitHub CTA
      const githubCTA = document.createElement('div');
      githubCTA.className = 'github-cta';
      
      const ctaButton = document.createElement('a');
      ctaButton.href = `https://github.com/${this.gitHubData.username}`;
      ctaButton.className = 'github-cta-btn';
      ctaButton.target = '_blank';
      ctaButton.rel = 'noopener noreferrer';
      
      // GitHub 아이콘
      const githubIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      githubIcon.setAttribute('viewBox', '0 0 24 24');
      githubIcon.setAttribute('width', '24');
      githubIcon.setAttribute('height', '24');
      githubIcon.setAttribute('stroke', 'currentColor');
      githubIcon.setAttribute('fill', 'none');
      
      const iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      iconPath.setAttribute('d', 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22');
      
      githubIcon.appendChild(iconPath);
      ctaButton.appendChild(githubIcon);
      
      const buttonText = document.createTextNode('GitHub 프로필에서 더 많은 프로젝트 보기');
      ctaButton.appendChild(buttonText);
      
      githubCTA.appendChild(ctaButton);
      statsContainer.appendChild(githubCTA);
      
      this.container.appendChild(statsContainer);
    }
    
    /**
     * GitHub 프로필 섹션 생성
     * @returns {HTMLElement} 프로필 섹션 요소
     */
    createProfileSection() {
      const profile = document.createElement('div');
      profile.className = 'github-profile';
      
      // 아바타
      const avatar = document.createElement('div');
      avatar.className = 'github-avatar';
      
      const avatarImg = document.createElement('img');
      avatarImg.src = '/img/avatar.png';
      avatarImg.alt = 'GitHub Avatar';
      avatar.appendChild(avatarImg);
      
      // 사용자명
      const username = document.createElement('div');
      username.className = 'github-username';
      
      const githubIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      githubIcon.setAttribute('viewBox', '0 0 24 24');
      githubIcon.setAttribute('width', '20');
      githubIcon.setAttribute('height', '20');
      githubIcon.setAttribute('stroke', 'currentColor');
      githubIcon.setAttribute('fill', 'none');
      
      const iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      iconPath.setAttribute('d', 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22');
      
      githubIcon.appendChild(iconPath);
      username.appendChild(githubIcon);
      
      const usernameSpan = document.createElement('span');
      usernameSpan.textContent = this.gitHubData.username;
      username.appendChild(usernameSpan);
      
      // 프로필 링크
      const profileLink = document.createElement('a');
      profileLink.href = `https://github.com/${this.gitHubData.username}`;
      profileLink.className = 'github-profile-link';
      profileLink.target = '_blank';
      profileLink.rel = 'noopener noreferrer';
      
      profileLink.textContent = '프로필 방문';
      
      const linkIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      linkIcon.setAttribute('width', '16');
      linkIcon.setAttribute('height', '16');
      linkIcon.setAttribute('fill', 'currentColor');
      linkIcon.setAttribute('viewBox', '0 0 24 24');
      
      const linkPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      linkPath.setAttribute('d', 'M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z');
      
      linkIcon.appendChild(linkPath);
      profileLink.appendChild(linkIcon);
      
      // 프로필 섹션 조립
      profile.appendChild(avatar);
      profile.appendChild(username);
      profile.appendChild(profileLink);
      
      return profile;
    }
    
    /**
     * GitHub 통계 그리드 생성
     * @returns {HTMLElement} 통계 그리드 요소
     */
    createStatsGrid() {
      const statsGrid = document.createElement('div');
      statsGrid.className = 'github-stats-grid';
      
      // 저장소 통계
      const reposCard = this.createStatCard('저장소', this.gitHubData.repos, 'folder');
      statsGrid.appendChild(reposCard);
      
      // 커밋 통계
      const commitsCard = this.createStatCard('커밋', this.gitHubData.commits, 'check');
      statsGrid.appendChild(commitsCard);
      
      // 스타 통계
      const starsCard = this.createStatCard('스타', this.gitHubData.stars, 'star');
      statsGrid.appendChild(starsCard);
      
      // 포크 통계
      const forksCard = this.createStatCard('포크', this.gitHubData.forks, 'fork');
      statsGrid.appendChild(forksCard);
      
      return statsGrid;
    }
    
    /**
     * 통계 카드 생성
     * @param {string} label - 통계 레이블
     * @param {number} value - 통계 값
     * @param {string} iconType - 아이콘 유형
     * @returns {HTMLElement} 통계 카드 요소
     */
    createStatCard(label, value, iconType) {
      const card = document.createElement('div');
      card.className = 'github-stat-card';
      
      // 아이콘
      const iconContainer = document.createElement('div');
      iconContainer.className = 'stat-icon';
      
      const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      icon.setAttribute('viewBox', '0 0 24 24');
      icon.setAttribute('width', '24');
      icon.setAttribute('height', '24');
      icon.setAttribute('stroke', 'currentColor');
      icon.setAttribute('fill', 'none');
      
      let iconPath;
      
      switch (iconType) {
        case 'folder':
          iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          iconPath.setAttribute('d', 'M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z');
          break;
          
        case 'check':
          iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
          iconPath.setAttribute('points', '20 6 9 17 4 12');
          break;
          
        case 'star':
          iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
          iconPath.setAttribute('points', '12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2');
          break;
          
        case 'fork':
          iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          iconPath.setAttribute('d', 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4');
          
          const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
          polyline.setAttribute('points', '7 10 12 15 17 10');
          
          const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          line.setAttribute('x1', '12');
          line.setAttribute('y1', '15');
          line.setAttribute('x2', '12');
          line.setAttribute('y2', '3');
          
          icon.appendChild(polyline);
          icon.appendChild(line);
          break;
          
        default:
          iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
          iconPath.setAttribute('cx', '12');
          iconPath.setAttribute('cy', '12');
          iconPath.setAttribute('r', '10');
          break;
      }
      
      if (iconPath) {
        icon.appendChild(iconPath);
      }
      
      iconContainer.appendChild(icon);
      
      // 통계 정보
      const infoContainer = document.createElement('div');
      infoContainer.className = 'stat-info';
      
      const valueElement = document.createElement('div');
      valueElement.className = 'stat-value';
      valueElement.textContent = value;
      
      const labelElement = document.createElement('div');
      labelElement.className = 'stat-label';
      labelElement.textContent = label;
      
      infoContainer.appendChild(valueElement);
      infoContainer.appendChild(labelElement);
      
      // 카드 조립
      card.appendChild(iconContainer);
      card.appendChild(infoContainer);
      
      return card;
    }
    
    /**
     * 콘텐츠 그리드 생성 (언어 및 저장소)
     * @returns {HTMLElement} 콘텐츠 그리드 요소
     */
    createContentGrid() {
      const contentGrid = document.createElement('div');
      contentGrid.className = 'github-content-grid';
      
      // 주요 언어 섹션
      const languagesSection = this.createLanguagesSection();
      contentGrid.appendChild(languagesSection);
      
      // 인기 저장소 섹션
      const topReposSection = this.createTopReposSection();
      contentGrid.appendChild(topReposSection);
      
      return contentGrid;
    }
    
    /**
     * 주요 언어 섹션 생성
     * @returns {HTMLElement} 언어 섹션 요소
     */
    createLanguagesSection() {
      const languagesSection = document.createElement('div');
      languagesSection.className = 'github-languages';
      
      // 제목
      const title = document.createElement('h3');
      title.className = 'content-title';
      title.textContent = '주요 언어';
      languagesSection.appendChild(title);
      
      // 언어 컨테이너
      const languagesContainer = document.createElement('div');
      languagesContainer.className = 'languages-container';
      
      // 언어 바
      const languageBars = document.createElement('div');
      languageBars.className = 'languages-bars';
      
      this.gitHubData.languages.forEach(lang => {
        const langBar = document.createElement('div');
        langBar.className = 'language-bar';
        langBar.style.width = `${lang.percentage}%`;
        langBar.style.backgroundColor = lang.color;
        langBar.setAttribute('data-tooltip', `${lang.name}: ${lang.percentage}%`);
        languageBars.appendChild(langBar);
      });
      
      languagesContainer.appendChild(languageBars);
      
      // 언어 목록
      const languagesList = document.createElement('div');
      languagesList.className = 'languages-list';
      
      this.gitHubData.languages.forEach(lang => {
        const langItem = document.createElement('div');
        langItem.className = 'language-item';
        
        const langColor = document.createElement('div');
        langColor.className = 'language-color';
        langColor.style.backgroundColor = lang.color;
        
        const langName = document.createElement('div');
        langName.className = 'language-name';
        langName.textContent = lang.name;
        
        const langPercentage = document.createElement('div');
        langPercentage.className = 'language-percentage';
        langPercentage.textContent = `${lang.percentage}%`;
        
        langItem.appendChild(langColor);
        langItem.appendChild(langName);
        langItem.appendChild(langPercentage);
        
        languagesList.appendChild(langItem);
      });
      
      languagesContainer.appendChild(languagesList);
      languagesSection.appendChild(languagesContainer);
      
      return languagesSection;
    }
    
    /**
     * 인기 저장소 섹션 생성
     * @returns {HTMLElement} 저장소 섹션 요소
     */
    createTopReposSection() {
      const topReposSection = document.createElement('div');
      topReposSection.className = 'github-top-repos';
      
      // 제목
      const title = document.createElement('h3');
      title.className = 'content-title';
      title.textContent = '인기 저장소';
      topReposSection.appendChild(title);
      
      // 저장소 목록
      const reposList = document.createElement('div');
      reposList.className = 'top-repos-list';
      
      this.gitHubData.topRepos.forEach(repo => {
        const repoItem = document.createElement('div');
        repoItem.className = 'repo-item';
        
        // 저장소 헤더
        const repoHeader = document.createElement('div');
        repoHeader.className = 'repo-header';
        
        const repoName = document.createElement('h4');
        repoName.className = 'repo-name';
        repoName.textContent = repo.name;
        
        const repoStars = document.createElement('div');
        repoStars.className = 'repo-stars';
        
        const starIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        starIcon.setAttribute('viewBox', '0 0 24 24');
        starIcon.setAttribute('width', '16');
        starIcon.setAttribute('height', '16');
        starIcon.setAttribute('fill', 'currentColor');
        
        const starPath = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        starPath.setAttribute('points', '12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2');
        
        starIcon.appendChild(starPath);
        repoStars.appendChild(starIcon);
        
        const starsCount = document.createTextNode(repo.stars);
        repoStars.appendChild(starsCount);
        
        repoHeader.appendChild(repoName);
        repoHeader.appendChild(repoStars);
        
        // 저장소 설명
        const repoDescription = document.createElement('p');
        repoDescription.className = 'repo-description';
        repoDescription.textContent = repo.description;
        
        // 저장소 언어
        const repoLanguage = document.createElement('div');
        repoLanguage.className = 'repo-language';
        
        const langDot = document.createElement('span');
        langDot.className = 'language-dot';
        langDot.style.backgroundColor = this.getLanguageColor(repo.language);
        
        const langName = document.createTextNode(repo.language);
        
        repoLanguage.appendChild(langDot);
        repoLanguage.appendChild(langName);
        
        // 저장소 아이템 조립
        repoItem.appendChild(repoHeader);
        repoItem.appendChild(repoDescription);
        repoItem.appendChild(repoLanguage);
        
        reposList.appendChild(repoItem);
      });
      
      topReposSection.appendChild(reposList);
      
      return topReposSection;
    }
    
    /**
     * 기여 히트맵 생성
     * @returns {HTMLElement} 히트맵 요소
     */
    createHeatmap() {
      const heatmapSection = document.createElement('div');
      heatmapSection.className = 'github-heatmap';
      
      // 제목
      const title = document.createElement('h3');
      title.className = 'content-title';
      title.textContent = '기여 활동';
      heatmapSection.appendChild(title);
      
      // 히트맵 플레이스홀더
      const heatmapPlaceholder = document.createElement('div');
      heatmapPlaceholder.className = 'heatmap-placeholder';
      
      // 히트맵 그리드
      const heatmapGrid = document.createElement('div');
      heatmapGrid.className = 'heatmap-grid';
      
      // 가상의 히트맵 그리드 생성
      for (let weekIdx = 0; weekIdx < 52; weekIdx++) {
        const week = document.createElement('div');
        week.className = 'heatmap-week';
        
        for (let dayIdx = 0; dayIdx < 7; dayIdx++) {
          // 랜덤한 기여 수준 (0-4) 생성
          const level = Math.floor(Math.random() * 5);
          
          const day = document.createElement('div');
          day.className = `heatmap-day level-${level}`;
          day.setAttribute('data-tooltip', `${level} contributions`);
          
          week.appendChild(day);
        }
        
        heatmapGrid.appendChild(week);
      }
      
      heatmapPlaceholder.appendChild(heatmapGrid);
      
      // 히트맵 레이블
      const heatmapLabels = document.createElement('div');
      heatmapLabels.className = 'heatmap-labels';
      
      // 월 레이블
      const monthsLabels = document.createElement('div');
      monthsLabels.className = 'heatmap-months-labels';
      
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
      months.forEach(month => {
        const monthSpan = document.createElement('span');
        monthSpan.textContent = month;
        monthsLabels.appendChild(monthSpan);
      });
      
      heatmapLabels.appendChild(monthsLabels);
      
      // 히트맵 범례
      const heatmapLegend = document.createElement('div');
      heatmapLegend.className = 'heatmap-legend';
      
      const lessSpan = document.createElement('span');
      lessSpan.textContent = 'Less';
      
      const legendColors = document.createElement('div');
      legendColors.className = 'heatmap-legend-colors';
      
      for (let i = 0; i <= 4; i++) {
        const colorBlock = document.createElement('div');
        colorBlock.className = `level-${i}`;
        legendColors.appendChild(colorBlock);
      }
      
      const moreSpan = document.createElement('span');
      moreSpan.textContent = 'More';
      
      heatmapLegend.appendChild(lessSpan);
      heatmapLegend.appendChild(legendColors);
      heatmapLegend.appendChild(moreSpan);
      
      heatmapLabels.appendChild(heatmapLegend);
      heatmapPlaceholder.appendChild(heatmapLabels);
      
      heatmapSection.appendChild(heatmapPlaceholder);
      
      return heatmapSection;
    }
    
    /**
     * 스크롤 애니메이션 설정
     */
    setupScrollAnimation() {
      const handleScroll = () => {
        const statsContainer = document.querySelector('.github-stats-container');
        if (!statsContainer) return;
        
        const containerTop = statsContainer.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (containerTop < windowHeight * 0.8 && !this.isVisible) {
          this.isVisible = true;
          statsContainer.classList.add('animate');
        }
      };
      
      window.addEventListener('scroll', handleScroll);
      
      // 초기 로드 시 화면에 보이는지 확인
      setTimeout(handleScroll, 500);
    }
  }