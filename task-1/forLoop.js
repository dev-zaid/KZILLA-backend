let str = "HelloWorld";

//variable to be counted
let countLetter = "o";

let counterVariable = 0;

//for loop to iterate though the letters of the string
for(let i=0; i < str.length; i++){
    if (str[i] === countLetter){
        counterVariable = counterVariable + 1;
    }
}
console.log("The letter "+countLetter+" occurs "+counterVariable+" times");