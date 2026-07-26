const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema(
  {
    module: {
      type: String,
      required: true,
    },

    action: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    ipAddress: String,

    browser: String,

    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("AuditLog", auditLogSchema);
