const DepartmentDetailsCard = ({ department }) => {
  return (
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

              <td
                dangerouslySetInnerHTML={{
                  __html: department.description || "",
                }}
              />
            </tr>

            <tr>
              <th>Sort Order</th>

              <td>{department.sortOrder}</td>
            </tr>

            <tr>
              <th>Featured</th>

              <td>
                {department.featured ? (
                  <span className="badge bg-success">Yes</span>
                ) : (
                  <span className="badge bg-secondary">No</span>
                )}
              </td>
            </tr>

            <tr>
              <th>Status</th>

              <td>
                {department.status ? (
                  <span className="badge bg-success">Active</span>
                ) : (
                  <span className="badge bg-danger">Inactive</span>
                )}
              </td>
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

              <td>
                {Array.isArray(department.seoKeywords)
                  ? department.seoKeywords.join(", ")
                  : ""}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DepartmentDetailsCard;
