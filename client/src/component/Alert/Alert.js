import React from "react";
import { useAppContext } from "../../context/appContext";

function Alert() {
  const { alertType, alertText } = useAppContext();
  return (
    <div className={`alert alert-${alertType}`} role="alert">
      {alertText}
    </div>
  );
}

export default Alert;
