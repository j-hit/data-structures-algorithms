// https://structy.net/problems/linked-list-values

// class Node {
//   constructor(val) {
//     this.val = val;
//     this.next = null;
//   }
// }

const linkedListValues = (head) => {
  const values = [];
  let current = head;

  while (current !== null) {
    values.push(current.val);
    current = current.next;
  }
  return values;
};

const linkedListValuesRecursive = (head) => {
  const values = [];
  fillValues(head, values);
  return values;
};

const fillValues = (head, values) => {
  if (head === null) {
    return;
  }

  values.push(head.val);
  fillValues(head.next);
};
