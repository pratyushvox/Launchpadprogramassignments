// # Task 8: Function with Multiple Parameters & Default Parameters
// ​
// - Write a function that accepts two parameters: a string (greeting) and a number (times). The function should print the greeting multiple times (based on the value of times). If no times parameter is provided, it defaults to 3.
// - *Bonus*: Add a validation to check if times is a positive integer.

function repeatGreeting(greet, n = 3) {
  if (!Number.isInteger(n) || n <= 0) {
    console.log("n must be positive integer .");
    return;
  }

  for (let i = 0; i < n; i++) {
    console.log(greet);
  }
}
console.log(repeatGreeting("Namaste", 10));
