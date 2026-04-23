// ============================================
// NARAYAN JOSHI — PORTFOLIO JS
// ============================================

(function () {
  'use strict';

  // --- CUSTOM CURSOR ---
  const cursorDot = document.getElementById('cursor-dot');
  const cursorRing = document.getElementById('cursor-ring');
  const spotlight = document.getElementById('spotlight');
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (isTouch) {
    // Hide custom cursor on touch devices, restore default
    if (cursorDot) cursorDot.style.display = 'none';
    if (cursorRing) cursorRing.style.display = 'none';
    if (spotlight) spotlight.style.display = 'none';
    document.body.style.cursor = 'auto';
    document.querySelectorAll('a, button').forEach(el => el.style.cursor = 'auto');
  } else {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Dot follows instantly
      if (cursorDot) {
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
      }

      // Spotlight follows instantly
      if (spotlight) {
        spotlight.style.left = mouseX + 'px';
        spotlight.style.top = mouseY + 'px';
      }
    });

    // Ring trails with smooth lerp
    function animateRing() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      if (cursorRing) {
        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top = ringY + 'px';
      }
      requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover states
    const hoverTargets = document.querySelectorAll(
      'a, button, .project-card, .skill-pill, .cert-card, .exp-item'
    );
    hoverTargets.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursorDot?.classList.add('hovering');
        cursorRing?.classList.add('hovering');
      });
      el.addEventListener('mouseleave', () => {
        cursorDot?.classList.remove('hovering');
        cursorRing?.classList.remove('hovering');
      });
    });
  }

  // --- PROJECT CARD MOUSE GLOW ---
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', x + '%');
      card.style.setProperty('--mouse-y', y + '%');
    });
  });

  // --- SCROLL REVEAL ---
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach((el) => {
    revealObserver.observe(el);
  });

  // --- ACTIVE NAV TRACKING ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.sidebar-nav a, .mobile-nav-overlay a');

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('active');
            }
          });
        }
      });
    },
    { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' }
  );

  sections.forEach((section) => navObserver.observe(section));

  // --- ROLE CYCLER (Typing Effect) ---
  const roleEl = document.getElementById('role-text');
  if (roleEl) {
    const roles = [
      'Backend Developer',
      'AI/ML Engineer',
      'RAG Architect',
      'Full-Stack Builder',
      'LLM Engineer',
    ];
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let currentText = '';
    const typeSpeed = 60;
    const deleteSpeed = 35;
    const pauseTime = 2000;

    function typeRole() {
      const target = roles[roleIdx];

      if (!isDeleting) {
        currentText = target.substring(0, charIdx + 1);
        charIdx++;
      } else {
        currentText = target.substring(0, charIdx - 1);
        charIdx--;
      }

      roleEl.textContent = currentText;

      let delay = isDeleting ? deleteSpeed : typeSpeed;

      if (!isDeleting && charIdx === target.length) {
        delay = pauseTime;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        delay = 300;
      }

      setTimeout(typeRole, delay);
    }

    // Start after a brief delay
    setTimeout(typeRole, 1200);
  }

  // --- MOBILE MENU ---
  const menuToggle = document.getElementById('menu-toggle');
  const mobileOverlay = document.getElementById('mobile-nav-overlay');
  const mobileClose = document.getElementById('mobile-nav-close');

  if (menuToggle && mobileOverlay) {
    menuToggle.addEventListener('click', () => {
      mobileOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    const closeMenu = () => {
      mobileOverlay.classList.remove('open');
      document.body.style.overflow = '';
    };

    if (mobileClose) {
      mobileClose.addEventListener('click', closeMenu);
    }

    mobileOverlay.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });
  }

  // --- SMOOTH SCROLL FOR NAV LINKS ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();
