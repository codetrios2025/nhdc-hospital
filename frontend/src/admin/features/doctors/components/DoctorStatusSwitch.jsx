import { useDispatch } from "react-redux";

import { changeDoctorStatus } from "../../../redux/thunks/doctorThunk";

import Swal from "sweetalert2";

const DoctorStatusSwitch = ({ doctor }) => {
  const dispatch = useDispatch();

  const handleChange = async () => {
    try {
      await dispatch(changeDoctorStatus(doctor._id, !doctor.isActive));

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Doctor status updated",
        timer: 1200,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Unable to update status",
      });
    }
  };
  return (
    <div className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        checked={doctor.isActive}
        onChange={handleChange}
      />
    </div>
  );
};

export default DoctorStatusSwitch;
