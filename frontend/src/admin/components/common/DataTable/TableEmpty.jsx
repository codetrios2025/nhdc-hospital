const TableEmpty = ({ message }) => {
  return (
    <tbody>
      <tr>
        <td colSpan="100%" className="text-center py-5">
          <h5 className="text-muted">{message || "No Records Found"}</h5>
        </td>
      </tr>
    </tbody>
  );
};

export default TableEmpty;
