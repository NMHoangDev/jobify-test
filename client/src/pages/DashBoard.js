import React from "react";

import styles from "./Dashboard.module.scss";
import classNames from "classnames";
import NavBar from "../component/NavBar/NavBar";
import SmallSideBar from "../component/SmallSideBar/SmallSideBar";

const cx = classNames.bind(styles);

function DashBoard() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("big_side")}>
        <div className={cx("navbar")}>
          <NavBar />
        </div>
        <div className={cx("main_page")}></div>
      </div>
      <div className={cx("small_side")}>
        <SmallSideBar />
      </div>
    </div>
  );
}

export default DashBoard;
