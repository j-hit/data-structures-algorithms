/**
 * Minimum Index Sum of Two Lists
 *
 * https://leetcode.com/explore/learn/card/hash-table/184/comparison-with-other-data-structures/1177/
 *
 * Given two arrays of strings list1 and list2, find the common strings with the least index sum.
 *
 * A common string is a string that appeared in both list1 and list2.
 *
 * A common string with the least index sum is a common string such that if it appeared at list1[i] and list2[j] then i + j should be the minimum value among all the other common strings.
 *
 * Return all the common strings with the least index sum. Return the answer in any order.
 *
 * Example 1:
 * Input: list1 = ["Shogun","Tapioca Express","Burger King","KFC"], list2 = ["Piatti","The Grill at Torrey Pines","Hungry Hunter Steakhouse","Shogun"]
 * Output: ["Shogun"]
 * Explanation: The only common string is "Shogun".
 *
 * Example 2:
 * Input: list1 = ["Shogun","Tapioca Express","Burger King","KFC"], list2 = ["KFC","Shogun","Burger King"]
 * Output: ["Shogun"]
 * Explanation: The common string with the least index sum is "Shogun" with index sum = (0 + 1) = 1.
 *
 * Example 3:
 * Input: list1 = ["happy","sad","good"], list2 = ["sad","happy","good"]
 * Output: ["sad","happy"]
 * Explanation: There are three common strings:
 * "happy" with index sum = (0 + 1) = 1.
 * "sad" with index sum = (1 + 0) = 1.
 * "good" with index sum = (2 + 2) = 4.
 * The strings with the least index sum are "sad" and "happy".
 *
 * Constraints:
 * 1 <= list1.length, list2.length <= 1000
 * 1 <= list1[i].length, list2[i].length <= 30
 * list1[i] and list2[i] consist of spaces ' ' and English letters.
 * All the strings of list1 are unique.
 * All the strings of list2 are unique.
 */

/**
 * One HashMap, loop over second list
 * Time O(list1) + O(list2) | Space O(N)
 * Alternative solutions https://leetcode.com/problems/minimum-index-sum-of-two-lists/solution/
 */
function findRestaurant(list1: string[], list2: string[]): string[] {
  const list1NameIndexMap = new Map();
  /* Time O(list1) */
  for (let index = 0; index < list1.length; index++) {
    list1NameIndexMap.set(list1[index], index); /* Space O(list1) */
  }

  let lowestIndexSum = Number.MAX_VALUE;
  let lowestIndexSumStrings: string[] = [];
  /* Time O(list2) */
  for (let index = 0; index < list2.length; index++) {
    if (list1NameIndexMap.has(list2[index])) {
      const indexSum = list1NameIndexMap.get(list2[index]) + index;
      if (indexSum < lowestIndexSum) {
        lowestIndexSum = indexSum;
        lowestIndexSumStrings = [list2[index]]; /* Space ? */
      } else if (indexSum === lowestIndexSum) {
        lowestIndexSumStrings = [
          ...lowestIndexSumStrings,
          list2[index],
        ]; /* Space ? */
      }
    }
  }

  return lowestIndexSumStrings;
}
