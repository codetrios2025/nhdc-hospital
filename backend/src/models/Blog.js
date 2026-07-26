const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    shortDescription: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      required: true,
    },

    featuredImage: {
      type: String,
      default: "",
    },

    tags: [
      {
        type: String,
      },
    ],

    category: {
      type: String,
      default: "General",
    },

    publishedAt: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Draft",
    },

    seo: {
      metaTitle: String,
      metaDescription: String,
      metaKeywords: String,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Blog", blogSchema);
