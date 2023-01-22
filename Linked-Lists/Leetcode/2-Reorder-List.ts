// https://leetcode.com/problems/reorder-list/

/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

/**
 Do not return anything, modify head in-place instead.
 */
function reorderList(head: ListNode | null): void {
  if (head === null) {
    return;
  }

  let slowPointer: ListNode | null = head;
  let fastPointer: ListNode | null = head.next;

  while (fastPointer && fastPointer.next) {
    slowPointer = head.next;
    fastPointer = fastPointer.next.next;
  }

  let secondHalfOfList = slowPointer?.next;
  if (slowPointer?.next) {
    slowPointer.next = null;
  }
}
