// app.js — global script for Wellness Pilot
// Handles: mobile navigation + onboarding wizard behavior

(function () {
  // -----------------------------
  // Mobile navigation (global)
  // -----------------------------
  function initMobileNav() {
    const navToggle = document.querySelector(".nav-toggle");
    const navOverlay = document.querySelector(".site-nav-overlay");

    if (!navToggle || !navOverlay) {
      return; // Safely do nothing on pages without the header/nav
    }

    const body = document.body;

    function openNav() {
      body.classList.add("nav-open");
    }

    function closeNav() {
      body.classList.remove("nav-open");
    }

    function toggleNav() {
      if (body.classList.contains("nav-open")) {
        closeNav();
      } else {
        openNav();
      }
    }

    navToggle.addEventListener("click", function (event) {
      event.stopPropagation();
      toggleNav();
    });

    // Close when a link in the overlay is clicked
    navOverlay.addEventListener("click", function (event) {
      const link = event.target.closest("a");
      if (link) {
        closeNav();
      }
    });

    // Close when clicking outside the overlay + toggle
    document.addEventListener("click", function (event) {
      if (!body.classList.contains("nav-open")) return;

      const clickedInsideOverlay = navOverlay.contains(event.target);
      const clickedToggle = navToggle.contains(event.target);

      if (!clickedInsideOverlay && !clickedToggle) {
        closeNav();
      }
    });

    // Close on ESC key
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && body.classList.contains("nav-open")) {
        closeNav();
      }
    });
  }

  // -----------------------------
  // Onboarding wizard (13 steps)
  // -----------------------------
  function initOnboardingWizard() {
    const wizardForm = document.querySelector(".wizard-form");
    if (!wizardForm) return;

    const steps = Array.prototype.slice.call(
      wizardForm.querySelectorAll(".wizard-step")
    );
    if (!steps.length) return;

    const indexButtons = Array.prototype.slice.call(
      document.querySelectorAll(".wizard-index-step")
    );

    let currentStepIndex = 0;

    // If any step is already marked active in HTML, use that as starting point
    steps.forEach(function (step, idx) {
      if (step.classList.contains("wizard-step-active")) {
        currentStepIndex = idx;
      }
    });

    function clampIndex(idx) {
      if (idx < 0) return 0;
      if (idx >= steps.length) return steps.length - 1;
      return idx;
    }

    function updateStepIndexBar() {
      if (!indexButtons.length) return;

      indexButtons.forEach(function (btn) {
        btn.classList.remove("wizard-index-step-active");
      });

      const activeStepNum = currentStepIndex + 1;
      const matching = indexButtons.find(function (btn) {
        return parseInt(btn.getAttribute("data-step"), 10) === activeStepNum;
      });

      if (matching) {
        matching.classList.add("wizard-index-step-active");
      }
    }

    function showStep(newIndex) {
      currentStepIndex = clampIndex(newIndex);

      steps.forEach(function (step, idx) {
        if (idx === currentStepIndex) {
          step.classList.add("wizard-step-active");
        } else {
          step.classList.remove("wizard-step-active");
        }
      });

      updateStepIndexBar();

      // Scroll wizard into view on small screens
      const shell = document.querySelector(".wizard-shell");
      if (shell && typeof shell.scrollIntoView === "function") {
        shell.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }

    // Ensure at least one step is active
    if (!steps[currentStepIndex].classList.contains("wizard-step-active")) {
      steps.forEach(function (step) {
        step.classList.remove("wizard-step-active");
      });
      steps[currentStepIndex].classList.add("wizard-step-active");
    }
    updateStepIndexBar();

    // Next / Back buttons
    wizardForm.addEventListener("click", function (event) {
      const nextBtn = event.target.closest(".wizard-next");
      const backBtn = event.target.closest(".wizard-back");

      if (nextBtn) {
        event.preventDefault();
        showStep(currentStepIndex + 1);
      } else if (backBtn) {
        event.preventDefault();
        showStep(currentStepIndex - 1);
      }
    });

    // Optional: clicking the step index buttons jumps to that step
    indexButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const stepNum = parseInt(btn.getAttribute("data-step"), 10);
        if (!isNaN(stepNum)) {
          showStep(stepNum - 1);
        }
      });
    });
  }

  // -----------------------------
  // Init on DOM ready
  // -----------------------------
  document.addEventListener("DOMContentLoaded", function () {
    initMobileNav();
    initOnboardingWizard();
  });
})();
