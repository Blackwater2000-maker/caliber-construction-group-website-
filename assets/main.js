/* ============================================================
   CALIBER CONSTRUCTION GROUP — main.js
   ============================================================ */

(function () {
  'use strict';

  // ---- NAV SCROLL STATE ----
  const siteNav = document.querySelector('.site-nav');
  if (siteNav) {
    window.addEventListener('scroll', () => {
      siteNav.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  // ---- HAMBURGER MENU ----
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileNav = document.querySelector('.nav-mobile');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      hamburger.classList.toggle('active', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!siteNav?.contains(e.target)) {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // ---- SCROLL FADE-IN ANIMATIONS ----
  const fadeEls = document.querySelectorAll('.fade-in');

  if (fadeEls.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    fadeEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: show immediately
    fadeEls.forEach(el => el.classList.add('visible'));
  }

  // ---- MOBILE STICKY BOTTOM BAR ----
  const mobileCta = document.querySelector('.mobile-cta-bar');
  if (mobileCta) {
    let shown = false;
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300 && !shown) {
        mobileCta.style.opacity = '1';
        shown = true;
      } else if (window.scrollY <= 300 && shown) {
        mobileCta.style.opacity = '0';
        shown = false;
      }
    }, { passive: true });
    // Initially hidden until scroll
    if (window.scrollY <= 300) {
      mobileCta.style.opacity = '0';
      mobileCta.style.transition = 'opacity 0.3s ease';
    }
  }

  // ---- VIDEO FALLBACK ----
  const heroVideo = document.querySelector('.hero-video');
  const heroFallback = document.querySelector('.hero-video-fallback');

  if (heroVideo && heroFallback) {
    heroVideo.addEventListener('error', () => {
      heroVideo.style.display = 'none';
      heroFallback.style.display = 'block';
    });

    // If video can't play (e.g., data saver)
    heroVideo.addEventListener('stalled', () => {
      setTimeout(() => {
        if (heroVideo.readyState < 2) {
          heroVideo.style.display = 'none';
          heroFallback.style.display = 'block';
        }
      }, 3000);
    });
  }

  // ---- SMOOTH SCROLL FOR ANCHOR LINKS ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---- FAQ ACCORDION ----
  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const body = trigger.nextElementSibling;
      const expanded = trigger.getAttribute('aria-expanded') === 'true';

      // Collapse all others
      document.querySelectorAll('.accordion-trigger').forEach(t => {
        if (t !== trigger) {
          t.setAttribute('aria-expanded', 'false');
          const b = t.nextElementSibling;
          if (b) b.style.maxHeight = '0';
        }
      });

      trigger.setAttribute('aria-expanded', !expanded);
      if (body) {
        body.style.maxHeight = expanded ? '0' : body.scrollHeight + 'px';
      }
    });
  });

  // ---- NAV DROPDOWN KEYBOARD SUPPORT ----
  document.querySelectorAll('.nav-dropdown-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const expanded = trigger.getAttribute('aria-expanded') === 'true';
      // Close all first
      document.querySelectorAll('.nav-dropdown-trigger').forEach(t => {
        t.setAttribute('aria-expanded', 'false');
      });
      if (!expanded) {
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Close dropdowns on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-links')) {
      document.querySelectorAll('.nav-dropdown-trigger').forEach(t => {
        t.setAttribute('aria-expanded', 'false');
      });
    }
  });

})();
