import React from "react";
import FormRow from "../../component/FormRow/FormRow.js";
import Alert from "../../component/Alert/Alert.js";
import { useAppContext } from "../../context/appContext";
import classNames from "classnames";
import styles from "./AddJobs.module.scss";
import FormSelect from "../../component/FormRowSelect/FormSelect.js";

const cx = classNames.bind(styles);

function AddJobs() {
  const {
    showAlert,
    dispatchAlert,
    position,
    company,
    jobLocation,
    jobTypeOptions,
    status,
    statusOptions,
    isEditing,
    jobType,
    handleChange,
    clearValues,
    isLoading,
    createJob,
    editJob,
  } = useAppContext();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      dispatchAlert();

      return;
    }
    if (isEditing) {
      editJob();
      return;
    }
    createJob();
  };

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };
  return (
    <div className={cx("wrapper")}>
      <form className={cx("form")}>
        <h3>{isEditing ? "edit job" : "add job"}</h3>
        {showAlert && <Alert />}
        <div className={cx("form-center")}>
          {/* position */}
          <FormRow
            type="text"
            name="position"
            labelText="position"
            value={position}
            handeChange={handleJobInput}
          />
          {/* Location */}
          <FormRow
            type="text"
            name="jobLocation"
            labelText="job location"
            value={jobLocation}
            handeChange={handleJobInput}
          />
          {/* company */}
          <FormRow
            type="text"
            name="company"
            labelText="company"
            value={company}
            handeChange={handleJobInput}
          />
          {/* jobs status */}
          <FormSelect
            name="status"
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />
          {/* jobs type */}
          <FormSelect
            name="jobType"
            labelText="Type"
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />
          {/* btn-container */}
          <div className={cx("btn-container")}>
            <button
              type="submit"
              className="btn btn-success"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              Submit
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={(e) => {
                e.preventDefault();
                clearValues();
              }}
            >
              Clear
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddJobs;
