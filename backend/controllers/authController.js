// backend/controllers/authController.js

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { prisma } = require("../lib/prisma");

exports.loginPost = async (req, res) => {
  try {
    // extract data
    const { email, password } = req.body;

    // validate required fields
    if (!email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // find user by email
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    console.log("User found:", user); // Add this
    console.log("Password from DB:", user?.password); // Add this

    // check if user exists
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // handle if password is wrong
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email }, // payload
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN },
    );

    // return response
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error logging in" });
  }
};
