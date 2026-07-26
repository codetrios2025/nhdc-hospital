import { useState } from "react";
import { useDispatch } from "react-redux";

import { setFilters } from "../../../redux/slices/departmentSlice";

const DepartmentFilters = ({ filters, onSearch, onRefresh }) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    search: filters.search || "",
    status: filters.status || "",
    featured: filters.featured || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    dispatch(setFilters(form));
    onSearch(1, form);
  };

  const handleReset = () => {
    const resetFilters = {
      search: "",
      status: "",
      featured: "",
    };

    setForm(resetFilters);
    dispatch(setFilters(resetFilters));
    onSearch(1, resetFilters);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <div className="row g-3">
          {/* Search */}

          <div className="col-lg-4">
            <label className="form-label">Search</label>

            <input
              type="text"
              className="form-control"
              name="search"
              placeholder="Department name..."
              value={form.search}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </div>

          {/* Status */}

          <div className="col-lg-3">
            <label className="form-label">Status</label>

            <select
              className="form-select"
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option value="">All</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>

          {/* Featured */}

          <div className="col-lg-3">
            <label className="form-label">Featured</label>

            <select
              className="form-select"
              name="featured"
              value={form.featured}
              onChange={handleChange}
            >
              <option value="">All</option>
              <option value="true">Featured</option>
              <option value="false">Not Featured</option>
            </select>
          </div>

          {/* Buttons */}

          <div className="col-lg-2 d-flex align-items-end">
            <div className="d-grid gap-2 w-100">
              <button className="btn btn-primary" onClick={handleSearch}>
                <i className="fa fa-search me-2"></i>
                Search
              </button>

              <button
                className="btn btn-outline-secondary"
                onClick={handleReset}
              >
                <i className="fa fa-refresh me-2"></i>
                Reset
              </button>

              <button className="btn btn-outline-primary" onClick={onRefresh}>
                <i className="fa fa-refresh me-2"></i>
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentFilters;
