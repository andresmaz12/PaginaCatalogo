export default class MenuModule {
  constructor() {
    this.menuToggle = document.querySelector('.menu-toggle');
    this.mainNav = document.getElementById('main-nav');
  }

  init() {
    if (this.menuToggle && this.mainNav) {
      this.setupEventListeners();
    }
  }

  setupEventListeners() {
    this.menuToggle.addEventListener('click', () => {
      const expanded = this.menuToggle.getAttribute('aria-expanded') === 'true';
      this.menuToggle.setAttribute('aria-expanded', !expanded);
      this.mainNav.style.display = expanded ? 'none' : 'block';
      
      if (!expanded) {
        this.mainNav.querySelector('a').focus();
      }
    });
  }
}