import React from "react";
import FormRow from "../FormRow/FormRow";
import FormRowSelect from "../FormRowSelect/FormRowSelect";
import { useAppContext } from "../../context/appContext";
import FormSelect from "../FormRowSelect/FormSelect";

function SearchContainer() {
  const {
    isLoading,
    search,
    searchStatus,
    searchType,
    sort,
    sortOptions,
    clearFilters,
    jobTypeOptions,
    statusOptions,
    handleChange,
  } = useAppContext();
  const handleSearch = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    clearFilters();
  };
  return (
    <div className="wrapper">
      <form className="form">
        <h4>Search Form</h4>
        <div className="form-center">
          {/* search position*/}

          <FormRow
            className="from"
            name="search"
            value={search}
            handeChange={handleSearch}
            type="input"
          />
          {/* search by status */}
          <FormSelect
            labelText="status"
            name="searchStatus"
            value={searchStatus}
            handleChange={handleSearch}
            list={["all", ...statusOptions]}
          />
          {/* search by type */}
          <FormSelect
            labelText="type"
            name="searchType"
            value={searchType}
            handleChange={handleSearch}
            list={["all", ...jobTypeOptions]}
          />
          {/* sort */}
          <FormSelect
            name="sort"
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />
          <button
            type="button"
            className="btn btn-danger"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            Clear Filter
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchContainer;
