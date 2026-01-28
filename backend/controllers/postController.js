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
exports.createPost = async (req, res) => {
  try {
    // extract data
    const post = req.body;

    // validate required fields
    if (!post.content || !post.postId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (!post.authorId) {
      return res.status(400).json({ error: "Must provide authorId" });
    }

    // use prisma to create post
    const newPost = await prisma.post.create({
      data: {
        title: post.title,
        content: post.content || null,
        published,
        authorId: post.authorId ? parseInt(post.authorId) : null,
      },
    });

    // return created post with status 201
    res.status(201).json({ post: newPost });
  } catch (err) {
    res.status(500).json({ error: "Error creating post" });
  }
};

// update post
exports.updatePost = async (req, res) => {
  try {
    // use post middleware
    const post = req.postRecord;

    // get updated post data
    const updatePost = req.body;

    // validate updated post
    if (!updatePost.title) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (!updatePost.authorId) {
      return res.status(400).json({ error: "Must provide authorId" });
    }

    // use prisma to update post
    const updatedPost = await prisma.post.update({
      where: { id: post.id },
      data: {
        content: updatePost.content,
        postId: parseInt(updatePost.postId),
        authorId: updatePost.authorId ? parseInt(updatePost.authorId) : null,
        guestName: updatePost.guestName || null,
      },
    });

    // return updated post with status 201
    res.status(200).json({ post: updatedPost });
  } catch (err) {
    res.status(500).json({ error: "Error updating post" });
  }
};

// delete post
// deletePost
