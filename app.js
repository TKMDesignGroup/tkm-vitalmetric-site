// app.js
// Light front-end logic for TKM VitalMetric Wellness prototype
// - Onboarding wizard (13 steps with progress bar)
// - Like/Neutral/Avoid pills for food preferences
// - Fake login/signup forms that redirect to dashboard

document.addEventListener("DOMContentLoaded", function () {
  setupOnboardingWizard();
  setupPreferencePills();
  setupAuthForms();
});

/**
 * Small helper: safely query a single element.
 */
function $(selector, root) {
  return (root || document).querySelector(selector);
}
/**
 * Onboarding wizard (13 steps)
 * - Shows one .wizard-step at a time
 * - Updates step label + progress bar
 * - "Next" / "Back" buttons navigate
 * - Last step button becomes "Finish onboarding (demo)" and goes to dashboard.html
 */
function setupOnboardingWizard() {
  // Only run on onboarding page
  if (!document.body.classList.contains("onboarding-page")) return;

  const form = $("#onboarding-form");
  if (!form) return;

  const steps = Array.from(document.querySelectorAll(".wizard-step"));
  if (steps.length === 0) return;

  const totalSteps = steps.length;
  let currentStep = 1;

  const nextBtn = $(".js-next-step");
  const prevBtn = $(".js-prev-step");
  const stepLabel = $("#wizard-step-label");
  const progressBarInner = $("#wizard-bar-inner");

  function showStep(stepNumber) {
    currentStep = stepNumber;

    // Clamp just in case
    if (currentStep < 1) currentStep = 1;
    if (currentStep > totalSteps) currentStep = totalSteps;

    steps.forEach((stepEl, index) => {
      const stepIndex = index + 1;
      if (stepIndex === currentStep) {
        stepEl.classList.add("active");
      } else {
        stepEl.classList.remove("active");
      }
    });

    // Update label text (Step X of Y · Title)
    if (stepLabel) {
      const stepEl = steps[currentStep - 1];
      const titleEl = stepEl ? stepEl.querySelector(".wizard-step-title") : null;
      const titleText = titleEl ? titleEl.textContent.trim() : "";
      stepLabel.textContent = "Step " + currentStep + " of " + totalSteps + (titleText ? " · " + titleText : "");
    }

    // Update progress bar width (0–100%)
    if (progressBarInner) {
      const percent = (currentStep / totalSteps) * 100;
      progressBarInner.style.width = percent + "%";
    }

    // Update buttons
    if (prevBtn) {
      prevBtn.disabled = currentStep === 1;
    }
    if (nextBtn) {
      if (currentStep === totalSteps) {
        nextBtn.textContent = "Finish onboarding (demo)";
      } else {
        nextBtn.textContent = "Next";
      }
    }
  }

  function goNext() {
    // If we're on the last step, treat this as "finish"
    if (currentStep === totalSteps) {
      // Basic HTML5 required-field check; this is still just a prototype
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      // In the real app, this is where we'd send answers to the backend.
      window.location.href = "dashboard.html";
      return;
    }
    showStep(currentStep + 1);
  }

  function goPrev() {
    if (currentStep > 1) {
      showStep(currentStep - 1);
    }
  }

  // Wire buttons
  if (nextBtn) nextBtn.addEventListener("click", goNext);
  if (prevBtn) prevBtn.addEventListener("click", goPrev);

  // Start on step 1
  showStep(1);
}
/**
 * Like / Neutral / Avoid pill buttons
 * - Each .option-row has:
 *   - .option-chip buttons with data-value="like|neutral|avoid"
 *   - A hidden input whose value we update
 * - Clicking a chip:
 *   - Marks that chip as selected (adds .is-selected)
 *   - Clears selection from siblings
 *   - Updates the hidden input value
 */
function setupPreferencePills() {
  const rows = document.querySelectorAll(".option-row");
  if (!rows.length) return;

  rows.forEach((row) => {
    const chips = row.querySelectorAll(".option-chip");
    const hidden = row.querySelector('input[type="hidden"]');
    if (!chips.length || !hidden) return;

    chips.forEach((chip) => {
      chip.addEventListener("click", function () {
        const value = chip.getAttribute("data-value") || "";
        hidden.value = value;

        chips.forEach((c) => {
          if (c === chip) {
            c.classList.add("is-selected");
          } else {
            c.classList.remove("is-selected");
          }
        });
      });
    });
  });
}

/**
 * Fake login / signup forms
 * - Prevents real submit
 * - Shows a small demo message
 * - Redirects to dashboard.html
 */
function setupAuthForms() {
  const loginForm = $("#login-form");
  const signupForm = $("#signup-form");

  function handleAuthSubmit(form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      let msg = form.querySelector(".demo-message");
      if (!msg) {
        msg = document.createElement("p");
        msg.className = "demo-message";
        form.appendChild(msg);
      }

      msg.textContent = "Demo only — sending you to the Weekly Snapshot dashboard…";

      // Tiny pause so they can see the message
      setTimeout(function () {
        window.location.href = "dashboard.html";
      }, 600);
    });
  }

  if (loginForm) handleAuthSubmit(loginForm);
  if (signupForm) handleAuthSubmit(signupForm);
}

