import express from "express";

const app = express()

app.get("/", (req, res) => {
    res.send({ status: 200, msg: "home page Api" })
})

app.listen("5000")