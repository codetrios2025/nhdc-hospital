import SearchBox from "../SearchBox/SearchBox";

const TableHeader = ({
  title,

  subtitle,

  children,

  search,

  onSearch,
}) => {
  return (
    <div className="app-card-header">
      <div>
        <h4>{title}</h4>

        <p>{subtitle}</p>
      </div>

      <div className="d-flex gap-2">
        {search && <SearchBox value={search} onChange={onSearch} />}

        {children}
      </div>
    </div>
  );
};

export default TableHeader;
