const VideoDetailCard = ({ video }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h5>Video Details</h5>
      </div>

      <div className="card-body">
        <table className="table">
          <tbody>
            <tr>
              <th width="180">Title</th>

              <td>{video.title}</td>
            </tr>

            <tr>
              <th>Category</th>

              <td>{video.category || "-"}</td>
            </tr>

            <tr>
              <th>Source Type</th>

              <td>
                <span className="badge bg-primary">{video.sourceType}</span>
              </td>
            </tr>

            <tr>
              <th>Status</th>

              <td>
                {video.isActive ? (
                  <span className="badge bg-success">Active</span>
                ) : (
                  <span className="badge bg-danger">Inactive</span>
                )}
              </td>
            </tr>

            <tr>
              <th>Featured</th>

              <td>
                {video.featured ? (
                  <span className="badge bg-success">Yes</span>
                ) : (
                  <span className="badge bg-secondary">No</span>
                )}
              </td>
            </tr>

            <tr>
              <th>Duration</th>

              <td>{video.duration || "-"}</td>
            </tr>

            <tr>
              <th>Short Description</th>

              <td>{video.shortDescription || "-"}</td>
            </tr>

            <tr>
              <th>Description</th>

              <td>{video.description || "-"}</td>
            </tr>

            <tr>
              <th>Meta Title</th>

              <td>{video.metaTitle || "-"}</td>
            </tr>

            <tr>
              <th>Meta Description</th>

              <td>{video.metaDescription || "-"}</td>
            </tr>

            <tr>
              <th>Meta Keywords</th>

              <td>{video.metaKeywords || "-"}</td>
            </tr>

            <tr>
              <th>Created</th>

              <td>
                {video.createdAt
                  ? new Date(video.createdAt).toLocaleString()
                  : "-"}
              </td>
            </tr>

            <tr>
              <th>Updated</th>

              <td>
                {video.updatedAt
                  ? new Date(video.updatedAt).toLocaleString()
                  : "-"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VideoDetailCard;
