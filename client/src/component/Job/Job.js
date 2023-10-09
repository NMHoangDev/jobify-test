import React from "react";
import classNamenames from "classnames/bind";
import styles from "./Job.module.scss";
import moment from "moment";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import JobInfo from "../JobInfo/JobInfo.js";

const cx = classNamenames.bind(styles);

function Job({
  _id,
  jobLocation,
  jobType,
  status,
  position,
  company,
  createdAt,
}) {
  const { deleteJob, setEditJob, editJob } = useAppContext();
  const date = moment(createdAt);
  const dateTime = date.format("LLLL");
  return (
    <div className={cx("wrapper")}>
      <div className="card" style={{ width: 300 }}>
        <div className="card-body">
          <h5 className="card-title">{position}</h5>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">{company}</li>
          <li className="list-group-item">{dateTime}</li>
          <li className="list-group-item">{jobLocation}</li>
        </ul>
        <div
          className="card-body"
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Link
            to="/add-job"
            onClick={(e) => {
              setEditJob(_id);
            }}
            style={{ width: 100 }}
          >
            Edit
          </Link>

          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              deleteJob(_id);
            }}
            style={{ width: 100 }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Job;
