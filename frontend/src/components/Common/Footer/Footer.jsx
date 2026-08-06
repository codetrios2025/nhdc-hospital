import React, {useEffect, useState} from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import Style from "./Footer.module.css";
import Logo from "../../../assets/images/nhdc-logo.png";
import CodeTrios from "../../../assets/images/codetrios_logo.webp";
import { TiSocialFacebook } from "react-icons/ti";
import { IoLogoInstagram } from "react-icons/io";
import { BsYoutube } from "react-icons/bs";
import { FaWhatsapp } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoIosMail } from "react-icons/io";
import { FiClock } from "react-icons/fi";
import useWebsite from "../../../hooks/useWebsite";
import parse from 'html-react-parser';
import { getallserviceData } from "../../../services/routes.services";
export default function Footer() {
  const [serviceData, setServiceData] = useState([]);
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await getallserviceData();
        const services = Object.values(res.data.data).filter(
          (item) => item && item._id
        );
        setServiceData(services);
      } catch (err) {
        console.error(err);
      } 
    };
    fetchServices();
  }, []);
  const { contact } = useWebsite();

  return (
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
                <li>
                  <a href={contact?.socialMedia?.instagram} title="" target="_blank" rel="noopener noreferrer"><IoLogoInstagram /></a>
                </li>
                <li>
                  <a href={contact?.socialMedia?.youtube} title="" target="_blank" rel="noopener noreferrer"><BsYoutube /></a>
                </li>
                <li>
                  <a href={`https://wa.me/${contact?.whatsappNumber}`} title="Chat on WhatsApp" rel="noopener noreferrer"><FaWhatsapp /></a>
                </li>
              </ul>
            </div>
          </Col>
          <Col md={7}>
            <div className={Style.footerLink}>
              <div className={Style.link}>
                <h4>Quick Link</h4>
                <ul>
                  <li><NavLink to="/" title="Home">Home</NavLink></li>
                  <li><NavLink to="about" title="About Us">About Us</NavLink></li>
                  <li><NavLink to="/services" title="Services">Services</NavLink></li>
                  {/* <li><NavLink to="/" title="news">News</NavLink></li> */}
                  <li><NavLink to="/videos" title="Videos">Videos</NavLink></li>
                  <li><NavLink to="/book-appointment" title="Contact Us">Contact Us</NavLink>
                  </li>
                </ul>
              </div>
              <div className={Style.link}>
                <h4>Our Services</h4>
                <ul>
                  {serviceData?.map((item, index) =>{
                    return(
                      <li key={index}>
                        <NavLink to={`/service/${item?.slug}`}  title={item?.title}>{item?.title}</NavLink>
                      </li>    
                    )
                  })}
                </ul>
              </div>
              <div className={Style.link}>
                <h4>Contact Us</h4>
                <div className={Style.addresInfo}>
                  <div className={Style.address}>
                    <div className={Style.icon}>
                      <FaMapMarkerAlt />
                    </div>
                    <p>{parse(String(contact?.address))}</p>
                  </div>
                  <div className={Style.address}>
                    <div className={Style.icon}><IoIosMail size="20" /></div>
                    <a href={`mailto:${contact?.email}`}>{contact?.email}</a>
                  </div>
                  <div className={Style.address}>
                    <div className={Style.icon}><BsFillTelephoneFill /></div>
                    <p>
                      {contact?.phoneNumbers?.map((number, index) => (
                        <React.Fragment key={index}>
                          <a href={`tel:${number}`}>+91 {number}</a>
                          {index < contact.phoneNumbers.length - 1 && ", "}
                        </React.Fragment>
                      ))}
                     
                    </p>
                  </div>
                  <div className={`${Style.address} ${Style.timeSlot}`}>
                    <div className={Style.icon}><FiClock /></div>
                    <p>
                      <span>
                        <strong>Monday - Saturday:</strong> {contact?.workingHours?.mondaySaturday?.morning} , {contact?.workingHours?.mondaySaturday?.evening}
                      </span>
                      <span>
                        <strong>Sunday:</strong> {contact?.workingHours?.sunday?.morning}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col md={3}>
            <div className={Style.map}>
               <iframe
                  //src={`https://maps.google.com/maps?q=${contact?.googleMap?.latitude},${contact?.googleMap?.longitude}&z=15&output=embed`}
                  src={contact?.googleMap?.embedUrl}
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Google Map"
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
                <p>{}</p>
                <p>
                  <a href="https://www.codetrios.com/" target="_blank">
                    Design Develop By :{" "}
                    <img src={CodeTrios} alt="powered by codetrios" />
                  </a>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
}
