import "./StatCard.scss";

const StatCard = ({
  title,

  value,

  icon,

  color = "#E91E63",

  growth,

  children,
}) => {
  return (
    <div className="stat-card">
      <div className="stat-content">
        <h6>{title}</h6>

        <h2>{value}</h2>

        {growth && (
          <div className="stat-growth" style={{ color }}>
            {growth}
          </div>
        )}

        {children}
      </div>

      <div
        className="stat-icon"
        style={{
          background: `${color}20`,

          color,
        }}
      >
        {icon}
      </div>
    </div>
  );
};

export default StatCard;
