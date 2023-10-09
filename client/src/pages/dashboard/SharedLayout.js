import React from "react";
import { Outlet, Link } from "react-router-dom";
import classnames from "classnames/bind";
import styles from "./SharedLayout.module.scss";
import NavBar from "../../component/NavBar/NavBar.js";
import BigSideBar from "../../component/BigSideBar/BigSideBar.js";
import SmallSideBar from "../../component/SmallSideBar/SmallSideBar.js";

const cx = classnames.bind(styles);
function SharedLayout() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("small_side_bar")}>
          <SmallSideBar />
        </div>
        <div className={cx("page")}>
          <div className={cx("navbar")}>
            <NavBar />
          </div>
          <div className={cx("main_page")}>
            <BigSideBar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SharedLayout;
