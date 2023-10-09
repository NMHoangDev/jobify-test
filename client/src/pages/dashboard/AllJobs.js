import React from "react";
import Loading from "../../component/Loading/Loading";
import SearchForm from "../../component/SearchForm/SearchForm";
import JobContainer from "../../component/JobContainer/JobContainer";
import classnames from "classnames/bind";
import styles from "./AllJobs.module.scss";

const cx = classnames.bind(styles);

function AllJobs() {
  return (
    <div className={cx("wrapper")}>
      <SearchForm />
      <JobContainer />
    </div>
  );
}

export default AllJobs;
