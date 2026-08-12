  import React, {useState, useEffect, useRef} from "react";
import { Container, Row, Col, Modal } from "react-bootstrap";
import Style from '../CSS/Global.module.css';
import BannerImg from '../../assets/images/hospital-slide.webp';
import InstaVideo from "../Home/InstaVideo";
import Loader from "../Common/Loader";
//icon
import { GoArrowRight } from "react-icons/go";
import { FaPlay } from "react-icons/fa";
import Support from "../Home/Support";
//API
import { getVideos } from "../../services/routes.services";
import { Helmet } from "react-helmet-async";
import constants from "../../services/constants";
import videoThumb from '../../assets/images/video_thumb.webp';
import SEO from "../Common/SEO";
const NHDCVideos = () =>{
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoData, setVideoData] = useState(null);
  const videoRefs = useRef({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await getVideos();
        setVideoData(response?.data?.data || []);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally{
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);
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
 
  return(
    <>
     <SEO
  title="Videos at Namokar Hospital & Diagnostic Centre | Hospital Deoli"
  description="Watch our videos to learn more about the medical services offered at Namokar Hospital & Diagnostic Centre in Deoli, including pediatric care, diagnostics, and specialized treatments,deoli."
  keywords="Namokar Hospital Deoli, medical services Deoli, pediatric services Deoli, diagnostic services Deoli, child healthcare Deoli, hospital services Deoli, best doctor in deoli, child specialist in deoli"
  canonical="https://namokarhospitaldeoli.com/videos"
/>
      
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
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <Support />
      </div>
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
    </>
  )
}

export default NHDCVideos;