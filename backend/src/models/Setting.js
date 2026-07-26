const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema(
  {
    hospitalName: String,

    email: String,

    mobile: String,

    address: String,

    logo: String,

    favicon: String,

    facebook: String,

    instagram: String,

    youtube: String,

    linkedin: String,

    twitter: String,

    googleMap: String,

    footerText: String,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Setting", settingSchema);
