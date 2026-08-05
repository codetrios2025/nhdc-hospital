import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contact: null,

  loading: false,

  error: null,
};

const contactSlice = createSlice({
  name: "contact",

  initialState,

  reducers: {
    /*
    |--------------------------------------------------------------------------
    | Request Start
    |--------------------------------------------------------------------------
    */

    requestStart(state) {
      state.loading = true;
      state.error = null;
    },

    /*
    |--------------------------------------------------------------------------
    | Request Failure
    |--------------------------------------------------------------------------
    */

    requestFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    /*
    |--------------------------------------------------------------------------
    | Set Contact
    |--------------------------------------------------------------------------
    */

    setContact(state, action) {
      state.loading = false;
      state.contact = action.payload;
      state.error = null;
    },

    /*
    |--------------------------------------------------------------------------
    | Clear Contact
    |--------------------------------------------------------------------------
    */

    clearContact(state) {
      state.contact = null;
      state.error = null;
      state.loading = false;
    },

    /*
    |--------------------------------------------------------------------------
    | Reset State
    |--------------------------------------------------------------------------
    */

    resetContactState() {
      return initialState;
    },
  },
});

export const {
  requestStart,
  requestFailure,
  setContact,
  clearContact,
  resetContactState,
} = contactSlice.actions;

export default contactSlice.reducer;
