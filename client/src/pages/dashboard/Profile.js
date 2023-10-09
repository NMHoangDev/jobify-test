import React from "react";
import { useState } from "react";
import FormRow from "../../component/FormRow/FormRow.js";
import Alert from "../../component/Alert/Alert";
import { useAppContext } from "../../context/appContext";
import classNames from "classnames";
import styles from "./Profile.module.scss";

const cx = classNames.bind(styles);
function Profile() {
  const { user, showAlert, displayAlert, updateUser, isLoading } =
    useAppContext();
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [lastName, setLastName] = useState(user?.lastName);
  const [location, setLocation] = useState(user?.location);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !lastName || !location) {
      displayAlert();
      return;
    }
    updateUser({ name, email, lastName, location });
  };

  return (
    <form className={cx("form")} onSubmit={handleSubmit}>
      <Alert />
      <div className={cx("form-center")}>
        <FormRow
          type="text"
          name="name"
          value={name}
          handeChange={(e) => setName(e.target.value)}
        />

        <FormRow
          type="text"
          name="lastName"
          value={lastName}
          handeChange={(e) => setLastName(e.target.value)}
        />
        <FormRow
          type="text"
          name="email"
          value={email}
          handeChange={(e) => setEmail(e.target.value)}
        />
        <FormRow
          type="text"
          name="location"
          value={location}
          handeChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className={cx("btn_save")}>
        <button type="submit" className="btn btn-success" disabled={isLoading}>
          {isLoading ? "Please wait..." : "Save Change"}
        </button>
      </div>
    </form>
  );
}

export default Profile;
