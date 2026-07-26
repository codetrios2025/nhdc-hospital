import { Controller } from "react-hook-form";
import RichTextEditor from "../../../components/common/RichTextEditor";

const DoctorProfessionalInfo = ({ register, control, errors }) => {
  return (
    <>
      <div className="card mb-4">
        <div className="card-header">
          <h5>Professional Details</h5>
        </div>

        <div className="card-body">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Qualification</label>

              <input className="form-control" {...register("qualification")} />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Experience</label>

              <input
                type="number"
                className="form-control"
                {...register("experience")}
              />
            </div>
          </div>
        </div>
      </div>

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

      {/* Description */}

      <div className="card mb-4">
        <div className="card-header">
          <h5>Description</h5>
        </div>

        <div className="card-body">
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <RichTextEditor
                value={field.value}
                onChange={field.onChange}
                placeholder="Write complete doctor profile..."
              />
            )}
          />
        </div>
      </div>
    </>
  );
};

export default DoctorProfessionalInfo;
