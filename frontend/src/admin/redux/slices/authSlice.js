import { createSlice } from "@reduxjs/toolkit";
import authStorage from "../../utils/storage";

const initialState = {
  loading: false,
  initialized: false,

  token: authStorage.getToken(),
  user: authStorage.getUser(),

  isAuthenticated: !!authStorage.getToken(),

  error: null,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    initialize(state) {
      state.initialized = true;
    },
    loginSuccess(state, action) {
      state.loading = false;

      state.initialized = true;

      state.token = action.payload.token;

      state.user = action.payload.user;

      state.error = null;

      state.isAuthenticated = true;

      //authStorage.save(action.payload.token, action.payload.user);
      authStorage.setToken(action.payload.token);
      authStorage.setUser(action.payload.user);
    },

    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    logout(state) {
      state.loading = false;

      state.user = null;

      state.token = null;

      state.error = null;

      state.isAuthenticated = false;

      state.initialized = true;

      authStorage.clear();
    },

    setProfile(state, action) {
      state.user = action.payload;

      state.initialized = true;

      state.isAuthenticated = true;
    },
  },
});

export const {
  loginStart,
  initialize,
  loginSuccess,
  loginFailure,
  logout,
  setProfile,
} = authSlice.actions;

export default authSlice.reducer;
