import { containsDuplicateNumber } from "./4-Contains-Duplicate";

describe("containsDuplicateNumber", () => {
  it("returns true if array contains duplicates", () => {
    expect(containsDuplicateNumber([1, 2, 3, 1])).toBe(true);
    expect(containsDuplicateNumber([2, 2, 2, 2])).toBe(true);
    expect(containsDuplicateNumber([1, 1])).toBe(true);
  });

  it("returns false if array has all unique elements", () => {
    expect(containsDuplicateNumber([1, 2, 3, 4])).toBe(false);
    expect(containsDuplicateNumber([99, 100, 101])).toBe(false);
  });

  it("returns false for empty array", () => {
    expect(containsDuplicateNumber([])).toBe(false);
  });

  it("returns false for single element array", () => {
    expect(containsDuplicateNumber([42])).toBe(false);
  });

  it("returns true for array with negative numbers and duplicates", () => {
    expect(containsDuplicateNumber([-1, -2, -3, -1])).toBe(true);
    expect(containsDuplicateNumber([-5, -5, -5])).toBe(true);
  });

  it("returns false for array with negative numbers and no duplicates", () => {
    expect(containsDuplicateNumber([-1, -2, -3, -4])).toBe(false);
    expect(containsDuplicateNumber([-10, -20, -30])).toBe(false);
  });

  it("returns true for array with NaN duplicates", () => {
    expect(containsDuplicateNumber([NaN, NaN])).toBe(true);
  });

  it("returns false for array with single NaN", () => {
    expect(containsDuplicateNumber([NaN])).toBe(false);
  });

  it("returns true for array with Infinity duplicates", () => {
    expect(containsDuplicateNumber([Infinity, Infinity])).toBe(true);
    expect(containsDuplicateNumber([-Infinity, -Infinity])).toBe(true);
  });

  it("returns false for array with unique Infinity values", () => {
    expect(containsDuplicateNumber([Infinity, -Infinity])).toBe(false);
  });
});
