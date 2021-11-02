export default function get_random_weighted_value() {
  const data = [
    ["X", 1],
    ["O", 3],
  ];

  let out = [];

  // Loop through the master entries.
  for (let i = 0; i < data.length; ++i) {
    // Push the value over and over again according to its
    // weight.
    for (let j = 0; j < data[i][1]; ++j) {
      out.push(data[i][0]);
    }
  }

  // And done!
  return out[Math.floor(Math.random() * out.length)];
}
