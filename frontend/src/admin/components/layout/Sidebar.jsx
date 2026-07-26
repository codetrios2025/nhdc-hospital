import { useState } from "react";
import { FaBars } from "react-icons/fa";
import sidebarMenu from "../../config/sidebarMenu";
import SidebarItem from "./SidebarItem";

const Sidebar = ({ isOpen }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`sidebar ${!isOpen || collapsed ? "collapsed" : ""}`}>
      {/* Logo */}
      <div className="sidebar-header">
        <div className="logo-section">
          {/* <img src="/logo.png" alt="NHDC" className="logo" /> */}
          <h3 className="text-white">NHDC</h3>

          {!collapsed && (
            <div>
              <h5>NHDC CMS</h5>

              <small>Hospital Admin</small>
            </div>
          )}
        </div>

        <button
          className="collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
        >
          <FaBars />
        </button>
      </div>

      {/* Navigation */}

      <div className="sidebar-body">
        <ul className="sidebar-menu">
          {sidebarMenu.map((item) => (
            <SidebarItem key={item.title} item={item} />
          ))}
        </ul>
      </div>

      {/* Footer */}

      {!collapsed && (
        <div className="sidebar-footer">
          <div className="profile">
            {/* <img src="/avatar.png" alt="Admin" /> */}
            <div className="avatar-placeholder">SA</div>

            <div>
              <h6>Super Admin</h6>

              <small>Administrator</small>
            </div>
          </div>

          <div className="version">Version 1.0.0</div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
