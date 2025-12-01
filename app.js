// app.js
// Simple UI interactions for TKM VitalMetric prototype

document.addEventListener("DOMContentLoaded", () => {
  // Smooth scroll for any in-page links with data-scroll
  document.querySelectorAll("[data-scroll]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const targetId = btn.getAttribute("data-scroll");
      const target = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // Add a subtle hover effect to main CTA buttons
  document.querySelectorAll(".cta-button").forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      btn.classList.add("cta-button--hover");
    });
    btn.addEventListener("mouseleave", () => {
      btn.classList.remove("cta-button--hover");
    });
  });

  // Demo-only: fake login/signup handlers so forms feel alive
  const demoForms = document.querySelectorAll("form[data-demo-form]");
  demoForms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const type = form.getAttribute("data-demo-form"); // "login" or "signup" etc.
      const message =
        type === "signup"
          ? "Demo only: your TKM VitalMetric account would be created here in the real app."
          : type === "onboarding"
          ? "Demo only: your answers would be saved and used to generate your weekly plan."
          : "Demo only: in the real app you’d be signed in and taken to your dashboard.";

      alert(message);
    });
  });
});
