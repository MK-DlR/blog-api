// admin/js/script.js

import { loadHeader } from "/shared/scripts/header.js";
import { loadSidebar } from "/shared/scripts/sidebar.js";
import { showPostDetail } from "/js/post-details.js";
import { showPostList } from "/js/article-list.js";
import { displayComments } from "/js/comments.js";

loadHeader();
loadSidebar();

// admin-specific logic goes here
console.log("Admin loaded");
