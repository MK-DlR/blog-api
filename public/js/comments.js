// public/js/comments.js

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

    // comment content
    const commentContent = document.createElement("p");
    commentContent.textContent = comment.content;

    // comment date
    // comment author

    // append content to <div>, then <div> to comment container
    commentItem.appendChild(commentContent);
    commentContainer.appendChild(commentItem);
  }
}
