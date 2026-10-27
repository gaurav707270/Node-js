import express from "express";
import { createServer,  } from "node:http";
import dotenv from "dotenv";
import cors from "cors";
import {  Server} from "socket.io";

dotenv.config()


const app = express();

const server = createServer(app);

app.use(cors())
app.use(express.json())


const io = new Server(server,{
    cors:{
       origin: "http://localhost:5173"
        // methods :["get","post"]
    },
})

const ROOM = "group"

io.on("connection", (Socket) => {
    console.log("user is connected", Socket.id)

    Socket.on("joinRoom",async(userName) =>{
        console.log(`${userName} is join in a group`)

        await Socket.join(ROOM)
    })
})





export default server