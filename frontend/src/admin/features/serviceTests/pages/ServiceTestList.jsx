import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchServiceTests,
  deleteServiceTest,
} from "../../../redux/thunks/serviceTestThunk";

import ServiceTestTable from "../components/ServiceTestTable";
import ServiceTestFilters from "../components/ServiceTestFilters";

import useDebounce from "../../../hooks/useDebounce";

const ServiceTestList = () => {
  const dispatch = useDispatch();

  const { tests, loading, error, pagination } = useSelector(
    (state) => state.serviceTests,
  );

  const [keyword, setKeyword] = useState("");

  const [service, setService] = useState("");

  const [status, setStatus] = useState("");

  const [page, setPage] = useState(1);

  const [limit, setLimit] = useState(10);

  const debouncedKeyword = useDebounce(keyword, 500);

  /*
  |--------------------------------------------------------------------------
  | Fetch Listing
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    dispatch(
      fetchServiceTests({
        page,
        limit,
        keyword: debouncedKeyword,
        service,
        status,
      }),
    );
  }, [dispatch, page, limit, debouncedKeyword, service, status]);

  /*
  |--------------------------------------------------------------------------
  | Reload
  |--------------------------------------------------------------------------
  */

  const reloadTests = () => {
    dispatch(
      fetchServiceTests({
        page: pagination.page,
        limit: pagination.limit,
        keyword: debouncedKeyword,
        service,
        status,
      }),
    );
  };

  /*
  |--------------------------------------------------------------------------
  | Delete
  |--------------------------------------------------------------------------
  */

  const handleDelete = async (id) => {
    await dispatch(deleteServiceTest(id));

    reloadTests();
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Service Test Management</h2>

          <p className="text-muted">Manage all service related tests.</p>
        </div>

        <Link to="/service-tests/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add Test
        </Link>
      </div>

      <ServiceTestFilters
        keyword={keyword}
        setKeyword={setKeyword}
        service={service}
        setService={setService}
        status={status}
        setStatus={setStatus}
        limit={limit}
        setLimit={setLimit}
      />

      {error && <div className="alert alert-danger">{error}</div>}

      <ServiceTestTable
        tests={tests}
        loading={loading}
        reloadTests={reloadTests}
        deleteTest={handleDelete}
      />

      {!loading && pagination.totalPages > 1 && (
        <div className="d-flex justify-content-end mt-3">
          <nav>
            <ul className="pagination">
              {Array.from({
                length: pagination.totalPages,
              }).map((_, index) => (
                <li
                  key={index}
                  className={`page-item ${page === index + 1 ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => setPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default ServiceTestList;
