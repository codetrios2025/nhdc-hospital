const TableLoader = ({ rows = 5, columns = 7 }) => {
  return (
    <tbody>
      {[...Array(rows)].map((_, row) => (
        <tr key={row}>
          {[...Array(columns)].map((_, col) => (
            <td key={col}>
              <div className="placeholder-glow">
                <span className="placeholder col-12"></span>
              </div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableLoader;
