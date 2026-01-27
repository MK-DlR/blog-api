// backend/controllers/authController.js

const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { prisma } = require("../lib/prisma");

// sign up form route
exports.signUpGet = (req, res) => {
  res.render("sign-up", { title: "Sign Up" });
};

// sign-up handler — inserts a new user into the schema
exports.signUpPost = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("sign-up", {
      title: "Sign Up",
      errors: errors.array(),
    });
  }

  try {
    const { username, password } = req.body;

    // check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return res.render("sign-up", {
        title: "Sign Up",
        errors: [{ msg: "Username already exists" }],
      });
    }

    // hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { username, password: hashedPassword },
    });

    // after creating user, create folder
    await prisma.folder.create({
      data: {
        name: newUser.username,
        ownerId: newUser.id,
        parentId: null,
      },
    });

    res.redirect("/log-in");
  } catch (err) {
    return next(err);
  }
};

// login page route
exports.logInGet = (req, res) => {
  res.render("log-in", { title: "Log In" });
};

// log-out route — uses req.logout callback-style API and redirects to home
exports.logOut = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
