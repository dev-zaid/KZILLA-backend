function concatString(string1, string2){
    console.log(string1+string2());
}

concatString("My name is ", () => {
    let userName =  "Zaid"
    return userName;
});