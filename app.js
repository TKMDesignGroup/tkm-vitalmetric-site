// app.js – light front-end logic for prototype only

document.addEventListener("DOMContentLoaded", function () {
  // Onboarding "finish" button: go to dashboard demo
  var onboardingForm = document.getElementById("onboarding-form");
  if (onboardingForm) {
    onboardingForm.addEventListener("submit", function (e) {
      e.preventDefault();
      // In a real app, we'd send data to backend.
      alert("Prototype only – taking you to the demo Weekly Snapshot.");
      window.location.href = "dashboard.html";
    });
  }

  // Fake login form
  var loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var msgEl = document.getElementById("auth-message");
      if (msgEl) {
        msgEl.textContent =
          "Demo only – this doesn’t create a real session. Redirecting to Weekly Snapshot…";
      } else {
        alert("Demo only – redirecting to the Weekly Snapshot.");
      }
      setTimeout(function () {
        window.location.href = "dashboard.html";
      }, 700);
    });
  }

  // Fake signup form
  var signupForm = document.getElementById("signup-form");
  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var msgEl = document.getElementById("signup-message");
      if (msgEl) {
        msgEl.textContent =
          "Demo only – no real account is created yet. Redirecting to onboarding…";
      } else {
        alert("Demo only – redirecting to onboarding.");
      }
      setTimeout(function () {
        window.location.href = "onboarding.html";
      }, 700);
    });
  }
});
