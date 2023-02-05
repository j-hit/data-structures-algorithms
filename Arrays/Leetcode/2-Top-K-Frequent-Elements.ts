/**
 * https://leetcode.com/problems/top-k-frequent-elements/
 *
 * Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.
 *
 * Example 1:
 *
 * Input: nums = [1,1,1,2,2,3], k = 2
 * Output: [1,2]
 *
 * Example 2:
 *
 * Input: nums = [1], k = 1
 * Output: [1]
 *
 * Constraints:
 *
 * 1 <= nums.length <= 10^5
 * -10^4 <= nums[i] <= 10^4
 * k is in the range [1, the number of unique elements in the array].
 * It is guaranteed that the answer is unique.
 */
function topKFrequent(nums: number[], k: number): number[] {
  const numberToOccurences = new Map<number, number>();
  const frequencies: number[][] = Array.from({ length: nums.length }).map(
    () => []
  );

  // count number of times a number occurs
  for (let currentNumber of nums) {
    numberToOccurences.set(
      currentNumber,
      (numberToOccurences.get(currentNumber) ?? 0) + 1
    );
  }

  // put the number of times a number occured in order
  for (let [currentNumber, occurences] of numberToOccurences.entries()) {
    frequencies[occurences].push(currentNumber);
  }

  let topKFrequentNumbers = [];

  // get through list of sorted occurences starting from the end
  for (let index = frequencies.length - 1; index >= 0; index--) {
    for (let currentNumber of frequencies[index]) {
      topKFrequentNumbers.push(currentNumber);
      if (topKFrequentNumbers.length === k) {
        return topKFrequentNumbers;
      }
    }
  }

  return topKFrequentNumbers;
}

console.log(topKFrequent([3, 0, 1, 0], 1));
