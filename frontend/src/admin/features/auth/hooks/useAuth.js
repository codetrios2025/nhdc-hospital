import { useDispatch, useSelector } from "react-redux";

import { loginSuccess, logout, setProfile } from "../../../redux/authSlice";

const useAuth = () => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  const login = (payload) => {
    dispatch(loginSuccess(payload));
  };

  const profile = (payload) => {
    dispatch(setProfile(payload));
  };

  const signOut = () => {
    dispatch(logout());
  };

  return {
    ...auth,

    login,

    profile,

    signOut,
  };
};

export default useAuth;
