import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Style from "../CSS/Global.module.css";
import { useParams } from "react-router-dom";
import innerBanner from "../../assets/images/asthma.webp";
import CarouselImport from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import parse from "html-react-parser";
import constants from "../../services/constants";
import Loader from "../Common/Loader";
import { Helmet } from "react-helmet-async";
//API
import { getServiceBySlug } from "../../services/routes.services";

const Carousel = CarouselImport.default ?? CarouselImport;

const ServiceDetail = () => {
  const { slug } = useParams();
  const [serviceData, setServiceData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await getServiceBySlug(slug);

        setServiceData(res?.data?.data || null);
      } catch (error) {
        console.error("Error fetching service:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [slug]);
  const testData = serviceData?.tests;
  console.log(serviceData);
  if (loading) return <Loader />;
  if (!serviceData) return <p className={Style.notFound}>Data not found</p>;

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 3000, min: 0 },
      shouldResetAutoplay: true,
      items: 1,
    },
  };
  const testResponsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 1,
    },
  };
  return (
    <>
    <Helmet>
      <title>{serviceData?.seoTitle || serviceData.seoTitle || "Namokar Hospital"}</title>
      <meta name="description" content={serviceData?.seoDescription || "" }  />
      <meta name="keywords" content={
          Array.isArray(serviceData?.seoKeyword)
          ? serviceData.seoKeyword.join(", ") : serviceData?.seoKeywords || ""
        } 
      />
    </Helmet>
      <div className={Style.ServiceDetailPage}>
        <div className={`${Style.innerBanner} ${Style.servicesBanner}`}>
          <img
            src={
              constants.Image_BASE_URL + "/services/" + serviceData?.bannerImage
            }
            alt={serviceData?.title}
          />
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
                        showDots={true}
                        className={Style.servicesOwl}
                      >
                        {serviceData?.gallery?.map((item, index) => (
                          <div className={Style.slideItem} key={index}>
                            <img
                              src={
                                constants.Image_BASE_URL +
                                "/services/gallery/" +
                                item?.image
                              }
                              alt={serviceData?.title}
                            />
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
        {testData?.length > 0 && (
          <div className={Style.testSec}>
            <Container>
              <Row>
                <Col>
                  <div className={Style.head}>
                    <h2>Related Test</h2>
                  </div>
                  <div className={Style.testContainer}>
                    {testData?.map((item, index) => (
                        <div className={Style.item} key={item._id}>
                          <div className={Style.box}>
                            <img
                              src={`${constants.Image_BASE_URL}/service-tests/${item?.image}`}
                              alt={item?.testName}
                            />
                            <div className={Style.content}>
                              <h3>{item?.testName}</h3>
                              {parse(item?.description || "")}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        )}
      </div>
    </>
  );
};

export default ServiceDetail;
