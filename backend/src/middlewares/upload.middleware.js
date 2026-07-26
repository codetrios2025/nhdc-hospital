const upload = require("../config/multer");

module.exports = {
  single(fieldName) {
    return upload.single(fieldName);
  },

  multiple(fieldName, count = 10) {
    return upload.array(fieldName, count);
  },
};
