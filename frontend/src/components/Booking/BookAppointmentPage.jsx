import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import BannerImg from '../../assets/images/hospital-slide.webp';
import Style from '../CSS/Global.module.css';
import BookingForm from "./BookingForm";
//icon
import { ImLab } from "react-icons/im";
import { LiaPhoneSolid } from "react-icons/lia";
import { IoPeople } from "react-icons/io5";
import { MdEmergency , MdMedicalServices, MdOutlineChildCare} from "react-icons/md";
import { FaChild } from "react-icons/fa";
import { MdOutlineAccessTime } from "react-icons/md";

const BookAppointment = () => {
  return (
    <div className={Style.bookAppointment}>
      <div className={Style.innerBanner}>
          <img src={BannerImg} alt="Namokar Hospital & Diagnostic Centre" />
          <div className={Style.content}>
            <Container>
              <Row>
                <Col>
                <div className={Style.box}>
                    <h1>Contact Us</h1>
                    <p>Schedule your visit with our specialists. We're here to provide the best care for your child and family.</p>
                </div>
                </Col>
              </Row>
            </Container>
          </div>
      </div>
      <div className={`${Style.appointmentForm} ${Style.commonSpace}`}>
        <Container>
          <Row>
            <Col>
              <div className={Style.appointmentContainer}>
                <Row>
                  <Col md={8} className={Style.mobWidth}>
                    <BookingForm />
                  </Col> 
                  <Col md={4} className={Style.mobWidth}>
                    <div className={Style.bookinfo}>
                      <div className={Style.bookingUs}>
                        <h3>Why Choose Us?</h3>
                        <div className={Style.box}>
                          <div className={Style.icon}><IoPeople /></div>
                          <div className={Style.text}>
                            <h4>Experienced Pediatric Specialists</h4>
                            <p>Expert care for your child</p>
                          </div>
                        </div>
                        <div className={Style.box}>
                          <div className={Style.icon}><MdMedicalServices /></div>
                          <div className={Style.text}>
                            <h4>Advanced Diagnostics</h4>
                            <p>Accurate & quick results</p>
                          </div>
                        </div>
                        {/* <div className={Style.box}>
                          <div className={Style.icon}><MdEmergency /></div>
                          <div className={Style.text}>
                            <h4>24×7 Emergency Care</h4>
                            <p>We are here anytime</p>
                          </div>
                        </div> */}
                        <div className={Style.box}>
                          <div className={Style.icon}><FaChild /></div>
                          <div className={Style.text}>
                            <h4>Child-Friendly Environment</h4>
                            <p>Comfortable & safe care</p>
                          </div>
                        </div>
                      </div>
                      <div className={Style.helpUs}>
                        <h3>Need Immediate Help?</h3>
                        <p>Our emergency team is available 24×7</p>
                        <a href="tel:+919057288286" className={Style.callBtn}>
                          <div className={Style.icon}><LiaPhoneSolid /></div>
                          <p>+91 90572 88286 <span>24×7 Emergency Services</span></p>
                        </a>
                      </div>
                      <div className={Style.workingUs}>
                        <h3><div className={Style.icon}><MdOutlineAccessTime /></div> Working Hours</h3>
                        <div className={Style.areTime}>
                          <spam>Monday - Saturday:</spam> <span>9:00 AM – 8:00 PM</span>
                        </div>
                        <div className={Style.areTime}>
                          <spam>Sunday:</spam> <span>9:00 AM – 1:00 PM</span>
                        </div>
                        {/* <h5>24×7 Emergency Services</h5> */}
                      </div>
                    </div>
                  </Col> 
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default BookAppointment;