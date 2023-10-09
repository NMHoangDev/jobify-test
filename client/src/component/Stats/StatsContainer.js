import React from "react";
import StatsItem from "./StatsItem";
import {
  faSuitcaseRolling,
  faCalendarCheck,
  faBug,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppContext } from "../../context/appContext";

function StatsContainer() {
  const { stats } = useAppContext();
  const defaultStats = [
    {
      title: "pending applications",
      count: stats.pending || 0,
      icon: <FontAwesomeIcon icon={faSuitcaseRolling} />,
      color: "#e9b949",
      bcg: "fcefc7",
    },
    {
      title: "interviews scheduled",
      count: stats.interview || 0,
      icon: <FontAwesomeIcon icon={faCalendarCheck} />,
      color: "#647acb",
      bcg: "#e0e8f9",
    },
    {
      title: "jobs declined",
      count: stats.declined || 0,
      icon: <FontAwesomeIcon icon={faBug} />,
      color: "#d66a6a",
      bcg: "ffeeee",
    },
  ];
  return (
    <div style={{ display: "flex" }}>
      {defaultStats.map((item, index) => {
        return <StatsItem key={index} {...item} />;
      })}
    </div>
  );
}

export default StatsContainer;
