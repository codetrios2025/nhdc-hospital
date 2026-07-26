import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import useDebounce from "../../../hooks/useDebounce";

import {
  fetchServices,
  deleteService,
} from "../../../redux/thunks/serviceThunk";

import ServiceTable from "../components/ServiceTable";
import ServiceFilters from "../components/ServiceFilters";

import { TablePagination } from "../../../components/common/DataTable";

const ServiceList = () => {
  const dispatch = useDispatch();

  const { services, loading, error, pagination } = useSelector(
    (state) => state.service,
  );

  const [search, setSearch] = useState("");

  const [department, setDepartment] = useState("");

  const [status, setStatus] = useState("");

  const [limit, setLimit] = useState(10);

  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    dispatch(
      fetchServices({
        page,
        limit,
        search: debouncedSearch,
        department,
        status,
      }),
    );
  }, [dispatch, page, limit, debouncedSearch, department, status]);

  const reloadServices = () => {
    dispatch(
      fetchServices({
        page,
        limit,
        search: debouncedSearch,
        department,
        status,
      }),
    );
  };

  const handleDeleteService = async (id) => {
    const result = await Swal.fire({
      title: "Delete Service?",
      text: "You won't be able to recover this service.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await dispatch(deleteService(id));

      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Service deleted successfully.",
        timer: 1200,
        showConfirmButton: false,
      });

      reloadServices();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "Unable to delete service.",
      });
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Service Management</h2>

          <p className="text-muted mb-0">Manage hospital services</p>
        </div>

        <Link to="/admin/services/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add Service
        </Link>
      </div>

      <ServiceFilters
        search={search}
        setSearch={setSearch}
        department={department}
        setDepartment={setDepartment}
        status={status}
        setStatus={setStatus}
        limit={limit}
        setLimit={setLimit}
      />

      {error && <div className="alert alert-danger">{error}</div>}

      <ServiceTable
        loading={loading}
        services={services}
        reloadServices={reloadServices}
        deleteService={handleDeleteService}
      />

      <TablePagination
        page={pagination?.page || 1}
        totalPages={pagination?.totalPages || 1}
        onPageChange={setPage}
      />
    </div>
  );
};

export default ServiceList;
