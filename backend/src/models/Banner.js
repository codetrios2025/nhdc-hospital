const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    subtitle: {
      type: String,
      trim: true,
      maxlength: 250,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    desktopImage: {
      type: String,
      required: true,
    },

    mobileImage: {
      type: String,
      default: "",
    },

    altText: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    primaryButtonText: {
      type: String,
      default: "",
      trim: true,
    },

    primaryButtonLink: {
      type: String,
      default: "",
      trim: true,
    },

    secondaryButtonText: {
      type: String,
      default: "",
      trim: true,
    },

    secondaryButtonLink: {
      type: String,
      default: "",
      trim: true,
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
    versionKey: false,
  },
);

bannerSchema.virtual("desktopImageUrl").get(function () {
  if (!this.desktopImage) return "";
  return `${process.env.APP_URL}/uploads/banners/${this.desktopImage}`;
});

bannerSchema.virtual("mobileImageUrl").get(function () {
  if (!this.mobileImage) return "";
  return `${process.env.APP_URL}/uploads/banners/${this.mobileImage}`;
});

bannerSchema.set("toJSON", { virtuals: true });
bannerSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Banner", bannerSchema);
