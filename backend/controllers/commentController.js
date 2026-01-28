// backend/controllers/commentController.js

const { json } = require("express");
const { prisma } = require("../lib/prisma");

// get all comments
exports.getAllComments = async (req, res) => {
  try {
    // find all comments
    const comments = await prisma.comment.findMany();

    // return all comments
    res.json({ comments });
  } catch (err) {
    res.status(500).json({ error: "Error fetching comments" });
  }
};

// get single comment
exports.getCommentById = async (req, res) => {
  try {
    // find specific comment
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    // if specific comment not found
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // return specific comment
    res.json({ comment });
  } catch (err) {
    res.status(500).json({ error: "Error fetching comment" });
  }
};

// create comment
exports.createComment = async (req, res) => {
  try {
    // extract data
    const comment = req.body;

    // validate required fields
    if (!comment.content || !comment.postId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (!comment.authorId && !comment.guestName) {
      return res
        .status(400)
        .json({ error: "Must provide authorId or guestName" });
    }
    // use prisma to create comment
    const newComment = await prisma.comment.create({
      data: {
        content: comment.content,
        postId: parseInt(comment.postId),
        authorId: comment.authorId ? parseInt(comment.authorId) : null,
        guestName: comment.guestName || null,
      },
    });

    // return created comment with status 201
    res.status(201).json({ comment: newComment });
  } catch (err) {
    res.status(500).json({ error: "Error creating comment" });
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
