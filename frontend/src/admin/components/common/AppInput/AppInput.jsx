const AppInput = ({
  label,

  required = false,

  error,

  className = "",

  ...props
}) => {
  return (
    <div className="app-form-group">
      {label && (
        <label className="app-label">
          {label}

          {required && <span className="required">*</span>}
        </label>
      )}

      <input className={`app-control ${className}`} {...props} />

      {error && <div className="app-error">{error}</div>}
    </div>
  );
};

export default AppInput;
