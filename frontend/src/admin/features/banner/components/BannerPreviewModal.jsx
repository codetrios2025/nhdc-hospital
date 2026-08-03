import { Modal, Carousel, Badge } from "react-bootstrap";

const BannerPreviewModal = ({ show, onHide, banner }) => {
  if (!banner) return null;

  const slides = banner.slides || [];

  const features = banner.features || [];

  return (
    <Modal show={show} onHide={onHide} size="xl" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title>Banner Preview</Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-0">
        {/* ========================================= */}
        {/* Banner Slider */}
        {/* ========================================= */}

        {slides.length > 0 ? (
          <Carousel
            indicators={slides.length > 1}
            controls={slides.length > 1}
            interval={3000}
          >
            {slides.map((slide, index) => (
              <Carousel.Item key={slide._id || index}>
                <div
                  style={{
                    position: "relative",

                    height: "500px",

                    overflow: "hidden",
                  }}
                >
                  <img
                    src={slide.desktopImageUrl}
                    alt={banner.altText || banner.title}
                    className="w-100 h-100"
                    style={{
                      objectFit: "cover",
                    }}
                  />

                  {/* Overlay */}

                  <div
                    style={{
                      position: "absolute",

                      top: 0,

                      left: 0,

                      width: "100%",

                      height: "100%",

                      background: "rgba(0,0,0,.45)",

                      display: "flex",

                      alignItems: "center",
                    }}
                  >
                    <div className="container text-white">
                      {/* Title */}

                      <h1 className="display-5 fw-bold">{banner.title}</h1>

                      {/* Subtitle */}

                      {banner.subtitle && (
                        <h4 className="mb-4 text-light">{banner.subtitle}</h4>
                      )}

                      {/* Description */}

                      {banner.description && (
                        <div
                          className="mb-4"
                          dangerouslySetInnerHTML={{
                            __html: banner.description,
                          }}
                        />
                      )}
                      {/* ========================================= */}
                      {/* Buttons */}
                      {/* ========================================= */}

                      <div className="d-flex flex-wrap gap-3 mb-4">
                        {banner.primaryButtonText && (
                          <button
                            type="button"
                            className="btn btn-primary btn-lg"
                          >
                            {banner.primaryButtonText}
                          </button>
                        )}

                        {banner.secondaryButtonText && (
                          <button
                            type="button"
                            className="btn btn-outline-light btn-lg"
                          >
                            {banner.secondaryButtonText}
                          </button>
                        )}
                      </div>

                      {/* ========================================= */}
                      {/* Features */}
                      {/* ========================================= */}

                      {features.length > 0 && (
                        <div className="d-flex flex-wrap gap-2">
                          {features.map((feature, featureIndex) => (
                            <Badge
                              key={feature._id || featureIndex}
                              bg="light"
                              text="dark"
                              className="px-3 py-2 fs-6"
                            >
                              {feature.icon && (
                                <i className={`${feature.icon} me-2`}></i>
                              )}

                              {feature.title}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <div className="text-center py-5">
            <h5>No Slides Available</h5>

            <p className="text-muted mb-0">No banner slides have been added.</p>
          </div>
        )}

        {/* ========================================= */}
        {/* Banner Information */}
        {/* ========================================= */}

        <div className="p-4 border-top bg-light">
          <div className="row">
            <div className="col-md-4">
              <strong>Display Order</strong>

              <div>{banner.displayOrder}</div>
            </div>

            <div className="col-md-4">
              <strong>Status</strong>

              <div>
                {banner.status ? (
                  <Badge bg="success">Active</Badge>
                ) : (
                  <Badge bg="secondary">Inactive</Badge>
                )}
              </div>
            </div>

            <div className="col-md-4">
              <strong>Total Slides</strong>

              <div>{slides.length}</div>
            </div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <button type="button" className="btn btn-secondary" onClick={onHide}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default BannerPreviewModal;