/**
 * Valid anagram
 *
 * https://leetcode.com/problems/valid-anagram/
 *
 * Given two strings s and t, return true if t is an anagram of s, and false otherwise.
 * An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.
 *
 * Example 1:
 * Input: s = "anagram", t = "nagaram"
 * Output: true
 *
 * Example 2:
 * Input: s = "rat", t = "car"
 * Output: false
 *
 * Constraints:
 * 1 <= s.length, t.length <= 5 * 10^4
 * s and t consist of lowercase English letters.
 */

/**
 * Sort characters of strings and then compare them
 * Time O(N * Log N) | Space O(1)
 */
function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) {
    return false;
  }

  return [...s].sort().join('') === [...t].sort().join('');
}
