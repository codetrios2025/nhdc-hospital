  import React, {useState, useEffect} from "react";
import HeroBanner from "./HeroBanner";
import Services from "./Services";
import Diagnostics from "./Diagnostics";
import OurVideos from "./OurVideos";
import OurDoctor from "./OurDoctor";
import Support from "./Support";

//APIs
import { getBannerData, getDoctorsData, getVideos, getFeaturesData, getDiagnosticServicesData, getallserviceData } from "../../services/routes.services";
const HomeRoute = ()=>{
  const [bannerData, setBannerData] = useState(null);
  const [serviceData, setServiceData] = useState(null);
  const [doctorData, setDoctorData] = useState(null);
  const [videoData, setVideoData] = useState(null);
  const [featuresData, setFeaturesData] = useState(null);
  const [diagnosticServicesData, setDiagnosticServicesData] = useState(null);
  useEffect(() =>{
    const fetchData = async () =>{
      try{  
        const [bannerRes, serviceRes, doctorRes, videoRes, featuresRes, diagnosticServicesRes] = await Promise.all([
          getBannerData(),
          getallserviceData(),
          getDoctorsData(),
          getVideos(),
          getFeaturesData(),
          getDiagnosticServicesData()
        ])
        setBannerData(bannerRes?.data?.data || null);
        setServiceData(serviceRes?.data?.data || null);
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
  //console.log(serviceData)
  return(
    <>
      <HeroBanner data={bannerData} />
      <Services data={featuresData} serviceData={serviceData} />
      <Diagnostics data={diagnosticServicesData} />
      <OurVideos data={videoData} />
      <OurDoctor data={doctorData} />
      <Support />
    </>
  )
}

export default HomeRoute;