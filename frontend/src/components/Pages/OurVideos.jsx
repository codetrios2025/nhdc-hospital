import React, { useState, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Style from '../CSS/Global.module.css';
import InstaVideo from '../Home/InstaVideo'
import Support from '../Home/Support';
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
    url: "https://www.instagram.com/p/DVREIEZArN3/",
  },{
    title: "Prevention of Seasonal Allergy",
    url: "https://www.instagram.com/p/DZ1whPDJgD_/",
  },{
    title: "ITS/NTS Vaccination Guide",
    url: "https://www.instagram.com/p/DYRZZUZpnp1/",
  },{
    title: "Jaundice in Newborns",
    url: "https://www.instagram.com/p/DW_GN_VAt2b/",
  },{
    title: "Pertussis (Whooping Cough) Vaccination",
    url: "https://www.instagram.com/p/DU78UMBCTRW/",
  },
  {
    title: "Allergy Rhinitis & Asthma ",
    url: "https://www.instagram.com/p/DU0KpmKCe10/",
  },
  {
    title: "BCG Vaccination ",
    url: "https://www.instagram.com/p/DUk9L4zCSmw/",
  },
  {
    title: "Diaper Precautions ",
    url: "https://www.instagram.com/p/DUAp8VPCZxj//",
  },
 
  {
    title: "Newborn Care Tips",
    url: "https://www.instagram.com/p/DZzde87pquI/",
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

    if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(url)) {
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

  return(
    <div className={`${Style.videoSec} ${Style.commonSpace}`}>
      <Container>
        <Row>
          <Col>
            <div className={Style.videoContainer}>
              <div className={"watchVideo " + Style.videoElem}>
                {videos.map((item, index) => {
                  const type = getVideoType(item.url);
                  const videoId = getYoutubeId(item.url);

                  return (
                    <div
                      className={Style.videoItem}
                      key={index}
                    >
                      {/* Instagram */}
                      {type === "instagram" && (
                        <>
                          <InstaVideo data={item.url} />
                          <div className={Style.content}>
                            <h3>{item.title}</h3>
                          </div>
                        </>
                        
                      )}

                      {/* YouTube */}
                      {type === "youtube" && (
                        <>
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
                          <div className={Style.content}>
                            <h3>{item.title}</h3>
                          </div>
                        </>
                      )}

                      {/* MP4 */}
                      {type === "mp4" && (
                        <>
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
                          <div className={Style.content}>
                            <h3>{item.title}</h3>
                          </div>
                        </>
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
  )
}

export default OurVideos;