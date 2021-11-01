import React from "react";
import classes from "./Cell.module.css";
import bomb from "./bomb.svg";

export default function Cell({ x, y, value, handleClicked, isHidden }) {
  return (
    <div
      className={`${classes.cell} ${isHidden ? classes.hidden : ""}`}
      onClick={() => handleClicked(x, y)}
    >
      {!isHidden &&
        (value === "X" ? (
          <img className={classes.cell_content} src={bomb} alt="shit" />
        ) : (
          <span className={classes.cell_content}>{value}</span>
        ))}
    </div>
  );
}
