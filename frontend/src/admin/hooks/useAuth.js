import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { loginSuccess, initialize } from "../redux/slices/authSlice";

import authStorage from "../utils/authStorage";

export default function useAuth() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = authStorage.getToken();
    const user = authStorage.getUser();

    if (token && user) {
      dispatch(
        loginSuccess({
          token,
          user,
        }),
      );
    }

    dispatch(initialize());
  }, [dispatch]);
}
