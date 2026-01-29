// backend/routes/authRouter.js

const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

// POST /auth/login - owner login
router.post("/login", authController.loginPost);

module.exports = router;
