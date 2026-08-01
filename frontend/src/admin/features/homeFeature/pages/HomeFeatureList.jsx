import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Swal from "sweetalert2";

import useDebounce from "../../../hooks/useDebounce";

import {
  fetchHomeFeatures,
  deleteHomeFeature,
} from "../../../redux/thunks/homeFeatureThunk";

import HomeFeatureTable from "../components/HomeFeatureTable";

import HomeFeatureFilters from "../components/HomeFeatureFilters";

import { TablePagination } from "../../../components/common/DataTable";

const HomeFeatureList = () => {
  const dispatch = useDispatch();

  const { homeFeatures, loading, error, pagination } = useSelector(
    (state) => state.homeFeatures,
  );

  console.log("Redux Home Feature State:", {
    homeFeatures,
    loading,
    pagination,
  });

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const [limit, setLimit] = useState(10);

  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    dispatch(
      fetchHomeFeatures({
        page,
        limit,
        keyword: debouncedSearch,
        status,
      }),
    );
  }, [dispatch, page, limit, debouncedSearch, status]);

  const reloadHomeFeatures = () => {
    dispatch(
      fetchHomeFeatures({
        page,
        limit,
        keyword: debouncedSearch,
        status,
      }),
    );
  };

  const handleDeleteHomeFeature = async (id) => {
    const result = await Swal.fire({
      title: "Delete Home Feature?",
      text: "You won't be able to recover this record.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await dispatch(deleteHomeFeature(id));

      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Home Feature deleted successfully.",
        timer: 1200,
        showConfirmButton: false,
      });

      reloadHomeFeatures();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error?.response?.data?.message || "Unable to delete Home Feature.",
      });
    }
  };

  return (
    <div className="container-fluid">
      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Home Feature Management</h2>

          <p className="text-muted mb-0">Manage Homepage Features</p>
        </div>

        <Link to="/admin/home-features/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add Home Feature
        </Link>
      </div>

      {/* Filters */}

      <HomeFeatureFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        limit={limit}
        setLimit={setLimit}
      />

      {/* Error */}

      {error && <div className="alert alert-danger">{error}</div>}

      {/* Table */}

      <HomeFeatureTable
        loading={loading}
        homeFeatures={homeFeatures}
        reloadHomeFeatures={reloadHomeFeatures}
        deleteHomeFeature={handleDeleteHomeFeature}
        page={pagination?.page || 1}
        limit={pagination?.limit || 10}
      />

      {/* Pagination */}

      <TablePagination
        page={pagination?.page || 1}
        totalPages={pagination?.totalPages || 1}
        onPageChange={setPage}
      />
    </div>
  );
};

export default HomeFeatureList;
