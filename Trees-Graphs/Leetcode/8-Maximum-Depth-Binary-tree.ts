/**
 * https://leetcode.com/problems/maximum-depth-of-binary-tree/
 *
 * Given the root of a binary tree, return its maximum depth.
 *
 * A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.
 *
 * Example 1:
 * Input: root = [3,9,20,null,null,15,7]
 * Output: 3
 *
 * Example 2:
 * Input: root = [1,null,2]
 * Output: 2
 *
 * Constraints:
 *
 * The number of nodes in the tree is in the range [0, 104].
 * -100 <= Node.val <= 100
 */
/**
 * Definition for a binary tree node.
 */
export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

function maxDepth(root: TreeNode | null): number {
  if (!root) {
    return 0;
  }

  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

function maxDepthIterativeBFS(root: TreeNode | null): number {
  if (!root) {
    return 0;
  }

  let maximumLevel = 0;
  let queue: TreeNode[] = [root];
  while (queue.length > 0) {
    // remove all nodes from current level
    for (let index = 0; index < queue.length; index++) {
      let currentNode = queue.shift();
      // all children of current node
      if (currentNode?.left) {
        queue.push(currentNode.left);
      }
      if (currentNode?.right) {
        queue.push(currentNode.right);
      }
    }
    maximumLevel += 1;
  }
  return maximumLevel;
}

function maxDepthIterativePreorderDFS(root: TreeNode | null): number {
  if (!root) {
    return 0;
  }

  let stack: { node: TreeNode | null; depth: number }[] = [
    { node: root, depth: 1 },
  ];
  let maximumDepth = 1;

  while (stack.length > 0) {
    let nextItemFromStack = stack.pop();
    if (nextItemFromStack) {
      let { node, depth } = nextItemFromStack;
      if (node) {
        maximumDepth = Math.max(maximumDepth, depth);
        stack.push({ node: node.left, depth: depth + 1 });
        stack.push({ node: node.right, depth: depth + 1 });
      }
    }
  }
  return maximumDepth;
}
