const express = require("express");
const {
  login,
  register,
  refreshTokens,
  userDetails,
  userComments,
  userBlogs,
} = require("../controllers/auth.js");
const auth = require("../middleware/auth.js");

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/refresh", refreshTokens);
router.get("/user", auth, userDetails);
router.get("/user/comments", auth, userComments);
router.get("/user/blogs", auth, userBlogs);

module.exports = router;
