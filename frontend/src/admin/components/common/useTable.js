import { useState } from "react";

const useTable = (initialState = {}) => {
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const [limit, setLimit] = useState(10);

  const [sortBy, setSortBy] = useState("");

  const [sortOrder, setSortOrder] = useState("asc");

  const [selectedRows, setSelectedRows] = useState([]);

  const [filters, setFilters] = useState({});

  const updateFilter = (name, value) => {
    setFilters((prev) => ({
      ...prev,

      [name]: value,
    }));
  };

  const resetTable = () => {
    setSearch("");

    setPage(1);

    setLimit(10);

    setSortBy("");

    setSortOrder("asc");

    setSelectedRows([]);

    setFilters({});
  };

  return {
    search,
    setSearch,

    page,
    setPage,

    limit,
    setLimit,

    sortBy,
    setSortBy,

    sortOrder,
    setSortOrder,

    selectedRows,
    setSelectedRows,

    filters,
    updateFilter,

    resetTable,
  };
};

export default useTable;
