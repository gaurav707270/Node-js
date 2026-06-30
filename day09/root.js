const http = require("http");
const userForm = require("./userForm")
const userDataSubmite = require("./userDataSubmite")

http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" })
    if (req.url == "/") {
        userForm(req, res)
    } else if (req.url == "/submite") {
        userDataSubmite(req, res)
    }


    res.end()
}).listen(3200)