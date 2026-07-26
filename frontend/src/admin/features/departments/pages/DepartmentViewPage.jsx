import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchDepartment } from "../../../redux/thunks/departmentThunk";
import { clearDepartment } from "../../../redux/slices/departmentSlice";

const DepartmentViewPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { department, loading } = useSelector((state) => state.departments);

  useEffect(() => {
    dispatch(fetchDepartment(id));

    return () => {
      dispatch(clearDepartment());
    };
  }, [dispatch, id]);

  if (loading || !department) {
    return (
      <div className="container-fluid py-5 text-center">
        <div className="spinner-border text-primary" />
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3>{department.name}</h3>
          <p className="text-muted mb-0">Department Details</p>
        </div>

        <div>
          <Link
            to={`/departments/edit/${department._id}`}
            className="btn btn-warning me-2"
          >
            Edit
          </Link>

          <Link to="/departments" className="btn btn-secondary">
            Back
          </Link>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <table className="table">
            <tbody>
              <tr>
                <th width="220">Department Name</th>
                <td>{department.name}</td>
              </tr>

              <tr>
                <th>Slug</th>
                <td>{department.slug}</td>
              </tr>

              <tr>
                <th>Short Description</th>
                <td>{department.shortDescription}</td>
              </tr>

              <tr>
                <th>Description</th>
                <td>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: department.description,
                    }}
                  />
                </td>
              </tr>

              <tr>
                <th>Sort Order</th>
                <td>{department.sortOrder}</td>
              </tr>

              <tr>
                <th>Featured</th>
                <td>{department.featured ? "Yes" : "No"}</td>
              </tr>

              <tr>
                <th>Status</th>
                <td>{department.status ? "Active" : "Inactive"}</td>
              </tr>

              <tr>
                <th>SEO Title</th>
                <td>{department.seoTitle}</td>
              </tr>

              <tr>
                <th>SEO Description</th>
                <td>{department.seoDescription}</td>
              </tr>

              <tr>
                <th>SEO Keywords</th>
                <td>{department.seoKeywords?.join(", ")}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DepartmentViewPage;
