import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchVideo } from "../../../redux/thunks/videoThunk";

import VideoDetailCard from "../components/VideoDetailCard";
import VideoPreview from "../components/VideoPreview";

const ViewVideo = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { video, loading } = useSelector((state) => state.video);

  useEffect(() => {
    dispatch(fetchVideo(id));
  }, [dispatch, id]);

  if (loading) {
    return <div className="text-center py-5">Loading...</div>;
  }

  if (!video) {
    return <div className="alert alert-warning">Video not found.</div>;
  }

  return (
    <div className="container-fluid">
      <div className="page-header mb-4">
        <h2>View Video</h2>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <VideoDetailCard video={video} />
        </div>

        <div className="col-lg-4">
          <VideoPreview video={video} />
        </div>
      </div>
    </div>
  );
};

export default ViewVideo;
