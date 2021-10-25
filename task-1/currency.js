const denominations = [2000,500,100,50,20,10,5,1];
let amount = 3789; //input amount
let currencyNotes = new Map(); // stores the values of the number of notes for each denomination

for(let note of denominations){
    if(amount >= note){
        let noteCount = Math.floor(amount/note);
        currencyNotes.set(note, noteCount); //mapping the values
        amount = amount - (note * noteCount);
    }
}

//printing the output
console.log("\# Currency Count \#")

for (let [key, value] of currencyNotes) {
    console.log(key + ' * ' + value);
  }