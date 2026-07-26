const AppCard = ({
  title,

  subtitle,

  headerAction,

  children,

  className = "",
}) => {
  return (
    <div className={`app-card ${className}`}>
      {(title || headerAction) && (
        <div className="app-card-header">
          <div>
            <h4>{title}</h4>

            <p>{subtitle}</p>
          </div>

          {headerAction}
        </div>
      )}

      <div className="app-card-body">{children}</div>
    </div>
  );
};

export default AppCard;
