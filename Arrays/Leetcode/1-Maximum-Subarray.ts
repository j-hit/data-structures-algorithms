// https://leetcode.com/problems/maximum-subarray/

function maxSubArray(nums: number[]): number {
  // [-1,1,2,1]
  // Output
  // 3
  // Expected
  // 4

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

console.log(maxSubArray([-1, 1, 2, 1]));
