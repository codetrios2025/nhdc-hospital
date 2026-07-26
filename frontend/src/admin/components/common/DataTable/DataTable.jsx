import TableLoader from "./TableLoader";
import TableEmpty from "./TableEmpty";

const DataTable = ({ columns, data, loading, emptyMessage, renderRow }) => {
  return (
    <div className="card">
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key}>{column.label}</th>
              ))}
            </tr>
          </thead>

          {loading ? (
            <TableLoader columns={columns.length} />
          ) : data.length === 0 ? (
            <TableEmpty message={emptyMessage} />
          ) : (
            <tbody>{data.map(renderRow)}</tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default DataTable;
