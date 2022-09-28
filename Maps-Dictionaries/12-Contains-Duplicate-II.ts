/**
 * Contains Duplicate II
 *
 * Given an integer array nums and an integer k, return true if there are two distinct indices i and j in the array such that nums[i] == nums[j] and abs(i - j) <= k.
 *
 * Example 1:
 * Input: nums = [1,2,3,1], k = 3
 * Output: true
 *
 * Example 2:
 * Input: nums = [1,0,1,1], k = 1
 * Output: true
 *
 * Example 3:
 * Input: nums = [1,2,3,1,2,3], k = 2
 * Output: false
 *
 * Constraints:
 * 1 <= nums.length <= 10^5
 * -10^9 <= nums[i] <= 10^9
 * 0 <= k <= 10^5
 */

/**
 * HashMap with loop and another loop nested inside
 * Time O(N^2) | Space O(N)
 */
function containsNearbyDuplicate(nums: number[], k: number): boolean {
  const numberIndexMap = new Map();

  /* Time O(N) */
  for (let index = 0; index < nums.length; index++) {
    const indexesOfExistingNumber = numberIndexMap.get(nums[index]);

    if (indexesOfExistingNumber === undefined) {
      numberIndexMap.set(nums[index], [index]); /* Space O(N) */
    } else {
      /* Time O(N) */
      for (let indexOfExistingNumber of indexesOfExistingNumber) {
        const absoluteDistance = Math.abs(indexOfExistingNumber - index);
        if (absoluteDistance <= k) {
          return true;
        }
      }
      numberIndexMap.set(nums[index], [
        ...indexesOfExistingNumber,
        index,
      ]); /* Space O(N) */
    }
  }

  return false;
}
