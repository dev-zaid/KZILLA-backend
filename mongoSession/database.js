//Connect to MongoDB
require('dotenv').config();
const {MongoClient} = require('mongodb');
const client = new MongoClient(process.env.MONGODB_URI);
const bcrypt = require('bcrypt');

const run = async() => {
    try{
        //Database connection
        await client.connect();
        const database = client.db("KZILLA");
        const db = database.collection("telephoneDirectory");
        console.log("Connected!")

        //Calling CRUD functions

        createContact(db, "Zaid", 9944556677);
        findContact(db,"Zaid");
        updateContact(db, "Zaid", "Mohd Zaid", "9898989898");
        deleteContact(db, "Mohd Zaid");

    }catch(error){
        console.log(error);
    }
}

//CRUD Functions
const createContact = async(db, userName, userTelephone,) => {
    try {
        if(await db.findOne({phone:userTelephone})){
            console.log("Contact already exists.")
            process.exit(0);
        }
        else{
            await client.connect();
            await db.insertOne(
                {
                    name: userName,
                    phone: userTelephone,
                });

        }
        
        console.log("New Contact added.")
        process.exit(0);
    } catch (error) {
        console.log(error);
    }   
}

const findContact = async(db, findName) => {
    try {
        await client.connect();
        const searchResult = await db.findOne(
            {
                name: findName
            });
        console.log(`${searchResult.name} : ${searchResult.phone}`);
        process.exit(0);
    } catch (error) {
        console.log(error);
    }   
}

const updateContact = async(db, keyName, newName, newPhone) => {
    try {
        await client.connect();
        await db.updateOne(
            {name: keyName}, 
            {$set:
                {name:newName, phone:newPhone}
            });
        console.log(`Directory updated. ${newName} : ${newPhone}`);
        process.exit(0);
    } catch (error) {
        console.log(error);
    }   
}

const deleteContact = async(db, keyName) => {
    if (await db.findOne({name:keyName})) {
        try {
            await client.connect();
            await db.deleteOne({name: keyName});
            console.log(`Contact of ${keyName} deleted.`);
            process.exit(0);
        } catch (error) {
            console.log(error);
        
        }   
    } else {
        console.log("Contact doesn't exist");
        process.exit(0);
    }
}

try {
    run();
} catch (error) {
    console.log(error)
}
