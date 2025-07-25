// ### Task 6: Nested Loops for Multi-Dimensional Arrays

// - Write a program to print a 3x3 multiplication table (from 1 to 3) using nested `for` loops. Output the table in a neat grid-like format.
// - **Bonus**: Modify the program to print a multiplication table for numbers 1 to 12.

console.log("3*3 multiplication of 3");

for (let i = 1; i <= 3; i++) {
  let row = "";
  for (let j = 1; j <= 3; j++) {
    row += (i * j).toString().padStart(4);  // pad for alignment
  }
  console.log(row);
}