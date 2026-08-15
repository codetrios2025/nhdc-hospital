import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import authApi from "../api/authApi";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  /**
   * ============================================
   * PASSWORD VALIDATION
   * ============================================
   */
  const validatePassword = (value) => {
    if (!value) {
      return "Password is required";
    }

    if (value.length < 8) {
      return "Password must be at least 8 characters";
    }

    if (!/[a-z]/.test(value)) {
      return "Password must contain at least one lowercase letter";
    }

    if (!/[A-Z]/.test(value)) {
      return "Password must contain at least one uppercase letter";
    }

    if (!/\d/.test(value)) {
      return "Password must contain at least one number";
    }

    if (!/[@$!%*?&]/.test(value)) {
      return "Password must contain at least one special character";
    }

    return null;
  };

  /**
   * ============================================
   * SUBMIT
   * ============================================
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      await Swal.fire({
        icon: "error",
        title: "Invalid Reset Link",
        text: "The password reset link is invalid or missing.",
      });

      return;
    }

    /**
     * Validate password
     */
    const passwordError = validatePassword(password);

    if (passwordError) {
      await Swal.fire({
        icon: "warning",
        title: "Invalid Password",
        text: passwordError,
      });

      return;
    }

    /**
     * Confirm password
     */
    if (password !== confirmPassword) {
      await Swal.fire({
        icon: "warning",
        title: "Passwords Do Not Match",
        text: "New password and confirm password must be the same.",
      });

      return;
    }

    try {
      setLoading(true);

      /**
       * Call backend
       *
       * POST:
       * /api/admin/auth/reset-password/:token
       */
      await authApi.resetPassword(token, password);

      await Swal.fire({
        icon: "success",
        title: "Password Reset Successful",
        text: "Your password has been reset successfully.",
        confirmButtonText: "Go to Login",
      });

      /**
       * Redirect to admin login
       */
      navigate("/admin/login", {
        replace: true,
      });
    } catch (error) {
      console.error("Reset Password Error:", error);

      const message =
        error?.response?.data?.message ||
        "Unable to reset password. The reset link may be invalid or expired.";

      Swal.fire({
        icon: "error",
        title: "Reset Password Failed",
        text: message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundColor: "#f5f7fb",
        padding: "30px 15px",
      }}
    >
      <div
        className="card border-0 shadow-sm"
        style={{
          width: "100%",
          maxWidth: "460px",
          borderRadius: "14px",
        }}
      >
        <div className="card-body p-4 p-md-5">
          {/* ================================= */}
          {/* LOGO                              */}
          {/* ================================= */}

          <div className="text-center mb-4">
            <img
              src="https://namokarhospitaldeoli.com/assets/nhdc-logo-CJoxj7eN.png"
              alt="Namokar Hospital & Diagnostic Centre"
              style={{
                width: "180px",
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </div>

          {/* ================================= */}
          {/* TITLE                             */}
          {/* ================================= */}

          <div className="text-center mb-4">
            <h3
              className="fw-bold mb-2"
              style={{
                color: "#1e3a5f",
              }}
            >
              Reset Password
            </h3>

            <p
              className="text-muted mb-0"
              style={{
                fontSize: "14px",
              }}
            >
              Create a new password for your admin account.
            </p>
          </div>

          {/* ================================= */}
          {/* FORM                              */}
          {/* ================================= */}

          <form onSubmit={handleSubmit}>
            {/* =============================== */}
            {/* NEW PASSWORD                     */}
            {/* =============================== */}

            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-semibold">
                New Password
              </label>

              <div className="input-group">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPassword((previous) => !previous)}
                  disabled={loading}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* =============================== */}
            {/* CONFIRM PASSWORD                 */}
            {/* =============================== */}

            <div className="mb-3">
              <label
                htmlFor="confirmPassword"
                className="form-label fw-semibold"
              >
                Confirm Password
              </label>

              <div className="input-group">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() =>
                    setShowConfirmPassword((previous) => !previous)
                  }
                  disabled={loading}
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* ================================= */}
            {/* PASSWORD REQUIREMENTS              */}
            {/* ================================= */}

            <div
              className="p-3 mb-4 rounded"
              style={{
                backgroundColor: "#f8f9fa",
                fontSize: "13px",
              }}
            >
              <div className="fw-semibold mb-2">Password requirements:</div>

              <div
                className={password.length >= 8 ? "text-success" : "text-muted"}
              >
                ✓ At least 8 characters
              </div>

              <div
                className={
                  /[A-Z]/.test(password) ? "text-success" : "text-muted"
                }
              >
                ✓ One uppercase letter
              </div>

              <div
                className={
                  /[a-z]/.test(password) ? "text-success" : "text-muted"
                }
              >
                ✓ One lowercase letter
              </div>

              <div
                className={/\d/.test(password) ? "text-success" : "text-muted"}
              >
                ✓ One number
              </div>

              <div
                className={
                  /[@$!%*?&]/.test(password) ? "text-success" : "text-muted"
                }
              >
                ✓ One special character
              </div>
            </div>

            {/* ================================= */}
            {/* SUBMIT                            */}
            {/* ================================= */}

            <button
              type="submit"
              className="btn w-100 py-2"
              disabled={loading}
              style={{
                backgroundColor: "#e91e63",
                color: "#ffffff",
                border: "none",
                borderRadius: "6px",
                fontWeight: "600",
              }}
            >
              {loading ? "Resetting Password..." : "Reset Password"}
            </button>
          </form>

          {/* ================================= */}
          {/* BACK TO LOGIN                     */}
          {/* ================================= */}

          <div className="text-center mt-4">
            <Link
              to="/admin/login"
              className="text-decoration-none"
              style={{
                color: "#1e3a5f",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              ← Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
