const mongoose = require("mongoose");

const HospitalHighlightSchema = new mongoose.Schema(
  {
    value: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },

    icon: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    order: {
      type: Number,
      default: 1,
      min: 1,
    },

    isActive: {
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

HospitalHighlightSchema.index({
  order: 1,
});

HospitalHighlightSchema.index({
  isActive: 1,
});

module.exports = mongoose.model("HospitalHighlight", HospitalHighlightSchema);
