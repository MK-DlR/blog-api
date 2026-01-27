// backend/routes/postRouter.js

const express = require("express");
const postController = require("../controllers/postController");

const router = express.Router();

// GET /posts - get all posts
// router.get("/", postController.getAllPosts);

// GET /posts/:id - get single post
// router.get("/:id", postController.getPostById);

// POST /posts - create post
// router.post("/", postController.createPost);

// PUT /posts/:id - update post
// router.put("/:id", postController.updatePost);

// DELETE /posts/:id - delete post
// router.delete("/:id", postController.deletePost);

module.exports = router;
