// public/js/post-details.js

import { API_URL } from "../config.js";
import { displayComments, commentBox } from "./comments.js";
import { formatDate } from "/shared/scripts/formatter.js";

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

              // create detail and post containers
              const detailContainer = document.createElement("div");
              const postContainer = document.createElement("div");

              // create post title container and title
              const postHeaderContainer = document.createElement("div");
              postHeaderContainer.classList.add("post-header-container");
              const postHeader = document.createElement("h2");
              postHeader.classList.add("post-header");
              postHeader.textContent = post.title;

              // create post subtitle
              const postSubtitle = document.createElement("p");
              postSubtitle.classList.add("post-subtitle");
              postSubtitle.textContent = "Theme: Revelations";

              // create post content
              const postContent = document.createElement("div");
              postContent.classList.add("post-content");
              postContent.textContent = post.content;

              // create a wrapper for content + image layout
              const contentWrapper = document.createElement("div");
              contentWrapper.classList.add("content-wrapper");

              // create post image (if exists)
              if (post.imageUrl) {
                const postImage = document.createElement("img");
                postImage.src = post.imageUrl;
                postImage.alt = post.title;
                postImage.classList.add("post-image");
                contentWrapper.appendChild(postContent);
                contentWrapper.appendChild(postImage);
              } else {
                contentWrapper.appendChild(postContent);
              }

              // formatted post date
              formatDate(post.createdAt);

              // append post title container, title, subtitle,
              // and content wrapper to post container
              postContainer.appendChild(postHeaderContainer);
              postHeaderContainer.appendChild(postHeader);
              postContainer.appendChild(postSubtitle);
              postContainer.appendChild(contentWrapper);

              // create new comment box
              const commentForm = commentBox(postId);

              // submit form data
              commentForm.addEventListener("submit", (event) => {
                event.preventDefault();

                // extract form data
                const formData = new FormData(commentForm);
                const content = formData.get("content");
                const guestName = formData.get("guestName");

                // create data object to send
                const commentData = {
                  content: content,
                  guestName: guestName,
                  postId: postId,
                };

                // make fetch POST request
                fetch(`${API_URL}/comments`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(commentData),
                })
                  .then((res) => {
                    // check if response is not ok (status 400, 500, etc.)
                    if (!res.ok) {
                      return res.json().then((errorData) => {
                        throw new Error(
                          errorData.error || "Failed to post comment",
                        );
                      });
                    }
                    return res.json();
                  })
                  .then((data) => {
                    // get new comment from response
                    const newComment = data.comment;

                    // add new comment to array
                    postComments.push(newComment);

                    // clear comment container
                    commentContainer.innerHTML = "";

                    // re-display with updated comments
                    displayComments(
                      commentContainer,
                      postComments,
                      commentForm,
                    );

                    // reset form
                    commentForm.reset();

                    // remove any existing error message
                    const existingError =
                      commentForm.querySelector(".error-message");
                    if (existingError) {
                      existingError.remove();
                    }
                  })
                  .catch((err) => {
                    console.error("Error posting comment:", err);

                    // display error message to user
                    let errorMsg = commentForm.querySelector(".error-message");
                    if (!errorMsg) {
                      errorMsg = document.createElement("div");
                      errorMsg.classList.add("error-message");
                      commentForm.insertBefore(
                        errorMsg,
                        commentForm.firstChild,
                      );
                    }
                    errorMsg.textContent = err.message;
                  });
              });

              // create and populate comment container
              const commentContainer = document.createElement("div");

              // display existing comments
              displayComments(commentContainer, postComments, commentForm);

              // append post and comment containers to detail container
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
    prevLink.innerHTML = "No older articles";
  }

  // update Next link in the header
  const nextLink = document.getElementById("next-article");
  if (nextPost) {
    nextLink.href = `?id=${nextPost.id}`;
  } else {
    nextLink.href = "#";
    nextLink.innerHTML = "No newer articles";
  }
}
