// https://www.hackerearth.com/practice/algorithms/graphs/breadth-first-search/practice-problems/algorithm/ujjwals-mine-9eacab11/

/*

process.stdin.resume();
process.stdin.setEncoding("utf-8");
var stdin_input = "";
 
process.stdin.on("data", function (input) {
    stdin_input += input;
});

process.stdin.on("end", function () {
  main(stdin_input);
});

*/

type Matrix = string[][];
type Path = { distance: number; cell: Cell };
type CellIndex = number[];

class Player {
  private pathsToGoldMines: Path[];
  private cellIndex: CellIndex;

  constructor(cellIndex: CellIndex) {
    this.cellIndex = cellIndex;
    this.pathsToGoldMines = [];
  }

  public addPathToGoldMine(path: Path) {
    this.pathsToGoldMines.push(path);
  }

  public getPathsToGoldMines(): Path[] {
    return this.pathsToGoldMines;
  }

  public setCellIndex(cellIndex: CellIndex): void {
    this.cellIndex = cellIndex;
  }

  public getCellIndex(): CellIndex {
    return this.cellIndex;
  }

  public findPathsToGoldMines(
    matrix: Matrix,
    numberOfGoldMines: number = 2
  ): void {
    const visitedCells = new Set<string>();
    const queueOfCellsToVisit = [
      { cell: new Cell(this.cellIndex), distance: 0 },
    ];

    while (
      !(queueOfCellsToVisit.length === 0) &&
      this.pathsToGoldMines.length < numberOfGoldMines
    ) {
      const { cell, distance = Infinity } = queueOfCellsToVisit.shift() ?? {};
      if (cell && !visitedCells.has(cell.getHash())) {
        visitedCells.add(cell.getHash());

        if (cell.isInMatrix(matrix)) {
          const [row, column] = cell.getIndices();
          if (matrix[row][column] === '*') {
            this.pathsToGoldMines.push({ cell, distance });
          }

          if (!(matrix[row][column] === '#')) {
            const distanceToNeighbor = distance + 1;
            queueOfCellsToVisit.push({
              cell: cell.getTopNeighbour(),
              distance: distanceToNeighbor,
            });
            queueOfCellsToVisit.push({
              cell: cell.getRightNeighbour(),
              distance: distanceToNeighbor,
            });
            queueOfCellsToVisit.push({
              cell: cell.getBottomNeighbour(),
              distance: distanceToNeighbor,
            });
            queueOfCellsToVisit.push({
              cell: cell.getLeftNeighbour(),
              distance: distanceToNeighbor,
            });
          }
        }
      }
    }
  }
}

class Team {
  private players: Player[];

  constructor(players: Player[]) {
    this.players = players;
  }

  private findShortestDistanceToGoldMines(): Map<string, number> {
    const shortestDistanceToGoldMines = new Map<string, number>();

    for (let player of this.players) {
      for (let pathToGoldMine of player.getPathsToGoldMines()) {
        const cellHash = pathToGoldMine.cell.getHash();
        if (!shortestDistanceToGoldMines.has(cellHash)) {
          shortestDistanceToGoldMines.set(cellHash, pathToGoldMine.distance);
        } else {
          const currentlyShortestDistance =
            shortestDistanceToGoldMines.get(cellHash) ?? Infinity;
          if (pathToGoldMine.distance < currentlyShortestDistance) {
            shortestDistanceToGoldMines.set(cellHash, pathToGoldMine.distance);
          }
        }
      }
    }
    return shortestDistanceToGoldMines;
  }

  public calculateMinimumTimeToPickGoldMines(): number {
    const shortestPathsToGoldMines = this.findShortestDistanceToGoldMines();
    let shortestPathValues = Array.from(shortestPathsToGoldMines.values());
    let minimumPathToPickBothGoldMines = -Infinity;
    for (let distance of shortestPathValues) {
      if (distance > minimumPathToPickBothGoldMines) {
        minimumPathToPickBothGoldMines = distance;
      }
    }

    return minimumPathToPickBothGoldMines;
  }
}

class Cell {
  private hashValue: string;

  constructor(private cellIndex: CellIndex) {
    this.hashValue = `${this.cellIndex[0]}, ${this.cellIndex[1]}`;
  }

  public getLeftNeighbour(): Cell {
    const [row, column] = this.cellIndex;
    return new Cell([row, column - 1]);
  }

  public getRightNeighbour(): Cell {
    const [row, column] = this.cellIndex;
    return new Cell([row, column + 1]);
  }

  public getTopNeighbour(): Cell {
    const [row, column] = this.cellIndex;
    return new Cell([row - 1, column]);
  }

  public getBottomNeighbour(): Cell {
    const [row, column] = this.cellIndex;
    return new Cell([row + 1, column]);
  }

  public isInMatrix(matrix: Matrix): boolean {
    const [row, column] = this.cellIndex;

    if (row < 0 || column < 0) {
      return false;
    }

    if (row >= matrix.length || column >= matrix[0].length) {
      return false;
    }

    return true;
  }

  public getHash(): string {
    return this.hashValue;
  }

  public getIndices(): CellIndex {
    return this.cellIndex;
  }
}

export function main(input: string) {
  const matrices = generateMatricesFromInput(input);
  for (let matrix of matrices) {
    executeTestCase(matrix);
  }
}

const executeTestCase = (matrix: Matrix) => {
  const players = findPlayers(matrix, 2);
  const team = new Team(players);

  for (let player of players) {
    player.findPathsToGoldMines(matrix);
  }

  const result = team.calculateMinimumTimeToPickGoldMines();
  if (result > 0) {
    console.log('Yes');
    console.log(result);
  } else {
    console.log('No');
  }
};

const findPlayers = (matrix: Matrix, numberOfPlayers: number): Player[] => {
  const players: Player[] = [];

  for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
    for (
      let columnIndex = 0;
      columnIndex < matrix[0].length && players.length < numberOfPlayers;
      columnIndex++
    ) {
      const cellIndex = [rowIndex, columnIndex];
      if (matrix[rowIndex][columnIndex] === '^') {
        players.push(new Player(cellIndex));
      }
    }
  }

  return players;
};

const generateMatricesFromInput = (input: string) => {
  const inputRows = input.split('\n');
  const numberOfTestCases: number = parseInt(inputRows[0]);
  let nextTestCaseStartIndex: number = 1;
  const matrixes: Matrix[] = Array<Matrix>(numberOfTestCases);

  for (
    let testCaseNumber = 0;
    testCaseNumber < numberOfTestCases;
    testCaseNumber++
  ) {
    const nextMatrixRowCount = parseInt(inputRows[nextTestCaseStartIndex]);
    const testCaseMatrix: string[][] = [];
    for (
      let matrixRowIndex = 1;
      matrixRowIndex <= nextMatrixRowCount;
      matrixRowIndex++
    ) {
      testCaseMatrix.push(
        inputRows[nextTestCaseStartIndex + matrixRowIndex].split('')
      );
    }
    matrixes[testCaseNumber] = testCaseMatrix;
    nextTestCaseStartIndex = nextTestCaseStartIndex + nextMatrixRowCount + 1;
  }

  return matrixes;
};

main(
  '3\n4\n*..*\n..#.\n.^#^\n...#\n4\n...*\n.#.*\n##.^\n.#.^\n4\n...*\n*..#\n#.#^\n^#..'
);
