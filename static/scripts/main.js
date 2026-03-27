/**
 * БФ «ФИЛАНТРОП» — Main JavaScript
 */

(function() {
  'use strict';

  // Set current year in footer
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Accessibility mode toggle
  const accessibilityToggle = document.getElementById('accessibility-toggle');
  const body = document.body;

  // Load saved preference
  const savedMode = localStorage.getItem('accessibilityMode');
  if (savedMode === 'true') {
    body.classList.add('accessibility-mode');
    if (accessibilityToggle) {
      accessibilityToggle.setAttribute('aria-pressed', 'true');
    }
  }

  if (accessibilityToggle) {
    accessibilityToggle.addEventListener('click', function() {
      const isPressed = this.getAttribute('aria-pressed') === 'true';
      const newValue = !isPressed;
      
      body.classList.toggle('accessibility-mode', newValue);
      this.setAttribute('aria-pressed', String(newValue));
      localStorage.setItem('accessibilityMode', String(newValue));
    });
  }

  // Mobile menu toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuClose = document.querySelector('.mobile-menu-close');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!isExpanded));
      mobileMenu.hidden = isExpanded;
      
      // Update icon
      this.innerHTML = isExpanded 
        ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>'
        : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';
    });
  }

  if (mobileMenuClose && mobileMenu) {
    mobileMenuClose.addEventListener('click', function() {
      if (mobileToggle) {
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.hidden = true;
        mobileToggle.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>';
      }
    });
  }

  // Close mobile menu on link click
  if (mobileMenu) {
    const links = mobileMenu.querySelectorAll('a');
    links.forEach(function(link) {
      link.addEventListener('click', function() {
        if (mobileToggle) {
          mobileToggle.setAttribute('aria-expanded', 'false');
          mobileMenu.hidden = true;
        }
      });
    });
  }

  // Search functionality (placeholder)
  const searchInput = document.getElementById('site-search');
  const searchButton = searchInput?.parentElement?.querySelector('button');

  if (searchInput && searchButton) {
    searchButton.addEventListener('click', function() {
      const query = searchInput.value.trim();
      if (query) {
        // In a real implementation, this would redirect to search results
        alert('Поиск: ' + query);
      }
    });

    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) {
          alert('Поиск: ' + query);
        }
      }
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // Form handling (placeholder for contact forms)
  const forms = document.querySelectorAll('form');
  forms.forEach(function(form) {
    form.addEventListener('submit', function(e) {
      // In a real implementation, this would submit the form
      // For demo purposes, we'll just show a message
      if (!form.getAttribute('action')) {
        e.preventDefault();
        alert('Форма отправлена! (Это демонстрация)');
        form.reset();
      }
    });
  });

  // Add animation on scroll (intersection observer)
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe sections for animation
  document.querySelectorAll('.section').forEach(function(section) {
    section.style.opacity = '0';
    observer.observe(section);
  });

  // Add CSS for fade-in animation
  const style = document.createElement('style');
  style.textContent = `
    .animate-fade-in {
      animation: fadeInUp 0.6s ease-out forwards;
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);

  // Keyboard navigation for dropdowns
  const dropdownItems = document.querySelectorAll('.nav-item.has-dropdown');
  dropdownItems.forEach(function(item) {
    const link = item.querySelector('.nav-link');
    const dropdown = item.querySelector('.dropdown');
    
    if (link && dropdown) {
      link.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const isExpanded = this.getAttribute('aria-expanded') === 'true';
          this.setAttribute('aria-expanded', String(!isExpanded));
          dropdown.hidden = isExpanded;
        }
      });

      // Close dropdown on escape
      dropdown.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
          link.setAttribute('aria-expanded', 'false');
          dropdown.hidden = true;
          link.focus();
        }
      });
    }
  });

  // Back to top button (create if needed)
  const createBackToTop = function() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.className = 'back-to-top';
    backToTop.setAttribute('aria-label', 'Вернуться вверх');
    backToTop.style.cssText = `
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      width: 44px;
      height: 44px;
      background: var(--color-primary);
      color: var(--color-text-inverse);
      border: none;
      border-radius: 50%;
      font-size: 1.5rem;
      cursor: pointer;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      z-index: 100;
    `;
    
    document.body.appendChild(backToTop);

    // Show/hide on scroll
    window.addEventListener('scroll', function() {
      if (window.scrollY > 500) {
        backToTop.style.opacity = '1';
        backToTop.style.visibility = 'visible';
      } else {
        backToTop.style.opacity = '0';
        backToTop.style.visibility = 'hidden';
      }
    });

    // Scroll to top on click
    backToTop.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    // Hover effect
    backToTop.addEventListener('mouseenter', function() {
      this.style.background = 'var(--color-primary-dark)';
      this.style.transform = 'translateY(-2px)';
    });

    backToTop.addEventListener('mouseleave', function() {
      this.style.background = 'var(--color-primary)';
      this.style.transform = 'translateY(0)';
    });
  };

  createBackToTop();

  // Log initialization
  console.log('БФ «Филантроп» — сайт инициализирован');
})();
