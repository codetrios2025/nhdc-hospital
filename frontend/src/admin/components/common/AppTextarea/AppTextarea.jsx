const AppTextarea = ({
  label,

  required,

  error,

  rows = 5,

  ...props
}) => {
  return (
    <div className="app-form-group">
      <label className="app-label">
        {label}

        {required && <span className="required">*</span>}
      </label>

      <textarea rows={rows} className="app-control" {...props} />

      {error && <div className="app-error">{error}</div>}
    </div>
  );
};

export default AppTextarea;
