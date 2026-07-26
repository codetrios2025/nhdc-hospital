import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Style from '../CSS/Global.module.css';
import serviceImg01 from '../../assets/images/vaccination-img.webp';
//icon
import { FaCheckCircle, FaWind, FaLeaf } from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";
import { GiLungs  } from "react-icons/gi";
import { FaVial , FaBrain, FaXRay } from "react-icons/fa6";
import { MdMonitorHeart } from "react-icons/md";
import BookingForm from "../Booking/BookingForm";

const Diagnostics = () =>{
  const [booking, setBooking] = useState(false);
  const bookingHandler = ()=>{
    setBooking(true)
  }
  const closeBooking = ()=>{
    setBooking(false)
  }
  return(
    <>
   
    <section className={`${Style.whyChoose} ${Style.diagnoServices} ${Style.commonSpace}`}>
      <Container>
        <Row>
          <Col>
            <div className={Style.whyChooseContainer}>
              <h2>Advanced Diagnostic Services</h2>
              <p>State-of-the-art technology for precise diagnosis and effective treatment.</p>
              <div className={Style.whyChooseElem}>
                <div className={Style.box}>
                  <div className={Style.icon}><GiLungs /></div>
                  <h4>Spirometry</h4>
                  <p>Measures lung function and helps diagnose asthma and COPD.</p>
                </div>
                <div className={Style.box}>
                  <div className={Style.icon}><FaWind /></div>
                  <h4>FOT (Forced Oscillation Technique)</h4>
                  <p>Advanced airway resistance assessment without forceful breathing.</p>
                </div>
                <div className={Style.box}>
                  <div className={Style.icon}><FaLeaf /></div>
                  <h4>SPT (Skin Prick Test)</h4>
                  <p>Quick and reliable allergy testing for various allergens.</p>
                </div>
                <div className={Style.box}>
                  <div className={Style.icon}><FaVial /></div>
                  <h4>ImmunoCAP (Allergy Blood Test)</h4>
                  <p>Blood test that measures allergen-specific IgE antibodies.</p>
                </div>
                <div className={Style.box}>
                  <div className={Style.icon}><FaBrain /></div>
                  <h4>EEG (Electroencephalogram)</h4>
                  <p>Records brain activity to diagnose neurological disorders like epilepsy.</p>
                </div>
                <div className={Style.box}>
                  <div className={Style.icon}><MdMonitorHeart /></div>
                  <h4>Sonography (Ultrasound)</h4>
                  <p>Safe imaging test to view internal organs, tissues and blood flow.</p>
                </div>
                
                 <div className={Style.box}>
                  <div className={Style.icon}><FaXRay   /></div>
                  <h4>X-Ray</h4>
                  <p>Imaging test to view bones and internal organs.</p>
                </div>
              </div>
              {/* <div className={'flexCenter ' + Style.bookText}>
                <button onClick={bookingHandler} type="button" className={'flexCenter ' + Style.primeryBtn} aria-label="Book an Appointment">
                  <div className={Style.icon}><IoCalendarOutline /></div> Book Diagnostic Test
                </button>
              </div> */}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
    {booking &&
      <div className={Style.bookingOverLay}>
        <div className={Style.bookingPop}>
          <BookingForm close={closeBooking} />
        </div>
      </div>
    }
    </>
  )
}

export default Diagnostics;