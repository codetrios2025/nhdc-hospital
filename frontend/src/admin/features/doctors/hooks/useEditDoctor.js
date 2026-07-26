import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchDoctor } from "../../../redux/thunks/doctorThunk";

const useEditDoctor = (doctorId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (doctorId) {
      dispatch(fetchDoctor(doctorId));
    }
  }, [doctorId, dispatch]);
};

export default useEditDoctor;
