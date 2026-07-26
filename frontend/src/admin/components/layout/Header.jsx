import { useState, useRef } from "react";

import {
  FaBars,
  FaBell,
  FaSearch,
  FaMoon,
  FaExpand,
  FaCompress,
} from "react-icons/fa";

import { useSelector } from "react-redux";

import ProfileDropdown from "./ProfileDropdown";
import UserAvatar from "../common/UserAvatar";

import useClickOutside from "../../hooks/useClickOutside";

const Header = ({ onToggleSidebar }) => {
  const { user } = useSelector((state) => state.auth);

  const [profileOpen, setProfileOpen] = useState(false);

  const [isFullscreen, setIsFullscreen] = useState(false);

  const profileRef = useRef(null);

  useClickOutside(
    profileRef,

    () => setProfileOpen(false),
  );

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();

        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();

        setIsFullscreen(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="admin-header">
      <div className="header-left">
        <button className="header-icon" onClick={onToggleSidebar}>
          <FaBars />
        </button>

        <div className="search-box">
          <FaSearch className="search-icon" />

          <input type="text" placeholder="Search..." />
        </div>
      </div>

      <div className="header-right">
        <button className="header-icon">
          <FaMoon />
        </button>

        <button className="header-icon" onClick={toggleFullscreen}>
          {isFullscreen ? <FaCompress /> : <FaExpand />}
        </button>

        <button className="header-icon notification">
          <FaBell />

          <span>3</span>
        </button>

        <div className="profile-section" ref={profileRef}>
          <button
            className="profile-button"
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <UserAvatar user={user} />

            <div>
              <h6>{user?.fullName || "Administrator"}</h6>

              <small>{user?.role || "SUPER_ADMIN"}</small>
            </div>
          </button>

          {profileOpen && (
            <ProfileDropdown onClose={() => setProfileOpen(false)} />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
