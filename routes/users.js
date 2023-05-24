const express = require("express")
const {  userDetails, userBlogs, userComments } = require("../controllers/users.js")

const router = express.Router()

router.get("/users/:id", userDetails)
router.get("/users/:id/blogs", userBlogs)
router.get("/users/:id/comments", userComments)

module.exports = router