import { useFieldArray } from "react-hook-form";

const ServiceFeatures = ({ control, register }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "features",
  });

  return (
    <div className="card mb-4">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Service Features</h5>

        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => append("")}
        >
          <i className="bi bi-plus-circle me-1"></i>
          Add Feature
        </button>
      </div>

      <div className="card-body">
        {fields.length === 0 && (
          <div className="text-muted">No features added.</div>
        )}

        {fields.map((field, index) => (
          <div className="input-group mb-3" key={field.id}>
            <input
              className="form-control"
              placeholder="Feature"
              {...register(`features.${index}`)}
            />

            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() => remove(index)}
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceFeatures;
