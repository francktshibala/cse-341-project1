// require('dotenv').config();
// const MongoClient = require('mongodb').MongoClient;

// console.log("Connection string (with password hidden):", 
//   process.env.MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, "//\\1:****@"));

// MongoClient.connect(process.env.MONGODB_URI)
//   .then(client => {
//     console.log("Successfully connected to MongoDB!");
//     client.close();
//   })
//   .catch(error => {
//     console.error("Failed to connect to MongoDB:", error);
//   });

const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://papa:mypassword123@cluster0.koc1o.mongodb.net/contactsdb";

async function testConnection() {
  try {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    console.log("Connected to MongoDB successfully!");
    client.close();
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
}

testConnection();
