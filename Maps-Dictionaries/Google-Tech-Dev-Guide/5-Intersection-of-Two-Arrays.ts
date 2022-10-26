/**
 * Intersection of Two Arrays
 *
 * https://leetcode.com/explore/learn/card/hash-table/183/combination-with-other-algorithms/1105/
 *
 * Given two integer arrays nums1 and nums2, return an array of their intersection. Each element in the result must be unique and you may return the result in any order.
 *
 * Example 1:
 * Input: nums1 = [1,2,2,1], nums2 = [2,2]
 * Output: [2]
 *
 * Example 2:
 * Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
 * Output: [9,4]
 * Explanation: [4,9] is also accepted.
 *
 * Constraints:
 * 1 <= nums1.length, nums2.length <= 1000
 * 0 <= nums1[i], nums2[i] <= 1000
 */

/**
 * Two HashSets
 * Time O(nums1) | Space O(nums1) + O(nums2)
 */
function intersection(nums1: number[], nums2: number[]): number[] {
  const nums1Unique = new Set(nums1); /* Space O(nums1) */
  const nums2Unique = new Set(nums2); /* Space O(nums2) */

  /* Time O(nums1) */
  return Array.from(nums1Unique).reduce((acc: number[], current: number) => {
    if (nums2Unique.has(current)) {
      return [...acc, current];
    }
    return acc;
  }, []);
}
