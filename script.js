// SalesForecaster.io Marketing Site

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
  '.problem-card, .feature-card, .comparison-card, .pricing-card, .flow-step, .value-panel, .health-point, .matthew-inner'
).forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity 0.5s ${i * 0.07}s ease, transform 0.5s ${i * 0.07}s ease`;
  observer.observe(el);
});

// Demo form — sends to erik@salesforecaster.io
const form = document.getElementById('demo-form');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const inputs = form.querySelectorAll('input, select');
    const data = {};
    inputs.forEach(input => {
      if (input.placeholder) data[input.placeholder] = input.value;
    });

    const subject = encodeURIComponent('SalesForecaster.io Demo Request — ' + (data['Company Name'] || 'New Lead'));
    const body = encodeURIComponent(
      'Demo Request from SalesForecaster.io

' +
      Object.entries(data).map(([k, v]) => k + ': ' + v).join('
')
    );

    window.location.href = `mailto:erik@salesforecaster.io?subject=${subject}&body=${body}`;

    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = "Opening your email client...";
    btn.style.background = '#5abf3c';
  });
}

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
