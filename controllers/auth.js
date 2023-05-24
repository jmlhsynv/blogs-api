const Auth = require("../models/auth.js");
const CommentSchema = require("../models/comment.js");
const BlogSchema = require("../models/blogs.js");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// register user
const register = async (req, res) => {
  /*  
    #swagger.tags = ['Auth']
*/
  try {
    const { username, email, password } = req.body;
    const user = await Auth.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "This email is already exists !" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password length should be more than 6 symbols" });
    }

    const passHash = await bcrypt.hash(password, 12);
    const newUser = await Auth.create({ username, email, password: passHash });

    const accessToken = await jwt.sign(
      { id: user.id },
      process.env.SECRET_TOKEN,
      { expiresIn: "1h" }
    );
    const refreshToken = await jwt.sign(
      { id: user.id },
      process.env.SECRET_TOKEN,
      { expiresIn: "30d" }
    );
    res.status(201).json({
      status: "OK",
      user: {
        username: newUser.username,
        email: newUser.email,
      },
      tokens: {
        access: accessToken,
        refresh: refreshToken,
      },
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// login user
const login = async (req, res) => {
  /*  
    #swagger.tags = ['Auth']
*/
  try {
    const { email, password } = req.body;
    const user = await Auth.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "No account" });
    }

    const comparePass = await bcrypt.compare(password, user.password);
    if (!comparePass) {
      return res.status(400).json({ message: "no account !!!!!" });
    }

    const accessToken = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN, {
      expiresIn: "30d",
    });
    res.status(200).json({
      status: "OK",
      user: {
        username: user.username,
        email: user.email,
      },
      tokens: {
        access: accessToken,
        refresh: refreshToken,
      },
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// refresh token
const refreshTokens = async (req, res) => {
  /*  
    #swagger.tags = ['Auth']
*/
  try {
    const token = req.body.refresh;
    jwt.verify(token, process.env.SECRET_TOKEN, async (err, details) => {
      if (err) {
        return res.status(401).json({ message: "Invalid refresh token" });
      } else {
        const { id } = details;
        const user = await Auth.findById(id);

        if (user) {
          const accessToken = await jwt.sign({ id }, process.env.SECRET_TOKEN, {
            expiresIn: "1h",
          });
          const refreshToken = await jwt.sign(
            { id },
            process.env.SECRET_TOKEN,
            { expiresIn: "30d" }
          );

          return res.status(200).json({
            tokens: {
              access: accessToken,
              refresh: refreshToken,
            },
          });
        } else {
          return res.status(401).json({ message: "Invalid refresh token" });
        }
      }
    });
  } catch (error) {
    return res.status(400).json({ message: error.message, error });
  }
};

// get current user's details
const userDetails = async (req, res) => {
  /*  
    #swagger.tags = ['Auth']
*/
  try {
    const token = req.headers.authorization.split(" ")[1];
    let decodedData = jwt.verify(token, process.env.SECRET_TOKEN);

    const user = await Auth.findById(decodedData.id).select(
      "-password -date -__v"
    );

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// get current user's comments
const userComments = async (req, res) => {
  /*  
    #swagger.tags = ['Auth']
*/
  try {
    const token = req.headers.authorization.split(" ")[1];
    let decodedData = jwt.verify(token, process.env.SECRET_TOKEN);

    const comments = await CommentSchema.find({ user: decodedData.id })
      .select("-user -__v")
      .populate("blog", "_id title");

    return res.status(200).json(comments);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// get current user's blogs
const userBlogs = async (req, res) => {
  /*  
    #swagger.tags = ['Auth']
*/
  try {
    const token = req.headers.authorization.split(" ")[1];
    let decodedData = jwt.verify(token, process.env.SECRET_TOKEN);

    const blogs = await BlogSchema.find({ user: decodedData.id }).select(
      "-user -__v"
    );

    return res.status(200).json(blogs);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
  userDetails,
  userComments,
  userBlogs,
  refreshTokens,
};
