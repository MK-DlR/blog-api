// backend/controllers/postController.js

const { prisma } = require("../lib/prisma");

// get all posts
exports.getAllPosts = async (req, res) => {
  try {
    // find all posts
    const posts = await prisma.post.findMany();

    // return all posts
    res.json({ posts });
  } catch (err) {
    res.status(500).json({ error: "Error fetching posts" });
  }
};

// get specific single post
exports.getPostById = async (req, res) => {
  try {
    // use post middleware
    const post = req.postRecord;

    // return specific post
    res.json({ post });
  } catch (err) {
    res.status(500).json({ error: "Error fetching post" });
  }
};

// create post
// createPost

// update post
// updatePost

// delete post
// deletePost
