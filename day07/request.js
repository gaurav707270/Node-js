const http = require("http")

http.createServer((req, res) => {
    // res.setHeader()
    if (req.url == "/") {
        res.write("<h1>home page</h1>")
    }
    else if (req.url == "/test") {
        res.write("<h1>test page</h1>")
    }
    else {
        res.write("<h1>this url not declude</h1>")
    }


    res.end("hellow")
    console.log(req.url)
}).listen(5600)