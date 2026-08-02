import { Link } from "react-router-dom";
import { Modal, Button, Badge, Table, Row, Col } from "react-bootstrap";

const BannerPreviewModal = ({ banner, onClose }) => {
  if (!banner) return null;

  return (
    <Modal
      show={!!banner}
      onHide={onClose}
      size="xl"
      centered
      scrollable
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="bi bi-image me-2"></i>
          Banner Preview
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row>
          {/* Desktop Banner */}

          <Col md={12} className="mb-4">
            <h5 className="fw-bold mb-3">Desktop Banner</h5>

            <img
              src={banner.desktopImageUrl || "/images/no-image.webp"}
              alt={banner.title}
              className="img-fluid rounded border shadow-sm"
              style={{
                width: "100%",
                maxHeight: "350px",
                objectFit: "cover",
              }}
              onError={(e) => {
                e.target.src = "/images/no-image.webp";
              }}
            />
          </Col>

          {/* Mobile Banner */}

          <Col md={4}>
            <h5 className="fw-bold mb-3">Mobile Banner</h5>

            {banner.mobileImageUrl ? (
              <img
                src={banner.mobileImageUrl}
                alt={banner.title}
                className="img-fluid rounded border shadow-sm"
                style={{
                  maxHeight: "450px",
                  objectFit: "cover",
                }}
                onError={(e) => {
                  e.target.src = "/images/no-image.webp";
                }}
              />
            ) : (
              <div className="alert alert-light border text-center">
                No Mobile Banner Available
              </div>
            )}
          </Col>

          {/* Details */}

          <Col md={8}>
            <Table bordered hover responsive>
              <tbody>
                <tr>
                  <th width="220">Title</th>
                  <td>{banner.title}</td>
                </tr>

                <tr>
                  <th>Subtitle</th>
                  <td>{banner.subtitle || "-"}</td>
                </tr>

                <tr>
                  <th>Alt Text</th>
                  <td>{banner.altText || "-"}</td>
                </tr>

                <tr>
                  <th>Primary Button</th>
                  <td>
                    <strong>{banner.primaryButtonText || "-"}</strong>

                    {banner.primaryButtonLink && (
                      <>
                        <br />

                        <a
                          href={banner.primaryButtonLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {banner.primaryButtonLink}
                        </a>
                      </>
                    )}
                  </td>
                </tr>

                <tr>
                  <th>Secondary Button</th>
                  <td>
                    <strong>{banner.secondaryButtonText || "-"}</strong>

                    {banner.secondaryButtonLink && (
                      <>
                        <br />

                        <a
                          href={banner.secondaryButtonLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {banner.secondaryButtonLink}
                        </a>
                      </>
                    )}
                  </td>
                </tr>

                <tr>
                  <th>Display Order</th>
                  <td>
                    <Badge bg="secondary">{banner.displayOrder}</Badge>
                  </td>
                </tr>

                <tr>
                  <th>Status</th>
                  <td>
                    <Badge bg={banner.status ? "success" : "danger"}>
                      {banner.status ? "Active" : "Inactive"}
                    </Badge>
                  </td>
                </tr>

                <tr>
                  <th>Created At</th>
                  <td>
                    {banner.createdAt
                      ? new Date(banner.createdAt).toLocaleString()
                      : "-"}
                  </td>
                </tr>

                <tr>
                  <th>Updated At</th>
                  <td>
                    {banner.updatedAt
                      ? new Date(banner.updatedAt).toLocaleString()
                      : "-"}
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>

          {/* Description */}

          <Col md={12} className="mt-4">
            <h5 className="fw-bold mb-3">Description</h5>

            <div
              className="border rounded p-3 bg-light"
              dangerouslySetInnerHTML={{
                __html:
                  banner.description || "<p>No description available.</p>",
              }}
            />
          </Col>
        </Row>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          <i className="bi bi-x-circle me-2"></i>
          Close
        </Button>

        <Link
          to={`/admin/banner/${banner._id}/edit`}
          className="btn btn-primary"
          onClick={onClose}
        >
          <i className="bi bi-pencil-square me-2"></i>
          Edit Banner
        </Link>
      </Modal.Footer>
    </Modal>
  );
};

export default BannerPreviewModal;
