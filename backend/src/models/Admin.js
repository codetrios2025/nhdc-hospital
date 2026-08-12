const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema(
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

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      default: "",
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },

    profileImage: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: ["SUPER_ADMIN", "SUB_ADMIN", "CONTENT_MANAGER", "DOCTOR"],
      default: "SUB_ADMIN",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    lastLogin: {
      type: Date,
      default: null,
    },

    /*
     * ============================================
     * PASSWORD RESET
     * ============================================
     */

    resetPasswordToken: {
      type: String,
      default: null,
    },

    resetPasswordExpires: {
      type: Date,
      default: null,
    },

    /*
     * ============================================
     * PASSWORD CHANGE TRACKING
     * ============================================
     */

    passwordChangedAt: {
      type: Date,
      default: null,
    },

    /*
     * ============================================
     * AUDIT
     * ============================================
     */

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

/**
 * ============================================
 * HASH PASSWORD BEFORE SAVE
 * ============================================
 *
 * This is used when creating a new admin or
 * changing password using admin.save().
 */
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);

  this.passwordChangedAt = new Date();

  next();
});

/**
 * ============================================
 * GENERATE FULL NAME
 * ============================================
 */
adminSchema.pre("save", function (next) {
  this.fullName = `${this.firstName || ""} ${this.lastName || ""}`.trim();

  next();
});

/**
 * ============================================
 * COMPARE PASSWORD
 * ============================================
 */
adminSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("Admin", adminSchema);
