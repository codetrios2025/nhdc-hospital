import Breadcrumb from "../layout/Breadcrumb";

const PageHeader = ({
  title,

  subtitle,

  children,
}) => {
  return (
    <div className="page-header">
      <div>
        <h2>{title}</h2>

        <p>{subtitle}</p>

        <Breadcrumb />
      </div>

      <div>{children}</div>
    </div>
  );
};

export default PageHeader;
