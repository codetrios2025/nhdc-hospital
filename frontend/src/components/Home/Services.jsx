import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Style from '../CSS/Global.module.css';
import serviceImg01 from '../../assets/images/child-care-img.webp';
import serviceImg03 from '../../assets/images/services_img03.webp';
import serviceImg02 from '../../assets/images/asthma.webp';
import serviceImg04 from '../../assets/images/services_img04.webp';
// icon
import { GiLungs } from "react-icons/gi";
import {FaHeartbeat, FaCheckCircle} from "react-icons/fa";
import { FaShieldVirus } from "react-icons/fa6";
import { MdOutlineEmergency, MdMedicalServices, MdOutlineChildCare} from "react-icons/md";
import { TbBulbFilled } from "react-icons/tb";

const Services = () =>{
  return(
    <section className={`${Style.serviceSec} ${Style.commonSpace}`} aria-labelledby="services-heading">
      <Container>
        <Row>
          <Col>
            <div className={Style.servicesList}>
              <div className={Style.listBox}>
                <span className={Style.icon}><TbBulbFilled /></span>
                <h6>Emergency</h6>
                <p>24×7 Support</p>
              </div>
              <div className={Style.listBox}>
                <span className={Style.icon}><MdOutlineChildCare /></span>
                <h6>Child Care</h6>
                <p>Pediatric Specialist</p>
              </div>
              <div className={Style.listBox}>
                <span className={Style.icon}><GiLungs /></span>
                <h6>Asthma Care</h6>
                <p>Allergy & Respiratory</p>
              </div>
               <div className={Style.listBox}>
                <span className={Style.icon}><FaShieldVirus  /></span>
                <h6>Allergy Treatment</h6>
                <p>Skin & Allergy Care  </p>
              </div>
              <div className={Style.listBox}>
                <span className={Style.icon}><FaHeartbeat /></span>
                <h6>OPD Consultation</h6>
                <p>Expert Medical Advice</p>
              </div>
              <div className={Style.listBox}>
                <span className={Style.icon}><MdMedicalServices /></span>
                <h6>Diagnostics</h6>
                <p>Accurate Testing</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <div className={Style.specialServices}>
        <Container>
          <Row>
            <Col>
              <div className={Style.specialContainer}>
                <article  className={Style.specialItem}>
                  <figure>
                    <img 
                      src={serviceImg01}   
                      alt="Pediatric specialist examining a child at Namokar Hospital"
                      width="650"
                      height="700"
                      loading="lazy"
                      decoding="async" 
                    />
                  </figure>
                  <div className={Style.content}>
                    <h2>Child Specialist <span>Care</span></h2>
                    <p>Comprehensive healthcare services designed for infants, children, and adolescents.</p>
                    <ul>
                      <li>
                        <span className={Style.icon}><FaCheckCircle /></span>Newborn & Infant Care
                      </li>
                      <li>
                        <span className={Style.icon}><FaCheckCircle /></span>Growth & Development Monitoring
                      </li>
                      <li>
                        <span className={Style.icon}><FaCheckCircle /></span>Vaccination & Immunization
                      </li>
                      <li>
                        <span className={Style.icon}><FaCheckCircle /></span>Fever & Infection Management
                      </li>
                      <li>
                        <span className={Style.icon}><FaCheckCircle /></span>Nutritional Guidance
                      </li>
                      <li>
                        <span className={Style.icon}><FaCheckCircle /></span>Routine Health Checkups
                      </li>
                    </ul>
                    <a href="/service-detail" title="" className={Style.primeryBtn}>Learn More</a>
                  </div>
                </article >
                <article  className={Style.specialItem}>
                  <figure>
                    <img 
                      src={serviceImg02}   
                      alt="Pediatric specialist examining a child at Namokar Hospital"
                      width="650"
                      height="700"
                      loading="lazy"
                      decoding="async" 
                    />
                  </figure>
                  <div className={Style.content}>
                    <h2>Asthma & <span>Respiratory Care</span></h2>
                    <p>Specialized diagnosis and treatment for asthma, allergies, and respiratory disorders.</p>
                    <ul>
                      <li>
                        <span className={Style.icon}><FaCheckCircle /></span>Asthma Management
                      </li>
                      <li>
                        <span className={Style.icon}><FaCheckCircle /></span>Allergy Evaluation
                      </li>
                      <li>
                        <span className={Style.icon}><FaCheckCircle /></span>Nebulization Therapy
                      </li>
                      <li>
                        <span className={Style.icon}><FaCheckCircle /></span>Respiratory Infection Treatment
                      </li>
                      <li>
                        <span className={Style.icon}><FaCheckCircle /></span>Breathing Disorder Management
                      </li>
                      <li>
                        <span className={Style.icon}><FaCheckCircle /></span>Follow-up Care Programs
                      </li>
                    </ul>
                    <a href="/service-detail" title="" className={Style.primeryBtn}>Learn More</a>
                  </div>
                </article >
                <article  className={Style.specialItem}>
                  <figure>
                    <img 
                      src={serviceImg03}   
                      alt="Pediatric specialist examining a child at Namokar Hospital"
                      width="650"
                      height="700"
                      loading="lazy"
                      decoding="async" 
                    />
                  </figure>
                  <div className={Style.content}>
                   <h2>Allergy Care & <span>Diagnostics</span> </h2>
                   <p>Accurate allergy testing and personalized treatment for better and healthier living.</p>
                     <ul className={Style.featureList}>
                      <li><span className={Style.icon}><FaCheckCircle /></span> Skin Prick Test (SPT)</li>
                      <li><span className={Style.icon}><FaCheckCircle /></span> ImmunoCAP Allergy Blood Test</li>
                      <li><span className={Style.icon}><FaCheckCircle /></span> Food & Drug Allergy Testing</li>
                      <li><span className={Style.icon}><FaCheckCircle /></span> Dust, Pollen & Pet Allergy Assessment</li>
                      <li><span className={Style.icon}><FaCheckCircle /></span> Allergy Consultation & Management</li>
                    </ul>
                    <a href="/service-detail" title="" className={Style.primeryBtn}>Learn More</a>
                  </div>
                </article >
                <article  className={Style.specialItem}>
                  <figure>
                    <img 
                      src={serviceImg04}   
                      alt="Pediatric specialist examining a child at Namokar Hospital"
                      width="650"
                      height="700"
                      loading="lazy"
                      decoding="async" 
                    />
                  </figure>
                  <div className={Style.content}>
                    <h2>Vaccination  & <span>Immunization</span></h2>
                    <p>Complete vaccination services following the National Immunization Schedule.</p>
                    <ul>
                      <li>
                        <span className={Style.icon}><FaCheckCircle /></span>Routine Vaccination
                      </li>
                      <li>
                        <span className={Style.icon}><FaCheckCircle /></span>Vaccination Reminder
                      </li>
                       <li>
                        <span className={Style.icon}><FaCheckCircle /></span>Follow-up Care Programs
                      </li>
                    </ul>
                    <a href="/service-detail" title="" className={Style.primeryBtn}>Learn More</a>
                  </div>
                </article >
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  )
}

export default Services;