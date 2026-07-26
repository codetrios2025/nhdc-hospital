import Swal from "sweetalert2";

const ConfirmDialog = ({
  title,

  text,

  confirmButtonText = "Yes",

  cancelButtonText = "Cancel",

  icon = "warning",
}) => {
  return Swal.fire({
    title,

    text,

    icon,

    showCancelButton: true,

    confirmButtonColor: "#E91E63",

    confirmButtonText,

    cancelButtonText,
  });
};

export default ConfirmDialog;
