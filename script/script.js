document.addEventListener("DOMContentLoaded", () => {
  // 1. Dynamic Footer Year
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Dark / Light Theme Toggle with LocalStorage
  const themeToggleBtn = document.getElementById("theme-toggle");
  const rootEl = document.documentElement;
  const savedTheme = localStorage.getItem("portfolio-theme") || "dark";

  rootEl.setAttribute("data-theme", savedTheme);
  themeToggleBtn.textContent = savedTheme === "dark" ? "☀️" : "🌙";

  themeToggleBtn.addEventListener("click", () => {
    const currentTheme = rootEl.getAttribute("data-theme");
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    rootEl.setAttribute("data-theme", nextTheme);
    localStorage.setItem("portfolio-theme", nextTheme);
    themeToggleBtn.textContent = nextTheme === "dark" ? "☀️" : "🌙";
  });

  // 3. Mobile Navigation Menu Toggle
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const navLinks = document.getElementById("nav-links");

  mobileMenuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => navLinks.classList.remove("open"));
  });

  // 4. Hero Role Typewriter Effect
  const roles = [
    "Software Developer",
    "M.Voc Candidate @ CUSAT",
    "Kotlin & Python Backend Dev",
    "UI/UX & Frontend Engineer"
  ];
  const typewriterEl = document.getElementById("typewriter");
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function runTypewriter() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typewriterEl.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typewriterEl.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let typingSpeed = isDeleting ? 45 : 85;

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 1800; // Pause at full word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // Pause before next word
    }

    setTimeout(runTypewriter, typingSpeed);
  }

  runTypewriter();

  // 5. Interactive Project Filtering
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const selectedFilter = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");
        if (selectedFilter === "all" || cardCategory === selectedFilter) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // 6. Client-Side Contact Form Validation
  const contactForm = document.getElementById("contact-form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const messageError = document.getElementById("message-error");
  const formStatus = document.getElementById("form-status");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;
    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";
    formStatus.textContent = "";

    const nameVal = nameInput.value.trim();
    const emailVal = emailInput.value.trim();
    const messageVal = messageInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (nameVal.length < 2) {
      nameError.textContent = "Please enter your name.";
      isValid = false;
    }

    if (!emailPattern.test(emailVal)) {
      emailError.textContent = "Please enter a valid email address.";
      isValid = false;
    }

    if (messageVal.length < 10) {
      messageError.textContent = "Message should be at least 10 characters.";
      isValid = false;
    }

    if (isValid) {
      formStatus.style.color = "#34d399";
      formStatus.textContent = `Thanks, ${nameVal}! Opening your mail client...`;

      const subject = encodeURIComponent(`Portfolio Contact from ${nameVal}`);
      const body = encodeURIComponent(`${messageVal}\n\nFrom: ${nameVal} (${emailVal})`);
      window.location.href = `mailto:xyz.dev@email.com?subject=${subject}&body=${body}`;

      contactForm.reset();
    }
  });
});
