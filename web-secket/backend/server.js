import server from "./src/app.js";

server.listen(process.env.PORT,() =>{
    console.log("server started successfully")
})