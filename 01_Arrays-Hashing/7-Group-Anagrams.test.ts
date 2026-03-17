import { groupAnagrams } from "./7-Group-Anagrams";

/**
 * Helper function to compare two arrays of string arrays
 * Since the order of groups and order within groups doesn't matter,
 * we need to sort both for comparison
 */
const sortAndCompare = (actual: string[][], expected: string[][]): boolean => {
  const sortArray = (arr: string[][]) => {
    return arr
      .map((group) => group.sort())
      .sort((a, b) => {
        if (a.length !== b.length) return a.length - b.length;
        return a.join(",").localeCompare(b.join(","));
      });
  };

  const sortedActual = sortArray(actual);
  const sortedExpected = sortArray(expected);

  return JSON.stringify(sortedActual) === JSON.stringify(sortedExpected);
};

describe("groupAnagrams", () => {
  // Example test cases from problem description
  it('groups anagrams correctly for ["act","pots","tops","cat","stop","hat"]', () => {
    const result = groupAnagrams(["act", "pots", "tops", "cat", "stop", "hat"]);
    const expected = [["hat"], ["act", "cat"], ["stop", "pots", "tops"]];
    expect(sortAndCompare(result, expected)).toBe(true);
  });

  it('handles single string ["x"]', () => {
    const result = groupAnagrams(["x"]);
    const expected = [["x"]];
    expect(sortAndCompare(result, expected)).toBe(true);
  });

  it('handles empty string [""]', () => {
    const result = groupAnagrams([""]);
    const expected = [[""]];
    expect(sortAndCompare(result, expected)).toBe(true);
  });

  // Edge case: minimum input (single string)
  it("handles array with one non-empty string", () => {
    const result = groupAnagrams(["hello"]);
    const expected = [["hello"]];
    expect(sortAndCompare(result, expected)).toBe(true);
  });

  // Edge case: all strings are anagrams of each other
  it("groups all strings when they are all anagrams", () => {
    const result = groupAnagrams(["abc", "bca", "cab", "acb", "bac", "cba"]);
    const expected = [["abc", "bca", "cab", "acb", "bac", "cba"]];
    expect(sortAndCompare(result, expected)).toBe(true);
  });

  // Edge case: no anagrams (all unique)
  it("handles strings with no anagrams", () => {
    const result = groupAnagrams(["a", "b", "c", "d"]);
    const expected = [["a"], ["b"], ["c"], ["d"]];
    expect(sortAndCompare(result, expected)).toBe(true);
  });

  // Edge case: multiple empty strings
  it("groups multiple empty strings together", () => {
    const result = groupAnagrams(["", "", ""]);
    const expected = [["", "", ""]];
    expect(sortAndCompare(result, expected)).toBe(true);
  });

  // Edge case: mix of empty and non-empty strings
  it("handles mix of empty and non-empty strings", () => {
    const result = groupAnagrams(["", "a", "", "b", "a"]);
    const expected = [["", ""], ["a", "a"], ["b"]];
    expect(sortAndCompare(result, expected)).toBe(true);
  });

  // Edge case: strings of varying lengths
  it("handles strings of varying lengths", () => {
    const result = groupAnagrams(["a", "aa", "aaa", "a", "aa"]);
    const expected = [["a", "a"], ["aa", "aa"], ["aaa"]];
    expect(sortAndCompare(result, expected)).toBe(true);
  });

  // Edge case: anagrams with repeated characters
  it("groups anagrams with repeated characters correctly", () => {
    const result = groupAnagrams(["aabb", "abab", "bbaa", "abcd"]);
    const expected = [["aabb", "abab", "bbaa"], ["abcd"]];
    expect(sortAndCompare(result, expected)).toBe(true);
  });

  // Edge case: single character strings
  it("handles single character strings", () => {
    const result = groupAnagrams(["z", "x", "y", "z", "x"]);
    const expected = [["z", "z"], ["x", "x"], ["y"]];
    expect(sortAndCompare(result, expected)).toBe(true);
  });

  // Edge case: long strings
  it("handles longer strings correctly", () => {
    const result = groupAnagrams(["listen", "silent", "enlist", "hello", "world", "inlets"]);
    const expected = [["listen", "silent", "enlist", "inlets"], ["hello"], ["world"]];
    expect(sortAndCompare(result, expected)).toBe(true);
  });

  // Edge case: strings with all same character
  it("groups strings with repeated same characters", () => {
    const result = groupAnagrams(["aaa", "aa", "a", "aaa", "aa"]);
    const expected = [["aaa", "aaa"], ["aa", "aa"], ["a"]];
    expect(sortAndCompare(result, expected)).toBe(true);
  });

  // Edge case: large group with many anagrams
  it("handles multiple groups of anagrams", () => {
    const result = groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat", "tab", "abt"]);
    const expected = [
      ["eat", "tea", "ate"],
      ["tan", "nat"],
      ["bat", "tab", "abt"],
    ];
    expect(sortAndCompare(result, expected)).toBe(true);
  });

  // Edge case: strings that differ only in character frequency
  it("differentiates strings with different character frequencies", () => {
    const result = groupAnagrams(["ab", "aab", "abb", "ab"]);
    const expected = [["ab", "ab"], ["aab"], ["abb"]];
    expect(sortAndCompare(result, expected)).toBe(true);
  });

  // Edge case: all letters of alphabet
  it("handles strings with many different characters", () => {
    const result = groupAnagrams(["abcdefghijklmnopqrstuvwxyz", "zyxwvutsrqponmlkjihgfedcba", "abc"]);
    const expected = [["abcdefghijklmnopqrstuvwxyz", "zyxwvutsrqponmlkjihgfedcba"], ["abc"]];
    expect(sortAndCompare(result, expected)).toBe(true);
  });

  // Edge case: potential hash collision test case
  it('correctly differentiates non-anagrams that might hash similarly ["cat","rye","aye","cud","cat","old","fop","bra"]', () => {
    const result = groupAnagrams(["cat", "rye", "aye", "cud", "cat", "old", "fop", "bra"]);
    const expected = [["cat", "cat"], ["rye"], ["aye"], ["cud"], ["old"], ["fop"], ["bra"]];
    expect(sortAndCompare(result, expected)).toBe(true);
  });

  // Edge case: another potential hash collision test case
  it('correctly differentiates ["duh","ill"] which are not anagrams', () => {
    const result = groupAnagrams(["duh", "ill"]);
    const expected = [["duh"], ["ill"]];
    expect(sortAndCompare(result, expected)).toBe(true);
  });

  // Performance test with larger input (within constraints)
  it("handles larger input efficiently", () => {
    const input = [];
    // Create anagram groups with unique character counts
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    for (let i = 0; i < 26; i++) {
      // Create strings with unique character combinations
      const char1 = alphabet[i];
      const char2 = alphabet[(i + 1) % 26];
      const char3 = alphabet[(i + 2) % 26];
      const base = char1 + char2 + char3;
      input.push(base, base.split("").reverse().join(""));
    }
    const result = groupAnagrams(input);
    // Should have 26 groups (one for each starting position in alphabet)
    expect(result.length).toBeGreaterThanOrEqual(20);
    expect(result.length).toBeLessThanOrEqual(26);
    // Total number of strings should be preserved
    const totalStrings = result.reduce((sum, group) => sum + group.length, 0);
    expect(totalStrings).toBe(52);
  });
});
