const multer = require("multer");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "text/csv") {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file format"));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 30000000 }, // 30 MB
  fileFilter,
}).single("file");

module.exports = {
  upload,
};
