import { useDispatch } from "react-redux";

import { toggleDoctorFeatured } from "../../../redux/thunks/doctorThunk";

import Swal from "sweetalert2";

const DoctorFeaturedSwitch = ({ doctor }) => {
  const dispatch = useDispatch();

  const handleChange = async () => {
    try {
      await dispatch(toggleDoctorFeatured(doctor._id, !doctor.featured));

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Featured updated",
        timer: 1200,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Unable to update featured",
      });
    }
  };

  return (
    <div className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        checked={doctor.featured}
        onChange={handleChange}
      />
    </div>
  );
};

export default DoctorFeaturedSwitch;
