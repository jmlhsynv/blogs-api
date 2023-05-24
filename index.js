const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/database");
const Auth = require("./routes/auth.js");
const Blogs = require("./routes/blogs.js");
const Comment = require("./routes/comment.js");
const Users = require("./routes/users.js");
const path = require("path");
const options = require("./swagger.js");

const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

const PORT = process.env.PORT || 5000;

app.use("/", Auth);
app.use("/", Blogs);
app.use("/", Comment);
app.use("/", Users);
app.use("/files", express.static(path.join(__dirname, "files")));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get("/", (req, res) => {
  res.json({ message: "test message" });
});
db();
app.listen(PORT, () => {
  console.log("server listening");
  console.log(options);
});
