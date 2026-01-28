// backend/routes/commentRouter.js

const express = require("express");
const commentController = require("../controllers/commentController");

const router = express.Router();

// GET /comments - get all comments
router.get("/", commentController.getAllComments);

// GET /comments/:id - get single comment
router.get("/:id", commentController.getCommentById);

// POST /comments - create comment
// router.post("/", commentController.createComment);

// PUT /comments/:id - update comment
// router.put("/:id", commentController.updateComment);

// DELETE /comments/:id - delete comment
// router.delete("/:id", commentController.deleteComment);

module.exports = router;
