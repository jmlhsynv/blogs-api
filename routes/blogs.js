const express = require("express");
const router = express.Router();
const {
  getBlogs,
  getSingleBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogs.js");
const auth = require("../middleware/auth.js");
const fileUpload = require("express-fileupload");

const fileExtLimiter = require("../middleware/fileExtLimiter");
const fileSizeLimiter = require("../middleware/fileSizeLimiter");

router.get("/blogs", getBlogs);
router.get("/blogs/:id", getSingleBlog);
router.post(
  "/blogs",
  auth,
  fileUpload({ createParentPath: true }),
  fileExtLimiter,
  fileSizeLimiter,
  createBlog
);
router.patch(
  "/blogs/:id",
  auth,
  fileUpload({ createParentPath: true }),
  fileExtLimiter,
  fileSizeLimiter,
  updateBlog
);
router.delete("/blogs/:id", auth, deleteBlog);

module.exports = router;
