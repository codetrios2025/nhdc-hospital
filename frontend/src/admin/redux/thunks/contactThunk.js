import contactApi from "../../features/contact/api/contactApi";

import {
  requestStart,
  requestFailure,
  setContact,
} from "../slices/contactSlice";

/*
|--------------------------------------------------------------------------
| Get Contact Details
|--------------------------------------------------------------------------
*/

export const fetchContact = () => async (dispatch) => {
  try {
    dispatch(requestStart());

    const response = await contactApi.getContact();

    console.log("========== CONTACT RESPONSE ==========");
    console.log(response);
    console.log("======================================");

    const data = response?.data?.data ?? response?.data ?? null;

    dispatch(setContact(data));

    return data;
  } catch (error) {
    console.log("========== CONTACT ERROR ==========");
    console.log(error);
    console.log(error?.response);
    console.log(error?.response?.data);
    console.log("===================================");

    dispatch(
      requestFailure(
        error?.response?.data?.message ||
          error.message ||
          "Unable to fetch contact details.",
      ),
    );

    throw error;
  }
};

/*
|--------------------------------------------------------------------------
| Save Contact Details
|--------------------------------------------------------------------------
*/

export const saveContact = (payload) => async (dispatch) => {
  try {
    dispatch(requestStart());

    const response = await contactApi.saveContact(payload);

    dispatch(setContact(response.data.data || response.data));

    return response;
  } catch (error) {
    dispatch(
      requestFailure(
        error.response?.data?.message ||
          error.message ||
          "Unable to save contact details.",
      ),
    );

    throw error;
  }
};
