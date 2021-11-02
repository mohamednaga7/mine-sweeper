import React from "react";
import classes from "./GameEndDialogue.module.css";
import bomb from "../Board/Cell/bomb.svg";

export default function GameEndDialogue({ onReset }) {
  return (
    <div className={classes.modal}>
      <div className={classes.modalBody}>
        <h3>You stepped on a bomb {":("}</h3>
        <img src={bomb} alt="bomb" className={classes.bomb} />
        <button className="btn" onClick={onReset}>
          Reset Game
        </button>
      </div>
    </div>
  );
}
