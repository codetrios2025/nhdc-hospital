import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import HospitalHighlightTable from "../components/HospitalHighlightTable";

import {
  fetchHospitalHighlights,
  deleteHospitalHighlight,
  changeHospitalHighlightStatus,
} from "../../../redux/thunks/hospitalHighlightThunk";

const HospitalHighlightList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { hospitalHighlights, loading } = useSelector(
    (state) => state.hospitalHighlights,
  );

  useEffect(() => {
    dispatch(fetchHospitalHighlights());
  }, [dispatch]);

  /*
  -----------------------------------------
  Edit
  -----------------------------------------
  */

  const handleEdit = (item) => {
    navigate(`/admin/hospital-highlights/${item._id}/edit`);
  };

  /*
  -----------------------------------------
  Delete
  -----------------------------------------
  */

  const handleDelete = async (item) => {
    const result = await Swal.fire({
      title: "Delete Hospital Highlight?",
      text: "This record will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    const response = await dispatch(deleteHospitalHighlight(item._id));

    if (deleteHospitalHighlight.fulfilled.match(response)) {
      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Hospital Highlight deleted successfully.",
      });

      dispatch(fetchHospitalHighlights());
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: response.payload || "Unable to delete Hospital Highlight.",
      });
    }
  };

  /*
  -----------------------------------------
  Status
  -----------------------------------------
  */

  const handleStatusChange = async (id, isActive) => {
    const response = await dispatch(
      changeHospitalHighlightStatus({
        id,
        isActive,
      }),
    );

    if (changeHospitalHighlightStatus.fulfilled.match(response)) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Status updated successfully.",
        timer: 1200,
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: response.payload || "Unable to update status.",
      });
    }
  };

  return (
    <div className="container-fluid">
      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="mb-1">Hospital Highlights</h3>

          <p className="text-muted mb-0">Manage Hospital Highlights.</p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/admin/hospital-highlights/add")}
        >
          <i className="pi pi-plus me-2"></i>
          Add Hospital Highlight
        </button>
      </div>

      {/* Loading */}

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <HospitalHighlightTable
          hospitalHighlights={hospitalHighlights}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
};

export default HospitalHighlightList;
