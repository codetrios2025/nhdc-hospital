const { body } = require("express-validator");

exports.createVideoValidation = [
  body("sourceType").custom((value, { req }) => {
    console.log("=================================");
    console.log("SOURCE TYPE:", value);
    console.log("BODY:", req.body);
    console.log("=================================");

    return true;
  }),

  body("title").notEmpty().withMessage("Title is required."),

  body("sourceType")
    .notEmpty()
    .withMessage("Source Type is required.")
    .isIn(["embed", "upload", "url", "youtube"])
    .withMessage("Invalid Source Type.")
    .custom((value, { req }) => {
      if (value === "embed" && !req.body.embedCode) {
        throw new Error("Embed Code is required.");
      }

      if (value === "youtube" && !req.body.youtubeUrl) {
        throw new Error("YouTube URL is required.");
      }

      return true;
    }),
];
