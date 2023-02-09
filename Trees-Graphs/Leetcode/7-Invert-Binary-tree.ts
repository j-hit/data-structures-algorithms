/**
 * https://leetcode.com/problems/invert-binary-tree/
 *
 * Given the root of a binary tree, invert the tree, and return its root.
 *
 * Input: root = [4,2,7,1,3,6,9]
 * Output: [4,7,2,9,6,3,1]
 *
 * Input: root = [2,1,3]
 * Output: [2,3,1]
 *
 * Input: root = []
 * Output: []
 *
 * Constraints:
 *
 * The number of nodes in the tree is in the range [0, 100].
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

function invertTree(root: TreeNode | null): TreeNode | null {
  if (!root) {
    return null;
  }
  // swap the children
  const currentLeftNode = root.left;
  root.left = root.right;
  root.right = currentLeftNode;

  invertTree(root.left);
  invertTree(root.right);

  return root;
}
