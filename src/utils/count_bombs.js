export default function count_bombs(i, j, board) {
  const neighbors = [
    [i - 1, j - 1],
    [i - 1, j],
    [i - 1, j + 1],
    [i, j - 1],
    [i, j + 1],
    [i + 1, j - 1],
    [i + 1, j],
    [i + 1, j + 1],
  ];

  let count = 0;

  for (const [row, col] of neighbors) {
    if (
      row !== -1 &&
      col !== -1 &&
      row < board.length &&
      col < board[row].length &&
      board[row][col].value === "X"
    ) {
      count++;
    }
  }

  return count;
}
