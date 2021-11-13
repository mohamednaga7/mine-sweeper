import React, { useEffect, useState } from "react";
import Cell from "./Cell/Cell";
import classes from "./Board.module.css";
import create_board from "../utils/create_board";
import GameEndDialogue from "../GameEndDialogue/GameEndDialogue";

const NUM_OF_CELLS = 17;
export default function Board() {
  const [board, setBoard] = useState([]);
  const [gameEnded, setGameEnded] = useState(false);
  const [showDialogue, setShowDialogue] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (gameStarted) {
      const timer = setTimeout(() => {
        setSeconds((prev) => {
          if (prev === 59) {
            setMinutes((prevMins) => prevMins + 1);
            return seconds + 1;
          } else {
            return seconds + 1;
          }
        });
      }, 1000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [seconds, gameStarted]);

  useEffect(() => {
    if (gameEnded) {
      setGameStarted(false);
      // todo add the timer value and check if the player has won
      setSeconds(0);
      setMinutes(0);
    }
  }, [gameEnded]);

  const onCellClicked = (row, col) => {
    if (gameEnded) {
      setShowDialogue(true);
      return;
    }
    setGameStarted(true);
    const newBoard = board.map((row) => [...row]);
    newBoard[row][col].isHidden = false;
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
    setSeconds(0);
    setMinutes(0);
    setGameEnded(false);
    setGameStarted(false);
    setShowDialogue(false);
  };

  return (
    <React.Fragment>
      {showDialogue && <GameEndDialogue onReset={resetGame} />}
      <h1>Mine Sweeper</h1>
      <div className={classes.header}>
        <button className="btn" onClick={resetGame}>
          Reset Game
        </button>
        <div className={classes.counter}>
          <h3>
            {minutes}:{seconds}
          </h3>
        </div>
      </div>
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
