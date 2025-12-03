// app.js - Wellness Pilot prototype
// Handles mobile navigation + onboarding wizard steps

document.addEventListener('DOMContentLoaded', () => {
  // ===== Mobile navigation =====
  const navToggle = document.querySelector('.nav-toggle');
  const overlayNav = document.querySelector('.site-nav-overlay');

  function openNav() {
    if (!overlayNav || !navToggle) return;
    overlayNav.classList.add('is-open');
    navToggle.classList.add('is-open');
    document.body.classList.add('nav-open');
  }

  function closeNav() {
    if (!overlayNav || !navToggle) return;
    overlayNav.classList.remove('is-open');
    navToggle.classList.remove('is-open');
    document.body.classList.remove('nav-open');
  }

  function toggleNav() {
    if (!overlayNav) return;
    if (overlayNav.classList.contains('is-open')) {
      closeNav();
    } else {
      openNav();
    }
  }

  if (navToggle && overlayNav) {
    navToggle.addEventListener('click', toggleNav);
  }

  // Close mobile nav when a link is clicked
  if (overlayNav) {
    overlayNav.addEventListener('click', (event) => {
      const link = event.target.closest('a');
      if (link) {
        closeNav();
      }
    });
  }

  // Close nav on Escape key
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeNav();
    }
  });

  // ===== Onboarding wizard =====
  const wizard = document.querySelector('.wizard');
  if (!wizard) {
    return; // no wizard on this page, we're done
  }

  const steps = Array.from(wizard.querySelectorAll('.wizard-step'));
  const indexSteps = Array.from(wizard.querySelectorAll('.wizard-index-step'));
  if (!steps.length) {
    return;
  }

  let currentStep = 0;

  function showStep(newIndex) {
    if (newIndex < 0 || newIndex >= steps.length) {
      return;
    }

    currentStep = newIndex;

    // Show the current step, hide the others
    steps.forEach((stepEl, idx) => {
      stepEl.classList.toggle('wizard-step-active', idx === currentStep);
    });

    // Highlight the current index "tab" if counts line up
    if (indexSteps.length === steps.length) {
      indexSteps.forEach((indexEl, idx) => {
        indexEl.classList.toggle('wizard-index-step-active', idx === currentStep);
      });
    }

    // Scroll back up to the top of the wizard for the new step
    const rect = wizard.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const targetY = rect.top + scrollTop - 120; // little buffer under the header

    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    });
  }

  // Initial state: show only the first step
  steps.forEach((stepEl, idx) => {
    stepEl.classList.toggle('wizard-step-active', idx === 0);
  });

  if (indexSteps.length === steps.length) {
    indexSteps.forEach((indexEl, idx) => {
      indexEl.classList.toggle('wizard-index-step-active', idx === 0);
    });
  }

  // Clicking the index buttons jumps directly to that step
  if (indexSteps.length) {
    indexSteps.forEach((indexEl, idx) => {
      indexEl.addEventListener('click', (event) => {
        event.preventDefault();
        showStep(idx);
      });
    });
  }

  // Use button text for navigation: "Start", "Next", "Back"
  wizard.addEventListener('click', (event) => {
    const btn = event.target.closest('button');
    if (!btn) return;

    const label = btn.textContent.trim().toLowerCase();

    if (label.startsWith('next') || label.startsWith('start')) {
      event.preventDefault();
      showStep(currentStep + 1);
    } else if (label.startsWith('back')) {
      event.preventDefault();
      showStep(currentStep - 1);
    }
  });
});
