const http = require("http")
const fs = require("fs")

http.createServer((req, res) => {
    fs.readFile("index.html", "utf-8", (err, data) => {
        if (err) {
            res.writeHead(500, { "content-type": "text/plain" })
            res.write("internal server error")
            res.end()
            return
        }
        else {
            res.writeHead(200, { "content-type": "text/html" })
            res.write(data)
            res.end()
        }
    })

}).listen(2600)