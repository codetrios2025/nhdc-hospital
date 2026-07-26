import React from "react";
import { IoCalendarOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { MdCalendarMonth, MdAlternateEmail, MdOutlineSpeakerNotes } from "react-icons/md";
import { IoMaleFemaleSharp } from "react-icons/io5";
import { LiaPhoneSolid } from "react-icons/lia";
import { PiCalendarCheckLight } from "react-icons/pi";
import { SlOrganization, SlLocationPin } from "react-icons/sl";
import { FaUserDoctor, FaRegCalendarCheck  } from "react-icons/fa6";
import { HiCalendarDateRange } from "react-icons/hi2";
import { IoMdTime, IoMdInformationCircleOutline } from "react-icons/io";
import { GrPowerReset } from "react-icons/gr";
import Style from '../CSS/Global.module.css';
import { IoCloseOutline } from "react-icons/io5";


const BookingForm = ({close})=>{
  return(
    <div className={Style.bookingForm}>
      <div className={Style.formHead}>
        <div className={Style.icon}><FaRegCalendarCheck /></div>
        <div>
          <h2>Book an Appointment</h2>
          <p>Fill in your details to book an appointment</p>
        </div>
        <button type="" className={Style.closeBtn} onClick={close}><IoCloseOutline /></button>
      </div>
      <form>
        <div className={Style.formGroup}>
          <div className={Style.groupElem}>
            <label>Patient Name <sub>*</sub></label>
            <span className={Style.icon}><FiUser /></span>
            <input type="text" placeholder="Enter patient full name"  />
          </div>
          <div className={Style.groupElem}>
            <label>Age <sub>*</sub></label>
            <span className={Style.icon}><MdCalendarMonth /></span>
            <input type="text" placeholder="Enter age"  />
          </div>
        </div>
        <div className={Style.formGroup}>
          <div className={Style.groupElem}>
            <label>Gender <sub>*</sub></label>
            <span className={Style.icon}><IoMaleFemaleSharp /></span>
            <select>
              <option>Select gender</option>
            </select>
          </div>
          <div className={Style.groupElem}>
            <label>Contact Number <sub>*</sub></label>
            <span className={Style.icon}><LiaPhoneSolid /></span>
            <input type="number" placeholder="Enter 10-digit mobile number"  />
          </div>
        </div>
        <div className={Style.formGroup}>
          <div className={Style.groupElem}>
            <label>Email Address</label>
            <span className={Style.icon}><MdAlternateEmail /></span>
            <input type="email" placeholder="Enter email address"  />
          </div>
          {/* <div className={Style.groupElem}>
            <label>Appointment For <sub>*</sub></label>
            <span className={Style.icon}><PiCalendarCheckLight /></span>
            <select>
              <option>Select appointment type</option>
            </select>
          </div> */}
        </div>
        
        <div className={Style.formGroup}>
          <div className={Style.groupElem}>
            <label>Preferred Date <sub>*</sub></label>
            <span className={Style.icon}><HiCalendarDateRange /></span>
            <input type="date" placeholder="Select preferred date"  />
          </div>
          {/* <div className={Style.groupElem}>
            <label>Preferred Time <sub>*</sub></label>
            <span className={Style.icon}><IoMdTime /></span>
            <input type="time" placeholder="Enter age"  />
          </div> */}
        </div>
        <div className={Style.formGroup}>
          <div className={Style.groupElem}>
            <label>Address</label>
            <span className={Style.icon}><SlLocationPin /></span>
            <input type="text" placeholder="Enter your complete address"  />
          </div>
        </div>
        <div className={Style.formGroup}>
          <div className={Style.groupElem}>
            <label>Reason for Visit</label>
            <span className={Style.icon}><MdOutlineSpeakerNotes /></span>
            <textarea placeholder="Enter your reason for visit"></textarea>
          </div>
        </div>
        <div className={Style.nots}>
          <span className={Style.icon}><IoMdInformationCircleOutline /></span>
          <div className={Style.text}>
            <h6>Please Note</h6>
            <p>Our team will contact you to confirm your appointment.</p>
          </div>
        </div>
        <div className={Style.formBtn}>
          <button type="button" className={'flexCenter  ' + Style.resetBtn}>
            <div className={Style.icon}><GrPowerReset /></div>Reset
          </button>
          <button type="button" className={'flexCenter  ' + Style.primeryBtn}>
            <div className={Style.icon}><IoCalendarOutline /></div>Submit Booking
          </button>
        </div>
      </form>
    </div>
  )
}

export default BookingForm;