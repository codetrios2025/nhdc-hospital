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

  //const { videos, loading, error } = useSelector((state) => state.video);

  const { videos, loading, error, pagination } = useSelector(
    (state) => state.video,
  );

  const [search, setSearch] = useState("");

  //const [department, setDepartment] = useState("");

  const [status, setStatus] = useState("");

  const [page, setPage] = useState(1);

  const [limit, setLimit] = useState(10);

  const debouncedSearch = useDebounce(search, 500);

  // useEffect(() => {
  //   dispatch(fetchVideos());
  // }, []);

  // useEffect(() => {
  //   dispatch(fetchVideos());
  // }, [dispatch]);

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

  const reloadVideos = () => {
    dispatch(
      fetchVideos({
        page: pagination.page,
        limit: pagination.limit,
      }),
    );
  };

  const handleDeleteVideo = async (id) => {
    // SweetAlert

    const result = await Swal.fire({
      title: "Delete Video?",
      text: "You won't be able to recover this record.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await dispatch(deleteVideoThunk(id));

      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Video deleted successfully",
        timer: 1200,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Unable to delete video",
      });
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between mb-4">
        <div>
          <h2 className="fw-bold">Video Management</h2>

          <p className="text-muted">Manage website videos.</p>
        </div>

        <Link className="btn btn-primary" to="/videos/create">
          <i className="bi bi-plus-circle me-2"></i>
          Add Video
        </Link>
      </div>

      <VideoFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        limit={limit}
        setLimit={setLimit}
      />

      {error && <div className="alert alert-danger">{error}</div>}

      <VideoTable loading={loading} videos={videos} />
    </div>
  );
};

export default VideoList;
