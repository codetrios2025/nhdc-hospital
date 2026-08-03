const mongoose = require("mongoose");

const featureSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    icon: {
      type: String,
      default: "bi bi-check-circle-fill",
      trim: true,
    },

    sortOrder: {
      type: Number,
      default: 1,
    },
  },
  {
    _id: true,
    id: false,
  },
);

const slideSchema = new mongoose.Schema(
  {
    desktopImage: {
      type: String,
      default: "",
    },

    mobileImage: {
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
  },
  {
    _id: true,
    id: false,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  },
);

/*
|--------------------------------------------------------------------------
| Slide Virtuals
|--------------------------------------------------------------------------
*/

slideSchema.virtual("desktopImageUrl").get(function () {
  if (!this.desktopImage) return "";

  return `${process.env.APP_URL}/uploads/banners/${this.desktopImage}`;
});

slideSchema.virtual("mobileImageUrl").get(function () {
  if (!this.mobileImage) return "";

  return `${process.env.APP_URL}/uploads/banners/${this.mobileImage}`;
});

const bannerSchema = new mongoose.Schema(
  {
    /*
    |--------------------------------------------------------------------------
    | Banner Information
    |--------------------------------------------------------------------------
    */

    title: {
      type: String,
      required: true,
      trim: true,
    },

    subtitle: {
      type: String,
      default: "",
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    altText: {
      type: String,
      default: "",
      trim: true,
    },

    /*
    |--------------------------------------------------------------------------
    | Buttons
    |--------------------------------------------------------------------------
    */

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

    /*
    |--------------------------------------------------------------------------
    | Features
    |--------------------------------------------------------------------------
    */

    features: {
      type: [featureSchema],
      default: [],
    },

    /*
    |--------------------------------------------------------------------------
    | Banner Slides
    |--------------------------------------------------------------------------
    */

    slides: {
      type: [slideSchema],
      default: [],
    },

    /*
    |--------------------------------------------------------------------------
    | Settings
    |--------------------------------------------------------------------------
    */

    displayOrder: {
      type: Number,
      default: 1,
      index: true,
    },

    status: {
      type: Boolean,
      default: true,
      index: true,
    },

    /*
    |--------------------------------------------------------------------------
    | Audit
    |--------------------------------------------------------------------------
    */

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  },
);

module.exports = mongoose.model("Banner", bannerSchema);
