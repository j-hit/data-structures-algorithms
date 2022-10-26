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

/**
 * Two loops with 3 sets, calculating the subbox with math
 * Time O(9^2) | Space O(9 * 9 * 9) ?
 */
function isValidSudoku(board: string[][]): boolean {
  const columns = new Map<number, Set<string>>();
  const rows = new Map<number, Set<string>>();
  const subBoxes = new Map<string, Set<string>>();

  for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
    let row = board[rowIndex];
    for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
      let cell = row[columnIndex];
      if (cell !== '.') {
        let subBoxKey = getSubBoxKey(rowIndex, columnIndex);
        if (
          isInRow(rows, rowIndex, cell) ||
          isInColumn(columns, columnIndex, cell) ||
          isInSubBox(subBoxes, subBoxKey, cell)
        ) {
          return false;
        }
        keepTrackOfNumber(rows, rowIndex, cell);
        keepTrackOfNumber(columns, columnIndex, cell);
        keepTrackOfNumber(subBoxes, subBoxKey, cell);
      }
    }
  }

  return true;
}

const keepTrackOfNumber = (
  mapToStoreValue: Map<unknown, Set<string>>,
  key: unknown,
  valueToAdd: string
): void => {
  const values = mapToStoreValue.get(key) ?? new Set();
  values.add(valueToAdd);
  mapToStoreValue.set(key, values);
};

const getSubBoxKey = (rowIndex: number, columnIndex: number) =>
  `${Math.floor(rowIndex / 3)}, ${Math.floor(columnIndex / 3)}`;

const isInRow = (
  rows: Map<number, Set<string>>,
  rowIndex: number,
  cell: string
) => rows.get(rowIndex)?.has(cell);
const isInColumn = (
  columns: Map<number, Set<string>>,
  columnIndex: number,
  cell: string
) => columns.get(columnIndex)?.has(cell);
const isInSubBox = (
  subBox: Map<string, Set<string>>,
  subBoxKey: string,
  cell: string
) => subBox.get(subBoxKey)?.has(cell);
