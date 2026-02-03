// public/js/comments.js

import { formatDate } from "/shared/scripts/formatter.js";

export function displayComments(commentContainer, postComments, commentForm) {
  // create comment title container and title
  const commentHeaderContainer = document.createElement("div");
  commentHeaderContainer.classList.add("comment-header-container");
  const commentHeader = document.createElement("h2");
  commentHeader.classList.add("comment-header");
  commentHeader.textContent = "Comments";

  // append comment title container and title to comment container
  commentContainer.appendChild(commentHeaderContainer);
  commentHeaderContainer.appendChild(commentHeader);

  // append comment form
  commentContainer.appendChild(commentForm);

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

    // create comment author
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

export function commentBox(postId) {
  // create comment form
  const commentForm = document.createElement("form");
  commentForm.classList.add("comment-form");
  commentForm.method = "POST";
  commentForm.action = "/api/comments";

  // hidden input for postId parameter
  const hiddenPostId = document.createElement("input");
  hiddenPostId.type = "hidden";
  hiddenPostId.name = "postId";
  hiddenPostId.value = postId;

  // create guestName input and label
  const commentAuthor = document.createElement("input");
  commentAuthor.classList.add("comment-input");
  commentAuthor.name = "guestName";
  commentAuthor.id = "guestName";
  commentAuthor.type = "text";
  commentAuthor.placeholder = "Nickname";
  const commentAuthorLabel = document.createElement("label");
  commentAuthorLabel.textContent = "Nickname:";
  commentAuthorLabel.setAttribute("for", "guestName");

  // create content input and label
  const commentContent = document.createElement("textarea");
  commentContent.classList.add("comment-input");
  commentContent.name = "content";
  commentContent.id = "content";
  commentContent.placeholder = "Comment";
  const commentContentLabel = document.createElement("label");
  commentContentLabel.textContent = "Comment:";
  commentContentLabel.setAttribute("for", "content");

  // create submit button
  const commentSubmit = document.createElement("button");
  commentSubmit.classList.add("comment-submit");
  commentSubmit.type = "submit";
  commentSubmit.textContent = "Submit Comment";

  // append labels and input to form
  commentForm.appendChild(hiddenPostId);
  commentForm.appendChild(commentAuthorLabel);
  commentForm.appendChild(commentAuthor);
  commentForm.appendChild(commentContentLabel);
  commentForm.appendChild(commentContent);
  commentForm.appendChild(commentSubmit);

  return commentForm;
}
