// backend/routes/postRouter.js

const express = require("express");
const upload = require("../config/multer");
const postController = require("../controllers/postController");
const { findPost } = require("../middleware/postMiddleware");
const { authenticateJWT } = require("../middleware/authMiddleware");

const router = express.Router();

// GET /posts - get all posts
router.get("/", postController.getAllPosts);

// GET /posts/:id - get single post
router.get("/:id", findPost, postController.getPostById);

// POST /posts - create post
router.post(
  "/",
  // authenticateJWT,  // TO DO: uncomment after implementing login
  upload.single("image"),
  postController.createPost,
);

// PUT /posts/:id - update post
router.put(
  "/:id",
  authenticateJWT,
  findPost,
  upload.single("image"),
  postController.updatePost,
);

// DELETE /posts/:id - delete post
router.delete("/:id", authenticateJWT, findPost, postController.deletePost);

module.exports = router;
