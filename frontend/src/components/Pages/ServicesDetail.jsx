import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Style from '../CSS/Global.module.css';
import innerBanner from '../../assets/images/asthma.webp';
import CarouselImport from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import slideImg01 from "../../assets/images/namokar_img01.webp";
import slideImg02 from "../../assets/images/namokar_img02.webp";
import slideImg03 from "../../assets/images/namokar_img03.webp";
import slideImg04 from "../../assets/images/namokar_img04.webp";

const Carousel =
  CarouselImport.default ??
  CarouselImport;

const ServiceDetail = () =>{
  const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 3000, min: 0 },
          shouldResetAutoplay:true,
          items: 1,
        },
      };
  return(
    <div className={Style.ServiceDetailPage}>
      <div className={Style.innerBanner}>
        <img src={innerBanner} />
      </div>
      <div className={Style.servicesContent}>
        <Container>
          <Row>
            <Col>
            <div className={Style.overViewCOntainer}>
              <Row>
                <Col md={7} className={Style.fullWid}>
                  <div className={Style.content}>
                    <h2>Child Specialist Care</h2>
                    <h4>Caring for your child's health from birth to adolescence.</h4>
                    <p>Comprehensive pediatric care for newborns, infants, children, and adolescents. We focus on preventive healthcare, early diagnosis, and effective treatment to ensure healthy growth and development.</p>
                    <div className={Style.overView}>
                      <div className={Style.box}>
                        <h3>We Treat</h3>
                        <ul>
                          <li>Fever</li>
                          <li>Cold & Cough</li>
                          <li>Viral Infections</li>
                          <li>Typhoid</li>
                          <li>Dengue</li>
                          <li>Malaria</li>
                          <li>Pneumonia</li>
                          <li>Diarrhea</li>
                          <li>Vomiting</li>
                          <li>Childhood Obesity</li>
                          <li>Poor Weight Gain</li>
                          <li>Developmental Delay</li>
                        </ul>
                      </div>
                      <div className={Style.box}>
                        <h3>Services</h3>
                        <ul>
                          <li>Newborn Care</li>
                          <li>Growth Monitoring</li>
                          <li>Nutrition Guidance</li>
                          <li>Development Assessment</li>
                          <li>School Health Check-up</li>
                          <li>Adolescent Health</li>
                        </ul>
                      </div>
                      <div className={Style.box}>
                        <h3>Diagnostic Tests</h3>
                        <ul>
                          <li>CBC</li>
                          <li>Blood Sugar</li>
                          <li>Urine Test</li>
                          <li>Stool Test</li>
                          <li>CRP</li>
                          <li>X-Ray</li>
                          <li>Sonography</li>
                          <li>EEG (when required)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col md={5} className={Style.fullWid}>
                  <Carousel 
                    autoPlaySpeed={3000} 
                    transitionDuration={500} 
                    responsive={responsive} 
                    autoPlay={true} 
                    infinite={true} 
                    arrows={false} 
                    showDots={true} className={Style.servicesOwl}>
                      <div className={Style.slideItem}>
                        <img src={slideImg01} />
                      </div>
                      <div className={Style.slideItem}>
                        <img src={slideImg02} />
                      </div>
                      <div className={Style.slideItem}>
                        <img src={slideImg03} />
                      </div>
                      <div className={Style.slideItem}>
                        <img src={slideImg04} />
                      </div>
                  </Carousel>
                </Col>
              </Row>
            </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}


export default ServiceDetail;
