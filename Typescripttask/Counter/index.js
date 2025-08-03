class Counter {
    constructor() {
        var _a, _b;
        this.value = 0;
        this.decrementBtn = document.getElementById("decrement");
        this.incrementBtn = document.getElementById("increment");
        this.counter = document.getElementById("counter-value");
        if (this.counter) {
            this.counter.innerText = this.value.toString();
        }
        // Add event listeners only if buttons exist
        (_a = this.incrementBtn) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => this.increment());
        (_b = this.decrementBtn) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => this.decrement());
    }
    increment() {
        this.value++;
        if (this.counter) {
            this.counter.innerText = this.value.toString();
        }
    }
    decrement() {
        this.value--;
        if (this.counter) {
            this.counter.innerText = this.value.toString();
        }
    }
}
const counter = new Counter();
