/**
 * Given two strings s and t, return true if the two strings are anagrams of each other, otherwise return false.
 * An anagram is a string that contains the exact same characters as another string, but the order of the characters can be different.
 *
 * Anagrams are two strings that have the exact same characters as the other string, order can be different.
 *
 * Idea:
 * Check the length of both strings, if they have different lengths they cannot be anagrams -> return false
 * Go through the first string -> create a hashmap (hashmap1) with the key being the character and the value being the number of occurences
 * Go through the second string -> create another hashmap (hashmap2) with the key being the character and the value being the number of occurences
 * Go through any hashmap1 entries -> check that the value for each key is the same in hashmap2 -> if not return false
 * Otherwise return true
 * Constraints:
 * - We can ignore the case, both strings are always lowercase english letters
 * Edge cases:
 * - Strings with different lengths
 * - Strings with zero length
 * - String with all the same characters
 * Runtime Complexity:
 * 2 * O(n) => O(n)
 * Space Complexity:
 * Maximum: 2 * 2 * O(n) = O(n)
 * Examples:
 * - Input: s = "racecar", t = "carrace"
 * - Output: true
 *
 * - Input: s = "jar", t = "jam"
 * - Output: false
 */
export const isAnagram = (string1: string, string2: string) => {
  const hashMap1 = new Map<string, number>([]);
  const hashMap2 = new Map<string, number>([]);

  if (string1.length !== string2.length) {
    return false;
  }

  for (const character of string1) {
    const currentNumberOfOccurences = hashMap1.get(character) ?? 0;
    hashMap1.set(character, currentNumberOfOccurences + 1);
  }
  for (const character of string2) {
    const currentNumberOfOccurences = hashMap2.get(character) ?? 0;
    hashMap2.set(character, currentNumberOfOccurences + 1);
  }

  for (const [hashMap1EntryKey, hashMap1EntryValue] of hashMap1.entries()) {
    if (hashMap2.get(hashMap1EntryKey) !== hashMap1EntryValue) {
      return false;
    }
  }
  return true;
};

/**
 * Runtime complexity O(n * logn)
 */
export const isAnagram2 = (string1: string, string2: string) => {
  if (string1.length !== string2.length) {
    return false;
  }

  return (
    string1.split("").toSorted().join("") ===
    string2.split("").toSorted().join("")
  );
};
