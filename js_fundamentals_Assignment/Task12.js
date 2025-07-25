// ## Task 12: Higher-Order Functions (without Callbacks)

// - Write a higher-order function multiplyAll that accepts an array of numbers and a multiplier. The function should return a new array where each element is multiplied by the given multiplier.

// - *Example:*

// js
// multiplyAll([1, 2, 3], 2); // Should return [2, 4, 6]

function multiplyAll(numbers, multiplier) {
  return numbers.map((num) => num * multiplier);
}

console.log(multiplyAll([1, 2, 3], 2));
