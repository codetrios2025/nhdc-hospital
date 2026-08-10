import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Style from '../CSS/Global.module.css';
import parse from 'html-react-parser';
import constants from "../../services/constants";
//icon
import { GoArrowRight } from "react-icons/go";
import { FaStethoscope, FaUserMd, FaSyringe, FaChild, FaHeartbeat } from "react-icons/fa";

import { GiLungs } from "react-icons/gi";
import { LuBaby } from "react-icons/lu";

const OurDoctor = ({ data }) =>{
  const doctorData = data?.data?.[0];
    // console.log(doctorData)
    if (!doctorData) return <p>Loading...</p>;
    
  return(
    <div className={`${Style.doctorSec} ${Style.commonSpace}`}>
      <Container>
        <Row>
          <Col>
            <div className={Style.drConainer}>
              <div className={Style.drImg}>
                <figure>
                  <img src={doctorData?.profileImageUrl} alt="Doctor" />
                  <div className={Style.drExp}>
                    <div className={Style.icon}><FaStethoscope /></div>
                    <p><strong>{doctorData?.experience}+</strong> Years of Experience</p>
                  </div>
                </figure>
              </div>
              <div className={Style.drContent}>
                <h2>{doctorData?.fullName}</h2>
                <p><span>{doctorData?.qualification}</span>
                  <span>{doctorData?.designation}</span></p>
                <div className={Style.description}>
                  {doctorData?.description ? parse(String(doctorData.description)): null}
                 
                </div>
                {/* <ul>
                  <li><div className={Style.icon}><FaUserMd /></div> Child Specialist</li>
                  <li><div className={Style.icon}><GiLungs /></div> Asthma & Respiratory Care</li>
                   <li><div className={Style.icon}><GiLungs /></div> Allergy Treatment</li>
                  <li><div className={Style.icon}><LuBaby /></div> Newborn Care</li>
                </ul> */}
                <a href="about" className={'flexCenter ' + Style.primeryBtn} aria-label="Book an Appointment">
                  Know More About Doctor <div className={Style.icon}><GoArrowRight /></div>
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default OurDoctor