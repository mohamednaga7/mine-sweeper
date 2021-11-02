import React from "react";
import classes from "./Cell.module.css";
import bomb from "./bomb.svg";

export default function Cell({
  x,
  y,
  value,
  handleClicked,
  isHidden,
  gameEnded,
}) {
  return (
    <div
      className={`${classes.cell} ${
        isHidden && !(gameEnded && value === "X") ? classes.hidden : ""
      } ${gameEnded ? classes.frozen : ""}`}
      onClick={() => handleClicked(x, y)}
    >
      {!(isHidden && !(gameEnded && value === "X")) &&
        (value === "X" ? (
          <img className={classes.cell_content} src={bomb} alt="shit" />
        ) : (
          <span className={classes.cell_content}>{value}</span>
        ))}
    </div>
  );
}
