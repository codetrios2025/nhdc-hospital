const ContactSettings = ({ register }) => {
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header">
        <h5 className="mb-0">Settings</h5>
      </div>

      <div className="card-body">
        {/* Status */}
        <div className="form-check form-switch mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="isActive"
            {...register("isActive")}
          />

          <label className="form-check-label" htmlFor="isActive">
            Active
          </label>
        </div>

        <hr />

        <div className="small text-muted">
          <p className="mb-2">
            <strong>Status:</strong>
          </p>

          <ul className="ps-3 mb-0">
            <li>
              <strong>Active</strong> - Contact information will be displayed on
              the website.
            </li>

            <li className="mt-2">
              <strong>Inactive</strong> - Contact information will be hidden
              from the website.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContactSettings;
