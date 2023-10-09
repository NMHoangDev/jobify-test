import React from "react";
import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import StatsContainer from "../../component/Stats/StatsContainer.js";
import StatsItem from "../../component/Stats/StatsItem.js";
import Loading from "../../component/Loading/Loading";
import classNames from "classnames";
import styles from "./Stats.module.scss";
import ChartsContainer from "../../component/Stats/ChartsContainer";

const cx = classNames.bind(styles);

function Stats() {
  const { showStats, isLoading, monthlyApplication } = useAppContext();
  useEffect(() => {
    showStats();
  }, []);
  if (isLoading) {
    return <Loading center />;
  }
  return (
    <div className={cx("wrapper")}>
      <StatsContainer />
      {monthlyApplication.length > 0 && <ChartsContainer />}
    </div>
  );
}

export default Stats;
