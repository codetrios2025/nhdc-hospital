import { Controller } from "react-hook-form";

import RichTextEditor from "../../../components/common/RichTextEditor";

const ServiceContent = ({ register, control }) => {
  return (
    <>
      {/* Short Description */}

      <div className="card mb-4">
        <div className="card-header">
          <h5>Short Description</h5>
        </div>

        <div className="card-body">
          <textarea
            rows={4}
            className="form-control"
            placeholder="Enter short description"
            {...register("shortDescription")}
          />
        </div>
      </div>

      {/* Full Description */}

      <div className="card mb-4">
        <div className="card-header">
          <h5>Description</h5>
        </div>

        <div className="card-body">
          <Controller
            control={control}
            name="description"
            defaultValue=""
            render={({ field }) => (
              <RichTextEditor
                value={field.value}
                onChange={field.onChange}
                placeholder="Enter complete service details..."
              />
            )}
          />
        </div>
      </div>
    </>
  );
};

export default ServiceContent;
