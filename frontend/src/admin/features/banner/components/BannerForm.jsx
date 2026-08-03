import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import Swal from "sweetalert2";

import BannerInfo from "./BannerInfo";
import BannerFeatures from "./BannerFeatures";
import BannerSlides from "./BannerSlides";

import defaultBannerValues from "../utils/defaultBannerValues";
import createBannerFormData from "../utils/createBannerFormData";

import { createBanner, updateBanner } from "../../../redux/thunks/bannerThunk";

const BannerForm = ({ banner = null, isEdit = false, onSuccess }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.banner);

  /*
  |--------------------------------------------------------------------------
  | React Hook Form
  |--------------------------------------------------------------------------
  */

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: defaultBannerValues,
  });

  /*
  |--------------------------------------------------------------------------
  | Load Banner In Edit Mode
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!isEdit || !banner) return;

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

      status: banner.status ?? true,

      /*
      |--------------------------------------------------------------------------
      | Features
      |--------------------------------------------------------------------------
      */

      features: banner.features?.length
        ? banner.features
        : defaultBannerValues.features,

      /*
      |--------------------------------------------------------------------------
      | Slides
      |--------------------------------------------------------------------------
      */

      slides: banner.slides?.length
        ? banner.slides.map((slide) => ({
            _id: slide._id,

            desktopImage: slide.desktopImage,

            mobileImage: slide.mobileImage,

            desktopImageUrl: slide.desktopImageUrl,

            mobileImageUrl: slide.mobileImageUrl,

            desktopPreview: "",

            mobilePreview: "",

            displayOrder: slide.displayOrder,

            status: slide.status,
          }))
        : defaultBannerValues.slides,
    });
  }, [banner, isEdit, reset]);
  /*
  |--------------------------------------------------------------------------
  | Submit Form
  |--------------------------------------------------------------------------
  */

  const onSubmit = async (formValues) => {
    try {
      const formData = createBannerFormData(formValues);

      if (isEdit) {
        await dispatch(updateBanner(banner._id, formData));

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

        reset(defaultBannerValues);
      }

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong.",
      });
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Cancel
  |--------------------------------------------------------------------------
  */

  const handleCancel = () => {
    navigate("/admin/banner");
  };

  /*
  |--------------------------------------------------------------------------
  | Preview Cleanup
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    return () => {
      const slides = watch("slides") || [];

      slides.forEach((slide) => {
        if (slide?.desktopPreview && slide.desktopPreview.startsWith("blob:")) {
          URL.revokeObjectURL(slide.desktopPreview);
        }

        if (slide?.mobilePreview && slide.mobilePreview.startsWith("blob:")) {
          URL.revokeObjectURL(slide.mobilePreview);
        }
      });
    };
  }, [watch]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* ====================================================== */}
      {/* Banner Information */}
      {/* ====================================================== */}

      <BannerInfo
        register={register}
        control={control}
        watch={watch}
        errors={errors}
      />

      {/* ====================================================== */}
      {/* Banner Features */}
      {/* ====================================================== */}

      <BannerFeatures control={control} register={register} errors={errors} />

      {/* ====================================================== */}
      {/* Banner Slides */}
      {/* ====================================================== */}

      <BannerSlides
        control={control}
        register={register}
        watch={watch}
        setValue={setValue}
        errors={errors}
      />

      {/* ====================================================== */}
      {/* Action Buttons */}
      {/* ====================================================== */}

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
              disabled={loading}
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

                  {isEdit ? "Update Banner" : "Save Banner"}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default BannerForm;
