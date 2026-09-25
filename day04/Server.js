import http from "http";
import path from "path";
import fs from "fs";


if (!fs.existsSync("logs.txt")) {
    fs.writeFileSync("logs.txt", "")
}


const server = http.createServer((req, res) => {

    const data = Date.now();

    res.writeHead(200, {
        "Contect-Type": "text/plain"
    })
    res.end("Server Running");

    const log = "request comes on" + req.url + "by " + req.method + " method on" + data;

    fs.appendFileSync("logs.txt", "\n" + log);

})

server.listen(4000, () => {
    console.log("server started successfully ")
})
