import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import { changeServiceStatus } from "../../../redux/thunks/serviceThunk";

const ServiceStatusSwitch = ({ service }) => {
  const dispatch = useDispatch();

  const handleChange = async () => {
    try {
      await dispatch(changeServiceStatus(service._id, !service.status));

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Service status updated",
        timer: 1200,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "Unable to update status",
      });
    }
  };

  return (
    <div className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        checked={service.status}
        onChange={handleChange}
      />
    </div>
  );
};

export default ServiceStatusSwitch;
