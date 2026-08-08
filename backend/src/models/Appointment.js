const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema(
  {
    /*
    --------------------------------------------------
    Patient Information
    --------------------------------------------------
    */

    patientName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    age: {
      type: Number,
      required: true,
      min: 0,
      max: 120,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },

    /*
    --------------------------------------------------
    Contact Information
    --------------------------------------------------
    */

    mobile: {
      type: String,
      required: true,
      trim: true,
      maxlength: 15,
      index: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      index: true,
      default: "",
    },

    address: {
      type: String,
      trim: true,
      default: "",
    },

    /*
    --------------------------------------------------
    Appointment Information
    --------------------------------------------------
    */

    appointmentDate: {
      type: Date,
      required: true,
      index: true,
    },
    appointmentTime: {
      type: String,
      default: "",
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      default: null,
    },

    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      default: null,
    },

    reason: {
      type: String,
      trim: true,
      default: "",
    },

    /*
    --------------------------------------------------
    Admin Response
    --------------------------------------------------
    */

    status: {
      type: String,
      enum: ["New", "Confirmed", "Visited", "Cancelled"],
      default: "New",
      index: true,
    },

    remarks: {
      type: String,
      default: "",
    },

    repliedAt: {
      type: Date,
      default: null,
    },

    /*
    --------------------------------------------------
    Notification Status
    --------------------------------------------------
    */

    userEmailSent: {
      type: Boolean,
      default: false,
    },

    adminEmailSent: {
      type: Boolean,
      default: false,
    },

    adminWhatsappSent: {
      type: Boolean,
      default: false,
    },

    /*
    --------------------------------------------------
    Audit
    --------------------------------------------------
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

AppointmentSchema.index({
  patientName: "text",
  email: "text",
  mobile: "text",
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
