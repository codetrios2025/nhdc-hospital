const AppCheckbox = ({
  label,

  ...props
}) => {
  return (
    <div className="form-check">
      <input type="checkbox" className="form-check-input" {...props} />

      <label className="form-check-label">{label}</label>
    </div>
  );
};

export default AppCheckbox;
