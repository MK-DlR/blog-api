// frontend-user/script.js

import { API_URL } from "./config.js";

// show post list
function showPostList() {
  fetch(`${API_URL}/posts`)
    .then((res) => res.json())
    .then((data) => {
      const publishedPosts = data.posts.filter((post) => post.published);
      const app = document.getElementById("app");
      // clear app
      app.innerHTML = "";

      // create article container
      const articleContainer = document.createElement("ul");

      // loop through published posts
      for (const post of publishedPosts) {
        // create <li>
        const articleItem = document.createElement("li");

        // create clickable title link
        const articleLink = document.createElement("a");
        articleLink.href = `#post/${post.id}`;
        articleLink.textContent = post.title;

        // append link to <li>, then <li> to <ul>
        articleItem.appendChild(articleLink);
        articleContainer.appendChild(articleItem);
      }

      // append <ul> to app
      app.appendChild(articleContainer);
    });
}

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
function showPostDetail(postId) {
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

          // add back link
          // add post title
          // add post image (if exists)
          // add post content
          // formatted post date
          formatDate(post.createdAt);

          // add comments heading
          // add comments list (loop through postComments)
          // add comments dates

          // add comment form

          // append to app
          app.appendChild(detailContainer);
        });
    });
}

// router
function handleRoute() {
  const hash = window.location.hash;

  if (hash.startsWith("#post/")) {
    const postId = hash.split("/")[1];
    showPostDetail(postId);
  } else {
    showPostList();
  }
}

// listen for changes
window.addEventListener("hashchange", handleRoute);
window.addEventListener("load", handleRoute);
