const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');

const app = express();

// Serve the static files from the Vue app
app.use('/', serveStatic(path.join(__dirname, '../dist/')));

// Handle production
if (process.env.NODE_ENV === 'production') {
    // Serve any request that doesn't match a static file with index.html
    app.get(/.*/, (req, res) => res.sendFile(path.join(__dirname, '../dist/index.html')));
}

app.get("/hello", (req, res) => {
    res.send("Hello");
})

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
