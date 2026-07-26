import { FaSearch, FaTimes } from "react-icons/fa";

const SearchBox = ({ value = "", onChange, placeholder = "Search..." }) => {
  return (
    <div className="search-box-component">
      <FaSearch className="search-icon" />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />

      {value && (
        <button
          type="button"
          className="clear-search"
          onClick={() => onChange("")}
        >
          <FaTimes />
        </button>
      )}
    </div>
  );
};

export default SearchBox;
