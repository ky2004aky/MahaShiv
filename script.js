/**
 * Maha Shivratri - Dynamic OLED Web UI
 * iPhone-like smooth animations and interactive effects
 */

document.addEventListener('DOMContentLoaded', () => {
  initParticleField();
  initNavbar();
  initScrollAnimations();
  initCardEffects();
  initMobileMenu();
  initSmoothScroll();
});

/**
 * Create dynamic particle/stars field - OLED ambient effect
 */
function initParticleField() {
  const container = document.getElementById('particles');
  if (!container) return;

  const particleCount = window.innerWidth < 768 ? 40 : 80;
  const symbols = ['✦', '•', '·', 'ॐ', '✧', '∗'];

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const symbol = symbols[Math.floor(Math.random() * symbols.length)];
    particle.textContent = symbol === 'ॐ' ? (Math.random() > 0.95 ? 'ॐ' : symbols[0]) : symbol;
    
    const size = Math.random() * 3 + 1;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 20 + 15;
    const delay = Math.random() * 5;
    const opacity = Math.random() * 0.5 + 0.1;

    particle.style.cssText = `
      left: ${x}%;
      top: ${y}%;
      font-size: ${size}px;
      opacity: ${opacity};
      animation: particleFloat ${duration}s ease-in-out ${delay}s infinite;
    `;

    container.appendChild(particle);
  }
}

/**
 * Navbar - hide on scroll down, show on scroll up (iPhone-like)
 */
function initNavbar() {
  const nav = document.querySelector('.nav-bar');
  if (!nav) return;

  let lastScrollY = window.scrollY;
  let ticking = false;

  const updateNavbar = () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY < 50) {
      nav.classList.remove('hidden');
    } else if (currentScrollY > lastScrollY) {
      nav.classList.add('hidden');
    } else {
      nav.classList.remove('hidden');
    }
    
    lastScrollY = currentScrollY;
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  }, { passive: true });
}

/**
 * Scroll-triggered animations - iPhone-like reveal
 */
function initScrollAnimations() {
  const ritualItems = document.querySelectorAll('.ritual-item');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const aboutCards = document.querySelectorAll('.about-card');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Stagger ritual items
  ritualItems.forEach((item, i) => {
    item.style.transitionDelay = `${i * 0.1}s`;
    observer.observe(item);
  });

  // Stagger gallery items
  galleryItems.forEach((item, i) => {
    item.style.transitionDelay = `${i * 0.08}s`;
    observer.observe(item);
  });

  // About cards - subtle entrance
  aboutCards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.1}s`;
    
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.2 });
    
    cardObserver.observe(card);
  });
}

/**
 * Card mouse-follow glow effect - dynamic OLED interaction
 */
function initCardEffects() {
  const cards = document.querySelectorAll('[data-tilt], .about-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);

      // Subtle 3D tilt (iPhone-like)
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const tiltX = (e.clientY - centerY) / 20;
      const tiltY = (e.clientX - centerX) / -20;

      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-8px) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
    });
  });
}

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav-bar');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      toggle.classList.toggle('active');
    });

    // Close on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.classList.remove('active');
      });
    });
  }
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}
