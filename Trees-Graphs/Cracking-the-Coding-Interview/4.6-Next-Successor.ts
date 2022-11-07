/**
 * Successor: Write an algorithm to find the "next" node (i.e., in-order successor) of a given node in a binary search tree.
 * You may assume that each node has a link to its parent.
 */

class BinaryTreeNode<T> {
  private value: T;
  public leftNode: BinaryTreeNode<T> | null;
  public rightNode: BinaryTreeNode<T> | null;
  public parentNode: BinaryTreeNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.leftNode = null;
    this.rightNode = null;
    this.parentNode = null;
  }

  public getValue(): T {
    return this.value;
  }
}

export const nextInorderSuccessor = <T>(
  node: BinaryTreeNode<T>
): BinaryTreeNode<T> | null => {
  if (node === null) {
    return null;
  }

  if (node.rightNode !== null) {
    return childFurthestLeft(node.rightNode);
  } else {
    let currentNode = node;
    let parentNode = node.parentNode;
    while (parentNode !== null && currentNode !== parentNode.leftNode) {
      currentNode = parentNode;
      parentNode = currentNode.parentNode;
    }
    return parentNode;
  }
};

const childFurthestLeft = <T>(
  node: BinaryTreeNode<T> | null
): BinaryTreeNode<T> | null => {
  if (node === null) {
    return null;
  }
  let currentNode = node;
  while (currentNode.leftNode !== null) {
    currentNode = currentNode.leftNode;
  }
  return currentNode;
};

// Example

/*
 *      6
 *     /  \
 *    3    9
 *   /\    /\
 *  1 5  8  11
 */
const root = new BinaryTreeNode(6);
const depth1LeftNode = new BinaryTreeNode(3);
const depth1RightNode = new BinaryTreeNode(9);

const depth2aLeftNode = new BinaryTreeNode(1);
const depth2aRightNode = new BinaryTreeNode(5);

const depth2bLeftNode = new BinaryTreeNode(8);
const depth2bRightNode = new BinaryTreeNode(11);

root.leftNode = depth1LeftNode;
root.rightNode = depth1RightNode;
depth1LeftNode.parentNode = root;
depth1RightNode.parentNode = root;

depth1LeftNode.leftNode = depth2aLeftNode;
depth2aLeftNode.parentNode = depth1LeftNode;
depth2aRightNode.parentNode = depth1LeftNode;
depth1LeftNode.rightNode = depth2aRightNode;

depth1RightNode.leftNode = depth2bLeftNode;
depth1RightNode.rightNode = depth2bRightNode;
depth2bLeftNode.parentNode = depth1RightNode;
depth2bRightNode.parentNode = depth1RightNode;

console.log(nextInorderSuccessor(root));
