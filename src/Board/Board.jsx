import React, { useEffect, useState } from "react";
import Cell from "./Cell/Cell";
import classes from "./Board.module.css";
import create_board from "../utils/create_board";
import count_bombs from "../utils/count_bombs";
import GameEndDialogue from "../GameEndDialogue/GameEndDialogue";

const NUM_OF_CELLS = 17;

export default function Board() {
  const [board, setBoard] = useState([]);
  const [gameEnded, setGameEnded] = useState(false);
  const [showDialogue, setShowDialogue] = useState(false);
  const onCellClicked = (row, col) => {
    if (gameEnded) {
      setShowDialogue(true);
      return;
    }
    const newBoard = board.map((row) => [...row]);
    newBoard[row][col].isHidden = false;
    newBoard[row][col].value =
      newBoard[row][col].value === "X" ? "X" : count_bombs(row, col, board);
    setBoard(newBoard);
    if (newBoard[row][col].value === "X") {
      setGameEnded(true);
    }
  };
  useEffect(() => {
    const storedBoard = localStorage.getItem("board");
    if (storedBoard) {
      setBoard(JSON.parse(storedBoard));
    } else {
      setBoard(create_board(NUM_OF_CELLS));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("board", JSON.stringify(board));
  }, [board]);

  useEffect(() => {
    setTimeout(
      () => {
        setShowDialogue(gameEnded);
      },
      gameEnded ? 1000 : 0
    );
  }, [gameEnded]);

  const resetGame = () => {
    setBoard(create_board(NUM_OF_CELLS));
    setGameEnded(false);
    setShowDialogue(false);
  };

  return (
    <React.Fragment>
      {showDialogue && <GameEndDialogue onReset={resetGame} />}
      <h1>Mine Sweeper</h1>
      <button className="btn" onClick={resetGame}>
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
                  gameEnded={gameEnded}
                />
              ))}
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
}
