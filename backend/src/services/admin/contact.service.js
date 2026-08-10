const ContactRepository = require("../../repositories/admin/contact.repository");

class ContactService {
  /**
   * Get Contact Details (Admin)
   */
  async getContact() {
    return await ContactRepository.getContact();
  }

  /**
   * Get Active Contact (Website)
   */
  async getActiveContact() {
    return await ContactRepository.getActiveContact();
  }

  /**
   * Save Contact (Singleton)
   */
  async saveContactold(data, adminId) {
    const payload = {
      hospitalName: (data.hospitalName || "").trim(),

      address: (data.address || "").trim(),

      email: (data.email || "").trim().toLowerCase(),

      contactFormRecipient: (data.contactFormRecipient || "")
        .trim()
        .toLowerCase(),

      phoneNumbers: Array.isArray(data.phoneNumbers)
        ? data.phoneNumbers
            .map((item) => item.trim())
            .filter((item) => item !== "")
        : [],

      emergencyNumber: (data.emergencyNumber || "").trim(),

      whatsappNumber: (data.whatsappNumber || "").trim(),

      receptionNumber: (data.receptionNumber || "").trim(),

      opdNumber: (data.opdNumber || "").trim(),

      ambulanceNumber: (data.ambulanceNumber || "").trim(),

      workingHours: {
        mondaySaturday: {
          morning: data?.workingHours?.mondaySaturday?.morning?.trim() || "",

          evening: data?.workingHours?.mondaySaturday?.evening?.trim() || "",
        },

        sunday: {
          morning: data?.workingHours?.sunday?.morning?.trim() || "",
        },
      },

      googleMap: {
        embedUrl: data?.googleMap?.embedUrl?.trim() || "",

        latitude: data?.googleMap?.latitude?.trim() || "",

        longitude: data?.googleMap?.longitude?.trim() || "",
      },

      socialMedia: {
        facebook: data?.socialMedia?.facebook?.trim() || "",

        instagram: data?.socialMedia?.instagram?.trim() || "",

        twitter: data?.socialMedia?.twitter?.trim() || "",

        linkedin: data?.socialMedia?.linkedin?.trim() || "",

        youtube: data?.socialMedia?.youtube?.trim() || "",
      },

      seo: {
        metaTitle: data?.seo?.metaTitle?.trim() || "",

        metaDescription: data?.seo?.metaDescription?.trim() || "",

        metaKeywords: Array.isArray(data?.seo?.metaKeywords)
          ? [
              ...new Set(data.seo.metaKeywords.map((item) => item.trim())),
            ].filter(Boolean)
          : [],
      },

      isActive: typeof data.isActive === "boolean" ? data.isActive : true,

      updatedBy: adminId || null,
    };

    return await ContactRepository.upsert(payload);
  }

  async saveContact(data, adminId) {
    console.log("1. ContactService INPUT:", data.contactFormRecipient);

    const contactFormRecipient = String(data.contactFormRecipient || "")
      .trim()
      .toLowerCase();

    console.log("2. ContactService AFTER CONVERSION:", contactFormRecipient);

    const payload = {
      hospitalName: (data.hospitalName || "").trim(),

      address: (data.address || "").trim(),

      email: (data.email || "").trim().toLowerCase(),

      contactFormRecipient,

      phoneNumbers: Array.isArray(data.phoneNumbers)
        ? data.phoneNumbers
            .map((item) => item.trim())
            .filter((item) => item !== "")
        : [],

      emergencyNumber: (data.emergencyNumber || "").trim(),

      whatsappNumber: (data.whatsappNumber || "").trim(),

      receptionNumber: (data.receptionNumber || "").trim(),

      opdNumber: (data.opdNumber || "").trim(),

      ambulanceNumber: (data.ambulanceNumber || "").trim(),

      workingHours: {
        mondaySaturday: {
          morning: data?.workingHours?.mondaySaturday?.morning?.trim() || "",

          evening: data?.workingHours?.mondaySaturday?.evening?.trim() || "",
        },

        sunday: {
          morning: data?.workingHours?.sunday?.morning?.trim() || "",
        },
      },

      googleMap: {
        embedUrl: data?.googleMap?.embedUrl?.trim() || "",

        latitude: data?.googleMap?.latitude?.trim() || "",

        longitude: data?.googleMap?.longitude?.trim() || "",
      },

      socialMedia: {
        facebook: data?.socialMedia?.facebook?.trim() || "",

        instagram: data?.socialMedia?.instagram?.trim() || "",

        twitter: data?.socialMedia?.twitter?.trim() || "",

        linkedin: data?.socialMedia?.linkedin?.trim() || "",

        youtube: data?.socialMedia?.youtube?.trim() || "",
      },

      seo: {
        metaTitle: data?.seo?.metaTitle?.trim() || "",

        metaDescription: data?.seo?.metaDescription?.trim() || "",

        metaKeywords: Array.isArray(data?.seo?.metaKeywords)
          ? [
              ...new Set(data.seo.metaKeywords.map((item) => item.trim())),
            ].filter(Boolean)
          : [],
      },

      isActive: typeof data.isActive === "boolean" ? data.isActive : true,

      updatedBy: adminId || null,
    };

    console.log("3. Payload BEFORE DATABASE:", payload.contactFormRecipient);

    return await ContactRepository.upsert(payload);
  }

  /**
   * Update Contact
   */
  async updateContact(id, data, adminId) {
    const payload = {
      ...data,
      updatedBy: adminId || null,
    };

    return await ContactRepository.update(id, payload);
  }

  /**
   * Delete Contact
   */
  async deleteContact(id) {
    return await ContactRepository.delete(id);
  }
}

module.exports = new ContactService();
