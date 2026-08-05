import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useForm } from "react-hook-form";

import defaultContactValues from "../utils/defaultContactValues";

import { fetchContact, saveContact } from "../../../redux/thunks/contactThunk";

const useContactForm = () => {
  const dispatch = useDispatch();

  const { contact, loading } = useSelector((state) => state.contact);

  const methods = useForm({
    defaultValues: defaultContactValues,
  });

  const {
    reset,
    handleSubmit,
    control,
    register,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = methods;

  /**
   * --------------------------------------------------------------------------
   * Load Contact Details
   * --------------------------------------------------------------------------
   */

  useEffect(() => {
    dispatch(fetchContact());
  }, [dispatch]);

  /**
   * --------------------------------------------------------------------------
   * Populate Form
   * --------------------------------------------------------------------------
   */

  useEffect(() => {
    if (!contact) return;

    reset({
      hospitalName: contact.hospitalName || "",

      address: contact.address || "",

      email: contact.email || "",

      contactFormRecipient: contact.contactFormRecipient || "",

      phoneNumbers:
        contact.phoneNumbers?.length > 0 ? contact.phoneNumbers : ["", ""],

      emergencyNumber: contact.emergencyNumber || "",

      whatsappNumber: contact.whatsappNumber || "",

      receptionNumber: contact.receptionNumber || "",

      opdNumber: contact.opdNumber || "",

      ambulanceNumber: contact.ambulanceNumber || "",

      workingHours: {
        mondaySaturday: {
          morning: contact.workingHours?.mondaySaturday?.morning || "",

          evening: contact.workingHours?.mondaySaturday?.evening || "",
        },

        sunday: {
          morning: contact.workingHours?.sunday?.morning || "",
        },
      },

      googleMap: {
        embedUrl: contact.googleMap?.embedUrl || "",

        latitude: contact.googleMap?.latitude || "",

        longitude: contact.googleMap?.longitude || "",
      },

      socialMedia: {
        facebook: contact.socialMedia?.facebook || "",

        instagram: contact.socialMedia?.instagram || "",

        twitter: contact.socialMedia?.twitter || "",

        linkedin: contact.socialMedia?.linkedin || "",

        youtube: contact.socialMedia?.youtube || "",
      },

      seo: {
        metaTitle: contact.seo?.metaTitle || "",

        metaDescription: contact.seo?.metaDescription || "",

        metaKeywords: Array.isArray(contact.seo?.metaKeywords)
          ? contact.seo.metaKeywords.join(", ")
          : contact.seo?.metaKeywords || "",
      },

      isActive: typeof contact.isActive === "boolean" ? contact.isActive : true,
    });
  }, [contact, reset]);

  return {
    methods,

    control,

    register,

    watch,

    setValue,

    errors,

    loading,

    isSubmitting,

    handleSubmit,
  };
};

export default useContactForm;
