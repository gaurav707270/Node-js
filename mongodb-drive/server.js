// import express from "express";
// import { MongoClient } from "mongodb";

// const app = express();

// const url = "mongodb://localhost:27017/";
// const client = new MongoClient(url);
// const dbName = mydb;

// export const connectDB = async () =>{
//     await client.connect();
//     console.log("dataBase is connected");
//     return client.db(dbName)

// }

import { MongoClient } from "mongodb";

const url = "mongodb://127.0.0.1:27017";   // MongoDB connection URL
const client = new MongoClient(url);
const dbName = "mydb";                     // Database name


export const connectDB = async () => {
    await client.connect();                // connect to MongoDB
    console.log("MongoDB Connected...");
    return client.db(dbName);              // return db reference
};


export const addUser = async () => {
    const db = await connectDB();
    const result = await db.collection("users").insertOne({
        name: "John",
        age: 25,
        email: "john@gmail.com"
    });

    console.log("User Inserted:", result.insertedId);
};

addUser()

export const getUsers = async () => {
    const db = await connectDB();
    const users = await db.collection("users").find().toArray();
    console.log("Users:", users);
};

getUsers()

export const updateUser = async () => {
    const db = await connectDB();
    const result = await db.collection("users").updateOne(
        { name: "John" },             // search condition
        { $set: { age: 30 } }         // updated values
    );

    console.log("Updated Count:", result.modifiedCount);
};

updateUser() 