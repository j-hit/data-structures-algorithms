// https://structy.net/problems/island-count

type IslandGrid = string[][];

const grid: IslandGrid = [
  ['W', 'L', 'W', 'W', 'W'],
  ['W', 'L', 'W', 'W', 'W'],
  ['W', 'W', 'W', 'L', 'W'],
  ['W', 'W', 'L', 'L', 'W'],
  ['L', 'W', 'W', 'L', 'L'],
  ['L', 'L', 'W', 'W', 'W'],
];

const islandCount = (grid: IslandGrid) => {
  const vistedCells = new Set<string>();
  let numberOfIslands = 0;

  // Time O(row * column)
  for (let row = 0; grid.length; row++) {
    for (let column = 0; grid[0].length; column++) {
      if (explore(grid, row, column, vistedCells)) {
        numberOfIslands += 1;
      }
    }
  }

  return numberOfIslands;
};

const cellIsWater = (grid: IslandGrid, row: number, column: number) =>
  grid[row][column] === 'W';

const cellIsOutOfBounds = (grid: IslandGrid, row: number, column: number) => {
  const rowIsInBounds = 0 <= row && row < grid.length;
  const columnIsInBounds = 0 <= column && column < grid[0].length;
  return !rowIsInBounds || !columnIsInBounds;
};

const explore = (
  grid: IslandGrid,
  row: number,
  column: number,
  vistedCells: Set<string>
) => {
  if (cellIsOutOfBounds(grid, row, column)) {
    return false;
  }

  if (cellIsWater(grid, row, column)) {
    return false;
  }

  const cellPosition = `${row}, ${column}`;
  if (vistedCells.has(cellPosition)) {
    return false;
  }
  vistedCells.add(cellPosition);

  const oneRowUp = row - 1;
  explore(grid, oneRowUp, column, vistedCells);

  const oneRowDown = row + 1;
  explore(grid, oneRowDown, column, vistedCells);

  const oneColumnLeft = column - 1;
  explore(grid, row, oneColumnLeft, vistedCells);

  const oneColumnRight = column + 1;
  explore(grid, row, oneColumnRight, vistedCells);

  return true;
};

console.log('running');
console.log(islandCount(grid)); // -> 3
