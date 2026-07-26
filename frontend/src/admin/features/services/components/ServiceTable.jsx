import { DataTable } from "../../../components/common/DataTable";

import ServiceStatusSwitch from "./ServiceStatusSwitch";
import ServiceFeaturedSwitch from "./ServiceFeaturedSwitch";
import ServiceHomeSwitch from "./ServiceHomeSwitch";
import ServiceActionButtons from "./ServiceActionButtons";

const ServiceTable = ({
  services = [],
  loading = false,
  reloadServices,
  deleteService,
}) => {
  const columns = [
    {
      key: "image",
      label: "Image",
    },
    {
      key: "title",
      label: "Service",
    },
    {
      key: "department",
      label: "Department",
    },
    {
      key: "order",
      label: "Order",
    },
    {
      key: "home",
      label: "Home",
    },
    {
      key: "featured",
      label: "Featured",
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

  return (
    <DataTable
      columns={columns}
      data={services}
      loading={loading}
      emptyMessage="No services found."
      renderRow={(service) => (
        <tr key={service._id}>
          {/* Image */}

          <td width="90">
            <img
              src={service.imageUrl || "/default-service.webp"}
              alt={service.title}
              width="70"
              height="70"
              className="rounded border"
              style={{
                objectFit: "cover",
              }}
            />
          </td>

          {/* Title */}

          <td>
            <div className="fw-semibold">{service.title}</div>

            <small className="text-muted">{service.shortDescription}</small>
          </td>

          {/* Department */}

          <td>{service.department}</td>

          {/* Display Order */}

          <td>
            <span className="badge bg-info">{service.displayOrder}</span>
          </td>

          {/* Home */}

          <td>
            <ServiceHomeSwitch service={service} onUpdated={reloadServices} />
          </td>

          {/* Featured */}

          <td>
            <ServiceFeaturedSwitch
              service={service}
              onUpdated={reloadServices}
            />
          </td>

          {/* Status */}

          <td>
            <ServiceStatusSwitch service={service} onUpdated={reloadServices} />
          </td>

          {/* Action */}

          <td>
            <ServiceActionButtons service={service} onDelete={deleteService} />
          </td>
        </tr>
      )}
    />
  );
};

export default ServiceTable;
