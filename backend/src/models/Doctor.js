const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      default: "",
      trim: true,
    },

    fullName: {
      type: String,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      default: "Male",
    },

    dateOfBirth: Date,

    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      default: null,
      required: true,
    },

    designation: {
      type: String,
      required: true,
    },

    qualification: {
      type: String,
      default: "",
    },

    experience: {
      type: Number,
      default: 0,
    },

    registrationNumber: {
      type: String,
      default: "",
    },

    specialization: [
      {
        type: String,
      },
    ],

    languages: [
      {
        type: String,
      },
    ],

    consultationFee: {
      type: Number,
      default: 0,
    },

    hospitalBranch: {
      type: String,
      default: "",
    },

    shortDescription: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    education: {
      type: String,
      default: "",
    },

    awards: {
      type: String,
      default: "",
    },

    memberships: {
      type: String,
      default: "",
    },

    profileImage: {
      type: String,
      default: "",
    },

    gallery: [
      {
        type: String,
      },
    ],

    videoUrl: {
      type: String,
      default: "",
    },

    metaTitle: String,

    metaDescription: String,

    metaKeywords: String,

    featured: {
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

    deletedAt: {
      type: Date,
      default: null,
    },

    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },

    displayOrder: {
      type: Number,
      default: 0,
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

doctorSchema.pre("save", function (next) {
  this.fullName = `${this.firstName} ${this.lastName}`.trim();
});

module.exports = mongoose.model("Doctor", doctorSchema);
