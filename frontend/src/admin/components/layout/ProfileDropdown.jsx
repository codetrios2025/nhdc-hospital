import { Link } from "react-router-dom";

import { FaUser, FaCog, FaKey } from "react-icons/fa";

import { useSelector } from "react-redux";

import UserAvatar from "../common/UserAvatar";

import LogoutButton from "../common/LogoutButton";

const ProfileDropdown = ({ onClose }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="profile-dropdown">
      <div className="profile-top">
        <UserAvatar user={user} size={55} />

        <div>
          <h5>{user?.fullName || "Administrator"}</h5>

          <small>{user?.email || ""}</small>
        </div>
      </div>

      <ul>
        <li>
          <Link to="/profile" className="dropdown-link" onClick={onClose}>
            <FaUser />

            <span>My Profile</span>
          </Link>
        </li>

        <li>
          <Link to="/settings" className="dropdown-link" onClick={onClose}>
            <FaCog />

            <span>Settings</span>
          </Link>
        </li>

        <li>
          <Link
            to="/change-password"
            className="dropdown-link"
            onClick={onClose}
          >
            <FaKey />

            <span>Change Password</span>
          </Link>
        </li>

        <li>
          <LogoutButton onSuccess={onClose} />
        </li>
      </ul>
    </div>
  );
};

export default ProfileDropdown;
