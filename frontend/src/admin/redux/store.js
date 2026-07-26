import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import dashboardReducer from "./slices/dashboardSlice";
import doctorReducer from "./slices/doctorSlice";
import videoReducer from "./slices/videoSlice";
import serviceReducer from "./slices/serviceSlice";
import appointmentReducer from "./slices/appointmentSlice";
import departmentReducer from "./slices/departmentSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    doctor: doctorReducer,
    dashboard: dashboardReducer,
    video: videoReducer,
    service: serviceReducer,
    appointments: appointmentReducer,
    departments: departmentReducer,
  },
});

export default store;
