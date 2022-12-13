/*
  https://leetcode.com/problems/maximum-subarray/

  Given an integer array nums, find the subarray which has the largest sum and return its sum.

  Example 1:

  Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
  Output: 6
  Explanation: [4,-1,2,1] has the largest sum = 6.
  
  Example 2:

  Input: nums = [1]
  Output: 1
  
  Example 3:

  Input: nums = [5,4,-1,7,8]
  Output: 23

*/

function maxSubArray(nums: number[]): number {
  if (nums.length === 1) {
    return nums[0];
  }

  let largestSum = nums[0];
  let subTotal = nums[0] > 0 ? nums[0] : 0;

  for (let index = 1; index < nums.length; index++) {
    if (nums[index] > largestSum) {
      largestSum = nums[index];
    }

    subTotal += nums[index];
    if (subTotal < 0) {
      subTotal = 0;
    } else if (subTotal > largestSum) {
      largestSum = subTotal;
    }
  }

  return largestSum;
}

// Based on https://www.youtube.com/watch?v=5WZl3MMT0Eg
function maxSubArrayAlternativeSolution(nums: number[]): number {
  let maxSubArray = nums[0];
  let currentSum = 0;

  for (let currentNumber of nums) {
    if (currentSum < 0) {
      currentSum = 0;
    }
    currentSum += currentNumber;
    maxSubArray = Math.max(maxSubArray, currentSum);
  }
  return maxSubArray;
}

console.log(maxSubArray([-1, 1, 2, 1]));
