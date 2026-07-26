import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Style from '../CSS/Global.module.css';
import Doctor from '../../assets/images/rajesh.webp';
//icon
import { GoArrowRight } from "react-icons/go";
import { FaStethoscope, FaUserMd, FaSyringe, FaChild, FaHeartbeat } from "react-icons/fa";

import { GiLungs } from "react-icons/gi";
import { LuBaby } from "react-icons/lu";
const OurDoctor = () =>{
  return(
    <div className={`${Style.doctorSec} ${Style.commonSpace}`}>
      <Container>
        <Row>
          <Col>
            <div className={Style.drConainer}>
              <div className={Style.drImg}>
                <figure>
                  <img src={Doctor} alt="Doctor" />
                  <div className={Style.drExp}>
                    <div className={Style.icon}><FaStethoscope /></div>
                    <p><strong>25+</strong> Years of Experience</p>
                  </div>
                </figure>
              </div>
              <div className={Style.drContent}>
                <h2>Dr. Rajesh Jain</h2>
                <p><span>MBBS | D.C.H. | A.A.C. </span>
                  <span> M.I.A.P. | M.I.S.C.C.M. | M.N.N.F.</span>
                  <span>Child specialist and asthma allergy specialist</span></p>
                
                <p>Dr. Rajesh Jain is dedicated to providing comprehensive pediatric healthcare and asthma management services. With years of experience in child healthcare, he focuses on accurate diagnosis, compassionate treatment, and preventive care to ensure the healthy growth and development of every child.</p>
                <ul>
                  <li><div className={Style.icon}><FaUserMd /></div> Child Specialist</li>
                  <li><div className={Style.icon}><GiLungs /></div> Asthma & Respiratory Care</li>
                   <li><div className={Style.icon}><GiLungs /></div> Allergy Treatment</li>
                  <li><div className={Style.icon}><LuBaby /></div> Newborn Care</li>
                  {/* <li><div className={Style.icon}><FaSyringe /></div> Vaccination & Immunization</li>
                  <li><div className={Style.icon}><FaChild /></div> Growth Monitoring</li>
                  <li><div className={Style.icon}><FaHeartbeat /></div> Personalized Patient Care</li> */}
                </ul>
                <a href="nhdc/about" className={'flexCenter ' + Style.primeryBtn} aria-label="Book an Appointment">
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