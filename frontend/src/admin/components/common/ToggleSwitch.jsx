const ToggleSwitch = ({ checked, onChange, disabled = false }) => {
  return (
    <div className="form-check form-switch">
      <input
        type="checkbox"
        className="form-check-input"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
};

export default ToggleSwitch;
