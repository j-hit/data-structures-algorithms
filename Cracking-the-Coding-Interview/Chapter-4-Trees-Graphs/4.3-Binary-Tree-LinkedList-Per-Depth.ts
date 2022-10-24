/**
 * List of Depths: Given a binary tree, design an algorithm which creates a linked list of all the nodes at each depth (e.g., if you have a tree with depth D, you'll have D linked lists).
 */

class LinkedListNode<T> {
  private value: T;
  public next: LinkedListNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }

  public getValue(): T {
    return this.value;
  }
}

class LinkedList<T> {
  public head: LinkedListNode<T>;

  constructor(initialValue: T) {
    this.head = new LinkedListNode<T>(initialValue);
  }

  public addNode(node: LinkedListNode<T>) {
    let currentNode = this.head;
    while (currentNode.next !== null) {
      currentNode = currentNode.next;
    }

    currentNode.next = node;
  }
}

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

type BinaryTreeDepth = number;

export const createLinkedListPerDepth = <T>(
  binaryTree: BinaryTree<T>
): Map<BinaryTreeDepth, LinkedList<T>> => {
  const depthLinkedLists = new Map<BinaryTreeDepth, LinkedList<T>>();

  // Breadth first traversal
  const queue = [{ depth: 0, tree: binaryTree }];

  while (!(queue.length === 0)) {
    const currentItem = queue.shift();
    if (currentItem) {
      if (!depthLinkedLists.has(currentItem.depth)) {
        depthLinkedLists.set(
          currentItem.depth,
          new LinkedList<T>(currentItem.tree.getRootValue())
        );
      } else {
        depthLinkedLists
          .get(currentItem.depth)
          ?.addNode(new LinkedListNode<T>(currentItem.tree.getRootValue()));
      }

      if (currentItem.tree.leftNode) {
        queue.push({
          depth: currentItem.depth + 1,
          tree: currentItem.tree.leftNode,
        });
      }
      if (currentItem.tree.rightNode) {
        queue.push({
          depth: currentItem.depth + 1,
          tree: currentItem.tree.rightNode,
        });
      }
    }
  }

  return depthLinkedLists;
};

// Example
const binaryTreeRoot = new BinaryTree(6);
const binaryTreeDepth1Left = new BinaryTree(4);
const binaryTreeDepth1Right = new BinaryTree(2);
const binaryTreeDepth2aLeft = new BinaryTree(10);
const binaryTreeDepth2aRight = new BinaryTree(5);
const binaryTreeDepth2bLeft = new BinaryTree(7);
const binaryTreeDepth2bRight = new BinaryTree(9);

binaryTreeRoot.leftNode = binaryTreeDepth1Left;
binaryTreeRoot.rightNode = binaryTreeDepth1Right;
binaryTreeDepth1Left.leftNode = binaryTreeDepth2aLeft;
binaryTreeDepth1Left.rightNode = binaryTreeDepth2aRight;
binaryTreeDepth1Right.leftNode = binaryTreeDepth2bLeft;
binaryTreeDepth1Right.rightNode = binaryTreeDepth2bRight;

const linkedLists = createLinkedListPerDepth(binaryTreeRoot);
console.log(linkedLists);
