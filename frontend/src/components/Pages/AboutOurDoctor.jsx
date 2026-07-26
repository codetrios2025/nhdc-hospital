import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Style from '../CSS/Global.module.css';
import Doctor from '../../assets/images/drrajesh.webp';
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
                  {/* <div className={Style.drExp}>
                    <div className={Style.icon}><FaStethoscope /></div>
                    <p><strong>25+</strong> Years of Experience</p>
                  </div> */}
                </figure>
              </div>
             <div className={Style.drContent}>
                <h2>Dr. Rajesh Jain</h2>

                <p>
                  <span>MBBS | D.C.H. | A.A.C. </span>
                  <span> M.I.A.P. | M.I.S.C.C.M. | M.N.N.F.</span>
                   
                </p>

                <p>
                  <strong>
                    Child Specialist | Asthma & Allergy Specialist | Newborn & Pediatric Care
                  </strong>
                </p>

                <p>
                  With over <strong>25+ years of clinical experience</strong>, Dr. Rajesh
                  Jain has been dedicated to providing compassionate and evidence-based
                  healthcare for newborns, infants, children, and adolescents. His
                  commitment to quality treatment and preventive healthcare has earned the
                  trust of thousands of families across the region.
                </p>

                <p>
                  He specializes in diagnosing and treating childhood illnesses, asthma,
                  allergies, respiratory disorders, newborn care, vaccination, growth and
                  development monitoring, and preventive pediatric healthcare. His approach
                  combines advanced diagnostic technology with personalized treatment plans
                  to ensure the best possible care for every child.
                </p>

                <p>
                  At <strong>Namokar Hospital & Diagnostic Centre</strong>, Dr. Rajesh Jain
                  leads a dedicated team focused on delivering ethical, affordable, and
                  patient-centered healthcare in a child-friendly environment.
                </p>

                <h4>Areas of Expertise</h4>

                <ul>
                  <li>
                    <div className={Style.icon}>
                      <FaUserMd />
                    </div>
                    Child Specialist Consultation
                  </li>

                  <li>
                    <div className={Style.icon}>
                      <GiLungs />
                    </div>
                    Asthma & Respiratory Care
                  </li>

                  <li>
                    <div className={Style.icon}>
                      <LuBaby />
                    </div>
                    Newborn & Infant Care
                  </li>

                  <li>
                    <div className={Style.icon}>
                      <FaSyringe />
                    </div>
                    Vaccination & Immunization
                  </li>

                  <li>
                    <div className={Style.icon}>
                      <FaChild />
                    </div>
                    Growth & Development Monitoring
                  </li>

                  <li>
                    <div className={Style.icon}>
                      <FaHeartbeat />
                    </div>
                    Allergy Diagnosis & Treatment
                  </li>
                </ul>

                <p>
                  <strong>Advanced Diagnostic Services</strong>
                </p>

                <ul>
                  <li>✔ Spirometry</li>
                  <li>✔ Forced Oscillation Technique (FOT)</li>
                  <li>✔ Skin Prick Test (SPT)</li>
                  <li>✔ ImmunoCAP Allergy Blood Test</li>
                  <li>✔ EEG</li>
                  <li>✔ Sonography</li>
                </ul>

                

                
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default OurDoctor