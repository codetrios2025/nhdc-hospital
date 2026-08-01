  import React, {useState, useEffect, useRef} from "react";
import { Container, Row, Col } from "react-bootstrap";
import Style from '../CSS/Global.module.css';
import BannerImg from '../../assets/images/hospital-slide.webp';
import InstaVideo from "../Home/InstaVideo";
//icon
import { GoArrowRight } from "react-icons/go";
import { FaPlay } from "react-icons/fa";
import Support from "../Home/Support";
//API
import { getVideos } from "../../services/routes.services";

const NHDCVideos = () =>{
  const [activeVideo, setActiveVideo] = useState(null);
  const [videoData, setVideoData] = useState(null);
  const videoRefs = useRef({});

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await getVideos();
        setVideoData(response?.data?.data || []);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    fetchVideos();
  }, []);
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
 
  return(
    <div className={`${Style.videoPage}`}>
      <div className={Style.innerBanner}>
        <img src={BannerImg} alt="Namokar Hospital & Diagnostic Centre" />
      </div>
      <Container>
        <Row>
          <Col>
            <div className={Style.NHDCVideoSec}>
              <h2>Our Videos</h2>
            </div>
          </Col>
        </Row>
      </Container>
      <div className={`${Style.videoSec} ${Style.commonSpace}`}>
        <Container>
          <Row>
            <Col>
              <div className={Style.videoContainer}>
                <div className={"watchVideo " + Style.videoElem}>
                  {videoData?.map((item, index) => {
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
                                src={item.url}
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
      <Support />
    </div>
  )
}

export default NHDCVideos;