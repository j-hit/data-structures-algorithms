/**
 * Minimal Tree: Given a sorted (increasing order) array with unique integer elements, write an algo­rithm to create a binary search tree with minimal height.
 */

const sortedArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

class BinaryTreeNode {
  private value: number;
  public leftNode: BinaryTreeNode | null;
  public rightNode: BinaryTreeNode | null;

  constructor(value: number) {
    this.value = value;
    this.leftNode = null;
    this.rightNode = null;
  }

  public getValue(): number {
    return this.value;
  }
}

const createBinaryTree = (sortedArray: number[]): BinaryTreeNode | null => {
  if (sortedArray.length === 0) {
    return null;
  }

  if (sortedArray.length === 1) {
    return new BinaryTreeNode(sortedArray[0]);
  }

  const middleIndex = Math.floor(sortedArray.length / 2);
  const middleValue = sortedArray[middleIndex];

  const leftSideOfArray = sortedArray.slice(0, middleIndex);
  const rightSideOfArray = sortedArray.slice(middleIndex + 1);

  const currentNode = new BinaryTreeNode(middleValue);
  currentNode.leftNode = createBinaryTree(leftSideOfArray);
  currentNode.rightNode = createBinaryTree(rightSideOfArray);

  return currentNode;
};

const binaryTree = createBinaryTree(sortedArray);
