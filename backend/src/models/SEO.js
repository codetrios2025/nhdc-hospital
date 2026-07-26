const mongoose = require("mongoose");

const seoSchema = new mongoose.Schema(
  {
    page: {
      type: String,
      required: true,
      unique: true,
    },

    metaTitle: {
      type: String,
      default: "",
    },

    metaDescription: {
      type: String,
      default: "",
    },

    metaKeywords: {
      type: String,
      default: "",
    },

    canonicalUrl: {
      type: String,
      default: "",
    },

    schemaMarkup: {
      type: String,
      default: "",
    },

    robots: {
      type: String,
      default: "index,follow",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("SEO", seoSchema);
