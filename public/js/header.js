// public/js/header.js

// inject header
export async function loadHeader() {
  const res = await fetch("partials/header.html");
  const html = await res.text();
  document.getElementById("header").innerHTML = html;
}
