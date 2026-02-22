import { moveAllZerosToEndOfArray } from './3-Move-All-Zeros-To-End';

describe('moveAllZerosToEndOfArray', () => {
  it('moves all zeros to the end of the array', () => {
    const arr = [0, 1, 0, 3, 12];
    moveAllZerosToEndOfArray(arr);
    expect(arr).toEqual([1, 3, 12, 0, 0]);
  });

  it('handles array with no zeros', () => {
    const arr = [1, 2, 3];
    moveAllZerosToEndOfArray(arr);
    expect(arr).toEqual([1, 2, 3]);
  });

  it('handles array with all zeros', () => {
    const arr = [0, 0, 0];
    moveAllZerosToEndOfArray(arr);
    expect(arr).toEqual([0, 0, 0]);
  });

  it('handles empty array', () => {
    const arr: number[] = [];
    moveAllZerosToEndOfArray(arr);
    expect(arr).toEqual([]);
  });

  it('handles array with zeros at the end', () => {
    const arr = [1, 2, 3, 0, 0];
    moveAllZerosToEndOfArray(arr);
    expect(arr).toEqual([1, 2, 3, 0, 0]);
  });

  it('handles array with zeros all over', () => {
    const arr = [0, 4, 0, 2, 3, 0, 1, 0];
    moveAllZerosToEndOfArray(arr);
    expect(arr).toEqual([4, 2, 3, 1, 0, 0, 0, 0]);
  });
});
