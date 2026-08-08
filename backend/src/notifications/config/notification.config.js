module.exports = {
  hospital: {
    name: process.env.HOSPITAL_NAME || "Namokar Hospital & Diagnostic Centre",

    email: process.env.HOSPITAL_EMAIL,

    phone: process.env.HOSPITAL_PHONE,

    website: process.env.HOSPITAL_WEBSITE || "",

    logo: process.env.HOSPITAL_LOGO || "",
  },

  notification: {
    maxRetry: 5,
  },
};
