import React from "react";
import HeroBanner from "./HeroBanner";
import Services from "./Services";
import Diagnostics from "./Diagnostics";
import OurVideos from "./OurVideos";
import OurDoctor from "./OurDoctor";
import Support from "./Support";
const HomeRoute = ()=>{
  return(
    <>
      <HeroBanner />
      <Services />
      <Diagnostics />
      <OurVideos />
      <OurDoctor />
      <Support />
    </>
  )
}

export default HomeRoute;