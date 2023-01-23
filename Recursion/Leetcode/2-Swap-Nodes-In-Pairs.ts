/**
 * https://leetcode.com/explore/learn/card/recursion-i/250/principle-of-recursion/1681/
 *
 * Given a linked list, swap every two adjacent nodes and return its head. You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed.)
 *
 * Input: head = [1,2,3,4]
 * Output: [2,1,4,3]
 *
 * Input: head = []
 * Output: []
 *
 * Input: head = [1]
 * Output: [1]
 *
 * Constraints:
 *
 * The number of nodes in the list is in the range [0, 100].
 * 0 <= Node.val <= 100
 */

/**
 * Definition for singly-linked list.
 */
export class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;

    this.next = next === undefined ? null : next;
  }
}

function swapPairs(head: ListNode | null): ListNode | null {
  if (!head) {
    return head;
  }
  if (!head.next) {
    return head;
  }

  let firstNode = head;
  let secondNode = head.next;
  let thirdNode = head.next?.next;

  head = secondNode;
  secondNode = firstNode;
  head.next = secondNode;
  secondNode.next = swapPairs(thirdNode ?? null);

  return head;
}
