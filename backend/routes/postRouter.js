// backend/routes/postRouter.js

const express = require("express");
const postController = require("../controllers/postController");
const { findPost } = require("../middleware/postMiddleware");
const { authenticateJWT } = require("../middleware/authMiddleware");

const router = express.Router();

// GET /posts - get all posts
router.get("/", postController.getAllPosts);

// GET /posts/:id - get single post
router.get("/:id", findPost, postController.getPostById);

// POST /posts - create post
router.post("/", authenticateJWT, postController.createPost);

// PUT /posts/:id - update post
router.put("/:id", authenticateJWT, findPost, postController.updatePost);

// DELETE /posts/:id - delete post
router.delete("/:id", authenticateJWT, findPost, postController.deletePost);

module.exports = router;
