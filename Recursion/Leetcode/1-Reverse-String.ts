/**
 * https://leetcode.com/explore/learn/card/recursion-i/250/principle-of-recursion/1440/
 *
 * Write a function that reverses a string. The input string is given as an array of characters s.
 *
 * You must do this by modifying the input array in-place with O(1) extra memory.
 *
 * Example 1:
 *
 * Input: s = ["h","e","l","l","o"]
 * Output: ["o","l","l","e","h"]
 * Example 2:
 *
 * Input: s = ["H","a","n","n","a","h"]
 * Output: ["h","a","n","n","a","H"]
 *
 * Constraints:
 *
 * 1 <= s.length <= 10^5
 * s[i] is a printable ascii character.
 */
/**
 Do not return anything, modify s in-place instead.
 */
function reverseString(s: string[]): void {
  recursivelyReverse(s, 0, s.length - 1);
}

const recursivelyReverse = (
  s: string[],
  startIndex: number,
  endIndex: number
): void => {
  if (startIndex === endIndex) {
    return;
  }

  if (startIndex > endIndex) {
    return;
  }

  if (endIndex < startIndex) {
    return;
  }

  [s[startIndex], s[endIndex]] = [s[endIndex], s[startIndex]];

  recursivelyReverse(s, startIndex + 1, endIndex - 1);
};

let array = ['h', 'e', 'l', 'l', 'o'];
reverseString(array);
console.log(array);

/**
 *
 * a = a
 * ab = ba
 *
 * abbc = cbba
 *
 * abcde = edcba
 *
 */
