import { Link, useLocation } from "react-router-dom";
import { FaChevronRight, FaHome } from "react-icons/fa";

const Breadcrumb = () => {
  const location = useLocation();

  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav className="breadcrumb-wrapper">
      <ol className="breadcrumb-list">
        <li>
          <Link to="/admin/dashboard">
            <FaHome />
          </Link>
        </li>

        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;

          const url = "/" + pathnames.slice(0, index + 1).join("/");

          return (
            <li key={url} className="breadcrumb-item">
              <FaChevronRight className="separator" />

              {last ? (
                <span>
                  {value
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                </span>
              ) : (
                <Link to={url}>
                  {value
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
