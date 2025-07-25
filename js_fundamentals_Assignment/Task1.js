// ## Task 1: Variable Declaration & Scope

// - Declare variables using `var`, `let`, and `const` in both the global and block-level scope (inside functions or blocks).
// - Observe how reassigning works with `let` and `const`. What happens if you try to redeclare a `let` or `const` variable within the same scope?
// - **Bonus**: Write a function that demonstrates variable hoisting using `var`, `let`, and `const`.

// delclaring the global scope
var global_scope_var = "js task"
let global_scope_let = "pratyush khadka"
const  global_Scope_const = "launchpad program"
console.log(global_scope_var)
console.log(global_scope_let)
console.log(global_Scope_const)

// declaring in block/inside function
function variablescoping(){

    var local_Scope_var = "js task"
    let local_Scope_let = "sishir thapa"
    const local_scope_const = "assignment-1"
    console.log(local_Scope_var)
    console.log(local_Scope_let)
    console.log(local_scope_const)

    // Reassinging the value of local scopes declared in the function
    local_Scope_var = "reassigned js task"
    local_Scope_let = "reassigned sishir thapa"
    // local_scope_const = "reassigned assignment-1"  this cannot be done as the variable is declared by constant where reassign is not possible 

    console.log(local_Scope_var)
    console.log(local_Scope_let)

    //Redeclaring the same vairable 
    var local_Scope_var = "redeclared js task" // this can be done cause js inteprets it as a updating the same variable not more than that as this comes from older version of js where only var was there for declaring the variables 
    // let local_Scope_let ="redeclared sishir thapa" // this cant be done with new version let and const it cause syntax error where reassign of the variable can be done but not the declration with in same scope
    // const local_scope_const = "redeclared assignmet-1"// similalry this also cannot be done it cause the syntax error

    console.log(local_Scope_var)




}
variablescoping()

// bonus questions 
function variable_hosting (){
    console.log("hoisting the variable with var",var_hosited) // it gives undefined but not a reference error
    // console.log("hoisting the variable with var",let_hosited) it gives reference error as let_hosited is not defined
    // console.log("hoisting the variable with var",const_hosited)  it also gives reference error as const_hoisted is not defined

    var var_hosited = "hosited js task"
    let let_hoisted = "hoisted pratyush khadka"
    const_hosited = "hoisted launchpad program"


    //After decalring the variable 
    console.log(var_hosited)
    console.log(let_hoisted)
    console.log(const_hosited)

}
variable_hosting()
