const http = require("http")

const server = http.createServer((req, res) => {
    if (req.url == "/") {
        res.end("welcome to http server")
    }
    if (req.url == "/news") {
        const news = {
            status: 1,
            data: [
                {
                    newsTittle: " student news",
                    newsDes: " student exam"
                },
                {
                    newsTittle: " student news",
                    newsDes: " student exam"
                }
            ]
        }

        res.end(JSON.stringify(news))
    }
})

server.listen("5000")