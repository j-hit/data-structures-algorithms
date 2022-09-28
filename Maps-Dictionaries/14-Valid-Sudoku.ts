/**
 * Valid Sudoku
 *
 * Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:
 * - Each row must contain the digits 1-9 without repetition.
 * - Each column must contain the digits 1-9 without repetition.
 * - Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.
 * Note:
 * - A Sudoku board (partially filled) could be valid but is not necessarily solvable.
 * - Only the filled cells need to be validated according to the mentioned rules.
 *
 * Example 1:
 * Input: board =
 * [["5","3",".",".","7",".",".",".","."]
 * ,["6",".",".","1","9","5",".",".","."]
 * ,[".","9","8",".",".",".",".","6","."]
 * ,["8",".",".",".","6",".",".",".","3"]
 * ,["4",".",".","8",".","3",".",".","1"]
 * ,["7",".",".",".","2",".",".",".","6"]
 * ,[".","6",".",".",".",".","2","8","."]
 * ,[".",".",".","4","1","9",".",".","5"]
 * ,[".",".",".",".","8",".",".","7","9"]]
 * Output: true
 *
 * Example 2:
 * Input: board =
 * [["8","3",".",".","7",".",".",".","."]
 * ,["6",".",".","1","9","5",".",".","."]
 * ,[".","9","8",".",".",".",".","6","."]
 * ,["8",".",".",".","6",".",".",".","3"]
 * ,["4",".",".","8",".","3",".",".","1"]
 * ,["7",".",".",".","2",".",".",".","6"]
 * ,[".","6",".",".",".",".","2","8","."]
 * ,[".",".",".","4","1","9",".",".","5"]
 * ,[".",".",".",".","8",".",".","7","9"]]
 * Output: false
 * Explanation: Same as Example 1, except with the 5 in the top left corner being modified to 8. Since there are two 8's in the top left 3x3 sub-box, it is invalid.
 *
 * Constraints:
 * board.length == 9
 * board[i].length == 9
 * board[i][j] is a digit 1-9 or '.'.
 */

const cellsToSubBoxesMap = new Map([
  [`00`, 0],
  [`01`, 0],
  [`02`, 0],
  [`03`, 1],
  [`04`, 1],
  [`05`, 1],
  [`06`, 2],
  [`07`, 2],
  [`08`, 2],
  [`10`, 0],
  [`11`, 0],
  [`12`, 0],
  [`13`, 1],
  [`14`, 1],
  [`15`, 1],
  [`16`, 2],
  [`17`, 2],
  [`18`, 2],
  [`20`, 0],
  [`21`, 0],
  [`22`, 0],
  [`23`, 1],
  [`24`, 1],
  [`25`, 1],
  [`26`, 2],
  [`27`, 2],
  [`28`, 2],
  [`30`, 3],
  [`31`, 3],
  [`32`, 3],
  [`33`, 4],
  [`34`, 4],
  [`35`, 4],
  [`36`, 5],
  [`37`, 5],
  [`38`, 5],
  [`40`, 3],
  [`41`, 3],
  [`42`, 3],
  [`43`, 4],
  [`44`, 4],
  [`45`, 4],
  [`46`, 5],
  [`47`, 5],
  [`48`, 5],
  [`50`, 3],
  [`51`, 3],
  [`52`, 3],
  [`53`, 4],
  [`54`, 4],
  [`55`, 4],
  [`56`, 5],
  [`57`, 5],
  [`58`, 5],
  [`60`, 6],
  [`61`, 6],
  [`62`, 6],
  [`63`, 7],
  [`64`, 7],
  [`65`, 7],
  [`66`, 8],
  [`67`, 8],
  [`68`, 8],
  [`70`, 6],
  [`71`, 6],
  [`72`, 6],
  [`73`, 7],
  [`74`, 7],
  [`75`, 7],
  [`76`, 8],
  [`77`, 8],
  [`78`, 8],
  [`80`, 6],
  [`81`, 6],
  [`82`, 6],
  [`83`, 7],
  [`84`, 7],
  [`85`, 7],
  [`86`, 8],
  [`87`, 8],
  [`88`, 8],
]);

const createDimensionMap = () =>
  new Map([
    [0, new Set<string>()],
    [1, new Set<string>()],
    [2, new Set<string>()],
    [3, new Set<string>()],
    [4, new Set<string>()],
    [5, new Set<string>()],
    [6, new Set<string>()],
    [7, new Set<string>()],
    [8, new Set<string>()],
  ]);

/**
 * Hardcoded subboxes with a Set for each box, column and row
 * Time O(N) | Space O(rows) + O(columns) + O(boxes) = O(N)
 */
function isValidSudoku(board: string[][]): boolean {
  const columnNumberMap = createDimensionMap();
  const subBoxNumberMap = createDimensionMap();

  for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
    const rowSet = new Set();
    const row = board[rowIndex];

    for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
      const cellValue = row[columnIndex];
      if (cellValue !== '.') {
        if (rowSet.has(cellValue)) {
          return false;
        } else {
          rowSet.add(cellValue);
        }

        const columnSet = columnNumberMap.get(columnIndex);
        if (columnSet?.has(cellValue)) {
          return false;
        } else {
          columnSet?.add(cellValue);
        }

        const subboxNumber = cellsToSubBoxesMap.get(
          `${rowIndex}${columnIndex}`
        );
        const subboxSet = subBoxNumberMap.get(subboxNumber ?? -1);
        if (subboxSet?.has(cellValue)) {
          return false;
        } else {
          subboxSet?.add(cellValue);
        }
      }
    }
  }

  return true;
}
