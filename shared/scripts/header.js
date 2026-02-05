// shared/scripts/header.js

// inject header
export async function loadHeader() {
  const res = await fetch("/shared/partials/header.html");
  const html = await res.text();
  document.getElementById("header").innerHTML = html;

  // after header is loaded, update login/logout link
  updateAuthLink();
}

// conditionally display login vs logout
function updateAuthLink() {
  const logLink = document.querySelector(".log");
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  if (isAdmin) {
    logLink.textContent = "Logout";
    logLink.href = "#";
    logLink.addEventListener("click", handleLogout);
  } else {
    logLink.textContent = "Login";
    logLink.href = "?view=login";
  }
}

function handleLogout(e) {
  e.preventDefault();
  localStorage.removeItem("isAdmin");
  window.location.href = "/";
}
