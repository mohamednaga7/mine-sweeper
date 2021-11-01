import React, { useEffect, useState } from "react";
import Cell from "./Cell/Cell";
import classes from "./Board.module.css";
import create_board from "../utils/create_board";
import count_bombs from "../utils/count_bombs";

export default function Board({ numOfCells }) {
  const [board, setBoard] = useState([]);
  const onCellClicked = (row, col) => {
    const newBoard = board.map((row) => [...row]);
    newBoard[row][col].isHidden = false;
    newBoard[row][col].value =
      newBoard[row][col].value === "X" ? "X" : count_bombs(row, col, board);
    setBoard(newBoard);
  };
  useEffect(() => {
    const storedBoard = localStorage.getItem("board");
    if (storedBoard) {
      setBoard(JSON.parse(storedBoard));
    } else {
      setBoard(create_board(numOfCells));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("board", JSON.stringify(board));
  }, [board]);
  return (
    <React.Fragment>
      <h1>Mine Sweeper</h1>
      <button
        className="btn"
        onClick={() => setBoard(create_board(numOfCells))}
      >
        Reset Game
      </button>
      <div className={classes.board}>
        {board.map((row, i) => {
          return (
            <div className={classes.row} key={`row-${i}`}>
              {row.map((cell, j) => (
                <Cell
                  x={i}
                  y={j}
                  key={`${i}-${j}`}
                  isHidden={cell.isHidden}
                  handleClicked={onCellClicked}
                  value={cell.value}
                />
              ))}
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
}
