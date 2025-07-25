// ### Task 9: Function Expressions and Arrow Functions

// - Write a traditional function expression that accepts two arguments and returns their product.
// - Convert this function into an arrow function.
// - *Bonus*: Modify the arrow function to also log the result before returning it.

//traditional function expression
function sum(a, b) {
  return a + b;
}

// arrow function expression
const arrowfunctionsum = (a, b) => {
  const sum = a + b;

  return sum;
};
console.log(sum(2, 7));
console.log(arrowfunctionsum(1, 2));
