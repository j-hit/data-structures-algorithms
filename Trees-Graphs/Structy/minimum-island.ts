// https://structy.net/problems/minimum-island

type IslandGrid = string[][];

const grid: IslandGrid = [
  ['W', 'L', 'W', 'W', 'W'],
  ['W', 'L', 'W', 'W', 'W'],
  ['W', 'W', 'W', 'L', 'W'],
  ['W', 'W', 'L', 'L', 'W'],
  ['L', 'W', 'W', 'L', 'L'],
  ['L', 'L', 'W', 'W', 'W'],
];

export const minimumIsland = (grid: IslandGrid) => {
  const visitedSet = new Set<string>();
  let minimumSize = Infinity;

  for (let row = 0; row < grid.length; row++) {
    for (let column = 0; column < grid[row].length; column++) {
      const size = exploreSize(grid, row, column, visitedSet);
      if (size > 0 && size < minimumSize) {
        minimumSize = size;
      }
    }
  }

  return minimumSize;
};

const cellIsWater = (grid: IslandGrid, row: number, column: number) =>
  grid[row][column] === 'W';

const cellIsOutOfBounds = (grid: IslandGrid, row: number, column: number) => {
  const rowIsInBounds = 0 <= row && row < grid.length;
  const columnIsInBounds = 0 <= column && column < grid[0].length;
  return !rowIsInBounds || !columnIsInBounds;
};

const exploreSize = (
  grid: IslandGrid,
  row: number,
  column: number,
  visitedCells: Set<string>
): number => {
  if (cellIsOutOfBounds(grid, row, column)) {
    return 0;
  }

  if (cellIsWater(grid, row, column)) {
    return 0;
  }

  const cellPosition = `${row}, ${column}`;
  if (visitedCells.has(cellPosition)) {
    return 0;
  }
  visitedCells.add(cellPosition);

  let islandSize = 1;

  const oneRowUp = row - 1;
  islandSize += exploreSize(grid, oneRowUp, column, visitedCells);

  const oneRowDown = row + 1;
  islandSize += exploreSize(grid, oneRowDown, column, visitedCells);

  const oneColumnLeft = column - 1;
  islandSize += exploreSize(grid, row, oneColumnLeft, visitedCells);

  const oneColumnRight = column + 1;
  islandSize += exploreSize(grid, row, oneColumnRight, visitedCells);

  return islandSize;
};

console.log(minimumIsland(grid)); // -> 2
