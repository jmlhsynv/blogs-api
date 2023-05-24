const CommentSchema = require("../models/comment.js");

const jwt = require("jsonwebtoken");

const createComment = async (req, res) => {
  /*  
    #swagger.tags = ['Comments']
*/
  try {
    const token = req.headers.authorization.split(" ")[1];
    let decodedData = jwt.verify(token, process.env.SECRET_TOKEN);
    const { id } = req.params;
    const newComment = await CommentSchema.create({
      content: req.body.content,
      user: decodedData.id,
      blog: id,
    });
    return res.status(201).json(newComment);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const getComments = async (req, res) => {
  /*  
    #swagger.tags = ['Comments']
*/
  try {
    const { id } = req.params;
    const Comments = await CommentSchema.find({ blog: id })
      .select("-__v -blog")
      .populate("user", "-password -__v -date");
    return res.status(200).json(Comments);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const deleteComment = async (req, res) => {
  /*  
    #swagger.tags = ['Comments']
*/
  try {
    const token = req.headers.authorization.split(" ")[1];
    let decodedData = jwt.verify(token, process.env.SECRET_TOKEN);

    const { id } = req.params;
    const deleteComment = await CommentSchema.findById(id);

    if (deleteComment.user != decodedData.id) {
      return res.status(403).json({
        message: "This comment is not your",
      });
    } else {
      await CommentSchema.findByIdAndRemove(id);
      return res.status(204).json({
        message: "Deleted successfully",
      });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = { createComment, getComments, deleteComment };
