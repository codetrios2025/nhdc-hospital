import { useDispatch, useSelector } from "react-redux";

import Swal from "sweetalert2";

import useContactForm from "../hooks/useContactForm";

import ContactBasicInfo from "./ContactBasicInfo";
import ContactNumbers from "./ContactNumbers";
import ContactWorkingHours from "./ContactWorkingHours";
import ContactGoogleMap from "./ContactGoogleMap";
import ContactSocialMedia from "./ContactSocialMedia";
import ContactSeo from "./ContactSeo";
import ContactSettings from "./ContactSettings";

import { saveContact } from "../../../redux/thunks/contactThunk";

import createContactPayload from "../utils/createContactPayload";

const ContactForm = () => {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.contact);

  const { register, control, watch, setValue, handleSubmit, errors } =
    useContactForm();

  /*
  --------------------------------------------------
  Submit
  --------------------------------------------------
  */

  const onSubmit = async (data) => {
    try {
      const payload = createContactPayload(data);

      await dispatch(saveContact(payload));

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Contact details saved successfully.",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error?.response?.data?.message ||
          error?.message ||
          "Unable to save contact details.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-lg-8">
          <ContactBasicInfo register={register} errors={errors} />

          <ContactNumbers register={register} errors={errors} />

          <ContactWorkingHours register={register} errors={errors} />

          <ContactGoogleMap register={register} errors={errors} />

          <ContactSocialMedia register={register} errors={errors} />

          <ContactSeo register={register} errors={errors} />
        </div>

        <div className="col-lg-4">
          <ContactSettings register={register} />
        </div>
      </div>

      <div className="text-end mt-4">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Saving..." : "Save Contact Details"}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
