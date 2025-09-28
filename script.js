// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all functionality
  initSmoothScroll();
  initScrollAnimations();
  initContactForm();
  initTypingEffect();
  initParticleEffect();
});

// Mobile Menu removed for clean About Me page

// Smooth Scroll for Navigation Links
function initSmoothScroll() {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const offsetTop = targetElement.offsetTop; // No navbar to account for

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
}

// Scroll Animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(
    ".skill-card, .project-card, .stat, .contact-method"
  );
  animatedElements.forEach((el) => {
    el.classList.add("fade-in");
    observer.observe(el);
  });

  // Special animations for about section
  const aboutText = document.querySelector(".about-text");
  const aboutImage = document.querySelector(".about-image");

  if (aboutText && aboutImage) {
    aboutText.classList.add("slide-in-left");
    aboutImage.classList.add("slide-in-right");
    observer.observe(aboutText);
    observer.observe(aboutImage);
  }
}

// Contact Form Handling
function initContactForm() {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      // Show loading state
      submitBtn.innerHTML = '<span class="loading"></span> Sending...';
      submitBtn.disabled = true;

      // Simulate form submission (replace with actual form handling)
      setTimeout(() => {
        // Reset form
        this.reset();

        // Show success message
        showNotification("Message sent successfully!", "success");

        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 2000);
    });
  }
}

// Typing Effect for Hero Title
function initTypingEffect() {
  const heroTitle = document.querySelector(".hero-title");

  if (heroTitle) {
    const text = heroTitle.textContent;
    const nameSpan = heroTitle.querySelector(".highlight");

    if (nameSpan) {
      const name = nameSpan.textContent;
      heroTitle.innerHTML = `Hi, I'm <span class="highlight"></span>`;

      let i = 0;
      const typeWriter = () => {
        if (i < name.length) {
          nameSpan.textContent += name.charAt(i);
          i++;
          setTimeout(typeWriter, 100);
        }
      };

      // Start typing effect after a short delay
      setTimeout(typeWriter, 1000);
    }
  }
}

// Particle Effect for Hero Section
function initParticleEffect() {
  const hero = document.querySelector(".hero");

  if (hero) {
    // Create floating particles
    for (let i = 0; i < 20; i++) {
      createParticle(hero);
    }
  }
}

function createParticle(container) {
  const particle = document.createElement("div");
  particle.className = "particle";
  particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        pointer-events: none;
        animation: float ${Math.random() * 10 + 10}s linear infinite;
    `;

  // Random position
  particle.style.left = Math.random() * 100 + "%";
  particle.style.top = Math.random() * 100 + "%";
  particle.style.animationDelay = Math.random() * 10 + "s";

  container.appendChild(particle);
}

// Navbar Scroll Effect removed for clean About Me page

// Notification System
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === "success" ? "#27ae60" : "#3498db"};
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(400px)";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Skill Cards Hover Effect
document.addEventListener("DOMContentLoaded", function () {
  const skillCards = document.querySelectorAll(".skill-card");

  skillCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.05)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });
});

// Project Cards Interactive Effect
document.addEventListener("DOMContentLoaded", function () {
  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      const image = this.querySelector(".project-image");
      if (image) {
        image.style.transform = "scale(1.1)";
        image.style.transition = "transform 0.3s ease";
      }
    });

    card.addEventListener("mouseleave", function () {
      const image = this.querySelector(".project-image");
      if (image) {
        image.style.transform = "scale(1)";
      }
    });
  });
});

// Dynamic Stats Counter
function initStatsCounter() {
  const stats = document.querySelectorAll(".stat h3");

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const finalValue = parseInt(target.textContent);
          const increment = finalValue / 50;
          let currentValue = 0;

          const counter = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
              target.textContent = finalValue + "+";
              clearInterval(counter);
            } else {
              target.textContent = Math.floor(currentValue) + "+";
            }
          }, 30);

          observer.unobserve(target);
        }
      });
    },
    { threshold: 0.5 }
  );

  stats.forEach((stat) => {
    observer.observe(stat);
  });
}

// Initialize stats counter when DOM is loaded
document.addEventListener("DOMContentLoaded", initStatsCounter);

// Theme Toggle (Optional - can be enabled later)
function initThemeToggle() {
  const themeToggle = document.createElement("button");
  themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  themeToggle.className = "theme-toggle";
  themeToggle.style.cssText = `
        position: fixed;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
        width: 50px;
        height: 50px;
        border: none;
        border-radius: 50%;
        background: #2c3e50;
        color: white;
        cursor: pointer;
        z-index: 1000;
        transition: all 0.3s ease;
    `;

  document.body.appendChild(themeToggle);

  themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-theme");
    const isDark = document.body.classList.contains("dark-theme");
    this.innerHTML = isDark
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
  });
}

// Add CSS animations for particles
const style = document.createElement("style");
style.textContent = `
    @keyframes float {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    /* Navbar styles removed for clean About Me page */
    
    .dark-theme {
        --bg-color: #1a1a1a;
        --text-color: #ffffff;
        --card-bg: #2d2d2d;
    }
    
    .dark-theme body {
        background-color: var(--bg-color);
        color: var(--text-color);
    }
    
    .dark-theme .skill-card,
    .dark-theme .project-card,
    .dark-theme .contact-form {
        background: var(--card-bg);
        color: var(--text-color);
    }
`;
document.head.appendChild(style);

// Utility Functions
function debounce(func, wait) {
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

function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Performance optimization for scroll events
const optimizedScrollHandler = throttle(function () {
  // Scroll-based animations and effects
  const scrollTop = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(".parallax");

  parallaxElements.forEach((element) => {
    const speed = element.dataset.speed || 0.5;
    const yPos = -(scrollTop * speed);
    element.style.transform = `translateY(${yPos}px)`;
  });
}, 16); // 60fps

window.addEventListener("scroll", optimizedScrollHandler);

// Initialize everything when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  console.log("Portfolio website loaded successfully! 🚀");
});
