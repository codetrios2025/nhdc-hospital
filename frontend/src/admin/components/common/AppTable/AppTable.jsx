import Loader from "../Loader/Loader";
import EmptyState from "../EmptyState/EmptyState";
import "./AppTable.scss";

const AppTable = ({
  columns = [],

  data = [],

  loading = false,

  selectable = true,

  actions,

  onRowClick,
}) => {
  if (loading) {
    return <Loader />;
  }

  if (!loading && data.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="app-table-wrapper">
      <table className="app-table">
        <thead>
          <tr>
            {selectable && (
              <th>
                <input type="checkbox" />
              </th>
            )}

            {columns.map((column) => (
              <th key={column.key}>{column.title}</th>
            ))}

            {actions && <th>Action</th>}
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr key={index} onClick={() => onRowClick?.(row)}>
              {selectable && (
                <td>
                  <input type="checkbox" />
                </td>
              )}

              {columns.map((column) => (
                <td key={column.key}>
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}

              {actions && <td>{actions(row)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppTable;
