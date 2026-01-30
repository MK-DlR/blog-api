// frontend-user/script.js

import { API_URL } from "./config.js";

// fetch and display posts
fetch(`${API_URL}/posts`)
  .then((res) => res.json())
  .then((data) => console.log(data));
