const path = require("path");
const allowedExtArray = [".png", ".jpg", ".jpeg"];

const fileExtLimiter = (req, res, next) => {
  const files = req.files;
  if (!files || files.length == 0) {
    next();
    return;
  }

  const fileExtensions = [];
  Object.keys(files).forEach((key) => {
    fileExtensions.push(path.extname(files[key].name));
  });

  // Are the file extension allowed?
  const allowed = fileExtensions.every((ext) => allowedExtArray.includes(ext));

  if (!allowed) {
    const message =
      `Upload failed. Only ${allowedExtArray.toString()} files allowed.`.replaceAll(
        ",",
        ", "
      );

    return res.status(422).json({ status: "error", message });
  }

  next();
};

module.exports = fileExtLimiter;
