import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Style from '../CSS/Global.module.css';
import BannerImg from '../../assets/images/hospital-slide.webp';
import serviceImg01 from '../../assets/images/namokar_img01.webp';
import Support from '../Home/Support';
import OurDoctor from './AboutOurDoctor';
//icon
import { FaCheckCircle, FaBullseye, FaEye, FaHandshake, FaAmbulance } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaUserDoctor } from "react-icons/fa6";
import { MdFamilyRestroom } from "react-icons/md";
import { MdEmergency } from "react-icons/md";
import { IoDiamond } from "react-icons/io5";
import { MdChildCare } from "react-icons/md";
import { ImLab } from "react-icons/im";
import { BsUmbrellaFill } from "react-icons/bs";


const AboutUs = () =>{
  return(
    <div className={Style.aboutPage}>
      <div className={Style.innerBanner}>
          <img src={BannerImg} alt="Namokar Hospital & Diagnostic Centre" />
          <div className={Style.content}>
            <Container>
              <Row>
                <Col>
                <div className={Style.box}>
                    <h1>About Namokar Hospital & Diagnostic Centre</h1>
                    <p>Committed to delivering compassionate pediatric healthcare, advanced diagnostics, and trusted medical services with excellence for over 25+ years.</p>
                </div>
                </Col>
              </Row>
            </Container>
          </div>
      </div>
      <OurDoctor />
      <div className={`${Style.whoWe} ${Style.commonSpace}`}>
        <Container>
          <Row>
            <Col md={6} className={Style.fullWid}>
              <div className={Style.content}>
                <h2>Who We Are</h2>
                <p>Established with the vision of delivering quality pediatric healthcare under one roof, Namokar Hospital & Diagnostic Centre has become a trusted name for child healthcare services in Deoli.</p>
                <p>Our hospital offers preventive healthcare, advanced diagnostics, emergency treatment, vaccination programs, asthma management, and newborn care. Every patient is treated with compassion, respect, and personalized attention.</p>
                <ul>
                  <li><span className={Style.icon}><FaCheckCircle /></span>Expert pediatric care for every stage of childhood</li>
                  <li><span className={Style.icon}><FaCheckCircle /></span>Advanced diagnostics with modern technology</li>
                  <li><span className={Style.icon}><FaCheckCircle /></span>24×7 Emergency Medical Support</li>
                  <li><span className={Style.icon}><FaCheckCircle /></span>Family-Centered Healthcare Approach</li>
                </ul>
              </div>
            </Col>
            <Col md={6} className={Style.fullWid}>
              <div className={Style.highLights}>
                <div className={Style.box}>
                  <div className={Style.icon}><FaPeopleGroup /></div>
                  <div className={Style.content}>
                    <h3>25+ <span>Years of Service</span></h3>
                    <p>Providing trusted healthcare services since our establishment.</p>
                  </div>
                </div>
                <div className={Style.box}>
                  <div className={Style.icon}><MdFamilyRestroom /></div>
                  <div className={Style.content}>
                    <h3>5000+ <span>Happy Patients</span></h3>
                    <p>Thousands of families have trusted us for quality healthcare.</p>
                  </div>
                </div>
                <div className={Style.box}>
                  <div className={Style.icon}><FaUserDoctor /></div>
                  <div className={Style.content}>
                    <h3>Clinical<span>Excellence</span> </h3>
                    <p>  We combine medical knowledge, modern technology, and continuous
                          learning to deliver high-quality healthcare services.</p>
                  </div>
                </div>
                <div className={Style.box}>
                  <div className={Style.icon}><MdEmergency /></div>
                  <div className={Style.content}>
                    <h3>24×7 <span>Emergency Care</span></h3>
                    <p>Emergency medical assistance whenever you need us.</p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className={`${Style.missionSec} ${Style.commonSpace}`}>
        <Container>
          <Row>
            <Col>
              <div className={Style.missionContainer}>
                <div className={Style.box}>
                  
                  <div className={Style.content}>
                    <h3><div className={Style.icon}><FaBullseye /></div> Our Mission</h3>
                    <p>To provide accessible, affordable, and high-quality healthcare with compassion, integrity, and clinical excellence while improving the health and well-being of every child and family we serve.</p>
                  </div>
                </div>
                <div className={Style.box}>
                  
                  <div className={Style.content}>
                    <h3><div className={Style.icon}><FaEye /></div> Our Vision</h3>
                    <p>To become the most trusted pediatric healthcare and diagnostic center by delivering world-class medical services through innovation, expertise, and patient-centered care.</p>
                  </div>
                </div>
                <div className={Style.box}>
                  
                  <div className={Style.content}>
                    <h3><div className={Style.icon}><IoDiamond /></div>Our Values</h3>
                    <ul>
                      <li><span className={Style.icon}><FaCheckCircle /></span> Compassion in Every Interaction</li>
                      <li><span className={Style.icon}><FaCheckCircle /></span> Excellence in Clinical Care</li>
                      <li><span className={Style.icon}><FaCheckCircle /></span> Integrity and Transparency</li>
                      <li><span className={Style.icon}><FaCheckCircle /></span> Innovation and Continuous Learning</li>
                      <li><span className={Style.icon}><FaCheckCircle /></span> Patient Safety First</li>
                      <li><span className={Style.icon}><FaCheckCircle /></span> Respect for Every Individual</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className={`${Style.whyUs} ${Style.commonSpace}`}>
        <Container>
          <Row>
            <Col md={7} className={Style.fullWid}>
              <div className={Style.content}>
                <h2>Why Choose Namokar Hospital?</h2>
                {/* <p>We combine medical expertise, modern infrastructure, and compassionate care to deliver exceptional healthcare experiences for children and families.</p> */}
                <ul>
                  <li>
                    <div className={Style.icon}><MdChildCare /></div>
                    <h5>Child-Centric Care</h5>
                    <p>Healthcare services specially designed for infants, children, and adolescents.</p>
                  </li>
                  <li>
                    <div className={Style.icon}><FaPeopleGroup /></div>
                    <h5>Experienced Team</h5>
                    <p>Qualified pediatricians and healthcare professionals with years of expertise.</p>
                  </li>
                  <li>
                    <div className={Style.icon}><ImLab /></div>
                    <h5>Advanced Facilities</h5>
                    <p>Modern laboratory and diagnostic equipment for accurate and timely results.</p>
                  </li>
                  <li>
                    <div className={Style.icon}><FaAmbulance /></div>
                    <h5>24×7 Emergency Support</h5>
                    <p>Immediate medical attention available around the clock.</p>
                  </li>
                  <li>
                    <div className={Style.icon}><BsUmbrellaFill /></div>
                    <h5>Comprehensive Healthcare</h5>
                    <p>From preventive care to treatment and follow-up, everything under one roof.</p>
                  </li>
                </ul>
              </div>
            </Col>
            <Col md={5} className={Style.fullWid}>
              <figure>
                <img src={serviceImg01} alt="About Us" />
              </figure>
            </Col>
          </Row>
        </Container>
      </div>
      <Support />
    </div>
  )
}

export default AboutUs;