import { Link } from "react-router-dom";

const VideoActionButtons = ({ video, onDelete }) => {
  return (
    <div className="btn-group">
      <Link to={`/videos/${video._id}`} className="btn btn-info btn-sm">
        <i className="bi bi-eye"></i>
      </Link>

      <Link to={`/videos/${video._id}/edit`} className="btn btn-warning btn-sm">
        <i className="bi bi-pencil"></i>
      </Link>

      <button
        className="btn btn-danger btn-sm"
        onClick={() => onDelete(video._id)}
      >
        <i className="bi bi-trash"></i>
      </button>
    </div>
  );
};

export default VideoActionButtons;
