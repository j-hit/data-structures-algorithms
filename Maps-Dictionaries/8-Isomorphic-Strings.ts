/**
 * Isomorphic Strings
 *
 * https://leetcode.com/explore/learn/card/hash-table/184/comparison-with-other-data-structures/1117/
 *
 * Given two strings s and t, determine if they are isomorphic.
 *
 * Two strings s and t are isomorphic if the characters in s can be replaced to get t.
 *
 * All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character, but a character may map to itself.
 *
 * Example 1:
 * Input: s = "egg", t = "add"
 * Output: true
 *
 * Example 2:
 * Input: s = "foo", t = "bar"
 * Output: false
 *
 * Example 3:
 * Input: s = "paper", t = "title"
 * Output: true
 *
 * Constraints:
 *
 * 1 <= s.length <= 5 * 10^4
 * t.length == s.length
 * s and t consist of any valid ascii character.
 */

/**
 * HashMap
 * Time Time O(N) | Space O(N)
 * TODO: Clean up code
 */
function isIsomorphic(s: string, t: string): boolean {
  const characterReplacementMap = new Map();
  const replacementValues = new Set();

  let newString = '';

  /* Time O(N) */
  for (let index = 0; index < s.length; index++) {
    const characterToCheck = s.charAt(index);
    const characterToReplace = t.charAt(index);

    if (
      !characterReplacementMap.has(characterToCheck) &&
      !replacementValues.has(characterToReplace)
    ) {
      characterReplacementMap.set(
        characterToCheck,
        characterToReplace
      ); /* Space O(N) */
      replacementValues.add(characterToReplace); /* Space O(N) */
    }
    newString += characterReplacementMap.get(characterToCheck);

    replacementValues.add(characterToReplace); /* Space O(N) */
  }

  return newString === t;
}
