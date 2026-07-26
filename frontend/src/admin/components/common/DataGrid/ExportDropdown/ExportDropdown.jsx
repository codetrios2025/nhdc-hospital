import { FaFileExcel, FaFilePdf, FaPrint, FaDownload } from "react-icons/fa";

const ExportDropdown = () => {
  return (
    <div className="dropdown">
      <button className="btn btn-outline-secondary" data-bs-toggle="dropdown">
        <FaDownload />
        Export
      </button>

      <ul className="dropdown-menu">
        <li>
          <button className="dropdown-item">
            <FaFileExcel />
            Excel
          </button>
        </li>

        <li>
          <button className="dropdown-item">
            <FaFilePdf />
            PDF
          </button>
        </li>

        <li>
          <button className="dropdown-item">
            <FaPrint />
            Print
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ExportDropdown;
