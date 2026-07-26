import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import { toggleServiceFeatured } from "../../../redux/thunks/serviceThunk";

const ServiceFeaturedSwitch = ({ service }) => {
  const dispatch = useDispatch();

  const handleChange = async () => {
    try {
      await dispatch(toggleServiceFeatured(service._id, !service.isFeatured));

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
        text: error?.response?.data?.message || "Unable to update featured",
      });
    }
  };

  return (
    <div className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        checked={service.isFeatured}
        onChange={handleChange}
      />
    </div>
  );
};

export default ServiceFeaturedSwitch;
