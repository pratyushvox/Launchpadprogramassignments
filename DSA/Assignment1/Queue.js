class Queue {
  constructor() {
    this.items = [];
  }

  // Enqueue: Add item at the back
  enqueue(item) {
    this.items.push(item);
  }

  // Dequeue: Remove item from the front
  dequeue() {
    if (this.isEmpty()) {
      return "Queue is empty";
    }
    return this.items.shift();
  }

  // Search: Find index of item
  search(item) {
    return this.items.indexOf(item);
  }

  // Display: Show all elements
  display() {
    console.log("Queue:", this.items.join(" <- "));
  }

  // Check if empty
  isEmpty() {
    return this.items.length === 0;
  }
}

const myQueue = new Queue();


myQueue.enqueue("Apple");
myQueue.enqueue("Banana");
myQueue.enqueue("Cherry");
// here we are adding elements 

myQueue.display(); 
// here we are displaying our elements 



console.log("Dequeued:", myQueue.dequeue());
// with the help of dequeue we are removing front element 

myQueue.display();


// Searching for an element
console.log("Index of 'Cherry':", myQueue.search("Cherry"));
// with the help of search we are searching for the index of cheery

console.log("Index of 'Mango':", myQueue.search("Mango"));
// with the help of search we are searching for the index of Mango

