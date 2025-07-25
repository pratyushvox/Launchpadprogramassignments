//  Functions Tasks

// ### Task 7: Function Declaration, Parameters, and Return Values

// - Write a function that accepts an array of numbers and returns the sum of all the numbers greater than 10.
// - *Challenge*: Extend the function to return the average of the numbers greater than 10.

function sumGreaterThan10(numbers) {
  const filteredNumbers = numbers.filter((num) => num > 10);
  const sumOfFilteredNumbers = filteredNumbers.reduce(
    (acc, num) => acc + num,
    0
  );
  return sumOfFilteredNumbers;
}

console.log(
  "the sum of numbers with in array",
  sumGreaterThan10([5, 11, 6, 70, 13, 1, 20, 9, 15])
);

console.log("challenging question");
// Returning the average of numbers greater than 10
function averageGreaterThan10(numbers) {
  const filterednumbers = numbers.filter((num) => num > 10);
  const sumOfFilteredNumbers = filterednumbers.reduce(
    (acc, num) => acc + num,
    0
  );
  const average = sumOfFilteredNumbers / filterednumbers.length;
  return average;
}

console.log(
  "the average is",
  averageGreaterThan10([5, 11, 6, 70, 13, 1, 20, 9, 15])
);
