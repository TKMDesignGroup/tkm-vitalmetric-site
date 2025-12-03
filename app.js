// app.js - simple, stable mobile menu for Wellness Pilot

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".wp-menu-toggle");
  const nav = document.querySelector(".wp-nav");

  // If either is missing, quietly do nothing
  if (!toggle || !nav) {
    return;
  }

  // Open/close the mobile menu when the 3-line button is tapped
  toggle.addEventListener("click", () => {
    nav.classList.toggle("wp-nav-open");
  });

  // When the user taps a link in the menu, close the menu
  const navLinks = nav.querySelectorAll("a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("wp-nav-open");
    });
  });
});
