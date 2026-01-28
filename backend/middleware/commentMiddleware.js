// backend/middleware/commentMiddleware.js

const { prisma } = require("../lib/prisma");

// get single comment
exports.findComment = async (req, res, next) => {
  try {
    // find specific comment
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    // if specific comment not found
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // if comment exists
    req.commentRecord = comment;

    next();
  } catch (err) {
    res.status(500).json({ error: "Error fetching comment" });
  }
};
