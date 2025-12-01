// Simple front-end session + view switching for TKM VitalMetric prototype

document.addEventListener("DOMContentLoaded", () => {
  const loginScreen = document.getElementById("loginScreen");
  const dashboard = document.getElementById("dashboard");

  const loginForm = document.getElementById("loginForm");
  const loginEmailInput = document.getElementById("loginEmail");
  const loginNameInput = document.getElementById("loginName");

  const fakeGoogleBtn = document.getElementById("fakeGoogleBtn");

  const userNameDisplay = document.getElementById("userNameDisplay");
  const snapshotStatus = document.getElementById("snapshotStatus");

  const logoutBtn = document.getElementById("logoutBtn");
  const startPlanBtn = document.getElementById("startPlanBtn");
  const resumePlanBtn = document.getElementById("resumePlanBtn");
  const exerciseBtn = document.getElementById("exerciseBtn");
  const pantryHelperBtn = document.getElementById("pantryHelperBtn");
  const shoppingHelperBtn = document.getElementById("shoppingHelperBtn");

  const weeksTrackedEl = document.getElementById("weeksTracked");
  const avgCaloriesEl = document.getElementById("avgCalories");
  const sodiumTrendEl = document.getElementById("sodiumTrend");
  const historyListEl = document.getElementById("historyList");

  // Keys for localStorage
  const STORAGE_KEY_USER = "tkmUser";
  const STORAGE_KEY_PLANS = "tkmPlans";

  // --------------------------
  // Helpers
  // --------------------------

  function setSnapshotStatus(text, isActive) {
    if (!snapshotStatus) return;
    snapshotStatus.textContent = text;
    snapshotStatus.style.backgroundColor = isActive
      ? "rgba(16, 185, 129, 0.25)"
      : "rgba(15, 23, 42, 0.2)";
  }

  function loadUserFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_USER);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      console.warn("Could not parse stored user", e);
      return null;
    }
  }

  function saveUserToStorage(user) {
    try {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    } catch (e) {
      console.warn("Could not save user", e);
    }
  }

  function loadPlansFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_PLANS);
      if (!raw) return [];
      return JSON.parse(raw);
    } catch (e) {
      console.warn("Could not parse stored plans", e);
      return [];
    }
  }

  function savePlansToStorage(plans) {
    try {
      localStorage.setItem(STORAGE_KEY_PLANS, JSON.stringify(plans));
    } catch (e) {
      console.warn("Could not save plans", e);
    }
  }

  function showDashboard(user) {
    if (!userNameDisplay) return;

    userNameDisplay.textContent = user.name || "Friend";
    loginScreen.classList.add("hidden");
    dashboard.classList.remove("hidden");
    setSnapshotStatus(`Signed in as ${user.email}`, true);

    // Populate basic prototype stats
    const plans = loadPlansFromStorage();
    weeksTrackedEl.textContent = plans.length.toString();

    if (plans.length > 0) {
      const avg = Math.round(
        plans.reduce((sum, p) => sum + (p.avgCalories || 2200), 0) /
          plans.length
      );
      avgCaloriesEl.textContent = `${avg.toLocaleString()} kcal`;
      sodiumTrendEl.textContent = "Improving vs. baseline (prototype)";
      renderHistory(plans);
    } else {
      avgCaloriesEl.textContent = "—";
      sodiumTrendEl.textContent = "Not enough data";
      renderHistory([]);
    }
  }

  function showLogin() {
    loginScreen.classList.remove("hidden");
    dashboard.classList.add("hidden");
    setSnapshotStatus("Not signed in", false);
  }

  function renderHistory(plans) {
    if (!historyListEl) return;

    historyListEl.innerHTML = "";
    if (!plans || plans.length === 0) {
      const li = document.createElement("li");
      li.textContent = "No saved plans yet on this device.";
      historyListEl.appendChild(li);
      return;
    }

    plans
      .slice(-4) // last 4 plans
      .reverse() // newest first
      .forEach((p) => {
        const li = document.createElement("li");
        li.textContent = `${p.label || "Weekly plan"} – approx ${
          p.avgCalories || 2200
        } kcal/day, $${(p.budget || 75).toFixed(2)} budget`;
        historyListEl.appendChild(li);
      });
  }

  // --------------------------
  // Initial load: check session
  // --------------------------

  const existingUser = loadUserFromStorage();
  if (existingUser) {
    showDashboard(existingUser);
  } else {
    showLogin();
  }

  // --------------------------
  // Login form submit
  // --------------------------

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = (loginEmailInput.value || "").trim();
      const name = (loginNameInput.value || "").trim() || "Friend";

      if (!email) {
        alert("Please enter your email.");
        return;
      }

      const user = { email, name };
      saveUserToStorage(user);
      showDashboard(user);
    });
  }

  // --------------------------
  // Fake Google button (demo only)
  // --------------------------

  if (fakeGoogleBtn) {
    fakeGoogleBtn.addEventListener("click", () => {
      const user = {
        email: "demo-user+google@example.com",
        name: "Demo User",
      };
      saveUserToStorage(user);
      showDashboard(user);
      alert(
        "In the real app this will use Google Sign-In. For now, we’re just simulating a demo login."
      );
    });
  }

  // --------------------------
  // Logout
  // --------------------------

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem(STORAGE_KEY_USER);
      // We can keep plans for now – or clear them if you want a hard reset:
      // localStorage.removeItem(STORAGE_KEY_PLANS);
      showLogin();
    });
  }

  // --------------------------
  // Demo buttons
  // --------------------------

  if (startPlanBtn) {
    startPlanBtn.addEventListener("click", () => {
      const plans = loadPlansFromStorage();
      const newPlan = {
        label: `Prototype plan #${plans.length + 1}`,
        avgCalories: 2200,
        budget: 75,
        createdAt: new Date().toISOString(),
      };
      plans.push(newPlan);
      savePlansToStorage(plans);
      renderHistory(plans);
      weeksTrackedEl.textContent = plans.length.toString();
      avgCaloriesEl.textContent = "2,200 kcal (prototype)";
      sodiumTrendEl.textContent = "Assuming improved vs. old baseline";

      alert(
        "In the full system this will launch the real onboarding wizard.\n\nRight now it just logs a sample plan in your local history on this device."
      );
    });
  }

  if (resumePlanBtn) {
    resumePlanBtn.addEventListener("click", () => {
      alert(
        "Resume wizard is not wired up yet in this prototype.\n\nIn the real app, this will jump back into your last incomplete onboarding flow."
      );
    });
  }

  if (exerciseBtn) {
    exerciseBtn.addEventListener("click", () => {
      alert(
        "