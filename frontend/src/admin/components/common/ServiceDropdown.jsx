import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchServices } from "../../redux/thunks/serviceThunk";

const ServiceDropdown = ({
  register,
  name = "service",
  label = "Service",
  required = false,
  error,
  disabled = false,
  showLabel = true,
  value,
  onChange,
}) => {
  const dispatch = useDispatch();

  const { services } = useSelector((state) => state.services);

  useEffect(() => {
    if (!services || services.length === 0) {
      dispatch(fetchServices({ limit: 1000, status: true }));
    }
  }, [dispatch]);

  return (
    <div className="mb-3">
      {showLabel && (
        <label className="form-label">
          {label}
          {required && <span className="text-danger">*</span>}
        </label>
      )}

      <select
        className={`form-select ${error ? "is-invalid" : ""}`}
        disabled={disabled}
        value={value}
        onChange={onChange}
        {...(!value && register ? register(name) : {})}
      >
        <option value="">Select Service</option>

        {services?.map((service) => (
          <option key={service._id} value={service._id}>
            {service.title}
          </option>
        ))}
      </select>

      {error && <div className="invalid-feedback">{error.message}</div>}
    </div>
  );
};

export default ServiceDropdown;
