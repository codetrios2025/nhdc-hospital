import { useForm } from "react-hook-form";

const defaultValues = {
  firstName: "",
  lastName: "",
  department: "",
  designation: "",
  qualification: "",
  experience: "",
  gender: "Male",
  registrationNumber: "",
  consultationFee: "",
  hospitalBranch: "",
  shortDescription: "",
  description: "",
  education: "",
  awards: "",
  memberships: "",
  featured: false,
  isActive: true,
};

const useDoctorForm = (doctor = null) => {
  return useForm({
    mode: "onBlur",
    defaultValues: doctor || defaultValues,
  });
};

export default useDoctorForm;
