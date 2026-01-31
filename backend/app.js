// backend/app.js

require("dotenv").config();
const express = require("express");
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

// passport authentication
app.use(passport.initialize());

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static("uploads"));

// use routers
app.use("/auth", authRouter);
app.use("/comments", commentRouter);
app.use("/posts", postRouter);

// home route
app.get("/", (req, res) => res.send("Hello, you've reached the backend."));

// 404 handler, after all routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
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
