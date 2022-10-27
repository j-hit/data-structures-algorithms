// https://www.hackerearth.com/practice/algorithms/graphs/breadth-first-search/practice-problems/algorithm/ujjwals-mine-9eacab11/

export function main(input: string) {
  const matrixes = generateMatrixesFromInput(input);
  for (let matrix of matrixes) {
    const playersPossiblePaths = findPathsToGoldMines(matrix);
    const shortestPathTogether = findShortestPathTogether(playersPossiblePaths);
    if (shortestPathTogether > 0) {
      console.log('Yes');
      console.log(shortestPathTogether);
    } else {
      console.log('No');
    }
  }
}

const findShortestPathTogether = (
  playersPossiblePaths: GoldMinePaths[]
): number => {
  const shortestPaths = new Map<string, number>();
  for (let playerPossiblePath of playersPossiblePaths) {
    for (let possiblePath of playerPossiblePath) {
      if (!shortestPaths.has(createHashOfPath(possiblePath))) {
        shortestPaths.set(
          createHashOfPath(possiblePath),
          possiblePath.distance
        );
      } else {
        if (
          possiblePath.distance <
          (shortestPaths.get(createHashOfPath(possiblePath)) ?? Infinity)
        ) {
          shortestPaths.set(
            createHashOfPath(possiblePath),
            possiblePath.distance
          );
        }
      }
    }
  }

  let minimumPathToPickBothGoldMines = -Infinity;
  for (let distance of shortestPaths.values()) {
    if (distance > minimumPathToPickBothGoldMines) {
      minimumPathToPickBothGoldMines = distance;
    }
  }

  return minimumPathToPickBothGoldMines;
};

const findPathsToGoldMines = (matrix: Matrix): GoldMinePaths[] => {
  const playersGoldMinePaths: GoldMinePaths[] = [];
  const players = new Set<string>();
  for (
    let rowIndex = 0;
    rowIndex < matrix.length && players.size !== 2;
    rowIndex++
  ) {
    for (
      let columnIndex = 0;
      columnIndex < matrix[0].length && players.size !== 2;
      columnIndex++
    ) {
      const cellIndex = [rowIndex, columnIndex];
      if (
        matrix[rowIndex][columnIndex] === '^' &&
        !players.has(createHashOfCellIndex(cellIndex))
      ) {
        players.add(createHashOfCellIndex(cellIndex));
        playersGoldMinePaths.push(
          findShortestPathToGoldMines(cellIndex, matrix)
        );
      }
    }
  }

  return playersGoldMinePaths;

  console.log(JSON.stringify(playersGoldMinePaths));
};

const findShortestPathToGoldMines = (
  playerCellIndex: CellIndex,
  matrix: Matrix
): GoldMinePaths => {
  const goldMinePaths: GoldMinePaths = [];
  const visitedPaths = new Set<string>();
  const queueOfPaths = [{ cellIndex: playerCellIndex, distance: 0 }];

  while (!(queueOfPaths.length === 0) && goldMinePaths.length < 2) {
    const path = queueOfPaths.shift();
    if (path && !visitedPaths.has(createHashOfPath(path))) {
      visitedPaths.add(createHashOfPath(path));

      if (!pathIsOutOfBounds(path, matrix)) {
        const [row, column] = path.cellIndex;
        if (matrix[row][column] === '*') {
          goldMinePaths.push(path);
        }

        if (!(matrix[row][column] === '#')) {
          queueOfPaths.push(getLeftNeighbour(path));
          queueOfPaths.push(getRightNeighbour(path));
          queueOfPaths.push(getTopNeighbour(path));
          queueOfPaths.push(getBottomNeighbour(path));
        }
      }
    }
  }

  return goldMinePaths;
};

type Path = { distance: number; cellIndex: CellIndex };
type GoldMinePaths = Path[];
type CellIndex = number[];

const createHashOfCellIndex = (cellIndex: CellIndex): string =>
  `${cellIndex[0]}, ${cellIndex[1]}`;
const createHashOfPath = (path: Path): string =>
  createHashOfCellIndex(path.cellIndex);

const getLeftNeighbour = (path: Path): Path => {
  const [row, column] = path.cellIndex;
  return { cellIndex: [row, column - 1], distance: path.distance + 1 };
};
const getRightNeighbour = (path: Path): Path => {
  const [row, column] = path.cellIndex;
  return { cellIndex: [row, column + 1], distance: path.distance + 1 };
};
const getTopNeighbour = (path: Path): Path => {
  const [row, column] = path.cellIndex;
  return { cellIndex: [row - 1, column], distance: path.distance + 1 };
};
const getBottomNeighbour = (path: Path): Path => {
  const [row, column] = path.cellIndex;
  return { cellIndex: [row + 1, column], distance: path.distance + 1 };
};

const pathIsOutOfBounds = (path: Path, matrix: Matrix): boolean => {
  const [row, column] = path.cellIndex;

  if (row < 0 || column < 0) {
    return true;
  }

  if (row >= matrix.length || column >= matrix[0].length) {
    return true;
  }

  return false;
};

type Matrix = string[][];
const generateMatrixesFromInput = (input: string) => {
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
      testCaseMatrix.push([
        ...inputRows[nextTestCaseStartIndex + matrixRowIndex],
      ]);
    }
    matrixes[testCaseNumber] = testCaseMatrix;
    nextTestCaseStartIndex = nextTestCaseStartIndex + nextMatrixRowCount + 1;
  }

  return matrixes;
};

main(
  '3\n4\n*..*\n..#.\n.^#^\n...#\n4\n...*\n.#.*\n##.^\n.#.^\n4\n...*\n*..#\n#.#^\n^#..'
);
