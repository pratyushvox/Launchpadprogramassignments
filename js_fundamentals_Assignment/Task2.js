// ## Task 2: Data Types and Type Coercion

// - Create variables of various types (string, number, boolean, object, undefined, null, symbol, BigInt).
// - Use `typeof` to display the type of each variable.
// - **Challenge**: Add a variable with a value of `NaN` and show how JavaScript handles it when combined with other data types.
// - Perform type coercion on various combinations of variables (string + number, boolean + number, etc.) and observe the results.

// declaring the variable with different datatypes
 let string = "pratyush"
 let number = 7;
 let boolean_var = true;
 let und = undefined ;
 let null_variable = null ;
 let sym = Symbol("khadka")
 let biginttt = 1234567890123456789012345678901234567890n;


 //non primitive datatypes
 let obj = { name: "Pratyush", age: 22 };

//  displaying the datatypes of variables assigned above
console.log(typeof(string))
console.log(typeof(number))
console.log(typeof(boolean_var))
console.log(typeof(und))
console.log(typeof(null_variable))
console.log(typeof(sym))
console.log(typeof(biginttt))
console.log(typeof(obj))

