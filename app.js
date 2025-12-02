// app.js
// Light front-end behavior for the TKM VitalMetric Wellness prototype.
// No real accounts, payments, or data storage yet.

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // Helper: show a quick demo message and then redirect
  function demoRedirect(message, href) {
    if (message) {
      alert(message);
    }
    if (href) {
      window.location.href = href;
    }
  }

  // -----------------------------
  // DEMO LOGIN HANDLER
  // -----------------------------
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const submitButton = loginForm.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Signing you in (demo)…";
      }

      demoRedirect(
        "Demo only – in the full system this would verify your account and load your personal Weekly Snapshot.",
        "dashboard.html"
      );
    });
  }

  // -----------------------------
  // DEMO SIGNUP HANDLER
  // -----------------------------
  const signupForm = document.getElementById("signup-form");
  if (signupForm) {
    signupForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const submitButton = signupForm.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Creating demo account…";
      }

      demoRedirect(
        "Demo only – in the full system this would create your account, start your 7-day free trial, and connect billing.",
        "onboarding.html"
      );
    });
  }
  // -----------------------------
  // DEMO ONBOARDING HANDLER
  // -----------------------------
  const onboardingForm = document.querySelector(".onboarding-form");
  if (onboardingForm) {
    onboardingForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const submitButton = onboardingForm.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Loading demo Weekly Snapshot…";
      }

      demoRedirect(
        "Demo only – in the full system your onboarding answers would be saved and used to generate your weekly plan and shopping list.",
        "dashboard.html"
      );
    });
  }

  // -----------------------------
  // FUTURE: LocalStorage or personalization
  // -----------------------------
  // In a later phase, we can:
  // - Save simple onboarding values to localStorage
  // - Use them to personalize text on the dashboard
  // For now, this is intentionally front-end only.
});
