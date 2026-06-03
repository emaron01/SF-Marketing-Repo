// SalesForecaster.io Marketing Site

// Matthew demo video modal (Meet Matthew section)
(function () {
  const EMBED_URL = 'https://www.loom.com/embed/ef7a0fb1c81a4da2bba5a4feff7d1369';
  const modal = document.getElementById('matthew-video-modal');
  if (!modal) return;

  const frameHost = modal.querySelector('.matthew-video-modal-frame');
  const openers = document.querySelectorAll('[data-matthew-video-open]');
  const closers = modal.querySelectorAll('[data-matthew-video-close]');
  let lastActiveElement = null;

  function mountIframe() {
    if (!frameHost || frameHost.firstElementChild) return;
    const iframe = document.createElement('iframe');
    iframe.src = EMBED_URL;
    iframe.title = 'Watch Matthew demo video';
    iframe.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture');
    iframe.setAttribute('allowfullscreen', '');
    frameHost.appendChild(iframe);
  }

  function unmountIframe() {
    if (!frameHost) return;
    frameHost.innerHTML = '';
  }

  function openModal() {
    lastActiveElement = document.activeElement;
    mountIframe();
    modal.hidden = false;
    document.body.classList.add('matthew-video-modal-open');
    const closeButton = modal.querySelector('.matthew-video-modal-close');
    if (closeButton) closeButton.focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove('matthew-video-modal-open');
    unmountIframe();
    if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
      lastActiveElement.focus();
    }
  }

  openers.forEach((opener) => {
    opener.addEventListener('click', openModal);
  });

  closers.forEach((closer) => {
    closer.addEventListener('click', closeModal);
  });

  modal.addEventListener('click', (event) => {
    if (event.target === modal.querySelector('.matthew-video-modal-backdrop')) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal.hidden) {
      closeModal();
    }
  });
})();

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll(
  '.problem-card, .feature-card, .comparison-card, .pricing-card, .flow-step, .value-panel, .health-point, .matthew-inner, .sf-card, .feature-large, .medd-card, .screenshot-card, .contact-panel'
).forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity 0.5s ${i * 0.07}s ease, transform 0.5s ${i * 0.07}s ease`;
  observer.observe(el);
});

// Nav active state
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) link.style.color = '#1a6dcc';
  });
}, { passive: true });

// HubSpot form fallback — show contact details if form is blocked
(function () {
  const TIMEOUT_MS = 4000;
  const formFrame = document.getElementById('hs-form-frame');
  const fallback = document.getElementById('form-fallback');
  if (!formFrame || !fallback) return;

  const timer = setTimeout(function () {
    // If HubSpot hasn't rendered an iframe inside the form frame, show fallback
    const hsIframe = formFrame.querySelector('iframe');
    if (!hsIframe) {
      formFrame.style.display = 'none';
      fallback.style.display = 'block';
    }
  }, TIMEOUT_MS);

  // If HubSpot loads successfully, clear the timer
  window.addEventListener('message', function (e) {
    if (e.data && typeof e.data === 'string' && e.data.includes('hsFormCallback')) {
      clearTimeout(timer);
    }
  });
})();
