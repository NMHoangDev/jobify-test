import React from "react";
import classnames from "classnames/bind";
import styles from "./BigSideBar.module.scss";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "../../pages/dashboard/Profile.js";
import Stats from "../../pages/dashboard/Stats.js";
import AllJobs from "../../pages/dashboard/AllJobs.js";
import AddJobs from "../../pages/dashboard/AddJobs.js";
import Edit from "../EditJob/Edit";

const cx = classnames.bind(styles);

function BigSideBar() {
  return (
    <div className={cx("wrapper")}>
      <Routes>
        <Route index element={<Stats />} />
        <Route path="all-jobs" element={<AllJobs />} />
        <Route path="add-job" element={<AddJobs />} />
        <Route path="profile" element={<Profile />} />
        <Route path="edit" element={<Edit />} />
      </Routes>
    </div>
  );
}

export default BigSideBar;
