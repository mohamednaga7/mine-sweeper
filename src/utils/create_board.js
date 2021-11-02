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
  return arr;
}
