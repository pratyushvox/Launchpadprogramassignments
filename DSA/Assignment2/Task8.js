class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  // Check if list is empty
  isEmpty() {
    return this.length === 0;
  }

  // Return size of the list
  size() {
    return this.length;
  }

  // Add node at the end
  append(data) {
    const node = new Node(data);
    if (!this.head) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next) current = current.next;
      current.next = node;
    }
    this.length++;
  }

  // Add node at the beginning
  prepend(data) {
    const node = new Node(data);
    node.next = this.head;
    this.head = node;
    this.length++;
  }

  // Insert node at specified index (0-based)
  insertAt(index, data) {
    if (index < 0 || index > this.length) return false; 

    if (index === 0) {
      this.prepend(data);
      return true;
    }

    const node = new Node(data);
    let current = this.head;
    let prev = null;
    let i = 0;

    while (i < index) {
      prev = current;
      current = current.next;
      i++;
    }

    node.next = current;
    prev.next = node;
    this.length++;

    return true;
  }

  // Remove node at specified index and return its data
  removeAt(index) {
    if (index < 0 || index >= this.length) return null; 

    let current = this.head;

    if (index === 0) {
      this.head = current.next;
    } else {
      let prev = null;
      let i = 0;

      while (i < index) {
        prev = current;
        current = current.next;
        i++;
      }

      prev.next = current.next;
    }

    this.length--;
    return current.data;
  }

  // Search for data and return its index, or -1 if not found
  search(data) {
    let current = this.head;
    let index = 0;

    while (current) {
      if (current.data === data) return index;
      current = current.next;
      index++;
    }

    return -1;
  }

  // Clear the entire list
  clear() {
    this.head = null;
    this.length = 0;
  }

  // Print the list nodes data in order
  printList() {
    let current = this.head;
    const result = [];

    while (current) {
      result.push(current.data);
      current = current.next;
    }

    console.log("Linked List:", result.join(" -> "));
  }
}

const list = new LinkedList();
list.append(1);
list.append(2);
list.prepend(0);
list.insertAt(2, 5);
list.printList(); 
console.log("Size:", list.size()); // 4
console.log("Index of 5:", list.search(5)); 
console.log("Removed:", list.removeAt(1)); 
list.printList(); 
list.clear();
console.log("Is empty?", list.isEmpty()); 

