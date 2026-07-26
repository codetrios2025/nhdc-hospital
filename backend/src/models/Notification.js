const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    title: String,

    message: String,

    type: {
      type: String,
      enum: ["Info", "Success", "Warning", "Error"],
      default: "Info",
    },

    isRead: {
      type: Boolean,
      default: false,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Notification", notificationSchema);
