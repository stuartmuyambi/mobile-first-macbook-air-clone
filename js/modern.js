// Modern MacBook Air Landing Page JavaScript
// Using ES6+ features and modern JavaScript patterns

class ModernApp {
  constructor() {
    this.init();
  }

  init() {
    this.setupNavigation();
    this.setupScrollAnimations();
    this.setupSmoothScrolling();
    this.setupPerformanceOptimizations();
    this.setupInteractiveElements();
  }

  // Modern navigation with smooth scrolling and active states
  setupNavigation() {
    const nav = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelectorAll('.nav-links a');

    // Navbar scroll behavior
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.backdropFilter = 'blur(20px)';
      } else {
        nav.style.background = 'rgba(255, 255, 255, 0.8)';
        nav.style.backdropFilter = 'blur(20px)';
      }

      lastScrollY = currentScrollY;
    };

    // Throttled scroll listener for performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      scrollTimeout = setTimeout(handleScroll, 10);
    }, { passive: true });

    // Active section highlighting
    const updateActiveNav = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPos = window.scrollY + 100;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          navLinks.forEach(link => {
            link.style.color = 'var(--color-gray-600)';
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.style.color = 'var(--color-gray-900)';
            }
          });
        }
      });
    };

    window.addEventListener('scroll', updateActiveNav, { passive: true });
  }

  // Intersection Observer for scroll animations
  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          
          // Add stagger effect for feature cards
          if (entry.target.classList.contains('feature-card')) {
            const cards = entry.target.parentElement.children;
            Array.from(cards).forEach((card, index) => {
              setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
              }, index * 100);
            });
          }
        }
      });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.animate-fade-in-up, .feature-card, .stat-item');
    
    animatedElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }

  // Smooth scrolling for navigation links
  setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          const navHeight = document.getElementById('navbar').offsetHeight;
          const targetPosition = targetElement.offsetTop - navHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // Performance optimizations
  setupPerformanceOptimizations() {
    // Lazy load images
    const images = document.querySelectorAll('img[src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.style.transition = 'opacity 0.3s ease';
          img.style.opacity = '1';
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => {
      img.style.opacity = '0';
      imageObserver.observe(img);
    });

    // Preload critical images
    const criticalImages = [
      'images/devices/large/macbook-air-header.jpg',
      'images/m1-chips/m1-chip-small.jpg'
    ];

    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }

  // Interactive elements and modern features
  setupInteractiveElements() {
    // Enhanced button interactions
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-2px)';
      });
      
      button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
      });
    });

    // Feature cards hover effects
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
      });
    });

    // Hero image parallax effect
    const heroImage = document.querySelector('.hero-visual');
    
    if (heroImage) {
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        heroImage.style.transform = `translateY(${rate}px)`;
      }, { passive: true });
    }

    // Add subtle cursor interactions
    this.setupCursorEffects();
  }

  // Modern cursor effects
  setupCursorEffects() {
    const interactiveElements = document.querySelectorAll('button, a, .feature-card');
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        document.body.style.cursor = 'pointer';
      });
      
      element.addEventListener('mouseleave', () => {
        document.body.style.cursor = 'default';
      });
    });
  }

  // Utility methods
  static debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  static throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
}

// Performance monitoring
class PerformanceMonitor {
  constructor() {
    this.measureLoadTime();
    this.measureInteractionTime();
  }

  measureLoadTime() {
    window.addEventListener('load', () => {
      const loadTime = performance.now();
      console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
    });
  }

  measureInteractionTime() {
    document.addEventListener('click', (e) => {
      const startTime = performance.now();
      requestAnimationFrame(() => {
        const endTime = performance.now();
        console.log(`Interaction took ${(endTime - startTime).toFixed(2)}ms`);
      });
    });
  }
}

// Modern error handling
class ErrorHandler {
  constructor() {
    this.setupGlobalErrorHandling();
  }

  setupGlobalErrorHandling() {
    window.addEventListener('error', (e) => {
      console.error('Global error:', e.error);
      // In production, send to error reporting service
    });

    window.addEventListener('unhandledrejection', (e) => {
      console.error('Unhandled promise rejection:', e.reason);
      // In production, send to error reporting service
    });
  }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ModernApp();
  new PerformanceMonitor();
  new ErrorHandler();
});

// Service Worker for caching (Progressive Web App features)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Export for use in other modules
export { ModernApp, PerformanceMonitor, ErrorHandler };