const express = require("express");

const app = express();

app.get("/hello", (req, res) => {
    res.send("Hello");
})

app.listen(3000, () => {
    console.log("Server listening on Port 3000")
})