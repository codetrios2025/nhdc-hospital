import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Style from '../CSS/Global.module.css';
import { PiPhoneCallLight } from "react-icons/pi";

const Support = () =>{
  return(
    <div className={`${Style.supportSec} ${Style.commonSpace}`}>
      <Container>
        <Row>
          <Col>
            <div className={Style.supportContainer}>
              <div className={'flexCenter ' + Style.time}>24/7</div>
              <div className={Style.content}>
                <h5>We Are Here For Your Care 24x7</h5>
                <p>Your health is our priority, anytime and anywhere.</p>
              </div>
              <div className={'flexCenter ' + Style.call}>
                <div className={Style.icon}><PiPhoneCallLight /></div>
                <p>
                  <a href="tel:9057288286">+91 90572 88286 </a> 
                  <a href="tel:9829143239">+91 98291 43239</a>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>      
    </div>
  )
}

export default Support;