import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import { changeBannerStatus } from "../../../redux/thunks/bannerThunk";

import Loader from "../../../components/common/Loader/Loader";

import { useLoaderData } from "react-router-dom";
import NoDataFound from "../../../components/common/NoData/NoData";

import BannerPreviewModal from "./BannerPreviewModal";

const BannerTable = ({ banners, loading, deleteBanner, reloadBanners }) => {
  const dispatch = useDispatch();

  const [previewBanner, setPreviewBanner] = useState(null);

  /*
  |--------------------------------------------------------------------------
  | Change Status
  |--------------------------------------------------------------------------
  */

  const handleStatusChange = async (banner) => {
    try {
      await dispatch(changeBannerStatus(banner._id, !banner.status));

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Banner status updated successfully.",
        timer: 1200,
        showConfirmButton: false,
      });

      reloadBanners();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error?.response?.data?.message || "Unable to update banner status.",
      });
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!banners?.length) {
    return <NoDataFound title="No banners found" />;
  }

  return (
    <>
      <div className="card shadow-sm border-0">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th width="90">Image</th>

                <th>Title</th>

                <th width="120">Display Order</th>

                <th width="130">Status</th>

                <th width="170" className="text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {banners.map((banner) => (
                <tr key={banner._id}>
                  {/* Image */}

                  <td>
                    <img
                      src={banner.desktopImageUrl || "/images/no-image.webp"}
                      alt={banner.title}
                      className="rounded border"
                      style={{
                        width: "80px",
                        height: "55px",
                        objectFit: "cover",
                      }}
                      onError={(e) => {
                        e.target.src = "/images/no-image.webp";
                      }}
                    />
                  </td>

                  {/* Title */}

                  <td>
                    <div className="fw-semibold">{banner.title}</div>

                    {banner.subtitle && (
                      <small className="text-muted">{banner.subtitle}</small>
                    )}
                  </td>

                  {/* Display Order */}

                  <td>
                    <span className="badge bg-secondary">
                      {banner.displayOrder}
                    </span>
                  </td>

                  {/* Status */}

                  <td>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={banner.status}
                        onChange={() => handleStatusChange(banner)}
                      />

                      <label className="form-check-label ms-2">
                        {banner.status ? "Active" : "Inactive"}
                      </label>
                    </div>
                  </td>

                  {/* Actions */}

                  <td className="text-center">
                    <div className="btn-group" role="group">
                      {/* Preview */}

                      <button
                        type="button"
                        className="btn btn-info btn-sm"
                        title="Preview"
                        onClick={() => setPreviewBanner(banner)}
                      >
                        <i className="bi bi-eye"></i>
                      </button>

                      {/* Edit */}

                      <Link
                        to={`/admin/banner/${banner._id}/edit`}
                        className="btn btn-warning btn-sm"
                        title="Edit"
                      >
                        <i className="bi bi-pencil"></i>
                      </Link>

                      {/* Delete */}

                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        title="Delete"
                        onClick={() => deleteBanner(banner._id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Preview Modal */}

      <BannerPreviewModal
        banner={previewBanner}
        onClose={() => setPreviewBanner(null)}
      />
    </>
  );
};

export default BannerTable;
