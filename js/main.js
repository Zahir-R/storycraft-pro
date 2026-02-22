import { initNavigation } from './components/navigation.js';
import { initModals } from './components/modal.js';
import { initFaq } from './components/faq.js';
import { initScrollEffects } from './components/scroll.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initModals();
  initFaq();
  initScrollEffects();
});
