const AppButton = ({
  children,

  variant = "primary",

  icon,

  loading = false,

  type = "button",

  className = "",

  ...props
}) => {
  return (
    <button
      type={type}
      className={`app-btn ${variant} ${className}`}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <span className="spinner-border spinner-border-sm" />
      ) : (
        <>
          {icon}

          <span>{children}</span>
        </>
      )}
    </button>
  );
};

export default AppButton;
