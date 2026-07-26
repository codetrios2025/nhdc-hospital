import React from "react";
import { HiMiniArrowLongRight, HiMiniArrowLongLeft  } from "react-icons/hi2";


const CarouselButtonGroup = ({ next, previous }) => {
  return (
    <div className="nav-wrapper">
      <button type="button" className="prev-btn" onClick={previous}><HiMiniArrowLongLeft  /></button>
      <button type="button" className="next-btn" onClick={next}><HiMiniArrowLongRight /></button>
    </div>
  );
};  

export default CarouselButtonGroup;