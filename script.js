const scrollElements = document.querySelectorAll('.scroll-section, .home-image img, .about-segment, .skill-card, .contact-card');

const elementInView = (el, offset = 0) => {
  const top = el.getBoundingClientRect().top;
  const height = (window.innerHeight || document.documentElement.clientHeight);
  return top <= height - offset;
};

const displayScrollElement = (el) => {
  el.classList.add('show');
};

const handleScrollAnimation = () => {
  scrollElements.forEach(el => {
    if (elementInView(el, 120)) {
      displayScrollElement(el);
    }
  });
};

window.addEventListener('scroll', handleScrollAnimation);
window.addEventListener('load', handleScrollAnimation);

const homeImg = document.querySelector('.home-image img');
const homeSection = document.querySelector('#home');
if (homeImg && homeSection) {
  const obs = new MutationObserver(() => {
    if (homeSection.classList.contains('show')) {
      homeImg.style.transform = 'translateX(0)';
      homeImg.style.opacity = '1';
    }
  });
  obs.observe(homeSection, { attributes: true, attributeFilter: ['class'] });
}

const aboutSegments = document.querySelectorAll('.about-segment');
aboutSegments.forEach(seg => {
  seg.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      seg.click();
    }
  });

  seg.addEventListener('click', () => {
    const isActive = seg.classList.contains('active');
    aboutSegments.forEach(s => {
      s.classList.remove('active');
      s.setAttribute('aria-expanded', 'false');
      const detail = s.querySelector('.seg-detail');
      if (detail) detail.setAttribute('aria-hidden', 'true');
    });
    if (!isActive) {
      seg.classList.add('active');
      seg.setAttribute('aria-expanded', 'true');
      const detail = seg.querySelector('.seg-detail');
      if (detail) detail.setAttribute('aria-hidden', 'false');
    }
  });

  seg.addEventListener('mouseenter', () => {
    seg.setAttribute('aria-expanded', 'true');
    const detail = seg.querySelector('.seg-detail');
    if (detail) detail.setAttribute('aria-hidden', 'false');
  });
  seg.addEventListener('mouseleave', () => {
    if (!seg.classList.contains('active')) {
      seg.setAttribute('aria-expanded', 'false');
      const detail = seg.querySelector('.seg-detail');
      if (detail) detail.setAttribute('aria-hidden', 'true');
    }
  });
});

document.addEventListener('click', (e) => {
  const inside = e.target.closest('.about-segment');
  if (!inside) {
    aboutSegments.forEach(s => {
      s.classList.remove('active');
      s.setAttribute('aria-expanded', 'false');
      const detail = s.querySelector('.seg-detail');
      if (detail) detail.setAttribute('aria-hidden', 'true');
    });
  }
});

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = a.getAttribute('href').replace('#','');
    const target = document.getElementById(targetId);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
