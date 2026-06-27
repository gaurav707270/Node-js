const http = require("http")
const fs = require("fs")

http.createServer((req, res) => {

    fs.readFile("form.html", "utf-8", (error, data) => {
        if (error) {
            res.writeHead(500, { "Content-type": "text/plain" })
            res.end("internal server error")

            return;
        }

        res.writeHead(200, { "Content-type": "text/plain" })


        if (req.url == "/") {
            res.write(data)
        }
        else if (req.url == "/submite") {
            res.write("<h1>data submited</h1>")
        }
        res.end()
    })



}).listen(2100)