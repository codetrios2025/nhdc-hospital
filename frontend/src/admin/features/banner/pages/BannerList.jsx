import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Modal } from "react-bootstrap";

import Swal from "sweetalert2";

import BannerForm from "../components/BannerForm";
import BannerTable from "../components/BannerTable";
import BannerPreviewModal from "../components/BannerPreviewModal";

import {
  fetchBanners,
  deleteBanner,
  fetchBanner,
} from "../../../redux/thunks/bannerThunk";

const BannerList = () => {
  const dispatch = useDispatch();

  const { banners, loading, pagination } = useSelector((state) => state.banner);

  /*
  |--------------------------------------------------------------------------
  | States
  |--------------------------------------------------------------------------
  */

  const [showForm, setShowForm] = useState(false);

  const [showPreview, setShowPreview] = useState(false);

  const [selectedBanner, setSelectedBanner] = useState(null);

  const [isEdit, setIsEdit] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    page: 1,
    limit: 10,
  });

  const [searchText, setSearchText] = useState("");

  /*
  |--------------------------------------------------------------------------
  | Load Banner List
  |--------------------------------------------------------------------------
  */

  const loadBanners = async (params = filters) => {
    try {
      await dispatch(fetchBanners(params));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "Unable to fetch banners.",
      });
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Initial Load
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    loadBanners();
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Reload On Filter Change
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    loadBanners(filters);
  }, [filters]);
  /*
  |--------------------------------------------------------------------------
  | Search
  |--------------------------------------------------------------------------
  */

  /*
|--------------------------------------------------------------------------
| Debounce Search
|--------------------------------------------------------------------------
*/

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters((prev) => ({
        ...prev,
        search: searchText,
        page: 1,
      }));
    }, 500);

    return () => clearTimeout(timer);
  }, [searchText]);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  /*
  |--------------------------------------------------------------------------
  | Status Filter
  |--------------------------------------------------------------------------
  */

  const handleStatusChange = (event) => {
    setFilters((prev) => ({
      ...prev,
      status: event.target.value,
      page: 1,
    }));
  };

  /*
  |--------------------------------------------------------------------------
  | Pagination
  |--------------------------------------------------------------------------
  */

  const handlePageChange = (page) => {
    setFilters((prev) => ({
      ...prev,
      page,
    }));
  };

  /*
  |--------------------------------------------------------------------------
  | Add Banner
  |--------------------------------------------------------------------------
  */

  const handleAddBanner = () => {
    setSelectedBanner(null);

    setIsEdit(false);

    setShowForm(true);
  };

  /*
  |--------------------------------------------------------------------------
  | Edit Banner
  |--------------------------------------------------------------------------
  */

  const handleEditBanner = async (id) => {
    try {
      const response = await dispatch(fetchBanner(id));

      const banner = response?.data?.data || response?.data || response;

      setSelectedBanner(banner);

      setIsEdit(true);

      setShowForm(true);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "Unable to fetch banner.",
      });
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Preview Banner
  |--------------------------------------------------------------------------
  */

  const handlePreviewBanner = async (id) => {
    try {
      const response = await dispatch(fetchBanner(id));

      const banner = response?.data?.data || response?.data || response;

      setSelectedBanner(banner);

      setShowPreview(true);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "Unable to load preview.",
      });
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Delete Banner
  |--------------------------------------------------------------------------
  */

  const handleDeleteBanner = async (id) => {
    const result = await Swal.fire({
      title: "Delete Banner?",

      text: "This action cannot be undone.",

      icon: "warning",

      showCancelButton: true,

      confirmButtonColor: "#dc3545",

      cancelButtonColor: "#6c757d",

      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      await dispatch(deleteBanner(id));

      Swal.fire({
        icon: "success",

        title: "Deleted",

        text: "Banner deleted successfully.",

        timer: 1500,

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

  /*
  |--------------------------------------------------------------------------
  | Close Form
  |--------------------------------------------------------------------------
  */

  const handleCloseForm = () => {
    setShowForm(false);

    setSelectedBanner(null);

    setIsEdit(false);

    loadBanners(filters);
  };

  /*
  |--------------------------------------------------------------------------
  | Close Preview
  |--------------------------------------------------------------------------
  */

  const handleClosePreview = () => {
    setShowPreview(false);

    setSelectedBanner(null);
  };
  return (
    <>
      <div className="card shadow-sm">
        {/* ====================================================== */}
        {/* Header */}
        {/* ====================================================== */}

        <div className="card-header d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Banner Management</h4>

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleAddBanner}
          >
            <i className="bi bi-plus-circle me-2"></i>
            Add Banner
          </button>
        </div>

        {/* ====================================================== */}
        {/* Filters */}
        {/* ====================================================== */}

        <div className="card-body border-bottom">
          <div className="row g-3">
            {/* Search */}

            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Search Banner..."
                value={searchText}
                onChange={handleSearchChange}
              />
            </div>

            {/* Status */}

            <div className="col-md-3">
              <select
                className="form-select"
                value={filters.status}
                onChange={handleStatusChange}
              >
                <option value="">All Status</option>

                <option value="true">Active</option>

                <option value="false">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* ====================================================== */}
        {/* Table */}
        {/* ====================================================== */}

        <div className="card-body">
          <BannerTable
            banners={banners}
            loading={loading}
            deleteBanner={handleDeleteBanner}
            reloadBanners={loadBanners}
            editBanner={handleEditBanner}
            previewBanner={handlePreviewBanner}
          />
        </div>
      </div>

      {/* ====================================================== */}
      {/* Add / Edit Banner */}
      {/* ====================================================== */}

      <Modal
        show={showForm}
        onHide={handleCloseForm}
        size="xl"
        backdrop="static"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? "Edit Banner" : "Add Banner"}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <BannerForm
            banner={selectedBanner}
            isEdit={isEdit}
            onSuccess={handleCloseForm}
          />
        </Modal.Body>
      </Modal>
      {/* ====================================================== */}
      {/* Preview Banner */}
      {/* ====================================================== */}

      <BannerPreviewModal
        show={showPreview}
        banner={selectedBanner}
        onHide={handleClosePreview}
      />

      {/* ====================================================== */}
      {/* Pagination */}
      {/* ====================================================== */}

      {pagination?.totalPages > 1 && (
        <div className="d-flex justify-content-between align-items-center mt-4">
          <div>
            <small className="text-muted">
              Showing Page <strong>{pagination.page}</strong> of{" "}
              <strong>{pagination.totalPages}</strong>
            </small>
          </div>

          <nav>
            <ul className="pagination mb-0">
              {/* Previous */}

              <li
                className={`page-item ${
                  pagination.page === 1 ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(pagination.page - 1)}
                >
                  Previous
                </button>
              </li>

              {/* Page Numbers */}

              {Array.from(
                {
                  length: pagination.totalPages,
                },
                (_, index) => (
                  <li
                    key={index + 1}
                    className={`page-item ${
                      pagination.page === index + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ),
              )}

              {/* Next */}

              <li
                className={`page-item ${
                  pagination.page === pagination.totalPages ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(pagination.page + 1)}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default BannerList;
