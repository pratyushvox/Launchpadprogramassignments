// ### Task 5: Loops with Break, Continue, and Nested Loops

// - Write a program that prints the numbers 1 to 20. Skip numbers that are divisible by 3 using `continue` and stop when it encounters a number that is divisible by 5 using `break`.
// - **Bonus**: Create a program that calculates the sum of even numbers between 1 and 100 using a `for` loop.
// - **Challenge**: Implement a program that prints a pattern like this:

// ```text
// 1
// 2 1
// 3 2 1
// 4 3 2 1
// 5 4 3 2 1

// ```

for(let i=0;i<=20;i++){
    if(i%3===0){
        continue;// here it skips the number which is divisible by 3
    }
    if(i%5===0){
        break; // here this terminates the program when i gets divisible by 5
    }
    console.log(i)
}

console.log("bonus question code")

// creating a for loop  that calculates the sum of even numbers between 1 and 100 
let sum = 0;
for(let i = 0; i<=100 ; i++ ){
    if(i%2===0){
        sum +=i
    }
}
console.log("sum of number from 1 to 100 which are divisible by 2 is",sum);

// challenge question code 
console.log("challenging question code")
for(let i=0 ; i<=5 ; i++){
    let row = ""
    for (let j = i; j >= 1; j--) {
        row += j + " ";
    }
    console.log(row.trim())

}
