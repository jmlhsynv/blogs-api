const Auth = require("../models/auth.js");
const CommentSchema = require("../models/comment.js");
const BlogSchema = require("../models/blogs.js");

const jwt = require("jsonwebtoken");

const userDetails = async (req, res) => {
  /*  
    #swagger.tags = ['Users']
*/
  try {
    const { id } = req.params;
    const user = await Auth.findById(id).select("-password -date -__v");
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const userBlogs = async (req, res) => {
  /*  
    #swagger.tags = ['Users']
*/
  try {
    const { id } = req.params;
    const blogs = await BlogSchema.find({ user: id }).select("-user -__v");
    return res.status(200).json(blogs);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const userComments = async (req, res) => {
  /*  
    #swagger.tags = ['Users']
*/
  try {
    const { id } = req.params;
    const comments = await CommentSchema.find({ user: id }).select(
      "-user -__v"
    );
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = { userDetails, userBlogs, userComments };
