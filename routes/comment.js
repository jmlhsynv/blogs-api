const express = require("express")
const router = express.Router()
const { createComment, getComments, deleteComment } = require("../controllers/comment.js")
const auth = require("../middleware/auth.js")

router.post("/blogs/:id/comment", auth, createComment)
router.delete("/comments/:id", auth, deleteComment)
router.get("/blogs/:id/comments", getComments)

module.exports = router;