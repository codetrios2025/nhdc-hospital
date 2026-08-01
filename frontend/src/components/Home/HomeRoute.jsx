  import React, {useState, useEffect} from "react";
import HeroBanner from "./HeroBanner";
import Services from "./Services";
import Diagnostics from "./Diagnostics";
import OurVideos from "./OurVideos";
import OurDoctor from "./OurDoctor";
import Support from "./Support";

//API
import { getDoctorsData, getVideos, getFeaturesData } from "../../services/routes.services";
const HomeRoute = ()=>{
  const [doctorData, setDoctorData] = useState(null);
  const [videoData, setVideoData] = useState(null);
  const [featuresData, setFeaturesData] = useState(null);
  useEffect(() =>{
    const fetchData = async () =>{
      try{  
        const [doctorRes, videoRes, featuresRes] = await Promise.all([
          getDoctorsData(),
          getVideos(),
          getFeaturesData()
        ])
        setDoctorData(doctorRes?.data);
        setVideoData(videoRes?.data);
        setFeaturesData(featuresRes?.data?.data || null);
      } catch(error){
        console.error("Error fetching doctor",  error);
      }
    }
    fetchData();
  }, []);
  //console.log(featuresData)
  return(
    <>
      <HeroBanner />
      <Services data={featuresData} />
      <Diagnostics />
      <OurVideos data={videoData} />
      <OurDoctor data={doctorData} />
      <Support />
    </>
  )
}

export default HomeRoute;