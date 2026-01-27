// backend/routes/authRouter.js

const express = require("express");
const authController = require("../controllers/authController");
const passport = require("passport");
const { body } = require("express-validator");

const router = express.Router();

// sign up form route
router.get("/sign-up", authController.signUpGet);

// verify password matches the repeat
router.post(
  "/sign-up",
  body("username")
    .trim()
    .isLength({ min: 3, max: 30 })
    .isAlphanumeric()
    .withMessage("Username must be 3-30 alphanumeric characters"),

  body("password")
    .isLength({ min: 8 })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage(
      "Password must be at least 8 characters with uppercase, lowercase, and number",
    ),

  // verify password matches the repeat
  body("passwordConfirmation")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords must match"),

  authController.signUpPost,
);

// log in page route
router.get("/log-in", authController.logInGet);

// log in POST route - authenticate and redirect back to /log-in
router.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in",
  }),
);

// log out route — uses req.logout callback-style API and redirects to home
router.get("/log-out", authController.logOut);

module.exports = router;
