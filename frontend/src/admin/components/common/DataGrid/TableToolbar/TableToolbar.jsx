import RefreshButton from "../RefreshButton/RefreshButton";
import SearchBox from "../SearchBox/SearchBox";

const TableToolbar = ({
  search,

  setSearch,

  left,

  right,

  onRefresh,
}) => {
  return (
    <div className="table-toolbar">
      <div className="toolbar-left">{left}</div>

      <div className="toolbar-right">
        <SearchBox value={search} onChange={setSearch} />

        <RefreshButton onRefresh={onRefresh} />

        {right}
      </div>
    </div>
  );
};

export default TableToolbar;
