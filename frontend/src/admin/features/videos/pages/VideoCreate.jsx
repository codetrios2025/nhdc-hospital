import VideoForm from "../components/VideoForm";

const VideoCreate = () => {
  return (
    <div className="container-fluid">
      <div className="mb-4">
        <h2 className="fw-bold">Add Video</h2>

        <p className="text-muted">Create website video.</p>
      </div>

      <VideoForm />
    </div>
  );
};

export default VideoCreate;
