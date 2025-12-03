// app.js
// Shared behavior across pages + onboarding wizard logic

document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;
  const page = html.dataset.page || "";

  setupNavToggle();

  if (page === "onboarding") {
    initOnboardingWizard();
  }
});

// Mobile nav toggle
function setupNavToggle() {
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");

  if (!navToggle || !navLinks) return;

  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("is-open");
  });

  // Close nav when a link is clicked (mobile nicety)
  navLinks.addEventListener("click", (event) => {
    const target = event.target;
    if (target.tagName === "A") {
      navLinks.classList.remove("is-open");
    }
  });
}
// ------------------------
// Onboarding wizard
// ------------------------

function initOnboardingWizard() {
  const steps = Array.from(document.querySelectorAll(".wizard-step"));
  const chips = Array.from(
    document.querySelectorAll(".onboard-steps .chip")
  );
  const mainContainer = document.querySelector(".onboard-main");

  if (!steps.length) return;

  let currentIndex = 0;

  function showStep(index) {
    if (index < 0 || index >= steps.length) return;
    currentIndex = index;

    // Toggle active step card
    steps.forEach((step, i) => {
      step.classList.toggle("is-active", i === currentIndex);
    });

    // Toggle active chip in sidebar
    if (chips.length === steps.length) {
      chips.forEach((chip, i) => {
        chip.classList.toggle("is-active", i === currentIndex);
      });
    }

    // Enable/disable back/next buttons
    const backButtons = document.querySelectorAll("[data-step-back]");
    const nextButtons = document.querySelectorAll("[data-step-next]");

    backButtons.forEach((btn) => {
      btn.disabled = currentIndex === 0;
    });

    nextButtons.forEach((btn) => {
      btn.disabled = currentIndex === steps.length - 1;
    });

    // Scroll the main wizard area into view (nice on mobile)
    if (mainContainer) {
      mainContainer.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }
  // Wire up all "Next" buttons
  const nextButtons = document.querySelectorAll("[data-step-next]");
  nextButtons.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      showStep(currentIndex + 1);
    });
  });

  // Wire up all "Back" buttons
  const backButtons = document.querySelectorAll("[data-step-back]");
  backButtons.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      showStep(currentIndex - 1);
    });
  });

  // Clicking chips jumps directly to that step
  chips.forEach((chip, index) => {
    chip.addEventListener("click", () => {
      showStep(index);
    });
  });

  // Start on the first step (in case classes get out of sync)
  showStep(0);
}
