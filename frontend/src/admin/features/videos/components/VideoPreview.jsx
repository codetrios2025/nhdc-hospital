const VideoPreview = ({ video }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h5>Preview</h5>
      </div>

      <div className="card-body">
        {video.thumbnailUrl && (
          <img
            src={video.thumbnailUrl}
            className="img-fluid rounded mb-3"
            alt=""
          />
        )}

        {video.sourceType === "upload" && video.videoUrl && (
          <video controls width="100%">
            <source src={video.videoUrl} />
          </video>
        )}

        {video.sourceType === "youtube" && video.youtubeUrl && (
          <iframe
            width="100%"
            height="220"
            src={video.youtubeUrl}
            title={video.title}
            allowFullScreen
          />
        )}

        {video.sourceType === "url" && video.externalUrl && (
          <video controls width="100%">
            <source src={video.externalUrl} />
          </video>
        )}

        {video.sourceType === "embed" && (
          <div
            dangerouslySetInnerHTML={{
              __html: video.embedCode,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default VideoPreview;
