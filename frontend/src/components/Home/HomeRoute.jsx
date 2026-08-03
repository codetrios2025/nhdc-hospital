  import React, {useState, useEffect} from "react";
import HeroBanner from "./HeroBanner";
import Services from "./Services";
import Diagnostics from "./Diagnostics";
import OurVideos from "./OurVideos";
import OurDoctor from "./OurDoctor";
import Support from "./Support";

//APIs
import { getDoctorsData, getVideos, getFeaturesData, getDiagnosticServicesData } from "../../services/routes.services";
const HomeRoute = ()=>{
  const [doctorData, setDoctorData] = useState(null);
  const [videoData, setVideoData] = useState(null);
  const [featuresData, setFeaturesData] = useState(null);
  const [diagnosticServicesData, setDiagnosticServicesData] = useState(null);
  useEffect(() =>{
    const fetchData = async () =>{
      try{  
        const [doctorRes, videoRes, featuresRes, diagnosticServicesRes] = await Promise.all([
          getDoctorsData(),
          getVideos(),
          getFeaturesData(),
          getDiagnosticServicesData()
        ])
        setDoctorData(doctorRes?.data);
        setVideoData(videoRes?.data?.data || null);
        setFeaturesData(featuresRes?.data || null);
        setDiagnosticServicesData(diagnosticServicesRes?.data?.data || null);
      } catch(error){
        console.error("Error fetching doctor",  error);
      }
    }
    fetchData();
  }, []);
  //console.log(diagnosticServicesData)
  return(
    <>
      <HeroBanner />
      <Services data={featuresData} />
      <Diagnostics data={diagnosticServicesData} />
      <OurVideos data={videoData} />
      <OurDoctor data={doctorData} />
      <Support />
    </>
  )
}

export default HomeRoute;