// https://leetcode.com/problems/climbing-stairs/

/**
 *
 * You are climbing a staircase. It takes n steps to reach the top.
 *
 * Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?
 *
 * Example 1:
 *
 * Input: n = 2
 * Output: 2
 * Explanation: There are two ways to climb to the top.
 * 1. 1 step + 1 step
 * 2. 2 steps
 *
 * Example 2:
 *
 * Input: n = 3
 * Output: 3
 * Explanation: There are three ways to climb to the top.
 * 1. 1 step + 1 step + 1 step
 * 2. 1 step + 2 steps
 * 3. 2 steps + 1 step
 *
 * Constraints:
 *
 * 1 <= n <= 45
 */

// Only solving each decision tree once. With memoization it can be solved in O(n)
// Bottom up dynamic programming approach
// Array of size n is not needed, only two values are needed for each sub problem
// We will have two variables that are shift n - 1 times
export function climbStairs(n: number): number {
  // Start at top of the stairs and work way down
  let numberOfWaysFromPreviousStep = 1;
  let numberOfWaysFromPreviousPreviousStep = 1;

  for (let index = 0; index < n - 1; index++) {
    const numberOfWaysFromTheLastPreviousStep = numberOfWaysFromPreviousStep;
    numberOfWaysFromPreviousStep =
      numberOfWaysFromTheLastPreviousStep +
      numberOfWaysFromPreviousPreviousStep;
    numberOfWaysFromPreviousPreviousStep = numberOfWaysFromTheLastPreviousStep;
  }

  return numberOfWaysFromPreviousStep;
}

// recursive solution with memoization
export function climbStairsRecursisve(n: number): number {
  const startingStairNumberToNumberOfWaysCache = new Map<number, number>();

  const solveRecursively = (stairsNumber: number): number => {
    if (stairsNumber === n) {
      return 1;
    }

    if (stairsNumber > n) {
      return 0;
    }

    if (startingStairNumberToNumberOfWaysCache.has(stairsNumber)) {
      return startingStairNumberToNumberOfWaysCache.get(stairsNumber) ?? 0;
    }

    const climbOneStair =
      startingStairNumberToNumberOfWaysCache.get(stairsNumber + 1) ??
      solveRecursively(stairsNumber + 1);
    const climbTwoStairs =
      startingStairNumberToNumberOfWaysCache.get(stairsNumber + 2) ??
      solveRecursively(stairsNumber + 2);

    return climbOneStair + climbTwoStairs;
  };

  return solveRecursively(0);
}

// console.log(climbStairsRecursisve(44));
// console.log(climbStairs(44));
