/**
 * https://leetcode.com/problems/replace-words/
 *
 * Replace words
 *
 * In English, we have a concept called root, which can be followed by some other word to form another longer word - let's call this word successor. For example, when the root "an" is followed by the successor word "other", we can form a new word "another".
 *
 * Given a dictionary consisting of many roots and a sentence consisting of words separated by spaces, replace all the successors in the sentence with the root forming it. If a successor can be replaced by more than one root, replace it with the root that has the shortest length.
 *
 * Return the sentence after the replacement.
 *
 * Example 1:
 *
 * Input: dictionary = ["cat","bat","rat"], sentence = "the cattle was rattled by the battery"
 * Output: "the cat was rat by the bat"
 * Example 2:
 *
 * Input: dictionary = ["a","b","c"], sentence = "aadsfasf absbs bbab cadsfafs"
 * Output: "a a b c"
 *
 * Constraints:
 *
 * 1 <= dictionary.length <= 1000
 * 1 <= dictionary[i].length <= 100
 * dictionary[i] consists of only lower-case letters.
 * 1 <= sentence.length <= 10^6
 * sentence consists of only lower-case letters and spaces.
 * The number of words in sentence is in the range [1, 1000]
 * The length of each word in sentence is in the range [1, 1000]
 * Every two consecutive words in sentence will be separated by exactly one space.
 * sentence does not have leading or trailing spaces.
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
  private rootNode: TrieNode;

  constructor(words: string[]) {
    this.rootNode = new TrieNode();
    for (const word of words) {
      this.insert(word);
    }
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

  findShortestMatch(word: string): string {
    let currentNode = this.rootNode;
    let charactersOfNewWord = [];

    for (const character of word) {
      if (!currentNode.children.has(character)) {
        return word;
      }
      currentNode = currentNode.children.get(character) ?? new TrieNode();
      charactersOfNewWord.push(character);

      if (currentNode.isEndOfWord) {
        return charactersOfNewWord.join('');
      }
    }

    return word;
  }
}

function replaceWordSuccessorsWithRoots(
  successors: string[],
  rootWords: Trie
): string[] {
  const replacedWords: string[] = [];

  for (const word of successors) {
    replacedWords.push(rootWords.findShortestMatch(word));
  }

  return replacedWords;
}

function replaceWords(dictionary: string[], sentence: string): string {
  const prefixTree = new Trie(dictionary);
  const words = sentence.split(' ');
  return replaceWordSuccessorsWithRoots(words, prefixTree).join(' ');
}

console.log(
  replaceWords(['cat', 'bat', 'rat'], 'the cattle was rattled by the battery')
);
