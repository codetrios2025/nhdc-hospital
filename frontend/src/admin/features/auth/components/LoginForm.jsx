import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

import PasswordInput from "./PasswordInput";

import authApi from "../api/authApi";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      dispatch(loginStart());

      const response = await authApi.login(formData);

      console.log("LOGIN RESPONSE =", response);

      dispatch(loginSuccess(response.data));

      Swal.fire({
        icon: "success",
        title: "Success",
        text: response.message,
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/admin/dashboard");
    } catch (error) {
      dispatch(loginFailure(error.response?.data?.message || "Login failed"));

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.response?.data?.message || "Invalid credentials",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label className="form-label">Email Address</label>

        <input
          type="email"
          className={`form-control ${errors.email ? "is-invalid" : ""}`}
          placeholder="Enter Email"
          {...register("email", {
            required: "Email is required",
          })}
        />

        {errors.email && (
          <div className="invalid-feedback">{errors.email.message}</div>
        )}
      </div>

      <PasswordInput register={register} error={errors.password} />

      <div className="d-flex justify-content-between mb-4">
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="remember" />

          <label className="form-check-label" htmlFor="remember">
            Remember Me
          </label>
        </div>

        <Link to="/admin/forgot-password">Forgot Password?</Link>
      </div>

      <button className="btn btn-primary w-100" disabled={loading}>
        {loading ? "Please Wait..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
