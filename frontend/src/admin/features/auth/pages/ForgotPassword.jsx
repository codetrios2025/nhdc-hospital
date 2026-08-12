import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import authApi from "../api/authApi";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  /**
   * ============================================
   * SUBMIT FORGOT PASSWORD
   * ============================================
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const normalizedEmail = email.trim();

    /**
     * Email required
     */
    if (!normalizedEmail) {
      await Swal.fire({
        icon: "warning",
        title: "Email Required",
        text: "Please enter your email address.",
      });

      return;
    }

    /**
     * Email format validation
     */
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      await Swal.fire({
        icon: "warning",
        title: "Invalid Email",
        text: "Please enter a valid email address.",
      });

      return;
    }

    try {
      setLoading(true);

      /**
       * Call backend
       *
       * POST:
       * /api/admin/auth/forgot-password
       */
      await authApi.forgotPassword(normalizedEmail);

      /**
       * Always show a generic message.
       *
       * This prevents revealing whether
       * an admin account exists with the
       * entered email address.
       */
      await Swal.fire({
        icon: "success",
        title: "Check Your Email",
        text: "If an account exists with this email address, a password reset link has been sent.",
        confirmButtonText: "OK",
      });

      /**
       * Clear email after successful request
       */
      setEmail("");
    } catch (error) {
      console.error("Forgot Password Error:", error);

      const message =
        error?.response?.data?.message ||
        "Unable to process your request. Please try again later.";

      Swal.fire({
        icon: "error",
        title: "Request Failed",
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
              Forgot Password?
            </h3>

            <p
              className="text-muted mb-0"
              style={{
                fontSize: "14px",
                lineHeight: "1.6",
              }}
            >
              Enter your registered email address and we'll send you a link to
              reset your password.
            </p>
          </div>

          {/* ================================= */}
          {/* FORM                              */}
          {/* ================================= */}

          <form onSubmit={handleSubmit}>
            {/* Email */}

            <div className="mb-4">
              <label htmlFor="email" className="form-label fw-semibold">
                Email Address
              </label>

              <input
                id="email"
                type="email"
                className="form-control"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                autoComplete="email"
                autoFocus
              />
            </div>

            {/* ================================= */}
            {/* SUBMIT BUTTON                     */}
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
              {loading ? "Sending..." : "Send Reset Link"}
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

export default ForgotPassword;
