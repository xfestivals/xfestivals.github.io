/**
 * 3D 배경 효과 컴포넌트
 * Three.js를 사용하여 인터랙티브 파티클 배경을 생성합니다.
 */
class Background3D {
  /**
   * Background3D 컴포넌트 생성자
   * @param {HTMLElement} container - 3D 배경을 렌더링할 컨테이너 요소
   */
  constructor(container) {
    this.container = container;
    
    // 기본 속성 설정
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.particlesMesh = null;
    this.mouseX = 0;
    this.mouseY = 0;
    this.targetX = 0;
    this.targetY = 0;
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;
    
    // 초기화 및 애니메이션 시작
    this.init();
    this.animate();
    
    // 이벤트 리스너 등록
    this.addEventListeners();
  }
  
  /**
   * Three.js 초기화 및 파티클 시스템 생성
   */
  init() {
    // Scene 생성
    this.scene = new THREE.Scene();
    
    // 카메라 생성
    this.camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    this.camera.position.z = 30;
    
    // 렌더러 생성
    this.renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true
    });
    
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.container.appendChild(this.renderer.domElement);
    
    // 파티클 시스템 생성
    this.createParticles();
  }
  
  /**
   * 파티클 시스템 생성
   */
  createParticles() {
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);
    
    // 랜덤 위치 및 색상 설정
    for (let i = 0; i < particlesCount * 3; i += 3) {
      // 위치 (X, Y, Z)
      posArray[i] = (Math.random() - 0.5) * 100;      // X: -50 ~ 50
      posArray[i + 1] = (Math.random() - 0.5) * 100;  // Y: -50 ~ 50
      posArray[i + 2] = (Math.random() - 0.5) * 100;  // Z: -50 ~ 50
      
      // 색상 (R, G, B)
      const colorChoice = Math.random();
      if (colorChoice < 0.33) {
        // 파란색 계열 (액센트 컬러)
        colorsArray[i] = 0.1;      // R
        colorsArray[i + 1] = 0.3;  // G
        colorsArray[i + 2] = 0.8;  // B
      } else if (colorChoice < 0.66) {
        // 하늘색 계열 (보조 액센트)
        colorsArray[i] = 0.1;      // R
        colorsArray[i + 1] = 0.7;  // G
        colorsArray[i + 2] = 0.8;  // B
      } else {
        // 흰색 계열
        colorsArray[i] = 0.9;      // R
        colorsArray[i + 1] = 0.9;  // G
        colorsArray[i + 2] = 1.0;  // B
      }
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));
    
    // 파티클 재질 생성
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.2,
      transparent: true,
      opacity: 0.8,
      vertexColors: true,
      sizeAttenuation: true,
    });
    
    // 파티클 시스템 생성
    this.particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    this.scene.add(this.particlesMesh);
  }
  
  /**
   * 애니메이션 루프
   */
  animate() {
    requestAnimationFrame(this.animate.bind(this));
    
    // 파티클 회전
    if (this.particlesMesh) {
      this.particlesMesh.rotation.x += 0.0005;
      this.particlesMesh.rotation.y += 0.0005;
      
      // 마우스 반응성 추가
      this.particlesMesh.rotation.y += (this.targetX - this.particlesMesh.rotation.y) * 0.05;
      this.particlesMesh.rotation.x += (this.targetY - this.particlesMesh.rotation.x) * 0.05;
    }
    
    this.renderer.render(this.scene, this.camera);
  }
  
  /**
   * 이벤트 리스너 등록
   */
  addEventListeners() {
    // 마우스 움직임 이벤트
    document.addEventListener('mousemove', this.onDocumentMouseMove.bind(this));
    
    // 창 크기 조정 이벤트
    window.addEventListener('resize', this.onWindowResize.bind(this));
  }
  
  /**
   * 마우스 움직임 이벤트 핸들러
   * @param {MouseEvent} event - 마우스 이벤트
   */
  onDocumentMouseMove(event) {
    this.mouseX = (event.clientX - this.windowHalfX);
    this.mouseY = (event.clientY - this.windowHalfY);
    
    this.targetX = this.mouseX * 0.001;
    this.targetY = this.mouseY * 0.001;
  }
  
  /**
   * 창 크기 조정 이벤트 핸들러
   */
  onWindowResize() {
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;
    
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}/**
 * 3D 배경 효과 컴포넌트
 * Three.js를 사용하여 인터랙티브 파티클 배경을 생성합니다.
 */
class Background3D {
    /**
     * Background3D 컴포넌트 생성자
     * @param {HTMLElement} container - 3D 배경을 렌더링할 컨테이너 요소
     */
    constructor(container) {
      this.container = container;
      
      // 기본 속성 설정
      this.scene = null;
      this.camera = null;
      this.renderer = null;
      this.particlesMesh = null;
      this.mouseX = 0;
      this.mouseY = 0;
      this.targetX = 0;
      this.targetY = 0;
      this.windowHalfX = window.innerWidth / 2;
      this.windowHalfY = window.innerHeight / 2;
      
      // 초기화 및 애니메이션 시작
      this.init();
      this.animate();
      
      // 이벤트 리스너 등록
      this.addEventListeners();
    }
    
    /**
     * Three.js 초기화 및 파티클 시스템 생성
     */
    init() {
      // Scene 생성
      this.scene = new THREE.Scene();
      
      // 카메라 생성
      this.camera = new THREE.PerspectiveCamera(
        75, 
        window.innerWidth / window.innerHeight, 
        0.1, 
        1000
      );
      this.camera.position.z = 30;
      
      // 렌더러 생성
      this.renderer = new THREE.WebGLRenderer({ 
        alpha: true,
        antialias: true
      });
      
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.container.appendChild(this.renderer.domElement);
      
      // 파티클 시스템 생성
      this.createParticles();
    }
    
    /**
     * 파티클 시스템 생성
     */
    createParticles() {
      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = 1500;
      
      const posArray = new Float32Array(particlesCount * 3);
      const colorsArray = new Float32Array(particlesCount * 3);
      
      // 랜덤 위치 및 색상 설정
      for (let i = 0; i < particlesCount * 3; i += 3) {
        // 위치 (X, Y, Z)
        posArray[i] = (Math.random() - 0.5) * 100;      // X: -50 ~ 50
        posArray[i + 1] = (Math.random() - 0.5) * 100;  // Y: -50 ~ 50
        posArray[i + 2] = (Math.random() - 0.5) * 100;  // Z: -50 ~ 50
        
        // 색상 (R, G, B)
        const colorChoice = Math.random();
        if (colorChoice < 0.33) {
          // 파란색 계열 (액센트 컬러)
          colorsArray[i] = 0.1;      // R
          colorsArray[i + 1] = 0.3;  // G
          colorsArray[i + 2] = 0.8;  // B
        } else if (colorChoice < 0.66) {
          // 하늘색 계열 (보조 액센트)
          colorsArray[i] = 0.1;      // R
          colorsArray[i + 1] = 0.7;  // G
          colorsArray[i + 2] = 0.8;  // B
        } else {
          // 흰색 계열
          colorsArray[i] = 0.9;      // R
          colorsArray[i + 1] = 0.9;  // G
          colorsArray[i + 2] = 1.0;  // B
        }
      }
      
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));
      
      // 파티클 재질 생성
      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.2,
        transparent: true,
        opacity: 0.8,
        vertexColors: true,
        sizeAttenuation: true,
      });
      
      // 파티클 시스템 생성
      this.particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
      this.scene.add(this.particlesMesh);
    }
    
    /**
     * 애니메이션 루프
     */
    animate() {
      requestAnimationFrame(this.animate.bind(this));
      
      // 파티클 회전
      if (this.particlesMesh) {
        this.particlesMesh.rotation.x += 0.0005;
        this.particlesMesh.rotation.y += 0.0005;
        
        // 마우스 반응성 추가
        this.particlesMesh.rotation.y += (this.targetX - this.particlesMesh.rotation.y) * 0.05;
        this.particlesMesh.rotation.x += (this.targetY - this.particlesMesh.rotation.x) * 0.05;
      }
      
      this.renderer.render(this.scene, this.camera);
    }
    
    /**
     * 이벤트 리스너 등록
     */
    addEventListeners() {
      // 마우스 움직임 이벤트
      document.addEventListener('mousemove', this.onDocumentMouseMove.bind(this));
      
      // 창 크기 조정 이벤트
      window.addEventListener('resize', this.onWindowResize.bind(this));
    }
    
    /**
     * 마우스 움직임 이벤트 핸들러
     * @param {MouseEvent} event - 마우스 이벤트
     */
    onDocumentMouseMove(event) {
      this.mouseX = (event.clientX - this.windowHalfX);
      this.mouseY = (event.clientY - this.windowHalfY);
      
      this.targetX = this.mouseX * 0.001;
      this.targetY = this.mouseY * 0.001;
    }
    
    /**
     * 창 크기 조정 이벤트 핸들러
     */
    onWindowResize() {
      this.windowHalfX = window.innerWidth / 2;
      this.windowHalfY = window.innerHeight / 2;
      
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }