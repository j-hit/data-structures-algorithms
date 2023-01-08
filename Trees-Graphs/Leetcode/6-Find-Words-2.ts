/**
 * https://leetcode.com/problems/word-search-ii/
 *
 * Word Search II
 *
 * Given an m x n board of characters and a list of strings words, return all words on the board.
 *
 * Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.
 *
 * Example
 * Input: board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]
 * Output: ["eat","oath"]
 *
 * Example 2
 * Input: board = [["a","b"],["c","d"]], words = ["abcb"]
 * Output: []
 *
 * Constraints:
 *
 * m == board.length
 * n == board[i].length
 * 1 <= m, n <= 12
 * board[i][j] is a lowercase English letter.
 * 1 <= words.length <= 3 * 104
 * 1 <= words[i].length <= 10
 * words[i] consists of lowercase English letters.
 * All the strings of words are unique.
 */
export class TrieNode {
  public children: Map<string, TrieNode>;
  public isEndOfWord: boolean;

  constructor() {
    this.children = new Map<string, TrieNode>();
    this.isEndOfWord = false;
  }
}

export class Trie {
  public rootNode: TrieNode;

  constructor(words: string[]) {
    this.rootNode = new TrieNode();
    this.insertWords(words);
  }

  private insertWord(word: string): void {
    let currentNode = this.rootNode;

    for (const character of word) {
      if (!currentNode.children.has(character)) {
        currentNode.children.set(character, new TrieNode());
      }
      currentNode = currentNode.children.get(character) ?? new TrieNode();
    }
    currentNode.isEndOfWord = true;
  }

  insertWords(words: string[]): void {
    for (const word of words) {
      this.insertWord(word);
    }
  }
}

export class Cell {
  private readonly ROW_LENGTH: number;
  private readonly COLUMN_LENGTH: number;

  constructor(
    private row: number,
    private column: number,
    private board: string[][]
  ) {
    this.ROW_LENGTH = board.length;
    this.COLUMN_LENGTH = board[0].length;
  }

  public getValue(): string | undefined {
    if (
      this.row < 0 ||
      this.column < 0 ||
      this.row === this.ROW_LENGTH ||
      this.column === this.COLUMN_LENGTH
    ) {
      return undefined;
    }

    return this.board[this.row][this.column];
  }

  public getNeighbours(): Cell[] {
    return [
      new Cell(this.row - 1, this.column, this.board),
      new Cell(this.row + 1, this.column, this.board),
      new Cell(this.row, this.column - 1, this.board),
      new Cell(this.row, this.column + 1, this.board),
    ];
  }

  public getHash(): string {
    return `${this.row}-${this.column}`;
  }
}

const shouldVisitCell = (
  cell: Cell,
  node: TrieNode,
  visitedCellHashs: Set<string>
): boolean => {
  const character = cell.getValue();

  if (!character) {
    return false;
  }

  if (visitedCellHashs.has(cell.getHash())) {
    return false;
  }

  if (!node.children.has(character)) {
    return false;
  }

  return true;
};

const depthFirstSearch = (
  cell: Cell,
  node: TrieNode,
  word: string,
  visitedCellHashs: Set<string>,
  foundWords: Set<string>
): void => {
  if (!shouldVisitCell(cell, node, visitedCellHashs)) {
    return;
  }

  const character = cell.getValue() ?? '';
  visitedCellHashs.add(cell.getHash());

  node = node.children.get(character) ?? new TrieNode();
  word += character;

  if (node.isEndOfWord) {
    foundWords.add(word);
  }

  for (const neighbourCell of cell.getNeighbours()) {
    depthFirstSearch(neighbourCell, node, word, visitedCellHashs, foundWords);
  }

  visitedCellHashs.delete(cell.getHash());
};

function findWords(board: string[][], words: string[]): string[] {
  const prefixTree = new Trie(words);
  const foundWords = new Set<string>();
  const visitedCellHashs = new Set<string>();

  const ROW_LENGTH = board.length;
  const COLUMN_LENGTH = board[0].length;

  for (let row = 0; row < ROW_LENGTH; row++) {
    for (let column = 0; column < COLUMN_LENGTH; column++) {
      depthFirstSearch(
        new Cell(row, column, board),
        prefixTree.rootNode,
        '',
        visitedCellHashs,
        foundWords
      );
    }
  }

  return [...foundWords.values()];
}

console.log(
  findWords(
    [
      ['o', 'a', 'a', 'n'],
      ['e', 't', 'a', 'e'],
      ['i', 'h', 'k', 'r'],
      ['i', 'f', 'l', 'v'],
    ],
    ['oath', 'pea', 'eat', 'rain']
  )
);
