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

  // form here

  // append container to app
  app.appendChild(newPostContainer);
}
