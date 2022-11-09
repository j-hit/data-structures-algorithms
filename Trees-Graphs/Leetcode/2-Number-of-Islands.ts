// https://leetcode.com/explore/learn/card/queue-stack/231/practical-application-queue/1374/

/* 
  Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.

  An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

  Example 1:

  Input: grid = [
    ["1","1","1","1","0"],
    ["1","1","0","1","0"],
    ["1","1","0","0","0"],
    ["0","0","0","0","0"]
  ]
  Output: 1

  Example 2:

  Input: grid = [
    ["1","1","0","0","0"],
    ["1","1","0","0","0"],
    ["0","0","1","0","0"],
    ["0","0","0","1","1"]
  ]
  Output: 3

  Constraints:
  m == grid.length
  n == grid[i].length
  1 <= m, n <= 300
  grid[i][j] is '0' or '1'.
*/

export function numIslands(grid: string[][]): number {
  const visitedCells = new Set<string>();
  let numberOfIslands = 0;

  for (let row = 0; row < grid.length; row++) {
    for (let column = 0; column < grid[0].length; column++) {
      const currentCell = new Cell(grid, row, column);
      if (
        !visitedCells.has(currentCell.getHash()) &&
        explore(currentCell, visitedCells)
      ) {
        numberOfIslands += 1;
      }
    }
  }

  return numberOfIslands;
}

class Cell {
  constructor(
    public grid: string[][],
    public row: number,
    public column: number
  ) {}

  public getOffsetsToNeighbors(): number[][] {
    return [
      [-1, 0], // top
      [0, 1], // right
      [1, 0], // bottom
      [0, -1], // left
    ];
  }

  public isLand(): boolean {
    return this.cellIsInGrid() && this.grid[this.row][this.column] === '1';
  }

  private cellIsInGrid(): boolean {
    const rowIsInBounds = this.row >= 0 && this.row < this.grid.length;
    const columnIsInBounds =
      this.column >= 0 && this.column < this.grid[0].length;
    return rowIsInBounds && columnIsInBounds;
  }

  public getHash(): string {
    return `${this.row}, ${this.column}`;
  }
}

const explore = (cell: Cell, visitedCells: Set<string>): boolean => {
  let foundNewIsland = false;

  const queue = [cell];
  visitedCells.add(cell.getHash());

  while (queue.length > 0) {
    const item = queue.shift();
    if (item) {
      if (item.isLand()) {
        foundNewIsland = true;

        for (let neighborOffset of item.getOffsetsToNeighbors()) {
          const [rowOffset, columnOffset] = neighborOffset;
          const neighborCell = new Cell(
            cell.grid,
            item.row + rowOffset,
            item.column + columnOffset
          );
          if (!visitedCells.has(neighborCell.getHash())) {
            visitedCells.add(neighborCell.getHash());
            queue.push(neighborCell);
          }
        }
      }
    }
  }

  return foundNewIsland;
};

// Example 1
console.log(
  numIslands([
    ['1', '1', '1', '1', '0'],
    ['1', '1', '0', '1', '0'],
    ['1', '1', '0', '0', '0'],
    ['0', '0', '0', '0', '0'],
  ])
);

// Example 2
console.log(
  numIslands([
    ['1', '1', '0', '0', '0'],
    ['1', '1', '0', '0', '0'],
    ['0', '0', '1', '0', '0'],
    ['0', '0', '0', '1', '1'],
  ])
);
