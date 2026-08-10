import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

import {
  fetchVideos,
  deleteVideo as deleteVideoThunk,
} from "../../../redux/thunks/videoThunk";

import VideoTable from "../components/VideoTable";
import VideoFilters from "../components/VideoFilters";

import useDebounce from "../../../hooks/useDebounce";

import Swal from "sweetalert2";

const VideoList = () => {
  const dispatch = useDispatch();

  const { videos, loading, error, pagination } = useSelector(
    (state) => state.video,
  );

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const debouncedSearch = useDebounce(search, 500);

  /*
  |--------------------------------------------------------------------------
  | Fetch Videos
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    dispatch(
      fetchVideos({
        page,
        limit,
        search: debouncedSearch,
        status,
      }),
    );
  }, [dispatch, page, limit, debouncedSearch, status]);

  /*
  |--------------------------------------------------------------------------
  | Reset Page When Search / Filter Changes
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, status]);

  /*
  |--------------------------------------------------------------------------
  | Reload
  |--------------------------------------------------------------------------
  */

  const reloadVideos = () => {
    dispatch(
      fetchVideos({
        page,
        limit,
        search: debouncedSearch,
        status,
      }),
    );
  };

  /*
  |--------------------------------------------------------------------------
  | Delete
  |--------------------------------------------------------------------------
  */

  const handleDeleteVideo = async (id) => {
    const result = await Swal.fire({
      title: "Delete Video?",
      text: "You won't be able to recover this record.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await dispatch(deleteVideoThunk(id)).unwrap();

      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Video deleted successfully",
        timer: 1200,
        showConfirmButton: false,
      });

      reloadVideos();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.message || error || "Unable to delete video",
      });
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Page Change
  |--------------------------------------------------------------------------
  */

  const handlePageChange = (newPage) => {
    if (newPage < 1) return;

    if (pagination?.totalPages && newPage > pagination.totalPages) {
      return;
    }

    setPage(newPage);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /*
  |--------------------------------------------------------------------------
  | Limit Change
  |--------------------------------------------------------------------------
  */

  const handleLimitChange = (newLimit) => {
    setLimit(Number(newLimit));
    setPage(1);
  };

  /*
  |--------------------------------------------------------------------------
  | Pagination Values
  |--------------------------------------------------------------------------
  */

  const currentPage = pagination?.page || page;

  const totalPages = pagination?.totalPages || 0;

  const totalRecords = pagination?.total || 0;

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  return (
    <div className="container-fluid">
      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="mb-1">Video Management</h3>

          <p className="text-muted mb-0">Manage website videos.</p>
        </div>

        <Link className="btn btn-primary" to="/admin/videos/create">
          <i className="bi bi-plus-circle me-2"></i>
          Add Video
        </Link>
      </div>

      {/* Filters */}

      <VideoFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        limit={limit}
        setLimit={handleLimitChange}
      />

      {/* Error */}

      {error && <div className="alert alert-danger">{error}</div>}

      {/* Table */}

      <VideoTable
        loading={loading}
        videos={videos}
        reloadVideos={reloadVideos}
        deleteVideo={handleDeleteVideo}
      />

      {/* Pagination */}

      {!loading && totalRecords > 0 && (
        <div className="card mt-3">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
              {/* Record Information */}

              <div className="text-muted">
                Showing <strong>{(currentPage - 1) * limit + 1}</strong> to{" "}
                <strong>{Math.min(currentPage * limit, totalRecords)}</strong>{" "}
                of <strong>{totalRecords}</strong> videos
              </div>

              {/* Pagination */}

              {totalPages > 1 && (
                <nav>
                  <ul className="pagination mb-0">
                    {/* Previous */}

                    <li
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <button
                        type="button"
                        className="page-link"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>
                    </li>

                    {/* Page Numbers */}

                    {Array.from(
                      { length: totalPages },
                      (_, index) => index + 1,
                    ).map((pageNumber) => (
                      <li
                        key={pageNumber}
                        className={`page-item ${
                          currentPage === pageNumber ? "active" : ""
                        }`}
                      >
                        <button
                          type="button"
                          className="page-link"
                          onClick={() => handlePageChange(pageNumber)}
                        >
                          {pageNumber}
                        </button>
                      </li>
                    ))}

                    {/* Next */}

                    <li
                      className={`page-item ${
                        currentPage === totalPages ? "disabled" : ""
                      }`}
                    >
                      <button
                        type="button"
                        className="page-link"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              )}
            </div>
          </div>
        </div>
      )}

      {/* No Records */}

      {!loading && totalRecords === 0 && (
        <div className="alert alert-info mt-3">No videos found.</div>
      )}
    </div>
  );
};

export default VideoList;
