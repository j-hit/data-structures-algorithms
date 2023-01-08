/**
 * https://leetcode.com/problems/implement-trie-prefix-tree/
 * 
 * Implement Trie (Prefix Tree)
 * 
 * A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.
 *
 *  Implement the Trie class:
 *
 *  Trie() Initializes the trie object.
 *  void insert(String word) Inserts the string word into the trie.
 *  boolean search(String word) Returns true if the string word is in the trie (i.e., was inserted before), and false otherwise.
 *  boolean startsWith(String prefix) Returns true if there is a previously inserted string word that has the prefix prefix, and false otherwise.
 * 
 * Example 1:
 *
 * Input
 * ["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
 * [[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
 * Output
 * [null, null, true, false, true, null, true]

 * Explanation
 * Trie trie = new Trie();
 * trie.insert("apple");
 * trie.search("apple");   // return True
 * trie.search("app");     // return False
 * trie.startsWith("app"); // return True
 * trie.insert("app");
 * trie.search("app");     // return True
 * 
 * Constraints:
 * 1 <= word.length, prefix.length <= 2000
 * word and prefix consist only of lowercase English letters.
 * At most 3 * 10^4 calls in total will be made to insert, search, and startsWith.
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

  search(word: string): boolean {
    let currentNode = this.rootNode;

    for (const character of word) {
      if (!currentNode.children.has(character)) {
        return false;
      }
      currentNode = currentNode.children.get(character) ?? new TrieNode();
    }

    return currentNode.isEndOfWord;
  }

  startsWith(prefix: string): boolean {
    let currentNode = this.rootNode;

    for (const character of prefix) {
      if (!currentNode.children.has(character)) {
        return false;
      }
      currentNode = currentNode.children.get(character) ?? new TrieNode();
    }

    return true;
  }
}

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
