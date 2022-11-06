// https://leetcode.com/problems/flood-fill/

/**
 * An image is represented by an m x n integer grid image where image[i][j] represents the pixel value of the image.

  You are also given three integers sr, sc, and color. You should perform a flood fill on the image starting from the pixel image[sr][sc].

  To perform a flood fill, consider the starting pixel, plus any pixels connected 4-directionally to the starting pixel of the same color as the starting pixel, plus any pixels connected 4-directionally to those pixels (also with the same color), and so on. Replace the color of all of the aforementioned pixels with color.

  Return the modified image after performing the flood fill.

  m == image.length
  n == image[i].length
  1 <= m, n <= 50
  0 <= image[i][j], color < 216
  0 <= sr < m
  0 <= sc < n
 */
export function floodFill(
  image: number[][],
  sr: number,
  sc: number,
  color: number
): number[][] {
  const colorToReplace = image[sr][sc];
  const visitedSet = new Set<string>();

  modifyImageWithDepthFirstSearch(
    image,
    [sr, sc],
    colorToReplace,
    color,
    visitedSet
  );

  return image;
}

const shouldNotVisit = (
  image: number[][],
  cellIndex: CellIndex,
  oldColor: number,
  visitedSet: Set<string>
): boolean => {
  const [row, column] = cellIndex;

  if (row < 0 || column < 0) {
    return true;
  }

  if (row >= image.length || column >= image[0].length) {
    return true;
  }

  if (image[row][column] !== oldColor) {
    return true;
  }

  if (visitedSet.has(hashCellIndex(cellIndex))) {
    return true;
  }
  return false;
};

const modifyImageWithDepthFirstSearch = (
  image: number[][],
  cellIndex: CellIndex,
  oldColor: number,
  newColor: number,
  visitedSet: Set<string>
) => {
  if (shouldNotVisit(image, cellIndex, oldColor, visitedSet)) {
    return;
  }

  const [row, column] = cellIndex;
  visitedSet.add(hashCellIndex(cellIndex));
  image[row][column] = newColor;

  modifyImageWithDepthFirstSearch(
    image,
    getLeftNeighbour(cellIndex),
    oldColor,
    newColor,
    visitedSet
  );
  modifyImageWithDepthFirstSearch(
    image,
    getRightNeighbour(cellIndex),
    oldColor,
    newColor,
    visitedSet
  );
  modifyImageWithDepthFirstSearch(
    image,
    getTopNeighbour(cellIndex),
    oldColor,
    newColor,
    visitedSet
  );
  modifyImageWithDepthFirstSearch(
    image,
    getBottomNeighbour(cellIndex),
    oldColor,
    newColor,
    visitedSet
  );
};

type CellIndex = number[];
const getLeftNeighbour = (cellIndex: CellIndex): CellIndex => {
  const [row, column] = cellIndex;
  return [row, column - 1];
};
const getRightNeighbour = (cellIndex: CellIndex): CellIndex => {
  const [row, column] = cellIndex;
  return [row, column + 1];
};
const getTopNeighbour = (cellIndex: CellIndex): CellIndex => {
  const [row, column] = cellIndex;
  return [row - 1, column];
};
const getBottomNeighbour = (cellIndex: CellIndex): CellIndex => {
  const [row, column] = cellIndex;
  return [row + 1, column];
};
const hashCellIndex = (cell: CellIndex) => `${cell[0]}, ${cell[1]}`;

// Example 1
const image = [
  [1, 1, 1],
  [1, 1, 0],
  [1, 0, 1],
];
console.log(floodFill(image, 1, 1, 2));

// Example 2
// const image2 = [
//   [0, 0, 0],
//   [0, 0, 0],
// ];
// console.log(floodFill(image2, 0, 0, 0));
