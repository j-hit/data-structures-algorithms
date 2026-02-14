// https://structy.net/problems/sum-list

// class Node {
//   constructor(val) {
//     this.val = val;
//     this.next = null;
//   }
// }

const sumList = (head) => {
  let sum = 0;
  let current = head;
  while (current !== null) {
    sum += current.val;
    current = current.next;
  }
};

const sumListRecursive = (head) => {
  if (head === null) {
    return 0;
  }
  return head.val + sumListRecursive(head.next);
};
