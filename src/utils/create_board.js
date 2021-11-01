export default function create_board(num) {
  const arr = [];
  for (let i = 0; i < num; i++) {
    const row = [];
    for (let j = 0; j < num; j++) {
      const value = ["X", "O"][Math.floor(Math.random() * 2)];
      const isHidden = true;
      row.push({ isHidden, value });
    }
    arr.push(row);
  }
  return arr;
}
