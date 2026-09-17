// Portfolio Interactive Scripts
document.addEventListener("DOMContentLoaded", () => {
  // 1. Dynamic Role Typewriter Animation
  const roles = [
    "Backend Software Developer",
    "Python & Django Specialist",
    "FastAPI & Microservices Engineer",
    "AWS Cloud & GenAI Integrator",
    "PostgreSQL & Database Optimizer"
  ];
  
  const typewriterElement = document.getElementById("typewriter-text");
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function type() {
    if (!typewriterElement) return;
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 1800; // Pause at end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // Pause before typing new word
    }

    setTimeout(type, typingSpeed);
  }

  type();

  // 2. Mobile Navigation Toggle
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });

    const mobileLinks = mobileMenu.querySelectorAll("a");
    mobileLinks.forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
      });
    });
  }

  // 3. Copy Email to Clipboard Functionality
  window.copyEmail = function() {
    const email = "rushikesh.deshmukh1103@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
      showToast("Email address copied to clipboard! 📋");
    }).catch(err => {
      showToast("Failed to copy. Email: " + email);
    });
  };

  // 4. Toast Notification
  function showToast(message) {
    let toast = document.getElementById("toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "toast";
      toast.className = "glass-card px-4 py-3 rounded-xl text-sm font-medium text-sky-400 border border-sky-500/30 flex items-center gap-2 shadow-2xl";
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<span>✨</span> <span>${message}</span>`;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3500);
  }

  // 5. Contact Form Submission
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("form-name")?.value || "Friend";
      const email = document.getElementById("form-email")?.value || "";
      const message = document.getElementById("form-message")?.value || "";
      
      const mailtoLink = `mailto:rushikesh.deshmukh1103@gmail.com?subject=Portfolio Inquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent(message + "\n\nFrom: " + email)}`;
      
      showToast("Opening your email client to send message...");
      setTimeout(() => {
        window.location.href = mailtoLink;
      }, 800);
    });
  }

  // 6. Smooth Navbar active state highlighting on scroll
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("text-sky-400", "font-semibold");
      link.classList.add("text-slate-400");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.remove("text-slate-400");
        link.classList.add("text-sky-400", "font-semibold");
      }
    });
  });
});
