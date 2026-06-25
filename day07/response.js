const http = require("http")

http.createServer((req, res) => {
    res.end("response file server is live ")
}).listen("3000")