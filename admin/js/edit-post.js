// admin/js/edit-post.js

import { API_URL } from "../config.js";

export function editPost(postId) {
  const app = document.getElementById("app");
  // clear app
  app.innerHTML = "";

  fetch(`${API_URL}/posts/${postId}`)
    .then((res) => res.json())
    .then((data) => {
      const post = data.post;

      // create new post container
      const newPostContainer = document.createElement("div");
      newPostContainer.classList.add("new-post-container");

      // create new post header container and header
      const newPostHeaderContainer = document.createElement("div");
      newPostHeaderContainer.classList.add("new-post-header-container");
      const newPostHeader = document.createElement("h2");
      newPostHeader.textContent = "Edit Article";

      // append header to container
      newPostHeaderContainer.appendChild(newPostHeader);
      newPostContainer.appendChild(newPostHeaderContainer);

      // create post form
      const postForm = document.createElement("form");
      postForm.classList.add("new-post-form");
      postForm.method = "PUT";
      postForm.action = "/api/posts";

      // create post title input and label
      const postTitle = document.createElement("input");
      postTitle.classList.add("post-input");
      postTitle.name = "title";
      postTitle.id = "title";
      postTitle.type = "text";
      postTitle.value = post.title;
      const postTitleLabel = document.createElement("label");
      postTitleLabel.textContent = "Title:";
      postTitleLabel.setAttribute("for", "title");

      // create post content input and label
      const postContent = document.createElement("textarea");
      postContent.classList.add("post-input");
      postContent.name = "content";
      postContent.id = "content";
      postContent.value = post.content;
      const postContentLabel = document.createElement("label");
      postContentLabel.textContent = "Article Content:";
      postContentLabel.setAttribute("for", "content");

      // create image url input and label
      const imgUrl = document.createElement("input");
      imgUrl.classList.add("post-input");
      imgUrl.name = "imageUrl";
      imgUrl.id = "imageUrl";
      imgUrl.type = "text";
      imgUrl.value = post.imageUrl || "";
      const imgUrlLabel = document.createElement("label");
      imgUrlLabel.textContent = "Image URL:";
      imgUrlLabel.setAttribute("for", "imageUrl");

      // create publish and draft buttons container
      const postButtonsContainer = document.createElement("div");
      postButtonsContainer.classList.add("post-buttons-container");

      // create publish button (published posts)
      const postSubmit = document.createElement("button");
      postSubmit.classList.add("post-submit");
      postSubmit.type = "submit";
      postSubmit.textContent = "Update Article";

      // create draft button (unpublished posts)
      const postDraft = document.createElement("button");
      postDraft.classList.add("post-draft");
      postDraft.type = "submit";
      postDraft.textContent = "Save As Draft";

      // append buttons to button container
      postButtonsContainer.appendChild(postSubmit);
      postButtonsContainer.appendChild(postDraft);

      // append labels, inputs, and
      // button container to form
      postForm.appendChild(postTitleLabel);
      postForm.appendChild(postTitle);
      postForm.appendChild(postContentLabel);
      postForm.appendChild(postContent);
      postForm.appendChild(imgUrlLabel);
      postForm.appendChild(imgUrl);
      postForm.appendChild(postButtonsContainer);

      // append form to new post container and container to app
      newPostContainer.appendChild(postForm);
      app.appendChild(newPostContainer);

      // submit form data
      postForm.addEventListener("submit", (event) => {
        event.preventDefault();

        // extract form data
        const formData = new FormData(postForm);
        const content = formData.get("content");
        const title = formData.get("title");
        const imageUrl = formData.get("imageUrl");

        // check if publish article or draft article was pressed
        let published;
        if (event.submitter.classList.contains("post-submit")) {
          published = true;
        } else {
          published = false;
        }

        // create data object to send
        const postData = {
          title: title,
          content: content,
          published: published,
          imageUrl: imageUrl,
        };

        // make fetch PUT request
        const token = localStorage.getItem("token");

        fetch(`${API_URL}/posts/${postId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData),
        })
          .then((res) => {
            // check if response is not ok (status 400, 500, etc.)
            if (!res.ok) {
              return res.json().then((errorData) => {
                throw new Error(errorData.error || "Failed to post article");
              });
            }
            return res.json();
          })
          .then(() => {
            window.location.href = `?id=${postId}`;
          })
          .catch((err) => {
            console.error("Error posting article:", err);

            // display error message to user
            let errorMsg = postForm.querySelector(".error-message");
            if (!errorMsg) {
              errorMsg = document.createElement("div");
              errorMsg.classList.add("error-message");
              postForm.insertBefore(errorMsg, postForm.firstChild);
            }
            errorMsg.textContent = err.message;
          });
      });
    });
}
