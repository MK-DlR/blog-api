// backend/app.js

require("dotenv").config();
const express = require("express");
const path = require("path");
const jwt = require("jsonwebtoken");
const { prisma } = require("./lib/prisma");
const passport = require("passport");
const { initializePassport } = require("./config/passport.js");
const cors = require("cors");

// require routers
const authRouter = require("./routes/authRouter");
const commentRouter = require("./routes/commentRouter");
const postRouter = require("./routes/postRouter");

// initialize app
const app = express();

// initialize passport
initializePassport(passport);

// ejs view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// passport authentication
app.use(passport.initialize());

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// use routers
app.use("/auth", authRouter);
// app.use("/comments", commentRouter);
// app.use("/posts", postRouter);

// home route
app.get("/", (req, res) => res.send("Hello world!"));

// 404 handler, after all routes
app.use((req, res) => {
  res.status(404).render("404", { title: "404 - Page Not Found" });
});

// error handler, last
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`App is listening on port ${PORT}!`);
});
