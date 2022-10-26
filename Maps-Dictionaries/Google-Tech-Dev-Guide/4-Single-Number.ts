/**
 * Single Number
 *
 * https://leetcode.com/explore/learn/card/hash-table/183/combination-with-other-algorithms/1176/
 *
 * Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.
 *
 * You must implement a solution with a linear runtime complexity and use only constant extra space.
 *
 * Example 1:
 * Input: nums = [2,2,1]
 * Output: 1
 *
 * Example 2:
 * Input: nums = [4,1,2,1,2]
 * Output: 4
 *
 * Example 3:
 * Input: nums = [1]
 * Output: 1
 *
 * Constraints:
 * 1 <= nums.length <= 3 * 10^4
 * -3 * 10^4 <= nums[i] <= 3 * 10^4
 * Each element in the array appears twice except for one element which appears only once.
 */

/**
 * HashSet - only value remaining
 * Time O(N) | Space O(N)
 */
function singleNumber(nums: number[]): number {
  const singleNumberSet = new Set();
  /* Time O(N) */
  for (const numberToCheck of nums) {
    if (singleNumberSet.has(numberToCheck)) {
      singleNumberSet.delete(numberToCheck);
    } else {
      singleNumberSet.add(numberToCheck); /* Space O(N) */
    }
  }
  return singleNumberSet.values().next().value;
}
