// https://leetcode.com/problems/target-sum/

type IndexTotalHash = string;
const createHashForIndexTotalPair = (
  index: number,
  total: number
): IndexTotalHash => {
  return `${index}, ${total}`;
};

// Solution based on https://www.youtube.com/watch?v=g0npyaQtAQM&list=PLot-Xpze53lcvx_tjrr_m2lgD2NsRHlNO
export function findTargetSumWays(nums: number[], target: number): number {
  const indexTotalToNumberOfWaysMap = new Map<IndexTotalHash, number>();

  const backtrack = (index: number, total: number): number => {
    const FOUND_WAY = 1;
    const FOUND_NO_WAY = 0;

    if (index === nums.length) {
      return total === target ? FOUND_WAY : FOUND_NO_WAY;
    }

    const hashForIndexTotalPair = createHashForIndexTotalPair(index, total);
    if (indexTotalToNumberOfWaysMap.has(hashForIndexTotalPair)) {
      return indexTotalToNumberOfWaysMap.get(hashForIndexTotalPair) ?? 0;
    }

    const numberOfWaysWithAddingNextValue = backtrack(
      index + 1,
      total + nums[index]
    );
    const numberOfWaysWithSubtractingNextValue = backtrack(
      index + 1,
      total - nums[index]
    );
    const totalNumberOfWaysFromHere =
      numberOfWaysWithAddingNextValue + numberOfWaysWithSubtractingNextValue;

    indexTotalToNumberOfWaysMap.set(
      hashForIndexTotalPair,
      totalNumberOfWaysFromHere
    );

    return totalNumberOfWaysFromHere;
  };

  return backtrack(0, 0);
}
