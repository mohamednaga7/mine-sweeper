import get_random_weighted_value from "./get_random_weighted_value";

export default function create_board(num) {
  const arr = [];
  for (let i = 0; i < num; i++) {
    const row = [];
    for (let j = 0; j < num; j++) {
      const value = get_random_weighted_value();
      const isHidden = true;
      row.push({ isHidden, value });
    }
    arr.push(row);
  }
  return minesweeper(arr);
}

function minesweeper(arr) {
  const board = [];
  for (let i = 0; i < arr.length; i++) {
    let rowArr = [];
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j].value === "X") {
        rowArr.push({ value: "X", isHidden: true });
        continue;
      }
      const neighbors = createNeighbors(i, j);
      let bombCount = 0;
      for (const [row, col] of neighbors) {
        if (
          row !== -1 &&
          col !== -1 &&
          row < arr.length &&
          col < arr[row].length &&
          arr[row][col].value === "X"
        ) {
          bombCount++;
        }
      }
      rowArr.push({ value: bombCount, isHidden: true });
    }
    board.push(rowArr);
  }
  return board;
}

const createNeighbors = (i, j) => [
  [i - 1, j - 1],
  [i - 1, j],
  [i - 1, j + 1],
  [i, j - 1],
  [i, j + 1],
  [i + 1, j - 1],
  [i + 1, j],
  [i + 1, j + 1],
];
