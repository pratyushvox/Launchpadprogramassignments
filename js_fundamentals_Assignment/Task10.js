// - Write a function outer that returns another function inner. The inner function should add a specific number (from the outer function) to an argument passed to it.
// - *Challenge*: Demonstrate how closures allow the inner function to remember the value of the outer function’s variable even after outer has finished execution.

function outer_function(add) {
  function inner_function(num) {
    return num + add;
  }
  return inner_function;
}

const addingnumber = outer_function(5);
console.log(addingnumber(10));
