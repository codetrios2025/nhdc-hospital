import Swal from "sweetalert2";

import { useDispatch } from "react-redux";

import { updateServiceTestStatus } from "../../../redux/thunks/serviceTestThunk";

const ServiceTestStatusSwitch = ({ test, onUpdated }) => {
  const dispatch = useDispatch();

  const handleChange = async (e) => {
    const status = e.target.checked;

    try {
      await dispatch(
        updateServiceTestStatus({
          id: test._id,
          status,
        }),
      ).unwrap();

      Swal.fire({
        icon: "success",
        title: "Success",
        text: `Service Test ${
          status ? "activated" : "deactivated"
        } successfully.`,
        timer: 1200,
        showConfirmButton: false,
      });

      onUpdated?.();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error || "Unable to update service test status.",
      });
    }
  };

  return (
    <div className="form-check form-switch d-flex justify-content-center">
      <input
        className="form-check-input"
        type="checkbox"
        checked={test.status}
        onChange={handleChange}
      />
    </div>
  );
};

export default ServiceTestStatusSwitch;
