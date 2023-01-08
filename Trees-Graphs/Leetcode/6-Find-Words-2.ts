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

  constructor() {
    this.rootNode = new TrieNode();
  }

  insert(word: string): void {
    let currentNode = this.rootNode;

    for (const character of word) {
      if (!currentNode.children.has(character)) {
        currentNode.children.set(character, new TrieNode());
      }
      currentNode = currentNode.children.get(character) ?? new TrieNode();
    }
    currentNode.isEndOfWord = true;
  }
}

export class Cell {
  constructor(private row: number, private column: number) {}

  public getHash(): string {
    return `${this.row}-${this.column}`;
  }
}

function findWords(board: string[][], words: string[]): string[] {
  const prefixTree = new Trie();
  for (const word of words) {
    prefixTree.insert(word);
  }

  const ROW_LENGTH = board.length;
  const COLUMN_LENGTH = board[0].length;
  const foundWords = new Set<string>();
  const visitedCells = new Set<string>();

  function depthFirstSearch(
    row: number,
    column: number,
    node: TrieNode,
    word: string
  ) {
    const cell = new Cell(row, column);
    if (
      row < 0 ||
      column < 0 ||
      row === ROW_LENGTH ||
      column === COLUMN_LENGTH ||
      visitedCells.has(cell.getHash())
    ) {
      return false;
    }

    const character = board[row][column];
    if (!node.children.has(character)) {
      return false;
    }

    visitedCells.add(cell.getHash());

    node = node.children.get(character) ?? new TrieNode();
    word += character;

    if (node.isEndOfWord) {
      foundWords.add(word);
    }

    depthFirstSearch(row - 1, column, node, word);
    depthFirstSearch(row + 1, column, node, word);
    depthFirstSearch(row, column - 1, node, word);
    depthFirstSearch(row, column + 1, node, word);

    visitedCells.delete(cell.getHash());
  }

  for (let row = 0; row < ROW_LENGTH; row++) {
    for (let column = 0; column < COLUMN_LENGTH; column++) {
      depthFirstSearch(row, column, prefixTree.rootNode, '');
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
