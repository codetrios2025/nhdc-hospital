import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AppointmentFilters from "../components/AppointmentFilters";
import AppointmentTable from "../components/AppointmentTable";

import { fetchAppointments } from "../../../redux/thunks/appointmentThunk";

const AppointmentListPage = () => {
  const dispatch = useDispatch();

  const { appointments, pagination, filters, loading } = useSelector(
    (state) => state.appointments,
  );

  console.log("Redux appointments:", appointments);
  console.log("Redux pagination:", pagination);
  console.log("Redux filters:", filters);

  useEffect(() => {
    dispatch(
      fetchAppointments({
        page: pagination.page,
        limit: pagination.limit,
        ...filters,
      }),
    );
  }, [dispatch, pagination.page]);

  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Appointments</h4>

          <button
            className="btn btn-primary"
            onClick={() => {
              dispatch(
                fetchAppointments({
                  page: pagination.page,
                  limit: pagination.limit,
                  ...filters,
                }),
              );
            }}
          >
            Refresh
          </button>
        </div>

        <div className="card-body">
          <AppointmentFilters />

          <AppointmentTable loading={loading} appointments={appointments} />
        </div>
      </div>
    </div>
  );
};

export default AppointmentListPage;
