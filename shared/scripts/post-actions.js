// shared/scripts/post-actions.js

import { API_URL } from "/config.js";

// publish/unpublish post
export function updatePostPublishStatus(postId, postData, shouldPublish) {
  return fetch(`${API_URL}/posts/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: postData.title,
      content: postData.content,
      imageUrl: postData.imageUrl,
      published: shouldPublish,
    }),
  }).then((res) => {
    if (!res.ok) {
      return res.json().then((errorData) => {
        throw new Error(errorData.error || "Failed to update publish status");
      });
    }
    return res.json();
  });
}

// delete post
export function deletePost(postId) {
  return fetch(`${API_URL}/posts/${postId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) {
      return res.json().then((errorData) => {
        throw new Error(errorData.error || "Failed to update publish status");
      });
    }
  });
}
