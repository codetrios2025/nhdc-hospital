import { useDispatch, useSelector } from "react-redux";

import { setFilters } from "../../../redux/slices/appointmentSlice";
import { fetchAppointments } from "../../../redux/thunks/appointmentThunk";

const AppointmentFilters = () => {
  const dispatch = useDispatch();

  const { filters, pagination } = useSelector((state) => state.appointments);

  const handleChange = (e) => {
    const newFilters = {
      ...filters,
      [e.target.name]: e.target.value,
    };

    dispatch(setFilters(newFilters));

    dispatch(
      fetchAppointments({
        page: pagination.page,
        limit: pagination.limit,
        ...newFilters,
      }),
    );
  };

  return (
    <div className="row mb-3">
      <div className="col-md-4">
        <input
          className="form-control"
          placeholder="Search patient..."
          name="search"
          value={filters.search}
          onChange={handleChange}
        />
      </div>

      <div className="col-md-3">
        <select
          className="form-select"
          name="status"
          value={filters.status}
          onChange={handleChange}
        >
          <option value="">All Status</option>

          <option value="New">New</option>

          <option value="Confirmed">Confirmed</option>

          <option value="Visited">Visited</option>

          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <div className="col-md-3">
        <input
          type="date"
          className="form-control"
          name="appointmentDate"
          value={filters.appointmentDate}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default AppointmentFilters;
