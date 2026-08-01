  import React, {useState, useEffect} from "react";
import HeroBanner from "./HeroBanner";
import Services from "./Services";
import Diagnostics from "./Diagnostics";
import OurVideos from "./OurVideos";
import OurDoctor from "./OurDoctor";
import Support from "./Support";

//API
import { getDoctorsData, getVideos } from "../../services/routes.services";
const HomeRoute = ()=>{
  const [doctorData, setDoctorData] = useState(null);
  const [videoData, setVideoData] = useState(null);
  useEffect(() =>{
    const fetchData = async () =>{
      try{  
        const [doctorRes, videoRes] = await Promise.all([
          getDoctorsData(),
          getVideos(),
        ])
        setDoctorData(doctorRes?.data);
        setVideoData(videoRes?.data);
      } catch(error){
        console.error("Error fetching doctor",  error);
      }
    }
    fetchData();
  }, []);
  //console.log(videoData)
  return(
    <>
      <HeroBanner />
      <Services />
      <Diagnostics />
      <OurVideos data={videoData} />
      <OurDoctor data={doctorData} />
      <Support />
    </>
  )
}

export default HomeRoute;