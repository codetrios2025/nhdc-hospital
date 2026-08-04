import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Style from '../CSS/Global.module.css';
import { useLocation, useParams } from "react-router-dom";
import innerBanner from '../../assets/images/asthma.webp';
import CarouselImport from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import parse from 'html-react-parser';
import constants from "../../services/constants";
import slideImg01 from "../../assets/images/namokar_img01.webp";
import slideImg02 from "../../assets/images/namokar_img02.webp";
import slideImg03 from "../../assets/images/namokar_img03.webp";
import slideImg04 from "../../assets/images/namokar_img04.webp";

const Carousel =
  CarouselImport.default ??
  CarouselImport;

const ServiceDetail = () =>{
  const location = useLocation();
  const { slug } = useParams();
  const serviceData = location.state?.serviceData;
  console.log(serviceData)
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
                    <h2>{serviceData?.title}</h2>
                    {parse(String(serviceData?.description || ""))}
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
                      {serviceData?.gallery?.map((item, index) => (
                        <div className={Style.slideItem} key={index}>
                          <img src={constants.Image_BASE_URL + "/services/gallery/" + item?.image} alt={serviceData?.title} />
                        </div>
                      ))}
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
