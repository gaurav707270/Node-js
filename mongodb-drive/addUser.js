import { connectDB } from "./server.js";

const addUser = async () =>{
    // const db = await connectDB()
    const result = await db.collection("users").insertOne({
        name:"kharate gaurav",
        age:22,
        email:"kharategaurav@123"
    })
console.log("user insert succesfuly"+result.insertedId);

}                                               

addUser()

import { connectDB } from "./server.js";

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
