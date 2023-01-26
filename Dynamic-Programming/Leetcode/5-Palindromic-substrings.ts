/**
 * https://leetcode.com/problems/palindromic-substrings/
 *
 * Given a string s, return the number of palindromic substrings in it.
 *
 * A string is a palindrome when it reads the same backward as forward.
 *
 * A substring is a contiguous sequence of characters within the string.
 *
 * Example 1:
 *
 * Input: s = "abc"
 * Output: 3
 * Explanation: Three palindromic strings: "a", "b", "c".
 *
 * Example 2:
 *
 * Input: s = "aaa"
 * Output: 6
 * Explanation: Six palindromic strings: "a", "a", "a", "aa", "aa", "aaa".
 *
 * Constraints:
 *
 * 1 <= s.length <= 1000
 * s consists of lowercase English letters.
 */
function countSubstrings(s: string): number {
  let numberOfPalindromicSubStrings = 0;

  for (let index = 0; index < s.length; index++) {
    let oddLengthStartIndexOfSubString = index;
    let oddLengthEndOfSubString = index;
    numberOfPalindromicSubStrings += countPalindromesByExpandingLeftAndRight(
      oddLengthStartIndexOfSubString,
      oddLengthEndOfSubString,
      s
    );

    let evenLengthStartIndexOfSubString = index;
    let evenLengthEndOfSubString = index + 1;
    numberOfPalindromicSubStrings += countPalindromesByExpandingLeftAndRight(
      evenLengthStartIndexOfSubString,
      evenLengthEndOfSubString,
      s
    );
  }

  return numberOfPalindromicSubStrings;
}

const countPalindromesByExpandingLeftAndRight = (
  startIndexOfSubString: number,
  endIndexOfSubString: number,
  stringToSearchThrough: string
): number => {
  let numberOfPalindromicSubStrings = 0;
  while (
    startIndexOfSubString >= 0 &&
    endIndexOfSubString < stringToSearchThrough.length &&
    stringToSearchThrough[startIndexOfSubString] ===
      stringToSearchThrough[endIndexOfSubString]
  ) {
    numberOfPalindromicSubStrings += 1;

    startIndexOfSubString -= 1;
    endIndexOfSubString += 1;
  }
  return numberOfPalindromicSubStrings;
};
