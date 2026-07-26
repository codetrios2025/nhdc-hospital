import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import authApi from "../api/authApi";

import { setProfile, logout } from "../../../redux/slices/authSlice";
import storage from "../../../utils/storage";

const useInitializeAuth = () => {
  const dispatch = useDispatch();

  //const { token } = useSelector((state) => state.auth);

  const token = storage.getToken();

  useEffect(() => {
    const init = async () => {
      if (!token) {
        dispatch(logout());
        return;
      }

      try {
        const response = await authApi.profile();

        //dispatch(setProfile(response.data));
        dispatch(setProfile(storage.getUser()));
      } catch (error) {
        console.error("Auth initialization failed:", error);

        dispatch(logout());
      }
    };

    init();
  }, [dispatch, token]);
};

export default useInitializeAuth;
