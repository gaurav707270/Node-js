const http = require("http")
const arg = process.argv;
const port = arg[2]

http.createServer((req, res) => {

    // res.setHeader()
    res.write("<h1>testing input from CMD IN</h1>")
    res.end()
}).listen(port)



// console.log("--------", arg[3])