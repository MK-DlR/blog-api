// public/js/comments.js

import { formatDate } from "./formatter.js";

export function displayComments(commentContainer, postComments) {
  // create comment title container and title
  const commentHeaderContainer = document.createElement("div");
  commentHeaderContainer.classList.add("comment-header-container");
  const commentHeader = document.createElement("h2");
  commentHeader.classList.add("comment-header");
  commentHeader.textContent = "Comments";

  // append comment title container and title to comment container
  commentContainer.appendChild(commentHeaderContainer);
  commentHeaderContainer.appendChild(commentHeader);

  // create comments list (loop through postComments)
  for (const comment of postComments) {
    // create <div> for individual comment
    const commentItem = document.createElement("div");
    commentItem.classList.add("comment-item");

    // comment content
    const commentContent = document.createElement("p");
    commentContent.classList.add("comment-content");
    commentContent.textContent = comment.content;

    // create author and date container
    const authorDateWrapper = document.createElement("div");
    authorDateWrapper.classList.add("author-date-wrapper");

    // create formatted comment date
    const commentDate = document.createElement("p");
    commentDate.classList.add("comment-date");
    commentDate.textContent = `Posted on ${formatDate(comment.createdAt)}`;

    // comment author
    const commentAuthor = document.createElement("p");
    commentAuthor.classList.add("comment-author");
    commentAuthor.textContent = comment.guestName
      ? comment.guestName
      : "Anonymous";

    // append content and author + date to <div>, then <div> to comment container
    commentItem.appendChild(commentContent);
    authorDateWrapper.appendChild(commentAuthor);
    authorDateWrapper.appendChild(commentDate);
    commentItem.appendChild(authorDateWrapper);
    commentContainer.appendChild(commentItem);
  }
}

export function commentBox() {
  const commentForm = document.createElement("form");
  commentForm.classList.add("comment-form");
  commentForm.method = "POST";
  commentForm.action = "/submit";
}
