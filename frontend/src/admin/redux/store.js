import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import dashboardReducer from "./slices/dashboardSlice";
import doctorReducer from "./slices/doctorSlice";
import videoReducer from "./slices/videoSlice";
import serviceReducer from "./slices/serviceSlice";
import appointmentReducer from "./slices/appointmentSlice";
import departmentReducer from "./slices/departmentSlice";
import homeFeatureReducer from "./slices/homeFeatureSlice";
import diagnosticReducer from "./slices/diagnosticSlice";
import bannerReducer from "./slices/bannerSlice";
import serviceTests from "./slices/serviceTestSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    doctor: doctorReducer,
    dashboard: dashboardReducer,
    video: videoReducer,
    service: serviceReducer,
    appointments: appointmentReducer,
    departments: departmentReducer,
    homeFeatures: homeFeatureReducer,
    diagnostic: diagnosticReducer,
    banner: bannerReducer,
    serviceTests: serviceTests,
  },
});

export default store;
