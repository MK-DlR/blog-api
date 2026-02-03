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

// serve admin frontend from '/admin' path
app.use("/admin", express.static(path.join(__dirname, "../admin")));

// serve frontend files from 'public/' at root
app.use(express.static(path.join(__dirname, "../public")));

// use routers
app.use("/auth", authRouter);
app.use("/comments", commentRouter);
app.use("/posts", postRouter);

// serve shared assets - available to both frontends
app.use("/shared", express.static(path.join(__dirname, "../shared")));

// handle admin routes - serve admin HTML files
app.get("/admin/:page", (req, res, next) => {
  const page = req.params.page;
  const filePath = path.join(__dirname, "../admin", `${page}.html`);
  res.sendFile(filePath, (err) => {
    if (err) {
      // if page doesn't exist, serve admin index.html
      res.sendFile(path.join(__dirname, "../admin", "index.html"), (err) => {
        if (err) next(); // if index doesn't exist either, continue to next handler
      });
    }
  });
});

// handle public routes - serve public HTML files
app.get("/:page", (req, res, next) => {
  const page = req.params.page;
  const filePath = path.join(__dirname, "../public", `${page}.html`);
  res.sendFile(filePath, (err) => {
    if (err) next(); // if file doesn't exist, continue to 404 handler
  });
});

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
