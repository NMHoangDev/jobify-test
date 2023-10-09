import React, { useEffect } from "react";
import classnames from "classnames/bind";
import styles from "./JobContainer.module.scss";
import { useAppContext } from "../../context/appContext";
import Loading from "../Loading/Loading";
import Job from "../Job/Job";
import PageBtnContainer from "../PageBtnContainer/PageBtnContainer";

const cx = classnames.bind(styles);

function JobContainer() {
  const {
    getJobs,
    jobs,
    isLoading,
    page,
    totalJobs,
    search,
    searchStatus,
    searchType,
    sort,
    numOfPages,
  } = useAppContext();

  useEffect(() => {
    getJobs();
  }, [search, searchStatus, searchType, sort, page]);
  if (isLoading) {
    return <Loading center />;
  }
  if (jobs.length === 0) {
    return (
      <div className={cx("wrapper")}>
        <h1>No jobs to display...</h1>
      </div>
    );
  }
  return (
    <div className={cx("wrapper")}>
      <h2>
        {totalJobs} job{jobs.length > 1 && "s"} found
      </h2>
      <div className={cx("jobs")}>
        {jobs.map((job, index) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
      {/* pagination buttons */}
    </div>
  );
}

export default JobContainer;
