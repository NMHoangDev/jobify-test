import React from "react";
import classNames from "classnames";
import styles from "./FormSelect.module.scss";

const cx = classNames.bind(styles);

function FormSelect({ labelText, name, value, handleChange, list }) {
  return (
    <div className={cx("form-row")} style={{ marginLeft: 270 }}>
      <label htmlFor={name} className={cx("form-label")}>
        {labelText || name}
      </label>
      <select
        className="form-select w-50 "
        aria-label="Default select example"
        name={name}
        value={value}
        onChange={handleChange}
      >
        {list.map((item, index) => {
          return (
            <option key={index} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default FormSelect;
