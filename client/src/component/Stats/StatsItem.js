import React from "react";

function StatsItem({ count, title, icon, color, bcg }) {
  return (
    <div
      className="card border-success mb-3 rounded-border-gradient"
      style={{ width: 220, margin: 20, borderColor: `${color}` }}
    >
      <div
        className="card-body text-success"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <h5
          className="card-title"
          style={{
            fontSize: 50,
            marginTop: 10,
            marginLeft: 12,
            color: `${color}`,
          }}
        >
          {count}
        </h5>
        <div
          className="icon"
          style={{
            fontSize: 50,
            marginRight: 12,
            color: `${color}`,
            border: "",
          }}
        >
          {icon}
          {}
        </div>
      </div>
      <div
        className="card-footer bg-transparent border-success"
        style={{ color: `${color}` }}
      >
        {title}
      </div>
    </div>
  );
}

export default StatsItem;
