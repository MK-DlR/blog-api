// backend/config/multer.js

const multer = require("multer");
const path = require("path");

// configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

// file filter
const fileFilter = (req, file, cb) => {
  // check if file is an image
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true); // Accept
  } else {
    cb(new Error("Only JPEG and PNG images allowed"), false); // Reject
  }
};

// export multer instance
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 /* 5MB in bytes */ },
});

module.exports = upload;
