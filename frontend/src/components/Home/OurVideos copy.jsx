import React, { useState, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Style from '../CSS/Global.module.css';
import InstaVideo from './InstaVideo'
//icon
import { GoArrowRight } from "react-icons/go";
import { FaPlay } from "react-icons/fa";

const OurVideos = () =>{
  const [activeVideo, setActiveVideo] = useState(null);
  const videoRefs = useRef({});
  const videos = [
  {
    title: "Child Vaccination Guide",
    url: "https://www.instagram.com/p/DaC-GBQJBuU/",
  },
  {
    title: "Asthma Symptoms & Prevention",
    url: "https://www.youtube.com/shorts/Jpm8iQ6M3jA",
  },
  {
    title: "Seasonal Allergy Care Asthma Symptoms & Prevention",
    url: "https://www.youtube.com/shorts/xbccCsr_Z-A",
  },
  {
    title: "Child Vaccination Guide",
    url: "https://www.instagram.com/p/DZ1whPDJgD_/",
  },
  {
    title: "Asthma Symptoms & Prevention",
    url: "https://piccadily.com/themes/piccadily/images/home-banner-02-mobile.mp4",
  },
  {
    title: "Seasonal Allergy Care Asthma Symptoms & Prevention",
    url: "https://www.youtube.com/watch?v=CdyvYAXFzsM",
  },
];
// get youtube id
const getVideoType = (url) => {
  if (!url) return "unknown";
  if (
    url.includes("instagram.com") ||
    url.includes("instagr.am")
  ) {
    return "instagram";
  }
  if (
    url.includes("youtube.com") ||
    url.includes("youtu.be")
  ) {
    return "youtube";
  }
  if (url.match(/\.(mp4|webm|ogg)(\?.*)?$/i)) {
    return "mp4";
  }
  return "unknown";
};

const getYoutubeId = (url) => {
  const regExp =
    /^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|watch\?.+&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[1].length === 11 ? match[1] : null;
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
    <div className={`${Style.videoSec} ${Style.commonSpace}`}>
      <Container>
        <Row>
          <Col>
            <div className={Style.videoContainer}>
              <div className={Style.videoHead}>
                <div>
                  <h2>Watch Our Videos </h2>
                  <p>Stay informed with expert medical guidance, child healthcare advice, and asthma awareness programs</p>
                </div>
                <a href="/videos" className={Style.secondryBtn} aria-label="Call Hospital">View All Videos</a>
              </div>
              <div className={'watchVideo ' + Style.videoElem}>
                {videos.slice(0, 4).map((item, index) =>{
                  const type = getVideoType(item.url);
                  const videoId = getYoutubeId(item.url)
                  return(
                    <div className={Style.videoItem} key={index}>
                      {/* Instagram */}
                      {type === "instagram" && (
                        <InstaVideo data={item.url} />
                      )}
                      {/* Youtube */}
                      {type === "youtube" && (
                        <div className={Style.videoFrame}>
                          {activeVideo === videoId ? (
                            <iframe
                              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`} title={item.title} width="100%" height="100%" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen
                            />
                          ) : (
                            <>
                              <img src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} alt={item.title}/>
                              <button className={Style.playBtn} onClick={() => setActiveVideo(videoId)}>
                                <FaPlay />
                              </button>
                            </>
                          )}
                        </div>
                      )}
                      {/* MP4 */}
                      {type === "mp4" && (
                        <video
                          controls
                          preload="metadata"
                          width="100%"
                          className={Style.videoFrame}
                        >
                          <source src={item.url} type="video/mp4" />
                          Your browser does not support video.
                        </video>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default OurVideos;