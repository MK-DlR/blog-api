// frontend-user/script.js

import { API_URL } from "./config.js";

// fetch and display posts
fetch(`${API_URL}/posts`)
  .then((res) => res.json())
  .then((data) => {
    const publishedPosts = data.posts.filter((post) => post.published);
    const app = document.getElementById("app");

    // create list container
    const listContainer = document.createElement("ul");
    // loop through publishedPosts
    // for each post:
    //   - create element
    //   - set content (title, excerpt, date, etc.)
    //   - append to container
    // append container to app
  });
