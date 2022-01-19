//Connect to MongoDB
require("dotenv").config();
const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.MONGODB_URI);
const bcrypt = require("bcrypt");

const initDB = async (collectionName) => {
    try {
        //Database connection
        await client.connect();
        const database = client.db("KZILLA");
        const db = database.collection(collectionName);
        console.log("Connected!");

        return db;
    } catch (error) {
        console.log(error);
    }
};

const registerUser = async (db, userName, userEmail, userPhone, userPass) => {
    try {
        if (await (await db).findOne({ email: userEmail })) {
            console.log("User already exists.");
        } else {
            await client.connect();
            await (
                await db
            ).insertOne({
                name: userName,
                email: userEmail,
                phone: userPhone,
                pass: userPass,
            });
        }

        console.log("New Contact added.");
    } catch (error) {
        console.log(error);
    }
};

//CRUD Functions
const createContact = async (db, userName, userTelephone) => {
    try {
        if (await (await db).findOne({ phone: userTelephone })) {
            console.log("Contact already exists.");
            process.exit(0);
        } else {
            await client.connect();
            await (
                await db
            ).insertOne({
                name: userName,
                phone: userTelephone,
            });
        }

        console.log("New Contact added.");
    } catch (error) {
        console.log(error);
    }
};

const findContact = async (db, findName) => {
    try {
        await client.connect();
        const searchResult = await (
            await db
        ).findOne({
            name: findName,
        });
        return searchResult;
    } catch (error) {
        console.log(error);
    }
};

const updateContact = async (db, keyName, newName, newPhone) => {
    try {
        await client.connect();
        await (
            await db
        ).updateOne(
            { name: keyName },
            { $set: { name: newName, phone: newPhone } }
        );
        console.log(`Directory updated. ${newName} : ${newPhone}`);
    } catch (error) {
        console.log(error);
    }
};

const deleteContact = async (db, keyName) => {
    if (await (await db).findOne({ name: keyName })) {
        try {
            await client.connect();
            await (await db).deleteOne({ name: keyName });
            console.log(`Contact of ${keyName} deleted.`);
        } catch (error) {
            console.log(error);
        }
    } else {
        console.log("Contact doesn't exist");
        process.exit(0);
    }
};

module.exports = {
    initDB,
    registerUser,
    createContact,
    updateContact,
    findContact,
    deleteContact,
};

// try {
//     run();
// } catch (error) {
//     console.log(error);
// }
