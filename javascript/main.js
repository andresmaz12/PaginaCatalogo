export default class Main {
  constructor() {
    this.modules = [];
    this.init();
  }

  init() {
    this.loadModules();
    this.initModules();
  }

  loadModules() {
    import('./modules/MenuModule.js').then(module => {
      this.modules.push(new module.default());
    });
    
    import('./modules/CatalogModule.js').then(module => {
      this.modules.push(new module.default());
    });
  }

  initModules() {
    this.modules.forEach(module => {
      if (typeof module.init === 'function') {
        module.init();
      }
    });
  }
}
import { generarEnlaceWhatsApp } from './mensaje.js';

const botonWhatsApp = document.getElementById("btn-whatsapp");
botonWhatsApp.addEventListener("click", () => {
    const url = generarEnlaceWhatsApp("+50259583161", "Quiero información");
    window.open(url, "_blank");});

