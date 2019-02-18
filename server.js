const express = require('express');
const path = require("path");
const app = express();
const port = 3000;

let database = require('./public/COMP4711/MemoryGame/JavaScript/database');

app.use(express.static(path.join(__dirname, "public")));

app.get('/*', (req, res) => {
    res.sendFile(__dirname, 'index.html');
});

app.get('/hello', (req, res) => {
    let d = new Date();
    res.send(`${d.toDateString()} : ${d.toTimeString()}`);
});

app.get('/COMP4711/MemoryGame/summary*', async (req, res) => {
    res.sendFile(__dirname, 'COMP4711/MemoryGame/summary.html');
    console.log("Setup Database");
    database.setUpDatabase();
    console.log("Finished");
});

app.get('/COMP4711/MemoryGame/leaderboard*', async (req, res) => {

});

app.listen(port, () => console.log('Server running on port 3000'));

