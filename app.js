// app.js
// Basic interactions for the TKM VitalMetric Wellness prototype
// - Onboarding "wizard" (Next / Back / step pills)
// - Smooth scrolling to top of current step

document.addEventListener("DOMContentLoaded", () => {
  setupOnboardingWizard();
});

/**
 * ONBOARDING WIZARD
 * Shows one step at a time, uses the pills and Next / Back buttons
 */
function setupOnboardingWizard() {
  const steps = Array.from(document.querySelectorAll(".onboarding-step"));
  if (!steps.length) {
    return; // nothing to do on pages without onboarding
  }

  const totalSteps = steps.length;
  let currentStep = 1;

  const pills = Array.from(
    document.querySelectorAll(".wizard-steps .step-pill")
  );
  const stepLabel = document.querySelector(".wizard-step-label");

  function getStepNumberFromElement(el) {
    const attr = el.dataset.step || el.dataset.next || el.dataset.prev;
    const num = parseInt(attr, 10);
    return Number.isNaN(num) ? null : num;
  }
  function showStep(stepNumber, options = { scroll: true }) {
    if (stepNumber < 1 || stepNumber > totalSteps) return;

    currentStep = stepNumber;

    // Toggle visible step
    steps.forEach((step) => {
      const n = parseInt(step.dataset.step, 10);
      step.classList.toggle("active", n === currentStep);
    });

    // Update pills (active / completed)
    pills.forEach((pill) => {
      const n = parseInt(pill.dataset.step, 10);
      pill.classList.toggle("active", n === currentStep);
      pill.classList.toggle("completed", n < currentStep);
    });

    // Update "Step X of Y" label
    if (stepLabel) {
      stepLabel.textContent = `Step ${currentStep} of ${totalSteps}`;
    }

    // Scroll so the active step is near the top
    if (options.scroll) {
      const target = steps.find(
        (s) => parseInt(s.dataset.step, 10) === currentStep
      );
      if (target) {
        const headerOffset = 140;
        const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  }

  // Delegate clicks for Next / Back buttons and pills
  document.addEventListener("click", (event) => {
    const nextBtn = event.target.closest(".next-btn");
    const prevBtn = event.target.closest(".prev-btn");
    const pill = event.target.closest(".step-pill");

    if (nextBtn) {
      const targetStep =
        getStepNumberFromElement(nextBtn) ?? Math.min(currentStep + 1, totalSteps);
      showStep(targetStep);
      event.preventDefault();
      return;
    }

    if (prevBtn) {
      const targetStep =
        getStepNumberFromElement(prevBtn) ?? Math.max(currentStep - 1, 1);
      showStep(targetStep);
      event.preventDefault();
      return;
    }

    if (pill) {
      const targetStep = getStepNumberFromElement(pill);
      if (targetStep != null) {
        showStep(targetStep);
        event.preventDefault();
      }
    }
  });
  // Start on Step 1 when the page loads
  showStep(currentStep, { scroll: false });
}
