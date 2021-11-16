require('dotenv').config();
const {MongoClient} = require('mongodb');
const MongoDBURL = process.env.MONGODB_URI;
const client = new MongoClient(MongoDBURL);

const run = async() => {
    try{
        await client.connect();

        await client.db("admin").command({ping:1});

        console.log("Connected successfully to server");
        process.exit(0)

    }catch(error){
        console.log(error);
    }
}
run();