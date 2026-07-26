import { Controller } from "react-hook-form";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import useDepartmentForm from "../hooks/useDepartmentForm";

const DepartmentForm = ({ department = null, onSuccess }) => {
  const { register, control, handleSubmit, errors, submitting, onSubmit } =
    useDepartmentForm({
      department,
      onSuccess,
    });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        {/* Department Name */}

        <div className="col-md-6 mb-3">
          <label className="form-label">
            Department Name <span className="text-danger">*</span>
          </label>

          <input
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            placeholder="Department Name"
            {...register("name")}
          />

          {errors.name && (
            <div className="invalid-feedback">{errors.name.message}</div>
          )}
        </div>

        {/* Sort Order */}

        <div className="col-md-3 mb-3">
          <label className="form-label">Sort Order</label>

          <input
            type="number"
            className="form-control"
            {...register("sortOrder")}
          />
        </div>

        {/* Status */}

        <div className="col-md-3 mb-3">
          <label className="form-label d-block">Status</label>

          <div className="form-check form-switch mt-2">
            <input
              className="form-check-input"
              type="checkbox"
              {...register("status")}
            />

            <label className="form-check-label">Active</label>
          </div>
        </div>
      </div>

      {/* Short Description */}

      <div className="mb-3">
        <label className="form-label">Short Description</label>

        <textarea
          rows="3"
          className="form-control"
          {...register("shortDescription")}
        />
      </div>

      {/* Description */}

      <div className="mb-3">
        <label className="form-label">Description</label>

        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <CKEditor
              editor={ClassicEditor}
              data={field.value || ""}
              onChange={(event, editor) => {
                field.onChange(editor.getData());
              }}
            />
          )}
        />
      </div>

      {/* Featured */}

      <div className="mb-4">
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            {...register("featured")}
          />

          <label className="form-check-label">Featured Department</label>
        </div>
      </div>

      <hr />

      <h5 className="mb-3">SEO Information</h5>

      {/* SEO Title */}

      <div className="mb-3">
        <label className="form-label">SEO Title</label>

        <input type="text" className="form-control" {...register("seoTitle")} />
      </div>

      {/* SEO Description */}

      <div className="mb-3">
        <label className="form-label">SEO Description</label>

        <textarea
          rows="3"
          className="form-control"
          {...register("seoDescription")}
        />
      </div>

      {/* SEO Keywords */}

      <div className="mb-4">
        <label className="form-label">SEO Keywords</label>

        <input
          type="text"
          className="form-control"
          placeholder="heart, cardiology, hospital"
          {...register("seoKeywords")}
        />

        <small className="text-muted">Enter comma separated keywords.</small>
      </div>

      {/* Buttons */}

      <div className="d-flex justify-content-end">
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span>
              Saving...
            </>
          ) : (
            "Save Department"
          )}
        </button>
      </div>
    </form>
  );
};

export default DepartmentForm;
