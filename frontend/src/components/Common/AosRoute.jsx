import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AOS from "aos";

export default function AosRoute() {
  const location = useLocation();

  useEffect(() => {
    AOS.refreshHard();
  }, [location.pathname]);

  return null;
}
