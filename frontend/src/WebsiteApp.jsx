import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import AppRoute from "./Components/Routing/AppRoute";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
function WebsiteApp() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);
  return (
    <>
      <AppRoute />
      <Tooltip id="tooltip" place="top" className="smallTooltip" />
    </>
  );
}

export default WebsiteApp;
