const http = require("http")
http.createServer((req, res) => {
    res.write("this file and foulder info")
    res.end("server is live  now but useing nodemon")
}).listen(5000)

http.createServer((req, res) => {
    res.write("this file and foulder info        ")
    res.end("       server is live  now but useing nodemon")
}).listen(4000)