/**
 * https://leetcode.com/problems/valid-palindrome/
 *
 * A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.
 *
 * Given a string s, return true if it is a palindrome, or false otherwise.
 *
 * Example 1:
 *
 * Input: s = "A man, a plan, a canal: Panama"
 * Output: true
 * Explanation: "amanaplanacanalpanama" is a palindrome.
 *
 * Example 2:
 *
 * Input: s = "race a car"
 * Output: false
 * Explanation: "raceacar" is not a palindrome.
 *
 * Example 3:
 *
 * Input: s = " "
 * Output: true
 * Explanation: s is an empty string "" after removing non-alphanumeric characters.
 * Since an empty string reads the same forward and backward, it is a palindrome.
 *
 * Constraints:
 *
 * 1 <= s.length <= 2 * 105
 * s consists only of printable ASCII characters.
 */
function isPalindrome(s: string): boolean {
  let formattedString = '';
  for (let characterInString of s) {
    let lowercaseCharacterInString = characterInString.toLowerCase();
    if (isAlphaNumeric(lowercaseCharacterInString)) {
      formattedString += lowercaseCharacterInString;
    }
  }

  const reversedFormattedString = [...formattedString].reverse().join('');

  return formattedString === reversedFormattedString;
}

const isAlphaNumeric = (stringToCheck: string) =>
  stringToCheck.match(/^[0-9a-z]+$/);

function isPalindromeWithPointers(s: string): boolean {
  let leftPointerIndex = 0;
  let rightPointerIndex = s.length - 1;

  while (leftPointerIndex < rightPointerIndex) {
    let [newLeftPointerIndex, newRightPointerIndex] =
      movePointersToNextAlphaNumericCharacters(
        s,
        leftPointerIndex,
        rightPointerIndex
      );

    if (
      s[newLeftPointerIndex]?.toLowerCase() !==
      s[newRightPointerIndex]?.toLowerCase()
    ) {
      return false;
    }

    leftPointerIndex = newLeftPointerIndex + 1;
    rightPointerIndex = newRightPointerIndex + 1;
  }

  return true;
}

const movePointersToNextAlphaNumericCharacters = (
  stringToGoThrough: string,
  leftPointerIndex: number,
  rightPointerIndex: number
): [number, number] => {
  while (
    leftPointerIndex < rightPointerIndex &&
    !isAlphaNumeric(stringToGoThrough[leftPointerIndex].toLowerCase())
  ) {
    leftPointerIndex++;
  }

  while (
    rightPointerIndex > leftPointerIndex &&
    !isAlphaNumeric(stringToGoThrough[rightPointerIndex].toLowerCase())
  ) {
    rightPointerIndex--;
  }

  return [leftPointerIndex, rightPointerIndex];
};

console.log(isPalindromeWithPointers('A man, a plan, a canal: Panama'));
