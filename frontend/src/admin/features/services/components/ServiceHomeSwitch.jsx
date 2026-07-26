import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import { toggleServiceHome } from "../../../redux/thunks/serviceThunk";

const ServiceHomeSwitch = ({ service }) => {
  const dispatch = useDispatch();

  const handleChange = async () => {
    try {
      await dispatch(toggleServiceHome(service._id, !service.showOnHome));

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Home visibility updated",
        timer: 1200,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error?.response?.data?.message || "Unable to update Home visibility",
      });
    }
  };

  return (
    <div className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        checked={service.showOnHome}
        onChange={handleChange}
      />
    </div>
  );
};

export default ServiceHomeSwitch;
