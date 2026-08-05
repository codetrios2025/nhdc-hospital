const mongoose = require("mongoose");

const serviceTestSchema = new mongoose.Schema(
  {
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
      index: true,
    },

    testName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    subtitle: {
      type: String,
      trim: true,
      default: "",
      maxlength: 150,
    },

    description: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },

    imageAlt: {
      type: String,
      default: "",
    },

    displayOrder: {
      type: Number,
      default: 1,
    },

    status: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("ServiceTest", serviceTestSchema);
