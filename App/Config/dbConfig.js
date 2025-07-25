const { MongoClient } = require("mongodb");
require("dotenv").config(); // make sure this is at the top

const uri = process.env.DB_CONNECTION;

const dbName = process.env.DB_NAME;

const client = new MongoClient(uri);

let dbConnection = async () => {
  try {
    await client.connect(); // ✅ FIX: add ()
    const db = client.db(dbName);
    console.log(`✅ Connected to MongoDB: ${dbName}`);
    return db;
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    throw err;
  }
};

module.exports = { dbConnection };
