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

      // fetch all posts
      return fetch(`${API_URL}/posts`)
        .then((res) => res.json())
        .then((allPostsData) => {
          // filter and sort published posts
          const publishedPosts = allPostsData.posts
            .filter((p) => p.published)
            .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

          // call updateNavigation with data
          updateNavigation(postId, publishedPosts);

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

              // back to home link
              /*
              const backLink = document.createElement("a");
              backLink.href = "/";
              backLink.classList.add("back-link");
              backLink.textContent = "Back to Home";
              */

              // add post title container and title
              const postHeaderContainer = document.createElement("div");
              postHeaderContainer.classList.add("post-header-container");
              const postHeader = document.createElement("h2");
              postHeader.classList.add("post-header");
              postHeader.textContent = post.title;

              // add post subtitle
              const postSubtitle = document.createElement("p");
              postSubtitle.classList.add("post-subtitle");
              postSubtitle.textContent = "Theme: Revelations";

              // add post image (if exists)
              // add post content
              // formatted post date
              formatDate(post.createdAt);

              // add comments heading
              // add comments list (loop through postComments)
              // add comments dates

              // add comment form

              // append post title container, title, and subtitle to post container
              postContainer.appendChild(postHeaderContainer);
              postHeaderContainer.appendChild(postHeader);
              postContainer.appendChild(postSubtitle);

              // append back link, post and, comment containers to detail container
              // detailContainer.appendChild(backLink);
              detailContainer.appendChild(postContainer);
              detailContainer.appendChild(commentContainer);

              // append detail container to app
              app.appendChild(detailContainer);
            });
        });
    });
}

// navigation links
function updateNavigation(currentPostId, publishedPosts) {
  // find current post's index in array
  const currentIndex = publishedPosts.findIndex(
    (post) => post.id === parseInt(currentPostId),
  );
  // determine what previous post is (if any)
  const previousPost =
    currentIndex > 0 ? publishedPosts[currentIndex - 1] : null;

  // determine what next post is (if any)
  const nextPost =
    currentIndex < publishedPosts.length - 1
      ? publishedPosts[currentIndex + 1]
      : null;

  // update Previous link in the header
  const prevLink = document.getElementById("prev-article");
  if (previousPost) {
    prevLink.href = `?id=${previousPost.id}`;
  } else {
    prevLink.href = "#";
    prevLink.innerHTML = "No more posts";
  }

  // update Next link in the header
  const nextLink = document.getElementById("next-article");
  if (nextPost) {
    nextLink.href = `?id=${nextPost.id}`;
  } else {
    nextLink.href = "#";
    nextLink.innerHTML = "No more posts";
  }
}
