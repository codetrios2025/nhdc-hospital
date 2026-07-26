import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchDepartmentDropdown } from "../../redux/thunks/departmentThunk";

const DepartmentDropdown = ({
  register,
  name = "department",
  label = "Department",
  required = false,
  error,
  disabled = false,
  value,
  onChange,
  showLabel = true,
}) => {
  const dispatch = useDispatch();

  const { departmentDropdown } = useSelector((state) => state.departments);

  console.log("Department Dropdown:", departmentDropdown);

  useEffect(() => {
    if (!departmentDropdown || departmentDropdown.length === 0) {
      dispatch(fetchDepartmentDropdown());
    }
  }, [dispatch, departmentDropdown]);

  return (
    <div className="mb-3">
      <label className="form-label">
        {label}
        {required && <span className="text-danger ms-1">*</span>}
      </label>

      <select
        className={`form-select ${error ? "is-invalid" : ""}`}
        disabled={disabled}
        value={value}
        onChange={onChange}
        {...(register ? register(name) : {})}
      >
        <option value="">All Departments</option>

        {departmentDropdown.map((department) => (
          <option key={department._id} value={department._id}>
            {department.name}
          </option>
        ))}
      </select>

      {error && <div className="invalid-feedback">{error.message}</div>}
    </div>
  );
};

export default DepartmentDropdown;
