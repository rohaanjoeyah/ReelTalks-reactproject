const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Configure where to store the images
const storage = multer.diskStorage({
  destination(req, file, cb) {
    // ⚠️ This points to your React public folder
    // Note: In a real production app, we'd use AWS S3, but this is perfect for assignments.
    cb(null, '../client/public/images/');
  },
  filename(req, file, cb) {
    // Clean up filename (replace spaces with -)
    // Add current time to prevent duplicate names
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`);
  }
});

// Check file type (Allow only images)
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images only!');
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// Route: POST /api/upload
router.post('/', upload.single('image'), (req, res) => {
  // Respond with the filename so the frontend knows what to save in the DB
  res.send(`${req.file.filename}`);
});

module.exports = router;