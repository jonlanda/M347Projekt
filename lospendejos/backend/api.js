const express = require("express");

const app = express();

app.get("/hello", (req, res) => {
    res.send("Hello");
})

app.get("/films", async (req, res) => {
    let data = await db.getAllFilms();
    res.send(data)
})

app.listen(3000, () => {
    console.log("Server listening on Port 3000")
})