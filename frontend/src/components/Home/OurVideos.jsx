import React, { useState } from "react";
import { Container, Row, Col, Modal } from "react-bootstrap";
import Style from "../CSS/Global.module.css";
import InstaVideo from "./InstaVideo";
import { FaPlay } from "react-icons/fa";
import constants from "../../services/constants";
import videoThumb from '../../assets/images/video_thumb.webp';
const OurVideos = ({ data }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const allVideo = data || [];

  // video type
  const getVideoType = (item) => {
    if (!item) return "unknown";

    const videoUrl =
      item.youtubeUrl ||
      item.externalUrl ||
      item.url ||
      "";

    const sourceType = item.sourceType?.toLowerCase();

    if (
      sourceType === "youtube" ||
      videoUrl.includes("youtube.com") ||
      videoUrl.includes("youtu.be")
    ) {
      return "youtube";
    }

    if (
      sourceType === "instagram" ||
      videoUrl.includes("instagram.com") ||
      videoUrl.includes("instagr.am")
    ) {
      return "instagram";
    }

    if (
      sourceType === "mp4" ||
      /\.(mp4|webm|ogg)(\?.*)?$/i.test(videoUrl) ||
      item.videoPath ||
      item.videoFile
    ) {
      return "mp4";
    }

    return "unknown";
  };

  // Get YouTube ID

  const getYoutubeId = (url) => {
    if (!url) return null;

    try {
      const parsed = new URL(url);

      // YouTube Shorts
      if (parsed.pathname.startsWith("/shorts/")) {
        return parsed.pathname.split("/")[2];
      }

      // YouTube Watch
      if (parsed.searchParams.get("v")) {
        return parsed.searchParams.get("v");
      }

      // youtu.be
      if (parsed.hostname === "youtu.be") {
        return parsed.pathname.slice(1);
      }

      // YouTube Embed
      if (parsed.pathname.startsWith("/embed/")) {
        return parsed.pathname.split("/")[2];
      }

      return null;
    } catch {
      return null;
    }
  };

  // Get thumbnail
  const getThumbnail = (item, type) => {
  // YouTube thumbnail
  if (type === "youtube") {
    const youtubeUrl =
      item?.youtubeUrl ||
      item?.externalUrl ||
      item?.url;

    const videoId = getYoutubeId(youtubeUrl);

    if (videoId) {
      return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
    }
  }

  // Instagram thumbnail
  if (type === "instagram" && item?.thumbnail) {
    return `${constants.Image_BASE_URL}/videos/thumbnails/${item.thumbnail}`;
  }

  // MP4 thumbnail
  if (type === "mp4" && item?.thumbnail) {
    return `${constants.Image_BASE_URL}/videos/thumbnails/${item.thumbnail}`;
  }

  // Dummy image
  return videoThumb;
};

  // Open popup

  const handleVideoOpen = (item) => {
    const type = getVideoType(item);

    const youtubeUrl =
      item.youtubeUrl ||
      item.externalUrl ||
      item.url;

    const videoId =
      type === "youtube"
        ? getYoutubeId(youtubeUrl)
        : null;

    setSelectedVideo({
      item,
      type,
      videoId,
    });
  };

  // Close popup
  
  const handleVideoClose = () => {
    setSelectedVideo(null);
  };

  return (
    <div className={`${Style.videoSec} ${Style.commonSpace}`}>
      <Container>
        <Row>
          <Col>
            <div className={Style.videoHead}>
              <div>
                <h2>Watch Our Videos</h2>
                <p>Stay informed with expert medical guidance, child healthcare advice, and asthma awareness programs.</p>
              </div>

              <div>
                <a href="/videos" className={Style.secondryBtn}>View All Videos</a>
              </div>
            </div>

            <div className={"watchVideo " + Style.videoElem}>
              {allVideo?.slice(0, 4)?.map((item, index) => {
                const type = getVideoType(item);
                const youtubeUrl = item.youtubeUrl || item.externalUrl || item.url;
                const videoId = type === "youtube" ? getYoutubeId(youtubeUrl) : null;
                const thumbnail = getThumbnail(item, type);

                return (
                  <div className={Style.videoItem} key={item.id || index}>
                    <div className={Style.videoFrame} onClick={() => handleVideoOpen(item)}>
                      <img
                        src={thumbnail}
                        alt={item.title || "Namokar Hospital Video"}
                        loading="lazy"
                        decoding="async"
                        width="640"
                        height="360"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = videoThumb;
                        }}
                      />
                      {/* Play button */}
                      <div className={Style.playBtn}>
                      <button type="button" aria-label={`Play ${item.title || "video"}`}>
                        <FaPlay />
                      </button>
                      </div>
                    </div>

                    {item.title && (
                      <h3 className={Style.videoTitle}>
                        {item.title}
                      </h3>
                    )}
                  </div>
                );
              })}
            </div>
          </Col>
        </Row>
      </Container>

      {/* Video Popup */}
      <Modal show={!!selectedVideo} onHide={handleVideoClose} centered size="xs" className={Style.videoModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedVideo?.item?.title || "Video"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="p-0">
          {/* YOUTUBE */}
          {selectedVideo?.type === "youtube" &&
            selectedVideo?.videoId && (
              <div className={Style.popupVideo}>
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1&rel=0`}
                  title={selectedVideo.item?.title || "YouTube video"}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            )}

          {/* INSTAGRAM */}
          {selectedVideo?.type === "instagram" && (
            <div className={Style.popupVideo}>
              <InstaVideo
                data={selectedVideo.item?.externalUrl}
              />
            </div>
          )}

          {/* MP4 Video */}
          {selectedVideo?.type === "mp4" && (
            <div className={Style.popupVideo}>
              <video controls autoPlay playsInline preload="metadata" width="100%" height="100%">
                <source src={constants.File_BASE_URL + "/videos/files/" + selectedVideo.item?.videoFile} type="video/mp4"/>
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default OurVideos;

