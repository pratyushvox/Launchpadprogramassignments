// # Task 11: Factorial Function with Recursion (Edge Case Handling)

// - Write a function that calculates the factorial of a number using recursion.
// - *Challenge*: Add error handling for invalid inputs (like negative numbers or non-numeric values).
// -

function factorial(n) {
  if (typeof n !== "number" || isNaN(n)) {
    return "Error: Input must be a valid number.";
  }

  if (!Number.isInteger(n) || n < 0) {
    return "Error: Input must be a non-negative integer.";
  }

  if (n === 0 || n === 1) {
    return 1;
  }

  return n * factorial(n - 1);
}
console.log(factorial(10));
console.log(factorial(-2));
