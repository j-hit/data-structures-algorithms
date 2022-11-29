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
