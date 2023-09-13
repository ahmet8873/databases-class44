const { MongoClient } = require("mongodb");

const url =
  "mongodb+srv://ahmetavci:272034mongo@ahmetavci.nw7zyjo.mongodb.net/?retryWrites=true&w=majority";
const dbName = "sql_transactions";

async function connectToMongoDB() {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Connected to MongoDB");
    return client.db(dbName);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

module.exports = connectToMongoDB;
