// backend/routes/commentRouter.js

const express = require("express");
const commentController = require("../controllers/commentController");
const { findComment } = require("../middleware/commentMiddleware");
const { authenticateJWT } = require("../middleware/authMiddleware");

const router = express.Router();

// GET /comments - get all comments
router.get("/", commentController.getAllComments);

// GET /comments/:id - get specific single comment
router.get("/:id", findComment, commentController.getCommentById);

// POST /comments - create comment
router.post("/", commentController.createComment);

// PUT /comments/:id - update comment
router.put(
  "/:id",
  // authenticateJWT,  // TO DO: uncomment after implementing login
  findComment,
  commentController.updateComment,
);

// DELETE /comments/:id - delete comment
router.delete(
  "/:id",
  // authenticateJWT,  // TO DO: uncomment after implementing login
  findComment,
  commentController.deleteComment,
);

module.exports = router;
