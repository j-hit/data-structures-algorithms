/**
 * Check Balanced: Implement a function to check if a binary tree is balanced. For the purposes of this question, a balanced tree is defined to be a tree such that the heights of the two subtrees of any node never differ by more than one.
 */

class BinaryTree<T> {
  private value: T;
  public leftNode: BinaryTree<T> | null;
  public rightNode: BinaryTree<T> | null;

  constructor(value: T) {
    this.value = value;
    this.leftNode = null;
    this.rightNode = null;
  }

  public getRootValue(): T {
    return this.value;
  }
}

export const isBinaryTreeBalanced = <T>(binaryTree: BinaryTree<T>): boolean => {
  if (binaryTree.leftNode === null && binaryTree.rightNode === null) {
    return true;
  }

  const heightOfLeftSubTree = binaryTree.leftNode
    ? calculateHeightOfSubTree(binaryTree.leftNode)
    : 0;
  const heightOfRightSubTree = binaryTree.rightNode
    ? calculateHeightOfSubTree(binaryTree.rightNode)
    : 0;

  const heightDifference = Math.abs(heightOfLeftSubTree - heightOfRightSubTree);

  if (heightDifference > 1) {
    return false;
  }

  return true;
};

const calculateHeightOfSubTree = <T>(binaryTree: BinaryTree<T>): number => {
  if (binaryTree.leftNode === null && binaryTree.rightNode === null) {
    return 1;
  }

  const heightOfLeftSubTree = binaryTree.leftNode
    ? calculateHeightOfSubTree(binaryTree.leftNode)
    : 0;
  const heightOfRightSubTree = binaryTree.rightNode
    ? calculateHeightOfSubTree(binaryTree.rightNode)
    : 0;

  return Math.max(heightOfLeftSubTree, heightOfRightSubTree) + 1;
};

// Example
const binaryTreeRoot = new BinaryTree(6);
// const binaryTreeDepth1Left = new BinaryTree(4);
const binaryTreeDepth1Right = new BinaryTree(2);
const binaryTreeDepth2bLeft = new BinaryTree(7);
const binaryTreeDepth2bRight = new BinaryTree(9);

// binaryTreeRoot.leftNode = binaryTreeDepth1Left;
binaryTreeRoot.rightNode = binaryTreeDepth1Right;
binaryTreeDepth1Right.leftNode = binaryTreeDepth2bLeft;
binaryTreeDepth1Right.rightNode = binaryTreeDepth2bRight;

console.log(isBinaryTreeBalanced(binaryTreeRoot));
