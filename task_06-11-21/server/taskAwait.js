const {generator} = require("./task");

const noOfPromises = 15;
const promiseArray = generator(noOfPromises); //promises are stored in promiseArray

const taskAwait = async() => {
    
    for(let i=0; i<noOfPromises; i++){
        const promise = promiseArray[i];
        try {    
            const values = await promise;
            console.log(values);
        }catch (error) {
        console.log("Error "+error)
    }
}
    
}

taskAwait();

