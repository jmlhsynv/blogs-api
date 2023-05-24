const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    version: "1.0.0",
    title: "Blogs API",
    description: "Blogs api with Node.js",
  },
  host: "localhost:5000",
  basePath: "/",
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = [
  "./routes/auth.js",
  "./routes/blogs.js",
  "./routes/comment.js",
  "./routes/users.js",
];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("./index.js");
});
