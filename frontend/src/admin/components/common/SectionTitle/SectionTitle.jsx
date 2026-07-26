const SectionTitle = ({
  title,

  subtitle,

  action,
}) => {
  return (
    <div className="section-title">
      <div>
        <h2>{title}</h2>

        <p>{subtitle}</p>
      </div>

      <div>{action}</div>
    </div>
  );
};

export default SectionTitle;
