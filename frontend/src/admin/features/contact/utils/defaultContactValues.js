const defaultContactValues = {
  hospitalName: "",

  address: "",

  email: "",

  contactFormRecipient: "",

  phoneNumbers: ["", ""],

  emergencyNumber: "",

  whatsappNumber: "",

  receptionNumber: "",

  opdNumber: "",

  ambulanceNumber: "",

  workingHours: {
    mondaySaturday: {
      morning: "",

      evening: "",
    },

    sunday: {
      morning: "",
    },
  },

  googleMap: {
    embedUrl: "",

    latitude: "",

    longitude: "",
  },

  socialMedia: {
    facebook: "",

    instagram: "",

    twitter: "",

    linkedin: "",

    youtube: "",
  },

  seo: {
    metaTitle: "",

    metaDescription: "",

    metaKeywords: [],
  },

  isActive: true,
};

export default defaultContactValues;
