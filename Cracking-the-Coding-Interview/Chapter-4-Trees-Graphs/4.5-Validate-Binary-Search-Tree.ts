/**
 * Validate BST: Implement a function to check if a binary tree is a binary search tree.
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

  public getValue(): T {
    return this.value;
  }
}

export function isValidBinarySearchTree(
  tree: BinaryTree<number> | null,
  minimum: number | null = null,
  maximum: number | null = null
): boolean {
  if (tree === null) {
    return true;
  }

  if (tree.leftNode === null && tree.rightNode === null) {
    return true;
  }

  if (
    tree.leftNode &&
    minimum !== null &&
    tree.leftNode.getValue() <= minimum
  ) {
    return false;
  }
  if (
    tree.rightNode &&
    maximum !== null &&
    tree.rightNode.getValue() > maximum
  ) {
    return false;
  }

  if (!isValidBinarySearchTree(tree.leftNode, minimum, tree.getValue())) {
    return false;
  }
  if (!isValidBinarySearchTree(tree.rightNode, tree.getValue(), maximum)) {
    return false;
  }

  return true;
}

// Example
/*
 *      6
 *     /  \
 *    3    9
 *   /\    /\
 *  1 5  8  11
 */
const root = new BinaryTree(6);
const depth1LeftNode = new BinaryTree(3);
const depth1RightNode = new BinaryTree(9);

const depth2aLeftNode = new BinaryTree(1);
const depth2aRightNode = new BinaryTree(5);

const depth2bLeftNode = new BinaryTree(8);
const depth2bRightNode = new BinaryTree(11);

root.leftNode = depth1LeftNode;
root.rightNode = depth1RightNode;
depth1LeftNode.leftNode = depth2aLeftNode;
depth1LeftNode.rightNode = depth2aRightNode;
depth1RightNode.leftNode = depth2bLeftNode;
depth1RightNode.rightNode = depth2bRightNode;

console.log(isValidBinarySearchTree(root));
