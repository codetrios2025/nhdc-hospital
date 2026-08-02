import { useDispatch } from "react-redux";

import ToggleSwitch from "../../../components/common/ToggleSwitch";

import DiagnosticActionButtons from "./DiagnosticActionButtons";

import {
  changeDiagnosticStatus,
  updateDiagnosticOrder,
} from "../../../redux/thunks/diagnosticThunk";

const DiagnosticTable = ({
  diagnostics,
  loading,
  reloadDiagnostics,
  deleteDiagnostic,
  page,
  limit,
}) => {
  const dispatch = useDispatch();

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border"></div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Icon</th>
              <th>Title</th>
              <th>Description</th>
              <th>Order</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {diagnostics.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center">
                  No Diagnostic Services Found
                </td>
              </tr>
            )}

            {diagnostics.map((item, index) => (
              <tr key={item._id}>
                <td>{(page - 1) * limit + index + 1}</td>

                <td>
                  <i
                    className={`${item.icon} ${item.iconColor || "text-primary"}`}
                    style={{ fontSize: "28px" }}
                  ></i>
                </td>

                <td>{item.title}</td>

                <td>{item.shortDescription}</td>

                <td>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    defaultValue={item.displayOrder}
                    onBlur={async (e) => {
                      const value = Number(e.target.value);

                      if (value === item.displayOrder) return;

                      await dispatch(updateDiagnosticOrder(item._id, value));

                      reloadDiagnostics();
                    }}
                  />
                </td>

                <td>
                  <ToggleSwitch
                    checked={item.status}
                    onChange={async () => {
                      await dispatch(
                        changeDiagnosticStatus(item._id, !item.status),
                      );

                      reloadDiagnostics();
                    }}
                  />
                </td>

                <td>
                  <DiagnosticActionButtons
                    diagnostic={item}
                    onDelete={deleteDiagnostic}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DiagnosticTable;
