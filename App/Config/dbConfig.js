const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);
const dbName = 'myProject';

let dbConnection=async ()=>{
    await client.connect
    const db = client.db(dbName);
    return db
}

module.exports={dbConnection}