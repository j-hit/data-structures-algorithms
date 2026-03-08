/**
 * Goal: nums[i] + nums[j] == target
 * Constraints:
 * - i != j
 * - 2 <= nums.length <= 1000
 * - -10,000,000 <= nums[i] <= 10,000,000
 * - -10,000,000 <= target <= 10,000,000
 * Assumptions:
 * - Every input has exactly one pair of indices i and j that satisfy the condition
 * - 10,000,000 ~= 2^24
 * - Javascript max number ~= (2^53)-1
 * Conditions:
 * - Return the answer with the smaller index first
 * Runtime complexity:
 * - O(0.5n) = O(n)
 * Space complexity:
 * - O(2n) = O(n)
 */
export const twoSum = (nums: number[], target: number): [number, number] => {
  let pointer1 = 0;
  let pointer2 = nums.length - 1;

  /**
   * key = the value seen at a given position
   * value = the index where the value was seen
   */
  const historyOfSeenValues = new Map<number, number>([]);

  while (pointer1 <= pointer2) {
    const valueAtPointer1 = nums[pointer1];
    const valueAtPointer2 = nums[pointer2];

    if (valueAtPointer1 + valueAtPointer2 === target) {
      return [pointer1, pointer2];
    } else {
      historyOfSeenValues.set(valueAtPointer1, pointer1);
      historyOfSeenValues.set(valueAtPointer2, pointer2);

      const valueNeededForP1 = target - valueAtPointer1;
      const valueNeededForP2 = target - valueAtPointer2;
      if (historyOfSeenValues.has(valueNeededForP1)) {
        const indexNeededForP1 =
          historyOfSeenValues.get(valueNeededForP1) ?? Infinity;

        if (indexNeededForP1 !== pointer1) {
          return [
            Math.min(pointer1, indexNeededForP1),
            Math.max(pointer1, indexNeededForP1),
          ];
        }
      }
      if (historyOfSeenValues.has(valueNeededForP2)) {
        const indexNeededForP2 =
          historyOfSeenValues.get(valueNeededForP2) ?? Infinity;
        if (indexNeededForP2 !== pointer2) {
          return [
            Math.min(pointer2, indexNeededForP2),
            Math.max(pointer2, indexNeededForP2),
          ];
        }
      }

      pointer1++;
      pointer2--;
    }
  }

  // Just for completeness - assumption is there will always be a match found in the loop above
  return [Number.NaN, Number.NaN];
};
