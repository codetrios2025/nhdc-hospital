import { FaTrash } from "react-icons/fa";

import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";

const DeleteButton = ({ onDelete }) => {
  const handleDelete = async () => {
    const result = await ConfirmDialog({
      title: "Delete Record",

      text: "This action cannot be undone.",
    });

    if (result.isConfirmed) {
      onDelete();
    }
  };

  return (
    <button className="btn btn-danger" onClick={handleDelete}>
      <FaTrash />
    </button>
  );
};

export default DeleteButton;
