import { twoSum } from "./6-Two-Sum";

describe("twoSum", () => {
  it("returns correct indices for [3,4,5,6], target 7", () => {
    expect(twoSum([3, 4, 5, 6], 7)).toEqual([0, 1]);
  });

  it("returns correct indices for [4,5,6], target 10", () => {
    expect(twoSum([4, 5, 6], 10)).toEqual([0, 2]);
  });

  it("returns correct indices for [5,5], target 10", () => {
    expect(twoSum([5, 5], 10)).toEqual([0, 1]);
  });

  it("handles negative numbers", () => {
    expect(twoSum([-1, 2, 3, 4], 1)).toEqual([0, 1]);
    expect(twoSum([-10000000, 10000000], 0)).toEqual([0, 1]);
  });

  it("returns correct indices for all-negative array [-1,-2,-3,-4,-5], target -8", () => {
    expect(twoSum([-1, -2, -3, -4, -5], -8)).toEqual([2, 4]);
  });

  it("returns correct indices for all-negative array, target is sum of first and last", () => {
    expect(twoSum([-5, -3, -1, -7, -2], -12)).toEqual([0, 3]);
  });

  it("returns correct indices for two negatives that sum to a negative", () => {
    expect(twoSum([0, -6, 4, -4], -10)).toEqual([1, 3]);
  });

  it("returns correct indices when one operand is zero and target is negative", () => {
    expect(twoSum([0, -5, 3, 1], -5)).toEqual([0, 1]);
  });

  it("returns correct indices when answer pair is not in order [1,3,4,2], target 6", () => {
    expect(twoSum([1, 3, 4, 2], 6)).toEqual([2, 3]);
  });

  it("handles large numbers", () => {
    expect(twoSum([9000000, 1000000, 8000000], 17000000)).toEqual([0, 2]);
  });

  it("returns [NaN, NaN] if no solution (should not happen)", () => {
    expect(twoSum([1, 2], 100)).toEqual([NaN, NaN]);
  });
});
