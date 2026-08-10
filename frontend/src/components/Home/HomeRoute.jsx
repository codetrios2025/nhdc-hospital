  import React, {useState, useEffect} from "react";
import HeroBanner from "./HeroBanner";
import Services from "./Services";
import Diagnostics from "./Diagnostics";
import OurVideos from "./OurVideos";
import OurDoctor from "./OurDoctor";
import Support from "./Support";
import Loader from "../Common/Loader";
import { Helmet } from "react-helmet-async";
//APIs
import { getBannerData, getDoctorsData, getHomeVideos, getFeaturesData, getDiagnosticServicesData, getHomeServices } from "../../services/routes.services";
const HomeRoute = ()=>{
  const [bannerData, setBannerData] = useState([]);
  const [serviceData, setServiceData] = useState([]);
  const [doctorData, setDoctorData] = useState([]);
  const [videoData, setVideoData] = useState([]);
  const [featuresData, setFeaturesData] = useState([]);
  const [diagnosticServicesData, setDiagnosticServicesData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() =>{
    const fetchData = async () =>{
      try{  
        const [bannerRes, serviceRes, doctorRes, videoRes, featuresRes, diagnosticServicesRes] = await Promise.all([
          getBannerData(),
          getHomeServices(),
          getDoctorsData(),
          getHomeVideos(),
          getFeaturesData(),
          getDiagnosticServicesData()
        ])
        setBannerData(bannerRes?.data?.data || []);
        setServiceData(serviceRes?.data?.data || []);
        setDoctorData(doctorRes?.data || []);
        setVideoData(videoRes?.data?.data || []);
        setFeaturesData(featuresRes?.data || []);
        setDiagnosticServicesData(diagnosticServicesRes?.data?.data || []);
      } catch(error){
        console.error("Error fetching doctor",  error);
      } finally{
        setLoading(false);
      }
    }
    fetchData();
  }, []);
 if (loading) {
    return <Loader />;
  }
  //console.log(serviceData)
  return(
    <>
      <Helmet>
        <title>Namokar Hospital</title>
        <meta name="description" content="Namokar Hospital"  />
        <meta name="keywords" content="Namokar Hospital"
        />
      </Helmet>
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