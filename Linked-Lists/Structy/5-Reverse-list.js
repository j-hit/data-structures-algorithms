// https://structy.net/problems/reverse-list

// class Node {
//   constructor(val) {
//     this.val = val;
//     this.next = null;
//   }
// }

const reverseList = (head) => {
  let previous = null;
  let current = head;
  while (current !== null) {
    const next = current.next;
    current.next = previous;
    previous = current;
    current = next;
  }
  return previous;
};

const reverseListRecursive = (head, previous = null) => {
  if (head === null) {
    return previous;
  }
  const next = head.next;
  head.next = previous;
  return reverseListRecursive(next, head);
};
