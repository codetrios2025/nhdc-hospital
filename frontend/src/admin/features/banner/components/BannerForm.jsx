import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import Swal from "sweetalert2";

import RichTextEditor from "../../../components/common/RichTextEditor";

import createBannerFormData from "../utils/createBannerFormData";

import {
  createBanner,
  updateBanner,
  fetchBanner,
} from "../../../redux/thunks/bannerThunk";

const BannerForm = () => {
  const { id } = useParams();

  const isEdit = Boolean(id);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { banner, loading } = useSelector((state) => state.banner);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      subtitle: "",
      description: "",
      altText: "",

      primaryButtonText: "",
      primaryButtonLink: "",

      secondaryButtonText: "",
      secondaryButtonLink: "",

      displayOrder: 1,

      status: true,
    },
  });

  /*
  |--------------------------------------------------------------------------
  | Image Preview
  |--------------------------------------------------------------------------
  */

  const [desktopPreview, setDesktopPreview] = useState("");

  const [mobilePreview, setMobilePreview] = useState("");

  /*
  |--------------------------------------------------------------------------
  | Load Banner (Edit)
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (isEdit) {
      dispatch(fetchBanner(id));
    }
  }, [dispatch, id, isEdit]);

  /*
  |--------------------------------------------------------------------------
  | Fill Form
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!banner || !isEdit) return;

    reset({
      title: banner.title || "",

      subtitle: banner.subtitle || "",

      description: banner.description || "",

      altText: banner.altText || "",

      primaryButtonText: banner.primaryButtonText || "",

      primaryButtonLink: banner.primaryButtonLink || "",

      secondaryButtonText: banner.secondaryButtonText || "",

      secondaryButtonLink: banner.secondaryButtonLink || "",

      displayOrder: banner.displayOrder || 1,

      status: banner.status,
    });

    setDesktopPreview(banner.desktopImageUrl || "");

    setMobilePreview(banner.mobileImageUrl || "");
  }, [banner, reset, isEdit]);

  /*
  |--------------------------------------------------------------------------
  | Desktop Image
  |--------------------------------------------------------------------------
  */

  const [desktopImage, setDesktopImage] = useState(null);

  const handleDesktopImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Max 10MB
    if (file.size > 10 * 1024 * 1024) {
      Swal.fire({
        icon: "error",
        title: "Image Too Large",
        text: "Desktop image must be less than 10 MB.",
      });

      e.target.value = "";

      return;
    }

    if (!file.type.startsWith("image/")) {
      Swal.fire({
        icon: "error",
        title: "Invalid File",
        text: "Please upload a valid image.",
      });

      e.target.value = "";

      return;
    }

    setDesktopImage(file);

    setDesktopPreview(URL.createObjectURL(file));
  };

  /*
  |--------------------------------------------------------------------------
  | Mobile Image
  |--------------------------------------------------------------------------
  */

  const [mobileImage, setMobileImage] = useState(null);

  const handleMobileImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      Swal.fire({
        icon: "error",
        title: "Image Too Large",
        text: "Mobile image must be less than 10 MB.",
      });

      e.target.value = "";

      return;
    }

    if (!file.type.startsWith("image/")) {
      Swal.fire({
        icon: "error",
        title: "Invalid File",
        text: "Please upload a valid image.",
      });

      e.target.value = "";

      return;
    }

    setMobileImage(file);

    setMobilePreview(URL.createObjectURL(file));
  };

  /*
  |--------------------------------------------------------------------------
  | Submit
  |--------------------------------------------------------------------------
  */

  const onSubmit = async (values) => {
    try {
      const formData = createBannerFormData({
        ...values,
        desktopImage,
        mobileImage,
      });

      if (isEdit) {
        await dispatch(updateBanner(id, formData));

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Banner updated successfully.",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        await dispatch(createBanner(formData));

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Banner created successfully.",
          timer: 1500,
          showConfirmButton: false,
        });
      }

      navigate("/admin/banner");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "Something went wrong.",
      });
    }
  };
  return (
    <div className="container-fluid">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card shadow-sm border-0">
          <div className="card-header bg-white">
            <h4 className="mb-0">{isEdit ? "Edit Banner" : "Create Banner"}</h4>
          </div>

          <div className="card-body">
            <div className="row">
              {/* Title */}

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Banner Title <span className="text-danger">*</span>
                </label>

                <input
                  type="text"
                  className={`form-control ${errors.title ? "is-invalid" : ""}`}
                  {...register("title", {
                    required: "Banner title is required",
                  })}
                />

                {errors.title && (
                  <div className="invalid-feedback">{errors.title.message}</div>
                )}
              </div>

              {/* Subtitle */}

              <div className="col-md-6 mb-3">
                <label className="form-label">Subtitle</label>

                <input
                  type="text"
                  className="form-control"
                  {...register("subtitle")}
                />
              </div>

              {/* Alt Text */}

              <div className="col-md-12 mb-3">
                <label className="form-label">
                  Alt Text
                  <span className="text-danger">*</span>
                </label>

                <input
                  type="text"
                  className={`form-control ${
                    errors.altText ? "is-invalid" : ""
                  }`}
                  {...register("altText", {
                    required: "Alt text is required",
                  })}
                />

                {errors.altText && (
                  <div className="invalid-feedback">
                    {errors.altText.message}
                  </div>
                )}
              </div>

              {/* Description */}

              <div className="col-md-12 mb-4">
                <label className="form-label">Description</label>

                <Controller
                  control={control}
                  name="description"
                  defaultValue=""
                  render={({ field }) => (
                    <RichTextEditor
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Enter banner description..."
                    />
                  )}
                />

                {errors.description && (
                  <small className="text-danger">
                    {errors.description.message}
                  </small>
                )}
              </div>

              {/* Primary Button */}

              <div className="col-md-6 mb-3">
                <label className="form-label">Primary Button Text</label>

                <input
                  type="text"
                  className="form-control"
                  {...register("primaryButtonText")}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Primary Button Link</label>

                <input
                  type="text"
                  className="form-control"
                  {...register("primaryButtonLink")}
                />
              </div>

              {/* Secondary Button */}

              <div className="col-md-6 mb-3">
                <label className="form-label">Secondary Button Text</label>

                <input
                  type="text"
                  className="form-control"
                  {...register("secondaryButtonText")}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Secondary Button Link</label>

                <input
                  type="text"
                  className="form-control"
                  {...register("secondaryButtonLink")}
                />
              </div>

              {/* Display Order */}

              <div className="col-md-3 mb-3">
                <label className="form-label">Display Order</label>

                <input
                  type="number"
                  min="1"
                  className="form-control"
                  {...register("displayOrder")}
                />
              </div>

              {/* Status */}

              <div className="col-md-3 mb-3 d-flex align-items-center">
                <div className="form-check form-switch mt-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    {...register("status")}
                  />

                  <label className="form-check-label">Active</label>
                </div>
              </div>
              {/* Desktop Banner Image */}

              <div className="col-md-6 mb-4">
                <label className="form-label">
                  Desktop Banner
                  {!isEdit && <span className="text-danger">*</span>}
                </label>

                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={handleDesktopImage}
                />

                <small className="text-muted">
                  Recommended Size : 1920 × 800
                </small>

                {desktopPreview && (
                  <div className="mt-3">
                    <img
                      src={desktopPreview}
                      alt="Desktop Banner"
                      className="img-fluid rounded border"
                      style={{
                        maxHeight: "220px",
                        width: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Mobile Banner */}

              <div className="col-md-6 mb-4">
                <label className="form-label">Mobile Banner</label>

                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={handleMobileImage}
                />

                <small className="text-muted">
                  Recommended Size : 768 × 900
                </small>

                {mobilePreview && (
                  <div className="mt-3 text-center">
                    <img
                      src={mobilePreview}
                      alt="Mobile Banner"
                      className="img-fluid rounded border"
                      style={{
                        maxHeight: "300px",
                        maxWidth: "200px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="card-footer bg-white">
            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/admin/banner")}
              >
                <i className="bi bi-arrow-left me-2"></i>
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    ></span>
                    Saving...
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-circle me-2"></i>

                    {isEdit ? "Update Banner" : "Create Banner"}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BannerForm;
