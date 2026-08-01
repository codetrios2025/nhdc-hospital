const mongoose = require("mongoose");

const HomeFeatureSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
      trim: true,
      maxlength: 100,
    },

    subtitle: {
      type: String,
      required: [true, "Subtitle is required."],
      trim: true,
      maxlength: 150,
    },

    icon: {
      type: String,
      required: [true, "Icon is required."],
      trim: true,
    },

    link: {
      type: String,
      default: "",
      trim: true,
    },

    displayOrder: {
      type: Number,
      default: 0,
    },

    status: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

HomeFeatureSchema.index({
  title: "text",
  subtitle: "text",
});

module.exports = mongoose.model("HomeFeature", HomeFeatureSchema);
