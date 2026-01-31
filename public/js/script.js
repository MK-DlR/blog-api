// public/js/script.js

import { loadHeader } from "./header.js";
import { loadSidebar } from "./sidebar.js";
import { showPostList } from "./article-list.js";
import { showPostDetail } from "./post-details.js";

loadHeader();
loadSidebar();

const params = new URLSearchParams(window.location.search);
const postId = params.get("id");

if (postId) {
  showPostDetail(postId);
} else {
  showPostList();
}
