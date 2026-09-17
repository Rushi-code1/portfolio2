// =========================================================
// RUSHIKESH DESHMUKH - INTERACTIVE & ANIMATION CONTROLLER
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
  // 1. Interactive Canvas Particle Background
  initParticleCanvas();

  // 2. Dynamic Typewriter Role Animation
  initTypewriter();

  // 3. Card Spotlight Dynamic Mouse Tracker
  initSpotlightCards();

  // 4. Interactive Terminal (Tabs & Code Runner)
  initTerminal();

  // 5. Project Filtering System
  initProjectFilter();

  // 6. Number Counter Animation on Scroll
  initCounters();

  // 7. Voice Greeting (Web Speech Synthesis)
  initVoiceGreeting();

  // 8. Interactive About Me Modal
  initModal();

  // 9. Mobile Navigation
  initMobileNav();

  // 10. Scroll Spy for Navbar
  initScrollSpy();

  // 11. Contact Form Handler
  initContactForm();
});

// ---------------------------------------------------------
// 1. PARTICLE CANVAS (Cyber Constellation Network)
// ---------------------------------------------------------
function initParticleCanvas() {
  const canvas = document.getElementById("bg-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const mouse = { x: null, y: null, radius: 150 };

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  window.addEventListener("mouseout", () => {
    mouse.x = null;
    mouse.y = null;
  });

  const particleCount = Math.min(width > 768 ? 70 : 35, 80);
  const particles = [];

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 1;
      this.speedX = (Math.random() - 0.5) * 0.8;
      this.speedY = (Math.random() - 0.5) * 0.8;
      this.color = Math.random() > 0.4 ? "#38bdf8" : "#818cf8";
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0 || this.x > width) this.speedX *= -1;
      if (this.y < 0 || this.y > height) this.speedY *= -1;

      // Mouse interaction
      if (mouse.x != null && mouse.y != null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 3;
          this.y -= (dy / dist) * force * 3;
        }
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Connect particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(56, 189, 248, ${0.18 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.8;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
      particles[i].update();
      particles[i].draw();
    }
    requestAnimationFrame(animate);
  }

  animate();
}

// ---------------------------------------------------------
// 2. DYNAMIC TYPEWRITER
// ---------------------------------------------------------
function initTypewriter() {
  const roles = [
    "Backend Software Developer",
    "Python & Django DRF Specialist",
    "FastAPI & Microservices Architect",
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

    let speed = isDeleting ? 35 : 75;

    if (!isDeleting && cIdx === current.length) {
      isDeleting = true;
      speed = 2000;
    } else if (isDeleting && cIdx === 0) {
      isDeleting = false;
      rIdx = (rIdx + 1) % roles.length;
      speed = 350;
    }

    setTimeout(type, speed);
  }

  type();
}

// ---------------------------------------------------------
// 3. CARD SPOTLIGHT FOLLOWER
// ---------------------------------------------------------
function initSpotlightCards() {
  const cards = document.querySelectorAll(".spotlight-card");
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });
}

// ---------------------------------------------------------
// 4. INTERACTIVE TERMINAL SIMULATION
// ---------------------------------------------------------
function initTerminal() {
  const tabs = document.querySelectorAll(".terminal-tab");
  const panes = document.querySelectorAll(".terminal-pane");
  const runBtn = document.getElementById("terminal-run-btn");
  const outputBox = document.getElementById("terminal-output");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.getAttribute("data-tab");
      tabs.forEach((t) => {
        t.classList.remove("text-sky-400", "border-sky-500", "bg-slate-800/80");
        t.classList.add("text-slate-400");
      });
      tab.classList.add("text-sky-400", "border-sky-500", "bg-slate-800/80");

      panes.forEach((p) => {
        p.classList.add("hidden");
        if (p.id === target) p.classList.remove("hidden");
      });
    });
  });

  if (runBtn && outputBox) {
    runBtn.addEventListener("click", () => {
      outputBox.classList.remove("hidden");
      outputBox.innerHTML = `
        <div class="text-sky-400 flex items-center gap-2">
          <span class="animate-spin">⚙️</span>
          <span>Executing developer_profile.py in production cluster...</span>
        </div>
      `;

      setTimeout(() => {
        outputBox.innerHTML = `
          <div class="text-emerald-400 font-mono text-xs space-y-1">
            <p>✔ [200 OK] Connected to PostgreSQL RDS (Multi-AZ) in 12ms</p>
            <p>✔ Celery Worker Queue: 4 workers active, Redis pub/sub online</p>
            <p>✔ LangChain + Gemini 1.5 document extraction: 98.4% accuracy benchmark</p>
            <p>✔ AWS EC2 status: Healthy (0% packet drop, sub-50ms latency)</p>
            <p class="text-sky-300 font-bold mt-1">🚀 Status: Rushikesh Deshmukh is READY for immediate backend deployment!</p>
          </div>
        `;
      }, 1000);
    });
  }
}

// ---------------------------------------------------------
// 5. PROJECT FILTERING SYSTEM
// ---------------------------------------------------------
function initProjectFilter() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");

      filterBtns.forEach((b) => {
        b.classList.remove("bg-sky-500", "text-white", "shadow-lg", "shadow-sky-500/25");
        b.classList.add("glass-card", "text-slate-300");
      });
      btn.classList.remove("glass-card", "text-slate-300");
      btn.classList.add("bg-sky-500", "text-white", "shadow-lg", "shadow-sky-500/25");

      projectCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        if (filter === "all" || category.includes(filter)) {
          card.style.display = "flex";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
          }, 50);
        } else {
          card.style.opacity = "0";
          card.style.transform = "scale(0.95)";
          setTimeout(() => {
            card.style.display = "none";
          }, 200);
        }
      });
    });
  });
}

// ---------------------------------------------------------
// 6. ANIMATED NUMBER COUNTERS
// ---------------------------------------------------------
function initCounters() {
  const counterElements = document.querySelectorAll(".counter-value");
  let started = false;

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !started) {
        started = true;
        counterElements.forEach((counter) => {
          const target = parseFloat(counter.getAttribute("data-target"));
          const suffix = counter.getAttribute("data-suffix") || "";
          const decimals = parseInt(counter.getAttribute("data-decimals") || "0");
          let count = 0;
          const duration = 1800;
          const stepTime = 25;
          const steps = duration / stepTime;
          const increment = target / steps;

          const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
              counter.textContent = target.toFixed(decimals) + suffix;
              clearInterval(timer);
            } else {
              counter.textContent = count.toFixed(decimals) + suffix;
            }
          }, stepTime);
        });
      }
    },
    { threshold: 0.25 }
  );

  const statsSection = document.getElementById("stats-section");
  if (statsSection) observer.observe(statsSection);
}

// ---------------------------------------------------------
// 7. VOICE GREETING (Web Speech API)
// ---------------------------------------------------------
function initVoiceGreeting() {
  const voiceBtn = document.getElementById("voice-btn");
  if (!voiceBtn) return;

  voiceBtn.addEventListener("click", () => {
    if (!("speechSynthesis" in window)) {
      showToast("Speech synthesis is not supported in this browser.");
      return;
    }

    window.speechSynthesis.cancel(); // Reset any existing speech

    const greetingText =
      "Hello! Welcome to Rushikesh Deshmukh's portfolio. Rushikesh is a Backend Software Developer specializing in Python, Django REST Framework, FastAPI, PostgreSQL, AWS Cloud, and Generative AI. Explore the projects below to see his work!";

    const utterance = new SpeechSynthesisUtterance(greetingText);
    utterance.rate = 1.0;
    utterance.pitch = 1.05;

    // Pick English voice
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find((v) => v.lang.includes("en-US") || v.lang.includes("en-GB"));
    if (englishVoice) utterance.voice = englishVoice;

    voiceBtn.classList.add("animate-pulse", "text-sky-400");
    showToast("🔊 Playing voice introduction...");

    utterance.onend = () => {
      voiceBtn.classList.remove("animate-pulse", "text-sky-400");
    };

    window.speechSynthesis.speak(utterance);
  });
}

// ---------------------------------------------------------
// 8. INTERACTIVE MODAL
// ---------------------------------------------------------
function initModal() {
  const openModalBtn = document.getElementById("open-modal-btn");
  const modalOverlay = document.getElementById("about-modal");
  const closeModalBtn = document.getElementById("close-modal-btn");

  if (openModalBtn && modalOverlay) {
    openModalBtn.addEventListener("click", () => {
      modalOverlay.classList.add("active");
    });

    if (closeModalBtn) {
      closeModalBtn.addEventListener("click", () => {
        modalOverlay.classList.remove("active");
      });
    }

    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) modalOverlay.classList.remove("active");
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
        modalOverlay.classList.remove("active");
      }
    });
  }
}

// ---------------------------------------------------------
// 9. MOBILE NAVIGATION TOGGLE
// ---------------------------------------------------------
function initMobileNav() {
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
// 10. SCROLL SPY
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
      link.classList.remove("text-sky-400", "font-semibold");
      link.classList.add("text-slate-400");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.remove("text-slate-400");
        link.classList.add("text-sky-400", "font-semibold");
      }
    });
  });
}

// ---------------------------------------------------------
// 11. CONTACT FORM & COPY TO CLIPBOARD
// ---------------------------------------------------------
function initContactForm() {
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("form-name")?.value || "Friend";
      const email = document.getElementById("form-email")?.value || "";
      const message = document.getElementById("form-message")?.value || "";

      const mailtoLink = `mailto:rushikesh.deshmukh1103@gmail.com?subject=Portfolio Inquiry from ${encodeURIComponent(
        name
      )}&body=${encodeURIComponent(message + "\n\nFrom: " + email)}`;

      showToast("Opening email client to send message... ✉️");
      setTimeout(() => {
        window.location.href = mailtoLink;
      }, 800);
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

// Global Toast Notification
function showToast(message) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className =
      "spotlight-card px-5 py-3 rounded-2xl text-sm font-semibold text-sky-400 border border-sky-500/40 flex items-center gap-2 shadow-2xl z-50";
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span>✨</span> <span>${message}</span>`;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}
