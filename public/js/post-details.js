// public/js/post-details.js

import { API_URL } from "../config.js";

// date formatter
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// show post detail
export function showPostDetail(postId) {
  const app = document.getElementById("app");
  // clear app
  app.innerHTML = "";

  // fetch post
  fetch(`${API_URL}/posts/${postId}`)
    .then((res) => res.json())
    .then((postData) => {
      const post = postData.post;

      // fetch all comments
      return fetch(`${API_URL}/comments`)
        .then((res) => res.json())
        .then((commentsData) => {
          // filter to just this post's comments
          const postComments = commentsData.comments.filter(
            (comment) => comment.postId === parseInt(postId),
          );

          // create detail container
          const detailContainer = document.createElement("div");
          // create post and comment containers
          const postContainer = document.createElement("div");
          const commentContainer = document.createElement("div");

          // add post title
          // add post image (if exists)
          // add post content
          // formatted post date
          formatDate(post.createdAt);

          // add comments heading
          // add comments list (loop through postComments)
          // add comments dates

          // add comment form

          // append post and comment containers to detail container
          detailContainer.appendChild(postContainer);
          detailContainer.appendChild(commentContainer);

          // append detail container to app
          app.appendChild(detailContainer);
        });
    });
}
