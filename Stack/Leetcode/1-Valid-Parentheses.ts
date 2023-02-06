/**
 * https://leetcode.com/problems/valid-parentheses/
 *
 * Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
 *
 * An input string is valid if:
 *
 * Open brackets must be closed by the same type of brackets.
 * Open brackets must be closed in the correct order.
 * Every close bracket has a corresponding open bracket of the same type.
 *
 * Example 1:
 *
 * Input: s = "()"
 * Output: true
 * Example 2:
 *
 * Input: s = "()[]{}"
 * Output: true
 * Example 3:
 *
 * Input: s = "(]"
 * Output: false
 *
 * Constraints:
 *
 * 1 <= s.length <= 104
 * s consists of parentheses only '()[]{}'.
 */
function isValid(s: string): boolean {
  const openToClosingParentheses = new Map<string, string>([
    ['(', ')'],
    ['[', ']'],
    ['{', '}'],
  ]);

  const stackOfOpeningParentheses = [];

  for (let index = 0; index < s.length; index++) {
    let currentCharacter = s[index];
    let isOpeningParentheses = openToClosingParentheses.has(currentCharacter);
    if (isOpeningParentheses) {
      stackOfOpeningParentheses.push(currentCharacter);
    } else {
      let lastOpenedParentheses = stackOfOpeningParentheses.pop() ?? '';
      let expectedClosingParenthesesOfLastOpenedParentheses =
        openToClosingParentheses.get(lastOpenedParentheses);
      if (
        currentCharacter !== expectedClosingParenthesesOfLastOpenedParentheses
      ) {
        return false;
      }
    }
  }

  return stackOfOpeningParentheses.length === 0;
}
