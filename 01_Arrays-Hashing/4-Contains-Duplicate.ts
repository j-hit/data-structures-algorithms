/**
 * Given an integer array nums, return true if any value appears more than once in the array, otherwise return false.
 * Constraints:
 * - You should aim for a solution with O(n) time and O(n) space, where n is the size of the input array.
 * Idea:
 * - Go though array from start to end
 * - Put element into a set
 * - Check if element is already in the set
 *  - If yes -> return true
 *  - If no -> continue
 * - If end of array is reached -> return false
 * Edge cases:
 * - Empty array
 * - Array of all duplicates
 * - Array of no duplicates
 * - Array with negative numbers
 * - Array with NaN
 * - Array with Infinity
 */
export const containsDuplicateNumber = (arrayOfNumbers: number[]): boolean => {
  if (arrayOfNumbers.length === 0) {
    return false;
  }

  const numbersAlreadySeen = new Set<number>();
  /**
   * We add the first item to the array without checking -> cannot be a duplicate
   */
  numbersAlreadySeen.add(arrayOfNumbers[0]);

  /**
   * We start to index 1, index 0 we handled above
   */
  for (
    let indexOfNumber = 1;
    indexOfNumber < arrayOfNumbers.length;
    indexOfNumber++
  ) {
    const numberAtIndex = arrayOfNumbers[indexOfNumber];
    if (numbersAlreadySeen.has(numberAtIndex)) {
      return true;
    }

    numbersAlreadySeen.add(numberAtIndex);
  }

  return false;
};
