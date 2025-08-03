class Counter {
  constructor() {
    this.value = 0;
    this.decrementBtn = document.getElementById("decrement");
    this.incrementBtn = document.getElementById("increment");
    this.counter = document.getElementById("counter-value");
    this.counter.innerText = this.value;

    // Add event listeners
    this.incrementBtn.addEventListener("click", () => this.increment());//increment the value
    this.decrementBtn.addEventListener("click", () => this.decrement());//decrement the value
  }

  increment() {
    this.value++;
    this.counter.innerText = this.value;
  }

  decrement() {
    this.value--;
    this.counter.innerText = this.value;
  }
}

const counter = new Counter();
