import React, { useEffect } from "react";
import Logo from "../component/logo/Logo";
import classnames from "classnames/bind";
import styles from "./Register.module.scss";
import { useState } from "react";
import FormRow from "../component/FormRow/FormRow";
import Alert from "../component/Alert/Alert";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";

const cx = classnames.bind(styles);

const initialValues = {
  name: "",
  email: "",
  password: "",
  isMember: true,
  showAlert: false,
};

function Register() {
  const [values, setValues] = useState(initialValues);
  const navigate = useNavigate();

  // ----------
  // Tongle Member function
  // ----------

  const tonggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  // Use AppContext
  const {
    user,
    isLoading,
    showAlert,
    dispatchAlert,
    registerUser,
    loginUser,
    setupUser,
  } = useAppContext();
  // -------
  // Handler Change from Form LOgin/Register
  // ---------

  const handeChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  //----------
  // On Submit handler
  //------------

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      dispatchAlert();
      return;
    }
    const currentUser = { name, email, password };
    if (isMember) {
      setupUser({
        currentUser,
        endpoint: "login",
        alertText: "Login Successfull!! Redirecting....",
      });
    } else {
      setupUser({
        currentUser,
        endpoint: "register",
        alertText: "Register Successfull!! Redirecting....",
      });
    }
    setValues({ ...values, name: "", email: "", password: "" });
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);
  // ----------------

  return (
    <div className={cx("wrapper")}>
      <form className={cx("form")} onSubmit={onSubmit}>
        <div className={cx("logo")}>
          <Logo />
        </div>
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {showAlert && <Alert />}
        {/* Input Row */}

        {/* Name Input */}
        {!values.isMember && (
          <FormRow
            name="name"
            type="text"
            labelText="Name"
            value={values.name}
            handeChange={handeChange}
          />
        )}
        {/* Email Input */}
        <FormRow
          name="email"
          type="text"
          labelText="Email"
          value={values.email}
          handeChange={handeChange}
        />
        {/* Password Input */}
        <FormRow
          name="password"
          type="password"
          labelText="Password"
          value={values.password}
          handeChange={handeChange}
        />

        <button type="submit" className={cx("btn-submit")}>
          Submit
        </button>
        <div className={cx("pargh")}>
          {values.isMember ? "Not a member yet" : "Already a member?"}
          <span
            type="button"
            onClick={tonggleMember}
            className={cx("btn-submit")}
            style={{
              padding: "0",
              backgroundColor: "transparent",
              color: "var(--primary)",
              fontSize: "16px",
            }}
          >
            {!values.isMember ? "Login" : "Register"}
          </span>
        </div>
      </form>
    </div>
  );
}

export default Register;
