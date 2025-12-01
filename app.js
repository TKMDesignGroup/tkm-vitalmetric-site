// ===== SIMPLE CLIENT-SIDE ROUTER FOR PROTOTYPE =====

// Utility to show one panel and hide the rest
function showPanel(id) {
    document.querySelectorAll(".panel").forEach(p => p.style.display = "none");
    document.getElementById(id).style.display = "block";
    window.scrollTo(0, 0);
}

// ===== BUTTON HANDLERS =====

// Homepage → Login
document.getElementById("btn-login").onclick = () => showPanel("login-panel");

// Homepage → Onboarding (if clicked before login)
document.getElementById("btn-onboarding-from-home").onclick = () => {
    alert("Please log in first!");
    showPanel("login-panel");
};

// Login → Dashboard (fake auth for now)
document.getElementById("login-submit").onclick = (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value.trim();
    if (!email) {
        alert("Enter an email to continue.");
        return;
    }

    // Store fake session
    localStorage.setItem("tkmUser", email);

    // Update header state
    document.getElementById("nav-user-email").textContent = email;
    document.getElementById("nav-signed-out").style.display = "none";
    document.getElementById("nav-signed-in").style.display = "flex";

    showPanel("dashboard-panel");
};

// Create Account → Onboarding wizard (prototype)
document.getElementById("create-submit").onclick = (e) => {
    e.preventDefault();
    const email = document.getElementById("create-email").value.trim();
    if (!email) {
        alert("Enter an email to continue.");
        return;
    }

    localStorage.setItem("tkmUser", email);

    document.getElementById("nav-user-email").textContent = email;
    document.getElementById("nav-signed-out").style.display = "none";
    document.getElementById("nav-signed-in").style.display = "flex";

    showPanel("onboarding-panel");
};

// Onboarding “Continue to Dashboard”
document.getElementById("onboarding-finish").onclick = () => {
    showPanel("dashboard-panel");
};

// Sign out
document.getElementById("nav-signout").onclick = () => {
    localStorage.removeItem("tkmUser");
    document.getElementById("nav-signed-out").style.display = "flex";
    document.getElementById("nav-signed-in").style.display = "none";
    showPanel("home-panel");
};

// ===== AUTO-LOGIN CHECK =====
window.onload = () => {
    const email = localStorage.getItem("tkmUser");
    if (email) {
        document.getElementById("nav-user-email").textContent = email;
        document.getElementById("nav-signed-out").style.display = "none";
        document.getElementById("nav-signed-in").style.display = "flex";
        showPanel("dashboard-panel");
    } else {
        showPanel("home-panel");
    }
};
