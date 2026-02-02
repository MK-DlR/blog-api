// backend/app.js

require("dotenv").config();
const express = require("express");
const passport = require("passport");
const { initializePassport } = require("./config/passport.js");
const cors = require("cors");
const path = require("path");

// require routers
const authRouter = require("./routes/authRouter");
const commentRouter = require("./routes/commentRouter");
const postRouter = require("./routes/postRouter");

// initialize app
const app = express();

// initialize passport
initializePassport(passport);

// passport authentication
app.use(passport.initialize());

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/images", express.static(path.join(__dirname, "../public/images")));

// serve frontend files from 'public/' at root
app.use(express.static(path.join(__dirname, "../public")));

// use routers
app.use("/auth", authRouter);
app.use("/comments", commentRouter);
app.use("/posts", postRouter);

// if no api route matches, try serving an html page
app.get("/:page", (req, res, next) => {
  const page = req.params.page;
  const filePath = path.join(__dirname, "../public", `${page}.html`);
  res.sendFile(filePath, (err) => {
    if (err) next(); // if file doesn't exist, continue to 404 handler
  });
});

// 404 handler, after all routes
/*
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});
*/

// backend health check
// check at: http://localhost:3000/api/health
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// error handler, last
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`App is listening on port ${PORT}!`);
});
