// app.js
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".wp-menu-toggle");
  const nav = document.querySelector(".wp-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("wp-nav-open");
    });
  }
});
