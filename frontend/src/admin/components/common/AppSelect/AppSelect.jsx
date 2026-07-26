const AppSelect = ({
  label,

  required,

  options = [],

  error,

  ...props
}) => {
  return (
    <div className="app-form-group">
      <label className="app-label">
        {label}

        {required && <span className="required">*</span>}
      </label>

      <select className="app-control" {...props}>
        <option value="">Select</option>

        {options.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>

      {error && <div className="app-error">{error}</div>}
    </div>
  );
};

export default AppSelect;
