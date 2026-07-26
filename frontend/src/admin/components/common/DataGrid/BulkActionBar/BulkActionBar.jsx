import AppButton from "../AppButton/AppButton";

const BulkActionBar = ({
  selectedCount,

  onDelete,

  onActivate,

  onDeactivate,
}) => {
  if (selectedCount === 0) {
    return null;
  }

  return (
    <div className="alert alert-primary d-flex justify-content-between align-items-center">
      <div>
        <strong>{selectedCount}</strong>
        selected
      </div>

      <div className="d-flex gap-2">
        <AppButton variant="danger" onClick={onDelete}>
          Delete
        </AppButton>

        <AppButton variant="success" onClick={onActivate}>
          Activate
        </AppButton>

        <AppButton variant="outline" onClick={onDeactivate}>
          Deactivate
        </AppButton>
      </div>
    </div>
  );
};

export default BulkActionBar;
