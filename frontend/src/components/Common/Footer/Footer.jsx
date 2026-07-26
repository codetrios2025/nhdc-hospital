import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import Style from './Footer.module.css';
import Logo from '../../../assets/images/nhdc-logo.png';
import CodeTrios from '../../../assets/images/codetrios_logo.webp';
import { TiSocialFacebook } from "react-icons/ti";
import { IoLogoInstagram } from "react-icons/io";
import { BsYoutube } from "react-icons/bs";
import { FaWhatsapp } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoIosMail } from "react-icons/io";
import { FiClock } from "react-icons/fi";

export default function Footer (){
  return(
    <footer>
      <Container>
        <Row>
          <Col md={2}>
            <div className={Style.info}>
              <a href="/" aria-label="Namokar Hospital Home">
                <img src={Logo} alt="Namokar Hospital Home" />
              </a>
              <h5>Your Health, Our Priority</h5>
              <ul>
                {/* <li><a href="" title=""><TiSocialFacebook /></a></li> */}
                <li><a href="https://www.instagram.com/namokar_hospital/" title="" target="_blank" rel="noopener noreferrer"><IoLogoInstagram /></a></li>
                <li><a href="https://www.youtube.com/@drrajeshjain9176" title="" target="_blank" rel="noopener noreferrer"><BsYoutube /></a></li>
                <li><a href="https://wa.me/9829143239" title="" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a></li>
              </ul>
            </div>
          </Col>
          <Col md={7}>
            <div className={Style.footerLink}>
              <div className={Style.link}>
                <h4>Quick Link</h4>
                <ul>
                    <li><NavLink to="/" title="Home">Home</NavLink></li>
                    <li><NavLink to="/about" title="About Us">About Us</NavLink></li>
                    <li><NavLink to="/services" title="Services">Services</NavLink></li>
                    {/* <li><NavLink to="/" title="news">News</NavLink></li> */}
                    <li><NavLink to="/videos" title="Videos">Videos</NavLink></li>
                    <li><NavLink to="/book-appointment" title="Contact Us">Contact Us</NavLink></li>
                </ul>
              </div>
              <div className={Style.link}>
                <h4>Our Services</h4>
                <ul>
                  <li><NavLink to="/" title="Child Specialist Care">Child Specialist Care</NavLink></li>
                  <li><NavLink to="/" title="Asthma & Allergy Care">Asthma & Allergy Clinic</NavLink></li>
                  <li><NavLink to="/" title="Vaccination & Immunization">Vaccination & Immunization</NavLink></li>
                  <li><NavLink to="/" title="Advanced Diagnostic Services">Advanced Diagnostic Services</NavLink></li>
                </ul>
              </div>
              <div className={Style.link}>
                <h4>Contact Us</h4>
                <div className={Style.addresInfo}>
                  <div className={Style.address}>
                    <div className={Style.icon}><FaMapMarkerAlt /></div>
                    <p>Opp. Government College, Ward No. 15, National Highway, Deoli, District Tonk, Rajasthan - 304804</p>
                  </div>
                  <div className={Style.address}>
                    <div className={Style.icon}><BsFillTelephoneFill /></div>
                    <a href="mailto:nhdcdeoli@gmail.com">nhdcdeoli@gmail.com</a>
                  </div>
                  <div className={Style.address}>
                    <div className={Style.icon}><IoIosMail size="20" /></div>
                    <p>
                      <a href="tel:9057288286">+91 90572 88286 </a>, <a href="tel:9829143239">+91 98291 43239</a>
                    </p>                  
                  </div>
                  <div className={`${Style.address} ${Style.timeSlot}`}>
                    <div className={Style.icon}><FiClock /></div>
                    <p><span><strong>Monday - Saturday:</strong> 9:00 AM – 2:00 PM , 5:00 PM – 7:00 PM</span> <span><strong>Sunday:</strong> 9:00 AM – 2:00 PM</span></p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col md={3}>
            <div className={Style.map}>
              <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55309.06676197348!2d75.37674548952333!3d25.788069632351757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396ee0d7a947a63d%3A0xe88e8b0930b633e7!2sNamokar%20Children%20Hospital%20%26%20Diagnostic%20Centre%20-%20Children%20Hospital%20in%20Deoli!5e1!3m2!1sen!2sin!4v1782804518240!5m2!1sen!2sin"
                  width="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Namokar Children Hospital Location"
                />
            </div>
          </Col>
        </Row>
      </Container>
      <div className={Style.companyRights}>
        <Container>
          <Row>
            <Col>
              <div className={Style.content}>
                <p>Copyright © 2026 Namokar Hospital & Diagnostics Centre, Deoli. All Rights Reserved</p>
                <p><a href="https://www.codetrios.com/" target="_blank">Design Develop By : <img src={CodeTrios} alt="powered by codetrios" /></a></p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  )
}