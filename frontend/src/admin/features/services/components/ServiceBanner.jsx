import { useState } from "react";

const ServiceBanner = ({ register, watch, setValue, service }) => {
  const [bannerPreview, setBannerPreview] = useState(null);
  const [mobileBannerPreview, setMobileBannerPreview] = useState(null);

  const bannerImage = watch("bannerImage");
  const bannerMobileImage = watch("bannerMobileImage");

  const handleBannerImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setValue("bannerImage", file);

    setBannerPreview(URL.createObjectURL(file));
  };

  const handleMobileBannerImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setValue("bannerMobileImage", file);

    setMobileBannerPreview(URL.createObjectURL(file));
  };

  return (
    <div className="card mb-4">
      <div className="card-header">
        <h5>Service Banner</h5>
      </div>

      <div className="card-body">
        {/* Banner Image */}

        <div className="mb-4">
          <label className="form-label fw-semibold">Banner Image</label>

          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleBannerImage}
          />

          {(bannerPreview || service?.bannerImageUrl) && (
            <img
              src={bannerPreview || service.bannerImageUrl}
              className="img-fluid rounded border mt-3"
              style={{ maxHeight: 220 }}
            />
          )}
        </div>

        {/* Mobile Banner */}

        <div className="mb-4">
          <label className="form-label fw-semibold">Mobile Banner Image</label>

          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleMobileBannerImage}
          />

          {(mobileBannerPreview || service?.bannerMobileImageUrl) && (
            <img
              src={mobileBannerPreview || service.bannerMobileImageUrl}
              className="img-fluid rounded border mt-3"
              style={{ maxHeight: 220 }}
            />
          )}
        </div>

        {/* Banner Title */}

        <div className="mb-3">
          <label className="form-label">Banner Title</label>

          <input className="form-control" {...register("bannerTitle")} />
        </div>

        {/* Banner Subtitle */}

        <div className="mb-3">
          <label className="form-label">Banner Subtitle</label>

          <input className="form-control" {...register("bannerSubtitle")} />
        </div>

        {/* Banner Description */}

        <div className="mb-3">
          <label className="form-label">Banner Description</label>

          <textarea
            rows={4}
            className="form-control"
            {...register("bannerDescription")}
          />
        </div>

        {/* Button Text */}

        <div className="mb-3">
          <label className="form-label">Banner Button Text</label>

          <input className="form-control" {...register("bannerButtonText")} />
        </div>

        {/* Button Link */}

        <div className="mb-3">
          <label className="form-label">Banner Button Link</label>

          <input
            className="form-control"
            placeholder="/appointment or https://..."
            {...register("bannerButtonLink")}
          />
        </div>

        {/* Open In New Tab */}

        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            {...register("bannerOpenInNewTab")}
          />

          <label className="form-check-label">Open In New Tab</label>
        </div>
      </div>
    </div>
  );
};

export default ServiceBanner;
