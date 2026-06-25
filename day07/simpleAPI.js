const http = require("http")

http.createServer((req, res) => {
    res.setHeader("Content-Type", "text/html")
    res.write(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<h2>kharate Gaurav</h2>
    
</body>
</html>`)
    res.end()
}).listen(2000)