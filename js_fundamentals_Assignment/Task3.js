// ## Control Flow Statements Tasks

// ### Task 3: If...Else with Logical Operators

// - Write a program that checks if a given number is positive, negative, or zero, and also checks whether it is divisible by both 2 and 3.
// - **Challenge**: Add a condition to check if the number is a multiple of any of the numbers in a given array (e.g., `checkMultiples(10, [2, 3, 5])`).

//if...else logic operators

function numberchecking(num){
    if(num>0){
        console.log(`the number ${num} is positive`)
    }
    else if(num<0){
        console.log(`the number ${num} is negative`)
    }
    else{
        console.log(`the number ${num} is zero`)
    }

}

numberchecking(669)

console.log("output of challenge question")
// challenge question 
function multiplechecking(number, array) {
    let ismultiple = false;

    for (let i = 0; i < array.length; i++) {
        if (number % array[i] === 0) {
            console.log(`${number} is a multiple of ${array[i]}`);
            ismultiple = true;
        }
    }

    if (!ismultiple) {
        console.log(`${number} is not a multiple of any numbers in the array.`);
    }
}

multiplechecking(8,[7,4,5])