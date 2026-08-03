import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import Loader from "../../../components/common/Loader/Loader";
import NoDataFound from "../../../components/common/NoData/NoData";

import { changeBannerStatus } from "../../../redux/thunks/bannerThunk";

const BannerTable = ({
  banners,
  loading,
  deleteBanner,
  reloadBanners,
  editBanner,
  previewBanner,
}) => {
  const dispatch = useDispatch();

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
    <div className="table-responsive">
      <table className="table table-hover align-middle">
        <thead className="table-light">
          <tr>
            <th width="110">Preview</th>

            <th>Banner</th>

            <th width="100">Slides</th>

            <th width="100">Features</th>

            <th width="90">Order</th>

            <th width="90">Status</th>

            <th width="180" className="text-center">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {banners.map((banner) => {
            const firstSlide = banner.slides?.[0];

            return (
              <tr key={banner._id}>
                {/* Preview */}

                <td>
                  {firstSlide?.desktopImageUrl ? (
                    <img
                      src={firstSlide.desktopImageUrl}
                      alt={banner.title}
                      className="rounded border"
                      style={{
                        width: 90,
                        height: 55,
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <div
                      className="bg-light border rounded d-flex align-items-center justify-content-center"
                      style={{
                        width: 90,
                        height: 55,
                      }}
                    >
                      <i className="bi bi-image text-muted"></i>
                    </div>
                  )}
                </td>

                {/* Title */}

                <td>
                  <div className="fw-semibold">{banner.title}</div>

                  {banner.subtitle && (
                    <small className="text-muted">{banner.subtitle}</small>
                  )}
                </td>

                {/* Slides */}

                <td>
                  <span className="badge bg-primary">
                    {banner.slides?.length || 0}
                  </span>
                </td>

                {/* Features */}

                <td>
                  <span className="badge bg-info">
                    {banner.features?.length || 0}
                  </span>
                </td>

                {/* Order */}

                <td>
                  <span className="badge bg-secondary">
                    {banner.displayOrder}
                  </span>
                </td>

                {/* Status */}

                <td>
                  <div className="form-check form-switch">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={banner.status}
                      onChange={() => handleStatusChange(banner)}
                    />
                  </div>
                </td>

                {/* Action */}

                <td>
                  <div className="btn-group">
                    {/* Preview */}

                    <button
                      type="button"
                      className="btn btn-info btn-sm"
                      title="Preview"
                      onClick={() => previewBanner(banner._id)}
                    >
                      <i className="bi bi-eye"></i>
                    </button>

                    {/* Edit */}

                    <button
                      type="button"
                      className="btn btn-warning btn-sm"
                      title="Edit"
                      onClick={() => editBanner(banner._id)}
                    >
                      <i className="bi bi-pencil"></i>
                    </button>

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
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BannerTable;
