import AppSelect from "../AppSelect/AppSelect";

const FilterBar = ({ filters = [], values = {}, onChange }) => {
  return (
    <div className="d-flex gap-3 flex-wrap">
      {filters.map((filter) => (
        <div key={filter.name} style={{ minWidth: 200 }}>
          <AppSelect
            label={filter.label}
            value={values[filter.name] || ""}
            options={filter.options}
            onChange={(e) =>
              onChange(
                filter.name,

                e.target.value,
              )
            }
          />
        </div>
      ))}
    </div>
  );
};

export default FilterBar;
