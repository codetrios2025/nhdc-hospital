import React, { useState, useEffect } from "react";
import CarouselImport from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Style from '../CSS/Global.module.css';
import BannerImg from '../../assets/images/hospital-slide.webp';
import BannerImg01 from '../../assets/images/banner_image_1.webp';
//icon
import { IoCalendarOutline } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import BookingForm from "../Booking/BookingForm";

const Carousel =
  CarouselImport.default ??
  CarouselImport;

const HeroBanner = () =>{
  const [booking, setBooking] = useState(false);
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
        <figure className={Style.bannerItem}>
          <img
            src={BannerImg}
            alt="Expert pediatric healthcare services at Namokar Hospital"
            width="1920"
            height="850"
          />
        </figure>
        <figure className={Style.bannerItem}>
          <img
            src={BannerImg01}
            alt="Expert pediatric healthcare services at Namokar Hospital"
            width="1920"
            height="850"
          />
        </figure>
      </Carousel>
      <div className={Style.bannerContent}>
        <div className={Style.box}>
          <h1>Compassionate Care, <span>Healthy Tomorrows</span></h1>
          <p>Quality healthcare for every child and family with expert pediatric care, advanced diagnostics, and 24×7 emergency support.</p>
          <ul className={Style.featureList}>
            <li><span className={Style.icon}><FaCheckCircle /></span> Child Specialist Care</li>
            <li><span className={Style.icon}><FaCheckCircle /></span> Asthma & Allergy Treatment</li>
            <li><span className={Style.icon}><FaCheckCircle /></span> 24×7 Emergency Service</li>
            <li><span className={Style.icon}><FaCheckCircle /></span> Advanced Diagnostics</li>
            <li><span className={Style.icon}><FaCheckCircle /></span> Personalized Patient Care</li>
          </ul>
          <div className={Style.bannerBtn}>
            <button onClick={bookingHandler} type="button" className={'flexCenter ' + Style.primeryBtn} aria-label="Book an Appointment">
              <div className={Style.icon}><IoCalendarOutline /></div> Book Appointment
            </button>
            <a href="tel:9057288286" className={'flexCenter ' + Style.secondryBtn} aria-label="Call Hospital">
              <div className={Style.icon}><IoCall /></div> Call Now
            </a>
          </div>
        </div>
      </div>
      {booking &&
        <div className={Style.bookingOverLay}>
          <div className={Style.bookingPop}>
            <BookingForm close={closeBooking} />
          </div>
        </div>
      }
    </div>
  )
}

export default HeroBanner;