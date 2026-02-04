// admin/js/new-post.js

export function newPost() {
  const app = document.getElementById("app");
  // clear app
  app.innerHTML = "";

  // create new post container
  const newPostContainer = document.createElement("div");
  newPostContainer.classList.add("new-post-container");

  // create new post header container and header
  const newPostHeaderContainer = document.createElement("div");
  newPostHeaderContainer.classList.add("new-post-header-container");
  const newPostHeader = document.createElement("h2");
  newPostHeader.textContent = "New Article";

  // append header to container
  newPostHeaderContainer.appendChild(newPostHeader);
  newPostContainer.appendChild(newPostHeaderContainer);

  // create post form
  const postForm = document.createElement("form");
  postForm.classList.add("new-post-form");
  postForm.method = "POST";
  postForm.action = "/api/posts";

  // create post title input and label
  const postTitle = document.createElement("input");
  postTitle.classList.add("post-input");
  postTitle.name = "title";
  postTitle.id = "title";
  postTitle.type = "text";
  postTitle.placeholder = "Title";
  const postTitleLabel = document.createElement("label");
  postTitleLabel.textContent = "Title:";
  postTitleLabel.setAttribute("for", "title");

  // create post content input and label
  const postContent = document.createElement("textarea");
  postContent.classList.add("post-input");
  postContent.name = "content";
  postContent.id = "content";
  postContent.placeholder = "Article Content";
  const postContentLabel = document.createElement("label");
  postContentLabel.textContent = "Article Content:";
  postContentLabel.setAttribute("for", "content");

  // TO DO: create publish and draft buttons container
  const postButtonsContainer = document.createElement("div");
  postButtonsContainer.classList.add("post-buttons-container");

  // create publish button (published posts)
  const postSubmit = document.createElement("button");
  postSubmit.classList.add("post-submit");
  postSubmit.type = "submit";
  postSubmit.textContent = "Publish Article";

  // create draft button (unpublished posts)
  const postDraft = document.createElement("button");
  postDraft.classList.add("post-draft");
  postDraft.type = "submit";
  postDraft.textContent = "Draft Article";
  // TO DO: set published boolean to false

  // TO DO: image uploader or spot to submit url for image

  // append buttons to button container
  postButtonsContainer.appendChild(postSubmit);
  postButtonsContainer.appendChild(postDraft);

  // append labels and inputs to form
  // and button container to form
  postForm.appendChild(postTitleLabel);
  postForm.appendChild(postTitle);
  postForm.appendChild(postContentLabel);
  postForm.appendChild(postContent);
  postForm.appendChild(postButtonsContainer);

  // append form to new post container and container to app
  newPostContainer.appendChild(postForm);
  app.appendChild(newPostContainer);
}
