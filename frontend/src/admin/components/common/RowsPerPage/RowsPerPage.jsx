const RowsPerPage = ({
  value,

  onChange,
}) => {
  return (
    <div className="d-flex align-items-center gap-2">
      <span>Rows</span>

      <select
        className="form-select"
        style={{ width: 90 }}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        <option>10</option>

        <option>20</option>

        <option>50</option>

        <option>100</option>
      </select>
    </div>
  );
};

export default RowsPerPage;
