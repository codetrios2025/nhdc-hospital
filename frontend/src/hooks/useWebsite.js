import { useContext } from "react";

import WebsiteContext from "../context/WebsiteContext";

const useWebsite = () => {
  return useContext(WebsiteContext);
};

export default useWebsite;
