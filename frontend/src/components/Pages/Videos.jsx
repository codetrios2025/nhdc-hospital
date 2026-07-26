import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Style from '../CSS/Global.module.css';
import BannerImg from '../../assets/images/hospital-slide.webp';
import InstaVideo from "../Home/InstaVideo";
//icon
import OurVideos from "./OurVideos";
import { GoArrowRight } from "react-icons/go";
import { FaPlay } from "react-icons/fa";
import Support from "../Home/Support";
const NHDCVideos = () =>{
  const [activeVideo, setActiveVideo] = useState(null);
  const [videos, setVideos] = useState([]);
  

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
              <OurVideos/>
            </div>
            
          </Col>
        </Row>
      </Container>
      <Support />
    </div>
  )
}

export default NHDCVideos;