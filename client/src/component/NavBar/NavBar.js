import React from "react";
import classnames from "classnames/bind";
import styles from "./NavBar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCaretDown, faBars } from "@fortawesome/free-solid-svg-icons";
import Logo from "../logo/Logo";
import { useAppContext } from "../../context/appContext.js";
import { useState } from "react";

const cx = classnames.bind(styles);

function NavBar() {
  const { tonggleSidebar, user, logOutUser } = useAppContext();
  const [showLogoutBtn, setShowLogoutBtn] = useState(false);

  return (
    <nav className={cx("navbar")}>
      <button
        type="button"
        className={cx("btn_menu")}
        onClick={() => {
          console.log(tonggleSidebar());
        }}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
      <h1 className={cx("title")}>Dashboard</h1>
      <div className={cx("dropdown")}>
        <button
          className={cx("sign_out_btn")}
          onClick={() => setShowLogoutBtn(!showLogoutBtn)}
        >
          <FontAwesomeIcon icon={faUser} />
          <span>{user.name}</span>
          <FontAwesomeIcon icon={faCaretDown} />
        </button>
        {showLogoutBtn && (
          <button
            className={cx("logout")}
            onClick={() => {
              logOutUser();
            }}
          >
            Log out
          </button>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
