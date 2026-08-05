const createContactPayload = (data) => ({
  hospitalName: data.hospitalName?.trim(),

  address: data.address?.trim(),

  email: data.email?.trim(),

  contactFormRecipient: data.contactFormRecipient?.trim(),

  phoneNumbers: (data.phoneNumbers || []).filter((item) => item.trim() !== ""),

  emergencyNumber: data.emergencyNumber?.trim(),

  whatsappNumber: data.whatsappNumber?.trim(),

  receptionNumber: data.receptionNumber?.trim(),

  opdNumber: data.opdNumber?.trim(),

  ambulanceNumber: data.ambulanceNumber?.trim(),

  workingHours: data.workingHours,

  googleMap: data.googleMap,

  socialMedia: data.socialMedia,

  seo: {
    metaTitle: data.seo?.metaTitle?.trim() || "",

    metaDescription: data.seo?.metaDescription?.trim() || "",

    metaKeywords: Array.isArray(data.seo?.metaKeywords)
      ? data.seo.metaKeywords.map((item) => String(item).trim()).filter(Boolean)
      : typeof data.seo?.metaKeywords === "string"
        ? data.seo.metaKeywords
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        : [],
  },

  isActive: data.isActive,
});

export default createContactPayload;
