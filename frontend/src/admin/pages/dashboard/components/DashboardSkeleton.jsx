import "./DashboardSkeleton.scss";

const DashboardSkeleton = () => {
  return (
    <div className="dashboard-skeleton">
      <div className="skeleton-banner"></div>

      <div className="skeleton-cards">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="skeleton-card" />
        ))}
      </div>

      <div className="skeleton-actions"></div>
    </div>
  );
};

export default DashboardSkeleton;
