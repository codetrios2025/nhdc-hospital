const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
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

      default: "",
    },

    icon: {
      type: String,

      default: "",
    },

    bannerImage: {
      type: String,

      default: "",
    },

    displayOrder: {
      type: Number,

      default: 0,
    },

    isFeatured: {
      type: Boolean,

      default: false,
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

serviceSchema.index({
  slug: 1,
});

module.exports = mongoose.model(
  "HospitalService",

  serviceSchema,
);
