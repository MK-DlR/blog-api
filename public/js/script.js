// public/js/script.js

import { loadHeader } from "/shared/scripts/header.js";
import { loadSidebar } from "/shared/scripts/sidebar.js";
import { showPostList } from "./article-list.js";
import { showPostDetail } from "./post-details.js";
import { API_URL } from "../config.js";

loadHeader();
loadSidebar();

// show most recent post for homepage
function showMostRecentPost() {
  fetch(`${API_URL}/posts`)
    .then((res) => res.json())
    .then((data) => {
      // filter published posts only
      const publishedPosts = data.posts.filter((post) => post.published);

      // sort by newest first
      publishedPosts.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      // get most recent post
      const mostRecentPost = publishedPosts[0];

      // show post details
      if (mostRecentPost) {
        showPostDetail(mostRecentPost.id);
      } else {
        // no published posts exist, show article list instead
        showPostList();
      }
    });
}

// handle url parameters
const params = new URLSearchParams(window.location.search);
const postId = params.get("id");
const view = params.get("view");

if (postId) {
  // specific post was clicked
  showPostDetail(postId);
} else if (view === "list") {
  // full article list was clicked
  showPostList();
} else {
  // homepage, show most recent post
  showMostRecentPost();
}
