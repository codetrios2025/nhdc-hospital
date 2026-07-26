const mongoose = require("mongoose");

const NotificationLogSchema = new mongoose.Schema(
  {
    /*
    --------------------------------------------------
    Notification Type
    --------------------------------------------------
    */

    channel: {
      type: String,
      enum: ["Email", "WhatsApp", "SMS"],
      required: true,
      index: true,
    },

    /*
    --------------------------------------------------
    Event
    --------------------------------------------------
    */

    event: {
      type: String,
      required: true,
      index: true,
    },

    /*
    --------------------------------------------------
    Recipient
    --------------------------------------------------
    */

    recipient: {
      type: String,
      required: true,
      index: true,
    },

    /*
    --------------------------------------------------
    Subject
    --------------------------------------------------
    */

    subject: {
      type: String,
      default: "",
    },

    /*
    --------------------------------------------------
    Message
    --------------------------------------------------
    */

    message: {
      type: String,
      default: "",
    },

    /*
    --------------------------------------------------
    Status
    --------------------------------------------------
    */

    status: {
      type: String,
      enum: ["Pending", "Sent", "Failed"],
      default: "Pending",
      index: true,
    },

    /*
    --------------------------------------------------
    Provider
    --------------------------------------------------
    */

    provider: {
      type: String,
      default: "",
    },

    /*
    --------------------------------------------------
    Response
    --------------------------------------------------
    */

    response: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },

    /*
    --------------------------------------------------
    Error
    --------------------------------------------------
    */

    error: {
      type: String,
      default: "",
    },

    /*
    --------------------------------------------------
    Retry
    --------------------------------------------------
    */

    retryCount: {
      type: Number,
      default: 0,
    },

    sentAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("NotificationLog", NotificationLogSchema);
