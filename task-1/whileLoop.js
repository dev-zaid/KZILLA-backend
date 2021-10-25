/*
Printing the following pattern using while loop

*
**
***
****
*****

*/
let patternString = "*" //defining the string the forms the pattern
let i = 1; //variable that keeps track of the while loop

while (i <= 5){
    console.log(patternString.repeat(i));
    i++; //incrementing i value
}