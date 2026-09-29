document.addEventListener("DOMContentLoaded", () => {
  // 1. Dynamic Footer Year
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 2. Dark / Light Theme Toggle
  const themeBtn = document.getElementById("theme-toggle");
  const rootEl = document.documentElement;

  themeBtn.addEventListener("click", () => {
    const currentTheme = rootEl.getAttribute("data-theme");
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    rootEl.setAttribute("data-theme", nextTheme);
    themeBtn.textContent = nextTheme === "dark" ? "☀️ Light" : "🌙 Dark";
  });

  // 3. Dynamic Role Subtitle Cycling
  const roles = [
    "M.Voc Software Application Development Candidate",
    "Kotlin & Python Backend Developer",
    "UI/UX & Figma Enthusiast",
    "MySQL Database Architect"
  ];
  const typewriterEl = document.getElementById("typewriter");
  let roleIndex = 0;

  setInterval(() => {
    roleIndex = (roleIndex + 1) % roles.length;
    typewriterEl.style.opacity = "0";
    setTimeout(() => {
      typewriterEl.textContent = roles[roleIndex];
      typewriterEl.style.opacity = "1";
    }, 200);
  }, 3200);

  // 4. Interactive Skill Category Filtering
  const filterBtns = document.querySelectorAll(".filter-btn");
  const skillCards = document.querySelectorAll(".skill-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.getAttribute("data-category");

      skillCards.forEach((card) => {
        if (category === "all" || card.getAttribute("data-category") === category) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });

  // 5. Client-Side Contact Form Validation
  const contactForm = document.getElementById("contact-form");
  const feedbackEl = document.getElementById("form-feedback");

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !message) {
      feedbackEl.style.color = "#f87171";
      feedbackEl.textContent = "Please fill in all fields before sending.";
      return;
    }

    if (!emailRegex.test(email)) {
      feedbackEl.style.color = "#f87171";
      feedbackEl.textContent = "Please enter a valid email address.";
      return;
    }

    // Open pre-filled mailto client or confirm validation
    feedbackEl.style.color = "#4ade80";
    feedbackEl.textContent = `Thanks, ${name}! Opening your email client...`;
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name} (${email})`);
    window.location.href = `mailto:xyz.dev@email.com?subject=${subject}&body=${body}`;
    contactForm.reset();
  });
});
