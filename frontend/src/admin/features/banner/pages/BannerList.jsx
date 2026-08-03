import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import useDebounce from "../../../hooks/useDebounce";

import { fetchBanners, deleteBanner } from "../../../redux/thunks/bannerThunk";

import BannerTable from "../components/BannerTable";

import { TablePagination } from "../../../components/common/DataTable";

const BannerList = () => {
  const dispatch = useDispatch();

  const { banners, loading, error, pagination } = useSelector(
    (state) => state.banner,
  );

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const [limit, setLimit] = useState(10);

  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    loadBanners();
  }, [dispatch, page, limit, debouncedSearch, status]);

  const loadBanners = () => {
    dispatch(
      fetchBanners({
        page,
        limit,
        search: debouncedSearch,
        status,
      }),
    );
  };

  const handleDeleteBanner = async (id) => {
    const result = await Swal.fire({
      title: "Delete Banner?",
      text: "You won't be able to recover this banner.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await dispatch(deleteBanner(id));

      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Banner deleted successfully.",
        timer: 1200,
        showConfirmButton: false,
      });

      loadBanners();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "Unable to delete banner.",
      });
    }
  };

  return (
    <div className="container-fluid">
      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Banner Management</h2>

          <p className="text-muted mb-0">Manage website banners</p>
        </div>

        <Link to="/admin/banner/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add Banner
        </Link>
      </div>

      {/* Filters */}

      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <label className="form-label">Search</label>

              <input
                type="text"
                className="form-control"
                placeholder="Search banner..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">Status</label>

              <select
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">All</option>

                <option value="true">Active</option>

                <option value="false">Inactive</option>
              </select>
            </div>

            <div className="col-md-3">
              <label className="form-label">Per Page</label>

              <select
                className="form-select"
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
              >
                <option value={10}>10</option>

                <option value={25}>25</option>

                <option value={50}>50</option>

                <option value={100}>100</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Error */}

      {error && <div className="alert alert-danger">{error}</div>}

      {/* Table */}

      <BannerTable
        loading={loading}
        banners={banners}
        deleteBanner={handleDeleteBanner}
        reloadBanners={loadBanners}
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

export default BannerList;
