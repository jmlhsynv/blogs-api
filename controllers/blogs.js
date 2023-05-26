const BlogSchema = require("../models/blogs.js");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");

const createBlog = async (req, res) => {
  /*  
    #swagger.tags = ['Blogs']
*/
  try {
    const token = req.headers.authorization.split(" ")[1];
    let decodedData = jwt.verify(token, process.env.SECRET_TOKEN);
    let newBlog;
    let filepath;
    if (req.files) {
      const files = req.files.file;
      filepath = path.join("files", Date.now() + files.name);
      files.mv(filepath, (err) => {
        if (err) return res.status(500).json({ status: "error", message: err });
      });
      newBlog = await BlogSchema.create({
        title: req.body.title,
        description: req.body.description,
        user: decodedData.id,
        img: filepath,
      });
    } else {
      newBlog = await BlogSchema.create({
        title: req.body.title,
        description: req.body.description,
        user: decodedData.id,
      });
    }

    return res.status(201).json({
      id: newBlog.id,
      title: newBlog.title,
      description: newBlog.description,
      date: newBlog.date,
      img: filepath ? `${req.protocol}://${req.get("host")}/${filepath}` : null,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getBlogs = async (req, res) => {
  /*  
    #swagger.tags = ['Blogs']
*/
  try {
    const getBlogs = await BlogSchema.find()
      .select("-__v")
      .populate("user", "-_id -password -__v -date");
    return res.status(200).json(getBlogs);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getSingleBlog = async (req, res) => {
  /*  
    #swagger.tags = ['Blogs']
*/
  try {
    const { id } = req.params;
    const getBlog = await BlogSchema.findById(id)
      .select("-__v")
      .populate("user", "-_id -password -__v -date");
    return res.status(200).json(getBlog);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const updateBlog = async (req, res) => {
  /*  
    #swagger.tags = ['Blogs']
*/

  try {
    const token = req.headers.authorization.split(" ")[1];
    let decodedData = jwt.verify(token, process.env.SECRET_TOKEN);

    const { id } = req.params;
    const blog = await BlogSchema.findById(id);
    if (blog.user != decodedData.id) {
      return res.status(403).json({
        message: "This Blog is not your",
      });
    }

    // const updateBlog = await BlogSchema.findByIdAndUpdate(id, req.body, {
    //   new: true,
    // });

    let filepath;

    if (req.files) {
      const filePath = `${blog.img}`;
      fs.unlinkSync(filePath);

      const files = req.files.file;
      filepath = path.join("files", Date.now() + files.name);
      files.mv(filepath, (err) => {
        if (err) return res.status(500).json({ status: "error", message: err });
      });
      const updateBlog = await BlogSchema.findByIdAndUpdate(
        id,
        { ...req.body, img: filepath },
        {
          new: true,
        }
      );
      return res.status(200).json({
        id: updateBlog.id,
        title: updateBlog.title,
        description: updateBlog.description,
        date: updateBlog.date,
        img: `${req.protocol}://${req.get("host")}/${filepath}`,
      });
    } else {
      const updateBlog = await BlogSchema.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      return res.status(200).json({
        id: updateBlog.id,
        title: updateBlog.title,
        description: updateBlog.description,
        date: updateBlog.date,
        img: `${req.protocol}://${req.get("host")}/${blog.img}`,
      });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const deleteBlog = async (req, res) => {
  /*  
    #swagger.tags = ['Blogs']
*/
  try {
    const token = req.headers.authorization.split(" ")[1];
    let decodedData = jwt.verify(token, process.env.SECRET_TOKEN);

    const { id } = req.params;
    const blog = await BlogSchema.findById(id);
    if (blog.user != decodedData.id) {
      return res.status(403).json({
        message: "This Blog is not your",
      });
    }
    const filePath = `${blog.img}`;

    const deleteBlog = await BlogSchema.findByIdAndRemove(id);
    fs.unlinkSync(filePath);
    return res.status(204).json({
      message: "Deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getBlogs,
  getSingleBlog,
  createBlog,
  updateBlog,
  deleteBlog,
};
