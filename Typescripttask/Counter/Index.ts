class Counter {
  private value: number;
  private decrementBtn: HTMLElement | null;
  private incrementBtn: HTMLElement | null;
  private counter: HTMLElement | null;

  constructor() {
    this.value = 0;
    this.decrementBtn = document.getElementById("decrement");
    this.incrementBtn = document.getElementById("increment");
    this.counter = document.getElementById("counter-value");

    if (this.counter) {
      this.counter.innerText = this.value.toString();
    }

    // Add event listeners only if buttons exist
    this.incrementBtn?.addEventListener("click", () => this.increment());
    this.decrementBtn?.addEventListener("click", () => this.decrement());
  }

  increment(): void {
    this.value++;
    if (this.counter) {
      this.counter.innerText = this.value.toString();
    }
  }

  decrement(): void {
    this.value--;
    if (this.counter) {
      this.counter.innerText = this.value.toString();
    }
  }
}

const counter = new Counter();
