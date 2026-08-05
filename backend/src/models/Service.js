const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subtitle: {
      type: String,
      trim: true,
      default: "",
      maxlength: 150,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    department: {
      type: String,
      required: true,
      trim: true,
    },

    icon: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      required: true,
    },
    gallery: [
      {
        image: {
          type: String,
          trim: true,
        },

        alt: {
          type: String,
          default: "",
          trim: true,
        },

        sortOrder: {
          type: Number,
          default: 0,
        },
      },
    ],

    shortDescription: {
      type: String,
      required: true,
      maxlength: 300,
    },

    description: {
      type: String,
      required: true,
    },

    features: [
      {
        type: String,
        trim: true,
      },
    ],

    themeColor: {
      type: String,
      default: "#0d6efd",
    },

    displayOrder: {
      type: Number,
      default: 1,
    },

    showOnHome: {
      type: Boolean,
      default: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    status: {
      type: Boolean,
      default: true,
    },
    buttonText: {
      type: String,
      trim: true,
      default: "Know More",
    },

    buttonLink: {
      type: String,
      trim: true,
      default: "",
    },

    openInNewTab: {
      type: Boolean,
      default: false,
    },
    seoTitle: {
      type: String,
      default: "",
    },

    seoDescription: {
      type: String,
      default: "",
    },

    seoKeywords: [
      {
        type: String,
      },
    ],

    /* |-------------------------------------------------------------------------- | Service Banner |--------------------------------------------------------------------------*/
    bannerImage: {
      type: String,
      default: "",
    },
    bannerMobileImage: {
      type: String,
      default: "",
    },
    bannerTitle: {
      type: String,
      trim: true,
    },
    bannerSubtitle: {
      type: String,
      trim: true,
    },
    bannerDescription: {
      type: String,
      trim: true,
    },
    bannerButtonText: {
      type: String,
      trim: true,
    },
    bannerButtonLink: {
      type: String,
      trim: true,
    },
    bannerOpenInNewTab: {
      type: Boolean,
      default: false,
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

module.exports = mongoose.model("Service", serviceSchema);
