// =========================================================
// RUSHIKESH DESHMUKH - PROFESSIONAL PORTFOLIO CONTROLLER
// With Subtle Interactive Ambient Background Animation
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
  // 1. Subtle Ambient Background Animation
  initAmbientBackground();

  // 2. Dynamic Role Switcher (Typewriter)
  initRoleTypewriter();

  // 3. Project Category Filtering
  initProjectFiltering();

  // 4. Mobile Navigation Menu Toggle
  initMobileNavigation();

  // 5. Smooth Scroll Spy for Navbar
  initScrollSpy();

  // 6. Contact Form Handler
  initContactFormHandler();
});

// ---------------------------------------------------------
// 1. SUBTLE AMBIENT CANVAS BACKGROUND (Clean & Non-distracting)
// ---------------------------------------------------------
function initAmbientBackground() {
  const canvas = document.getElementById("bg-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const mouse = { x: null, y: null, radius: 140 };

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  window.addEventListener("mouseout", () => {
    mouse.x = null;
    mouse.y = null;
  });

  const particleCount = Math.min(width > 768 ? 60 : 30, 70);
  const particles = [];

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 1.8 + 0.8;
      this.speedX = (Math.random() - 0.5) * 0.45;
      this.speedY = (Math.random() - 0.5) * 0.45;
      this.color = Math.random() > 0.5 ? "rgba(99, 102, 241, 0.45)" : "rgba(56, 189, 248, 0.4)";
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0 || this.x > width) this.speedX *= -1;
      if (this.y < 0 || this.y > height) this.speedY *= -1;

      // Soft mouse interaction
      if (mouse.x != null && mouse.y != null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 1.5;
          this.y -= (dy / dist) * force * 1.5;
        }
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Subtle connection lines between nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(99, 102, 241, ${0.12 * (1 - dist / 110)})`;
          ctx.lineWidth = 0.7;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
      particles[i].update();
      particles[i].draw();
    }
    requestAnimationFrame(render);
  }

  render();
}

// ---------------------------------------------------------
// 2. DYNAMIC ROLE TYPEWRITER
// ---------------------------------------------------------
function initRoleTypewriter() {
  const roles = [
    "Backend Software Developer",
    "Python & Django Specialist",
    "FastAPI & Microservices Engineer",
    "AWS Cloud & GenAI Integrator",
    "PostgreSQL & Database Optimizer"
  ];
  
  const el = document.getElementById("typewriter-text");
  if (!el) return;

  let rIdx = 0;
  let cIdx = 0;
  let isDeleting = false;

  function type() {
    const current = roles[rIdx];
    if (isDeleting) {
      el.textContent = current.substring(0, cIdx - 1);
      cIdx--;
    } else {
      el.textContent = current.substring(0, cIdx + 1);
      cIdx++;
    }

    let speed = isDeleting ? 30 : 65;

    if (!isDeleting && cIdx === current.length) {
      isDeleting = true;
      speed = 2200;
    } else if (isDeleting && cIdx === 0) {
      isDeleting = false;
      rIdx = (rIdx + 1) % roles.length;
      speed = 400;
    }

    setTimeout(type, speed);
  }

  type();
}

// ---------------------------------------------------------
// 3. PROJECT FILTERING
// ---------------------------------------------------------
function initProjectFiltering() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");

      filterBtns.forEach((b) => {
        b.classList.remove("bg-indigo-600", "text-white", "border-indigo-500");
        b.classList.add("bg-slate-900/60", "text-slate-300", "border-white/10");
      });
      btn.classList.remove("bg-slate-900/60", "text-slate-300", "border-white/10");
      btn.classList.add("bg-indigo-600", "text-white", "border-indigo-500");

      projectCards.forEach((card) => {
        const categories = card.getAttribute("data-category") || "";
        if (filter === "all" || categories.includes(filter)) {
          card.style.display = "flex";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
          }, 30);
        } else {
          card.style.opacity = "0";
          card.style.transform = "scale(0.98)";
          setTimeout(() => {
            card.style.display = "none";
          }, 180);
        }
      });
    });
  });
}

// ---------------------------------------------------------
// 4. MOBILE NAVIGATION
// ---------------------------------------------------------
function initMobileNavigation() {
  const btn = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");
  if (!btn || !menu) return;

  btn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.add("hidden");
    });
  });
}

// ---------------------------------------------------------
// 5. SCROLL SPY
// ---------------------------------------------------------
function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((s) => {
      const top = s.offsetTop - 120;
      const height = s.clientHeight;
      if (window.scrollY >= top && window.scrollY < top + height) {
        current = s.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("text-indigo-400", "font-semibold");
      link.classList.add("text-slate-300");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.remove("text-slate-300");
        link.classList.add("text-indigo-400", "font-semibold");
      }
    });
  });
}

// ---------------------------------------------------------
// 6. CONTACT FORM
// ---------------------------------------------------------
function initContactFormHandler() {
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("form-name")?.value || "Colleague";
      const email = document.getElementById("form-email")?.value || "";
      const message = document.getElementById("form-message")?.value || "";

      const mailtoLink = `mailto:rushikesh.deshmukh1103@gmail.com?subject=Inquiry from ${encodeURIComponent(
        name
      )}&body=${encodeURIComponent(message + "\n\nFrom: " + email)}`;

      showToast("Opening your email client to send message... ✉️");
      setTimeout(() => {
        window.location.href = mailtoLink;
      }, 600);
    });
  }
}

// Global Copy Email Helper
window.copyEmail = function () {
  const email = "rushikesh.deshmukh1103@gmail.com";
  navigator.clipboard
    .writeText(email)
    .then(() => {
      showToast("Email address copied to clipboard! 📋");
    })
    .catch(() => {
      showToast("Email: " + email);
    });
};

// Global Clean Toast Notification
function showToast(message) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className =
      "pro-card px-4 py-3 rounded-xl text-xs font-semibold text-indigo-300 border border-indigo-500/30 flex items-center gap-2 shadow-xl";
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span>✨</span> <span>${message}</span>`;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}
