/**
 * https://leetcode.com/problems/design-add-and-search-words-data-structure/
 *
 * Design Add and Search Words Data Structure
 *
 * Design a data structure that supports adding new words and finding if a string matches any previously added string.
 *
 * Implement the WordDictionary class:
 *
 * WordDictionary() Initializes the object.
 * void addWord(word) Adds word to the data structure, it can be matched later.
 * bool search(word) Returns true if there is any string in the data structure that matches word or false otherwise. word may contain dots '.' where dots can be matched with any letter.
 *
 * Example:
 *
 * Input
 * ["WordDictionary","addWord","addWord","addWord","search","search","search","search"]
 * [[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]
 * Output
 * [null,null,null,null,false,true,true,true]
 *
 * Explanation
 * WordDictionary wordDictionary = new WordDictionary();
 * wordDictionary.addWord("bad");
 * wordDictionary.addWord("dad");
 * wordDictionary.addWord("mad");
 * wordDictionary.search("pad"); // return False
 * wordDictionary.search("bad"); // return True
 * wordDictionary.search(".ad"); // return True
 * wordDictionary.search("b.."); // return True
 *
 *
 * Constraints:
 *
 * 1 <= word.length <= 25
 * word in addWord consists of lowercase English letters.
 * word in search consist of '.' or lowercase English letters.
 * There will be at most 3 dots in word for search queries.
 * At most 10^4 calls will be made to addWord and search.
 */

export class TrieNode {
  public children: Map<string, TrieNode>;
  public isEndOfWord: boolean;

  constructor() {
    this.children = new Map<string, TrieNode>();
    this.isEndOfWord = false;
  }
}

export class WordDictionary {
  private root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  addWord(word: string): void {
    let currentNode = this.root;

    for (const character of word) {
      if (!currentNode.children.has(character)) {
        currentNode.children.set(character, new TrieNode());
      }
      currentNode = currentNode.children.get(character) ?? new TrieNode();
    }
    currentNode.isEndOfWord = true;
  }

  search(word: string): boolean {
    function depthFirstSearch(
      startIndex: number,
      startingNode: TrieNode
    ): boolean {
      let currentNode = startingNode;

      for (let index = startIndex; index < word.length; index++) {
        const character = word[index];

        if (character === '.') {
          for (let key of currentNode.children.keys()) {
            const child = currentNode.children.get(key) ?? new TrieNode();
            if (depthFirstSearch(index + 1, child)) {
              return true;
            }
          }
          return false;
        } else {
          if (!currentNode.children.has(character)) {
            return false;
          }
          currentNode = currentNode.children.get(character) ?? new TrieNode();
        }
      }

      return currentNode.isEndOfWord;
    }

    return depthFirstSearch(0, this.root);
  }
}

/**
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */
