const http = require("http")

http.createServer((req, res) => {
    res.setHeader("Content-Type", "text/html")
    res.write("<h2>response file server is live</h2> ")
    res.end()
}).listen("3000")