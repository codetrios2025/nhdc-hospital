import React from "react";

const HospitalHighlightTable = ({
  hospitalHighlights = [],
  onEdit,
  onDelete,
  onStatusChange,
}) => {
  return (
    <div className="card shadow-sm">
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th width="80">Order</th>
                <th width="120">Value</th>
                <th>Title</th>
                <th>Description</th>
                <th width="150">Icon</th>
                <th width="120">Status</th>
                <th width="170" className="text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {hospitalHighlights.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-5">
                    No Hospital Highlights Found
                  </td>
                </tr>
              ) : (
                hospitalHighlights.map((item) => (
                  <tr key={item._id}>
                    <td>{item.order}</td>

                    <td>
                      <strong>{item.value}</strong>
                    </td>

                    <td>{item.title}</td>

                    <td>
                      {item.description?.length > 80
                        ? `${item.description.substring(0, 80)}...`
                        : item.description}
                    </td>

                    <td>
                      <i className={`${item.icon} me-2`}></i>
                      <small>{item.icon}</small>
                    </td>

                    <td>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={item.isActive}
                          onChange={() =>
                            onStatusChange(item._id, !item.isActive)
                          }
                        />
                      </div>
                    </td>

                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => onEdit(item)}
                      >
                        <i className="pi pi-pencil"></i>
                      </button>

                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => onDelete(item)}
                      >
                        <i className="pi pi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HospitalHighlightTable;
