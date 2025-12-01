// Simple front-end-only auth prototype for TKM VitalMetric

(function () {
  const STORAGE_KEY = "tkmVitalmetricUser";

  // Helpers
  function $(selector) {
    return document.querySelector(selector);
  }

  function loadUser() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      console.warn("Could not read stored user", e);
      return null;
    }
  }

  function saveUser(user) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }

  function clearUser() {
    localStorage.removeItem(STORAGE_KEY);
  }

  // UI elements
  const authStatusText = $("#auth-status-text");
  const headerSigninBtn = $("#header-signin-btn");
  const headerCreateBtn = $("#header-create-btn");
  const headerSignoutBtn = $("#header-signout-btn");

  const signinForm = $("#signin-form");
  const createForm = $("#create-form");
  const signinEmail = $("#signin-email");
  const signinPassword = $("#signin-password");
  const createName = $("#create-name");
  const createEmail = $("#create-email");
  const createPassword = $("#create-password");
  const googleBtn = $("#google-signin-btn");

  function updateAuthUI(user) {
    if (user) {
      authStatusText.textContent = `Signed in as ${user.name || user.email}`;
      authStatusText.classList.remove("status-pill--unsigned");
      authStatusText.classList.add("status-pill--signed");
      headerSignoutBtn.classList.remove("is-hidden");
      headerSigninBtn.textContent = "Go to Sign In";
    } else {
      authStatusText.textContent = "Not signed in";
      authStatusText.classList.add("status-pill--unsigned");
      authStatusText.classList.remove("status-pill--signed");
      headerSignoutBtn.classList.add("is-hidden");
      headerSigninBtn.textContent = "Sign In";
    }
  }

  function scrollToCard(cardId) {
    const el = document.getElementById(cardId);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // Initial state
  const existingUser = loadUser();
  updateAuthUI(existingUser);

  // Header nav buttons
  if (headerSigninBtn) {
    headerSigninBtn.addEventListener("click", function () {
      scrollToCard("signin-card");
      signinEmail.focus();
    });
  }

  if (headerCreateBtn) {
    headerCreateBtn.addEventListener("click", function () {
      scrollToCard("create-card");
      createName.focus();
    });
  }

  if (headerSignoutBtn) {
    headerSignoutBtn.addEventListener("click", function () {
      clearUser();
      updateAuthUI(null);
      alert("Signed out (prototype only).");
    });
  }

  // Create account
  if (createForm) {
    createForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const user = {
        name: createName.value.trim() || "User",
        email: createEmail.value.trim(),
        password: createPassword.value || "",
        createdAt: new Date().toISOString(),
      };

      if (!user.email) {
        alert("Please enter an email address.");
        return;
      }

      saveUser(user);
      updateAuthUI(user);

      // Prefill sign-in form for convenience
      signinEmail.value = user.email;
      signinPassword.value = user.password;

      alert(
        "Account created in this browser (prototype only). You can now sign in."
      );
    });
  }

  // Sign in
  if (signinForm) {
    signinForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const stored = loadUser();
      const email = signinEmail.value.trim();
      const password = signinPassword.value;

      if (!stored) {
        alert(
          "No prototype account found yet. Please create an account first (data is stored only on this device)."
        );
        return;
      }

      if (stored.email !== email) {
        alert("Email does not match the saved prototype account.");
        return;
      }

      // For prototype we just compare raw strings
      if (stored.password !== password) {
        alert("Password does not match the saved prototype account.");
        return;
      }

      updateAuthUI(stored);
      alert("Signed in (prototype only). You are now 'logged in' on this page.");
    });
  }

  // Google test button
  if (googleBtn) {
    googleBtn.addEventListener("click", function () {
      alert(
        "Google sign-in will be wired up later.\n\nFor now, this button is just a visual placeholder in the prototype."
      );
    });
  }
})();