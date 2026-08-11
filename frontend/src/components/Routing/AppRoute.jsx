import { Routes, Route } from "react-router-dom";

import LayoutScreen from "../Common/Layout";
import ScrollTop from "../Common/ScrollTop";
import AosRoute from "../Common/AosRoute";
//Home Page
import HomeRoute from "../Home/HomeRoute";
//Pages
import AboutUs from "../Pages/About";
import Services from "../Pages/Service";
import ServiceDetail from "../Pages/ServicesDetail";
import BookAppointment from "../Booking/BookAppointmentPage";
import NHDCVideos from "../Pages/Videos";
import DrRajesh from "../Pages/DrRajesh";
import NotFound from "../Pages/404";
const AppRoute = () =>{
  return(
    <>
      <ScrollTop />
      <AosRoute />
      <Routes>
        <Route path='/' element={<LayoutScreen />}>
          <Route index element={<HomeRoute />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/services' element={<Services />} />
          <Route path='/service/:slug' element={<ServiceDetail />} />
          <Route path='/book-appointment' element={<BookAppointment />} />
          <Route path='/videos' element={<NHDCVideos />} />
          <Route path='/doctor/rajesh-jain' element={<DrRajesh />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}

export default AppRoute;