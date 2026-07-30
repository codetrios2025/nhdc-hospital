import { Editor } from "primereact/editor";
import "./RichTextEditor.css";

const RichTextEditor = ({
  label,
  value,
  onChange,
  error,
  required = false,
}) => {
  return (
    <div className="mb-3">
      {label && (
        <label className="form-label">
          {label}
          {required && <span className="text-danger">*</span>}
        </label>
      )}

      <Editor
        value={value || ""}
        onTextChange={(e) => onChange(e.htmlValue)}
        style={{ height: "300px" }}
      />

      {error && (
        <div className="text-danger mt-1">
          {error.message}
        </div>
      )}
    </div>
  );
};

export default RichTextEditor;