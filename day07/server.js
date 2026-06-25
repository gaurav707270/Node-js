const http = require("http")
http.createServer((req, res) => {
    res.write("this file info")
    res.end("server is live  now")
}).listen(5000)