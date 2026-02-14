/**
 * https://leetcode.com/problems/search-a-2d-matrix/
 * 
 * Write an efficient algorithm that searches for a value target in an m x n integer matrix matrix. This matrix has the following properties:

    Integers in each row are sorted from left to right.
    The first integer of each row is greater than the last integer of the previous row.

    Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
    Output: true

    Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
    Output: false

    Constraints:

    m == matrix.length
    n == matrix[i].length
    1 <= m, n <= 100
    -10^4 <= matrix[i][j], target <= 10^4
 * 
 */

// based on https://www.youtube.com/watch?v=Ber2pi2C0j0
// Time complexity = O(log m + log n)
function searchMatrix(matrix: number[][], target: number): boolean {
  let ROWS = matrix.length;
  let COLUMNS = matrix[0].length;

  let topPointer = 0;
  let bottomPointer = ROWS - 1;
  let rowNumber = 0;

  while (topPointer <= bottomPointer) {
    rowNumber = Math.floor((topPointer + bottomPointer) / 2);
    const largestNumberInRow = matrix[rowNumber][COLUMNS - 1];
    const smallestNumberInRow = matrix[rowNumber][0];
    if (target > largestNumberInRow) {
      topPointer = rowNumber + 1;
    } else if (target < smallestNumberInRow) {
      bottomPointer = rowNumber - 1;
    } else {
      break;
    }
  }

  if (topPointer > bottomPointer) {
    return false;
  }

  let leftIndex = 0;
  let rightIndex = COLUMNS - 1;
  while (leftIndex <= rightIndex) {
    let middleIndex = Math.floor((leftIndex + rightIndex) / 2);
    if (target > matrix[rowNumber][middleIndex]) {
      leftIndex = middleIndex + 1;
    } else if (target < matrix[rowNumber][middleIndex]) {
      rightIndex = middleIndex - 1;
    } else {
      return true;
    }
  }
  return false;
}
