import { Controller } from "react-hook-form";

import RichTextEditor from "../../../components/common/RichTextEditor";

const BannerInfo = ({ register, control, watch, errors }) => {
  return (
    <>
      {/* ====================================================== */}
      {/* Banner Information */}
      {/* ====================================================== */}

      <div className="card mb-4 shadow-sm">
        <div className="card-header">
          <h5 className="mb-0">Banner Information</h5>
        </div>

        <div className="card-body">
          <div className="row g-4">
            {/* Title */}

            <div className="col-md-6">
              <label className="form-label">
                Banner Title
                <span className="text-danger">*</span>
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Enter banner title"
                {...register("title")}
              />
            </div>

            {/* Subtitle */}

            <div className="col-md-6">
              <label className="form-label">Subtitle</label>

              <input
                type="text"
                className="form-control"
                placeholder="Enter subtitle"
                {...register("subtitle")}
              />
            </div>

            {/* Alt Text */}

            <div className="col-md-12">
              <label className="form-label">Alt Text</label>

              <input
                type="text"
                className="form-control"
                placeholder="Banner image alt text"
                {...register("altText")}
              />
            </div>

            {/* Description */}

            <div className="col-md-12">
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
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================== */}
      {/* Buttons */}
      {/* ====================================================== */}

      <div className="card mb-4 shadow-sm">
        <div className="card-header">
          <h5 className="mb-0">Banner Buttons</h5>
        </div>

        <div className="card-body">
          <div className="row g-4">
            {/* Primary Button */}

            <div className="col-md-6">
              <label className="form-label">Primary Button Text</label>

              <input
                type="text"
                className="form-control"
                placeholder="Book Appointment"
                {...register("primaryButtonText")}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Primary Button Link</label>

              <input
                type="text"
                className="form-control"
                placeholder="/appointment"
                {...register("primaryButtonLink")}
              />
            </div>

            {/* Secondary Button */}

            <div className="col-md-6">
              <label className="form-label">Secondary Button Text</label>

              <input
                type="text"
                className="form-control"
                placeholder="Call Now"
                {...register("secondaryButtonText")}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Secondary Button Link</label>

              <input
                type="text"
                className="form-control"
                placeholder="tel:+919999999999"
                {...register("secondaryButtonLink")}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================== */}
      {/* Settings */}
      {/* ====================================================== */}

      <div className="card mb-4 shadow-sm">
        <div className="card-header">
          <h5 className="mb-0">Banner Settings</h5>
        </div>

        <div className="card-body">
          <div className="row g-4">
            {/* Display Order */}

            <div className="col-md-4">
              <label className="form-label">Display Order</label>

              <input
                type="number"
                min="1"
                className="form-control"
                {...register("displayOrder", {
                  valueAsNumber: true,
                })}
              />
            </div>

            {/* Status */}

            <div className="col-md-4 d-flex align-items-end">
              <div className="form-check form-switch">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="bannerStatus"
                  checked={watch("status")}
                  {...register("status")}
                />

                <label className="form-check-label" htmlFor="bannerStatus">
                  Active Banner
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BannerInfo;
