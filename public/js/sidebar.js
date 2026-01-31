// public/js/sidebar.js

// inject sidebar
export async function loadSidebar() {
  const res = await fetch("partials/sidebar.html");
  const html = await res.text();
  document.getElementById("sidebar").innerHTML = html;
}
