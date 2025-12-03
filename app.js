// app.js — simple mobile navigation toggle

document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var body = document.body;

  if (!toggle) return;

  toggle.addEventListener("click", function () {
    body.classList.toggle("nav-open");
  });
});
