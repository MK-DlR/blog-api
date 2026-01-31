// frontend-user/js/script.js

import { loadHeader } from "./header.js";
import { showPostList } from "./article-list.js";
import { showPostDetail } from "./post-details.js";

loadHeader();

const params = new URLSearchParams(window.location.search);
const postId = params.get("id");

if (postId) {
  showPostDetail(postId);
} else {
  showPostList();
}
