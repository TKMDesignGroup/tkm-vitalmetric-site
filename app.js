// app.js
// Simple front-end navigation + tiny demo "state" (no real backend)

// Helper: safely get element
function $(selector) {
  return document.querySelector(selector);
}

document.addEventListener("DOMContentLoaded", () => {
  // --- ONBOARDING PAGE LOGIC ---
  const onboardingForm = $("#onboardingForm");
  if (onboardingForm) {
    onboardingForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const nameInput = $("#userName");
      const startInput = $("#startDate");
      const endInput = $("#endDate");
      const caloriesInput = $("#calorieTarget");
      const budgetInput = $("#weeklyBudget");

      const name = nameInput ? nameInput.value.trim() : "";
      const start = startInput ? startInput.value : "";
      const end = endInput ? endInput.value : "";
      const calories = caloriesInput ? caloriesInput.value : "";
      const budget = budgetInput ? budgetInput.value : "";

      // Store in localStorage just so the dashboard can show something
      const demoPlan = {
        name: name || "Your week",
        start,
        end,
        calories,
        budget,
      };
      localStorage.setItem("tkmDemoPlan", JSON.stringify(demoPlan));

      // Go to dashboard
      window.location.href = "dashboard.html";
    });
  }

  // --- LOGIN PAGE LOGIC ---
  const loginForm = $("#loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // In a real app we'd verify credentials here.
      // For this prototype, just go to the dashboard.
      window.location.href = "dashboard.html";
    });
  }

  // --- SIGNUP PAGE LOGIC ---
  const signupForm = $("#signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // In a real app we'd create the account.
      // For this prototype, send them into onboarding.
      window.location.href = "onboarding.html";
    });
  }

  // --- DASHBOARD PAGE LOGIC ---
  const logoutBtn = $("#logoutButton");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      // Clear demo data and go back to landing page
      localStorage.removeItem("tkmDemoPlan");
      window.location.href = "index.html";
    });
  }

  // Fill in dashboard snapshot from localStorage if available
  const dashboardName = $("[data-plan-name]");
  const dashboardRange = $("[data-plan-range]");
  const dashboardCalories = $("[data-plan-calories]");
  const dashboardBudget = $("[data-plan-budget]");

  if (dashboardName || dashboardRange || dashboardCalories || dashboardBudget) {
    const raw = localStorage.getItem("tkmDemoPlan");
    let plan = null;

    try {
      plan = raw ? JSON.parse(raw) : null;
    } catch {
      plan = null;
    }

    if (plan) {
      if (dashboardName) {
        dashboardName.textContent = plan.name || "Your week";
      }
      if (dashboardRange) {
        if (plan.start && plan.end) {
          dashboardRange.textContent = `${plan.start} – ${plan.end}`;
        } else {
          dashboardRange.textContent = "This week";
        }
      }
      if (dashboardCalories) {
        dashboardCalories.textContent = plan.calories
          ? `${plan.calories} kcal / day`
          : "Calorie target not set";
      }
      if (dashboardBudget) {
        dashboardBudget.textContent = plan.budget
          ? `$${plan.budget} / week`
          : "Budget not set";
      }
    }
  }
});
