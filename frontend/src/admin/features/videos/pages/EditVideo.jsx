import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import VideoForm from "../components/VideoForm";
import { fetchVideo } from "../../../redux/thunks/videoThunk";

const EditVideo = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchVideo(id));
  }, [dispatch, id]);

  return (
    <div className="container-fluid">
      <div className="page-header mb-4">
        <h2>Edit Video</h2>

        <p className="text-muted">Update video information.</p>
      </div>

      <VideoForm videoId={id} />
    </div>
  );
};

export default EditVideo;
