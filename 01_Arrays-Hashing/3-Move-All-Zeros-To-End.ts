/**
 * Constraints:
 * Has to be done in same array
 * Can have duplciate values
 * Ideas:
 * - two pointer approach
 * - left point is at location where non-zero element shall be placed. When right pointer moves out of bounds, left pointer fills in remaining slots with zeros
 * Examples:
 * [0, 4, 0, 2, 3, 0, 1, 0] => [4, 2, 3, 1, 0, 0, 0, 0]
 *
 *              L         R
 * [0, 4, 0, 2, 3, 0, 1, 0]
 * [4, 2, 3, 1, 0, 0, 0, 0]
 *
 * Time complexity: 0(n)
 * Edge cases:
 * - Arrays with only zeros
 * - Arrays with no zeros
 * - Array with duplicate numbers
 * - Zeros at the beginning
 * - Zeros only at the end
 */
export const moveAllZerosToEndOfArray = (originalArray: number[]): number[] => {
  /** Pointer L = insertionPointer */
  let insertionPointer = 0;

  /**
   * Pointer R = iterationPointer
   */
  for (
    let iterationPointer = 0;
    iterationPointer < originalArray.length;
    iterationPointer++
  ) {
    const valueAtCurrentPosition = originalArray[iterationPointer];
    if (valueAtCurrentPosition !== 0) {
      originalArray[insertionPointer] = valueAtCurrentPosition;
      insertionPointer += 1;
    }
  }

  for (; insertionPointer < originalArray.length; insertionPointer++) {
    originalArray[insertionPointer] = 0;
  }

  return originalArray;
};
