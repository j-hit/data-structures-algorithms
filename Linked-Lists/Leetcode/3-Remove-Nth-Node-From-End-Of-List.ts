// https://leetcode.com/problems/remove-nth-node-from-end-of-list/

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

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  if (!head) {
    return head;
  }

  const dummyNode = new ListNode(0, head);

  let leftPointer: ListNode | null = dummyNode;
  let rightPointer: ListNode | null = head;
  for (
    let numberOfPositionsMoved = 0;
    numberOfPositionsMoved < n;
    numberOfPositionsMoved++
  ) {
    if (rightPointer) {
      rightPointer = rightPointer.next;
    }
  }

  while (rightPointer) {
    leftPointer = leftPointer?.next ?? null;
    rightPointer = rightPointer.next;
  }

  // delete node
  if (leftPointer) {
    leftPointer.next = leftPointer?.next?.next ?? null;
  }

  // remove dummy node from output
  return dummyNode.next;
}
