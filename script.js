// ==========================================
//  NAVBAR scroll effect
// ==========================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.background = window.scrollY > 40
    ? 'rgba(13,17,23,0.98)'
    : 'rgba(13,17,23,0.92)';
});

// ==========================================
//  Mobile nav toggle
// ==========================================
const navToggle = document.getElementById('navToggle');
const navLinks  = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);

// ==========================================
//  Fade-in on scroll
// ==========================================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });

document.querySelectorAll(
  '.skill-card, .project-card, .timeline-item, .contact-item, .about-grid'
).forEach(el => { el.classList.add('fade-in'); observer.observe(el); });

// ==========================================
//  Skill bar animation
// ==========================================
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.fill').forEach(fill => {
        fill.style.width = fill.style.width; // trigger reflow
      });
    }
  });
}, { threshold: 0.3 });

const profSection = document.querySelector('.proficiency');
if (profSection) barObserver.observe(profSection);

// Trigger bars when skills section visible
const skillsSection = document.getElementById('skills');
const skillsObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      document.querySelectorAll('.fill').forEach(fill => {
        const target = fill.style.width;
        fill.style.width = '0';
        requestAnimationFrame(() => {
          requestAnimationFrame(() => { fill.style.width = target; });
        });
      });
      skillsObs.disconnect();
    }
  });
}, { threshold: 0.2 });
if (skillsSection) skillsObs.observe(skillsSection);

// ==========================================
//  Project filter
// ==========================================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ==========================================
//  Project detail toggle
// ==========================================
document.querySelectorAll('.project-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const detail = btn.nextElementSibling;
    const isOpen = detail.classList.contains('open');
    detail.classList.toggle('open', !isOpen);
    btn.classList.toggle('open', !isOpen);
    btn.textContent = isOpen ? '자세히 보기 ▾' : '닫기 ▴';
  });
});

// ==========================================
//  Active nav link on scroll
// ==========================================
const sections = document.querySelectorAll('section[id]');
const navA = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 80) current = sec.id;
  });
  navA.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--accent)' : '';
  });
}, { passive: true });
