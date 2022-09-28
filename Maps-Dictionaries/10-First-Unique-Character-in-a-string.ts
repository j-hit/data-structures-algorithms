/**
 * First Unique Character in a string
 *
 * https://leetcode.com/explore/learn/card/hash-table/184/comparison-with-other-data-structures/1120/
 *
 * Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1.
 *
 * Example 1:
 * Input: s = "leetcode"
 * Output: 0
 *
 * Example 2:
 * Input: s = "loveleetcode"
 * Output: 2
 *
 * Example 3:
 * Input: s = "aabb"
 * Output: -1
 *
 * Constraints:
 * 1 <= s.length <= 10^5
 * s consists of only lowercase English letters.
 */

/**
 * HashMap with two separate loops
 * Time O(2*N) = O(N) | Space O(N)
 */
function firstUniqChar(s: string): number {
  const characterOccurenceHashMap = new Map();

  /* Time O(N) */
  for (let index = 0; index < s.length; index++) {
    const currentCharacter = s.charAt(index);

    const occurence =
      (characterOccurenceHashMap.get(currentCharacter) ?? 0) + 1;
    characterOccurenceHashMap.set(currentCharacter, occurence); /* Space O(N) */
  }

  /* Time O(N) */
  for (let index = 0; index < s.length; index++) {
    if (characterOccurenceHashMap.get(s.charAt(index)) === 1) {
      return index;
    }
  }
  return -1;
}
