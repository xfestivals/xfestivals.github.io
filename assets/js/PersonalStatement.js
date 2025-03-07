/**
 * 개인 소개문 섹션 컴포넌트
 * 개발자로서의 여정과 비전을 담은 소개문을 표시합니다.
 */
class PersonalStatement {
    /**
     * PersonalStatement 컴포넌트 생성자
     * @param {HTMLElement} container - 내용을 렌더링할 컨테이너 요소
     */
    constructor(container) {
      this.container = container;
      this.isVisible = false;
      
      this.render();
      this.setupScrollAnimation();
    }
    
    /**
     * 개인 소개문 컴포넌트 렌더링
     */
    render() {
      // 기존 내용 제거
      this.container.innerHTML = '';
      
      // 컨테이너 생성
      const statementContainer = document.createElement('div');
      statementContainer.className = 'container';
      
      // 소개문 컨테이너
      const innerContainer = document.createElement('div');
      innerContainer.className = 'statement-container';
      
      // 소개문 헤더
      const header = document.createElement('div');
      header.className = 'statement-header';
      
      // 아이콘
      const iconContainer = document.createElement('div');
      iconContainer.className = 'statement-icon';
      
      const shieldIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      shieldIcon.setAttribute('viewBox', '0 0 24 24');
      shieldIcon.setAttribute('width', '24');
      shieldIcon.setAttribute('height', '24');
      shieldIcon.setAttribute('stroke', 'currentColor');
      shieldIcon.setAttribute('fill', 'none');
      
      const iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      iconPath.setAttribute('d', 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z');
      
      shieldIcon.appendChild(iconPath);
      iconContainer.appendChild(shieldIcon);
      
      // 제목
      const title = document.createElement('h2');
      title.className = 'statement-title';
      title.innerHTML = '저의 여정과 <span class="text-accent">비전</span>';
      
      header.appendChild(iconContainer);
      header.appendChild(title);
      
      // 소개문 내용
      const content = document.createElement('div');
      content.className = 'statement-content';
      
      // 인용문
      const quote = document.createElement('div');
      quote.className = 'statement-quote';
      
      const quoteIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      quoteIcon.setAttribute('viewBox', '0 0 24 24');
      quoteIcon.setAttribute('width', '24');
      quoteIcon.setAttribute('height', '24');
      quoteIcon.setAttribute('stroke', 'currentColor');
      quoteIcon.setAttribute('fill', 'none');
      
      const quotePath1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      quotePath1.setAttribute('d', 'M10 11h-4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3zm10 0h-4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3z');
      
      const quotePath2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      quotePath2.setAttribute('d', 'M15 11v3a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1v-3m10 0v3a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1v-3');
      
      quoteIcon.appendChild(quotePath1);
      quoteIcon.appendChild(quotePath2);
      
      const blockquote = document.createElement('blockquote');
      blockquote.textContent = '기술은 단순한 도구가 아닌, 세상을 변화시키고 사람들의 삶을 개선하는 힘이라고 믿습니다.';
      
      quote.appendChild(quoteIcon);
      quote.appendChild(blockquote);
      
      content.appendChild(quote);
      
      // 소개문 단락들
      const paragraphs = [
        '어릴 때부터 컴퓨터와 디지털 기기에 매료되었습니다. 처음으로 HTML과 CSS를 배우고 간단한 웹페이지를 만들었을 때 느꼈던 그 성취감은 지금도 생생합니다. 그때부터 저는 기술이 가진 무한한 가능성에 빠져들었고, 디지털 세계에서 창조하는 기쁨을 발견했습니다.',
        '고등학교에 입학한 후, 저는 본격적으로 프로그래밍과 디자인을 독학하기 시작했습니다. 온라인 강의, 책, 오픈소스 프로젝트 등 다양한 자료를 통해 지식을 쌓았고, 학교 동아리에서 코딩을 가르치며 지식을 나누는 즐거움도 알게 되었습니다. 이 과정에서 저는 단순히 기술을 배우는 것을 넘어, 문제 해결 능력과 논리적 사고력을 키울 수 있었습니다.',
        '최근에는 교내 해커톤에 참가하여 팀원들과 함께 지역 사회 문제를 해결하는 앱을 개발했습니다. 이 경험을 통해 저는 기술이 실제 삶에 미치는 영향력을 체감할 수 있었고, 더 나아가 사용자 경험과 접근성에 대한 깊은 이해의 중요성을 깨달았습니다.',
        '대학에서는 컴퓨터 과학과 인공지능을 전공하며, 더 깊이 있는 지식과 실무 경험을 쌓고 싶습니다. 특히 교육 기술(EdTech)과 접근성 향상을 위한 디지털 솔루션 개발에 관심이 있으며, 모든 사람이 기술의 혜택을 평등하게 누릴 수 있는 세상을 만드는 데 기여하고 싶습니다.',
        '저는 기술이 단순한 도구가 아닌, 세상을 변화시키고 사람들의 삶을 개선하는 힘이라고 믿습니다. 디자인과 개발의 균형을 찾아 사용자 중심의 디지털 경험을 창조하는 것이 저의 목표입니다. 대학에서 배우게 될 지식과 경험을 바탕으로, 미래에는 혁신적인 기술 솔루션을 통해 사회적 가치를 창출하는 개발자가 되고 싶습니다.'
      ];
      
      paragraphs.forEach(text => {
        const paragraph = document.createElement('p');
        paragraph.textContent = text;
        content.appendChild(paragraph);
      });
      
      // 미래 목표 섹션
      const visionSection = document.createElement('div');
      visionSection.className = 'statement-vision';
      
      const visionTitle = document.createElement('h3');
      visionTitle.textContent = '미래 목표';
      visionSection.appendChild(visionTitle);
      
      const visionList = document.createElement('ul');
      
      const visionItems = [
        {
          title: '교육 접근성 향상을 위한 기술 개발',
          description: '모든 학생들이 질 높은 교육 자료에 접근할 수 있는 디지털 플랫폼 개발에 기여하고 싶습니다.'
        },
        {
          title: '사용자 중심 디자인과 개발 철학 확립',
          description: '기술적 우수성과 사용자 경험을 모두 충족시키는 디지털 제품을 만들기 위한 철학과 방법론을 발전시키겠습니다.'
        },
        {
          title: '지식 공유와 오픈 소스 참여',
          description: '배움의 과정에서 얻은 지식을 커뮤니티와 공유하고, 오픈 소스 프로젝트에 적극적으로 기여하겠습니다.'
        }
      ];
      
      visionItems.forEach((item, index) => {
        const listItem = document.createElement('li');
        
        const marker = document.createElement('span');
        marker.className = 'vision-marker';
        marker.textContent = (index + 1).toString();
        
        const itemContent = document.createElement('div');
        itemContent.className = 'vision-content';
        
        const itemTitle = document.createElement('h4');
        itemTitle.textContent = item.title;
        
        const itemDescription = document.createElement('p');
        itemDescription.textContent = item.description;
        
        itemContent.appendChild(itemTitle);
        itemContent.appendChild(itemDescription);
        
        listItem.appendChild(marker);
        listItem.appendChild(itemContent);
        
        visionList.appendChild(listItem);
      });
      
      visionSection.appendChild(visionList);
      content.appendChild(visionSection);
      
      // 서명
      const signature = document.createElement('div');
      signature.className = 'statement-signature';
      
      const signatureText = document.createElement('p');
      signatureText.textContent = '기술로 더 나은 세상을 만들고자 하는 열정을 가진';
      
      const signatureName = document.createElement('span');
      signatureName.className = 'signature-name';
      signatureName.textContent = 'Y';
      
      signature.appendChild(signatureText);
      signature.appendChild(signatureName);
      
      content.appendChild(signature);
      
      // 요소 조립
      innerContainer.appendChild(header);
      innerContainer.appendChild(content);
      statementContainer.appendChild(innerContainer);
      this.container.appendChild(statementContainer);
    }
    
    /**
     * 스크롤 애니메이션 설정
     */
    setupScrollAnimation() {
      const handleScroll = () => {
        const statement = document.querySelector('.statement-container');
        if (!statement) return;
        
        const statementTop = statement.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (statementTop < windowHeight * 0.8 && !this.isVisible) {
          this.isVisible = true;
          statement.classList.add('animate');
        }
      };
      
      window.addEventListener('scroll', handleScroll);
      
      // 초기 로드 시 화면에 보이는지 확인
      setTimeout(handleScroll, 500);
    }
  }