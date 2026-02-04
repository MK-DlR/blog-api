// public/js/article-list.js

import { API_URL } from "../config.js";

// show post list
export function showPostList(isAdmin = false) {
  fetch(`${API_URL}/posts`)
    .then((res) => res.json())
    .then((data) => {
      console.log("All posts:", data.posts); // debugging
      const publishedPosts = data.posts.filter((post) => post.published);
      console.log("Published posts:", publishedPosts); // debugging
      const app = document.getElementById("app");
      // clear app
      app.innerHTML = "";

      // create article container
      const articleContainer = document.createElement("ul");
      articleContainer.classList.add("article-container");

      // create article header container and header
      const articleHeaderContainer = document.createElement("div");
      articleHeaderContainer.classList.add("article-header-container");
      const articleHeader = document.createElement("h2");
      articleHeader.textContent = "Article List";

      // append header to container
      articleHeaderContainer.appendChild(articleHeader);
      articleContainer.appendChild(articleHeaderContainer);

      // loop through published posts
      for (const post of publishedPosts) {
        // create <li>
        const articleItem = document.createElement("li");

        // create clickable title link
        const articleLink = document.createElement("a");
        articleLink.href = `?id=${post.id}`;
        articleLink.textContent = post.title;

        // append link to <li>, then <li> to <ul>
        articleItem.appendChild(articleLink);
        articleContainer.appendChild(articleItem);
      }

      // append <ul> to app
      app.appendChild(articleContainer);

      // back link (always show, but different text/link based on admin status)
      const backLink = document.createElement("a");
      backLink.classList.add("back-link");

      if (isAdmin) {
        backLink.href = "/admin";
        backLink.textContent = "<< Back to Create New Article";
      } else {
        backLink.href = "/";
        backLink.textContent = "<< Back to Newest Article";
      }

      app.appendChild(backLink);
    });
}
