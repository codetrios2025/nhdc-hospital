import React from "react";
import Logo from '../../assets/images/nhdc-logo.png'

const Loader = () => {
  return (
    <div className="loader">
      <img src={Logo} alt="Loading..." />
      <p className="loadingText">
        Loading
        <span>
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </span>
      </p>
    </div>
  );
} 

export default Loader;