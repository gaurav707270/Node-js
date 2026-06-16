import express from "express";

const app = express()

app.get("/", (req, res) => {
    res.send({ status: 200, msg: "home page Api" })
})

app.get("/news",(req,res) =>{
    res.send({news: "student news", student  : 50 ,})
})

app.listen("5000")