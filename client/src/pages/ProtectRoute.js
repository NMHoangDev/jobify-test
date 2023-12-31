import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";

function ProtectRoute({ children }) {
  const { user } = useAppContext();
  if (!user) {
    return <Navigate to="/landing" />;
  } else {
    return children;
  }
}

export default ProtectRoute;
