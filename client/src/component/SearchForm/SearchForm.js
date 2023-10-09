import React from "react";
import classnames from "classnames/bind";
import styles from "./SearchForm.module.scss";
import SearchContainer from "../SearchContainer/SearchContainer";

const cx = classnames.bind(styles);

function SearchForm() {
  return (
    <div>
      <SearchContainer />
    </div>
  );
}

export default SearchForm;
