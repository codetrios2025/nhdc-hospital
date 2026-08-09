import React, { useState, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Style from "../CSS/Global.module.css";
import InstaVideo from "./InstaVideo";
import { FaPlay } from "react-icons/fa";

const OurVideos = ({data}) => {
  const [activeVideo, setActiveVideo] = useState(null);
  const videoRefs = useRef({});
  const allVideo = data;

  const getVideoType = (item) => {
    if (!item) return "unknown";
    // Standardize URL check from multiple potential properties
    const videoUrl = item.youtubeUrl || item.externalUrl || item.url || "";
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
      item.videoPath
    ) {
      return "mp4";
    }

    return "unknown";
  };

  const getYoutubeId = (url) => {
    if (!url) return null;

    try {
      const parsed = new URL(url);

      // Shorts
      if (parsed.pathname.startsWith("/shorts/")) {
        return parsed.pathname.split("/")[2];
      }

      // Watch
      if (parsed.searchParams.get("v")) {
        return parsed.searchParams.get("v");
      }

      // youtu.be
      if (parsed.hostname === "youtu.be") {
        return parsed.pathname.slice(1);
      }

      // Embed
      if (parsed.pathname.startsWith("/embed/")) {
        return parsed.pathname.split("/")[2];
      }

      return null;
    } catch {
      return null;
    }
  };

  const handleMp4PlayPause = (index) => {
    const video = videoRefs.current[index];

    if (!video) return;

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  return (
    <div className={`${Style.videoSec} ${Style.commonSpace}`}>
      <Container>
        <Row>
          <Col>
            <div className={Style.videoContainer}>
              <div className={Style.videoHead}>
                <div>
                  <h2>Watch Our Videos</h2>
                  <p>Stay informed with expert medical guidance, child healthcare advice, and asthma awareness programs.</p>
                </div>
                <a href="/videos" className={Style.secondryBtn}>View All Videos</a>
              </div>

              <div className={"watchVideo " + Style.videoElem}>
                {allVideo?.slice(0, 4).map((item, index) => {
                  const type = getVideoType(item);
                  const youtubeLink = item.youtubeUrl || item.externalUrl || item.url;
                  const videoId = getYoutubeId(youtubeLink);
                  return (
                    <div className={Style.videoItem} key={index}>
                      {/* Instagram */}
                      {type === "instagram" && (
                        <InstaVideo data={item.externalUrl} />
                      )}

                      {/* YouTube */}
                      {type === "youtube" && videoId && (
                        <div className={Style.videoFrame}>
                          {activeVideo === videoId ? (
                            <iframe
                              width="100%"
                              height="100%"
                              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                              title={item.title}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          ) : (
                            <>
                              <img
                                src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
                                alt={item.title}
                                onError={(e) => {
                                  e.target.src = `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`;
                                }}
                              />

                              <button
                                className={Style.playBtn}
                                onClick={() =>
                                  setActiveVideo(videoId)
                                }
                              >
                                <FaPlay />
                              </button>
                            </>
                          )}
                        </div>
                      )}

                      {/* MP4 */}
                      {type === "mp4" && (
                        <div className={Style.videoFrame}>
                          <video
                            ref={(el) =>
                              (videoRefs.current[index] = el)
                            }
                            controls
                            preload="metadata"
                            width="100%"
                          >
                            <source
                              src={item.videoFileUrl}
                              type="video/mp4"
                            />
                          </video>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default OurVideos;