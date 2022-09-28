/**
 * Intersection of Two Arrays II
 *
 * Given two integer arrays nums1 and nums2, return an array of their intersection. Each element in the result must appear as many times as it shows in both arrays and you may return the result in any order.
 *
 * Example 1:
 * Input: nums1 = [1,2,2,1], nums2 = [2,2]
 * Output: [2,2]
 *
 * Example 2:
 * Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
 * Output: [4,9]
 * Explanation: [9,4] is also accepted.
 *
 * Constraints:
 * 1 <= nums1.length, nums2.length <= 1000
 * 0 <= nums1[i], nums2[i] <= 1000
 */

/**
 * HashMap, iterate over shortest array, then compare other array
 * Time O(N + M) | Space O(N + M)
 */
function intersect(nums1: number[], nums2: number[]): number[] {
  if (nums1.length > nums2.length) {
    return intersect(nums2, nums1);
  }

  const remainingCommonValuesCount = new Map();
  /* Time O(nums1) = O(N) */
  for (const item of nums1) {
    const currentValue = remainingCommonValuesCount.get(item) ?? 0;
    /* Space O(nums1) = O(N) */
    remainingCommonValuesCount.set(item, currentValue + 1);
  }

  let nextIndexNums2 = 0;
  const commonValues: number[] = [];

  /* Time O(nums2) = O(M) */
  while (remainingCommonValuesCount.size > 0 && nextIndexNums2 < nums2.length) {
    const currentNumber = nums2[nextIndexNums2];
    const currentCount = remainingCommonValuesCount.get(currentNumber);

    if (currentCount !== undefined) {
      commonValues.push(currentNumber); /* Space O(nums2) = O(M) */

      if (currentCount > 1) {
        remainingCommonValuesCount.set(currentNumber, currentCount - 1);
      } else {
        remainingCommonValuesCount.delete(currentNumber);
      }
    }

    nextIndexNums2++;
  }

  return commonValues;
}
