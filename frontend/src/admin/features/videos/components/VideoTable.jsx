import { DataTable } from "../../../components/common/DataTable";

import VideoStatusSwitch from "./VideoStatusSwitch";
import VideoFeaturedSwitch from "./VideoFeaturedSwitch";
import VideoActionButtons from "./VideoActionButtons";

const VideoTable = ({
  videos = [],
  loading = false,
  reloadVideos,
  deleteVideo,
}) => {
  const columns = [
    {
      key: "thumbnail",
      label: "Thumbnail",
    },
    {
      key: "title",
      label: "Video",
    },
    {
      key: "type",
      label: "Source",
    },
    {
      key: "category",
      label: "Category",
    },
    {
      key: "featured",
      label: "Featured",
    },
    {
      key: "status",
      label: "Status",
    },
    {
      key: "action",
      label: "Action",
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={videos}
      loading={loading}
      emptyMessage="No videos found."
      renderRow={(video) => (
        <tr key={video._id}>
          <td width="90">
            <img
              src={video.thumbnailUrl || "/default-video.png"}
              alt={video.title}
              width="80"
              height="50"
              className="rounded border"
              style={{
                objectFit: "cover",
              }}
            />
          </td>

          <td>
            <div className="fw-semibold">{video.title}</div>

            <small className="text-muted">{video.shortDescription}</small>
          </td>

          <td>
            <span className="badge bg-primary text-uppercase">
              {video.sourceType}
            </span>
          </td>

          <td>{video.category}</td>

          <td>
            <VideoFeaturedSwitch video={video} onUpdated={reloadVideos} />
          </td>

          <td>
            <VideoStatusSwitch video={video} onUpdated={reloadVideos} />
          </td>

          <td>
            <VideoActionButtons video={video} onDelete={deleteVideo} />
          </td>
        </tr>
      )}
    />
  );
};

export default VideoTable;
