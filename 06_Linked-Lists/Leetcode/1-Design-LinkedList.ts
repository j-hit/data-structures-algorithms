/**
 * Design Linked List https://leetcode.com/explore/learn/card/linked-list/209/singly-linked-list/1290/
  
  Design your implementation of the linked list. You can choose to use a singly or doubly linked list.
  A node in a singly linked list should have two attributes: val and next. val is the value of the current node, and next is a pointer/reference to the next node.
  If you want to use the doubly linked list, you will need one more attribute prev to indicate the previous node in the linked list. Assume all nodes in the linked list are 0-indexed.

  Implement the MyLinkedList class:

  MyLinkedList() Initializes the MyLinkedList object.
  int get(int index) Get the value of the indexth node in the linked list. If the index is invalid, return -1.
  void addAtHead(int val) Add a node of value val before the first element of the linked list. After the insertion, the new node will be the first node of the linked list.
  void addAtTail(int val) Append a node of value val as the last element of the linked list.
  void addAtIndex(int index, int val) Add a node of value val before the indexth node in the linked list. If index equals the length of the linked list, the node will be appended to the end of the linked list. If index is greater than the length, the node will not be inserted.
  void deleteAtIndex(int index) Delete the indexth node in the linked list, if the index is valid.

  Example 1:

  Input
  ["MyLinkedList", "addAtHead", "addAtTail", "addAtIndex", "get", "deleteAtIndex", "get"]
  [[], [1], [3], [1, 2], [1], [1], [1]]

  Output
  [null, null, null, null, 2, null, 3]

  Explanation
  MyLinkedList myLinkedList = new MyLinkedList();
  myLinkedList.addAtHead(1);
  myLinkedList.addAtTail(3);
  myLinkedList.addAtIndex(1, 2);    // linked list becomes 1->2->3
  myLinkedList.get(1);              // return 2
  myLinkedList.deleteAtIndex(1);    // now the linked list is 1->3
  myLinkedList.get(1);              // return 3
  

  Constraints:

  0 <= index, val <= 1000
  Please do not use the built-in LinkedList library.
  At most 2000 calls will be made to get, addAtHead, addAtTail, addAtIndex and deleteAtIndex.
 * 
 */

class LinkedListNode {
  private nextNode: LinkedListNode | null;

  constructor(private value: number) {
    this.nextNode = null;
  }

  public getNextNode(): LinkedListNode | null {
    return this.nextNode;
  }

  public setNextNode(next: LinkedListNode | null): void {
    this.nextNode = next;
  }

  public getValueNode(): number {
    return this.value;
  }

  public setValueNode(value: number): void {
    this.value = value;
  }
}

class MyLinkedList {
  private head: LinkedListNode | null;

  constructor() {
    this.head = null;
  }

  get(index: number): number {
    let currentNode: LinkedListNode | null = this.head;
    let currentNodeIndex = 0;

    while (currentNode && currentNodeIndex !== index) {
      currentNode = currentNode.getNextNode();
      currentNodeIndex++;
    }
    return currentNode?.getValueNode() ?? -1;
  }

  addAtHead(val: number): void {
    const newNode = new LinkedListNode(val);

    newNode.setNextNode(this.head);
    this.head = newNode;
  }

  addAtTail(val: number): void {
    const newNode = new LinkedListNode(val);

    if (!this.head) {
      this.head = newNode;
      return;
    }

    let currentNode: LinkedListNode = this.head;

    while (currentNode.getNextNode() !== null) {
      currentNode = currentNode.getNextNode()!;
    }
    currentNode.setNextNode(newNode);
  }

  addAtIndex(index: number, val: number): void {
    if (index === 0) {
      this.addAtHead(val);
      return;
    }

    const newNode = new LinkedListNode(val);

    let previousNode = this.head;
    let nextNode = this.head?.getNextNode();

    let nextIndex = 1;

    while (nextNode && nextIndex !== index) {
      previousNode = nextNode;
      nextNode = nextNode.getNextNode();

      nextIndex++;
    }

    previousNode?.setNextNode(newNode);

    if (nextNode) {
      newNode.setNextNode(nextNode);
    }
  }

  deleteAtIndex(index: number): void {
    if (index === 0) {
      this.head = this.head?.getNextNode() ?? null;
    }

    let previousNode = this.head;
    let currentNode = this.head?.getNextNode();

    let currentIndex = 1;

    while (currentNode && currentIndex !== index) {
      previousNode = currentNode;
      currentNode = currentNode.getNextNode();

      currentIndex++;
    }

    if (currentNode) {
      previousNode?.setNextNode(currentNode.getNextNode());
    }
  }
}

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */
