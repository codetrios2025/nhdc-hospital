import { FaCloudUploadAlt } from "react-icons/fa";

const AppFileUpload = ({
  label,

  accept,

  onChange,
}) => {
  return (
    <div className="app-form-group">
      <label className="app-label">{label}</label>

      <label className="upload-box">
        <FaCloudUploadAlt size={40} />

        <h5>Click to Upload</h5>

        <p>PNG, JPG, PDF</p>

        <input type="file" hidden accept={accept} onChange={onChange} />
      </label>
    </div>
  );
};

export default AppFileUpload;
