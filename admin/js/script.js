// admin/js/script.js

import { loadHeader } from "/shared/scripts/header.js";
import { loadSidebar } from "/shared/scripts/sidebar.js";
import { showPostDetail } from "/js/post-details.js";
import { showPostList } from "/js/article-list.js";
import { displayComments } from "/js/comments.js";

loadHeader();
loadSidebar();

// handle url parameters
const params = new URLSearchParams(window.location.search);
const postId = params.get("id");
const view = params.get("view");

if (postId) {
  // specific post was clicked
  showPostDetail(postId);
} else if (view === "list") {
  // article list was clicked
  showPostList();
} else {
  // default view - for now just show message
  // later show "new post" form here
  document.getElementById("app").innerHTML =
    "Admin Panel - New Post Form (coming soon)";
}

console.log("Admin loaded");
