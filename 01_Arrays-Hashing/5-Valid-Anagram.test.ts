import { isAnagram } from "./5-Valid-Anagram";

describe("isAnagram", () => {
  it("returns true for valid anagrams", () => {
    expect(isAnagram("racecar", "carrace")).toBe(true);
    expect(isAnagram("listen", "silent")).toBe(true);
    expect(isAnagram("aabbcc", "baccab")).toBe(true);
    expect(isAnagram("a", "a")).toBe(true);
  });

  it("returns false for strings with different lengths", () => {
    expect(isAnagram("abc", "ab")).toBe(false);
    expect(isAnagram("a", "")).toBe(false);
  });

  it("returns false for non-anagrams with same length", () => {
    expect(isAnagram("jar", "jam")).toBe(false);
    expect(isAnagram("abc", "abd")).toBe(false);
  });

  it("returns true for empty strings", () => {
    expect(isAnagram("", "")).toBe(true);
  });

  it("returns true for strings with all the same characters", () => {
    expect(isAnagram("aaaa", "aaaa")).toBe(true);
    expect(isAnagram("bbbb", "bbbb")).toBe(true);
  });

  it("returns false for strings with same characters but different counts", () => {
    expect(isAnagram("aabb", "aab")).toBe(false);
    expect(isAnagram("abc", "aabbcc")).toBe(false);
  });

  it("returns false for strings of different lengths", () => {
    expect(isAnagram("abc", "ab")).toBe(false);
    expect(isAnagram("abcd", "abc")).toBe(false);
    expect(isAnagram("a", "")).toBe(false);
    expect(isAnagram("", "a")).toBe(false);
    expect(isAnagram("longstring", "short")).toBe(false);
  });
});
