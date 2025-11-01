const express = require('express');
const authRoutes = require("./routes/authRoutes")

const app = express();

app.use(express.json());


app.get("/", (req, res) => {
    res.send(`<h1>Hello World<h1>`)
})

app.use("/auth", authRoutes);



module.exports = app;