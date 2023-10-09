import React from "react";
import classnames from "classnames/bind";
import styles from "./Landing.module.scss";
import Logo from "../component/logo/Logo";
import mainImg from "../asset/mainImg.svg";
import { Link } from "react-router-dom";

const cx = classnames.bind(styles);

const Landing = () => {
  return (
    <main className={cx("wrapper")}>
      <a className={cx("logo")} href="/">
        <Logo />
      </a>
      <div className={cx("container-page")}>
        {/* Info */}
        <div className={cx("info")}>
          <h1>
            Job <span>Tracking</span> App
          </h1>
          <p>
            An introductory paragraph, as the opening of a conventional essay,
            composition, or report, is designed to grab people's attention. It
            informs readers about the topic and why they should care about it
            but also adds enough intrigue to get them to continue to read. In
            short, the opening paragraph is your chance to make a great first
            impression.
          </p>
          <button>Login</button>

          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <img src={mainImg} alt="Main Image" className={cx("img")} />
        <div></div>
      </div>
    </main>
  );
};

export default Landing;
