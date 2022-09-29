/**
 * Sliding Window
 * Based on solution from https://neetcode.io/practice
 * Time O(N) | Space O(N)
 */
function lengthOfLongestSubstring(s: string): number {
  const characterSet = new Set();

  let leftPointer = 0;
  let result = 0;

  for (let rightPointer = 0; rightPointer < s.length; rightPointer++) {
    while (characterSet.has(s[rightPointer])) {
      characterSet.delete(s[leftPointer]);
      leftPointer++;
    }
    characterSet.add(s[rightPointer]);
    result = Math.max(result, rightPointer - leftPointer + 1);
  }
  return result;
}

/**
 * My initial brute force solution
 * Time O(N^3)
 */
function lengthOfLongestSubstring2(s: string): number {
  let lengthOfLongestSubstring = 0;

  for (
    let characterIndex = 0;
    characterIndex < s.length - lengthOfLongestSubstring;
    characterIndex++
  ) {
    const lengthOfCurrentSubString = longestSubstringWithStartingCharacter(
      s.slice(characterIndex)
    );
    if (lengthOfCurrentSubString > lengthOfLongestSubstring) {
      lengthOfLongestSubstring = lengthOfCurrentSubString;
    }
  }

  return lengthOfLongestSubstring;
}

function longestSubstringWithStartingCharacter(s: string): number {
  let currentSet: Set<string> = new Set<string>();
  let longestSet: Set<string> = currentSet;

  for (let character of s) {
    if (currentSet.has(character)) {
      currentSet = new Set<string>();
      currentSet.add(character);
    } else {
      currentSet.add(character);
      if (currentSet.size > longestSet.size) {
        longestSet = currentSet;
      }
    }
  }

  return longestSet.size;
}
