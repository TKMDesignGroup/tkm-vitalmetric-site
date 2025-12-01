// app.js – simple prototype behavior only

document.addEventListener("DOMContentLoaded", () => {
  // Fake login: just prevent real submit and go to dashboard
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      window.location.href = "dashboard.html";
    });
  }

  // Fake signup: same idea
  const signupForm = document.getElementById("signup-form");
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      window.location.href = "dashboard.html";
    });
  }

  // Onboarding: ignore values, just jump to dashboard
  const onboardingForm = document.getElementById("onboarding-form");
  if (onboardingForm) {
    onboardingForm.addEventListener("submit", (e) => {
      e.preventDefault();
      window.location.href = "dashboard.html";
    });
  }
});
