import { FilterType, FilterValueDefinition } from "./types";
import { filterTypeMap } from "./constants";
import { FormEvent, memo, useEffect, useState } from "react";

import Button from "../../../../shared/components/button/Button";

import "./Filter.scss";
interface FilterPanelProps {
  onFilterValueChange: (filter: string) => void;
}

const FilterPanel = (props: FilterPanelProps) => {
  const [filterKey, setFilterKey] = useState<FilterType>("" as FilterType);

  const [filterValue, setFilterValue] = useState<string>("");

  const { onFilterValueChange } = props;

  const currentFilterValueDef: FilterValueDefinition | undefined =
    filterTypeMap[filterKey as FilterType];

  const handleFilterKeyChange = (event: FormEvent<HTMLSelectElement>) => {
    setFilterKey(event.currentTarget.value as FilterType);
    setFilterValue("");
  };

  const handleFilterValueChange = (event: FormEvent<HTMLSelectElement>) => {
    setFilterValue(event.currentTarget.value);
    console.log("value", event.currentTarget.value);
  };

  const resetFilter = (): void => {
    setFilterKey("" as FilterType);
    setFilterValue("");
    onFilterValueChange("");
  };

  useEffect(() => {
    if (!filterKey || !filterValue) return;
    console.log("url generated with", filterKey, filterValue);
    const filter = `${filterKey}=${filterValue}`;
    onFilterValueChange(filter);
  }, [filterKey, filterValue, onFilterValueChange]);

  return (
    <>
      <form>
        <div className="custom-select filter-name">
          <select
            value={filterKey}
            id="filter-key-select"
            onChange={handleFilterKeyChange}
          >
            <option value=""></option>
            {Object.keys(filterTypeMap).map((filterName) => (
              <option key={filterName} value={filterName}>
                {filterName}
              </option>
            ))}
          </select>
          <label
            className={filterKey ? "selected" : ""}
            htmlFor="filter-key-select"
          >
            Select a filter
          </label>
        </div>
        <div className="custom-select filter-value">
          <select
            value={filterValue}
            id="filter-value-select"
            onChange={handleFilterValueChange}
          >
            <option value=""></option>
            {filterKey
              ? currentFilterValueDef.values.map((filterValue) => (
                  <option key={filterValue} value={filterValue}>
                    {filterValue}
                  </option>
                ))
              : ""}
          </select>

          <label
            className={filterValue ? "selected" : ""}
            htmlFor="filter-value-select"
          >
            {filterKey
              ? `${currentFilterValueDef.label}`
              : "You need to select a filter before"}
          </label>
        </div>
        <Button
          disabled={!filterKey || !filterValue}
          onButtonClick={resetFilter}
        >
          Reset Filter
        </Button>
      </form>
    </>
  );
};

export default memo(FilterPanel);
