// https://structy.net/problems/linked-list-find

// class Node {
//   constructor(val) {
//     this.val = val;
//     this.next = null;
//   }
// }

const linkedListFind = (head, target) => {
  let current = head;
  while (current !== null) {
    if (current.val === target) {
      return true;
    }
    current = current.next;
  }
  return false;
};

const linkedListFindRecursive = (head, target) => {
  if (head === null) {
    return false;
  }
  if (head.val === target) {
    return true;
  }
  return linkedListFindRecursive(head.next, target);
};
