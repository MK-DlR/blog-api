// backend/controllers/postController.js

const fs = require("fs");
const path = require("path");
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
    if (!post.title) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // use prisma to create post
    const newPost = await prisma.post.create({
      data: {
        title: post.title,
        content: post.content || null,
        published: post.published || false,
        authorId: 1, // hardcoded author
        imageUrl: req.file
          ? `/uploads/${req.file.filename}`
          : post.imageUrl || null,
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

    // if uploading new image and old image exists, delete old image
    if (req.file && post.imageUrl) {
      const oldImagePath = path.join(__dirname, "..", post.imageUrl);
      fs.unlink(oldImagePath, (err) => {
        if (err) console.error("Error deleting old image:", err);
      });
    }

    // use prisma to update post
    const updatedPost = await prisma.post.update({
      where: { id: post.id },
      data: {
        title: updatePost.title,
        content: updatePost.content || null,
        published:
          updatePost.published !== undefined
            ? updatePost.published
            : post.published,
        imageUrl: req.file
          ? `/uploads/${req.file.filename}`
          : updatePost.imageUrl || post.imageUrl,
      },
    });

    // return updated post with status 201
    res.status(200).json({ post: updatedPost });
  } catch (err) {
    res.status(500).json({ error: "Error updating post" });
  }
};

// delete post
exports.deletePost = async (req, res) => {
  try {
    const post = req.postRecord;

    // if post has an image, delete it from disk
    if (post.imageUrl) {
      const imagePath = path.join(__dirname, "..", post.imageUrl);
      fs.unlink(imagePath, (err) => {
        if (err) console.error("Error deleting image:", err);
      });
    }

    // delete post from database
    await prisma.post.delete({
      where: { id: post.id },
    });

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Error deleting post" });
  }
};
