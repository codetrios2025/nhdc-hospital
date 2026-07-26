import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchDepartmentDropdown } from "../../redux/thunks/departmentThunk";

const DepartmentFilter = ({
  value = "",
  onChange,
  placeholder = "All Departments",
  className = "",
}) => {
  const dispatch = useDispatch();

  const { departmentDropdown } = useSelector((state) => state.departments);

  useEffect(() => {
    if (!departmentDropdown?.length) {
      dispatch(fetchDepartmentDropdown());
    }
  }, [dispatch]);

  return (
    <select
      className={`form-select ${className}`}
      value={value}
      onChange={onChange}
    >
      <option value="">{placeholder}</option>

      {departmentDropdown.map((department) => (
        <option key={department._id} value={department._id}>
          {department.name}
        </option>
      ))}
    </select>
  );
};

export default DepartmentFilter;
