const {generator} = require("./task.js");

const noOfPromises = 15;
const promiseArray = generator(noOfPromises); //promises are stored in promiseArray

for(let i=0; i<noOfPromises; i++){
    const promise = promiseArray[i];
    promise
        .then((values) => console.log(values))
        .catch((error) => console.log("Error "+ error));
}