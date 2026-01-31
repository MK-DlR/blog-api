// public/js/article-list.js

import { API_URL } from "../config.js";

// show post list
export function showPostList() {
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

      // loop through published posts
      for (const post of publishedPosts) {
        // create <li>
        const articleItem = document.createElement("li");

        // create clickable title link
        const articleLink = document.createElement("a");
        articleLink.href = `post.html?id=${post.id}`;
        articleLink.textContent = post.title;

        // append link to <li>, then <li> to <ul>
        articleItem.appendChild(articleLink);
        articleContainer.appendChild(articleItem);
      }

      // append <ul> to app
      app.appendChild(articleContainer);
    });
}
