const table = [
    [1,2,1],
    [2,4,2],
    [1,2,1]
];

const solve = (table) => {
  const a = table[0][0];
  const b = table[0][2];
  const c = table[2][0];
  const d = table[2][2];

  if (
    table[0][1] !== a + b ||
    table[1][0] !== a + c ||
    table[1][1] !== a + b + c + d ||
    table[1][2] !== b + d ||
    table[2][1] !== c + d
  ) {
    return [-1];
  }

  if (a < 0 || b < 0 || c < 0 || d < 0) {
    return [-1];
  }

  return [a, b, c, d];
}

console.log(solve(table));