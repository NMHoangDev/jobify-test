import React from "react";
import classnames from "classnames/bind";
import styles from "./SmallSideBar.module.scss";
import Logo from "../logo/Logo";
import { Link } from "react-router-dom";
import links from "../../links/link.js";

const cx = classnames.bind(styles);

function SmallSideBar() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("logo")}>
        <Logo />
      </div>
      <div className={cx("items_sidebar")}>
        {links.map((link, index) => {
          return (
            <div key={index}>
              <Link to={link.path}>
                <span>{link.icon}</span>
                <span>{link.text}</span>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SmallSideBar;
