// backend/middleware/postMiddleware.js

const { prisma } = require("../lib/prisma");

// get single post
exports.findPost = async (req, res, next) => {
  try {
    // find specific post
    const post = await prisma.post.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    // if specific post not found
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // if post exists
    req.postRecord = post;

    next();
  } catch (err) {
    res.status(500).json({ error: "Error fetching post" });
  }
};
