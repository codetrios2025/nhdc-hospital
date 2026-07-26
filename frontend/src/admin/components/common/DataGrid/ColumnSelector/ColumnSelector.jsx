const ColumnSelector = ({
  columns,

  visibleColumns,

  onToggle,
}) => {
  return (
    <div className="dropdown">
      <button className="btn btn-outline-secondary" data-bs-toggle="dropdown">
        Columns
      </button>

      <div className="dropdown-menu p-3">
        {columns.map((column) => (
          <div className="form-check" key={column.key}>
            <input
              type="checkbox"
              className="form-check-input"
              checked={visibleColumns.includes(column.key)}
              onChange={() => onToggle(column.key)}
            />

            <label className="form-check-label">{column.title}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColumnSelector;
