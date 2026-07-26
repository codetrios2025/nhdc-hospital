import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  fetchDepartments,
  fetchDepartmentStatistics,
} from "../../../redux/thunks/departmentThunk";

import DepartmentTable from "../components/DepartmentTable";
import DepartmentFilters from "../components/DepartmentFilters";

const DepartmentListPage = () => {
  const dispatch = useDispatch();

  const { departments, pagination, filters, loading, statistics } = useSelector(
    (state) => state.departments,
  );

  useEffect(() => {
    loadDepartments();
    dispatch(fetchDepartmentStatistics());
  }, []);

  const loadDepartments = (page = 1, extraFilters = filters) => {
    dispatch(
      fetchDepartments({
        page,
        limit: pagination.limit,
        ...extraFilters,
      }),
    );
  };

  const handleRefresh = () => {
    loadDepartments(pagination.page, filters);
    dispatch(fetchDepartmentStatistics());
  };

  return (
    <div className="container-fluid">
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="mb-1">Departments</h3>
          <p className="text-muted mb-0">Manage hospital departments</p>
        </div>

        <Link to="/departments/add" className="btn btn-primary">
          <i className="fa fa-plus me-2"></i>
          Add Department
        </Link>
      </div>

      {/* Statistics */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6>Total</h6>
              <h3>{statistics.total || 0}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6>Active</h6>
              <h3>{statistics.active || 0}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6>Inactive</h6>
              <h3>{statistics.inactive || 0}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6>Featured</h6>
              <h3>{statistics.featured || 0}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <DepartmentFilters
        filters={filters}
        onSearch={loadDepartments}
        onRefresh={handleRefresh}
      />

      {/* Table */}
      <DepartmentTable
        loading={loading}
        departments={departments}
        pagination={pagination}
        onPageChange={loadDepartments}
      />
    </div>
  );
};

export default DepartmentListPage;
