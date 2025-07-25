// ### Task 4: Switch Statement with Complex Cases

// - Create a program that uses a `switch` statement to return a message based on a given day number (1 = Sunday, 2 = Monday, etc.).
// - Enhance the program by considering invalid input (i.e., numbers outside the range 1-7). Return a default message for invalid input.

function daymessage(number){
    let message;
    switch(number){
        case 1: 
            message = "it is sunday"
            break;
        case 2:
            message ="it is monday"
            break;
        case 3:
            message = "it is tuesday"
            break;
        case 4 :
            message = "it is wednesday"
            break;
        case 5 :
            message = "it is thursday"
            break;
        case 6 :
            message = "it is friday"
            break
        case 7 :
            message = "it is saturday"
            break ;
        default :
            message = "invalid day number put a valid day number"
            break;


    }
    return message;
}
console.log(daymessage(1));