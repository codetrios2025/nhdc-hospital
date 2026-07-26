import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaSignOutAlt } from "react-icons/fa";

import { logout } from "../../redux/slices/authSlice";

const LogoutButton = ({ onSuccess }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Logout",

      text: "Are you sure you want to logout?",

      icon: "question",

      showCancelButton: true,

      confirmButtonText: "Logout",

      cancelButtonText: "Cancel",

      confirmButtonColor: "#E91E63",

      reverseButtons: true,
    });

    if (!result.isConfirmed) {
      return;
    }

    dispatch(logout());

    localStorage.removeItem("token");

    if (onSuccess) {
      onSuccess();
    }

    await Swal.fire({
      icon: "success",

      title: "Logged Out",

      text: "You have been logged out successfully.",

      timer: 1200,

      showConfirmButton: false,
    });

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <button type="button" className="logout-btn" onClick={handleLogout}>
      <FaSignOutAlt />

      <span>Logout</span>
    </button>
  );
};

export default LogoutButton;
