import React, {useState, useEffect} from "react";
import { Container, Row, Col } from "react-bootstrap";
import Style from '../CSS/Global.module.css';
import Doctor from '../../assets/images/drrajesh.webp';
import { GoArrowRight } from "react-icons/go";
import { FaStethoscope, FaUserMd, FaSyringe, FaChild, FaHeartbeat } from "react-icons/fa";
import { GiLungs } from "react-icons/gi";
import { LuBaby } from "react-icons/lu";
import parse from 'html-react-parser';
import constants from "../../services/constants";

//API
import { getDoctorsData } from "../../services/routes.services";

const OurDoctor = () =>{
  const [doctorData, setDoctorData] = useState(null);
    useEffect(() =>{
      const fetchData = async () =>{
        try{  
          const res = await getDoctorsData();
          setDoctorData(res?.data?.data?.doctors?.[2])
        } catch(error){
          console.error("Error fetching doctor",  error);
        }
      }
      fetchData();
    }, []);
    console.log(doctorData)
  return(
    <div className={`${Style.doctorSec} ${Style.commonSpace}`}>
      <Container>
        <Row>
          <Col>
            <div className={Style.drConainer}>
              <div className={Style.drImg}>
                <figure>
                  <img src={doctorData?.profileImageUrl} alt={doctorData?.fullName} />
                  {/* <div className={Style.drExp}>
                    <div className={Style.icon}><FaStethoscope /></div>
                    <p><strong>25+</strong> Years of Experience</p>
                  </div> */}
                </figure>
              </div>
             <div className={Style.drContent}>
                <h2>{doctorData?.fullName}</h2>

                <p><span>{doctorData?.qualification}</span></p>
                <p><strong>{doctorData?.designation}</strong></p>

                {doctorData?.description ? parse(String(doctorData.description)): null}
                {/* <h4>Areas of Expertise</h4>
                <ul>
                  <li>✔ Child Specialist Consultation</li>
                  <li>✔ Asthma & Respiratory Care</li>
                  <li>✔ Newborn & Infant Care</li>
                  <li>✔ Vaccination & Immunization</li>
                  <li>✔ Growth & Development Monitoring</li>
                  <li>✔ Allergy Diagnosis & Treatment</li>
                </ul>
                <p><strong>Advanced Diagnostic Services</strong></p>
                <ul>
                  <li>✔ Spirometry</li>
                  <li>✔ Forced Oscillation Technique (FOT)</li>
                  <li>✔ Skin Prick Test (SPT)</li>
                  <li>✔ ImmunoCAP Allergy Blood Test</li>
                  <li>✔ EEG</li>
                  <li>✔ Sonography</li>
                </ul> */}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default OurDoctor