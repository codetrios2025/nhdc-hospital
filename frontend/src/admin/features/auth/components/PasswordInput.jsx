import { useState } from "react";

import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordInput = ({ register, error }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-3">
      <label className="form-label">Password</label>

      <div className="position-relative">
        <input
          type={showPassword ? "text" : "password"}
          className={`form-control ${error ? "is-invalid" : ""}`}
          placeholder="Enter password"
          {...register("password", {
            required: "Password is required",
          })}
        />

        <button
          type="button"
          className="btn btn-link position-absolute top-50 end-0 translate-middle-y"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

      {error && <div className="invalid-feedback">{error.message}</div>}
    </div>
  );
};

export default PasswordInput;
