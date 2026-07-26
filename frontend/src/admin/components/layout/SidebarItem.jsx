import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";

const SidebarItem = ({ item }) => {
  const [open, setOpen] = useState(false);

  const Icon = item.icon;

  if (item.children) {
    return (
      <li className={`sidebar-item ${open ? "open" : ""}`}>
        <button
          className="sidebar-link sidebar-parent"
          onClick={() => setOpen(!open)}
        >
          <div className="menu-left">
            <Icon className="menu-icon" />

            <span>{item.title}</span>
          </div>

          <FaChevronDown className="arrow" />
        </button>

        <ul className="submenu">
          {item.children.map((child) => (
            <li key={child.path}>
              <NavLink
                to={child.path}
                className={({ isActive }) =>
                  isActive ? "submenu-link active" : "submenu-link"
                }
              >
                {child.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </li>
    );
  }

  return (
    <li className="sidebar-item">
      <NavLink
        to={item.path}
        className={({ isActive }) =>
          isActive ? "sidebar-link active" : "sidebar-link"
        }
      >
        <Icon className="menu-icon" />

        <span>{item.title}</span>
      </NavLink>
    </li>
  );
};

export default SidebarItem;
