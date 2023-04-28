const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');
const db = require('./pg-db')

const app = express();

// Serve the static files from the Vue app
app.use('/', serveStatic(path.join(__dirname, '../dist/')));

// Handle production
if (process.env.NODE_ENV === 'production') {
    // Serve any request that doesn't match a static file with index.html
    app.get(/.*/, (req, res) => res.sendFile(path.join(__dirname, '../dist/index.html')));
}

//API START

app.get("/hello", (req, res) => {
    res.send("Hello");
})

app.get("/films", async (req, res) => {
    let data = await db.getAllFilms();
    res.status(200).send(data);
})

app.get("/getLink/:id", async (req, res) => {
    let data = await db.getLinksForFilm(req.params.id);
    res.status(200).send(data);
})

app.get("/getLinkWithDub/:id/:dub", async (req, res) => {
    let data = await db.getLinksForFilmAndLanguage(req.params.id, req.params.dub);
    res.status(200).send(data);
})

//API END

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port} joooooooooon`));