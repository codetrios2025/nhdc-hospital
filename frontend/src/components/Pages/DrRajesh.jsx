import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Style from "../CSS/Global.module.css";
import BannerImg from "../../assets/images/hospital-slide.webp";
import serviceImg01 from "../../assets/images/namokar_img01.webp";
import Support from "../Home/Support";
import OurDoctor from "./AboutOurDoctor";
import parse from "html-react-parser";
//icon
import {
  FaCheckCircle,
  FaBullseye,
  FaEye,
  FaHandshake,
  FaAmbulance,
} from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaUserDoctor } from "react-icons/fa6";
import { MdFamilyRestroom } from "react-icons/md";
import { MdEmergency } from "react-icons/md";
import { IoDiamond } from "react-icons/io5";
import { MdChildCare } from "react-icons/md";
import { ImLab } from "react-icons/im";
import { BsUmbrellaFill } from "react-icons/bs";

//API
import { getHighlightsData } from "../../services/routes.services";
import SEO from "../Common/SEO";

const DrRajesh = () => {
  const [highlightData, setHighlightData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getHighlightsData();
        setHighlightData(res?.data?.data || null);
      } catch (error) {
        console.error("Error fetching service:", error);
      }
    };
    fetchData();
  }, []);
  // console.log(highlightData);
  return (
    <>
      <SEO
  title="Dr. Rajesh Jain - Pediatrician in Deoli | Namokar Hospital"
  description="Meet Dr. Rajesh Jain, a renowned pediatrician at Namokar Hospital & Diagnostic Centre in Deoli, offering exceptional child healthcare services."
  keywords="Dr. Rajesh Jain, pediatrician Deoli, child specialist Deoli, Namokar Hospital Deoli,Namokar Hospital Deoli Tonk, pediatric care Deoli"
  canonical="https://namokarhospitaldeoli.com/doctor/rajesh-jain"
/>
      <div className={Style.aboutPage}>
        <div className={Style.innerBanner}>
          <img src={BannerImg} alt="Namokar Hospital & Diagnostic Centre" />
           <div className={Style.content}>
                      <Container>
                        <Row>
                          <Col>
                          <div className={Style.box}>
                              <h1>Dr. Rajesh Jain</h1>
                              <p>Dr. Rajesh Jain is a highly qualified and experienced pediatrician with over 25 years of expertise in providing comprehensive child healthcare services, asthma management, allergy care and preventive care.</p>
                          </div>
                          </Col>
                        </Row>
                      </Container>
                    </div>
        </div>
        <OurDoctor />
        
       
       
        <Support />
      </div>
    </>
  );
};

export default DrRajesh;
