/**
 * Goal: group all anagrams together into sublists.
 * Constraints:
 * - An anagram is a string that contains the exact same characters as another string, but the order of the characters can be different.
 * - Array can contain empty strings!
 * - 1 <= strs.length <= 1000
 * - 0 <= strs[i].length <= 100
 * - strs[i] is made up of lowercase English letters.
 * Assumptions:
 * - Output can be returned in any order
 * Examples:
 * - Example 1
 *      Input: strs = ["act","pots","tops","cat","stop","hat"]
 *      Output: [["hat"],["act", "cat"],["stop", "pots", "tops"]]
 * - Example 2
 *      Input: strs = ["x"]
 *      Output: [["x"]]
 *  - Example 3
 *      Input: strs = [""]
 *      Output: [[""]]
 * Idea:
 * - We go through each array item and create a hashmap of the individual characters and how many times they occur. We then create a hash from that hashmap.
 *  We just this hash as the key of a new hashmap and the value is an array that now is appended with our entry.
 *  We then return an array that contains all the arrays of this hashmap.
 * Runtime complexity:
 * - Goal is to not have to sort the individual entries to avoid n*log(n), we want to do it in O(n) by using more space
 * Space complexity:
 * - 3 x O(n) = O(n)
 */
type hashOfString = string;
export const groupAnagrams = (arrayOfStrings: string[]): string[][] => {
  const groupedAnagramMap = new Map<hashOfString, string[]>([]);

  for (let stringInArray of arrayOfStrings) {
    // Create a unique key using fixed-size array for 26 lowercase letters (a-z)
    // This guarantees no collisions without sorting
    const characterCountArray = new Array(26).fill(0);
    for (let charcterInString of stringInArray) {
      const index = charcterInString.charCodeAt(0) - 97; // 'a' is 97
      characterCountArray[index] = characterCountArray[index] + 1;
    }
    const hashOfCharacterCountArray = characterCountArray.join(",");
    const existingAnagrams = groupedAnagramMap.get(hashOfCharacterCountArray) ?? [];
    existingAnagrams.push(stringInArray);
    groupedAnagramMap.set(hashOfCharacterCountArray, existingAnagrams);
  }

  return [...groupedAnagramMap.values()];
};
