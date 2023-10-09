import React from "react";
import logo from "../../asset/logo.png";
import styles from "./Logo.module.scss";
import classnames from "classnames/bind";

const cx = classnames.bind(styles);

function Logo() {
  return (
    <div className={cx("wrapper")}>
      <img src={logo} alt="Jobify" className={cx("logo")} />
      <h2>Jobify</h2>
    </div>
  );
}

export default Logo;
