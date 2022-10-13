/**
 *  Contains Duplicate
 *
 *  https://leetcode.com/explore/learn/card/hash-table/183/combination-with-other-algorithms/1112/
 *
 *  Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.
 *
 *   Example 1:
 *   Input: nums = [1,2,3,1]
 *   Output: true
 *
 *   Example 2:
 *   Input: nums = [1,2,3,4]
 *   Output: false
 *
 *   Example 3:
 *   Input: nums = [1,1,1,3,3,4,3,2,4,2]
 *   Output: true
 *
 *   Constraints:
 *
 *   1 <= nums.length <= 10^5
 *   -10^9 <= nums[i] <= 10^9
 */

/**
 * Hash Set - Early Exit
 * Time O(N) | Space O(N)
 */
function containsDuplicate(nums: number[]): boolean {
  const hashSet = new Set();
  /* Time O(N) */
  for (const numberToCheck of nums) {
    if (hashSet.has(numberToCheck)) {
      return true;
    }
    /* Space O(N) */
    hashSet.add(numberToCheck);
  }
  return false;
}

/**
 * Alternative solution found in https://neetcode.io/practice
 * Hash Set
 * Time O(N) | Space O(N)
 */
function containsDuplicate2(nums: number[]): boolean {
  const numbersSet = new Set(nums);
  const isEqual = numbersSet.size === nums.length;
  return !isEqual;
}
