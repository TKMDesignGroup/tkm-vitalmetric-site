// app.js – light front-end logic for the TKM VitalMetric Wellness prototype

(function () {
  document.addEventListener("DOMContentLoaded", function () {
    handleOnboarding();
    handleLogin();
    handleSignup();
    hydrateDashboardFromOnboarding();
  });

  // ------------ Onboarding (wizard + save to localStorage) ------------

  function handleOnboarding() {
    var form = document.getElementById("onboarding-form");
    if (!form) return;

    initOnboardingWizard(form);

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var name = (document.getElementById("name") || {}).value || "";
      var startDate = (document.getElementById("start-date") || {}).value || "";
      var endDate = (document.getElementById("end-date") || {}).value || "";
      var calories = (document.getElementById("calories") || {}).value || "";
      var budget = (document.getElementById("budget") || {}).value || "";

      var payload = {
        name: name,
        startDate: startDate,
        endDate: endDate,
        calories: calories,
        budget: budget
      };

      try {
        localStorage.setItem("tkmOnboarding", JSON.stringify(payload));
      } catch (e) {}

      window.location.href = "dashboard.html";
    });
  }

  function initOnboardingWizard(form) {
    var steps = Array.prototype.slice.call(
      form.querySelectorAll(".onboarding-step")
    );
    if (!steps.length) return;

    var progressLabel = document.getElementById("onboarding-step-label");
    var currentIndex = 0;

    function updateView() {
      steps.forEach(function (step, index) {
        step.style.display = index === currentIndex ? "block" : "none";
      });

      if (progressLabel) {
        var total = steps.length;
        var label =
          steps[currentIndex].getAttribute("data-step-label") || "Onboarding";
        progressLabel.textContent =
          "Step " + (currentIndex + 1) + " of " + total + " · " + label;
      }
    }

    function go(delta) {
      var next = currentIndex + delta;
      if (next < 0 || next >= steps.length) return;
      currentIndex = next;
      updateView();
    }

    form.addEventListener("click", function (event) {
      var target = event.target;

      if (target.closest(".onboarding-next")) {
        event.preventDefault();
        go(1);
        return;
      }

      if (target.closest(".onboarding-prev")) {
        event.preventDefault();
        go(-1);
        return;
      }
    });

    updateView();
  }

  // ------------ Login (demo only) ------------

  function handleLogin() {
    var form = document.getElementById("login-form");
    var googleBtn = document.getElementById("login-google");
    var messageEl = document.getElementById("login-message");

    function goToDashboardWithMessage(msg) {
      if (messageEl) {
        messageEl.textContent = msg;
      }
      setTimeout(function () {
        window.location.href = "dashboard.html";
      }, 600);
    }

    if (googleBtn) {
      googleBtn.addEventListener("click", function () {
        goToDashboardWithMessage(
          "Demo only – simulating Google sign-in and taking you to the Weekly Snapshot."
        );
      });
    }

    if (!form) return;

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      goToDashboardWithMessage(
        "Demo only – using fake email and password to show the Weekly Snapshot."
      );
    });
  }

  // ------------ Signup (demo only) ------------

  function handleSignup() {
    var form = document.getElementById("signup-form");
    var googleBtn = document.getElementById("signup-google");
    var messageEl = document.getElementById("signup-message");

    function goToDashboardWithMessage(msg) {
      if (messageEl) {
        messageEl.textContent = msg;
      }
      setTimeout(function () {
        window.location.href = "dashboard.html";
      }, 600);
    }

    if (googleBtn) {
      googleBtn.addEventListener("click", function () {
        goToDashboardWithMessage(
          "Demo only – simulating Google sign-up and taking you to the Weekly Snapshot."
        );
      });
    }

    if (!form) return;

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      goToDashboardWithMessage(
        "Demo only – pretending to create an account and taking you to the Weekly Snapshot."
      );
    });
  }

  // ------------ Dashboard hydration from onboarding ------------

  function hydrateDashboardFromOnboarding() {
    var snapshotDateRange = document.getElementById("snapshot-date-range");
    var snapshotCalories = document.getElementById("snapshot-calories");
    var snapshotBudget = document.getElementById("snapshot-budget");
    var dashboardTitle = document.getElementById("dashboard-title");

    if (
      !snapshotDateRange &&
      !snapshotCalories &&
      !snapshotBudget &&
      !dashboardTitle
    ) {
      return;
    }

    var stored;
    try {
      stored = JSON.parse(localStorage.getItem("tkmOnboarding") || "null");
    } catch (e) {
      stored = null;
    }

    if (!stored) return;

    if (dashboardTitle && stored.name) {
      dashboardTitle.textContent =
        "Weekly Snapshot – Mission Control for " + stored.name;
    }

    if (snapshotDateRange && (stored.startDate || stored.endDate)) {
      var rangeText;
      if (stored.startDate && stored.endDate) {
        rangeText = stored.startDate + " – " + stored.endDate;
      } else if (stored.startDate) {
        rangeText = "Starting " + stored.startDate;
      } else {
        rangeText = stored.endDate;
      }
      snapshotDateRange.textContent = rangeText;
    }

    if (snapshotCalories && stored.calories) {
      snapshotCalories.textContent = stored.calories + " kcal / day";
    }

    if (snapshotBudget && stored.budget) {
      var budgetNumber = parseFloat(stored.budget);
      var budgetText = isNaN(budgetNumber)
        ? stored.budget
        : "$" + budgetNumber.toFixed(2);
      snapshotBudget.textContent = budgetText + " (example)";
    }
  }
})();
