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

// get specific single comment
exports.getCommentById = async (req, res) => {
  try {
    // use comment middleware
    const comment = req.commentRecord;

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

    // use prisma to create comment
    const newComment = await prisma.comment.create({
      data: {
        content: comment.content,
        postId: parseInt(comment.postId),
        authorId: 1,
        guestName: comment.guestName || null,
      },
    });

    // return created comment with status 201
    res.status(201).json({ comment: newComment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating comment" });
  }
};

// update comment
exports.updateComment = async (req, res) => {
  try {
    // use comment middleware
    const comment = req.commentRecord;

    // get updated comment data
    const updateComment = req.body;

    // validate updated comment
    if (!updateComment.content || !updateComment.postId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (!updateComment.authorId && !updateComment.guestName) {
      return res
        .status(400)
        .json({ error: "Must provide authorId or guestName" });
    }

    // use prisma to update comment
    const updatedComment = await prisma.comment.update({
      where: { id: comment.id },
      data: {
        content: updateComment.content,
        postId: parseInt(updateComment.postId),
        authorId: updateComment.authorId
          ? parseInt(updateComment.authorId)
          : null,
        guestName: updateComment.guestName || null,
      },
    });

    // return updated comment with status 201
    res.status(200).json({ comment: updatedComment });
  } catch (err) {
    res.status(500).json({ error: "Error updating comment" });
  }
};

// delete comment
exports.deleteComment = async (req, res) => {
  try {
    // use comment middleware
    const comment = req.commentRecord;

    // use prisma to delete comment
    await prisma.comment.delete({
      where: { id: comment.id },
    });

    // return success message
    res.status(204).json();
  } catch (err) {
    res.status(500).json({ error: "Error deleting comment" });
  }
};
