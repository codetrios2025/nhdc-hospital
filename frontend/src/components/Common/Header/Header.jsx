import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, NavLink  } from "react-router-dom";
import Style from './Header.module.css';
import { BiSolidPhoneCall } from "react-icons/bi";
import { IoIosMail } from "react-icons/io";
import { IoCalendarOutline } from "react-icons/io5";
import Logo from '../../../assets/images/nhdc-logo.png'
import { FaHeadset, FaBars, FaTimes } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { CiMenuBurger } from "react-icons/ci";
import BookingForm from "../../Booking/BookingForm";
import { FiClock } from "react-icons/fi";
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const [booking, setBooking] = useState(false);
   const [isScrolled, setIsScrolled] = useState(false);
  const bookingHandler = ()=>{
    setBooking(true)
  }
  const closeBooking = ()=>{
    setBooking(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return(
    <>
    <header role="banner" className={`header ${isScrolled ? Style.headerFix : ""}`}>
      <div className={Style.topHead}>
        <Container>
          <Row>
            <Col>
              <address>
                <ul>
                  <li>
                    <a data-tooltip-id="tooltip" data-tooltip-content="nhdcdeoli@gmail.com" href="mailto:nhdcdeoli@gmail.com"  aria-label="Email Namokar Hospital">
                      <div className={Style.icon}><IoIosMail /></div><p className={Style.mobNone}>nhdcdeoli@gmail.com</p></a>     
                  </li>
                  <li data-tooltip-id="tooltip" data-tooltip-content="9057288286, 9829143239">
                    <div className={Style.icon}><FaHeadset /></div>
                    <div className={Style.numberFlex}>
                      <a  href="tel:9057288286"><p className={Style.mobNone}>+91 90572 88286</p></a>
                      <a href="tel:9829143239" ><p className={Style.mobNone}>+91 98291 43239</p></a>
                    </div>
                  </li>
                   <li data-tooltip-id="tooltip" data-tooltip-content="Mon to Sat: 9:00 AM – 2:00 PM , 5:00 PM – 7:00 PM, Sun: 9 AM – 2 PM">
                    <div className={Style.icon}><FiClock /></div>
                    <div>
                      <p className={Style.mobNone}>Mon to Sat: 9 AM – 2 PM , 5 PM – 7 PM  </p>
                      <p className={Style.mobNone}> Sun: 9 AM – 2 PM</p>
                    </div>
                  </li>
                  <li>
                    <button data-tooltip-id="tooltip" data-tooltip-content="Book Appointment" onClick={bookingHandler} type="button" className={Style.bookBtn} aria-label="Book Appointment">
                      <span className={Style.icon}><IoCalendarOutline /></span> <p className={Style.mobNone}>Book Appointment</p></button>
                  </li>
                 
                </ul>
              </address>
            </Col>
          </Row>
        </Container>
      </div>
      <div className={Style.mainHeader}>
        <Container>
          <Row>
            <Col>
              <div className={'flexCenter ' + Style.navBar}>
                <div className={Style.logo}>
                  <Link to="/" aria-label="Namokar Hospital Home">
                    <img src={Logo} alt="Namokar Hospital Home" />
                  </Link>
                </div>
                 <button className={Style.menuBtn} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Menu">
                  {menuOpen ? <IoClose /> : <CiMenuBurger />}
                </button>
                <nav aria-label="Primary Navigation" className={`${Style.navMenu} ${menuOpen ? Style.showMenu : ""}`}>
                  <ul className="flexCenter">
                    <li><NavLink onClick={closeMenu} to="/" title="Home">Home</NavLink></li>
                    <li><NavLink onClick={closeMenu} to="/about" title="About Us">About Us</NavLink></li>
                    <li><NavLink onClick={closeMenu} to="/services" title="Services">Services</NavLink></li>
                    {/* <li><NavLink onClick={closeMenu} to="/news" title="news">News</NavLink></li> */}
                    <li><NavLink onClick={closeMenu} to="/videos" title="Videos">Videos</NavLink></li>
                    <li><NavLink onClick={closeMenu} to="/book-appointment" title="Contact Us">Contact Us</NavLink></li>
                  </ul>
                </nav>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </header>
    {booking &&
      <div className={Style.bookingOverLay}>
        <div className={Style.bookingPop}>
          <BookingForm close={closeBooking} />
        </div>
      </div>
    }
    </>
  )
}

export default Header;