import React, { useState, useEffect, useRef } from "react";
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
import { IoCloseOutline,IoCheckmarkCircle } from "react-icons/io5";

//API
import { postBooking } from "../../services/routes.services";
import ReCAPTCHA from "react-google-recaptcha";

const BookingForm = ({close, popup})=>{
  const [formData, setFormData] = useState({
    patientName: "",
    age: "",
    gender: "",
    mobile: "",
    email: "",
    address: "",
    department: "",
    doctor: "",
    appointmentDate: "",
    reason: "",
  });
  const captchaRef = useRef(null);
  const [captchaToken, setCaptchaToken] = useState("");
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };
  const validate = () => {
    const error = {};
    if (!formData.patientName.trim()) {
      error.patientName = "Patient name is required.";
    }
    if (!formData.age) {
      error.age = "Age is required.";
    } else if (formData.age < 1 || formData.age > 120) {
      error.age = "Enter valid age.";
    }
    if (!formData.gender) {
      error.gender = "Gender is required.";
    }
    if (!formData.mobile) {
      error.mobile = "Mobile number is required.";
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      error.mobile = "Enter valid mobile number.";
    }
    // Email is optional
    // But if user enters email, validate it
    if (formData.email &&!/^\S+@\S+\.\S+$/.test(formData.email)) {
      error.email = "Enter valid email.";
    }
    if (!formData.appointmentDate) {
      error.appointmentDate = "Appointment date is required.";
    }

    return error;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    if (!captchaToken) {
      alert("Please verify captcha that you are not a robot.");
      return;
    }
    try {
      setLoading(true);
      const payload = {
        patientName: formData.patientName,
        age: Number(formData.age),
        gender: formData.gender,
        mobile: formData.mobile,
        email: formData.email,
        address: formData.address,
        department: formData.department,
        doctor: formData.doctor,
        appointmentDate: formData.appointmentDate,
        reason: formData.reason,
        captchaToken
      };

      const res = await postBooking(payload);
      setSuccessMsg(res.data?.message || "Appointment booked successfully.");
      setFormData({
        patientName: "",
        age: "",
        gender: "",
        mobile: "",
        email: "",
        address: "",
        department: "",
        doctor: "",
        appointmentDate: "",
        reason: "",
      });
      setErrors({});
      captchaRef.current?.reset();
      setCaptchaToken("");

      setTimeout(() => {
        setSuccessMsg("");
        if (popup === true) {
          close();
        }
      }, 3000);

      //console.log(res.data.message)
    } catch (err) {
      console.log(err);
      alert("Something went wrong.");
      captchaRef.current?.reset();
      setCaptchaToken("");
    } finally {
      setLoading(false);
    }
  };
  const handleReset = () => {
    setFormData({
      patientName: "",
      age: "",
      gender: "",
      mobile: "",
      email: "",
      address: "",
      department: "",
      doctor: "",
      appointmentDate: "",
      reason: "",
    });
    setErrors({});
  };
  useEffect(() => {
    if (successMsg) {
      const timer = setTimeout(() => {
        setSuccessMsg("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMsg]);
  return(
    <div className={Style.bookingForm}>
      <div className={Style.formHead}>
        <div className={Style.icon}><FaRegCalendarCheck /></div>
        <div>
          <h2>Book an Appointment</h2>
          <p>Fill in your details to book an appointment</p>
        </div>
        <button type="button" className={'closeForm ' + Style.closeBtn} onClick={close}><IoCloseOutline /></button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className={Style.formGroup}>
          <div className={Style.groupElem}>
            <label>Patient Name <sub>*</sub></label>
            <span className={Style.icon}><FiUser /></span>
            <input type="text" name="patientName" value={formData.patientName} onChange={handleChange} placeholder="Enter patient full name"  />
            {errors.patientName && (<small className={Style.error}>{errors.patientName}</small>)}
          </div>
          <div className={Style.groupElem}>
            <label>Age <sub>*</sub></label>
            <span className={Style.icon}><MdCalendarMonth /></span>
            <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Enter age"  />
            {errors.age && (<small className={Style.error}>{errors.age}</small>)}
          </div>
        </div>
        <div className={Style.formGroup}>
          <div className={Style.groupElem}>
            <label>Gender <sub>*</sub></label>
            <span className={Style.icon}><IoMaleFemaleSharp /></span>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && (<small className={Style.error}>{errors.gender}</small>)}
          </div>
          <div className={Style.groupElem}>
            <label>Contact Number <sub>*</sub></label>
            <span className={Style.icon}><LiaPhoneSolid /></span>
            <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} maxLength={10} placeholder="Enter 10-digit mobile number"  />
            {errors.mobile && (<small className={Style.error}>{errors.mobile}</small>)}
          </div>
        </div>
        <div className={Style.formGroup}>
          <div className={Style.groupElem}>
            <label>Email Address</label>
            <span className={Style.icon}><MdAlternateEmail /></span>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email address"  />
            {errors.email && (<small className={Style.error}>{errors.email}</small>)}
          </div>
        </div>
        
        <div className={Style.formGroup}>
          <div className={Style.groupElem}>
            <label>Preferred Date <sub>*</sub></label>
            <span className={Style.icon}><HiCalendarDateRange /></span>
            <input type="date" name="appointmentDate" value={formData.appointmentDate} onChange={handleChange} placeholder="Select preferred date"  />
            {errors.appointmentDate && (
              <small className={Style.error}>
                {errors.appointmentDate}
              </small>
            )}
          </div>
        </div>
        <div className={Style.formGroup}>
          <div className={Style.groupElem}>
            <label>Address</label>
            <span className={Style.icon}><SlLocationPin /></span>
            <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Enter your complete address"  />
          </div>
        </div>
        <div className={Style.formGroup}>
          <div className={Style.groupElem}>
            <label>Reason for Visit</label>
            <span className={Style.icon}><MdOutlineSpeakerNotes /></span>
            <textarea name="reason" value={formData.reason} onChange={handleChange} placeholder="Enter your reason for visit"></textarea>
          </div>
        </div>
        <div className={`${Style.formGroup} ${Style.captcha}`}>
          <ReCAPTCHA
              ref={captchaRef}
              sitekey="6LdYL38tAAAAAKUULGXawuYC8pJdKsGl61U9B0zj"
              onChange={(token) => setCaptchaToken(token || "")}
              onExpired={() => setCaptchaToken("")}
              onErrored={() => setCaptchaToken("")}
            />
        </div>
        <div className={Style.nots}>
          <span className={Style.icon}><IoMdInformationCircleOutline /></span>
          <div className={Style.text}>
            <h6>Please Note</h6>
            <p>Our team will contact you to confirm your appointment.</p>
          </div>
        </div>
        <div className={Style.formBtn}>
          <button type="button" className={'flexCenter  ' + Style.resetBtn} onClick={handleReset}>
            <div className={Style.icon}><GrPowerReset /></div>Reset
          </button>
          <button type="submit" className={'flexCenter  ' + Style.primeryBtn}   disabled={loading}>
            <div className={Style.icon}><IoCalendarOutline /></div>{loading ? "Submitting..." : "Submit Booking"}
          </button>
        </div>
      </form>
      {/* {successMsg && <p className={Style.successMsg}><IoCheckmarkCircle />{successMsg}</p>} */}
      {successMsg && 
        <div className={Style.successfix}>
          <div className={Style.successMsg}>
          <IoCheckmarkCircle />
          <p>{successMsg} <br/>We will connect you soon</p>
          </div>
        </div>
      }
    </div>
  )
}

export default BookingForm;