import React from "react";
import classnames from "classnames/bind";
import styles from "./Loading.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const cx = classnames.bind(styles);
function Loading() {
  return (
    <div className={cx("loading")}>
      <FontAwesomeIcon icon={faSpinner} className={cx("loading-icon")} />
    </div>
  );
}

export default Loading;
