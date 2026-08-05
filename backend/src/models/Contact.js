const mongoose = require("mongoose");

const workingHoursSchema = new mongoose.Schema(
  {
    mondaySaturday: {
      morning: {
        type: String,
        default: "",
        trim: true,
      },
      evening: {
        type: String,
        default: "",
        trim: true,
      },
    },

    sunday: {
      morning: {
        type: String,
        default: "",
        trim: true,
      },
    },
  },
  {
    _id: false,
  },
);

const googleMapSchema = new mongoose.Schema(
  {
    embedUrl: {
      type: String,
      default: "",
      trim: true,
    },

    latitude: {
      type: String,
      default: "",
      trim: true,
    },

    longitude: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    _id: false,
  },
);

const socialMediaSchema = new mongoose.Schema(
  {
    facebook: {
      type: String,
      default: "",
      trim: true,
    },

    instagram: {
      type: String,
      default: "",
      trim: true,
    },

    twitter: {
      type: String,
      default: "",
      trim: true,
    },

    linkedin: {
      type: String,
      default: "",
      trim: true,
    },

    youtube: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    _id: false,
  },
);

const seoSchema = new mongoose.Schema(
  {
    metaTitle: {
      type: String,
      default: "",
      trim: true,
    },

    metaDescription: {
      type: String,
      default: "",
      trim: true,
    },

    metaKeywords: {
      type: [String],
      default: [],
    },
  },
  {
    _id: false,
  },
);

const contactSchema = new mongoose.Schema(
  {
    hospitalName: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    contactFormRecipient: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phoneNumbers: {
      type: [String],
      default: [],
    },

    emergencyNumber: {
      type: String,
      default: "",
      trim: true,
    },

    whatsappNumber: {
      type: String,
      default: "",
      trim: true,
    },

    receptionNumber: {
      type: String,
      default: "",
      trim: true,
    },

    opdNumber: {
      type: String,
      default: "",
      trim: true,
    },

    ambulanceNumber: {
      type: String,
      default: "",
      trim: true,
    },

    workingHours: {
      type: workingHoursSchema,
      default: () => ({}),
    },

    googleMap: {
      type: googleMapSchema,
      default: () => ({}),
    },

    socialMedia: {
      type: socialMediaSchema,
      default: () => ({}),
    },

    seo: {
      type: seoSchema,
      default: () => ({}),
    },

    isActive: {
      type: Boolean,
      default: true,
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

module.exports = mongoose.model("Contact", contactSchema);
