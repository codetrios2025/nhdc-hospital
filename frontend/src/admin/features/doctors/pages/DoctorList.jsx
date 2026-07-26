import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  fetchDoctors,
  deleteDoctor as deleteDoctorThunk,
} from "../../../redux/thunks/doctorThunk";

import DoctorTable from "../components/DoctorTable";
import DoctorFilters from "../components/DoctorFilters";

import { TablePagination } from "../../../components/common/DataTable";

import useDebounce from "../../../hooks/useDebounce";

import Swal from "sweetalert2";

const DoctorList = () => {
  const dispatch = useDispatch();

  const { doctors, loading, error, pagination } = useSelector(
    (state) => state.doctor,
  );

  const [search, setSearch] = useState("");

  const [department, setDepartment] = useState("");

  const [status, setStatus] = useState("");

  const [page, setPage] = useState(1);

  const [limit, setLimit] = useState(10);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    dispatch(
      fetchDoctors({
        page,
        limit,
        search: debouncedSearch,
        department,
        status,
      }),
    );
  }, [dispatch, page, limit, debouncedSearch, department, status]);

  const reloadDoctors = () => {
    dispatch(
      fetchDoctors({
        page: pagination.page,
        limit: pagination.limit,
      }),
    );
  };
  const handleDeleteDoctor = async (id) => {
    // SweetAlert

    const result = await Swal.fire({
      title: "Delete Doctor?",
      text: "You won't be able to recover this record.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await dispatch(deleteDoctorThunk(id));

      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Doctor deleted successfully",
        timer: 1200,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Unable to delete doctor",
      });
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Doctor Management</h2>

          <p className="text-muted mb-0">Manage hospital doctors</p>
        </div>

        <Link to="/admin/doctors/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add Doctor
        </Link>
      </div>

      <DoctorFilters
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

      <DoctorTable
        loading={loading}
        doctors={doctors}
        reloadDoctors={reloadDoctors}
        deleteDoctor={handleDeleteDoctor}
      />

      <TablePagination
        page={pagination?.page || 1}
        totalPages={pagination?.totalPages || 1}
        onPageChange={setPage}
      />
    </div>
  );
};

export default DoctorList;
