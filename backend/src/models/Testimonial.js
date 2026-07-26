const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: true,
    },

    designation: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },

    message: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      default: 5,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
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

module.exports = mongoose.model("Testimonial", testimonialSchema);
