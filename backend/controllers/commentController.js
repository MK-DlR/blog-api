// backend/controllers/commentController.js

const { json } = require("express");
const { prisma } = require("../lib/prisma");

// get all comments
exports.getAllComments = async (req, res) => {
  try {
    const comments = await prisma.comment.findMany();

    res.json({ comments });
  } catch (err) {
    res.status(500).json({ error: "Error fetching comments" });
  }
};

// get single comment
exports.getCommentById = async (req, res) => {
  try {
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.json({ comment });
  } catch (err) {
    res.status(500).json({ error: "Error fetching comment" });
  }
};

// create comment
exports.createComment = async (req, res) => {
  try {
    // code
  } catch (err) {
    res.status(400).json({ error: "Error creating comment" });
  }
};

// update comment
exports.updateComment = async (req, res) => {
  try {
    // code
  } catch (err) {
    res.status(400).json({ error: "Error updating comment" });
  }
};

// delete comment
exports.deleteComment = async (req, res) => {
  try {
    // code
  } catch (err) {
    res.status(500).json({ error: "Error deleting comment" });
  }
};
