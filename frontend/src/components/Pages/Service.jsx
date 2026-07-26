import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Style from '../CSS/Global.module.css';
import BannerImg from '../../assets/images/hospital-slide.webp';
import Support from '../Home/Support';
import OurDoctor from '../Home/OurDoctor';
import childImg from "../../assets/images/child-care-img.webp";
import asthmaImg from "../../assets/images/asthma.webp";
import newbornImg from "../../assets/images/newbornImg.webp";
import vaccineImg from "../../assets/images/services_img04.webp";
import emergencyImg from "../../assets/images/namokar_img01.webp";
import diagnosticImg from "../../assets/images/namokar_img02.webp";
//icon
import { FaCheckCircle, FaBullseye, FaEye, FaHandshake, FaAmbulance, FaHeartbeat, FaHeart } from "react-icons/fa";
import { MdOutlineChildCare, MdMedicalServices, MdHealthAndSafety } from "react-icons/md";
import {
  GiLungs,
  GiBabyFace,
  GiMedicines,
} from "react-icons/gi";
import { FaSyringe, FaUserDoctor, FaMicroscope   } from "react-icons/fa6";
import { PiFirstAidKitFill } from "react-icons/pi";
import { RiParentFill, RiHospitalLine } from "react-icons/ri";
import { BsClockHistory } from "react-icons/bs";

const Services = () =>{

const services = [
  {
    title: "Child Specialist Care",
    image: childImg,
    icon: MdOutlineChildCare,
    link: "/service-detail",
    text:
      "Comprehensive healthcare for newborns, infants, children and adolescents with a focus on prevention, diagnosis and treatment.",
    items: [
      "Routine Child Check-ups",
      "Fever & Infection Management",
      "Nutrition Guidance",
      "Growth & Development Assessment",
      "Preventive Healthcare",
      "Newborn Examination",
      "Parent Counselling",
    ],
  },

  {
    title: "Asthma & Allergy Clinic",
    image: asthmaImg,
    icon: GiLungs,
     link: "/service-detail",
    text:
      "Personalized care for children with asthma, allergies and respiratory conditions using modern diagnostic techniques.",
    items: [
      "Asthma Management",
      "Allergy Consultation",
      "Skin Prick Test (SPT)",
      "ImmunoCAP Blood Test",
      "Spirometry & FOT",
    ],
  },

  // {
  //   title: "Newborn & Infant Care",
  //   image: newbornImg,
  //   icon: FaHeartbeat,
  //  link: "/service-detail",
  //   text:
  //     "Specialized care for newborns and infants with regular health assessments and parental guidance.",
  //   items: [
  //     "Newborn Examination",
  //     "Breastfeeding Guidance",
  //     "Growth Monitoring",
  //     "Parent Counselling",
  //   ],
  // },

  {
    title: "Vaccination & Immunization",
    image: vaccineImg,
    icon: FaSyringe,
     link: "/service-detail",
    text:
      "Complete vaccination services following the National Immunization Schedule.",
    items: [
      "Routine Vaccination",
      "Vaccination Reminder",
      "Child Health Record",
    ],
  },

  // {
  //   title: "Emergency Pediatric Care",
  //   image: emergencyImg,
  //   icon: FaAmbulance,
  //   text:
  //     "Prompt and compassionate emergency medical care for infants and children.",
  //   items: [
  //     "Emergency Consultation",
  //     "Rapid Assessment",
  //     "Referral Support",
  //   ],
  // },

  {
    title: "Advanced Diagnostic Services",
    image: diagnosticImg,
    icon: FaMicroscope ,
     link: "/service-detail",
    text:
      "Advanced diagnostic facilities available under one roof for accurate and timely diagnosis.",
    items: [
      "Spirometry",
      "Forced Oscillation Technique (FOT)",
      "Skin Prick Test",
      "ImmunoCAP",
      "EEG",
      "Sonography",
      "X-ray",
    ],
  },
];

  return(
    <div className={Style.servicesPage}>
      <div className={Style.innerBanner}>
          <img src={BannerImg} alt="Namokar Hospital & Diagnostic Centre" />
          <div className={Style.content}>
            <Container>
              <Row>
                <Col>
                <div className={Style.box}>
                    <h1>Our Medical Services</h1>
                    <p>Comprehensive pediatric healthcare, asthma & allergy care, preventive medicine and advanced diagnostic services for children and families.</p>
                </div>
                </Col>
              </Row>
            </Container>
          </div>
      </div>
      <div className={`${Style.mainServices} ${Style.commonSpace}`}>
        <Container>
          <Row>
            <Col>
              <div className={Style.head}>
                <h2>Our Medical Services</h2>
                <p>Comprehensive pediatric healthcare, asthma & allergy care, preventive medicine and advanced diagnostic services for children and families.</p>
              </div>
              <div className={Style.mainContainer}>
                {services.map((item, index) =>{
                  const IconComponent = item.icon;

                  return(
                    <div className={Style.serviceBox} key={index}>
                        <div className={Style.mainIcon}>
                          <span><IconComponent /></span>
                        </div>
                        <img src={item.image} alt="Namokar Hospital & Diagnostic Centre" />
                        <div className={Style.content}>
                          <h3>{item.title}</h3>
                          <p>{item.text}</p>
                          <ul className={Style.featureList}>
                            {item.items.map((list, index) => (
                              <li key={index}>
                                <span className={Style.icon}>
                                  <FaCheckCircle />
                                </span>
                                {list}
                              </li>
                            ))}
                          </ul>
                          <a href="/service-detail" title="">Learn More</a>
                        </div>
                      </div>
                  )
                })}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className={`${Style.whyChoose} ${Style.commonSpace}`}>
        <Container>
          <Row>
            <Col>
              <div className={Style.whyChooseContainer}>
                <h2>Why Choose <span>Namokar Hospital?</span></h2>
                <div className={Style.whyChooseElem}>
                  <div className={Style.box}>
                    <div className={Style.icon}><FaUserDoctor  /></div>
                    <h4>Experienced Doctors</h4>
                    <p>Highly qualified pediatricians and healthcare professionals dedicated to quality treatment.</p>
                  </div>
                  <div className={Style.box}>
                    <div className={Style.icon}><MdOutlineChildCare  /></div>
                    <h4>Child-Friendly Environment</h4>
                    <p>A safe, hygienic, and comfortable atmosphere designed especially for children.</p>
                  </div>
                  <div className={Style.box}>
                    <div className={Style.icon}><RiHospitalLine  /></div>
                    <h4>Advanced Facilities</h4>
                    <p>State-of-the-art diagnostic equipment and modern healthcare infrastructure.</p>
                  </div>
                  <div className={Style.box}>
                    <div className={Style.icon}><BsClockHistory  eChildCare /></div>
                    <h4>24×7 Availability</h4>
                    <p>Round-the-clock emergency and medical support whenever you need us.</p>
                  </div>
                  <div className={Style.box}>
                    <div className={Style.icon}><FaHeart  /></div>
                    <h4>Compassionate Care</h4>
                    <p>Personalized healthcare services delivered with empathy, respect, and dedication.</p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className={`${Style.medicalSec} ${Style.commonSpace}`}>
        <Container>
          <Row>
            <Col>
              <h2>Other Medical Services</h2>
              <ul>
                <li>
                  <div className={Style.icon}><GiBabyFace /></div>
                  <p>Newborn Care</p>
                </li>
                <li>
                  <div className={Style.icon}><FaSyringe /></div>
                  <p>Immunization</p>
                </li>
                <li>
                  <div className={Style.icon}><GiMedicines /></div>
                  <p>Nutritional Guidance</p>
                </li>
                <li>
                  <div className={Style.icon}><MdHealthAndSafety /></div>
                  <p>Health Checkups</p>
                </li>
                <li>
                  <div className={Style.icon}><PiFirstAidKitFill /></div>
                  <p>Minor Procedures</p>
                </li>
                <li>
                  <div className={Style.icon}><GiLungs /></div>
                  <p>Pharmacy Support</p>
                </li>
                <li>
                  <div className={Style.icon}><RiParentFill /></div>
                  <p>Parent Counselling</p>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
      <Support />
    </div>
  )
}

export default Services;