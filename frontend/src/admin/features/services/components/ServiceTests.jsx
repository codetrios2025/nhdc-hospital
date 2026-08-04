import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchServiceTests,
  deleteServiceTest,
} from "../../../redux/thunks/serviceTestThunk";

import ServiceTestForm from "../../serviceTests/pages/ServiceTestForm";
import ServiceTestTable from "../../serviceTests/components/ServiceTestTable";

const ServiceTests = ({ serviceId }) => {
  const dispatch = useDispatch();

  const { tests, loading } = useSelector((state) => state.serviceTests);

  console.log("Redux tests:", tests);

  const [editingTest, setEditingTest] = useState(null);

  /*
  ----------------------------------------
  Load Tests
  ----------------------------------------
  */

  const loadTests = () => {
    dispatch(
      fetchServiceTests({
        service: serviceId,
        limit: 1000,
      }),
    );
  };

  useEffect(() => {
    if (serviceId) {
      loadTests();
    }
  }, [serviceId]);

  /*
  ----------------------------------------
  Delete
  ----------------------------------------
  */

  const handleDelete = async (id) => {
    await dispatch(deleteServiceTest(id));

    loadTests();
  };

  return (
    <div className="card mt-4">
      <div className="card-header">
        <div className="d-flex justify-content-between">
          <h5>
            Related Tests
            <span className="badge bg-primary ms-2">{tests.length}</span>
          </h5>

          {editingTest && (
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setEditingTest(null)}
            >
              Add New Test
            </button>
          )}
        </div>
      </div>

      <div className="card-body">
        <ServiceTestForm
          serviceId={serviceId}
          editTest={editingTest}
          onSaved={() => {
            setEditingTest(null);

            loadTests();
          }}
        />

        <hr className="my-4" />

        <ServiceTestTable
          tests={tests}
          loading={loading}
          reloadTests={loadTests}
          deleteTest={handleDelete}
          onEdit={setEditingTest}
        />
      </div>
    </div>
  );
};

export default ServiceTests;
