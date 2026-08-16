document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const navAnchors = document.querySelectorAll(".nav-links a");
  const faqQuestions = document.querySelectorAll(".faq-question");
  const revealElements = document.querySelectorAll(".reveal");
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  const handleHeader = () => {
    header?.classList.toggle("scrolled", window.scrollY > 20);
  };

  handleHeader();
  window.addEventListener("scroll", handleHeader, { passive: true });

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuToggle.classList.toggle("active", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      document.body.classList.toggle("menu-open", isOpen);
    });

    navAnchors.forEach((anchor) => {
      anchor.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
      });
    });
  }

  faqQuestions.forEach((button) => {
    button.addEventListener("click", () => {
      const currentItem = button.closest(".faq-item");
      const wasActive = currentItem.classList.contains("active");

      document.querySelectorAll(".faq-item").forEach((item) => {
        item.classList.remove("active");
        const btn = item.querySelector(".faq-question");
        const icon = item.querySelector(".faq-icon");

        if (btn) btn.setAttribute("aria-expanded", "false");
        if (icon) icon.textContent = "+";
      });

      if (!wasActive) {
        currentItem.classList.add("active");
        button.setAttribute("aria-expanded", "true");
        const currentIcon = currentItem.querySelector(".faq-icon");
        if (currentIcon) currentIcon.textContent = "−";
      }
    });
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("visible"));
  }
});