// admin/js/script.js

import { loadHeader } from "/shared/scripts/header.js";
import { loadSidebar } from "/shared/scripts/sidebar.js";
import { showPostDetail } from "/js/post-details.js";
import { showPostList } from "/js/article-list.js";
import { newPost } from "./new-post.js";
import { editPost } from "./edit-post.js";

loadHeader();
loadSidebar();

// handle url parameters
const params = new URLSearchParams(window.location.search);
const postId = params.get("id");
const view = params.get("view");

if (view === "edit" && postId) {
  // edit post was clicked
  editPost(postId);
} else if (view === "list") {
  // article list was clicked
  showPostList(true);
} else if (postId) {
  // specific post was clicked
  showPostDetail(postId, true);
} else {
  newPost();
}

console.log("Admin loaded");
