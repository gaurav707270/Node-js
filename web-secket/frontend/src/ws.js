import { io } from "socket.io-client";

const connectWS = () =>{
   return io("http://localhost:3000/")
}

export default connectWS