/**
 * Group Anagrams
 *
 * Given an array of strings strs, group the anagrams together. You can return the answer in any order.
 *
 * An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.
 *
 * Example 1:
 * Input: strs = ["eat","tea","tan","ate","nat","bat"]
 * Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
 *
 * Example 2:
 * Input: strs = [""]
 * Output: [[""]]
 *
 * Example 3:
 * Input: strs = ["a"]
 * Output: [["a"]]
 *
 * Constraints:
 * 1 <= strs.length <= 10^4
 * 0 <= strs[i].length <= 100
 * strs[i] consists of lowercase English letters.
 */

/**
 * HashMap with single loop
 * Time O(N) | Space O(N)
 */
function groupAnagrams(strs: string[]): string[][] {
  if (strs.length === 0) {
    return [];
  }

  const anagramMap = new Map();

  /* Time O(N) */
  for (const word of strs) {
    const rearrangedLetters = [...word].sort().join('');
    if (anagramMap.has(rearrangedLetters)) {
      const existingAnagramWords = anagramMap.get(rearrangedLetters);
      /* Space O(N) */
      anagramMap.set(rearrangedLetters, [...existingAnagramWords, word]);
    } else {
      /* Space O(N) */
      anagramMap.set(rearrangedLetters, [word]);
    }
  }

  return [...anagramMap.values()];
}
