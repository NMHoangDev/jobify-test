import React from "react";

import image from "../asset/errImg.svg";
import classnames from "classnames/bind";
import styles from "./Err.module.scss";
import { Link } from "react-router-dom";

const cx = classnames.bind(styles);

function Error() {
  return (
    <div className={cx("wrapper")}>
      <img src={image} alt="Page Not Found" className={cx("err-img")} />
      <h1>Page Not Found</h1>
      <Link to="/landing">
        <h2>Back Home at here</h2>
      </Link>
    </div>
  );
}

export default Error;
