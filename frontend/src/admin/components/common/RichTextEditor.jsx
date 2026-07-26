import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./RichTextEditor.css";

const RichTextEditor = ({
  label,
  value,
  onChange,
  error,
  required = false,
  placeholder = "",
}) => {
  return (
    <div className="mb-3">
      {label && (
        <label className="form-label">
          {label}
          {required && <span className="text-danger"> *</span>}
        </label>
      )}

      <CKEditor
        editor={ClassicEditor}
        data={value || ""}
        config={{
          placeholder,
          toolbar: [
            "heading",
            "|",
            "bold",
            "italic",
            "underline",
            "link",
            "|",
            "bulletedList",
            "numberedList",
            "|",
            "insertTable",
            "|",
            "undo",
            "redo",
          ],
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
      />

      {error && <div className="text-danger mt-1">{error.message}</div>}
    </div>
  );
};

export default RichTextEditor;
