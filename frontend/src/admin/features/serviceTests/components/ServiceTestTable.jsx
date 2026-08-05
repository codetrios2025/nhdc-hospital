import { DataTable } from "../../../components/common/DataTable";

import ServiceTestStatusSwitch from "./ServiceTestStatusSwitch";
import ServiceTestActionButtons from "./ServiceTestActionButtons";

const ServiceTestTable = ({
  tests = [],
  loading = false,
  reloadTests,
  deleteTest,
  onEdit,
}) => {
  const columns = [
    {
      key: "image",
      label: "Image",
    },
    {
      key: "testName",
      label: "Test",
    },
    {
      key: "service",
      label: "Service",
    },
    {
      key: "displayOrder",
      label: "Order",
    },
    {
      key: "status",
      label: "Status",
    },
    {
      key: "action",
      label: "Action",
    },
  ];
  console.log("Table tests:", tests);
  return (
    <DataTable
      columns={columns}
      data={tests}
      loading={loading}
      emptyMessage="No service tests found."
      renderRow={(test) => (
        <tr key={test._id}>
          {/* Image */}

          <td width="90">
            <img
              src={test.imageUrl || "/default-image.png"}
              alt={test.testName}
              width="70"
              height="70"
              className="rounded border"
              style={{
                objectFit: "cover",
              }}
            />
          </td>

          {/* Test */}

          <td>
            <div className="fw-semibold">{test.testName}</div>

            {test.subtitle && (
              <small className="text-muted">{test.subtitle}</small>
            )}
          </td>

          {/* Service */}

          <td>{test.service?.title || test.serviceTitle || "-"}</td>

          {/* Display Order */}

          <td>
            <span className="badge bg-secondary">{test.displayOrder}</span>
          </td>

          {/* Status */}

          <td>
            <ServiceTestStatusSwitch test={test} onUpdated={reloadTests} />
          </td>

          {/* Action */}

          <td>
            <ServiceTestActionButtons
              test={test}
              onEdit={onEdit}
              onDelete={deleteTest}
            />
          </td>
        </tr>
      )}
    />
  );
};

export default ServiceTestTable;
