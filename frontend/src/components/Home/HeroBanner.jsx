import React, { useState, useEffect } from "react";
import CarouselImport from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Style from '../CSS/Global.module.css';
import BannerImg from '../../assets/images/hospital-slide.webp';
import BannerImg01 from '../../assets/images/banner_image_1.webp';
import parse from 'html-react-parser';
//icon
import { IoCalendarOutline } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import BookingForm from "../Booking/BookingForm";
import constants from "../../services/constants";

const Carousel =
  CarouselImport.default ??
  CarouselImport;

const HeroBanner = ({ data }) =>{
  const [booking, setBooking] = useState(false);
  const popup = true;
  const slides = data?.[0]?.slides || [];
  const features = data?.[0]?.features || [];
  if (!slides.length || !features.length) {
    return null;
  }
    const bookingHandler = ()=>{
      setBooking(true)
    }
    const closeBooking = ()=>{
      setBooking(false)
    }
  const heroSlider = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 767 },items: 1
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },items: 1
    }
  };
  //console.log(data)
  return(
    <div className={Style.heroBanner} aria-label="Hospital Hero Banner">
      <Carousel
          autoPlaySpeed={3000}
          transitionDuration={500}
          responsive={heroSlider}
          autoPlay={true}
          infinite={true}
          arrows={false}
      >
        {slides.map((item, index) => (
          <figure className={Style.bannerItem} key={index}>
            <img
              src={constants.Image_BASE_URL + "/banners/" + item?.desktopImage}
              alt={data?.[0]?.title}
            />
          </figure>
        ))}
      </Carousel>
      <div className={Style.bannerContent}>
        <div className={Style.box}>
          <h1>{data?.[0]?.title} <span>{data?.[0]?.subtitle}</span> </h1>
          {data?.[0]?.description ? parse(String(data?.[0]?.description)): null }
          <ul className={Style.featureList}>
            {features.map((item, index) => (
              <li key={index}><span className={Style.icon}><FaCheckCircle /></span> {item?.title}</li>
            ))}
          </ul>
          <div className={Style.bannerBtn}>
            <button onClick={bookingHandler} type="button" className={'flexCenter ' + Style.primeryBtn} aria-label="Book an Appointment">
              <div className={Style.icon}><IoCalendarOutline /></div> {data?.[0]?.primaryButtonText}
            </button>
            <a href="tel:9057288286" className={'flexCenter ' + Style.secondryBtn} aria-label="Call Hospital">
              <div className={Style.icon}><IoCall /></div> {data?.[0]?.secondaryButtonText}
            </a>
          </div>
        </div>
      </div>
      {booking &&
        <div className={Style.bookingOverLay}>
          <div className={Style.bookingPop}>
            <BookingForm close={closeBooking} popup={popup} />
          </div>
        </div>
      }
    </div>
  )
}

export default HeroBanner;