/**
 * Two Sum
 *
 * https://leetcode.com/explore/learn/card/hash-table/184/comparison-with-other-data-structures/1115/
 *
 * Write an algorithm to determine if a number n is happy.
 *
 * Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
 *
 * You may assume that each input would have exactly one solution, and you may not use the same element twice.
 *
 * You can return the answer in any order.
 *
 * Example 1:
 * Input: nums = [2,7,11,15], target = 9
 * Output: [0,1]
 * Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
 *
 * Example 2:
 * Input: nums = [3,2,4], target = 6
 * Output: [1,2]
 *
 * Example 3:
 * Input: nums = [3,3], target = 6
 * Output: [0,1]
 *
 * Constraints:
 * 2 <= nums.length <= 10^4
 * -10^9 <= nums[i] <= 10^9
 * -10^9 <= target <= 10^9
 * Only one valid answer exists.
 *
 * Follow-up: Can you come up with an algorithm that is less than O(n2) time complexity?
 */

/**
 * HashMap - 1 pass
 * Time O(nums) | Space O(nums) = Time O(N) | Space O(N)
 */
function twoSum(nums: number[], target: number): number[] | null {
  const mapOfNumbersAndIndexes = new Map();

  /* Time O(nums) */
  for (let index = 0; index < nums.length; index++) {
    const matchingNumber = target - nums[index];
    if (mapOfNumbersAndIndexes.has(matchingNumber)) {
      return [mapOfNumbersAndIndexes.get(matchingNumber), index];
    }
    mapOfNumbersAndIndexes.set(nums[index], index); /* Space O(nums) */
  }
  return null;
}

/**
 * Alternative solution - brute force - linear search
 * Time O(N^2) | Space O(1)
 * Found here https://neetcode.io/practice
 */
const twoSum2 = (nums: number[], target: number) => {
  /* Time O(N) */
  for (let curr = 0; curr < nums.length; curr++) {
    const complement = target - nums[curr];

    /* Time O(N) */
    for (let next = curr + 1; next < nums.length; next++) {
      const num = nums[next];

      const isTarget = num === complement;
      if (isTarget) return [curr, next];
    }
  }

  return [-1, -1];
};
